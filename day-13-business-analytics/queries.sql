-- =============================================================================
-- DAY 13: ADVANCED BUSINESS ANALYTICS — CHURN, COHORTS, MoM & LTV
-- Dialect: MySQL 8.0+ / ANSI SQL
-- Complete DDL, Seed Data & Production-Grade Executive Benchmark Queries
-- =============================================================================

DROP TABLE IF EXISTS Invoices;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS Users;

-- -----------------------------------------------------------------------------
-- 1. DDL SCHEMA CREATION
-- -----------------------------------------------------------------------------
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    signup_date DATE NOT NULL,
    acquisition_channel VARCHAR(50) NOT NULL -- 'Paid Search', 'Organic', 'Referral'
);

CREATE TABLE Subscriptions (
    sub_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    billing_month DATE NOT NULL, -- normalized to first of the month
    mrr_usd DECIMAL(10, 2) NOT NULL,
    plan_tier VARCHAR(50) NOT NULL, -- 'Starter ($50)', 'Pro ($150)', 'Enterprise ($500)'
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Invoices (
    invoice_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    amount_usd DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- -----------------------------------------------------------------------------
-- 2. SEED DATA INGESTION
-- -----------------------------------------------------------------------------
INSERT INTO Users (user_id, user_name, signup_date, acquisition_channel) VALUES
(101, 'Acme Corp',        '2025-01-10', 'Paid Search'),
(102, 'Beta Dynamics',    '2025-01-14', 'Organic'),
(103, 'CyberTech AI',     '2025-01-22', 'Referral'),
(104, 'Delta Logistics',  '2025-01-28', 'Paid Search'),
(105, 'Echo Networks',    '2025-02-05', 'Organic'),
(106, 'Falcon Security',  '2025-02-12', 'Referral'),
(107, 'Global Media',     '2025-02-19', 'Paid Search'),
(108, 'Horizon Labs',     '2025-03-02', 'Organic'),
(109, 'Infinita Health',  '2025-03-15', 'Referral'),
(110, 'Jupiter Retail',   '2025-04-01', 'Paid Search');

-- Subscriptions billing history (monthly ledger)
INSERT INTO Subscriptions (sub_id, user_id, billing_month, mrr_usd, plan_tier) VALUES
-- January Cohort (Users 101, 102, 103, 104)
(1,  101, '2025-01-01', 150.00, 'Pro'),
(2,  101, '2025-02-01', 150.00, 'Pro'),
(3,  101, '2025-03-01', 500.00, 'Enterprise'), -- Expansion in M2!
(4,  101, '2025-04-01', 500.00, 'Enterprise'),

(5,  102, '2025-01-01',  50.00, 'Starter'),
(6,  102, '2025-02-01',  50.00, 'Starter'),
(7,  102, '2025-03-01',  50.00, 'Starter'),
-- User 102 churns in April! (No April row)

(8,  103, '2025-01-01', 150.00, 'Pro'),
(9,  103, '2025-02-01',  50.00, 'Starter'), -- Contraction in M1!
(10, 103, '2025-03-01',  50.00, 'Starter'),
(11, 103, '2025-04-01', 150.00, 'Pro'),    -- Expansion back in M3!

(12, 104, '2025-01-01',  50.00, 'Starter'),
-- User 104 churns immediately in Feb!
(13, 104, '2025-04-01',  50.00, 'Starter'), -- Resurrects in April!

-- February Cohort (Users 105, 106, 107)
(14, 105, '2025-02-01', 150.00, 'Pro'),
(15, 105, '2025-03-01', 150.00, 'Pro'),
(16, 105, '2025-04-01', 150.00, 'Pro'),

(17, 106, '2025-02-01', 500.00, 'Enterprise'),
(18, 106, '2025-03-01', 500.00, 'Enterprise'),
(19, 106, '2025-04-01', 500.00, 'Enterprise'),

(20, 107, '2025-02-01',  50.00, 'Starter'),
(21, 107, '2025-03-01',  50.00, 'Starter'),
-- User 107 churns in April

-- March Cohort (Users 108, 109)
(22, 108, '2025-03-01', 150.00, 'Pro'),
(23, 108, '2025-04-01', 150.00, 'Pro'),

(24, 109, '2025-03-01',  50.00, 'Starter'),
(25, 109, '2025-04-01',  50.00, 'Starter'),

-- April Cohort (User 110)
(26, 110, '2025-04-01', 500.00, 'Enterprise');

-- Invoices table (E-Commerce style purchases for LTV analysis)
INSERT INTO Invoices (invoice_id, user_id, invoice_date, amount_usd) VALUES
(501, 101, '2025-01-10', 150.00),
(502, 101, '2025-02-10', 150.00),
(503, 101, '2025-03-12', 500.00),
(504, 101, '2025-04-10', 500.00),

(505, 102, '2025-01-14',  50.00),
(506, 102, '2025-02-14',  50.00),
(507, 102, '2025-03-14',  50.00),

(508, 103, '2025-01-22', 150.00),
(509, 103, '2025-02-22',  50.00),
(510, 103, '2025-03-22',  50.00),
(511, 103, '2025-04-22', 150.00),

(512, 104, '2025-01-28',  50.00),
(513, 104, '2025-04-15',  50.00),

(514, 105, '2025-02-05', 150.00),
(515, 105, '2025-03-05', 150.00),
(516, 105, '2025-04-05', 150.00),

(517, 106, '2025-02-12', 500.00),
(518, 106, '2025-03-12', 500.00),
(519, 106, '2025-04-12', 500.00),

(520, 107, '2025-02-19',  50.00),
(521, 107, '2025-03-19',  50.00),

(522, 108, '2025-03-02', 150.00),
(523, 108, '2025-04-02', 150.00),

(524, 109, '2025-03-15',  50.00),
(525, 109, '2025-04-15',  50.00),

(526, 110, '2025-04-01', 500.00);


-- =============================================================================
-- BENCHMARK QUERY 1: MONTHLY USER RETENTION COHORT MATRIX (TRIANGLE)
-- =============================================================================
-- Business Goal: Track user retention across M0, M1, M2, M3 by acquisition cohort.
-- Output: Cohort Month, Cohort Size, Month 0 %, Month 1 %, Month 2 %, Month 3 %

WITH UserAcquisition AS (
    SELECT user_id,
           DATE_FORMAT(MIN(invoice_date), '%Y-%m-01') AS cohort_month
    FROM Invoices
    GROUP BY user_id
),
UserActivityMonths AS (
    SELECT i.user_id,
           a.cohort_month,
           TIMESTAMPDIFF(MONTH, a.cohort_month, DATE_FORMAT(i.invoice_date, '%Y-%m-01')) AS month_offset
    FROM Invoices i
    JOIN UserAcquisition a ON i.user_id = a.user_id
    GROUP BY i.user_id, a.cohort_month, month_offset
),
CohortSizes AS (
    SELECT cohort_month,
           COUNT(DISTINCT user_id) AS cohort_size
    FROM UserAcquisition
    GROUP BY cohort_month
),
CohortRetentionAggregate AS (
    SELECT u.cohort_month,
           u.month_offset,
           COUNT(DISTINCT u.user_id) AS active_users
    FROM UserActivityMonths u
    GROUP BY u.cohort_month, u.month_offset
)
SELECT 
    s.cohort_month,
    s.cohort_size,
    -- Month 0 (Always 100%)
    ROUND(MAX(CASE WHEN r.month_offset = 0 THEN r.active_users ELSE 0 END) * 100.0 / s.cohort_size, 1) AS m0_retention_pct,
    -- Month 1
    ROUND(MAX(CASE WHEN r.month_offset = 1 THEN r.active_users ELSE 0 END) * 100.0 / s.cohort_size, 1) AS m1_retention_pct,
    -- Month 2
    ROUND(MAX(CASE WHEN r.month_offset = 2 THEN r.active_users ELSE 0 END) * 100.0 / s.cohort_size, 1) AS m2_retention_pct,
    -- Month 3
    ROUND(MAX(CASE WHEN r.month_offset = 3 THEN r.active_users ELSE 0 END) * 100.0 / s.cohort_size, 1) AS m3_retention_pct
FROM CohortSizes s
LEFT JOIN CohortRetentionAggregate r ON s.cohort_month = r.cohort_month
GROUP BY s.cohort_month, s.cohort_size
ORDER BY s.cohort_month ASC;


-- =============================================================================
-- BENCHMARK QUERY 2: SUBSCRIPTION CHURN & ACTIVE SUBSCRIBER CENSUS
-- =============================================================================
-- Business Goal: For each month, compute Start Customers, New Customers,
-- Churned Customers, End Customers, and Logo Churn Rate %.

WITH DistinctMonths AS (
    SELECT DISTINCT billing_month FROM Subscriptions
),
DistinctUsers AS (
    SELECT DISTINCT user_id FROM Subscriptions
),
-- Complete user-month spine
UserMonthSpine AS (
    SELECT m.billing_month, u.user_id
    FROM DistinctMonths m
    CROSS JOIN DistinctUsers u
),
UserStatusPerMonth AS (
    SELECT 
        s.billing_month,
        s.user_id,
        CASE WHEN sub.sub_id IS NOT NULL THEN 1 ELSE 0 END AS is_active_now,
        -- Check if active in previous month
        LAG(CASE WHEN sub.sub_id IS NOT NULL THEN 1 ELSE 0 END, 1, 0) OVER (
            PARTITION BY s.user_id ORDER BY s.billing_month ASC
        ) AS was_active_prev,
        -- Check if user had ANY prior active month (to distinguish New vs Resurrected)
        MAX(CASE WHEN sub.sub_id IS NOT NULL THEN 1 ELSE 0 END) OVER (
            PARTITION BY s.user_id ORDER BY s.billing_month ASC
            ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
        ) AS had_prior_activity
    FROM UserMonthSpine s
    LEFT JOIN Subscriptions sub 
        ON s.user_id = sub.user_id AND s.billing_month = sub.billing_month
),
MonthlyClassifications AS (
    SELECT 
        billing_month,
        user_id,
        is_active_now,
        was_active_prev,
        CASE 
            WHEN is_active_now = 1 AND COALESCE(had_prior_activity, 0) = 0 THEN 'NEW'
            WHEN is_active_now = 1 AND was_active_prev = 1 THEN 'RETAINED'
            WHEN is_active_now = 1 AND was_active_prev = 0 AND had_prior_activity = 1 THEN 'RESURRECTED'
            WHEN is_active_now = 0 AND was_active_prev = 1 THEN 'CHURNED'
            ELSE 'INACTIVE'
        END AS user_lifecycle_state
    FROM UserStatusPerMonth
)
SELECT 
    billing_month,
    SUM(was_active_prev) AS start_subscribers,
    SUM(CASE WHEN user_lifecycle_state = 'NEW' THEN 1 ELSE 0 END) AS new_subscribers,
    SUM(CASE WHEN user_lifecycle_state = 'RESURRECTED' THEN 1 ELSE 0 END) AS resurrected_subscribers,
    SUM(CASE WHEN user_lifecycle_state = 'CHURNED' THEN 1 ELSE 0 END) AS churned_subscribers,
    SUM(is_active_now) AS end_subscribers,
    ROUND(
        SUM(CASE WHEN user_lifecycle_state = 'CHURNED' THEN 1 ELSE 0 END) * 100.0 / 
        NULLIF(SUM(was_active_prev), 0),
        2
    ) AS logo_churn_rate_pct
FROM MonthlyClassifications
GROUP BY billing_month
ORDER BY billing_month ASC;


-- =============================================================================
-- BENCHMARK QUERY 3: COHORT CUMULATIVE LIFETIME VALUE (LTV) & CHANNEL EFFICIENCY
-- =============================================================================
-- Business Goal: Calculate cumulative revenue per acquired user over time,
-- segmented by acquisition channel to evaluate channel ROI.

WITH UserCohorts AS (
    SELECT user_id,
           acquisition_channel,
           DATE_FORMAT(signup_date, '%Y-%m-01') AS cohort_month
    FROM Users
),
ChannelCohortSizes AS (
    SELECT cohort_month,
           acquisition_channel,
           COUNT(DISTINCT user_id) AS cohort_size
    FROM UserCohorts
    GROUP BY cohort_month, acquisition_channel
),
ChannelMonthlySpend AS (
    SELECT u.cohort_month,
           u.acquisition_channel,
           TIMESTAMPDIFF(MONTH, u.cohort_month, DATE_FORMAT(i.invoice_date, '%Y-%m-01')) AS month_offset,
           SUM(i.amount_usd) AS period_spend
    FROM Invoices i
    JOIN UserCohorts u ON i.user_id = u.user_id
    GROUP BY u.cohort_month, u.acquisition_channel, month_offset
)
SELECT 
    s.cohort_month,
    s.acquisition_channel,
    s.cohort_size,
    m.month_offset,
    m.period_spend,
    SUM(m.period_spend) OVER (
        PARTITION BY s.cohort_month, s.acquisition_channel 
        ORDER BY m.month_offset ASC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_channel_spend,
    ROUND(
        SUM(m.period_spend) OVER (
            PARTITION BY s.cohort_month, s.acquisition_channel 
            ORDER BY m.month_offset ASC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) / s.cohort_size,
        2
    ) AS cumulative_ltv_per_user
FROM ChannelCohortSizes s
JOIN ChannelMonthlySpend m 
    ON s.cohort_month = m.cohort_month AND s.acquisition_channel = m.acquisition_channel
ORDER BY s.cohort_month ASC, s.acquisition_channel ASC, m.month_offset ASC;


-- =============================================================================
-- BENCHMARK QUERY 4: EXECUTIVE REVENUE WATERFALL BRIDGE (MoM DECOMPOSITION)
-- =============================================================================
-- Business Goal: Decompose Monthly Recurring Revenue (MRR) changes into
-- Beginning MRR, New MRR, Expansion MRR, Contraction MRR, Churn MRR, and Ending MRR.

WITH DistinctMonths AS (
    SELECT DISTINCT billing_month FROM Subscriptions
),
DistinctUsers AS (
    SELECT DISTINCT user_id FROM Subscriptions
),
UserMonthSpine AS (
    SELECT m.billing_month, u.user_id
    FROM DistinctMonths m
    CROSS JOIN DistinctUsers u
),
UserRevenueTransitions AS (
    SELECT 
        s.billing_month,
        s.user_id,
        COALESCE(sub.mrr_usd, 0.00) AS current_mrr,
        COALESCE(LAG(sub.mrr_usd, 1, 0.00) OVER (
            PARTITION BY s.user_id ORDER BY s.billing_month ASC
        ), 0.00) AS prior_mrr,
        -- Detect first billing date to identify true NEW vs Expansion
        MIN(sub.billing_month) OVER (PARTITION BY s.user_id) AS first_bill_month
    FROM UserMonthSpine s
    LEFT JOIN Subscriptions sub 
        ON s.user_id = sub.user_id AND s.billing_month = sub.billing_month
),
RevenueDeltas AS (
    SELECT 
        billing_month,
        user_id,
        current_mrr,
        prior_mrr,
        -- New MRR
        CASE 
            WHEN billing_month = first_bill_month AND current_mrr > 0 THEN current_mrr 
            ELSE 0.00 
        END AS new_mrr,
        -- Expansion MRR (existing client paying more)
        CASE 
            WHEN billing_month > first_bill_month AND current_mrr > prior_mrr AND prior_mrr > 0 THEN current_mrr - prior_mrr
            WHEN billing_month > first_bill_month AND current_mrr > 0 AND prior_mrr = 0 THEN current_mrr -- Resurrected
            ELSE 0.00 
        END AS expansion_mrr,
        -- Contraction MRR (paying less but still active)
        CASE 
            WHEN current_mrr < prior_mrr AND current_mrr > 0 THEN prior_mrr - current_mrr
            ELSE 0.00 
        END AS contraction_mrr,
        -- Churn MRR (drops completely to zero)
        CASE 
            WHEN current_mrr = 0 AND prior_mrr > 0 THEN prior_mrr
            ELSE 0.00 
        END AS churn_mrr
    FROM UserRevenueTransitions
)
SELECT 
    billing_month,
    SUM(prior_mrr) AS beginning_mrr,
    SUM(new_mrr) AS new_mrr,
    SUM(expansion_mrr) AS expansion_mrr,
    SUM(contraction_mrr) AS contraction_mrr,
    SUM(churn_mrr) AS churn_mrr,
    SUM(current_mrr) AS ending_mrr,
    -- Net MRR Growth %
    ROUND(
        (SUM(current_mrr) - SUM(prior_mrr)) * 100.0 / NULLIF(SUM(prior_mrr), 0),
        2
    ) AS net_mrr_growth_pct,
    -- Net Revenue Retention % (Cohort of beginning MRR)
    ROUND(
        (SUM(prior_mrr) + SUM(expansion_mrr) - SUM(contraction_mrr) - SUM(churn_mrr)) * 100.0 / 
        NULLIF(SUM(prior_mrr), 0),
        2
    ) AS nrr_pct
FROM RevenueDeltas
GROUP BY billing_month
ORDER BY billing_month ASC;
