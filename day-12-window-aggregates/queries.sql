-- =============================================================================
-- DAY 12: WINDOW FUNCTIONS — AGGREGATES, VALUE OFFSETS & ROLLING FRAMES
-- SQL Dialect: MySQL 8.0+ / PostgreSQL / ANSI SQL:2016 Compliant
-- Focus: LAG(), LEAD(), FIRST_VALUE(), LAST_VALUE(), ROWS BETWEEN, Moving Averages
-- =============================================================================

-- =============================================================================
-- SCHEMA SETUP & SEED DATA
-- =============================================================================

DROP TABLE IF EXISTS UserWebEvents;
DROP TABLE IF EXISTS DailyPlatformMetrics;
DROP TABLE IF EXISTS BankTransactions;
DROP TABLE IF EXISTS MonthlySubscriptionRevenue;

CREATE TABLE MonthlySubscriptionRevenue (
    month_date DATE PRIMARY KEY,
    mrr_usd DECIMAL(12,2) NOT NULL,
    active_customers INT NOT NULL
);

CREATE TABLE BankTransactions (
    txn_id BIGINT PRIMARY KEY,
    account_id INT NOT NULL,
    txn_date TIMESTAMP NOT NULL,
    txn_type VARCHAR(16) NOT NULL, -- 'DEPOSIT', 'WITHDRAWAL'
    amount DECIMAL(10,2) NOT NULL
);

CREATE TABLE DailyPlatformMetrics (
    metric_date DATE PRIMARY KEY,
    new_signups INT NOT NULL,
    ad_spend_usd DECIMAL(10,2) NOT NULL
);

CREATE TABLE UserWebEvents (
    event_id BIGINT PRIMARY KEY,
    session_id VARCHAR(32) NOT NULL,
    user_id INT NOT NULL,
    event_name VARCHAR(32) NOT NULL,
    event_timestamp TIMESTAMP NOT NULL
);

-- Seed Data: Monthly SaaS MRR (12-Month Progression)
INSERT INTO MonthlySubscriptionRevenue (month_date, mrr_usd, active_customers) VALUES
('2025-01-01', 50000.00, 120),
('2025-02-01', 54000.00, 132),
('2025-03-01', 58500.00, 145),
('2025-04-01', 63000.00, 158),
('2025-05-01', 61500.00, 155), -- Dip in MRR
('2025-06-01', 69000.00, 172),
('2025-07-01', 75000.00, 188),
('2025-08-01', 82000.00, 205),
('2025-09-01', 89500.00, 224),
('2025-10-01', 94000.00, 238),
('2025-11-01', 102000.00, 260),
('2025-12-01', 115000.00, 295);

-- Seed Data: Bank Transactions (Account Ledgers with exact timestamp ties)
INSERT INTO BankTransactions (txn_id, account_id, txn_date, txn_type, amount) VALUES
(1, 8001, '2026-03-01 09:00:00', 'DEPOSIT', 5000.00),
(2, 8001, '2026-03-02 11:30:00', 'WITHDRAWAL', -1200.00),
(3, 8001, '2026-03-02 11:30:00', 'WITHDRAWAL', -800.00),  -- Exact same timestamp as txn 2!
(4, 8001, '2026-03-04 14:15:00', 'DEPOSIT', 2500.00),
(5, 8001, '2026-03-05 16:45:00', 'WITHDRAWAL', -6000.00), -- Overdraft test
(6, 8002, '2026-03-01 10:00:00', 'DEPOSIT', 10000.00),
(7, 8002, '2026-03-03 12:00:00', 'WITHDRAWAL', -3500.00);

-- Seed Data: Daily Platform Signups (14 Days of Telemetry)
INSERT INTO DailyPlatformMetrics (metric_date, new_signups, ad_spend_usd) VALUES
('2026-03-01', 120, 500.00),
('2026-03-02', 135, 520.00),
('2026-03-03', 140, 540.00),
('2026-03-04', 155, 600.00),
('2026-03-05', 160, 610.00),
('2026-03-06', 95, 400.00),  -- Weekend dip
('2026-03-07', 85, 380.00),  -- Weekend dip
('2026-03-08', 150, 580.00),
('2026-03-09', 165, 620.00),
('2026-03-10', 170, 650.00),
('2026-03-11', 180, 690.00),
('2026-03-12', 190, 710.00),
('2026-03-13', 110, 450.00),
('2026-03-14', 105, 420.00);

-- Seed Data: User Web Clickstream
INSERT INTO UserWebEvents (event_id, session_id, user_id, event_name, event_timestamp) VALUES
(101, 'SES-1', 501, 'page_view', '2026-03-01 14:00:10'),
(102, 'SES-1', 501, 'item_view', '2026-03-01 14:01:45'),
(103, 'SES-1', 501, 'add_to_cart', '2026-03-01 14:03:20'),
(104, 'SES-1', 501, 'checkout_start', '2026-03-01 14:05:00'),
(105, 'SES-1', 501, 'order_confirmed', '2026-03-01 14:06:15'),
(106, 'SES-2', 502, 'page_view', '2026-03-01 15:10:00'),
(107, 'SES-2', 502, 'item_view', '2026-03-01 15:12:30'); -- Drop-off


