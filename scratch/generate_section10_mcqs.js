// =============================================================================
// GENERATOR: 150 SECTION 10 MASTER MCQS (Subqueries, CTEs, Recursion, Set Ops)
// 15 in-depth technical questions x 10 topics = 150 MCQs
// Strictly balanced 25% option distribution (A: 37, B: 38, C: 37, D: 38 or exact 25%)
// =============================================================================

const fs = require('fs');
const path = require('path');

const mcqs = [];
let idCounter = 1;

function addMCQ(topic, keyword, tag, question, options, originalCorrectIdx, explanation) {
  const targetCorrectIdx = mcqs.length % 4;
  const newOptions = [...options];
  const origIdx = (originalCorrectIdx !== undefined) ? originalCorrectIdx : 0;
  
  if (origIdx !== targetCorrectIdx) {
    const temp = newOptions[targetCorrectIdx];
    newOptions[targetCorrectIdx] = newOptions[origIdx];
    newOptions[origIdx] = temp;
  }

  mcqs.push({
    id: `mcq_sec10_${idCounter++}`,
    topic: topic,
    keyword: keyword,
    tag: tag,
    question: question,
    options: newOptions,
    correctIndex: targetCorrectIdx,
    explanation: explanation
  });
}

console.log("Generating 150 Section 10 Master MCQs...");

// =============================================================================
// 1. SCALAR & COLUMNAR SUBQUERIES (15 MCQs)
// =============================================================================
const topic1Questions = [
  {
    q: "Under standard ANSI SQL, what is the mandatory runtime requirement for a subquery placed in the SELECT projection list?",
    o: ["It must return exactly one row and at most two columns", "It must return strictly a scalar value (at most one row and one column), or evaluate to NULL if zero rows are found", "It must be joined using an explicit LATERAL keyword", "It must include a GROUP BY clause to aggregate outer tuples"],
    c: 1,
    e: "A scalar subquery in a SELECT list or WHERE comparison must return strictly 1 row and 1 column. If it returns > 1 row, a cardinality violation is thrown (e.g., MySQL Error 1242). If 0 rows return, it evaluates to NULL."
  },
  {
    q: "If a scalar subquery in a WHERE clause comparison 'salary > (SELECT avg_salary FROM ...)' returns zero rows at runtime, what does the comparison evaluate to?",
    o: ["TRUE because empty sets evaluate to zero", "FALSE immediately without evaluating the predicate", "UNKNOWN because a zero-row scalar subquery produces a relational NULL", "A fatal runtime exception: EmptySubqueryException"],
    c: 2,
    e: "When a scalar subquery returns 0 rows, ANSI SQL dictates that its value is NULL. Any scalar comparison with NULL evaluates to UNKNOWN under Three-Valued Logic (3VL)."
  },
  {
    q: "What is the key functional difference between 'col > ALL (subquery)' and 'col > ANY (subquery)'?",
    o: ["ALL requires col to be greater than the maximum value in the subquery; ANY requires col to be greater than the minimum value", "ALL requires at least one row to match; ANY requires all rows to match", "ALL evaluates to TRUE if the subquery is empty; ANY throws an error on empty sets", "ALL performs an index scan; ANY performs a full table scan"],
    c: 0,
    e: "col > ALL(set) means col must exceed every single value in the set (i.e. col > MAX(set)). col > ANY(set) means col must exceed at least one value (i.e. col > MIN(set))."
  },
  {
    q: "In MySQL and ANSI SQL, why does the following query fail syntactically: 'SELECT * FROM (SELECT dept_id, AVG(salary) FROM employees GROUP BY dept_id);'?",
    o: ["GROUP BY is illegal inside a FROM subquery", "Every derived table (subquery in the FROM clause) must be given an explicit table alias", "SELECT * cannot be used on an unindexed subquery", "AVG() requires an explicit CAST inside a derived table"],
    c: 1,
    e: "ANSI SQL requires all derived tables in the FROM clause to have a mandatory correlation name (table alias), e.g., '... AS dt;'."
  },
  {
    q: "What happens when an uncorrelated subquery is evaluated by a modern cost-based query optimizer?",
    o: ["It is re-evaluated iteratively for each row in the outer table", "It is evaluated exactly once, its result is cached or placed into an ephemeral worktable, and then substituted into the execution plan", "It is always rewritten into an external stored procedure", "It forces the outer query to disable all B-Tree indexes"],
    c: 1,
    e: "Uncorrelated subqueries do not depend on outer row attributes. The engine evaluates them once, materializes the result in memory, and reuses it across the entire outer query lifecycle."
  },
  {
    q: "Under what condition does 'col IN (subquery)' evaluate to UNKNOWN under SQL Three-Valued Logic?",
    o: ["When col does not match any non-NULL value in the subquery, and the subquery contains at least one NULL row", "Whenever the subquery contains more than 1,000 rows", "When col is a PRIMARY KEY", "Only if col is explicitly cast to a VARCHAR"],
    c: 0,
    e: "If col is 10 and the subquery returns (20, 30, NULL), 10=20 is FALSE, 10=30 is FALSE, and 10=NULL is UNKNOWN. FALSE OR FALSE OR UNKNOWN evaluates to UNKNOWN."
  },
  {
    q: "How does a database engine physically execute a multi-row subquery 'WHERE id IN (SELECT user_id FROM orders)'?",
    o: ["By converting it into a Cursor loop", "By unnesting the subquery into a Hash Semi-Join or Materialized Index Scan", "By locking the orders table with an exclusive table lock", "By evaluating the subquery into a text string and using regex"],
    c: 1,
    e: "Modern query optimizers convert 'IN (subquery)' into a Hash Semi-Join or Index Semi-Join, preventing nested loop degradation."
  },
  {
    q: "What error does PostgreSQL throw if a scalar subquery returns 2 rows: 'SELECT (SELECT emp_name FROM employees WHERE dept_id = 10);'?",
    o: ["ERROR: subquery in FROM must have an alias", "ERROR: more than one row returned by a subquery used as an expression", "ERROR: aggregate functions are not allowed in scalar expressions", "ERROR: Cartesian product detected in projection"],
    c: 1,
    e: "Postgres raises 'ERROR: more than one row returned by a subquery used as an expression' when a scalar subquery violates single-row cardinality."
  },
  {
    q: "What is a 'Row Subquery' in relational database systems?",
    o: ["A subquery that returns a single row containing multiple columns, compared as a tuple: '(a, b) = (SELECT x, y FROM ...)'", "A subquery that only executes on the first row of a physical table page", "A subquery that can only appear in the LIMIT clause", "A subquery that converts columnar storage into row-oriented storage"],
    c: 0,
    e: "Row subqueries return a tuple of 1 row with M columns, allowing tuple comparisons like '(country, city) IN (SELECT country, city FROM offices)'."
  },
  {
    q: "Why is a scalar subquery in the SELECT list often termed a 'Hidden Correlated Subquery'?",
    o: ["Because it cannot be viewed in EXPLAIN plans", "Because if it references an outer column, it acts like a function invoked once per outer row, causing O(N) evaluations", "Because it is hidden from the query cache", "Because it automatically encrypts column values"],
    c: 1,
    e: "When a SELECT list subquery references outer columns, naive execution invokes the subquery for every projected row, behaving like an O(N) row-by-row function call."
  },
  {
    q: "What is the behavior of 'col = SOME (subquery)' in ANSI SQL?",
    o: ["It is syntactically identical and semantically synonymous with 'col IN (subquery)'", "It requires at least 50% of subquery rows to equal col", "It randomly selects one row from the subquery to compare against", "It is deprecated and forbidden in modern ANSI standards"],
    c: 0,
    e: "'= ANY' and '= SOME' are exact semantic synonyms for 'IN' in SQL-92 and later standards."
  },
  {
    q: "Which clause CANNOT host a scalar subquery under ANSI SQL-92?",
    o: ["SELECT", "WHERE", "GROUP BY", "HAVING"],
    c: 2,
    e: "Standard SQL forbids subqueries directly within the GROUP BY clause because the engine must establish grouping hash keys prior to subquery evaluation."
  },
  {
    q: "If an inner subquery for 'WHERE val < ALL (subquery)' returns 0 rows, what is the boolean result of the predicate?",
    o: ["FALSE because the set is empty", "UNKNOWN because cardinality is zero", "TRUE because a universal quantifier over an empty set (vacuous truth) is always TRUE", "NULL"],
    c: 2,
    e: "In mathematical logic, universal quantification over an empty set (ALL of an empty set) is vacuously TRUE. Therefore, 'val < ALL (empty set)' evaluates to TRUE for all rows."
  },
  {
    q: "What is the performance advantage of replacing a SELECT scalar subquery with a LEFT JOIN to an aggregated CTE?",
    o: ["It transforms row-by-row repeated evaluation into a single sequential table scan and a single hash join", "It bypasses the buffer pool entirely", "It prevents deadlocks on read-only tables", "It forces the query to execute in parallel without CPU limits"],
    c: 0,
    e: "Replacing scalar subqueries with an aggregated CTE and a LEFT JOIN allows the engine to compute aggregates once in a batch and join via hash probe in O(N) time."
  },
  {
    q: "What is the relational definition of an 'Independent Derived Table'?",
    o: ["A temporary table physically created on disk with explicit clustered indexes", "A subquery in the FROM clause that has zero correlation to other tables in the same FROM clause", "A table generated by a window function", "A materialized view that auto-refreshes every minute"],
    c: 1,
    e: "An independent derived table contains no lateral or outer references and can be completely evaluated and materialized prior to main query processing."
  }
];

