# 📓 Day 14 Execution Log: DML, Atomic Upserts, ACID Storage Physics & Concurrency Control

---

## ⏱️ Session Overview & Time Breakdown
- **Date**: 2026-10-14
- **Sprint Duration**: ~4.5 Hours
- **Focus Area**: Data Manipulation Language (DML), Atomic Upserts, Transaction Boundaries, Lock Contention, and Storage Engine Internals.
- **Artifacts Delivered**: 7 institutional files (README, THEORY, queries.sql, SOLUTIONS_BREAKDOWN, INTERVIEW_QUESTIONS, ASSESSMENT, DAILY_LOG).

---

## 🧠 Key Technical Breakthroughs & Mental Models

### 1. The True Cost of Random Disk I/O vs. Sequential Append (Why WAL Rules the World)
Before today, I viewed `COMMIT` as simply "saving the row to disk." Today I discovered the physical reality: writing modified 16KB table pages to disk on every commit causes catastrophic random I/O thrashing. 
By writing only compact binary deltas sequentially to the Write-Ahead Log (WAL) and issuing a single `fsync()`, databases achieve thousands of durable transactions per second while letting background threads lazily flush dirty pages.

### 2. Eliminating Circular Deadlocks Mathematically
In high-frequency fintech systems (e.g., peer-to-peer transfers), concurrent transactions frequently deadlocked when transferring money between the same two accounts in opposite directions.
The breakthrough: **Deterministic Primary Key Lock Sorting**. By sorting account IDs (`LEAST(id_a, id_b)` first), every transaction in the entire system acquires locks in the exact same direction. Circular wait conditions become physically impossible.

### 3. The `SKIP LOCKED` Revolution for Job Queues
Traditional queue polling with `SELECT ... FOR UPDATE` serialized all worker threads behind worker 1. With `FOR UPDATE SKIP LOCKED`, concurrent workers skip locked rows immediately in RAM and claim the next available batch without waiting. This enables horizontally scalable task queues directly inside relational SQL without needing external message brokers.

### 4. MVCC Storage Divergence: Postgres Heap Bloat vs. MySQL Undo Contention
Discovered why database migrations and vacuum settings differ so drastically between engines:
- **Postgres**: An `UPDATE` appends a brand new row into the heap, generating dead tuples that require `VACUUM`.
- **MySQL InnoDB**: An `UPDATE` mutates the clustered index page in-place and writes the pre-image to the Undo Log, avoiding heap bloat but requiring purge threads to clean the Undo tablespace.

---

## ⚠️ Silent Traps & Edge Cases Conquered

| Trap Name | Root Cause | Production Remedy |
| :--- | :--- | :--- |
| **The Unshielded UPDATE / DELETE** | Omitting `WHERE` clause modifies every single row in the production table. | Always write `WHERE` condition first; configure `sql_safe_updates = 1` in production DB connections. |
| **The Check-Then-Insert Race** | Checking `SELECT 1 FROM users WHERE email = ?` before `INSERT` leaves a concurrency window where two workers insert the same email. | Use atomic upserts (`INSERT ... ON CONFLICT (email) DO UPDATE` or `ON DUPLICATE KEY UPDATE`). |
| **The Deadlock on Bidirectional Transfer** | Transaction A locks Account 101 then 102; Transaction B locks 102 then 101 $\to$ Circular deadlock. | Always sort lock acquisitions: `PERFORM 1 FROM accounts WHERE id IN (101, 102) ORDER BY id ASC FOR UPDATE;`. |
| **The NOT IN (NULL) DML Freeze** | Writing `WHERE dept_id NOT IN (1, 2, NULL)` in an `UPDATE` evaluates to `UNKNOWN` for all rows. | Never use `NOT IN` with nullable columns; use `NOT EXISTS` or filter with `IS NOT NULL`. |
| **Worker Queue Lock Serialization** | Standard `SELECT ... FOR UPDATE` causes 50 queue workers to wait on Worker 1. | Use `SELECT ... FOR UPDATE SKIP LOCKED` to allow lock-free parallel batch consumption. |

---

## 📈 Curriculum Completion Status
- [x] Day 01: SELECT, Aliasing & Arithmetic Projections
- [x] Day 02: WHERE Predicates, Filtering & Three-Valued Logic
- [x] Day 03: ORDER BY Sorting, NULL Positioning & Pagination
- [x] Day 04: Advanced SELECT & CASE WHEN Pivoting
- [x] Day 05: Basic Aggregations, GROUP BY & HAVING
- [x] Day 06: Math Functions, Rounding & Coordinates
- [x] Day 07: Subqueries, Correlated Logic & Scalar CTEs
- [x] Day 07b: Set Operations & Grouping Sets
- [x] Day 08: Basic Relational Joins (INNER, LEFT, RIGHT, FULL)
- [x] Day 09: Intermediate Joins, Non-Equi & Multi-Table Chains
- [x] Day 10: Advanced Join Scoring & Multi-Table Analytics
- [x] Day 11: Analytical Window Functions & Ranking Triad
- [x] Day 12: Sliding Window Aggregates & Value Offsets
- [x] Day 13: Advanced Business Analytics (Churn, Cohorts, NRR, LTV)
- [x] **Day 14: DML, Atomic Upserts, ACID Transactions & Concurrency Control** (Completed Today!)

---

## 🚀 Next Milestone: Capstone Projects
With the core 14-day curriculum fully mastered from foundational projections to ACID concurrency physics, the next milestone is the grand **Enterprise Capstone Projects** (Multi-Asset Financial Trade Settlement & Prime Broker Reconciliation).
