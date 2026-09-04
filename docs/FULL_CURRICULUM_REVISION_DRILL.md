# 🏋️ SQL Mastery: Full Curriculum Rapid-Fire Revision Drill

> **Instructions**: Work through each topic in order. Each section contains 4 distinct challenge formats:
> 1. **Multiple Choice Question (MCQ)**
> 2. **Fill-in-the-Blank Syntax Snippet**
> 3. **Spot the Bug / Anti-Pattern**
> 4. **Predict the Output**
>
> *(Answer keys & comprehensive rationales are included at the very bottom!)*

---

## ⚡ Topic 01: Physical Query Execution Order

### Q1.1 [MCQ]
In what exact order does a relational database storage engine physically execute the clauses in this query?
```sql
SELECT department, COUNT(*) AS team_size
FROM Employees
WHERE salary > 60000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY team_size DESC
LIMIT 5;
```
- **A)** `SELECT` $\rightarrow$ `FROM` $\rightarrow$ `WHERE` $\rightarrow$ `GROUP BY` $\rightarrow$ `HAVING` $\rightarrow$ `ORDER BY` $\rightarrow$ `LIMIT`
- **B)** `FROM` $\rightarrow$ `WHERE` $\rightarrow$ `GROUP BY` $\rightarrow$ `HAVING` $\rightarrow$ `SELECT` $\rightarrow$ `ORDER BY` $\rightarrow$ `LIMIT`
- **C)** `FROM` $\rightarrow$ `SELECT` $\rightarrow$ `WHERE` $\rightarrow$ `GROUP BY` $\rightarrow$ `HAVING` $\rightarrow$ `ORDER BY` $\rightarrow$ `LIMIT`
- **D)** `WHERE` $\rightarrow$ `FROM` $\rightarrow$ `GROUP BY` $\rightarrow$ `HAVING` $\rightarrow$ `SELECT` $\rightarrow$ `LIMIT` $\rightarrow$ `ORDER BY`

### Q1.2 [Fill-in-the-Blank]
Complete the sentence:
> *"Column aliases defined in the `SELECT` clause cannot be referenced in the `__________` clause because the filter stage executes BEFORE column projection. However, column aliases CAN legally be referenced in the `__________` clause because sorting happens AFTER column projection."*

### Q1.3 [Spot the Bug]
Identify why the database engine rejects this query with an error:
```sql
SELECT emp_id, salary * 0.15 AS annual_bonus
FROM Employees
WHERE annual_bonus > 5000;
```

### Q1.4 [Predict the Output]
Will the following query run successfully or crash? Why?
```sql
SELECT department, AVG(salary) AS avg_sal
FROM Employees
WHERE salary > 50000
GROUP BY department
ORDER BY avg_sal DESC;
```

---

## 🛡️ Topic 02: Filtering & 3-Valued Logic (NULLs, IN, BETWEEN)

### Q2.1 [MCQ]
What is the exact result of evaluating the following boolean expression in SQL 3-Valued Logic:
`NULL = NULL`
- **A)** `TRUE`
- **B)** `FALSE`
- **C)** `UNKNOWN`
- **D)** `0`

### Q2.2 [Fill-in-the-Blank]
Fill in the blanks to find employees whose bonus is either not recorded (blank) or greater than $10,000:
```sql
SELECT emp_id, name, bonus
FROM Employees
WHERE bonus __________ __________ OR bonus > 10000;
```

### Q2.3 [Spot the Bug]
A data analyst runs this query to find active users who were not referred by anyone on the blocked list, but the query returns **0 rows** even though thousands of eligible users exist. Spot the lethal bug:
```sql
SELECT user_id, user_name
FROM Users
WHERE referrer_id NOT IN (101, 102, NULL);
```

### Q2.4 [Predict the Output]
Given the expression: `SELECT COALESCE(NULL, NULL, 'Tier 1', 'Standard');`  
What scalar string is returned?

---

## ✂️ Topic 03: Text Manipulation, Wildcards & Slicing

### Q3.1 [MCQ]
Which pattern match will find all employee codes that start with the letter **'E'** and are followed by **exactly two characters** (e.g. `E01`, `E99`, but NOT `E1` or `E100`)?
- **A)** `WHERE code LIKE 'E%'`
- **B)** `WHERE code LIKE 'E__'`
- **C)** `WHERE code LIKE 'E.*'`
- **D)** `WHERE code = 'E??'`

