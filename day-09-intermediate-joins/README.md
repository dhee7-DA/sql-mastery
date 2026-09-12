# 🚀 Day 09: Intermediate Relational Joins, Non-Equi Ranges & Multi-Table Chains

Welcome to **Day 09** of the **14-Day SQL Intensive**. Today marks our entry into **Intermediate SQL**, transitioning from basic primary-key equality joins into real-world relational data modeling: range lookups, multi-hop foreign key traversal, and correlated filtering.

---

## 🎯 Sprint Objectives
1. **Master Non-Equi Joins**: Understand why and how to join tables without exact equality (`=`), using range predicates (`BETWEEN ... AND ...`) to map continuous metrics to discrete policy brackets.
2. **Conquer Multi-Table Chains (4+ Tables)**: Navigate multi-entity relational paths (`Submissions` ➡️ `Challenges` ➡️ `Difficulty` ➡️ `Hackers`) while strictly preserving row grain and preventing Cartesian explosions.
3. **Master Correlated Subquery Joins**: Filter records dynamically against peer-group minimums and maximums across composite dimensions.
4. **Solve 3 Classical HackerRank Medium Challenges**:
   - [x] **The Report** (*Non-Equi Join with Range Lookup + CASE Name Suppression*)
   - [x] **Top Competitors** (*4-Table Relational Chain + Full Score Aggregation*)
   - [x] **Ollivander's Inventory** (*Correlated Subquery Join for Minimum Cost Lookup*)

---

## 🗺️ Problem Matrix

| # | Problem | Difficulty | Key SQL Concepts Tested | HackerRank Subdomain | Status |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | **The Report** | Medium | `JOIN ON ... BETWEEN`, `CASE WHEN`, Secondary Tie-breaking | Basic Join | ✅ Solved |
| 2 | **Top Competitors** | Medium | 4-Table `INNER JOIN`, `GROUP BY`, `HAVING COUNT(*) > 1` | Basic Join | ✅ Solved |
| 3 | **Ollivander's Inventory** | Medium | Correlated Subquery, `MIN()` aggregation, Multi-sort | Basic Join | ✅ Solved |

---

## 📂 File Architecture
- [`THEORY.md`](./THEORY.md): Visual theory on Non-Equi Joins, Join Chains, Grain Preservation, and Correlated Subquery execution loops.
- [`queries.sql`](./queries.sql): Clean, verified, executable queries with syntax notes for MySQL 8.0+.
- [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md): Line-by-line deconstruction, edge-case analysis, and performance tips.
- [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md): Real corporate interview scenarios from Stripe, Uber, and Amazon testing range joins and join chains.
- [`DAILY_LOG.md`](./DAILY_LOG.md): Deliberate practice log, blockers overcome, and mental models forged.
