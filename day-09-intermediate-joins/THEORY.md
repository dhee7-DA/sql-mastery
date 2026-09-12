# 🏛️ Day 09 Theory: Intermediate Joins, Range Slicing & Multi-Table Chains

---

## 1. Non-Equi Joins: Joining on Ranges Instead of Keys

In basic SQL, joins link tables through primary key and foreign key equality (`ON a.customer_id = b.customer_id`). However, in enterprise finance, analytics, and policy modeling, data frequently has **no direct ID match**. Instead, continuous numbers must be mapped into discrete policy bands.

```
  STUDENTS TABLE: Marks = 75
         │
         ▼
  GRADES TABLE:  Min_Mark (70) ───[ MATCH: 70 <= 75 <= 79 ]───► Max_Mark (79)
         │
         ▼
  OUTPUT TUPLE: (Student, Grade 8, 75 Marks)
```

### Syntax Comparison
```sql
-- Standard Equi-Join (Strict Equality)
SELECT * FROM Orders o JOIN Customers c ON o.customer_id = c.id;

-- Non-Equi Range Join (Inequality / BETWEEN)
SELECT s.name, g.grade, s.marks
FROM Students s
JOIN Grades g 
  ON s.marks BETWEEN g.min_mark AND g.max_mark;
```

### Physical Storage Engine Mechanics
- **Why Hash Joins Fail Here**: A database engine's **In-Memory Hash Join** works by computing a hash value for an equality key (e.g. `hash(id)`). Because `BETWEEN` represents an inequality range ($[A, B]$), hash collisions cannot occur.
- **How the Engine Executes It**: The query optimizer routes Non-Equi Joins through:
  1. **Index Range Scan**: Traverses the B-Tree index on `Grades(min_mark, max_mark)`.
  2. **Nested Loop Join (NLJ)**: Iterates row-by-row through the outer table, probing whether `marks >= min_mark AND marks <= max_mark`.
- **Enterprise Applications**:
  - **Tax Brackets**: Mapping taxable income into Federal/State percentage brackets.
  - **Tiered Volume Fees**: Assigning transaction fee rates based on cumulative monthly volume.
  - **Credit Risk Tiers**: Categorizing FICO credit scores into Prime, Near-Prime, and Subprime.

---

## 2. Multi-Table Relational Traversal Chains (4+ Tables)

Real enterprise schemas rarely allow you to answer a question with just two tables. You must traverse a **relational chain**:

```
  [Submissions] ──(challenge_id)──► [Challenges] ──(difficulty_level)──► [Difficulty]
       │
   (hacker_id)
       ▼
   [Hackers]
```

### The Grain Preservation Rule
* **Definition of Grain**: The real-world entity represented by exactly **one row** in a table.
* In `Submissions`, the grain is **1 row per submission attempt**.
* In `Challenges`, the grain is **1 row per coding problem**.
* In `Difficulty`, the grain is **1 row per difficulty tier**.
* In `Hackers`, the grain is **1 row per user profile**.

When traversing from a detail table (`Submissions`) to dimension tables (`Challenges` ➡️ `Difficulty` ➡️ `Hackers`), the relationships are $N:1$. This guarantees that **the row count of the base table does not artificially multiply**.

### The 1-to-Many Cartesian Explosion Trap
If you ever join two separate 1-to-Many child tables to a common parent in a single query:
```sql
-- ❌ CATASTROPHIC FAN-OUT BUG
SELECT h.hacker_id, COUNT(s.submission_id), COUNT(b.badge_id)
FROM Hackers h
JOIN Submissions s ON h.hacker_id = s.hacker_id  -- 1 Hacker has 50 Submissions
JOIN Badges b      ON h.hacker_id = b.hacker_id; -- 1 Hacker has 10 Badges
-- RESULT: Produces 50 * 10 = 500 rows per hacker! Counts are inflated by 10x and 50x!
```
* **The Senior Analyst Fix**: Always pre-aggregate child tables in separate Common Table Expressions (CTEs) before joining to enforce strict $1:1$ joins!

