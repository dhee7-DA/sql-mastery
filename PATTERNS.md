# 🧠 SQL Mental Models & Master Patterns Playbook

A living catalog of SQL mental models, query patterns, logical execution rules, and gotchas distilled from daily practice.

---

## ⚙️ 1. The Core Mental Model: Logical Execution Order

SQL is written in one order, but executed by the database engine in a **completely different order**:

```text
Written Order:             Logical Execution Order:
1. SELECT                  1. FROM (and JOINs)       --> Identify the tables
2. DISTINCT                2. WHERE                  --> Filter row by row
3. FROM                    3. GROUP BY               --> Aggregate rows into groups
4. WHERE                   4. HAVING                 --> Filter aggregated groups
5. GROUP BY                5. SELECT                 --> Choose / compute output columns
6. HAVING                  6. DISTINCT               --> Remove duplicate tuples
7. ORDER BY                7. ORDER BY               --> Sort the result set
8. LIMIT / TOP             8. LIMIT / OFFSET         --> Restrict the number of rows
```

> **Golden Rule**: You cannot reference column aliases defined in `SELECT` inside your `WHERE` clause because `WHERE` runs **before** `SELECT`.

---

## 🔍 2. Foundational Patterns

### Pattern 2.1: Column Projection vs Full Scan
- **Full Row Scan (`*`)**: Grabs all columns. Useful for ad-hoc inspection, but costly in production.
  ```sql
  SELECT * FROM table_name;
  ```
- **Targeted Projection**: Explicitly list only required columns to reduce memory overhead and leverage index-only scans.
  ```sql
  SELECT column1, column2 FROM table_name;
  ```

### Pattern 2.2: Row Filtering (`WHERE`)
- Evaluates predicate conditions row-by-row on the source table(s) before any aggregation.
  ```sql
  SELECT name, population
  FROM city
  WHERE countrycode = 'USA' AND population > 100000;
  ```

### Pattern 2.3: Modulo Arithmetic for Even/Odd Row Filtering
- In MySQL / Oracle: `MOD(column_name, 2) = 0` (Even) or `MOD(column_name, 2) != 0` (Odd)
- In PostgreSQL / SQLite / SQL Server: `column_name % 2 = 0`
  ```sql
  SELECT DISTINCT city
  FROM station
  WHERE MOD(id, 2) = 0;
  ```

### Pattern 2.4: Deduplication (`DISTINCT`)
- Eliminates duplicate rows from the final result set based on the combination of selected columns.
  ```sql
  SELECT DISTINCT city FROM station;
  ```

---

## ⚠️ Common Traps & Gotchas
1. **String Literals vs Identifiers**: Strings must always be wrapped in single quotes `'USA'`, while table and column names do not use quotes (or use backticks/double quotes depending on the SQL dialect).
2. **Case Sensitivity**: SQL keywords (`SELECT`, `WHERE`) are case-insensitive, but string data inside conditions (e.g., `'USA'` vs `'usa'`) may be case-sensitive depending on the collation/database.
3. **`DISTINCT` applies to the whole row**: `SELECT DISTINCT a, b` checks uniqueness across `(a, b)` pairs, NOT just `a`.
