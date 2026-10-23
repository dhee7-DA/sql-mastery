-- =============================================================================
-- DAY 16: BENCHMARK QUERIES & EXECUTION PLAN ANALYSIS
-- =============================================================================

-- 1. Uncovering Sequential Scan on Unindexed Column
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT order_id, account_id, price, quantity
FROM trading_orders
WHERE account_id = 90210
ORDER BY created_at DESC
LIMIT 50;

-- 2. Exploiting Composite Index (Leading Column Rule)
-- Uses: CREATE INDEX idx_orders_acct_created ON trading_orders(account_id, created_at DESC);
EXPLAIN (ANALYZE, BUFFERS)
SELECT order_id, symbol, price
FROM trading_orders
WHERE account_id = 90210 
  AND created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- 3. Achieving Pure Index-Only Scan with Covering Index (INCLUDE)
-- Uses: CREATE INDEX idx_orders_symbol_status ON trading_orders(symbol, order_status) INCLUDE (price, quantity);
EXPLAIN (ANALYZE, BUFFERS)
SELECT symbol, SUM(price * quantity) AS total_traded_volume
FROM trading_orders
WHERE symbol = 'AAPL' AND order_status = 'FILLED'
GROUP BY symbol;

-- 4. Partial Index for Extreme Write & Space Efficiency
-- Indexing only 1% of table that is currently PENDING
-- Uses: CREATE INDEX idx_orders_active_pending ON trading_orders(created_at) WHERE order_status = 'PENDING';
EXPLAIN (ANALYZE, BUFFERS)
SELECT order_id, account_id, symbol, created_at
FROM trading_orders
WHERE order_status = 'PENDING'
ORDER BY created_at ASC
LIMIT 20;

-- 5. Functional Expression Index (Sargability Fix)
-- Anti-Pattern: WHERE DATE(created_at) = '2026-10-14' (forces Seq Scan)
-- Production Pattern: Bounded Range Scan
EXPLAIN (ANALYZE, BUFFERS)
SELECT COUNT(*) 
FROM trading_orders
WHERE created_at >= '2026-10-14 00:00:00+00' 
  AND created_at <  '2026-10-15 00:00:00+00';
