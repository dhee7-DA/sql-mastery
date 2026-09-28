# 🪟 Important Materials: The Complete Relational Window Functions Master Vault (420 Levels)

> **High-Priority Corporate & FAANG Reference**: This document contains the definitive institutional breakdown of SQL Window Functions (`OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)`). It serves as the master syllabus and cheat-sheet for **Section 06: Window Functions Master Arena (420 Levels across 7 Disciplines)** in the SQL Mastery Visualizer.

---

## 🏛️ Executive Architecture: The 7 Core Window Function Disciplines

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ WINDOW FUNCTIONS ARENA: 420 Problems | 7 Disciplines × 60 (20 Easy / 20 Med / 20 Hard) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

| Discipline | Symbol | Total | Easy (Lvl 1–20) | Med (Lvl 21–40) | Hard (Lvl 41–60) | Core Corporate & Financial Analytics Focus |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1. Row Numbering & Ranking** | `🏅` | **60** | 20 | 20 | 20 | `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`. Department Top-N per group, tie-break resolution, strict sequence pagination, deduplication. |
| **2. Temporal Offsets & Deltas** | `⏱️` | **60** | 20 | 20 | 20 | `LAG()` & `LEAD()`. Day-over-Day (DoD) prices, Month-over-Month (MoM) revenue growth %, churn velocity, inactivity intervals. |
| **3. Cumulative Accumulators** | `📈` | **60** | 20 | 20 | 20 | `SUM()`, `COUNT()`, `AVG()` over ordering. Bank running ledger balances, Year-to-Date (YTD) spend, and high-water mark peak equity. |
| **4. Sliding Window Frames** | `🪟` | **60** | 20 | 20 | 20 | `ROWS BETWEEN ...` vs `RANGE BETWEEN ...`. 7-day/30-day moving averages, centered smoothing, rolling volatility, burst detectors. |
| **5. Boundary Picks & Extremums** | `🎯` | **60** | 20 | 20 | 20 | `FIRST_VALUE()`, `LAST_VALUE()`, `NTH_VALUE()`. Market open baseline comparisons, terminal state capture, and the default frame trap. |
| **6. Statistical Percentiles & Cohorts** | `📊` | **60** | 20 | 20 | 20 | `NTILE(n)`, `CUME_DIST()`, `PERCENT_RANK()`. Quartile & decile segmentation (top 25% VIPs), compensation benchmarking, credit risk scoring. |
| **7. Gaps & Islands / Sessionization** | `🏝️` | **60** | 20 | 20 | 20 | Consecutive login streaks, difference-of-ranks (`date - ROW_NUMBER()`), web user sessionization (30-min idle timeouts). |
| **TOTAL** | — | **420** | **140** | **140** | **140** | **3 to 5 interactive token blanks, 4 plausible options, zero duplicates.** |

---

## 📊 Relational Window Functions Master Decision Matrix

Use this table to choose the correct analytical window pattern for any corporate data challenge:

| Function Family | Syntax Pattern | Corporate & Financial Use Cases | Silent Production Trap & Gotcha |
| :--- | :--- | :--- | :--- |
| **`ROW_NUMBER()`** | `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` | Deduplication; picking exact latest record per customer; strict row indexing. | **Arbitrary Tie Breaks**: When values are tied, order is non-deterministic without secondary tie-breaker columns. |
| **`RANK()`** | `RANK() OVER (PARTITION BY store ORDER BY sales DESC)` | Olympic style competition scoring; identifying top performers. | **Gap Skipping**: Ties produce duplicate ranks and skip subsequent numbers (`1, 2, 2, 4`), breaking Top-N pagination! |
| **`DENSE_RANK()`** | `DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC)` | LeetCode #185 Top 3 unique salaries; salary tier bands; competitive percentiles. | **Dense Clusters**: If many people share the top 3 values, `WHERE dense_rank <= 3` can return hundreds of rows. |
| **`LAG()` & `LEAD()`** | `LAG(val, offset, default) OVER (PARTITION BY id ORDER BY dt)` | Month-over-Month (MoM) revenue delta; Day-over-Day stock price changes; churn gaps. | **First-Row NULL Bug**: The first row always produces `NULL`. Arithmetic like `(price - LAG(price))/LAG(price)` fails unless using fallback default. |
| **Cumulative `SUM()`** | `SUM(amount) OVER (PARTITION BY account ORDER BY txn_time)` | Bank running ledger balance; Year-to-Date (YTD) budget burn; flight queue capacity. | **Implicit RANGE Trap**: When `ORDER BY` is present without `ROWS BETWEEN`, ANSI SQL defaults to `RANGE ... AND CURRENT ROW`, merging identical timestamps into one big sum! |
| **Sliding Frames** | `AVG(rev) OVER (ORDER BY dt ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` | 7-day trailing moving average; noise filtering; volatility indicators. | **Off-By-One Error**: `6 PRECEDING AND CURRENT ROW` spans 7 total rows, not 6. Omitting `CURRENT ROW` causes syntax errors. |
| **`LAST_VALUE()`** | `LAST_VALUE(col) OVER (... ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)` | Capturing terminal status; most recent order status in a pipeline. | **The #1 Window Trap in SQL**: By default, `LAST_VALUE()` stops at `CURRENT ROW`, simply returning the current row! Must specify `UNBOUNDED FOLLOWING`. |
| **`NTILE(n)`** | `NTILE(4) OVER (ORDER BY aum DESC)` | Quartile customer segmentation (top 25% VIPs); credit risk deciles. | **Uneven Bucketing**: When total rows don't divide evenly by $n$, remainder rows spill into the earliest buckets. |
| **Gaps & Islands** | `date_col - INTERVAL ROW_NUMBER() OVER (...) DAY` | User retention streaks; consecutive stock gain days; server uptime windows. | **Skipping Holidays**: Date subtraction difference-of-ranks requires contiguous daily calendars without missing dates. |

