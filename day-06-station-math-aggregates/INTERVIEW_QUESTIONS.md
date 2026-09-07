# 💼 Day 06 FAANG & Fintech Interview Questions

---

### Question 1: "How do you calculate the Median in MySQL without MEDIAN()?"
* **Asked at**: Amazon, Meta, Snowflake, Uber
* **Context**: Many relational engines (MySQL, SQLite) do not have a built-in `MEDIAN()` aggregate.
* **Model Answer**:
  ```sql
  -- Modern MySQL 8.0 Solution:
  WITH OrderedData AS (
    SELECT 
      salary,
      ROW_NUMBER() OVER (ORDER BY salary ASC) AS row_asc,
      COUNT(*) OVER () AS total_count
    FROM employees
  )
  SELECT ROUND(AVG(salary), 2) AS median_salary
  FROM OrderedData
  WHERE row_asc IN (FLOOR((total_count + 1) / 2), CEIL((total_count + 1) / 2));
  ```
* **Key Interviewer Check**: Did the candidate handle both **odd** and **even** row counts properly using `FLOOR`/`CEIL` and `AVG()`?

---

### Question 2: "Why is Median preferred over Mean (Average) for latency & financial metrics?"
* **Asked at**: Datadog, Stripe, Cloudflare
* **Context**: SRE and Payments telemetry.
* **Explanation**:
  * **Mean (`AVG`) is sensitive to outliers**: If 99 users experience 20ms latency and 1 user times out at 30,000ms, the mean is $\approx 320\text{ms}$ (a misleading alarm).
  * **Median (`p50`) is robust to extreme skew**: The median remains 20ms, reflecting true typical user experience.
  * In finance, CEO compensation skews average employee salary, whereas median salary reflects the true midpoint earner.

---

### Question 3: "How does Uber or DoorDash query spatial distance between driver and rider?"
* **Asked at**: Uber, DoorDash, Lyft
* **Context**: Dispatch matching algorithm.
* **Explanation**:
  1. **Manhattan Distance ($L_1$)**: Used as an approximation of urban street grid navigation (city blocks where cars cannot drive diagonally through buildings).
  2. **Euclidean Distance ($L_2$)**: Quick straight-line radius filtering before computing expensive routing graph Dijkstra paths.
  3. **Haversine Formula**: When querying large geographic distances, spherical curvature of the Earth must be accounted for using latitude/longitude radians:
     $$d = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$
  4. In modern production, spatial indexing like **PostGIS** (`ST_Distance`, `ST_DWithin`, R-Tree spatial indexes) or **Uber H3 hexagonal indexing** is used.

---

### Question 4: "Why does `SELECT col, MAX(other_col) FROM table` fail in MySQL 8.0?"
* **Asked at**: Apple, Netflix
* **Context**: SQL execution model and `ONLY_FULL_GROUP_BY`.
* **Explanation**:
  * When `MAX(other_col)` is computed, the database reduces all rows into a single scalar summary value.
  * But `col` has multiple candidate values. Without an explicit rule (like `GROUP BY col`), picking which value of `col` to display is non-deterministic.
  * In MySQL 5.6 and older, MySQL silently picked an arbitrary row value. In MySQL 8.0 and ANSI SQL standards, this throws error `1055 (42000)` to prevent silent bugs.
  * To get the `col` that matches `MAX(other_col)`, use `ORDER BY other_col DESC LIMIT 1` or a window function `ROW_NUMBER()`.
