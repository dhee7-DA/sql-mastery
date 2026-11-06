/**
 * SQL MASTERY - 3D HARDWARE STRATA DATA CATALOG
 * ------------------------------------------------------------------------
 * 5 Physical Database Internals Layers with exact storage physics,
 * latency hierarchies, memory formulas, failure modes, and tuning knobs.
 */

(function(window) {
  'use strict';

  const HARDWARE_STRATA_DATA = [
    {
      id: 'layer_01_client',
      level: 1,
      title: 'Layer 1: Client Query, Lexer & AST Parser',
      shortName: 'Client AST & Lexer',
      color: '#10b981', // Emerald
      badge: 'TOP-OF-STACK // COMPILATION',
      latency: '0.02 - 0.15 ms',
      hardwareTier: 'CPU L1/L2 Instruction Cache (0.5 - 2 ns access)',
      summary: 'Raw SQL text is tokenized into lexical symbols, validated against system catalogs, and transformed into an Abstract Syntax Tree (AST) representation.',
      details: [
        'Lexical Tokenization: Splits input SQL string into keywords, identifiers, literals, and operators.',
        'Grammar Validation: Validates syntactic compliance against ANSI SQL & engine-specific dialect grammars.',
        'Semantic Catalog Resolution: Resolves table and column identifiers against dictionary caches, validating permissions and data types.',
        'SARGability Flagging: Identifies non-SARGable expressions (e.g. YEAR(col), LOWER(col), leading %wildcards) that blind indexing structures.'
      ],
      formulas: [
        { label: 'Parse Time Complexity', val: 'O(N) where N = token count' },
        { label: 'Prepared Statement Cache Hit', val: '0.001 ms (bypasses tokenizer completely)' }
      ],
      tuningKnobs: [
        { name: 'prepared_statements_cache_size', defaultVal: '1024', unit: 'queries', desc: 'Number of parsed ASTs kept in session memory to bypass re-parsing.' },
        { name: 'max_allowed_packet', defaultVal: '64MB', unit: 'bytes', desc: 'Maximum single SQL statement string size accepted by the network buffer.' }
      ],
      incidentTrap: {
        title: 'Prepared Statement Leak & Heap Fragmentation',
        gotcha: 'Applications generating dynamic SQL without parameter placeholders force the engine to parse millions of unique queries, exhausting prepared statement memory pools and causing high CPU parse latency.',
        fixSql: '-- PREPARED STATEMENT CACHING\nPREPARE get_cust_tx FROM\n  \'SELECT id, amount FROM tx WHERE cust_id = ? AND status = ?\';\nEXECUTE get_cust_tx USING @cust_id, @status;'
      },
      particleColor: '#10b981',
      svgIcon: `
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
          <rect x="6" y="8" width="28" height="24" rx="4" stroke="#10b981" stroke-width="2"/>
          <path d="M12 15h16M12 20h10M12 25h14" stroke="#10b981" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `
    },

    {
      id: 'layer_02_optimizer',
      level: 2,
      title: 'Layer 2: Cost-Based Optimizer (CBO) & Plan Tree',
      shortName: 'Query Optimizer (CBO)',
      color: '#6366f1', // Indigo
      badge: 'RELATIONAL ALGEBRA ENGINE',
      latency: '0.05 - 0.80 ms',
      hardwareTier: 'CPU L3 Cache & System RAM (10 - 50 ns access)',
      summary: 'Evaluates algebraic equivalences, reads distribution histograms, and chooses the lowest-cost physical execution path via dynamic programming (System-R) or genetic algorithms.',
      details: [
        'Cardinality Estimation: Samples hyperloglog statistics and Equi-Depth histograms to estimate output rows per operator.',
        'Join Reordering: Explores Left-Deep vs Bushy join trees to minimize intermediate hash/merge materialization size.',
        'Access Path Selection: Compares sequential table scans against B+Tree range scans, covering index-only scans, and bitmap index scans.',
        'Subquery Decorrelation: Rewrites correlated scalar subqueries into semi-joins or anti-joins to eliminate N+1 loop amplification.'
      ],
      formulas: [
        { label: 'Optimizer Total Cost', val: 'Cost = (Page_Fetches * 1.0) + (CPU_Tuples * 0.01) + (CPU_Operators * 0.0025)' },
        { label: 'Join Permutations', val: '(2N - 2)! / (N - 1)! for N-way joins' }
      ],
      tuningKnobs: [
        { name: 'random_page_cost', defaultVal: '1.1 (SSD) / 4.0 (HDD)', unit: 'ratio', desc: 'Ratio of random NVMe I/O seek cost relative to sequential page read.' },
        { name: 'optimizer_search_depth', defaultVal: '62', unit: 'joins', desc: 'Threshold beyond which optimizer switches from exhaustive dynamic programming to genetic search.' }
      ],
      incidentTrap: {
        title: 'Stale Statistics Cardinality Catastrophe',
        gotcha: 'A table undergoes massive overnight ingestion without ANALYZE. The optimizer miscalculates 1,000,000 rows as 10 rows, choosing a disastrous Nested Loop instead of a Hash Join, spiking latency from 50ms to 45 seconds.',
        fixSql: '-- FORCE RE-CALCULATION OF STATS HISTOGRAMS\nANALYZE TABLE transactions;\n-- Postgres equivalent:\nANALYZE VERBOSE transactions (amount, status, created_at);'
      },
      particleColor: '#6366f1',
      svgIcon: `
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
          <circle cx="20" cy="10" r="4" stroke="#6366f1" stroke-width="2"/>
          <circle cx="10" cy="30" r="4" stroke="#6366f1" stroke-width="2"/>
          <circle cx="30" cy="30" r="4" stroke="#6366f1" stroke-width="2"/>
          <path d="M18 13l-6 13M22 13l6 13" stroke="#6366f1" stroke-width="1.8"/>
        </svg>
      `
    },

    {
      id: 'layer_03_buffer',
      level: 3,
      title: 'Layer 3: Buffer Pool & Shared Memory RAM',
      shortName: 'Buffer Pool & RAM',
      color: '#06b6d4', // Cyan
      badge: 'ZERO-COPY WORKING SET CACHE',
      latency: '80 - 150 ns (RAM Hit)',
      hardwareTier: 'DDR4/DDR5 Main System Memory (60 - 100 ns latency)',
      summary: 'Maintains in-memory 8KB/16KB page frames. Manages dirty page lifecycles, clock-sweep page replacement, and query working memory for hash tables and quicksorts.',
      details: [
        '8KB Page Allocation: Disk files are mapped 1:1 into uniform in-memory memory frames.',
        'LRU-2 / CLOCK-Sweep Eviction: Two-queue buffer management prevents full-table sequential scans from wiping out hot index root pages.',
        'Hash Table & Sort Memory: Allocates dedicated work_mem buffers for Hash Joins and Window Functions. Spills to disk if row volume exceeds budget.',
        'Dirty Bit Page Tracking: Modified pages are flagged as dirty and pinned in memory until asynchronously flushed by background page cleaner threads.'
      ],
      formulas: [
        { label: 'Cache Hit Ratio', val: '(Buffer_Pool_Reads / (Buffer_Pool_Reads + Disk_Reads)) * 100%' },
        { label: 'Dirty Page Target', val: 'Max 70% dirty to prevent checkpoint flush stalls' }
      ],
      tuningKnobs: [
        { name: 'shared_buffers (Postgres) / innodb_buffer_pool_size (MySQL)', defaultVal: '70% - 80% RAM', unit: 'GB', desc: 'Total dedicated memory pool for caching data and index pages.' },
        { name: 'work_mem', defaultVal: '64MB', unit: 'per operation', desc: 'Maximum RAM allocated for in-memory sorting and hash tables before disk spill occurs.' }
      ],
      incidentTrap: {
        title: 'Buffer Cache Thrashing & LRU Poisoning',
        gotcha: 'An unindexed analytical query performs a full sequential scan across a 50GB table. It floods the buffer pool, evicting hot banking account pages and degrading transaction throughput by 95%.',
        fixSql: '-- ELIMINATE FULL SCAN WITH COMPOSITE INDEX\nCREATE INDEX CONCURRENTLY idx_acc_status_created\n  ON transactions (account_id, status, created_at DESC)\n  INCLUDE (amount, fee);'
      },
      particleColor: '#06b6d4',
      svgIcon: `
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
          <rect x="8" y="10" width="10" height="8" rx="2" stroke="#06b6d4" stroke-width="1.8"/>
          <rect x="22" y="10" width="10" height="8" rx="2" stroke="#06b6d4" stroke-width="1.8"/>
          <rect x="8" y="22" width="10" height="8" rx="2" stroke="#06b6d4" stroke-width="1.8"/>
          <rect x="22" y="22" width="10" height="8" rx="2" stroke="#06b6d4" stroke-width="1.8"/>
        </svg>
      `
    },

    {
      id: 'layer_04_wal',
      level: 4,
      title: 'Layer 4: Write-Ahead Log (WAL) & Redo Engine',
      shortName: 'WAL & Redo Log',
      color: '#f59e0b', // Amber
      badge: 'DURABILITY & CRASH INVARIANT',
      latency: '0.2 - 1.2 ms (Fsync Barrier)',
      hardwareTier: 'Sequential NVMe Write Buffer (Queue Depth 32)',
      summary: 'Guarantees the ACID Durability (D) property. Every mutation must append an immutable Log Sequence Number (LSN) record to the WAL before dirty pages can be written to disk.',
      details: [
        'WAL Protocol Invariant: Dirty buffer pages MUST NEVER reach non-volatile disk before the corresponding WAL log record is flushed and fsynced.',
        'Sequential Append Optimality: Appending log records sequentially avoids random disk seek head penalties, achieving max NVMe drive IOPS.',
        'Group Commit: Batches multiple concurrent transaction commits into a single atomic fsync() syscall, amortizing hardware barrier overhead.',
        'Checkpointing: Periodically flushes all dirty pages to permanent tablespace files, establishing a clean recovery water-mark.'
      ],
      formulas: [
        { label: 'LSN Monotonic Ordering', val: 'LSN_next > LSN_prev for every commit record' },
        { label: 'Recovery Point Objective (RPO)', val: '0 data loss upon sudden power loss or kernel panic' }
      ],
      tuningKnobs: [
        { name: 'checkpoint_completion_target', defaultVal: '0.9', unit: 'ratio', desc: 'Spreads dirty page flushing evenly across the checkpoint interval to prevent I/O write cliffs.' },
        { name: 'wal_buffers', defaultVal: '16MB', unit: 'RAM buffer', desc: 'Ring buffer for WAL data that has not yet been written to disk.' }
      ],
      incidentTrap: {
        title: 'Checkpoint Flush Spike & Disk I/O Saturation',
        gotcha: 'Checkpoint completion target set too low (e.g. 0.1). Database attempts to flush 8GB of dirty pages in 30 seconds, maxing out disk write queues and stalling all API commit requests.',
        fixSql: '-- BALANCE CHECKPOINT DISK IOPS\nALTER SYSTEM SET checkpoint_completion_target = 0.9;\nALTER SYSTEM SET max_wal_size = \'32GB\';\nSELECT pg_reload_conf();'
      },
      particleColor: '#f59e0b',
      svgIcon: `
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
          <circle cx="20" cy="20" r="12" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
          <path d="M20 12v8l6 3" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    },

    {
      id: 'layer_05_storage',
      level: 5,
      title: 'Layer 5: NVMe SSD & Persistent Block Storage',
      shortName: 'NVMe Block Storage',
      color: '#f43f5e', // Rose
      badge: 'NON-VOLATILE DATA PERSISTENCE',
      latency: '10 - 80 μs (NVMe) / 5 - 15 ms (Magnetic)',
      hardwareTier: 'PCIe Gen4/Gen5 NVMe SSD & SAN LUNs',
      summary: 'Physical substrate where database heap tables, B+Trees, indexes, and blob files reside organized into 4KB/8KB filesystem blocks.',
      details: [
        'Direct I/O (O_DIRECT): Bypasses the OS kernel page cache to prevent double-buffering and memory copy CPU waste.',
        'NVMe Parallel Queueing: Modern PCIe 5.0 SSDs support up to 64,000 independent queue depths with 64,000 commands each.',
        'Write Amplification Factor (WAF): In-place updates that modify a single 40-byte column must re-write the entire 8,192-byte page frame.',
        'Heap Fragmentation & Bloat: Deleted rows leave dead tuples on page frames until reclaimed by VACUUM / OPTIMIZE TABLE operations.'
      ],
      formulas: [
        { label: 'Write Amplification Factor', val: 'WAF = Bytes_Written_To_Flash / Bytes_Written_By_Host (Target: ~1.2)' },
        { label: 'Random Read Latency Gap', val: 'RAM is 1,000x faster than NVMe SSD, and 100,000x faster than HDD' }
      ],
      tuningKnobs: [
        { name: 'fillfactor', defaultVal: '85% - 90%', unit: 'percent', desc: 'Reserves 10-15% free space on page frames for HOT (Heap-Only Tuples) updates without index pointer rewrites.' },
        { name: 'autovacuum_vacuum_cost_limit', defaultVal: '2000', unit: 'tokens', desc: 'Governs background vacuum I/O consumption to prevent interference with online OLTP transactions.' }
      ],
      incidentTrap: {
        title: 'MVCC Table Bloat & Write Amplification Cliff',
        gotcha: 'High-frequency UPDATEs on an unindexed table trigger full page rewrites and dead tuple accumulation. Table size balloons from 4GB to 65GB, degrading sequential scan speed by 1,600%.',
        fixSql: '-- TUNE FILLFACTOR TO ENABLE HOT UPDATES\nALTER TABLE high_velocity_orders SET (fillfactor = 80);\n-- RECLAIM BLOATED HEAP PAGES CONCURRENTLY\nVACUUM (VERBOSE, ANALYZE) high_velocity_orders;'
      },
      particleColor: '#f43f5e',
      svgIcon: `
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
          <rect x="8" y="8" width="24" height="24" rx="4" stroke="#f43f5e" stroke-width="2"/>
          <path d="M12 14h16M12 20h16M12 26h16" stroke="#f43f5e" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="28" cy="14" r="1.5" fill="#f43f5e"/>
          <circle cx="28" cy="20" r="1.5" fill="#f43f5e"/>
          <circle cx="28" cy="26" r="1.5" fill="#f43f5e"/>
        </svg>
      `
    }
  ];

  window.HARDWARE_STRATA_DATA = HARDWARE_STRATA_DATA;

})(window);
