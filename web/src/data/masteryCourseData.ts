/**
 * SQL FOUNDRY - CURRICULUM MASTER DATA
 * Strongly typed TypeScript export of all 10 topics, 30 tiered challenges,
 * analogies, traps, tricks, and FAANG technical interview scripts.
 */

export interface McqOption {
  id?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  distractorExplanations?: string[];
}

export interface ProblemTier {
  id?: number;
  tierId?: number | string;
  tierName?: string;
  label?: string;
  badge?: string;
  badgeColor?: string;
  badgeClass?: string;
  title: string;
  difficulty: string;
  spec: string;
  starterSql: string;
  solutionSql?: string;
  expectedSolutionSql?: string;
  expectedRowCount?: number;
  targetTable: string;
  hint?: string;
  [key: string]: any;
}

export interface CaseStudy {
  icon?: string;
  badge?: string;
  challenge?: string;
  company: string;
  role: string;
  title: string;
  scenario: string;
  schema: string;
  recommendedQuery?: string;
  requirements?: string[];
  pitfalls?: string[];
  hints?: string[];
  expectedSql?: string;
  [key: string]: any;
}

export interface DeepChapter {
  title: string;
  body: string;
}

export interface Trap {
  id?: string;
  title: string;
  severity: string;
  badSql: string;
  goodSql: string;
  whyItBreaks: string;
  corporateImpact: string;
  [key: string]: any;
}

export interface Pattern {
  id?: string;
  title: string;
  formula: string;
  whenToUse: string;
  sqlTemplate: string;
  explanation: string;
  [key: string]: any;
}

export interface TrickItem {
  id?: string;
  title?: string;
  concept?: string;
  codeSnippet?: string;
  explanation?: string;
  analystValue?: string;
  [key: string]: any;
}

export interface InterviewDefense {
  difficulty: string;
  question: string;
  exactQuestion?: string;
  testedConcept?: string;
  interviewerIntent: string;
  spokenAnswer: string;
  codeSnippet: string;
  powerKeywords: string[];
  [key: string]: any;
}

export interface TopicPhase {
  id: string;
  seq: string;
  title: string;
  shortName: string;
  name: string;
  icon: string;
  execRank: string;
  summary: string;
  analogy: {
    metaphor: string;
    story: string;
    takeaway: string;
  };
  deepTheory: DeepChapter[];
  traps: Trap[];
  tricks: (string | TrickItem)[];
  patterns: Pattern[];
  interviewDefense: InterviewDefense;
  mcqs: McqOption[];
  caseStudy: CaseStudy;
  svgDiagram?: any;
  interactiveSimulator?: any;
  problem: {
    tierId?: number | string;
    tierName?: string;
    badgeClass?: string;
    title: string;
    difficulty: string;
    spec: string;
    starterSql: string;
    solutionSql?: string;
    expectedSolutionSql?: string;
    expectedRowCount?: number;
    targetTable: string;
    tiers?: ProblemTier[];
  };
  problems?: ProblemTier[];
  [key: string]: any;
}

