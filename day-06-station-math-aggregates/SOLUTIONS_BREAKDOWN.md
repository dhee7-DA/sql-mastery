# 🔍 Day 06 Solutions Breakdown & Mathematical Analysis

This document provides step-by-step logic, AST execution plans, and edge-case traps for all 9 challenges in **Day 06**.

---

### Challenge 1: Weather Observation Station 2
* **Objective**: Sum `LAT_N` and `LONG_W` separately, rounded to 2 decimal places.
* **SQL**: `SELECT ROUND(SUM(LAT_N), 2), ROUND(SUM(LONG_W), 2) FROM STATION;`
* **Execution Breakdown**:
  1. `FROM STATION`: Table scan reads all rows into memory.
  2. `SUM(LAT_N)` & `SUM(LONG_W)`: Single-pass aggregation accumulating totals.
  3. `ROUND(..., 2)`: Truncates to 2 fractional digits with half-up rounding.
* **Gotcha**: Do not sum both columns together (`SUM(LAT_N + LONG_W)` is incorrect). They are separate projected metrics.

---

### Challenges 2, 3, 5: Weather Observation Station 13, 14, 16
* **Objective**: Range filtering combined with `SUM()`, `MAX()`, and `MIN()`.
* **Station 13**: `SELECT ROUND(SUM(LAT_N), 4) FROM STATION WHERE LAT_N > 38.7880 AND LAT_N < 137.2345;`
* **Station 14**: `SELECT ROUND(MAX(LAT_N), 4) FROM STATION WHERE LAT_N < 137.2345;`
* **Station 16**: `SELECT ROUND(MIN(LAT_N), 4) FROM STATION WHERE LAT_N > 38.7780;`
* **Key Insight**: The `WHERE` clause filters rows *before* aggregation occurs. Rows failing the predicate never reach the `SUM` / `MAX` / `MIN` accumulators.

---

### Challenges 4 & 6: Weather Observation Station 15 & 17
* **Objective**: Find the complementary coordinate (`LONG_W`) corresponding to an extreme latitude.
* **Station 15**:
  ```sql
  SELECT ROUND(LONG_W, 4)
  FROM STATION
  WHERE LAT_N < 137.2345
  ORDER BY LAT_N DESC
  LIMIT 1;
  ```
* **Station 17**:
  ```sql
  SELECT ROUND(LONG_W, 4)
  FROM STATION
  WHERE LAT_N > 38.7780
  ORDER BY LAT_N ASC
  LIMIT 1;
  ```
* **Why `ORDER BY ... LIMIT 1` beats a Subquery**:
  1. Correlated subqueries like `WHERE LAT_N = (SELECT MAX(LAT_N) ...)` require 2 passes over the table ($O(2N)$).
  2. `ORDER BY ... LIMIT 1` is evaluated in a single pass with a bounded priority queue of size 1 ($O(N \log 1)$), which can also use an index seek on `LAT_N`.

---

### Challenge 7: Weather Observation Station 18 (Manhattan Distance)
* **Mathematical Definition**: Given $P_1(a, b)$ and $P_2(c, d)$:
  $$\text{Distance} = |a - c| + |b - d|$$
* Since $c = \max(\text{LAT\_N}) \ge a = \min(\text{LAT\_N})$ and $d = \max(\text{LONG\_W}) \ge b = \min(\text{LONG\_W})$:
  $$|a - c| = c - a = \max(\text{LAT\_N}) - \min(\text{LAT\_N})$$
  $$|b - d| = d - b = \max(\text{LONG\_W}) - \min(\text{LONG\_W})$$
* **SQL**:
  ```sql
  SELECT ROUND((MAX(LAT_N) - MIN(LAT_N)) + (MAX(LONG_W) - MIN(LONG_W)), 4)
  FROM STATION;
  ```
* **Complexity**: $O(N)$ single-pass aggregation over `STATION`.

---

### Challenge 8: Weather Observation Station 19 (Euclidean Distance)
* **Mathematical Definition**: The straight-line Euclidean distance:
  $$\text{Distance} = \sqrt{(c - a)^2 + (d - b)^2}$$
* **SQL Functions**:
  * `POW(x, 2)`: Squares the differential.
  * `SQRT(x)`: Computes square root.
* **SQL**:
  ```sql
  SELECT ROUND(
    SQRT(
      POW(MAX(LAT_N) - MIN(LAT_N), 2) + 
      POW(MAX(LONG_W) - MIN(LONG_W), 2)
    ), 
    4
  )
  FROM STATION;
  ```

---

### Challenge 9: Weather Observation Station 20 (The Median)
* **The Challenge**: Find the exact middle value of `LAT_N` sorted ascending, rounded to 4 decimal places.
* **Odd vs Even Total Rows**:
  * If $N = 499$, middle is row `250`.
  * If $N = 500$, middle is the average of rows `250` and `251`.
* **Universal Math Formulation**:
  `IN (FLOOR((total + 1) / 2), CEIL((total + 1) / 2))`
* **MySQL 5.7 User Variable Execution (HackerRank compatible)**:
  ```sql
  SET @r := -1;

  SELECT ROUND(AVG(sub.LAT_N), 4)
  FROM (
      SELECT @r := @r + 1 AS r_idx, LAT_N
      FROM STATION
      ORDER BY LAT_N ASC
  ) AS sub
  WHERE sub.r_idx IN (FLOOR(@r / 2), CEIL(@r / 2));
  ```
  1. `SET @r := -1;` initializes the counter.
  2. Inside `sub`, `@r` increments by 1 for each row ordered by `LAT_N` (0-indexed: `0` to `N - 1`).
  3. By the time the outer query executes, `@r` holds $N - 1$.
  4. For $N = 499$: `@r = 498`. `FLOOR(249) = 249`, `CEIL(249) = 249`. Selects row index `249` (the 250th row).
  5. `AVG()` averages the selected rows (if 1 row, returns itself; if 2 rows for an even count, returns their midpoint).
