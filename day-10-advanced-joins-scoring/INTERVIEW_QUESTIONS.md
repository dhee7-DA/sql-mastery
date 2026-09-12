# 💼 Day 10 — Tier-1 & FAANG SQL Interview Questions: Advanced Joins & Pre-Aggregation

---

### Question 1 (LinkedIn / Graph & Social): How do you find mutual / bidirectional friendships without duplicate mirror pairs?

**Scenario**:
> "Given table `follows(follower_id, followed_id)`, find all mutual friendships (users who follow each other).
> Return the friendship pair such that `user_a < user_b` to avoid returning both `(101, 102)` and `(102, 101)`."

**Senior Solution (Self-Join with Directional Constraint)**:
```sql
SELECT 
    f1.follower_id AS user_a,
    f1.followed_id AS user_b
FROM follows f1
INNER JOIN follows f2 
    ON f1.follower_id = f2.followed_id 
   AND f1.followed_id = f2.follower_id
WHERE f1.follower_id < f1.followed_id
ORDER BY user_a, user_b;
```

**Alternative Modern Approach using `LEAST()` and `GREATEST()`**:
```sql
SELECT 
    LEAST(follower_id, followed_id) AS user_a,
    GREATEST(follower_id, followed_id) AS user_b
FROM follows
GROUP BY 
    LEAST(follower_id, followed_id), 
    GREATEST(follower_id, followed_id)
HAVING COUNT(*) = 2; -- Exactly 2 directional edges exist between the pair
```
> **Tradeoff**: The `LEAST`/`GREATEST` grouping avoids a self-join table scan but cannot use B-Tree indexes on `(follower_id, followed_id)` directly unless expression/functional indexes exist.

---

### Question 2 (Goldman Sachs / Quantitative Trading): How do you compare dual legs of a transaction using a single lookup table?

**Scenario**:
> "You have table `trades(trade_id, buyer_account_id, seller_account_id, trade_value)` and table `accounts(account_id, institutional_tier, risk_score)`.
> Write a query to flag all high-risk trades where the `seller` has a higher risk score than the `buyer` and the trade value exceeds $1,000,000."

**Senior Solution (Multi-Instance Table Aliasing)**:
```sql
SELECT 
    t.trade_id,
    t.trade_value,
    b.account_id AS buyer_id,
    b.risk_score AS buyer_risk,
    s.account_id AS seller_id,
    s.risk_score AS seller_risk
FROM trades t
INNER JOIN accounts b ON t.buyer_account_id = b.account_id  -- Buyer instance
INNER JOIN accounts s ON t.seller_account_id = s.account_id -- Seller instance
WHERE t.trade_value > 1000000
  AND s.risk_score > b.risk_score
ORDER BY (s.risk_score - b.risk_score) DESC;
```

**Architectural Takeaway**:
> When an edge table connects two vertices of the same entity type (`accounts`), the vertex relation must be joined twice with distinct semantic roles. Joining on Primary Keys guarantees zero cardinality distortion.

---

### Question 3 (Meta / Ad Auction Analytics): Why does direct nested aggregation fail in SQL, and how do you structure production CTE pipelines for multi-grain scoring?

**Scenario**:
> "In an ad auction system, an advertiser submits multiple bids per ad campaign.
> We must calculate the total committed budget per advertiser, defined as the sum of their **maximum active bid** across each campaign.
> A candidate writes:
> ```sql
> SELECT advertiser_id, SUM(MAX(bid_amount)) 
> FROM ad_bids 
> WHERE status = 'ACTIVE' 
> GROUP BY advertiser_id;
> ```
> Why does this fail, and how do you write the production-grade CTE?"

**Failure Reason**:
> Relational query engines evaluate `MAX()` across the group defined by `GROUP BY advertiser_id`. `SUM()` cannot simultaneously aggregate the results of `MAX()` in the same evaluation pass without defining an intermediate relation.

**Production-Grade CTE Solution**:
```sql
WITH max_bids_per_campaign AS (
    SELECT 
        advertiser_id, 
        campaign_id, 
        MAX(bid_amount) AS campaign_max_bid
    FROM ad_bids
    WHERE status = 'ACTIVE'
    GROUP BY advertiser_id, campaign_id
)
SELECT 
    a.advertiser_id,
    a.company_name,
    COALESCE(SUM(mb.campaign_max_bid), 0) AS total_committed_budget
FROM advertisers a
LEFT JOIN max_bids_per_campaign mb 
    ON a.advertiser_id = mb.advertiser_id
GROUP BY a.advertiser_id, a.company_name
HAVING total_committed_budget >= 10000
ORDER BY total_committed_budget DESC;
```

---

### Question 4 (Uber / Logistics): How do you perform self-joins on tables lacking Primary Keys without generating false positive self-matches?

**Scenario**:
> "You have table `trip_waypoints(latitude, longitude)` recording vehicle coordinates. Some vehicles pass through the same point multiple times, but there is no `waypoint_id` primary key.
> How do you identify whether coordinate `(lat, lon)` is visited by two distinct points rather than matching a single row to itself?"

**Senior Solution (Synthetic Row ID via `ROW_NUMBER()`)**:
```sql
WITH indexed_waypoints AS (
    SELECT 
        latitude, 
        longitude, 
        ROW_NUMBER() OVER() AS synthetic_id
    FROM trip_waypoints
)
SELECT DISTINCT 
    w1.latitude, 
    w1.longitude
FROM indexed_waypoints w1
INNER JOIN indexed_waypoints w2 
    ON w1.latitude = w2.latitude 
   AND w1.longitude = w2.longitude
   AND w1.synthetic_id != w2.synthetic_id; -- Prevents physical row self-pairing
```
> **Pro Tip**: In tables without unique identifiers, `ROW_NUMBER() OVER()` acts as a zero-cost ephemeral surrogate key, enabling strict row inequality predicates (`w1.id != w2.id`).
