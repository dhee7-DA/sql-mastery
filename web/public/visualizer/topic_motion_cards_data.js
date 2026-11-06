/**
 * SQL MASTERY - TOPIC MOTION CARDS DATA CATALOG
 * ------------------------------------------------------------------------
 * 12 Enterprise curriculum topics across 4 physical and relational domains,
 * equipped with live 60fps animated SVG micro-simulations, dual-faced
 * concept vs production trap breakdowns, and 1-click execution bridges.
 */

(function(window) {
  'use strict';

  const TOPIC_MOTION_CARDS_DATA = [
    // -------------------------------------------------------------------------
    // DOMAIN A: PHYSICAL ENGINE & STORAGE ARCHITECTURE
    // -------------------------------------------------------------------------
    {
      id: 'topic_01_storage',
      number: 'TOPIC 01',
      domain: 'storage',
      domainLabel: 'Storage & Hardware',
      title: 'Physical NVMe DMA & Buffer Pool Allocation',
      subtitle: 'Zero-Copy OS Bypasses & 8KB Page Eviction (LRU-2)',
      difficulty: 'L4 Core',
      difficultyBadge: 'core',
      estimatedTime: '8 min',
      concepts: [
        'Storage engine transfers 8KB page frames directly from NVMe SSD to RAM via Direct Memory Access (DMA).',
        'Buffer pool manages dirty pages, clock-sweep replacement, and pinned memory locks.',
        'Sequential scans trigger aggressive asynchronous page prefetching; random seeks wait on disk I/O.'
      ],
      productionTrap: {
        title: 'The Buffer Pool Thrashing Trap',
        gotcha: 'Running an unindexed SELECT * across 10 million rows evicts hot working-set pages from the buffer cache, degrading throughput for all concurrent API queries.',
        faultySql: '-- Unindexed sequential table scan evicts cache\nSELECT * FROM bank_ledger\nWHERE status = \'SETTLED\';',
        fixedSql: '-- Covered seek reads only 4 buffer pages\nSELECT txn_id, amount, created_at\nFROM bank_ledger\nWHERE status = \'SETTLED\'\nLIMIT 50;',
        speedup: '98.2% Buffer Hit Recovery'
      },
      studioProblemId: 'vol_1_storage_prob_1',
      profilerPresetId: 'unindexed_10m_scan',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- NVMe Disk Box -->
          <rect x="20" y="25" width="85" height="90" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <text x="62" y="44" fill="#a1a1aa" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">NVMe DISK</text>
          <rect x="30" y="55" width="65" height="12" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.08)"/>
          <rect x="30" y="73" width="65" height="12" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.08)"/>
          <rect x="30" y="91" width="65" height="12" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.08)"/>
          <!-- DMA Bus Channels -->
          <path d="M 105 70 L 210 70" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4 4" stroke-width="1.5"/>
          <circle cx="120" cy="70" r="3.5" fill="#10b981">
            <animate attributeName="cx" from="105" to="210" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="160" cy="70" r="3.5" fill="#38bdf8">
            <animate attributeName="cx" from="105" to="210" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
          </circle>
          <text x="157" y="60" fill="#71717a" font-size="8.5" font-family="monospace" text-anchor="middle">DMA BUS</text>
          <!-- Buffer Pool Box -->
          <rect x="210" y="25" width="130" height="90" rx="6" fill="#121318" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
          <text x="275" y="44" fill="#10b981" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">BUFFER POOL (RAM)</text>
          <g>
            <rect x="220" y="55" width="52" height="24" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.1)"/>
            <text x="246" y="70" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">PAGE 0x1</text>
            <rect x="278" y="55" width="52" height="24" rx="3" fill="#18181b" stroke="rgba(16,185,129,0.4)"/>
            <text x="304" y="70" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">HIT 100%</text>
            <rect x="220" y="85" width="52" height="22" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.1)"/>
            <text x="246" y="99" fill="#a1a1aa" font-size="8" font-family="monospace" text-anchor="middle">PAGE 0x2</text>
            <rect x="278" y="85" width="52" height="22" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.1)"/>
            <text x="304" y="99" fill="#a1a1aa" font-size="8" font-family="monospace" text-anchor="middle">PAGE 0x3</text>
          </g>
        </svg>
      `
    },

    {
      id: 'topic_02_indexing',
      number: 'TOPIC 02',
      domain: 'storage',
      domainLabel: 'Storage & Hardware',
      title: 'B+Tree Index Seeks & SARGability Diagnostics',
      subtitle: 'O(log N) Root-to-Leaf Traversal vs O(N) Table Scans',
      difficulty: 'L5 FAANG',
      difficultyBadge: 'advanced',
      estimatedTime: '12 min',
      concepts: [
        'B+Tree leaf pages form a doubly-linked chain supporting fast equality seeks and sequential range scans.',
        'Predicate SARGability: Functions, math operations, and leading wildcards on columns blind the optimizer.',
        'The ESR Rule (Equality, Sort, Range) dictates the exact column ordering for composite indexes.'
      ],
      productionTrap: {
        title: 'The Non-SARGable Function Call Trap',
        gotcha: 'Wrapping a column in a function like DATE(created_at) forces the engine to evaluate every single row via CPU compute instead of probing the B+Tree root node.',
        faultySql: '-- Blind to B+Tree index seek\nSELECT order_id FROM orders\nWHERE DATE(order_date) = \'2026-11-01\';',
        fixedSql: '-- SARGable range probe\nSELECT order_id FROM orders\nWHERE order_date >= \'2026-11-01 00:00:00\'\n  AND order_date <  \'2026-11-02 00:00:00\';',
        speedup: '96.4% CPU Cycle Reduction'
      },
      studioProblemId: 'vol_1_storage_prob_2',
      profilerPresetId: 'unindexed_10m_scan',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Root Node -->
          <rect x="140" y="16" width="80" height="26" rx="4" fill="#121318" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <text x="180" y="32" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">ROOT [50 | 100]</text>
          <!-- Branch Lines -->
          <line x1="160" y1="42" x2="100" y2="64" stroke="rgba(56,189,248,0.5)" stroke-width="1.5"/>
          <line x1="200" y1="42" x2="260" y2="64" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <!-- Internal Nodes -->
          <rect x="65" y="64" width="75" height="24" rx="4" fill="#121318" stroke="rgba(56,189,248,0.4)"/>
          <text x="102" y="79" fill="#ffffff" font-size="8.5" font-family="monospace" text-anchor="middle">PAGE [20 | 40]</text>
          <rect x="220" y="64" width="75" height="24" rx="4" fill="#121318" stroke="rgba(255,255,255,0.1)"/>
          <text x="257" y="79" fill="#71717a" font-size="8.5" font-family="monospace" text-anchor="middle">PAGE [70 | 90]</text>
          <!-- Down to Leaf -->
          <line x1="85" y1="88" x2="55" y2="108" stroke="rgba(16,185,129,0.7)" stroke-width="2"/>
          <circle cx="55" cy="108" r="4" fill="#10b981">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <!-- Leaf Pages Linked Chain -->
          <rect x="25" y="106" width="60" height="22" rx="3" fill="#18181b" stroke="#10b981" stroke-width="1"/>
          <text x="55" y="120" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">LEAF: 10..20</text>
          <line x1="85" y1="117" x2="105" y2="117" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
          <rect x="105" y="106" width="60" height="22" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.1)"/>
          <text x="135" y="120" fill="#a1a1aa" font-size="8" font-family="monospace" text-anchor="middle">LEAF: 21..40</text>
          <line x1="165" y1="117" x2="185" y2="117" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
          <rect x="185" y="106" width="60" height="22" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.1)"/>
          <text x="215" y="120" fill="#a1a1aa" font-size="8" font-family="monospace" text-anchor="middle">LEAF: 41..60</text>
        </svg>
      `
    },

    {
      id: 'topic_03_covering',
      number: 'TOPIC 03',
      domain: 'storage',
      domainLabel: 'Storage & Hardware',
      title: 'Covering Index Scan & Heap Fetch Elimination',
      subtitle: 'Satisfying Queries Directly from Index Leaves without Heap Lookups',
      difficulty: 'L5 FAANG',
      difficultyBadge: 'advanced',
      estimatedTime: '10 min',
      concepts: [
        'Standard Index Scan finds matching RowIDs/cTIDs in index leaves, then fetches physical rows from heap pages.',
        'Covering Index (Index-Only Scan) includes all selected columns in the index structure, bypassing heap page access entirely.',
        'Postgres Visibility Map ensures index-only scans do not need heap MVCC tuple visibility checks.'
      ],
      productionTrap: {
        title: 'The SELECT * Heap Lookup Trap',
        gotcha: 'Querying unnecessary columns forces the engine to discard an Index-Only Scan and fetch heap pages from disk, increasing I/O by 800%.',
        faultySql: '-- SELECT * forces heap table read\nSELECT * FROM customers\nWHERE tier = \'ENTERPRISE\';',
        fixedSql: '-- Covered by idx_cust_tier_id_name\nSELECT customer_id, customer_name\nFROM customers\nWHERE tier = \'ENTERPRISE\';',
        speedup: '87.5% Disk I/O Bypass'
      },
      studioProblemId: 'vol_1_storage_prob_3',
      profilerPresetId: 'unindexed_10m_scan',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Index Leaf Box -->
          <rect x="25" y="25" width="140" height="90" rx="6" fill="#121318" stroke="#10b981" stroke-width="1.2"/>
          <text x="95" y="44" fill="#10b981" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">INDEX LEAF (COVERING)</text>
          <rect x="35" y="55" width="120" height="14" rx="3" fill="#18181b"/>
          <text x="95" y="65" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">[Key: 'ENT', ID: 101, Name]</text>
          <rect x="35" y="73" width="120" height="14" rx="3" fill="#18181b"/>
          <text x="95" y="83" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">[Key: 'ENT', ID: 102, Name]</text>
          <rect x="35" y="91" width="120" height="14" rx="3" fill="#18181b"/>
          <text x="95" y="101" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">[Key: 'ENT', ID: 103, Name]</text>
          <!-- Bypassed Heap Table Box -->
          <rect x="220" y="25" width="115" height="90" rx="6" fill="#121318" stroke="rgba(239,68,68,0.3)" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="277" y="44" fill="#ef4444" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">HEAP TABLE (DISK)</text>
          <text x="277" y="75" fill="#71717a" font-size="8.5" font-family="monospace" text-anchor="middle">BYPASSED</text>
          <text x="277" y="90" fill="#10b981" font-size="8.5" font-family="monospace" text-anchor="middle">0 DISK READS</text>
          <!-- Result Flow -->
          <path d="M 165 70 L 210 70" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow)"/>
        </svg>
      `
    },

    // -------------------------------------------------------------------------
    // DOMAIN B: RELATIONAL ALGEBRA & PIPELINE PROCESSING
    // -------------------------------------------------------------------------
    {
      id: 'topic_04_joins',
      number: 'TOPIC 04',
      domain: 'relational',
      domainLabel: 'Relational Operators',
      title: 'Multi-Table Hash Joins vs Nested Loops',
      subtitle: 'Build Phase In-Memory Buckets & Probe Phase Stream Matching',
      difficulty: 'L5 FAANG',
      difficultyBadge: 'advanced',
      estimatedTime: '15 min',
      concepts: [
        'Hash Join builds an in-memory hash table on the smaller relation, then streams the outer relation probing keys.',
        'Nested Loop Join is optimal when outer stream is tiny (<10 rows) and inner relation has a supporting B+Tree index.',
        'When inner hash table exceeds work_mem, engine falls back to 2-pass hybrid hash join, spilling chunks to disk.'
      ],
      productionTrap: {
        title: 'The Hash Table Disk Spill Trap',
        gotcha: 'Joining large unindexed tables with default work_mem (4MB) triggers multi-pass disk temp files, multiplying join latency by 8x.',
        faultySql: '-- Unindexed join spills to disk temp files\nSELECT c.name, o.total\nFROM customers c\nJOIN orders o ON c.id = o.customer_id;',
        fixedSql: '-- Sized work_mem or supporting index\nSET work_mem = \'64MB\';\nSELECT c.name, o.total\nFROM customers c\nJOIN orders o ON c.id = o.customer_id;',
        speedup: '89.2% Memory Spill Remediation'
      },
      studioProblemId: 'vol_2_operators_prob_1',
      profilerPresetId: 'hash_join_skew_spill',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Inner Build Table -->
          <rect x="25" y="25" width="90" height="90" rx="6" fill="#121318" stroke="rgba(14,165,233,0.3)"/>
          <text x="70" y="44" fill="#38bdf8" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">BUILD RELATION</text>
          <circle cx="50" cy="70" r="4" fill="#38bdf8">
            <animate attributeName="cy" values="60;80;60" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="70" cy="80" r="4" fill="#38bdf8">
            <animate attributeName="cy" values="75;65;75" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="90" cy="65" r="4" fill="#38bdf8">
            <animate attributeName="cy" values="80;60;80" dur="2s" repeatCount="indefinite"/>
          </circle>
          <!-- Hash Collision Funnel -->
          <path d="M 125 70 L 175 70" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="3 3"/>
          <!-- Hash Buckets in Memory -->
          <rect x="180" y="25" width="85" height="90" rx="6" fill="#121318" stroke="rgba(16,185,129,0.4)"/>
          <text x="222" y="44" fill="#10b981" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">HASH BUCKETS</text>
          <rect x="190" y="55" width="65" height="12" rx="2" fill="#18181b" stroke="rgba(16,185,129,0.3)"/>
          <text x="222" y="64" fill="#10b981" font-size="7.5" font-family="monospace" text-anchor="middle">h(k1) ➔ [Ptr 1]</text>
          <rect x="190" y="72" width="65" height="12" rx="2" fill="#18181b" stroke="rgba(16,185,129,0.3)"/>
          <text x="222" y="81" fill="#10b981" font-size="7.5" font-family="monospace" text-anchor="middle">h(k2) ➔ [Ptr 2]</text>
          <rect x="190" y="89" width="65" height="12" rx="2" fill="#18181b" stroke="rgba(16,185,129,0.3)"/>
          <text x="222" y="98" fill="#10b981" font-size="7.5" font-family="monospace" text-anchor="middle">h(k3) ➔ [Ptr 3]</text>
          <!-- Probe Stream Indicator -->
          <circle cx="295" cy="70" r="5" fill="#f59e0b">
            <animate attributeName="cx" values="320;270;320" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <text x="315" y="55" fill="#f59e0b" font-size="8" font-family="monospace" text-anchor="middle">PROBE</text>
          <text x="315" y="95" fill="#a1a1aa" font-size="7.5" font-family="monospace" text-anchor="middle">STREAM</text>
        </svg>
      `
    },

    {
      id: 'topic_05_agg',
      number: 'TOPIC 05',
      domain: 'relational',
      domainLabel: 'Relational Operators',
      title: 'Streaming vs Hash Aggregations',
      subtitle: 'Single-Pass Accumulator Buckets vs Pre-Sorted Stream Pipelines',
      difficulty: 'L4 Core',
      difficultyBadge: 'core',
      estimatedTime: '10 min',
      concepts: [
        'HashAggregate allocates in-memory hashtables mapping group keys to accumulator states (SUM, COUNT).',
        'StreamAggregate evaluates groups in O(1) memory complexity if input stream is pre-sorted by GROUP BY keys.',
        'High cardinality groups can easily exhaust work_mem, resulting in slow external merge sort or hash spill.'
      ],
      productionTrap: {
        title: 'The High-Cardinality HashAggregate Overflow',
        gotcha: 'Grouping by a UUID or high-cardinality key forces the hash table to expand beyond RAM, spilling millions of buckets to disk.',
        faultySql: '-- Unordered high-cardinality grouping\nSELECT user_id, COUNT(*)\nFROM user_events\nGROUP BY user_id;',
        fixedSql: '-- Pre-ordered index stream\n-- CREATE INDEX idx_user_events_uid ON user_events(user_id);\nSELECT user_id, COUNT(*)\nFROM user_events\nGROUP BY user_id;',
        speedup: '91.3% RAM Footprint Drop'
      },
      studioProblemId: 'vol_2_operators_prob_2',
      profilerPresetId: 'hash_join_skew_spill',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Incoming Row Stream -->
          <g>
            <rect x="20" y="35" width="70" height="70" rx="4" fill="#121318" stroke="rgba(255,255,255,0.15)"/>
            <text x="55" y="50" fill="#a1a1aa" font-size="8" font-family="monospace" text-anchor="middle">STREAM</text>
            <circle cx="45" cy="70" r="3" fill="#f59e0b"/>
            <circle cx="65" cy="70" r="3" fill="#38bdf8"/>
            <circle cx="55" cy="85" r="3" fill="#10b981"/>
          </g>
          <!-- Hashing Arrow -->
          <path d="M 95 70 L 145 70" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="3 3"/>
          <!-- Aggregator Buckets -->
          <rect x="150" y="25" width="180" height="90" rx="6" fill="#121318" stroke="rgba(234,179,8,0.3)"/>
          <text x="240" y="44" fill="#eab308" font-size="9" font-family="monospace" text-anchor="middle" font-weight="700">HASH ACCUMULATORS</text>
          <g>
            <rect x="165" y="55" width="150" height="16" rx="3" fill="#18181b"/>
            <text x="175" y="66" fill="#ffffff" font-size="8" font-family="monospace">Dept A: count=4, sum=$42k</text>
            <rect x="165" y="75" width="150" height="16" rx="3" fill="#18181b"/>
            <text x="175" y="86" fill="#ffffff" font-size="8" font-family="monospace">Dept B: count=9, sum=$98k</text>
            <rect x="165" y="95" width="150" height="16" rx="3" fill="#18181b"/>
            <text x="175" y="106" fill="#ffffff" font-size="8" font-family="monospace">Dept C: count=2, sum=$18k</text>
          </g>
        </svg>
      `
    },

    {
      id: 'topic_06_setops',
      number: 'TOPIC 06',
      domain: 'relational',
      domainLabel: 'Relational Operators',
      title: 'Set Operations & UNION Deduplication Barriers',
      subtitle: 'UNION vs UNION ALL, INTERSECT, and Relational Set Theory',
      difficulty: 'L4 Core',
      difficultyBadge: 'core',
      estimatedTime: '8 min',
      concepts: [
        'UNION implicitly performs DISTINCT deduplication by creating an intermediate hash table over all tuples.',
        'UNION ALL directly concatenates record streams with zero memory barrier and zero CPU deduplication overhead.',
        'INTERSECT and EXCEPT use merge sort or hash join semi-join physics to evaluate set differences.'
      ],
      productionTrap: {
        title: 'The Implicit DISTINCT Memory Barrier',
        gotcha: 'Using UNION instead of UNION ALL when record streams are already mutually exclusive wastes gigabytes of RAM deduplicating unique IDs.',
        faultySql: '-- Implicit DISTINCT forces massive hash table\nSELECT id, event FROM web_clicks\nUNION\nSELECT id, event FROM app_clicks;',
        fixedSql: '-- Direct stream append without memory barrier\nSELECT id, event FROM web_clicks\nUNION ALL\nSELECT id, event FROM app_clicks;',
        speedup: '94.6% Memory Distinct Cut'
      },
      studioProblemId: 'vol_2_operators_prob_3',
      profilerPresetId: 'union_dedup_barrier',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Set A Circle -->
          <circle cx="130" cy="70" r="45" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="105" y="73" fill="#38bdf8" font-size="9" font-family="monospace" font-weight="700">SET A</text>
          <!-- Set B Circle -->
          <circle cx="200" cy="70" r="45" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
          <text x="225" y="73" fill="#10b981" font-size="9" font-family="monospace" font-weight="700">SET B</text>
          <!-- Intersect Zone Highlight -->
          <path d="M 165 42 A 45 45 0 0 1 165 98 A 45 45 0 0 1 165 42" fill="rgba(234,179,8,0.25)" stroke="#eab308" stroke-width="1"/>
          <text x="165" y="73" fill="#eab308" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">INTERSECT</text>
          <text x="165" y="126" fill="#a1a1aa" font-size="8.5" font-family="monospace" text-anchor="middle">UNION ALL = A + B (Zero Dedup Hash)</text>
        </svg>
      `
    },

    // -------------------------------------------------------------------------
    // DOMAIN C: ADVANCED ANALYTIC PIPELINES & GRAPH TRAVERSAL
    // -------------------------------------------------------------------------
    {
      id: 'topic_07_window',
      number: 'TOPIC 07',
      domain: 'analytic',
      domainLabel: 'Analytic Pipelines',
      title: 'Sliding Window Frames (ROWS BETWEEN)',
      subtitle: 'Moving Averages, Unbounded Offsets & Frame Bounding Physics',
      difficulty: 'L5 FAANG',
      difficultyBadge: 'advanced',
      estimatedTime: '14 min',
      concepts: [
        'Window functions calculate rankings and moving accumulators without collapsing rows into a single group.',
        'Default frame behavior: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW buffers all partition rows.',
        'ROWS BETWEEN specifies exact physical tuple counts, avoiding costly range value comparisons.'
      ],
      productionTrap: {
        title: 'The Default RANGE Frame Quicksort Trap',
        gotcha: 'Omitting the frame clause in OVER(ORDER BY date) defaults to RANGE, forcing the engine to buffer and inspect duplicates across peer rows.',
        faultySql: '-- Default RANGE buffers peer rows\nSELECT trade_time, price,\n  AVG(price) OVER (ORDER BY trade_time) AS moving_avg\nFROM market_trades;',
        fixedSql: '-- Strict physical row boundary\nSELECT trade_time, price,\n  AVG(price) OVER (\n    ORDER BY trade_time\n    ROWS BETWEEN 50 PRECEDING AND CURRENT ROW\n  ) AS moving_avg\nFROM market_trades;',
        speedup: '91.8% Window Sort Pass Elimination'
      },
      studioProblemId: 'vol_4_streaming_prob_1',
      profilerPresetId: 'high_frequency_window_frame',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Rows in Partition -->
          <g>
            <rect x="30" y="30" width="300" height="16" rx="3" fill="#121318"/>
            <text x="45" y="42" fill="#a1a1aa" font-size="8" font-family="monospace">Row 1: $100</text>
            <rect x="30" y="50" width="300" height="16" rx="3" fill="#121318"/>
            <text x="45" y="62" fill="#a1a1aa" font-size="8" font-family="monospace">Row 2: $105</text>
            <rect x="30" y="70" width="300" height="16" rx="3" fill="#121318"/>
            <text x="45" y="82" fill="#a1a1aa" font-size="8" font-family="monospace">Row 3: $102</text>
            <rect x="30" y="90" width="300" height="16" rx="3" fill="#121318"/>
            <text x="45" y="102" fill="#a1a1aa" font-size="8" font-family="monospace">Row 4: $110</text>
          </g>
          <!-- Animated Sliding Frame Highlight -->
          <rect x="25" y="46" width="310" height="42" rx="4" fill="rgba(168,85,247,0.12)" stroke="#a855f7" stroke-width="1.5">
            <animate attributeName="y" values="26;46;66;46" dur="3s" repeatCount="indefinite"/>
          </rect>
          <text x="240" y="125" fill="#a855f7" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">SLIDING WINDOW: ROWS BETWEEN 1 PRECEDING</text>
        </svg>
      `
    },

    {
      id: 'topic_08_cte',
      number: 'TOPIC 08',
      domain: 'analytic',
      domainLabel: 'Analytic Pipelines',
      title: 'Recursive CTEs & Directed Graph Traversal',
      subtitle: 'Anchor Tuples, Recursive Members & Acyclic Dependency Traversal',
      difficulty: 'Quant Tier-1',
      difficultyBadge: 'quant',
      estimatedTime: '16 min',
      concepts: [
        'Recursive CTE executes an Anchor Member once, then repeatedly executes the Recursive Member until working table is empty.',
        'Graph Traversal: Solves organizational hierarchies, bill of materials (BOM), and dependency resolution.',
        'Cycle Detection: Tracking visited node arrays prevents runaway infinite recursion loops.'
      ],
      productionTrap: {
        title: 'The Infinite Cycle Memory Exhaustion Trap',
        gotcha: 'A cyclical graph (A -> B -> A) causes a recursive CTE to recurse infinitely until the server runs out of disk/RAM or hits recursion limit.',
        faultySql: '-- Unbounded cycle risk\nWITH RECURSIVE org(id, parent_id) AS (\n  SELECT id, parent_id FROM employees WHERE id = 1\n  UNION ALL\n  SELECT e.id, e.parent_id FROM employees e JOIN org ON e.parent_id = org.id\n) SELECT * FROM org;',
        fixedSql: '-- Cycle tracking guard\nWITH RECURSIVE org(id, path) AS (\n  SELECT id, ARRAY[id] FROM employees WHERE id = 1\n  UNION ALL\n  SELECT e.id, org.path || e.id FROM employees e\n  JOIN org ON e.parent_id = org.id\n  WHERE NOT (e.id = ANY(org.path))\n) SELECT * FROM org;',
        speedup: '100% Infinite Loop Elimination'
      },
      studioProblemId: 'vol_4_streaming_prob_2',
      profilerPresetId: 'correlated_subquery_trap',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Root Node -->
          <circle cx="180" cy="28" r="14" fill="#121318" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="180" y="32" fill="#38bdf8" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">ROOT</text>
          <!-- Branches -->
          <line x1="170" y1="42" x2="110" y2="70" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <line x1="190" y1="42" x2="250" y2="70" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <!-- Child Level 1 -->
          <circle cx="110" cy="70" r="12" fill="#121318" stroke="#10b981" stroke-width="1.5"/>
          <text x="110" y="74" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">L1_A</text>
          <circle cx="250" cy="70" r="12" fill="#121318" stroke="#10b981" stroke-width="1.5"/>
          <text x="250" y="74" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">L1_B</text>
          <!-- Child Level 2 Dynamic Reveal -->
          <line x1="100" y1="82" x2="60" y2="112" stroke="rgba(234,179,8,0.4)" stroke-width="1.5"/>
          <line x1="120" y1="82" x2="160" y2="112" stroke="rgba(234,179,8,0.4)" stroke-width="1.5"/>
          <circle cx="60" cy="112" r="10" fill="#18181b" stroke="#eab308" stroke-width="1.2">
            <animate attributeName="r" values="8;11;8" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="60" y="115" fill="#eab308" font-size="7.5" font-family="monospace" text-anchor="middle">L2_1</text>
          <circle cx="160" cy="112" r="10" fill="#18181b" stroke="#eab308" stroke-width="1.2"/>
          <text x="160" y="115" fill="#eab308" font-size="7.5" font-family="monospace" text-anchor="middle">L2_2</text>
          <text x="280" y="122" fill="#a1a1aa" font-size="8" font-family="monospace">UNION ALL RECURSIVE</text>
        </svg>
      `
    },

    {
      id: 'topic_09_subqueries',
      number: 'TOPIC 09',
      domain: 'analytic',
      domainLabel: 'Analytic Pipelines',
      title: 'Correlated Subqueries & Semi-Join Decorrelation',
      subtitle: 'Eliminating N+1 Loops with Hash Semi-Joins & Anti-Joins',
      difficulty: 'L5 FAANG',
      difficultyBadge: 'advanced',
      estimatedTime: '12 min',
      concepts: [
        'A correlated subquery re-evaluates once for every outer tuple, leading to an O(N * M) performance disaster.',
        'Modern query optimizers attempt Subquery Pull-up (decorrelation) to transform correlated subqueries into Hash Semi-Joins.',
        'EXISTS vs IN: IN handles NULL values with three-valued logic, which can prevent index usage.'
      ],
      productionTrap: {
        title: 'The SubPlan N+1 Execution Loop Trap',
        gotcha: 'A scalar correlated subquery in the SELECT list executes 50,000 times, causing CPU starvation and high p99 latency.',
        faultySql: '-- Re-evaluated 50,000 times\nSELECT u.id, (\n  SELECT MAX(amount) FROM payments p WHERE p.user_id = u.id\n) AS max_pay FROM users u;',
        fixedSql: '-- Left Join with single aggregation pass\nSELECT u.id, MAX(p.amount) AS max_pay\nFROM users u\nLEFT JOIN payments p ON u.id = p.user_id\nGROUP BY u.id;',
        speedup: '96.5% CPU Loop Elimination'
      },
      studioProblemId: 'vol_2_operators_prob_1',
      profilerPresetId: 'correlated_subquery_trap',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Outer Stream Loop -->
          <rect x="25" y="30" width="100" height="80" rx="5" fill="#121318" stroke="rgba(255,255,255,0.15)"/>
          <text x="75" y="48" fill="#a1a1aa" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">OUTER STREAM</text>
          <text x="75" y="70" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">Row 1: User 101</text>
          <text x="75" y="85" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">Row 2: User 102</text>
          <text x="75" y="100" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">Row 3: User 103</text>
          <!-- Loop Cycle Arrow -->
          <path d="M 130 55 C 160 35, 180 35, 210 55" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="170" y="40" fill="#ef4444" font-size="7.5" font-family="monospace" text-anchor="middle">N LOOPS!</text>
          <!-- SubPlan Box -->
          <rect x="215" y="30" width="120" height="80" rx="5" fill="#121318" stroke="#10b981" stroke-width="1.2"/>
          <text x="275" y="48" fill="#10b981" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">HASH SEMI-JOIN</text>
          <text x="275" y="70" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">1-PASS HASH TABLE</text>
          <text x="275" y="88" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">0 REDUNDANT LOOPS</text>
        </svg>
      `
    },

    // -------------------------------------------------------------------------
    // DOMAIN D: TRANSACTION PHYSICS, CONCURRENCY & ENTERPRISE SYSTEMS
    // -------------------------------------------------------------------------
    {
      id: 'topic_10_mvcc',
      number: 'TOPIC 10',
      domain: 'concurrency',
      domainLabel: 'Transactions & MVCC',
      title: 'MVCC Snapshot Isolation & Write Skew Anomaly',
      subtitle: 'Multi-Version Tuple Timelines, xmin/xmax & Vacuum Physics',
      difficulty: 'Quant Tier-1',
      difficultyBadge: 'quant',
      estimatedTime: '18 min',
      concepts: [
        'Postgres MVCC never overwrites tuples in place; UPDATE creates a new version with xmin and marks old tuple xmax.',
        'Snapshot Isolation guarantees readers never block writers and writers never block readers.',
        'Write Skew: Two concurrent transactions read disjoint states and commit mutually inconsistent decisions.'
      ],
      productionTrap: {
        title: 'The On-Call Doctor Write Skew Anomaly',
        gotcha: 'Under Snapshot Isolation, two doctors simultaneously check if another doctor is on call. Both see 2 active, both take off, leaving 0 doctors on call.',
        faultySql: '-- Vulnerable to Write Skew under REPEATABLE READ\nSELECT COUNT(*) FROM on_call WHERE active = TRUE;\n-- If count >= 2, update self to active = FALSE;',
        fixedSql: '-- Enforce true serializability\nBEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nSELECT COUNT(*) FROM on_call WHERE active = TRUE;\nUPDATE on_call SET active = FALSE WHERE doc_id = 42;\nCOMMIT;',
        speedup: 'Zero Ledger Inconsistency'
      },
      studioProblemId: 'vol_3_concurrency_prob_1',
      profilerPresetId: 'unindexed_10m_scan',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Timeline Arrow -->
          <line x1="30" y1="70" x2="330" y2="70" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <!-- Txn 100 Tuple -->
          <circle cx="80" cy="70" r="16" fill="#121318" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="80" y="73" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">v1 (T100)</text>
          <!-- Txn 105 Tuple -->
          <circle cx="180" cy="70" r="16" fill="#121318" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="180" y="73" fill="#f59e0b" font-size="8" font-family="monospace" text-anchor="middle">v2 (T105)</text>
          <!-- Txn 110 Tuple -->
          <circle cx="280" cy="70" r="16" fill="#121318" stroke="#10b981" stroke-width="1.5"/>
          <text x="280" y="73" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">v3 (T110)</text>
          <!-- Active Transaction Snapshot View Window -->
          <rect x="55" y="24" width="150" height="92" rx="6" fill="rgba(56,189,248,0.08)" stroke="#38bdf8" stroke-dasharray="3 3"/>
          <text x="130" y="125" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">SNAPSHOT AT T104 (Sees v1, ignores v2 & v3)</text>
        </svg>
      `
    },

    {
      id: 'topic_11_deadlocks',
      number: 'TOPIC 11',
      domain: 'concurrency',
      domainLabel: 'Transactions & MVCC',
      title: 'Two-Phase Locking (2PL) & Deadlock Cycle Resolution',
      subtitle: 'Strict 2PL Growing Phase, Wait-For Graphs & Victim Aborts',
      difficulty: 'Quant Tier-1',
      difficultyBadge: 'quant',
      estimatedTime: '15 min',
      concepts: [
        'Two-Phase Locking (2PL): Growing phase acquires locks without releasing; shrinking phase releases locks without acquiring.',
        'Deadlock occurs when Transaction 1 holds Lock A and waits for B, while Transaction 2 holds B and waits for A.',
        'Engine resolves deadlocks by running a background cycle detection loop and aborting the least expensive victim.'
      ],
      productionTrap: {
        title: 'The Out-of-Order Lock Acquisition Deadlock',
        gotcha: 'Concurrent payment transfers updating accounts in random order (Txn 1: A->B, Txn 2: B->A) trigger frequent deadlock rollbacks.',
        faultySql: '-- Random lock ordering causes deadlocks\nUPDATE accounts SET bal = bal - 100 WHERE id = 1;\nUPDATE accounts SET bal = bal + 100 WHERE id = 2;',
        fixedSql: '-- Consistent global sort order prevents deadlocks\n-- Always acquire locks in ascending ID order:\nSELECT * FROM accounts WHERE id IN (1, 2) ORDER BY id FOR UPDATE;',
        speedup: '100% Deadlock Cycle Elimination'
      },
      studioProblemId: 'vol_3_concurrency_prob_3',
      profilerPresetId: 'unindexed_10m_scan',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Transaction 1 -->
          <circle cx="80" cy="40" r="18" fill="#121318" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="80" y="44" fill="#38bdf8" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">TXN A</text>
          <!-- Resource 1 (Row 1) -->
          <rect x="150" y="25" width="60" height="30" rx="4" fill="#18181b" stroke="#38bdf8"/>
          <text x="180" y="44" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">ROW #1</text>
          <line x1="98" y1="40" x2="150" y2="40" stroke="#38bdf8" stroke-width="2"/>
          <!-- Resource 2 (Row 2) -->
          <rect x="150" y="85" width="60" height="30" rx="4" fill="#18181b" stroke="#ef4444"/>
          <text x="180" y="104" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">ROW #2</text>
          <!-- Transaction 2 -->
          <circle cx="280" cy="100" r="18" fill="#121318" stroke="#ef4444" stroke-width="1.5"/>
          <text x="280" y="104" fill="#ef4444" font-size="8.5" font-family="monospace" text-anchor="middle" font-weight="700">TXN B</text>
          <line x1="262" y1="100" x2="210" y2="100" stroke="#ef4444" stroke-width="2"/>
          <!-- Wait-For Directed Deadlock Cycle -->
          <path d="M 80 58 L 150 95" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3"/>
          <path d="M 280 82 L 210 45" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="180" y="74" fill="#ef4444" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">DEADLOCK CYCLE DETECTED</text>
        </svg>
      `
    },

    {
      id: 'topic_12_geospatial',
      number: 'TOPIC 12',
      domain: 'concurrency',
      domainLabel: 'Enterprise Systems',
      title: 'H3 Spatial Hexagons & Ride Surge Geofencing',
      subtitle: 'Hexagonal Spatial Indexing, Uber H3 Resolution & Polygon Containment',
      difficulty: 'L5 FAANG',
      difficultyBadge: 'advanced',
      estimatedTime: '15 min',
      concepts: [
        'Hierarchical hexagonal spatial indexing partitions coordinates into discrete uniform cells (Resolution 8 = ~460m).',
        'Spatial joins use integer cell ID equality instead of computationally expensive trigonometry (ST_DWithin).',
        'Dynamic surge pricing calculates real-time rider-to-driver supply ratios aggregated by H3 parent hexagons.'
      ],
      productionTrap: {
        title: 'The Great-Circle Distance CPU Burn',
        gotcha: 'Calculating Haversine formula across 200,000 latitude/longitude pairs on every trip request saturates database CPUs.',
        faultySql: '-- Raw Trigonometry burns 100% CPU\nSELECT driver_id FROM drivers\nWHERE acos(sin(lat)*sin(37.7) + cos(lat)*cos(37.7)*cos(lon - (-122.4))) * 6371 < 1.0;',
        fixedSql: '-- O(1) Integer Index seek on H3 cell\nSELECT driver_id FROM drivers\nWHERE h3_index = \'8828308281fffff\';',
        speedup: '99.1% Geospatial Calculation Speedup'
      },
      studioProblemId: 'vol_4_streaming_prob_3',
      profilerPresetId: 'unindexed_10m_scan',
      svgAnimation: `
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="topic-svg-anim">
          <rect width="360" height="140" rx="8" fill="#090a0d"/>
          <!-- Hexagon 1 -->
          <polygon points="140,40 165,25 190,40 190,70 165,85 140,70" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="165" y="58" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">H3_8a28</text>
          <!-- Hexagon 2 (Surge Active) -->
          <polygon points="190,70 215,55 240,70 240,100 215,115 190,100" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="1.5"/>
          <text x="215" y="85" fill="#ef4444" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">SURGE 2.4x</text>
          <circle cx="215" cy="95" r="3" fill="#ffffff">
            <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite"/>
          </circle>
          <!-- Hexagon 3 -->
          <polygon points="90,70 115,55 140,70 140,100 115,115 90,100" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.2"/>
          <text x="115" y="88" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">H3_8a29</text>
          <text x="180" y="130" fill="#a1a1aa" font-size="8" font-family="monospace" text-anchor="middle">UBER H3 RESOLUTION 8 SPATIAL CELL TILES</text>
        </svg>
      `
    }
  ];

  window.TOPIC_MOTION_CARDS_DATA = TOPIC_MOTION_CARDS_DATA;

})(window);
