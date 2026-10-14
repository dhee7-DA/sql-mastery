# 🔬 Day 14 Solutions Breakdown: Mechanical Autopsy & Storage Internals

---

## Benchmark Problem 1: High-Throughput Idempotent Webhook Upsert Pipeline

```sql
INSERT INTO processed_orders (
    order_id, customer_id, total_amount_cents, order_status, 
    revision_count, first_received_at, last_updated_at
)
VALUES 
    ('ORD-2026-001', 501, 14999, 'SHIPPED', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ORD-2026-002', 502, 29900, 'PAID',    1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ORD-2026-001', 501, 14999, 'DELIVERED', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (order_id) 
DO UPDATE SET
    order_status = EXCLUDED.order_status,
    total_amount_cents = EXCLUDED.total_amount_cents,
    revision_count = processed_orders.revision_count + 1,
    last_updated_at = CURRENT_TIMESTAMP
RETURNING 
    order_id, customer_id, order_status, revision_count, 
    first_received_at, last_updated_at;
```

### Mechanical Autopsy:
1. **The Conflict Target `(order_id)`**:
   - The engine checks the unique B+ Tree index on `processed_orders.order_id`.
   - If row `'ORD-2026-001'` does not exist, the engine allocates heap space and inserts the row with `revision_count = 1`.
2. **Conflict Resolution & The `EXCLUDED` Pseudo-Table**:
   - When the duplicate `'ORD-2026-001'` tuple is encountered, the engine suppresses the unique violation error.
   - It routes the execution flow to the `DO UPDATE` branch.
   - The expression `EXCLUDED.order_status` accesses the value proposed by the incoming statement (`'DELIVERED'`), while `processed_orders.revision_count` accesses the current value already committed in the table.
   - `revision_count` is incremented atomically in RAM without an application roundtrip.
3. **Preserving Initial Provenance**:
   - Notice that `first_received_at` is omitted from the `SET` clause! This ensures the original timestamp remains permanently intact while `last_updated_at` moves forward.
4. **Complexity & I/O Footprint**:
   - **Time Complexity**: $\mathcal{O}(K \log N)$ where $K$ is batch size and $N$ is total table rows.
   - **Locks Acquired**: Exclusive Row Lock on `order_id` only during the write.

---

## Benchmark Problem 2: Atomic Double-Entry Financial Ledger Transfer

```sql
DO $$
DECLARE
    v_sender_id INT := 101;
    v_receiver_id INT := 102;
    v_amount_cents BIGINT := 500000; -- $5,000.00
    v_tx_ref UUID := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID;
    v_sender_balance BIGINT;
BEGIN
    -- 1. Acquire row locks in strict ascending primary key order
    IF v_sender_id < v_receiver_id THEN
        PERFORM 1 FROM accounts WHERE account_id = v_sender_id FOR UPDATE;
        PERFORM 1 FROM accounts WHERE account_id = v_receiver_id FOR UPDATE;
    ELSE
        PERFORM 1 FROM accounts WHERE account_id = v_receiver_id FOR UPDATE;
        PERFORM 1 FROM accounts WHERE account_id = v_sender_id FOR UPDATE;
    END IF;

    -- 2. Verify sender balance
    SELECT balance_cents INTO v_sender_balance 
    FROM accounts WHERE account_id = v_sender_id;

    IF v_sender_balance < v_amount_cents THEN
        RAISE EXCEPTION 'INSUFFICIENT_FUNDS: Account % has % cents', v_sender_id, v_sender_balance;
    END IF;

    -- 3. Execute Debit
    UPDATE accounts 
    SET balance_cents = balance_cents - v_amount_cents, version = version + 1
    WHERE account_id = v_sender_id;

    -- 4. Execute Credit
    UPDATE accounts 
    SET balance_cents = balance_cents + v_amount_cents, version = version + 1
    WHERE account_id = v_receiver_id;

    -- 5. Record Double-Entry Journal Entry
    INSERT INTO journal_entries (
        transaction_ref, debit_account_id, credit_account_id, amount_cents, description
    ) VALUES (
        v_tx_ref, v_sender_id, v_receiver_id, v_amount_cents, 
        'Inter-account operational treasury rebalancing'
    );
END $$;
```

