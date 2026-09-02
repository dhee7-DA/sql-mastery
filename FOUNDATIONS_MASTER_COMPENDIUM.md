# 🏛️ Phase 1 Foundations Master Compendium & Problem Bank

> **Purpose**: The definitive, single-source reference manual and graded problem bank for all Phase 1 Foundations SQL keywords and concepts. Contains full theoretical breakdowns, a unified corporate schema, and comprehensive Easy, Medium, and Hard practice problems with line-by-line solution explanations.

---

## 🏗️ 1. The Unified Corporate Analytics Schema

All practice problems in this compendium operate on this unified, production-grade E-Commerce & Financial Services database schema:

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Table 1: Customers                                                                                   │
├─────────────────┬──────────────┬─────────────────────────────────────────────────────────────────────┤
│ Column          │ Type         │ Description                                                         │
├─────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────┤
│ customer_id     │ INT (PK)     │ Unique customer identifier (e.g., 1001)                             │
│ first_name      │ VARCHAR(50)  │ Customer first name (e.g., 'Sophia')                                │
│ last_name       │ VARCHAR(50)  │ Customer last name (e.g., 'Rodriguez')                              │
│ email           │ VARCHAR(100) │ Customer email address (e.g., 'sophia.r@gmail.com')                 │
│ city            │ VARCHAR(50)  │ Residence city (e.g., 'Austin')                                     │
│ state           │ VARCHAR(2)   │ 2-letter state code (e.g., 'TX')                                    │
│ country         │ VARCHAR(50)  │ Residence country (e.g., 'USA', 'CAN', 'GBR')                       │
│ credit_score    │ INT          │ FICO credit score (300 - 850)                                       │
│ created_at      │ DATE         │ Account creation date (e.g., '2025-01-15')                          │
└─────────────────┴──────────────┴─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Table 2: Employees                                                                                   │
├─────────────────┬──────────────┬─────────────────────────────────────────────────────────────────────┤
│ Column          │ Type         │ Description                                                         │
├─────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────┤
│ emp_id          │ INT (PK)     │ Unique employee identifier (e.g., 501)                              │
│ first_name      │ VARCHAR(50)  │ Employee first name (e.g., 'David')                                 │
│ last_name       │ VARCHAR(50)  │ Employee last name (e.g., 'Chen')                                   │
│ department      │ VARCHAR(50)  │ Department (e.g., 'Analytics', 'Finance', 'Engineering', 'Sales')   │
│ salary          │ INT          │ Annual base salary in USD (e.g., 95000)                             │
│ months_tenure   │ INT          │ Total months employed at company (e.g., 18)                         │
│ manager_id      │ INT          │ Employee ID of direct manager (NULL if Executive)                   │
└─────────────────┴──────────────┴─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Table 3: Transactions                                                                                │
├─────────────────┬──────────────┬─────────────────────────────────────────────────────────────────────┤
│ Column          │ Type         │ Description                                                         │
├─────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────┤
│ txn_id          │ INT (PK)     │ Unique transaction ID (e.g., 9001)                                  │
│ customer_id     │ INT (FK)     │ Customer who initiated the transaction                              │
│ amount          │ DECIMAL(10,2)│ Transaction monetary amount in USD (e.g., 250.75)                    │
│ txn_type        │ VARCHAR(20)  │ Type: 'PURCHASE', 'REFUND', 'TRANSFER', 'WITHDRAWAL'                │
│ status          │ VARCHAR(20)  │ Status: 'COMPLETED', 'PENDING', 'FAILED', 'DISPUTED'                │
│ merchant_name   │ VARCHAR(100) │ Merchant identifier (e.g., 'Amazon Prime', 'Apple Store', 'Uber')   │
└─────────────────┴──────────────┴─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Table 4: Products                                                                                    │
├─────────────────┬──────────────┬─────────────────────────────────────────────────────────────────────┤
│ Column          │ Type         │ Description                                                         │
├─────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────┤
│ product_id      │ INT (PK)     │ Unique product SKU ID (e.g., 201)                                   │
│ product_name    │ VARCHAR(100) │ Commercial name (e.g., 'Wireless Noise Canceling Headphones')       │
│ category        │ VARCHAR(50)  │ Category: 'Electronics', 'Audio', 'Office', 'Furniture'            │
│ price           │ DECIMAL(10,2)│ Unit retail price in USD (e.g., 199.99)                             │
│ stock_quantity  │ INT          │ Quantity currently in warehouse inventory                           │
│ product_code    │ VARCHAR(20)  │ Alphanumeric barcode (e.g., 'EL-8942-US')                           │
└─────────────────┴──────────────┴─────────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ 2. The Universal SQL Sentence Blueprint & Execution Lifecycle

