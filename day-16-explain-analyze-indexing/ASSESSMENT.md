# 📝 Day 16 Assessment: Query Tuning & Indexing Mastery

## 🎯 Benchmark Challenges
1. **The Range Scan Tuning Challenge**: Eliminate a `Seq Scan` on a 50M-row financial ledger table where queries filter on `tenant_id` and sort by `posting_date DESC`.
2. **The Covering Index Challenge**: Design an `INCLUDE` index that converts a high-traffic dashboard query from `Bitmap Heap Scan` to `Index Only Scan`.
3. **The SARGability Audit**: Rewrite 4 legacy queries using functions in `WHERE` clauses into indexable bounded range seeks.
4. **The Partial Index Space Optimization**: Create a partial index that consumes $< 5\%$ disk space compared to a full table index while speeding up unhandled background jobs.
5. **The Concurrent Reindex Script**: Write an operational runbook script to monitor index bloat via `pgstatindex` and trigger zero-downtime concurrent reindexing.
