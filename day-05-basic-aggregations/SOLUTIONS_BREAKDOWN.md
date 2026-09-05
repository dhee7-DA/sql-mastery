# 🛠️ Day 05 Solutions & Technical Breakdowns

---

## 📌 Problem 01: Revising Aggregations - The Count Function
- **SQL Concept**: `COUNT(*)` with `WHERE` predicate.
- **Query**:
  ```sql
  SELECT COUNT(*) 
  FROM CITY 
  WHERE POPULATION > 100000;
  ```
- **Execution Order**:
  1. `FROM CITY`: Reads city records.
  2. `WHERE POPULATION > 100000`: Evaluates filter condition per row.
  3. `SELECT COUNT(*)`: Emits single scalar count of surviving rows.

---

## 📌 Problem 02 & 03: Sum & Averages (California District)
- **SQL Concept**: `SUM()` & `AVG()` with string filter.
- **Queries**:
  ```sql
  -- Sum:
  SELECT SUM(POPULATION) FROM CITY WHERE DISTRICT = 'California';

  -- Average:
  SELECT AVG(POPULATION) FROM CITY WHERE DISTRICT = 'California';
  ```

---

## 📌 Problem 04: Average Population (Rounding Down)
- **SQL Concept**: `FLOOR(AVG(...))`
- **Query**:
  ```sql
  SELECT FLOOR(AVG(POPULATION)) 
  FROM CITY;
  ```
- **Technical Note**:
  - `FLOOR()` always rounds **down** to the next integer (e.g. `FLOOR(450.9)` &rarr; `450`).
  - `ROUND()` would round to nearest (`450.9` &rarr; `451`).

---

## 📌 Problem 06: Population Density Difference
- **SQL Concept**: Range arithmetic with scalar aggregate reduction.
- **Query**:
  ```sql
  SELECT MAX(POPULATION) - MIN(POPULATION) 
  FROM CITY;
  ```
- **Technical Note**:
  - Both `MAX()` and `MIN()` evaluate over the same rowset in a single table scan, and the subtraction operator evaluates on the two scalar outputs.

---

## 📌 Problem 07: The Blunder (Samantha's Zero Error)
- **SQL Concept**: String manipulation inside numeric aggregates.
- **Query**:
  ```sql
  SELECT CEIL(AVG(SALARY) - AVG(CAST(REPLACE(CAST(SALARY AS CHAR), '0', '') AS DECIMAL(10, 2))))
  FROM EMPLOYEES;
  ```
- **Execution Order Logic**:
  1. `AVG(SALARY)`: True corporate average salary.
  2. `REPLACE(CAST(SALARY AS CHAR), '0', '')`: Strips character `'0'` from string representation of salary.
  3. `CAST(... AS DECIMAL(10,2))`: Re-converts back into numeric format so `AVG()` can compute the error average.
  4. `AVG(...) - AVG(...)`: Subtraction gives positive error magnitude.
  5. `CEIL(...)`: Rounds up to next integer as requested by business rules.

---

## 📌 Problem 08: Top Earners (Compound Maximum & Group Frequency)
- **SQL Concept**: Derived expression grouping with sorting & limiting.
- **Query**:
  ```sql
  SELECT (months * salary) AS total_earnings, COUNT(*)
  FROM Employee
  GROUP BY total_earnings
  ORDER BY total_earnings DESC
  LIMIT 1;
  ```
- **Evaluation Order**:
  1. `FROM Employee`: Scans rows.
  2. `GROUP BY total_earnings`: Buckets employees by their total compensation (`months * salary`).
  3. `ORDER BY total_earnings DESC`: Highest compensation bucket sorts to top position.
  4. `LIMIT 1`: Returns only the maximum compensation and the count of employees sharing that peak salary.

---

## 📌 Problem 09 & 10: Weather Observation Station 2 & 13
- **SQL Concept**: Decimal precision with `ROUND(SUM(), N)`.
- **Query 09**:
  ```sql
  SELECT ROUND(SUM(LAT_N), 2), ROUND(SUM(LONG_W), 2)
  FROM STATION;
  ```
- **Query 10**:
  ```sql
  SELECT ROUND(SUM(LAT_N), 4)
  FROM STATION
  WHERE LAT_N > 38.7880 AND LAT_N < 137.2345;
  ```
