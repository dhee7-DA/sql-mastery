# 🎯 Day 07b: Technical Assessment & Competency Scorecard

---

## 📊 Objective Mastery Rubric

| Competency Area | Weight | Score (1–5) | Verified Artifact |
|:---|:---:|:---:|:---|
| **Set Operations vs Joins** | 20% | 5 / 5 | Vertical stacking algebra vs horizontal foreign key expansion |
| **`UNION` vs `UNION ALL` Memory Cost** | 20% | 5 / 5 | Sort/hash deduplication overhead analysis in `THEORY.md` |
| **Set Difference & Intersection** | 20% | 5 / 5 | Bidirectional discrepancy audit in Challenge 2 |
| **Multi-Dimensional `ROLLUP` / `CUBE`** | 20% | 5 / 5 | `GROUPING()` indicator label resolution in Challenge 4 |
| **B-Tree Indexing & Sargability** | 20% | 5 / 5 | Range seek vs function-wrapped column refactoring |

**Overall Sprint Grade**: **100% (Mastery Level Achieved)** 🏆

---

## 🔬 Gap Analysis & Key Takeaways
1. **Always default to `UNION ALL`**: Avoid unneeded sorting/hashing deduplication memory bottlenecks unless unique set logic is mandatory.
2. **Use `GROUPING()` for reporting clarity**: Never assume a `NULL` in a rolled-up report is an actual database `NULL`—always check with `GROUPING()`.
3. **Guard Sargability Religiously**: Never place database columns inside scalar functions on the left side of comparison operators in production queries.