Whenever you write a query, SQL clauses **must be written in this exact strict order**:

```text
Written Order:                                Logical Execution Order (Engine Lifecycle):
1. SELECT   [Columns / Calculations / Aggs]   1. FROM & JOINs  (Locate & load tables)
2. FROM     [Tables]                          2. WHERE         (Filter raw rows)
3. WHERE    [Row-level filters]               3. GROUP BY      (Bucket rows into groups)
4. GROUP BY [Aggregation dimensions]          4. HAVING        (Filter aggregated groups)
5. HAVING   [Group-level filters]             5. SELECT        (Calculate & project output)
6. ORDER BY [Sorting rules & tie-breakers]    6. DISTINCT      (Remove duplicate tuples)
7. LIMIT    [Row count restriction]           7. ORDER BY      (Sort the surviving rows)
                                              8. LIMIT         (Slice the final Top-N rows)
```

> **Universal Memory Hook**: **"So Few Whales Gather Heavenly Ocean Lunches"**  
> (**S**ELECT ➡️ **F**ROM ➡️ **W**HERE ➡️ **G**ROUP BY ➡️ **H**AVING ➡️ **O**RDER BY ➡️ **L**IMIT)

---

## 📚 3. Deep-Dive Keyword Modules & Graded Problem Bank

---

### MODULE 01: `SELECT` (Projection, Aliasing, Math & Expressions)

#### 🧠 Theory & Concepts:
- `SELECT` determines **which columns and calculated expressions appear in the final output**.
- `SELECT *` performs a full-width row scan (retrieves all columns).
- Column Aliasing (`AS alias_name`): Renames output columns for readability and reporting.
- Scalar Math inside `SELECT`: You can perform arithmetic directly on columns: `+`, `-`, `*`, `/`.

```text
Syntax:
SELECT column1, column2, (salary * 0.10) AS bonus_estimate
FROM Employees;
```

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 1.1: Full Employee Directory
- **Problem**: Retrieve all columns and records for every employee in the company.
- **SQL Query**:
  ```sql
  SELECT *
  FROM Employees;
  ```
- **Explanation**: `*` instructs the database engine to project every attribute defined in the `Employees` table without filtering.

---

##### 🟢 Easy Problem 1.2: Customer Contact Projection
- **Problem**: Display only the first name, last name, and email address of all customers.
- **SQL Query**:
  ```sql
  SELECT first_name, last_name, email
  FROM Customers;
  ```
- **Explanation**: Explicitly projects only the 3 targeted fields, reducing memory and network bandwidth.

---

##### 🟡 Medium Problem 1.3: Projected Annual Compensation with Bonus
- **Problem**: Display employee first names, current salary, and a new column named `projected_salary` that reflects a 15% salary increase.
- **SQL Query**:
  ```sql
  SELECT first_name,
         salary,
         salary * 1.15 AS projected_salary
  FROM Employees;
  ```
- **Explanation**: Performs scalar multiplication `salary * 1.15` per row and assigns the clean business label `projected_salary` using `AS`.

---

##### 🔴 Hard Problem 1.4: Monthly Inventory Value per Stock Unit
- **Problem**: Write a query for the finance team displaying `product_name`, current `stock_quantity`, unit `price`, total inventory holding value (`price * stock_quantity`) labeled as `total_inventory_value`, and the estimated weekly carrying cost (defined as 2% of total inventory holding value divided by 52) labeled as `weekly_carrying_cost`.
- **SQL Query**:
  ```sql
  SELECT product_name,
         stock_quantity,
         price,
         (price * stock_quantity) AS total_inventory_value,
         ((price * stock_quantity * 0.02) / 52) AS weekly_carrying_cost
  FROM Products;
  ```