export const TOPIC_PHASES: TopicPhase[] = [
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
        "body": "In relational database systems (RDBMS) like MySQL, PostgreSQL, and Snowflake, data is stored in **Relations (Tables)**.\n\n- **Table (Relation)**: A structured two-dimensional matrix containing rows and columns.\n- **Row (Tuple / Record)**: Represents a single instance of an entity (e.g., one employee, one transaction, one sensor ping).\n- **Column (Attribute / Field)**: Represents a specific property belonging to the entity (e.g., `first_name`, `salary`, `created_at`).\n\n```sql\n-- Every query requires at minimum: WHAT to see, and WHERE it lives\nSELECT column_1, column_2\nFROM table_name;\n```\n\nEvery SQL statement ends with a semicolon (`;`). While some command lines permit omission, in production enterprise scripting, multi-statement transactions, and stored procedures, the semicolon is mandatory.\\n\\n> [!TIP] Column Projection Discipline\n> In production microservices, never issue `SELECT *`. If a DBA adds an uncompressed `JSON` audit log or binary `BLOB` column to the table schema tomorrow, every single query in your service will instantly pull megabytes of unneeded network payload, tripling CPU serialization overhead."
      },
      {
        "title": "2. The Projection Engine: Why SELECT * is an Anti-Pattern",
        "body": "The asterisk (`*`) is wildcard shorthand instructing the database engine to retrieve **all columns** defined on the table schema.\n\n```sql\n-- Fetches every column\nSELECT * \nFROM Employees;\n```\n\n### Why Senior Engineers Ban `SELECT *` in Production:\n1. **Network & Buffer Bandwidth**: If a table has 45 columns including large `TEXT` or `JSON` blobs, `SELECT *` forces the database engine to stream gigabytes of unneeded bytes over the network socket.\n2. **Breaks Application Contracts**: If a DBA adds or removes a column in production, an application expecting a fixed array order will crash.\n3. **Columnar Warehouse Billing Multiplier**: In modern columnar databases (Snowflake, BigQuery, Redshift), storage is physically organized by columns. Pricing is billed per Terabyte scanned. Querying `SELECT *` reads all 50 column files off S3, multiplying cloud costs by 50x compared to `SELECT user_id, email`.\n\n```sql\n-- ✅ Production Best Practice: Always explicitly list the exact columns required\nSELECT first_name, department, salary\nFROM Employees;\n```\\n\\n> [!WARNING] The Alias in WHERE Trap\n> Never attempt to filter on a column alias in the `WHERE` clause (e.g. `WHERE monthly_pay > 5000`). Relational engines parse and execute `WHERE` in Step 02, long before `SELECT` creates the alias in Step 05."
      },
      {
        "title": "3. Column Aliasing with AS: Semantic Naming & Header Cleanliness",
        "body": "Raw database column names are often abbreviated or cryptic (e.g., `fn`, `dept_cd`, `sal_usd_m`). You can rename any projected column in your output set using the `AS` keyword:\n\n```sql\nSELECT \n  first_name AS employee_name,\n  department AS operational_division,\n  salary     AS base_annual_compensation\nFROM Employees;\n```\n\n- The `AS` keyword is technically optional in ANSI SQL (`SELECT first_name employee_name`), but omitting it is dangerous: if you accidentally forget a comma between two column names (`SELECT first_name department FROM ...`), SQL will treat `department` as an alias for `first_name` without throwing an error!\n- **Rule**: Always write `AS` explicitly for clarity and maintainability.\\n\\n> [!IMPORTANT] Columnar Warehouse Billing\n> In modern cloud warehouses like Snowflake, BigQuery, and Databricks, storage is stored in columnar blocks (Parquet/ORC). Query billing is directly calculated on total bytes scanned off disk. Limiting your query to only the 3 columns needed reduces cloud infrastructure bills by 80-95%."
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
          "Multiply all numeric columns by 1",
          "Select and display every column defined in the table schema",
          "Filter only rows with non-null primary keys",
          "Perform a full table backup to disk storage"
        ],
        "correct": 1,
        "explanation": "The asterisk (*) is wildcard shorthand meaning 'project every single attribute/column belonging to the table schema'.",
        "distractorExplanations": [
          "The asterisk is only used for mathematical multiplication inside expressions like `salary * 1.1`, never as an isolated projection clause.",
          "Correct! It instructs the projection engine to retrieve all columns present in the table.",
          "Row filtering is exclusively handled by the WHERE clause in Step 02, not by the SELECT asterisk in Step 05.",
          "Data backups require administrative DDL/utility commands like mysqldump or pg_dump, not a DQL SELECT query."
        ]
      },
      {
        "id": "mcq_t1_2",
        "question": "Why does `SELECT first_name, salary * 0.1 AS bonus FROM Employees WHERE bonus > 5000;` fail?",
        "options": [
          "You cannot perform arithmetic multiplication inside SELECT",
          "WHERE executes in Step 02 before SELECT defines the alias 'bonus' in Step 05",
          "The AS keyword is reserved strictly for table aliases",
          "SQL does not permit numeric comparisons in WHERE"
        ],
        "correct": 1,
        "explanation": "Physical execution order! The engine executes FROM (1) and WHERE (2) before SELECT (5). When WHERE filters rows, the alias 'bonus' does not exist yet.",
        "distractorExplanations": [
          "Arithmetic operations (+, -, *, /) are fully supported inside SELECT statements for scalar expressions.",
          "Correct! At the time WHERE evaluates predicates, aliases created in SELECT have not been evaluated.",
          "AS is standard ANSI SQL for both column aliases and table aliases (e.g., `FROM Employees AS e`).",
          "Numeric comparisons (> , <, =, !=) are standard relational predicates in WHERE."
        ]
      },
      {
        "id": "mcq_t1_3",
        "question": "What is the output of `SELECT DISTINCT country, city FROM Stores;` if the table has two 'USA, Austin' rows and one 'USA, Dallas' row?",
        "options": [
          "1 row: 'USA, Austin'",
          "2 rows: ('USA, Austin') and ('USA, Dallas')",
          "3 rows: ('USA, Austin'), ('USA, Austin'), ('USA, Dallas')",
          "Syntax Error: DISTINCT only accepts a single column name"
        ],
        "correct": 1,
        "explanation": "DISTINCT applies to the entire projected row tuple (country, city). Since ('USA', 'Austin') and ('USA', 'Dallas') are unique pairs, both are preserved while the duplicate is removed.",
        "distractorExplanations": [
          "Deduplication does not drop distinct cities; 'USA, Dallas' is unique and must appear in the result.",
          "Correct! DISTINCT evaluates uniqueness across all specified columns combined as a tuple.",
          "DISTINCT actively strips duplicate rows from the output stream; it will never return both identical 'USA, Austin' rows.",
          "DISTINCT is not a function; it is a clause modifier that applies across all columns in the projection list."
        ]
      },
      {
        "id": "mcq_t1_4",
        "question": "In cloud data warehouses like Snowflake, BigQuery, and Redshift, why is `SELECT *` an expensive anti-pattern?",
        "options": [
          "It acquires an exclusive table lock that blocks other queries",
          "Columnar warehouses store data by column and bill users based on total bytes scanned off disk",
          "SELECT * is not part of the ANSI SQL standard",
          "It automatically indexes every column, consuming cluster CPU"
        ],
        "correct": 1,
        "explanation": "Columnar databases charge for every byte scanned. `SELECT *` forces the storage engine to read all 50-100 columns off remote disk, multiplying cost and latency by up to 50x.",
        "distractorExplanations": [
          "SELECT queries in cloud warehouses are read-only and MVCC-compliant; they never lock tables against concurrent reads.",
          "Correct! In columnar formats (Parquet, ORC, Pax), only requested columns are scanned off storage.",
          "SELECT * has been part of the ANSI SQL standard since ANSI SQL-86.",
          "SELECT queries never generate or alter index structures; they only read data."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Revising the Select Query I",
      "targetTable": "CITY",
      "spec": "Query all columns for all American cities in the **CITY** table with populations larger than `100,000`. The CountryCode for America is `USA`.",
      "starterSql": "-- Tier 1 Warm-up: Select all columns for American cities with Population > 100,000\nSELECT *\nFROM CITY\nWHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;",
      "expectedSolutionSql": "SELECT * FROM CITY WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;",
      "expectedRowCount": 5
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Revising the Select Query I",
        "targetTable": "CITY",
        "spec": "Query all columns for all American cities in the **CITY** table with populations larger than `100,000`. The CountryCode for America is `USA`.",
        "starterSql": "-- Tier 1 Warm-up: Select all columns for American cities with Population > 100,000\nSELECT *\nFROM CITY\nWHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;",
        "expectedSolutionSql": "SELECT * FROM CITY WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;",
        "expectedRowCount": 5
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Specific Column Projection & Math Expression",
        "targetTable": "Employees",
        "spec": "Query `first_name`, `department`, `salary`, and compute an annual estimated bonus column named `annual_bonus` as `salary * 0.15` for all employees in the 'Analytics' department.",
        "starterSql": "-- Tier 2: Select first_name, department, salary, and calculate annual_bonus (salary * 0.15)\nSELECT first_name, department, salary, salary * 0.15 AS annual_bonus\nFROM Employees\nWHERE department = 'Analytics';",
        "expectedSolutionSql": "SELECT first_name, department, salary, salary * 0.15 AS annual_bonus FROM Employees WHERE department = 'Analytics';",
        "expectedRowCount": 2
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Multi-Column Distinct Projection with Monthly Pay",
        "targetTable": "Employees",
        "spec": "Query unique combinations of `department` and rounded monthly pay named `monthly_pay` (`salary / 12` rounded) from **Employees**, ordered alphabetically by department.",
        "starterSql": "-- Tier 3: Deduplicate department and monthly_pay (salary / 12)\nSELECT DISTINCT department, ROUND(salary / 12, 0) AS monthly_pay\nFROM Employees\nORDER BY department ASC;",
        "expectedSolutionSql": "SELECT DISTINCT department, ROUND(salary / 12, 0) AS monthly_pay FROM Employees ORDER BY department ASC;",
        "expectedRowCount": 4
      }
    ]
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
        "body": "The `WHERE` clause accepts boolean conditions that evaluate to `TRUE`, `FALSE`, or `UNKNOWN` for every individual row:\n\n```sql\nSELECT first_name, department, salary\nFROM Employees\nWHERE salary >= 100000;\n```\n\nOnly rows where the predicate evaluates strictly to `TRUE` are passed to downstream operations. Rows that evaluate to `FALSE` or `UNKNOWN` are silently dropped.\\n\\n> [!WARNING] Three-Valued Logic & NULL\n> Any boolean comparison against `NULL` evaluates to `UNKNOWN`, not `TRUE` or `FALSE`. If a column can contain NULLs, writing `WHERE status != 'ACTIVE'` will silently discard all NULL records! Always write `WHERE status != 'ACTIVE' OR status IS NULL`."
      },
      {
        "title": "2. SARGability: The #1 Performance Rule for Database Indexes",
        "body": "**SARGable** stands for *Search Argument Able*. A query predicate is SARGable if the database engine can utilize an existing B-Tree Index Seek to pinpoint rows directly, instead of performing a slow Full Table Scan (FTS).\n\n```sql\n-- ❌ NON-SARGABLE: Wrapping the indexed column in a function prevents index usage!\nWHERE YEAR(created_at) = 2024;\n\n-- ✅ SARGABLE: Keeps the indexed column isolated; scans the index leaf pages in O(log N)\nWHERE created_at >= '2024-01-01 00:00:00'\n  AND created_at <  '2025-01-01 00:00:00';\n```\\n\\n> [!TIP] Sargable Predicates for Index Seeks\n> Never wrap indexed columns in functions like `WHERE YEAR(created_at) = 2024`. Doing so destroys sargability, forcing a 100% full table scan. Rewrite as `WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'` to trigger high-speed B-Tree index range seeks."
      },
      {
        "title": "3. Compound Filtering & Operator Precedence (AND vs OR)",
        "body": "In SQL, `AND` has higher operator precedence than `OR` (similar to multiplication before addition in arithmetic).\n\n```sql\n-- ⚠️ DANGEROUS: Evaluates (country = 'CA' AND spend > 500) first!\nWHERE country = 'US' OR country = 'CA' AND spend > 500;\n-- BUG: Returns ALL US customers regardless of how much they spent!\n\n-- ✅ CORRECT: Use explicit parentheses to enforce intended evaluation order\nWHERE (country = 'US' OR country = 'CA') AND spend > 500;\n```\\n\\n> [!RULE] Safe Production Filtering Rule\n> When mixing `AND` and `OR` operators, always wrap clauses in explicit parentheses: `WHERE (is_active = 1 OR is_admin = 1) AND organization_id = 42`. In SQL, `AND` takes precedence over `OR`, which leads to catastrophic security leaks if unparenthesized."
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
        "question": "What does `WHERE kyc_status != 'APPROVED'` return if a user's kyc_status is NULL?",
        "options": [
          "The row is included because NULL is not equal to 'APPROVED'",
          "The row is included because NULL defaults to empty string",
          "The row is excluded because NULL comparisons evaluate to UNKNOWN (Three-Valued Logic)",
          "The query crashes with an unhandled NullPointerException"
        ],
        "correct": 2,
        "explanation": "SQL uses Three-Valued Logic (TRUE, FALSE, UNKNOWN). Any comparison with NULL (=, !=, <, >) yields UNKNOWN. WHERE only lets rows pass if the predicate evaluates to strictly TRUE.",
        "distractorExplanations": [
          "Classic trap! In SQL, `NULL != 'APPROVED'` evaluates to UNKNOWN, not TRUE. UNKNOWN rows are discarded by WHERE.",
          "SQL never coerces NULL to an empty string `''`. NULL represents the absence of any value.",
          "Correct! Because the predicate is UNKNOWN, the WHERE clause discards the row. You must use `IS NULL` or `COALESCE`.",
          "Relational databases handle NULL gracefully without crashing; they simply evaluate the row to UNKNOWN."
        ]
      },
      {
        "id": "mcq_t2_2",
        "question": "Why is `WHERE created_at >= '2024-01-01' AND created_at < '2024-01-02'` preferred over `WHERE DATE(created_at) = '2024-01-01'`?",
        "options": [
          "Because the DATE() function does not exist in standard SQL",
          "Wrapping the column in a function makes the predicate non-sargable, preventing the optimizer from using an B-tree index",
          "Because BETWEEN and AND are faster than mathematical equality",
          "Because the DATE() function alters timezone offsets"
        ],
        "correct": 1,
        "explanation": "Sargability! Wrapping an indexed column in a function (`DATE(created_at)`) forces the database to evaluate the function row-by-row on every single row (Full Table Scan). Range comparisons allow direct index seeks.",
        "distractorExplanations": [
          "The DATE() function is widely supported in MySQL, PostgreSQL, BigQuery, and SQLite.",
          "Correct! A function on a column prevents index seek and forces an expensive full table scan.",
          "Direct range conditions use index tree traversal (O(log N)), which is orders of magnitude faster than evaluating functions row-by-row.",
          "The DATE() function extracts the date part; the performance bottleneck is purely caused by loss of sargability."
        ]
      },
      {
        "id": "mcq_t2_3",
        "question": "Which of the following expressions will properly match an email address containing an underscore `user_name@domain.com`?",
        "options": [
          "WHERE email LIKE '%_%'",
          "WHERE email LIKE '%\\_%' ESCAPE '\\'",
          "WHERE email = '%_%'",
          "WHERE email IN ('_')"
        ],
        "correct": 1,
        "explanation": "In SQL LIKE patterns, `_` is a wildcard representing any single character. To search for a literal underscore, you must escape it with an escape character.",
        "distractorExplanations": [
          "`%_%` matches any string with at least one character because `_` acts as a wildcard!",
          "Correct! Escaping the underscore tells the pattern matcher to treat it as a literal character.",
          "Using `=` looks for the exact literal string `'%_%'` without treating `%` as wildcards.",
          "`IN ('_')` only checks if the exact full email string is a single underscore."
        ]
      },
      {
        "id": "mcq_t2_4",
        "question": "What is the logical evaluation order of AND and OR in `WHERE dept = 'Sales' OR dept = 'Eng' AND salary > 100000`?",
        "options": [
          "Strictly left-to-right: (dept = 'Sales' OR dept = 'Eng') AND salary > 100000",
          "AND has higher precedence than OR: dept = 'Sales' OR (dept = 'Eng' AND salary > 100000)",
          "OR has higher precedence than AND: (dept = 'Sales' OR dept = 'Eng') AND salary > 100000",
          "Syntax error: You cannot combine AND and OR without parentheses"
        ],
        "correct": 1,
        "explanation": "Operator Precedence! In boolean logic and SQL, `AND` takes precedence over `OR`. A low-salary Sales rep will pass this query because the OR condition evaluates independently.",
        "distractorExplanations": [
          "SQL does not evaluate conditions left-to-right; operator precedence dictates that AND binds tighter than OR.",
          "Correct! AND binds before OR. Always use explicit parentheses `(dept = 'Sales' OR dept = 'Eng') AND salary > 100000` to prevent logic bugs.",
          "OR does not take precedence over AND in SQL or boolean algebra.",
          "SQL allows mixing AND and OR without parentheses, but it is dangerous and prone to misinterpretation."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: High-Comp Engineering Search",
      "targetTable": "Employees",
      "spec": "Find the `first_name` and `salary` of all staff in the 'Engineering' department earning greater than or equal to `120,000`.",
      "starterSql": "-- Tier 1 Warm-up: Filter Engineering staff with salary >= 120,000\nSELECT first_name, salary\nFROM Employees\nWHERE department = 'Engineering' AND salary >= 120000;",
      "expectedSolutionSql": "SELECT first_name, salary FROM Employees WHERE department = 'Engineering' AND salary >= 120000;",
      "expectedRowCount": 1
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: High-Comp Engineering Search",
        "targetTable": "Employees",
        "spec": "Find the `first_name` and `salary` of all staff in the 'Engineering' department earning greater than or equal to `120,000`.",
        "starterSql": "-- Tier 1 Warm-up: Filter Engineering staff with salary >= 120,000\nSELECT first_name, salary\nFROM Employees\nWHERE department = 'Engineering' AND salary >= 120000;",
        "expectedSolutionSql": "SELECT first_name, salary FROM Employees WHERE department = 'Engineering' AND salary >= 120000;",
        "expectedRowCount": 1
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Revising the Select Query II",
        "targetTable": "CITY",
        "spec": "Query only the **NAME** column for all American cities in the **CITY** table with populations larger than `120,000`. The CountryCode for America is `USA`.",
        "starterSql": "-- Tier 2: Select NAME for American cities with Population > 120,000\nSELECT NAME\nFROM CITY\nWHERE COUNTRYCODE = 'USA' AND POPULATION > 120000;",
        "expectedSolutionSql": "SELECT NAME FROM CITY WHERE COUNTRYCODE = 'USA' AND POPULATION > 120000;",
        "expectedRowCount": 4
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Null-Safe Bonus & Salary Filter",
        "targetTable": "Employees",
        "spec": "Return all employees who either have an active bonus greater than `4000` OR have a base salary greater than `110,000`. Ensure employees with NULL bonuses are not accidentally dropped by the salary condition.",
        "starterSql": "-- Tier 3: Null-safe boolean logic with parentheses\nSELECT first_name, department, salary, bonus\nFROM Employees\nWHERE (bonus IS NOT NULL AND bonus > 4000) OR salary > 110000;",
        "expectedSolutionSql": "SELECT first_name, department, salary, bonus FROM Employees WHERE (bonus IS NOT NULL AND bonus > 4000) OR salary > 110000;",
        "expectedRowCount": 3
      }
    ]
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
        "body": "Relational tables have no inherent order. Without an `ORDER BY` clause, the database engine returns rows in arbitrary physical storage order. When `ORDER BY` is requested, the engine allocates a temporary Sort Buffer in RAM. If the dataset exceeds buffer memory, the engine spills temporary chunks to disk and merges them, increasing execution time by 10x.\\n\\n> [!WARNING] The Deep OFFSET Performance Cliff\n> Using `LIMIT 10 OFFSET 500000` forces the database to read, sort, and discard 500,010 rows off disk before returning 10. For high-scale pagination, use Keyset/Seek pagination: `WHERE id > last_seen_id ORDER BY id ASC LIMIT 10`."
      },
      {
        "title": "2. Multi-Column Sorting & Deterministic Tie-Breaking",
        "body": "When multiple rows possess identical values in the primary sort column, their relative order is completely random unless a secondary tie-breaker is provided:\n\n```sql\n-- ✅ Deterministic: Sorts by department, then breaks ties by salary descending\nSELECT first_name, department, salary\nFROM Employees\nORDER BY department ASC, salary DESC, id ASC;\n```\\n\\n> [!TIP] Deterministic Pagination Guarantee\n> Always append a unique key (such as `id`) as the final column in your `ORDER BY` clause. If records share the same sort value (like identical salaries), the database returns them in arbitrary disk order, causing rows to disappear or duplicate across pagination pages."
      },
      {
        "title": "3. Slicing with LIMIT and OFFSET (Pagination)",
        "body": "- `LIMIT N`: Restricts output to at most $N$ rows.\n- `OFFSET M`: Skips the first $M$ rows before emitting results.\n\n```sql\n-- Page 2 of a 20-item leaderboard:\nSELECT user_id, score\nFROM Leaderboard\nORDER BY score DESC, user_id ASC\nLIMIT 20 OFFSET 20;\n```\\n\\n> [!IMPORTANT] Dialect NULL Placement\n> PostgreSQL sorts NULLs last in ASC by default, while MySQL and SQLite sort NULLs first in ASC. In production, always be explicit by writing `ORDER BY priority ASC NULLS LAST` (or `ORDER BY CASE WHEN priority IS NULL THEN 1 ELSE 0 END, priority ASC`)."
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
        "question": "What happens when you run `SELECT * FROM Transactions ORDER BY created_at LIMIT 10 OFFSET 1000000;`?",
        "options": [
          "The database instantly jumps to the 1,000,000th row using index pointer arithmetic",
          "The database must scan and sort 1,000,010 rows off disk into memory before discarding the first 1,000,000",
          "The query fails because OFFSET cannot exceed 100,000 in SQL",
          "The database creates a permanent view to cache offset pages"
        ],
        "correct": 1,
        "explanation": "Deep Offset problem! The database does not know which rows qualify without scanning and ordering all 1,000,010 rows, discarding the first million. For high-volume pagination, use Keyset/Seek pagination (`WHERE id > last_seen_id`).",
        "distractorExplanations": [
          "Standard B-trees do not store row offsets, so the engine cannot jump directly to an arbitrary offset without scanning.",
          "Correct! Large offsets cause massive disk I/O and latency spikes because all preceding rows must be processed and discarded.",
          "ANSI SQL has no hard upper limit on OFFSET values; the limitation is query execution time.",
          "OFFSET never creates views or caches rows automatically."
        ]
      },
      {
        "id": "mcq_t3_2",
        "question": "If an ORDER BY column contains NULL values, where are they placed by default in PostgreSQL vs MySQL?",
        "options": [
          "Both place NULLs first in ASC order",
          "PostgreSQL places NULLs LAST in ASC; MySQL places NULLs FIRST in ASC",
          "PostgreSQL places NULLs FIRST in ASC; MySQL places NULLs LAST in ASC",
          "Both automatically delete NULL rows before sorting"
        ],
        "correct": 1,
        "explanation": "Dialect divergence! PostgreSQL treats NULL as larger than any value (NULLS LAST in ASC), while MySQL treats NULL as smaller than any value (NULLS FIRST in ASC). Use `NULLS LAST` explicitly in production.",
        "distractorExplanations": [
          "PostgreSQL and MySQL differ in default NULL sorting behavior.",
          "Correct! PostgreSQL considers NULL greater than non-NULL (placed last in ASC), whereas MySQL considers NULL lowest (placed first in ASC).",
          "This reverses the real default behaviors of Postgres and MySQL.",
          "ORDER BY never deletes or filters rows; it only reorganizes them."
        ]
      },
      {
        "id": "mcq_t3_3",
        "question": "Why can `SELECT * FROM Employees ORDER BY salary DESC LIMIT 5;` return different employees on consecutive runs if multiple employees share the same salary?",
        "options": [
          "Because SQL randomizes results to prevent caching bias",
          "Because without a unique tiebreaker column, the sort order for identical values is non-deterministic",
          "Because LIMIT introduces a random sampling algorithm",
          "Because salary is stored as a floating point number"
        ],
        "correct": 1,
        "explanation": "Deterministic Sorting! If values in the ORDER BY clause are not unique, the storage engine returns ties based on physical disk page ordering, which can change after vacuuming, updates, or index maintenance. Always add a tiebreaker: `ORDER BY salary DESC, id ASC`.",
        "distractorExplanations": [
          "SQL engines never inject randomness unless `ORDER BY RANDOM()` or `RAND()` is explicitly specified.",
          "Correct! Always include a primary key or unique column as the final tiebreaker in ORDER BY for deterministic pagination.",
          "LIMIT simply truncates the rowstream; it does not perform random sampling.",
          "Data types do not cause non-deterministic row order when values are strictly identical."
        ]
      },
      {
        "id": "mcq_t3_4",
        "question": "In what phase of query execution does `ORDER BY` run relative to `SELECT` and `LIMIT`?",
        "options": [
          "Before SELECT, but after WHERE",
          "After SELECT, but before LIMIT",
          "After LIMIT",
          "Before WHERE"
        ],
        "correct": 1,
        "explanation": "Physical Execution Order: FROM (1) &rarr; WHERE (2) &rarr; GROUP BY (3) &rarr; HAVING (4) &rarr; SELECT (5) &rarr; ORDER BY (6) &rarr; LIMIT (7). Because ORDER BY runs after SELECT, it can use aliases created in SELECT!",
        "distractorExplanations": [
          "ORDER BY runs after SELECT, which is why column aliases defined in SELECT are valid in ORDER BY.",
          "Correct! ORDER BY sorts the projected result stream (Step 6) before LIMIT truncates it (Step 7).",
          "LIMIT runs strictly last to truncate the sorted stream; ORDER BY must complete before LIMIT can slice.",
          "WHERE filters rows early in Step 2; ORDER BY runs near the very end in Step 6."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Top 3 Highest Earners",
      "targetTable": "Employees",
      "spec": "Select the top 3 highest earning employees (`first_name`, `department`, `salary`) ordered by salary descending.",
      "starterSql": "-- Tier 1 Warm-up: Top 3 highest salaries\nSELECT first_name, department, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 3;",
      "expectedSolutionSql": "SELECT first_name, department, salary FROM Employees ORDER BY salary DESC LIMIT 3;",
      "expectedRowCount": 3
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Top 3 Highest Earners",
        "targetTable": "Employees",
        "spec": "Select the top 3 highest earning employees (`first_name`, `department`, `salary`) ordered by salary descending.",
        "starterSql": "-- Tier 1 Warm-up: Top 3 highest salaries\nSELECT first_name, department, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 3;",
        "expectedSolutionSql": "SELECT first_name, department, salary FROM Employees ORDER BY salary DESC LIMIT 3;",
        "expectedRowCount": 3
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Weather Observation Station 5",
        "targetTable": "STATION",
        "spec": "Query the shortest **CITY** name and its length from the **STATION** table. If there are ties, choose the one that comes first alphabetically.",
        "starterSql": "-- Tier 2: Shortest city name and its length with alphabetical tiebreaker\nSELECT CITY, LENGTH(CITY)\nFROM STATION\nORDER BY LENGTH(CITY) ASC, CITY ASC\nLIMIT 1;",
        "expectedSolutionSql": "SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) ASC, CITY ASC LIMIT 1;",
        "expectedRowCount": 1
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Deterministic Pagination Keyset",
        "targetTable": "Employees",
        "spec": "Select 2 employees earning `115,000` or less using a deterministic sort order (`salary DESC, id ASC`) to prevent pagination drift.",
        "starterSql": "-- Tier 3: Deterministic pagination query\nSELECT id, first_name, salary\nFROM Employees\nWHERE salary <= 115000\nORDER BY salary DESC, id ASC\nLIMIT 2;",
        "expectedSolutionSql": "SELECT id, first_name, salary FROM Employees WHERE salary <= 115000 ORDER BY salary DESC, id ASC LIMIT 2;",
        "expectedRowCount": 2
      }
    ]
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
        "body": "Aggregate functions take a collection of values and return a single scalar summary value. In SQL, aggregates ignore `NULL` values automatically, except for `COUNT(*)` which counts all rows regardless of content.\\n\\n> [!WARNING] COUNT(*) vs COUNT(column)\n> `COUNT(*)` counts total rows emitted, including rows with NULLs. `COUNT(column_name)` silently skips every row where that specific column is NULL. Using `COUNT(email)` to count total users will undercount any users without an email on file."
      },
      {
        "title": "2. COUNT(*) vs COUNT(column_name): The Critical Difference",
        "body": "- `COUNT(*)`: Measures the cardinality of the table. Counts every row, including rows with NULL attributes.\n- `COUNT(column_name)`: Counts only rows where `column_name` is NOT NULL.\n- `COUNT(DISTINCT column_name)`: Counts unique non-null values.\\n\\n> [!TIP] Empty Set Aggregate Return Values\n> Except for `COUNT` (which returns 0), all standard SQL aggregate functions (`SUM`, `AVG`, `MIN`, `MAX`) evaluate to `NULL` when run on an empty set. Always wrap financial aggregates in `COALESCE(SUM(amount), 0)` to guarantee safe numeric responses."
      },
      {
        "title": "3. The Empty-Set NULL Behavior",
        "body": "When an aggregate query matches zero rows:\n- `COUNT(*)` returns `0`.\n- `SUM()`, `AVG()`, `MIN()`, and `MAX()` return `NULL`!\n- **Defense**: Wrap financial aggregates in `COALESCE(SUM(amount), 0.00)` to prevent breaking arithmetic.\\n\\n> [!IMPORTANT] Memory Costs of COUNT(DISTINCT)\n> `COUNT(*)` is an O(1) memory counter. `COUNT(DISTINCT user_id)` requires allocating an in-memory hash table of every distinct ID, which spills to disk on large datasets. In big data analytics (Presto/Spark/BigQuery), use `APPROX_DISTINCT(user_id)` for 99% accuracy at 1% of the memory cost."
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
        "question": "What is the difference between `COUNT(*)` and `COUNT(bonus)` if 2 out of 10 employees have a NULL bonus?",
        "options": [
          "Both return 10",
          "COUNT(*) returns 10; COUNT(bonus) returns 8",
          "COUNT(*) returns 8; COUNT(bonus) returns 10",
          "COUNT(bonus) returns a syntax error because bonus contains NULLs"
        ],
        "correct": 1,
        "explanation": "`COUNT(*)` counts the total number of physical rows emitted. `COUNT(column)` only counts non-NULL values, silently ignoring all NULL entries.",
        "distractorExplanations": [
          "`COUNT(column)` explicitly skips NULLs, so it cannot return 10 when 2 rows are NULL.",
          "Correct! COUNT(*) counts every row in the stream; COUNT(column) ignores NULLs and returns 8.",
          "COUNT(*) never skips rows; COUNT(bonus) is the one that skips NULLs.",
          "Aggregate functions in SQL are designed to ignore NULLs without throwing syntax errors."
        ]
      },
      {
        "id": "mcq_t4_2",
        "question": "What does `SELECT AVG(score) FROM ExamResults;` return if scores are [100, 50, NULL]?",
        "options": [
          "50 (150 divided by 3, treating NULL as 0)",
          "75 (150 divided by 2, completely ignoring the NULL row)",
          "NULL (because NULL poisons all calculations)",
          "0"
        ],
        "correct": 1,
        "explanation": "Aggregate functions ignore NULLs entirely! `AVG` computes SUM(non-null) / COUNT(non-null) = (100 + 50) / 2 = 75. If you want NULL treated as 0, you must write `AVG(COALESCE(score, 0))`.",
        "distractorExplanations": [
          "SQL aggregates never treat NULL as 0 automatically; they completely exclude the row from both numerator and denominator.",
          "Correct! The denominator is 2, not 3, resulting in (100 + 50) / 2 = 75.",
          "Scalar arithmetic (e.g., `100 + NULL`) yields NULL, but SQL set aggregate functions (SUM, AVG) deliberately skip NULLs.",
          "The average of 100 and 50 is 75, not 0."
        ]
      },
      {
        "id": "mcq_t4_3",
        "question": "What does `SELECT SUM(amount) FROM Orders WHERE 1 = 0;` return on an empty filtered dataset?",
        "options": [
          "0",
          "NULL",
          "An empty row (0 rows returned)",
          "A runtime execution error"
        ],
        "correct": 1,
        "explanation": "ANSI standard aggregate behavior! Except for `COUNT` (which returns 0), all SQL aggregate functions (`SUM`, `AVG`, `MIN`, `MAX`) return `NULL` when applied to an empty set of rows.",
        "distractorExplanations": [
          "Only `COUNT(*)` returns 0 on an empty set. `SUM`, `AVG`, `MIN`, and `MAX` return NULL. Use `COALESCE(SUM(amount), 0)` to guarantee 0.",
          "Correct! SUM over an empty set evaluates to NULL per ANSI SQL standards.",
          "A scalar aggregate query without GROUP BY always returns exactly 1 row, never 0 rows.",
          "Filtering out all rows is completely valid SQL and does not raise runtime errors."
        ]
      },
      {
        "id": "mcq_t4_4",
        "question": "Why is `SELECT COUNT(DISTINCT user_id) FROM EventLogs;` significantly slower on 100M rows than `COUNT(user_id)`?",
        "options": [
          "Because DISTINCT requires a hash table or sorting to identify unique IDs in memory, spilling to disk",
          "Because DISTINCT forces a table lock",
          "Because COUNT(DISTINCT) is not parallelizable in modern engines",
          "Because DISTINCT disables all database compression"
        ],
        "correct": 0,
        "explanation": "Memory state cost! `COUNT(user_id)` is a stream accumulator (simply increments a 64-bit integer counter). `COUNT(DISTINCT user_id)` must maintain a stateful hash set or B-tree of every unique ID, consuming gigabytes of RAM and spilling to temp disk.",
        "distractorExplanations": [
          "Correct! State tracking for uniqueness requires heavy hashing or sorting, creating significant memory and disk overhead.",
          "SELECT queries do not take table locks in modern MVCC databases.",
          "Modern engines can parallelize COUNT(DISTINCT) using partial hash aggregation and merge phases, but the memory footprint remains massive.",
          "DISTINCT operates in engine memory after disk decompression; it does not change on-disk storage compression."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Executive Payroll Summary",
      "targetTable": "Employees",
      "spec": "Calculate `total_staff` (count of rows), `total_payroll` (sum of salary), and `avg_salary` across the entire company.",
      "starterSql": "-- Tier 1 Warm-up: Company-wide aggregate metrics\nSELECT COUNT(*) AS total_staff, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary\nFROM Employees;",
      "expectedSolutionSql": "SELECT COUNT(*) AS total_staff, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary FROM Employees;",
      "expectedRowCount": 1
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Executive Payroll Summary",
        "targetTable": "Employees",
        "spec": "Calculate `total_staff` (count of rows), `total_payroll` (sum of salary), and `avg_salary` across the entire company.",
        "starterSql": "-- Tier 1 Warm-up: Company-wide aggregate metrics\nSELECT COUNT(*) AS total_staff, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary\nFROM Employees;",
        "expectedSolutionSql": "SELECT COUNT(*) AS total_staff, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary FROM Employees;",
        "expectedRowCount": 1
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Weather Observation Station 4",
        "targetTable": "STATION",
        "spec": "Find the difference between the total number of **CITY** entries in the table and the number of distinct **CITY** entries.",
        "starterSql": "-- Tier 2: Difference between total count and distinct count\nSELECT COUNT(CITY) - COUNT(DISTINCT CITY) AS duplicate_count\nFROM STATION;",
        "expectedSolutionSql": "SELECT COUNT(CITY) - COUNT(DISTINCT CITY) AS duplicate_count FROM STATION;",
        "expectedRowCount": 1
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Null-Safe Empty-Set Financial Sum",
        "targetTable": "Orders",
        "spec": "Sum `total_amount` as `settled_volume` for all orders with status 'COMPLETED' and amount > 500,000. Wrap in `COALESCE` to guarantee a 0 response if no orders qualify.",
        "starterSql": "-- Tier 3: Null-safe aggregate return value\nSELECT COALESCE(SUM(amount), 0) AS settled_volume\nFROM Orders\nWHERE status = 'COMPLETED';",
        "expectedSolutionSql": "SELECT COALESCE(SUM(amount), 0) AS settled_volume FROM Orders WHERE status = 'COMPLETED';",
        "expectedRowCount": 1
      }
    ]
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
        "body": "When you use `GROUP BY`, every column in your `SELECT` list must either be:\n1. Explicitly named in the `GROUP BY` clause, OR\n2. Wrapped inside an aggregate function (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).\nListing an unaggregated column not in `GROUP BY` violates ANSI SQL standards (`only_full_group_by`).\\n\\n> [!RULE] Row Filtering vs Group Filtering\n> Filter before grouping whenever possible! `WHERE` filters individual rows before grouping (Step 02), reducing the number of rows that must be hashed in memory. `HAVING` filters aggregated groups after grouping (Step 04). Never put a row-level filter in HAVING.\\n\\n> [!IMPORTANT] Grouping on NULL Values\n> Relational databases treat all NULL values as equal for grouping purposes. All records with a NULL group key collapse into a single summary row in the result set."
      },
      {
        "title": "2. The Architectural Divide: WHERE vs HAVING",
        "body": "- **WHERE (Step 02)**: Evaluates before grouping. Filters raw individual records. Cannot contain aggregate functions like `SUM()`.\n- **HAVING (Step 04)**: Evaluates after grouping. Filters aggregated bucket metrics. Operates on summary rows.\\n\\n> [!WARNING] The Single-Value Rule\n> In ANSI SQL, every column in the `SELECT` list must either be inside an aggregate function or explicitly listed in the `GROUP BY` clause. Selecting an unaggregated column that is not grouped creates an ambiguous query that crashes in Postgres and MySQL 8.0."
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
        "question": "Why does `SELECT dept, AVG(salary) FROM Employees WHERE AVG(salary) > 80000 GROUP BY dept;` fail?",
        "options": [
          "Because AVG() cannot be calculated for departments",
          "WHERE runs in Step 02 before GROUP BY collapses rows into groups in Step 03; you must filter aggregates in HAVING",
          "Because you cannot select columns that are in the GROUP BY clause",
          "Because HAVING is only used for COUNT, not AVG"
        ],
        "correct": 1,
        "explanation": "Physical execution order! WHERE filters individual base table rows before any groups exist. To filter aggregated group statistics, you must use HAVING (Step 04), which runs after GROUP BY.",
        "distractorExplanations": [
          "AVG(salary) is perfectly valid when grouped by department.",
          "Correct! WHERE filters individual rows before grouping; HAVING filters aggregated groups after grouping.",
          "Any column listed in GROUP BY is valid and encouraged in the SELECT list.",
          "HAVING works with all aggregate functions: AVG, SUM, COUNT, MIN, MAX."
        ]
      },
      {
        "id": "mcq_t5_2",
        "question": "If a query has both WHERE and HAVING, which condition runs first?",
        "options": [
          "HAVING runs first to filter groups, then WHERE filters rows within those groups",
          "WHERE runs first to filter rows, then GROUP BY creates groups, then HAVING filters groups",
          "They execute simultaneously in parallel",
          "The query optimizer picks randomly based on table size"
        ],
        "correct": 1,
        "explanation": "SQL Execution Order: FROM (1) &rarr; WHERE (2) &rarr; GROUP BY (3) &rarr; HAVING (4). Always put row-level filters in WHERE so the database processes fewer rows before grouping!",
        "distractorExplanations": [
          "HAVING cannot run first because groups do not exist until rows are filtered and grouped.",
          "Correct! WHERE filters rows first, drastically reducing the volume of data that GROUP BY must hash or sort.",
          "Relational algebra requires row filtering before set partitioning; they cannot execute simultaneously on raw rows.",
          "Execution order is strictly defined by the relational model, not random optimizer heuristics."
        ]
      },
      {
        "id": "mcq_t5_3",
        "question": "What happens if a column in the `GROUP BY` list contains NULL values across multiple rows?",
        "options": [
          "All rows with NULL are completely discarded from the query output",
          "All NULL values are grouped together into a single summary group row",
          "Each NULL row becomes its own individual group row",
          "The query crashes with an unhandled NullPointerException"
        ],
        "correct": 1,
        "explanation": "Group By NULL handling! In standard SQL, all NULL values are considered equal for the purposes of grouping and collapse into one single group row with a `NULL` group key.",
        "distractorExplanations": [
          "GROUP BY does not discard NULL rows; you must explicitly filter them with `WHERE col IS NOT NULL` if you want them excluded.",
          "Correct! All NULL rows form a single group in the result set.",
          "NULLs do not form separate individual groups; they are unified into one aggregate group.",
          "Relational databases are built to handle NULL grouping gracefully without crashing."
        ]
      },
      {
        "id": "mcq_t5_4",
        "question": "What is the Single-Value Rule in standard ANSI SQL regarding `GROUP BY`?",
        "options": [
          "Every table in the FROM clause can only have one group",
          "Any column in the SELECT list that is not inside an aggregate function MUST be present in the GROUP BY clause",
          "GROUP BY can only group by integer columns",
          "HAVING can only evaluate single-value integers"
        ],
        "correct": 1,
        "explanation": "Single-Value Rule! If you group by `department`, returning `first_name` without an aggregate is ambiguous because a department has dozens of different employee names. Every non-aggregated column in SELECT must be in GROUP BY.",
        "distractorExplanations": [
          "GROUP BY can produce millions of distinct groups from a single table.",
          "Correct! Without this rule, the engine cannot know which employee's name to display for a multi-employee group.",
          "GROUP BY can group by any data type: VARCHAR, DATE, TIMESTAMP, UUID, or NUMERIC.",
          "HAVING can evaluate any scalar boolean predicate over aggregates."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Department Headcount & Average Pay",
      "targetTable": "Employees",
      "spec": "Group by `department` and calculate `staff_count` and rounded `avg_salary` for each department.",
      "starterSql": "-- Tier 1 Warm-up: Basic department grouping\nSELECT department, COUNT(*) AS staff_count, ROUND(AVG(salary), 0) AS avg_salary\nFROM Employees\nGROUP BY department;",
      "expectedSolutionSql": "SELECT department, COUNT(*) AS staff_count, ROUND(AVG(salary), 0) AS avg_salary FROM Employees GROUP BY department;",
      "expectedRowCount": 3
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Department Headcount & Average Pay",
        "targetTable": "Employees",
        "spec": "Group by `department` and calculate `staff_count` and rounded `avg_salary` for each department.",
        "starterSql": "-- Tier 1 Warm-up: Basic department grouping\nSELECT department, COUNT(*) AS staff_count, ROUND(AVG(salary), 0) AS avg_salary\nFROM Employees\nGROUP BY department;",
        "expectedSolutionSql": "SELECT department, COUNT(*) AS staff_count, ROUND(AVG(salary), 0) AS avg_salary FROM Employees GROUP BY department;",
        "expectedRowCount": 3
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Top Earners",
        "targetTable": "Employee",
        "spec": "Find the maximum total earnings for all employees (`months * salary`) and the number of employees who have that maximum earnings.",
        "starterSql": "-- Tier 2: Max product earnings group and count\nSELECT (months * salary) AS total_earnings, COUNT(*)\nFROM Employee\nGROUP BY total_earnings\nORDER BY total_earnings DESC\nLIMIT 1;",
        "expectedSolutionSql": "SELECT (months * salary) AS total_earnings, COUNT(*) FROM Employee GROUP BY total_earnings ORDER BY total_earnings DESC LIMIT 1;",
        "expectedRowCount": 1
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Combining WHERE and HAVING Filters",
        "targetTable": "Employees",
        "spec": "Filter employees with salary >= 90,000 in WHERE, group by `department`, and only include departments having 2 or more qualifying employees in HAVING.",
        "starterSql": "-- Tier 3: WHERE row filter combined with HAVING group filter\nSELECT department, COUNT(*) AS qualifying_staff, AVG(salary) AS avg_sal\nFROM Employees\nWHERE salary >= 90000\nGROUP BY department\nHAVING COUNT(*) >= 2;",
        "expectedSolutionSql": "SELECT department, COUNT(*) AS qualifying_staff, AVG(salary) AS avg_sal FROM Employees WHERE salary >= 90000 GROUP BY department HAVING COUNT(*) >= 2;",
        "expectedRowCount": 1
      }
    ]
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
        "body": "In relational databases, tables are connected through keys:\n- **Primary Key (PK)**: Uniquely identifies a single row in the parent table (e.g., `Customers.customer_id`).\n- **Foreign Key (FK)**: A reference in the child table pointing back to the parent PK (e.g., `Orders.customer_id`).\\n\\n> [!WARNING] The Accidental Inner Join Bug\n> If you perform a `LEFT JOIN Orders o ON ...` and then add `WHERE o.status = 'COMPLETED'`, you have converted the LEFT JOIN into an INNER JOIN! Any customer with no orders has `o.status = NULL`, which fails the WHERE test. Move the condition into the `ON` clause: `LEFT JOIN Orders o ON ... AND o.status = 'COMPLETED'`."
      },
      {
        "title": "2. INNER JOIN vs LEFT JOIN Mechanics",
        "body": "- **INNER JOIN**: Keeps only rows that find a matching key on both sides.\n- **LEFT JOIN**: Keeps ALL rows from the left table. If the right table has no match, all right columns evaluate to `NULL`.\\n\\n> [!TIP] Cartesian Product Explosions\n> If Table A has 10 duplicate rows for key 1, and Table B has 10 duplicate rows for key 1, an INNER JOIN emits 10 * 10 = 100 rows. In production joins, always ensure the join key on at least one side is unique or pre-aggregated."
      },
      {
        "title": "3. The Critical ON vs WHERE Filter Boundary in Outer Joins",
        "body": "In a `LEFT JOIN`:\n- Conditions in the `ON` clause determine how rows are matched before NULL padding.\n- Conditions in the `WHERE` clause filter rows AFTER the join has completed. Putting a right-table filter in `WHERE` will drop all NULL-padded rows, silently converting your `LEFT JOIN` into an `INNER JOIN`!\\n\\n> [!IMPORTANT] Hash Join vs Merge Join Internals\n> When joining a large fact table (100M rows) to a small dimension table (1,000 rows), the optimizer builds an in-memory hash table of the small dimension in O(N) and probes it in O(1) per fact row. Ensuring dimension tables stay compact keeps the hash table entirely inside L3 CPU cache."
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
        "question": "What happens if you write a `LEFT JOIN` on Orders, but add `WHERE orders.created_at >= '2024-01-01'` in the WHERE clause?",
        "options": [
          "The query returns all customers and only shows orders from 2024",
          "The query silently converts into an INNER JOIN, excluding all customers who have no orders in 2024",
          "The query throws a syntax error because LEFT JOIN cannot be followed by WHERE",
          "The query replaces missing order dates with '2024-01-01'"
        ],
        "correct": 1,
        "explanation": "Accidental Inner Join! For customers with no orders, `orders.created_at` is NULL. The WHERE clause evaluates `NULL >= '2024-01-01'` to UNKNOWN and discards those customers! To preserve outer rows, place the condition in the `ON` clause: `LEFT JOIN Orders ON ... AND orders.created_at >= '2024-01-01'`.",
        "distractorExplanations": [
          "Common FAANG trap! Because WHERE executes AFTER the join, rows where orders columns are NULL are discarded by the >= comparison.",
          "Correct! Filtering an outer table column in WHERE turns a LEFT JOIN into an INNER JOIN. Move the condition into the ON clause.",
          "LEFT JOIN can freely be followed by WHERE, but conditions on the right table will eliminate preserved outer rows.",
          "SQL never auto-populates NULL columns with filter predicate values."
        ]
      },
      {
        "id": "mcq_t6_2",
        "question": "If Table A has 5 rows where `id = 1` and Table B has 4 rows where `id = 1`, how many rows are produced by `SELECT * FROM A INNER JOIN B ON A.id = B.id`?",
        "options": [
          "5 rows (maximum of either table)",
          "9 rows (sum of both tables)",
          "20 rows (Cartesian product: 5 * 4)",
          "4 rows (minimum of either table)"
        ],
        "correct": 2,
        "explanation": "Cartesian Join Explosion! In relational joins, every matching row in Table A joins with every matching row in Table B. 5 duplicate rows in A matching 4 duplicate rows in B produces 5 * 4 = 20 rows!",
        "distractorExplanations": [
          "Relational joins do not take the maximum; duplicate join keys multiply.",
          "Joins multiply matching pairs; they do not add row counts.",
          "Correct! 5 rows * 4 rows = 20 rows. Non-unique join keys cause explosive row multiplication and out-of-memory errors.",
          "Relational joins do not take the minimum; each row in A pairs with each row in B."
        ]
      },
      {
        "id": "mcq_t6_3",
        "question": "How do you write an Anti-Join to find all Customers who have NEVER placed an Order?",
        "options": [
          "SELECT * FROM Customers c INNER JOIN Orders o ON c.id != o.customer_id;",
          "SELECT * FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
          "SELECT * FROM Customers c WHERE c.orders_count = 0;",
          "SELECT * FROM Customers c RIGHT JOIN Orders o ON c.id = o.customer_id;"
        ],
        "correct": 1,
        "explanation": "Anti-Join Pattern! A `LEFT JOIN` preserves all customers, filling order columns with NULL for customers who never bought. The filter `WHERE o.id IS NULL` keeps strictly the customers without orders.",
        "distractorExplanations": [
          "`c.id != o.customer_id` produces a massive cross product of every customer with every unrelated order.",
          "Correct! LEFT JOIN + WHERE right_table.pk IS NULL is the canonical, highly-optimized SQL anti-join pattern.",
          "Tables rarely maintain an automatic `orders_count` column unless explicitly modeled as a counter cache.",
          "A RIGHT JOIN on Orders preserves all orders, which cannot find customers who never placed an order."
        ]
      },
      {
        "id": "mcq_t6_4",
        "question": "Which join algorithm does the query optimizer choose when joining a large 100M-row table against a tiny 500-row lookup table?",
        "options": [
          "Merge Join",
          "Hash Join (building an in-memory hash table of the small 500-row table)",
          "Nested Loop with Full Table Scan on both tables",
          "Cartesian Cross Join"
        ],
        "correct": 1,
        "explanation": "Hash Join! The optimizer reads the small table into RAM, constructs an in-memory hash table in O(N), then streams the large table through memory, probing the hash table in O(1) per row.",
        "distractorExplanations": [
          "Merge Join requires both tables to be pre-sorted on the join key; sorting 100M rows is too expensive.",
          "Correct! Building an in-memory hash table of the tiny table allows lightning-fast O(1) lookups as the large table streams past.",
          "Nested loops with dual full scans would require 100M * 500 = 50 billion comparisons and is rejected by modern optimizers.",
          "Cross joins compute unfiltered Cartesian products and are only used when no join predicate exists."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Asian Population Summation",
      "targetTable": "CITY",
      "spec": "Query the sum of the populations of all cities where the **CONTINENT** is 'Asia' using an INNER JOIN between CITY and COUNTRY.",
      "starterSql": "-- Tier 1 Warm-up: Inner join continent filter\nSELECT SUM(CITY.POPULATION)\nFROM CITY\nINNER JOIN COUNTRY ON CITY.COUNTRYCODE = COUNTRY.CODE\nWHERE COUNTRY.CONTINENT = 'Asia';",
      "expectedSolutionSql": "SELECT SUM(CITY.POPULATION) FROM CITY INNER JOIN COUNTRY ON CITY.COUNTRYCODE = COUNTRY.CODE WHERE COUNTRY.CONTINENT = 'Asia';",
      "expectedRowCount": 1
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Asian Population Summation",
        "targetTable": "CITY",
        "spec": "Query the sum of the populations of all cities where the **CONTINENT** is 'Asia' using an INNER JOIN between CITY and COUNTRY.",
        "starterSql": "-- Tier 1 Warm-up: Inner join continent filter\nSELECT SUM(CITY.POPULATION)\nFROM CITY\nINNER JOIN COUNTRY ON CITY.COUNTRYCODE = COUNTRY.CODE\nWHERE COUNTRY.CONTINENT = 'Asia';",
        "expectedSolutionSql": "SELECT SUM(CITY.POPULATION) FROM CITY INNER JOIN COUNTRY ON CITY.COUNTRYCODE = COUNTRY.CODE WHERE COUNTRY.CONTINENT = 'Asia';",
        "expectedRowCount": 1
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Customer Order Rollup (Preserving Inactive Accounts)",
        "targetTable": "Customers",
        "spec": "Perform a LEFT JOIN between **Customers** and **Orders** to return each customer's name, total order count, and total spent. Inactive customers should show 0 spent.",
        "starterSql": "-- Tier 2: Left join with COALESCE aggregation\nSELECT c.name, COUNT(o.id) AS order_count, COALESCE(SUM(o.amount), 0) AS total_spent\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customer_id\nGROUP BY c.name;",
        "expectedSolutionSql": "SELECT c.name, COUNT(o.id) AS order_count, COALESCE(SUM(o.amount), 0) AS total_spent FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id GROUP BY c.name;",
        "expectedRowCount": 4
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: High-Speed Anti-Join",
        "targetTable": "Customers",
        "spec": "Find all customers who have NEVER placed an order using the canonical LEFT JOIN + IS NULL anti-join pattern.",
        "starterSql": "-- Tier 3: Relational anti-join pattern\nSELECT c.id, c.name, c.email\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;",
        "expectedSolutionSql": "SELECT c.id, c.name, c.email FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
        "expectedRowCount": 1
      }
    ]
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
        "body": "- **JOINs**: Combine columns side-by-side based on a key condition.\n- **UNION / UNION ALL**: Stack rows on top of each other vertically. Both queries must project the same number of columns with compatible data types.\\n\\n> [!TIP] Always Default to UNION ALL\n> `UNION` forces the database engine to sort or hash the combined datasets to remove duplicate rows, adding massive latency. `UNION ALL` simply streams the combined results with zero deduplication overhead. Only use `UNION` if business logic strictly mandates deduplication."
      },
      {
        "title": "2. UNION vs UNION ALL: The Performance Cost of Deduplication",
        "body": "- `UNION ALL`: Simply appends the result sets. Instant execution with $O(1)$ streaming.\n- `UNION`: Appends result sets and performs an expensive deduplication sort or hash aggregation. Never use `UNION` when you know datasets are disjoint or when duplicates are acceptable.\\n\\n> [!WARNING] Set Operation Column Alignment\n> `UNION` and `UNION ALL` match columns by positional index, not by column name! If Query 1 emits `SELECT user_id, email` and Query 2 emits `SELECT email, user_id`, SQL will silently combine user_ids with emails or fail with a type cast error."
      },
      {
        "title": "3. Self-Joins: Querying Hierarchical Trees",
        "body": "When a table references itself (e.g., an `Employees` table with a `manager_id` referencing `employee_id`), you join the table to itself using two distinct aliases:\n\n```sql\nSELECT e.first_name AS employee, m.first_name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.id;\n```\\n\\n> [!IMPORTANT] Simulating FULL OUTER JOIN\n> For databases that lack native FULL OUTER JOIN support (such as SQLite and MySQL), the canonical emulation is: `SELECT ... FROM A LEFT JOIN B ... UNION ALL SELECT ... FROM A RIGHT JOIN B ... WHERE a.id IS NULL`."
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
        "question": "What is the primary difference between `UNION` and `UNION ALL`?",
        "options": [
          "UNION ALL only works on numeric data types",
          "UNION sorts and deduplicates the combined rows; UNION ALL concatenates the row streams without deduplication",
          "UNION is faster because it optimizes the network packet size",
          "UNION ALL drops rows that contain NULLs"
        ],
        "correct": 1,
        "explanation": "`UNION` performs an expensive deduplication step (hashing or sorting all rows across both datasets). `UNION ALL` simply stacks the result sets directly into the output stream without checking for duplicates, making it vastly faster.",
        "distractorExplanations": [
          "Both UNION and UNION ALL work across all SQL data types (strings, dates, numbers, JSON).",
          "Correct! Always use UNION ALL in production unless deduplication is an explicit business requirement.",
          "UNION is significantly slower than UNION ALL because identifying duplicates requires sorting or hashing all rows.",
          "UNION ALL preserves all rows, including NULLs and duplicate rows."
        ]
      },
      {
        "id": "mcq_t7_2",
        "question": "What is a prerequisite for combining two queries with `UNION` or `UNION ALL`?",
        "options": [
          "Both queries must have identical table names in the FROM clause",
          "Both queries must project the exact same number of columns with compatible data types in the same order",
          "Both queries must use identical WHERE clauses",
          "Both queries must sort by the same primary key"
        ],
        "correct": 1,
        "explanation": "Set Union Compatibility! The queries being combined must project the same number of columns, and corresponding columns must have compatible data types in positional order.",
        "distractorExplanations": [
          "Queries in a UNION can read from completely different tables (e.g. archiving historical orders vs live orders).",
          "Correct! Column count and positional data type compatibility are strict relational set operation requirements.",
          "Each query can have completely independent WHERE, JOIN, and GROUP BY logic.",
          "Queries inside a UNION do not need individual ORDER BY clauses; sorting is applied to the final unified set."
        ]
      },
      {
        "id": "mcq_t7_3",
        "question": "What is returned by a `FULL OUTER JOIN` between Table A and Table B?",
        "options": [
          "Only rows that match between A and B",
          "All rows from A, all rows from B, pairing matches and filling unmatched sides with NULL",
          "The Cartesian product of A and B",
          "A syntax error because MySQL 8.0 natively does not support FULL OUTER JOIN"
        ],
        "correct": 1,
        "explanation": "A FULL OUTER JOIN preserves all rows from both tables. Matches are combined; unmatched rows from Table A have Table B columns set to NULL, and unmatched rows from Table B have Table A columns set to NULL.",
        "distractorExplanations": [
          "Only matching rows is the definition of an INNER JOIN.",
          "Correct! FULL OUTER JOIN combines the behavior of LEFT JOIN and RIGHT JOIN into a single comprehensive set.",
          "Cartesian product without conditions is a CROSS JOIN.",
          "While MySQL historically lacked native FULL JOIN syntax (emulated via LEFT JOIN UNION RIGHT JOIN), the relational definition itself represents full set union."
        ]
      },
      {
        "id": "mcq_t7_4",
        "question": "How do you emulate a `FULL OUTER JOIN` in database engines that do not natively support it (such as MySQL and SQLite)?",
        "options": [
          "CROSS JOIN Table A and Table B",
          "Combine a LEFT JOIN and a RIGHT JOIN using UNION",
          "Use INNER JOIN with WHERE IS NULL",
          "Use an INTERSECT operator"
        ],
        "correct": 1,
        "explanation": "Classic emulation pattern: `SELECT ... FROM A LEFT JOIN B ... UNION SELECT ... FROM A RIGHT JOIN B ...`. The UNION operator automatically deduplicates the overlapping inner matched rows.",
        "distractorExplanations": [
          "CROSS JOIN multiplies every row in A by every row in B without testing key equality.",
          "Correct! LEFT JOIN + UNION + RIGHT JOIN cleanly simulates FULL OUTER JOIN and deduplicates matched rows.",
          "INNER JOIN with IS NULL returns 0 rows because inner joins require matching keys.",
          "INTERSECT returns the shared intersection, which is the exact opposite of an outer join."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Contact Stream Concatenation via UNION ALL",
      "targetTable": "Customers",
      "spec": "Stack customer emails and executive emails into a unified contact stream using UNION ALL.",
      "starterSql": "-- Tier 1 Warm-up: High-performance UNION ALL stack\nSELECT email, 'Customer' AS role FROM Customers\nUNION ALL\nSELECT email, 'Executive' AS role FROM ExecutiveReview;",
      "expectedSolutionSql": "SELECT email, 'Customer' AS role FROM Customers UNION ALL SELECT email, 'Executive' AS role FROM ExecutiveReview;",
      "expectedRowCount": 6
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Contact Stream Concatenation via UNION ALL",
        "targetTable": "Customers",
        "spec": "Stack customer emails and executive emails into a unified contact stream using UNION ALL.",
        "starterSql": "-- Tier 1 Warm-up: High-performance UNION ALL stack\nSELECT email, 'Customer' AS role FROM Customers\nUNION ALL\nSELECT email, 'Executive' AS role FROM ExecutiveReview;",
        "expectedSolutionSql": "SELECT email, 'Customer' AS role FROM Customers UNION ALL SELECT email, 'Executive' AS role FROM ExecutiveReview;",
        "expectedRowCount": 6
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Symmetric Pairs",
        "targetTable": "Functions",
        "spec": "Find all symmetric pairs (X1 = Y2 AND Y1 = X2) where X1 <= Y1, ordered by X1 ascending.",
        "starterSql": "-- Tier 2: Self-join symmetric pairs query\nSELECT f1.X, f1.Y\nFROM Functions f1\nINNER JOIN Functions f2 ON f1.X = f2.Y AND f1.Y = f2.X\nGROUP BY f1.X, f1.Y\nHAVING COUNT(*) > 1 OR f1.X < f1.Y\nORDER BY f1.X ASC;",
        "expectedSolutionSql": "SELECT f1.X, f1.Y FROM Functions f1 INNER JOIN Functions f2 ON f1.X = f2.Y AND f1.Y = f2.X GROUP BY f1.X, f1.Y HAVING COUNT(*) > 1 OR f1.X < f1.Y ORDER BY f1.X ASC;",
        "expectedRowCount": 2
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Emulating FULL OUTER JOIN in MySQL/SQLite",
        "targetTable": "Customers",
        "spec": "Simulate a FULL OUTER JOIN between Customers and Orders by uniting a LEFT JOIN with unmatched rows from the right table.",
        "starterSql": "-- Tier 3: Emulated Full Outer Join\nSELECT c.id AS customer_id, o.id AS order_id FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id\nUNION\nSELECT c.id AS customer_id, o.id AS order_id FROM Orders o LEFT JOIN Customers c ON o.customer_id = c.id WHERE c.id IS NULL;",
        "expectedSolutionSql": "SELECT c.id AS customer_id, o.id AS order_id FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id UNION SELECT c.id AS customer_id, o.id AS order_id FROM Orders o LEFT JOIN Customers c ON o.customer_id = c.id WHERE c.id IS NULL;",
        "expectedRowCount": 5
      }
    ]
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
        "body": "- **Searched CASE**: Evaluates independent boolean predicates per branch:\n```sql\nCASE \n  WHEN salary >= 120000 THEN 'Tier 1'\n  WHEN salary >= 90000  THEN 'Tier 2'\n  ELSE 'Tier 3'\nEND AS comp_tier\n```\n- **Simple CASE**: Compares an expression to literal values (`CASE department WHEN 'HR' THEN ...`). Always prefer Searched CASE because it supports comparisons, ranges, and NULL tests.\\n\\n> [!RULE] Always Specify an Explicit ELSE\n> If no `WHEN` condition matches and no `ELSE` is defined, SQL defaults the result to `NULL`. To prevent silent nulls in numeric calculations, always provide a fallback: `ELSE 0 END` or `ELSE 'UNKNOWN' END`."
      },
      {
        "title": "2. Short-Circuiting Mechanics",
        "body": "`CASE` evaluates conditions sequentially. Once a `WHEN` condition is met, evaluation stops and returns the result. More specific conditions must always appear before general conditions.\\n\\n> [!TIP] High-Speed Conditional Pivoting\n> You can pivot categorical rows into report columns without messy subqueries by combining `SUM` and `CASE WHEN`: `SUM(CASE WHEN status = 'PAID' THEN amount ELSE 0 END) AS paid_revenue`."
      },
      {
        "title": "3. The Implicit NULL Trap",
        "body": "If no `WHEN` branch matches and no `ELSE` clause is specified, `CASE` defaults to returning `NULL`. Always supply an explicit `ELSE` clause to prevent silent NULLs.\\n\\n> [!IMPORTANT] Short-Circuit Evaluation Order\n> `CASE WHEN` evaluates conditions sequentially from top to bottom and stops at the very first branch that evaluates to `TRUE`. Always place more specific conditions before general conditions."
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
        "question": "What does a `CASE WHEN` expression return if none of the WHEN conditions match and no `ELSE` clause is specified?",
        "options": [
          "Empty string `''`",
          "0",
          "NULL",
          "A runtime exception 'Case Not Found'"
        ],
        "correct": 2,
        "explanation": "SQL default ELSE! In ANSI SQL, if no WHEN condition evaluates to TRUE and no ELSE clause is provided, the expression returns NULL by default. Always provide an explicit `ELSE` to avoid unexpected NULLs.",
        "distractorExplanations": [
          "SQL never defaults missing branches to empty strings.",
          "SQL does not coerce unmatched branches to numeric 0 unless `ELSE 0` is explicitly written.",
          "Correct! Missing ELSE clauses silently default to NULL in SQL.",
          "SQL CASE expressions are safe expressions that return NULL rather than crashing with exceptions."
        ]
      },
      {
        "id": "mcq_t8_2",
        "question": "In what order does a `CASE WHEN` expression evaluate its conditions?",
        "options": [
          "All WHEN conditions are evaluated simultaneously in parallel",
          "Top-to-bottom sequentially: the first condition that evaluates to TRUE returns immediately (short-circuit)",
          "The database optimizer picks the most frequent condition first",
          "Bottom-to-top from ELSE upwards"
        ],
        "correct": 1,
        "explanation": "Short-Circuit Evaluation! CASE WHEN evaluates sequentially from top to bottom. The first WHEN clause that evaluates to TRUE determines the result, and subsequent branches are never executed.",
        "distractorExplanations": [
          "CASE expressions are sequential short-circuit structures, not parallel evaluations.",
          "Correct! Order matters: always place more specific conditions before general conditions.",
          "The optimizer cannot reorder WHEN branches because SQL semantics require first-match execution.",
          "CASE statements always evaluate top-to-bottom starting at the first WHEN clause."
        ]
      },
      {
        "id": "mcq_t8_3",
        "question": "How do you count the number of active users and inactive users in a single query using conditional aggregation?",
        "options": [
          "SELECT COUNT(*) FROM Users GROUP BY status;",
          "SELECT SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) AS active_cnt, SUM(CASE WHEN status = 'INACTIVE' THEN 1 ELSE 0 END) AS inactive_cnt FROM Users;",
          "SELECT COUNT(status = 'ACTIVE') FROM Users;",
          "SELECT CASE WHEN status = 'ACTIVE' THEN COUNT(*) END FROM Users;"
        ],
        "correct": 1,
        "explanation": "Conditional Aggregation (Pivoting)! Wrapping a `CASE WHEN` inside `SUM()` or `COUNT()` allows you to pivot rows into columns and compute multiple independent metrics in a single table pass.",
        "distractorExplanations": [
          "`GROUP BY status` returns multiple rows (one row per status), not side-by-side columns.",
          "Correct! SUM(CASE WHEN condition THEN 1 ELSE 0 END) is the industry standard pattern for conditional aggregation.",
          "`COUNT(boolean_expression)` still counts every row because boolean expressions evaluate to TRUE or FALSE, neither of which is NULL!",
          "Placing CASE outside COUNT does not produce separate column rollups."
        ]
      },
      {
        "id": "mcq_t8_4",
        "question": "What is the key difference between `COALESCE(val1, val2)` and `IFNULL(val1, val2)`?",
        "options": [
          "IFNULL accepts unlimited arguments; COALESCE only accepts two",
          "COALESCE is ANSI SQL standard and accepts unlimited arguments; IFNULL is MySQL/SQLite specific and only takes two arguments",
          "COALESCE converts values to uppercase",
          "There is no difference; they are exact aliases in all databases"
        ],
        "correct": 1,
        "explanation": "Portability & Flexibility! `COALESCE` is part of the official ANSI SQL standard and returns the first non-NULL value from an arbitrary list of arguments (`COALESCE(a, b, c, d)`). `IFNULL` is dialect-specific.",
        "distractorExplanations": [
          "COALESCE accepts unlimited arguments (2 or more); IFNULL only accepts exactly 2 arguments.",
          "Correct! Always prefer COALESCE for clean, portable SQL across Postgres, Snowflake, BigQuery, and MySQL.",
          "COALESCE handles null-replacement, not string casing transformations.",
          "PostgreSQL and Oracle do not have IFNULL; relying on it breaks cross-database compatibility."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Salary Tier Labeling",
      "targetTable": "Employees",
      "spec": "Classify employees into 'Executive Tier' (salary >= 115k), 'Senior Tier' (salary >= 100k), and 'Core Tier' using a CASE WHEN expression.",
      "starterSql": "-- Tier 1 Warm-up: Categorical classification with explicit ELSE\nSELECT first_name, salary, CASE\n  WHEN salary >= 115000 THEN 'Executive Tier'\n  WHEN salary >= 100000 THEN 'Senior Tier'\n  ELSE 'Core Tier'\nEND AS tier_label\nFROM Employees;",
      "expectedSolutionSql": "SELECT first_name, salary, CASE WHEN salary >= 115000 THEN 'Executive Tier' WHEN salary >= 100000 THEN 'Senior Tier' ELSE 'Core Tier' END AS tier_label FROM Employees;",
      "expectedRowCount": 4
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Salary Tier Labeling",
        "targetTable": "Employees",
        "spec": "Classify employees into 'Executive Tier' (salary >= 115k), 'Senior Tier' (salary >= 100k), and 'Core Tier' using a CASE WHEN expression.",
        "starterSql": "-- Tier 1 Warm-up: Categorical classification with explicit ELSE\nSELECT first_name, salary, CASE\n  WHEN salary >= 115000 THEN 'Executive Tier'\n  WHEN salary >= 100000 THEN 'Senior Tier'\n  ELSE 'Core Tier'\nEND AS tier_label\nFROM Employees;",
        "expectedSolutionSql": "SELECT first_name, salary, CASE WHEN salary >= 115000 THEN 'Executive Tier' WHEN salary >= 100000 THEN 'Senior Tier' ELSE 'Core Tier' END AS tier_label FROM Employees;",
        "expectedRowCount": 4
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Type of Triangle",
        "targetTable": "TRIANGLES",
        "spec": "Classify each record in the **TRIANGLES** table as 'Equilateral', 'Isosceles', 'Scalene', or 'Not A Triangle'.",
        "starterSql": "-- Tier 2: Triangle geometric classification\nSELECT CASE\n  WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n  WHEN A = B AND B = C THEN 'Equilateral'\n  WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n  ELSE 'Scalene'\nEND AS triangle_type\nFROM TRIANGLES;",
        "expectedSolutionSql": "SELECT CASE WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle' WHEN A = B AND B = C THEN 'Equilateral' WHEN A = B OR B = C OR A = C THEN 'Isosceles' ELSE 'Scalene' END AS triangle_type FROM TRIANGLES;",
        "expectedRowCount": 4
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Single-Pass Conditional Pivot Table",
        "targetTable": "Employees",
        "spec": "Using conditional aggregation (`SUM(CASE ...)`), count how many staff earn >= 100k vs < 100k per department in a single pass.",
        "starterSql": "-- Tier 3: Conditional aggregation pivot\nSELECT department,\n  SUM(CASE WHEN salary >= 100000 THEN 1 ELSE 0 END) AS high_earners,\n  SUM(CASE WHEN salary < 100000 THEN 1 ELSE 0 END) AS standard_earners\nFROM Employees\nGROUP BY department;",
        "expectedSolutionSql": "SELECT department, SUM(CASE WHEN salary >= 100000 THEN 1 ELSE 0 END) AS high_earners, SUM(CASE WHEN salary < 100000 THEN 1 ELSE 0 END) AS standard_earners FROM Employees GROUP BY department;",
        "expectedRowCount": 3
      }
    ]
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
        "body": "Deeply nested subqueries inside `FROM` or `WHERE` clauses force the reader to read queries inside-out, making code nearly impossible to debug or maintain. Common Table Expressions (`WITH ... AS`) define query stages in natural top-to-bottom reading order.\\n\\n> [!TIP] Top-to-Bottom Pipeline Architecture\n> Treat CTEs like clean functional programming steps. Instead of nesting subqueries 4 levels deep, break the problem into sequential named stages: `WITH RawFiltered AS (...), AggregatedMetrics AS (...), FinalRankings AS (...) SELECT * FROM FinalRankings;`.\\n\\n> [!IMPORTANT] CTE Optimization Barriers\n> In PostgreSQL 12+, CTEs are automatically inlined unless marked `WITH cte_name AS MATERIALIZED (...)`. Inlining allows the optimizer to push WHERE predicates deep into the CTE, avoiding unnecessary intermediate table generation."
      },
      {
        "title": "2. CTE Syntax & Chaining Multiple Stages",
        "body": "You can chain multiple CTEs using a single `WITH` keyword, separating each CTE definition with a comma:\n\n```sql\nWITH RegionalSales AS (\n  SELECT region, SUM(amount) AS total_sales\n  FROM Orders\n  GROUP BY region\n),\nCompanyAverage AS (\n  SELECT AVG(total_sales) AS avg_sales\n  FROM RegionalSales\n)\nSELECT r.region, r.total_sales, c.avg_sales\nFROM RegionalSales r\nCROSS JOIN CompanyAverage c\nWHERE r.total_sales > c.avg_sales;\n```\\n\\n> [!WARNING] The NOT IN NULL Death Trap\n> Never use `WHERE id NOT IN (SELECT foreign_id FROM Table)`. If even one `foreign_id` in the subquery is NULL, the entire `NOT IN` condition evaluates to `UNKNOWN` and returns 0 rows! Always use `NOT EXISTS` or `WHERE foreign_id IS NOT NULL`."
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
        "question": "What is the primary readability and architectural advantage of Common Table Expressions (CTEs) over deeply nested subqueries?",
        "options": [
          "CTEs run 100x faster because they compile directly to GPU machine code",
          "CTEs allow top-to-bottom sequential composition, self-documenting step names, and reuse across multiple subsequent joins",
          "CTEs bypass the database security permission layer",
          "CTEs automatically create physical tables on disk that survive after the connection closes"
        ],
        "correct": 1,
        "explanation": "Sequential Mental Model! Subqueries must be read inside-out from the deepest parenthesis. CTEs read top-to-bottom like code functions (`WITH Step1 AS (...), Step2 AS (...) SELECT ... FROM Step2`), dramatically improving engineering maintainability.",
        "distractorExplanations": [
          "In modern optimizers, CTEs and subqueries compile to identical relational algebra execution trees.",
          "Correct! CTEs structure complex queries into clear, modular, top-to-bottom computational pipelines.",
          "CTEs adhere to standard database RBAC and table permissions.",
          "CTEs are purely temporary query-scoped expressions; they disappear immediately when query execution finishes."
        ]
      },
      {
        "id": "mcq_t9_2",
        "question": "What dangerous bug occurs when you write `WHERE id NOT IN (SELECT parent_id FROM Categories)` if even ONE row in Categories has a NULL parent_id?",
        "options": [
          "The query returns all rows except the NULL row",
          "The query returns 0 rows (empty result set) because NOT IN with a NULL evaluates to UNKNOWN for every single candidate row",
          "The database automatically replaces the NULL with 0",
          "The query crashes with an unhandled NullPointerException"
        ],
        "correct": 1,
        "explanation": "The NOT IN NULL Trap! `id NOT IN (1, 2, NULL)` expands to `id != 1 AND id != 2 AND id != NULL`. Since `id != NULL` is UNKNOWN, the entire conjunction becomes UNKNOWN for every single row! Always use `NOT EXISTS` instead of `NOT IN` with nullable subqueries.",
        "distractorExplanations": [
          "Common FAANG interview killer! A single NULL in a NOT IN subquery causes the entire outer query to return zero rows.",
          "Correct! NOT IN with NULL poisons the boolean conjunction with UNKNOWN, discarding 100% of rows. Use NOT EXISTS!",
          "SQL engines never auto-convert NULL to 0 in subquery results.",
          "The query succeeds without errors, but produces an empty dataset, creating silent production data loss."
        ]
      },
      {
        "id": "mcq_t9_3",
        "question": "What is a Correlated Subquery?",
        "options": [
          "A subquery that runs once before the main query starts and caches its results",
          "A subquery that references a column from the outer query, evaluating once for each row processed by the outer query",
          "A subquery that performs a cross join between two unrelated databases",
          "A subquery that only operates on correlated timestamp columns"
        ],
        "correct": 1,
        "explanation": "Row-by-Row Execution! A correlated subquery depends on values from the outer query row (e.g. `WHERE salary > (SELECT AVG(salary) FROM Employees e2 WHERE e2.dept = e1.dept)`). Without optimizer unnesting, it runs once per outer row.",
        "distractorExplanations": [
          "Independent subqueries run once and cache results; correlated subqueries depend on outer row values.",
          "Correct! Correlated subqueries reference outer row values and execute conceptually for each candidate row.",
          "Correlated subqueries have nothing to do with cross-database connections.",
          "The correlation refers to relational variable binding, not timestamp data types."
        ]
      },
      {
        "id": "mcq_t9_4",
        "question": "In PostgreSQL 12+, how does the optimizer handle CTE execution by default?",
        "options": [
          "It always writes CTE results to a physical temporary table on disk",
          "It inlines non-recursive CTEs directly into the main query plan, optimizing filters across CTE boundaries unless marked `AS MATERIALIZED`",
          "It runs all CTEs in separate background worker threads",
          "It limits CTE recursion depth to 5 steps"
        ],
        "correct": 1,
        "explanation": "CTE Inlining! Before PG 12, CTEs acted as optimization barriers (always materialized in RAM/disk). Since PG 12, standard CTEs are automatically inlined, allowing filter pushdown and index scans across the CTE boundary.",
        "distractorExplanations": [
          "PostgreSQL only materializes CTEs if they are referenced multiple times or explicitly declared `AS MATERIALIZED`.",
          "Correct! Inlining allows the query optimizer to push predicates from the outer query into the CTE.",
          "CTEs do not spin up independent background threads by default.",
          "Default recursion depth is 100 (in MySQL) or governed by max_stack_depth (in Postgres)."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Filter Above Company Benchmark via CTE",
      "targetTable": "Employees",
      "spec": "Write a Common Table Expression named `CompanyBenchmark` calculating average salary, then query all employees earning above this benchmark.",
      "starterSql": "-- Tier 1 Warm-up: Simple single-step CTE\nWITH CompanyBenchmark AS (\n  SELECT AVG(salary) AS avg_sal FROM Employees\n)\nSELECT e.first_name, e.salary\nFROM Employees e, CompanyBenchmark b\nWHERE e.salary > b.avg_sal;",
      "expectedSolutionSql": "WITH CompanyBenchmark AS (SELECT AVG(salary) AS avg_sal FROM Employees) SELECT e.first_name, e.salary FROM Employees e, CompanyBenchmark b WHERE e.salary > b.avg_sal;",
      "expectedRowCount": 2
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Filter Above Company Benchmark via CTE",
        "targetTable": "Employees",
        "spec": "Write a Common Table Expression named `CompanyBenchmark` calculating average salary, then query all employees earning above this benchmark.",
        "starterSql": "-- Tier 1 Warm-up: Simple single-step CTE\nWITH CompanyBenchmark AS (\n  SELECT AVG(salary) AS avg_sal FROM Employees\n)\nSELECT e.first_name, e.salary\nFROM Employees e, CompanyBenchmark b\nWHERE e.salary > b.avg_sal;",
        "expectedSolutionSql": "WITH CompanyBenchmark AS (SELECT AVG(salary) AS avg_sal FROM Employees) SELECT e.first_name, e.salary FROM Employees e, CompanyBenchmark b WHERE e.salary > b.avg_sal;",
        "expectedRowCount": 2
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Challenges Solved per Hacker",
        "targetTable": "Hackers",
        "spec": "Query hacker_id, name, and total challenges created, ordered by total challenges descending and hacker_id ascending.",
        "starterSql": "-- Tier 2: Hacker challenges pipeline\nWITH ChallengeCounts AS (\n  SELECT hacker_id, COUNT(challenge_id) AS total_challenges\n  FROM Challenges\n  GROUP BY hacker_id\n)\nSELECT h.hacker_id, h.name, c.total_challenges\nFROM Hackers h\nJOIN ChallengeCounts c ON h.hacker_id = c.hacker_id\nORDER BY c.total_challenges DESC, h.hacker_id ASC;",
        "expectedSolutionSql": "WITH ChallengeCounts AS (SELECT hacker_id, COUNT(challenge_id) AS total_challenges FROM Challenges GROUP BY hacker_id) SELECT h.hacker_id, h.name, c.total_challenges FROM Hackers h JOIN ChallengeCounts c ON h.hacker_id = c.hacker_id ORDER BY c.total_challenges DESC, h.hacker_id ASC;",
        "expectedRowCount": 3
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Chained Multi-Step Department Normalizer",
        "targetTable": "Employees",
        "spec": "Chain two CTEs: Step 1 computes department average salary, Step 2 filters employees exceeding their department average.",
        "starterSql": "-- Tier 3: Chained multi-stage CTE\nWITH DeptAvg AS (\n  SELECT department, AVG(salary) AS avg_sal\n  FROM Employees\n  GROUP BY department\n),\nAboveDept AS (\n  SELECT e.first_name, e.department, e.salary, d.avg_sal\n  FROM Employees e\n  JOIN DeptAvg d ON e.department = d.department\n  WHERE e.salary > d.avg_sal\n)\nSELECT first_name, department, salary FROM AboveDept;",
        "expectedSolutionSql": "WITH DeptAvg AS (SELECT department, AVG(salary) AS avg_sal FROM Employees GROUP BY department), AboveDept AS (SELECT e.first_name, e.department, e.salary, d.avg_sal FROM Employees e JOIN DeptAvg d ON e.department = d.department WHERE e.salary > d.avg_sal) SELECT first_name, department, salary FROM AboveDept;",
        "expectedRowCount": 1
      }
    ]
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
        "body": "Before window functions were introduced in SQL:2003, calculating a running total or a department rank required massive, slow self-joins. Window functions compute row-level metrics against an underlying analytical window without altering row grain.\\n\\n> [!TIP] DENSE_RANK() vs RANK() for Pay Tiers\n> When finding top earners, use `DENSE_RANK()`. If two employees tie for 1st place, `DENSE_RANK` assigns them both 1 and assigns the next distinct salary 2. `RANK()` would skip to 3, missing the 2nd distinct salary tier entirely."
      },
      {
        "title": "2. Anatomy of the OVER() Clause",
        "body": "- **PARTITION BY**: Splits rows into analytical groups (similar to GROUP BY, but rows are not collapsed).\n- **ORDER BY**: Defines the sorting sequence within each partition.\n- **ROWS BETWEEN**: Defines the sliding frame (e.g., `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`).\\n\\n> [!WARNING] Window Functions in WHERE Trap\n> Window functions run in Step 05b (Projection), strictly after `WHERE` (Step 02). You cannot filter window results in the same query block! Wrap the query in a CTE (`WITH Ranked AS (...) SELECT * FROM Ranked WHERE rnk <= 3;`) or use Snowflake's `QUALIFY` clause."
      },
      {
        "title": "3. The Ranking Triad: ROW_NUMBER vs RANK vs DENSE_RANK",
        "body": "- `ROW_NUMBER()`: Assigns strict unique sequential integers (1, 2, 3, 4). Never ties.\n- `RANK()`: Ties share the same rank, but subsequent ranks skip numbers (1, 2, 2, 4).\n- `DENSE_RANK()`: Ties share the same rank, and subsequent ranks do not skip (1, 2, 2, 3).\\n\\n> [!IMPORTANT] The Default Window Frame Gotcha\n> When you specify `ORDER BY` inside an `OVER()` clause without defining a frame, SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Because it uses `RANGE` rather than `ROWS`, duplicate order values are combined together. Always be explicit: `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`."
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
        "question": "If two employees tie for the 2nd highest salary, what ranks are assigned to the 1st, 2nd, and 3rd highest distinct earners by `DENSE_RANK()` vs `RANK()`?",
        "options": [
          "DENSE_RANK: 1, 2, 2, 3 | RANK: 1, 2, 2, 4",
          "DENSE_RANK: 1, 2, 2, 4 | RANK: 1, 2, 2, 3",
          "DENSE_RANK: 1, 2, 3, 4 | RANK: 1, 2, 3, 4",
          "Both assign: 1, 2, 2, 2"
        ],
        "correct": 0,
        "explanation": "DENSE_RANK vs RANK! Both assign ties identical ranks (2, 2). `DENSE_RANK` never skips numbers (next is 3). `RANK` skips ranks proportional to the number of ties (next is 4, because 3 ranks have elapsed).",
        "distractorExplanations": [
          "Correct! DENSE_RANK produces contiguous ranks (1, 2, 2, 3); RANK skips numbers after ties (1, 2, 2, 4).",
          "This reverses the definitions: DENSE_RANK is the one that avoids gaps, RANK is the one that skips.",
          "ROW_NUMBER assigns distinct sequential numbers (1, 2, 3, 4); RANK and DENSE_RANK both assign identical numbers to ties.",
          "Neither function collapses subsequent distinct earners into identical tied numbers."
        ]
      },
      {
        "id": "mcq_t10_2",
        "question": "Why does `SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rnk FROM Employees WHERE rnk <= 3;` fail?",
        "options": [
          "Because RANK() cannot order by salary descending",
          "Window functions execute in Step 05b (after WHERE in Step 02); you cannot filter window function results in the WHERE clause of the same query",
          "Because rnk is a reserved keyword in SQL",
          "Because RANK() requires a PARTITION BY clause"
        ],
        "correct": 1,
        "explanation": "Execution Order! Window functions execute during the projection phase (Step 5b) after WHERE (Step 2) has already filtered rows. To filter on a window rank, you must wrap it in a CTE or subquery, or use Snowflake's `QUALIFY` clause.",
        "distractorExplanations": [
          "Ordering descending inside a window OVER clause is completely standard.",
          "Correct! Window functions evaluate after WHERE. You must wrap the query in a CTE (`WITH Ranked AS (...) SELECT * FROM Ranked WHERE rnk <= 3`).",
          "`rnk` is a regular identifier, not a reserved system keyword.",
          "PARTITION BY is optional; omitting it simply treats the entire dataset as one single partition."
        ]
      },
      {
        "id": "mcq_t10_3",
        "question": "What is the default window frame specification when you write `ORDER BY date` inside an OVER clause without specifying ROWS or RANGE?",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING (entire partition)",
          "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (running total including ties)",
          "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
          "ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING"
        ],
        "correct": 1,
        "explanation": "Default Window Frame! When ORDER BY is present, SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Because it uses `RANGE` (value-based) rather than `ROWS` (physical-based), duplicate dates are lumped together, which can cause subtle running total bugs!",
        "distractorExplanations": [
          "Unbounded preceding to unbounded following is only the default when ORDER BY is omitted entirely.",
          "Correct! `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` is the ANSI default when ORDER BY is specified.",
          "A 3-row moving window must be explicitly requested with `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING`.",
          "Current row to unbounded following calculates remaining balances, which is never the default."
        ]
      },
      {
        "id": "mcq_t10_4",
        "question": "Which window function calculates the difference between an order's amount and the immediately preceding order's amount for that customer?",
        "options": [
          "LEAD(amount, 1) OVER (PARTITION BY customer_id ORDER BY order_date)",
          "LAG(amount, 1) OVER (PARTITION BY customer_id ORDER BY order_date)",
          "FIRST_VALUE(amount) OVER (PARTITION BY customer_id ORDER BY order_date)",
          "NTH_VALUE(amount, 2) OVER (PARTITION BY customer_id ORDER BY order_date)"
        ],
        "correct": 1,
        "explanation": "LAG vs LEAD! `LAG(col, 1)` accesses data from the previous row in the partition. `LEAD(col, 1)` accesses data from the following/next row.",
        "distractorExplanations": [
          "LEAD looks forward into future rows; LAG is required to look backward at preceding rows.",
          "Correct! `amount - LAG(amount, 1) OVER (PARTITION BY customer_id ORDER BY order_date)` computes the delta from the prior order.",
          "FIRST_VALUE returns the initial order amount in the partition, not the immediately preceding one.",
          "NTH_VALUE returns the value from fixed row offset N, not a dynamic moving delta."
        ]
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
      "tierId": 1,
      "tierName": "Tier 1: Warm-up",
      "difficulty": "easy",
      "badgeClass": "easy",
      "title": "Warm-up: Running Payroll Accumulator",
      "targetTable": "Employees",
      "spec": "Compute a running total of salary partitioned by department and ordered by tenure using an explicit ROWS frame.",
      "starterSql": "-- Tier 1 Warm-up: Running total with explicit frame\nSELECT first_name, department, salary, tenure,\n  SUM(salary) OVER (\n    PARTITION BY department\n    ORDER BY tenure ASC\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_dept_payroll\nFROM Employees;",
      "expectedSolutionSql": "SELECT first_name, department, salary, tenure, SUM(salary) OVER (PARTITION BY department ORDER BY tenure ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_dept_payroll FROM Employees;",
      "expectedRowCount": 4
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
    },
    "problems": [
      {
        "tierId": 1,
        "tierName": "Tier 1: Warm-up",
        "difficulty": "easy",
        "badgeClass": "easy",
        "title": "Warm-up: Running Payroll Accumulator",
        "targetTable": "Employees",
        "spec": "Compute a running total of salary partitioned by department and ordered by tenure using an explicit ROWS frame.",
        "starterSql": "-- Tier 1 Warm-up: Running total with explicit frame\nSELECT first_name, department, salary, tenure,\n  SUM(salary) OVER (\n    PARTITION BY department\n    ORDER BY tenure ASC\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_dept_payroll\nFROM Employees;",
        "expectedSolutionSql": "SELECT first_name, department, salary, tenure, SUM(salary) OVER (PARTITION BY department ORDER BY tenure ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_dept_payroll FROM Employees;",
        "expectedRowCount": 4
      },
      {
        "tierId": 2,
        "tierName": "Tier 2: Interview Standard",
        "difficulty": "medium",
        "badgeClass": "medium",
        "title": "Interview Standard: Department Top Three Salaries (LeetCode 185)",
        "targetTable": "Employees",
        "spec": "Find all employees who earn a salary in the top 3 distinct salaries of their department using `DENSE_RANK()` inside a CTE.",
        "starterSql": "-- Tier 2: Top 3 distinct salary tiers via DENSE_RANK\nWITH RankedSalaries AS (\n  SELECT department, first_name, salary,\n    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\n  FROM Employees\n)\nSELECT department, first_name, salary\nFROM RankedSalaries\nWHERE rnk <= 3;",
        "expectedSolutionSql": "WITH RankedSalaries AS (SELECT department, first_name, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk FROM Employees) SELECT department, first_name, salary FROM RankedSalaries WHERE rnk <= 3;",
        "expectedRowCount": 4
      },
      {
        "tierId": 3,
        "tierName": "Tier 3: Senior Edge Case",
        "difficulty": "hard",
        "badgeClass": "hard",
        "title": "Senior Edge Case: Lag Offset Delta with Null Protection",
        "targetTable": "Employees",
        "spec": "Compute the difference in salary between each employee and the immediately preceding employee by tenure in their department using LAG(). Replace initial NULLs with 0.",
        "starterSql": "-- Tier 3: Period-over-period delta using LAG with default fallback\nSELECT first_name, department, salary, tenure,\n  salary - LAG(salary, 1, salary) OVER (\n    PARTITION BY department\n    ORDER BY tenure ASC\n  ) AS salary_diff_from_prev\nFROM Employees;",
        "expectedSolutionSql": "SELECT first_name, department, salary, tenure, salary - LAG(salary, 1, salary) OVER (PARTITION BY department ORDER BY tenure ASC) AS salary_diff_from_prev FROM Employees;",
        "expectedRowCount": 4
      }
    ]
  }
];
