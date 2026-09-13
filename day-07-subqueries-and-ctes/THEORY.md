# 🧠 Day 07 Theory: Subqueries, Correlated Execution, CTEs & Recursion

---

## 1. The Subquery Taxonomy & Physical Execution Mechanics

A **Subquery** (or inner query / nested query) is a `SELECT` statement embedded within another SQL statement. The SQL parser categorizes subqueries based on their **output dimensionality** and **binding scope**.

```text
                                SUBQUERIES
                                    │
         ┌──────────────────────────┴──────────────────────────┐
   By Dimensionality                                      By Scope
   ├── 1. Scalar (1 x 1)                                  ├── 1. Uncorrelated (Independent)
   ├── 2. Columnar (N x 1)                                └── 2. Correlated (Row-Bound to Outer)
   ├── 3. Row (1 x M)
   └── 4. Derived Table (N x M)
```

### 1.1 Scalar Subqueries ($1 \times 1$)
- Evaluates to a single atomic value (one row, one column).
- Permitted anywhere a scalar expression or column literal is valid: `SELECT` list, `WHERE` predicate, `HAVING` condition, or `CASE WHEN` branch.
- **Engine Invariant**: If a scalar subquery returns $> 1$ row at runtime, the execution engine halts with a fatal cardinality violation:
  ```text
  ERROR 1242 (21000): Subquery returns more than 1 row
  ```
- If the scalar subquery returns $0$ rows, it evaluates strictly to `NULL`.

### 1.2 Multi-Row Columnar Subqueries ($N \times 1$)
- Returns a single column containing $N$ rows.
- Cannot be evaluated with standard scalar comparison operators (`=`, `>`, `<`) directly unless qualified with set-membership quantifiers:
  - `col IN (subquery)`
  - `col > ALL (subquery)`: Must exceed the maximum value in the set.
  - `col > ANY (subquery)` or `col > SOME (subquery)`: Must exceed at least the minimum value in the set.

### 1.3 Derived Tables / Inline Views ($N \times M$)
- A subquery placed in the `FROM` or `JOIN` clause that produces a virtual relational dataset.
- **Syntactic Rule**: In ANSI SQL and MySQL, derived tables **must** be explicitly assigned a table alias:
  ```sql
  SELECT dt.dept_id, dt.avg_sal
  FROM (
      SELECT dept_id, AVG(salary) AS avg_sal
      FROM employees
      GROUP BY dept_id
  ) AS dt; -- Mandatory alias 'dt'
  ```

---

## 2. Uncorrelated vs. Correlated Subqueries

### 2.1 Uncorrelated Subqueries (Independent Execution)
An uncorrelated subquery contains **zero references** to columns from the outer query.
- **Execution Lifecycle**: Evaluated **exactly once** prior to the outer query execution.
- The database engine evaluates the subquery, stores its result in an in-memory hash table or temporary worktable, and substitutes the constant result set into the outer query's execution plan.
- Computational Complexity: $\mathcal{O}(M + N)$ where $M$ is inner table size and $N$ is outer table size.

### 2.2 Correlated Subqueries (Row-by-Row Binding)
A correlated subquery references one or more columns from the outer query table (the *correlation attribute*).

```sql
SELECT e1.emp_id, e1.dept_id, e1.salary
FROM employees AS e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees AS e2
    WHERE e2.dept_id = e1.dept_id -- Outer correlation binding!
);
```

#### Physical Execution Mechanics:
1. **Outer Row Fetch**: The engine fetches the first candidate row from `e1`.
2. **Parameter Binding**: The engine injects `e1.dept_id` into the inner query's `WHERE e2.dept_id = [e1.dept_id]`.
3. **Inner Evaluation**: The inner query executes and computes the average salary for that specific department.
4. **Predicate Comparison**: `e1.salary` is compared against the calculated average. If true, the row is emitted.
5. **Iteration**: Repeat steps 1–4 for every row in `e1`.

> ⚠️ **Performance Warning**: In naive engines without an optimizing cost-based rewriter, a correlated subquery on $N$ outer rows and $M$ inner rows exhibits quadratic time complexity: $\mathcal{O}(N \times M)$. Modern optimizers (PostgreSQL, MySQL 8.0+, Oracle) frequently unnest correlated subqueries into **Hash Semi-Joins** or **Decorrelated Aggregation Joins**.

