# 📓 Day 17 Execution Log: Cloud Warehouses, QUALIFY & Micro-Partitions

---

## ⏱️ Session Overview
- **Topic**: Cloud Data Warehousing, Columnar Formats, Snowflake/BigQuery Internals & QUALIFY.
- **Milestone**: Curriculum Expansion Day 17 / 20.
- **Key Realization**: Columnar storage changes everything: disk I/O is governed by column projection width rather than row count, and metadata min/max pruning makes queries on billions of rows return in milliseconds.
