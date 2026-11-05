// =============================================================================
// TRACK 07: SET OPERATIONS & RELATIONAL ALGEBRA LAB
// =============================================================================

window.SETOPS_SCHEMA = {
  tableName: 'OmniChannelCustomers',
  tableA: {
    name: 'OnlineUsers',
    columns: ['user_id', 'email', 'city', 'tier'],
    rows: [
      { user_id: 1, email: 'alice@acme.com', city: 'San Francisco', tier: 'Enterprise' },
      { user_id: 2, email: 'bob@globex.com', city: 'New York', tier: 'Pro' },
      { user_id: 3, email: 'charlie@initech.com', city: 'Austin', tier: 'Pro' },
      { user_id: 4, email: 'diana@soylent.com', city: 'Chicago', tier: 'Free' },
      { user_id: 5, email: 'evan@umbrella.com', city: 'Seattle', tier: 'Enterprise' }
    ]
  },
  tableB: {
    name: 'StoreCustomers',
    columns: ['cust_id', 'email', 'city', 'store_location'],
    rows: [
      { cust_id: 201, email: 'bob@globex.com', city: 'New York', store_location: '5th Ave Flagship' },
      { cust_id: 202, email: 'charlie@initech.com', city: 'Austin', store_location: 'Domain Center' },
      { cust_id: 203, email: 'fiona@wayne.com', city: 'Gotham', store_location: 'Gotham Plaza' },
      { cust_id: 204, email: 'george@stark.com', city: 'Malibu', store_location: 'Coastline Store' },
      { cust_id: 205, email: 'hannah@cyberdyne.com', city: 'Los Angeles', store_location: 'Sunset Blvd' }
    ]
  },
  // Flattened default for table view
  rows: [
    { source: 'ONLINE', email: 'alice@acme.com', city: 'San Francisco' },
    { source: 'ONLINE', email: 'bob@globex.com', city: 'New York' },
    { source: 'ONLINE', email: 'charlie@initech.com', city: 'Austin' },
    { source: 'ONLINE', email: 'diana@soylent.com', city: 'Chicago' },
    { source: 'ONLINE', email: 'evan@umbrella.com', city: 'Seattle' },
    { source: 'STORE', email: 'bob@globex.com', city: 'New York' },
    { source: 'STORE', email: 'charlie@initech.com', city: 'Austin' },
    { source: 'STORE', email: 'fiona@wayne.com', city: 'Gotham' },
    { source: 'STORE', email: 'george@stark.com', city: 'Malibu' },
    { source: 'STORE', email: 'hannah@cyberdyne.com', city: 'Los Angeles' }
  ]
};