---

## 3. The Infamous 3VL `NOT IN (NULL)` Disaster Trap

One of the most dangerous and frequently tested bugs in SQL engineering involves comparing values against a subquery containing `NULL` using `NOT IN`.

### 3.1 Three-Valued Logic (3VL) Foundation
In SQL, boolean logic evaluates to three distinct states: `TRUE`, `FALSE`, or `UNKNOWN`.
Any equality comparison involving `NULL` (`x = NULL` or `x != NULL`) yields `UNKNOWN`.

### 3.2 Mathematical Proof of the `NOT IN (NULL)` Breakdown
Consider evaluating:
```sql
val NOT IN (10, 20, NULL)
```
By relational definition, `val NOT IN (A, B, C)` expands to:
$$\text{val} \neq 10 \quad\text{AND}\quad \text{val} \neq 20 \quad\text{AND}\quad \text{val} \neq \text{NULL}$$

Let $\text{val} = 30$ (a value clearly not in 10 or 20):
1. $30 \neq 10 \implies \mathbf{TRUE}$
2. $30 \neq 20 \implies \mathbf{TRUE}$
3. $30 \neq \text{NULL} \implies \mathbf{UNKNOWN}$

Applying SQL boolean conjunction:
$$\mathbf{TRUE} \quad\text{AND}\quad \mathbf{TRUE} \quad\text{AND}\quad \mathbf{UNKNOWN} \implies \mathbf{UNKNOWN}$$

Since a `WHERE` clause **only passes rows where the predicate evaluates strictly to `TRUE`**, a row with result `UNKNOWN` is rejected!

> 🚨 **THE DISASTER RULE**: If the inner subquery of a `NOT IN` predicate returns even a **single NULL row**, the entire `NOT IN` expression evaluates to `UNKNOWN` for **every single outer row**. **The query will silently return ZERO rows!**

### 3.3 The Production Antidote: `NOT EXISTS`
`EXISTS` and `NOT EXISTS` test for the **presence or absence of qualifying tuples**, not value equality.
- `EXISTS` returns `TRUE` if the subquery returns $\ge 1$ row (even if that row consists entirely of `NULL`s).
- `EXISTS` returns `FALSE` if the subquery returns $0$ rows.
- `EXISTS` is immune to 3VL: it **never** evaluates to `UNKNOWN`. It is strictly binary: `TRUE` or `FALSE`.

```sql
-- DANGEROUS: Returns 0 rows if any inactive_user has a NULL user_id!
SELECT user_id FROM users
WHERE user_id NOT IN (SELECT user_id FROM inactive_users);

-- BULLETPROOF & FAST: Always handles NULLs safely
SELECT u.user_id FROM users AS u
WHERE NOT EXISTS (
    SELECT 1 FROM inactive_users AS iu
    WHERE iu.user_id = u.user_id
);
```

---

## 4. `EXISTS` vs. `IN`: Optimizer Mechanics

| Metric | `IN (subquery)` | `EXISTS (correlated subquery)` |
|:---|:---|:---|
| **Underlying Concept** | Value set membership | Tuple existence |
| **Short-Circuiting** | Evaluates the subquery result set | Halts scan immediately upon finding 1st match |
| **`NULL` Behavior** | `NOT IN` breaks on `NULL`s (3VL trap) | `NOT EXISTS` is 100% immune to `NULL`s |
| **Optimizer Rewrite** | Rewritten to Hash Semi-Join | Rewritten to Hash Semi-Join or Index Lookup |
| **Convention** | Best for small, static literal lists | Best for relational queries and outer-correlated checks |

---

## 5. Common Table Expressions (CTEs): Clean Dataflow Pipelines

