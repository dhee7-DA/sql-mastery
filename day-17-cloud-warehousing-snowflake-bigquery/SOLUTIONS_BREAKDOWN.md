# 🔬 Day 17 Solutions Breakdown: Cloud Warehouse Query Execution

---

## Query 1: QUALIFY Deduplication Architecture
### The Mechanics:
- `raw_device_events` is stored in columnar Parquet micro-partitions.
- The `WHERE ingested_at >= CURRENT_DATE - 7` clause prunes $95\%$ of cloud micro-partitions at the metadata layer before any compute nodes touch the storage layer.
- The columnar projection engine extracts only `device_id`, `ingested_at`, `event_id`, `user_id`, and `payload_json`.
- The vectorized window operator groups rows by `(device_id, hour)` in high-speed SIMD memory registers and keeps only the latest event (`rn = 1`).
- **Memory Efficiency**: Unlike PostgreSQL which sorts rows into disk work-mem if large, Snowflake's vectorized execution engine performs this in streaming chunk pipelines.
