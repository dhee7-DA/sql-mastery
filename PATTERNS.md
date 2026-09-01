# 🧠 SQL Mental Models & Master Patterns Playbook

A living, exhaustive catalog of SQL mental models, query patterns, logical execution rules, and gotchas distilled from daily practice.

---

## 📖 1. The Master English-to-SQL Decoder Table (Exhaustive Translation Dictionary)

Use this master reference table to translate **any English business prompt or interview question** directly into precise SQL clauses and functions:

### 🅰️ The `SELECT` Clause (What to display, calculate, transform, or aggregate)

| When the English Prompt says... | What you write in SQL | Concrete Example |
|---|---|---|
| *"Query / Print / Fetch / Display / Return / List all columns"* | `SELECT *` | `SELECT * FROM Employee;` |
| *"Fetch specific fields / names and salaries"* | `SELECT col1, col2` | `SELECT name, salary FROM Employee;` |
| *"Rename a column / labeled as / alias"* | `SELECT col AS alias_name` | `SELECT salary AS monthly_pay FROM Employee;` |
| *"Unique / Distinct / Exclude duplicates / No repeats"* | `SELECT DISTINCT col` | `SELECT DISTINCT city FROM Station;` |
| *"How many / Total count of records"* | `COUNT(col)` or `COUNT(*)` | `SELECT COUNT(id) FROM Users;` |
| *"How many unique / Count distinct values"* | `COUNT(DISTINCT col)` | `SELECT COUNT(DISTINCT city) FROM Station;` |
| *"Total sum / Aggregate amount / Total revenue"* | `SUM(col)` | `SELECT SUM(salary) FROM Employee;` |
| *"Average / Mean / Typical value"* | `AVG(col)` | `SELECT AVG(salary) FROM Employee;` |
| *"Smallest / Lowest / Minimum value"* | `MIN(col)` | `SELECT MIN(marks) FROM Students;` |
| *"Largest / Highest / Maximum value"* | `MAX(col)` | `SELECT MAX(salary) FROM Employee;` |
| *"Round to N decimal places / Nearest integer"* | `ROUND(col, N)` | `SELECT ROUND(AVG(lat_n), 2) FROM Station;` |
| *"Truncate / Drop decimals without rounding"* | `TRUNCATE(col, N)` | `SELECT TRUNCATE(lat_n, 4) FROM Station;` |
| *"Difference between A and B / Subtract"* | `A - B` | `SELECT COUNT(city) - COUNT(DISTINCT city) FROM Station;` |
| *"Ratio / Percentage / Share of total"* | `(A / B) * 100` | `SELECT (SUM(sales) / 1000000) * 100 FROM Stores;` |
| *"Length / Number of characters in text"* | `LENGTH(col)` | `SELECT city, LENGTH(city) FROM Station;` |
| *"First N characters / Prefix"* | `LEFT(col, N)` or `SUBSTR(col, 1, N)` | `SELECT LEFT(name, 3) FROM Students;` |
| *"Last N characters / Suffix"* | `RIGHT(col, N)` or `SUBSTR(col, -N)` | `SELECT RIGHT(name, 3) FROM Students;` |
| *"Extract substring from middle"* | `SUBSTRING(col, start, len)` | `SELECT SUBSTRING(phone, 1, 3) FROM Users;` |
| *"Convert to Uppercase / Capitalize"* | `UPPER(col)` | `SELECT UPPER(name) FROM Employee;` |
| *"Convert to Lowercase"* | `LOWER(col)` | `SELECT LOWER(email) FROM Users;` |
| *"Combine / Glue / Concatenate text together"* | `CONCAT(col1, ' ', col2)` | `SELECT CONCAT(first_name, ' ', last_name) FROM Users;` |
| *"Replace characters / Clean typos"* | `REPLACE(col, 'old', 'new')` | `SELECT REPLACE(salary, '0', '') FROM Employee;` |
| *"If-Else conditional logic / Categorize / Tag"* | `CASE WHEN ... THEN ... ELSE ... END` | `SELECT name, CASE WHEN marks >= 75 THEN 'Pass' ELSE 'Fail' END FROM Students;` |
| *"If NULL replace with default value / Missing data"* | `COALESCE(col, default_val)` or `IFNULL(col, default_val)` | `SELECT name, COALESCE(commission, 0) FROM Sales;` |

---

### 🅱️ The `FROM` Clause (Where does the data live?)

