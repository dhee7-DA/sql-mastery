# 📝 Day 01 Notes & Reflections

- **Date**: 2026-08-30 to 2026-08-31
- **Platform**: HackerRank (Basic Select Track)
- **Status**: 5 / 8 Problems Solved (50.00 / 80.00 Points Earned — 63% to 1st Star Badge)

---

## 💡 Key Takeaways
1. **Logical Execution Order**: SQL does not run top-to-bottom. The database evaluates `FROM` (table scan) ➡️ `WHERE` (row filtering) ➡️ `SELECT` (column projection) ➡️ `DISTINCT` (deduplication).
2. **Table Grain & Column Semantics**: Always check what one row represents before writing queries. In the `CITY` table, `NAME` represents the city name, while `DISTRICT` represents the region/prefecture.
3. **Data Type Rules**: Single quotes are mandatory for string literals (`'USA'`, `'JPN'`), but numbers (`100000`, `1661`) must never have quotes.
4. **ANSI Portability**: The core SQL learned in MySQL is 95%+ identical to PostgreSQL, Snowflake, and BigQuery.

---

## ⚠️ Gotchas & Tricky Details Encountered
- **DB2 vs MySQL**: Selected IBM DB2 on HackerRank initially, which failed due to trailing whitespace padding in test output. Standardized on MySQL 8.0+.
- **Entity Context**: Mistook `NAME` for a person's name in `CITY` table. Resolved by inspecting the table grain.

---

## ⏱️ Completion Stats
- **Total Problems Attempted**: 5
- **Success Rate**: 100% on first-attempt runs after concept checks
- **Points Earned**: 50.00 pts
- **Next Session Target**: Problems 07 & 08 (Station 1 & Station 3) to achieve 100% Day 01 Sign-off!
