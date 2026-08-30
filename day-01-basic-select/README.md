# 📅 Day 01: Basic SELECT & Row Filtering

Mastering fundamental row extraction, column projection, logical operators, and deduplication.

---

## 🎯 Objectives
- Understand the mental model of `SELECT`, `FROM`, `WHERE`, and `DISTINCT`.
- Practice conditional filtering using comparison operators (`=`, `>`, `<`, `<>`).
- Combine multiple conditions using boolean logic (`AND`, `OR`, `NOT`).
- Master modulo arithmetic for filtering based on numeric IDs (`MOD()` / `%`).
- Apply `DISTINCT` to eliminate duplicate rows from query outputs.

---

## 📋 Problem Set (HackerRank Basic Select)

| # | Problem Name | Concepts Tested | Link |
|---|---|---|---|
| 01 | **Revising the Select Query I** | `SELECT *`, `WHERE`, `AND`, Numeric/String filter | [Open Problem](https://www.hackerrank.com/challenges/revising-the-select-query/problem) |
| 02 | **Revising the Select Query II** | Specific column selection, `WHERE`, `AND` | [Open Problem](https://www.hackerrank.com/challenges/revising-the-select-query-2/problem) |
| 03 | **Select All** | Full table scan, `SELECT *` | [Open Problem](https://www.hackerrank.com/challenges/select-all-sql/problem) |
| 04 | **Select By ID** | Primary key / numeric ID exact match | [Open Problem](https://www.hackerrank.com/challenges/select-by-id/problem) |
| 05 | **Japanese Cities' Attributes** | Filter by string literal code (`COUNTRYCODE = 'JPN'`) | [Open Problem](https://www.hackerrank.com/challenges/japanese-cities-attributes/problem) |
| 06 | **Japanese Cities' Names** | Project single column with filter | [Open Problem](https://www.hackerrank.com/challenges/japanese-cities-name/problem) |
| 07 | **Weather Observation Station 1** | Multi-column projection (`CITY`, `STATE`) | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-1/problem) |
| 08 | **Weather Observation Station 3** | `DISTINCT`, Modulo math (`MOD(ID, 2) = 0`) | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-3/problem) |

---

## 📦 Schemas for Today's Problems

### `CITY` Table
| Field | Type |
|---|---|
| `ID` | NUMBER |
| `NAME` | VARCHAR2(17) |
| `COUNTRYCODE` | VARCHAR2(3) |
| `DISTRICT` | VARCHAR2(20) |
| `POPULATION` | NUMBER |

### `STATION` Table
| Field | Type |
|---|---|
| `ID` | NUMBER |
| `CITY` | VARCHAR2(21) |
| `STATE` | VARCHAR2(2) |
| `LAT_N` | NUMBER |
| `LONG_W` | NUMBER |