| When the English Prompt says... | What you write in SQL | Concrete Example |
|---|---|---|
| *"From the [Table] / In the [Table] / Query [Entity]"* | `FROM Table_Name` | `FROM STATION` |
| *"Table alias / Short name"* | `FROM Table_Name t` | `FROM Employee e` |
| *"Join / Combine multiple tables"* | `FROM TableA a JOIN TableB b ON a.id = b.a_id` | `FROM Orders o JOIN Customers c ON o.cust_id = c.id` |

---

### 🅲 The `WHERE` Clause (Which rows should be filtered in or out?)

| When the English Prompt says... | What you write in SQL | Concrete Example |
|---|---|---|
| *"Equal to / Exact match / For America ('USA')"* | `WHERE col = 'USA'` *(Strings in quotes!)* | `WHERE countrycode = 'USA'` |
| *"Not equal to / Except / Excluding"* | `WHERE col <> 'USA'` or `WHERE col != 'USA'` | `WHERE status != 'CANCELLED'` |
| *"Greater than / Larger than / Exceeding / More than"* | `WHERE col > value` *(No quotes on numbers!)* | `WHERE population > 100000` |
| *"Greater than or equal to / At least / Minimum"* | `WHERE col >= value` | `WHERE salary >= 2000` |
| *"Less than / Smaller than / Under / Below"* | `WHERE col < value` | `WHERE months < 10` |
| *"Between X and Y (Inclusive range)"* | `WHERE col BETWEEN X AND Y` | `WHERE age BETWEEN 18 AND 65` |
| *"Matches any in a list / Either A, B, or C"* | `WHERE col IN ('A', 'B', 'C')` | `WHERE countrycode IN ('USA', 'JPN', 'CAN')` |
| *"Does NOT match any in a list"* | `WHERE col NOT IN ('A', 'B', 'C')` | `WHERE status NOT IN ('FAILED', 'CANCELLED')` |
| *"Text starts with 'A'"* | `WHERE col LIKE 'A%'` or `WHERE col REGEXP '^A'` | `WHERE city LIKE 'A%'` |
| *"Text ends with 'a'"* | `WHERE col LIKE '%a'` or `WHERE col REGEXP 'a$'` | `WHERE city LIKE '%a'` |
| *"Text contains 'tech' anywhere"* | `WHERE col LIKE '%tech%'` | `WHERE email LIKE '%@gmail.com'` |
| *"2nd character is 'a'"* | `WHERE col LIKE '_a%'` | `WHERE city LIKE '_a%'` |
| *"Text is exactly 3 characters long"* | `WHERE col LIKE '___'` | `WHERE code LIKE '___'` |
| *"Text starts with a vowel (A, E, I, O, U)"* | `WHERE col REGEXP '^[aeiou]'` | `WHERE city REGEXP '^[aeiou]'` |
| *"Text does NOT start with a vowel"* | `WHERE col NOT REGEXP '^[aeiou]'` | `WHERE city NOT REGEXP '^[aeiou]'` |
| *"Text ends with a vowel"* | `WHERE col REGEXP '[aeiou]$'` | `WHERE city REGEXP '[aeiou]$'` |
| *"Text does NOT end with a vowel"* | `WHERE col NOT REGEXP '[aeiou]$'` | `WHERE city NOT REGEXP '[aeiou]$'` |
| *"Text starts AND ends with vowels"* | `WHERE col REGEXP '^[aeiou]' AND col REGEXP '[aeiou]$'` | `WHERE city REGEXP '^[aeiou].*[aeiou]$'` |
| *"Either does NOT start OR does NOT end with vowel"* | `WHERE col NOT REGEXP '^[aeiou]' OR col NOT REGEXP '[aeiou]$'` | Station 11 Pattern |
| *"Neither starts NOR ends with vowel"* | `WHERE col NOT REGEXP '^[aeiou]' AND col NOT REGEXP '[aeiou]$'` | Station 12 Pattern |
| *"Even numbers / Even IDs"* | `WHERE MOD(col, 2) = 0` (or `WHERE col % 2 = 0`) | `WHERE MOD(id, 2) = 0` |
| *"Odd numbers / Odd IDs"* | `WHERE MOD(col, 2) = 1` (or `WHERE MOD(col, 2) <> 0`) | `WHERE MOD(id, 2) = 1` |
| *"Every 10th record / 10% sampling"* | `WHERE MOD(col, 10) = 0` | `WHERE MOD(order_id, 10) = 0` |
| *"Missing value / Blank / Null"* | `WHERE col IS NULL` | `WHERE manager_id IS NULL` |
| *"Not missing / Has a value / Populated"* | `WHERE col IS NOT NULL` | `WHERE email IS NOT NULL` |
| *"Both conditions must be TRUE"* | `WHERE cond1 AND cond2` | `WHERE country = 'USA' AND pop > 100000` |
| *"At least one condition must be TRUE"* | `WHERE cond1 OR cond2` | `WHERE status = 'NEW' OR status = 'OPEN'` |

