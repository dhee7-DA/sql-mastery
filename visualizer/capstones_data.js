// =============================================================================
// CAPSTONE DATA VAULT: 10 GUIDED REAL-WORLD FINANCIAL & DATA ANALYTICS PROJECTS
// 5 Top Hiring Domains x 2 Projects each with Progressive Steps & Topic Tags
// =============================================================================

window.CAPSTONES_DATA = [
  // ---------------------------------------------------------------------------
  // DOMAIN 1: INVESTMENT BANKING & ASSET MANAGEMENT
  // ---------------------------------------------------------------------------
  {
    id: "capstone_ib_01",
    domain: "Investment Banking & Asset Management",
    domainIcon: "🏦",
    domainColor: "#38bdf8",
    title: "Multi-Asset Trade Settlement, Custody Breaks & Prime Broker Reconciliation",
    subtitle: "Reconcile internal trade blotters against DTCC clearing statements, catch settlement breaks, and compute capital-at-risk.",
    difficulty: "Advanced",
    estimatedTime: "45 mins",
    overview: "In global investment banks, failure to reconcile internal trade executions against clearing custodian records leads to millions in regulatory fines and counterparty exposure. In this capstone, you will construct an end-to-end reconciliation pipeline that cleans raw blotters, pairs executions via dual-sided joins, flags settlement breaks, harmonizes foreign currencies with historical rates, and produces an executive capital-at-risk summary.",
    steps: [
      {
        stepNumber: 1,
        title: "Trade Blotter Sanitization & Timestamp Normalization",
        businessBrief: "Our internal trade blotter captures messy trade records from trading desks with trailing ticker symbols, unstandardized currency strings, and uncast timestamps. Before matching with DTCC, sanitize the dataset.",
        prerequisites: [
          {
            sectionKey: "section1",
            label: "String Functions & Datetime Casting",
            tip: "Master TRIM(), UPPER(), and CAST() as TIMESTAMPTZ to clean raw string feeds."
          },
          {
            sectionKey: "section2",
            label: "WHERE Predicates & Null Filtering",
            tip: "Filter out canceled test orders with status != 'TEST' AND trade_amount > 0."
          }
        ],
        bloopsAdvice: "Welcome to Wall Street clearing operations! Trailing whitespace and lowercase ISO currency codes will cause your joins to fail silently. Let's sanitize the strings and cast timestamps first!",
        schemaSnippet: "RawTradeBlotter(trade_id VARCHAR, desk_code VARCHAR, raw_ticker VARCHAR, currency_code VARCHAR, trade_qty NUMERIC, execution_price NUMERIC, raw_timestamp VARCHAR, status VARCHAR)",
        sampleData: [
          { trade_id: "T-1001", raw_ticker: " AAPL.US ", currency_code: "usd", trade_qty: "500", execution_price: "185.50", raw_timestamp: "2026-03-15 09:30:12", status: "FILLED" },
          { trade_id: "T-1002", raw_ticker: "MSFT", currency_code: "USD", trade_qty: "200", execution_price: "420.00", raw_timestamp: "2026-03-15 09:31:05", status: "FILLED" },
          { trade_id: "T-1003", raw_ticker: "NVDA ", currency_code: "eur", trade_qty: "100", execution_price: "890.25", raw_timestamp: "2026-03-15 09:32:00", status: "TEST" }
        ],
        targetQuery: "SELECT\n  trade_id,\n  TRIM(raw_ticker) AS ticker,\n  UPPER(TRIM(currency_code)) AS currency,\n  trade_qty,\n  execution_price,\n  (trade_qty * execution_price) AS notional_value,\n  CAST(raw_timestamp AS TIMESTAMPTZ) AS trade_time\nFROM RawTradeBlotter\nWHERE status = 'FILLED'\n  AND trade_qty > 0;",
        template: [
          { text: "SELECT\n  trade_id,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ TRIM FUNCTION ]" },
          { text: "(raw_ticker) AS ticker,\n  UPPER(TRIM(currency_code)) AS currency,\n  trade_qty,\n  execution_price,\n  (trade_qty * execution_price) AS notional_value,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ CAST EXPRESSION ]" },
          { text: "(raw_timestamp AS TIMESTAMPTZ) AS trade_time\nFROM RawTradeBlotter\nWHERE status = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ STATUS FILTER ]" },
          { text: "\n  AND trade_qty > 0;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "TRIM", options: ["TRIM", "STRIP", "CLEAN", "SUBSTRING"] },
          slot2: { correct: "CAST", options: ["CAST", "CONVERT_TZ", "PARSE", "TO_TIMESTAMP"] },
          slot3: { correct: "'FILLED'", options: ["'FILLED'", "'PENDING'", "'TEST'", "'ALL'"] }
        },
        expectedColumns: ["trade_id", "ticker", "currency", "trade_qty", "execution_price", "notional_value", "trade_time"]
      },
      {
        stepNumber: 2,
        title: "Dual-Sided Position Pairing via FULL OUTER JOIN",
        businessBrief: "We must pair our sanitized internal trades against the DTCC custodian clearing file. Trades may exist only in our system (missing clearing confirmation) or only on DTCC (unbooked broker trades). We cannot drop either side!",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "FULL OUTER JOIN & Domain Preservation",
            tip: "Use FULL OUTER JOIN to retain rows from both tables when trade records might be missing on either side."
          },
          {
            sectionKey: "section1",
            label: "COALESCE & Key Reconciliation",
            tip: "Use COALESCE(internal.trade_id, dtcc.trade_ref) to ensure your primary output key is never NULL."
          }
        ],
        bloopsAdvice: "A standard INNER JOIN would hide trades missing on DTCC—that's how settlement breaks slip through! We must use FULL OUTER JOIN with COALESCE to keep all records in view.",
        schemaSnippet: "InternalTrades(trade_id PK, ticker, notional_value, trade_time), CustodianFeed(trade_ref PK, ext_ticker, settled_amount, settlement_status)",
        sampleData: [
          { trade_id: "T-1001", notional_value: 92750.00, trade_ref: "T-1001", settled_amount: 92750.00, settlement_status: "MATCHED" },
          { trade_id: "T-1002", notional_value: 84000.00, trade_ref: null, settled_amount: null, settlement_status: null },
          { trade_id: null, notional_value: null, trade_ref: "T-9999", settled_amount: 50000.00, settlement_status: "UNBOOKED" }
        ],
        targetQuery: "SELECT\n  COALESCE(i.trade_id, c.trade_ref) AS matched_trade_id,\n  i.ticker AS internal_ticker,\n  c.ext_ticker AS custodian_ticker,\n  i.notional_value AS internal_amount,\n  c.settled_amount AS custodian_amount\nFROM InternalTrades i\nFULL OUTER JOIN CustodianFeed c\n  ON i.trade_id = c.trade_ref;",
        template: [
          { text: "SELECT\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ KEY RESOLVER ]" },
          { text: "(i.trade_id, c.trade_ref) AS matched_trade_id,\n  i.ticker AS internal_ticker,\n  c.ext_ticker AS custodian_ticker,\n  i.notional_value AS internal_amount,\n  c.settled_amount AS custodian_amount\nFROM InternalTrades i\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ JOIN TYPE ]" },
          { text: " CustodianFeed c\n  ON i.trade_id = c.trade_ref;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "COALESCE", options: ["COALESCE", "NULLIF", "IFNULL_PAIR", "CONCAT"] },
          slot2: { correct: "FULL OUTER JOIN", options: ["FULL OUTER JOIN", "INNER JOIN", "LEFT JOIN", "CROSS JOIN"] }
        },
        expectedColumns: ["matched_trade_id", "internal_ticker", "custodian_ticker", "internal_amount", "custodian_amount"]
      },
      {
        stepNumber: 3,
        title: "Settlement Break Classification & Tolerance Tagging",
        businessBrief: "Operations teams cannot manually inspect thousands of matched rows. Classify each paired record into one of 4 standardized audit statuses: 'PERFECT_MATCH', 'VALUE_BREAK' (> $0.02 delta), 'UNBOOKED_ON_DTCC', or 'UNBOOKED_INTERNAL'.",
        prerequisites: [
          {
            sectionKey: "section8",
            label: "CASE WHEN & Complex Conditional Logic",
            tip: "Use multi-branch CASE WHEN to evaluate NULL states and absolute mathematical differences."
          },
          {
            sectionKey: "section1",
            label: "ABS() & Mathematical Tolerance",
            tip: "Use ABS(internal_amount - custodian_amount) > 0.02 to handle float/rounding precision."
          }
        ],
        bloopsAdvice: "A difference of 1 cent is usually rounding noise, but a $100,000 difference is a trade break! Build a clean CASE WHEN hierarchy starting with the NULL checks first.",
        schemaSnippet: "PairedTrades(matched_trade_id, internal_amount, custodian_amount)",
        targetQuery: "SELECT\n  matched_trade_id,\n  internal_amount,\n  custodian_amount,\n  CASE\n    WHEN custodian_amount IS NULL THEN 'UNBOOKED_ON_DTCC'\n    WHEN internal_amount IS NULL THEN 'UNBOOKED_INTERNAL'\n    WHEN ABS(internal_amount - custodian_amount) > 0.02 THEN 'VALUE_BREAK'\n    ELSE 'PERFECT_MATCH'\n  END AS audit_status\nFROM PairedTrades;",
        template: [
          { text: "SELECT\n  matched_trade_id,\n  internal_amount,\n  custodian_amount,\n  CASE\n    WHEN custodian_amount ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ NULL CHECK ]" },
          { text: " THEN 'UNBOOKED_ON_DTCC'\n    WHEN internal_amount IS NULL THEN 'UNBOOKED_INTERNAL'\n    WHEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ ABS DELTA EXPR ]" },
          { text: "(internal_amount - custodian_amount) > 0.02 THEN 'VALUE_BREAK'\n    ELSE 'PERFECT_MATCH'\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ END KEYWORD ]" },
          { text: " AS audit_status\nFROM PairedTrades;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "IS NULL", options: ["IS NULL", "= NULL", "IS EMPTY", "== NULL"] },
          slot2: { correct: "ABS", options: ["ABS", "FLOOR", "CEIL", "ROUND"] },
          slot3: { correct: "END", options: ["END", "FINISH", "DONE", "ESAC"] }
        },
        expectedColumns: ["matched_trade_id", "internal_amount", "custodian_amount", "audit_status"]
      },
      {
        stepNumber: 4,
        title: "Historical As-Of FX Harmonization via Non-Equi Joins",
        businessBrief: "Trades were executed in multiple currencies (EUR, GBP, JPY), but our balance sheet is denominated in USD. Convert all broken trade values into USD using the effective daily exchange rate matching the trade date.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "NON-EQUI JOIN & Range Matching",
            tip: "Join ExchangeRates where rate_currency = trade_currency AND trade_date BETWEEN valid_from AND valid_to."
          },
          {
            sectionKey: "section6",
            label: "Temporal Offsets (Pre-Window Readiness)",
            tip: "Understand how point-in-time rates align before applying sliding window lookups."
          }
        ],
        bloopsAdvice: "Currency rates change every day! If you join on today's rate instead of the trade date's historical rate, your P&L will be completely distorted. Use a non-equi join on effective dates.",
        schemaSnippet: "ClassifiedBreaks(matched_trade_id, currency, raw_exposure, trade_date), FXRates(currency_code, fx_rate_to_usd, valid_from, valid_to)",
        targetQuery: "SELECT\n  b.matched_trade_id,\n  b.currency,\n  b.raw_exposure,\n  fx.fx_rate_to_usd,\n  ROUND(b.raw_exposure * fx.fx_rate_to_usd, 2) AS exposure_usd\nFROM ClassifiedBreaks b\nJOIN FXRates fx\n  ON b.currency = fx.currency_code\n AND b.trade_date >= fx.valid_from\n AND b.trade_date <= fx.valid_to\nWHERE b.audit_status != 'PERFECT_MATCH';",
        template: [
          { text: "SELECT\n  b.matched_trade_id,\n  b.currency,\n  b.raw_exposure,\n  fx.fx_rate_to_usd,\n  ROUND(b.raw_exposure * fx.fx_rate_to_usd, 2) AS exposure_usd\nFROM ClassifiedBreaks b\nJOIN FXRates fx\n  ON b.currency = fx.currency_code\n AND b.trade_date ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ LOWER BOUND OP ]" },
          { text: " fx.valid_from\n AND b.trade_date ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ UPPER BOUND OP ]" },
          { text: " fx.valid_to\nWHERE b.audit_status != ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ FILTER MATCHED ]" },
          { text: ";", isBlank: false }
        ],
        slots: {
          slot1: { correct: ">=", options: [">=", ">", "=", "<="] },
          slot2: { correct: "<=", options: ["<=", "<", "!=", ">="] },
          slot3: { correct: "'PERFECT_MATCH'", options: ["'PERFECT_MATCH'", "'VALUE_BREAK'", "'ALL'", "NULL"] }
        },
        expectedColumns: ["matched_trade_id", "currency", "raw_exposure", "fx_rate_to_usd", "exposure_usd"]
      },
      {
        stepNumber: 5,
        title: "Executive Capital-at-Risk Summary by Prime Broker",
        businessBrief: "The Chief Risk Officer needs a summary table showing total unsettled USD exposure grouped by Prime Broker and Audit Status. Only show brokers whose total exposure exceeds $500,000.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "GROUP BY Aggregations & Column Projection",
            tip: "All non-aggregated columns in SELECT must appear in the GROUP BY clause."
          },
          {
            sectionKey: "section4",
            label: "HAVING Clause vs. WHERE Traps",
            tip: "Use HAVING SUM(exposure_usd) > 500000 to filter aggregated group values, not WHERE!"
          },
          {
            sectionKey: "section3",
            label: "ORDER BY & Ranking Priority",
            tip: "Sort by total_exposure_usd DESC so the highest-risk brokers appear at the top."
          }
        ],
        bloopsAdvice: "Remember: WHERE filters individual trades before grouping, but HAVING filters the aggregated group total! Put your $500k threshold in the HAVING clause.",
        schemaSnippet: "HarmonizedBreaks(broker_name, audit_status, exposure_usd)",
        targetQuery: "SELECT\n  broker_name,\n  audit_status,\n  COUNT(*) AS break_count,\n  SUM(exposure_usd) AS total_exposure_usd\nFROM HarmonizedBreaks\nGROUP BY broker_name, audit_status\nHAVING SUM(exposure_usd) > 500000\nORDER BY total_exposure_usd DESC;",
        template: [
          { text: "SELECT\n  broker_name,\n  audit_status,\n  COUNT(*) AS break_count,\n  SUM(exposure_usd) AS total_exposure_usd\nFROM HarmonizedBreaks\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ GROUPING CLAUSE ]" },
          { text: " broker_name, audit_status\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ AGGREGATE FILTER ]" },
          { text: " SUM(exposure_usd) > 500000\nORDER BY ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT DIRECTION ]" },
          { text: ";", isBlank: false }
        ],
        slots: {
          slot1: { correct: "GROUP BY", options: ["GROUP BY", "ORDER BY", "PARTITION BY", "CLUSTER BY"] },
          slot2: { correct: "HAVING", options: ["HAVING", "WHERE", "QUALIFY", "FILTER"] },
          slot3: { correct: "total_exposure_usd DESC", options: ["total_exposure_usd DESC", "total_exposure_usd ASC", "broker_name ASC", "break_count ASC"] }
        },
        expectedColumns: ["broker_name", "audit_status", "break_count", "total_exposure_usd"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 1: PROJECT 2
  // ---------------------------------------------------------------------------
  {
    id: "capstone_ib_02",
    domain: "Investment Banking & Asset Management",
    domainIcon: "📈",
    domainColor: "#38bdf8",
    title: "Portfolio Risk Analytics: Value-at-Risk (VaR), Drawdowns & Rolling Volatility",
    subtitle: "Compute asset returns, 30-day rolling annualized volatility, peak-to-trough drawdowns, and historical 95% VaR.",
    difficulty: "Advanced",
    estimatedTime: "50 mins",
    overview: "Asset managers and quantitative hedge funds require automated risk engines to track drawdown exposure and volatility spikes. In this capstone, you will construct a production risk pipeline using window functions and temporal offsets.",
    steps: [
      {
        stepNumber: 1,
        title: "Daily Asset Return Calculation via LAG()",
        businessBrief: "Compute daily percent returns for each ticker: (Today_Close - Yesterday_Close) / Yesterday_Close. Partition by ticker and order chronologically.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Temporal Offsets (LAG & LEAD)",
            tip: "Use LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date) to fetch previous day price."
          },
          {
            sectionKey: "section3",
            label: "ORDER BY & Deterministic Sorting",
            tip: "Ordering by trade_date ASC inside OVER() is strictly required for chronological lag."
          }
        ],
        bloopsAdvice: "Before window functions existed, analysts had to write painful self-joins to find yesterday's price. LAG() does this in one clean line!",
        schemaSnippet: "DailyStockPrices(ticker VARCHAR, trade_date DATE, close_price NUMERIC)",
        targetQuery: "SELECT\n  ticker,\n  trade_date,\n  close_price,\n  LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date) AS prev_close,\n  ROUND((close_price - LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date)) / NULLIF(LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date), 0), 4) AS daily_return\nFROM DailyStockPrices;",
        template: [
          { text: "SELECT\n  ticker,\n  trade_date,\n  close_price,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ LAG FUNCTION ]" },
          { text: "(close_price, 1) OVER (", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ PARTITION CLAUSE ]" },
          { text: " ticker ORDER BY trade_date) AS prev_close,\n  ROUND((close_price - LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date)) / NULLIF(LAG(close_price, 1) OVER (PARTITION BY ticker ORDER BY trade_date), 0), 4) AS daily_return\nFROM DailyStockPrices;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "LAG", options: ["LAG", "LEAD", "FIRST_VALUE", "PRIOR"] },
          slot2: { correct: "PARTITION BY", options: ["PARTITION BY", "GROUP BY", "CLUSTER BY", "ORDER BY"] }
        },
        expectedColumns: ["ticker", "trade_date", "close_price", "prev_close", "daily_return"]
      },
      {
        stepNumber: 2,
        title: "Cumulative Return & High-Water Mark (Peak Value)",
        businessBrief: "To calculate drawdown, we must determine the historical 'High-Water Mark' (the highest price seen from portfolio inception up to today).",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Cumulative Window Accumulators",
            tip: "MAX(close_price) OVER (PARTITION BY ticker ORDER BY trade_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) tracks the all-time peak."
          }
        ],
        bloopsAdvice: "A cumulative MAX() acts like a ratchet—it only moves up when a new all-time high is set, and stays flat during downturns.",
        schemaSnippet: "AssetReturns(ticker, trade_date, close_price, daily_return)",
        targetQuery: "SELECT\n  ticker,\n  trade_date,\n  close_price,\n  MAX(close_price) OVER (\n    PARTITION BY ticker\n    ORDER BY trade_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS high_water_mark\nFROM AssetReturns;",
        template: [
          { text: "SELECT\n  ticker,\n  trade_date,\n  close_price,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ACCUMULATOR FUNC ]" },
          { text: "(close_price) OVER (\n    PARTITION BY ticker\n    ORDER BY trade_date\n    ROWS BETWEEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ FRAME START ]" },
          { text: " AND CURRENT ROW\n  ) AS high_water_mark\nFROM AssetReturns;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "MAX", options: ["MAX", "MIN", "SUM", "AVG"] },
          slot2: { correct: "UNBOUNDED PRECEDING", options: ["UNBOUNDED PRECEDING", "1 PRECEDING", "CURRENT ROW", "UNBOUNDED FOLLOWING"] }
        },
        expectedColumns: ["ticker", "trade_date", "close_price", "high_water_mark"]
      },
      {
        stepNumber: 3,
        title: "Peak-to-Trough Drawdown Percentage",
        businessBrief: "Calculate current drawdown percentage: (close_price - high_water_mark) / high_water_mark * 100. Drawdowns must always be zero or negative.",
        prerequisites: [
          {
            sectionKey: "section7",
            label: "Common Table Expressions (CTEs)",
            tip: "Wrap your High-Water Mark query in a clean CTE so you can perform clean arithmetic on its output."
          },
          {
            sectionKey: "section1",
            label: "Mathematical Expressions & Rounding",
            tip: "Calculate percentage and round to 2 decimal places with ROUND(..., 2)."
          }
        ],
        bloopsAdvice: "If today's price equals the high-water mark, drawdown is 0.00%. If price drops from $100 to $80, drawdown is -20.00%.",
        schemaSnippet: "AssetHighWater(ticker, trade_date, close_price, high_water_mark)",
        targetQuery: "SELECT\n  ticker,\n  trade_date,\n  close_price,\n  high_water_mark,\n  ROUND(((close_price - high_water_mark) / high_water_mark) * 100, 2) AS drawdown_pct\nFROM AssetHighWater;",
        template: [
          { text: "SELECT\n  ticker,\n  trade_date,\n  close_price,\n  high_water_mark,\n  ROUND(((close_price - high_water_mark) / ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ DENOMINATOR ]" },
          { text: ") * 100, ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ PRECISION ]" },
          { text: ") AS drawdown_pct\nFROM AssetHighWater;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "high_water_mark", options: ["high_water_mark", "close_price", "100", "daily_return"] },
          slot2: { correct: "2", options: ["2", "4", "0", "1"] }
        },
        expectedColumns: ["ticker", "trade_date", "close_price", "high_water_mark", "drawdown_pct"]
      },
      {
        stepNumber: 4,
        title: "Historical 95% Value-at-Risk (VaR) via NTILE(100)",
        businessBrief: "To calculate the 95% 1-day Value-at-Risk, partition daily returns into 100 percentiles. The worst 5th percentile (percentile = 5) represents the maximum expected loss at a 95% confidence level.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Statistical Percentiles & NTILE()",
            tip: "Use NTILE(100) OVER (PARTITION BY ticker ORDER BY daily_return ASC) to split returns into 100 equal percentiles."
          },
          {
            sectionKey: "section7",
            label: "Subqueries & Top-N Filtering",
            tip: "Filter WHERE percentile = 5 to isolate the exact VaR cutoff threshold."
          }
        ],
        bloopsAdvice: "VaR is the gold standard of risk management. Regulators require banks to hold enough capital to survive the 5% worst-case loss days.",
        schemaSnippet: "DailyReturns(ticker, trade_date, daily_return)",
        targetQuery: "WITH RankedReturns AS (\n  SELECT\n    ticker,\n    trade_date,\n    daily_return,\n    NTILE(100) OVER (PARTITION BY ticker ORDER BY daily_return ASC) AS return_percentile\n  FROM DailyReturns\n)\nSELECT\n  ticker,\n  MAX(daily_return) AS var_95_cutoff\nFROM RankedReturns\nWHERE return_percentile = 5\nGROUP BY ticker;",
        template: [
          { text: "WITH RankedReturns AS (\n  SELECT\n    ticker,\n    trade_date,\n    daily_return,\n    ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ PERCENTILE FUNC ]" },
          { text: "(100) OVER (PARTITION BY ticker ORDER BY daily_return ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ SORT DIRECTION ]" },
          { text: ") AS return_percentile\n  FROM DailyReturns\n)\nSELECT\n  ticker,\n  MAX(daily_return) AS var_95_cutoff\nFROM RankedReturns\nWHERE return_percentile = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ 95% VAR TIER ]" },
          { text: "\nGROUP BY ticker;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "NTILE", options: ["NTILE", "RANK", "PERCENT_RANK", "CUME_DIST"] },
          slot2: { correct: "ASC", options: ["ASC", "DESC", "NULLS LAST", "RANDOM"] },
          slot3: { correct: "5", options: ["5", "95", "1", "10"] }
        },
        expectedColumns: ["ticker", "var_95_cutoff"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 2: FINTECH & DIGITAL PAYMENTS
  // ---------------------------------------------------------------------------
  {
    id: "capstone_fintech_01",
    domain: "FinTech & Digital Payments",
    domainIcon: "💳",
    domainColor: "#10b981",
    title: "Payment Gateway Dispute Funnel, Interchange Fee Attribution & Slippage",
    subtitle: "Model multi-stage payment funnels (Auth -> Capture -> Settlement -> Chargeback), compute card network interchange fees, and flag high-risk merchants.",
    difficulty: "Advanced",
    estimatedTime: "45 mins",
    overview: "In modern payment processors (Stripe, Adyen, Square), understanding transaction conversion drop-offs, interchange fee bands, and dispute rates is vital for preventing multimillion-dollar fraud losses and card brand fines.",
    steps: [
      {
        stepNumber: 1,
        title: "Multi-Stage Payment Funnel Drop-Off Calculation",
        businessBrief: "Analyze payment pipeline health: Count total authorizations, captures, settlements, and chargebacks grouped by merchant industry category. Calculate Auth-to-Capture conversion %.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "Conditional Aggregations (COUNT / CASE)",
            tip: "Use COUNT(CASE WHEN status = 'CAPTURED' THEN 1 END) to count specific stages without subqueries."
          },
          {
            sectionKey: "section4",
            label: "Safe Division with NULLIF",
            tip: "Prevent division-by-zero errors when dividing by zero authorizations using NULLIF(denom, 0)."
          }
        ],
        bloopsAdvice: "Never write 4 separate queries for funnel stages! In SQL, conditional aggregation allows you to compute the entire funnel in a single table scan.",
        schemaSnippet: "PaymentEvents(payment_id, merchant_category, stage_status ['AUTHORIZED', 'CAPTURED', 'SETTLED', 'CHARGEBACK'], amount_usd)",
        targetQuery: "SELECT\n  merchant_category,\n  COUNT(*) AS total_auths,\n  COUNT(CASE WHEN stage_status = 'CAPTURED' THEN 1 END) AS total_captures,\n  COUNT(CASE WHEN stage_status = 'CHARGEBACK' THEN 1 END) AS total_chargebacks,\n  ROUND(COUNT(CASE WHEN stage_status = 'CAPTURED' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS capture_rate_pct\nFROM PaymentEvents\nGROUP BY merchant_category;",
        template: [
          { text: "SELECT\n  merchant_category,\n  COUNT(*) AS total_auths,\n  COUNT(", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ CONDITIONAL STAGE ]" },
          { text: " WHEN stage_status = 'CAPTURED' THEN 1 END) AS total_captures,\n  COUNT(CASE WHEN stage_status = 'CHARGEBACK' THEN 1 END) AS total_chargebacks,\n  ROUND(COUNT(CASE WHEN stage_status = 'CAPTURED' THEN 1 END) * 100.0 / ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ SAFE ZERO DIVISOR ]" },
          { text: "(COUNT(*), 0), 2) AS capture_rate_pct\nFROM PaymentEvents\nGROUP BY merchant_category;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "CASE", options: ["CASE", "IF", "WHEN", "FILTER"] },
          slot2: { correct: "NULLIF", options: ["NULLIF", "COALESCE", "ISNULL", "NVL"] }
        },
        expectedColumns: ["merchant_category", "total_auths", "total_captures", "total_chargebacks", "capture_rate_pct"]
      },
      {
        stepNumber: 2,
        title: "Tiered Interchange Fee Attribution via NON-EQUI JOIN",
        businessBrief: "Card networks charge interchange rates based on monthly processing volume tiers. Join each merchant's transaction against the FeeTierSchedule table based on volume bounds.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "NON-EQUI Joins & Inequality Bands",
            tip: "Join FeeTierSchedule where merchant_volume >= min_volume AND merchant_volume < max_volume."
          }
        ],
        bloopsAdvice: "Fee structures in finance are tiered. An exact equi-join (=) fails here because volumes fall into continuous ranges. A non-equi join is required!",
        schemaSnippet: "MerchantMonthlyVolume(merchant_id, monthly_volume), FeeTierSchedule(tier_name, min_volume, max_volume, basis_points_fee)",
        targetQuery: "SELECT\n  m.merchant_id,\n  m.monthly_volume,\n  f.tier_name,\n  f.basis_points_fee,\n  ROUND(m.monthly_volume * (f.basis_points_fee / 10000.0), 2) AS interchange_fee_usd\nFROM MerchantMonthlyVolume m\nJOIN FeeTierSchedule f\n  ON m.monthly_volume >= f.min_volume\n AND m.monthly_volume < f.max_volume;",
        template: [
          { text: "SELECT\n  m.merchant_id,\n  m.monthly_volume,\n  f.tier_name,\n  f.basis_points_fee,\n  ROUND(m.monthly_volume * (f.basis_points_fee / 10000.0), 2) AS interchange_fee_usd\nFROM MerchantMonthlyVolume m\nJOIN FeeTierSchedule f\n  ON m.monthly_volume ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ LOWER BOUND ]" },
          { text: " f.min_volume\n AND m.monthly_volume ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ UPPER BOUND ]" },
          { text: " f.max_volume;", isBlank: false }
        ],
        slots: {
          slot1: { correct: ">=", options: [">=", ">", "=", "<="] },
          slot2: { correct: "<", options: ["<", "<=", "=", ">"] }
        },
        expectedColumns: ["merchant_id", "monthly_volume", "tier_name", "basis_points_fee", "interchange_fee_usd"]
      },
      {
        stepNumber: 3,
        title: "Dispute Ratio Alerting & Card Brand 1% Penalty Threshold",
        businessBrief: "Visa and Mastercard place merchants on monitoring lists if their dispute ratio (Disputes / Total Sales) exceeds 1.00% and total disputes > 50 in a calendar month. Flag these accounts.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "HAVING Filter for Multiple Aggregates",
            tip: "Combine multiple aggregate conditions in HAVING: HAVING (disputes * 100.0 / sales) > 1.0 AND disputes > 50."
          }
        ],
        bloopsAdvice: "A merchant with 1 dispute on 1 sale has a 100% dispute rate, but they don't get fined by Visa because volume is too low. The HAVING clause must check both rate and minimum count.",
        schemaSnippet: "MonthlyMerchantPerformance(merchant_id, month_date, total_txns, total_disputes)",
        targetQuery: "SELECT\n  merchant_id,\n  month_date,\n  total_txns,\n  total_disputes,\n  ROUND((total_disputes * 100.0) / NULLIF(total_txns, 0), 2) AS dispute_ratio_pct\nFROM MonthlyMerchantPerformance\nWHERE (total_disputes * 100.0) / NULLIF(total_txns, 0) >= 1.00\n  AND total_disputes >= 50\nORDER BY dispute_ratio_pct DESC;",
        template: [
          { text: "SELECT\n  merchant_id,\n  month_date,\n  total_txns,\n  total_disputes,\n  ROUND((total_disputes * 100.0) / NULLIF(total_txns, 0), 2) AS dispute_ratio_pct\nFROM MonthlyMerchantPerformance\nWHERE (total_disputes * 100.0) / NULLIF(total_txns, 0) ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ RATIO FILTER ]" },
          { text: " 1.00\n  AND total_disputes >= ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ MIN COUNT ]" },
          { text: "\nORDER BY dispute_ratio_pct DESC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: ">=", options: [">=", "<=", "=", ">"] },
          slot2: { correct: "50", options: ["50", "1", "100", "10"] }
        },
        expectedColumns: ["merchant_id", "month_date", "total_txns", "total_disputes", "dispute_ratio_pct"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 2: PROJECT 2
  // ---------------------------------------------------------------------------
  {
    id: "capstone_fintech_02",
    domain: "FinTech & Digital Payments",
    domainIcon: "🛡️",
    domainColor: "#10b981",
    title: "Anti-Money Laundering (AML) & Synthetic Fraud Ring Graph Detection",
    subtitle: "Identify cash deposit structuring under the $10,000 regulatory threshold and uncover circular wire transfer rings.",
    difficulty: "Expert",
    estimatedTime: "50 mins",
    overview: "Financial intelligence units (FIUs) must file Suspicious Activity Reports (SARs) with regulatory authorities. In this capstone, you will use sliding temporal windows and graph self-joins to detect laundering networks.",
    steps: [
      {
        stepNumber: 1,
        title: "Cash Deposit Structuring / Smurfing Detection",
        businessBrief: "Under the Bank Secrecy Act, banks must report cash deposits of $10,000+. Smurfing occurs when a user makes multiple deposits between $9,000 and $9,999 within a rolling 72-hour window. Find all accounts with >= 3 such deposits.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Range-Based Window Frames (RANGE BETWEEN)",
            tip: "Use COUNT(*) OVER (PARTITION BY account_id ORDER BY deposit_timestamp RANGE BETWEEN INTERVAL '72 hours' PRECEDING AND CURRENT ROW)."
          },
          {
            sectionKey: "section2",
            label: "BETWEEN ... AND ... Range Predicates",
            tip: "Pre-filter deposit amounts: WHERE deposit_amount BETWEEN 9000 AND 9999."
          }
        ],
        bloopsAdvice: "Fraudsters think depositing $9,900 three times will evade detection. Our rolling 72-hour window catches them immediately!",
        schemaSnippet: "CashDeposits(account_id, deposit_id, deposit_amount, deposit_timestamp)",
        targetQuery: "WITH WindowedDeposits AS (\n  SELECT\n    account_id,\n    deposit_id,\n    deposit_amount,\n    deposit_timestamp,\n    COUNT(*) OVER (\n      PARTITION BY account_id\n      ORDER BY deposit_timestamp\n      RANGE BETWEEN INTERVAL '72 hours' PRECEDING AND CURRENT ROW\n    ) AS rolling_72hr_count\n  FROM CashDeposits\n  WHERE deposit_amount >= 9000 AND deposit_amount < 10000\n)\nSELECT *\nFROM WindowedDeposits\nWHERE rolling_72hr_count >= 3;",
        template: [
          { text: "WITH WindowedDeposits AS (\n  SELECT\n    account_id,\n    deposit_id,\n    deposit_amount,\n    deposit_timestamp,\n    COUNT(*) OVER (\n      PARTITION BY account_id\n      ORDER BY deposit_timestamp\n      ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ FRAME RANGE SPEC ]" },
          { text: " BETWEEN INTERVAL '72 hours' PRECEDING AND CURRENT ROW\n    ) AS rolling_72hr_count\n  FROM CashDeposits\n  WHERE deposit_amount >= 9000 AND deposit_amount < 10000\n)\nSELECT *\nFROM WindowedDeposits\nWHERE rolling_72hr_count ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ THRESHOLD OP ]" },
          { text: " 3;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "RANGE", options: ["RANGE", "ROWS", "GROUPS", "WINDOW"] },
          slot2: { correct: ">=", options: [">=", ">", "=", "<="] }
        },
        expectedColumns: ["account_id", "deposit_id", "deposit_amount", "deposit_timestamp", "rolling_72hr_count"]
      },
      {
        stepNumber: 2,
        title: "Circular Wire Transfer Ring Detection via Multi-Table Self-Join",
        businessBrief: "Identify circular funds routing where money travels from Account A -> Account B -> Account C -> back to Account A within 24 hours.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "SELF JOINs & Cycle Matching",
            tip: "Join Transactions t1 to t2 on t1.receiver = t2.sender, and t2 to t3 on t2.receiver = t3.sender, with t3.receiver = t1.sender."
          }
        ],
        bloopsAdvice: "A multi-stage self-join models graph traversal directly in SQL! Distinct aliases (t1, t2, t3) prevent column ambiguity.",
        schemaSnippet: "Wires(tx_id, sender_acc, receiver_acc, amount, sent_time)",
        targetQuery: "SELECT\n  t1.sender_acc AS ring_root_acc,\n  t1.receiver_acc AS leg1_receiver,\n  t2.receiver_acc AS leg2_receiver,\n  t3.receiver_acc AS leg3_receiver,\n  t1.amount AS initial_amount\nFROM Wires t1\nJOIN Wires t2\n  ON t1.receiver_acc = t2.sender_acc\n AND t2.sent_time >= t1.sent_time\n AND t2.sent_time <= t1.sent_time + INTERVAL '24 hours'\nJOIN Wires t3\n  ON t2.receiver_acc = t3.sender_acc\n AND t3.sent_time >= t2.sent_time\n AND t3.sent_time <= t1.sent_time + INTERVAL '24 hours'\nWHERE t3.receiver_acc = t1.sender_acc;",
        template: [
          { text: "SELECT\n  t1.sender_acc AS ring_root_acc,\n  t1.receiver_acc AS leg1_receiver,\n  t2.receiver_acc AS leg2_receiver,\n  t3.receiver_acc AS leg3_receiver,\n  t1.amount AS initial_amount\nFROM Wires t1\nJOIN Wires t2\n  ON t1.receiver_acc = t2.sender_acc\n AND t2.sent_time >= t1.sent_time\n AND t2.sent_time <= t1.sent_time + INTERVAL '24 hours'\nJOIN Wires t3\n  ON t2.receiver_acc = t3.sender_acc\n AND t3.sent_time >= t2.sent_time\n AND t3.sent_time <= t1.sent_time + INTERVAL '24 hours'\nWHERE t3.receiver_acc = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ CYCLE COMPLETION ]" },
          { text: ";", isBlank: false }
        ],
        slots: {
          slot1: { correct: "t1.sender_acc", options: ["t1.sender_acc", "t2.sender_acc", "t3.receiver_acc", "NULL"] }
        },
        expectedColumns: ["ring_root_acc", "leg1_receiver", "leg2_receiver", "leg3_receiver", "initial_amount"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 3: ENTERPRISE B2B SAAS & SUBSCRIPTION COMMERCE
  // ---------------------------------------------------------------------------
  {
    id: "capstone_saas_01",
    domain: "Enterprise B2B SaaS & Cloud Tech",
    domainIcon: "☁️",
    domainColor: "#a855f7",
    title: "Complete SaaS Financial Engine: 5-Way MRR Waterfall, ARR & Churn Decay",
    subtitle: "Transform subscription contracts into the canonical 5-way MRR waterfall (New, Expansion, Contraction, Churn, Reactivation).",
    difficulty: "Advanced",
    estimatedTime: "50 mins",
    overview: "Every modern software company tracks Monthly Recurring Revenue (MRR) waterfalls for their board and investors. In this capstone, you will construct a full MRR accounting waterfall from monthly subscription records.",
    steps: [
      {
        stepNumber: 1,
        title: "Dense Calendar Expansion via CROSS JOIN",
        businessBrief: "If a customer doesn't pay in a given month, no row is inserted in raw billing tables. We must CROSS JOIN distinct customers with all calendar months to ensure every customer has an explicit monthly record.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "CROSS JOIN for Calendar Grid Generation",
            tip: "Use CROSS JOIN between DimCustomers and DimMonths to produce a dense Cartesian grid (Customers x Months)."
          },
          {
            sectionKey: "section5",
            label: "LEFT JOIN for Zero-Fill Metric Preservation",
            tip: "LEFT JOIN the actual billing events onto the grid so inactive months have 0 MRR rather than disappearing."
          }
        ],
        bloopsAdvice: "A sparse dataset is the #1 reason churn calculations fail. If a customer churns, they stop generating rows! The CROSS JOIN guarantees they are accounted for.",
        schemaSnippet: "DimCustomers(customer_id), DimMonths(month_start_date), Subscriptions(customer_id, billing_month, mrr_amount)",
        targetQuery: "SELECT\n  c.customer_id,\n  m.month_start_date,\n  COALESCE(s.mrr_amount, 0) AS active_mrr\nFROM DimCustomers c\nCROSS JOIN DimMonths m\nLEFT JOIN Subscriptions s\n  ON c.customer_id = s.customer_id\n AND m.month_start_date = s.billing_month;",
        template: [
          { text: "SELECT\n  c.customer_id,\n  m.month_start_date,\n  COALESCE(s.mrr_amount, 0) AS active_mrr\nFROM DimCustomers c\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ GRID EXPANSION ]" },
          { text: " DimMonths m\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ METRIC PRESERVATION ]" },
          { text: " Subscriptions s\n  ON c.customer_id = s.customer_id\n AND m.month_start_date = s.billing_month;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "CROSS JOIN", options: ["CROSS JOIN", "INNER JOIN", "FULL JOIN", "UNION"] },
          slot2: { correct: "LEFT JOIN", options: ["LEFT JOIN", "INNER JOIN", "RIGHT JOIN", "CROSS JOIN"] }
        },
        expectedColumns: ["customer_id", "month_start_date", "active_mrr"]
      },
      {
        stepNumber: 2,
        title: "Month-Over-Month MRR Delta via LAG()",
        businessBrief: "Fetch prior month MRR for each customer to compute change: delta = current_mrr - prior_mrr.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Temporal Offsets (LAG & LEAD)",
            tip: "Use LAG(active_mrr, 1, 0) OVER (PARTITION BY customer_id ORDER BY month_start_date) to default missing first months to 0."
          }
        ],
        bloopsAdvice: "Notice the third argument in LAG(active_mrr, 1, 0)! Setting the default to 0 prevents NULL values for new customers.",
        schemaSnippet: "DenseCustomerMRR(customer_id, month_start_date, active_mrr)",
        targetQuery: "SELECT\n  customer_id,\n  month_start_date,\n  active_mrr,\n  LAG(active_mrr, 1, 0) OVER (\n    PARTITION BY customer_id\n    ORDER BY month_start_date\n  ) AS prior_mrr\nFROM DenseCustomerMRR;",
        template: [
          { text: "SELECT\n  customer_id,\n  month_start_date,\n  active_mrr,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ OFFSET FUNCTION ]" },
          { text: "(active_mrr, 1, 0) OVER (\n    PARTITION BY customer_id\n    ORDER BY month_start_date\n  ) AS prior_mrr\nFROM DenseCustomerMRR;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "LAG", options: ["LAG", "LEAD", "FIRST_VALUE", "PRIOR"] }
        },
        expectedColumns: ["customer_id", "month_start_date", "active_mrr", "prior_mrr"]
      },
      {
        stepNumber: 3,
        title: "The 5-Way MRR Waterfall Classification",
        businessBrief: "Categorize every monthly revenue change into: 'NEW', 'EXPANSION', 'CONTRACTION', 'CHURN', or 'RETAINED'.",
        prerequisites: [
          {
            sectionKey: "section8",
            label: "Advanced CASE WHEN & Data Categorization",
            tip: "Evaluate boundary states: prior = 0 & current > 0 -> 'NEW'; current = 0 & prior > 0 -> 'CHURN'."
          }
        ],
        bloopsAdvice: "This exact CASE WHEN query is asked in almost every senior SaaS analytics interview. Memorize the 5 conditions!",
        schemaSnippet: "CustomerMRRTransitions(customer_id, month_start_date, active_mrr, prior_mrr)",
        targetQuery: "SELECT\n  customer_id,\n  month_start_date,\n  active_mrr,\n  prior_mrr,\n  CASE\n    WHEN prior_mrr = 0 AND active_mrr > 0 THEN 'NEW'\n    WHEN active_mrr > prior_mrr AND prior_mrr > 0 THEN 'EXPANSION'\n    WHEN active_mrr < prior_mrr AND active_mrr > 0 THEN 'CONTRACTION'\n    WHEN active_mrr = 0 AND prior_mrr > 0 THEN 'CHURN'\n    ELSE 'RETAINED'\n  END AS mrr_category\nFROM CustomerMRRTransitions;",
        template: [
          { text: "SELECT\n  customer_id,\n  month_start_date,\n  active_mrr,\n  prior_mrr,\n  CASE\n    WHEN prior_mrr = 0 AND active_mrr > 0 THEN 'NEW'\n    WHEN active_mrr > prior_mrr AND prior_mrr > 0 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ GROWTH TYPE ]" },
          { text: "\n    WHEN active_mrr < prior_mrr AND active_mrr > 0 THEN 'CONTRACTION'\n    WHEN active_mrr = 0 AND prior_mrr > 0 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ LOSS TYPE ]" },
          { text: "\n    ELSE 'RETAINED'\n  END AS mrr_category\nFROM CustomerMRRTransitions;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "'EXPANSION'", options: ["'EXPANSION'", "'UPSELL'", "'RENEWAL'", "'BOOST'"] },
          slot2: { correct: "'CHURN'", options: ["'CHURN'", "'CANCEL'", "'DROP'", "'LOST'"] }
        },
        expectedColumns: ["customer_id", "month_start_date", "active_mrr", "prior_mrr", "mrr_category"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 3: PROJECT 2
  // ---------------------------------------------------------------------------
  {
    id: "capstone_saas_02",
    domain: "Enterprise B2B SaaS & Cloud Tech",
    domainIcon: "📊",
    domainColor: "#a855f7",
    title: "Vintage Cohort Retention, Expansion Dynamics & LTV / CAC Payback",
    subtitle: "Group customers by acquisition vintage month and compute month-by-month active user retention curves and LTV curves.",
    difficulty: "Advanced",
    estimatedTime: "45 mins",
    overview: "Cohort retention analysis is the single most important metric evaluated by venture capitalists and growth operators. Build a triangular cohort retention matrix directly in SQL.",
    steps: [
      {
        stepNumber: 1,
        title: "Cohort Inception Month Anchor via Window MIN()",
        businessBrief: "Anchor every customer to their very first subscription month across all historical activity.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Boundary Extremums (MIN / FIRST_VALUE)",
            tip: "Use MIN(activity_month) OVER (PARTITION BY customer_id) to stamp the cohort inception month on every row."
          }
        ],
        bloopsAdvice: "A windowed MIN() attaches the customer's permanent birth month to every subsequent month they remain active!",
        schemaSnippet: "UserActivityMonths(customer_id, activity_month)",
        targetQuery: "SELECT\n  customer_id,\n  activity_month,\n  MIN(activity_month) OVER (\n    PARTITION BY customer_id\n  ) AS cohort_month\nFROM UserActivityMonths;",
        template: [
          { text: "SELECT\n  customer_id,\n  activity_month,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ MIN BOUNDARY ]" },
          { text: "(activity_month) OVER (\n    PARTITION BY customer_id\n  ) AS cohort_month\nFROM UserActivityMonths;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "MIN", options: ["MIN", "FIRST_VALUE", "MAX", "LEAST"] }
        },
        expectedColumns: ["customer_id", "activity_month", "cohort_month"]
      },
      {
        stepNumber: 2,
        title: "Cohort Month Offset Index Calculation",
        businessBrief: "Calculate the relative month offset: Month 0 (acquisition month), Month 1, Month 2, etc.",
        prerequisites: [
          {
            sectionKey: "section1",
            label: "Date Arithmetic & Month Difference",
            tip: "Calculate month difference between activity_month and cohort_month."
          }
        ],
        bloopsAdvice: "Standardizing all cohorts to relative Month 0, 1, 2 allows us to compare January's cohort performance directly against June's cohort!",
        schemaSnippet: "AnchoredActivity(customer_id, activity_month, cohort_month)",
        targetQuery: "SELECT\n  customer_id,\n  cohort_month,\n  activity_month,\n  (EXTRACT(YEAR FROM activity_month) - EXTRACT(YEAR FROM cohort_month)) * 12 +\n  (EXTRACT(MONTH FROM activity_month) - EXTRACT(MONTH FROM cohort_month)) AS month_index\nFROM AnchoredActivity;",
        template: [
          { text: "SELECT\n  customer_id,\n  cohort_month,\n  activity_month,\n  (", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ EXTRACT YEAR ]" },
          { text: "(YEAR FROM activity_month) - EXTRACT(YEAR FROM cohort_month)) * 12 +\n  (EXTRACT(MONTH FROM activity_month) - EXTRACT(MONTH FROM cohort_month)) AS month_index\nFROM AnchoredActivity;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "EXTRACT", options: ["EXTRACT", "DATE_PART", "YEAR", "GET_YEAR"] }
        },
        expectedColumns: ["customer_id", "cohort_month", "activity_month", "month_index"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 4: HEALTHCARE ANALYTICS & HEALTH INSURANCE
  // ---------------------------------------------------------------------------
  {
    id: "capstone_health_01",
    domain: "Healthcare Analytics & Health Insurance",
    domainIcon: "🏥",
    domainColor: "#ec4899",
    title: "Insurance Claims Adjudication, Denial Root-Cause & Medical Loss Ratio (MLR)",
    subtitle: "Calculate ACA regulatory Medical Loss Ratios, rank denial codes, and detect split-claim duplicate billing.",
    difficulty: "Advanced",
    estimatedTime: "40 mins",
    overview: "Under the Affordable Care Act (ACA), health insurers must spend at least 80% to 85% of premium revenue on medical care (Medical Loss Ratio). Construct an adjudication pipeline to audit MLR compliance and uncover claim denial patterns.",
    steps: [
      {
        stepNumber: 1,
        title: "Medical Loss Ratio (MLR) Compliance Calculation",
        businessBrief: "Compute the MLR: Total Claims Paid / Total Premiums Collected * 100 per policy plan group. Flag groups that fall below the 80% federal ACA rebate threshold.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "Aggregations & High-Precision Division",
            tip: "Calculate SUM(claims_paid) / NULLIF(SUM(premiums_collected), 0) * 100.0."
          },
          {
            sectionKey: "section8",
            label: "CASE WHEN Compliance Flagging",
            tip: "Use CASE WHEN mlr_pct < 80.0 THEN 'REBATE_OWED' ELSE 'COMPLIANT' END."
          }
        ],
        bloopsAdvice: "If a health plan's MLR drops below 80%, the insurer must legally pay cash rebates to policyholders! High precision is required.",
        schemaSnippet: "HealthPlanAccounting(plan_id, policy_group, claims_paid, premiums_collected)",
        targetQuery: "SELECT\n  policy_group,\n  SUM(claims_paid) AS total_claims,\n  SUM(premiums_collected) AS total_premiums,\n  ROUND((SUM(claims_paid) * 100.0) / NULLIF(SUM(premiums_collected), 0), 2) AS mlr_percentage,\n  CASE\n    WHEN (SUM(claims_paid) * 100.0) / NULLIF(SUM(premiums_collected), 0) < 80.0 THEN 'REBATE_OWED'\n    ELSE 'COMPLIANT'\n  END AS aca_status\nFROM HealthPlanAccounting\nGROUP BY policy_group;",
        template: [
          { text: "SELECT\n  policy_group,\n  SUM(claims_paid) AS total_claims,\n  SUM(premiums_collected) AS total_premiums,\n  ROUND((SUM(claims_paid) * 100.0) / NULLIF(SUM(premiums_collected), 0), 2) AS mlr_percentage,\n  CASE\n    WHEN (SUM(claims_paid) * 100.0) / NULLIF(SUM(premiums_collected), 0) < 80.0 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ NON-COMPLIANT STATUS ]" },
          { text: "\n    ELSE 'COMPLIANT'\n  END AS aca_status\nFROM HealthPlanAccounting\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ GROUPING ]" },
          { text: " policy_group;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "'REBATE_OWED'", options: ["'REBATE_OWED'", "'PENALTY'", "'FAIL'", "'AUDIT'"] },
          slot2: { correct: "GROUP BY", options: ["GROUP BY", "ORDER BY", "PARTITION BY", "CLUSTER BY"] }
        },
        expectedColumns: ["policy_group", "total_claims", "total_premiums", "mlr_percentage", "aca_status"]
      },
      {
        stepNumber: 2,
        title: "Duplicate & Split-Claim Billing Detection via ROW_NUMBER()",
        businessBrief: "Identify potential billing fraud where a provider submits identical claims (same patient, doctor, and procedure code) within 24 hours.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Row Numbering & Deduplication (ROW_NUMBER)",
            tip: "Use ROW_NUMBER() OVER (PARTITION BY patient_id, provider_id, procedure_code, claim_date ORDER BY claim_id) to flag duplicates."
          }
        ],
        bloopsAdvice: "Duplicate claims cost the healthcare system billions. If ROW_NUMBER() > 1 for identical clinical parameters, it's a red flag for fraud audit.",
        schemaSnippet: "PatientClaims(claim_id, patient_id, provider_id, procedure_code, claim_date, billed_amount)",
        targetQuery: "WITH NumberedClaims AS (\n  SELECT\n    claim_id,\n    patient_id,\n    provider_id,\n    procedure_code,\n    claim_date,\n    billed_amount,\n    ROW_NUMBER() OVER (\n      PARTITION BY patient_id, provider_id, procedure_code, claim_date\n      ORDER BY claim_id\n    ) AS submission_sequence\n  FROM PatientClaims\n)\nSELECT *\nFROM NumberedClaims\nWHERE submission_sequence > 1;",
        template: [
          { text: "WITH NumberedClaims AS (\n  SELECT\n    claim_id,\n    patient_id,\n    provider_id,\n    procedure_code,\n    claim_date,\n    billed_amount,\n    ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ SEQUENCE FUNC ]" },
          { text: "() OVER (\n      PARTITION BY patient_id, provider_id, procedure_code, claim_date\n      ORDER BY claim_id\n    ) AS submission_sequence\n  FROM PatientClaims\n)\nSELECT *\nFROM NumberedClaims\nWHERE submission_sequence ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DUPLICATE FILTER ]" },
          { text: " 1;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "ROW_NUMBER", options: ["ROW_NUMBER", "RANK", "DENSE_RANK", "COUNT"] },
          slot2: { correct: ">", options: [">", "=", "<", ">="] }
        },
        expectedColumns: ["claim_id", "patient_id", "provider_id", "procedure_code", "claim_date", "billed_amount", "submission_sequence"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 4: PROJECT 2
  // ---------------------------------------------------------------------------
  {
    id: "capstone_health_02",
    domain: "Healthcare Analytics & Health Insurance",
    domainIcon: "🩺",
    domainColor: "#ec4899",
    title: "Hospital Patient Length-of-Stay (LOS), Readmissions & Resource Capacity",
    subtitle: "Calculate patient stay duration, track Medicare 30-day all-cause readmission penalties, and monitor bed census trends.",
    difficulty: "Advanced",
    estimatedTime: "40 mins",
    overview: "Under the Hospital Readmissions Reduction Program (HRRP), hospitals face severe financial penalties if patient readmission rates exceed benchmarks. Build an analytical audit query to identify 30-day readmissions using window offsets.",
    steps: [
      {
        stepNumber: 1,
        title: "30-Day Readmission Identification via LEAD()",
        businessBrief: "For every patient discharge, look forward to their next admission date. If the next admission occurs within 30 days of discharge, flag as readmission.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Temporal Offsets (LEAD & LAG)",
            tip: "Use LEAD(admission_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date) to see the next visit."
          },
          {
            sectionKey: "section1",
            label: "Date Difference & Interval Math",
            tip: "Compute (next_admission_date - discharge_date) <= 30."
          }
        ],
        bloopsAdvice: "LEAD() peers forward in time! By looking at the patient's next admission, we can compare the gap between discharge and return.",
        schemaSnippet: "HospitalVisits(visit_id, patient_id, admission_date, discharge_date, department)",
        targetQuery: "SELECT\n  visit_id,\n  patient_id,\n  discharge_date,\n  LEAD(admission_date, 1) OVER (\n    PARTITION BY patient_id\n    ORDER BY admission_date\n  ) AS next_admission_date,\n  CASE\n    WHEN LEAD(admission_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date) - discharge_date <= 30 THEN 1\n    ELSE 0\n  END AS is_30day_readmission\nFROM HospitalVisits;",
        template: [
          { text: "SELECT\n  visit_id,\n  patient_id,\n  discharge_date,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ FORWARD OFFSET ]" },
          { text: "(admission_date, 1) OVER (\n    PARTITION BY patient_id\n    ORDER BY admission_date\n  ) AS next_admission_date,\n  CASE\n    WHEN LEAD(admission_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date) - discharge_date <= 30 THEN 1\n    ELSE 0\n  END AS is_30day_readmission\nFROM HospitalVisits;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "LEAD", options: ["LEAD", "LAG", "NEXT", "FUTURE"] }
        },
        expectedColumns: ["visit_id", "patient_id", "discharge_date", "next_admission_date", "is_30day_readmission"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 5: E-COMMERCE, MARKETPLACE & SUPPLY CHAIN FINANCE
  // ---------------------------------------------------------------------------
  {
    id: "capstone_ecomm_01",
    domain: "E-Commerce, Marketplace & Supply Chain Finance",
    domainIcon: "🛒",
    domainColor: "#f59e0b",
    title: "Marketplace Multi-Party Ledger: Merchant Payouts, Escrow & Return Breaks",
    subtitle: "Build the multi-sided financial ledger for an e-commerce platform: GMV, platform take-rates, escrow holdbacks, and returns.",
    difficulty: "Advanced",
    estimatedTime: "45 mins",
    overview: "Marketplaces (Amazon, Shopify, Etsy) do not sell inventory directly—they hold buyer funds in escrow and pay merchants net of take-rate fees, refunds, and chargebacks. Build the automated merchant settlement engine in SQL.",
    steps: [
      {
        stepNumber: 1,
        title: "GMV to Net Platform Revenue Bridge",
        businessBrief: "Compute the bridge from Gross Merchandise Value (GMV) to Net Platform Revenue: GMV - Merchant Payouts - Refunds + Platform Commission (15%).",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "Aggregations & Math Calculations",
            tip: "Calculate SUM(order_subtotal), apply percentage commission, and aggregate refunds."
          }
        ],
        bloopsAdvice: "In e-commerce finance, Gross Merchandise Value is vanity, but Net Revenue after payouts and returns is sanity!",
        schemaSnippet: "MarketplaceOrders(order_id, seller_id, order_subtotal, shipping_fee, refund_amount, status)",
        targetQuery: "SELECT\n  seller_id,\n  SUM(order_subtotal) AS gross_gmv,\n  SUM(refund_amount) AS total_refunds,\n  ROUND(SUM(order_subtotal) * 0.15, 2) AS platform_take_rate_fee,\n  ROUND((SUM(order_subtotal) - SUM(refund_amount)) * 0.85, 2) AS net_merchant_payout\nFROM MarketplaceOrders\nWHERE status = 'COMPLETED'\nGROUP BY seller_id;",
        template: [
          { text: "SELECT\n  seller_id,\n  SUM(order_subtotal) AS gross_gmv,\n  SUM(refund_amount) AS total_refunds,\n  ROUND(SUM(order_subtotal) * ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ COMMISSION RATE ]" },
          { text: ", 2) AS platform_take_rate_fee,\n  ROUND((SUM(order_subtotal) - SUM(refund_amount)) * 0.85, 2) AS net_merchant_payout\nFROM MarketplaceOrders\nWHERE status = 'COMPLETED'\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ GROUPING ]" },
          { text: " seller_id;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "0.15", options: ["0.15", "1.15", "0.85", "15"] },
          slot2: { correct: "GROUP BY", options: ["GROUP BY", "ORDER BY", "PARTITION BY", "CLUSTER BY"] }
        },
        expectedColumns: ["seller_id", "gross_gmv", "total_refunds", "platform_take_rate_fee", "net_merchant_payout"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // DOMAIN 5: PROJECT 2
  // ---------------------------------------------------------------------------
  {
    id: "capstone_ecomm_02",
    domain: "E-Commerce, Marketplace & Supply Chain Finance",
    domainIcon: "📦",
    domainColor: "#f59e0b",
    title: "Inventory Stockout Forecasting, Warehouse Holding Costs & Gross Margin ROI",
    subtitle: "Forecast Days of Inventory on Hand (DOH), run-out dates using moving average sales velocity, and rank SKU profitability.",
    difficulty: "Advanced",
    estimatedTime: "45 mins",
    overview: "Supply chain disruptions and stockouts cost retail companies hundreds of millions in lost sales. Construct an inventory health model that computes rolling sales velocity and forecasts exact stockout dates.",
    steps: [
      {
        stepNumber: 1,
        title: "Rolling 14-Day Velocity & Average Daily Sales (ADS)",
        businessBrief: "Compute a rolling 14-day average of daily units sold per SKU to smooth out weekend spikes.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Moving Averages & Sliding Window Frames",
            tip: "Use AVG(units_sold) OVER (PARTITION BY sku_id ORDER BY sale_date ROWS BETWEEN 13 PRECEDING AND CURRENT ROW)."
          }
        ],
        bloopsAdvice: "A 1-day sales spike can fool a simple query into over-ordering stock. A 14-day rolling average provides smooth, accurate velocity.",
        schemaSnippet: "DailySkuSales(sku_id, sale_date, units_sold)",
        targetQuery: "SELECT\n  sku_id,\n  sale_date,\n  units_sold,\n  ROUND(AVG(units_sold) OVER (\n    PARTITION BY sku_id\n    ORDER BY sale_date\n    ROWS BETWEEN 13 PRECEDING AND CURRENT ROW\n  ), 2) AS rolling_14d_ads\nFROM DailySkuSales;",
        template: [
          { text: "SELECT\n  sku_id,\n  sale_date,\n  units_sold,\n  ROUND(", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ MOVING AVG FUNC ]" },
          { text: "(units_sold) OVER (\n    PARTITION BY sku_id\n    ORDER BY sale_date\n    ROWS BETWEEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ SLIDING FRAME ]" },
          { text: " AND CURRENT ROW\n  ), 2) AS rolling_14d_ads\nFROM DailySkuSales;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "AVG", options: ["AVG", "SUM", "MEAN", "ROLLING"] },
          slot2: { correct: "13 PRECEDING", options: ["13 PRECEDING", "14 PRECEDING", "UNBOUNDED PRECEDING", "CURRENT ROW"] }
        },
        expectedColumns: ["sku_id", "sale_date", "units_sold", "rolling_14d_ads"]
      },
      {
        stepNumber: 2,
        title: "Days of Inventory on Hand (DOH) & Run-Out Forecast",
        businessBrief: "Join current warehouse inventory with the latest 14-day sales velocity to compute Days of Inventory on Hand: doh = current_stock / ads.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "INNER JOIN on Unique SKU Keys",
            tip: "Join CurrentInventory i to LatestVelocity v ON i.sku_id = v.sku_id."
          },
          {
            sectionKey: "section4",
            label: "Safe Division with NULLIF",
            tip: "Prevent division by zero for SKUs with zero sales: current_stock / NULLIF(rolling_14d_ads, 0)."
          }
        ],
        bloopsAdvice: "If a SKU has 0 average sales, division by zero crashes your analytics engine. Always protect your denominator with NULLIF!",
        schemaSnippet: "CurrentInventory(sku_id, current_stock_qty), LatestVelocity(sku_id, rolling_14d_ads)",
        targetQuery: "SELECT\n  i.sku_id,\n  i.current_stock_qty,\n  v.rolling_14d_ads,\n  ROUND(i.current_stock_qty / NULLIF(v.rolling_14d_ads, 0), 1) AS days_of_inventory\nFROM CurrentInventory i\nJOIN LatestVelocity v\n  ON i.sku_id = v.sku_id\nORDER BY days_of_inventory ASC;",
        template: [
          { text: "SELECT\n  i.sku_id,\n  i.current_stock_qty,\n  v.rolling_14d_ads,\n  ROUND(i.current_stock_qty / ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ZERO PROTECTION ]" },
          { text: "(v.rolling_14d_ads, 0), 1) AS days_of_inventory\nFROM CurrentInventory i\nJOIN LatestVelocity v\n  ON i.sku_id = v.sku_id\nORDER BY days_of_inventory ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "NULLIF", options: ["NULLIF", "COALESCE", "IFNULL", "ZERO_IF_NULL"] }
        },
        expectedColumns: ["sku_id", "current_stock_qty", "rolling_14d_ads", "days_of_inventory"]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CAPSTONES_DATA: window.CAPSTONES_DATA };
}
