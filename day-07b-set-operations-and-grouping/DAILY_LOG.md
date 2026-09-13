# 📝 Day 07b: Daily Execution Log

---

## ⏱️ Session Overview
- **Date**: 2026-09-13
- **Topic**: Set Operations (`UNION`, `INTERSECT`, `EXCEPT`), Multi-Dimensional Grouping (`ROLLUP`, `CUBE`), and Index Sargability
- **Dialects Tested**: ANSI SQL / MySQL 8.0+ / PostgreSQL 15+
- **Status**: ✅ 100% Verified & Tested

---

## 🛠️ Execution & Debugging Notes

### 1. `GROUPING()` Function in MySQL 8.0+ vs PostgreSQL
- In MySQL 8.0, `ROLLUP` is invoked using `GROUP BY col1, col2 WITH ROLLUP`.
- In PostgreSQL and ANSI SQL, it is written `GROUP BY ROLLUP (col1, col2)`.
- The `GROUPING(col)` function behaves identically across both engines: returning `1` when the column has been collapsed into a super-aggregate subtotal, and `0` when it reflects a regular grouping row.

### 2. Discrepancy Reconciliation Benchmarking
- Tested `NOT EXISTS` anti-join vs `LEFT JOIN ... WHERE right_id IS NULL` on our payment ledger audit.
- Both yield identical execution plans when `txn_id` is indexed as the primary key.
- `NOT EXISTS` provides cleaner semantics when filtering across multiple independent attributes.
