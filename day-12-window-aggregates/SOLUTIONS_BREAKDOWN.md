# 🔬 Day 12: Solutions Breakdown — Deep Architectural Analysis

---

## Challenge 1: SaaS Monthly Revenue & MoM Growth Acceleration

### 1. What is Being Tested?
- Accessing prior chronological rows without self-joins.
- Implementing financial percentage growth formulas in SQL.
- Defensive handling of boundary edge cases (`NULL` on Month 1, zero revenue division).

### 2. The Formula & Edge Cases
$$\text{MoM Growth \%} = \frac{\text{Current MRR} - \text{Prior MRR}}{\text{Prior MRR}} \times 100$$

1. **The First Row Boundary**:
   On `2025-01-01` (the very first recorded month), there is no prior month. `LAG(mrr_usd, 1)` naturally returns `NULL`.
   - `mrr_usd - NULL` evaluates to `NULL` (Three-Valued Logic).
   - This is mathematically correct: you cannot calculate Month-over-Month growth on Month 1!
2. **The Division-by-Zero Defense (`NULLIF`)**:
   If a company launched a product with \$0 in month 1, and made \$5,000 in month 2, dividing by `0` crashes the database with `ERROR 1365 (22012): Division by 0` in MySQL/PostgreSQL.
   - Using `NULLIF(LAG(...), 0)` converts `0` into `NULL`.
   - Any number divided by `NULL` returns `NULL`, cleanly bypassing server crashes!

```sql
ROUND(
    (mrr_usd - LAG(mrr_usd, 1) OVER (ORDER BY month_date ASC))
    / NULLIF(LAG(mrr_usd, 1) OVER (ORDER BY month_date ASC), 0) * 100.0,
    2
) AS mom_growth_pct
```

---

## Challenge 2: Bank Running Balance & The "Tied Date" Disaster

### 1. What is Being Tested?
- Building real-time double-entry financial ledgers.
- Preventing catastrophic ledger distortion from tied timestamps.

### 2. The Disaster: What happens if you omit the `ROWS` clause?
Consider Account `8001` on `2026-03-02 at 11:30:00`:
The user made **two transactions at the exact same minute**:
- Transaction 2: Withdrawal of -\$1,200
- Transaction 3: Withdrawal of -\$800

```sql
-- ❌ DANGEROUS CODE (Omitted Frame Clause):
SUM(amount) OVER (PARTITION BY account_id ORDER BY txn_date ASC)
```
Because `ROWS` was omitted, the database defaults to:
`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`

- For Transaction 2, the engine sees that Transaction 3 shares the **exact same `txn_date`**.
- Under `RANGE`, both rows are grouped together!
- **Result**: Transaction 2 will show a running balance of **\$3,000** (reflecting both -\$1,200 and -\$800 immediately), skipping the intermediate \$3,800 state!
- If the account had a \$1,500 balance, the user would be falsely hit with an overdraft fee on Transaction 2 before Transaction 3 even cleared!

### 3. The Production Solution:
```sql
SUM(amount) OVER (
    PARTITION BY account_id 
    ORDER BY txn_date ASC, txn_id ASC
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
) AS running_account_balance
```
1. **`ORDER BY txn_date ASC, txn_id ASC`**: Adds a unique tie-breaker.
2. **`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`**: Explicitly forces physical row-by-row accumulation.

---

## Challenge 3: 7-Day Smoothed Moving Average of User Signups

### 1. What is Being Tested?
- Eliminating weekday/weekend cyclical noise using rolling window frames.
- Frame boundary calculations ($n \text{ PRECEDING}$).

### 2. Why is the Frame `6 PRECEDING`, not `7 PRECEDING`?
A common rookie mistake is writing `ROWS BETWEEN 7 PRECEDING AND CURRENT ROW`.
- `CURRENT ROW` counts as **1 row**.
- `6 PRECEDING` adds **6 prior rows**.
- Total rows in frame = $1 + 6 = \mathbf{7\text{ rows}}$!
If you wrote `7 PRECEDING`, you would be calculating an **8-day moving average**!

### 3. The Edge Days (Days 1 to 6):
What happens on Day 3, when only 2 prior rows exist?
- Does SQL crash? **No.**
- Does SQL return `NULL`? **No.**
- The SQL standard dictates that window frames dynamically shrink to the available rows at partition boundaries.
- On Day 3, the frame contains `[Day 1, Day 2, Day 3]`. The engine calculates $\frac{\text{Sum}(3 \text{ days})}{3}$. By Day 7, the frame reaches full 7-row capacity.

---

## Challenge 4: User Clickstream Inactivity Gap (`LEAD`)

### 1. What is Being Tested?
- Measuring elapsed latency between consecutive user actions.
- Session drop-off and abandonment analysis.

### 2. Mechanics & Cross-Dialect Date Math:
To compute the seconds between `event_timestamp` and the subsequent action:
- `LEAD(event_timestamp, 1) OVER (PARTITION BY session_id ORDER BY event_timestamp ASC)` peeks at the next row's timestamp.
- On the final event of the session (e.g. `order_confirmed` or checkout drop-off), `LEAD()` returns `NULL`.
- **MySQL**: `TIMESTAMPDIFF(SECOND, event_timestamp, next_timestamp)`.
- **PostgreSQL**: `EXTRACT(EPOCH FROM (next_timestamp - event_timestamp))`.
- **Snowflake / BigQuery**: `DATEDIFF('second', event_timestamp, next_timestamp)`.

This metric directly powers **Sessionization Engines** (e.g. flagging sessions where `seconds_to_next_action > 1800` as abandoned).
