// =============================================================================
// SQL MASTERY PLATFORM — TRAPS, GOTCHAS, INTERVIEW SECRETS & INTRICACIES
// High-yield corporate traps, senior analyst tricks, and spoken-word model answers
// =============================================================================

window.TRAPS_INTERVIEW_SECRETS = {
  modules: [
    // -------------------------------------------------------------------------
    // MODULE 01: SQL Foundations & Execution Pipeline
    // -------------------------------------------------------------------------
    {
      moduleId: "mod_foundations",
      moduleTitle: "Module 01: SQL Foundations & Query Execution Pipeline",
      icon: "🏛️",
      traps: [
        {
          id: "trap_sargability",
          title: "The SARGability Index Killer (Scalar Wrapping in WHERE)",
          severity: "FATAL",
          badSql: `-- ❌ WRONG: Scalar function wraps the indexed column
SELECT transaction_id, user_id, amount_usd
FROM Transactions
WHERE YEAR(created_at) = 2024;`,
          goodSql: `-- ✅ CORRECT: Keep indexed column raw; isolate the range
SELECT transaction_id, user_id, amount_usd
FROM Transactions
WHERE created_at >= '2024-01-01 00:00:00'
  AND created_at <  '2025-01-01 00:00:00';`,
          whyItBreaks: "B-Tree indexes store raw values of `created_at`. When you wrap it in `YEAR(created_at)`, the database engine cannot traverse the B-Tree leaf pages using an Index Seek. It is forced to perform a Full Table Scan (FTS), computing `YEAR()` for every single row on disk.",
          corporateImpact: "On a 50-million-row payments ledger, this increases query execution time from 4 milliseconds to 45 seconds, spiking database CPU to 100%."
        },
        {
          id: "trap_3vl_null_blackhole",
          title: "The Three-Valued Logic (3VL) NULL Black Hole",
          severity: "CRITICAL",
          badSql: `-- ❌ WRONG: Expecting to get all non-active users (including NULLs)
SELECT user_id, email, kyc_status
FROM Users
WHERE kyc_status != 'VERIFIED';
-- SILENT BUG: Omits all users where kyc_status IS NULL!`,
          goodSql: `-- ✅ CORRECT: Explicitly handle NULL using IS NULL or COALESCE
SELECT user_id, email, kyc_status
FROM Users
WHERE kyc_status != 'VERIFIED' OR kyc_status IS NULL;

-- Or alternatively:
SELECT user_id, email, kyc_status
FROM Users
WHERE COALESCE(kyc_status, 'UNVERIFIED') != 'VERIFIED';`,
          whyItBreaks: "In ANSI SQL, any comparison with NULL (`NULL != 'VERIFIED'`) evaluates to `UNKNOWN`, never `TRUE`. Because the WHERE clause strictly filters for rows where the predicate evaluates to `TRUE`, rows with `NULL` are silently discarded.",
          corporateImpact: "Compliance audits fail because newly registered unverified accounts with NULL status are omitted from fraud screening reports."
        },
        {
          id: "trap_where_alias_inaccessible",
          title: "The WHERE Column Alias Inaccessibility Error",
          severity: "HIGH",
          badSql: `-- ❌ WRONG: Attempting to filter on an alias created in SELECT
SELECT emp_id, salary, (salary * bonus_pct) AS net_bonus
FROM Employees
WHERE net_bonus > 5000;
-- Fails with: "Column 'net_bonus' does not exist"`,
          goodSql: `-- ✅ CORRECT: Repeat the calculation or wrap in a CTE
SELECT emp_id, salary, (salary * bonus_pct) AS net_bonus
FROM Employees
WHERE (salary * bonus_pct) > 5000;`,
          whyItBreaks: "Lexical order vs Physical execution order. The database engine executes `WHERE` (Step 02) BEFORE `SELECT` (Step 05). At the moment `WHERE` filters rows, the projection alias `net_bonus` has not been allocated in memory yet.",
          corporateImpact: "Query fails compilation in production reporting pipelines."
        },
        {
          id: "trap_float_rounding_financial",
          title: "Floating-Point Imprecision in Financial Balances",
          severity: "FATAL",
          badSql: `-- ❌ WRONG: Using FLOAT/DOUBLE PRECISION for currency
CREATE TABLE AccountBalances (
    account_id INT PRIMARY KEY,
    balance FLOAT -- Never use binary floating point for money!
);
-- 0.1 + 0.2 produces 0.30000000000000004`,
          goodSql: `-- ✅ CORRECT: Use exact numeric types with fixed scale
CREATE TABLE AccountBalances (
    account_id INT PRIMARY KEY,
    balance NUMERIC(18, 4) -- Exact decimal representation
);`,
          whyItBreaks: "Binary floating-point types (`FLOAT`, `DOUBLE`) cannot represent base-10 fractions (like 0.10 or 0.05) precisely in IEEE 754 format. Repeated rounding errors accumulate across millions of ledger transactions.",
          corporateImpact: "Auditors discover penny-rounding variances across quarterly balance sheets, triggering mandatory accounting restatements."
        }
      ],
      tipsAndTricks: [
        {
          id: "tip_execution_pipeline",
          title: "The Physical 6-Stage Execution Pipeline",
          concept: "Physical Execution Order",
          codeSnippet: `/* Physical Order of Execution:
   1. FROM & JOINs   --> Gathers base relational tuples
   2. WHERE          --> Eliminates non-qualifying raw rows
   3. GROUP BY       --> Collapses rows into aggregation buckets
   4. HAVING         --> Filters aggregated group metrics
   5. SELECT         --> Computes projections, aliases & scalar expressions
   6. DISTINCT       --> Deduplicates projected tuples
   7. ORDER BY       --> Physically sorts output records
   8. LIMIT / OFFSET --> Slices final window */`,
          explanation: "Remembering this order instantly explains why you can't use column aliases in WHERE, why HAVING is slower if WHERE could have pre-filtered, and why ORDER BY can access SELECT aliases.",
          analystValue: "Fundamental clarity in interview problem solving and debugging query errors."
        },
        {
          id: "tip_deterministic_pagination",
          title: "Deterministic Pagination with Primary Key Tie-Breakers",
          concept: "ORDER BY Stability",
          codeSnippet: `-- Always append a unique key as a tie-breaker when paginating:
SELECT customer_id, company_name, annual_revenue
FROM Customers
ORDER BY annual_revenue DESC, customer_id ASC
LIMIT 25 OFFSET 50;`,
          explanation: "If multiple customers share the exact same `annual_revenue`, sorting solely by `annual_revenue DESC` produces non-deterministic order. Rows can appear on both Page 2 and Page 3, or disappear completely.",
          analystValue: "Prevents ghost rows and missing records in customer-facing portal tables and exports."
        }
      ],
      interviewQuestions: [
        {
          id: "int_foundations_1",
          question: "Explain the difference between lexical syntax order and physical execution order in SQL. Why does referencing a SELECT alias in the WHERE clause fail?",
          difficulty: "L4 Data Analyst",
          testedConcept: "SQL Engine Execution Order",
          interviewerIntent: "Checking if the candidate actually understands how the database query engine compiles and runs code, or just writes syntax blindly.",
          spokenAnswer: "In ANSI SQL, lexical order is the written structure: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. However, the physical execution order begins with FROM to identify the data source, followed immediately by WHERE to filter individual rows before any projection occurs. Because SELECT runs in Step 5, column aliases defined in SELECT do not exist in memory when the WHERE clause executes in Step 2. To filter on that expression, we must either repeat the underlying formula or wrap the query in a CTE.",
          sqlSnippet: `WITH ComputedBonus AS (
    SELECT emp_id, salary, (salary * bonus_rate) AS bonus_amt
    FROM Employees
)
SELECT * FROM ComputedBonus WHERE bonus_amt > 10000;`
        },
        {
          id: "int_foundations_2",
          question: "What is Three-Valued Logic (3VL), and how does SQL treat NULL in boolean predicates?",
          difficulty: "L5 Senior Financial/Data Analyst",
          testedConcept: "ANSI 3VL Truth Tables",
          interviewerIntent: "Testing if the candidate knows why queries silently drop rows without raising an error.",
          spokenAnswer: "SQL operates on Three-Valued Logic: TRUE, FALSE, and UNKNOWN. NULL signifies missing or unknown data. Any comparison with NULL—such as `val = NULL`, `val != 10`, or `val > 0`—evaluates to UNKNOWN, not FALSE. In a WHERE or HAVING clause, a row is ONLY retained if the condition evaluates strictly to TRUE. Since UNKNOWN is not TRUE, records with NULL are silently excluded. The only valid way to test for NULL is using `IS NULL` or `IS NOT NULL`.",
          sqlSnippet: `-- Evaluates to UNKNOWN, returns 0 rows:
SELECT * FROM Table WHERE col = NULL;

-- Evaluates to TRUE/FALSE, correctly returns rows:
SELECT * FROM Table WHERE col IS NULL;`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // MODULE 02: Conditional Logic & CASE WHEN
    // -------------------------------------------------------------------------
    {
      moduleId: "mod_casewhen",
      moduleTitle: "Module 02: Conditional Logic & CASE WHEN Decision Trees",
      icon: "⚖️",
      traps: [
        {
          id: "trap_case_short_circuit_order",
          title: "The Premature Short-Circuit Trap in CASE Expressions",
          severity: "CRITICAL",
          badSql: `-- ❌ WRONG: General condition precedes specific condition
SELECT triangle_id, side_a, side_b, side_c,
  CASE 
    WHEN side_a = side_b OR side_b = side_c THEN 'Isosceles'
    WHEN side_a = side_b AND side_b = side_c THEN 'Equilateral' -- DEAD CODE!
    ELSE 'Scalene'
  END AS triangle_type
FROM Triangles;
-- BUG: Equilateral triangles (5,5,5) hit the first branch and get labeled 'Isosceles'!`,
          goodSql: `-- ✅ CORRECT: Most specific condition must be evaluated first
SELECT triangle_id, side_a, side_b, side_c,
  CASE 
    WHEN side_a + side_b <= side_c OR side_a + side_c <= side_b OR side_b + side_c <= side_a THEN 'Not A Triangle'
    WHEN side_a = side_b AND side_b = side_c THEN 'Equilateral'
    WHEN side_a = side_b OR side_b = side_c OR side_a = side_c THEN 'Isosceles'
    ELSE 'Scalene'
  END AS triangle_type
FROM Triangles;`,
          whyItBreaks: "`CASE WHEN` short-circuits from top to bottom. As soon as any `WHEN` condition evaluates to `TRUE`, the engine immediately returns that value and skips all subsequent branches.",
          corporateImpact: "Misclassifying customer risk tiers or invoice categories because broad criteria swallowed high-priority exceptions."
        },
        {
          id: "trap_case_missing_else_null",
          title: "The Implicit NULL Trap (Omitted ELSE Clause)",
          severity: "HIGH",
          badSql: `-- ❌ WRONG: Omitting the ELSE clause
SELECT account_id,
  CASE 
    WHEN balance >= 100000 THEN 'Platinum'
    WHEN balance >= 25000  THEN 'Gold'
    -- Missing ELSE!
  END AS tier_status
FROM Accounts;
-- Accounts under $25,000 silently receive NULL!`,
          goodSql: `-- ✅ CORRECT: Always supply an explicit ELSE fallback
SELECT account_id,
  CASE 
    WHEN balance >= 100000 THEN 'Platinum'
    WHEN balance >= 25000  THEN 'Gold'
    ELSE 'Standard'
  END AS tier_status
FROM Accounts;`,
          whyItBreaks: "In ANSI SQL, if no `WHEN` branch matches and no `ELSE` clause is specified, `CASE` defaults to returning `NULL`. This can corrupt downstream string concatenations or `GROUP BY` grouping sets.",
          corporateImpact: "Customer communication templates display 'Hello NULL member' or reporting dashboards drop accounts with blank tiers."
        },
        {
          id: "trap_case_simple_null_comparison",
          title: "Simple CASE NULL Comparison Failure",
          severity: "HIGH",
          badSql: `-- ❌ WRONG: Simple CASE syntax with NULL
SELECT order_id,
  CASE return_reason
    WHEN 'DEFECTIVE' THEN 'Quality Issue'
    WHEN NULL THEN 'No Return' -- DEAD BRANCH: return_reason = NULL is UNKNOWN!
    ELSE 'Other'
  END AS return_category
FROM Orders;`,
          goodSql: `-- ✅ CORRECT: Use Searched CASE with 'IS NULL'
SELECT order_id,
  CASE 
    WHEN return_reason = 'DEFECTIVE' THEN 'Quality Issue'
    WHEN return_reason IS NULL THEN 'No Return'
    ELSE 'Other'
  END AS return_category
FROM Orders;`,
          whyItBreaks: "A Simple CASE (`CASE col WHEN val`) evaluates equality as `col = val`. When `val` is `NULL`, `col = NULL` evaluates to `UNKNOWN`, so that branch will NEVER execute.",
          corporateImpact: "All non-returned orders fall through to 'Other' instead of 'No Return', distorting customer service metrics."
        }
      ],
      tipsAndTricks: [
        {
          id: "tip_single_pass_pivot",
          title: "Single-Pass Pivot via Conditional Aggregation",
          concept: "SUM(CASE WHEN ...)",
          codeSnippet: `-- Compute multiple department budgets in a single table scan:
SELECT 
    fiscal_year,
    SUM(CASE WHEN department = 'Sales'       THEN spend_amount ELSE 0 END) AS sales_spend,
    SUM(CASE WHEN department = 'Engineering' THEN spend_amount ELSE 0 END) AS eng_spend,
    SUM(CASE WHEN department = 'Marketing'   THEN spend_amount ELSE 0 END) AS mktg_spend
FROM DepartmentExpenses
GROUP BY fiscal_year;`,
          explanation: "Instead of running 3 separate queries or expensive multiple joins, embedding `CASE WHEN` inside `SUM()` calculates all categorical metrics in a single linear pass over the table.",
          analystValue: "Industry standard technique for building financial matrix models and executive P&L dashboards."
        },
        {
          id: "tip_safe_division_nullif",
          title: "Safe Division with NULLIF to Prevent Crash 500s",
          concept: "Zero-Division Shield",
          codeSnippet: `-- Protect against division by zero:
SELECT 
    product_id,
    revenue_usd,
    units_sold,
    revenue_usd / NULLIF(units_sold, 0) AS avg_selling_price
FROM SalesSummary;`,
          explanation: "If `units_sold` is 0, `NULLIF(units_sold, 0)` returns `NULL`. In SQL, any number divided by `NULL` safely yields `NULL` instead of throwing a fatal `Division by zero` error.",
          analystValue: "Guarantees automated daily ETL pipelines never crash due to a single zero-quantity line item."
        }
      ],
      interviewQuestions: [
        {
          id: "int_casewhen_1",
          question: "How do you calculate a conversion rate or percentage of total in a single SQL query without using subqueries?",
          difficulty: "L4 Business Analyst",
          testedConcept: "Conditional Aggregation",
          interviewerIntent: "Looking for elegance, performance awareness, and familiarity with SUM(CASE...) or AVG(CASE...).",
          spokenAnswer: "I use conditional aggregation by combining `AVG` or `SUM` with a `CASE WHEN` statement. For instance, to calculate the conversion rate of user signups, I write `AVG(CASE WHEN is_converted = 1 THEN 1.0 ELSE 0.0 END) * 100`. The engine evaluates each row, assigns a 1 or 0, and averages them in a single table scan without needing separate subqueries or CTE joins.",
          sqlSnippet: `SELECT 
    campaign_id,
    COUNT(*) AS total_leads,
    SUM(CASE WHEN status = 'CONVERTED' THEN 1 ELSE 0 END) AS converted_leads,
    ROUND(AVG(CASE WHEN status = 'CONVERTED' THEN 100.0 ELSE 0.0 END), 2) AS conversion_rate_pct
FROM CampaignLeads
GROUP BY campaign_id;`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // MODULE 03: Basic & Statistical Aggregations
    // -------------------------------------------------------------------------
    {
      moduleId: "mod_aggregations",
      moduleTitle: "Module 03: Basic & Statistical Aggregations (GROUP BY & HAVING)",
      icon: "📊",
      traps: [
        {
          id: "trap_count_star_vs_column",
          title: "The COUNT(*) vs COUNT(col) Cardinality Mismatch",
          severity: "FATAL",
          badSql: `-- ❌ WRONG: Assuming COUNT(commission) counts all sales reps
SELECT 
    department,
    COUNT(commission_pct) AS rep_count, -- Skips reps with NULL commission!
    AVG(commission_pct)   AS avg_commission
FROM SalesReps
GROUP BY department;`,
          goodSql: `-- ✅ CORRECT: Use COUNT(*) for row headcount; COUNT(col) for non-nulls
SELECT 
    department,
    COUNT(*)              AS total_sales_reps,
    COUNT(commission_pct) AS reps_with_commission,
    AVG(commission_pct)   AS avg_commission_of_eligible,
    -- If calculating average across ALL reps:
    AVG(COALESCE(commission_pct, 0.0)) AS blended_avg_commission
FROM SalesReps
GROUP BY department;`,
          whyItBreaks: "`COUNT(*)` measures the cardinality of the row set regardless of content. `COUNT(column_name)` strictly tallies non-NULL values. If 40 out of 100 reps have `commission_pct IS NULL`, `COUNT(commission_pct)` returns 60, not 100.",
          corporateImpact: "HR headcounts and commission payouts are severely understated, leading to payroll disputes."
        },
        {
          id: "trap_where_vs_having_filter_stage",
          title: "Filtering Non-Aggregates in HAVING (Engine Memory Bloat)",
          severity: "HIGH",
          badSql: `-- ❌ WRONG: Filtering row-level attributes in HAVING
SELECT department_id, SUM(salary) AS total_payroll
FROM Employees
GROUP BY department_id, is_active
HAVING is_active = 1 AND SUM(salary) > 500000;`,
          goodSql: `-- ✅ CORRECT: Filter raw rows in WHERE; filter group metrics in HAVING
SELECT department_id, SUM(salary) AS total_payroll
FROM Employees
WHERE is_active = 1
GROUP BY department_id
HAVING SUM(salary) > 500000;`,
          whyItBreaks: "The `WHERE` clause filters individual rows before grouping (Step 02), reducing the number of tuples sent into the hash aggregation table. `HAVING` filters aggregated buckets after grouping (Step 04). Filtering row attributes in `HAVING` forces the engine to hash and aggregate inactive rows unnecessarily.",
          corporateImpact: "Queries on large tables consume 5x more buffer RAM and trigger temporary disk spills."
        },
        {
          id: "trap_empty_set_sum_null",
          title: "The Empty Set Aggregate Nullity Trap",
          severity: "CRITICAL",
          badSql: `-- ❌ WRONG: Assuming SUM() on an empty table returns 0
SELECT SUM(transaction_amount) AS total_revenue
FROM Transactions
WHERE transaction_date = '2026-01-01'; -- Suppose 0 rows match!
-- Result is NULL, NOT 0! If added to another number (NULL + 500), result is NULL!`,
          goodSql: `-- ✅ CORRECT: Wrap aggregates in COALESCE when zero is required
SELECT COALESCE(SUM(transaction_amount), 0.00) AS total_revenue
FROM Transactions
WHERE transaction_date = '2026-01-01';`,
          whyItBreaks: "In ANSI SQL, while `COUNT(*)` on an empty set returns `0`, all other aggregate functions (`SUM`, `AVG`, `MIN`, `MAX`) return `NULL` when operating on zero rows.",
          corporateImpact: "Financial reconciliation formulas evaluate to NULL and break automated balance sheet rollups."
        }
      ],
      tipsAndTricks: [
        {
          id: "tip_coalesce_sum_vs_sum_coalesce",
          title: "Performance: COALESCE(SUM(col), 0) vs SUM(COALESCE(col, 0))",
          concept: "Scalar vs Row-Level Coalesce",
          codeSnippet: `-- ⚡ 10x FASTER: Coalesce the final scalar total once:
SELECT COALESCE(SUM(amount_usd), 0) FROM Ledger;

-- 🐢 SLOWER: Coalesces 10,000,000 rows individually during table scan:
SELECT SUM(COALESCE(amount_usd, 0)) FROM Ledger;`,
          explanation: "In SQL, `SUM()` automatically ignores NULLs. Calling `COALESCE` on 10 million rows forces the CPU to evaluate a function 10 million times. Calling `COALESCE(SUM(...), 0)` evaluates the function once on the final aggregated result.",
          analystValue: "Significant performance boost on large analytical tables in Snowflake, BigQuery, and PostgreSQL."
        }
      ],
      interviewQuestions: [
        {
          id: "int_aggregations_1",
          question: "What is the difference between WHERE and HAVING, and can an SQL query contain both? Give an example.",
          difficulty: "L4 Financial/Business Analyst",
          testedConcept: "WHERE vs HAVING Execution Boundaries",
          interviewerIntent: "Checking foundational query architecture and candidate's ability to structure business filtering logically.",
          spokenAnswer: "Yes, queries frequently use both. The `WHERE` clause filters individual raw records before any grouping takes place—for example, excluding cancelled orders. `GROUP BY` then aggregates the remaining records into buckets. Finally, `HAVING` filters those aggregated bucket summaries based on the result of an aggregate function—for example, keeping only stores whose total sales exceed $100,000. Filtering raw attributes in WHERE is always preferred because it shrinks the dataset before memory-intensive grouping.",
          sqlSnippet: `SELECT store_id, SUM(order_total) AS gross_sales
FROM Orders
WHERE order_status = 'COMPLETED' -- Step 02: Row filter
GROUP BY store_id                -- Step 03: Grouping
HAVING SUM(order_total) > 100000; -- Step 04: Aggregate filter`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // MODULE 04: Relational Multi-Table Joins (FA / DA / BA Masterclass)
    // -------------------------------------------------------------------------
    {
      moduleId: "mod_joins",
      moduleTitle: "Module 04: Relational Multi-Table Joins (FA / DA / BA Masterclass)",
      icon: "🔗",
      traps: [
        {
          id: "trap_outer_join_where_collapse",
          title: "The Outer Join WHERE Collapse Bug (Silently Converting LEFT to INNER)",
          severity: "FATAL",
          badSql: `-- ❌ WRONG: Filtering the right-hand table in the WHERE clause
SELECT c.customer_id, c.company_name, o.order_id, o.order_status
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_status = 'ACTIVE';
-- SILENT CATASTROPHE: Customers with ZERO orders have o.order_status = NULL.
-- In WHERE, NULL = 'ACTIVE' evaluates to UNKNOWN and is dropped!
-- This query acts exactly like an INNER JOIN! Customers without orders are lost!`,
          goodSql: `-- ✅ CORRECT: Place the right-table filter in the ON clause:
SELECT c.customer_id, c.company_name, o.order_id, o.order_status
FROM Customers c
LEFT JOIN Orders o 
  ON c.customer_id = o.customer_id
 AND o.order_status = 'ACTIVE';
-- Preserves ALL customers; order columns show NULL if no active order exists.`,
          whyItBreaks: "The `ON` condition determines which rows are matched before outer-join null-padding occurs. The `WHERE` clause runs AFTER the join has completed. Any condition in `WHERE` checking that a right-table column equals a literal value will evaluate to `UNKNOWN` on null-padded rows, immediately discarding them.",
          corporateImpact: "Churn analysis reports completely drop inactive customers who have made 0 purchases, skewing retention metrics by 30%."
        },
        {
          id: "trap_one_to_many_row_multiplier",
          title: "The 1-to-Many Fan-Out Balance Duplication Bug",
          severity: "FATAL",
          badSql: `-- ❌ WRONG: Joining parent table with multiple children before summing parent
SELECT 
    c.customer_id,
    c.credit_limit, -- Parent attribute
    SUM(c.credit_limit) AS total_credit_limit, -- MULTIPLIED!
    SUM(o.order_amount) AS total_spend
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.credit_limit;
-- If Customer A has 10 orders, their credit_limit is duplicated 10 times!`,
          goodSql: `-- ✅ CORRECT: Pre-aggregate the child table in a CTE before joining:
WITH OrderTotals AS (
    SELECT customer_id, SUM(order_amount) AS total_spend
    FROM Orders
    GROUP BY customer_id
)
SELECT 
    c.customer_id,
    c.credit_limit,
    COALESCE(ot.total_spend, 0.00) AS total_spend
FROM Customers c
LEFT JOIN OrderTotals ot ON c.customer_id = ot.customer_id;`,
          whyItBreaks: "A 1-to-Many relational join replicates the parent row for every matching child row. If you aggregate parent-level financial fields (e.g. credit limit, bank account balance) in the same query, those numbers multiply by the count of child records.",
          corporateImpact: "Company credit risk or total balance sheet assets are reported at 5x to 10x their actual value to executive leadership."
        },
        {
          id: "trap_not_in_null_subquery",
          title: "The NOT IN with NULL Subquery Catastrophe",
          severity: "FATAL",
          badSql: `-- ❌ WRONG: Using NOT IN against a subquery that could contain NULL
SELECT employee_id, first_name
FROM Employees
WHERE employee_id NOT IN (
    SELECT manager_id FROM Employees -- If even ONE manager_id is NULL (e.g. CEO)...
);
-- RETURNS ZERO ROWS! Entire query returns an empty set!`,
          goodSql: `-- ✅ CORRECT: Use NOT EXISTS or an Anti-Join:
SELECT e.employee_id, e.first_name
FROM Employees e
WHERE NOT EXISTS (
    SELECT 1 FROM Employees m WHERE m.manager_id = e.employee_id
);

-- Or idiomatic Left Anti-Join:
SELECT e.employee_id, e.first_name
FROM Employees e
LEFT JOIN Employees m ON e.employee_id = m.manager_id
WHERE m.manager_id IS NULL;`,
          whyItBreaks: "`val NOT IN (1, 2, NULL)` expands logically to: `val != 1 AND val != 2 AND val != NULL`. If `val != NULL` is UNKNOWN, the entire `AND` condition evaluates to UNKNOWN. Therefore, NO rows can ever satisfy the predicate.",
          corporateImpact: "Critical automated fraud detection or orphan-record alert queries silently return 0 results, allowing compliance breaches to go undetected."
        },
        {
          id: "trap_cartesian_cross_join_spill",
          title: "Missing Join Predicate Cartesian Spill",
          severity: "FATAL",
          badSql: `-- ❌ WRONG: Missing ON clause or comma-separated join without WHERE
SELECT p.portfolio_name, t.trade_id, t.trade_amount
FROM Portfolios p, Trades t;
-- 10,000 Portfolios * 1,000,000 Trades = 10 BILLION TUPLES!`,
          goodSql: `-- ✅ CORRECT: Always use explicit ANSI JOIN with ON condition
SELECT p.portfolio_name, t.trade_id, t.trade_amount
FROM Portfolios p
JOIN Trades t ON p.portfolio_id = t.portfolio_id;`,
          whyItBreaks: "Without an ON predicate, the engine must compute the Cartesian product ($N \times M$). This causes memory buffers to exhaust, fills temp tablespace on disk, and crashes database clusters.",
          corporateImpact: "Production database outage during month-end financial reporting window."
        }
      ],
      tipsAndTricks: [
        {
          id: "tip_why_right_join_banned",
          title: "Why Elite Engineering Teams Ban RIGHT JOIN",
          concept: "Code Readability & Clean Directionality",
          codeSnippet: `-- ❌ BANNED in most corporate style guides:
SELECT d.dept_name, e.emp_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id;

-- ✅ UNIVERSAL STANDARD: Re-order using LEFT JOIN:
SELECT d.dept_name, e.emp_name
FROM Departments d
LEFT JOIN Employees e ON d.dept_id = e.dept_id;`,
          explanation: "Humans read text from left-to-right. When building multi-table pipelines (joining 5 to 7 tables), mixing LEFT and RIGHT joins forces the reader to mentally reverse direction back and forth. Standardizing on LEFT JOIN guarantees consistent flow.",
          analystValue: "Instant peer review approval; adheres to Goldman Sachs, Google, and Amazon SQL style guides."
        },
        {
          id: "tip_anti_join_optimization",
          title: "The Anti-Join: Highest Performance Method to Find Missing Records",
          concept: "LEFT JOIN ... WHERE right.key IS NULL",
          codeSnippet: `-- Find all customers who have NEVER placed an order:
SELECT c.customer_id, c.company_name, c.created_at
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.customer_id IS NULL;`,
          explanation: "Database query planners recognize this pattern and convert it into a specialized physical 'Hash Anti-Join' or 'Null-Aware Anti-Join'. It stops probing the hash table as soon as a match is found, making it significantly faster than subqueries.",
          analystValue: "Standard corporate technique for customer churn, unused inventory, and missing payment audits."
        }
      ],
      interviewQuestions: [
        {
          id: "int_joins_1",
          question: "What are the three physical join algorithms used by relational database engines, and under what conditions does the optimizer select each one?",
          difficulty: "L5 Senior Financial/Data Analyst",
          testedConcept: "Physical Join Execution Mechanics",
          interviewerIntent: "Distinguishing between someone who merely memorized Venn diagrams and someone who understands engine performance at scale.",
          spokenAnswer: "The three algorithms are Nested Loop, Hash Join, and Sort-Merge Join. \n1. Nested Loop Join iterates through an outer driving table and performs an index seek on the inner table for each row. The optimizer chooses this when the outer table is small and the inner table has a B-Tree index on the join key.\n2. Hash Join reads the smaller table into memory, builds a hash table on the join key, and then streams the larger table to probe the hash buckets in O(1) time. The optimizer picks this for large unindexed equijoins in modern analytical systems.\n3. Sort-Merge Join sorts both tables by the join key and advances two pointers sequentially in a single linear pass. The optimizer selects this when data is already physically ordered by clustered indexes or for full outer joins.",
          sqlSnippet: `-- Force or inspect join algorithms via EXPLAIN ANALYZE:
EXPLAIN ANALYZE
SELECT c.name, o.total 
FROM Customers c 
JOIN Orders o ON c.id = o.customer_id;`
        },
        {
          id: "int_joins_2",
          question: "A financial analyst reports that joining the Accounts table to Transactions caused the total bank balance sum to jump from $10M to $48M. What caused this, and how do you fix it?",
          difficulty: "L4/L5 Financial Analyst",
          testedConcept: "1:N Join Fan-Out Duplication",
          interviewerIntent: "Verifying that the candidate has encountered real-world data reconciliation issues and knows how to avoid double-counting.",
          spokenAnswer: "This is a classic 1-to-Many fan-out bug. Because each Account can have multiple Transactions, the join replicates the Account row for every matching transaction. When the analyst summed `balance` from the Accounts table, each account balance was multiplied by its transaction count. To fix this, we should either aggregate Transactions in a CTE beforehand so it is 1-to-1 with Accounts before joining, or calculate the balance sum separately from transaction metrics.",
          sqlSnippet: `-- FIX: Pre-aggregate transactions before joining
WITH AggregatedTx AS (
    SELECT account_id, SUM(amount) AS total_transacted
    FROM Transactions
    GROUP BY account_id
)
SELECT 
    a.account_id,
    a.balance, -- Un-duplicated, accurate balance!
    COALESCE(tx.total_transacted, 0) AS total_transacted
FROM Accounts a
LEFT JOIN AggregatedTx tx ON a.account_id = tx.account_id;`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // MODULE 05: Subqueries & CTEs
    // -------------------------------------------------------------------------
    {
      moduleId: "mod_ctes",
      moduleTitle: "Module 05: Subqueries & CTEs (Common Table Expressions)",
      icon: "🧩",
      traps: [
        {
          id: "trap_correlated_subquery_perf",
          title: "The O(N²) Correlated Subquery Trap in Projections",
          severity: "HIGH",
          badSql: `-- ❌ WRONG: Correlated subquery in SELECT executed for EVERY row
SELECT 
    o.order_id,
    o.customer_id,
    o.order_amount,
    (SELECT AVG(sub.order_amount) 
     FROM Orders sub 
     WHERE sub.customer_id = o.customer_id) AS cust_avg_spend
FROM Orders o;
-- On 1,000,000 orders, the subquery executes 1,000,000 TIMES!`,
          goodSql: `-- ✅ CORRECT: Pre-compute in a CTE and JOIN, or use Window Functions:
-- Option A: Window Function (Best)
SELECT 
    order_id,
    customer_id,
    order_amount,
    AVG(order_amount) OVER (PARTITION BY customer_id) AS cust_avg_spend
FROM Orders;

-- Option B: Grouped CTE + JOIN
WITH CustAvg AS (
    SELECT customer_id, AVG(order_amount) AS avg_spend
    FROM Orders
    GROUP BY customer_id
)
SELECT o.order_id, o.customer_id, o.order_amount, ca.avg_spend
FROM Orders o
JOIN CustAvg ca ON o.customer_id = ca.customer_id;`,
          whyItBreaks: "A correlated subquery references columns from the outer query. The database engine must evaluate the inner subquery repeatedly for every single outer row ($O(N^2)$ algorithmic complexity).",
          corporateImpact: "Queries that take 2 seconds in testing take 3 hours in production when data scales."
        },
        {
          id: "trap_scalar_multi_row_exception",
          title: "The Scalar Subquery Multi-Row Crash",
          severity: "CRITICAL",
          badSql: `-- ❌ WRONG: Assuming subquery always returns a single scalar value
SELECT 
    department_id,
    department_name,
    (SELECT employee_name 
     FROM Employees e 
     WHERE e.department_id = d.department_id) AS lead_emp
FROM Departments d;
-- CRASH: If any department has more than 1 employee:
-- "ERROR: more than one row returned by a subquery used as an expression"`,
          goodSql: `-- ✅ CORRECT: Guarantee single row via LIMIT 1 or aggregate:
SELECT 
    d.department_id,
    d.department_name,
    (SELECT e.employee_name 
     FROM Employees e 
     WHERE e.department_id = d.department_id 
     ORDER BY hire_date ASC LIMIT 1) AS senior_lead_emp
FROM Departments d;`,
          whyItBreaks: "A subquery placed in a SELECT projection must be strictly scalar (evaluating to exactly 1 column and at most 1 row). If even a single department contains 2 matching records, the query crashes.",
          corporateImpact: "Unscheduled midnight pipeline failures when new data enters the warehouse."
        }
      ],
      tipsAndTricks: [
        {
          id: "tip_exists_vs_in",
          title: "Why EXISTS Beats IN for Semi-Joins",
          concept: "Short-Circuiting Semi-Join",
          codeSnippet: `-- ⚡ FASTER & NULL-SAFE:
SELECT customer_id, company_name
FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o 
    WHERE o.customer_id = c.customer_id 
      AND o.order_status = 'COMPLETED'
);`,
          explanation: "`EXISTS` utilizes a short-circuiting semi-join: the moment it encounters the very first matching record in the inner table, it returns TRUE and immediately terminates evaluation for that row. It never builds a full list in memory and is completely immune to NULL traps.",
          analystValue: "Massive performance optimization when checking for the existence of related records in high-volume tables."
        }
      ],
      interviewQuestions: [
        {
          id: "int_ctes_1",
          question: "When should you use a Common Table Expression (CTE) versus a Subquery or Temporary Table?",
          difficulty: "L4/L5 Data Analyst",
          testedConcept: "Query Readability & Execution Strategy",
          interviewerIntent: "Evaluating clean code discipline and awareness of query materialization.",
          spokenAnswer: "I use CTEs primarily for code readability and modularity. CTEs allow complex multi-step transformations to read sequentially from top to bottom like a recipe, rather than nesting subqueries inside subqueries which creates cognitive clutter. CTEs are also essential when recursive queries are required, such as organizational hierarchies. However, if an intermediate dataset needs to be indexed or referenced multiple times across completely separate queries, a Temporary Table is superior because it allows creating dedicated B-Tree indexes.",
          sqlSnippet: `WITH Step1_ActiveUsers AS (
    SELECT user_id, signup_date FROM Users WHERE status = 'ACTIVE'
),
Step2_FirstPurchases AS (
    SELECT u.user_id, MIN(o.order_date) AS first_order
    FROM Step1_ActiveUsers u
    JOIN Orders o ON u.user_id = o.customer_id
    GROUP BY u.user_id
)
SELECT * FROM Step2_FirstPurchases;`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // MODULE 06: Window Functions & Analytics
    // -------------------------------------------------------------------------
    {
      moduleId: "mod_window",
      moduleTitle: "Module 06: Window Functions & Analytical Partitioning",
      icon: "🪟",
      traps: [
        {
          id: "trap_window_default_framing",
          title: "The Default Window Framing Spike (RANGE vs ROWS)",
          severity: "HIGH",
          badSql: `-- ❌ SUBTLE BUG: Default frame in ORDER BY is RANGE, not ROWS
SELECT 
    transaction_date,
    amount,
    SUM(amount) OVER (ORDER BY transaction_date) AS running_total
FROM DailySales;
-- BUG: If multiple rows share the same transaction_date,
-- RANGE combines them and outputs the SAME total for all of them!`,
          goodSql: `-- ✅ CORRECT: Explicitly specify ROWS frame for true progressive running totals
SELECT 
    transaction_date,
    amount,
    SUM(amount) OVER (
        ORDER BY transaction_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM DailySales;`,
          whyItBreaks: "When an `ORDER BY` clause is present without an explicit frame, ANSI SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. `RANGE` groups identical values together as peers. `ROWS` treats every row as an independent physical step.",
          corporateImpact: "Daily cumulative cash flow charts show artificial stepped jumps instead of smooth progressive accumulations."
        },
        {
          id: "trap_window_in_where_clause",
          title: "Filtering Window Functions in WHERE (Syntax Error)",
          severity: "CRITICAL",
          badSql: `-- ❌ WRONG: Attempting to filter ROW_NUMBER directly in WHERE
SELECT employee_id, department_id, salary
FROM Employees
WHERE ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) <= 3;
-- FAILS: "Window functions are not allowed in WHERE clause"`,
          goodSql: `-- ✅ CORRECT: Wrap in a CTE or Subquery to filter in outer WHERE
WITH RankedSalaries AS (
    SELECT 
        employee_id, 
        department_id, 
        salary,
        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS sal_rank
    FROM Employees
)
SELECT employee_id, department_id, salary, sal_rank
FROM RankedSalaries
WHERE sal_rank <= 3;`,
          whyItBreaks: "In the physical execution pipeline, `WHERE` (Step 02) executes long before Window Functions (Step 05b). Window functions operate on the already-filtered result set, so their outputs do not exist yet when WHERE is evaluated.",
          corporateImpact: "Query compilation fails."
        }
      ],
      tipsAndTricks: [
        {
          id: "tip_deduplication_row_number",
          title: "Idempotent Data Deduplication via ROW_NUMBER()",
          concept: "Corporate Data Hygiene",
          codeSnippet: `-- Keep only the most recently updated record per customer:
WITH RankedAudit AS (
    SELECT 
        customer_id, 
        email, 
        phone, 
        updated_at,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY updated_at DESC, audit_id DESC
        ) AS rn
    FROM CustomerAuditLog
)
SELECT customer_id, email, phone, updated_at
FROM RankedAudit
WHERE rn = 1;`,
          explanation: "Unlike `DISTINCT` which only deduplicates if all columns match identically, `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` allows you to define business rules for which specific record survives (e.g. latest timestamp, highest ID).",
          analystValue: "Universal data cleansing pattern used in every modern data warehouse (dbt, Snowflake, Databricks)."
        }
      ],
      interviewQuestions: [
        {
          id: "int_window_1",
          question: "Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK(). In what scenario does choosing the wrong one cause business errors?",
          difficulty: "L4/L5 Financial Analyst",
          testedConcept: "Analytical Ranking Functions",
          interviewerIntent: "Checking candidate's precision with ties and ranking logic.",
          spokenAnswer: "`ROW_NUMBER()` assigns a unique consecutive integer (1, 2, 3...) to each row regardless of ties. `RANK()` assigns identical ranks to tied rows, but skips subsequent rank numbers (e.g. 1, 2, 2, 4). `DENSE_RANK()` assigns identical ranks to tied rows but never skips numbers (e.g. 1, 2, 2, 3).\nIf leadership asks for the 'Top 3 Highest Salaries' and multiple executives tie for 2nd place, `RANK()` would skip 3 and return only 1st and 2nd place salaries. Conversely, `ROW_NUMBER()` would arbitrarily assign one executive 2nd and the other 3rd based on non-deterministic row order. `DENSE_RANK()` is the only correct choice here.",
          sqlSnippet: `SELECT 
    emp_name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn,
    RANK()       OVER (ORDER BY salary DESC) AS rnk,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk
FROM ExecutiveComp;`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // MODULE 07: Database Architecture & Technical Interview Prep
    // -------------------------------------------------------------------------
    {
      moduleId: "mod_architecture",
      moduleTitle: "Module 07: Database Architecture & Technical Interview Compendium",
      icon: "🏛️",
      traps: [
        {
          id: "trap_index_seek_vs_scan_tipping_point",
          title: "The Index Tipping Point Trap (Why Index Seeks Become Slower)",
          severity: "HIGH",
          badSql: `-- Suppose an index exists on status:
SELECT * 
FROM Orders 
WHERE status = 'SHIPPED'; -- Suppose 85% of all orders are 'SHIPPED'!`,
          goodSql: `-- Query planner will deliberately IGNORE the index and do a Full Table Scan!
-- Why? An index seek requires:
-- 1. Read index leaf page -> 2. Read table data page (random I/O).
-- If matching >20% of table, sequential scan of data pages is 5x faster!`,
          whyItBreaks: "An index seek followed by a table lookup incurs random disk I/O. When a filter matches more than ~15-20% of the rows in a table (the 'tipping point'), sequential disk reads of contiguous pages in a Full Table Scan are significantly faster than random seeks.",
          corporateImpact: "Engineers waste hours adding indexes that the optimizer ignores, wondering why queries did not speed up."
        },
        {
          id: "trap_select_star_columnar_waste",
          title: "The SELECT * Cloud Billing Multiplier in Columnar Warehouses",
          severity: "FATAL",
          badSql: `-- ❌ CATASTROPHIC IN SNOWFLAKE / BIGQUERY:
SELECT * 
FROM EnterpriseTelemetry 
WHERE event_date = '2026-01-01';
-- Scans all 150 columns off cloud storage! Bills for 2 Terabytes!`,
          goodSql: `-- ✅ LEAN & CHEAP:
SELECT user_id, event_name, event_timestamp
FROM EnterpriseTelemetry 
WHERE event_date = '2026-01-01';
-- Scans only 3 column partitions. Bills for 40 Megabytes! (50x cost reduction)`,
          whyItBreaks: "Columnar databases (Snowflake, BigQuery, Redshift) store data column-by-column across micro-partitions. Pricing is directly tied to the total bytes scanned from storage. `SELECT *` forces the engine to read every unused column off disk.",
          corporateImpact: "Company receives an unexpected $25,000 monthly cloud data warehouse bill."
        }
      ],
      tipsAndTricks: [
        {
          id: "tip_covering_index",
          title: "Covering Indexes (Index-Only Scans via INCLUDE)",
          concept: "Zero Table I/O",
          codeSnippet: `-- Create a covering index:
CREATE INDEX idx_orders_covering 
ON Orders (customer_id, order_date) 
INCLUDE (total_amount);

-- This query satisfies all needed columns directly from the B-Tree leaf:
SELECT customer_id, order_date, total_amount
FROM Orders
WHERE customer_id = 9012;`,
          explanation: "By including `total_amount` in the index payload (`INCLUDE`), the database engine can resolve the entire query directly from the index without performing an extra lookup to the underlying table page (Index-Only Scan).",
          analystValue: "Reduces disk I/O to near-zero, delivering sub-millisecond API response times."
        }
      ],
      interviewQuestions: [
        {
          id: "int_arch_1",
          question: "Explain the four ACID properties in the context of a financial bank transfer. What happens if Atomicity or Durability fails?",
          difficulty: "L5 Senior Financial/Data Analyst",
          testedConcept: "ACID Database Transaction Guarantees",
          interviewerIntent: "Checking if candidate can relate engineering principles to corporate financial safety.",
          spokenAnswer: "ACID ensures reliable transaction processing. \n- Atomicity means all-or-nothing: if $500 is deducted from Account A, Account B must be credited in the same transaction. If the server crashes midway, the deduction rolls back completely so money is never lost.\n- Consistency ensures data integrity constraints are preserved—for example, an account balance cannot violate a CHECK constraint preventing negative funds.\n- Isolation ensures concurrent transfers do not interfere with each other, preventing race conditions like spending the same $500 twice.\n- Durability guarantees that once a transaction commits, the record is permanently written to non-volatile Write-Ahead Logs (WAL), surviving power outages.",
          sqlSnippet: `BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE account_id = 101;
UPDATE Accounts SET balance = balance + 500 WHERE account_id = 202;
COMMIT;`
        }
      ]
    }
  ]
};
