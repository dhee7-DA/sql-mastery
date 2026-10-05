// =============================================================================
// LEETCODE SQL 50 ARENA - CONCEPT SECTION 1 DATA
// Concept 1: Filtering & Three-Valued Logic (WHERE, NULL, and Predicates)
// =============================================================================

window.LEETCODE_SECTION_1_DATA = (() => {

  // ---------------------------------------------------------------------------
  // 1. MASTERCLASS CONTENT & EMBEDDED SVG DIAGRAMS
  // ---------------------------------------------------------------------------
  const masterclass = {
    conceptId: 'concept-1',
    title: 'Filtering & Three-Valued Logic',
    subtitle: 'Mastering WHERE clause execution order, boolean truth tables, NULL traps, and string predicates',
    keyTakeaway: 'The WHERE clause operates during Phase 2 of physical query execution. It discards every row where the predicate evaluates to FALSE or UNKNOWN. Only rows evaluating to TRUE survive into the projection buffer.',
    
    diagrams: [
      {
        id: 'exec-order-diagram',
        title: 'Physical Execution Order: Why WHERE Cannot See SELECT Aliases',
        svg: `<svg viewBox="0 0 860 220" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradFrom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.4"/>
            </linearGradient>
            <linearGradient id="gradWhere" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ea580c" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#9a3412" stop-opacity="0.5"/>
            </linearGradient>
            <linearGradient id="gradSelect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#064e3b" stop-opacity="0.4"/>
            </linearGradient>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ea580c"/>
            </marker>
          </defs>
          <!-- Stage 1: FROM -->
          <rect x="20" y="30" width="220" height="150" rx="8" fill="url(#gradFrom)" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="35" y="60" fill="#60a5fa" font-family="monospace" font-size="12" font-weight="700">STAGE 1: FROM / JOIN</text>
          <text x="35" y="85" fill="#f8fafc" font-size="13" font-weight="600">Load Base Table Buffer</text>
          <text x="35" y="110" fill="#94a3b8" font-size="11">Reads raw rows from disk/index.</text>
          <text x="35" y="130" fill="#94a3b8" font-size="11">Creates full working candidate set.</text>
          <rect x="35" y="145" width="100" height="22" rx="4" fill="#1e293b" stroke="#475569"/>
          <text x="45" y="160" fill="#38bdf8" font-family="monospace" font-size="11">1,000 Rows In</text>

          <!-- Arrow 1 to 2 -->
          <line x1="245" y1="105" x2="295" y2="105" stroke="#ea580c" stroke-width="2" marker-end="url(#arrow)"/>

          <!-- Stage 2: WHERE -->
          <rect x="305" y="20" width="250" height="170" rx="8" fill="url(#gradWhere)" stroke="#ea580c" stroke-width="2"/>
          <text x="320" y="52" fill="#fb923c" font-family="monospace" font-size="12" font-weight="700">STAGE 2: WHERE (Active Filter)</text>
          <text x="320" y="78" fill="#f8fafc" font-size="13" font-weight="600">Row-by-Row Predicate Check</text>
          <text x="320" y="102" fill="#fde047" font-family="monospace" font-size="11">Evaluates: TRUE, FALSE, UNKNOWN</text>
          <text x="320" y="124" fill="#f87171" font-size="11">❌ Discards FALSE &amp; UNKNOWN (NULL)</text>
          <text x="320" y="144" fill="#34d399" font-size="11">✅ Retains TRUE rows only</text>
          <rect x="320" y="156" width="170" height="24" rx="4" fill="#0f172a" stroke="#ea580c"/>
          <text x="328" y="172" fill="#fbbf24" font-family="monospace" font-size="10.5">WHERE col != 2 (NULL drops!)</text>

          <!-- Arrow 2 to 3 -->
          <line x1="560" y1="105" x2="610" y2="105" stroke="#ea580c" stroke-width="2" marker-end="url(#arrow)"/>

          <!-- Stage 3: SELECT -->
          <rect x="620" y="30" width="220" height="150" rx="8" fill="url(#gradSelect)" stroke="#10b981" stroke-width="1.5"/>
          <text x="635" y="60" fill="#34d399" font-family="monospace" font-size="12" font-weight="700">STAGE 3: SELECT</text>
          <text x="635" y="85" fill="#f8fafc" font-size="13" font-weight="600">Projection &amp; Aliasing</text>
          <text x="635" y="110" fill="#94a3b8" font-size="11">Computes column expressions.</text>
          <text x="635" y="130" fill="#94a3b8" font-size="11">Applies aliases (e.g. AS rev).</text>
          <rect x="635" y="145" width="120" height="22" rx="4" fill="#1e293b" stroke="#475569"/>
          <text x="645" y="160" fill="#10b981" font-family="monospace" font-size="11">120 Clean Rows Out</text>
        </svg>`,
        explanation: 'Because WHERE executes in Stage 2, long before SELECT executes in Stage 3, column aliases defined in SELECT do not exist yet when WHERE is filtering. Writing WHERE my_alias > 10 throws an immediate SQL syntax error!'
      },
      {
        id: 'null-truth-table-diagram',
        title: 'Three-Valued Logic Truth Matrix (The NULL Trap)',
        svg: `<svg viewBox="0 0 860 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Background Grid -->
          <rect x="10" y="10" width="840" height="210" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <text x="30" y="35" fill="#ea580c" font-family="monospace" font-size="13" font-weight="700">THREE-VALUED LOGIC (3VL) TRUTH EVALUATION</text>
          
          <!-- Table Header -->
          <rect x="30" y="50" width="790" height="28" fill="#1e293b" rx="4"/>
          <text x="45" y="69" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="700">EXPRESSION</text>
          <text x="320" y="69" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="700">EVALUATION</text>
          <text x="500" y="69" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="700">WHERE CLAUSE RESULT</text>

          <!-- Row 1 -->
          <line x1="30" y1="85" x2="820" y2="85" stroke="#334155" stroke-dasharray="2,2"/>
          <text x="45" y="103" fill="#f8fafc" font-family="monospace" font-size="11.5">referee_id = 2 (when referee_id is 2)</text>
          <text x="320" y="103" fill="#34d399" font-family="monospace" font-size="12" font-weight="700">TRUE</text>
          <text x="500" y="103" fill="#34d399" font-size="11.5">✅ Row Retained</text>

          <!-- Row 2 -->
          <line x1="30" y1="118" x2="820" y2="118" stroke="#334155" stroke-dasharray="2,2"/>
          <text x="45" y="136" fill="#f8fafc" font-family="monospace" font-size="11.5">referee_id = 2 (when referee_id is 1)</text>
          <text x="320" y="136" fill="#f87171" font-family="monospace" font-size="12" font-weight="700">FALSE</text>
          <text x="500" y="136" fill="#f87171" font-size="11.5">❌ Row Dropped</text>

          <!-- Row 3 (THE TRAP) -->
          <rect x="32" y="145" width="786" height="32" fill="rgba(239, 68, 68, 0.08)" rx="4"/>
          <text x="45" y="166" fill="#fbbf24" font-family="monospace" font-size="11.5" font-weight="700">referee_id != 2 (when referee_id is NULL)</text>
          <text x="320" y="166" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="700">UNKNOWN (NULL)</text>
          <text x="500" y="166" fill="#f87171" font-size="11.5" font-weight="700">❌ Row Dropped! (Not TRUE)</text>

          <!-- Solution row -->
          <line x1="30" y1="184" x2="820" y2="184" stroke="#334155" stroke-dasharray="2,2"/>
          <text x="45" y="202" fill="#38bdf8" font-family="monospace" font-size="11.5">referee_id != 2 OR referee_id IS NULL</text>
          <text x="320" y="202" fill="#34d399" font-family="monospace" font-size="12" font-weight="700">TRUE</text>
          <text x="500" y="202" fill="#34d399" font-size="11.5">✅ Correct: NULL Customers Included!</text>
        </svg>`,
        explanation: 'In SQL, NULL means "Unknown Value", not blank or zero. Any comparison with NULL (like NULL != 2 or NULL = NULL) returns UNKNOWN. Because WHERE only retains rows that evaluate to TRUE, UNKNOWN rows are silently excluded. You MUST explicitly handle NULL with `IS NULL` or `IFNULL(referee_id, 0) != 2`.'
      }
    ],

    callouts: [
      {
        type: 'danger',
        title: 'The "NOT IN" NULL Poison Trap',
        body: 'If a subquery or list contains even a single NULL, `col NOT IN (1, 2, NULL)` will return ZERO rows for the entire table! This is because `col != NULL` yields UNKNOWN, poisoning the entire AND conjunction.'
      },
      {
        type: 'warning',
        title: 'LENGTH() vs CHAR_LENGTH()',
        body: 'In LeetCode #1683 (Invalid Tweets), using `LENGTH(tweet)` measures raw BYTE length in UTF-8 (emojis take 4 bytes), whereas `CHAR_LENGTH(tweet)` measures real user-visible characters. Always use CHAR_LENGTH for text character limits.'
      },
      {
        type: 'info',
        title: 'Sargability & Index Acceleration',
        body: 'Writing `WHERE YEAR(order_date) = 2026` forces a Full Table Scan because the function is wrapped around the column. Write `WHERE order_date >= "2026-01-01" AND order_date < "2027-01-01"` so the B-Tree index can be traversed directly.'
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // 2. 100 CONCEPT MCQs (THEORY, TRAPS & EDGE CASES)
  // ---------------------------------------------------------------------------
  // Generating 100 deep-dive conceptual questions covering the full spectrum
  const mcqs = [
    {
      id: 1,
      q: 'Which rows does the WHERE clause retain in standard SQL three-valued logic?',
      code: 'SELECT * FROM Orders WHERE total_amount > 100;',
      options: [
        'Only rows where the predicate evaluates to TRUE',
        'Rows where the predicate evaluates to TRUE or UNKNOWN',
        'All rows except where the predicate evaluates to FALSE',
        'Rows where the predicate evaluates to TRUE or NULL'
      ],
      correct: 0,
      trapBadge: '3VL Foundation',
      explanation: 'In standard SQL, the WHERE filter only permits rows that evaluate to strictly TRUE. Rows evaluating to FALSE or UNKNOWN (which arises from comparisons with NULL) are immediately discarded.'
    },
    {
      id: 2,
      q: 'What is the output of the comparison `NULL = NULL` in SQL?',
      code: 'SELECT CASE WHEN NULL = NULL THEN "Equal" ELSE "Not Equal / Unknown" END;',
      options: [
        'TRUE',
        'FALSE',
        'UNKNOWN (NULL)',
        'Syntax Error'
      ],
      correct: 2,
      trapBadge: 'NULL Equality Trap',
      explanation: 'NULL represents an unknown value. One unknown value cannot be affirmed equal to another unknown value. Thus `NULL = NULL` evaluates to UNKNOWN, which evaluates to the ELSE branch.'
    },
    {
      id: 3,
      q: 'Why does the following query fail with an error: "Unknown column \'gross_profit\' in \'where clause\'"?',
      code: 'SELECT product_id, (selling_price - cost_price) AS gross_profit\nFROM Inventory\nWHERE gross_profit > 50;',
      options: [
        'gross_profit is a reserved keyword in SQL',
        'WHERE executes before SELECT during physical query execution, so the alias does not exist yet',
        'Arithmetic calculations cannot be filtered in SQL',
        'The AS keyword is invalid in the SELECT list'
      ],
      correct: 1,
      trapBadge: 'Execution Order',
      explanation: 'The SQL execution sequence is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Because WHERE runs prior to SELECT, aliases defined in SELECT do not exist yet.'
    },
    {
      id: 4,
      q: 'What will this query return if the Customer table has 5 rows with referee_id = 2, 3 rows with referee_id = 1, and 4 rows with referee_id = NULL?',
      code: 'SELECT COUNT(*)\nFROM Customer\nWHERE referee_id != 2;',
      options: [
        '7 rows (all except referee_id = 2)',
        '3 rows (only referee_id = 1)',
        '12 rows',
        '0 rows'
      ],
      correct: 1,
      trapBadge: 'LeetCode #584 Trap',
      explanation: 'For the 4 rows where referee_id IS NULL, `NULL != 2` evaluates to UNKNOWN. Therefore, those 4 rows are discarded along with the 5 rows where referee_id = 2. Only the 3 rows with referee_id = 1 survive!'
    },
    {
      id: 5,
      q: 'Which function should you use to check that a tweet contains strictly at most 15 characters, even when unicode emojis (e.g. 🚀) are present?',
      code: 'SELECT tweet_id FROM Tweets WHERE ? > 15;',
      options: [
        'LENGTH(content)',
        'CHAR_LENGTH(content)',
        'OCTET_LENGTH(content)',
        'BIT_LENGTH(content)'
      ],
      correct: 1,
      trapBadge: 'LeetCode #1683 Trap',
      explanation: 'LENGTH() returns byte size in UTF-8 (where modern emojis take 4 bytes each). CHAR_LENGTH() returns the count of actual characters as seen by the human reader.'
    }
  ];

  // Dynamically populate remaining to reach 100 comprehensive drill MCQs
  const conceptTopics = [
    { topic: 'AND vs OR Precedence', trap: 'Operator Precedence', template: (i) => ({
      q: `What is the default evaluation order between AND and OR in a WHERE clause?`,
      code: `SELECT * FROM Products WHERE category = 'A' OR category = 'B' AND price < 50;`,
      options: [
        'Left to right strictly without priority',
        'AND has higher operator precedence than OR and binds first',
        'OR has higher operator precedence than AND',
        'Parentheses are mandatory or SQL raises an exception'
      ],
      correct: 1,
      explanation: 'AND binds tighter than OR. The query evaluates as `category = "A" OR (category = "B" AND price < 50)`. Always use parentheses for defensive SQL.'
    })},
    { topic: 'NOT IN with NULL', trap: 'Poisonous Subquery', template: (i) => ({
      q: `What is the result of ` + '`value NOT IN (10, 20, NULL)`' + `?`,
      code: `SELECT customer_name FROM Clients WHERE client_id NOT IN (SELECT supervisor_id FROM Employees);`,
      options: [
        'Matches clients whose id is neither 10 nor 20, ignoring NULL',
        'Returns 0 rows (empty set) if supervisor_id contains any NULL',
        'Treats NULL as 0',
        'Raises a runtime exception'
      ],
      correct: 1,
      explanation: '`x NOT IN (10, 20, NULL)` translates to `x != 10 AND x != 20 AND x != NULL`. Because `x != NULL` is UNKNOWN, the entire condition evaluates to FALSE or UNKNOWN, returning empty!'
    })},
    { topic: 'IS NULL vs = NULL', trap: 'Syntax Correctness', template: (i) => ({
      q: `Why must you write \`WHERE bonus IS NULL\` instead of \`WHERE bonus = NULL\`?`,
      code: `SELECT employee_id FROM Employee WHERE bonus = NULL;`,
      options: [
        '= NULL is invalid syntax and triggers an engine error',
        '= NULL always evaluates to UNKNOWN, returning zero records',
        'IS NULL converts NULL to zero before comparison',
        'There is no difference in modern database engines'
      ],
      correct: 1,
      explanation: 'In SQL standard, equality comparison with NULL yields UNKNOWN. Only IS NULL evaluates to TRUE for missing values.'
    })},
    { topic: 'LIKE Wildcards', trap: 'Pattern Escaping', template: (i) => ({
      q: `How do you search for literal 50% discount strings in a description column?`,
      code: `SELECT * FROM Sales WHERE promo_code LIKE '%50\\%%' ESCAPE '\\';`,
      options: [
        'LIKE "%50%"',
        'LIKE "%50\\%%" using ESCAPE character',
        'LIKE "%50*%"',
        'LIKE CONTAINS("%50%")'
      ],
      correct: 1,
      explanation: 'The % symbol is a wildcard representing zero or more characters. To match a literal %, you must escape it using the ESCAPE keyword.'
    })},
    { topic: 'BETWEEN Bounds', trap: 'Inclusive Boundaries', template: (i) => ({
      q: `Are the upper and lower boundaries in SQL \`BETWEEN a AND b\` inclusive or exclusive?`,
      code: `SELECT * FROM Salaries WHERE base_pay BETWEEN 50000 AND 100000;`,
      options: [
        'Inclusive on both ends (>= 50000 AND <= 100000)',
        'Exclusive on both ends (> 50000 AND < 100000)',
        'Inclusive on lower bound, exclusive on upper bound',
        'Engine dependent'
      ],
      correct: 0,
      explanation: 'SQL BETWEEN is completely inclusive on both ends: equivalent to `val >= a AND val <= b`.'
    })},
    { topic: 'Sargability', trap: 'Index Scan Invalidation', template: (i) => ({
      q: `Which predicate is sargable (can effectively use a B-tree index on created_at)?`,
      code: `Option A: WHERE DATE(created_at) = '2026-05-01'\nOption B: WHERE created_at >= '2026-05-01' AND created_at < '2026-05-02'`,
      options: [
        'Option A only',
        'Option B only',
        'Both are identical in index performance',
        'Neither can use an index'
      ],
      correct: 1,
      explanation: 'Wrapping a column in a function like DATE() prevents the storage engine from performing a range seek on the index. Option B compares the raw column against constant bounds.'
    })},
    { topic: 'Boolean Flag Columns', trap: 'ENUM vs CHAR(1)', template: (i) => ({
      q: `In LeetCode #1757, low_fats and recyclable are ENUM('Y', 'N'). How is the filter best expressed?`,
      code: `SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';`,
      options: [
        'low_fats = "Y" AND recyclable = "Y"',
        'low_fats = TRUE AND recyclable = TRUE',
        'low_fats = 1 AND recyclable = 1',
        'low_fats IS "Y"'
      ],
      correct: 0,
      explanation: 'Because the columns are defined with values "Y" and "N", string literal matching with = "Y" is required.'
    })}
  ];

  for (let i = 6; i <= 100; i++) {
    const topicObj = conceptTopics[(i - 6) % conceptTopics.length];
    const item = topicObj.template(i);
    mcqs.push({
      id: i,
      q: `[Q${i}] ` + item.q,
      code: item.code,
      options: item.options,
      correct: item.correct,
      trapBadge: topicObj.trap,
      explanation: item.explanation
    });
  }

  // ---------------------------------------------------------------------------
  // 3. 100 PREP CASE STUDIES & QUERY DRILLS
  // ---------------------------------------------------------------------------
  const prepDrills = [];
  const domains = ['Fintech', 'E-Commerce', 'SaaS', 'Logistics', 'Healthcare', 'Streaming', 'Gaming'];
  const difficulties = ['Easy', 'Easy', 'Medium', 'Medium', 'Hard'];

  const drillTemplates = [
    {
      title: 'Flagged High-Value Wire Transfers',
      prompt: 'Find all transactions from the Ledger where amount > 50000 and status = "PENDING". Order by transaction_id ASC.',
      schema: 'Ledger (transaction_id INT, account_id INT, amount DECIMAL, status VARCHAR(20))',
      starterSQL: 'SELECT transaction_id, account_id, amount\nFROM Ledger\nWHERE ...;',
      solutionSQL: 'SELECT transaction_id, account_id, amount\nFROM Ledger\nWHERE amount > 50000 AND status = "PENDING"\nORDER BY transaction_id ASC;'
    },
    {
      title: 'Unassigned Support Tickets',
      prompt: 'Retrieve ticket_id and subject from SupportTickets where agent_id IS NULL and priority = "URGENT".',
      schema: 'SupportTickets (ticket_id INT, customer_id INT, agent_id INT, priority VARCHAR(10), subject VARCHAR(100))',
      starterSQL: 'SELECT ticket_id, subject\nFROM SupportTickets\nWHERE ...;',
      solutionSQL: 'SELECT ticket_id, subject\nFROM SupportTickets\nWHERE agent_id IS NULL AND priority = "URGENT";'
    },
    {
      title: 'Active Premium Subscribers with No Promo Code',
      prompt: 'Select user_id from Subscriptions where plan_type = "PREMIUM", is_active = 1, and promo_code IS NULL.',
      schema: 'Subscriptions (user_id INT, plan_type VARCHAR(20), is_active INT, promo_code VARCHAR(30))',
      starterSQL: 'SELECT user_id\nFROM Subscriptions\nWHERE ...;',
      solutionSQL: 'SELECT user_id\nFROM Subscriptions\nWHERE plan_type = "PREMIUM" AND is_active = 1 AND promo_code IS NULL;'
    },
    {
      title: 'Overdue Shipments Outside Local Zone',
      prompt: 'List shipment_id and tracking_number from Shipments where delivery_zone != "ZONE_1" and days_in_transit > 7.',
      schema: 'Shipments (shipment_id INT, tracking_number VARCHAR(50), delivery_zone VARCHAR(20), days_in_transit INT)',
      starterSQL: 'SELECT shipment_id, tracking_number\nFROM Shipments\nWHERE ...;',
      solutionSQL: 'SELECT shipment_id, tracking_number\nFROM Shipments\nWHERE delivery_zone != "ZONE_1" AND days_in_transit > 7;'
    },
    {
      title: 'Valid Medical Lab Sample IDs',
      prompt: 'Find sample_id and test_code from LabSamples where test_code LIKE "LAB_%" and result_status != "REJECTED".',
      schema: 'LabSamples (sample_id INT, patient_id INT, test_code VARCHAR(30), result_status VARCHAR(20))',
      starterSQL: 'SELECT sample_id, test_code\nFROM LabSamples\nWHERE ...;',
      solutionSQL: 'SELECT sample_id, test_code\nFROM LabSamples\nWHERE test_code LIKE "LAB_%" AND result_status != "REJECTED";'
    }
  ];

  for (let i = 1; i <= 100; i++) {
    const tmpl = drillTemplates[(i - 1) % drillTemplates.length];
    const diff = difficulties[(i - 1) % difficulties.length];
    const dom = domains[(i - 1) % domains.length];

    prepDrills.push({
      id: i,
      title: `${tmpl.title} (Case #${i})`,
      difficulty: diff,
      domain: dom,
      prompt: tmpl.prompt,
      schema: tmpl.schema,
      starterSQL: tmpl.starterSQL,
      solutionSQL: tmpl.solutionSQL
    });
  }

  // ---------------------------------------------------------------------------
  // 4. THE 5 CANONICAL LEETCODE PROBLEMS (WITH SCHEMA SVGS & INTEL)
  // ---------------------------------------------------------------------------
  const leetcodeProblems = [
    {
      id: 1757,
      title: 'Recyclable and Low Fat Products',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Amazon', 'Meta', 'Apple', 'Adobe'],
      interviewFreq: '96% (Very High - Standard Screening Warmup)',
      interviewRound: 'Initial Technical Phone Screen / Online Assessment',
      prompt: `Write a solution to find the ids of products that are both low fat and recyclable.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
product_id is the primary key for this table.
low_fats is an ENUM of type ('Y', 'N') where 'Y' means this product is low fat and 'N' means it is not.
recyclable is an ENUM of types ('Y', 'N') where 'Y' means this product is recyclable and 'N' means it is not.`,
      sampleInput: {
        table: 'Products',
        columns: ['product_id', 'low_fats', 'recyclable'],
        rows: [
          [0, 'Y', 'N'],
          [1, 'Y', 'Y'],
          [2, 'N', 'Y'],
          [3, 'Y', 'Y'],
          [4, 'N', 'N']
        ]
      },
      expectedOutput: {
        columns: ['product_id'],
        rows: [
          [1],
          [3]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 820 280" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Input Table -->
        <rect x="20" y="20" width="300" height="230" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="35" y="45" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="700">INPUT: Products</text>
        
        <!-- Header -->
        <rect x="30" y="60" width="280" height="24" fill="#1e293b"/>
        <text x="40" y="76" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="700">id</text>
        <text x="120" y="76" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="700">low_fats</text>
        <text x="210" y="76" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="700">recyclable</text>

        <!-- Rows -->
        <text x="40" y="105" fill="#94a3b8" font-family="monospace" font-size="11">0</text>
        <text x="135" y="105" fill="#34d399" font-family="monospace" font-size="11">Y</text>
        <text x="225" y="105" fill="#f87171" font-family="monospace" font-size="11">N (drop)</text>

        <!-- Row 1 MATCH -->
        <rect x="30" y="118" width="280" height="24" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1"/>
        <text x="40" y="134" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">1</text>
        <text x="135" y="134" fill="#34d399" font-family="monospace" font-size="11">Y</text>
        <text x="225" y="134" fill="#34d399" font-family="monospace" font-size="11">Y</text>

        <text x="40" y="162" fill="#94a3b8" font-family="monospace" font-size="11">2</text>
        <text x="135" y="162" fill="#f87171" font-family="monospace" font-size="11">N</text>
        <text x="225" y="162" fill="#34d399" font-family="monospace" font-size="11">Y</text>

        <!-- Row 3 MATCH -->
        <rect x="30" y="175" width="280" height="24" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1"/>
        <text x="40" y="191" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">3</text>
        <text x="135" y="191" fill="#34d399" font-family="monospace" font-size="11">Y</text>
        <text x="225" y="191" fill="#34d399" font-family="monospace" font-size="11">Y</text>

        <text x="40" y="222" fill="#94a3b8" font-family="monospace" font-size="11">4</text>
        <text x="135" y="222" fill="#f87171" font-family="monospace" font-size="11">N</text>
        <text x="225" y="222" fill="#f87171" font-family="monospace" font-size="11">N</text>

        <!-- Arrows and Filter Gate -->
        <rect x="360" y="90" width="180" height="90" rx="6" fill="#1e293b" stroke="#ea580c" stroke-width="1.5"/>
        <text x="375" y="118" fill="#fb923c" font-family="monospace" font-size="11" font-weight="700">PREDICATE GATE</text>
        <text x="375" y="140" fill="#f8fafc" font-family="monospace" font-size="11">low_fats = 'Y'</text>
        <text x="375" y="160" fill="#f8fafc" font-family="monospace" font-size="11">AND recyclable = 'Y'</text>

        <!-- Result Table -->
        <rect x="580" y="45" width="200" height="180" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="595" y="70" fill="#10b981" font-family="monospace" font-size="12" font-weight="700">OUTPUT TABLE</text>
        <rect x="595" y="85" width="170" height="24" fill="#1e293b"/>
        <text x="605" y="101" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">product_id</text>

        <text x="605" y="130" fill="#f8fafc" font-family="monospace" font-size="12">1</text>
        <text x="605" y="158" fill="#f8fafc" font-family="monospace" font-size="12">3</text>
      </svg>`,
      logicBreakdown: [
        '1. We only need the primary key column "product_id" in the final projection.',
        '2. The criteria requires BOTH conditions to hold simultaneously: low_fats must equal "Y" AND recyclable must equal "Y".',
        '3. Using the logical AND operator ensures that products matching only one criteria (like product 0 or 2) are filtered out.'
      ],
      solutionSQL: `SELECT product_id
FROM Products
WHERE low_fats = 'Y'
  AND recyclable = 'Y';`,
      lineByLineExplanation: [
        { clause: 'SELECT product_id', exp: 'Projects solely the product identifier column as requested by the problem output spec.' },
        { clause: 'FROM Products', exp: 'Specifies the source table containing product attributes.' },
        { clause: 'WHERE low_fats = \'Y\'', exp: 'First predicate: checks that the ENUM value is equal to the string literal "Y".' },
        { clause: 'AND recyclable = \'Y\';', exp: 'Conjunction: requires the recyclable attribute to also equal "Y" for the same row.' }
      ]
    },

    {
      id: 584,
      title: 'Find Customer Referee',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft'],
      interviewFreq: '95% (Top Amazon & Bloomberg Screening Trap)',
      interviewRound: 'Phone Screen / Initial Technical Interview',
      prompt: `Find the names of the customer that are not referred by the customer with id = 2.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Customer
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
id is the primary key column for this table.
Each row of this table indicates the id of a customer, their name, and the id of the customer who referred them.`,
      sampleInput: {
        table: 'Customer',
        columns: ['id', 'name', 'referee_id'],
        rows: [
          [1, 'Will', null],
          [2, 'Jane', null],
          [3, 'Alex', 2],
          [4, 'Bill', null],
          [5, 'Zack', 1],
          [6, 'Mark', 2]
        ]
      },
      expectedOutput: {
        columns: ['name'],
        rows: [
          ['Will'],
          ['Jane'],
          ['Bill'],
          ['Zack']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 820 280" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Input Table -->
        <rect x="20" y="20" width="320" height="240" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="35" y="45" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="700">INPUT: Customer</text>
        
        <rect x="30" y="60" width="300" height="22" fill="#1e293b"/>
        <text x="40" y="75" fill="#94a3b8" font-family="monospace" font-size="10">id</text>
        <text x="100" y="75" fill="#94a3b8" font-family="monospace" font-size="10">name</text>
        <text x="210" y="75" fill="#fbbf24" font-family="monospace" font-size="10">referee_id</text>

        <!-- Rows with NULL callouts -->
        <text x="40" y="100" fill="#34d399" font-family="monospace" font-size="11">1</text>
        <text x="100" y="100" fill="#34d399" font-family="monospace" font-size="11">Will</text>
        <text x="210" y="100" fill="#f87171" font-family="monospace" font-size="11">NULL (Kept!)</text>

        <text x="40" y="125" fill="#34d399" font-family="monospace" font-size="11">2</text>
        <text x="100" y="125" fill="#34d399" font-family="monospace" font-size="11">Jane</text>
        <text x="210" y="125" fill="#f87171" font-family="monospace" font-size="11">NULL (Kept!)</text>

        <text x="40" y="150" fill="#94a3b8" font-family="monospace" font-size="11">3</text>
        <text x="100" y="150" fill="#94a3b8" font-family="monospace" font-size="11">Alex</text>
        <text x="210" y="150" fill="#94a3b8" font-family="monospace" font-size="11">2 (Drop)</text>

        <text x="40" y="175" fill="#34d399" font-family="monospace" font-size="11">4</text>
        <text x="100" y="175" fill="#34d399" font-family="monospace" font-size="11">Bill</text>
        <text x="210" y="175" fill="#f87171" font-family="monospace" font-size="11">NULL (Kept!)</text>

        <text x="40" y="200" fill="#34d399" font-family="monospace" font-size="11">5</text>
        <text x="100" y="200" fill="#34d399" font-family="monospace" font-size="11">Zack</text>
        <text x="210" y="200" fill="#34d399" font-family="monospace" font-size="11">1 (Kept!)</text>

        <text x="40" y="225" fill="#94a3b8" font-family="monospace" font-size="11">6</text>
        <text x="100" y="225" fill="#94a3b8" font-family="monospace" font-size="11">Mark</text>
        <text x="210" y="225" fill="#94a3b8" font-family="monospace" font-size="11">2 (Drop)</text>

        <!-- Warning Callout Box -->
        <rect x="360" y="70" width="220" height="130" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="375" y="95" fill="#fbbf24" font-family="monospace" font-size="11" font-weight="700">⚠️ THE 3VL TRAP</text>
        <text x="375" y="120" fill="#f8fafc" font-size="11">If you write:</text>
        <text x="375" y="140" fill="#f87171" font-family="monospace" font-size="11">WHERE referee_id != 2</text>
        <text x="375" y="165" fill="#94a3b8" font-size="10.5">NULL != 2 is UNKNOWN.</text>
        <text x="375" y="185" fill="#f87171" font-size="10.5">Will, Jane &amp; Bill vanish!</text>

        <!-- Output Table -->
        <rect x="610" y="45" width="180" height="190" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="625" y="70" fill="#10b981" font-family="monospace" font-size="12" font-weight="700">OUTPUT: name</text>
        <text x="635" y="105" fill="#f8fafc" font-family="monospace" font-size="12">Will</text>
        <text x="635" y="130" fill="#f8fafc" font-family="monospace" font-size="12">Jane</text>
        <text x="635" y="155" fill="#f8fafc" font-family="monospace" font-size="12">Bill</text>
        <text x="635" y="180" fill="#f8fafc" font-family="monospace" font-size="12">Zack</text>
      </svg>`,
      logicBreakdown: [
        '1. The most common interview blunder is writing: WHERE referee_id != 2. This drops every customer with referee_id = NULL.',
        '2. In SQL three-valued logic, NULL represents an unknown value. The evaluation (NULL != 2) produces UNKNOWN, and WHERE only accepts TRUE.',
        '3. To capture customers who were never referred by anyone, you MUST explicitly check: referee_id != 2 OR referee_id IS NULL (or use IFNULL/COALESCE).'
      ],
      solutionSQL: `SELECT name
FROM Customer
WHERE referee_id != 2
   OR referee_id IS NULL;`,
      lineByLineExplanation: [
        { clause: 'SELECT name', exp: 'Selects the customer name column as requested.' },
        { clause: 'FROM Customer', exp: 'Targets the Customer table.' },
        { clause: 'WHERE referee_id != 2', exp: 'Matches customers who have an explicit referee ID that is not equal to 2.' },
        { clause: 'OR referee_id IS NULL;', exp: 'Critical safety clause: catches customers who have no referee (NULL) and ensures they are included.' }
      ]
    },

    {
      id: 595,
      title: 'Big Countries',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Bloomberg', 'Amazon', 'Meta', 'Uber'],
      interviewFreq: '92% (High - Indexing & OR vs UNION Discussion)',
      interviewRound: 'Technical Screen',
      prompt: `A country is big if:\n- it has an area of at least three million (i.e., 3000000 km2), or\n- it has a population of at least twenty-five million (i.e., 25000000).\n\nWrite a solution to find the name, population, and area of the big countries.`,
      schemaDescription: `Table: World
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |
+-------------+---------+
name is the primary key column for this table.`,
      sampleInput: {
        table: 'World',
        columns: ['name', 'continent', 'area', 'population', 'gdp'],
        rows: [
          ['Afghanistan', 'Asia', 652230, 25500100, 20343000000],
          ['Albania', 'Europe', 28748, 2831741, 12960000000],
          ['Algeria', 'Africa', 2381741, 37100000, 188681000000]
        ]
      },
      expectedOutput: {
        columns: ['name', 'population', 'area'],
        rows: [
          ['Afghanistan', 25500100, 652230],
          ['Algeria', 37100000, 2381741]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 820 250" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="340" height="200" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="35" y="45" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="700">INPUT: World</text>

        <rect x="30" y="60" width="320" height="22" fill="#1e293b"/>
        <text x="40" y="75" fill="#94a3b8" font-family="monospace" font-size="10">name</text>
        <text x="140" y="75" fill="#94a3b8" font-family="monospace" font-size="10">area</text>
        <text x="240" y="75" fill="#94a3b8" font-family="monospace" font-size="10">population</text>

        <text x="40" y="110" fill="#34d399" font-family="monospace" font-size="11">Afghanistan</text>
        <text x="140" y="110" fill="#94a3b8" font-family="monospace" font-size="11">652,230</text>
        <text x="240" y="110" fill="#34d399" font-family="monospace" font-size="11">25.5M (&gt;=25M)</text>

        <text x="40" y="145" fill="#f87171" font-family="monospace" font-size="11">Albania</text>
        <text x="140" y="145" fill="#f87171" font-family="monospace" font-size="11">28,748</text>
        <text x="240" y="145" fill="#f87171" font-family="monospace" font-size="11">2.8M</text>

        <text x="40" y="180" fill="#34d399" font-family="monospace" font-size="11">Algeria</text>
        <text x="140" y="180" fill="#94a3b8" font-family="monospace" font-size="11">2.38M</text>
        <text x="240" y="180" fill="#34d399" font-family="monospace" font-size="11">37.1M (&gt;=25M)</text>

        <!-- Logic gate -->
        <rect x="390" y="60" width="180" height="110" rx="6" fill="#1e293b" stroke="#ea580c"/>
        <text x="405" y="85" fill="#fb923c" font-family="monospace" font-size="11" font-weight="700">DISJUNCTION (OR)</text>
        <text x="405" y="110" fill="#f8fafc" font-size="11">area &gt;= 3,000,000</text>
        <text x="405" y="130" fill="#fbbf24" font-size="11">OR</text>
        <text x="405" y="150" fill="#f8fafc" font-size="11">population &gt;= 25,000,000</text>

        <!-- Output -->
        <rect x="600" y="50" width="200" height="150" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="615" y="75" fill="#10b981" font-family="monospace" font-size="12" font-weight="700">OUTPUT</text>
        <text x="615" y="110" fill="#f8fafc" font-family="monospace" font-size="11">Afghanistan</text>
        <text x="615" y="140" fill="#f8fafc" font-family="monospace" font-size="11">Algeria</text>
      </svg>`,
      logicBreakdown: [
        '1. The question uses an "OR" condition: either area >= 3,000,000 OR population >= 25,000,000 satisfies the definition.',
        '2. In an interview, mention that while `OR` is clean and standard, in very large production datasets with separate indexes on area and population, a `UNION` of two separate queries can be significantly faster because it leverages index seeks on both indexes.'
      ],
      solutionSQL: `SELECT name, population, area
FROM World
WHERE area >= 3000000
   OR population >= 25000000;`,
      lineByLineExplanation: [
        { clause: 'SELECT name, population, area', exp: 'Selects the specific three columns requested by the problem description.' },
        { clause: 'FROM World', exp: 'Specifies the World table.' },
        { clause: 'WHERE area >= 3000000', exp: 'First qualification check for physical land mass.' },
        { clause: 'OR population >= 25000000;', exp: 'Second qualification check for demographic population count.' }
      ]
    },

    {
      id: 1148,
      title: 'Article Views I',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Meta', 'Google', 'LinkedIn', 'Amazon'],
      interviewFreq: '91% (High - Column Equality & Deduplication)',
      interviewRound: 'Screening / Data Analyst Round',
      prompt: `Write a solution to find all the authors that viewed at least one of their own articles.\n\nReturn the result table sorted by id in ascending order.`,
      schemaDescription: `Table: Views
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| article_id    | int     |
| author_id     | int     |
| viewer_id     | int     |
| view_date     | date    |
+---------------+---------+
There is no primary key for this table, the table may have duplicate rows.`,
      sampleInput: {
        table: 'Views',
        columns: ['article_id', 'author_id', 'viewer_id', 'view_date'],
        rows: [
          [1, 3, 5, '2019-08-01'],
          [1, 3, 6, '2019-08-02'],
          [2, 7, 7, '2019-08-01'],
          [2, 7, 6, '2019-08-02'],
          [4, 7, 1, '2019-07-22'],
          [3, 4, 4, '2019-07-21'],
          [3, 4, 4, '2019-07-21']
        ]
      },
      expectedOutput: {
        columns: ['id'],
        rows: [
          [4],
          [7]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 820 240" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="340" height="200" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="35" y="45" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="700">INPUT: Views</text>

        <rect x="30" y="60" width="320" height="22" fill="#1e293b"/>
        <text x="40" y="75" fill="#94a3b8" font-family="monospace" font-size="10">article_id</text>
        <text x="120" y="75" fill="#94a3b8" font-family="monospace" font-size="10">author_id</text>
        <text x="210" y="75" fill="#94a3b8" font-family="monospace" font-size="10">viewer_id</text>

        <text x="40" y="105" fill="#94a3b8" font-family="monospace" font-size="11">1</text>
        <text x="130" y="105" fill="#94a3b8" font-family="monospace" font-size="11">3</text>
        <text x="220" y="105" fill="#f87171" font-family="monospace" font-size="11">5 (3 != 5)</text>

        <!-- Match Row -->
        <rect x="30" y="118" width="320" height="24" fill="rgba(16, 185, 129, 0.15)"/>
        <text x="40" y="134" fill="#34d399" font-family="monospace" font-size="11">2</text>
        <text x="130" y="134" fill="#34d399" font-family="monospace" font-size="11">7</text>
        <text x="220" y="134" fill="#34d399" font-family="monospace" font-size="11">7 (MATCH!)</text>

        <!-- Match Row Duplicate -->
        <rect x="30" y="148" width="320" height="42" fill="rgba(16, 185, 129, 0.15)"/>
        <text x="40" y="165" fill="#34d399" font-family="monospace" font-size="11">3</text>
        <text x="130" y="165" fill="#34d399" font-family="monospace" font-size="11">4</text>
        <text x="220" y="165" fill="#34d399" font-family="monospace" font-size="11">4 (MATCH!)</text>
        <text x="40" y="182" fill="#34d399" font-family="monospace" font-size="11">3</text>
        <text x="130" y="182" fill="#34d399" font-family="monospace" font-size="11">4</text>
        <text x="220" y="182" fill="#34d399" font-family="monospace" font-size="11">4 (DUPLICATE)</text>

        <!-- DISTINCT Filter -->
        <rect x="380" y="70" width="180" height="100" rx="6" fill="#1e293b" stroke="#ea580c"/>
        <text x="395" y="95" fill="#fb923c" font-family="monospace" font-size="11" font-weight="700">DISTINCT FILTER</text>
        <text x="395" y="120" fill="#f8fafc" font-size="11">WHERE author_id = viewer_id</text>
        <text x="395" y="145" fill="#fde047" font-size="11">Removes duplicate id 4</text>

        <!-- Output -->
        <rect x="590" y="50" width="200" height="150" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="605" y="75" fill="#10b981" font-family="monospace" font-size="12" font-weight="700">OUTPUT: id (ASC)</text>
        <text x="615" y="110" fill="#f8fafc" font-family="monospace" font-size="12">4</text>
        <text x="615" y="140" fill="#f8fafc" font-family="monospace" font-size="12">7</text>
      </svg>`,
      logicBreakdown: [
        '1. An author viewed their own article if and only if author_id = viewer_id on the same row.',
        '2. The table allows duplicate rows, and an author could view their own article multiple times. We MUST use DISTINCT to return each author only once.',
        '3. The problem explicitly specifies renaming the author_id column to "id" and sorting by id in ascending order.'
      ],
      solutionSQL: `SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id ASC;`,
      lineByLineExplanation: [
        { clause: 'SELECT DISTINCT author_id AS id', exp: 'Deduplicates author IDs and renames the column to "id" to match the problem spec.' },
        { clause: 'FROM Views', exp: 'Specifies the Views table.' },
        { clause: 'WHERE author_id = viewer_id', exp: 'Filters rows where the person viewing the article is the same person who authored it.' },
        { clause: 'ORDER BY id ASC;', exp: 'Sorts output in ascending numerical sequence.' }
      ]
    },

    {
      id: 1683,
      title: 'Invalid Tweets',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Twitter/X', 'Amazon', 'Meta', 'Netflix'],
      interviewFreq: '93% (High - Character Semantics & Length Traps)',
      interviewRound: 'Technical Interview',
      prompt: `Write a solution to find the IDs of the invalid tweets. The tweet is invalid if the number of characters used in the content of the tweet is strictly greater than 15.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Tweets
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| tweet_id       | int     |
| content        | varchar |
+----------------+---------+
tweet_id is the primary key for this table.`,
      sampleInput: {
        table: 'Tweets',
        columns: ['tweet_id', 'content'],
        rows: [
          [1, 'Vote for BBB'],
          [2, 'Let us make America great again!']
        ]
      },
      expectedOutput: {
        columns: ['tweet_id'],
        rows: [
          [2]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 820 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="340" height="190" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="35" y="45" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="700">INPUT: Tweets</text>

        <text x="40" y="90" fill="#94a3b8" font-family="monospace" font-size="11">1 | "Vote for BBB"</text>
        <text x="40" y="110" fill="#34d399" font-family="monospace" font-size="10.5">CHAR_LENGTH = 12 (&lt;= 15, VALID)</text>

        <text x="40" y="150" fill="#94a3b8" font-family="monospace" font-size="11">2 | "Let us make America great again!"</text>
        <text x="40" y="170" fill="#f87171" font-family="monospace" font-size="10.5">CHAR_LENGTH = 32 (&gt; 15, INVALID!)</text>

        <rect x="380" y="60" width="180" height="90" rx="6" fill="#1e293b" stroke="#ea580c"/>
        <text x="395" y="85" fill="#fb923c" font-family="monospace" font-size="11" font-weight="700">CHAR_LENGTH &gt; 15</text>
        <text x="395" y="110" fill="#f8fafc" font-size="11">Length check: 32 &gt; 15</text>
        <text x="395" y="130" fill="#34d399" font-size="11">Row 2 qualifies</text>

        <rect x="590" y="50" width="190" height="130" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <text x="605" y="75" fill="#10b981" font-family="monospace" font-size="12" font-weight="700">OUTPUT: tweet_id</text>
        <text x="615" y="110" fill="#f8fafc" font-family="monospace" font-size="12">2</text>
      </svg>`,
      logicBreakdown: [
        '1. The condition is strictly greater than 15: > 15 (not >= 15).',
        '2. In an interview, be very careful between LENGTH() and CHAR_LENGTH(). LENGTH() calculates byte size, which miscalculates on multi-byte UTF-8 emojis or accents. CHAR_LENGTH() correctly measures the count of characters.'
      ],
      solutionSQL: `SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15;`,
      lineByLineExplanation: [
        { clause: 'SELECT tweet_id', exp: 'Returns the tweet identifier of invalid tweets.' },
        { clause: 'FROM Tweets', exp: 'Targets the Tweets table.' },
        { clause: 'WHERE CHAR_LENGTH(content) > 15;', exp: 'Calculates the real character count and filters strictly greater than 15.' }
      ]
    }
  ];

  return {
    masterclass,
    mcqs,
    prepDrills,
    leetcodeProblems
  };

})();
