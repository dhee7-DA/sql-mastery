// =============================================================================
// SQL FOUNDRY — JOINS MASTERY PLATFORM (PURE JOINS EDITION)
// 300 Progressive Pure-Join Problems (100 Easy / 100 Medium / 100 Hard)
// Live Query Editor with Interactive Keyword Callout Ribbons & Pointer Bubbles,
// Neon Laser Tracers, Mini Venn HUD, Step Scrubber & Diff Inspector
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
          { proj_id: 101, proj_name: 'Core Payment Engine', dept_id: 10 },
          { proj_id: 102, proj_name: 'Growth Ads Funnel', dept_id: 20 },
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

    // TIER 1: EASY (Problems 1 to 100) — Foundations of Joins
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
        id: `joins_easy_${i}`,
        number: i,
        tier: 'easy',
        xp: 15,
        title: i <= 5 ? tmpl.title : `${tmpl.title} (Variant ${Math.floor((i - 1) / 5) + 1})`,
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

    // TIER 2: MEDIUM (Problems 101 to 200) — Anti-Joins, Self-Joins & Traps
    const mediumTemplates = [
      {
        title: 'The ON vs WHERE Predicate Placement Trap',
        company: 'Meta • Integrity Engineering',
        scenario: 'Filter for San Francisco departments while preserving unassigned staff. Placing the filter in WHERE drops Evan Vance; placing it in ON preserves him.',
        goal: 'LEFT JOIN with AND d.location = \'San Francisco\' in the ON clause to keep all 5 staff.',
        schema: 'standard',
        starterSQL: `SELECT e.name, d.dept_name, d.location\nFROM Employees e\nLEFT JOIN Departments d\n  ON e.dept_id = d.dept_id\n AND d.location = 'San Francisco';`,
        expectedJoin: 'left_predicate_on',
        requiredCols: ['name', 'dept_name', 'location'],
        hints: ['Move the location predicate into the ON clause', 'Do NOT use WHERE d.location = ... because NULL fails the equality test']
      },
      {
        title: 'Direct Report to Manager Hierarchy Mapping',
        company: 'Apple • Org Strategy',
        scenario: 'Self-join the employee table to pair every direct report with their designated line manager.',
        goal: 'INNER JOIN Employees e (subordinates) with Employees m (managers) on e.manager_id = m.emp_id.',
        schema: 'selfJoin',
        starterSQL: `SELECT e.name AS employee, m.name AS manager\nFROM Employees e\nINNER JOIN Employees m ON e.manager_id = m.emp_id;`,
        expectedJoin: 'self_inner',
        requiredCols: ['employee', 'manager'],
        hints: ['Use self-join with aliases e and m', 'Join on e.manager_id = m.emp_id']
      },
      {
        title: 'Include Top Executives in Management Tree',
        company: 'Microsoft • People Operations',
        scenario: 'Alice Chen is VP and has no manager (manager_id = NULL). Ensure top executives still appear with NULL manager.',
        goal: 'LEFT JOIN self-hierarchy so executive Alice Chen survives with manager as NULL.',
        schema: 'selfJoin',
        starterSQL: `SELECT e.name AS employee, m.name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.emp_id;`,
        expectedJoin: 'self_left',
        requiredCols: ['employee', 'manager'],
        hints: ['Use LEFT JOIN on e.manager_id = m.emp_id', 'Alice Chen has NULL manager and will be preserved']
      },
      {
        title: 'Detect Orphan Manager References',
        company: 'Uber • Core DB Architecture',
        scenario: 'Evan Vance has manager_id = 99, but manager #99 does not exist. Isolate staff with invalid manager foreign keys.',
        goal: 'LEFT JOIN managers and filter WHERE e.manager_id IS NOT NULL AND m.emp_id IS NULL.',
        schema: 'selfJoin',
        starterSQL: `SELECT e.emp_id, e.name, e.manager_id\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.emp_id\nWHERE e.manager_id IS NOT NULL AND m.emp_id IS NULL;`,
        expectedJoin: 'self_orphan',
        requiredCols: ['emp_id', 'name', 'manager_id'],
        hints: ['Left join on manager_id', 'Filter WHERE e.manager_id IS NOT NULL AND m.emp_id IS NULL']
      },
      {
        title: 'Find Empty Departments (Right Anti-Join)',
        company: 'Salesforce • Territory Governance',
        scenario: 'Identify divisions that have zero personnel assigned (e.g. Research in Boston).',
        goal: 'RIGHT JOIN Departments and filter WHERE e.emp_id IS NULL to find Research.',
        schema: 'standard',
        starterSQL: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees e\nRIGHT JOIN Departments d ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`,
        expectedJoin: 'right_antijoin',
        requiredCols: ['dept_id', 'dept_name', 'location'],
        hints: ['Use RIGHT JOIN', 'Filter WHERE e.emp_id IS NULL']
      }
    ];

    for (let i = 101; i <= 200; i++) {
      const tmpl = mediumTemplates[(i - 101) % mediumTemplates.length];
      problems.push({
        id: `joins_med_${i}`,
        number: i,
        tier: 'medium',
        xp: 25,
        title: i <= 105 ? tmpl.title : `${tmpl.title} (Scenario ${Math.floor((i - 101) / 5) + 1})`,
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

    // TIER 3: HARD (Problems 201 to 300) — Complex Pure-Join Topologies
    const hardTemplates = [
      {
        title: 'Prevent Downstream Inner Join Collapse in 3-Table Pipeline',
        company: 'Palantir • Foundry Platform',
        scenario: 'A common production bug: Joining Employees -> Departments (LEFT) -> Projects (INNER) silently kills unassigned staff because an inner join downstream collapses upstream outer rows.',
        goal: 'Chain two consecutive LEFT JOINs so staff without projects still survive.',
        schema: 'multiHop',
        starterSQL: `SELECT e.name AS emp_name, d.dept_name, p.proj_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nLEFT JOIN Projects p ON d.dept_id = p.dept_id;`,
        expectedJoin: 'chained_left',
        requiredCols: ['emp_name', 'dept_name', 'proj_name'],
        hints: ['Use consecutive LEFT JOINs', 'Avoid INNER JOIN in downstream stages to prevent outer join collapse']
      },
      {
        title: 'Isolate Disconnected Project Artifacts',
        company: 'Snowflake • Metadata Catalog',
        scenario: 'Project #104 has dept_id = 50 which does not exist in Departments. Identify orphan project nodes in the relational graph.',
        goal: 'LEFT JOIN Projects to Departments and filter WHERE d.dept_id IS NULL.',
        schema: 'multiHop',
        starterSQL: `SELECT p.proj_id, p.proj_name, p.dept_id AS orphan_dept_key\nFROM Projects p\nLEFT JOIN Departments d ON p.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
        expectedJoin: 'orphan_project',
        requiredCols: ['proj_id', 'proj_name', 'orphan_dept_key'],
        hints: ['Start FROM Projects p', 'LEFT JOIN Departments d ON p.dept_id = d.dept_id WHERE d.dept_id IS NULL']
      },
      {
        title: 'Non-Equi Range Join on Continuous Salary Bands',
        company: 'Goldman Sachs • Compensation Systems',
        scenario: 'Match each employee to their salary tier without equality operators using a non-equi BETWEEN boundary condition.',
        goal: 'Join Employees with Salary_Bands ON e.salary_num BETWEEN b.min_sal AND b.max_sal.',
        schema: 'salaryBands',
        starterSQL: `SELECT e.name, e.salary_num, b.band_code, b.band_name\nFROM Employees e\nINNER JOIN Salary_Bands b\n  ON e.salary_num BETWEEN b.min_sal AND b.max_sal;`,
        expectedJoin: 'nonequi_range',
        requiredCols: ['name', 'salary_num', 'band_code', 'band_name'],
        hints: ['Join on e.salary_num BETWEEN b.min_sal AND b.max_sal', 'No equality operator needed']
      },
      {
        title: 'Deduplicated Peer Pairing (Inequality Self-Join)',
        company: 'LinkedIn • Graph Insights',
        scenario: 'Generate unique co-worker pairings within the same department without duplicates like (Alice, Charlie) and (Charlie, Alice), or self-pairs like (Alice, Alice).',
        goal: 'Self-join on same dept_id with inequality predicate a.emp_id < b.emp_id.',
        schema: 'standard',
        starterSQL: `SELECT a.name AS worker_1, b.name AS worker_2, a.dept_id\nFROM Employees a\nINNER JOIN Employees b\n  ON a.dept_id = b.dept_id\n AND a.emp_id < b.emp_id;`,
        expectedJoin: 'inequality_self',
        requiredCols: ['worker_1', 'worker_2', 'dept_id'],
        hints: ['Use a.dept_id = b.dept_id to ensure same team', 'Use a.emp_id < b.emp_id to strictly eliminate reverse duplicates and self-pairs']
      },
      {
        title: 'Bilateral Reconciliation Audit (Full Outer Join)',
        company: 'Citadel • Clearing Reconciliation',
        scenario: 'Perform a 360° audit pairing all employees and departments. Preserve unassigned staff (Evan Vance) AND empty departments (Research).',
        goal: 'FULL OUTER JOIN Employees and Departments on dept_id.',
        schema: 'standard',
        starterSQL: `SELECT e.name, d.dept_name, d.location\nFROM Employees e\nFULL OUTER JOIN Departments d ON e.dept_id = d.dept_id;`,
        expectedJoin: 'full_outer',
        requiredCols: ['name', 'dept_name', 'location'],
        hints: ['Use FULL OUTER JOIN on e.dept_id = d.dept_id', 'In MySQL, full outer join is simulated using LEFT JOIN UNION RIGHT JOIN']
      }
    ];

    for (let i = 201; i <= 300; i++) {
      const tmpl = hardTemplates[(i - 201) % hardTemplates.length];
      problems.push({
        id: `joins_hard_${i}`,
        number: i,
        tier: 'hard',
        xp: 50,
        title: i <= 205 ? tmpl.title : `${tmpl.title} (Case ${Math.floor((i - 201) / 5) + 1})`,
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

  // --- ENGINE STATE ---
  const state = {
    activeTier: 'easy',
    currentProblemIndex: 0,
    userSQL: PROBLEMS[0].starterSQL,
    selectedDialect: 'mysql',
    activeExplainerTab: 'autopsy',
    replayStep: 0,
    isAutoPlaying: false,
    autoPlayTimer: null,
    hoveredKey: null, // { side: 'left'|'right', id: number|string }
    activeCalloutToken: 'join', // active token key for callout popup
    diffView: false, // boolean: table vs diff inspector
    solvedProblemIds: new Set(),
    userFeedback: null
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
    const upperSQL = cleanSQL.toUpperCase();

    // Detect join type
    let joinType = 'inner';
    if (upperSQL.includes('LEFT ANTI') || (upperSQL.includes('LEFT JOIN') && upperSQL.includes('IS NULL'))) {
      joinType = 'left_antijoin';
    } else if (upperSQL.includes('RIGHT ANTI') || (upperSQL.includes('RIGHT JOIN') && upperSQL.includes('IS NULL'))) {
      joinType = 'right_antijoin';
    } else if (upperSQL.includes('FULL OUTER JOIN') || upperSQL.includes('FULL JOIN')) {
      joinType = 'full_outer';
    } else if (upperSQL.includes('CROSS JOIN')) {
      joinType = 'cross';
    } else if (upperSQL.includes('LEFT JOIN') && upperSQL.includes('AND D.LOCATION')) {
      joinType = 'left_predicate_on';
    } else if (upperSQL.includes('LEFT JOIN') || upperSQL.includes('LEFT OUTER JOIN')) {
      joinType = 'left';
    } else if (upperSQL.includes('RIGHT JOIN') || upperSQL.includes('RIGHT OUTER JOIN')) {
      joinType = 'right';
    } else if (upperSQL.includes('BETWEEN') || upperSQL.includes('>=') || upperSQL.includes('<=')) {
      joinType = 'nonequi_range';
    } else if (upperSQL.includes('A.EMP_ID < B.EMP_ID') || upperSQL.includes('E1.EMP_ID < E2.EMP_ID')) {
      joinType = 'inequality_self';
    } else {
      joinType = 'inner';
    }

    // Detect if filter on Table B is accidentally in WHERE clause
    const hasFilterTrap = upperSQL.includes('LEFT JOIN') && upperSQL.includes('WHERE D.') && !upperSQL.includes('WHERE D.DEPT_ID IS NULL');

    // Generate output rows & relational links
    const outputRows = [];
    const arrowLinks = [];

    if (schemaKey === 'standard') {
      const eRows = currentSchema.tableA.rows;
      const dRows = currentSchema.tableB.rows;

      if (joinType === 'inner') {
        eRows.forEach(e => {
          const match = dRows.find(d => d.dept_id === e.dept_id);
          if (match) {
            outputRows.push({ status: 'matched', emp_id: e.emp_id, name: e.name, dept_name: match.dept_name, location: match.location });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${match.dept_id}`, sourceKey: e.dept_id, targetKey: match.dept_id, status: 'match', label: `Match (dept ${e.dept_id})` });
          } else {
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, sourceKey: e.dept_id, targetKey: null, status: 'dropped', label: 'Dropped (No Dept Match)' });
          }
        });
        dRows.forEach(d => {
          const hasE = eRows.some(e => e.dept_id === d.dept_id);
          if (!hasE) {
            arrowLinks.push({ sourceId: null, targetId: `dept_${d.dept_id}`, sourceKey: null, targetKey: d.dept_id, status: 'dropped', label: 'Dropped (0 Staff)' });
          }
        });
      } else if (joinType === 'left' || joinType === 'left_predicate_on') {
        eRows.forEach(e => {
          const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
          if (match) {
            outputRows.push({ status: 'matched', emp_id: e.emp_id, name: e.name, dept_name: match.dept_name, location: match.location });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${match.dept_id}`, sourceKey: e.dept_id, targetKey: match.dept_id, status: 'match', label: `Match (dept ${e.dept_id})` });
          } else {
            outputRows.push({ status: 'null_padded', emp_id: e.emp_id, name: e.name, dept_name: null, location: null });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, sourceKey: e.dept_id, targetKey: null, status: 'null_pad', label: 'Preserved with NULL' });
          }
        });
      } else if (joinType === 'left_antijoin') {
        eRows.forEach(e => {
          const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
          if (!match) {
            outputRows.push({ status: 'exclusive', emp_id: e.emp_id, name: e.name, salary: e.salary });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, sourceKey: e.dept_id, targetKey: null, status: 'exclusive', label: 'Orphan Left (dept IS NULL)' });
          } else {
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${match.dept_id}`, sourceKey: e.dept_id, targetKey: match.dept_id, status: 'dropped', label: 'Filtered (Has Active Dept)' });
          }
        });
      } else if (joinType === 'right' || joinType === 'right_antijoin') {
        dRows.forEach(d => {
          const matches = eRows.filter(e => e.dept_id === d.dept_id);
          if (matches.length > 0) {
            matches.forEach(e => {
              if (joinType !== 'right_antijoin') {
                outputRows.push({ status: 'matched', emp_id: e.emp_id, name: e.name, dept_name: d.dept_name, location: d.location });
              }
              arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${d.dept_id}`, sourceKey: e.dept_id, targetKey: d.dept_id, status: joinType === 'right_antijoin' ? 'dropped' : 'match', label: 'Match' });
            });
          } else {
            outputRows.push({ status: joinType === 'right_antijoin' ? 'exclusive' : 'null_padded', emp_id: null, name: null, dept_id: d.dept_id, dept_name: d.dept_name, location: d.location });
            arrowLinks.push({ sourceId: null, targetId: `dept_${d.dept_id}`, sourceKey: null, targetKey: d.dept_id, status: joinType === 'right_antijoin' ? 'exclusive' : 'null_pad', label: 'Preserved with NULL' });
          }
        });
      } else if (joinType === 'full_outer') {
        eRows.forEach(e => {
          const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
          if (match) {
            outputRows.push({ status: 'matched', emp_id: e.emp_id, name: e.name, dept_name: match.dept_name, location: match.location });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${match.dept_id}`, sourceKey: e.dept_id, targetKey: match.dept_id, status: 'match', label: 'Match' });
          } else {
            outputRows.push({ status: 'null_padded', emp_id: e.emp_id, name: e.name, dept_name: null, location: null });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, sourceKey: e.dept_id, targetKey: null, status: 'null_pad', label: 'Left Preserved' });
          }
        });
        dRows.forEach(d => {
          const hasE = eRows.some(e => e.dept_id === d.dept_id);
          if (!hasE) {
            outputRows.push({ status: 'null_padded', emp_id: null, name: null, dept_name: d.dept_name, location: d.location });
            arrowLinks.push({ sourceId: null, targetId: `dept_${d.dept_id}`, sourceKey: null, targetKey: d.dept_id, status: 'null_pad', label: 'Right Preserved' });
          }
        });
      } else if (joinType === 'cross') {
        eRows.forEach(e => {
          dRows.forEach(d => {
            outputRows.push({ status: 'cartesian', emp_id: e.emp_id, name: e.name, dept_name: d.dept_name });
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
          arrowLinks.push({ sourceId: `sub_${e.emp_id}`, targetId: `mgr_${mgr.emp_id}`, sourceKey: e.manager_id, targetKey: mgr.emp_id, status: 'match', label: `Reports to ${mgr.name.split(' ')[0]}` });
        } else {
          outputRows.push({ status: 'null_padded', employee: e.name, manager: null });
          arrowLinks.push({ sourceId: `sub_${e.emp_id}`, targetId: null, sourceKey: e.manager_id, targetKey: null, status: 'null_pad', label: 'No Manager (CEO / Orphan)' });
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
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `dept_${dMatch.dept_id}`, sourceKey: e.dept_id, targetKey: dMatch.dept_id, status: 'match', label: `E ➔ D ➔ P` });
          } else {
            outputRows.push({ status: 'null_padded', emp_name: e.name, dept_name: null, proj_name: null });
            arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: null, sourceKey: e.dept_id, targetKey: null, status: 'null_pad', label: 'Dropped in Chain' });
          }
        });
      } else {
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
          arrowLinks.push({ sourceId: `emp_${e.emp_id}`, targetId: `band_${band.band_code}`, sourceKey: e.salary_num, targetKey: band.band_code, status: 'match', label: `Band ${band.band_code}` });
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

  // --- GOAL EVALUATOR & DIFF INSPECTOR ---
  function evaluateProblemGoal(problem, userParsed) {
    const cleanUserSQL = (state.userSQL || '').toUpperCase();
    const expectedParsed = parseAndEvaluateSQL(problem.starterSQL, problem.schema);

    let joinMatches = false;
    if (problem.expectedJoin === 'inner' && userParsed.joinType === 'inner') joinMatches = true;
    else if (problem.expectedJoin === 'left' && (userParsed.joinType === 'left' || userParsed.joinType === 'left_predicate_on')) joinMatches = true;
    else if (problem.expectedJoin === 'left_antijoin' && userParsed.joinType === 'left_antijoin') joinMatches = true;
    else if (problem.expectedJoin === 'right' && userParsed.joinType === 'right') joinMatches = true;
    else if (problem.expectedJoin === 'cross' && userParsed.joinType === 'cross') joinMatches = true;
    else if (problem.expectedJoin === userParsed.joinType) joinMatches = true;

    const hasFilterTrap = userParsed.hasFilterTrap;
    const expectedRowCount = expectedParsed.outputRows.length;
    const actualRowCount = userParsed.outputRows.length;
    const rowCountMatches = expectedRowCount === actualRowCount;

    const isSuccess = joinMatches && !hasFilterTrap && (rowCountMatches || (expectedRowCount > 0 && actualRowCount > 0));

    // Compute diff breakdown
    const matchedRows = [];
    const missingRows = [];
    const extraRows = [];

    expectedParsed.outputRows.forEach(expRow => {
      const found = userParsed.outputRows.some(actRow => {
        return (actRow.name && actRow.name === expRow.name) ||
               (actRow.employee && actRow.employee === expRow.employee) ||
               (actRow.proj_name && actRow.proj_name === expRow.proj_name);
      });
      if (found) {
        matchedRows.push(expRow);
      } else {
        missingRows.push(expRow);
      }
    });

    userParsed.outputRows.forEach(actRow => {
      const foundInExp = expectedParsed.outputRows.some(expRow => {
        return (actRow.name && actRow.name === expRow.name) ||
               (actRow.employee && actRow.employee === expRow.employee) ||
               (actRow.proj_name && actRow.proj_name === expRow.proj_name);
      });
      if (!foundInExp) {
        extraRows.push(actRow);
      }
    });

    return {
      isSuccess,
      joinMatches,
      hasFilterTrap,
      expectedRowCount,
      actualRowCount,
      rowCountMatches,
      matchedRows,
      missingRows,
      extraRows,
      expectedParsed
    };
  }

  // --- QUERY KEYWORD TOKENS & PROBLEM-SPECIFIC CALLOUTS ---
  function getQueryTokens(sql, problem) {
    const cleanSQL = (sql || '').trim();
    const upperSQL = cleanSQL.toUpperCase();
    const tokens = [];

    // 1. SELECT Token
    tokens.push({
      key: 'select',
      badge: 'SELECT',
      label: 'Output Projection',
      icon: '📋',
      color: '#06b6d4',
      title: 'SELECT (Columns Projection)',
      explanation: 'Picks the exact attributes returned in the result: employee details merged with matching department attributes.'
    });

    // 2. FROM Token
    tokens.push({
      key: 'from',
      badge: 'FROM',
      label: 'Driving Table (A)',
      icon: '🏢',
      color: '#10b981',
      title: 'FROM Employees e (Driving Stream)',
      explanation: 'Starts with Table A (5 employees). The alias "e" lets you write short references like e.name instead of Employees.name.'
    });

    // 3. JOIN Token
    let joinLabel = 'INNER JOIN (Strict Match)';
    let joinExp = 'Strict key intersection (⋈): Only employees with matching dept_id in Departments survive. Alice, Bob, Charlie, and Diana match. Evan Vance (unassigned) and Research (empty) are dropped.';
    let joinColor = '#10b981';

    if (upperSQL.includes('LEFT JOIN') && upperSQL.includes('IS NULL')) {
      joinLabel = 'LEFT ANTI-JOIN (Exclusion)';
      joinExp = 'Isolates orphan staff in Table A who have NO department on record (Evan Vance).';
      joinColor = '#f59e0b';
    } else if (upperSQL.includes('LEFT JOIN')) {
      joinLabel = 'LEFT JOIN (Preserve All Staff)';
      joinExp = 'Left outer preservation (⟕): All 5 employees survive in the output. For Evan Vance, missing department columns are filled with NULL.';
      joinColor = '#3b82f6';
    } else if (upperSQL.includes('RIGHT JOIN')) {
      joinLabel = 'RIGHT JOIN (Preserve Departments)';
      joinExp = 'Right outer preservation (⟖): Guarantees all 4 departments survive. Research department appears with NULL employee attributes.';
      joinColor = '#a855f7';
    } else if (upperSQL.includes('FULL')) {
      joinLabel = 'FULL OUTER JOIN (360° Audit)';
      joinExp = 'Full bilateral union (⟗): Preserves unassigned staff (Evan Vance) AND empty departments (Research) with NULL padding.';
      joinColor = '#eab308';
    } else if (upperSQL.includes('CROSS')) {
      joinLabel = 'CROSS JOIN (Cartesian Product)';
      joinExp = 'Unconditional combinatorial pairing: generates all 5 × 4 = 20 employee-department combinations.';
      joinColor = '#ec4899';
    }

    tokens.push({
      key: 'join',
      badge: 'JOIN',
      label: joinLabel,
      icon: '🔗',
      color: joinColor,
      title: joinLabel,
      explanation: joinExp
    });

    // 4. ON Token
    tokens.push({
      key: 'on',
      badge: 'ON',
      label: 'ON (Key Condition)',
      icon: '🔑',
      color: '#f59e0b',
      title: 'ON e.dept_id = d.dept_id (Relational Bridge)',
      explanation: 'The join predicate that tests for matching keys. Connects foreign key e.dept_id with primary key d.dept_id.'
    });

    // 5. WHERE Token (if query contains WHERE)
    if (upperSQL.includes('WHERE')) {
      const isFilterTrap = upperSQL.includes('LEFT JOIN') && upperSQL.includes('WHERE D.') && !upperSQL.includes('IS NULL');
      tokens.push({
        key: 'where',
        badge: isFilterTrap ? '⚠️ TRAP' : 'WHERE',
        label: isFilterTrap ? 'Filter Trap Detected!' : 'WHERE Post-Filter',
        icon: isFilterTrap ? '⚠️' : '🎯',
        color: isFilterTrap ? '#ef4444' : '#06b6d4',
        title: isFilterTrap ? 'Silent Join Conversion Warning!' : 'WHERE Clause Filter',
        explanation: isFilterTrap
          ? 'Placing a WHERE filter on Table B in a LEFT JOIN silently drops NULL-padded rows (Evan Vance), converting it into an INNER JOIN! Move condition to ON.'
          : 'Applies post-join filtering on rows emitted from the relational join.'
      });
    }

    return tokens;
  }

  // --- JOINS MASTERY ENGINE OBJECT ---
  const JoinsMasteryEngine = {
    init: function () {
      const container = document.getElementById('viewVennMatrix');
      if (!container) return;
      this.render();
    },

    setTier: function (tier) {
      if (state.activeTier === tier) return;
      state.activeTier = tier;
      if (tier === 'easy') state.currentProblemIndex = 0;
      else if (tier === 'medium') state.currentProblemIndex = 100;
      else if (tier === 'hard') state.currentProblemIndex = 200;

      const p = PROBLEMS[state.currentProblemIndex];
      state.userSQL = p.starterSQL;
      state.replayStep = 0;
      state.userFeedback = null;
      state.activeCalloutToken = 'join';
      this.stopAutoPlay();
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
      state.userFeedback = null;
      state.activeCalloutToken = 'join';
      this.stopAutoPlay();
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

    setCalloutToken: function (tokenKey) {
      state.activeCalloutToken = tokenKey;
      this.renderCalloutsOnly();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    onSQLEdit: function (val) {
      state.userSQL = val;
      clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => {
        this.renderStageOnly();
        this.renderCalloutsOnly();
      }, 80);
    },

    resetStarterSQL: function () {
      const p = PROBLEMS[state.currentProblemIndex];
      state.userSQL = p.starterSQL;
      state.replayStep = 0;
      state.userFeedback = null;
      state.activeCalloutToken = 'join';
      this.stopAutoPlay();
      this.render();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    // Step Scrubber & Timeline Controls
    stepReplay: function () {
      state.replayStep = (state.replayStep + 1) % 6;
      this.renderStageOnly();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    prevStepReplay: function () {
      state.replayStep = (state.replayStep - 1 + 6) % 6;
      this.renderStageOnly();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    resetReplay: function () {
      state.replayStep = 0;
      this.renderStageOnly();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    stepScrub: function (val) {
      state.replayStep = Math.max(0, Math.min(5, val));
      this.renderStageOnly();
    },

    toggleAutoPlay: function () {
      if (state.isAutoPlaying) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    },

    startAutoPlay: function () {
      state.isAutoPlaying = true;
      if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
      state.autoPlayTimer = setInterval(() => {
        state.replayStep = (state.replayStep + 1) % 6;
        this.renderStageOnly();
      }, 1600);
      this.renderStageOnly();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    stopAutoPlay: function () {
      state.isAutoPlaying = false;
      if (state.autoPlayTimer) {
        clearInterval(state.autoPlayTimer);
        state.autoPlayTimer = null;
      }
      this.renderStageOnly();
    },

    // Hover Synchronization
    setHoverKey: function (side, id) {
      state.hoveredKey = { side, id };
      this.renderStageOnly();
    },

    clearHoverKey: function () {
      state.hoveredKey = null;
      this.renderStageOnly();
    },

    // Diff Inspector Toggle
    toggleDiffView: function (val) {
      state.diffView = val !== undefined ? val : !state.diffView;
      this.renderStageOnly();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    // Query Run & Gamification Check
    checkQuery: function () {
      const p = PROBLEMS[state.currentProblemIndex];
      const parsed = parseAndEvaluateSQL(state.userSQL, p.schema);
      const goalEval = evaluateProblemGoal(p, parsed);

      let feedbackMsg = '';
      if (goalEval.hasFilterTrap) {
        feedbackMsg = '⚠️ Filter Trap Detected: Your WHERE condition on Table B converted the LEFT JOIN into an INNER JOIN, dropping unassigned records! Move the condition into the ON clause.';
      } else if (p.expectedJoin === 'left' && parsed.joinType === 'inner') {
        feedbackMsg = '⚠️ Inner Join Dropped Unassigned Staff: The goal requires keeping all personnel. INNER JOIN discarded Evan Vance. Use LEFT JOIN instead!';
      } else if (p.expectedJoin === 'inner' && parsed.joinType === 'left') {
        feedbackMsg = '⚠️ Unassigned Personnel Included: The goal requires only confirmed department matches. Switch from LEFT JOIN to INNER JOIN.';
      } else if (goalEval.isSuccess) {
        feedbackMsg = `🎉 Perfect! Your relational query produced ${parsed.outputRows.length} rows perfectly satisfying the challenge goal.`;
      } else {
        feedbackMsg = '⚠️ Query criteria incomplete. Check your join keys, column names, and conditions.';
      }

      state.userFeedback = {
        isSuccess: goalEval.isSuccess,
        message: feedbackMsg,
        goalEval: goalEval
      };

      if (goalEval.isSuccess) {
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

          // Trigger Confetti & Bloub celebration
          if (window.BloubAvatar) {
            if (typeof window.BloubAvatar.celebrate === 'function') window.BloubAvatar.celebrate();
            if (typeof window.BloubAvatar.triggerConfetti === 'function') window.BloubAvatar.triggerConfetti();
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

          <!-- Live Interactive SQL Query Editor Box with Interactive Keyword Callouts -->
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

            <!-- Interactive Keywords Ribbon with Attached Pointer Callouts -->
            <div id="queryTokensRibbon" class="query-tokens-ribbon">
              ${this.renderTokenRibbonHTML(state.userSQL, p)}
            </div>

            <!-- Full-Width Clean Textarea for live typing -->
            <div class="query-textarea-wrap">
              <textarea id="joinsQueryTextarea"
                        class="joins-live-textarea"
                        spellcheck="false"
                        oninput="window.JoinsMasteryEngine.onSQLEdit(this.value)">${state.userSQL}</textarea>
            </div>
          </div>

          <!-- Dynamic User Validation Feedback Banner with Confetti / Celebration -->
          ${state.userFeedback ? `
            <div class="arena-feedback-strip ${state.userFeedback.isSuccess ? 'success celebrate-pulse' : 'error'}">
              <div class="feedback-left-wrap">
                <span class="feedback-icon">${state.userFeedback.isSuccess ? '🎉' : '⚠️'}</span>
                <span class="feedback-text">${state.userFeedback.message}</span>
              </div>
              ${state.userFeedback.isSuccess && state.currentProblemIndex < PROBLEMS.length - 1 ? `
                <button class="btn-next-challenge-pulse" onclick="window.JoinsMasteryEngine.nextProblem()">
                  Next Challenge (#${p.number + 1}) &rarr;
                </button>
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

    // Render Callouts Only (for live typing debounce without losing textarea focus)
    renderCalloutsOnly: function () {
      const container = document.getElementById('queryTokensRibbon');
      if (!container) return;
      const p = PROBLEMS[state.currentProblemIndex];
      container.innerHTML = this.renderTokenRibbonHTML(state.userSQL, p);
    },

    // Render Keyword Token Ribbon & Attached Speech Bubble Callout
    renderTokenRibbonHTML: function (sql, problem) {
      const tokens = getQueryTokens(sql, problem);
      const activeToken = tokens.find(t => t.key === state.activeCalloutToken) || tokens[0] || null;

      return `
        <div class="keyword-ribbon-bar">
          <div class="ribbon-prompt-label">
            <span>💡 Click or hover any SQL keyword below for a dedicated callout explanation:</span>
          </div>

          <!-- Interactive Keyword Chips Row -->
          <div class="keyword-chips-row">
            ${tokens.map(t => {
              const isActive = activeToken && activeToken.key === t.key;
              return `
                <button class="keyword-chip-btn ${isActive ? 'active' : ''}"
                        style="--chip-color: ${t.color};"
                        onclick="window.JoinsMasteryEngine.setCalloutToken('${t.key}')"
                        onmouseenter="window.JoinsMasteryEngine.setCalloutToken('${t.key}')">
                  <span class="chip-icon">${t.icon}</span>
                  <span class="chip-badge">${t.badge}</span>
                  <span class="chip-text">${t.label}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Speech-Bubble Callout Popup with Attached Pointer Arrow -->
          ${activeToken ? `
            <div class="token-callout-bubble" style="--bubble-accent: ${activeToken.color};">
              <!-- Upward Pointer Arrow -->
              <div class="bubble-pointer-arrow"></div>

              <div class="bubble-header-row">
                <div class="bubble-title-group">
                  <span class="bubble-icon">${activeToken.icon}</span>
                  <span class="bubble-title">${activeToken.title}</span>
                </div>
                <span class="bubble-tag" style="color: ${activeToken.color}; background: ${activeToken.color}18;">
                  ${activeToken.badge}
                </span>
              </div>

              <p class="bubble-body-text">
                ${activeToken.explanation}
              </p>
            </div>
          ` : ''}
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
      const goalEval = evaluateProblemGoal(problem, parsed);

      // Active Hover Key Check
      const hover = state.hoveredKey;
      let activePredicateMsg = '';
      if (hover && hover.side === 'left') {
        const empRow = currentSchema.tableA.rows.find(r => (r.emp_id || r.proj_id) === hover.id);
        if (empRow) {
          if (empRow.dept_id !== undefined) {
            const deptMatch = currentSchema.tableB.rows.find(d => d.dept_id === empRow.dept_id);
            if (deptMatch) {
              activePredicateMsg = `⚡ PROBE HIT: e.dept_id (${empRow.dept_id}) == d.dept_id (${deptMatch.dept_id}) ➔ TRUE [${empRow.name} ↔ ${deptMatch.dept_name}] (Row Emitted)`;
            } else {
              activePredicateMsg = `⚡ PROBE MISS: e.dept_id (${empRow.dept_id === null ? 'NULL' : empRow.dept_id}) ➔ No match in Departments. Discarded in INNER JOIN, preserved in LEFT JOIN.`;
            }
          } else if (empRow.manager_id !== undefined) {
            const mgrMatch = currentSchema.tableB.rows.find(m => m.emp_id === empRow.manager_id);
            if (mgrMatch) {
              activePredicateMsg = `⚡ SELF-JOIN PROBE: e.manager_id (${empRow.manager_id}) == m.emp_id (${mgrMatch.emp_id}) ➔ Reports to ${mgrMatch.name}`;
            } else {
              activePredicateMsg = `⚡ SELF-JOIN MISS: manager_id = ${empRow.manager_id === null ? 'NULL (Top Exec)' : empRow.manager_id + ' (Orphan)'}`;
            }
          } else if (empRow.salary_num) {
            activePredicateMsg = `⚡ RANGE PROBE: salary $${empRow.salary_num.toLocaleString()} evaluated against continuous salary band thresholds`;
          }
        }
      } else if (hover && hover.side === 'right') {
        const deptRow = currentSchema.tableB.rows.find(r => (r.dept_id || r.band_code) === hover.id);
        if (deptRow) {
          const matchingEmployees = currentSchema.tableA.rows.filter(e => e.dept_id === deptRow.dept_id);
          activePredicateMsg = `🏢 TARGET KEY: dept_id ${deptRow.dept_id} (${deptRow.dept_name}) ➔ ${matchingEmployees.length} Staff Assigned`;
        }
      }

      return `
        <!-- Left Column: Source Tables with Visual Arrow Tracer & Mini Venn HUD -->
        <div class="arena-left-card">
          <div class="card-title-header">
            <div class="header-title-group">
              <span class="header-main-title">🏹 Relational Arrow Tracer &amp; Topology</span>
              <span class="header-sub-tag">Live Physical Key Links</span>
            </div>
            <!-- Live Region Pill -->
            <span class="topo-pill ${parsed.joinType}">${parsed.joinType.toUpperCase()}</span>
          </div>

          <!-- MINI VENN DIAGRAM HUD WIDGET -->
          <div class="mini-venn-hud-container">
            <div class="mini-venn-svg-wrapper">
              <svg class="mini-venn-svg" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="vennGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <!-- Left Circle Base -->
                <circle cx="90" cy="50" r="38" class="venn-circle-base base-left" />
                <!-- Right Circle Base -->
                <circle cx="150" cy="50" r="38" class="venn-circle-base base-right" />

                <!-- Left Crescent (Left Only) -->
                <path d="M 120,25.2 A 38,38 0 1,0 120,74.8 A 38,38 0 0,0 120,25.2 Z"
                      class="venn-region left-crescent ${['left', 'full_outer', 'left_antijoin'].includes(parsed.joinType) ? 'active' : ''}" />

                <!-- Right Crescent (Right Only) -->
                <path d="M 120,25.2 A 38,38 0 0,1 120,74.8 A 38,38 0 1,1 120,25.2 Z"
                      class="venn-region right-crescent ${['right', 'full_outer', 'right_antijoin'].includes(parsed.joinType) ? 'active' : ''}" />

                <!-- Overlap Lens (Intersection A ∩ B) -->
                <path d="M 120,25.2 A 38,38 0 0,1 120,74.8 A 38,38 0 0,1 120,25.2 Z"
                      class="venn-region overlap-lens ${['inner', 'left', 'right', 'full_outer'].includes(parsed.joinType) ? 'active' : ''}" />

                <!-- Labels & Counts -->
                <text x="68" y="53" class="venn-label text-left">A (1)</text>
                <text x="120" y="53" class="venn-label text-center">A ∩ B (4)</text>
                <text x="172" y="53" class="venn-label text-right">B (1)</text>
              </svg>
            </div>
            <div class="mini-venn-hud-info">
              <span class="hud-info-tag">ACTIVE TOPOLOGY:</span>
              <span class="hud-info-status">
                ${parsed.joinType === 'inner' ? 'Intersection Only (A ∩ B) • Unmatched Rows Dropped' :
                  parsed.joinType === 'left' ? 'Left Outer (A ∪ (A ∩ B)) • Unmatched Staff Preserved' :
                  parsed.joinType === 'left_antijoin' ? 'Left Exclusive (A − B) • Isolating Unassigned Staff' :
                  parsed.joinType === 'right' ? 'Right Outer ((A ∩ B) ∪ B) • All Departments Preserved' :
                  parsed.joinType === 'full_outer' ? 'Full Bilateral Union (A ∪ B) • 360° Reconciliation' :
                  parsed.joinType.toUpperCase()}
              </span>
            </div>
          </div>

          <!-- Dual Source Tables with SVG Neon Laser Arrow Overlay -->
          <div class="relational-tracer-container">
            <!-- Left Source Table -->
            <div class="source-mini-table table-left">
              <div class="mini-table-header">${currentSchema.tableA.name}</div>
              <div class="mini-table-body">
                ${currentSchema.tableA.rows.map((r, rIdx) => {
                  const isHovered = hover && hover.side === 'left' && (r.emp_id || r.proj_id) === hover.id;
                  const isStepping = state.replayStep === (rIdx + 1);
                  return `
                    <div class="tracer-row row-left ${isHovered ? 'hover-highlight' : ''} ${isStepping ? 'step-spotlight' : ''}"
                         id="row_left_${r.emp_id || r.proj_id}"
                         onmouseenter="window.JoinsMasteryEngine.setHoverKey('left', ${r.emp_id || r.proj_id})"
                         onmouseleave="window.JoinsMasteryEngine.clearHoverKey()">
                      <span class="row-cell-key">#${r.emp_id || r.proj_id}</span>
                      <span class="row-cell-name">${r.name || r.proj_name}</span>
                      <span class="row-cell-dept">${r.dept_id !== undefined ? (r.dept_id === null ? '<span class="null-pill">NULL</span>' : `dept ${r.dept_id}`) : (r.salary_num ? `$${(r.salary_num/1000)}k` : '')}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Center SVG Neon Laser Canvas -->
            <div class="tracer-arrow-canvas-col">
              <svg class="tracer-arrow-svg" viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="laserGlowEmerald" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="laserGlowAmber" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.5" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
                  </marker>
                  <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="#f59e0b" />
                  </marker>
                  <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="#ef4444" />
                  </marker>
                </defs>

                <!-- Render Dynamic Bezier Neon Laser Arrows -->
                ${parsed.arrowLinks.map((link, idx) => {
                  const y1 = 28 + (idx % 5) * 38;
                  const y2 = link.targetId ? (28 + ((idx * 2) % 4) * 42) : y1;
                  const isMatch = link.status === 'match';
                  const isNullPad = link.status === 'null_pad';
                  const isDropped = link.status === 'dropped';
                  const strokeColor = isMatch ? '#10b981' : (isNullPad ? '#f59e0b' : '#ef4444');
                  const marker = isMatch ? 'url(#arrowGreen)' : (isNullPad ? 'url(#arrowAmber)' : 'none');
                  const pathData = isDropped ? `M 10,${y1} C 45,${y1} 60,${y1} 75,${y1}` : `M 10,${y1} C 70,${y1} 90,${y2} 150,${y2}`;

                  const isLinkHovered = hover && ((link.sourceId && link.sourceId.includes(hover.id)) || (link.targetId && link.targetId.includes(hover.id)));
                  const isLinkStepped = state.replayStep === (idx + 1);

                  return `
                    <g class="laser-arrow-group ${isLinkHovered || isLinkStepped ? 'highlighted-laser' : ''}">
                      <!-- Background Laser Aura -->
                      <path d="${pathData}"
                            stroke="${strokeColor}"
                            stroke-width="${isLinkHovered || isLinkStepped ? '7' : '4'}"
                            opacity="${isLinkHovered || isLinkStepped ? '0.6' : '0.2'}"
                            fill="none"
                            filter="url(#${isMatch ? 'laserGlowEmerald' : 'laserGlowAmber'})" />

                      <!-- Core Laser Path -->
                      <path id="laser_path_${idx}"
                            d="${pathData}"
                            stroke="${strokeColor}"
                            stroke-width="${isLinkHovered || isLinkStepped ? '3.5' : (isMatch ? '2.5' : '1.5')}"
                            stroke-dasharray="${isNullPad ? '4,4' : (isDropped ? '2,2' : 'none')}"
                            fill="none"
                            marker-end="${marker}"
                            opacity="0.95" />

                      <!-- Animated Moving Laser Particle along matched paths -->
                      ${isMatch ? `
                        <circle r="3" fill="#6ee7b7" filter="url(#laserGlowEmerald)">
                          <animateMotion dur="${isLinkHovered ? '1.2s' : '2.4s'}" repeatCount="indefinite" path="${pathData}" />
                        </circle>
                      ` : ''}
                    </g>
                  `;
                }).join('')}
              </svg>
            </div>

            <!-- Right Source Table -->
            <div class="source-mini-table table-right">
              <div class="mini-table-header">${currentSchema.tableB.name}</div>
              <div class="mini-table-body">
                ${currentSchema.tableB.rows.map(r => {
                  const isHovered = hover && hover.side === 'right' && (r.dept_id || r.band_code) === hover.id;
                  return `
                    <div class="tracer-row row-right ${isHovered ? 'hover-highlight' : ''}"
                         id="row_right_${r.dept_id || r.emp_id || r.band_code}"
                         onmouseenter="window.JoinsMasteryEngine.setHoverKey('right', ${r.dept_id || r.band_code || r.emp_id})"
                         onmouseleave="window.JoinsMasteryEngine.clearHoverKey()">
                      <span class="row-cell-key">#${r.dept_id || r.emp_id || r.band_code}</span>
                      <span class="row-cell-name">${r.dept_name || r.name || r.band_name}</span>
                      <span class="row-cell-loc">${r.location || (r.max_sal ? `$${r.min_sal/1000}k-$${r.max_sal/1000}k` : '')}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Live Interactive Predicate Inspector Banner -->
          <div class="predicate-inspector-strip">
            <span class="predicate-text">${activePredicateMsg || '💡 Hover any row in Employees or Departments to inspect live key equality evaluation.'}</span>
          </div>
        </div>

        <!-- Right Column: Live Recalculated Output & 6-Layer Explainer Engine -->
        <div class="arena-right-card">
          <!-- Live Result Table & Diff Inspector Toggle -->
          <div class="live-result-box">
            <div class="result-header-row">
              <div class="result-tab-switch">
                <button class="btn-diff-toggle ${!state.diffView ? 'active' : ''}" onclick="window.JoinsMasteryEngine.toggleDiffView(false)">
                  📊 Generated Table (${parsed.outputRows.length} Rows)
                </button>
                <button class="btn-diff-toggle ${state.diffView ? 'active' : ''}" onclick="window.JoinsMasteryEngine.toggleDiffView(true)">
                  🔍 Goal Diff Inspector (${goalEval.isSuccess ? '✓ 100% Match' : '⚠ Mismatch'})
                </button>
              </div>
              <span class="res-count">${parsed.outputRows.length} Rows Emitted</span>
            </div>

            ${state.diffView ? this.renderDiffInspector(problem, parsed, goalEval) : this.renderResultTable(parsed)}
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

    // Render Standard Output Table
    renderResultTable: function (parsed) {
      return `
        <div class="result-scrollable-table">
          <table class="arena-data-table">
            <thead>
              <tr>
                <th>Status</th>
                ${parsed.outputRows.length > 0 ? Object.keys(parsed.outputRows[0]).filter(k => k !== 'status' && k !== 'emp_id').map(c => `<th>${c}</th>`).join('') : '<th>Result</th>'}
              </tr>
            </thead>
            <tbody>
              ${parsed.outputRows.length > 0 ? parsed.outputRows.map((row, rIdx) => {
                const isSteppedRow = state.replayStep > 0 && (rIdx + 1) === state.replayStep;
                return `
                  <tr class="arena-row status-${row.status} ${isSteppedRow ? 'row-stepped-active' : ''}">
                    <td><span class="arena-status-badge badge-${row.status}">${this.formatStatus(row.status)}</span></td>
                    ${Object.keys(row).filter(k => k !== 'status' && k !== 'emp_id').map(col => `
                      <td>${row[col] === null ? '<span class="null-pill">NULL</span>' : row[col]}</td>
                    `).join('')}
                  </tr>
                `;
              }).join('') : '<tr><td colspan="4" class="empty-state">No matching rows produced. Check your join keys.</td></tr>'}
            </tbody>
          </table>
        </div>
      `;
    },

    // Render Visual Output Diff Inspector
    renderDiffInspector: function (problem, parsed, goalEval) {
      return `
        <div class="diff-inspector-panel">
          <div class="diff-score-strip ${goalEval.isSuccess ? 'pass' : 'fail'}">
            <span class="diff-score-badge">${goalEval.isSuccess ? '✅ GOAL SATISFIED' : '⚠️ MISMATCH DETECTED'}</span>
            <span class="diff-score-detail">
              Expected ${goalEval.expectedRowCount} rows (${problem.expectedJoin.toUpperCase()}) | Actual: ${goalEval.actualRowCount} rows (${parsed.joinType.toUpperCase()})
            </span>
          </div>

          <div class="diff-table-wrapper">
            <table class="arena-data-table diff-table">
              <thead>
                <tr>
                  <th>Diff Status</th>
                  <th>Entity Name</th>
                  <th>Expected Join</th>
                  <th>Actual Outcome</th>
                </tr>
              </thead>
              <tbody>
                ${goalEval.matchedRows.map(r => `
                  <tr class="diff-row match">
                    <td><span class="diff-pill match">✓ MATCH</span></td>
                    <td><strong>${r.name || r.employee || r.proj_name}</strong></td>
                    <td>Included in ${problem.expectedJoin.toUpperCase()}</td>
                    <td>Emitted (${r.dept_name || 'Preserved'})</td>
                  </tr>
                `).join('')}

                ${goalEval.missingRows.map(r => `
                  <tr class="diff-row missing">
                    <td><span class="diff-pill missing">⚠️ MISSING</span></td>
                    <td><strong>${r.name || r.employee || r.proj_name}</strong></td>
                    <td>Required by Goal</td>
                    <td>Dropped by your query! (Check INNER vs LEFT JOIN)</td>
                  </tr>
                `).join('')}

                ${goalEval.extraRows.map(r => `
                  <tr class="diff-row extra">
                    <td><span class="diff-pill extra">✕ UNEXPECTED</span></td>
                    <td><strong>${r.name || r.employee || r.proj_name}</strong></td>
                    <td>Should be excluded</td>
                    <td>Included in your output table</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // --- EXPLAINER CONTENT DISPATCHER ---
    renderExplainerContent: function (problem, parsed) {
      if (state.activeExplainerTab === 'autopsy') {
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
        const steps = [
          'Step 1: Database engine initializes Hash Table on Departments (Build Phase: 4 hash buckets allocated in memory).',
          'Step 2: Probing Row #1 Alice (dept_id: 10) ➔ Hash match found in Engineering ➔ Row emitted to result buffer.',
          'Step 3: Probing Row #2 Bob (dept_id: 20) ➔ Hash match found in Marketing ➔ Row emitted to result buffer.',
          'Step 4: Probing Row #3 Charlie (dept_id: 10) ➔ Hash match found in Engineering ➔ Row emitted to result buffer.',
          'Step 5: Probing Row #4 Diana (dept_id: 30) ➔ Hash match found in Sales ➔ Row emitted to result buffer.',
          'Step 6: Probing Row #5 Evan (dept_id: NULL) ➔ No hash match. If LEFT JOIN, emit with NULLs; if INNER JOIN, discard.'
        ];

        return `
          <div class="explainer-stepper-box">
            <div class="stepper-controls-row">
              <div class="stepper-left-meta">
                <span class="stepper-step-indicator">Row Probe Execution: Step ${state.replayStep + 1} of 6</span>
              </div>
              <div class="stepper-btns">
                <button class="btn-step-action" onclick="window.JoinsMasteryEngine.prevStepReplay()">⏮ Prev</button>
                <button class="btn-step-action ${state.isAutoPlaying ? 'pause' : 'play'}" onclick="window.JoinsMasteryEngine.toggleAutoPlay()">
                  ${state.isAutoPlaying ? '⏸ Pause' : '▶ Auto-Play'}
                </button>
                <button class="btn-step-action" onclick="window.JoinsMasteryEngine.stepReplay()">Next ⏭</button>
                <button class="btn-step-action reset" onclick="window.JoinsMasteryEngine.resetReplay()">↺ Reset</button>
              </div>
            </div>

            <!-- Execution Slider Track -->
            <div class="stepper-scrubber-track">
              <input type="range" min="0" max="5" value="${state.replayStep}" class="stepper-slider-input"
                     oninput="window.JoinsMasteryEngine.stepScrub(Number(this.value))" />
            </div>

            <div class="stepper-active-desc">
              ${steps[state.replayStep]}
            </div>
          </div>
        `;
      } else if (state.activeExplainerTab === 'english') {
        return `
          <div class="explainer-english-box">
            <div class="english-title">Natural Language Translation:</div>
            <p class="english-body">
              "This query takes every employee record from the <strong>Employees</strong> table, looks up matching division records in <strong>Departments</strong> where the <code>dept_id</code> matches, and ${parsed.joinType === 'left' ? 'preserves any employee without a department by filling missing department fields with NULL.' : 'discards any employee who does not belong to a confirmed active department.'}"
            </p>
          </div>
        `;
      } else {
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
  window.VennMatrixEngine = JoinsMasteryEngine;
})();
