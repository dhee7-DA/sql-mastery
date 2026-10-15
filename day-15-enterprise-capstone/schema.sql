-- =============================================================================
-- GRAND CAPSTONE: MULTI-ASSET RECONCILIATION ENGINE
-- SCHEMA DEFINITION & RELATIONAL TOPOLOGY DDL
-- =============================================================================

DROP TABLE IF EXISTS recon_settlement_breaks CASCADE;
DROP TABLE IF EXISTS custodian_positions CASCADE;
DROP TABLE IF EXISTS dtcc_clearing_records CASCADE;
DROP TABLE IF EXISTS internal_trade_blotter CASCADE;
DROP TABLE IF EXISTS fx_daily_rates CASCADE;

-- -----------------------------------------------------------------------------
-- 1. FX Benchmark Reference Master Table
-- -----------------------------------------------------------------------------
CREATE TABLE fx_daily_rates (
    rate_date DATE NOT NULL,
    currency VARCHAR(3) NOT NULL,
    currency_name VARCHAR(50) NOT NULL,
    usd_exchange_rate NUMERIC(14, 6) NOT NULL CHECK (usd_exchange_rate > 0),
    PRIMARY KEY (rate_date, currency)
);

-- -----------------------------------------------------------------------------
-- 2. Internal Front-Office Trade Blotter
-- -----------------------------------------------------------------------------
CREATE TABLE internal_trade_blotter (
    trade_id VARCHAR(50) PRIMARY KEY,
    desk_code VARCHAR(20) NOT NULL,
    raw_ticker VARCHAR(30) NOT NULL,
    isin VARCHAR(12),
    asset_class VARCHAR(20) NOT NULL CHECK (asset_class IN ('EQUITY', 'FIXED_INCOME', 'FX', 'COMMODITY', 'DERIVATIVE')),
    side VARCHAR(4) NOT NULL CHECK (side IN ('BUY', 'SELL')),
    trade_qty NUMERIC(18, 4) NOT NULL CHECK (trade_qty > 0),
    execution_price NUMERIC(18, 4) NOT NULL CHECK (execution_price > 0),
    currency VARCHAR(3) NOT NULL,
    trade_timestamp TIMESTAMPTZ NOT NULL,
    counterparty_id VARCHAR(50) NOT NULL,
    trader_id VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'EXECUTED'
);

CREATE INDEX idx_internal_isin_side ON internal_trade_blotter(isin, side);
CREATE INDEX idx_internal_trade_date ON internal_trade_blotter(CAST(trade_timestamp AS DATE));
CREATE INDEX idx_internal_counterparty ON internal_trade_blotter(counterparty_id);

-- -----------------------------------------------------------------------------
-- 3. External DTCC Clearing Feed Records
-- -----------------------------------------------------------------------------
CREATE TABLE dtcc_clearing_records (
    dtcc_ref_id VARCHAR(50) PRIMARY KEY,
    executing_broker VARCHAR(50) NOT NULL,
    ticker VARCHAR(30) NOT NULL,
    isin VARCHAR(12) NOT NULL,
    side VARCHAR(4) NOT NULL CHECK (side IN ('BUY', 'SELL')),
    cleared_qty NUMERIC(18, 4) NOT NULL CHECK (cleared_qty > 0),
    clearing_price NUMERIC(18, 4) NOT NULL CHECK (clearing_price > 0),
    currency VARCHAR(3) NOT NULL,
    cleared_timestamp TIMESTAMPTZ NOT NULL,
    clearing_status VARCHAR(20) NOT NULL DEFAULT 'CLEARED'
);

CREATE INDEX idx_dtcc_isin_side ON dtcc_clearing_records(isin, side);
CREATE INDEX idx_dtcc_cleared_date ON dtcc_clearing_records(CAST(cleared_timestamp AS DATE));
CREATE INDEX idx_dtcc_broker ON dtcc_clearing_records(executing_broker);

-- -----------------------------------------------------------------------------
-- 4. Custodian Settled Holdings & Cash Balances
-- -----------------------------------------------------------------------------
CREATE TABLE custodian_positions (
    position_id SERIAL PRIMARY KEY,
    custodian_name VARCHAR(50) NOT NULL,
    account_number VARCHAR(30) NOT NULL,
    isin VARCHAR(12) NOT NULL,
    settled_shares NUMERIC(18, 4) NOT NULL,
    cash_balance_cents BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL,
    as_of_date DATE NOT NULL
);

CREATE INDEX idx_custodian_isin_date ON custodian_positions(isin, as_of_date);

-- -----------------------------------------------------------------------------
-- 5. Persistent Reconciliation Settlement Breaks Target Table
-- -----------------------------------------------------------------------------
CREATE TABLE recon_settlement_breaks (
    break_id SERIAL PRIMARY KEY,
    reconciliation_run_id UUID NOT NULL,
    trade_id VARCHAR(50),
    dtcc_ref_id VARCHAR(50),
    counterparty_id VARCHAR(50),
    asset_class VARCHAR(20),
    break_category VARCHAR(30) NOT NULL CHECK (
        break_category IN (
            'MATCHED', 
            'PRICE_MISMATCH', 
            'QUANTITY_MISMATCH', 
            'PHANTOM_INTERNAL_TRADE', 
            'UNAUTHORIZED_EXTERNAL_FILL',
            'MULTIPLE_DISCREPANCY'
        )
    ),
    severity VARCHAR(15) NOT NULL CHECK (severity IN ('NORMAL', 'MEDIUM', 'HIGH', 'CRITICAL')),
    qty_delta NUMERIC(18, 4),
    price_delta NUMERIC(18, 4),
    exposure_usd NUMERIC(18, 2) NOT NULL,
    ageing_days INT NOT NULL DEFAULT 0,
    resolution_status VARCHAR(20) NOT NULL DEFAULT 'UNRESOLVED',
    detected_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_recon_category ON recon_settlement_breaks(break_category);
CREATE INDEX idx_recon_severity ON recon_settlement_breaks(severity);
CREATE INDEX idx_recon_counterparty ON recon_settlement_breaks(counterparty_id);
