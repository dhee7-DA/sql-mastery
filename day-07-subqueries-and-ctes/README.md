# 🚀 Day 07: Subqueries, Correlated Subqueries & Recursive CTEs

Welcome to **Day 07** of the **14-Day SQL Intensive**. Today we master one of the most intellectually critical concepts in database engineering: **Subqueries, Correlated Logic, and Common Table Expressions (CTEs)**, culminating in **Recursive Graph & Hierarchy Traversal**.

---

## 🎯 Sprint Objectives
1. **Internalize Subquery Classification & Execution Mechanics**:
   - **Scalar Subqueries**: Returns exactly $1 \times 1$ cell. Usable in `SELECT`, `WHERE`, `HAVING`.
   - **Multi-Row Subqueries**: Returns a $N \times 1$ column list. Evaluated using `IN`, `ANY`/`SOME`, `ALL`.
   - **Derived Tables (Inline Views)**: Returns a $M \times N$ virtual relation in the `FROM` clause; requires mandatory table aliasing.
2. **Master Correlated Subqueries & the `EXISTS` Predicate**:
   - Understand row-by-row outer-query binding ($O(N \times M)$ naive execution vs. Semi-Join / Anti-Join optimizer rewrites).
   - Master `EXISTS` short-circuit boolean evaluation: ceases scanning the instant a single matching tuple is encountered.
3. **Expose the 3-Valued Logic (3VL) `NOT IN` NULL Disaster Trap**:
   - Prove mathematically why `NOT IN (SELECT col FROM t)` returns ZERO rows if even a single `col` value is `NULL`.
   - Implement the bulletproof production antidote: `NOT EXISTS` or `LEFT JOIN ... WHERE right_id IS NULL`.
4. **Architect Multi-Tier Pipeline CTEs (`WITH` clauses)**:
   - Deconstruct complex analytical logic into literate, self-documenting, modular dataflow graphs.
5. **Conquer Recursive CTEs (`WITH RECURSIVE`)**:
   - Master the two-part engine mechanics: **Anchor Member** $\cup$ **Recursive Member** until empty-set termination.
   - Trace organizational management hierarchies, calculate node depth levels, and assemble ancestry path breadcrumbs.

---

## 🗺️ Problem Matrix

| # | Problem Name | Difficulty | Key Concepts Tested | Industry Archetype | Status |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | **Above Department Average Earners** | Medium | Correlated subquery in `WHERE`, outer column reference binding | HR Analytics / Comp Science | ✅ Solved |
| 2 | **Active Buyers with Zero Category Churn** | Medium | `EXISTS` vs `NOT EXISTS`, Anti-semi join, 3VL `NOT IN (NULL)` trap | E-Commerce / Retention | ✅ Solved |
| 3 | **Top-N Earners Without Window Functions** | Hard | Non-window Top-N via correlated count comparison (`COUNT(*) < N`) | Senior Data Engineering | ✅ Solved |
| 4 | **Multi-Tier Regional Revenue Variance** | Medium | Chained modular CTEs, multi-step metric pipelines | Corporate Finance / BI | ✅ Solved |
| 5 | **Org Chart Hierarchy Depth & Ancestry Path** | Hard | `WITH RECURSIVE`, Anchor/Recursive union, depth counter, path string | Enterprise SaaS / IAM Org | ✅ Solved |

---

## 📊 Subquery Family Comparison Matrix

| Subquery Archetype | Returned Shape | Clause Placement | Correlation | Evaluation Mechanism |
|:---|:---:|:---:|:---:|:---|
| **Scalar** | $1 \text{ row} \times 1 \text{ col}$ | `SELECT`, `WHERE`, `HAVING` | Uncorrelated or Correlated | Constant substitution or row-bound lookup |
| **Multi-Row** | $N \text{ rows} \times 1 \text{ col}$ | `WHERE` (`IN`, `ALL`, `ANY`) | Typically Uncorrelated | Hash table lookup or Semi-Join |
| **Derived Table** | $M \text{ rows} \times N \text{ cols}$ | `FROM`, `JOIN` | Uncorrelated (Lateral in Postgres) | Virtual table materialized in temp space |
| **Correlated `EXISTS`** | Boolean (`TRUE`/`FALSE`) | `WHERE`, `HAVING` | Strictly Correlated | Short-circuit boolean check / Hash Semi-Join |
| **Common Table Expr** | $M \text{ rows} \times N \text{ cols}$ | Prefix `WITH` | Modular pipeline | Inline subquery expansion / Temporary materialization |
| **Recursive CTE** | Arbitrary Tree / Graph | `WITH RECURSIVE` | Self-referencing iteration | Queue-driven iterative BFS evaluation |

---

## 📂 File Architecture
- [`THEORY.md`](./THEORY.md): Physical engine mechanics, semi-join optimizations, the 3VL NULL trap, and recursive stack physics.
- [`queries.sql`](./queries.sql): Clean, executable ANSI / MySQL 8.0+ / PostgreSQL SQL solutions with comprehensive docstrings.
- [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md): Deep architectural deconstructions, algorithmic complexity analysis, and optimizer execution plans.
- [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md): High-frequency interview scenarios from Meta, Google, Stripe, and Netflix.
- [`DAILY_LOG.md`](./DAILY_LOG.md): Sprint metrics, debugging traps, and execution plan benchmarks.
- [`ASSESSMENT.md`](./ASSESSMENT.md): Objective self-evaluation scorecard and technical mastery rubric.
