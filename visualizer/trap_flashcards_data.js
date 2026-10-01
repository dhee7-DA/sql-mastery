/**
 * ============================================================================
 * 🧠 MASTER ENTERPRISE SQL TRAP FLASHCARDS VAULT (36 Production Traps)
 * ============================================================================
 * High-frequency production traps, silent data corruption gotchas, and 
 * interview filter questions formatted for Leitner Spaced Repetition (SRS).
 * ============================================================================
 */

(function (window) {
  'use strict';

  const TRAP_CATEGORIES = [
    { id: 'all', name: 'All Traps (36)', icon: '⚡' },
    { id: 'joins', name: 'Relational JOINs (6)', icon: '🏛️' },
    { id: 'window', name: 'Window Functions (6)', icon: '🪟' },
    { id: 'subqueries', name: 'Subqueries & CTEs (6)', icon: '🌳' },
    { id: 'aggregates', name: 'Aggregations & Grouping (6)', icon: '📊' },
    { id: 'logic_nulls', name: '3-Valued Logic & Types (6)', icon: '⚖️' },
    { id: 'set_operations', name: 'Set Operations (6)', icon: '🔀' }
  ];

  const MASTER_TRAP_FLASHCARDS = [
    // =========================================================================
    // 1. RELATIONAL JOINS TRAPS
    // =========================================================================
    {
      id: 'trap_join_01_where_filter',
      category: 'joins',
      trapKey: 'WHERE B.',
      trapTitle: 'Outer Join Nullification Trap',
      severity: 'CRITICAL',
      frequency: '⭐ 98% Interview & Production',
      summary: 'Placing right-table filter predicates in WHERE instead of ON silently drops unmatched rows.',
      scenario: 'You are tasked with finding all customers—including those who have never placed an order—along with their active orders.',
      flawedCode: `SELECT c.customer_id, c.name, o.order_id, o.order_status
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_status = 'ACTIVE';`,
      revealedAnalysis: {
        fatalFlaw: 'For customers with NO orders, the LEFT JOIN generates NULL for all \`orders\` columns. Then the WHERE clause evaluates \`NULL = "ACTIVE"\`, which evaluates to UNKNOWN and discards those rows! The query silently morphs into an INNER JOIN.',
        businessImpact: 'All dormant or new customers are omitted from the report. If calculating churn or unactivated users, metrics will be completely false.',
        correctCode: `SELECT c.customer_id, c.name, o.order_id, o.order_status
FROM customers c
LEFT JOIN orders o 
  ON c.customer_id = o.customer_id 
 AND o.order_status = 'ACTIVE';`,
        memoryMnemonic: 'Filters on PRESERVED table go in WHERE; filters on OPTIONAL (outer) table go in ON!'
      }
    },
    {
      id: 'trap_join_02_fan_out',
      category: 'joins',
      trapKey: 'FAN OUT',
      trapTitle: 'Cartesian Metric Fan-Out Trap',
      severity: 'CRITICAL',
      frequency: '⭐ 95% Production Financial Blunder',
      summary: 'Joining two one-to-many child tables multiplies rows, causing SUM and COUNT to explode exponentially.',
      scenario: 'Calculate the total payments and total invoice line items for each customer account.',
      flawedCode: `SELECT c.customer_id,
       SUM(p.payment_amount) AS total_paid,
       SUM(i.invoice_amount) AS total_invoiced
FROM customers c
LEFT JOIN payments p ON c.customer_id = p.customer_id
LEFT JOIN invoice_items i ON c.customer_id = i.customer_id
GROUP BY c.customer_id;`,
      revealedAnalysis: {
        fatalFlaw: 'If a customer has 4 payments and 5 invoice items, joining both creates a 4 × 5 = 20 row Cartesian cross product per customer! Each payment is summed 5 times, and each invoice is summed 4 times.',
        businessImpact: 'Financial totals are inflated by 400% to 1,000%+, causing severe accounting discrepancies.',
        correctCode: `WITH paid AS (
  SELECT customer_id, SUM(payment_amount) AS total_paid
  FROM payments GROUP BY customer_id
),
invoiced AS (
  SELECT customer_id, SUM(invoice_amount) AS total_invoiced
  FROM invoice_items GROUP BY customer_id
)
SELECT c.customer_id,
       COALESCE(p.total_paid, 0) AS total_paid,
       COALESCE(i.total_invoiced, 0) AS total_invoiced
FROM customers c
LEFT JOIN paid p ON c.customer_id = p.customer_id
LEFT JOIN invoiced i ON c.customer_id = i.customer_id;`,
        memoryMnemonic: 'Aggregate child tables in separate CTEs BEFORE joining, never join multiple 1:N children in one pass!'
      }
    },
    {
      id: 'trap_join_03_natural_join',
      category: 'joins',
      trapKey: 'NATURAL JOIN',
      trapTitle: 'Silent NATURAL JOIN Schema Drift Trap',
      severity: 'HIGH',
      frequency: '⭐ 85% Code Review Flag',
      summary: 'NATURAL JOIN matches all columns with identical names. Adding audit columns silently breaks queries.',
      scenario: 'Joining employees to departments based on shared IDs using NATURAL JOIN.',
      flawedCode: `SELECT *
FROM employees
NATURAL JOIN departments;`,
      revealedAnalysis: {
        fatalFlaw: 'If both tables share \`id\` and also add metadata columns like \`created_at\` or \`updated_at\`, NATURAL JOIN now matches on \`(department_id AND created_at)\`. Rows with identical department IDs but different timestamps return 0 matches!',
        businessImpact: 'A schema migration adding an audit column suddenly causes reports to return empty results without throwing any syntax errors.',
        correctCode: `SELECT e.emp_id, e.emp_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;`,
        memoryMnemonic: 'Never use NATURAL JOIN in production. Always write explicit \`ON a.key = b.key\`.'
      }
    },
    {
      id: 'trap_join_04_full_outer_coalesce',
      category: 'joins',
      trapKey: 'FULL JOIN',
      trapTitle: 'Missing COALESCE in FULL OUTER JOIN',
      severity: 'HIGH',
      frequency: '⭐ 90% Financial Reconciliation',
      summary: 'Projecting only table A\'s primary key in a FULL JOIN leaves right-side-only breaks with NULL IDs.',
      scenario: 'Reconcile internal trade booking against the clearinghouse settlement feed.',
      flawedCode: `SELECT a.trade_id, a.notional_usd, b.notional_usd
FROM internal_trades a
FULL OUTER JOIN clearing_trades b ON a.trade_id = b.trade_id
WHERE a.notional_usd IS NULL OR b.notional_usd IS NULL;`,
      revealedAnalysis: {
        fatalFlaw: 'For trades that exist ONLY in \`clearing_trades\` (breaks where clearing has it but internal does not), \`a.trade_id\` is NULL. Your break report shows \`NULL\` for the identifier!',
        businessImpact: 'Risk officers cannot identify which clearing trades broke reconciliation because the trade_id column is completely blank.',
        correctCode: `SELECT COALESCE(a.trade_id, b.trade_id) AS reconciled_trade_id,
       a.notional_usd AS internal_amount,
       b.notional_usd AS clearing_amount,
       CASE 
         WHEN a.trade_id IS NULL THEN 'MISSING_IN_INTERNAL'
         WHEN b.trade_id IS NULL THEN 'MISSING_IN_CLEARING'
         ELSE 'AMOUNT_MISMATCH'
       END AS break_type
FROM internal_trades a
FULL OUTER JOIN clearing_trades b ON a.trade_id = b.trade_id
WHERE a.trade_id IS NULL OR b.trade_id IS NULL OR a.notional_usd != b.notional_usd;`,
        memoryMnemonic: 'In a FULL JOIN, ALWAYS project \`COALESCE(a.key, b.key)\` to never lose identity!'
      }
    },
    {
      id: 'trap_join_05_self_join_aliases',
      category: 'joins',
      trapKey: 'SELF JOIN',
      trapTitle: 'Self-Join Alias & Circular Identity Trap',
      severity: 'MEDIUM',
      frequency: '⭐ 88% Hierarchy & Trees',
      summary: 'Omitting distinct table aliases or matching rows against themselves in hierarchical comparisons.',
      scenario: 'Find all employees who earn more than their direct manager.',
      flawedCode: `SELECT e.emp_name
FROM employees e
INNER JOIN employees m ON e.emp_id = m.manager_id
WHERE e.salary > m.salary;`,
      revealedAnalysis: {
        fatalFlaw: 'The predicate \`e.emp_id = m.manager_id\` joins an employee to their *subordinates*, not their manager! To find the employee\'s manager, the condition must match the employee\'s manager_id to the manager\'s emp_id (\`e.manager_id = m.emp_id\`).',
        businessImpact: 'Completely inverts the organizational hierarchy; reports managers earning more than reports instead of vice versa.',
        correctCode: `SELECT e.emp_name AS employee_name,
       e.salary AS employee_salary,
       m.emp_name AS manager_name,
       m.salary AS manager_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;`,
        memoryMnemonic: 'In Self-Joins, name your aliases by role (\`e\` = employee, \`m\` = manager) and join child foreign key to parent primary key.'
      }
    },
    {
      id: 'trap_join_06_non_equi_unbounded',
      category: 'joins',
      trapKey: 'NON-EQUI',
      trapTitle: 'Unbounded Non-Equi Range Explosion',
      severity: 'HIGH',
      frequency: '⭐ 82% Temporal & Billing Audits',
      summary: 'Joining with open-ended inequalities produces runaway row growth and memory exhaustion.',
      scenario: 'Assigning transactions to tiered fee schedules based on transaction dollar volume.',
      flawedCode: `SELECT t.tx_id, t.amount, f.fee_pct
FROM transactions t
INNER JOIN fee_tiers f ON t.amount >= f.min_amount;`,
      revealedAnalysis: {
        fatalFlaw: 'If a transaction of $50,000 matches tier 1 ($0+), tier 2 ($10k+), and tier 3 ($25k+), it joins against ALL THREE tiers simultaneously, duplicating the transaction 3 times!',
        businessImpact: 'Billing calculates multiple fees for a single transaction or overbills clients.',
        correctCode: `SELECT t.tx_id, t.amount, f.fee_pct
FROM transactions t
INNER JOIN fee_tiers f 
  ON t.amount >= f.min_amount 
 AND (t.amount < f.max_amount OR f.max_amount IS NULL);`,
        memoryMnemonic: 'Non-equi range joins must always have closed upper AND lower boundaries.'
      }
    },

    // =========================================================================
    // 2. WINDOW FUNCTIONS TRAPS
    // =========================================================================
    {
      id: 'trap_window_01_range_vs_rows',
      category: 'window',
      trapKey: 'RANGE BETWEEN',
      trapTitle: 'Logical RANGE vs Physical ROWS Trap',
      severity: 'CRITICAL',
      frequency: '⭐ 96% Financial Calculations',
      summary: 'Default window framing uses RANGE, which silently bundles duplicate peer values together.',
      scenario: 'Compute a running cumulative sum of daily sales revenue ordered by sale date.',
      flawedCode: `SELECT sale_date, revenue,
       SUM(revenue) OVER (ORDER BY sale_date) AS running_total
FROM daily_sales;`,
      revealedAnalysis: {
        fatalFlaw: '\`ORDER BY col\` defaults to \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`. If multiple rows share the same \`sale_date\`, \`RANGE\` evaluates all peer rows at once, giving them all the final jump sum instead of a step-by-step running total!',
        businessImpact: 'Intraday cumulative charts jump erratically instead of displaying smooth progressive totals.',
        correctCode: `SELECT sale_date, revenue,
       SUM(revenue) OVER (
         ORDER BY sale_date, sale_id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM daily_sales;`,
        memoryMnemonic: 'Always specify \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` for true physical step accumulators.'
      }
    },
    {
      id: 'trap_window_02_last_value_frame',
      category: 'window',
      trapKey: 'LAST_VALUE',
      trapTitle: 'The Fatal LAST_VALUE Default Frame Trap',
      severity: 'CRITICAL',
      frequency: '⭐ 94% Technical Interviews',
      summary: 'LAST_VALUE returns the current row value unless the frame is explicitly extended to UNBOUNDED FOLLOWING.',
      scenario: 'Find the final stock price of the trading month for every row in that month.',
      flawedCode: `SELECT trade_date, ticker, close_price,
       LAST_VALUE(close_price) OVER (
         PARTITION BY ticker, DATE_TRUNC('month', trade_date)
         ORDER BY trade_date
       ) AS month_end_price
FROM stock_quotes;`,
      revealedAnalysis: {
        fatalFlaw: 'Because the default window frame stops at \`CURRENT ROW\`, \`LAST_VALUE()\` only inspects rows up to the current row, returning \`close_price\` of the current row on every single line!',
        businessImpact: 'Expected month-end closing benchmark is completely wrong; delta calculations return 0.',
        correctCode: `SELECT trade_date, ticker, close_price,
       LAST_VALUE(close_price) OVER (
         PARTITION BY ticker, DATE_TRUNC('month', trade_date)
         ORDER BY trade_date
         ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
       ) AS month_end_price
FROM stock_quotes;`,
        memoryMnemonic: '\`LAST_VALUE\` needs \`ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\` or use \`FIRST_VALUE\` with inverted \`ORDER BY DESC\`.'
      }
    },
    {
      id: 'trap_window_03_window_in_where',
      category: 'window',
      trapKey: 'WHERE ROW_NUMBER',
      trapTitle: 'Window Function in WHERE Clause Trap',
      severity: 'HIGH',
      frequency: '⭐ 99% Beginner & Intermediate Errors',
      summary: 'SQL evaluates the WHERE clause before window functions; placing ROW_NUMBER() in WHERE causes a syntax error.',
      scenario: 'Retrieve the top 3 highest-paid employees in each department.',
      flawedCode: `SELECT department_id, emp_name, salary
FROM employees
WHERE ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) <= 3;`,
      revealedAnalysis: {
        fatalFlaw: 'The relational query lifecycle evaluates \`FROM\` ➔ \`WHERE\` ➔ \`GROUP BY\` ➔ \`HAVING\` ➔ \`WINDOW / OVER\` ➔ \`SELECT\`. The window function does not exist during WHERE filtering.',
        businessImpact: 'Fatal syntax error aborts the query immediately.',
        correctCode: `WITH ranked AS (
  SELECT department_id, emp_name, salary,
         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT department_id, emp_name, salary
FROM ranked
WHERE rnk <= 3;`,
        memoryMnemonic: 'Window functions cannot live in WHERE. Wrap in a CTE or subquery first (or use \`QUALIFY\` in Snowflake/BigQuery/DuckDB).'
      }
    },
    {
      id: 'trap_window_04_dense_rank_vs_rank',
      category: 'window',
      trapKey: 'RANK vs DENSE_RANK',
      trapTitle: 'RANK Gap Assumption Trap',
      severity: 'MEDIUM',
      frequency: '⭐ 89% Leaderboards & Contests',
      summary: 'RANK() skips rank numbers after ties (1, 1, 3); DENSE_RANK() preserves unbroken sequences (1, 1, 2).',
      scenario: 'Award gold, silver, and bronze badges to the top 3 scoring players.',
      flawedCode: `WITH scored AS (
  SELECT player_id, score,
         RANK() OVER (ORDER BY score DESC) AS player_rank
  FROM leaderboard
)
SELECT player_id, score, player_rank
FROM scored
WHERE player_rank <= 3;`,
      revealedAnalysis: {
        fatalFlaw: 'If two players tie for 1st place, \`RANK()\` assigns \`1, 1, 3\` (rank 2 is skipped!). If three players tie for 1st place, \`RANK()\` assigns \`1, 1, 1, 4\` and completely skips 2nd and 3rd place, excluding the bronze runner-up!',
        businessImpact: 'Contest payouts and podium rankings produce empty runner-up categories.',
        correctCode: `WITH scored AS (
  SELECT player_id, score,
         DENSE_RANK() OVER (ORDER BY score DESC) AS player_rank
  FROM leaderboard
)
SELECT player_id, score, player_rank
FROM scored
WHERE player_rank <= 3;`,
        memoryMnemonic: 'Use \`DENSE_RANK()\` when you want top N distinct value tiers; use \`ROW_NUMBER()\` when you want strictly N rows.'
      }
    },
    {
      id: 'trap_window_05_lead_lag_partition_missing',
      category: 'window',
      trapKey: 'LAG PARTITION',
      trapTitle: 'Omitted PARTITION BY in Temporal Offsets',
      severity: 'HIGH',
      frequency: '⭐ 91% Time-Series & Device IoT',
      summary: 'Calling LAG/LEAD across sorted records without PARTITION BY leaks data across unrelated accounts.',
      scenario: 'Calculate the days elapsed between consecutive hospital admissions for each patient.',
      flawedCode: `SELECT patient_id, admission_date,
       LAG(admission_date) OVER (ORDER BY admission_date) AS prev_visit
FROM patient_admissions;`,
      revealedAnalysis: {
        fatalFlaw: 'Without \`PARTITION BY patient_id\`, \`LAG()\` picks the admission date from whichever patient happened to check in right before this patient, cross-pollinating patient histories!',
        businessImpact: 'HIPAA violation / clinical analytics show patient readmission intervals based on completely different people.',
        correctCode: `SELECT patient_id, admission_date,
       LAG(admission_date) OVER (
         PARTITION BY patient_id 
         ORDER BY admission_date
       ) AS prev_visit
FROM patient_admissions;`,
        memoryMnemonic: 'Every time-series delta requires \`PARTITION BY entity_id\` before \`ORDER BY event_time\`.'
      }
    },
    {
      id: 'trap_window_06_ntile_remainder_skew',
      category: 'window',
      trapKey: 'NTILE',
      trapTitle: 'NTILE Bucket Remainder Distribution Skew',
      severity: 'MEDIUM',
      frequency: '⭐ 80% Cohort Analytics',
      summary: 'NTILE distributes remainder rows into early buckets, making early percentiles larger than late ones.',
      scenario: 'Split 102 user accounts into 4 equal quartiles (NTILE(4)).',
      flawedCode: `SELECT user_id, engagement_score,
       NTILE(4) OVER (ORDER BY engagement_score DESC) AS quartile
FROM user_engagement;`,
      revealedAnalysis: {
        fatalFlaw: '102 divided by 4 leaves a remainder of 2. \`NTILE(4)\` adds +1 row to bucket 1 and +1 row to bucket 2 (giving bucket sizes: 26, 26, 25, 25). If strict equal-size cohorts are required, NTILE introduces asymmetric bias.',
        businessImpact: 'A/B test cohort sizing is subtly imbalanced across bucket allocations.',
        correctCode: `SELECT user_id, engagement_score,
       PERCENT_RANK() OVER (ORDER BY engagement_score) AS percentile,
       NTILE(4) OVER (ORDER BY engagement_score DESC) AS quartile
FROM user_engagement;`,
        memoryMnemonic: 'NTILE always loads remainder rows into the lowest bucket numbers first.'
      }
    },

    // =========================================================================
    // 3. SUBQUERIES & CTES TRAPS
    // =========================================================================
    {
      id: 'trap_subquery_01_not_in_null',
      category: 'subqueries',
      trapKey: 'NOT IN',
      trapTitle: 'The Fatal NOT IN with NULL Disaster',
      severity: 'CRITICAL',
      frequency: '⭐ 99% Interview & Senior Trap',
      summary: 'If a subquery inside NOT IN returns even a single NULL value, the entire query returns ZERO rows.',
      scenario: 'Find all customers who have never made a purchase.',
      flawedCode: `SELECT customer_id, name
FROM customers
WHERE customer_id NOT IN (
  SELECT customer_id FROM orders
);`,
      revealedAnalysis: {
        fatalFlaw: 'If \`orders\` contains a single row where \`customer_id IS NULL\`, the condition evaluates as \`customer_id NOT IN (1, 2, NULL)\`. In 3-Valued Logic, \`val != NULL\` is UNKNOWN! \`AND UNKNOWN\` turns the entire WHERE clause to UNKNOWN, returning 0 rows!',
        businessImpact: 'The query returns empty results, masking 10,000+ unactivated customers from marketing campaigns.',
        correctCode: `SELECT c.customer_id, c.name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);`,
        memoryMnemonic: 'Never use \`NOT IN\` with subqueries. Always use \`NOT EXISTS\` or \`LEFT JOIN ... WHERE right.id IS NULL\`!'
      }
    },
    {
      id: 'trap_subquery_02_exists_vs_count',
      category: 'subqueries',
      trapKey: 'SELECT COUNT(*)',
      trapTitle: 'EXISTS vs COUNT(*) Performance Disaster',
      severity: 'HIGH',
      frequency: '⭐ 93% Query Optimization',
      summary: 'Using (SELECT COUNT(*) FROM ...) > 0 forces a full table scan; EXISTS performs an early-exit probe.',
      scenario: 'Filter for companies that have active venture capital investments.',
      flawedCode: `SELECT company_id, company_name
FROM companies c
WHERE (
  SELECT COUNT(*) FROM investments i WHERE i.company_id = c.company_id
) > 0;`,
      revealedAnalysis: {
        fatalFlaw: '\`COUNT(*)\` must scan and count every single investment record for every company. On 10,000,000 investments, this takes minutes. \`EXISTS\` halts index scanning immediately upon finding the very first matching row!',
        businessImpact: 'Query runtime spikes from 15 milliseconds to 45 seconds, pegging database CPU.',
        correctCode: `SELECT c.company_id, c.company_name
FROM companies c
WHERE EXISTS (
  SELECT 1 FROM investments i WHERE i.company_id = c.company_id
);`,
        memoryMnemonic: 'For existence checks, always use \`EXISTS (SELECT 1 ...)\`. Never count rows just to check if records exist!'
      }
    },
    {
      id: 'trap_subquery_03_scalar_multi_row',
      category: 'subqueries',
      trapKey: 'SCALAR SUBQUERY',
      trapTitle: 'Scalar Subquery Returning Multiple Rows Crash',
      severity: 'HIGH',
      frequency: '⭐ 90% Production Runtime Failure',
      summary: 'A subquery in a SELECT list or comparison must return strictly 1 row; returning 2+ rows aborts the query.',
      scenario: 'Display each department alongside its manager name.',
      flawedCode: `SELECT d.department_id, d.department_name,
       (SELECT e.emp_name FROM employees e WHERE e.department_id = d.department_id AND e.is_manager = TRUE) AS mgr_name
FROM departments d;`,
      revealedAnalysis: {
        fatalFlaw: 'If a department accidentally has two co-managers flagged with \`is_manager = TRUE\`, the scalar subquery returns 2 rows. Relational engines throw: \`Subquery returns more than 1 row\` and abort!',
        businessImpact: 'A dirty row in the database takes down an entire executive dashboard.',
        correctCode: `SELECT d.department_id, d.department_name, e.emp_name AS mgr_name
FROM departments d
LEFT JOIN employees e 
  ON d.department_id = e.department_id 
 AND e.is_manager = TRUE;`,
        memoryMnemonic: 'Never use scalar subqueries in SELECT for 1:N relations. Use explicit \`LEFT JOIN\`.'
      }
    },
    {
      id: 'trap_subquery_04_recursive_runaway_loop',
      category: 'subqueries',
      trapKey: 'WITH RECURSIVE',
      trapTitle: 'Infinite Recursive CTE Execution Loop',
      severity: 'CRITICAL',
      frequency: '⭐ 85% Graph & Tree Traversals',
      summary: 'Recursive CTEs without loop detection or termination guards enter infinite loops on cyclic data.',
      scenario: 'Traverse an organizational hierarchy from CEO down to junior staff.',
      flawedCode: `WITH RECURSIVE org_chart AS (
  SELECT emp_id, manager_id, 1 AS depth
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.manager_id, o.depth + 1
  FROM employees e
  INNER JOIN org_chart o ON e.manager_id = o.emp_id
)
SELECT * FROM org_chart;`,
      revealedAnalysis: {
        fatalFlaw: 'If dirty data creates a circular cycle (A manages B, and B manages A), the recursive member runs forever until database memory exhausts or max recursion limit halts the query.',
        businessImpact: 'Exhausts temp storage, triggers database crash, or halts transaction with recursion limit exceeded.',
        correctCode: `WITH RECURSIVE org_chart AS (
  SELECT emp_id, manager_id, 1 AS depth, CAST(emp_id AS VARCHAR(1000)) AS path
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.manager_id, o.depth + 1, CONCAT(o.path, '->', e.emp_id)
  FROM employees e
  INNER JOIN org_chart o ON e.manager_id = o.emp_id
  WHERE o.depth < 20 AND INSTR(o.path, CAST(e.emp_id AS VARCHAR(50))) = 0
)
SELECT * FROM org_chart;`,
        memoryMnemonic: 'In recursive CTEs, always guard with \`depth < max_limit\` or track the visited path to prevent cycles.'
      }
    },
    {
      id: 'trap_subquery_05_cte_materialization_fence',
      category: 'subqueries',
      trapKey: 'CTE MATERIALIZATION',
      trapTitle: 'CTE Optimization Fence Barrier Trap',
      severity: 'MEDIUM',
      frequency: '⭐ 82% PostgreSQL & Redshift',
      summary: 'In PostgreSQL < 12 (or with MATERIALIZED), CTEs act as optimization fences that block predicate pushdown.',
      scenario: 'Filter a 10-million row transactions CTE for just one account in the outer query.',
      flawedCode: `WITH raw_events AS (
  SELECT * FROM transactions
)
SELECT * FROM raw_events WHERE account_id = 'ACC-9941';`,
      revealedAnalysis: {
        fatalFlaw: 'If materialized as a fence, the engine scans all 10M rows into a temporary buffer first, and only then applies \`WHERE account_id = ...\`, ignoring available indexes on \`account_id\`!',
        businessImpact: 'Query takes 30 seconds instead of 2 milliseconds because the WHERE predicate was not pushed down into the base scan.',
        correctCode: `WITH raw_events AS (
  SELECT * FROM transactions WHERE account_id = 'ACC-9941'
)
SELECT * FROM raw_events;`,
        memoryMnemonic: 'Filter as early and deeply as possible inside CTEs; never rely on outer queries to push down predicates.'
      }
    },
    {
      id: 'trap_subquery_06_union_vs_union_all_cte',
      category: 'subqueries',
      trapKey: 'UNION',
      trapTitle: 'Expensive UNION Deduplication Inside CTE Pipelines',
      severity: 'MEDIUM',
      frequency: '⭐ 87% Data Pipelines & ETL',
      summary: 'Using UNION instead of UNION ALL in intermediate CTE steps forces massive unnecessary memory sorts.',
      scenario: 'Consolidate online and retail store orders in a preliminary data prep step.',
      flawedCode: `WITH all_orders AS (
  SELECT order_id, customer_id, order_total FROM online_orders
  UNION
  SELECT order_id, customer_id, order_total FROM store_orders
)
SELECT customer_id, SUM(order_total) FROM all_orders GROUP BY customer_id;`,
      revealedAnalysis: {
        fatalFlaw: '\`UNION\` forces the database engine to perform a full-table disk sort to detect and remove duplicate rows across millions of records, even when order IDs are already guaranteed unique.',
        businessImpact: 'Consumes gigabytes of temp space and increases pipeline runtimes by 5×.',
        correctCode: `WITH all_orders AS (
  SELECT order_id, customer_id, order_total FROM online_orders
  UNION ALL
  SELECT order_id, customer_id, order_total FROM store_orders
)
SELECT customer_id, SUM(order_total) FROM all_orders GROUP BY customer_id;`,
        memoryMnemonic: 'Default to \`UNION ALL\`. Only use \`UNION\` when duplicate elimination is an explicit business requirement.'
      }
    },

    // =========================================================================
    // 4. AGGREGATIONS & GROUP BY TRAPS
    // =========================================================================
    {
      id: 'trap_aggs_01_where_vs_having',
      category: 'aggregates',
      trapKey: 'WHERE COUNT',
      trapTitle: 'Aggregate in WHERE Clause Trap',
      severity: 'CRITICAL',
      frequency: '⭐ 100% Core SQL Law',
      summary: 'WHERE filters rows BEFORE grouping; HAVING filters aggregated groups AFTER GROUP BY.',
      scenario: 'Find all product categories with more than 50 total sales.',
      flawedCode: `SELECT category_id, COUNT(*) AS sales_count
FROM sales
WHERE COUNT(*) > 50
GROUP BY category_id;`,
      revealedAnalysis: {
        fatalFlaw: 'The WHERE clause operates on raw rows before any grouping or summary calculation occurs. SQL engines throw: \`Invalid use of group function\`.',
        businessImpact: 'Immediate query failure.',
        correctCode: `SELECT category_id, COUNT(*) AS sales_count
FROM sales
GROUP BY category_id
HAVING COUNT(*) > 50;`,
        memoryMnemonic: 'Raw row filters go in \`WHERE\`; group summary filters go in \`HAVING\`.'
      }
    },
    {
      id: 'trap_aggs_02_count_star_vs_col',
      category: 'aggregates',
      trapKey: 'COUNT(col)',
      trapTitle: 'COUNT(*) vs COUNT(column) NULL Blindness',
      severity: 'HIGH',
      frequency: '⭐ 95% Analytics & QA Audits',
      summary: 'COUNT(*) counts every physical row; COUNT(column) silently ignores rows where column is NULL.',
      scenario: 'Audit the total number of survey respondents who received an invite.',
      flawedCode: `SELECT COUNT(feedback_comment) AS total_respondents
FROM survey_responses;`,
      revealedAnalysis: {
        fatalFlaw: 'If 1,000 people took the survey, but only 120 left an optional written comment (\`feedback_comment\`), \`COUNT(feedback_comment)\` returns 120, undercounting respondents by 88%!',
        businessImpact: 'Survey response rate reports and churn feedback metrics are drastically distorted.',
        correctCode: `SELECT COUNT(*) AS total_respondents,
       COUNT(feedback_comment) AS respondents_with_comments
FROM survey_responses;`,
        memoryMnemonic: '\`COUNT(*)\` counts rows; \`COUNT(col)\` counts non-NULL values in that column.'
      }
    },
    {
      id: 'trap_aggs_03_sum_null_propagation',
      category: 'aggregates',
      trapKey: 'SUM NULL',
      trapTitle: 'Arithmetic NULL Propagation in Aggregates',
      severity: 'HIGH',
      frequency: '⭐ 92% Financial Accounting',
      summary: 'In SQL arithmetic expressions (col1 + col2), if any column is NULL, the entire result becomes NULL.',
      scenario: 'Calculate total compensation by adding base salary and quarterly commission.',
      flawedCode: `SELECT department_id,
       SUM(base_salary + commission) AS total_payroll
FROM employees
GROUP BY department_id;`,
      revealedAnalysis: {
        fatalFlaw: 'For salaried engineers with \`commission IS NULL\`, \`base_salary + NULL\` evaluates to \`NULL\`! \`SUM()\` then ignores that employee\'s base salary entirely!',
        businessImpact: 'Payroll reports understate company expenses by millions because non-commissioned staff have their salary zeroed out.',
        correctCode: `SELECT department_id,
       SUM(base_salary + COALESCE(commission, 0)) AS total_payroll
FROM employees
GROUP BY department_id;`,
        memoryMnemonic: 'Wrap optional arithmetic terms in \`COALESCE(col, 0)\` before adding or multiplying.'
      }
    },
    {
      id: 'trap_aggs_04_division_by_zero',
      category: 'aggregates',
      trapKey: 'DIVISION BY ZERO',
      trapTitle: 'Catastrophic Division by Zero Crash',
      severity: 'CRITICAL',
      frequency: '⭐ 96% Production Downtime',
      summary: 'Dividing by zero causes transaction rollbacks in PostgreSQL/SQL Server or unexpected NULLs in MySQL.',
      scenario: 'Calculate the conversion rate of website visits into paid signups.',
      flawedCode: `SELECT campaign_id,
       (SUM(signups) * 100.0) / SUM(visits) AS conversion_rate_pct
FROM campaign_traffic
GROUP BY campaign_id;`,
      revealedAnalysis: {
        fatalFlaw: 'On newly launched campaigns with 0 visits, \`SUM(visits)\` is 0. Division by 0 crashes the entire report transaction in PostgreSQL/Redshift (\`ERROR: division by zero\`).',
        businessImpact: 'Nightly automated BI dashboards fail to refresh, waking up on-call engineers.',
        correctCode: `SELECT campaign_id,
       (SUM(signups) * 100.0) / NULLIF(SUM(visits), 0) AS conversion_rate_pct
FROM campaign_traffic
GROUP BY campaign_id;`,
        memoryMnemonic: 'Always wrap divisors in \`NULLIF(divisor, 0)\`. A NULL result is safe; division by zero crashes.'
      }
    },
    {
      id: 'trap_aggs_05_conditional_pivot_else_null',
      category: 'aggregates',
      trapKey: 'ELSE NULL',
      trapTitle: 'Forgotten ELSE 0 in Pivot Aggregation',
      severity: 'MEDIUM',
      frequency: '⭐ 89% Reporting & Matrix Pivots',
      summary: 'Omitting ELSE 0 in conditional CASE aggregates produces NULL sums for inactive categories.',
      scenario: 'Pivot order totals into online and offline sales columns.',
      flawedCode: `SELECT sales_rep_id,
       SUM(CASE WHEN channel = 'ONLINE' THEN amount END) AS online_sales,
       SUM(CASE WHEN channel = 'RETAIL' THEN amount END) AS retail_sales
FROM sales
GROUP BY sales_rep_id;`,
      revealedAnalysis: {
        fatalFlaw: 'When CASE has no matching rows and no ELSE clause, it returns \`NULL\`. \`SUM()\` of all NULLs evaluates to \`NULL\`, displaying ugly blanks on dashboards instead of \`$0.00\`.',
        businessImpact: 'Downstream calculations that add \`online_sales + retail_sales\` evaluate to NULL if either is NULL.',
        correctCode: `SELECT sales_rep_id,
       COALESCE(SUM(CASE WHEN channel = 'ONLINE' THEN amount END), 0) AS online_sales,
       COALESCE(SUM(CASE WHEN channel = 'RETAIL' THEN amount END), 0) AS retail_sales
FROM sales
GROUP BY sales_rep_id;`,
        memoryMnemonic: 'Always wrap conditional \`SUM(CASE ...)\` in \`COALESCE(..., 0)\` for clean numeric pivots.'
      }
    },
    {
      id: 'trap_aggs_06_non_aggregated_select',
      category: 'aggregates',
      trapKey: 'ONLY_FULL_GROUP_BY',
      trapTitle: 'Non-Aggregated Column Projection Trap',
      severity: 'HIGH',
      frequency: '⭐ 94% MySQL 5.7 vs 8.0 & ANSI SQL',
      summary: 'Selecting columns not present in GROUP BY without an aggregate function causes indeterminate data.',
      scenario: 'Find the top customer by total spend and output their address.',
      flawedCode: `SELECT customer_id, customer_address, SUM(order_total) AS total_spent
FROM orders
GROUP BY customer_id;`,
      revealedAnalysis: {
        fatalFlaw: 'In ANSI SQL and modern MySQL (\`ONLY_FULL_GROUP_BY\`), this fails with a syntax error. If disabled, the database returns an arbitrary, random address from any row in that customer\'s order history!',
        businessImpact: 'Deliveries sent to wrong historical addresses due to non-deterministic group column sampling.',
        correctCode: `SELECT customer_id, 
       MAX(customer_address) AS customer_address, 
       SUM(order_total) AS total_spent
FROM orders
GROUP BY customer_id;`,
        memoryMnemonic: 'Every column in SELECT must either appear in \`GROUP BY\` or be wrapped in an aggregate function.'
      }
    },

    // =========================================================================
    // 5. 3-VALUED LOGIC & DATA TYPES TRAPS
    // =========================================================================
    {
      id: 'trap_logic_01_equals_null',
      category: 'logic_nulls',
      trapKey: '= NULL',
      trapTitle: 'The \`= NULL\` Three-Valued Logic Trap',
      severity: 'CRITICAL',
      frequency: '⭐ 100% Core SQL Law',
      summary: 'In SQL, \`col = NULL\` evaluates to UNKNOWN (neither TRUE nor FALSE); rows are never returned.',
      scenario: 'Find all bank accounts where the KYC verification date is missing.',
      flawedCode: `SELECT account_id, customer_name
FROM accounts
WHERE kyc_verified_at = NULL;`,
      revealedAnalysis: {
        fatalFlaw: 'NULL represents an unknown state, not a concrete value. Comparing anything to NULL via \`=\` yields \`UNKNOWN\`. In a WHERE clause, only \`TRUE\` passes; \`UNKNOWN\` is discarded!',
        businessImpact: 'The compliance audit finds 0 unverified accounts, masking thousands of un-KYCed users from regulatory scrutiny.',
        correctCode: `SELECT account_id, customer_name
FROM accounts
WHERE kyc_verified_at IS NULL;`,
        memoryMnemonic: 'Never write \`= NULL\` or \`!= NULL\`. Always use \`IS NULL\` or \`IS NOT NULL\`.'
      }
    },
    {
      id: 'trap_logic_02_not_equals_drops_nulls',
      category: 'logic_nulls',
      trapKey: '!= DROPS NULLS',
      trapTitle: 'Negation Filtering Silently Drops NULL Records',
      severity: 'CRITICAL',
      frequency: '⭐ 97% Production Bug Rate',
      summary: 'Filtering \`WHERE status != "FRAUD"\` drops fraud accounts AND silently drops accounts where status IS NULL.',
      scenario: 'Select all users who are not banned to receive a promotional email.',
      flawedCode: `SELECT user_id, email, account_status
FROM users
WHERE account_status != 'BANNED';`,
      revealedAnalysis: {
        fatalFlaw: 'For newly registered users whose \`account_status\` is NULL, \`NULL != "BANNED"\` evaluates to UNKNOWN! The WHERE filter discards them, preventing new users from receiving emails.',
        businessImpact: 'New signups never receive onboarding emails, destroying day-1 user activation.',
        correctCode: `SELECT user_id, email, account_status
FROM users
WHERE account_status != 'BANNED' OR account_status IS NULL;`,
        memoryMnemonic: 'Negation filters (\`!=\`, \`<>\`) discard NULLs! Explicitly add \`OR col IS NULL\` or use \`COALESCE\`.'
      }
    },
    {
      id: 'trap_logic_03_float_rounding_drift',
      category: 'logic_nulls',
      trapKey: 'FLOAT ROUNDING',
      trapTitle: 'FLOAT / DOUBLE Floating-Point Precision Drift Trap',
      severity: 'HIGH',
      frequency: '⭐ 90% Fintech & Ledgers',
      summary: 'Using FLOAT or DOUBLE for monetary values causes binary IEEE 754 precision drift ($0.01 discrepancies).',
      scenario: 'Calculate the total fee revenue across 1,000,000 micropayments.',
      flawedCode: `CREATE TABLE payments (
  payment_id INT PRIMARY KEY,
  amount FLOAT NOT NULL
);`,
      revealedAnalysis: {
        fatalFlaw: 'Binary floating-point types cannot represent base-10 fractional decimals like \`0.10\` or \`0.05\` exactly. After summing a million transactions, rounding errors accumulate into dollar discrepancies.',
        businessImpact: 'The general ledger fails internal audit reconciliation by fractions of a cent every single night.',
        correctCode: `CREATE TABLE payments (
  payment_id INT PRIMARY KEY,
  amount DECIMAL(18, 4) NOT NULL
);`,
        memoryMnemonic: 'Never store money in \`FLOAT\` or \`DOUBLE\`. Always use \`DECIMAL\` or \`NUMERIC\`.'
      }
    },
    {
      id: 'trap_logic_04_check_constraint_3vl',
      category: 'logic_nulls',
      trapKey: 'CHECK 3VL',
      trapTitle: 'CHECK Constraint Three-Valued Logic NULL Pass Trap',
      severity: 'HIGH',
      frequency: '⭐ 84% Database Architecture & DDL',
      summary: 'CHECK constraints pass if the condition evaluates to TRUE OR NULL; checking without NOT NULL allows invalid data.',
      scenario: 'Ensure all bank accounts have an account balance of at least $0.',
      flawedCode: `CREATE TABLE bank_accounts (
  account_id INT PRIMARY KEY,
  balance NUMERIC(15, 2) CHECK (balance >= 0)
);`,
      revealedAnalysis: {
        fatalFlaw: 'If an application inserts \`balance = NULL\`, the check \`NULL >= 0\` evaluates to UNKNOWN! In SQL DDL, CHECK constraints only reject \`FALSE\`; they accept \`TRUE\` and \`UNKNOWN\`!',
        businessImpact: 'Corrupted records with NULL balances bypass the integrity check and land in production.',
        correctCode: `CREATE TABLE bank_accounts (
  account_id INT PRIMARY KEY,
  balance NUMERIC(15, 2) NOT NULL CHECK (balance >= 0)
);`,
        memoryMnemonic: 'CHECK constraints pass on NULL! Always pair CHECK constraints with \`NOT NULL\`.'
      }
    },
    {
      id: 'trap_logic_05_case_evaluation_order',
      category: 'logic_nulls',
      trapKey: 'CASE PRECEDENCE',
      trapTitle: 'CASE Expression First-Match Precedence Trap',
      severity: 'HIGH',
      frequency: '⭐ 88% Business Classification',
      summary: 'CASE evaluates top-to-bottom and exits on the first true branch; overlapping broader conditions swallow narrower ones.',
      scenario: 'Classify customer credit scores into VIP (>800), Good (>700), and Fair (>600).',
      flawedCode: `SELECT customer_id, credit_score,
       CASE 
         WHEN credit_score >= 600 THEN 'Fair'
         WHEN credit_score >= 700 THEN 'Good'
         WHEN credit_score >= 800 THEN 'VIP'
         ELSE 'Poor'
       END AS credit_tier
FROM customers;`,
      revealedAnalysis: {
        fatalFlaw: 'For a customer with an 820 credit score, \`credit_score >= 600\` matches FIRST! The engine returns \`Fair\` and exits, never reaching the \`VIP\` branch!',
        businessImpact: 'High-net-worth VIP clients are assigned low-tier credit limits.',
        correctCode: `SELECT customer_id, credit_score,
       CASE 
         WHEN credit_score >= 800 THEN 'VIP'
         WHEN credit_score >= 700 THEN 'Good'
         WHEN credit_score >= 600 THEN 'Fair'
         ELSE 'Poor'
       END AS credit_tier
FROM customers;`,
        memoryMnemonic: 'Order numeric CASE thresholds from most restrictive (highest) to least restrictive (lowest).'
      }
    },
    {
      id: 'trap_logic_06_implicit_type_coercion_index',
      category: 'logic_nulls',
      trapKey: 'TYPE COERCION',
      trapTitle: 'Implicit Type Coercion Index Suppression',
      severity: 'HIGH',
      frequency: '⭐ 91% Query Optimization & DBAs',
      summary: 'Comparing a string column to an integer literal forces the engine to cast every row, invalidating indexes.',
      scenario: 'Look up a user by their phone number or national ID stored as VARCHAR.',
      flawedCode: `SELECT user_id, full_name
FROM users
WHERE national_id = 123456789; -- national_id is VARCHAR!`,
      revealedAnalysis: {
        fatalFlaw: 'Because the constant is an integer, SQL casts the column on every row: \`WHERE CAST(national_id AS SIGNED) = 123456789\`. Applying functions to indexed columns disables B-Tree index seeks, causing a full table scan!',
        businessImpact: 'Index is ignored; user lookup spikes from 1ms to 2,500ms under load.',
        correctCode: `SELECT user_id, full_name
FROM users
WHERE national_id = '123456789'; -- Match string to string!`,
        memoryMnemonic: 'Always match literal data types to column types. Never compare strings to numbers without quotes.'
      }
    },

    // =========================================================================
    // 6. SET OPERATIONS TRAPS
    // =========================================================================
    {
      id: 'trap_set_01_except_non_commutative',
      category: 'set_operations',
      trapKey: 'EXCEPT NON-COMMUTATIVE',
      trapTitle: 'Non-Commutative Set Difference Trap (A EXCEPT B ≠ B EXCEPT A)',
      severity: 'CRITICAL',
      frequency: '⭐ 96% Data Reconciliation',
      summary: 'Unlike UNION and INTERSECT, EXCEPT is order-dependent; swapping queries inverts your reconciliation.',
      scenario: 'Find all accounts present in our internal ledger that are missing from the bank feed.',
      flawedCode: `-- Goal: Find accounts in ledger missing from bank feed
SELECT account_id FROM bank_feed
EXCEPT
SELECT account_id FROM internal_ledger;`,
      revealedAnalysis: {
        fatalFlaw: '\`bank_feed EXCEPT internal_ledger\` returns records that exist in the bank feed but are missing from internal books! The reconciliation direction was inverted.',
        businessImpact: 'The audit claims ledger accounts are missing when in reality bank accounts are missing, producing an inverted audit report.',
        correctCode: `-- Correct: Accounts in ledger that are NOT in bank feed
SELECT account_id FROM internal_ledger
EXCEPT
SELECT account_id FROM bank_feed;`,
        memoryMnemonic: '\`A EXCEPT B\` means "In A, but NOT in B". Order matters!'
      }
    },
    {
      id: 'trap_set_02_second_select_aliases_ignored',
      category: 'set_operations',
      trapKey: 'SECONDARY ALIAS IGNORED',
      trapTitle: 'Secondary Query Column Alias Silencing Trap',
      severity: 'MEDIUM',
      frequency: '⭐ 85% Code Readability',
      summary: 'In compound set queries, column aliases in the second query are completely ignored by the engine.',
      scenario: 'Combine vendor payables and employee reimbursements with descriptive column names.',
      flawedCode: `SELECT vendor_id, amount AS vendor_payment_usd FROM vendor_invoices
UNION ALL
SELECT emp_id, expense_amount AS reimbursement_usd FROM employee_expenses;`,
      revealedAnalysis: {
        fatalFlaw: 'The output column name is determined 100% by the FIRST SELECT statement (\`vendor_payment_usd\`). The alias \`reimbursement_usd\` in the second statement is completely discarded!',
        businessImpact: 'Downstream report parsers or front-end consumers expecting \`reimbursement_usd\` fail.',
        correctCode: `SELECT vendor_id AS payee_id, amount AS total_disbursed_usd, 'VENDOR' AS payee_type
FROM vendor_invoices
UNION ALL
SELECT emp_id AS payee_id, expense_amount AS total_disbursed_usd, 'EMPLOYEE' AS payee_type
FROM employee_expenses;`,
        memoryMnemonic: 'Output column names in UNION/EXCEPT are governed solely by the FIRST query in the stack.'
      }
    },
    {
      id: 'trap_set_03_positional_type_alignment',
      category: 'set_operations',
      trapKey: 'COLUMN COUNT MISMATCH',
      trapTitle: 'Positional Column Type Mismatch Trap',
      severity: 'HIGH',
      frequency: '⭐ 90% Data Migration & Harmonization',
      summary: 'Set operators match columns strictly by positional index (1st to 1st, 2nd to 2nd), NOT by column name.',
      scenario: 'Combine archive database records with active records having different column orders.',
      flawedCode: `SELECT user_id, email, signup_date FROM active_users
UNION ALL
SELECT signup_date, user_id, email FROM archived_users;`,
      revealedAnalysis: {
        fatalFlaw: 'The engine attempts to union column 1 (\`user_id\` INT) with column 1 of the second query (\`signup_date\` DATE). This either throws an incompatible type cast error or corrupts the output table!',
        businessImpact: 'Fatal type cast aborts pipeline, or timestamps land in user_id fields.',
        correctCode: `SELECT user_id, email, signup_date FROM active_users
UNION ALL
SELECT user_id, email, signup_date FROM archived_users;`,
        memoryMnemonic: 'Set operations align columns by POSITION, never by name. Verify exact column-by-column order.'
      }
    },
    {
      id: 'trap_set_04_intersect_null_equality',
      category: 'set_operations',
      trapKey: 'INTERSECT NULLS',
      trapTitle: 'INTERSECT Treats NULLs as Identical Values',
      severity: 'MEDIUM',
      frequency: '⭐ 82% Advanced Relational Algebra',
      summary: 'In standard joins, NULL != NULL. In set operations (INTERSECT/EXCEPT), NULLs ARE treated as matching peers!',
      scenario: 'Find shared middle names between two customer lists.',
      flawedCode: `SELECT middle_name FROM customers_us
INTERSECT
SELECT middle_name FROM customers_eu;`,
      revealedAnalysis: {
        fatalFlaw: 'If customers in both tables have \`NULL\` middle names, \`INTERSECT\` considers \`NULL\` equal to \`NULL\` and outputs a row with \`NULL\`! Unlike \`ON a.middle_name = b.middle_name\` (which drops NULLs), set operations match NULLs.',
        businessImpact: 'Audit flags NULLs as matching positive attributes across datasets.',
        correctCode: `SELECT middle_name FROM customers_us WHERE middle_name IS NOT NULL
INTERSECT
SELECT middle_name FROM customers_eu WHERE middle_name IS NOT NULL;`,
        memoryMnemonic: 'Set operators (UNION, INTERSECT, EXCEPT) treat NULLs as equal to each other.'
      }
    },
    {
      id: 'trap_set_05_compound_precedence_parentheses',
      category: 'set_operations',
      trapKey: 'SET PRECEDENCE',
      trapTitle: 'Compound Set Operator Precedence Without Parentheses',
      severity: 'HIGH',
      frequency: '⭐ 88% Complex Data Cleansing',
      summary: 'INTERSECT has higher precedence than UNION and EXCEPT; omitting parentheses causes unexpected evaluation order.',
      scenario: 'Combine table A and B, then remove records present in table C: (A UNION B) EXCEPT C.',
      flawedCode: `SELECT id FROM table_a
UNION
SELECT id FROM table_b
INTERSECT
SELECT id FROM table_c;`,
      revealedAnalysis: {
        fatalFlaw: 'Because \`INTERSECT\` has higher precedence than \`UNION\`, SQL evaluates \`(B INTERSECT C)\` first, and then unions the result with \`A\`! The expression \`A UNION (B INTERSECT C)\` does NOT perform \`(A UNION B) INTERSECT C\`!',
        businessImpact: 'The final dataset includes records from Table A that should have been eliminated by the intersection filter.',
        correctCode: `(SELECT id FROM table_a
 UNION
 SELECT id FROM table_b)
INTERSECT
SELECT id FROM table_c;`,
        memoryMnemonic: 'Always use parentheses \`( ... )\` to make compound set operation order explicit.'
      }
    },
    {
      id: 'trap_set_06_union_vs_union_all_reconciliation',
      category: 'set_operations',
      trapKey: 'UNION DEDUP BREAK',
      trapTitle: 'UNION Deduplication Breaking Duplicate Reconciliation',
      severity: 'HIGH',
      frequency: '⭐ 93% Financial Ledger Auditing',
      summary: 'UNION collapses duplicate records into a single row, hiding multi-billing breaks in reconciliation audits.',
      scenario: 'Detect transaction breaks between bank payments and order settlements.',
      flawedCode: `SELECT tx_id, amount FROM bank_txns
UNION
SELECT tx_id, amount FROM order_txns;`,
      revealedAnalysis: {
        fatalFlaw: 'If an error charged a customer twice ($50 and $50 with same tx_id), \`UNION\` collapses both records into a single \`$50\` row! The audit reports only 1 transaction and fails to catch duplicate double-charges.',
        businessImpact: 'Double-billing accounting anomalies remain hidden from compliance auditors.',
        correctCode: `SELECT tx_id, amount, 'BANK' AS source, COUNT(*) AS occurrences
FROM bank_txns GROUP BY tx_id, amount
UNION ALL
SELECT tx_id, amount, 'ORDERS' AS source, COUNT(*) AS occurrences
FROM order_txns GROUP BY tx_id, amount;`,
        memoryMnemonic: 'Never use plain \`UNION\` in reconciliation audits. Always preserve exact multiplicities with \`UNION ALL\`.'
      }
    }
  ];

  window.TRAP_CATEGORIES = TRAP_CATEGORIES;
  window.MASTER_TRAP_FLASHCARDS = MASTER_TRAP_FLASHCARDS;

})(window);
