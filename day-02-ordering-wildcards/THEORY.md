# 📚 Day 02 Deep Dive: Pattern Matching, Wildcards & Ordering

A rigorous, beginner-to-advanced conceptual guide for Day 02. Covers aggregate arithmetic, text length metrics, sorting mechanics, standard SQL wildcards (`LIKE`), and MySQL Regular Expressions (`REGEXP`).

---

## 🏛️ 1. The Universal SQL Sentence Blueprint

SQL query clauses must **always follow this strict, unchangeable order**:

```text
1. SELECT   [What columns / calculations / aggregates to output?]
2. FROM     [Which table holds the data?]
3. WHERE    [Which raw rows to filter before aggregation?]       (Optional)
4. GROUP BY [Which column(s) to bucket rows into?]              (Optional)
5. HAVING   [Which aggregated groups to filter?]                (Optional)
6. ORDER BY [How to sort the final surviving rows?]             (Optional)
7. LIMIT    [How many rows to return on screen?]                (Optional)
```

> **Memory Hook**: **"So Few Whales Gather Heavenly Ocean Lunches"**  
> (**S**ELECT ➡️ **F**ROM ➡️ **W**HERE ➡️ **G**ROUP BY ➡️ **H**AVING ➡️ **O**RDER BY ➡️ **L**IMIT)

---

## 📏 2. String Length & Multi-Column Sorting (Station 5)

### A. The `LENGTH()` Function
`LENGTH(str)` returns the count of characters in a string:
- `LENGTH('NYC')` $\rightarrow$ `3`
- `LENGTH('San Francisco')` $\rightarrow$ `13`

### B. Multi-Column Sorting & Tie-Breaking
When rows have identical values in the primary sort column, a secondary column is passed after a comma to break ties:
```sql
ORDER BY LENGTH(city) ASC, city ASC;
--       [Primary Sort]    [Secondary Tie-Breaker]
```

### C. Why Two Queries are Required for Extremes:
An `ORDER BY` clause can only sort in one direction (`ASC` OR `DESC`) per query. To retrieve the shortest and longest strings, write two independent queries with `LIMIT 1`:
```sql
-- Query 1: Shortest
SELECT city, LENGTH(city) FROM station ORDER BY LENGTH(city) ASC, city ASC LIMIT 1;

-- Query 2: Longest
SELECT city, LENGTH(city) FROM station ORDER BY LENGTH(city) DESC, city ASC LIMIT 1;
```

---

## 🔤 3. Standard SQL Wildcards (`LIKE` & `NOT LIKE`)

| Wildcard | Definition | Example | Matches |
|---|---|---|---|
| `%` | Zero, one, or multiple characters | `LIKE 'A%'` | *Austin, Atlanta* |
| `%` | Suffix wildcard | `LIKE '%a'` | *California, Florida* |
| `%` | Substring containment | `LIKE '%tech%'` | *Fintech, Biotech* |
| `_` | Exactly ONE character | `LIKE '_a%'` | *Dallas, Paris* (2nd letter is 'a') |
| `_` | Exact length check | `LIKE '___'` | *USA, CAN, NYC* (Exactly 3 characters) |

---

## ⚡ 4. Regular Expressions (`REGEXP`) in MySQL

### Core Pattern Symbols:
- **`^`**: Start of word anchor (e.g. `'^[aeiou]'` = starts with vowel).
- **`$`**: End of word anchor (e.g. `'[aeiou]$'` = ends with vowel).
- **`[...]`**: Character class (any single character in the set).
- **`[^...]`**: Negated character class (any character NOT in the set).
- **`.*`**: Zero or more occurrences of any character.

### Master Vowel Problem Grid (Station 6–12):

| Problem | English Requirement | SQL Condition |
|---|---|---|
| **Station 6** | Starts with vowel | `WHERE city REGEXP '^[aeiou]'` |
| **Station 7** | Ends with vowel | `WHERE city REGEXP '[aeiou]$'` |
| **Station 8** | Starts AND ends with vowel | `WHERE city REGEXP '^[aeiou]' AND city REGEXP '[aeiou]$'` |
| **Station 9** | Does NOT start with vowel | `WHERE city NOT REGEXP '^[aeiou]'` |
| **Station 10** | Does NOT end with vowel | `WHERE city NOT REGEXP '[aeiou]$'` |
| **Station 11** | Does NOT start OR does NOT end | `WHERE city NOT REGEXP '^[aeiou]' OR city NOT REGEXP '[aeiou]$'` |
| **Station 12** | Neither starts NOR ends | `WHERE city NOT REGEXP '^[aeiou]' AND city NOT REGEXP '[aeiou]$'` |

