-- =============================================================================
-- SQL MASTERY INTENSIVE: DAY 14
-- TOPIC: DML, ATOMIC UPSERTS, ACID TRANSACTIONS & CONCURRENCY CONTROL
-- =============================================================================

-- =============================================================================
-- 1. SCHEMA DEFINITION & SEED DATA DDL
-- =============================================================================

DROP TABLE IF EXISTS journal_entries CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS task_queue CASCADE;
DROP TABLE IF EXISTS incoming_webhook_orders CASCADE;
DROP TABLE IF EXISTS processed_orders CASCADE;
DROP TABLE IF EXISTS dim_customers_scd2 CASCADE;
DROP TABLE IF EXISTS stg_customers_feed CASCADE;

-- A. Core Banking & Ledger Accounts
CREATE TABLE accounts (
    account_id INT PRIMARY KEY,
    holder_name VARCHAR(100) NOT NULL,
    account_tier VARCHAR(20) DEFAULT 'STANDARD',
    balance_cents BIGINT NOT NULL DEFAULT 0,
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_non_negative_balance CHECK (balance_cents >= 0)
);

CREATE TABLE journal_entries (
    entry_id SERIAL PRIMARY KEY,
    transaction_ref UUID NOT NULL,
    debit_account_id INT NOT NULL REFERENCES accounts(account_id),
    credit_account_id INT NOT NULL REFERENCES accounts(account_id),
    amount_cents BIGINT NOT NULL CHECK (amount_cents > 0),
    description VARCHAR(255) NOT NULL,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- B. Lock-Free Work Queue
CREATE TABLE task_queue (
    task_id SERIAL PRIMARY KEY,
    queue_name VARCHAR(50) NOT NULL,
    priority INT NOT NULL DEFAULT 5, -- 10 = High, 1 = Low
    payload JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'QUEUED' 
        CHECK (status IN ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED')),
    locked_by VARCHAR(50),
    locked_at TIMESTAMP WITH TIME ZONE,
    retry_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- C. Webhook Ingestion & Idempotent Target
CREATE TABLE processed_orders (
    order_id VARCHAR(50) PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount_cents BIGINT NOT NULL,
    order_status VARCHAR(30) NOT NULL,
    revision_count INT NOT NULL DEFAULT 1,
    first_received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- D. Slowly Changing Dimension Type 2 (SCD2)
CREATE TABLE dim_customers_scd2 (
    customer_skey SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    loyalty_tier VARCHAR(30) NOT NULL,
    city VARCHAR(50) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL DEFAULT '9999-12-31',
    is_current BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE stg_customers_feed (
    customer_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    loyalty_tier VARCHAR(30) NOT NULL,
    city VARCHAR(50) NOT NULL,
    extracted_at DATE NOT NULL
);

-- Seed Accounts
INSERT INTO accounts (account_id, holder_name, account_tier, balance_cents, version) VALUES
(101, 'Alice Smith (Treasury)', 'ENTERPRISE', 10000000, 1), -- $100,000.00
(102, 'Bob Jones (Operations)', 'STANDARD',     2500000, 1), -- $25,000.00
(103, 'Charlie Brown (Payroll)', 'STANDARD',     1000000, 1), -- $10,000.00
(104, 'Diana Prince (Escrow)',   'PREMIUM',      5000000, 1); -- $50,000.00

-- Seed Work Queue Tasks
INSERT INTO task_queue (queue_name, priority, payload, status) VALUES
('email_notifications', 10, '{"template": "welcome_email", "user_id": 901}', 'QUEUED'),
('email_notifications', 5,  '{"template": "weekly_digest",  "user_id": 412}', 'QUEUED'),
('invoice_generation',  10, '{"invoice_id": "INV-2026-001", "amount": 4500}', 'QUEUED'),
('invoice_generation',  8,  '{"invoice_id": "INV-2026-002", "amount": 1250}', 'QUEUED'),
('fraud_scoring',       10, '{"transaction_id": "TX-9912", "risk": "HIGH"}', 'QUEUED'),
('fraud_scoring',       3,  '{"transaction_id": "TX-9913", "risk": "LOW"}',  'QUEUED'),
('email_notifications', 2,  '{"template": "marketing_blast", "user_id": 88}', 'QUEUED');

-- Seed Initial SCD Type 2 Active Records
INSERT INTO dim_customers_scd2 (customer_id, full_name, email, loyalty_tier, city, valid_from, valid_to, is_current) VALUES
(501, 'Elena Rostova', 'elena@corp.io', 'SILVER', 'London', '2025-01-01', '9999-12-31', TRUE),
(502, 'Marcus Vance',  'marcus@vc.com', 'GOLD',   'New York', '2025-01-01', '9999-12-31', TRUE),
(503, 'Siddharth Rao', 'sid@tech.in',   'PLATINUM', 'Bengaluru', '2025-01-01', '9999-12-31', TRUE);


-- =============================================================================
-- BENCHMARK PROBLEM 1: IDEMPOTENT WEBHOOK UPSERT PIPELINE
-- Goal: Ingest high-volume webhook events without throwing duplicate primary key
--       errors, keeping track of first_received_at while incrementing revision counts.
-- =============================================================================

-- Scenario: Webhook event batch arrives containing both brand-new orders
-- and updates/re-deliveries for existing orders.

-- PostgreSQL Variant (ON CONFLICT):
INSERT INTO processed_orders (
    order_id, 
    customer_id, 
    total_amount_cents, 
    order_status, 
    revision_count, 
    first_received_at, 
    last_updated_at
)
VALUES 
    ('ORD-2026-001', 501, 14999, 'SHIPPED', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ORD-2026-002', 502, 29900, 'PAID',    1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ORD-2026-001', 501, 14999, 'DELIVERED', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) -- Duplicate re-delivery with status progression!
ON CONFLICT (order_id) 
DO UPDATE SET
    order_status = EXCLUDED.order_status,
    total_amount_cents = EXCLUDED.total_amount_cents,
    revision_count = processed_orders.revision_count + 1,
    last_updated_at = CURRENT_TIMESTAMP
RETURNING 
    order_id, 
    customer_id, 
    order_status, 
    revision_count, 
    first_received_at, 
    last_updated_at;

-- MySQL Equivalent Variant:
/*
INSERT INTO processed_orders (order_id, customer_id, total_amount_cents, order_status, revision_count, first_received_at, last_updated_at)
VALUES ('ORD-2026-001', 501, 14999, 'DELIVERED', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    order_status = VALUES(order_status),
    total_amount_cents = VALUES(total_amount_cents),
    revision_count = revision_count + 1,
    last_updated_at = NOW();
*/


-- =============================================================================
-- BENCHMARK PROBLEM 2: ATOMIC DOUBLE-ENTRY FINANCIAL LEDGER TRANSFER
-- Goal: Transfer $5,000.00 (500,000 cents) from Alice (101) to Bob (102).
--       Guarantee atomicity, prevent race conditions via deterministic row locking,
--       verify non-negative constraints, and insert an immutable audit log.
-- =============================================================================

DO $$
DECLARE
    v_sender_id INT := 101;
    v_receiver_id INT := 102;
    v_amount_cents BIGINT := 500000; -- $5,000.00
    v_tx_ref UUID := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID;
    v_sender_balance BIGINT;
BEGIN
    -- 1. CRITICAL: Acquire row locks in strict ascending primary key order!
    -- This prevents circular wait deadlocks if another transfer is moving money 102 -> 101.
    IF v_sender_id < v_receiver_id THEN
        PERFORM 1 FROM accounts WHERE account_id = v_sender_id FOR UPDATE;
        PERFORM 1 FROM accounts WHERE account_id = v_receiver_id FOR UPDATE;
    ELSE
        PERFORM 1 FROM accounts WHERE account_id = v_receiver_id FOR UPDATE;
        PERFORM 1 FROM accounts WHERE account_id = v_sender_id FOR UPDATE;
    END IF;

    -- 2. Verify sender has sufficient funds
    SELECT balance_cents INTO v_sender_balance 
    FROM accounts 
    WHERE account_id = v_sender_id;

    IF v_sender_balance < v_amount_cents THEN
        RAISE EXCEPTION 'INSUFFICIENT_FUNDS: Account % has % cents, transfer requires % cents', 
            v_sender_id, v_sender_balance, v_amount_cents;
    END IF;

    -- 3. Execute Debit
    UPDATE accounts 
    SET balance_cents = balance_cents - v_amount_cents,
        version = version + 1
    WHERE account_id = v_sender_id;

    -- 4. Execute Credit
    UPDATE accounts 
    SET balance_cents = balance_cents + v_amount_cents,
        version = version + 1
    WHERE account_id = v_receiver_id;

    -- 5. Record Double-Entry Journal Entry
    INSERT INTO journal_entries (
        transaction_ref, 
        debit_account_id, 
        credit_account_id, 
        amount_cents, 
        description
    ) VALUES (
        v_tx_ref, 
        v_sender_id, 
        v_receiver_id, 
        v_amount_cents, 
        'Inter-account operational treasury rebalancing'
    );

    RAISE NOTICE 'TRANSFER_SUCCESSFUL: Transferred % cents from % to % (Ref: %)', 
        v_amount_cents, v_sender_id, v_receiver_id, v_tx_ref;
END $$;


-- =============================================================================
-- BENCHMARK PROBLEM 3: ULTRA-HIGH-THROUGHPUT TASK QUEUE (SKIP LOCKED)
-- Goal: Allow 100 concurrent worker threads to claim batches of up to 3 tasks
--       without contention, lock serialization, or duplicate processing.
-- =============================================================================

-- Worker Node 01 claims its batch:
WITH ClaimedTasks AS (
    SELECT task_id
    FROM task_queue
    WHERE queue_name = 'email_notifications'
      AND status = 'QUEUED'
    ORDER BY priority DESC, created_at ASC
    LIMIT 3
    FOR UPDATE SKIP LOCKED
)
UPDATE task_queue t
SET status = 'PROCESSING',
    locked_by = 'worker-node-alpha',
    locked_at = CURRENT_TIMESTAMP
FROM ClaimedTasks c
WHERE t.task_id = c.task_id
RETURNING 
    t.task_id, 
    t.queue_name, 
    t.priority, 
    t.payload, 
    t.status, 
    t.locked_by, 
    t.locked_at;


-- =============================================================================
-- BENCHMARK PROBLEM 4: SCD TYPE 2 ATOMIC MERGE PIPELINE
-- Goal: Ingest daily staging feed updates into customer dimension.
--       If customer city or tier changed, expire the active row (valid_to = extracted_at)
--       and insert a brand new row with is_current = TRUE.
-- =============================================================================

-- Seed incoming staging feed for 2026-10-14:
-- Elena moved to Paris; Marcus upgraded to PLATINUM; Siddharth had no changes.
INSERT INTO stg_customers_feed (customer_id, full_name, email, loyalty_tier, city, extracted_at) VALUES
(501, 'Elena Rostova', 'elena@corp.io', 'SILVER',   'Paris',     '2026-10-14'), -- City changed: London -> Paris
(502, 'Marcus Vance',  'marcus@vc.com', 'PLATINUM', 'New York',  '2026-10-14'), -- Tier changed: GOLD -> PLATINUM
(503, 'Siddharth Rao', 'sid@tech.in',   'PLATINUM', 'Bengaluru', '2026-10-14'); -- No changes

-- Atomic SCD2 Execution Block:
DO $$
DECLARE
    v_effective_date DATE := '2026-10-14';
BEGIN
    -- Step 1: Expire active dimension rows that have incoming attribute mutations
    UPDATE dim_customers_scd2 d
    SET valid_to = v_effective_date - INTERVAL '1 day',
        is_current = FALSE
    FROM stg_customers_feed s
    WHERE d.customer_id = s.customer_id
      AND d.is_current = TRUE
      AND (
          d.loyalty_tier != s.loyalty_tier 
          OR d.city != s.city 
          OR d.full_name != s.full_name 
          OR d.email != s.email
      );

    -- Step 2: Insert new active versions for changed or new records
    INSERT INTO dim_customers_scd2 (
        customer_id, 
        full_name, 
        email, 
        loyalty_tier, 
        city, 
        valid_from, 
        valid_to, 
        is_current
    )
    SELECT 
        s.customer_id,
        s.full_name,
        s.email,
        s.loyalty_tier,
        s.city,
        v_effective_date AS valid_from,
        '9999-12-31'::DATE AS valid_to,
        TRUE AS is_current
    FROM stg_customers_feed s
    LEFT JOIN dim_customers_scd2 d 
      ON s.customer_id = d.customer_id 
     AND d.is_current = TRUE
    WHERE d.customer_skey IS NULL; -- Either brand new customer, or row was closed in Step 1!

    RAISE NOTICE 'SCD2_SYNC_COMPLETE for date %', v_effective_date;
END $$;

-- Verify SCD2 Historical State:
SELECT customer_id, full_name, loyalty_tier, city, valid_from, valid_to, is_current
FROM dim_customers_scd2
ORDER BY customer_id, valid_from;
