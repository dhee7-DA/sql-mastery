# 📝 Day 14 Assessment: DML, Atomic Mutations & ACID Transactions

Test your mastery of Data Manipulation Language, atomic upserts, concurrency anomalies, and ACID storage physics.

---

### Questions

#### 1. In PostgreSQL, what prerequisite must be satisfied on the target table for `INSERT INTO metrics (id, val) VALUES (1, 10) ON CONFLICT (id) DO UPDATE SET val = EXCLUDED.val;` to execute without error?
- [ ] A) The column `id` must be declared as `SERIAL` or `BIGSERIAL`.
- [ ] B) There must be a unique constraint or unique index on `(id)`.
- [ ] C) The table must be locked exclusively using `LOCK TABLE metrics IN EXCLUSIVE MODE`.
- [ ] D) The query must be executed inside a `SERIALIZABLE` transaction block.

#### 2. Under the ANSI SQL standard, which isolation level is the minimum required to completely eliminate the "Write Skew" anomaly?
- [ ] A) READ COMMITTED
- [ ] B) REPEATABLE READ
- [ ] C) SERIALIZABLE
- [ ] D) READ UNCOMMITTED

#### 3. What is the fundamental operational difference between `DELETE FROM users;` and `TRUNCATE TABLE users;`?
- [ ] A) `DELETE` removes table triggers; `TRUNCATE` preserves them.
- [ ] B) `DELETE` writes individual row deletions to the WAL and Undo logs; `TRUNCATE` deallocates data pages directly via DDL.
- [ ] C) `DELETE` cannot be executed inside a transaction block; `TRUNCATE` can.
- [ ] D) `DELETE` resets the auto-increment identity sequence; `TRUNCATE` retains the counter.

#### 4. If Transaction A holds an exclusive row lock on row 101, what happens when Transaction B executes `SELECT * FROM accounts WHERE id = 101 FOR UPDATE SKIP LOCKED;`?
- [ ] A) Transaction B pauses and waits until Transaction A commits or rolls back.
- [ ] B) Transaction B throws a deadlock exception (`40001: deadlock_detected`).
- [ ] C) Transaction B immediately returns an empty result set (0 rows) without waiting.
- [ ] D) Transaction B forces Transaction A to abort via lock preemption.

#### 5. In an Optimistic Concurrency Control (OCC) pattern, how does the application know if another user modified the record first?
- [ ] A) The database throws a `40001: serialization_failure` error.
- [ ] B) The `UPDATE` query returns `0` affected rows because the `WHERE version = current_version` predicate failed to match.
- [ ] C) The database automatically issues a `ROLLBACK` syscall.
- [ ] D) The primary key sequence jumps by +10.

#### 6. In a relational database engine, which component is strictly responsible for enabling the "Atomicity" rollback of an uncommitted transaction?
- [ ] A) The B+ Tree Index Root Page
- [ ] B) The Undo Log / Rollback Segment
- [ ] C) The Write-Ahead Log (WAL / Redo Log)
- [ ] D) The Query Optimizer Statistics Cache

#### 7. Why does the database engine write to the Write-Ahead Log (WAL) upon `COMMIT` instead of immediately writing the dirty 16KB data pages to the table's disk file?
- [ ] A) WAL records are sequential and append-only, avoiding catastrophic random disk I/O head seek bottlenecks.
- [ ] B) Data pages on disk cannot be modified while users are connected.
- [ ] C) The operating system forbids writing more than 1KB per syscall.
- [ ] D) Table data pages can only be written during midnight scheduled maintenance windows.

#### 8. How can an application developer guarantee that two concurrent transactions transferring money between accounts $A$ and $B$ will never deadlock?
- [ ] A) Use `SELECT ... FOR UPDATE NOWAIT` exclusively.
- [ ] B) Wrap all transfer queries in `REPEATABLE READ` isolation.
- [ ] C) Always acquire row locks in strict, deterministic ascending order of account IDs (`id = LEAST(A, B)` first, then `id = GREATEST(A, B)`).
- [ ] D) Disable foreign key constraints on the accounts table.

#### 9. In PostgreSQL's MVCC architecture, what happens physically on disk when an `UPDATE` modifies a row?
- [ ] A) The bytes in the existing heap tuple are overwritten in-place, and the old value is lost.
- [ ] B) A new tuple version is appended to the table heap, and the old tuple's `xmax` header is populated with the current transaction ID.
- [ ] C) The table is automatically converted into a temporary memory table.
- [ ] D) The row is moved to the system error log.

#### 10. Consider the following query: `UPDATE employees SET salary = salary * 1.10 WHERE department_id NOT IN (10, 20, NULL);`. How many rows are updated?
- [ ] A) All employees in departments other than 10 and 20.
- [ ] B) Exactly 0 rows, because any comparison against `NULL` in `NOT IN` evaluates to `UNKNOWN`, making the entire `WHERE` clause falsy for all rows.
- [ ] C) Only employees with `department_id IS NULL`.
- [ ] D) All employees in the entire table.

---

## 🔑 Answer Key & Conceptual Rationale

1. **B — Unique index or constraint required**: PostgreSQL's `ON CONFLICT (col)` syntax requires a formal unique index or primary key constraint on `col` to serve as the mechanical arbiter of conflict.
2. **C — SERIALIZABLE**: Only `SERIALIZABLE` prevents the Write Skew anomaly because Write Skew does not involve conflicting row locks; it requires tracking read-write dependency cycles.
3. **B — Row-by-row logging vs. DDL extent deallocation**: `DELETE` writes every single tuple deletion to the Undo and Redo logs; `TRUNCATE` deallocates page extents via metadata operations in milliseconds.
4. **C — Returns 0 rows immediately**: `SKIP LOCKED` tells the engine to omit any rows currently held by exclusive locks, returning free rows instantly without blocking.
5. **B — Zero affected rows**: In OCC, if another worker updated the version from 5 to 6, `WHERE id = 42 AND version = 5` matches 0 rows, signaling a collision to the application.
6. **B — Undo Log / Rollback Segment**: The Undo Log stores the pre-image of modified pages to restore previous state on `ROLLBACK`. The Redo Log (WAL) ensures Durability.
7. **A — Sequential vs. random disk I/O**: Sequential writes to the WAL are orders of magnitude faster than random 16KB block writes across scattered table files.
8. **C — Deterministic lock sorting**: Deadlocks require circular waits ($A \to B \to A$). Locking in sorted order ($A < B$) mathematically eliminates circular dependencies.
9. **B — Append new tuple with xmax set**: Postgres MVCC uses an append-only heap architecture where updates write new tuples and mark old tuples with `xmax`.
10. **B — Exactly 0 rows**: In SQL 3-valued logic, `NOT IN (10, 20, NULL)` expands to `(dept != 10) AND (dept != 20) AND (dept != NULL)`. Since `dept != NULL` is `UNKNOWN`, the whole expression evaluates to `UNKNOWN` and `WHERE` discards every row!