### Q3.2 [Fill-in-the-Blank]
In HackerRank's *Higher Than 75 Marks*, students were sorted by the last 3 characters of their Name. Complete the query:
```sql
SELECT Name
FROM STUDENTS
WHERE Marks > 75
ORDER BY __________(Name, 3) ASC, ID ASC;
```

### Q3.3 [Spot the Bug]
An analyst wants to filter city names starting with vowels using MySQL regular expressions, but wrote:
```sql
SELECT DISTINCT city
FROM Station
WHERE city REGEXP '[aeiou]$';
```
Why does this fail the requirement?

### Q3.4 [Predict the Output]
What is the output of:
```sql
SELECT SUBSTRING('DATABASE', 5, 4);
```

---

## 🪜 Topic 04: Sorting & Slicing (`ORDER BY` & `LIMIT`)

### Q4.1 [MCQ]
When executing `ORDER BY salary DESC, name ASC`, how does the engine sort two employees who earn the exact same salary?
- **A)** It sorts them randomly based on disk arrival order.
- **B)** It keeps the first employee and discards the second.
- **C)** It applies the tie-breaker: sorting alphabetically by `name` from A to Z.
- **D)** It generates a query planner syntax warning.

### Q4.2 [Fill-in-the-Blank]
To retrieve **Page 3** of an audit log where each page displays **25 records**, fill in the pagination clause:
```sql
SELECT log_id, event_name, created_at
FROM AuditLogs
ORDER BY created_at DESC, log_id ASC
LIMIT _____ OFFSET _____;
```

### Q4.3 [Spot the Bug]
Why is using `LIMIT 5` without an `ORDER BY` considered an anti-pattern in production financial reporting?

---

## 🔀 Topic 05: Conditional Branching (`CASE WHEN`)

### Q5.1 [MCQ]
Given triangle side lengths $A = 20, B = 20, C = 40$:  
If an engineer evaluates this naive `CASE` statement:
```sql
CASE 
    WHEN A = B AND B = C THEN 'Equilateral'
    WHEN A = B THEN 'Isosceles'
    WHEN A + B <= C THEN 'Not A Triangle'
    ELSE 'Scalene'
END
```
What will the engine return for $(20, 20, 40)$, and why is it wrong?
- **A)** `'Not A Triangle'` because $20 + 20 \le 40$.
- **B)** `'Isosceles'` because $A = B$ matched first on the waterfall before reaching the inequality test.
- **C)** `'Equilateral'` because two sides are equal.
- **D)** `NULL` because the expression encountered a syntax error.

### Q5.2 [Fill-in-the-Blank]
Write the opening and closing keywords to complete this searched conditional statement:
```sql
SELECT emp_id,
       __________
           WHEN salary >= 100000 THEN 'Executive'
           WHEN salary >= 60000  THEN 'Professional'
           ELSE 'Associate'
       __________ AS comp_band
FROM Employees;
```

### Q5.3 [Predict the Output]
What does the following conditional aggregation query compute?
```sql
SELECT department,
       COUNT(CASE WHEN salary >= 100000 THEN 1 END) AS high_earners
FROM Employees
GROUP BY department;
```
*(Explain why rows with salary < 100,000 are not counted).*

---

## 📊 Topic 06: Aggregations & Group Summaries (`GROUP BY` & `HAVING`)

### Q6.1 [MCQ]
A column has 4 rows with values: `[100, 200, NULL, 300]`.  
What does `AVG(column)` return?
- **A)** `150` ($600 \div 4$)
- **B)** `200` ($600 \div 3$)
- **C)** `NULL`
- **D)** `0`

### Q6.2 [Fill-in-the-Blank]
Fill in the two missing filter keywords:
```sql
SELECT department, COUNT(*) AS staff_count
FROM Employees
__________ salary >= 50000          -- Gate 1: Drops low-salary rows BEFORE grouping
GROUP BY department
__________ COUNT(*) >= 3;          -- Gate 2: Drops small department buckets AFTER grouping
```

### Q6.3 [Spot the Bug]
Under the SQL standard (`ONLY_FULL_GROUP_BY`), why will this query crash with an error?
```sql
SELECT department, first_name, MAX(salary)
FROM Employees
GROUP BY department;
```

---

## 🔗 Topic 07: Relational Multi-Table JOINs

### Q7.1 [MCQ]
Which JOIN type keeps **ALL** records from the Left table, even if an employee has not been assigned a Department?
- **A)** `INNER JOIN`
- **B)** `CROSS JOIN`
- **C)** `LEFT JOIN`
- **D)** `RIGHT JOIN`

