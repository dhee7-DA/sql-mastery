# 🧠 Day 11: Theory — Window Functions: Ranking, Partitioning & Analytical Mechanics

---

## 1. The Fundamental Paradigm: Partitioning vs. Grouping

### The Core Difference
Before window functions were introduced in the SQL:2003 standard, calculating analytical metrics required complex self-joins, subqueries, or temporary tables. 

| Dimension | `GROUP BY` (Aggregate) | `OVER (PARTITION BY ...)` (Window) |
|:---|:---|:---|
| **Row Count Effect** | **Collapses rows**. Produces exactly one summary row per group. | **Preserves rows**. Every individual input row is retained in the output. |
| **Output Cardinality** | Output rows $\le$ Input rows. | Output rows $\equiv$ Input rows. |
| **Detail Visibility** | Detail columns must be aggregated (`SUM`, `MAX`) or present in `GROUP BY`. | Detail columns can sit side-by-side with partition-level metrics. |
| **Mathematical Role** | Many-to-One reduction ($N \to 1$). | Many-to-Many relational enrichment ($N \to N$). |

```
GROUP BY (Collapsing):
[Row 1: Dept A, $100] \
[Row 2: Dept A, $200]  ─► [Group Dept A: Avg $150] (Original rows destroyed!)
[Row 3: Dept B, $300] ───► [Group Dept B: Avg $300]

WINDOW FUNCTION (Preserving):
[Row 1: Dept A, $100] ───► [Row 1: Dept A, $100, DeptAvg: $150, Rank: 2]
[Row 2: Dept A, $200] ───► [Row 2: Dept A, $200, DeptAvg: $150, Rank: 1]
[Row 3: Dept B, $300] ───► [Row 3: Dept B, $300, DeptAvg: $300, Rank: 1]
```

---

## 2. The Physical Execution Pipeline (The Order of Operations)

### Why Window Functions Cannot Be Filtered in `WHERE` or `HAVING`
A frequent mistake in SQL interviews is attempting to write:
```sql
-- ❌ SYNTAX ERROR: Window functions are not allowed in WHERE
SELECT employee_id, department_id, salary
FROM Employees
WHERE ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) <= 3;
```

To understand why this is physically impossible for a database engine, observe the query execution sequence:

```
1. FROM / JOIN        ──► Tables scanned and joined into virtual working dataset
2. WHERE              ──► Row-level predicate filtering (removes non-qualifying rows)
3. GROUP BY           ──► Dataset collapsed into summary groups
4. HAVING             ──► Group-level predicate filtering
5. WINDOW FUNCTIONS   ──► Partitioning, sorting, and window frame calculations evaluated!
6. SELECT             ──► Expressions, aliases, and projection evaluated
7. DISTINCT           ──► Duplicate elimination
8. QUALIFY*           ──► Filter specifically on window function results (*Snowflake, Databricks, BigQuery)
9. ORDER BY           ──► Final presentation sorting
10. LIMIT / OFFSET    ──► Row slicing and pagination
```

### The Inescapable Conclusion
Because step **5 (Window Evaluation)** happens strictly **after** step **2 (`WHERE`)** and step **4 (`HAVING`)**, the window function result literally does not exist when `WHERE` is executed!

### The Two Solutions:
1. **The Subquery / Derived Table Wrapper** (Universal ANSI SQL / MySQL / PostgreSQL / SQL Server):
   ```sql
   SELECT employee_id, department_id, salary
   FROM (
       SELECT employee_id, department_id, salary,
              DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
       FROM Employees
   ) ranked
   WHERE rnk <= 3;
   ```
2. **Common Table Expression (CTE)** (Modern readable standard):
   ```sql
   WITH RankedEmployees AS (
       SELECT employee_id, department_id, salary,
              DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
       FROM Employees
   )
   SELECT employee_id, department_id, salary
   FROM RankedEmployees
   WHERE rnk <= 3;
   ```
3. **The `QUALIFY` Clause** (Snowflake, Google BigQuery, Teradata, Databricks):
   ```sql
   -- Valid in BigQuery, Snowflake, and DuckDB:
   SELECT employee_id, department_id, salary
   FROM Employees
   QUALIFY DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) <= 3;
   ```

---

## 3. The Big 4 Ranking Functions: Deep Mathematical Dissection

### 1. `ROW_NUMBER()` — Pure Sequential Enumeration
- **Definition**: Returns a unique, contiguous, strictly monotonic sequence of integers starting from `1` for each row within its partition.
- **Ties**: Completely ignores ties. If two rows have identical values in the `ORDER BY` clause, one row is arbitrarily assigned `k` and the other `k + 1` (unless a secondary deterministic tie-breaker column is provided).
- **Formula**:
  $$\text{RowNumber}(i) = i \quad \text{for row index } i \in [1, N]$$