---

## ⚠️ The 4 Deadliest Production Traps in Detail

### 1. The `LAST_VALUE()` Default Frame Gotcha
```sql
-- ❌ BUG: Silently returns the current row's value!
SELECT employee_id, salary,
       LAST_VALUE(salary) OVER (PARTITION BY dept_id ORDER BY hire_date) AS final_salary
FROM Employees;

-- ✅ PRODUCTION FIX: Explicitly open the frame to UNBOUNDED FOLLOWING
SELECT employee_id, salary,
       LAST_VALUE(salary) OVER (
         PARTITION BY dept_id 
         ORDER BY hire_date 
         ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
       ) AS final_salary
FROM Employees;
```

### 2. The Implicit `RANGE` Peer-Merge Trap
```sql
-- ❌ BUG: If multiple transactions occur on the same date, they get the IDENTICAL merged total!
SELECT account_id, txn_date, amount,
       SUM(amount) OVER (PARTITION BY account_id ORDER BY txn_date) AS running_balance
FROM Ledger;

-- ✅ PRODUCTION FIX: Explicitly enforce physical ROWS sequence
SELECT account_id, txn_date, amount,
       SUM(amount) OVER (
         PARTITION BY account_id 
         ORDER BY txn_date, txn_id 
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_balance
FROM Ledger;
```

### 3. The Execution Phase Restriction (`WHERE` / `HAVING`)
```sql
-- ❌ SYNTAX ERROR: Window functions cannot reside directly in WHERE or HAVING!
SELECT emp_id, department, salary
FROM Employees
WHERE ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) <= 3;

-- ✅ PRODUCTION FIX: Wrap inside a Modular CTE or Subquery
WITH RankedStaff AS (
  SELECT emp_id, department, salary,
         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM Employees
)
SELECT emp_id, department, salary
FROM RankedStaff
WHERE rnk <= 3;
```

### 4. `LAG()` NULL Propagation in Financial Math
```sql
-- ❌ BUG: Row 1 returns NULL, breaking financial calculations
SELECT trade_date, price,
       (price - LAG(price, 1) OVER (ORDER BY trade_date)) / LAG(price, 1) OVER (ORDER BY trade_date) * 100 AS pct_change
FROM DailyPrices;

-- ✅ PRODUCTION FIX: Supply a safe 3rd parameter default or COALESCE
SELECT trade_date, price,
       (price - LAG(price, 1, price) OVER (ORDER BY trade_date)) / LAG(price, 1, price) OVER (ORDER BY trade_date) * 100 AS pct_change
FROM DailyPrices;
```

---

## 🗺️ LeetCode Medium/Hard Signature Blueprints

All 420 problems in the arena directly map to the core algorithmic signatures of LeetCode Medium & Hard benchmarks:

1. **Department Top Three Salaries (LeetCode #185 - Hard)**:
   * Pattern: `DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk` filtered on `rnk <= 3`.
2. **Consecutive Numbers (LeetCode #180 - Medium)**:
   * Pattern: Dual `LAG(val, 1)` and `LEAD(val, 1)` matching `val = prev_val AND val = next_val`.
3. **Restaurant Growth (LeetCode #1321 - Medium)**:
   * Pattern: `SUM(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.
4. **Last Person to Fit in the Bus (LeetCode #1204 - Medium)**:
   * Pattern: `SUM(weight) OVER (ORDER BY turn ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` filtered on `<= 1000`.
5. **Human Traffic of Stadium (LeetCode #601 - Hard)**:
   * Pattern: `DATE_SUB(visit_date, INTERVAL ROW_NUMBER() OVER (ORDER BY visit_date) DAY) AS island_id` followed by `HAVING COUNT(*) >= 3`.

---

## 📂 Navigation & Quests Terminal Integration
* **Visualizer Section**: Section 06 (`🪟 Window Functions Arena (420)`)
* **Data File**: [`visualizer/quests_section6_data.js`](file:///i:/sqlmastery(github)/sql-mastery/visualizer/quests_section6_data.js)
* **Interactive Matrix UI**: Embedded directly in the visualizer terminal with real-time discipline filter pills.
* **Verification**: Fully audited via `scratch/verify_section6_quests.js` (420 / 420 passed with 0 errors).
