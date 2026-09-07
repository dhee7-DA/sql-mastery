# 📅 Day 06 Daily Execution Log

- **Module**: `day-06-station-math-aggregates`
- **Focus**: Weather Observation Station 2, 13–20 (Coordinate geometry, Manhattan & Euclidean distances, Calculating medians in MySQL)
- **Status**: 🟢 9 / 9 Problems Completed (100%)
- **HackerRank Track**: Aggregation Track Fully Completed!

---

### Execution Ledger

| Challenge | Points | Dialect | Verified Output |
|---|:---:|:---:|:---:|
| Weather Observation Station 2 | 15.00 | MySQL 8.0 | `ROUND(SUM(LAT_N), 2)`, `ROUND(SUM(LONG_W), 2)` |
| Weather Observation Station 13 | 10.00 | MySQL 8.0 | `SUM` with `LAT_N > 38.7880 AND LAT_N < 137.2345` |
| Weather Observation Station 14 | 10.00 | MySQL 8.0 | Sub-ceiling `MAX(LAT_N)` |
| Weather Observation Station 15 | 15.00 | MySQL 8.0 | `ORDER BY LAT_N DESC LIMIT 1` coordinate cross-lookup |
| Weather Observation Station 16 | 10.00 | MySQL 8.0 | Super-floor `MIN(LAT_N)` |
| Weather Observation Station 17 | 15.00 | MySQL 8.0 | `ORDER BY LAT_N ASC LIMIT 1` coordinate cross-lookup |
| Weather Observation Station 18 | 25.00 | MySQL 8.0 | Manhattan Distance `(MAX - MIN) + (MAX - MIN)` |
| Weather Observation Station 19 | 30.00 | MySQL 8.0 | Euclidean Distance `SQRT(POW(...) + POW(...))` |
| Weather Observation Station 20 | 40.00 | MySQL 8.0 / 5.7 | **Median of `LAT_N`** via Window Function & User Variables |

**Total Points Conquered in Day 06**: **175.00 Points**
