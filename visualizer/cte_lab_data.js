// =============================================================================
// TRACK 06: SUBQUERIES, CTES & RECURSIVE GRAPH TRAVERSAL LAB
// =============================================================================

window.CTE_SCHEMA = {
  tableName: 'OrgHierarchy',
  columns: ['emp_id', 'name', 'manager_id', 'title', 'department', 'salary'],
  types: { emp_id: 'INT', name: 'VARCHAR', manager_id: 'INT', title: 'VARCHAR', department: 'VARCHAR', salary: 'INT' },
  rows: [
    { emp_id: 101, name: 'Ada Lovelace', manager_id: null, title: 'Chief Executive Officer', department: 'Executive', salary: 250000 },
    { emp_id: 102, name: 'Alan Turing', manager_id: 101, title: 'VP of Engineering', department: 'Engineering', salary: 180000 },
    { emp_id: 103, name: 'Grace Hopper', manager_id: 101, title: 'VP of Research', department: 'Research', salary: 175000 },
    { emp_id: 104, name: 'Claude Shannon', manager_id: 102, title: 'Staff Systems Architect', department: 'Engineering', salary: 150000 },
    { emp_id: 105, name: 'John von Neumann', manager_id: 102, title: 'Principal Systems Eng', department: 'Engineering', salary: 145000 },
    { emp_id: 106, name: 'Margaret Hamilton', manager_id: 103, title: 'Director of Flight Systems', department: 'Research', salary: 140000 },
    { emp_id: 107, name: 'Donald Knuth', manager_id: 104, title: 'Senior Algorithmist', department: 'Engineering', salary: 125000 },
    { emp_id: 108, name: 'Ken Thompson', manager_id: 105, title: 'Senior Kernel Engineer', department: 'Engineering', salary: 120000 },
    { emp_id: 109, name: 'Dennis Ritchie', manager_id: 105, title: 'Senior Systems Developer', department: 'Engineering', salary: 120000 }
  ]
};

