-- ============================================================================
-- JPMORGAN CHASE & CO. GLOBAL TREASURY & QUANTITATIVE RISK VAULT
-- 30-Day Institutional SQL Dataset & Relational Schema Compendium
-- Dialect: ANSI SQL / MySQL 8.0+ / PostgreSQL Compatible
-- ============================================================================

-- ----------------------------------------------------------------------------
-- WEEK 1: CORE BANKING LEDGERS & CASH RECONCILIATION (DAYS 01 - 07)
-- ----------------------------------------------------------------------------

-- Day 01: Nostro & Vostro Correspondent Banking Ledger
DROP TABLE IF EXISTS nostro_vostro_ledger;
CREATE TABLE nostro_vostro_ledger (
  entry_id INT PRIMARY KEY,
  correspondent_bank VARCHAR(100) NOT NULL,
  account_type VARCHAR(10) NOT NULL, -- 'NOSTRO' or 'VOSTRO'
  currency VARCHAR(3) NOT NULL,
  closing_balance DECIMAL(18,2) NOT NULL,
  recon_status VARCHAR(20) NOT NULL -- 'MATCHED', 'UNRECONCILED'
);

INSERT INTO nostro_vostro_ledger VALUES
(101, 'BNP Paribas Paris', 'NOSTRO', 'EUR', 42500000.00, 'MATCHED'),
(102, 'Deutsche Bank Frankfurt', 'NOSTRO', 'EUR', -1280000.50, 'UNRECONCILED'),
(103, 'Barclays Bank London', 'NOSTRO', 'GBP', 89400000.00, 'MATCHED'),
(104, 'MUFG Bank Tokyo', 'VOSTRO', 'JPY', 12500000000.00, 'MATCHED'),
(105, 'UBS AG Zurich', 'NOSTRO', 'CHF', -3400000.00, 'UNRECONCILED'),
(106, 'Santander Madrid', 'NOSTRO', 'EUR', 15200000.00, 'MATCHED'),
(107, 'Royal Bank of Canada Toronto', 'VOSTRO', 'CAD', 67000000.00, 'MATCHED');

-- Day 02: SWIFT MT103 Interbank Customer Wire Transfers
DROP TABLE IF EXISTS swift_mt103_messages;
CREATE TABLE swift_mt103_messages (
  message_id VARCHAR(20) PRIMARY KEY,
  uetr VARCHAR(36) NOT NULL,
  sender_bic VARCHAR(11) NOT NULL,
  receiver_bic VARCHAR(11) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  amount_usd DECIMAL(18,2) NOT NULL,
  status VARCHAR(20) NOT NULL
);

INSERT INTO swift_mt103_messages VALUES
('MSG-88410', 'c3b9e4a1-001', 'CHASUS33XXX', 'BNPAFRPPXXX', 'USD', 5400000.00, 'SETTLED'),
('MSG-88411', 'd7a1f2c4-002', 'DEUTDEDDXXX', 'CHASUS33XXX', 'EUR', 1280000.50, 'FAILED'),
('MSG-88412', 'e8b2c3d5-003', 'CHASUS33XXX', 'BARCGB22XXX', 'GBP', 3100000.00, 'SETTLED'),
('MSG-88413', 'f9c3d4e6-004', 'UBSWCHZHXXX', 'CHASUS33XXX', 'CHF', 940000.00, 'PENDING'),
('MSG-88414', 'a1d4e5f7-005', 'CHASUS33XXX', 'BOTKJPJTXXX', 'USD', 25000000.00, 'SETTLED');

-- Day 03: Central Bank Liquidity Reserves & Legal Entity Holdings
DROP TABLE IF EXISTS liquidity_reserves;
CREATE TABLE liquidity_reserves (
  reserve_id INT PRIMARY KEY,
  entity_name VARCHAR(100) NOT NULL,
  central_bank VARCHAR(80) NOT NULL,
  asset_type VARCHAR(30) NOT NULL,
  amount_usd DECIMAL(18,2) NOT NULL,
  is_encumbered BOOLEAN NOT NULL
);

