# 🧭 Repository Session State & Continuity Ledger

> **Purpose**: This file tracks the exact real-time state of the 14-Day SQL Intensive. If you switch IDEs, switch AI assistants, or resume after a break, read this file first to pick up right where you left off.

---

## 📌 Current Snapshot

- **Current Sprint**: Day 01 of 14
- **Active Module**: `day-01-basic-select` (Basic SELECT, Row Filtering, DISTINCT, Modulo)
- **Current Dialect**: **MySQL 8.0+**
- **Last Completed Task**: Solved Problem 06 on HackerRank (*Japanese Cities' Names*)
- **Next Immediate Action**: Solve Problem 07 (*Weather Observation Station 1*)
- **Total Problems Completed Today**: 5 / 8 (63% Progress!)
- **Last Updated**: 2026-08-31 01:47 IST

---

## 📊 14-Day Roadmap Execution Status

| Day | Module Directory | Focus | Problems | Status |
|---|---|---|---|---|
| **01** | [`day-01-basic-select`](./day-01-basic-select) | `SELECT`, `FROM`, `WHERE`, `AND`/`OR`, `DISTINCT`, Modulo | 5/8 | 🟡 Active (63%) |
| **02** | `day-02-ordering-wildcards` | `ORDER BY`, `LIMIT`/`TOP`, `LIKE`, `NOT LIKE`, Wildcards | 0/8 | ⚪ Pending |
| **03** | `day-03-string-functions` | `LENGTH`, `SUBSTR`, `LEFT`/`RIGHT`, Regex intro | 0/8 | ⚪ Pending |
| **04** | `day-04-aggregations` | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `ROUND` | 0/8 | ⚪ Pending |
| **05** | `day-05-group-by-having` | `GROUP BY`, `HAVING` vs `WHERE`, Multi-column aggregations | 0/8 | ⚪ Pending |
| **06** | `day-06-conditional-logic` | `CASE WHEN`, Conditional aggregations, pivots | 0/8 | ⚪ Pending |
| **07** | `day-07-joins-basics` | `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, Join predicates | 0/8 | ⚪ Pending |
| **08** | `day-08-advanced-joins` | `FULL OUTER JOIN`, `CROSS JOIN`, Self-joins, multi-table | 0/8 | ⚪ Pending |
| **09** | `day-09-subqueries-ctes` | Scalar subqueries, correlated subqueries, `WITH` CTEs | 0/8 | ⚪ Pending |
| **10** | `day-10-window-ranking` | `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `NTILE()` | 0/8 | ⚪ Pending |
| **11** | `day-11-window-aggregates` | `LAG()`, `LEAD()`, `SUM() OVER(PARTITION BY ...)` | 0/8 | ⚪ Pending |
| **12** | `day-12-set-ops-dates` | `UNION`, `UNION ALL`, `INTERSECT`, Date arithmetic | 0/8 | ⚪ Pending |
| **13** | `day-13-business-scenarios` | Churn analysis, retention cohorts, revenue rollups | 0/6 | ⚪ Pending |
| **14** | `day-14-capstone-project` | Comprehensive end-to-end analytics case study | 0/1 | ⚪ Pending |

---

## 📜 Chronological Session Activity Log

### 1. 2026-08-30 (Day 01 Kickoff - Evening)
- **22:16 IST**: Initialized repository scaffolding (`README.md`, `PATTERNS.md`, `SESSION_STATE.md`).
- **22:20 IST**: Created Day 01 5-file architecture (`THEORY.md`, `SOLUTIONS_BREAKDOWN.md`, `queries.sql`, `DAILY_LOG.md`, `ASSESSMENT.md`).
- **22:30 IST**: Delivered foundational concept briefing on `SELECT`, `WHERE`, `AND`, strings vs numbers, and execution order.
- **22:37 IST**: Debugged and resolved DB2 vs MySQL platform differences on HackerRank.
- **22:42 IST**: Clarified MySQL vs PostgreSQL portability (ANSI SQL 95% standard).
- **22:45 IST**: Student solved and submitted **Problem 01** (*Revising the Select Query I*).
- **22:55 IST**: First Git commit and push executed to GitHub.

### 2. 2026-08-31 (Day 01 Sprint Continued - Late Night)
- **00:48 IST**: Resumed session. Briefed Problem 02 (column projection vs full row scan).
- **00:54 IST**: Student solved and submitted **Problem 02** (*Revising the Select Query II*) with 100% test pass.
- **00:55 IST**: Saved solution in `queries.sql`, updated session ledger, and updated instructor assessment.
- **01:36 IST**: Student solved and submitted **Problem 04** (*Select By ID*) with 100% test pass. Score: 30/80.
- **01:39 IST**: Student solved and submitted **Problem 05** (*Japanese Cities' Attributes*) with 100% test pass. Score: 40/80.
- **01:46 IST**: Student identified and resolved entity grain misconception (`DISTRICT` vs `NAME` in `CITY` table).
- **01:47 IST**: Student solved and submitted **Problem 06** (*Japanese Cities' Names*) with 100% test pass. Score: 50/80 (63% to 1st star badge).
