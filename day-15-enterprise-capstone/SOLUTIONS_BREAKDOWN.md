# 🔬 Day 15 Solutions Breakdown: Architectural Autopsy & Execution Mechanics

---

## 🏗️ Stage 1: Data Cleansing & Invariant Standardization

```sql
SanitizedInternal AS (
    SELECT 
        trade_id,
        desk_code,
        UPPER(TRIM(raw_ticker)) AS clean_ticker,
        UPPER(TRIM(isin)) AS isin,
        asset_class,
        UPPER(TRIM(side)) AS side,
        trade_qty,
        execution_price,
        (trade_qty * execution_price) AS local_notional,
        UPPER(TRIM(currency)) AS currency,
        CAST(trade_timestamp AS DATE) AS trade_date,
        counterparty_id
    FROM internal_trade_blotter
    WHERE status = 'EXECUTED'
)
```

### The Architectural Rationale:
1. **Defensive String Normalization**:
   - Trading blotters ingested via FIX protocols often include trailing spaces (e.g. `' AAPL.US '` vs `'AAPL'`).
   - `TRIM()` combined with `UPPER()` eliminates character casing and whitespace divergence before joins occur.
2. **Deterministic Date Slicing**:
   - `trade_timestamp` includes milliseconds and timezone offsets (`2026-10-14 09:31:12-04`).
   - A direct timestamp equality join will fail 100% of the time because clearing confirmations arrive seconds or minutes after order fill.
   - Slicing to `CAST(trade_timestamp AS DATE)` establishes a uniform daily clearing window.

---

## ⚡ Stage 2: Dual-Sided Set Matching (`FULL OUTER JOIN`)

```sql
MatchedRaw AS (
    SELECT 
        COALESCE(i.trade_id, d.dtcc_ref_id) AS recon_key,
        i.trade_id,
        d.dtcc_ref_id,
        COALESCE(i.isin, d.isin) AS isin,
        COALESCE(i.side, d.side) AS side,
        i.trade_qty AS internal_qty,
        d.cleared_qty AS cleared_qty,
        COALESCE(i.trade_qty, 0) - COALESCE(d.cleared_qty, 0) AS qty_delta,
        ...
        CASE
            WHEN d.dtcc_ref_id IS NULL THEN 'PHANTOM_INTERNAL_TRADE'
            WHEN i.trade_id IS NULL THEN 'UNAUTHORIZED_EXTERNAL_FILL'
            WHEN ABS(i.execution_price - d.clearing_price) > 0.005 
             AND i.trade_qty != d.cleared_qty THEN 'MULTIPLE_DISCREPANCY'
            WHEN ABS(i.execution_price - d.clearing_price) > 0.005 THEN 'PRICE_MISMATCH'
            WHEN i.trade_qty != d.cleared_qty THEN 'QUANTITY_MISMATCH'
            ELSE 'MATCHED'
        END AS break_category
    FROM SanitizedInternal i
    FULL OUTER JOIN SanitizedDTCC d
      ON i.isin = d.isin
     AND i.side = d.side
     AND i.trade_date = d.cleared_date
)
```

### Why `FULL OUTER JOIN` is Non-Negotiable:
In reconciliation systems, standard joins create catastrophic visibility black holes:
- `INNER JOIN`: Silently discards Phantom Trades and Unauthorized External Fills, blinding risk managers to 100% of missing executions.
- `LEFT JOIN`: Only finds internal breaks; completely ignores external unauthorized fills.
- `FULL OUTER JOIN`: Preserves the complete union set ($Internal \cup External$), allowing clean algebraic classification:
  - If $d$ is null: Record belongs strictly to $Internal \setminus External$.
  - If $i$ is null: Record belongs strictly to $External \setminus Internal$.
  - If both present: Record belongs to $Internal \cap External$.

---

## 💱 Stage 3: Multi-Currency Triangulation & FX Valuation

```sql
ValuatedBreaks AS (
    SELECT 
        m.*,
        fx.usd_exchange_rate,
        ROUND(
            CASE 
                WHEN m.break_category = 'PHANTOM_INTERNAL_TRADE' 
                    THEN m.internal_local_notional * fx.usd_exchange_rate
                WHEN m.break_category = 'UNAUTHORIZED_EXTERNAL_FILL' 
                    THEN m.cleared_local_notional * fx.usd_exchange_rate
                ELSE ABS(
                    COALESCE(m.internal_local_notional, 0) - COALESCE(m.cleared_local_notional, 0)
                ) * fx.usd_exchange_rate
            END, 
            2
        ) AS exposure_usd
    FROM MatchedRaw m
    JOIN fx_daily_rates fx 
      ON m.currency = fx.currency 
     AND m.recon_date = fx.rate_date
)
```

### The Math Behind Capital-at-Risk (CaR):
1. **Economic Delta vs Total Value**:
   - For a price/quantity mismatch on a matched trade, the capital-at-risk is strictly the **monetary difference** between both sides ($\Delta_{\text{local}} \times R_{\text{FX}}$).
   - For phantom trades and rogue external fills, the **entire gross notional value** is at risk because one party has zero counterparty backing for the trade!
2. **Pre-Normalized Multiplier Architecture**:
   - Rather than executing conditional logic for direct (`EUR/USD * rate`) vs indirect (`USD/JPY / rate`) quotes, `fx_daily_rates` stores all rates as a standardized **multiplier to USD**. JPY is stored as `0.006550` rather than `152.67`. This enables a single branch-free hardware vector multiplication.

---

## 📊 Stage 4 & 5: Counterparty Risk Concentration (`DENSE_RANK`)

```sql
SELECT 
    counterparty_id,
    total_trades,
    total_breaks,
    break_rate_pct,
    counterparty_exposure_usd,
    DENSE_RANK() OVER (ORDER BY counterparty_exposure_usd DESC) AS risk_rank
FROM CounterpartyRisk
ORDER BY risk_rank ASC;
```

### Why `DENSE_RANK()` Over `RANK()` or `ROW_NUMBER()`:
- `ROW_NUMBER()` assigns arbitrary consecutive integers to ties, falsely declaring one broker higher risk than another when both have identical exposure.
- `RANK()` skips rank integers after ties ($1, 2, 2, 4$), creating gaps that disrupt downstream executive tiering metrics (e.g. "Top 3 High-Risk Counterparties").
- `DENSE_RANK()` cleanly preserves risk clusters ($1, 2, 2, 3$), accurately grouping counterparties with identical risk postures.

---

## ⏱️ Computational Complexity & Production Index Tuning

### Query Complexity:
- **Join Complexity**: $\mathcal{O}(M \log M + N \log N)$ via Sort-Merge Join, or $\mathcal{O}(M + N)$ via In-Memory Hash Join.
- **Window Function Complexity**: $\mathcal{O}(K \log K)$ where $K$ is the number of active counterparties ($K \ll N$).

### Recommended Index Strategy:
```sql
-- Compound B+ Tree covering index on Internal Blotter:
CREATE INDEX idx_internal_recon_cover 
ON internal_trade_blotter(isin, side, CAST(trade_timestamp AS DATE)) 
INCLUDE (trade_id, trade_qty, execution_price, currency, counterparty_id);

-- Compound B+ Tree covering index on DTCC Clearing Manifest:
CREATE INDEX idx_dtcc_recon_cover 
ON dtcc_clearing_records(isin, side, CAST(cleared_timestamp AS DATE)) 
INCLUDE (dtcc_ref_id, cleared_qty, clearing_price, currency, executing_broker);
```
With these covering indexes, the query engine performs high-speed index-only scans, bypassing the physical table heap entirely during Stage 1 and Stage 2!