INSERT INTO liquidity_reserves VALUES
(201, 'JPMorgan Chase Bank N.A.', 'Federal Reserve Bank of NY', 'CASH_DEPOSIT', 145000000000.00, FALSE),
(202, 'J.P. Morgan SE (Frankfurt)', 'European Central Bank', 'CASH_DEPOSIT', 38000000000.00, FALSE),
(203, 'J.P. Morgan Securities LLC', 'Bank of England', 'TREASURY_BOND', 22000000000.00, TRUE),
(204, 'JPMorgan Chase Bank London', 'Bank of England', 'CASH_DEPOSIT', 19500000000.00, FALSE),
(205, 'J.P. Morgan Securities Asia', 'Bank of Japan', 'JGB_GOVERNMENT', 12000000000.00, FALSE);

-- Day 04: Overnight Repo Financing & Haircut Discounts
DROP TABLE IF EXISTS overnight_repo_facilities;
CREATE TABLE overnight_repo_facilities (
  trade_id VARCHAR(20) PRIMARY KEY,
  counterparty_name VARCHAR(100) NOT NULL,
  collateral_type VARCHAR(40) NOT NULL,
  haircut_pct DECIMAL(5,2) NOT NULL,
  principal_usd DECIMAL(18,2) NOT NULL,
  interest_rate_bps INT NOT NULL
);

INSERT INTO overnight_repo_facilities VALUES
('REPO-901', 'BlackRock Liquidity Fund', 'US_TREASURY_NOTE', 2.00, 500000000.00, 532),
('REPO-902', 'Vanguard Treasury Reserve', 'AGENCY_MBS', 5.00, 350000000.00, 545),
('REPO-903', 'Fidelity Cash Central', 'US_TREASURY_BILL', 1.50, 800000000.00, 528),
('REPO-904', 'State Street Institutional', 'CORPORATE_AAA', 8.00, 200000000.00, 565),
('REPO-905', 'PIMCO Short-Term Fund', 'US_TREASURY_NOTE', 2.00, 450000000.00, 534);

-- Day 05: G10 FX Spot Cross Rates
DROP TABLE IF EXISTS fx_spot_cross_rates;
CREATE TABLE fx_spot_cross_rates (
  rate_id INT PRIMARY KEY,
  base_currency VARCHAR(3) NOT NULL,
  quote_currency VARCHAR(3) NOT NULL,
  bid_rate DECIMAL(12,6) NOT NULL,
  ask_rate DECIMAL(12,6) NOT NULL,
  effective_date DATE NOT NULL
);

INSERT INTO fx_spot_cross_rates VALUES
(1, 'EUR', 'USD', 1.084500, 1.084700, '2026-10-04'),
(2, 'GBP', 'USD', 1.302000, 1.302300, '2026-10-04'),
(3, 'USD', 'JPY', 148.650000, 148.680000, '2026-10-04'),
(4, 'USD', 'CHF', 0.864000, 0.864300, '2026-10-04'),
(5, 'USD', 'CAD', 1.358000, 1.358400, '2026-10-04');

-- Day 06: Cross-Branch Interbank Payments Timezones
DROP TABLE IF EXISTS interbank_payments;
CREATE TABLE interbank_payments (
  payment_id VARCHAR(20) PRIMARY KEY,
  originating_branch VARCHAR(60) NOT NULL,
  branch_tz VARCHAR(6) NOT NULL,
  local_timestamp DATETIME NOT NULL,
  amount_usd DECIMAL(18,2) NOT NULL
);

INSERT INTO interbank_payments VALUES
('PAY-110', 'London-CanaryWharf', '+01:00', '2026-10-03 22:04:15', 4500000.00),
('PAY-111', 'Tokyo-Chiyoda', '+09:00', '2026-10-04 06:15:30', 12800000.00),
('PAY-112', 'London-CanaryWharf', '+01:00', '2026-10-03 22:28:40', 8200000.00),
('PAY-113', 'NewYork-ParkAve', '-04:00', '2026-10-03 17:10:05', 21000000.00),
('PAY-114', 'Singapore-MarinaBay', '+08:00', '2026-10-04 05:22:18', 3400000.00);

-- Day 07: Executive Cash Reserves Multidimensional Rollup
DROP TABLE IF EXISTS cash_reserves;
CREATE TABLE cash_reserves (
  reserve_id INT PRIMARY KEY,
  asset_class VARCHAR(50) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  amount_usd DECIMAL(18,2) NOT NULL
);

