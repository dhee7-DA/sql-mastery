# 🎯 Top Corporate & FAANG Interview Questions: Window Functions & Analytical Partitioning

> **High-Priority Interview Preparation**: This document compiles the most frequent, high-difficulty window function interview questions asked at **Meta, Amazon, Google, Apple, Netflix, Stripe, Goldman Sachs, and Citadel**.

---

### Question 1: The Classic Top-N Per Group (Meta / Amazon)
**Prompt**: Given an `Employees` table with `(emp_id, name, department_id, salary)`, write a SQL query to find the employees who have the top 3 unique salaries in each department. If there are ties, all employees sharing the salary should be returned without skipping ranks.

#### Solution:
```sql
WITH RankedSalaries AS (
  SELECT 
    emp_id,
    name,
    department_id,
    salary,
    DENSE_RANK() OVER (
      PARTITION BY department_id 
      ORDER BY salary DESC
    ) AS salary_rank
  FROM Employees
)
SELECT 
  emp_id,
  name,
  department_id,
  salary
FROM RankedSalaries
WHERE salary_rank <= 3;
```
#### Why Interviewers Ask This:
* **The `ROW_NUMBER` vs `RANK` vs `DENSE_RANK` Trap**: Interviewers check if you know why `DENSE_RANK()` must be used instead of `ROW_NUMBER()` (which cuts off tied individuals) or `RANK()` (which leaves gaps, e.g. ranks 1, 1, 3, omitting rank 2).
* **Execution Phase Trap**: Interviewers watch to see if you try to put `WHERE DENSE_RANK() <= 3` in the main query instead of using a CTE.

---

### Question 2: Month-over-Month (MoM) Growth & Velocity (Stripe / Uber)
**Prompt**: Given a `DailyRevenue` table with `(revenue_date, sales_amount)`, calculate the Month-over-Month (MoM) revenue growth percentage for each month, handling the initial month properly without NULL errors.

#### Solution:
```sql
WITH MonthlyAggregates AS (
  SELECT 
    DATE_FORMAT(revenue_date, '%Y-%m-01') AS sales_month,
    SUM(sales_amount) AS total_revenue
  FROM DailyRevenue
  GROUP BY DATE_FORMAT(revenue_date, '%Y-%m-01')
),
MonthlyVelocity AS (
  SELECT 
    sales_month,
    total_revenue,
    LAG(total_revenue, 1) OVER (ORDER BY sales_month) AS prev_month_revenue
  FROM MonthlyAggregates
)
SELECT 
  sales_month,
  total_revenue,
  COALESCE(prev_month_revenue, 0) AS prev_month_revenue,
  ROUND(
    CASE 
      WHEN prev_month_revenue IS NULL OR prev_month_revenue = 0 THEN 0.0
      ELSE (total_revenue - prev_month_revenue) / prev_month_revenue * 100.0 
    END, 2
  ) AS mom_growth_pct
FROM MonthlyVelocity
ORDER BY sales_month;
```
#### Why Interviewers Ask This:
* Tests whether you know that window functions run *after* aggregations (or if you aggregate in an initial CTE first).
* Tests defensive division-by-zero and `NULL` handling.

---

### Question 3: 7-Day Moving Trailing Average (Google / DoorDash)
**Prompt**: Given an `Orders` table with `(order_date, order_amount)`, calculate the 7-day trailing moving average of daily order totals for each day, starting from the 7th day of activity.

#### Solution:
```sql
WITH DailyTotals AS (
  SELECT 
    order_date,
    SUM(order_amount) AS daily_amount
  FROM Orders
  GROUP BY order_date
),
RollingFrames AS (
  SELECT 
    order_date,
    daily_amount,
    SUM(daily_amount) OVER (
      ORDER BY order_date 
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_7d_total,
    ROUND(
      AVG(daily_amount) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
      ), 2
    ) AS rolling_7d_avg,
    ROW_NUMBER() OVER (ORDER BY order_date) AS day_number
  FROM DailyTotals
)
SELECT 
  order_date,
  daily_amount,
  rolling_7d_total,
  rolling_7d_avg
FROM RollingFrames
WHERE day_number >= 7
ORDER BY order_date;
```
#### Why Interviewers Ask This:
* Tests explicit frame definition: `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` (spanning exactly 7 physical rows).
* Tests filtering out incomplete warmup windows (`day_number >= 7`).

---

### Question 4: Gaps & Islands - User Retention Streaks (Netflix / Duolingo)
**Prompt**: Given a `UserLogins` table with `(user_id, login_date)`, find all users who logged in for at least 5 consecutive calendar days.

#### Solution:
```sql
WITH DistinctLogins AS (
  -- Deduplicate multiple logins on the same day
  SELECT DISTINCT user_id, login_date
  FROM UserLogins
),
RankedLogins AS (
  SELECT 
    user_id,
    login_date,
    DATE_SUB(
      login_date, 
      INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY
    ) AS island_group
  FROM DistinctLogins
),
StreakSummary AS (
  SELECT 
    user_id,
    island_group,
    COUNT(*) AS streak_length,
    MIN(login_date) AS streak_start,
    MAX(login_date) AS streak_end
  FROM RankedLogins
  GROUP BY user_id, island_group
  HAVING COUNT(*) >= 5
)
SELECT 
  user_id,
  streak_length,
  streak_start,
  streak_end
FROM StreakSummary
ORDER BY streak_length DESC, user_id;
```
#### Why Interviewers Ask This:
* The difference-of-ranks technique (`date - ROW_NUMBER()`) is the gold standard algorithm for consecutive event sequences.

---

### Question 5: Bank Ledger Running Balance & Peer Rows (Goldman Sachs / Citadel)
**Prompt**: Given a `Ledger` table with `(entry_id, account_id, txn_date, amount)`, calculate the exact running balance for each account without erroneously lumping multiple transactions occurring on the same date.

#### Solution:
```sql
SELECT 
  entry_id,
  account_id,
  txn_date,
  amount,
  SUM(amount) OVER (
    PARTITION BY account_id 
    ORDER BY txn_date, entry_id 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_balance
FROM Ledger
ORDER BY account_id, txn_date, entry_id;
```
#### Why Interviewers Ask This:
* Tests whether the candidate knows that ANSI SQL's default frame when `ORDER BY` is present is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which incorrectly merges peer rows sharing the same timestamp unless `ROWS BETWEEN` and a deterministic secondary sort key (`entry_id`) are specified.

---

## 🔗 Related Resources
* **Visualizer Section**: Section 06 (`🪟 Window Functions Arena (420 Levels)`)
* **Comprehensive Syllabus**: [`docs/IMPORTANT_MATERIALS_WINDOW_FUNCTIONS.md`](file:///i:/sqlmastery(github)/sql-mastery/docs/IMPORTANT_MATERIALS_WINDOW_FUNCTIONS.md)
* **Relational Joins Syllabi**: [`docs/IMPORTANT_MATERIALS_RELATIONAL_JOINS.md`](file:///i:/sqlmastery(github)/sql-mastery/docs/IMPORTANT_MATERIALS_RELATIONAL_JOINS.md)
