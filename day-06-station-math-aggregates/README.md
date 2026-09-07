# 📍 Day 06: Station Math, Coordinate Distances & Calculating Medians

Welcome to **Day 06** of the SQL Mastery Intensive! This module wraps up the **Aggregation** track on HackerRank by tackling geospatial coordinate analytics, algebraic aggregates (`SQRT`, `POW`, `ABS`), and the legendary interview question: **Calculating the Median in SQL**.

---

## 🎯 Learning Objectives

1. **Precision Rounding & Bounded Sums**: Master `ROUND(val, 4)` and multi-conditional range filtering (`BETWEEN`, `>`, `<`).
2. **Sub-Ceiling & Super-Floor Extrema**: Retrieve complementary attributes corresponding to extrema (e.g. `LONG_W` for `MAX(LAT_N)`) using both `ORDER BY ... LIMIT 1` and correlated subqueries.
3. **Taxicab (Manhattan) Distance**: Translate $L_1$ norm $\|a - c\| + \|b - d\|$ into pure relational arithmetic using `ABS()`, `MIN()`, and `MAX()`.
4. **Euclidean Distance**: Compute $L_2$ norm $\sqrt{(c - a)^2 + (d - b)^2}$ using `SQRT()`, `POW()`, and `ROUND()`.
5. **The Median Problem (FAANG Classic)**: Master the algorithm for finding the exact 50th percentile in MySQL without a built-in `MEDIAN()` function.

---

## 📋 Problem Set & Roadmap

| # | Challenge Name | HackerRank Points | Focus Concept | Status |
|:---:|---|:---:|---|:---:|
| **01** | [Weather Observation Station 2](https://www.hackerrank.com/challenges/weather-observation-station-2/problem) | 15 pts | Multi-column Sum & Rounding | 🟢 Solved |
| **02** | [Weather Observation Station 13](https://www.hackerrank.com/challenges/weather-observation-station-13/problem) | 10 pts | Bounded Range Filtering (`BETWEEN` vs `<`/`>`) | 🟢 Solved |
| **03** | [Weather Observation Station 14](https://www.hackerrank.com/challenges/weather-observation-station-14/problem) | 10 pts | Sub-ceiling `MAX()` | 🟢 Solved |
| **04** | [Weather Observation Station 15](https://www.hackerrank.com/challenges/weather-observation-station-15/problem) | 15 pts | Coordinate Cross-Lookup (`ORDER BY ... LIMIT 1`) | 🟢 Solved |
| **05** | [Weather Observation Station 16](https://www.hackerrank.com/challenges/weather-observation-station-16/problem) | 10 pts | Super-floor `MIN()` | 🟢 Solved |
| **06** | [Weather Observation Station 17](https://www.hackerrank.com/challenges/weather-observation-station-17/problem) | 15 pts | Coordinate Cross-Lookup (`MIN` target pair) | 🟢 Solved |
| **07** | [Weather Observation Station 18](https://www.hackerrank.com/challenges/weather-observation-station-18/problem) | 25 pts | Manhattan Distance ($L_1$ Norm) | 🟢 Solved |
| **08** | [Weather Observation Station 19](https://www.hackerrank.com/challenges/weather-observation-station-19/problem) | 30 pts | Euclidean Distance ($L_2$ Norm) | 🟢 Solved |
| **09** | [Weather Observation Station 20](https://www.hackerrank.com/challenges/weather-observation-station-20/problem) | 40 pts | **The 50th Percentile (Median of LAT_N)** | 🟢 Solved |

**Total Points Available in this Sprint**: **175.00 Points**

---

## 🏛️ Schema Architecture: `STATION`

```sql
CREATE TABLE STATION (
  ID NUMBER PRIMARY KEY,
  CITY VARCHAR2(21),
  STATE VARCHAR2(2),
  LAT_N NUMBER,   -- Northern Latitude (Range: -90 to +90)
  LONG_W NUMBER   -- Western Longitude (Range: -180 to +180)
);
```

---

## 📂 Module Files
* [`THEORY.md`](./THEORY.md) — Comprehensive mathematical formulas, distance metrics, and the 3 ways to calculate Medians in MySQL.
* [`queries.sql`](./queries.sql) — Clean, executable SQL solutions for all 9 problems with step-by-step commentary.
* [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md) — Deep-dive logic analysis, query execution plans, and edge-case traps.
* [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md) — Real FAANG/Fintech interview questions on Medians, percentiles, and geospatial queries.
* [`DAILY_LOG.md`](./DAILY_LOG.md) — Session score tracker and progress ledger.
