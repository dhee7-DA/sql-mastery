-- ==============================================================================
-- DAY 07b: SET OPERATIONS, MULTI-DIMENSIONAL GROUPING & INDEXING PHYSICS
-- Dialect: ANSI SQL / MySQL 8.0+ / PostgreSQL Compatible
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- SCHEMA SETUP & SAMPLE DATA
-- ------------------------------------------------------------------------------

DROP TABLE IF EXISTS retail_sales;
DROP TABLE IF EXISTS mobile_active_users;
DROP TABLE IF EXISTS web_active_users;
DROP TABLE IF EXISTS core_banking_ledger;
DROP TABLE IF EXISTS payment_gateway_ledger;
DROP TABLE IF EXISTS legacy_crm_customers;
DROP TABLE IF EXISTS cloud_crm_customers;

CREATE TABLE legacy_crm_customers (
    customer_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    account_status VARCHAR(20) NOT NULL
);

CREATE TABLE cloud_crm_customers (
    customer_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    account_status VARCHAR(20) NOT NULL
);

CREATE TABLE payment_gateway_ledger (
    txn_id VARCHAR(50) PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    settled_at DATE NOT NULL
);

CREATE TABLE core_banking_ledger (
    txn_id VARCHAR(50) PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    settled_at DATE NOT NULL
);

CREATE TABLE web_active_users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    last_login DATE NOT NULL
);

CREATE TABLE mobile_active_users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    last_login DATE NOT NULL
);

CREATE TABLE retail_sales (
    sale_id INT PRIMARY KEY,
    region VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL,
    store_name VARCHAR(50) NOT NULL,
    product_line VARCHAR(30) NOT NULL,
    channel VARCHAR(20) NOT NULL,
    quarter VARCHAR(10) NOT NULL,
    revenue DECIMAL(12, 2) NOT NULL
);

-- Seed Data
INSERT INTO legacy_crm_customers VALUES
(101, 'Alice Morgan', 'alice@corp.com', 'ACTIVE'),
(102, 'Bob Davies', 'bob@corp.com', 'INACTIVE'),
(103, 'Carol White', 'carol@corp.com', 'ACTIVE');

INSERT INTO cloud_crm_customers VALUES
(102, 'Bob Davies', 'bob@corp.com', 'ACTIVE'), -- Updated status in new system
(103, 'Carol White', 'carol@corp.com', 'ACTIVE'), -- Identical duplicate
(104, 'David Beckham', 'david@corp.com', 'ACTIVE');

INSERT INTO payment_gateway_ledger VALUES
('TXN-001', 5001, 1500.00, '2026-03-01'),
('TXN-002', 5002, 2300.00, '2026-03-01'),
('TXN-003', 5003, 850.00,  '2026-03-02'),
('TXN-004', 5004, 4200.00, '2026-03-03');

INSERT INTO core_banking_ledger VALUES
('TXN-001', 5001, 1500.00, '2026-03-01'),
('TXN-002', 5002, 2300.00, '2026-03-01'),
-- Note: TXN-003 is missing in core banking (unreconciled discrepancy!)
('TXN-005', 5005, 990.00,  '2026-03-04'); -- Present in core but missing in gateway

INSERT INTO web_active_users VALUES
(1, 'usr_alpha', '2026-03-10'),
(2, 'usr_beta',  '2026-03-11'),
(3, 'usr_gamma', '2026-03-12');

INSERT INTO mobile_active_users VALUES
(2, 'usr_beta',  '2026-03-11'), -- Active on both Web & Mobile
(3, 'usr_gamma', '2026-03-12'), -- Active on both Web & Mobile
(4, 'usr_delta', '2026-03-13');

INSERT INTO retail_sales VALUES
(1, 'Americas', 'USA',    'Manhattan Flagship', 'Hardware', 'In-Store', 'Q1-2026', 500000.00),
(2, 'Americas', 'USA',    'Chicago Hub',        'Hardware', 'Online',   'Q1-2026', 320000.00),
(3, 'Americas', 'Canada', 'Toronto Centre',     'Hardware', 'In-Store', 'Q1-2026', 280000.00),
(4, 'EMEA',     'UK',     'London Oxford St',   'Software', 'Online',   'Q1-2026', 450000.00),
(5, 'EMEA',     'Germany','Berlin Alexander',   'Software', 'In-Store', 'Q1-2026', 390000.00),
(6, 'EMEA',     'Germany','Munich Central',     'Hardware', 'In-Store', 'Q1-2026', 210000.00);


-- ==============================================================================
-- CHALLENGE 1: MULTI-SYSTEM CUSTOMER RECONCILIATION
-- Task: Combine records across Legacy CRM and Cloud CRM, retaining source provenance
--       using UNION ALL, and deduplicating customer profiles.
-- ==============================================================================

-- Approach A: Unified System Audit Stream (UNION ALL with source tags)
SELECT 
    'Legacy CRM' AS source_system,
    customer_id,
    full_name,
    email,
    account_status