INSERT INTO cash_reserves VALUES
(301, 'Cash & Central Bank', 'USD', 185000000000.00),
(302, 'Cash & Central Bank', 'EUR', 42000000000.00),
(303, 'Government Bonds', 'USD', 260000000000.00),
(304, 'Government Bonds', 'GBP', 35000000000.00),
(305, 'Money Market Instruments', 'USD', 85000000000.00),
(306, 'Money Market Instruments', 'JPY', 28000000000.00);


-- ----------------------------------------------------------------------------
-- WEEK 2: FINANCIAL CRIMES & AML SURVEILLANCE (DAYS 08 - 14)
-- ----------------------------------------------------------------------------

-- Day 08: FinCEN BSA Cash Deposits & Structuring (Smurfing)
DROP TABLE IF EXISTS aml_cash_deposits;
CREATE TABLE aml_cash_deposits (
  deposit_id INT PRIMARY KEY,
  account_number VARCHAR(20) NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  amount_usd DECIMAL(14,2) NOT NULL,
  deposit_time DATETIME NOT NULL
);

INSERT INTO aml_cash_deposits VALUES
(1001, 'ACCT-99201', 'Apex Logistics LLC', 9500.00, '2026-10-02 10:14:00'),
(1002, 'ACCT-99201', 'Apex Logistics LLC', 9800.00, '2026-10-02 15:45:00'),
(1003, 'ACCT-99201', 'Apex Logistics LLC', 9200.00, '2026-10-03 09:20:00'),
(1004, 'ACCT-88142', 'Midtown Bistro Corp', 4200.00, '2026-10-02 14:00:00'),
(1005, 'ACCT-55319', 'Global Traders Ltd', 9950.00, '2026-10-01 11:30:00');

-- Day 09: Suspicious Activity Report (SAR) Threshold Surveillance
DROP TABLE IF EXISTS sar_suspicious_accounts;
CREATE TABLE sar_suspicious_accounts (
  alert_id VARCHAR(20) PRIMARY KEY,
  account_number VARCHAR(20) NOT NULL,
  tx_count_24h INT NOT NULL,
  total_transferred_usd DECIMAL(16,2) NOT NULL,
  high_risk_jurisdiction BOOLEAN NOT NULL
);

INSERT INTO sar_suspicious_accounts VALUES
('SAR-401', 'ACCT-99201', 14, 285000.00, FALSE),
('SAR-402', 'ACCT-11082', 28, 1420000.00, TRUE),
('SAR-403', 'ACCT-44910', 3, 45000.00, FALSE),
('SAR-404', 'ACCT-77291', 42, 3890000.00, TRUE),
('SAR-405', 'ACCT-33120', 8, 92000.00, FALSE);

-- Day 10: Rapid Fund Dissipation (Pass-Through Money Laundering)
DROP TABLE IF EXISTS rapid_fund_dissipation;
CREATE TABLE rapid_fund_dissipation (
  account_id VARCHAR(20) PRIMARY KEY,
  inflow_usd DECIMAL(16,2) NOT NULL,
  outflow_usd DECIMAL(16,2) NOT NULL,
  inflow_ts DATETIME NOT NULL,
  outflow_ts DATETIME NOT NULL,
  dwell_minutes INT NOT NULL
);

INSERT INTO rapid_fund_dissipation VALUES
('ACCT-77291', 500000.00, 498000.00, '2026-10-03 09:05:00', '2026-10-03 09:14:00', 9),
('ACCT-11082', 1200000.00, 1195000.00, '2026-10-03 10:20:00', '2026-10-03 10:38:00', 18),
('ACCT-44910', 250000.00, 80000.00, '2026-10-02 08:00:00', '2026-10-03 14:00:00', 1800),
('ACCT-66381', 850000.00, 845000.00, '2026-10-03 13:10:00', '2026-10-03 13:22:00', 12);

-- Day 11: OFAC Sanctions Screening
DROP TABLE IF EXISTS ofac_sanctions_watch;
CREATE TABLE ofac_sanctions_watch (
  entity_id VARCHAR(20) PRIMARY KEY,
  party_name VARCHAR(100) NOT NULL,
  country_code VARCHAR(2) NOT NULL,
  match_score DECIMAL(5,2) NOT NULL,
  is_blocked BOOLEAN NOT NULL
);

INSERT INTO ofac_sanctions_watch VALUES
('OFAC-01', 'Al-Baraka Energy Trading', 'IR', 98.50, TRUE),
('OFAC-02', 'North Star Shipping FZE', 'AE', 89.20, TRUE),
('OFAC-03', 'PetroCaspian Logistics', 'RU', 94.00, TRUE),
('OFAC-04', 'Nordic Maritime AS', 'NO', 42.10, FALSE),
('OFAC-05', 'Eastern Horizon Mining', 'KP', 99.80, TRUE);

