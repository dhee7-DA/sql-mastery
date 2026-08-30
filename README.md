# 🚀 14-Day SQL Mastery for Data Analysis

Welcome to the **14-Day SQL Intensive**. This repository is an institutional-grade structured log of daily deliberate practice, solving real-world query problems, mastering edge cases, and building analytical muscle memory from absolute fundamentals to advanced analytical SQL (Window Functions, CTEs, Data Modeling).

---

## 🎯 The Philosophy: Problem-First Deliberate Practice
- **Zero Tutorial Hell**: Concepts are learned in tight theory bursts and immediately reinforced with active problem-solving reps.
- **Mental Model First**: Understanding query execution order and set-based thinking over syntax memorization.
- **Strict Rep Logging**: Every single query is written by hand, tested on live datasets (HackerRank, LeetCode, StrataScratch), and reviewed for correctness and performance.
- **Continuous Documentation**: Every day contains rich theory with diagrams, problem deconstructions, interview strategies, Q&A logs, and instructor progress assessments.

---

## 🗺️ 14-Day Syllabus & Progress Tracker

| Day | Module Directory | Key Concepts | Status |
|---|---|---|---|
| **Day 01** | [day-01-basic-select](./day-01-basic-select) | `SELECT`, `FROM`, `WHERE`, `AND`/`OR`, `DISTINCT`, Modulo | 🟡 In Progress (5/8 - 63%) |
| **Day 02** | `day-02-ordering-wildcards` | `ORDER BY`, `LIMIT` / `TOP`, `LIKE`, `NOT LIKE`, Wildcards | ⚪ Pending |
| **Day 03** | `day-03-string-functions` | `LENGTH`, `SUBSTR`, `LEFT`/`RIGHT`, Regex basics | ⚪ Pending |
| **Day 04** | `day-04-aggregations` | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `ROUND`, `TRUNCATE` | ⚪ Pending |
| **Day 05** | `day-05-group-by-having` | `GROUP BY`, `HAVING` vs `WHERE`, Multi-column grouping | ⚪ Pending |
| **Day 06** | `day-06-conditional-logic` | `CASE WHEN ... THEN ... ELSE ... END`, Pivot queries | ⚪ Pending |
| **Day 07** | `day-07-joins-basics` | `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, Join condition logic | ⚪ Pending |
| **Day 08** | `day-08-advanced-joins` | `FULL OUTER JOIN`, `CROSS JOIN`, Multi-table joins, self-joins | ⚪ Pending |
| **Day 09** | `day-09-subqueries-ctes` | Scalar subqueries, correlated subqueries, `WITH` CTEs | ⚪ Pending |
| **Day 10** | `day-10-window-ranking` | `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `NTILE()` | ⚪ Pending |
| **Day 11** | `day-11-window-aggregates` | `LAG()`, `LEAD()`, `SUM() OVER(PARTITION BY ... ORDER BY ...)` | ⚪ Pending |
| **Day 12** | `day-12-set-ops-dates` | `UNION` / `UNION ALL`, `INTERSECT`, `DATEDIFF`, `DATE_ADD` | ⚪ Pending |
| **Day 13** | `day-13-business-scenarios` | Churn analysis, retention cohorts, revenue rollups | ⚪ Pending |
| **Day 14** | `day-14-capstone-project` | Comprehensive end-to-end analytics case study | ⚪ Pending |

---

## 📁 Repository Architecture

This repo is structured so that you can open it in **any IDE** (VS Code, Cursor, Antigravity) or share it with any mentor/AI assistant and instantly resume with full context:

```text
sql-mastery/
├── README.md                     # Master syllabus, progress tracker & architecture
├── PATTERNS.md                   # Reusable SQL patterns, mental models & gotchas
├── SESSION_STATE.md              # Real-time state ledger (last task, next step, history)
│
├── day-01-basic-select/
│   ├── README.md                 # Day 01 overview, schemas, problem links
│   ├── THEORY.md                 # Deep theory, Mermaid execution flowcharts, mental models
│   ├── SOLUTIONS_BREAKDOWN.md    # Problem analysis, logic explanation, solutions & interview tips
│   ├── queries.sql               # Clean, executable SQL solutions
│   ├── DAILY_LOG.md              # Daily Q&A, blockers resolved, dialect comparisons
│   └── ASSESSMENT.md             # Instructor scorecard, strengths, and areas to improve
└── ...
```

---

## 🔄 Daily 5-File Protocol

For every single day of this intensive, 5 standardized files are maintained:
1. **`THEORY.md`**: Visual diagrams, execution lifecycle, syntax rules, and mental models.
2. **`SOLUTIONS_BREAKDOWN.md`**: For each problem: *What are they testing?* + *Clean SQL* + *Detailed breakdown* + *Interview tips*.
3. **`queries.sql`**: The clean executable query bank.
4. **`DAILY_LOG.md`**: Real-time Q&A log, blockers debugged, and engine differences.
5. **`ASSESSMENT.md`**: Objective scorecards assessing mastery and highlighting gaps.
