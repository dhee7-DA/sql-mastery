// =============================================================================
// GUIDED SQL LAB: STEP-BY-STEP FOUNDATIONS WITH A SINGLE CONSISTENT SCHEMA
// =============================================================================

window.GUIDED_SCHEMA = {
  tableName: 'Employees',
  columns: ['emp_id', 'name', 'department', 'salary', 'hire_year'],
  types: { emp_id: 'INT', name: 'VARCHAR', department: 'VARCHAR', salary: 'INT', hire_year: 'INT' },
  rows: [
    { emp_id: 101, name: 'Alice Smith', department: 'Engineering', salary: 95000, hire_year: 2021 },
    { emp_id: 102, name: 'Bob Jones', department: 'Marketing', salary: 62000, hire_year: 2023 },
    { emp_id: 103, name: 'Charlie Brown', department: 'Engineering', salary: 82000, hire_year: 2020 },
    { emp_id: 104, name: 'Diana Prince', department: 'Sales', salary: 74000, hire_year: 2022 },
    { emp_id: 105, name: 'Evan Wright', department: 'Engineering', salary: 95000, hire_year: 2021 },
    { emp_id: 106, name: 'Fiona Gallagher', department: 'Sales', salary: 58000, hire_year: 2024 },
    { emp_id: 107, name: 'George Clark', department: 'Marketing', salary: 68000, hire_year: 2019 },
    { emp_id: 108, name: 'Hannah Abbott', department: 'Finance', salary: 89000, hire_year: 2020 }
  ]
};

