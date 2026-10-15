-- =============================================================================
-- GRAND CAPSTONE: MULTI-ASSET RECONCILIATION ENGINE
-- SEED DATA: INSTITUTIONAL TRADES, DTCC MANIFESTS & MULTI-CURRENCY FX
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Seed FX Daily Exchange Rates Master Table
-- -----------------------------------------------------------------------------
INSERT INTO fx_daily_rates (rate_date, currency, currency_name, usd_exchange_rate) VALUES
('2026-10-13', 'USD', 'US Dollar',             1.000000),
('2026-10-13', 'EUR', 'Euro',                  1.082500),
('2026-10-13', 'GBP', 'British Pound',         1.291000),
('2026-10-13', 'JPY', 'Japanese Yen',          0.006560), -- ~152.44 JPY / USD
('2026-10-13', 'CHF', 'Swiss Franc',           1.132000),
('2026-10-13', 'HKD', 'Hong Kong Dollar',      0.128400),

('2026-10-14', 'USD', 'US Dollar',             1.000000),
('2026-10-14', 'EUR', 'Euro',                  1.085000),
('2026-10-14', 'GBP', 'British Pound',         1.295000),
('2026-10-14', 'JPY', 'Japanese Yen',          0.006550), -- ~152.67 JPY / USD
('2026-10-14', 'CHF', 'Swiss Franc',           1.135000),
('2026-10-14', 'HKD', 'Hong Kong Dollar',      0.128500),

('2026-10-15', 'USD', 'US Dollar',             1.000000),
('2026-10-15', 'EUR', 'Euro',                  1.087000),
('2026-10-15', 'GBP', 'British Pound',         1.298000),
('2026-10-15', 'JPY', 'Japanese Yen',          0.006530),
('2026-10-15', 'CHF', 'Swiss Franc',           1.137000),
('2026-10-15', 'HKD', 'Hong Kong Dollar',      0.128600);

-- -----------------------------------------------------------------------------
-- 2. Seed Internal Front-Office Trade Blotter
-- -----------------------------------------------------------------------------
INSERT INTO internal_trade_blotter (
    trade_id, desk_code, raw_ticker, isin, asset_class, side, 
    trade_qty, execution_price, currency, trade_timestamp, 
    counterparty_id, trader_id, status
) VALUES
-- Trade 01: Clean Match (US Equity)
('TRD-1001', 'EQUITY_FLOW', ' AAPL.US ', 'US0378331005', 'EQUITY', 'BUY', 
 10000, 185.5000, 'USD', '2026-10-14 09:31:12-04', 'MS_EQUITIES', 'trader_alex', 'EXECUTED'),

-- Trade 02: Price Mismatch (MSFT - internal entered 420.00, DTCC cleared 420.75)
('TRD-1002', 'TECH_SECTOR', 'MSFT', 'US5949181045', 'EQUITY', 'BUY', 
 5000, 420.0000, 'USD', '2026-10-14 09:35:00-04', 'BARCLAYS_NY', 'trader_sarah', 'EXECUTED'),

-- Trade 03: Quantity Break (NVDA - internal booked 25k, DTCC only cleared 20k)
('TRD-1003', 'QUANT_ALPHA', ' NVDA ', 'US67066G1040', 'EQUITY', 'SELL', 
 25000, 890.2500, 'USD', '2026-10-14 09:42:15-04', 'VIRTU_FINANCIAL', 'algo_titan', 'EXECUTED'),

-- Trade 04: Phantom Internal (GOOGL - Internal booked, broker dropped wire!)
('TRD-1004', 'TECH_SECTOR', 'GOOGL', 'US02079K3059', 'EQUITY', 'BUY', 
 15000, 175.0000, 'USD', '2026-10-14 10:05:40-04', 'CITADEL_EXEC', 'trader_alex', 'EXECUTED'),

-- Trade 05: Clean Match (European Equity in EUR)
('TRD-1005', 'GLOBAL_MACRO', 'ASML.AS', 'NL0010273215', 'EQUITY', 'BUY', 
 2000, 845.0000, 'EUR', '2026-10-14 11:15:00+02', 'BNP_PARIBAS', 'trader_hugo', 'EXECUTED'),

-- Trade 06: Clean Match (UK Equity in GBP)
('TRD-1006', 'GLOBAL_MACRO', 'AZN.L', 'GB0009895292', 'EQUITY', 'BUY', 
 8000, 105.2000, 'GBP', '2026-10-14 11:20:00+01', 'HSBC_GLOBAL', 'trader_clara', 'EXECUTED'),

-- Trade 07: Price Mismatch in JPY (Tokyo Electron)
('TRD-1007', 'QUANT_ALPHA', '8035.T', 'JP3571400005', 'EQUITY', 'SELL', 
 12000, 36500.0000, 'JPY', '2026-10-14 13:00:00+09', 'NOMURA_SEC', 'algo_titan', 'EXECUTED'),

