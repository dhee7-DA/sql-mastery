# 💼 Day 17 Senior & Staff Engineer Interview Questions: Cloud Warehouses

---

### Q1: Explain how Snowflake separates Compute and Storage, and what happens when a query "spills to remote storage".
**Target Level**: Staff Data Engineer / Architect (Snowflake, Databricks)

In Snowflake:
- **Storage Layer**: Pure immutable cloud object store (Amazon S3 / Google Cloud Storage / Azure Blob). Scalable to infinity, charged at raw disk rates.
- **Compute Layer**: Ephemeral clusters of virtual machines (Virtual Warehouses: XS to 6XL). Stateless, caches data on local NVMe SSDs.
- **Cloud Services Layer**: Coordinates metadata, authentication, transactions, and min/max partition pruning.

**Spilling Mechanics**:
When a complex query (e.g. huge `GROUP BY` or Hash Join) requires more memory than the Virtual Warehouse RAM can hold:
1. **Spill to Local Storage**: The engine writes excess sort/hash buffers to the VM's local NVMe SSD. Latency increases moderately.
2. **Spill to Remote Storage**: If local SSD fills up, the engine writes chunks back to Amazon S3! Latency spikes by $10\times-100\times$.
- **Remediation**: Resize warehouse up (e.g. M $\to$ L) to double RAM, or rewrite queries to eliminate massive Cartesian joins.

---

### Q2: What is the `QUALIFY` clause, and what is its exact execution order relative to `WHERE`, `HAVING`, and `SELECT`?
**Target Level**: Senior Analytics Engineer (Google, Netflix)

`QUALIFY` filters the results of window functions, similar to how `HAVING` filters the results of aggregate functions.

**Logical Execution Order**:
1. `FROM`
2. `WHERE` (Row-level filters)
3. `GROUP BY` (Aggregation buckets)
4. `HAVING` (Aggregate filters)
5. `WINDOW` (Calculates all `OVER (...)` functions)
6. `QUALIFY` (Filters rows based on computed window function values!)
7. `SELECT` (Column projections)
8. `DISTINCT`
9. `ORDER BY`
10. `LIMIT`
