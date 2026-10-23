-- =============================================================================
-- DAY 20: THE GRAND ENTERPRISE GAUNTLET — 5 BOSS CHALLENGES
-- =============================================================================

-- BOSS CHALLENGE 1: High-Frequency Multi-Asset Trade Settlement & Wash Trading Audit
WITH Executions AS (
    SELECT 
        trade_id,
        trader_id,
        symbol,
        side,
        price,
        quantity,
        trade_time,
        LAG(trade_time) OVER (
            PARTITION BY trader_id, symbol ORDER BY trade_time
        ) AS prev_trade_time,
        LAG(side) OVER (
            PARTITION BY trader_id, symbol ORDER BY trade_time
        ) AS prev_side
    FROM trade_records
    WHERE trade_date = CURRENT_DATE
),
SuspiciousReversals AS (
    SELECT 
        trade_id,
        trader_id,
        symbol,
        price,
        quantity,
        trade_time,
        EXTRACT(EPOCH FROM (trade_time - prev_trade_time)) AS seconds_between_trades
    FROM Executions
    WHERE prev_side IS NOT NULL 
      AND side != prev_side 
      AND trade_time <= prev_trade_time + INTERVAL '5 seconds'
)
SELECT 
    trader_id,
    symbol,
    COUNT(*) AS rapid_wash_cycle_count,
    SUM(price * quantity) AS total_churned_notional_usd
FROM SuspiciousReversals
GROUP BY trader_id, symbol
HAVING COUNT(*) >= 3
ORDER BY rapid_wash_cycle_count DESC;

-- BOSS CHALLENGE 2: Recursive Bill of Materials & Cost Rollup with Assembly Constraints
WITH RECURSIVE PartExplosion AS (
    -- Anchor: Top-Level Finished Goods
    SELECT 
        parent_part_id,
        child_part_id,
        unit_quantity,
        1 AS assembly_depth,
        ARRAY[parent_part_id] AS path_lineage
    FROM bill_of_materials
    WHERE parent_part_id = 'FG-TURBINE-X1'

    UNION ALL

    -- Recursive Step: Sub-assemblies and component parts
    SELECT 
        b.parent_part_id,
        b.child_part_id,
        p.unit_quantity * b.unit_quantity,
        p.assembly_depth + 1,
        p.path_lineage || b.parent_part_id
    FROM bill_of_materials b
    JOIN PartExplosion p ON b.parent_part_id = p.child_part_id
    WHERE NOT (b.parent_part_id = ANY(p.path_lineage)) -- Cycle prevention!
)
SELECT 
    e.child_part_id AS leaf_part_code,
    c.part_name,
    SUM(e.unit_quantity) AS total_parts_required,
    c.unit_cost_usd,
    SUM(e.unit_quantity) * c.unit_cost_usd AS extended_cost_usd
FROM PartExplosion e
JOIN catalog_parts c ON e.child_part_id = c.part_id
WHERE NOT EXISTS (
    SELECT 1 FROM bill_of_materials sub WHERE sub.parent_part_id = e.child_part_id
)
GROUP BY e.child_part_id, c.part_name, c.unit_cost_usd
ORDER BY extended_cost_usd DESC;
