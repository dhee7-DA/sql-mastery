-- ==============================================================================
-- DAY 07: SUBQUERIES, CORRELATED SUBQUERIES & RECURSIVE CTES
-- Dialect: ANSI SQL / MySQL 8.0+ / PostgreSQL Compatible
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- SCHEMA SETUP & SAMPLE DATA
-- ------------------------------------------------------------------------------

DROP TABLE IF EXISTS employee_hierarchy;
DROP TABLE IF EXISTS branch_transactions;
DROP TABLE IF EXISTS product_purchases;
DROP TABLE IF EXISTS dept_employees;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE dept_employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50) NOT NULL,
    dept_id INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE product_purchases (
    purchase_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    category_id INT, -- Note: can contain NULLs for legacy/uncategorized promos!
    amount DECIMAL(10, 2) NOT NULL,
    purchased_at DATE NOT NULL
);

CREATE TABLE branch_transactions (
    txn_id INT PRIMARY KEY,
    branch_id INT NOT NULL,
    region VARCHAR(30) NOT NULL,
    revenue DECIMAL(12, 2) NOT NULL
);

CREATE TABLE employee_hierarchy (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee_hierarchy(emp_id)
);

-- Seed Departments & Employees
INSERT INTO departments (dept_id, dept_name) VALUES
(10, 'Engineering'),
(20, 'Quant Trading'),
(30, 'Sales');

INSERT INTO dept_employees (emp_id, emp_name, dept_id, salary) VALUES
(101, 'Alex Rivera', 10, 140000.00),
(102, 'Beatriz Chen', 10, 165000.00),
(103, 'Carlos Silva', 10, 120000.00),
(104, 'Diana Vance', 10, 190000.00),
(201, 'Elena Rostova', 20, 250000.00),
(202, 'Farhan Malik', 20, 210000.00),
(203, 'Grace Hopper', 20, 310000.00),
(301, 'Harry Osborn', 30, 95000.00),
(302, 'Ingrid Bergman', 30, 115000.00);

-- Seed Purchases (Includes a NULL category_id to demonstrate the 3VL NOT IN trap!)
INSERT INTO product_purchases (purchase_id, customer_id, category_id, amount, purchased_at) VALUES
(1, 1001, 1, 450.00, '2026-01-10'),
(2, 1001, 2, 120.00, '2026-01-15'),
(3, 1002, 1, 890.00, '2026-01-12'), -- Customer 1002 bought Cat 1 but NEVER Cat 2
(4, 1003, 1, 300.00, '2026-01-14'),
(5, 1003, 2, 600.00, '2026-01-18'),
(6, 1004, 1, 750.00, '2026-01-20'), -- Customer 1004 bought Cat 1 but NEVER Cat 2
(7, 1005, NULL, 50.00, '2026-01-22'); -- Uncategorized promo purchase with NULL category_id

-- Seed Branch Transactions
INSERT INTO branch_transactions (txn_id, branch_id, region, revenue) VALUES
(1, 1, 'North America', 1200000.00),
(2, 2, 'North America', 850000.00),
(3, 3, 'North America', 1450000.00),
(4, 4, 'Europe', 950000.00),
(5, 5, 'Europe', 1100000.00),
(6, 6, 'Asia Pacific', 1750000.00),
(7, 7, 'Asia Pacific', 1300000.00);

-- Seed Org Hierarchy
INSERT INTO employee_hierarchy (emp_id, emp_name, title, manager_id) VALUES
(1, 'Satya Nadella', 'Chief Executive Officer', NULL),
(2, 'Amy Hood', 'Chief Financial Officer', 1),
(3, 'Scott Guthrie', 'EVP Cloud & AI', 1),
(4, 'Phil Spencer', 'CEO Gaming', 1),
(5, 'Kevin Scott', 'Chief Technology Officer', 3),
(6, 'Julia Liuson', 'President Developer Division', 3),
(7, 'Sarah Bond', 'President Xbox', 4),
(8, 'Mark Russinovich', 'CTO Azure', 5);


-- ==============================================================================
-- CHALLENGE 1: ABOVE DEPARTMENT AVERAGE EARNERS
-- Task: Find all employees who earn strictly more than their department's average salary.
-- Demonstrates: Correlated Subquery with outer row-bound parameter binding.
-- ==============================================================================

-- Approach A: Canonical Correlated Subquery in WHERE
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
    WHERE e2.dept_id = e.dept_id -- Outer correlation binding
)
ORDER BY e.dept_id ASC, e.salary DESC;

-- Approach B: High-Throughput Modern CTE Join (Decorrelated Engine Pattern)
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


