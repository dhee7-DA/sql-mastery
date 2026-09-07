# 🔗 Day 08: Relational Joins & Foreign Key Foundations

Welcome to **Day 08** of the SQL Mastery Intensive! This module initiates the **Relational Joins** track on HackerRank and enterprise data warehousing. Here we transition from single-table querying into multi-table relational modeling, foreign key navigations, and outer join mechanics.

---

## 🎯 Learning Objectives

1. **Relational Algebra Foundations**: Understand Cartesian products ($M \times N$), join conditions (`ON`), and the physical lifecycle of multi-table joins.
2. **`INNER JOIN` Mastery**: Retrieve exact intersecting subsets across parent and child tables (`CITY` and `COUNTRY`).
3. **`LEFT OUTER JOIN` Mechanics**: Preserve primary entities while gracefully padding missing attributes with `NULL`.
4. **The `ON` vs `WHERE` Trap**: Master the single most tested senior SQL interview question—why filtering in `WHERE` silently destroys a `LEFT JOIN`.
5. **Anti-Joins & Orphan Detection**: Identify churned customers or unmapped entities using `LEFT JOIN ... WHERE right.pk IS NULL`.
6. **Aggregations Across Joins**: Combine `GROUP BY`, `AVG()`, and `FLOOR()` across normalized tables without cardinality duplication traps.

---

## 📋 Problem Set & Roadmap

| # | Challenge Name | HackerRank Points | Focus Concept | Status |
|:---:|---|:---:|---|:---:|
| **01** | [Asian Population](https://www.hackerrank.com/challenges/asian-population/problem) | 10 pts | `INNER JOIN`, Foreign Key Match, `SUM()` | 🟢 Solved |
| **02** | [African Cities](https://www.hackerrank.com/challenges/african-cities/problem) | 10 pts | `INNER JOIN`, Text Disambiguation, `WHERE` | 🟢 Solved |
| **03** | [Average Population of Each Continent](https://www.hackerrank.com/challenges/average-population-of-each-continent/problem) | 10 pts | `INNER JOIN`, `GROUP BY`, `FLOOR(AVG())` | 🟢 Solved |
| **04** | Enterprise Anti-Join (Amazon Customers Without Orders) | Production | `LEFT JOIN ... WHERE IS NULL` | 🟢 Solved |
| **05** | The `ON` vs `WHERE` Trap (Delivered Orders Audit) | Production | Outer preservation vs accidental inner join | 🟢 Solved |

**Total Points Available in HackerRank Sprint**: **30.00 Points**

---

## 🏛️ Schema Architecture: World Database (`CITY` & `COUNTRY`)

```
┌──────────────────────────────────────┐           ┌──────────────────────────────────────┐
│                 CITY                 │           │               COUNTRY                │
├──────────────────────────────────────┤           ├──────────────────────────────────────┤
│ ID           INT (PK)                │           │ Code          VARCHAR(3) (PK)        │
│ Name         VARCHAR(17)             │           │ Name          VARCHAR(44)            │
│ CountryCode  VARCHAR(3) (FK)         │◄──────────┤ Continent     VARCHAR(13)            │
│ District     VARCHAR(20)             │           │ Region        VARCHAR(25)            │
│ Population   INT                     │           │ Population    INT                    │
└──────────────────────────────────────┘           └──────────────────────────────────────┘
```

---

## 📂 Module Files
* [`THEORY.md`](./THEORY.md) — Deep dive into relational algebra, Cartesian products, `ON` vs `WHERE` mechanics, and join types.
* [`queries.sql`](./queries.sql) — Clean, executable SQL solutions with full schema setup and seed data.
* [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md) — Step-by-step query execution lifecycle and trace tables.
* [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md) — FAANG/Tier-1 interview questions on joins, null-handling, and cardinality explosions.
* [`DAILY_LOG.md`](./DAILY_LOG.md) — Session score tracker and progress ledger.
