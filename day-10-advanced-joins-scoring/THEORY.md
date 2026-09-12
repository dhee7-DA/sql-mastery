# 🧠 Day 10: Theory — Advanced Relational Joins, Pre-Aggregation & Coordinate Symmetry

---

## 1. The Pre-Aggregation Rule (The "Nested Aggregate" Fallacy)

### The Problem: Why `SUM(MAX(score))` is Syntax Error in SQL
In relational algebra and standard SQL, aggregate functions cannot be directly nested:
```sql
-- ❌ SYNTAX ERROR in ANSI SQL / MySQL:
SELECT hacker_id, SUM(MAX(score)) 
FROM Submissions 
GROUP BY hacker_id;
```
Aggregate functions operate across sets of rows produced by a `FROM` or `GROUP BY` clause. They cannot operate simultaneously at two distinct grains (the challenge grain and the hacker grain) in a single clause.

### The Business Reality: Multiple Submissions Per Challenge
In competitive coding platforms (HackerRank, LeetCode, Codeforces):
- A hacker may submit **5 different solutions** to Challenge `101` with scores: `[0, 20, 50, 40, 50]`.
- Their recognized score for Challenge `101` is strictly $\max(0, 20, 50, 40, 50) = 50$.
- If you join `Hackers` directly to `Submissions` and calculate `SUM(score)`, you calculate $0 + 20 + 50 + 40 + 50 = 160$, inflating their score by over **300%**!

### The Two-Phase Pipeline Solution
```
[Raw Submissions Table] (Grain: submission_id)
        │
        ▼ (Phase 1: Pre-aggregation via Derived Table / CTE)
[Max Scores Per Challenge] (Grain: hacker_id + challenge_id)
        │
        ▼ (Phase 2: Join to Hackers & Sum Across Challenges)
[Leaderboard] (Grain: hacker_id)
```

```sql
-- Phase 1: Derived Table (In-line View)
SELECT 
    h.hacker_id, 
    h.name, 
    SUM(m.max_score) AS total_score
FROM Hackers h
INNER JOIN (
    SELECT hacker_id, challenge_id, MAX(score) AS max_score
    FROM Submissions
    GROUP BY hacker_id, challenge_id
) m ON h.hacker_id = m.hacker_id
GROUP BY h.hacker_id, h.name
HAVING total_score > 0
ORDER BY total_score DESC, h.hacker_id ASC;
```

---

## 2. Multi-Instance Table Aliasing (Double Joins on the Same Relation)

### The Concept: When One Dimension Needs Dual Perspectives
In data modeling, a lookup table often contains values that apply to multiple related entities simultaneously. In HackerRank's **Placements**:
- `Packages` contains `(ID, Salary)`.
- A student has an `ID` and an assigned package.
- That same student's best friend has a `Friend_ID` and also has an assigned package in that **same** `Packages` table.

To compare them side-by-side on a single row, we must join `Packages` **twice**, aliasing each instance with a distinct semantic role:

```
[Students s] ──── INNER JOIN ──── [Friends f]
     │                                 │
(s.ID = sp.ID)                 (f.Friend_ID = fp.ID)
     ▼                                 ▼
[Packages sp]                    [Packages fp]
(Student's Package)             (Friend's Package)
```

### Relational Comparison Mechanics
```sql
SELECT s.Name
FROM Students s
INNER JOIN Friends f   ON s.ID = f.ID
INNER JOIN Packages sp ON s.ID = sp.ID        -- Instance 1: Student's salary
INNER JOIN Packages fp ON f.Friend_ID = fp.ID -- Instance 2: Friend's salary
WHERE fp.Salary > sp.Salary                   -- Cross-instance relational comparison
ORDER BY fp.Salary ASC;
```

### Key Engineering Guardrails
1. **Never alias ambiguously**: Always use meaningful aliases (`sp` = student package, `fp` = friend package).
2. **Cardinality Verification**: Since `ID` is a Primary Key in `Packages`, both joins are guaranteed $1:1$ lookups. No row duplication (Cartesian fan-out) can occur.

---

## 3. Coordinate Symmetry & Directed Self-Joins (Symmetric Pairs)

### Relational Definition of Symmetric Pairs
A pair $(X_1, Y_1)$ and $(X_2, Y_2)$ in relation `Functions` is symmetric if:
$$X_1 = Y_2 \quad \text{AND} \quad Y_1 = X_2$$

The prompt requires outputting all pairs such that $X \le Y$, ordered by $X$ ascending.

### The Critical Symmetry Trap: Identical Points ($X = Y$)
Consider a row with coordinates $(20, 20)$:
- If you perform a self-join `ON f1.X = f2.Y AND f1.Y = f2.X`:
  - Every row with $(20, 20)$ matches **itself**!
  - If the table contains only a **single** row of $(20, 20)$, that row is **NOT** a pair! A pair requires two distinct instances in the dataset.
  - If the table contains **two or more** rows of $(20, 20)$, then $(20, 20)$ is indeed a valid symmetric pair.

### Topology Bifurcation (Two Disjoint Sub-Problems)

#### Sub-Problem A: Distinct Coordinates ($X < Y$)
For any pair where $X < Y$ (e.g. $(2, 24)$ and $(24, 2)$):
- We seek an instance $f_1$ and another instance $f_2$ such that:
  $$f_1.X = f_2.Y \quad \text{AND} \quad f_1.Y = f_2.X \quad \text{AND} \quad f_1.X < f_1.Y$$
- Because $f_1.X < f_1.Y$, a row cannot match itself. It can only match a distinct mirror row.

#### Sub-Problem B: Identical Coordinates ($X = Y$)
For points on the diagonal line $Y = X$ (e.g. $(20, 20)$):
- We do not need a self-join. We simply group by $(X, Y)$ and check the frequency of occurrence:
  $$\text{COUNT}(*) > 1$$

### Synthesis via `UNION`
Because `UNION` automatically discards duplicates between and within queries, combining Sub-Problem A and Sub-Problem B produces a mathematically rigorous, duplicate-free result:

```sql
-- Case 1: Identical coordinates appearing 2+ times
SELECT X, Y
FROM Functions
WHERE X = Y
GROUP BY X, Y
HAVING COUNT(*) > 1

UNION

-- Case 2: Distinct coordinates with confirmed mirror match
SELECT f1.X, f1.Y
FROM Functions f1
INNER JOIN Functions f2 
    ON f1.X = f2.Y 
   AND f1.Y = f2.X
WHERE f1.X < f1.Y

ORDER BY X ASC;
```

---

## 4. Execution Plan & Indexing Analysis

| Problem | Potential Bottleneck | Recommended Production Index | Engine Behavior |
|---|---|---|---|
| **Contest Leaderboard** | Aggregating raw `Submissions` | `(hacker_id, challenge_id, score)` | Composite B-Tree index allows an **Index-Only Loose Scan** for `MAX(score)`. |
| **Placements** | Double lookup into `Packages` | `(ID)` (Primary Key) | Clustered index lookup ($O(1)$ per row); near-instant execution. |
| **Symmetric Pairs** | Quadratic cross-matching $O(N^2)$ | `(X, Y)` and `(Y, X)` | Converts full Cartesian self-scan into an **Index Nested Loop Equi-Join**. |
