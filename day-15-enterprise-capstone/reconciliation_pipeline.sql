-- =============================================================================
-- GRAND CAPSTONE: MULTI-ASSET RECONCILIATION ENGINE
-- PRODUCTION PIPELINE: 5-STAGE END-TO-END RECONCILIATION & RISK ATTRIBUTION
-- =============================================================================

-- Set run parameters
-- Run ID: A deterministic UUID representing today's morning reconciliation cycle
-- As-of Date: '2026-10-14'

WITH 
-- =============================================================================
-- STAGE 1: INGESTION SANITIZATION & NORMALIZATION CTEs
-- Cleans messy ticker strings, casts dates, and standardizes currency ISO codes.
-- =============================================================================
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
        trade_timestamp,
        counterparty_id,
        trader_id
    FROM internal_trade_blotter
    WHERE status = 'EXECUTED'
),

SanitizedDTCC AS (
    SELECT 
        dtcc_ref_id,
        executing_broker,
        UPPER(TRIM(ticker)) AS clean_ticker,
        UPPER(TRIM(isin)) AS isin,
        UPPER(TRIM(side)) AS side,
        cleared_qty,
        clearing_price,
        (cleared_qty * clearing_price) AS local_cleared_notional,
        UPPER(TRIM(currency)) AS currency,
        CAST(cleared_timestamp AS DATE) AS cleared_date,
        cleared_timestamp,
        clearing_status
    FROM dtcc_clearing_records
    WHERE clearing_status = 'CLEARED'
),

-- =============================================================================
-- STAGE 2: DETERMINISTIC DUAL-SIDED MATCHING & DISCREPANCY DETECTION
-- Matches records using a FULL OUTER JOIN on ISIN, side, and trade date.
-- =============================================================================
MatchedRaw AS (
    SELECT 
        -- Surrogate reconciliation identifier
        COALESCE(i.trade_id, d.dtcc_ref_id) AS recon_key,
        i.trade_id,
        d.dtcc_ref_id,
        COALESCE(i.desk_code, 'UNASSIGNED_DESK') AS desk_code,
        COALESCE(i.counterparty_id, d.executing_broker) AS counterparty_id,
        COALESCE(i.asset_class, 'EQUITY') AS asset_class,
        COALESCE(i.clean_ticker, d.clean_ticker) AS ticker,
        COALESCE(i.isin, d.isin) AS isin,
        COALESCE(i.side, d.side) AS side,
        COALESCE(i.currency, d.currency) AS currency,
        COALESCE(i.trade_date, d.cleared_date) AS recon_date,
        
        -- Volume & Price Metrics
        i.trade_qty AS internal_qty,
        d.cleared_qty AS cleared_qty,
        COALESCE(i.trade_qty, 0) - COALESCE(d.cleared_qty, 0) AS qty_delta,
        
        i.execution_price,
        d.clearing_price,
        COALESCE(i.execution_price, 0) - COALESCE(d.clearing_price, 0) AS price_delta,
        
        i.local_notional AS internal_local_notional,
        d.local_cleared_notional AS cleared_local_notional,

        -- Discrepancy Categorization Logic
        CASE
            -- Case 1: Missing on clearing side
            WHEN d.dtcc_ref_id IS NULL THEN 'PHANTOM_INTERNAL_TRADE'
            
            -- Case 2: Missing on internal blotter
            WHEN i.trade_id IS NULL THEN 'UNAUTHORIZED_EXTERNAL_FILL'
            
            -- Case 3: Both price and quantity differ
            WHEN ABS(i.execution_price - d.clearing_price) > 0.005 
             AND i.trade_qty != d.cleared_qty THEN 'MULTIPLE_DISCREPANCY'
            
            -- Case 4: Price differs beyond threshold ($0.005)
            WHEN ABS(i.execution_price - d.clearing_price) > 0.005 THEN 'PRICE_MISMATCH'
            
            -- Case 5: Quantity differs
            WHEN i.trade_qty != d.cleared_qty THEN 'QUANTITY_MISMATCH'
            
            -- Case 6: Exact Match
            ELSE 'MATCHED'
        END AS break_category,

        -- Ageing Calculation (Days elapsed since trade date relative to 2026-10-14)
        DATE('2026-10-14') - COALESCE(i.trade_date, d.cleared_date) AS ageing_days
    FROM SanitizedInternal i
    FULL OUTER JOIN SanitizedDTCC d
      ON i.isin = d.isin
     AND i.side = d.side
     AND i.trade_date = d.cleared_date
),