-- =============================================================================
-- CHALLENGE 1: SAAS MONTHLY REVENUE & MOM GROWTH ACCELERATION
-- Problem: Calculate Month-over-Month MRR growth dollar change and growth percentage.
-- Concepts: LAG(col, 1), NULLIF() division protection, ROUND()
-- =============================================================================

SELECT 
    month_date,
    mrr_usd,
    -- Prior Month MRR
    LAG(mrr_usd, 1) OVER (ORDER BY month_date ASC) AS prior_month_mrr,
    -- Dollar Variance
    ROUND(mrr_usd - LAG(mrr_usd, 1) OVER (ORDER BY month_date ASC), 2) AS mrr_dollar_change,
    -- Percentage Growth Rate
    ROUND(
        (mrr_usd - LAG(mrr_usd, 1) OVER (ORDER BY month_date ASC))
        / NULLIF(LAG(mrr_usd, 1) OVER (ORDER BY month_date ASC), 0) * 100.0,
        2
    ) AS mom_growth_pct
FROM MonthlySubscriptionRevenue
ORDER BY month_date ASC;


-- =============================================================================
-- CHALLENGE 2: BANK ACCOUNT RUNNING BALANCE & OVERDRAFT RISK AUDIT
-- Problem: Calculate real-time ledger balance using explicit ROWS frame to prevent
--          tied-timestamp accumulation errors. Flag any overdrafts.
-- Concepts: SUM() OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
-- =============================================================================

SELECT 
    txn_id,
    account_id,
    txn_date,
    txn_type,
    amount,
    -- Explicit Physical Frame guarantees accurate balance even with identical timestamps!
    SUM(amount) OVER (
        PARTITION BY account_id 
        ORDER BY txn_date ASC, txn_id ASC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_account_balance,
    -- Overdraft Warning Flag
    CASE 
        WHEN SUM(amount) OVER (
            PARTITION BY account_id 
            ORDER BY txn_date ASC, txn_id ASC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) < 0 THEN 'ALERT_OVERDRAFT_FEE_INCURRED'
        ELSE 'NORMAL_POSITIVE_EQUITY'
    END AS account_status
FROM BankTransactions
ORDER BY account_id ASC, txn_date ASC, txn_id ASC;


-- =============================================================================
-- CHALLENGE 3: 7-DAY SMOOTHED MOVING AVERAGE OF USER SIGNUPS
-- Problem: Compute a 7-day trailing moving average to eliminate weekend seasonality noise.
-- Concepts: AVG() OVER (ORDER BY ... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)
-- =============================================================================

SELECT 
    metric_date,
    new_signups,
    -- 7-Day Moving Average (Current Day + 6 Prior Days)
    ROUND(
        AVG(new_signups) OVER (
            ORDER BY metric_date ASC
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ),
        2
    ) AS signups_7d_moving_avg,
    -- Cumulative Total Signups
    SUM(new_signups) OVER (
        ORDER BY metric_date ASC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_total_signups
FROM DailyPlatformMetrics
ORDER BY metric_date ASC;


-- =============================================================================
-- CHALLENGE 4: USER CLICKSTREAM INACTIVITY GAP (LEAD TIME DELTA)
-- Problem: Calculate the seconds elapsed between each user interaction and the NEXT action.
-- Concepts: LEAD(timestamp, 1), TIMESTAMPDIFF() / EXTRACT(EPOCH)
-- =============================================================================

SELECT 
    session_id,
    user_id,
    event_name,
    event_timestamp,
    -- Next Event Timestamp
    LEAD(event_timestamp, 1) OVER (
        PARTITION BY session_id 
        ORDER BY event_timestamp ASC
    ) AS next_event_timestamp,
    -- Seconds Elapsed Until Next Action (MySQL: TIMESTAMPDIFF)
    TIMESTAMPDIFF(
        SECOND, 
        event_timestamp, 
        LEAD(event_timestamp, 1) OVER (
            PARTITION BY session_id 
            ORDER BY event_timestamp ASC
        )
    ) AS seconds_to_next_action
FROM UserWebEvents
ORDER BY session_id ASC, event_timestamp ASC;


-- =============================================================================
-- CHALLENGE 5: ALL-TIME HIGH-WATER MARK ASSET TRACKER (PEAK REVENUE PEAKING)
-- Problem: Track the maximum peak MRR ever achieved up to the current month.
-- Concepts: MAX() OVER (ORDER BY ... ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
-- =============================================================================

SELECT 
    month_date,
    mrr_usd,
    MAX(mrr_usd) OVER (
        ORDER BY month_date ASC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS all_time_high_mrr,
    CASE 
        WHEN mrr_usd >= MAX(mrr_usd) OVER (
            ORDER BY month_date ASC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) THEN 'NEW_ALL_TIME_RECORD'
        ELSE 'DRAWDOWN_BELOW_PEAK'
    END AS business_trajectory
FROM MonthlySubscriptionRevenue
ORDER BY month_date ASC;