- **Explanation**: Computes compound multi-step financial arithmetic directly inside the `SELECT` clause with clean aliases.

---

### MODULE 02: `DISTINCT` (Deduplication & Cardinality)

#### 🧠 Theory & Concepts:
- `DISTINCT` eliminates **duplicate tuples** from the final result set.
- `SELECT DISTINCT column`: Returns only unique values in that column.
- `SELECT DISTINCT col1, col2`: Evaluates uniqueness across the **combination of both columns** together.
- `COUNT(DISTINCT column)`: Returns the integer count of unique, non-null values.

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 2.1: Unique Customer Countries
- **Problem**: List all unique countries where the company has registered customers.
- **SQL Query**:
  ```sql
  SELECT DISTINCT country
  FROM Customers;
  ```
- **Explanation**: Discards repeated country entries so each country appears exactly once.

---

##### 🟡 Medium Problem 2.2: Active Department Locations
- **Problem**: Query all unique combinations of `city` and `state` from the `Customers` table to identify unique geographical markets.
- **SQL Query**:
  ```sql
  SELECT DISTINCT city, state
  FROM Customers;
  ```
- **Explanation**: Evaluates the pair `(city, state)` together. If two customers live in `Austin, TX`, it outputs `Austin, TX` only once.

---

##### 🔴 Hard Problem 2.3: Redundant Customer City Cardinality Metric
- **Problem**: Write a query that computes the exact number of duplicate city entries in the `Customers` table (i.e. the difference between total city records and unique city names).
- **SQL Query**:
  ```sql
  SELECT COUNT(city) - COUNT(DISTINCT city) AS duplicate_city_count
  FROM Customers;
  ```
- **Explanation**: `COUNT(city)` calculates total rows with non-null city values; `COUNT(DISTINCT city)` counts unique values. Subtracting the two gives the exact count of duplicate entries.

---

### MODULE 03: `WHERE` Predicates & Comparison Operators

#### 🧠 Theory & Concepts:
- `WHERE` filters rows **before** any aggregation or sorting occurs.
- Numeric comparisons: `>`, `<`, `>=`, `<=`, `=`, `<>` (or `!=`).
- Text comparisons: Case-insensitive by default in MySQL, strings **must be enclosed in single quotes** (`'USA'`).
- Numeric values **must NOT be enclosed in quotes or include currency symbols** (`WHERE salary > 50000`, NOT `'$50,000'`).

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 3.1: Prime Credit Customer Filtering
- **Problem**: Retrieve all customer details for customers with a credit score of at least 750.
- **SQL Query**:
  ```sql
  SELECT *
  FROM Customers
  WHERE credit_score >= 750;
  ```
- **Explanation**: Filters for rows where the numeric value in `credit_score` is greater than or equal to 750.

---

##### 🟡 Medium Problem 3.2: High-Value Successful Transaction Auditing
- **Problem**: Find all transaction IDs and amounts where the transaction amount exceeds $1,000.00 and the status is `'COMPLETED'`.
- **SQL Query**:
  ```sql
  SELECT txn_id, amount
  FROM Transactions
  WHERE amount > 1000.00
    AND status = 'COMPLETED';
  ```
- **Explanation**: Both conditions must evaluate to TRUE for a row to survive the filter.

---

##### 🔴 Hard Problem 3.3: Recent Non-Executive High-Earner Filter
- **Problem**: Query the employee ID, full name (combined as `employee_name`), department, and salary of all employees earning over $90,000 who report to a manager (manager_id is not null) and have less than 24 months of tenure.
- **SQL Query**:
  ```sql
  SELECT emp_id,
         CONCAT(first_name, ' ', last_name) AS employee_name,
         department,
         salary
  FROM Employees
  WHERE salary > 90000
    AND manager_id IS NOT NULL
    AND months_tenure < 24;
  ```
