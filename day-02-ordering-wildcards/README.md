# 📅 Day 02: Aggregate Arithmetic & Vowel Pattern Matching

Mastering duplicate counting (`COUNT - DISTINCT`) and string pattern matching using regular expressions and wildcards (`Station 4, 6–12`).

---

## 🎯 Objectives
- Calculate data quality and duplicate metrics using `COUNT(col) - COUNT(DISTINCT col)`.
- Master prefix pattern matching using `^` and character sets `[aeiou]`.
- Master suffix pattern matching using `$` and character sets `[aeiou]`.
- Implement boolean conjunctions (`AND` / `OR`) with complex regex patterns.
- Apply negation operators (`NOT REGEXP` / `^[^aeiou]`).

---

## 📋 Problem Set (HackerRank Basic Select Track)

| # | Problem Name | Concepts Tested | Link |
|---|---|---|---|
| 01 | **Weather Observation Station 4** | `COUNT(CITY) - COUNT(DISTINCT CITY)` | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-4/problem) |
| 02 | **Weather Observation Station 6** | Starts with vowels (`REGEXP '^[aeiou]'`) | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-6/problem) |
| 03 | **Weather Observation Station 7** | Ends with vowels (`REGEXP '[aeiou]$'`) | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-7/problem) |
| 04 | **Weather Observation Station 8** | Starts AND ends with vowels | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-8/problem) |
| 05 | **Weather Observation Station 9** | Does NOT start with vowels (`NOT REGEXP`) | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-9/problem) |
| 06 | **Weather Observation Station 10** | Does NOT end with vowels | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-10/problem) |
| 07 | **Weather Observation Station 11** | Does NOT start OR does NOT end with vowels | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-11/problem) |
| 08 | **Weather Observation Station 12** | Neither starts NOR ends with vowels | [Open Problem](https://www.hackerrank.com/challenges/weather-observation-station-12/problem) |

---

## 📦 Schemas for Today's Problems

### `STATION` Table
| Field | Type | Description |
|---|---|---|
| `ID` | NUMBER | Station ID |
| `CITY` | VARCHAR2(21) | City name |
| `STATE` | VARCHAR2(2) | State code |
| `LAT_N` | NUMBER | Northern latitude |
| `LONG_W` | NUMBER | Western longitude |
