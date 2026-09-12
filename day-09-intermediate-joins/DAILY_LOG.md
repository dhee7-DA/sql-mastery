# 📅 Daily Log: Day 09 — Intermediate Relational Joins & Subqueries

---

## 🎯 Daily Objective
Tackle the HackerRank Medium-tier relational challenges, mastering non-equi range joins (`BETWEEN`), multi-table relational chains (4-table joins with full score filtering), correlated subqueries for minimum attribute extraction, and window function alternatives (`DENSE_RANK()`).

---

## ⏱️ Execution Timeline

| Time (IST) | Milestone | Details |
|---|---|---|
| **00:35** | **Module Scaffolding** | Initialized `day-09-intermediate-joins/` directory following the standardized 6-file suite protocol. |
| **00:36** | **Theory Architecture** | Engineered deep architectural analysis in `THEORY.md` covering Non-Equi Joins, Range Partitioning, Cartesian fan-out prevention, and Correlated Subqueries vs. Window Functions. |
| **00:37** | **The Report (Medium)** | Implemented non-equi join on `Students.Marks BETWEEN Grades.Min_Mark AND Grades.Max_Mark` with conditional `NULL` name masking for Grade < 8 and secondary tie-breaker ordering. |
| **00:38** | **Top Competitors (Medium)** | Solved 4-table join chain (`Submissions` ➡️ `Challenges` ➡️ `Difficulty` ➡️ `Hackers`), filtered for full scores (`s.score = d.score`), and grouped by primary key with `HAVING COUNT(*) > 1`. |
| **00:39** | **Ollivander's Inventory (Medium)** | Conquered correlated subquery filtering on non-evil wands (`is_evil = 0`) matching exact `(power, age)` minimum gold galleons, plus engineered the modern `DENSE_RANK()` CTE alternative. |
| **00:45** | **FAANG Interview Suite** | Formulated Tier-1 interview questions for Stripe (dynamic fee tiers), Amazon (4-table grain drift), Netflix (Ollivander's pattern), and Uber (interval self-joins). |

---

## 📊 Score & Progress Tracker
- **HackerRank Challenges Conquered Today**: 3 / 3 (The Report, Top Competitors, Ollivander's Inventory)
- **Points Earned Today**: **+105.00 Points** (3 × 35.00 pts Medium Challenges)
- **Total Completed in Intensive**: **46 / 58 Problems**
- **Track Status**: 🟢 Intermediate Relational Joins 100% Conquered ➡️ Ready for Day 10 (*Advanced Joins & Hierarchical Queries: Contest Leaderboard, Placements, Symmetric Pairs*).