- **Explanation**: Combines string concatenation `CONCAT()`, null checks `IS NOT NULL`, and strict numeric bounds simultaneously.

---

### MODULE 04: Boolean Operators (`AND`, `OR`, `NOT`) & Operator Precedence

#### 🧠 Theory & Concepts:
- **`AND`**: Returns TRUE only if **all** connected conditions are TRUE.
- **`OR`**: Returns TRUE if **at least one** condition is TRUE.
- **`NOT`**: Inverts the truth value of a condition.
- **Operator Precedence Rule**: In SQL, **`AND` has higher precedence than `OR`**!
  - `A OR B AND C` is evaluated as `A OR (B AND C)`.
  - **Always use parentheses `()` to explicitly declare evaluation order** when mixing `AND` and `OR`!

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 4.1: West Coast Customer Filter
- **Problem**: Query first names and emails of customers residing in either California (`'CA'`) or Washington (`'WA'`).
- **SQL Query**:
  ```sql
  SELECT first_name, email
  FROM Customers
  WHERE state = 'CA' OR state = 'WA';
  ```
- **Explanation**: Evaluates to TRUE if the customer resides in either state.

---

##### 🟡 Medium Problem 4.2: High-Risk Transaction Detection
- **Problem**: Retrieve all transactions that are either `'FAILED'` or `'DISPUTED'` where the transaction amount is strictly greater than $500.00.
- **SQL Query**:
  ```sql
  SELECT txn_id, amount, status
  FROM Transactions
  WHERE (status = 'FAILED' OR status = 'DISPUTED')
    AND amount > 500.00;
  ```
- **Explanation**: The parentheses `()` force SQL to evaluate the status condition first, ensuring only high-value failed/disputed records are returned.

---

##### 🔴 Hard Problem 4.3: Targeted Executive Risk Audit
- **Problem**: Find all employees who work in `'Finance'` or `'Analytics'` with a salary exceeding $85,000, OR any employee in any department whose tenure is under 6 months with a salary over $100,000.
- **SQL Query**:
  ```sql
  SELECT emp_id, first_name, department, salary, months_tenure
  FROM Employees
  WHERE (department IN ('Finance', 'Analytics') AND salary > 85000)
     OR (months_tenure < 6 AND salary > 100000);
  ```
- **Explanation**: Uses grouped parentheses to construct two distinct business criteria connected by a top-level `OR`.

---

### MODULE 05: Range & Set Operators (`BETWEEN`, `IN`, `NOT IN`)

#### 🧠 Theory & Concepts:
- **`BETWEEN low AND high`**: Inclusive range check (`column >= low AND column <= high`).
- **`IN (val1, val2, ...)`**: Shorthand for multiple `OR` equality comparisons.
- **`NOT IN (val1, val2, ...)`**: Excludes all records matching any item in the list.
  - ⚠️ **NULL Trap**: If the `NOT IN` list contains a `NULL`, the entire expression evaluates to UNKNOWN and returns 0 rows!

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 5.1: Mid-Tier Credit Customers
- **Problem**: Retrieve customers with credit scores between 650 and 720 (inclusive).
- **SQL Query**:
  ```sql
  SELECT customer_id, first_name, credit_score
  FROM Customers
  WHERE credit_score BETWEEN 650 AND 720;
  ```
- **Explanation**: `BETWEEN` includes boundary numbers 650 and 720.

---

##### 🟡 Medium Problem 5.2: North American Customer Filter
- **Problem**: Query all customers located in the United States, Canada, or Mexico using a set operator.
- **SQL Query**:
  ```sql
  SELECT customer_id, first_name, country
  FROM Customers
  WHERE country IN ('USA', 'CAN', 'MEX');
  ```
- **Explanation**: Replaces three chained `OR country = ...` statements with a concise, index-friendly set comparison.

---

##### 🔴 Hard Problem 5.3: Non-Standard Transaction Flagging
- **Problem**: Find all completed transactions that did NOT occur at `'Amazon Prime'`, `'Apple Store'`, or `'Uber'`, with amounts between $100.00 and $2,500.00.
- **SQL Query**:
  ```sql
  SELECT txn_id, merchant_name, amount
  FROM Transactions
  WHERE status = 'COMPLETED'
    AND merchant_name NOT IN ('Amazon Prime', 'Apple Store', 'Uber')
    AND amount BETWEEN 100.00 AND 2500.00;
  ```