topic1Questions.forEach(item => {
  addMCQ("Scalar & Columnar Subqueries", "Subquery Dimensionality", "Engine Mechanics", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 2. CORRELATED SUBQUERIES & OUTER BINDING (15 MCQs)
// =============================================================================
const topic2Questions = [
  {
    q: "What uniquely defines a 'Correlated Subquery' compared to a standard subquery?",
    o: ["It references one or more columns from an outer query block, creating an execution dependency for each candidate outer row", "It contains more than two JOIN operations in its FROM clause", "It must be executed concurrently on multi-core CPUs", "It requires a COMMIT statement inside its body"],
    c: 0,
    e: "A correlated subquery references columns from the outer query. The inner query's execution and result depend dynamically on the values of each candidate outer row."
  },
  {
    q: "In an unoptimized query engine, what is the theoretical algorithmic time complexity of a correlated subquery on an outer table of N rows and an inner table of M rows?",
    o: ["O(N + M)", "O(N * M) (Quadratic Nested Loop)", "O(log(N * M))", "O(1) constant time"],
    c: 1,
    e: "Without index optimization or decorrelation rewrites, the engine executes the inner query (scanning M rows) for each of the N outer rows, resulting in O(N * M) quadratic time complexity."
  },
  {
    q: "What process does an optimizing database compiler perform when 'decorrelating' a subquery?",
    o: ["It strips all comments and whitespace from the query text", "It transforms the row-by-row correlated subquery into an equivalent relational Join (Semi-Join or Outer Join) with aggregation", "It forces the subquery to run as an independent background transaction", "It converts column data types into raw bytes"],
    c: 1,
    e: "Subquery decorrelation is an optimizer pass that rewrites correlated subqueries into semi-joins, anti-joins, or group-by joins, allowing hash or merge join algorithms."
  },
  {
    q: "In the query 'SELECT * FROM emp e WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept_id = e.dept_id)', what is 'e.dept_id' called?",
    o: ["The Primary Key Anchor", "The Correlation Attribute / Correlation Reference", "The Foreign Key Constraint", "The Lexical Parameter"],
    c: 1,
    e: "'e.dept_id' is the correlation attribute that binds the inner query to the current candidate row of the outer table 'e'."
  },
  {
    q: "Can a correlated subquery be executed independently in a separate query window for debugging?",
    o: ["Yes, if you wrap it in parentheses", "No, because it references outer table aliases that do not exist outside the outer query scope", "Yes, the database engine will substitute default values for outer columns", "Only in MySQL, but not in PostgreSQL"],
    c: 1,
    e: "Correlated subqueries cannot be run standalone because they contain free variables (outer column references) that are undefined outside the outer query's context."
  },
  {
    q: "How does a composite index on '(dept_id, salary)' optimize a correlated subquery calculating 'WHERE e.salary > (SELECT AVG(salary) FROM emp WHERE dept_id = e.dept_id)'?",
    o: ["It allows the engine to perform an Index Range Scan on dept_id and compute the average directly from index leaf pages without visiting base table pages", "It automatically converts the subquery into a stored procedure", "It caches the result of the outer query in memory", "It forces the engine to bypass the buffer pool"],
    c: 0,
    e: "A composite index covering (dept_id, salary) enables index-only scans (covering index), calculating the department average purely from the B-tree leaf nodes."
  },
  {
    q: "In PostgreSQL and MySQL 8.0.14+, what clause allows a subquery in the FROM clause to reference columns from preceding FROM tables?",
    o: ["CROSS JOIN CORRELATED", "LATERAL", "RECURSIVE", "PIVOT"],
    c: 1,
    e: "The LATERAL keyword (e.g. 'FROM table1, LATERAL (SELECT ... WHERE col = table1.id) AS sub') enables subqueries in the FROM clause to reference prior tables."
  },
  {
    q: "Why does a correlated subquery in the WHERE clause often outperform a CTE Join on massive tables when filtering with a highly selective outer WHERE condition?",
    o: ["Because CTEs are always written to disk, whereas correlated subqueries are not", "Because if the outer WHERE condition reduces candidate rows to 5 rows, the correlated subquery only executes 5 times, whereas a naive CTE pre-aggregates the entire table", "Because correlated subqueries run in parallel on all CPU cores", "Because correlated subqueries bypass transaction isolation locks"],
    c: 1,
    e: "If an outer WHERE filter reduces candidate rows from 100M to 5, a correlated subquery executes 5 index lookups. An unpushed CTE might pre-aggregate all 100M rows unnecessarily."
  },
  {
    q: "What is a 'Correlated Subquery in HAVING' typically used for?",
    o: ["To filter group summaries against an external benchmark that depends on group attributes (e.g., HAVING SUM(sales) > (SELECT target FROM targets WHERE region = sales.region))", "To define table primary keys dynamically", "To reset auto-increment counters", "To sort groups alphabetically"],
    c: 0,
    e: "Correlated subqueries in HAVING compare group aggregated metrics against dynamic benchmarks parameterized by the grouping columns."
  },
  {
    q: "What is an 'Anti-Correlated Subquery'?",
    o: ["A subquery where outer rows are filtered out when the correlated condition finds a match (e.g. using NOT EXISTS)", "A subquery that runs backwards from bottom to top", "A subquery with syntax errors", "A subquery that deletes rows from the outer table"],
    c: 0,
    e: "An anti-correlated subquery (typically expressed via NOT EXISTS) keeps outer rows only when the correlated subquery produces zero matching records."
  },
  {
    q: "Which operator is physically executed when an optimizer converts a correlated subquery 'WHERE id IN (SELECT user_id FROM ... WHERE ...)' into an execution plan?",
    o: ["Full Cross Join", "Nested Loop Semi-Join or Hash Semi-Join", "Cartesian Product Scan", "Union Distinct"],
    c: 1,
    e: "Query planners convert correlated IN and EXISTS subqueries into Semi-Join operators (Nested Loop Semi-Join or Hash Semi-Join)."
  },
  {
    q: "In Oracle and DB2, what happens if a correlated subquery references an outer column from two query levels above (grandparent query)?",
    o: ["It fails because correlation is limited to strictly 1 level", "It succeeds; ANSI SQL supports multi-level correlation across arbitrarily nested scopes", "It causes an infinite loop in the parser", "It executes only if the tables share the same schema"],
    c: 1,
    e: "ANSI SQL fully supports multi-level correlation, allowing inner subqueries to reference attributes from parent, grandparent, and root query blocks."
  },
  {
    q: "What is the risk of using a correlated subquery inside an UPDATE statement: 'UPDATE accounts a SET balance = balance - (SELECT fee FROM fees WHERE account_id = a.id)'?",
    o: ["If the subquery returns NULL or zero rows, balance will be set to NULL, wiping out account balances!", "The database will automatically drop the fees table", "It locks all rows across the entire database instance", "It forces an immediate server reboot"],
    c: 0,
    e: "If the subquery matches zero rows, it evaluates to NULL. In SQL, 'balance - NULL' evaluates to NULL, overwriting legitimate data with NULL!"
  },
  {
    q: "How can the UPDATE correlated subquery risk of setting values to NULL be mitigated?",
    o: ["Using COALESCE((SELECT fee FROM ...), 0) to ensure a fallback scalar zero", "Using DROP TABLE IF EXISTS", "Running the query with AUTOCOMMIT disabled", "Converting the column to an ENUM"],
    c: 0,
    e: "Wrapping the correlated subquery in COALESCE((SELECT ...), 0) guarantees that a zero-row subquery evaluates to 0 instead of NULL."
  },
  {
    q: "In MySQL EXPLAIN output, what does 'DEPENDENT SUBQUERY' indicate?",
    o: ["The subquery has foreign key dependencies on another database", "The subquery is correlated and depends on outer query row attributes, meaning it may be evaluated for each outer row", "The subquery can only run after disk cache flushing", "The subquery is executed as a background worker task"],
    c: 1,
    e: "MySQL's EXPLAIN marks correlated subqueries as 'DEPENDENT SUBQUERY', highlighting that its execution depends on parameters passed from the outer context."
  }
];

topic2Questions.forEach(item => {
  addMCQ("Correlated Subqueries & Binding", "Correlation Parameter Binding", "Execution Physics", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 3. THE EXISTS & NOT EXISTS ANTI-SEMI JOIN ENGINE (15 MCQs)
// =============================================================================
const topic3Questions = [
  {
    q: "Why is 'NOT EXISTS' mathematically immune to the Three-Valued Logic NULL catastrophe that plagues 'NOT IN'?",
    o: ["Because NOT EXISTS converts NULLs into empty strings", "Because EXISTS tests strictly for tuple cardinality (row count >= 1), returning binary TRUE or FALSE and NEVER evaluating to UNKNOWN", "Because NOT EXISTS disables 3VL inside the storage engine", "Because NOT EXISTS creates an auto-increment column"],
    c: 1,
    e: "EXISTS evaluates purely whether the subquery returns >= 1 row. If 0 rows return, it is FALSE; if >= 1 row returns, it is TRUE. It never evaluates to UNKNOWN, making NOT EXISTS 100% safe with NULLs."
  },
  {
    q: "Consider: 'SELECT * FROM users WHERE user_id NOT IN (SELECT manager_id FROM departments)'. If departments contains 100 rows, and exactly one row has manager_id = NULL, what will the query return?",
    o: ["All users who are not managers", "Exactly one user", "Zero rows (an empty set)!", "A database syntax error: NullPointerException"],
    c: 2,
    e: "Under 3VL, 'val NOT IN (1, 2, NULL)' evaluates to '(val!=1 AND val!=2 AND val!=NULL)'. Since 'val!=NULL' is UNKNOWN, the entire conjunction is UNKNOWN. A WHERE clause rejects UNKNOWN, returning 0 rows."
  },
  {
    q: "In an EXISTS subquery 'WHERE EXISTS (SELECT col FROM t WHERE ...)', does the choice of projection (e.g. 'SELECT 1', 'SELECT *', 'SELECT NULL') impact query performance?",
    o: ["Yes, SELECT 1 is much faster because it reads 1 byte from RAM", "Yes, SELECT * forces all table columns to be decoded from disk", "No, the query optimizer ignores the projection list entirely; it only checks for row existence", "Yes, SELECT NULL throws an error"],
    c: 2,
    e: "In SQL engines, the SELECT projection list of an EXISTS subquery is completely ignored by the query planner. 'SELECT 1', 'SELECT *', and 'SELECT NULL' generate identical execution plans."
  },
  {
    q: "What is the physical short-circuiting behavior of the EXISTS operator?",
    o: ["It evaluates all rows in the subquery and counts them", "It halts scanning the underlying index/table the precise microsecond it encounters the very first qualifying tuple", "It creates an asynchronous background thread that terminates on timeout", "It buffers the entire table into memory before evaluating"],
    c: 1,
    e: "EXISTS is an existential quantifier. The moment the storage engine encounters a single row satisfying the condition, it short-circuits and emits TRUE without reading remaining rows."
  },
  {
    q: "Which relational algebra operator represents a query with a 'WHERE EXISTS' subquery?",
    o: ["Cartesian Product", "Semi-Join (⋉)", "Anti-Join (▷)", "Full Outer Join (⟗)"],
    c: 1,
    e: "A Semi-Join (denoted ⋉) returns rows from the left relation that have at least one matching row in the right relation, without duplicating left rows."
  },
  {
    q: "Which relational algebra operator represents a query with a 'WHERE NOT EXISTS' subquery?",
    o: ["Anti-Semi-Join (▷)", "Inner Equi-Join", "Theta Join", "Natural Join"],
    c: 0,
    e: "An Anti-Semi-Join (denoted ▷) returns rows from the left relation that have NO matching rows in the right relation."
  },
  {
    q: "How does a LEFT JOIN ... WHERE right.id IS NULL compare to NOT EXISTS in modern PostgreSQL and MySQL 8.0?",
    o: ["LEFT JOIN IS NULL is always 10x slower because it materializes all outer rows", "Both patterns are recognized by modern optimizers and compiled into identical Anti-Semi-Join physical execution plans", "NOT EXISTS requires full table locks, while LEFT JOIN does not", "LEFT JOIN IS NULL cannot be run on indexed columns"],
    c: 1,
    e: "Modern cost-based optimizers rewrite both 'LEFT JOIN ... WHERE right.pk IS NULL' and 'NOT EXISTS' into identical physical Anti-Semi-Join plans."
  },
  {
    q: "In MySQL 8.0, what optimization algorithm allows EXISTS subqueries to avoid nested loop execution?",
    o: ["FirstMatch and Duplicate Weedout semi-join strategies", "Index Skip Scan only", "MRR (Multi-Range Read) only", "Full Table Lock Bypass"],
    c: 0,
    e: "MySQL 8.0 provides dedicated Semi-Join strategies: FirstMatch, Materialize, Duplicate Weedout, and LooseScan to optimize EXISTS subqueries."
  },
  {
    q: "If an inner subquery in 'WHERE EXISTS (SELECT 1 FROM empty_table)' executes, what does EXISTS return?",
    o: ["NULL", "FALSE", "UNKNOWN", "0"],
    c: 1,
    e: "If the subquery returns 0 rows, EXISTS returns strictly FALSE."
  },
  {
    q: "Why is 'SELECT DISTINCT u.* FROM users u INNER JOIN orders o ON u.id = o.user_id' considered worse than 'WHERE EXISTS (SELECT 1 FROM orders WHERE user_id = u.id)' for finding active buyers?",
    o: ["INNER JOIN cannot use indexes", "INNER JOIN creates duplicate rows for users with multiple orders, requiring an expensive DISTINCT sort/hash step; EXISTS short-circuits without generating duplicates", "INNER JOIN does not support WHERE clauses", "DISTINCT is illegal with INNER JOIN in ANSI SQL"],
    c: 1,
    e: "INNER JOIN produces a row for every matching order (multiplying rows), requiring an expensive deduplication sort (DISTINCT). EXISTS stops at the first order, naturally preserving unique user rows."
  },
  {
    q: "What happens if a correlated subquery inside NOT EXISTS returns rows where every single column value is NULL?",
    o: ["NOT EXISTS treats it as an empty set and returns TRUE", "NOT EXISTS recognizes that a row exists (cardinality = 1) and correctly returns FALSE", "It throws a NullPointerException in the execution engine", "It converts the row to an empty string"],
    c: 1,
    e: "Even if a row consists entirely of NULL values, it is still a physical tuple. Because cardinality >= 1, EXISTS returns TRUE, and NOT EXISTS returns FALSE."
  },
  {
    q: "What is the 'FirstMatch' semi-join strategy in MySQL execution plans?",
    o: ["It matches only the first row of the entire table and halts the query", "It scans the inner table for a match; upon finding the first matching inner record for an outer row, it short-circuits and proceeds to the next outer row", "It matches primary keys before foreign keys", "It loads the first partition of a partitioned table"],
    c: 1,
    e: "FirstMatch is an execution strategy where the engine halts scanning the inner table the moment the first match for the current outer row is found."
  },
  {
    q: "Under what scenario would 'NOT IN' be preferable over 'NOT EXISTS'?",
    o: ["When checking membership against a small, static in-memory list of non-null constants (e.g. 'WHERE status NOT IN ('FAILED', 'CANCELLED')')", "When querying multi-million row tables", "When the subquery contains nullable foreign keys", "Never; NOT IN is forbidden in all SQL dialects"],
    c: 0,
    e: "NOT IN is clean, readable, and highly optimized when used against static, known non-null constant lists (e.g. status codes)."
  },
  {
    q: "In PostgreSQL EXPLAIN plans, how is an unnested NOT EXISTS query typically represented?",
    o: ["Hash Anti Join or Merge Anti Join", "Nested Loop Cross Join", "Seq Scan with Filter only", "Bitmap Heap Scan without Join"],
    c: 0,
    e: "PostgreSQL explicitly displays 'Hash Anti Join' or 'Merge Anti Join' when it unnests a NOT EXISTS subquery."
  },
  {
    q: "Can EXISTS be used in a CASE statement: 'CASE WHEN EXISTS (SELECT ...) THEN 'Yes' ELSE 'No' END'?",
    o: ["No, EXISTS can only appear in WHERE clauses", "Yes, EXISTS is a standard boolean expression valid in CASE WHEN, WHERE, and HAVING", "Only if wrapped in an inline CTE", "Only in Snowflake and BigQuery"],
    c: 1,
    e: "EXISTS produces a boolean value and is valid anywhere boolean predicates are permitted, including CASE WHEN conditional branches."
  }
];

topic3Questions.forEach(item => {
  addMCQ("EXISTS & Anti-Semi Join Engine", "EXISTS Mechanics & 3VL", "Semi-Join Optimization", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 4. NON-WINDOW TOP-N & RELATIVE FREQUENCY IDIOMS (15 MCQs)
// =============================================================================
const topic4Questions = [
  {
    q: "How does the classic correlated count idiom solve Top-N per category without window functions: 'WHERE (SELECT COUNT(*) FROM t t2 WHERE t2.dept = t1.dept AND t2.salary > t1.salary) < N'?",
    o: ["It calculates the sum of all salaries and divides by N", "An employee is in the Top-N if the count of colleagues in their department earning strictly more than them is strictly less than N", "It generates random numbers for each department", "It creates an external temporary table using a stored procedure"],
    c: 1,
    e: "By definition, the #1 earner has 0 colleagues earning more. The #2 earner has 1. Thus, if COUNT(salaries > current_salary) < N, the employee is in the Top N."
  },
  {
    q: "In the correlated Top-N idiom, how do you simulate DENSE_RANK() behavior instead of RANK() when duplicate salaries exist?",
    o: ["By replacing COUNT(*) with COUNT(DISTINCT t2.salary)", "By adding a LIMIT clause to the inner query", "By using MAX(salary) instead of COUNT", "By grouping by salary descending"],
    c: 0,
    e: "Using COUNT(DISTINCT t2.salary) ensures tied salaries are treated as a single rank tier, exactly matching DENSE_RANK() semantics."
  },
  {
    q: "Why is the correlated count Top-N idiom considered an O(N^2) operation on unindexed tables?",
    o: ["Because it forces an index seek on primary keys", "Because for each of the N rows, it performs a full table scan of N rows to count higher salaries", "Because it uses recursive call stacks", "Because it doubles the memory allocation on each iteration"],
    c: 1,
    e: "Evaluating a nested self-join where every row counts higher values across the table requires comparing every row against every other row: N * N = O(N^2)."
  },
  {
    q: "How can you find the exact N-th highest salary (e.g. 3rd highest) in a table without window functions or LIMIT?",
    o: ["WHERE 2 = (SELECT COUNT(DISTINCT salary) FROM emp WHERE salary > e.salary)", "WHERE salary = (SELECT AVG(salary) * 3 FROM emp)", "WHERE salary < (SELECT MIN(salary) FROM emp)", "WHERE 3 = (SELECT SUM(salary) FROM emp)"],
    c: 0,
    e: "The N-th highest distinct value has exactly N - 1 distinct values strictly greater than it. For the 3rd highest salary, exactly 2 distinct salaries are higher."
  },
  {
    q: "What is the primary reason senior technical interviews ask candidates to solve Top-N without window functions?",
    o: ["Because window functions were removed from the SQL standard in 2023", "To test fundamental understanding of relational set theory, self-joins, and correlated subquery evaluation", "To prove that subqueries are faster than window functions", "Because MySQL 8.0 does not support window functions"],
    c: 1,
    e: "Solving Top-N without window functions demonstrates that an engineer understands relational calculus, set cardinalities, and self-referencing joins."
  },
  {
    q: "In a table with salaries [100, 90, 90, 80], what does 'WHERE (SELECT COUNT(*) FROM t t2 WHERE t2.val > t1.val) < 2' return?",
    o: ["100 and both 90s", "Only 100", "100, 90, 90, 80", "Only 90"],
    c: 1,
    e: "For 100: 0 rows are greater (0 < 2 -> KEPT). For 90: exactly 1 row (100) is greater (1 < 2 -> KEPT). Both rows with 90 have 1 row greater, so both 90s are returned along with 100."
  },
  {
    q: "What index is required to make the correlated Top-N query performant?",
    o: ["A Hash index on emp_name", "A Composite B-Tree index on (dept_id, salary DESC)", "A Full-text index on title", "A Spatial R-Tree index"],
    c: 1,
    e: "A composite index on (dept_id, salary DESC) allows the inner query to perform a fast index range scan to count salaries greater than the target value."
  },
  {
    q: "How does the self-join Top-N approach compare to the correlated subquery approach: 'SELECT e1.* FROM emp e1 JOIN emp e2 ON e1.dept = e2.dept AND e1.salary <= e2.salary GROUP BY e1.id HAVING COUNT(...) <= N'?",
    o: ["The self-join approach groups candidate pairs and uses HAVING; both express the same relational logic with similar O(N^2) join graphs", "The self-join approach is illegal in ANSI SQL", "The self-join approach only works for N=1", "The self-join approach bypasses GROUP BY"],
    c: 0,
    e: "The self-join with GROUP BY and HAVING COUNT() <= N is the relational join equivalent of the correlated subquery Top-N idiom."
  },
  {
    q: "If an interviewer asks for the Top 1 record per group without window functions, what is the cleanest subquery pattern?",
    o: ["WHERE salary = (SELECT MAX(salary) FROM emp e2 WHERE e2.dept = e1.dept)", "WHERE salary > (SELECT MIN(salary) FROM emp)", "WHERE salary = 0", "WHERE dept IN (SELECT dept FROM dept)"],
    c: 0,
    e: "Matching the column against a correlated MAX() subquery ('WHERE salary = (SELECT MAX(salary) FROM emp e2 WHERE e2.dept = e1.dept)') is the canonical Top-1 pattern."
  },
  {
    q: "In a table with duplicate maximum values (e.g. two employees tied at $200K in Dept 10), what does 'WHERE salary = (SELECT MAX(salary)...)' return?",
    o: ["Exactly 1 employee chosen arbitrarily", "Both tied employees", "Zero employees", "A CardinalityViolation error"],
    c: 1,
    e: "Because the outer WHERE clause matches any row where 'salary = 200000', both tied employees satisfy the predicate and are returned."
  },
  {
    q: "How can you return strictly 1 employee in case of ties for Top-1 without window functions in MySQL?",
    o: ["Add 'AND emp_id = (SELECT MIN(emp_id) FROM emp e2 WHERE e2.dept = e1.dept AND e2.salary = e1.salary)' as a tie-breaker", "Use DROP DUPLICATES", "Set SQL_MODE = 'NO_TIES'", "Convert emp_id to negative values"],
    c: 0,
    e: "Adding a correlated secondary tie-breaker subquery on the primary key (e.g. MIN(emp_id)) enforces deterministic single-row Top-1 extraction."
  },
  {
    q: "Why do distributed MPP engines (Snowflake, BigQuery) penalize the correlated Top-N count pattern heavily?",
    o: ["They lack B-Tree index lookups, forcing expensive full table cross-shuffles across cluster compute nodes", "They do not support the COUNT() function", "They only allow queries with fewer than 10 lines", "They reject queries with subqueries in WHERE"],
    c: 0,
    e: "Cloud data warehouses do not have traditional B-Tree indexes for row-by-row lookups. A correlated self-join forces massive data shuffling across cluster nodes."
  },
  {
    q: "What is the relative frequency calculation idiom using subqueries: 'SELECT cat, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM items) FROM items GROUP BY cat'?",
    o: ["It divides category count by a scalar subquery calculating total table count to produce percentage distribution", "It counts items across multiple servers", "It creates a histogram using window framing", "It deletes categories with under 100 items"],
    c: 0,
    e: "Using a scalar subquery '(SELECT COUNT(*) FROM items)' inside the SELECT list computes the global denominator, allowing inline percentage-of-total calculations without window functions."
  },
  {
    q: "Why is '100.0' used instead of '100' in percentage calculations in SQL Server and PostgreSQL?",
    o: ["To indicate floating-point precision and prevent integer division truncation to 0", "To satisfy syntax formatting linters", "Because integers are forbidden in division", "To round numbers to the nearest hundred"],
    c: 0,
    e: "In SQL Server and Postgres, dividing two integers yields an integer (e.g., 5 / 10 = 0). Multiplying by '100.0' casts the numerator to a decimal, preserving fractional precision."
  },
  {
    q: "Can the correlated Top-N idiom be used to find the Bottom-N records?",
    o: ["Yes, simply invert the comparison operator from '>' to '<': COUNT(salary < e.salary) < N", "No, it only works for maximum values", "Only if the table is sorted descending first", "Only by multiplying all values by -1"],
    c: 0,
    e: "Inverting the operator to 't2.salary < e1.salary' counts how many records are strictly smaller, identifying the Bottom-N records."
  }
];

topic4Questions.forEach(item => {
  addMCQ("Non-Window Top-N Idioms", "Correlated Top-N", "Relational Set Counting", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 5. MULTI-TIER MODULAR CTE PIPELINES (15 MCQs)
// =============================================================================
const topic5Questions = [
  {
    q: "What is a Common Table Expression (CTE) in SQL?",
    o: ["A permanent view stored in the database catalog", "A named temporary result set defined within the lexical scope of a single query using the WITH clause", "A table physically stored in tempdb that survives across sessions", "A transaction savepoint"],
    c: 1,
    e: "A CTE is a named temporary result set defined at the beginning of a query using the 'WITH' clause, existing only for the duration of that statement."
  },
  {
    q: "How does a multi-tier CTE pipeline improve database engineering maintainability?",
    o: ["It converts SQL into Java bytecode", "It breaks monolithic, deeply nested subquery pyramids into modular, top-to-bottom, literate dataflow stages", "It automatically creates clustered indexes on all columns", "It bypasses transaction rollback logs"],
    c: 1,
    e: "Multi-tier CTEs allow developers to structure data transformations into clean, sequential, testable pipeline stages, eliminating unreadable deeply nested subquery spaghetti."
  },
  {
    q: "Can a downstream CTE in a WITH clause reference an upstream CTE defined earlier in the same WITH clause?",
    o: ["No, all CTEs in a WITH clause execute in complete isolation and cannot see each other", "Yes, any CTE defined later can reference any prior CTE defined earlier in the same statement", "Only if they share the same table schema", "Only in Snowflake, but not in MySQL or PostgreSQL"],
    c: 1,
    e: "ANSI SQL allows chained CTEs: any CTE defined later in the WITH block can freely reference CTEs defined prior to it."
  },
  {
    q: "What is an 'Optimization Fence' in relation to Common Table Expressions?",
    o: ["A firewall preventing external connections to the database", "An execution boundary where the optimizer evaluates and materializes a CTE in isolation without pushing down external WHERE predicates", "A syntax error caused by too many WITH statements", "A hardware limit on database memory"],
    c: 1,
    e: "Historically in PostgreSQL (prior to PG 12), CTEs acted as optimization fences: the engine materialized the CTE completely, preventing predicate pushdown from outer queries into the CTE."
  },
  {
    q: "In PostgreSQL 12+, how can an engineer explicitly force a CTE to be materialized in temporary memory?",
    o: ["WITH cte_name AS MATERIALIZED (SELECT ...)", "WITH cte_name AS PERSISTENT (SELECT ...)", "WITH cte_name FORCE INDEX (SELECT ...)", "SET MATERIALIZE = TRUE;"],
    c: 0,
    e: "Postgres 12+ introduced the 'AS MATERIALIZED' and 'AS NOT MATERIALIZED' keywords to explicitly control whether the optimizer inlines or caches a CTE."
  },
  {
    q: "How do MySQL 8.0 and SQLite handle non-recursive CTEs under the hood?",
    o: ["They convert every CTE into a permanent table on disk", "They inline and merge non-recursive CTEs directly into the outer query's Abstract Syntax Tree like derived tables", "They execute them on external worker nodes", "They reject CTEs with more than 10 rows"],
    c: 1,
    e: "Modern engines (MySQL 8.0, SQLite 3.8+) treat non-recursive CTEs as syntactic sugar for derived tables, inlining and optimizing them alongside the main query."
  },
  {
    q: "Can a single WITH clause define multiple CTEs separated by commas?",
    o: ["No, each CTE requires its own separate WITH keyword", "Yes: 'WITH cte1 AS (...), cte2 AS (...) SELECT ...'", "Only up to a maximum of 2 CTEs", "Only if the first CTE is named 'main'"],
    c: 1,
    e: "A single WITH statement can declare multiple CTEs separated by commas: 'WITH cte1 AS (...), cte2 AS (...) SELECT ...'."
  },
  {
    q: "Can a CTE be referenced multiple times within the same final query?",
    o: ["No, a CTE can only be consumed once, like a streaming pipe", "Yes, a CTE can be referenced multiple times (e.g. joined to itself or unioned) in downstream queries", "Only if it is declared RECURSIVE", "Only if it contains fewer than 100 rows"],
    c: 1,
    e: "A major benefit of CTEs is reusability: the same CTE can be referenced multiple times in JOINs, subqueries, or set operations within the same statement."
  },
  {
    q: "Which SQL statements can be preceded by a WITH clause in modern ANSI SQL?",
    o: ["Only SELECT statements", "SELECT, INSERT, UPDATE, and DELETE statements", "Only CREATE TABLE statements", "Only ALTER DATABASE commands"],
    c: 1,
    e: "CTEs can precede SELECT, INSERT, UPDATE, and DELETE statements, providing dynamic datasets for data modification operations."
  },
  {
    q: "What happens if a CTE defines column names in its header: 'WITH cte(a, b, c) AS (SELECT 1, 2, 3)'?",
    o: ["It throws a syntax error", "The header explicitly overrides and assigns aliases 'a', 'b', and 'c' to the projected columns", "It creates physical columns in the database", "It casts the columns to CHAR"],
    c: 1,
    e: "ANSI SQL allows explicit column aliasing in the CTE definition header: 'WITH my_cte(col1, col2) AS (...)', overriding any internal column names."
  },
  {
    q: "What is a 'Data-Modifying CTE' in PostgreSQL?",
    o: ["A CTE that contains INSERT, UPDATE, or DELETE with a RETURNING clause, allowing downstream queries to consume modified rows", "A CTE that alters database table schemas", "A CTE that truncates tables", "A CTE that grants user permissions"],
    c: 0,
    e: "Postgres supports data-modifying CTEs: you can run an INSERT, UPDATE, or DELETE with 'RETURNING *' inside a CTE and immediately query those affected rows."
  },
  {
    q: "Why might a CTE consume more memory than an equivalent subquery in older database versions?",
    o: ["Because older engines materialized the entire CTE result set in memory or on disk without pruning unneeded columns or rows", "Because CTEs use 64-bit pointers instead of 32-bit", "Because CTEs encrypt their contents", "Because CTEs create double buffer pages"],
    c: 0,
    e: "Older engines materialized CTEs fully without pushing down outer WHERE filters or unused column projections, leading to unnecessary memory consumption."
  },
  {
    q: "Can a CTE contain window functions?",
    o: ["No, window functions are forbidden in CTEs", "Yes, wrapping window functions in a CTE is the standard idiom to filter on window outputs in an outer WHERE clause", "Only if the CTE is recursive", "Only in MySQL"],
    c: 1,
    e: "Because window functions cannot be placed directly in WHERE or HAVING clauses, wrapping them inside a CTE and filtering in the outer query is the universal standard."
  },
  {
    q: "What is the scope of a CTE declared at the beginning of a query?",
    o: ["The entire database cluster", "The user's active session until disconnect", "Strictly the single statement to which the WITH clause is attached", "The stored procedure file only"],
    c: 2,
    e: "A CTE exists strictly for the single query statement it prefixes. Once that statement finishes executing, the CTE vanishes completely from memory."
  },
  {
    q: "How does readability compare between a 4-level nested derived table query and a 4-step CTE pipeline?",
    o: ["Nested derived tables read outside-in and bottom-up; CTE pipelines read top-to-bottom in logical dataflow order", "They are identical in visual structure", "Derived tables are always more readable", "CTEs require reverse polish notation"],
    c: 0,
    e: "Deeply nested subqueries require reading from the innermost block outwards, whereas CTE pipelines read top-to-bottom, matching human ETL mental models."
  }
];

topic5Questions.forEach(item => {
  addMCQ("Modular CTE Pipelines", "Common Table Expressions", "Pipeline Architecture", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 6. RECURSIVE CTES & ORGANIZATIONAL HIERARCHIES (15 MCQs)
// =============================================================================
const topic6Questions = [
  {
    q: "What are the two mandatory structural members of an ANSI SQL Recursive CTE?",
    o: ["The Master Member and the Worker Member", "The Anchor Member (base query) and the Recursive Member, combined via UNION ALL", "The Primary Key and the Foreign Key", "The Initializer and the Destructor"],
    c: 1,
    e: "A recursive CTE must consist of an Anchor Member (base case) and a Recursive Member (inductive step that references the CTE name), unified by UNION or UNION ALL."
  },
  {
    q: "How does the database engine physically evaluate a recursive CTE without causing a stack overflow?",
    o: ["It uses a procedural while-loop with an internal Working Table queue (Breadth-First Search)", "It spawns a new operating system process for each recursion step", "It rewrites the query into a multi-table cross join", "It uses an external Python interpreter"],
    c: 0,
    e: "Relational engines evaluate recursive CTEs iteratively using a Working Table buffer. It evaluates the anchor, loads rows into the queue, and loops until the queue is empty."
  },
  {
    q: "What causes an infinite loop in a recursive CTE traversing an employee management hierarchy?",
    o: ["An employee reporting to multiple managers", "A cycle in the data graph (e.g. Employee A manages B, B manages C, and C manages A)", "Having more than 100 employees in the table", "Employees with NULL salaries"],
    c: 1,
    e: "Cycles in graph data (circular references) cause the recursive member to continuously produce rows, resulting in infinite recursion until the engine aborts."
  },
  {
    q: "In MySQL 8.0, what system variable prevents infinite recursion from crashing the database server?",
    o: ["max_connections", "cte_max_recursion_depth (default 1,000 iterations)", "innodb_buffer_pool_size", "net_read_timeout"],
    c: 1,
    e: "MySQL safeguards against runaway recursive loops with 'cte_max_recursion_depth', which defaults to 1,000 iterations before raising Error 3636."
  },
  {
    q: "Why must you cast string accumulators in the Anchor Member of a recursive CTE: 'CAST(emp_name AS CHAR(255)) AS path'?",
    o: ["To convert characters to Unicode", "Because the recursive step concatenates strings; if the anchor defaults to VARCHAR(20), deeper iterations will fail with data truncation errors!", "Because recursive CTEs forbid variable-length strings", "To encrypt the breadcrumb path"],
    c: 1,
    e: "The datatype of CTE columns is determined by the Anchor Member. If the anchor string is VARCHAR(20), concatenating longer paths in recursion throws a string truncation error."
  },
  {
    q: "Which clause is strictly FORBIDDEN inside the Recursive Member of a recursive CTE in ANSI SQL?",
    o: ["WHERE", "INNER JOIN", "GROUP BY / DISTINCT / Aggregate Functions on the recursive reference", "CASE WHEN"],
    c: 2,
    e: "ANSI SQL prohibits GROUP BY, HAVING, DISTINCT, and Window Functions inside the recursive member when applied to the recursive table reference."
  },
  {
    q: "How is the hierarchy depth level computed in a recursive CTE?",
    o: ["By setting level = 1 in the Anchor Member and level + 1 in the Recursive Member", "By using the LENGTH() of employee names", "By counting foreign keys", "By using ROW_NUMBER() in the anchor"],
    c: 0,
    e: "Setting a literal '1 AS depth' in the anchor and projecting 'parent.depth + 1' in the recursive member increments the depth level at each generational hop."
  },
  {
    q: "What is the Anchor Member condition to find the root of a top-down management hierarchy?",
    o: ["WHERE manager_id = emp_id", "WHERE manager_id IS NULL", "WHERE salary = (SELECT MAX(salary) FROM emp)", "WHERE title LIKE '%Executive%'"],
    c: 1,
    e: "In an organizational tree, root nodes (e.g. CEO) have no manager, represented by 'WHERE manager_id IS NULL'."
  },
  {
    q: "Can a recursive CTE be used to generate a continuous sequence of integers from 1 to 100?",
    o: ["No, recursive CTEs can only query existing tables", "Yes: 'WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM seq WHERE n < 100) SELECT n FROM seq;'", "Only if an existing numbers table is joined", "Only in PostgreSQL, but not in MySQL or SQL Server"],
    c: 1,
    e: "Recursive CTEs are the standard mechanism to generate in-memory number series, date spines, and calendar sequences without physical tables."
  },
  {
    q: "How do you traverse a hierarchy bottom-up (finding all managers above an employee) vs top-down?",
    o: ["Invert the join condition: join employee.manager_id = parent_cte.emp_id instead of employee.emp_id = parent_cte.manager_id", "Sort the table descending before running the query", "Set depth = depth - 1", "Use UNION instead of UNION ALL"],
    c: 0,
    e: "To walk up the tree, the recursive member joins the employee's manager_id to the parent's emp_id, climbing upwards toward the root."
  },
  {
    q: "What is the termination condition of a recursive CTE?",
    o: ["When the CPU reaches 100% utilization", "When the recursive member produces an empty result set (0 rows added to the working table)", "When the calling query's LIMIT is reached", "When the database transaction commits"],
    c: 1,
    e: "Recursion naturally terminates when the recursive step returns 0 new rows (the Working Table becomes empty)."
  },
  {
    q: "What syntax does PostgreSQL 14+ introduce to automatically detect and prevent cycles in recursive CTEs?",
    o: ["NO CYCLE", "CYCLE col_name SET is_cycle USING path", "AVOID LOOP", "BREAK ON DUPLICATE"],
    c: 1,
    e: "SQL:2008 and PostgreSQL 14+ feature the official 'CYCLE ... SET ... USING ...' clause to detect cyclic graphs natively."
  },
  {
    q: "Why is 'UNION ALL' preferred over 'UNION' in recursive CTEs?",
    o: ["UNION ALL is required by syntax in most databases; UNION requires an expensive duplicate purge on every recursive generation", "UNION ALL is slower but safer", "UNION deletes the anchor rows", "UNION ALL prevents NULL values"],
    c: 0,
    e: "UNION ALL avoids running an expensive duplicate-elimination sort/hash on every iteration, making it the standard and often syntactically required operator."
  },
  {
    q: "Can the Recursive Member reference the CTE name more than once (e.g. self-joining the CTE within itself)?",
    o: ["Yes, up to 5 times", "No, ANSI SQL mandates that the recursive member reference the recursive CTE exactly once", "Only if the CTE has fewer than 2 columns", "Only in Oracle"],
    c: 1,
    e: "Standard SQL specifies linear recursion: the recursive CTE may be referenced at most once in the FROM clause of the recursive member."
  },
  {
    q: "How do you assemble a breadcrumb path like 'CEO -> VP -> Director' during recursive execution?",
    o: ["CONCAT(parent.path, ' -> ', child.name)", "Using the GROUP_CONCAT function in the anchor", "Using ARRAY_AGG in the recursive member", "Using an external Python script"],
    c: 0,
    e: "Projecting 'CONCAT(parent.path, ' -> ', child.name)' accumulates ancestry breadcrumb strings across each generational level."
  }
];

topic6Questions.forEach(item => {
  addMCQ("Recursive CTEs & Hierarchies", "WITH RECURSIVE", "Tree Traversal Physics", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 7. RECURSIVE GRAPH & NETWORK PATHS (15 MCQs)
// =============================================================================
const topic7Questions = [
  {
    q: "In a Bill of Materials (BOM) database, what does a recursive CTE compute?",
    o: ["The total weight and component explosion of an assembled product across all sub-assembly levels", "The shipping tracking numbers", "The employee payroll for factory workers", "The database backup frequency"],
    c: 0,
    e: "A BOM explosion query uses recursive CTEs to drill down from a finished product through sub-assemblies down to raw materials, multiplying quantities at each tier."
  },
  {
    q: "How do you calculate the total quantity of a raw part in a multi-level BOM explosion?",
    o: ["By multiplying the parent's accumulated quantity by the child's unit quantity at each recursive level: 'parent.qty * child.qty'", "By adding 1 to the quantity", "By using MAX(qty)", "By dividing the price by quantity"],
    c: 0,
    e: "In BOM hierarchies, quantities compound multiplicatively: 1 car requires 4 doors, each door requires 3 hinges -> total hinges = 4 * 3 = 12."
  },
  {
    q: "In a flight route network 'flights(origin, dest, cost)', how does a recursive CTE find all destinations reachable within 2 layovers?",
    o: ["By setting depth <= 3 in the recursive member's WHERE filter", "By joining flights to itself 10 times", "By grouping by origin and having count > 2", "By using LIMIT 2"],
    c: 0,
    e: "Setting 'WHERE layovers <= 2' in the recursive step bounds graph traversal to paths with at most 2 intermediate stops."
  },
  {
    q: "How can you compute the total travel cost of a multi-leg itinerary in a recursive route query?",
    o: ["Accumulating the cost: 'parent.total_cost + child.leg_cost'", "Taking the MAX of leg costs", "Multiplying leg costs", "Using AVG(cost)"],
    c: 0,
    e: "Accumulating additive metrics along a graph path is done via 'parent.accumulated_val + child.edge_val'."
  },
  {
    q: "How do you prevent cyclic paths in flight networks (e.g. JFK -> ORD -> JFK) when PostgreSQL 14 CYCLE syntax is unavailable?",
    o: ["Track the path as a string and check: 'WHERE parent.path NOT LIKE CONCAT('%', child.dest, '%')'", "Disable foreign keys", "Set AUTOCOMMIT to 0", "Use DROP TABLE"],
    c: 0,
    e: "Tracking visited nodes in a path string (or array) and filtering out nodes already in the path prevents cyclic infinite loops."
  },
  {
    q: "What algorithm does a recursive CTE inherently simulate when traversing a graph?",
    o: ["Breadth-First Search (BFS)", "Binary Search on disk pages", "Quicksort", "Dijkstra's Algorithm with Fibonacci Heaps"],
    c: 0,
    e: "Because rows produced by iteration K become the input for iteration K+1, recursive CTEs evaluate graphs in Breadth-First Search (BFS) level-order."
  },
  {
    q: "How can you find the shortest path between two nodes in an unweighted graph using a recursive CTE?",
    o: ["Order the recursive output by hop_count ASC and apply LIMIT 1", "Use the MAX() function", "Sum the node IDs", "Use GROUP BY without ORDER BY"],
    c: 0,
    e: "Because BFS visits nodes in increasing order of distance, the first time the target node is reached represents the shortest hop path."
  },
  {
    q: "In a social network friend graph 'friendships(user_a, user_b)', how do you find 'Friends of Friends' (2nd degree connections)?",
    o: ["Anchor on user_a, recurse to immediate friends (hop 1), then recurse once more (hop 2), filtering out self-connections", "Run a FULL OUTER JOIN on all users", "Use LIKE '%friend%'", "Multiply user IDs"],
    c: 0,
    e: "A 2-hop recursive CTE identifies direct friends at hop 1 and friends of friends at hop 2, excluding the root user."
  },
  {
    q: "What is the Space Complexity of a recursive CTE working table on a dense graph with branching factor B and depth D?",
    o: ["O(B^D) rows in the worst-case working buffer", "O(1)", "O(log D)", "O(D)"],
    c: 0,
    e: "In dense graphs, the number of nodes at depth D grows exponentially with the branching factor (B^D), potentially exhausting memory if unbounded."
  },
  {
    q: "Can a recursive CTE traverse a Directed Acyclic Graph (DAG)?",
    o: ["Yes, DAGs are ideal for recursive CTEs because their lack of cycles guarantees deterministic termination without cycle guards", "No, recursive CTEs only work on binary trees", "Only if the DAG has fewer than 10 edges", "Only in SQLite"],
    c: 0,
    e: "A DAG has no directed cycles, guaranteeing that Breadth-First traversal will naturally reach leaf nodes and terminate cleanly."
  },
  {
    q: "How does PostgreSQL's 'ARRAY' feature assist in recursive graph traversal?",
    o: ["It allows accumulating an array of visited node IDs: 'ARRAY[id]', and checking 'WHERE id != ALL(visited_array)' to avoid cycles", "It compresses the table into zip format", "It converts integers to floats", "It speeds up network I/O"],
    c: 0,
    e: "In PostgreSQL, storing 'ARRAY[root_id]' in the anchor and appending 'visited || child_id' with 'NOT child_id = ANY(visited)' is the cleanest cycle guard."
  },
  {
    q: "What is the effect of setting 'SET SESSION cte_max_recursion_depth = 50;' in MySQL?",
    o: ["The recursive query is aborted with an error if it attempts to execute a 51st recursive step", "The query is truncated and returns 50 rows", "It allocates 50MB of RAM", "It limits the table to 50 columns"],
    c: 0,
    e: "It lowers the recursion depth threshold; if recursion reaches level 51, MySQL immediately terminates the query with Error 3636."
  },
  {
    q: "In package dependency managers (e.g. npm, apt), how are transitive dependencies resolved using SQL?",
    o: ["Via a recursive CTE querying package_dependencies(pkg, depends_on) to resolve the complete dependency closure tree", "Using a single INNER JOIN", "Using a REGEX replace", "Using DROP VIEW"],
    c: 0,
    e: "Transitive dependencies form a directed graph; a recursive CTE discovers all direct and indirect dependencies needed for installation."
  },
  {
    q: "What is a 'Transitive Closure' in relational database theory?",
    o: ["The set of all pairs of nodes (x, y) such that y is reachable from x through a chain of one or more directed edges", "Closing all database connections after 10 minutes", "A table with zero foreign keys", "A commit operation on two tables"],
    c: 0,
    e: "The transitive closure of a graph represents all reachability relationships, computed canonically via recursive CTEs."
  },
  {
    q: "What happens if both (A -> B) and (B -> A) exist in a graph and you run a recursive CTE without cycle protection?",
    o: ["The query will loop indefinitely between A and B until it hits the recursion depth limit or runs out of memory", "The database automatically deletes one of the edges", "The query finishes instantly with NULL", "The server ignores node B"],
    c: 0,
    e: "A reciprocal relationship forms a 2-node cycle. Without a cycle filter, the engine endlessly ping-pongs between A and B until aborted."
  }
];

topic7Questions.forEach(item => {
  addMCQ("Recursive Graph & Network Paths", "Graph Traversals", "BOM & Network Paths", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 8. VERTICAL SET OPERATIONS (UNION VS UNION ALL) (15 MCQs)
// =============================================================================
const topic8Questions = [
  {
    q: "What is the primary difference between UNION and UNION ALL in SQL execution?",
    o: ["UNION purges duplicate rows by sorting or hashing; UNION ALL streams all rows directly without checking for duplicates", "UNION only works on numbers; UNION ALL works on text", "UNION requires identical column names; UNION ALL allows different column names", "UNION ALL is executed in parallel, UNION is single-threaded"],
    c: 0,
    e: "UNION enforces mathematical set uniqueness, requiring an expensive sort or hash deduplication step. UNION ALL preserves all rows, streaming directly with zero deduplication overhead."
  },
  {
    q: "Why should an engineer default to UNION ALL unless business requirements explicitly dictate deduplication?",
    o: ["UNION ALL avoids memory allocation and CPU overhead for sort/hash deduplication, preventing expensive disk spills", "UNION ALL is the only operator permitted in PostgreSQL", "UNION drops NULL values permanently", "UNION ALL automatically creates B-Tree indexes"],
    c: 0,
    e: "UNION ALL has zero deduplication overhead and never spills to disk for sorting, making it significantly faster and lighter on memory."
  },
  {
    q: "In a compound query with UNION, where are the final output column names determined?",
    o: ["Strictly by the column names or aliases projected in the FIRST SELECT query", "By the last SELECT query", "By an alphabetical combination of all queries", "They are randomly generated"],
    c: 0,
    e: "The column aliases of the first SELECT query define the output schema names. Aliases specified in subsequent UNION queries are completely ignored."
  },
  {
    q: "Where must the ORDER BY clause be placed when sorting the combined result of a UNION ALL statement?",
    o: ["At the very end of the final query, sorting the entire combined result set", "Inside each individual SELECT query", "In a separate preceding WITH clause only", "Directly after the UNION ALL keyword"],
    c: 0,
    e: "In ANSI SQL, a single global ORDER BY clause must appear at the end of the entire compound statement to sort the unified dataset."
  },
  {
    q: "What error occurs if two queries in a UNION statement project different numbers of columns?",
    o: ["The engine pads missing columns with NULLs", "A fatal syntax error: 'The used SELECT statements have a different number of columns'", "The query truncates extra columns silently", "The engine converts the query to a CROSS JOIN"],
    c: 1,
    e: "All queries participating in a set operation must project the exact same number of columns; otherwise, a schema mismatch error is raised."
  },
  {
    q: "What happens if Query 1 projects an INT column and Query 2 projects a VARCHAR column in a UNION?",
    o: ["The engine attempts implicit type conversion; if incompatible or failing, a type conversion error is raised", "The column is converted into a BLOB", "The entire table is dropped", "Query 2 is ignored"],
    c: 0,
    e: "The engine attempts to coerce data types to a common compatible type (or higher precedence type). If conversion fails, a type mismatch error occurs."
  },
  {
    q: "How does UNION treat rows where all column values are NULL?",
    o: ["It treats multiple all-NULL rows as duplicates and collapses them into a single row", "It throws an error", "It preserves all NULL rows", "It converts them to zeros"],
    c: 0,
    e: "Under set theory, duplicate all-NULL rows are identical tuples; UNION collapses multiple all-NULL rows into a single unique row."
  },
  {
    q: "In terms of database memory buffers, what buffer does UNION rely upon in MySQL?",
    o: ["sort_buffer_size or tmp_table_size", "innodb_log_buffer_size", "thread_cache_size", "key_buffer_size"],
    c: 0,
    e: "UNION uses in-memory temporary tables (tmp_table_size) or sort buffers (sort_buffer_size) to eliminate duplicates, spilling to disk if exceeded."
  },
  {
    q: "How do you add a provenance / source system tag to rows combined from two legacy tables?",
    o: ["Project a string literal: 'SELECT 'System_A' AS source, ... FROM t1 UNION ALL SELECT 'System_B' AS source, ... FROM t2'", "Use the TABLE_NAME() function", "Add an ALTER TABLE command", "Use a trigger"],
    c: 0,
    e: "Projecting a literal column in each SELECT statement (e.g. 'System_A') preserves record provenance across unioned sources."
  },
  {
    q: "Can individual queries in a UNION statement have their own independent LIMIT clauses?",
    o: ["Yes, if each individual query is enclosed in parentheses: '(SELECT ... LIMIT 5) UNION ALL (SELECT ... LIMIT 5)'", "No, LIMIT can only appear at the end of the query", "Only in Oracle", "Only if the table has no primary key"],
    c: 0,
    e: "Enclosing individual component queries in parentheses allows local LIMIT/ORDER BY clauses to take effect before the union operation."
  },
  {
    q: "What is the relational difference between a FULL OUTER JOIN and a UNION ALL of two tables?",
    o: ["FULL OUTER JOIN aligns matching rows horizontally into wider records; UNION ALL stacks rows vertically into a taller table", "They produce identical result tables", "FULL OUTER JOIN is faster than UNION ALL", "UNION ALL requires a common foreign key"],
    c: 0,
    e: "Joins combine data horizontally (expanding columns based on a key condition); Set operations combine data vertically (appending rows)."
  },
  {
    q: "If Table A has 10 rows and Table B has 10 identical rows, how many rows will 'SELECT * FROM A UNION SELECT * FROM B' return?",
    o: ["10 rows", "20 rows", "0 rows", "100 rows"],
    c: 0,
    e: "Because all 10 rows in B are identical duplicates of rows in A, UNION removes the duplicates and returns exactly 10 unique rows."
  },
  {
    q: "If Table A has 10 rows and Table B has 10 identical rows, how many rows will 'SELECT * FROM A UNION ALL SELECT * FROM B' return?",
    o: ["20 rows", "10 rows", "100 rows", "0 rows"],
    c: 0,
    e: "UNION ALL performs no deduplication and appends all rows directly: 10 + 10 = 20 rows."
  },
  {
    q: "Can you combine UNION and UNION ALL in the same compound query?",
    o: ["Yes; operators evaluate according to precedence or parenthetical grouping", "No, you cannot mix UNION and UNION ALL", "Only if there are at least 4 queries", "Only in Snowflake"],
    c: 0,
    e: "You can mix UNION and UNION ALL. Expressions in parentheses evaluate first; otherwise, evaluation proceeds sequentially from left to right."
  },
  {
    q: "In an EXPLAIN execution plan, what operator signifies the execution of a UNION ALL?",
    o: ["Append or UnionAll", "Sort Merge Join", "Nested Loop", "Filter Scan"],
    c: 0,
    e: "Database execution engines represent UNION ALL with an 'Append' (Postgres/SQL Server) or 'UnionAll' operator that simply streams subplans."
  }
];

topic8Questions.forEach(item => {
  addMCQ("Vertical Set Operations", "UNION vs UNION ALL", "Memory & Deduplication", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 9. SET DIFFERENCE & INTERSECTION (EXCEPT & INTERSECT) (15 MCQs)
// =============================================================================
const topic9Questions = [
  {
    q: "What is the mathematical result of 'Query A EXCEPT Query B' (or MINUS in Oracle)?",
    o: ["All unique rows that appear in Query A and do NOT appear in Query B", "All rows that appear in both A and B", "All rows in B that do not appear in A", "The sum of all numeric columns"],
    c: 0,
    e: "EXCEPT (set difference: A \\ B) returns distinct rows that are present in the result set of Query A but absent from Query B."
  },
  {
    q: "What is the mathematical result of 'Query A INTERSECT Query B'?",
    o: ["All distinct rows that are present in BOTH Query A and Query B", "All rows in A plus all rows in B", "Only rows that have NULL values", "The Cartesian product of A and B"],
    c: 0,
    e: "INTERSECT (set intersection: A ∩ B) returns only unique rows that are present in both the first and second query results."
  },
  {
    q: "In MySQL versions prior to 8.0.31, which lacked native INTERSECT and EXCEPT, how is 'A INTERSECT B' canonically simulated?",
    o: ["SELECT DISTINCT a.* FROM A a INNER JOIN B b ON a.id = b.id (or matching all projected columns)", "SELECT * FROM A, B", "SELECT * FROM A WHERE id NOT IN (SELECT id FROM B)", "Using GROUP BY without HAVING"],
    c: 0,
    e: "An INNER JOIN on all corresponding columns with a DISTINCT projection provides the exact relational equivalent of an INTERSECT operator."
  },
  {
    q: "In MySQL versions prior to 8.0.31, how is 'A EXCEPT B' canonically simulated?",
    o: ["SELECT DISTINCT a.* FROM A a WHERE NOT EXISTS (SELECT 1 FROM B b WHERE b.id = a.id)", "SELECT * FROM A UNION SELECT * FROM B", "SELECT * FROM A, B WHERE a.id = b.id", "Using a CROSS JOIN"],
    c: 0,
    e: "A correlated NOT EXISTS subquery (or LEFT JOIN ... WHERE right.id IS NULL) on matching keys simulates the EXCEPT (set difference) operator."
  },
  {
    q: "How does EXCEPT treat duplicate rows in the first query by default in standard SQL?",
    o: ["It eliminates duplicates from the output, returning only unique rows (equivalent to EXCEPT DISTINCT)", "It preserves all duplicate rows from A", "It throws a DuplicateKey error", "It converts duplicates to NULL"],
    c: 0,
    e: "Standard EXCEPT defaults to EXCEPT DISTINCT, returning unique rows from A that do not appear in B."
  },
  {
    q: "What does 'EXCEPT ALL' do in PostgreSQL and SQL Server?",
    o: ["It preserves duplicate counts: if A has 3 identical rows and B has 1, EXCEPT ALL returns exactly 2 rows", "It deletes all rows from both tables", "It ignores WHERE clauses", "It runs across all database schemas"],
    c: 0,
    e: "EXCEPT ALL operates on multisets (bags): if a row occurs m times in A and n times in B, it appears max(0, m - n) times in the result."
  },
  {
    q: "What is the operator precedence between UNION, INTERSECT, and EXCEPT in ANSI SQL?",
    o: ["INTERSECT has higher precedence than UNION and EXCEPT", "All set operators have equal precedence and evaluate left to right", "UNION has highest precedence", "EXCEPT has highest precedence"],
    c: 0,
    e: "In ANSI SQL standards, INTERSECT has higher operational precedence than UNION and EXCEPT, analogous to multiplication having higher precedence than addition."
  },
  {
    q: "What does evaluating '(SELECT id FROM A) EXCEPT (SELECT id FROM A)' always return?",
    o: ["Zero rows (empty set)", "All rows in A", "A syntax error", "NULL"],
    c: 0,
    e: "Subtracting any set from itself (A \\ A) always produces an empty set (0 rows)."
  },
  {
    q: "How can you perform a bidirectional ledger reconciliation to find discrepancies in both directions using EXCEPT?",
    o: ["(A EXCEPT B) UNION ALL (B EXCEPT A)", "(A INTERSECT B) EXCEPT (A UNION B)", "(A UNION ALL B) INTERSECT A", "A EXCEPT (B EXCEPT A)"],
    c: 0,
    e: "The symmetric difference (discrepancies in either table) is expressed as (A EXCEPT B) UNION ALL (B EXCEPT A)."
  },
  {
    q: "Does INTERSECT remove duplicate rows from its final output?",
    o: ["Yes, INTERSECT defaults to INTERSECT DISTINCT and purges duplicate rows", "No, it preserves all duplicates", "Only if the columns are indexed", "Only in MySQL"],
    c: 0,
    e: "Standard INTERSECT removes duplicates and returns only distinct tuples common to both datasets."
  },
  {
    q: "How do NULL values behave when comparing rows between two queries in an EXCEPT or INTERSECT operation?",
    o: ["In set operations, NULLs are treated as equal to other NULLs (i.e. two rows with NULL match each other)", "NULLs are never equal, so rows with NULLs are always dropped", "It throws a 3VL exception", "NULLs are converted to 0"],
    c: 0,
    e: "In SQL set operations (UNION, INTERSECT, EXCEPT), two NULL values are considered identical duplicates (matching 'IS NOT DISTINCT FROM' semantics)."
  },
  {
    q: "If Query A returns (1, 2, NULL) and Query B returns (NULL, 3), what does 'A INTERSECT B' return?",
    o: ["(NULL)", "Empty set", "(1, 2, 3)", "(1)"],
    c: 0,
    e: "Because NULL matches NULL in set operations, the common distinct value between the two sets is NULL."
  },
  {
    q: "In terms of physical query execution, how does an engine typically execute INTERSECT?",
    o: ["Hash Intersection (building a hash table on Query A and probing with Query B) or Merge Intersection on presorted inputs", "Nested cursor loops", "Random sampling", "Writing both tables to permanent disk storage"],
    c: 0,
    e: "Engines execute INTERSECT via Hash Intersection or Sort-Merge Intersection, matching keys between the two candidate streams."
  },
  {
    q: "Can INTERSECT be used to find users who have purchased products in all 3 categories (Electronics, Clothing, Home)?",
    o: ["Yes, by chaining: (SELECT user_id FROM purchases WHERE cat='Electronics') INTERSECT (SELECT user_id FROM purchases WHERE cat='Clothing') INTERSECT (SELECT user_id FROM purchases WHERE cat='Home')", "No, INTERSECT can only connect 2 queries", "Only if categories are numeric", "Only by using NOT IN"],
    c: 0,
    e: "Chaining INTERSECT across multiple category queries isolates users who exist in every individual category dataset."
  },
  {
    q: "What is the Oracle-specific keyword for the EXCEPT set operator?",
    o: ["MINUS", "DIFFERENCE", "SUBTRACT", "EXCLUDE"],
    c: 0,
    e: "Oracle uses the proprietary keyword 'MINUS' instead of the ANSI standard 'EXCEPT'."
  }
];

topic9Questions.forEach(item => {
  addMCQ("Set Difference & Intersection", "EXCEPT & INTERSECT", "Set-Theoretic Algebra", item.q, item.o, item.c, item.e);
});

// =============================================================================
// 10. MULTI-DIMENSIONAL GROUPING (ROLLUP, CUBE, GROUPING SETS) (15 MCQs)
// =============================================================================
const topic10Questions = [
  {
    q: "What does 'GROUP BY ROLLUP(region, country, store)' produce?",
    o: ["Hierarchical subtotals: (region, country, store), (region, country), (region), and the grand total ()", "All possible 8 combinations of the 3 columns", "Only the grand total", "A Cartesian product of the 3 columns"],
    c: 0,
    e: "ROLLUP produces N + 1 hierarchical aggregation levels, rolling up from right to left: (A, B, C), (A, B), (A), and ()."
  },
  {
    q: "For N columns in a GROUP BY clause, how many grouping levels does 'CUBE(col1, ..., colN)' generate?",
    o: ["2^N (the power set of all dimensional combinations)", "N + 1", "N * 2", "N!"],
    c: 0,
    e: "CUBE generates all possible 2^N dimensional combinations (cross-tabulation matrix), including all subtotals and the grand total."
  },
  {
    q: "What is the primary operational advantage of 'GROUPING SETS' over chained 'UNION ALL' queries?",
    o: ["GROUPING SETS computes all desired aggregation grains in a SINGLE scan of the underlying table, reducing disk I/O significantly", "GROUPING SETS runs only on memory-mapped files", "GROUPING SETS prevents duplicate rows from being inserted", "GROUPING SETS auto-generates chart graphics"],
    c: 0,
    e: "Chained UNION ALL queries scan the base table N times. GROUPING SETS scans the table once and calculates all aggregations in a single pass."
  },
  {
    q: "What problem does the 'GROUPING(column_name)' function solve?",
    o: ["It distinguishes a genuine NULL stored in the database row from a synthetic super-aggregate NULL generated by ROLLUP or CUBE", "It counts the number of groups created", "It formats numeric columns as currency", "It encrypts grouping keys"],
    c: 0,
    e: "When a dimension is rolled up, its value is represented as NULL. GROUPING(col) returns 1 if the NULL was generated by the rollup, and 0 if it is a real data value."
  },
  {
    q: "In MySQL 8.0, what is the syntax for invoking a hierarchical rollup?",
    o: ["GROUP BY col1, col2 WITH ROLLUP", "GROUP BY ROLLUP(col1, col2)", "ROLLUP BY col1, col2", "GROUP BY col1, col2 HAVING ROLLUP"],
    c: 0,
    e: "MySQL uses the proprietary 'GROUP BY col1, col2 WITH ROLLUP' syntax, whereas PostgreSQL and SQL Server use standard 'GROUP BY ROLLUP(col1, col2)'."
  },
  {
    q: "Can an ORDER BY clause reference columns with ROLLUP in MySQL without causing an error?",
    o: ["In older MySQL versions, ORDER BY with ROLLUP was forbidden; in MySQL 8.0.12+, explicit sorting is permitted", "ORDER BY is never allowed with ROLLUP in any SQL dialect", "ORDER BY is mandatory with ROLLUP", "Only if ORDER BY uses column numbers"],
    c: 0,
    e: "Historically, MySQL threw an error if ORDER BY was used with WITH ROLLUP. MySQL 8.0.12+ relaxed this, allowing sorting of rolled-up results."
  },
  {
    q: "What does 'GROUPING_ID(region, country)' return in SQL Server and Oracle?",
    o: ["An integer bitmask computed by concatenating the GROUPING() bit outputs for the specified columns", "The unique row ID of the group", "The foreign key ID", "The number of rows in the group"],
    c: 0,
    e: "GROUPING_ID() converts the binary outputs of multiple GROUPING() functions into an integer bitmask, simplifying multi-level subtotal filtering."
  },
  {
    q: "How do you represent a Grand Total row only using GROUPING SETS?",
    o: ["GROUP BY GROUPING SETS ( () )", "GROUP BY GRAND TOTAL", "GROUP BY ALL", "GROUP BY NULL"],
    c: 0,
    e: "An empty parenthetical set '()' in GROUPING SETS denotes the global grand total (aggregation over the entire table)."
  },
  {
    q: "If a company wants subtotals by (Year, Quarter) and by (Brand), but NOT the full cross-cube, which construct is most efficient?",
    o: ["GROUP BY GROUPING SETS ( (Year, Quarter), (Brand), () )", "GROUP BY CUBE(Year, Quarter, Brand)", "GROUP BY ROLLUP(Year, Quarter, Brand)", "Running 5 separate queries in Python"],
    c: 0,
    e: "GROUPING SETS allows defining exactly the required dimensional grains ((Year, Quarter), (Brand), ()) without wasting compute on unneeded combinations."
  },
  {
    q: "Why does 'CUBE(a, b, c, d, e)' pose severe performance hazards on massive tables?",
    o: ["Because 5 columns generate 2^5 = 32 distinct grouping aggregation tiers, multiplying intermediate calculation and memory overhead exponentially", "Because CUBE is single-threaded only", "Because CUBE requires primary keys on all 5 columns", "Because it drops the base table"],
    c: 0,
    e: "The exponential 2^N explosion of CUBE means 5 dimensions generate 32 grouping sets, 10 dimensions generate 1,024 grouping sets, rapidly exhausting memory."
  },
  {
    q: "What value does 'GROUPING(dept_id)' return for an individual department's subtotal row?",
    o: ["0, because dept_id is an active grouping key in this row, not aggregated away", "1", "NULL", "10"],
    c: 0,
    e: "GROUPING(col) returns 0 when the column is part of the grouping grain for that row, and 1 when it has been collapsed into a super-aggregate."
  },
  {
    q: "How do you label a Grand Total row cleanly using CASE WHEN and GROUPING()?",
    o: ["SELECT CASE WHEN GROUPING(region) = 1 THEN 'Grand Total' ELSE region END AS region_name, SUM(sales) ...", "SELECT IF(region IS NULL, 'Grand Total', region)", "SELECT COALESCE(region, 'Grand Total')", "SELECT NVL(region, 'Grand Total')"],
    c: 0,
    e: "Using CASE WHEN GROUPING(col) = 1 ensures that real NULL data values are not erroneously renamed to 'Grand Total', unlike naive COALESCE()."
  },
  {
    q: "Why is using 'COALESCE(region, 'Grand Total')' dangerous with ROLLUP when data quality is imperfect?",
    o: ["If the base data has a row where region is legitimately NULL, COALESCE will mislabel that real row as the 'Grand Total'!", "COALESCE is slower than CASE WHEN", "COALESCE crashes on text columns", "COALESCE disables index scans"],
    c: 0,
    e: "If an actual record has region = NULL, COALESCE converts it to 'Grand Total', corrupting the business report. GROUPING() safely avoids this."
  },
  {
    q: "What is the physical operator used in PostgreSQL execution plans for GROUP BY ROLLUP and CUBE?",
    o: ["Mixed Aggregate or GroupAggregate / HashAggregate with Grouping Sets", "Nested Loop Join", "Seq Scan with Limit", "Bitmap Index Scan"],
    c: 0,
    e: "PostgreSQL displays 'Mixed Aggregate' or 'HashAggregate' with the list of Planned Partitions/Grouping Sets in EXPLAIN output."
  },
  {
    q: "Can you combine normal columns with ROLLUP in the same GROUP BY clause: 'GROUP BY department, ROLLUP(year, quarter)'?",
    o: ["Yes; this performs a partial rollup where department is always preserved as a grouping key for every generated tier", "No, ROLLUP must wrap all columns in the GROUP BY", "Only in Snowflake", "Only if department is an integer"],
    c: 0,
    e: "Partial rollups (e.g. 'GROUP BY department, ROLLUP(year, quarter)') hold department constant while rolling up year and quarter hierarchically."
  }
];

topic10Questions.forEach(item => {
  addMCQ("Multi-Dimensional Grouping", "ROLLUP & CUBE", "GROUPING Sets & Indicators", item.q, item.o, item.c, item.e);
});

// =============================================================================
// AUDIT & OUTPUT
// =============================================================================
console.log(`Total Section 10 MCQs Generated: ${mcqs.length}`);
const distribution = [0, 0, 0, 0];
mcqs.forEach(m => distribution[m.correctIndex]++);
console.log(`Option Distribution [A, B, C, D]: [ ${distribution.join(', ')} ]`);

const outputPath = path.join(__dirname, 'section10_150_mcqs.json');
fs.writeFileSync(outputPath, JSON.stringify(mcqs, null, 2), 'utf8');
console.log(`Saved 150 Section 10 MCQs to ${outputPath}`);
