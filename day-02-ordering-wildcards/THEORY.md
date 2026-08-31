# 📚 Day 02 Deep-Dive Theory: Count Arithmetic & Pattern Matching (Regex / LIKE)

---

## 🗺️ 1. Concept 1: Aggregate Arithmetic — `COUNT()` vs `COUNT(DISTINCT)`

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