-- Trade 08: US 10-Year Treasury Bond (Fixed Income Clean Match)
('TRD-1008', 'CREDIT_FLOW', 'UST10Y', 'US91282CDJ71', 'FIXED_INCOME', 'BUY', 
 5000000, 99.2500, 'USD', '2026-10-14 14:10:00-04', 'JPM_RATES', 'trader_marcus', 'EXECUTED'),

-- Trade 09: Ageing Break from 2026-10-11 (TSLA Quantity Mismatch - 3 Days Old)
('TRD-1009', 'EQUITY_FLOW', 'TSLA', 'US88160R1014', 'EQUITY', 'BUY', 
 10000, 240.0000, 'USD', '2026-10-11 15:45:00-04', 'UBS_EQUITIES', 'trader_sarah', 'EXECUTED');


-- -----------------------------------------------------------------------------
-- 3. Seed DTCC Clearing Manifest Records
-- -----------------------------------------------------------------------------
INSERT INTO dtcc_clearing_records (
    dtcc_ref_id, executing_broker, ticker, isin, side, 
    cleared_qty, clearing_price, currency, cleared_timestamp, clearing_status
) VALUES
-- Matching Trade 01 (Clean Match)
('DTCC-9001', 'MS_EQUITIES', 'AAPL', 'US0378331005', 'BUY', 
 10000, 185.5000, 'USD', '2026-10-14 09:31:12-04', 'CLEARED'),

-- Matching Trade 02 (Price Mismatch: $420.75 vs $420.00)
('DTCC-9002', 'BARCLAYS_NY', 'MSFT', 'US5949181045', 'BUY', 
 5000, 420.7500, 'USD', '2026-10-14 09:35:00-04', 'CLEARED'),

-- Matching Trade 03 (Quantity Break: 20,000 vs 25,000)
('DTCC-9003', 'VIRTU_FINANCIAL', 'NVDA', 'US67066G1040', 'SELL', 
 20000, 890.2500, 'USD', '2026-10-14 09:42:15-04', 'CLEARED'),

-- Notice Trade 04 (GOOGL) is INTENTIONALLY ABSENT from DTCC (Phantom Trade!)

-- Matching Trade 05 (Clean Match EUR)
('DTCC-9005', 'BNP_PARIBAS', 'ASML', 'NL0010273215', 'BUY', 
 2000, 845.0000, 'EUR', '2026-10-14 11:15:00+02', 'CLEARED'),

-- Matching Trade 06 (Clean Match GBP)
('DTCC-9006', 'HSBC_GLOBAL', 'AZN', 'GB0009895292', 'BUY', 
 8000, 105.2000, 'GBP', '2026-10-14 11:20:00+01', 'CLEARED'),

-- Matching Trade 07 (Price Mismatch JPY: 36,450 vs 36,500)
('DTCC-9007', 'NOMURA_SEC', '8035', 'JP3571400005', 'SELL', 
 12000, 36450.0000, 'JPY', '2026-10-14 13:00:00+09', 'CLEARED'),

-- Matching Trade 08 (Clean Match Fixed Income)
('DTCC-9008', 'JPM_RATES', 'UST10Y', 'US91282CDJ71', 'BUY', 
 5000000, 99.2500, 'USD', '2026-10-14 14:10:00-04', 'CLEARED'),

-- Matching Trade 09 (Ageing Break from 2026-10-11: 8,000 shares vs 10,000 shares)
('DTCC-9009', 'UBS_EQUITIES', 'TSLA', 'US88160R1014', 'BUY', 
 8000, 240.0000, 'USD', '2026-10-11 15:45:00-04', 'CLEARED'),

-- Trade 10: Unauthorized External Fill! (Cleared under firm's broker ID, zero internal booking!)
('DTCC-9010', 'GOLDMAN_SACHS', 'AMZN', 'US0231351067', 'BUY', 
 8000, 182.5000, 'USD', '2026-10-14 15:12:00-04', 'CLEARED');


-- -----------------------------------------------------------------------------
-- 4. Seed Custodian Settled Holdings & Cash Balances
-- -----------------------------------------------------------------------------
INSERT INTO custodian_positions (
    custodian_name, account_number, isin, settled_shares, 
    cash_balance_cents, currency, as_of_date
) VALUES
('BNY_MELLON',   'CUST-8801-US', 'US0378331005', 250000, 4500000000, 'USD', '2026-10-14'),
('BNY_MELLON',   'CUST-8801-US', 'US5949181045', 180000, 4500000000, 'USD', '2026-10-14'),
('STATE_STREET', 'CUST-4402-EU', 'NL0010273215',  35000, 1200000000, 'EUR', '2026-10-14'),
('STATE_STREET', 'CUST-4402-UK', 'GB0009895292',  95000,  850000000, 'GBP', '2026-10-14'),
('JP_MORGAN',    'CUST-1109-JP', 'JP3571400005',  60000, 9500000000, 'JPY', '2026-10-14');