- **Explanation**: Combines equality status filtering, negated set containment `NOT IN`, and inclusive numerical bounds `BETWEEN`.

---

### MODULE 06: Modulo Arithmetic (`MOD()` / `%`)

#### 🧠 Theory & Concepts:
- `MOD(n, d)` (or `n % d`) returns the **remainder** when $n$ is divided by $d$.
- **Even ID check**: `MOD(id, 2) = 0`
- **Odd ID check**: `MOD(id, 2) = 1` (or `MOD(id, 2) <> 0`)
- **Systematic Sampling**: `MOD(id, 10) = 0` grabs an exact 10% systematic sample of rows for testing or QA.

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 6.1: Even-Numbered Employee IDs
- **Problem**: Query the names of all employees with even employee IDs.
- **SQL Query**:
  ```sql
  SELECT emp_id, first_name
  FROM Employees
  WHERE MOD(emp_id, 2) = 0;
  ```
- **Explanation**: Checks if the remainder of `emp_id / 2` is 0.

---

##### 🟡 Medium Problem 6.2: A/B Testing Customer Split
- **Problem**: Select all customers assigned to A/B Test Variant Group B (defined as customers with odd customer IDs) who have a credit score greater than 700.
- **SQL Query**:
  ```sql
  SELECT customer_id, first_name, credit_score
  FROM Customers
  WHERE MOD(customer_id, 2) = 1
    AND credit_score > 700;
  ```
- **Explanation**: Partitions customer IDs into odd parity cohorts while applying a secondary quality filter.

---

##### 🔴 Hard Problem 6.3: Systematic 5% Quality Control Audit
- **Problem**: The compliance team needs to audit every 20th completed transaction (systematic 5% sample) where the amount is strictly greater than $50.00.
- **SQL Query**:
  ```sql
  SELECT txn_id, customer_id, amount, status
  FROM Transactions
  WHERE status = 'COMPLETED'
    AND amount > 50.00
    AND MOD(txn_id, 20) = 0;
  ```
- **Explanation**: `MOD(txn_id, 20) = 0` deterministically filters for IDs ending in `00, 20, 40, 60...`, producing a mathematically uniform 5% audit slice.

---

### MODULE 07: Standard SQL Wildcards (`LIKE` & `NOT LIKE`)

#### 🧠 Theory & Concepts:
- **`%`**: Matches zero, one, or multiple characters of any length.
  - `'A%'` ➡️ Starts with 'A'.
  - `'%a'` ➡️ Ends with 'a'.
  - `'%tech%'` ➡️ Contains 'tech' anywhere.
- **`_` (Underscore)**: Matches **exactly one single character**.
  - `'_a%'` ➡️ Second character must be 'a'.
  - `'___'` ➡️ Total string length must be exactly 3 characters.

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 7.1: Gmail User Query
- **Problem**: Find all customers whose email address ends with `@gmail.com`.
- **SQL Query**:
  ```sql
  SELECT customer_id, first_name, email
  FROM Customers
  WHERE email LIKE '%@gmail.com';
  ```
- **Explanation**: `%` matches any username characters preceding the literal `@gmail.com` suffix.

---

##### 🟡 Medium Problem 7.2: Standard Product SKU Pattern Match
- **Problem**: Find all products whose `product_code` begins with `'EL-'` and ends with `'-US'`.
- **SQL Query**:
  ```sql
  SELECT product_id, product_name, product_code
  FROM Products
  WHERE product_code LIKE 'EL-%-US';
  ```
- **Explanation**: Enforces exact prefix `'EL-'`, exact suffix `'-US'`, and permits any batch numbers in the middle `%`.

---

