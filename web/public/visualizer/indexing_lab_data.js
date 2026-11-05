// =============================================================================
// TRACK 08: PHYSICAL QUERY EXECUTION & INDEX SEEKS LAB
// =============================================================================

window.INDEXING_SCHEMA = {
  tableName: 'OrdersStorage',
  columns: ['order_id', 'customer_id', 'order_date', 'status', 'total_amount', 'page_id'],
  types: { order_id: 'INT', customer_id: 'INT', order_date: 'VARCHAR', status: 'VARCHAR', total_amount: 'DECIMAL', page_id: 'VARCHAR' },
  rows: [
    { order_id: 1001, customer_id: 501, order_date: '2024-01-15', status: 'DELIVERED', total_amount: 450.00, page_id: 'Page 0x1A' },
    { order_id: 1002, customer_id: 502, order_date: '2024-01-18', status: 'SHIPPED', total_amount: 1200.00, page_id: 'Page 0x1A' },
    { order_id: 1003, customer_id: 501, order_date: '2024-02-01', status: 'DELIVERED', total_amount: 890.00, page_id: 'Page 0x1B' },
    { order_id: 1004, customer_id: 503, order_date: '2024-02-14', status: 'CANCELLED', total_amount: 130.00, page_id: 'Page 0x1B' },
    { order_id: 1005, customer_id: 504, order_date: '2024-03-01', status: 'DELIVERED', total_amount: 2500.00, page_id: 'Page 0x2A' },
    { order_id: 1006, customer_id: 502, order_date: '2024-03-10', status: 'PROCESSING', total_amount: 640.00, page_id: 'Page 0x2A' },
    { order_id: 1007, customer_id: 505, order_date: '2024-03-22', status: 'DELIVERED', total_amount: 310.00, page_id: 'Page 0x2B' },
    { order_id: 1008, customer_id: 501, order_date: '2024-04-05', status: 'SHIPPED', total_amount: 980.00, page_id: 'Page 0x2B' },
    { order_id: 1009, customer_id: 506, order_date: '2024-04-18', status: 'DELIVERED', total_amount: 1750.00, page_id: 'Page 0x3A' },
    { order_id: 1010, customer_id: 503, order_date: '2024-05-02', status: 'DELIVERED', total_amount: 420.00, page_id: 'Page 0x3A' }
  ]
};

