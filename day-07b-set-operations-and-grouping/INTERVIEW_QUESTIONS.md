# 💼 Day 07b: High-Frequency Interview Questions

---

### Question 1: The Memory Cost of `UNION` vs. `UNION ALL` (Netflix / Systems Architecture)
**Interviewer**: *"In a high-throughput event processing pipeline ingesting 50 million telemetry rows daily, an engineer writes a query with `UNION` instead of `UNION ALL`. What physical engine disaster occurs?"*

#### The Candidate Answer:
1. **The Sort/Hash Bottleneck**:
   - `UNION ALL` streams rows directly from the table scan operators into the output buffer with $\mathcal{O}(1)$ working memory.
   - `UNION` enforces set uniqueness. It must either:
     - Load all 50 million rows into an in-memory hash table.
     - Or sort the entire 50-million-row dataset using an External Merge Sort.
2. **Disk Spill Disaster**:
   - When the dataset exceeds the database buffer allocation (`work_mem` in Postgres or `sort_buffer_size` in MySQL), the engine spills intermediate sort runs to local disk (tempdb).
   - This transforms an $\mathcal{O}(N)$ streaming query into an $\mathcal{O}(N \log N)$ disk-thrashing operation, causing query execution time to spike from 2 seconds to 15+ minutes and consuming massive IOPS.
3. **Engineering Standard**: Always write `UNION ALL` by default. Only use `UNION` if deduplication is an explicit functional requirement that cannot be handled earlier.

---

### Question 2: Why `GROUPING SETS` Beats Chained `UNION ALL` (Amazon / Data Warehouse Architect)
**Interviewer**: *"Suppose an executive dashboard requires sales totals by (Brand, Category), (Brand), and (Category). Contrast writing this with 3 `UNION ALL` queries vs. using `GROUPING SETS`."*

#### The Candidate Answer:
- **Chained `UNION ALL`**: Forces the storage engine to perform **3 independent full table scans** or index scans across the fact table. If the fact table has 1 billion rows, the engine reads 3 billion row equivalents.
- **`GROUPING SETS`**: The query planner reads the underlying fact table **exactly once**. It aggregates rows into an internal multi-dimensional hash aggregate or sort tree and emits all three grouping grains in a single pipelined pass. This reduces storage I/O by $66\%$.

---

### Question 3: Sargability and the Function-Wrapped Column Trap (Meta / Production Engineering)
**Interviewer**: *"Why does this query cause a production outage during peak traffic, and how do you optimize it?"*
```sql
SELECT order_id, user_id, amount
FROM orders
WHERE DATE(created_at) = '2026-03-15';
```

#### The Candidate Answer:
1. **The Non-Sargable Anti-Pattern**:
   - Wrapping `created_at` inside the `DATE()` function blinds the B-Tree index on `created_at`.
   - The engine cannot perform an index seek because the index keys store raw timestamps, not the result of `DATE(created_at)`.
   - As a result, the engine is forced to perform a **Full Table Scan**, evaluating `DATE()` on every single row in the table.
2. **The Sargable Antidote**:
   - Keep the indexed column raw on one side of the operator:
   ```sql
   SELECT order_id, user_id, amount
   FROM orders
   WHERE created_at >= '2026-03-15 00:00:00'
     AND created_at < '2026-03-16 00:00:00';
   ```
   - This enables an **Index Range Seek** ($\mathcal{O}(\log N)$), jumping directly to the first timestamp of March 15th and scanning only rows up to midnight.
