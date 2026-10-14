# 💼 Day 14 Senior & Staff Engineer Interview Questions: DML, ACID & Concurrency

---

### Q1: What is the "Lost Update" anomaly, and how do you prevent it in high-concurrency production systems?
**Target Level**: Senior / Staff Engineer (Stripe, DoorDash, Uber)

#### The Problem:
Two concurrent transactions read the same bank account ($ balance = \$100 $). 
- Transaction A adds \$50 (computes \$150 in app memory).
- Transaction B subtracts \$20 (computes \$80 in app memory).
- Transaction A writes \$150 and commits.
- Transaction B writes \$80 and commits.
Transaction A's deposit of \$50 was silently overwritten and lost forever!

#### The Solution:
There are two canonical industry solutions:
1. **Atomic In-Database Increment (No Application Memory Math)**:
   ```sql
   UPDATE accounts SET balance = balance + 50 WHERE account_id = 101;
   ```
   Because the engine acquires an exclusive row lock and mutates the value directly in the buffer pool, lost updates are physically impossible.
2. **Optimistic Concurrency Control (OCC) with Version Token**:
   ```sql
   UPDATE accounts 
   SET balance = 150, version = version + 1 
   WHERE account_id = 101 AND version = 5;
   ```
   If Transaction B commits first (incrementing version to 6), Transaction A's update affects 0 rows, triggering an application-level rollback and retry.

---

### Q2: Why does `TRUNCATE` behave differently than `DELETE FROM table;` under the hood? Can `TRUNCATE` be rolled back?
**Target Level**: Staff Database Infrastructure Engineer (Meta, Amazon AWS RDS)

#### The Core Differences:
1. **Physical Engine Mechanics**:
   - `DELETE` is a row-by-row operation. It scans the table, locks each row, writes a pre-image to the Undo log, writes a WAL entry per row, and marks tuple headers as dead. On a 100M row table, `DELETE` generates gigabytes of WAL and takes minutes.
   - `TRUNCATE` is a **DDL operation**. It deallocates the underlying disk extents/data pages directly and resets the table's high-water mark or recreates the file descriptor. It finishes in milliseconds.
2. **Rollback Behavior**:
   - **PostgreSQL**: **YES**, `TRUNCATE` **can** be rolled back! PostgreSQL tracks object catalog alterations within standard transaction semantics. If executed inside `BEGIN ... ROLLBACK;`, the old table file pointer is retained.
   - **MySQL (InnoDB)**: **NO**, `TRUNCATE` **cannot** be rolled back! In MySQL, `TRUNCATE` issues an implicit `COMMIT` before and after execution, permanently dropping and recreating the `.ibd` file.

---

### Q3: Explain how PostgreSQL and MySQL InnoDB implement MVCC differently for `UPDATE` operations. What are the operational consequences (e.g., Table Bloat vs. Undo Contention)?
**Target Level**: Principal DBA / Systems Architect (GitLab, Cloudflare)

#### PostgreSQL (Append-Only Tuples in Heap):
- An `UPDATE` does **not** modify the existing row in place.
- It writes a **brand new tuple** into the table heap, setting the old tuple's `xmax` to the current transaction ID and the new tuple's `xmin` to the current transaction ID.
- **Consequence**: Heavy update workloads cause **Table Bloat**. The dead rows must be cleaned up asynchronously by the `VACUUM` daemon. If autovacuum cannot keep up, table size and B-Tree indexes swell massively.

#### MySQL InnoDB (In-Place Update with Undo Log):
- InnoDB updates the clustered index record **in place** on the existing 16KB data page.
- It writes the old pre-image into the dedicated **Undo Tablespace**.
- **Consequence**: Zero table heap bloat! However, long-running transactions prevent InnoDB's purge threads from freeing old Undo log pages, causing the Undo tablespace to balloon and slowing down historical MVCC read traversals.

---

### Q4: What is the "Write Skew" anomaly? Why does `REPEATABLE READ` fail to prevent it, and how does `SERIALIZABLE` fix it?
**Target Level**: Senior Infrastructure Engineer (Citadel, Jane Street)

#### The Scenario:
A medical hospital requires that *at least one doctor must be active on-call at all times*. Currently, Dr. Alice and Dr. Bob are both on-call.

1. **Transaction 1 (Alice requests leave)**:
   ```sql
   SELECT COUNT(*) FROM doctors WHERE on_call = TRUE; -- Returns 2 (Invariant holds!)
   UPDATE doctors SET on_call = FALSE WHERE doctor_id = 'Alice';
   ```
2. **Transaction 2 (Bob requests leave simultaneously)**:
   ```sql
   SELECT COUNT(*) FROM doctors WHERE on_call = TRUE; -- Returns 2 (Invariant holds!)
   UPDATE doctors SET on_call = FALSE WHERE doctor_id = 'Bob';
   ```
3. Both transactions commit simultaneously under `REPEATABLE READ`.
4. **The Disaster**: Zero doctors are on-call!

#### Why `REPEATABLE READ` Fails:
Neither transaction modified a row the other transaction was updating (Alice updated Alice; Bob updated Bob). Therefore, no row lock conflict occurred! Both snapshots saw `COUNT(*) = 2`.

#### The Fix:
- **Option 1**: Use `SERIALIZABLE` isolation. In PostgreSQL, Serializable Snapshot Isolation (SSI) tracks dependencies (SIREAD locks) and detects the read-write anti-dependency cycle, aborting one transaction with `40001: serialization_failure`.
- **Option 2**: In `READ COMMITTED`, enforce explicit table-level or surrogate row locks via `SELECT ... FOR UPDATE`.

---

