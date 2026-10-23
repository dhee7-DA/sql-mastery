-- =============================================================================
-- DAY 18: PRODUCTION JSONB & LATERAL UNNESTING BENCHMARK QUERIES
-- =============================================================================

-- 1. High-Performance JSONB Containment Query with GIN Index
-- Uses: CREATE INDEX idx_events_payload ON webhook_events USING GIN (payload jsonb_path_ops);
SELECT 
    event_id, 
    payload->>'event_type' AS event_name,
    payload#>>'{customer,email}' AS customer_email,
    created_at
FROM webhook_events
WHERE payload @> '{"event_type": "invoice.payment_succeeded", "currency": "usd"}'
LIMIT 25;

-- 2. Unnesting Nested JSON Line Items via LATERAL jsonb_array_elements
SELECT 
    o.order_id,
    o.created_at,
    item.value->>'sku' AS sku_code,
    (item.value->>'quantity')::INT AS qty,
    (item.value->>'unit_price')::NUMERIC AS price
FROM raw_orders o
CROSS JOIN LATERAL jsonb_array_elements(o.payload->'line_items') AS item
WHERE o.created_at >= NOW() - INTERVAL '24 hours';

-- 3. In-Database JSON Re-Aggregation (Building Nested JSON from Relational Tables)
SELECT 
    d.department_id,
    d.department_name,
    jsonb_build_object(
        'headcount', COUNT(e.employee_id),
        'total_budget', SUM(e.salary),
        'employees', jsonb_agg(
            jsonb_build_object(
                'id', e.employee_id,
                'name', e.full_name,
                'title', e.job_title
            ) ORDER BY e.salary DESC
        )
    ) AS department_summary_json
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name;

-- 4. Atomic In-Place JSONB Patching (jsonb_set & Concatenation Operator)
UPDATE user_profiles
SET profile_data = jsonb_set(
    profile_data,
    '{preferences,notifications,marketing_emails}',
    'false'::JSONB,
    TRUE -- Create path if not existing
) || '{"last_modified_source": "gdpr_portal"}'::JSONB
WHERE user_id = 90210;