-- Day 12: Wire Velocity Burst Surveillance
DROP TABLE IF EXISTS wire_velocity_surveillance;
CREATE TABLE wire_velocity_surveillance (
  tx_id VARCHAR(20) PRIMARY KEY,
  sender_account VARCHAR(20) NOT NULL,
  receiver_account VARCHAR(20) NOT NULL,
  wire_amount_usd DECIMAL(16,2) NOT NULL,
  tx_timestamp DATETIME NOT NULL
);

INSERT INTO wire_velocity_surveillance VALUES
('TX-901', 'ACCT-11082', 'OFFSHORE-01', 98000.00, '2026-10-03 14:02:10'),
('TX-902', 'ACCT-11082', 'OFFSHORE-02', 95000.00, '2026-10-03 14:08:45'),
('TX-903', 'ACCT-11082', 'OFFSHORE-03', 97500.00, '2026-10-03 14:15:30'),
('TX-904', 'ACCT-88142', 'VENDOR-99', 12000.00, '2026-10-03 11:30:00'),
('TX-905', 'ACCT-11082', 'OFFSHORE-04', 99000.00, '2026-10-03 14:24:12');

-- Day 13: Digital Money Mule Account Clusters
DROP TABLE IF EXISTS mule_account_clusters;
CREATE TABLE mule_account_clusters (
  account_number VARCHAR(20) PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL,
  device_hash VARCHAR(64) NOT NULL,
  creation_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL
);

INSERT INTO mule_account_clusters VALUES
('ACCT-401', '198.51.100.45', 'a8f3b2c1', '2026-09-15', 'FLAGGED'),
('ACCT-402', '198.51.100.45', 'a8f3b2c1', '2026-09-16', 'FLAGGED'),
('ACCT-403', '198.51.100.45', 'a8f3b2c1', '2026-09-18', 'FLAGGED'),
('ACCT-501', '203.0.113.88', 'e5d4c3b2', '2026-08-10', 'ACTIVE'),
('ACCT-404', '198.51.100.45', 'a8f3b2c1', '2026-09-20', 'FLAGGED');

-- Day 14: FinCEN CTR Currency Transaction Report Thresholds
DROP TABLE IF EXISTS fincen_ctr_thresholds;
CREATE TABLE fincen_ctr_thresholds (
  batch_id VARCHAR(20) PRIMARY KEY,
  customer_id VARCHAR(20) NOT NULL,
  aggregate_cash_usd DECIMAL(16,2) NOT NULL,
  reporting_date DATE NOT NULL,
  ctr_filed BOOLEAN NOT NULL
);

INSERT INTO fincen_ctr_thresholds VALUES
('CTR-201', 'CUST-8812', 28500.00, '2026-10-03', TRUE),
('CTR-202', 'CUST-9920', 9850.00, '2026-10-03', FALSE),
('CTR-203', 'CUST-4419', 45000.00, '2026-10-03', TRUE),
('CTR-204', 'CUST-3310', 8200.00, '2026-10-03', FALSE),
('CTR-205', 'CUST-7729', 114000.00, '2026-10-03', TRUE);


-- ----------------------------------------------------------------------------
-- WEEK 3: ASSET & WEALTH MANAGEMENT (DAYS 15 - 21)
-- ----------------------------------------------------------------------------

-- Day 15: Private Wealth Portfolio NAV Drift
DROP TABLE IF EXISTS portfolio_nav_drift;
CREATE TABLE portfolio_nav_drift (
  portfolio_id VARCHAR(20) NOT NULL,
  asset_class VARCHAR(40) NOT NULL,
  target_weight DECIMAL(5,2) NOT NULL,
  current_weight DECIMAL(5,2) NOT NULL,
  drift_pct DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (portfolio_id, asset_class)
);

INSERT INTO portfolio_nav_drift VALUES
('PORT-101', 'US Equities', 0.40, 0.48, 0.08),
('PORT-101', 'Fixed Income', 0.35, 0.28, -0.07),
('PORT-101', 'Alternative Assets', 0.15, 0.18, 0.03),
('PORT-101', 'Cash Reserves', 0.10, 0.06, -0.04),
('PORT-102', 'US Equities', 0.50, 0.51, 0.01);

