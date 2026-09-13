# 🔍 Day 07: Solutions Breakdown & Architectural Deconstructions

---

## Challenge 1: Employees Earning Above Department Average

### 1. Problem Statement
Identify all employees whose annual compensation strictly exceeds the arithmetic mean salary of their assigned department. Display the employee's ID, full name, department ID, individual salary, and the computed department average salary rounded to two decimal places.

### 2. What Are They Testing?
- **Outer Row-Binding Mechanics**: Testing your understanding of how the database engine binds outer query column values (`e.dept_id`) into the subquery's scope for every candidate row.
- **Decorrelation & Optimization Fences**: Discerning when to use a correlated subquery vs. refactoring into a pre-aggregated CTE join to prevent quadratic $\mathcal{O}(N \times M)$ scan degradation.

### 3. Production SQL Solutions

#### Pattern A: Canonical Correlated Subquery
```sql
SELECT 
    e.emp_id,
    e.emp_name,
    e.dept_id,
    e.salary,
    ROUND((
        SELECT AVG(e_inner.salary)
        FROM dept_employees AS e_inner
        WHERE e_inner.dept_id = e.dept_id
    ), 2) AS dept_avg_salary
FROM dept_employees AS e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM dept_employees AS e2
    WHERE e2.dept_id = e.dept_id
)
ORDER BY e.dept_id ASC, e.salary DESC;
```

#### Pattern B: High-Throughput Pre-Aggregated CTE Join (Recommended for Large Tables)
```sql
WITH dept_averages AS (
    SELECT 
        dept_id,
        AVG(salary) AS avg_sal
    FROM dept_employees
    GROUP BY dept_id
)
SELECT 
    e.emp_id,
    e.emp_name,
    e.dept_id,
    e.salary,
    ROUND(da.avg_sal, 2) AS dept_avg_salary
FROM dept_employees AS e
INNER JOIN dept_averages AS da ON e.dept_id = da.dept_id
WHERE e.salary > da.avg_sal
ORDER BY e.dept_id ASC, e.salary DESC;
```

### 4. Deep Technical Breakdown
- **Correlated Subquery Plan**: The optimizer fetches candidate row $e_1$. It reads $e_1.\text{dept\_id} = 10$. It executes the inner query filtering on `dept_id = 10` and computes $\text{AVG}(140000, 165000, 120000, 190000) = 153750$. It then evaluates $140000 > 153750$ (False).
- **Decorrelated Hash Join Plan**: The CTE computes department averages in a single sequential pass over the table ($\mathcal{O}(N)$), hashing the result into memory by `dept_id` ($\mathcal{O}(D)$ where $D$ is the number of distinct departments). The outer query then performs a hash probe $\mathcal{O}(1)$ for each employee row.
- **Complexity**:
  - Pattern A (Naive): $\mathcal{O}(N^2)$ without index, $\mathcal{O}(N \log N)$ with index on `dept_id`.
  - Pattern B (CTE Join): $\mathcal{O}(N)$ time, $\mathcal{O}(D)$ temporary hash space.

---

## Challenge 2: Active Buyers with Zero Category Churn (Anti-Semi Join & 3VL)

### 1. Problem Statement
Find all distinct customer IDs who have completed at least one purchase in **Category 1**, but have **never** completed a purchase in **Category 2**. The dataset contains records with `category_id = NULL` due to legacy promotion imports.

### 2. What Are They Testing?
- **3-Valued Logic (3VL) Resilience**: The classic senior SQL interview trap. If an applicant uses `NOT IN (SELECT category_id FROM ...)` and the inner query returns even one `NULL`, the entire query collapses and returns 0 rows.
- **Short-Circuiting Tuple Checks**: Demonstrating how `NOT EXISTS` halts inner table scanning the microsecond a qualifying match is located.

### 3. Production SQL Solution
```sql
SELECT DISTINCT p1.customer_id
FROM product_purchases AS p1
WHERE p1.category_id = 1
  AND NOT EXISTS (
      SELECT 1
      FROM product_purchases AS p2
      WHERE p2.customer_id = p1.customer_id
        AND p2.category_id = 2
  )
ORDER BY p1.customer_id ASC;
```

