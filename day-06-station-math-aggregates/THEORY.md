# 📐 Day 06 Theory: Coordinate Geometry, Distance Metrics & The Median in SQL

---

## 1. Geospatial Coordinates in Relational SQL

Geographic coordinate systems represent positions on Earth using two angles:
* **`LAT_N` (Northern Latitude)**: Angular distance north (+) or south (-) of the Equator (Y-axis).
* **`LONG_W` (Western Longitude)**: Angular distance west (+) or east (-) of the Prime Meridian (X-axis).

When querying point sets in SQL:
* **Bounding Box**: Defined by 4 extrema:
  $$\text{Bottom-Left } P_1 = (\min(\text{LAT\_N}), \min(\text{LONG\_W})) = (a, b)$$
  $$\text{Top-Right } P_2 = (\max(\text{LAT\_N}), \max(\text{LONG\_W})) = (c, d)$$

---

## 2. Distance Metrics: Manhattan ($L_1$) vs Euclidean ($L_2$)

```
          P2 (c, d)
            ▲
            │       ╱ (Euclidean / Straight Line)
            │     ╱
            │   ╱
(Manhattan) │ ╱
            │
            ├──────────────►
         P1 (a, b)   (Manhattan)
```

### A. Manhattan Distance ($L_1$ Norm / Taxicab Distance)
The grid-based walking distance along axes with no diagonal movement:
$$\text{Distance} = |a - c| + |b - d|$$

Because $c = \max(\text{LAT\_N}) \ge a = \min(\text{LAT\_N})$, the absolute value simplifies directly to:
$$\text{Distance} = (c - a) + (d - b)$$

**SQL Translation**:
```sql
SELECT ROUND((MAX(LAT_N) - MIN(LAT_N)) + (MAX(LONG_W) - MIN(LONG_W)), 4)
FROM STATION;
```

### B. Euclidean Distance ($L_2$ Norm / Straight Line)
The true geometric straight-line distance derived from the Pythagorean theorem:
$$\text{Distance} = \sqrt{(c - a)^2 + (d - b)^2}$$

**SQL Translation**:
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

## 3. The Cross-Coordinate Extremum Pattern

A frequent interview pattern asks:
> *"Find the Longitude (`LONG_W`) of the station that has the MAXIMUM Latitude (`LAT_N`) under 137.2345."*

### Why this fails:
```sql
-- ❌ SYNTAX ERROR / LOGICAL BUG:
SELECT LONG_W, MAX(LAT_N) 
FROM STATION 
WHERE LAT_N < 137.2345;
```
In MySQL 8.0 / ANSI SQL (`ONLY_FULL_GROUP_BY`), selecting a non-aggregated column (`LONG_W`) alongside `MAX(LAT_N)` without `GROUP BY` is invalid!

### Pattern 1: `ORDER BY ... LIMIT 1` (Optimal & Cleanest)
Instead of aggregating, sort descending and take the top record:
```sql
SELECT ROUND(LONG_W, 4)
FROM STATION
WHERE LAT_N < 137.2345
ORDER BY LAT_N DESC
LIMIT 1;
```
* **Performance**: Index scan on `(LAT_N)` allows finding the exact row in $O(1)$ or $O(\log N)$ time.

### Pattern 2: Correlated Subquery (Traditional Academic)
```sql
SELECT ROUND(LONG_W, 4)
FROM STATION
WHERE LAT_N = (
  SELECT MAX(LAT_N)
  FROM STATION
  WHERE LAT_N < 137.2345
);
```
* **Caveat**: If multiple stations share the identical maximum latitude, this returns multiple rows. `ORDER BY ... LIMIT 1` is strictly deterministic.

---

## 4. The Famous "Median in SQL" Problem (Station 20)

### Why is the Median Difficult in MySQL?
* PostgreSQL has `PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY val)`.
* Oracle has `MEDIAN(val)`.
* **MySQL has NO built-in `MEDIAN()` function!**

The **Median** is defined as the value separating the higher half from the lower half of an ordered dataset:
1. Sort all values ascending: $x_1 \le x_2 \le \dots \le x_N$.
2. If $N$ is odd, Median is at index:
   $$\text{Index} = \frac{N + 1}{2}$$
3. If $N$ is even, Median is the average of indexes:
   $$\frac{x_{N/2} + x_{(N/2) + 1}}{2}$$

---

### Solution Strategy 1: Modern MySQL 8.0 Window Function (`ROW_NUMBER`)

We assign an ascending row index to every station ordered by `LAT_N`, count the total rows, and pick the middle row:

```sql
WITH RankedStations AS (
  SELECT 
    LAT_N,
    ROW_NUMBER() OVER (ORDER BY LAT_N) AS row_num,
    COUNT(*) OVER () AS total_rows
  FROM STATION
)
SELECT ROUND(AVG(LAT_N), 4) AS median_lat
FROM RankedStations
WHERE row_num IN (FLOOR((total_rows + 1) / 2), CEIL((total_rows + 1) / 2));
```

#### Why `IN (FLOOR(...), CEIL(...))` with `AVG()`?
* If $N = 499$ (odd):
  * `FLOOR(500/2) = 250`
  * `CEIL(500/2) = 250`
  * `row_num IN (250)` ➔ Picks row 250. `AVG(val)` of 1 row is itself.
* If $N = 500$ (even):
  * `FLOOR(501/2) = 250`
  * `CEIL(501/2) = 251`
  * `row_num IN (250, 251)` ➔ `AVG(LAT_N)` computes the exact mathematical average of the two middle elements!
* **Result**: Works universally for **both odd and even** row counts!

---

### Solution Strategy 2: User Variables (MySQL 5.7 / HackerRank Compatible)

HackerRank's MySQL environment frequently runs MySQL 5.7 where CTEs/Window functions may be limited or user variables are expected:

```sql
SET @rowindex := -1;

SELECT ROUND(AVG(s.LAT_N), 4)
FROM (
  SELECT @rowindex := @rowindex + 1 AS rowindex, LAT_N
  FROM STATION
  ORDER BY LAT_N
) AS s
WHERE s.rowindex IN (FLOOR(@rowindex / 2), CEIL(@rowindex / 2));
```

#### Step-by-Step Execution:
1. `SET @rowindex := -1;`
2. Subquery sorts all rows by `LAT_N` ascending and increments `@rowindex` from `0` to `N - 1`.
3. In the outer query, `@rowindex` now equals $N - 1$ (the total row count minus 1).
4. `WHERE s.rowindex IN (FLOOR(@rowindex / 2), CEIL(@rowindex / 2))` filters down to the exact center index.
5. `ROUND(AVG(s.LAT_N), 4)` emits the median rounded to 4 decimal places.