-- Day 16: High-Net-Worth Securities Valuation
DROP TABLE IF EXISTS hnw_client_holdings;
CREATE TABLE hnw_client_holdings (
  holding_id VARCHAR(20) PRIMARY KEY,
  client_id VARCHAR(20) NOT NULL,
  ticker VARCHAR(10) NOT NULL,
  shares_held INT NOT NULL,
  market_price_usd DECIMAL(12,2) NOT NULL,
  market_value_usd DECIMAL(16,2) NOT NULL
);

INSERT INTO hnw_client_holdings VALUES
('HOLD-01', 'HNW-991', 'AAPL', 15000, 228.50, 3427500.00),
('HOLD-02', 'HNW-991', 'MSFT', 8500, 415.20, 3529200.00),
('HOLD-03', 'HNW-991', 'NVDA', 12000, 122.40, 1468800.00),
('HOLD-04', 'HNW-884', 'BRK.B', 6000, 452.10, 2712600.00),
('HOLD-05', 'HNW-884', 'JPM', 18000, 218.75, 3937500.00);

-- Day 17: Portfolio Beta & Sector Covariance
DROP TABLE IF EXISTS equity_portfolio_betas;
CREATE TABLE equity_portfolio_betas (
  position_id VARCHAR(20) PRIMARY KEY,
  ticker VARCHAR(10) NOT NULL,
  sector VARCHAR(40) NOT NULL,
  beta DECIMAL(6,3) NOT NULL,
  market_value_usd DECIMAL(16,2) NOT NULL
);

INSERT INTO equity_portfolio_betas VALUES
('POS-301', 'NVDA', 'Technology', 1.850, 45000000.00),
('POS-302', 'JNJ', 'Healthcare', 0.620, 38000000.00),
('POS-303', 'XOM', 'Energy', 0.880, 29000000.00),
('POS-304', 'AMZN', 'Consumer Discretionary', 1.420, 52000000.00),
('POS-305', 'PG', 'Consumer Staples', 0.550, 21000000.00);

-- Day 18: Corporate Action & Dividend Accruals Ledger
DROP TABLE IF EXISTS dividend_accruals_ledger;
CREATE TABLE dividend_accruals_ledger (
  accrual_id VARCHAR(20) PRIMARY KEY,
  client_id VARCHAR(20) NOT NULL,
  ticker VARCHAR(10) NOT NULL,
  dividend_per_share DECIMAL(8,4) NOT NULL,
  shares_owned INT NOT NULL,
  net_dividend_usd DECIMAL(14,2) NOT NULL
);

INSERT INTO dividend_accruals_ledger VALUES
('DIV-101', 'HNW-991', 'AAPL', 0.2500, 15000, 3750.00),
('DIV-102', 'HNW-884', 'JPM', 1.1500, 18000, 20700.00),
('DIV-103', 'HNW-772', 'MSFT', 0.7500, 22000, 16500.00),
('DIV-104', 'HNW-991', 'NVDA', 0.0100, 12000, 120.00);

-- Day 19: Tier Management Fee Schedules
DROP TABLE IF EXISTS tier_management_fees;
CREATE TABLE tier_management_fees (
  fee_id INT PRIMARY KEY,
  client_tier VARCHAR(40) NOT NULL,
  min_aum_usd DECIMAL(18,2) NOT NULL,
  max_aum_usd DECIMAL(18,2) NOT NULL,
  fee_bps INT NOT NULL
);

INSERT INTO tier_management_fees VALUES
(1, 'Silver Private Client', 1000000.00, 5000000.00, 75),
(2, 'Gold Private Client', 5000000.01, 25000000.00, 60),
(3, 'Platinum Family Office', 25000000.01, 100000000.00, 45),
(4, 'Ultra HNW Institutional', 100000000.01, 999999999999.00, 30);

-- Day 20: Private Banking Model Portfolio Execution
DROP TABLE IF EXISTS private_banking_rebalancing;
CREATE TABLE private_banking_rebalancing (
  order_id VARCHAR(20) PRIMARY KEY,
  account_id VARCHAR(20) NOT NULL,
  ticker VARCHAR(10) NOT NULL,
  order_side VARCHAR(4) NOT NULL,
  target_shares INT NOT NULL,
  execution_status VARCHAR(20) NOT NULL
);