### 4. Deep Technical Breakdown
1. `p1.category_id = 1`: Scans candidate purchases where Category is 1.
2. For candidate customer 1001: Inner query searches for customer 1001 with `category_id = 2`. It finds row 2! `EXISTS` evaluates to `TRUE`. `NOT EXISTS` flips it to `FALSE`. Customer 1001 is immediately excluded.
3. For candidate customer 1002: Inner query searches for customer 1002 with `category_id = 2`. Zero rows found! `EXISTS` evaluates to `FALSE`. `NOT EXISTS` evaluates to `TRUE`. Customer 1002 is retained.
4. **Why `SELECT 1`?**: In an `EXISTS` clause, the projection list (`SELECT 1`, `SELECT *`, `SELECT NULL`) is mathematically irrelevant; the engine only inspects row cardinality, not column values. `SELECT 1` is standard engineering convention to signal that no data pages are being extracted.

---

## Challenge 3: Top-N Earners Per Department Without Window Functions

### 1. Problem Statement
Retrieve the top 2 highest-earning employees within each department. **Constraint**: You may NOT use analytical window functions (`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`) or `LIMIT`.

### 2. What Are They Testing?
- **Set-Theoretic Relational Thinking**: Can you express a ranking condition purely as a cardinality comparison between two instances of the same relation?
- **The Greater-Than Count Idiom**: By definition, an employee is in the Top $N$ if the count of distinct colleagues in their department earning strictly *more* than them is strictly less than $N$.

### 3. Production SQL Solution
```sql
SELECT 
    e1.dept_id,
    e1.emp_name,
    e1.salary
FROM dept_employees AS e1
WHERE (
    SELECT COUNT(DISTINCT e2.salary)
    FROM dept_employees AS e2
    WHERE e2.dept_id = e1.dept_id
      AND e2.salary > e1.salary
) < 2
ORDER BY e1.dept_id ASC, e1.salary DESC;
```

### 4. Deep Technical Breakdown
Let department 10 have salaries: `[190K (Diana), 165K (Beatriz), 140K (Alex), 120K (Carlos)]`:
- For **Diana (190K)**: How many earn $> 190\text{K}$ in dept 10? Exactly $0$. Is $0 < 2$? **Yes $\implies$ Emitted (Rank 1)**.
- For **Beatriz (165K)**: How many earn $> 165\text{K}$? Exactly $1$ (Diana). Is $1 < 2$? **Yes $\implies$ Emitted (Rank 2)**.
- For **Alex (140K)**: How many earn $> 140\text{K}$? Exactly $2$ (Diana, Beatriz). Is $2 < 2$? **No $\implies$ Filtered out**.
- For **Carlos (120K)**: How many earn $> 120\text{K}$? Exactly $3$. Filtered out.
- **Handling Ties**: Using `COUNT(DISTINCT e2.salary)` ensures that if two people tie for 1st place, they both have 0 people earning more than them, preserving **DENSE_RANK** behavior!

---

## Challenge 4: Multi-Tier Regional Revenue Variance via Modular CTEs

### 1. Problem Statement
For a financial ledger of corporate branches, compute each branch's revenue, the regional aggregate revenue, the regional average branch revenue, the dollar variance from the regional average, and the percentage variance from that average.

### 2. What Are They Testing?
- **Clean Architecture & Dataflow Modeling**: Breaking a complex analytical calculation into discrete, testable CTE layers rather than a chaotic web of inline subqueries.
- **Division-by-Zero & Precision Math**: Ensuring that percentage variance calculations avoid integer truncation and handle decimal scaling cleanly.

