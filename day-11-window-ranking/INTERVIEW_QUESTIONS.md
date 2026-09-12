# 💼 Day 11: Real-World Interview Case Studies & System Architecture Scenarios

Window functions are the single highest-frequency topic in Senior Data Analyst, Analytics Engineer, and Data Scientist technical interviews across FAANG and Tier-1 tech firms.

---

## Scenario 1: Stripe — Top 2 Highest-Value Disputed Charges Per Merchant
**Level**: Senior Data Analyst / Risk Analytics Engineer  
**Company Archetype**: Fintech / Payment Gateway

### The Business Context:
Stripe risk operations need to flag the top 2 highest-value disputed credit card transactions for every merchant onboarded on the platform within the last 30 days to prepare for Visa/Mastercard regulatory review. If a merchant has multiple disputes with the exact same highest amount, all of them must be surfaced without arbitrarily dropping tied disputes.

### Schema:
```sql
Disputes (
    dispute_id VARCHAR(32) PRIMARY KEY,
    merchant_id VARCHAR(32) NOT NULL,
    dispute_amount_usd DECIMAL(10,2) NOT NULL,
    dispute_date TIMESTAMP NOT NULL
)
```

### The Candidate Solution:
```sql
WITH RankedDisputes AS (
    SELECT 
        merchant_id,
        dispute_id,
        dispute_amount_usd,
        dispute_date,
        DENSE_RANK() OVER (
            PARTITION BY merchant_id 
            ORDER BY dispute_amount_usd DESC
        ) AS amount_rank
    FROM Disputes
    WHERE dispute_date >= CURRENT_DATE - INTERVAL 30 DAY
)
SELECT 
    merchant_id,
    dispute_id,
    dispute_amount_usd,
    dispute_date,
    amount_rank
FROM RankedDisputes
WHERE amount_rank <= 2
ORDER BY merchant_id ASC, amount_rank ASC, dispute_date DESC;
```

### Interviewer Follow-Up Question:
> *"Why did you choose `DENSE_RANK()` over `RANK()` or `ROW_NUMBER()`? What happens if a merchant has two \$5,000 disputes and one \$4,000 dispute?"*
- **The Alpha Response**:
  - `ROW_NUMBER()` would arbitrarily pick one \$5,000 dispute as #1 and the other as #2, and then discard the \$4,000 dispute, effectively pretending the merchant only had one \$5,000 and one lower dispute.
  - `RANK()` would assign both \$5,000 disputes rank #1, but would skip to rank #3 for the \$4,000 dispute, excluding the \$4,000 dispute from `WHERE rank <= 2`!
  - `DENSE_RANK()` assigns both \$5,000 disputes rank #1 and assigns the \$4,000 dispute rank #2. This ensures risk investigators see the true top 2 distinct dollar exposure tiers.

---

## Scenario 2: Meta — Eliminating Profile Update Race Conditions (Deduplication)
**Level**: Analytics Engineer / Core Data Infrastructure  
**Company Archetype**: Social Media / Distributed Systems

### The Business Context:
In Meta's distributed Kafka event stream, user profile updates (e.g., changes to country, email, privacy setting) are delivered out-of-order due to network partitions. Your data pipeline receives raw events in an append-only lakehouse table. You must construct a materialized daily view that captures each user's single latest confirmed profile status.

### Schema:
```sql
UserProfileEvents (
    event_uuid VARCHAR(64) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    privacy_setting VARCHAR(16) NOT NULL,
    event_timestamp TIMESTAMP NOT NULL,
    server_sequence_id BIGINT NOT NULL
)
```

### The Candidate Solution:
```sql
WITH LatestProfileState AS (
    SELECT 
        user_id,
        country_code,
        privacy_setting,
        event_timestamp,
        ROW_NUMBER() OVER (
            PARTITION BY user_id 
            ORDER BY event_timestamp DESC, server_sequence_id DESC
        ) AS recency_order
    FROM UserProfileEvents
)
SELECT 
    user_id,
    country_code,
    privacy_setting,
    event_timestamp AS last_updated_at
FROM LatestProfileState
WHERE recency_order = 1;
```

### Interviewer Follow-Up Question:
> *"Why did you include `server_sequence_id DESC` in the `ORDER BY`? Can't we rely solely on `event_timestamp`?"*
- **The Alpha Response**:
  - Microsecond or millisecond clocks on distributed server nodes suffer from clock skew (NTP drift). Two updates occurring in rapid succession may share identical timestamps.
  - Without `server_sequence_id DESC`, `ROW_NUMBER()` becomes non-deterministic. Consecutive pipeline runs might pick different states for the same user, causing silent data corruption and non-reproducible analytical downstream tables.

---

## Scenario 3: Uber — Driver Efficiency Quintiles (`NTILE(5)`)
**Level**: Senior Product Analyst  
**Company Archetype**: Mobility / Marketplace Dynamics

### The Business Context:
Uber marketplace operations wants to divide active drivers in each metropolitan market into 5 equal-sized performance quintiles ($20\%$ cohorts) based on completed trips per active online hour. The top $20\%$ (Quintile 1) will receive weekly incentive bonuses; the bottom $20\%$ (Quintile 5) will be targeted for instructional onboarding coaching.

### Schema:
```sql
DriverWeeklyMetrics (
    market_id VARCHAR(16) NOT NULL,
    driver_id VARCHAR(32) NOT NULL,
    completed_trips INT NOT NULL,
    online_hours DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (market_id, driver_id)
)
```

### The Candidate Solution:
```sql
WITH DriverEfficiency AS (
    SELECT 
        market_id,
        driver_id,
        completed_trips,
        online_hours,
        ROUND(completed_trips / NULLIF(online_hours, 0), 3) AS trips_per_hour
    FROM DriverWeeklyMetrics
    WHERE online_hours >= 10.0 -- Minimum threshold to prevent single-trip distortions
),
QuintileRanked AS (
    SELECT 
        market_id,
        driver_id,
        trips_per_hour,
        NTILE(5) OVER (
            PARTITION BY market_id 
            ORDER BY trips_per_hour DESC
        ) AS efficiency_quintile
    FROM DriverEfficiency
)
SELECT 
    market_id,
    driver_id,
    trips_per_hour,
    efficiency_quintile,
    CASE efficiency_quintile
        WHEN 1 THEN 'Top Tier: Cash Incentive Eligible'
        WHEN 5 THEN 'Low Utilization: Coaching Recommended'
        ELSE 'Standard Performance'
    END AS operational_action
FROM QuintileRanked
ORDER BY market_id ASC, efficiency_quintile ASC, trips_per_hour DESC;
```

### Key Engineering Guardrail:
- Used `NULLIF(online_hours, 0)` to prevent division-by-zero database crashes.
- Applied `WHERE online_hours >= 10.0` *before* the window function so that inactive drivers do not skew the quintile boundary calculations.
