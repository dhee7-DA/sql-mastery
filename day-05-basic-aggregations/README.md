# 🚀 Day 05: Basic Aggregations (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)

Welcome to **Phase 3: Basic Aggregations**! Today we transition from row-by-row scalar operations to **set-based statistical aggregations**—the bedrock of data science, financial reporting, metrics dashboards, and executive intelligence.

---

## 🎯 Today's Power Targets (HackerRank Subdomain: Basic Aggregation)

| # | Problem Name | Table | Concepts / Functions | Points |
|---|---|---|---|---|
| **01** | [Revising Aggregations - The Count Function](https://www.hackerrank.com/challenges/revising-aggregations-the-count-function/problem) | `CITY` | `COUNT(*)`, `WHERE` Filter | +10.00 |
| **02** | [Revising Aggregations - The Sum Function](https://www.hackerrank.com/challenges/revising-aggregations-the-sum-function/problem) | `CITY` | `SUM()`, Filter by District | +10.00 |
| **03** | [Revising Aggregations - Averages](https://www.hackerrank.com/challenges/revising-aggregations-the-average-function/problem) | `CITY` | `AVG()`, Continuous Aggregates | +10.00 |
| **04** | [Average Population](https://www.hackerrank.com/challenges/average-population/problem) | `CITY` | `AVG()`, `FLOOR()` Rounding Down | +10.00 |
| **05** | [Japan Population](https://www.hackerrank.com/challenges/japan-population/problem) | `CITY` | `SUM()`, Country Filter | +10.00 |
| **06** | [Population Density Difference](https://www.hackerrank.com/challenges/population-density-difference/problem) | `CITY` | `MAX() - MIN()` Range Metric | +10.00 |
| **07** | [The Blunder](https://www.hackerrank.com/challenges/the-blunder/problem) | `EMPLOYEES` | `AVG()`, `REPLACE()`, `CEIL()` Error Math | +15.00 |
| **08** | [Top Earners](https://www.hackerrank.com/challenges/earnings-of-employees/problem) | `Employee` | Compound Aggregation, `GROUP BY`, `ORDER BY LIMIT` | +20.00 |
| **09** | [Weather Observation Station 2](https://www.hackerrank.com/challenges/weather-observation-station-2/problem) | `STATION` | `ROUND(SUM(), 2)`, Decimal Precision | +15.00 |
| **10** | [Weather Observation Station 13](https://www.hackerrank.com/challenges/weather-observation-station-13/problem) | `STATION` | `ROUND(SUM(), 4)`, Compound `BETWEEN` | +15.00 |

---

## 🏗️ Table Schemas

### 1. `CITY` Table
```text
+-------------+--------------+
| Field       | Type         |
+-------------+--------------+
| ID          | NUMBER       |
| NAME        | VARCHAR2(17) |
| COUNTRYCODE | VARCHAR2(3)  |
| DISTRICT    | VARCHAR2(20) |
| POPULATION  | NUMBER       |
+-------------+--------------+
```

### 2. `EMPLOYEES` Table
```text
+-------------+--------------+
| Field       | Type         |
+-------------+--------------+
| ID          | INTEGER      |
| NAME        | STRING       |
| SALARY      | INTEGER      |
+-------------+--------------+
```

### 3. `Employee` Table (Top Earners)
```text
+-------------+--------------+
| Field       | Type         |
+-------------+--------------+
| employee_id | INTEGER      |
| name        | STRING       |
| months      | INTEGER      |
| salary      | INTEGER      |
+-------------+--------------+
```

### 4. `STATION` Table
```text
+-------------+--------------+
| Field       | Type         |
+-------------+--------------+
| ID          | NUMBER       |
| CITY        | VARCHAR2(21) |
| STATE       | VARCHAR2(2)  |
| LAT_N       | NUMBER       |
| LONG_W      | NUMBER       |
+-------------+--------------+
```
`LAT_N` denotes Northern Latitude, and `LONG_W` denotes Western Longitude.
