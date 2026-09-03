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
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-from" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#8da2be"/>
          </marker>
        </defs>
        <rect width="780" height="180" fill="#0b0b0e" rx="6" stroke="#232328"/>

        <!-- Left: Physical Disk Sector -->
        <g transform="translate(30, 20)">
          <rect width="180" height="140" rx="5" fill="#121216" stroke="#2f333d"/>
          <rect width="180" height="26" rx="5" fill="#181a20"/>
          <text x="90" y="17" fill="#a4b7cf" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">PHYSICAL NVMe DISK</text>
          
          <!-- Disk file sectors -->
          <g transform="translate(15, 36)">
            <rect width="150" height="20" rx="3" fill="#1c1e26" stroke="#282b36"/>
            <text x="8" y="14" fill="#71717a" font-family="monospace" font-size="8.5">Page 0x01: Schema ibd</text>
            <rect y="26" width="150" height="20" rx="3" fill="#1c1e26" stroke="#282b36"/>
            <text x="8" y="40" fill="#71717a" font-family="monospace" font-size="8.5">Page 0x02: Rows 101-104</text>
            <rect y="52" width="150" height="20" rx="3" fill="#1c1e26" stroke="#282b36"/>
            <text x="8" y="66" fill="#71717a" font-family="monospace" font-size="8.5">Page 0x03: Rows 105-108</text>
            <rect y="78" width="150" height="18" rx="3" fill="#181a22"/>
            <text x="75" y="90" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">&bull;&bull;&bull; Binary B-Tree &bull;&bull;&bull;</text>
          </g>
        </g>

        <!-- Connecting I/O Stream Arrows -->
        <g>
          <path d="M 220 70 C 270 70, 280 80, 320 80" fill="none" stroke="#8da2be" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#arrow-from)"/>
          <path d="M 220 95 C 270 95, 280 95, 320 95" fill="none" stroke="#8da2be" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#arrow-from)"/>
          <path d="M 220 120 C 270 120, 280 110, 320 110" fill="none" stroke="#8da2be" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#arrow-from)"/>
          <rect x="235" y="45" width="80" height="18" rx="3" fill="#16181f" stroke="#2c303c"/>
          <text x="275" y="57" fill="#8da2be" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">DMA I/O READ</text>
        </g>

        <!-- Right: Structured Working Memory Schema Table -->
        <g transform="translate(330, 20)">
          <rect width="420" height="140" rx="5" fill="#111115" stroke="#8da2be" stroke-width="1.5"/>
          <rect width="420" height="26" rx="5" fill="rgba(141, 162, 190, 0.15)"/>
          <text x="15" y="17" fill="#8da2be" font-family="monospace" font-size="10" font-weight="700">IN-MEMORY WORKING TABLE: Employees</text>
          <text x="405" y="17" fill="#9ec5ad" font-family="monospace" font-size="9" text-anchor="end">Buffer: 8 rows &times; 5 cols</text>

          <!-- Table Header -->
          <g transform="translate(10, 34)">
            <rect width="400" height="18" fill="#181a20" stroke="#252730"/>
            <text x="25" y="12" fill="#a4b7cf" font-family="monospace" font-size="8" font-weight="700">emp_id</text>
            <text x="95" y="12" fill="#a4b7cf" font-family="monospace" font-size="8" font-weight="700">name</text>
            <text x="200" y="12" fill="#a4b7cf" font-family="monospace" font-size="8" font-weight="700">department</text>
            <text x="290" y="12" fill="#a4b7cf" font-family="monospace" font-size="8" font-weight="700">salary</text>
            <text x="360" y="12" fill="#a4b7cf" font-family="monospace" font-size="8" font-weight="700">year</text>
          </g>

          <!-- Sample Table Rows Loaded -->
          <g transform="translate(10, 56)">
            <rect width="400" height="15" fill="#131418"/>
            <text x="25" y="11" fill="#71717a" font-family="monospace" font-size="8">101</text>
            <text x="95" y="11" fill="#d1d5db" font-family="monospace" font-size="8">Alice Smith</text>
            <text x="200" y="11" fill="#dfcaa9" font-family="monospace" font-size="8">Engineering</text>
            <text x="290" y="11" fill="#9ec5ad" font-family="monospace" font-size="8">$95,000</text>
            <text x="360" y="11" fill="#71717a" font-family="monospace" font-size="8">2021</text>
          </g>
          <g transform="translate(10, 73)">
            <rect width="400" height="15" fill="#101013"/>
            <text x="25" y="11" fill="#71717a" font-family="monospace" font-size="8">102</text>
            <text x="95" y="11" fill="#d1d5db" font-family="monospace" font-size="8">Bob Jones</text>
            <text x="200" y="11" fill="#dfcaa9" font-family="monospace" font-size="8">Marketing</text>
            <text x="290" y="11" fill="#9ec5ad" font-family="monospace" font-size="8">$62,000</text>
            <text x="360" y="11" fill="#71717a" font-family="monospace" font-size="8">2023</text>
          </g>
          <g transform="translate(10, 90)">
            <rect width="400" height="15" fill="#131418"/>
            <text x="25" y="11" fill="#71717a" font-family="monospace" font-size="8">103</text>
            <text x="95" y="11" fill="#d1d5db" font-family="monospace" font-size="8">Charlie Brown</text>
            <text x="200" y="11" fill="#dfcaa9" font-family="monospace" font-size="8">Engineering</text>
            <text x="290" y="11" fill="#9ec5ad" font-family="monospace" font-size="8">$82,000</text>
            <text x="360" y="11" fill="#71717a" font-family="monospace" font-size="8">2020</text>
          </g>
          <g transform="translate(10, 107)">
            <text x="200" y="10" fill="#52525b" font-family="monospace" font-size="8" text-anchor="middle">&plus; 5 more rows loaded into RAM buffer &bull;&bull;&bull;</text>
          </g>
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
      <svg viewBox="0 0 780 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-pass" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#9ec5ad"/>
          </marker>
          <marker id="arrow-drop" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#c98877"/>
          </marker>
        </defs>
        <rect width="780" height="200" fill="#0b0b0e" rx="6" stroke="#232328"/>

        <!-- Left: Input Table (8 rows) -->
        <g transform="translate(20, 15)">
          <rect width="250" height="170" rx="4" fill="#121216" stroke="#33333b"/>
          <rect width="250" height="22" rx="4" fill="#181a20"/>
          <text x="10" y="15" fill="#a4b7cf" font-family="monospace" font-size="9" font-weight="700">INPUT: Employees (8 rows)</text>

          <!-- Header -->
          <g transform="translate(8, 28)">
            <text x="5" y="10" fill="#71717a" font-family="monospace" font-size="7.5" font-weight="700">ID</text>
            <text x="35" y="10" fill="#71717a" font-family="monospace" font-size="7.5" font-weight="700">NAME</text>
            <text x="110" y="10" fill="#71717a" font-family="monospace" font-size="7.5" font-weight="700">DEPT</text>
            <text x="180" y="10" fill="#71717a" font-family="monospace" font-size="7.5" font-weight="700">SALARY</text>
          </g>

          <!-- Rows with row anchors -->
          <!-- Row 1: Alice (Pass) -->
          <g transform="translate(8, 43)">
            <rect width="234" height="13" fill="rgba(139, 179, 156, 0.12)" stroke="rgba(139, 179, 156, 0.3)"/>
            <text x="5" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">101</text>
            <text x="35" y="10" fill="#d1d5db" font-family="monospace" font-size="7.5">Alice Smith</text>
            <text x="110" y="10" fill="#dfcaa9" font-family="monospace" font-size="7.5">Engineering</text>
            <text x="180" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">$95k</text>
          </g>
          <!-- Row 2: Bob (Drop) -->
          <g transform="translate(8, 58)">
            <rect width="234" height="13" fill="#131418"/>
            <text x="5" y="10" fill="#52525b" font-family="monospace" font-size="7.5">102</text>
            <text x="35" y="10" fill="#71717a" font-family="monospace" font-size="7.5">Bob Jones</text>
            <text x="110" y="10" fill="#71717a" font-family="monospace" font-size="7.5">Marketing</text>
            <text x="180" y="10" fill="#71717a" font-family="monospace" font-size="7.5">$62k</text>
          </g>
          <!-- Row 3: Charlie (Pass) -->
          <g transform="translate(8, 73)">
            <rect width="234" height="13" fill="rgba(139, 179, 156, 0.12)" stroke="rgba(139, 179, 156, 0.3)"/>
            <text x="5" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">103</text>
            <text x="35" y="10" fill="#d1d5db" font-family="monospace" font-size="7.5">Charlie Brown</text>
            <text x="110" y="10" fill="#dfcaa9" font-family="monospace" font-size="7.5">Engineering</text>
            <text x="180" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">$82k</text>
          </g>
          <!-- Row 4: Diana (Drop) -->
          <g transform="translate(8, 88)">
            <rect width="234" height="13" fill="#131418"/>
            <text x="5" y="10" fill="#52525b" font-family="monospace" font-size="7.5">104</text>
            <text x="35" y="10" fill="#71717a" font-family="monospace" font-size="7.5">Diana Prince</text>
            <text x="110" y="10" fill="#71717a" font-family="monospace" font-size="7.5">Sales</text>
            <text x="180" y="10" fill="#71717a" font-family="monospace" font-size="7.5">$74k</text>
          </g>
          <!-- Row 5: Evan (Pass) -->
          <g transform="translate(8, 103)">
            <rect width="234" height="13" fill="rgba(139, 179, 156, 0.12)" stroke="rgba(139, 179, 156, 0.3)"/>
            <text x="5" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">105</text>
            <text x="35" y="10" fill="#d1d5db" font-family="monospace" font-size="7.5">Evan Wright</text>
            <text x="110" y="10" fill="#dfcaa9" font-family="monospace" font-size="7.5">Engineering</text>
            <text x="180" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">$95k</text>
          </g>
          <!-- Rows 6,7,8 (Drop) -->
          <g transform="translate(8, 118)">
            <text x="117" y="10" fill="#52525b" font-family="monospace" font-size="7.5" text-anchor="middle">&bull;&bull;&bull; 106 Fiona, 107 George, 108 Hannah &bull;&bull;&bull;</text>
          </g>
        </g>

        <!-- Center: Predicate Filter Gate -->
        <g transform="translate(290, 45)">
          <rect width="180" height="105" rx="5" fill="rgba(201, 136, 119, 0.1)" stroke="#d69d8f" stroke-width="1.5"/>
          <text x="90" y="22" fill="#d69d8f" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">PREDICATE GATE</text>
          <text x="90" y="42" fill="#dfcaa9" font-family="monospace" font-size="8.5" text-anchor="middle">dept == 'Engineering'</text>
          <text x="90" y="58" fill="#dfcaa9" font-family="monospace" font-size="8.5" text-anchor="middle">&amp;&amp; salary &ge; $74,000</text>
          
          <line x1="20" y1="72" x2="160" y2="72" stroke="#33333b"/>
          <text x="90" y="88" fill="#9ec5ad" font-family="monospace" font-size="8" text-anchor="middle">&check; 3 TRUE  |  &cross; 5 FALSE</text>
        </g>

        <!-- Dynamic Flow Arrows -->
        <!-- Pass Arrows (Green) to Right Output Table -->
        <path d="M 270 65 Q 280 65 290 70" fill="none" stroke="#9ec5ad" stroke-width="2"/>
        <path d="M 470 75 C 490 75, 495 55, 510 55" fill="none" stroke="#9ec5ad" stroke-width="2" marker-end="url(#arrow-pass)"/>
        <path d="M 470 85 C 490 85, 495 72, 510 72" fill="none" stroke="#9ec5ad" stroke-width="2" marker-end="url(#arrow-pass)"/>
        <path d="M 470 95 C 490 95, 495 90, 510 90" fill="none" stroke="#9ec5ad" stroke-width="2" marker-end="url(#arrow-pass)"/>

        <!-- Drop Arrows (Curved Terracotta) to Bottom Discard Box -->
        <path d="M 470 125 C 490 125, 490 155, 510 155" fill="none" stroke="#c98877" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow-drop)"/>

        <!-- Right Top: Filtered Output Table (3 rows) -->
        <g transform="translate(520, 20)">
          <rect width="240" height="95" rx="4" fill="#121216" stroke="#9ec5ad" stroke-width="1.5"/>
          <rect width="240" height="20" rx="4" fill="rgba(139, 179, 156, 0.15)"/>
          <text x="10" y="14" fill="#9ec5ad" font-family="monospace" font-size="8.5" font-weight="700">KEPT BUFFER (3 Passed)</text>

          <g transform="translate(6, 26)">
            <!-- Row 1: Alice -->
            <g transform="translate(0, 5)">
              <text x="5" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">101</text>
              <text x="35" y="10" fill="#d1d5db" font-family="monospace" font-size="7.5">Alice Smith</text>
              <text x="110" y="10" fill="#dfcaa9" font-family="monospace" font-size="7.5">Eng</text>
              <text x="160" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">$95,000</text>
            </g>
            <!-- Row 2: Charlie -->
            <g transform="translate(0, 22)">
              <text x="5" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">103</text>
              <text x="35" y="10" fill="#d1d5db" font-family="monospace" font-size="7.5">Charlie Brown</text>
              <text x="110" y="10" fill="#dfcaa9" font-family="monospace" font-size="7.5">Eng</text>
              <text x="160" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">$82,000</text>
            </g>
            <!-- Row 3: Evan -->
            <g transform="translate(0, 39)">
              <text x="5" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">105</text>
              <text x="35" y="10" fill="#d1d5db" font-family="monospace" font-size="7.5">Evan Wright</text>
              <text x="110" y="10" fill="#dfcaa9" font-family="monospace" font-size="7.5">Eng</text>
              <text x="160" y="10" fill="#9ec5ad" font-family="monospace" font-size="7.5">$95,000</text>
            </g>
          </g>
        </g>

        <!-- Right Bottom: Discarded Records Box -->
        <g transform="translate(520, 130)">
          <rect width="240" height="50" rx="4" fill="#121216" stroke="#33333b" stroke-dasharray="3,3"/>
          <text x="10" y="17" fill="#71717a" font-family="monospace" font-size="8" font-weight="700">&cross; DISCARDED BUFFER (5 Rows Dropped)</text>
          <text x="10" y="32" fill="#52525b" font-family="monospace" font-size="7.5">Bob (Mktg), Diana (Sales), Fiona (Sales), George (Mktg), Hannah (Fin)</text>
          <text x="10" y="44" fill="#c98877" font-family="monospace" font-size="7.5">Reason: Predicate evaluated to FALSE &rarr; Dropped from memory</text>
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
      <svg viewBox="0 0 780 190" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-proj" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#9ec5ad"/>
          </marker>
          <marker id="arrow-math" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#dfcaa9"/>
          </marker>
        </defs>
        <rect width="780" height="190" fill="#0b0b0e" rx="6" stroke="#232328"/>

        <!-- Left: Full 5-Column Table -->
        <g transform="translate(20, 20)">
          <rect width="280" height="150" rx="4" fill="#121216" stroke="#33333b"/>
          <rect width="280" height="22" rx="4" fill="#181a20"/>
          <text x="10" y="15" fill="#a4b7cf" font-family="monospace" font-size="9" font-weight="700">INPUT: 5 Columns in Working Buffer</text>

          <!-- Column Blocks -->
          <g transform="translate(10, 30)">
            <!-- emp_id (dropped) -->
            <rect x="0" y="0" width="45" height="100" rx="3" fill="#14151a" stroke="#23242c" stroke-dasharray="2,2"/>
            <text x="22" y="16" fill="#52525b" font-family="monospace" font-size="7.5" text-anchor="middle">emp_id</text>
            <text x="22" y="60" fill="#3f3f46" font-family="monospace" font-size="7" text-anchor="middle">Dropped</text>

            <!-- name (KEPT) -->
            <rect x="52" y="0" width="65" height="100" rx="3" fill="rgba(139, 179, 156, 0.1)" stroke="#9ec5ad"/>
            <text x="84" y="16" fill="#9ec5ad" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">name</text>
            <text x="84" y="40" fill="#d1d5db" font-family="monospace" font-size="7" text-anchor="middle">Alice</text>
            <text x="84" y="60" fill="#d1d5db" font-family="monospace" font-size="7" text-anchor="middle">Charlie</text>
            <text x="84" y="80" fill="#d1d5db" font-family="monospace" font-size="7" text-anchor="middle">Evan</text>

            <!-- dept (dropped) -->
            <rect x="124" y="0" width="45" height="100" rx="3" fill="#14151a" stroke="#23242c" stroke-dasharray="2,2"/>
            <text x="146" y="16" fill="#52525b" font-family="monospace" font-size="7.5" text-anchor="middle">dept</text>
            <text x="146" y="60" fill="#3f3f46" font-family="monospace" font-size="7" text-anchor="middle">Dropped</text>

            <!-- salary (KEPT + COMPUTED) -->
            <rect x="176" y="0" width="55" height="100" rx="3" fill="rgba(139, 179, 156, 0.1)" stroke="#9ec5ad"/>
            <text x="203" y="16" fill="#9ec5ad" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">salary</text>
            <text x="203" y="40" fill="#d1d5db" font-family="monospace" font-size="7" text-anchor="middle">$95k</text>
            <text x="203" y="60" fill="#d1d5db" font-family="monospace" font-size="7" text-anchor="middle">$82k</text>
            <text x="203" y="80" fill="#d1d5db" font-family="monospace" font-size="7" text-anchor="middle">$95k</text>

            <!-- year (dropped) -->
            <rect x="238" y="0" width="35" height="100" rx="3" fill="#14151a" stroke="#23242c" stroke-dasharray="2,2"/>
            <text x="255" y="16" fill="#52525b" font-family="monospace" font-size="7.5" text-anchor="middle">year</text>
            <text x="255" y="60" fill="#3f3f46" font-family="monospace" font-size="7" text-anchor="middle">Drop</text>
          </g>
        </g>

        <!-- Center: Projection & Expression Engine -->
        <g transform="translate(325, 45)">
          <!-- Name Direct Flow -->
          <path d="M -15 25 L 50 25" fill="none" stroke="#9ec5ad" stroke-width="2" marker-end="url(#arrow-proj)"/>
          
          <!-- Salary Direct Flow -->
          <path d="M -15 65 L 50 65" fill="none" stroke="#9ec5ad" stroke-width="2" marker-end="url(#arrow-proj)"/>

          <!-- Salary Computed Math Block -->
          <g transform="translate(60, 45)">
            <rect width="110" height="50" rx="4" fill="rgba(209, 184, 150, 0.12)" stroke="#dfcaa9" stroke-width="1.5"/>
            <text x="55" y="18" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="middle">EXPRESSION</text>
            <text x="55" y="32" fill="#d1d5db" font-family="monospace" font-size="8" text-anchor="middle">salary &times; 0.10</text>
            <text x="55" y="44" fill="#dfcaa9" font-family="monospace" font-size="7.5" text-anchor="middle">AS annual_bonus</text>
          </g>
          <path d="M 170 70 L 210 70" fill="none" stroke="#dfcaa9" stroke-width="2" marker-end="url(#arrow-math)"/>
        </g>

        <!-- Right: Final Projected Table Shape -->
        <g transform="translate(550, 20)">
          <rect width="210" height="150" rx="4" fill="#121216" stroke="#9ec5ad" stroke-width="1.5"/>
          <rect width="210" height="22" rx="4" fill="rgba(139, 179, 156, 0.15)"/>
          <text x="10" y="15" fill="#9ec5ad" font-family="monospace" font-size="9" font-weight="700">PROJECTED SHAPE (3 Cols)</text>

          <!-- Table Header -->
          <g transform="translate(10, 32)">
            <text x="10" y="10" fill="#9ec5ad" font-family="monospace" font-size="8" font-weight="700">name</text>
            <text x="80" y="10" fill="#9ec5ad" font-family="monospace" font-size="8" font-weight="700">salary</text>
            <text x="140" y="10" fill="#dfcaa9" font-family="monospace" font-size="8" font-weight="700">bonus</text>
          </g>

          <g transform="translate(10, 50)">
            <rect width="190" height="22" rx="2" fill="#16181f"/>
            <text x="10" y="15" fill="#d1d5db" font-family="monospace" font-size="8">Alice Smith</text>
            <text x="80" y="15" fill="#d1d5db" font-family="monospace" font-size="8">$95,000</text>
            <text x="140" y="15" fill="#dfcaa9" font-family="monospace" font-size="8" font-weight="700">$9,500</text>
          </g>
          <g transform="translate(10, 78)">
            <rect width="190" height="22" rx="2" fill="#16181f"/>
            <text x="10" y="15" fill="#d1d5db" font-family="monospace" font-size="8">Charlie Brown</text>
            <text x="80" y="15" fill="#d1d5db" font-family="monospace" font-size="8">$82,000</text>
            <text x="140" y="15" fill="#dfcaa9" font-family="monospace" font-size="8" font-weight="700">$8,200</text>
          </g>
          <g transform="translate(10, 106)">
            <rect width="190" height="22" rx="2" fill="#16181f"/>
            <text x="10" y="15" fill="#d1d5db" font-family="monospace" font-size="8">Evan Wright</text>
            <text x="80" y="15" fill="#d1d5db" font-family="monospace" font-size="8">$95,000</text>
            <text x="140" y="15" fill="#dfcaa9" font-family="monospace" font-size="8" font-weight="700">$9,500</text>
          </g>
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
      <svg viewBox="0 0 780 190" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-dist" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#9ec5ad"/>
          </marker>
        </defs>
        <rect width="780" height="190" fill="#0b0b0e" rx="6" stroke="#232328"/>

        <!-- Left: 8 Raw Rows with Duplicate Departments -->
        <g transform="translate(20, 15)">
          <rect width="240" height="160" rx="4" fill="#121216" stroke="#33333b"/>
          <rect width="240" height="20" rx="4" fill="#181a20"/>
          <text x="10" y="14" fill="#a4b7cf" font-family="monospace" font-size="8.5" font-weight="700">INPUT: 8 Department Rows</text>

          <g transform="translate(10, 26)">
            <!-- Row 1, 3, 5: Engineering (Blue tint) -->
            <text x="10" y="12" fill="#dfcaa9" font-family="monospace" font-size="8">1. Engineering (Alice)</text>
            <text x="10" y="27" fill="#71717a" font-family="monospace" font-size="8">2. Marketing (Bob)</text>
            <text x="10" y="42" fill="#dfcaa9" font-family="monospace" font-size="8">3. Engineering (Charlie)</text>
            <text x="10" y="57" fill="#a4b7cf" font-family="monospace" font-size="8">4. Sales (Diana)</text>
            <text x="10" y="72" fill="#dfcaa9" font-family="monospace" font-size="8">5. Engineering (Evan)</text>
            <text x="10" y="87" fill="#a4b7cf" font-family="monospace" font-size="8">6. Sales (Fiona)</text>
            <text x="10" y="102" fill="#71717a" font-family="monospace" font-size="8">7. Marketing (George)</text>
            <text x="10" y="117" fill="#beafcc" font-family="monospace" font-size="8">8. Finance (Hannah)</text>
          </g>
        </g>

        <!-- Center: Converging Arrows Matrix -->
        <g transform="translate(265, 25)">
          <!-- 3 Engineering rows converging to 1 -->
          <path d="M 0 15 C 60 15, 90 35, 140 35" fill="none" stroke="#dfcaa9" stroke-width="1.8"/>
          <path d="M 0 45 C 60 45, 90 35, 140 35" fill="none" stroke="#dfcaa9" stroke-width="1.8"/>
          <path d="M 0 75 C 60 75, 90 35, 140 35" fill="none" stroke="#dfcaa9" stroke-width="1.8" marker-end="url(#arrow-dist)"/>
          <text x="65" y="48" fill="#dfcaa9" font-family="monospace" font-size="7" font-weight="700">3 &rarr; 1 Eng</text>

          <!-- 2 Marketing rows converging to 1 -->
          <path d="M 0 30 C 60 30, 90 68, 140 68" fill="none" stroke="#71717a" stroke-width="1.8"/>
          <path d="M 0 105 C 60 105, 90 68, 140 68" fill="none" stroke="#71717a" stroke-width="1.8" marker-end="url(#arrow-dist)"/>
          <text x="65" y="80" fill="#71717a" font-family="monospace" font-size="7" font-weight="700">2 &rarr; 1 Mktg</text>

          <!-- 2 Sales rows converging to 1 -->
          <path d="M 0 60 C 60 60, 90 102, 140 102" fill="none" stroke="#a4b7cf" stroke-width="1.8"/>
          <path d="M 0 90 C 60 90, 90 102, 140 102" fill="none" stroke="#a4b7cf" stroke-width="1.8" marker-end="url(#arrow-dist)"/>

          <!-- 1 Finance straight -->
          <path d="M 0 120 L 140 135" fill="none" stroke="#beafcc" stroke-width="1.8" marker-end="url(#arrow-dist)"/>
        </g>

        <!-- Right: Deduplicated Unique Rows -->
        <g transform="translate(460, 25)">
          <rect width="280" height="145" rx="4" fill="#121216" stroke="#9ec5ad" stroke-width="1.5"/>
          <rect width="280" height="22" rx="4" fill="rgba(139, 179, 156, 0.15)"/>
          <text x="10" y="15" fill="#9ec5ad" font-family="monospace" font-size="9" font-weight="700">OUTPUT: SELECT DISTINCT department</text>

          <g transform="translate(15, 36)">
            <rect y="0" width="250" height="22" rx="3" fill="#16181f" stroke="rgba(209, 184, 150, 0.4)"/>
            <text x="12" y="15" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="700">Engineering</text>
            <text x="240" y="15" fill="#71717a" font-family="monospace" font-size="7.5" text-anchor="end">Collapsed from 3 rows</text>

            <rect y="26" width="250" height="22" rx="3" fill="#16181f" stroke="rgba(113, 113, 122, 0.4)"/>
            <text x="12" y="41" fill="#d1d5db" font-family="monospace" font-size="8.5" font-weight="700">Marketing</text>
            <text x="240" y="41" fill="#71717a" font-family="monospace" font-size="7.5" text-anchor="end">Collapsed from 2 rows</text>

            <rect y="52" width="250" height="22" rx="3" fill="#16181f" stroke="rgba(164, 183, 207, 0.4)"/>
            <text x="12" y="67" fill="#a4b7cf" font-family="monospace" font-size="8.5" font-weight="700">Sales</text>
            <text x="240" y="67" fill="#71717a" font-family="monospace" font-size="7.5" text-anchor="end">Collapsed from 2 rows</text>

            <rect y="78" width="250" height="22" rx="3" fill="#16181f" stroke="rgba(190, 175, 204, 0.4)"/>
            <text x="12" y="93" fill="#beafcc" font-family="monospace" font-size="8.5" font-weight="700">Finance</text>
            <text x="240" y="93" fill="#71717a" font-family="monospace" font-size="7.5" text-anchor="end">Single row</text>
          </g>
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
      <svg viewBox="0 0 780 195" width="100%" height="195" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-sort" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#dfcaa9"/>
          </marker>
        </defs>
        <rect width="780" height="195" fill="#0b0b0e" rx="6" stroke="#232328"/>

        <!-- Left: Unsorted 5 Qualifying Rows -->
        <g transform="translate(20, 20)">
          <rect width="240" height="155" rx="4" fill="#121216" stroke="#33333b"/>
          <rect width="240" height="22" rx="4" fill="#181a20"/>
          <text x="10" y="15" fill="#a4b7cf" font-family="monospace" font-size="8.5" font-weight="700">INPUT: Unsorted (Arbitrary Order)</text>

          <g transform="translate(10, 32)">
            <!-- Alice -->
            <text x="5" y="15" fill="#d1d5db" font-family="monospace" font-size="8">Alice Smith &mdash; $95,000</text>
            <!-- Charlie -->
            <text x="5" y="38" fill="#d1d5db" font-family="monospace" font-size="8">Charlie Brown &mdash; $82,000</text>
            <!-- Diana -->
            <text x="5" y="61" fill="#d1d5db" font-family="monospace" font-size="8">Diana Prince &mdash; $74,000</text>
            <!-- Evan -->
            <text x="5" y="84" fill="#d1d5db" font-family="monospace" font-size="8">Evan Wright &mdash; $95,000</text>
            <!-- Hannah -->
            <text x="5" y="107" fill="#d1d5db" font-family="monospace" font-size="8">Hannah Abbott &mdash; $89,000</text>
          </g>
        </g>

        <!-- Center: Cross-Over Sorting Flow Arrows -->
        <g transform="translate(265, 30)">
          <!-- Alice to Rank 1 -->
          <path d="M 0 18 L 190 18" fill="none" stroke="#9ec5ad" stroke-width="2" marker-end="url(#arrow-sort)"/>
          
          <!-- Charlie to Rank 4 -->
          <path d="M 0 41 C 80 41, 110 87, 190 87" fill="none" stroke="#dfcaa9" stroke-width="1.8" marker-end="url(#arrow-sort)"/>

          <!-- Diana to Rank 5 -->
          <path d="M 0 64 C 80 64, 110 110, 190 110" fill="none" stroke="#dfcaa9" stroke-width="1.8" marker-end="url(#arrow-sort)"/>

          <!-- Evan to Rank 2 (Tie Breaker!) -->
          <path d="M 0 87 C 80 87, 110 41, 190 41" fill="none" stroke="#9ec5ad" stroke-width="2" marker-end="url(#arrow-sort)"/>

          <!-- Hannah to Rank 3 -->
          <path d="M 0 110 C 80 110, 110 64, 190 64" fill="none" stroke="#dfcaa9" stroke-width="1.8" marker-end="url(#arrow-sort)"/>

          <!-- Tie-Breaker Callout Box -->
          <g transform="translate(45, 118)">
            <rect width="130" height="28" rx="3" fill="#1a1813" stroke="#dfcaa9"/>
            <text x="65" y="12" fill="#dfcaa9" font-family="monospace" font-size="7.5" font-weight="700" text-anchor="middle">TIE DETECTED ($95k)</text>
            <text x="65" y="22" fill="#9ec5ad" font-family="monospace" font-size="7" text-anchor="middle">name ASC: Alice &lt; Evan</text>
          </g>
        </g>

        <!-- Right: Reordered Sorted Rows -->
        <g transform="translate(500, 20)">
          <rect width="260" height="155" rx="4" fill="#121216" stroke="#dfcaa9" stroke-width="1.5"/>
          <rect width="260" height="22" rx="4" fill="rgba(209, 184, 150, 0.15)"/>
          <text x="10" y="15" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="700">OUTPUT: ORDER BY salary DESC, name ASC</text>

          <g transform="translate(10, 32)">
            <rect y="0" width="240" height="20" rx="3" fill="#181a20" stroke="#9ec5ad"/>
            <text x="8" y="14" fill="#9ec5ad" font-family="monospace" font-size="8" font-weight="700">#1 Alice Smith &mdash; $95,000</text>

            <rect y="23" width="240" height="20" rx="3" fill="#181a20" stroke="#9ec5ad"/>
            <text x="8" y="37" fill="#9ec5ad" font-family="monospace" font-size="8" font-weight="700">#2 Evan Wright &mdash; $95,000</text>

            <rect y="46" width="240" height="20" rx="3" fill="#14151a"/>
            <text x="8" y="60" fill="#d1d5db" font-family="monospace" font-size="8">#3 Hannah Abbott &mdash; $89,000</text>

            <rect y="69" width="240" height="20" rx="3" fill="#14151a"/>
            <text x="8" y="83" fill="#d1d5db" font-family="monospace" font-size="8">#4 Charlie Brown &mdash; $82,000</text>

            <rect y="92" width="240" height="20" rx="3" fill="#14151a"/>
            <text x="8" y="106" fill="#d1d5db" font-family="monospace" font-size="8">#5 Diana Prince &mdash; $74,000</text>
          </g>
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
      <svg viewBox="0 0 780 190" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-lim" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#beafcc"/>
          </marker>
        </defs>
        <rect width="780" height="190" fill="#0b0b0e" rx="6" stroke="#232328"/>

        <!-- Left: 5 Sorted Rows -->
        <g transform="translate(20, 15)">
          <rect width="250" height="160" rx="4" fill="#121216" stroke="#33333b"/>
          <rect width="250" height="20" rx="4" fill="#181a20"/>
          <text x="10" y="14" fill="#a4b7cf" font-family="monospace" font-size="8.5" font-weight="700">INPUT: 5 Sorted Candidate Rows</text>

          <g transform="translate(10, 26)">
            <!-- Top 3 -->
            <rect y="5" width="230" height="20" rx="3" fill="#191720" stroke="#beafcc"/>
            <text x="8" y="19" fill="#beafcc" font-family="monospace" font-size="8">1. Alice Smith ($95k)</text>

            <rect y="29" width="230" height="20" rx="3" fill="#191720" stroke="#beafcc"/>
            <text x="8" y="43" fill="#beafcc" font-family="monospace" font-size="8">2. Evan Wright ($95k)</text>

            <rect y="53" width="230" height="20" rx="3" fill="#191720" stroke="#beafcc"/>
            <text x="8" y="67" fill="#beafcc" font-family="monospace" font-size="8">3. Hannah Abbott ($89k)</text>

            <!-- Truncation Divider -->
            <line x1="0" y1="80" x2="230" y2="80" stroke="#c98877" stroke-width="2" stroke-dasharray="4,3"/>
            <text x="115" y="93" fill="#c98877" font-family="monospace" font-size="7.5" font-weight="700" text-anchor="middle">&mdash;&mdash; LIMIT 3 CUT-OFF &mdash;&mdash;</text>

            <!-- Below cutoff -->
            <rect y="98" width="230" height="16" rx="3" fill="#141418"/>
            <text x="8" y="110" fill="#52525b" font-family="monospace" font-size="7.5">4. Charlie Brown ($82k) [CLIPPED]</text>

            <rect y="117" width="230" height="16" rx="3" fill="#141418"/>
            <text x="8" y="129" fill="#52525b" font-family="monospace" font-size="7.5">5. Diana Prince ($74k) [CLIPPED]</text>
          </g>
        </g>

        <!-- Center: LIMIT Barrier and Flow Arrows -->
        <g transform="translate(285, 20)">
          <!-- Top 3 Arrows Flowing Through -->
          <path d="M 0 35 L 180 35" fill="none" stroke="#beafcc" stroke-width="2" marker-end="url(#arrow-lim)"/>
          <path d="M 0 59 L 180 59" fill="none" stroke="#beafcc" stroke-width="2" marker-end="url(#arrow-lim)"/>
          <path d="M 0 83 L 180 83" fill="none" stroke="#beafcc" stroke-width="2" marker-end="url(#arrow-lim)"/>

          <!-- Blocked Truncation Symbol -->
          <g transform="translate(45, 115)">
            <rect width="100" height="28" rx="3" fill="#1c1618" stroke="#c98877"/>
            <text x="50" y="12" fill="#c98877" font-family="monospace" font-size="7.5" font-weight="700" text-anchor="middle">BUFFER CLIPPED</text>
            <text x="50" y="22" fill="#71717a" font-family="monospace" font-size="7" text-anchor="middle">Rows 4 &amp; 5 Discarded</text>
          </g>
        </g>

        <!-- Right: Final Result Delivered -->
        <g transform="translate(510, 15)">
          <rect width="250" height="160" rx="4" fill="#121216" stroke="#beafcc" stroke-width="1.5"/>
          <rect width="250" height="20" rx="4" fill="rgba(190, 175, 204, 0.15)"/>
          <text x="10" y="14" fill="#beafcc" font-family="monospace" font-size="8.5" font-weight="700">OUTPUT: Final Result Packet (3 Rows)</text>

          <g transform="translate(10, 32)">
            <rect y="0" width="230" height="32" rx="3" fill="#17151e" stroke="rgba(190, 175, 204, 0.3)"/>
            <text x="10" y="15" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="700">#1 Alice Smith</text>
            <text x="10" y="27" fill="#71717a" font-family="monospace" font-size="7.5">Engineering &bull; $95,000</text>
            <text x="215" y="20" fill="#9ec5ad" font-family="monospace" font-size="8" text-anchor="end">&check; Transmitted</text>

            <rect y="38" width="230" height="32" rx="3" fill="#17151e" stroke="rgba(190, 175, 204, 0.3)"/>
            <text x="10" y="53" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="700">#2 Evan Wright</text>
            <text x="10" y="65" fill="#71717a" font-family="monospace" font-size="7.5">Engineering &bull; $95,000</text>
            <text x="215" y="58" fill="#9ec5ad" font-family="monospace" font-size="8" text-anchor="end">&check; Transmitted</text>

            <rect y="76" width="230" height="32" rx="3" fill="#17151e" stroke="rgba(190, 175, 204, 0.3)"/>
            <text x="10" y="91" fill="#dfcaa9" font-family="monospace" font-size="8.5" font-weight="700">#3 Hannah Abbott</text>
            <text x="10" y="103" fill="#71717a" font-family="monospace" font-size="7.5">Finance &bull; $89,000</text>
            <text x="215" y="96" fill="#9ec5ad" font-family="monospace" font-size="8" text-anchor="end">&check; Transmitted</text>
          </g>
        </g>
      </svg>
    `
  }
];
