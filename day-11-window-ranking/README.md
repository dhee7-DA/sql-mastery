# 🚀 Day 11: Window Functions — Ranking & Partitioning

Welcome to **Day 11** of the **14-Day SQL Intensive**. Today we enter the elite tier of analytical SQL: **Window Functions (Analytic Functions)**. Specifically, we conquer the four fundamental ranking functions—`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, and `NTILE()`—coupled with the powerful `OVER (PARTITION BY ... ORDER BY ...)` clause.

---

## 🎯 Sprint Objectives
1. **Internalize the Window Function Lifecycle**: Understand why window functions evaluate *after* `WHERE`, `GROUP BY`, and `HAVING`, but *before* final `ORDER BY` and `LIMIT`.
2. **Master the Big 4 Ranking Triad & Quartiles**:
   - `ROW_NUMBER()`: Deterministic, strictly continuous unique sequence ($1, 2, 3, 4, 5$).
   - `RANK()`: Competition ranking with tie gaps ($1, 2, 2, 4, 5$).
   - `DENSE_RANK()`: Compact ranking without gaps ($1, 2, 2, 3, 4$).
   - `NTILE(n)`: Equi-height bucket distribution into $n$ quantiles / percentiles.
3. **Solve the Top-N Per Category Problem**: Master the subquery / CTE wrapper pattern required because window functions cannot appear directly in `WHERE` or `HAVING`.
4. **Master Enterprise Deduplication Patterns**: Write the canonical `QUALIFY` / CTE deduplication pattern to isolate the most recent, highest-value, or primary record per entity.
5. **Conquer 4 High-Yield Analytical Benchmark Challenges**:
   - [x] **Department Top 3 Salaries** (LeetCode 185 Hard / HackerRank Advanced: Multi-tier dense rank filtering).
   - [x] **Customer Order Deduplication & Latest State Isolation** (Canonical Data Engineering pipeline rep).
   - [x] **Revenue Quantile Bucketing & Decile Segmentation** (SaaS & Fintech RFM / Customer tiering via `NTILE(4)` and `NTILE(10)`).
   - [x] **Consecutive Login Streaks (Gaps-and-Islands Kickoff)** (Date math combined with `ROW_NUMBER()` offset grouping).

---

## 🗺️ Problem Matrix

| # | Problem Name | Difficulty | Key Window Concepts Tested | Industry Archetype | Status |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | **Department Top 3 Earners** | Hard | `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)`, Dense ties handling | Corporate HR / Compensation | ✅ Solved |
| 2 | **Latest State Deduplication** | Medium | `ROW_NUMBER() OVER (PARTITION BY entity_id ORDER BY updated_at DESC, event_id DESC) = 1` | Data Engineering / Telemetry | ✅ Solved |
| 3 | **Customer Revenue Deciles (NTILE)** | Medium | `NTILE(10) OVER (ORDER BY annual_spend DESC)`, Segment assignment | SaaS / E-Commerce Growth | ✅ Solved |
| 4 | **Active Streak Island Identifier** | Hard | `login_date - INTERVAL (ROW_NUMBER() OVER (...)) DAY`, Streak island clustering | Gaming / Product Analytics | ✅ Solved |

---

## 📊 The Four Ranking Functions at a Glance

Given a partition with duplicate values: `[100, 90, 90, 80, 70]`

| Row Value | `ROW_NUMBER()` | `RANK()` | `DENSE_RANK()` | `NTILE(2)` | Behavior Explanation |
|:---:|:---:|:---:|:---:|:---:|:---|
| **100** | `1` | `1` | `1` | `1` | Highest value gets 1 across all functions |
| **90** | `2` | `2` | `2` | `1` | First tied value |
| **90** | `3` | `2` | `2` | `1` | Tied value: `RANK` and `DENSE_RANK` preserve `2`; `ROW_NUMBER` increments |
| **80** | `4` | `4` | `3` | `2` | Next value: `RANK` skips to `4`; `DENSE_RANK` moves to `3` |
| **70** | `5` | `5` | `4` | `2` | Lowest value: continuous progression |

---

## 📂 File Architecture
- [`THEORY.md`](./THEORY.md): Physical engine mechanics, execution lifecycle, partitioning vs. grouping, window frame defaults, and memory complexity.
- [`queries.sql`](./queries.sql): Clean, verified ANSI / MySQL 8.0+ solutions using modern CTEs and production-grade formatting.
- [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md): Deep architectural deconstructions, edge cases (ties, NULLs, performance traps), and execution plans.
- [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md): High-frequency interview scenarios from FAANG/Tier-1 firms (Meta, Stripe, Uber, Netflix).
- [`DAILY_LOG.md`](./DAILY_LOG.md): Sprint metrics, pitfalls debugged, and engine execution notes.
- [`ASSESSMENT.md`](./ASSESSMENT.md): Objective self-evaluation scorecard and gap analysis.
