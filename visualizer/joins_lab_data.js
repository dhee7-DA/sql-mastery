// =============================================================================
// TRACK 04: RELATIONAL MULTI-TABLE JOINS LAB
// =============================================================================

window.JOINS_SCHEMA = {
  tableA: {
    name: 'Employees',
    columns: ['emp_id', 'name', 'dept_id', 'salary'],
    rows: [
      { emp_id: 1, name: 'Alice Chen', dept_id: 10, salary: 95000 },
      { emp_id: 2, name: 'Bob Smith', dept_id: 20, salary: 78000 },
      { emp_id: 3, name: 'Charlie Kim', dept_id: 10, salary: 110000 },
      { emp_id: 4, name: 'Diana Ross', dept_id: 30, salary: 82000 },
      { emp_id: 5, name: 'Evan Vance', dept_id: null, salary: 65000 } // Orphan employee (no department)
    ]
  },
  tableB: {
    name: 'Departments',
    columns: ['dept_id', 'dept_name', 'location'],
    rows: [
      { dept_id: 10, dept_name: 'Engineering', location: 'San Francisco' },
      { dept_id: 20, dept_name: 'Marketing', location: 'New York' },
      { dept_id: 30, dept_name: 'Sales', location: 'Austin' },
      { dept_id: 40, dept_name: 'Research', location: 'Boston' } // Orphan department (no employees)
    ]
  }
};

