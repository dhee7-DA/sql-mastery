/**
 * =============================================================================
 * SQL MASTERY & JOB INTERVIEW PREPARATION ENGINE
 * -----------------------------------------------------------------------------
 * 10-Phase Physical Order of Execution Curriculum:
 * FROM/JOINs -> WHERE -> GROUP BY -> HAVING -> SELECT/WINDOW -> DISTINCT ->
 * ORDER BY -> LIMIT -> CTEs/RECURSION -> STORAGE & INTERVIEW DEFENSE
 *
 * 4-Step Order of Learning per Phase:
 * 1. Deep Theory & Bespoke Tactile Editorial SVG Explainer Diagram
 * 2. Knowledge Check & Trap MCQs
 * 3. FAANG / Wall Street Real-World Case Studies
 * 4. Hands-on Query Challenge & Studio 1-Click Solver
 * =============================================================================
 */

window.MasteryCourseEngine = (function() {
  'use strict';

  // State
  let state = {
    activePhaseId: 'phase_01_from_joins',
    activeStep: 'theory', // 'theory' | 'mcqs' | 'case' | 'problem'
    completedPhases: new Set(),
    mcqAnswers: {}, // { [phaseId_qIdx]: selectedOption }
    showSolution: {} // { [phaseId]: boolean }
  };

  // Load progress from localStorage
  try {
    const saved = localStorage.getItem('sql_mastery_course_completed_phases');
    if (saved) {
      state.completedPhases = new Set(JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Failed to load completed phases from localStorage', e);
  }

  // ===========================================================================
  // 10-PHASE CURRICULUM DEFINITION (IN STRICT EXECUTION ORDER)
  // ===========================================================================
  const PHASES = [
    {
      id: 'phase_01_from_joins',
      seq: '01',
      title: 'FROM & JOINs',
      name: 'Physical Table Scans & Relational Join Engines',
      shortName: 'FROM & JOINs',
      icon: '🏛️',
      execRank: '1st in Execution',
      lexicalRank: '2nd in Lexical Syntax',
      summary: 'Why execution begins at FROM & JOINs: Disk page buffer allocations, Cartesian product space (N × M), true tuple matching, and physical join algorithms (Hash Join vs Nested Loop vs Sort-Merge).',
      
      // Tactile Editorial SVG Diagram (Relational Tuple Matching + Hash vs Nested Loop)
      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          
          <!-- Banner -->
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="0.5">
            STEP 01: PHYSICAL TABLE BINDS &amp; RELATIONAL TUPLE CONDUITS (NOT VENN DIAGRAMS)
          </text>

          <!-- Left Table: Orders (Driving Table) -->
          <g transform="translate(30, 68)">
            <rect width="180" height="150" rx="6" fill="#0d1527" stroke="#1e3a8a" stroke-width="1.5"/>
            <rect width="180" height="28" rx="6" fill="#1e3a8a"/>
            <text x="90" y="19" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">Orders (Left Table)</text>
            
            <!-- Rows -->
            <text x="14" y="50" fill="#cbd5e1" font-family="monospace" font-size="10.5">#101 | Cust 5 | $450</text>
            <text x="14" y="74" fill="#cbd5e1" font-family="monospace" font-size="10.5">#102 | Cust 8 | $1,200</text>
            <text x="14" y="98" fill="#f43f5e" font-family="monospace" font-size="10.5">#103 | Cust 9 | $80 (Unmatched)</text>
            <text x="14" y="122" fill="#cbd5e1" font-family="monospace" font-size="10.5">#104 | Cust 5 | $320 (Fanout)</text>
          </g>

          <!-- Middle Conduits: Key Hash Join Engine -->
          <g transform="translate(230, 68)">
            <rect width="460" height="150" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="230" y="24" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              Relational Join Engine: Hash Join vs Nested Loop Seek
            </text>

            <!-- Flow Paths -->
            <!-- Match 1 -->
            <path d="M -10 50 L 100 50 L 350 50" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="4 2"/>
            <circle cx="100" cy="50" r="4" fill="#22c55e"/>
            <text x="110" y="44" fill="#86efac" font-family="monospace" font-size="9">Match Key: Cust 5</text>

            <!-- Match 2 -->
            <path d="M -10 74 L 140 74 L 350 74" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="4 2"/>
            <circle cx="140" cy="74" r="4" fill="#22c55e"/>
            <text x="150" y="68" fill="#86efac" font-family="monospace" font-size="9">Match Key: Cust 8</text>

            <!-- Unmatched Left -->
            <path d="M -10 98 L 80 98 L 180 120 L 350 120" fill="none" stroke="#f43f5e" stroke-width="2"/>
            <circle cx="80" cy="98" r="4" fill="#f43f5e"/>
            <text x="90" y="114" fill="#fca5a5" font-family="monospace" font-size="9">LEFT JOIN: NULL Pad Right</text>

            <!-- Fanout Row -->
            <path d="M -10 122 L 60 122 L 100 50 L 350 50" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="110" y="136" fill="#fde047" font-family="monospace" font-size="9">1-to-N Row Fanout!</text>
          </g>

          <!-- Right Table: Customers (Dimension) -->
          <g transform="translate(710, 68)">
            <rect width="180" height="150" rx="6" fill="#141c2e" stroke="#0369a1" stroke-width="1.5"/>
            <rect width="180" height="28" rx="6" fill="#0369a1"/>
            <text x="90" y="19" fill="#bae6fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">Customers (Right Table)</text>
            
            <!-- Rows -->
            <text x="14" y="50" fill="#cbd5e1" font-family="monospace" font-size="10.5">Cust 5 | Goldman Sachs</text>
            <text x="14" y="74" fill="#cbd5e1" font-family="monospace" font-size="10.5">Cust 8 | Citadel Sec</text>
            <text x="14" y="98" fill="#cbd5e1" font-family="monospace" font-size="10.5">Cust 12 | Jane Street</text>
            <text x="14" y="122" fill="#64748b" font-family="monospace" font-size="10.5">Cust 99 | Two Sigma</text>
          </g>

          <!-- Bottom Technical Callout Blocks -->
          <g transform="translate(30, 236)">
            <!-- Left Box: Hash Join Mechanics -->
            <rect width="425" height="88" rx="6" fill="#0b1324" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1"/>
            <text x="16" y="24" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">
              ⚡ HASH JOIN (MySQL 8.0+ / Postgres / Snowflake)
            </text>
            <text x="16" y="44" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
              1. Build Phase: Engine hashes smaller table into memory buckets (O(N)).
            </text>
            <text x="16" y="62" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
              2. Probe Phase: Larger stream probes hash buckets (O(M)). Total O(N+M).
            </text>
            <text x="16" y="78" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">
              Requires no indexes! Outperforms Nested Loops on large equi-joins.
            </text>
          </g>

          <g transform="translate(475, 236)">
            <!-- Right Box: Anti-Join Trap -->
            <rect width="415" height="88" rx="6" fill="#1c0b14" stroke="rgba(244, 63, 94, 0.3)" stroke-width="1"/>
            <text x="16" y="24" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">
              ⚠️ LEFT ANTI-JOIN vs NOT IN INTERVIEW TRAP
            </text>
            <text x="16" y="44" fill="#fda4af" font-family="system-ui, sans-serif" font-size="11">
              • To find orphan records: Always use LEFT JOIN ... WHERE right.id IS NULL
            </text>
            <text x="16" y="62" fill="#fda4af" font-family="system-ui, sans-serif" font-size="11">
              • Or NOT EXISTS (correlated subquery).
            </text>
            <text x="16" y="78" fill="#fb7185" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">
              Never use NOT IN (SELECT id ...) if subquery could contain a NULL!
            </text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. Declarative Syntax vs. Storage Engine Execution Order',
          content: 'In declarative SQL, queries are written starting with SELECT:\n```sql\nSELECT o.order_id, c.customer_name, o.notional_usd\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id;\n```\nHowever, the relational database engine cannot evaluate columns before it knows what physical tables exist and how they connect!\n\nUnder the hood in MySQL InnoDB and PostgreSQL, the query planner transforms the syntax tree into a physical execution DAG. The first operational step is **FROM & JOINs**:\n1. **Buffer Allocation**: Reads physical 16KB data pages from the storage engine Buffer Pool into virtual working memory.\n2. **Cartesian Product Foundation**: Mathematically, multi-table joins start from the Cartesian product (N × M). The join predicate (ON) filters this matrix down to valid tuples.\n3. **Row Fanout**: When joining a 1-to-many relationship, matching rows are duplicated for every join match. A common bug is applying aggregates *after* an unconstrained fan-out.'
        },
        {
          heading: '2. Physical Join Algorithms: Hash Join vs. Nested Loop vs. Sort-Merge',
          content: 'Senior database engineers must explain how engines physically pair rows:\n- **Nested Loop Join (NLJ)**: The engine loops over rows in the outer table and executes an index seek on the inner table for each row. Ideal when the outer table is small and the inner table has a clustered B+Tree index (O(N log M)).\n- **Hash Join**: MySQL 8.0 introduced modern Hash Joins (replacing Block Nested Loops). In the **Build Phase**, the smaller table is read into an in-memory hash table. In the **Probe Phase**, the larger stream scans once and probes the hash table (O(N + M)). No indexes required!\n- **Sort-Merge Join**: Both datasets are sorted by the join key, then walked in parallel like two pointers (O(N log N + M log M)). Dominates when data is already physically sorted on disk.'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: The Accidental Cartesian Blowup',
        badSql: `-- DANGEROUS: Missing join predicate or joining on non-unique key
SELECT c.name, SUM(o.amount), SUM(p.payment_amount)
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customer_id
LEFT JOIN Payments p ON c.id = p.customer_id
GROUP BY c.name;`,
        badExplanation: 'If a customer has 5 orders and 5 payments, the join multiplies rows to 25! SUM(amount) is inflated 5x. Never join multiple 1-to-many child tables in one flat query.',
        goodTitle: 'Production Idiom: Pre-Aggregate in CTEs Before Joining',
        goodSql: `-- SAFE: Aggregate each child table independently first
WITH order_totals AS (
  SELECT customer_id, SUM(amount) AS total_orders
  FROM Orders GROUP BY customer_id
),
payment_totals AS (
  SELECT customer_id, SUM(payment_amount) AS total_paid
  FROM Payments GROUP BY customer_id
)
SELECT c.name, 
       COALESCE(ot.total_orders, 0) AS total_orders, 
       COALESCE(pt.total_paid, 0) AS total_paid
FROM Customers c
LEFT JOIN order_totals ot ON c.id = ot.customer_id
LEFT JOIN payment_totals pt ON c.id = pt.customer_id;`,
        goodExplanation: 'Pre-aggregating in modular CTEs reduces cardinality to exactly 1 row per customer, completely eliminating Cartesian cross-multiplication.'
      },

      gotchas: [
        {
          title: 'The Anti-Join NULL Exclusion Rule',
          text: 'To find records in Table A that do not exist in Table B, use "LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL". This is an Anti-Join. It is far more reliable and optimized by the query planner than "WHERE id NOT IN (SELECT id FROM B)".'
        },
        {
          title: 'Mismatched Collations & Hidden Full Scans',
          text: 'If Table A has utf8mb4_general_ci and Table B has utf8mb4_unicode_ci, the database engine CANNOT use B+Tree indexes on the join key! It silently falls back to a full table scan and converts every string at runtime.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p1_1',
          question: 'In standard SQL query processing, what is the very first clause physically executed by the database engine?',
          options: [
            'SELECT',
            'FROM and JOINs',
            'WHERE',
            'GROUP BY'
          ],
          correct: 1,
          explanation: 'Physical execution starts at FROM & JOINs to bind the tables and verify their existence before evaluating filters or projections.'
        },
        {
          id: 'mcq_p1_2',
          question: 'Why does joining Table A (1,000 rows) with Table B (10 rows per A) on a 1-to-many relationship cause SUM(A.balance) to become mathematically incorrect?',
          options: [
            'SUM() converts NULLs to zeroes automatically',
            'Row fan-out duplicates each row in Table A 10 times, inflating the sum tenfold',
            'Database engine runs out of sort buffer memory',
            'Implicit casting forces an Anti-Join'
          ],
          correct: 1,
          explanation: 'When joining 1-to-many, each record in A is duplicated for every matching row in B. Aggregating across joined children inflates the parent metrics.'
        },
        {
          id: 'mcq_p1_3',
          question: 'How does a database engine physically execute a Hash Join between Orders (10M rows) and CustomerTiers (5 rows)?',
          options: [
            'It loops 10M times doing B+tree lookups on CustomerTiers',
            'It builds an in-memory hash table of CustomerTiers, then streams Orders to probe the hash table in O(N+M) time',
            'It sorts both tables on disk using a multi-way merge sort',
            'It aborts with a Cartesian product warning'
          ],
          correct: 1,
          explanation: 'Hash joins operate in two phases: Build Phase (putting the smaller dataset into an in-memory hash table) and Probe Phase (streaming the larger table through it).'
        }
      ],

      caseStudy: {
        company: 'Stripe',
        role: 'Data Infrastructure Engineer',
        title: 'Settlement Ledger Break & Orphan Transaction Reconciliation',
        scenario: 'At Stripe, every authorized payment transaction must be reconciled against the bank partner settlement feed. During end-of-day batch settlement, unmatched records ("ledger breaks") indicate either un-cleared funds or technical pipeline drops.\n\nYou have access to two production tables:\n1. **internal_trade_blotter** (internal ledger of booked transactions)\n2. **custodian_clearing_feed** (clearing broker confirmed settlements)\n\nYour goal is to write a high-performance Anti-Join to detect all booked internal transactions that have NOT yet settled with the clearing broker.',
        schema: `-- Internal Transactions
internal_trade_blotter: (trade_id VARCHAR, ticker VARCHAR, trade_qty INT, execution_price FLOAT, trade_status VARCHAR)

-- Bank Clearing Feed
custodian_clearing_feed: (clearing_ref VARCHAR, internal_trade_id VARCHAR, security_id VARCHAR, cleared_qty INT, settlement_status VARCHAR)`,
        recommendedQuery: `SELECT b.trade_id, b.ticker, b.trade_qty, 'UNSETTLED_ORPHAN' AS ledger_status
FROM internal_trade_blotter b
LEFT JOIN custodian_clearing_feed c ON b.trade_id = c.internal_trade_id
WHERE c.internal_trade_id IS NULL;`
      },

      problem: {
        title: 'Reconcile Orphaned Custody Breaks',
        difficulty: 'medium',
        spec: 'Write a query using a LEFT ANTI-JOIN to return all trade_id, ticker, and trade_qty from internal_trade_blotter that have no corresponding match in custodian_clearing_feed.',
        starterSql: `SELECT b.trade_id, b.ticker, b.trade_qty, 'ORPHAN_BREAK' AS recon_flag
FROM internal_trade_blotter b
LEFT JOIN custodian_clearing_feed c ON b.trade_id = c.internal_trade_id
WHERE c.internal_trade_id IS NULL;`,
        targetTable: 'internal_trade_blotter'
      }
    },

    // -------------------------------------------------------------------------
    // PHASE 02: WHERE & THREE-VALUED LOGIC
    // -------------------------------------------------------------------------
    {
      id: 'phase_02_where',
      seq: '02',
      title: 'WHERE',
      name: 'Predicate Evaluation, Three-Valued Logic & SARGability',
      shortName: 'WHERE & 3VL',
      icon: '🎯',
      execRank: '2nd in Execution',
      lexicalRank: '3rd in Lexical Syntax',
      summary: 'Why row-level predicates execute before grouping: Three-Valued Logic (TRUE, FALSE, UNKNOWN), the fatal NOT IN (SELECT NULL) trap, and writing SARGable queries that utilize B+Tree index seeks.',

      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 02: THREE-VALUED LOGIC TRUTH MATRIX &amp; B+TREE SARGABLE SEEK PHYSICS
          </text>

          <!-- Left Matrix: 3VL Logic -->
          <g transform="translate(30, 68)">
            <rect width="425" height="250" rx="6" fill="#0d1527" stroke="#1e3a8a" stroke-width="1.5"/>
            <rect width="425" height="28" rx="6" fill="#1e3a8a"/>
            <text x="212" y="19" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              Three-Valued Logic (3VL) Truth Matrix
            </text>

            <!-- Table Header -->
            <text x="20" y="52" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="800">Expression</text>
            <text x="180" y="52" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="800">Evaluation</text>
            <text x="300" y="52" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="800">WHERE Filter Action</text>

            <line x1="20" y1="60" x2="405" y2="60" stroke="#1e293b" stroke-width="1"/>

            <!-- Rows -->
            <text x="20" y="82" fill="#cbd5e1" font-family="monospace" font-size="10.5">price > 100</text>
            <text x="180" y="82" fill="#22c55e" font-family="monospace" font-size="10.5" font-weight="800">TRUE</text>
            <text x="300" y="82" fill="#86efac" font-family="monospace" font-size="10">Row Retained (Passes)</text>

            <text x="20" y="112" fill="#cbd5e1" font-family="monospace" font-size="10.5">price = 50</text>
            <text x="180" y="112" fill="#ef4444" font-family="monospace" font-size="10.5" font-weight="800">FALSE</text>
            <text x="300" y="112" fill="#fca5a5" font-family="monospace" font-size="10">Row Discarded</text>

            <text x="20" y="142" fill="#f59e0b" font-family="monospace" font-size="10.5">price = NULL</text>
            <text x="180" y="142" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="800">UNKNOWN</text>
            <text x="300" y="142" fill="#fca5a5" font-family="monospace" font-size="10">Row Discarded! (Falsy)</text>

            <text x="20" y="172" fill="#cbd5e1" font-family="monospace" font-size="10.5">TRUE AND UNKNOWN</text>
            <text x="180" y="172" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="800">UNKNOWN</text>
            <text x="300" y="172" fill="#fca5a5" font-family="monospace" font-size="10">Compound Discarded</text>

            <text x="20" y="202" fill="#cbd5e1" font-family="monospace" font-size="10.5">NOT (UNKNOWN)</text>
            <text x="180" y="202" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="800">UNKNOWN</text>
            <text x="300" y="202" fill="#fde047" font-family="monospace" font-size="10">Still UNKNOWN!</text>

            <!-- Bottom Note -->
            <rect x="20" y="218" width="385" height="22" rx="4" fill="rgba(244, 63, 94, 0.1)"/>
            <text x="212" y="233" fill="#f43f5e" font-family="monospace" font-size="9.5" font-weight="800" text-anchor="middle">
              WHERE only retains rows where predicate is strictly TRUE!
            </text>
          </g>

          <!-- Right: B+Tree SARGability -->
          <g transform="translate(475, 68)">
            <rect width="415" height="250" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <rect width="415" height="28" rx="6" fill="#1e293b"/>
            <text x="207" y="19" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              B+Tree Index Seek vs Non-SARGable Full Scan
            </text>

            <!-- Root -->
            <rect x="160" y="44" width="95" height="24" rx="4" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1"/>
            <text x="207" y="60" fill="#ffffff" font-family="monospace" font-size="10" font-weight="800" text-anchor="middle">Root: [50 | 100]</text>

            <!-- Branches -->
            <path d="M 175 68 L 100 95" stroke="#38bdf8" stroke-width="1.5"/>
            <path d="M 240 68 L 315 95" stroke="#38bdf8" stroke-width="1.5"/>

            <!-- Leaves -->
            <rect x="50" y="95" width="100" height="24" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
            <text x="100" y="111" fill="#ecfdf5" font-family="monospace" font-size="9.5" text-anchor="middle">Leaf: 10..49</text>

            <rect x="265" y="95" width="100" height="24" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
            <text x="315" y="111" fill="#ecfdf5" font-family="monospace" font-size="9.5" text-anchor="middle">Leaf: 101..150</text>

            <!-- SARGable beam -->
            <rect x="20" y="138" width="375" height="46" rx="4" fill="rgba(34, 197, 94, 0.08)" stroke="#22c55e" stroke-width="1"/>
            <text x="30" y="156" fill="#4ade80" font-family="monospace" font-size="10" font-weight="800">✓ SARGABLE: WHERE created_at >= '2026-01-01'</text>
            <text x="30" y="172" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Engine walks Root -> Branch -> Leaf in O(log N). Index Seek.</text>

            <!-- Non-SARGable beam -->
            <rect x="20" y="192" width="375" height="46" rx="4" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" stroke-width="1"/>
            <text x="30" y="210" fill="#f87171" font-family="monospace" font-size="10" font-weight="800">✗ NON-SARGABLE: WHERE YEAR(created_at) = 2026</text>
            <text x="30" y="226" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Function wraps column. Engine cannot use B+Tree; scans 10M rows.</text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. The Mathematics of Three-Valued Logic (3VL)',
          content: 'In database relational theory, SQL implements **Three-Valued Logic (3VL)**:\n- `TRUE`\n- `FALSE`\n- `UNKNOWN` (resulting from any comparison against `NULL`)\n\nCrucially:\n- `NULL = NULL` is NOT TRUE. It evaluates to `UNKNOWN`.\n- `NULL <> 10` is NOT TRUE. It evaluates to `UNKNOWN`.\n- `NOT (UNKNOWN)` evaluates to `UNKNOWN`.\n\n**The WHERE Clause Rule**: The database engine only preserves rows where the entire predicate condition evaluates strictly to `TRUE`. Any row evaluating to `FALSE` or `UNKNOWN` is immediately discarded!'
        },
        {
          heading: '2. SARGability: Why Functions on Columns Destroy Performance',
          content: '**SARGable** stands for *Search Argument Able*. A predicate is SARGable if the database query engine can use a B+Tree index seek directly:\n- **Index Seek (O(log N))**: The engine reads the root page, compares keys, branches to intermediate pages, and lands directly on the leaf page containing the target row pointer.\n- **Index Scan / Table Scan (O(N))**: When you wrap an indexed column in a function like `WHERE UPPER(email) = "..."` or `WHERE DATE(created_at) = "2026-01-01"`, the database CANNOT compute where values lie in the B-Tree without calling the function on every single row! It drops the index and performs a full table scan.'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: Wrapped Function Destroys Index',
        badSql: `-- SLOW: Scans 100M rows on disk (Non-SARGable)
SELECT order_id, amount
FROM Orders
WHERE DATE(created_at) = '2026-03-15';`,
        badExplanation: 'Applying DATE() forces the engine to evaluate DATE() on every page on disk, bypassing the B-Tree index on created_at.',
        goodTitle: 'Production Idiom: Boundary Range Predicate',
        goodSql: `-- FAST: Index Seek executes in 0.8ms (SARGable)
SELECT order_id, amount
FROM Orders
WHERE created_at >= '2026-03-15 00:00:00' 
  AND created_at <  '2026-03-16 00:00:00';`,
        goodExplanation: 'The raw column is compared directly against scalar literal constants. The engine jumps directly to the starting page and reads only matching rows.'
      },

      gotchas: [
        {
          title: 'The Catastrophic NOT IN (SELECT NULL) Trap',
          text: 'If the subquery in "WHERE id NOT IN (SELECT parent_id FROM Table)" returns even a SINGLE NULL value, the entire expression evaluates to "UNKNOWN AND TRUE" -> UNKNOWN for every row! The query returns 0 rows. Always use NOT EXISTS or WHERE parent_id IS NOT NULL.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p2_1',
          question: 'What does the expression (NULL = NULL) evaluate to in SQL?',
          options: [
            'TRUE',
            'FALSE',
            'UNKNOWN',
            'NULL pointer exception'
          ],
          correct: 2,
          explanation: 'In SQL 3-valued logic, NULL represents an unknown value. Comparing two unknown values yields UNKNOWN, not TRUE.'
        },
        {
          id: 'mcq_p2_2',
          question: 'Why does "WHERE UPPER(last_name) = \'SMITH\'" cause slow performance on a table with 10M rows even if an index exists on last_name?',
          options: [
            'UPPER() requires UTF-16 memory allocation',
            'Wrapping the column in a function prevents B+Tree index seek, forcing a full table scan',
            'The database locks the table during string transformation',
            'The optimizer converts the query to a recursive CTE'
          ],
          correct: 1,
          explanation: 'Functions applied to indexed columns are non-SARGable. The engine must scan every row and calculate UPPER() on the fly.'
        }
      ],

      caseStudy: {
        company: 'Citadel',
        role: 'Quantitative Database Engineer',
        title: 'Microsecond Execution Filter & Three-Valued Logic Defense',
        scenario: 'In low-latency order execution systems, trading signals stream continuously.\nA trading desk wants to filter all trades where "status <> \'REJECTED\'".\nHowever, when orders are initially submitted, their status is set to NULL (Pending acknowledgement).\n\nIf a developer writes:\nWHERE status <> \'REJECTED\'\n\nAll pending trades with status = NULL are silently omitted because NULL <> \'REJECTED\' evaluates to UNKNOWN!\nYou must rewrite the predicate to be 3VL-safe and ensure all non-rejected trades (including pending NULLs) are preserved.',
        schema: 'Orders: (order_id INT, symbol VARCHAR, shares INT, price FLOAT, status VARCHAR)',
        recommendedQuery: `SELECT order_id, symbol, shares, price, status
FROM Orders
WHERE status <> 'REJECTED' OR status IS NULL;`
      },

      problem: {
        title: 'Handle 3-Valued Logic NULL Filtering',
        difficulty: 'easy',
        spec: 'Write a query on Customers returning first_name, country, and credit_score for all customers whose country is NOT "Canada", while correctly retaining customers whose country is NULL.',
        starterSql: `SELECT first_name, country, credit_score
FROM Customers
WHERE country <> 'Canada' OR country IS NULL;`,
        targetTable: 'Customers'
      }
    },

    // -------------------------------------------------------------------------
    // PHASE 03: GROUP BY & ACCUMULATORS
    // -------------------------------------------------------------------------
    {
      id: 'phase_03_group_by',
      seq: '03',
      title: 'GROUP BY',
      name: 'Hash Bucketing, Partition Registers & Group Accumulators',
      shortName: 'GROUP BY',
      icon: '📊',
      execRank: '3rd in Execution',
      lexicalRank: '4th in Lexical Syntax',
      summary: 'How group aggregation physically operates: Hashing surviving rows into bucket registers, running accumulator registers (SUM, COUNT, AVG, MIN, MAX), and memory management.',
      
      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 03: IN-MEMORY HASH AGGREGATION BUCKETS &amp; ACCUMULATOR REGISTERS
          </text>

          <!-- Input Stream -->
          <g transform="translate(30, 68)">
            <rect width="200" height="240" rx="6" fill="#0d1527" stroke="#1e3a8a" stroke-width="1.5"/>
            <rect width="200" height="28" rx="6" fill="#1e3a8a"/>
            <text x="100" y="19" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">Surviving Rows (From WHERE)</text>
            
            <text x="14" y="52" fill="#cbd5e1" font-family="monospace" font-size="10.5">Ashley | Analytics | $115k</text>
            <text x="14" y="76" fill="#cbd5e1" font-family="monospace" font-size="10.5">Brandon | Engineering | $145k</text>
            <text x="14" y="100" fill="#cbd5e1" font-family="monospace" font-size="10.5">Chloe | Analytics | $120k</text>
            <text x="14" y="124" fill="#cbd5e1" font-family="monospace" font-size="10.5">Derek | Sales | $95k</text>
            <text x="14" y="148" fill="#cbd5e1" font-family="monospace" font-size="10.5">Elena | Engineering | $160k</text>
            <text x="14" y="172" fill="#cbd5e1" font-family="monospace" font-size="10.5">Fiona | Analytics | $130k</text>
            <text x="14" y="196" fill="#cbd5e1" font-family="monospace" font-size="10.5">George | Sales | $110k</text>
          </g>

          <!-- Hash Engine -->
          <g transform="translate(250, 130)">
            <circle cx="50" cy="50" r="42" fill="#1e1e2e" stroke="#f43f5e" stroke-width="2"/>
            <text x="50" y="46" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">HASH()</text>
            <text x="50" y="62" fill="#cbd5e1" font-family="system-ui" font-size="9" text-anchor="middle">Key Partition</text>
          </g>

          <!-- RAM Buckets -->
          <g transform="translate(380, 68)">
            <!-- Bucket 1 -->
            <rect x="0" y="0" width="500" height="70" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="1.5"/>
            <text x="16" y="24" fill="#86efac" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">BUCKET: 'Analytics'</text>
            <text x="16" y="44" fill="#94a3b8" font-family="monospace" font-size="10">Rows: Ashley, Chloe, Fiona</text>
            <text x="16" y="60" fill="#22c55e" font-family="monospace" font-size="10.5" font-weight="700">Accumulators: COUNT=3 | SUM=$365k | AVG=$121.6k</text>

            <!-- Bucket 2 -->
            <rect x="0" y="85" width="500" height="70" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="16" y="109" fill="#7dd3fc" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">BUCKET: 'Engineering'</text>
            <text x="16" y="129" fill="#94a3b8" font-family="monospace" font-size="10">Rows: Brandon, Elena</text>
            <text x="16" y="145" fill="#38bdf8" font-family="monospace" font-size="10.5" font-weight="700">Accumulators: COUNT=2 | SUM=$305k | AVG=$152.5k</text>

            <!-- Bucket 3 -->
            <rect x="0" y="170" width="500" height="70" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="16" y="194" fill="#fde68a" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">BUCKET: 'Sales'</text>
            <text x="16" y="214" fill="#94a3b8" font-family="monospace" font-size="10">Rows: Derek, George</text>
            <text x="16" y="230" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="700">Accumulators: COUNT=2 | SUM=$205k | AVG=$102.5k</text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. In-Memory Hash Aggregation Mechanics',
          content: 'When the engine hits Step 3 (**GROUP BY**), it allocates an in-memory hash table in RAM:\n1. **Hashing Group Keys**: For every surviving row streaming from Step 2, the engine hashes the group key columns (e.g. department).\n2. **Bucket Lookup**: If a bucket with that hash key already exists, the row updates the accumulator registers. If not, a new bucket is created.\n3. **Accumulator Registers**:\n   - `COUNT(*)`: Increments row counter integer.\n   - `SUM(val)`: Adds numerical value (skipping NULLs).\n   - `AVG(val)`: Internally tracks two registers: `_sum` and `_count`. At final emission, it calculates `_sum / _count`.'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: COUNT(col) with NULLs',
        badSql: `-- MISLEADING: Returns lower count if bonus is NULL
SELECT department, COUNT(bonus) AS bonus_count
FROM Employees
GROUP BY department;`,
        badExplanation: 'COUNT(col) only counts non-NULL values. If 5 employees exist and 2 have NULL bonus, COUNT(bonus) returns 3, not 5.',
        goodTitle: 'Production Idiom: Precise Null-Aware Aggregation',
        goodSql: `-- ACCURATE: Clear distinction between staff count & bonus recipients
SELECT department,
       COUNT(*) AS total_staff,
       COUNT(bonus) AS bonus_recipients,
       AVG(COALESCE(bonus, 0)) AS avg_bonus_across_all
FROM Employees
GROUP BY department;`,
        goodExplanation: 'COUNT(*) counts true cardinality; COUNT(bonus) counts recipients; COALESCE prevents skewing the average.'
      },

      gotchas: [
        {
          title: 'The ONLY_FULL_GROUP_BY Rule',
          text: 'In standard SQL, any column in the SELECT list that is not wrapped in an aggregate function MUST be included in the GROUP BY clause. Failing to do so causes "Expression not in GROUP BY" errors in MySQL 8.0 and PostgreSQL.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p3_1',
          question: 'What is the physical difference between COUNT(*) and COUNT(salary)?',
          options: [
            'COUNT(*) is slower because it reads every column from disk',
            'COUNT(*) counts total rows; COUNT(salary) counts only rows where salary is NOT NULL',
            'COUNT(salary) uses a B-tree index while COUNT(*) cannot',
            'There is no difference; they are identical synonyms'
          ],
          correct: 1,
          explanation: 'COUNT(*) measures the row cardinality of the group. COUNT(column) ignores rows where that column evaluates to NULL.'
        }
      ],

      caseStudy: {
        company: 'Amazon',
        role: 'Supply Chain Analytics Engineer',
        title: 'Fulfillment Center Payroll & Tenure Rollup',
        scenario: 'Amazon Operations needs to inspect department total payroll and headcount across regional fulfillment centers. You must compute the employee headcount, total payroll expenditure, and average salary per department.',
        schema: 'Employees: (emp_id INT, first_name VARCHAR, department VARCHAR, salary INT, months_tenure INT)',
        recommendedQuery: `SELECT department, COUNT(*) AS staff_count, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary
FROM Employees
GROUP BY department
ORDER BY total_payroll DESC;`
      },

      problem: {
        title: 'Department Headcount & Payroll Metrics',
        difficulty: 'easy',
        spec: 'Write a query grouping by department to calculate the total staff count, total salary payroll, and rounded average salary.',
        starterSql: `SELECT department, COUNT(*) AS staff_count, SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary
FROM Employees
GROUP BY department
ORDER BY total_payroll DESC;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // PHASE 04: HAVING & AGGREGATE BOUNDARIES
    // -------------------------------------------------------------------------
    {
      id: 'phase_04_having',
      seq: '04',
      title: 'HAVING',
      name: 'Summary Bucket Filtering & The Aggregation Fence',
      shortName: 'HAVING',
      icon: '🛡️',
      execRank: '4th in Execution',
      lexicalRank: '5th in Lexical Syntax',
      summary: 'Why HAVING runs after GROUP BY: Filtering aggregate accumulators, understanding the physical boundary between row filters (WHERE) and summary filters (HAVING).',
      
      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 04: THE PHYSICAL AGGREGATION FENCE: WHERE (ROW-LEVEL) vs HAVING (GROUP-LEVEL)
          </text>

          <!-- Phase 2: WHERE -->
          <g transform="translate(40, 75)">
            <rect x="0" y="0" width="220" height="150" rx="6" fill="#141c2e" stroke="#0284c7" stroke-width="1.5"/>
            <text x="110" y="24" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              STEP 02: WHERE Filter
            </text>
            <text x="20" y="52" fill="#cbd5e1" font-family="system-ui" font-size="10.5">Operates on: Raw Rows</text>
            <text x="20" y="74" fill="#cbd5e1" font-family="system-ui" font-size="10.5">Timing: BEFORE Grouping</text>
            <text x="20" y="96" fill="#22c55e" font-family="monospace" font-size="10">Index Usage: YES (B+Tree)</text>
            <text x="20" y="124" fill="#fca5a5" font-family="monospace" font-size="9.5">Illegal: Aggregate functions</text>
          </g>

          <!-- Middle Conduit -->
          <g transform="translate(280, 140)">
            <path d="M 0 10 L 80 10" stroke="#f43f5e" stroke-width="2.5"/>
            <text x="40" y="0" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">GROUP BY</text>
          </g>

          <g transform="translate(380, 75)">
            <!-- Phase 4: HAVING -->
            <rect x="0" y="0" width="240" height="150" rx="6" fill="#1c0b14" stroke="#e11d48" stroke-width="1.5"/>
            <text x="120" y="24" fill="#fb7185" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              STEP 04: HAVING Filter
            </text>
            <text x="20" y="52" fill="#cbd5e1" font-family="system-ui" font-size="10.5">Operates on: Summary Buckets</text>
            <text x="20" y="74" fill="#cbd5e1" font-family="system-ui" font-size="10.5">Timing: AFTER Grouping</text>
            <text x="20" y="96" fill="#fca5a5" font-family="monospace" font-size="10">Index Usage: NO (Memory)</text>
            <text x="20" y="124" fill="#86efac" font-family="monospace" font-size="9.5">Allowed: COUNT(), SUM(), AVG()</text>
          </g>

          <!-- Right Callout -->
          <g transform="translate(640, 75)">
            <rect width="240" height="230" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="120" y="24" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              ⚡ Senior Optimization Rule
            </text>
            <text x="16" y="52" fill="#cbd5e1" font-family="system-ui" font-size="10.5">
              Never write:
            </text>
            <text x="16" y="70" fill="#f87171" font-family="monospace" font-size="10">HAVING country = 'USA'</text>
            <text x="16" y="100" fill="#cbd5e1" font-family="system-ui" font-size="10.5">
              Always push row-level filters to WHERE:
            </text>
            <text x="16" y="118" fill="#4ade80" font-family="monospace" font-size="10">WHERE country = 'USA'</text>
            <text x="16" y="148" fill="#94a3b8" font-family="system-ui" font-size="10">
              Filtering in WHERE discards rows before grouping, drastically reducing RAM hash table size.
            </text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. The Physical Boundary Between WHERE and HAVING',
          content: 'A fundamental senior interview question: *Why does SQL have both WHERE and HAVING?*\n\nThe answer is physical sequencing:\n- At Step 2 (**WHERE**), the engine is scanning raw records. Aggregates do NOT exist yet because the rows have not been grouped into buckets! Therefore, `WHERE COUNT(*) > 5` produces a syntax error.\n- At Step 4 (**HAVING**), grouping is complete. The engine iterates over the computed summary buckets and evaluates predicates against the accumulators.'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: Filtering Raw Columns in HAVING',
        badSql: `-- SLOW: Groups all 10M rows before filtering
SELECT country, COUNT(*) AS users_count
FROM Users
GROUP BY country
HAVING country IN ('US', 'UK', 'CA') AND COUNT(*) > 1000;`,
        badExplanation: 'Filtering country in HAVING forces the engine to hash all 195 countries in memory first. It wastes CPU and memory.',
        goodTitle: 'Production Idiom: Pushdown to WHERE',
        goodSql: `-- FAST: Filters rows in WHERE using B-Tree index first
SELECT country, COUNT(*) AS users_count
FROM Users
WHERE country IN ('US', 'UK', 'CA')
GROUP BY country
HAVING COUNT(*) > 1000;`,
        goodExplanation: 'The WHERE clause discards 90% of rows immediately. GROUP BY only creates hash buckets for the 3 target countries.'
      },

      gotchas: [
        {
          title: 'Conditional Aggregate Filters in HAVING',
          text: 'You can filter groups by combining CASE WHEN inside HAVING: HAVING COUNT(CASE WHEN status = "CHARGEBACK" THEN 1 END) >= 3.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p4_1',
          question: 'Why will "SELECT dept, AVG(salary) FROM Emp WHERE AVG(salary) > 100k GROUP BY dept" fail?',
          options: [
            'AVG() cannot be used on integer columns',
            'WHERE executes before GROUP BY; aggregate accumulators do not exist yet at Step 02',
            'HAVING is required whenever SELECT contains commas',
            'The salary column must be cast to VARCHAR'
          ],
          correct: 1,
          explanation: 'WHERE filters rows before grouping occurs. Aggregate functions only exist after grouping (at Step 04 HAVING and Step 05 SELECT).'
        }
      ],

      caseStudy: {
        company: 'Meta',
        role: 'Ad Integrity Engineer',
        title: 'High-Velocity Fraud Account Cluster Detection',
        scenario: 'Meta Ad Integrity flags suspicious advertiser accounts that generate more than 100 clicks from the same IP subnet within a 1-hour window. You must aggregate click logs by advertiser_id and filter only those clusters where total clicks exceed 100 and chargeback rates exceed 5%.',
        schema: 'AdClicks: (click_id INT, advertiser_id INT, ip_subnet VARCHAR, is_chargeback INT)',
        recommendedQuery: `SELECT advertiser_id, 
       COUNT(*) AS total_clicks,
       ROUND(SUM(is_chargeback) * 100.0 / COUNT(*), 2) AS chargeback_rate
FROM AdClicks
GROUP BY advertiser_id
HAVING COUNT(*) > 100 AND (SUM(is_chargeback) * 100.0 / COUNT(*)) >= 5.0;`
      },

      problem: {
        title: 'Filter Departments by Payroll Threshold',
        difficulty: 'medium',
        spec: 'Write a query on Employees to find all departments having more than 1 staff member and an average salary strictly greater than 110,000.',
        starterSql: `SELECT department, COUNT(*) AS staff_count, AVG(salary) AS avg_sal
FROM Employees
GROUP BY department
HAVING COUNT(*) > 1 AND AVG(salary) > 110000;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // PHASE 05: SELECT & WINDOW FUNCTIONS
    // -------------------------------------------------------------------------
    {
      id: 'phase_05_select_window',
      seq: '05',
      title: 'SELECT & Window Functions',
      name: 'Projections, Symbol Table Aliases & The Sliding Caliper',
      shortName: 'SELECT & Window',
      icon: '🪟',
      execRank: '5th in Execution',
      lexicalRank: '1st in Lexical Syntax',
      summary: 'The great optical illusion of SQL: Written 1st, executed 5th! Column alias registration in the symbol table, scalar projections, and analytical window framing (OVER PARTITION BY... ROWS BETWEEN).',

      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 05: SYMBOL TABLE ALIAS REGISTRATION &amp; THE SLIDING WINDOW CALIPER
          </text>

          <!-- Partition Stream -->
          <g transform="translate(30, 68)">
            <rect width="425" height="240" rx="6" fill="#0d1527" stroke="#1e3a8a" stroke-width="1.5"/>
            <text x="212" y="24" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              The Sliding Caliper: ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
            </text>

            <g transform="translate(20, 45)">
              <rect width="385" height="32" rx="4" fill="#1e293b"/>
              <text x="14" y="20" fill="#cbd5e1" font-family="monospace" font-size="10.5">Day 1: Trade $10,000 | Rolling Sum: $10,000</text>
            </g>

            <g transform="translate(20, 85)">
              <rect width="385" height="68" rx="4" fill="rgba(225, 29, 72, 0.12)" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="4 2"/>
              <text x="14" y="24" fill="#cbd5e1" font-family="monospace" font-size="10.5">Day 2: Trade $15,000 (1 Preceding)</text>
              <text x="14" y="48" fill="#ffffff" font-family="monospace" font-size="11" font-weight="700">Day 3: Trade $25,000 (Current Row) -> Rolling: $40,000</text>
            </g>

            <g transform="translate(20, 160)">
              <rect width="385" height="32" rx="4" fill="#1e293b"/>
              <text x="14" y="20" fill="#cbd5e1" font-family="monospace" font-size="10.5">Day 4: Trade $12,000 | Rolling Sum: $37,000</text>
            </g>

            <text x="212" y="222" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="middle">
              Window functions evaluate without collapsing rows into a single tuple!
            </text>
          </g>

          <!-- Ranking Functions Comparison -->
          <g transform="translate(475, 68)">
            <rect width="415" height="240" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="207" y="24" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              ROW_NUMBER() vs RANK() vs DENSE_RANK()
            </text>

            <rect x="20" y="45" width="375" height="175" rx="4" fill="#080c14" stroke="#1f2937" stroke-width="1"/>
            <text x="35" y="70" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="800">Score</text>
            <text x="110" y="70" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="800">ROW_NUMBER()</text>
            <text x="215" y="70" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="800">RANK()</text>
            <text x="295" y="70" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="800">DENSE_RANK()</text>

            <line x1="35" y1="80" x2="380" y2="80" stroke="#1e293b" stroke-width="1"/>

            <text x="35" y="102" fill="#cbd5e1" font-family="monospace" font-size="10.5">100</text>
            <text x="135" y="102" fill="#cbd5e1" font-family="monospace" font-size="10.5">1</text>
            <text x="230" y="102" fill="#22c55e" font-family="monospace" font-size="10.5" font-weight="700">1</text>
            <text x="325" y="102" fill="#38bdf8" font-family="monospace" font-size="10.5" font-weight="700">1</text>

            <text x="35" y="128" fill="#f59e0b" font-family="monospace" font-size="10.5">90 (Tie)</text>
            <text x="135" y="128" fill="#cbd5e1" font-family="monospace" font-size="10.5">2</text>
            <text x="230" y="128" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="700">2 (Tie)</text>
            <text x="325" y="128" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="700">2 (Tie)</text>

            <text x="35" y="154" fill="#f59e0b" font-family="monospace" font-size="10.5">90 (Tie)</text>
            <text x="135" y="154" fill="#cbd5e1" font-family="monospace" font-size="10.5">3</text>
            <text x="230" y="154" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="700">2 (Tie)</text>
            <text x="325" y="154" fill="#f59e0b" font-family="monospace" font-size="10.5" font-weight="700">2 (Tie)</text>

            <text x="35" y="180" fill="#cbd5e1" font-family="monospace" font-size="10.5">80</text>
            <text x="135" y="180" fill="#cbd5e1" font-family="monospace" font-size="10.5">4</text>
            <text x="230" y="180" fill="#ef4444" font-family="monospace" font-size="10.5" font-weight="800">4 (Skips 3!)</text>
            <text x="325" y="180" fill="#22c55e" font-family="monospace" font-size="10.5" font-weight="800">3 (No Gap)</text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. Symbol Table Alias Registration',
          content: 'The single most common SQL interview gotcha in existence is:\n*Why does `WHERE total > 100` fail when `SELECT price * qty AS total` is written right at the top of the query?*\n\nThe answer is **Symbol Table Registration Timing**:\n- When the query engine starts, its internal Symbol Table is empty.\n- Step 1 (FROM) registers physical table names.\n- Step 2 (WHERE) checks conditions against known symbols. `total` does NOT exist yet!\n- Step 5 (SELECT) is where column calculations happen and aliases (`AS total`) are inserted into the Symbol Table.\n- Consequently, later steps (like Step 7 ORDER BY) can see `total` perfectly!'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: Default Window Frame Performance Trap',
        badSql: `-- SLOW & ACCIDENTAL RUNNING TOTAL:
SELECT date, amount,
       SUM(amount) OVER (PARTITION BY account_id ORDER BY date)
FROM Transactions;`,
        badExplanation: 'When ORDER BY is present without a frame, SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. RANGE creates in-memory peer group comparisons on duplicate dates, incurring high overhead.',
        goodTitle: 'Production Idiom: Explicit ROWS Framing',
        goodSql: `-- FAST & DETERMINISTIC:
SELECT date, amount,
       SUM(amount) OVER (
         PARTITION BY account_id 
         ORDER BY date, id 
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_balance
FROM Transactions;`,
        goodExplanation: 'Explicit ROWS frame uses direct pointer offsets rather than value comparisons. Running sum is linear O(N).'
      },

      gotchas: [
        {
          title: 'Snowflake & BigQuery QUALIFY Clause',
          text: 'In standard ANSI SQL, you cannot filter on a window function in WHERE or HAVING. You must wrap in a subquery or CTE. Snowflake and BigQuery introduce QUALIFY, allowing: SELECT ... QUALIFY ROW_NUMBER() OVER (...) = 1.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p5_1',
          question: 'If two employees tie for 2nd highest salary, what ranks will DENSE_RANK() assign to the top 4 salaries (100, 90, 90, 80)?',
          options: [
            '1, 2, 3, 4',
            '1, 2, 2, 4',
            '1, 2, 2, 3',
            '1, 2, 3, 3'
          ],
          correct: 2,
          explanation: 'DENSE_RANK() assigns the same rank to ties but does NOT skip any numbers. 100->1, 90->2, 90->2, 80->3.'
        }
      ],

      caseStudy: {
        company: 'Jane Street',
        role: 'Quantitative Trading Systems',
        title: 'High-Frequency Order Book Rolling Volume & Rank',
        scenario: 'Jane Street trading desks track market order imbalance. For every stock symbol, you must calculate the running total traded notional and assign a dense rank to orders ordered by execution price descending.',
        schema: 'Trades: (trade_id INT, symbol VARCHAR, shares INT, price FLOAT, trade_time TIMESTAMP)',
        recommendedQuery: `SELECT trade_id, symbol, shares, price,
       DENSE_RANK() OVER (PARTITION BY symbol ORDER BY price DESC) AS price_rank,
       SUM(shares * price) OVER (
         PARTITION BY symbol 
         ORDER BY trade_time 
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cumulative_notional
FROM Trades;`
      },

      problem: {
        title: 'Running Department Payroll with ROWS Framing',
        difficulty: 'medium',
        spec: 'Write a query returning first_name, department, salary, and a running cumulative salary sum for each department ordered by salary ASC using an explicit ROWS window frame.',
        starterSql: `SELECT first_name, department, salary,
       SUM(salary) OVER (
         PARTITION BY department 
         ORDER BY salary ASC 
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_dept_salary
FROM Employees;`,
        targetTable: 'Employees'
      }
    },
    // -------------------------------------------------------------------------
    // PHASE 06: DISTINCT
    // -------------------------------------------------------------------------
    {
      id: 'phase_06_distinct',
      seq: '06',
      title: 'DISTINCT',
      name: 'Tuple Deduplication Mechanics & Hash Set Filtering',
      shortName: 'DISTINCT',
      icon: '💎',
      execRank: '6th in Execution',
      lexicalRank: '1.5 in Lexical Syntax',
      summary: 'Deduplicating projected tuples: In-memory hash set vs sort deduplication, performance trade-offs vs GROUP BY, and preventing accidental masking of join fan-out bugs.',

      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 06: TUPLE DEDUPLICATION STRAINER &amp; HASH SET FENCES
          </text>

          <!-- Input Projected Stream -->
          <g transform="translate(40, 75)">
            <rect width="240" height="230" rx="6" fill="#0d1527" stroke="#1e3a8a" stroke-width="1.5"/>
            <text x="120" y="24" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              Projected Tuples (From SELECT)
            </text>
            <text x="20" y="55" fill="#cbd5e1" font-family="monospace" font-size="10.5">(Cust 101, 'NYC')</text>
            <text x="20" y="80" fill="#cbd5e1" font-family="monospace" font-size="10.5">(Cust 102, 'SFO')</text>
            <text x="20" y="105" fill="#f87171" font-family="monospace" font-size="10.5">(Cust 101, 'NYC') [DUPE]</text>
            <text x="20" y="130" fill="#cbd5e1" font-family="monospace" font-size="10.5">(Cust 103, 'CHI')</text>
            <text x="20" y="155" fill="#f87171" font-family="monospace" font-size="10.5">(Cust 102, 'SFO') [DUPE]</text>
            <text x="20" y="180" fill="#cbd5e1" font-family="monospace" font-size="10.5">(Cust 104, 'MIA')</text>
            <text x="20" y="210" fill="#94a3b8" font-family="system-ui" font-size="10">Raw Stream: 6 Tuples</text>
          </g>

          <!-- Middle: Hash Set Strainer -->
          <g transform="translate(320, 110)">
            <rect width="250" height="160" rx="6" fill="#141c2e" stroke="#0284c7" stroke-width="1.5"/>
            <text x="125" y="24" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              In-Memory Hash Set Filter
            </text>
            <text x="20" y="55" fill="#94a3b8" font-family="system-ui" font-size="10.5">
              1. Compute hash(tuple).
            </text>
            <text x="20" y="75" fill="#94a3b8" font-family="system-ui" font-size="10.5">
              2. If hash in set -> DISCARD.
            </text>
            <text x="20" y="95" fill="#94a3b8" font-family="system-ui" font-size="10.5">
              3. Else -> Insert &amp; Emit.
            </text>
            <text x="20" y="125" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="700">
              Spills to disk if RAM exceeds tmp_table_size!
            </text>
          </g>

          <!-- Output Stream -->
          <g transform="translate(610, 75)">
            <rect width="270" height="230" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="1.5"/>
            <text x="135" y="24" fill="#86efac" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              Deduplicated Unique Tuples
            </text>
            <text x="20" y="55" fill="#86efac" font-family="monospace" font-size="10.5">✓ (Cust 101, 'NYC')</text>
            <text x="20" y="80" fill="#86efac" font-family="monospace" font-size="10.5">✓ (Cust 102, 'SFO')</text>
            <text x="20" y="105" fill="#86efac" font-family="monospace" font-size="10.5">✓ (Cust 103, 'CHI')</text>
            <text x="20" y="130" fill="#86efac" font-family="monospace" font-size="10.5">✓ (Cust 104, 'MIA')</text>
            <text x="20" y="170" fill="#38bdf8" font-family="system-ui" font-size="10.5" font-weight="700">
              Clean Result: 4 Unique Tuples
            </text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. Deduplication Timing in the Execution Lifecycle',
          content: 'DISTINCT is evaluated at Step 06—immediately after Step 05 (SELECT) has projected the final columns. The engine takes the projected row tuples and passes them through an in-memory hash set or performs a sort-based duplicate elimination.'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: Using DISTINCT to Band-Aid Bad Joins',
        badSql: `-- CODE SMELL: Masking a Cartesian fan-out
SELECT DISTINCT c.id, c.name
FROM Customers c
JOIN Orders o ON c.id = o.customer_id;`,
        badExplanation: 'If a customer has 10,000 orders, the join produces 10,000 duplicate rows, which DISTINCT then wastes CPU time deduplicating.',
        goodTitle: 'Production Idiom: Semi-Join with EXISTS',
        goodSql: `-- FAST: Stops scanning as soon as 1st match is found
SELECT c.id, c.name
FROM Customers c
WHERE EXISTS (
  SELECT 1 FROM Orders o WHERE o.customer_id = c.id
);`,
        goodExplanation: 'EXISTS short-circuits on the first matching order. No duplicates are generated, eliminating the need for DISTINCT entirely.'
      },

      gotchas: [
        {
          title: 'DISTINCT with Large BLOBs or TEXT',
          text: 'Using DISTINCT on wide text columns prevents MySQL from using memory hash tables. It immediately spills to disk temporary tables, destroying query throughput.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p6_1',
          question: 'Why is "WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.customer_id = c.id)" more efficient than "SELECT DISTINCT c.id, c.name FROM Customers c JOIN Orders o ON c.id = o.customer_id"?',
          options: [
            'EXISTS converts the query to a stored procedure',
            'EXISTS short-circuits on the first matching record without creating duplicate join tuples',
            'DISTINCT disables index scans',
            'JOINs are not permitted on customer_id'
          ],
          correct: 1,
          explanation: 'EXISTS is a Semi-Join that stops searching as soon as a single match is found. Joining without aggregation produces duplicates that must be expensively sorted/hashed by DISTINCT.'
        }
      ],

      caseStudy: {
        company: 'Netflix',
        role: 'Data Platform Analytics',
        title: 'Device Stream Session Deduplication',
        scenario: 'Netflix event streams log client heartbeats every 10 seconds. To measure unique daily active streaming accounts per country, duplicate session pings must be deduplicated across mobile, web, and TV devices.',
        schema: 'PlaybackLogs: (account_id INT, country VARCHAR, device_type VARCHAR, ping_time TIMESTAMP)',
        recommendedQuery: `SELECT DISTINCT account_id, country
FROM PlaybackLogs
WHERE ping_time >= '2026-03-01 00:00:00';`
      },

      problem: {
        title: 'Unique Market City Tuples',
        difficulty: 'easy',
        spec: 'Write a query returning unique (distinct) city and state combinations from Customers, ordered deterministically by state ASC, city ASC.',
        starterSql: `SELECT DISTINCT city, state
FROM Customers
ORDER BY state ASC, city ASC;`,
        targetTable: 'Customers'
      }
    },


    // -------------------------------------------------------------------------
    // PHASE 07: ORDER BY & DETERMINISM
    // -------------------------------------------------------------------------
    {
      id: 'phase_07_order_by',
      seq: '07',
      title: 'ORDER BY',
      name: 'Priority Heaps, Filesorts & Why Aliases Resolve Here',
      shortName: 'ORDER BY',
      icon: '⚡',
      execRank: '7th in Execution',
      lexicalRank: '6th in Lexical Syntax',
      summary: 'The physical sort engine: In-memory Priority Queue Heaps vs Disk Multi-Way Merge Filesorts, why SELECT aliases WORK here, and avoiding nondeterministic pagination bugs.',

      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 07: THE ALIAS REVELATION &amp; PRIORITY HEAP FILESORT MECHANICS
          </text>

          <g transform="translate(40, 75)">
            <rect width="840" height="110" rx="6" fill="#0d1527" stroke="#1e3a8a" stroke-width="1.5"/>
            <text x="420" y="24" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              Symbol Table Lifecycle: Why Aliases Fail in WHERE but Work in ORDER BY
            </text>

            <rect x="30" y="45" width="230" height="50" rx="4" fill="#1e1e2e" stroke="#ef4444" stroke-width="1"/>
            <text x="145" y="65" fill="#fca5a5" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">STEP 02: WHERE total > 100</text>
            <text x="145" y="82" fill="#ef4444" font-family="monospace" font-size="9" text-anchor="middle">FAIL: Symbol 'total' UNDEFINED</text>

            <path d="M 275 70 L 315 70" stroke="#38bdf8" stroke-width="2"/>

            <rect x="330" y="45" width="220" height="50" rx="4" fill="#1e1e2e" stroke="#3b82f6" stroke-width="1"/>
            <text x="440" y="65" fill="#93c5fd" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">STEP 05: SELECT ... AS total</text>
            <text x="440" y="82" fill="#38bdf8" font-family="monospace" font-size="9" text-anchor="middle">BIRTH: 'total' registered in symbol table</text>

            <path d="M 565 70 L 605 70" stroke="#22c55e" stroke-width="2"/>

            <rect x="620" y="45" width="200" height="50" rx="4" fill="#1e1e2e" stroke="#22c55e" stroke-width="1"/>
            <text x="720" y="65" fill="#86efac" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">STEP 07: ORDER BY total</text>
            <text x="720" y="82" fill="#22c55e" font-family="monospace" font-size="9" text-anchor="middle">SUCCESS: 'total' resolved!</text>
          </g>

          <g transform="translate(40, 205)">
            <rect width="410" height="110" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="1"/>
            <text x="16" y="24" fill="#86efac" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">
              ⚡ PRIORITY QUEUE HEAP (ORDER BY ... LIMIT N)
            </text>
            <text x="16" y="48" fill="#94a3b8" font-family="system-ui" font-size="10.5">
              When sorting with LIMIT N, the engine maintains an in-memory heap of size N.
            </text>
            <text x="16" y="68" fill="#94a3b8" font-family="system-ui" font-size="10.5">
              It does NOT sort all 10M rows! Time complexity drops to O(M log N).
            </text>
          </g>

          <g transform="translate(470, 205)">
            <rect width="410" height="110" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
            <text x="16" y="24" fill="#fde68a" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">
              ⚠️ NONDETERMINISTIC TIE-BREAKER BUG
            </text>
            <text x="16" y="48" fill="#94a3b8" font-family="system-ui" font-size="10.5">
              Sorting by non-unique columns (e.g. ORDER BY salary) produces random row order
            </text>
            <text x="16" y="68" fill="#94a3b8" font-family="system-ui" font-size="10.5">
              across pages. Always add a unique tie-breaker: ORDER BY salary DESC, emp_id ASC.
            </text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. Why SELECT Aliases Work in ORDER BY',
          content: 'This single physical diagram demystifies one of the most frustrating aspects of SQL:\n- Step 02 (**WHERE**): Runs BEFORE Step 05. The alias does not exist.\n- Step 05 (**SELECT**): Evaluates calculations and inserts alias keys into the symbol table.\n- Step 07 (**ORDER BY**): Executes AFTER Step 05. The engine looks up the alias in the symbol table and sorts seamlessly!'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: Flaky Pagination Bug',
        badSql: `-- DANGEROUS: Rows can appear on both Page 1 and Page 2!
SELECT user_id, signup_date
FROM Users
ORDER BY signup_date DESC
LIMIT 10 OFFSET 10;`,
        badExplanation: 'If 50 users signed up on the same date, the database engine sort algorithm is unstable and non-deterministic. User A may appear on page 1 and page 2.',
        goodTitle: 'Production Idiom: Guaranteed Deterministic Sort',
        goodSql: `-- SAFE: Unique tie-breaker guarantees immutable ordering
SELECT user_id, signup_date
FROM Users
ORDER BY signup_date DESC, user_id ASC
LIMIT 10 OFFSET 10;`,
        goodExplanation: 'Adding user_id as secondary tie-breaker ensures absolute determinism across all pagination requests.'
      },

      gotchas: [
        {
          title: 'Dialect NULL Sorting Differences',
          text: 'In PostgreSQL, NULLs sort HIGHEST by default in ASC order. In MySQL, NULLs sort LOWEST by default in ASC order! Always use "ORDER BY col ASC NULLS LAST" in Postgres for cross-engine consistency.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p7_1',
          question: 'Why does "ORDER BY total_price DESC" succeed when total_price is an alias defined in SELECT?',
          options: [
            'ORDER BY executes at Step 07, which is after Step 05 (SELECT) has registered aliases in the symbol table',
            'The database rewrites ORDER BY into a WHERE clause',
            'ORDER BY only works with numeric aliases',
            'Because modern databases ignore execution order'
          ],
          correct: 0,
          explanation: 'Step 07 ORDER BY runs after Step 05 SELECT, so all column aliases exist and are accessible.'
        }
      ],

      caseStudy: {
        company: 'Two Sigma',
        role: 'Data Platform Engineer',
        title: 'Deterministic Trade Execution Pagination',
        scenario: 'Two Sigma quantitative researchers inspect portfolio trade logs. When navigating paginated execution tables, sorting by execution timestamp causes duplicate rows between pages due to sub-millisecond timestamp ties. You must construct a deterministic sorting query with guaranteed stability.',
        schema: 'Trades: (trade_id INT, ticker VARCHAR, price FLOAT, executed_at TIMESTAMP)',
        recommendedQuery: `SELECT trade_id, ticker, price, executed_at
FROM Trades
ORDER BY executed_at DESC, trade_id ASC
LIMIT 20;`
      },

      problem: {
        title: 'Deterministic Student Suffix Sort',
        difficulty: 'easy',
        spec: 'Write a query returning Name, Marks, and the last 3 characters of Name as suffix_3 from STUDENTS for all students with Marks > 75, ordered deterministically by suffix_3 ASC and ID ASC.',
        starterSql: `SELECT Name, Marks, RIGHT(Name, 3) AS suffix_3
FROM STUDENTS
WHERE Marks > 75
ORDER BY RIGHT(Name, 3) ASC, ID ASC;`,
        targetTable: 'STUDENTS'
      }
    },
    // -------------------------------------------------------------------------
    // PHASE 08: LIMIT & OFFSET
    // -------------------------------------------------------------------------
    {
      id: 'phase_08_limit_offset',
      seq: '08',
      title: 'LIMIT & OFFSET',
      name: 'Stream Truncation & Deep Pagination Penalties',
      shortName: 'LIMIT & OFFSET',
      icon: '⏱️',
      execRank: '8th in Execution',
      lexicalRank: '7th in Lexical Syntax',
      summary: 'The final stream truncation: Why OFFSET 1,000,000 reads and discards a million rows from disk, Top-N priority queue memory limits, and replacing deep offset pagination with high-speed Keyset Cursors.',

      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 08: THE DEEP OFFSET DISK PENALTY vs KEYSET CURSOR SEEK
          </text>

          <!-- Bad Offset Path -->
          <g transform="translate(40, 75)">
            <rect width="410" height="230" rx="6" fill="#1c0b14" stroke="#e11d48" stroke-width="1.5"/>
            <text x="205" y="24" fill="#fb7185" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              OFFSET 1,000,000 LIMIT 10 (SLOW)
            </text>

            <rect x="20" y="45" width="370" height="50" rx="4" fill="#2d121c" stroke="#f43f5e" stroke-width="1"/>
            <text x="30" y="66" fill="#fda4af" font-family="monospace" font-size="10">Disk Read: 1,000,010 Pages</text>
            <text x="30" y="82" fill="#f87171" font-family="monospace" font-size="9.5">Engine reads &amp; sorts 1,000,000 rows just to discard them!</text>

            <rect x="20" y="110" width="370" height="60" rx="4" fill="#1e1e2e"/>
            <text x="30" y="132" fill="#ef4444" font-family="monospace" font-size="10.5">Latency: 4,850 ms (Severe I/O)</text>
            <text x="30" y="152" fill="#94a3b8" font-family="system-ui" font-size="10">High memory pressure on Buffer Pool.</text>
          </g>

          <!-- Good Keyset Path -->
          <g transform="translate(470, 75)">
            <rect width="410" height="230" rx="6" fill="#0d1527" stroke="#22c55e" stroke-width="1.5"/>
            <text x="205" y="24" fill="#86efac" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              KEYSET SEEK: WHERE id > 1000000 LIMIT 10 (FAST)
            </text>

            <rect x="20" y="45" width="370" height="50" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
            <text x="30" y="66" fill="#a7f3d0" font-family="monospace" font-size="10">B+Tree Seek: O(log N) Direct Seek</text>
            <text x="30" y="82" fill="#6ee7b7" font-family="monospace" font-size="9.5">Jumps straight to ID 1,000,001 and reads only 10 rows!</text>

            <rect x="20" y="110" width="370" height="60" rx="4" fill="#1e1e2e"/>
            <text x="30" y="132" fill="#22c55e" font-family="monospace" font-size="10.5">Latency: 1.2 ms (Instantaneous)</text>
            <text x="30" y="152" fill="#94a3b8" font-family="system-ui" font-size="10">Zero wasted disk I/O.</text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. The Deep OFFSET Disk Waste Penalty',
          content: 'At Step 08, LIMIT truncates the final stream. However, when using OFFSET N, the database engine must generate, sort, and walk through all N preceding rows before it can deliver the requested slice! Running OFFSET 1,000,000 forces the database to read and discard one million records every page turn.'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: Deep OFFSET Paging',
        badSql: `-- TERRIBLE PERFORMANCE: Reads 500,010 rows from disk
SELECT id, title, price
FROM Products
ORDER BY id ASC
LIMIT 10 OFFSET 500000;`,
        badExplanation: 'The database engine must read 500,000 records from disk and throw them into the trash before returning 10 rows.',
        goodTitle: 'Production Idiom: Keyset / Cursor Pagination',
        goodSql: `-- ULTRA FAST: Direct B-Tree seek in 0.8ms
SELECT id, title, price
FROM Products
WHERE id > 500000
ORDER BY id ASC
LIMIT 10;`,
        goodExplanation: 'The WHERE clause uses the B-Tree index to seek directly to ID 500001, reading only the 10 rows required.'
      },

      gotchas: [
        {
          title: 'LIMIT Without ORDER BY is Undefined',
          text: 'Never use LIMIT without an explicit deterministic ORDER BY. Without ORDER BY, the engine returns whichever physical pages happen to be fastest in the buffer pool, producing different rows on repeated runs.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p8_1',
          question: 'Why does "LIMIT 10 OFFSET 1000000" cause severe disk I/O and latency?',
          options: [
            'The engine must physically scan and discard 1,000,000 rows before emitting the 10 rows',
            'OFFSET disables all table locking',
            'LIMIT only works on datasets smaller than 10,000 rows',
            'The query planner automatically converts it into a cross join'
          ],
          correct: 0,
          explanation: 'The engine must traverse the entire offset range in memory or disk before returning the slice. Keyset pagination avoids this.'
        }
      ],

      caseStudy: {
        company: 'Twitter / X',
        role: 'Timeline Feed Architect',
        title: 'Infinite Scroll Timeline Keyset Pagination',
        scenario: 'Twitter timelines stream millions of tweets. Using offset pagination causes severe database degradation as users scroll down their feed. You must implement cursor-based keyset pagination using tweet_id.',
        schema: 'Tweets: (tweet_id BIGINT, user_id INT, content VARCHAR, created_at TIMESTAMP)',
        recommendedQuery: `SELECT tweet_id, user_id, content, created_at
FROM Tweets
WHERE tweet_id < 18920492819482910 -- Last seen cursor
ORDER BY tweet_id DESC
LIMIT 20;`
      },

      problem: {
        title: 'Top Earners Single Row Truncation',
        difficulty: 'easy',
        spec: 'Write a query calculating total earnings (months_tenure * salary) and employee count, ordered by total earnings descending, limited to the top 1 single record.',
        starterSql: `SELECT (months_tenure * salary) AS total_earnings, COUNT(*) AS employee_count
FROM Employees
GROUP BY total_earnings
ORDER BY total_earnings DESC
LIMIT 1;`,
        targetTable: 'Employees'
      }
    },


    // -------------------------------------------------------------------------
    // PHASE 09: CTEs & RECURSIVE HIERARCHIES
    // -------------------------------------------------------------------------
    {
      id: 'phase_09_ctes_recursion',
      seq: '09',
      title: 'CTEs & Recursion',
      name: 'Modular Pipelines, WorkTable FIFO Queues & Graph Traversals',
      shortName: 'CTEs & Recursion',
      icon: '🌳',
      execRank: '9th in Execution',
      lexicalRank: '0th in Lexical Syntax (WITH)',
      summary: 'Modularizing queries with Common Table Expressions (CTEs), understanding recursive execution loops (Anchor -> WorkTable -> Recursive Member -> Union Accumulator), and hierarchy trees.',

      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 09: RECURSIVE CTE WORKTABLE FIFO QUEUE &amp; ACCUMULATOR LOOP
          </text>

          <!-- Loop Conduit -->
          <g transform="translate(40, 75)">
            <rect x="0" y="0" width="220" height="90" rx="6" fill="#0d1527" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="110" y="24" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              1. Anchor Query (Seed)
            </text>
            <text x="110" y="46" fill="#cbd5e1" font-family="monospace" font-size="10" text-anchor="middle">SELECT id, boss_id, 1 AS lvl</text>
            <text x="110" y="66" fill="#cbd5e1" font-family="monospace" font-size="10" text-anchor="middle">FROM Org WHERE boss_id IS NULL</text>
          </g>

          <path d="M 270 120 L 320 120" stroke="#f43f5e" stroke-width="2"/>

          <!-- WorkTable Queue -->
          <g transform="translate(330, 75)">
            <rect x="0" y="0" width="240" height="90" rx="6" fill="#141c2e" stroke="#22c55e" stroke-width="1.5"/>
            <text x="120" y="24" fill="#86efac" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              2. WorkTable Queue (RAM)
            </text>
            <text x="120" y="46" fill="#cbd5e1" font-family="system-ui" font-size="10" text-anchor="middle">Holds current level's parent rows</text>
            <text x="120" y="66" fill="#22c55e" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">FIFO Evaluation</text>
          </g>

          <path d="M 580 120 L 630 120" stroke="#f43f5e" stroke-width="2"/>

          <!-- Recursive Member -->
          <g transform="translate(640, 75)">
            <rect x="0" y="0" width="240" height="90" rx="6" fill="#1c0b14" stroke="#e11d48" stroke-width="1.5"/>
            <text x="120" y="24" fill="#fb7185" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              3. Recursive Member
            </text>
            <text x="120" y="46" fill="#cbd5e1" font-family="monospace" font-size="10" text-anchor="middle">JOIN Org o ON o.boss_id = w.id</text>
            <text x="120" y="66" fill="#fb7185" font-family="system-ui" font-size="10" text-anchor="middle">Produces next level children</text>
          </g>

          <!-- Loop Back Arrow -->
          <path d="M 760 175 L 760 215 L 450 215 L 450 175" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="600" y="235" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="800">
            Loop repeats until WorkTable Queue is empty (0 new rows)!
          </text>

          <!-- Final Accumulator -->
          <g transform="translate(40, 250)">
            <rect width="840" height="65" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
            <text x="20" y="24" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">
              4. UNION ALL Accumulator
            </text>
            <text x="20" y="46" fill="#94a3b8" font-family="system-ui" font-size="11">
              Combines Level 1 + Level 2 + Level 3 ... and emits final hierarchical result tree.
            </text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. The Recursive CTE Physical Loop',
          content: 'Recursive CTEs (`WITH RECURSIVE`) execute as a physical state machine:\n1. **Anchor Member**: Runs once. Populates the result accumulator and the in-memory **WorkTable**.\n2. **Recursive Loop**:\n   - The recursive query runs, joining against the current **WorkTable**.\n   - If rows are produced, they replace the WorkTable and append to the accumulator.\n   - If 0 rows are produced, the engine breaks the loop.\n3. **Termination**: Never write a recursive CTE without a termination predicate (`WHERE level < 50`) to prevent infinite recursion and server out-of-memory crashes!'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: Unbounded Recursion',
        badSql: `-- DANGEROUS: Cyclic data will hang the database!
WITH RECURSIVE OrgTree AS (
  SELECT emp_id, manager_id FROM Employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.manager_id FROM Employees e
  JOIN OrgTree ot ON e.manager_id = ot.emp_id
)
SELECT * FROM OrgTree;`,
        badExplanation: 'If employee A manages B and B manages A, this runs infinitely until the server runs out of RAM.',
        goodTitle: 'Production Idiom: Depth Guard & Cycle Prevention',
        goodSql: `-- SAFE: Bounded depth guard
WITH RECURSIVE OrgTree AS (
  SELECT emp_id, manager_id, 1 AS depth
  FROM Employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.manager_id, ot.depth + 1
  FROM Employees e
  JOIN OrgTree ot ON e.manager_id = ot.emp_id
  WHERE ot.depth < 20 -- Safety guard
)
SELECT * FROM OrgTree;`,
        goodExplanation: 'The depth guard guarantees termination even if cyclic manager references exist in dirty data.'
      },

      gotchas: [
        {
          title: 'UNION vs UNION ALL in Recursive CTEs',
          text: 'Using UNION instead of UNION ALL forces the database to sort and deduplicate the WorkTable on every single iteration! Always use UNION ALL unless duplicate paths must be collapsed.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p9_1',
          question: 'What happens when the recursive member of a WITH RECURSIVE query produces 0 rows?',
          options: [
            'The database throws a no data found error',
            'The WorkTable is empty, and the recursion loop terminates successfully',
            'The anchor query is re-executed',
            'The query planner switches to a Hash Join'
          ],
          correct: 1,
          explanation: 'When the recursive member returns 0 rows, the WorkTable queue is empty, which is the standard termination condition.'
        }
      ],

      caseStudy: {
        company: 'Goldman Sachs',
        role: 'Risk Architecture',
        title: 'Recursive Legal Entity Ownership Hierarchy',
        scenario: 'Financial institutions must map complex corporate parent-subsidiary ownership trees to calculate total counterparty risk. You must construct a recursive CTE traversing the parent_entity_id hierarchy starting from the ultimate parent entity.',
        schema: 'LegalEntities: (entity_id INT, entity_name VARCHAR, parent_entity_id INT, ownership_pct FLOAT)',
        recommendedQuery: `WITH RECURSIVE EntityHierarchy AS (
  SELECT entity_id, entity_name, parent_entity_id, 1 AS tree_depth
  FROM LegalEntities
  WHERE parent_entity_id IS NULL
  UNION ALL
  SELECT e.entity_id, e.entity_name, e.parent_entity_id, eh.tree_depth + 1
  FROM LegalEntities e
  JOIN EntityHierarchy eh ON e.parent_entity_id = eh.entity_id
  WHERE eh.tree_depth < 10
)
SELECT * FROM EntityHierarchy;`
      },

      problem: {
        title: 'Recursive Employee Hierarchy Depth',
        difficulty: 'hard',
        spec: 'Write a recursive CTE starting from top-level employees (months_tenure > 20) tracing hierarchy levels.',
        starterSql: `WITH RECURSIVE OrgWalk AS (
  SELECT emp_id, first_name, department, salary, 1 AS org_level
  FROM Employees
  WHERE salary > 140000
  UNION ALL
  SELECT e.emp_id, e.first_name, e.department, e.salary, ow.org_level + 1
  FROM Employees e
  JOIN OrgWalk ow ON e.salary = ow.salary - 5000
  WHERE ow.org_level < 5
)
SELECT * FROM OrgWalk;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // PHASE 10: STORAGE PHYSICS & INTERVIEW DEFENSE
    // -------------------------------------------------------------------------
    {
      id: 'phase_10_storage_defense',
      seq: '10',
      title: 'Storage Physics & Defense',
      name: 'InnoDB 16KB Pages, Clustered B+Trees & Whiteboard Defense',
      shortName: 'Storage & Defense',
      icon: '🛡️',
      execRank: '10th in Execution',
      lexicalRank: 'Architecture & System Design',
      summary: 'Relational storage physics: 16KB disk page anatomy, Clustered Index leaf data vs Secondary Index bookmark lookups, Buffer Pool RAM hits (0.1ms) vs disk I/O (5ms), and defending technical choices in FAANG/Hedge Fund whiteboard screens.',

      svgDiagram: `
        <svg viewBox="0 0 920 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="920" height="340" fill="#080c14" rx="10" stroke="#1f2937" stroke-width="1"/>
          <rect x="20" y="16" width="880" height="36" rx="6" fill="#0d1117" stroke="rgba(225, 29, 72, 0.3)" stroke-width="1"/>
          <text x="460" y="39" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">
            STEP 10: INNODB 16KB DISK PAGE ANATOMY &amp; CLUSTERED B+TREE HIERARCHY
          </text>

          <!-- 16KB Page Box -->
          <g transform="translate(40, 75)">
            <rect width="410" height="230" rx="6" fill="#0d1527" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="205" y="24" fill="#93c5fd" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              InnoDB 16KB Data Page Layout
            </text>

            <rect x="20" y="45" width="370" height="30" rx="3" fill="#1e3a8a"/>
            <text x="205" y="64" fill="#ffffff" font-family="monospace" font-size="10" text-anchor="middle">Page Header (38 Bytes): Checksum, Page LSN</text>

            <rect x="20" y="82" width="370" height="70" rx="3" fill="#065f46"/>
            <text x="205" y="105" fill="#ecfdf5" font-family="monospace" font-size="10.5" font-weight="700" text-anchor="middle">User Row Records (Clustered Data)</text>
            <text x="205" y="125" fill="#a7f3d0" font-family="monospace" font-size="9.5" text-anchor="middle">Row Header + DB_TRX_ID (MVCC) + DB_ROLL_PTR + Columns</text>

            <rect x="20" y="160" width="370" height="26" rx="3" fill="#334155"/>
            <text x="205" y="177" fill="#cbd5e1" font-family="monospace" font-size="9.5" text-anchor="middle">Free Space / Page Hole Gap</text>

            <rect x="20" y="192" width="370" height="26" rx="3" fill="#1e293b"/>
            <text x="205" y="209" fill="#94a3b8" font-family="monospace" font-size="9.5" text-anchor="middle">Page Directory (Sparse Slot Array for In-Page Binary Search)</text>
          </g>

          <!-- Clustered vs Secondary -->
          <g transform="translate(470, 75)">
            <rect width="410" height="230" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="1.5"/>
            <text x="205" y="24" fill="#86efac" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" text-anchor="middle">
              Clustered Index vs Secondary Bookmark Lookup
            </text>

            <rect x="20" y="45" width="370" height="75" rx="4" fill="#1e1e2e" stroke="#22c55e" stroke-width="1"/>
            <text x="30" y="66" fill="#4ade80" font-family="monospace" font-size="10.5" font-weight="700">✓ Clustered Index (Primary Key)</text>
            <text x="30" y="86" fill="#94a3b8" font-family="system-ui" font-size="10">The leaf pages OF the index ARE the physical table data!</text>
            <text x="30" y="104" fill="#94a3b8" font-family="system-ui" font-size="10">Zero extra hops. 1 seek reads full row.</text>

            <rect x="20" y="130" width="370" height="85" rx="4" fill="#1e1e2e" stroke="#f59e0b" stroke-width="1"/>
            <text x="30" y="152" fill="#fde68a" font-family="monospace" font-size="10.5" font-weight="700">⚠️ Secondary Index Bookmark Lookup</text>
            <text x="30" y="172" fill="#94a3b8" font-family="system-ui" font-size="10">Secondary index leaves store (IndexKey + PK Value).</text>
            <text x="30" y="190" fill="#94a3b8" font-family="system-ui" font-size="10">Must execute SECOND seek on clustered index to fetch columns!</text>
            <text x="30" y="205" fill="#f59e0b" font-family="monospace" font-size="9.5">Avoid with Covering Indexes (INCLUDE).</text>
          </g>
        </svg>
      `,

      theorySections: [
        {
          heading: '1. The Physical 16KB Storage Page Architecture',
          content: 'Databases do not read individual rows from disk. They read 16KB Pages (InnoDB default). A table with 10M rows consists of hundreds of thousands of pages arranged in a balanced B+Tree. Minimizing the number of pages transferred from disk into the Buffer Pool is the sole determinant of query latency.'
        }
      ],

      diff: {
        badTitle: 'Anti-Pattern: SELECT * Triggers Bookmark Lookups',
        badSql: `-- SLOW: 2x index lookups per row
SELECT *
FROM Orders
WHERE customer_id = 502;`,
        badExplanation: 'Even if an index exists on customer_id, fetching columns not in the index forces a secondary lookup into the clustered index for every match.',
        goodTitle: 'Production Idiom: Covering Index (Index-Only Scan)',
        goodSql: `-- ULTRA FAST: Index-Only Scan (0 hops to disk)
SELECT order_id, order_date, total_amount
FROM Orders
WHERE customer_id = 502;`,
        goodExplanation: 'When the composite index (customer_id, order_date, total_amount) contains all requested columns, the engine never touches the physical table pages.'
      },

      gotchas: [
        {
          title: 'Whiteboard Defense Protocol',
          text: 'In senior interviews, when asked "How would you optimize this query?", always state: 1. Explain access method (Seek vs Scan). 2. Check selectivity (cardinality of filtered keys). 3. Propose a Covering Index to eliminate bookmark lookups.'
        }
      ],

      mcqs: [
        {
          id: 'mcq_p10_1',
          question: 'What is a "Covering Index" in relational database optimization?',
          options: [
            'An index that covers more than 10 tables simultaneously',
            'An index that contains all columns requested by a query, allowing the engine to satisfy the query entirely from index leaf pages without table lookups',
            'An encrypted index that covers personal customer data',
            'An index created exclusively on primary keys'
          ],
          correct: 1,
          explanation: 'A covering index satisfies the query completely from the index leaf nodes, eliminating secondary bookmark lookups.'
        }
      ],

      caseStudy: {
        company: 'JPMorgan Chase',
        role: 'Principal Database Architect',
        title: 'Zero-Disk-I/O High Throughput Transaction Blotter',
        scenario: 'JPMorgan Chase trade blotters execute 50,000 queries per second. Every millisecond of disk I/O introduces unacceptable slippage. You must design an optimal covering index strategy for trade status verification.',
        schema: 'Trades: (trade_id INT, desk_id INT, status VARCHAR, amount FLOAT, executed_at TIMESTAMP)',
        recommendedQuery: `-- Covered by INDEX (desk_id, status, amount)
SELECT status, SUM(amount) AS desk_total
FROM Trades
WHERE desk_id = 104
GROUP BY status;`
      },

      problem: {
        title: 'Prime Broker Custody Reconciliation Capstone',
        difficulty: 'hard',
        spec: 'Write a full outer reconciliation query comparing internal_trade_blotter and custodian_clearing_feed, identifying orphan custody breaks and quantity mismatches.',
        starterSql: `SELECT 
  COALESCE(b.trade_id, c.clearing_ref) AS trade_identifier,
  COALESCE(b.ticker, c.security_id) AS symbol,
  b.trade_qty AS blotter_qty,
  c.cleared_qty AS custody_qty,
  CASE 
    WHEN b.trade_id IS NULL THEN 'ORPHAN_CUSTODY_BREAK'
    WHEN c.clearing_ref IS NULL THEN 'FAIL_TO_DELIVER_UNMATCHED'
    WHEN b.trade_qty <> c.cleared_qty THEN 'QUANTITY_MISMATCH'
    ELSE 'PERFECT_MATCH_SETTLED'
  END AS reconciliation_status
FROM internal_trade_blotter b
FULL OUTER JOIN custodian_clearing_feed c ON b.trade_id = c.internal_trade_id;`,
        targetTable: 'internal_trade_blotter'
      }
    }

  ];

  // Helper: Get Phase by ID
  function getPhase(id) {
    return PHASES.find(p => p.id === id) || PHASES[0];
  }

  // ===========================================================================
  // INITIALIZATION & RENDER
  // ===========================================================================
  function init() {
    const container = document.getElementById('viewMasteryCourse');
    if (!container) return;

    renderCourseShell(container);
    bindCourseEvents(container);
  }

  function renderCourseShell(container) {
    const active = getPhase(state.activePhaseId);
    const completedCount = state.completedPhases.size;
    const progressPct = Math.round((completedCount / PHASES.length) * 100);

    container.innerHTML = `
      <div class="mastery-course-wrapper">
        <!-- 1. Sleek Course Top Header -->
        <header class="course-header-bar">
          <div class="course-header-left">
            <span class="course-badge-icon">📖</span>
            <div class="course-title-col">
              <h1 class="course-headline">
                SQL Mastery &amp; Technical Interview Preparation
                <span class="course-pill-tag">Order of Execution</span>
              </h1>
              <p class="course-subline">
                Master relational storage engine physics &bull; Crack FAANG and Wall Street technical screens
              </p>
            </div>
          </div>

          <div class="course-header-right">
            <div class="course-mastery-meter" title="${completedCount} of ${PHASES.length} Phases Mastered">
              <span class="meter-label">${completedCount}/${PHASES.length} Complete (${progressPct}%)</span>
              <div class="meter-track">
                <div class="meter-fill" style="width: ${progressPct}%;"></div>
              </div>
            </div>
          </div>
        </header>

        <!-- 2. The 10-Phase Horizontal Execution Rail -->
        <nav class="phase-execution-rail" id="phaseExecutionRail">
          ${PHASES.map((p, idx) => {
            const isActive = p.id === state.activePhaseId;
            const isDone = state.completedPhases.has(p.id);
            const sep = idx < PHASES.length - 1 ? '<span class="phase-rail-sep">➔</span>' : '';
            return `
              <button class="phase-node-btn ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-phase="${p.id}">
                <span class="phase-seq-tag">${p.seq}</span>
                <span class="phase-name-tag">${p.shortName}</span>
                ${isDone ? '<span style="font-size: 10px;">✓</span>' : ''}
              </button>
              ${sep}
            `;
          }).join('')}
        </nav>

        <!-- 3. Active Phase Banner & 4-Step Order of Learning Navigation -->
        <section class="active-phase-card">
          <div class="phase-hero-info">
            <div class="phase-hero-badge">${active.icon}</div>
            <div class="phase-hero-text">
              <h2>Phase ${active.seq}: ${active.name}</h2>
              <p>${active.summary}</p>
            </div>
          </div>

          <div class="step-order-tabs">
            <button class="step-tab-btn ${state.activeStep === 'theory' ? 'active' : ''}" data-step="theory">
              <span>📖 1. Theory &amp; SVG</span>
            </button>
            <button class="step-tab-btn ${state.activeStep === 'mcqs' ? 'active' : ''}" data-step="mcqs">
              <span>🧠 2. MCQs &amp; Traps</span>
              <span class="step-count-pill">${(active.mcqs || []).length}</span>
            </button>
            <button class="step-tab-btn ${state.activeStep === 'case' ? 'active' : ''}" data-step="case">
              <span>🏢 3. Case Study</span>
            </button>
            <button class="step-tab-btn ${state.activeStep === 'problem' ? 'active' : ''}" data-step="problem">
              <span>⚡ 4. Problem &amp; Solver</span>
            </button>
          </div>
        </section>

        <!-- 4. Dynamic Step Stage Viewport -->
        <main class="course-step-viewport" id="courseStepViewport">
          ${renderActiveStepContent(active)}
        </main>

        <!-- 5. Footer Phase Navigation Controls -->
        <footer class="course-footer-nav">
          <button id="btnPrevPhase" class="phase-nav-btn" ${getPhaseIndex(active.id) === 0 ? 'disabled' : ''}>
            <span>◀ Previous Phase</span>
          </button>

          <button id="btnMarkPhaseComplete" class="phase-complete-cta">
            <span>${state.completedPhases.has(active.id) ? '✓ Phase Mastered' : 'Mark Phase Mastered'}</span>
          </button>

          <button id="btnNextPhase" class="phase-nav-btn" ${getPhaseIndex(active.id) === PHASES.length - 1 ? 'disabled' : ''}>
            <span>Next Phase ▶</span>
          </button>
        </footer>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER ACTIVE STEP CONTENT
  // ===========================================================================
  function renderActiveStepContent(phase) {
    if (state.activeStep === 'theory') {
      return renderTheoryStage(phase);
    }
    if (state.activeStep === 'mcqs') {
      return renderMcqsStage(phase);
    }
    if (state.activeStep === 'case') {
      return renderCaseStage(phase);
    }
    if (state.activeStep === 'problem') {
      return renderProblemStage(phase);
    }
    return '';
  }

  // Stage 1: Theory & Tactile SVG
  function renderTheoryStage(phase) {
    return `
      <div class="stage-theory-container">
        <!-- Tactile SVG Card -->
        <div class="tactile-svg-card">
          <div class="diagram-header-strip">
            <span class="diagram-title">
              <span>⚡</span>
              <span>TACTILE ARCHITECTURE EXPLORER: ${phase.name}</span>
            </span>
            <div class="diagram-actions">
              <span class="course-pill-tag">${phase.execRank}</span>
            </div>
          </div>
          <div class="svg-render-viewport">
            ${phase.svgDiagram}
          </div>
        </div>

        <!-- Theory Split Grid -->
        <div class="theory-content-grid">
          <div class="theory-main-column">
            ${(phase.theorySections || []).map(sec => `
              <div class="theory-text-card">
                <h3 class="theory-card-heading">${sec.heading}</h3>
                <div class="theory-card-body">
                  ${formatTheoryMarkdown(sec.content)}
                </div>
              </div>
            `).join('')}

            <!-- Architecture Diff Card -->
            ${phase.diff ? `
              <div class="architecture-diff-card">
                <div class="diff-card-title">Visual Architecture Diff: Anti-Pattern vs. Production Idiom</div>
                <div class="diff-split-grid">
                  <div class="diff-box anti-pattern">
                    <div class="diff-box-header">
                      <span>${phase.diff.badTitle}</span>
                      <span>DISCARD</span>
                    </div>
                    <pre class="diff-box-code">${escapeHtml(phase.diff.badSql)}</pre>
                    <div class="diff-box-explanation">${phase.diff.badExplanation}</div>
                  </div>

                  <div class="diff-box production-idiom">
                    <div class="diff-box-header">
                      <span>${phase.diff.goodTitle}</span>
                      <span>RECOMMENDED</span>
                    </div>
                    <pre class="diff-box-code">${escapeHtml(phase.diff.goodSql)}</pre>
                    <div class="diff-box-explanation">${phase.diff.goodExplanation}</div>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>

          <div class="theory-sidebar-column">
            <!-- Senior Gotchas Accordion -->
            <div class="interview-gotchas-card">
              <div class="gotchas-title">
                <span>⚠️</span>
                <span>Senior Interview Traps &amp; Failure Modes</span>
              </div>
              <div class="gotchas-list">
                ${(phase.gotchas || []).map(g => `
                  <div class="gotcha-item">
                    <div class="gotcha-item-title">${g.title}</div>
                    <div class="gotcha-item-text">${g.text}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Quick Jump to Step 2 Button -->
            <button class="case-solve-cta" onclick="window.MasteryCourseEngine.switchStep('mcqs')">
              <span>Next: Knowledge Check MCQs (Step 2) ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Stage 2: MCQs
  function renderMcqsStage(phase) {
    const questions = phase.mcqs || [];
    return `
      <div class="stage-mcqs-container">
        <div class="mcqs-header-strip">
          <span class="mcqs-header-info">
            Phase ${phase.seq} Knowledge Check: ${questions.length} Precision Interview Questions
          </span>
          <span class="course-pill-tag">Use Keys 1, 2, 3, 4</span>
        </div>

        <div class="mcqs-list-grid">
          ${questions.map((q, qIdx) => {
            const answeredKey = `${phase.id}_${qIdx}`;
            const selectedOpt = state.mcqAnswers[answeredKey];
            const hasAnswered = selectedOpt !== undefined;

            return `
              <div class="course-mcq-card" data-qidx="${qIdx}">
                <div class="mcq-prompt-row">
                  <span class="mcq-index-badge">Q${qIdx + 1}</span>
                  <div class="mcq-question-text">${q.question}</div>
                </div>

                <div class="mcq-options-grid">
                  ${q.options.map((opt, optIdx) => {
                    let optClass = '';
                    if (hasAnswered) {
                      if (optIdx === q.correct) optClass = 'correct';
                      else if (optIdx === selectedOpt) optClass = 'wrong';
                    }
                    return `
                      <button class="course-opt-btn ${optClass}" ${hasAnswered ? 'disabled' : ''} onclick="window.MasteryCourseEngine.handleOptionClick('${phase.id}', ${qIdx}, ${optIdx})">
                        <span class="opt-key-badge">${optIdx + 1}</span>
                        <span>${opt}</span>
                      </button>
                    `;
                  }).join('')}
                </div>

                <div class="mcq-explanation-box ${hasAnswered ? 'show' : ''}">
                  <strong>Engine Rationale:</strong> ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="case-solve-cta" style="margin-top: 10px;" onclick="window.MasteryCourseEngine.switchStep('case')">
          <span>Next: Real-World Case Study (Step 3) ➔</span>
        </button>
      </div>
    `;
  }

  // Stage 3: Case Study
  function renderCaseStage(phase) {
    const cs = phase.caseStudy;
    if (!cs) return '<div style="padding: 24px;">No case study defined for this phase.</div>';

    return `
      <div class="stage-case-container">
        <div class="case-dossier-card">
          <div class="case-header-row">
            <div class="case-employer-chip">
              <span style="font-size: 18px;">🏛️</span>
              <span class="case-company-name">${cs.company}</span>
              <span class="case-role-pill">${cs.role}</span>
            </div>
            <span class="course-pill-tag">Real-World Case Study</span>
          </div>

          <h3 class="case-title">${cs.title}</h3>
          <div class="case-scenario-desc">${formatTheoryMarkdown(cs.scenario)}</div>

          <div>
            <div style="font-size: 11px; font-weight: 800; font-family: monospace; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Target Relational Schema:</div>
            <pre class="case-schema-preview">${escapeHtml(cs.schema)}</pre>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 8px;">
            <button class="case-solve-cta" onclick="window.MasteryCourseEngine.solveInStudio('${encodeURIComponent(cs.recommendedQuery)}', '${phase.problem ? phase.problem.targetTable : 'TRIANGLES'}')">
              <span>⚡ Load &amp; Solve in Query Studio ➔</span>
            </button>
            <button class="phase-nav-btn" onclick="window.MasteryCourseEngine.switchStep('problem')">
              <span>Next: Hands-on Problem (Step 4) ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Stage 4: Query Problem & Solver
  function renderProblemStage(phase) {
    const prob = phase.problem;
    if (!prob) return '<div style="padding: 24px;">No problem defined for this phase.</div>';

    const isShowingSol = state.showSolution[phase.id];

    return `
      <div class="stage-problems-container">
        <div class="problem-challenge-card">
          <div class="problem-header-row">
            <h3 class="problem-title">${prob.title}</h3>
            <span class="problem-difficulty-badge ${prob.difficulty}">${prob.difficulty}</span>
          </div>

          <div class="problem-spec-text">${prob.spec}</div>

          <div class="problem-actions-row">
            <button class="problem-run-studio-btn" onclick="window.MasteryCourseEngine.solveInStudio('${encodeURIComponent(prob.starterSql)}', '${prob.targetTable}')">
              <span>⚡ Solve in Query Studio</span>
            </button>

            <button class="problem-toggle-sol-btn" onclick="window.MasteryCourseEngine.toggleSolution('${phase.id}')">
              <span>${isShowingSol ? 'Hide Reference Solution' : '👁️ View Reference Solution'}</span>
            </button>
          </div>

          ${isShowingSol ? `
            <div style="margin-top: 10px;">
              <div style="font-size: 11px; font-weight: 700; font-family: monospace; color: var(--status-success); margin-bottom: 6px;">REFERENCE SOLUTION:</div>
              <pre class="problem-solution-snippet">${escapeHtml(prob.starterSql)}</pre>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // EVENT BINDINGS & ACTIONS
  // ===========================================================================
  function bindCourseEvents(container) {
    // 1. Phase node buttons
    container.querySelectorAll('.phase-node-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activePhaseId = btn.dataset.phase;
        init();
      });
    });

    // 2. Step order tabs
    container.querySelectorAll('.step-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeStep = btn.dataset.step;
        init();
      });
    });

    // 3. Prev & Next Phase
    const btnPrev = container.querySelector('#btnPrevPhase');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const curIdx = getPhaseIndex(state.activePhaseId);
        if (curIdx > 0) {
          state.activePhaseId = PHASES[curIdx - 1].id;
          init();
        }
      });
    }

    const btnNext = container.querySelector('#btnNextPhase');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const curIdx = getPhaseIndex(state.activePhaseId);
        if (curIdx < PHASES.length - 1) {
          state.activePhaseId = PHASES[curIdx + 1].id;
          init();
        }
      });
    }

    // 4. Mark Complete CTA
    const btnComplete = container.querySelector('#btnMarkPhaseComplete');
    if (btnComplete) {
      btnComplete.addEventListener('click', () => {
        if (state.completedPhases.has(state.activePhaseId)) {
          state.completedPhases.delete(state.activePhaseId);
        } else {
          state.completedPhases.add(state.activePhaseId);
          if (window.soundFX) window.soundFX.playPop();
          if (window.SQL_BUDDY) {
            window.SQL_BUDDY.say(`🎉 Phase ${getPhase(state.activePhaseId).seq} Mastered! Great job!`, 4000, 'celebrate');
          }
        }
        try {
          localStorage.setItem('sql_mastery_course_completed_phases', JSON.stringify(Array.from(state.completedPhases)));
        } catch (e) {}
        init();
      });
    }
  }

  function handleOptionClick(phaseId, qIdx, optIdx) {
    const phase = getPhase(phaseId);
    const q = phase.mcqs[qIdx];
    if (!q) return;

    state.mcqAnswers[`${phaseId}_${qIdx}`] = optIdx;
    if (optIdx === q.correct) {
      if (window.soundFX) window.soundFX.playPop();
    } else {
      if (window.soundFX) window.soundFX.playWhoosh();
    }
    init();
  }

  function switchStep(stepName) {
    state.activeStep = stepName;
    init();
  }

  function toggleSolution(phaseId) {
    state.showSolution[phaseId] = !state.showSolution[phaseId];
    init();
  }

  function solveInStudio(encodedQuery, table) {
    const query = decodeURIComponent(encodedQuery);
    if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewStudio');
    }
    if (window.StudioWorkbenchEngine && typeof window.StudioWorkbenchEngine.loadQuery === 'function') {
      window.StudioWorkbenchEngine.loadQuery(query, table);
    }
  }

  function getPhaseIndex(id) {
    return PHASES.findIndex(p => p.id === id);
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatTheoryMarkdown(text) {
    return (text || '')
      .replace(/```sql([\s\S]*?)```/g, '<pre class="theory-code-snippet">$1</pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '<br>&bull; ');
  }

  return {
    init,
    getPhases: () => PHASES,
    switchStep,
    handleOptionClick,
    toggleSolution,
    solveInStudio
  };

})();
