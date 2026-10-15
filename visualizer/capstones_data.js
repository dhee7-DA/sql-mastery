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
      },
      {
        stepNumber: 5,
        title: "Rolling 30-Day Annualized Volatility via STDDEV() Window Frame",
        businessBrief: "Quantitative risk models quantify asset turbulence using 30-day rolling annualized volatility: stddev(daily_return) * sqrt(252). Frame a 30-day window per ticker and round to 4 decimals.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Sliding Window Frames (ROWS BETWEEN 29 PRECEDING AND CURRENT ROW)",
            tip: "Frame a rolling 30-day window using ROWS BETWEEN 29 PRECEDING AND CURRENT ROW."
          },
          {
            sectionKey: "section1",
            label: "Mathematical Functions (SQRT & Rounding)",
            tip: "Multiply daily standard deviation by SQRT(252) to annualize equity volatility."
          }
        ],
        bloopsAdvice: "In equity markets, there are approximately 252 trading days per year. Multiplying the daily standard deviation by SQRT(252) annualizes the metric for risk committee review!",
        schemaSnippet: "AssetDailyReturns(ticker, trade_date, daily_return)",
        targetQuery: "SELECT\n  ticker,\n  trade_date,\n  daily_return,\n  ROUND(STDDEV_SAMP(daily_return) OVER (\n    PARTITION BY ticker\n    ORDER BY trade_date\n    ROWS BETWEEN 29 PRECEDING AND CURRENT ROW\n  ) * SQRT(252), 4) AS annualized_volatility_30d\nFROM AssetDailyReturns;",
        template: [
          { text: "SELECT\n  ticker,\n  trade_date,\n  daily_return,\n  ROUND(", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ SAMPLE STDDEV ]" },
          { text: "(daily_return) OVER (\n    PARTITION BY ticker\n    ORDER BY trade_date\n    ROWS BETWEEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ 30D SLIDING FRAME ]" },
          { text: " AND CURRENT ROW\n  ) * ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ ANNUALIZER ]" },
          { text: "(252), 4) AS annualized_volatility_30d\nFROM AssetDailyReturns;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "STDDEV_SAMP", options: ["STDDEV_SAMP", "VAR_SAMP", "AVG", "MEDIAN"] },
          slot2: { correct: "29 PRECEDING", options: ["29 PRECEDING", "30 PRECEDING", "CURRENT ROW", "UNBOUNDED PRECEDING"] },
          slot3: { correct: "SQRT", options: ["SQRT", "EXP", "LOG", "CBRT"] }
        },
        expectedColumns: ["ticker", "trade_date", "daily_return", "annualized_volatility_30d"]
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
      },
      {
        stepNumber: 4,
        title: "Processing Settlement Latency & Route Slippage via EPOCH Extraction",
        businessBrief: "Dissect transaction latency between customer authorization and acquiring bank settlement. Calculate average settlement delay in hours grouped by payment rail (payment_rail) and acquiring partner (acquirer_code). Flag rails with average delay > 48 hours.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "GROUP BY & Aggregate Filtering with HAVING",
            tip: "Use HAVING to filter aggregated route averages exceeding the 48-hour SLA threshold."
          },
          {
            sectionKey: "section1",
            label: "Timestamp Interval Difference & Math",
            tip: "Extract EPOCH seconds between timestamps and divide by 3600.0 to convert to decimal hours."
          }
        ],
        bloopsAdvice: "Settlement lag traps working capital. Compute the difference between auth_timestamp and settled_timestamp in hours, then filter out the slowest acquiring routes using HAVING!",
        schemaSnippet: "SettledTransactions(txn_id, payment_rail, acquirer_code, auth_timestamp, settled_timestamp, txn_amount)",
        targetQuery: "SELECT\n  payment_rail,\n  acquirer_code,\n  COUNT(*) AS total_settled_txns,\n  ROUND(AVG(EXTRACT(EPOCH FROM (settled_timestamp - auth_timestamp)) / 3600.0), 2) AS avg_settlement_hours,\n  SUM(txn_amount) AS total_volume_settled\nFROM SettledTransactions\nGROUP BY payment_rail, acquirer_code\nHAVING AVG(EXTRACT(EPOCH FROM (settled_timestamp - auth_timestamp)) / 3600.0) > 48.0\nORDER BY avg_settlement_hours DESC;",
        template: [
          { text: "SELECT\n  payment_rail,\n  acquirer_code,\n  COUNT(*) AS total_settled_txns,\n  ROUND(AVG(EXTRACT(", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ TIME FIELD ]" },
          { text: " FROM (settled_timestamp - auth_timestamp)) / 3600.0), 2) AS avg_settlement_hours,\n  SUM(txn_amount) AS total_volume_settled\nFROM SettledTransactions\nGROUP BY payment_rail, acquirer_code\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ AGGREGATE FILTER ]" },
          { text: " AVG(EXTRACT(EPOCH FROM (settled_timestamp - auth_timestamp)) / 3600.0) > 48.0\nORDER BY avg_settlement_hours ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT DIRECTION ]" },
          { text: ";", isBlank: false }
        ],
        slots: {
          slot1: { correct: "EPOCH", options: ["EPOCH", "HOUR", "SECOND", "DAY"] },
          slot2: { correct: "HAVING", options: ["HAVING", "WHERE", "QUALIFY", "ON"] },
          slot3: { correct: "DESC", options: ["DESC", "ASC", "NULLS FIRST", "LIMIT"] }
        },
        expectedColumns: ["payment_rail", "acquirer_code", "total_settled_txns", "avg_settlement_hours", "total_volume_settled"]
      },
      {
        stepNumber: 5,
        title: "Executive Merchant Risk Tiering & Exposure Concentration",
        businessBrief: "The Chief Compliance Officer requires an executive tiering of all active merchants based on monthly dispute ratios and volume. Assign risk tiers ('CRITICAL_RISK', 'HIGH_RISK', 'ACCEPTABLE') and rank merchants by dispute exposure using DENSE_RANK().",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Ranking Window Functions (DENSE_RANK)",
            tip: "Use DENSE_RANK() OVER (ORDER BY dispute_volume DESC) to produce gapless risk rankings."
          },
          {
            sectionKey: "section8",
            label: "Complex Multi-Condition CASE Logic",
            tip: "Evaluate multiple threshold criteria simultaneously with AND/OR within CASE branches."
          }
        ],
        bloopsAdvice: "DENSE_RANK() guarantees consecutive ranking without gaps! Combine it with a clear CASE statement to categorize merchants for immediate account freezes or enhanced underwriting.",
        schemaSnippet: "MerchantMonthlySummary(merchant_id, merchant_name, monthly_gmv, dispute_volume, dispute_pct)",
        targetQuery: "SELECT\n  merchant_id,\n  merchant_name,\n  monthly_gmv,\n  dispute_volume,\n  dispute_pct,\n  DENSE_RANK() OVER (ORDER BY dispute_volume DESC) AS risk_rank,\n  CASE\n    WHEN dispute_pct >= 1.50 AND dispute_volume > 10000 THEN 'CRITICAL_RISK'\n    WHEN dispute_pct >= 1.00 OR dispute_volume > 5000 THEN 'HIGH_RISK'\n    ELSE 'ACCEPTABLE'\n  END AS compliance_tier\nFROM MerchantMonthlySummary\nORDER BY risk_rank ASC;",
        template: [
          { text: "SELECT\n  merchant_id,\n  merchant_name,\n  monthly_gmv,\n  dispute_volume,\n  dispute_pct,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ DENSE RANK FUNC ]" },
          { text: "() ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ WINDOW SPEC ]" },
          { text: " (ORDER BY dispute_volume DESC) AS risk_rank,\n  CASE\n    WHEN dispute_pct >= 1.50 AND dispute_volume > 10000 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ CRITICAL TIER ]" },
          { text: "\n    WHEN dispute_pct >= 1.00 OR dispute_volume > 5000 THEN 'HIGH_RISK'\n    ELSE 'ACCEPTABLE'\n  END AS compliance_tier\nFROM MerchantMonthlySummary\nORDER BY risk_rank ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "DENSE_RANK", options: ["DENSE_RANK", "RANK", "ROW_NUMBER", "NTILE"] },
          slot2: { correct: "OVER", options: ["OVER", "PARTITION", "WINDOW", "GROUP"] },
          slot3: { correct: "'CRITICAL_RISK'", options: ["'CRITICAL_RISK'", "'ACCEPTABLE'", "'UNKNOWN'", "'SAFE'"] }
        },
        expectedColumns: ["merchant_id", "merchant_name", "monthly_gmv", "dispute_volume", "dispute_pct", "risk_rank", "compliance_tier"]
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
      },
      {
        stepNumber: 3,
        title: "Pass-Through Mule Account Velocity & Fund Drain Detection",
        businessBrief: "Money mules receive illegal incoming wire deposits and immediately drain > 90% of the funds via outgoing wires within 30 minutes. Find all account transactions where an outgoing wire follows an incoming wire within 30 minutes and drains >= 90% of the inflow.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Window Function LAG() Across Transaction Feeds",
            tip: "Use LAG() to compare outgoing wire parameters against the immediately preceding inbound deposit."
          },
          {
            sectionKey: "section8",
            label: "CASE & Mathematical Ratios",
            tip: "Calculate drain percentage with ROUND(wire_amount * 100.0 / NULLIF(prev_inbound_amount, 0), 2)."
          }
        ],
        bloopsAdvice: "Launderers cannot let stolen funds sit in intermediate accounts. LAG() looks at the immediately preceding credit transaction and compares timestamps and balances!",
        schemaSnippet: "AccountWireStream(account_id, wire_id, direction ['INBOUND', 'OUTBOUND'], wire_amount, wire_timestamp)",
        targetQuery: "WITH SequencedWires AS (\n  SELECT\n    account_id,\n    wire_id,\n    direction,\n    wire_amount,\n    wire_timestamp,\n    LAG(direction, 1) OVER (PARTITION BY account_id ORDER BY wire_timestamp) AS prev_direction,\n    LAG(wire_amount, 1) OVER (PARTITION BY account_id ORDER BY wire_timestamp) AS prev_inbound_amount,\n    LAG(wire_timestamp, 1) OVER (PARTITION BY account_id ORDER BY wire_timestamp) AS prev_inbound_time\n  FROM AccountWireStream\n)\nSELECT\n  account_id,\n  wire_id AS drain_wire_id,\n  wire_amount AS drain_amount,\n  prev_inbound_amount,\n  ROUND(wire_amount * 100.0 / NULLIF(prev_inbound_amount, 0), 2) AS drain_pct\nFROM SequencedWires\nWHERE direction = 'OUTBOUND'\n  AND prev_direction = 'INBOUND'\n  AND (wire_timestamp - prev_inbound_time) <= INTERVAL '30 minutes'\n  AND (wire_amount / NULLIF(prev_inbound_amount, 0)) >= 0.90;",
        template: [
          { text: "WITH SequencedWires AS (\n  SELECT\n    account_id,\n    wire_id,\n    direction,\n    wire_amount,\n    wire_timestamp,\n    LAG(direction, 1) OVER (", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ PARTITION CLAUSE ]" },
          { text: " account_id ORDER BY wire_timestamp) AS prev_direction,\n    LAG(wire_amount, 1) OVER (PARTITION BY account_id ORDER BY wire_timestamp) AS prev_inbound_amount,\n    LAG(wire_timestamp, 1) OVER (PARTITION BY account_id ORDER BY wire_timestamp) AS prev_inbound_time\n  FROM AccountWireStream\n)\nSELECT\n  account_id,\n  wire_id AS drain_wire_id,\n  wire_amount AS drain_amount,\n  prev_inbound_amount,\n  ROUND(wire_amount * 100.0 / NULLIF(prev_inbound_amount, 0), 2) AS drain_pct\nFROM SequencedWires\nWHERE direction = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DRAIN DIRECTION ]" },
          { text: "\n  AND prev_direction = 'INBOUND'\n  AND (wire_timestamp - prev_inbound_time) <= ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ TIME INTERVAL ]" },
          { text: "\n  AND (wire_amount / NULLIF(prev_inbound_amount, 0)) >= 0.90;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "PARTITION BY", options: ["PARTITION BY", "GROUP BY", "ORDER BY", "CLUSTER BY"] },
          slot2: { correct: "'OUTBOUND'", options: ["'OUTBOUND'", "'INBOUND'", "'PENDING'", "'INTERNAL'"] },
          slot3: { correct: "INTERVAL '30 minutes'", options: ["INTERVAL '30 minutes'", "INTERVAL '24 hours'", "30", "'30m'"] }
        },
        expectedColumns: ["account_id", "drain_wire_id", "drain_amount", "prev_inbound_amount", "drain_pct"]
      },
      {
        stepNumber: 4,
        title: "Synthetic Identity Clustering by Shared Digital Fingerprints",
        businessBrief: "Organized fraud syndicates open multiple fake bank accounts using stolen identities originating from the same browser fingerprint, IP subnet, or hardware device hash. Uncover identity clusters where 3 or more distinct account IDs share the exact same device fingerprint.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "COUNT(DISTINCT) with GROUP BY",
            tip: "Use COUNT(DISTINCT account_id) to count unique accounts linked to each fingerprint."
          },
          {
            sectionKey: "section4",
            label: "HAVING Filters on Cardinality",
            tip: "Filter grouped clusters in HAVING: HAVING COUNT(DISTINCT account_id) >= 3."
          }
        ],
        bloopsAdvice: "If 10 different people with 10 different SSNs all log in from the same machine hash, you just discovered a synthetic fraud farm! Use COUNT(DISTINCT account_id) in HAVING.",
        schemaSnippet: "AccountLoginTelemetry(account_id, customer_name, device_fingerprint, ip_address, login_timestamp)",
        targetQuery: "SELECT\n  device_fingerprint,\n  COUNT(DISTINCT account_id) AS linked_account_count,\n  COUNT(*) AS total_login_events,\n  MIN(login_timestamp) AS first_observed_login,\n  MAX(login_timestamp) AS latest_observed_login\nFROM AccountLoginTelemetry\nGROUP BY device_fingerprint\nHAVING COUNT(DISTINCT account_id) >= 3\nORDER BY linked_account_count DESC;",
        template: [
          { text: "SELECT\n  device_fingerprint,\n  COUNT(", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ DEDUP CLAUSE ]" },
          { text: " account_id) AS linked_account_count,\n  COUNT(*) AS total_login_events,\n  MIN(login_timestamp) AS first_observed_login,\n  MAX(login_timestamp) AS latest_observed_login\nFROM AccountLoginTelemetry\nGROUP BY device_fingerprint\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ GROUP FILTER ]" },
          { text: " COUNT(DISTINCT account_id) ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ CARDINALITY OP ]" },
          { text: " 3\nORDER BY linked_account_count DESC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "DISTINCT", options: ["DISTINCT", "ALL", "UNIQUE", "EXACT"] },
          slot2: { correct: "HAVING", options: ["HAVING", "WHERE", "QUALIFY", "LIMIT"] },
          slot3: { correct: ">=", options: [">=", "<=", "=", "!="] }
        },
        expectedColumns: ["device_fingerprint", "linked_account_count", "total_login_events", "first_observed_login", "latest_observed_login"]
      },
      {
        stepNumber: 5,
        title: "SAR Prioritization Queue & Regulatory Investigation Dossier",
        businessBrief: "Financial intelligence analysts must review hundreds of fraud flags daily. Synthesize structured deposits, circular wires, and device clusters into a unified FinCEN SAR queue. Rank suspicious entities by total laundering volume using DENSE_RANK() and categorize urgency.",
        prerequisites: [
          {
            sectionKey: "section7",
            label: "Common Table Expressions & Window Functions",
            tip: "Structure entity risk metrics cleanly before applying ranking windows."
          },
          {
            sectionKey: "section6",
            label: "Ranking Windows (DENSE_RANK & OVER)",
            tip: "Rank high-dollar laundering entities at the top with DENSE_RANK() OVER (ORDER BY suspicious_volume_usd DESC)."
          }
        ],
        bloopsAdvice: "Regulators require high-severity cases to be filed within 30 calendar days. Prioritize the highest-dollar laundering networks at the top of the investigative queue!",
        schemaSnippet: "SuspiciousEntityPool(entity_id, entity_name, entity_type, suspicious_volume_usd, primary_typology)",
        targetQuery: "SELECT\n  entity_id,\n  entity_name,\n  primary_typology,\n  suspicious_volume_usd,\n  DENSE_RANK() OVER (ORDER BY suspicious_volume_usd DESC) AS filing_priority_rank,\n  CASE\n    WHEN suspicious_volume_usd >= 1000000 THEN 'TIER_1_EXPEDITE_24H'\n    WHEN suspicious_volume_usd >= 250000 THEN 'TIER_2_PRIORITY_7D'\n    ELSE 'TIER_3_ROUTINE_30D'\n  END AS filing_sla_urgency\nFROM SuspiciousEntityPool\nORDER BY filing_priority_rank ASC;",
        template: [
          { text: "SELECT\n  entity_id,\n  entity_name,\n  primary_typology,\n  suspicious_volume_usd,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ DENSE RANK FUNC ]" },
          { text: "() OVER (ORDER BY suspicious_volume_usd ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ RANK DIRECTION ]" },
          { text: ") AS filing_priority_rank,\n  CASE\n    WHEN suspicious_volume_usd >= 1000000 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ URGENT SLA ]" },
          { text: "\n    WHEN suspicious_volume_usd >= 250000 THEN 'TIER_2_PRIORITY_7D'\n    ELSE 'TIER_3_ROUTINE_30D'\n  END AS filing_sla_urgency\nFROM SuspiciousEntityPool\nORDER BY filing_priority_rank ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "DENSE_RANK", options: ["DENSE_RANK", "RANK", "ROW_NUMBER", "CUME_DIST"] },
          slot2: { correct: "DESC", options: ["DESC", "ASC", "NULLS LAST", "LIMIT"] },
          slot3: { correct: "'TIER_1_EXPEDITE_24H'", options: ["'TIER_1_EXPEDITE_24H'", "'ROUTINE'", "'LOW'", "'CLOSED'"] }
        },
        expectedColumns: ["entity_id", "entity_name", "primary_typology", "suspicious_volume_usd", "filing_priority_rank", "filing_sla_urgency"]
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
      },
      {
        stepNumber: 4,
        title: "Monthly Executive MRR Bridge & Net New MRR Aggregation",
        businessBrief: "Construct the executive MRR bridge reported to the Board of Directors: For each calendar month, aggregate New MRR, Expansion MRR, Contraction MRR, and Churn MRR, and calculate Net New MRR.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "Conditional Aggregations (SUM + CASE)",
            tip: "Use SUM(CASE WHEN mrr_category = 'NEW' THEN active_mrr ELSE 0 END) to roll up category deltas."
          },
          {
            sectionKey: "section3",
            label: "Chronological ORDER BY",
            tip: "Sort monthly financial summaries chronologically with ORDER BY month_start_date ASC."
          }
        ],
        bloopsAdvice: "The Board doesn't look at individual customer rows; they want one row per month showing how each component of the waterfall moved the business forward!",
        schemaSnippet: "CustomerMonthlyMRRWaterfall(customer_id, month_start_date, active_mrr, prior_mrr, mrr_category)",
        targetQuery: "SELECT\n  month_start_date,\n  SUM(CASE WHEN mrr_category = 'NEW' THEN active_mrr ELSE 0 END) AS new_mrr,\n  SUM(CASE WHEN mrr_category = 'EXPANSION' THEN (active_mrr - prior_mrr) ELSE 0 END) AS expansion_mrr,\n  SUM(CASE WHEN mrr_category = 'CONTRACTION' THEN (prior_mrr - active_mrr) ELSE 0 END) AS contraction_mrr,\n  SUM(CASE WHEN mrr_category = 'CHURN' THEN prior_mrr ELSE 0 END) AS churn_mrr,\n  (\n    SUM(CASE WHEN mrr_category = 'NEW' THEN active_mrr ELSE 0 END) +\n    SUM(CASE WHEN mrr_category = 'EXPANSION' THEN (active_mrr - prior_mrr) ELSE 0 END) -\n    SUM(CASE WHEN mrr_category = 'CONTRACTION' THEN (prior_mrr - active_mrr) ELSE 0 END) -\n    SUM(CASE WHEN mrr_category = 'CHURN' THEN prior_mrr ELSE 0 END)\n  ) AS net_new_mrr\nFROM CustomerMonthlyMRRWaterfall\nGROUP BY month_start_date\nORDER BY month_start_date ASC;",
        template: [
          { text: "SELECT\n  month_start_date,\n  SUM(CASE WHEN mrr_category = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ NEW TAG ]" },
          { text: " THEN active_mrr ELSE 0 END) AS new_mrr,\n  SUM(CASE WHEN mrr_category = 'EXPANSION' THEN (active_mrr - prior_mrr) ELSE 0 END) AS expansion_mrr,\n  SUM(CASE WHEN mrr_category = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ CONTRACTION TAG ]" },
          { text: " THEN (prior_mrr - active_mrr) ELSE 0 END) AS contraction_mrr,\n  SUM(CASE WHEN mrr_category = 'CHURN' THEN prior_mrr ELSE 0 END) AS churn_mrr,\n  (\n    SUM(CASE WHEN mrr_category = 'NEW' THEN active_mrr ELSE 0 END) +\n    SUM(CASE WHEN mrr_category = 'EXPANSION' THEN (active_mrr - prior_mrr) ELSE 0 END) -\n    SUM(CASE WHEN mrr_category = 'CONTRACTION' THEN (prior_mrr - active_mrr) ELSE 0 END) -\n    SUM(CASE WHEN mrr_category = 'CHURN' THEN prior_mrr ELSE 0 END)\n  ) AS net_new_mrr\nFROM CustomerMonthlyMRRWaterfall\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ GROUPING CLAUSE ]" },
          { text: " month_start_date\nORDER BY month_start_date ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "'NEW'", options: ["'NEW'", "'EXPANSION'", "'CHURN'", "'RETAINED'"] },
          slot2: { correct: "'CONTRACTION'", options: ["'CONTRACTION'", "'DOWNSELL'", "'LOST'", "'DROP'"] },
          slot3: { correct: "GROUP BY", options: ["GROUP BY", "ORDER BY", "PARTITION BY", "CLUSTER BY"] }
        },
        expectedColumns: ["month_start_date", "new_mrr", "expansion_mrr", "contraction_mrr", "churn_mrr", "net_new_mrr"]
      },
      {
        stepNumber: 5,
        title: "SaaS Quick Ratio & Net Revenue Retention (NRR) Valuation Engine",
        businessBrief: "Compute SaaS valuation multiple drivers: SaaS Quick Ratio = (New MRR + Expansion MRR) / (Contraction MRR + Churn MRR) and Net Revenue Retention % (NRR). Benchmark companies against the top-quartile Quick Ratio benchmark of >= 4.0.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "Safe Math with NULLIF in Financial Metrics",
            tip: "Protect against division-by-zero when churn or starting revenue is 0."
          },
          {
            sectionKey: "section8",
            label: "CASE WHEN Health Grading",
            tip: "Grade growth efficiency into TOP_QUARTILE_EFFICIENCY, HEALTHY_GROWTH, or ELEVATED_CHURN_DRAG."
          }
        ],
        bloopsAdvice: "Venture capitalists evaluate the SaaS Quick Ratio: if it's > 4.0, your growth is outrunning churn by 4x! Always wrap the denominator in NULLIF to prevent division by 0.",
        schemaSnippet: "ExecutiveMonthlyBridge(month_start_date, starting_mrr, new_mrr, expansion_mrr, contraction_mrr, churn_mrr, ending_mrr)",
        targetQuery: "SELECT\n  month_start_date,\n  starting_mrr,\n  ending_mrr,\n  ROUND((new_mrr + expansion_mrr) / NULLIF(contraction_mrr + churn_mrr, 0), 2) AS saas_quick_ratio,\n  ROUND((starting_mrr + expansion_mrr - contraction_mrr - churn_mrr) * 100.0 / NULLIF(starting_mrr, 0), 2) AS nrr_percentage,\n  CASE\n    WHEN (new_mrr + expansion_mrr) / NULLIF(contraction_mrr + churn_mrr, 0) >= 4.0 THEN 'TOP_QUARTILE_EFFICIENCY'\n    WHEN (new_mrr + expansion_mrr) / NULLIF(contraction_mrr + churn_mrr, 0) >= 2.0 THEN 'HEALTHY_GROWTH'\n    ELSE 'ELEVATED_CHURN_DRAG'\n  END AS growth_efficiency_band\nFROM ExecutiveMonthlyBridge\nORDER BY month_start_date ASC;",
        template: [
          { text: "SELECT\n  month_start_date,\n  starting_mrr,\n  ending_mrr,\n  ROUND((new_mrr + expansion_mrr) / ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ SAFE DIVISOR ]" },
          { text: "(contraction_mrr + churn_mrr, 0), 2) AS saas_quick_ratio,\n  ROUND((starting_mrr + expansion_mrr - contraction_mrr - churn_mrr) * ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ PERCENT SCALE ]" },
          { text: " / NULLIF(starting_mrr, 0), 2) AS nrr_percentage,\n  CASE\n    WHEN (new_mrr + expansion_mrr) / NULLIF(contraction_mrr + churn_mrr, 0) >= 4.0 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ EFFICIENCY STATUS ]" },
          { text: "\n    WHEN (new_mrr + expansion_mrr) / NULLIF(contraction_mrr + churn_mrr, 0) >= 2.0 THEN 'HEALTHY_GROWTH'\n    ELSE 'ELEVATED_CHURN_DRAG'\n  END AS growth_efficiency_band\nFROM ExecutiveMonthlyBridge\nORDER BY month_start_date ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "NULLIF", options: ["NULLIF", "COALESCE", "IFNULL", "NVL"] },
          slot2: { correct: "100.0", options: ["100.0", "1.0", "1000", "10"] },
          slot3: { correct: "'TOP_QUARTILE_EFFICIENCY'", options: ["'TOP_QUARTILE_EFFICIENCY'", "'POOR'", "'UNHEALTHY'", "'FAILED'"] }
        },
        expectedColumns: ["month_start_date", "starting_mrr", "ending_mrr", "saas_quick_ratio", "nrr_percentage", "growth_efficiency_band"]
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
      },
      {
        stepNumber: 3,
        title: "Triangular Customer Retention Matrix & Cohort Decay Curves",
        businessBrief: "Calculate retention curves: For every acquisition cohort and relative month index, count active customers and calculate Retention Rate % relative to Month 0 starting cohort size.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "FIRST_VALUE() Window Function Across Partitions",
            tip: "Use FIRST_VALUE(active_users) OVER (PARTITION BY cohort_month ORDER BY month_index ASC) to anchor Month 0 cohort size."
          },
          {
            sectionKey: "section4",
            label: "Aggregations with Math Normalization",
            tip: "Divide active users by Month 0 initial cohort size and multiply by 100.0."
          }
        ],
        bloopsAdvice: "FIRST_VALUE() anchors your percentage to Month 0's initial cohort headcount so you can see whether 80%, 60%, or 40% of customers stay active in Month 12!",
        schemaSnippet: "CustomerCohortMonthly(customer_id, cohort_month, month_index)",
        targetQuery: "WITH CohortCounts AS (\n  SELECT\n    cohort_month,\n    month_index,\n    COUNT(DISTINCT customer_id) AS active_users\n  FROM CustomerCohortMonthly\n  GROUP BY cohort_month, month_index\n)\nSELECT\n  cohort_month,\n  month_index,\n  active_users,\n  FIRST_VALUE(active_users) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n  ) AS initial_cohort_size,\n  ROUND(active_users * 100.0 / FIRST_VALUE(active_users) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n  ), 2) AS retention_rate_pct\nFROM CohortCounts\nORDER BY cohort_month ASC, month_index ASC;",
        template: [
          { text: "WITH CohortCounts AS (\n  SELECT\n    cohort_month,\n    month_index,\n    ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ USER COUNT ]" },
          { text: "(DISTINCT customer_id) AS active_users\n  FROM CustomerCohortMonthly\n  GROUP BY cohort_month, month_index\n)\nSELECT\n  cohort_month,\n  month_index,\n  active_users,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ FIRST VALUE FUNC ]" },
          { text: "(active_users) OVER (\n    ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ PARTITION CLAUSE ]" },
          { text: " cohort_month\n    ORDER BY month_index ASC\n  ) AS initial_cohort_size,\n  ROUND(active_users * 100.0 / FIRST_VALUE(active_users) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n  ), 2) AS retention_rate_pct\nFROM CohortCounts\nORDER BY cohort_month ASC, month_index ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "COUNT", options: ["COUNT", "SUM", "AVG", "MAX"] },
          slot2: { correct: "FIRST_VALUE", options: ["FIRST_VALUE", "LAST_VALUE", "LAG", "LEAD"] },
          slot3: { correct: "PARTITION BY", options: ["PARTITION BY", "GROUP BY", "ORDER BY", "CLUSTER BY"] }
        },
        expectedColumns: ["cohort_month", "month_index", "active_users", "initial_cohort_size", "retention_rate_pct"]
      },
      {
        stepNumber: 4,
        title: "Net Dollar Retention (NDR) Expansion Curve & Smile Curves",
        businessBrief: "In world-class enterprise SaaS (e.g. Snowflake, Datadog), cohorts demonstrate 'Net Negative Churn' (NDR > 100%), where expansion from retained accounts exceeds lost churn. Compute cohort NDR % over time.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Window Framing & Normalization",
            tip: "Compare total_mrr against Month 0 revenue using FIRST_VALUE()."
          },
          {
            sectionKey: "section4",
            label: "SUM Aggregations with Ratio Scaling",
            tip: "Protect ratio calculations with NULLIF(..., 0)."
          }
        ],
        bloopsAdvice: "Even if 20% of users churn, if remaining users expand their contract value by 50%, NDR is 130%! This 'smile curve' is what makes SaaS companies billion-dollar public market darlings.",
        schemaSnippet: "CohortRevenueMonthly(cohort_month, month_index, total_mrr)",
        targetQuery: "SELECT\n  cohort_month,\n  month_index,\n  total_mrr,\n  FIRST_VALUE(total_mrr) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n  ) AS month_0_mrr,\n  ROUND(total_mrr * 100.0 / NULLIF(FIRST_VALUE(total_mrr) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n  ), 0), 2) AS ndr_percentage\nFROM CohortRevenueMonthly\nORDER BY cohort_month ASC, month_index ASC;",
        template: [
          { text: "SELECT\n  cohort_month,\n  month_index,\n  total_mrr,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ BASE VALUE FUNC ]" },
          { text: "(total_mrr) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n  ) AS month_0_mrr,\n  ROUND(total_mrr * 100.0 / ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ SAFE ZERO DIVISOR ]" },
          { text: "(FIRST_VALUE(total_mrr) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n  ), 0), 2) AS ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ COLUMN ALIAS ]" },
          { text: "\nFROM CohortRevenueMonthly\nORDER BY cohort_month ASC, month_index ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "FIRST_VALUE", options: ["FIRST_VALUE", "NTH_VALUE", "MIN", "MAX"] },
          slot2: { correct: "NULLIF", options: ["NULLIF", "COALESCE", "ISNULL", "NVL"] },
          slot3: { correct: "ndr_percentage", options: ["ndr_percentage", "loss_percentage", "raw_mrr", "growth_delta"] }
        },
        expectedColumns: ["cohort_month", "month_index", "total_mrr", "month_0_mrr", "ndr_percentage"]
      },
      {
        stepNumber: 5,
        title: "LTV / CAC Payback Period & Unit Economics Break-Even Engine",
        businessBrief: "Merge cumulative cohort gross margin profits with blended Customer Acquisition Cost ($CAC). Calculate the exact cumulative payback curve per customer and identify when cumulative Gross Profit exceeds CAC ($6,000 benchmark).",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Cumulative Running Totals (SUM OVER UNBOUNDED PRECEDING)",
            tip: "Accumulate gross profits over time using SUM() OVER (PARTITION BY cohort_month ORDER BY month_index ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)."
          },
          {
            sectionKey: "section8",
            label: "CASE WHEN Payback Milestones",
            tip: "Tag the milestone when cumulative GP >= blended_cac."
          }
        ],
        bloopsAdvice: "Running cumulative SUM() over month_index tracks cumulative gross profit recovered from the customer. Once cumulative GP >= CAC, the customer is fully paid off and pure profit begins!",
        schemaSnippet: "CohortUnitEconomics(cohort_month, month_index, blended_cac, monthly_gross_profit_per_customer)",
        targetQuery: "SELECT\n  cohort_month,\n  month_index,\n  blended_cac,\n  monthly_gross_profit_per_customer,\n  SUM(monthly_gross_profit_per_customer) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS cumulative_gp_per_customer,\n  CASE\n    WHEN SUM(monthly_gross_profit_per_customer) OVER (\n      PARTITION BY cohort_month\n      ORDER BY month_index ASC\n      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n    ) >= blended_cac THEN 'CAC_REPAID_PROFITABLE'\n    ELSE 'PAYBACK_IN_PROGRESS'\n  END AS payback_status\nFROM CohortUnitEconomics\nORDER BY cohort_month ASC, month_index ASC;",
        template: [
          { text: "SELECT\n  cohort_month,\n  month_index,\n  blended_cac,\n  monthly_gross_profit_per_customer,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ RUNNING ACCUMULATOR ]" },
          { text: "(monthly_gross_profit_per_customer) OVER (\n    PARTITION BY cohort_month\n    ORDER BY month_index ASC\n    ROWS BETWEEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ FRAME START ]" },
          { text: " AND CURRENT ROW\n  ) AS cumulative_gp_per_customer,\n  CASE\n    WHEN SUM(monthly_gross_profit_per_customer) OVER (\n      PARTITION BY cohort_month\n      ORDER BY month_index ASC\n      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n    ) >= blended_cac THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ PROFIT STATUS ]" },
          { text: "\n    ELSE 'PAYBACK_IN_PROGRESS'\n  END AS payback_status\nFROM CohortUnitEconomics\nORDER BY cohort_month ASC, month_index ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "SUM", options: ["SUM", "AVG", "MAX", "COUNT"] },
          slot2: { correct: "UNBOUNDED PRECEDING", options: ["UNBOUNDED PRECEDING", "CURRENT ROW", "1 PRECEDING", "FOLLOWING"] },
          slot3: { correct: "'CAC_REPAID_PROFITABLE'", options: ["'CAC_REPAID_PROFITABLE'", "'DEFICIT'", "'BANKRUPT'", "'PENDING'"] }
        },
        expectedColumns: ["cohort_month", "month_index", "blended_cac", "monthly_gross_profit_per_customer", "cumulative_gp_per_customer", "payback_status"]
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
      },
      {
        stepNumber: 3,
        title: "Claim Denial Root-Cause Pareto Distribution (80/20 Rule)",
        businessBrief: "Health insurers and hospital billing offices use Pareto analysis (80/20 rule) to eliminate denial drivers. Aggregate total denied dollar volume by CARC (Claim Adjustment Reason Code), compute each code's percentage of total denials, and calculate the running cumulative percentage.",
        prerequisites: [
          {
            sectionKey: "section6",
            label: "Window Function SUM() OVER () for Global Denominators",
            tip: "Use SUM(total_denied_amount) OVER () with empty parenthesis as the global denominator."
          },
          {
            sectionKey: "section6",
            label: "Cumulative Running Totals with ORDER BY",
            tip: "Use SUM(...) OVER (ORDER BY total_denied_amount DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) to track the cumulative running total."
          }
        ],
        bloopsAdvice: "Notice the difference between SUM(denied_amount) OVER () [global total] and SUM(denied_amount) OVER (ORDER BY denied_amount DESC) [running cumulative total]! Dividing them gives the exact Pareto curve.",
        schemaSnippet: "DeniedClaimsLog(claim_id, denial_code, denial_reason, denied_amount)",
        targetQuery: "WITH DenialAggs AS (\n  SELECT\n    denial_code,\n    denial_reason,\n    SUM(denied_amount) AS total_denied_amount\n  FROM DeniedClaimsLog\n  GROUP BY denial_code, denial_reason\n)\nSELECT\n  denial_code,\n  denial_reason,\n  total_denied_amount,\n  ROUND(total_denied_amount * 100.0 / SUM(total_denied_amount) OVER (), 2) AS pct_of_total_denials,\n  ROUND(SUM(total_denied_amount) OVER (\n    ORDER BY total_denied_amount DESC\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) * 100.0 / SUM(total_denied_amount) OVER (), 2) AS cumulative_pareto_pct\nFROM DenialAggs\nORDER BY total_denied_amount DESC;",
        template: [
          { text: "WITH DenialAggs AS (\n  SELECT\n    denial_code,\n    denial_reason,\n    SUM(denied_amount) AS total_denied_amount\n  FROM DeniedClaimsLog\n  GROUP BY denial_code, denial_reason\n)\nSELECT\n  denial_code,\n  denial_reason,\n  total_denied_amount,\n  ROUND(total_denied_amount * 100.0 / SUM(total_denied_amount) ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ GLOBAL WINDOW ]" },
          { text: ", 2) AS pct_of_total_denials,\n  ROUND(SUM(total_denied_amount) OVER (\n    ORDER BY total_denied_amount ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ SORT DIRECTION ]" },
          { text: "\n    ROWS BETWEEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ FRAME START ]" },
          { text: " AND CURRENT ROW\n  ) * 100.0 / SUM(total_denied_amount) OVER (), 2) AS cumulative_pareto_pct\nFROM DenialAggs\nORDER BY total_denied_amount DESC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "OVER ()", options: ["OVER ()", "OVER (PARTITION BY denial_code)", "GROUP BY", "WHERE"] },
          slot2: { correct: "DESC", options: ["DESC", "ASC", "NULLS LAST", "LIMIT"] },
          slot3: { correct: "UNBOUNDED PRECEDING", options: ["UNBOUNDED PRECEDING", "CURRENT ROW", "1 PRECEDING", "FOLLOWING"] }
        },
        expectedColumns: ["denial_code", "denial_reason", "total_denied_amount", "pct_of_total_denials", "cumulative_pareto_pct"]
      },
      {
        stepNumber: 4,
        title: "Out-of-Network (OON) Surprise Billing Markup vs. CMS Benchmark",
        businessBrief: "Under the federal No Surprises Act, providers cannot arbitrarily bill patients exorbitant rates. Join patient claims against the CMS Medicare Maximum Allowable Fee Schedule to identify predatory billing markups where billed charges exceed 400% of the Medicare benchmark.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "INNER JOIN on Clinical Procedure Codes (CPT/HCPCS)",
            tip: "Join ProviderBilledProcedures to CmsFeeSchedule on procedure_code."
          },
          {
            sectionKey: "section8",
            label: "CASE WHEN Regulatory Audit Flags",
            tip: "Tag predatory surprise bills when billed_amount >= 4.0 * medicare_allowable_rate."
          }
        ],
        bloopsAdvice: "Medicare publishes the national gold standard benchmark for what medical procedures actually cost. Joining on procedure_code lets us flag providers price-gouging patients!",
        schemaSnippet: "ProviderBilledProcedures(claim_id, provider_id, procedure_code, charged_amount), CmsFeeSchedule(procedure_code, medicare_allowable_rate)",
        targetQuery: "SELECT\n  p.claim_id,\n  p.provider_id,\n  p.procedure_code,\n  p.charged_amount,\n  c.medicare_allowable_rate,\n  ROUND(p.charged_amount / NULLIF(c.medicare_allowable_rate, 0), 2) AS markup_multiple,\n  CASE\n    WHEN (p.charged_amount / NULLIF(c.medicare_allowable_rate, 0)) >= 4.0 THEN 'PREDATORY_SURPRISE_BILL'\n    WHEN (p.charged_amount / NULLIF(c.medicare_allowable_rate, 0)) >= 2.0 THEN 'ELEVATED_COMMERCIAL_MARKUP'\n    ELSE 'FAIR_MARKET_BENCHMARK'\n  END AS billing_audit_flag\nFROM ProviderBilledProcedures p\nJOIN CmsFeeSchedule c\n  ON p.procedure_code = c.procedure_code\nORDER BY markup_multiple DESC;",
        template: [
          { text: "SELECT\n  p.claim_id,\n  p.provider_id,\n  p.procedure_code,\n  p.charged_amount,\n  c.medicare_allowable_rate,\n  ROUND(p.charged_amount / NULLIF(c.medicare_allowable_rate, 0), 2) AS markup_multiple,\n  CASE\n    WHEN (p.charged_amount / NULLIF(c.medicare_allowable_rate, 0)) >= 4.0 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ PREDATORY FLAG ]" },
          { text: "\n    WHEN (p.charged_amount / NULLIF(c.medicare_allowable_rate, 0)) >= 2.0 THEN 'ELEVATED_COMMERCIAL_MARKUP'\n    ELSE 'FAIR_MARKET_BENCHMARK'\n  END AS billing_audit_flag\nFROM ProviderBilledProcedures p\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ JOIN SPEC ]" },
          { text: " CmsFeeSchedule c\n  ON p.procedure_code = c.procedure_code\nORDER BY ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT COLUMN ]" },
          { text: " DESC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "'PREDATORY_SURPRISE_BILL'", options: ["'PREDATORY_SURPRISE_BILL'", "'STANDARD'", "'DISCOUNTED'", "'FREE'"] },
          slot2: { correct: "JOIN", options: ["JOIN", "LEFT JOIN", "CROSS JOIN", "FULL JOIN"] },
          slot3: { correct: "markup_multiple", options: ["markup_multiple", "charged_amount", "claim_id", "procedure_code"] }
        },
        expectedColumns: ["claim_id", "provider_id", "procedure_code", "charged_amount", "medicare_allowable_rate", "markup_multiple", "billing_audit_flag"]
      },
      {
        stepNumber: 5,
        title: "Executive Payer Adjudication Funnel & First-Pass Clean Claim Rate (CCR)",
        businessBrief: "Healthcare CFOs track the First-Pass Clean Claim Rate (CCR): Percentage of submitted claims adjudicated and paid without rejection, denial, or manual rework. Construct a comprehensive department summary.",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "Multi-Condition CASE Aggregations",
            tip: "Use COUNT(CASE WHEN adjudication_status = 'PAID_FIRST_PASS' THEN 1 END) to isolate first-pass approvals."
          },
          {
            sectionKey: "section4",
            label: "High-Precision Division with Safe Defaults",
            tip: "Prevent divide-by-zero using NULLIF(COUNT(*), 0)."
          }
        ],
        bloopsAdvice: "First-Pass Clean Claim Rate above 95% indicates an elite revenue cycle operations team. Conditional aggregations allow you to build the entire dashboard in one query!",
        schemaSnippet: "ClaimsAdjudicationEvents(claim_id, billing_department, adjudication_status ['PAID_FIRST_PASS', 'DENIED', 'REWORKED_APPEALED'], paid_amount)",
        targetQuery: "SELECT\n  billing_department,\n  COUNT(*) AS total_claims_submitted,\n  COUNT(CASE WHEN adjudication_status = 'PAID_FIRST_PASS' THEN 1 END) AS clean_first_pass_claims,\n  COUNT(CASE WHEN adjudication_status = 'DENIED' THEN 1 END) AS denied_claims,\n  ROUND(\n    COUNT(CASE WHEN adjudication_status = 'PAID_FIRST_PASS' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0),\n    2\n  ) AS clean_claim_rate_pct,\n  SUM(paid_amount) AS total_disbursed_usd\nFROM ClaimsAdjudicationEvents\nGROUP BY billing_department\nORDER BY clean_claim_rate_pct DESC;",
        template: [
          { text: "SELECT\n  billing_department,\n  COUNT(*) AS total_claims_submitted,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ AGGREGATE FUNC ]" },
          { text: "(CASE WHEN adjudication_status = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ CLEAN STATUS ]" },
          { text: " THEN 1 END) AS clean_first_pass_claims,\n  COUNT(CASE WHEN adjudication_status = 'DENIED' THEN 1 END) AS denied_claims,\n  ROUND(\n    COUNT(CASE WHEN adjudication_status = 'PAID_FIRST_PASS' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0),\n    2\n  ) AS clean_claim_rate_pct,\n  SUM(paid_amount) AS total_disbursed_usd\nFROM ClaimsAdjudicationEvents\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ GROUPING CLAUSE ]" },
          { text: " billing_department\nORDER BY clean_claim_rate_pct DESC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "COUNT", options: ["COUNT", "SUM", "AVG", "TOTAL"] },
          slot2: { correct: "'PAID_FIRST_PASS'", options: ["'PAID_FIRST_PASS'", "'DENIED'", "'PENDING'", "'VOID'"] },
          slot3: { correct: "GROUP BY", options: ["GROUP BY", "ORDER BY", "PARTITION BY", "WINDOW"] }
        },
        expectedColumns: ["billing_department", "total_claims_submitted", "clean_first_pass_claims", "denied_claims", "clean_claim_rate_pct", "total_disbursed_usd"]
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
      },
      {
        stepNumber: 2,
        title: "Patient Length of Stay (LOS) & Outlier Deviation vs. DRG Norms",
        businessBrief: "Calculate patient Length of Stay (LOS) in whole days: (discharge_date - admission_date). Join with DRG (Diagnosis Related Group) benchmarks and compute variance: actual_los - benchmark_los. Flag stays exceeding 1.5x of benchmark as clinical outliers.",
        prerequisites: [
          {
            sectionKey: "section1",
            label: "Date Subtraction & Day Arithmetic",
            tip: "Subtract admission_date from discharge_date to calculate stay length in days."
          },
          {
            sectionKey: "section5",
            label: "JOIN on Diagnostic DRG Codes",
            tip: "Join PatientInpatientStays to DrgBenchmarks on drg_code."
          },
          {
            sectionKey: "section8",
            label: "CASE Logic for Clinical Outliers",
            tip: "Tag EXTREME_OUTLIER when actual days > benchmark * 1.5."
          }
        ],
        bloopsAdvice: "Hospitals receive fixed lump-sum payments under Medicare DRG rules. If a patient stays 12 days when the DRG benchmark is 4 days, the hospital loses tens of thousands on that bed!",
        schemaSnippet: "PatientInpatientStays(stay_id, patient_id, drg_code, admission_date, discharge_date), DrgBenchmarks(drg_code, expected_mean_los)",
        targetQuery: "SELECT\n  s.stay_id,\n  s.patient_id,\n  s.drg_code,\n  (s.discharge_date - s.admission_date) AS actual_los_days,\n  b.expected_mean_los,\n  ROUND((s.discharge_date - s.admission_date) - b.expected_mean_los, 1) AS los_variance_days,\n  CASE\n    WHEN (s.discharge_date - s.admission_date) > (b.expected_mean_los * 1.5) THEN 'EXTREME_OUTLIER'\n    WHEN (s.discharge_date - s.admission_date) < b.expected_mean_los THEN 'EFFICIENT_DISCHARGE'\n    ELSE 'STANDARD_CARE'\n  END AS utilization_category\nFROM PatientInpatientStays s\nJOIN DrgBenchmarks b\n  ON s.drg_code = b.drg_code\nORDER BY actual_los_days DESC;",
        template: [
          { text: "SELECT\n  s.stay_id,\n  s.patient_id,\n  s.drg_code,\n  (s.discharge_date ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ DATE DELTA OP ]" },
          { text: " s.admission_date) AS actual_los_days,\n  b.expected_mean_los,\n  ROUND((s.discharge_date - s.admission_date) - b.expected_mean_los, 1) AS los_variance_days,\n  CASE\n    WHEN (s.discharge_date - s.admission_date) > (b.expected_mean_los * 1.5) THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ OUTLIER STATUS ]" },
          { text: "\n    WHEN (s.discharge_date - s.admission_date) < b.expected_mean_los THEN 'EFFICIENT_DISCHARGE'\n    ELSE 'STANDARD_CARE'\n  END AS utilization_category\nFROM PatientInpatientStays s\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ JOIN SPEC ]" },
          { text: " DrgBenchmarks b\n  ON s.drg_code = b.drg_code\nORDER BY actual_los_days DESC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "-", options: ["-", "+", "*", "/"] },
          slot2: { correct: "'EXTREME_OUTLIER'", options: ["'EXTREME_OUTLIER'", "'STANDARD_CARE'", "'DISCHARGED'", "'NORMAL'"] },
          slot3: { correct: "JOIN", options: ["JOIN", "LEFT JOIN", "CROSS JOIN", "OUTER JOIN"] }
        },
        expectedColumns: ["stay_id", "patient_id", "drg_code", "actual_los_days", "expected_mean_los", "los_variance_days", "utilization_category"]
      },
      {
        stepNumber: 3,
        title: "Daily Midnight Bed Census & ICU Capacity Surge Monitoring",
        businessBrief: "Hospital bed management teams must track daily midnight bed occupancy. Expand patient admission and discharge date intervals against a daily calendar to count occupied beds per department and alert if occupancy exceeds 90%.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "NON-EQUI JOIN on Date Ranges",
            tip: "Join where calendar census_date >= admission_date AND census_date < discharge_date."
          },
          {
            sectionKey: "section4",
            label: "GROUP BY Department & Date",
            tip: "Aggregate bed counts per department and date."
          }
        ],
        bloopsAdvice: "A patient occupies a bed on every calendar date between admission and discharge! A non-equi join with a date spine gives the exact active census for any midnight in history.",
        schemaSnippet: "DimHospitalCalendar(census_date), DepartmentBedInventory(department_name, total_licensed_beds), ActiveAdmissions(stay_id, department_name, admission_date, discharge_date)",
        targetQuery: "SELECT\n  c.census_date,\n  i.department_name,\n  COUNT(a.stay_id) AS occupied_beds,\n  i.total_licensed_beds,\n  ROUND(COUNT(a.stay_id) * 100.0 / NULLIF(i.total_licensed_beds, 0), 1) AS occupancy_rate_pct,\n  CASE\n    WHEN COUNT(a.stay_id) * 100.0 / NULLIF(i.total_licensed_beds, 0) >= 90.0 THEN 'CRITICAL_SURGE_DIVERSION'\n    WHEN COUNT(a.stay_id) * 100.0 / NULLIF(i.total_licensed_beds, 0) >= 80.0 THEN 'HIGH_CENSUS_ALERT'\n    ELSE 'NOMINAL_CAPACITY'\n  END AS capacity_status\nFROM DimHospitalCalendar c\nJOIN DepartmentBedInventory i\n  ON 1=1\nLEFT JOIN ActiveAdmissions a\n  ON i.department_name = a.department_name\n AND c.census_date >= a.admission_date\n AND c.census_date < a.discharge_date\nGROUP BY c.census_date, i.department_name, i.total_licensed_beds\nORDER BY c.census_date ASC, occupancy_rate_pct DESC;",
        template: [
          { text: "SELECT\n  c.census_date,\n  i.department_name,\n  COUNT(a.stay_id) AS occupied_beds,\n  i.total_licensed_beds,\n  ROUND(COUNT(a.stay_id) * 100.0 / NULLIF(i.total_licensed_beds, 0), 1) AS occupancy_rate_pct,\n  CASE\n    WHEN COUNT(a.stay_id) * 100.0 / NULLIF(i.total_licensed_beds, 0) >= 90.0 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ SURGE STATUS ]" },
          { text: "\n    WHEN COUNT(a.stay_id) * 100.0 / NULLIF(i.total_licensed_beds, 0) >= 80.0 THEN 'HIGH_CENSUS_ALERT'\n    ELSE 'NOMINAL_CAPACITY'\n  END AS capacity_status\nFROM DimHospitalCalendar c\nJOIN DepartmentBedInventory i\n  ON 1=1\nLEFT JOIN ActiveAdmissions a\n  ON i.department_name = a.department_name\n AND c.census_date ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ ADMIT BOUND ]" },
          { text: " a.admission_date\n AND c.census_date < a.discharge_date\nGROUP BY c.census_date, i.department_name, i.total_licensed_beds\nORDER BY c.census_date ASC, occupancy_rate_pct ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT DIRECTION ]" },
          { text: ";", isBlank: false }
        ],
        slots: {
          slot1: { correct: "'CRITICAL_SURGE_DIVERSION'", options: ["'CRITICAL_SURGE_DIVERSION'", "'EMPTY'", "'CLOSED'", "'AVAILABLE'"] },
          slot2: { correct: ">=", options: [">=", ">", "<=", "="] },
          slot3: { correct: "DESC", options: ["DESC", "ASC", "NULLS FIRST", "LIMIT"] }
        },
        expectedColumns: ["census_date", "department_name", "occupied_beds", "total_licensed_beds", "occupancy_rate_pct", "capacity_status"]
      },
      {
        stepNumber: 4,
        title: "Hospital-Acquired Condition (HAC) & Complication Timestamp Audit",
        businessBrief: "Under CMS penalty rules, Medicare denies reimbursement for Hospital-Acquired Infections if the diagnosis was not present upon admission (POA = 'N') and occurred > 48 hours after admission.",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "INNER JOIN on Patient Stays",
            tip: "Join InpatientStays to StayDiagnoses on stay_id."
          },
          {
            sectionKey: "section1",
            label: "Timestamp Interval Comparison (> 48 hours)",
            tip: "Compare timestamp difference using INTERVAL '48 hours'."
          }
        ],
        bloopsAdvice: "If a patient catches an infection 48 hours after admission, it's legally a Hospital-Acquired Condition. Insurance will not pay for the extra days of antibiotics and ICU care!",
        schemaSnippet: "InpatientStays(stay_id, patient_id, admission_time), StayDiagnoses(stay_id, icd10_code, diagnosis_time, present_on_admission ['Y', 'N'])",
        targetQuery: "SELECT\n  s.stay_id,\n  s.patient_id,\n  d.icd10_code,\n  s.admission_time,\n  d.diagnosis_time,\n  ROUND(EXTRACT(EPOCH FROM (d.diagnosis_time - s.admission_time)) / 3600.0, 1) AS hours_since_admission,\n  CASE\n    WHEN d.present_on_admission = 'N' AND (d.diagnosis_time - s.admission_time) > INTERVAL '48 hours'\n    THEN 'HAC_NON_REIMBURSABLE'\n    ELSE 'PRE_EXISTING_CONDITION'\n  END AS reimbursement_classification\nFROM InpatientStays s\nJOIN StayDiagnoses d\n  ON s.stay_id = d.stay_id\nWHERE d.present_on_admission = 'N';",
        template: [
          { text: "SELECT\n  s.stay_id,\n  s.patient_id,\n  d.icd10_code,\n  s.admission_time,\n  d.diagnosis_time,\n  ROUND(EXTRACT(EPOCH FROM (d.diagnosis_time - s.admission_time)) / 3600.0, 1) AS hours_since_admission,\n  CASE\n    WHEN d.present_on_admission = 'N' AND (d.diagnosis_time - s.admission_time) > ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ 48HR INTERVAL ]" },
          { text: "\n    THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ HAC STATUS ]" },
          { text: "\n    ELSE 'PRE_EXISTING_CONDITION'\n  END AS reimbursement_classification\nFROM InpatientStays s\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ JOIN SPEC ]" },
          { text: " StayDiagnoses d\n  ON s.stay_id = d.stay_id\nWHERE d.present_on_admission = 'N';", isBlank: false }
        ],
        slots: {
          slot1: { correct: "INTERVAL '48 hours'", options: ["INTERVAL '48 hours'", "INTERVAL '24 hours'", "48", "'48h'"] },
          slot2: { correct: "'HAC_NON_REIMBURSABLE'", options: ["'HAC_NON_REIMBURSABLE'", "'APPROVED'", "'PAID'", "'CLEAN'"] },
          slot3: { correct: "JOIN", options: ["JOIN", "CROSS JOIN", "LEFT JOIN", "FULL JOIN"] }
        },
        expectedColumns: ["stay_id", "patient_id", "icd10_code", "admission_time", "diagnosis_time", "hours_since_admission", "reimbursement_classification"]
      },
      {
        stepNumber: 5,
        title: "Departmental HRRP Readmission Penalty Risk Scorecard",
        businessBrief: "Synthesize hospital-wide performance into the Chief Medical Officer's HRRP dashboard: For each clinical department, compute total discharges, 30-day readmissions, readmission rate %, and rank departments by penalty exposure using DENSE_RANK().",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "Aggregations with Math Ratios",
            tip: "Calculate SUM(is_30day_readmission) * 100.0 / NULLIF(COUNT(*), 0)."
          },
          {
            sectionKey: "section6",
            label: "Ranking Windows (DENSE_RANK)",
            tip: "Rank departments by readmission rate descending using DENSE_RANK() OVER (ORDER BY rate DESC)."
          }
        ],
        bloopsAdvice: "Under the HRRP program, hospitals with excessive 30-day readmissions forfeit up to 3% of ALL Medicare inpatient revenue. DENSE_RANK() highlights the departments causing the highest penalty risk!",
        schemaSnippet: "DepartmentalReadmissionsLog(department_name, discharge_id, is_30day_readmission [1, 0])",
        targetQuery: "SELECT\n  department_name,\n  COUNT(*) AS total_discharges,\n  SUM(is_30day_readmission) AS readmission_count,\n  ROUND(SUM(is_30day_readmission) * 100.0 / NULLIF(COUNT(*), 0), 2) AS readmission_rate_pct,\n  DENSE_RANK() OVER (\n    ORDER BY (SUM(is_30day_readmission) * 100.0 / NULLIF(COUNT(*), 0)) DESC\n  ) AS penalty_risk_rank\nFROM DepartmentalReadmissionsLog\nGROUP BY department_name\nORDER BY penalty_risk_rank ASC;",
        template: [
          { text: "SELECT\n  department_name,\n  COUNT(*) AS total_discharges,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ SUM READMISSIONS ]" },
          { text: "(is_30day_readmission) AS readmission_count,\n  ROUND(SUM(is_30day_readmission) * 100.0 / NULLIF(COUNT(*), 0), 2) AS readmission_rate_pct,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DENSE RANK FUNC ]" },
          { text: "() OVER (\n    ORDER BY (SUM(is_30day_readmission) * 100.0 / NULLIF(COUNT(*), 0)) ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT DIRECTION ]" },
          { text: "\n  ) AS penalty_risk_rank\nFROM DepartmentalReadmissionsLog\nGROUP BY department_name\nORDER BY penalty_risk_rank ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "SUM", options: ["SUM", "COUNT", "AVG", "MAX"] },
          slot2: { correct: "DENSE_RANK", options: ["DENSE_RANK", "RANK", "ROW_NUMBER", "NTILE"] },
          slot3: { correct: "DESC", options: ["DESC", "ASC", "NULLS LAST", "LIMIT"] }
        },
        expectedColumns: ["department_name", "total_discharges", "readmission_count", "readmission_rate_pct", "penalty_risk_rank"]
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
      },
      {
        stepNumber: 2,
        title: "Escrow Holdback Balance & Rolling 14-Day Release Tranches",
        businessBrief: "Marketplaces protect buyers by holding merchant payout funds in escrow for 14 days after confirmed delivery. Calculate each seller's locked escrow balance vs. funds eligible for immediate disbursement today (current_date >= delivery_date + 14 days).",
        prerequisites: [
          {
            sectionKey: "section8",
            label: "CASE WHEN with Date Intervals",
            tip: "Use delivery_date + INTERVAL '14 days' <= CURRENT_DATE to evaluate eligibility."
          },
          {
            sectionKey: "section4",
            label: "Conditional Aggregations (SUM + CASE)",
            tip: "Sum funds conditionally for eligible vs. locked buckets."
          }
        ],
        bloopsAdvice: "If a buyer receives defective goods, the marketplace issues a refund directly out of escrow. Sellers only get disbursed funds once the 14-day holdback window expires!",
        schemaSnippet: "EscrowOrders(order_id, seller_id, net_payable_amount, delivery_date)",
        targetQuery: "SELECT\n  seller_id,\n  SUM(net_payable_amount) AS total_order_funds,\n  SUM(CASE WHEN delivery_date + INTERVAL '14 days' <= CURRENT_DATE THEN net_payable_amount ELSE 0 END) AS eligible_for_disbursement,\n  SUM(CASE WHEN delivery_date + INTERVAL '14 days' > CURRENT_DATE THEN net_payable_amount ELSE 0 END) AS locked_in_escrow\nFROM EscrowOrders\nGROUP BY seller_id\nORDER BY locked_in_escrow DESC;",
        template: [
          { text: "SELECT\n  seller_id,\n  SUM(net_payable_amount) AS total_order_funds,\n  SUM(CASE WHEN delivery_date + ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ 14-DAY INTERVAL ]" },
          { text: " <= ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ CURRENT DATE ]" },
          { text: " THEN net_payable_amount ELSE 0 END) AS eligible_for_disbursement,\n  SUM(CASE WHEN delivery_date + INTERVAL '14 days' > CURRENT_DATE THEN net_payable_amount ELSE 0 END) AS locked_in_escrow\nFROM EscrowOrders\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ GROUPING CLAUSE ]" },
          { text: " seller_id\nORDER BY locked_in_escrow DESC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "INTERVAL '14 days'", options: ["INTERVAL '14 days'", "INTERVAL '1 day'", "14", "'14d'"] },
          slot2: { correct: "CURRENT_DATE", options: ["CURRENT_DATE", "CURRENT_TIME", "'2020-01-01'", "NULL"] },
          slot3: { correct: "GROUP BY", options: ["GROUP BY", "ORDER BY", "PARTITION BY", "CLUSTER BY"] }
        },
        expectedColumns: ["seller_id", "total_order_funds", "eligible_for_disbursement", "locked_in_escrow"]
      },
      {
        stepNumber: 3,
        title: "Multi-Party Return Break Reconciliation via FULL JOIN",
        businessBrief: "Reconcile customer refund events against 3PL warehouse physical return scan events. Match on order_id using FULL OUTER JOIN and flag reconciliation breaks: 'REFUNDED_NO_PHYSICAL_RETURN' (carrier scan missing) and 'RETURNED_NO_REFUND_CREDIT' (goods arrived but buyer not refunded).",
        prerequisites: [
          {
            sectionKey: "section5",
            label: "FULL OUTER JOIN for Sided Discrepancies",
            tip: "Use FULL OUTER JOIN to capture unmatched orders from both refunds and returns."
          },
          {
            sectionKey: "section1",
            label: "COALESCE for Key Unification",
            tip: "Use COALESCE(r.order_id, w.order_id) to ensure a complete order identifier."
          },
          {
            sectionKey: "section8",
            label: "CASE WHEN for Discrepancy Classification",
            tip: "Classify return statuses into PERFECT_RETURN_RECONCILED, REFUNDED_NO_PHYSICAL_RETURN, and RETURNED_NO_REFUND_CREDIT."
          }
        ],
        bloopsAdvice: "A FULL OUTER JOIN ensures neither lost inventory nor unrefunded customers slip through the cracks. Operations teams work these breaks daily!",
        schemaSnippet: "CustomerRefunds(order_id, refund_amount, refund_date), WarehouseReturns(order_id, carrier_tracking_code, scan_date)",
        targetQuery: "SELECT\n  COALESCE(r.order_id, w.order_id) AS reconciled_order_id,\n  r.refund_amount,\n  w.carrier_tracking_code,\n  CASE\n    WHEN r.order_id IS NOT NULL AND w.order_id IS NOT NULL THEN 'PERFECT_RETURN_RECONCILED'\n    WHEN r.order_id IS NOT NULL AND w.order_id IS NULL THEN 'REFUNDED_NO_PHYSICAL_RETURN'\n    WHEN r.order_id IS NULL AND w.order_id IS NOT NULL THEN 'RETURNED_NO_REFUND_CREDIT'\n  END AS return_break_status\nFROM CustomerRefunds r\nFULL OUTER JOIN WarehouseReturns w\n  ON r.order_id = w.order_id;",
        template: [
          { text: "SELECT\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ KEY RESOLVER ]" },
          { text: "(r.order_id, w.order_id) AS reconciled_order_id,\n  r.refund_amount,\n  w.carrier_tracking_code,\n  CASE\n    WHEN r.order_id IS NOT NULL AND w.order_id IS NOT NULL THEN 'PERFECT_RETURN_RECONCILED'\n    WHEN r.order_id IS NOT NULL AND w.order_id IS NULL THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ BREAK STATUS ]" },
          { text: "\n    WHEN r.order_id IS NULL AND w.order_id IS NOT NULL THEN 'RETURNED_NO_REFUND_CREDIT'\n  END AS return_break_status\nFROM CustomerRefunds r\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ JOIN SPEC ]" },
          { text: " WarehouseReturns w\n  ON r.order_id = w.order_id;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "COALESCE", options: ["COALESCE", "NULLIF", "CONCAT", "IFNULL"] },
          slot2: { correct: "'REFUNDED_NO_PHYSICAL_RETURN'", options: ["'REFUNDED_NO_PHYSICAL_RETURN'", "'MATCHED'", "'OK'", "'ERROR'"] },
          slot3: { correct: "FULL OUTER JOIN", options: ["FULL OUTER JOIN", "INNER JOIN", "CROSS JOIN", "LEFT JOIN"] }
        },
        expectedColumns: ["reconciled_order_id", "refund_amount", "carrier_tracking_code", "return_break_status"]
      },
      {
        stepNumber: 4,
        title: "High-Risk Seller Reserve Withholding Engine",
        businessBrief: "To protect against insolvent merchant defaults, sellers with high dispute rates (> 1.5%) must have a mandatory 10% rolling reserve withheld from their eligible payout balance. Calculate the exact withheld reserve and net bank wire amount.",
        prerequisites: [
          {
            sectionKey: "section8",
            label: "CASE WHEN Tiered Calculations",
            tip: "Calculate 10% reserve when chargeback_rate_pct >= 1.50."
          },
          {
            sectionKey: "section1",
            label: "Rounding and Percentage Arithmetic",
            tip: "Compute net wire as eligible_balance * 0.90."
          }
        ],
        bloopsAdvice: "Stripe and Amazon impose rolling reserves on risky merchants. If a merchant has high chargebacks, withhold 10% into a risk reserve pool before sending the bank transfer!",
        schemaSnippet: "SellerDisbursementQueue(seller_id, seller_name, eligible_balance, chargeback_rate_pct)",
        targetQuery: "SELECT\n  seller_id,\n  seller_name,\n  eligible_balance,\n  chargeback_rate_pct,\n  CASE\n    WHEN chargeback_rate_pct >= 1.50 THEN ROUND(eligible_balance * 0.10, 2)\n    ELSE 0.00\n  END AS reserve_withheld_amount,\n  CASE\n    WHEN chargeback_rate_pct >= 1.50 THEN ROUND(eligible_balance * 0.90, 2)\n    ELSE eligible_balance\n  END AS net_wire_disbursement\nFROM SellerDisbursementQueue\nORDER BY reserve_withheld_amount DESC;",
        template: [
          { text: "SELECT\n  seller_id,\n  seller_name,\n  eligible_balance,\n  chargeback_rate_pct,\n  CASE\n    WHEN chargeback_rate_pct >= 1.50 THEN ROUND(eligible_balance * ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ RESERVE RATIO ]" },
          { text: ", 2)\n    ELSE 0.00\n  END AS reserve_withheld_amount,\n  CASE\n    WHEN chargeback_rate_pct >= 1.50 THEN ROUND(eligible_balance * ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ NET DISBURSEMENT RATIO ]" },
          { text: ", 2)\n    ELSE eligible_balance\n  END AS net_wire_disbursement\nFROM SellerDisbursementQueue\nORDER BY reserve_withheld_amount ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT ORDER ]" },
          { text: ";", isBlank: false }
        ],
        slots: {
          slot1: { correct: "0.10", options: ["0.10", "0.90", "1.50", "10"] },
          slot2: { correct: "0.90", options: ["0.90", "0.10", "1.00", "0.50"] },
          slot3: { correct: "DESC", options: ["DESC", "ASC", "NULLS FIRST", "LIMIT"] }
        },
        expectedColumns: ["seller_id", "seller_name", "eligible_balance", "chargeback_rate_pct", "reserve_withheld_amount", "net_wire_disbursement"]
      },
      {
        stepNumber: 5,
        title: "Double-Entry Balanced Payout Disbursement Journal",
        businessBrief: "Generate the double-entry general ledger journal for the daily payout batch. For total net payouts, construct balanced accounting entries: DEBIT Escrow_Liabilities and CREDIT Merchant_Payables and Platform_Commission_Revenue. Total debits must equal total credits.",
        prerequisites: [
          {
            sectionKey: "section7",
            label: "UNION ALL for Double-Entry Journal Rows",
            tip: "Combine balanced debit and credit entries using UNION ALL."
          },
          {
            sectionKey: "section4",
            label: "SUM Aggregations with Explicit Column Tagging",
            tip: "Tag static string literals ('DEBIT', 'CREDIT') in the projection list."
          }
        ],
        bloopsAdvice: "Every financial software system must produce balanced debits and credits. In SQL, UNION ALL allows you to assemble the opposing sides of the general ledger entry!",
        schemaSnippet: "DailyDisbursementBatch(batch_id, total_gross_settled, platform_fees_collected, net_seller_wires)",
        targetQuery: "SELECT\n  'DEBIT' AS entry_type,\n  '2000-ESCROW-LIABILITY' AS account_code,\n  SUM(total_gross_settled) AS amount_usd\nFROM DailyDisbursementBatch\nUNION ALL\nSELECT\n  'CREDIT' AS entry_type,\n  '4000-PLATFORM-TAKE-RATE-REVENUE' AS account_code,\n  SUM(platform_fees_collected) AS amount_usd\nFROM DailyDisbursementBatch\nUNION ALL\nSELECT\n  'CREDIT' AS entry_type,\n  '2100-MERCHANT-ACCOUNTS-PAYABLE' AS account_code,\n  SUM(net_seller_wires) AS amount_usd\nFROM DailyDisbursementBatch;",
        template: [
          { text: "SELECT\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ DEBIT ENTRY ]" },
          { text: " AS entry_type,\n  '2000-ESCROW-LIABILITY' AS account_code,\n  SUM(total_gross_settled) AS amount_usd\nFROM DailyDisbursementBatch\n", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ SET OPERATOR ]" },
          { text: "\nSELECT\n  'CREDIT' AS entry_type,\n  '4000-PLATFORM-TAKE-RATE-REVENUE' AS account_code,\n  SUM(platform_fees_collected) AS amount_usd\nFROM DailyDisbursementBatch\nUNION ALL\nSELECT\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ CREDIT ENTRY ]" },
          { text: " AS entry_type,\n  '2100-MERCHANT-ACCOUNTS-PAYABLE' AS account_code,\n  SUM(net_seller_wires) AS amount_usd\nFROM DailyDisbursementBatch;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "'DEBIT'", options: ["'DEBIT'", "'CREDIT'", "'ASSET'", "'REVENUE'"] },
          slot2: { correct: "UNION ALL", options: ["UNION ALL", "UNION", "INTERSECT", "EXCEPT"] },
          slot3: { correct: "'CREDIT'", options: ["'CREDIT'", "'DEBIT'", "'LOSS'", "'EXPENSE'"] }
        },
        expectedColumns: ["entry_type", "account_code", "amount_usd"]
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
      },
      {
        stepNumber: 3,
        title: "Safety Stock & Statistical Reorder Point (ROP) Engine",
        businessBrief: "Procurement teams prevent stockouts using statistical Reorder Points (ROP): ROP = (Average Daily Sales * Supplier Lead Time) + Safety Stock. Safety stock is computed with a 95% service factor (Z = 1.65): 1.65 * SQRT(lead_time_days) * sales_stddev. Flag SKUs that need immediate replenishment (current_stock <= reorder_point).",
        prerequisites: [
          {
            sectionKey: "section1",
            label: "Mathematical Functions (SQRT & Multiplication)",
            tip: "Calculate safety stock using 1.65 * SQRT(lead_time_days) * sales_stddev."
          },
          {
            sectionKey: "section8",
            label: "CASE Logic for Reorder Flags",
            tip: "Tag REORDER_NOW when current_stock <= calculated reorder point."
          }
        ],
        bloopsAdvice: "If you wait until inventory hits zero before ordering, you stock out during the supplier's 14-day delivery lead time! Reorder points tell you the exact stock level that triggers a purchase order.",
        schemaSnippet: "SkuSupplyChainParameters(sku_id, current_stock, lead_time_days, ads_units, sales_stddev)",
        targetQuery: "SELECT\n  sku_id,\n  current_stock,\n  lead_time_days,\n  ads_units,\n  ROUND((ads_units * lead_time_days) + (1.65 * SQRT(lead_time_days) * sales_stddev), 0) AS reorder_point,\n  CASE\n    WHEN current_stock <= ((ads_units * lead_time_days) + (1.65 * SQRT(lead_time_days) * sales_stddev)) THEN 'REORDER_NOW'\n    ELSE 'SUFFICIENT_STOCK'\n  END AS replenishment_action\nFROM SkuSupplyChainParameters\nORDER BY current_stock ASC;",
        template: [
          { text: "SELECT\n  sku_id,\n  current_stock,\n  lead_time_days,\n  ads_units,\n  ROUND((ads_units * lead_time_days) + (1.65 * ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ SQUARE ROOT ]" },
          { text: "(lead_time_days) * sales_stddev), 0) AS reorder_point,\n  CASE\n    WHEN current_stock ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ REORDER COMPARATOR ]" },
          { text: " ((ads_units * lead_time_days) + (1.65 * SQRT(lead_time_days) * sales_stddev)) THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ ACTION STATUS ]" },
          { text: "\n    ELSE 'SUFFICIENT_STOCK'\n  END AS replenishment_action\nFROM SkuSupplyChainParameters\nORDER BY current_stock ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "SQRT", options: ["SQRT", "EXP", "ROUND", "ABS"] },
          slot2: { correct: "<=", options: ["<=", ">=", ">", "="] },
          slot3: { correct: "'REORDER_NOW'", options: ["'REORDER_NOW'", "'SUFFICIENT_STOCK'", "'HOLD'", "'EXPIRED'"] }
        },
        expectedColumns: ["sku_id", "current_stock", "lead_time_days", "ads_units", "reorder_point", "replenishment_action"]
      },
      {
        stepNumber: 4,
        title: "Dead Stock & Warehouse Holding Cost Bleed Audit",
        businessBrief: "Holding unsellable inventory consumes warehouse space and capital. Identify 'Dead Stock' SKUs with zero units sold in the last 90 days. Compute monthly carrying cost ($1.20 per cubic foot volume + 1.25% monthly cost of capital on inventory value) to calculate total cash trapped.",
        prerequisites: [
          {
            sectionKey: "section2",
            label: "WHERE Filters on Zero Sales & Days Inactive",
            tip: "Filter WHERE units_sold_90d = 0 AND units_on_hand > 0."
          },
          {
            sectionKey: "section1",
            label: "Multi-Factor Cost Arithmetic",
            tip: "Multiply volume by holding rates and capital cost percentage."
          }
        ],
        bloopsAdvice: "Dead stock is a silent balance sheet killer. Inventory sitting on shelves still incurs warehouse rent and capital interest every single month!",
        schemaSnippet: "WarehouseInventoryAging(sku_id, units_on_hand, unit_cost_usd, cubic_feet_per_unit, units_sold_90d)",
        targetQuery: "SELECT\n  sku_id,\n  units_on_hand,\n  units_on_hand * unit_cost_usd AS trapped_capital_usd,\n  ROUND(\n    (units_on_hand * cubic_feet_per_unit * 1.20) +\n    (units_on_hand * unit_cost_usd * 0.0125),\n    2\n  ) AS monthly_holding_cost_usd\nFROM WarehouseInventoryAging\nWHERE units_sold_90d = 0\n  AND units_on_hand > 0\nORDER BY trapped_capital_usd DESC;",
        template: [
          { text: "SELECT\n  sku_id,\n  units_on_hand,\n  units_on_hand ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ARITHMETIC OP ]" },
          { text: " unit_cost_usd AS trapped_capital_usd,\n  ROUND(\n    (units_on_hand * cubic_feet_per_unit * 1.20) +\n    (units_on_hand * unit_cost_usd * 0.0125),\n    2\n  ) AS monthly_holding_cost_usd\nFROM WarehouseInventoryAging\nWHERE units_sold_90d = ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ ZERO SALES ]" },
          { text: "\n  AND units_on_hand > 0\nORDER BY trapped_capital_usd ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT DIRECTION ]" },
          { text: ";", isBlank: false }
        ],
        slots: {
          slot1: { correct: "*", options: ["*", "+", "/", "-"] },
          slot2: { correct: "0", options: ["0", "1", "10", "90"] },
          slot3: { correct: "DESC", options: ["DESC", "ASC", "NULLS LAST", "LIMIT"] }
        },
        expectedColumns: ["sku_id", "units_on_hand", "trapped_capital_usd", "monthly_holding_cost_usd"]
      },
      {
        stepNumber: 5,
        title: "Gross Margin Return on Investment (GMROI) Portfolio Matrix",
        businessBrief: "Retail executives rank product portfolio efficiency using GMROI: Gross Margin $ / Average Inventory at Cost $. Categorize all SKUs into a 2x2 Boston Consulting Group matrix: CASH_COW (GMROI >= 3.0), STAR (GMROI >= 1.5), SLEEPER (GMROI >= 1.0), and DOG_LIQUIDATE (GMROI < 1.0).",
        prerequisites: [
          {
            sectionKey: "section4",
            label: "High-Precision Division with Safe NULLIF",
            tip: "Protect ratio calculations against zero inventory with NULLIF(avg_inventory_cost_usd, 0)."
          },
          {
            sectionKey: "section8",
            label: "Multi-Tier CASE Classification",
            tip: "Classify SKUs into CASH_COW, STAR, SLEEPER, or DOG_LIQUIDATE."
          },
          {
            sectionKey: "section6",
            label: "Ranking Windows (DENSE_RANK)",
            tip: "Rank SKUs by GMROI descending with DENSE_RANK()."
          }
        ],
        bloopsAdvice: "A GMROI of 3.0 means every dollar invested in inventory generates $3 in gross margin profit each year. DENSE_RANK() sorts your winners from your balance sheet drags!",
        schemaSnippet: "SkuAnnualProfitability(sku_id, annual_gross_margin_usd, avg_inventory_cost_usd)",
        targetQuery: "SELECT\n  sku_id,\n  annual_gross_margin_usd,\n  avg_inventory_cost_usd,\n  ROUND(annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0), 2) AS gmroi_ratio,\n  DENSE_RANK() OVER (\n    ORDER BY (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) DESC\n  ) AS profitability_rank,\n  CASE\n    WHEN (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) >= 3.0 THEN 'CASH_COW'\n    WHEN (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) >= 1.5 THEN 'STAR'\n    WHEN (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) >= 1.0 THEN 'SLEEPER'\n    ELSE 'DOG_LIQUIDATE'\n  END AS portfolio_quadrant\nFROM SkuAnnualProfitability\nORDER BY profitability_rank ASC;",
        template: [
          { text: "SELECT\n  sku_id,\n  annual_gross_margin_usd,\n  avg_inventory_cost_usd,\n  ROUND(annual_gross_margin_usd / ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot1", placeholder: "[ SAFE ZERO DIVISOR ]" },
          { text: "(avg_inventory_cost_usd, 0), 2) AS gmroi_ratio,\n  ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DENSE RANK FUNC ]" },
          { text: "() OVER (\n    ORDER BY (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) DESC\n  ) AS profitability_rank,\n  CASE\n    WHEN (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) >= 3.0 THEN ", isBlank: false },
          { text: "", isBlank: true, slotId: "slot3", placeholder: "[ BEST QUADRANT ]" },
          { text: "\n    WHEN (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) >= 1.5 THEN 'STAR'\n    WHEN (annual_gross_margin_usd / NULLIF(avg_inventory_cost_usd, 0)) >= 1.0 THEN 'SLEEPER'\n    ELSE 'DOG_LIQUIDATE'\n  END AS portfolio_quadrant\nFROM SkuAnnualProfitability\nORDER BY profitability_rank ASC;", isBlank: false }
        ],
        slots: {
          slot1: { correct: "NULLIF", options: ["NULLIF", "COALESCE", "IFNULL", "NVL"] },
          slot2: { correct: "DENSE_RANK", options: ["DENSE_RANK", "RANK", "ROW_NUMBER", "NTILE"] },
          slot3: { correct: "'CASH_COW'", options: ["'CASH_COW'", "'STAR'", "'DOG_LIQUIDATE'", "'UNKNOWN'"] }
        },
        expectedColumns: ["sku_id", "annual_gross_margin_usd", "avg_inventory_cost_usd", "gmroi_ratio", "profitability_rank", "portfolio_quadrant"]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CAPSTONES_DATA: window.CAPSTONES_DATA };
}