window.JOINS_STEPS = [
  // ---------------------------------------------------------------------------
  // STEP 01: INNER JOIN — The Exact Key Intersection
  // ---------------------------------------------------------------------------
  {
    stepIndex: 1,
    id: 'join_inner',
    keyword: 'INNER JOIN',
    title: 'Step 01: INNER JOIN (The Key Intersection)',
    pillClass: 'pill-from',
    conceptHeading: 'Connecting tables where keys match on BOTH sides',
    conceptText: 'An INNER JOIN creates a new combined row only when the join condition evaluates to TRUE on both sides. If an employee has no matching department (like Evan, whose dept_id is NULL), or a department has no employees (like Research, dept_id 40), they are completely excluded from the result set.',
    sqlCode: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nINNER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
    explanationPoints: [
      'ON e.dept_id = d.dept_id defines the relational bridge (Foreign Key $\\leftrightarrow$ Primary Key).',
      'Alice (10) & Charlie (10) match Engineering (SF).',
      'Bob (20) matches Marketing (NYC), and Diana (30) matches Sales (Austin).',
      'Evan (NULL) and Research (40) fail the ON predicate and are dropped.',
      'Output: Exactly 4 matched rows.'
    ],
    gotcha: 'NULL never equals NULL! If Table A has dept_id = NULL and Table B has dept_id = NULL, an INNER JOIN on dept_id will NOT match them, because in SQL 3-valued logic, NULL = NULL yields UNKNOWN.',
    actionPrompt: 'Interactive link trace: Match lines light up in Celadon Green; unmatched rows are dropped:',
    transform: () => [
      { emp_id: 1, name: 'Alice Chen', dept_name: 'Engineering', location: 'San Francisco', _status: 'passed', _label: 'MATCH (SF)' },
      { emp_id: 2, name: 'Bob Smith', dept_name: 'Marketing', location: 'New York', _status: 'passed', _label: 'MATCH (NYC)' },
      { emp_id: 3, name: 'Charlie Kim', dept_name: 'Engineering', location: 'San Francisco', _status: 'passed', _label: 'MATCH (SF)' },
      { emp_id: 4, name: 'Diana Ross', dept_name: 'Sales', location: 'Austin', _status: 'passed', _label: 'MATCH (ATX)' },
      { emp_id: 5, name: 'Evan Vance', dept_name: '---', location: '---', _status: 'rejected', _label: 'DROPPED (dept_id is NULL)' },
      { emp_id: '---', name: '---', dept_name: 'Research', location: 'Boston', _status: 'rejected', _label: 'DROPPED (0 employees)' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#0b0b0e" rx="6" stroke="#232328"/>
        
        <!-- Left Table A: Employees -->
        <g transform="translate(30, 15)">
          <rect width="210" height="150" rx="4" fill="#121216" stroke="#2f333d"/>
          <text x="105" y="20" fill="#a4b7cf" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">EMPLOYEES (LEFT)</text>
          <text x="15" y="45" fill="#d1d5db" font-family="monospace" font-size="9">1: Alice (dept 10)</text>
          <text x="15" y="65" fill="#d1d5db" font-family="monospace" font-size="9">2: Bob (dept 20)</text>
          <text x="15" y="85" fill="#d1d5db" font-family="monospace" font-size="9">3: Charlie (dept 10)</text>
          <text x="15" y="105" fill="#d1d5db" font-family="monospace" font-size="9">4: Diana (dept 30)</text>
          <text x="15" y="125" fill="#d69d8f" font-family="monospace" font-size="9">&cross; 5: Evan (dept NULL)</text>
        </g>

        <!-- Connecting Chords -->
        <g stroke-width="2">
          <!-- Alice to Engineering -->
          <path d="M 240 45 C 340 45, 440 45, 540 45" stroke="#9ec5ad" fill="none"/>
          <!-- Bob to Marketing -->
          <path d="M 240 65 C 340 65, 440 70, 540 70" stroke="#9ec5ad" fill="none"/>
          <!-- Charlie to Engineering -->
          <path d="M 240 85 C 340 85, 440 45, 540 45" stroke="#9ec5ad" fill="none"/>
          <!-- Diana to Sales -->
          <path d="M 240 105 C 340 105, 440 95, 540 95" stroke="#9ec5ad" fill="none"/>
          <!-- Evan dropped -->
          <path d="M 240 125 L 320 125" stroke="#d69d8f" stroke-dasharray="3,3" fill="none"/>
          <circle cx="325" cy="125" r="3" fill="#d69d8f"/>
        </g>

        <!-- Center Intersection Badge -->
        <g transform="translate(340, 65)">
          <rect width="100" height="40" rx="4" fill="rgba(158, 197, 173, 0.15)" stroke="#9ec5ad"/>
          <text x="50" y="24" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">INTERSECTION</text>
        </g>

        <!-- Right Table B: Departments -->
        <g transform="translate(540, 15)">
          <rect width="210" height="150" rx="4" fill="#121216" stroke="#2f333d"/>
          <text x="105" y="20" fill="#a4b7cf" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">DEPARTMENTS (RIGHT)</text>
          <text x="15" y="45" fill="#d1d5db" font-family="monospace" font-size="9">10: Engineering</text>
          <text x="15" y="70" fill="#d1d5db" font-family="monospace" font-size="9">20: Marketing</text>
          <text x="15" y="95" fill="#d1d5db" font-family="monospace" font-size="9">30: Sales</text>
          <text x="15" y="125" fill="#d69d8f" font-family="monospace" font-size="9">&cross; 40: Research (0 staff)</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 02: LEFT OUTER JOIN — Preserving the Driving Table
  // ---------------------------------------------------------------------------
  {
    stepIndex: 2,
    id: 'join_left',
    keyword: 'LEFT JOIN',
    title: 'Step 02: LEFT JOIN (Preserving Every Left Row)',
    pillClass: 'pill-where',
    conceptHeading: 'Keep 100% of rows from Table A, filling missing Table B data with NULL',
    conceptText: 'A LEFT JOIN guarantees that every single row from the left table (Employees) appears in the final result. If an employee matches a department, the department columns are populated. If NO match exists (like Evan with dept_id = NULL), the department columns are seamlessly padded with NULL.',
    sqlCode: `SELECT e.emp_id, e.name, e.salary,\n       COALESCE(d.dept_name, 'Unassigned') AS department,\n       COALESCE(d.location, 'Remote / Unassigned') AS location\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
    explanationPoints: [
      'Employees is the "driving table"—no employee can ever be lost or dropped.',
      'Alice, Bob, Charlie, Diana get full department details.',
      'Evan Vance is preserved in the output! His dept_name and location become NULL (or "Unassigned" via COALESCE).',
      'Research (dept_id 40) is NOT included, because it only exists on the right side.',
      'Output: Exactly 5 rows (matches left table count).'
    ],
    gotcha: 'Beware of WHERE clauses on the right table! If you write WHERE d.location = \'San Francisco\', any row where d.location is NULL will be discarded by WHERE, secretly converting your LEFT JOIN into an INNER JOIN!',
    actionPrompt: 'Notice Evan Vance is preserved with NULL department columns, highlighted in Warm Terracotta:',
    transform: () => [
      { emp_id: 1, name: 'Alice Chen', salary: '$95,000', department: 'Engineering', location: 'San Francisco', _status: 'passed', _label: 'FULL MATCH' },
      { emp_id: 2, name: 'Bob Smith', salary: '$78,000', department: 'Marketing', location: 'New York', _status: 'passed', _label: 'FULL MATCH' },
      { emp_id: 3, name: 'Charlie Kim', salary: '$110,000', department: 'Engineering', location: 'San Francisco', _status: 'passed', _label: 'FULL MATCH' },
      { emp_id: 4, name: 'Diana Ross', salary: '$82,000', department: 'Sales', location: 'Austin', _status: 'passed', _label: 'FULL MATCH' },
      { emp_id: 5, name: 'Evan Vance', salary: '$65,000', department: 'NULL (Unassigned)', location: 'NULL (Remote)', _status: 'loaded', _label: 'LEFT PRESERVED (NULL PADDED)' }
    ],
    svg: `
      <svg viewBox="0 0 780 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="160" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Venn Diagram: Left Circle Filled -->
        <g transform="translate(180, 20)">
          <!-- Left Circle (Filled) -->
          <circle cx="170" cy="60" r="55" fill="rgba(158, 197, 173, 0.25)" stroke="#9ec5ad" stroke-width="2"/>
          <!-- Right Circle (Stroke only) -->
          <circle cx="250" cy="60" r="55" fill="none" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4,4"/>
          <!-- Intersection highlighted -->
          <text x="130" y="65" fill="#9ec5ad" font-family="monospace" font-size="11" font-weight="700">100% LEFT</text>
          <text x="210" y="65" fill="#dfcaa9" font-family="monospace" font-size="10">MATCH</text>
          <text x="285" y="65" fill="#71717a" font-family="monospace" font-size="9">RIGHT</text>
        </g>
        <g transform="translate(500, 35)">
          <rect width="240" height="90" rx="5" fill="#121216" stroke="#3b4252"/>
          <text x="15" y="24" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700">LEFT JOIN GUARANTEE:</text>
          <text x="15" y="48" fill="#d1d5db" font-family="monospace" font-size="9">&check; Count of output rows &ge; Count of left table</text>
          <text x="15" y="68" fill="#dfcaa9" font-family="monospace" font-size="9">&check; Missing right values padded with NULL</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 03: RIGHT OUTER JOIN — Preserving the Target Table
  // ---------------------------------------------------------------------------
  {
    stepIndex: 3,
    id: 'join_right',
    keyword: 'RIGHT JOIN',
    title: 'Step 03: RIGHT JOIN (Preserving Every Right Row)',
    pillClass: 'pill-distinct',
    conceptHeading: 'Keep 100% of rows from Table B, filling missing Table A data with NULL',
    conceptText: 'A RIGHT JOIN inverts the priority: every department in the right table (Departments) is guaranteed to appear in the output. If a department has no staff assigned (like Research, dept_id 40), the employee columns (name, salary) are populated with NULL.',
    sqlCode: `SELECT d.dept_id, d.dept_name, d.location,\n       e.name AS employee_name, e.salary\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
    explanationPoints: [
      'Departments is now the driving table.',
      'Engineering appears TWICE (Alice & Charlie).',
      'Marketing appears once (Bob), and Sales appears once (Diana).',
      'Research (dept_id 40) is preserved! Its employee_name and salary are NULL.',
      'Evan Vance (unassigned employee) is NOT included.',
      'Industry Tip: In production SQL style guides (Google, GitLab, Stripe), RIGHT JOIN is discouraged in favor of swapping table order and using LEFT JOIN for readability.'
    ],
    gotcha: 'Almost every RIGHT JOIN can be rewritten as a LEFT JOIN simply by placing the second table first: FROM Departments AS d LEFT JOIN Employees AS e.',
    actionPrompt: 'Notice Research department is preserved with NULL employee columns:',
    transform: () => [
      { dept_id: 10, dept_name: 'Engineering', location: 'San Francisco', employee_name: 'Alice Chen', salary: '$95,000', _status: 'passed', _label: 'MATCH' },
      { dept_id: 10, dept_name: 'Engineering', location: 'San Francisco', employee_name: 'Charlie Kim', salary: '$110,000', _status: 'passed', _label: 'MATCH' },
      { dept_id: 20, dept_name: 'Marketing', location: 'New York', employee_name: 'Bob Smith', salary: '$78,000', _status: 'passed', _label: 'MATCH' },
      { dept_id: 30, dept_name: 'Sales', location: 'Austin', employee_name: 'Diana Ross', salary: '$82,000', _status: 'passed', _label: 'MATCH' },
      { dept_id: 40, dept_name: 'Research', location: 'Boston', employee_name: 'NULL (Vacant)', salary: 'NULL', _status: 'loaded', _label: 'RIGHT PRESERVED (VACANT DEPT)' }
    ],
    svg: `
      <svg viewBox="0 0 780 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="160" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Venn Diagram: Right Circle Filled -->
        <g transform="translate(180, 20)">
          <circle cx="170" cy="60" r="55" fill="none" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4,4"/>
          <circle cx="250" cy="60" r="55" fill="rgba(164, 183, 207, 0.25)" stroke="#a4b7cf" stroke-width="2"/>
          <text x="135" y="65" fill="#71717a" font-family="monospace" font-size="9">LEFT</text>
          <text x="210" y="65" fill="#dfcaa9" font-family="monospace" font-size="10">MATCH</text>
          <text x="265" y="65" fill="#a4b7cf" font-family="monospace" font-size="11" font-weight="700">100% RIGHT</text>
        </g>
        <g transform="translate(500, 35)">
          <rect width="240" height="90" rx="5" fill="#121216" stroke="#3b4252"/>
          <text x="15" y="24" fill="#a4b7cf" font-family="monospace" font-size="10" font-weight="700">RIGHT JOIN GUARANTEE:</text>
          <text x="15" y="48" fill="#d1d5db" font-family="monospace" font-size="9">&check; Count of output rows &ge; Count of right table</text>
          <text x="15" y="68" fill="#dfcaa9" font-family="monospace" font-size="9">&check; Vacant departments preserved with NULL staff</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 04: FULL OUTER JOIN — Symmetric Retention
  // ---------------------------------------------------------------------------
  {
    stepIndex: 4,
    id: 'join_full',
    keyword: 'FULL JOIN',
    title: 'Step 04: FULL OUTER JOIN (Symmetric Retention)',
    pillClass: 'pill-case',
    conceptHeading: 'Preserve 100% of records from BOTH tables simultaneously',
    conceptText: 'A FULL OUTER JOIN merges Table A and Table B completely. Matched rows combine as normal. Unmatched employees (Evan) are preserved with NULL department columns, AND unmatched departments (Research) are preserved with NULL employee columns. Nothing is ever discarded.',
    sqlCode: `SELECT e.emp_id, e.name, e.salary,\n       d.dept_id, d.dept_name, d.location\nFROM Employees AS e\nFULL OUTER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
    explanationPoints: [
      'The symmetric union of a LEFT JOIN and a RIGHT JOIN.',
      '4 matched rows (Alice, Bob, Charlie, Diana) with full details.',
      '1 unmatched left row (Evan Vance) with NULL department data.',
      '1 unmatched right row (Research) with NULL employee data.',
      'Output: Exactly 6 rows total. Complete system audit visibility.'
    ],
    gotcha: 'MySQL does NOT natively support FULL OUTER JOIN! In MySQL, developers simulate it by combining a LEFT JOIN and a RIGHT JOIN using the UNION operator.',
    actionPrompt: 'Complete symmetric audit: Both orphaned employees and vacant departments are visible:',
    transform: () => [
      { emp_id: 1, name: 'Alice Chen', salary: '$95,000', dept_name: 'Engineering', location: 'San Francisco', _status: 'passed', _label: 'MATCHED' },
      { emp_id: 2, name: 'Bob Smith', salary: '$78,000', dept_name: 'Marketing', location: 'New York', _status: 'passed', _label: 'MATCHED' },
      { emp_id: 3, name: 'Charlie Kim', salary: '$110,000', dept_name: 'Engineering', location: 'San Francisco', _status: 'passed', _label: 'MATCHED' },
      { emp_id: 4, name: 'Diana Ross', salary: '$82,000', dept_name: 'Sales', location: 'Austin', _status: 'passed', _label: 'MATCHED' },
      { emp_id: 5, name: 'Evan Vance', salary: '$65,000', dept_name: 'NULL', location: 'NULL', _status: 'loaded', _label: 'LEFT ORPHAN (NO DEPT)' },
      { emp_id: 'NULL', name: 'NULL', salary: 'NULL', dept_name: 'Research', location: 'Boston', _status: 'loaded', _label: 'RIGHT ORPHAN (NO STAFF)' }
    ],
    svg: `
      <svg viewBox="0 0 780 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="160" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Venn Diagram: Both Circles Filled -->
        <g transform="translate(180, 20)">
          <circle cx="170" cy="60" r="55" fill="rgba(158, 197, 173, 0.2)" stroke="#9ec5ad" stroke-width="2"/>
          <circle cx="250" cy="60" r="55" fill="rgba(164, 183, 207, 0.2)" stroke="#a4b7cf" stroke-width="2"/>
          <text x="135" y="65" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700">LEFT</text>
          <text x="210" y="65" fill="#dfcaa9" font-family="monospace" font-size="10" font-weight="700">MATCH</text>
          <text x="270" y="65" fill="#a4b7cf" font-family="monospace" font-size="10" font-weight="700">RIGHT</text>
        </g>
        <g transform="translate(500, 35)">
          <rect width="240" height="90" rx="5" fill="#121216" stroke="#3b4252"/>
          <text x="15" y="24" fill="#dfcaa9" font-family="monospace" font-size="10" font-weight="700">FULL OUTER JOIN AUDIT:</text>
          <text x="15" y="48" fill="#d1d5db" font-family="monospace" font-size="9">&check; Maximum coverage of both datasets</text>
          <text x="15" y="68" fill="#9ec5ad" font-family="monospace" font-size="9">&check; Identifies orphans on BOTH sides at once</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 05: ANTI-JOIN — The Data Quality & Orphan Finder
  // ---------------------------------------------------------------------------
  {
    stepIndex: 5,
    id: 'join_anti',
    keyword: 'ANTI-JOIN',
    title: 'Step 05: ANTI-JOIN (Detecting Orphaned Records)',
    pillClass: 'pill-order',
    conceptHeading: 'Extracting rows from Table A that have NO MATCH in Table B',
    conceptText: 'An Anti-Join is an indispensable data engineering and audit pattern: "Find all customers who never placed an order," or "Find all employees with no assigned department." You achieve this in SQL using a LEFT JOIN followed by a WHERE right_table.id IS NULL check.',
    sqlCode: `SELECT e.emp_id, e.name, e.salary, e.dept_id\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
    explanationPoints: [
      'The LEFT JOIN attaches department columns or NULLs.',
      'WHERE d.dept_id IS NULL acts as an exclusive filter gate: it discards all rows that DID match!',
      'Only the true orphan records survive.',
      'Output: Exactly 1 row—Evan Vance (emp_id 5, dept_id NULL).'
    ],
    gotcha: 'Always filter on a PRIMARY KEY or NOT NULL column from the right table (e.g. WHERE d.dept_id IS NULL). If you filter on a nullable right column that naturally holds NULLs, you might get false positives!',
    actionPrompt: 'Anti-Join filter in action: All matched employees are discarded; only the unassigned orphan survives:',
    transform: () => [
      { emp_id: 5, name: 'Evan Vance', salary: '$65,000', dept_id: 'NULL', audit_status: 'ORPHAN: UNASSIGNED TO ANY DEPT', _status: 'passed', _label: 'ANTI-JOIN MATCH' },
      { emp_id: 1, name: 'Alice Chen', salary: '$95,000', dept_id: 10, audit_status: 'Discarded (Has department)', _status: 'rejected', _label: 'DROPPED BY WHERE' },
      { emp_id: 2, name: 'Bob Smith', salary: '$78,000', dept_id: 20, audit_status: 'Discarded (Has department)', _status: 'rejected', _label: 'DROPPED BY WHERE' },
      { emp_id: 3, name: 'Charlie Kim', salary: '$110,000', dept_id: 10, audit_status: 'Discarded (Has department)', _status: 'rejected', _label: 'DROPPED BY WHERE' },
      { emp_id: 4, name: 'Diana Ross', salary: '$82,000', dept_id: 30, audit_status: 'Discarded (Has department)', _status: 'rejected', _label: 'DROPPED BY WHERE' }
    ],
    svg: `
      <svg viewBox="0 0 780 150" width="100%" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="150" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Venn Diagram: Left Crescent only -->
        <g transform="translate(180, 15)">
          <path d="M 170 10 A 55 55 0 0 0 170 120 A 55 55 0 0 1 200 65 A 55 55 0 0 1 170 10" fill="rgba(214, 157, 143, 0.4)" stroke="#d69d8f" stroke-width="2"/>
          <circle cx="170" cy="65" r="55" fill="none" stroke="#71717a" stroke-dasharray="3,3"/>
          <circle cx="250" cy="65" r="55" fill="none" stroke="#71717a" stroke-dasharray="3,3"/>
          <text x="140" y="70" fill="#d69d8f" font-family="monospace" font-size="10" font-weight="700">LEFT ONLY</text>
        </g>
        <g transform="translate(480, 25)">
          <rect width="260" height="95" rx="5" fill="#121216" stroke="#d69d8f"/>
          <text x="15" y="24" fill="#d69d8f" font-family="monospace" font-size="10.5" font-weight="700">ANTI-JOIN PATTERN:</text>
          <text x="15" y="48" fill="#d1d5db" font-family="monospace" font-size="9">1. LEFT JOIN target_table</text>
          <text x="15" y="68" fill="#dfcaa9" font-family="monospace" font-size="9">2. WHERE target_table.id IS NULL</text>
          <text x="15" y="88" fill="#71717a" font-family="monospace" font-size="8.5">&rarr; Isolates disconnected orphan data</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 06: CROSS JOIN & The Cartesian Danger Zone
  // ---------------------------------------------------------------------------
  {
    stepIndex: 6,
    id: 'join_cross',
    keyword: 'CROSS JOIN',
    title: 'Step 06: CROSS JOIN (The Cartesian Danger Zone)',
    pillClass: 'pill-limit',
    conceptHeading: 'Every row of Table A paired with EVERY row of Table B (M × N combinations)',
    conceptText: 'A CROSS JOIN produces the Cartesian product of two tables. There is NO ON condition. If Table A has 5 rows and Table B has 4 rows, the output contains exactly 5 × 4 = 20 rows. In deliberate data science work, CROSS JOIN is used to generate complete calendar grids or matrix pairings; in production, an accidental CROSS JOIN on large tables can crash the server.',
    sqlCode: `SELECT e.name, d.dept_name\nFROM Employees AS e\nCROSS JOIN Departments AS d\nORDER BY e.name ASC, d.dept_name ASC;`,
    explanationPoints: [
      'No ON clause is specified.',
      'Alice Chen is paired with Engineering, Marketing, Sales, and Research.',
      'Bob Smith is paired with Engineering, Marketing, Sales, and Research.',
      'Mathematical multiplication: 5 employees $\\times$ 4 departments = 20 total rows.',
      'Production Warning: A CROSS JOIN of two tables with 100,000 rows each creates 10 BILLION rows and will exhaust server disk and memory.'
    ],
    gotcha: 'Omitting the ON clause or writing FROM TableA, TableB without a WHERE clause triggers an implicit CROSS JOIN! Always use explicit ANSI JOIN syntax (INNER JOIN ... ON) to prevent disastrous Cartesian accidents.',
    actionPrompt: 'Cartesian grid sample showing Alice and Bob paired with all 4 departments (8 of 20 combinations shown):',
    transform: () => [
      { employee: 'Alice Chen', department: 'Engineering', pair_type: 'Cartesian (1 of 4)', _status: 'passed', _label: 'PAIR 1/20' },
      { employee: 'Alice Chen', department: 'Marketing', pair_type: 'Cartesian (2 of 4)', _status: 'passed', _label: 'PAIR 2/20' },
      { employee: 'Alice Chen', department: 'Sales', pair_type: 'Cartesian (3 of 4)', _status: 'passed', _label: 'PAIR 3/20' },
      { employee: 'Alice Chen', department: 'Research', pair_type: 'Cartesian (4 of 4)', _status: 'passed', _label: 'PAIR 4/20' },
      { employee: 'Bob Smith', department: 'Engineering', pair_type: 'Cartesian (1 of 4)', _status: 'passed', _label: 'PAIR 5/20' },
      { employee: 'Bob Smith', department: 'Marketing', pair_type: 'Cartesian (2 of 4)', _status: 'passed', _label: 'PAIR 6/20' },
      { employee: 'Bob Smith', department: 'Sales', pair_type: 'Cartesian (3 of 4)', _status: 'passed', _label: 'PAIR 7/20' },
      { employee: 'Bob Smith', department: 'Research', pair_type: 'Cartesian (4 of 4)', _status: 'passed', _label: 'PAIR 8/20' }
    ],
    svg: `
      <svg viewBox="0 0 780 150" width="100%" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="150" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Matrix Multiplication Graphic -->
        <g transform="translate(40, 25)">
          <rect width="160" height="95" rx="4" fill="#121216" stroke="#2f333d"/>
          <text x="80" y="24" fill="#a4b7cf" font-family="monospace" font-size="10.5" font-weight="700" text-anchor="middle">TABLE A (5 ROWS)</text>
          <text x="15" y="55" fill="#71717a" font-family="monospace" font-size="9">5 Staff Members</text>
        </g>
        <text x="225" y="80" fill="#dfcaa9" font-family="monospace" font-size="20" font-weight="700">&times;</text>
        <g transform="translate(250, 25)">
          <rect width="160" height="95" rx="4" fill="#121216" stroke="#2f333d"/>
          <text x="80" y="24" fill="#a4b7cf" font-family="monospace" font-size="10.5" font-weight="700" text-anchor="middle">TABLE B (4 ROWS)</text>
          <text x="15" y="55" fill="#71717a" font-family="monospace" font-size="9">4 Departments</text>
        </g>
        <text x="435" y="80" fill="#9ec5ad" font-family="monospace" font-size="20" font-weight="700">=</text>
        <g transform="translate(465, 20)">
          <rect width="270" height="105" rx="5" fill="rgba(209, 184, 150, 0.1)" stroke="#dfcaa9" stroke-width="1.5"/>
          <text x="135" y="26" fill="#dfcaa9" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">20 COMBINATIONS</text>
          <text x="20" y="55" fill="#d1d5db" font-family="monospace" font-size="9.5">M &times; N Cartesian Product</text>
          <text x="20" y="78" fill="#d69d8f" font-family="monospace" font-size="8.5">&cross; Danger: 100k &times; 100k = 10 Billion rows!</text>
        </g>
      </svg>
    `
  }
];
