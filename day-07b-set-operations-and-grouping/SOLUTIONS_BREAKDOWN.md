# 🔍 Day 07b: Solutions Breakdown & Execution Physics

---

## Challenge 1: Multi-System Customer Reconciliation

### 1. Problem Statement
Integrate records from Legacy CRM and Cloud CRM. Produce:
1. A unified system audit log preserving provenance using `UNION ALL`.
2. A de-duplicated customer profile dataset using `UNION`.

### 2. Deep Technical Breakdown: `UNION ALL` vs. `UNION`
- **`UNION ALL` Plan**:
  - The query planner generates an `Append` operator.
  - Rows from `legacy_crm_customers` are scanned and streamed directly into the output pipeline buffer.
  - Immediately following, rows from `cloud_crm_customers` are scanned and streamed into the output buffer.
  - **Memory Footprint**: $\mathcal{O}(1)$ buffer memory. **CPU Overhead**: Zero de-duplication hashing.
- **`UNION` Plan**:
  - The query planner generates an `Append` followed by a `Sort (Unique)` or `Aggregate (Hash)` operator.
  - All rows from both tables are ingested into an in-memory hash table (or sorted on disk if exceeding `sort_buffer_size`).
  - Identical duplicate tuples (`(103, Carol White, carol@corp.com)`) are merged into a single emitted row.
  - **Memory Footprint**: $\mathcal{O}(N)$ where $N$ is total combined rows.

---

## Challenge 2: Discrepancy Audit via Set Difference (`EXCEPT` / Anti-Join)

### 1. Problem Statement
Reconcile two independent payment ledgers: `payment_gateway_ledger` and `core_banking_ledger`. Identify transactions that exist in one system but are missing from the other.

### 2. Deep Technical Breakdown
- Instead of relying on dialect-specific `EXCEPT` or `MINUS` operators (which may vary in support across older MySQL or SQLite engines), we deployed the canonical **Bidirectional Anti-Semi-Join** pattern:
  $$\text{Discrepancies} = (A \setminus B) \cup (B \setminus A)$$
- **Plan for Gateway $\setminus$ Core**:
  - Performs an index probe on `core_banking_ledger.txn_id`.
  - For `TXN-003`, no matching record exists in the core ledger. The subquery returns 0 rows $\implies$ `NOT EXISTS` evaluates to `TRUE` $\implies$ Row is emitted as an unreconciled gateway transaction.
- **Plan for Core $\setminus$ Gateway**:
  - For `TXN-005`, no matching record exists in the gateway ledger $\implies$ Emitted as an unreconciled core transaction.

---

## Challenge 3: Cross-Platform Identity Overlap (`INTERSECT`)

### 1. Problem Statement
Isolate the subset of users active simultaneously on Web and Mobile applications.

### 2. Deep Technical Breakdown
- `INTERSECT` computes the set intersection: $A \cap B$.
- Using `EXISTS`:
  - Evaluates the outer query `web_active_users`.
  - For each user (`user_id = 2`, `user_id = 3`), checks if `mobile_active_users` has that ID.
  - When an index exists on `mobile_active_users.user_id`, this check takes $\mathcal{O}(\log M)$ time per row.
  - User 1 is rejected (not on mobile); User 4 is never scanned by the outer query.
  - Emits `usr_beta` and `usr_gamma`.

---

## Challenge 4: Corporate Financial Reporting with `ROLLUP` & `GROUPING()`

### 1. Problem Statement
Generate hierarchical sales totals:
1. Granular Store Level: `(region, country, store_name)`
2. Country Subtotal: `(region, country, NULL)`
3. Regional Subtotal: `(region, NULL, NULL)`
4. Global Grand Total: `(NULL, NULL, NULL)`

### 2. Deep Technical Breakdown: The `GROUPING()` Function
- When the engine rolls up a dimension, it injects a synthetic `NULL` into that column.
- The `GROUPING(column_name)` function returns:
  - `0` if the value is part of the regular grouping set.
  - `1` if the value was converted to `NULL` by the super-aggregate rollup process.
- This allows our `CASE WHEN` expressions to dynamically print meaningful corporate labels:
  ```sql
  CASE 
      WHEN GROUPING(region) = 1 THEN '🌎 ALL REGIONS (GRAND TOTAL)'
      ELSE region 
  END AS region_tier
  ```
- **Execution Efficiency**: The database performs **a single table scan** and aggregates upwards through an aggregation tree, replacing 4 distinct queries and 3 `UNION ALL` statements!