FROM legacy_crm_customers
UNION ALL
SELECT 
    'Cloud CRM' AS source_system,
    customer_id,
    full_name,
    email,
    account_status
FROM cloud_crm_customers
ORDER BY customer_id ASC, source_system ASC;

-- Approach B: Purged Unique Profile Base (UNION)
SELECT 
    customer_id,
    full_name,
    email
FROM legacy_crm_customers
UNION
SELECT 
    customer_id,
    full_name,
    email
FROM cloud_crm_customers
ORDER BY customer_id ASC;


-- ==============================================================================
-- CHALLENGE 2: DISCREPANCY AUDIT VIA SET DIFFERENCE (EXCEPT / MINUS)
-- Task: Identify all transaction IDs that settled in the Payment Gateway but NEVER
--       landed in the Core Banking Ledger, and vice versa.
-- ==============================================================================

-- ANSI / PostgreSQL 15+ Native Syntax:
-- (SELECT txn_id, amount FROM payment_gateway_ledger)
-- EXCEPT
-- (SELECT txn_id, amount FROM core_banking_ledger);

-- Universal Engine Pattern (Compatible across MySQL 8.0, Snowflake, PostgreSQL):
SELECT 
    'Missing in Core Banking (In Gateway Only)' AS audit_verdict,
    pg.txn_id,
    pg.amount,
    pg.settled_at
FROM payment_gateway_ledger AS pg
WHERE NOT EXISTS (
    SELECT 1 
    FROM core_banking_ledger AS cb 
    WHERE cb.txn_id = pg.txn_id
)

UNION ALL

SELECT 
    'Missing in Gateway (In Core Banking Only)' AS audit_verdict,
    cb.txn_id,
    cb.amount,
    cb.settled_at
FROM core_banking_ledger AS cb
WHERE NOT EXISTS (
    SELECT 1 
    FROM payment_gateway_ledger AS pg 
    WHERE pg.txn_id = cb.txn_id
);


-- ==============================================================================
-- CHALLENGE 3: CROSS-PLATFORM USER IDENTITY OVERLAP (INTERSECT)
-- Task: Find users active on BOTH Web and Mobile channels.
-- ==============================================================================

-- Universal ANSI / MySQL / Postgres Pattern:
SELECT 
    w.user_id,
    w.username
FROM web_active_users AS w
WHERE EXISTS (
    SELECT 1 
    FROM mobile_active_users AS m 
    WHERE m.user_id = w.user_id
)
ORDER BY w.user_id ASC;


-- ==============================================================================
-- CHALLENGE 4: CORPORATE FINANCIAL REPORTING WITH ROLLUP & GROUPING()
-- Task: Compute hierarchical revenue totals across Region -> Country -> Store,
--       with proper human-readable labels for Subtotals and the Grand Total.
-- ==============================================================================

SELECT 
    CASE 
        WHEN GROUPING(region) = 1 THEN '🌎 ALL REGIONS (GRAND TOTAL)'
        ELSE region 
    END AS region_tier,
    CASE 
        WHEN GROUPING(country) = 1 AND GROUPING(region) = 0 THEN '--- Regional Subtotal ---'
        WHEN GROUPING(country) = 1 THEN '---'
        ELSE country 
    END AS country_tier,
    CASE 
        WHEN GROUPING(store_name) = 1 AND GROUPING(country) = 0 THEN '--- Country Subtotal ---'
        WHEN GROUPING(store_name) = 1 THEN '---'
        ELSE store_name 
    END AS store_tier,
    SUM(revenue) AS total_revenue,
    COUNT(sale_id) AS total_transactions
FROM retail_sales
GROUP BY region, country, store_name WITH ROLLUP;


-- ==============================================================================
-- CHALLENGE 5: MULTI-DIMENSIONAL CUBE MATRIX / CROSS-TABULATION
-- Task: Generate all combinations of Product Line and Sales Channel revenues.
-- ==============================================================================

-- Emulating CUBE via UNION ALL Grouping Sets (Universal across all databases):
SELECT 
    product_line,
    channel,
    SUM(revenue) AS total_revenue
FROM retail_sales
GROUP BY product_line, channel

UNION ALL

-- Subtotal by Product Line (Channel aggregated away)
SELECT 
    product_line,
    'ALL CHANNELS' AS channel,
    SUM(revenue) AS total_revenue
FROM retail_sales
GROUP BY product_line

UNION ALL

-- Subtotal by Channel (Product Line aggregated away)
SELECT 
    'ALL PRODUCTS' AS product_line,
    channel,
    SUM(revenue) AS total_revenue
FROM retail_sales
GROUP BY channel

UNION ALL

-- Overall Grand Total
SELECT 
    'ALL PRODUCTS' AS product_line,
    'ALL CHANNELS' AS channel,
    SUM(revenue) AS total_revenue
FROM retail_sales
ORDER BY product_line ASC, channel ASC;
