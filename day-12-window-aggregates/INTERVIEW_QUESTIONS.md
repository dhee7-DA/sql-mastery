# 💼 Day 12: Real-World Interview Case Studies & System Architecture Scenarios

Window aggregates, offset navigation (`LAG`/`LEAD`), and rolling frames represent the core analytical toolset evaluated in Staff Data Analyst and Lead Analytics Engineer interviews at Stripe, Netflix, and Amazon.

---

## Scenario 1: Stripe — Real-Time Merchant Payout Balance & Negative Reserve Audit
**Level**: Senior Analytics Engineer / Fintech Infrastructure  
**Company Archetype**: Payment Processing / Ledger Systems

### The Business Context:
Stripe allows merchants to withdraw sales proceeds daily. However, chargebacks and dispute fees can pull a merchant's running balance below \$0.00. You must construct an audit ledger query that tracks each merchant's cumulative running balance after every debit and credit, flagging any instance where the balance drops below \$0.00 (requiring reserve account replenishment).

### Schema:
```sql
MerchantLedgerEntries (
    entry_id BIGINT PRIMARY KEY,
    merchant_id VARCHAR(32) NOT NULL,
    entry_type VARCHAR(16) NOT NULL, -- 'CHARGE_CAPTURE', 'REFUND', 'DISPUTE_FEE'
    amount_usd DECIMAL(10,2) NOT NULL,
    posted_at TIMESTAMP NOT NULL
)
```

### The Candidate Solution:
```sql
WITH CumulativeLedger AS (
    SELECT 
        merchant_id,
        entry_id,
        posted_at,
        entry_type,
        amount_usd,
        SUM(amount_usd) OVER (
            PARTITION BY merchant_id 
            ORDER BY posted_at ASC, entry_id ASC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS current_balance
    FROM MerchantLedgerEntries
)
SELECT 
    merchant_id,
    entry_id,
    posted_at,
    entry_type,
    amount_usd,
    current_balance,
    CASE 
        WHEN current_balance < 0.00 THEN 'RESERVE_COLLATERAL_HOLD_TRIGGERED'
        ELSE 'SETTLEMENT_HEALTHY'
    END AS risk_disposition
FROM CumulativeLedger
ORDER BY merchant_id ASC, posted_at ASC, entry_id ASC;
```

### Interviewer Follow-Up Question:
> *"Why did you write `ORDER BY posted_at ASC, entry_id ASC` instead of just `ORDER BY posted_at ASC`?"*
- **The Alpha Response**:
  - In high-throughput payment systems, hundreds of charges and refunds occur in the same millisecond.
  - If multiple entries share the exact same `posted_at` timestamp, the order of row evaluation is undefined without a unique secondary tie-breaker.
  - Furthermore, using `ROWS BETWEEN` paired with a unique key guarantees deterministic, audit-compliant balances that match the physical sequence of ledger journal entries.

---

## Scenario 2: Netflix — Video Binge-Watching Session Boundary Detection
**Level**: Senior Product Data Scientist  
**Company Archetype**: Streaming Media / Content Consumption

### The Business Context:
Netflix product analytics needs to define "Binge-Watching Sessions". When a user finishes an episode, the analytics pipeline must calculate the seconds elapsed before the next episode starts. If the gap between episodes is greater than **45 minutes (2,700 seconds)**, the subsequent view is classified as the start of a brand-new viewing session rather than a continuation of the previous binge.

### Schema:
```sql
EpisodePlaybacks (
    playback_id VARCHAR(32) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title_name VARCHAR(64) NOT NULL,
    playback_end_time TIMESTAMP NOT NULL
)
```

### The Candidate Solution:
```sql
WITH PlaybackIntervals AS (
    SELECT 
        user_id,
        title_name,
        playback_end_time,
        LEAD(playback_end_time, 1) OVER (
            PARTITION BY user_id 
            ORDER BY playback_end_time ASC
        ) AS next_playback_start
    FROM EpisodePlaybacks
)
SELECT 
    user_id,
    title_name,
    playback_end_time,
    next_playback_start,
    TIMESTAMPDIFF(SECOND, playback_end_time, next_playback_start) AS idle_seconds_between_episodes,
    CASE 
        WHEN next_playback_start IS NULL THEN 'SESSION_TERMINATED'
        WHEN TIMESTAMPDIFF(SECOND, playback_end_time, next_playback_start) <= 2700 THEN 'BINGE_CONTINUATION'
        ELSE 'SESSION_DROP_OFF'
    END AS binge_classification
FROM PlaybackIntervals
ORDER BY user_id ASC, playback_end_time ASC;
```

---

## Scenario 3: Amazon — 7-Day Trailing Moving Average for Warehouse Pick Velocity
**Level**: Operations Research / Supply Chain Analytics  
**Company Archetype**: E-Commerce Fulfillment / Logistics

### The Business Context:
Fulfillment center operations need to track hourly unit pick velocity smoothed across a 7-day rolling window to forecast dock staffing requirements and eliminate day-of-week distortion (e.g. Cyber Monday spikes vs. mid-week lulls).

### Schema:
```sql
WarehouseDailyPicks (
    warehouse_id VARCHAR(16) NOT NULL,
    pick_date DATE NOT NULL,
    units_picked INT NOT NULL,
    PRIMARY KEY (warehouse_id, pick_date)
)
```

### The Candidate Solution:
```sql
SELECT 
    warehouse_id,
    pick_date,
    units_picked,
    ROUND(
        AVG(units_picked) OVER (
            PARTITION BY warehouse_id 
            ORDER BY pick_date ASC
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ),
        2
    ) AS smoothed_7d_pick_velocity,
    -- Week-over-Week (WoW) Pick Velocity Delta
    ROUND(
        units_picked - LAG(units_picked, 7) OVER (
            PARTITION BY warehouse_id 
            ORDER BY pick_date ASC
        ),
        2
    ) AS wow_volume_change
FROM WarehouseDailyPicks
ORDER BY warehouse_id ASC, pick_date ASC;
```

### Key Engineering Guardrail:
- Explicitly partition by `warehouse_id` so moving averages for Warehouse `JFK8` do not bleed into Warehouse `LAX9`.
- Combined `AVG() OVER (ROWS 6 PRECEDING)` with `LAG(col, 7)` to deliver both smoothed trendlines and exact same-day-last-week operational benchmarks.
