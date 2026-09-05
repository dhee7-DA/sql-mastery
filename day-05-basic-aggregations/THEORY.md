# 📚 Complete Study Guide: SQL Aggregations & Statistical Reduction

> **Phase**: Phase 3 — Basic Aggregations  
> **Target Audience**: Data Analysts, Analytics Engineers, Backend Engineers, Financial Quants  
> **Dialect**: Standard SQL / MySQL 8.0+ / PostgreSQL

---

## 🧠 1. The Core Mental Model: Row-to-Scalar Collapse

All previous SQL queries operated **row-by-row (scalar)**:
* 100 rows in &rarr; 100 rows out (e.g. `UPPER(name)`, `salary * 1.10`, `CASE WHEN`).

**Aggregate functions perform dimensional reduction**:
* $N$ input rows &rarr; **Collapsed into 1 summary scalar metric** (or 1 row per unique group).

```text
+--------------+               +----------------------+
| Salary Column|               | Aggregate Output     |
+--------------+               +----------------------+
| $80,000      |               |                      |
| $95,000      |  == SUM() ==> | $530,000 (Total)     |
| $110,000     |  == AVG() ==> | $106,000 (Mean)      |
| $125,000     |  == MAX() ==> | $125,000 (Ceiling)   |
| $120,000     |  == COUNT()=> | 5        (Card Count)|
+--------------+               +----------------------+
```

---

## ⚙️ 2. The Big 5 Aggregate Functions

| Function | What it Calculates | Data Types Allowed | Handles `NULL`s? |
|---|---|---|---|
| **`COUNT()`** | Counts number of items/records | Any column, expression, or `*` | `COUNT(*)` counts NULLs; `COUNT(col)` ignores NULLs |
| **`SUM()`** | Computes arithmetic sum | Numeric only (Int, Float, Decimal) | Ignores `NULL`s; returns `NULL` if 0 rows match |
| **`AVG()`** | Computes arithmetic mean ($\frac{\sum x}{n}$) | Numeric only | **Ignores `NULL`s** (Divides only by non-null count!) |
| **`MIN()`** | Finds minimum value | Numbers, Dates, Strings (alphabetical) | Ignores `NULL`s |
| **`MAX()`** | Finds maximum value | Numbers, Dates, Strings (alphabetical) | Ignores `NULL`s |

---

## ⚠️ 3. The 4 Deadly Gotchas of SQL Aggregation (FAANG Interview Traps)

### Trap 1: `COUNT(*)` vs `COUNT(col)` vs `COUNT(1)`
* **`COUNT(*)`**: Counts the **number of physical rows** emitted by the `FROM` / `WHERE` clauses, even if every column in that row is `NULL`.
* **`COUNT(1)`**: Exactly identical in execution plan to `COUNT(*)` in modern query optimizers (MySQL, Postgres, BigQuery). The database engine optimizes it into a metadata scan.
* **`COUNT(column_name)`**: Counts **only rows where `column_name` IS NOT NULL**!

```sql
-- Sample Table: Customers
-- id | bonus_code
-- 1  | 'DISC10'
-- 2  | NULL
-- 3  | 'DISC20'

SELECT COUNT(*)            -- Returns: 3 (Total rows)
     , COUNT(bonus_code)   -- Returns: 2 (Row 2 is skipped because bonus_code is NULL!)
FROM Customers;
```

---

### Trap 2: The `AVG()` Invisible Denominator Bug
`AVG(col)` does **NOT** divide by the total number of rows in the table.  
It divides by **only the non-null rows**:

$$\text{AVG}(col) = \frac{\sum \text{non-null values}}{\text{COUNT}(col)}$$

If you have 10 employees: 5 earn \$100,000 and 5 have `NULL` recorded:
* `AVG(salary)` &rarr; **\$100,000** (500k / 5)!
* True corporate workforce average &rarr; **\$50,000** (500k / 10)!

```sql
-- WRONG (Overstates average because NULLs are excluded from denominator):
SELECT AVG(bonus) FROM SalesReps;

-- CORRECT (Treats unawarded bonus as $0):
SELECT AVG(COALESCE(bonus, 0)) FROM SalesReps;
-- OR:
SELECT SUM(bonus) / COUNT(*) FROM SalesReps;
```

---

### Trap 3: Empty Sets Return `NULL`, NOT `0`
If no rows match your `WHERE` filter:
* `COUNT(*)` returns **`0`**.
* `SUM()`, `AVG()`, `MIN()`, and `MAX()` return **`NULL`**!

```sql
-- If no transactions occurred today:
SELECT SUM(amount) FROM Transactions WHERE transaction_date = CURRENT_DATE;
-- Returns: NULL

-- Always wrap in COALESCE for production financial reporting:
SELECT COALESCE(SUM(amount), 0) AS daily_total
FROM Transactions 
WHERE transaction_date = CURRENT_DATE;
-- Returns: 0.00
```

---

### Trap 4: Mixing Aggregates with Unaggregated Columns (The Cardinal Error)
Without a `GROUP BY` clause, you cannot select an unaggregated column alongside an aggregate:

```sql
-- ❌ SYNTAX ERROR in MySQL 8.0 (ONLY_FULL_GROUP_BY) & PostgreSQL:
SELECT name, MAX(salary) FROM Employees;
-- Error: Column 'name' is invalid in the select list because it is not 
-- contained in either an aggregate function or the GROUP BY clause.

-- ✅ CORRECT: Use Subquery, Window Function, or GROUP BY:
SELECT name, salary 
FROM Employees 
WHERE salary = (SELECT MAX(salary) FROM Employees);
```

---

## 🔄 4. The Golden Order: `WHERE` vs `HAVING`

Understanding when filtering occurs in the physical engine pipeline is the single most tested concept in SQL interviews:

```text
[1. FROM]       ==> Read base tables
[2. WHERE]      ==> Filter individual raw rows (BEFORE aggregation)
[3. GROUP BY]   ==> Bucket rows into categories
[4. AGGREGATE]  ==> Calculate SUM, AVG, COUNT per bucket
[5. HAVING]     ==> Filter aggregate buckets (AFTER aggregation)
[6. SELECT]     ==> Project columns and aliases
[7. ORDER BY]   ==> Sort the final results
[8. LIMIT]      ==> Restrict number of output rows
```

* **Rule**: You **CANNOT** use aggregate functions in a `WHERE` clause (`WHERE SUM(sales) > 1000` &rarr; 💥 syntax error).
* **Rule**: You use `HAVING` when you want to filter based on the result of an aggregation (`HAVING COUNT(*) > 5`).

---

## 💼 5. Real-World Corporate Analytics Examples

### Scenario A: SaaS MRR & Churn Tracking (Stripe / Paddle)
```sql
SELECT 
    COUNT(DISTINCT customer_id) AS total_active_subscribers,
    SUM(monthly_price) AS monthly_recurring_revenue,
    AVG(monthly_price) AS average_revenue_per_user,
    MIN(started_at) AS earliest_cohort_date
FROM Subscriptions
WHERE status = 'ACTIVE';
```

### Scenario B: E-Commerce Fraud Outlier Detection (Shopify)
```sql
SELECT 
    merchant_id,
    COUNT(*) AS total_orders,
    SUM(order_value) AS gross_merchandise_value,
    MAX(order_value) AS largest_single_order,
    ROUND(AVG(order_value), 2) AS aov
FROM Orders
WHERE created_at >= NOW() - INTERVAL 24 HOUR
GROUP BY merchant_id
HAVING COUNT(*) > 500 AND MAX(order_value) > 10000;
```
