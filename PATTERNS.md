# 🧠 SQL Mental Models & Master Patterns Playbook

A living catalog of SQL mental models, query patterns, logical execution rules, and gotchas distilled from daily practice.

---

## 📖 1. The English-to-SQL Decoder Table (Translation Dictionary)

Use this table to instantly translate problem prompt keywords into SQL syntax:

```text
┌────────────────────────────────────────────────────────────┬──────────────────────────────────────┐
│ When you see these English Words in the prompt...          │ This is the SQL you write...         │
├────────────────────────────────────────────────────────────┼──────────────────────────────────────┤
│ 1. "Query / Print / Fetch / Display / Return / List..."    │ SELECT                               │
│    - "...all columns / all attributes"                     │ SELECT *                             │
│    - "...names and IDs"                                    │ SELECT name, id                      │
│    - "...unique / distinct / exclude duplicates"           │ SELECT DISTINCT ...                  │
│    - "...length / number of characters"                    │ LENGTH(column_name)                  │
│    - "...how many / total count"                           │ COUNT(...)                           │
├────────────────────────────────────────────────────────────┼──────────────────────────────────────┤
│ 2. "from the [Table] / in the [Table]"                     │ FROM Table_Name                      │
├────────────────────────────────────────────────────────────┼──────────────────────────────────────┤
│ 3. "where / with / having / for all [condition]..."        │ WHERE                                │
│    - "...larger than / greater than / more than"           │ WHERE column > 100                   │
│    - "...smaller than / less than / under"                 │ WHERE column < 50                    │
│    - "...equal to / is / for Japan ('JPN')"                │ WHERE country = 'JPN'                │
│    - "...not equal to / other than"                        │ WHERE country != 'JPN'               │
│    - "...even numbers"                                     │ WHERE MOD(id, 2) = 0                 │
│    - "...odd numbers"                                      │ WHERE MOD(id, 2) = 1                 │
│    - "...starting with 'A'"                                │ WHERE name LIKE 'A%'                 │
│    - "...ending with 'a'"                                  │ WHERE name LIKE '%a'                 │
├────────────────────────────────────────────────────────────┼──────────────────────────────────────┤
│ 4. "order by / sort by / arrange / rank by..."             │ ORDER BY                             │
│    - "...alphabetical / ascending / smallest / lowest"     │ ORDER BY column ASC                  │
│    - "...reverse alphabetical / descending / highest"      │ ORDER BY column DESC                 │
│    - "...if tied / in case of tie / secondary sort"        │ ORDER BY col1 ASC, col2 ASC          │
├────────────────────────────────────────────────────────────┼──────────────────────────────────────┤
│ 5. "top N / first N / shortest 1 / largest 1..."           │ LIMIT N                              │
└────────────────────────────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 🏛️ 2. The Universal SQL Sentence Blueprint

SQL query clauses must **always follow this strict, unchangeable order**:

```text
1. SELECT   [What columns / calculations to output?]
2. FROM     [Which table holds the data?]
3. WHERE    [Which rows to filter?]             (Optional)
4. ORDER BY [How to sort the surviving rows?]   (Optional)
5. LIMIT    [How many rows to return?]          (Optional)
```

> **Memory Hook**: **"So Few Whales Order Lunch"**  
> (**S**ELECT ➡️ **F**ROM ➡️ **W**HERE ➡️ **O**RDER BY ➡️ **L**IMIT)

---

## ⚙️ 3. The Core Mental Model: Logical Execution Order

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

> **Golden Rule**: `ORDER BY` runs **after** `SELECT`, which is why you can sort by calculated columns like `LENGTH(city)`.

---

## 🔍 4. Foundational Query Patterns

### Pattern 4.1: Column Projection vs Full Scan
- `SELECT * FROM table_name;` (Full row scan)
- `SELECT column1, column2 FROM table_name;` (Targeted projection)

### Pattern 4.2: Deduplication & Arithmetic
- `SELECT COUNT(city) - COUNT(DISTINCT city) FROM station;` (Counts duplicate rows)

### Pattern 4.3: Multi-Column Tie-Breaker Sorting
- Sort by primary column, and break ties with a secondary column:
  ```sql
  ORDER BY primary_column DESC, tie_breaker_column ASC;
  ```

### Pattern 4.4: Top-1 Shortest & Longest Pattern (Station 5)
```sql
-- Shortest with alphabetical tie-breaker
SELECT city, LENGTH(city)
FROM station
ORDER BY LENGTH(city) ASC, city ASC
LIMIT 1;

-- Longest with alphabetical tie-breaker
SELECT city, LENGTH(city)
FROM station
ORDER BY LENGTH(city) DESC, city ASC
LIMIT 1;
```

### Pattern 4.5: Modulo Arithmetic for Parity & Sampling
- `MOD(id, 2) = 0` (Even IDs)
- `MOD(id, 2) = 1` (Odd IDs)
- `MOD(id, 10) = 0` (10% systematic sample)