### 3. Production SQL Solution
```sql
WITH regional_aggregates AS (
    -- Tier 1: Domain Rollup Benchmarks
    SELECT 
        region,
        SUM(revenue) AS regional_total_revenue,
        AVG(revenue) AS regional_avg_revenue
    FROM branch_transactions
    GROUP BY region
),
branch_variance_metrics AS (
    -- Tier 2: Granular Enrichments
    SELECT 
        b.branch_id,
        b.region,
        b.revenue AS branch_revenue,
        ra.regional_total_revenue,
        ROUND(ra.regional_avg_revenue, 2) AS regional_avg_revenue,
        ROUND(b.revenue - ra.regional_avg_revenue, 2) AS variance_from_avg,
        ROUND(((b.revenue - ra.regional_avg_revenue) / ra.regional_avg_revenue) * 100.0, 2) AS pct_variance_from_avg
    FROM branch_transactions AS b
    INNER JOIN regional_aggregates AS ra ON b.region = ra.region
)
-- Tier 3: Consumption Layer
SELECT 
    branch_id,
    region,
    branch_revenue,
    regional_avg_revenue,
    variance_from_avg,
    pct_variance_from_avg
FROM branch_variance_metrics
ORDER BY region ASC, branch_revenue DESC;
```

---

## Challenge 5: Organizational Hierarchy Depth & Path (Recursive CTE)

### 1. Problem Statement
Traverse a corporate management reporting tree where each employee has a `manager_id` referencing another employee's `emp_id`. The top-level executive (CEO) has `manager_id IS NULL`. Compute:
1. **Hierarchy Depth Level** (CEO = 1, their direct reports = 2, etc.)
2. **Management Breadcrumb Path** (e.g., `'Satya Nadella -> Scott Guthrie -> Kevin Scott'`).

### 2. What Are They Testing?
- **`WITH RECURSIVE` Syntax & Mechanics**: Demonstrating proper separation of the non-recursive **Anchor Member** and the inductive **Recursive Member** combined with `UNION ALL`.
- **String Accumulation in Recursion**: Handling type widening in the anchor (e.g., `CAST(emp_name AS CHAR(255))`) so the recursive member does not throw a column width overflow error.

### 3. Production SQL Solution
```sql
WITH RECURSIVE org_tree AS (
    -- 1. ANCHOR MEMBER: Find root node (CEO)
    SELECT 
        emp_id,
        emp_name,
        title,
        manager_id,
        1 AS hierarchy_level,
        CAST(emp_name AS CHAR(255)) AS management_path
    FROM employee_hierarchy
    WHERE manager_id IS NULL

    UNION ALL

    -- 2. RECURSIVE MEMBER: Join child rows to prior level in org_tree
    SELECT 
        e.emp_id,
        e.emp_name,
        e.title,
        e.manager_id,
        ot.hierarchy_level + 1 AS hierarchy_level,
        CONCAT(ot.management_path, ' -> ', e.emp_name) AS management_path
    FROM employee_hierarchy AS e
    INNER JOIN org_tree AS ot ON e.manager_id = ot.emp_id
)
SELECT 
    hierarchy_level,
    emp_name,
    title,
    management_path
FROM org_tree
ORDER BY hierarchy_level ASC, emp_id ASC;
```

### 4. Deep Technical Breakdown
- **Iteration 0 (Anchor)**:
  - Finds `manager_id IS NULL`: `(1, Satya Nadella, CEO, NULL, 1, 'Satya Nadella')`.
  - Queue: `[Satya (ID 1)]`.
- **Iteration 1**:
  - Queries `employee_hierarchy` joining `manager_id = 1`.
  - Finds: Amy Hood (ID 2), Scott Guthrie (ID 3), Phil Spencer (ID 4).
  - Level becomes $1 + 1 = 2$.
  - Paths become: `'Satya Nadella -> Amy Hood'`, etc.
  - Queue becomes: `[Amy (2), Scott (3), Phil (4)]`.
- **Iteration 2**:
  - Queries children of Amy, Scott, Phil. Finds Kevin Scott (5), Julia Liuson (6), Sarah Bond (7).
  - Level becomes $2 + 1 = 3$.
  - Queue becomes: `[Kevin (5), Julia (6), Sarah (7)]`.
- **Iteration 3**:
  - Queries children of Kevin, Julia, Sarah. Finds Mark Russinovich (8).
  - Level becomes $3 + 1 = 4$.
- **Iteration 4**:
  - Queries children of Mark Russinovich. Returns 0 rows.
  - Queue is empty $\implies$ Engine halts and emits full unioned result table!
