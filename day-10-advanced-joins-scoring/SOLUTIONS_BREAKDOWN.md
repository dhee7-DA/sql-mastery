# 🔍 Day 10: Solutions Breakdown & Engineering Analysis

---

## 1. Contest Leaderboard (Medium)

### Query Deconstruction
```sql
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

### Line-by-Line Architectural Audit
1. `SELECT hacker_id, challenge_id, MAX(score) AS max_score FROM Submissions GROUP BY hacker_id, challenge_id`:
   - **Grain Transformation**: Converts raw submissions (where a single hacker might submit 10 times to challenge #1) into a single maximum score record per `(hacker_id, challenge_id)`.
2. `INNER JOIN (...) m ON h.hacker_id = m.hacker_id`:
   - Attaches the pre-aggregated challenge scores to the master `Hackers` table.
3. `GROUP BY h.hacker_id, h.name`:
   - Aggregates all challenge scores belonging to that hacker.
   - Under `ONLY_FULL_GROUP_BY`, `h.name` is allowed because `h.hacker_id` is the primary key of `Hackers`.
4. `HAVING total_score > 0`:
   - Excludes hackers who only achieved scores of 0 or had all 0 submissions.
   - **Crucial Edge Case Trap**: Do not write `WHERE score > 0` inside the subquery if a hacker's maximum score was 0. If you filter before calculating the max, that challenge is omitted, but their total score might still be 0 if all challenges are 0. `HAVING total_score > 0` directly satisfies the business contract: *"Exclude all hackers with a total score of 0"*.
5. `ORDER BY total_score DESC, h.hacker_id ASC`:
   - Secondary tie-breaker sorts hackers with equal total score by ascending ID.

---

## 2. Placements (Medium)

### Query Deconstruction
```sql
SELECT s.Name
FROM Students s
INNER JOIN Friends f   ON s.ID = f.ID
INNER JOIN Packages sp ON s.ID = sp.ID        -- 1st lookup: Student's salary
INNER JOIN Packages fp ON f.Friend_ID = fp.ID -- 2nd lookup: Best friend's salary
WHERE fp.Salary > sp.Salary                   -- Friend makes more than student
ORDER BY fp.Salary ASC;                       -- Ordered by FRIEND'S salary!
```

### Relational Entity Graph
```
Students (ID, Name)
   │
   ├── (s.ID = f.ID) ────────► Friends (ID, Friend_ID)
   │                                  │
   └── (s.ID = sp.ID)                 └── (f.Friend_ID = fp.ID)
            │                                     │
            ▼                                     ▼
     Packages (as sp)                      Packages (as fp)
     sp.Salary = Student Offer             fp.Salary = Friend Offer
```

### Pitfalls & Traps Conquered
- **The Ordering Trap**: The prompt explicitly specifies: *"Names must be ordered by the salary amount offered to the best friends."* Sorting by `s.Name` or `sp.Salary` fails all test cases. It **must** be `ORDER BY fp.Salary ASC`.
- **Double Join Clarity**: By aliasing `Packages` as `sp` (student package) and `fp` (friend package), column collisions are avoided and the query is self-documenting.

---

## 3. Symmetric Pairs (Medium)

### Query Deconstruction (Solution A: Bifurcated UNION)
```sql
-- Branch 1: Diagonal elements (X = Y)
SELECT X, Y
FROM Functions
WHERE X = Y
GROUP BY X, Y
HAVING COUNT(*) > 1

UNION

-- Branch 2: Off-diagonal elements (X < Y)
SELECT f1.X, f1.Y
FROM Functions f1
INNER JOIN Functions f2 
    ON f1.X = f2.Y 
   AND f1.Y = f2.X
WHERE f1.X < f1.Y

ORDER BY X ASC;
```

### Mathematical Logic Breakdown
1. **Branch 1 ($X = Y$)**:
   - If a row has $(10, 10)$, it cannot match itself to be a "pair". A pair requires at least two distinct rows with $(10, 10)$ in the table.
   - `GROUP BY X, Y HAVING COUNT(*) > 1` directly detects coordinates where 2 or more instances exist.
2. **Branch 2 ($X < Y$)**:
   - Looking for pairs where $(X_1, Y_1)$ has a matching $(Y_1, X_1)$.
   - `f1.X < f1.Y` accomplishes two essential goals:
     1. It guarantees $X_1 \le Y_1$ as demanded by the prompt.
     2. It prevents returning both $(2, 24)$ and $(24, 2)$, halving output rows to the canonical representative.
3. **`UNION` Operator**:
   - Using `UNION` instead of `UNION ALL` guarantees that identical pairs from Branch 2 (if multiple identical $(2, 24)$ rows existed) are collapsed to unique pairs.

### Query Deconstruction (Solution B: Synthetic Primary Key via `ROW_NUMBER()`)
```sql
WITH NumberedFunctions AS (
    SELECT 
        X, 
        Y, 
        ROW_NUMBER() OVER() AS row_id
    FROM Functions
)
SELECT DISTINCT f1.X, f1.Y
FROM NumberedFunctions f1
INNER JOIN NumberedFunctions f2 
    ON f1.X = f2.Y 
   AND f1.Y = f2.X 
   AND f1.row_id != f2.row_id -- Explicit row inequality
WHERE f1.X <= f1.Y
ORDER BY f1.X ASC;
```
- **Why this works**: `Functions` has no primary key (`X` and `Y` can repeat). Adding `ROW_NUMBER()` assigns each physical row a unique identifier `row_id`.
- Matching `f1.row_id != f2.row_id` prevents a single $(20, 20)$ row from pairing with itself, seamlessly uniting both diagonal and off-diagonal logic into a single join!
