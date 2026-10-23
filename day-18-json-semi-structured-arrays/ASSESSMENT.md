# 📝 Day 18 Assessment: Semi-Structured JSON Mastery

## 🎯 Benchmark Challenges
1. **The Webhook Ingestion Engine**: Build a schema and GIN index structure to ingest 1,000 heterogeneous webhook payloads per second.
2. **The Dynamic Array Flattener**: Use `CROSS JOIN LATERAL` to unpack nested billing line items and compute tax totals per invoice.
3. **The Nested Hierarchy Builder**: Aggregate a 3-level parent-child relational table (Company $\to$ Division $\to$ Team) into a single nested JSON document using `jsonb_agg`.
4. **The Safe Schema Migration**: Write an idempotent `UPDATE` script to migrate a legacy JSON string attribute into a structured sub-object using `jsonb_set`.
5. **The JSON Index Benchmark**: Measure disk size and query latency across Unindexed, `jsonb_ops`, and `jsonb_path_ops` on a 1M-row table.
