// visualizer/leetcode_section6_data.js
// Concept 6: Subqueries, CTEs & Correlated Subqueries

window.LEETCODE_SECTION_6_DATA = {
  "conceptId": "concept-6",
  "conceptNumber": 6,
  "title": "Subqueries, CTEs & Correlated Subqueries",
  "subtitle": "Master scalar, column, row & table subqueries, correlated vs uncorrelated execution mechanics, recursive CTEs, and execution plan spools.",
  "keyTakeaway": "CTEs (WITH clause) clarify complex DAG logic and improve readability, while correlated subqueries evaluate row-by-row unless unnested by the optimizer into semi-joins or hash joins.",
  "masterclass": {
    "title": "Subqueries, CTEs & Correlated Subqueries",
    "subtitle": "Deep-dive into physical subquery execution, DAG pipelines, and unnesting mechanics.",
    "keyTakeaway": "Always check subquery nullability with NOT IN, leverage NOT EXISTS for short-circuiting, and structure multi-pass queries as top-down CTE pipelines.",
    "chapters": [
      {
        "id": "chap-6-1-subquery-taxonomy",
        "number": "6.1",
        "title": "Subquery Taxonomy: Scalar, Column, Row & Table Subquery Mechanics",
        "content": "\n      <p class=\"lc-p\">\n        In relational algebra and SQL engine execution, a <strong>subquery</strong> is an inner query nested within an outer statement. The query planner classifies every subquery into one of four distinct structural forms based on the shape of its returned projection:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The 4 Foundational Subquery Dimensions:</strong><br>\n        1. <strong>Scalar Subquery:</strong> Returns strictly <em>1 row and 1 column</em> (a single primitive scalar token). It can appear anywhere a scalar literal or expression is legal (e.g. in <code>SELECT</code>, <code>WHERE</code> comparison operators <code>&gt;</code>, <code>=</code>, or <code>HAVING</code>). If it returns 0 rows, it evaluates to <code>NULL</code>. If it returns &gt;1 row, the engine raises a runtime fatal error: <code>Subquery returns more than 1 row</code>!<br>\n        2. <strong>Column Subquery:</strong> Returns <em>1 column and multiple rows</em> (a mathematical set vector). It is evaluated with set-membership operators: <code>IN</code>, <code>NOT IN</code>, <code>ANY / SOME</code>, or <code>ALL</code>.<br>\n        3. <strong>Row Subquery:</strong> Returns <em>multiple columns and strictly 1 row</em> (a tuple). Evaluated with row constructors: <code>WHERE (dept_id, role) = (SELECT dept_id, role FROM ...)</code>.<br>\n        4. <strong>Table Subquery (Derived Table):</strong> Returns <em>multiple columns and multiple rows</em> (a virtual relational relation). Used in the <code>FROM</code> clause or <code>JOIN</code> clause. In standard SQL, derived tables in <code>FROM</code> must always have an explicit alias!\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>Optimizer Note:</strong> Understanding these shapes allows the query optimizer to decide whether a subquery can be collapsed into a semi-join or anti-join, or whether it must be materialized as a temporary memory buffer.\n      </p>\n    ",
        "diagram": {
          "title": "The 4 Subquery Structural Classifications in Memory",
          "svg": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SUBQUERY TAXONOMY &amp; RETURN SHAPES IN MEMORY</text>\n        \n        <!-- 1. Scalar -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"180\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.2\"/>\n          <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">1. SCALAR (1x1)</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9.5\">Returns: 1 Row, 1 Col</text>\n          <rect x=\"25\" y=\"55\" width=\"130\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#93c5fd\"/>\n          <text x=\"90\" y=\"75\" text-anchor=\"middle\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">[ $85,000 ]</text>\n          <text x=\"12\" y=\"105\" fill=\"#475569\" font-size=\"9\">Usage: WHERE sal &gt; (SELECT..)</text>\n        </g>\n\n        <!-- 2. Column -->\n        <g transform=\"translate(240, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"180\" height=\"120\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\" stroke-width=\"1.2\"/>\n          <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">2. COLUMN (Nx1)</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9.5\">Returns: N Rows, 1 Col</text>\n          <rect x=\"25\" y=\"52\" width=\"130\" height=\"42\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n          <text x=\"90\" y=\"68\" text-anchor=\"middle\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">[ 101, 104, 109 ]</text>\n          <text x=\"90\" y=\"84\" text-anchor=\"middle\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">[ 112, 115 ]</text>\n          <text x=\"12\" y=\"108\" fill=\"#475569\" font-size=\"9\">Usage: WHERE id IN (SELECT..)</text>\n        </g>\n\n        <!-- 3. Row -->\n        <g transform=\"translate(445, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"180\" height=\"120\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\" stroke-width=\"1.2\"/>\n          <text x=\"12\" y=\"24\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">3. ROW (1xM)</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9.5\">Returns: 1 Row, M Cols</text>\n          <rect x=\"15\" y=\"55\" width=\"150\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#fde047\"/>\n          <text x=\"90\" y=\"75\" text-anchor=\"middle\" fill=\"#854d0e\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">( 'US', 2026, 99.5 )</text>\n          <text x=\"12\" y=\"105\" fill=\"#475569\" font-size=\"9\">Usage: WHERE (c, y) = (..)</text>\n        </g>\n\n        <!-- 4. Table / Derived -->\n        <g transform=\"translate(650, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"195\" height=\"120\" rx=\"6\" fill=\"#faf5ff\" stroke=\"#a855f7\" stroke-width=\"1.2\"/>\n          <text x=\"12\" y=\"24\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">4. TABLE (NxM)</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9.5\">Derived Table / Inline Relation</text>\n          <rect x=\"15\" y=\"52\" width=\"165\" height=\"42\" rx=\"4\" fill=\"#ffffff\" stroke=\"#d8b4fe\"/>\n          <text x=\"97\" y=\"68\" text-anchor=\"middle\" fill=\"#6b21a8\" font-family=\"monospace\" font-size=\"9.5\">id | name | revenue</text>\n          <text x=\"97\" y=\"84\" text-anchor=\"middle\" fill=\"#6b21a8\" font-family=\"monospace\" font-size=\"9.5\">1  | Acme | $1.2M</text>\n          <text x=\"12\" y=\"108\" fill=\"#475569\" font-size=\"9\">Usage: FROM (SELECT..) t</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-6-2-correlated-vs-uncorrelated",
        "number": "6.2",
        "title": "Uncorrelated vs Correlated Subqueries: Row-by-Row Execution ($O(N \\times M)$) vs Unnesting",
        "content": "\n      <p class=\"lc-p\">\n        The most critical architectural divide in subquery performance is whether the inner query references columns from the outer query:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Execution Mechanics:</strong><br>\n        &bull; <strong>Uncorrelated Subquery:</strong> The inner query is completely autonomous. It does not reference any outer columns. The database executes it <em>exactly once</em>, caches the resulting set or scalar in a memory buffer, and evaluates all outer rows against that precomputed result. Time complexity: $O(N + M)$.<br>\n        &bull; <strong>Correlated Subquery:</strong> The inner query references an outer column (e.g. <code>WHERE inner.dept_id = outer.dept_id</code>). The inner query depends on the candidate outer row currently being evaluated. Naively, the engine executes the inner query <em>once for every single outer row</em> ($N$ executions). Time complexity: $O(N \\times M)$!\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>Optimizer Unnesting (Subquery Flattening):</strong> Modern optimizers (MySQL 8.0, PostgreSQL, Oracle) attempt to rewrite correlated subqueries into <strong>Semi-Joins</strong>, <strong>Anti-Joins</strong>, or <strong>Window Functions</strong>. When unnesting succeeds, the correlated loop is replaced by an efficient Hash Join or Merge Join. If unnesting fails (e.g., due to complex aggregations or <code>OR</code> conditions), execution falls back to a brute-force Dependent Subquery loop.\n      </p>\n    ",
        "diagram": {
          "title": "Uncorrelated (1-Time Eval) vs Correlated (N-Loop Eval) Execution Plans",
          "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">EXECUTION LIFECYCLE: UNCORRELATED VS CORRELATED SUBQUERIES</text>\n\n        <!-- Uncorrelated Path -->\n        <g transform=\"translate(30, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"380\" height=\"115\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#cbd5e1\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">A. UNCORRELATED: Evaluates ONCE (O(N+M))</text>\n          \n          <rect x=\"15\" y=\"38\" width=\"150\" height=\"30\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"90\" y=\"58\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10\">Subquery Run (1x)</text>\n\n          <path d=\"M 170 53 L 205 53\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n          <rect x=\"210\" y=\"38\" width=\"150\" height=\"30\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"285\" y=\"58\" text-anchor=\"middle\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10\">Cached Result Buffer</text>\n\n          <text x=\"15\" y=\"95\" fill=\"#475569\" font-size=\"9.5\">All 10,000 outer rows scan against cached buffer once.</text>\n        </g>\n\n        <!-- Correlated Path -->\n        <g transform=\"translate(450, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"395\" height=\"115\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fecdd3\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">B. CORRELATED: Dependent Loop (O(N x M))</text>\n\n          <rect x=\"15\" y=\"38\" width=\"100\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#fda4af\"/>\n          <text x=\"65\" y=\"58\" text-anchor=\"middle\" fill=\"#9f1239\" font-family=\"monospace\" font-size=\"9.5\">Outer Row #i</text>\n\n          <path d=\"M 120 53 L 155 53\" stroke=\"#e11d48\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n          <rect x=\"160\" y=\"38\" width=\"130\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#fda4af\"/>\n          <text x=\"225\" y=\"58\" text-anchor=\"middle\" fill=\"#9f1239\" font-family=\"monospace\" font-size=\"9.5\">Subquery Exec #i</text>\n\n          <path d=\"M 295 53 L 330 53\" stroke=\"#e11d48\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n          <rect x=\"335\" y=\"38\" width=\"45\" height=\"30\" rx=\"4\" fill=\"#ffe4e6\" stroke=\"#f43f5e\"/>\n          <text x=\"357\" y=\"58\" text-anchor=\"middle\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"10\">Filter</text>\n\n          <text x=\"15\" y=\"95\" fill=\"#9f1239\" font-size=\"9.5\">Repeats inner execution 10,000 times! High CPU bottleneck.</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-6-3-cte-with-clause",
        "number": "6.3",
        "title": "Common Table Expressions (CTEs): WITH Clauses, Readability & Optimization Fences",
        "content": "\n      <p class=\"lc-p\">\n        A <strong>Common Table Expression (CTE)</strong>, introduced with the <code>WITH</code> clause, defines a temporary named result set scoped strictly to the execution of a single statement (<code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code>).\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The 3 Decisive Advantages of CTEs:</strong><br>\n        1. <strong>Top-Down Linear Readability:</strong> Replaces deeply nested Russian-doll subqueries (where readers must read from inside out) with top-to-bottom step-by-step modular transformations.<br>\n        2. <strong>Reference Reuse:</strong> A single CTE can be referenced multiple times across downstream joins and unions within the same query without duplicating complex query definitions.<br>\n        3. <strong>Optimization Fence Control:</strong> In PostgreSQL and SQLite, developers can explicitly specify <code>WITH cte AS MATERIALIZED (...)</code> (forces engine to evaluate once and cache in temp memory) or <code>WITH cte AS NOT MATERIALIZED (...)</code> (forces query planner to inline and push down outer filter predicates).\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>Interview Rule:</strong> In FAANG SQL interviews, writing clean CTEs demonstrating intermediate staging tables scores significantly higher on architecture clarity than monolithic 50-line nested subqueries.\n      </p>\n    ",
        "diagram": {
          "title": "CTE Transformation Pipeline: Step-by-Step Directed Acyclic Graph (DAG)",
          "svg": "<svg viewBox=\"0 0 880 190\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">COMMON TABLE EXPRESSION (WITH CLAUSE) PIPELINE FLOW</text>\n\n        <!-- CTE 1 -->\n        <g transform=\"translate(30, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">WITH ActiveUsers AS (</text>\n          <text x=\"14\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">  SELECT user_id, dept</text>\n          <text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">  FROM Users WHERE active=1</text>\n          <text x=\"14\" y=\"80\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">) [Stage 1 Filter]</text>\n        </g>\n\n        <path d=\"M 260 102 L 305 102\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- CTE 2 -->\n        <g transform=\"translate(315, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">DeptSummary AS (</text>\n          <text x=\"14\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">  SELECT dept, COUNT(*) cnt</text>\n          <text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">  FROM ActiveUsers</text>\n          <text x=\"14\" y=\"80\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">  GROUP BY dept) [Stage 2 Agg]</text>\n        </g>\n\n        <path d=\"M 565 102 L 610 102\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Final Query -->\n        <g transform=\"translate(620, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"225\" height=\"95\" rx=\"6\" fill=\"#faf5ff\" stroke=\"#a855f7\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">SELECT * FROM DeptSummary</text>\n          <text x=\"14\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">JOIN DepartmentBudget db</text>\n          <text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">ON DeptSummary.dept = db.id</text>\n          <text x=\"14\" y=\"80\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">[Final Projection]</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-6-4-exists-vs-in-null-trap",
        "number": "6.4",
        "title": "EXISTS vs IN vs JOIN: The Critical NULL Trap in NOT IN & Short-Circuit Mechanics",
        "content": "\n      <p class=\"lc-p\">\n        One of the most famous traps in all of SQL interviews is the semantic and performance distinction between <code>IN</code>, <code>EXISTS</code>, and <code>LEFT JOIN / IS NULL</code>.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Lethal <code>NOT IN</code> with NULL Black Hole:</strong><br>\n        Suppose an inner subquery returns <code>[10, 20, NULL]</code>.<br>\n        When evaluating: <code>WHERE id NOT IN (SELECT mgr_id FROM ...)</code>:<br>\n        SQL expands this expression to: <code>id &lt;&gt; 10 AND id &lt;&gt; 20 AND id &lt;&gt; NULL</code>.<br>\n        Because <code>id &lt;&gt; NULL</code> evaluates to <strong>UNKNOWN</strong> in Three-Valued Logic, the entire boolean chain evaluates to <code>TRUE AND TRUE AND UNKNOWN =&gt; UNKNOWN</code>!<br>\n        Because <code>WHERE</code> only admits rows that evaluate to strictly <code>TRUE</code>, <strong>the query returns exactly zero rows</strong>, silently dropping all valid data!\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>The Solution:</strong> Always use <code>NOT EXISTS</code> instead of <code>NOT IN</code>. <code>NOT EXISTS</code> checks purely for the <em>existence of at least 1 row token</em>. It uses two-valued boolean existence logic (True / False) and never suffers from NULL contamination! Furthermore, <code>EXISTS</code> short-circuits instantly upon encountering the first matching record ($O(1)$).\n      </p>\n    ",
        "diagram": {
          "title": "NOT IN NULL Black Hole vs NOT EXISTS Short-Circuit Evaluation",
          "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">NOT IN NULL CONTAMINATION VS NOT EXISTS ROBUSTNESS</text>\n\n        <!-- NOT IN Box -->\n        <g transform=\"translate(30, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"385\" height=\"110\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fecdd3\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">DANGER: col NOT IN (10, 20, NULL)</text>\n          <text x=\"14\" y=\"44\" fill=\"#9f1239\" font-family=\"monospace\" font-size=\"9.5\">Expands to: (col &lt;&gt; 10) AND (col &lt;&gt; 20) AND (col &lt;&gt; NULL)</text>\n          \n          <rect x=\"14\" y=\"55\" width=\"355\" height=\"26\" rx=\"4\" fill=\"#ffe4e6\"/>\n          <text x=\"24\" y=\"72\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">TRUE AND TRUE AND UNKNOWN  =&gt;  UNKNOWN</text>\n          \n          <text x=\"14\" y=\"98\" fill=\"#e11d48\" font-size=\"9.5\">ZERO rows emitted. Result set is wiped out completely!</text>\n        </g>\n\n        <!-- NOT EXISTS Box -->\n        <g transform=\"translate(445, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"400\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">SAFE: NOT EXISTS (SELECT 1 FROM ...)</text>\n          <text x=\"14\" y=\"44\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Evaluates row existence. Ignores column nullability.</text>\n\n          <rect x=\"14\" y=\"55\" width=\"370\" height=\"26\" rx=\"4\" fill=\"#dcfce7\"/>\n          <text x=\"24\" y=\"72\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Short-circuits on 1st match. 100% 2-Valued Logic!</text>\n\n          <text x=\"14\" y=\"98\" fill=\"#166534\" font-size=\"9.5\">Safe, robust across all SQL engines, handles NULL safely.</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-6-5-correlated-scalar-select",
        "number": "6.5",
        "title": "Correlated Subqueries in SELECT: Projection Lookups, Subquery Cache & N+1 Pitfalls",
        "content": "\n      <p class=\"lc-p\">\n        In analytics reports, developers often place a scalar subquery directly in the <code>SELECT</code> clause to compute a dynamic aggregate or lookup value:\n      </p>\n\n      <pre style=\"background:#0f172a; color:#f8fafc; padding:10px; border-radius:6px; font-family:monospace; font-size:12px;\">SELECT e.name, e.salary,\n       (SELECT AVG(salary) FROM Employees WHERE dept_id = e.dept_id) AS dept_avg\nFROM Employees e;</pre>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Physical Mechanics &amp; Subquery Cache:</strong><br>\n        1. <strong>Subquery Cache (Memoization):</strong> MySQL and modern engines implement an internal hash table cache for correlated scalar subqueries in <code>SELECT</code>. If 50 consecutive employees belong to <code>dept_id = 1</code>, the engine computes the subquery for the first row and reuses the cached $82,000 average for the next 49 rows.<br>\n        2. <strong>Low Cardinality = Fast, High Cardinality = Crash:</strong> If <code>dept_id</code> has high distinct cardinality (or unique keys), cache hits drop to 0%, degenerating into an $N+1$ query disaster.<br>\n        3. <strong>The Production Refactor:</strong> Replace scalar subqueries in <code>SELECT</code> with either an analytic window function (<code>AVG(salary) OVER(PARTITION BY dept_id)</code>) or a pre-aggregated <code>LEFT JOIN</code>.\n      </div>\n    ",
        "diagram": {
          "title": "Correlated Scalar Projection with Engine Memoization Cache",
          "svg": "<svg viewBox=\"0 0 880 190\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SUBQUERY CACHE MEMOIZATION IN SELECT PROJECTION</text>\n\n        <!-- Outer Stream -->\n        <g transform=\"translate(30, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"200\" height=\"100\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Outer Employee Stream</text>\n          <text x=\"12\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Row 1: Alice  (dept: 10)</text>\n          <text x=\"12\" y=\"62\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Row 2: Bob    (dept: 10)</text>\n          <text x=\"12\" y=\"80\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Row 3: Charlie(dept: 20)</text>\n        </g>\n\n        <path d=\"M 240 105 L 285 105\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Subquery Cache -->\n        <g transform=\"translate(295, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"270\" height=\"100\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Subquery Cache (Hash Map)</text>\n          <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">Key: [dept=10] =&gt; Val: $75,000 [HIT!]</text>\n          <text x=\"12\" y=\"70\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">Key: [dept=20] =&gt; Compute =&gt; $90,000</text>\n          <text x=\"12\" y=\"90\" fill=\"#64748b\" font-size=\"9\">Bypasses re-execution on key match</text>\n        </g>\n\n        <path d=\"M 575 105 L 620 105\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Final Projection -->\n        <g transform=\"translate(630, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"215\" height=\"100\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Projected Result</text>\n          <text x=\"12\" y=\"44\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Alice   | $80k | $75k</text>\n          <text x=\"12\" y=\"62\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Bob     | $70k | $75k</text>\n          <text x=\"12\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Charlie | $90k | $90k</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-6-6-chained-cte-dags",
        "number": "6.6",
        "title": "Chained CTE Pipelines: Structuring Complex Multi-Stage ETL & Analytics DAGs",
        "content": "\n      <p class=\"lc-p\">\n        In problems like LeetCode #1341 (Movie Rating) and #602 (Friend Requests II), query logic requires multiple independent aggregations combined via <code>UNION ALL</code> or cross-stage joins.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Multi-Stage CTE Design Pattern:</strong><br>\n        &bull; <strong>Stage 1 (Raw Ingestion / Cleansing):</strong> Filter anomalies, handle NULLs, cast types.<br>\n        &bull; <strong>Stage 2 (Grouping / Aggregation):</strong> Compute counts, sums, or rankings for each target dimension.<br>\n        &bull; <strong>Stage 3 (Ranking / Windowing):</strong> Assign <code>DENSE_RANK()</code> or <code>LIMIT</code> per group.<br>\n        &bull; <strong>Final Stage (Consolidation):</strong> Combine results into the exact schema requested by the business contract.\n      </div>\n\n      <p class=\"lc-p\">\n        By separating business concerns into discrete named CTE nodes, you eliminate redundant table scans and build code that other engineers can test and maintain effortlessly.\n      </p>\n    ",
        "diagram": {
          "title": "Chained Multi-Stage CTE Directed Acyclic Graph (DAG)",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">MULTI-STAGE CTE PIPELINE ARCHITECTURE</text>\n\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"165\" height=\"85\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Stage 1: Raw CTE</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9\">Cleanses dates &amp; nulls</text>\n          <text x=\"12\" y=\"62\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">WITH Cleaned AS (..)</text>\n        </g>\n\n        <path d=\"M 210 97 L 245 97\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <g transform=\"translate(255, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"175\" height=\"85\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Stage 2: User Agg</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9\">Computes user totals</text>\n          <text x=\"12\" y=\"62\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">UserCounts AS (..)</text>\n        </g>\n\n        <g transform=\"translate(470, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"175\" height=\"85\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\"/>\n          <text x=\"12\" y=\"24\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Stage 3: Movie Agg</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9\">Computes movie ratings</text>\n          <text x=\"12\" y=\"62\" fill=\"#854d0e\" font-family=\"monospace\" font-size=\"9.5\">MovieAvgs AS (..)</text>\n        </g>\n\n        <path d=\"M 440 85 L 460 85\" stroke=\"#2563eb\" stroke-width=\"1.5\"/>\n        <path d=\"M 655 97 L 690 97\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <g transform=\"translate(700, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"150\" height=\"85\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Consolidated</text>\n          <text x=\"12\" y=\"44\" fill=\"#64748b\" font-size=\"9\">UNION ALL emission</text>\n          <text x=\"12\" y=\"62\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Final 2-Row Output</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-6-7-relational-division",
        "number": "6.7",
        "title": "Relational Division & Double NOT EXISTS: Solving Universal 'Matched All' Queries",
        "content": "\n      <p class=\"lc-p\">\n        In relational algebra, <strong>Relational Division</strong> answers questions with universal quantification: <em>\"Find all customers who have purchased EVERY product in catalog category X\"</em> or <em>\"Find all students who completed ALL required modules.\"</em>\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Two Canonical Implementations:</strong><br>\n        1. <strong>Double NOT EXISTS (Classical Relational Logic):</strong><br>\n        <em>\"Select customer C such that there DOES NOT EXIST a product P in Category X for which there DOES NOT EXIST a purchase by C of P.\"</em><br>\n        Strict $O(N \\times M)$ nested evaluation, elegant in theoretical computer science, but often slower on large volumes.<br>\n        2. <strong>Aggregation with COUNT(DISTINCT) (Production Standard):</strong><br>\n        Filter to Category X, group by customer, and check: <code>HAVING COUNT(DISTINCT product_id) = (SELECT COUNT(*) FROM Catalog WHERE category = 'X')</code>.<br>\n        Optimizers execute this via an indexed group aggregate at $O(N)$ speed.\n      </div>\n    ",
        "diagram": {
          "title": "Relational Division: Double NOT EXISTS vs COUNT(DISTINCT) Universal Match",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">RELATIONAL DIVISION: UNIVERSAL QUANTIFICATION ('FOR ALL')</text>\n\n        <!-- Catalog Requirements -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"90\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Target Set (Category X)</text>\n          <text x=\"14\" y=\"44\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">Products: [P1, P2, P3]</text>\n          <text x=\"14\" y=\"66\" fill=\"#475569\" font-size=\"9.5\">Target Cardinality: 3 Products</text>\n        </g>\n\n        <path d=\"M 265 100 L 310 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Candidate Customer Purchases -->\n        <g transform=\"translate(320, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"270\" height=\"90\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Purchases By Customer</text>\n          <text x=\"14\" y=\"44\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">Cust #101: [P1, P2, P3] =&gt; Count = 3</text>\n          <text x=\"14\" y=\"62\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Cust #102: [P1, P2]     =&gt; Count = 2</text>\n          <text x=\"14\" y=\"80\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Cust #103: [P1]         =&gt; Count = 1</text>\n        </g>\n\n        <path d=\"M 600 100 L 645 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Result -->\n        <g transform=\"translate(655, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"190\" height=\"90\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Division Result</text>\n          <text x=\"14\" y=\"48\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Cust #101 Emitted!</text>\n          <text x=\"14\" y=\"70\" fill=\"#475569\" font-size=\"9\">Matched 100% of target set</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-6-8-spools-and-temp-tables",
        "number": "6.8",
        "title": "Execution Plan Spools & Physical Memory: When to use CTEs vs Temp Tables vs Subqueries",
        "content": "\n      <p class=\"lc-p\">\n        When evaluating large analytical pipelines, query performance hinges on how the database engine buffers intermediate sets:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>Memory Spool vs Inlined Query Tree:</strong><br>\n        &bull; <strong>CTE / Subquery (Inlined):</strong> The optimizer flattens the query into the main execution tree. Predicates are pushed down into base table index scans. Memory usage is minimal ($O(1)$ stream buffers).<br>\n        &bull; <strong>CTE (Materialized Spool):</strong> The optimizer evaluates the CTE once and writes the results to an in-memory temporary table (Spool). If multiple downstream joins read this CTE, they read from memory rather than re-scanning raw tables.<br>\n        &bull; <strong>Explicit Temporary Table (<code>CREATE TEMPORARY TABLE #temp</code>):</strong> Best for massive data sets (&gt;10M rows) requiring indexes. You can create B-Tree indexes directly on temporary table columns to accelerate multi-stage join queries by 50x-100x.\n      </div>\n    ",
        "diagram": {
          "title": "Physical Engine Storage: Inlined Stream vs In-Memory Spool vs Temp Table",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">PHYSICAL EXECUTION STRATEGIES: INLINED VS MATERIALIZED SPOOL</text>\n\n        <!-- 1. Inlined -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"245\" height=\"90\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">1. INLINED (Merged AST)</text>\n          <text x=\"14\" y=\"44\" fill=\"#1e40af\" font-size=\"9.5\">Predicates pushed down to indexes</text>\n          <text x=\"14\" y=\"64\" fill=\"#475569\" font-size=\"9.5\">Zero spool overhead, O(1) RAM streaming</text>\n        </g>\n\n        <!-- 2. Spool -->\n        <g transform=\"translate(315, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"250\" height=\"90\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\"/>\n          <text x=\"14\" y=\"24\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">2. MEMORY SPOOL (Materialized)</text>\n          <text x=\"14\" y=\"44\" fill=\"#854d0e\" font-size=\"9.5\">Evaluated once, cached in work_mem</text>\n          <text x=\"14\" y=\"64\" fill=\"#475569\" font-size=\"9.5\">Fast reuse, risk of disk spill if &gt;work_mem</text>\n        </g>\n\n        <!-- 3. Temp Table -->\n        <g transform=\"translate(600, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"245\" height=\"90\" rx=\"6\" fill=\"#faf5ff\" stroke=\"#a855f7\"/>\n          <text x=\"14\" y=\"24\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">3. EXPLICIT TEMP TABLE</text>\n          <text x=\"14\" y=\"44\" fill=\"#6b21a8\" font-size=\"9.5\">Can add secondary B-Tree indexes</text>\n          <text x=\"14\" y=\"64\" fill=\"#475569\" font-size=\"9.5\">Highest throughput for multi-pass ETL</text>\n        </g>\n      </svg>"
        }
      }
    ],
    "callouts": [
      {
        "type": "danger",
        "title": "The NOT IN + NULL Black Hole",
        "body": "If an inner subquery returns even a single NULL record, NOT IN evaluates to UNKNOWN for all outer records, silently returning zero rows! Always use NOT EXISTS instead of NOT IN."
      },
      {
        "type": "warning",
        "title": "Correlated Subqueries in SELECT (N+1 Query Syndrome)",
        "body": "Placing a correlated scalar subquery in SELECT forces the engine to evaluate the inner query for every outer row unless memoized by the subquery cache. Convert to LEFT JOIN or Window Functions."
      },
      {
        "type": "info",
        "title": "CTEs Are Not Always Materialized",
        "body": "In modern MySQL 8.0 and PostgreSQL 12+, CTEs are inlined by default unless explicitly marked WITH cte AS MATERIALIZED or referenced multiple times in the query."
      }
    ]
  },
  "conceptMcqs": [
    {
      "id": 601,
      "q": "[Concept 6 Drill Q1] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 602,
      "q": "[Concept 6 Drill Q2] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 603,
      "q": "[Concept 6 Drill Q3] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 604,
      "q": "[Concept 6 Drill Q4] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 605,
      "q": "[Concept 6 Drill Q5] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 606,
      "q": "[Concept 6 Drill Q6] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 607,
      "q": "[Concept 6 Drill Q7] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 608,
      "q": "[Concept 6 Drill Q8] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 609,
      "q": "[Concept 6 Drill Q9] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 610,
      "q": "[Concept 6 Drill Q10] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 611,
      "q": "[Concept 6 Drill Q11] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 612,
      "q": "[Concept 6 Drill Q12] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 613,
      "q": "[Concept 6 Drill Q13] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 614,
      "q": "[Concept 6 Drill Q14] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 615,
      "q": "[Concept 6 Drill Q15] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 616,
      "q": "[Concept 6 Drill Q16] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 617,
      "q": "[Concept 6 Drill Q17] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 618,
      "q": "[Concept 6 Drill Q18] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 619,
      "q": "[Concept 6 Drill Q19] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 620,
      "q": "[Concept 6 Drill Q20] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 621,
      "q": "[Concept 6 Drill Q21] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 622,
      "q": "[Concept 6 Drill Q22] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 623,
      "q": "[Concept 6 Drill Q23] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 624,
      "q": "[Concept 6 Drill Q24] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 625,
      "q": "[Concept 6 Drill Q25] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 626,
      "q": "[Concept 6 Drill Q26] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 627,
      "q": "[Concept 6 Drill Q27] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 628,
      "q": "[Concept 6 Drill Q28] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 629,
      "q": "[Concept 6 Drill Q29] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 630,
      "q": "[Concept 6 Drill Q30] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 631,
      "q": "[Concept 6 Drill Q31] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 632,
      "q": "[Concept 6 Drill Q32] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 633,
      "q": "[Concept 6 Drill Q33] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 634,
      "q": "[Concept 6 Drill Q34] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 635,
      "q": "[Concept 6 Drill Q35] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 636,
      "q": "[Concept 6 Drill Q36] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 637,
      "q": "[Concept 6 Drill Q37] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 638,
      "q": "[Concept 6 Drill Q38] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 639,
      "q": "[Concept 6 Drill Q39] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 640,
      "q": "[Concept 6 Drill Q40] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 641,
      "q": "[Concept 6 Drill Q41] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 642,
      "q": "[Concept 6 Drill Q42] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 643,
      "q": "[Concept 6 Drill Q43] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 644,
      "q": "[Concept 6 Drill Q44] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 645,
      "q": "[Concept 6 Drill Q45] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 646,
      "q": "[Concept 6 Drill Q46] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 647,
      "q": "[Concept 6 Drill Q47] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 648,
      "q": "[Concept 6 Drill Q48] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 649,
      "q": "[Concept 6 Drill Q49] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 650,
      "q": "[Concept 6 Drill Q50] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 651,
      "q": "[Concept 6 Drill Q51] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 652,
      "q": "[Concept 6 Drill Q52] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 653,
      "q": "[Concept 6 Drill Q53] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 654,
      "q": "[Concept 6 Drill Q54] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 655,
      "q": "[Concept 6 Drill Q55] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 656,
      "q": "[Concept 6 Drill Q56] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 657,
      "q": "[Concept 6 Drill Q57] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 658,
      "q": "[Concept 6 Drill Q58] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 659,
      "q": "[Concept 6 Drill Q59] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 660,
      "q": "[Concept 6 Drill Q60] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 661,
      "q": "[Concept 6 Drill Q61] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 662,
      "q": "[Concept 6 Drill Q62] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 663,
      "q": "[Concept 6 Drill Q63] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 664,
      "q": "[Concept 6 Drill Q64] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 665,
      "q": "[Concept 6 Drill Q65] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 666,
      "q": "[Concept 6 Drill Q66] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 667,
      "q": "[Concept 6 Drill Q67] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 668,
      "q": "[Concept 6 Drill Q68] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 669,
      "q": "[Concept 6 Drill Q69] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 670,
      "q": "[Concept 6 Drill Q70] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 671,
      "q": "[Concept 6 Drill Q71] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 672,
      "q": "[Concept 6 Drill Q72] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 673,
      "q": "[Concept 6 Drill Q73] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 674,
      "q": "[Concept 6 Drill Q74] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 675,
      "q": "[Concept 6 Drill Q75] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 676,
      "q": "[Concept 6 Drill Q76] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 677,
      "q": "[Concept 6 Drill Q77] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 678,
      "q": "[Concept 6 Drill Q78] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 679,
      "q": "[Concept 6 Drill Q79] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 680,
      "q": "[Concept 6 Drill Q80] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 681,
      "q": "[Concept 6 Drill Q81] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 682,
      "q": "[Concept 6 Drill Q82] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 683,
      "q": "[Concept 6 Drill Q83] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 684,
      "q": "[Concept 6 Drill Q84] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 685,
      "q": "[Concept 6 Drill Q85] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 686,
      "q": "[Concept 6 Drill Q86] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 687,
      "q": "[Concept 6 Drill Q87] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 688,
      "q": "[Concept 6 Drill Q88] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 689,
      "q": "[Concept 6 Drill Q89] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 690,
      "q": "[Concept 6 Drill Q90] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 691,
      "q": "[Concept 6 Drill Q91] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 692,
      "q": "[Concept 6 Drill Q92] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 693,
      "q": "[Concept 6 Drill Q93] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 694,
      "q": "[Concept 6 Drill Q94] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 695,
      "q": "[Concept 6 Drill Q95] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 696,
      "q": "[Concept 6 Drill Q96] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 697,
      "q": "[Concept 6 Drill Q97] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 698,
      "q": "[Concept 6 Drill Q98] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 699,
      "q": "[Concept 6 Drill Q99] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 700,
      "q": "[Concept 6 Drill Q100] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    }
  ],
  "prepDrills": [
    {
      "id": 601,
      "title": "Unmanaged Employee Identification (Scenario 1)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 1).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 602,
      "title": "Dual-Condition Transaction Threshold (Scenario 2)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 2).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 603,
      "title": "Universal Product Category Completers (Scenario 3)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 3).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 604,
      "title": "Top Rated Movie per Genre (Scenario 4)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 4).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 605,
      "title": "Mutual Friendship Reciprocity (Scenario 5)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 5).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 606,
      "title": "Unmanaged Employee Identification (Scenario 6)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 6).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 607,
      "title": "Dual-Condition Transaction Threshold (Scenario 7)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 7).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 608,
      "title": "Universal Product Category Completers (Scenario 8)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 8).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 609,
      "title": "Top Rated Movie per Genre (Scenario 9)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 9).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 610,
      "title": "Mutual Friendship Reciprocity (Scenario 10)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 10).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 611,
      "title": "Unmanaged Employee Identification (Scenario 11)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 11).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 612,
      "title": "Dual-Condition Transaction Threshold (Scenario 12)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 12).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 613,
      "title": "Universal Product Category Completers (Scenario 13)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 13).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 614,
      "title": "Top Rated Movie per Genre (Scenario 14)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 14).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 615,
      "title": "Mutual Friendship Reciprocity (Scenario 15)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 15).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 616,
      "title": "Unmanaged Employee Identification (Scenario 16)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 16).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 617,
      "title": "Dual-Condition Transaction Threshold (Scenario 17)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 17).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 618,
      "title": "Universal Product Category Completers (Scenario 18)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 18).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 619,
      "title": "Top Rated Movie per Genre (Scenario 19)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 19).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 620,
      "title": "Mutual Friendship Reciprocity (Scenario 20)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 20).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 621,
      "title": "Unmanaged Employee Identification (Scenario 21)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 21).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 622,
      "title": "Dual-Condition Transaction Threshold (Scenario 22)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 22).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 623,
      "title": "Universal Product Category Completers (Scenario 23)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 23).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 624,
      "title": "Top Rated Movie per Genre (Scenario 24)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 24).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 625,
      "title": "Mutual Friendship Reciprocity (Scenario 25)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 25).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 626,
      "title": "Unmanaged Employee Identification (Scenario 26)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 26).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 627,
      "title": "Dual-Condition Transaction Threshold (Scenario 27)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 27).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 628,
      "title": "Universal Product Category Completers (Scenario 28)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 28).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 629,
      "title": "Top Rated Movie per Genre (Scenario 29)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 29).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 630,
      "title": "Mutual Friendship Reciprocity (Scenario 30)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 30).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 631,
      "title": "Unmanaged Employee Identification (Scenario 31)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 31).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 632,
      "title": "Dual-Condition Transaction Threshold (Scenario 32)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 32).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 633,
      "title": "Universal Product Category Completers (Scenario 33)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 33).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 634,
      "title": "Top Rated Movie per Genre (Scenario 34)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 34).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 635,
      "title": "Mutual Friendship Reciprocity (Scenario 35)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 35).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 636,
      "title": "Unmanaged Employee Identification (Scenario 36)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 36).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 637,
      "title": "Dual-Condition Transaction Threshold (Scenario 37)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 37).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 638,
      "title": "Universal Product Category Completers (Scenario 38)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 38).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 639,
      "title": "Top Rated Movie per Genre (Scenario 39)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 39).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 640,
      "title": "Mutual Friendship Reciprocity (Scenario 40)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 40).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 641,
      "title": "Unmanaged Employee Identification (Scenario 41)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 41).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 642,
      "title": "Dual-Condition Transaction Threshold (Scenario 42)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 42).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 643,
      "title": "Universal Product Category Completers (Scenario 43)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 43).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 644,
      "title": "Top Rated Movie per Genre (Scenario 44)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 44).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 645,
      "title": "Mutual Friendship Reciprocity (Scenario 45)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 45).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 646,
      "title": "Unmanaged Employee Identification (Scenario 46)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 46).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 647,
      "title": "Dual-Condition Transaction Threshold (Scenario 47)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 47).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 648,
      "title": "Universal Product Category Completers (Scenario 48)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 48).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 649,
      "title": "Top Rated Movie per Genre (Scenario 49)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 49).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 650,
      "title": "Mutual Friendship Reciprocity (Scenario 50)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 50).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 651,
      "title": "Unmanaged Employee Identification (Scenario 51)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 51).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 652,
      "title": "Dual-Condition Transaction Threshold (Scenario 52)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 52).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 653,
      "title": "Universal Product Category Completers (Scenario 53)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 53).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 654,
      "title": "Top Rated Movie per Genre (Scenario 54)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 54).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 655,
      "title": "Mutual Friendship Reciprocity (Scenario 55)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 55).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 656,
      "title": "Unmanaged Employee Identification (Scenario 56)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 56).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 657,
      "title": "Dual-Condition Transaction Threshold (Scenario 57)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 57).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 658,
      "title": "Universal Product Category Completers (Scenario 58)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 58).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 659,
      "title": "Top Rated Movie per Genre (Scenario 59)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 59).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 660,
      "title": "Mutual Friendship Reciprocity (Scenario 60)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 60).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 661,
      "title": "Unmanaged Employee Identification (Scenario 61)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 61).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 662,
      "title": "Dual-Condition Transaction Threshold (Scenario 62)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 62).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 663,
      "title": "Universal Product Category Completers (Scenario 63)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 63).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 664,
      "title": "Top Rated Movie per Genre (Scenario 64)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 64).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 665,
      "title": "Mutual Friendship Reciprocity (Scenario 65)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 65).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 666,
      "title": "Unmanaged Employee Identification (Scenario 66)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 66).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 667,
      "title": "Dual-Condition Transaction Threshold (Scenario 67)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 67).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 668,
      "title": "Universal Product Category Completers (Scenario 68)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 68).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 669,
      "title": "Top Rated Movie per Genre (Scenario 69)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 69).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 670,
      "title": "Mutual Friendship Reciprocity (Scenario 70)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 70).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 671,
      "title": "Unmanaged Employee Identification (Scenario 71)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 71).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 672,
      "title": "Dual-Condition Transaction Threshold (Scenario 72)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 72).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 673,
      "title": "Universal Product Category Completers (Scenario 73)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 73).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 674,
      "title": "Top Rated Movie per Genre (Scenario 74)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 74).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 675,
      "title": "Mutual Friendship Reciprocity (Scenario 75)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 75).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 676,
      "title": "Unmanaged Employee Identification (Scenario 76)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 76).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 677,
      "title": "Dual-Condition Transaction Threshold (Scenario 77)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 77).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 678,
      "title": "Universal Product Category Completers (Scenario 78)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 78).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 679,
      "title": "Top Rated Movie per Genre (Scenario 79)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 79).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 680,
      "title": "Mutual Friendship Reciprocity (Scenario 80)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 80).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 681,
      "title": "Unmanaged Employee Identification (Scenario 81)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 81).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 682,
      "title": "Dual-Condition Transaction Threshold (Scenario 82)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 82).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 683,
      "title": "Universal Product Category Completers (Scenario 83)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 83).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 684,
      "title": "Top Rated Movie per Genre (Scenario 84)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 84).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 685,
      "title": "Mutual Friendship Reciprocity (Scenario 85)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 85).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 686,
      "title": "Unmanaged Employee Identification (Scenario 86)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 86).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 687,
      "title": "Dual-Condition Transaction Threshold (Scenario 87)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 87).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 688,
      "title": "Universal Product Category Completers (Scenario 88)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 88).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 689,
      "title": "Top Rated Movie per Genre (Scenario 89)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 89).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 690,
      "title": "Mutual Friendship Reciprocity (Scenario 90)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 90).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 691,
      "title": "Unmanaged Employee Identification (Scenario 91)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 91).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 692,
      "title": "Dual-Condition Transaction Threshold (Scenario 92)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 92).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 693,
      "title": "Universal Product Category Completers (Scenario 93)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 93).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 694,
      "title": "Top Rated Movie per Genre (Scenario 94)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 94).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 695,
      "title": "Mutual Friendship Reciprocity (Scenario 95)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 95).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 696,
      "title": "Unmanaged Employee Identification (Scenario 96)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 96).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 697,
      "title": "Dual-Condition Transaction Threshold (Scenario 97)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 97).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 698,
      "title": "Universal Product Category Completers (Scenario 98)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 98).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 699,
      "title": "Top Rated Movie per Genre (Scenario 99)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 99).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 700,
      "title": "Mutual Friendship Reciprocity (Scenario 100)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 100).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    }
  ],
  "leetcodeProblems": [
    {
      "id": 1978,
      "title": "Employees Whose Manager Left the Company",
      "difficulty": "Easy",
      "acceptance": "48.2%",
      "interviewFreq": "Very High • Amazon, Meta, Bloomberg",
      "companies": [
        "Amazon",
        "Meta",
        "Bloomberg",
        "Uber"
      ],
      "prompt": "Find the IDs of the employees whose salary is strictly less than $30,000 and whose manager left the company.\n\nWhen a manager leaves the company, their information is deleted from the Employees table, but their employee report still has their manager_id set to that manager's old ID.\n\nReturn the result table ordered by employee_id.",
      "sampleInput": {
        "table": "Employees",
        "columns": [
          "employee_id",
          "name",
          "manager_id",
          "salary"
        ],
        "rows": [
          [
            3,
            "Mila",
            9,
            60301
          ],
          [
            12,
            "Anton",
            null,
            31000
          ],
          [
            13,
            "Emery",
            null,
            67084
          ],
          [
            1,
            "Kalel",
            11,
            21241
          ],
          [
            9,
            "Mikaela",
            null,
            50937
          ],
          [
            11,
            "Joziah",
            6,
            28485
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "employee_id"
        ],
        "rows": [
          [
            11
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1978: ORPHANED MANAGER DETECTION &amp; SALARY FILTER</text>\n\n      <!-- Table: Employees -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"300\" height=\"145\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"12\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Employees (Outer Set)</text>\n        <text x=\"12\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 1  | sal: $21,241 | mgr: 11 (Joziah exists ✓)</text>\n        <rect x=\"8\" y=\"50\" width=\"284\" height=\"24\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"12\" y=\"66\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">emp_id: 11 | sal: $28,485 | mgr: 6 (NOT IN ROSTER! 🚨)</text>\n        <text x=\"12\" y=\"90\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 3  | sal: $60,301 | mgr: 9  (Salary &gt;= $30k ❌)</text>\n        <text x=\"12\" y=\"108\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 12 | sal: $31,000 | mgr: NULL (No manager ❌)</text>\n        <text x=\"12\" y=\"126\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 9  | sal: $50,937 | mgr: NULL (No manager ❌)</text>\n      </g>\n\n      <!-- Subquery Filter Path -->\n      <path d=\"M 345 105 L 405 105\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n      <text x=\"375\" y=\"95\" text-anchor=\"middle\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9\">mgr NOT IN</text>\n\n      <!-- Subquery Result -->\n      <g transform=\"translate(415, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"240\" height=\"145\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\"/>\n        <text x=\"12\" y=\"22\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Subquery: All Existing IDs</text>\n        <text x=\"12\" y=\"44\" fill=\"#854d0e\" font-family=\"monospace\" font-size=\"10\">Active IDs: [3, 12, 13, 1, 9, 11]</text>\n        <text x=\"12\" y=\"70\" fill=\"#475569\" font-size=\"9.5\">Mgr ID 11 is in list =&gt; Retained</text>\n        <text x=\"12\" y=\"90\" fill=\"#b45309\" font-size=\"9.5\" font-weight=\"700\">Mgr ID 6 is NOT in list! =&gt; Orphan!</text>\n        <rect x=\"12\" y=\"105\" width=\"216\" height=\"28\" rx=\"4\" fill=\"#fef3c7\"/>\n        <text x=\"20\" y=\"123\" fill=\"#92400e\" font-family=\"monospace\" font-size=\"9.5\">Salary &lt; $30k AND Mgr Left</text>\n      </g>\n\n      <path d=\"M 665 105 L 710 105\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Final Projection -->\n      <g transform=\"translate(720, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"125\" height=\"145\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Result Table</text>\n        <rect x=\"15\" y=\"42\" width=\"95\" height=\"28\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n        <text x=\"62\" y=\"60\" text-anchor=\"middle\" fill=\"#166534\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">11</text>\n        <text x=\"12\" y=\"95\" fill=\"#475569\" font-size=\"9\">ORDER BY</text>\n        <text x=\"12\" y=\"112\" fill=\"#475569\" font-family=\"monospace\" font-size=\"9\">employee_id</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Filter outer rows to employees strictly earning < $30,000.",
        "Filter out top-level executives whose manager_id IS NULL.",
        "Check that manager_id does not exist in the current set of employee_ids using `NOT IN (SELECT employee_id FROM Employees)` or `NOT EXISTS`.",
        "Sort output ascending by employee_id."
      ],
      "trapsAndEdgeCases": [
        "Critical Trap: If you omit `manager_id IS NOT NULL`, employees with NULL manager will cause `NOT IN` to fail or incorrectly include top executives.",
        "The NOT IN NULL trap: While the inner query returns employee_id (primary key, which is never NULL), in real-world schemas where inner column could be nullable, NOT IN evaluates to UNKNOWN!"
      ],
      "solutionSQL": "SELECT employee_id\nFROM Employees\nWHERE salary < 30000\n  AND manager_id IS NOT NULL\n  AND manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  )\nORDER BY employee_id;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT employee_id",
          "exp": "Emits the primary key ID of employees meeting both salary and orphaned manager criteria."
        },
        {
          "clause": "FROM Employees",
          "exp": "Scans candidate records from the organization employee roster."
        },
        {
          "clause": "WHERE salary < 30000",
          "exp": "Applies the strict financial threshold requirement."
        },
        {
          "clause": "AND manager_id IS NOT NULL",
          "exp": "Guards against top-level managers/CEOs who naturally report to nobody."
        },
        {
          "clause": "AND manager_id NOT IN (SELECT employee_id FROM Employees)",
          "exp": "Subquery check: verifies that the manager ID does not exist anywhere in the active roster."
        },
        {
          "clause": "ORDER BY employee_id",
          "exp": "Ensures deterministic ascending sorting requested by specification."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "NOT EXISTS Correlated Subquery",
          "complexity": "O(N) with index scan",
          "sql": "SELECT e.employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY e.employee_id;",
          "explanation": "Uses NOT EXISTS to avoid 3VL NULL issues and enables direct B-Tree index seek on the manager employee_id."
        },
        {
          "name": "Self LEFT JOIN Anti-Join Pattern",
          "complexity": "O(N log N) Hash/Merge Anti-Join",
          "sql": "SELECT e.employee_id\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.employee_id\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND m.employee_id IS NULL\nORDER BY e.employee_id;",
          "explanation": "Outer-joins employees against managers and filters for unmatched right-side keys (`m.employee_id IS NULL`)."
        }
      ]
    },
    {
      "id": 626,
      "title": "Exchange Seats",
      "difficulty": "Medium",
      "acceptance": "68.9%",
      "interviewFreq": "Very High • Google, Amazon, Bloomberg",
      "companies": [
        "Google",
        "Amazon",
        "Bloomberg",
        "Goldman Sachs"
      ],
      "prompt": "Write a solution to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.\n\nReturn the result table ordered by id in ascending order.",
      "sampleInput": {
        "table": "Seat",
        "columns": [
          "id",
          "student"
        ],
        "rows": [
          [
            1,
            "Abbot"
          ],
          [
            2,
            "Doris"
          ],
          [
            3,
            "Emerson"
          ],
          [
            4,
            "Green"
          ],
          [
            5,
            "Jeames"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "student"
        ],
        "rows": [
          [
            1,
            "Doris"
          ],
          [
            2,
            "Abbot"
          ],
          [
            3,
            "Green"
          ],
          [
            4,
            "Emerson"
          ],
          [
            5,
            "Jeames"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 220\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"190\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #626: CONSECUTIVE SEAT PARITY SWAP &amp; SCALAR SUBQUERY CEILING</text>\n\n      <!-- Original Rows -->\n      <g transform=\"translate(40, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"135\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Seat (Original)</text>\n        <text x=\"14\" y=\"46\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">id: 1 (ODD)  | 'Abbot'</text>\n        <text x=\"14\" y=\"66\" fill=\"#16a34a\" font-family=\"monospace\" font-size=\"10\">id: 2 (EVEN) | 'Doris'</text>\n        <text x=\"14\" y=\"86\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">id: 3 (ODD)  | 'Emerson'</text>\n        <text x=\"14\" y=\"106\" fill=\"#16a34a\" font-family=\"monospace\" font-size=\"10\">id: 4 (EVEN) | 'Green'</text>\n        <text x=\"14\" y=\"126\" fill=\"#d97706\" font-family=\"monospace\" font-size=\"10\">id: 5 (LAST) | 'Jeames'</text>\n      </g>\n\n      <path d=\"M 280 120 L 330 120\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Logic Evaluation Box -->\n      <g transform=\"translate(340, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"270\" height=\"135\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Parity CASE Logic</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">1. Even id: id - 1 (2-&gt;1, 4-&gt;3)</text>\n        <text x=\"14\" y=\"66\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">2. Odd &amp; id = MAX: keep id (5-&gt;5)</text>\n        <text x=\"14\" y=\"86\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">3. Odd &amp; not last: id + 1 (1-&gt;2, 3-&gt;4)</text>\n        <rect x=\"14\" y=\"98\" width=\"242\" height=\"26\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"115\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">Scalar: (SELECT COUNT(*) FROM Seat)</text>\n      </g>\n\n      <path d=\"M 630 120 L 675 120\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Swapped Table -->\n      <g transform=\"translate(685, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"165\" height=\"135\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Swapped Result</text>\n        <text x=\"14\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">1 | 'Doris'</text>\n        <text x=\"14\" y=\"66\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">2 | 'Abbot'</text>\n        <text x=\"14\" y=\"86\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">3 | 'Green'</text>\n        <text x=\"14\" y=\"106\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">4 | 'Emerson'</text>\n        <text x=\"14\" y=\"126\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">5 | 'Jeames'</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Instead of modifying names, conditionally modify the `id` for each student.",
        "If the `id` is odd and equals the maximum row count (scalar subquery `SELECT COUNT(*) FROM Seat`), keep `id` unchanged.",
        "If the `id` is odd, increment it by 1 (`id + 1`).",
        "If the `id` is even, decrement it by 1 (`id - 1`).",
        "Order the result ascending by the newly calculated `id`."
      ],
      "trapsAndEdgeCases": [
        "Odd total rows trap: If there are 5 students, student 5 must remain in seat 5. Failing to test `id = (SELECT COUNT(*) FROM Seat)` maps 5 to 6, breaking continuity.",
        "Modulo arithmetic: In MySQL, `id % 2 = 1` evaluates odd numbers. Ensure evaluation order checks the last odd row before general odd rows."
      ],
      "solutionSQL": "SELECT\n    CASE\n        WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id\n        WHEN id % 2 = 1 THEN id + 1\n        ELSE id - 1\n    END AS id,\n    student\nFROM Seat\nORDER BY id;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT CASE",
          "exp": "Initiates conditional branching to recalculate new seat coordinates."
        },
        {
          "clause": "WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id",
          "exp": "Edge case shield: If the row is odd and is the final odd record in the table, preserve its ID."
        },
        {
          "clause": "WHEN id % 2 = 1 THEN id + 1",
          "exp": "Normal odd seat: shifts right to swap with subsequent even seat."
        },
        {
          "clause": "ELSE id - 1",
          "exp": "Even seat: shifts left to swap with preceding odd seat."
        },
        {
          "clause": "END AS id, student",
          "exp": "Aliases recomputed coordinates as `id` and projects original student name."
        },
        {
          "clause": "FROM Seat ORDER BY id",
          "exp": "Orders final projection by newly swapped seat order."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window LEAD / LAG Pattern",
          "complexity": "O(N log N) Window Sort",
          "sql": "SELECT id,\n       CASE\n           WHEN id % 2 = 1 THEN COALESCE(LEAD(student) OVER(ORDER BY id), student)\n           ELSE LAG(student) OVER(ORDER BY id)\n       END AS student\nFROM Seat;",
          "explanation": "Keeps the IDs constant and swaps the student strings using LEAD() for odd rows and LAG() for even rows."
        }
      ]
    },
    {
      "id": 1341,
      "title": "Movie Rating",
      "difficulty": "Medium",
      "acceptance": "42.8%",
      "interviewFreq": "Very High • Amazon, Netflix, Meta",
      "companies": [
        "Amazon",
        "Netflix",
        "Meta",
        "Apple"
      ],
      "prompt": "Write a solution to:\n1. Find the name of the user who has rated the greatest number of movies. In case of a tie, return the lexicographically smaller user name.\n2. Find the movie name with the highest average rating in February 2020. In case of a tie, return the lexicographically smaller movie name.\n\nCombine the results into a single table with column name 'results'.",
      "sampleInput": {
        "table": "Movies & Users & MovieRating",
        "columns": [
          "movie_id",
          "title",
          "user_id",
          "name",
          "rating",
          "created_at"
        ],
        "rows": [
          [
            1,
            "Avengers",
            1,
            "Daniel",
            3,
            "2020-01-12"
          ],
          [
            2,
            "Frozen 2",
            2,
            "Monica",
            4,
            "2020-02-17"
          ],
          [
            3,
            "Joker",
            3,
            "Maria",
            3,
            "2020-02-22"
          ],
          [
            1,
            "Avengers",
            2,
            "Monica",
            5,
            "2020-02-25"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "results"
        ],
        "rows": [
          [
            "Daniel"
          ],
          [
            "Frozen 2"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1341: TWO DISCRETE CTE SUBQUERIES COMBINED VIA UNION ALL</text>\n\n      <!-- Subquery 1: Top User -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"375\" height=\"140\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Subquery 1: Greatest Number of Ratings</text>\n        <text x=\"14\" y=\"44\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">JOIN Users u ON u.user_id = mr.user_id</text>\n        <text x=\"14\" y=\"62\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">GROUP BY u.name</text>\n        <text x=\"14\" y=\"80\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY COUNT(*) DESC, u.name ASC</text>\n        <rect x=\"14\" y=\"92\" width=\"345\" height=\"32\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"24\" y=\"112\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">LIMIT 1 =&gt; 'Daniel'</text>\n      </g>\n\n      <!-- UNION ALL Link -->\n      <g transform=\"translate(425, 110)\">\n        <rect x=\"0\" y=\"0\" width=\"45\" height=\"30\" rx=\"4\" fill=\"#0f172a\"/>\n        <text x=\"22\" y=\"19\" text-anchor=\"middle\" fill=\"#ffffff\" font-family=\"monospace\" font-size=\"9\" font-weight=\"700\">UNION</text>\n        <text x=\"22\" y=\"27\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"7\">ALL</text>\n      </g>\n\n      <!-- Subquery 2: Top Movie Feb 2020 -->\n      <g transform=\"translate(485, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"360\" height=\"140\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Subquery 2: Highest Avg Rating Feb 2020</text>\n        <text x=\"14\" y=\"44\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">WHERE created_at LIKE '2020-02%'</text>\n        <text x=\"14\" y=\"62\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">GROUP BY m.title</text>\n        <text x=\"14\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY AVG(rating) DESC, m.title ASC</text>\n        <rect x=\"14\" y=\"92\" width=\"330\" height=\"32\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"24\" y=\"112\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">LIMIT 1 =&gt; 'Frozen 2'</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The problem requests two completely unrelated answers combined into a single unified column.",
        "Part 1: Join MovieRating with Users, group by user_id and name, order by count descending, then name ascending, and grab LIMIT 1.",
        "Part 2: Filter MovieRating for '2020-02', join with Movies, group by movie_id and title, order by average rating descending, then title ascending, and grab LIMIT 1.",
        "Combine both independent queries using `UNION ALL` (not `UNION`, which would deduplicate identical names if a movie and user share a name!).",
        "Wrap both subqueries in parentheses so that their individual `ORDER BY ... LIMIT 1` clauses remain locally scoped."
      ],
      "trapsAndEdgeCases": [
        "UNION vs UNION ALL: If the top user and the top movie had the exact same name (e.g. 'Hero'), `UNION` would collapse the result to 1 row! Always use `UNION ALL`.",
        "LIMIT scoping in UNION: In MySQL, writing `SELECT ... ORDER BY ... LIMIT 1 UNION SELECT ... ORDER BY ... LIMIT 1` causes a syntax error unless each SELECT query is encapsulated in parentheses `(...)`."
      ],
      "solutionSQL": "(\n    SELECT u.name AS results\n    FROM MovieRating mr\n    JOIN Users u ON mr.user_id = u.user_id\n    GROUP BY u.user_id, u.name\n    ORDER BY COUNT(*) DESC, u.name ASC\n    LIMIT 1\n)\nUNION ALL\n(\n    SELECT m.title AS results\n    FROM MovieRating mr\n    JOIN Movies m ON mr.movie_id = m.movie_id\n    WHERE mr.created_at >= '2020-02-01' AND mr.created_at < '2020-03-01'\n    GROUP BY m.movie_id, m.title\n    ORDER BY AVG(mr.rating) DESC, m.title ASC\n    LIMIT 1\n);",
      "lineByLineExplanation": [
        {
          "clause": "(SELECT u.name AS results",
          "exp": "Encloses query 1 in parentheses to isolate its local ordering and limit."
        },
        {
          "clause": "JOIN Users u ON mr.user_id = u.user_id",
          "exp": "Joins ratings with users to extract human names."
        },
        {
          "clause": "GROUP BY u.user_id, u.name",
          "exp": "Aggregates rating frequency per individual user."
        },
        {
          "clause": "ORDER BY COUNT(*) DESC, u.name ASC LIMIT 1)",
          "exp": "Picks top rater; breaks ties lexicographically."
        },
        {
          "clause": "UNION ALL",
          "exp": "Preserves duplicate names and appends query 2 directly underneath."
        },
        {
          "clause": "(SELECT m.title AS results",
          "exp": "Encloses query 2 in parentheses for February 2020 evaluation."
        },
        {
          "clause": "WHERE mr.created_at >= '2020-02-01' AND mr.created_at < '2020-03-01'",
          "exp": "SARGable range filter for February 2020."
        },
        {
          "clause": "GROUP BY m.movie_id, m.title",
          "exp": "Aggregates movie reviews in February."
        },
        {
          "clause": "ORDER BY AVG(mr.rating) DESC, m.title ASC LIMIT 1)",
          "exp": "Picks highest average score; breaks ties lexicographically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "WITH CTE Pipeline Approach",
          "complexity": "O(N log N) Clean CTE DAG",
          "sql": "WITH TopUser AS (\n    SELECT u.name AS results\n    FROM MovieRating mr JOIN Users u ON mr.user_id = u.user_id\n    GROUP BY u.user_id, u.name\n    ORDER BY COUNT(*) DESC, u.name ASC LIMIT 1\n),\nTopMovie AS (\n    SELECT m.title AS results\n    FROM MovieRating mr JOIN Movies m ON mr.movie_id = m.movie_id\n    WHERE mr.created_at >= '2020-02-01' AND mr.created_at <= '2020-02-29'\n    GROUP BY m.movie_id, m.title\n    ORDER BY AVG(mr.rating) DESC, m.title ASC LIMIT 1\n)\nSELECT * FROM TopUser\nUNION ALL\nSELECT * FROM TopMovie;",
          "explanation": "Uses top-level CTEs for maximum modularity and architectural clarity."
        }
      ]
    },
    {
      "id": 1321,
      "title": "Restaurant Growth",
      "difficulty": "Medium",
      "acceptance": "54.1%",
      "interviewFreq": "Very High • DoorDash, Uber, Amazon",
      "companies": [
        "DoorDash",
        "Uber",
        "Amazon",
        "Instacart"
      ],
      "prompt": "You are the restaurant owner and you want to analyze a possible expansion. You want to compute the moving average of how much the customer paid in a seven days window (i.e., current day + 6 days before).\n\naverage_amount should be rounded to 2 decimal places.\n\nReturn the result table ordered by visited_on in ascending order.\n\nNote: Only include dates that have at least 7 days of previous data available.",
      "sampleInput": {
        "table": "Customer",
        "columns": [
          "customer_id",
          "name",
          "visited_on",
          "amount"
        ],
        "rows": [
          [
            1,
            "Jhon",
            "2019-01-01",
            100
          ],
          [
            2,
            "Daniel",
            "2019-01-02",
            110
          ],
          [
            3,
            "Jade",
            "2019-01-03",
            120
          ],
          [
            4,
            "Khaled",
            "2019-01-04",
            130
          ],
          [
            5,
            "Winston",
            "2019-01-05",
            110
          ],
          [
            6,
            "Elvis",
            "2019-01-06",
            140
          ],
          [
            7,
            "Anna",
            "2019-01-07",
            150
          ],
          [
            8,
            "Maria",
            "2019-01-08",
            80
          ],
          [
            9,
            "Jaze",
            "2019-01-09",
            110
          ],
          [
            1,
            "Jhon",
            "2019-01-10",
            130
          ],
          [
            3,
            "Jade",
            "2019-01-10",
            150
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "visited_on",
          "amount",
          "average_amount"
        ],
        "rows": [
          [
            "2019-01-07",
            860,
            122.86
          ],
          [
            "2019-01-08",
            840,
            120
          ],
          [
            "2019-01-09",
            840,
            120
          ],
          [
            "2019-01-10",
            1000,
            142.86
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1321: CTE DAILY PRE-AGGREGATION &amp; 7-DAY ROLLING WINDOW</text>\n\n      <!-- Step 1: Pre-aggregation -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"140\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Step 1: Daily Sum CTE</text>\n        <text x=\"14\" y=\"44\" fill=\"#1e40af\" font-size=\"9.5\">Collapses duplicate visits:</text>\n        <text x=\"14\" y=\"64\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2019-01-01: $100</text>\n        <text x=\"14\" y=\"82\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">... (days 2 to 6)</text>\n        <text x=\"14\" y=\"100\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2019-01-07: $150</text>\n        <text x=\"14\" y=\"122\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\">2019-01-10: $280 (130+150)</text>\n      </g>\n\n      <path d=\"M 270 125 L 315 125\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Step 2: 7-Day Window Frame -->\n      <g transform=\"translate(325, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"140\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Step 2: ROWS 6 PRECEDING</text>\n        <text x=\"14\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">SUM(amount) OVER (</text>\n        <text x=\"14\" y=\"62\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">  ORDER BY visited_on</text>\n        <text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">  ROWS 6 PRECEDING)</text>\n        <rect x=\"14\" y=\"92\" width=\"252\" height=\"34\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"22\" y=\"112\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Avg = ROUND(SUM / 7, 2)</text>\n      </g>\n\n      <path d=\"M 620 125 L 665 125\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Step 3: Date Filter -->\n      <g transform=\"translate(675, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"170\" height=\"140\" rx=\"6\" fill=\"#faf5ff\" stroke=\"#a855f7\"/>\n        <text x=\"14\" y=\"24\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Step 3: Filter</text>\n        <text x=\"14\" y=\"46\" fill=\"#6b21a8\" font-size=\"9.5\">Keep dates with &gt;= 6</text>\n        <text x=\"14\" y=\"62\" fill=\"#6b21a8\" font-size=\"9.5\">prior days available:</text>\n        <text x=\"14\" y=\"84\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"9\">visited_on &gt;= MIN + 6</text>\n        <rect x=\"14\" y=\"98\" width=\"142\" height=\"28\" rx=\"4\" fill=\"#f3e8ff\"/>\n        <text x=\"22\" y=\"116\" fill=\"#6b21a8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">From Jan 7 onward</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Multiple customers can visit on the same day. First, pre-aggregate daily spending into a CTE `DailySpending`.",
        "Use window aggregation `SUM(amount) OVER(ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` to calculate the 7-day rolling total.",
        "Calculate `ROUND(total / 7.0, 2)` for the rolling average.",
        "Filter out the first 6 days where fewer than 7 days of historical rolling data exist (using a subquery `WHERE visited_on >= (SELECT MIN(visited_on) + INTERVAL 6 DAY FROM Customer)` or `DENSE_RANK >= 7`)."
      ],
      "trapsAndEdgeCases": [
        "Duplicate visits per day: If customer A spends $100 and customer B spends $150 on the same date, naive windowing on raw rows sees 2 rows for 1 day, corrupting `ROWS 6 PRECEDING`. You MUST pre-aggregate by date first!",
        "Integer division: Remember to divide by `7.0` (or `7`) and round to 2 decimal places."
      ],
      "solutionSQL": "WITH DailyTotals AS (\n    SELECT visited_on, SUM(amount) AS daily_amount\n    FROM Customer\n    GROUP BY visited_on\n),\nRollingMetrics AS (\n    SELECT\n        visited_on,\n        SUM(daily_amount) OVER(\n            ORDER BY visited_on\n            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n        ) AS amount,\n        ROUND(AVG(daily_amount) OVER(\n            ORDER BY visited_on\n            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n        ), 2) AS average_amount,\n        ROW_NUMBER() OVER(ORDER BY visited_on) AS row_num\n    FROM DailyTotals\n)\nSELECT visited_on, amount, average_amount\nFROM RollingMetrics\nWHERE row_num >= 7\nORDER BY visited_on;",
      "lineByLineExplanation": [
        {
          "clause": "WITH DailyTotals AS (...) ",
          "exp": "Pre-aggregates customer purchases by visit date to eliminate multiple transactions per day."
        },
        {
          "clause": "RollingMetrics AS (...) ",
          "exp": "Calculates running totals over 7 consecutive rows (6 preceding + current)."
        },
        {
          "clause": "SUM(daily_amount) OVER(ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
          "exp": "7-day moving window sum."
        },
        {
          "clause": "ROUND(AVG(daily_amount) OVER(...), 2)",
          "exp": "7-day moving window average rounded to 2 decimal places."
        },
        {
          "clause": "ROW_NUMBER() OVER(ORDER BY visited_on) AS row_num",
          "exp": "Assigns sequential index to identify whether at least 7 days of historical window exist."
        },
        {
          "clause": "WHERE row_num >= 7",
          "exp": "Filters out days 1-6 which have incomplete rolling windows."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Non-Equi Self-Join Approach",
          "complexity": "O(N^2) Cartesian Theta-Join",
          "sql": "SELECT a.visited_on,\n       SUM(b.amount) AS amount,\n       ROUND(SUM(b.amount) / 7.0, 2) AS average_amount\nFROM (SELECT visited_on, SUM(amount) AS amount FROM Customer GROUP BY visited_on) a\nJOIN (SELECT visited_on, SUM(amount) AS amount FROM Customer GROUP BY visited_on) b\n  ON DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6\nGROUP BY a.visited_on\nHAVING COUNT(b.visited_on) = 7\nORDER BY a.visited_on;",
          "explanation": "Self-joins pre-aggregated days with a 0 to 6 day gap and requires exactly 7 matched days in HAVING."
        }
      ]
    },
    {
      "id": 602,
      "title": "Friend Requests II: Who Has the Most Friends",
      "difficulty": "Medium",
      "acceptance": "58.7%",
      "interviewFreq": "Very High • Meta, LinkedIn, Amazon",
      "companies": [
        "Meta",
        "LinkedIn",
        "Amazon",
        "Apple"
      ],
      "prompt": "Write a solution to find the people who have the most friends and the most friends number.\n\nThe test cases are generated so that only one person has the most friends.",
      "sampleInput": {
        "table": "RequestAccepted",
        "columns": [
          "requester_id",
          "accepter_id",
          "accept_date"
        ],
        "rows": [
          [
            1,
            2,
            "2016/06/03"
          ],
          [
            1,
            3,
            "2016/06/08"
          ],
          [
            2,
            3,
            "2016/06/08"
          ],
          [
            3,
            4,
            "2016/06/09"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "num"
        ],
        "rows": [
          [
            3,
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 220\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"190\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #602: BIDIRECTIONAL SOCIAL GRAPH DEGREE EXPANSION VIA UNION ALL</text>\n\n      <!-- Raw Directed Edges -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"135\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Directed Graph Edges</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">requester | accepter</text>\n        <text x=\"14\" y=\"66\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">1         | 2</text>\n        <text x=\"14\" y=\"84\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">1         | 3</text>\n        <text x=\"14\" y=\"102\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">2         | 3</text>\n        <text x=\"14\" y=\"120\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">3         | 4</text>\n      </g>\n\n      <path d=\"M 275 120 L 320 120\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Bidirectional Expansion -->\n      <g transform=\"translate(330, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"135\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">UNION ALL (Both Sides)</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SELECT requester_id AS id ...</text>\n        <text x=\"14\" y=\"62\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">UNION ALL</text>\n        <text x=\"14\" y=\"78\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SELECT accepter_id AS id ...</text>\n        <rect x=\"14\" y=\"90\" width=\"252\" height=\"34\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"110\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">User 3 appears 3 times! (Max)</text>\n      </g>\n\n      <path d=\"M 625 120 L 670 120\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Top 1 -->\n      <g transform=\"translate(680, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"165\" height=\"135\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Winner: LIMIT 1</text>\n        <rect x=\"15\" y=\"48\" width=\"135\" height=\"36\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n        <text x=\"25\" y=\"70\" fill=\"#166534\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">id: 3 | num: 3</text>\n        <text x=\"14\" y=\"105\" fill=\"#475569\" font-size=\"9\">GROUP BY id</text>\n        <text x=\"14\" y=\"120\" fill=\"#475569\" font-size=\"9\">ORDER BY num DESC</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Friendship is an undirected relationship: if User 1 requests User 2, both User 1 and User 2 have gained 1 friend.",
        "Flatten both roles into a single stream of user tokens using `UNION ALL`.",
        "Group by user `id`, compute `COUNT(*)` as total friends.",
        "Sort by `num DESC` and emit the top record with `LIMIT 1`."
      ],
      "trapsAndEdgeCases": [
        "UNION vs UNION ALL: If you use `UNION` instead of `UNION ALL`, duplicate user instances are wiped out, destroying the accurate friend count! You must use `UNION ALL`.",
        "Tie-breaking: The problem guarantee states only one person has the most friends."
      ],
      "solutionSQL": "WITH AllFriendships AS (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n)\nSELECT id, COUNT(*) AS num\nFROM AllFriendships\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllFriendships AS (...) ",
          "exp": "Extracts an undirected stream of friendship touchpoints."
        },
        {
          "clause": "SELECT requester_id AS id UNION ALL SELECT accepter_id AS id",
          "exp": "Stacks outgoing and incoming friend connections into a unified single column."
        },
        {
          "clause": "SELECT id, COUNT(*) AS num",
          "exp": "Counts occurrences per user ID to compute their vertex degree in the social graph."
        },
        {
          "clause": "GROUP BY id",
          "exp": "Buckets counts per user."
        },
        {
          "clause": "ORDER BY num DESC LIMIT 1",
          "exp": "Extracts the globally most connected user."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Derived Table Inline Subquery",
          "complexity": "O(N log N) Sort & Limit",
          "sql": "SELECT id, COUNT(*) AS num\nFROM (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n) AS friends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
          "explanation": "Equivalent logic inlining the UNION ALL derived table directly into the FROM clause."
        }
      ]
    },
    {
      "id": 585,
      "title": "Investments in 2016",
      "difficulty": "Medium",
      "acceptance": "45.6%",
      "interviewFreq": "Very High • State Farm, Travelers, Capital One",
      "companies": [
        "State Farm",
        "Travelers",
        "Capital One",
        "JPMorgan Chase"
      ],
      "prompt": "Write a solution to report the sum of all total investment values in 2016 (tiv_2016) for all policyholders who:\n1. have the same tiv_2015 value as one or more other policyholders, and\n2. are not located in the same city as any other policyholder (i.e., the (lat, lon) attribute pairs must be unique).\n\nRound tiv_2016 to two decimal places.",
      "sampleInput": {
        "table": "Insurance",
        "columns": [
          "pid",
          "tiv_2015",
          "tiv_2016",
          "lat",
          "lon"
        ],
        "rows": [
          [
            1,
            10,
            5,
            10,
            10
          ],
          [
            2,
            20,
            20,
            20,
            20
          ],
          [
            3,
            10,
            30,
            20,
            20
          ],
          [
            4,
            10,
            40,
            40,
            40
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "tiv_2016"
        ],
        "rows": [
          [
            45
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #585: CORRELATED SUBQUERIES FOR VALUE DUPLICATION &amp; COORDINATE UNIQUENESS</text>\n\n      <!-- Step 1: Input Table -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"240\" height=\"145\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Insurance Policies</text>\n        <text x=\"14\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">PID 1: tiv15=10 | (10,10) ✓</text>\n        <text x=\"14\" y=\"66\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">PID 2: tiv15=20 | (20,20) ❌ (Unique tiv15)</text>\n        <text x=\"14\" y=\"88\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">PID 3: tiv15=10 | (20,20) ❌ (Dup Lat/Lon)</text>\n        <text x=\"14\" y=\"110\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">PID 4: tiv15=10 | (40,40) ✓</text>\n        <text x=\"14\" y=\"132\" fill=\"#15803d\" font-size=\"9\">PIDs 1 &amp; 4 meet BOTH filters!</text>\n      </g>\n\n      <path d=\"M 290 125 L 340 125\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Dual Filters -->\n      <g transform=\"translate(350, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"310\" height=\"145\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Dual Subquery Filter Gates</text>\n        <rect x=\"14\" y=\"38\" width=\"282\" height=\"38\" rx=\"4\" fill=\"#ffffff\" stroke=\"#93c5fd\"/>\n        <text x=\"22\" y=\"54\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Filter 1: tiv_2015 IN (</text>\n        <text x=\"22\" y=\"68\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">  SELECT tiv_2015 GROUP BY tiv_2015 HAVING COUNT(*) &gt; 1)</text>\n\n        <rect x=\"14\" y=\"86\" width=\"282\" height=\"38\" rx=\"4\" fill=\"#ffffff\" stroke=\"#93c5fd\"/>\n        <text x=\"22\" y=\"102\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Filter 2: (lat, lon) IN (</text>\n        <text x=\"22\" y=\"116\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">  SELECT lat, lon GROUP BY lat, lon HAVING COUNT(*) = 1)</text>\n      </g>\n\n      <path d=\"M 680 125 L 725 125\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Aggregation Sum -->\n      <g transform=\"translate(735, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"115\" height=\"145\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Total Sum</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">PID 1: $5.00</text>\n        <text x=\"12\" y=\"75\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">PID 4: $40.00</text>\n        <rect x=\"10\" y=\"95\" width=\"95\" height=\"34\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"57\" y=\"116\" text-anchor=\"middle\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">45.00</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Criterion 1: The policyholder's `tiv_2015` must be shared with at least one other policyholder (`COUNT(*) > 1`).",
        "Criterion 2: The policyholder's geographic coordinate `(lat, lon)` must be strictly unique (`COUNT(*) = 1`).",
        "We express both conditions as independent subqueries in the WHERE clause.",
        "Compute `ROUND(SUM(tiv_2016), 2)` across all qualifying policies."
      ],
      "trapsAndEdgeCases": [
        "Row Constructor Tuple Comparison: `(lat, lon) IN (SELECT lat, lon ...)` is clean in MySQL and PostgreSQL, but SQL Server requires string concatenation or CTE joins.",
        "Empty set sum: If no policies qualify, `SUM` returns NULL. The test cases guarantee matches, but in production wrap with `COALESCE(SUM(tiv_2016), 0)`."
      ],
      "solutionSQL": "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Insurance\nWHERE tiv_2015 IN (\n    SELECT tiv_2015\n    FROM Insurance\n    GROUP BY tiv_2015\n    HAVING COUNT(*) > 1\n)\nAND (lat, lon) IN (\n    SELECT lat, lon\n    FROM Insurance\n    GROUP BY lat, lon\n    HAVING COUNT(*) = 1\n);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016",
          "exp": "Computes total investment amount rounded to 2 decimal places."
        },
        {
          "clause": "FROM Insurance",
          "exp": "Source policies catalog."
        },
        {
          "clause": "WHERE tiv_2015 IN (SELECT tiv_2015 ... HAVING COUNT(*) > 1)",
          "exp": "Subquery filter 1: Retains only non-unique 2015 investment amounts."
        },
        {
          "clause": "AND (lat, lon) IN (SELECT lat, lon ... HAVING COUNT(*) = 1)",
          "exp": "Subquery filter 2: Retains only unique geographic coordinate pairs."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window Functions Pattern",
          "complexity": "O(N log N) Window Partitions",
          "sql": "WITH Evaluated AS (\n    SELECT tiv_2016,\n           COUNT(*) OVER(PARTITION BY tiv_2015) AS count_tiv15,\n           COUNT(*) OVER(PARTITION BY lat, lon) AS count_location\n    FROM Insurance\n)\nSELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Evaluated\nWHERE count_tiv15 > 1 AND count_location = 1;",
          "explanation": "Eliminates subqueries entirely using two window partition counts over tiv_2015 and coordinates."
        }
      ]
    },
    {
      "id": 185,
      "title": "Department Top Three Salaries",
      "difficulty": "Hard",
      "acceptance": "51.4%",
      "interviewFreq": "Very High • Google, Amazon, Meta, Microsoft",
      "companies": [
        "Google",
        "Amazon",
        "Meta",
        "Microsoft",
        "Apple",
        "Netflix"
      ],
      "prompt": "A company's executives are interested in seeing who earns the most money in each of the company's departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.\n\nWrite a solution to find the employees who are high earners in each of the departments.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Employee & Department",
        "columns": [
          "id",
          "name",
          "salary",
          "departmentId"
        ],
        "rows": [
          [
            1,
            "Joe",
            85000,
            1
          ],
          [
            2,
            "Henry",
            80000,
            2
          ],
          [
            3,
            "Sam",
            60000,
            2
          ],
          [
            4,
            "Max",
            90000,
            1
          ],
          [
            5,
            "Janet",
            69000,
            1
          ],
          [
            6,
            "Randy",
            85000,
            1
          ],
          [
            7,
            "Will",
            70000,
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "Department",
          "Employee",
          "Salary"
        ],
        "rows": [
          [
            "IT",
            "Max",
            90000
          ],
          [
            "IT",
            "Joe",
            85000
          ],
          [
            "IT",
            "Randy",
            85000
          ],
          [
            "IT",
            "Will",
            70000
          ],
          [
            "Sales",
            "Henry",
            80000
          ],
          [
            "Sales",
            "Sam",
            60000
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #185 (HARD): CORRELATED SUBQUERY RELATIONAL RANKING VS DENSE_RANK()</text>\n\n      <!-- Department IT Breakdown -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"260\" height=\"145\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"22\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Dept 1 (IT) Salaries</text>\n        <text x=\"14\" y=\"44\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Max:   $90,000 [Rank 1] ✓</text>\n        <text x=\"14\" y=\"64\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Joe:   $85,000 [Rank 2 (Tie)] ✓</text>\n        <text x=\"14\" y=\"84\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Randy: $85,000 [Rank 2 (Tie)] ✓</text>\n        <text x=\"14\" y=\"104\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Will:  $70,000 [Rank 3] ✓</text>\n        <text x=\"14\" y=\"124\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Janet: $69,000 [Rank 4] ❌ Cut</text>\n      </g>\n\n      <path d=\"M 315 125 L 365 125\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Correlated Subquery Concept -->\n      <g transform=\"translate(375, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"290\" height=\"145\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\"/>\n        <text x=\"14\" y=\"24\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Correlated Subquery Logic</text>\n        <text x=\"14\" y=\"46\" fill=\"#854d0e\" font-size=\"9.5\">For employee e1, count distinct salaries in</text>\n        <text x=\"14\" y=\"62\" fill=\"#854d0e\" font-size=\"9.5\">same department strictly higher than e1.salary:</text>\n        <rect x=\"14\" y=\"74\" width=\"262\" height=\"38\" rx=\"4\" fill=\"#fef3c7\"/>\n        <text x=\"22\" y=\"90\" fill=\"#92400e\" font-family=\"monospace\" font-size=\"9.5\">COUNT(DISTINCT e2.salary) &lt; 3</text>\n        <text x=\"22\" y=\"104\" fill=\"#64748b\" font-size=\"8.5\">Rank 1 has 0 higher, Rank 2 has 1, Rank 3 has 2.</text>\n        <text x=\"14\" y=\"130\" fill=\"#15803d\" font-size=\"9\" font-weight=\"700\">Preserves ties without skipping ranks!</text>\n      </g>\n\n      <path d=\"M 685 125 L 730 125\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Table -->\n      <g transform=\"translate(740, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"115\" height=\"145\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"10\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Projected Set</text>\n        <text x=\"10\" y=\"44\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Max</text>\n        <text x=\"10\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Joe</text>\n        <text x=\"10\" y=\"76\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Randy</text>\n        <text x=\"10\" y=\"92\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Will</text>\n        <text x=\"10\" y=\"108\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">Sales | Henry</text>\n        <text x=\"10\" y=\"124\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">Sales | Sam</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The definition specifies 'top three UNIQUE salaries'. This means if two employees share the #2 salary, both are included, and the next highest salary is #3.",
        "Canonical Subquery Solution: An employee e1 is in the top 3 unique salaries of their department if and only if the count of distinct salaries in the same department strictly greater than `e1.salary` is strictly less than 3 (`0, 1, or 2`).",
        "Join the filtered employees with the `Department` table to output the department name.",
        "Alternatively, using Window Functions: `DENSE_RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) <= 3`."
      ],
      "trapsAndEdgeCases": [
        "RANK vs DENSE_RANK: Standard RANK() skips positions after ties (e.g. 1, 2, 2, 4). This would incorrectly eliminate Will ($70k). We must use DENSE_RANK() or COUNT(DISTINCT).",
        "Correlated Subquery Condition: Remember the inequality `e2.salary > e1.salary` and `< 3`. A common error is writing `<= 3` or forgetting `DISTINCT`."
      ],
      "solutionSQL": "SELECT\n    d.name AS Department,\n    e1.name AS Employee,\n    e1.salary AS Salary\nFROM Employee e1\nJOIN Department d ON e1.departmentId = d.id\nWHERE 3 > (\n    SELECT COUNT(DISTINCT e2.salary)\n    FROM Employee e2\n    WHERE e2.departmentId = e1.departmentId\n      AND e2.salary > e1.salary\n);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT d.name AS Department, e1.name AS Employee, e1.salary AS Salary",
          "exp": "Formats and projects the required result columns."
        },
        {
          "clause": "FROM Employee e1 JOIN Department d ON e1.departmentId = d.id",
          "exp": "Binds employees to department metadata."
        },
        {
          "clause": "WHERE 3 > (SELECT COUNT(DISTINCT e2.salary) ...)",
          "exp": "Correlated subquery: counts how many distinct salaries in this department exceed e1's salary."
        },
        {
          "clause": "WHERE e2.departmentId = e1.departmentId",
          "exp": "Restricts subquery comparison to the same department."
        },
        {
          "clause": "AND e2.salary > e1.salary",
          "exp": "Checks strictly higher salary thresholds (0, 1, or 2 higher salaries allowed)."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Modern DENSE_RANK() Window CTE",
          "complexity": "O(N log N) Window Sort",
          "sql": "WITH RankedSalaries AS (\n    SELECT\n        d.name AS Department,\n        e.name AS Employee,\n        e.salary AS Salary,\n        DENSE_RANK() OVER(PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk\n    FROM Employee e\n    JOIN Department d ON e.departmentId = d.id\n)\nSELECT Department, Employee, Salary\nFROM RankedSalaries\nWHERE rnk <= 3;",
          "explanation": "The industry standard production approach using DENSE_RANK() to seamlessly handle salary ties."
        }
      ]
    }
  ],
  "mcqs": [
    {
      "id": 601,
      "q": "[Concept 6 Drill Q1] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 602,
      "q": "[Concept 6 Drill Q2] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 603,
      "q": "[Concept 6 Drill Q3] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 604,
      "q": "[Concept 6 Drill Q4] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 605,
      "q": "[Concept 6 Drill Q5] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 606,
      "q": "[Concept 6 Drill Q6] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 607,
      "q": "[Concept 6 Drill Q7] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 608,
      "q": "[Concept 6 Drill Q8] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 609,
      "q": "[Concept 6 Drill Q9] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 610,
      "q": "[Concept 6 Drill Q10] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 611,
      "q": "[Concept 6 Drill Q11] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 612,
      "q": "[Concept 6 Drill Q12] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 613,
      "q": "[Concept 6 Drill Q13] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 614,
      "q": "[Concept 6 Drill Q14] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 615,
      "q": "[Concept 6 Drill Q15] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 616,
      "q": "[Concept 6 Drill Q16] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 617,
      "q": "[Concept 6 Drill Q17] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 618,
      "q": "[Concept 6 Drill Q18] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 619,
      "q": "[Concept 6 Drill Q19] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 620,
      "q": "[Concept 6 Drill Q20] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 621,
      "q": "[Concept 6 Drill Q21] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 622,
      "q": "[Concept 6 Drill Q22] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 623,
      "q": "[Concept 6 Drill Q23] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 624,
      "q": "[Concept 6 Drill Q24] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 625,
      "q": "[Concept 6 Drill Q25] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 626,
      "q": "[Concept 6 Drill Q26] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 627,
      "q": "[Concept 6 Drill Q27] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 628,
      "q": "[Concept 6 Drill Q28] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 629,
      "q": "[Concept 6 Drill Q29] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 630,
      "q": "[Concept 6 Drill Q30] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 631,
      "q": "[Concept 6 Drill Q31] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 632,
      "q": "[Concept 6 Drill Q32] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 633,
      "q": "[Concept 6 Drill Q33] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 634,
      "q": "[Concept 6 Drill Q34] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 635,
      "q": "[Concept 6 Drill Q35] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 636,
      "q": "[Concept 6 Drill Q36] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 637,
      "q": "[Concept 6 Drill Q37] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 638,
      "q": "[Concept 6 Drill Q38] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 639,
      "q": "[Concept 6 Drill Q39] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 640,
      "q": "[Concept 6 Drill Q40] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 641,
      "q": "[Concept 6 Drill Q41] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 642,
      "q": "[Concept 6 Drill Q42] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 643,
      "q": "[Concept 6 Drill Q43] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 644,
      "q": "[Concept 6 Drill Q44] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 645,
      "q": "[Concept 6 Drill Q45] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 646,
      "q": "[Concept 6 Drill Q46] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 647,
      "q": "[Concept 6 Drill Q47] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 648,
      "q": "[Concept 6 Drill Q48] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 649,
      "q": "[Concept 6 Drill Q49] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 650,
      "q": "[Concept 6 Drill Q50] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 651,
      "q": "[Concept 6 Drill Q51] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 652,
      "q": "[Concept 6 Drill Q52] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 653,
      "q": "[Concept 6 Drill Q53] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 654,
      "q": "[Concept 6 Drill Q54] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 655,
      "q": "[Concept 6 Drill Q55] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 656,
      "q": "[Concept 6 Drill Q56] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 657,
      "q": "[Concept 6 Drill Q57] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 658,
      "q": "[Concept 6 Drill Q58] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 659,
      "q": "[Concept 6 Drill Q59] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 660,
      "q": "[Concept 6 Drill Q60] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 661,
      "q": "[Concept 6 Drill Q61] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 662,
      "q": "[Concept 6 Drill Q62] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 663,
      "q": "[Concept 6 Drill Q63] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 664,
      "q": "[Concept 6 Drill Q64] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 665,
      "q": "[Concept 6 Drill Q65] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 666,
      "q": "[Concept 6 Drill Q66] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 667,
      "q": "[Concept 6 Drill Q67] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 668,
      "q": "[Concept 6 Drill Q68] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 669,
      "q": "[Concept 6 Drill Q69] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 670,
      "q": "[Concept 6 Drill Q70] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 671,
      "q": "[Concept 6 Drill Q71] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 672,
      "q": "[Concept 6 Drill Q72] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 673,
      "q": "[Concept 6 Drill Q73] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 674,
      "q": "[Concept 6 Drill Q74] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 675,
      "q": "[Concept 6 Drill Q75] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 676,
      "q": "[Concept 6 Drill Q76] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 677,
      "q": "[Concept 6 Drill Q77] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 678,
      "q": "[Concept 6 Drill Q78] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 679,
      "q": "[Concept 6 Drill Q79] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 680,
      "q": "[Concept 6 Drill Q80] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 681,
      "q": "[Concept 6 Drill Q81] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 682,
      "q": "[Concept 6 Drill Q82] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 683,
      "q": "[Concept 6 Drill Q83] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 684,
      "q": "[Concept 6 Drill Q84] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 685,
      "q": "[Concept 6 Drill Q85] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 686,
      "q": "[Concept 6 Drill Q86] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 687,
      "q": "[Concept 6 Drill Q87] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 688,
      "q": "[Concept 6 Drill Q88] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 689,
      "q": "[Concept 6 Drill Q89] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 690,
      "q": "[Concept 6 Drill Q90] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 691,
      "q": "[Concept 6 Drill Q91] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 692,
      "q": "[Concept 6 Drill Q92] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 693,
      "q": "[Concept 6 Drill Q93] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 694,
      "q": "[Concept 6 Drill Q94] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 695,
      "q": "[Concept 6 Drill Q95] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    },
    {
      "id": 696,
      "q": "[Concept 6 Drill Q96] Why does `WHERE id NOT IN (SELECT manager_id FROM Employees)` return zero rows if just one manager_id is NULL?",
      "options": [
        "Because SQL optimizes NOT IN queries by dropping NULL rows before evaluation",
        "Because `val <> NULL` evaluates to UNKNOWN, making the entire AND-chain UNKNOWN, which WHERE rejects",
        "Because foreign keys require manager_id to be NOT NULL in all ANSI compliant databases",
        "Because subqueries in WHERE clauses automatically throw a syntax error when encountering NULL"
      ],
      "correctIndex": 1,
      "explanation": "Under Three-Valued Logic, NOT IN expands to an AND-chain of inequalities. Any inequality compared against NULL yields UNKNOWN. Since TRUE AND UNKNOWN yields UNKNOWN, no rows satisfy the WHERE filter.",
      "isTrap": true,
      "trapBadge": "Critical 3VL Trap"
    },
    {
      "id": 697,
      "q": "[Concept 6 Drill Q97] What happens when a scalar subquery in `WHERE salary > (SELECT salary FROM Employees WHERE dept = 'Sales')` matches 3 employees?",
      "options": [
        "The engine selects the maximum salary among the 3 employees automatically",
        "The engine raises a fatal runtime error: 'Subquery returns more than 1 row'",
        "The engine evaluates the condition using ANY semantics",
        "The engine returns NULL for the outer condition"
      ],
      "correctIndex": 1,
      "explanation": "Comparison operators like `>`, `<`, `=` require a single scalar token on both sides. If the subquery yields >1 row, a runtime error is raised.",
      "isTrap": true,
      "trapBadge": "Runtime Cardinality Error"
    },
    {
      "id": 698,
      "q": "[Concept 6 Drill Q98] How does the execution engine optimize an `EXISTS (SELECT 1 FROM Orders WHERE customer_id = c.id)` condition?",
      "options": [
        "It counts all matching orders to ensure the count is greater than zero",
        "It stops scanning Orders as soon as the first matching record is located ($O(1)$ short-circuit)",
        "It creates an in-memory temporary table containing all orders for that customer",
        "It reorders the query into a CROSS JOIN followed by a DISTINCT filter"
      ],
      "correctIndex": 1,
      "explanation": "EXISTS checks strictly for the presence of at least one row token. Once a single match is found, evaluation terminates immediately without reading remaining rows.",
      "isTrap": false
    },
    {
      "id": 699,
      "q": "[Concept 6 Drill Q99] What is an 'optimization barrier' in the context of Common Table Expressions (CTEs)?",
      "options": [
        "A restriction where CTEs cannot be referenced more than once in the same query",
        "When the engine materializes a CTE in isolation, preventing outer WHERE filters from pushing down into the CTE",
        "A memory error thrown when a recursive CTE exceeds the maximum recursion limit",
        "A syntax rule requiring all CTE columns to have explicit datatypes"
      ],
      "correctIndex": 1,
      "explanation": "An optimization barrier occurs when the query planner treats the CTE as a black box and does not push outer filter predicates down into the CTE's internal table scan.",
      "isTrap": false
    },
    {
      "id": 700,
      "q": "[Concept 6 Drill Q100] When a database optimizer 'unnests' an `IN` subquery into a Semi-Join, what is the primary performance benefit?",
      "options": [
        "It allows the engine to use Hash Join or Merge Join algorithms instead of an O(N x M) nested loop",
        "It converts all outer join columns into primary keys automatically",
        "It eliminates the need for any indexes on both outer and inner tables",
        "It guarantees zero disk spills regardless of data volume"
      ],
      "correctIndex": 0,
      "explanation": "Unnesting turns a row-by-row nested execution loop into a set-oriented Semi-Join, allowing the engine to leverage efficient Hash Joins and index-backed Merge Joins.",
      "isTrap": false
    }
  ],
  "drills": [
    {
      "id": 601,
      "title": "Unmanaged Employee Identification (Scenario 1)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 1).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 602,
      "title": "Dual-Condition Transaction Threshold (Scenario 2)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 2).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 603,
      "title": "Universal Product Category Completers (Scenario 3)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 3).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 604,
      "title": "Top Rated Movie per Genre (Scenario 4)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 4).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 605,
      "title": "Mutual Friendship Reciprocity (Scenario 5)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 5).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 606,
      "title": "Unmanaged Employee Identification (Scenario 6)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 6).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 607,
      "title": "Dual-Condition Transaction Threshold (Scenario 7)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 7).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 608,
      "title": "Universal Product Category Completers (Scenario 8)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 8).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 609,
      "title": "Top Rated Movie per Genre (Scenario 9)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 9).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 610,
      "title": "Mutual Friendship Reciprocity (Scenario 10)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 10).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 611,
      "title": "Unmanaged Employee Identification (Scenario 11)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 11).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 612,
      "title": "Dual-Condition Transaction Threshold (Scenario 12)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 12).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 613,
      "title": "Universal Product Category Completers (Scenario 13)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 13).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 614,
      "title": "Top Rated Movie per Genre (Scenario 14)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 14).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 615,
      "title": "Mutual Friendship Reciprocity (Scenario 15)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 15).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 616,
      "title": "Unmanaged Employee Identification (Scenario 16)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 16).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 617,
      "title": "Dual-Condition Transaction Threshold (Scenario 17)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 17).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 618,
      "title": "Universal Product Category Completers (Scenario 18)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 18).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 619,
      "title": "Top Rated Movie per Genre (Scenario 19)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 19).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 620,
      "title": "Mutual Friendship Reciprocity (Scenario 20)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 20).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 621,
      "title": "Unmanaged Employee Identification (Scenario 21)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 21).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 622,
      "title": "Dual-Condition Transaction Threshold (Scenario 22)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 22).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 623,
      "title": "Universal Product Category Completers (Scenario 23)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 23).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 624,
      "title": "Top Rated Movie per Genre (Scenario 24)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 24).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 625,
      "title": "Mutual Friendship Reciprocity (Scenario 25)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 25).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 626,
      "title": "Unmanaged Employee Identification (Scenario 26)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 26).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 627,
      "title": "Dual-Condition Transaction Threshold (Scenario 27)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 27).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 628,
      "title": "Universal Product Category Completers (Scenario 28)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 28).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 629,
      "title": "Top Rated Movie per Genre (Scenario 29)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 29).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 630,
      "title": "Mutual Friendship Reciprocity (Scenario 30)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 30).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 631,
      "title": "Unmanaged Employee Identification (Scenario 31)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 31).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 632,
      "title": "Dual-Condition Transaction Threshold (Scenario 32)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 32).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 633,
      "title": "Universal Product Category Completers (Scenario 33)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 33).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 634,
      "title": "Top Rated Movie per Genre (Scenario 34)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 34).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 635,
      "title": "Mutual Friendship Reciprocity (Scenario 35)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 35).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 636,
      "title": "Unmanaged Employee Identification (Scenario 36)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 36).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 637,
      "title": "Dual-Condition Transaction Threshold (Scenario 37)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 37).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 638,
      "title": "Universal Product Category Completers (Scenario 38)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 38).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 639,
      "title": "Top Rated Movie per Genre (Scenario 39)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 39).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 640,
      "title": "Mutual Friendship Reciprocity (Scenario 40)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 40).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 641,
      "title": "Unmanaged Employee Identification (Scenario 41)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 41).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 642,
      "title": "Dual-Condition Transaction Threshold (Scenario 42)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 42).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 643,
      "title": "Universal Product Category Completers (Scenario 43)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 43).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 644,
      "title": "Top Rated Movie per Genre (Scenario 44)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 44).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 645,
      "title": "Mutual Friendship Reciprocity (Scenario 45)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 45).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 646,
      "title": "Unmanaged Employee Identification (Scenario 46)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 46).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 647,
      "title": "Dual-Condition Transaction Threshold (Scenario 47)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 47).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 648,
      "title": "Universal Product Category Completers (Scenario 48)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 48).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 649,
      "title": "Top Rated Movie per Genre (Scenario 49)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 49).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 650,
      "title": "Mutual Friendship Reciprocity (Scenario 50)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 50).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 651,
      "title": "Unmanaged Employee Identification (Scenario 51)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 51).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 652,
      "title": "Dual-Condition Transaction Threshold (Scenario 52)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 52).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 653,
      "title": "Universal Product Category Completers (Scenario 53)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 53).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 654,
      "title": "Top Rated Movie per Genre (Scenario 54)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 54).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 655,
      "title": "Mutual Friendship Reciprocity (Scenario 55)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 55).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 656,
      "title": "Unmanaged Employee Identification (Scenario 56)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 56).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 657,
      "title": "Dual-Condition Transaction Threshold (Scenario 57)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 57).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 658,
      "title": "Universal Product Category Completers (Scenario 58)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 58).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 659,
      "title": "Top Rated Movie per Genre (Scenario 59)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 59).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 660,
      "title": "Mutual Friendship Reciprocity (Scenario 60)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 60).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 661,
      "title": "Unmanaged Employee Identification (Scenario 61)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 61).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 662,
      "title": "Dual-Condition Transaction Threshold (Scenario 62)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 62).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 663,
      "title": "Universal Product Category Completers (Scenario 63)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 63).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 664,
      "title": "Top Rated Movie per Genre (Scenario 64)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 64).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 665,
      "title": "Mutual Friendship Reciprocity (Scenario 65)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 65).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 666,
      "title": "Unmanaged Employee Identification (Scenario 66)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 66).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 667,
      "title": "Dual-Condition Transaction Threshold (Scenario 67)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 67).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 668,
      "title": "Universal Product Category Completers (Scenario 68)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 68).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 669,
      "title": "Top Rated Movie per Genre (Scenario 69)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 69).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 670,
      "title": "Mutual Friendship Reciprocity (Scenario 70)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 70).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 671,
      "title": "Unmanaged Employee Identification (Scenario 71)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 71).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 672,
      "title": "Dual-Condition Transaction Threshold (Scenario 72)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 72).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 673,
      "title": "Universal Product Category Completers (Scenario 73)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 73).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 674,
      "title": "Top Rated Movie per Genre (Scenario 74)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 74).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 675,
      "title": "Mutual Friendship Reciprocity (Scenario 75)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 75).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 676,
      "title": "Unmanaged Employee Identification (Scenario 76)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 76).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 677,
      "title": "Dual-Condition Transaction Threshold (Scenario 77)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 77).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 678,
      "title": "Universal Product Category Completers (Scenario 78)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 78).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 679,
      "title": "Top Rated Movie per Genre (Scenario 79)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 79).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 680,
      "title": "Mutual Friendship Reciprocity (Scenario 80)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 80).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 681,
      "title": "Unmanaged Employee Identification (Scenario 81)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 81).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 682,
      "title": "Dual-Condition Transaction Threshold (Scenario 82)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 82).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 683,
      "title": "Universal Product Category Completers (Scenario 83)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 83).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 684,
      "title": "Top Rated Movie per Genre (Scenario 84)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 84).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 685,
      "title": "Mutual Friendship Reciprocity (Scenario 85)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 85).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 686,
      "title": "Unmanaged Employee Identification (Scenario 86)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 86).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 687,
      "title": "Dual-Condition Transaction Threshold (Scenario 87)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 87).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 688,
      "title": "Universal Product Category Completers (Scenario 88)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 88).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 689,
      "title": "Top Rated Movie per Genre (Scenario 89)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 89).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 690,
      "title": "Mutual Friendship Reciprocity (Scenario 90)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 90).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 691,
      "title": "Unmanaged Employee Identification (Scenario 91)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 91).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 692,
      "title": "Dual-Condition Transaction Threshold (Scenario 92)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 92).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 693,
      "title": "Universal Product Category Completers (Scenario 93)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 93).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 694,
      "title": "Top Rated Movie per Genre (Scenario 94)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 94).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 695,
      "title": "Mutual Friendship Reciprocity (Scenario 95)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 95).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 696,
      "title": "Unmanaged Employee Identification (Scenario 96)",
      "domain": "Corporate HR & Payroll",
      "task": "Find all employees whose salary exceeds $30k and whose manager does not exist in the employee roster. (Test case 96).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 697,
      "title": "Dual-Condition Transaction Threshold (Scenario 97)",
      "domain": "Financial Auditing",
      "task": "Identify accounts whose total transactions in 2026 exceed the overall account average using a CTE. (Test case 97).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 698,
      "title": "Universal Product Category Completers (Scenario 98)",
      "domain": "E-Commerce Logistics",
      "task": "Find customer IDs who have placed orders across every single warehouse category using relational division. (Test case 98).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 699,
      "title": "Top Rated Movie per Genre (Scenario 99)",
      "domain": "Streaming Media",
      "task": "Compute the highest-rated movie for each genre using a correlated subquery in the WHERE clause. (Test case 99).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    },
    {
      "id": 700,
      "title": "Mutual Friendship Reciprocity (Scenario 100)",
      "domain": "Social Network Graph",
      "task": "Identify user pairs who have mutual bidirectional friend requests using CTE union sets. (Test case 100).",
      "starterSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  );",
      "solutionSQL": "SELECT employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY employee_id;",
      "explanation": "Using NOT EXISTS guards against NULL manager_ids and allows index short-circuiting on the parent table."
    }
  ],
  "problems": [
    {
      "id": 1978,
      "title": "Employees Whose Manager Left the Company",
      "difficulty": "Easy",
      "acceptance": "48.2%",
      "interviewFreq": "Very High • Amazon, Meta, Bloomberg",
      "companies": [
        "Amazon",
        "Meta",
        "Bloomberg",
        "Uber"
      ],
      "prompt": "Find the IDs of the employees whose salary is strictly less than $30,000 and whose manager left the company.\n\nWhen a manager leaves the company, their information is deleted from the Employees table, but their employee report still has their manager_id set to that manager's old ID.\n\nReturn the result table ordered by employee_id.",
      "sampleInput": {
        "table": "Employees",
        "columns": [
          "employee_id",
          "name",
          "manager_id",
          "salary"
        ],
        "rows": [
          [
            3,
            "Mila",
            9,
            60301
          ],
          [
            12,
            "Anton",
            null,
            31000
          ],
          [
            13,
            "Emery",
            null,
            67084
          ],
          [
            1,
            "Kalel",
            11,
            21241
          ],
          [
            9,
            "Mikaela",
            null,
            50937
          ],
          [
            11,
            "Joziah",
            6,
            28485
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "employee_id"
        ],
        "rows": [
          [
            11
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1978: ORPHANED MANAGER DETECTION &amp; SALARY FILTER</text>\n\n      <!-- Table: Employees -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"300\" height=\"145\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"12\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Employees (Outer Set)</text>\n        <text x=\"12\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 1  | sal: $21,241 | mgr: 11 (Joziah exists ✓)</text>\n        <rect x=\"8\" y=\"50\" width=\"284\" height=\"24\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"12\" y=\"66\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">emp_id: 11 | sal: $28,485 | mgr: 6 (NOT IN ROSTER! 🚨)</text>\n        <text x=\"12\" y=\"90\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 3  | sal: $60,301 | mgr: 9  (Salary &gt;= $30k ❌)</text>\n        <text x=\"12\" y=\"108\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 12 | sal: $31,000 | mgr: NULL (No manager ❌)</text>\n        <text x=\"12\" y=\"126\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">emp_id: 9  | sal: $50,937 | mgr: NULL (No manager ❌)</text>\n      </g>\n\n      <!-- Subquery Filter Path -->\n      <path d=\"M 345 105 L 405 105\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n      <text x=\"375\" y=\"95\" text-anchor=\"middle\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9\">mgr NOT IN</text>\n\n      <!-- Subquery Result -->\n      <g transform=\"translate(415, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"240\" height=\"145\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\"/>\n        <text x=\"12\" y=\"22\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Subquery: All Existing IDs</text>\n        <text x=\"12\" y=\"44\" fill=\"#854d0e\" font-family=\"monospace\" font-size=\"10\">Active IDs: [3, 12, 13, 1, 9, 11]</text>\n        <text x=\"12\" y=\"70\" fill=\"#475569\" font-size=\"9.5\">Mgr ID 11 is in list =&gt; Retained</text>\n        <text x=\"12\" y=\"90\" fill=\"#b45309\" font-size=\"9.5\" font-weight=\"700\">Mgr ID 6 is NOT in list! =&gt; Orphan!</text>\n        <rect x=\"12\" y=\"105\" width=\"216\" height=\"28\" rx=\"4\" fill=\"#fef3c7\"/>\n        <text x=\"20\" y=\"123\" fill=\"#92400e\" font-family=\"monospace\" font-size=\"9.5\">Salary &lt; $30k AND Mgr Left</text>\n      </g>\n\n      <path d=\"M 665 105 L 710 105\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Final Projection -->\n      <g transform=\"translate(720, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"125\" height=\"145\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Result Table</text>\n        <rect x=\"15\" y=\"42\" width=\"95\" height=\"28\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n        <text x=\"62\" y=\"60\" text-anchor=\"middle\" fill=\"#166534\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">11</text>\n        <text x=\"12\" y=\"95\" fill=\"#475569\" font-size=\"9\">ORDER BY</text>\n        <text x=\"12\" y=\"112\" fill=\"#475569\" font-family=\"monospace\" font-size=\"9\">employee_id</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Filter outer rows to employees strictly earning < $30,000.",
        "Filter out top-level executives whose manager_id IS NULL.",
        "Check that manager_id does not exist in the current set of employee_ids using `NOT IN (SELECT employee_id FROM Employees)` or `NOT EXISTS`.",
        "Sort output ascending by employee_id."
      ],
      "trapsAndEdgeCases": [
        "Critical Trap: If you omit `manager_id IS NOT NULL`, employees with NULL manager will cause `NOT IN` to fail or incorrectly include top executives.",
        "The NOT IN NULL trap: While the inner query returns employee_id (primary key, which is never NULL), in real-world schemas where inner column could be nullable, NOT IN evaluates to UNKNOWN!"
      ],
      "solutionSQL": "SELECT employee_id\nFROM Employees\nWHERE salary < 30000\n  AND manager_id IS NOT NULL\n  AND manager_id NOT IN (\n    SELECT employee_id FROM Employees\n  )\nORDER BY employee_id;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT employee_id",
          "exp": "Emits the primary key ID of employees meeting both salary and orphaned manager criteria."
        },
        {
          "clause": "FROM Employees",
          "exp": "Scans candidate records from the organization employee roster."
        },
        {
          "clause": "WHERE salary < 30000",
          "exp": "Applies the strict financial threshold requirement."
        },
        {
          "clause": "AND manager_id IS NOT NULL",
          "exp": "Guards against top-level managers/CEOs who naturally report to nobody."
        },
        {
          "clause": "AND manager_id NOT IN (SELECT employee_id FROM Employees)",
          "exp": "Subquery check: verifies that the manager ID does not exist anywhere in the active roster."
        },
        {
          "clause": "ORDER BY employee_id",
          "exp": "Ensures deterministic ascending sorting requested by specification."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "NOT EXISTS Correlated Subquery",
          "complexity": "O(N) with index scan",
          "sql": "SELECT e.employee_id\nFROM Employees e\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1 FROM Employees m WHERE m.employee_id = e.manager_id\n  )\nORDER BY e.employee_id;",
          "explanation": "Uses NOT EXISTS to avoid 3VL NULL issues and enables direct B-Tree index seek on the manager employee_id."
        },
        {
          "name": "Self LEFT JOIN Anti-Join Pattern",
          "complexity": "O(N log N) Hash/Merge Anti-Join",
          "sql": "SELECT e.employee_id\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.employee_id\nWHERE e.salary < 30000\n  AND e.manager_id IS NOT NULL\n  AND m.employee_id IS NULL\nORDER BY e.employee_id;",
          "explanation": "Outer-joins employees against managers and filters for unmatched right-side keys (`m.employee_id IS NULL`)."
        }
      ]
    },
    {
      "id": 626,
      "title": "Exchange Seats",
      "difficulty": "Medium",
      "acceptance": "68.9%",
      "interviewFreq": "Very High • Google, Amazon, Bloomberg",
      "companies": [
        "Google",
        "Amazon",
        "Bloomberg",
        "Goldman Sachs"
      ],
      "prompt": "Write a solution to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.\n\nReturn the result table ordered by id in ascending order.",
      "sampleInput": {
        "table": "Seat",
        "columns": [
          "id",
          "student"
        ],
        "rows": [
          [
            1,
            "Abbot"
          ],
          [
            2,
            "Doris"
          ],
          [
            3,
            "Emerson"
          ],
          [
            4,
            "Green"
          ],
          [
            5,
            "Jeames"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "student"
        ],
        "rows": [
          [
            1,
            "Doris"
          ],
          [
            2,
            "Abbot"
          ],
          [
            3,
            "Green"
          ],
          [
            4,
            "Emerson"
          ],
          [
            5,
            "Jeames"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 220\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"190\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #626: CONSECUTIVE SEAT PARITY SWAP &amp; SCALAR SUBQUERY CEILING</text>\n\n      <!-- Original Rows -->\n      <g transform=\"translate(40, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"135\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Seat (Original)</text>\n        <text x=\"14\" y=\"46\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">id: 1 (ODD)  | 'Abbot'</text>\n        <text x=\"14\" y=\"66\" fill=\"#16a34a\" font-family=\"monospace\" font-size=\"10\">id: 2 (EVEN) | 'Doris'</text>\n        <text x=\"14\" y=\"86\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">id: 3 (ODD)  | 'Emerson'</text>\n        <text x=\"14\" y=\"106\" fill=\"#16a34a\" font-family=\"monospace\" font-size=\"10\">id: 4 (EVEN) | 'Green'</text>\n        <text x=\"14\" y=\"126\" fill=\"#d97706\" font-family=\"monospace\" font-size=\"10\">id: 5 (LAST) | 'Jeames'</text>\n      </g>\n\n      <path d=\"M 280 120 L 330 120\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Logic Evaluation Box -->\n      <g transform=\"translate(340, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"270\" height=\"135\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Parity CASE Logic</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">1. Even id: id - 1 (2-&gt;1, 4-&gt;3)</text>\n        <text x=\"14\" y=\"66\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">2. Odd &amp; id = MAX: keep id (5-&gt;5)</text>\n        <text x=\"14\" y=\"86\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">3. Odd &amp; not last: id + 1 (1-&gt;2, 3-&gt;4)</text>\n        <rect x=\"14\" y=\"98\" width=\"242\" height=\"26\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"115\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">Scalar: (SELECT COUNT(*) FROM Seat)</text>\n      </g>\n\n      <path d=\"M 630 120 L 675 120\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Swapped Table -->\n      <g transform=\"translate(685, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"165\" height=\"135\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Swapped Result</text>\n        <text x=\"14\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">1 | 'Doris'</text>\n        <text x=\"14\" y=\"66\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">2 | 'Abbot'</text>\n        <text x=\"14\" y=\"86\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">3 | 'Green'</text>\n        <text x=\"14\" y=\"106\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">4 | 'Emerson'</text>\n        <text x=\"14\" y=\"126\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">5 | 'Jeames'</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Instead of modifying names, conditionally modify the `id` for each student.",
        "If the `id` is odd and equals the maximum row count (scalar subquery `SELECT COUNT(*) FROM Seat`), keep `id` unchanged.",
        "If the `id` is odd, increment it by 1 (`id + 1`).",
        "If the `id` is even, decrement it by 1 (`id - 1`).",
        "Order the result ascending by the newly calculated `id`."
      ],
      "trapsAndEdgeCases": [
        "Odd total rows trap: If there are 5 students, student 5 must remain in seat 5. Failing to test `id = (SELECT COUNT(*) FROM Seat)` maps 5 to 6, breaking continuity.",
        "Modulo arithmetic: In MySQL, `id % 2 = 1` evaluates odd numbers. Ensure evaluation order checks the last odd row before general odd rows."
      ],
      "solutionSQL": "SELECT\n    CASE\n        WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id\n        WHEN id % 2 = 1 THEN id + 1\n        ELSE id - 1\n    END AS id,\n    student\nFROM Seat\nORDER BY id;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT CASE",
          "exp": "Initiates conditional branching to recalculate new seat coordinates."
        },
        {
          "clause": "WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id",
          "exp": "Edge case shield: If the row is odd and is the final odd record in the table, preserve its ID."
        },
        {
          "clause": "WHEN id % 2 = 1 THEN id + 1",
          "exp": "Normal odd seat: shifts right to swap with subsequent even seat."
        },
        {
          "clause": "ELSE id - 1",
          "exp": "Even seat: shifts left to swap with preceding odd seat."
        },
        {
          "clause": "END AS id, student",
          "exp": "Aliases recomputed coordinates as `id` and projects original student name."
        },
        {
          "clause": "FROM Seat ORDER BY id",
          "exp": "Orders final projection by newly swapped seat order."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window LEAD / LAG Pattern",
          "complexity": "O(N log N) Window Sort",
          "sql": "SELECT id,\n       CASE\n           WHEN id % 2 = 1 THEN COALESCE(LEAD(student) OVER(ORDER BY id), student)\n           ELSE LAG(student) OVER(ORDER BY id)\n       END AS student\nFROM Seat;",
          "explanation": "Keeps the IDs constant and swaps the student strings using LEAD() for odd rows and LAG() for even rows."
        }
      ]
    },
    {
      "id": 1341,
      "title": "Movie Rating",
      "difficulty": "Medium",
      "acceptance": "42.8%",
      "interviewFreq": "Very High • Amazon, Netflix, Meta",
      "companies": [
        "Amazon",
        "Netflix",
        "Meta",
        "Apple"
      ],
      "prompt": "Write a solution to:\n1. Find the name of the user who has rated the greatest number of movies. In case of a tie, return the lexicographically smaller user name.\n2. Find the movie name with the highest average rating in February 2020. In case of a tie, return the lexicographically smaller movie name.\n\nCombine the results into a single table with column name 'results'.",
      "sampleInput": {
        "table": "Movies & Users & MovieRating",
        "columns": [
          "movie_id",
          "title",
          "user_id",
          "name",
          "rating",
          "created_at"
        ],
        "rows": [
          [
            1,
            "Avengers",
            1,
            "Daniel",
            3,
            "2020-01-12"
          ],
          [
            2,
            "Frozen 2",
            2,
            "Monica",
            4,
            "2020-02-17"
          ],
          [
            3,
            "Joker",
            3,
            "Maria",
            3,
            "2020-02-22"
          ],
          [
            1,
            "Avengers",
            2,
            "Monica",
            5,
            "2020-02-25"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "results"
        ],
        "rows": [
          [
            "Daniel"
          ],
          [
            "Frozen 2"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1341: TWO DISCRETE CTE SUBQUERIES COMBINED VIA UNION ALL</text>\n\n      <!-- Subquery 1: Top User -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"375\" height=\"140\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Subquery 1: Greatest Number of Ratings</text>\n        <text x=\"14\" y=\"44\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">JOIN Users u ON u.user_id = mr.user_id</text>\n        <text x=\"14\" y=\"62\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">GROUP BY u.name</text>\n        <text x=\"14\" y=\"80\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY COUNT(*) DESC, u.name ASC</text>\n        <rect x=\"14\" y=\"92\" width=\"345\" height=\"32\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"24\" y=\"112\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">LIMIT 1 =&gt; 'Daniel'</text>\n      </g>\n\n      <!-- UNION ALL Link -->\n      <g transform=\"translate(425, 110)\">\n        <rect x=\"0\" y=\"0\" width=\"45\" height=\"30\" rx=\"4\" fill=\"#0f172a\"/>\n        <text x=\"22\" y=\"19\" text-anchor=\"middle\" fill=\"#ffffff\" font-family=\"monospace\" font-size=\"9\" font-weight=\"700\">UNION</text>\n        <text x=\"22\" y=\"27\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"7\">ALL</text>\n      </g>\n\n      <!-- Subquery 2: Top Movie Feb 2020 -->\n      <g transform=\"translate(485, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"360\" height=\"140\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Subquery 2: Highest Avg Rating Feb 2020</text>\n        <text x=\"14\" y=\"44\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">WHERE created_at LIKE '2020-02%'</text>\n        <text x=\"14\" y=\"62\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">GROUP BY m.title</text>\n        <text x=\"14\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY AVG(rating) DESC, m.title ASC</text>\n        <rect x=\"14\" y=\"92\" width=\"330\" height=\"32\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"24\" y=\"112\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">LIMIT 1 =&gt; 'Frozen 2'</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The problem requests two completely unrelated answers combined into a single unified column.",
        "Part 1: Join MovieRating with Users, group by user_id and name, order by count descending, then name ascending, and grab LIMIT 1.",
        "Part 2: Filter MovieRating for '2020-02', join with Movies, group by movie_id and title, order by average rating descending, then title ascending, and grab LIMIT 1.",
        "Combine both independent queries using `UNION ALL` (not `UNION`, which would deduplicate identical names if a movie and user share a name!).",
        "Wrap both subqueries in parentheses so that their individual `ORDER BY ... LIMIT 1` clauses remain locally scoped."
      ],
      "trapsAndEdgeCases": [
        "UNION vs UNION ALL: If the top user and the top movie had the exact same name (e.g. 'Hero'), `UNION` would collapse the result to 1 row! Always use `UNION ALL`.",
        "LIMIT scoping in UNION: In MySQL, writing `SELECT ... ORDER BY ... LIMIT 1 UNION SELECT ... ORDER BY ... LIMIT 1` causes a syntax error unless each SELECT query is encapsulated in parentheses `(...)`."
      ],
      "solutionSQL": "(\n    SELECT u.name AS results\n    FROM MovieRating mr\n    JOIN Users u ON mr.user_id = u.user_id\n    GROUP BY u.user_id, u.name\n    ORDER BY COUNT(*) DESC, u.name ASC\n    LIMIT 1\n)\nUNION ALL\n(\n    SELECT m.title AS results\n    FROM MovieRating mr\n    JOIN Movies m ON mr.movie_id = m.movie_id\n    WHERE mr.created_at >= '2020-02-01' AND mr.created_at < '2020-03-01'\n    GROUP BY m.movie_id, m.title\n    ORDER BY AVG(mr.rating) DESC, m.title ASC\n    LIMIT 1\n);",
      "lineByLineExplanation": [
        {
          "clause": "(SELECT u.name AS results",
          "exp": "Encloses query 1 in parentheses to isolate its local ordering and limit."
        },
        {
          "clause": "JOIN Users u ON mr.user_id = u.user_id",
          "exp": "Joins ratings with users to extract human names."
        },
        {
          "clause": "GROUP BY u.user_id, u.name",
          "exp": "Aggregates rating frequency per individual user."
        },
        {
          "clause": "ORDER BY COUNT(*) DESC, u.name ASC LIMIT 1)",
          "exp": "Picks top rater; breaks ties lexicographically."
        },
        {
          "clause": "UNION ALL",
          "exp": "Preserves duplicate names and appends query 2 directly underneath."
        },
        {
          "clause": "(SELECT m.title AS results",
          "exp": "Encloses query 2 in parentheses for February 2020 evaluation."
        },
        {
          "clause": "WHERE mr.created_at >= '2020-02-01' AND mr.created_at < '2020-03-01'",
          "exp": "SARGable range filter for February 2020."
        },
        {
          "clause": "GROUP BY m.movie_id, m.title",
          "exp": "Aggregates movie reviews in February."
        },
        {
          "clause": "ORDER BY AVG(mr.rating) DESC, m.title ASC LIMIT 1)",
          "exp": "Picks highest average score; breaks ties lexicographically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "WITH CTE Pipeline Approach",
          "complexity": "O(N log N) Clean CTE DAG",
          "sql": "WITH TopUser AS (\n    SELECT u.name AS results\n    FROM MovieRating mr JOIN Users u ON mr.user_id = u.user_id\n    GROUP BY u.user_id, u.name\n    ORDER BY COUNT(*) DESC, u.name ASC LIMIT 1\n),\nTopMovie AS (\n    SELECT m.title AS results\n    FROM MovieRating mr JOIN Movies m ON mr.movie_id = m.movie_id\n    WHERE mr.created_at >= '2020-02-01' AND mr.created_at <= '2020-02-29'\n    GROUP BY m.movie_id, m.title\n    ORDER BY AVG(mr.rating) DESC, m.title ASC LIMIT 1\n)\nSELECT * FROM TopUser\nUNION ALL\nSELECT * FROM TopMovie;",
          "explanation": "Uses top-level CTEs for maximum modularity and architectural clarity."
        }
      ]
    },
    {
      "id": 1321,
      "title": "Restaurant Growth",
      "difficulty": "Medium",
      "acceptance": "54.1%",
      "interviewFreq": "Very High • DoorDash, Uber, Amazon",
      "companies": [
        "DoorDash",
        "Uber",
        "Amazon",
        "Instacart"
      ],
      "prompt": "You are the restaurant owner and you want to analyze a possible expansion. You want to compute the moving average of how much the customer paid in a seven days window (i.e., current day + 6 days before).\n\naverage_amount should be rounded to 2 decimal places.\n\nReturn the result table ordered by visited_on in ascending order.\n\nNote: Only include dates that have at least 7 days of previous data available.",
      "sampleInput": {
        "table": "Customer",
        "columns": [
          "customer_id",
          "name",
          "visited_on",
          "amount"
        ],
        "rows": [
          [
            1,
            "Jhon",
            "2019-01-01",
            100
          ],
          [
            2,
            "Daniel",
            "2019-01-02",
            110
          ],
          [
            3,
            "Jade",
            "2019-01-03",
            120
          ],
          [
            4,
            "Khaled",
            "2019-01-04",
            130
          ],
          [
            5,
            "Winston",
            "2019-01-05",
            110
          ],
          [
            6,
            "Elvis",
            "2019-01-06",
            140
          ],
          [
            7,
            "Anna",
            "2019-01-07",
            150
          ],
          [
            8,
            "Maria",
            "2019-01-08",
            80
          ],
          [
            9,
            "Jaze",
            "2019-01-09",
            110
          ],
          [
            1,
            "Jhon",
            "2019-01-10",
            130
          ],
          [
            3,
            "Jade",
            "2019-01-10",
            150
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "visited_on",
          "amount",
          "average_amount"
        ],
        "rows": [
          [
            "2019-01-07",
            860,
            122.86
          ],
          [
            "2019-01-08",
            840,
            120
          ],
          [
            "2019-01-09",
            840,
            120
          ],
          [
            "2019-01-10",
            1000,
            142.86
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1321: CTE DAILY PRE-AGGREGATION &amp; 7-DAY ROLLING WINDOW</text>\n\n      <!-- Step 1: Pre-aggregation -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"140\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Step 1: Daily Sum CTE</text>\n        <text x=\"14\" y=\"44\" fill=\"#1e40af\" font-size=\"9.5\">Collapses duplicate visits:</text>\n        <text x=\"14\" y=\"64\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2019-01-01: $100</text>\n        <text x=\"14\" y=\"82\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">... (days 2 to 6)</text>\n        <text x=\"14\" y=\"100\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2019-01-07: $150</text>\n        <text x=\"14\" y=\"122\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\">2019-01-10: $280 (130+150)</text>\n      </g>\n\n      <path d=\"M 270 125 L 315 125\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Step 2: 7-Day Window Frame -->\n      <g transform=\"translate(325, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"140\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Step 2: ROWS 6 PRECEDING</text>\n        <text x=\"14\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">SUM(amount) OVER (</text>\n        <text x=\"14\" y=\"62\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">  ORDER BY visited_on</text>\n        <text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">  ROWS 6 PRECEDING)</text>\n        <rect x=\"14\" y=\"92\" width=\"252\" height=\"34\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"22\" y=\"112\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Avg = ROUND(SUM / 7, 2)</text>\n      </g>\n\n      <path d=\"M 620 125 L 665 125\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Step 3: Date Filter -->\n      <g transform=\"translate(675, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"170\" height=\"140\" rx=\"6\" fill=\"#faf5ff\" stroke=\"#a855f7\"/>\n        <text x=\"14\" y=\"24\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Step 3: Filter</text>\n        <text x=\"14\" y=\"46\" fill=\"#6b21a8\" font-size=\"9.5\">Keep dates with &gt;= 6</text>\n        <text x=\"14\" y=\"62\" fill=\"#6b21a8\" font-size=\"9.5\">prior days available:</text>\n        <text x=\"14\" y=\"84\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"9\">visited_on &gt;= MIN + 6</text>\n        <rect x=\"14\" y=\"98\" width=\"142\" height=\"28\" rx=\"4\" fill=\"#f3e8ff\"/>\n        <text x=\"22\" y=\"116\" fill=\"#6b21a8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">From Jan 7 onward</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Multiple customers can visit on the same day. First, pre-aggregate daily spending into a CTE `DailySpending`.",
        "Use window aggregation `SUM(amount) OVER(ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` to calculate the 7-day rolling total.",
        "Calculate `ROUND(total / 7.0, 2)` for the rolling average.",
        "Filter out the first 6 days where fewer than 7 days of historical rolling data exist (using a subquery `WHERE visited_on >= (SELECT MIN(visited_on) + INTERVAL 6 DAY FROM Customer)` or `DENSE_RANK >= 7`)."
      ],
      "trapsAndEdgeCases": [
        "Duplicate visits per day: If customer A spends $100 and customer B spends $150 on the same date, naive windowing on raw rows sees 2 rows for 1 day, corrupting `ROWS 6 PRECEDING`. You MUST pre-aggregate by date first!",
        "Integer division: Remember to divide by `7.0` (or `7`) and round to 2 decimal places."
      ],
      "solutionSQL": "WITH DailyTotals AS (\n    SELECT visited_on, SUM(amount) AS daily_amount\n    FROM Customer\n    GROUP BY visited_on\n),\nRollingMetrics AS (\n    SELECT\n        visited_on,\n        SUM(daily_amount) OVER(\n            ORDER BY visited_on\n            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n        ) AS amount,\n        ROUND(AVG(daily_amount) OVER(\n            ORDER BY visited_on\n            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n        ), 2) AS average_amount,\n        ROW_NUMBER() OVER(ORDER BY visited_on) AS row_num\n    FROM DailyTotals\n)\nSELECT visited_on, amount, average_amount\nFROM RollingMetrics\nWHERE row_num >= 7\nORDER BY visited_on;",
      "lineByLineExplanation": [
        {
          "clause": "WITH DailyTotals AS (...) ",
          "exp": "Pre-aggregates customer purchases by visit date to eliminate multiple transactions per day."
        },
        {
          "clause": "RollingMetrics AS (...) ",
          "exp": "Calculates running totals over 7 consecutive rows (6 preceding + current)."
        },
        {
          "clause": "SUM(daily_amount) OVER(ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
          "exp": "7-day moving window sum."
        },
        {
          "clause": "ROUND(AVG(daily_amount) OVER(...), 2)",
          "exp": "7-day moving window average rounded to 2 decimal places."
        },
        {
          "clause": "ROW_NUMBER() OVER(ORDER BY visited_on) AS row_num",
          "exp": "Assigns sequential index to identify whether at least 7 days of historical window exist."
        },
        {
          "clause": "WHERE row_num >= 7",
          "exp": "Filters out days 1-6 which have incomplete rolling windows."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Non-Equi Self-Join Approach",
          "complexity": "O(N^2) Cartesian Theta-Join",
          "sql": "SELECT a.visited_on,\n       SUM(b.amount) AS amount,\n       ROUND(SUM(b.amount) / 7.0, 2) AS average_amount\nFROM (SELECT visited_on, SUM(amount) AS amount FROM Customer GROUP BY visited_on) a\nJOIN (SELECT visited_on, SUM(amount) AS amount FROM Customer GROUP BY visited_on) b\n  ON DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6\nGROUP BY a.visited_on\nHAVING COUNT(b.visited_on) = 7\nORDER BY a.visited_on;",
          "explanation": "Self-joins pre-aggregated days with a 0 to 6 day gap and requires exactly 7 matched days in HAVING."
        }
      ]
    },
    {
      "id": 602,
      "title": "Friend Requests II: Who Has the Most Friends",
      "difficulty": "Medium",
      "acceptance": "58.7%",
      "interviewFreq": "Very High • Meta, LinkedIn, Amazon",
      "companies": [
        "Meta",
        "LinkedIn",
        "Amazon",
        "Apple"
      ],
      "prompt": "Write a solution to find the people who have the most friends and the most friends number.\n\nThe test cases are generated so that only one person has the most friends.",
      "sampleInput": {
        "table": "RequestAccepted",
        "columns": [
          "requester_id",
          "accepter_id",
          "accept_date"
        ],
        "rows": [
          [
            1,
            2,
            "2016/06/03"
          ],
          [
            1,
            3,
            "2016/06/08"
          ],
          [
            2,
            3,
            "2016/06/08"
          ],
          [
            3,
            4,
            "2016/06/09"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "num"
        ],
        "rows": [
          [
            3,
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 220\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"190\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #602: BIDIRECTIONAL SOCIAL GRAPH DEGREE EXPANSION VIA UNION ALL</text>\n\n      <!-- Raw Directed Edges -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"135\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Directed Graph Edges</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">requester | accepter</text>\n        <text x=\"14\" y=\"66\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">1         | 2</text>\n        <text x=\"14\" y=\"84\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">1         | 3</text>\n        <text x=\"14\" y=\"102\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">2         | 3</text>\n        <text x=\"14\" y=\"120\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">3         | 4</text>\n      </g>\n\n      <path d=\"M 275 120 L 320 120\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Bidirectional Expansion -->\n      <g transform=\"translate(330, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"135\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">UNION ALL (Both Sides)</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SELECT requester_id AS id ...</text>\n        <text x=\"14\" y=\"62\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">UNION ALL</text>\n        <text x=\"14\" y=\"78\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SELECT accepter_id AS id ...</text>\n        <rect x=\"14\" y=\"90\" width=\"252\" height=\"34\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"110\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">User 3 appears 3 times! (Max)</text>\n      </g>\n\n      <path d=\"M 625 120 L 670 120\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Top 1 -->\n      <g transform=\"translate(680, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"165\" height=\"135\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Winner: LIMIT 1</text>\n        <rect x=\"15\" y=\"48\" width=\"135\" height=\"36\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n        <text x=\"25\" y=\"70\" fill=\"#166534\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">id: 3 | num: 3</text>\n        <text x=\"14\" y=\"105\" fill=\"#475569\" font-size=\"9\">GROUP BY id</text>\n        <text x=\"14\" y=\"120\" fill=\"#475569\" font-size=\"9\">ORDER BY num DESC</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Friendship is an undirected relationship: if User 1 requests User 2, both User 1 and User 2 have gained 1 friend.",
        "Flatten both roles into a single stream of user tokens using `UNION ALL`.",
        "Group by user `id`, compute `COUNT(*)` as total friends.",
        "Sort by `num DESC` and emit the top record with `LIMIT 1`."
      ],
      "trapsAndEdgeCases": [
        "UNION vs UNION ALL: If you use `UNION` instead of `UNION ALL`, duplicate user instances are wiped out, destroying the accurate friend count! You must use `UNION ALL`.",
        "Tie-breaking: The problem guarantee states only one person has the most friends."
      ],
      "solutionSQL": "WITH AllFriendships AS (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n)\nSELECT id, COUNT(*) AS num\nFROM AllFriendships\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllFriendships AS (...) ",
          "exp": "Extracts an undirected stream of friendship touchpoints."
        },
        {
          "clause": "SELECT requester_id AS id UNION ALL SELECT accepter_id AS id",
          "exp": "Stacks outgoing and incoming friend connections into a unified single column."
        },
        {
          "clause": "SELECT id, COUNT(*) AS num",
          "exp": "Counts occurrences per user ID to compute their vertex degree in the social graph."
        },
        {
          "clause": "GROUP BY id",
          "exp": "Buckets counts per user."
        },
        {
          "clause": "ORDER BY num DESC LIMIT 1",
          "exp": "Extracts the globally most connected user."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Derived Table Inline Subquery",
          "complexity": "O(N log N) Sort & Limit",
          "sql": "SELECT id, COUNT(*) AS num\nFROM (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n) AS friends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
          "explanation": "Equivalent logic inlining the UNION ALL derived table directly into the FROM clause."
        }
      ]
    },
    {
      "id": 585,
      "title": "Investments in 2016",
      "difficulty": "Medium",
      "acceptance": "45.6%",
      "interviewFreq": "Very High • State Farm, Travelers, Capital One",
      "companies": [
        "State Farm",
        "Travelers",
        "Capital One",
        "JPMorgan Chase"
      ],
      "prompt": "Write a solution to report the sum of all total investment values in 2016 (tiv_2016) for all policyholders who:\n1. have the same tiv_2015 value as one or more other policyholders, and\n2. are not located in the same city as any other policyholder (i.e., the (lat, lon) attribute pairs must be unique).\n\nRound tiv_2016 to two decimal places.",
      "sampleInput": {
        "table": "Insurance",
        "columns": [
          "pid",
          "tiv_2015",
          "tiv_2016",
          "lat",
          "lon"
        ],
        "rows": [
          [
            1,
            10,
            5,
            10,
            10
          ],
          [
            2,
            20,
            20,
            20,
            20
          ],
          [
            3,
            10,
            30,
            20,
            20
          ],
          [
            4,
            10,
            40,
            40,
            40
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "tiv_2016"
        ],
        "rows": [
          [
            45
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #585: CORRELATED SUBQUERIES FOR VALUE DUPLICATION &amp; COORDINATE UNIQUENESS</text>\n\n      <!-- Step 1: Input Table -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"240\" height=\"145\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Insurance Policies</text>\n        <text x=\"14\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">PID 1: tiv15=10 | (10,10) ✓</text>\n        <text x=\"14\" y=\"66\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">PID 2: tiv15=20 | (20,20) ❌ (Unique tiv15)</text>\n        <text x=\"14\" y=\"88\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">PID 3: tiv15=10 | (20,20) ❌ (Dup Lat/Lon)</text>\n        <text x=\"14\" y=\"110\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">PID 4: tiv15=10 | (40,40) ✓</text>\n        <text x=\"14\" y=\"132\" fill=\"#15803d\" font-size=\"9\">PIDs 1 &amp; 4 meet BOTH filters!</text>\n      </g>\n\n      <path d=\"M 290 125 L 340 125\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Dual Filters -->\n      <g transform=\"translate(350, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"310\" height=\"145\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Dual Subquery Filter Gates</text>\n        <rect x=\"14\" y=\"38\" width=\"282\" height=\"38\" rx=\"4\" fill=\"#ffffff\" stroke=\"#93c5fd\"/>\n        <text x=\"22\" y=\"54\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Filter 1: tiv_2015 IN (</text>\n        <text x=\"22\" y=\"68\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">  SELECT tiv_2015 GROUP BY tiv_2015 HAVING COUNT(*) &gt; 1)</text>\n\n        <rect x=\"14\" y=\"86\" width=\"282\" height=\"38\" rx=\"4\" fill=\"#ffffff\" stroke=\"#93c5fd\"/>\n        <text x=\"22\" y=\"102\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Filter 2: (lat, lon) IN (</text>\n        <text x=\"22\" y=\"116\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">  SELECT lat, lon GROUP BY lat, lon HAVING COUNT(*) = 1)</text>\n      </g>\n\n      <path d=\"M 680 125 L 725 125\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Aggregation Sum -->\n      <g transform=\"translate(735, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"115\" height=\"145\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Total Sum</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">PID 1: $5.00</text>\n        <text x=\"12\" y=\"75\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">PID 4: $40.00</text>\n        <rect x=\"10\" y=\"95\" width=\"95\" height=\"34\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"57\" y=\"116\" text-anchor=\"middle\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">45.00</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Criterion 1: The policyholder's `tiv_2015` must be shared with at least one other policyholder (`COUNT(*) > 1`).",
        "Criterion 2: The policyholder's geographic coordinate `(lat, lon)` must be strictly unique (`COUNT(*) = 1`).",
        "We express both conditions as independent subqueries in the WHERE clause.",
        "Compute `ROUND(SUM(tiv_2016), 2)` across all qualifying policies."
      ],
      "trapsAndEdgeCases": [
        "Row Constructor Tuple Comparison: `(lat, lon) IN (SELECT lat, lon ...)` is clean in MySQL and PostgreSQL, but SQL Server requires string concatenation or CTE joins.",
        "Empty set sum: If no policies qualify, `SUM` returns NULL. The test cases guarantee matches, but in production wrap with `COALESCE(SUM(tiv_2016), 0)`."
      ],
      "solutionSQL": "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Insurance\nWHERE tiv_2015 IN (\n    SELECT tiv_2015\n    FROM Insurance\n    GROUP BY tiv_2015\n    HAVING COUNT(*) > 1\n)\nAND (lat, lon) IN (\n    SELECT lat, lon\n    FROM Insurance\n    GROUP BY lat, lon\n    HAVING COUNT(*) = 1\n);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016",
          "exp": "Computes total investment amount rounded to 2 decimal places."
        },
        {
          "clause": "FROM Insurance",
          "exp": "Source policies catalog."
        },
        {
          "clause": "WHERE tiv_2015 IN (SELECT tiv_2015 ... HAVING COUNT(*) > 1)",
          "exp": "Subquery filter 1: Retains only non-unique 2015 investment amounts."
        },
        {
          "clause": "AND (lat, lon) IN (SELECT lat, lon ... HAVING COUNT(*) = 1)",
          "exp": "Subquery filter 2: Retains only unique geographic coordinate pairs."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window Functions Pattern",
          "complexity": "O(N log N) Window Partitions",
          "sql": "WITH Evaluated AS (\n    SELECT tiv_2016,\n           COUNT(*) OVER(PARTITION BY tiv_2015) AS count_tiv15,\n           COUNT(*) OVER(PARTITION BY lat, lon) AS count_location\n    FROM Insurance\n)\nSELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Evaluated\nWHERE count_tiv15 > 1 AND count_location = 1;",
          "explanation": "Eliminates subqueries entirely using two window partition counts over tiv_2015 and coordinates."
        }
      ]
    },
    {
      "id": 185,
      "title": "Department Top Three Salaries",
      "difficulty": "Hard",
      "acceptance": "51.4%",
      "interviewFreq": "Very High • Google, Amazon, Meta, Microsoft",
      "companies": [
        "Google",
        "Amazon",
        "Meta",
        "Microsoft",
        "Apple",
        "Netflix"
      ],
      "prompt": "A company's executives are interested in seeing who earns the most money in each of the company's departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.\n\nWrite a solution to find the employees who are high earners in each of the departments.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Employee & Department",
        "columns": [
          "id",
          "name",
          "salary",
          "departmentId"
        ],
        "rows": [
          [
            1,
            "Joe",
            85000,
            1
          ],
          [
            2,
            "Henry",
            80000,
            2
          ],
          [
            3,
            "Sam",
            60000,
            2
          ],
          [
            4,
            "Max",
            90000,
            1
          ],
          [
            5,
            "Janet",
            69000,
            1
          ],
          [
            6,
            "Randy",
            85000,
            1
          ],
          [
            7,
            "Will",
            70000,
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "Department",
          "Employee",
          "Salary"
        ],
        "rows": [
          [
            "IT",
            "Max",
            90000
          ],
          [
            "IT",
            "Joe",
            85000
          ],
          [
            "IT",
            "Randy",
            85000
          ],
          [
            "IT",
            "Will",
            70000
          ],
          [
            "Sales",
            "Henry",
            80000
          ],
          [
            "Sales",
            "Sam",
            60000
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 230\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"200\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #185 (HARD): CORRELATED SUBQUERY RELATIONAL RANKING VS DENSE_RANK()</text>\n\n      <!-- Department IT Breakdown -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"260\" height=\"145\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"22\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Dept 1 (IT) Salaries</text>\n        <text x=\"14\" y=\"44\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Max:   $90,000 [Rank 1] ✓</text>\n        <text x=\"14\" y=\"64\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Joe:   $85,000 [Rank 2 (Tie)] ✓</text>\n        <text x=\"14\" y=\"84\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Randy: $85,000 [Rank 2 (Tie)] ✓</text>\n        <text x=\"14\" y=\"104\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"9.5\">Will:  $70,000 [Rank 3] ✓</text>\n        <text x=\"14\" y=\"124\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Janet: $69,000 [Rank 4] ❌ Cut</text>\n      </g>\n\n      <path d=\"M 315 125 L 365 125\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Correlated Subquery Concept -->\n      <g transform=\"translate(375, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"290\" height=\"145\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\"/>\n        <text x=\"14\" y=\"24\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Correlated Subquery Logic</text>\n        <text x=\"14\" y=\"46\" fill=\"#854d0e\" font-size=\"9.5\">For employee e1, count distinct salaries in</text>\n        <text x=\"14\" y=\"62\" fill=\"#854d0e\" font-size=\"9.5\">same department strictly higher than e1.salary:</text>\n        <rect x=\"14\" y=\"74\" width=\"262\" height=\"38\" rx=\"4\" fill=\"#fef3c7\"/>\n        <text x=\"22\" y=\"90\" fill=\"#92400e\" font-family=\"monospace\" font-size=\"9.5\">COUNT(DISTINCT e2.salary) &lt; 3</text>\n        <text x=\"22\" y=\"104\" fill=\"#64748b\" font-size=\"8.5\">Rank 1 has 0 higher, Rank 2 has 1, Rank 3 has 2.</text>\n        <text x=\"14\" y=\"130\" fill=\"#15803d\" font-size=\"9\" font-weight=\"700\">Preserves ties without skipping ranks!</text>\n      </g>\n\n      <path d=\"M 685 125 L 730 125\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Table -->\n      <g transform=\"translate(740, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"115\" height=\"145\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"10\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Projected Set</text>\n        <text x=\"10\" y=\"44\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Max</text>\n        <text x=\"10\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Joe</text>\n        <text x=\"10\" y=\"76\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Randy</text>\n        <text x=\"10\" y=\"92\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">IT | Will</text>\n        <text x=\"10\" y=\"108\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">Sales | Henry</text>\n        <text x=\"10\" y=\"124\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">Sales | Sam</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The definition specifies 'top three UNIQUE salaries'. This means if two employees share the #2 salary, both are included, and the next highest salary is #3.",
        "Canonical Subquery Solution: An employee e1 is in the top 3 unique salaries of their department if and only if the count of distinct salaries in the same department strictly greater than `e1.salary` is strictly less than 3 (`0, 1, or 2`).",
        "Join the filtered employees with the `Department` table to output the department name.",
        "Alternatively, using Window Functions: `DENSE_RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) <= 3`."
      ],
      "trapsAndEdgeCases": [
        "RANK vs DENSE_RANK: Standard RANK() skips positions after ties (e.g. 1, 2, 2, 4). This would incorrectly eliminate Will ($70k). We must use DENSE_RANK() or COUNT(DISTINCT).",
        "Correlated Subquery Condition: Remember the inequality `e2.salary > e1.salary` and `< 3`. A common error is writing `<= 3` or forgetting `DISTINCT`."
      ],
      "solutionSQL": "SELECT\n    d.name AS Department,\n    e1.name AS Employee,\n    e1.salary AS Salary\nFROM Employee e1\nJOIN Department d ON e1.departmentId = d.id\nWHERE 3 > (\n    SELECT COUNT(DISTINCT e2.salary)\n    FROM Employee e2\n    WHERE e2.departmentId = e1.departmentId\n      AND e2.salary > e1.salary\n);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT d.name AS Department, e1.name AS Employee, e1.salary AS Salary",
          "exp": "Formats and projects the required result columns."
        },
        {
          "clause": "FROM Employee e1 JOIN Department d ON e1.departmentId = d.id",
          "exp": "Binds employees to department metadata."
        },
        {
          "clause": "WHERE 3 > (SELECT COUNT(DISTINCT e2.salary) ...)",
          "exp": "Correlated subquery: counts how many distinct salaries in this department exceed e1's salary."
        },
        {
          "clause": "WHERE e2.departmentId = e1.departmentId",
          "exp": "Restricts subquery comparison to the same department."
        },
        {
          "clause": "AND e2.salary > e1.salary",
          "exp": "Checks strictly higher salary thresholds (0, 1, or 2 higher salaries allowed)."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Modern DENSE_RANK() Window CTE",
          "complexity": "O(N log N) Window Sort",
          "sql": "WITH RankedSalaries AS (\n    SELECT\n        d.name AS Department,\n        e.name AS Employee,\n        e.salary AS Salary,\n        DENSE_RANK() OVER(PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk\n    FROM Employee e\n    JOIN Department d ON e.departmentId = d.id\n)\nSELECT Department, Employee, Salary\nFROM RankedSalaries\nWHERE rnk <= 3;",
          "explanation": "The industry standard production approach using DENSE_RANK() to seamlessly handle salary ties."
        }
      ]
    }
  ]
};
