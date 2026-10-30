/**
 * =============================================================================
 * RELATIONAL MACHINES ENGINE (DATA ANALYSIS & BUSINESS INTELLIGENCE EXPLAINERS)
 * Pure Bloomberg / LedgerLens Obsidian Dark Minimalist Vector Architecture
 * Features:
 *   - Compact 920x520 SVG ViewBox with Financial-Grade Ledger Tables
 *   - Feature 5: Hover Micro-Tooltips & Data Integrity Audits
 *   - Feature 3: Click-to-Inspect Production SQL & Interview Formula Drawer
 *   - Multi-Dialect Code Switcher (Postgres, Snowflake, BigQuery, DuckDB)
 *   - Dynamic Pin-Isolation & Ethereal Glow Filters
 * =============================================================================
 */

window.RelationalMachinesEngine = (function() {
  'use strict';

  let state = {
    activeDraft: 'machine01',   // 'machine01' | 'machine02' | 'machine03'
    activeHighlightNode: null, // null or number
    canvasTheme: 'dark',        // 'dark' | 'light'
    zoomLevel: 1.0,
    selectedMetricId: null,    // null or string (e.g. 'order_amount')
    selectedDialect: 'postgres',// 'postgres' | 'snowflake' | 'bigquery' | 'duckdb'
    isDrawerOpen: false
  };

  // ===========================================================================
  // METRIC CATALOG (PRODUCTION SQL, DATA AUDITS & INTERVIEW DOSSIERS)
  // ===========================================================================
  const METRIC_CATALOG = {
    // -------------------------------------------------------------------------
    // DRAFT 01: THE METRIC ENGINE (REVENUE, AOV & FREQUENCY)
    // -------------------------------------------------------------------------
    'order_amount': {
      title: 'order_amount ($) // Transaction Value',
      pin: 1,
      color: '#38bdf8',
      gauge: '01 RAW TRANSACTIONS (GRAIN)',
      grain: 'orders.order_amount (DECIMAL 10,2) PK: order_id',
      audit: '✓ 0 NULL checkouts • Filtered out 320 cancelled returns',
      edgeCase: 'Multi-currency checkouts require daily spot FX rate at order_timestamp, not current rate.',
      sql: {
        postgres: `-- PostgreSQL 16: Monthly GMV Rollup
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM orders
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`,
        snowflake: `-- Snowflake: Monthly GMV Rollup
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM orders
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`,
        bigquery: `-- BigQuery Standard SQL: Monthly GMV Rollup
SELECT
  DATE_TRUNC(order_timestamp, MONTH) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM \`analytics.orders\`
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`,
        duckdb: `-- DuckDB / SQLite WASM: Monthly GMV Rollup
SELECT
  STRFTIME('%Y-%m-01', order_timestamp) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM orders
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`
      },
      commercialInsight: 'Finance recognizes GMV once payment settles and fulfillment SLA begins. Tracking refund rate deltas alongside GMV prevents deceptive top-line revenue inflation.',
      interviewQuestion: 'Why is joining orders to order_items before SUM(order_amount) catastrophic?',
      pitfallTrap: 'The classic 1-to-many join fan-out trap: each order row multiplies by its number of items, causing 3x-5x inflated revenue reports.'
    },

    'customer_id': {
      title: 'customer_id // Dimension Key & Deduplication',
      pin: 2,
      color: '#fbbf24',
      gauge: '01 RAW TRANSACTIONS (GRAIN)',
      grain: 'orders.customer_id INT -> users.user_id (Foreign Key)',
      audit: '✓ 3,410 unique buyers across 13,960 checkouts (4.09 orders/buyer)',
      edgeCase: 'Guest checkouts without an account require fallback to COALESCE(customer_id, HASH(billing_email)).',
      sql: {
        postgres: `-- PostgreSQL 16: Unique Buyer Deduplication
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  COUNT(DISTINCT customer_id) AS unique_buyers,
  COUNT(order_id) AS total_checkouts,
  ROUND(COUNT(order_id)::NUMERIC / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS purchase_frequency
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        snowflake: `-- Snowflake: Unique Buyer Deduplication
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  COUNT(DISTINCT customer_id) AS unique_buyers,
  COUNT(order_id) AS total_checkouts,
  ROUND(COUNT(order_id) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS purchase_frequency
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        bigquery: `-- BigQuery Standard SQL: HyperLogLog for Fast Approx
SELECT
  DATE_TRUNC(order_timestamp, MONTH) AS order_month,
  APPROX_COUNT_DISTINCT(customer_id) AS approx_buyers,
  COUNT(DISTINCT customer_id) AS exact_buyers
FROM \`analytics.orders\`
WHERE status = 'FILLED'
GROUP BY 1;`,
        duckdb: `-- DuckDB: Deduplication & Frequency
SELECT
  STRFTIME('%Y-%m-01', order_timestamp) AS order_month,
  COUNT(DISTINCT customer_id) AS unique_buyers,
  ROUND(COUNT(order_id) * 1.0 / COUNT(DISTINCT customer_id), 2) AS purchase_frequency
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`
      },
      commercialInsight: 'Differentiating unique buyers from checkout volume reveals whether revenue expansion is driven by new customer acquisition or compounding customer repeat behavior.',
      interviewQuestion: 'How do you optimize COUNT(DISTINCT) over 500 million records in BigQuery or Snowflake?',
      pitfallTrap: 'In distributed MPP engines, exact COUNT(DISTINCT) forces a shuffle of all user keys to a single node. Use APPROX_COUNT_DISTINCT() (HyperLogLog) for sub-1% error with 10x faster execution.'
    },

    'net_checkouts': {
      title: 'Net Valid Checkouts // Operational Volume',
      pin: null,
      color: '#34d399',
      gauge: '01 RAW TRANSACTIONS (GRAIN)',
      grain: 'COUNT(order_id) WHERE status = "FILLED"',
      audit: '✓ 14,280 gross - 320 cancelled = 13,960 net checkouts',
      edgeCase: 'Chargebacks and disputes occurring 30-90 days post-purchase must reconcile in dispute ledgers.',
      sql: {
        postgres: `-- PostgreSQL 16: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM orders
GROUP BY status;`,
        snowflake: `-- Snowflake: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM orders
GROUP BY status;`,
        bigquery: `-- BigQuery: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM \`analytics.orders\`
GROUP BY status;`,
        duckdb: `-- DuckDB: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM orders
GROUP BY status;`
      },
      commercialInsight: 'Order count measures operational throughput (warehouse picking, packaging, API server capacity), completely decoupled from order dollar ticket size.',
      interviewQuestion: 'What is the performance difference between COUNT(*) and COUNT(order_id)?',
      pitfallTrap: 'COUNT(order_id) checks for NULLs; COUNT(*) counts entire rows. In columnar engines with non-null PKs, COUNT(*) scans the narrowest metadata index and is faster.'
    },

    'aov': {
      title: 'AVG(order_amount) [AOV] // Basket Size',
      pin: 3,
      color: '#10b981',
      gauge: '02 SQL AGGREGATION LAYER',
      grain: 'SUM(order_amount) / NULLIF(COUNT(order_id), 0)',
      audit: '✓ $1,428,950 total GMV / 13,960 orders = $102.36 AOV',
      edgeCase: 'Division by zero on zero-order dimensions. Always guard with NULLIF(COUNT(order_id), 0).',
      sql: {
        postgres: `-- PostgreSQL 16: Safe AOV Computation
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS gmv,
  COUNT(order_id) AS total_orders,
  ROUND(SUM(order_amount) / NULLIF(COUNT(order_id), 0), 2) AS average_order_value
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        snowflake: `-- Snowflake: Safe AOV Computation
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS gmv,
  COUNT(order_id) AS total_orders,
  ROUND(DIV0(SUM(order_amount), COUNT(order_id)), 2) AS average_order_value
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        bigquery: `-- BigQuery Standard SQL: Safe AOV
SELECT
  DATE_TRUNC(order_timestamp, MONTH) AS order_month,
  SUM(order_amount) AS gmv,
  SAFE_DIVIDE(SUM(order_amount), COUNT(order_id)) AS average_order_value
FROM \`analytics.orders\`
WHERE status = 'FILLED'
GROUP BY 1;`,
        duckdb: `-- DuckDB: Safe AOV
SELECT
  STRFTIME('%Y-%m-01', order_timestamp) AS order_month,
  ROUND(SUM(order_amount) / NULLIF(COUNT(order_id), 0), 2) AS average_order_value
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`
      },
      commercialInsight: 'Increasing AOV through bundling, volume discounts, or post-purchase upsells generates pure incremental gross margin without requiring any extra ad spending (CAC).',
      interviewQuestion: 'Is the overall AOV equal to the average of individual customers\' average order values?',
      pitfallTrap: 'Never average an average! A customer who buys 100 items at $10 would distort an unweighted average. AOV must always be total spend divided by total orders.'
    },

    'gmv': {
      title: 'Gross Monthly GMV // Commercial North Star',
      pin: 4,
      color: '#f43f5e',
      gauge: '03 COMMERCIAL REALITY',
      grain: 'SUM(order_amount) grouped by calendar month',
      audit: '✓ $1,428,950 total recognized monthly volume (+14.2% MoM)',
      edgeCase: 'Shipping fees and sales taxes must be isolated: gmv_product, gmv_shipping, gmv_tax.',
      sql: {
        postgres: `-- PostgreSQL 16: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_timestamp) AS month_start,
    SUM(order_amount) AS gmv
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  LAG(gmv) OVER (ORDER BY month_start) AS prev_gmv,
  ROUND(100.0 * (gmv - LAG(gmv) OVER (ORDER BY month_start)) / NULLIF(LAG(gmv) OVER (ORDER BY month_start), 0), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`,
        snowflake: `-- Snowflake: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_timestamp) AS month_start,
    SUM(order_amount) AS gmv
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  LAG(gmv) OVER (ORDER BY month_start) AS prev_gmv,
  ROUND(100.0 * (gmv - LAG(gmv) OVER (ORDER BY month_start)) / NULLIF(LAG(gmv) OVER (ORDER BY month_start), 0), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`,
        bigquery: `-- BigQuery: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC(order_timestamp, MONTH) AS month_start,
    SUM(order_amount) AS gmv
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  ROUND(100.0 * SAFE_DIVIDE(gmv - LAG(gmv) OVER (ORDER BY month_start), LAG(gmv) OVER (ORDER BY month_start)), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`,
        duckdb: `-- DuckDB: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    STRFTIME('%Y-%m-01', order_timestamp) AS month_start,
    SUM(order_amount) AS gmv
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  ROUND(100.0 * (gmv - LAG(gmv) OVER (ORDER BY month_start)) / NULLIF(LAG(gmv) OVER (ORDER BY month_start), 0), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`
      },
      commercialInsight: 'GMV is the executive benchmark for overall business scale. Combining GMV with gross margins and refund rates provides investors with the genuine health of the business.',
      interviewQuestion: 'What is the difference between GMV and Net Recognized Revenue?',
      pitfallTrap: 'GMV is total merchandise value passing through the checkout. Net Revenue deducts discounts, returns, processing fees, supplier payouts, and uncollected debts.'
    },

    'cac_ltv': {
      title: 'LTV / CAC Health Ratio // Unit Economics',
      pin: null,
      color: '#fbbf24',
      gauge: '03 COMMERCIAL REALITY',
      grain: '(Customer Lifetime Value) / (Blended Customer Acquisition Cost)',
      audit: '✓ $418.00 LTV / $42.50 CAC = 9.8x health ratio (Elite > 3.0x)',
      edgeCase: 'Never mask paid ad acquisition cost inflation behind blended organic referral signups.',
      sql: {
        postgres: `-- PostgreSQL 16: LTV to CAC Ratio Computation
WITH cohort_economics AS (
  SELECT
    ROUND(SUM(order_amount) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM orders
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(historic_ltv / blended_cac, 2) AS ltv_cac_multiple,
  CASE
    WHEN historic_ltv / blended_cac >= 3.0 THEN 'Healthy & Scalable'
    WHEN historic_ltv / blended_cac >= 1.0 THEN 'Marginal Unit Economics'
    ELSE 'Danger: Burning Capital'
  END AS economic_verdict
FROM cohort_economics;`,
        snowflake: `-- Snowflake: LTV to CAC Ratio
WITH cohort_economics AS (
  SELECT
    ROUND(SUM(order_amount) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM orders
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(historic_ltv / blended_cac, 2) AS ltv_cac_multiple
FROM cohort_economics;`,
        bigquery: `-- BigQuery: LTV to CAC Ratio
WITH cohort_economics AS (
  SELECT
    ROUND(SAFE_DIVIDE(SUM(order_amount), COUNT(DISTINCT customer_id)), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(SAFE_DIVIDE(historic_ltv, blended_cac), 2) AS ltv_cac_multiple
FROM cohort_economics;`,
        duckdb: `-- DuckDB: LTV to CAC Ratio
WITH cohort_economics AS (
  SELECT
    ROUND(SUM(order_amount) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM orders
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(historic_ltv / blended_cac, 2) AS ltv_cac_multiple
FROM cohort_economics;`
      },
      commercialInsight: 'An LTV/CAC ratio of 3x-5x is ideal. A ratio above 8x often means marketing spend is too conservative and the company is leaving revenue on the table.',
      interviewQuestion: 'How do you prevent survivorship bias when calculating LTV across customer cohorts?',
      pitfallTrap: 'Only measuring customers who survived 12 months overstates LTV. True LTV must include every customer acquired in the cohort, including those who churned on Day 1.'
    },

    // -------------------------------------------------------------------------
    // DRAFT 02: 7-DAY ROLLING MOVING WINDOW
    // -------------------------------------------------------------------------
    'window_frame': {
      title: 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
      pin: null,
      color: '#fbbf24',
      gauge: '02 ANALYTICAL SLIDING FRAME',
      grain: 'Sliding window buffer of 7 contiguous recorded rows',
      audit: '✓ $204,135 daily smoothed volume • Day-of-week seasonality neutralized',
      edgeCase: 'If dates with zero sales are absent from table, ROWS BETWEEN pulls data from 8+ days ago!',
      sql: {
        postgres: `-- PostgreSQL 16: 7-Day Rolling Moving Average
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_avg
FROM daily_sales_summary
ORDER BY order_date DESC;`,
        snowflake: `-- Snowflake: 7-Day Rolling Moving Average
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_avg
FROM daily_sales_summary
ORDER BY order_date DESC;`,
        bigquery: `-- BigQuery: RANGE with Interval for True Calendar Days
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY UNIX_DATE(order_date)
    RANGE BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_calendar_avg
FROM \`analytics.daily_sales_summary\`
ORDER BY order_date DESC;`,
        duckdb: `-- DuckDB: 7-Day Rolling Moving Average
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_avg
FROM daily_sales_summary
ORDER BY order_date DESC;`
      },
      commercialInsight: 'Weekend and holiday cyclicity causes recurring Sunday volume dips. The 7-day moving window eliminates this artificial volatility for executive trendline reporting.',
      interviewQuestion: 'What is the precise difference between ROWS and RANGE in window specifications?',
      pitfallTrap: 'ROWS operates on physical row offsets; RANGE operates on logical value differences. If a date is missing, ROWS takes the 7th prior row (perhaps 10 days ago), skewing the true average.'
    },

    'date_gaps': {
      title: 'Calendar Day Gaps // Scaffolding Missing Dates',
      pin: null,
      color: '#d97706',
      gauge: '01 WHAT FEEDS IT (DAILY NOISE)',
      grain: 'Continuous calendar sequence cross joined to dimension tables',
      audit: '! 3 holiday dates with 0 sales absent from raw orders table',
      edgeCase: 'Failure to scaffold creates invisible time jumps in analytical window frames.',
      sql: {
        postgres: `-- PostgreSQL 16: Generate Continuous Calendar Grid
WITH RECURSIVE calendar AS (
  SELECT '2026-01-01'::DATE AS cal_date
  UNION ALL
  SELECT cal_date + 1 FROM calendar WHERE cal_date < '2026-12-31'::DATE
)
SELECT
  c.cal_date,
  COALESCE(SUM(o.order_amount), 0) AS daily_sales
FROM calendar c
LEFT JOIN orders o ON DATE_TRUNC('day', o.order_timestamp) = c.cal_date
GROUP BY 1
ORDER BY 1;`,
        snowflake: `-- Snowflake: Calendar Table via Generator
SELECT
  DATEADD(day, seq4(), '2026-01-01')::DATE AS cal_date
FROM TABLE(GENERATOR(ROWCOUNT => 365));`,
        bigquery: `-- BigQuery: GENERATE_DATE_ARRAY
SELECT
  cal_date
FROM UNNEST(GENERATE_DATE_ARRAY('2026-01-01', '2026-12-31', INTERVAL 1 DAY)) AS cal_date;`,
        duckdb: `-- DuckDB: Range Calendar
SELECT
  range::DATE AS cal_date
FROM RANGE('2026-01-01'::DATE, '2026-12-31'::DATE, INTERVAL 1 DAY);`
      },
      commercialInsight: 'A robust data warehouse scaffold guarantees zero-day volume drops are legitimately recorded as $0 rather than omitted, preserving rolling average accuracy.',
      interviewQuestion: 'How would you write a query to detect and fill missing dates in BigQuery?',
      pitfallTrap: 'Never perform time-series analysis directly on sparse transactional logs without left joining to a generated calendar table.'
    },

    // -------------------------------------------------------------------------
    // DRAFT 03: COHORT RETENTION & CHURN MATRIX
    // -------------------------------------------------------------------------
    'cohort_month': {
      title: 'Acquisition Cohort // First Order Timestamp',
      pin: null,
      color: '#38bdf8',
      gauge: '01 ACQUISITION COHORT BASELINE',
      grain: 'MIN(DATE_TRUNC("month", order_date)) OVER (PARTITION BY user_id)',
      audit: '✓ 1,000 unique signups locked into Jan 2026 cohort (100% baseline)',
      edgeCase: 'Users signing up on Jan 31 at 23:59 UTC must not slip into Feb cohort due to timezone offsets.',
      sql: {
        postgres: `-- PostgreSQL 16: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1
ORDER BY 1;`,
        snowflake: `-- Snowflake: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1;`,
        bigquery: `-- BigQuery: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    DATE_TRUNC(MIN(order_timestamp), MONTH) AS cohort_month
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1;`,
        duckdb: `-- DuckDB: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    STRFTIME('%Y-%m-01', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1;`
      },
      commercialInsight: 'Locking cohort assignment by initial acquisition date establishes the immutable denominator for all subsequent lifetime retention curves.',
      interviewQuestion: 'How do you handle users who create an account in January but make their first purchase in March?',
      pitfallTrap: 'Clarify whether the business defines cohorts by signup date or activation (first transaction) date. Mixing them corrupts CAC payback calculations.'
    },

    'm3_asymptote': {
      title: 'Month 3 Asymptote // The Smile Curve',
      pin: null,
      color: '#10b981',
      gauge: '02 MONTH-OVER-MONTH ACTIVITY JOIN',
      grain: 'Monthly active user count / Initial cohort size (Denominator = 1,000)',
      audit: '✓ M0: 100% -> M1: 64% -> M2: 52% -> M3: 49.0% -> M4: 48.5% (Asymptote)',
      edgeCase: 'Never calculate retention over active users only; denominator must always be the original cohort baseline.',
      sql: {
        postgres: `-- PostgreSQL 16: Full Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATE_PART('month', AGE(DATE_TRUNC('month', o.order_timestamp), c.cohort_month))::INT AS month_number
  FROM orders o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
        snowflake: `-- Snowflake: Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATEDIFF('month', c.cohort_month, DATE_TRUNC('month', o.order_timestamp)) AS month_number
  FROM orders o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
        bigquery: `-- BigQuery: Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    DATE_TRUNC(MIN(order_timestamp), MONTH) AS cohort_month
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATE_DIFF(DATE_TRUNC(o.order_timestamp, MONTH), c.cohort_month, MONTH) AS month_number
  FROM \`analytics.orders\` o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
        duckdb: `-- DuckDB: Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    STRFTIME('%Y-%m-01', MIN(order_timestamp))::DATE AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATEDIFF('month', c.cohort_month, STRFTIME('%Y-%m-01', o.order_timestamp)::DATE) AS month_number
  FROM orders o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`
      },
      commercialInsight: 'When retention curves flatten parallel to the x-axis (~49%), it mathematically guarantees Product-Market Fit. Each new customer acquired permanently stacks on top of a resilient recurring floor.',
      interviewQuestion: 'How do you detect survivorship bias in customer churn analysis?',
      pitfallTrap: 'Querying only users active in the last 30 days filters out churned users, artificially inflating retention to 90%+. Always measure against the original cohort size at t=0.'
    }
  };

  // ---------------------------------------------------------------------------
  // SVG BUILDERS (COMPACT 920x520 WITH INTERACTIVE ROWS)
  // ---------------------------------------------------------------------------
  function getDraft1Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const bgSubtle = isDark ? '#141822' : '#f1f5f9';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const hNode = state.activeHighlightNode;
    const opac1 = (hNode === null || hNode === 1) ? '1' : '0.18';
    const opac2 = (hNode === null || hNode === 2) ? '1' : '0.18';
    const opac3 = (hNode === null || hNode === 3) ? '1' : '0.18';
    const opac4 = (hNode === null || hNode === 4) ? '1' : '0.18';

    const sel = state.selectedMetricId;

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-amber" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-emerald" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-rose" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP STATS METRIC BAR -->
        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="${textPrimary}" font-weight="700">14,280</tspan> orders tracked  &bull;  
          <tspan fill="#10b981" font-weight="700">0</tspan> null checkouts  &bull;  
          <tspan fill="#38bdf8" font-weight="700">3,410</tspan> unique buyers  &bull;  
          <tspan fill="#fbbf24" font-weight="700">3</tspan> relational gauges
        </text>

        <!-- TITLE & SUBTITLE -->
        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">One machine, three gauges</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}">Every transaction moves between the layers &mdash; The SQL machine traces the path from raw events to executive commercial KPIs.</text>

        <!-- ================================================================= -->
        <!-- GAUGE 1: RAW TRANSACTIONS (EVENTS • LOG)                          -->
        <!-- ================================================================= -->
        <g transform="translate(30, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">RAW TRANSACTIONS</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">events &bull; log</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <!-- Row 1: Orders Table Grain -->
          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'order_amount')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('order_amount')">
            <rect x="10" y="34" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="48" font-size="10.5" fill="${textSecondary}">Orders Table (Grain)</text>
            <text x="246" y="48" font-size="10" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">14,280</text>
          </g>

          <!-- Row 2: Cancelled Returns -->
          <text x="14" y="70" font-size="10.5" fill="${textMuted}">less: Returns / Cancelled</text>
          <text x="246" y="70" font-size="10" fill="#ef4444" text-anchor="end" font-family="'Geist Mono', monospace">(320)</text>

          <!-- Row 3: Net Valid Checkouts -->
          <g class="machine-interactive-row ${sel === 'net_checkouts' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'net_checkouts')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('net_checkouts')">
            <rect x="10" y="78" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="92" font-size="10.5" font-weight="600" fill="${textPrimary}">Net Valid Checkouts</text>
            <text x="246" y="92" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">13,960</text>
          </g>

          <!-- Row 4: [PIN 1] order_amount (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'order_amount' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'order_amount')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('order_amount')" opacity="${opac1}">
            <rect x="10" y="103" width="240" height="24" rx="4" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1"/>
            <circle cx="22" cy="115" r="7" fill="#0284c7" filter="url(#glow-cyan)"/>
            <text x="22" y="118.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>
            <text x="36" y="118.5" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">order_amount ($)</text>
            <text x="242" y="118.5" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">$1.43M</text>
          </g>

          <!-- Row 5: [PIN 2] customer_id (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'customer_id' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'customer_id')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('customer_id')" opacity="${opac2}">
            <rect x="10" y="133" width="240" height="24" rx="4" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1"/>
            <circle cx="22" cy="145" r="7" fill="#d97706" filter="url(#glow-amber)"/>
            <text x="22" y="148.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
            <text x="36" y="148.5" font-size="10" font-weight="700" fill="#fbbf24" font-family="'Geist Mono', monospace">customer_id (Dimension)</text>
            <text x="242" y="148.5" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">3,410</text>
          </g>

          <text x="14" y="176" font-size="10" fill="${textMuted}">Payment Method: Card / UPI</text>
          <text x="246" y="176" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">88.4%</text>

          <text x="14" y="196" font-size="10" fill="${textMuted}">Platform: Mobile iOS &bull; Web</text>
          <text x="246" y="196" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">68.5%</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; DATA INTEGRITY AUDIT: PASS</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">0 NULL checkouts &bull; Refund status excluded</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 2: SQL AGGREGATION (GROUP BY • LOGIC)                       -->
        <!-- ================================================================= -->
        <g transform="translate(330, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">SQL AGGREGATION</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">group by &bull; logic</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'order_amount')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('order_amount')">
            <rect x="10" y="34" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="48" font-size="10.5" fill="${textSecondary}">SUM(order_amount)</text>
            <text x="246" y="48" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">$1,428,950</text>
          </g>

          <!-- Row 2: [PIN 3] AVG(order_amount) (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'aov' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'aov')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('aov')" opacity="${opac3}">
            <rect x="10" y="60" width="240" height="24" rx="4" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1"/>
            <circle cx="22" cy="72" r="7" fill="#10b981" filter="url(#glow-emerald)"/>
            <text x="22" y="75.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
            <text x="36" y="75.5" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">AVG(order_amount) [AOV]</text>
            <text x="242" y="75.5" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$102.36</text>
          </g>

          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'customer_id')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('customer_id')">
            <rect x="10" y="89" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="103" font-size="10" fill="${textMuted}">COUNT(DISTINCT user_id)</text>
            <text x="246" y="103" font-size="9.5" fill="#f59e0b" text-anchor="end" font-family="'Geist Mono', monospace">3,410 users</text>
          </g>

          <text x="14" y="125" font-size="10" fill="${textMuted}">COUNT(order_id)</text>
          <text x="246" y="125" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">13,960</text>

          <text x="14" y="147" font-size="10.5" font-weight="600" fill="${textPrimary}">Purchase Frequency</text>
          <text x="246" y="147" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">4.09x</text>

          <text x="14" y="172" font-size="9.5" fill="${textMuted}">DATE_TRUNC('month', date)</text>
          <text x="246" y="172" font-size="9" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">2026-10</text>

          <text x="14" y="192" font-size="9.5" fill="${textMuted}">HAVING COUNT(order_id) &ge; 1</text>
          <text x="246" y="192" font-size="9" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">TRUE</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; ROLLUP GRAIN: 1 ROW / MONTH</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Dimensions: Year-Month &bull; Category</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 3: EXECUTIVE BUSINESS KPIS (COMMERCIAL • REALITY)            -->
        <!-- ================================================================= -->
        <g transform="translate(630, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">COMMERCIAL REALITY</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">business &bull; kpi</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <!-- Row 1: [PIN 4] GMV (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'gmv' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'gmv')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('gmv')" opacity="${opac4}">
            <rect x="10" y="37" width="240" height="25" rx="4" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" stroke-width="1"/>
            <circle cx="22" cy="49.5" r="7" fill="#f43f5e" filter="url(#glow-rose)"/>
            <text x="22" y="53" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">4</text>
            <text x="36" y="53" font-size="10" font-weight="700" fill="#f43f5e" font-family="'Geist Mono', monospace">Gross Monthly GMV</text>
            <text x="242" y="53" font-size="10" font-weight="800" fill="#f43f5e" text-anchor="end" font-family="'Geist Mono', monospace">$1,428,950</text>
          </g>

          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'aov')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('aov')">
            <rect x="10" y="66" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="80" font-size="10.5" fill="${textSecondary}">Average Basket Size</text>
            <text x="246" y="80" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$102.36</text>
          </g>

          <text x="14" y="103" font-size="10" fill="${textMuted}">Active Buyer Base</text>
          <text x="246" y="103" font-size="9.5" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">3,410</text>

          <text x="14" y="125" font-size="10" fill="${textMuted}">Customer Acquisition (CAC)</text>
          <text x="246" y="125" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42.50</text>

          <text x="14" y="147" font-size="10.5" font-weight="600" fill="${textPrimary}">Customer Lifetime Value (LTV)</text>
          <text x="246" y="147" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$418.00</text>

          <!-- LTV / CAC Health Ratio -->
          <g class="machine-interactive-row ${sel === 'cac_ltv' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'cac_ltv')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('cac_ltv')">
            <rect x="10" y="158" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="172" font-size="10" font-weight="600" fill="#fbbf24">LTV / CAC Health Ratio</text>
            <text x="246" y="172" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">9.8x (Elite)</text>
          </g>

          <text x="14" y="192" font-size="9.5" fill="${textMuted}">Repeat Buyer Revenue Share</text>
          <text x="246" y="192" font-size="9" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">64.2%</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; COMMERCIAL VERDICT: STRONG RETENTION</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Growth driven by repeat orders, not ad burn</text>
        </g>

        <!-- DELICATE CURVED BÉZIER FLOW WIRES -->
        <path d="M 280 195 C 302 195, 310 128, 330 128" fill="none" stroke="#38bdf8" stroke-width="${hNode === 1 ? '2.5' : '1.3'}" opacity="${opac1}" filter="${hNode === 1 ? 'url(#glow-cyan)' : 'none'}"/>
        <circle cx="280" cy="195" r="2.5" fill="#38bdf8" opacity="${opac1}"/>
        <circle cx="330" cy="128" r="2.5" fill="#38bdf8" opacity="${opac1}"/>

        <path d="M 280 225 C 305 225, 310 183, 330 183" fill="none" stroke="#f59e0b" stroke-width="${hNode === 2 ? '2.5' : '1.3'}" stroke-dasharray="3 2" opacity="${opac2}" filter="${hNode === 2 ? 'url(#glow-amber)' : 'none'}"/>
        <circle cx="280" cy="225" r="2.5" fill="#f59e0b" opacity="${opac2}"/>
        <circle cx="330" cy="183" r="2.5" fill="#f59e0b" opacity="${opac2}"/>

        <path d="M 580 152 C 605 152, 610 160, 630 160" fill="none" stroke="#10b981" stroke-width="${hNode === 3 ? '2.5' : '1.3'}" opacity="${opac3}" filter="${hNode === 3 ? 'url(#glow-emerald)' : 'none'}"/>
        <circle cx="580" cy="152" r="2.5" fill="#10b981" opacity="${opac3}"/>
        <circle cx="630" cy="160" r="2.5" fill="#10b981" opacity="${opac3}"/>

        <path d="M 580 128 C 605 128, 608 130, 630 130" fill="none" stroke="#f43f5e" stroke-width="${hNode === 4 ? '2.5' : '1.3'}" stroke-dasharray="4 2" opacity="${opac4}" filter="${hNode === 4 ? 'url(#glow-rose)' : 'none'}"/>
        <circle cx="580" cy="128" r="2.5" fill="#f43f5e" opacity="${opac4}"/>
        <circle cx="630" cy="130" r="2.5" fill="#f43f5e" opacity="${opac4}"/>

        <!-- BOTTOM RECONCILIATION MONOSPACE LINE -->
        <text x="30" y="372" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 raw order log streams into GMV &bull; 2 distinct keys deduplicate buyers &bull; 3 basket size calculates AOV &bull; 4 executive GMV reconciles with finance
        </text>

        <!-- BOTTOM DUAL DATA ANALYST PANELS -->
        <g transform="translate(30, 390)">
          <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <line x1="0" y1="0" x2="0" y2="92" stroke="#10b981" stroke-width="3"/>
          <text x="14" y="20" font-size="9" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // COMMERCIAL INSIGHT</text>
          <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Revenue is up +14.2% MoM not because acquisition costs rose, but because</text>
          <text x="14" y="52" font-size="9.5" fill="${textSecondary}">repeat buyer frequency reached 4.09x while AOV held steady at $102.36.</text>
          <text x="14" y="72" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">Commercial Action: Reallocate 18% of paid ad budget into customer retention.</text>
        </g>

        <g transform="translate(472, 390)">
          <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <line x1="0" y1="0" x2="0" y2="92" stroke="#f43f5e" stroke-width="3"/>
          <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // 1-TO-MANY FAN-OUT TRAP</text>
          <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Joining orders to order_items before executing SUM(order_amount) duplicates</text>
          <text x="14" y="52" font-size="9.5" fill="${textSecondary}">order totals across every line item in the basket. In an order with 4 items, GMV</text>
          <text x="14" y="72" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">is 4x inflated! Fix: Aggregate line items at order grain first before joining.</text>
        </g>

        <text x="30" y="504" font-size="8" fill="#3f3f46" font-family="'Geist Mono', monospace" letter-spacing="1">
          ILLUSTRATIVE DATA &bull; THE ENGINE TRACES DATA FLOW FROM RAW DB EVENTS TO EXECUTIVE COMMERCIAL METRICS
        </text>
      </svg>
    `;
  }

  function getDraft2Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const sel = state.selectedMetricId;

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-gold" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="#fbbf24" font-weight="700">L7D Moving Average</tspan>  &bull;  
          <tspan fill="${textPrimary}">ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</tspan>  &bull;  
          <tspan fill="#10b981">Zero-Collapse Cursor</tspan>
        </text>

        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">The 7-Day Rolling Moving Window</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">AVG(daily_sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</text>

        <!-- Column 1: WHAT FEEDS IT -->
        <g transform="translate(30, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHAT FEEDS IT // DAILY NOISE</text>
          
          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'window_frame')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('window_frame')">
            <rect y="22" width="220" height="38" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1"/>
            <text x="12" y="38" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Daily Fluctuation Spikes</text>
            <text x="12" y="51" font-size="8.5" fill="${textMuted}">Monday surge vs Sunday quiet period</text>
          </g>

          <g class="machine-interactive-row ${sel === 'date_gaps' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'date_gaps')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('date_gaps')">
            <rect y="68" width="220" height="38" rx="6" fill="${bgCard}" stroke="#d97706" stroke-width="1"/>
            <text x="12" y="84" font-size="10" font-weight="700" fill="#fbbf24" font-family="'Geist Mono', monospace">Calendar Day Gaps</text>
            <text x="12" y="97" font-size="8.5" fill="${textMuted}">Dates with zero transactions (missing rows)</text>
          </g>

          <rect y="114" width="220" height="38" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="12" y="130" font-size="10" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">One-Off Flash Sales</text>
          <text x="12" y="143" font-size="8.5" fill="${textMuted}">Black Friday / Cyber Monday anomalies</text>
        </g>

        <!-- Column 2: THE ELEMENT (HERO GLOWING CARD) -->
        <g transform="translate(290, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">ANALYTICAL SLIDING FRAME</text>
          
          <g class="machine-interactive-row ${sel === 'window_frame' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'window_frame')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('window_frame')">
            <rect y="22" width="340" height="130" rx="8" fill="${bgCard}" stroke="#d97706" stroke-width="1.4" filter="url(#glow-gold)"/>
            <text x="16" y="44" font-size="9" font-weight="800" fill="#fbbf24" font-family="'Geist Mono', monospace" letter-spacing="0.5">WINDOW FRAME SPECIFICATION</text>
            
            <text x="16" y="78" font-size="24" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">$204,135<tspan font-size="11" font-weight="500" fill="${textMuted}"> / day</tspan></text>
            <text x="16" y="98" font-size="10" fill="${textSecondary}">6 Preceding + Current Row = 7 Row Buffer</text>
            <line x1="16" y1="108" x2="324" y2="108" stroke="${border}" stroke-width="0.8"/>
            <text x="16" y="128" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; NOISE FILTERED: DAY-OF-WEEK CYCLICAL SKEW REMOVED</text>
          </g>
        </g>

        <!-- Column 3: WHERE IT GOES -->
        <g transform="translate(670, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHERE IT GOES // DECISIONS</text>
          
          <rect y="22" width="220" height="38" rx="6" fill="${bgCard}" stroke="#10b981" stroke-width="1"/>
          <text x="12" y="38" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">Executive Trendline</text>
          <text x="12" y="51" font-size="8.5" fill="${textMuted}">Noise-free curve on board deck</text>

          <rect y="68" width="220" height="38" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1"/>
          <text x="12" y="84" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Anomaly Detection</text>
          <text x="12" y="97" font-size="8.5" fill="${textMuted}">Flags true variance drifting &plusmn;3 std dev</text>

          <rect y="114" width="220" height="38" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="12" y="130" font-size="10" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">Safety Stock Reorder</text>
          <text x="12" y="143" font-size="8.5" fill="${textMuted}">Warehouse supply replenish triggers</text>
        </g>

        <!-- CONNECTORS -->
        <path d="M 250 120 C 270 120, 275 140, 290 140" fill="none" stroke="#0284c7" stroke-width="1.3"/>
        <path d="M 250 166 C 270 166, 275 140, 290 140" fill="none" stroke="#d97706" stroke-width="1.3"/>
        <path d="M 630 140 C 650 140, 655 120, 670 120" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <path d="M 630 140 C 650 140, 655 166, 670 166" fill="none" stroke="#0284c7" stroke-width="1.3"/>

        <!-- VOLATILITY RISK METER -->
        <g transform="translate(30, 248)">
          <rect width="860" height="60" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="16" y="20" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace">TREND CONFIDENCE // VOLATILITY SMOOTHING</text>
          
          <rect x="16" y="28" width="260" height="8" rx="2" fill="#ef4444" opacity="0.4"/>
          <text x="16" y="48" font-size="8.5" font-weight="700" fill="#ef4444" font-family="'Geist Mono', monospace">RAW DAILY: HIGH VOLATILITY NOISE</text>
          
          <rect x="286" y="28" width="260" height="8" rx="2" fill="#f59e0b" opacity="0.4"/>
          <text x="286" y="48" font-size="8.5" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">3-DAY: RESIDUAL WEEKEND SKEW</text>

          <rect x="556" y="28" width="290" height="8" rx="2" fill="#10b981" opacity="0.95"/>
          <text x="556" y="48" font-size="8.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; 7-DAY: ROBUST CYCLICAL SMOOTHING</text>
        </g>

        <!-- BOTTOM DUAL COMPARISON PANELS -->
        <g transform="translate(30, 326)">
          <g>
            <rect width="418" height="96" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="96" stroke="#10b981" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Never let stakeholders panic over Sunday sales dips. By reporting</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">the 7-day rolling moving average, day-of-week seasonality is naturally neutralised.</text>
            <text x="14" y="74" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">KPI Target: When 7-Day MA crosses above 30-Day MA &rarr; Positive momentum.</text>
          </g>

          <g transform="translate(442, 0)">
            <rect width="418" height="96" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="96" stroke="#f43f5e" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // THE MISSING DATE GAP TRAP</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">ROWS BETWEEN 6 PRECEDING takes 7 recorded rows, NOT 7 calendar days!</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">If Tuesday had 0 sales and lacks a row, it silently pulls data from 8 days ago!</text>
            <text x="14" y="74" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">Fix: Cross join with calendar table or use RANGE BETWEEN INTERVAL '6' DAY.</text>
          </g>
        </g>

        <text x="30" y="448" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          "A great data analyst does not present raw numbers &mdash; they strip away the noise so leadership can see the real signal."
        </text>
      </svg>
    `;
  }

  function getDraft3Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const bgSubtle = isDark ? '#141822' : '#f1f5f9';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const sel = state.selectedMetricId;

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-emerald" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="${textPrimary}" font-weight="700">1,000</tspan> users in Jan cohort  &bull;  
          <tspan fill="#10b981" font-weight="700">490</tspan> retained at Month 3  &bull;  
          <tspan fill="#38bdf8" font-weight="700">49.0%</tspan> asymptotic curve  &bull;  
          <tspan fill="#fbbf24" font-weight="700">114%</tspan> NRR
        </text>

        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">User Retention Cohort Matrix</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}">Measuring how many users acquired in Month M return in Month M+1, M+2, and beyond to prove Product-Market Fit.</text>

        <!-- Gauge 1: 01 ACQUISITION COHORT -->
        <g transform="translate(30, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">01 ACQUISITION COHORT</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">baseline</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <g class="machine-interactive-row ${sel === 'cohort_month' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'cohort_month')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('cohort_month')">
            <rect x="10" y="38" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="52" font-size="10.5" fill="${textSecondary}">Acquisition Month</text>
            <text x="246" y="52" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">2026-01</text>
          </g>

          <text x="14" y="78" font-size="10.5" fill="${textSecondary}">Total New Signups</text>
          <text x="246" y="78" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">1,000 users</text>

          <text x="14" y="104" font-size="10.5" fill="${textSecondary}">First Purchase Verified</text>
          <text x="246" y="104" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">100.0% (1,000)</text>

          <text x="14" y="130" font-size="10" fill="${textMuted}">Blended CAC Sunk</text>
          <text x="246" y="130" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42.50 / user</text>

          <text x="14" y="154" font-size="10" fill="${textMuted}">Total Cohort Spend</text>
          <text x="246" y="154" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42,500</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; BASELINE DENOMINATOR: 1,000 USERS</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Acquisition cost sunk &bull; Never changes</text>
        </g>

        <!-- Gauge 2: 02 MONTH-OVER-MONTH ACTIVITY JOIN (HERO CARD) -->
        <g transform="translate(330, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3" filter="url(#glow-emerald)"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace" letter-spacing="1.2">02 ACTIVITY DECAY CURVE</text>
          <text x="246" y="22" font-size="8.5" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">retention</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <text x="14" y="52" font-size="10" fill="${textMuted}">Month 0 (Jan): Baseline</text>
          <text x="246" y="52" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">1,000 (100.0%)</text>

          <text x="14" y="80" font-size="10.5" fill="${textSecondary}">Month 1 (Feb): Returning</text>
          <text x="246" y="80" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">640 (64.0%)</text>

          <text x="14" y="108" font-size="10.5" fill="${textSecondary}">Month 2 (Mar): Habituated</text>
          <text x="246" y="108" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">520 (52.0%)</text>

          <!-- Month 3 Asymptote Interactive -->
          <g class="machine-interactive-row ${sel === 'm3_asymptote' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'm3_asymptote')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('m3_asymptote')">
            <rect x="10" y="122" width="240" height="22" rx="3" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1"/>
            <text x="14" y="136" font-size="10.5" font-weight="600" fill="${textPrimary}">Month 3 (Apr): Core Base</text>
            <text x="246" y="136" font-size="10.5" font-weight="800" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">490 (49.0%)</text>
          </g>

          <text x="14" y="162" font-size="10" fill="${textMuted}">Month 4 (May): Asymptote</text>
          <text x="246" y="162" font-size="9.5" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">485 (48.5%)</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; RETENTION CURVE FLATTENS AT ~49%</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Asymptote parallel to x-axis = PMF</text>
        </g>

        <!-- Gauge 3: 03 UNIT ECONOMICS IMPACT -->
        <g transform="translate(630, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">03 UNIT ECONOMICS</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">impact</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <text x="14" y="52" font-size="10.5" fill="${textSecondary}">Customer Lifetime Value</text>
          <text x="246" y="52" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$480.00</text>

          <text x="14" y="80" font-size="10.5" fill="${textSecondary}">CAC Payback Period</text>
          <text x="246" y="80" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">3.2 Months</text>

          <text x="14" y="108" font-size="10.5" font-weight="600" fill="${textPrimary}">Net Revenue Retention (NRR)</text>
          <text x="246" y="108" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">114% (Expansion)</text>

          <text x="14" y="136" font-size="10" fill="${textMuted}">Annualized User Churn</text>
          <text x="246" y="136" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">12.4%</text>

          <text x="14" y="162" font-size="10" fill="${textMuted}">LTV / CAC Multiple</text>
          <text x="246" y="162" font-size="9.5" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">11.3x</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&radic; PRODUCT-MARKET FIT CONFIRMED</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Non-zero asymptote guarantees expansion</text>
        </g>

        <!-- DELICATE CONNECTORS -->
        <path d="M 290 140 L 330 140" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <circle cx="290" cy="140" r="2.5" fill="#10b981"/>
        <circle cx="330" cy="140" r="2.5" fill="#10b981"/>

        <path d="M 590 140 L 630 140" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <circle cx="590" cy="140" r="2.5" fill="#10b981"/>
        <circle cx="630" cy="140" r="2.5" fill="#10b981"/>

        <text x="30" y="372" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 acquisition cohort locks denominator &bull; 2 activity self-join measures retention &bull; 3 curve asymptote proves PMF &bull; 4 unit economics expand
        </text>

        <!-- BOTTOM DUAL COMPARISON PANELS -->
        <g transform="translate(30, 390)">
          <g>
            <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="92" stroke="#10b981" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">A retention curve that flattens parallel to the x-axis proves product-market</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">fit. When older cohorts retain at 49%, each new user added expands revenue.</text>
            <text x="14" y="72" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">Analyst Tip: Check if Jan 2026 cohort is higher than Nov 2025 (Product improvement!).</text>
          </g>

          <g transform="translate(442, 0)">
            <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="92" stroke="#f43f5e" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // SURVIVORSHIP BIAS IN CHURN</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Only counting users who visited in the last 30 days ignores deactivated</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">users, creating an illusion of high engagement by selecting only survivors!</text>
            <text x="14" y="72" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">Fix: Denominator must always be the original cohort size (1,000), never the active subset.</text>
          </g>
        </g>

        <text x="30" y="504" font-size="8" fill="#3f3f46" font-family="'Geist Mono', monospace" letter-spacing="1">
          "IF RETENTION DOES NOT FLATTEN, GROWTH IS JUST WATER POURING INTO A LEAKING BUCKET."
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // INTERACTION HANDLERS: TOOLTIP & DRAWER
  // ---------------------------------------------------------------------------
  function handleRowHover(evt, metricId) {
    const meta = METRIC_CATALOG[metricId];
    if (!meta) return;

    const tooltip = document.getElementById('machinesMicroTooltip');
    const stageCard = document.querySelector('.machines-canvas-card');
    if (!tooltip || !stageCard) return;

    tooltip.querySelector('.machines-tooltip-title').innerHTML = `
      <span>${meta.title}</span>
      ${meta.pin ? `<span style="background:${meta.color}; color:#ffffff; font-size:8px; padding:1px 4px; border-radius:3px;">PIN ${meta.pin}</span>` : ''}
    `;
    tooltip.querySelector('.machines-tooltip-grain').textContent = meta.grain;
    tooltip.querySelector('.machines-tooltip-audit').textContent = meta.audit;
    tooltip.querySelector('.machines-tooltip-edge').textContent = '⚠️ ' + meta.edgeCase;

    // Positioning
    const rect = stageCard.getBoundingClientRect();
    const x = evt.clientX - rect.left + 14;
    const y = evt.clientY - rect.top + 14;

    const maxX = rect.width - 330;
    tooltip.style.left = Math.min(x, maxX) + 'px';
    tooltip.style.top = Math.max(10, y) + 'px';
    tooltip.classList.add('visible');
  }

  function handleRowLeave() {
    const tooltip = document.getElementById('machinesMicroTooltip');
    if (tooltip) tooltip.classList.remove('visible');
  }

  function openDrawer(metricId, dialect) {
    handleRowLeave();
    const meta = METRIC_CATALOG[metricId];
    if (!meta) return;

    state.selectedMetricId = metricId;
    if (dialect) state.selectedDialect = dialect;
    state.isDrawerOpen = true;

    renderDrawerContent();

    const drawer = document.getElementById('machinesInspectorDrawer');
    if (drawer) drawer.classList.add('open');

    // Re-render SVG to update active-row highlight
    updateActiveSvgRows();
  }

  function closeDrawer() {
    state.isDrawerOpen = false;
    state.selectedMetricId = null;
    const drawer = document.getElementById('machinesInspectorDrawer');
    if (drawer) drawer.classList.remove('open');
    updateActiveSvgRows();
  }

  function switchDialect(dialect) {
    state.selectedDialect = dialect;
    renderDrawerContent();
  }

  function renderDrawerContent() {
    const drawer = document.getElementById('machinesInspectorDrawer');
    if (!drawer || !state.selectedMetricId) return;

    const meta = METRIC_CATALOG[state.selectedMetricId];
    if (!meta) return;

    const dialect = state.selectedDialect;
    const sqlCode = meta.sql[dialect] || meta.sql['postgres'];

    drawer.innerHTML = `
      <!-- Header -->
      <div class="machines-drawer-header">
        <div class="machines-drawer-title-col">
          <div class="machines-drawer-title-row">
            ${meta.pin ? `<span class="machines-drawer-pin" style="background:${meta.color};">${meta.pin}</span>` : ''}
            <h3 class="machines-drawer-title">${meta.title}</h3>
          </div>
          <span class="machines-drawer-subtitle">${meta.gauge}</span>
        </div>
        <button class="machines-drawer-close-btn" onclick="window.RelationalMachinesEngine.closeDrawer()" title="Close Inspector (Esc)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="machines-drawer-body">
        
        <!-- Dialect Selector Tabs -->
        <div class="machines-dialect-tabs">
          <button class="machines-dialect-tab ${dialect === 'postgres' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('postgres')">PostgreSQL 16</button>
          <button class="machines-dialect-tab ${dialect === 'snowflake' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('snowflake')">Snowflake</button>
          <button class="machines-dialect-tab ${dialect === 'bigquery' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('bigquery')">BigQuery</button>
          <button class="machines-dialect-tab ${dialect === 'duckdb' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('duckdb')">DuckDB / SQLite</button>
        </div>

        <!-- SQL Code Block Card -->
        <div class="machines-code-card">
          <div class="machines-code-toolbar">
            <span>PRODUCTION SQL QUERY</span>
            <button class="machines-copy-code-btn" onclick="window.RelationalMachinesEngine.copyDrawerSql()">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy SQL</span>
            </button>
          </div>
          <pre class="machines-code-pre" id="machinesDrawerCodeText">${escapeHtml(sqlCode)}</pre>
        </div>

        <!-- Commercial Takeaway Dossier -->
        <div class="machines-dossier-card accent-insight">
          <span class="machines-dossier-label" style="color:#10b981;">&bull; EXECUTIVE COMMERCIAL INSIGHT</span>
          <p class="machines-dossier-text">${meta.commercialInsight}</p>
        </div>

        <!-- Senior Staff Interview Secret -->
        <div class="machines-dossier-card accent-interview">
          <span class="machines-dossier-label" style="color:#38bdf8;">&bull; SENIOR INTERVIEW QUESTION &amp; LOGIC</span>
          <p class="machines-dossier-text" style="font-weight:700; color:#f8fafc; margin-bottom:3px;">"${meta.interviewQuestion}"</p>
          <p class="machines-dossier-text">${meta.pitfallTrap || ''}</p>
        </div>

        <!-- Data Sanity Specs -->
        <div class="machines-dossier-card">
          <span class="machines-dossier-label" style="color:#94a3b8;">&bull; SCHEMA GRAIN &amp; DATA QUALITY SPEC</span>
          <p class="machines-dossier-text" style="font-family:'Geist Mono', monospace; font-size:9.5px; color:#38bdf8; margin-bottom:2px;">${meta.grain}</p>
          <p class="machines-dossier-text" style="font-size:9.5px; color:#34d399;">${meta.audit}</p>
          <p class="machines-dossier-text" style="font-size:9px; color:#fbbf24; border-top:1px solid #1a2030; padding-top:4px; margin-top:3px;">⚠️ ${meta.edgeCase}</p>
        </div>

      </div>
    `;
  }

  function copyDrawerSql() {
    const el = document.getElementById('machinesDrawerCodeText');
    if (!el) return;
    const code = el.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        if (window.SQL_BUDDY) window.SQL_BUDDY.say("Production SQL copied to clipboard!", 3500, 'happy');
      });
    }
  }

  function updateActiveSvgRows() {
    const svgEl = document.getElementById('relationalMachineSvg');
    if (!svgEl) return;
    svgEl.querySelectorAll('.machine-interactive-row').forEach(row => {
      const id = row.getAttribute('data-metric-id');
      if (id && id === state.selectedMetricId) {
        row.classList.add('active-row');
      } else {
        row.classList.remove('active-row');
      }
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---------------------------------------------------------------------------
  // PUBLIC CONTROLLER & INTERFACE
  // ---------------------------------------------------------------------------
  function renderView() {
    const container = document.getElementById('viewRelationalMachines');
    if (!container) return;

    let svgHtml = '';
    if (state.activeDraft === 'machine01') {
      svgHtml = getDraft1Svg();
    } else if (state.activeDraft === 'machine02') {
      svgHtml = getDraft2Svg();
    } else {
      svgHtml = getDraft3Svg();
    }

    container.innerHTML = `
      <div class="machines-studio-wrapper ${state.canvasTheme === 'dark' ? 'theme-dark' : 'theme-light'}">
        
        <!-- Header Controls Bar -->
        <header class="machines-topbar">
          <div class="machines-topbar-left">
            <div class="machines-brand">
              <span class="machines-brand-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
              </span>
              <div>
                <h2 class="machines-title">Relational Machines</h2>
                <span class="machines-subtitle">SQL Data Analysis &bull; Business Intelligence Explainer SVGs</span>
              </div>
            </div>

            <!-- Draft Switcher Buttons -->
            <div class="machines-tabs-group">
              <button class="machine-tab-btn ${state.activeDraft === 'machine01' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine01')">
                <span>01 Metric Engine (Revenue, AOV &amp; Frequency)</span>
              </button>
              <button class="machine-tab-btn ${state.activeDraft === 'machine02' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine02')">
                <span>02 Metric Deconstructed (7-Day Rolling Trend)</span>
              </button>
              <button class="machine-tab-btn ${state.activeDraft === 'machine03' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine03')">
                <span>03 Cohort Retention &amp; Churn Matrix</span>
              </button>
            </div>
          </div>

          <!-- Right Action Tools -->
          <div class="machines-topbar-right">
            <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.toggleTheme()" title="Toggle Dark / Light Canvas">
              <span>${state.canvasTheme === 'dark' ? '&#9728; Light' : '&#9790; Dark'}</span>
            </button>
            <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.downloadSvg()" title="Download Standalone SVG File">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download SVG</span>
            </button>
            <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.copySvgCode()" title="Copy Raw SVG XML to Clipboard">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy SVG</span>
            </button>
          </div>
        </header>

        <!-- Main SVG Viewer Stage with Anchored Overlays -->
        <main class="machines-canvas-card">
          <div class="machines-svg-viewport" id="machinesSvgViewport" style="transform: scale(${state.zoomLevel}); transform-origin: top center; transition: transform 0.2s ease;">
            ${svgHtml}
          </div>

          <!-- Feature 5: Floating Micro-Tooltip -->
          <div class="machines-micro-tooltip" id="machinesMicroTooltip">
            <div class="machines-tooltip-title"></div>
            <div class="machines-tooltip-grain"></div>
            <div class="machines-tooltip-audit"></div>
            <div class="machines-tooltip-edge"></div>
            <div class="machines-tooltip-hint">Click row to inspect SQL formula &rarr;</div>
          </div>

          <!-- Feature 3: Slide-over SQL Inspector Drawer -->
          <aside class="machines-inspector-drawer" id="machinesInspectorDrawer" aria-label="Metric Inspector Drawer"></aside>
        </main>

      </div>
    `;

    // Rebind ESC key
    document.removeEventListener('keydown', handleGlobalKeydown);
    document.addEventListener('keydown', handleGlobalKeydown);
  }

  function handleGlobalKeydown(e) {
    if (e.key === 'Escape' && state.isDrawerOpen) {
      closeDrawer();
    }
  }

  function switchDraft(draftKey) {
    state.activeDraft = draftKey;
    state.activeHighlightNode = null;
    state.selectedMetricId = null;
    state.isDrawerOpen = false;
    renderView();
  }

  function highlightNode(nodeId) {
    state.activeHighlightNode = state.activeHighlightNode === nodeId ? null : nodeId;
    renderView();
  }

  function toggleTheme() {
    state.canvasTheme = state.canvasTheme === 'dark' ? 'light' : 'dark';
    renderView();
  }

  function downloadSvg() {
    const svgEl = document.getElementById('relationalMachineSvg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgEl);
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.activeDraft + '_data_analysis_machine.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("Exported pristine " + state.activeDraft + ".svg data analysis machine!", 4000, 'celebrate');
  }

  function copySvgCode() {
    const svgEl = document.getElementById('relationalMachineSvg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(source).then(() => {
        if (window.SQL_BUDDY) window.SQL_BUDDY.say("Data Analysis SVG code copied to clipboard!", 3500, 'happy');
      });
    }
  }

  function init() {
    renderView();
  }

  return {
    init,
    switchDraft,
    highlightNode,
    toggleTheme,
    downloadSvg,
    copySvgCode,
    handleRowHover,
    handleRowLeave,
    openDrawer,
    closeDrawer,
    switchDialect,
    copyDrawerSql
  };
})();