---

### 🅳 The `ORDER BY` Clause (How to sort / arrange rows)

| When the English Prompt says... | What you write in SQL | Concrete Example |
|---|---|---|
| *"Alphabetical / Ascending / Smallest first / Lowest first"* | `ORDER BY col ASC` *(or just `ORDER BY col`)* | `ORDER BY name ASC;` |
| *"Reverse alphabetical / Descending / Highest first / Largest"* | `ORDER BY col DESC` | `ORDER BY salary DESC;` |
| *"If tied / Secondary sort / Tie-breaker"* | `ORDER BY col1 DESC, col2 ASC` | `ORDER BY marks DESC, name ASC;` |
| *"Sort by length of text"* | `ORDER BY LENGTH(col) ASC` | `ORDER BY LENGTH(city) ASC, city ASC;` |
| *"Sort by last 3 letters of name"* | `ORDER BY RIGHT(col, 3) ASC` | `ORDER BY RIGHT(name, 3) ASC, id ASC;` |

---

### 🅴 The `LIMIT` Clause (How many rows to return?)

| When the English Prompt says... | What you write in SQL | Concrete Example |
|---|---|---|
| *"Top 1 / Highest 1 / Single largest / Maximum"* | `ORDER BY col DESC LIMIT 1;` | `ORDER BY salary DESC LIMIT 1;` |
| *"Bottom 1 / Lowest 1 / Single shortest / Minimum"* | `ORDER BY col ASC LIMIT 1;` | `ORDER BY LENGTH(city) ASC LIMIT 1;` |
| *"Top 5 / First 10 / Best 3"* | `ORDER BY col DESC LIMIT N;` | `ORDER BY stream_count DESC LIMIT 5;` |
| *"Skip first 10 rows, show next 5 (Pagination)"* | `LIMIT 5 OFFSET 10;` | `LIMIT 5 OFFSET 10;` |

---

## 🎯 2. The Wildcard & Regex Quick-Reference Cheatsheet

### A. SQL Standard `LIKE` Wildcards
- **`%`**: Any number of characters (0, 1, or many). E.g. `'A%'` (starts with A), `'%A'` (ends with A), `'%A%'` (contains A).
- **`_`**: Exactly ONE character. E.g. `'_A%'` (2nd letter is A), `'___'` (exactly 3 letters).

### B. Regular Expression (`REGEXP`) Anchors & Sets
- **`^`**: Start anchor. E.g. `'^A'` (starts with A).
- **`$`**: End anchor. E.g. `'A$'` (ends with A).
- **`[...]`**: Any single character inside. E.g. `'[aeiou]'` (any vowel).
- **`[^...]`**: Any single character NOT inside. E.g. `'[^aeiou]'` (any non-vowel).
- **`.*`**: Any sequence of characters. E.g. `'^[aeiou].*[aeiou]$'` (starts AND ends with vowels).

---

## 🏛️ 3. The Universal SQL Sentence Blueprint

SQL query clauses must **always follow this strict, unchangeable order**:

```text
1. SELECT   [What columns / calculations / aggregates to output?]
2. FROM     [Which table holds the data?]
3. WHERE    [Which raw rows to filter before aggregation?]       (Optional)
4. GROUP BY [Which column(s) to bucket rows into?]              (Optional - Day 5)
5. HAVING   [Which aggregated groups to filter?]                (Optional - Day 5)
6. ORDER BY [How to sort the final surviving rows?]             (Optional)
7. LIMIT    [How many rows to return on screen?]                (Optional)
```

> **Memory Hook**: **"So Few Whales Gather Heavenly Ocean Lunches"**  
> (**S**ELECT ➡️ **F**ROM ➡️ **W**HERE ➡️ **G**ROUP BY ➡️ **H**AVING ➡️ **O**RDER BY ➡️ **L**IMIT)

---

## ⚙️ 4. The Logical Execution Order (How the Database Engine Thinks)

```text
1. FROM & JOINs       --> Locate and load raw tables into memory
2. WHERE              --> Filter individual rows before grouping
3. GROUP BY           --> Bucket rows into summary groups
4. HAVING             --> Filter groups based on aggregated totals
5. SELECT             --> Choose / calculate output expressions
6. DISTINCT           --> Remove duplicate rows from result set
7. ORDER BY           --> Sort the surviving rows
8. LIMIT / OFFSET     --> Restrict the number of output rows
```
