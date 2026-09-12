# 🔍 Solutions Breakdown: Intermediate Joins & Complex Filtering

---

## 📘 Problem 1: The Report

### 1. The Core Challenge
Ketty wants an academic performance report containing `Name`, `Grade`, and `Mark`. However, two strict business rules apply:
1. Students with `Grade < 8` must have their names masked as `NULL`.
2. Sorting has split logic:
   - Primary Sort: `Grade DESC`.
   - For `Grade >= 8`: Sort alphabetically by `Name ASC`.
   - For `Grade < 8`: Sort by `Marks ASC`.

### 2. Line-by-Line Logic
```sql
SELECT 
    CASE 
        WHEN g.Grade >= 8 THEN s.Name 
        ELSE NULL 
    END AS Name,
    g.Grade,
    s.Marks
FROM Students s
JOIN Grades g 
  ON s.Marks BETWEEN g.Min_Mark AND g.Max_Mark
ORDER BY 
    g.Grade DESC,
    CASE 
        WHEN g.Grade >= 8 THEN s.Name 
        ELSE NULL 
    END ASC,
    s.Marks ASC;
```

### 3. Key Deconstruction Points
* **The Non-Equi Join**: `ON s.Marks BETWEEN g.Min_Mark AND g.Max_Mark`.
  - There is no student ID on the `Grades` table.
  - The engine matches a student's marks against an inclusive range $[Min\_Mark, Max\_Mark]$.
* **The Sorting Trap**:
  - In standard SQL, if you write `ORDER BY g.Grade DESC, Name ASC, s.Marks ASC`, the rows where `Name` is `NULL` will group together. In MySQL, `NULL` values sort first in ascending order.
  - Repeating `s.Marks ASC` as the tertiary sort guarantees that students with identical grades $< 8$ are cleanly broken by their mark ascending.

---

## 📘 Problem 2: Top Competitors

### 1. The Core Challenge
Identify elite coders who achieved full scores on **more than one challenge**, ordered by total full-score count descending, then hacker ID ascending.

### 2. Relational Schema Chain
```
  Submissions (submission_id, hacker_id, challenge_id, score)
       │ (challenge_id)
       ▼
  Challenges (challenge_id, difficulty_level)
       │ (difficulty_level)
       ▼
  Difficulty (difficulty_level, score)  <-- Holds max possible score!
       │
  Hackers (hacker_id, name)            <-- Linked via Submissions.hacker_id
```

### 3. Line-by-Line Logic
```sql
SELECT 
    h.hacker_id,
    h.name
FROM Submissions s
JOIN Challenges c  ON s.challenge_id = c.challenge_id
JOIN Difficulty d  ON c.difficulty_level = d.difficulty_level
JOIN Hackers h     ON s.hacker_id = h.hacker_id
WHERE s.score = d.score  -- Only consider submissions where score matches max difficulty score!
GROUP BY 
    h.hacker_id, 
    h.name
HAVING 
    COUNT(s.submission_id) > 1  -- More than 1 full score!
ORDER BY 
    COUNT(s.submission_id) DESC, 
    h.hacker_id ASC;
```

### 4. Key Deconstruction Points
* **Join Order**: Starting at `Submissions` allows us to filter individual attempts.
* **`WHERE s.score = d.score`**: Filters base rows **before** the `GROUP BY` step, drastically reducing the size of the temporary in-memory aggregate hash table.
* **`ONLY_FULL_GROUP_BY` Compliance**: Because `h.hacker_id` is the primary key of `Hackers`, projecting `h.name` along with `h.hacker_id` is fully standard SQL compliant under functional dependency rules.

---

## 📘 Problem 3: Ollivander's Inventory

### 1. The Core Challenge
Hermione needs to find the cheapest non-evil wands (`is_evil = 0`) for every combination of `(power, age)`.

### 2. Why a Simple `GROUP BY` Fails:
If you simply write:
```sql
-- ❌ INSUFFICIENT: Cannot project wand `id` cleanly!
SELECT MIN(coins_needed), power, age
FROM Wands w JOIN Wands_Property wp ON w.code = wp.code
GROUP BY power, age;
```
You get the minimum coins, but you **lose the specific wand `id`** that corresponds to that minimum coin price!

### 3. The Correlated Subquery Solution:
```sql
SELECT 
    w.id,
    wp.age,
    w.coins_needed,
    w.power
FROM Wands w
JOIN Wands_Property wp ON w.code = wp.code
WHERE wp.is_evil = 0
  AND w.coins_needed = (
      -- Correlated subquery: binds to outer row's age and power
      SELECT MIN(w2.coins_needed)
      FROM Wands w2
      JOIN Wands_Property wp2 ON w2.code = wp2.code
      WHERE wp2.is_evil = 0
        AND w2.power = w.power
        AND wp2.age = wp.age
  )
ORDER BY 
    w.power DESC, 
    wp.age DESC;
```

### 4. Alternative: The Window Function Approach (Modern SQL)
In modern MySQL 8.0+ and PostgreSQL, the senior engineering approach uses `DENSE_RANK()`:
```sql
WITH RankedWands AS (
    SELECT 
        w.id, wp.age, w.coins_needed, w.power,
        DENSE_RANK() OVER (
            PARTITION BY w.power, wp.age 
            ORDER BY w.coins_needed ASC
        ) AS rank_num
    FROM Wands w
    JOIN Wands_Property wp ON w.code = wp.code
    WHERE wp.is_evil = 0
)
SELECT id, age, coins_needed, power
FROM RankedWands
WHERE rank_num = 1
ORDER BY power DESC, age DESC;
```
* **Why Window Functions Win**: Executes in a single scan + sort, eliminating the $O(N \times M)$ overhead of correlated subqueries.