### Q7.2 [Fill-in-the-Blank]
Complete the **Orphan Hunter (Anti-Join)** pattern to find Customers who have never placed an Order:
```sql
SELECT c.customer_id, c.name
FROM Customers c
LEFT JOIN Orders o
  ON c.customer_id = o.customer_id
WHERE o.order_id __________ __________;
```

### Q7.3 [Spot the Bug]
An analyst intended to preserve all employees and display their department location if in `'London'`. Spot the subtle bug that accidentally destroys the `LEFT JOIN`:
```sql
SELECT e.name, d.dept_name, d.location
FROM Employees e
LEFT JOIN Departments d
  ON e.dept_id = d.dept_id
WHERE d.location = 'London';
```

---
---

# 🔑 Master Answer Key & Rationales

<details>
<summary>👉 Click to expand full answers and technical breakdowns</summary>

### Topic 01 Answers:
- **Q1.1**: **B** (`FROM` $\rightarrow$ `WHERE` $\rightarrow$ `GROUP BY` $\rightarrow$ `HAVING` $\rightarrow$ `SELECT` $\rightarrow$ `ORDER BY` $\rightarrow$ `LIMIT`).
- **Q1.2**: `WHERE`, `ORDER BY`.
- **Q1.3**: `annual_bonus` is created in `SELECT` (Step 5). The engine executes `WHERE` (Step 2) before `SELECT`, so the alias does not exist yet in memory.
- **Q1.4**: It runs successfully! `ORDER BY` runs in Step 7, *after* `SELECT` (Step 5), so the engine already knows the alias `avg_sal`.

### Topic 02 Answers:
- **Q2.1**: **C** (`UNKNOWN`). Comparing with `NULL` using `=` never produces `TRUE` or `FALSE`.
- **Q2.2**: `IS NULL`
- **Q2.3**: `NOT IN (101, 102, NULL)` unrolls into `!= 101 AND != 102 AND != NULL`. Since `!= NULL` is `UNKNOWN`, the whole expression becomes `UNKNOWN`, returning **0 rows**. Solution: use `IS NOT NULL` or `NOT EXISTS`.
- **Q2.4**: `'Tier 1'` (`COALESCE` skips NULLs and picks the first non-NULL value).

### Topic 03 Answers:
- **Q3.1**: **B** (`LIKE 'E__'`). Each underscore matches exactly one character.
- **Q3.2**: `RIGHT`
- **Q3.3**: `$` anchors to the **end** of the string (words ending in vowels). To match words *starting* with vowels, use `^` (`'^[aeiou]'`).
- **Q3.4**: `'BASE'` (starts at character 5 `'B'` for length 4 `'BASE'`).

### Topic 04 Answers:
- **Q4.1**: **C** (The engine uses `name ASC` as the tie-breaker).
- **Q4.2**: `LIMIT 25 OFFSET 50` (Page 1 = 0-24, Page 2 = 25-49, Page 3 = 50-74).
- **Q4.3**: Relational storage engines do not guarantee physical insertion order. Without `ORDER BY`, `LIMIT 5` returns non-deterministic rows across query runs.

### Topic 05 Answers:
- **Q5.1**: **B** (`'Isosceles'`). The waterfall exits at the first `TRUE` condition. Since $20 = 20$, it matched `A = B` before checking if the sticks formed a valid triangle ($A + B \le C$).
- **Q5.2**: `CASE`, `END`.
- **Q5.3**: When `salary < 100000`, the `CASE` statement returns `NULL` (due to no matching branch and no `ELSE`). `COUNT()` ignores `NULL`s and only counts rows returning `1`.

### Topic 06 Answers:
- **Q6.1**: **B** (`200`). `AVG()` ignores `NULL` and divides the sum ($600$) by the count of non-null records ($3$).
- **Q6.2**: `WHERE`, `HAVING`.
- **Q6.3**: `first_name` is neither in the `GROUP BY` clause nor enclosed in an aggregate function. A department has multiple names, so the engine cannot deterministically choose one.

### Topic 07 Answers:
- **Q7.1**: **C** (`LEFT JOIN`).
- **Q7.2**: `IS NULL`
- **Q7.3**: Placing `d.location = 'London'` in `WHERE` filters rows *after* the join. For unassigned employees, `d.location` is `NULL`. `NULL = 'London'` evaluates to `UNKNOWN`, silently discarding all unassigned employees and converting the `LEFT JOIN` into an `INNER JOIN`. (Fix: move the condition into `ON`).

</details>