INSERT INTO private_banking_rebalancing VALUES
('ORD-701', 'PORT-101', 'TLT', 'BUY', 4500, 'FILLED'),
('ORD-702', 'PORT-101', 'SPY', 'SELL', 1200, 'FILLED'),
('ORD-703', 'PORT-102', 'QQQ', 'SELL', 800, 'PENDING'),
('ORD-704', 'PORT-103', 'GLD', 'BUY', 1500, 'FILLED');

-- Day 21: Wealth Advisor Executive AUM Rollups
DROP TABLE IF EXISTS wealth_advisors;
CREATE TABLE wealth_advisors (
  advisor_id VARCHAR(20) PRIMARY KEY,
  advisor_name VARCHAR(100) NOT NULL,
  office_location VARCHAR(60) NOT NULL,
  total_clients INT NOT NULL,
  total_aum_usd DECIMAL(18,2) NOT NULL,
  annual_fee_bps INT NOT NULL
);

INSERT INTO wealth_advisors VALUES
('ADV-101', 'Victoria Sterling', 'New York - Madison Ave', 34, 485000000.00, 65),
('ADV-102', 'Arthur Pendelton', 'Palm Beach - Worth Ave', 28, 620000000.00, 58),
('ADV-103', 'Elena Rostova', 'Geneva - Rue du Rhone', 19, 390000000.00, 72),
('ADV-104', 'Charles Montgomery', 'San Francisco - Market St', 41, 540000000.00, 62);


-- ----------------------------------------------------------------------------
-- WEEK 4: MARKET RISK, TREASURY SOLVENCY & CAPSTONE (DAYS 22 - 30)
-- ----------------------------------------------------------------------------

-- Day 22: Historical Value at Risk (99% 1-Day VaR) on Swap Portfolios
DROP TABLE IF EXISTS swap_portfolio_pnl;
CREATE TABLE swap_portfolio_pnl (
  sim_id INT PRIMARY KEY,
  trading_desk VARCHAR(40) NOT NULL,
  historical_date DATE NOT NULL,
  daily_pnl_usd DECIMAL(16,2) NOT NULL
);

INSERT INTO swap_portfolio_pnl VALUES
(1, 'Rates & Swaps Desk', '2026-01-15', -14250000.00),
(2, 'Rates & Swaps Desk', '2026-01-16', -11800000.00),
(3, 'Rates & Swaps Desk', '2026-01-17', -8900000.00),
(4, 'Rates & Swaps Desk', '2026-01-18', -4200000.00),
(5, 'Rates & Swaps Desk', '2026-01-19', 1200000.00),
(6, 'Rates & Swaps Desk', '2026-01-20', 5400000.00),
(7, 'Rates & Swaps Desk', '2026-01-21', 8900000.00);

-- Day 23: Monte Carlo Greek Sensitivity Approximations
DROP TABLE IF EXISTS options_book_sensitivities;
CREATE TABLE options_book_sensitivities (
  position_id VARCHAR(20) PRIMARY KEY,
  underlying_ticker VARCHAR(10) NOT NULL,
  contract_type VARCHAR(4) NOT NULL,
  delta_usd DECIMAL(16,2) NOT NULL,
  gamma_usd DECIMAL(16,2) NOT NULL
);

INSERT INTO options_book_sensitivities VALUES
('OPT-001', 'SPX', 'PUT', -185000000.00, 42000000.00),
('OPT-002', 'SPX', 'CALL', 240000000.00, 38000000.00),
('OPT-003', 'NDX', 'PUT', -95000000.00, 19500000.00),
('OPT-004', 'NDX', 'CALL', 110000000.00, 22000000.00),
('OPT-005', 'RUT', 'PUT', -42000000.00, 8500000.00);

-- Day 24: Basel III Liquidity Coverage Ratio (LCR) & HQLA
DROP TABLE IF EXISTS treasury_liquidity_holdings;
CREATE TABLE treasury_liquidity_holdings (
  asset_id VARCHAR(20) PRIMARY KEY,
  asset_description VARCHAR(100) NOT NULL,
  asset_level VARCHAR(10) NOT NULL, -- 'Level 1', 'Level 2A', 'Level 2B'
  market_value_usd DECIMAL(18,2) NOT NULL,
  is_encumbered BOOLEAN NOT NULL
);