##### 🔴 Hard Problem 7.3: Strict Corporate Security Username Audit
- **Problem**: Query all employees whose first name has `'a'` as the second letter, whose last name does NOT end with `'son'`, and whose salary exceeds $60,000.
- **SQL Query**:
  ```sql
  SELECT emp_id, first_name, last_name, salary
  FROM Employees
  WHERE first_name LIKE '_a%'
    AND last_name NOT LIKE '%son'
    AND salary > 60000;
  ```
- **Explanation**: Uses `_a%` for fixed second-character positioning, `NOT LIKE '%son'` for suffix exclusion, and numeric thresholding.

---

### MODULE 08: Regular Expressions (`REGEXP` / `RLIKE`)

#### 🧠 Theory & Concepts:
- **`^`**: Start anchor (`'^A'` = starts with A).
- **`$`**: End anchor (`'a$'` = ends with a).
- **`[...]`**: Character set (`'[aeiou]'` = matches any single vowel).
- **`[^...]`**: Negated set (`'[^aeiou]'` = matches any consonant / non-vowel).
- **`NOT REGEXP`**: Inverts the match.
- **`.*`**: Matches any sequence of characters in regex.

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 8.1: Cities Starting with Vowels (Station 6 Pattern)
- **Problem**: Query unique city names from the `Customers` table that start with a vowel (`a, e, i, o, u`).
- **SQL Query**:
  ```sql
  SELECT DISTINCT city
  FROM Customers
  WHERE city REGEXP '^[aeiou]';
  ```
- **Explanation**: `^` anchors the search at the start; `[aeiou]` matches any vowel character.

---

##### 🟡 Medium Problem 8.2: Cities Starting AND Ending with Vowels (Station 8 Pattern)
- **Problem**: Query unique city names that begin with a vowel AND end with a vowel.
- **SQL Query**:
  ```sql
  SELECT DISTINCT city
  FROM Customers
  WHERE city REGEXP '^[aeiou]'
    AND city REGEXP '[aeiou]$';
  ```
- **Explanation**: Combines the start anchor `^[aeiou]` and end anchor `[aeiou]$` across two complete boolean predicates.

---

##### 🔴 Hard Problem 8.3: Neither Starting NOR Ending with Vowels (Station 12 Pattern)
- **Problem**: Query unique customer city names that do NOT start with a vowel AND do NOT end with a vowel.
- **SQL Query**:
  ```sql
  SELECT DISTINCT city
  FROM Customers
  WHERE city NOT REGEXP '^[aeiou]'
    AND city NOT REGEXP '[aeiou]$';
  ```
- **Explanation**: Applies De Morgan's boolean negation rule to filter out all cities with vowel boundaries on either end.

---

### MODULE 09: String Slicing & Metrics (`LENGTH`, `LEFT`, `RIGHT`, `SUBSTRING`)

#### 🧠 Theory & Concepts:
- **`LENGTH(str)`**: Returns character count (`LENGTH('Austin')` ➡️ 6).
- **`LEFT(str, N)`**: Extracts first $N$ characters from start.
- **`RIGHT(str, N)`**: Extracts last $N$ characters from end.
- **`SUBSTRING(str, start, len)`**: Extracts `len` characters starting at 1-based index `start`.

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 9.1: Masked Credit Card Suffix Projection
- **Problem**: Display customer first names and only the last 4 characters of their email domain extension.
- **SQL Query**:
  ```sql
  SELECT first_name,
         RIGHT(email, 4) AS email_extension
  FROM Customers;
  ```
- **Explanation**: Extracts the final 4 characters (e.g. `'.com'`, `'.org'`).

---

##### 🟡 Medium Problem 9.2: Product Category Prefix Extraction
- **Problem**: Extract the 2-letter department code (the first 2 characters) from `product_code` and display it alongside `product_name`.
- **SQL Query**:
  ```sql
  SELECT product_name,
         LEFT(product_code, 2) AS category_prefix
  FROM Products;
  ```
- **Explanation**: Uses `LEFT(str, 2)` to extract leading categorical codes.

---