---

## 🔢 5. Aggregate Arithmetic — `COUNT()` vs `COUNT(DISTINCT)`

In SQL, aggregation functions like `COUNT()` can be combined with mathematical operators (`-`, `+`, `*`, `/`) directly inside the `SELECT` clause.

```text
Table: STATION
+----+------------+
| ID | CITY       |
+----+------------+
| 1  | Austin     |
| 2  | Denver     |
| 3  | Austin     | <-- Duplicate city!
| 4  | Seattle    |
+----+------------+
```

### The Difference:
- **`COUNT(CITY)`**: Counts every non-null row $\rightarrow$ **4**
- **`COUNT(DISTINCT CITY)`**: Counts unique city names $\rightarrow$ **3**
- **Difference (Duplicate Count)**: $4 - 3 = \mathbf{1}$

```sql
SELECT COUNT(CITY) - COUNT(DISTINCT CITY)
FROM STATION;
```

---

## 🔍 2. Concept 2: Text Pattern Matching — `LIKE` vs `REGEXP`

In the **Weather Observation Station 6–12** series, HackerRank tests your ability to filter string attributes based on vowels (`a, e, i, o, u`).

### Method A: The Standard SQL `LIKE` Approach
Using `LIKE` with wildcards (`%`):
```sql
-- Starts with any vowel
WHERE CITY LIKE 'A%' 
   OR CITY LIKE 'E%' 
   OR CITY LIKE 'I%' 
   OR CITY LIKE 'O%' 
   OR CITY LIKE 'U%'
```
*Pros*: Universally supported across every SQL engine.  
*Cons*: Extremely verbose when testing multiple character sets.

---

### Method B: The MySQL `REGEXP` (Regular Expression) Approach
MySQL 8.0+ has built-in regex matching using the `REGEXP` (or `RLIKE`) operator:

| Regex Symbol | Meaning | Example | Matches |
|---|---|---|---|
| **`^`** | Start of string | `REGEXP '^[aeiou]'` | *Austin, Orlando, Irvine* |
| **`$`** | End of string | `REGEXP '[aeiou]$'` | *Atlanta, Tokyo, Miami* |
| **`[aeiou]`**| Any vowel in the bracket | `REGEXP '^[aeiou]'` | Matches `a`, `e`, `i`, `o`, or `u` |
| **`[^aeiou]`**| Negation (NOT a vowel) | `REGEXP '^[^aeiou]'` | Matches consonant start (*Boston, Denver*) |

---

## 🧩 3. The 6 Master Vowel Patterns (Station 6–12 Cheat Sheet)

```text
1. Starts with vowel (Station 6):
   WHERE CITY REGEXP '^[aeiou]'

2. Ends with vowel (Station 7):
   WHERE CITY REGEXP '[aeiou]$'

3. Starts AND Ends with vowel (Station 8):
   WHERE CITY REGEXP '^[aeiou]' AND CITY REGEXP '[aeiou]$'

4. Does NOT start with vowel (Station 9):
   WHERE CITY NOT REGEXP '^[aeiou]'   (or: WHERE CITY REGEXP '^[^aeiou]')

5. Does NOT end with vowel (Station 10):
   WHERE CITY NOT REGEXP '[aeiou]$'   (or: WHERE CITY REGEXP '[^aeiou]$')

6. Either does NOT start OR does NOT end with vowel (Station 11):
   WHERE CITY NOT REGEXP '^[aeiou]' OR CITY NOT REGEXP '[aeiou]$'

7. Neither starts NOR ends with vowel (Station 12):
   WHERE CITY NOT REGEXP '^[aeiou]' AND CITY NOT REGEXP '[aeiou]$'
```

> **Pro Tip**: In MySQL regex matching on text columns, matching is case-insensitive by default under standard table collations, so `'^[aeiou]'` cleanly matches both `'Austin'` and `'austin'`.
