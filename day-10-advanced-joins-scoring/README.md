# 🚀 Day 10: Advanced Relational Joins, Symmetric Pairs & Scoring Engines

Welcome to **Day 10** of the **14-Day SQL Intensive**. Today we conquer three of the most renowned and conceptually demanding HackerRank Medium challenges in the Relational Joins curriculum: multi-instance entity aliasing, hierarchical peer comparisons, and self-joins on coordinate grids.

---

## 🎯 Sprint Objectives
1. **Master Multi-Instance Entity Aliasing (Same-Table Double Joins)**: Learn to join the exact same lookup table multiple times with distinct semantic roles (e.g., student's package vs. best friend's package).
2. **Conquer Pre-Aggregated Subquery Joins**: Compute maximum challenge scores per hacker prior to parent-level summation to prevent score duplication across multiple submissions.
3. **Master Coordinate Matrix Self-Joins (Symmetric Pairs)**: Solve mirror coordinate detection `(X1 = Y2 AND Y1 = X2)` with clean bifurcation between identical coordinates (`X = Y` requiring multi-row existence) and distinct coordinates (`X < Y`).
4. **Solve 3 Legendary HackerRank Medium Challenges**:
   - [x] **Contest Leaderboard** (*Subquery Pre-Aggregation, Maximum Challenge Scoring, Zero-Score Filtering*)
   - [x] **Placements** (*Double Lookup Join on Packages, Peer Salary Comparison, Salary ASC Ordering*)
   - [x] **Symmetric Pairs** (*Self-Joins, Mirror Coordinate Mapping, UNION Logic, Multiplicity Checks*)

---

## 🗺️ Problem Matrix

| # | Problem | Difficulty | Key SQL Concepts Tested | HackerRank Subdomain | Status |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | **Contest Leaderboard** | Medium | Derived Table Pre-aggregation, `SUM(MAX(score))`, `HAVING > 0` | Basic Join | ✅ Solved |
| 2 | **Placements** | Medium | Double Table Join (`Packages` aliased twice), Cross-Entity Comparison | Basic Join | ✅ Solved |
| 3 | **Symmetric Pairs** | Medium | Self-Join, Mirror Conditions (`X1=Y2`, `Y1=X2`), `UNION`, Group Filter | Advanced Join | ✅ Solved |

---

## 📂 File Architecture
- [`THEORY.md`](./THEORY.md): Relational algebra, multiple same-table joins, subquery grain management, and coordinate symmetry topology.
- [`queries.sql`](./queries.sql): Production-grade MySQL 8.0+ / ANSI SQL solutions with alternative modern CTE approaches.
- [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md): Deep line-by-line architectural breakdown, common pitfalls, and edge-case guards.
- [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md): High-frequency interview challenges from LinkedIn, Meta, and Goldman Sachs.
- [`DAILY_LOG.md`](./DAILY_LOG.md): Sprint metrics, timing logs, and strategic takeaways.
