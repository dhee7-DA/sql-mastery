# ❄️ Day 17: Cloud Warehouses, QUALIFY & Micro-Partition Pruning

## 🎯 Executive Overview
Day 17 explores modern analytical database architectures: Snowflake, Google BigQuery, and DuckDB. We transition from row-oriented storage engines (PostgreSQL, InnoDB) to vectorized columnar formats (Parquet, Capacitor, ORC), immutable micro-partitioning, metadata-based min/max pruning, and the powerful ANSI `QUALIFY` clause for zero-subquery window deduplication.

---

## 🛠️ Curriculum File Structure
```
day-17-cloud-warehousing-snowflake-bigquery/
├── README.md               # Architecture roadmap and sprint guide
├── THEORY.md               # Columnar physics, micro-partition metadata, QUALIFY clause
├── queries.sql             # 6 production analytical warehouse queries
├── SOLUTIONS_BREAKDOWN.md  # Vectorized execution autopsy & pruning analysis
├── INTERVIEW_QUESTIONS.md  # 10 Staff Data Architect interview defense questions
├── ASSESSMENT.md           # 5 Warehouse optimization challenges
└── DAILY_LOG.md            # Sprint benchmarks and mental models
```
