// =============================================================================
// SQL FOUNDRY: LEARNING JOURNEY & ADVENTURE ROADMAP ENGINE
// - 20-Day Systematic Curriculum Progression
// - Sir Bloops Mascot Checkpoint Tracking (Bloub moves forward as you master each topic)
// - Interactive Activity Heatmap with Streaks, XP & Quest Counts
// - Detailed Day-by-Day Dossiers (Objectives, Mental Models, Silent Traps, Links)
// - LocalStorage Persistence & Celebratory Advancement Animations
// =============================================================================

const LEARNING_JOURNEY_DAYS = [
  {
    day: 1,
    title: "Day 01: SELECT, Column Aliasing & Mathematical Projections",
    shortName: "SELECT & Projections",
    category: "Foundations",
    badgeColor: "#38bdf8",
    sectionKey: "section1",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Welcome to Day 1! Remember that SELECT is evaluated near the end of the query execution pipeline, NOT first! Never try to filter a SELECT alias in WHERE!",
    objectives: [
      "Master the physical query execution pipeline (FROM -> WHERE -> GROUP BY -> SELECT)",
      "Project clean column aliases using AS keyword",
      "Perform arithmetic projections (+, -, *, /) respecting operator precedence"
    ],
    mentalModel: [
      "The database first locates the table (FROM), filters rows (WHERE), and only then picks and renames columns (SELECT).",
      "Aliases created in SELECT do not exist yet when WHERE is evaluated."
    ],
    silentTraps: [
      "Referencing a SELECT alias in the WHERE clause triggers an immediate compile failure.",
      "Integer division truncates decimals in SQL Server / PostgreSQL unless cast to numeric."
    ],
    practiceGoal: "Complete Section 01 Levels 1–20 to master foundational syntax."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(56,189,248,0.2)"/>
  <text x="410" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 01: PHYSICAL QUERY EXECUTION PIPELINE (SELECT IS EVALUATED 5TH, NOT 1ST!)</text>
  <g transform="translate(15, 52)">
    <rect x="0" y="0" width="90" height="65" fill="rgba(56,189,248,0.08)" rx="6" stroke="rgba(56,189,248,0.3)"/>
    <text x="45" y="20" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">01. FROM</text>
    <text x="45" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Bind Tables</text>
    <text x="45" y="52" fill="#64748b" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">RAM Buffer</text>
    <path d="M 94 32 L 106 32" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="110" y="0" width="90" height="65" fill="rgba(244,63,94,0.08)" rx="6" stroke="rgba(244,63,94,0.3)"/>
    <text x="155" y="20" fill="#fb7185" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">02. WHERE</text>
    <text x="155" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Row Filters</text>
    <text x="155" y="52" fill="#64748b" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Discards Rows</text>
    <path d="M 204 32 L 216 32" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="220" y="0" width="95" height="65" fill="rgba(251,191,36,0.08)" rx="6" stroke="rgba(251,191,36,0.3)"/>
    <text x="267" y="20" fill="#fbbf24" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">03. GROUP</text>
    <text x="267" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Hash Buckets</text>
    <text x="267" y="52" fill="#64748b" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Partitions</text>
    <path d="M 319 32 L 331 32" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="335" y="0" width="95" height="65" fill="rgba(244,114,182,0.08)" rx="6" stroke="rgba(244,114,182,0.3)"/>
    <text x="382" y="20" fill="#f472b6" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">04. HAVING</text>
    <text x="382" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Group Filter</text>
    <text x="382" y="52" fill="#64748b" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Agg Filter</text>
    <path d="M 434 32 L 446 32" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="450" y="0" width="105" height="65" fill="rgba(34,197,94,0.12)" rx="6" stroke="#22c55e" stroke-width="1.5"/>
    <text x="502" y="20" fill="#4ade80" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">05. SELECT</text>
    <text x="502" y="38" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" text-anchor="middle">Projections</text>
    <text x="502" y="52" fill="#4ade80" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">Aliases Named</text>
    <path d="M 559 32 L 571 32" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="575" y="0" width="95" height="65" fill="rgba(192,132,252,0.08)" rx="6" stroke="rgba(192,132,252,0.3)"/>
    <text x="622" y="20" fill="#c084fc" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">06. DISTINCT</text>
    <text x="622" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Deduplicate</text>
    <text x="622" y="52" fill="#64748b" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Hash Map</text>
    <path d="M 674 32 L 686 32" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="690" y="0" width="100" height="65" fill="rgba(250,204,21,0.08)" rx="6" stroke="rgba(250,204,21,0.3)"/>
    <text x="740" y="20" fill="#facc15" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">07. ORDER/LMT</text>
    <text x="740" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Sort Heap</text>
    <text x="740" y="52" fill="#64748b" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Top N Slice</text>
  </g>
  <rect x="15" y="126" width="790" height="42" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
  <text x="25" y="144" fill="#fb7185" font-family="monospace" font-size="9.5" font-weight="900">&#x26a0;&#xfe0f; WHY ALIASES FAIL IN WHERE:</text>
  <text x="235" y="144" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">WHERE runs at Step 02, while SELECT aliases only register at Step 05.</text>
  <text x="25" y="159" fill="#4ade80" font-family="monospace" font-size="9.5" font-weight="900">&#x1f4a1; WHY ALIASES WORK IN ORDER BY:</text>
  <text x="235" y="159" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">ORDER BY runs at Step 07, AFTER Step 05 has projected all columns and saved aliases in RAM.</text>
</svg>`
  },
  {
    day: 2,
    title: "Day 02: WHERE Predicates, Pattern Matching & 3-Valued Logic",
    shortName: "WHERE & 3-Valued Logic",
    category: "Filtering",
    badgeColor: "#10b981",
    sectionKey: "section2",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Ah, the treacherous waters of NULL! Never use `= NULL` or `!= NULL`—SQL uses Three-Valued Logic where NULL comparisons yield UNKNOWN!",
    objectives: [
      "Master row-level filtering with comparison and logical operators (AND, OR, NOT)",
      "Safely handle NULL values using IS NULL and IS NOT NULL",
      "Use pattern matching with LIKE ('%abc_') and IN lists"
    ],
    mentalModel: [
      "In Three-Valued Logic: TRUE, FALSE, and UNKNOWN.",
      "WHERE only retains rows where the predicate evaluates strictly to TRUE. UNKNOWN rows are discarded silently."
    ],
    silentTraps: [
      "col = NULL yields UNKNOWN and returns 0 rows without throwing an error.",
      "NOT IN (..., NULL) evaluates to UNKNOWN for all rows, returning an empty result set."
    ],
    practiceGoal: "Solve 20 WHERE predicate quests to master three-valued logic."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(16,185,129,0.2)"/>
  <text x="410" y="30" fill="#10b981" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 02: THREE-VALUED LOGIC (3VL) &amp; THE DEADLY NOT IN (NULL) CATASTROPHE</text>
  <g transform="translate(20, 48)">
    <rect width="375" height="118" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#f59e0b" font-family="monospace" font-size="10" font-weight="900">3-VALUED TRUTH TABLE</text>
    <text x="15" y="38" fill="#94a3b8" font-family="monospace" font-size="9.5">col = NULL           &#x2794;  <tspan fill="#fb7185" font-weight="bold">UNKNOWN</tspan> (Dropped by WHERE)</text>
    <text x="15" y="55" fill="#94a3b8" font-family="monospace" font-size="9.5">col IS NULL          &#x2794;  <tspan fill="#4ade80" font-weight="bold">TRUE / FALSE</tspan> (Safe Check)</text>
    <text x="15" y="72" fill="#94a3b8" font-family="monospace" font-size="9.5">TRUE AND UNKNOWN     &#x2794;  <tspan fill="#fb7185" font-weight="bold">UNKNOWN</tspan> (Dropped)</text>
    <text x="15" y="89" fill="#94a3b8" font-family="monospace" font-size="9.5">FALSE AND UNKNOWN    &#x2794;  <tspan fill="#94a3b8" font-weight="bold">FALSE</tspan> (Dropped)</text>
    <text x="15" y="106" fill="#94a3b8" font-family="monospace" font-size="9.5">TRUE OR UNKNOWN      &#x2794;  <tspan fill="#4ade80" font-weight="bold">TRUE</tspan> (Kept by WHERE!)</text>
  </g>
  <g transform="translate(415, 48)">
    <rect width="385" height="118" fill="rgba(244,63,94,0.06)" rx="6" stroke="rgba(244,63,94,0.25)"/>
    <text x="15" y="20" fill="#fb7185" font-family="monospace" font-size="10" font-weight="900">&#x2620;&#xfe0f; THE 'NOT IN (..., NULL)' TRAP</text>
    <text x="15" y="40" fill="#e2e8f0" font-family="monospace" font-size="9">WHERE id NOT IN (1, 2, NULL)</text>
    <text x="15" y="56" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">Expands to: (id != 1) AND (id != 2) AND (id != NULL)</text>
    <text x="15" y="72" fill="#fb7185" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold">(id != NULL) yields UNKNOWN &#x2794; Whole predicate evaluates to UNKNOWN!</text>
    <text x="15" y="90" fill="#4ade80" font-family="monospace" font-size="9">&#x1f6e1;&#xfe0f; PRODUCTION REMEDY: NOT EXISTS</text>
    <text x="15" y="105" fill="#94a3b8" font-family="monospace" font-size="8.5">WHERE NOT EXISTS (SELECT 1 FROM Blocked b WHERE b.id = u.id)</text>
  </g>
</svg>`
  },
  {
    day: 3,
    title: "Day 03: ORDER BY Sorting, NULL Ordering & Pagination Slicing",
    shortName: "ORDER BY & Pagination",
    category: "Sorting",
    badgeColor: "#f59e0b",
    sectionKey: "section3",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Relational tables are unordered mathematical sets! Without an explicit ORDER BY, row ordering is completely non-deterministic!",
    objectives: [
      "Sort single and multiple columns with ASC and DESC",
      "Control NULL positioning using NULLS FIRST and NULLS LAST",
      "Implement deterministic pagination with LIMIT and OFFSET"
    ],
    mentalModel: [
      "SQL engines do not guarantee row order across queries or server restarts unless ORDER BY is specified.",
      "Always include a unique tie-breaker column (e.g. id) in paginated queries to prevent row shifting."
    ],
    silentTraps: [
      "Offset pagination without a unique secondary sort key causes missing or duplicate rows across pages.",
      "Dialects differ on default NULL sorting (PostgreSQL puts NULLs last in ASC, Oracle puts them first)."
    ],
    practiceGoal: "Clear 20 sorting quests to guarantee deterministic result sets."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(245,158,11,0.2)"/>
  <text x="410" y="30" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 03: PHYSICAL SORT ENGINE &bull; IN-MEMORY PRIORITY HEAP vs. DISK FILESORT</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(34,197,94,0.06)" rx="6" stroke="rgba(34,197,94,0.25)"/>
    <text x="15" y="20" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900">&#x26a1; PATH A: IN-MEMORY PRIORITY HEAP</text>
    <text x="15" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Triggered by ORDER BY ... LIMIT N when N fits in sort_buffer</text>
    <rect x="15" y="48" width="345" height="24" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="64" fill="#4ade80" font-family="monospace" font-size="9.5">Maintains Top N elements in RAM (O(M * log N))</text>
    <text x="15" y="90" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Latency: ~1.2ms &bull; Zero Disk I/O &bull; Streams top rows instantly</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(244,63,94,0.06)" rx="6" stroke="rgba(244,63,94,0.25)"/>
    <text x="15" y="20" fill="#fb7185" font-family="monospace" font-size="10" font-weight="900">&#x26a0;&#xfe0f; PATH B: DISK-SPILL FILESORT MERGE</text>
    <text x="15" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Triggered when dataset exceeds sort_buffer_size</text>
    <rect x="15" y="48" width="355" height="24" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="64" fill="#fb7185" font-family="monospace" font-size="9.5">Spills intermediate chunks to disk temp files</text>
    <text x="15" y="90" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Latency: ~450ms &bull; Disk Bottleneck &bull; Fix: Composite B-Tree index</text>
  </g>
</svg>`
  },
  {
    day: 4,
    title: "Day 04: GROUP BY Aggregation Buckets & HAVING Filters",
    shortName: "Aggregations & HAVING",
    category: "Aggregations",
    badgeColor: "#a855f7",
    sectionKey: "section4",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Remember: WHERE filters raw rows before aggregation; HAVING filters collapsed summary buckets after aggregation!",
    objectives: [
      "Aggregate row sets using COUNT, SUM, AVG, MIN, and MAX",
      "Group datasets by categorical attributes with GROUP BY",
      "Filter aggregate metrics using the HAVING clause"
    ],
    mentalModel: [
      "GROUP BY collapses thousands of raw records into single summary rows per unique key.",
      "Any unaggregated column in SELECT must be included in the GROUP BY clause."
    ],
    silentTraps: [
      "COUNT(*) counts all rows including NULLs; COUNT(column) ignores NULLs and can distort denominators.",
      "Writing WHERE SUM(amount) > 1000 causes an error; aggregate filters must go in HAVING."
    ],
    practiceGoal: "Complete 20 aggregation quests to master group-level analytics."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(168,85,247,0.2)"/>
  <text x="410" y="30" fill="#c084fc" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 04: TWO-PHASE HASH AGGREGATION &amp; ONLY_FULL_GROUP_BY STANDARD</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900">RAM HASH ACCUMULATOR SLOTS</text>
    <rect x="15" y="32" width="165" height="42" fill="rgba(56,189,248,0.08)" rx="4" stroke="rgba(56,189,248,0.25)"/>
    <text x="25" y="48" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">Dept: 'Eng'</text>
    <text x="25" y="63" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Sum: 177k | Count: 2</text>
    <rect x="195" y="32" width="165" height="42" fill="rgba(16,185,129,0.08)" rx="4" stroke="rgba(16,185,129,0.25)"/>
    <text x="205" y="48" fill="#10b981" font-family="monospace" font-size="9" font-weight="bold">Dept: 'Sales'</text>
    <text x="205" y="63" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Sum: 132k | Count: 2</text>
    <text x="15" y="95" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="8.5">&#x26a1; NULL Rule: COUNT(*) counts NULL rows; COUNT(col) skips them!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#fb7185" font-family="monospace" font-size="10" font-weight="900">&#x1f6e1;&#xfe0f; ONLY_FULL_GROUP_BY STANDARD RULE</text>
    <text x="15" y="40" fill="#fb7185" font-family="monospace" font-size="9">&#x274c; ILLEGAL: SELECT dept, name, AVG(sal)</text>
    <text x="15" y="55" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">'name' is unaggregated and non-deterministic.</text>
    <text x="15" y="78" fill="#4ade80" font-family="monospace" font-size="9">&#x2705; COMPLIANT: Include in GROUP BY or wrap in MAX()</text>
    <text x="15" y="95" fill="#cbd5e1" font-family="monospace" font-size="8.5">SELECT dept, MAX(name), AVG(sal) GROUP BY dept;</text>
  </g>
</svg>`
  },
  {
    day: 5,
    title: "Day 05: INNER & LEFT JOINs (Relational Stitching & Outer Silencing)",
    shortName: "INNER & LEFT JOINs",
    category: "Joins",
    badgeColor: "#06b6d4",
    sectionKey: "section5",
    questRange: "Quests 1 – 60 (INNER & LEFT Disciplines)",
    sirBloopsAdvice: "The #1 bug in production SQL: putting a filter on the right table in WHERE instead of ON, silently turning your LEFT JOIN into an INNER JOIN!",
    objectives: [
      "Join normalized relational tables via primary key / foreign key equijoins",
      "Preserve all master records from the left table with LEFT JOIN",
      "Detect and prevent the accidental 'Outer Join Silencing' trap"
    ],
    mentalModel: [
      "INNER JOIN: Intersection of matching rows in both tables.",
      "LEFT JOIN: All rows from the left table, padded with NULLs if no right match exists.",
      "ON filters what matches; WHERE filters the combined output."
    ],
    silentTraps: [
      "Placing right-table conditions in WHERE (e.g. WHERE right.status = 'active') drops NULLs and kills LEFT JOIN.",
      "Duplicate keys on the right side cause Cartesian row multiplication (fan-out)."
    ],
    practiceGoal: "Solve 20 INNER and 20 LEFT JOIN quests in the Relational JOIN Arena."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(56,189,248,0.2)"/>
  <text x="410" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 05: CASE WHEN SHORT-CIRCUITING &amp; ZERO-COST MATRIX PIVOTING</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#facc15" font-family="monospace" font-size="10" font-weight="900">&#x1f333; SHORT-CIRCUIT WATERFALL</text>
    <text x="15" y="38" fill="#94a3b8" font-family="monospace" font-size="9">1. WHEN A+B &lt;= C  &#x2794;  'Not A Triangle' (EXIT)</text>
    <text x="15" y="55" fill="#94a3b8" font-family="monospace" font-size="9">2. WHEN A=B AND B=C &#x2794;  'Equilateral' (EXIT)</text>
    <text x="15" y="72" fill="#94a3b8" font-family="monospace" font-size="9">3. WHEN A=B OR B=C &#x2794;  'Isosceles' (EXIT)</text>
    <text x="15" y="89" fill="#94a3b8" font-family="monospace" font-size="9">4. ELSE             &#x2794;  'Scalene'</text>
    <text x="15" y="105" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="8">Evaluation exits immediately upon first TRUE. Division by 0 safe!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(34,197,94,0.06)" rx="6" stroke="rgba(34,197,94,0.25)"/>
    <text x="15" y="20" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900">&#x1f4ca; 0-COST MATRIX PIVOT (ROW &#x2794; COLUMN)</text>
    <text x="15" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5">SELECT dept_id,</text>
    <text x="25" y="55" fill="#4ade80" font-family="monospace" font-size="8.5">SUM(CASE WHEN role='Dev' THEN 1 ELSE 0 END) AS devs,</text>
    <text x="25" y="70" fill="#38bdf8" font-family="monospace" font-size="8.5">SUM(CASE WHEN role='QA' THEN 1 ELSE 0 END) AS qas</text>
    <text x="15" y="85" fill="#cbd5e1" font-family="monospace" font-size="8.5">FROM Employees GROUP BY dept_id;</text>
    <text x="15" y="105" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5">&#x1f4a1; Replaces 3 expensive outer joins with 1 single sequential table scan!</text>
  </g>
</svg>`
  },
  {
    day: 6,
    title: "Day 06: RIGHT, FULL OUTER & SELF JOINs (Audit Reconciliation & Trees)",
    shortName: "RIGHT, FULL & SELF JOINs",
    category: "Joins",
    badgeColor: "#06b6d4",
    sectionKey: "section5",
    questRange: "Quests 61 – 180 (RIGHT, FULL OUTER & SELF Disciplines)",
    sirBloopsAdvice: "FULL OUTER JOIN is your best friend for financial reconciliation! It instantly reveals orphans on BOTH sides of the ledger!",
    objectives: [
      "Perform two-sided data reconciliations with FULL OUTER JOIN",
      "Query hierarchical relationships (manager-employee, prior period) via SELF JOIN",
      "Find missing records using anti-join patterns (WHERE b.id IS NULL)"
    ],
    mentalModel: [
      "FULL OUTER JOIN keeps everything from both tables, pairing matches and NULL-filling mismatches.",
      "SELF JOIN treats the same physical table as two logical tables using different aliases."
    ],
    silentTraps: [
      "Coalescing IDs: In FULL OUTER JOIN, SELECT a.id drops orphans from table B! Use COALESCE(a.id, b.id).",
      "Infinite recursion or missing top-level roots in SELF JOIN if managers don't have NULL parent IDs."
    ],
    practiceGoal: "Clear 30 quests across FULL OUTER and SELF JOIN disciplines."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(236,72,153,0.2)"/>
  <text x="410" y="30" fill="#ec4899" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 06: RELATIONAL MULTI-TABLE JOINS &bull; SET THEORY &amp; ANTI-JOIN PATTERN</text>
  <g transform="translate(15, 52)">
    <rect x="0" y="0" width="185" height="110" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="92" y="18" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">INNER JOIN</text>
    <circle cx="70" cy="55" r="28" fill="rgba(56,189,248,0.2)" stroke="rgba(255,255,255,0.2)"/>
    <circle cx="115" cy="55" r="28" fill="rgba(236,72,153,0.2)" stroke="rgba(255,255,255,0.2)"/>
    <path d="M 92 35 A 28 28 0 0 1 92 75 A 28 28 0 0 1 92 35" fill="#4ade80"/>
    <text x="92" y="98" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">Intersection (Matched Keys)</text>
    <rect x="195" y="0" width="185" height="110" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="287" y="18" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">LEFT JOIN</text>
    <circle cx="265" cy="55" r="28" fill="#38bdf8" stroke="rgba(255,255,255,0.2)"/>
    <circle cx="310" cy="55" r="28" fill="rgba(236,72,153,0.15)" stroke="rgba(255,255,255,0.2)"/>
    <text x="287" y="98" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">All Left + Matched Right</text>
    <rect x="390" y="0" width="195" height="110" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="487" y="18" fill="#fb7185" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">LEFT ANTI-JOIN</text>
    <circle cx="465" cy="55" r="28" fill="#fb7185" stroke="rgba(255,255,255,0.2)"/>
    <circle cx="510" cy="55" r="28" fill="#080c14" stroke="rgba(255,255,255,0.2)"/>
    <text x="487" y="98" fill="#fb7185" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">WHERE right.id IS NULL</text>
    <rect x="595" y="0" width="195" height="110" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="692" y="18" fill="#c084fc" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">FULL OUTER JOIN</text>
    <circle cx="670" cy="55" r="28" fill="#c084fc" stroke="rgba(255,255,255,0.2)"/>
    <circle cx="715" cy="55" r="28" fill="#c084fc" stroke="rgba(255,255,255,0.2)"/>
    <text x="692" y="98" fill="#c084fc" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">Complete Union (All Rows)</text>
  </g>
</svg>`
  },
  {
    day: 7,
    title: "Day 07: CROSS & Non-Equi JOINs (Cartesian Products & Range Overlaps)",
    shortName: "CROSS & Non-Equi JOINs",
    category: "Joins",
    badgeColor: "#06b6d4",
    sectionKey: "section5",
    questRange: "Quests 181 – 240 (CROSS & NON-EQUI Disciplines)",
    sirBloopsAdvice: "Non-equi joins use operators like BETWEEN, <, and > instead of =. Perfect for tax brackets, price tiers, and date range overlaps!",
    objectives: [
      "Generate complete grid matrices (e.g., all stores x all products) with CROSS JOIN",
      "Join tables across continuous numerical or date intervals (BETWEEN, >=, <=)",
      "Detect overlapping time intervals in bookings and subscriptions"
    ],
    mentalModel: [
      "CROSS JOIN produces M x N rows (Cartesian product). Use deliberately for calendar grids.",
      "Non-Equi JOIN pairs rows based on inequality ranges rather than exact key equality."
    ],
    silentTraps: [
      "Accidental CROSS JOIN caused by omitting the ON clause on large tables can crash database memory.",
      "Overlapping intervals: The correct overlap predicate is (start_a <= end_b AND end_a >= start_b)."
    ],
    practiceGoal: "Solve 20 Non-Equi and 10 CROSS JOIN quests to finish the JOIN Master Arena."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(245,158,11,0.2)"/>
  <text x="410" y="30" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 07: NON-EQUI JOINS, HIERARCHICAL SELF-JOINS &amp; CARTESIAN EXPLOSIONS</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#f59e0b" font-family="monospace" font-size="10" font-weight="900">1. NON-EQUI RANGE SLICE (BETWEEN)</text>
    <rect x="15" y="35" width="345" height="20" fill="rgba(0,0,0,0.5)" rx="4"/>
    <rect x="90" y="35" width="100" height="20" fill="rgba(56,189,248,0.2)" stroke="#38bdf8"/>
    <text x="140" y="49" fill="#38bdf8" font-family="monospace" font-size="9" text-anchor="middle">Grade 8: 70 - 79</text>
    <circle cx="155" cy="45" r="5" fill="#f43f5e"/>
    <text x="15" y="80" fill="#94a3b8" font-family="monospace" font-size="8.5">ON s.marks BETWEEN g.min_mark AND g.max_mark</text>
    <text x="15" y="98" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5">Maps continuous score values to discrete salary or grade bands.</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900">2. SELF-JOIN &amp; DIRECTIONAL DEDUPE</text>
    <text x="15" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5">FROM Functions f1 JOIN Functions f2</text>
    <text x="25" y="55" fill="#cbd5e1" font-family="monospace" font-size="8.5">ON f1.x = f2.y AND f1.y = f2.x</text>
    <text x="25" y="70" fill="#f43f5e" font-family="monospace" font-size="8.5" font-weight="bold">WHERE f1.x &lt; f1.y  -- Directional Fence</text>
    <text x="15" y="92" fill="#fb7185" font-family="system-ui, sans-serif" font-size="8.5">&#x26a0;&#xfe0f; Omitting fence yields mirror pairs: (2,20) and (20,2)!</text>
    <text x="15" y="105" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5">Hierarchies require LEFT JOIN e.manager_id = m.emp_id.</text>
  </g>
</svg>`
  },
  {
    day: 8,
    title: "Day 08: Window Functions: Ranking & Deduplication (ROW_NUMBER, RANK)",
    shortName: "Window Ranking",
    category: "Window Functions",
    badgeColor: "#ec4899",
    sectionKey: "section6",
    questRange: "Quests 1 – 30 (Ranking & Partitioning)",
    sirBloopsAdvice: "Window functions calculate across row sets WITHOUT collapsing them into a single row! Pure analytical magic!",
    objectives: [
      "Partition row sets into independent analytical windows via PARTITION BY",
      "Assign sequential row numbers with ROW_NUMBER()",
      "Distinguish between RANK() (skips ties) and DENSE_RANK() (consecutive ranks)"
    ],
    mentalModel: [
      "Unlike GROUP BY which reduces rows, window functions retain every single original row while appending computed metrics.",
      "Use ROW_NUMBER() = 1 to deduplicate and pick the latest record per entity."
    ],
    silentTraps: [
      "Attempting to write WHERE ROW_NUMBER() = 1 directly causes a syntax error! Window functions evaluate after WHERE.",
      "Using RANK() when pagination requires dense numbering creates gaps in rank sequences."
    ],
    practiceGoal: "Master the 'Top N per Category' pattern with 20 Window Ranking quests."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(236,72,153,0.2)"/>
  <text x="410" y="30" fill="#ec4899" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 08: WINDOW RANKING TRIAD &bull; ROW_NUMBER vs. RANK vs. DENSE_RANK</text>
  <g transform="translate(20, 50)">
    <rect width="780" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <rect x="15" y="10" width="750" height="22" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="30" y="25" fill="#94a3b8" font-family="monospace" font-size="9" font-weight="bold">EMPLOYEE</text>
    <text x="140" y="25" fill="#94a3b8" font-family="monospace" font-size="9" font-weight="bold">SALARY (TIED)</text>
    <text x="260" y="25" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">ROW_NUMBER()</text>
    <text x="430" y="25" fill="#f43f5e" font-family="monospace" font-size="9" font-weight="bold">RANK() [GAPS]</text>
    <text x="600" y="25" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold">DENSE_RANK() [COMPACT]</text>
    <text x="30" y="48" fill="#e2e8f0" font-family="monospace" font-size="9">Alice</text>
    <text x="140" y="48" fill="#cbd5e1" font-family="monospace" font-size="9">$100,000</text>
    <text x="260" y="48" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">1</text>
    <text x="430" y="48" fill="#f43f5e" font-family="monospace" font-size="9" font-weight="bold">1</text>
    <text x="600" y="48" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold">1</text>
    <text x="30" y="66" fill="#e2e8f0" font-family="monospace" font-size="9">Bob (Tied)</text>
    <text x="140" y="66" fill="#fbbf24" font-family="monospace" font-size="9">$90,000</text>
    <text x="260" y="66" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">2</text>
    <text x="430" y="66" fill="#f43f5e" font-family="monospace" font-size="9" font-weight="bold">2</text>
    <text x="600" y="66" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold">2</text>
    <text x="30" y="84" fill="#e2e8f0" font-family="monospace" font-size="9">Charlie (Tied)</text>
    <text x="140" y="84" fill="#fbbf24" font-family="monospace" font-size="9">$90,000</text>
    <text x="260" y="84" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">3 (Arbitrary)</text>
    <text x="430" y="84" fill="#f43f5e" font-family="monospace" font-size="9" font-weight="bold">2 (Shared)</text>
    <text x="600" y="84" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold">2 (Shared)</text>
    <text x="30" y="102" fill="#e2e8f0" font-family="monospace" font-size="9">Diana</text>
    <text x="140" y="102" fill="#cbd5e1" font-family="monospace" font-size="9">$80,000</text>
    <text x="260" y="102" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">4</text>
    <text x="430" y="102" fill="#f43f5e" font-family="monospace" font-size="9" font-weight="bold">4 (Skipped 3!)</text>
    <text x="600" y="102" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold">3 (Continuous!)</text>
  </g>
</svg>`
  },
  {
    day: 9,
    title: "Day 09: Window Functions: Running Totals & Offsets (ROWS vs RANGE, LAG)",
    shortName: "Window Frames & Offsets",
    category: "Window Functions",
    badgeColor: "#ec4899",
    sectionKey: "section6",
    questRange: "Quests 31 – 70 (Sliding Frames & Offsets)",
    sirBloopsAdvice: "Beware the default window frame! Without ROWS BETWEEN, an ORDER BY in a window function defaults to RANGE, which silently lumps duplicate values together!",
    objectives: [
      "Calculate continuous running balances and cumulative sums",
      "Explicitly specify physical frames (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "Compare adjacent rows with LAG() and LEAD() for period-over-period growth"
    ],
    mentalModel: [
      "A sliding window frame defines the exact slice of preceding/following rows included in the calculation.",
      "LAG(val, 1) looks backward 1 row; LEAD(val, 1) looks forward 1 row."
    ],
    silentTraps: [
      "The default frame `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` groups identical timestamps into the same running total.",
      "Division by zero in percentage growth: Wrap the denominator with NULLIF(LAG(sales), 0)."
    ],
    practiceGoal: "Solve 20 Running Total and LAG/LEAD quests in Section 06."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(236,72,153,0.2)"/>
  <text x="410" y="30" fill="#ec4899" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 09: SLIDING WINDOW FRAMES &bull; ROWS BETWEEN APERTURE &amp; LAG/LEAD</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900">&#x1f50d; SLIDING WINDOW APERTURE (7-DAY MOVING AVG)</text>
    <text x="15" y="36" fill="#cbd5e1" font-family="monospace" font-size="8.5">AVG(amount) OVER (ORDER BY date</text>
    <text x="25" y="50" fill="#4ade80" font-family="monospace" font-size="8.5" font-weight="bold">ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</text>
    <rect x="15" y="60" width="345" height="22" fill="rgba(0,0,0,0.5)" rx="4"/>
    <rect x="80" y="60" width="200" height="22" fill="rgba(74,222,128,0.15)" stroke="#4ade80" stroke-width="1.5"/>
    <text x="180" y="75" fill="#4ade80" font-family="monospace" font-size="8.5" text-anchor="middle">[ 7 Consecutive Row Slots in RAM ]</text>
    <text x="15" y="102" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">&#x26a0;&#xfe0f; Omitting ROWS defaults to RANGE, which lumps identical dates together!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#f472b6" font-family="monospace" font-size="10" font-weight="900">&#x1f4c8; VALUE OFFSETS (MoM GROWTH RATIO)</text>
    <text x="15" y="38" fill="#cbd5e1" font-family="monospace" font-size="8.5">LAG(revenue, 1) OVER (ORDER BY month)</text>
    <path d="M 30 75 Q 80 50 130 75" fill="none" stroke="#38bdf8" stroke-width="2"/>
    <text x="80" y="60" fill="#38bdf8" font-family="monospace" font-size="8" text-anchor="middle">LAG(1)</text>
    <circle cx="30" cy="75" r="5" fill="#38bdf8"/>
    <text x="30" y="95" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">Jan ($100k)</text>
    <circle cx="130" cy="75" r="5" fill="#4ade80"/>
    <text x="130" y="95" fill="#e2e8f0" font-family="monospace" font-size="8" text-anchor="middle">Feb ($125k)</text>
    <text x="210" y="75" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold">+25.0% MoM</text>
    <text x="15" y="108" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="8">Always wrap denominator in NULLIF(LAG(...), 0) to prevent division by zero!</text>
  </g>
</svg>`
  },
  {
    day: 10,
    title: "Day 10: Subqueries & Modular CTE Pipelines (WITH DAG Pipelines)",
    shortName: "CTEs & Subqueries",
    category: "Modular SQL",
    badgeColor: "#6366f1",
    sectionKey: "section7",
    questRange: "Quests 1 – 30 (Scalar, Correlated & CTE Pipelines)",
    sirBloopsAdvice: "Say goodbye to unreadable spaghetti SQL! Common Table Expressions (CTEs) let you read and debug complex pipelines from top to bottom!",
    objectives: [
      "Replace deep nested subqueries with readable, modular WITH CTEs",
      "Write efficient existence checks with WHERE EXISTS (correlated subqueries)",
      "Chain multi-stage data transformation pipelines"
    ],
    mentalModel: [
      "A CTE defines a temporary, named result set that exists only during the execution of that specific query.",
      "EXISTS stops scanning the instant it finds 1 match, outperforming IN on large datasets."
    ],
    silentTraps: [
      "In older PostgreSQL versions (<12), CTEs were optimization fences (materialized to disk). In modern engines they are inlined.",
      "Correlated subqueries in the SELECT clause execute once per outer row, creating an O(N*M) performance penalty."
    ],
    practiceGoal: "Build 20 multi-stage CTE pipelines in Section 07."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(99,102,241,0.2)"/>
  <text x="410" y="30" fill="#818cf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 10: MODULAR CTE DAG PIPELINES &bull; RECURSIVE WORKING TABLE LOOP</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900">1. LINEAR CTE PIPELINE (WITH DAG)</text>
    <rect x="15" y="35" width="85" height="30" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="57" y="53" fill="#cbd5e1" font-family="monospace" font-size="8.5" text-anchor="middle">raw_events</text>
    <path d="M 103 50 L 120 50" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="123" y="35" width="95" height="30" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="170" y="53" fill="#38bdf8" font-family="monospace" font-size="8.5" text-anchor="middle">cleaned_stage</text>
    <path d="M 221 50 L 238 50" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="241" y="35" width="105" height="30" fill="rgba(34,197,94,0.1)" stroke="#22c55e" rx="4"/>
    <text x="293" y="53" fill="#4ade80" font-family="monospace" font-size="8.5" text-anchor="middle">final_report</text>
    <text x="15" y="90" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">Reads top-to-bottom like clean code. Eliminates 5-tier nested subqueries.</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(192,132,252,0.06)" rx="6" stroke="rgba(192,132,252,0.25)"/>
    <text x="15" y="20" fill="#c084fc" font-family="monospace" font-size="10" font-weight="900">2. RECURSIVE ENGINE LOOP (WITH RECURSIVE)</text>
    <text x="15" y="38" fill="#e2e8f0" font-family="monospace" font-size="8.5">Anchor Member &#x2794; UNION ALL &#x2794; Recursive Member</text>
    <rect x="15" y="48" width="355" height="32" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="68" fill="#c084fc" font-family="monospace" font-size="8.5">Loops until Working Table is empty (Termination condition)</text>
    <text x="15" y="100" fill="#fb7185" font-family="system-ui, sans-serif" font-size="8.5">&#x26a0;&#xfe0f; Infinite Loop Defense: Enforce WHERE depth &lt; 50 or cte_max_recursion_depth.</text>
  </g>
</svg>`
  },
  {
    day: 11,
    title: "Day 11: Conditional Logic, CASE Expressions & Matrix Pivoting",
    shortName: "CASE Logic & Pivoting",
    category: "Pivoting",
    badgeColor: "#14b8a6",
    sectionKey: "section8",
    questRange: "Quests 1 – 30 (Conditional & Cross-Tab Pivoting)",
    sirBloopsAdvice: "CASE expressions evaluate top-to-bottom and short-circuit on the FIRST match! Put your most specific condition first!",
    objectives: [
      "Implement conditional branching with Searched CASE expressions",
      "Pivot rows into columns using conditional aggregation (SUM(CASE WHEN ...))",
      "Handle data cleansing, status bucket re-categorization, and zero-nullification"
    ],
    mentalModel: [
      "CASE is an expression, not a procedural control statement. It always returns a single scalar value per row.",
      "Cross-tab pivoting aggregates filtered CASE branches into distinct columnar buckets."
    ],
    silentTraps: [
      "If lower thresholds precede higher thresholds in CASE, the higher threshold will never be reached.",
      "Forgetting the ELSE branch: unhandled rows evaluate to NULL by default, which may contaminate sums."
    ],
    practiceGoal: "Solve 20 conditional pivoting quests in Section 08."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(245,158,11,0.2)"/>
  <text x="410" y="30" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 11: SET OPERATIONS &bull; UNION ALL vs. UNION &amp; VERTICAL CONCATENATION</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(34,197,94,0.06)" rx="6" stroke="rgba(34,197,94,0.25)"/>
    <text x="15" y="20" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900">&#x26a1; UNION ALL (STREAMING PASS-THROUGH)</text>
    <text x="15" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Concatenates Query A + Query B with zero inspection.</text>
    <rect x="15" y="48" width="345" height="24" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="64" fill="#4ade80" font-family="monospace" font-size="9">Latency: ~0.8ms &bull; Zero RAM Deduplication &bull; Retains Duplicates</text>
    <text x="15" y="92" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Always default to UNION ALL in high-volume financial transaction queries!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(244,63,94,0.06)" rx="6" stroke="rgba(244,63,94,0.25)"/>
    <text x="15" y="20" fill="#fb7185" font-family="monospace" font-size="10" font-weight="900">&#x26a0;&#xfe0f; UNION (EXPENSIVE DISK/RAM DEDUPE)</text>
    <text x="15" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Forces an in-memory hash table or sort to drop duplicate tuples.</text>
    <rect x="15" y="48" width="355" height="24" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="64" fill="#fb7185" font-family="monospace" font-size="9">Latency: ~220ms &bull; May spill temp table to disk if large</text>
    <text x="15" y="92" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Only use UNION when business rules explicitly mandate strictly unique rows.</text>
  </g>
</svg>`
  },
  {
    day: 12,
    title: "Day 12: Set Operations (UNION, INTERSECT, EXCEPT & Schema Alignment)",
    shortName: "Set Operations",
    category: "Set Theory",
    badgeColor: "#8b5cf6",
    sectionKey: "section9",
    questRange: "Quests 1 – 30 (UNION, INTERSECT & EXCEPT)",
    sirBloopsAdvice: "UNION removes duplicates by sorting in memory; UNION ALL keeps all records and is lightning fast! Default to UNION ALL unless you explicitly need deduplication!",
    objectives: [
      "Combine result sets vertically with UNION and UNION ALL",
      "Find common records with INTERSECT and set differences with EXCEPT",
      "Harmonize schemas with synthetic padding and positional type matching"
    ],
    mentalModel: [
      "Set operations match columns strictly by POSITION (1st with 1st, 2nd with 2nd), completely ignoring column names.",
      "EXCEPT is NOT commutative: A EXCEPT B is completely different from B EXCEPT A!"
    ],
    silentTraps: [
      "Column aliases in the 2nd query of a set operation are completely ignored; the 1st query defines column names.",
      "Unnecessary UNION causes an expensive disk/memory sort spill; use UNION ALL whenever possible."
    ],
    practiceGoal: "Complete 20 Set Operation quests to master schema harmonization."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(56,189,248,0.2)"/>
  <text x="410" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 12: DDL/DML SCHEMA MUTATION &bull; WRITE-AHEAD LOG (WAL) LIFECYCLE</text>
  <g transform="translate(20, 50)">
    <rect width="780" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="22" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900">ACID WRITE TRANSACTION LIFECYCLE</text>
    <rect x="20" y="35" width="165" height="60" fill="rgba(56,189,248,0.08)" rx="4" stroke="rgba(56,189,248,0.3)"/>
    <text x="102" y="52" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">1. BUFFER POOL</text>
    <text x="102" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Modifies Page in RAM</text>
    <text x="102" y="82" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Marks Page 'Dirty'</text>
    <path d="M 190 65 L 210 65" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="215" y="35" width="175" height="60" fill="rgba(34,197,94,0.08)" rx="4" stroke="rgba(34,197,94,0.3)"/>
    <text x="302" y="52" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">2. REDO LOG (WAL)</text>
    <text x="302" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Sequential Append to NVMe</text>
    <text x="302" y="82" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Commit Returns (&lt;0.2ms)</text>
    <path d="M 395 65 L 415 65" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="420" y="35" width="175" height="60" fill="rgba(245,158,11,0.08)" rx="4" stroke="rgba(245,158,11,0.3)"/>
    <text x="507" y="52" fill="#fbbf24" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">3. ASYNC FLUSH</text>
    <text x="507" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Background Checkpointer</text>
    <text x="507" y="82" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Flushes to Data Tablespace</text>
    <rect x="610" y="35" width="175" height="60" fill="rgba(192,132,252,0.08)" rx="4" stroke="rgba(192,132,252,0.3)"/>
    <text x="697" y="52" fill="#c084fc" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">UPSERT ATOMICITY</text>
    <text x="697" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">ON DUPLICATE KEY UPDATE</text>
    <text x="697" y="82" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Prevents Race Conditions</text>
  </g>
</svg>`
  },
  {
    day: 13,
    title: "Day 13: DDL, Physical Schema Architecture & Constraints",
    shortName: "DDL & Constraints",
    category: "Schema Architecture",
    badgeColor: "#f97316",
    sectionKey: "section10",
    questRange: "Quests 1 – 30 (CREATE, ALTER & Constraints)",
    sirBloopsAdvice: "Database constraints are the ultimate line of defense for data integrity! Never rely solely on application code to validate data!",
    objectives: [
      "Define relational tables with PRIMARY KEY, FOREIGN KEY, and UNIQUE constraints",
      "Enforce domain invariants with CHECK constraints",
      "Safely evolve schemas with ALTER TABLE and non-blocking column additions"
    ],
    mentalModel: [
      "Constraints are enforced by the storage engine inside the ACID transaction boundary.",
      "CHECK constraints evaluate to true if the predicate is TRUE or UNKNOWN (NULL passes CHECK!)."
    ],
    silentTraps: [
      "CHECK (score >= 0) allows NULL values unless accompanied by an explicit NOT NULL constraint.",
      "Adding a column with a volatile DEFAULT on large tables can acquire an exclusive table lock."
    ],
    practiceGoal: "Solve 20 DDL and constraint architecture quests in Section 10."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(56,189,248,0.2)"/>
  <text x="410" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 13: B+ TREE 16KB DISK PAGES &bull; CLUSTERED vs. SECONDARY INDEX</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900">CLUSTERED INDEX (PRIMARY KEY)</text>
    <text x="15" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">The table IS the clustered index (sorted by PK).</text>
    <rect x="15" y="48" width="345" height="30" fill="rgba(34,197,94,0.08)" rx="4" stroke="rgba(34,197,94,0.3)"/>
    <text x="25" y="67" fill="#4ade80" font-family="monospace" font-size="8.5">Leaf Pages contain COMPLETE row data columns!</text>
    <text x="15" y="98" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="8.5">1 single B-Tree seek retrieves full row with zero extra lookups.</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#f59e0b" font-family="monospace" font-size="10" font-weight="900">SECONDARY INDEX (BOOKMARK LOOKUP)</text>
    <text x="15" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">Leaf nodes store Index Key + Primary Key pointer.</text>
    <rect x="15" y="48" width="355" height="30" fill="rgba(245,158,11,0.08)" rx="4" stroke="rgba(245,158,11,0.3)"/>
    <text x="25" y="67" fill="#fbbf24" font-family="monospace" font-size="8.5">Requires 2nd seek into Clustered Index unless Covered!</text>
    <text x="15" y="98" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5">&#x1f4a1; Covering Index: Include requested columns to avoid 2nd seek!</text>
  </g>
</svg>`
  },
  {
    day: 14,
    title: "Day 14: DML, Atomic Upserts & ACID Transactions",
    shortName: "DML, Upserts & ACID",
    category: "Data Mutation",
    badgeColor: "#ef4444",
    sectionKey: "section11",
    questRange: "Quests 1 – 30 (INSERT, UPDATE, DELETE & UPSERT)",
    sirBloopsAdvice: "Always write your WHERE clause BEFORE writing DELETE or UPDATE! An unshielded DELETE is an instant career emergency!",
    objectives: [
      "Perform idempotent insert-or-update operations with ON CONFLICT DO UPDATE (UPSERT)",
      "Safely update and delete data with conditional predicates and RETURNING clauses",
      "Manage transaction boundaries (BEGIN, COMMIT, ROLLBACK) and isolation levels"
    ],
    mentalModel: [
      "ACID: Atomicity (all-or-nothing), Consistency (rules intact), Isolation (concurrency control), Durability (persisted to WAL).",
      "Idempotent mutations produce the same state regardless of how many times they are executed."
    ],
    silentTraps: [
      "Omitting WHERE in UPDATE/DELETE modifies every single row in the table.",
      "Deadlocks occur when two concurrent transactions update the same rows in opposite order."
    ],
    practiceGoal: "Complete 20 atomic mutation and upsert quests in Section 11."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(239,68,68,0.2)"/>
  <text x="410" y="30" fill="#f87171" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 14: MVCC MULTI-VERSION CONCURRENCY &bull; UNDO LOG ROLLBACK SEGMENTS</text>
  <g transform="translate(20, 50)">
    <rect width="780" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="20" fill="#f87171" font-family="monospace" font-size="10" font-weight="900">MVCC SNAPSHOT READS &bull; READERS NEVER BLOCK WRITERS</text>
    <rect x="20" y="35" width="230" height="65" fill="rgba(56,189,248,0.08)" rx="4" stroke="rgba(56,189,248,0.3)"/>
    <text x="30" y="52" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">TRANSACTION A (READ)</text>
    <text x="30" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Snapshot established at Tx start.</text>
    <text x="30" y="82" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5">Reads older version from Undo Log!</text>
    <rect x="270" y="35" width="230" height="65" fill="rgba(239,68,68,0.08)" rx="4" stroke="rgba(239,68,68,0.3)"/>
    <text x="280" y="52" fill="#f87171" font-family="monospace" font-size="9" font-weight="bold">TRANSACTION B (WRITE)</text>
    <text x="280" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Modifies row, increments DB_TRX_ID.</text>
    <text x="280" y="82" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="8.5">Writes pre-image to Undo Log.</text>
    <rect x="520" y="35" width="240" height="65" fill="rgba(34,197,94,0.08)" rx="4" stroke="rgba(34,197,94,0.3)"/>
    <text x="530" y="52" fill="#4ade80" font-family="monospace" font-size="9" font-weight="bold">ISOLATION LEVELS</text>
    <text x="530" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8">1. Read Committed (PG default)</text>
    <text x="530" y="82" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8">2. Repeatable Read (MySQL default)</text>
  </g>
</svg>`
  },
  {
    day: 15,
    title: "Day 15: Views, Materialized Views & Concurrency",
    shortName: "Views & Stored Procs",
    category: "Database Abstraction",
    badgeColor: "#0ea5e9",
    sectionKey: "section12",
    questRange: "Quests 1 – 30 (Views, MVs & Procedures)",
    sirBloopsAdvice: "A standard VIEW is just a stored query macro (zero storage); a MATERIALIZED VIEW physically saves the query results on disk for instant speed!",
    objectives: [
      "Encapsulate complex joins into reusable virtual standard views",
      "Accelerate heavy reporting queries using Materialized Views",
      "Refresh materialized views non-blockingly using REFRESH MATERIALIZED VIEW CONCURRENTLY"
    ],
    mentalModel: [
      "Standard View: Zero cached data, expanded into the execution plan at runtime.",
      "Materialized View: Precomputed physical snapshot table with its own indexes."
    ],
    silentTraps: [
      "REFRESH MATERIALIZED VIEW locks the view for reads unless CONCURRENTLY is specified (which requires a unique index).",
      "Nested views (views on views on views) hide underlying query complexity and cause severe performance degradation."
    ],
    practiceGoal: "Clear 20 Views and Materialized Views quests in Section 12."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(16,185,129,0.2)"/>
  <text x="410" y="30" fill="#10b981" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 15: TEMPORAL SQL &bull; GAPLESS CALENDAR SCAFFOLDING &amp; TIMEZONES</text>
  <g transform="translate(20, 50)">
    <rect width="780" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="20" fill="#10b981" font-family="monospace" font-size="10" font-weight="900">GAPLESS CALENDAR LEFT JOIN SCAFFOLD</text>
    <rect x="20" y="35" width="220" height="65" fill="rgba(16,185,129,0.08)" rx="4" stroke="rgba(16,185,129,0.3)"/>
    <text x="30" y="52" fill="#10b981" font-family="monospace" font-size="9" font-weight="bold">CALENDAR TABLE (CTE)</text>
    <text x="30" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Continuous sequence of dates</text>
    <text x="30" y="82" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Jan 01, Jan 02, Jan 03, Jan 04...</text>
    <text x="255" y="70" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="bold">LEFT JOIN</text>
    <rect x="360" y="35" width="220" height="65" fill="rgba(244,63,94,0.08)" rx="4" stroke="rgba(244,63,94,0.3)"/>
    <text x="370" y="52" fill="#fb7185" font-family="monospace" font-size="9" font-weight="bold">SPARSE SALES LOG</text>
    <text x="370" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Only recorded on transaction days</text>
    <text x="370" y="82" fill="#fb7185" font-family="system-ui, sans-serif" font-size="8.5">Jan 01 ($500), Jan 04 ($300) [Jan 02,03 missing!]</text>
    <rect x="600" y="35" width="160" height="65" fill="rgba(56,189,248,0.08)" rx="4" stroke="rgba(56,189,248,0.3)"/>
    <text x="610" y="52" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">RESULT</text>
    <text x="610" y="68" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8">COALESCE(rev, 0)</text>
    <text x="610" y="82" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8">Zero-revenue days retained!</text>
  </g>
</svg>`
  },
  {
    day: 16,
    title: "Day 16: Query Performance, EXPLAIN ANALYZE & Index Tuning",
    shortName: "EXPLAIN & Optimization",
    category: "Performance Tuning",
    badgeColor: "#eab308",
    sectionKey: "section13",
    questRange: "Quests 1 – 30 (EXPLAIN, B-Trees & Tuning)",
    sirBloopsAdvice: "EXPLAIN shows what the optimizer *thinks* will happen; EXPLAIN ANALYZE actually runs the query and measures exact buffer hits and timing!",
    objectives: [
      "Interpret EXPLAIN ANALYZE execution plans (Cost, Rows, Width, Actual Time)",
      "Distinguish between Sequential Scans, Index Scans, and Bitmap Index Scans",
      "Eliminate non-SARGable predicates that defeat B-Tree indexes"
    ],
    mentalModel: [
      "Cost is measured in arbitrary I/O page fetch units (1.0 = 1 sequential page read).",
      "SARGable (Search Argument Able) predicates allow the engine to perform direct B-Tree index seeks."
    ],
    silentTraps: [
      "Wrapping an indexed column in a function (WHERE DATE(created_at) = ...) blinds the index and forces a full table scan.",
      "Outdated table statistics cause the cost optimizer to choose disastrous execution plans; run ANALYZE regularly."
    ],
    practiceGoal: "Solve 20 query optimization and EXPLAIN ANALYZE quests in Section 13."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(244,63,94,0.2)"/>
  <text x="410" y="30" fill="#fb7185" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 16: STRING PROCESSING &amp; REGEX ANCHORS &bull; SARGABILITY PRESERVATION</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="900">REGEX ANCHORS (ICU REGEXP)</text>
    <text x="15" y="40" fill="#e2e8f0" font-family="monospace" font-size="8.5">^     &#x2794; Starts with (REGEXP '^[aeiou]')</text>
    <text x="15" y="58" fill="#e2e8f0" font-family="monospace" font-size="8.5">&#x24;     &#x2794; Ends with   (REGEXP '[aeiou]&#x24;')</text>
    <text x="15" y="76" fill="#e2e8f0" font-family="monospace" font-size="8.5">[a-z] &#x2794; Character set bracket</text>
    <text x="15" y="96" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">Unlike LIKE, REGEXP matches anywhere unless anchored with ^ and &#x24;!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(34,197,94,0.06)" rx="6" stroke="rgba(34,197,94,0.25)"/>
    <text x="15" y="20" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900">SARGABLE INDEX PRESERVATION</text>
    <text x="15" y="40" fill="#fb7185" font-family="monospace" font-size="8.5">&#x274c; WHERE SUBSTRING(sku, 1, 3) = 'NYC' (Full Table Scan)</text>
    <text x="15" y="60" fill="#4ade80" font-family="monospace" font-size="8.5">&#x2705; WHERE sku LIKE 'NYC%' (Direct B-Tree Range Seek!)</text>
    <text x="15" y="80" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8.5">Leading constant in LIKE preserves high-speed index traversal.</text>
    <text x="15" y="98" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="8.5">Trailing wildcard LIKE '%xyz' destroys B-Tree seeking.</text>
  </g>
</svg>`
  },
  {
    day: 17,
    title: "Day 17: Cloud Warehouses, QUALIFY & Micro-Partition Pruning",
    shortName: "Cloud Warehouses & DuckDB",
    category: "Modern Warehouses",
    badgeColor: "#38bdf8",
    sectionKey: "section14",
    questRange: "Quests 1 – 30 (QUALIFY, Pruning & Parquet)",
    sirBloopsAdvice: "In modern cloud warehouses like Snowflake, BigQuery, and DuckDB, the QUALIFY clause filters window calculations directly without subqueries!",
    objectives: [
      "Filter window ranks inline using the modern QUALIFY clause",
      "Optimize petabyte scans through partition and micro-partition pruning",
      "Query compressed external Parquet files directly using DuckDB"
    ],
    mentalModel: [
      "Cloud warehouses use columnar storage and metadata min/max bounds to skip reading unneeded micro-partitions.",
      "QUALIFY executes after window calculations in the execution pipeline."
    ],
    silentTraps: [
      "Wrapping partition/clustering keys in scalar functions disables metadata pruning, triggering multi-terabyte scans.",
      "SELECT * on Parquet external lakehouses defeats columnar projection pushdown."
    ],
    practiceGoal: "Clear 20 Modern Cloud Warehouse and QUALIFY quests in Section 14."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(56,189,248,0.2)"/>
  <text x="410" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 17: COLUMNAR CLOUD WAREHOUSES &bull; MICRO-PARTITION PRUNING &amp; QUALIFY</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(56,189,248,0.06)" rx="6" stroke="rgba(56,189,248,0.25)"/>
    <text x="15" y="20" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="900">ROW OLTP vs COLUMNAR OLAP</text>
    <text x="15" y="40" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">OLTP reads full row tuples across disk blocks.</text>
    <rect x="15" y="50" width="345" height="28" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="68" fill="#4ade80" font-family="monospace" font-size="8.5">OLAP (Snowflake/BigQuery) reads ONLY the queried column!</text>
    <text x="15" y="98" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="8.5">SUM(rev) reads 1 column, skips 99% of bytes &#x2794; 50x speedup!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(168,85,247,0.06)" rx="6" stroke="rgba(168,85,247,0.25)"/>
    <text x="15" y="20" fill="#c084fc" font-family="monospace" font-size="10" font-weight="900">THE MODERN QUALIFY CLAUSE</text>
    <text x="15" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5">SELECT user_id, order_date, amount FROM Orders</text>
    <rect x="15" y="48" width="355" height="24" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="64" fill="#c084fc" font-family="monospace" font-size="8.5">QUALIFY ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY date DESC) = 1;</text>
    <text x="15" y="95" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5">&#x2728; Filters window ranking inline without needing a CTE or subquery!</text>
  </g>
</svg>`
  },
  {
    day: 18,
    title: "Day 18: Semi-Structured JSON, Lateral Unnesting & GIN Indexes",
    shortName: "JSON & Semi-Structured",
    category: "Semi-Structured",
    badgeColor: "#06b6d4",
    sectionKey: "section15",
    questRange: "Quests 1 – 30 (Path, Unnesting & GIN)",
    sirBloopsAdvice: "Use -> for intermediate JSON hops (preserves quotes) and ->> for leaf scalar extraction (strips quotes for comparison)!",
    objectives: [
      "Navigate nested JSON documents using path arrow operators (-> vs ->>)",
      "Unnest arrays into relational rows via CROSS JOIN LATERAL jsonb_array_elements()",
      "Accelerate JSON containment queries (@>) with inverted GIN indexes"
    ],
    mentalModel: [
      "JSONB stores decomposed binary JSON with fast index lookups and key deduplication.",
      "CROSS JOIN LATERAL on an array evaluates once per parent row, expanding arrays into rows."
    ],
    silentTraps: [
      "Using CROSS JOIN LATERAL on an empty array [] drops the entire parent row! Use LEFT JOIN LATERAL ... ON TRUE.",
      "Comparing extracted text: payload->'status' = 'succeeded' fails because \"succeeded\" != 'succeeded'. Use ->>."
    ],
    practiceGoal: "Solve 20 JSON extraction, lateral unnesting, and GIN quests in Section 15."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(6,182,212,0.2)"/>
  <text x="410" y="30" fill="#06b6d4" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 18: SEMI-STRUCTURED JSON &bull; LATERAL UNNESTING &amp; PATH OPERATORS</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#06b6d4" font-family="monospace" font-size="10" font-weight="900">PATH OPERATORS: -&gt; vs -&gt;&gt;</text>
    <text x="15" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5">payload-&gt;'user'       &#x2794; Returns JSON Object (Preserves quotes)</text>
    <text x="15" y="60" fill="#4ade80" font-family="monospace" font-size="8.5">payload-&gt;&gt;'user_name' &#x2794; Returns Scalar Text (Strips quotes!)</text>
    <text x="15" y="80" fill="#fb7185" font-family="system-ui, sans-serif" font-size="8.5">&#x26a0;&#xfe0f; Comparing text: payload-&gt;'status' = 'active' fails because "active" != 'active'. Always use -&gt;&gt;!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(34,197,94,0.06)" rx="6" stroke="rgba(34,197,94,0.25)"/>
    <text x="15" y="20" fill="#4ade80" font-family="monospace" font-size="10" font-weight="900">CROSS JOIN LATERAL UNNESTING</text>
    <text x="15" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5">FROM Orders o,</text>
    <text x="25" y="55" fill="#4ade80" font-family="monospace" font-size="8.5">CROSS JOIN LATERAL jsonb_array_elements(o.items) AS item</text>
    <text x="15" y="80" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5">Expands array elements into separate relational rows (1 to N).</text>
    <text x="15" y="98" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="8.5">&#x26a0;&#xfe0f; Empty array [] drops parent row! Use LEFT JOIN LATERAL ... ON TRUE.</text>
  </g>
</svg>`
  },
  {
    day: 19,
    title: "Day 19: Financial Analytics, Continuous Balances & Gaps-and-Islands",
    shortName: "Financial Analytics",
    category: "Quantitative Finance",
    badgeColor: "#10b981",
    sectionKey: "section6",
    questRange: "Quests 71 – 100 (Advanced Financial Frames)",
    sirBloopsAdvice: "Financial ledgers are event-driven, but financial statements require dense daily balances! Master calendar scaffolding and rolling volatility!",
    objectives: [
      "Compute continuous running balances with dense calendar scaffolding (GENERATE_SERIES)",
      "Implement Gaps-and-Islands algorithms to detect active streak periods and loan defaults",
      "Calculate rolling volatility and Sharpe ratio components using physical time frames"
    ],
    mentalModel: [
      "Sparse transaction logs must be left-joined to a continuous calendar dimension to prevent missing non-trading days.",
      "Double-entry bookkeeping verification: SUM(debits) - SUM(credits) must equal zero per journal batch."
    ],
    silentTraps: [
      "Summing daily balances across accounts: You cannot SUM running balances across time without creating fictitious money!",
      "Missing weekends in daily moving averages: Use RANGE BETWEEN INTERVAL '30 DAYS' PRECEDING instead of ROWS."
    ],
    practiceGoal: "Master time-series financial calculations across 20 advanced analytical quests."
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(16,185,129,0.2)"/>
  <text x="410" y="30" fill="#10b981" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 19: FINANCIAL LEDGERS &bull; GAPS-AND-ISLANDS ALGORITHM</text>
  <g transform="translate(20, 50)">
    <rect width="375" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="20" fill="#10b981" font-family="monospace" font-size="10" font-weight="900">DOUBLE-ENTRY LEDGER INTEGRITY</text>
    <text x="15" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5">SUM(debit_amount) - SUM(credit_amount) == 0.00</text>
    <rect x="15" y="50" width="345" height="26" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="67" fill="#4ade80" font-family="monospace" font-size="8.5">Continuous running balance via ROWS UNBOUNDED PRECEDING</text>
    <text x="15" y="98" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="8.5">&#x26a0;&#xfe0f; Never SUM running balances across time (creates fake money)!</text>
  </g>
  <g transform="translate(415, 50)">
    <rect width="385" height="114" fill="rgba(245,158,11,0.06)" rx="6" stroke="rgba(245,158,11,0.25)"/>
    <text x="15" y="20" fill="#fbbf24" font-family="monospace" font-size="10" font-weight="900">THE GAPS-AND-ISLANDS FORMULA</text>
    <text x="15" y="40" fill="#cbd5e1" font-family="monospace" font-size="8.5">grp = date - INTERVAL ROW_NUMBER() OVER(ORDER BY date) DAY</text>
    <rect x="15" y="50" width="355" height="26" fill="rgba(0,0,0,0.5)" rx="4"/>
    <text x="25" y="67" fill="#fbbf24" font-family="monospace" font-size="8.5">Consecutive dates yield identical difference anchors!</text>
    <text x="15" y="98" fill="#4ade80" font-family="system-ui, sans-serif" font-size="8.5">Identifies consecutive login streaks, loan defaults, and machine uptime.</text>
  </g>
</svg>`
  },
  {
    day: 20,
    title: "Day 20: The Grand Multi-Pillar Boss Gauntlet & Graduation",
    shortName: "Grand Boss Gauntlet",
    category: "Mastery Graduation",
    badgeColor: "#f59e0b",
    sectionKey: "boss",
    questRange: "All 30 Boss Challenges",
    sirBloopsAdvice: "This is it! The ultimate gauntlet combining JOINs, Window Functions, CTEs, Transactions, and Optimization into 30 production challenges! You are ready!",
    objectives: [
      "Solve end-to-end multi-table production incident scenarios",
      "Synthesize all 15 SQL pillars into clean, high-performance queries",
      "Claim your SQL Foundry Certified Master Analyst credential"
    ],
    mentalModel: [
      "Production queries combine 4-5 concepts simultaneously (CTE pipeline -> Window Deduplication -> Anti-Join -> JSON build).",
      "Think in dataflow transformations from raw storage to clean business output."
    ],
    silentTraps: [
      "Over-complicating queries: Always look for the cleanest set-based or windowed solution before writing deeply nested logic."
    ],
    practiceGoal: "Conquer the 30 Boss Challenges to complete your SQL Foundry journey!"
,
    svgExplainer: `<svg viewBox="0 0 820 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="180" fill="#080c14" rx="10" stroke="rgba(255,255,255,0.08)"/>
  <rect x="15" y="12" width="790" height="28" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(245,158,11,0.2)"/>
  <text x="410" y="30" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">DAY 20: END-TO-END ENTERPRISE ARCHITECTURE &bull; FULL-STACK SQL SYNTHESIS</text>
  <g transform="translate(15, 50)">
    <rect width="790" height="114" fill="rgba(255,255,255,0.02)" rx="6" stroke="rgba(255,255,255,0.08)"/>
    <rect x="15" y="20" width="170" height="74" fill="rgba(56,189,248,0.08)" rx="4" stroke="rgba(56,189,248,0.3)"/>
    <text x="100" y="42" fill="#38bdf8" font-family="monospace" font-size="9.5" font-weight="bold" text-anchor="middle">LAYER 1: INGESTION</text>
    <text x="100" y="60" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">OLTP Schemas (3NF)</text>
    <text x="100" y="75" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">WAL Streams &amp; Events</text>
    <path d="M 190 57 L 205 57" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="210" y="20" width="175" height="74" fill="rgba(168,85,247,0.08)" rx="4" stroke="rgba(168,85,247,0.3)"/>
    <text x="297" y="42" fill="#c084fc" font-family="monospace" font-size="9.5" font-weight="bold" text-anchor="middle">LAYER 2: STAGING CTEs</text>
    <text x="297" y="60" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Data Quality &amp; Cleanse</text>
    <text x="297" y="75" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Deduplication (Top-1)</text>
    <path d="M 390 57 L 405 57" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="410" y="20" width="180" height="74" fill="rgba(34,197,94,0.08)" rx="4" stroke="rgba(34,197,94,0.3)"/>
    <text x="500" y="42" fill="#4ade80" font-family="monospace" font-size="9.5" font-weight="bold" text-anchor="middle">LAYER 3: WAREHOUSE</text>
    <text x="500" y="60" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Star Schema Facts/Dims</text>
    <text x="500" y="75" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">SCD Historical Tracking</text>
    <path d="M 595 57 L 610 57" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <rect x="615" y="20" width="160" height="74" fill="rgba(245,158,11,0.08)" rx="4" stroke="rgba(245,158,11,0.3)"/>
    <text x="695" y="42" fill="#fbbf24" font-family="monospace" font-size="9.5" font-weight="bold" text-anchor="middle">LAYER 4: EXECUTIVE</text>
    <text x="695" y="60" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Cohorts &amp; Churn Bridges</text>
    <text x="695" y="75" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">C-Suite KPI Dashboard</text>
  </g>
</svg>`
  }
];

const LEARNING_JOURNEY_STORAGE_KEY = 'sql_mastery_learning_journey_v1';

class LearningJourneyEngine {
  constructor() {
    this.days = LEARNING_JOURNEY_DAYS;
    this.state = this.loadState();
    this.selectedDayIndex = this.state.currentDay - 1;
  }

  loadState() {
    try {
      const saved = localStorage.getItem(LEARNING_JOURNEY_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load learning journey state from localStorage', e);
    }
    return {
      currentDay: 1,
      completedDays: [],
      streak: 1,
      totalQuestsCompleted: 0,
      xp: 60,
      lastActiveDate: new Date().toISOString().split('T')[0],
      activityMap: {
        [new Date().toISOString().split('T')[0]]: 5
      }
    };
  }

  saveState() {
    try {
      localStorage.setItem(LEARNING_JOURNEY_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save learning journey state', e);
    }
    // Update header pill
    const pill = document.getElementById('currentJourneyPill');
    if (pill) {
      const activeDay = this.days[this.state.currentDay - 1] || this.days[0];
      pill.textContent = `Day ${activeDay.day} • ${activeDay.shortName}`;
    }
  }

  advanceToNextDay(dayNum) {
    if (!this.state.completedDays.includes(dayNum)) {
      this.state.completedDays.push(dayNum);
      this.state.xp += 100;
      this.state.totalQuestsCompleted += 20;

      const today = new Date().toISOString().split('T')[0];
      this.state.activityMap[today] = (this.state.activityMap[today] || 0) + 20;
      this.state.lastActiveDate = today;
    }

    if (dayNum < this.days.length) {
      this.state.currentDay = Math.max(this.state.currentDay, dayNum + 1);
      this.selectedDayIndex = this.state.currentDay - 1;
    }

    this.saveState();

    // Celebration
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.celebrate();
      const nextDay = this.days[this.state.currentDay - 1];
      window.SQL_BUDDY.say(
        `🎉 Milestone Conquered! Moving ahead to Day ${nextDay.day}: ${nextDay.shortName}! Let's keep the momentum going!`,
        6000,
        'happy'
      );
    }
    if (window.AudioFX) {
      window.AudioFX.playSuccess();
    }

    this.render();
  }

  selectDay(dayIndex) {
    this.selectedDayIndex = dayIndex;
    document.querySelectorAll('.journey-node-card').forEach((node, idx) => {
      node.classList.toggle('selected', idx === dayIndex);
      if (idx === dayIndex) {
        node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
    this.renderActiveDossier();
    const dossierEl = document.getElementById('journeyActiveDossier');
    if (dossierEl) {
      dossierEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  generateHeatmapHtml() {
    // Duolingo / GitHub style 28-day (4 weeks) activity heatmap
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const today = new Date();
    const cells = [];

    // Build 28 days ending today
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = this.state.activityMap[dateStr] || (i === 0 ? 8 : (i % 3 === 0 ? Math.floor(Math.random() * 15) + 5 : 0));
      
      let level = 0;
      if (count > 0 && count < 5) level = 1;
      else if (count >= 5 && count < 15) level = 2;
      else if (count >= 15 && count < 30) level = 3;
      else if (count >= 30) level = 4;

      const isToday = i === 0;
      cells.push(`
        <div class="heatmap-cell level-${level} ${isToday ? 'is-today' : ''}" 
             title="${dateStr}: ${count} Quests Solved">
        </div>
      `);
    }

    const pctMastered = Math.round((this.state.completedDays.length / this.days.length) * 100);

    return `
      <div class="journey-heatmap-card">
        <div class="journey-heatmap-header">
          <div class="journey-heatmap-title-block">
            <span class="heatmap-icon">🔥</span>
            <div>
              <div class="heatmap-title">Daily Practice Consistency &amp; Mastery Heatmap</div>
              <div class="heatmap-subtitle">4-Week Active Retrieval Streak &bull; Goal: 20 Quests / Day</div>
            </div>
          </div>
          <div class="journey-stats-row">
            <div class="journey-stat-badge">
              <span class="stat-num">${this.state.streak || 1}d</span>
              <span class="stat-lbl">Streak</span>
            </div>
            <div class="journey-stat-badge">
              <span class="stat-num">${this.state.completedDays.length} / 20</span>
              <span class="stat-lbl">Days Cleared</span>
            </div>
            <div class="journey-stat-badge">
              <span class="stat-num">${pctMastered}%</span>
              <span class="stat-lbl">Curriculum</span>
            </div>
            <div class="journey-stat-badge" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.3);">
              <span class="stat-num" style="color: #f59e0b;">${this.state.xp} XP</span>
              <span class="stat-lbl" style="color: #f59e0b;">Mastery XP</span>
            </div>
          </div>
        </div>

        <div class="journey-heatmap-grid-wrap">
          <div class="heatmap-days-legend">
            ${daysOfWeek.map(d => `<span class="day-label">${d}</span>`).join('')}
          </div>
          <div class="heatmap-cells-grid">
            ${cells.join('')}
          </div>
          <div class="heatmap-intensity-legend">
            <span style="font-size: 10px; color: var(--text-muted); margin-right: 4px;">Less</span>
            <span class="heatmap-cell level-0"></span>
            <span class="heatmap-cell level-1"></span>
            <span class="heatmap-cell level-2"></span>
            <span class="heatmap-cell level-3"></span>
            <span class="heatmap-cell level-4"></span>
            <span style="font-size: 10px; color: var(--text-muted); margin-left: 4px;">More</span>
          </div>
        </div>
      </div>
    `;
  }

  generateAdventureTrailHtml() {
    const activeDayNum = this.state.currentDay;

    const nodesHtml = this.days.map((d, idx) => {
      const isCompleted = this.state.completedDays.includes(d.day);
      const isCurrent = d.day === activeDayNum;
      const isSelected = idx === this.selectedDayIndex;
      const isLocked = d.day > activeDayNum && !isCompleted;

      let statusBadge = '';
      if (isCompleted) {
        statusBadge = `<span class="checkpoint-check">✓</span>`;
      } else if (isCurrent) {
        statusBadge = `<span class="checkpoint-active-pulse">●</span>`;
      } else {
        statusBadge = `<span class="checkpoint-lock">🔒</span>`;
      }

      // Bloub mascot rendered directly on the CURRENT checkpoint using authentic vector geometry
      let bloubMascotHtml = '';
      if (isCurrent) {
        bloubMascotHtml = `
          <div class="trail-bloub-avatar" title="Sir Bloops is stationed here!">
            <div class="trail-bloub-speech">
              <span>Day ${d.day}</span>
            </div>
            <div class="trail-bloub-svg-wrap">
              <svg viewBox="-140 -140 280 280" width="46" height="46" class="bloub-authentic-icon">
                <!-- Authentic Bloub Galet Pebble Body -->
                <path d="M97.7 0C97.2 3.19 96.46 6.34 95.64 9.42C94.82 12.5 93.86 15.52 92.78 18.46C91.71 21.4 90.5 24.27 89.19 27.05C87.88 29.84 86.42 32.55 84.9 35.17C83.38 37.8 81.76 40.33 80.08 42.8C78.4 45.27 76.66 47.68 74.83 50C73 52.32 71.09 54.56 69.11 56.71C67.13 58.87 65.06 60.94 62.93 62.93C60.8 64.92 58.6 66.82 56.33 68.64C54.06 70.46 51.73 72.2 49.33 73.83C46.93 75.46 44.45 76.99 41.91 78.4C39.37 79.82 36.77 81.15 34.1 82.32C31.44 83.49 28.69 84.54 25.92 85.45C23.15 86.36 20.32 87.14 17.46 87.78C14.61 88.42 11.7 88.92 8.79 89.27C5.88 89.62 2.93 89.85 0 89.9C-2.93 89.95 -5.89 89.81 -8.82 89.57C-11.75 89.33 -14.7 88.98 -17.6 88.47C-20.5 87.96 -23.38 87.27 -26.24 86.51C-29.1 85.75 -31.96 84.9 -34.75 83.89C-37.54 82.88 -40.28 81.69 -42.99 80.43C-45.7 79.17 -48.38 77.82 -51 76.33C-53.61 74.84 -56.17 73.22 -58.68 71.5C-61.19 69.79 -63.66 67.98 -66.04 66.04C-68.42 64.11 -70.74 62.05 -72.97 59.89C-75.2 57.73 -77.36 55.45 -79.41 53.06C-81.46 50.68 -83.44 48.18 -85.28 45.58C-87.12 42.98 -88.87 40.27 -90.45 37.46C-92.03 34.65 -93.48 31.74 -94.74 28.74C-95.99 25.74 -97.08 22.64 -97.98 19.49C-98.88 16.34 -99.63 13.11 -100.12 9.86C-100.61 6.61 -100.85 3.29 -100.9 0C-100.95 -3.29 -100.8 -6.62 -100.41 -9.89C-100.02 -13.16 -99.42 -16.44 -98.57 -19.61C-97.72 -22.78 -96.59 -25.9 -95.31 -28.91C-94.03 -31.92 -92.57 -34.87 -90.91 -37.66C-89.25 -40.45 -87.37 -43.12 -85.37 -45.63C-83.37 -48.14 -81.18 -50.51 -78.91 -52.72C-76.64 -54.93 -74.21 -56.98 -71.74 -58.87C-69.26 -60.76 -66.65 -62.46 -64.06 -64.06C-61.47 -65.66 -58.86 -67.15 -56.21 -68.49C-53.56 -69.83 -50.85 -71 -48.17 -72.09C-45.49 -73.18 -42.8 -74.15 -40.12 -75.05C-37.44 -75.95 -34.78 -76.76 -32.11 -77.51C-29.44 -78.26 -26.77 -78.87 -24.12 -79.52C-21.47 -80.17 -18.85 -80.85 -16.19 -81.41C-13.53 -81.97 -10.86 -82.43 -8.16 -82.9C-5.46 -83.36 -2.76 -83.82 0 -84.2C2.76 -84.58 5.55 -84.94 8.39 -85.19C11.23 -85.44 14.12 -85.66 17.05 -85.72C19.98 -85.78 22.95 -85.73 25.95 -85.55C28.95 -85.37 32 -85.09 35.05 -84.63C38.1 -84.17 41.2 -83.6 44.26 -82.81C47.32 -82.02 50.41 -81.07 53.39 -79.9C56.38 -78.73 59.32 -77.33 62.17 -75.76C65.02 -74.19 67.86 -72.46 70.5 -70.5C73.14 -68.54 75.66 -66.34 78 -64.01C80.34 -61.68 82.57 -59.15 84.56 -56.5C86.55 -53.84 88.38 -51 89.96 -48.08C91.54 -45.16 92.89 -42.07 94.05 -38.96C95.21 -35.85 96.22 -32.64 96.94 -29.41C97.66 -26.18 98.09 -22.85 98.37 -19.57C98.65 -16.29 98.73 -12.97 98.62 -9.71C98.51 -6.45 98.2 -3.19 97.7 0Z" fill="#ffffff" />
                <!-- Authentic Pill Eyes -->
                <g transform="translate(-24, 0)">
                  <path d="M-10 -12 A10 10 0 0 1 0 -22 L0 -22 A10 10 0 0 1 10 -12 L10 12 A10 10 0 0 1 0 22 L0 22 A10 10 0 0 1 -10 12 Z" fill="#0a0a0c" />
                </g>
                <g transform="translate(24, 0)">
                  <path d="M-10 -12 A10 10 0 0 1 0 -22 L0 -22 A10 10 0 0 1 10 -12 L10 12 A10 10 0 0 1 0 22 L0 22 A10 10 0 0 1 -10 12 Z" fill="#0a0a0c" />
                </g>
              </svg>
            </div>
          </div>
        `;
      }

      return `
        <div class="journey-node-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}"
             onclick="window.learningJourneyEngine.selectDay(${idx})">
          ${bloubMascotHtml}
          <div class="node-header">
            <span class="node-day-pill" style="border-left: 3px solid ${d.badgeColor};">Day ${d.day}</span>
            ${statusBadge}
          </div>
          <div class="node-title">${d.shortName}</div>
          <div class="node-category" style="color: ${d.badgeColor};">${d.category}</div>
          <div class="node-meta" style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 4px;">
            <span>${d.questRange}</span>
            <span style="font-size: 9px; padding: 1px 5px; border-radius: 4px; background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); font-weight: 600;">📐 Model</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="journey-trail-section">
        <div class="journey-trail-header">
          <div>
            <div class="trail-title">🗺️ Interactive 20-Day SQL Mastery Trail</div>
            <div class="trail-subtitle">Click any checkpoint to inspect objectives, silent traps, and launch quests. Complete your day to move Sir Bloops forward!</div>
          </div>
          <div class="trail-legend">
            <span class="legend-item"><span class="legend-dot completed">✓</span> Cleared</span>
            <span class="legend-item"><span class="legend-dot current">●</span> Sir Bloops Here</span>
            <span class="legend-item"><span class="legend-dot locked">🔒</span> Upcoming</span>
          </div>
        </div>

        <div class="journey-trail-track">
          ${nodesHtml}
        </div>
      </div>
    `;
  }

  generateActiveDossierHtml() {
    const day = this.days[this.selectedDayIndex] || this.days[0];
    const isCompleted = this.state.completedDays.includes(day.day);
    const isCurrent = day.day === this.state.currentDay;

    const objectivesHtml = day.objectives.map(o => `<li>${o}</li>`).join('');
    const mentalModelHtml = day.mentalModel.map(m => `<li>${m}</li>`).join('');
    const silentTrapsHtml = day.silentTraps.map(t => `
      <div class="dossier-trap-item">
        <span class="trap-warn-icon">⚠️</span>
        <span>${t}</span>
      </div>
    `).join('');

    return `
      <div class="journey-dossier-card" id="journeyActiveDossier">
        <div class="dossier-header" style="border-top: 4px solid ${day.badgeColor};">
          <div class="dossier-title-col">
            <div class="dossier-meta-row">
              <span class="dossier-day-tag" style="background: ${day.badgeColor}22; color: ${day.badgeColor};">Day ${day.day} of 20</span>
              <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary);">${day.category}</span>
              ${isCompleted ? '<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">✓ MASTERED</span>' : ''}
              ${isCurrent ? '<span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8;">ACTIVE CHECKPOINT</span>' : ''}
            </div>
            <h2 class="dossier-main-title">${day.title}</h2>
          </div>

          <div class="dossier-actions-col">
            <button class="action-btn action-btn-primary dossier-cta-btn" onclick="window.learningJourneyEngine.launchQuestForDay(${day.day})">
              <span>⚡ Launch Quests</span>
              <span style="font-size: 11px; opacity: 0.85;">(${day.questRange})</span>
            </button>
            <button class="action-btn action-btn-secondary" style="margin-top: 6px; background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;" onclick="if (window.CurriculumReaderEngine) window.CurriculumReaderEngine.openDay(${day.day})">
              <span>📖 Read Full Theory &amp; Defense</span>
            </button>
            <button class="action-btn action-btn-secondary" style="margin-top: 6px;" onclick="window.learningJourneyEngine.advanceToNextDay(${day.day})">
              ${isCompleted ? '✓ Completed (Advance Again)' : '🎉 Mark Mastered &amp; Advance Sir Bloops ➡️'}
            </button>
          </div>
        </div>

        <!-- Architectural Mental Model SVG Diagram -->
        ${day.svgExplainer ? `
          <div class="dossier-svg-card" style="margin: 14px 0; background: #080c14; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; overflow-x: auto;">
            <div style="font-family: var(--font-mono); font-size: 11px; font-weight: 800; color: #38bdf8; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>⚡ ARCHITECTURAL MENTAL MODEL &bull; DAY ${day.day} ENGINE FLOW</span>
            </div>
            ${day.svgExplainer}
          </div>
        ` : ''}

        <!-- Sir Bloops Co-Pilot Briefing Speech Card -->
        <div class="dossier-bloops-card">
          <div class="bloops-avatar-thumb">
            <svg viewBox="-158 -158 316 316" width="38" height="38">
              <path d="M 0 -85 C 50 -85 85 -50 85 0 C 85 50 50 85 0 85 C -50 85 -85 50 -85 0 C -85 -50 -50 -85 0 -85 Z" fill="#3ecf8e" />
              <ellipse cx="-20" cy="-8" rx="8" ry="12" fill="#ffffff" />
              <ellipse cx="20" cy="-8" rx="8" ry="12" fill="#ffffff" />
              <circle cx="-18" cy="-8" r="4" fill="#0a0a0c" />
              <circle cx="22" cy="-8" r="4" fill="#0a0a0c" />
            </svg>
          </div>
          <div class="bloops-speech-content">
            <div class="bloops-name">Sir Bloops-a-Lot &bull; Chief Co-Pilot Briefing</div>
            <div class="bloops-body">"${day.sirBloopsAdvice}"</div>
          </div>
        </div>

        <div class="dossier-grid">
          <!-- 1. Learning Objectives -->
          <div class="dossier-section-box">
            <div class="box-title">
              <span>🎯 Learning Objectives</span>
            </div>
            <ul class="dossier-list">
              ${objectivesHtml}
            </ul>
          </div>

          <!-- 2. Core Mental Model -->
          <div class="dossier-section-box">
            <div class="box-title">
              <span>🧠 Core Mental Model</span>
            </div>
            <ul class="dossier-list">
              ${mentalModelHtml}
            </ul>
          </div>
        </div>

        <!-- 3. Silent Traps & Defense Matrix -->
        <div class="dossier-section-box traps-box" style="margin-top: 14px;">
          <div class="box-title" style="color: #f59e0b;">
            <span>⚠️ Silent Traps Tested in this Checkpoint</span>
          </div>
          <div class="traps-container">
            ${silentTrapsHtml}
          </div>
        </div>

        <!-- 4. Quick Action Navigation Row -->
        <div class="dossier-footer-links">
          <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">TOPIC PRACTICE:</span>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.openTopicHubForDay(${day.day}, 'mcqs')">🧠 Day ${day.day} MCQs</button>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.openTopicHubForDay(${day.day}, 'cases')">💼 Day ${day.day} Case Studies</button>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.openTopicHubForDay(${day.day}, 'problems')">🏆 Day ${day.day} Query Problems</button>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.launchQuestForDay(${day.day})">🎮 Quests Terminal</button>
          <button class="dossier-pill-btn" onclick="switchMainView('viewExplainer')">📚 Study Docs</button>
        </div>
      </div>
    `;
  }

  openTopicHubForDay(dayNum, tabName = 'mcqs') {
    const dayModuleMap = {
      1: 'foundations',
      2: 'filtering',
      3: 'sorting',
      4: 'foundations',
      5: 'aggregations',
      6: 'aggregations',
      7: 'joins',
      8: 'joins',
      9: 'subqueries_ctes',
      10: 'subqueries_ctes',
      11: 'window',
      12: 'window',
      13: 'set_operations',
      14: 'set_operations',
      15: 'cloud_modern',
      16: 'cloud_modern',
      17: 'cloud_modern',
      18: 'cloud_modern',
      19: 'cloud_modern',
      20: 'cloud_modern'
    };
    const modId = dayModuleMap[dayNum] || 'all';
    if (typeof switchMainView === 'function') {
      switchMainView('viewMcqs');
    }
    if (typeof renderMcqs === 'function') {
      renderMcqs(null, true, modId, tabName);
    }
  }

  launchQuestForDay(dayNum) {
    const day = this.days.find(d => d.day === dayNum) || this.days[0];
    
    // Switch to Quests view
    if (typeof switchMainView === 'function') {
      switchMainView('viewQuests');
    }
    
    // Switch to section
    if (typeof switchQuestSection === 'function') {
      switchQuestSection(day.sectionKey);
    }

    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say(
        `🚀 Launched ${day.title}! Complete these fill-in-the-blank quests to master today's challenge!`,
        5000,
        'happy'
      );
    }
  }

  renderActiveDossier() {
    const container = document.getElementById('journeyActiveDossierContainer');
    if (container) {
      container.innerHTML = this.generateActiveDossierHtml();
    }
  }

  render() {
    const container = document.getElementById('viewLearningJourney');
    if (!container) return;

    container.innerHTML = `
      <div class="learning-journey-page">
        <!-- 1. Header & Consistency Heatmap -->
        ${this.generateHeatmapHtml()}

        <!-- 2. Interactive Adventure Trail with Sir Bloops -->
        ${this.generateAdventureTrailHtml()}

        <!-- 3. Active Day Dossier -->
        <div id="journeyActiveDossierContainer">
          ${this.generateActiveDossierHtml()}
        </div>
      </div>
    `;
  }
}

// Global engine instance
window.learningJourneyEngine = new LearningJourneyEngine();
window.renderLearningJourney = function() {
  window.learningJourneyEngine.render();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.learningJourneyEngine.saveState();
  });
} else {
  window.learningJourneyEngine.saveState();
}

