# 🎯 Important Interview & Practice Questions: Subqueries & Modular CTEs

> **Tier-1 Tech & Quantitative Finance Interview Bank**  
> *Architectural breakdowns, edge-case analysis, and production considerations for modern database systems.*

---

### Question 1: The Three-Valued Logic Trap in `NOT IN` vs `NOT EXISTS`
**Prompt:**  
Given two tables `Orders` and `Customers`, why does `WHERE customer_id NOT IN (SELECT customer_id FROM Blacklist)` unexpectedly return zero rows when `Blacklist` contains a single `NULL` value? How does `NOT EXISTS` resolve this?

**Answer:**  
In SQL, Boolean expressions evaluate to `TRUE`, `FALSE`, or `UNKNOWN` (three-valued logic).  
When using `NOT IN (v1, v2, ..., NULL)`:
$$\text{id} \neq v_1 \text{ AND } \text{id} \neq v_2 \text{ AND } \dots \text{ AND } \text{id} \neq \text{NULL}$$
Since any comparison with `NULL` yields `UNKNOWN`, the chain of `AND` conditions evaluates to:
$$\text{TRUE AND TRUE AND } \dots \text{ AND UNKNOWN} \implies \text{UNKNOWN}$$
The `WHERE` clause filters out any row whose condition does not evaluate to `TRUE`. Therefore, **every single row is eliminated**, returning an empty set.

In contrast, `NOT EXISTS` checks for the existence of rows matching a predicate:
```sql
SELECT c.customer_id
FROM Customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM Blacklist b
  WHERE b.customer_id = c.customer_id
);
```
Here, if `b.customer_id` is `NULL`, `b.customer_id = c.customer_id` evaluates to `UNKNOWN`, meaning zero matching rows are returned. Thus, `NOT EXISTS` evaluates to `TRUE`, correctly preserving the customer row.

---

### Question 2: Correlated Subquery vs Window Function Performance
**Prompt:**  
A developer writes the following query to identify employees earning more than their department average:
```sql
SELECT e1.emp_id, e1.department, e1.salary
FROM Employees e1
WHERE e1.salary > (
  SELECT AVG(e2.salary)
  FROM Employees e2
  WHERE e2.department = e1.department
);
```
What is the time complexity of this query on an unindexed table of $N$ rows? How does rewriting it with a window function or CTE improve execution?

**Answer:**  
* **Correlated Subquery Complexity**: For every row in the outer table ($N$ rows), the inner subquery scans the entire table ($N$ rows) to compute the average. Without an index on `department`, the complexity is $\mathcal{O}(N^2)$.
* **Window Function Optimization**:
  ```sql
  WITH DeptAverages AS (
    SELECT emp_id, department, salary,
           AVG(salary) OVER (PARTITION BY department) AS avg_dept_salary
    FROM Employees
  )
  SELECT emp_id, department, salary
  FROM DeptAverages
  WHERE salary > avg_dept_salary;
  ```
  By sorting or hashing on `department` in a single pass, the window function executes in $\mathcal{O}(N \log N)$ or $\mathcal{O}(N)$, providing orders of magnitude speedups on enterprise datasets.

---

### Question 3: Recursive CTE Cycle Detection and Depth Guards
**Prompt:**  
In a multi-tenant application, how do you prevent `WITH RECURSIVE` from entering an infinite loop when circular management hierarchies exist (e.g., A reports to B, B reports to C, and C reports to A)?

**Answer:**  
In SQL engines supporting ANSI standard recursive syntax:
1. **Explicit Depth Guard**:
   ```sql
   WITH RECURSIVE OrgTree AS (
     SELECT emp_id, manager_id, 1 AS depth
     FROM Employees
     WHERE manager_id IS NULL
     UNION ALL
     SELECT e.emp_id, e.manager_id, o.depth + 1
     FROM Employees e
     INNER JOIN OrgTree o ON e.manager_id = o.emp_id
     WHERE o.depth < 25 -- Guard barrier
   )
   SELECT * FROM OrgTree;
   ```
2. **ANSI `CYCLE` Clause** (PostgreSQL 14+, Oracle):
   ```sql
   WITH RECURSIVE OrgTree AS (
     ...
   )
   CYCLE emp_id SET is_cycle USING path_trace
   SELECT * FROM OrgTree WHERE NOT is_cycle;
   ```

---

### Question 4: Pure ANSI Correlated Top-N Per Group
**Prompt:**  
Write a query to find the top 2 highest paid employees in each department using **only standard relational subqueries** (no window functions like `DENSE_RANK()`).

**Answer:**  
```sql
SELECT e1.emp_id, e1.department, e1.salary
FROM Employees e1
WHERE (
  SELECT COUNT(*)
  FROM Employees e2
  WHERE e2.department = e1.department
    AND e2.salary > e1.salary
) < 2
ORDER BY e1.department, e1.salary DESC;
```
**Mechanism:** An employee belongs to the top 2 if strictly fewer than 2 peers within the same department earn a higher salary.