INSERT INTO treasury_liquidity_holdings VALUES
('HQLA-01', 'US Treasury 10Y Notes', 'Level 1', 380000000000.00, FALSE),
('HQLA-02', 'Fed Reserve Cash Deposits', 'Level 1', 145000000000.00, FALSE),
('HQLA-03', 'Fannie Mae Agency Debt', 'Level 2A', 95000000000.00, FALSE),
('HQLA-04', 'AAA Sovereign Eurobonds', 'Level 1', 62000000000.00, FALSE),
('HQLA-05', 'Investment Grade Corporates', 'Level 2B', 42000000000.00, FALSE),
('HQLA-06', 'Pledged Repo Collateral', 'Level 1', 85000000000.00, TRUE);

-- Day 25: Counterparty Credit Risk & ISDA Netting
DROP TABLE IF EXISTS counterparties;
CREATE TABLE counterparties (
  counterparty_id VARCHAR(20) PRIMARY KEY,
  legal_name VARCHAR(100) NOT NULL,
  credit_rating VARCHAR(5) NOT NULL,
  collateral_posted_usd DECIMAL(16,2) NOT NULL,
  margin_threshold_usd DECIMAL(16,2) NOT NULL,
  net_mtm_usd DECIMAL(16,2) NOT NULL
);

INSERT INTO counterparties VALUES
('CP-101', 'Highland Capital Master Fund', 'BBB', 45000000.00, 10000000.00, 117000000.00),
('CP-102', 'Citadel Global Fixed Income', 'AA-', 180000000.00, 50000000.00, 195000000.00),
('CP-103', 'Bridgewater Pure Alpha', 'A+', 220000000.00, 40000000.00, 210000000.00),
('CP-104', 'Tudor Quantum Investments', 'A-', 60000000.00, 15000000.00, 92000000.00);

-- Day 26: High-Frequency Algo Microsecond Order Cancellation
DROP TABLE IF EXISTS dma_algo_orders;
CREATE TABLE dma_algo_orders (
  order_id VARCHAR(30) PRIMARY KEY,
  client_mpid VARCHAR(10) NOT NULL,
  ticker_symbol VARCHAR(10) NOT NULL,
  order_qty INT NOT NULL,
  limit_price DECIMAL(10,4) NOT NULL,
  placed_at_ts TIMESTAMP(6) NOT NULL,
  cancelled_at_ts TIMESTAMP(6) NULL,
  duration_us INT NULL
);

INSERT INTO dma_algo_orders VALUES
('ORD-8810', 'FLOW', 'AAPL', 500, 228.4500, '2026-10-04 09:30:00.100200', '2026-10-04 09:30:00.101850', 1650),
('ORD-8811', 'FLOW', 'AAPL', 500, 228.4600, '2026-10-04 09:30:00.102100', '2026-10-04 09:30:00.104200', 2100),
('ORD-8812', 'RETL', 'MSFT', 100, 415.0000, '2026-10-04 09:30:01.000000', NULL, NULL),
('ORD-8813', 'FLOW', 'NVDA', 1000, 122.5000, '2026-10-04 09:30:00.200150', '2026-10-04 09:30:00.203950', 3800);

-- Day 27: Cross-Currency Basis Swaps & Covered Interest Parity (CIP)
DROP TABLE IF EXISTS fx_cross_currency_basis;
CREATE TABLE fx_cross_currency_basis (
  quote_id INT PRIMARY KEY,
  currency_pair VARCHAR(7) NOT NULL,
  quote_date DATE NOT NULL,
  basis_spread_bps DECIMAL(10,3) NOT NULL
);

INSERT INTO fx_cross_currency_basis VALUES
(1, 'EUR/USD', '2026-09-01', -22.500),
(2, 'EUR/USD', '2026-09-15', -24.100),
(3, 'EUR/USD', '2026-10-01', -23.800),
(4, 'EUR/USD', '2026-10-03', -48.200),
(5, 'GBP/USD', '2026-10-03', -14.500);

-- Day 28: Federal Reserve CCAR Severely Adverse Scenario Credit Risk
DROP TABLE IF EXISTS ccar_loan_portfolio;
CREATE TABLE ccar_loan_portfolio (
  loan_id VARCHAR(20) PRIMARY KEY,
  asset_class VARCHAR(50) NOT NULL,
  exposure_at_default_usd DECIMAL(18,2) NOT NULL,
  stressed_pd DECIMAL(6,4) NOT NULL,
  recovery_rate DECIMAL(6,4) NOT NULL
);