window.CTE_STEPS = [
  // ---------------------------------------------------------------------------
  // STEP 01: Scalar Subqueries
  // ---------------------------------------------------------------------------
  {
    stepIndex: 1,
    id: 'subquery_scalar',
    keyword: 'SCALAR SUBQUERY',
    title: 'Step 01: The Scalar Subquery (Single-Value Projection)',
    pillClass: 'pill-cte',
    conceptHeading: 'A Subquery That Evaluates to Exactly One Cell: 1 Row &times; 1 Column',
    conceptText: 'A scalar subquery is an inner query that returns exactly one scalar value. Because it returns a single atom, the database engine allows it anywhere a standard constant or column expression is valid: in the SELECT projection, in WHERE comparison operators (=, >, <), or in arithmetic expressions.',
    sqlCode: `SELECT emp_id, name, department, salary,\n       (SELECT AVG(salary) FROM OrgHierarchy) AS company_avg,\n       salary - (SELECT AVG(salary) FROM OrgHierarchy) AS delta_from_mean\nFROM OrgHierarchy\nWHERE salary > (SELECT AVG(salary) FROM OrgHierarchy);`,
    explanationPoints: [
      'The inner query (SELECT AVG(salary)...) evaluates once to the scalar value $156,111.',
      'In WHERE, it acts as a dynamic threshold without hardcoding numeric values.',
      'The optimizer recognizes this subquery is uncorrelated and hoists it out of the loop into a single materialized constant.',
      'Returns 4 employees whose salary exceeds $156,111.'
    ],
    gotcha: 'CARDINALITY VIOLATION: If a scalar subquery returns 0 rows, it yields NULL. If it returns 2 or more rows, the entire transaction immediately crashes with: "Subquery returned more than 1 value". Always use aggregates (AVG, MAX, MIN) or LIMIT 1 to guarantee scalar cardinality.',
    actionPrompt: 'Testing salary against dynamic company mean ($156,111) computed via scalar subquery:',
    transform: (rows) => {
      const avg = Math.round(rows.reduce((s, r) => s + r.salary, 0) / rows.length);
      return rows.map(r => {
        const passes = r.salary > avg;
        return {
          emp_id: r.emp_id,
          name: r.name,
          title: r.title,
          salary: `$${r.salary.toLocaleString()}`,
          company_avg: `$${avg.toLocaleString()}`,
          _status: passes ? 'passed' : 'rejected',
          _label: passes ? `SURVIVED (> $${avg.toLocaleString()})` : `FILTERED OUT (<= $${avg.toLocaleString()})`
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Scalar Subquery Dataflow -->
        <g transform="translate(30, 20)">
          <!-- Inner Subquery Box -->
          <rect width="220" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="220" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">INNER SUBQUERY (Materialized)</text>
          <g transform="translate(12, 36)">
            <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">SELECT AVG(salary)</text>
            <text x="0" y="28" fill="#71717a" font-family="monospace" font-size="8">FROM OrgHierarchy;</text>
            <path d="M 0 40 L 195 40" stroke="#27272a"/>
            <rect y="48" width="195" height="30" fill="#18181b" stroke="#10b981" rx="3"/>
            <text x="97" y="67" fill="#10b981" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">$156,111 (Scalar Atom)</text>
          </g>

          <!-- Pipeline Arrow -->
          <g transform="translate(230, 70)">
            <path d="M 0 0 L 40 0" stroke="#10b981" stroke-width="2" stroke-dasharray="4,2"/>
            <polygon points="40,-4 50,0 40,4" fill="#10b981"/>
            <text x="25" y="-10" fill="#10b981" font-family="monospace" font-size="7.5" text-anchor="middle">Broadcast</text>
          </g>

          <!-- Outer Evaluation Engine -->
          <g transform="translate(290, 0)">
            <rect width="430" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
            <rect width="430" height="24" rx="4" fill="#18181b"/>
            <text x="15" y="16" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">OUTER QUERY FILTER: WHERE salary &gt; $156,111</text>
            <g transform="translate(15, 34)">
              <rect width="400" height="18" fill="#18181b" stroke="#10b981" rx="2"/>
              <text x="8" y="13" fill="#ffffff" font-family="monospace" font-size="8">Ada Lovelace: $250k &gt; $156k</text>
              <text x="390" y="13" fill="#10b981" font-family="monospace" font-size="8" text-anchor="end">&check; PASS</text>

              <rect y="22" width="400" height="18" fill="#18181b" stroke="#10b981" rx="2"/>
              <text x="8" y="35" fill="#ffffff" font-family="monospace" font-size="8">Alan Turing: $180k &gt; $156k</text>
              <text x="390" y="35" fill="#10b981" font-family="monospace" font-size="8" text-anchor="end">&check; PASS</text>

              <rect y="44" width="400" height="18" fill="#18181b" stroke="#10b981" rx="2"/>
              <text x="8" y="57" fill="#ffffff" font-family="monospace" font-size="8">Grace Hopper: $175k &gt; $156k</text>
              <text x="390" y="57" fill="#10b981" font-family="monospace" font-size="8" text-anchor="end">&check; PASS</text>

              <rect y="66" width="400" height="18" fill="#1c1917" stroke="#7f1d1d" rx="2"/>
              <text x="8" y="79" fill="#71717a" font-family="monospace" font-size="8">Donald Knuth: $125k &lt;= $156k</text>
              <text x="390" y="79" fill="#ef4444" font-family="monospace" font-size="8" text-anchor="end">&cross; DROP</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 02: Correlated Subqueries
  // ---------------------------------------------------------------------------
  {
    stepIndex: 2,
    id: 'subquery_correlated',
    keyword: 'CORRELATED',
    title: 'Step 02: Correlated Subqueries & Outer Variable Binding',
    pillClass: 'pill-cte',
    conceptHeading: 'When the Inner Query Depends Dynamically on the Outer Tuple',
    conceptText: 'Unlike an independent subquery that executes once, a CORRELATED subquery references a column from the outer query (e.g. o.department = i.department). Conceptually, the engine must re-execute the inner subquery for every single candidate row in the outer table, functioning as a nested loop.',
    sqlCode: `SELECT o.emp_id, o.name, o.department, o.salary\nFROM OrgHierarchy AS o\nWHERE o.salary > (\n  SELECT AVG(i.salary)\n  FROM OrgHierarchy AS i\n  WHERE i.department = o.department\n);`,
    explanationPoints: [
      'The inner query cannot execute on its own; it requires the outer row\'s `o.department` value as an input parameter.',
      'Engineering dept avg is $140,000; Research dept avg is $157,500.',
      'Alan Turing ($180k) & Claude Shannon ($150k) beat their local Engineering mean.',
      'Modern optimizers attempt to unnest correlated subqueries into hash joins or window functions.'
    ],
    gotcha: 'THE N x M PERFORMANCE CLIFF: If the outer table has 1,000,000 rows and the inner query takes 2ms, a correlated subquery will take 2,000 seconds (33 minutes)! Always rewrite with window functions or CTE joins.',
    actionPrompt: 'Filtering employees who earn more than their specific department average:',
    transform: (rows) => {
      const deptSums = {};
      rows.forEach(r => {
        if (!deptSums[r.department]) deptSums[r.department] = { sum: 0, count: 0 };
        deptSums[r.department].sum += r.salary;
        deptSums[r.department].count++;
      });
      return rows.map(r => {
        const dAvg = Math.round(deptSums[r.department].sum / deptSums[r.department].count);
        const passes = r.salary > dAvg;
        return {
          name: r.name,
          department: r.department,
          salary: `$${r.salary.toLocaleString()}`,
          dept_avg: `$${dAvg.toLocaleString()}`,
          _status: passes ? 'passed' : 'rejected',
          _label: passes ? `BEATS DEPT AVG (+$${(r.salary - dAvg).toLocaleString()})` : `BELOW DEPT AVG`
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Loop feedback loop between Outer and Inner -->
        <g transform="translate(30, 20)">
          <text x="0" y="16" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">NESTED LOOP EVALUATION: OUTER &harr; INNER FEEDBACK</text>
          
          <g transform="translate(10, 35)">
            <!-- Outer Table Stream -->
            <rect x="0" y="0" width="220" height="90" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="20" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">OUTER TUPLE STREAM</text>
            <text x="12" y="40" fill="#a1a1aa" font-family="monospace" font-size="8">Row 1: Alan Turing (Eng, $180k)</text>
            <text x="12" y="58" fill="#10b981" font-family="monospace" font-size="8">Binds: o.department = 'Engineering'</text>
            <text x="12" y="76" fill="#71717a" font-family="monospace" font-size="7.5">Iterates row-by-row</text>

            <!-- Connector arrow to inner -->
            <g transform="translate(230, 45)">
              <path d="M 0 -15 L 60 -15" stroke="#10b981" stroke-width="1.5"/>
              <polygon points="60,-19 70,-15 60,-11" fill="#10b981"/>
              <text x="35" y="-22" fill="#10b981" font-family="monospace" font-size="7.5" text-anchor="middle">Pass o.dept</text>

              <path d="M 70 15 L 10 15" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3,2"/>
              <polygon points="10,11 0,15 10,19" fill="#3b82f6"/>
              <text x="35" y="28" fill="#3b82f6" font-family="monospace" font-size="7.5" text-anchor="middle">Return $140k</text>
            </g>

            <!-- Inner Engine -->
            <rect x="310" y="0" width="220" height="90" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="20" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">CORRELATED INNER ENGINE</text>
            <text x="12" y="38" fill="#71717a" font-family="monospace" font-size="8">WHERE i.dept = 'Engineering'</text>
            <text x="12" y="55" fill="#a1a1aa" font-family="monospace" font-size="8">Calculates AVG(salary) = $140,000</text>
            <text x="12" y="74" fill="#f59e0b" font-family="monospace" font-size="7.5">&bull; Must run once per outer tuple &bull;</text>

            <!-- Decision Box -->
            <g transform="translate(540, 10)">
              <rect width="180" height="70" fill="#18181b" stroke="#10b981" rx="4"/>
              <text x="90" y="25" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="middle">PREDICATE CHECK</text>
              <text x="90" y="44" fill="#10b981" font-family="monospace" font-size="8" text-anchor="middle">$180,000 &gt; $140,000</text>
              <text x="90" y="58" fill="#10b981" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">&rArr; TUPLE PASSES</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 03: EXISTS vs IN and the NULL Poison Trap
  // ---------------------------------------------------------------------------
  {
    stepIndex: 3,
    id: 'subquery_exists_in',
    keyword: 'EXISTS vs IN',
    title: 'Step 03: EXISTS vs IN and the Deadly NOT IN (NULL) Trap',
    pillClass: 'pill-cte',
    conceptHeading: 'Why NOT IN Silently Returns Zero Rows When NULL is Present',
    conceptText: 'When testing set membership, IN compares values against a list, while EXISTS evaluates boolean cardinality (stops at first matching row). When NULL values enter the comparison, IN uses Three-Valued Logic: x IN (1, 2, NULL) evaluates to UNKNOWN, which causes NOT IN (..., NULL) to reject EVERY SINGLE ROW in the entire database.',
    sqlCode: `-- FIND EMPLOYEES WHO ARE NOT MANAGERS (LEAF WORKERS)\n-- DANGEROUS: NOT IN returns ZERO rows if manager_id has NULL!\n-- CORRECT: NOT EXISTS handles NULL safely:\nSELECT e.emp_id, e.name, e.title\nFROM OrgHierarchy AS e\nWHERE NOT EXISTS (\n  SELECT 1 FROM OrgHierarchy AS m WHERE m.manager_id = e.emp_id\n);`,
    explanationPoints: [
      'EXISTS performs an early-exit short circuit: as soon as 1 matching row is found, it returns TRUE.',
      'EXISTS is immune to NULL poison because it tests for row existence, not scalar value equality.',
      'NOT IN with a NULL in the candidate list causes UNKNOWN logic, returning 0 rows total!',
      'Ada Lovelace, Alan Turing, Grace Hopper, Claude Shannon, and John von Neumann are managers; remaining 4 are leaves.'
    ],
    gotcha: 'THE NOT IN NULL CATASTROPHE: `x NOT IN (1, 2, NULL)` expands to `x != 1 AND x != 2 AND x != NULL`. Because `x != NULL` is UNKNOWN, the entire AND chain becomes UNKNOWN/FALSE. The query returns 0 rows silently without an error!',
    actionPrompt: 'Identifying individual contributors (leaf nodes) safely using NOT EXISTS:',
    transform: (rows) => {
      const managerIds = new Set(rows.map(r => r.manager_id).filter(id => id !== null));
      return rows.map(r => {
        const isManager = managerIds.has(r.emp_id);
        const isLeaf = !isManager;
        return {
          emp_id: r.emp_id,
          name: r.name,
          title: r.title,
          is_manager: isManager ? 'YES (Supervises Reports)' : 'NO (Individual Contributor)',
          _status: isLeaf ? 'passed' : 'loaded',
          _label: isLeaf ? 'LEAF WORKER (NOT EXISTS)' : 'MANAGER (EXISTS = TRUE)'
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Side-by-side comparison of IN (NULL) vs EXISTS -->
        <g transform="translate(30, 20)">
          <!-- Left: NOT IN Trap -->
          <g transform="translate(0, 0)">
            <rect width="345" height="140" rx="4" fill="#121318" stroke="#ef4444" stroke-width="1.2"/>
            <rect width="345" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ef4444" font-family="monospace" font-size="8.5" font-weight="700">&cross; NOT IN (..., NULL) TRAP</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">manager_id list: (101, 102, 104, NULL)</text>
              <rect y="22" width="320" height="24" fill="#1c1917" stroke="#7f1d1d" rx="2"/>
              <text x="8" y="38" fill="#fca5a5" font-family="monospace" font-size="8">e.emp_id != NULL &rArr; UNKNOWN</text>
              <text x="0" y="64" fill="#fca5a5" font-family="monospace" font-size="8">Result: TRUE AND TRUE AND UNKNOWN</text>
              <text x="0" y="78" fill="#ef4444" font-family="monospace" font-size="8.5" font-weight="700">&rArr; Evaluates to UNKNOWN (0 ROWS RETURNED)</text>
              <text x="0" y="94" fill="#71717a" font-family="monospace" font-size="7.5">Silent logic error: production bug!</text>
            </g>
          </g>

          <!-- Right: NOT EXISTS Safe -->
          <g transform="translate(375, 0)">
            <rect width="345" height="140" rx="4" fill="#121318" stroke="#10b981" stroke-width="1.2"/>
            <rect width="345" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">&check; NOT EXISTS (BOOLEAN SAFE)</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#10b981" font-family="monospace" font-size="8">Short-circuit evaluation on match count:</text>
              <rect y="22" width="320" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="8" y="38" fill="#6ee7b7" font-family="monospace" font-size="8">Does any report match m.mgr = 107?</text>
              <text x="0" y="64" fill="#6ee7b7" font-family="monospace" font-size="8">Count = 0 &rArr; EXISTS is FALSE &rArr; NOT EXISTS is TRUE</text>
              <text x="0" y="78" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">&rArr; Safely preserves Donald Knuth (Leaf)</text>
              <text x="0" y="94" fill="#71717a" font-family="monospace" font-size="7.5">Zero three-valued logic contamination!</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 04: CTEs vs Derived Tables
  // ---------------------------------------------------------------------------
  {
    stepIndex: 4,
    id: 'subquery_cte_derived',
    keyword: 'WITH (CTE)',
    title: 'Step 04: CTEs vs Derived Tables & Materialization Barriers',
    pillClass: 'pill-cte',
    conceptHeading: 'Transforming Nested Spaghetti Queries Into Clean Linear Pipelines',
    conceptText: 'A Common Table Expression (CTE) defined with the WITH clause creates a named temporary result set scoped strictly to the execution of a single query. Unlike deeply nested derived tables (FROM (SELECT ...) AS t), CTEs can be referenced multiple times, read top-to-bottom, and act as an architectural barrier.',
    sqlCode: `WITH DeptStats AS (\n  SELECT department,\n         COUNT(*) AS headcount,\n         AVG(salary) AS avg_dept_salary\n  FROM OrgHierarchy\n  GROUP BY department\n)\nSELECT e.name, e.department, e.salary, d.avg_dept_salary\nFROM OrgHierarchy AS e\nJOIN DeptStats AS d ON e.department = d.department\nWHERE e.salary > d.avg_dept_salary;`,
    explanationPoints: [
      'WITH creates `DeptStats` as a logical view valid only during this query execution.',
      'Replaces messy derived subquery joins with readable top-down DAG structure.',
      'In Postgres 12+, CTEs are inlined by default unless you explicitly declare `WITH ... AS MATERIALIZED (...)`.',
      'Materialized CTEs calculate once and buffer in RAM; inlined CTEs collapse into the main plan.'
    ],
    gotcha: 'CTE SCOPE IS TEMPORARY: CTEs do not persist in the database catalog. Once the final SELECT query completes, the memory buffer for the CTE is instantly deallocated.',
    actionPrompt: 'Joining employee tuples with pre-computed CTE DeptStats table:',
    transform: (rows) => {
      const stats = {};
      rows.forEach(r => {
        if (!stats[r.department]) stats[r.department] = { count: 0, sum: 0 };
        stats[r.department].count++;
        stats[r.department].sum += r.salary;
      });
      return rows.map(r => {
        const avg = Math.round(stats[r.department].sum / stats[r.department].count);
        const diff = r.salary - avg;
        return {
          name: r.name,
          department: r.department,
          salary: `$${r.salary.toLocaleString()}`,
          cte_dept_avg: `$${avg.toLocaleString()}`,
          _status: diff > 0 ? 'passed' : 'loaded',
          _label: diff > 0 ? 'ABOVE DEPT MEAN' : 'AT OR BELOW'
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Visualizing CTE modular pipeline -->
        <g transform="translate(30, 20)">
          <!-- CTE Step Box -->
          <rect width="260" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="260" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">WITH DeptStats AS (...) [STAGE 1]</text>
          <g transform="translate(12, 34)">
            <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">Calculates department aggregates:</text>
            <rect y="22" width="235" height="18" fill="#18181b" rx="2"/>
            <text x="8" y="34" fill="#a1a1aa" font-family="monospace" font-size="8">Engineering: 6 emps, $140.0k</text>
            <rect y="44" width="235" height="18" fill="#18181b" rx="2"/>
            <text x="8" y="56" fill="#a1a1aa" font-family="monospace" font-size="8">Research: 2 emps, $157.5k</text>
            <rect y="66" width="235" height="18" fill="#18181b" rx="2"/>
            <text x="8" y="78" fill="#a1a1aa" font-family="monospace" font-size="8">Executive: 1 emp, $250.0k</text>
          </g>

          <!-- Joining Arrow -->
          <g transform="translate(270, 70)">
            <path d="M 0 0 L 50 0" stroke="#10b981" stroke-width="2" stroke-dasharray="3,2"/>
            <polygon points="50,-4 60,0 50,4" fill="#10b981"/>
            <text x="30" y="-10" fill="#10b981" font-family="monospace" font-size="8" text-anchor="middle">JOIN on dept</text>
          </g>

          <!-- Main Query Result -->
          <g transform="translate(340, 0)">
            <rect width="380" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
            <rect width="380" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">FINAL CONSUMING QUERY [STAGE 2]</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">Reads from named DeptStats buffer just like a physical table.</text>
              <rect y="24" width="355" height="22" fill="#18181b" stroke="#10b981" rx="2"/>
              <text x="8" y="38" fill="#ffffff" font-family="monospace" font-size="8">Alan Turing: $180k &gt; $140k (Eng Avg) &rarr; KEPT</text>
              <rect y="50" width="355" height="22" fill="#18181b" stroke="#10b981" rx="2"/>
              <text x="8" y="64" fill="#ffffff" font-family="monospace" font-size="8">Claude Shannon: $150k &gt; $140k (Eng Avg) &rarr; KEPT</text>
              <text x="0" y="88" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Zero deeply nested parentheses &bull; High compiler clarity &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 05: Chained CTE Pipelines
  // ---------------------------------------------------------------------------
  {
    stepIndex: 5,
    id: 'subquery_chained_cte',
    keyword: 'CHAINED CTEs',
    title: 'Step 05: Chained CTE Pipelines (Multi-Stage Analytical DAGs)',
    pillClass: 'pill-cte',
    conceptHeading: 'Constructing Directed Acyclic Graphs of Transformations',
    conceptText: 'You can chain multiple CTEs by separating them with commas: WITH step1 AS (...), step2 AS (...), step3 AS (...). Step 2 can query Step 1, and Step 3 can query both Step 1 and Step 2. This creates an elegant Directed Acyclic Graph (DAG) for complex enterprise analytics.',
    sqlCode: `WITH DeptSummary AS (\n  SELECT department, AVG(salary) AS avg_sal, COUNT(*) AS emp_cnt\n  FROM OrgHierarchy\n  GROUP BY department\n),\nRankedDepts AS (\n  SELECT department, avg_sal, emp_cnt,\n         DENSE_RANK() OVER (ORDER BY avg_sal DESC) AS rank_by_pay\n  FROM DeptSummary\n)\nSELECT department, avg_sal, emp_cnt, rank_by_pay\nFROM RankedDepts\nWHERE rank_by_pay <= 2;`,
    explanationPoints: [
      'Step 1 (DeptSummary): Aggregates raw tuples into department metrics.',
      'Step 2 (RankedDepts): Consumes DeptSummary and applies analytical window ranking.',
      'Step 3 (Final SELECT): Filters on the rank generated in Step 2.',
      'Avoids the restriction where window functions cannot be filtered directly in WHERE.'
    ],
    gotcha: 'FORWARD REFERENCES ONLY: A CTE can only reference CTEs defined BEFORE it in the WITH chain. You cannot reference a CTE defined later in the comma sequence.',
    actionPrompt: 'Executing the 2-stage chained pipeline to find top 2 highest-paying departments:',
    transform: (rows) => {
      const depts = [
        { department: 'Executive', avg_sal: 250000, emp_cnt: 1, rank_by_pay: 1 },
        { department: 'Research', avg_sal: 157500, emp_cnt: 2, rank_by_pay: 2 },
        { department: 'Engineering', avg_sal: 140000, emp_cnt: 6, rank_by_pay: 3 }
      ];
      return depts.map(d => ({
        department: d.department,
        avg_sal: `$${d.avg_sal.toLocaleString()}`,
        emp_cnt: d.emp_cnt,
        rank_by_pay: d.rank_by_pay,
        _status: d.rank_by_pay <= 2 ? 'passed' : 'rejected',
        _label: d.rank_by_pay <= 2 ? `TOP ${d.rank_by_pay} DEPT` : 'ELIMINATED'
      }));
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- 3 stage DAG flow -->
        <g transform="translate(25, 20)">
          <!-- Node 1: Raw Table -->
          <rect width="180" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="180" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">1. OrgHierarchy</text>
          <g transform="translate(10, 34)">
            <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="7.5">Raw table: 9 emps</text>
            <text x="0" y="30" fill="#a1a1aa" font-family="monospace" font-size="7.5">Columns: sal, dept</text>
            <text x="0" y="50" fill="#71717a" font-family="monospace" font-size="7.5">&darr; GROUP BY</text>
          </g>

          <!-- Arrow 1 -> 2 -->
          <g transform="translate(185, 70)">
            <path d="M 0 0 L 30 0" stroke="#71717a" stroke-width="1.5"/>
            <polygon points="30,-3 36,0 30,3" fill="#a1a1aa"/>
          </g>

          <!-- Node 2: DeptSummary -->
          <g transform="translate(225, 0)">
            <rect width="210" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
            <rect width="210" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">2. DeptSummary CTE</text>
            <g transform="translate(10, 34)">
              <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="7.5">Aggregated to 3 depts</text>
              <text x="0" y="30" fill="#a1a1aa" font-family="monospace" font-size="7.5">Exec: $250k | Res: $157.5k</text>
              <text x="0" y="46" fill="#a1a1aa" font-family="monospace" font-size="7.5">Eng: $140.0k</text>
              <text x="0" y="66" fill="#71717a" font-family="monospace" font-size="7.5">&darr; DENSE_RANK()</text>
            </g>
          </g>

          <!-- Arrow 2 -> 3 -->
          <g transform="translate(440, 70)">
            <path d="M 0 0 L 30 0" stroke="#71717a" stroke-width="1.5"/>
            <polygon points="30,-3 36,0 30,3" fill="#a1a1aa"/>
          </g>

          <!-- Node 3: Final Filter -->
          <g transform="translate(475, 0)">
            <rect width="250" height="140" rx="4" fill="#121318" stroke="#10b981"/>
            <rect width="250" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8" font-weight="700">3. Final Filter: Rank &lt;= 2</text>
            <g transform="translate(10, 34)">
              <rect width="230" height="22" fill="#064e3b" rx="2"/>
              <text x="8" y="15" fill="#6ee7b7" font-family="monospace" font-size="7.5">#1 Executive ($250k)</text>
              <rect y="28" width="230" height="22" fill="#064e3b" rx="2"/>
              <text x="8" y="43" fill="#6ee7b7" font-family="monospace" font-size="7.5">#2 Research ($157.5k)</text>
              <text x="0" y="72" fill="#71717a" font-family="monospace" font-size="7.5">Engineering rank #3 dropped</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 06: Recursive CTEs - Anchor and Recursive Members
  // ---------------------------------------------------------------------------
  {
    stepIndex: 6,
    id: 'subquery_recursive_cte',
    keyword: 'RECURSIVE CTE',
    title: 'Step 06: Recursive CTEs (Graph Traversal & Fixpoint Iteration)',
    pillClass: 'pill-cte',
    conceptHeading: 'The Fixpoint Queue: Walking Hierarchies from Root to Leaf',
    conceptText: 'A recursive CTE (WITH RECURSIVE) solves graph and tree traversals in pure SQL. It consists of two queries combined with UNION ALL: 1) The Anchor Member (seeds the initial queue with the tree root), and 2) The Recursive Member (joins against the prior iteration working table until no new tuples are produced).',
    sqlCode: `WITH RECURSIVE EmpHierarchy AS (\n  -- ANCHOR: The CEO (Level 0)\n  SELECT emp_id, name, manager_id, title, 0 AS level,\n         CAST(name AS VARCHAR(255)) AS management_path\n  FROM OrgHierarchy\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  -- RECURSIVE: Direct reports joining prior iteration\n  SELECT c.emp_id, c.name, c.manager_id, c.title, p.level + 1,\n         CAST(p.management_path || ' -> ' || c.name AS VARCHAR(255))\n  FROM OrgHierarchy AS c\n  JOIN EmpHierarchy AS p ON c.manager_id = p.emp_id\n)\nSELECT emp_id, name, level, management_path FROM EmpHierarchy;`,
    explanationPoints: [
      'Iteration 0 (Anchor): Pulls Ada Lovelace (manager_id IS NULL). Working table size = 1.',
      'Iteration 1: Joins OrgHierarchy with Ada (101). Finds Alan Turing (102) and Grace Hopper (103). Working table size = 2.',
      'Iteration 2: Joins with Alan and Grace. Finds Shannon, von Neumann, and Hamilton. Working table size = 3.',
      'Fixpoint Termination: When the recursive query returns 0 rows, the engine stops and outputs all accumulated tuples.'
    ],
    gotcha: 'THE INFINITE LOOP TRAP: If your data contains a circular reference (A reports to B, B reports to A), a recursive CTE will run FOREVER until the server exhausts RAM or hits MAXRECURSION. Always include a depth counter limit or cycle detection!',
    actionPrompt: 'Walking corporate reporting tree from CEO down to level 3 engineers:',
    transform: (rows) => [
      { emp_id: 101, name: 'Ada Lovelace', level: 0, management_path: 'Ada Lovelace', _status: 'passed', _label: 'LEVEL 0 (ROOT CEO)' },
      { emp_id: 102, name: 'Alan Turing', level: 1, management_path: 'Ada -> Alan Turing', _status: 'passed', _label: 'LEVEL 1 (VP)' },
      { emp_id: 103, name: 'Grace Hopper', level: 1, management_path: 'Ada -> Grace Hopper', _status: 'passed', _label: 'LEVEL 1 (VP)' },
      { emp_id: 104, name: 'Claude Shannon', level: 2, management_path: 'Ada -> Alan -> Claude', _status: 'loaded', _label: 'LEVEL 2 (ARCHITECT)' },
      { emp_id: 105, name: 'John von Neumann', level: 2, management_path: 'Ada -> Alan -> John', _status: 'loaded', _label: 'LEVEL 2 (PRINCIPAL)' },
      { emp_id: 106, name: 'Margaret Hamilton', level: 2, management_path: 'Ada -> Grace -> Margaret', _status: 'loaded', _label: 'LEVEL 2 (DIRECTOR)' },
      { emp_id: 107, name: 'Donald Knuth', level: 3, management_path: 'Ada -> Alan -> Claude -> Knuth', _status: 'loaded', _label: 'LEVEL 3 (SENIOR)' },
      { emp_id: 108, name: 'Ken Thompson', level: 3, management_path: 'Ada -> Alan -> John -> Ken', _status: 'loaded', _label: 'LEVEL 3 (SENIOR)' },
      { emp_id: 109, name: 'Dennis Ritchie', level: 3, management_path: 'Ada -> Alan -> John -> Dennis', _status: 'loaded', _label: 'LEVEL 3 (SENIOR)' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Fixpoint Iteration Cycle Engine -->
        <g transform="translate(30, 20)">
          <text x="0" y="16" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">FIXPOINT RECURSIVE ENGINE: WORKING TABLE QUEUE TRANSITIONS</text>
          
          <g transform="translate(10, 35)">
            <!-- Iteration 0 -->
            <rect x="0" y="0" width="160" height="95" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="20" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">ANCHOR (ITER 0)</text>
            <text x="12" y="38" fill="#10b981" font-family="monospace" font-size="7.5">Ada Lovelace (CEO)</text>
            <text x="12" y="52" fill="#71717a" font-family="monospace" font-size="7.5">Level: 0</text>
            <text x="12" y="74" fill="#a1a1aa" font-family="monospace" font-size="7.5">Pushes 1 row to queue</text>

            <path d="M 165 45 L 195 45" stroke="#71717a" stroke-width="1.5"/>
            <polygon points="195,42 201,45 195,48" fill="#a1a1aa"/>

            <!-- Iteration 1 -->
            <rect x="205" y="0" width="160" height="95" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="20" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">RECURSION (ITER 1)</text>
            <text x="12" y="38" fill="#a1a1aa" font-family="monospace" font-size="7.5">Alan Turing (VP)</text>
            <text x="12" y="52" fill="#a1a1aa" font-family="monospace" font-size="7.5">Grace Hopper (VP)</text>
            <text x="12" y="74" fill="#10b981" font-family="monospace" font-size="7.5">Pushes 2 rows to queue</text>

            <path d="M 370 45 L 400 45" stroke="#71717a" stroke-width="1.5"/>
            <polygon points="400,42 406,45 400,48" fill="#a1a1aa"/>

            <!-- Iteration 2 -->
            <rect x="410" y="0" width="160" height="95" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="20" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">RECURSION (ITER 2)</text>
            <text x="12" y="38" fill="#a1a1aa" font-family="monospace" font-size="7.5">Claude Shannon</text>
            <text x="12" y="52" fill="#a1a1aa" font-family="monospace" font-size="7.5">John von Neumann</text>
            <text x="12" y="66" fill="#a1a1aa" font-family="monospace" font-size="7.5">Margaret Hamilton</text>
            <text x="12" y="84" fill="#10b981" font-family="monospace" font-size="7">Level: 2</text>

            <path d="M 575 45 L 605 45" stroke="#71717a" stroke-width="1.5"/>
            <polygon points="605,42 611,45 605,48" fill="#a1a1aa"/>

            <!-- Terminus -->
            <rect x="615" y="0" width="100" height="95" fill="#18181b" stroke="#10b981" rx="3"/>
            <text x="50" y="35" fill="#10b981" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">FIXPOINT</text>
            <text x="50" y="52" fill="#ffffff" font-family="monospace" font-size="7.5" text-anchor="middle">Queue = &empty;</text>
            <text x="50" y="75" fill="#71717a" font-family="monospace" font-size="7" text-anchor="middle">Halt &amp; Output</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 07: Cycle Detection and Depth Guards
  // ---------------------------------------------------------------------------
  {
    stepIndex: 7,
    id: 'subquery_cycle_guards',
    keyword: 'CYCLE GUARDS',
    title: 'Step 07: Cycle Detection & Graph Depth Limiting',
    pillClass: 'pill-cte',
    conceptHeading: 'Hardening Recursive Queries Against Infinite Graph Loops',
    conceptText: 'In dirty real-world databases, human error or data corruption introduces graph cycles (e.g. Employee A reports to B, who reports to A). Without defenses, a recursive CTE will enter an infinite loop until crash. Production systems defend against this using either ANSI SQL standard CYCLE clause or strict recursion depth counters (WHERE level < 10).',
    sqlCode: `WITH RECURSIVE GuardedHierarchy AS (\n  SELECT emp_id, name, manager_id, 0 AS depth,\n         '/' || emp_id || '/' AS id_path\n  FROM OrgHierarchy\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  SELECT c.emp_id, c.name, c.manager_id, p.depth + 1,\n         p.id_path || c.emp_id || '/'\n  FROM OrgHierarchy AS c\n  JOIN GuardedHierarchy AS p ON c.manager_id = p.emp_id\n  WHERE p.depth < 5 -- DEPTH LIMIT GUARD\n    AND p.id_path NOT LIKE '%/' || c.emp_id || '/%' -- CYCLE DETECTOR\n)\nSELECT * FROM GuardedHierarchy;`,
    explanationPoints: [
      'Depth Guard: `WHERE p.depth < 5` guarantees the engine will never exceed 5 iterations under any circumstances.',
      'Path Array / String Accumulator: Tracks visited node IDs (`/101/102/104/`).',
      'Cycle Guard: `NOT LIKE \'%/104/%\'` ensures a node cannot be visited twice in the same ancestry path.',
      'ANSI standard syntax: `CYCLE emp_id SET is_cycle USING path` (supported in PostgreSQL 14+, Oracle 11g+).'
    ],
    gotcha: 'DEFAULT MAXRECURSION: SQL Server defaults to MAXRECURSION 100, while SQLite and Postgres have no limit by default or high limits. Never deploy a recursive CTE to production without an explicit depth guard or cycle check.',
    actionPrompt: 'Verifying graph path and cycle safety tracking on all hierarchy records:',
    transform: (rows) => rows.map(r => ({
      emp_id: r.emp_id,
      name: r.name,
      depth_check: 'PASS (Depth <= 3)',
      cycle_status: 'CLEAN (No Cycle)',
      _status: 'passed',
      _label: 'CYCLE SAFE'
    })),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Cycle Detection Mechanism Diagram -->
        <g transform="translate(30, 20)">
          <!-- Left: Circular Death Loop -->
          <g transform="translate(0, 0)">
            <rect width="340" height="140" rx="4" fill="#121318" stroke="#ef4444" stroke-width="1.2"/>
            <rect width="340" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ef4444" font-family="monospace" font-size="8.5" font-weight="700">&cross; UNGUARDED GRAPH CYCLE</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">Cycle: Node A &rarr; Node B &rarr; Node A</text>
              <rect y="24" width="315" height="24" fill="#1c1917" stroke="#7f1d1d" rx="2"/>
              <text x="8" y="39" fill="#fca5a5" font-family="monospace" font-size="8">Iter 100,000: Queue never empties!</text>
              <text x="0" y="66" fill="#ef4444" font-family="monospace" font-size="8">RAM exhaustion &rArr; OOM Killer crashes DB</text>
              <text x="0" y="90" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Unbounded fixpoint iteration danger &bull;</text>
            </g>
          </g>

          <!-- Right: Guarded Defense -->
          <g transform="translate(370, 0)">
            <rect width="350" height="140" rx="4" fill="#121318" stroke="#10b981" stroke-width="1.2"/>
            <rect width="350" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">&check; 2-LAYER PRODUCTION GUARD</text>
            <g transform="translate(12, 34)">
              <rect width="325" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="8" y="16" fill="#6ee7b7" font-family="monospace" font-size="8">1. Bounded Depth: WHERE depth &lt; 10</text>
              <rect y="32" width="325" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="8" y="48" fill="#6ee7b7" font-family="monospace" font-size="8">2. Path Check: id NOT IN path_array</text>
              <text x="0" y="74" fill="#10b981" font-family="monospace" font-size="8">Loops are severed at birth. Zero server hang.</text>
              <text x="0" y="92" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Strict enterprise safety standard &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  }
];
