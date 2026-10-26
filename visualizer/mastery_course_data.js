// =============================================================================
// SQL MASTERY & TECHNICAL INTERVIEW COURSE COMPENDIUM DATA
// 10 Comprehensive Progressive Modules: Theory, Analogies, Traps, Tricks, Patterns & Cases
// =============================================================================

window.MASTERY_COURSE_DATA = [
  {
    "id": "topic_01_select_from",
    "seq": "01",
    "title": "SELECT & FROM",
    "shortName": "01. SELECT & FROM",
    "name": "The Starting Line: Inspecting Tables, Column Projections, Expressions & Aliases",
    "icon": "📖",
    "execRank": "Level 1: Foundation (Physical Step 05 / Logical Step 01)",
    "summary": "Master the absolute foundation of relational querying: table navigation, explicit column projection, dynamic math expressions, aliasing with AS, and set deduplication with DISTINCT.",
    "analogy": {
      "metaphor": "Ordering Customized Takeout from a Restaurant Menu",
      "story": "Imagine walking into a restaurant. The kitchen inventory holds 500 raw ingredients stored across refrigerators and shelves (the database table on disk). When you look at the printed menu (FROM Menu), you do not ask the chef to dump every raw onion, invoice, and cooking oil onto your plate. Instead, you order specifically: SELECT dish_name, price. The chef cooks and plates only what you requested, ignoring internal supplier IDs and refrigeration dates.",
      "takeaway": "In SQL, FROM locates the storage repository, while SELECT acts as the plating mechanism that sends only the desired attributes to your screen."
    },
    "svgDiagram": {
      "type": "projection",
      "sourceTable": {
        "name": "FROM Employees",
        "cols": [
          "id",
          "first_name",
          "department",
          "salary",
          "tenure"
        ],
        "rows": [
          [
            "101",
            "Ashley",
            "Analytics",
            "$115,000",
            "14 mos"
          ],
          [
            "102",
            "David",
            "Engineering",
            "$125,000",
            "36 mos"
          ],
          [
            "103",
            "Julia",
            "Analytics",
            "$92,000",
            "8 mos"
          ],
          [
            "104",
            "Kevin",
            "Finance",
            "$88,000",
            "22 mos"
          ]
        ]
      },
      "operation": "SELECT first_name, salary, salary/12 AS monthly_pay",
      "callout": {
        "badge": "Projection Engine",
        "text": "Drops unused columns (id, department, tenure) & calculates in-flight expression (salary/12) without altering disk storage."
      },
      "resultTable": {
        "name": "Result Set (3 Columns Projected)",
        "cols": [
          "first_name",
          "salary",
          "monthly_pay"
        ],
        "rows": [
          [
            "Ashley",
            "$115,000",
            "$9,583"
          ],
          [
            "David",
            "$125,000",
            "$10,417"
          ],
          [
            "Julia",
            "$92,000",
            "$7,667"
          ],
          [
            "Kevin",
            "$88,000",
            "$7,333"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. Relational Table Anatomy: Relations, Tuples, and Attributes",
        "body": "In relational database systems (RDBMS) like MySQL, PostgreSQL, and Snowflake, data is stored in **Relations (Tables)**.\n\n- **Table (Relation)**: A structured two-dimensional matrix containing rows and columns.\n- **Row (Tuple / Record)**: Represents a single instance of an entity (e.g., one employee, one transaction, one sensor ping).\n- **Column (Attribute / Field)**: Represents a specific property belonging to the entity (e.g., `first_name`, `salary`, `created_at`).\n\n```sql\n-- Every query requires at minimum: WHAT to see, and WHERE it lives\nSELECT column_1, column_2\nFROM table_name;\n```\n\nEvery SQL statement ends with a semicolon (`;`). While some command lines permit omission, in production enterprise scripting, multi-statement transactions, and stored procedures, the semicolon is mandatory."
      },
      {
        "title": "2. The Projection Engine: Why SELECT * is an Anti-Pattern",
        "body": "The asterisk (`*`) is wildcard shorthand instructing the database engine to retrieve **all columns** defined on the table schema.\n\n```sql\n-- Fetches every column\nSELECT * \nFROM Employees;\n```\n\n### Why Senior Engineers Ban `SELECT *` in Production:\n1. **Network & Buffer Bandwidth**: If a table has 45 columns including large `TEXT` or `JSON` blobs, `SELECT *` forces the database engine to stream gigabytes of unneeded bytes over the network socket.\n2. **Breaks Application Contracts**: If a DBA adds or removes a column in production, an application expecting a fixed array order will crash.\n3. **Columnar Warehouse Billing Multiplier**: In modern columnar databases (Snowflake, BigQuery, Redshift), storage is physically organized by columns. Pricing is billed per Terabyte scanned. Querying `SELECT *` reads all 50 column files off S3, multiplying cloud costs by 50x compared to `SELECT user_id, email`.\n\n```sql\n-- ✅ Production Best Practice: Always explicitly list the exact columns required\nSELECT first_name, department, salary\nFROM Employees;\n```"
      },
      {
        "title": "3. Column Aliasing with AS: Semantic Naming & Header Cleanliness",
        "body": "Raw database column names are often abbreviated or cryptic (e.g., `fn`, `dept_cd`, `sal_usd_m`). You can rename any projected column in your output set using the `AS` keyword:\n\n```sql\nSELECT \n  first_name AS employee_name,\n  department AS operational_division,\n  salary     AS base_annual_compensation\nFROM Employees;\n```\n\n- The `AS` keyword is technically optional in ANSI SQL (`SELECT first_name employee_name`), but omitting it is dangerous: if you accidentally forget a comma between two column names (`SELECT first_name department FROM ...`), SQL will treat `department` as an alias for `first_name` without throwing an error!\n- **Rule**: Always write `AS` explicitly for clarity and maintainability."
      },
      {
        "title": "4. Dynamic Expressions, String Concatenation & In-Flight Math",
        "body": "The `SELECT` clause is not limited to static column lookup—it is a full computational engine. You can execute arithmetic calculations, string operations, and date manipulations in-flight:\n\n```sql\nSELECT \n  first_name,\n  salary,\n  salary / 12                         AS monthly_gross_pay,\n  salary * 1.15                       AS salary_with_15pct_raise,\n  ROUND(salary / 2080, 2)             AS hourly_rate_standard,\n  CONCAT(first_name, ' (', department, ')') AS employee_badge_label\nFROM Employees;\n```\n\nThese computed expressions are calculated in memory during query execution; they **never alter the underlying table on disk**."
      },
      {
        "title": "5. Set Deduplication with DISTINCT",
        "body": "Relational databases often store entities where categorical attributes repeat across thousands of records. When you query categorical columns, `DISTINCT` eliminates identical rows from the output:\n\n```sql\n-- Returns only unique departments (e.g., 'Analytics', 'Engineering', 'Finance')\nSELECT DISTINCT department \nFROM Employees;\n```\n\n### Crucial Concept: Multi-Column Composite DISTINCT\nWhen multiple columns are specified, `DISTINCT` does **not** deduplicate column-by-column; it evaluates the **entire combination (tuple)**:\n\n```sql\nSELECT DISTINCT department, job_title \nFROM Employees;\n```\n\nIf the table has `('Engineering', 'Backend')` and `('Engineering', 'Frontend')`, **both rows are retained** because the pair is unique!"
      },
      {
        "title": "6. Modulo Arithmetic (MOD) & Deterministic Sampling",
        "body": "The Modulo operator (`MOD(n, m)` or `n % m`) returns the integer remainder after division.\n\n```sql\n-- Even ID numbers (remainder is 0 when divided by 2)\nSELECT id, first_name \nFROM Employees \nWHERE MOD(id, 2) = 0;\n\n-- Odd ID numbers (remainder is 1)\nSELECT id, first_name \nFROM Employees \nWHERE MOD(id, 2) = 1;\n```\n\n### Production Use Cases:\n1. **Systematic 10% Data Sampling**: `WHERE MOD(transaction_id, 10) = 0` extracts a deterministic 10% sample from a 100-million-row ledger without slow random number generators.\n2. **A/B Test Cohort Splitting**: `MOD(user_id, 3)` splits traffic cleanly into 3 deterministic cohorts (0 = Control, 1 = Variant A, 2 = Variant B)."
      }
    ],
    "traps": [
      {
        "id": "trap_select_trailing_comma",
        "title": "The Trailing Comma Syntax Crash",
        "severity": "HIGH",
        "badSql": "-- ❌ WRONG: Trailing comma before FROM clause\nSELECT \n  first_name, \n  department, \n  salary, \nFROM Employees;",
        "goodSql": "-- ✅ CORRECT: No comma after the final projected column\nSELECT \n  first_name, \n  department, \n  salary\nFROM Employees;",
        "whyItBreaks": "SQL parsing engines expect an identifier or expression after every comma. A comma immediately preceding the FROM keyword throws an unrecoverable syntax parse error (e.g., `ERROR 1064: You have an error in your SQL syntax near FROM`).",
        "corporateImpact": "Automated CI/CD data pipeline runs fail during nightly batch loads due to careless copy-pasting of column lists."
      },
      {
        "id": "trap_where_alias_inaccessible",
        "title": "The WHERE Column Alias Inaccessibility Error",
        "severity": "CRITICAL",
        "badSql": "-- ❌ WRONG: Attempting to filter on an alias created in SELECT\nSELECT \n  first_name, \n  salary * 0.15 AS bonus_amount\nFROM Employees\nWHERE bonus_amount > 15000;\n-- FAILS: \"Column 'bonus_amount' does not exist\"",
        "goodSql": "-- ✅ CORRECT: Repeat the underlying expression or wrap in a CTE\nSELECT \n  first_name, \n  salary * 0.15 AS bonus_amount\nFROM Employees\nWHERE (salary * 0.15) > 15000;",
        "whyItBreaks": "Physical Query Execution Order! The database engine executes `FROM` (Step 1) and `WHERE` (Step 2) long BEFORE `SELECT` (Step 5). At the moment `WHERE` evaluates rows, the alias `bonus_amount` has not been allocated in memory yet.",
        "corporateImpact": "Analysts waste hours debugging query compilation failures in executive reporting scripts."
      },
      {
        "id": "trap_select_star_cloud_waste",
        "title": "The Columnar SELECT * Billing Multiplier",
        "severity": "FATAL",
        "badSql": "-- ❌ CATASTROPHIC IN SNOWFLAKE / BIGQUERY:\nSELECT * \nFROM TelemetryEvents \nWHERE event_date = '2026-01-01';\n-- Scans all 120 columns off cloud storage! Bills for 3 Terabytes!",
        "goodSql": "-- ✅ LEAN & COST-EFFICIENT:\nSELECT user_id, event_type, created_at\nFROM TelemetryEvents \nWHERE event_date = '2026-01-01';\n-- Scans only 3 column partitions. Bills for 45 Megabytes (65x cost reduction)!",
        "whyItBreaks": "Columnar analytical warehouses store data column-by-column across compressed micro-partitions. Pricing is strictly tied to total bytes scanned from disk. `SELECT *` forces the storage engine to decompress and transfer every single unused column.",
        "corporateImpact": "An unexpected $30,000 cloud bill at month-end, triggering infrastructure budget freezes and architecture reviews."
      }
    ],
    "tricks": [
      {
        "id": "trick_execution_pipeline",
        "title": "The Physical 6-Stage Execution Pipeline",
        "concept": "Physical Execution Order",
        "codeSnippet": "/* Memory Hook: \"So Few Whales Gather Heavenly Ocean Lunches\"\n   1. FROM & JOINs   --> Identifies and gathers base relational tables\n   2. WHERE          --> Filters raw rows before grouping\n   3. GROUP BY       --> Collapses surviving rows into summary buckets\n   4. HAVING         --> Filters aggregated bucket summaries\n   5. SELECT         --> Computes projections, aliases & scalar expressions\n   6. DISTINCT       --> Eliminates identical surviving tuples\n   7. ORDER BY       --> Physically sorts output records\n   8. LIMIT / OFFSET --> Slices the final display window */",
        "explanation": "Remembering this sequence instantly explains why column aliases cannot be accessed in WHERE, why HAVING is slower when WHERE could have pre-filtered, and why ORDER BY can use SELECT aliases.",
        "analystValue": "Universal foundational mental model tested in every senior data engineering and analytics interview."
      },
      {
        "id": "trick_fast_row_count",
        "title": "Fast Data Sampling with MOD Parity",
        "concept": "Deterministic Hash/ID Sampling",
        "codeSnippet": "-- Extract an exact, deterministic 10% sample of orders:\nSELECT order_id, customer_id, total_amount\nFROM Orders\nWHERE MOD(order_id, 10) = 0;",
        "explanation": "Using modulo arithmetic on auto-incrementing or uniformly distributed numeric IDs yields a perfectly reproducible representative sample without invoking expensive non-deterministic functions like RAND().",
        "analystValue": "Accelerates ad-hoc analysis on multi-gigabyte datasets by 10x while maintaining statistical validity."
      }
    ],
    "patterns": [
      {
        "id": "pat_clean_projection",
        "title": "The Clean Projection Pattern",
        "formula": "SELECT col1, col2, (expression) AS clean_alias FROM Table;",
        "whenToUse": "When building production queries that feed dashboards, APIs, or downstream reporting pipelines.",
        "sqlTemplate": "SELECT \n  t.entity_id,\n  t.entity_name,\n  t.metric_value,\n  ROUND(t.metric_value * 1.0825, 2) AS metric_with_tax,\n  CURRENT_TIMESTAMP                AS query_executed_at\nFROM Entities t;",
        "explanation": "Combines explicit column naming, safe aliases, deterministic math, and execution timestamps into a production-ready contract."
      },
      {
        "id": "pat_composite_distinct",
        "title": "The Multi-Column Deduplication Pattern",
        "formula": "SELECT DISTINCT category, sub_category FROM Catalog;",
        "whenToUse": "When auditing category taxonomies, unique customer locations, or verifying relational grain.",
        "sqlTemplate": "SELECT DISTINCT \n  shipping_country, \n  shipping_state, \n  carrier_code\nFROM Shipments;",
        "explanation": "Extracts unique combinations of multi-attribute tuples, removing duplicate records across the entire composite key."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t1_1",
        "question": "What does the asterisk (*) represent in the query `SELECT * FROM Employees;`?",
        "options": [
          "Multiply all numeric values in the table by 1",
          "Select and display every column defined in the table schema",
          "Filter rows that have received a star employee rating",
          "Execute a full table backup to disk"
        ],
        "correct": 1,
        "explanation": "The asterisk (*) is wildcard shorthand meaning 'project every single attribute/column belonging to the table'."
      },
      {
        "id": "mcq_t1_2",
        "question": "Why does the query `SELECT first_name, salary * 0.1 AS bonus FROM Employees WHERE bonus > 5000;` fail with an error?",
        "options": [
          "You cannot multiply numbers inside a SELECT statement",
          "The WHERE clause executes in Step 02, before the SELECT clause creates the alias 'bonus' in Step 05",
          "The keyword AS is reserved strictly for table names",
          "SQL does not allow filtering on bonuses"
        ],
        "correct": 1,
        "explanation": "Physical execution order! The database runs FROM (1) and WHERE (2) before SELECT (5). At the moment WHERE evaluates rows, the projection alias 'bonus' does not yet exist."
      },
      {
        "id": "mcq_t1_3",
        "question": "What is the result of `SELECT DISTINCT country, city FROM Stores;` if the table contains two stores in 'USA, Austin' and one store in 'USA, Dallas'?",
        "options": [
          "1 row: USA, Austin",
          "2 rows: (USA, Austin) and (USA, Dallas)",
          "3 rows: (USA, Austin), (USA, Austin), (USA, Dallas)",
          "Syntax error because DISTINCT can only be applied to one column"
        ],
        "correct": 1,
        "explanation": "DISTINCT evaluates the entire composite pair (country, city). Since (USA, Austin) and (USA, Dallas) are distinct pairs, both are returned, while the second (USA, Austin) is deduplicated."
      },
      {
        "id": "mcq_t1_4",
        "question": "In modern cloud data warehouses like Snowflake and BigQuery, why is `SELECT *` considered a dangerous anti-pattern?",
        "options": [
          "Because SELECT * deletes data from storage",
          "Because columnar warehouses store data by column and bill users based on total bytes scanned off disk",
          "Because SELECT * only works in MySQL and is not valid ANSI SQL",
          "Because the asterisk operator locks all tables for exclusive writes"
        ],
        "correct": 1,
        "explanation": "Columnar databases charge for every byte read from storage. SELECT * forces the engine to scan all 50-100 columns off disk, inflating query costs by up to 50x compared to selecting only required columns."
      }
    ],
    "caseStudy": {
      "company": "Amazon",
      "icon": "📦",
      "role": "Business Intelligence & Operations Analyst",
      "badge": "Amazon Supply Chain",
      "title": "Active Customer Orders & Country Filtering",
      "scenario": "The Seattle logistics team is auditing international fulfillment performance. They need a clean list of unique customer IDs, shipping countries, and order amounts for all completed orders shipped to either the United States ('US') or Canada ('CA') where the total order value exceeds $250.00.",
      "schema": "Table: customer_orders\n+------------------+---------------+-----------------------------------------------+\n| Column           | Type          | Description                                   |\n+------------------+---------------+-----------------------------------------------+\n| order_id         | INT           | Primary Key (Unique order identifier)         |\n| customer_id      | INT           | Customer account ID                           |\n| shipping_country | VARCHAR(10)   | 2-letter ISO country code ('US', 'CA', 'UK')   |\n| order_amount     | DECIMAL(10,2) | Total order value in USD                      |\n| order_status     | VARCHAR(20)   | Current status ('PENDING', 'COMPLETED', etc.) |\n+------------------+---------------+-----------------------------------------------+",
      "challenge": "Write an optimized SQL query that returns distinct customer_id, shipping_country, and order_amount for completed US/CA orders over $250.00. Ensure column projection is lean and explicit.",
      "hints": [
        "Use SELECT DISTINCT to guarantee deduplicated customer records.",
        "Use single quotes for string literals ('US', 'CA', 'COMPLETED') and unquoted numbers for decimals (250.00).",
        "Wrap OR conditions in parentheses or use the IN ('US', 'CA') operator to maintain correct boolean precedence."
      ],
      "expectedSql": "SELECT DISTINCT \n  customer_id, \n  shipping_country, \n  order_amount\nFROM customer_orders\nWHERE shipping_country IN ('US', 'CA')\n  AND order_amount > 250.00\n  AND order_status = 'COMPLETED';"
    },
    "problem": {
      "title": "HackerRank Problem 01: Revising the Select Query I",
      "difficulty": "easy",
      "spec": "Query all columns for all American cities in the **CITY** table with populations larger than `100,000`. The CountryCode for America is `USA`.",
      "starterSql": "SELECT *\nFROM CITY\nWHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;",
      "targetTable": "CITY"
    },
    "interviewDefense": {
      "question": "Why does referencing a column alias created in the SELECT clause fail when used inside the WHERE clause? How does the database engine process this?",
      "difficulty": "L4 Data Analyst",
      "testedConcept": "Physical Execution Order vs Written Lexical Order",
      "interviewerIntent": "Checking if the candidate understands the internal query engine pipeline and tuple memory allocation, or merely writes syntax blindly.",
      "spokenAnswer": "In ANSI SQL, written syntax begins with SELECT, but physical execution begins with FROM in Step 1 to identify the relation, followed immediately by WHERE in Step 2 to filter rows. The SELECT clause does not execute until Step 5. Because aliases created in SELECT are only allocated in memory during Step 5, they do not exist when WHERE evaluates rows in Step 2. To filter on that expression, we must either repeat the underlying formula or encapsulate the query inside a CTE.",
      "codeSnippet": "WITH ComputedComp AS (\n  SELECT first_name, salary, (salary * 0.15) AS bonus\n  FROM Employees\n)\nSELECT * FROM ComputedComp WHERE bonus > 15000;",
      "powerKeywords": [
        "Physical Execution Order",
        "Tuple Memory Allocation",
        "Step 02 WHERE vs Step 05 SELECT",
        "CTE Encapsulation"
      ]
    }
  },
  {
    "id": "topic_02_where",
    "seq": "02",
    "title": "Filtering Rows with WHERE",
    "shortName": "02. Filtering with WHERE",
    "name": "Row-Level Filtering, Boolean Predicates, SARGability & 3-Valued Logic",
    "icon": "🎯",
    "execRank": "Level 2: Row Elimination (Physical Step 02 / Logical Step 02)",
    "summary": "Control which rows survive into the query pipeline using boolean operators, comparison bounds, text wildcards, SARGable indexes, and three-valued logic.",
    "analogy": {
      "metaphor": "The Nightclub Bouncer at the Entrance Door",
      "story": "Imagine a popular nightclub with 1,000 people waiting outside on the sidewalk (`FROM ClubQueue`). The bouncer (`WHERE`) stands at the velvet rope with a strict checklist. If someone is under 21, wearing flip-flops, or has no ID, they are rejected on the spot. Only the guests who pass the bouncer's checklist make it through the doors onto the dance floor (`SELECT`).",
      "takeaway": "The `WHERE` clause executes BEFORE columns are projected. Rows that evaluate to FALSE or UNKNOWN (NULL) are discarded immediately, saving database RAM and CPU."
    },
    "svgDiagram": {
      "type": "filter",
      "sourceTable": {
        "name": "FROM Employees (8 Rows)",
        "cols": [
          "first_name",
          "department",
          "salary",
          "status"
        ],
        "rows": [
          [
            "Ashley",
            "Analytics",
            "$115,000",
            "PASS"
          ],
          [
            "David",
            "Engineering",
            "$125,000",
            "FAIL (Dept)"
          ],
          [
            "Julia",
            "Analytics",
            "$92,000",
            "FAIL (Salary)"
          ],
          [
            "Belvet",
            "Analytics",
            "$97,000",
            "PASS"
          ]
        ]
      },
      "operation": "WHERE department = 'Analytics' AND salary >= 95000",
      "callout": {
        "badge": "Filter Gate (Step 02)",
        "text": "Evaluates boolean predicate per row. Non-matching rows & NULLs are discarded BEFORE columns are projected."
      },
      "resultTable": {
        "name": "Surviving Tuples (2 Passed Filter)",
        "cols": [
          "first_name",
          "department",
          "salary"
        ],
        "rows": [
          [
            "Ashley",
            "Analytics",
            "$115,000"
          ],
          [
            "Belvet",
            "Analytics",
            "$97,000"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. Boolean Predicates & The Filtering Gate",
        "body": "The `WHERE` clause accepts boolean conditions that evaluate to `TRUE`, `FALSE`, or `UNKNOWN` for every individual row:\n\n```sql\nSELECT first_name, department, salary\nFROM Employees\nWHERE salary >= 100000;\n```\n\nOnly rows where the predicate evaluates strictly to `TRUE` are passed to downstream operations. Rows that evaluate to `FALSE` or `UNKNOWN` are silently dropped."
      },
      {
        "title": "2. SARGability: The #1 Performance Rule for Database Indexes",
        "body": "**SARGable** stands for *Search Argument Able*. A query predicate is SARGable if the database engine can utilize an existing B-Tree Index Seek to pinpoint rows directly, instead of performing a slow Full Table Scan (FTS).\n\n```sql\n-- ❌ NON-SARGABLE: Wrapping the indexed column in a function prevents index usage!\nWHERE YEAR(created_at) = 2024;\n\n-- ✅ SARGABLE: Keeps the indexed column isolated; scans the index leaf pages in O(log N)\nWHERE created_at >= '2024-01-01 00:00:00'\n  AND created_at <  '2025-01-01 00:00:00';\n```"
      },
      {
        "title": "3. Compound Filtering & Operator Precedence (AND vs OR)",
        "body": "In SQL, `AND` has higher operator precedence than `OR` (similar to multiplication before addition in arithmetic).\n\n```sql\n-- ⚠️ DANGEROUS: Evaluates (country = 'CA' AND spend > 500) first!\nWHERE country = 'US' OR country = 'CA' AND spend > 500;\n-- BUG: Returns ALL US customers regardless of how much they spent!\n\n-- ✅ CORRECT: Use explicit parentheses to enforce intended evaluation order\nWHERE (country = 'US' OR country = 'CA') AND spend > 500;\n```"
      },
      {
        "title": "4. Set Inclusion (IN) and Continuous Range Filtering (BETWEEN)",
        "body": "- `IN ('val1', 'val2')`: Matches any value within a discrete list (syntactic sugar for multiple `OR` conditions).\n- `BETWEEN low AND high`: Matches inclusive continuous numeric or date ranges (`x >= low AND x <= high`).\n\n```sql\nSELECT first_name, salary\nFROM Employees\nWHERE department IN ('Analytics', 'Engineering')\n  AND salary BETWEEN 90000 AND 130000;\n```"
      },
      {
        "title": "5. Three-Valued Logic (3VL): The NULL Black Hole",
        "body": "SQL does not use two-valued boolean logic (True/False); it uses **Three-Valued Logic (3VL)**: `TRUE`, `FALSE`, and `UNKNOWN`.\n\n- `NULL` represents missing or unknown data.\n- Any standard comparison with `NULL` (e.g., `salary = NULL`, `status != 'ACTIVE'`) evaluates to `UNKNOWN`.\n- Because `WHERE` only retains rows that evaluate strictly to `TRUE`, rows with `NULL` are discarded.\n- **Rule**: Always check for missing values using `IS NULL` or `IS NOT NULL`."
      }
    ],
    "traps": [
      {
        "id": "trap_sargability",
        "title": "The SARGability Index Killer (Scalar Wrapping)",
        "severity": "FATAL",
        "badSql": "-- ❌ WRONG: Scalar function wraps the indexed column\nSELECT user_id, amount_usd\nFROM Transactions\nWHERE YEAR(created_at) = 2024;",
        "goodSql": "-- ✅ CORRECT: Keep indexed column raw; isolate the date range\nSELECT user_id, amount_usd\nFROM Transactions\nWHERE created_at >= '2024-01-01 00:00:00'\n  AND created_at <  '2025-01-01 00:00:00';",
        "whyItBreaks": "B-Tree indexes store raw values of `created_at`. Wrapping it in `YEAR()` forces the engine to perform a Full Table Scan (FTS), computing `YEAR()` for every single row on disk.",
        "corporateImpact": "On a 50-million-row ledger, query time explodes from 4 milliseconds to 45 seconds, pegging database CPU at 100%."
      },
      {
        "id": "trap_3vl_null_blackhole",
        "title": "The Three-Valued Logic (3VL) NULL Black Hole",
        "severity": "CRITICAL",
        "badSql": "-- ❌ WRONG: Expecting to get all non-active users (including NULLs)\nSELECT user_id, email, kyc_status\nFROM Users\nWHERE kyc_status != 'VERIFIED';\n-- SILENT BUG: Omits all users where kyc_status IS NULL!",
        "goodSql": "-- ✅ CORRECT: Explicitly handle NULL using IS NULL or COALESCE\nSELECT user_id, email, kyc_status\nFROM Users\nWHERE kyc_status != 'VERIFIED' OR kyc_status IS NULL;",
        "whyItBreaks": "In ANSI SQL, any comparison with NULL (`NULL != 'VERIFIED'`) evaluates to UNKNOWN. Because WHERE filters for TRUE, rows with NULL are silently discarded.",
        "corporateImpact": "Compliance audits fail because newly registered unverified accounts with NULL status are omitted from fraud screening reports."
      }
    ],
    "tricks": [
      {
        "id": "trick_safe_null_filter",
        "title": "Safe NULL Handling via COALESCE",
        "concept": "Three-Valued Logic Defense",
        "codeSnippet": "-- Safely match status while including NULL as unassigned:\nSELECT user_id, account_tier\nFROM Accounts\nWHERE COALESCE(account_tier, 'STANDARD') = 'STANDARD';",
        "explanation": "COALESCE substitutes a default literal value in-flight, preventing 3VL UNKNOWN evaluations from dropping uninitialized records.",
        "analystValue": "Standard defensive coding practice for analytics on legacy CRM databases with sparse data."
      }
    ],
    "patterns": [
      {
        "id": "pat_sargable_date",
        "title": "The SARGable Date-Window Pattern",
        "formula": "WHERE col >= 'START_DATE' AND col < 'END_DATE'",
        "whenToUse": "For all timestamp and date filtering on indexed tables.",
        "sqlTemplate": "SELECT transaction_id, amount\nFROM Transactions\nWHERE transaction_time >= '2026-01-01 00:00:00'\n  AND transaction_time <  '2026-02-01 00:00:00';",
        "explanation": "Guarantees index seeks while avoiding boundary-inclusive ambiguity on millisecond-level timestamps."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t2_1",
        "question": "What does the expression `WHERE kyc_status != 'APPROVED'` return for a row where `kyc_status` is `NULL`?",
        "options": [
          "TRUE (the row is included in the output)",
          "FALSE (the row is excluded)",
          "UNKNOWN (the row is excluded because WHERE requires TRUE)",
          "Syntax Error"
        ],
        "correct": 2,
        "explanation": "Under SQL 3-Valued Logic, any equality or inequality comparison with NULL evaluates to UNKNOWN. The WHERE clause only accepts TRUE, so the row is silently excluded."
      },
      {
        "id": "mcq_t2_2",
        "question": "Why is `WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'` preferred over `WHERE YEAR(created_at) = 2024`?",
        "options": [
          "YEAR() is only supported in MySQL, not PostgreSQL",
          "YEAR() prevents the database engine from using a B-Tree index seek (violates SARGability)",
          "The first syntax automatically deletes old data",
          "There is no difference; both execute at identical speeds"
        ],
        "correct": 1,
        "explanation": "Wrapping an indexed column in a function prevents B-Tree index seeks, forcing an expensive Full Table Scan across millions of rows."
      }
    ],
    "caseStudy": {
      "company": "Meta",
      "icon": "📱",
      "role": "Product Analytics & Growth Data Scientist",
      "badge": "Meta Growth & Integrity",
      "title": "A/B Test Cohort Allocation & Verified User Filtering",
      "scenario": "Meta is rolling out a new recommendation algorithm to 50% of users. Even user IDs receive Control (Version A), while odd user IDs receive Treatment (Version B). Extract unique user IDs and emails for all verified users in the treatment group.",
      "schema": "Table: users\n+-------------+--------------+---------------------------------+\n| Column      | Type         | Description                     |\n+-------------+--------------+---------------------------------+\n| user_id     | BIGINT       | Unique numerical identifier     |\n| email       | VARCHAR(100) | User contact address            |\n| is_verified | BOOLEAN      | Verification badge (TRUE/FALSE) |\n| country     | VARCHAR(50)  | Country of registration         |\n+-------------+--------------+---------------------------------+",
      "challenge": "Write a query retrieving distinct user_id and email for verified users assigned to Treatment (odd user_id).",
      "hints": [
        "Use MOD(user_id, 2) = 1 to isolate odd IDs.",
        "Filter is_verified = TRUE."
      ],
      "expectedSql": "SELECT DISTINCT user_id, email\nFROM users\nWHERE MOD(user_id, 2) = 1\n  AND is_verified = TRUE;"
    },
    "problem": {
      "title": "HackerRank Problem 02: Revising the Select Query II",
      "difficulty": "easy",
      "spec": "Query the **NAME** field for all American cities in the **CITY** table with populations larger than `120,000`. The CountryCode for America is `USA`.",
      "starterSql": "SELECT NAME\nFROM CITY\nWHERE COUNTRYCODE = 'USA' AND POPULATION > 120000;",
      "targetTable": "CITY"
    },
    "interviewDefense": {
      "question": "What is SARGability, and why does wrapping an indexed column in YEAR(created_at) = 2024 degrade query performance?",
      "difficulty": "L4 / L5 Analytics Engineer",
      "testedConcept": "SARGable Predicates & B-Tree Index Traversal",
      "interviewerIntent": "Evaluating if the candidate understands how database query planners utilize B-Tree index seeks versus full table scans.",
      "spokenAnswer": "SARGable stands for Search Argument Able. B-Tree indexes store raw values in sorted leaf pages. When you wrap a column in a scalar function like YEAR(created_at), the query optimizer cannot perform an Index Seek to traverse the B-Tree root-to-leaf in O(log N) time. It is forced to evaluate YEAR() on every single row via an expensive Full Table Scan. The SARGable fix is to isolate the raw column using boundary ranges: created_at >= '2024-01-01' AND created_at < '2025-01-01'.",
      "codeSnippet": "-- ✅ SARGABLE: Traverses B-Tree in O(log N) seeks:\nSELECT user_id, amount\nFROM Transactions\nWHERE created_at >= '2024-01-01 00:00:00'\n  AND created_at <  '2025-01-01 00:00:00';",
      "powerKeywords": [
        "SARGable Predicate",
        "B-Tree Index Seek",
        "Full Table Scan (FTS)",
        "Boundary Range Isolation"
      ]
    }
  },
  {
    "id": "topic_03_order_limit",
    "seq": "03",
    "title": "Sorting & Limiting (ORDER BY & LIMIT)",
    "shortName": "03. ORDER BY & LIMIT",
    "name": "Sorting Mechanics, Multi-Column Tie-Breakers & High-Performance Pagination",
    "icon": "📊",
    "execRank": "Level 3: Windowing & Sorting (Physical Steps 07 & 08)",
    "summary": "Master physical result sorting, deterministic tie-breaking, ascending vs descending order, NULL placement, and pagination limits.",
    "analogy": {
      "metaphor": "The Olympic Sprint Leaderboard & Podium",
      "story": "In an Olympic 100m sprint, all 8 runners cross the finish line. The judges don't award medals in the order runners registered. First, they sort the leaderboard by finish time from fastest to slowest (`ORDER BY time ASC`). If two sprinters tie at 9.85 seconds, the judges look at microsecond photo-finish camera feeds (`tie-breaker`). Finally, they award medals strictly to the top 3 (`LIMIT 3`), ignoring ranks 4 through 8.",
      "takeaway": "`ORDER BY` determines the sorting direction, tie-breakers prevent random ordering, and `LIMIT` trims the final result set for screen presentation."
    },
    "svgDiagram": {
      "type": "sort",
      "sourceTable": {
        "name": "Surviving Rows (Unsorted)",
        "cols": [
          "first_name",
          "department",
          "salary"
        ],
        "rows": [
          [
            "Kevin",
            "Finance",
            "$88,000"
          ],
          [
            "Samantha",
            "Engineering",
            "$145,000"
          ],
          [
            "Ashley",
            "Analytics",
            "$115,000"
          ],
          [
            "David",
            "Engineering",
            "$125,000"
          ]
        ]
      },
      "operation": "ORDER BY salary DESC LIMIT 3",
      "callout": {
        "badge": "Sort Buffer & Slicing",
        "text": "Sorts surviving rows descending by salary. LIMIT short-circuits display pipeline once top 3 rows are delivered."
      },
      "resultTable": {
        "name": "Top 3 Earners Podium",
        "cols": [
          "Rank",
          "first_name",
          "department",
          "salary"
        ],
        "rows": [
          [
            "#1",
            "Samantha",
            "Engineering",
            "$145,000"
          ],
          [
            "#2",
            "David",
            "Engineering",
            "$125,000"
          ],
          [
            "#3",
            "Ashley",
            "Analytics",
            "$115,000"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. The Physics of Sorting: In-Memory Quicksort vs Disk Spills",
        "body": "Relational tables have no inherent order. Without an `ORDER BY` clause, the database engine returns rows in arbitrary physical storage order. When `ORDER BY` is requested, the engine allocates a temporary Sort Buffer in RAM. If the dataset exceeds buffer memory, the engine spills temporary chunks to disk and merges them, increasing execution time by 10x."
      },
      {
        "title": "2. Multi-Column Sorting & Deterministic Tie-Breaking",
        "body": "When multiple rows possess identical values in the primary sort column, their relative order is completely random unless a secondary tie-breaker is provided:\n\n```sql\n-- ✅ Deterministic: Sorts by department, then breaks ties by salary descending\nSELECT first_name, department, salary\nFROM Employees\nORDER BY department ASC, salary DESC, id ASC;\n```"
      },
      {
        "title": "3. Slicing with LIMIT and OFFSET (Pagination)",
        "body": "- `LIMIT N`: Restricts output to at most $N$ rows.\n- `OFFSET M`: Skips the first $M$ rows before emitting results.\n\n```sql\n-- Page 2 of a 20-item leaderboard:\nSELECT user_id, score\nFROM Leaderboard\nORDER BY score DESC, user_id ASC\nLIMIT 20 OFFSET 20;\n```"
      }
    ],
    "traps": [
      {
        "id": "trap_non_deterministic_pagination",
        "title": "Non-Deterministic Pagination Ghost Rows",
        "severity": "CRITICAL",
        "badSql": "-- ❌ WRONG: Sorting solely by non-unique column in pagination\nSELECT customer_id, annual_spend\nFROM Customers\nORDER BY annual_spend DESC\nLIMIT 25 OFFSET 25;\n-- BUG: If 40 customers share annual_spend = $1,000, rows duplicate or vanish across pages!",
        "goodSql": "-- ✅ CORRECT: Always append a unique primary key as the final tie-breaker\nSELECT customer_id, annual_spend\nFROM Customers\nORDER BY annual_spend DESC, customer_id ASC\nLIMIT 25 OFFSET 25;",
        "whyItBreaks": "Without a deterministic tie-breaker, the engine's internal sorting algorithm does not guarantee row order across independent query executions.",
        "corporateImpact": "Customers viewing paginated invoice tables see duplicate invoices on Page 2 and missing invoices on Page 3, triggering customer support escalations."
      }
    ],
    "tricks": [
      {
        "id": "trick_keyset_pagination",
        "title": "Keyset / Seek Pagination for Deep Scrolling",
        "concept": "O(1) Pagination vs O(N) OFFSET",
        "codeSnippet": "-- ⚡ FAST: Index Seek directly to next batch\nSELECT id, title, created_at\nFROM Articles\nWHERE id > 10542\nORDER BY id ASC\nLIMIT 20;",
        "explanation": "Avoids scanning and discarding 500,000 rows on disk when users scroll deep into feeds.",
        "analystValue": "Essential for building infinite-scroll mobile feeds and high-throughput data APIs."
      }
    ],
    "patterns": [
      {
        "id": "pat_top_n_leaderboard",
        "title": "The Deterministic Top-N Pattern",
        "formula": "ORDER BY metric DESC, primary_key ASC LIMIT N;",
        "whenToUse": "For leaderboards, top customers, and performance rankings.",
        "sqlTemplate": "SELECT entity_id, metric_score\nFROM Leaderboard\nORDER BY metric_score DESC, entity_id ASC\nLIMIT 10;",
        "explanation": "Guarantees 100% stable rankings even during ties."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t3_1",
        "question": "What happens if you run a paginated query with `OFFSET 50000 LIMIT 20`?",
        "options": [
          "The database instantly jumps to row 50000 in zero milliseconds",
          "The database reads 50,020 rows off disk, discards the first 50,000, and returns only 20 rows",
          "The database throws a syntax error because OFFSET cannot exceed 1000",
          "The database creates a temporary table with 20 rows"
        ],
        "correct": 1,
        "explanation": "Standard OFFSET pagination forces the storage engine to scan and discard all preceding rows, causing severe performance degradation on large offsets."
      }
    ],
    "caseStudy": {
      "company": "Spotify",
      "icon": "🎧",
      "role": "Music Streaming & Artist Analytics",
      "badge": "Spotify Content Intelligence",
      "title": "Top 5 Most Streamed Tracks of the Year",
      "scenario": "Extract the top 5 most streamed songs released in 2024. Return track name, artist name, and stream count ordered from most to least streamed. If stream counts tie, sort alphabetically by track name.",
      "schema": "Table: tracks\n+--------------+--------------+-----------------------------+\n| Column       | Type         | Description                 |\n+--------------+--------------+-----------------------------+\n| track_id     | INT          | Primary key                 |\n| track_name   | VARCHAR(100) | Song title                  |\n| artist_name  | VARCHAR(100) | Performer name              |\n| stream_count | BIGINT       | Total stream count          |\n| release_year | INT          | Year of track release       |\n+--------------+--------------+-----------------------------+",
      "challenge": "Write a query returning the Top 5 tracks of 2024 with deterministic tie-breaking.",
      "hints": [
        "Filter release_year = 2024.",
        "ORDER BY stream_count DESC, track_name ASC.",
        "LIMIT 5."
      ],
      "expectedSql": "SELECT track_name, artist_name, stream_count\nFROM tracks\nWHERE release_year = 2024\nORDER BY stream_count DESC, track_name ASC\nLIMIT 5;"
    },
    "problem": {
      "title": "HackerRank Problem 08: Weather Observation Station 5",
      "difficulty": "easy",
      "spec": "Query the two cities in **STATION** with the shortest and longest **CITY** names, as well as their respective lengths (i.e.: number of characters in the name). If there is more than one smallest or largest city, choose the one that comes first when ordered alphabetically.",
      "starterSql": "-- Shortest:\nSELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) ASC, CITY ASC LIMIT 1;\n-- Longest:\nSELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) DESC, CITY ASC LIMIT 1;",
      "targetTable": "STATION"
    },
    "interviewDefense": {
      "question": "Why does paginating a million-row table using LIMIT 20 OFFSET 500000 become progressively slower, and how do senior engineers fix it?",
      "difficulty": "L5 Senior Data / Backend Engineer",
      "testedConcept": "Offset Thrashing vs Keyset (Seek) Pagination",
      "interviewerIntent": "Testing knowledge of database buffer memory, disk I/O on large offsets, and deterministic cursor pagination.",
      "spokenAnswer": "Standard OFFSET pagination requires the storage engine to read and sort all 500,020 rows off disk, discard the first 500,000 in memory, and deliver only the final 20. As the offset increases, I/O cost scales linearly. The senior solution is Keyset or Seek Pagination: instead of OFFSET, we filter using the primary key of the last seen record, such as WHERE id > last_seen_id ORDER BY id ASC LIMIT 20. This converts an O(N) scan into an instantaneous O(log N) B-Tree seek.",
      "codeSnippet": "-- ⚡ FAST: Index Seek directly to next batch:\nSELECT id, title, created_at\nFROM Articles\nWHERE id > 500000\nORDER BY id ASC\nLIMIT 20;",
      "powerKeywords": [
        "Keyset / Seek Pagination",
        "Offset Thrashing",
        "Deterministic B-Tree Seek",
        "O(log N) Cursor"
      ]
    }
  },
  {
    "id": "topic_04_aggregates",
    "seq": "04",
    "title": "Summarizing Data (Aggregates)",
    "shortName": "04. Aggregates",
    "name": "Summarizing Data: Scalar Reductions, NULL Handling & Cardinality",
    "icon": "📈",
    "execRank": "Level 4: Scalar Reduction (Physical Step 05)",
    "summary": "Collapse millions of detailed rows into high-level business metrics using COUNT, SUM, AVG, MIN, MAX, and deduplicated counts.",
    "analogy": {
      "metaphor": "The Grocery Store Cash Register Receipt",
      "story": "You push a shopping cart with 30 individual items up to the checkout counter. The cashier doesn't hand you 30 separate bills. The register scans every item and prints a single summary tape: Total Item Count (`COUNT`), Total Money Due (`SUM`), Average Item Price (`AVG`), and Most Expensive Luxury Item (`MAX`). Thirty rows of purchases are condensed into four executive metrics.",
      "takeaway": "Aggregate functions fuse multiple rows into a single summary scalar, automatically ignoring NULL values."
    },
    "svgDiagram": {
      "type": "aggregate",
      "sourceTable": {
        "name": "Detailed Payroll Ledger (6 Rows)",
        "cols": [
          "first_name",
          "department",
          "salary"
        ],
        "rows": [
          [
            "Ashley",
            "Analytics",
            "$115,000"
          ],
          [
            "David",
            "Engineering",
            "$125,000"
          ],
          [
            "Samantha",
            "Engineering",
            "$145,000"
          ],
          [
            "Kevin",
            "Finance",
            "$88,000"
          ]
        ]
      },
      "operation": "COUNT(*), SUM(salary), AVG(salary), MAX(salary)",
      "callout": {
        "badge": "Scalar Reduction",
        "text": "Condenses 6 rows into 1 summary row. Calculates headcount, sum, mean, and extremes while ignoring NULLs."
      },
      "resultTable": {
        "name": "Executive Summary KPI Card",
        "cols": [
          "Headcount",
          "Total Payroll",
          "Average Salary",
          "Max Earner"
        ],
        "rows": [
          [
            "6 Reps",
            "$673,000",
            "$112,167",
            "$145,000"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. The Scalar Collapse: How Aggregates Transform Row Sets",
        "body": "Aggregate functions take a collection of values and return a single scalar summary value. In SQL, aggregates ignore `NULL` values automatically, except for `COUNT(*)` which counts all rows regardless of content."
      },
      {
        "title": "2. COUNT(*) vs COUNT(column_name): The Critical Difference",
        "body": "- `COUNT(*)`: Measures the cardinality of the table. Counts every row, including rows with NULL attributes.\n- `COUNT(column_name)`: Counts only rows where `column_name` is NOT NULL.\n- `COUNT(DISTINCT column_name)`: Counts unique non-null values."
      },
      {
        "title": "3. The Empty-Set NULL Behavior",
        "body": "When an aggregate query matches zero rows:\n- `COUNT(*)` returns `0`.\n- `SUM()`, `AVG()`, `MIN()`, and `MAX()` return `NULL`!\n- **Defense**: Wrap financial aggregates in `COALESCE(SUM(amount), 0.00)` to prevent breaking arithmetic."
      }
    ],
    "traps": [
      {
        "id": "trap_count_star_vs_column",
        "title": "The COUNT(*) vs COUNT(col) Cardinality Mismatch",
        "severity": "FATAL",
        "badSql": "-- ❌ WRONG: Assuming COUNT(commission) counts all sales reps\nSELECT department, COUNT(commission_pct) AS total_reps\nFROM SalesReps\nGROUP BY department;\n-- BUG: Reps with NULL commission are completely omitted from the headcount!",
        "goodSql": "-- ✅ CORRECT: Use COUNT(*) for row headcount; COUNT(col) for non-null tallies\nSELECT department, COUNT(*) AS total_reps, COUNT(commission_pct) AS reps_with_commission\nFROM SalesReps\nGROUP BY department;",
        "whyItBreaks": "`COUNT(column_name)` skips NULLs. If 40 out of 100 reps have NULL commission, `COUNT(commission_pct)` returns 60, not 100.",
        "corporateImpact": "Headcount reports understate company staffing, leading to budget and payroll allocation errors."
      }
    ],
    "tricks": [
      {
        "id": "trick_coalesce_sum",
        "title": "Scalar Coalesce: COALESCE(SUM(col), 0)",
        "concept": "Performance & Zero-Safety",
        "codeSnippet": "-- ⚡ FASTER: Coalesce scalar output once\nSELECT COALESCE(SUM(amount_usd), 0.00) AS total_revenue\nFROM Ledger;",
        "explanation": "Evaluating COALESCE on the final scalar total evaluates the function once, whereas SUM(COALESCE(col, 0)) evaluates it for every row scanned.",
        "analystValue": "Substantial performance boost on multi-million row financial ledgers."
      }
    ],
    "patterns": [
      {
        "id": "pat_data_quality_audit",
        "title": "The Data Quality Deduplication Audit Pattern",
        "formula": "SELECT COUNT(*) - COUNT(DISTINCT key) AS duplicate_count FROM Table;",
        "whenToUse": "To verify table primary key integrity and detect duplicate ingestions.",
        "sqlTemplate": "SELECT \n  COUNT(*) AS total_records,\n  COUNT(DISTINCT order_id) AS unique_orders,\n  COUNT(*) - COUNT(DISTINCT order_id) AS duplicate_records\nFROM StagingOrders;",
        "explanation": "Instantly reports whether a staging table has duplicate keys before production ingestion."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t4_1",
        "question": "What is the result of `SELECT SUM(amount) FROM Orders WHERE order_date = '1900-01-01';` if zero orders match?",
        "options": [
          "0",
          "NULL",
          "Syntax Error",
          "-1"
        ],
        "correct": 1,
        "explanation": "In ANSI SQL, SUM, AVG, MIN, and MAX return NULL when matching zero rows. Only COUNT(*) returns 0."
      }
    ],
    "caseStudy": {
      "company": "Airbnb",
      "icon": "🏡",
      "role": "Marketplace Dynamics & Pricing Analyst",
      "badge": "Airbnb Host Intelligence",
      "title": "Marketplace Inventory & Price Spread Audit",
      "scenario": "The San Francisco market team needs a summary of active listings in California. Calculate total active listings, unique host count, average nightly price, and the price spread (max price minus min price).",
      "schema": "Table: listings\n+-----------------+---------------+-------------------------+\n| Column          | Type          | Description             |\n+-----------------+---------------+-------------------------+\n| listing_id      | BIGINT        | Unique property ID      |\n| host_id         | BIGINT        | Host ID                 |\n| state           | VARCHAR(2)    | State code ('CA')       |\n| price_per_night | DECIMAL(10,2) | Nightly price in USD    |\n| is_active       | BOOLEAN       | Active status flag      |\n+-----------------+---------------+-------------------------+",
      "challenge": "Write a query returning total listings, unique hosts, average price, and max-min price spread for active CA listings.",
      "hints": [
        "Filter state = 'CA' AND is_active = TRUE.",
        "Use COUNT(DISTINCT host_id).",
        "MAX(price) - MIN(price)."
      ],
      "expectedSql": "SELECT \n  COUNT(*)                              AS total_listings,\n  COUNT(DISTINCT host_id)               AS unique_hosts,\n  ROUND(AVG(price_per_night), 2)        AS avg_price,\n  MAX(price_per_night) - MIN(price_per_night) AS price_spread\nFROM listings\nWHERE state = 'CA' AND is_active = TRUE;"
    },
    "problem": {
      "title": "HackerRank Problem 15: Weather Observation Station 4",
      "difficulty": "easy",
      "spec": "Find the difference between the total number of **CITY** entries in the table and the number of distinct **CITY** entries in the table.",
      "starterSql": "SELECT COUNT(CITY) - COUNT(DISTINCT CITY)\nFROM STATION;",
      "targetTable": "STATION"
    },
    "interviewDefense": {
      "question": "What is the difference between COUNT(*), COUNT(col), and COUNT(DISTINCT col), and what does SUM() return when matching zero rows?",
      "difficulty": "L4 Financial / Business Analyst",
      "testedConcept": "Set Cardinality, NULL Omission & Empty-Set Nullity",
      "interviewerIntent": "Verifying cardinality calculations, NULL tolerance in aggregates, and defensive zero-safe handling in financial queries.",
      "spokenAnswer": "COUNT(*) measures the cardinality of the row set regardless of NULL values. COUNT(column) strictly tallies rows where that column is NOT NULL, while COUNT(DISTINCT column) returns unique non-null values. Crucially, on an empty match set, COUNT(*) returns 0, but all other aggregates—SUM, AVG, MIN, MAX—return NULL. Therefore, in financial reporting, we always wrap numeric sums in COALESCE(SUM(amount), 0.00) to prevent NULL propagation in downstream additions.",
      "codeSnippet": "-- Zero-Safe Financial Aggregation:\nSELECT \n  department,\n  COUNT(*) AS total_headcount,\n  COALESCE(SUM(bonus), 0.00) AS total_bonus_payout\nFROM SalesReps\nGROUP BY department;",
      "powerKeywords": [
        "Set Cardinality",
        "NULL Omission",
        "Empty-Set Nullity",
        "Zero-Safe COALESCE Wrap"
      ]
    }
  },
  {
    "id": "topic_05_groupby_having",
    "seq": "05",
    "title": "Grouping Data (GROUP BY & HAVING)",
    "shortName": "05. GROUP BY & HAVING",
    "name": "Partitioning Data: Group Buckets, Aggregation Boundaries & Group Filters",
    "icon": "📦",
    "execRank": "Level 5: Bucketing & Partitioning (Physical Steps 03 & 04)",
    "summary": "Partition datasets into categorical buckets, calculate group-level statistics, and filter grouped summaries using HAVING.",
    "analogy": {
      "metaphor": "Sorting Laundry into Colored Baskets",
      "story": "You dump all laundry on the bedroom floor (`FROM Laundry`). Instead of counting all shirts at once, you set out 3 labeled plastic baskets (`GROUP BY color`): Whites, Darks, and Delicates. You sort every shirt into its matching basket, count the shirts in each basket, and then discard baskets that have fewer than 3 items (`HAVING COUNT(*) >= 3`).",
      "takeaway": "`GROUP BY` partitions rows into buckets; `HAVING` filters the bucket summaries after aggregation."
    },
    "svgDiagram": {
      "type": "group",
      "sourceTable": {
        "name": "Raw Employees (Mixed Departments)",
        "cols": [
          "first_name",
          "department",
          "salary"
        ],
        "rows": [
          [
            "Ashley",
            "Analytics",
            "$115,000"
          ],
          [
            "David",
            "Engineering",
            "$125,000"
          ],
          [
            "Samantha",
            "Engineering",
            "$145,000"
          ],
          [
            "Belvet",
            "Analytics",
            "$97,000"
          ]
        ]
      },
      "operation": "GROUP BY department HAVING AVG(salary) >= 110000",
      "callout": {
        "badge": "Bucketing & Group Filter",
        "text": "Groups rows by department key. HAVING filters aggregated bucket averages, keeping only Engineering ($135k avg)."
      },
      "resultTable": {
        "name": "Department Summary Table",
        "cols": [
          "department",
          "Headcount",
          "Average Salary"
        ],
        "rows": [
          [
            "Engineering",
            "2 Engineers",
            "$135,000"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. The Aggregation Barrier",
        "body": "When you use `GROUP BY`, every column in your `SELECT` list must either be:\n1. Explicitly named in the `GROUP BY` clause, OR\n2. Wrapped inside an aggregate function (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).\nListing an unaggregated column not in `GROUP BY` violates ANSI SQL standards (`only_full_group_by`)."
      },
      {
        "title": "2. The Architectural Divide: WHERE vs HAVING",
        "body": "- **WHERE (Step 02)**: Evaluates before grouping. Filters raw individual records. Cannot contain aggregate functions like `SUM()`.\n- **HAVING (Step 04)**: Evaluates after grouping. Filters aggregated bucket metrics. Operates on summary rows."
      }
    ],
    "traps": [
      {
        "id": "trap_where_vs_having_filter_stage",
        "title": "Filtering Non-Aggregates in HAVING (Engine Memory Bloat)",
        "severity": "HIGH",
        "badSql": "-- ❌ WRONG: Filtering row-level attributes in HAVING\nSELECT department_id, SUM(salary) AS total_payroll\nFROM Employees\nGROUP BY department_id, is_active\nHAVING is_active = 1 AND SUM(salary) > 500000;",
        "goodSql": "-- ✅ CORRECT: Filter raw rows in WHERE; filter group metrics in HAVING\nSELECT department_id, SUM(salary) AS total_payroll\nFROM Employees\nWHERE is_active = 1\nGROUP BY department_id\nHAVING SUM(salary) > 500000;",
        "whyItBreaks": "WHERE shrinks the dataset before grouping. Putting row filters in HAVING forces the engine to hash and aggregate inactive rows unnecessarily, consuming 5x more buffer RAM.",
        "corporateImpact": "Queries cause temporary disk spills and slow down production reporting clusters."
      }
    ],
    "tricks": [
      {
        "id": "trick_single_pass_pivot",
        "title": "Single-Pass Pivot via Conditional Aggregation",
        "concept": "SUM(CASE WHEN ...)",
        "codeSnippet": "-- Calculate multiple department metrics in a single table scan:\nSELECT \n  fiscal_year,\n  SUM(CASE WHEN department = 'Sales' THEN amount ELSE 0 END) AS sales_total,\n  SUM(CASE WHEN department = 'Engineering' THEN amount ELSE 0 END) AS eng_total\nFROM Expenses\nGROUP BY fiscal_year;",
        "explanation": "Calculates cross-tab matrix reporting in one linear scan without multiple joins.",
        "analystValue": "Standard corporate technique for financial P&L models and cohort matrices."
      }
    ],
    "patterns": [
      {
        "id": "pat_duplicate_detector",
        "title": "The Duplicate Entity Detector Pattern",
        "formula": "GROUP BY key HAVING COUNT(*) > 1;",
        "whenToUse": "To find duplicate emails, user registrations, or transactions.",
        "sqlTemplate": "SELECT email, COUNT(*) AS duplicate_count\nFROM Users\nGROUP BY email\nHAVING COUNT(*) > 1;",
        "explanation": "Isolates violating records where a uniqueness constraint has failed."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t5_1",
        "question": "Can a single SQL query contain both a WHERE clause and a HAVING clause?",
        "options": [
          "No, they are mutually exclusive",
          "Yes: WHERE filters raw rows before grouping, and HAVING filters aggregated buckets after grouping",
          "Yes, but only if they check the exact same column",
          "Only in PostgreSQL, not in MySQL"
        ],
        "correct": 1,
        "explanation": "WHERE and HAVING serve distinct architectural roles: WHERE filters individual rows before grouping, and HAVING filters the aggregated results."
      }
    ],
    "caseStudy": {
      "company": "Uber",
      "icon": "🚗",
      "role": "Operations & Driver Marketplace Analyst",
      "badge": "Uber Mobility",
      "title": "City Driver Volume & High-Performance Hubs",
      "scenario": "Identify cities where drivers completed at least 500 total trips and maintained an average driver rating of at least 4.75. Return city ID, active driver count, total trips completed, and average rating rounded to 2 decimals.",
      "schema": "Table: drivers\n+-----------------+---------------+---------------------------+\n| Column          | Type          | Description               |\n+-----------------+---------------+---------------------------+\n| driver_id       | INT           | Unique driver identifier  |\n| city_id         | INT           | City identifier code      |\n| completed_trips | INT           | Total completed trips     |\n| rating          | DECIMAL(3,2)  | Average customer rating   |\n+-----------------+---------------+---------------------------+",
      "challenge": "Write a query grouping by city_id with HAVING filters on total trips and average rating.",
      "hints": [
        "GROUP BY city_id.",
        "HAVING SUM(completed_trips) >= 500 AND AVG(rating) >= 4.75."
      ],
      "expectedSql": "SELECT \n  city_id,\n  COUNT(*)                       AS active_drivers,\n  SUM(completed_trips)           AS total_city_trips,\n  ROUND(AVG(rating), 2)          AS avg_city_rating\nFROM drivers\nGROUP BY city_id\nHAVING SUM(completed_trips) >= 500\n   AND AVG(rating) >= 4.75;"
    },
    "problem": {
      "title": "HackerRank Problem 25: Top Earners",
      "difficulty": "easy",
      "spec": "We define an employee's total earnings to be their monthly `salary * months` worked. Write a query to find the maximum total earnings for all employees in the **Employee** table, as well as the total number of employees who have maximum total earnings.",
      "starterSql": "SELECT (salary * months) AS earnings, COUNT(*)\nFROM Employee\nGROUP BY earnings\nORDER BY earnings DESC\nLIMIT 1;",
      "targetTable": "Employee"
    },
    "interviewDefense": {
      "question": "When should you filter in WHERE versus HAVING, and what is the physical performance impact of filtering non-aggregated columns in HAVING?",
      "difficulty": "L4 / L5 Business Intelligence Engineer",
      "testedConcept": "Pre-Aggregation Filter vs Post-Aggregation Filter",
      "interviewerIntent": "Testing understanding of memory allocation during hash aggregation versus pre-filtering raw tuples.",
      "spokenAnswer": "The rule of thumb is 'Filter as early as physically possible'. The WHERE clause runs before grouping in Step 2, stripping non-qualifying rows before memory is allocated. HAVING runs in Step 4, filtering aggregated buckets after grouping. If you filter a raw attribute like is_active = 1 inside HAVING, the database engine is forced to hash and aggregate inactive rows unnecessarily, consuming 5x more RAM and risking disk spills. We only use HAVING for conditions that depend on aggregate functions like SUM(sales) > 100k.",
      "codeSnippet": "SELECT store_id, SUM(order_total) AS gross_sales\nFROM Orders\nWHERE is_active = 1          -- Step 02: Row filter (Shrinks hash table)\nGROUP BY store_id             -- Step 03: Grouping\nHAVING SUM(order_total) > 100000; -- Step 04: Aggregate filter",
      "powerKeywords": [
        "Pre-Filter vs Post-Filter",
        "Hash Aggregation Table",
        "Memory Buffer Allocation",
        "Disk Spill Prevention"
      ]
    }
  },
  {
    "id": "topic_06_joins",
    "seq": "06",
    "title": "Combining Tables (INNER & LEFT JOIN)",
    "shortName": "06. Joins (INNER & LEFT)",
    "name": "Relational Multi-Table Stitching, Cardinality & Outer Join Preservation",
    "icon": "🔗",
    "execRank": "Level 6: Relational Algebra (Physical Step 01)",
    "summary": "Stitch relational entities across primary and foreign keys using INNER and LEFT JOINs without cartesian blowouts or fan-out bugs.",
    "analogy": {
      "metaphor": "The Airport Passport & Flight Boarding Pass Check",
      "story": "The airport has a master traveler list (`Customers`) and the gate computer has a flight boarding manifest (`Flights`). An `INNER JOIN` matches only passengers who hold both a verified passport AND an active boarding pass—unmatched passengers are turned away. A `LEFT JOIN` lists every customer on record; if they haven't boarded a flight yet, their flight info is left blank (`NULL`), but their customer profile is completely preserved.",
      "takeaway": "`INNER JOIN` returns strict intersections; `LEFT JOIN` preserves all driving table rows with NULL padding for missing child records."
    },
    "svgDiagram": {
      "type": "join",
      "sourceTable": {
        "name": "Customers (Left) + Orders (Right)",
        "cols": [
          "cust_id",
          "name",
          "order_id",
          "amount"
        ],
        "rows": [
          [
            "5",
            "Alice",
            "101",
            "$250"
          ],
          [
            "5",
            "Alice",
            "104",
            "$310"
          ],
          [
            "8",
            "Bob",
            "102",
            "$120"
          ],
          [
            "12",
            "Charlie",
            "NULL",
            "NULL"
          ]
        ]
      },
      "operation": "LEFT JOIN Orders ON Customers.id = Orders.cust_id",
      "callout": {
        "badge": "Relational Stitching",
        "text": "Stitches orders to customers. Charlie has 0 orders, so order attributes are padded with NULL while preserving Charlie."
      },
      "resultTable": {
        "name": "Unified Relational Projection",
        "cols": [
          "name",
          "order_id",
          "amount",
          "Match Status"
        ],
        "rows": [
          [
            "Alice",
            "101",
            "$250",
            "MATCH"
          ],
          [
            "Alice",
            "104",
            "$310",
            "MATCH"
          ],
          [
            "Bob",
            "102",
            "$120",
            "MATCH"
          ],
          [
            "Charlie",
            "-",
            "-",
            "NULL-PADDED"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. Relational Keys: Primary Key (PK) vs Foreign Key (FK)",
        "body": "In relational databases, tables are connected through keys:\n- **Primary Key (PK)**: Uniquely identifies a single row in the parent table (e.g., `Customers.customer_id`).\n- **Foreign Key (FK)**: A reference in the child table pointing back to the parent PK (e.g., `Orders.customer_id`)."
      },
      {
        "title": "2. INNER JOIN vs LEFT JOIN Mechanics",
        "body": "- **INNER JOIN**: Keeps only rows that find a matching key on both sides.\n- **LEFT JOIN**: Keeps ALL rows from the left table. If the right table has no match, all right columns evaluate to `NULL`."
      },
      {
        "title": "3. The Critical ON vs WHERE Filter Boundary in Outer Joins",
        "body": "In a `LEFT JOIN`:\n- Conditions in the `ON` clause determine how rows are matched before NULL padding.\n- Conditions in the `WHERE` clause filter rows AFTER the join has completed. Putting a right-table filter in `WHERE` will drop all NULL-padded rows, silently converting your `LEFT JOIN` into an `INNER JOIN`!"
      }
    ],
    "traps": [
      {
        "id": "trap_outer_join_where_collapse",
        "title": "The Outer Join WHERE Collapse Bug",
        "severity": "FATAL",
        "badSql": "-- ❌ WRONG: Filtering right table in WHERE clause\nSELECT c.customer_id, c.name, o.order_id\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id\nWHERE o.order_status = 'ACTIVE';\n-- SILENT DISASTER: Drops all customers with 0 orders because NULL = 'ACTIVE' is UNKNOWN!",
        "goodSql": "-- ✅ CORRECT: Put right-table filter inside the ON clause\nSELECT c.customer_id, c.name, o.order_id\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id AND o.order_status = 'ACTIVE';",
        "whyItBreaks": "WHERE runs after the join. Any condition in WHERE evaluating a NULL-padded column to a literal string evaluates to UNKNOWN and is dropped, converting the LEFT JOIN into an INNER JOIN.",
        "corporateImpact": "Customer retention and churn dashboards silently omit all inactive users who have made 0 purchases, skewing retention metrics by 35%."
      },
      {
        "id": "trap_fanout_duplication",
        "title": "The 1-to-Many Fan-Out Balance Duplication Bug",
        "severity": "FATAL",
        "badSql": "-- ❌ WRONG: Summing parent balance across child rows\nSELECT c.customer_id, SUM(c.account_balance) AS total_balance, SUM(o.amount) AS total_spend\nFROM Customers c\nJOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id;",
        "goodSql": "-- ✅ CORRECT: Pre-aggregate child table in a CTE before joining\nWITH OrderSums AS (\n  SELECT customer_id, SUM(amount) AS total_spend\n  FROM Orders\n  GROUP BY customer_id\n)\nSELECT c.customer_id, c.account_balance, COALESCE(os.total_spend, 0.00) AS total_spend\nFROM Customers c\nLEFT JOIN OrderSums os ON c.customer_id = os.customer_id;",
        "whyItBreaks": "A 1-to-many join duplicates the parent row for every matching child. Summing `account_balance` multiplies the balance by the customer's order count.",
        "corporateImpact": "Bank credit risk or total asset balance sheets are overstated by 5x to 10x, triggering audit restatements."
      }
    ],
    "tricks": [
      {
        "id": "trick_ban_right_join",
        "title": "Why Senior Teams Ban RIGHT JOIN",
        "concept": "Cognitive Flow Directionality",
        "codeSnippet": "-- ✅ UNIVERSAL STANDARD: Re-order using LEFT JOIN:\nSELECT d.dept_name, e.emp_name\nFROM Departments d\nLEFT JOIN Employees e ON d.dept_id = e.dept_id;",
        "explanation": "Humans read from left to right. Mixing LEFT and RIGHT joins forces the reader to reverse mental direction repeatedly.",
        "analystValue": "Instant code review approval and alignment with Google, Amazon, and Stripe SQL style guides."
      },
      {
        "id": "trick_anti_join",
        "title": "The High-Performance Anti-Join",
        "concept": "LEFT JOIN ... WHERE right.key IS NULL",
        "codeSnippet": "-- Find all customers who have NEVER placed an order:\nSELECT c.customer_id, c.name\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id\nWHERE o.customer_id IS NULL;",
        "explanation": "Query planners convert this into a Null-Aware Hash Anti-Join, which halts scanning the hash table as soon as a match is found.",
        "analystValue": "Significantly faster than NOT IN or NOT EXISTS subqueries on multi-million row datasets."
      }
    ],
    "patterns": [
      {
        "id": "pat_anti_join_churn",
        "title": "The Churn / Orphan Detector Pattern",
        "formula": "FROM Parent p LEFT JOIN Child c ON p.id = c.p_id WHERE c.p_id IS NULL;",
        "whenToUse": "To find inactive users, unsold inventory, or unassigned accounts.",
        "sqlTemplate": "SELECT u.user_id, u.email, u.created_at\nFROM Users u\nLEFT JOIN Subscriptions s ON u.user_id = s.user_id\nWHERE s.user_id IS NULL;",
        "explanation": "Extracts rows in the driving table that have zero corresponding records in the related table."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t6_1",
        "question": "What happens if you write a LEFT JOIN with a condition on the right table placed in the WHERE clause instead of the ON clause?",
        "options": [
          "The query throws a syntax error",
          "The LEFT JOIN is silently converted into an INNER JOIN, discarding non-matching rows",
          "The query runs 10x faster",
          "The database duplicates the right table"
        ],
        "correct": 1,
        "explanation": "Because WHERE executes after the join, checking that a right-table column equals a value evaluates to UNKNOWN for NULL-padded rows, dropping them and behaving like an INNER JOIN."
      }
    ],
    "caseStudy": {
      "company": "Netflix",
      "icon": "🍿",
      "role": "Content Intelligence & Retention Analyst",
      "badge": "Netflix Media Analytics",
      "title": "Customer Churn & Unviewed Catalog Anti-Join",
      "scenario": "Identify all active premium subscribers who have not watched a single movie or show in the last 90 days. Return customer ID, email, and subscription start date.",
      "schema": "Table: subscribers (sub_id, email, tier, is_active)\nTable: watch_history (history_id, sub_id, title_id, watch_date)",
      "challenge": "Write an anti-join query identifying active subscribers with zero watch history in the last 90 days.",
      "hints": [
        "LEFT JOIN watch_history on sub_id AND watch_date >= '2025-10-01'.",
        "WHERE w.sub_id IS NULL AND s.is_active = TRUE."
      ],
      "expectedSql": "SELECT \n  s.sub_id,\n  s.email,\n  s.tier\nFROM subscribers s\nLEFT JOIN watch_history w \n  ON s.sub_id = w.sub_id \n AND w.watch_date >= '2025-10-01'\nWHERE s.is_active = TRUE\n  AND w.sub_id IS NULL;"
    },
    "problem": {
      "title": "HackerRank Problem 35: Asian Population",
      "difficulty": "easy",
      "spec": "Given the **CITY** and **COUNTRY** tables, query the sum of the populations of all cities where the **CONTINENT** is `'Asia'`. Note: `CITY.CountryCode` and `COUNTRY.Code` are matching key columns.",
      "starterSql": "SELECT SUM(ci.POPULATION)\nFROM CITY ci\nJOIN COUNTRY co ON ci.CountryCode = co.Code\nWHERE co.CONTINENT = 'Asia';",
      "targetTable": "CITY"
    },
    "interviewDefense": {
      "question": "What causes the outer join WHERE collapse bug, and how do you prevent an intentional LEFT JOIN from silently acting like an INNER JOIN?",
      "difficulty": "L5 Senior Analytics Engineer",
      "testedConcept": "Outer Join Predicate Placement (ON vs WHERE)",
      "interviewerIntent": "Checking relational algebra knowledge and understanding outer-join NULL padding under Three-Valued Logic.",
      "spokenAnswer": "In a LEFT JOIN, the ON clause dictates how rows are matched before outer NULL-padding occurs. The WHERE clause executes after the join is complete. If you place a filter on the right table in WHERE—such as WHERE orders.status = 'ACTIVE'—any customer with zero orders has orders.status as NULL. In SQL's three-valued logic, NULL = 'ACTIVE' evaluates to UNKNOWN, which WHERE discards. This silently eliminates all zero-order customers, turning the LEFT JOIN into an INNER JOIN. The fix is to place the right-table filter directly in the ON clause.",
      "codeSnippet": "SELECT c.customer_id, c.name, o.order_id\nFROM Customers c\nLEFT JOIN Orders o \n  ON c.customer_id = o.customer_id \n AND o.order_status = 'ACTIVE'; -- Preserves all customers!",
      "powerKeywords": [
        "Outer Join WHERE Collapse",
        "ON vs WHERE Placement",
        "NULL Padding",
        "Three-Valued Logic UNKNOWN"
      ]
    }
  },
  {
    "id": "topic_07_adv_joins_union",
    "seq": "07",
    "title": "Advanced Joins & Sets (RIGHT, FULL & UNION)",
    "shortName": "07. Advanced Joins & UNION",
    "name": "Set Operations, Vertical Stacking, Full Outer Joins & Self-Referential Trees",
    "icon": "⚡",
    "execRank": "Level 7: Set Theory & Graph Joins (Physical Step 06)",
    "summary": "Stack datasets vertically with UNION and UNION ALL, handle full outer join bilateral gaps, and navigate organizational hierarchies with self-joins.",
    "analogy": {
      "metaphor": "Merging Two Event Guest Lists",
      "story": "Marketing prints a list of VIP guests, and Sales prints a list of major clients. If you use `UNION ALL`, you take both printouts and staple them together in one second—fast and simple, even if some guests appear on both sheets. If you use `UNION`, an assistant must sit down with a highlighter, compare every single name line by line, and cross out duplicates. `UNION` is clean, but takes significantly more time and energy.",
      "takeaway": "`UNION ALL` streams rows directly with zero overhead; `UNION` forces the database to sort or hash the entire dataset to remove duplicates."
    },
    "svgDiagram": {
      "type": "union",
      "sourceTable": {
        "name": "Store A (3 Rows) + Store B (3 Rows)",
        "cols": [
          "item_id",
          "product",
          "price"
        ],
        "rows": [
          [
            "1",
            "Laptop",
            "$1,200"
          ],
          [
            "2",
            "Mouse",
            "$30"
          ],
          [
            "2",
            "Mouse",
            "$30"
          ],
          [
            "3",
            "Monitor",
            "$350"
          ]
        ]
      },
      "operation": "UNION ALL (Stacks 4 rows) vs UNION (Deduplicates to 3 rows)",
      "callout": {
        "badge": "Set Operations",
        "text": "UNION ALL streams records in O(1) time. UNION builds an in-memory hash set to deduplicate identical rows."
      },
      "resultTable": {
        "name": "Consolidated Product Catalog",
        "cols": [
          "item_id",
          "product",
          "price",
          "Provenance"
        ],
        "rows": [
          [
            "1",
            "Laptop",
            "$1,200",
            "Store A"
          ],
          [
            "2",
            "Mouse",
            "$30",
            "Store A / B"
          ],
          [
            "3",
            "Monitor",
            "$350",
            "Store B"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. Joins (Horizontal) vs Set Operations (Vertical)",
        "body": "- **JOINs**: Combine columns side-by-side based on a key condition.\n- **UNION / UNION ALL**: Stack rows on top of each other vertically. Both queries must project the same number of columns with compatible data types."
      },
      {
        "title": "2. UNION vs UNION ALL: The Performance Cost of Deduplication",
        "body": "- `UNION ALL`: Simply appends the result sets. Instant execution with $O(1)$ streaming.\n- `UNION`: Appends result sets and performs an expensive deduplication sort or hash aggregation. Never use `UNION` when you know datasets are disjoint or when duplicates are acceptable."
      },
      {
        "title": "3. Self-Joins: Querying Hierarchical Trees",
        "body": "When a table references itself (e.g., an `Employees` table with a `manager_id` referencing `employee_id`), you join the table to itself using two distinct aliases:\n\n```sql\nSELECT e.first_name AS employee, m.first_name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.id;\n```"
      }
    ],
    "traps": [
      {
        "id": "trap_blind_union",
        "title": "Blindly Using UNION Instead of UNION ALL",
        "severity": "HIGH",
        "badSql": "-- ❌ SLOW: Deduplicating two non-overlapping monthly partitions\nSELECT order_id, amount FROM Orders_Jan2026\nUNION\nSELECT order_id, amount FROM Orders_Feb2026;",
        "goodSql": "-- ✅ FAST: Use UNION ALL when datasets are naturally disjoint\nSELECT order_id, amount FROM Orders_Jan2026\nUNION ALL\nSELECT order_id, amount FROM Orders_Feb2026;",
        "whyItBreaks": "Orders in January and February have unique IDs and dates. Using UNION forces the engine to sort millions of rows in memory to find duplicate records that do not exist.",
        "corporateImpact": "ETL batch runtimes jump from 5 minutes to 45 minutes, delaying executive morning dashboards."
      }
    ],
    "tricks": [
      {
        "id": "trick_provenance_tag",
        "title": "Tracking Record Provenance with Literal Tags",
        "concept": "Set Origin Auditing",
        "codeSnippet": "-- Tag records with their source system:\nSELECT 'ONLINE' AS source_channel, order_id, total_amount FROM WebOrders\nUNION ALL\nSELECT 'POS'    AS source_channel, order_id, total_amount FROM RetailOrders;",
        "explanation": "Adding a constant literal column preserves traceability when combining disparate data pipelines.",
        "analystValue": "Standard enterprise pattern for omnichannel retail and payments reconciliation."
      }
    ],
    "patterns": [
      {
        "id": "pat_hierarchical_self_join",
        "title": "The Hierarchical Self-Join Pattern",
        "formula": "FROM Table e LEFT JOIN Table m ON e.parent_id = m.id;",
        "whenToUse": "For employee-manager org charts, category-subcategory trees, or referrer trees.",
        "sqlTemplate": "SELECT \n  e.employee_id,\n  e.full_name AS employee_name,\n  COALESCE(m.full_name, 'Top Executive / CEO') AS direct_manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.employee_id;",
        "explanation": "Navigates parent-child relationships stored in a single unified table."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t7_1",
        "question": "What is the primary difference between UNION and UNION ALL?",
        "options": [
          "UNION ALL sorts the output alphabetically, while UNION does not",
          "UNION removes duplicate rows via an internal sort/hash; UNION ALL keeps all rows without deduplication",
          "UNION only works in Oracle, while UNION ALL works in MySQL",
          "UNION combines tables horizontally; UNION ALL combines them vertically"
        ],
        "correct": 1,
        "explanation": "UNION ALL performs a pure vertical append, while UNION incurs the performance cost of deduplicating identical rows."
      }
    ],
    "caseStudy": {
      "company": "Apple",
      "icon": "🍎",
      "role": "Global Channel Sales & Retail Operations",
      "badge": "Apple Omnichannel",
      "title": "Global Store & Online Order Harmonization",
      "scenario": "Harmonize order records across physical Apple Store retail registers and Apple Online Store checkouts for Q4. Project channel provenance, order ID, customer ID, order total, and order date.",
      "schema": "Table: retail_orders (order_id, cust_id, total_usd, order_date)\nTable: online_orders (order_id, cust_id, total_usd, order_date)",
      "challenge": "Write a high-performance query combining both channels with a provenance tag ('RETAIL' vs 'ONLINE').",
      "hints": [
        "Use UNION ALL because retail and online order IDs do not collide.",
        "Add literal 'RETAIL' and 'ONLINE' columns."
      ],
      "expectedSql": "SELECT 'RETAIL' AS sales_channel, order_id, cust_id, total_usd, order_date\nFROM retail_orders\nUNION ALL\nSELECT 'ONLINE' AS sales_channel, order_id, cust_id, total_usd, order_date\nFROM online_orders\nORDER BY order_date DESC;"
    },
    "problem": {
      "title": "HackerRank Problem 40: Symmetric Pairs",
      "difficulty": "medium",
      "spec": "Two pairs (X1, Y1) and (X2, Y2) are said to be symmetric pairs if X1 = Y2 and X2 = Y1. Write a query to output all such symmetric pairs in ascending order by the value of X. List the rows such that X1 <= Y1.",
      "starterSql": "SELECT f1.X, f1.Y\nFROM Functions f1\nJOIN Functions f2 ON f1.X = f2.Y AND f1.Y = f2.X\nGROUP BY f1.X, f1.Y\nHAVING COUNT(*) > 1 OR f1.X < f1.Y\nORDER BY f1.X;",
      "targetTable": "Functions"
    },
    "interviewDefense": {
      "question": "Under what circumstances would you choose UNION ALL over UNION, and why do top engineering teams ban RIGHT JOIN in production style guides?",
      "difficulty": "L4 / L5 Data Engineer",
      "testedConcept": "Set Concatenation Complexity & Clean Mental Models",
      "interviewerIntent": "Evaluating performance awareness of set deduplication and cognitive code readability standards across large data engineering teams.",
      "spokenAnswer": "UNION ALL performs a direct vertical concatenation in O(1) streaming time with zero sorting overhead. UNION forces the database to allocate an in-memory hash table or run an external sort to remove duplicates. If datasets are naturally disjoint—such as monthly partitions—UNION wastes substantial CPU and memory. Regarding RIGHT JOIN: humans read left-to-right. Mixing LEFT and RIGHT joins in complex pipelines forces engineers to mentally reverse query direction back and forth. Standardizing on LEFT JOIN guarantees consistent flow.",
      "codeSnippet": "-- Fast, non-blocking disjoint union:\nSELECT 'Jan' AS month, order_id, amount FROM Orders_Jan2026\nUNION ALL\nSELECT 'Feb' AS month, order_id, amount FROM Orders_Feb2026;",
      "powerKeywords": [
        "O(1) Streaming Append",
        "Hash Deduplication Cost",
        "Disjoint Partitioning",
        "Left-to-Right Mental Model"
      ]
    }
  },
  {
    "id": "topic_08_case_when",
    "seq": "08",
    "title": "Conditional Logic & Functions (CASE WHEN)",
    "shortName": "08. Conditional CASE WHEN",
    "name": "Decision Trees, Branching Logic, Conditional Aggregation & Null Shields",
    "icon": "⚖️",
    "execRank": "Level 8: Expression Evaluation (Step 05 Projection)",
    "summary": "Implement if-else branching logic, categorize continuous data into business tiers, pivot matrix summaries, and protect formulas against zero-division.",
    "analogy": {
      "metaphor": "The Emergency Room Triage Nurse",
      "story": "Patients walk into an emergency hospital (`FROM Patients`). The triage nurse evaluates each patient with a prioritized protocol: `WHEN` chest pain and oxygen < 90, send to Emergency Surgery immediately; `WHEN` high fever, route to Urgent Care; `ELSE` direct to General Clinic. As soon as a patient matches a high-priority rule, they are dispatched on the spot—the nurse doesn't keep checking lower-priority rules.",
      "takeaway": "`CASE WHEN` executes from top to bottom and short-circuits on the first condition that evaluates to TRUE."
    },
    "svgDiagram": {
      "type": "casewhen",
      "sourceTable": {
        "name": "Employee Salary Stream",
        "cols": [
          "first_name",
          "salary",
          "tenure"
        ],
        "rows": [
          [
            "David",
            "$125,000",
            "36 mos"
          ],
          [
            "Belvet",
            "$97,000",
            "11 mos"
          ],
          [
            "Patrick",
            "$62,000",
            "6 mos"
          ]
        ]
      },
      "operation": "CASE WHEN salary >= 120k THEN 'Executive' WHEN salary >= 90k THEN 'Senior' ELSE 'Associate' END",
      "callout": {
        "badge": "Branching Evaluator",
        "text": "Evaluates rules top to bottom. Short-circuits on first true match. Assigns categorical business tiers."
      },
      "resultTable": {
        "name": "Categorized Employee Roster",
        "cols": [
          "first_name",
          "salary",
          "Compensation Tier"
        ],
        "rows": [
          [
            "David",
            "$125,000",
            "Executive Tier"
          ],
          [
            "Belvet",
            "$97,000",
            "Senior Tier"
          ],
          [
            "Patrick",
            "$62,000",
            "Associate Tier"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. Flow of Control: Searched CASE vs Simple CASE",
        "body": "- **Searched CASE**: Evaluates independent boolean predicates per branch:\n```sql\nCASE \n  WHEN salary >= 120000 THEN 'Tier 1'\n  WHEN salary >= 90000  THEN 'Tier 2'\n  ELSE 'Tier 3'\nEND AS comp_tier\n```\n- **Simple CASE**: Compares an expression to literal values (`CASE department WHEN 'HR' THEN ...`). Always prefer Searched CASE because it supports comparisons, ranges, and NULL tests."
      },
      {
        "title": "2. Short-Circuiting Mechanics",
        "body": "`CASE` evaluates conditions sequentially. Once a `WHEN` condition is met, evaluation stops and returns the result. More specific conditions must always appear before general conditions."
      },
      {
        "title": "3. The Implicit NULL Trap",
        "body": "If no `WHEN` branch matches and no `ELSE` clause is specified, `CASE` defaults to returning `NULL`. Always supply an explicit `ELSE` clause to prevent silent NULLs."
      }
    ],
    "traps": [
      {
        "id": "trap_case_short_circuit_order",
        "title": "The Premature Short-Circuit Trap",
        "severity": "CRITICAL",
        "badSql": "-- ❌ WRONG: General condition precedes specific condition\nSELECT triangle_id, side_a, side_b, side_c,\n  CASE \n    WHEN side_a = side_b OR side_b = side_c THEN 'Isosceles'\n    WHEN side_a = side_b AND side_b = side_c THEN 'Equilateral' -- DEAD CODE!\n    ELSE 'Scalene'\n  END AS triangle_type\nFROM Triangles;\n-- BUG: Equilateral triangles (5,5,5) hit the first branch and get mislabeled 'Isosceles'!",
        "goodSql": "-- ✅ CORRECT: Most specific condition evaluated first\nSELECT triangle_id, side_a, side_b, side_c,\n  CASE \n    WHEN side_a + side_b <= side_c OR side_a + side_c <= side_b OR side_b + side_c <= side_a THEN 'Not A Triangle'\n    WHEN side_a = side_b AND side_b = side_c THEN 'Equilateral'\n    WHEN side_a = side_b OR side_b = side_c OR side_a = side_c THEN 'Isosceles'\n    ELSE 'Scalene'\n  END AS triangle_type\nFROM Triangles;",
        "whyItBreaks": "CASE WHEN short-circuits. As soon as any WHEN evaluates to TRUE, all subsequent branches are skipped.",
        "corporateImpact": "Misclassifying customer risk tiers or mortgage applications because broad criteria swallowed high-priority exceptions."
      }
    ],
    "tricks": [
      {
        "id": "trick_safe_division_nullif",
        "title": "Safe Division with NULLIF (Zero-Division Shield)",
        "concept": "Preventing Fatal Crash Errors",
        "codeSnippet": "-- Protect against division by zero in financial ratios:\nSELECT \n  product_id,\n  revenue_usd,\n  units_sold,\n  ROUND(revenue_usd / NULLIF(units_sold, 0), 2) AS avg_unit_price\nFROM SalesSummary;",
        "explanation": "If units_sold is 0, NULLIF returns NULL. Any number divided by NULL safely evaluates to NULL instead of throwing a query-killing crash.",
        "analystValue": "Guarantees automated daily ETL pipelines never crash due to a single zero-quantity line item."
      }
    ],
    "patterns": [
      {
        "id": "pat_conversion_rate_pivot",
        "title": "The Single-Pass Conversion Rate Pattern",
        "formula": "ROUND(AVG(CASE WHEN condition THEN 100.0 ELSE 0.0 END), 2) AS rate_pct",
        "whenToUse": "To calculate conversion rates, click-through rates, and percentage flags in a single table scan.",
        "sqlTemplate": "SELECT \n  campaign_id,\n  COUNT(*) AS total_impressions,\n  ROUND(AVG(CASE WHEN is_converted = 1 THEN 100.0 ELSE 0.0 END), 2) AS conversion_rate_pct\nFROM AdEvents\nGROUP BY campaign_id;",
        "explanation": "Computes conversion rates without requiring subqueries or self-joins."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t8_1",
        "question": "What does a CASE WHEN expression return if no WHEN condition matches and the ELSE clause is omitted?",
        "options": [
          "0",
          "An empty string ''",
          "NULL",
          "A fatal syntax error"
        ],
        "correct": 2,
        "explanation": "In ANSI SQL, omitting the ELSE clause causes the expression to default to returning NULL if no WHEN branch matches."
      }
    ],
    "caseStudy": {
      "company": "Stripe",
      "icon": "💳",
      "role": "Financial Risk & Fraud Analytics",
      "badge": "Stripe Payments",
      "title": "Merchant Chargeback Risk Tiering & Volume Matrix",
      "scenario": "Classify merchant chargebacks into risk tiers based on dollar amount: >= $1,000 is 'HIGH_RISK', >= $250 is 'MEDIUM_RISK', otherwise 'LOW_RISK'. Calculate merchant transaction volume and total disputed funds per tier.",
      "schema": "Table: chargebacks (dispute_id, merchant_id, amount_usd, status)",
      "challenge": "Write a query categorizing chargebacks and pivoting total disputed volume across risk tiers.",
      "hints": [
        "Use CASE WHEN amount_usd >= 1000 THEN 'HIGH_RISK' ...",
        "Aggregate using SUM(amount_usd)."
      ],
      "expectedSql": "SELECT \n  merchant_id,\n  COUNT(*) AS total_disputes,\n  SUM(CASE WHEN amount_usd >= 1000 THEN amount_usd ELSE 0 END) AS high_risk_disputed_usd,\n  SUM(CASE WHEN amount_usd < 1000 AND amount_usd >= 250 THEN amount_usd ELSE 0 END) AS med_risk_disputed_usd,\n  SUM(CASE WHEN amount_usd < 250 THEN amount_usd ELSE 0 END) AS low_risk_disputed_usd\nFROM chargebacks\nGROUP BY merchant_id;"
    },
    "problem": {
      "title": "HackerRank Problem 45: Type of Triangle",
      "difficulty": "easy",
      "spec": "Write a query identifying the type of each record in the **TRIANGLES** table using its three side lengths: Equilateral, Isosceles, Scalene, or Not A Triangle.",
      "starterSql": "SELECT \n  CASE \n    WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n    WHEN A = B AND B = C THEN 'Equilateral'\n    WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n    ELSE 'Scalene'\n  END\nFROM TRIANGLES;",
      "targetTable": "TRIANGLES"
    },
    "interviewDefense": {
      "question": "How does conditional aggregation enable single-pass pivot tables, and why is it superior to multiple subqueries or joins?",
      "difficulty": "L4 / L5 Financial Risk & Product Analyst",
      "testedConcept": "Single-Pass Pivot Transformation via CASE WHEN",
      "interviewerIntent": "Testing proficiency with advanced data transformation, matrix reporting, and single-pass analytical efficiency.",
      "spokenAnswer": "Instead of running multiple queries or expensive joins to break down metrics by category, we embed CASE WHEN directly inside aggregate functions—for example, SUM(CASE WHEN department = 'Sales' THEN amount ELSE 0 END) AS sales_total. The database engine scans the base table once in a single linear pass, incrementing the appropriate accumulator per row. This reduces I/O by N-fold compared to joining multiple pre-aggregated subqueries, making it the industry standard for financial P&L matrices.",
      "codeSnippet": "SELECT \n  fiscal_year,\n  SUM(CASE WHEN dept = 'Engineering' THEN spend ELSE 0 END) AS eng_spend,\n  SUM(CASE WHEN dept = 'Sales'       THEN spend ELSE 0 END) AS sales_spend\nFROM DepartmentBudgets\nGROUP BY fiscal_year;",
      "powerKeywords": [
        "Single-Pass Table Scan",
        "Conditional Aggregation Matrix",
        "Zero-Join Overhead",
        "Linear I/O Complexity"
      ]
    }
  },
  {
    "id": "topic_09_ctes",
    "seq": "09",
    "title": "Multi-Step Queries (CTEs & Subqueries)",
    "shortName": "09. CTEs & Subqueries",
    "name": "Modular Pipelines, Common Table Expressions & Subquery Optimization",
    "icon": "🏗️",
    "execRank": "Level 9: Multi-Stage Pipelines (Physical Execution Pipeline)",
    "summary": "Decompose complex corporate business logic into clean, readable, modular data pipelines using Common Table Expressions (WITH) and correlated subqueries.",
    "analogy": {
      "metaphor": "The Master Chef's Prep Bowls (Mise en Place)",
      "story": "A Michelin-star chef does not dump whole, unpeeled carrots and raw unmeasured spices directly into a simmering pot all at once. They prep ingredients in advance in small, labeled glass bowls (`WITH PreppedVeggies AS (...), SeasoningMix AS (...)`). When the final cooking step begins, they simply pour the prepped bowls into the main dish (`SELECT FROM PreppedVeggies JOIN SeasoningMix`). Clean, organized, and error-free.",
      "takeaway": "CTEs create named, temporary logical views in memory, allowing you to build multi-stage analytical queries step-by-step."
    },
    "svgDiagram": {
      "type": "cte",
      "sourceTable": {
        "name": "Raw Database Tables",
        "cols": [
          "emp_id",
          "dept",
          "salary",
          "bonus"
        ],
        "rows": [
          [
            "101",
            "Analytics",
            "$115k",
            "$5k"
          ],
          [
            "102",
            "Eng",
            "$125k",
            "$8k"
          ]
        ]
      },
      "operation": "WITH DeptAvg AS (...) SELECT ... FROM Employees JOIN DeptAvg",
      "callout": {
        "badge": "Modular Pipeline",
        "text": "Step 1 pre-aggregates department averages in memory. Step 2 joins back to identify above-average earners."
      },
      "resultTable": {
        "name": "Clean Multi-Stage Output",
        "cols": [
          "first_name",
          "salary",
          "Dept Average",
          "Variance"
        ],
        "rows": [
          [
            "Samantha",
            "$145,000",
            "$135,000",
            "+$10,000"
          ],
          [
            "David",
            "$125,000",
            "$135,000",
            "-$10,000"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. The Cognitive Load Problem: Spaghetti Subqueries",
        "body": "Deeply nested subqueries inside `FROM` or `WHERE` clauses force the reader to read queries inside-out, making code nearly impossible to debug or maintain. Common Table Expressions (`WITH ... AS`) define query stages in natural top-to-bottom reading order."
      },
      {
        "title": "2. CTE Syntax & Chaining Multiple Stages",
        "body": "You can chain multiple CTEs using a single `WITH` keyword, separating each CTE definition with a comma:\n\n```sql\nWITH RegionalSales AS (\n  SELECT region, SUM(amount) AS total_sales\n  FROM Orders\n  GROUP BY region\n),\nCompanyAverage AS (\n  SELECT AVG(total_sales) AS avg_sales\n  FROM RegionalSales\n)\nSELECT r.region, r.total_sales, c.avg_sales\nFROM RegionalSales r\nCROSS JOIN CompanyAverage c\nWHERE r.total_sales > c.avg_sales;\n```"
      }
    ],
    "traps": [
      {
        "id": "trap_not_in_null_subquery",
        "title": "The NOT IN with NULL Subquery Catastrophe",
        "severity": "FATAL",
        "badSql": "-- ❌ WRONG: Using NOT IN against a subquery that returns a NULL\nSELECT employee_id, first_name\nFROM Employees\nWHERE employee_id NOT IN (\n  SELECT manager_id FROM Employees -- If even ONE manager_id is NULL (e.g., CEO)...\n);\n-- CATASTROPHE: Query returns ZERO ROWS! Completely empty result set!",
        "goodSql": "-- ✅ CORRECT: Use NOT EXISTS or an Anti-Join\nSELECT e.employee_id, e.first_name\nFROM Employees e\nWHERE NOT EXISTS (\n  SELECT 1 FROM Employees m WHERE m.manager_id = e.employee_id\n);",
        "whyItBreaks": "`val NOT IN (1, 2, NULL)` expands to `val != 1 AND val != 2 AND val != NULL`. Any comparison with NULL evaluates to UNKNOWN. In an AND chain, if one operand is UNKNOWN, the whole expression is never TRUE.",
        "corporateImpact": "Automated fraud alerts, orphan-record checks, or compliance queries silently return 0 records, allowing security breaches to go undetected."
      }
    ],
    "tricks": [
      {
        "id": "trick_cte_isolation_debug",
        "title": "Step-by-Step CTE Pipeline Debugging",
        "concept": "Modular Unit Testing in SQL",
        "codeSnippet": "-- When debugging complex 5-stage CTEs, inspect intermediate stages:\nWITH Stage1 AS (...),\nStage2 AS (...)\nSELECT * FROM Stage1; -- Stop and inspect Stage 1 data immediately!",
        "explanation": "CTEs allow you to inspect intermediate result sets without having to tear apart subqueries.",
        "analystValue": "Cuts SQL query debugging time by 75% on multi-join corporate pipelines."
      }
    ],
    "patterns": [
      {
        "id": "pat_above_average_cte",
        "title": "The Pre-Aggregate Benchmark Pattern",
        "formula": "WITH Benchmark AS (SELECT AVG(val) as b FROM T) SELECT ... WHERE val > (SELECT b FROM Benchmark)",
        "whenToUse": "To filter entities performing above company or departmental averages.",
        "sqlTemplate": "WITH DeptPayroll AS (\n  SELECT department, AVG(salary) AS avg_salary\n  FROM Employees\n  GROUP BY department\n)\nSELECT e.first_name, e.department, e.salary, ROUND(d.avg_salary, 2) AS dept_avg\nFROM Employees e\nJOIN DeptPayroll d ON e.department = d.department\nWHERE e.salary > d.avg_salary;",
        "explanation": "Calculates benchmarks once in memory and joins back to raw rows."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t9_1",
        "question": "What happens if a subquery inside a `WHERE col NOT IN (SELECT ...)` condition returns a single NULL value?",
        "options": [
          "The engine ignores the NULL and compares the rest of the values",
          "The entire condition evaluates to UNKNOWN and the query returns zero rows",
          "The query throws an unhandled fatal exception",
          "The NULL is automatically converted to zero"
        ],
        "correct": 1,
        "explanation": "Because `col NOT IN (...)` translates to an `AND` chain of inequalities, `col != NULL` evaluates to UNKNOWN, which kills the entire condition and yields zero rows."
      }
    ],
    "caseStudy": {
      "company": "Goldman Sachs",
      "icon": "🏦",
      "role": "Quantitative Portfolio & Risk Analytics",
      "badge": "Goldman Asset Management",
      "title": "Multi-Stage Portfolio Outlier Detection",
      "scenario": "Identify trading portfolios whose 30-day cumulative trade volume exceeds twice the firm-wide portfolio average. Structure using a modular CTE pipeline.",
      "schema": "Table: trades (trade_id, portfolio_id, trade_amount, trade_date)",
      "challenge": "Write a 2-stage CTE query: Stage 1 sums volume by portfolio, Stage 2 calculates the firm average, and Main query filters outliers.",
      "hints": [
        "WITH PortfolioVolumes AS (...), FirmBenchmark AS (...) SELECT ...",
        "Filter volume > 2 * firm_avg."
      ],
      "expectedSql": "WITH PortfolioVolumes AS (\n  SELECT portfolio_id, SUM(trade_amount) AS total_volume\n  FROM trades\n  WHERE trade_date >= '2026-01-01'\n  GROUP BY portfolio_id\n),\nFirmBenchmark AS (\n  SELECT AVG(total_volume) AS avg_firm_volume\n  FROM PortfolioVolumes\n)\nSELECT \n  pv.portfolio_id,\n  pv.total_volume,\n  ROUND(fb.avg_firm_volume, 2) AS firm_avg_volume\nFROM PortfolioVolumes pv\nCROSS JOIN FirmBenchmark fb\nWHERE pv.total_volume > (fb.avg_firm_volume * 2)\nORDER BY pv.total_volume DESC;"
    },
    "problem": {
      "title": "HackerRank Problem 50: Challenges",
      "difficulty": "medium",
      "spec": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and total number of challenges created by each student, ordered by total challenges descending. If more than one student created the same number of challenges and the count is less than the maximum created, exclude those students.",
      "starterSql": "WITH ChallengeCounts AS (\n  SELECT h.hacker_id, h.name, COUNT(c.challenge_id) AS total_challenges\n  FROM Hackers h\n  JOIN Challenges c ON h.hacker_id = c.hacker_id\n  GROUP BY h.hacker_id, h.name\n)\nSELECT hacker_id, name, total_challenges\nFROM ChallengeCounts\nWHERE total_challenges = (SELECT MAX(total_challenges) FROM ChallengeCounts)\n   OR total_challenges IN (\n      SELECT total_challenges FROM ChallengeCounts GROUP BY total_challenges HAVING COUNT(*) = 1\n   )\nORDER BY total_challenges DESC, hacker_id ASC;",
      "targetTable": "Hackers"
    },
    "interviewDefense": {
      "question": "Why can a WHERE col NOT IN (SELECT ...) query catastrophically return zero rows when the subquery contains a single NULL value, and how do you prevent it?",
      "difficulty": "L5 Quantitative / Senior Data Analyst",
      "testedConcept": "Three-Valued Logic Predicate Collapse in NOT IN",
      "interviewerIntent": "High-level test on ANSI SQL Three-Valued Logic and subquery evaluation pitfalls in production systems.",
      "spokenAnswer": "Under ANSI SQL, val NOT IN (1, 2, NULL) expands logically into val != 1 AND val != 2 AND val != NULL. Any inequality comparison with NULL evaluates to UNKNOWN. In an AND chain, if even one condition is UNKNOWN, the entire predicate can never evaluate to TRUE. As a result, if the subquery returns even one NULL—such as an unassigned manager ID—the entire query silently emits zero rows. The safe enterprise alternative is to use NOT EXISTS or an Anti-Join, which safely bypasses NULL values.",
      "codeSnippet": "-- ✅ SAFE: Null-Aware Anti-Join:\nSELECT e.employee_id, e.first_name\nFROM Employees e\nWHERE NOT EXISTS (\n  SELECT 1 FROM Employees m WHERE m.manager_id = e.employee_id\n);",
      "powerKeywords": [
        "NOT IN NULL Black Hole",
        "Predicate Short-Circuit",
        "NOT EXISTS Equivalence",
        "Hash Anti-Join"
      ]
    }
  },
  {
    "id": "topic_10_window_functions",
    "seq": "10",
    "title": "Advanced Analytics (Window Functions)",
    "shortName": "10. Window Functions",
    "name": "Analytical Sliding Windows, Partitioning, Rankings & Period-over-Period Growth",
    "icon": "👑",
    "execRank": "Level 10: Elite Analytics (Physical Step 05 / 07)",
    "summary": "Calculate departmental rankings, running totals, and period-over-period growth metrics using OVER, PARTITION BY, ROW_NUMBER, RANK, DENSE_RANK, and LAG/LEAD without collapsing rows.",
    "analogy": {
      "metaphor": "The Marathon Running Coach on a Bicycle",
      "story": "A standard aggregate function (`SUM`, `AVG`) stops the entire marathon, forces all 5,000 runners into a tent, and reports only a single number: 'Average finish time: 3 hours'. All runner identities are destroyed. A Window Function (`OVER`) is a personal running coach riding a bicycle alongside each runner. As the coach pedals beside runner #142, they calculate their current age-group rank, gap behind the leader, and split pace—and hand them a scorecard while every runner continues racing at full speed without collapsing any rows!",
      "takeaway": "Window functions perform advanced multi-row analytical calculations while completely preserving every individual row's identity."
    },
    "svgDiagram": {
      "type": "window",
      "sourceTable": {
        "name": "Engineering Department Salaries",
        "cols": [
          "name",
          "dept",
          "salary"
        ],
        "rows": [
          [
            "Samantha",
            "Engineering",
            "$145,000"
          ],
          [
            "David",
            "Engineering",
            "$125,000"
          ],
          [
            "Alex",
            "Engineering",
            "$125,000"
          ]
        ]
      },
      "operation": "DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC)",
      "callout": {
        "badge": "Analytical Window",
        "text": "Partitions by dept, sorts by salary. Evaluates rank per row without collapsing table. Handles ties cleanly."
      },
      "resultTable": {
        "name": "Preserved Records with Departmental Rank",
        "cols": [
          "name",
          "salary",
          "ROW_NUMBER",
          "RANK",
          "DENSE_RANK"
        ],
        "rows": [
          [
            "Samantha",
            "$145,000",
            "1",
            "1",
            "1"
          ],
          [
            "David",
            "$125,000",
            "2",
            "2",
            "2"
          ],
          [
            "Alex",
            "$125,000",
            "3",
            "2",
            "2"
          ]
        ]
      }
    },
    "deepTheory": [
      {
        "title": "1. The Window Function Revolution",
        "body": "Before window functions were introduced in SQL:2003, calculating a running total or a department rank required massive, slow self-joins. Window functions compute row-level metrics against an underlying analytical window without altering row grain."
      },
      {
        "title": "2. Anatomy of the OVER() Clause",
        "body": "- **PARTITION BY**: Splits rows into analytical groups (similar to GROUP BY, but rows are not collapsed).\n- **ORDER BY**: Defines the sorting sequence within each partition.\n- **ROWS BETWEEN**: Defines the sliding frame (e.g., `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`)."
      },
      {
        "title": "3. The Ranking Triad: ROW_NUMBER vs RANK vs DENSE_RANK",
        "body": "- `ROW_NUMBER()`: Assigns strict unique sequential integers (1, 2, 3, 4). Never ties.\n- `RANK()`: Ties share the same rank, but subsequent ranks skip numbers (1, 2, 2, 4).\n- `DENSE_RANK()`: Ties share the same rank, and subsequent ranks do not skip (1, 2, 2, 3)."
      },
      {
        "title": "4. Value Offset Navigation: LAG() and LEAD()",
        "body": "- `LAG(col, 1)`: Accesses the preceding row's value (used for Period-over-Period growth).\n- `LEAD(col, 1)`: Accesses the subsequent row's value."
      }
    ],
    "traps": [
      {
        "id": "trap_window_in_where",
        "title": "Using Window Functions in WHERE (Syntax Error)",
        "severity": "CRITICAL",
        "badSql": "-- ❌ WRONG: Window function inside WHERE clause\nSELECT employee_id, salary\nFROM Employees\nWHERE ROW_NUMBER() OVER (ORDER BY salary DESC) <= 3;\n-- SYNTAX CRASH: \"Window functions are not allowed in WHERE\"",
        "goodSql": "-- ✅ CORRECT: Wrap in a CTE and filter on the calculated rank alias\nWITH RankedStaff AS (\n  SELECT employee_id, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn\n  FROM Employees\n)\nSELECT employee_id, salary\nFROM RankedStaff\nWHERE rn <= 3;",
        "whyItBreaks": "Execution order! The WHERE clause evaluates in Step 02, whereas window functions are calculated during Step 05 (SELECT). The window metrics do not exist when WHERE filters rows.",
        "corporateImpact": "Analysts get blocked during live technical interview screening rounds."
      }
    ],
    "tricks": [
      {
        "id": "trick_top_n_per_category",
        "title": "The Canonical Top-N per Category Recipe",
        "concept": "FAANG Favorite Interview Pattern",
        "codeSnippet": "-- Find the Top 3 earners in every single department:\nWITH RankedEarners AS (\n  SELECT \n    first_name, \n    department, \n    salary,\n    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\n  FROM Employees\n)\nSELECT first_name, department, salary, dept_rank\nFROM RankedEarners\nWHERE dept_rank <= 3;",
        "explanation": "DENSE_RANK handles salary ties fairly, ensuring all top 3 compensation packages are included.",
        "analystValue": "Asked in over 85% of Amazon, Meta, and Google data analyst technical interviews."
      }
    ],
    "patterns": [
      {
        "id": "pat_running_total",
        "title": "The Cumulative Running Balance Pattern",
        "formula": "SUM(amount) OVER (PARTITION BY acct ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
        "whenToUse": "For bank statements, cumulative burn rates, and financial run-rates.",
        "sqlTemplate": "SELECT \n  transaction_id,\n  account_id,\n  transaction_date,\n  amount,\n  SUM(amount) OVER (\n    PARTITION BY account_id \n    ORDER BY transaction_date ASC \n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_account_balance\nFROM Transactions;",
        "explanation": "Calculates running cumulative ledger balances in a single linear pass."
      }
    ],
    "mcqs": [
      {
        "id": "mcq_t10_1",
        "question": "If two employees tie for the 2nd highest salary, what ranks will `DENSE_RANK()` assign to the top 4 earners?",
        "options": [
          "1, 2, 3, 4",
          "1, 2, 2, 4",
          "1, 2, 2, 3",
          "1, 2, 3, 3"
        ],
        "correct": 2,
        "explanation": "DENSE_RANK assigns the tied employees rank 2, and the next employee receives rank 3 without skipping any ranks."
      }
    ],
    "caseStudy": {
      "company": "Google",
      "icon": "🔍",
      "role": "People Operations & Global Compensation Analytics",
      "badge": "Google People Analytics",
      "title": "Department Salary Dense-Rank & Cumulative Run-Rate",
      "scenario": "Rank all employees within their respective departments based on base salary using DENSE_RANK. Calculate each employee's departmental salary rank and the running cumulative payroll total within that department.",
      "schema": "Table: Employees (id, first_name, department, salary, tenure)",
      "challenge": "Write a query returning first_name, department, salary, dept_rank, and cumulative departmental payroll.",
      "hints": [
        "DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC).",
        "SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)."
      ],
      "expectedSql": "SELECT \n  first_name,\n  department,\n  salary,\n  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,\n  SUM(salary) OVER (\n    PARTITION BY department \n    ORDER BY salary DESC \n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_dept_payroll\nFROM Employees;"
    },
    "problem": {
      "title": "LeetCode 185: Department Top Three Salaries",
      "difficulty": "hard",
      "spec": "A company's executives are interested in seeing who earns the most money in each of the company's departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department. Write a solution to find the employees who are high earners in each of the departments.",
      "starterSql": "WITH RankedSalaries AS (\n  SELECT \n    d.name AS Department,\n    e.name AS Employee,\n    e.salary AS Salary,\n    DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk\n  FROM Employee e\n  JOIN Department d ON e.departmentId = d.id\n)\nSELECT Department, Employee, Salary\nFROM RankedSalaries\nWHERE rnk <= 3;",
      "targetTable": "Employee"
    },
    "interviewDefense": {
      "question": "Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK(). Why are window functions banned from the WHERE clause, and how do you filter by them?",
      "difficulty": "L5 Senior People / Product Analytics",
      "testedConcept": "Window Framing, Non-Collapsing Partitioning & Execution Order",
      "interviewerIntent": "Canonical FAANG interview question testing analytic window scopes and execution boundaries.",
      "spokenAnswer": "ROW_NUMBER() assigns strict unique sequential integers (1, 2, 3, 4) regardless of ties. RANK() gives tied values the same rank, but skips subsequent numbers—for example, two tied for 2nd produces 1, 2, 2, 4. DENSE_RANK() assigns tied values the same rank without skipping, producing 1, 2, 2, 3. Window functions cannot be used in WHERE because WHERE evaluates in Step 2 to determine which rows survive, whereas window functions execute in Step 5 during projection. To filter by rank, we wrap the window calculation inside a CTE and filter on the resulting alias in the outer query.",
      "codeSnippet": "WITH RankedSalaries AS (\n  SELECT \n    first_name, department, salary,\n    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\n  FROM Employees\n)\nSELECT * FROM RankedSalaries WHERE dept_rank <= 3;",
      "powerKeywords": [
        "DENSE_RANK Non-Skipping Ties",
        "Analytical Partitioning",
        "Step 02 WHERE vs Step 05 SELECT",
        "CTE Window Filtering"
      ]
    }
  }
];