window.SETOPS_STEPS = [
  // ---------------------------------------------------------------------------
  // STEP 01: The Relational Set Union Contract
  // ---------------------------------------------------------------------------
  {
    stepIndex: 1,
    id: 'setops_contract',
    keyword: 'SET UNION CONTRACT',
    title: 'Step 01: The Relational Set Union Contract',
    pillClass: 'pill-setops',
    conceptHeading: 'Arity, Type Coercion, and Heading Resolution Rules',
    conceptText: 'In relational algebra, set operations (UNION, INTERSECT, EXCEPT) operate vertically on tuples rather than horizontally like JOINs. To perform any set operation, both queries must satisfy the Relational Contract: 1) Exactly the same number of columns (Arity), and 2) Compatible data types in matching positional order. The resulting column names are ALWAYS determined solely by the FIRST query.',
    sqlCode: `SELECT email, city FROM OnlineUsers\nUNION\nSELECT email, city FROM StoreCustomers;`,
    explanationPoints: [
      'Query 1 specifies (email VARCHAR, city VARCHAR) -> Arity = 2.',
      'Query 2 must also supply 2 columns with compatible types.',
      'If Query 2 had `SELECT city, email`, SQL would silently mix cities into emails because it binds by position, not column name!',
      'Column aliases in the second query are completely ignored.'
    ],
    gotcha: 'POSITIONAL BINDING TRAP: SQL engines match columns by positional index ($1 with $1, $2 with $2), NOT by column name! If you swap column order in Query 2, SQL will not warn you if data types are compatible.',
    actionPrompt: 'Combining Online and Store customer directories under the Relational Contract:',
    transform: () => [
      { email: 'alice@acme.com', city: 'San Francisco', channel: 'Online Only', _status: 'passed', _label: 'ONLINE UNIQUE' },
      { email: 'bob@globex.com', city: 'New York', channel: 'Omni-Channel', _status: 'passed', _label: 'DUPLICATE RESOLVED' },
      { email: 'charlie@initech.com', city: 'Austin', channel: 'Omni-Channel', _status: 'passed', _label: 'DUPLICATE RESOLVED' },
      { email: 'diana@soylent.com', city: 'Chicago', channel: 'Online Only', _status: 'passed', _label: 'ONLINE UNIQUE' },
      { email: 'evan@umbrella.com', city: 'Seattle', channel: 'Online Only', _status: 'passed', _label: 'ONLINE UNIQUE' },
      { email: 'fiona@wayne.com', city: 'Gotham', channel: 'Store Only', _status: 'passed', _label: 'STORE UNIQUE' },
      { email: 'george@stark.com', city: 'Malibu', channel: 'Store Only', _status: 'passed', _label: 'STORE UNIQUE' },
      { email: 'hannah@cyberdyne.com', city: 'Los Angeles', channel: 'Store Only', _status: 'passed', _label: 'STORE UNIQUE' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Vertical Stacking Diagram -->
        <g transform="translate(30, 20)">
          <!-- Top: Query 1 -->
          <rect width="280" height="50" rx="3" fill="#121318" stroke="#3f3f46"/>
          <text x="12" y="18" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">QUERY 1: OnlineUsers</text>
          <text x="12" y="36" fill="#10b981" font-family="monospace" font-size="8">Pos 1: email [VARCHAR] | Pos 2: city [VARCHAR]</text>

          <!-- Middle Operator -->
          <g transform="translate(140, 56)">
            <rect x="-40" y="0" width="80" height="24" fill="#18181b" stroke="#ffffff" rx="3"/>
            <text x="0" y="16" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700" text-anchor="middle">&cup; UNION</text>
          </g>

          <!-- Bottom: Query 2 -->
          <rect y="86" width="280" height="50" rx="3" fill="#121318" stroke="#3f3f46"/>
          <text x="12" y="104" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">QUERY 2: StoreCustomers</text>
          <text x="12" y="122" fill="#10b981" font-family="monospace" font-size="8">Pos 1: email [VARCHAR] | Pos 2: city [VARCHAR]</text>

          <!-- Arrow to Right -->
          <g transform="translate(310, 70)">
            <path d="M 0 0 L 40 0" stroke="#10b981" stroke-width="2"/>
            <polygon points="40,-4 48,0 40,4" fill="#10b981"/>
          </g>

          <!-- Unified Output Table -->
          <g transform="translate(370, 0)">
            <rect width="360" height="140" rx="4" fill="#121318" stroke="#10b981"/>
            <rect width="360" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">RESULT SET (Heading from Query 1)</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">&bull; Column names locked to Query 1 definition</text>
              <text x="0" y="30" fill="#a1a1aa" font-family="monospace" font-size="8">&bull; Total distinct customer entities = 8</text>
              <text x="0" y="46" fill="#a1a1aa" font-family="monospace" font-size="8">&bull; Bob &amp; Charlie merged into single tuples</text>
              <rect y="58" width="335" height="25" fill="#064e3b" rx="2"/>
              <text x="10" y="74" fill="#6ee7b7" font-family="monospace" font-size="8">Contract Validated: Pure Relational Set</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 02: UNION vs UNION ALL
  // ---------------------------------------------------------------------------
  {
    stepIndex: 2,
    id: 'setops_union_all',
    keyword: 'UNION vs UNION ALL',
    title: 'Step 02: The Deduplication Barrier (UNION vs UNION ALL)',
    pillClass: 'pill-setops',
    conceptHeading: 'The Hidden Sort/Hash Performance Cost of Bare UNION',
    conceptText: 'UNION performs a mandatory deduplication pass across the combined dataset: the engine must sort or hash the entire combined record set ($O(N \log N)$), discarding identical rows. UNION ALL skips deduplication completely, streaming rows directly as a concatenated pipeline in $O(N)$ linear time.',
    sqlCode: `-- BARE UNION: 8 rows returned (Deduplicated with Sort/Hash)\nSELECT email, city FROM OnlineUsers\nUNION\nSELECT email, city FROM StoreCustomers;\n\n-- UNION ALL: 10 rows returned (Zero Sort Overhead, Preserves Duplicates)\nSELECT email, city FROM OnlineUsers\nUNION ALL\nSELECT email, city FROM StoreCustomers;`,
    explanationPoints: [
      'UNION ALL is a pure streaming concatenation: zero tempdb spill or hash memory pressure.',
      'UNION incurs an expensive Unique/Sort or HashAggregate physical operator.',
      'If you already know the two datasets are disjoint (e.g. CurrentOrders vs ArchivedOrders), NEVER use bare UNION; always use UNION ALL.',
      'Production golden rule: Default to UNION ALL unless deduplication is an explicit business requirement.'
    ],
    gotcha: 'THE BILLION-ROW UNION DISASTER: Running bare UNION across two 100-million row tables forces the engine to sort 200 million rows in temp storage. Changing to UNION ALL cuts query latency from 12 minutes to 1.4 seconds!',
    actionPrompt: 'Comparing output row counts between UNION (8 unique) vs UNION ALL (10 raw rows):',
    transform: () => [
      { source: 'OnlineUsers', email: 'alice@acme.com', city: 'San Francisco', status_in_union_all: 'Preserved (Row 1)' },
      { source: 'OnlineUsers', email: 'bob@globex.com', city: 'New York', status_in_union_all: 'Preserved (Row 2)' },
      { source: 'OnlineUsers', email: 'charlie@initech.com', city: 'Austin', status_in_union_all: 'Preserved (Row 3)' },
      { source: 'OnlineUsers', email: 'diana@soylent.com', city: 'Chicago', status_in_union_all: 'Preserved (Row 4)' },
      { source: 'OnlineUsers', email: 'evan@umbrella.com', city: 'Seattle', status_in_union_all: 'Preserved (Row 5)' },
      { source: 'StoreCustomers', email: 'bob@globex.com', city: 'New York', status_in_union_all: 'DUPLICATE KEPT (Row 6)' },
      { source: 'StoreCustomers', email: 'charlie@initech.com', city: 'Austin', status_in_union_all: 'DUPLICATE KEPT (Row 7)' },
      { source: 'StoreCustomers', email: 'fiona@wayne.com', city: 'Gotham', status_in_union_all: 'Preserved (Row 8)' },
      { source: 'StoreCustomers', email: 'george@stark.com', city: 'Malibu', status_in_union_all: 'Preserved (Row 9)' },
      { source: 'StoreCustomers', email: 'hannah@cyberdyne.com', city: 'Los Angeles', status_in_union_all: 'Preserved (Row 10)' }
    ].map(r => ({
      ...r,
      _status: r.status_in_union_all.includes('DUPLICATE') ? 'rejected' : 'passed',
      _label: r.status_in_union_all.includes('DUPLICATE') ? 'DROPPED IN UNION' : 'PRESERVED'
    })),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Side-by-side engine execution: Sort Barrier vs Pipe Stream -->
        <g transform="translate(30, 20)">
          <!-- Left: UNION ALL (Fast Streaming) -->
          <g transform="translate(0, 0)">
            <rect width="340" height="140" rx="4" fill="#121318" stroke="#10b981" stroke-width="1.2"/>
            <rect width="340" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">UNION ALL: STREAMING PIPE (O(N))</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#10b981" font-family="monospace" font-size="8">5 rows Online + 5 rows Store &rarr; Direct Stream</text>
              <rect y="24" width="315" height="25" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="10" y="40" fill="#6ee7b7" font-family="monospace" font-size="8">&rArr; 10 rows piped straight to client</text>
              <text x="0" y="70" fill="#a1a1aa" font-family="monospace" font-size="8">Zero memory barrier. Instant first-row response.</text>
              <text x="0" y="92" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Ideal for unioning partitioned archives &bull;</text>
            </g>
          </g>

          <!-- Right: UNION (Sort Deduplication) -->
          <g transform="translate(370, 0)">
            <rect width="350" height="140" rx="4" fill="#121318" stroke="#f59e0b" stroke-width="1.2"/>
            <rect width="350" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#f59e0b" font-family="monospace" font-size="8.5" font-weight="700">BARE UNION: SORT / HASH BARRIER (O(N log N))</text>
            <g transform="translate(12, 34)">
              <rect y="10" width="325" height="30" fill="#1c1917" stroke="#b45309" rx="2"/>
              <text x="10" y="28" fill="#fcd34d" font-family="monospace" font-size="8">SORT BUFFER: Sorting 10 rows in memory</text>
              <text x="0" y="58" fill="#a1a1aa" font-family="monospace" font-size="8">Eliminates duplicate (Bob) and (Charlie)</text>
              <text x="0" y="74" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">&rArr; Returns 8 distinct tuples</text>
              <text x="0" y="92" fill="#ef4444" font-family="monospace" font-size="7.5">&bull; High CPU &amp; RAM cost at scale &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 03: INTERSECT - Finding Common Elements
  // ---------------------------------------------------------------------------
  {
    stepIndex: 3,
    id: 'setops_intersect',
    keyword: 'INTERSECT',
    title: 'Step 03: The INTERSECT Operation (Omnichannel Cohorts)',
    pillClass: 'pill-setops',
    conceptHeading: 'Finding Tuples That Exist Simultaneously in Both Input Sets',
    conceptText: 'INTERSECT produces only those rows that exist in BOTH Query 1 and Query 2. In relational terms, this solves omnichannel cohort identification: finding customers who have both an online login AND a physical retail store transaction.',
    sqlCode: `SELECT email, city FROM OnlineUsers\nINTERSECT\nSELECT email, city FROM StoreCustomers;`,
    explanationPoints: [
      'Bob Jones (bob@globex.com, New York) exists in both tables.',
      'Charlie Brown (charlie@initech.com, Austin) exists in both tables.',
      'The result set contains exactly 2 rows.',
      'NULL HANDLING: In standard SQL comparisons, NULL = NULL is UNKNOWN. However, in set operations, the ANSI standard specifies that two NULLs are considered EQUAL and match!'
    ],
    gotcha: 'INTERSECT vs INNER JOIN: INTERSECT compares entire rows across all projected columns, not just keys. Furthermore, INTERSECT automatically deduplicates rows in the intersection, whereas INNER JOIN creates combinatorial Cartesian multiplications if duplicate keys exist.',
    actionPrompt: 'Isolating customers present in both online and retail store databases:',
    transform: () => [
      { email: 'bob@globex.com', city: 'New York', omnichannel_status: 'CONFIRMED MULTI-CHANNEL', _status: 'passed', _label: 'INTERSECT MATCH (NYC)' },
      { email: 'charlie@initech.com', city: 'Austin', omnichannel_status: 'CONFIRMED MULTI-CHANNEL', _status: 'passed', _label: 'INTERSECT MATCH (AUSTIN)' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Venn diagram showing intersection lens -->
        <g transform="translate(60, 20)">
          <!-- Circle 1: Online -->
          <circle cx="160" cy="70" r="65" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
          <text x="120" y="45" fill="#a1a1aa" font-family="monospace" font-size="8.5" font-weight="700">Online Users</text>
          <text x="120" y="65" fill="#71717a" font-family="monospace" font-size="7.5">Alice, Diana, Evan</text>

          <!-- Circle 2: Store -->
          <circle cx="270" cy="70" r="65" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
          <text x="310" y="45" fill="#a1a1aa" font-family="monospace" font-size="8.5" font-weight="700">Store Users</text>
          <text x="310" y="65" fill="#71717a" font-family="monospace" font-size="7.5">Fiona, George, Hannah</text>

          <!-- Intersect lens highlight -->
          <path d="M 215 15 A 65 65 0 0 1 215 125 A 65 65 0 0 1 215 15" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="2"/>
          <text x="215" y="65" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="middle">&cap; INTERSECT</text>
          <text x="215" y="80" fill="#6ee7b7" font-family="monospace" font-size="8" text-anchor="middle">Bob &amp; Charlie</text>

          <!-- Result Card on Right -->
          <g transform="translate(420, 10)">
            <rect width="250" height="120" fill="#121318" stroke="#10b981" rx="4"/>
            <text x="15" y="24" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">OUTPUT: 2 TUPLES</text>
            <g transform="translate(15, 40)">
              <text x="0" y="14" fill="#10b981" font-family="monospace" font-size="8">1. bob@globex.com (New York)</text>
              <text x="0" y="32" fill="#10b981" font-family="monospace" font-size="8">2. charlie@initech.com (Austin)</text>
              <path d="M 0 46 L 220 46" stroke="#27272a"/>
              <text x="0" y="60" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Strict relational intersection &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 04: EXCEPT / MINUS - Asymmetric Difference
  // ---------------------------------------------------------------------------
  {
    stepIndex: 4,
    id: 'setops_except',
    keyword: 'EXCEPT / MINUS',
    title: 'Step 04: Asymmetric Difference (EXCEPT / MINUS)',
    pillClass: 'pill-setops',
    conceptHeading: 'Directionality Matters: A \\ B is Never Equal to B \\ A',
    conceptText: 'EXCEPT (called MINUS in Oracle) returns all distinct rows that appear in the first query but do NOT appear in the second query. Unlike UNION and INTERSECT, EXCEPT is strictly non-commutative: Query 1 EXCEPT Query 2 returns Online-Only customers, while Query 2 EXCEPT Query 1 returns Store-Only customers.',
    sqlCode: `-- ONLINE ONLY CUSTOMERS (Query 1 \\ Query 2):\nSELECT email, city FROM OnlineUsers\nEXCEPT\nSELECT email, city FROM StoreCustomers;\n\n-- STORE ONLY CUSTOMERS (Query 2 \\ Query 1):\nSELECT email, city FROM StoreCustomers\nEXCEPT\nSELECT email, city FROM OnlineUsers;`,
    explanationPoints: [
      'Online \\ Store: Removes Bob and Charlie from Online users -> Leaves Alice, Diana, and Evan (3 rows).',
      'Store \\ Online: Removes Bob and Charlie from Store users -> Leaves Fiona, George, and Hannah (3 rows).',
      'Acts as an elegant alternative to `LEFT JOIN ... WHERE right.key IS NULL` (anti-join).',
      'ANSI standard uses EXCEPT; Oracle uses MINUS.'
    ],
    gotcha: 'THE DIRECTIONALITY TRAP: In math, A + B = B + A. But in set difference, A - B != B - A! Swapping the query order completely alters the target cohort.',
    actionPrompt: 'Computing Online-Only customers (Online minus Store users):',
    transform: () => [
      { email: 'alice@acme.com', city: 'San Francisco', channel: '100% Digital Native', _status: 'passed', _label: 'ONLINE ONLY' },
      { email: 'diana@soylent.com', city: 'Chicago', channel: '100% Digital Native', _status: 'passed', _label: 'ONLINE ONLY' },
      { email: 'evan@umbrella.com', city: 'Seattle', channel: '100% Digital Native', _status: 'passed', _label: 'ONLINE ONLY' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Directional Venn comparison -->
        <g transform="translate(30, 20)">
          <!-- Left: A EXCEPT B -->
          <g transform="translate(0, 0)">
            <rect width="340" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
            <rect width="340" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">ONLINE EXCEPT STORE (A \ B)</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#10b981" font-family="monospace" font-size="8">&check; Alice, Diana, Evan (3 online-only)</text>
              <text x="0" y="32" fill="#ef4444" font-family="monospace" font-size="8">&cross; Bob &amp; Charlie subtracted out</text>
              <rect y="46" width="315" height="26" fill="#18181b" stroke="#10b981" rx="2"/>
              <text x="10" y="63" fill="#10b981" font-family="monospace" font-size="8">Output: 3 digital native customers</text>
            </g>
          </g>

          <!-- Right: B EXCEPT A -->
          <g transform="translate(370, 0)">
            <rect width="350" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
            <rect width="350" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">STORE EXCEPT ONLINE (B \ A)</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#3b82f6" font-family="monospace" font-size="8">&check; Fiona, George, Hannah (3 store-only)</text>
              <text x="0" y="32" fill="#ef4444" font-family="monospace" font-size="8">&cross; Bob &amp; Charlie subtracted out</text>
              <rect y="46" width="325" height="26" fill="#18181b" stroke="#3b82f6" rx="2"/>
              <text x="10" y="63" fill="#3b82f6" font-family="monospace" font-size="8">Output: 3 retail-only customers</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 05: Symmetric Difference & Relational Anti-Joins
  // ---------------------------------------------------------------------------
  {
    stepIndex: 5,
    id: 'setops_symmetric_diff',
    keyword: 'SYMMETRIC DIFF',
    title: 'Step 05: Symmetric Difference (Single-Channel Shoppers)',
    pillClass: 'pill-setops',
    conceptHeading: 'Computing (A \\ B) UNION (B \\ A): Customers in Exactly One Channel',
    conceptText: 'In mathematical set theory, the symmetric difference of two sets represents all elements that belong to either set, but NOT to their intersection. While standard SQL does not have a native `XOR` set operator, you synthesize it by unioning the two asymmetric differences: (A EXCEPT B) UNION ALL (B EXCEPT A).',
    sqlCode: `(SELECT email, city FROM OnlineUsers\n EXCEPT\n SELECT email, city FROM StoreCustomers)\nUNION ALL\n(SELECT email, city FROM StoreCustomers\n EXCEPT\n SELECT email, city FROM OnlineUsers);`,
    explanationPoints: [
      'Component 1: (Online EXCEPT Store) yields 3 online-only users.',
      'Component 2: (Store EXCEPT Online) yields 3 store-only users.',
      'UNION ALL combines them safely because the two sets are mathematically guaranteed to be disjoint.',
      'Total result: 6 single-channel shoppers (Bob and Charlie excluded).'
    ],
    gotcha: 'PARENTHESES ARE MANDATORY: Without parentheses surrounding each EXCEPT branch, SQL engine parsers will evaluate set operators in order of standard precedence, generating syntax or logical errors.',
    actionPrompt: 'Combining both single-channel cohorts into unified 6-person outreach list:',
    transform: () => [
      { email: 'alice@acme.com', city: 'San Francisco', channel: 'Online Only', _status: 'passed', _label: 'SINGLE CHANNEL' },
      { email: 'diana@soylent.com', city: 'Chicago', channel: 'Online Only', _status: 'passed', _label: 'SINGLE CHANNEL' },
      { email: 'evan@umbrella.com', city: 'Seattle', channel: 'Online Only', _status: 'passed', _label: 'SINGLE CHANNEL' },
      { email: 'fiona@wayne.com', city: 'Gotham', channel: 'Store Only', _status: 'passed', _label: 'SINGLE CHANNEL' },
      { email: 'george@stark.com', city: 'Malibu', channel: 'Store Only', _status: 'passed', _label: 'SINGLE CHANNEL' },
      { email: 'hannah@cyberdyne.com', city: 'Los Angeles', channel: 'Store Only', _status: 'passed', _label: 'SINGLE CHANNEL' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Symmetric difference visualization: Wings shaded, middle hollow -->
        <g transform="translate(80, 20)">
          <!-- Left Wing: Shaded Green -->
          <circle cx="160" cy="70" r="65" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5"/>
          <!-- Right Wing: Shaded Blue -->
          <circle cx="270" cy="70" r="65" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1.5"/>

          <!-- Middle Intersection Cut Out (Black/Dark) -->
          <path d="M 215 15 A 65 65 0 0 1 215 125 A 65 65 0 0 1 215 15" fill="#090a0d" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
          <text x="215" y="72" fill="#ef4444" font-family="monospace" font-size="8" text-anchor="middle">&cross; Excluded</text>

          <text x="135" y="70" fill="#10b981" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">Online Only</text>
          <text x="295" y="70" fill="#3b82f6" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">Store Only</text>

          <!-- Formula Explainer -->
          <g transform="translate(420, 15)">
            <rect width="240" height="110" fill="#121318" stroke="#3f3f46" rx="4"/>
            <text x="15" y="24" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">SYMMETRIC DIFFERENCE</text>
            <g transform="translate(15, 40)">
              <text x="0" y="14" fill="#10b981" font-family="monospace" font-size="8">(A \ B) &cup; (B \ A)</text>
              <text x="0" y="32" fill="#a1a1aa" font-family="monospace" font-size="8">3 Online + 3 Store = 6 rows</text>
              <path d="M 0 44 L 210 44" stroke="#27272a"/>
              <text x="0" y="58" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Exactly 1 channel per customer &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 06: Operator Precedence & Parentheses
  // ---------------------------------------------------------------------------
  {
    stepIndex: 6,
    id: 'setops_precedence',
    keyword: 'PRECEDENCE',
    title: 'Step 06: Operator Precedence Rules (INTERSECT vs UNION)',
    pillClass: 'pill-setops',
    conceptHeading: 'INTERSECT Binds Tighter Than UNION or EXCEPT in ANSI Standards',
    conceptText: 'Just like multiplication (*) takes precedence over addition (+) in basic math, the ANSI SQL standard mandates that INTERSECT has higher operator precedence than UNION and EXCEPT. When chaining compound set operations without parentheses, the engine evaluates INTERSECT first.',
    sqlCode: `-- A UNION B INTERSECT C evaluates as: A UNION (B INTERSECT C)\nSELECT email FROM OnlineUsers\nUNION\nSELECT email FROM StoreCustomers\nINTERSECT\nSELECT email FROM VIPList;\n\n-- TO FORCE UNION FIRST, USE EXPLICIT PARENTHESES:\n(SELECT email FROM OnlineUsers\n UNION\n SELECT email FROM StoreCustomers)\nINTERSECT\nSELECT email FROM VIPList;`,
    explanationPoints: [
      'In ANSI SQL, INTERSECT binds first, just like `a + b * c` evaluates `b * c` first.',
      'SQLite, PostgreSQL, and Oracle adhere strictly to this precedence hierarchy.',
      'Parentheses override default precedence, making query intent explicit and portable.',
      'Always use explicit parentheses in production code to avoid developer confusion.'
    ],
    gotcha: 'THE UNPARENTHESIZED TRAP: Relying on implicit set operator precedence is the #1 source of subtle data discrepancies during database engine migrations.',
    actionPrompt: 'Observing compiler grouping in multi-operator compound set queries:',
    transform: () => [
      { step: '1. INTERSECT Evaluation', target: 'StoreCustomers ∩ VIPList', result: '1 VIP store buyer', _status: 'loaded', _label: 'HIGH PRECEDENCE' },
      { step: '2. UNION Evaluation', target: 'OnlineUsers ∪ (Intersect Result)', result: '6 total buyers', _status: 'passed', _label: 'FINAL RESULT' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Precedence AST diagram -->
        <g transform="translate(30, 20)">
          <text x="0" y="16" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">ANSI SET OPERATOR PRECEDENCE HIERARCHY</text>
          
          <g transform="translate(10, 35)">
            <!-- Left: Default ANSI AST -->
            <rect x="0" y="0" width="340" height="95" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="20" fill="#f59e0b" font-family="monospace" font-size="8.5" font-weight="700">DEFAULT: A UNION B INTERSECT C</text>
            <text x="12" y="38" fill="#a1a1aa" font-family="monospace" font-size="8">&rarr; Evaluates as: A &cup; (B &cap; C)</text>
            <rect x="12" y="48" width="315" height="24" fill="#18181b" stroke="#f59e0b" rx="2"/>
            <text x="20" y="64" fill="#fcd34d" font-family="monospace" font-size="8">INTERSECT binds first (Like Multiplication)</text>
            <text x="12" y="86" fill="#71717a" font-family="monospace" font-size="7.5">Precedence: INTERSECT &gt; UNION / EXCEPT</text>

            <!-- Right: Parenthesized AST -->
            <rect x="370" y="0" width="340" height="95" fill="#121318" stroke="#10b981" rx="3"/>
            <text x="12" y="20" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">EXPLICIT: (A UNION B) INTERSECT C</text>
            <text x="12" y="38" fill="#10b981" font-family="monospace" font-size="8">&rarr; Evaluates as: (A &cup; B) &cap; C</text>
            <rect x="12" y="48" width="315" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
            <text x="20" y="64" fill="#6ee7b7" font-family="monospace" font-size="8">Forces UNION first (Explicit Control)</text>
            <text x="12" y="86" fill="#10b981" font-family="monospace" font-size="7.5">Production Best Practice: Always use parentheses!</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 07: Compound Set Aggregations
  // ---------------------------------------------------------------------------
  {
    stepIndex: 7,
    id: 'setops_aggregations',
    keyword: 'SET AGGREGATION',
    title: 'Step 07: Post-Union Aggregations & Rollup Metrics',
    pillClass: 'pill-setops',
    conceptHeading: 'Analyzing Multi-Source Pipelines with Combined Set CTEs',
    conceptText: 'In real enterprise systems, set operations feed downstream aggregations. By wrapping a UNION ALL inside a CTE or derived table, you can tag each source record with an origin channel flag and immediately perform GROUP BY aggregations to compare channel contribution, customer overlap, and geographic penetration.',
    sqlCode: `WITH CombinedDirectory AS (\n  SELECT email, city, 'Online' AS channel FROM OnlineUsers\n  UNION ALL\n  SELECT email, city, 'Store' AS channel FROM StoreCustomers\n)\nSELECT city,\n       COUNT(*) AS total_interactions,\n       COUNT(DISTINCT email) AS unique_customers,\n       SUM(CASE WHEN channel = 'Online' THEN 1 ELSE 0 END) AS online_touches,\n       SUM(CASE WHEN channel = 'Store' THEN 1 ELSE 0 END) AS store_touches\nFROM CombinedDirectory\nGROUP BY city\nORDER BY total_interactions DESC;`,
    explanationPoints: [
      'Tags source rows with synthetic literal column (`\'Online\'` vs `\'Store\'`).',
      'UNION ALL streams all 10 interactions without sort penalty.',
      'Downstream GROUP BY aggregates customer density per city.',
      'Reveals cities with omnichannel presence (New York: 2 touches, Austin: 2 touches).'
    ],
    gotcha: 'COUNT(*) vs COUNT(DISTINCT): Because UNION ALL preserves duplicates, COUNT(*) counts total touchpoints (10), while COUNT(DISTINCT email) counts unique people (8).',
    actionPrompt: 'Aggregating city penetration metrics from the unified omnichannel directory:',
    transform: () => [
      { city: 'New York', total_touches: 2, unique_customers: 1, online_touches: 1, store_touches: 1, _status: 'passed', _label: 'OMNICHANNEL HUB' },
      { city: 'Austin', total_touches: 2, unique_customers: 1, online_touches: 1, store_touches: 1, _status: 'passed', _label: 'OMNICHANNEL HUB' },
      { city: 'San Francisco', total_touches: 1, unique_customers: 1, online_touches: 1, store_touches: 0, _status: 'loaded', _label: 'ONLINE ONLY' },
      { city: 'Chicago', total_touches: 1, unique_customers: 1, online_touches: 1, store_touches: 0, _status: 'loaded', _label: 'ONLINE ONLY' },
      { city: 'Seattle', total_touches: 1, unique_customers: 1, online_touches: 1, store_touches: 0, _status: 'loaded', _label: 'ONLINE ONLY' },
      { city: 'Gotham', total_touches: 1, unique_customers: 1, online_touches: 0, store_touches: 1, _status: 'loaded', _label: 'STORE ONLY' },
      { city: 'Malibu', total_touches: 1, unique_customers: 1, online_touches: 0, store_touches: 1, _status: 'loaded', _label: 'STORE ONLY' },
      { city: 'Los Angeles', total_touches: 1, unique_customers: 1, online_touches: 0, store_touches: 1, _status: 'loaded', _label: 'STORE ONLY' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Multi-channel rollup pipeline -->
        <g transform="translate(30, 20)">
          <!-- Ingest Stage -->
          <rect width="210" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="210" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">1. UNION ALL INGEST</text>
          <g transform="translate(10, 34)">
            <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="7.5">Streams 10 tuples with tags:</text>
            <text x="0" y="30" fill="#10b981" font-family="monospace" font-size="7.5">+ channel: 'Online'</text>
            <text x="0" y="44" fill="#3b82f6" font-family="monospace" font-size="7.5">+ channel: 'Store'</text>
            <text x="0" y="64" fill="#71717a" font-family="monospace" font-size="7.5">Zero deduplication overhead</text>
          </g>

          <g transform="translate(215, 70)">
            <path d="M 0 0 L 35 0" stroke="#71717a" stroke-width="1.5"/>
            <polygon points="35,-3 41,0 35,3" fill="#a1a1aa"/>
          </g>

          <!-- Aggregation Stage -->
          <rect x="260" y="0" width="220" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect x="260" y="0" width="220" height="24" rx="4" fill="#18181b"/>
          <text x="272" y="16" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">2. GROUP BY city</text>
          <g transform="translate(270, 34)">
            <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="7.5">Buckets rows by city</text>
            <text x="0" y="30" fill="#a1a1aa" font-family="monospace" font-size="7.5">Computes channel touch splits</text>
            <text x="0" y="50" fill="#10b981" font-family="monospace" font-size="7.5">New York &rarr; 1 Online, 1 Store</text>
            <text x="0" y="66" fill="#10b981" font-family="monospace" font-size="7.5">Austin   &rarr; 1 Online, 1 Store</text>
          </g>

          <g transform="translate(485, 70)">
            <path d="M 0 0 L 35 0" stroke="#71717a" stroke-width="1.5"/>
            <polygon points="35,-3 41,0 35,3" fill="#a1a1aa"/>
          </g>

          <!-- Output Stage -->
          <rect x="525" y="0" width="200" height="140" rx="4" fill="#121318" stroke="#10b981"/>
          <rect x="525" y="0" width="200" height="24" rx="4" fill="#18181b"/>
          <text x="537" y="16" fill="#10b981" font-family="monospace" font-size="8" font-weight="700">3. EXECUTIVE METRIC</text>
          <g transform="translate(535, 34)">
            <rect width="180" height="22" fill="#064e3b" rx="2"/>
            <text x="8" y="15" fill="#6ee7b7" font-family="monospace" font-size="7.5">NYC: 2 touches (1 unique)</text>
            <rect y="28" width="180" height="22" fill="#064e3b" rx="2"/>
            <text x="8" y="43" fill="#6ee7b7" font-family="monospace" font-size="7.5">ATX: 2 touches (1 unique)</text>
            <text x="0" y="70" fill="#71717a" font-family="monospace" font-size="7.5">True omnichannel metrics</text>
          </g>
        </g>
      </svg>
    `
  }
];
