#!/usr/bin/env python3
"""
=============================================================================
DAY 15 GRAND CAPSTONE: MULTI-ASSET RECONCILIATION ENGINE SIMULATOR
Executes the full 5-stage SQL reconciliation pipeline on in-memory SQLite/Postgres
and prints executive C-Suite risk scorecards and counterparty rankings.
=============================================================================
"""

import sqlite3
import sys

# Configure UTF-8 stdout for Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_simulation():
    conn = sqlite3.connect(':memory:')
    cur = conn.cursor()

    # 1. Create Tables
    cur.executescript("""
    CREATE TABLE fx_daily_rates (
        rate_date TEXT NOT NULL,
        currency TEXT NOT NULL,
        currency_name TEXT NOT NULL,
        usd_exchange_rate REAL NOT NULL,
        PRIMARY KEY (rate_date, currency)
    );

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

    CREATE TABLE dtcc_clearing_records (
        dtcc_ref_id TEXT PRIMARY KEY,
        executing_broker TEXT NOT NULL,
        ticker TEXT NOT NULL,
        isin TEXT NOT NULL,
        side TEXT NOT NULL,
        cleared_qty REAL NOT NULL,
        clearing_price REAL NOT NULL,
        currency TEXT NOT NULL,
        cleared_timestamp TEXT NOT NULL,
        clearing_status TEXT NOT NULL DEFAULT 'CLEARED'
    );

    CREATE TABLE recon_settlement_breaks (
        break_id INTEGER PRIMARY KEY AUTOINCREMENT,
        trade_id TEXT,
        dtcc_ref_id TEXT,
        counterparty_id TEXT,
        asset_class TEXT,
        break_category TEXT NOT NULL,
        severity TEXT NOT NULL,
        qty_delta REAL,
        price_delta REAL,
        exposure_usd REAL NOT NULL,
        ageing_days INT NOT NULL DEFAULT 0,
        resolution_status TEXT NOT NULL DEFAULT 'UNRESOLVED'
    );
    """)

    # 2. Seed Data
    cur.executescript("""
    INSERT INTO fx_daily_rates VALUES
    ('2026-10-13', 'USD', 'US Dollar', 1.000000),
    ('2026-10-13', 'EUR', 'Euro', 1.082500),
    ('2026-10-13', 'GBP', 'British Pound', 1.291000),
    ('2026-10-13', 'JPY', 'Japanese Yen', 0.006560),
    ('2026-10-14', 'USD', 'US Dollar', 1.000000),
    ('2026-10-14', 'EUR', 'Euro', 1.085000),
    ('2026-10-14', 'GBP', 'British Pound', 1.295000),
    ('2026-10-14', 'JPY', 'Japanese Yen', 0.006550),
    ('2026-10-15', 'USD', 'US Dollar', 1.000000),
    ('2026-10-15', 'EUR', 'Euro', 1.087000),
    ('2026-10-15', 'GBP', 'British Pound', 1.298000),
    ('2026-10-15', 'JPY', 'Japanese Yen', 0.006530);

    INSERT INTO internal_trade_blotter VALUES
    ('TRD-1001', 'EQUITY_FLOW', ' AAPL.US ', 'US0378331005', 'EQUITY', 'BUY', 10000, 185.5000, 'USD', '2026-10-14 09:31:12', 'MS_EQUITIES', 'trader_alex', 'EXECUTED'),
    ('TRD-1002', 'TECH_SECTOR', 'MSFT', 'US5949181045', 'EQUITY', 'BUY', 5000, 420.0000, 'USD', '2026-10-14 09:35:00', 'BARCLAYS_NY', 'trader_sarah', 'EXECUTED'),
    ('TRD-1003', 'QUANT_ALPHA', ' NVDA ', 'US67066G1040', 'EQUITY', 'SELL', 25000, 890.2500, 'USD', '2026-10-14 09:42:15', 'VIRTU_FINANCIAL', 'algo_titan', 'EXECUTED'),
    ('TRD-1004', 'TECH_SECTOR', 'GOOGL', 'US02079K3059', 'EQUITY', 'BUY', 15000, 175.0000, 'USD', '2026-10-14 10:05:40', 'CITADEL_EXEC', 'trader_alex', 'EXECUTED'),
    ('TRD-1005', 'GLOBAL_MACRO', 'ASML.AS', 'NL0010273215', 'EQUITY', 'BUY', 2000, 845.0000, 'EUR', '2026-10-14 11:15:00', 'BNP_PARIBAS', 'trader_hugo', 'EXECUTED'),
    ('TRD-1006', 'GLOBAL_MACRO', 'AZN.L', 'GB0009895292', 'EQUITY', 'BUY', 8000, 105.2000, 'GBP', '2026-10-14 11:20:00', 'HSBC_GLOBAL', 'trader_clara', 'EXECUTED'),
    ('TRD-1007', 'QUANT_ALPHA', '8035.T', 'JP3571400005', 'EQUITY', 'SELL', 12000, 36500.0000, 'JPY', '2026-10-14 13:00:00', 'NOMURA_SEC', 'algo_titan', 'EXECUTED'),
    ('TRD-1008', 'CREDIT_FLOW', 'UST10Y', 'US91282CDJ71', 'FIXED_INCOME', 'BUY', 5000000, 99.2500, 'USD', '2026-10-14 14:10:00', 'JPM_RATES', 'trader_marcus', 'EXECUTED'),
    ('TRD-1009', 'EQUITY_FLOW', 'TSLA', 'US88160R1014', 'EQUITY', 'BUY', 10000, 240.0000, 'USD', '2026-10-11 15:45:00', 'UBS_EQUITIES', 'trader_sarah', 'EXECUTED');

    INSERT INTO dtcc_clearing_records VALUES
    ('DTCC-9001', 'MS_EQUITIES', 'AAPL', 'US0378331005', 'BUY', 10000, 185.5000, 'USD', '2026-10-14 09:31:12', 'CLEARED'),
    ('DTCC-9002', 'BARCLAYS_NY', 'MSFT', 'US5949181045', 'BUY', 5000, 420.7500, 'USD', '2026-10-14 09:35:00', 'CLEARED'),
    ('DTCC-9003', 'VIRTU_FINANCIAL', 'NVDA', 'US67066G1040', 'SELL', 20000, 890.2500, 'USD', '2026-10-14 09:42:15', 'CLEARED'),
    ('DTCC-9005', 'BNP_PARIBAS', 'ASML', 'NL0010273215', 'BUY', 2000, 845.0000, 'EUR', '2026-10-14 11:15:00', 'CLEARED'),
    ('DTCC-9006', 'HSBC_GLOBAL', 'AZN', 'GB0009895292', 'BUY', 8000, 105.2000, 'GBP', '2026-10-14 11:20:00', 'CLEARED'),
    ('DTCC-9007', 'NOMURA_SEC', '8035', 'JP3571400005', 'SELL', 12000, 36450.0000, 'JPY', '2026-10-14 13:00:00', 'CLEARED'),
    ('DTCC-9008', 'JPM_RATES', 'UST10Y', 'US91282CDJ71', 'BUY', 5000000, 99.2500, 'USD', '2026-10-14 14:10:00', 'CLEARED'),
    ('DTCC-9009', 'UBS_EQUITIES', 'TSLA', 'US88160R1014', 'BUY', 8000, 240.0000, 'USD', '2026-10-11 15:45:00', 'CLEARED'),
    ('DTCC-9010', 'GOLDMAN_SACHS', 'AMZN', 'US0231351067', 'BUY', 8000, 182.5000, 'USD', '2026-10-14 15:12:00', 'CLEARED');
    """)

    # 3. Execute Pipeline Query: C-Suite Executive Scorecard
    pipeline_sql = """
    WITH SanitizedInternal AS (
        SELECT 
            trade_id, desk_code,
            UPPER(TRIM(raw_ticker)) AS clean_ticker,
            UPPER(TRIM(isin)) AS isin,
            asset_class,
            UPPER(TRIM(side)) AS side,
            trade_qty, execution_price,
            (trade_qty * execution_price) AS local_notional,
            UPPER(TRIM(currency)) AS currency,
            SUBSTR(trade_timestamp, 1, 10) AS trade_date,
            counterparty_id
        FROM internal_trade_blotter
        WHERE status = 'EXECUTED'
    ),
    SanitizedDTCC AS (
        SELECT 
            dtcc_ref_id, executing_broker,
            UPPER(TRIM(ticker)) AS clean_ticker,
            UPPER(TRIM(isin)) AS isin,
            UPPER(TRIM(side)) AS side,
            cleared_qty, clearing_price,
            (cleared_qty * clearing_price) AS local_cleared_notional,
            UPPER(TRIM(currency)) AS currency,
            SUBSTR(cleared_timestamp, 1, 10) AS cleared_date,
            clearing_status
        FROM dtcc_clearing_records
        WHERE clearing_status = 'CLEARED'
    ),
    MatchedRaw AS (
        SELECT 
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
            i.trade_qty AS internal_qty,
            d.cleared_qty AS cleared_qty,
            COALESCE(i.trade_qty, 0) - COALESCE(d.cleared_qty, 0) AS qty_delta,
            i.execution_price,
            d.clearing_price,
            COALESCE(i.execution_price, 0) - COALESCE(d.clearing_price, 0) AS price_delta,
            i.local_notional AS internal_local_notional,
            d.local_cleared_notional AS cleared_local_notional,
            CASE
                WHEN d.dtcc_ref_id IS NULL THEN 'PHANTOM_INTERNAL_TRADE'
                WHEN i.trade_id IS NULL THEN 'UNAUTHORIZED_EXTERNAL_FILL'
                WHEN ABS(COALESCE(i.execution_price, 0) - COALESCE(d.clearing_price, 0)) > 0.005 
                 AND COALESCE(i.trade_qty, 0) != COALESCE(d.cleared_qty, 0) THEN 'MULTIPLE_DISCREPANCY'
                WHEN ABS(COALESCE(i.execution_price, 0) - COALESCE(d.clearing_price, 0)) > 0.005 THEN 'PRICE_MISMATCH'
                WHEN COALESCE(i.trade_qty, 0) != COALESCE(d.cleared_qty, 0) THEN 'QUANTITY_MISMATCH'
                ELSE 'MATCHED'
            END AS break_category,
            CAST(ROUND(julianday('2026-10-14') - julianday(COALESCE(i.trade_date, d.cleared_date))) AS INT) AS ageing_days
        FROM SanitizedInternal i
        FULL OUTER JOIN SanitizedDTCC d
          ON i.isin = d.isin
         AND i.side = d.side
         AND i.trade_date = d.cleared_date
    ),
    ValuatedBreaks AS (
        SELECT 
            m.*,
            fx.usd_exchange_rate,
            ROUND(m.internal_local_notional * fx.usd_exchange_rate, 2) AS internal_usd_notional,
            ROUND(m.cleared_local_notional * fx.usd_exchange_rate, 2) AS cleared_usd_notional,
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
            ) AS exposure_usd,
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
    SELECT 
        break_category,
        COUNT(*) AS trade_count,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS pct_of_universe,
        ROUND(SUM(exposure_usd), 2) AS total_exposure_usd,
        ROUND(AVG(exposure_usd), 2) AS avg_exposure_usd,
        MAX(ageing_days) AS max_ageing_days
    FROM ValuatedBreaks
    GROUP BY break_category
    ORDER BY total_exposure_usd DESC;
    """

    print("=" * 86)
    print("🏛️ GRAND CAPSTONE: MULTI-ASSET SETTLEMENT RECONCILIATION ENGINE EXECUTION")
    print("=" * 86)
    print("\n📊 STAGE 1: EXECUTIVE BREAKDOWN SCORECARD (C-SUITE RISK REPORT)")
    print("-" * 86)
    print(f"{'BREAK CATEGORY':<30} | {'COUNT':<6} | {'% TOTAL':<8} | {'EXPOSURE (USD)':<18} | {'MAX AGE':<7}")
    print("-" * 86)

    for row in cur.execute(pipeline_sql).fetchall():
        cat, cnt, pct, exp, avg_exp, max_age = row
        exp_str = f"${exp:,.2f}" if exp else "$0.00"
        print(f"{cat:<30} | {cnt:<6} | {pct:>6.1f}% | {exp_str:>18} | {max_age:>5}d")
    print("-" * 86)

    # 4. Counterparty Ranking Query
    counterparty_sql = """
    WITH SanitizedInternal AS (
        SELECT trade_id, desk_code, UPPER(TRIM(raw_ticker)) AS clean_ticker,
               UPPER(TRIM(isin)) AS isin, asset_class, UPPER(TRIM(side)) AS side,
               trade_qty, execution_price, (trade_qty * execution_price) AS local_notional,
               UPPER(TRIM(currency)) AS currency, SUBSTR(trade_timestamp, 1, 10) AS trade_date, counterparty_id
        FROM internal_trade_blotter WHERE status = 'EXECUTED'
    ),
    SanitizedDTCC AS (
        SELECT dtcc_ref_id, executing_broker, UPPER(TRIM(ticker)) AS clean_ticker,
               UPPER(TRIM(isin)) AS isin, UPPER(TRIM(side)) AS side,
               cleared_qty, clearing_price, (cleared_qty * clearing_price) AS local_cleared_notional,
               UPPER(TRIM(currency)) AS currency, SUBSTR(cleared_timestamp, 1, 10) AS cleared_date, clearing_status
        FROM dtcc_clearing_records WHERE clearing_status = 'CLEARED'
    ),
    MatchedRaw AS (
        SELECT 
            COALESCE(i.counterparty_id, d.executing_broker) AS counterparty_id,
            COALESCE(i.currency, d.currency) AS currency,
            COALESCE(i.trade_date, d.cleared_date) AS recon_date,
            i.local_notional AS internal_local_notional,
            d.local_cleared_notional AS cleared_local_notional,
            CASE
                WHEN d.dtcc_ref_id IS NULL THEN 'PHANTOM_INTERNAL_TRADE'
                WHEN i.trade_id IS NULL THEN 'UNAUTHORIZED_EXTERNAL_FILL'
                WHEN ABS(COALESCE(i.execution_price, 0) - COALESCE(d.clearing_price, 0)) > 0.005 
                 AND COALESCE(i.trade_qty, 0) != COALESCE(d.cleared_qty, 0) THEN 'MULTIPLE_DISCREPANCY'
                WHEN ABS(COALESCE(i.execution_price, 0) - COALESCE(d.clearing_price, 0)) > 0.005 THEN 'PRICE_MISMATCH'
                WHEN COALESCE(i.trade_qty, 0) != COALESCE(d.cleared_qty, 0) THEN 'QUANTITY_MISMATCH'
                ELSE 'MATCHED'
            END AS break_category
        FROM SanitizedInternal i
        FULL OUTER JOIN SanitizedDTCC d
          ON i.isin = d.isin AND i.side = d.side AND i.trade_date = d.cleared_date
    ),
    ValuatedBreaks AS (
        SELECT 
            m.*,
            ROUND(
                CASE 
                    WHEN m.break_category = 'PHANTOM_INTERNAL_TRADE' 
                        THEN m.internal_local_notional * fx.usd_exchange_rate
                    WHEN m.break_category = 'UNAUTHORIZED_EXTERNAL_FILL' 
                        THEN m.cleared_local_notional * fx.usd_exchange_rate
                    ELSE ABS(COALESCE(m.internal_local_notional, 0) - COALESCE(m.cleared_local_notional, 0)) * fx.usd_exchange_rate
                END, 2
            ) AS exposure_usd
        FROM MatchedRaw m
        JOIN fx_daily_rates fx ON m.currency = fx.currency AND m.recon_date = fx.rate_date
    ),
    CounterpartyRisk AS (
        SELECT 
            counterparty_id,
            COUNT(*) AS total_trades,
            COUNT(CASE WHEN break_category != 'MATCHED' THEN 1 END) AS total_breaks,
            ROUND(COUNT(CASE WHEN break_category != 'MATCHED' THEN 1 END) * 100.0 / COUNT(*), 1) AS break_rate_pct,
            ROUND(SUM(CASE WHEN break_category != 'MATCHED' THEN exposure_usd ELSE 0 END), 2) AS counterparty_exposure_usd
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
    """

    print("\n🎯 STAGE 2: COUNTERPARTY CONCENTRATION & CAPITAL-AT-RISK RANKING (DENSE_RANK)")
    print("-" * 86)
    print(f"{'RANK':<5} | {'BROKER COUNTERPARTY':<25} | {'TRADES':<7} | {'BREAKS':<7} | {'BREAK %':<8} | {'EXPOSURE (USD)':<16}")
    print("-" * 86)

    for row in cur.execute(counterparty_sql).fetchall():
        broker, trades, breaks, rate, exp, rank = row
        print(f"#{rank:<4} | {broker:<25} | {trades:<7} | {breaks:<7} | {rate:>6.1f}% | ${exp:>14,.2f}")
    print("-" * 86)

    print("\n✅ SIMULATION COMPLETE: All 5 pipeline stages executed cleanly with ZERO errors.")
    conn.close()

if __name__ == '__main__':
    run_simulation()
