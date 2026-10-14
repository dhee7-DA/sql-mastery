# 📚 Day 14 Deep-Dive Theory: DML, Atomic Upserts, ACID Storage Physics & Concurrency Control

---

## 🏛️ 1. Declarative DML vs. Physical Storage Engine Physics

In relational database management systems (RDBMS) such as PostgreSQL and MySQL (InnoDB), reading data (`SELECT`) and mutating data (`INSERT`, `UPDATE`, `DELETE`) operate on fundamentally different storage subsystems:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE DML EXECUTION PIPELINE                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ Client Query ] ──► [ SQL Parser / Planner ] ──► [ Lock Manager (Row / Intent Locks) │
│                                                                                        │
│                                           │                                            │
│                                           ▼                                            │
│  [ Table Tablespace Disk (.ibd) ] ◄── [ Buffer Pool RAM ] ──► [ Undo Log (Rollback) ]   │
│                                           │                                            │
│                                           ▼                                            │
│                              [ Write-Ahead Log / Redo Log ]                            │
│                                           │                                            │
│                                           ▼ (fsync on COMMIT)                          │
│                               [ Persistent Disk WAL Storage ]                          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### The Life of an `UPDATE` Query
When an engine executes `UPDATE accounts SET balance = balance - 100 WHERE id = 42;`:
1. **Index Seek & Page Ingestion**: The engine consults the B+ Tree primary key index to locate the 16KB disk page containing row 42. If the page is not in the RAM Buffer Pool, it performs a physical disk read.
2. **Lock Acquisition**: The transaction requests an **Exclusive Row Lock (`X-Lock`)** on row 42. If another transaction holds a conflicting lock, this transaction halts and enters a sleep queue.
3. **Undo Log Pre-Image Creation**: Before overwriting memory, the engine copies the old version of row 42 (`balance = 500`) into the **Undo Log**. This serves two critical purposes:
   - **Rollback**: If the transaction aborts, the engine copies this pre-image back.
   - **MVCC (Multi-Version Concurrency Control)**: Other transactions reading concurrently see this pre-image without being blocked by the write!
4. **Buffer Pool In-Memory Mutation**: The page in RAM is updated with the new value (`balance = 400`). The page is now marked **Dirty**.
5. **Redo Log / WAL Generation**: The physical difference record is appended to the **WAL Buffer**.
6. **Commit & `fsync`**: When the client sends `COMMIT`, the engine does **not** write the dirty 16KB data page to disk (that would cause random I/O thrashing). Instead, it flushes only the compact sequential WAL buffer to disk using an operating system `fsync()` syscall. Once the WAL write is acknowledged, the transaction is officially **Durable**.

---

## ⚡ 2. The Anatomy of an Upsert (Idempotent Mutations)

In modern microservices and distributed event streams (Kafka, RabbitMQ, SQS, Webhooks), networks guarantee **at-least-once delivery**, meaning duplicate event messages will inevitably hit your database. 

An unshielded `INSERT` will throw a duplicate primary key exception (`23505: UniqueViolation`). If handled naively via *“Check-then-Insert”* in application code:
```python
# ❌ DANGEROUS: RACE CONDITION VULNERABLE!
record = db.query("SELECT * FROM users WHERE email = %s", email)
if not record:
    db.execute("INSERT INTO users (email, name) VALUES (%s, %s)", email, name)
```
Between the `SELECT` check and the `INSERT`, a concurrent worker can insert the same email, crashing your worker.

### A. PostgreSQL / SQLite: `INSERT ... ON CONFLICT`
PostgreSQL provides atomic upsert capability via the ANSI-compliant `ON CONFLICT` clause:

```sql
INSERT INTO daily_metrics (metric_date, customer_id, total_spend, order_count)
VALUES ('2026-10-14', 101, 250.00, 1)
ON CONFLICT (metric_date, customer_id)
DO UPDATE SET
    total_spend = daily_metrics.total_spend + EXCLUDED.total_spend,
    order_count = daily_metrics.order_count + EXCLUDED.order_count,
    last_updated_at = CURRENT_TIMESTAMP
RETURNING metric_date, customer_id, total_spend, order_count;
```

#### Key Elements:
- **`ON CONFLICT (target)`**: Specifies the unique constraint or index columns that define the conflict boundary.
- **`EXCLUDED` Table**: A special virtual table containing the row proposed for insertion.
- **`DO NOTHING`**: Silently suppresses unique constraint violations, leaving existing rows untouched.
- **`RETURNING`**: Emits the final mutated row immediately, eliminating the need for a secondary `SELECT`.

### B. MySQL: `INSERT ... ON DUPLICATE KEY UPDATE`
MySQL InnoDB triggers an upsert whenever a duplicate value hits a `PRIMARY KEY` or `UNIQUE` index:

```sql
INSERT INTO daily_metrics (metric_date, customer_id, total_spend, order_count)
VALUES ('2026-10-14', 101, 250.00, 1)
ON DUPLICATE KEY UPDATE
    total_spend = total_spend + VALUES(total_spend),
    order_count = order_count + VALUES(order_count),
    last_updated_at = CURRENT_TIMESTAMP;
```

> **MySQL 8.0.20+ Syntax Note**: The `VALUES(col)` function is deprecated in modern MySQL in favor of row aliases:
> ```sql
> INSERT INTO daily_metrics (metric_date, customer_id, total_spend, order_count)
> VALUES ('2026-10-14', 101, 250.00, 1) AS new_row
> ON DUPLICATE KEY UPDATE
>     total_spend = daily_metrics.total_spend + new_row.total_spend;
> ```

### C. ANSI SQL Standard: The `MERGE` Statement
Supported natively in PostgreSQL 15+, Oracle, SQL Server, Snowflake, and BigQuery:

```sql
MERGE INTO target_inventory t
USING incoming_shipments s
ON (t.sku_id = s.sku_id)
WHEN MATCHED AND s.status = 'DAMAGED' THEN
    DELETE
WHEN MATCHED THEN
    UPDATE SET 
        t.quantity_on_hand = t.quantity_on_hand + s.quantity,
        t.last_restocked_at = s.arrival_date
WHEN NOT MATCHED THEN
    INSERT (sku_id, quantity_on_hand, last_restocked_at)
    VALUES (s.sku_id, s.quantity, s.arrival_date);
```

---

## 🛡️ 3. The Four ACID Guarantees & Storage Engine Mechanics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       THE FOUR PILLARS OF ACID TRANSACTIONS                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  A - ATOMICITY    │ All mutations complete successfully, or all changes     │
│                   │ roll back completely. Handled by the UNDO LOG.          │
│                                                                             │
│  C - CONSISTENCY  │ The database transitions from one valid state to        │
│                   │ another, satisfying all schema constraints & rules.     │
│                                                                             │
│  I - ISOLATION    │ Concurrent transactions execute without cross-talk or   │
│                   │ intermediate data pollution. Handled by MVCC & LOCKS.   │
│                                                                             │
│  D - DURABILITY   │ Once committed, changes survive hardware power failure  │
│                   │ or server crashes. Handled by the REDO LOG / WAL.       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Savepoints: Fine-Grained Partial Rollbacks
Within long-running transaction blocks, `SAVEPOINT` creates internal checkpoints, allowing rollbacks of individual failed steps without terminating the entire transaction:

```sql
BEGIN;

INSERT INTO orders (order_id, user_id, amount) VALUES (9001, 42, 1500.00);

SAVEPOINT inventory_check;

-- Attempt to allocate inventory from a legacy warehouse
UPDATE inventory SET stock = stock - 1 WHERE sku = 'ITEM-A' AND warehouse = 'WEST';

-- If warehouse check fails, rollback only to the savepoint:
ROLLBACK TO SAVEPOINT inventory_check;

-- Try fallback warehouse allocation:
UPDATE inventory SET stock = stock - 1 WHERE sku = 'ITEM-A' AND warehouse = 'CENTRAL';

COMMIT;
```

---

## 🚦 4. ANSI SQL Isolation Levels & Concurrency Anomalies

Isolation defines how changes made by one transaction become visible to concurrent transactions. The ANSI SQL standard defines four isolation levels by the concurrency anomalies they forbid:

### The Concurrency Anomalies:
1. **Dirty Read**: Transaction B reads uncommitted modifications made by Transaction A. If Transaction A later executes `ROLLBACK`, Transaction B has made decisions based on "garbage data that never physically existed."
2. **Non-Repeatable Read (Fuzzy Read)**: Transaction A reads row 42 (`balance = 100`). Transaction B updates row 42 (`balance = 200`) and commits. Transaction A reads row 42 again and sees a different value!
3. **Phantom Read**: Transaction A queries `WHERE department = 'Engineering'` and receives 10 rows. Transaction B inserts an 11th employee and commits. Transaction A re-runs the identical query and sees 11 rows (a "phantom" row appeared).
4. **Write Skew**: Two concurrent transactions read overlapping data sets, satisfy an invariant independently, and make conflicting updates that violate a global business rule. (e.g., *“At least one doctor must be on-call”*—Doctor Alice and Doctor Bob simultaneously request leave; each sees the other on-call and commits; zero doctors remain on-call).

### Isolation Level Comparison Matrix

| Isolation Level | Dirty Reads? | Non-Repeatable Reads? | Phantom Reads? | Write Skew? | Engine Mechanism |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **READ UNCOMMITTED** | Allowed | Allowed | Allowed | Allowed | Reads dirty memory pages without checking Undo Log. |
| **READ COMMITTED** *(Postgres Default)* | ❌ Prevented | Allowed | Allowed | Allowed | Each statement creates a fresh MVCC read snapshot. |
| **REPEATABLE READ** *(MySQL Default)* | ❌ Prevented | ❌ Prevented | ❌ Prevented* | Allowed | First statement sets snapshot; reads remain static. |
| **SERIALIZABLE** | ❌ Prevented | ❌ Prevented | ❌ Prevented | ❌ Prevented | Strict two-phase locking or Serializable Snapshot Isolation. |

*\* Note on MySQL InnoDB*: In `REPEATABLE READ`, InnoDB prevents phantom reads for both read queries (via MVCC point-in-time snapshots) and write queries (via **Next-Key Locks** that lock the index record *plus* the gap preceding it).

---

## 🔒 5. Locking Models: Pessimistic vs. Optimistic Concurrency Control

### A. Pessimistic Row Locking (`SELECT ... FOR UPDATE`)
Pessimistic locking assumes conflicts **will occur**. It explicitly locks the matching rows on the database engine level before reading them:

```sql
BEGIN;

-- Acquires an exclusive row-level lock on account 101.
-- Any other transaction attempting to SELECT ... FOR UPDATE or UPDATE account 101
-- will pause and wait until this transaction COMMITs or ROLLBACKs.
SELECT balance 
FROM accounts 
WHERE account_id = 101 
FOR UPDATE;

UPDATE accounts 
SET balance = balance - 250.00 
WHERE account_id = 101;

COMMIT;
```

#### Fine-Grained Pessimistic Modifiers:
- **`FOR UPDATE`**: Exclusive row lock. Blocks other readers with `FOR UPDATE` and all writers.
- **`FOR SHARE`**: Shared read lock. Allows other transactions to read, but blocks writers.
- **`NOWAIT`**: Throws an immediate error (`55P03: could not obtain lock`) instead of waiting in a blocked queue.
- **`SKIP LOCKED`**: The secret weapon for queue processing! Skips any rows currently locked by other transactions and returns only free rows immediately.

### B. The `SKIP LOCKED` Work Queue Pattern
In high-throughput distributed systems, multiple worker nodes need to dequeue jobs from a shared database table. Traditional `SELECT ... FOR UPDATE` causes workers to serialize and queue behind worker 1.

With `SKIP LOCKED`, 100 concurrent workers can pull discrete batches with **zero contention and zero wait time**:

```sql
WITH BatchToProcess AS (
    SELECT job_id
    FROM background_jobs
    WHERE status = 'QUEUED'
    ORDER BY priority DESC, created_at ASC
    LIMIT 10
    FOR UPDATE SKIP LOCKED
)
UPDATE background_jobs j
SET status = 'IN_PROGRESS',
    locked_by = 'worker-alpha-09',
    locked_at = CURRENT_TIMESTAMP
FROM BatchToProcess b
WHERE j.job_id = b.job_id
RETURNING j.job_id, j.payload;
```

### C. Optimistic Concurrency Control (OCC)
Optimistic locking assumes conflicts are **rare**. It avoids database engine row locks entirely, using an application-level integer `version` or `updated_at` column:

```sql
-- Step 1: Read without locks
SELECT product_id, price, version FROM products WHERE product_id = 42;
-- Returns: price = 99.99, version = 7

-- Step 2: Update only if version has NOT changed in the interim
UPDATE products 
SET price = 109.99, 
    version = version + 1 
WHERE product_id = 42 
  AND version = 7;

-- Step 3: Check Rows Affected
-- If rows affected == 1: Success!
-- If rows affected == 0: Another transaction updated the row first! 
--                        Application aborts and retries.
```

---

## 🧬 6. Multi-Version Concurrency Control (MVCC) Internals

Why can 1,000 clients execute `SELECT * FROM orders` while another client runs an enormous bulk `UPDATE orders SET status = 'AUDITED'` without either query blocking the other?

The answer is **MVCC**: *“Readers never block writers, and writers never block readers.”*

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                    POSTGRESQL MVCC TUPLE HEADER FIELDS                            │
├───────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  [ Heap Tuple Header ]                                                            │
│    ├── xmin: Transaction ID that inserted this row                                │
│    ├── xmax: Transaction ID that updated or deleted this row (0 if active)        │
│    └── t_ctid: Pointer to newer version of this tuple if updated                  │
│                                                                                   │
│  Row Version 1: [xmin: 100, xmax: 105] ──► (Modified by Tx 105)                  │
│  Row Version 2: [xmin: 105, xmax: 0  ] ──► (Current active version)              │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### How MVCC Read Views Work:
When Transaction 108 begins in `READ COMMITTED` or `REPEATABLE READ`, the engine takes a lightweight memory snapshot of:
1. `active_transactions`: The list of transaction IDs currently in-flight.
2. `xmax`: The highest transaction ID assigned so far.

When Transaction 108 evaluates a row:
- If `xmin` is from an active transaction (uncommitted), the row is **invisible**.
- If `xmax` exists and committed before Transaction 108 started, the row is **dead/invisible**.
- The engine traverses the Undo Log or tuple version chain backward until it finds the exact historical version that was committed prior to Transaction 108's snapshot!

---

## 💀 7. Deadlock Mechanics & The Wait-For Graph

A **Deadlock** is a circular wait state where Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1:

```mermaid
flowchart LR
    TxA["Transaction A"] -- "Holds Lock on" --> Row1["Row 1 (Account 101)"]
    Row1 -- "Waited on by" --> TxB["Transaction B"]
    TxB -- "Holds Lock on" --> Row2["Row 2 (Account 102)"]
    Row2 -- "Waited on by" --> TxA

    style TxA fill:#0f172a,stroke:#38bdf8,color:#38bdf8
    style TxB fill:#0f172a,stroke:#f87171,color:#f87171
    style Row1 fill:#080c14,stroke:#fbbf24,color:#fbbf24
    style Row2 fill:#080c14,stroke:#fbbf24,color:#fbbf24
```

### Automatic Deadlock Detection
Every 1000ms (`deadlock_timeout` in Postgres, `innodb_lock_wait_timeout` in MySQL), the engine's background lock manager traverses the system **Wait-For Graph**. 

When it detects a cycle ($A \to B \to A$):
1. It selects a **victim transaction** (typically the transaction that has performed the least amount of Undo work).
2. It abruptly aborts the victim with:
   `ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction`.
3. The other transaction acquires the freed lock and completes successfully.

### The Golden Rule of Deadlock Prevention
Deadlocks are **almost always caused by inconsistent lock acquisition ordering in application code**.

> **The Invariant**: *“Always acquire locks in a globally deterministic, sorted order.”*

When transferring funds between accounts $A$ and $B$:
```sql
-- ❌ BAD: Locks accounts in arbitrary order based on who is sender vs receiver
SELECT * FROM accounts WHERE id = sender_id FOR UPDATE;
SELECT * FROM accounts WHERE id = receiver_id FOR UPDATE;

-- ✅ PRODUCTION STANDARD: Deterministic lock sorting by primary key!
SELECT * FROM accounts 
WHERE id IN (sender_id, receiver_id)
ORDER BY id ASC
FOR UPDATE;
```
Because both transactions lock the smaller ID first, a circular dependency cycle is mathematically impossible!