---

## 3. Correlated Subqueries inside Joins

An **Independent Subquery** executes once, materializes its result in RAM, and passes the scalar or hash set to the outer query.

A **Correlated Subquery** references columns from the outer query table, forcing the database engine to re-execute the subquery for **every single outer row streamed from disk**:

```sql
SELECT w.id, wp.age, w.coins_needed, w.power
FROM Wands w
JOIN Wands_Property wp ON w.code = wp.code
WHERE wp.is_evil = 0
  AND w.coins_needed = (
      -- CORRELATED: Binds dynamically to outer w.power and outer wp.age!
      SELECT MIN(w2.coins_needed)
      FROM Wands w2
      JOIN Wands_Property wp2 ON w2.code = wp2.code
      WHERE wp2.is_evil = 0
        AND w2.power = w.power
        AND wp2.age = wp.age
  )
ORDER BY w.power DESC, wp.age DESC;
```

### Physical Execution Flow:
1. Outer query reads Wand #1: `(power = 10, age = 45, coins = 1500)`.
2. Engine pauses outer scan, injects `power = 10` and `age = 45` into the inner query.
3. Inner query scans `Wands` and finds `MIN(coins_needed) = 1200`.
4. Outer row comparison: `1500 = 1200` $\rightarrow$ `FALSE`. Wand #1 is discarded.
5. Outer query proceeds to Wand #2.

> **Performance Rule**: An unindexed correlated subquery on $N$ rows runs in $O(N \times M)$ quadratic time. Always create a **composite index on the correlated filter keys** (e.g. `CREATE INDEX idx_wands ON Wands(power, code, coins_needed)`).

---

## 4. Directional Self-Joins & Symmetric Deduplication

When a table is joined with itself to find mirrored or paired records (e.g. coordinate pairs $(X_1 = Y_2 \land Y_1 = X_2)$):

```sql
-- ❌ NAIVE SELF-JOIN: Returns mirrored duplicates!
SELECT f1.x, f1.y, f2.x, f2.y
FROM Functions f1
JOIN Functions f2 ON f1.x = f2.y AND f1.y = f2.x;
-- OUTPUT CONTAINS: (2, 20) AND (20, 2) -- Duplicate analytical clutter!
```

### The Directional Inequality Fence:
To prevent mirror duplicates, always enforce a directional order on the primary keys or coordinate axes:
```sql
-- ✅ CLEAN DEDUPLICATION
SELECT f1.x, f1.y
FROM Functions f1
JOIN Functions f2 ON f1.x = f2.y AND f1.y = f2.x
WHERE f1.x < f1.y  -- Retains (2, 20), discards (20, 2)!
UNION
-- Handle identical coordinate ties (e.g. 20, 20)
SELECT x, y
FROM Functions
WHERE x = y
GROUP BY x, y
HAVING COUNT(*) > 1
ORDER BY x;
```

---

## 5. Master Mental Model Summary Table

| Pattern | SQL Mechanism | When to Use | Execution Cost |
|:---|:---|:---|:---|
| **Non-Equi Join** | `ON val BETWEEN min AND max` | Continuous to discrete bracket mapping | Index Range Scan / Nested Loop |
| **Relational Chain** | `FROM A JOIN B ON ... JOIN C ON ...` | Multi-hop foreign key traversal | Nested Loop / Hash Join chain |
| **Pre-Aggregation** | `WITH child AS (SELECT id, SUM(...) GROUP BY id)` | Preventing $1:M$ join fan-outs | Temporary Hash Table materialization |
| **Correlated Subquery**| `WHERE val = (SELECT MIN(...) WHERE sub.col = outer.col)` | Dynamic peer-group / category minimums | $O(N \times M)$ without composite indexes |
| **Directional Self-Join**| `FROM T a JOIN T b ON ... WHERE a.id < b.id` | Eliminating duplicate mirrored pairs | Nested Loop with index filter |