window.GUIDED_STEPS = [
  // ---------------------------------------------------------------------------
  // STEP 01: FROM
  // ---------------------------------------------------------------------------
  {
    stepIndex: 1,
    id: 'from',
    keyword: 'FROM',
    title: 'Step 01: The FROM Clause (Memory Allocation)',
    pillClass: 'pill-from',
    conceptHeading: 'Where does data come from?',
    conceptText: 'When a database engine receives a SQL query, it NEVER looks at columns first. It begins at FROM. The engine reads the raw table from disk storage and allocates a virtual working table in memory. All subsequent operations (filtering, sorting, calculating) take place inside this memory buffer.',
    sqlCode: `SELECT *\nFROM Employees;`,
    explanationPoints: [
      'Executes as Step 01 in the physical query lifecycle.',
      'Binds table metadata (column names, types, constraints) into memory.',
      'If you define a table alias here (e.g. FROM Employees AS e), it becomes valid everywhere in the query.'
    ],
    gotcha: 'You cannot use column aliases created in SELECT inside the FROM clause because SELECT has not happened yet.',
    actionPrompt: 'Below is the full Employees dataset loaded from disk into engine working memory (8 records):',
    transform: (rows) => rows.map(r => ({ ...r, _status: 'loaded', _label: 'IN MEMORY' })),
    svg: `
      <svg viewBox="0 0 700 130" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="130" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Disk storage -->
        <g transform="translate(40, 30)">
          <rect width="130" height="70" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="65" y="32" fill="#a4b7cf" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">PHYSICAL DISK</text>
          <text x="65" y="50" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Employees.ibd</text>
          <text x="65" y="62" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">Stored on NVMe / SSD</text>
        </g>

        <!-- Data flow arrow -->
        <path d="M 180 65 L 260 65" stroke="#8da2be" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="220" y="55" fill="#8da2be" font-family="monospace" font-size="9" text-anchor="middle">I/O READ</text>

        <!-- Engine Memory Buffer -->
        <g transform="translate(270, 20)">
          <rect width="210" height="90" rx="4" fill="rgba(141, 162, 190, 0.12)" stroke="#8da2be"/>
          <text x="105" y="30" fill="#8da2be" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">FROM Employees</text>
          <text x="105" y="50" fill="#d1d5db" font-family="monospace" font-size="10" text-anchor="middle">Working Set Allocated in RAM</text>
          <text x="105" y="68" fill="#9ec5ad" font-family="monospace" font-size="9" text-anchor="middle">&check; 8 rows &times; 5 columns loaded</text>
        </g>

        <!-- Pipeline to next -->
        <path d="M 490 65 L 560 65" stroke="#8da2be" stroke-width="2"/>
        <text x="525" y="55" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">PASS</text>

        <g transform="translate(570, 35)">
          <rect width="90" height="60" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="45" y="32" fill="#71717a" font-family="monospace" font-size="10" font-weight="600" text-anchor="middle">TO WHERE</text>
          <text x="45" y="48" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">Filter Gate</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 02: WHERE
  // ---------------------------------------------------------------------------
  {
    stepIndex: 2,
    id: 'where',
    keyword: 'WHERE',
    title: 'Step 02: The WHERE Clause (Row Filtering)',
    pillClass: 'pill-where',
    conceptHeading: 'Filtering rows before anything else',
    conceptText: 'Now that the 8 employees are in memory, the engine tests each row against your WHERE predicate. Rows that evaluate to TRUE pass through. Rows that evaluate to FALSE or NULL are discarded immediately. This eliminates unnecessary data early, saving processing power.',
    sqlCode: `SELECT *\nFROM Employees\nWHERE salary >= 74000 AND department = 'Engineering';`,
    explanationPoints: [
      'Executes as Step 02, immediately following FROM.',
      'Uses Three-Valued Logic: TRUE, FALSE, and UNKNOWN (NULL). Only TRUE rows pass.',
      'Cannot use column aliases created in SELECT (e.g. WHERE bonus > 5000 is ILLEGAL).',
      'Cannot use aggregate functions like COUNT() or AVG() here (aggregations belong in HAVING).'
    ],
    gotcha: 'NULL values in WHERE: Any comparison with NULL (e.g. salary = NULL or salary != NULL) yields UNKNOWN, so the row is rejected! Always use IS NULL or IS NOT NULL.',
    actionPrompt: 'Testing condition: salary >= 74000 AND department = \'Engineering\' (3 rows pass, 5 rows rejected):',
    transform: (rows) => rows.map(r => {
      const passes = (r.salary >= 74000 && r.department === 'Engineering');
      let reason = '';
      if (r.department !== 'Engineering') reason = `Dept is ${r.department} (not Eng)`;
      else if (r.salary < 74000) reason = `Salary $${r.salary} < $74k`;
      else reason = `Salary $${r.salary} &ge; $74k in Eng`;

      return {
        ...r,
        _passed: passes,
        _status: passes ? 'passed' : 'rejected',
        _label: passes ? 'PASS (TRUE)' : 'DROP (FALSE)',
        _reason: reason
      };
    }),
    svg: `
      <svg viewBox="0 0 700 130" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="130" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- 8 incoming rows -->
        <g transform="translate(30, 30)">
          <rect width="110" height="70" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="55" y="32" fill="#d1d5db" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">8 ROWS</text>
          <text x="55" y="48" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">From FROM clause</text>
          <text x="55" y="62" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">All employees</text>
        </g>

        <path d="M 150 65 L 220 65" stroke="#c98877" stroke-width="2"/>

        <!-- WHERE Predicate Gate -->
        <g transform="translate(230, 20)">
          <rect width="240" height="90" rx="4" fill="rgba(201, 136, 119, 0.12)" stroke="#c98877"/>
          <text x="120" y="30" fill="#d69d8f" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">WHERE Predicate Evaluator</text>
          <text x="120" y="48" fill="#dfcaa9" font-family="monospace" font-size="9.5" text-anchor="middle">salary &ge; 74k AND dept = 'Engineering'</text>
          <text x="120" y="66" fill="#9ec5ad" font-family="monospace" font-size="9" text-anchor="middle">&bull; TRUE &rarr; Keep (Alice, Charlie, Evan)</text>
          <text x="120" y="80" fill="#c98877" font-family="monospace" font-size="9" text-anchor="middle">&bull; FALSE / NULL &rarr; Drop (5 records)</text>
        </g>

        <!-- Passing rows -->
        <path d="M 480 50 L 560 50" stroke="#9ec5ad" stroke-width="2"/>
        <text x="520" y="42" fill="#9ec5ad" font-family="monospace" font-size="8.5" text-anchor="middle">3 KEPT</text>
        <g transform="translate(570, 25)">
          <rect width="100" height="40" rx="4" fill="rgba(139, 179, 156, 0.12)" stroke="#9ec5ad"/>
          <text x="50" y="24" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">3 PASSED</text>
        </g>

        <!-- Dropped rows -->
        <path d="M 480 85 L 560 85" stroke="#c98877" stroke-width="2" stroke-dasharray="3,3"/>
        <text x="520" y="98" fill="#c98877" font-family="monospace" font-size="8.5" text-anchor="middle">5 DROPPED</text>
        <g transform="translate(570, 75)">
          <rect width="100" height="35" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="50" y="22" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">5 Discarded</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 03: SELECT
  // ---------------------------------------------------------------------------
  {
    stepIndex: 3,
    id: 'select',
    keyword: 'SELECT',
    title: 'Step 03: The SELECT Clause (Column Projection & Math)',
    pillClass: 'pill-select',
    conceptHeading: 'Projecting specific columns and computing expressions',
    conceptText: 'SELECT does NOT filter rows—it shapes columns horizontally! Now that WHERE has filtered the rows, SELECT extracts only the columns you asked for and computes any expressions (like calculating a 10% annual bonus with AS annual_bonus).',
    sqlCode: `SELECT name,\n       salary,\n       (salary * 0.10) AS annual_bonus\nFROM Employees\nWHERE salary >= 74000 AND department = 'Engineering';`,
    explanationPoints: [
      'Executes as Step 03, AFTER FROM and WHERE.',
      'This is the exact moment column aliases (AS annual_bonus) are calculated and named.',
      'Unselected columns (emp_id, hire_year, department) are dropped from the result buffer to save memory.'
    ],
    gotcha: 'Avoid writing "SELECT *" in production! Requesting unnecessary columns wastes network bandwidth and prevents database engines from using covering index scans.',
    actionPrompt: 'Projecting [name, salary] and computing [(salary * 0.10) AS annual_bonus]:',
    transform: (rows) => rows
      .filter(r => r.salary >= 74000 && r.department === 'Engineering')
      .map(r => ({
        name: r.name,
        salary: r.salary,
        annual_bonus: Math.round(r.salary * 0.10),
        _status: 'projected',
        _label: 'PROJECTED'
      })),
    svg: `
      <svg viewBox="0 0 700 130" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="130" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- All columns -->
        <g transform="translate(30, 25)">
          <rect width="130" height="80" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="65" y="24" fill="#a1a1aa" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">5 Full Columns</text>
          <text x="65" y="42" fill="#52525b" font-family="monospace" font-size="8.5" text-anchor="middle">emp_id (dropped)</text>
          <text x="65" y="56" fill="#9ec5ad" font-family="monospace" font-size="8.5" font-weight="600" text-anchor="middle">name (kept)</text>
          <text x="65" y="70" fill="#9ec5ad" font-family="monospace" font-size="8.5" font-weight="600" text-anchor="middle">salary (kept)</text>
          <text x="65" y="84" fill="#52525b" font-family="monospace" font-size="8.5" text-anchor="middle">dept, hire_year (dropped)</text>
        </g>

        <path d="M 170 65 L 230 65" stroke="#9ec5ad" stroke-width="2"/>

        <!-- SELECT Engine -->
        <g transform="translate(240, 20)">
          <rect width="230" height="90" rx="4" fill="rgba(139, 179, 156, 0.12)" stroke="#9ec5ad"/>
          <text x="115" y="30" fill="#9ec5ad" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">SELECT Projection</text>
          <text x="115" y="48" fill="#d1d5db" font-family="monospace" font-size="10" text-anchor="middle">Extracts: name, salary</text>
          <text x="115" y="66" fill="#dfcaa9" font-family="monospace" font-size="9.5" text-anchor="middle">Computes: salary * 0.10</text>
          <text x="115" y="82" fill="#dfcaa9" font-family="monospace" font-size="9.5" text-anchor="middle">Assigns: AS annual_bonus</text>
        </g>

        <path d="M 480 65 L 550 65" stroke="#9ec5ad" stroke-width="2"/>

        <!-- Projected Shape -->
        <g transform="translate(560, 25)">
          <rect width="110" height="80" rx="4" fill="#141418" stroke="#9ec5ad"/>
          <text x="55" y="26" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">Final Shape</text>
          <text x="55" y="44" fill="#d1d5db" font-family="monospace" font-size="9" text-anchor="middle">name</text>
          <text x="55" y="58" fill="#d1d5db" font-family="monospace" font-size="9" text-anchor="middle">salary</text>
          <text x="55" y="74" fill="#dfcaa9" font-family="monospace" font-size="9" font-weight="600" text-anchor="middle">annual_bonus</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 04: DISTINCT
  // ---------------------------------------------------------------------------
  {
    stepIndex: 4,
    id: 'distinct',
    keyword: 'DISTINCT',
    title: 'Step 04: The DISTINCT Clause (Deduplication)',
    pillClass: 'pill-select',
    conceptHeading: 'Collapsing duplicate tuples across the projected output',
    conceptText: 'If your query requests DISTINCT, the engine sorts or hashes the rows produced by SELECT. Any row that matches an earlier row across ALL projected columns is eliminated.',
    sqlCode: `SELECT DISTINCT department\nFROM Employees;`,
    explanationPoints: [
      'Executes as Step 04, right after SELECT.',
      'Evaluates the entire combination of selected columns.',
      'Our table has 8 employees across 4 departments (Engineering, Marketing, Sales, Finance). DISTINCT collapses 8 rows down to 4 unique departments!'
    ],
    gotcha: 'If you include a primary key (like emp_id) in your SELECT, DISTINCT will have NO effect because every row is already guaranteed to have a unique emp_id!',
    actionPrompt: 'Running SELECT DISTINCT department: 8 rows collapse into 4 unique departments:',
    transform: (rows) => {
      const seen = new Set();
      const uniqueDepts = [];
      rows.forEach(r => {
        if (!seen.has(r.department)) {
          seen.add(r.department);
          uniqueDepts.push({ department: r.department, _status: 'unique', _label: 'UNIQUE' });
        }
      });
      return uniqueDepts;
    },
    svg: `
      <svg viewBox="0 0 700 130" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="130" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- 8 Dept rows with duplicates -->
        <g transform="translate(30, 20)">
          <rect width="140" height="90" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="70" y="22" fill="#a1a1aa" font-family="monospace" font-size="9.5" text-anchor="middle">8 Projected Rows:</text>
          <text x="70" y="38" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Engineering (1)</text>
          <text x="70" y="50" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Engineering (2) [dup]</text>
          <text x="70" y="62" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Engineering (3) [dup]</text>
          <text x="70" y="74" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Marketing, Sales...</text>
        </g>

        <path d="M 180 65 L 250 65" stroke="#9ec5ad" stroke-width="2"/>

        <!-- DISTINCT Hash table -->
        <g transform="translate(260, 20)">
          <rect width="210" height="90" rx="4" fill="rgba(139, 179, 156, 0.12)" stroke="#9ec5ad"/>
          <text x="105" y="30" fill="#9ec5ad" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">DISTINCT Hash Map</text>
          <text x="105" y="50" fill="#d1d5db" font-family="monospace" font-size="9.5" text-anchor="middle">Checks tuple uniqueness</text>
          <text x="105" y="66" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Discards matching duplicates</text>
          <text x="105" y="80" fill="#9ec5ad" font-family="monospace" font-size="9" text-anchor="middle">8 rows &rarr; 4 unique departments</text>
        </g>

        <path d="M 480 65 L 550 65" stroke="#9ec5ad" stroke-width="2"/>

        <!-- 4 Unique outputs -->
        <g transform="translate(560, 20)">
          <rect width="110" height="90" rx="4" fill="#141418" stroke="#9ec5ad"/>
          <text x="55" y="24" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">4 Unique Rows</text>
          <text x="55" y="42" fill="#dfcaa9" font-family="monospace" font-size="8.5" text-anchor="middle">Engineering</text>
          <text x="55" y="56" fill="#dfcaa9" font-family="monospace" font-size="8.5" text-anchor="middle">Marketing</text>
          <text x="55" y="70" fill="#dfcaa9" font-family="monospace" font-size="8.5" text-anchor="middle">Sales</text>
          <text x="55" y="84" fill="#dfcaa9" font-family="monospace" font-size="8.5" text-anchor="middle">Finance</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 05: ORDER BY
  // ---------------------------------------------------------------------------
  {
    stepIndex: 5,
    id: 'order_by',
    keyword: 'ORDER BY',
    title: 'Step 05: The ORDER BY Clause (Sorting & Tie-Breakers)',
    pillClass: 'pill-order',
    conceptHeading: 'Physical reordering and tie-breaker resolution',
    conceptText: 'Relational tables are unordered mathematical sets. Without ORDER BY, the order of rows returned is completely arbitrary. ORDER BY runs an engine sorting algorithm (like QuickSort). Because it executes AFTER SELECT, you can legally reference column aliases here!',
    sqlCode: `SELECT name,\n       salary,\n       department\nFROM Employees\nWHERE salary >= 70000\nORDER BY salary DESC, name ASC;`,
    explanationPoints: [
      'Executes as Step 05, well after SELECT.',
      'Primary Sort: salary DESC (highest salary first).',
      'Tie-Breaker: Notice Alice Smith ($95,000) and Evan Wright ($95,000) have the EXACT same salary. The secondary clause "name ASC" sorts Alice before Evan alphabetically!'
    ],
    gotcha: 'Sorting strings is alphabetical: "100" comes before "20"! Ensure numeric columns are stored as INT, not VARCHAR.',
    actionPrompt: 'Sorted by salary DESC with name ASC as secondary tie-breaker:',
    transform: (rows) => {
      const filtered = rows.filter(r => r.salary >= 70000);
      filtered.sort((a, b) => {
        if (b.salary !== a.salary) return b.salary - a.salary; // DESC
        return a.name.localeCompare(b.name); // ASC tie-breaker
      });
      return filtered.map((r, i) => ({
        rank: `#${i + 1}`,
        name: r.name,
        salary: `$${r.salary.toLocaleString()}`,
        department: r.department,
        _status: 'sorted',
        _label: `SORTED (#${i + 1})`
      }));
    },
    svg: `
      <svg viewBox="0 0 700 130" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="130" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- Unsorted input -->
        <g transform="translate(30, 25)">
          <rect width="130" height="80" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="65" y="24" fill="#a1a1aa" font-family="monospace" font-size="9.5" text-anchor="middle">Unsorted Rows:</text>
          <text x="65" y="42" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Alice ($95k)</text>
          <text x="65" y="56" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Charlie ($82k)</text>
          <text x="65" y="70" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Evan ($95k)</text>
          <text x="65" y="84" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">Hannah ($89k)...</text>
        </g>

        <path d="M 170 65 L 230 65" stroke="#dfcaa9" stroke-width="2"/>

        <!-- QuickSort Engine with tie-breaker -->
        <g transform="translate(240, 20)">
          <rect width="230" height="90" rx="4" fill="rgba(209, 184, 150, 0.12)" stroke="#dfcaa9"/>
          <text x="115" y="28" fill="#dfcaa9" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">ORDER BY Sorter Engine</text>
          <text x="115" y="46" fill="#d1d5db" font-family="monospace" font-size="9.5" text-anchor="middle">Primary: salary DESC</text>
          <text x="115" y="62" fill="#a4b7cf" font-family="monospace" font-size="9" text-anchor="middle">Tie Detected: Alice ($95k) == Evan ($95k)</text>
          <text x="115" y="78" fill="#9ec5ad" font-family="monospace" font-size="9" text-anchor="middle">Tie-Breaker: name ASC &rarr; Alice &lt; Evan</text>
        </g>

        <path d="M 480 65 L 550 65" stroke="#dfcaa9" stroke-width="2"/>

        <!-- Sorted Order -->
        <g transform="translate(560, 20)">
          <rect width="110" height="90" rx="4" fill="#141418" stroke="#dfcaa9"/>
          <text x="55" y="22" fill="#dfcaa9" font-family="monospace" font-size="9.5" font-weight="700" text-anchor="middle">Guaranteed Order</text>
          <text x="55" y="38" fill="#9ec5ad" font-family="monospace" font-size="8" text-anchor="middle">1. Alice ($95k)</text>
          <text x="55" y="50" fill="#9ec5ad" font-family="monospace" font-size="8" text-anchor="middle">2. Evan ($95k)</text>
          <text x="55" y="62" fill="#d1d5db" font-family="monospace" font-size="8" text-anchor="middle">3. Hannah ($89k)</text>
          <text x="55" y="74" fill="#d1d5db" font-family="monospace" font-size="8" text-anchor="middle">4. Charlie ($82k)</text>
          <text x="55" y="86" fill="#d1d5db" font-family="monospace" font-size="8" text-anchor="middle">5. Diana ($74k)</text>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 06: LIMIT
  // ---------------------------------------------------------------------------
  {
    stepIndex: 6,
    id: 'limit',
    keyword: 'LIMIT',
    title: 'Step 06: The LIMIT Clause (Final Row Slicing)',
    pillClass: 'pill-limit',
    conceptHeading: 'Truncating the result set before transmission',
    conceptText: 'LIMIT is the very last step. Once all rows have been found, filtered, projected, and sorted, LIMIT simply clips the output at N rows. Combining ORDER BY with LIMIT ensures you get the exact top N records deterministically.',
    sqlCode: `SELECT name,\n       salary,\n       department\nFROM Employees\nWHERE salary >= 70000\nORDER BY salary DESC, name ASC\nLIMIT 3;`,
    explanationPoints: [
      'Executes as Step 06—the final step before transmitting packets over the network.',
      'Limits memory usage and ensures high application responsiveness.',
      'Without ORDER BY, LIMIT returns an unpredictable slice of rows.'
    ],
    gotcha: 'Never use LIMIT without ORDER BY if you care about which rows are returned. Database engine row storage is not guaranteed to remain sequential.',
    actionPrompt: 'Applying LIMIT 3 to extract the top 3 highest earning employees:',
    transform: (rows) => {
      const filtered = rows.filter(r => r.salary >= 70000);
      filtered.sort((a, b) => {
        if (b.salary !== a.salary) return b.salary - a.salary;
        return a.name.localeCompare(b.name);
      });
      return filtered.slice(0, 3).map((r, i) => ({
        rank: `#${i + 1}`,
        name: r.name,
        salary: `$${r.salary.toLocaleString()}`,
        department: r.department,
        _status: 'kept',
        _label: `TOP ${i + 1}`
      }));
    },
    svg: `
      <svg viewBox="0 0 700 130" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="130" fill="#0b0b0e" rx="6" stroke="#232328"/>
        <!-- 5 sorted candidate rows -->
        <g transform="translate(30, 20)">
          <rect width="130" height="90" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="65" y="20" fill="#a1a1aa" font-family="monospace" font-size="9.5" text-anchor="middle">5 Sorted Candidates</text>
          <text x="65" y="36" fill="#beafcc" font-family="monospace" font-size="8.5" text-anchor="middle">1. Alice ($95k)</text>
          <text x="65" y="50" fill="#beafcc" font-family="monospace" font-size="8.5" text-anchor="middle">2. Evan ($95k)</text>
          <text x="65" y="64" fill="#beafcc" font-family="monospace" font-size="8.5" text-anchor="middle">3. Hannah ($89k)</text>
          <text x="65" y="78" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">-- Cut Line --</text>
          <text x="65" y="90" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">4. Charlie, 5. Diana</text>
        </g>

        <path d="M 170 65 L 240 65" stroke="#beafcc" stroke-width="2"/>

        <!-- LIMIT Truncator -->
        <g transform="translate(250, 25)">
          <rect width="200" height="80" rx="4" fill="rgba(171, 155, 184, 0.12)" stroke="#beafcc"/>
          <text x="100" y="32" fill="#beafcc" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle">LIMIT 3</text>
          <text x="100" y="50" fill="#d1d5db" font-family="monospace" font-size="10" text-anchor="middle">Clips result buffer at row 3</text>
          <text x="100" y="66" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Rows 4 &amp; 5 discarded</text>
        </g>

        <path d="M 460 65 L 530 65" stroke="#beafcc" stroke-width="2"/>

        <!-- Final Client Result -->
        <g transform="translate(540, 20)">
          <rect width="130" height="90" rx="4" fill="rgba(171, 155, 184, 0.15)" stroke="#beafcc"/>
          <text x="65" y="24" fill="#beafcc" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">Delivered Output</text>
          <text x="65" y="44" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="600" text-anchor="middle">1. Alice Smith ($95k)</text>
          <text x="65" y="60" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="600" text-anchor="middle">2. Evan Wright ($95k)</text>
          <text x="65" y="76" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="600" text-anchor="middle">3. Hannah Abbott ($89k)</text>
        </g>
      </svg>
    `
  }
];
