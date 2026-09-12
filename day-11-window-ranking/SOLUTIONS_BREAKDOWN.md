# 🔬 Day 11: Solutions Breakdown — Deep Architectural Analysis

---

## Challenge 1: Department Top 3 Salaries (LeetCode 185 / Enterprise Comp Audit)

### 1. What is Being Tested?
- Mastery of partition-scoped ranking.
- Distinguishing **distinct salary tiers** from individual employee counts.
- Relational joining between dimension (`Departments`) and fact (`EmployeeSalaries`) in conjunction with window functions.

### 2. The Trap: Why `LIMIT 3` or `ROW_NUMBER() <= 3` Fails
1. **`LIMIT 3`**: Returns only 3 rows across the **entire table**, not 3 rows *per department*.
2. **`ROW_NUMBER() <= 3`**: If Alice and Bob both earn \$125k (tied for #1), and Carol earns \$115k, and David earns \$105k, `ROW_NUMBER()` assigns:
   - Alice: `1`
   - Bob: `2`
   - Carol: `3`
   - David: `4` (Excluded!)
   David was wrongfully excluded even though there are only **two distinct salary values** ahead of him (\$125k and \$115k). The business requirement asks for employees earning the *top 3 distinct salaries*.
3. **`RANK() <= 3`**: If Alice and Bob tie at #1, Carol is #3. David is #4 and is again excluded!
4. **`DENSE_RANK() <= 3`**:
   - Alice: `1`
   - Bob: `1`
   - Carol: `2`
   - David: `3`
   - Eve: `4`
   Both Alice and Bob share Rank 1, Carol is Rank 2, and David is Rank 3. All 4 employees qualify!

### 3. Execution Mechanics & Join Ordering
```sql
WITH RankedSalaries AS (
    SELECT 
        d.department_name,
        e.employee_name,
        e.salary,
        DENSE_RANK() OVER (
            PARTITION BY e.department_id 
            ORDER BY e.salary DESC
        ) AS salary_dense_rank
    FROM EmployeeSalaries e
    INNER JOIN Departments d 
        ON e.department_id = d.department_id
)
SELECT department_name, employee_name, salary, salary_dense_rank
FROM RankedSalaries
WHERE salary_dense_rank <= 3
ORDER BY department_name ASC, salary_dense_rank ASC, employee_name ASC;
```
- **Join First, Window Second**: Joining `EmployeeSalaries` to `Departments` *before* evaluating the window function ensures `department_name` is immediately available in the CTE without needing a secondary join in the outer query.
- **Index Support**: Optimal execution is achieved with a composite B-Tree index on `EmployeeSalaries(department_id, salary DESC)`. The database engine scans index leaves in sorted order per department partition, eliminating costly in-memory sorts (`Using filesort`).

---

## Challenge 2: Latest State Deduplication (Canonical Data Engineering Pipeline)

### 1. What is Being Tested?
- Preserving full record state while isolating the single most recent event per entity.
- Deterministic secondary tie-breaking.

### 2. The Traditional Flawed Approach: `MAX(timestamp)` with Self-Join
Many developers write:
```sql
-- ❌ INNEFFICIENT & FRAGILE:
SELECT e.*
FROM DeviceTelemetryEvents e
INNER JOIN (
    SELECT device_uuid, MAX(ping_timestamp) AS max_ping
    FROM DeviceTelemetryEvents
    GROUP BY device_uuid
) m ON e.device_uuid = m.device_uuid 
   AND e.ping_timestamp = m.max_ping;
```
**Three fatal flaws with the traditional self-join:**
1. **Duplicate Records on Exact Timestamp Matches**: If a device sends two telemetry pings in the exact same millisecond, the inner join matches *both* rows, producing duplicate records in downstream analytical models.
2. **Double Table Scan**: Scans `DeviceTelemetryEvents` twice (once for the aggregate, once for the join).
3. **High Cardinality Memory Spills**: Joining on composite string keys (`device_uuid` + `timestamp`) creates large hash join tables in memory.

### 3. The Modern Window Deduplication Solution:
```sql
WITH RankedTelemetry AS (
    SELECT 
        event_id, device_uuid, firmware_version, battery_pct, ping_timestamp,
        ROW_NUMBER() OVER (
            PARTITION BY device_uuid 
            ORDER BY ping_timestamp DESC, event_id DESC
        ) AS row_num
    FROM DeviceTelemetryEvents
)
SELECT device_uuid, firmware_version, battery_pct, ping_timestamp AS latest_ping
FROM RankedTelemetry
WHERE row_num = 1;
```
- **Single Pass Scan**: Evaluates in a single scan over `DeviceTelemetryEvents`.
- **Absolute Tie-Breaking**: Appending `event_id DESC` guarantees that even if `ping_timestamp` is identical down to the nanosecond, exactly **one** row receives `row_num = 1`.

---

## Challenge 3: Customer Revenue Deciles & Quartiles (`NTILE`)

### 1. What is Being Tested?
- Distribution of continuous metric data into discrete equi-height quantile buckets.
- Understanding the bucket size allocation algorithm when $N$ is not divisible by $k$.

### 2. The Math of `NTILE(4)` on 10 Accounts:
Given $N = 10$ customer rows, $k = 4$ quartiles:
- $\text{Base Size } q = \lfloor 10 / 4 \rfloor = 2$ rows per bucket.
- $\text{Remainder } r = 10 \pmod 4 = 2$ extra rows.
- The first $r = 2$ buckets get $q + 1 = 3$ rows.
- The remaining $4 - 2 = 2$ buckets get $q = 2$ rows.

```
Bucket 1 (Top 30%): Rows 1, 2, 3 (Spend: $240k, $185k, $140k)
Bucket 2 (30%-60%): Rows 4, 5, 6 (Spend: $98k, $76k, $54k)
Bucket 3 (60%-80%): Rows 7, 8    (Spend: $32k, $21k)
Bucket 4 (Bottom 20%): Rows 9, 10 (Spend: $15k, $8.5k)
```

### 3. Business Value:
This query enables automated account tiering (Tier 1 VIP, Tier 2 Mid-Market, Tier 3 Growth, Tier 4 Self-Serve) for Customer Success and Sales capacity planning without hardcoding arbitrary dollar thresholds that become obsolete with inflation or company growth.

---

## Challenge 4: Active Consecutive Login Streaks (Gaps-and-Islands via Date Arithmetic)

### 1. The Critical Pre-requisite: `DISTINCT user_id, login_date`
If a user logs in **four times on Monday**, and once on Tuesday:
- Without `DISTINCT`, Monday occupies row numbers 1, 2, 3, 4, and Tuesday occupies row number 5.
- $\text{Monday} - 1 = \text{Sunday}$
- $\text{Monday} - 2 = \text{Saturday}$
- $\text{Monday} - 3 = \text{Friday}$
The consecutive streak calculation is completely corrupted!
Therefore, **Phase 1** must always collapse logins to the `(user_id, login_date)` grain via `SELECT DISTINCT` or `GROUP BY`.

### 2. The Anchor Date Proof:
```
Date:        2026-03-01  2026-03-02  2026-03-03  2026-03-04  2026-03-05
Row_Number:  1           2           3           4           5
Difference:  2026-02-28  2026-02-28  2026-02-28  2026-02-28  2026-02-28
```
All 5 consecutive days produce the identical anchor date `2026-02-28`.
When we `GROUP BY user_id, streak_anchor_date`:
- `MIN(login_date)` returns the exact start of the streak (`2026-03-01`).
- `MAX(login_date)` returns the exact end of the streak (`2026-03-05`).
- `COUNT(*)` returns the streak length ($5$).
- `HAVING COUNT(*) >= 3` filters only significant retention streaks.