-- ==============================================================================
-- CHALLENGE 2: ACTIVE BUYERS WITH ZERO CATEGORY CHURN (NULL-SAFE ANTI-SEMI JOIN)
-- Task: Find all customers who bought from Category 1 but NEVER bought from Category 2.
-- Demonstrates: NOT EXISTS immunity to 3VL NULL traps vs. NOT IN catastrophe.
-- ==============================================================================

-- THE CORRECT, PRODUCTION-GRADE QUERY (Immune to NULLs)
SELECT DISTINCT p1.customer_id
FROM product_purchases AS p1
WHERE p1.category_id = 1
  AND NOT EXISTS (
      -- Short-circuits immediately upon encountering ANY record with category_id = 2
      SELECT 1
      FROM product_purchases AS p2
      WHERE p2.customer_id = p1.customer_id
        AND p2.category_id = 2
  )
ORDER BY p1.customer_id ASC;

-- PROOF OF THE 3VL "NOT IN (NULL)" CATASTROPHE:
-- If we accidentally wrote:
-- SELECT DISTINCT customer_id FROM product_purchases WHERE category_id = 1
-- AND customer_id NOT IN (
--     SELECT customer_id FROM product_purchases WHERE category_id = 2 OR category_id IS NULL
-- );
-- The presence of a single NULL causes the entire predicate to evaluate to UNKNOWN, returning 0 rows!


-- ==============================================================================
-- CHALLENGE 3: TOP-N EARNERS PER DEPARTMENT WITHOUT WINDOW FUNCTIONS
-- Task: Retrieve the top 2 highest-earning employees in each department WITHOUT using
--       ROW_NUMBER(), RANK(), DENSE_RANK(), or LIMIT.
-- Demonstrates: The Correlated Count Greater-Than Idiom (Classic FAANG Question).
-- ==============================================================================

SELECT 
    e1.dept_id,
    e1.emp_name,
    e1.salary
FROM dept_employees AS e1
WHERE (
    -- Count how many colleagues in the same department earn strictly MORE than e1
    SELECT COUNT(DISTINCT e2.salary)
    FROM dept_employees AS e2
    WHERE e2.dept_id = e1.dept_id
      AND e2.salary > e1.salary
) < 2 -- If fewer than 2 employees earn more, e1 is in the Top 2!
ORDER BY e1.dept_id ASC, e1.salary DESC;


-- ==============================================================================
-- CHALLENGE 4: MULTI-TIER REGIONAL REVENUE VARIANCE
-- Task: Calculate each branch's revenue, its region's total revenue, its region's
--       average branch revenue, and the variance (dollar difference and percentage)
--       from that regional benchmark using clean, modular CTEs.
-- Demonstrates: Linear Dataflow Pipeline Architecture with Multiple CTEs.
-- ==============================================================================

WITH regional_aggregates AS (
    -- Tier 1: Calculate Regional Benchmarks
    SELECT 
        region,
        SUM(revenue) AS regional_total_revenue,
        AVG(revenue) AS regional_avg_revenue
    FROM branch_transactions
    GROUP BY region
),
branch_variance_metrics AS (
    -- Tier 2: Enrich Branch Transactions with Regional Benchmarks
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
-- Tier 3: Final Projection with Enterprise Sorting
SELECT 
    branch_id,
    region,
    branch_revenue,
    regional_avg_revenue,
    variance_from_avg,
    pct_variance_from_avg
FROM branch_variance_metrics
ORDER BY region ASC, branch_revenue DESC;


-- ==============================================================================
-- CHALLENGE 5: ORGANIZATIONAL HIERARCHY DEPTH & ANCESTRY PATH (RECURSIVE CTE)
-- Task: Traverse the Microsoft corporate leadership tree starting from the CEO (manager_id IS NULL).
--       Calculate:
--       1. Hierarchy Depth Level (CEO = 1, EVPs = 2, Directors = 3, etc.)
--       2. Full Breadcrumb Management Chain Path ("Satya Nadella -> Scott Guthrie -> Kevin Scott")
-- Demonstrates: Iterative Breadth-First-Search (BFS) Working Table Recursion.
-- ==============================================================================

WITH RECURSIVE org_tree AS (
    -- 1. ANCHOR MEMBER: Identify the root executive (CEO)
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

    -- 2. RECURSIVE MEMBER: Join employee records against the prior generation in org_tree
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
-- 3. CALLING QUERY
SELECT 
    hierarchy_level,
    emp_name,
    title,
    management_path
FROM org_tree
ORDER BY hierarchy_level ASC, emp_id ASC;