### Q5: How does `SELECT ... FOR UPDATE SKIP LOCKED` work, and why did it revolutionize message queue architectures in SQL?
**Target Level**: Senior Backend Engineer (Stripe, Shopify)

#### The Problem with Traditional SQL Queues:
When using `SELECT * FROM queue WHERE status = 'PENDING' LIMIT 1 FOR UPDATE;`, Worker 1 locks row 1. When Worker 2, 3, and 4 run the query, they attempt to lock row 1 as well and **block completely** until Worker 1 finishes. Throughput degrades to single-threaded performance.

#### The `SKIP LOCKED` Breakthrough:
With `SKIP LOCKED`, the engine's lock manager inspects the row:
- If locked by another transaction $\to$ **Skip it immediately and evaluate the next matching candidate row**.
- Workers never wait on each other. 50 workers pulling batches of 10 tasks achieve near-perfect horizontal scalability directly inside PostgreSQL or MySQL 8.0 without needing external systems like Celery or SQS for basic queuing.

---

### Q6: What is a "Phantom Read", and how does MySQL InnoDB eliminate it in `REPEATABLE READ` without requiring `SERIALIZABLE`?
**Target Level**: Senior Database Engineer (Snowflake, Databricks)

#### Definition:
A phantom read occurs when a transaction queries a range of rows (`WHERE salary > 50000`), and a concurrent transaction inserts a *brand new row* that satisfies the filter and commits. A subsequent re-read by the first transaction returns the new row.

#### InnoDB's Solution: Next-Key Locking:
InnoDB combines an **Index Record Lock** with a **Gap Lock**:
- **Record Lock**: Locks the physical index record.
- **Gap Lock**: Locks the *empty space between index records* and the gap before/after.
- **Next-Key Lock**: Locks the index record *plus* the gap immediately preceding it.

When Transaction A runs `SELECT * FROM employees WHERE salary > 50000 FOR UPDATE;`, InnoDB locks every salary record $> 50000$ **and locks all the gaps between them**. If Transaction B attempts to `INSERT INTO employees (salary) VALUES (75000);`, the insert blocks on the gap lock until Transaction A commits!

---

### Q7: Explain the Write-Ahead Log (WAL) and why databases do not flush dirty table data pages to disk upon every `COMMIT`.
**Target Level**: Systems Architect (CockroachDB, YugabyteDB)

#### The Physics of Random vs. Sequential Disk I/O:
- Modifying a table with indexes requires updating multiple non-contiguous 16KB disk pages: the table heap, primary key B+ Tree leaf page, and several secondary index pages scattered across disk.
- Writing 5 dirty 16KB pages on every transaction commit would require 5 random disk head seeks or flash block rewrites, capping database throughput at a few hundred transactions per second.

#### The WAL Solution:
- A WAL record is a compact sequential append describing the binary byte-level delta.
- Upon `COMMIT`, the database only calls `fsync()` on the sequential WAL file. Sequential disk writes are 100x–1000x faster than random page writes.
- The actual 16KB dirty pages remain in RAM (Buffer Pool) and are flushed lazily in bulk by background checkpoint threads. If the server loses power, the engine simply replays the WAL from the last checkpoint upon restart.

---

### Q8: What causes Deadlocks, and what is the mathematical guarantee for preventing them in distributed applications?
**Target Level**: Senior Software Engineer (Bloomberg, Goldman Sachs)

#### The Root Cause:
Deadlocks require four Coffman conditions, primarily **Circular Wait**:
$Tx_1 \text{ holds } L_A \text{ and wants } L_B$, while $Tx_2 \text{ holds } L_B \text{ and wants } L_A$.

#### The Mathematical Prevention Guarantee:
If all transactions in an application acquire shared locks in an **identical, globally deterministic strict total order** (e.g., sorted ascending by primary key `id`), a circular dependency graph is **mathematically impossible** ($A < B$ everywhere).

```sql
-- Prevents deadlocks regardless of transfer direction:
SELECT * FROM accounts 
WHERE account_id IN (from_id, to_id) 
ORDER BY account_id ASC 
FOR UPDATE;
```

---

### Q9: What is the difference between an Idempotent API and an Atomic Database Operation?
**Target Level**: Staff Solutions Architect (AWS, Microsoft Azure)

- **Atomic Operation**: A database-level guarantee that an all-or-nothing mutation completes without partial failure (`BEGIN ... COMMIT`).
- **Idempotent Operation**: An end-to-end distributed systems guarantee that executing an operation $N$ times ($N \ge 1$) produces the exact same system state as executing it once ($f(f(x)) = f(x)$).
- **Relationship**: Atomicity is a building block of idempotency. An idempotent webhook endpoint uses an atomic database upsert (`INSERT ... ON CONFLICT DO UPDATE`) with a unique `idempotency_key` to absorb network retries safely.

---

### Q10: When would you choose an Optimistic Concurrency Control (OCC) pattern over a Pessimistic (`FOR UPDATE`) pattern?
**Target Level**: Lead Software Architect (Airbnb, Booking.com)

| Criterion | Choose Optimistic Locking (OCC) | Choose Pessimistic Locking (`FOR UPDATE`) |
| :--- | :--- | :--- |
| **Contention Rate** | Low (collisions occur in $< 2\%$ of requests). | High (multiple workers fighting over same rows). |
| **Transaction Duration** | Long (user reading UI for 30 seconds before submitting). | Short (sub-millisecond microservice mutation). |
| **Database Connections** | Stateless HTTP APIs holding zero open DB connections. | Dedicated stateful worker threads. |
| **Cost of Failure** | Cheap: User or client simply retries request. | Expensive: Retrying causes cascading delays. |
