# 📝 Day 11: Daily Sprint Log & Execution Audit

---

## 📅 Session Metadata
- **Date**: Day 11 / 14-Day Intensive
- **Focus Area**: Window Functions — Ranking & Partitioning (`ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`)
- **Status**: ✅ Completed (All 4 Core Benchmark Challenges + 3 Production Scenarios Solved)
- **Engine Verified**: MySQL 8.0.33+ / PostgreSQL 15+ / Snowflake Compatible

---

## ⏱️ Execution & Problem Metrics

| Challenge # | Problem Focus | Complexity | First-Pass Success | Key Pitfall Encountered |
|:---:|:---|:---:|:---:|:---|
| 1 | **Department Top 3 Salaries** | Hard | Yes | Choosing `DENSE_RANK()` over `ROW_NUMBER()` to preserve tied distinct salary levels. |
| 2 | **Latest State Deduplication** | Medium | Yes | Adding secondary deterministic tie-breaker (`event_id DESC`) to prevent sort indeterminism. |
| 3 | **Revenue Deciles (NTILE)** | Medium | Yes | Understanding remainder distribution algorithm ($N \pmod k$) across odd bucket counts. |
| 4 | **Consecutive Login Streaks** | Hard | Yes | Enforcing `DISTINCT (user_id, login_date)` pre-filtering before date arithmetic subtraction. |

---

## 🛠️ Key Technical Gotchas Debugged

### 1. The "Window Function in WHERE" Syntax Trap
- **Error**: `ERROR 3593 (HY000): You cannot use the window function 'row_number' in this context ('WHERE')`.
- **Root Cause**: Window functions are computed at Step 5 of the SQL execution pipeline, whereas `WHERE` is evaluated at Step 2.
- **Resolution**: Encapsulated the window calculation in a Common Table Expression (CTE) or derived subquery, then filtered the alias `WHERE row_num = 1` in the outer query.

### 2. The Non-Deterministic Sort Hazard
- **Problem**: When deduplicating events with `ORDER BY ping_timestamp DESC`, two events on the same timestamp caused non-deterministic row selection across repeated executions.
- **Resolution**: Appended primary key or monotonically increasing sequence `ORDER BY ping_timestamp DESC, event_id DESC` to guarantee strict determinism.

### 3. Date Arithmetic Across Dialects in Gaps-and-Islands
- **MySQL Syntax**: `login_date - INTERVAL (ROW_NUMBER() OVER (...)) DAY`
- **PostgreSQL Syntax**: `login_date - (ROW_NUMBER() OVER (...))::INT * INTERVAL '1 day'` or `login_date - (ROW_NUMBER() OVER (...))::INT`
- **Snowflake / BigQuery Syntax**: `DATEADD(day, -1 * ROW_NUMBER() OVER (...), login_date)`
- **Key Takeaway**: The mathematical principle remains universal across all engines: subtract the continuous integer sequence from the calendar date to produce a constant island cluster key.

---

## 📈 Next Up: Day 12
**Focus**: Window Functions Part 2 — Aggregates & Offsets
- Value functions: `LAG()`, `LEAD()`, `FIRST_VALUE()`, `LAST_VALUE()`
- Frame specification: `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, `RANGE BETWEEN ...`
- Analytical modeling: Month-over-Month (MoM) Growth, Running Cumulative Totals, 7-Day Moving Averages.
