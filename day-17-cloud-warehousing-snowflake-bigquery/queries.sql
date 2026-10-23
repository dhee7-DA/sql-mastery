-- =============================================================================
-- DAY 17: CLOUD WAREHOUSE ANALYTICAL PATTERNS (SNOWFLAKE / BIGQUERY / DUCKDB)
-- =============================================================================

-- 1. Deduplicating Event Telemetry Stream using QUALIFY
SELECT 
    event_id,
    device_id,
    user_id,
    payload_json,
    ingested_at
FROM raw_device_events
WHERE ingested_at >= CURRENT_DATE - INTERVAL 7 DAY
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY device_id, DATE_TRUNC('hour', ingested_at) 
    ORDER BY ingested_at DESC
) = 1;

-- 2. Multi-Metric Top-N Window Filtering in a Single Pass
SELECT 
    department_id,
    employee_id,
    salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as sal_rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY performance_score DESC) as perf_rank
FROM enterprise_payroll
QUALIFY sal_rank <= 3 OR perf_rank = 1;

-- 3. Dynamic Time-Travel Query (Snowflake AT / BEFORE Syntax)
SELECT 
    portfolio_id,
    SUM(market_value_usd) AS portfolio_value_pre_rebalance
FROM institutional_holdings 
AT(OFFSET => -60*15) -- State of table exactly 15 minutes ago
GROUP BY portfolio_id;

-- 4. Vectorized PIVOT / UNPIVOT for Financial Reporting
SELECT 
    quarter,
    product_family,
    SUM(net_revenue) AS revenue
FROM quarterly_sales
UNPIVOT (
    net_revenue FOR product_family IN (enterprise_software, cloud_storage, advisory_services)
)
GROUP BY quarter, product_family;
