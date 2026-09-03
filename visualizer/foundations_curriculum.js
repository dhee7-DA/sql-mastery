// =============================================================================
// FOUNDATIONS CURRICULUM DATA: KEYWORDS, MCQS, CASE STUDIES & PROBLEMS
// =============================================================================

window.FOUNDATIONS_DATA = {
  // ---------------------------------------------------------------------------
  // 1. KEYWORD ENCYCLOPEDIA & VISUAL EXPLAINERS
  // ---------------------------------------------------------------------------
  keywords: [
    {
      id: 'from',
      name: 'FROM',
      category: 'Source Binding',
      badgeClass: 'pill-from',
      executionOrder: '01 (Physical First)',
      summary: 'Specifies the source table or relation. Allocates the initial dataset in engine memory.',
      concept: 'The SQL query engine ALWAYS executes FROM before anything else. It binds the table from disk into a working memory buffer. Without FROM, the query engine does not know what columns or rows exist.',
      syntax: 'FROM table_name [AS alias]',
      rules: [
        'Executes as Step 01 in the physical query pipeline.',
        'Creates the virtual working table that subsequent clauses (WHERE, GROUP BY, SELECT) operate on.',
        'Table aliases defined here are accessible everywhere else in the query.'
      ],
      gotcha: 'You cannot use column aliases created in SELECT inside the FROM clause because SELECT has not executed yet.',
      svgDiagram: `
        <svg viewBox="0 0 600 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="120" fill="#0c0c0f" rx="6" stroke="#232328"/>
          <rect x="30" y="35" width="110" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="85" y="58" fill="#a4b7cf" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">PHYSICAL DISK</text>
          <text x="85" y="74" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Storage Engine</text>

          <path d="M 145 60 L 210 60" stroke="#8da2be" stroke-width="2" stroke-dasharray="4,4"/>

          <rect x="215" y="30" width="160" height="60" rx="4" fill="rgba(141, 162, 190, 0.12)" stroke="#8da2be"/>
          <text x="295" y="54" fill="#8da2be" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">FROM [Table]</text>
          <text x="295" y="72" fill="#d1d5db" font-family="monospace" font-size="10" text-anchor="middle">Working Set Allocated</text>

          <path d="M 380 60 L 445 60" stroke="#8da2be" stroke-width="2"/>

          <rect x="450" y="35" width="120" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="510" y="58" fill="#71717a" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">TO WHERE / ON</text>
          <text x="510" y="74" fill="#52525b" font-family="monospace" font-size="9" text-anchor="middle">Next Evaluation</text>
        </svg>
      `
    },
    {
      id: 'where',
      name: 'WHERE',
      category: 'Row Filtering',
      badgeClass: 'pill-where',
      executionOrder: '02 (Pre-Aggregation Filter)',
      summary: 'Filters individual rows based on boolean predicates (TRUE / FALSE / UNKNOWN).',
      concept: 'WHERE inspects each row in the working table one-by-one. If the predicate evaluates to TRUE, the row is kept. If it evaluates to FALSE or NULL (UNKNOWN), the row is immediately discarded. This happens BEFORE projection (SELECT) or grouping.',
      syntax: 'WHERE condition_1 [AND | OR] condition_2',
      rules: [
        'Executes as Step 02, immediately after FROM.',
        'Operates on raw table rows before SELECT column aliases exist.',
        'Cannot contain aggregate functions like COUNT() or SUM() (use HAVING for aggregate filters).',
        'Three-valued logic: TRUE, FALSE, and UNKNOWN (NULL). Only TRUE passes!'
      ],
      gotcha: 'Writing "WHERE salary_alias > 5000" throws an Unknown Column error because SELECT has not run yet!',
      svgDiagram: `
        <svg viewBox="0 0 600 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="120" fill="#0c0c0f" rx="6" stroke="#232328"/>
          <rect x="30" y="35" width="100" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="80" y="58" fill="#d1d5db" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">ALL ROWS</text>
          <text x="80" y="74" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">From FROM (100%)</text>

          <path d="M 135 60 L 205 60" stroke="#c98877" stroke-width="2"/>

          <rect x="210" y="25" width="180" height="70" rx="4" fill="rgba(201, 136, 119, 0.12)" stroke="#c98877"/>
          <text x="300" y="48" fill="#d69d8f" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">WHERE Predicate</text>
          <text x="300" y="66" fill="#9ec5ad" font-family="monospace" font-size="10" text-anchor="middle">&bull; TRUE &rarr; Keep Row</text>
          <text x="300" y="82" fill="#c98877" font-family="monospace" font-size="10" text-anchor="middle">&bull; FALSE / NULL &rarr; Drop</text>

          <path d="M 395 60 L 465 60" stroke="#c98877" stroke-width="2"/>
          <rect x="470" y="35" width="100" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="520" y="58" fill="#9ec5ad" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">PASSED ROWS</text>
          <text x="520" y="74" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Filtered Sub-set</text>
        </svg>
      `
    },
    {
      id: 'select',
      name: 'SELECT',
      category: 'Column Projection',
      badgeClass: 'pill-select',
      executionOrder: '03 (Post-Filter Projection)',
      summary: 'Specifies which columns and computed expressions appear in the final output.',
      concept: 'SELECT determines the horizontal shape of the result table. It does not select rows—it projects columns! In SELECT, you can calculate mathematical expressions, format strings with functions like LENGTH() or RIGHT(), and introduce column aliases.',
      syntax: 'SELECT column1, column2, expression AS alias_name',
      rules: [
        'Executes AFTER FROM and WHERE, but BEFORE DISTINCT, ORDER BY, and LIMIT.',
        'This is where column aliases (AS alias) are born and named in query memory.',
        'Selecting specific columns (SELECT name, salary) is far more efficient than SELECT * in production databases.'
      ],
      gotcha: 'SELECT does NOT filter rows; row filtering belongs entirely to WHERE.',
      svgDiagram: `
        <svg viewBox="0 0 600 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="120" fill="#0c0c0f" rx="6" stroke="#232328"/>
          <rect x="30" y="35" width="120" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="90" y="56" fill="#a1a1aa" font-family="monospace" font-size="10" text-anchor="middle">Raw Table Columns</text>
          <text x="90" y="72" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">[ID, Name, Salary, Dept, ...]</text>

          <path d="M 155 60 L 215 60" stroke="#9ec5ad" stroke-width="2"/>

          <rect x="220" y="25" width="170" height="70" rx="4" fill="rgba(139, 179, 156, 0.12)" stroke="#9ec5ad"/>
          <text x="305" y="48" fill="#9ec5ad" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">SELECT Projection</text>
          <text x="305" y="66" fill="#d1d5db" font-family="monospace" font-size="10" text-anchor="middle">Extracts exact columns</text>
          <text x="305" y="82" fill="#dfcaa9" font-family="monospace" font-size="9" text-anchor="middle">Computes AS Aliases</text>

          <path d="M 395 60 L 455 60" stroke="#9ec5ad" stroke-width="2"/>

          <rect x="460" y="35" width="115" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="517" y="58" fill="#9ec5ad" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">FINAL SHAPE</text>
          <text x="517" y="74" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Only desired fields</text>
        </svg>
      `
    },
    {
      id: 'distinct',
      name: 'DISTINCT',
      category: 'Deduplication',
      badgeClass: 'pill-select',
      executionOrder: '04 (Post-Projection Deduplication)',
      summary: 'Removes duplicate rows from the projected result set across ALL selected columns.',
      concept: 'DISTINCT evaluates the COMBINATION of all columns listed in the SELECT clause. It hashes or sorts the projected rows and discards any row that is completely identical to another across every single projected column.',
      syntax: 'SELECT DISTINCT column1, column2 FROM table',
      rules: [
        'Applies to the entire projected row, not just a single column.',
        'Requires an internal sort or hash table in memory, which has a performance cost on large tables.',
        'NULL values are treated as identical duplicates: multiple NULLs are collapsed into one single NULL.'
      ],
      gotcha: 'SELECT DISTINCT city, id does NOT produce unique cities if id is a unique primary key! Every row will remain unique.',
      svgDiagram: `
        <svg viewBox="0 0 600 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="120" fill="#0c0c0f" rx="6" stroke="#232328"/>
          <g transform="translate(40, 25)">
            <rect width="110" height="20" rx="3" fill="#18181b" stroke="#33333b"/>
            <text x="55" y="14" fill="#a1a1aa" font-family="monospace" font-size="9" text-anchor="middle">'New York'</text>
            <rect y="24" width="110" height="20" rx="3" fill="#18181b" stroke="#33333b"/>
            <text x="55" y="38" fill="#a1a1aa" font-family="monospace" font-size="9" text-anchor="middle">'New York' (dup)</text>
            <rect y="48" width="110" height="20" rx="3" fill="#18181b" stroke="#33333b"/>
            <text x="55" y="62" fill="#a1a1aa" font-family="monospace" font-size="9" text-anchor="middle">'Austin'</text>
          </g>

          <path d="M 170 60 L 230 60" stroke="#9ec5ad" stroke-width="2"/>

          <rect x="235" y="25" width="150" height="70" rx="4" fill="rgba(139, 179, 156, 0.12)" stroke="#9ec5ad"/>
          <text x="310" y="50" fill="#9ec5ad" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">DISTINCT Hash</text>
          <text x="310" y="70" fill="#71717a" font-family="monospace" font-size="10" text-anchor="middle">Collapses full matches</text>

          <path d="M 390 60 L 450 60" stroke="#9ec5ad" stroke-width="2"/>

          <g transform="translate(460, 35)">
            <rect width="100" height="22" rx="3" fill="#18181b" stroke="#33333b"/>
            <text x="50" y="15" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="600" text-anchor="middle">'New York'</text>
            <rect y="28" width="100" height="22" rx="3" fill="#18181b" stroke="#33333b"/>
            <text x="50" y="43" fill="#9ec5ad" font-family="monospace" font-size="10" font-weight="600" text-anchor="middle">'Austin'</text>
          </g>
        </svg>
      `
    },
    {
      id: 'order_by',
      name: 'ORDER BY',
      category: 'Sorting & Sequencing',
      badgeClass: 'pill-order',
      executionOrder: '05 (Post-Projection Sorting)',
      summary: 'Sorts the resulting rows ascending (ASC) or descending (DESC), with optional multi-column tie-breakers.',
      concept: 'Without ORDER BY, relational database tables have NO guaranteed ordering! The engine returns rows in arbitrary physical order. ORDER BY executes after SELECT, which is why column aliases created in SELECT are 100% legal to reference here.',
      syntax: 'ORDER BY column1 [ASC|DESC], column2 [ASC|DESC]',
      rules: [
        'Default direction is ASC (Ascending, lowest to highest or A to Z).',
        'Can sort by multiple columns: primary column first, secondary tie-breaker if primary values are identical.',
        'Can reference SELECT column aliases (e.g. ORDER BY salary_usd DESC).',
        'Can sort by expressions or positions (e.g. ORDER BY 2 DESC).'
      ],
      gotcha: 'Sorting strings is alphabetical (lexicographical): "100" comes before "20"!',
      svgDiagram: `
        <svg viewBox="0 0 600 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="120" fill="#0c0c0f" rx="6" stroke="#232328"/>
          <g transform="translate(35, 30)">
            <rect width="100" height="18" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="50" y="13" fill="#a1a1aa" font-family="monospace" font-size="9" text-anchor="middle">Eve (Marks: 65)</text>
            <rect y="22" width="100" height="18" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="50" y="35" fill="#a1a1aa" font-family="monospace" font-size="9" text-anchor="middle">Bob (Marks: 95)</text>
            <rect y="44" width="100" height="18" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="50" y="57" fill="#a1a1aa" font-family="monospace" font-size="9" text-anchor="middle">Alice (Marks: 80)</text>
          </g>

          <path d="M 150 60 L 210 60" stroke="#dfcaa9" stroke-width="2"/>

          <rect x="215" y="25" width="170" height="70" rx="4" fill="rgba(209, 184, 150, 0.12)" stroke="#dfcaa9"/>
          <text x="300" y="48" fill="#dfcaa9" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">ORDER BY Marks DESC</text>
          <text x="300" y="68" fill="#a1a1aa" font-family="monospace" font-size="10" text-anchor="middle">Engine Sort Run (QSort)</text>

          <path d="M 390 60 L 450 60" stroke="#dfcaa9" stroke-width="2"/>

          <g transform="translate(455, 30)">
            <rect width="110" height="18" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="55" y="13" fill="#dfcaa9" font-family="monospace" font-size="9" font-weight="600" text-anchor="middle">Bob (Marks: 95)</text>
            <rect y="22" width="110" height="18" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="55" y="35" fill="#dfcaa9" font-family="monospace" font-size="9" font-weight="600" text-anchor="middle">Alice (Marks: 80)</text>
            <rect y="44" width="110" height="18" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="55" y="57" fill="#dfcaa9" font-family="monospace" font-size="9" font-weight="600" text-anchor="middle">Eve (Marks: 65)</text>
          </g>
        </svg>
      `
    },
    {
      id: 'limit',
      name: 'LIMIT / TOP',
      category: 'Result Slicing',
      badgeClass: 'pill-limit',
      executionOrder: '06 (Final Truncation)',
      summary: 'Restricts the maximum number of rows returned to the client application.',
      concept: 'LIMIT is the very final operational step in a SQL query. Once all rows are found, filtered, projected, deduplicated, and sorted, LIMIT simply clips the output at row N. In SQL Server it is written as TOP N in the SELECT clause, but executes identically.',
      syntax: 'LIMIT count [OFFSET skip_count]',
      rules: [
        'Executes as Step 06—the very last step before data transmission.',
        'Always combine LIMIT with ORDER BY for deterministic results (e.g. "top 3 salaries"). Without ORDER BY, which 3 rows return is unpredictable!',
        'Optional OFFSET allows pagination (e.g. LIMIT 10 OFFSET 20 grabs page 3).'
      ],
      gotcha: 'Using LIMIT without ORDER BY means your result set is non-deterministic (can change between query runs).',
      svgDiagram: `
        <svg viewBox="0 0 600 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="120" fill="#0c0c0f" rx="6" stroke="#232328"/>
          <g transform="translate(40, 20)">
            <rect width="130" height="16" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="65" y="12" fill="#beafcc" font-family="monospace" font-size="9" text-anchor="middle">Row 1: $120,000</text>
            <rect y="20" width="130" height="16" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="65" y="32" fill="#beafcc" font-family="monospace" font-size="9" text-anchor="middle">Row 2: $95,000</text>
            <rect y="40" width="130" height="16" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="65" y="52" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Row 3: $80,000 (cut)</text>
            <rect y="60" width="130" height="16" rx="2" fill="#18181b" stroke="#33333b"/>
            <text x="65" y="72" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Row 4: $65,000 (cut)</text>
          </g>

          <path d="M 190 60 L 260 60" stroke="#beafcc" stroke-width="2"/>

          <rect x="265" y="30" width="140" height="60" rx="4" fill="rgba(171, 155, 184, 0.12)" stroke="#beafcc"/>
          <text x="335" y="54" fill="#beafcc" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">LIMIT 2</text>
          <text x="335" y="72" fill="#71717a" font-family="monospace" font-size="10" text-anchor="middle">Truncates at row 2</text>

          <path d="M 410 60 L 475 60" stroke="#beafcc" stroke-width="2"/>

          <g transform="translate(480, 35)">
            <rect width="90" height="22" rx="2" fill="rgba(171, 155, 184, 0.2)" stroke="#beafcc"/>
            <text x="45" y="15" fill="#beafcc" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">Row 1: $120k</text>
            <rect y="26" width="90" height="22" rx="2" fill="rgba(171, 155, 184, 0.2)" stroke="#beafcc"/>
            <text x="45" y="41" fill="#beafcc" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">Row 2: $95k</text>
          </g>
        </svg>
      `
    },
    {
      id: 'as',
      name: 'AS (Aliases)',
      category: 'Identifier Renaming',
      badgeClass: 'pill-order',
      executionOrder: '03 (Column) / 01 (Table)',
      summary: 'Assigns temporary, human-friendly names to columns or tables during query execution.',
      concept: 'Aliases make queries readable and provide labels for calculated expressions. However, the timing of alias creation determines where they can be used: Table aliases are born in FROM (Step 01), while Column aliases are born in SELECT (Step 03).',
      syntax: 'SELECT col AS new_name FROM table AS t',
      rules: [
        'The AS keyword is optional in SQL, but writing it explicitly is recommended for clarity.',
        'Column aliases can be referenced in ORDER BY, GROUP BY, and HAVING (in MySQL).',
        'Column aliases CANNOT be referenced in WHERE because WHERE executes before SELECT!'
      ],
      gotcha: 'Wrapping aliases with double quotes ("Total Cost") allows spaces, but requires matching case in some SQL dialects.',
      svgDiagram: `
        <svg viewBox="0 0 600 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="120" fill="#0c0c0f" rx="6" stroke="#232328"/>
          <rect x="35" y="35" width="170" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="120" y="58" fill="#d1d5db" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle">salary * 1.15</text>
          <text x="120" y="74" fill="#71717a" font-family="monospace" font-size="9" text-anchor="middle">Raw math expression</text>

          <path d="M 215 60 L 275 60" stroke="#dfcaa9" stroke-width="2"/>

          <rect x="280" y="30" width="140" height="60" rx="4" fill="rgba(209, 184, 150, 0.12)" stroke="#dfcaa9"/>
          <text x="350" y="54" fill="#dfcaa9" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">AS projected_pay</text>
          <text x="350" y="72" fill="#71717a" font-family="monospace" font-size="10" text-anchor="middle">Semantic Renaming</text>

          <path d="M 425 60 L 485 60" stroke="#dfcaa9" stroke-width="2"/>

          <rect x="490" y="35" width="80" height="50" rx="4" fill="#141418" stroke="#33333b"/>
          <text x="530" y="58" fill="#dfcaa9" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">OUTPUT</text>
          <text x="530" y="74" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">projected_pay</text>
        </svg>
      `
    }
  ],

  // ---------------------------------------------------------------------------
  // 2. INTERACTIVE MCQS (FOR EVERY KEYWORD)
  // ---------------------------------------------------------------------------
  mcqs: [
    {
      id: 'mcq_from_1',
      keyword: 'FROM',
      question: 'Which clause does the database engine physically execute FIRST when parsing a SELECT query?',
      options: [
        'SELECT',
        'FROM',
        'WHERE',
        'ORDER BY'
      ],
      correctIndex: 1,
      explanation: 'FROM executes as Step 01. The engine must first bind the table into memory to establish column definitions and row records before it can evaluate conditions or project fields.'
    },
    {
      id: 'mcq_where_1',
      keyword: 'WHERE',
      question: 'Why does the query "SELECT salary * 12 AS annual_pay FROM Employees WHERE annual_pay > 50000;" fail in standard SQL?',
      options: [
        'annual_pay is a reserved keyword in SQL',
        'WHERE executes before SELECT, so annual_pay does not exist yet when WHERE is evaluated',
        'Multiplication cannot be performed inside SELECT',
        'WHERE requires parentheses around all alias names'
      ],
      correctIndex: 1,
      explanation: 'Physical execution order is FROM (1) ➡️ WHERE (2) ➡️ SELECT (3). Because WHERE executes before SELECT, the column alias "annual_pay" has not been defined in engine memory when WHERE inspects rows.'
    },
    {
      id: 'mcq_where_2',
      keyword: 'WHERE',
      question: 'In SQL 3-valued logic, what happens when a WHERE condition evaluates to UNKNOWN (NULL)?',
      options: [
        'The row is returned because NULL represents potential data',
        'The query aborts with an unhandled exception',
        'The row is rejected and excluded from the result set',
        'The engine converts UNKNOWN to TRUE by default'
      ],
      correctIndex: 2,
      explanation: 'Only rows where the WHERE predicate evaluates to strictly TRUE are passed forward. Both FALSE and UNKNOWN (NULL) fail the filter and are excluded.'
    },
    {
      id: 'mcq_select_1',
      keyword: 'SELECT',
      question: 'What is the primary architectural purpose of the SELECT clause in relational algebra?',
      options: [
        'Row restriction and filtration',
        'Column projection and computed expression generation',
        'Disk storage allocation',
        'Network packet transmission'
      ],
      correctIndex: 1,
      explanation: 'SELECT performs "projection" (choosing horizontal fields/expressions), while WHERE performs "selection" or "restriction" (filtering vertical rows).'
    },
    {
      id: 'mcq_distinct_1',
      keyword: 'DISTINCT',
      question: 'Given a table with columns (id INT PRIMARY KEY, department VARCHAR), what does "SELECT DISTINCT department, id FROM Employees" return?',
      options: [
        'Only unique department names, dropping id',
        'Every single row in the table, because id is unique per row',
        'An error because DISTINCT cannot be used with multiple columns',
        'The first row for each department'
      ],
      correctIndex: 1,
      explanation: 'DISTINCT evaluates the COMBINATION of all projected columns. Since id is a unique primary key for every row, every tuple (department, id) is unique, so no rows will be removed!'
    },
    {
      id: 'mcq_order_1',
      keyword: 'ORDER BY',
      question: 'Why is it legal to use a column alias defined in SELECT inside the ORDER BY clause?',
      options: [
        'Because ORDER BY executes after SELECT in the physical lifecycle',
        'Because ORDER BY executes before FROM',
        'Because SQL compilers rewrite all ORDER BY clauses to use column index numbers',
        'It is actually illegal in all SQL dialects'
      ],
      correctIndex: 0,
      explanation: 'ORDER BY runs at Step 05, well after SELECT (Step 03) has executed and created column aliases in working memory.'
    },
    {
      id: 'mcq_order_2',
      keyword: 'ORDER BY',
      question: 'In the clause "ORDER BY Marks DESC, Name ASC", what happens when two students have the exact same Marks (e.g. 80)?',
      options: [
        'Both rows are removed as duplicates',
        'The tie is broken by sorting their Names alphabetically in ascending order',
        'The engine throws an Ambiguous Ordering error',
        'The student with the higher ID is chosen'
      ],
      correctIndex: 1,
      explanation: 'Multi-column ORDER BY uses subsequent columns as secondary tie-breakers. When primary values match, Name ASC determines the relative position.'
    },
    {
      id: 'mcq_limit_1',
      keyword: 'LIMIT',
      question: 'Why is using LIMIT without an ORDER BY clause considered an anti-pattern in data engineering?',
      options: [
        'The query will execute 10x slower',
        'The query output is non-deterministic (engine can return different rows each time)',
        'LIMIT cannot syntactically function without ORDER BY',
        'Database indexes are automatically disabled'
      ],
      correctIndex: 1,
      explanation: 'Without ORDER BY, relational tables have no innate order. The storage engine can return any arbitrary slice of rows based on disk fragmentation or buffer pool state.'
    },
    {
      id: 'mcq_alias_1',
      keyword: 'AS (Aliases)',
      question: 'Which of the following identifier names requires double quotes (or backticks) in SQL?',
      options: [
        'monthly_salary',
        'total_revenue',
        'Monthly Compensation',
        'department_id'
      ],
      correctIndex: 2,
      explanation: 'Any alias containing spaces, special characters, or reserved keywords must be escaped using double quotes ("Monthly Compensation") or MySQL backticks (`Monthly Compensation`).'
    }
  ],

  // ---------------------------------------------------------------------------
  // 3. REAL-WORLD CASE STUDIES
  // ---------------------------------------------------------------------------
  caseStudies: [
    {
      id: 'case_01_stripe_fraud',
      title: 'Stripe Transaction Fraud Velocity Tripwire',
      industry: 'Fintech',
      difficulty: 'Medium',
      scenario: 'When credit card transactions pass through the Stripe ingestion pipeline, automated risk models flag potential chargeback fraud in sub-100ms windows. Transactions originating from foreign cards or exceeding specific risk scores must be classified into actionable operational tiers.',
      schemaSnippet: 'Transactions (tx_id, merchant_category, amount_usd, is_foreign_card, risk_score)',
      businessObjective: 'Categorize transactions into CRITICAL_RISK, SUSPICIOUS, or STANDARD_REVIEW based on monetary amount, foreign origin, and risk score.',
      targetQuery: `SELECT tx_id, merchant_category, amount_usd, risk_score,\n       CASE\n           WHEN risk_score >= 90 OR (amount_usd >= 5000 AND is_foreign_card = TRUE) THEN 'CRITICAL_RISK'\n           WHEN risk_score >= 75 OR amount_usd >= 1000 THEN 'SUSPICIOUS'\n           ELSE 'STANDARD_REVIEW'\n       END AS fraud_decision\nFROM Transactions\nWHERE is_foreign_card = TRUE OR risk_score >= 75\nORDER BY amount_usd DESC, risk_score DESC\nLIMIT 50;`,
      table: 'Transactions'
    },
    {
      id: 'case_02_prime_underwriting',
      title: 'Fintech Credit Underwriting: Prime Customer Acquisition',
      industry: 'Fintech',
      difficulty: 'Easy',
      scenario: 'A digital lending neobank is launching an invitation-only premium credit card. Guidelines require identifying verified US accounts with a FICO score of 720+ who have maintained an active account for at least 12 months. Each applicant must be assigned a monthly limit ($15 per score point).',
      schemaSnippet: 'Customers (customer_id, full_name, credit_score, country, tenure_months)',
      businessObjective: 'Extract unique US customers with credit_score >= 720, calculating initial limit, sorted by tenure descending, limited to 10 records.',
      targetQuery: `SELECT DISTINCT full_name, credit_score, (credit_score * 15) AS monthly_credit_limit, tenure_months\nFROM Customers\nWHERE country = 'USA' AND credit_score >= 720 AND tenure_months >= 12\nORDER BY tenure_months DESC, credit_score DESC\nLIMIT 10;`,
      table: 'Customers'
    },
    {
      id: 'case_03_saas_churn',
      title: 'B2B Account Churn Risk & Contraction Classifier',
      industry: 'SaaS',
      difficulty: 'Medium',
      scenario: 'Customer Success leadership monitors subscription health ahead of annual enterprise renewals. Accounts with zero logins in the past 30 days or seat utilization under 40% are at imminent risk of contraction or cancellation.',
      schemaSnippet: 'SubscriptionAccounts (account_id, company_name, plan_tier, licensed_seats, active_seats, days_since_last_login)',
      businessObjective: 'Calculate seat utilization percentage and categorize accounts into IMMINENT_CHURN, NEEDS_OUTREACH, or HEALTHY.',
      targetQuery: `SELECT company_name, plan_tier, licensed_seats, active_seats,\n       ROUND((active_seats * 100.0 / licensed_seats), 1) AS seat_utilization_pct,\n       CASE\n           WHEN days_since_last_login > 30 OR (active_seats * 1.0 / licensed_seats) < 0.25 THEN 'IMMINENT_CHURN'\n           WHEN days_since_last_login > 14 OR (active_seats * 1.0 / licensed_seats) < 0.50 THEN 'NEEDS_OUTREACH'\n           ELSE 'HEALTHY'\n       END AS account_health_status\nFROM SubscriptionAccounts\nWHERE plan_tier IN ('Enterprise', 'Growth')\nORDER BY seat_utilization_pct ASC, days_since_last_login DESC;`,
      table: 'SubscriptionAccounts'
    },
    {
      id: 'case_04_freemium_gate',
      title: 'Freemium Cloud Compute Gatekeeper & Upgrade Tiers',
      industry: 'SaaS',
      difficulty: 'Easy',
      scenario: 'A serverless database provider offers free-tier compute. When users exceed monthly execution limits, automated rate-limiting flags them for enterprise sales outreach or throttles their concurrency.',
      schemaSnippet: 'DeveloperTenants (tenant_id, org_name, monthly_vcpuhours, storage_gb, is_billing_verified)',
      businessObjective: 'Flag all unverified free tenants that exceed 100 vCPU-hours or 50GB storage, categorizing them into sales lead priorities.',
      targetQuery: `SELECT org_name, monthly_vcpuhours, storage_gb,\n       CASE\n           WHEN monthly_vcpuhours >= 250 OR storage_gb >= 100 THEN 'HOT_SALES_LEAD'\n           WHEN monthly_vcpuhours >= 100 OR storage_gb >= 50 THEN 'WARM_UPGRADE_CANDIDATE'\n           ELSE 'STANDARD_FREE'\n       END AS sales_motion_tier\nFROM DeveloperTenants\nWHERE is_billing_verified = FALSE AND (monthly_vcpuhours >= 100 OR storage_gb >= 50)\nORDER BY monthly_vcpuhours DESC;`,
      table: 'DeveloperTenants'
    },
    {
      id: 'case_05_vip_loyalty',
      title: 'VIP Customer Tiering & Loyalty Multipliers',
      industry: 'E-Commerce',
      difficulty: 'Medium',
      scenario: 'An omni-channel luxury retailer calculates customer loyalty tiers annually based on trailing 12-month net spend. Platinum and Gold members receive accelerated reward multipliers (3x and 2x points).',
      schemaSnippet: 'LoyaltyMembers (member_id, full_name, annual_spend, return_rate_pct, preferred_category)',
      businessObjective: 'Assign loyalty tiers and reward multipliers to members who maintain return rates below 20%.',
      targetQuery: `SELECT full_name, annual_spend, return_rate_pct,\n       CASE\n           WHEN annual_spend >= 10000 THEN 'PLATINUM (3x Points)'\n           WHEN annual_spend >= 5000 THEN 'GOLD (2x Points)'\n           WHEN annual_spend >= 1500 THEN 'SILVER (1.5x Points)'\n           ELSE 'BRONZE (1x Points)'\n       END AS loyalty_tier\nFROM LoyaltyMembers\nWHERE return_rate_pct < 20.0\nORDER BY annual_spend DESC\nLIMIT 25;`,
      table: 'LoyaltyMembers'
    },
    {
      id: 'case_06_express_routing',
      title: 'Express vs Standard Fulfillment SLA Routing',
      industry: 'E-Commerce',
      difficulty: 'Easy',
      scenario: 'An automated distribution hub batches pending orders into delivery lanes. Orders marked Prime or orders over $150 qualify for next-day air dispatch, while remaining packages route via standard ground carrier.',
      schemaSnippet: 'Orders (order_id, order_total, is_prime_member, destination_zip, order_status)',
      businessObjective: 'Route pending packages to AIR_DISPATCH or GROUND_CARRIER based on Prime status and total cart value.',
      targetQuery: `SELECT order_id, order_total, is_prime_member, destination_zip,\n       CASE\n           WHEN is_prime_member = TRUE OR order_total >= 150.00 THEN 'AIR_DISPATCH_NEXT_DAY'\n           ELSE 'GROUND_CARRIER_STANDARD'\n       END AS fulfillment_routing\nFROM Orders\nWHERE order_status = 'PENDING_FULFILLMENT'\nORDER BY order_total DESC;`,
      table: 'Orders'
    },
    {
      id: 'case_07_er_triage',
      title: 'Emergency Room Triage Acuity Matrix (ESI Tiers)',
      industry: 'Healthcare',
      difficulty: 'Hard',
      scenario: 'Hospital emergency departments use the Emergency Severity Index (ESI 1 through 5) to categorize patient acuity upon check-in. Patients with oxygen saturation < 85% or pulse > 130 bpm must immediately bypass the waiting room.',
      schemaSnippet: 'PatientIntake (intake_id, patient_name, pulse_bpm, o2_saturation, is_unresponsive)',
      businessObjective: 'Assign ESI triage priority levels using strict medical safety waterfall ordering.',
      targetQuery: `SELECT patient_name, pulse_bpm, o2_saturation,\n       CASE\n           WHEN is_unresponsive = TRUE OR o2_saturation < 85 THEN 'ESI-1: RESUSCITATION (IMMEDIATE)'\n           WHEN o2_saturation < 92 OR pulse_bpm > 130 OR pulse_bpm < 45 THEN 'ESI-2: EMERGENT (10 MIN MAX)'\n           WHEN pulse_bpm BETWEEN 100 AND 130 THEN 'ESI-3: URGENT'\n           ELSE 'ESI-4: NON-URGENT'\n       END AS triage_level\nFROM PatientIntake\nORDER BY o2_saturation ASC, pulse_bpm DESC;`,
      table: 'PatientIntake'
    },
    {
      id: 'case_08_pediatric_dosage',
      title: 'Pediatric Dosage Safety Boundary Validator',
      industry: 'Healthcare',
      difficulty: 'Easy',
      scenario: 'Automated medication dispensing cabinets verify that prescribed liquid amoxicillin doses fall strictly within safe pediatric weight-adjusted milligram boundaries (40mg/kg/day to 90mg/kg/day).',
      schemaSnippet: 'Prescriptions (rx_id, patient_weight_kg, prescribed_mg_day, drug_name)',
      businessObjective: 'Verify pediatric antibiotic dosages and flag safe vs out-of-boundary prescriptions.',
      targetQuery: `SELECT rx_id, drug_name, patient_weight_kg, prescribed_mg_day,\n       CASE\n           WHEN prescribed_mg_day BETWEEN (patient_weight_kg * 40) AND (patient_weight_kg * 90) THEN 'DOSAGE_SAFE'\n           WHEN prescribed_mg_day > (patient_weight_kg * 90) THEN 'OVERDOSE_WARNING'\n           ELSE 'UNDERDOSE_INEFFECTIVE'\n       END AS clinical_safety_status\nFROM Prescriptions\nWHERE drug_name = 'Amoxicillin';`,
      table: 'Prescriptions'
    },
    {
      id: 'case_09_drone_battery',
      title: 'Autonomous Delivery Drone Battery & Cargo Gate',
      industry: 'Logistics',
      difficulty: 'Medium',
      scenario: 'Fleet dispatch software monitors delivery drones before releasing them from launch pads. A drone cannot take off if its payload exceeds 4.5kg, or if its battery percentage is below 40% for missions exceeding 5km.',
      schemaSnippet: 'DroneFleet (drone_id, battery_pct, payload_kg, mission_distance_km, motor_health_score)',
      businessObjective: 'Determine flight clearance status for scheduled missions based on battery and cargo boundaries.',
      targetQuery: `SELECT drone_id, battery_pct, payload_kg, mission_distance_km,\n       CASE\n           WHEN payload_kg > 4.5 OR motor_health_score < 80 THEN 'GROUNDED_MAINTENANCE'\n           WHEN mission_distance_km > 5.0 AND battery_pct < 40 THEN 'GROUNDED_LOW_BATTERY'\n           WHEN mission_distance_km <= 5.0 AND battery_pct < 25 THEN 'GROUNDED_LOW_BATTERY'\n           ELSE 'CLEARED_FOR_TAKEOFF'\n       END AS flight_clearance\nFROM DroneFleet\nORDER BY flight_clearance ASC, battery_pct ASC;`,
      table: 'DroneFleet'
    },
    {
      id: 'case_10_late_delivery',
      title: 'Carrier Late Delivery Penalty Escalation',
      industry: 'Logistics',
      difficulty: 'Medium',
      scenario: 'Freight contracts stipulate financial liquidated damages when logistics carriers deliver shipments past agreed delivery SLA windows. Penalties escalate in tiers based on delay minutes.',
      schemaSnippet: 'ShipmentTracking (tracking_id, carrier_name, sla_minutes, actual_delivery_minutes, freight_cost)',
      businessObjective: 'Calculate delay minutes and assign contract penalty percentage tiers.',
      targetQuery: `SELECT tracking_id, carrier_name,\n       (actual_delivery_minutes - sla_minutes) AS delay_minutes,\n       CASE\n           WHEN actual_delivery_minutes <= sla_minutes THEN 'ON_TIME (0% Penalty)'\n           WHEN (actual_delivery_minutes - sla_minutes) <= 60 THEN 'MINOR_DELAY (5% Penalty)'\n           WHEN (actual_delivery_minutes - sla_minutes) <= 180 THEN 'MODERATE_DELAY (15% Penalty)'\n           ELSE 'SEVERE_BREACH (30% Penalty)'\n       END AS penalty_assessment\nFROM ShipmentTracking\nWHERE actual_delivery_minutes > sla_minutes\nORDER BY delay_minutes DESC;`,
      table: 'ShipmentTracking'
    },
    {
      id: 'case_11_streaming_agegate',
      title: 'Content Age-Gate & Parental Advisory Routing',
      industry: 'Media',
      difficulty: 'Easy',
      scenario: 'A streaming entertainment service serves titles across multiple user profiles. In child profiles (under 13), titles rated R, TV-MA, or NC-17 must be blocked, while PG-13 content requires parental passcodes.',
      schemaSnippet: 'MediaCatalog (title, mpaa_rating, genre, content_warning_tags)',
      businessObjective: 'Categorize catalog titles for child profile accessibility using set membership (IN).',
      targetQuery: `SELECT title, genre, mpaa_rating,\n       CASE\n           WHEN mpaa_rating IN ('R', 'TV-MA', 'NC-17') THEN 'RESTRICTED_LOCKED'\n           WHEN mpaa_rating = 'PG-13' THEN 'PARENTAL_PIN_REQUIRED'\n           ELSE 'OPEN_ACCESS'\n       END AS child_profile_permission\nFROM MediaCatalog\nORDER BY title ASC;`,
      table: 'MediaCatalog'
    },
    {
      id: 'case_12_bruteforce_ip',
      title: 'Brute-Force IP Lockout & Anomaly Detection',
      industry: 'Cybersecurity',
      difficulty: 'Hard',
      scenario: 'An authentication gateway analyzes failed login attempts. An IP subnet recording 10+ failed attempts within a monitoring window is flagged for automatic firewall blacklisting unless it originates from a whitelisted VPN block (10.0.%.%).',
      schemaSnippet: 'AuthAuditLog (source_ip, failed_attempts, country_code, is_vpn)',
      businessObjective: 'Identify and classify suspicious authentication IPs for automated firewall response using LIKE wildcards.',
      targetQuery: `SELECT source_ip, failed_attempts, country_code,\n       CASE\n           WHEN source_ip LIKE '10.0.%' THEN 'INTERNAL_VPN_ALERT'\n           WHEN failed_attempts >= 25 THEN 'AUTOMATIC_PERMANENT_BAN'\n           WHEN failed_attempts >= 10 THEN 'TEMPORARY_RATE_LIMIT_60M'\n           ELSE 'MONITOR'\n       END AS firewall_action\nFROM AuthAuditLog\nWHERE failed_attempts >= 5\nORDER BY failed_attempts DESC;`,
      table: 'AuthAuditLog'
    },
    {
      id: 'case_13_exec_bonus',
      title: 'Executive Equity Vesting & Bonus Brackets',
      industry: 'Human Resources',
      difficulty: 'Medium',
      scenario: 'Year-end corporate compensation committees evaluate executive performance based on individual OKR completion rates to assign multiplier brackets for staff with tenure >= 2 years.',
      schemaSnippet: 'ExecutiveReview (executive_id, executive_name, department, okr_completion_pct, tenure_years)',
      businessObjective: 'Calculate equity acceleration tiers for executives with tenure >= 2 years.',
      targetQuery: `SELECT executive_name, department, okr_completion_pct, tenure_years,\n       CASE\n           WHEN okr_completion_pct >= 115.0 THEN 'SUPERIOR (150% Bonus + 1.25x Vesting)'\n           WHEN okr_completion_pct >= 100.0 THEN 'TARGET (100% Bonus + 1.0x Vesting)'\n           WHEN okr_completion_pct >= 85.0 THEN 'THRESHOLD (75% Bonus + Standard Vesting)'\n           ELSE 'BELOW_EXPECTATION (0% Bonus)'\n       END AS bonus_vesting_bracket\nFROM ExecutiveReview\nWHERE tenure_years >= 2\nORDER BY okr_completion_pct DESC;`,
      table: 'ExecutiveReview'
    },
    {
      id: 'case_14_robotics_triangle',
      title: 'Sensor Distance Triangle Geometry Verification',
      industry: 'Hardware & Robotics',
      difficulty: 'Hard',
      scenario: 'An autonomous warehouse drone uses 3 ultrasound distance sensors (A, B, C) to map triangular boundary walls. If any measurement violates the Triangle Inequality Theorem, the polygon is invalid and flagged for sensor re-calibration.',
      schemaSnippet: 'TRIANGLES (A, B, C)',
      businessObjective: 'Evaluate sides A, B, C and classify them as Equilateral, Isosceles, Scalene, or Not A Triangle using strict short-circuit logic.',
      targetQuery: `SELECT A, B, C,\n       CASE\n           WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n           WHEN A = B AND B = C THEN 'Equilateral'\n           WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n           ELSE 'Scalene'\n       END AS triangle_type\nFROM TRIANGLES;`,
      table: 'TRIANGLES'
    },
    {
      id: 'case_15_aml_structuring',
      title: 'Anti-Money Laundering (AML) Structuring Tripwire',
      industry: 'Fintech',
      difficulty: 'Hard',
      scenario: 'Federal regulations require Currency Transaction Reports (CTRs) for cash deposits exceeding $10,000. Criminal actors attempt structuring (smurfing)—intentionally making cash deposits between $8,500 and $9,999 to evade reporting thresholds.',
      schemaSnippet: 'DepositLedger (deposit_id, account_id, amount_usd, deposit_channel, customer_occupation)',
      businessObjective: 'Flag suspicious cash deposits sitting immediately under the federal $10,000 CTR reporting threshold.',
      targetQuery: `SELECT deposit_id, account_id, amount_usd, deposit_channel,\n       CASE\n           WHEN amount_usd BETWEEN 8500.00 AND 9999.99 THEN 'SUSPICIOUS_STRUCTURING_FLAG'\n           WHEN amount_usd >= 10000.00 THEN 'MANDATORY_CTR_FILING'\n           ELSE 'STANDARD_ACTIVITY'\n       END AS aml_compliance_tier\nFROM DepositLedger\nWHERE deposit_channel = 'CASH_TELLER' AND amount_usd >= 8500.00\nORDER BY amount_usd DESC;`,
      table: 'DepositLedger'
    }
  ],

  // ---------------------------------------------------------------------------
  // 4. GRADED PRACTICE PROBLEM BANK (EASY / MEDIUM / HARD)
  // ---------------------------------------------------------------------------
  problems: [
    {
      id: 'prob_foundations_01',
      title: 'Filter High Earners in Tech',
      difficulty: 'Easy',
      points: 15,
      category: 'WHERE & SELECT',
      table: 'Employees',
      prompt: 'Write a query to select the first_name, last_name, and salary of all employees in the "Engineering" department whose salary is strictly greater than 85,000. Order by salary descending.',
      starterSQL: 'SELECT first_name, last_name, salary\nFROM Employees\nWHERE department = \'Engineering\' AND salary > 85000\nORDER BY salary DESC;',
      solutionSQL: 'SELECT first_name, last_name, salary\nFROM Employees\nWHERE department = \'Engineering\' AND salary > 85000\nORDER BY salary DESC;',
      expectedCount: 2
    },
    {
      id: 'prob_foundations_02',
      title: 'Deduplicated Customer Cities',
      difficulty: 'Easy',
      points: 15,
      category: 'DISTINCT & ORDER BY',
      table: 'Customers',
      prompt: 'Query a list of unique city names from the Customers table for accounts in the "USA". Sort the cities alphabetically in ascending order.',
      starterSQL: 'SELECT DISTINCT city\nFROM Customers\nWHERE country = \'USA\'\nORDER BY city ASC;',
      solutionSQL: 'SELECT DISTINCT city\nFROM Customers\nWHERE country = \'USA\'\nORDER BY city ASC;',
      expectedCount: 3
    },
    {
      id: 'prob_foundations_03',
      title: 'Top 3 High Honors Students',
      difficulty: 'Medium',
      points: 25,
      category: 'ORDER BY & LIMIT',
      table: 'STUDENTS',
      prompt: 'Find the top 3 students who scored more than 75 Marks. Order the result primarily by Marks descending, and break any score ties by Name ascending.',
      starterSQL: 'SELECT ID, Name, Marks\nFROM STUDENTS\nWHERE Marks > 75\nORDER BY Marks DESC, Name ASC\nLIMIT 3;',
      solutionSQL: 'SELECT ID, Name, Marks\nFROM STUDENTS\nWHERE Marks > 75\nORDER BY Marks DESC, Name ASC\nLIMIT 3;',
      expectedCount: 3
    },
    {
      id: 'prob_foundations_04',
      title: 'Suffix Sorting on Student Names',
      difficulty: 'Medium',
      points: 25,
      category: 'Functions & Tie-Breakers',
      table: 'STUDENTS',
      prompt: 'Query the Name of any student in STUDENTS who scored higher than 75 Marks. Order your output by the LAST THREE CHARACTERS of each name. If two names end in the same 3 characters, sort them by ascending ID.',
      starterSQL: 'SELECT Name\nFROM STUDENTS\nWHERE Marks > 75\nORDER BY RIGHT(Name, 3) ASC, ID ASC;',
      solutionSQL: 'SELECT Name\nFROM STUDENTS\nWHERE Marks > 75\nORDER BY RIGHT(Name, 3) ASC, ID ASC;',
      expectedCount: 4
    },
    {
      id: 'prob_foundations_05',
      title: 'Triangle Geometry Classification',
      difficulty: 'Hard',
      points: 35,
      category: 'CASE WHEN & Inequality',
      table: 'TRIANGLES',
      prompt: 'Write a query identifying the type of each record in the TRIANGLES table using its three side lengths A, B, and C. Correctly handle degenerate non-triangles first, then Equilateral, Isosceles, and Scalene.',
      starterSQL: 'SELECT \n    CASE\n        WHEN A + B <= C OR A + C <= B OR B + C <= A THEN \'Not A Triangle\'\n        WHEN A = B AND B = C THEN \'Equilateral\'\n        WHEN A = B OR B = C OR A = C THEN \'Isosceles\'\n        ELSE \'Scalene\'\n    END AS triangle_type\nFROM TRIANGLES;',
      solutionSQL: 'SELECT \n    CASE\n        WHEN A + B <= C OR A + C <= B OR B + C <= A THEN \'Not A Triangle\'\n        WHEN A = B AND B = C THEN \'Equilateral\'\n        WHEN A = B OR B = C OR A = C THEN \'Isosceles\'\n        ELSE \'Scalene\'\n    END AS triangle_type\nFROM TRIANGLES;',
      expectedCount: 15
    }
  ]
};
