/**
 * =============================================================================
 * SQL FOUNDRY: DEFINITIVE SQL KEYWORD ENCYCLOPEDIA & ARCHITECTURAL DATA CORE
 * =============================================================================
 * Comprehensive 9-Pillar knowledge repository powering:
 * 1. Standalone Printable PDF Cheatsheets (Dark & Print Editions)
 * 2. 300+ Page Master SQL Architecture Reference Book
 * 3. End-of-Section In-App Cheatsheet Download Banners
 * 4. Interactive Book Studio with SVG Topology & WASM Query Runner
 * =============================================================================
 */

(function() {
  'use strict';

  const KEYWORD_ENCYCLOPEDIA = {
    // -------------------------------------------------------------------------
    // 1. SELECT & PROJECTION
    // -------------------------------------------------------------------------
    'select': {
      id: 'select',
      keyword: 'SELECT',
      module: 'Projection & Ingestion',
      title: 'Column Projection & In-Flight Scalar Computation',
      executionPhase: 'Phase 7 (Evaluated AFTER WHERE, GROUP BY, and HAVING)',
      executionRank: '7 of 10',
      tagline: 'The mathematical projection operator of relational algebra (π)',
      ansiSyntax: `SELECT [ALL | DISTINCT]
    expression [ [AS] output_name ] [, ...]
    [ FROM from_item [, ...] ]`,
      summary: 'Specifies the target list of columns and computed expressions to emit in the final relational envelope. Unlike procedural languages where assignment occurs first, SELECT executes near the very end of the SQL query pipeline, which explains why column aliases defined in SELECT cannot be referenced in WHERE or GROUP BY clauses.',
      engineInternals: {
        operatorType: 'Streaming / Pipelined (Non-Blocking)',
        memoryFootprint: 'O(1) per emitted tuple in standard projection; O(N) when combined with DISTINCT (requires deduplication hash table).',
        diskSpillRisk: 'None for standard projection. Zero disk I/O; transformations occur strictly in volatile RAM memory registers.',
        complexity: 'O(N) time complexity across N surviving tuples.',
        indexInteraction: 'Enables "Index-Only Scans" (Covering Indexes) when all projected columns reside within the leaf nodes of the B-Tree index, bypassing heap table lookups completely.'
      },
      svgDiagramType: 'projection',
      svgWalkthrough: [
        { step: 1, title: 'Scan Source Tuples', desc: 'Read candidate rows from disk pages into memory buffers.' },
        { step: 2, title: 'In-Flight Arithmetic', desc: 'Compute scalar expressions (e.g. salary * 1.10) per tuple without altering physical disk blocks.' },
        { step: 3, title: 'Emit Projected Envelope', desc: 'Discard unselected columns (id, dept, tenure) and stream the finalized schema envelope to the client.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Foundational Column Projection & Aliasing',
          sql: `-- Basic explicit projection with standard ANSI aliasing
SELECT
    emp_id AS employee_identifier,
    first_name,
    last_name,
    salary,
    salary * 1.10 AS projected_compensation
FROM enterprise_employees;`
        },
        intermediate: {
          title: 'Conditional Formatting & Safe Null Division',
          sql: `-- Production projection with conditional formatting and zero-division protection
SELECT
    order_id,
    customer_id,
    gross_amount,
    discount_amount,
    gross_amount - discount_amount AS net_amount,
    ROUND((discount_amount / NULLIF(gross_amount, 0)) * 100, 2) AS discount_pct,
    CASE 
        WHEN gross_amount - discount_amount >= 1000 THEN 'TIER_1_VIP'
        ELSE 'STANDARD'
    END AS revenue_tier
FROM customer_orders;`
        },
        advanced: {
          title: 'Enterprise Multi-Source Projection with Micro-Metrics',
          sql: `-- Multi-source projection combining scalar arithmetic, COALESCE, and formatting
WITH regional_payroll AS (
    SELECT 
        dept_id,
        first_name,
        salary,
        COALESCE(bonus, 0) AS safe_bonus,
        salary + COALESCE(bonus, 0) AS total_comp
    FROM enterprise_employees
)
SELECT
    dept_id,
    first_name,
    total_comp,
    ROUND(total_comp * 0.22, 2) AS estimated_withholding,
    CASE
        WHEN total_comp > 150000 THEN 'EXECUTIVE_AUDIT'
        ELSE 'STANDARD_PAYROLL'
    END AS compliance_flag
FROM regional_payroll;`
        }
      },
      schemas: {
        inputTable: {
          name: 'enterprise_employees',
          columns: ['emp_id', 'first_name', 'dept', 'salary', 'tenure'],
          sampleRows: [
            ['101', 'Ashley', 'Analytics', '$115,000', '4 yrs'],
            ['102', 'David', 'Engineering', '$125,000', '6 yrs'],
            ['103', 'Julia', 'Analytics', '$95,000', '2 yrs'],
            ['104', 'Carlos', 'Engineering', '$72,000', '1 yr']
          ]
        },
        outputTable: {
          name: 'Projected Result (2 Columns)',
          columns: ['first_name', 'projected_comp (+10%)'],
          sampleRows: [
            ['Ashley', '$126,500.00'],
            ['David', '$137,500.00'],
            ['Julia', '$104,500.00'],
            ['Carlos', '$79,200.00']
          ]
        }
      },
      caseStudy: {
        title: 'Amazon SCOT Prime Day Price Elasticity Projection',
        company: 'Amazon Supply Chain Optimization Technologies (SCOT)',
        scenario: 'During Prime Day, algorithmic repricing models evaluate SKU discount elasticity across 40 million inventory units. The BI engineering team must project adjusted margins without writing changes back to the production Aurora PostgreSQL storage clusters.',
        solutionSql: `SELECT
    sku_id,
    warehouse_id,
    current_inventory,
    unit_cost,
    list_price,
    ROUND(list_price * 0.85, 2) AS prime_day_flash_price,
    ROUND((list_price * 0.85) - unit_cost, 2) AS projected_unit_margin,
    ROUND((((list_price * 0.85) - unit_cost) / (list_price * 0.85)) * 100, 1) AS margin_margin_pct
FROM scot_inventory_catalog
WHERE current_inventory > 500;`,
        impact: 'Materializes pricing elasticity simulations entirely in-memory at 85,000 tuples/sec, providing executive dashboards with real-time margin projections while eliminating database lock contention.'
      },
      interviewQuestions: [
        {
          company: 'Amazon / Meta',
          question: 'Why does the query "SELECT salary * 1.10 AS comp FROM employees WHERE comp > 100000" fail with an "unknown column" error?',
          answer: 'SQL executes logically in strict order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT. The WHERE clause evaluates at Phase 2 to filter rows from disk, whereas the SELECT list and its alias "comp" are not evaluated until Phase 7. The execution engine has no concept of "comp" when filtering candidate rows. The fix is to repeat the expression in WHERE or wrap it in a CTE.'
        },
        {
          company: 'Google',
          question: 'What is a Covering Index, and how does the SELECT list determine whether the database performs a Heap Fetch?',
          answer: 'A covering index (Index-Only Scan) occurs when every column requested in the SELECT, WHERE, and JOIN clauses is stored directly in the index B-Tree (either as keys or via the INCLUDE clause). If the query requests even a single column outside the index, the storage engine must perform a random disk seek (Heap Table Fetch) for every matching pointer, degrading performance by 10x-50x.'
        }
      ],
      pitfalls: [
        {
          title: 'SELECT * in Production Pipelines',
          severity: 'Critical',
          description: 'Using SELECT * breaks columnar projection pushdown, forces full table scans over covering index scans, wastes network bandwidth, and breaks upstream code whenever schema migrations alter column order.'
        },
        {
          title: 'Referencing SELECT Aliases in WHERE Clauses',
          severity: 'High',
          description: 'Attempting to filter by a calculated column alias in WHERE violates ANSI logical order of execution and triggers immediate compiler parse errors.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_sel_1',
          question: 'In the standard ANSI SQL logical order of execution, which clause evaluates immediately BEFORE SELECT?',
          options: [
            'A) WHERE',
            'B) HAVING (or WINDOW if present)',
            'C) FROM',
            'D) ORDER BY'
          ],
          correct: 'B',
          rationale: 'The execution hierarchy is: 1. FROM/JOIN -> 2. WHERE -> 3. GROUP BY -> 4. HAVING -> 5. WINDOW -> 6. SELECT -> 7. DISTINCT -> 8. UNION -> 9. ORDER BY -> 10. LIMIT. HAVING and WINDOW evaluate right before SELECT materializes.'
        },
        {
          id: 'mcq_sel_2',
          question: 'What is the primary architectural drawback of executing "SELECT *" against a Snowflake or BigQuery columnar table?',
          options: [
            'A) It causes an immediate syntax failure',
            'B) It invalidates primary key constraints',
            'C) It forces the query engine to read every column file from object storage, multiplying scanning costs and latency',
            'D) It locks the table for concurrent writes'
          ],
          correct: 'C',
          rationale: 'Columnar analytical databases store each column in isolated, compressed micro-partitions. Selecting only needed columns reads only those specific files; SELECT * forces full I/O retrieval of every column partition.'
        },
        {
          id: 'mcq_sel_3',
          question: 'Given the expression: SELECT 100 / NULLIF(total_items, 0) AS unit_price, what is the result when total_items = 0?',
          options: [
            'A) Division by zero runtime error',
            'B) 0',
            'C) NULL',
            'D) NaN'
          ],
          correct: 'C',
          rationale: 'NULLIF(total_items, 0) returns NULL when total_items equals 0. In ANSI SQL, any arithmetic operation with NULL evaluates to NULL (100 / NULL = NULL), gracefully avoiding a division-by-zero crash.'
        },
        {
          id: 'mcq_sel_4',
          question: 'When does a SELECT DISTINCT query switch from a streaming operation to a blocking operation in PostgreSQL and MySQL?',
          options: [
            'A) Only when string functions are invoked',
            'B) Always; DISTINCT requires materializing all candidate rows into a hash set or performing a sort to identify duplicates',
            'C) Never; DISTINCT is always streaming',
            'D) Only when WHERE is omitted'
          ],
          correct: 'B',
          rationale: 'Standard SELECT is a streaming conduit; DISTINCT is a blocking pipeline breaker because duplicate detection requires comparing all incoming tuples against a memory hash table or sorting them.'
        },
        {
          id: 'mcq_sel_5',
          question: 'Can you use a column alias defined in SELECT inside an ORDER BY clause in the same query block?',
          options: [
            'A) No, aliases can never be referenced in the same query',
            'B) Yes, because ORDER BY evaluates at Phase 9, strictly AFTER SELECT evaluates at Phase 6/7',
            'C) Only if the query has no WHERE clause',
            'D) Only in MySQL, but prohibited in ANSI standard'
          ],
          correct: 'B',
          rationale: 'ORDER BY executes at Phase 9, after SELECT has already evaluated and assigned column aliases in Phase 6/7. Therefore, referencing SELECT aliases in ORDER BY is valid ANSI SQL.'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 2. WHERE & PREDICATE LOGIC
    // -------------------------------------------------------------------------
    'where': {
      id: 'where',
      keyword: 'WHERE',
      module: 'Predicate Logic & Sifting',
      title: 'Tuple Sieve & Three-Valued Logic (3VL) Predicate Filter',
      executionPhase: 'Phase 2 (Evaluated immediately after FROM / JOIN)',
      executionRank: '2 of 10',
      tagline: 'The mathematical selection operator of relational algebra (σ)',
      ansiSyntax: `WHERE boolean_expression
    [ AND | OR [NOT] boolean_expression ... ]`,
      summary: 'Filters rows emitted by the FROM clause before any aggregation, grouping, or projection occurs. Operates under ANSI Three-Valued Logic (TRUE, FALSE, UNKNOWN). A row is admitted into subsequent pipeline stages ONLY if its predicate evaluates strictly to TRUE; rows evaluating to FALSE or UNKNOWN (NULL comparisons) are discarded.',
      engineInternals: {
        operatorType: 'Streaming / Row-by-Row Sieve',
        memoryFootprint: 'O(1) memory register per candidate tuple.',
        diskSpillRisk: 'None. Sieve evaluates in-flight in CPU L1/L2 cache registers.',
        complexity: 'O(N) full scan without index; O(log N) + O(K) index seek with B-Tree.',
        indexInteraction: 'Critically dependent on SARGability (Search Argument Able). Functions applied to indexed columns (e.g. WHERE YEAR(date) = 2026) destroy B-Tree index seeks and degrade to table scans.'
      },
      svgDiagramType: 'filter',
      svgWalkthrough: [
        { step: 1, title: 'Candidate Row Stream', desc: 'Tuples flow into the predicate gate from disk scan or join buffers.' },
        { step: 2, title: 'Three-Valued Logic Sieve', desc: 'Evaluate Boolean expressions: TRUE passes, FALSE is rejected, UNKNOWN (NULL) is discarded.' },
        { step: 3, title: 'Surviving Tuple Emission', desc: 'Only validated tuples proceed to GROUP BY and aggregation.' }
      ],
      codePatterns: {
        foundational: {
          title: 'SARGable Range and Exact Match Predicates',
          sql: `-- Clean SARGable predicates utilizing index seeks
SELECT emp_id, first_name, salary, dept
FROM enterprise_employees
WHERE dept = 'Engineering' 
  AND salary >= 100000;`
        },
        intermediate: {
          title: 'Date Boundary & Multi-Condition Logic',
          sql: `-- SARGable date filtering avoiding function wrapping on indexed column
SELECT order_id, customer_id, order_date, total_amount
FROM customer_orders
WHERE order_date >= '2026-01-01' 
  AND order_date < '2026-02-01'
  AND status IN ('COMPLETED', 'SHIPPED')
  AND canceled_at IS NULL;`
        },
        advanced: {
          title: 'Correlated Subquery & Anti-Join Sieve',
          sql: `-- High-performance subquery predicate filtering active high-value customers
SELECT c.customer_id, c.account_name, c.tier
FROM enterprise_accounts c
WHERE c.tier = 'PLATINUM'
  AND EXISTS (
      SELECT 1 
      FROM trade_executions t
      WHERE t.account_id = c.customer_id
        AND t.trade_timestamp >= CURRENT_TIMESTAMP - INTERVAL '30' DAY
        AND t.notional_usd >= 1000000
  );`
        }
      },
      schemas: {
        inputTable: {
          name: '4 Candidate Rows',
          columns: ['first_name', 'department', 'salary', 'status'],
          sampleRows: [
            ['David', 'Engineering', '$125,000', 'Active'],
            ['Ashley', 'Analytics', '$115,000', 'Active'],
            ['Carlos', 'Engineering', '$72,000', 'Active'],
            ['Sara', 'Engineering', 'NULL', 'On Leave']
          ]
        },
        outputTable: {
          name: 'Surviving Sieve Tuples (salary >= 100k AND dept = "Eng")',
          columns: ['first_name', 'department', 'salary'],
          sampleRows: [
            ['David', 'Engineering', '$125,000']
          ]
        }
      },
      caseStudy: {
        title: 'JPMorgan Sanctions & High-Risk Transaction Screening',
        company: 'JPMorgan Chase Financial Crimes & Anti-Money Laundering (AML)',
        scenario: 'Global compliance monitors SWIFT wire transfers exceeding $250,000 destined for non-FATF compliant jurisdictions, screening out domestic clearing house records in real-time.',
        solutionSql: `SELECT
    wire_reference_id,
    originator_account,
    beneficiary_account,
    amount_usd,
    beneficiary_country_code
FROM swift_wire_transfers
WHERE amount_usd >= 250000.00
  AND beneficiary_country_code NOT IN ('US', 'GB', 'DE', 'FR', 'JP', 'CA')
  AND compliance_review_status = 'PENDING_SCREEN'
  AND ofac_match_score IS NOT NULL;`,
        impact: 'Filters 99.4% of benign wire traffic in Phase 2 before expensive forensic fuzzy string matching, preserving sub-millisecond payment authorization latencies.'
      },
      interviewQuestions: [
        {
          company: 'JPMorgan / Goldman Sachs',
          question: 'What is Three-Valued Logic (3VL), and what happens when you run "WHERE salary <> 50000" on a table where some salary values are NULL?',
          answer: 'ANSI SQL evaluates Boolean expressions to TRUE, FALSE, or UNKNOWN. When comparing a column to a scalar and that column is NULL (NULL <> 50000), the result is UNKNOWN, not TRUE. Because WHERE only retains tuples evaluating strictly to TRUE, all rows with NULL salaries are silently discarded. To include them, you must write: WHERE salary <> 50000 OR salary IS NULL.'
        },
        {
          company: 'Apple / Meta',
          question: 'Explain SARGability. Why is "WHERE created_at >= \'2026-01-01\'" vastly faster than "WHERE YEAR(created_at) = 2026"?',
          answer: 'SARGable stands for Search Argument Able. When a column is wrapped in a function like YEAR(created_at), the database engine cannot predict the output without executing the function across every single row, invalidating the B-Tree index and forcing a full table scan. The range predicate allows the engine to seek directly to the exact B-Tree leaf node in O(log N) time.'
        }
      ],
      pitfalls: [
        {
          title: 'The NOT IN (NULL) Trap',
          severity: 'Critical',
          description: 'If a subquery inside NOT IN returns even a single NULL value (e.g., WHERE id NOT IN (SELECT supervisor_id FROM employees)), the entire IN expression evaluates to UNKNOWN for every candidate row, returning 0 rows across the whole query! Always use NOT EXISTS instead.'
        },
        {
          title: 'Non-SARGable Wildcards',
          severity: 'High',
          description: 'Writing "WHERE email LIKE \'%@gmail.com\'" forces a full table scan because the leading wildcard prevents the B-Tree index from sorting by prefix.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_whe_1',
          question: 'What does the predicate "WHERE NULL = NULL" evaluate to in ANSI SQL?',
          options: [
            'A) TRUE',
            'B) FALSE',
            'C) UNKNOWN',
            'D) Syntax Error'
          ],
          correct: 'C',
          rationale: 'In relational algebra, NULL represents an unknown or missing value. Unknown cannot be confirmed equal to another unknown, so NULL = NULL evaluates to UNKNOWN, which WHERE discards.'
        },
        {
          id: 'mcq_whe_2',
          question: 'Why does "SELECT COUNT(*) FROM t WHERE x NOT IN (1, 2, NULL)" return 0 regardless of table data?',
          options: [
            'A) The query parser encounters a fatal error',
            'B) "x NOT IN (1, 2, NULL)" expands to "x <> 1 AND x <> 2 AND x <> NULL". Any comparison with NULL yields UNKNOWN, making the overall conjunction UNKNOWN for all rows',
            'C) NULL is treated as zero',
            'D) NOT IN cannot take integer arguments'
          ],
          correct: 'B',
          rationale: 'In 3VL, "AND UNKNOWN" can never resolve to TRUE. Since every row produces UNKNOWN, 0 rows pass the WHERE filter.'
        },
        {
          id: 'mcq_whe_3',
          question: 'Which of the following WHERE conditions is fully SARGable for an index on column "signup_date"?',
          options: [
            'A) WHERE DATE(signup_date) = \'2026-05-01\'',
            'B) WHERE signup_date + INTERVAL \'1\' DAY > \'2026-05-01\'',
            'C) WHERE signup_date >= \'2026-05-01\' AND signup_date < \'2026-05-02\'',
            'D) WHERE TO_CHAR(signup_date, \'YYYY-MM-DD\') = \'2026-05-01\''
          ],
          correct: 'C',
          rationale: 'Option C leaves the column untransformed on the left side of the comparison operators, allowing direct B-Tree index seeks.'
        },
        {
          id: 'mcq_whe_4',
          question: 'Can you filter the result of an aggregate function (e.g. SUM(salary) > 500000) inside a WHERE clause?',
          options: [
            'A) Yes, if placed at the end of the WHERE clause',
            'B) No, because WHERE executes at Phase 2, before GROUP BY and aggregation occur at Phase 3/4',
            'C) Yes, but only in SQLite and PostgreSQL',
            'D) Only if combined with an index'
          ],
          correct: 'B',
          rationale: 'WHERE filters individual base tuples before groups are formed. Post-aggregation filtering must be performed in the HAVING clause (Phase 5).'
        },
        {
          id: 'mcq_whe_5',
          question: 'In short-circuit evaluation of "WHERE A AND B", what does the optimizer do if predicate A evaluates to FALSE?',
          options: [
            'A) Always evaluates B anyway',
            'B) Skips evaluation of predicate B immediately, saving CPU cycles',
            'C) Raises a warning',
            'D) Re-evaluates A with opposite polarity'
          ],
          correct: 'B',
          rationale: 'Modern query execution engines short-circuit Boolean evaluation. In FALSE AND [anything], the result is guaranteed to be FALSE regardless of B, so B is bypassed.'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 3. GROUP BY & AGGREGATION
    // -------------------------------------------------------------------------
    'group-by': {
      id: 'group-by',
      keyword: 'GROUP BY',
      module: 'Aggregation & Rollups',
      title: 'Relational Bucketing & Dimensional Collapse',
      executionPhase: 'Phase 3 (Evaluated immediately after WHERE)',
      executionRank: '3 of 10',
      tagline: 'Collapses N individual tuples into K summary partition vectors',
      ansiSyntax: `GROUP BY [ ALL | DISTINCT ]
    grouping_element [, ...]
    [ WITH ROLLUP | WITH CUBE ]`,
      summary: 'Partitions the rows surviving the WHERE filter into discrete buckets based on matching values in the grouping keys. All non-grouped columns in the SELECT clause must be wrapped inside an aggregate function (COUNT, SUM, AVG, MIN, MAX), guaranteeing that each emitted group row represents exactly one dimensional summary.',
      engineInternals: {
        operatorType: 'Pipeline Breaker / Blocking Operator',
        memoryFootprint: 'O(K) where K is the number of unique groups. Utilizes an in-memory hash table (HashAggregate) or pre-sorted input (StreamAggregate).',
        diskSpillRisk: 'High. If the cardinality of grouping keys exceeds work_mem (PostgreSQLWorkMem / sort_buffer_size), the hash table spills to disk temp files (Hash spill), reducing throughput by 10x.',
        complexity: 'O(N) for HashAggregate with sufficient RAM; O(N log N) for Sort/StreamAggregate.',
        indexInteraction: 'A composite index on (dept_id, employee_id) allows the engine to utilize StreamAggregate without hashing or sorting, streaming results instantly.'
      },
      svgDiagramType: 'groupby',
      svgWalkthrough: [
        { step: 1, title: 'Incoming Mixed Tuples', desc: 'Tuples from WHERE filter arrive in random order.' },
        { step: 2, title: 'Hash Bucketing Chamber', desc: 'Engine computes hash key per tuple and routes into bucket registers (e.g. Engineering vs Analytics).' },
        { step: 3, title: 'Aggregate Rollup Emission', desc: 'Emits exactly 1 summarized row per unique group with accumulated metrics.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Basic Multi-Metric Departmental Rollup',
          sql: `-- Standard grouping calculating count, sum, and average
SELECT
    department,
    COUNT(*) AS total_headcount,
    SUM(salary) AS total_payroll_expenditure,
    ROUND(AVG(salary), 2) AS average_compensation
FROM enterprise_employees
GROUP BY department;`
        },
        intermediate: {
          title: 'Multi-Key Grouping with Date Truncation',
          sql: `-- Grouping by year-month cohort and customer acquisition channel
SELECT
    DATE_TRUNC('month', order_date) AS cohort_month,
    acquisition_channel,
    COUNT(DISTINCT customer_id) AS active_purchasers,
    SUM(order_total) AS gross_merchandise_value,
    ROUND(SUM(order_total) / COUNT(DISTINCT customer_id), 2) AS arpu
FROM customer_orders
GROUP BY DATE_TRUNC('month', order_date), acquisition_channel;`
        },
        advanced: {
          title: 'Hierarchical ROLLUP for Executive Cross-Tabs',
          sql: `-- Hierarchical multidimensional rollup generating sub-totals and grand totals
SELECT
    COALESCE(region, '--- ALL REGIONS ---') AS region,
    COALESCE(product_line, '--- ALL PRODUCTS ---') AS product_line,
    SUM(units_sold) AS total_volume,
    SUM(net_revenue) AS total_revenue
FROM sales_fact_table
GROUP BY ROLLUP (region, product_line);`
        }
      },
      schemas: {
        inputTable: {
          name: '5 Mixed Unbucketed Tuples',
          columns: ['name', 'department', 'salary'],
          sampleRows: [
            ['David', 'Engineering', '$125,000'],
            ['Ashley', 'Analytics', '$115,000'],
            ['Carlos', 'Engineering', '$72,000'],
            ['Julia', 'Analytics', '$95,000'],
            ['Sara', 'Engineering', '$110,000']
          ]
        },
        outputTable: {
          name: 'Summarized Group Output',
          columns: ['department', 'headcount', 'avg_salary'],
          sampleRows: [
            ['Engineering', '3', '$102,333.33'],
            ['Analytics', '2', '$105,000.00']
          ]
        }
      },
      caseStudy: {
        title: 'Amazon Prime Day Hourly Fulfillment Center Throughput',
        company: 'Amazon Operations & Robotics Fulfillment',
        scenario: 'Warehouse operations tracks hourly units picked, packed, and shipped across 125 North American fulfillment centers during Prime Day peak volume.',
        solutionSql: `SELECT
    fc_code,
    DATE_TRUNC('hour', scan_timestamp) AS window_hour,
    COUNT(package_id) AS units_shipped,
    AVG(dock_to_ship_minutes) AS avg_dock_latency,
    MAX(dock_to_ship_minutes) AS peak_latency_bottleneck
FROM fulfillment_shipment_scans
WHERE scan_timestamp >= '2026-07-15 00:00:00'
  AND scan_timestamp < '2026-07-16 00:00:00'
GROUP BY fc_code, DATE_TRUNC('hour', scan_timestamp);`,
        impact: 'Aggregates 140 million barcode scans into hourly telemetry vectors, enabling real-time robot fleet rerouting when peak latency exceeds SLA thresholds.'
      },
      interviewQuestions: [
        {
          company: 'Amazon / Microsoft',
          question: 'What is the difference between HashAggregate and StreamAggregate in query execution plans?',
          answer: 'HashAggregate builds an in-memory hash table where keys are group values and values are running accumulators; it works on unsorted inputs but consumes O(K) RAM. StreamAggregate processes data already sorted by the group keys; it maintains a single accumulator and emits the row as soon as the key changes, using O(1) memory. If memory is tight, databases prefer StreamAggregate with an index.'
        },
        {
          company: 'Snowflake / Google',
          question: 'Why does ANSI SQL prohibit selecting non-aggregated columns that are not part of the GROUP BY clause?',
          answer: 'Grouping collapses multiple rows into a single summary row. If a column has differing values within that group (e.g., three employees in Engineering have three different names), returning a single scalar name without an aggregate like MIN() or STRING_AGG() would be mathematically non-deterministic.'
        }
      ],
      pitfalls: [
        {
          title: 'High-Cardinality Memory Spill',
          severity: 'Critical',
          description: 'Grouping by unique keys (e.g. UUIDs or timestamp with milliseconds) creates millions of hash buckets, spilling to disk and exhausting database memory.'
        },
        {
          title: 'COUNT(*) vs COUNT(column)',
          severity: 'Medium',
          description: 'COUNT(*) counts all tuples in the bucket including nulls; COUNT(column) evaluates strictly non-null values, leading to silent discrepancies in audit reports.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_grp_1',
          question: 'What happens to rows where the GROUP BY column contains NULL?',
          options: [
            'A) They are discarded from the output',
            'B) They cause a runtime crash',
            'C) All rows with NULL in the grouping key are grouped together into a single distinct NULL group',
            'D) Each NULL row becomes its own individual single-row group'
          ],
          correct: 'C',
          rationale: 'In ANSI GROUP BY semantics, NULL values are treated as matching each other for the purpose of grouping, creating exactly one group where the key is NULL.'
        },
        {
          id: 'mcq_grp_2',
          question: 'Which clause executes immediately AFTER GROUP BY in the logical sequence?',
          options: [
            'A) WHERE',
            'B) HAVING',
            'C) ORDER BY',
            'D) SELECT'
          ],
          correct: 'B',
          rationale: 'Logical order is: FROM -> WHERE -> GROUP BY -> HAVING -> WINDOW -> SELECT. HAVING filters the newly aggregated groups.'
        },
        {
          id: 'mcq_grp_3',
          question: 'What does "GROUP BY ROLLUP(country, state, city)" generate in addition to standard groups?',
          options: [
            'A) Subtotals for (country, state), subtotals for (country), and a grand total for ()',
            'B) All Cartesian combinations (Cube)',
            'C) Random sampling',
            'D) Deduplication identical to DISTINCT'
          ],
          correct: 'A',
          rationale: 'ROLLUP creates hierarchical sub-totals from right to left: (country, state, city), (country, state), (country), and the grand total ().'
        },
        {
          id: 'mcq_grp_4',
          question: 'If a table has 1,000,000 rows and 5 unique departments, what is the maximum number of rows returned by "SELECT dept, COUNT(*) FROM t GROUP BY dept"?',
          options: [
            'A) 1,000,000',
            'B) 5 (or 6 if NULL exists)',
            'C) 5,000,000',
            'D) 1'
          ],
          correct: 'B',
          rationale: 'GROUP BY returns at most K rows, where K is the number of distinct values of the grouping key (including NULL).'
        },
        {
          id: 'mcq_grp_5',
          question: 'Why does "SELECT dept, MAX(salary), employee_name FROM emp GROUP BY dept" fail in PostgreSQL and Oracle?',
          options: [
            'A) MAX cannot be applied to salary',
            'B) employee_name is neither in the GROUP BY clause nor wrapped in an aggregate function',
            'C) GROUP BY must precede WHERE',
            'D) Column aliases are mandatory'
          ],
          correct: 'B',
          rationale: 'ANSI SQL enforces the Single-Value Rule: every column in the SELECT list must either appear in the GROUP BY clause or be inside an aggregate function.'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 4. HAVING
    // -------------------------------------------------------------------------
    'having': {
      id: 'having',
      keyword: 'HAVING',
      module: 'Aggregation & Rollups',
      title: 'Post-Aggregation Group Sieve',
      executionPhase: 'Phase 4 (Evaluated immediately after GROUP BY)',
      executionRank: '4 of 10',
      tagline: 'Filters grouped summary vectors based on aggregate thresholds',
      ansiSyntax: `HAVING aggregate_boolean_expression
    [ AND | OR [NOT] aggregate_boolean_expression ... ]`,
      summary: 'The HAVING clause filters aggregated groups generated by GROUP BY. While WHERE filters individual input tuples before grouping (Phase 2), HAVING evaluates aggregate expressions (e.g., COUNT(*) >= 5, AVG(salary) > 80000) to discard entire groups from the final result set.',
      engineInternals: {
        operatorType: 'Post-Aggregate Vector Filter',
        memoryFootprint: 'O(1) register evaluation per unique group.',
        diskSpillRisk: 'None. Operates directly on the completed aggregation hash table.',
        complexity: 'O(K) where K is the number of generated groups.',
        indexInteraction: 'Cannot directly use indexes because it evaluates computed aggregates. However, pushdown optimizers can rewrite certain non-aggregate HAVING conditions into WHERE filters to leverage indexes before grouping.'
      },
      svgDiagramType: 'groupby',
      svgWalkthrough: [
        { step: 1, title: 'Formed Group Accumulators', desc: 'GROUP BY completes aggregation into K group vectors.' },
        { step: 2, title: 'HAVING Threshold Gate', desc: 'Evaluate aggregate predicate (e.g. COUNT(*) >= 3): Engineering (3) passes; Analytics (2) dropped.' },
        { step: 3, title: 'Emitted Surviving Groups', desc: 'Only groups meeting the statistical hurdle stream to SELECT.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Filtering Groups by Aggregate Headcount',
          sql: `-- Retain only departments with 3 or more team members
SELECT
    department,
    COUNT(*) AS team_size,
    AVG(salary) AS avg_comp
FROM enterprise_employees
GROUP BY department
HAVING COUNT(*) >= 3;`
        },
        intermediate: {
          title: 'Multi-Condition Business Outlier Detection',
          sql: `-- Identifying merchants with high chargeback ratios and volume
SELECT
    merchant_id,
    COUNT(*) AS total_transactions,
    SUM(amount) AS total_volume_usd,
    SUM(CASE WHEN is_disputed = 1 THEN 1 ELSE 0 END) AS disputed_count
FROM merchant_charge_blotter
GROUP BY merchant_id
HAVING COUNT(*) >= 100
   AND SUM(CASE WHEN is_disputed = 1 THEN 1 ELSE 0 END) * 1.0 / COUNT(*) > 0.02;`
        },
        advanced: {
          title: 'HAVING without GROUP BY (Table-Level Invariant Check)',
          sql: `-- Check if the entire ledger violates net variance invariant
SELECT
    SUM(debit_amount) AS total_debits,
    SUM(credit_amount) AS total_credits,
    ABS(SUM(debit_amount) - SUM(credit_amount)) AS net_imbalance
FROM general_ledger_postings
HAVING ABS(SUM(debit_amount) - SUM(credit_amount)) > 0.001;`
        }
      },
      schemas: {
        inputTable: {
          name: '2 Formed Department Groups',
          columns: ['department', 'count', 'avg_salary'],
          sampleRows: [
            ['Engineering', '3', '$102,333.33'],
            ['Analytics', '2', '$105,000.00']
          ]
        },
        outputTable: {
          name: 'Surviving Groups (HAVING COUNT(*) >= 3)',
          columns: ['department', 'count', 'avg_salary'],
          sampleRows: [
            ['Engineering', '3', '$102,333.33']
          ]
        }
      },
      caseStudy: {
        title: 'JPMorgan Core Ledger Imbalance Alerting',
        company: 'JPMorgan Chase Treasury & General Ledger Accounting',
        scenario: 'Automated end-of-day reconciliation sweeps scan 850 million debit and credit journal entries across global clearing entities. An alert must fire if any trading entity has a non-zero ledger variance.',
        solutionSql: `SELECT
    legal_entity_id,
    currency_code,
    SUM(debit_amount_usd) AS total_debits,
    SUM(credit_amount_usd) AS total_credits,
    ROUND(SUM(debit_amount_usd) - SUM(credit_amount_usd), 4) AS ledger_variance
FROM treasury_journal_entries
WHERE posting_date = CURRENT_DATE
GROUP BY legal_entity_id, currency_code
HAVING ABS(SUM(debit_amount_usd) - SUM(credit_amount_usd)) > 0.0001;`,
        impact: 'Instantly identifies out-of-balance legal entities prior to official Federal Reserve EOD regulatory reporting.'
      },
      interviewQuestions: [
        {
          company: 'Citadel / Two Sigma',
          question: 'What happens when you use a HAVING clause WITHOUT a GROUP BY clause?',
          answer: 'When HAVING is used without GROUP BY, the entire table is treated as a single synthetic group. If the aggregate condition evaluates to TRUE, exactly one row is emitted; if it evaluates to FALSE, zero rows are emitted. This is frequently used for table-wide invariant checks.'
        },
        {
          company: 'Stripe',
          question: 'Explain why putting row-level filters in HAVING instead of WHERE degrades database performance.',
          answer: 'WHERE filters rows at Phase 2, preventing non-matching rows from ever entering the memory hash table. If you put non-aggregate conditions in HAVING, the engine must ingest, hash, and aggregate millions of useless rows only to discard them at Phase 4, increasing memory usage and query time by 10x-100x.'
        }
      ],
      pitfalls: [
        {
          title: 'Filtering Raw Columns in HAVING',
          severity: 'High',
          description: 'Writing "HAVING status = \'ACTIVE\'" forces the engine to aggregate inactive rows before filtering. Always move non-aggregate predicates into WHERE.'
        },
        {
          title: 'Confusing WHERE vs HAVING Placement',
          severity: 'Critical',
          description: 'Attempting to use aggregate functions like COUNT(*) > 5 in WHERE triggers immediate syntax compiler errors.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_hav_1',
          question: 'Which of the following expressions is VALID in a HAVING clause but INVALID in a WHERE clause?',
          options: [
            'A) status = \'PAID\'',
            'B) created_at >= \'2026-01-01\'',
            'C) COUNT(order_id) > 10',
            'D) customer_id IS NOT NULL'
          ],
          correct: 'C',
          rationale: 'COUNT() is an aggregate function that requires grouping to evaluate. WHERE evaluates before grouping occurs.'
        },
        {
          id: 'mcq_hav_2',
          question: 'If a query has both WHERE and HAVING, in what order are they evaluated?',
          options: [
            'A) HAVING evaluates first, then WHERE',
            'B) Simultaneously',
            'C) WHERE evaluates at Phase 2 (row-level); HAVING evaluates at Phase 4 (group-level)',
            'D) The database optimizer randomly chooses'
          ],
          correct: 'C',
          rationale: 'WHERE always filters candidate rows prior to GROUP BY. HAVING evaluates aggregated group metrics after grouping.'
        },
        {
          id: 'mcq_hav_3',
          question: 'Can you reference SELECT column aliases inside the HAVING clause in standard ANSI SQL?',
          options: [
            'A) Yes, always',
            'B) No, because HAVING evaluates at Phase 4, before SELECT assigns aliases at Phase 6/7',
            'C) Only in Oracle and DB2',
            'D) Only if the alias is uppercase'
          ],
          correct: 'B',
          rationale: 'In strict ANSI SQL, HAVING evaluates before SELECT. (Some dialects like Snowflake and MySQL offer non-standard extensions, but standard ANSI requires repeating the aggregate expression).'
        },
        {
          id: 'mcq_hav_4',
          question: 'What is the output of "SELECT COUNT(*) FROM employees HAVING COUNT(*) > 100" if the table has only 50 rows?',
          options: [
            'A) 50',
            'B) 0 rows (Empty result set)',
            'C) NULL',
            'D) Runtime error'
          ],
          correct: 'B',
          rationale: 'The single table-level group has a COUNT(*) of 50. Since 50 > 100 is FALSE, the HAVING filter discards the entire group, returning an empty set.'
        },
        {
          id: 'mcq_hav_5',
          question: 'Why is "WHERE dept = \'Sales\' GROUP BY dept" preferred over "GROUP BY dept HAVING dept = \'Sales\'"?',
          options: [
            'A) They are identical in performance',
            'B) WHERE allows index usage and avoids building hash buckets for non-Sales departments',
            'C) HAVING does not work with strings',
            'D) WHERE requires less typing'
          ],
          correct: 'B',
          rationale: 'WHERE eliminates rows before aggregation, allowing B-Tree index scans and keeping the aggregation hash table small.'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 5. JOINS (INNER & LEFT)
    // -------------------------------------------------------------------------
    'joins': {
      id: 'joins',
      keyword: 'JOIN',
      module: 'Relational Algebra & Sets',
      title: 'Relational Cross-Product & Match Conduits',
      executionPhase: 'Phase 1 (Evaluated inside the FROM clause)',
      executionRank: '1 of 10',
      tagline: 'Combines tuples from two or more relations based on join predicates',
      ansiSyntax: `FROM table_reference
    [ INNER | LEFT [OUTER] | RIGHT [OUTER] | FULL [OUTER] | CROSS ] JOIN
    table_reference [ ON join_condition | USING (join_column [, ...]) ]`,
      summary: 'The mathematical join operator combines attributes from two relations into single composite tuples based on join condition matching. INNER JOIN retains only tuples meeting the predicate on both sides. LEFT OUTER JOIN preserves all tuples from the left relation, padding right attributes with NULL when no match exists.',
      engineInternals: {
        operatorType: 'Hash Join, Nested Loop, or Sort-Merge Join',
        memoryFootprint: 'Hash Join builds an in-memory hash table of the smaller "build" relation (O(M)). Nested Loop requires O(1) memory but O(M*N) time without indexes.',
        diskSpillRisk: 'High for large tables. If the hash table of the build relation exceeds work_mem, it spills to temporary disk partitions (Grace Hash Join), causing double I/O.',
        complexity: 'O(M + N) for Hash Join; O(M log N) for Indexed Nested Loop; O(M log M + N log N) for Sort-Merge.',
        indexInteraction: 'Foreign key indexes on the inner table allow the optimizer to choose Index Nested Loop joins, executing in sub-millisecond time.'
      },
      svgDiagramType: 'joins',
      svgWalkthrough: [
        { step: 1, title: 'Left & Right Inputs', desc: 'Scan Left table (Customers) and Right table (Orders).' },
        { step: 2, title: 'Hash Matcher Conduit', desc: 'Inner joins match Alice (id 1) and Bob (id 2). Charlie (id 3) has zero orders.' },
        { step: 3, title: 'Preserved vs Emitted Tuples', desc: 'INNER JOIN drops Charlie; LEFT JOIN emits Charlie with NULL order attributes.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Standard Equi-Join between Primary and Foreign Keys',
          sql: `-- Standard 1-to-N inner equi-join
SELECT
    c.customer_id,
    c.full_name,
    o.order_id,
    o.total_amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;`
        },
        intermediate: {
          title: 'LEFT JOIN Anti-Join Pattern (Isolate Non-Purchasers)',
          sql: `-- Anti-join pattern to identify customers who have never made a purchase
SELECT
    c.customer_id,
    c.full_name,
    c.email,
    c.created_at
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`
        },
        advanced: {
          title: 'Multi-Table Enterprise Snowflake Join with Ledger Reconciliation',
          sql: `-- Multi-way join combining entity master, transaction blotter, and FX rates
SELECT
    t.trade_id,
    a.account_number,
    a.legal_name,
    t.instrument_symbol,
    t.notional_local,
    t.currency_code,
    ROUND(t.notional_local * COALESCE(fx.spot_rate_to_usd, 1.0), 2) AS notional_usd
FROM trade_blotter t
INNER JOIN legal_entity_accounts a ON t.account_id = a.account_id
LEFT JOIN daily_fx_rates fx 
       ON t.currency_code = fx.source_currency
      AND fx.rate_date = t.trade_date
WHERE t.trade_status = 'SETTLED';`
        }
      },
      schemas: {
        inputTable: {
          name: 'Customers (Left) & Orders (Right)',
          columns: ['cust_id', 'name', 'ord_id', 'amount'],
          sampleRows: [
            ['1', 'Alice', '101', '$150.00'],
            ['1', 'Alice', '102', '$80.00'],
            ['2', 'Bob', '103', '$220.00'],
            ['3', 'Charlie (0 Orders)', '---', '---']
          ]
        },
        outputTable: {
          name: 'LEFT JOIN Output (Charlie Preserved with NULL)',
          columns: ['cust_id', 'name', 'ord_id', 'amount'],
          sampleRows: [
            ['1', 'Alice', '101', '$150.00'],
            ['1', 'Alice', '102', '$80.00'],
            ['2', 'Bob', '103', '$220.00'],
            ['3', 'Charlie', 'NULL', 'NULL']
          ]
        }
      },
      caseStudy: {
        title: 'Amazon Prime Churn Anti-Join Audit',
        company: 'Amazon Prime Member Engagement',
        scenario: 'Marketing needs to identify all Prime subscribers who joined in Q1 but have not streamed a single Prime Video title or placed an order in the last 90 days.',
        solutionSql: `SELECT
    p.member_id,
    p.email,
    p.subscription_tier,
    p.renewal_date
FROM prime_members p
LEFT JOIN prime_video_streams v 
       ON p.member_id = v.member_id 
      AND v.stream_timestamp >= CURRENT_DATE - INTERVAL '90' DAY
LEFT JOIN customer_orders o 
       ON p.member_id = o.customer_id 
      AND o.order_date >= CURRENT_DATE - INTERVAL '90' DAY
WHERE v.stream_id IS NULL
  AND o.order_id IS NULL
  AND p.membership_status = 'ACTIVE';`,
        impact: 'Identifies 340,000 disengaged subscribers for automated win-back retention emails before annual renewal churn.'
      },
      interviewQuestions: [
        {
          company: 'Meta / Netflix',
          question: 'What is a Cartesian product (CROSS JOIN), and what danger does it present in large distributed databases?',
          answer: 'A Cartesian product pairs every row from Table A with every row from Table B without any join condition, producing M * N rows. If Table A has 100,000 rows and Table B has 100,000 rows, the query emits 10,000,000,000 tuples, immediately blowing past database memory and crashing execution workers.'
        },
        {
          company: 'Uber / Airbnb',
          question: 'What is the subtle bug when adding a WHERE clause condition on a LEFT JOINed table (e.g. WHERE right_table.status = "ACTIVE")?',
          answer: 'Putting a filter on the right table in the WHERE clause turns the LEFT JOIN into an INNER JOIN! When a left row has no match in the right table, right_table.status is NULL. The WHERE clause evaluates NULL = "ACTIVE" to UNKNOWN and drops the row, destroying the left-preservation behavior. The condition must be placed in the ON clause instead.'
        }
      ],
      pitfalls: [
        {
          title: 'Converting LEFT JOIN to INNER JOIN via WHERE',
          severity: 'Critical',
          description: 'Placing predicates against the right-hand table in the WHERE clause silently strips all non-matching left rows, breaking audit and cohort counts.'
        },
        {
          title: 'Duplicate Foreign Keys Multiplying Aggregates',
          severity: 'High',
          description: 'Joining a parent table to two independent 1-to-N child tables (e.g. Orders -> Items AND Orders -> Payments) causes an N x M fan-out, multiplying financial sums by 2x-10x.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_joi_1',
          question: 'If Table A has 10 rows and Table B has 5 rows, what is the MAXIMUM possible number of rows returned by "SELECT * FROM A INNER JOIN B ON A.id = B.id"?',
          options: [
            'A) 10',
            'B) 5',
            'C) 50 (if all rows have the exact same id)',
            'D) 15'
          ],
          correct: 'C',
          rationale: 'If all 10 rows in A have id=1 and all 5 rows in B have id=1, an equi-join pairs each row with all 5 matches, producing 10 * 5 = 50 rows.'
        },
        {
          id: 'mcq_joi_2',
          question: 'How do you turn a LEFT JOIN into an Anti-Join that isolates rows from the left table that have NO match in the right table?',
          options: [
            'A) Add "WHERE right_table.primary_key IS NULL"',
            'B) Add "HAVING COUNT(right_table.id) = 0"',
            'C) Use RIGHT JOIN instead',
            'D) Add "WHERE left_table.id IS NULL"'
          ],
          correct: 'A',
          rationale: 'When no match exists, the right table is padded with NULL. Checking that the right table primary key IS NULL isolates non-matching left records.'
        },
        {
          id: 'mcq_joi_3',
          question: 'What is the difference between placing a filter in the ON clause vs the WHERE clause of a LEFT JOIN?',
          options: [
            'A) There is no difference',
            'B) The ON clause filters the right table BEFORE matching (preserving left rows); the WHERE clause filters AFTER matching (dropping left rows where the right column is NULL)',
            'C) The ON clause cannot contain Boolean conditions',
            'D) WHERE executes before ON'
          ],
          correct: 'B',
          rationale: 'In a LEFT JOIN, ON defines what gets paired; non-matching left rows are preserved. WHERE filters the final combined tuple; non-matching left rows have NULL for right columns and fail the WHERE test.'
        },
        {
          id: 'mcq_joi_4',
          question: 'Which join algorithm is optimal when joining a small 1,000-row lookup table with a 50,000,000-row indexed fact table?',
          options: [
            'A) Nested Loop Join with Index Seek',
            'B) Cartesian Cross Join',
            'C) Full Table Merge Scan',
            'D) B-Tree Re-indexing'
          ],
          correct: 'A',
          rationale: 'For each of the 1,000 rows in the small table, the engine performs a fast B-Tree index seek on the 50M-row table, taking only 1,000 * O(log N) operations (~3,000 total seeks).'
        },
        {
          id: 'mcq_joi_5',
          question: 'What does a FULL OUTER JOIN return?',
          options: [
            'A) Only rows that match in both tables',
            'B) All rows from Table A, and matching rows from Table B',
            'C) All rows from both Table A and Table B, with NULL-padding on whichever side lacks a matching tuple',
            'D) A Cartesian product of all rows'
          ],
          correct: 'C',
          rationale: 'FULL OUTER JOIN preserves all records from both relations, pairing matching tuples and padding non-matching tuples with NULL on the opposing side.'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 6. ORDER BY & LIMIT
    // -------------------------------------------------------------------------
    'order-by': {
      id: 'order-by',
      keyword: 'ORDER BY',
      module: 'Ordering & Window Frames',
      title: 'Sorting Ladders & Deterministic Slicing',
      executionPhase: 'Phase 9 (ORDER BY) & Phase 10 (LIMIT) - Final Output Stages',
      executionRank: '9 & 10 of 10',
      tagline: 'Imposes deterministic topological order over relational sets',
      ansiSyntax: `ORDER BY expression [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...]
    [ LIMIT { count | ALL } ] [ OFFSET start ]`,
      summary: 'Relational tables are fundamentally unordered mathematical sets. ORDER BY sorts the emitted tuples according to specified comparator keys, collations, and NULL placement. LIMIT restricts the tuple count for pagination. Without an explicit, deterministic ORDER BY, the order of returned rows is completely arbitrary and subject to change across query executions.',
      engineInternals: {
        operatorType: 'Sort (Top-N Heap Sort / Quicksort / External Merge Sort)',
        memoryFootprint: 'Top-N Heap Sort uses O(K) memory where K is LIMIT count. Full sort uses O(N) RAM or spills to disk.',
        diskSpillRisk: 'High if sorting large unindexed sets without LIMIT. If dataset exceeds sort_buffer_size, the engine splits data into temporary run files and executes a multi-pass External Merge Sort.',
        complexity: 'O(N log K) with Top-N Heap Sort; O(N log N) for full sort; O(1) if utilizing a pre-sorted B-Tree index scan.',
        indexInteraction: 'An index matching the ORDER BY columns (and matching ASC/DESC order) allows the storage engine to walk the B-Tree index in order, completely eliminating the sort operator from the plan.'
      },
      svgDiagramType: 'sortlimit',
      svgWalkthrough: [
        { step: 1, title: 'Unordered Disk Rows', desc: 'Relational sets have no natural order; tuples arrive in physical page order.' },
        { step: 2, title: 'Comparator Sort Ladder', desc: 'Engine compares keys (David $125k > Ashley $115k > Elena $105k) in a bounded Top-3 heap.' },
        { step: 3, title: 'LIMIT Slicing Boundary', desc: 'Emits top 3 rows; trims ranks 4 and 5 at the cutoff fence.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Multi-Key Sorting with NULL Placement',
          sql: `-- Deterministic sorting with explicit NULL handling
SELECT emp_id, first_name, department, salary
FROM enterprise_employees
ORDER BY department ASC, salary DESC NULLS LAST;`
        },
        intermediate: {
          title: 'Deterministic Top-N Ranking with Tie-Breaker',
          sql: `-- Guaranteed deterministic pagination avoiding non-deterministic row jumps
SELECT order_id, customer_id, order_date, total_amount
FROM customer_orders
ORDER BY total_amount DESC, order_id ASC
LIMIT 10 OFFSET 0;`
        },
        advanced: {
          title: 'Keyset / Cursor-Based Pagination (Bypassing OFFSET Penalty)',
          sql: `-- High-performance cursor pagination replacing slow O(N) OFFSET
SELECT order_id, customer_id, total_amount, created_at
FROM customer_orders
WHERE (total_amount, order_id) < (950.00, 10842)
ORDER BY total_amount DESC, order_id DESC
LIMIT 20;`
        }
      },
      schemas: {
        inputTable: {
          name: 'Unordered Disk Storage',
          columns: ['name', 'salary'],
          sampleRows: [
            ['Ashley', '$115,000'],
            ['David', '$125,000'],
            ['Julia', '$95,000'],
            ['Carlos', '$72,000'],
            ['Elena', '$105,000']
          ]
        },
        outputTable: {
          name: 'ORDER BY salary DESC LIMIT 3',
          columns: ['rank', 'name', 'salary'],
          sampleRows: [
            ['1', 'David', '$125,000'],
            ['2', 'Ashley', '$115,000'],
            ['3', 'Elena', '$105,000']
          ]
        }
      },
      caseStudy: {
        title: 'Wall Street Liquidity Blotter Top-10 Trade Orders',
        company: 'Goldman Sachs Institutional High-Yield Trading',
        scenario: 'Trading blotters display the top 10 largest block orders executed in the last 15 minutes, refreshing every second. Query latency must remain under 3 milliseconds.',
        solutionSql: `SELECT
    trade_id,
    broker_id,
    security_symbol,
    execution_time,
    shares_count,
    trade_price,
    shares_count * trade_price AS trade_notional_usd
FROM executed_block_trades
WHERE execution_time >= CURRENT_TIMESTAMP - INTERVAL '15' MINUTE
ORDER BY (shares_count * trade_price) DESC, trade_id ASC
LIMIT 10;`,
        impact: 'Maintains sub-millisecond desk response times by leveraging a specialized B-Tree functional index on computed notional value.'
      },
      interviewQuestions: [
        {
          company: 'Uber / LinkedIn',
          question: 'What is the "OFFSET Pagination Performance Penalty", and how do you optimize it for high-scale feeds?',
          answer: 'When you execute "OFFSET 1000000 LIMIT 20", the database cannot magically jump to row 1,000,000; it must fetch, sort, and count 1,000,020 rows from disk and throw away the first 1,000,000, causing massive I/O lag. The solution is Keyset/Cursor pagination: remember the last seen (timestamp, id) and write: WHERE (timestamp, id) < (last_time, last_id) ORDER BY timestamp DESC, id DESC LIMIT 20, executing an O(log N) index seek.'
        },
        {
          company: 'Meta',
          question: 'What makes pagination non-deterministic, and how do you guarantee consistent pagination results across page clicks?',
          answer: 'If the ORDER BY column has duplicate values (e.g. ORDER BY created_date) and no unique tie-breaker, the database may order rows with identical dates in any arbitrary order. Rows can appear on both Page 1 and Page 2 while other rows are missed entirely. You must always append a unique column as the final tie-breaker (e.g. ORDER BY created_date DESC, id DESC).'
        }
      ],
      pitfalls: [
        {
          title: 'High OFFSET Performance Cliff',
          severity: 'Critical',
          description: 'Deep pagination with OFFSET 10000 forces the database to read and discard tens of thousands of rows, leading to server timeouts.'
        },
        {
          title: 'Missing Tie-Breaker in Pagination',
          severity: 'High',
          description: 'Sorting on non-unique columns causes row hopping and duplicated records across paginated web pages.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_ord_1',
          question: 'In standard ANSI SQL, where do NULL values sort by default when specifying "ORDER BY col ASC"?',
          options: [
            'A) Always in the middle',
            'B) Dialect dependent (e.g. PostgreSQL places NULLs LAST; MySQL places NULLs FIRST). Explicit NULLS FIRST / NULLS LAST should be used',
            'C) NULLs are excluded from sorting',
            'D) NULLs cause an error'
          ],
          correct: 'B',
          rationale: 'PostgreSQL treats NULL as larger than any value (placing them LAST in ASC, FIRST in DESC). MySQL and SQLite treat NULL as smaller than any value (FIRST in ASC). Explicitly writing NULLS FIRST / NULLS LAST guarantees portable behavior.'
        },
        {
          id: 'mcq_ord_2',
          question: 'If a query uses "LIMIT 5", what algorithm does PostgreSQL / MySQL use if work_mem is sufficient?',
          options: [
            'A) Full QuickSort of all 10 million rows',
            'B) Top-N Bounded Heap Sort, maintaining only 5 elements in memory at any time',
            'C) Bubble Sort',
            'D) Random Selection'
          ],
          correct: 'B',
          rationale: 'Top-N Heap Sort maintains a priority queue of size K. Each incoming row is compared against the boundary; if smaller, it is ignored, avoiding sorting the rest of the dataset.'
        },
        {
          id: 'mcq_ord_3',
          question: 'Can you ORDER BY an expression or column that is NOT present in the SELECT list?',
          options: [
            'A) No, only columns in the SELECT list can be sorted',
            'B) Yes, in standard queries (unless DISTINCT or UNION is specified, which strips unselected columns before Phase 9)',
            'C) Only in SQL Server',
            'D) Only if the column is an integer'
          ],
          correct: 'B',
          rationale: 'You can sort by any column in the base tables. However, if DISTINCT or UNION is present, the table is collapsed at Phase 7/8, so ORDER BY cannot access unprojected attributes.'
        },
        {
          id: 'mcq_ord_4',
          question: 'Why does "SELECT id FROM orders ORDER BY order_date LIMIT 10" execute with zero sorting overhead when an index on (order_date) exists?',
          options: [
            'A) The index contains pre-sorted leaf nodes; the engine simply reads the first 10 index entries in order',
            'B) B-Trees do not require indexing',
            'C) LIMIT eliminates indexes',
            'D) Order date is always ascending'
          ],
          correct: 'A',
          rationale: 'B-Trees are already sorted by design. Reading the first 10 nodes of an index takes O(1) time and requires zero sort CPU overhead.'
        },
        {
          id: 'mcq_ord_5',
          question: 'What is the logical execution rank of ORDER BY relative to SELECT and LIMIT?',
          options: [
            'A) Before SELECT, after LIMIT',
            'B) After SELECT (Phase 7), immediately preceding LIMIT (Phase 10)',
            'C) Before WHERE',
            'D) Simultaneously with GROUP BY'
          ],
          correct: 'B',
          rationale: 'The pipeline sequence is: SELECT (Phase 7) -> DISTINCT (Phase 8) -> ORDER BY (Phase 9) -> LIMIT (Phase 10).'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 7. WINDOW FUNCTIONS (OVER & PARTITION BY)
    // -------------------------------------------------------------------------
    'window-functions': {
      id: 'window-functions',
      keyword: 'OVER / PARTITION BY',
      module: 'Ordering & Window Frames',
      title: 'Sliding Frames & Analytical Vector Partitions',
      executionPhase: 'Phase 5.5 / 6 (Evaluated AFTER HAVING, right before SELECT)',
      executionRank: '6 of 10',
      tagline: 'Performs calculations across related tuple sets without collapsing rows',
      ansiSyntax: `function_name([expression [, ...]]) OVER (
    [ PARTITION BY partition_expression [, ...] ]
    [ ORDER BY sort_expression [ ASC | DESC ] [, ...] ]
    [ frame_clause ]
)`,
      summary: 'Unlike GROUP BY which collapses multiple rows into a single summary row, Window Functions compute running totals, rankings, moving averages, and lead/lag offsets while preserving every individual input row. The OVER clause defines the partitioning fences and sliding frame boundaries.',
      engineInternals: {
        operatorType: 'WindowAgg / Stream Partition Buffer',
        memoryFootprint: 'O(P) where P is the size of the current partition. Uses a sliding window ring buffer.',
        diskSpillRisk: 'Moderate. If partition ordering requires sorting and the partition size exceeds work_mem, it spills to temporary disk files.',
        complexity: 'O(N log P) where P is partition size.',
        indexInteraction: 'An index matching (partition_col, order_col) allows WindowAgg to stream tuples directly with zero sorting or memory buffering.'
      },
      svgDiagramType: 'window',
      svgWalkthrough: [
        { step: 1, title: 'Partition Fences', desc: 'Rows are segregated into departmental partition fences (Engineering vs Analytics) without row collapse.' },
        { step: 2, title: 'Sliding Frame Accumulator', desc: 'Computes running metric per row: Row 1 ($125k), Row 2 ($125k + $110k = $235k), Row 3 ($235k + $72k = $307k).' },
        { step: 3, title: 'Preserved Emitted Schema', desc: 'Original individual rows are emitted alongside their analytical window metric.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Row Numbering & Dense Ranking within Department',
          sql: `-- Ranking employees by salary within each department
SELECT
    emp_id,
    first_name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM enterprise_employees;`
        },
        intermediate: {
          title: 'Running Total & 7-Day Moving Average',
          sql: `-- Running cumulative revenue and 7-day smoothing window
SELECT
    order_date,
    daily_revenue,
    SUM(daily_revenue) OVER (
        ORDER BY order_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_running_revenue,
    ROUND(AVG(daily_revenue) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 2) AS moving_avg_7day
FROM daily_revenue_summary;`
        },
        advanced: {
          title: 'Lead/Lag Delta & Period-over-Period Growth Rate',
          sql: `-- Calculating month-over-month revenue delta and growth percentage
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', order_date) AS sales_month,
        SUM(total_amount) AS monthly_revenue
    FROM customer_orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    sales_month,
    monthly_revenue,
    LAG(monthly_revenue, 1) OVER (ORDER BY sales_month) AS prior_month_rev,
    monthly_revenue - LAG(monthly_revenue, 1) OVER (ORDER BY sales_month) AS mom_dollar_growth,
    ROUND(
        ((monthly_revenue - LAG(monthly_revenue, 1) OVER (ORDER BY sales_month)) 
        / NULLIF(LAG(monthly_revenue, 1) OVER (ORDER BY sales_month), 0)) * 100, 
        2
    ) AS mom_growth_pct
FROM monthly_sales;`
        }
      },
      schemas: {
        inputTable: {
          name: 'Engineering Partition Tuples',
          columns: ['name', 'department', 'salary'],
          sampleRows: [
            ['David', 'Engineering', '$125,000'],
            ['Sara', 'Engineering', '$110,000'],
            ['Carlos', 'Engineering', '$72,000']
          ]
        },
        outputTable: {
          name: 'Running Cumulative Salary (OVER)',
          columns: ['name', 'salary', 'rank', 'running_total'],
          sampleRows: [
            ['David', '$125,000', '1', '$125,000'],
            ['Sara', '$110,000', '2', '$235,000'],
            ['Carlos', '$72,000', '3', '$307,000']
          ]
        }
      },
      caseStudy: {
        title: 'JPMorgan 99% 1-Day Value-at-Risk (VaR) Calculation',
        company: 'JPMorgan Chase Quantitative Risk & Treasury',
        scenario: 'Risk quants model daily trading book losses over 500 trading days, isolating the 1st percentile historical loss threshold to meet Basel III market risk capital requirements.',
        solutionSql: `WITH ranked_daily_pnl AS (
    SELECT
        trading_date,
        daily_pnl_usd,
        PERCENT_RANK() OVER (ORDER BY daily_pnl_usd ASC) AS pnl_percentile
    FROM trading_book_daily_pnl
    WHERE trading_date >= CURRENT_DATE - INTERVAL '500' DAY
)
SELECT
    MAX(daily_pnl_usd) AS var_99_loss_threshold
FROM ranked_daily_pnl
WHERE pnl_percentile <= 0.01;`,
        impact: 'Delivers audited CCAR and Basel III Value-at-Risk calculations to senior risk committees daily without requiring external Python/R batch jobs.'
      },
      interviewQuestions: [
        {
          company: 'Google / Meta',
          question: 'What is the critical behavioral difference between RANK(), DENSE_RANK(), and ROW_NUMBER() when ties occur?',
          answer: 'ROW_NUMBER() guarantees unique incremental integers (1, 2, 3, 4) regardless of ties. RANK() assigns the same rank to identical values but leaves gaps for subsequent ranks (1, 2, 2, 4). DENSE_RANK() assigns the same rank to ties but does NOT leave gaps (1, 2, 2, 3). In LeetCode #185 (Top 3 Department Earners), DENSE_RANK() is mandatory because the 3rd highest unique salary can be shared by multiple employees.'
        },
        {
          company: 'Amazon / Apple',
          question: 'What is the default window frame when ORDER BY is specified inside an OVER() clause without an explicit ROWS/RANGE clause?',
          answer: 'The ANSI default frame is "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW". This carries two massive hazards: 1) RANGE groups duplicate values into peers, causing running totals to jump instead of smoothly accumulating row-by-row, and 2) RANGE requires memory spooling and is vastly slower than "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW".'
        }
      ],
      pitfalls: [
        {
          title: 'The Default RANGE Frame Trap',
          severity: 'Critical',
          description: 'Omitting the frame clause when computing a running sum defaults to RANGE, which groups identical timestamps together and sums them in a single lump jump instead of calculating a true cumulative sum.'
        },
        {
          title: 'Attempting to filter window functions in WHERE',
          severity: 'High',
          description: 'Writing "WHERE ROW_NUMBER() OVER (...) <= 3" fails because WHERE executes at Phase 2, long before window functions evaluate at Phase 6. You must wrap the window query in a CTE or subquery (or use QUALIFY in Snowflake/BigQuery).'
        }
      ],
      mcqs: [
        {
          id: 'mcq_win_1',
          question: 'What is the result of DENSE_RANK() for salaries: $100k, $90k, $90k, $80k?',
          options: [
            'A) 1, 2, 3, 4',
            'B) 1, 2, 2, 4',
            'C) 1, 2, 2, 3',
            'D) 1, 1, 2, 3'
          ],
          correct: 'C',
          rationale: 'DENSE_RANK() assigns rank 2 to both $90k earners and advances immediately to 3 for $80k without leaving a gap.'
        },
        {
          id: 'mcq_win_2',
          question: 'Why does "SELECT name, salary FROM emp WHERE RANK() OVER (ORDER BY salary DESC) <= 3" trigger a syntax error?',
          options: [
            'A) Window functions cannot be used in WHERE clauses because WHERE executes at Phase 2 before window functions evaluate at Phase 6',
            'B) RANK() requires a PARTITION BY clause',
            'C) The syntax requires parentheses around the WHERE clause',
            'D) Salary must be an integer'
          ],
          correct: 'A',
          rationale: 'Window functions are evaluated at Phase 6, after WHERE has already filtered rows. To filter window ranks, wrap in a CTE or subquery.'
        },
        {
          id: 'mcq_win_3',
          question: 'What does LAG(salary, 2, 0) OVER (ORDER BY hire_date) return for the second row in the partition?',
          options: [
            'A) The salary from 2 rows prior, falling back to default value 0 because 2 rows prior does not exist',
            'B) The salary of the current row',
            'C) NULL',
            'D) Syntax error'
          ],
          correct: 'A',
          rationale: 'LAG(col, offset, default) looks back "offset" rows. For row 2, looking back 2 rows exceeds the partition boundary, so the specified default 0 is returned.'
        },
        {
          id: 'mcq_win_4',
          question: 'What is the clause available in Snowflake, BigQuery, and DuckDB that filters window function results directly without requiring a CTE wrapper?',
          options: [
            'A) HAVING',
            'B) QUALIFY',
            'C) FILTER',
            'D) SIFT'
          ],
          correct: 'B',
          rationale: 'QUALIFY executes at Phase 6.5, filtering window results directly (e.g. QUALIFY ROW_NUMBER() OVER (...) <= 3) without nested CTE boilerplate.'
        },
        {
          id: 'mcq_win_5',
          question: 'How does PARTITION BY differ from GROUP BY in terms of output row count?',
          options: [
            'A) PARTITION BY preserves all original input rows; GROUP BY collapses rows into a single summary row per group',
            'B) They are exact synonyms',
            'C) PARTITION BY deletes duplicate rows',
            'D) GROUP BY requires an index'
          ],
          correct: 'A',
          rationale: 'GROUP BY is a dimensional collapse operator; PARTITION BY computes analytical metrics over subsets while preserving 100% of individual tuples.'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 8. CASE WHEN (CONDITIONAL LOGIC)
    // -------------------------------------------------------------------------
    'case-when': {
      id: 'case-when',
      keyword: 'CASE WHEN',
      module: 'Conditional & Pipelines',
      title: 'Polymorphic Conditional Switchboard & Branch Router',
      executionPhase: 'In-Flight Scalar Evaluation (Usable in SELECT, WHERE, GROUP BY, ORDER BY)',
      executionRank: 'Any Phase',
      tagline: 'The ANSI SQL control flow expression returning deterministic values based on boolean predicates',
      ansiSyntax: `CASE [ expression ]
    WHEN condition THEN result
    [ WHEN ... THEN ... ]
    [ ELSE result ]
END`,
      summary: 'The CASE expression provides declarative conditional branching. It evaluates predicates sequentially and returns the corresponding result expression for the first condition that evaluates to TRUE. If no condition matches and an ELSE clause is omitted, the expression returns NULL.',
      engineInternals: {
        operatorType: 'Short-Circuit Scalar Evaluator',
        memoryFootprint: 'O(1) memory register.',
        diskSpillRisk: 'None. Evaluated in CPU branch registers.',
        complexity: 'O(1) per row across K conditional branches.',
        indexInteraction: 'Enables Conditional Aggregation (Pivot emulation via SUM(CASE WHEN ...)) without multiple table scans.'
      },
      svgDiagramType: 'casewhen',
      svgWalkthrough: [
        { step: 1, title: 'Tuple Stream Ingestion', desc: 'Raw salary records enter the conditional switchboard.' },
        { step: 2, title: 'Sequential Branch Routing', desc: 'Branch 1: >= 120k -> "Senior". Branch 2: >= 90k -> "Mid". Branch 3: ELSE -> "Junior".' },
        { step: 3, title: 'Emitted Categorical Schema', desc: 'Outputs standardized tier labels with zero disk mutations.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Simple Searched CASE Expression',
          sql: `-- Categorizing employee compensation into corporate bands
SELECT
    emp_id,
    first_name,
    salary,
    CASE
        WHEN salary >= 120000 THEN 'SENIOR_BAND'
        WHEN salary >= 90000 THEN 'MID_BAND'
        ELSE 'ASSOCIATE_BAND'
    END AS compensation_tier
FROM enterprise_employees;`
        },
        intermediate: {
          title: 'Conditional Aggregation (Fast Pivot Pattern)',
          sql: `-- Pivoting rows to columns in a single table scan
SELECT
    department,
    COUNT(*) AS total_headcount,
    SUM(CASE WHEN salary >= 100000 THEN 1 ELSE 0 END) AS high_earners_count,
    SUM(CASE WHEN salary < 100000 THEN 1 ELSE 0 END) AS standard_earners_count
FROM enterprise_employees
GROUP BY department;`
        },
        advanced: {
          title: 'Conditional Sorting (Dynamic Custom Ordering)',
          sql: `-- Custom domain sorting prioritizing VIP orders and delivery deadlines
SELECT order_id, customer_tier, promised_delivery_date, total_amount
FROM customer_orders
ORDER BY 
    CASE customer_tier
        WHEN 'PLATINUM' THEN 1
        WHEN 'GOLD' THEN 2
        WHEN 'SILVER' THEN 3
        ELSE 4
    END ASC,
    promised_delivery_date ASC;`
        }
      },
      schemas: {
        inputTable: {
          name: 'Input Salary Stream',
          columns: ['name', 'salary'],
          sampleRows: [
            ['David', '$125,000'],
            ['Ashley', '$115,000'],
            ['Julia', '$95,000'],
            ['Carlos', '$72,000']
          ]
        },
        outputTable: {
          name: 'Categorized Output',
          columns: ['name', 'salary', 'tier'],
          sampleRows: [
            ['David', '$125,000', 'Senior Band'],
            ['Ashley', '$115,000', 'Mid Band'],
            ['Julia', '$95,000', 'Mid Band'],
            ['Carlos', '$72,000', 'Junior Band']
          ]
        }
      },
      caseStudy: {
        title: 'Amazon Prime Video Churn Risk Scoring',
        company: 'Amazon Prime Entertainment',
        scenario: 'Risk models score user engagement based on weekly viewing minutes, watchlist saves, and app launch frequencies, assigning retention risk flags.',
        solutionSql: `SELECT
    user_id,
    weekly_stream_minutes,
    CASE
        WHEN weekly_stream_minutes >= 300 AND watchlist_saves >= 5 THEN 'POWER_ENGAGED'
        WHEN weekly_stream_minutes >= 60 THEN 'MODERATE_ENGAGED'
        WHEN weekly_stream_minutes > 0 THEN 'AT_RISK_LOW_USAGE'
        ELSE 'DORMANT_CRITICAL'
    END AS retention_health_status
FROM prime_video_weekly_engagement;`,
        impact: 'Classifies 85 million active streaming profiles nightly in a single scan for personalized homepage re-engagement algorithms.'
      },
      interviewQuestions: [
        {
          company: 'Meta / Netflix',
          question: 'Does CASE WHEN in SQL short-circuit like an if-else in Python/C++?',
          answer: 'In general ANSI semantics, CASE expressions evaluate conditions sequentially and stop at the first matching condition. However, SQL query optimizers reserve the right to reorder expression evaluation for performance if no side effects exist. Never rely on CASE short-circuiting to prevent division by zero in deeply nested optimizer trees; use NULLIF() instead.'
        },
        {
          company: 'Bloomberg',
          question: 'What is Conditional Aggregation, and why is it preferred over running multiple separate queries with WHERE filters?',
          answer: 'Conditional aggregation wraps CASE WHEN inside SUM() or COUNT() (e.g. SUM(CASE WHEN status = "ERROR" THEN 1 ELSE 0 END)). It allows calculating metrics for multiple independent subsets in a single pass over the table, whereas separate queries require scanning the table multiple times.'
        }
      ],
      pitfalls: [
        {
          title: 'Omitting the ELSE Clause',
          severity: 'High',
          description: 'If no WHEN branch matches and ELSE is omitted, CASE returns NULL. In mathematical calculations, this can introduce unexpected NULL values that break arithmetic.'
        },
        {
          title: 'Incompatible Return Data Types',
          severity: 'Critical',
          description: 'All THEN and ELSE result branches must resolve to compatible data types. Returning an integer in one branch and a string in another triggers immediate compile-time type coercion failures.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_cas_1',
          question: 'What does a CASE expression return if no WHEN condition matches and no ELSE branch is specified?',
          options: [
            'A) 0',
            'B) An empty string \'\'',
            'C) NULL',
            'D) A fatal runtime exception'
          ],
          correct: 'C',
          rationale: 'ANSI SQL specifies that an omitted ELSE clause defaults to ELSE NULL.'
        },
        {
          id: 'mcq_cas_2',
          question: 'What is the result of: CASE WHEN 1=1 THEN \'A\' WHEN 2=2 THEN \'B\' ELSE \'C\' END?',
          options: [
            'A) \'A\'',
            'B) \'B\'',
            'C) \'A, B\'',
            'D) \'C\''
          ],
          correct: 'A',
          rationale: 'CASE evaluates sequentially and short-circuits on the first condition that evaluates to TRUE (1=1).'
        },
        {
          id: 'mcq_cas_3',
          question: 'How do you rewrite "COUNT(CASE WHEN status = \'PAID\' THEN 1 END)" using SUM?',
          options: [
            'A) SUM(status = \'PAID\')',
            'B) SUM(CASE WHEN status = \'PAID\' THEN 1 ELSE 0 END)',
            'C) SUM(PAID)',
            'D) SUM(1)'
          ],
          correct: 'B',
          rationale: 'In SUM, non-matching rows must evaluate to 0 so they do not add to the accumulator.'
        },
        {
          id: 'mcq_cas_4',
          question: 'Can you use a CASE expression inside a GROUP BY clause?',
          options: [
            'A) No, only column names can be in GROUP BY',
            'B) Yes, to dynamically bucket rows into custom groups (e.g. GROUP BY CASE WHEN age < 30 THEN \'Young\' ELSE \'Senior\' END)',
            'C) Only in MySQL',
            'D) Only if wrapped in a VIEW'
          ],
          correct: 'B',
          rationale: 'Any deterministic scalar expression can be used as a grouping key in ANSI GROUP BY.'
        },
        {
          id: 'mcq_cas_5',
          question: 'What error occurs in: "SELECT CASE WHEN flag = 1 THEN 100 ELSE \'N/A\' END FROM t"?',
          options: [
            'A) Syntax error at flag',
            'B) Type mismatch error: THEN returns an integer while ELSE returns a varchar',
            'C) Table scan error',
            'D) No error; SQL dynamically types the column'
          ],
          correct: 'B',
          rationale: 'All branches of a CASE expression must return coercible, identical data types.'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 9. WITH (COMMON TABLE EXPRESSIONS - CTE)
    // -------------------------------------------------------------------------
    'cte': {
      id: 'cte',
      keyword: 'WITH (CTE)',
      module: 'Conditional & Pipelines',
      title: 'Modular Relational Pipelines & Common Table Expressions',
      executionPhase: 'Pre-Query Scoping (Logical View Materialization)',
      executionRank: 'Phase 0 (Compiled at Query Initiation)',
      tagline: 'Encapsulates modular sub-queries into named, reusable relational pipelines',
      ansiSyntax: `WITH [ RECURSIVE ] cte_name [ (column_name [, ...]) ] AS (
    SELECT ...
) [, ...]
SELECT ... FROM cte_name;`,
      summary: 'A Common Table Expression (CTE) defines a temporary, named result set that exists only within the execution scope of a single SQL statement. CTEs transform messy, deeply nested subqueries into readable, top-to-bottom procedural pipelines. With the RECURSIVE keyword, CTEs enable hierarchical tree traversal, graph traversal, and date scaffolding.',
      engineInternals: {
        operatorType: 'Inline View or Temp Buffer Materializer',
        memoryFootprint: 'O(C) where C is the size of the CTE. In PostgreSQL 12+, CTEs are inlined by default unless marked MATERIALIZED.',
        diskSpillRisk: 'Moderate if the CTE generates massive intermediate rows that exceed work_mem.',
        complexity: 'Determined by the underlying query plan; inlined CTEs inherit index scans from outer predicates.',
        indexInteraction: 'Inlined CTEs push outer WHERE predicates directly down into the CTE base tables (Predicate Pushdown), preserving index scans.'
      },
      svgDiagramType: 'cte',
      svgWalkthrough: [
        { step: 1, title: 'CTE Definition Stage', desc: 'WITH DeptAverages AS (SELECT dept, AVG(salary) FROM employees GROUP BY dept).' },
        { step: 2, title: 'Pipeline Conduit Stream', desc: 'Passes intermediate summary dataset to subsequent pipeline stages.' },
        { step: 3, title: 'Outer Join & Filter Emission', desc: 'Joins original employees with DeptAverages to isolate above-average earners.' }
      ],
      codePatterns: {
        foundational: {
          title: 'Basic Single CTE for Modular Query Readability',
          sql: `-- Isolate department averages in a named CTE
WITH DeptMetrics AS (
    SELECT
        department,
        AVG(salary) AS avg_dept_salary,
        MAX(salary) AS max_dept_salary
    FROM enterprise_employees
    GROUP BY department
)
SELECT
    e.first_name,
    e.department,
    e.salary,
    ROUND(d.avg_dept_salary, 2) AS dept_average,
    e.salary - d.avg_dept_salary AS delta_from_average
FROM enterprise_employees e
INNER JOIN DeptMetrics d ON e.department = d.department
WHERE e.salary > d.avg_dept_salary;`
        },
        intermediate: {
          title: 'Chained Multi-Stage CTE Pipeline',
          sql: `-- Multi-stage pipeline: Stage 1 clean -> Stage 2 aggregate -> Stage 3 filter
WITH raw_filtered_orders AS (
    SELECT customer_id, total_amount, order_date
    FROM customer_orders
    WHERE order_status = 'COMPLETED'
      AND order_date >= '2026-01-01'
),
customer_lifetime_summary AS (
    SELECT
        customer_id,
        COUNT(*) AS total_orders,
        SUM(total_amount) AS total_spend,
        AVG(total_amount) AS avg_ticket_size
    FROM raw_filtered_orders
    GROUP BY customer_id
)
SELECT
    c.customer_id,
    c.total_orders,
    c.total_spend
FROM customer_lifetime_summary c
WHERE c.total_spend >= 5000
ORDER BY c.total_spend DESC;`
        },
        advanced: {
          title: 'Recursive CTE for Organizational Hierarchy Traversal',
          sql: `-- Recursive tree traversal calculating employee reporting levels
WITH RECURSIVE OrgChart AS (
    -- Anchor Member: Top-level CEO (manager_id is NULL)
    SELECT
        emp_id,
        first_name,
        manager_id,
        1 AS org_depth,
        first_name AS hierarchy_path
    FROM enterprise_employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive Member: Subordinates joining to parent in previous iteration
    SELECT
        e.emp_id,
        e.first_name,
        e.manager_id,
        o.org_depth + 1,
        o.hierarchy_path || ' -> ' || e.first_name
    FROM enterprise_employees e
    INNER JOIN OrgChart o ON e.manager_id = o.emp_id
)
SELECT emp_id, first_name, org_depth, hierarchy_path
FROM OrgChart
ORDER BY org_depth, emp_id;`
        }
      },
      schemas: {
        inputTable: {
          name: 'Stage 1 CTE: DeptAverages',
          columns: ['department', 'avg_salary'],
          sampleRows: [
            ['Engineering', '$102,333.33'],
            ['Analytics', '$105,000.00']
          ]
        },
        outputTable: {
          name: 'Above-Average Earners (Joined in Outer Query)',
          columns: ['name', 'department', 'salary', 'avg_dept_sal'],
          sampleRows: [
            ['David', 'Engineering', '$125,000', '$102,333.33'],
            ['Ashley', 'Analytics', '$115,000', '$105,000.00']
          ]
        }
      },
      caseStudy: {
        title: 'JPMorgan Nostro / Vostro Interbank Wire Recon Pipeline',
        company: 'JPMorgan Chase Worldwide Securities Services',
        scenario: 'Reconcile bilateral wire transactions between domestic Nostro records and correspondent banking Vostro manifests to isolate un-cleared intraday wire breaks.',
        solutionSql: `WITH normalized_nostro AS (
    SELECT swift_ref, wire_amount_usd, sending_bic, receiving_bic
    FROM domestic_nostro_ledger
    WHERE value_date = CURRENT_DATE
),
normalized_vostro AS (
    SELECT swift_ref, wire_amount_usd, sending_bic, receiving_bic
    FROM correspondent_vostro_manifest
    WHERE value_date = CURRENT_DATE
),
reconciliation_delta AS (
    SELECT
        COALESCE(n.swift_ref, v.swift_ref) AS swift_ref,
        n.wire_amount_usd AS nostro_amount,
        v.wire_amount_usd AS vostro_amount,
        CASE
            WHEN n.swift_ref IS NULL THEN 'MISSING_IN_NOSTRO'
            WHEN v.swift_ref IS NULL THEN 'MISSING_IN_VOSTRO'
            WHEN n.wire_amount_usd <> v.wire_amount_usd THEN 'AMOUNT_MISMATCH'
            ELSE 'MATCHED'
        END AS recon_status
    FROM normalized_nostro n
    FULL OUTER JOIN normalized_vostro v ON n.swift_ref = v.swift_ref
)
SELECT *
FROM reconciliation_delta
WHERE recon_status <> 'MATCHED';`,
        impact: 'Reconciles $450B in daily interbank wires in a modular 3-stage pipeline, surfacing exceptions to treasury operations within 4 seconds of batch settlement.'
      },
      interviewQuestions: [
        {
          company: 'Amazon / Palantir',
          question: 'Are CTEs materialized into temp tables or inlined as subqueries in modern PostgreSQL and SQLite?',
          answer: 'Prior to PostgreSQL 12, CTEs were strict optimization fences—always materialized into temporary memory buffers, which prevented the optimizer from pushing outer WHERE filters down into the CTE. In PostgreSQL 12+ and SQLite, non-recursive CTEs without side effects are automatically inlined like regular subqueries unless explicitly defined as "WITH name AS MATERIALIZED (...)".'
        },
        {
          company: 'Stripe',
          question: 'How does a RECURSIVE CTE terminate, and what causes an infinite loop in graph traversal queries?',
          answer: 'A RECURSIVE CTE executes in two parts: 1) Anchor member evaluates once. 2) Recursive member executes repeatedly on the results of the previous iteration until the working table returns 0 rows. An infinite loop occurs if the underlying data has cyclic relationships (e.g. Employee A manages B who manages A) and the query lacks a cycle detection check or max depth limit.'
        }
      ],
      pitfalls: [
        {
          title: 'Unintended CTE Optimization Fence',
          severity: 'High',
          description: 'In older database versions or when marked MATERIALIZED, CTEs prevent predicate pushdown, forcing a full table scan inside the CTE even if the outer query only requests one row.'
        },
        {
          title: 'Cyclic Graph Infinite Loops in RECURSIVE CTEs',
          severity: 'Critical',
          description: 'Recursive queries over cyclic graphs loop forever until the database crashes or exhausts disk temp space. Always include a depth counter or CYCLE clause.'
        }
      ],
      mcqs: [
        {
          id: 'mcq_cte_1',
          question: 'What is the primary readability advantage of a CTE over deeply nested subqueries?',
          options: [
            'A) CTEs force the database to use B-Trees',
            'B) CTEs allow sequential, top-down procedural structuring of complex queries instead of inside-out nesting',
            'C) CTEs eliminate the need for foreign keys',
            'D) CTEs make queries run 100x faster automatically'
          ],
          correct: 'B',
          rationale: 'CTEs organize queries logically from top to bottom, allowing intermediate stages to be referenced cleanly by name.'
        },
        {
          id: 'mcq_cte_2',
          question: 'Can one CTE in a multi-CTE query reference a preceding CTE defined earlier in the same WITH clause?',
          options: [
            'A) No, CTEs are strictly isolated',
            'B) Yes, subsequent CTEs can reference any previously defined CTE in the same statement',
            'C) Only if RECURSIVE is specified',
            'D) Only in Oracle'
          ],
          correct: 'B',
          rationale: 'In a chained CTE ("WITH a AS (...), b AS (SELECT * FROM a)"), stage B can seamlessly reference stage A.'
        },
        {
          id: 'mcq_cte_3',
          question: 'In a RECURSIVE CTE, which member executes first and exactly once?',
          options: [
            'A) The Recursive Member',
            'B) The Anchor Member',
            'C) The Final SELECT',
            'D) The UNION ALL operator'
          ],
          correct: 'B',
          rationale: 'The Anchor Member executes once to seed the initial result set, after which the Recursive Member loops over intermediate outputs.'
        },
        {
          id: 'mcq_cte_4',
          question: 'What keyword in PostgreSQL 12+ forces the query planner to evaluate a CTE independently and store its intermediate output in a temp buffer?',
          options: [
            'A) WITH cte AS BUFFERED (...)',
            'B) WITH cte AS MATERIALIZED (...)',
            'C) WITH cte AS CACHED (...)',
            'D) WITH cte AS STATIC (...)'
          ],
          correct: 'B',
          rationale: 'The MATERIALIZED keyword forces an explicit optimization fence, ensuring the CTE executes as a standalone buffer.'
        },
        {
          id: 'mcq_cte_5',
          question: 'What is the lifecycle of a Common Table Expression?',
          options: [
            'A) Persisted permanently in the schema catalog',
            'B) Retained for the duration of the database user session',
            'C) Valid strictly during the execution of the single statement in which it is defined',
            'D) Retained until the next server restart'
          ],
          correct: 'C',
          rationale: 'CTEs are transient query-scoped structures; they evaporate immediately upon completion of the statement.'
        }
      ]
    }
  };

  // Expose globally
  window.KeywordEncyclopedia = {
    getAllKeywords: () => Object.values(KEYWORD_ENCYCLOPEDIA),
    getKeyword: (id) => KEYWORD_ENCYCLOPEDIA[id] || null,
    hasKeyword: (id) => !!KEYWORD_ENCYCLOPEDIA[id],
    getKeywordIds: () => Object.keys(KEYWORD_ENCYCLOPEDIA)
  };

  console.log('✅ SQL Foundry Keyword Encyclopedia Core initialized with', Object.keys(KEYWORD_ENCYCLOPEDIA).length, 'comprehensive chapters.');
})();