- **Primary Use Case**: Deduplication, keyset pagination, isolating the latest/earliest record.

### 2. `RANK()` — Competition / Olympic Ranking
- **Definition**: Assigns the same rank to tied rows, but skips subsequent rank numbers by the count of tied duplicates.
- **Ties**: Tied rows receive identical rank $r$. If $k$ rows are tied at rank $r$, the next distinct row receives rank $r + k$.
- **Sequence Example**: `1, 2, 2, 4, 5, 5, 5, 8`
- **Primary Use Case**: Athletic competitions, academic honor rolls, customer order of arrival where ties share equal standing but displace subsequent positions.

### 3. `DENSE_RANK()` — Compact Non-Skipping Ranking
- **Definition**: Assigns the same rank to tied rows, but does **not** skip any rank numbers.
- **Ties**: If $k$ rows are tied at rank $r$, the next distinct row receives rank $r + 1$.
- **Sequence Example**: `1, 2, 2, 3, 4, 4, 4, 5`
- **Primary Use Case**: "Top N Salary" problems, reward tiers, leaderboard prize brackets (e.g., "Top 3 highest distinct compensation levels").

### 4. `NTILE(k)` — Equi-Height Quantile Bucketization
- **Definition**: Divides the rows of an ordered partition into $k$ roughly equal-sized buckets numbered from $1$ to $k$.
- **Remainder Distribution Algorithm**:
  If total rows $N$ is not cleanly divisible by $k$, let $q = \lfloor N / k \rfloor$ and $r = N \pmod k$.
  The first $r$ buckets will contain $q + 1$ rows, and the remaining $k - r$ buckets will contain $q$ rows.
- **Example**: If $N = 11$ and $k = 4$:
  - $11 / 4 = 2$ remainder $3$.
  - Bucket 1: 3 rows ($2 + 1$)
  - Bucket 2: 3 rows ($2 + 1$)
  - Bucket 3: 3 rows ($2 + 1$)
  - Bucket 4: 2 rows ($2$)
- **Primary Use Case**: Quartile ($k=4$), Decile ($k=10$), and Percentile ($k=100$) customer spending segmentation, A/B test variant assignment, network latency percentile slicing.

---

## 4. The Critical Gotcha: The Indeterminate Sorting Trap

When using `ROW_NUMBER()`, if your `ORDER BY` clause does not guarantee uniqueness, the database query planner is free to order tied rows arbitrarily based on physical storage order, index leaf order, or parallel thread execution:

```sql
-- ⚠️ HAZARDOUS (Non-deterministic):
ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)
```
If a customer places **two orders on the exact same date**, run A might pick Order #101 as rank 1, while run B (after a table vacuum or parallel query re-plan) might pick Order #102 as rank 1!

### The Defensive Engineering Pattern:
Always append a unique primary key or deterministic column to break ties:
```sql
-- ✅ BULLETPROOF (Deterministic):
ROW_NUMBER() OVER (
    PARTITION BY customer_id 
    ORDER BY order_date DESC, order_id DESC
)
```

---

## 5. Advanced Algebraic Pattern: Gaps-and-Islands via `ROW_NUMBER()` Offset

A classic FAANG interview problem asks: *"Find all users who logged in for at least 5 consecutive calendar days."*

### The Mathematical Insight:
Consider a sequence of consecutive dates:
`['2026-03-01', '2026-03-02', '2026-03-03', '2026-03-05', '2026-03-06']`

Now calculate `ROW_NUMBER() OVER (ORDER BY login_date)`:
- Row 1: `2026-03-01` $\to$ Date - 1 day = `2026-02-28`
- Row 2: `2026-03-02` $\to$ Date - 2 days = `2026-02-28`
- Row 3: `2026-03-03` $\to$ Date - 3 days = `2026-02-28`  <-- **Same anchor date!**
- Row 4: `2026-03-05` $\to$ Date - 4 days = `2026-03-01`
- Row 5: `2026-03-06` $\to$ Date - 5 days = `2026-03-01`  <-- **New anchor date!**

Because both consecutive dates and row numbers increase by strictly $+1$ each step, their difference $(\text{Date} - \text{RowNumber})$ remains **constant** for an unbroken island of consecutive days!

```sql
WITH DistinctLogins AS (
    SELECT DISTINCT user_id, CAST(login_time AS DATE) AS login_date
    FROM UserLogins
),
RankedLogins AS (
    SELECT user_id, login_date,
           login_date - INTERVAL (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date)) DAY AS streak_group
    FROM DistinctLogins
)
SELECT user_id,
       MIN(login_date) AS streak_start,
       MAX(login_date) AS streak_end,
       COUNT(*) AS consecutive_days
FROM RankedLogins
GROUP BY user_id, streak_group
HAVING COUNT(*) >= 5;
```
This is one of the most elegant and powerful demonstrations of window function mathematics in production data engineering.
