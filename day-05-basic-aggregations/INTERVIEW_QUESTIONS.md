# 💼 Day 05 Real-World Company Interview Scenarios

---

## 🏢 Scenario 1: Meta / Facebook (Finding Duplicate Records & Data Cleansing)
**Interview Question**:  
"Given a table of user registrations `UserSignups(user_id, email, ip_address, created_at)`, write a query to find all email addresses that have been registered more than once, along with the count of registrations."

```sql
SELECT email, COUNT(*) AS registration_count
FROM UserSignups
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY registration_count DESC;
```
> **Senior Follow-up**: "Why can't you write `WHERE COUNT(*) > 1`?"  
> **Answer**: `WHERE` executes *before* grouping occurs, filtering individual rows as they are read from disk. `COUNT(*)` does not exist until rows are aggregated into buckets, which is why bucket-level filtering must happen in the `HAVING` clause.

---

## 🏢 Scenario 2: Stripe / FinTech (Single-Scan Conditional Aggregation)
**Interview Question**:  
"Given a table `Charges(charge_id, merchant_id, amount_cents, status)`, calculate in a **single table scan**: total charges count, total dollar volume, successful capture count, and refund volume."

```sql
SELECT 
    merchant_id,
    COUNT(*) AS total_transactions,
    ROUND(SUM(amount_cents) / 100.0, 2) AS gross_volume_usd,
    
    -- Conditional Aggregation:
    COUNT(CASE WHEN status = 'SUCCEEDED' THEN 1 END) AS successful_charges,
    COALESCE(SUM(CASE WHEN status = 'REFUNDED' THEN amount_cents ELSE 0 END) / 100.0, 0) AS refunded_volume_usd,
    
    -- Success Rate Percentage:
    ROUND(
        100.0 * COUNT(CASE WHEN status = 'SUCCEEDED' THEN 1 END) / NULLIF(COUNT(*), 0),
        2
    ) AS success_rate_pct
FROM Charges
GROUP BY merchant_id;
```
> **Senior Follow-up**: "Why use `NULLIF(COUNT(*), 0)` in the denominator?"  
> **Answer**: To prevent a catastrophic Division by Zero (`#DIV/0!`) runtime exception if the table contains zero records for a merchant.

---

## 🏢 Scenario 3: Netflix (Silent Average Gotcha)
**Interview Question**:  
"A product manager wants the average minutes watched per subscriber for the month. Column `minutes_watched` has `NULL` for users who never logged in. What happens if you run `AVG(minutes_watched)` vs `SUM(minutes_watched) / COUNT(*)`?"

```sql
-- Query A:
SELECT AVG(minutes_watched) FROM UserMonthlyActivity;

-- Query B:
SELECT SUM(COALESCE(minutes_watched, 0)) / COUNT(*) FROM UserMonthlyActivity;
```
> **Answer**:  
> * **Query A** calculates average minutes *only among users who actually watched something* (excluding inactive users from the denominator). This falsely inflates engagement metrics!  
> * **Query B** includes every registered subscriber in the denominator, accurately reporting corporate Average Watch Time Per Account.

---

## 🏢 Scenario 4: Google / Snowflake Engine Architecture (Hash vs Sort Aggregate)
**Interview Question**:  
"How does the database physical execution engine actually compute `GROUP BY`?"

* **Hash Aggregate**:
  - The engine allocates an in-memory Hash Table (`std::unordered_map` equivalent).
  - For each row, it hashes the group keys and updates running accumulators (`sum += val`, `count++`).
  - **Complexity**: $O(N)$ time, $O(K)$ space where $K$ is the number of distinct groups.
* **Sort Aggregate (Stream Aggregate)**:
  - If memory is constrained or data is already sorted by index, the engine sorts input by the group key and scans in order, flushing aggregate values whenever the key changes.
  - **Complexity**: $O(N \log N)$ without index, $O(N)$ with index, $O(1)$ space.