##### 🔴 Hard Problem 9.3: Suffix Sorting with ID Tie-Breakers (Higher Than 75 Marks Pattern)
- **Problem**: Query the names of all employees earning over $75,000, ordered alphabetically by the **last three characters** of their first name, with secondary tie-breaking by ascending `emp_id`.
- **SQL Query**:
  ```sql
  SELECT first_name
  FROM Employees
  WHERE salary > 75000
  ORDER BY RIGHT(first_name, 3) ASC, emp_id ASC;
  ```
- **Explanation**: Computes `RIGHT(first_name, 3)` dynamically in `ORDER BY` and breaks ties using the primary key `emp_id`.

---

### MODULE 10: Sorting, Tie-Breaking & Output Slicing (`ORDER BY` & `LIMIT`)

#### 🧠 Theory & Concepts:
- **`ORDER BY col ASC`**: Ascending order (Default: A-Z, smallest numbers first, oldest dates first).
- **`ORDER BY col DESC`**: Descending order (Z-A, highest numbers first, newest dates first).
- **Multi-Column Sorting**: `ORDER BY col1 DESC, col2 ASC` (breaks ties in col1 using col2).
- **`LIMIT N`**: Restricts the returned row count to the top $N$ rows.
- **`LIMIT N OFFSET M`**: Skips $M$ rows and returns the next $N$ rows (Pagination).

---

#### 🎯 Graded Practice Problems:

##### 🟢 Easy Problem 10.1: Top 5 Highest-Paid Employees
- **Problem**: Find the top 5 highest-earning employees in the company.
- **SQL Query**:
  ```sql
  SELECT first_name, last_name, salary
  FROM Employees
  ORDER BY salary DESC
  LIMIT 5;
  ```
- **Explanation**: Sorts salaries descending and truncates output to the first 5 records.

---

##### 🟡 Medium Problem 10.2: Shortest & Longest City Names with Tie-Breakers (Station 5 Pattern)
- **Problem**: Write two queries to find the single shortest and single longest customer city name along with their character lengths. In case of ties, choose the alphabetically first city.
- **SQL Query**:
  ```sql
  -- Query 1: Shortest City
  SELECT city, LENGTH(city)
  FROM Customers
  ORDER BY LENGTH(city) ASC, city ASC
  LIMIT 1;

  -- Query 2: Longest City
  SELECT city, LENGTH(city)
  FROM Customers
  ORDER BY LENGTH(city) DESC, city ASC
  LIMIT 1;
  ```
- **Explanation**: Evaluates character lengths via `LENGTH(city)`, sorts ascending/descending, enforces alphabetical tie-breaking via `, city ASC`, and slices top row with `LIMIT 1`.

---

##### 🔴 Hard Problem 10.3: Second-Highest Transaction Value (Pagination Pattern)
- **Problem**: Find the single 2nd largest completed transaction amount without using subqueries or window functions.
- **SQL Query**:
  ```sql
  SELECT txn_id, customer_id, amount
  FROM Transactions
  WHERE status = 'COMPLETED'
  ORDER BY amount DESC
  LIMIT 1 OFFSET 1;
  ```
- **Explanation**: Sorts all completed transactions from highest to lowest, skips the #1 largest row (`OFFSET 1`), and takes the next single row (`LIMIT 1`).

---

## 🏁 4. Phase 1 Foundations Summary Checklist

Use this checklist to confirm complete mastery of Phase 1 before moving to Phase 2:

- [x] **Universal Blueprint**: Can structure queries in the rigid clause order (`SELECT ➡️ FROM ➡️ WHERE ➡️ ORDER BY ➡️ LIMIT`).
- [x] **Deduplication**: Understand difference between `COUNT(col)` and `COUNT(DISTINCT col)`.
- [x] **Boolean Logic**: Can correctly place parentheses when combining `AND` and `OR`.
- [x] **Regex Anchors**: Know that `^` means start, `$` means end, and `[...]` defines character sets.
- [x] **String Slicing**: Confident using `LEFT()`, `RIGHT()`, `SUBSTRING()`, and `LENGTH()`.
- [x] **Sorting Hierarchy**: Know how multi-column tie-breakers resolve ties sequentially.
- [x] **Numeric Purity**: Always write numeric comparisons without quotes or currency signs (`WHERE salary > 2000`).
