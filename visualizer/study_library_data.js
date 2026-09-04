// =============================================================================
// SQL MASTERY PLATFORM — COMPREHENSIVE STUDY LIBRARY & KNOWLEDGE REPOSITORY
// Structured, searchable, textbook-grade study materials organized into 7 sections
// =============================================================================

window.STUDY_LIBRARY = [
  // ---------------------------------------------------------------------------
  // SECTION 00: Database Theory, Architecture & Technical Interview Prep
  // ---------------------------------------------------------------------------
  {
    id: 'sec_theory_architecture',
    pillarId: 'pillar0',
    icon: '🏛️',
    title: '00. Database Theory & Technical Interview Prep',
    badge: 'Interview Foundations',
    badgeClass: 'pill-from',
    readTime: '8 min read',
    summary: 'RDBMS vs NoSQL, OLTP vs OLAP columnar storage, ACID transaction isolation levels, and B-Tree indexing mechanics.',
    sections: [
      {
        heading: '1. RDBMS vs. NoSQL Architectural Trade-offs',
        content: `In financial technology and mission-critical enterprise systems, choosing your storage architecture dictates reliability:
- **RDBMS (PostgreSQL, MySQL)**: Relational tables adhering to strict 3rd Normal Form (3NF). Guarantees complete consistency across foreign key constraints. Essential for banking ledgers, payments, and trade reconciliations.
- **NoSQL (MongoDB, Redis, Cassandra)**: Document and key-value stores. Trade ACID transactions for horizontal scaling and arbitrary schema elasticity. Best for user session caching, raw clickstream telemetry, and unstructured profiles.`
      },
      {
        heading: '2. OLTP vs. OLAP: Row-Oriented vs. Columnar Storage',
        content: `Understanding how disk pages physically organize data separates senior data engineers from beginners:
- **OLTP (Online Transaction Processing - Postgres/Aurora)**: Stores complete rows contiguously on disk pages. Fast sub-5ms single-row reads and writes. Bottlenecks when scanning millions of rows to calculate aggregates.
- **OLAP (Online Analytical Processing - Snowflake, BigQuery, ClickHouse)**: Stores each column separately across contiguous micro-partitions. A query calculating \`SUM(amount_usd)\` reads **only** that column off NVMe storage, skipping all other columns. This provides 20x to 50x query speedups and 10x compression ratios.`
      },
      {
        heading: '3. ACID Guarantees & Transaction Isolation Levels',
        content: `The 4 foundational guarantees protecting concurrent database operations:
- **Atomicity**: All-or-nothing execution.
- **Consistency**: All schema and constraint rules must hold true after commit.
- **Isolation**: Concurrent transactions cannot observe corrupt partial states.
- **Durability**: Committed data is written to non-volatile WAL logs.

**The 4 Isolation Levels:**
1. *Read Uncommitted*: Allows **Dirty Reads** (reading uncommitted data).
2. *Read Committed*: Default in PostgreSQL. Eliminates dirty reads; allows non-repeatable reads.
3. *Repeatable Read*: Default in MySQL InnoDB. Rows read once retain identical values throughout the transaction.
4. *Serializable*: Highest safety. Emulates serial execution, eliminating phantom rows at the cost of lock contention.`
      },
      {
        heading: '4. B-Tree Indexing & Buffer Pool Mechanics',
        content: `How database engines locate 1 row out of 100,000,000 in ~3 I/O hops:
- **B-Tree Anatomy**: Root -> Internal Branches -> Leaf Nodes. \`O(log N)\` search complexity.
- **Clustered Index**: Defines the actual physical order of table rows on disk pages (almost always the Primary Key).
- **Secondary Index**: Separate search tree pointing back to the clustered row ID.
- **Index Seek vs. Full Table Scan**: An *Index Seek* traverses directly to the target leaf page; a *Full Table Scan (FTS)* sequentially reads every disk page in the table.
- **The Buffer Pool**: Memory cache in RAM. An index seek hitting the buffer pool executes in microseconds without physical disk reads.`
      }
    ],
    interviewGotchas: [
      {
        title: "The Function Wrap Index Trap",
        trap: "Adding WHERE UPPER(email) = 'USER@DOMAIN.COM' forces a Full Table Scan because the index was created on raw 'email', not 'UPPER(email)'. Fix: Use Functional Indexes or normalize inputs before writing."
      },
      {
        title: "SELECT * Columnar Cost Multiplier",
        trap: "Running SELECT * in Snowflake or BigQuery forces the engine to decompress and read every column from disk, multiplying cloud compute costs by 20x to 50x."
      }
    ]
  },
  // ---------------------------------------------------------------------------
  // SECTION 01: Physical Query Execution Order
  // ---------------------------------------------------------------------------
  {
    id: 'sec_execution_order',
    pillarId: 'pillar1',
    icon: '⚡',
    title: '01. Physical Execution Order (The Engine Pipeline)',
    badge: 'Core Architecture',
    badgeClass: 'pill-from',
    readTime: '6 min read',
    summary: 'Why SQL code is written in one order (SELECT ... FROM) but executed by the relational engine in a completely different physical sequence.',
    sections: [
      {
        heading: 'The Lexical vs Physical Paradox',
        content: `In declarative SQL, queries are written in **Lexical Order**:
\`\`\`sql
SELECT customer_id, COUNT(*) AS orders_count
FROM Orders
WHERE order_date >= '2026-01-01'
GROUP BY customer_id
HAVING COUNT(*) >= 5
ORDER BY orders_count DESC
LIMIT 10;
\`\`\`
However, the relational storage engine executes this in **Physical Execution Order**:
1. **FROM & JOINs**: Binds the target tables from disk storage into virtual working memory.
2. **WHERE**: Evaluates row-by-row boolean predicates, discarding failing records.
3. **GROUP BY**: Partitions the surviving rows into discrete aggregation buckets.
4. **HAVING**: Filters group summary buckets based on aggregate function results.
5. **SELECT**: Evaluates column projections, mathematical expressions, and assigns column aliases.
6. **DISTINCT**: Deduplicates identical output tuples.
7. **ORDER BY**: Sorts the projected result set using temporary sort buffers or disk spills.
8. **LIMIT / OFFSET**: Truncates the result stream to the requested row count.`
      },
      {
        heading: 'Why This Explains 90% of SQL Syntax Errors',
        content: `Once you understand physical execution order, confusing error messages become obvious:
- **Error: Column alias does not exist in WHERE**: You cannot write \`WHERE annual_salary > 100000\` if \`annual_salary\` was created as an alias in \`SELECT salary * 12 AS annual_salary\`. Physical Step 02 (WHERE) executes *before* Step 05 (SELECT)!
- **Error: Invalid use of group function in WHERE**: You cannot write \`WHERE COUNT(*) > 5\`. Counting requires groups to exist, but grouping doesn't happen until Step 03. You must use \`HAVING\` (Step 04).
- **Aliases CAN be used in ORDER BY**: You *can* write \`ORDER BY annual_salary DESC\` because \`ORDER BY\` (Step 07) runs *after* \`SELECT\` (Step 05).`
      }
    ],
    svgDiagram: `
      <svg viewBox="0 0 760 130" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect width="760" height="130" fill="#0c0c10" rx="8" stroke="#26262e"/>
        <g transform="translate(20, 25)">
          <!-- Steps -->
          <g transform="translate(0, 0)">
            <rect width="70" height="45" rx="4" fill="#181820" stroke="#9ec5ad"/>
            <text x="35" y="20" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">01. FROM</text>
            <text x="35" y="34" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Allocate Set</text>
          </g>
          <path d="M 72 22 L 88 22" stroke="#52525b" stroke-width="2"/>
          
          <g transform="translate(90, 0)">
            <rect width="70" height="45" rx="4" fill="#181820" stroke="#d69d8f"/>
            <text x="35" y="20" fill="#d69d8f" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">02. WHERE</text>
            <text x="35" y="34" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Filter Rows</text>
          </g>
          <path d="M 162 22 L 178 22" stroke="#52525b" stroke-width="2"/>

          <g transform="translate(180, 0)">
            <rect width="80" height="45" rx="4" fill="#181820" stroke="#beafcc"/>
            <text x="40" y="20" fill="#beafcc" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">03. GROUP</text>
            <text x="40" y="34" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Bucket Rows</text>
          </g>
          <path d="M 262 22 L 278 22" stroke="#52525b" stroke-width="2"/>

          <g transform="translate(280, 0)">
            <rect width="80" height="45" rx="4" fill="#181820" stroke="#beafcc"/>
            <text x="40" y="20" fill="#beafcc" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">04. HAVING</text>
            <text x="40" y="34" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Filter Buckets</text>
          </g>
          <path d="M 362 22 L 378 22" stroke="#52525b" stroke-width="2"/>

          <g transform="translate(380, 0)">
            <rect width="80" height="45" rx="4" fill="#181820" stroke="#a4b7cf"/>
            <text x="40" y="20" fill="#a4b7cf" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">05. SELECT</text>
            <text x="40" y="34" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Project &amp; Alias</text>
          </g>
          <path d="M 462 22 L 478 22" stroke="#52525b" stroke-width="2"/>

          <g transform="translate(480, 0)">
            <rect width="70" height="45" rx="4" fill="#181820" stroke="#dfcaa9"/>
            <text x="35" y="20" fill="#dfcaa9" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">06. ORDER</text>
            <text x="35" y="34" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Sort Buffer</text>
          </g>
          <path d="M 552 22 L 568 22" stroke="#52525b" stroke-width="2"/>

          <g transform="translate(570, 0)">
            <rect width="70" height="45" rx="4" fill="#181820" stroke="#dfcaa9"/>
            <text x="35" y="20" fill="#dfcaa9" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">07. LIMIT</text>
            <text x="35" y="34" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Truncate Stream</text>
          </g>
        </g>
        <text x="380" y="105" fill="#71717a" font-family="monospace" font-size="9.5" text-anchor="middle">Data flows left-to-right through internal engine stages</text>
      </svg>
    `,
    diff: {
      badTitle: "❌ ANTI-PATTERN: Filtering on SELECT alias in WHERE",
      badSql: `-- Fails: "Unknown column 'projected_comp' in 'where clause'"
SELECT employee_id,
       salary * 1.2 AS projected_comp
FROM Employees
WHERE projected_comp > 100000;`,
      badExplanation: "Step 02 (WHERE) executes BEFORE Step 05 (SELECT). When the engine filters rows, the alias 'projected_comp' has not yet been bound into working memory.",
      goodTitle: "✅ PRODUCTION STANDARD: Filter raw mathematical expression",
      goodSql: `-- Correct: Re-evaluates expression or wraps in CTE
SELECT employee_id,
       salary * 1.2 AS projected_comp
FROM Employees
WHERE salary * 1.2 > 100000;`,
      goodExplanation: "Re-evaluates the arithmetic expression during row filtration. Enables B-Tree index range scans or subquery pre-computation."
    },
    sandbox: {
      table: 'Employees',
      title: 'Fix Lexical Alias Violation in WHERE',
      instruction: 'The query below fails during Step 02 because `projected_comp` is not allocated until Step 05 (SELECT). Rewrite the WHERE clause using the mathematical expression `salary * 1.2 > 120000` to find qualifying high-earners.',
      initialSql: 'SELECT emp_id, first_name, salary * 1.2 AS projected_comp\nFROM Employees\nWHERE projected_comp > 120000;',
      solutionSql: 'SELECT emp_id, first_name, salary * 1.2 AS projected_comp\nFROM Employees\nWHERE salary * 1.2 > 120000;',
      hint: 'Column aliases defined in SELECT do not exist yet when WHERE runs. Replace `projected_comp` with the underlying arithmetic `salary * 1.2 > 120000`.'
    },
    quiz: {
      question: "Which clause is the very FIRST to physically execute when a relational engine processes a query?",
      options: [
        "A) SELECT (Allocates projection buffers)",
        "B) FROM (Binds virtual working tables & joins)",
        "C) WHERE (Evaluates row-by-row boolean filters)",
        "D) ORDER BY (Allocates temporary sort buffers)"
      ],
      correctIndex: 1,
      explanation: "Step 01 is always FROM (and any JOIN operations). The engine cannot filter rows (WHERE), partition buckets (GROUP BY), or project columns (SELECT) until the target tables are bound into memory."
    },
    gotchas: [
      'SELECT is NOT Step 01! It executes after filtering and grouping.',
      'Column aliases created in SELECT cannot be filtered in WHERE.',
      'ORDER BY and LIMIT are the final stages before network transmission.'
    ],
    quickActions: {
      labTrack: 'track01',
      questId: 0,
      presetQuery: "SELECT department, COUNT(*) AS team_size FROM Employees WHERE salary >= 60000 GROUP BY department HAVING COUNT(*) >= 2 ORDER BY team_size DESC LIMIT 3;"
    }
  },

  // ---------------------------------------------------------------------------
  // SECTION 02: Foundations & Row Filtering
  // ---------------------------------------------------------------------------
  {
    id: 'sec_foundations',
    pillarId: 'pillar1',
    icon: '📘',
    title: '02. Foundations & Row Filtering (SELECT, WHERE, DISTINCT)',
    badge: 'Pillar 01',
    badgeClass: 'pill-where',
    readTime: '8 min read',
    summary: 'Master the fundamental mechanics of table retrieval, projection, pattern matching, boolean predicates, and sorting.',
    sections: [
      {
        heading: 'SELECT: Column Projection vs Computation',
        content: `\`SELECT\` determines which attributes of surviving records are projected into the client result set.
- **Literal Projection**: \`SELECT name, salary FROM Employees;\`
- **Computed Expressions**: \`SELECT name, salary * 0.15 AS annual_bonus FROM Employees;\`
- **String Functions**: \`SELECT UPPER(name), SUBSTRING(name, 1, 3) FROM Employees;\`
- **DISTINCT Deduplication**: \`SELECT DISTINCT department FROM Employees;\` instructs the engine to sort or hash output records and eliminate duplicate rows.`
      },
      {
        heading: 'WHERE & 3-Valued Boolean Logic',
        content: `SQL does not use standard 2-valued boolean logic (\`TRUE\` or \`FALSE\`). It uses **Three-Valued Logic**: \`TRUE\`, \`FALSE\`, and \`UNKNOWN\` (caused by \`NULL\`).
- A row passes the \`WHERE\` filter **ONLY if the predicate evaluates strictly to TRUE**.
- If a condition evaluates to \`UNKNOWN\`, the row is discarded.
- \`WHERE salary > 50000\` will drop employees whose salary is \`NULL\`, because \`NULL > 50000\` yields \`UNKNOWN\`!
- To check for nullability, you must use \`IS NULL\` or \`IS NOT NULL\`. \`col = NULL\` will NEVER match any row!`
      },
      {
        heading: 'ORDER BY: Multi-Column Tie-Breakers',
        content: `When sorting with \`ORDER BY\`, the engine applies criteria sequentially from left to right:
\`\`\`sql
SELECT name, department, salary
FROM Employees
ORDER BY salary DESC, name ASC;
\`\`\`
1. Rows are sorted primarily by \`salary\` in descending order.
2. If two employees earn the exact same salary, the engine applies the tie-breaker: \`name ASC\` in alphabetical order.
3. In MySQL, \`NULL\` values sort FIRST in \`ASC\` order and LAST in \`DESC\` order.`
      }
    ],
    diff: {
      badTitle: "❌ ANTI-PATTERN: Dangerous equality check with NULL",
      badSql: `-- Checking missing records with = NULL
SELECT name, department
FROM Employees
WHERE manager_id = NULL;
-- Returns 0 rows! NULL = NULL yields UNKNOWN.`,
      badExplanation: "In 3-valued boolean logic, NULL represents unknown state. Comparing anything with = NULL yields UNKNOWN, which evaluates to false in WHERE.",
      goodTitle: "✅ PRODUCTION STANDARD: Explicit Nullability IS NULL",
      goodSql: `-- Correctly matches unassigned top leadership
SELECT name, department
FROM Employees
WHERE manager_id IS NULL;
-- Returns top executives with no superior`,
      goodExplanation: "IS NULL and IS NOT NULL are special unary operators designed specifically to inspect memory existence without invoking 3-valued value equality."
    },
    sandbox: {
      table: 'Employees',
      title: 'Defeat the = NULL Unknown Trap',
      instruction: 'The query below yields 0 rows because `salary = NULL` evaluates to UNKNOWN for all records. Fix the query to retrieve all non-null engineering staff earning at least $100,000.',
      initialSql: 'SELECT emp_id, first_name, department, salary\nFROM Employees\nWHERE salary = NULL;',
      solutionSql: 'SELECT emp_id, first_name, department, salary\nFROM Employees\nWHERE department = \'Engineering\' AND salary >= 100000;',
      hint: 'Never use `= NULL`. Use explicit conditions such as `department = \'Engineering\' AND salary >= 100000` or `salary IS NOT NULL`.'
    },
    quiz: {
      question: "What is the exact evaluation of the boolean expression: (NULL = NULL) OR (5 = 5)?",
      options: [
        "A) UNKNOWN",
        "B) FALSE",
        "C) TRUE",
        "D) NULL Pointer Exception"
      ],
      correctIndex: 2,
      explanation: "In 3-valued logic: NULL = NULL evaluates to UNKNOWN. However, 5 = 5 evaluates to TRUE. In short-circuiting disjunction: UNKNOWN OR TRUE evaluates strictly to TRUE!"
    },
    gotchas: [
      'NULL = NULL yields UNKNOWN, never TRUE. Always use IS NULL.',
      'NOT IN with any NULL value in the list always returns 0 rows! (The Fatal NOT IN trap).',
      'LIMIT without an ORDER BY produces non-deterministic, random results across engine restarts.'
    ],
    quickActions: {
      labTrack: 'track01',
      questId: 1,
      presetQuery: "SELECT id, name, department, salary FROM Employees WHERE department = 'Engineering' AND salary >= 80000 ORDER BY salary DESC, name ASC LIMIT 5;"
    }
  },

  // ---------------------------------------------------------------------------
  // SECTION 03: Conditional Logic & Decision Trees (CASE WHEN)
  // ---------------------------------------------------------------------------
  {
    id: 'sec_casewhen',
    pillarId: 'pillar2',
    icon: '🔀',
    title: '03. Conditional Logic & Decision Trees (CASE WHEN)',
    badge: 'Pillar 02',
    badgeClass: 'pill-case',
    readTime: '7 min read',
    summary: 'Branching logic, waterfall short-circuiting rules, geometry proofs, and conditional pivoting.',
    sections: [
      {
        heading: 'The 5 Pillars of a Searched CASE Expression',
        content: `A Searched \`CASE\` expression allows arbitrary boolean predicates in each branch:
\`\`\`sql
CASE
  WHEN condition_1 THEN result_1
  WHEN condition_2 THEN result_2
  ELSE fallback_result
END
\`\`\`
- **CASE**: Opens the scalar expression block.
- **WHEN**: Tests a boolean condition.
- **THEN**: Returns the output scalar value if the condition is TRUE.
- **ELSE**: Optional fallback. If omitted and no branch matches, returns \`NULL\`.
- **END**: Terminates the block.`
      },
      {
        heading: 'The Waterfall Short-Circuit Rule',
        content: `SQL evaluates \`CASE\` statements from **top to bottom** and exits immediately (**short-circuits**) at the very first \`TRUE\` condition!
Subsequent branches are completely ignored, even if they would also evaluate to TRUE.

#### The Classic Triangle Trap (HackerRank):
Given sides A, B, C:
\`\`\`sql
-- WRONG (Equilateral check matches first, but invalid triangles pass!)
CASE
  WHEN A = B AND B = C THEN 'Equilateral'
  WHEN A = B THEN 'Isosceles'
  WHEN A + B <= C THEN 'Not A Triangle' -- UNREACHABLE for (20, 20, 40)!
END

-- CORRECT: Geometry inequality MUST come first!
CASE
  WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
  WHEN A = B AND B = C THEN 'Equilateral'
  WHEN A = B OR B = C OR A = C THEN 'Isosceles'
  ELSE 'Scalene'
END
\`\`\``
      },
      {
        heading: 'Conditional Aggregations (Pivoting Data)',
        content: `You can embed \`CASE WHEN\` inside aggregate functions to pivot rows into columns without complex subqueries:
\`\`\`sql
SELECT department,
       COUNT(CASE WHEN salary >= 100000 THEN 1 END) AS high_earners,
       COUNT(CASE WHEN salary < 100000 THEN 1 END) AS standard_earners
FROM Employees
GROUP BY department;
\`\`\``
      }
    ],
    diff: {
      badTitle: "❌ ANTI-PATTERN: Equilateral check before Triangle Inequality",
      badSql: `-- Broken HackerRank logic:
CASE
  WHEN A = B AND B = C THEN 'Equilateral'
  WHEN A = B OR B = C THEN 'Isosceles'
  WHEN A + B <= C THEN 'Not A Triangle' -- NEVER REACHED for (20,20,40)!
  ELSE 'Scalene'
END`,
      badExplanation: "CASE is a waterfall that exits at the FIRST true branch. Sides (20, 20, 40) match A = B first, falsely classifying an impossible straight line as an Isosceles triangle!",
      goodTitle: "✅ PRODUCTION STANDARD: Validate geometric boundary first",
      goodSql: `-- Bulletproof geometry validation:
CASE
  WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
  WHEN A = B AND B = C THEN 'Equilateral'
  WHEN A = B OR B = C OR A = C THEN 'Isosceles'
  ELSE 'Scalene'
END`,
      goodExplanation: "Always test the disqualifying condition or most restrictive domain constraint first before evaluating nested subtypes."
    },
    sandbox: {
      table: 'TRIANGLES',
      title: 'Short-Circuit the Triangle Trap',
      instruction: 'The waterfall evaluation of CASE exits at the first matching branch. In the initial query, invalid triangles like (20, 20, 40) falsely match Isosceles. Reorder the branches so the geometric inequality check is at the top!',
      initialSql: 'SELECT A, B, C,\n       CASE\n           WHEN A = B AND B = C THEN \'Equilateral\'\n           WHEN A = B OR B = C OR A = C THEN \'Isosceles\'\n           WHEN A + B <= C OR A + C <= B OR B + C <= A THEN \'Not A Triangle\'\n           ELSE \'Scalene\'\n       END AS triangle_type\nFROM TRIANGLES;',
      solutionSql: 'SELECT A, B, C,\n       CASE\n           WHEN A + B <= C OR A + C <= B OR B + C <= A THEN \'Not A Triangle\'\n           WHEN A = B AND B = C THEN \'Equilateral\'\n           WHEN A = B OR B = C OR A = C THEN \'Isosceles\'\n           ELSE \'Scalene\'\n       END AS triangle_type\nFROM TRIANGLES;',
      hint: 'Move the line `WHEN A + B <= C OR A + C <= B OR B + C <= A THEN \'Not A Triangle\'` directly above the Equilateral check.'
    },
    quiz: {
      question: "What will CASE WHEN salary > 80000 THEN 'Senior' WHEN salary > 50000 THEN 'Mid' ELSE 'Junior' END return for an employee with salary = NULL?",
      options: [
        "A) 'Senior'",
        "B) 'Mid'",
        "C) 'Junior'",
        "D) NULL"
      ],
      correctIndex: 2,
      explanation: "Both NULL > 80000 and NULL > 50000 evaluate to UNKNOWN (failing the WHEN branches). Execution falls through to the explicit ELSE branch, returning 'Junior'."
    },
    gotchas: [
      'All THEN and ELSE expressions must evaluate to compatible data types.',
      'Omitting ELSE defaults silently to NULL. Always supply an explicit ELSE in production.',
      'Order matters! Place the most restrictive or validating condition at the top.'
    ],
    quickActions: {
      labTrack: 'track02',
      questId: 8,
      presetQuery: "SELECT A, B, C, CASE WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle' WHEN A = B AND B = C THEN 'Equilateral' WHEN A = B OR B = C OR A = C THEN 'Isosceles' ELSE 'Scalene' END AS triangle_type FROM TRIANGLES;"
    }
  },

  // ---------------------------------------------------------------------------
  // SECTION 04: Aggregations & Group Summaries (GROUP BY & HAVING)
  // ---------------------------------------------------------------------------
  {
    id: 'sec_aggregations',
    pillarId: 'pillar3',
    icon: '📊',
    title: '04. Aggregations & Group Summaries (GROUP BY & HAVING)',
    badge: 'Pillar 03',
    badgeClass: 'pill-group',
    readTime: '9 min read',
    summary: 'The Big 5 aggregate functions, the NULL trap, the Strict Non-Aggregated column rule, and the two-gate filter architecture.',
    sections: [
      {
        heading: 'The Big 5 Aggregate Functions & The NULL Trap',
        content: `Aggregate functions collapse multiple input rows into a single scalar summary value:
- **COUNT(*)**: Counts physical rows in the bucket, including rows containing NULLs.
- **COUNT(column)**: Counts non-NULL entries in that specific column!
- **COUNT(DISTINCT column)**: Counts unique non-NULL values.
- **SUM(column)**: Sums values, ignoring NULLs.
- **AVG(column)**: Computes \`SUM(col) / COUNT(col)\`. Crucial: it divides by non-NULL rows, NOT total rows!
- **MIN(column) / MAX(column)**: Extreme scalar values, ignoring NULLs.`
      },
      {
        heading: 'The Strict Non-Aggregated Column Rule',
        content: `Under the SQL standard (\`ONLY_FULL_GROUP_BY\` in MySQL/PostgreSQL):
**Every column appearing in the SELECT list must either:**
1. Appear in the \`GROUP BY\` clause, OR
2. Be enclosed within an aggregate function (\`COUNT\`, \`SUM\`, \`MAX\`, etc.).

\`\`\`sql
-- ILLEGAL: name is not in GROUP BY and has no aggregate function!
SELECT department, name, AVG(salary)
FROM Employees
GROUP BY department;

-- LEGAL:
SELECT department, AVG(salary), MAX(hire_year)
FROM Employees
GROUP BY department;
\`\`\``
      },
      {
        heading: 'The Two-Gate Architecture: WHERE vs HAVING',
        content: `SQL employs a dual-gate pipeline for filtering aggregated data:
- **Gate 1 (WHERE)**: Evaluates raw individual records *before* aggregation. High performance; reduces grouping overhead.
- **Gate 2 (HAVING)**: Evaluates computed group summaries *after* aggregation has finished.
\`\`\`sql
SELECT department, COUNT(*) AS team_size, AVG(salary) AS avg_pay
FROM Employees
WHERE salary >= 60000         -- Gate 1: Drop interns and junior staff
GROUP BY department
HAVING COUNT(*) >= 2;        -- Gate 2: Keep only departments with at least 2 qualifying staff
\`\`\``
      }
    ],
    diff: {
      badTitle: "❌ ANTI-PATTERN: Selecting non-aggregated column in GROUP BY",
      badSql: `-- Illegal under SQL-92 / ONLY_FULL_GROUP_BY:
SELECT department, name, MAX(salary)
FROM Employees
GROUP BY department;
-- Fails: "name is not in GROUP BY clause and contains nonaggregated column"`,
      badExplanation: "A department has 50 different employee names. Without an aggregate function or grouping key, the engine has no deterministic way to pick which name to pair with the single maximum salary.",
      goodTitle: "✅ PRODUCTION STANDARD: Enclose or partition explicitly",
      goodSql: `-- Solution 1: Aggregate or omit
SELECT department, MAX(salary) AS top_salary,
       COUNT(*) AS total_staff
FROM Employees
GROUP BY department;
-- Solution 2: Window function if row details are needed`,
      goodExplanation: "Strictly guarantees that every projected column is either 1:1 with the grouping grain or reduced to a deterministic scalar summary."
    },
    sandbox: {
      table: 'Employees',
      title: 'Eliminate ONLY_FULL_GROUP_BY Violation',
      instruction: 'The query violates the SQL standard by projecting non-aggregated column `first_name`. Remove `first_name`, include `COUNT(*) AS team_size`, and filter with `HAVING COUNT(*) >= 2`.',
      initialSql: 'SELECT department, first_name, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY department;',
      solutionSql: 'SELECT department, COUNT(*) AS team_size, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY department\nHAVING COUNT(*) >= 2;',
      hint: 'Every column in SELECT must be in GROUP BY or wrapped in an aggregate function. Remove `first_name` and add `COUNT(*) AS team_size` with `HAVING COUNT(*) >= 2`.'
    },
    quiz: {
      question: "A table has 4 rows with bonus values: [1000, 2000, NULL, 3000]. What does AVG(bonus) return?",
      options: [
        "A) 1500 (6000 / 4)",
        "B) 2000 (6000 / 3)",
        "C) NULL",
        "D) 0"
      ],
      correctIndex: 1,
      explanation: "The SQL standard dictates that AVG(column) ignores NULLs completely. It calculates SUM(bonus) / COUNT(bonus) = 6000 / 3 = 2000, NOT dividing by the total physical rows (4)!"
    },
    gotchas: [
      'AVG() ignores NULLs! If 1 employee earns 100k and 1 earns NULL, AVG is 100k, not 50k!',
      'Never put aggregate functions in WHERE. Use HAVING.',
      'HAVING without a GROUP BY aggregates the entire table into a single summary row.'
    ],
    quickActions: {
      labTrack: 'trackAggregations',
      questId: 12,
      presetQuery: "SELECT department, COUNT(*) AS total_staff, COUNT(bonus) AS bonus_recipients, AVG(salary) AS avg_base_pay FROM Employees GROUP BY department HAVING COUNT(*) >= 2;"
    }
  },

  // ---------------------------------------------------------------------------
  // SECTION 05: Relational Multi-Table JOINs Masterclass
  // ---------------------------------------------------------------------------
  {
    id: 'sec_joins',
    pillarId: 'pillar4',
    icon: '🔗',
    title: '05. Relational Multi-Table JOINs Masterclass',
    badge: 'Pillar 04',
    badgeClass: 'pill-join',
    readTime: '10 min read',
    summary: 'Mastering INNER, LEFT, RIGHT, FULL, ANTI-JOIN, CROSS, and SELF JOINs with exact relational Venn mechanics.',
    sections: [
      {
        heading: 'The Relational Bridge (PK <-> FK)',
        content: `Relational databases avoid redundant duplication by normalizing data into distinct entities connected by keys:
- **Primary Key (PK)**: Uniquely identifies a row in the parent table (e.g., \`Departments.dept_id\`).
- **Foreign Key (FK)**: A reference column in the child table pointing to the parent PK (e.g., \`Employees.dept_id\`).
The \`ON\` clause specifies the equality bridge connecting the two.`
      },
      {
        heading: 'The 6 Core JOIN Topologies',
        content: `1. **INNER JOIN**: Keeps rows ONLY when the join predicate evaluates to TRUE on both sides. Unassigned employees and empty departments are excluded.
2. **LEFT JOIN (LEFT OUTER JOIN)**: Preserves ALL rows from the Left table. If a row has no match in the Right table, Right columns are filled with \`NULL\`.
3. **RIGHT JOIN**: Preserves ALL rows from the Right table, filling Left columns with \`NULL\` if unmatched.
4. **FULL OUTER JOIN**: Symmetric union. Preserves all rows from both tables, with NULLs on either side where matches do not exist.
5. **ANTI-JOIN (Orphan Hunter)**: Combines \`LEFT JOIN\` with \`WHERE right_table.id IS NULL\` to isolate rows that have ZERO matches.
6. **CROSS JOIN**: Computes the Cartesian product of Table A ($N$ rows) $\\times$ Table B ($M$ rows) = $N \\times M$ combined rows.`
      },
      {
        heading: 'The Deadly ON vs WHERE Outer Join Filter Trap',
        content: `One of the most frequent interview traps in database engineering:
\`\`\`sql
-- TRAP: Putting right-table filter in WHERE silently converts LEFT JOIN to INNER JOIN!
SELECT e.name, d.dept_name, d.location
FROM Employees AS e
LEFT JOIN Departments AS d
  ON e.dept_id = d.dept_id
WHERE d.location = 'San Francisco';
-- Evan Vance (unassigned employee) had d.location = NULL.
-- In WHERE, NULL = 'San Francisco' evaluates to UNKNOWN, so Evan is dropped!

-- CORRECT: Filter the right table in the ON clause to preserve left rows:
SELECT e.name, d.dept_name, d.location
FROM Employees AS e
LEFT JOIN Departments AS d
  ON e.dept_id = d.dept_id
  AND d.location = 'San Francisco';
\`\`\``
      },
      {
        heading: 'Self-Joins for Hierarchies',
        content: `A **Self-Join** pairs a table with itself using distinct table aliases:
\`\`\`sql
SELECT emp.name AS employee,
       mgr.name AS direct_manager
FROM Employees AS emp
LEFT JOIN Employees AS mgr
  ON emp.manager_id = mgr.emp_id;
\`\`\`
Because top executives (like the CEO) have \`manager_id = NULL\`, a \`LEFT JOIN\` ensures they are not omitted from the organizational chart!`
      }
    ],
    diff: {
      badTitle: "❌ ANTI-PATTERN: Outer table filter in WHERE (Converts to INNER)",
      badSql: `-- Silent Bug: Intended to get ALL employees with dept info if in NY:
SELECT e.name, d.dept_name, d.city
FROM Employees e
LEFT JOIN Departments d
  ON e.dept_id = d.dept_id
WHERE d.city = 'New York';
-- Unassigned employees have d.city = NULL. NULL = 'New York' fails WHERE!`,
      badExplanation: "WHERE runs AFTER the LEFT JOIN has completed. Rows where the right table had no match have d.city = NULL. The predicate d.city = 'New York' discards all NULLs, silently turning the LEFT JOIN into an INNER JOIN!",
      goodTitle: "✅ PRODUCTION STANDARD: Filter outer table in ON clause",
      goodSql: `-- Correct: Preserves ALL employees regardless of match:
SELECT e.name, d.dept_name, d.city
FROM Employees e
LEFT JOIN Departments d
  ON e.dept_id = d.dept_id
  AND d.city = 'New York';
-- Employees without NY departments still output with NULLs!`,
      goodExplanation: "Conditions placed in the ON clause govern whether a match is formed, but do NOT prevent the left row from appearing in the output stream."
    },
    sandbox: {
      table: 'Employees',
      title: 'Stop Outer Join Collapsing in WHERE',
      instruction: 'The WHERE filter `d.location = \'San Francisco\'` drops unassigned employees with NULL locations, secretly converting the LEFT JOIN into an INNER JOIN. Relocate the location filter into the ON clause!',
      initialSql: 'SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e\nLEFT JOIN Departments d\n  ON e.dept_id = d.dept_id\nWHERE d.location = \'San Francisco\';',
      solutionSql: 'SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e\nLEFT JOIN Departments d\n  ON e.dept_id = d.dept_id\n  AND d.location = \'San Francisco\';',
      hint: 'To preserve all rows from the Left table, filter conditions on the Right table must reside in the ON clause, not WHERE.'
    },
    quiz: {
      question: "To find 'Customers who have NEVER placed an order' with optimal performance and index usage, which pattern is recommended?",
      options: [
        "A) WHERE customer_id NOT IN (SELECT customer_id FROM Orders)",
        "B) LEFT JOIN Orders o ON c.id = o.customer_id WHERE o.customer_id IS NULL",
        "C) CROSS JOIN Orders o WHERE c.id != o.customer_id",
        "D) RIGHT JOIN Customers c ON c.id = Orders.id"
      ],
      correctIndex: 1,
      explanation: "The ANTI-JOIN pattern (LEFT JOIN + WHERE right.key IS NULL) is deterministic, avoids the lethal NOT IN NULL black hole bug, and enables hash-anti-join engine optimizations."
    },
    gotchas: [
      'ON filters rows BEFORE join completion. WHERE filters rows AFTER join completion.',
      'CROSS JOIN without a condition on two 100,000-row tables generates 10,000,000,000 rows (OOM crash).',
      'Anti-Joins are much faster than NOT IN (subquery) because NOT IN cannot utilize index lookups when NULLs are present.'
    ],
    quickActions: {
      labTrack: 'trackJoins',
      questId: 16,
      presetQuery: "SELECT e.emp_id, e.name, d.dept_name, d.location FROM Employees AS e LEFT JOIN Departments AS d ON e.dept_id = d.dept_id;"
    }
  },

  // ---------------------------------------------------------------------------
  // SECTION 06: SQL Operators & 3-Valued Logic
  // ---------------------------------------------------------------------------
  {
    id: 'sec_operators',
    pillarId: 'pillar1',
    icon: '⚡',
    title: '06. SQL Operators & 3-Valued Logic Sandbox',
    badge: 'Operators',
    badgeClass: 'pill-operator',
    readTime: '6 min read',
    summary: 'Wildcards (LIKE), set inclusion (IN), bounded ranges (BETWEEN), and handling missing data (IS NULL, COALESCE).',
    sections: [
      {
        heading: 'Pattern Matching: LIKE Wildcards',
        content: `- \`%\`: Matches zero, one, or multiple arbitrary characters (\`WHERE name LIKE 'A%'\` matches Alice, Alex, A).
- \`_\`: Matches exactly ONE single character (\`WHERE code LIKE 'E__'\` matches E10, E99).
- Case sensitivity depends on table collation (e.g. \`utf8mb4_0900_ai_ci\` is case-insensitive).`
      },
      {
        heading: 'The Fatal NOT IN with NULL Trap',
        content: `If the set passed to \`NOT IN\` contains even a single \`NULL\`, the query returns ZERO rows:
\`\`\`sql
-- If Subquery returns [10, 20, NULL]:
WHERE dept_id NOT IN (10, 20, NULL)
-- Expands logically to:
WHERE dept_id != 10 AND dept_id != 20 AND dept_id != NULL
-- Since dept_id != NULL is always UNKNOWN, the entire AND chain yields UNKNOWN!
\`\`\`
**Solution**: Always filter \`WHERE id IS NOT NULL\` in subqueries, or use \`NOT EXISTS\`!`
      },
      {
        heading: 'COALESCE & IFNULL Functions',
        content: `\`COALESCE(val1, val2, ..., valN)\` evaluates arguments from left to right and returns the first non-NULL value:
\`\`\`sql
SELECT name,
       COALESCE(bonus, 0) AS safe_bonus,
       salary + COALESCE(bonus, 0) AS total_compensation
FROM Employees;
\`\`\``
      }
    ],
    diff: {
      badTitle: "❌ ANTI-PATTERN: The Fatal NOT IN with NULL Subquery",
      badSql: `-- Subquery returns (10, 20, NULL):
SELECT * FROM Customers
WHERE customer_id NOT IN (
    SELECT referrer_id FROM Referrals
);
-- Returns 0 rows every time!`,
      badExplanation: "NOT IN (10, 20, NULL) unrolls to: id != 10 AND id != 20 AND id != NULL. Since id != NULL is UNKNOWN, the entire conjunction resolves to UNKNOWN and zero rows pass.",
      goodTitle: "✅ PRODUCTION STANDARD: NOT EXISTS or IS NOT NULL guard",
      goodSql: `SELECT * FROM Customers c
WHERE NOT EXISTS (
    SELECT 1 FROM Referrals r
    WHERE r.referrer_id = c.customer_id
);
-- Or: WHERE customer_id NOT IN (SELECT ref_id FROM Referrals WHERE ref_id IS NOT NULL)`,
      goodExplanation: "NOT EXISTS operates strictly on boolean cardinality (does at least 1 matching row exist?), completely immune to NULL evaluation traps."
    },
    sandbox: {
      table: 'Employees',
      title: 'Bypass the Fatal NOT IN (NULL) Black Hole',
      instruction: 'The query returns 0 rows because `NOT IN (62000, 74000, NULL)` unrolls into an UNKNOWN boolean expression. Fix the query by removing the NULL from the set.',
      initialSql: 'SELECT emp_id, first_name, salary\nFROM Employees\nWHERE salary NOT IN (62000, 74000, NULL);',
      solutionSql: 'SELECT emp_id, first_name, salary\nFROM Employees\nWHERE salary NOT IN (62000, 74000);',
      hint: 'A NULL inside a NOT IN list silently kills the entire result set. Remove NULL to restore valid filtering.'
    },
    quiz: {
      question: "Given a column with value NULL, what does the expression: COALESCE(NULL, NULL, 'Production', 'Fallback') return?",
      options: [
        "A) NULL",
        "B) 'Fallback'",
        "C) 'Production'",
        "D) Error: Multiple NULL arguments"
      ],
      correctIndex: 2,
      explanation: "COALESCE scans arguments from left to right and immediately returns the very first non-NULL argument encountered. Here, 'Production' is the first non-NULL value."
    },
    gotchas: [
      'BETWEEN is INCLUSIVE of both endpoints (BETWEEN 50000 AND 80000 includes both 50k and 80k).',
      'Never perform arithmetic on NULL: salary + NULL always yields NULL! Wrap in COALESCE.',
      'LIKE operations starting with a wildcard (%term) cannot utilize B-Tree indexes (triggers full table scan).'
    ],
    quickActions: {
      labTrack: 'trackOperators',
      questId: 2,
      presetQuery: "SELECT id, name, department, salary, bonus, COALESCE(bonus, 0) AS clean_bonus FROM Employees WHERE bonus IS NULL;"
    }
  },

  // ---------------------------------------------------------------------------
  // SECTION 07: Top 10 SQL Interview Gotchas & Traps
  // ---------------------------------------------------------------------------
  {
    id: 'sec_interview_traps',
    pillarId: 'pillar5',
    icon: '🎯',
    title: '07. Top 10 Production & Interview Gotchas Cheat-Sheet',
    badge: 'Interview Vault',
    badgeClass: 'pill-gotcha',
    readTime: '8 min read',
    summary: 'The top 10 most lethal interview traps asked by Meta, Amazon, Apple, and Google database interviewers.',
    sections: [
      {
        heading: '1. The Difference Between COUNT(*) and COUNT(col)',
        content: `\`COUNT(*)\` counts rows in memory regardless of column values. \`COUNT(col)\` counts only records where \`col IS NOT NULL\`.`
      },
      {
        heading: '2. The WHERE vs HAVING Rule',
        content: `WHERE filters individual rows before grouping. HAVING filters aggregated bucket summaries after grouping.`
      },
      {
        heading: '3. The ON vs WHERE Outer Join Bug',
        content: `Putting right-table filters in WHERE silently converts a LEFT JOIN into an INNER JOIN because NULL rows fail the WHERE equality test.`
      },
      {
        heading: '4. The NOT IN NULL Black Hole',
        content: `A \`NOT IN\` condition against a set containing a \`NULL\` will evaluate to UNKNOWN and return zero rows.`
      },
      {
        heading: '5. Arithmetic with NULLs',
        content: `Any arithmetic expression containing NULL yields NULL (\`5 + NULL = NULL\`). Use \`COALESCE(col, 0)\` to provide fallbacks.`
      },
      {
        heading: '6. Lexical vs Physical Execution Order',
        content: `Engine sequence: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.`
      },
      {
        heading: '7. Non-Aggregated Columns in GROUP BY',
        content: `Selecting columns not listed in GROUP BY without an aggregate function violates SQL standard and causes non-deterministic output.`
      },
      {
        heading: '8. Short-Circuiting in CASE WHEN',
        content: `CASE stops at the first TRUE condition. The most restrictive condition must be tested first (e.g. triangle inequality before equality).`
      },
      {
        heading: '9. Non-Deterministic LIMIT Pagination',
        content: `Using \`LIMIT\` and \`OFFSET\` without an explicit unique tie-breaker in \`ORDER BY\` will produce duplicated or missed rows during pagination.`
      },
      {
        heading: '10. Anti-Join vs NOT IN Performance',
        content: `\`LEFT JOIN ... WHERE right.id IS NULL\` is significantly faster and safer than \`NOT IN (SELECT id ...)\` because it handles NULLs cleanly and leverages index lookups.`
      }
    ],
    diff: {
      badTitle: "❌ ANTI-PATTERN: Naive pagination with LIMIT/OFFSET without unique sort",
      badSql: `-- Page 2 of transactions:
SELECT id, user_id, amount, created_at
FROM Transactions
ORDER BY created_at DESC
LIMIT 20 OFFSET 20;
-- If multiple rows share created_at, rows shift randomly between pages!`,
      badExplanation: "In modern multi-threaded storage engines, sorting on non-unique columns produces non-deterministic order. Rows can appear on both Page 1 and Page 2, or be skipped entirely!",
      goodTitle: "✅ PRODUCTION STANDARD: Deterministic Unique Tie-Breaker",
      goodSql: `-- Guaranteed deterministic pagination:
SELECT id, user_id, amount, created_at
FROM Transactions
ORDER BY created_at DESC, id ASC
LIMIT 20 OFFSET 20;
-- Primary key 'id' guarantees a unique, reproducible sequence`,
      goodExplanation: "Appending a guaranteed unique column (like the Primary Key) ensures strict total order across engine restarts and pagination requests."
    },
    sandbox: {
      table: 'Employees',
      title: 'Enforce Deterministic Pagination Order',
      instruction: 'Sorting solely by non-unique `department` causes row hopping and duplicated records across paginated slices. Add `emp_id ASC` as a unique primary-key tie-breaker.',
      initialSql: 'SELECT emp_id, first_name, department, salary\nFROM Employees\nORDER BY department ASC\nLIMIT 5;',
      solutionSql: 'SELECT emp_id, first_name, department, salary\nFROM Employees\nORDER BY department ASC, emp_id ASC\nLIMIT 5;',
      hint: 'Append `, emp_id ASC` directly after `department ASC` in the ORDER BY clause.'
    },
    quiz: {
      question: "Why is HAVING preferred over WHERE when filtering based on the result of an aggregation function like SUM(amount) > 10000?",
      options: [
        "A) HAVING is faster because it uses B-Tree indexes",
        "B) WHERE executes before grouping occurs, so aggregate totals do not exist yet",
        "C) WHERE only works on string columns, not numbers",
        "D) HAVING can only be used on primary key columns"
      ],
      correctIndex: 1,
      explanation: "In physical execution order: WHERE is Step 02 (filtering individual raw rows). GROUP BY is Step 03 (creating buckets). HAVING is Step 04 (filtering the aggregated buckets). Therefore, aggregate totals do not exist when WHERE runs."
    },
    gotchas: [
      'Master these 10 concepts and you will pass 95% of database interview screenings.',
      'Always test edge cases: NULL values, empty tables, and duplicate foreign keys.'
    ],
    quickActions: {
      labTrack: 'track01',
      questId: 0,
      presetQuery: "SELECT * FROM Employees WHERE bonus IS NULL;"
    }
  }
];
