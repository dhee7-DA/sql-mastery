# 💼 Day 09 — Tier-1 & FAANG SQL Interview Questions: Intermediate Relational Joins & Subqueries

---

### Question 1 (Stripe / Fintech): How do you calculate dynamic tiered pricing or transaction fees without hardcoding `CASE WHEN` statements?

**Scenario**:
> "Stripe charges variable processing fee rates based on monthly transaction volume tiers:
> - Tier 1: $0 - $10,000 ➡️ 2.9% + $0.30
> - Tier 2: $10,001 - $50,000 ➡️ 2.5% + $0.25
> - Tier 3: $50,001+ ➡️ 2.2% + $0.20
> 
> How do you join transactions against a `fee_tiers` lookup table, and what execution plan challenges arise?"

**Senior Solution (Non-Equi Join with Range Predicate)**:
```sql
SELECT 
    m.merchant_id,
    m.monthly_volume,
    t.tier_name,
    (m.monthly_volume * t.percentage_rate) + (m.transaction_count * t.fixed_fee) AS total_monthly_fee
FROM merchant_monthly_summary m
INNER JOIN fee_tiers t 
    ON m.monthly_volume >= t.min_volume 
   AND (m.monthly_volume <= t.max_volume OR t.max_volume IS NULL);
```

**Optimizer & Performance Analysis**:
> "Relational engines (MySQL, PostgreSQL, Oracle) cannot construct standard in-memory **Hash Joins** for inequality range conditions (`>=`, `<=`, `BETWEEN`).
> 
> The optimizer is forced to fall back to a **Nested Loop Join** or **Block Nested Loop** ($O(N \times M)$) unless an index is present on `(min_volume, max_volume)`. In analytical engines like Snowflake or BigQuery, this can trigger micro-partition scanning across the entire lookup table unless cluster keys or range pruning are enforced."

---

### Question 2 (Amazon / Supply Chain): In a 4-table join chain, what causes a "Silent Grain Drift", and how do you guarantee primary entity uniqueness?

**Scenario**:
> "You join `Customers` ➡️ `Orders` ➡️ `OrderItems` ➡️ `Shipments`. You want a report of high-value customers with more than 5 distinct orders. A junior engineer wrote:
> ```sql
> SELECT c.customer_id, c.name, COUNT(*) AS order_count
> FROM Customers c
> JOIN Orders o ON c.customer_id = o.customer_id
> JOIN OrderItems oi ON o.order_id = oi.order_id
> JOIN Shipments s ON o.order_id = s.order_id
> GROUP BY c.customer_id, c.name
> HAVING COUNT(*) > 5;
> ```
> Why is this report critically wrong, and how do you rewrite it safely?"

**Root Cause (Cartesian Multiplication Across 1-to-Many Relationships)**:
> 1. `Orders` to `OrderItems` is $1:M$ (1 order has 4 items).
> 2. `Orders` to `Shipments` is $1:M$ (1 order split into 2 packages).
> 3. `COUNT(*)` counts the rows of the **joined Cartesian product**, which is $1 \times 4 \times 2 = 8$ rows for a single order!
> 4. The `HAVING` clause will trigger for customers who placed only **1 order** because that order had 3 items split into 2 packages ($3 \times 2 = 6 > 5$)!

**Correct Enterprise Rewrite**:
```sql
-- Solution A: Precise Distinct Counting
SELECT 
    c.customer_id, 
    c.name, 
    COUNT(DISTINCT o.order_id) AS distinct_order_count
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN OrderItems oi ON o.order_id = oi.order_id
JOIN Shipments s ON o.order_id = s.order_id
GROUP BY c.customer_id, c.name
HAVING COUNT(DISTINCT o.order_id) > 5;

-- Solution B: Pre-aggregating Before Joining (Grain Preservation)
WITH eligible_orders AS (
    SELECT customer_id, COUNT(order_id) AS order_count
    FROM Orders
    GROUP BY customer_id
    HAVING COUNT(order_id) > 5
)
SELECT c.customer_id, c.name, eo.order_count
FROM Customers c
JOIN eligible_orders eo ON c.customer_id = eo.customer_id;
```

---

### Question 3 (Netflix / Media): How do you solve the "Minimum Attribute per Group" problem (The Ollivander's Pattern) when you must return row identifiers?

**Scenario**:
> "You have a catalog of movie streams: `(stream_id, movie_id, region, server_id, latency_ms)`.
> Find the specific `stream_id` and `server_id` that provides the lowest latency for each `(movie_id, region)` combination."

**The Trap**:
> A naive `GROUP BY movie_id, region` with `MIN(latency_ms)` returns the minimum latency number, but SQL engines in ANSI mode will reject `SELECT stream_id, server_id` because those columns are non-aggregated and not in the `GROUP BY` list!

**Solution 1: Correlated Subquery (MySQL 5.7+ / Universal SQL)**:
```sql
SELECT s.stream_id, s.movie_id, s.region, s.server_id, s.latency_ms
FROM streams s
WHERE s.latency_ms = (
    SELECT MIN(sub.latency_ms)
    FROM streams sub
    WHERE sub.movie_id = s.movie_id
      AND sub.region = s.region
)
ORDER BY s.movie_id, s.region;
```

**Solution 2: Modern Window Function CTE (`DENSE_RANK()`)**:
```sql
WITH ranked_streams AS (
    SELECT 
        stream_id, 
        movie_id, 
        region, 
        server_id, 
        latency_ms,
        DENSE_RANK() OVER(
            PARTITION BY movie_id, region 
            ORDER BY latency_ms ASC, server_id ASC
        ) AS rnk
    FROM streams
)
SELECT stream_id, movie_id, region, server_id, latency_ms
FROM ranked_streams
WHERE rnk = 1;
```
> **Tradeoff**: The Window Function requires only a single pass over the table ($O(N \log N)$ sort), whereas an unindexed correlated subquery executes $O(N \times M)$ scans!

---

### Question 4 (Uber / Marketplace): How do you find overlapping driver shifts or ride requests using Self-Joins?

**Scenario**:
> "Given table `driver_shifts(shift_id, driver_id, start_time, end_time)`, identify all conflicting shifts where the same driver was logged into multiple vehicles simultaneously."

**Production Self-Join with Directional Inequality**:
```sql
SELECT 
    s1.driver_id,
    s1.shift_id AS shift_a,
    s2.shift_id AS shift_b,
    s1.start_time AS a_start,
    s1.end_time   AS a_end,
    s2.start_time AS b_start,
    s2.end_time   AS b_end
FROM driver_shifts s1
INNER JOIN driver_shifts s2 
    ON s1.driver_id = s2.driver_id 
   AND s1.shift_id < s2.shift_id -- Directional inequality prevents self-matches and duplicate mirror pairs
WHERE s1.start_time < s2.end_time 
  AND s1.end_time > s2.start_time; -- Standard interval intersection condition
```

**Why `s1.shift_id < s2.shift_id` is Essential**:
1. It eliminates comparing a row to itself (`shift 101` matching `shift 101`).
2. It prevents returning duplicate mirrored pairs `(101, 102)` and `(102, 101)`, halving output volume and query execution cost.