Introduced in SQL:1999, a **Common Table Expression (CTE)** is a named temporary result set defined within the execution scope of a single `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement.

```sql
WITH regional_sales AS (
    SELECT region_id, SUM(amount) AS total_revenue
    FROM sales
    GROUP BY region_id
),
top_regions AS (
    SELECT region_id, total_revenue
    FROM regional_sales
    WHERE total_revenue > 1000000
)
SELECT * FROM top_regions;
```

### 5.1 CTE Architecture vs. Subquery Spaghetti
1. **Readability & Literate SQL**: Linear, top-to-bottom reading order matching human dataflow thinking, eliminating deeply nested subquery pyramids.
2. **Reusability**: A CTE defined once in the `WITH` clause can be referenced multiple times across downstream CTEs and the primary query.
3. **Engine Optimization Fences**:
   - In MySQL 8.0+ and Snowflake, non-recursive CTEs are treated as inline views and merged into the main query plan.
   - In PostgreSQL, CTEs can be explicitly directed using `MATERIALIZED` (computes and caches in temporary memory) or `NOT MATERIALIZED` (inlines directly into the caller).

---

## 6. Recursive CTEs (`WITH RECURSIVE`): Graph & Hierarchy Physics

A **Recursive CTE** is a specialized query structure capable of self-referential iteration. It is the only standard ANSI SQL mechanism capable of traversing graphs, trees, and variable-depth hierarchies without procedural loops or cursor scripts.

### 6.1 Syntactic Anatomy of a Recursive CTE

```sql
WITH RECURSIVE cte_name (col1, col2, ..., depth) AS (
    -- 1. ANCHOR MEMBER (Base Case)
    SELECT emp_id, emp_name, manager_id, 1 AS depth
    FROM employees
    WHERE manager_id IS NULL -- Root node (e.g., CEO)

    UNION ALL

    -- 2. RECURSIVE MEMBER (Inductive Step)
    SELECT e.emp_id, e.emp_name, e.manager_id, r.depth + 1
    FROM employees AS e
    INNER JOIN cte_name AS r ON e.manager_id = r.emp_id -- Self-reference!
)
-- 3. CALLING QUERY
SELECT * FROM cte_name;
```

### 6.2 The Iterative Working Table Engine Algorithm
Internally, the database engine does not use recursive call stacks (which would blow stack memory). Instead, it evaluates recursive CTEs using an **iterative queue-based Breadth-First Search (BFS)** loop:

```text
Step 1: Execute ANCHOR MEMBER.
        Load result into Working Table (WT) and Intermediate Result Table (RT).

Step 2: WHILE (WT is NOT empty):
            a. Execute RECURSIVE MEMBER substituting WT for the CTE self-reference.
            b. Load newly generated rows into New Working Table (NWT).
            c. Append NWT into Intermediate Result Table (RT).
            d. Replace WT with NWT (WT = NWT).
            e. Empty NWT.

Step 3: Return RT to the calling query.
```

### 6.3 Safety Rules for Recursive CTEs
1. **The Anchor Member must NOT reference the CTE name**.
2. **The Recursive Member must reference the CTE exactly once** (no self-joins of the CTE within itself).
3. **Forbidden in Recursive Member**: `GROUP BY`, `HAVING`, Window functions, `DISTINCT`, or `RIGHT OUTER JOIN` on the recursive reference.
4. **Infinite Loop Protection**: Graph cycles (e.g., A reports to B, B reports to A) cause unbounded recursion until the engine crashes or hits the safety threshold:
   - MySQL: `SET SESSION cte_max_recursion_depth = 1000;`
   - PostgreSQL: `CYCLE id SET is_cycle USING path;` (Postgres 14+)

---

## 7. Memory & Algorithmic Summary Table

| Technique | Time Complexity (Unindexed) | Time Complexity (Indexed) | Space Complexity | Best Used For |
|:---|:---:|:---:|:---:|:---|
| **Scalar Subquery** | $\mathcal{O}(N)$ | $\mathcal{O}(\log N)$ | $\mathcal{O}(1)$ | Single summary threshold comparison |
| **Correlated Subquery** | $\mathcal{O}(N \times M)$ | $\mathcal{O}(N \log M)$ | $\mathcal{O}(1)$ | Row-by-row contextual evaluation |
| **Correlated `EXISTS`** | $\mathcal{O}(N \times M)$ | $\mathcal{O}(N \log M)$ (Semi-Join) | $\mathcal{O}(1)$ | High-performance membership checks |
| **Modular CTE** | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | $\mathcal{O}(K)$ | Multi-step readable analytics pipelines |
| **Recursive CTE** | $\mathcal{O}(V + E)$ | $\mathcal{O}(V \log E)$ | $\mathcal{O}(V)$ (Queue size) | Trees, org charts, network graphs |
