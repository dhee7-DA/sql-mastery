/**
 * SQL FOUNDARY: INTERACTIVE SQLITE WASM TERMINAL DATA VAULT
 * Complete DDL Schemas, Pre-Loaded Seed Data & Curated Query Presets
 * Covering all 5 Top Hiring Domains:
 * 1. Investment Banking & Asset Management (Trade Blotter, Custodian, FX Rates)
 * 2. FinTech & Digital Payments (Transactions, Disputes, Wire Graph, Deposits)
 * 3. Enterprise B2B SaaS (Customers, Calendar, Monthly Subscriptions)
 * 4. Healthcare & Health Insurance (Claims, CMS Benchmarks, Hospital Visits, DRG)
 * 5. E-Commerce & Supply Chain (Marketplace Orders, Warehouse Inventory, Daily Sales)
 */

window.SQL_TERMINAL_DATA = {
  // ---------------------------------------------------------------------------
  // FULL SQLITE DDL & SEED SCRIPT EXECUTED ON WASM INIT
  // ---------------------------------------------------------------------------
  seedSql: `
-- =============================================================================
-- DOMAIN 1: INVESTMENT BANKING & ASSET MANAGEMENT
-- =============================================================================
CREATE TABLE fx_daily_rates (
  rate_date TEXT NOT NULL,
  currency TEXT NOT NULL,
  currency_name TEXT NOT NULL,
  usd_exchange_rate REAL NOT NULL,
  PRIMARY KEY (rate_date, currency)
);

INSERT INTO fx_daily_rates VALUES
  ('2026-10-14', 'USD', 'US Dollar', 1.0000),
  ('2026-10-14', 'EUR', 'Euro', 1.0850),
  ('2026-10-14', 'GBP', 'British Pound', 1.3120),
  ('2026-10-14', 'JPY', 'Japanese Yen', 0.0067),
  ('2026-10-13', 'USD', 'US Dollar', 1.0000),
  ('2026-10-13', 'EUR', 'Euro', 1.0820),
  ('2026-10-13', 'GBP', 'British Pound', 1.3090),
  ('2026-10-13', 'JPY', 'Japanese Yen', 0.0066);

CREATE TABLE internal_trade_blotter (
  trade_id TEXT PRIMARY KEY,
  desk_code TEXT NOT NULL,
  raw_ticker TEXT NOT NULL,
  isin TEXT,
  asset_class TEXT NOT NULL,
  side TEXT NOT NULL,
  trade_qty REAL NOT NULL,
  execution_price REAL NOT NULL,
  currency TEXT NOT NULL,
  trade_timestamp TEXT NOT NULL,
  counterparty_id TEXT NOT NULL,
  trader_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'EXECUTED'
);

INSERT INTO internal_trade_blotter VALUES
  ('TRD-20261014-001', 'EQUITIES_NY', 'AAPL', 'US0378331005', 'EQUITY', 'BUY', 10000, 225.50, 'USD', '2026-10-14 09:30:15', 'CITADEL_EXEC', 'TRD_ALEX', 'EXECUTED'),
  ('TRD-20261014-002', 'EQUITIES_NY', 'NVDA', 'US67066G1040', 'EQUITY', 'BUY', 5000, 125.00, 'USD', '2026-10-14 09:31:42', 'VIRTU_FINANCIAL', 'TRD_ELENA', 'EXECUTED'),
  ('TRD-20261014-003', 'EQUITIES_LON', 'BP', 'GB0007980591', 'EQUITY', 'SELL', 50000, 4.25, 'GBP', '2026-10-14 09:35:00', 'BARCLAYS_NY', 'TRD_CHRIS', 'EXECUTED'),
  ('TRD-20261014-004', 'EQUITIES_EU', 'SAP', 'DE0007164600', 'EQUITY', 'BUY', 8000, 210.00, 'EUR', '2026-10-14 09:38:12', 'BNP_PARIBAS', 'TRD_MARC', 'EXECUTED'),
  ('TRD-20261014-005', 'EQUITIES_TKO', 'SONY', 'JP3435000009', 'EQUITY', 'BUY', 20000, 2850.00, 'JPY', '2026-10-14 09:40:05', 'NOMURA_SEC', 'TRD_KENJI', 'EXECUTED'),
  ('TRD-20261014-006', 'RATES_NY', 'UST_10Y', 'US91282CDJ71', 'FIXED_INCOME', 'BUY', 25000000, 98.25, 'USD', '2026-10-14 09:42:19', 'JPM_RATES', 'TRD_SARAH', 'EXECUTED'),
  ('TRD-20261014-007', 'EQUITIES_NY', 'MSFT', 'US5949181045', 'EQUITY', 'SELL', 12000, 415.00, 'USD', '2026-10-14 09:45:30', 'MS_EQUITIES', 'TRD_ALEX', 'EXECUTED'),
  ('TRD-20261014-008', 'EQUITIES_LON', 'HSBC', 'GB0005405286', 'EQUITY', 'BUY', 30000, 6.80, 'GBP', '2026-10-14 09:48:10', 'HSBC_GLOBAL', 'TRD_CHRIS', 'EXECUTED'),
  ('TRD-20261014-009', 'EQUITIES_NY', 'TSLA', 'US88160R1014', 'EQUITY', 'BUY', 15000, 175.00, 'USD', '2026-10-14 09:50:00', 'CITADEL_EXEC', 'TRD_ALEX', 'EXECUTED');

CREATE TABLE custodian_clearing_feed (
  custodian_trade_ref TEXT PRIMARY KEY,
  custodian_code TEXT NOT NULL,
  clearing_account TEXT NOT NULL,
  isin TEXT NOT NULL,
  security_ticker TEXT NOT NULL,
  side TEXT NOT NULL,
  cleared_qty REAL NOT NULL,
  cleared_price REAL NOT NULL,
  settlement_currency TEXT NOT NULL,
  settlement_date TEXT NOT NULL,
  clearing_status TEXT NOT NULL
);

INSERT INTO custodian_clearing_feed VALUES
  ('DTCC-9901-001', 'DTCC_NY', 'ACC-PRIME-01', 'US0378331005', 'AAPL', 'BUY', 10000, 225.50, 'USD', '2026-10-15', 'SETTLED'),
  ('DTCC-9901-002', 'DTCC_NY', 'ACC-PRIME-01', 'US67066G1040', 'NVDA', 'BUY', 50000, 125.00, 'USD', '2026-10-15', 'SETTLED'),
  ('EURO-8802-003', 'EUROCLEAR', 'ACC-GLOBAL-02', 'GB0007980591', 'BP', 'SELL', 50000, 4.30, 'GBP', '2026-10-15', 'SETTLED'),
  ('EURO-8802-004', 'EUROCLEAR', 'ACC-GLOBAL-02', 'DE0007164600', 'SAP', 'BUY', 8000, 210.00, 'EUR', '2026-10-15', 'SETTLED'),
  ('JASDEC-7703-005', 'JASDEC_TKO', 'ACC-APAC-03', 'JP3435000009', 'SONY', 'BUY', 20000, 2870.00, 'JPY', '2026-10-15', 'SETTLED'),
  ('BONY-6604-006', 'BNY_MELLON', 'ACC-TREASURY-01', 'US91282CDJ71', 'UST_10Y', 'BUY', 25000000, 98.25, 'USD', '2026-10-15', 'SETTLED'),
  ('DTCC-9901-007', 'DTCC_NY', 'ACC-PRIME-01', 'US5949181045', 'MSFT', 'SELL', 12000, 415.00, 'USD', '2026-10-15', 'SETTLED'),
  ('EURO-8802-008', 'EUROCLEAR', 'ACC-GLOBAL-02', 'GB0005405286', 'HSBC', 'BUY', 30000, 6.80, 'GBP', '2026-10-15', 'SETTLED'),
  ('DTCC-9901-010', 'DTCC_NY', 'ACC-PRIME-01', 'US0231351067', 'AMZN', 'BUY', 8000, 182.50, 'USD', '2026-10-15', 'SETTLED');

CREATE TABLE daily_stock_prices (
  ticker TEXT NOT NULL,
  trade_date TEXT NOT NULL,
  close_price REAL NOT NULL,
  PRIMARY KEY (ticker, trade_date)
);

INSERT INTO daily_stock_prices VALUES
  ('AAPL', '2026-09-01', 220.00), ('AAPL', '2026-09-02', 222.50), ('AAPL', '2026-09-03', 221.00),
  ('AAPL', '2026-09-04', 226.00), ('AAPL', '2026-09-05', 228.50), ('AAPL', '2026-09-08', 225.00),
  ('AAPL', '2026-09-09', 224.00), ('AAPL', '2026-09-10', 229.00), ('AAPL', '2026-09-11', 231.50),
  ('AAPL', '2026-09-12', 230.00), ('AAPL', '2026-09-15', 225.50), ('AAPL', '2026-09-16', 227.00),
  ('NVDA', '2026-09-01', 115.00), ('NVDA', '2026-09-02', 118.00), ('NVDA', '2026-09-03', 116.50),
  ('NVDA', '2026-09-04', 121.00), ('NVDA', '2026-09-05', 125.50), ('NVDA', '2026-09-08', 123.00),
  ('NVDA', '2026-09-09', 120.00), ('NVDA', '2026-09-10', 126.00), ('NVDA', '2026-09-11', 129.00),
  ('NVDA', '2026-09-12', 127.50), ('NVDA', '2026-09-15', 125.00), ('NVDA', '2026-09-16', 128.50);

-- =============================================================================
-- DOMAIN 2: FINTECH & DIGITAL PAYMENTS
-- =============================================================================
CREATE TABLE payment_events (
  payment_id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  merchant_category TEXT NOT NULL,
  stage_status TEXT NOT NULL, -- AUTHORIZED, CAPTURED, SETTLED, CHARGEBACK
  amount_usd REAL NOT NULL,
  acquirer_code TEXT NOT NULL,
  payment_rail TEXT NOT NULL, -- CARD, ACH, APPLE_PAY
  auth_timestamp TEXT NOT NULL,
  settled_timestamp TEXT
);

INSERT INTO payment_events VALUES
  ('PAY-101', 'M-STRIPE-01', 'DIGITAL_SERVICES', 'SETTLED', 450.00, 'ACQ_CHASE', 'CARD', '2026-10-10 10:00:00', '2026-10-11 14:00:00'),
  ('PAY-102', 'M-STRIPE-01', 'DIGITAL_SERVICES', 'SETTLED', 1200.00, 'ACQ_CHASE', 'APPLE_PAY', '2026-10-10 10:30:00', '2026-10-11 12:00:00'),
  ('PAY-103', 'M-STRIPE-01', 'DIGITAL_SERVICES', 'CHARGEBACK', 890.00, 'ACQ_CHASE', 'CARD', '2026-10-10 11:15:00', '2026-10-12 09:00:00'),
  ('PAY-104', 'M-RETAIL-02', 'ECOMMERCE', 'SETTLED', 85.50, 'ACQ_WELLS', 'CARD', '2026-10-10 12:00:00', '2026-10-13 16:30:00'),
  ('PAY-105', 'M-RETAIL-02', 'ECOMMERCE', 'CAPTURED', 120.00, 'ACQ_WELLS', 'CARD', '2026-10-10 12:30:00', NULL),
  ('PAY-106', 'M-CRYPTO-03', 'HIGH_RISK_EXCHANGE', 'CHARGEBACK', 4500.00, 'ACQ_CROSS_BORDER', 'CARD', '2026-10-10 13:00:00', '2026-10-14 18:00:00'),
  ('PAY-107', 'M-CRYPTO-03', 'HIGH_RISK_EXCHANGE', 'CHARGEBACK', 3800.00, 'ACQ_CROSS_BORDER', 'CARD', '2026-10-10 14:00:00', '2026-10-14 20:00:00'),
  ('PAY-108', 'M-CRYPTO-03', 'HIGH_RISK_EXCHANGE', 'AUTHORIZED', 5000.00, 'ACQ_CROSS_BORDER', 'ACH', '2026-10-10 15:00:00', NULL),
  ('PAY-109', 'M-TRAVEL-04', 'AIRLINE_TRAVEL', 'SETTLED', 650.00, 'ACQ_AMEX', 'CARD', '2026-10-10 16:00:00', '2026-10-12 11:00:00'),
  ('PAY-110', 'M-TRAVEL-04', 'AIRLINE_TRAVEL', 'SETTLED', 920.00, 'ACQ_AMEX', 'CARD', '2026-10-10 16:30:00', '2026-10-12 15:00:00');

CREATE TABLE wire_transfers (
  tx_id TEXT PRIMARY KEY,
  sender_acc TEXT NOT NULL,
  receiver_acc TEXT NOT NULL,
  amount REAL NOT NULL,
  sent_time TEXT NOT NULL
);

INSERT INTO wire_transfers VALUES
  ('W-001', 'ACC_SHELL_A', 'ACC_SHELL_B', 250000.00, '2026-10-12 09:00:00'),
  ('W-002', 'ACC_SHELL_B', 'ACC_SHELL_C', 248000.00, '2026-10-12 13:30:00'),
  ('W-003', 'ACC_SHELL_C', 'ACC_SHELL_A', 245000.00, '2026-10-12 21:00:00'),
  ('W-004', 'ACC_LEGIT_1', 'ACC_LEGIT_2', 15000.00, '2026-10-12 10:00:00'),
  ('W-005', 'ACC_LEGIT_2', 'ACC_LEGIT_3', 12000.00, '2026-10-13 11:00:00');

-- =============================================================================
-- DOMAIN 3: ENTERPRISE B2B SAAS
-- =============================================================================
CREATE TABLE dim_customers (
  customer_id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  segment TEXT NOT NULL,
  signup_date TEXT NOT NULL
);

INSERT INTO dim_customers VALUES
  ('CUST-101', 'Acme Corp', 'ENTERPRISE', '2026-01-01'),
  ('CUST-102', 'Beta Systems', 'MID_MARKET', '2026-01-15'),
  ('CUST-103', 'CloudNine Ltd', 'GROWTH', '2026-02-01'),
  ('CUST-104', 'DataPulse AI', 'ENTERPRISE', '2026-02-15'),
  ('CUST-105', 'Echo Logistics', 'MID_MARKET', '2026-03-01');

CREATE TABLE dim_months (
  month_start_date TEXT PRIMARY KEY
);

INSERT INTO dim_months VALUES
  ('2026-01-01'), ('2026-02-01'), ('2026-03-01'), ('2026-04-01'), ('2026-05-01');

CREATE TABLE subscriptions (
  customer_id TEXT NOT NULL,
  billing_month TEXT NOT NULL,
  mrr_amount REAL NOT NULL,
  PRIMARY KEY (customer_id, billing_month)
);

INSERT INTO subscriptions VALUES
  ('CUST-101', '2026-01-01', 5000.00),
  ('CUST-101', '2026-02-01', 5000.00),
  ('CUST-101', '2026-03-01', 7500.00), -- EXPANSION
  ('CUST-101', '2026-04-01', 7500.00),
  ('CUST-101', '2026-05-01', 6000.00), -- CONTRACTION
  ('CUST-102', '2026-01-01', 2000.00),
  ('CUST-102', '2026-02-01', 2000.00),
  ('CUST-102', '2026-03-01', 0.00),    -- CHURN
  ('CUST-103', '2026-02-01', 3500.00), -- NEW
  ('CUST-103', '2026-03-01', 4000.00),
  ('CUST-103', '2026-04-01', 4500.00),
  ('CUST-104', '2026-02-01', 8000.00),
  ('CUST-104', '2026-03-01', 8000.00),
  ('CUST-104', '2026-04-01', 12000.00),
  ('CUST-105', '2026-03-01', 1500.00),
  ('CUST-105', '2026-04-01', 1500.00);

-- =============================================================================
-- DOMAIN 4: HEALTHCARE & HEALTH INSURANCE
-- =============================================================================
CREATE TABLE patient_claims (
  claim_id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  procedure_code TEXT NOT NULL,
  claim_date TEXT NOT NULL,
  charged_amount REAL NOT NULL,
  claim_status TEXT NOT NULL -- PAID_FIRST_PASS, DENIED, REWORKED
);

INSERT INTO patient_claims VALUES
  ('CLM-001', 'P-8801', 'PRV-A', '99213', '2026-09-01', 250.00, 'PAID_FIRST_PASS'),
  ('CLM-002', 'P-8801', 'PRV-A', '99213', '2026-09-01', 250.00, 'DENIED'), -- DUPLICATE
  ('CLM-003', 'P-8802', 'PRV-B', '71020', '2026-09-02', 450.00, 'PAID_FIRST_PASS'),
  ('CLM-004', 'P-8803', 'PRV-C', '45378', '2026-09-03', 3800.00, 'PAID_FIRST_PASS'),
  ('CLM-005', 'P-8804', 'PRV-D', '99285', '2026-09-04', 1950.00, 'PAID_FIRST_PASS'),
  ('CLM-006', 'P-8805', 'PRV-E', '27447', '2026-09-05', 24500.00, 'DENIED'),
  ('CLM-007', 'P-8806', 'PRV-B', '99214', '2026-09-06', 320.00, 'PAID_FIRST_PASS');

CREATE TABLE cms_fee_schedule (
  procedure_code TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  medicare_allowable_rate REAL NOT NULL
);

INSERT INTO cms_fee_schedule VALUES
  ('99213', 'Office Visit Level 3', 75.00),
  ('99214', 'Office Visit Level 4', 110.00),
  ('71020', 'Chest X-Ray 2 Views', 45.00),
  ('45378', 'Diagnostic Colonoscopy', 420.00),
  ('99285', 'Emergency Dept High Severity', 280.00),
  ('27447', 'Total Knee Arthroplasty', 1450.00);

CREATE TABLE hospital_visits (
  visit_id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  department TEXT NOT NULL,
  admission_date TEXT NOT NULL,
  discharge_date TEXT NOT NULL
);

INSERT INTO hospital_visits VALUES
  ('VIS-01', 'PAT-10', 'CARDIOLOGY', '2026-08-01', '2026-08-05'),
  ('VIS-02', 'PAT-10', 'CARDIOLOGY', '2026-08-20', '2026-08-24'), -- 15d READMISSION
  ('VIS-03', 'PAT-20', 'ORTHOPEDICS', '2026-08-02', '2026-08-06'),
  ('VIS-04', 'PAT-20', 'ORTHOPEDICS', '2026-09-18', '2026-09-22'), -- 43d (NOT 30d)
  ('VIS-05', 'PAT-30', 'NEUROLOGY', '2026-08-10', '2026-08-15'),
  ('VIS-06', 'PAT-40', 'PULMONOLOGY', '2026-08-12', '2026-08-18'),
  ('VIS-07', 'PAT-40', 'PULMONOLOGY', '2026-08-28', '2026-09-02'); -- 10d READMISSION

-- =============================================================================
-- DOMAIN 5: E-COMMERCE & SUPPLY CHAIN FINANCE
-- =============================================================================
CREATE TABLE marketplace_orders (
  order_id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL,
  order_subtotal REAL NOT NULL,
  shipping_fee REAL NOT NULL,
  refund_amount REAL NOT NULL,
  order_status TEXT NOT NULL,
  order_date TEXT NOT NULL
);

INSERT INTO marketplace_orders VALUES
  ('ORD-5001', 'SLR-ALPHA', 120.00, 10.00, 0.00, 'COMPLETED', '2026-10-01'),
  ('ORD-5002', 'SLR-ALPHA', 340.00, 15.00, 0.00, 'COMPLETED', '2026-10-02'),
  ('ORD-5003', 'SLR-ALPHA', 85.00, 8.00, 85.00, 'RETURNED', '2026-10-03'),
  ('ORD-5004', 'SLR-BETA', 950.00, 25.00, 0.00, 'COMPLETED', '2026-10-01'),
  ('ORD-5005', 'SLR-BETA', 1400.00, 30.00, 0.00, 'COMPLETED', '2026-10-04'),
  ('ORD-5006', 'SLR-GAMMA', 45.00, 5.00, 0.00, 'COMPLETED', '2026-10-02'),
  ('ORD-5007', 'SLR-GAMMA', 60.00, 6.00, 60.00, 'RETURNED', '2026-10-05');

CREATE TABLE warehouse_inventory (
  sku_id TEXT PRIMARY KEY,
  sku_name TEXT NOT NULL,
  current_stock_qty INTEGER NOT NULL,
  unit_cost REAL NOT NULL,
  unit_retail_price REAL NOT NULL,
  supplier_lead_time_days INTEGER NOT NULL,
  rolling_14d_ads REAL NOT NULL
);

INSERT INTO warehouse_inventory VALUES
  ('SKU-1001', 'Wireless Noise-Canceling Headphones', 140, 45.00, 120.00, 14, 18.5),
  ('SKU-1002', 'Ergonomic Mechanical Keyboard', 45, 60.00, 150.00, 21, 8.2),
  ('SKU-1003', 'Ultra-Wide 34-Inch Curved Monitor', 12, 280.00, 550.00, 28, 4.5),
  ('SKU-1004', 'Braided USB-C Cable 2-Meter', 850, 2.10, 12.99, 10, 45.0),
  ('SKU-1005', 'Vertical Ergonomic Mouse', 220, 18.50, 49.99, 14, 12.0);
`,

  // ---------------------------------------------------------------------------
  // CURATED ONE-CLICK PRESET QUERIES FOR FAST TESTING & SHOWCASE
  // ---------------------------------------------------------------------------
  presets: [
    {
      id: "preset_recon_breaks",
      category: "Investment Banking",
      title: "Trade Settlement Custody Reconciliation Breaks",
      description: "Dual-sided FULL OUTER JOIN between internal blotter and custodian feed to catch quantity, price, and phantom breaks.",
      sql: `-- Grand Capstone: Multi-Asset Prime Broker Reconciliation
SELECT
  COALESCE(i.trade_id, c.custodian_trade_ref) AS trade_ref,
  COALESCE(i.raw_ticker, c.security_ticker) AS ticker,
  COALESCE(i.currency, c.settlement_currency) AS ccy,
  i.trade_qty AS internal_qty,
  c.cleared_qty AS cleared_qty,
  i.execution_price AS internal_px,
  c.cleared_price AS cleared_px,
  CASE
    WHEN c.custodian_trade_ref IS NULL THEN 'PHANTOM_INTERNAL_TRADE'
    WHEN i.trade_id IS NULL THEN 'UNAUTHORIZED_EXTERNAL_FILL'
    WHEN i.trade_qty != c.cleared_qty THEN 'QUANTITY_MISMATCH'
    WHEN ABS(i.execution_price - c.cleared_price) > 0.001 THEN 'PRICE_MISMATCH'
    ELSE 'MATCHED'
  END AS break_status
FROM internal_trade_blotter i
FULL OUTER JOIN custodian_clearing_feed c
  ON i.raw_ticker = c.security_ticker
 AND i.side = c.side
ORDER BY break_status DESC;`
    },
    {
      id: "preset_var_volatility",
      category: "Asset Management",
      title: "Stock Returns & High-Water Mark Peak",
      description: "Window LAG() to compute daily percent returns and cumulative MAX() to track portfolio peak value.",
      sql: `-- Asset Returns & Cumulative High-Water Mark Peak
SELECT
  ticker,
  trade_date,
  close_price,
  LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date) AS prev_close,
  ROUND((close_price - LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date)) * 100.0 / 
        NULLIF(LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date), 0), 2) AS return_pct,
  MAX(close_price) OVER (
    PARTITION BY ticker 
    ORDER BY trade_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS high_water_mark
FROM daily_stock_prices
ORDER BY ticker, trade_date;`
    },
    {
      id: "preset_circular_wires",
      category: "FinTech & AML",
      title: "Circular Wire Transfer Laundering Cycle",
      description: "3-legged self-join graph traversal to detect circular funds movement returning to origin account.",
      sql: `-- Circular Funds Routing Detection (A -> B -> C -> A)
SELECT
  t1.sender_acc AS ring_root_account,
  t1.receiver_acc AS leg1_receiver,
  t2.receiver_acc AS leg2_receiver,
  t3.receiver_acc AS leg3_receiver,
  t1.amount AS initial_wire_amount
FROM wire_transfers t1
JOIN wire_transfers t2
  ON t1.receiver_acc = t2.sender_acc
JOIN wire_transfers t3
  ON t2.receiver_acc = t3.sender_acc
WHERE t3.receiver_acc = t1.sender_acc;`
    },
    {
      id: "preset_mrr_waterfall",
      category: "Enterprise SaaS",
      title: "5-Way MRR Waterfall Bridge",
      description: "Transforms monthly subscription billing into NEW, EXPANSION, CONTRACTION, and CHURN movements.",
      sql: `-- 5-Way SaaS Monthly Recurring Revenue (MRR) Waterfall
WITH CustomerTransitions AS (
  SELECT
    c.customer_id,
    c.company_name,
    m.month_start_date,
    COALESCE(s.mrr_amount, 0) AS active_mrr,
    LAG(COALESCE(s.mrr_amount, 0), 1, 0) OVER (
      PARTITION BY c.customer_id 
      ORDER BY m.month_start_date
    ) AS prior_mrr
  FROM dim_customers c
  CROSS JOIN dim_months m
  LEFT JOIN subscriptions s
    ON c.customer_id = s.customer_id
   AND m.month_start_date = s.billing_month
)
SELECT
  customer_id,
  company_name,
  month_start_date,
  active_mrr,
  prior_mrr,
  CASE
    WHEN prior_mrr = 0 AND active_mrr > 0 THEN 'NEW'
    WHEN active_mrr > prior_mrr AND prior_mrr > 0 THEN 'EXPANSION'
    WHEN active_mrr < prior_mrr AND active_mrr > 0 THEN 'CONTRACTION'
    WHEN active_mrr = 0 AND prior_mrr > 0 THEN 'CHURN'
    ELSE 'RETAINED'
  END AS mrr_category,
  (active_mrr - prior_mrr) AS net_mrr_delta
FROM CustomerTransitions
ORDER BY customer_id, month_start_date;`
    },
    {
      id: "preset_readmission_lead",
      category: "Healthcare",
      title: "Hospital 30-Day Readmission Risk via LEAD()",
      description: "Peers forward in time to determine if a discharged patient returned within the 30-day Medicare penalty window.",
      sql: `-- Hospital Readmissions Reduction Program (HRRP) 30-Day Audit
SELECT
  visit_id,
  patient_id,
  department,
  discharge_date,
  LEAD(admission_date, 1) OVER (
    PARTITION BY patient_id 
    ORDER BY admission_date
  ) AS next_admission_date,
  CASE
    WHEN LEAD(admission_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date) IS NOT NULL
     AND (CAST(strftime('%J', LEAD(admission_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date)) AS REAL) - 
          CAST(strftime('%J', discharge_date) AS REAL)) <= 30 THEN '30_DAY_READMISSION'
    ELSE 'COMPLIANT'
  END AS readmission_risk
FROM hospital_visits
ORDER BY patient_id, admission_date;`
    },
    {
      id: "preset_inventory_rop",
      category: "E-Commerce",
      title: "Inventory Stockout Days on Hand & Reorder Points",
      description: "Computes run-out dates based on 14-day velocity and flags SKUs requiring immediate purchase orders.",
      sql: `-- Supply Chain Stockout Forecasting & Reorder Point (ROP)
SELECT
  sku_id,
  sku_name,
  current_stock_qty,
  rolling_14d_ads AS daily_velocity,
  ROUND(current_stock_qty / NULLIF(rolling_14d_ads, 0), 1) AS days_on_hand,
  ROUND(rolling_14d_ads * supplier_lead_time_days, 0) AS lead_time_demand,
  CASE
    WHEN current_stock_qty <= (rolling_14d_ads * supplier_lead_time_days) THEN 'REORDER_NOW_URGENT'
    WHEN current_stock_qty <= (rolling_14d_ads * supplier_lead_time_days * 1.5) THEN 'ORDER_SOON'
    ELSE 'STOCK_HEALTHY'
  END AS stock_status
FROM warehouse_inventory
ORDER BY days_on_hand ASC;`
    }
  ]
};