window.INDEXING_STEPS = [
  // ---------------------------------------------------------------------------
  // STEP 01: Heap Table & Sequential Table Scan
  // ---------------------------------------------------------------------------
  {
    stepIndex: 1,
    id: 'index_heap_scan',
    keyword: 'TABLE SCAN',
    title: 'Step 01: Heap Tables & Sequential Full Table Scans',
    pillClass: 'pill-index',
    conceptHeading: 'What Happens When the Database Engine Has No Index to Help It?',
    conceptText: 'Without an applicable index, rows are stored as an unordered heap across physical disk pages. To evaluate `WHERE customer_id = 501`, the engine has no choice but to perform a Sequential Scan (Seq Scan): it must read every single 8KB/16KB data page from disk into the Buffer Pool, inspecting every record one by one in $O(N)$ time.',
    sqlCode: `-- NO INDEX ON customer_id: FORCES FULL HEAP SCAN\nSELECT order_id, customer_id, order_date, total_amount\nFROM OrdersStorage\nWHERE customer_id = 501;`,
    explanationPoints: [
      'Executes as a Sequential Scan across all 5 disk pages (0x1A through 0x3A).',
      'I/O Cost: 5 page reads to find only 3 matching records.',
      'Time complexity is $O(N)$, which degrades linearly as the table grows to millions of rows.',
      'Flushes other useful cache pages out of the Buffer Pool (cache pollution).'
    ],
    gotcha: 'THE FULL SCAN COST CLIFF: In a 100-million row table, a sequential scan reads 400 GB of disk data and takes several minutes. An index seek reads 4 pages (64 KB) in 0.2 milliseconds.',
    actionPrompt: 'Simulating sequential scan across all disk pages to find customer_id = 501:',
    transform: (rows) => rows.map(r => {
      const match = r.customer_id === 501;
      return {
        order_id: r.order_id,
        customer_id: r.customer_id,
        total_amount: `$${r.total_amount.toFixed(2)}`,
        page_location: r.page_id,
        scan_cost: '1 PAGE READ (Full Inspection)',
        _status: match ? 'passed' : 'rejected',
        _label: match ? 'MATCH (KEEP ROW)' : 'DISCARDED TUPLE'
      };
    }),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Full Table Scan Sequential Conveyor -->
        <g transform="translate(30, 20)">
          <text x="0" y="16" fill="#ef4444" font-family="monospace" font-size="9.5" font-weight="700">&cross; FULL HEAP SCAN (O(N) UNORDERED SEARCH)</text>

          <g transform="translate(10, 35)">
            <!-- 5 Disk Pages In Linear Sequence -->
            <g transform="translate(0, 0)">
              <rect width="120" height="75" fill="#18181b" stroke="#10b981" stroke-width="1.5" rx="3"/>
              <text x="10" y="20" fill="#10b981" font-family="monospace" font-size="8" font-weight="700">PAGE 0x1A</text>
              <text x="10" y="38" fill="#ffffff" font-family="monospace" font-size="7.5">#1001 (501) &check;</text>
              <text x="10" y="52" fill="#71717a" font-family="monospace" font-size="7.5">#1002 (502) &cross;</text>
              <text x="10" y="68" fill="#10b981" font-family="monospace" font-size="7">Read Page: 8KB</text>
            </g>

            <path d="M 125 38 L 140 38" stroke="#ef4444" stroke-width="2"/>

            <g transform="translate(145, 0)">
              <rect width="120" height="75" fill="#18181b" stroke="#10b981" stroke-width="1.5" rx="3"/>
              <text x="10" y="20" fill="#10b981" font-family="monospace" font-size="8" font-weight="700">PAGE 0x1B</text>
              <text x="10" y="38" fill="#ffffff" font-family="monospace" font-size="7.5">#1003 (501) &check;</text>
              <text x="10" y="52" fill="#71717a" font-family="monospace" font-size="7.5">#1004 (503) &cross;</text>
              <text x="10" y="68" fill="#10b981" font-family="monospace" font-size="7">Read Page: 8KB</text>
            </g>

            <path d="M 270 38 L 285 38" stroke="#ef4444" stroke-width="2"/>

            <g transform="translate(290, 0)">
              <rect width="120" height="75" fill="#18181b" stroke="#ef4444" rx="3"/>
              <text x="10" y="20" fill="#a1a1aa" font-family="monospace" font-size="8" font-weight="700">PAGE 0x2A</text>
              <text x="10" y="38" fill="#71717a" font-family="monospace" font-size="7.5">#1005 (504) &cross;</text>
              <text x="10" y="52" fill="#71717a" font-family="monospace" font-size="7.5">#1006 (502) &cross;</text>
              <text x="10" y="68" fill="#ef4444" font-family="monospace" font-size="7">Wasted I/O (0 hits)</text>
            </g>

            <path d="M 415 38 L 430 38" stroke="#ef4444" stroke-width="2"/>

            <g transform="translate(435, 0)">
              <rect width="120" height="75" fill="#18181b" stroke="#10b981" stroke-width="1.5" rx="3"/>
              <text x="10" y="20" fill="#10b981" font-family="monospace" font-size="8" font-weight="700">PAGE 0x2B</text>
              <text x="10" y="38" fill="#71717a" font-family="monospace" font-size="7.5">#1007 (505) &cross;</text>
              <text x="10" y="52" fill="#ffffff" font-family="monospace" font-size="7.5">#1008 (501) &check;</text>
              <text x="10" y="68" fill="#10b981" font-family="monospace" font-size="7">Read Page: 8KB</text>
            </g>

            <path d="M 560 38 L 575 38" stroke="#ef4444" stroke-width="2"/>

            <g transform="translate(580, 0)">
              <rect width="120" height="75" fill="#18181b" stroke="#ef4444" rx="3"/>
              <text x="10" y="20" fill="#a1a1aa" font-family="monospace" font-size="8" font-weight="700">PAGE 0x3A</text>
              <text x="10" y="38" fill="#71717a" font-family="monospace" font-size="7.5">#1009 (506) &cross;</text>
              <text x="10" y="52" fill="#71717a" font-family="monospace" font-size="7.5">#1010 (503) &cross;</text>
              <text x="10" y="68" fill="#ef4444" font-family="monospace" font-size="7">Wasted I/O (0 hits)</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 02: B+ Tree Index Architecture & Seeks
  // ---------------------------------------------------------------------------
  {
    stepIndex: 2,
    id: 'index_b_tree_seek',
    keyword: 'B+ TREE SEEK',
    title: 'Step 02: B+ Tree Index Architecture (Root to Leaf Traversal)',
    pillClass: 'pill-index',
    conceptHeading: 'Logarithmic Seeks: Reaching Any Tuple in 3 to 4 Page Accesses',
    conceptText: 'A B+ Tree index is a balanced search tree where all data pointers live exclusively on leaf pages, and leaf pages are linked sequentially via a bidirectional doubly-linked list. When querying an indexed column, the database performs an Index Seek: navigating Root -> Intermediate Node -> Leaf Page in $O(\log N)$ steps.',
    sqlCode: `-- WITH INDEX idx_orders_customer (customer_id):\nCREATE INDEX idx_orders_customer ON OrdersStorage (customer_id);\n\nSELECT order_id, customer_id, total_amount\nFROM OrdersStorage\nWHERE customer_id = 501;`,
    explanationPoints: [
      'Root Node: Contains key ranges (e.g. [501-503] &rarr; Branch A, [504-506] &rarr; Branch B).',
      'Intermediate Branch: Guides the binary search directly to target leaf page.',
      'Leaf Page: Contains sorted keys and row pointers (RID / Primary Key values).',
      'Total disk page reads drops from N pages down to height of tree (typically 3 pages for millions of rows).'
    ],
    gotcha: 'INDEXES ARE NOT FREE: Every INSERT, UPDATE, and DELETE statement must update the B+ Tree structure, triggering page splits and rebalancing. Too many indexes crush write throughput!',
    actionPrompt: 'Navigating B+ Tree search tree directly to customer_id = 501:',
    transform: (rows) => rows.filter(r => r.customer_id === 501).map(r => ({
      order_id: r.order_id,
      customer_id: r.customer_id,
      total_amount: `$${r.total_amount.toFixed(2)}`,
      seek_path: 'Root (0x01) -> Branch (0x04) -> Leaf (0x12)',
      io_cost: '3 Pages Total (O(log N))',
      _status: 'passed',
      _label: 'INDEX SEEK HIT'
    })),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- B+ Tree Hierarchy -->
        <g transform="translate(40, 15)">
          <!-- Root Node (Top) -->
          <g transform="translate(270, 0)">
            <rect width="180" height="30" fill="#18181b" stroke="#10b981" stroke-width="1.5" rx="3"/>
            <text x="90" y="19" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="middle">ROOT PAGE: [ &le; 503 | &gt; 503 ]</text>
          </g>

          <!-- Branch Lines -->
          <path d="M 310 32 L 190 60" stroke="#10b981" stroke-width="1.5"/>
          <path d="M 410 32 L 530 60" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="3,3"/>

          <!-- Intermediate Nodes -->
          <g transform="translate(100, 60)">
            <rect width="180" height="30" fill="#18181b" stroke="#10b981" stroke-width="1.5" rx="3"/>
            <text x="90" y="19" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="middle">BRANCH: [ 501 | 502 | 503 ]</text>
          </g>

          <g transform="translate(440, 60)">
            <rect width="180" height="30" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="90" y="19" fill="#71717a" font-family="monospace" font-size="8.5" text-anchor="middle">BRANCH: [ 504 | 505 | 506 ]</text>
          </g>

          <!-- Branch to Leaf Lines -->
          <path d="M 190 92 L 100 120" stroke="#10b981" stroke-width="1.5"/>
          <path d="M 190 92 L 280 120" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="3,3"/>

          <!-- Leaf Level (Doubly-Linked List) -->
          <g transform="translate(10, 120)">
            <rect width="180" height="35" fill="#064e3b" stroke="#059669" rx="3"/>
            <text x="90" y="16" fill="#6ee7b7" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">LEAF 0x12: Keys 501</text>
            <text x="90" y="28" fill="#a7f3d0" font-family="monospace" font-size="7" text-anchor="middle">Ptrs &rarr; #1001, #1003, #1008</text>
          </g>

          <!-- Doubly linked arrow -->
          <g transform="translate(195, 135)">
            <path d="M 0 0 L 15 0" stroke="#10b981" stroke-width="1.5"/>
            <path d="M 15 5 L 0 5" stroke="#10b981" stroke-width="1.5"/>
          </g>

          <g transform="translate(215, 120)">
            <rect width="180" height="35" fill="#18181b" stroke="#3f3f46" rx="3"/>
            <text x="90" y="16" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">LEAF 0x13: Keys 502, 503</text>
            <text x="90" y="28" fill="#71717a" font-family="monospace" font-size="7" text-anchor="middle">Ptrs &rarr; #1002, #1004, #1006</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 03: Clustered vs Secondary Indexes
  // ---------------------------------------------------------------------------
  {
    stepIndex: 3,
    id: 'index_clustered_secondary',
    keyword: 'CLUSTERED vs SECONDARY',
    title: 'Step 03: Clustered Indexes vs Secondary Lookups',
    pillClass: 'pill-index',
    conceptHeading: 'The Table IS the Index: Leaf Data Pages vs Pointer Indirection',
    conceptText: 'In InnoDB (MySQL) and SQL Server, a table can have exactly ONE Clustered Index (almost always the Primary Key). In a clustered index, the leaf nodes DO NOT contain pointers—they contain the actual row data itself! Secondary indexes, by contrast, only store the indexed column and the clustered key (or RID). To read other columns, the engine must perform a second lookup.',
    sqlCode: `-- 1. CLUSTERED INDEX SEEK (Primary Key: order_id = 1001)\n-- Data is found immediately on leaf node! 1 seek.\nSELECT * FROM OrdersStorage WHERE order_id = 1001;\n\n-- 2. SECONDARY INDEX SEEK + KEY LOOKUP (customer_id = 501)\n-- Step A: Seek idx_customer (gets order_id 1001)\n-- Step B: Key Lookup into Clustered Index to retrieve status & total_amount\nSELECT * FROM OrdersStorage WHERE customer_id = 501;`,
    explanationPoints: [
      'Clustered Index: Table is physically ordered by this key. Leaf nodes = Actual Data.',
      'Secondary Index: Leaf nodes store `(customer_id, PK order_id)`.',
      'Key Lookup / Bookmark Lookup: When query asks for columns NOT in the secondary index, the engine must make a trip to the clustered index.',
      'If the lookup returns too many rows (e.g. > 15-20% of the table), the optimizer will abandon the index and fall back to a full table scan!'
    ],
    gotcha: 'THE SECONDARY LOOKUP CLIFF: If an index seek matches 50,000 rows, performing 50,000 random I/O Key Lookups into the clustered index is MUCH slower than sequentially scanning the entire table! The optimizer knows this and switches to Seq Scan.',
    actionPrompt: 'Tracing the two-step Key Lookup process when accessing secondary index:',
    transform: (rows) => rows.filter(r => r.customer_id === 501).map(r => ({
      order_id: r.order_id,
      customer_id: r.customer_id,
      step_1_sec_index: `Found PK: ${r.order_id}`,
      step_2_key_lookup: `Retrieved total: $${r.total_amount.toFixed(2)}`,
      total_hops: '2 Seeks (Secondary + Clustered)',
      _status: 'passed',
      _label: 'KEY LOOKUP REQUIRED'
    })),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Two-tier lookup visualization -->
        <g transform="translate(30, 20)">
          <!-- Tier 1: Secondary Index -->
          <g transform="translate(0, 0)">
            <rect width="320" height="140" rx="4" fill="#121318" stroke="#3b82f6"/>
            <rect width="320" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#3b82f6" font-family="monospace" font-size="8.5" font-weight="700">1. SECONDARY INDEX (idx_customer)</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">Leaf stores: [ customer_id, PK order_id ]</text>
              <rect y="22" width="295" height="24" fill="#18181b" stroke="#3b82f6" rx="2"/>
              <text x="10" y="38" fill="#ffffff" font-family="monospace" font-size="8">Key: 501 &rarr; PK: #1001, #1003, #1008</text>
              <text x="0" y="65" fill="#f59e0b" font-family="monospace" font-size="8">Status and total_amount NOT found here!</text>
              <text x="0" y="85" fill="#3b82f6" font-family="monospace" font-size="8">&rArr; Must do Key Lookup into Clustered Tree</text>
            </g>
          </g>

          <!-- Lookup Bridge Arrow -->
          <g transform="translate(330, 70)">
            <path d="M 0 0 L 45 0" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,2"/>
            <polygon points="45,-4 55,0 45,4" fill="#f59e0b"/>
            <text x="25" y="-10" fill="#f59e0b" font-family="monospace" font-size="7.5" text-anchor="middle">Key Lookup</text>
          </g>

          <!-- Tier 2: Clustered Index -->
          <g transform="translate(390, 0)">
            <rect width="340" height="140" rx="4" fill="#121318" stroke="#10b981"/>
            <rect width="340" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">2. CLUSTERED INDEX (Table Data)</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">Leaf stores: ALL COLUMNS (Table itself)</text>
              <rect y="22" width="315" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="10" y="38" fill="#6ee7b7" font-family="monospace" font-size="8">Seek PK 1001 &rarr; amount=$450, status=DELIVERED</text>
              <text x="0" y="65" fill="#10b981" font-family="monospace" font-size="8">Complete tuple retrieved into RAM buffer</text>
              <text x="0" y="85" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Random I/O incurred per matched row &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 04: SARGable vs Non-SARGable Predicates
  // ---------------------------------------------------------------------------
  {
    stepIndex: 4,
    id: 'index_sargable',
    keyword: 'SARGABLE',
    title: 'Step 04: SARGable vs Non-SARGable Query Predicates',
    pillClass: 'pill-index',
    conceptHeading: 'Why Wrapping a Column in a Function Kills Index Seeks Instantly',
    conceptText: 'SARGable stands for "Search Argument Able". An index is sorted by the raw column values, NOT by the result of a function applied to the column. If you write `WHERE YEAR(order_date) = 2024` or `WHERE total_amount + 50 > 1000`, the engine cannot search the sorted tree—it must calculate the function on every single row, degenerating into a full scan.',
    sqlCode: `-- 1. NON-SARGABLE (DEGENERATES INTO FULL TABLE SCAN):\n-- Index on order_date is completely bypassed!\nSELECT * FROM OrdersStorage\nWHERE YEAR(order_date) = 2024;\n\n-- 2. SARGABLE REWRITE (FAST B+ TREE RANGE SEEK):\n-- Preserves raw column on left side; bounds on right side\nSELECT * FROM OrdersStorage\nWHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';`,
    explanationPoints: [
      'Non-SARGable: `YEAR(order_date) = 2024` -> CPU must invoke function on every row.',
      'SARGable: `order_date >= \'2024-01-01\' AND ...` -> Performs a binary seek to Jan 1st, then scans the leaf chain.',
      'Common non-SARGable traps: `WHERE status LIKE \'%SHIPPED\'` (leading wildcard), `WHERE UPPER(email) = ...`, `WHERE price * 1.1 > 100`.',
      'Fix: Always isolate the raw indexed column alone on one side of the operator.'
    ],
    gotcha: 'THE LEADING WILDCARD TRAP: `LIKE \'PREFIX%\'` is SARGable (binary seeks the prefix string). `LIKE \'%SUFFIX\'` is NEVER SARGable because the B+ Tree is sorted left-to-right.',
    actionPrompt: 'Rewriting non-SARGable function call into a high-speed range seek:',
    transform: (rows) => rows.filter(r => r.order_date.startsWith('2024')).map(r => ({
      order_id: r.order_id,
      order_date: r.order_date,
      non_sargable_plan: 'Table Scan (Function evaluated on all rows)',
      sargable_plan: 'Index Range Seek (Between 2024-01-01 and 2024-12-31)',
      _status: 'passed',
      _label: 'SARGABLE RANGE SEEK'
    })),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- SARGable vs Non-SARGable visual proof -->
        <g transform="translate(30, 20)">
          <!-- Left: Non-SARGable -->
          <g transform="translate(0, 0)">
            <rect width="340" height="140" rx="4" fill="#121318" stroke="#ef4444" stroke-width="1.2"/>
            <rect width="340" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ef4444" font-family="monospace" font-size="8.5" font-weight="700">&cross; NON-SARGABLE: YEAR(order_date) = 2024</text>
            <g transform="translate(12, 34)">
              <rect y="10" width="315" height="25" fill="#1c1917" stroke="#7f1d1d" rx="2"/>
              <text x="8" y="26" fill="#fca5a5" font-family="monospace" font-size="8">YEAR('2024-01-15') &rarr; Invokes func per row</text>
              <text x="0" y="55" fill="#ef4444" font-family="monospace" font-size="8">Index is useless: DB cannot binary search</text>
              <text x="0" y="70" fill="#ef4444" font-family="monospace" font-size="8">&rArr; Full Table Scan (100% CPU burn)</text>
              <text x="0" y="90" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Ruinous latency on large datasets &bull;</text>
            </g>
          </g>

          <!-- Right: SARGable -->
          <g transform="translate(370, 0)">
            <rect width="350" height="140" rx="4" fill="#121318" stroke="#10b981" stroke-width="1.2"/>
            <rect width="350" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">&check; SARGABLE: order_date &gt;= '2024-01-01'</text>
            <g transform="translate(12, 34)">
              <rect y="10" width="325" height="25" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="8" y="26" fill="#6ee7b7" font-family="monospace" font-size="8">Direct B+ Tree Seek to '2024-01-01'</text>
              <text x="0" y="55" fill="#10b981" font-family="monospace" font-size="8">Traverses contiguous leaf pages in range</text>
              <text x="0" y="70" fill="#10b981" font-family="monospace" font-size="8">&rArr; Sub-millisecond Index Range Seek</text>
              <text x="0" y="90" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Zero unneeded pages touched &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 05: The Leftmost Prefix Rule
  // ---------------------------------------------------------------------------
  {
    stepIndex: 5,
    id: 'index_leftmost_prefix',
    keyword: 'COMPOSITE INDEX',
    title: 'Step 05: Composite Indexes & The Leftmost Prefix Rule',
    pillClass: 'pill-index',
    conceptHeading: 'A Multi-Column Index Is Like a Phone Book: Sorted by Last Name, then First Name',
    conceptText: 'When an index covers multiple columns (e.g. `INDEX(customer_id, status, order_date)`), the B+ Tree is sorted strictly by column 1, then within column 1 by column 2, then by column 3. Under the Leftmost Prefix Rule, a query CANNOT use the index unless it includes the leading column (`customer_id`).',
    sqlCode: `-- COMPOSITE INDEX: (customer_id, status, order_date)\nCREATE INDEX idx_cust_status_date ON OrdersStorage (customer_id, status, order_date);\n\n-- USES INDEX FULLY (All 3 columns matched):\nSELECT * FROM OrdersStorage WHERE customer_id = 501 AND status = 'DELIVERED';\n\n-- CANNOT USE INDEX (Missing leading customer_id &rarr; FULL SCAN):\nSELECT * FROM OrdersStorage WHERE status = 'DELIVERED';`,
    explanationPoints: [
      'Valid seeks: `(col1)`, `(col1, col2)`, `(col1, col2, col3)`.',
      'Invalid seeks: `(col2)`, `(col3)`, `(col2, col3)` -> Cannot use index seek!',
      'Skip Scan: Some engines (PostgreSQL, Oracle, MySQL 8.0+) can perform an Index Skip Scan if cardinality of col1 is very small, but it is much slower than a direct seek.',
      'Design rule: Always place the most selective or equality-filtered column first.'
    ],
    gotcha: 'THE RANGE BOUNDARY CUTOFF: If you have `INDEX(a, b, c)` and your query uses `WHERE a = 1 AND b > 10 AND c = 5`, the engine can only use the index for `a` and `b`. The range condition on `b` prevents the index from being used for `c`!',
    actionPrompt: 'Testing query patterns against composite index (customer_id, status):',
    transform: () => [
      { predicate: 'WHERE customer_id = 501 AND status = "DELIVERED"', leftmost_status: 'VALID (Prefix Matched)', plan: 'Index Seek (O(log N))', _status: 'passed', _label: 'FAST SEEK' },
      { predicate: 'WHERE customer_id = 501', leftmost_status: 'VALID (Leading Col)', plan: 'Index Seek (O(log N))', _status: 'passed', _label: 'FAST SEEK' },
      { predicate: 'WHERE status = "DELIVERED"', leftmost_status: 'INVALID (Skipped Lead)', plan: 'Full Table Scan (O(N))', _status: 'rejected', _label: 'SCAN FALLBACK' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Composite Index Ordering Analogy -->
        <g transform="translate(30, 20)">
          <text x="0" y="16" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">COMPOSITE SORT HIERARCHY: INDEX(customer_id, status)</text>

          <g transform="translate(10, 35)">
            <!-- Group 501 -->
            <rect x="0" y="0" width="220" height="85" fill="#121318" stroke="#10b981" rx="3"/>
            <text x="12" y="20" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">PRIMARY SORT: customer_id = 501</text>
            <g transform="translate(12, 28)">
              <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">&rarr; DELIVERED (#1001, #1003)</text>
              <text x="0" y="30" fill="#a1a1aa" font-family="monospace" font-size="8">&rarr; SHIPPED   (#1008)</text>
              <text x="0" y="48" fill="#10b981" font-family="monospace" font-size="7.5">Contiguous block in leaf tree</text>
            </g>

            <!-- Group 502 -->
            <rect x="240" y="0" width="220" height="85" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="20" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">PRIMARY SORT: customer_id = 502</text>
            <g transform="translate(12, 28)">
              <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">&rarr; PROCESSING (#1006)</text>
              <text x="0" y="30" fill="#a1a1aa" font-family="monospace" font-size="8">&rarr; SHIPPED    (#1002)</text>
              <text x="0" y="48" fill="#71717a" font-family="monospace" font-size="7.5">Contiguous block in leaf tree</text>
            </g>

            <!-- Status-only query dilemma -->
            <g transform="translate(480, 5)">
              <rect width="230" height="75" fill="#1c1917" stroke="#7f1d1d" rx="3"/>
              <text x="12" y="20" fill="#ef4444" font-family="monospace" font-size="8" font-weight="700">QUERY: WHERE status = 'DELIVERED'</text>
              <text x="12" y="38" fill="#fca5a5" font-family="monospace" font-size="7.5">Status 'DELIVERED' is scattered</text>
              <text x="12" y="52" fill="#fca5a5" font-family="monospace" font-size="7.5">across EVERY customer_id cluster!</text>
              <text x="12" y="68" fill="#ef4444" font-family="monospace" font-size="7">&rArr; Cannot seek; must scan whole tree.</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 06: Covering Index & Index-Only Scans
  // ---------------------------------------------------------------------------
  {
    stepIndex: 6,
    id: 'index_covering',
    keyword: 'COVERING INDEX',
    title: 'Step 06: Covering Indexes & Index-Only Scans',
    pillClass: 'pill-index',
    conceptHeading: 'Zero Heap Access: Answering the Entire Query Directly from the B+ Tree Leaf',
    conceptText: 'A Covering Index is an index that contains every single column requested by the query (both the WHERE filtering columns and the SELECT projection columns). When a query is covered, the engine NEVER touches the heap table data pages at all! It executes an Index-Only Scan (`Using index` in MySQL), yielding the highest possible throughput.',
    sqlCode: `-- COVERING INDEX ON (customer_id, total_amount):\nCREATE INDEX idx_cust_amount ON OrdersStorage (customer_id, total_amount);\n\n-- INDEX-ONLY SCAN (NEVER TOUCHES HEAP DATA PAGES!):\nSELECT customer_id, SUM(total_amount)\nFROM OrdersStorage\nWHERE customer_id = 501\nGROUP BY customer_id;`,
    explanationPoints: [
      'WHERE uses customer_id &rarr; Seeks B+ Tree.',
      'SELECT needs total_amount &rarr; Found directly in leaf node!',
      'Zero Key Lookups / Zero Heap Table I/O.',
      'PostgreSQL calls this "Index Only Scan"; MySQL calls it "Using index" in Extra.',
      'SQL Server and PostgreSQL support the `INCLUDE (col)` clause to attach non-key columns to leaf nodes without inflating tree branching factor.'
    ],
    gotcha: 'THE SELECT * DESTROYER: Writing `SELECT *` guarantees that no secondary index will ever be covering, forcing catastrophic Key Lookups for every row. Always explicitly specify needed columns!',
    actionPrompt: 'Executing aggregation query satisfied 100% within the index leaf layer:',
    transform: () => [
      { customer_id: 501, orders_found: 3, total_spend: '$2,320.00', heap_reads: 0, index_reads: 2, plan_verdict: 'INDEX-ONLY SCAN (Zero Heap Access)', _status: 'passed', _label: '100% COVERED' }
    ],
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Covering Index Zero Heap bypass -->
        <g transform="translate(30, 20)">
          <!-- Left: Secondary Index Leaf -->
          <rect width="330" height="140" rx="4" fill="#121318" stroke="#10b981" stroke-width="1.5"/>
          <rect width="330" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">INDEX: (customer_id, total_amount)</text>
          <g transform="translate(12, 34)">
            <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">Leaf node holds both columns!</text>
            <rect y="22" width="305" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
            <text x="10" y="38" fill="#6ee7b7" font-family="monospace" font-size="8">501 &rarr; $450.00 | $890.00 | $980.00</text>
            <text x="0" y="66" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">&check; Satisfies SELECT and WHERE 100%</text>
            <text x="0" y="86" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Data piped straight to client RAM &bull;</text>
          </g>

          <!-- Middle Severed Arrow -->
          <g transform="translate(350, 70)">
            <path d="M 0 0 L 40 0" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3,3"/>
            <line x1="15" y1="-8" x2="25" y2="8" stroke="#ef4444" stroke-width="2"/>
            <line x1="25" y1="-8" x2="15" y2="8" stroke="#ef4444" stroke-width="2"/>
            <text x="20" y="-12" fill="#ef4444" font-family="monospace" font-size="7" text-anchor="middle">Bypassed!</text>
          </g>

          <!-- Right: Untouched Heap Disk Storage -->
          <g transform="translate(410, 0)">
            <rect width="320" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
            <rect width="320" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#71717a" font-family="monospace" font-size="8.5" font-weight="700">HEAP TABLE ON DISK (Untouched)</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">Page 0x1A, 0x1B, 0x2A, 0x2B, 0x3A</text>
              <rect y="22" width="295" height="24" fill="#18181b" rx="2"/>
              <text x="10" y="38" fill="#71717a" font-family="monospace" font-size="8">ZERO DISK I/O EXECUTED</text>
              <text x="0" y="66" fill="#10b981" font-family="monospace" font-size="8">Saved: 5 physical page reads</text>
              <text x="0" y="86" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Massive throughput multiplier &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 07: Execution Plan Anatomy (EXPLAIN ANALYZE)
  // ---------------------------------------------------------------------------
  {
    stepIndex: 7,
    id: 'index_explain_analyze',
    keyword: 'EXPLAIN ANALYZE',
    title: 'Step 07: Reading Physical Execution Plans (EXPLAIN ANALYZE)',
    pillClass: 'pill-index',
    conceptHeading: 'Decoding the Cost Model: Estimates vs Real Runtime Statistics',
    conceptText: 'EXPLAIN displays the optimizer\'s mathematical model estimation (based on table statistics / histograms). EXPLAIN ANALYZE actually executes the query on the database engine, instrumenting every operator with exact execution metrics: startup cost, total cost, actual rows returned, iteration loops, and buffer pool cache hit ratios.',
    sqlCode: `EXPLAIN ANALYZE\nSELECT customer_id, COUNT(*), SUM(total_amount)\nFROM OrdersStorage\nWHERE customer_id = 501\nGROUP BY customer_id;`,
    explanationPoints: [
      '`cost=0.15..8.20`: 0.15 is startup cost (time to return 1st row); 8.20 is total cost in arbitrary disk page fetch units.',
      '`rows=3 width=16`: Optimizer predicted 3 rows of 16 bytes each.',
      '`actual time=0.021..0.035 rows=3 loops=1`: Actual physical execution time in milliseconds.',
      '`Buffers: shared hit=2 read=0`: All 2 pages were already in RAM buffer pool (zero physical disk reads!).'
    ],
    gotcha: 'EXPLAIN ANALYZE MUTATES DATA: On INSERT, UPDATE, or DELETE statements, running EXPLAIN ANALYZE will actually modify your database data! Always wrap it in a transaction with ROLLBACK during investigation.',
    actionPrompt: 'Dissecting real EXPLAIN ANALYZE physical tree output metrics:',
    transform: () => [
      { node_type: 'Aggregate', estimated_rows: 1, actual_rows: 1, actual_time_ms: '0.042 ms', buffer_hits: '2 hits', verdict: 'OPTIMAL (HashAggregate in RAM)' },
      { node_type: 'Bitmap Heap Scan', estimated_rows: 3, actual_rows: 3, actual_time_ms: '0.028 ms', buffer_hits: '2 hits', verdict: 'ESTIMATE MATCHES REALITY (3 rows)' },
      { node_type: 'Bitmap Index Scan', estimated_rows: 3, actual_rows: 3, actual_time_ms: '0.012 ms', buffer_hits: '1 hit', verdict: 'idx_orders_customer SEEK HIT' }
    ].map(r => ({ ...r, _status: 'passed', _label: 'PLAN VERIFIED' })),
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- EXPLAIN tree visualizer -->
        <g transform="translate(30, 20)">
          <!-- Top: Aggregate -->
          <g transform="translate(200, 0)">
            <rect width="340" height="32" fill="#18181b" stroke="#10b981" rx="3"/>
            <text x="15" y="20" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">HashAggregate (cost=8.20..8.21 rows=1 actual=0.042ms)</text>
          </g>

          <path d="M 370 34 L 370 52" stroke="#10b981" stroke-width="1.5"/>

          <!-- Middle: Bitmap Heap Scan -->
          <g transform="translate(200, 54)">
            <rect width="340" height="32" fill="#18181b" stroke="#10b981" rx="3"/>
            <text x="15" y="20" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">&rarr; Bitmap Heap Scan (cost=4.15..8.17 rows=3 actual=0.028ms)</text>
          </g>

          <path d="M 370 88 L 370 106" stroke="#10b981" stroke-width="1.5"/>

          <!-- Bottom: Bitmap Index Scan -->
          <g transform="translate(200, 108)">
            <rect width="340" height="32" fill="#064e3b" stroke="#059669" rx="3"/>
            <text x="15" y="20" fill="#6ee7b7" font-family="monospace" font-size="8.5" font-weight="700">&rarr; Bitmap Index Scan on idx_orders_customer (actual=0.012ms)</text>
          </g>

          <!-- Annotations Callouts on Left and Right -->
          <g transform="translate(0, 30)">
            <rect width="180" height="85" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="10" y="18" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">READING THE PLAN:</text>
            <text x="10" y="34" fill="#a1a1aa" font-family="monospace" font-size="7.5">&bull; Read inside-out / bottom-up</text>
            <text x="10" y="48" fill="#a1a1aa" font-family="monospace" font-size="7.5">&bull; Innermost executes first</text>
            <text x="10" y="64" fill="#10b981" font-family="monospace" font-size="7.5">&bull; Index Scan seeds bitmap</text>
            <text x="10" y="78" fill="#10b981" font-family="monospace" font-size="7.5">&bull; Heap Scan retrieves tuples</text>
          </g>

          <g transform="translate(560, 30)">
            <rect width="180" height="85" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="10" y="18" fill="#ffffff" font-family="monospace" font-size="8" font-weight="700">CACHE STATS:</text>
            <text x="10" y="34" fill="#10b981" font-family="monospace" font-size="7.5">Buffers: shared hit=2</text>
            <text x="10" y="48" fill="#10b981" font-family="monospace" font-size="7.5">Disk reads = 0</text>
            <text x="10" y="64" fill="#a1a1aa" font-family="monospace" font-size="7.5">100% RAM hit ratio</text>
            <text x="10" y="78" fill="#71717a" font-family="monospace" font-size="7.5">Total duration: 0.042 ms</text>
          </g>
        </g>
      </svg>
    `
  }
];