-- =============================================================================
-- STAGE 3: MULTI-CURRENCY FX HARMONIZATION & VALUATION
-- Binds daily FX rates to convert all local notional amounts into USD base.
-- =============================================================================
ValuatedBreaks AS (
    SELECT 
        m.*,
        fx.usd_exchange_rate,
        
        -- Calculate USD Equivalent for internal and cleared notions
        ROUND(m.internal_local_notional * fx.usd_exchange_rate, 2) AS internal_usd_notional,
        ROUND(m.cleared_local_notional * fx.usd_exchange_rate, 2) AS cleared_usd_notional,

        -- Capital-at-Risk (CaR) USD: Absolute exposure of the discrepancy
        ROUND(
            CASE 
                -- If completely missing on one side, entire available notional is at risk!
                WHEN m.break_category = 'PHANTOM_INTERNAL_TRADE' 
                    THEN m.internal_local_notional * fx.usd_exchange_rate
                WHEN m.break_category = 'UNAUTHORIZED_EXTERNAL_FILL' 
                    THEN m.cleared_local_notional * fx.usd_exchange_rate
                -- For quantity/price discrepancies, the delta represents exposure
                ELSE ABS(
                    COALESCE(m.internal_local_notional, 0) - COALESCE(m.cleared_local_notional, 0)
                ) * fx.usd_exchange_rate
            END, 
            2
        ) AS exposure_usd,

        -- Severity Scoring based on Capital-at-Risk & Ageing Days
        CASE
            WHEN m.break_category = 'MATCHED' THEN 'NORMAL'
            WHEN m.ageing_days >= 3 OR (
                CASE 
                    WHEN m.break_category = 'PHANTOM_INTERNAL_TRADE' THEN m.internal_local_notional * fx.usd_exchange_rate
                    WHEN m.break_category = 'UNAUTHORIZED_EXTERNAL_FILL' THEN m.cleared_local_notional * fx.usd_exchange_rate
                    ELSE ABS(COALESCE(m.internal_local_notional, 0) - COALESCE(m.cleared_local_notional, 0)) * fx.usd_exchange_rate
                END
            ) >= 1000000 THEN 'CRITICAL'
            WHEN m.ageing_days >= 2 OR (
                CASE 
                    WHEN m.break_category = 'PHANTOM_INTERNAL_TRADE' THEN m.internal_local_notional * fx.usd_exchange_rate
                    WHEN m.break_category = 'UNAUTHORIZED_EXTERNAL_FILL' THEN m.cleared_local_notional * fx.usd_exchange_rate
                    ELSE ABS(COALESCE(m.internal_local_notional, 0) - COALESCE(m.cleared_local_notional, 0)) * fx.usd_exchange_rate
                END
            ) >= 250000 THEN 'HIGH'
            WHEN m.ageing_days >= 1 THEN 'MEDIUM'
            ELSE 'NORMAL'
        END AS severity
    FROM MatchedRaw m
    JOIN fx_daily_rates fx 
      ON m.currency = fx.currency 
     AND m.recon_date = fx.rate_date
)

-- =============================================================================
-- STAGE 4: EXECUTIVE RECONCILIATION SUMMARY SCORECARD (VIEW / REPORT)
-- =============================================================================
SELECT 
    break_category,
    COUNT(*) AS trade_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS pct_of_total_trades,
    SUM(COALESCE(exposure_usd, 0)) AS total_exposure_usd,
    ROUND(AVG(COALESCE(exposure_usd, 0)), 2) AS avg_exposure_usd,
    MAX(ageing_days) AS max_ageing_days
FROM ValuatedBreaks
GROUP BY break_category
ORDER BY total_exposure_usd DESC;

-- =============================================================================
-- STAGE 5: COUNTERPARTY CONCENTRATION & CAPITAL-AT-RISK EXPOSURE RANKING
-- Uses Window Function DENSE_RANK() to identify top risk counterparties.
-- =============================================================================
WITH CounterpartyRisk AS (
    SELECT 
        counterparty_id,
        COUNT(*) AS total_trades,
        COUNT(CASE WHEN break_category != 'MATCHED' THEN 1 END) AS total_breaks,
        ROUND(
            COUNT(CASE WHEN break_category != 'MATCHED' THEN 1 END) * 100.0 / COUNT(*), 
            1
        ) AS break_rate_pct,
        SUM(CASE WHEN break_category != 'MATCHED' THEN exposure_usd ELSE 0 END) AS counterparty_exposure_usd
    FROM ValuatedBreaks
    GROUP BY counterparty_id
)
SELECT 
    counterparty_id,
    total_trades,
    total_breaks,
    break_rate_pct,
    counterparty_exposure_usd,
    DENSE_RANK() OVER (ORDER BY counterparty_exposure_usd DESC) AS risk_rank
FROM CounterpartyRisk
ORDER BY risk_rank ASC;

-- =============================================================================
-- STAGE 6: ATOMIC PERSISTENCE INTO RECON_SETTLEMENT_BREAKS
-- =============================================================================
INSERT INTO recon_settlement_breaks (
    reconciliation_run_id,
    trade_id,
    dtcc_ref_id,
    counterparty_id,
    asset_class,
    break_category,
    severity,
    qty_delta,
    price_delta,
    exposure_usd,
    ageing_days,
    resolution_status
)
SELECT 
    'f47ac10b-58cc-4372-a567-0e02b2c3d479'::UUID AS reconciliation_run_id,
    trade_id,
    dtcc_ref_id,
    counterparty_id,
    asset_class,
    break_category,
    severity,
    qty_delta,
    price_delta,
    exposure_usd,
    ageing_days,
    'UNRESOLVED' AS resolution_status
FROM ValuatedBreaks
WHERE break_category != 'MATCHED';
