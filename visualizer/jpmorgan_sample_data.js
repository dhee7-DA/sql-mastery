/**
 * JPMorgan Chase 30-Day Quantitative Risk & Treasury Analyst Simulator
 * Real Sample Tables, Institutional DDL & Mock Ledger Datasets (Days 01 - 30)
 */

(function(window) {
  'use strict';

  const JPMORGAN_SAMPLE_TABLES = {
    1: {
      tableName: "nostro_vostro_ledger",
      description: "Global correspondent bank closing balances and reconciliation status.",
      columns: ["entry_id", "correspondent_bank", "account_type", "currency", "closing_balance", "recon_status"],
      rows: [
        [101, "BNP Paribas Paris", "NOSTRO", "EUR", 42500000.00, "MATCHED"],
        [102, "Deutsche Bank Frankfurt", "NOSTRO", "EUR", -1280000.50, "UNRECONCILED"],
        [103, "Barclays Bank London", "NOSTRO", "GBP", 89400000.00, "MATCHED"],
        [104, "MUFG Bank Tokyo", "VOSTRO", "JPY", 12500000000.00, "MATCHED"],
        [105, "UBS AG Zurich", "NOSTRO", "CHF", -3400000.00, "UNRECONCILED"],
        [106, "Santander Madrid", "NOSTRO", "EUR", 15200000.00, "MATCHED"],
        [107, "Royal Bank of Canada Toronto", "VOSTRO", "CAD", 67000000.00, "MATCHED"]
      ]
    },
    2: {
      tableName: "swift_mt103_messages",
      description: "SWIFT customer transfers, UETR tracking hashes, and settlement statuses.",
      columns: ["message_id", "uetr", "sender_bic", "receiver_bic", "currency", "amount_usd", "status"],
      rows: [
        ["MSG-88410", "c3b9e4a1-001", "CHASUS33XXX", "BNPAFRPPXXX", "USD", 5400000.00, "SETTLED"],
        ["MSG-88411", "d7a1f2c4-002", "DEUTDEDDXXX", "CHASUS33XXX", "EUR", 1280000.50, "FAILED"],
        ["MSG-88412", "e8b2c3d5-003", "CHASUS33XXX", "BARCGB22XXX", "GBP", 3100000.00, "SETTLED"],
        ["MSG-88413", "f9c3d4e6-004", "UBSWCHZHXXX", "CHASUS33XXX", "CHF", 940000.00, "PENDING"],
        ["MSG-88414", "a1d4e5f7-005", "CHASUS33XXX", "BOTKJPJTXXX", "USD", 25000000.00, "SETTLED"]
      ]
    },
    3: {
      tableName: "liquidity_reserves",
      description: "Central bank reserves, asset classifications, and collateral encumbrance flags.",
      columns: ["reserve_id", "entity_name", "central_bank", "asset_type", "amount_usd", "is_encumbered"],
      rows: [
        [201, "JPMorgan Chase Bank N.A.", "Federal Reserve Bank of NY", "CASH_DEPOSIT", 145000000000.00, false],
        [202, "J.P. Morgan SE (Frankfurt)", "European Central Bank", "CASH_DEPOSIT", 38000000000.00, false],
        [203, "J.P. Morgan Securities LLC", "Bank of England", "TREASURY_BOND", 22000000000.00, true],
        [204, "JPMorgan Chase Bank London", "Bank of England", "CASH_DEPOSIT", 19500000000.00, false],
        [205, "J.P. Morgan Securities Asia", "Bank of Japan", "JGB_GOVERNMENT", 12000000000.00, false]
      ]
    },
    4: {
      tableName: "overnight_repo_facilities",
      description: "Securities financing, repo collateral haircut discounts, and interest spreads.",
      columns: ["trade_id", "counterparty_name", "collateral_type", "haircut_pct", "principal_usd", "interest_rate_bps"],
      rows: [
        ["REPO-901", "BlackRock Liquidity Fund", "US_TREASURY_NOTE", 2.00, 500000000.00, 532],
        ["REPO-902", "Vanguard Treasury Reserve", "AGENCY_MBS", 5.00, 350000000.00, 545],
        ["REPO-903", "Fidelity Cash Central", "US_TREASURY_BILL", 1.50, 800000000.00, 528],
        ["REPO-904", "State Street Institutional", "CORPORATE_AAA", 8.00, 200000000.00, 565],
        ["REPO-905", "PIMCO Short-Term Fund", "US_TREASURY_NOTE", 2.00, 450000000.00, 534]
      ]
    },
    5: {
      tableName: "fx_spot_cross_rates",
      description: "G10 currency spot bid/ask quotes and effective execution dates.",
      columns: ["rate_id", "base_currency", "quote_currency", "bid_rate", "ask_rate", "effective_date"],
      rows: [
        [1, "EUR", "USD", 1.0845, 1.0847, "2026-10-04"],
        [2, "GBP", "USD", 1.3020, 1.3023, "2026-10-04"],
        [3, "USD", "JPY", 148.65, 148.68, "2026-10-04"],
        [4, "USD", "CHF", 0.8640, 0.8643, "2026-10-04"],
        [5, "USD", "CAD", 1.3580, 1.3584, "2026-10-04"]
      ]
    },
    6: {
      tableName: "interbank_payments",
      description: "Branch timezones and cross-border settlement local timestamps.",
      columns: ["payment_id", "originating_branch", "branch_tz", "local_timestamp", "amount_usd"],
      rows: [
        ["PAY-110", "London-CanaryWharf", "+01:00", "2026-10-03 22:04:15", 4500000.00],
        ["PAY-111", "Tokyo-Chiyoda", "+09:00", "2026-10-04 06:15:30", 12800000.00],
        ["PAY-112", "London-CanaryWharf", "+01:00", "2026-10-03 22:28:40", 8200000.00],
        ["PAY-113", "NewYork-ParkAve", "-04:00", "2026-10-03 17:10:05", 21000000.00],
        ["PAY-114", "Singapore-MarinaBay", "+08:00", "2026-10-04 05:22:18", 3400000.00]
      ]
    },
    7: {
      tableName: "cash_reserves",
      description: "Corporate cash positions across asset classes and denomination currencies.",
      columns: ["reserve_id", "asset_class", "currency", "amount_usd"],
      rows: [
        [301, "Cash & Central Bank", "USD", 185000000000.00],
        [302, "Cash & Central Bank", "EUR", 42000000000.00],
        [303, "Government Bonds", "USD", 260000000000.00],
        [304, "Government Bonds", "GBP", 35000000000.00],
        [305, "Money Market Instruments", "USD", 85000000000.00],
        [306, "Money Market Instruments", "JPY", 28000000000.00]
      ]
    },
    8: {
      tableName: "aml_cash_deposits",
      description: "FinCEN Bank Secrecy Act cash transaction surveillance ledger.",
      columns: ["deposit_id", "account_number", "customer_name", "amount_usd", "deposit_time"],
      rows: [
        [1001, "ACCT-99201", "Apex Logistics LLC", 9500.00, "2026-10-02 10:14:00"],
        [1002, "ACCT-99201", "Apex Logistics LLC", 9800.00, "2026-10-02 15:45:00"],
        [1003, "ACCT-99201", "Apex Logistics LLC", 9200.00, "2026-10-03 09:20:00"],
        [1004, "ACCT-88142", "Midtown Bistro Corp", 4200.00, "2026-10-02 14:00:00"],
        [1005, "ACCT-55319", "Global Traders Ltd", 9950.00, "2026-10-01 11:30:00"]
      ]
    },
    9: {
      tableName: "sar_suspicious_accounts",
      description: "Automated SAR threshold indicators and high-risk jurisdiction flags.",
      columns: ["alert_id", "account_number", "tx_count_24h", "total_transferred_usd", "high_risk_jurisdiction"],
      rows: [
        ["SAR-401", "ACCT-99201", 14, 285000.00, false],
        ["SAR-402", "ACCT-11082", 28, 1420000.00, true],
        ["SAR-403", "ACCT-44910", 3, 45000.00, false],
        ["SAR-404", "ACCT-77291", 42, 3890000.00, true],
        ["SAR-405", "ACCT-33120", 8, 92000.00, false]
      ]
    },
    10: {
      tableName: "rapid_fund_dissipation",
      description: "Pass-through account detection: high inflow immediately followed by rapid wire outflow.",
      columns: ["account_id", "inflow_usd", "outflow_usd", "inflow_ts", "outflow_ts", "dwell_minutes"],
      rows: [
        ["ACCT-77291", 500000.00, 498000.00, "2026-10-03 09:05:00", "2026-10-03 09:14:00", 9],
        ["ACCT-11082", 1200000.00, 1195000.00, "2026-10-03 10:20:00", "2026-10-03 10:38:00", 18],
        ["ACCT-44910", 250000.00, 80000.00, "2026-10-02 08:00:00", "2026-10-03 14:00:00", 1800],
        ["ACCT-66381", 850000.00, 845000.00, "2026-10-03 13:10:00", "2026-10-03 13:22:00", 12]
      ]
    },
    11: {
      tableName: "ofac_sanctions_watch",
      description: "OFAC Specially Designated Nationals (SDN) fuzzy match and country screening.",
      columns: ["entity_id", "party_name", "country_code", "match_score", "is_blocked"],
      rows: [
        ["OFAC-01", "Al-Baraka Energy Trading", "IR", 98.5, true],
        ["OFAC-02", "North Star Shipping FZE", "AE", 89.2, true],
        ["OFAC-03", "PetroCaspian Logistics", "RU", 94.0, true],
        ["OFAC-04", "Nordic Maritime AS", "NO", 42.1, false],
        ["OFAC-05", "Eastern Horizon Mining", "KP", 99.8, true]
      ]
    },
    12: {
      tableName: "wire_velocity_surveillance",
      description: "Short-burst wire counts and cumulative dollar volume per 60-minute window.",
      columns: ["tx_id", "sender_account", "receiver_account", "wire_amount_usd", "tx_timestamp"],
      rows: [
        ["TX-901", "ACCT-11082", "OFFSHORE-01", 98000.00, "2026-10-03 14:02:10"],
        ["TX-902", "ACCT-11082", "OFFSHORE-02", 95000.00, "2026-10-03 14:08:45"],
        ["TX-903", "ACCT-11082", "OFFSHORE-03", 97500.00, "2026-10-03 14:15:30"],
        ["TX-904", "ACCT-88142", "VENDOR-99", 12000.00, "2026-10-03 11:30:00"],
        ["TX-905", "ACCT-11082", "OFFSHORE-04", 99000.00, "2026-10-03 14:24:12"]
      ]
    },
    13: {
      tableName: "mule_account_clusters",
      description: "Digital fingerprint, IP address, and browser hash correlation for money mule syndicates.",
      columns: ["account_number", "ip_address", "device_hash", "creation_date", "status"],
      rows: [
        ["ACCT-401", "198.51.100.45", "a8f3b2c1", "2026-09-15", "FLAGGED"],
        ["ACCT-402", "198.51.100.45", "a8f3b2c1", "2026-09-16", "FLAGGED"],
        ["ACCT-403", "198.51.100.45", "a8f3b2c1", "2026-09-18", "FLAGGED"],
        ["ACCT-501", "203.0.113.88", "e5d4c3b2", "2026-08-10", "ACTIVE"],
        ["ACCT-404", "198.51.100.45", "a8f3b2c1", "2026-09-20", "FLAGGED"]
      ]
    },
    14: {
      tableName: "fincen_ctr_thresholds",
      description: "Aggregated 24-hour cash movements evaluated against the $10,000 CTR filing threshold.",
      columns: ["batch_id", "customer_id", "aggregate_cash_usd", "reporting_date", "ctr_filed"],
      rows: [
        ["CTR-201", "CUST-8812", 28500.00, "2026-10-03", true],
        ["CTR-202", "CUST-9920", 9850.00, "2026-10-03", false],
        ["CTR-203", "CUST-4419", 45000.00, "2026-10-03", true],
        ["CTR-204", "CUST-3310", 8200.00, "2026-10-03", false],
        ["CTR-205", "CUST-7729", 114000.00, "2026-10-03", true]
      ]
    },
    15: {
      tableName: "portfolio_nav_drift",
      description: "Target asset allocation versus actual drifted weights in Private Banking portfolios.",
      columns: ["portfolio_id", "asset_class", "target_weight", "current_weight", "drift_pct"],
      rows: [
        ["PORT-101", "US Equities", 0.40, 0.48, 0.08],
        ["PORT-101", "Fixed Income", 0.35, 0.28, -0.07],
        ["PORT-101", "Alternative Assets", 0.15, 0.18, 0.03],
        ["PORT-101", "Cash Reserves", 0.10, 0.06, -0.04],
        ["PORT-102", "US Equities", 0.50, 0.51, 0.01]
      ]
    },
    16: {
      tableName: "hnw_client_holdings",
      description: "High-Net-Worth individual securities holdings and valuation.",
      columns: ["holding_id", "client_id", "ticker", "shares_held", "market_price_usd", "market_value_usd"],
      rows: [
        ["HOLD-01", "HNW-991", "AAPL", 15000, 228.50, 3427500.00],
        ["HOLD-02", "HNW-991", "MSFT", 8500, 415.20, 3529200.00],
        ["HOLD-03", "HNW-991", "NVDA", 12000, 122.40, 1468800.00],
        ["HOLD-04", "HNW-884", "BRK.B", 6000, 452.10, 2712600.00],
        ["HOLD-05", "HNW-884", "JPM", 18000, 218.75, 3937500.00]
      ]
    },
    17: {
      tableName: "equity_portfolio_betas",
      description: "Market correlation and equity beta across sector exposures.",
      columns: ["position_id", "ticker", "sector", "beta", "market_value_usd"],
      rows: [
        ["POS-301", "NVDA", "Technology", 1.85, 45000000.00],
        ["POS-302", "JNJ", "Healthcare", 0.62, 38000000.00],
        ["POS-303", "XOM", "Energy", 0.88, 29000000.00],
        ["POS-304", "AMZN", "Consumer Discretionary", 1.42, 52000000.00],
        ["POS-305", "PG", "Consumer Staples", 0.55, 21000000.00]
      ]
    },
    18: {
      tableName: "dividend_accruals_ledger",
      description: "Ex-dividend date corporate action entitlements and client ledger crediting.",
      columns: ["accrual_id", "client_id", "ticker", "dividend_per_share", "shares_owned", "net_dividend_usd"],
      rows: [
        ["DIV-101", "HNW-991", "AAPL", 0.25, 15000, 3750.00],
        ["DIV-102", "HNW-884", "JPM", 1.15, 18000, 20700.00],
        ["DIV-103", "HNW-772", "MSFT", 0.75, 22000, 16500.00],
        ["DIV-104", "HNW-991", "NVDA", 0.01, 12000, 120.00]
      ]
    },
    19: {
      tableName: "tier_management_fees",
      description: "AUM fee schedules, basis point fee schedules, and discount thresholds.",
      columns: ["fee_id", "client_tier", "min_aum_usd", "max_aum_usd", "fee_bps"],
      rows: [
        [1, "Silver Private Client", 1000000.00, 5000000.00, 75],
        [2, "Gold Private Client", 5000000.01, 25000000.00, 60],
        [3, "Platinum Family Office", 25000000.01, 100000000.00, 45],
        [4, "Ultra HNW Institutional", 100000000.01, 999999999999.00, 30]
      ]
    },
    20: {
      tableName: "private_banking_rebalancing",
      description: "Model portfolio deviations, generated buy/sell orders, and execution fills.",
      columns: ["order_id", "account_id", "ticker", "order_side", "target_shares", "execution_status"],
      rows: [
        ["ORD-701", "PORT-101", "TLT", "BUY", 4500, "FILLED"],
        ["ORD-702", "PORT-101", "SPY", "SELL", 1200, "FILLED"],
        ["ORD-703", "PORT-102", "QQQ", "SELL", 800, "PENDING"],
        ["ORD-704", "PORT-103", "GLD", "BUY", 1500, "FILLED"]
      ]
    },
    21: {
      tableName: "wealth_advisors",
      description: "Wealth management executive advisors and regional production.",
      columns: ["advisor_id", "advisor_name", "office_location", "total_clients", "total_aum_usd", "annual_fee_bps"],
      rows: [
        ["ADV-101", "Victoria Sterling", "New York - Madison Ave", 34, 485000000.00, 65],
        ["ADV-102", "Arthur Pendelton", "Palm Beach - Worth Ave", 28, 620000000.00, 58],
        ["ADV-103", "Elena Rostova", "Geneva - Rue du Rhone", 19, 390000000.00, 72],
        ["ADV-104", "Charles Montgomery", "San Francisco - Market St", 41, 540000000.00, 62]
      ]
    },
    22: {
      tableName: "swap_portfolio_pnl",
      description: "Daily historical simulated PnL distributions for 99% Value at Risk (VaR) calculations.",
      columns: ["sim_id", "trading_desk", "historical_date", "daily_pnl_usd"],
      rows: [
        [1, "Rates & Swaps Desk", "2026-01-15", -14250000.00],
        [2, "Rates & Swaps Desk", "2026-01-16", -11800000.00],
        [3, "Rates & Swaps Desk", "2026-01-17", -8900000.00],
        [4, "Rates & Swaps Desk", "2026-01-18", -4200000.00],
        [5, "Rates & Swaps Desk", "2026-01-19", 1200000.00],
        [6, "Rates & Swaps Desk", "2026-01-20", 5400000.00],
        [7, "Rates & Swaps Desk", "2026-01-21", 8900000.00]
      ]
    },
    23: {
      tableName: "options_book_sensitivities",
      description: "Taylor series Greek approximations (Delta and Gamma) under market shocks.",
      columns: ["position_id", "underlying_ticker", "contract_type", "delta_usd", "gamma_usd"],
      rows: [
        ["OPT-001", "SPX", "PUT", -185000000.00, 42000000.00],
        ["OPT-002", "SPX", "CALL", 240000000.00, 38000000.00],
        ["OPT-003", "NDX", "PUT", -95000000.00, 19500000.00],
        ["OPT-004", "NDX", "CALL", 110000000.00, 22000000.00],
        ["OPT-005", "RUT", "PUT", -42000000.00, 8500000.00]
      ]
    },
    24: {
      tableName: "treasury_liquidity_holdings",
      description: "Basel III High-Quality Liquid Assets (HQLA) with regulatory haircuts.",
      columns: ["asset_id", "asset_description", "asset_level", "market_value_usd", "is_encumbered"],
      rows: [
        ["HQLA-01", "US Treasury 10Y Notes", "Level 1", 380000000000.00, false],
        ["HQLA-02", "Fed Reserve Cash Deposits", "Level 1", 145000000000.00, false],
        ["HQLA-03", "Fannie Mae Agency Debt", "Level 2A", 95000000000.00, false],
        ["HQLA-04", "AAA Sovereign Eurobonds", "Level 1", 62000000000.00, false],
        ["HQLA-05", "Investment Grade Corporates", "Level 2B", 42000000000.00, false],
        ["HQLA-06", "Pledged Repo Collateral", "Level 1", 85000000000.00, true]
      ]
    },
    25: {
      tableName: "counterparties",
      description: "ISDA Master Agreement bilateral netting and collateral margin thresholds.",
      columns: ["counterparty_id", "legal_name", "credit_rating", "collateral_posted_usd", "margin_threshold_usd", "net_mtm_usd"],
      rows: [
        ["CP-101", "Highland Capital Master Fund", "BBB", 45000000.00, 10000000.00, 117000000.00],
        ["CP-102", "Citadel Global Fixed Income", "AA-", 180000000.00, 50000000.00, 195000000.00],
        ["CP-103", "Bridgewater Pure Alpha", "A+", 220000000.00, 40000000.00, 210000000.00],
        ["CP-104", "Tudor Quantum Investments", "A-", 60000000.00, 15000000.00, 92000000.00]
      ]
    },
    26: {
      tableName: "dma_algo_orders",
      description: "Direct Market Access microsecond order lifecycles and cancel latencies.",
      columns: ["order_id", "client_mpid", "ticker_symbol", "order_qty", "limit_price", "placed_at_ts", "cancelled_at_ts", "duration_us"],
      rows: [
        ["ORD-8810", "FLOW", "AAPL", 500, 228.4500, "2026-10-04 09:30:00.100200", "2026-10-04 09:30:00.101850", 1650],
        ["ORD-8811", "FLOW", "AAPL", 500, 228.4600, "2026-10-04 09:30:00.102100", "2026-10-04 09:30:00.104200", 2100],
        ["ORD-8812", "RETL", "MSFT", 100, 415.0000, "2026-10-04 09:30:01.000000", null, null],
        ["ORD-8813", "FLOW", "NVDA", 1000, 122.5000, "2026-10-04 09:30:00.200150", "2026-10-04 09:30:00.203950", 3800]
      ]
    },
    27: {
      tableName: "fx_cross_currency_basis",
      description: "Covered Interest Parity (CIP) deviations and 30-day basis swap spreads in bps.",
      columns: ["quote_id", "currency_pair", "quote_date", "basis_spread_bps"],
      rows: [
        [1, "EUR/USD", "2026-09-01", -22.50],
        [2, "EUR/USD", "2026-09-15", -24.10],
        [3, "EUR/USD", "2026-10-01", -23.80],
        [4, "EUR/USD", "2026-10-03", -48.20],
        [5, "GBP/USD", "2026-10-03", -14.50]
      ]
    },
    28: {
      tableName: "ccar_loan_portfolio",
      description: "Federal Reserve Comprehensive Capital Analysis & Review (CCAR) stress parameters.",
      columns: ["loan_id", "asset_class", "exposure_at_default_usd", "stressed_pd", "recovery_rate"],
      rows: [
        ["CRE-901", "Commercial Real Estate", 48000000000.00, 0.0850, 0.4000],
        ["MTG-102", "Residential Mortgages", 125000000000.00, 0.0320, 0.6500],
        ["CORP-301", "Corporate Bonds", 82000000000.00, 0.0410, 0.5000],
        ["CARD-88", "Credit Cards", 35000000000.00, 0.0980, 0.1500]
      ]
    },
    29: {
      tableName: "fedwire_settlement_ledger",
      description: "Intraday real-time gross settlement cash flows at the Federal Reserve Bank of NY.",
      columns: ["wire_id", "wire_time", "sender_bank", "receiver_bank", "net_cash_flow_usd"],
      rows: [
        ["FEDW-001", "09:15:00", "Bank of America", "JPMorgan Chase", 12500000000.00],
        ["FEDW-002", "11:30:00", "JPMorgan Chase", "Citigroup", -18400000000.00],
        ["FEDW-003", "13:45:00", "Wells Fargo", "JPMorgan Chase", 8900000000.00],
        ["FEDW-004", "14:15:00", "JPMorgan Chase", "Goldman Sachs", -21000000000.00],
        ["FEDW-005", "15:30:00", "Federal Reserve Repo", "JPMorgan Chase", 25000000000.00]
      ]
    },
    30: {
      tableName: "jpmorgan_divisions_capital",
      description: "Enterprise Common Equity Tier 1 (CET1) capital and Risk-Weighted Assets (RWA).",
      columns: ["division_id", "division_name", "cet1_capital_usd", "risk_weighted_assets_usd"],
      rows: [
        ["CIB", "Corporate & Investment Bank", 118000000000.00, 785000000000.00],
        ["CCB", "Consumer & Community Banking", 85000000000.00, 540000000000.00],
        ["AWM", "Asset & Wealth Management", 24000000000.00, 160000000000.00],
        ["CB", "Commercial Banking", 38000000000.00, 265000000000.00]
      ]
    }
  };

  window.JPMORGAN_SAMPLE_TABLES = JPMORGAN_SAMPLE_TABLES;

})(typeof window !== 'undefined' ? window : global);
