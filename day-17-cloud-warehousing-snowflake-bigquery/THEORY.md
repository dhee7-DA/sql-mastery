# 📚 Day 17 Deep-Dive Theory: Columnar Formats, Snowflake/BigQuery Internals & QUALIFY Filtering

---

## 🏛️ 1. Row-Oriented (OLTP) vs. Columnar (OLAP) Physics

In traditional OLTP databases (PostgreSQL/MySQL), rows are written contiguously across 8KB/16KB disk pages:

```text
ROW-ORIENTED (Heap Page):
[ Row 1: ID, Date, Customer, Item, Amount ] [ Row 2: ID, Date, Customer, Item, Amount ]
```
When executing an aggregation `SELECT SUM(Amount) FROM sales;`, the engine must read every single byte of every column off disk into RAM, wasting $90\%$ of disk bus bandwidth.

In modern Columnar Warehouses (Snowflake, BigQuery, ClickHouse, DuckDB), each column is stored as an independent, compressed physical file or block:

```text
COLUMNAR STORAGE:
[ Column ID:       1, 2, 3, 4, ... ]
[ Column Date:     2026-10-01, 2026-10-01, 2026-10-02, ... ]
[ Column Amount:   150.00, 240.50, 89.00, 1200.00, ... ]
```
To calculate `SUM(Amount)`, the engine reads **only** the `Amount` column file from cloud object storage (S3/GCS), achieving $10\times-100\times$ higher throughput!

---

## 🔬 2. Micro-Partitioning & Metadata Min/Max Pruning

Snowflake automatically divides tables into immutable **micro-partitions** (50MB to 500MB uncompressed).

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   SNOWFLAKE MICRO-PARTITION PRUNING                    │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [ Central Cloud Services Metadata Layer ]                             │
│    Partition 1: date [2026-01-01, 2026-01-15], region [US, EU]         │
│    Partition 2: date [2026-01-16, 2026-01-31], region [US, US]         │
│    Partition 3: date [2026-02-01, 2026-02-15], region [APAC, APAC]     │
│                                                                        │
│  Query: WHERE date = '2026-02-10' AND region = 'US'                   │
│                                                                        │
│  Pruning Evaluation:                                                   │
│    - Partition 1: Date matches? NO ──► PRUNED (Zero disk I/O)          │
│    - Partition 2: Date matches? NO ──► PRUNED (Zero disk I/O)          │
│    - Partition 3: Region matches? NO ──► PRUNED (Zero disk I/O)        │
│                                                                        │
│  Total Partitions Read: 0 / 3 (100% Metadata Pruning!)                 │
└────────────────────────────────────────────────────────────────────────┘
```

Because min/max ranges for every column are stored in the metadata service, queries can prune thousands of partitions **without reading a single byte from S3**!

---

## ⚡ 3. The `QUALIFY` Clause: Window Filtering Without Subqueries

In standard PostgreSQL or MySQL, filtering by a window function requires nesting a Common Table Expression (CTE) or subquery because window functions are evaluated in Step 6 (after `WHERE` and `HAVING`):

```sql
-- ❌ TRADITIONAL POSTGRES / MYSQL (Requires Subquery Overhead):
WITH RankedEvents AS (
    SELECT event_id, user_id, event_time,
           ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_time DESC) AS rn
    FROM user_telemetry
)
SELECT * FROM RankedEvents WHERE rn = 1;
```

In Snowflake, BigQuery, DuckDB, and Databricks, the ANSI `QUALIFY` clause acts as a dedicated post-window filter:

```sql
-- ✅ MODERN CLOUD WAREHOUSE STANDARD (Clean, Zero Subquery):
SELECT event_id, user_id, event_time
FROM user_telemetry
QUALIFY ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_time DESC) = 1;
```
`QUALIFY` filters rows directly in memory immediately following the window calculation step, eliminating intermediate CTE materialized boundaries!
