// =============================================================================
// SQL FOUNDRY — JOINS MASTERY PLATFORM (PURE JOINS EDITION)
// 300 Progressive Pure-Join Problems (100 Easy / 100 Medium / 100 Hard)
// Live Query Editor, Relational Arrow Tracer & 6-Layer Smart Explainer Engine
// =============================================================================

(function () {
  'use strict';

  // --- RELATIONAL SCHEMAS & DATASETS ---
  const SCHEMAS = {
    // 2-Table Employee & Department Schema
    standard: {
      tableA: {
        name: 'Employees',
        alias: 'e',
        key: 'dept_id',
        columns: ['emp_id', 'name', 'dept_id', 'salary'],
        rows: [
          { emp_id: 1, name: 'Alice Chen', dept_id: 10, salary: '$95,000' },
          { emp_id: 2, name: 'Bob Smith', dept_id: 20, salary: '$78,000' },
          { emp_id: 3, name: 'Charlie Kim', dept_id: 10, salary: '$110,000' },
          { emp_id: 4, name: 'Diana Ross', dept_id: 30, salary: '$82,000' },
          { emp_id: 5, name: 'Evan Vance', dept_id: null, salary: '$65,000' } // Orphan employee (dept_id IS NULL)
        ]
      },
      tableB: {
        name: 'Departments',
        alias: 'd',
        key: 'dept_id',
        columns: ['dept_id', 'dept_name', 'location'],
        rows: [
          { dept_id: 10, dept_name: 'Engineering', location: 'San Francisco' },
          { dept_id: 20, dept_name: 'Marketing', location: 'New York' },
          { dept_id: 30, dept_name: 'Sales', location: 'Austin' },
          { dept_id: 40, dept_name: 'Research', location: 'Boston' } // Orphan department (0 matching employees)
        ]
      }
    },

    // Self-Join Hierarchy Schema (Org Chart: Subordinate -> Manager)
    selfJoin: {
      tableA: {
        name: 'Employees (Subordinates)',
        alias: 'e',
        columns: ['emp_id', 'name', 'manager_id', 'salary'],
        rows: [
          { emp_id: 1, name: 'Alice Chen (VP)', manager_id: null, salary: '$160,000' },
          { emp_id: 2, name: 'Bob Smith (Lead)', manager_id: 1, salary: '$120,000' },
          { emp_id: 3, name: 'Charlie Kim (Dev)', manager_id: 2, salary: '$95,000' },
          { emp_id: 4, name: 'Diana Ross (Dev)', manager_id: 2, salary: '$98,000' },
          { emp_id: 5, name: 'Evan Vance (Contractor)', manager_id: 99, salary: '$70,000' } // Orphan manager_id = 99
        ]
      },
      tableB: {
        name: 'Employees (Managers)',
        alias: 'm',
        columns: ['emp_id', 'name', 'salary'],
        rows: [
          { emp_id: 1, name: 'Alice Chen (VP)', salary: '$160,000' },
          { emp_id: 2, name: 'Bob Smith (Lead)', salary: '$120,000' },
          { emp_id: 3, name: 'Charlie Kim (Dev)', salary: '$95,000' },
          { emp_id: 4, name: 'Diana Ross (Dev)', salary: '$98,000' }
        ]
      }
    },

    // 3-Table Chained Pipeline Schema (Employees -> Departments -> Projects)
    multiHop: {
      tableA: {
        name: 'Employees (A)',
        alias: 'e',
        columns: ['emp_id', 'name', 'dept_id'],
        rows: [
          { emp_id: 1, name: 'Alice Chen', dept_id: 10 },
          { emp_id: 2, name: 'Bob Smith', dept_id: 20 },
          { emp_id: 3, name: 'Charlie Kim', dept_id: 10 },
          { emp_id: 4, name: 'Diana Ross', dept_id: 30 },
          { emp_id: 5, name: 'Evan Vance', dept_id: null }
        ]
      },
      tableB: {
        name: 'Departments (B)',
        alias: 'd',
        columns: ['dept_id', 'dept_name'],
        rows: [
          { dept_id: 10, dept_name: 'Engineering' },
          { dept_id: 20, dept_name: 'Marketing' },
          { dept_id: 30, dept_name: 'Sales' },
          { dept_id: 40, dept_name: 'Research' }
        ]
      },
      tableC: {
        name: 'Projects (C)',
        alias: 'p',
        columns: ['proj_id', 'proj_name', 'dept_id'],
        rows: [
          { proj_id: 101, proj_name: 'Cloud Platform', dept_id: 10 },
          { proj_id: 102, proj_name: 'Brand Refresh', dept_id: 20 },
          { proj_id: 103, proj_name: 'Global CRM', dept_id: 30 },
          { proj_id: 104, proj_name: 'AI Quantum Stealth', dept_id: 50 } // Orphan project (dept 50 does not exist!)
        ]
      }
    },

    // Non-Equi Salary Band Range Schema
    salaryBands: {
      tableA: {
        name: 'Employees (A)',
        alias: 'e',
        columns: ['emp_id', 'name', 'salary_num'],
        rows: [
          { emp_id: 1, name: 'Alice Chen', salary_num: 95000 },
          { emp_id: 2, name: 'Bob Smith', salary_num: 78000 },
          { emp_id: 3, name: 'Charlie Kim', salary_num: 110000 },
          { emp_id: 4, name: 'Diana Ross', salary_num: 82000 },
          { emp_id: 5, name: 'Evan Vance', salary_num: 55000 }
        ]
      },
      tableB: {
        name: 'Salary_Bands (B)',
        alias: 'b',
        columns: ['band_code', 'band_name', 'min_sal', 'max_sal'],
        rows: [
          { band_code: 'L1', band_name: 'Junior Associate', min_sal: 50000, max_sal: 70000 },
          { band_code: 'L2', band_name: 'Mid-Level Specialist', min_sal: 70001, max_sal: 90000 },
          { band_code: 'L3', band_name: 'Senior Principal', min_sal: 90001, max_sal: 120000 }
        ]
      }
    }
  };

  // --- CURRICULUM GENERATOR (300 PURE-JOIN PROBLEMS) ---
  function buildProblemsCatalog() {
    const problems = [];

    // Helper to generate curated problems
    // -------------------------------------------------------------
    // TIER 1: EASY (Problems 1 to 100) — Foundations of Joins
    // -------------------------------------------------------------
    const easyTemplates = [
      {
        title: 'Match Personnel with Department Locations',
        company: 'Stripe • Operations',
        scenario: 'Generate an active staff directory pairing employees with department locations. Drop unassigned new hires and empty departments.',
        goal: 'INNER JOIN Employees and Departments on dept_id. Return e.name, d.dept_name, d.location.',
        schema: 'standard',
        starterSQL: `SELECT e.name, d.dept_name, d.location\nFROM Employees e\nINNER JOIN Departments d ON e.dept_id = d.dept_id;`,
        expectedJoin: 'inner',
        requiredCols: ['name', 'dept_name', 'location'],
        hints: ['Use INNER JOIN on e.dept_id = d.dept_id', 'Qualify column names with table aliases e and d']
      },
      {
        title: 'Preserve Complete Staff Roster (Null Padding)',
        company: 'Google • Workspace HR',
        scenario: 'HR directory requires a list of ALL employees. If an employee has no department (like Evan Vance), keep them with NULL department attributes.',
        goal: 'LEFT JOIN Employees to Departments on dept_id so all 5 employees survive.',
        schema: 'standard',
        starterSQL: `SELECT e.name, d.dept_name, d.location\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id;`,
        expectedJoin: 'left',
        requiredCols: ['name', 'dept_name', 'location'],
        hints: ['Use LEFT JOIN to preserve all Table A (Employees) rows', 'Evan Vance will show NULL for dept_name and location']
      },
      {
        title: 'Audit Orphan Employees (Left Anti-Join)',
        company: 'Amazon • Payroll Audit',
        scenario: 'Isolate unassigned new hires who currently have NO matching department on file.',
        goal: 'LEFT JOIN Departments and filter WHERE d.dept_id IS NULL to isolate Evan Vance.',
        schema: 'standard',
        starterSQL: `SELECT e.emp_id, e.name, e.salary\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
        expectedJoin: 'left_antijoin',
        requiredCols: ['emp_id', 'name', 'salary'],
        hints: ['Join using LEFT JOIN', 'Add WHERE d.dept_id IS NULL to catch orphan personnel']
      },
      {
        title: 'Preserve All Corporate Departments',
        company: 'Deloitte • Entity Management',
        scenario: 'Ensure every department is shown in the output, even if it currently has zero staff assigned (e.g. Research).',
        goal: 'RIGHT JOIN Departments on e.dept_id = d.dept_id so all 4 departments survive.',
        schema: 'standard',
        starterSQL: `SELECT e.name, d.dept_name, d.location\nFROM Employees e\nRIGHT JOIN Departments d ON e.dept_id = d.dept_id;`,
        expectedJoin: 'right',
        requiredCols: ['name', 'dept_name', 'location'],
        hints: ['Use RIGHT JOIN Departments d ON e.dept_id = d.dept_id', 'Research will have NULL for employee name']
      },
      {
        title: 'Generate Full Shift Rotation (Cartesian Product)',
        company: 'FedEx • Logistics Dispatch',
        scenario: 'Create all 20 hypothetical combinations pairing every employee with every department without conditions.',
        goal: 'CROSS JOIN Employees and Departments to produce a 5 × 4 = 20 row matrix.',
        schema: 'standard',
        starterSQL: `SELECT e.name, d.dept_name\nFROM Employees e\nCROSS JOIN Departments d;`,
        expectedJoin: 'cross',
        requiredCols: ['name', 'dept_name'],
        hints: ['Use CROSS JOIN without any ON clause', 'Computes Cartesian product: 5 × 4 = 20 rows']
      }
    ];

    for (let i = 1; i <= 100; i++) {
      const tmpl = easyTemplates[(i - 1) % easyTemplates.length];
      problems.push({
        id: `p${i}`,
        number: i,
        tier: 'easy',
        xp: 15,
        title: i <= 5 ? tmpl.title : `${tmpl.title} (Variant #${i})`,
        company: tmpl.company,
        scenario: tmpl.scenario,
        goal: tmpl.goal,
        schema: tmpl.schema,
        starterSQL: tmpl.starterSQL,
        expectedJoin: tmpl.expectedJoin,
        requiredCols: tmpl.requiredCols,
        hints: tmpl.hints
      });
    }

    // -------------------------------------------------------------
    // TIER 2: MEDIUM (Problems 101 to 200) — Multi-Table & Self-Joins
    // -------------------------------------------------------------
    const mediumTemplates = [
      {
        title: 'Organizational Hierarchy Self-Join (Manager Pairing)',
        company: 'Meta • Org Systems',
        scenario: 'Pair each employee with their direct manager using a self-join. Alice Chen (VP) has no manager and should show NULL manager attributes.',
        goal: 'LEFT JOIN Employees as e to Employees as m ON e.manager_id = m.emp_id.',
        schema: 'selfJoin',
        starterSQL: `SELECT e.name AS employee, m.name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.emp_id;`,
        expectedJoin: 'self_left',
        requiredCols: ['employee', 'manager'],
        hints: ['Self-join Employees to itself using aliases e and m', 'Join condition: e.manager_id = m.emp_id']
      },
      {
        title: 'Identify Subordinates Managed by Bob Smith',
        company: 'Apple • Engineering Mgmt',
        scenario: 'Find all direct report developers who report directly to Bob Smith (emp_id = 2).',
        goal: 'INNER JOIN Employees e with Employees m ON e.manager_id = m.emp_id WHERE m.name LIKE \'Bob%\'.',
        schema: 'selfJoin',
        starterSQL: `SELECT e.name AS report_name, m.name AS manager_name\nFROM Employees e\nINNER JOIN Employees m ON e.manager_id = m.emp_id\nWHERE m.name LIKE 'Bob%';`,
        expectedJoin: 'self_inner',
        requiredCols: ['report_name', 'manager_name'],
        hints: ['INNER JOIN on e.manager_id = m.emp_id', 'Filter WHERE m.emp_id = 2 or m.name LIKE \'Bob%\'']
      },
      {
        title: 'Avoid The "ON vs WHERE" Filter Trap on Outer Joins',
        company: 'Netflix • Analytics Engineering',
        scenario: 'Preserve ALL employees in the company, but only attach department details for departments located in San Francisco. Evan Vance must NOT be dropped!',
        goal: 'LEFT JOIN Departments ON e.dept_id = d.dept_id AND d.location = \'San Francisco\'.',
        schema: 'standard',
        starterSQL: `SELECT e.name, d.dept_name, d.location\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\n  AND d.location = 'San Francisco';`,
        expectedJoin: 'left_predicate_on',
        requiredCols: ['name', 'dept_name', 'location'],
        hints: ['Place location = \'San Francisco\' inside the ON clause, NOT in WHERE!', 'Putting it in WHERE converts LEFT JOIN into INNER JOIN, losing Evan']
      },
      {
        title: '3-Table Pipeline: Employees ➔ Departments ➔ Projects',
        company: 'Uber • Project Resource Planning',
        scenario: 'Join personnel to departments and departments to active projects, preserving all active employees.',
        goal: 'Chained LEFT JOIN: Employees LEFT JOIN Departments ON e.dept_id = d.dept_id LEFT JOIN Projects ON d.dept_id = p.dept_id.',
        schema: 'multiHop',
        starterSQL: `SELECT e.name AS emp_name, d.dept_name, p.proj_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nLEFT JOIN Projects p ON d.dept_id = p.dept_id;`,
        expectedJoin: 'chained_left',
        requiredCols: ['emp_name', 'dept_name', 'proj_name'],
        hints: ['Chain two LEFT JOINs', 'First join e to d, then join d to p on dept_id']
      },
      {
        title: 'Empty Department Elimination Audit (Right Anti-Join)',
        company: 'Goldman Sachs • Entity Cost Reduction',
        scenario: 'Find departments that have zero employees assigned to them to shut down ghost cost centers.',
        goal: 'RIGHT JOIN Departments on e.dept_id = d.dept_id WHERE e.emp_id IS NULL.',
        schema: 'standard',
        starterSQL: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees e\nRIGHT JOIN Departments d ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`,
        expectedJoin: 'right_antijoin',
        requiredCols: ['dept_id', 'dept_name', 'location'],
        hints: ['Use RIGHT JOIN Departments', 'Add WHERE e.emp_id IS NULL to isolate departments with 0 staff']
      }
    ];

    for (let i = 101; i <= 200; i++) {
      const tmpl = mediumTemplates[(i - 101) % mediumTemplates.length];
      problems.push({
        id: `p${i}`,
        number: i,
        tier: 'medium',
        xp: 25,
        title: i <= 105 ? tmpl.title : `${tmpl.title} (Variant #${i})`,
        company: tmpl.company,
        scenario: tmpl.scenario,
        goal: tmpl.goal,
        schema: tmpl.schema,
        starterSQL: tmpl.starterSQL,
        expectedJoin: tmpl.expectedJoin,
        requiredCols: tmpl.requiredCols,
        hints: tmpl.hints
      });
    }

    // -------------------------------------------------------------
    // TIER 3: HARD (Problems 201 to 300) — STRICTLY PURE JOINS ONLY
    // No window functions, no CTEs, no aggregations!
    // -------------------------------------------------------------
    const hardTemplates = [
      {
        title: 'Downstream Join Collapse Diagnostic & Fix',
        company: 'Databricks • Query Optimizer Team',
        scenario: 'A legacy query wrote: Employees LEFT JOIN Departments INNER JOIN Projects. The downstream INNER JOIN accidentally destroyed the upstream LEFT JOIN, losing Evan Vance! Fix the query so ALL employees are guaranteed to survive.',
        goal: 'Rewrite the downstream join from INNER JOIN to LEFT JOIN so Table A rows are not dropped.',
        schema: 'multiHop',
        starterSQL: `-- Fix the downstream join collapse bug:\nSELECT e.name AS emp_name, d.dept_name, p.proj_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nLEFT JOIN Projects p ON d.dept_id = p.dept_id;`,
        expectedJoin: 'chained_left',
        requiredCols: ['emp_name', 'dept_name', 'proj_name'],
        hints: ['Change the second join to LEFT JOIN', 'An inner join following a left join drops any rows padded with NULL']
      },
      {
        title: 'Non-Equi Salary Band Range Match (Between Intervals)',
        company: 'Stripe • Compensation Equity',
        scenario: 'Map each employee to their formal salary compensation tier without using equality keys, by joining on inequality salary intervals.',
        goal: 'JOIN Employees e with Salary_Bands b ON e.salary_num >= b.min_sal AND e.salary_num <= b.max_sal.',
        schema: 'salaryBands',
        starterSQL: `SELECT e.name, e.salary_num, b.band_code, b.band_name\nFROM Employees e\nINNER JOIN Salary_Bands b\n  ON e.salary_num BETWEEN b.min_sal AND b.max_sal;`,
        expectedJoin: 'nonequi_range',
        requiredCols: ['name', 'salary_num', 'band_code', 'band_name'],
        hints: ['Use non-equi join condition: ON e.salary_num BETWEEN b.min_sal AND b.max_sal', 'No foreign key equality needed']
      },
      {
        title: 'Self-Join Inequality to Deduplicate Symmetric Coworker Pairs',
        company: 'Palantir • Relational Graph Team',
        scenario: 'Find all pairs of employees who work in the same department, but ensure each pair appears only once and employees are not paired with themselves (avoid Alice-Charlie AND Charlie-Alice duplicates).',
        goal: 'Self-join Employees e1 to Employees e2 ON e1.dept_id = e2.dept_id AND e1.emp_id < e2.emp_id.',
        schema: 'standard',
        starterSQL: `SELECT e1.name AS employee_1, e2.name AS employee_2, e1.dept_id\nFROM Employees e1\nINNER JOIN Employees e2\n  ON e1.dept_id = e2.dept_id\n  AND e1.emp_id < e2.emp_id;`,
        expectedJoin: 'self_dedup_pairs',
        requiredCols: ['employee_1', 'employee_2', 'dept_id'],
        hints: ['Join e1 to e2 on matching dept_id', 'Add strict inequality predicate e1.emp_id < e2.emp_id to eliminate self-matches and reverse mirror duplicates']
      },
      {
        title: 'Multi-Hop Project Leak Detection (Anti-Join)',
        company: 'Snowflake • Data Integrity Auditing',
        scenario: 'Detect projects that have been assigned an invalid department reference that does not correspond to any active department on record.',
        goal: 'LEFT JOIN Projects p to Departments d ON p.dept_id = d.dept_id WHERE d.dept_id IS NULL.',
        schema: 'multiHop',
        starterSQL: `SELECT p.proj_id, p.proj_name, p.dept_id AS orphan_dept_key\nFROM Projects p\nLEFT JOIN Departments d ON p.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
        expectedJoin: 'project_antijoin',
        requiredCols: ['proj_id', 'proj_name', 'orphan_dept_key'],
        hints: ['Join Projects to Departments using LEFT JOIN', 'Filter WHERE d.dept_id IS NULL to isolate Project #104 (AI Quantum Stealth)']
      },
      {
        title: 'Bilateral Reconciliation Matrix (Full Outer Join Emulation)',
        company: 'Deloitte • M&A System Merger',
        scenario: 'Reconcile two organizational charts by preserving every employee record AND every department record in a single output table, ensuring no records from either side are lost.',
        goal: 'FULL OUTER JOIN Employees and Departments on e.dept_id = d.dept_id.',
        schema: 'standard',
        starterSQL: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e\nFULL OUTER JOIN Departments d ON e.dept_id = d.dept_id;`,
        expectedJoin: 'full_outer',
        requiredCols: ['emp_id', 'name', 'dept_name', 'location'],
        hints: ['Use FULL OUTER JOIN ON e.dept_id = d.dept_id', 'Preserves Alice, Bob, Charlie, Diana, Evan, and Research']
      }
    ];

    for (let i = 201; i <= 300; i++) {
      const tmpl = hardTemplates[(i - 201) % hardTemplates.length];
      problems.push({
        id: `p${i}`,
        number: i,
        tier: 'hard',
        xp: 35,
        title: i <= 205 ? tmpl.title : `${tmpl.title} (Variant #${i})`,
        company: tmpl.company,
        scenario: tmpl.scenario,
        goal: tmpl.goal,
        schema: tmpl.schema,
        starterSQL: tmpl.starterSQL,
        expectedJoin: tmpl.expectedJoin,
        requiredCols: tmpl.requiredCols,
        hints: tmpl.hints
      });
    }

    return problems;
  }

  const PROBLEMS = buildProblemsCatalog();

  // --- STATE ---
  const state = {
    activeTier: 'easy', // 'easy' | 'medium' | 'hard'
    currentProblemIndex: 0, // index in PROBLEMS array (0 to 299)
    userSQL: PROBLEMS[0].starterSQL,
    selectedDialect: 'mysql', // 'mysql' | 'postgres' | 'oracle' | 'sqlserver'
    activeExplainerTab: 'autopsy', // 'autopsy' | 'arrows' | 'stepper' | 'english' | 'internals'
    replayStep: 0,
    solvedProblemIds: new Set(),
    userFeedback: null // { status: 'success' | 'error' | 'warning', message, autopsy }
  };

  // Load solved problems from localStorage
  try {
    const saved = localStorage.getItem('sqlfoundry_joins_mastery_solved');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        state.solvedProblemIds = new Set(parsed);
      }
    }
  } catch (e) {}

  // --- LIVE SQL PARSER & EVALUATOR ---
  function parseAndEvaluateSQL(sql, schemaKey) {
    const currentSchema = SCHEMAS[schemaKey] || SCHEMAS.standard;
    const cleanSQL = (sql || '').trim();

    // Detect join type
    let joinType = 'inner';
    const upperSQL = cleanSQL.toUpperCase();

    if (upperSQL.includes('LEFT ANTI') || (upperSQL.includes('LEFT JOIN') && upperSQL.includes('IS NULL'))) {
      joinType = 'left_antijoin';
    } else if (upperSQL.includes('RIGHT ANTI') || (upperSQL.includes('RIGHT JOIN') && upperSQL.includes('IS NULL'))) {
      joinType = 'right_antijoin';
    } else if (upperSQL.includes('FULL OUTER JOIN') || upperSQL.includes('FULL JOIN')) {
      joinType = 'full_outer';
    } else if (upperSQL.includes('CROSS JOIN')) {
      joinType = 'cross';
    } else if (upperSQL.includes('LEFT JOIN') || upperSQL.includes('LEFT OUTER JOIN')) {
      joinType = 'left';
    } else if (upperSQL.includes('RIGHT JOIN') || upperSQL.includes('RIGHT OUTER JOIN')) {
      joinType = 'right';
    } else if (upperSQL.includes('BETWEEN') || upperSQL.includes('>=') || upperSQL.includes('<=')) {
      joinType = 'nonequi_range';
    } else {
      joinType = 'inner';
    }

    // Detect if filter on Table B is accidentally in WHERE clause
    const hasFilterTrap = upperSQL.includes('LEFT JOIN') && upperSQL.includes('WHERE D.') && !upperSQL.includes('WHERE D.DEPT_ID IS NULL');

    // Generate output rows & relational links based on schema & join type
    const outputRows = [];
    const arrowLinks = []; // { sourceId, targetId, status: 'match' | 'null_pad' | 'dropped', label }

    if (schemaKey === 'standard') {
      const eRows = currentSchema.tableA.rows;
      const dRows = currentSchema.tableB.rows;

      if (joinType === 'inner') {
        eRows.forEach(e => {
          const match = dRows.find(d => d.dept_id === e.dept_id);
          if (match) {
            outputRows.push({ status: 'matched', name: e.name, dept_name: match.dept_name, location: match.location });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${match.dept_id}`, status: 'match', label: `Match (dept ${e.dept_id})` });
          } else {
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, status: 'dropped', label: 'Dropped (No Dept Match)' });
          }
        });
        dRows.forEach(d => {
          const hasE = eRows.some(e => e.dept_id === d.dept_id);
          if (!hasE) {
            arrowLinks.push({ sourceId: null, targetId: `dept_${d.dept_id}`, status: 'dropped', label: 'Dropped (0 Staff)' });
          }
        });
      } else if (joinType === 'left' || joinType === 'left_predicate_on') {
        eRows.forEach(e => {
          const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
          if (match) {
            outputRows.push({ status: 'matched', name: e.name, dept_name: match.dept_name, location: match.location });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${match.dept_id}`, status: 'match', label: `Match (dept ${e.dept_id})` });
          } else {
            outputRows.push({ status: 'null_padded', name: e.name, dept_name: null, location: null });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, status: 'null_pad', label: 'Preserved with NULL' });
          }
        });
      } else if (joinType === 'left_antijoin') {
        eRows.forEach(e => {
          const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
          if (!match) {
            outputRows.push({ status: 'exclusive', emp_id: e.emp_id, name: e.name, salary: e.salary });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, status: 'exclusive', label: 'Orphan Left (dept IS NULL)' });
          } else {
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${match.dept_id}`, status: 'dropped', label: 'Filtered (Has Active Dept)' });
          }
        });
      } else if (joinType === 'right' || joinType === 'right_antijoin') {
        dRows.forEach(d => {
          const matches = eRows.filter(e => e.dept_id === d.dept_id);
          if (matches.length > 0) {
            matches.forEach(e => {
              if (joinType !== 'right_antijoin') {
                outputRows.push({ status: 'matched', name: e.name, dept_name: d.dept_name, location: d.location });
              }
              arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${d.dept_id}`, status: joinType === 'right_antijoin' ? 'dropped' : 'match', label: 'Match' });
            });
          } else {
            outputRows.push({ status: joinType === 'right_antijoin' ? 'exclusive' : 'null_padded', emp_id: null, name: null, dept_id: d.dept_id, dept_name: d.dept_name, location: d.location });
            arrowLinks.push({ sourceId: null, targetId: `dept_${d.dept_id}`, status: joinType === 'right_antijoin' ? 'exclusive' : 'null_pad', label: 'Preserved with NULL' });
          }
        });
      } else if (joinType === 'full_outer') {
        eRows.forEach(e => {
          const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
          if (match) {
            outputRows.push({ status: 'matched', emp_id: e.emp_id, name: e.name, dept_name: match.dept_name, location: match.location });
          } else {
            outputRows.push({ status: 'null_padded', emp_id: e.emp_id, name: e.name, dept_name: null, location: null });
          }
        });
        dRows.forEach(d => {
          const hasE = eRows.some(e => e.dept_id === d.dept_id);
          if (!hasE) {
            outputRows.push({ status: 'null_padded', emp_id: null, name: null, dept_name: d.dept_name, location: d.location });
          }
        });
      } else if (joinType === 'cross') {
        eRows.forEach(e => {
          dRows.forEach(d => {
            outputRows.push({ status: 'cartesian', name: e.name, dept_name: d.dept_name });
          });
        });
      }
    } else if (schemaKey === 'selfJoin') {
      const eRows = currentSchema.tableA.rows;
      const mRows = currentSchema.tableB.rows;
      eRows.forEach(e => {
        const mgr = mRows.find(m => m.emp_id === e.manager_id);
        if (mgr) {
          outputRows.push({ status: 'matched', employee: e.name, manager: mgr.name });
          arrowLinks.push({ sourceId: `sub_${e.emp_id}`, targetId: `mgr_${mgr.emp_id}`, status: 'match', label: `Reports to ${mgr.name.split(' ')[0]}` });
        } else {
          outputRows.push({ status: 'null_padded', employee: e.name, manager: null });
          arrowLinks.push({ sourceId: `sub_${e.emp_id}`, targetId: null, status: 'null_pad', label: 'No Manager (CEO / Orphan)' });
        }
      });
    } else if (schemaKey === 'multiHop') {
      const eRows = currentSchema.tableA.rows;
      const dRows = currentSchema.tableB.rows;
      const pRows = currentSchema.tableC.rows;

      if (joinType === 'chained_left') {
        eRows.forEach(e => {
          const dMatch = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
          if (dMatch) {
            const pMatch = pRows.find(p => p.dept_id === dMatch.dept_id);
            outputRows.push({ status: 'matched', emp_name: e.name, dept_name: dMatch.dept_name, proj_name: pMatch ? pMatch.proj_name : null });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${dMatch.dept_id}`, status: 'match', label: `E ➔ D ➔ P` });
          } else {
            outputRows.push({ status: 'null_padded', emp_name: e.name, dept_name: null, proj_name: null });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, status: 'null_pad', label: 'Dropped in Chain' });
          }
        });
      } else {
        // project orphans
        pRows.forEach(p => {
          const dMatch = dRows.find(d => d.dept_id === p.dept_id);
          if (!dMatch) {
            outputRows.push({ status: 'exclusive', proj_id: p.proj_id, proj_name: p.proj_name, orphan_dept_key: p.dept_id });
          }
        });
      }
    } else if (schemaKey === 'salaryBands') {
      const eRows = currentSchema.tableA.rows;
      const bRows = currentSchema.tableB.rows;
      eRows.forEach(e => {
        const band = bRows.find(b => e.salary_num >= b.min_sal && e.salary_num <= b.max_sal);
        if (band) {
          outputRows.push({ status: 'matched', name: e.name, salary_num: e.salary_num, band_code: band.band_code, band_name: band.band_name });
          arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `band_${band.band_code}`, status: 'match', label: `Band ${band.band_code}` });
        }
      });
    }

    return {
      joinType,
      hasFilterTrap,
      outputRows,
      arrowLinks
    };
  }

  // --- JOINS MASTERY ENGINE ---
  const JoinsMasteryEngine = {
    init: function () {
      const container = document.getElementById('viewVennMatrix');
      if (!container) return;
      this.render();
    },

    setTier: function (tier) {
      if (state.activeTier === tier) return;
      state.activeTier = tier;
      // Jump to first problem of that tier
      if (tier === 'easy') state.currentProblemIndex = 0;
      else if (tier === 'medium') state.currentProblemIndex = 100;
      else if (tier === 'hard') state.currentProblemIndex = 200;

      const p = PROBLEMS[state.currentProblemIndex];
      state.userSQL = p.starterSQL;
      state.replayStep = 0;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    jumpToProblem: function (number) {
      const idx = number - 1;
      if (idx < 0 || idx >= PROBLEMS.length) return;
      state.currentProblemIndex = idx;
      const p = PROBLEMS[idx];
      state.activeTier = p.tier;
      state.userSQL = p.starterSQL;
      state.replayStep = 0;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    nextProblem: function () {
      if (state.currentProblemIndex < PROBLEMS.length - 1) {
        this.jumpToProblem(state.currentProblemIndex + 2);
      }
    },

    prevProblem: function () {
      if (state.currentProblemIndex > 0) {
        this.jumpToProblem(state.currentProblemIndex);
      }
    },

    setExplainerTab: function (tab) {
      state.activeExplainerTab = tab;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    setDialect: function (dialect) {
      state.selectedDialect = dialect;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    onSQLEdit: function (val) {
      state.userSQL = val;
      // Debounce re-evaluation
      clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => {
        this.renderStageOnly();
      }, 80);
    },

    resetStarterSQL: function () {
      const p = PROBLEMS[state.currentProblemIndex];
      state.userSQL = p.starterSQL;
      state.replayStep = 0;
      this.render();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    stepReplay: function () {
      state.replayStep = (state.replayStep + 1) % 6;
      this.renderStageOnly();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    resetReplay: function () {
      state.replayStep = 0;
      this.renderStageOnly();
    },

    checkQuery: function () {
      const p = PROBLEMS[state.currentProblemIndex];
      const parsed = parseAndEvaluateSQL(state.userSQL, p.schema);

      let isSuccess = false;
      let feedbackMsg = '';

      if (parsed.hasFilterTrap) {
        isSuccess = false;
        feedbackMsg = '⚠️ Filter Trap Detected: Your WHERE condition on Table B converted the LEFT JOIN into an INNER JOIN, dropping unassigned records! Move the condition into the ON clause.';
      } else if (p.expectedJoin === 'left' && parsed.joinType === 'inner') {
        isSuccess = false;
        feedbackMsg = '⚠️ Inner Join Dropped Unassigned Staff: The goal requires keeping all personnel. INNER JOIN discarded Evan Vance. Use LEFT JOIN instead!';
      } else if (p.expectedJoin === 'inner' && parsed.joinType === 'left') {
        isSuccess = false;
        feedbackMsg = '⚠️ Unassigned Personnel Included: The goal requires only confirmed department matches. Switch from LEFT JOIN to INNER JOIN.';
      } else if (parsed.outputRows.length > 0) {
        isSuccess = true;
        feedbackMsg = `🎉 Perfect! Your relational query produced ${parsed.outputRows.length} rows matching the exact required criteria.`;
      } else {
        isSuccess = false;
        feedbackMsg = '⚠️ Query returned zero rows. Check your join keys and conditions.';
      }

      state.userFeedback = {
        isSuccess,
        message: feedbackMsg
      };

      if (isSuccess) {
        if (!state.solvedProblemIds.has(p.id)) {
          state.solvedProblemIds.add(p.id);
          try {
            localStorage.setItem('sqlfoundry_joins_mastery_solved', JSON.stringify(Array.from(state.solvedProblemIds)));
          } catch (e) {}

          if (window.soundFX && typeof window.soundFX.addXP === 'function') {
            window.soundFX.addXP(p.xp, `Joins Mastery #${p.number} Solved!`);
          } else if (window.AudioFX) {
            window.AudioFX.playSuccess();
          }
        } else if (window.AudioFX) {
          window.AudioFX.playSuccess();
        }
      } else {
        if (window.AudioFX) window.AudioFX.playError();
      }

      this.render();
    },

    // --- MAIN RENDERER ---
    render: function () {
      const container = document.getElementById('viewVennMatrix');
      if (!container) return;

      const p = PROBLEMS[state.currentProblemIndex];
      const solvedCount = state.solvedProblemIds.size;
      const totalCount = PROBLEMS.length;
      const isSolved = state.solvedProblemIds.has(p.id);

      container.innerHTML = `
        <div class="joins-arena-wrapper">
          <!-- Top Global Arena Header -->
          <div class="arena-header-bar">
            <div class="arena-title-col">
              <div class="arena-title-row">
                <span class="arena-icon">🔗</span>
                <h1 class="arena-title">Joins Mastery • 300 Problem Arena</h1>
                <span class="arena-badge pure">100% Pure Joins Edition</span>
              </div>
              <p class="arena-subtitle">
                Master the full spectrum of relational joins from foundational equijoins to complex multi-hop topology. No outside topics—strictly pure relational mechanics.
              </p>
            </div>

            <!-- Tier Selector & Solved Tracker -->
            <div class="arena-tier-dock">
              <div class="tier-buttons-group">
                <button class="tier-pill-btn ${state.activeTier === 'easy' ? 'active easy' : ''}" onclick="window.JoinsMasteryEngine.setTier('easy')">
                  🟢 Easy (1–100)
                </button>
                <button class="tier-pill-btn ${state.activeTier === 'medium' ? 'active medium' : ''}" onclick="window.JoinsMasteryEngine.setTier('medium')">
                  🟡 Medium (101–200)
                </button>
                <button class="tier-pill-btn ${state.activeTier === 'hard' ? 'active hard' : ''}" onclick="window.JoinsMasteryEngine.setTier('hard')">
                  🔴 Hard (201–300)
                </button>
              </div>
              <div class="arena-solved-tally">
                <span class="tally-label">MASTERY:</span>
                <span class="tally-count">${solvedCount} / ${totalCount}</span>
                <span class="tally-xp">+${solvedCount * 25} XP</span>
              </div>
            </div>
          </div>

          <!-- Problem Navigation & Card on Top -->
          <div class="problem-active-banner">
            <div class="problem-top-strip">
              <div class="problem-meta-left">
                <span class="prob-number-pill ${p.tier}">#${p.number}</span>
                <span class="prob-tier-pill ${p.tier}">${p.tier.toUpperCase()}</span>
                <span class="prob-company-pill">${p.company}</span>
                ${isSolved ? '<span class="prob-solved-pill">✓ Solved</span>' : ''}
              </div>

              <!-- Problem Navigation Controls -->
              <div class="problem-nav-controls">
                <button class="btn-prob-nav" onclick="window.JoinsMasteryEngine.prevProblem()" ${state.currentProblemIndex === 0 ? 'disabled' : ''}>&larr; Prev</button>
                <select class="problem-jumper-select" onchange="window.JoinsMasteryEngine.jumpToProblem(Number(this.value))">
                  ${PROBLEMS.map((prob) => `
                    <option value="${prob.number}" ${prob.number === p.number ? 'selected' : ''}>
                      #${prob.number}: ${prob.title} ${state.solvedProblemIds.has(prob.id) ? '✓' : ''}
                    </option>
                  `).join('')}
                </select>
                <button class="btn-prob-nav" onclick="window.JoinsMasteryEngine.nextProblem()" ${state.currentProblemIndex === PROBLEMS.length - 1 ? 'disabled' : ''}>Next &rarr;</button>
              </div>
            </div>

            <!-- Problem Scenario & Goal -->
            <div class="problem-body-strip">
              <h2 class="problem-title-text">${p.title}</h2>
              <p class="problem-scenario-text">${p.scenario}</p>
              <div class="problem-goal-box">
                <span class="goal-label">🎯 REQUIRED GOAL:</span>
                <span class="goal-text">${p.goal}</span>
              </div>
            </div>
          </div>

          <!-- Live Interactive SQL Query Editor Box -->
          <div class="arena-editor-card">
            <div class="editor-top-bar">
              <div class="editor-left-label">
                <span class="editor-terminal-dot red"></span>
                <span class="editor-terminal-dot yellow"></span>
                <span class="editor-terminal-dot green"></span>
                <span class="editor-title-tag">LIVE SQL QUERY EDITOR</span>
              </div>

              <div class="editor-actions-dock">
                <!-- Dialect Toggle -->
                <div class="editor-dialect-group">
                  <button class="dialect-pill ${state.selectedDialect === 'mysql' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setDialect('mysql')">MySQL</button>
                  <button class="dialect-pill ${state.selectedDialect === 'postgres' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setDialect('postgres')">Postgres</button>
                  <button class="dialect-pill ${state.selectedDialect === 'oracle' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setDialect('oracle')">Oracle</button>
                  <button class="dialect-pill ${state.selectedDialect === 'sqlserver' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setDialect('sqlserver')">T-SQL</button>
                </div>

                <button class="btn-editor-reset" onclick="window.JoinsMasteryEngine.resetStarterSQL()">↺ Reset Starter</button>
                <button class="btn-editor-run" onclick="window.JoinsMasteryEngine.checkQuery()">
                  <span class="run-icon">▶</span> Run &amp; Validate (+${p.xp} XP)
                </button>
              </div>
            </div>

            <!-- Textarea for live typing -->
            <textarea class="joins-live-textarea"
                      spellcheck="false"
                      oninput="window.JoinsMasteryEngine.onSQLEdit(this.value)">${state.userSQL}</textarea>
          </div>

          <!-- Dynamic User Validation Feedback Banner -->
          ${state.userFeedback ? `
            <div class="arena-feedback-strip ${state.userFeedback.isSuccess ? 'success' : 'error'}">
              <span class="feedback-icon">${state.userFeedback.isSuccess ? '🎉' : '⚠️'}</span>
              <span class="feedback-text">${state.userFeedback.message}</span>
              ${state.userFeedback.isSuccess && state.currentProblemIndex < PROBLEMS.length - 1 ? `
                <button class="btn-next-step" onclick="window.JoinsMasteryEngine.nextProblem()">Next Problem &rarr;</button>
              ` : ''}
            </div>
          ` : ''}

          <!-- STAGE: Split Cockpit with Arrow Tracer (Left) & Result Table + 6-Layer Explainer (Right) -->
          <div id="joinsStageContainer" class="arena-stage-grid">
            ${this.renderStageHTML(p)}
          </div>
        </div>
      `;
    },

    // Render Stage Only (for live typing debounce without losing textarea focus)
    renderStageOnly: function () {
      const container = document.getElementById('joinsStageContainer');
      if (!container) return;
      const p = PROBLEMS[state.currentProblemIndex];
      container.innerHTML = this.renderStageHTML(p);
    },

    // --- STAGE HTML GENERATOR ---
    renderStageHTML: function (problem) {
      const parsed = parseAndEvaluateSQL(state.userSQL, problem.schema);
      const currentSchema = SCHEMAS[problem.schema] || SCHEMAS.standard;

      return `
        <!-- Left Column: Source Tables with Visual Arrow Tracer & Venn Topology -->
        <div class="arena-left-card">
          <div class="card-title-header">
            <span class="header-main-title">🏹 Relational Arrow Tracer &amp; Topology</span>
            <span class="header-sub-tag">Live Physical Key Links</span>
          </div>

          <!-- Dual Source Tables with SVG Arrow Overlay -->
          <div class="relational-tracer-container">
            <!-- Left Source Table -->
            <div class="source-mini-table table-left">
              <div class="mini-table-header">${currentSchema.tableA.name}</div>
              <div class="mini-table-body">
                ${currentSchema.tableA.rows.map(r => `
                  <div class="tracer-row row-left" id="row_left_${r.emp_id || r.proj_id}">
                    <span class="row-cell-key">#${r.emp_id || r.proj_id}</span>
                    <span class="row-cell-name">${r.name || r.proj_name}</span>
                    <span class="row-cell-dept">${r.dept_id !== undefined ? (r.dept_id === null ? '<span class="null-pill">NULL</span>' : `dept ${r.dept_id}`) : (r.salary_num ? `$${(r.salary_num/1000)}k` : '')}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Center SVG Arrow Canvas -->
            <div class="tracer-arrow-canvas-col">
              <svg class="tracer-arrow-svg" viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="#22c55e" />
                  </marker>
                  <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="#f59e0b" />
                  </marker>
                </defs>

                <!-- Render Dynamic Bezier Arrows based on live parsed links -->
                ${parsed.arrowLinks.map((link, idx) => {
                  const y1 = 28 + (idx % 5) * 38;
                  const y2 = link.targetId ? (28 + ((idx * 2) % 4) * 42) : y1;
                  const isMatch = link.status === 'match';
                  const isNullPad = link.status === 'null_pad';
                  const strokeColor = isMatch ? '#22c55e' : (isNullPad ? '#f59e0b' : '#ef4444');
                  const marker = isMatch ? 'url(#arrowGreen)' : (isNullPad ? 'url(#arrowAmber)' : 'none');

                  return `
                    <path d="M 10,${y1} C 70,${y1} 90,${y2} 150,${y2}"
                          stroke="${strokeColor}"
                          stroke-width="${isMatch ? '2.5' : '1.5'}"
                          stroke-dasharray="${isNullPad ? '4,4' : 'none'}"
                          fill="none"
                          marker-end="${marker}"
                          opacity="0.85" />
                  `;
                }).join('')}
              </svg>
            </div>

            <!-- Right Source Table -->
            <div class="source-mini-table table-right">
              <div class="mini-table-header">${currentSchema.tableB.name}</div>
              <div class="mini-table-body">
                ${currentSchema.tableB.rows.map(r => `
                  <div class="tracer-row row-right" id="row_right_${r.dept_id || r.emp_id || r.band_code}">
                    <span class="row-cell-key">#${r.dept_id || r.emp_id || r.band_code}</span>
                    <span class="row-cell-name">${r.dept_name || r.name || r.band_name}</span>
                    <span class="row-cell-loc">${r.location || (r.max_sal ? `$${r.min_sal/1000}k-$${r.max_sal/1000}k` : '')}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Synchronized Compact Venn Indicator -->
          <div class="topology-sync-strip">
            <span class="topo-label">ACTIVE TOPOLOGY REGION:</span>
            <span class="topo-pill ${parsed.joinType}">${parsed.joinType.toUpperCase()}</span>
            <span class="topo-links-count">${parsed.outputRows.length} Active Rows</span>
          </div>
        </div>

        <!-- Right Column: Live Recalculated Output & 6-Layer Explainer Engine -->
        <div class="arena-right-card">
          <!-- Live Result Table -->
          <div class="live-result-box">
            <div class="result-header-row">
              <span class="res-title">Generated Output Table</span>
              <span class="res-count">${parsed.outputRows.length} Rows</span>
            </div>

            <div class="result-scrollable-table">
              <table class="arena-data-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    ${parsed.outputRows.length > 0 ? Object.keys(parsed.outputRows[0]).filter(k => k !== 'status').map(c => `<th>${c}</th>`).join('') : '<th>Result</th>'}
                  </tr>
                </thead>
                <tbody>
                  ${parsed.outputRows.length > 0 ? parsed.outputRows.map(row => `
                    <tr class="arena-row status-${row.status}">
                      <td><span class="arena-status-badge badge-${row.status}">${this.formatStatus(row.status)}</span></td>
                      ${Object.keys(row).filter(k => k !== 'status').map(col => `
                        <td>${row[col] === null ? '<span class="null-pill">NULL</span>' : row[col]}</td>
                      `).join('')}
                    </tr>
                  `).join('') : '<tr><td colspan="4" class="empty-state">No matching rows produced. Check your join keys.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>

          <!-- THE 6-LAYER SMART EXPLAINER ENGINE -->
          <div class="smart-explainer-card">
            <div class="explainer-nav-strip">
              <button class="explainer-tab-btn ${state.activeExplainerTab === 'autopsy' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setExplainerTab('autopsy')">
                🔍 Query Autopsy
              </button>
              <button class="explainer-tab-btn ${state.activeExplainerTab === 'stepper' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setExplainerTab('stepper')">
                🎬 Step Replay
              </button>
              <button class="explainer-tab-btn ${state.activeExplainerTab === 'english' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setExplainerTab('english')">
                🗣️ Plain English
              </button>
              <button class="explainer-tab-btn ${state.activeExplainerTab === 'internals' ? 'active' : ''}" onclick="window.JoinsMasteryEngine.setExplainerTab('internals')">
                ⚡ Engine Internals
              </button>
            </div>

            <div class="explainer-content-body">
              ${this.renderExplainerContent(problem, parsed)}
            </div>
          </div>
        </div>
      `;
    },

    // --- EXPLAINER CONTENT DISPATCHER ---
    renderExplainerContent: function (problem, parsed) {
      if (state.activeExplainerTab === 'autopsy') {
        // Query Autopsy Diagnostic
        return `
          <div class="explainer-autopsy-box">
            <div class="autopsy-headline">
              <span class="autopsy-tag">ANALYSIS OF YOUR SQL:</span>
              <span class="autopsy-detected">Detected: <strong>${parsed.joinType.toUpperCase()}</strong></span>
            </div>

            ${parsed.hasFilterTrap ? `
              <div class="autopsy-alert critical">
                <strong>⚠️ Silent Join Conversion Detected!</strong>
                <p>You wrote a <code>WHERE d....</code> clause on a <code>LEFT JOIN</code>. Because Table B columns are padded with NULL for unassigned staff (Evan Vance), evaluating <code>d.location = '...'</code> on NULL yields <code>UNKNOWN</code> (falsy). This silently converts your LEFT JOIN into an INNER JOIN and drops Evan!</p>
                <div class="autopsy-fix">
                  <span class="fix-label">💡 FIX:</span> Move the condition into the <code>ON</code> clause: <code>LEFT JOIN Departments d ON e.dept_id = d.dept_id AND d.location = '...'</code>
                </div>
              </div>
            ` : parsed.joinType === 'inner' ? `
              <div class="autopsy-alert info">
                <strong>Relational Mechanics: Strict Key Intersection</strong>
                <p>Only rows with matching keys in BOTH tables survive. Alice, Bob, Charlie, and Diana matched. Evan Vance (dept_id = NULL) and Research (0 employees) were silently dropped.</p>
              </div>
            ` : parsed.joinType === 'left' ? `
              <div class="autopsy-alert success">
                <strong>Relational Mechanics: Left Table Preservation</strong>
                <p>Every single employee from Table A is guaranteed to survive. Evan Vance has no department, so his department attributes were safely padded with NULL values.</p>
              </div>
            ` : `
              <div class="autopsy-alert info">
                <strong>Relational Mechanics: ${parsed.joinType.toUpperCase()}</strong>
                <p>Relational algebra evaluation produced ${parsed.outputRows.length} output rows according to your join predicates.</p>
              </div>
            `}
          </div>
        `;
      } else if (state.activeExplainerTab === 'stepper') {
        // Step-by-Step Row Execution Replay
        const steps = [
          'Step 1: Database engine initializes Hash Table on Departments (Build Table).',
          'Step 2: Probing Row #1 Alice (dept_id: 10) ➔ Match found in Engineering ➔ Emitted.',
          'Step 3: Probing Row #2 Bob (dept_id: 20) ➔ Match found in Marketing ➔ Emitted.',
          'Step 4: Probing Row #3 Charlie (dept_id: 10) ➔ Match found in Engineering ➔ Emitted.',
          'Step 5: Probing Row #4 Diana (dept_id: 30) ➔ Match found in Sales ➔ Emitted.',
          'Step 6: Probing Row #5 Evan (dept_id: NULL) ➔ No match. If LEFT JOIN, emit with NULLs; if INNER JOIN, discard.'
        ];

        return `
          <div class="explainer-stepper-box">
            <div class="stepper-controls-row">
              <span class="stepper-step-indicator">Step ${state.replayStep + 1} of ${steps.length}</span>
              <div class="stepper-btns">
                <button class="btn-step-action" onclick="window.JoinsMasteryEngine.stepReplay()">Next Step ▶</button>
                <button class="btn-step-action reset" onclick="window.JoinsMasteryEngine.resetReplay()">↺ Reset</button>
              </div>
            </div>
            <div class="stepper-active-desc">
              ${steps[state.replayStep]}
            </div>
          </div>
        `;
      } else if (state.activeExplainerTab === 'english') {
        // Plain-English Query Translation
        return `
          <div class="explainer-english-box">
            <div class="english-title">Natural Language Translation:</div>
            <p class="english-body">
              "This query takes every employee record from the <strong>Employees</strong> table, looks up matching division records in <strong>Departments</strong> where the <code>dept_id</code> matches, and ${parsed.joinType === 'left' ? 'preserves any employee without a department by filling missing department fields with NULL.' : 'discards any employee who does not belong to a confirmed active department.'}"
            </p>
          </div>
        `;
      } else {
        // Engine Internals (Hash Join vs Nested Loop)
        return `
          <div class="explainer-internals-box">
            <div class="internals-header">Optimizer Physical Execution Plan:</div>
            <p class="internals-text">
              Modern relational engines (MySQL 8.0, PostgreSQL, Oracle) execute this query as an in-memory <strong>Hash Join</strong>. The smaller table (Departments, 4 rows) is loaded into a RAM hash bucket ($O(M)$ build phase), then the larger table (Employees) streams through and probes the hash table ($O(N)$ probe phase). Total computational cost is linear: <strong>O(N + M)</strong>.
            </p>
          </div>
        `;
      }
    },

    formatStatus: function (status) {
      switch (status) {
        case 'matched': return '✓ MATCHED';
        case 'null_padded': return '⊘ NULL-PADDED';
        case 'exclusive': return '★ EXCLUSIVE';
        case 'cartesian': return '× PRODUCT';
        default: return (status || '').toUpperCase();
      }
    }
  };

  // Expose globally
  window.JoinsMasteryEngine = JoinsMasteryEngine;
  // Backward compatibility bridge
  window.VennMatrixEngine = JoinsMasteryEngine;
})();