INSERT INTO ccar_loan_portfolio VALUES
('CRE-901', 'Commercial Real Estate', 48000000000.00, 0.0850, 0.4000),
('MTG-102', 'Residential Mortgages', 125000000000.00, 0.0320, 0.6500),
('CORP-301', 'Corporate Bonds', 82000000000.00, 0.0410, 0.5000),
('CARD-88', 'Credit Cards', 35000000000.00, 0.0980, 0.1500);

-- Day 29: Intraday Fedwire Settlement & Real-Time Liquidity Shortfall Defense
DROP TABLE IF EXISTS fedwire_settlement_ledger;
CREATE TABLE fedwire_settlement_ledger (
  wire_id VARCHAR(30) PRIMARY KEY,
  wire_time TIME NOT NULL,
  sender_bank VARCHAR(60) NOT NULL,
  receiver_bank VARCHAR(60) NOT NULL,
  net_cash_flow_usd DECIMAL(18,2) NOT NULL
);

INSERT INTO fedwire_settlement_ledger VALUES
('FEDW-001', '09:15:00', 'Bank of America', 'JPMorgan Chase', 12500000000.00),
('FEDW-002', '11:30:00', 'JPMorgan Chase', 'Citigroup', -18400000000.00),
('FEDW-003', '13:45:00', 'Wells Fargo', 'JPMorgan Chase', 8900000000.00),
('FEDW-004', '14:15:00', 'JPMorgan Chase', 'Goldman Sachs', -21000000000.00),
('FEDW-005', '15:30:00', 'Federal Reserve Repo', 'JPMorgan Chase', 25000000000.00);

-- Day 30: Executive Capstone: Common Equity Tier 1 (CET1) Capital Adequacy
DROP TABLE IF EXISTS jpmorgan_divisions_capital;
CREATE TABLE jpmorgan_divisions_capital (
  division_id VARCHAR(20) PRIMARY KEY,
  division_name VARCHAR(80) NOT NULL,
  cet1_capital_usd DECIMAL(18,2) NOT NULL,
  risk_weighted_assets_usd DECIMAL(18,2) NOT NULL
);

INSERT INTO jpmorgan_divisions_capital VALUES
('CIB', 'Corporate & Investment Bank', 118000000000.00, 785000000000.00),
('CCB', 'Consumer & Community Banking', 85000000000.00, 540000000000.00),
('AWM', 'Asset & Wealth Management', 24000000000.00, 160000000000.00),
('CB', 'Commercial Banking', 38000000000.00, 265000000000.00);

-- ============================================================================
-- VERIFICATION QUERIES (Quick Smoke Test)
-- ============================================================================

-- Test 1: Day 01 - Unreconciled Nostro Balances
SELECT correspondent_bank, currency, closing_balance
FROM nostro_vostro_ledger
WHERE recon_status = 'UNRECONCILED';

-- Test 2: Day 24 - Basel III Weighted HQLA Reserves
SELECT asset_level,
       COUNT(*) AS total_holdings,
       SUM(market_value_usd) AS raw_market_value,
       ROUND(SUM(CASE 
         WHEN asset_level = 'Level 1' THEN market_value_usd * 1.00
         WHEN asset_level = 'Level 2A' THEN market_value_usd * 0.85
         WHEN asset_level = 'Level 2B' THEN market_value_usd * 0.50
         ELSE 0.00
       END), 2) AS weighted_hqla_usd
FROM treasury_liquidity_holdings
WHERE is_encumbered = FALSE
GROUP BY asset_level;

-- Test 3: Day 30 - Board of Directors CET1 Solvency Ratio
SELECT COUNT(division_id) AS total_divisions,
       SUM(cet1_capital_usd) AS total_cet1_capital_usd,
       SUM(risk_weighted_assets_usd) AS total_rwa_usd,
       ROUND((SUM(cet1_capital_usd) / SUM(risk_weighted_assets_usd)) * 100.0, 2) AS enterprise_cet1_ratio_pct,
       CASE 
         WHEN (SUM(cet1_capital_usd) / SUM(risk_weighted_assets_usd)) * 100.0 >= 11.5 THEN 'STRONG SOLVENCY (PASSED)'
         ELSE 'CAPITAL DEFICIT'
       END AS board_verdict
FROM jpmorgan_divisions_capital;
