-- =============================================================================
-- DAY 19: PRODUCTION FINANCIAL GAPS & ISLANDS BENCHMARK QUERIES
-- =============================================================================

-- 1. Active Trading Streak Detector (Row-Number Difference Pattern)
WITH DistinctTradingDays AS (
    SELECT DISTINCT trader_id, CAST(trade_time AS DATE) AS trade_date
    FROM institutional_trades
),
GroupedStreaks AS (
    SELECT 
        trader_id,
        trade_date,
        trade_date - (ROW_NUMBER() OVER (PARTITION BY trader_id ORDER BY trade_date))::INT AS grp_key
    FROM DistinctTradingDays
)
SELECT 
    trader_id,
    MIN(trade_date) AS streak_start_date,
    MAX(trade_date) AS streak_end_date,
    COUNT(*) AS consecutive_trading_days
FROM GroupedStreaks
GROUP BY trader_id, grp_key
HAVING COUNT(*) >= 5
ORDER BY consecutive_trading_days DESC;

-- 2. Web & Mobile Sessionization via Step-Transition Cumulative Sum
WITH EventLags AS (
    SELECT 
        session_user_id,
        event_timestamp,
        LAG(event_timestamp) OVER (
            PARTITION BY session_user_id ORDER BY event_timestamp
        ) AS prev_event_timestamp
    FROM user_clickstream
),
SessionFlags AS (
    SELECT 
        session_user_id,
        event_timestamp,
        CASE 
            WHEN prev_event_timestamp IS NULL THEN 1
            WHEN event_timestamp > prev_event_timestamp + INTERVAL '30 minutes' THEN 1
            ELSE 0 
        END AS is_new_session
    FROM EventLags
),
SessionNumbered AS (
    SELECT 
        session_user_id,
        event_timestamp,
        SUM(is_new_session) OVER (
            PARTITION BY session_user_id ORDER BY event_timestamp
        ) AS session_id
    FROM SessionFlags
)
SELECT 
    session_user_id,
    session_id,
    MIN(event_timestamp) AS session_start,
    MAX(event_timestamp) AS session_end,
    COUNT(*) AS total_clicks,
    ROUND(EXTRACT(EPOCH FROM (MAX(event_timestamp) - MIN(event_timestamp))) / 60.0, 2) AS duration_minutes
FROM SessionNumbered
GROUP BY session_user_id, session_id;

-- 3. Continuous As-Of Financial Ledger Balance Reconstruction
WITH DailyMovements AS (
    SELECT 
        account_id,
        CAST(settlement_time AS DATE) AS entry_date,
        SUM(amount_cents) AS net_daily_movement_cents
    FROM ledger_entries
    GROUP BY account_id, CAST(settlement_time AS DATE)
)
SELECT 
    account_id,
    entry_date,
    net_daily_movement_cents,
    SUM(net_daily_movement_cents) OVER (
        PARTITION BY account_id ORDER BY entry_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS continuous_running_balance_cents
FROM DailyMovements
ORDER BY account_id, entry_date;