### Mechanical Autopsy:
1. **Sorted Lock Acquisition (Deadlock Immunity)**:
   - If User 101 sends money to User 102 while User 102 sends money to User 101 simultaneously, unsorted locking causes a circular deadlock:
     - Transaction 1: Locks 101, attempts to lock 102.
     - Transaction 2: Locks 102, attempts to lock 101.
   - By sorting: `IF v_sender_id < v_receiver_id`, **both transactions attempt to lock Account 101 first**. Transaction 2 cleanly sleeps until Transaction 1 completes, eliminating deadlocks mathematically!
2. **Double-Entry Balance Invariant**:
   - The debit and credit are wrapped in the identical transaction boundary.
   - If a power outage occurs after the debit but before the credit, the database crash recovery replays the Undo log upon reboot, restoring the sender's funds.
3. **Database Check Constraints as Safety Net**:
   - `CONSTRAINT chk_non_negative_balance CHECK (balance_cents >= 0)` ensures that even if application logic suffers a bug, the storage engine will violently reject any mutation that drops a balance below zero.

---

## Benchmark Problem 3: Ultra-High-Throughput Task Queue (`SKIP LOCKED`)

```sql
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
RETURNING t.task_id, t.queue_name, t.priority, t.payload;
```

### Mechanical Autopsy:
1. **The Bottleneck of Standard `FOR UPDATE`**:
   - Without `SKIP LOCKED`, Worker 1 locks tasks 1, 2, and 3.
   - When Worker 2 executes `SELECT ... LIMIT 3 FOR UPDATE`, it encounters the exclusive lock on task 1 and pauses, waiting for Worker 1 to finish. All workers serialize into a single-file line.
2. **The Magic of `SKIP LOCKED`**:
   - When Worker 2 runs `FOR UPDATE SKIP LOCKED`, the lock manager checks row locks in memory.
   - Rows 1, 2, and 3 are marked locked $\to$ Worker 2 **skips them instantly** and claims rows 4, 5, and 6!
   - Result: 100 concurrent workers achieve 100% linear parallelism with **0 lock wait time**.
3. **Atomic State Hand-off with CTE Mutation**:
   - Combining the `SELECT ... FOR UPDATE` with `UPDATE ... RETURNING` inside a single CTE statement executes the claim and status transition in a single atomic database roundtrip.

---

## Benchmark Problem 4: SCD Type 2 Atomic Merge Pipeline

```sql
-- Step 1: Expire modified records
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

-- Step 2: Insert new active versions
INSERT INTO dim_customers_scd2 (
    customer_id, full_name, email, loyalty_tier, city, 
    valid_from, valid_to, is_current
)
SELECT 
    s.customer_id, s.full_name, s.email, s.loyalty_tier, s.city,
    v_effective_date AS valid_from,
    '9999-12-31'::DATE AS valid_to,
    TRUE AS is_current
FROM stg_customers_feed s
LEFT JOIN dim_customers_scd2 d 
  ON s.customer_id = d.customer_id 
 AND d.is_current = TRUE
WHERE d.customer_skey IS NULL;
```

### Mechanical Autopsy:
1. **Two-Phase Atomic State Transition**:
   - Step 1 locates all currently active records (`is_current = TRUE`) whose incoming attributes differ from staging. It sets `valid_to` to yesterday and flips `is_current = FALSE`.
   - Step 2 joins staging against currently active dimension rows. For any customer who was either brand-new or just closed in Step 1, `d.customer_skey` is `NULL`.
   - Step 2 inserts a brand new row with a fresh auto-incrementing `customer_skey`, preserving the historical snapshot indefinitely!
2. **Point-in-Time Historical Reproducibility**:
   - Any historical financial report can join against `dim_customers_scd2` using:
     `WHERE f.order_date BETWEEN d.valid_from AND d.valid_to`
   - Elena's orders in 2025 will correctly attribute revenue to **London**, while her orders in 2026 will attribute revenue to **Paris**!
