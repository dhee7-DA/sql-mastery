/**
 * SQL FOUNDRY - INTERACTIVE DATABASE ARCHITECTURE EXPLAINER ENGINE
 * Step-by-step interactive deep-dives, hardware/OS telemetry, and interview defenses
 * for all 12 enterprise relational engine schematics.
 */

window.InteractiveArchitectureExplainer = (function() {
  'use strict';

  function normalizeDiagramId(id) {
    if (!id) return 'buffer_pool';
    const clean = String(id).toLowerCase().replace(/[-_]/g, '');
    if (clean.includes('buffer')) return 'buffer_pool';
    if (clean.includes('btree')) return 'btree_index';
    if (clean.includes('hash')) return 'hash_join';
    if (clean.includes('wal') || clean.includes('aries')) return 'wal_aries';
    if (clean.includes('opt')) return 'query_optimizer';
    if (clean.includes('mvcc')) return 'mvcc';
    if (clean.includes('lsm')) return 'lsm_tree';
    if (clean.includes('col') || clean.includes('simd')) return 'columnar_simd';
    if (clean.includes('2pc') || clean.includes('dist')) return 'distributed_2pc';
    if (clean.includes('window')) return 'window_execution';
    if (clean.includes('sort')) return 'external_sort';
    if (clean.includes('lock') || clean.includes('2pl')) return 'locking_hierarchy';
    return 'buffer_pool';
  }


  // =========================================================================
  // LIVE QUERY AST & PHYSICAL OPERATOR ANALYZER
  // =========================================================================
  function analyzeQueryForArchitecture(sql) {
    const clean = (sql || '').trim();
    if (!clean) {
      return {
        recommendedDiagram: 'buffer_pool',
        detectedOp: 'SEQUENTIAL_TABLE_SCAN',
        complexity: 'O(N) row scan',
        reason: 'Default table scan through Buffer Pool frame buffers',
        hardwareSummary: 'CPU L1/L2 Cacheprobe · 0 Disk IOPS',
        kernelReaction: 'sys_read bypassed · Direct Pointer dereference in SRAM',
        clauses: {}
      };
    }

    const hasJoin = /\b(JOIN|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|CROSS\s+JOIN|FULL\s+JOIN)\b/i.test(clean);
    const hasWindow = /\bOVER\s*\(/i.test(clean);
    const hasOrderBy = /\bORDER\s+BY\b/i.test(clean);
    const hasGroupBy = /\bGROUP\s+BY\b/i.test(clean);
    const hasAgg = /\b(SUM|AVG|COUNT|MIN|MAX)\s*\(/i.test(clean);
    const hasLock = /\b(FOR\s+UPDATE|LOCK\s+IN\s+SHARE\s+MODE)\b/i.test(clean);
    const hasDml = /\b(INSERT|UPDATE|DELETE|MERGE)\b/i.test(clean);
    const hasWhere = /\bWHERE\b/i.test(clean);
    const hasCte = /\bWITH\b/i.test(clean);

    let recommendedDiagram = 'buffer_pool';
    let detectedOp = 'ZERO_COPY_BUFFER_SCAN';
    let complexity = 'O(N) sequential scan';
    let reason = 'Single-table scan through Buffer Pool frame buffer memory slots';
    let hardwareSummary = 'CPU Core: L1 Data Cache probe · 0 Disk IOPS';
    let kernelReaction = 'sys_read bypassed · Direct pointer dereference in user-space buffer pool';

    if (hasLock) {
      recommendedDiagram = 'locking_hierarchy';
      detectedOp = 'STRICT_2PL_ROW_LOCK';
      complexity = 'O(1) hash bucket lock check';
      reason = 'Exclusive row lock acquired under Strict Two-Phase Locking (S2PL)';
      hardwareSummary = 'Lock Table Hash Directory: Read-biased mutex · 0.02% contention';
      kernelReaction = 'pthread_mutex held in user-space lock manager';
    } else if (hasDml) {
      recommendedDiagram = 'wal_aries';
      detectedOp = 'WAL_FSYNC_APPEND';
      complexity = 'O(1) sequential write';
      reason = 'Physiological log record appended to WAL before dirtying page in memory';
      hardwareSummary = 'NVMe Direct I/O (O_DIRECT) · Sequential circular ring buffer';
      kernelReaction = 'io_uring / fsync flushed log record to durable storage';
    } else if (hasJoin) {
      recommendedDiagram = 'hash_join';
      detectedOp = 'HASH_JOIN_BUILD_PROBE';
      complexity = 'O(M + N) streaming';
      reason = 'In-memory hash table constructed for inner relation and probed by outer stream';
      hardwareSummary = 'Hash Table: Murmur3_x64 · L2 Cache Line match (64 bytes)';
      kernelReaction = 'work_mem RAM resident · Zero scratch disk spill';
    } else if (hasWindow) {
      recommendedDiagram = 'window_execution';
      detectedOp = 'WINDOW_PARTITION_STREAM';
      complexity = 'O(N log W) sliding frame';
      reason = 'Partition buffer allocation with streaming framing cursor';
      hardwareSummary = 'Partition Buffer Ring (work_mem) · L1 Data Cacheline';
      kernelReaction = 'Single-pass streaming scan with monotonic frame cursor';
    } else if (hasOrderBy) {
      recommendedDiagram = 'external_sort';
      detectedOp = 'EXTERNAL_MERGE_SORT';
      complexity = 'O(N log N) replacement selection';
      reason = 'Sort buffer memory allocation and multi-pass merge fanout';
      hardwareSummary = 'Sort Buffer: In-memory QuickSort run · Top-K heap filter';
      kernelReaction = 'work_mem resident · Spill avoided via priority queue';
    } else if (hasAgg || hasGroupBy) {
      recommendedDiagram = 'columnar_simd';
      detectedOp = 'SIMD_VECTOR_AGGREGATE';
      complexity = 'O(N / 16) vectorized SIMD';
      reason = 'Column vector aggregation with AVX-512 register reduction';
      hardwareSummary = 'AVX-512 Packed Registers (512-bit ZMM) · 16 ints per cycle';
      kernelReaction = 'Contiguous memory prefetch · 99.4% L1 Data Cache hit rate';
    } else if (hasCte) {
      recommendedDiagram = 'query_optimizer';
      detectedOp = 'CBO_PLAN_TREE_EXPLORATION';
      complexity = 'O(2^K) search space pruned';
      reason = 'Cost-based optimizer evaluating join orders and subquery unnesting';
      hardwareSummary = 'Dynamic Programming Memo Structure · Statistics Histograms in DRAM';
      kernelReaction = 'Volcano iterator physical plan compiled in < 0.2ms';
    } else if (hasWhere) {
      recommendedDiagram = 'btree_index';
      detectedOp = 'INDEX_SEEK_RANGE_SCAN';
      complexity = 'O(log N) tree depth';
      reason = 'B+ Tree root-to-leaf binary search for target predicate range';
      hardwareSummary = 'Root -> Internal -> Leaf Page binary search · Fanout: 256';
      kernelReaction = 'Pointer dereference through shared leaf page latch';
    }

    return {
      recommendedDiagram,
      detectedOp,
      complexity,
      reason,
      hardwareSummary,
      kernelReaction,
      hasJoin,
      hasWindow,
      hasOrderBy,
      hasGroupBy,
      hasAgg,
      hasLock,
      hasDml,
      hasWhere,
      hasCte
    };
  }

  // State
  const state = {
    activeDiagramId: 'buffer_pool',
    containerId: 'dbArchInteractiveHost',
    viewMode: 'stepper', // 'stepper' | 'chaos' | 'live'
    activeScenarioIdx: 0,
    currentStepIdx: 0,
    activeChaosIdx: 0,
    isPlaying: false,
    playSpeed: 1, // 1x = 2200ms, 2x = 1100ms
    timer: null,
    listenersAttached: false,
    // Live synchronization state
    autoRouteDiagram: true,
    lastQuery: '',
    lastQueryAnalysis: null,
    lastExecutionStats: null,
    livePulseTimer: null,
    liveAnimationActive: false
  };

  // Deep Architecture Explainer Dataset for all 12 Diagrams
  const ARCH_DEEP_DIVES = {
    buffer_pool: {
      id: 'buffer_pool',
      title: 'Buffer Pool & Storage Engine I/O',
      badge: 'STORAGE KERNEL',
      scenarios: [
        {
          id: 'hit',
          title: 'Cache Hit (0.12ms SRAM/DRAM)',
          desc: 'Target page already resident in memory frame. Zero disk I/O.'
        },
        {
          id: 'miss',
          title: 'Cache Miss & NVMe Page Fault (2.4ms)',
          desc: 'Page not in buffer pool. Requires synchronous synchronous read from tablespace.'
        },
        {
          id: 'dirty_evict',
          title: 'Dirty Page Eviction & WAL Constraint',
          desc: 'Free list empty. Dirty frame must flush WAL to disk before page can be written.'
        }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Query Request & AST Page Translation',
          box: { x: 28, y: 62, w: 180, h: 208 },
          beacon: { x: 118, y: 166 },
          telemetry: {
            hardware: 'CPU Core: L1 Data Cache probe · 0 Disk IOPS',
            invariant: 'Volcano operator asks for Page 1048. Zero direct OS disk access allowed.',
            kernel: 'sys_read bypassed · Direct Pointer dereference in user-space buffer pool',
            state: 'ReqPage: 1048 | Caller: SeqScanOperator | Txn: T-9042'
          },
          defense: {
            question: 'Why do relational engines manage their own buffer pool instead of relying on the OS page cache?',
            answer: 'OS page cache uses generic LRU and has zero understanding of relational semantics (e.g. sequential scan pollution, dirty page flushing order, or WAL Write-Ahead logging invariants). DBMS buffer pools enforce PageLSN <= FlushedLSN before write, pin pages in memory to prevent eviction during query execution, and implement specialized page replacement like 2Q or LRU-K.'
          },
          snippet: '// DBMS User-Space Buffer Pool Lookup\nPage* page = buffer_pool_manager->FetchPage(page_id);\npage->RLatch(); // Shared lock for read'
        },
        {
          stepNum: 2,
          name: 'Page Table Hash Lookup (O(1))',
          box: { x: 272, y: 98, w: 424, h: 62 },
          beacon: { x: 374, y: 128 },
          telemetry: {
            hardware: 'Hash Map Bucket: Murmur3_x64 · L2 Cache Line match (64 bytes)',
            invariant: 'Page Table maps PageID (disk identifier) to FrameID (RAM buffer index).',
            kernel: 'Bucket array lock: Read-biased partitioned rwlock · Contention: 0.02%',
            state: 'PageID: 1048 -> FrameID: 03 | Latency: 42ns | Hit: TRUE'
          },
          defense: {
            question: 'How do production engines prevent hash table latch contention during high-concurrency lookups?',
            answer: 'Instead of a global lock on the page table, engines partition the hash map into hundreds of independent stripes (or buckets) with striped reader-writer locks, or use concurrent lock-free hash tries with Hazard Pointers (like in modern MySQL 8 InnoDB buffer pool instances).'
          },
          snippet: 'size_t bucket = hash(page_id) % num_partitions;\nstd::shared_lock<std::shared_mutex> lck(bucket_latches[bucket]);\nFrameID frame_id = page_table[bucket].find(page_id);'
        },
        {
          stepNum: 3,
          name: 'Frame Buffer Memory Slot Pinning',
          box: { x: 272, y: 170, w: 424, h: 88 },
          beacon: { x: 320, y: 210 },
          telemetry: {
            hardware: 'DRAM Read: 8,192 byte Slotted Page mapped directly to CPU registers',
            invariant: 'Pin Count increments (Pin=1). Eviction algorithm cannot evict pinned frames.',
            kernel: 'LRU-2 queue position updated · Clock-pro scan hand ignores pinned slot',
            state: 'Frame: 03 | PinCount: 1 | DirtyBit: 0 | PageLSN: 49118'
          },
          defense: {
            question: 'What is a "buffer pool pin" and what catastrophe happens if a worker forgets to unpin a page?',
            answer: 'A pin is a reference counter on a frame buffer memory slot that prevents the buffer replacement policy from evicting or overwriting that frame while active threads are reading/modifying its slotted tuples. If a thread leaks a pin, the frame can never be evicted. Under memory pressure, the free list starves and queries stall with "Buffer pool exhausted".'
          },
          snippet: 'frames[frame_id].pin_count.fetch_add(1, std::memory_order_relaxed);\nframes[frame_id].last_accessed = rdtsc();\nreturn &frames[frame_id].page_data;'
        },
        {
          stepNum: 4,
          name: 'WAL Flush Invariant & Tablespace Checkpoint',
          box: { x: 760, y: 62, w: 212, h: 208 },
          beacon: { x: 866, y: 166 },
          telemetry: {
            hardware: 'NVMe Storage: Sequential WAL write (4KB) vs Random Page Checkpoint (8KB)',
            invariant: 'WAL INVARIANT: PageLSN <= FlushedLSN must hold before any dirty page writes to disk.',
            kernel: 'fsync() on WAL log descriptor · Asynchronous DBWR background thread flushes dirty pages',
            state: 'WAL FlushedLSN: 49120 | PageLSN: 49118 | Checkpoint: FUZZY'
          },
          defense: {
            question: 'Explain the difference between a synchronous WAL flush and a background dirty page flush.',
            answer: 'A transaction COMMIT requires synchronous sequential fsync of WAL records up to the commit LSN to guarantee durability. Dirty 8KB buffer pages, however, are flushed asynchronously in the background by DBWR using fuzzy checkpoints. This turns random I/O into sequential log appends during critical commit paths.'
          },
          snippet: '// Enforce Write-Ahead Logging Invariant\nif (page->GetLSN() > wal_manager->GetFlushedLSN()) {\n  wal_manager->FlushWAL(page->GetLSN());\n}\n// Safe to flush page to NVMe tablespace'
        }
      ]
    },

    btree_index: {
      id: 'btree_index',
      title: 'B+ Tree Clustered & Non-Clustered Traversal',
      badge: 'INDEX ENGINE',
      scenarios: [
        { id: 'point', title: 'Point Lookup (id = 42)', desc: 'Descend from Root to Leaf via binary search on separator keys. O(log N).' },
        { id: 'range', title: 'Range Scan (id BETWEEN 20 AND 80)', desc: 'Seek starting leaf, then follow doubly-linked next pointers without climbing tree.' },
        { id: 'split', title: 'Leaf Node 50/50 Split', desc: 'Node insertion exceeds page capacity. Allocates sibling page and promotes pivot key.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Root Node Binary Search & Latch Crab',
          box: { x: 28, y: 62, w: 284, h: 208 },
          beacon: { x: 170, y: 166 },
          telemetry: {
            hardware: 'CPU L1 Cache: Root node page permanently resident in DRAM cache',
            invariant: 'Root node latched in Shared mode (Crabbing). Compares key against separator pivots.',
            kernel: 'Binary search over 250 sorted 64-bit integer keys: 8 CPU comparisons',
            state: 'RootPage: 1 | Key: 42 | PivotMatch: [20, 50) -> Child Page 12'
          },
          defense: {
            question: 'Why do B+ trees prefer wide fan-out (e.g. order 250-500) over binary search trees (BST)?',
            answer: 'Disk and flash memory read data in block pages (typically 8KB to 16KB). A wide B+ tree node fits hundreds of keys in a single page, minimizing tree depth to 3 or 4 levels for millions of records. A tree with fan-out 500 can index 125,000,000 records in only 3 levels (Root -> Internal -> Leaf), requiring at most 3 I/O reads.'
          },
          snippet: 'Node* root = FetchPage(root_page_id);\nroot->RLatch();\nint child_idx = std::upper_bound(root->keys, root->keys + n, search_key) - root->keys;'
        },
        {
          stepNum: 2,
          name: 'Internal Node Branch Routing & Downward Crab',
          box: { x: 334, y: 62, w: 300, h: 208 },
          beacon: { x: 484, y: 166 },
          telemetry: {
            hardware: 'DRAM Frame Buffer Hit · Latch crabbing releases Root, holds Internal Node',
            invariant: 'Internal nodes store only keys and child page IDs (no data tuples or payload).',
            kernel: 'Branch prediction optimized · Zero heap allocations',
            state: 'InternalPage: 12 | Key Range: [20, 50) -> Leaf Child Page 42'
          },
          defense: {
            question: 'What is "Latch Crabbing" (or Latch Coupling) and why is it essential for concurrency?',
            answer: 'Latch crabbing is the protocol where a thread acquiring child page latch L_child only releases parent page latch L_parent after confirming the child node is safe (i.e. will not split on insert or merge on delete). This ensures concurrent traversals never encounter partially split B-tree structures.'
          },
          snippet: 'Node* child = FetchPage(child_page_id);\nchild->RLatch();\nroot->RUnlatch(); // Release parent once child is safely pinned and latched'
        },
        {
          stepNum: 3,
          name: 'Leaf Node Pinning & Slotted Tuple TID Lookup',
          box: { x: 656, y: 62, w: 316, h: 208 },
          beacon: { x: 814, y: 140 },
          telemetry: {
            hardware: 'Slotted Page Layout: Binary search on page slot directory (Slot 0..N)',
            invariant: 'Leaf page contains all payload tuples or Tuple Identifiers (TID = PageID + SlotID).',
            kernel: 'Clustered table: payload in leaf · Non-clustered: secondary index points to PK/TID',
            state: 'LeafPage: 42 | Found: TRUE | Record: id=42, val="ACTIVE" | Latency: 0.18ms'
          },
          defense: {
            question: 'What is the performance difference between a Clustered Index and a Non-Clustered Index?',
            answer: 'In a Clustered Index (e.g. MySQL InnoDB Primary Key), the leaf node stores the entire actual row data. A lookup completes at the leaf. In a Non-Clustered Secondary Index, the leaf stores only the indexed key and the clustered primary key (or TID). Finding full rows requires a secondary lookup ("Bookmark Lookup") in the clustered tree, unless the query is satisfied by a Covering Index.'
          },
          snippet: 'SlotOffset offset = leaf->slot_dir[slot_idx];\nTuple* tuple = reinterpret_cast<Tuple*>(leaf->data + offset);\nreturn tuple;'
        },
        {
          stepNum: 4,
          name: 'High-Speed Doubly-Linked Leaf Range Scan',
          box: { x: 656, y: 190, w: 316, h: 80 },
          beacon: { x: 814, y: 228 },
          telemetry: {
            hardware: 'Sequential Memory / NVMe Prefetcher · Next page pre-loaded into buffer pool',
            invariant: 'Leaf pages are doubly linked: leaf->next_page_id allows linear scans without tree re-traversal.',
            kernel: 'Prefetch window: 8 pages · CPU cache prefetch instruction: __builtin_prefetch',
            state: 'CurrentPage: 42 -> NextPage: 43 -> NextPage: 44 | Tuples scanned: 1,420/ms'
          },
          defense: {
            question: 'Why do B+ trees keep leaf nodes doubly linked instead of singly linked?',
            answer: 'Doubly linked leaf pages allow bidirectional scans: both ASCENDING (`ORDER BY id ASC`) and DESCENDING (`ORDER BY id DESC`) scans can traverse the leaves sequentially with zero parent re-traversal. Furthermore, concurrent node deletion and sibling merging require backward pointers to update neighbor references atomically.'
          },
          snippet: 'while (tuple->key <= end_key) {\n  emit(tuple);\n  if (at_end_of_page) leaf = FetchPage(leaf->next_page_id);\n}'
        }
      ]
    },

    hash_join: {
      id: 'hash_join',
      title: 'In-Memory Hash Join Engine: Build vs Probe',
      badge: 'JOIN ENGINE',
      scenarios: [
        { id: 'in_mem', title: 'In-Memory Grace Hash Join', desc: 'Build relation fits entirely within work_mem. Zero disk spill.' },
        { id: 'collision', title: 'Hash Collision Handling', desc: 'Murmur3 hash collision resolved via bucket linked-list chaining.' },
        { id: 'spill', title: 'Hybrid Hash Join (Disk Spill)', desc: 'Build relation exceeds memory limit. Flushes partitioned buckets to scratch files.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Hash Key Evaluation (Inner Build Table)',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'CPU SIMD: Vectorized hash calculation (Murmur3_x64 or xxHash64)',
            invariant: 'Smaller table selected as Build Relation by Cost-Based Optimizer (CBO).',
            kernel: 'Throughput: 40 Million keys/sec · 64-bit integer keys mapped to uint64_t hash',
            state: 'Build Relation: orders (2,000 rows) | HashKey: user_id=42 -> 0x8F3A019C'
          },
          defense: {
            question: 'Why does the Query Optimizer always pick the smaller table as the Hash Join build relation?',
            answer: 'The build relation must be materialized in RAM to construct the hash table. Choosing the smaller table minimizes memory consumption, prevents spilling to disk, and maximizes CPU L1/L2/L3 cache residency. The larger table can then stream through as the probe relation without ever being buffered in memory.'
          },
          snippet: 'uint64_t hash_val = MurmurHash3_x64_128(&key, sizeof(key), seed);'
        },
        {
          stepNum: 2,
          name: 'Hash Bucket Memory Array Allocation',
          box: { x: 268, y: 62, w: 430, h: 208 },
          beacon: { x: 483, y: 130 },
          telemetry: {
            hardware: 'Power-of-Two Bucket Array: bucket_idx = hash & (num_buckets - 1)',
            invariant: 'Collision resolution via contiguous bucket pointers or linked list chunks.',
            kernel: 'Allocation: work_mem (4MB) · Cache-line aligned struct: 64 bytes per bucket entry',
            state: 'Buckets: 4,096 | Load Factor: 0.48 | Collisions: 1.2%'
          },
          defense: {
            question: 'What happens if a hash join encounters severe hash skew (e.g. 90% of rows have the same foreign key)?',
            answer: 'Hash skew degrades bucket lookup from O(1) to O(K) where K is the length of the collision chain, causing CPU cache misses and hot-spot worker threads. Modern engines detect skew during runtime statistics and can dynamically switch to Nested Loop with Index Scan or broadcast hash join partitions.'
          },
          snippet: 'size_t bucket_idx = hash_val & (bucket_count - 1);\nbuckets[bucket_idx].push_back({hash_val, payload});'
        },
        {
          stepNum: 3,
          name: 'Streaming Outer Probe Pipeline',
          box: { x: 720, y: 62, w: 252, h: 100 },
          beacon: { x: 846, y: 112 },
          telemetry: {
            hardware: 'Zero Memory Buffering: Outer probe table streams tuple by tuple',
            invariant: 'Each probe tuple computes hash and probes bucket array once. O(N) total probe time.',
            kernel: 'Prefetching bucket address into L1 data cache before tuple arrives',
            state: 'Probe Relation: users (100,000 rows) | CurrentTuple: user_id=42 -> MATCH'
          },
          defense: {
            question: 'Can a Hash Join produce output tuples before the entire build table has finished reading?',
            answer: 'No. Hash Join is a "pipeline breaker" (blocking operator) for the build phase. The entire build relation must be completely scanned and indexed in the hash table before the first probe tuple can be evaluated and the first match emitted. The probe phase, however, is fully streaming.'
          },
          snippet: 'while (probe_child->Next(&probe_tuple)) {\n  uint64_t h = Hash(probe_tuple.key);\n  Bucket* b = &buckets[h & mask];\n  for (auto& entry : b->entries) if (entry.key == probe_tuple.key) emit_join();\n}'
        },
        {
          stepNum: 4,
          name: 'Match Emission & Spill Partition Resolution',
          box: { x: 720, y: 172, w: 252, h: 98 },
          beacon: { x: 846, y: 220 },
          telemetry: {
            hardware: 'Volcano Output Stream: Joined tuples passed directly to parent operator in RAM',
            invariant: 'Output cardinality = Build Matches * Probe Frequency.',
            kernel: 'Zero temp disk I/O when resident · Spilled partitions handled via recursive Grace hash join',
            state: 'Joined Tuples Emitted: 4,820 | Temp Disk Spill: 0 bytes (CLEAN)'
          },
          defense: {
            question: 'How does Grace Hash Join handle situations where even one partition spills to disk?',
            answer: 'Grace Hash Join partitions both build and probe tables into N disk buckets using hash function H1. It then loads each build partition into RAM one by one and probes with the corresponding probe partition using independent hash function H2. If an individual partition still exceeds work_mem, it applies recursive partitioning.'
          },
          snippet: 'emit_joined_tuple(probe_tuple, matched_build_tuple);'
        }
      ]
    },

    wal_aries: {
      id: 'wal_aries',
      title: 'WAL & ARIES 3-Pass Crash Recovery Protocol',
      badge: 'DURABILITY ENGINE',
      scenarios: [
        { id: 'standard', title: 'Standard 3-Pass Recovery', desc: 'Analysis, Redo (History repeating), and Undo (Rollback losers).' },
        { id: 'crash_redo', title: 'Crash During Redo Pass', desc: 'Demonstrates idempotence: re-running Redo produces identical state.' },
        { id: 'crash_undo', title: 'Crash During Undo Pass', desc: 'Compensation Log Records (CLRs) prevent infinite undo loops.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Write-Ahead Invariant Enforcement',
          box: { x: 28, y: 62, w: 200, h: 208 },
          beacon: { x: 128, y: 166 },
          telemetry: {
            hardware: 'Sequential NVMe WAL Buffer flush: O_DIRECT sync write',
            invariant: 'WAL INVARIANT: PageLSN <= FlushedLSN. Unwritten log records never outrun dirty pages.',
            kernel: 'Log Sequence Number (LSN) monotonically increments for every byte written',
            state: 'FlushedLSN: 49120 | LastCheckpointLSN: 49000 | DirtyPages: 5'
          },
          defense: {
            question: 'Why is WAL sequential I/O so much faster than writing dirty table pages directly to disk?',
            answer: 'Table pages are scattered across different physical locations on disk (random I/O, requiring costly seek or flash block erasures). WAL records are appended sequentially to a single contiguous log file. A sequential append achieves 10x-100x higher throughput, allowing the DBMS to guarantee ACID durability with minimal latency.'
          },
          snippet: 'assert(page->header.page_lsn <= wal->GetFlushedLSN());'
        },
        {
          stepNum: 2,
          name: 'Pass 1: Analysis Pass (Reconstructing System State)',
          box: { x: 248, y: 62, w: 230, h: 208 },
          beacon: { x: 363, y: 166 },
          telemetry: {
            hardware: 'RAM Reconstruction: Scans WAL forward from last Checkpoint record',
            invariant: 'Reconstructs Dirty Page Table (DPT) and Active Transaction Table (ATT).',
            kernel: 'Calculates smallest recLSN across all dirty pages to determine Redo start point',
            state: 'ATT: [Txn-1: COMMIT, Txn-2: ACTIVE] | DPT: [Page-1048: recLSN=49020]'
          },
          defense: {
            question: 'What is the purpose of the Analysis Pass in ARIES crash recovery?',
            answer: 'The Analysis Pass scans forward from the most recent checkpoint to determine: (1) which transactions were active at the time of the crash (the "losers" that must be undone), (2) which pages were dirty in the buffer pool and their oldest unwritten LSN (recLSN), and (3) the exact point in the log where the Redo Pass must begin.'
          },
          snippet: 'for (auto lsn = checkpoint_lsn; lsn <= max_lsn; lsn = wal->Next(lsn)) {\n  if (wal[lsn].type == TXN_BEGIN) att.insert(wal[lsn].txn_id);\n  if (wal[lsn].type == TXN_COMMIT) att.erase(wal[lsn].txn_id);\n}'
        },
        {
          stepNum: 3,
          name: 'Pass 2: Redo Pass (Repeating History)',
          box: { x: 498, y: 62, w: 230, h: 208 },
          beacon: { x: 613, y: 166 },
          telemetry: {
            hardware: 'Forward Replay: Applies all logged updates, including uncommitted loser operations',
            invariant: 'IDEMPOTENCE: If PageLSN >= LogRecord.LSN, the update was already persisted; skip it.',
            kernel: 'Replays history exactly to restore database to the precise physical microsecond of crash',
            state: 'RedoStartLSN: 49020 -> CurrentRedoLSN: 49120 | Redo Operations: 14 applied'
          },
          defense: {
            question: 'Why does ARIES Redo pass re-apply changes for transactions that ultimately aborted or crashed?',
            answer: 'This is the "Repeating History" paradigm. By replaying all logged physical changes forward (including those of loser transactions), ARIES brings the database to the exact state it was in at the instant of crash. This eliminates complex edge cases and ensures fine-grained page invariants (like space maps and B-tree links) are valid before Undo begins.'
          },
          snippet: 'if (page->page_lsn < log_record.lsn) {\n  ApplyLogRecord(page, log_record);\n  page->page_lsn = log_record.lsn;\n}'
        },
        {
          stepNum: 4,
          name: 'Pass 3: Undo Pass & Compensation Log Records (CLRs)',
          box: { x: 748, y: 62, w: 224, h: 208 },
          beacon: { x: 860, y: 166 },
          telemetry: {
            hardware: 'Reverse Rollback: Traverses PrevLSN backwards for all active uncommitted transactions',
            invariant: 'Every reversed action writes a Compensation Log Record (CLR) with UndoNextLSN.',
            kernel: 'If recovery crashes during Undo, it never repeats previously undone operations',
            state: 'Undone Txns: [Txn-2] | CLRs Written: 3 | Database State: 100% RECOVERED'
          },
          defense: {
            question: 'What is a Compensation Log Record (CLR) and why is its UndoNextLSN pointer critical?',
            answer: 'A CLR is a special WAL record written during rollback that records the reversal of an update. Crucially, it stores UndoNextLSN (a pointer to the next undo action of that transaction). If the system crashes again while recovering, ARIES reads the CLR and immediately jumps to UndoNextLSN, guaranteeing the system never gets stuck in an infinite undo loop.'
          },
          snippet: 'while (!att.empty()) {\n  auto [max_lsn, txn_id] = GetMaxUndoLSN(att);\n  LogRecord clr = GenerateCLR(wal[max_lsn]);\n  wal->Append(clr);\n  UndoAction(clr);\n}'
        }
      ]
    },

    query_optimizer: {
      id: 'query_optimizer',
      title: 'Cost-Based Optimizer (CBO) & Volcano Iterator Tree',
      badge: 'PLANNER ENGINE',
      scenarios: [
        { id: 'pushdown', title: 'Predicate Pushdown', desc: 'Push filters below joins to prune cardinality early.' },
        { id: 'join_order', title: 'Join Order DP Search', desc: 'Dynamic programming search space over N! join permutations.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Lexing, Parsing & Abstract Syntax Tree (AST)',
          box: { x: 28, y: 62, w: 180, h: 208 },
          beacon: { x: 118, y: 166 },
          telemetry: {
            hardware: 'CPU Core: Lexer tokens -> Bison/LALR(1) parser grammar rules',
            invariant: 'AST validates catalog metadata (schema, column types, table existence).',
            kernel: 'Syntax tree allocated in arena memory · Zero disk I/O',
            state: 'Query: SELECT id, sum(val) FROM tbl WHERE id>10 GROUP BY id'
          },
          defense: {
            question: 'What is the distinction between AST Parsing and Semantic Analysis in a query compiler?',
            answer: 'Parsing ensures the SQL conforms to formal SQL grammar rules and builds an Abstract Syntax Tree. Semantic Analysis resolves identifiers against the system catalog (checking if table "users" and column "email" actually exist), verifies type compatibility, resolves aliases, and enforces user security permissions.'
          },
          snippet: 'ASTNode* ast = SQLParser::Parse(sql_string);\nCatalog::BindAndValidate(ast, user_credentials);'
        },
        {
          stepNum: 2,
          name: 'Logical Plan Optimization & Predicate Pushdown',
          box: { x: 228, y: 62, w: 220, h: 208 },
          beacon: { x: 338, y: 166 },
          telemetry: {
            hardware: 'Rule-Based Transformation Engine: Relational Algebra Rewrites',
            invariant: 'PREDICATE PUSHDOWN: σ(R ⋈ S) = σ(R) ⋈ S when filter touches only R.',
            kernel: 'Prunes projections early · Filters applied before cartesian expansion',
            state: 'Rules Applied: FilterPushdown, ProjectionPruning, DeadBranchElim'
          },
          defense: {
            question: 'Why is Predicate Pushdown one of the most critical relational optimizations?',
            answer: 'Evaluating predicates before joins shrinks the cardinality of intermediate tuples early in the execution DAG. Reducing input relation size from 1,000,000 to 1,000 rows prior to a join turns a multi-gigabyte disk-spilling operation into an instantaneous in-memory L1 cache probe.'
          },
          snippet: 'LogicalPlan* plan = RulePredicatePushdown::Apply(ast);\nplan = RuleProjectionPrune::Apply(plan);'
        },
        {
          stepNum: 3,
          name: 'Cost Model & HyperLogLog Cardinality Estimation',
          box: { x: 468, y: 62, w: 240, h: 208 },
          beacon: { x: 588, y: 166 },
          telemetry: {
            hardware: 'Stats Catalog: HyperLogLog sketches & Equal-Depth Frequency Histograms',
            invariant: 'Cost = (CPU_weight * Instructions) + (IO_weight * Page_Fetches).',
            kernel: 'Dynamic programming or Genetic Algorithm selects lowest total cost physical plan',
            state: 'CardEst: 1,420 rows | Cost(HashJoin)=14.2 | Cost(NestedLoop)=820.4 -> Pick HashJoin'
          },
          defense: {
            question: 'Why do query optimizers make catastrophic errors when table statistics are stale?',
            answer: 'Optimizers depend on histograms and distinct-value counters to estimate intermediate cardinalities. If stats are stale, the optimizer might estimate 10 rows when there are actually 10,000,000, causing it to select an unindexed Nested Loop Join that runs for hours instead of a 2-second Hash Join.'
          },
          snippet: 'double cost = CardEst(filter) * CPU_COST + EstPages(table) * IO_PAGE_COST;\nif (cost < best_cost) best_plan = candidate_plan;'
        },
        {
          stepNum: 4,
          name: 'Physical Volcano Iterator Pipeline (next())',
          box: { x: 728, y: 62, w: 244, h: 208 },
          beacon: { x: 850, y: 166 },
          telemetry: {
            hardware: 'Pull-Based Iterator: open() -> next() -> close() interface',
            invariant: 'Zero full intermediate materialization: tuples stream on demand directly to client.',
            kernel: 'Virtual function call overhead mitigated via JIT compilation or batching',
            state: 'RootOperator: HashAggregate.next() -> HashJoin.next() -> SeqScan.next()'
          },
          defense: {
            question: 'What is the Volcano (or Pipeline Iterator) model and what is its primary bottleneck?',
            answer: 'In the Volcano model, every relational operator implements next(), pulling one tuple at a time from its children. Its benefit is zero intermediate memory storage. Its primary bottleneck is high CPU instruction overhead from calling a virtual function next() for every single row, causing CPU branch mispredictions and cache thrashing on large datasets.'
          },
          snippet: 'bool HashJoinOperator::Next(Tuple* out_tuple) {\n  while (probe_child->Next(&probe_tuple)) {\n    if (Probe(probe_tuple, out_tuple)) return true;\n  }\n  return false;\n}'
        }
      ]
    },

    mvcc: {
      id: 'mvcc',
      title: 'MVCC Snapshot Isolation & Tuple Version Chains',
      badge: 'CONCURRENCY ENGINE',
      scenarios: [
        { id: 'snapshot', title: 'Snapshot Read (No Locks)', desc: 'Reads never block writes; writes never block reads.' },
        { id: 'vacuum', title: 'VACUUM Dead Tuple Reclaim', desc: 'Background autovacuum sweeps old xmax versions below horizon.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Snapshot Generation & Horizon Acquisition',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'Atomic Transaction Array Read: lock-free snapshot capture',
            invariant: 'Snapshot stores: xmin (oldest active txn), xmax (next txn ID), active_txns list.',
            kernel: 'DRAM Read · Zero locks acquired on table rows or pages',
            state: 'CurrentTxn: 105 | Snapshot: [xmin: 100, xmax: 105, active: {102, 104}]'
          },
          defense: {
            question: 'How does MVCC achieve "readers never block writers and writers never block readers"?',
            answer: 'When a transaction modifies or deletes a row, it does not overwrite the data in place; it appends a new version of the tuple with its transaction ID in xmin/xmax headers. Readers inspect these headers against their snapshot timestamp and read the older, valid version of the row without holding read locks.'
          },
          snippet: 'Snapshot snap = txn_manager->GetSnapshot();\n// snap.xmin: lowest running txn\n// snap.active: list of in-flight txns'
        },
        {
          stepNum: 2,
          name: 'Tuple Header Inspection (xmin / xmax)',
          box: { x: 268, y: 62, w: 430, h: 208 },
          beacon: { x: 483, y: 140 },
          telemetry: {
            hardware: 'Tuple Header: 24 bytes overhead (xmin, xmax, t_ctid, infomasks)',
            invariant: 'Tuple visible IF xmin committed AND (xmax uncommitted OR xmax > snapshot.xmax).',
            kernel: 'Evaluates bitwise infomasks (HEAP_XMIN_COMMITTED, HEAP_XMAX_INVALID)',
            state: 'TupleHeader: xmin=100 (COMMITTED), xmax=102 (IN_FLIGHT) -> VISIBLE TO SNAPSHOT'
          },
          defense: {
            question: 'What is the "Transaction ID Wraparound" problem in PostgreSQL MVCC and how is it resolved?',
            answer: 'PostgreSQL uses 32-bit transaction IDs, which wrap around after 4 billion transactions. To prevent old historical rows from suddenly appearing in the future, PostgreSQL uses modular comparison and a background VACUUM process that freezes old xids (setting a special HEAP_XMIN_FROZEN bit), treating them as permanently older than all active transactions.'
          },
          snippet: 'bool IsVisible(Tuple* t, Snapshot* snap) {\n  if (!TransactionIdDidCommit(t->xmin)) return false;\n  if (t->xmax != 0 && TransactionIdDidCommit(t->xmax) && t->xmax < snap->xmax) return false;\n  return true;\n}'
        },
        {
          stepNum: 3,
          name: 'In-Page Version Chain Traversal (t_ctid)',
          box: { x: 720, y: 62, w: 252, h: 100 },
          beacon: { x: 846, y: 112 },
          telemetry: {
            hardware: 'Pointer Chasing: t_ctid points to next physical tuple location on page',
            invariant: 'Updates are physically represented as DELETE (old xmax set) + INSERT (new xmin set).',
            kernel: 'HOT (Heap-Only Tuples) optimization avoids modifying secondary index pointers',
            state: 'Version Chain: (Page 1, Slot 1) -> (Page 1, Slot 4) | Length: 2 versions'
          },
          defense: {
            question: 'What is Heap-Only Tuple (HOT) optimization in MVCC engines?',
            answer: 'Normally, updating a row requires adding a new version and updating all secondary index pointers to the new tuple TID. HOT allows the new version to be stored on the exact same 8KB page as the old version without updating secondary indexes; the index points to the root tuple, which contains an in-page pointer forwarding to the new version.'
          },
          snippet: 'while (tuple->t_ctid != tuple->self_tid) {\n  tuple = FetchTuple(tuple->t_ctid);\n  if (IsVisible(tuple, snapshot)) return tuple;\n}'
        },
        {
          stepNum: 4,
          name: 'Autovacuum Garbage Collection & Freeze',
          box: { x: 720, y: 172, w: 252, h: 98 },
          beacon: { x: 846, y: 220 },
          telemetry: {
            hardware: 'Background Worker: Sweeps pages with dead tuple ratio > 20%',
            invariant: 'Tuples where xmax < OldestActiveTransaction are dead to all future readers; safe to prune.',
            kernel: 'Reclaims page slot directory offsets · Updates free space map (FSM)',
            state: 'Dead Tuples Cleaned: 8,420 | Pages Compacted: 42 | Free Space Reclaimed: 34MB'
          },
          defense: {
            question: 'What happens to write performance if Autovacuum is turned off or severely throttled?',
            answer: 'Without autovacuum, dead tuple versions accumulate indefinitely (table bloat). Queries must scan millions of obsolete versions, causing massive buffer pool pollution, high NVMe I/O, degraded B-tree index performance, and eventually a system halt when the 32-bit transaction ID wraps around.'
          },
          snippet: 'if (tuple->xmax != 0 && tuple->xmax < oldest_active_xid) {\n  MarkSlotDead(page, slot_id);\n  fsm->RecordFreeSpace(page_id, sizeof(tuple));\n}'
        }
      ]
    },

    lsm_tree: {
      id: 'lsm_tree',
      title: 'LSM-Tree Storage Engine: MemTable to SSTables',
      badge: 'WRITE-OPTIMIZED',
      scenarios: [
        { id: 'write', title: 'Fast Ingestion & MemTable Flush', desc: '100% sequential appends to WAL and SkipList MemTable.' },
        { id: 'compact', title: 'Leveled Merge Compaction', desc: 'Merges overlapping L0 SSTables into L1, removing tombstones.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Concurrent SkipList MemTable & Sequential WAL',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'DRAM SkipList: Lock-free CAS pointer updates · 100% sequential WAL append',
            invariant: 'Zero random disk writes on ingestion path. O(log N) in-memory insertion.',
            kernel: 'Write throughput: 250,000 ops/sec · O_DIRECT sequential fsync on WAL',
            state: 'MemTable Size: 61MB / 64MB | WAL LSN: 810420'
          },
          defense: {
            question: 'Why does an LSM-tree (like RocksDB, Cassandra, ClickHouse) deliver vastly higher write throughput than a B+ tree?',
            answer: 'A B+ tree performs random writes to dirty 8KB/16KB pages on disk when keys are inserted across different tablespaces. An LSM tree converts all inserts, updates, and deletes into pure sequential appends to an in-memory MemTable and WAL log. Sequential writes are orders of magnitude faster than random writes on both HDDs and NVMe SSDs.'
          },
          snippet: 'wal->Append({key, value, lsn});\nmemtable->Insert(key, value); // Concurrent SkipList'
        },
        {
          stepNum: 2,
          name: 'Immutable MemTable Freeze & Flush to L0 SSTable',
          box: { x: 268, y: 62, w: 220, h: 208 },
          beacon: { x: 378, y: 166 },
          telemetry: {
            hardware: 'Background Flush: Flushes immutable 64MB memory chunk to sequential disk file',
            invariant: 'SSTables (Sorted String Tables) are 100% immutable once written.',
            kernel: 'Direct sequential stream write · Generates SSTable index block and Bloom filter',
            state: 'Flushed File: 0048.sst | Level: L0 | Keys: 124,000 | Size: 48.2 MB'
          },
          defense: {
            question: 'Why are SSTables strictly immutable once written?',
            answer: 'Immutability eliminates write contention, concurrency locks, and in-place page corruption. Reads can access SSTables without read locks, caching file descriptors and block caches safely. Crash recovery is simplified because data files are never partially overwritten, and compaction can run in the background.'
          },
          snippet: 'MemTable* imm = memtable;\nmemtable = new MemTable();\nbackground_threads.enqueue([imm]() { FlushToSSTable(imm, Level::L0); });'
        },
        {
          stepNum: 3,
          name: 'Bloom Filter Accelerated Point Read',
          box: { x: 508, y: 62, w: 220, h: 208 },
          beacon: { x: 618, y: 166 },
          telemetry: {
            hardware: 'CPU Bitwise AND: Bloom filter bitmask check (10 bits per key)',
            invariant: 'Bloom filter guarantee: Zero false negatives. If filter says NO, key is NOT in file.',
            kernel: 'Skips 99% of SSTable disk seeks · 1% false positive rate',
            state: 'Key: "user:842" | L0: NO (SKIP) | L1: NO (SKIP) | L2: YES (PROBE) -> FOUND'
          },
          defense: {
            question: 'What is the Read Amplification problem in LSM-trees and how do Bloom Filters solve it?',
            answer: 'Because updates are appended over time, finding a key might require searching across the MemTable and every single SSTable across all levels (Read Amplification). Bloom filters store a compact bit array for each SSTable; testing the key against the filter immediately proves whether the key is absent, avoiding 99% of unnecessary disk block reads.'
          },
          snippet: 'if (!sst->bloom_filter.MayContain(key)) {\n  return NotFound(); // Skip reading SSTable blocks from disk entirely!\n}'
        },
        {
          stepNum: 4,
          name: 'Leveled Merge Compaction & Tombstone Purge',
          box: { x: 748, y: 62, w: 224, h: 208 },
          beacon: { x: 860, y: 166 },
          telemetry: {
            hardware: 'Multi-Way Merge Sort: K-way streaming merge of sorted SSTable runs',
            invariant: 'Purges deleted keys (Tombstones) and coalesces duplicate versions.',
            kernel: 'Level N capacity = 10 * Level N-1 · Zero overlapping key ranges in L1..LN',
            state: 'Compacting: L0 (3 files) + L1 (4 files) -> L1 Clean (5 files) | Deleted: 18,200 rows'
          },
          defense: {
            question: 'How do LSM trees delete records if files are immutable, and when is space actually reclaimed?',
            answer: 'Deletions write a special marker called a "Tombstone" into the MemTable. During normal reads, encountering a tombstone signals the key does not exist. Space is only reclaimed during Leveled Compaction when the tombstone and the older version of the key are merged together at the oldest level containing that key.'
          },
          snippet: 'while (merge_iterator->Valid()) {\n  if (merge_iterator->IsTombstone() && at_bottom_level) {\n    merge_iterator->Next(); // Drop tombstone forever\n  } else {\n    output_sst->Append(merge_iterator->Key(), merge_iterator->Value());\n  }\n}'
        }
      ]
    },

    columnar_simd: {
      id: 'columnar_simd',
      title: 'Columnar Storage & SIMD Vectorized Execution',
      badge: 'ANALYTICS ENGINE',
      scenarios: [
        { id: 'simd_filter', title: 'AVX-512 Vectorized Filter', desc: 'Evaluates 8 x 64-bit predicates in a single CPU clock cycle.' },
        { id: 'row_vs_col', title: 'Row vs Column Cache Misses', desc: 'Demonstrates 10x memory bandwidth savings on analytical aggregations.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Column Decomposition & Vector Packing',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'Contiguous Physical Memory: Column data packed sequentially in DRAM arrays',
            invariant: 'Analytical query scanning 2 columns touches ONLY those 2 columns in memory.',
            kernel: 'Cache line utilization: 100% · Zero wasted memory bus bandwidth on unneeded attributes',
            state: 'Table: 100 columns | Query needs: [revenue, tax] | Bandwidth saved: 98%'
          },
          defense: {
            question: 'Why are columnar formats (e.g. Parquet, ClickHouse, DuckDB) superior for OLAP queries?',
            answer: 'OLAP queries typically aggregate millions of rows but touch only a few columns (e.g. `SUM(amount)`). In a row store, fetching a column requires reading the entire 500-byte row into CPU cache, wasting 95% of memory bus bandwidth. Columnar storage reads only the contiguous bytes of the required column, achieving maximum memory bandwidth and vectorization.'
          },
          snippet: 'struct ColumnChunk {\n  int64_t* data;\n  size_t count;\n}; // 100% contiguous array of 64-bit integers'
        },
        {
          stepNum: 2,
          name: 'Dictionary & Run-Length Encoding (RLE)',
          box: { x: 268, y: 62, w: 220, h: 208 },
          beacon: { x: 378, y: 166 },
          telemetry: {
            hardware: 'Bit-Packed Integer Representation: String values replaced by 1-byte dict IDs',
            invariant: 'RLE compresses repeated sequences: ("USA", 1000 times) -> ("USA", 1000).',
            kernel: 'Compression ratio: 5x - 10x · Allows query evaluation directly on compressed bytes',
            state: 'Column: country | Unique values: 12 | Bit width: 4 bits | Compression: 88%'
          },
          defense: {
            question: 'Can analytical engines execute SQL filters directly on compressed data without decompressing?',
            answer: 'Yes! With dictionary encoding, filtering `WHERE country = "USA"` translates the string "USA" once into dictionary ID 3, and then scans the bit-packed array searching for the byte 3. With RLE, skipping entire compressed runs avoids scanning millions of individual rows entirely.'
          },
          snippet: 'int dict_id = dictionary.Lookup("USA"); // 3\n// Scan compressed array for byte 3 directly'
        },
        {
          stepNum: 3,
          name: 'AVX-512 Vector Register SIMD Execution',
          box: { x: 508, y: 62, w: 220, h: 208 },
          beacon: { x: 618, y: 166 },
          telemetry: {
            hardware: '512-bit ZMM CPU Registers: __m512i holds 8 x 64-bit integers simultaneously',
            invariant: 'SIMD (Single Instruction, Multiple Data): 1 CPU cycle evaluates 8 comparisons.',
            kernel: '_mm512_cmpgt_epi64_mask produces 8-bit match bitmask in single cycle',
            state: 'Vector Registers: ZMM0..ZMM3 | Throughput: 4.2 Billion rows/sec / core'
          },
          defense: {
            question: 'How does Vectorized Execution (like DuckDB/ClickHouse) differ from Compiled Code (like Hyper)?',
            answer: 'Vectorized execution processes chunks of rows (typically 1024 or 2048 tuples) through relational primitives using SIMD instructions, keeping the Volcano iterator interface intact. Compiled code generation (JIT) fuses entire pipelines into a single machine-code loop that keeps variables in CPU registers, eliminating iterator overhead.'
          },
          snippet: '__m512i vec_data = _mm512_loadu_si512(&column[i]);\n__m512i vec_threshold = _mm512_set1_epi64(100);\n__mmask8 mask = _mm512_cmpgt_epi64_mask(vec_data, vec_threshold);'
        },
        {
          stepNum: 4,
          name: 'Morsel-Driven Parallel Aggregation',
          box: { x: 748, y: 62, w: 224, h: 208 },
          beacon: { x: 860, y: 166 },
          telemetry: {
            hardware: 'NUMA-Aware Task Scheduling: 100,000-row "morsels" assigned to idle CPU cores',
            invariant: 'Lock-free thread-local accumulators avoid cache bouncing across cores.',
            kernel: 'Combines thread-local sums at completion using atomic lock-free reduction',
            state: 'Active Cores: 16 | Morsel Size: 100K | Total Scan Time: 1.8ms for 10M rows'
          },
          defense: {
            question: 'What is Morsel-Driven Parallelism in modern analytical database systems?',
            answer: 'Morsel-driven parallelism (invented by Leis et al. for HyPer) divides query execution into small work units ("morsels", e.g. 100,000 rows) dynamically picked up by a thread pool. It schedules morsels on the specific CPU core that has local NUMA memory access to that chunk, achieving near-linear scaling across multi-socket servers.'
          },
          snippet: 'ParallelFor(0, total_morsels, [&](size_t morsel_id) {\n  ThreadLocalAccumulator local_acc;\n  ScanMorsel(morsel_id, &local_acc);\n  global_acc.Merge(local_acc);\n});'
        }
      ]
    },

    distributed_2pc: {
      id: 'distributed_2pc',
      title: 'Distributed 2-Phase Commit (2PC) & Raft Consensus',
      badge: 'CONSENSUS ENGINE',
      scenarios: [
        { id: 'commit', title: 'Unanimous 2PC Commit', desc: 'All participant shards vote YES and successfully commit.' },
        { id: 'abort', title: 'Participant Vote Abort / Timeout', desc: 'One shard votes NO or crashes. Coordinator orders global abort.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Phase 1: Coordinator PREPARE Broadcast',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'Network RPC: Coordinator broadcasts PREPARE message over TCP/gRPC',
            invariant: 'Coordinator writes PREPARE to local WAL before sending network packet.',
            kernel: 'Socket timeout: 500ms · TLS 1.3 encrypted cluster network link',
            state: 'Txn: G-1092 | Coordinator: Node-01 | Participants: [Node-02, Node-03, Node-04]'
          },
          defense: {
            question: 'Why must the coordinator write PREPARE to its local WAL before sending the RPC?',
            answer: 'If the coordinator crashes immediately after sending PREPARE RPCs, it must know upon reboot that a distributed commit was in flight. Writing to WAL first guarantees it can resume recovery and ask participants for their status rather than leaving locks hanging indefinitely.'
          },
          snippet: 'wal->Append({TXN_PREPARE, global_txn_id});\nfor (auto& node : participants) node->SendPrepareAsync(global_txn_id);'
        },
        {
          stepNum: 2,
          name: 'Local Lock & Promise Reservation (VOTE_COMMIT)',
          box: { x: 268, y: 62, w: 220, h: 208 },
          beacon: { x: 378, y: 166 },
          telemetry: {
            hardware: 'Participant Disk fsync: Writes PREPARED to local WAL · Locks reserved',
            invariant: 'VOTE_COMMIT PROMISE: Participant guarantees it CAN and WILL commit if ordered.',
            kernel: 'Locks held: Row Exclusive (X) · Power failure cannot break this guarantee',
            state: 'Votes Received: Node-02: YES, Node-03: YES, Node-04: YES | Unanimous: TRUE'
          },
          defense: {
            question: 'What is the "Blocking Problem" of 2-Phase Commit?',
            answer: 'If the coordinator crashes after participants have voted YES (PREPARED) but before broadcasting the COMMIT decision, participants are completely blocked. They cannot unilaterally abort (the coordinator might have committed) and cannot commit (the coordinator might have aborted). Locks remain held, stalling all conflicting transactions.'
          },
          snippet: 'if (CanCommit(txn)) {\n  wal->FlushRecord({TXN_PREPARED, txn->id});\n  return VOTE_COMMIT; // Binding promise!\n} else { return VOTE_ABORT; }'
        },
        {
          stepNum: 3,
          name: 'Phase 2: GLOBAL_COMMIT Broadcast & Release',
          box: { x: 508, y: 62, w: 220, h: 208 },
          beacon: { x: 618, y: 166 },
          telemetry: {
            hardware: 'Network RPC Broadcast: Coordinator declares transaction committed',
            invariant: 'The exact instant the coordinator fsyncs COMMIT to its log, transaction is committed.',
            kernel: 'Participants apply state mutations, release local locks, and return ACK',
            state: 'Txn Status: COMMITTED | Wall Clock: 4.8ms total consensus latency'
          },
          defense: {
            question: 'How do modern NewSQL databases (like CockroachDB, Spanner, YugabyteDB) solve 2PC coordinator failure?',
            answer: 'They pair 2PC with consensus protocols like Raft or Paxos. The distributed transaction record is itself stored in a Raft-replicated consensus group. If the transaction coordinator crashes, another replica in the Raft group is immediately elected leader and completes the 2PC commit without blocking participants.'
          },
          snippet: 'wal->FlushRecord({TXN_GLOBAL_COMMIT, global_txn_id});\nfor (auto& node : participants) node->SendCommitAsync(global_txn_id);'
        },
        {
          stepNum: 4,
          name: 'Raft Quorum Log Replication (N/2 + 1)',
          box: { x: 748, y: 62, w: 224, h: 208 },
          beacon: { x: 860, y: 166 },
          telemetry: {
            hardware: 'Quorum Acknowledgment: Survives loss of minority of nodes without data loss',
            invariant: 'Leader commits log entry once a majority (e.g. 2 of 3 nodes) has fsynced.',
            kernel: 'Term-based election prevents split-brain · Strict state machine replication',
            state: 'Raft Term: 14 | Leader: Node-01 | Quorum: 3/3 nodes in sync | High Availability: ACTIVE'
          },
          defense: {
            question: 'What is the CAP theorem trade-off made by distributed relational databases?',
            answer: 'Distributed relational databases (e.g. Google Spanner, CockroachDB) choose CP (Consistency and Partition Tolerance) over Availability. During a network partition that isolates a minority node, the minority cannot achieve a Raft quorum ($N/2 + 1$) and rejects writes to guarantee strict serializable consistency.'
          },
          snippet: 'if (replicated_count >= (cluster_size / 2 + 1)) {\n  CommitToStateMachine(log_entry);\n}'
        }
      ]
    },

    window_execution: {
      id: 'window_execution',
      title: 'Window Function Multi-Pass Sliding Frame',
      badge: 'WINDOW ENGINE',
      scenarios: [
        { id: 'sliding_sum', title: 'Running Sum & Sliding Frame', desc: 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW.' },
        { id: 'ranking', title: 'DENSE_RANK() & Ties', desc: 'Evaluating partition rank order with peer ties.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Partition Hash Routing & Boundary Isolation',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'Hash Router: PARTITION BY dept_id maps rows to independent stream buffers',
            invariant: 'Calculations inside a partition NEVER leak or cross partition boundaries.',
            kernel: 'Zero thread contention between distinct partition groups',
            state: 'CurrentPartition: dept_id=10 ("ENGINEERING") | Rows in Partition: 420'
          },
          defense: {
            question: 'What is the performance difference between a Window Function and a GROUP BY aggregation?',
            answer: 'GROUP BY is a reductive operator that collapses N input rows into 1 output row per group. Window functions calculate aggregations or rankings over a window frame while preserving every individual input row. Window functions avoid costly self-joins often used to compare rows against group aggregates.'
          },
          snippet: 'size_t part_key = Hash(tuple.dept_id);\npartition_buffers[part_key].push_back(tuple);'
        },
        {
          stepNum: 2,
          name: 'Deterministic In-Partition Sorting',
          box: { x: 268, y: 62, w: 220, h: 208 },
          beacon: { x: 378, y: 166 },
          telemetry: {
            hardware: 'In-Memory Quicksort: ORDER BY salary DESC, emp_id ASC',
            invariant: 'Deterministic tie-breaking ensures identical execution results across runs.',
            kernel: 'SIMD Radix Sort for integer order keys: 20M rows/sec',
            state: 'Sorted Partition: 420 rows ordered by salary DESC'
          },
          defense: {
            question: 'Why does omitting the window frame spec default to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW?',
            answer: 'The ANSI SQL standard specifies that when ORDER BY is present without a frame, RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW is implied. This is a notorious trap: RANGE groups all duplicate "peer" values together, calculating cumulative values over peer groups rather than individual rows and forcing duplicate scans.'
          },
          snippet: 'std::sort(partition.begin(), partition.end(), [](const Tuple& a, const Tuple& b) {\n  if (a.salary != b.salary) return a.salary > b.salary;\n  return a.emp_id < b.emp_id; // Tie breaker\n});'
        },
        {
          stepNum: 3,
          name: 'Physical Sliding Frame Ring Buffer',
          box: { x: 508, y: 62, w: 220, h: 208 },
          beacon: { x: 618, y: 166 },
          telemetry: {
            hardware: 'Sliding Frame Ring Buffer: ROWS BETWEEN 2 PRECEDING AND CURRENT ROW',
            invariant: 'O(1) moving aggregation: add incoming row, subtract departing row.',
            kernel: 'Fixed memory footprint: exactly 3 rows in ring buffer at any instant',
            state: 'RingBuffer: [120K, 140K, 150K] | Moving Sum: 410,000 | Moving Avg: 136,666'
          },
          defense: {
            question: 'How do production engines evaluate moving aggregates over sliding frames in O(1) time?',
            answer: 'Naive calculation re-scans the entire frame for every row (O(N * W) where W is frame size). Production engines use invertible accumulators (e.g. maintaining a running sum by adding the new row and subtracting the row leaving the frame), or the Two-Stacks queue algorithm for non-invertible operators like MIN and MAX, keeping per-row cost strictly O(1).'
          },
          snippet: 'running_sum += incoming_row.val;\nrunning_sum -= departing_row.val;\nemit(row, running_sum);'
        },
        {
          stepNum: 4,
          name: 'Streaming Output Emission',
          box: { x: 748, y: 62, w: 224, h: 208 },
          beacon: { x: 860, y: 166 },
          telemetry: {
            hardware: 'Direct Volcano Yield: Emits original tuple + computed window metrics',
            invariant: 'Input row count == Output row count (1:1 correspondence).',
            kernel: 'Zero disk spill when partition fits in RAM',
            state: 'Tuples Emitted: 420 | Columns: emp_id, salary, dept_id, moving_avg, rank'
          },
          defense: {
            question: 'Can multiple window functions with different PARTITION BY clauses execute in a single query?',
            answer: 'Yes, but if their PARTITION BY or ORDER BY clauses differ, the query plan requires a re-sort (or re-partition) step between each window operator, breaking the pipeline and inserting an External Sort operator.'
          },
          snippet: 'emit_output_row(tuple, {computed_rank, moving_avg});'
        }
      ]
    },

    external_sort: {
      id: 'external_sort',
      title: 'External Merge Sort & Tournament Loser Tree',
      badge: 'SORT ENGINE',
      scenarios: [
        { id: 'standard', title: '2-Pass External Sort', desc: 'In-memory run generation followed by K-way tournament tree merge.' },
        { id: 'memory_spill', title: 'Multi-Pass Fanout Spill', desc: 'When run count exceeds merge fanout limit.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'In-Memory Chunk Quicksort (work_mem Bounded)',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'DRAM Buffer: Allocates up to work_mem (e.g. 4MB) to buffer input tuples',
            invariant: 'Dataset > RAM. Cannot sort entire dataset in memory at once.',
            kernel: 'Dual-Pivot Quicksort / Introsort on pointer array in RAM',
            state: 'Tuples Buffered: 50,000 | Memory Used: 3.98 MB / 4.0 MB (FULL)'
          },
          defense: {
            question: 'Why do database sort operators sort an array of tuple pointers rather than sorting the tuple records directly?',
            answer: 'Tuples have variable lengths and large payloads (e.g. 500 bytes). Swapping full tuples in memory thrashes CPU cache lines and incurs huge memory bandwidth overhead. Sorting an array of 16-byte structs containing only the sort key and a pointer to the tuple allows the entire sorting phase to fit within L2/L3 CPU cache.'
          },
          snippet: 'struct SortItem { KeyType key; Tuple* tuple; };\nstd::sort(items.begin(), items.end());'
        },
        {
          stepNum: 2,
          name: 'Disk Spilling of Sorted Runs to Scratch Files',
          box: { x: 268, y: 62, w: 220, h: 208 },
          beacon: { x: 378, y: 166 },
          telemetry: {
            hardware: 'Sequential NVMe Write: Flushes sorted run sequentially to temporary scratch file',
            invariant: 'Each spilled run is individually 100% sorted in ascending order.',
            kernel: 'Asynchronous buffered I/O: 128KB write buffers · Zero random seeks',
            state: 'Generated: Run_01.tmp (50K rows) ... Run_08.tmp (50K rows) | Total: 8 runs'
          },
          defense: {
            question: 'What is the I/O complexity of External Merge Sort?',
            answer: 'External Merge Sort requires 2 * N * ceil(log_B(N / M)) I/O page transfers, where N is total pages, M is available buffer memory pages, and B is the merge fanout. With modern RAM sizes (gigabytes), almost all database external sorts complete in exactly 2 passes (Pass 0: run generation, Pass 1: merge).'
          },
          snippet: 'File* run_file = CreateTempFile();\nfor (auto& item : items) run_file->Append(item.tuple);\nruns.push_back(run_file);'
        },
        {
          stepNum: 3,
          name: 'Tournament Loser Tree K-Way Merge',
          box: { x: 508, y: 62, w: 220, h: 208 },
          beacon: { x: 618, y: 166 },
          telemetry: {
            hardware: 'Loser Tree in L1 Cache: Determines lowest key among K runs in O(log K) steps',
            invariant: 'Tournament tree stores the "loser" of each match at internal nodes; winner advances.',
            kernel: 'Requires only ceil(log2(K)) comparisons per emitted tuple',
            state: 'Runs Merging: 8 runs | Active Tournament Tree Nodes: 8 | Comparisons/tuple: 3'
          },
          defense: {
            question: 'Why is a Tournament Loser Tree preferred over a standard binary heap for K-way merging?',
            answer: 'In a standard binary min-heap, updating the root after extracting the minimum key requires sifting down, comparing both child nodes at each level (2 * log K comparisons). A Loser Tree only compares the advancing key against the stored loser at each parent node, cutting the required comparisons exactly in half (1 * log K comparisons).'
          },
          snippet: 'int winner = loser_tree[0];\nemit(run_heads[winner]);\nrun_heads[winner] = runs[winner]->Next();\nReplayTournament(winner);'
        },
        {
          stepNum: 4,
          name: 'Globally Sorted Streaming Output Pipeline',
          box: { x: 748, y: 62, w: 224, h: 208 },
          beacon: { x: 860, y: 166 },
          telemetry: {
            hardware: 'Volcano Streaming: Tuples pulled by parent operator in globally sorted order',
            invariant: 'Temporary run files deleted upon completion of merge pass.',
            kernel: 'Prefetch buffer loads next block of each run before current block depletes',
            state: 'Output: 400,000 globally sorted rows | Temp disk space reclaimed: 32MB'
          },
          defense: {
            question: 'How can a query avoid External Sort entirely when an ORDER BY clause is present?',
            answer: 'If a B+ Tree index exists matching the exact ORDER BY columns (and leading filter columns), the engine can execute an Index Scan instead. Because the B+ Tree leaf nodes are already sorted, the engine reads tuples directly in pre-sorted order, skipping the sort operator completely.'
          },
          snippet: 'bool ExternalSortOperator::Next(Tuple* out) {\n  if (tree.Empty()) return false;\n  *out = tree.PopMinimum();\n  return true;\n}'
        }
      ]
    },

    locking_hierarchy: {
      id: 'locking_hierarchy',
      title: 'Database Locking Hierarchy & 2-Phase Locking (2PL)',
      badge: 'LOCKING ENGINE',
      scenarios: [
        { id: '2pl', title: 'Strict 2PL & Concurrent Isolation', desc: 'Growing phase acquires locks; shrinking phase holds until commit.' },
        { id: 'deadlock', title: 'Deadlock Cycle & Victim Abort', desc: 'Wait-For Graph cycle detection aborts lowest-cost transaction.' }
      ],
      steps: [
        {
          stepNum: 1,
          name: 'Intention Locking at Table Level (IS / IX)',
          box: { x: 28, y: 62, w: 220, h: 208 },
          beacon: { x: 138, y: 166 },
          telemetry: {
            hardware: 'Table Lock Manager: Hash bucket lookup on table OID',
            invariant: 'INTENTION INVARIANT: Must acquire Intention Lock on Table before locking Row.',
            kernel: 'Prevents concurrent full-table DDL/LOCK TABLE statements from conflicting',
            state: 'Table: orders | Txn-1 holds: IX (Intention Exclusive) | Txn-2 holds: IS'
          },
          defense: {
            question: 'What is the purpose of Multiple Granularity Locking and Intention Locks (IS/IX)?',
            answer: 'Without intention locks, before a transaction could lock an entire table in Exclusive (X) mode (e.g. for `ALTER TABLE`), it would have to inspect millions of individual rows to see if any row was locked. Intention locks signal at the table level that a transaction intends to lock individual rows downstream, allowing table locks to check conflicts instantaneously.'
          },
          snippet: 'table_lock_manager->Acquire(txn, table_id, LockMode::INTENTION_EXCLUSIVE);'
        },
        {
          stepNum: 2,
          name: 'Short-Term Page Latches vs Long-Term Row Locks',
          box: { x: 268, y: 62, w: 220, h: 208 },
          beacon: { x: 378, y: 166 },
          telemetry: {
            hardware: 'CPU Cache Latch: atomic test-and-set or futex on 8KB frame header',
            invariant: 'LATCHES protect memory physical integrity (microseconds); LOCKS protect logical transactions (seconds).',
            kernel: 'Page latch released immediately after slotted tuple read/write finishes',
            state: 'PageLatch: Frame-03 (SHARED, 4 microseconds) | RowLock: Row-42 (EXCLUSIVE)'
          },
          defense: {
            question: 'What is the critical technical difference between a Database Lock and a Database Latch?',
            answer: 'A Lock is a logical construct managed by the lock manager, held for the duration of a transaction (seconds/minutes), supporting 2PL compatibility matrices, rollback, and deadlock detection. A Latch is a low-level physical sync primitive (like a mutex/rwlock) held for microseconds solely to prevent memory corruption while reading or modifying an 8KB memory page.'
          },
          snippet: 'page->AcquireLatch(SHARED); // Short-term physical memory latch\nlock_manager->AcquireRowLock(txn, row_id, EXCLUSIVE); // Long-term logical lock\npage->ReleaseLatch();'
        },
        {
          stepNum: 3,
          name: 'Strict 2-Phase Locking (SS2PL) Invariant',
          box: { x: 508, y: 62, w: 220, h: 208 },
          beacon: { x: 618, y: 166 },
          telemetry: {
            hardware: 'Growing Phase: Acquires locks as needed · Shrinking Phase: HELD UNTIL COMMIT',
            invariant: 'STRICT 2PL: All exclusive locks must be held until COMMIT or ROLLBACK.',
            kernel: 'Prevents Cascading Aborts and guarantees Strict Serializable order',
            state: 'Txn-1: In-Flight | Locks Held: 4 Row-X, 1 Table-IX | Release: BLOCKED UNTIL COMMIT'
          },
          defense: {
            question: 'What is the difference between Conservative 2PL, Basic 2PL, and Strict 2PL (SS2PL)?',
            answer: 'Basic 2PL allows locks to be released during the shrinking phase before commit, which risks cascading aborts if the transaction later rolls back. Conservative 2PL acquires all locks upfront before starting (preventing deadlocks, but reducing concurrency). Strict 2PL (SS2PL) acquires locks dynamically and holds all Exclusive locks until commit, preventing cascading aborts.'
          },
          snippet: 'void OnCommit(Txn* txn) {\n  for (auto lock : txn->held_locks) lock_manager->Release(lock);\n}'
        },
        {
          stepNum: 4,
          name: 'Deadlock Detection & Wait-For Graph Cycle Scan',
          box: { x: 748, y: 62, w: 224, h: 208 },
          beacon: { x: 860, y: 166 },
          telemetry: {
            hardware: 'Background Thread: Runs DFS / Tarjan cycle detection every 1,000ms',
            invariant: 'DEADLOCK: Directed cycle in Wait-For Graph (T1 waits for T2; T2 waits for T1).',
            kernel: 'Victim Selection: Aborts transaction with lowest undo log cost or least locks held',
            state: 'Cycle Detected: T-1 -> T-2 -> T-1 | Victim Selected: T-2 | Injected: ROLLBACK'
          },
          defense: {
            question: 'How do database engines handle deadlocks: Deadlock Prevention vs Deadlock Detection?',
            answer: 'Deadlock Prevention uses timestamp schemes like Wait-Die (older waits, younger dies) or Wound-Wait (older wounds younger) without building graphs. Deadlock Detection allows transactions to block and periodically runs cycle detection (DFS) on the directed Wait-For Graph, picking the cheapest transaction to abort and return SQLSTATE 40P01.'
          },
          snippet: 'if (graph->HasCycle()) {\n  Txn* victim = graph->PickCheapestVictim();\n  victim->Abort(DEADLOCK_DETECTED);\n}'
        }
      ]
    }
  };


  // ---------------------------------------------------------------------------
  // CHAOS & STRESS SIMULATION DATASET (24 Real-World Enterprise Failure Scenarios)
  // ---------------------------------------------------------------------------
  const CHAOS_DEEP_DIVES = {
    buffer_pool: [
      {
        id: 'thrashing',
        title: 'Buffer Pool Thrashing & Free List Depletion',
        severity: 'P0 CRITICAL',
        targetBox: { x: 272, y: 170, w: 424, h: 88 },
        beacon: { x: 484, y: 214 },
        faultType: 'CLOCK_THRASH',
        metrics: {
          impact: 'Cache Hit Ratio: 99.8% -> 12.4% | Latency Spikes 400x (0.12ms -> 48.2ms)',
          invariant: 'Free Frame List = 0. Eviction thread consuming 100% CPU spinning CLOCK hand.',
          kernel: 'sys_read synchronous NVMe storm: 140,000 IOPS · Queue Depth: 64 (Saturated)'
        },
        rca: {
          incident: 'Unindexed batch analytics query triggered a sequential scan of 80M rows during peak traffic, sweeping working-set pages out of DRAM.',
          mitigation: 'Set innodb_buffer_pool_instances=16, configure mid-point insertion (innodb_old_blocks_pct=37), and enforce query statement_timeout=5000ms.',
          injectionScript: '-- Chaos Injection: Sweep entire buffer pool with unindexed sequential scan\nSELECT count(*) FROM transactions WHERE memo LIKE \'%audit_probe_test%\';'
        }
      },
      {
        id: 'checkpoint_stall',
        title: 'Dirty Page Flushing Checkpoint Stall',
        severity: 'P0 OUTAGE',
        targetBox: { x: 760, y: 62, w: 212, h: 208 },
        beacon: { x: 866, y: 166 },
        faultType: 'CHECKPOINT_FREEZE',
        metrics: {
          impact: 'All Transaction Commits Frozen for 18.4s · Client Connection Pool Depleted',
          invariant: 'PageLSN exceeds FlushedLSN safe margin. DBMS forces synchronous sync write barrier.',
          kernel: 'DBWR asynchronous flusher overwhelmed · fsync() queue depth: 2,400 dirty 8KB pages'
        },
        rca: {
          incident: 'Heavy bulk INSERT wrote WAL faster than storage could flush dirty table pages, triggering hard checkpoint sync barrier.',
          mitigation: 'Tune checkpoint_completion_target=0.9, increase max_wal_size=16GB, isolate WAL to dedicated low-latency NVMe.',
          injectionScript: '-- Simulate heavy dirty page generation\nBEGIN;\nINSERT INTO ledger_audit SELECT generate_series(1, 2000000), md5(random()::text);\nCOMMIT;'
        }
      }
    ],

    btree_index: [
      {
        id: 'page_split_wave',
        title: 'Cascading Page Split Avalanche (Monotonic Insertion Surge)',
        severity: 'P1 HIGH',
        targetBox: { x: 656, y: 62, w: 316, h: 208 },
        beacon: { x: 814, y: 166 },
        faultType: 'CASCADING_SPLITS',
        metrics: {
          impact: 'B-tree Depth Expands 3 -> 4 Levels · Index Write Latency: 0.18ms -> 14.8ms',
          invariant: 'Leaf node capacity exceeded: triggers 50/50 page split cascading up to Root Node.',
          kernel: 'Storage Allocator: Heavy random page allocations · Fill factor degrades to 50%'
        },
        rca: {
          incident: 'Concurrent microservice ingestion burst with auto-increment IDs saturated the rightmost leaf node, causing continuous parent latch serialization.',
          mitigation: 'Use reverse-key indexes or UUID v7 with uniform key dispersion; pre-configure index fillfactor (WITH fillfactor=90).',
          injectionScript: '-- Chaos Injection: High-concurrency monotonic insertion surge\nINSERT INTO event_log (id, payload) SELECT generate_series(1000000, 2000000), random()::text;'
        }
      },
      {
        id: 'sparse_bloat',
        title: 'Index Bloat & Sparse Leaf Fragmentation',
        severity: 'P2 WARNING',
        targetBox: { x: 656, y: 190, w: 316, h: 80 },
        beacon: { x: 814, y: 228 },
        faultType: 'SPARSE_BLOAT',
        metrics: {
          impact: 'Index Size: 4GB -> 38GB (9x Bloat) · Range Scan Reads 10x More Pages from Disk',
          invariant: 'Leaf pages are only 12% full due to random DELETEs without sibling coalescing.',
          kernel: 'Buffer Pool polluted with near-empty pages · NVMe cache efficiency collapses'
        },
        rca: {
          incident: 'Cron job deleted 10M expired records daily without running B-tree vacuum or reindex, fragmenting doubly-linked leaf chains.',
          mitigation: 'Run REINDEX TABLE CONCURRENTLY during low-traffic windows or enable pg_squeeze/InnoDB defragmentation.',
          injectionScript: '-- Chaos Injection: Sparse random deletion causing index fragmentation\nDELETE FROM active_sessions WHERE random() < 0.85;'
        }
      }
    ],

    hash_join: [
      {
        id: 'hash_skew',
        title: 'Severe Hash Skew & Bucket Collision Cascade',
        severity: 'P0 CRITICAL',
        targetBox: { x: 268, y: 62, w: 430, h: 208 },
        beacon: { x: 483, y: 130 },
        faultType: 'COLLISION_CASCADE',
        metrics: {
          impact: 'Join Algorithm Degrades O(1) -> O(N) · Single Bucket Length: 64,000 Linked Tuples',
          invariant: 'Uniform distribution invariant broken: 92% of join keys hash to Bucket 42.',
          kernel: 'CPU L1/L2 Cache line misses: 84% · Worker thread pegged at 100% CPU spinning pointer chains'
        },
        rca: {
          incident: 'Tenant ID column contained 90% NULLs or default account_id=1, routing all probe lookups to a single linked list.',
          mitigation: 'Rewrite query to filter NULL keys early (`WHERE tenant_id IS NOT NULL`), or isolate high-volume tenants into dedicated partitions.',
          injectionScript: '-- Chaos Injection: Skewed join key generation\nSELECT * FROM orders o JOIN users u ON coalesce(o.user_id, 1) = u.id;'
        }
      },
      {
        id: 'workmem_spill',
        title: 'Out-Of-Memory WorkMem Spill (Recursive Disk Partitioning)',
        severity: 'P1 HIGH',
        targetBox: { x: 720, y: 172, w: 252, h: 98 },
        beacon: { x: 846, y: 220 },
        faultType: 'DISK_SPILL',
        metrics: {
          impact: 'Join Memory Limit (4MB) Breached · Spilled 1.8GB into 64 Temp Files on Scratch NVMe',
          invariant: 'In-memory hash table aborted. Forced fallback to multi-pass Hybrid Grace Hash Join.',
          kernel: 'Throughput plunges from 920MB/s (RAM) to 18MB/s (Disk I/O thrashing)'
        },
        rca: {
          incident: 'Unexpected cardinality explosion on inner build relation exceeded default work_mem (4MB).',
          mitigation: 'Increase work_mem for analytical workloads (`SET LOCAL work_mem = "256MB"`) or optimize join order via optimizer hints.',
          injectionScript: '-- Chaos Injection: Force hash join spill by restricting work_mem\nSET work_mem = \'64kB\';\nSELECT count(*) FROM big_table_a a JOIN big_table_b b ON a.id = b.a_id;'
        }
      }
    ],

    wal_aries: [
      {
        id: 'power_cut_redo',
        title: 'Host Power Failure During Redo Pass (Idempotence Test)',
        severity: 'P0 OUTAGE',
        targetBox: { x: 498, y: 62, w: 230, h: 208 },
        beacon: { x: 613, y: 166 },
        faultType: 'POWER_CUT',
        metrics: {
          impact: 'Server Uncleanly Halts at LSN 49080 During Recovery Replay · Reboot Triggered',
          invariant: 'ARIES IDEMPOTENCE: Re-running Redo pass on reboot produces 100% identical state.',
          kernel: 'PageLSN >= LogRecord.LSN check prevents double-application of transactions'
        },
        rca: {
          incident: 'Data center rack PDU power failure during ongoing crash recovery replay.',
          mitigation: 'Ensure battery-backed write cache (BBU) and non-volatile NVDIMMs are healthy; verify fsync=on in DBMS config.',
          injectionScript: '# Linux Kernel Chaos: Simulate instantaneous kernel panic during replay\necho c > /proc/sysrq-trigger'
        }
      },
      {
        id: 'crash_undo_clr',
        title: 'Crash During Undo Pass (Compensation Log Records Invariant)',
        severity: 'P0 CRITICAL',
        targetBox: { x: 748, y: 62, w: 224, h: 208 },
        beacon: { x: 860, y: 166 },
        faultType: 'UNDO_CRASH',
        metrics: {
          impact: 'Recovery Crashes While Rolling Back 5M-Row Loser Transaction · CLR PrevLSN Traversed',
          invariant: 'CLR Invariant: Compensation Log Records with UndoNextLSN prevent infinite rollback loops.',
          kernel: 'On second recovery pass, ARIES skips already-undone log records instantaneously'
        },
        rca: {
          incident: 'OOM Killer terminated database engine while it was reversing a massive uncommitted batch delete.',
          mitigation: 'Break gigantic multi-million row batch deletes into chunked transactions of 10,000 rows with explicit commits.',
          injectionScript: '-- Chaos Injection: Rollback giant transaction while terminating process\nBEGIN; DELETE FROM metrics_raw; -- kill -9 <dbms_pid> before commit'
        }
      }
    ],

    query_optimizer: [
      {
        id: 'card_skew_trap',
        title: 'Catastrophic Cardinality Estimation Skew (The 1-Row vs 10M Trap)',
        severity: 'P0 CRITICAL',
        targetBox: { x: 468, y: 62, w: 240, h: 208 },
        beacon: { x: 588, y: 166 },
        faultType: 'CARD_SKEW',
        metrics: {
          impact: 'Query Planned for 1 Row, Encountered 14,000,000 Rows · Run Time: 2s -> 4.8 Hours',
          invariant: 'Cost Model Selected Unindexed Nested Loop Join based on stale histogram stats.',
          kernel: 'CPU pegged at 100% · Executing 14,000,000 x 50,000 = 700 Billion sequential iterations'
        },
        rca: {
          incident: 'Autovacuum analyze had not run after an overnight bulk ingestion of 50M rows, leaving catalog stats showing table as empty.',
          mitigation: 'Run ANALYZE table after ETL pipelines, increase default_statistics_target to 500, or add query hints.',
          injectionScript: '-- Chaos Injection: Corrupt table statistics to force Nested Loop catastrophe\nSET enable_hashjoin = off; SET enable_mergejoin = off;\nEXPLAIN ANALYZE SELECT * FROM large_a JOIN large_b ON large_a.flag = large_b.flag;'
        }
      },
      {
        id: 'join_explosion',
        title: 'Join Order Permutation Explosion (N! Search Space Collapse)',
        severity: 'P1 HIGH',
        targetBox: { x: 228, y: 62, w: 220, h: 208 },
        beacon: { x: 338, y: 166 },
        faultType: 'JOIN_EXPLOSION',
        metrics: {
          impact: 'Query Planning Phase Stalled for 42s Before Executing a Single Byte',
          invariant: '14-Table Join Search Space: 14! = 87,178,291,200 permutations in Dynamic Programming.',
          kernel: 'Optimizer process allocated 1.2GB memory just exploring relational join trees'
        },
        rca: {
          incident: 'BI tool auto-generated a 15-way join query without subquery boundaries, causing the cost-based optimizer to exhaust CPU memory during planning.',
          mitigation: 'Enable Genetic Query Optimization (geqo=on, geqo_threshold=12), or break query into modular CTEs (WITH blocks).',
          injectionScript: '-- Chaos Injection: Multi-way unconstrained join tree\nSELECT * FROM t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12 WHERE t1.k=t2.k AND t2.k=t3.k;'
        }
      }
    ],

    mvcc: [
      {
        id: 'xmin_bloat',
        title: 'Abandoned Transaction Dead-Tuple Bloat & Wraparound Threat',
        severity: 'P0 CRITICAL',
        targetBox: { x: 720, y: 172, w: 252, h: 98 },
        beacon: { x: 846, y: 220 },
        faultType: 'DEAD_TUPLE_BLOAT',
        metrics: {
          impact: 'Table Size Bloated from 2.4GB to 86GB · Autovacuum Blocked Across Entire Cluster',
          invariant: 'Snapshot Horizon frozen: OldestActiveXID held back by rogue transaction idle for 72h.',
          kernel: 'Dead tuple versions cannot be reclaimed · System approaching Transaction ID Wraparound emergency shutdown'
        },
        rca: {
          incident: 'Data science analyst opened a `BEGIN; SELECT ...` in a Jupyter notebook on Friday evening and left the connection open all weekend.',
          mitigation: 'Set idle_in_transaction_session_timeout="15min", configure alert on pg_stat_activity.backend_xmin age, and run vacuum freeze.',
          injectionScript: '-- Chaos Injection: Hold back xmin horizon indefinitely\nBEGIN; SELECT * FROM accounts LIMIT 1; -- Leave open without COMMIT'
        }
      },
      {
        id: 'write_skew',
        title: 'Write-Skew Serialization Anomaly (Doctor On-Call Bug)',
        severity: 'P1 HIGH',
        targetBox: { x: 268, y: 62, w: 430, h: 208 },
        beacon: { x: 483, y: 140 },
        faultType: 'WRITE_SKEW',
        metrics: {
          impact: 'Cross-Record Business Invariant Violated · 0 Doctors Left On-Call Under Snapshot Isolation',
          invariant: 'Txn 1 & 2 read disjoint rows and write disjoint rows, passing row-level conflict checks.',
          kernel: 'REPEATABLE READ permits write-skew anomalies · SSI (Serializable Snapshot Isolation) required'
        },
        rca: {
          incident: 'Two physicians concurrently submitted leave requests. Both checked that count >= 2, and both committed, leaving 0 on-call.',
          mitigation: 'Upgrade isolation level to SERIALIZABLE, or use explicit pessimistic row locks (`SELECT ... FOR UPDATE`).',
          injectionScript: '-- Chaos Injection: Concurrent write skew simulation\n-- Session 1: BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n-- UPDATE on_call SET active=false WHERE doctor_id=1 AND (SELECT count(*) FROM on_call WHERE active=true) >= 2;'
        }
      }
    ],

    lsm_tree: [
      {
        id: 'write_stall',
        title: 'Write Stall & Compaction Debt Ingestion Freeze',
        severity: 'P0 OUTAGE',
        targetBox: { x: 28, y: 62, w: 220, h: 208 },
        beacon: { x: 138, y: 166 },
        faultType: 'WRITE_STALL',
        metrics: {
          impact: 'Client Write Throughput Throttled to 0 ops/sec · API Gateways Throwing 504 Gateway Timeout',
          invariant: 'Level-0 SSTable count (32 files) exceeded hard threshold. Background compaction cannot keep up.',
          kernel: 'Write buffer frozen · RocksDB/Cassandra enters full write stall to prevent storage exhaustion'
        },
        rca: {
          incident: 'Kafka consumer burst pushed 800MB/s of write traffic, while leveled compaction was constrained by low thread count (2 threads).',
          mitigation: 'Increase max_background_compactions=8, allocate high-IOPS NVMe tablespace, and configure rate_limiter.',
          injectionScript: '# Chaos Injection: Saturate LSM ingestion to trigger write stall\n./db_bench --benchmarks="fillbatch" --threads=64 --batch_size=100000 --max_write_buffer_number=2'
        }
      },
      {
        id: 'read_amp_avalanche',
        title: 'Read Amplification Avalanche (Bloom Filter False Positives)',
        severity: 'P1 HIGH',
        targetBox: { x: 508, y: 62, w: 220, h: 208 },
        beacon: { x: 618, y: 166 },
        faultType: 'READ_AVALANCHE',
        metrics: {
          impact: 'Read IOPS Multiplied 18x · NVMe Latency Spikes from 0.4ms to 24ms per Point Read',
          invariant: 'Bloom filter bit array undersized (2 bits/key): false positive rate spikes to 28%.',
          kernel: 'Engine forced to read data and index blocks from 15 separate SSTables for every key lookup'
        },
        rca: {
          incident: 'Database restarted with incorrect Bloom filter configuration, degrading point lookups into exhaustive multi-SSTable disk sweeps.',
          mitigation: 'Configure bloom_bits=10 (yields < 1% false positive rate) and pin L0/L1 filter blocks in block cache.',
          injectionScript: '# Chaos: Disable Bloom filter in RocksDB\n./db_bench --benchmarks="readrandom" --use_bloom=false --num=1000000'
        }
      }
    ],

    columnar_simd: [
      {
        id: 'simd_gather_stall',
        title: 'Vector Register Pipeline Stall (Unaligned Memory Gather)',
        severity: 'P1 HIGH',
        targetBox: { x: 508, y: 62, w: 220, h: 208 },
        beacon: { x: 618, y: 166 },
        faultType: 'SIMD_STALL',
        metrics: {
          impact: 'Vectorized Processing Throughput Collapses from 4.2B rows/s to 380M rows/s (11x Slowdown)',
          invariant: 'AVX-512 memory alignment (64 bytes) violated by variable-length nullable fields.',
          kernel: 'CPU falls back to serialized gather instructions (_mm512_i32gather_epi32) with 4x pipeline stalls'
        },
        rca: {
          incident: 'Schema migration altered fixed-width column to nullable string, breaking contiguous cache line alignment.',
          mitigation: 'Ensure column data arrays are 64-byte aligned and store nullability in an independent bitmask vector.',
          injectionScript: '-- Chaos Injection: Unaligned scattered filter\nSELECT sum(cast(scattered_str AS bigint)) FROM logs WHERE scattered_str IS NOT NULL;'
        }
      },
      {
        id: 'dict_eviction',
        title: 'High-Cardinality Dictionary Eviction & String Spill',
        severity: 'P2 WARNING',
        targetBox: { x: 268, y: 62, w: 220, h: 208 },
        beacon: { x: 378, y: 166 },
        faultType: 'DICT_SPILL',
        metrics: {
          impact: 'Column Compression Drops from 88% to 0% · Memory Footprint Multiplied 8x',
          invariant: 'Dictionary entry count exceeded 65,536 (16-bit integer threshold).',
          kernel: 'SIMD unit falls back to costly byte-by-byte string comparison in DRAM'
        },
        rca: {
          incident: 'Application logged high-cardinality session tokens into a column configured for dictionary compression.',
          mitigation: 'Implement auto-sampling on ingestion; disable dictionary encoding if distinct values exceed 5% of row count.',
          injectionScript: '-- Chaos: Populate column with millions of distinct UUID strings\nINSERT INTO telemetry_logs (tag) SELECT md5(random()::text) FROM generate_series(1, 1000000);'
        }
      }
    ],

    distributed_2pc: [
      {
        id: 'coordinator_crash',
        title: 'Coordinator Crash During Commit Phase (The 2PC Blocking Bug)',
        severity: 'P0 OUTAGE',
        targetBox: { x: 28, y: 62, w: 220, h: 208 },
        beacon: { x: 138, y: 166 },
        faultType: 'COORD_CRASH',
        metrics: {
          impact: 'All 3 Participant Shards Blocked Indefinitely · Conflicting Transactions Queue to Max Connections',
          invariant: 'Participants voted PREPARED and hold row exclusive locks. Cannot abort or commit unilaterally.',
          kernel: 'Cluster deadlock: distributed locks held across nodes until manual administrator recovery'
        },
        rca: {
          incident: 'Transaction coordinator VM suffered an OOM kernel panic immediately after receiving VOTE_COMMIT from all shards.',
          mitigation: 'Pair 2PC with a consensus protocol (Raft/Paxos) for coordinator election, or run automated distributed transaction resolver.',
          injectionScript: '# Chaos Mesh: Kill coordinator process immediately after prepare phase\nkill -9 $(pgrep -f "coordinator_engine")'
        }
      },
      {
        id: 'split_brain_quorum',
        title: 'Network Partition & Raft Quorum Loss',
        severity: 'P0 CRITICAL',
        targetBox: { x: 748, y: 62, w: 224, h: 208 },
        beacon: { x: 860, y: 166 },
        faultType: 'QUORUM_LOSS',
        metrics: {
          impact: 'Minority Shard Node Isolated · 100% of Writes to Isolated Node Rejected',
          invariant: 'CAP Theorem Enforcement: Consistency prioritized over Availability. Cannot reach N/2 + 1 majority.',
          kernel: 'Raft election term timeouts firing · Cluster state machine rejects client writes to prevent split-brain'
        },
        rca: {
          incident: 'Top-of-Rack (TOR) network switch failed, isolating 1 database replica from the 2 quorum leaders.',
          mitigation: 'Deploy database nodes across 3 distinct Availability Zones with redundant network links.',
          injectionScript: '# Chaos: Inject network partition via iptables\niptables -A INPUT -s 10.0.1.20 -j DROP; iptables -A OUTPUT -d 10.0.1.20 -j DROP;'
        }
      }
    ],

    window_execution: [
      {
        id: 'partition_skew',
        title: 'Slanted Partition Skew & Single-Worker Memory Spill',
        severity: 'P1 HIGH',
        targetBox: { x: 28, y: 62, w: 220, h: 208 },
        beacon: { x: 138, y: 166 },
        faultType: 'PARTITION_SKEW',
        metrics: {
          impact: '1 Worker Thread Stalled for 92s · Spilled 3.8GB to Scratch Disk While 15 Cores Sit Idle',
          invariant: 'PARTITION BY customer_id: A single enterprise customer contains 12,000,000 rows.',
          kernel: 'Single-node memory hot-spot: thread-local window buffer exhausted'
        },
        rca: {
          incident: 'Power-law distribution in customer data resulted in a single massive partition that saturated worker memory.',
          mitigation: 'Add composite partition keys (`PARTITION BY customer_id, date_trunc(\'month\', created_at)`) or salt partition keys.',
          injectionScript: '-- Chaos: Highly skewed window query\nSELECT id, count(*) OVER (PARTITION BY default_account_id) FROM big_audit_log;'
        }
      },
      {
        id: 'sliding_avalanche',
        title: 'Naive Sliding Frame Scanning Avalanche (O(N * W) Collapse)',
        severity: 'P1 HIGH',
        targetBox: { x: 508, y: 62, w: 220, h: 208 },
        beacon: { x: 618, y: 166 },
        faultType: 'SLIDING_COLLAPSE',
        metrics: {
          impact: 'CPU Instruction Count Multiplied 10,000x · Query Time Spikes 3.2s -> 410s',
          invariant: 'Non-invertible aggregate (MIN) over ROWS BETWEEN 10000 PRECEDING forces full frame re-scan per row.',
          kernel: 'CPU cache thrashed: 10,000 row inspections executed per emitted tuple'
        },
        rca: {
          incident: 'Analytic query applied moving MIN/MAX over a 10,000-row window without sliding-window optimization.',
          mitigation: 'Use Two-Stacks queue sliding window algorithm or pre-aggregate with range buckets.',
          injectionScript: '-- Chaos Injection: Unbounded non-invertible sliding window\nSELECT min(val) OVER (ORDER BY id ROWS BETWEEN 10000 PRECEDING AND CURRENT ROW) FROM metric_points;'
        }
      }
    ],

    external_sort: [
      {
        id: 'fanout_spill',
        title: 'Multi-Pass Merge Fanout Spill (K-Way Merge Explosion)',
        severity: 'P1 HIGH',
        targetBox: { x: 268, y: 62, w: 220, h: 208 },
        beacon: { x: 378, y: 166 },
        faultType: 'FANOUT_EXPLOSION',
        metrics: {
          impact: 'Disk I/O Multiplied 6x · Generated 48,000 Spilled Run Files on Scratch Storage',
          invariant: 'Sorting 120GB with work_mem=4MB. Exceeds max open file limit (64), forcing 3 intermediate merge passes.',
          kernel: 'Temporary file creation storm: kernel inode table contention and NVMe write queue saturation'
        },
        rca: {
          incident: 'Huge ORDER BY on unindexed JSON payload overwhelmed work_mem, generating thousands of tiny run files.',
          mitigation: 'Increase work_mem for batch jobs (`SET work_mem = "1GB"`), and raise OS file descriptor limits.',
          injectionScript: '-- Chaos Injection: Force multi-pass external sort\nSET work_mem = \'64kB\';\nSELECT * FROM heavy_ledger ORDER BY payload_hash;'
        }
      },
      {
        id: 'disk_full_abort',
        title: 'Scratch Disk Space Exhaustion (Fatal Query Abort)',
        severity: 'P0 OUTAGE',
        targetBox: { x: 508, y: 62, w: 220, h: 208 },
        beacon: { x: 618, y: 166 },
        faultType: 'DISK_EXHAUSTION',
        metrics: {
          impact: 'Fatal Transaction Failure: ERROR: could not write to temporary file: No space left on device',
          invariant: 'Scratch disk filesystem (/tmp) 100% full. All concurrent sorting queries aborted simultaneously.',
          kernel: 'OS kernel throws ENOSPC · PostgreSQL/MySQL engine enters emergency cleanup'
        },
        rca: {
          incident: 'Multiple concurrent analysts launched large unindexed sort queries simultaneously, exhausting the shared /tmp volume.',
          mitigation: 'Set temp_file_limit = "20GB" to abort rogue individual queries before the volume fills, and mount /tmp on dedicated NVMe.',
          injectionScript: '-- Chaos: Fill temp space with unbounded sort\nSELECT * FROM generate_series(1, 50000000) ORDER BY md5(random()::text);'
        }
      }
    ],

    locking_hierarchy: [
      {
        id: 'deadlock_cycle',
        title: 'Deadlock 4-Way Circular Wait (Tarjan Cycle Detection)',
        severity: 'P0 CRITICAL',
        targetBox: { x: 748, y: 62, w: 224, h: 208 },
        beacon: { x: 860, y: 166 },
        faultType: 'DEADLOCK_CYCLE',
        metrics: {
          impact: 'Complete Concurrency Lockout: T1 -> T2 -> T3 -> T4 -> T1 · Threads Frozen in Lock Wait',
          invariant: 'Directed cycle in Wait-For Graph. Zero progress possible until one transaction is aborted.',
          kernel: 'Deadlock detector fires every 1000ms: Tarjan algorithm selects lowest-cost victim and issues SQLSTATE 40P01'
        },
        rca: {
          incident: 'Different backend services acquired row locks on "users" and "accounts" in opposing order under high concurrency.',
          mitigation: 'Enforce deterministic global lock acquisition order across all application code (e.g. lock records in ascending PK order).',
          injectionScript: '-- Chaos Injection: Circular lock dependency\n-- Session 1: BEGIN; UPDATE users SET bal=bal-10 WHERE id=1;\n-- Session 2: BEGIN; UPDATE users SET bal=bal+10 WHERE id=2; UPDATE users SET bal=bal-10 WHERE id=1;'
        }
      },
      {
        id: 'lock_escalation',
        title: 'Lock Escalation & Full-Table Concurrency Starvation',
        severity: 'P1 HIGH',
        targetBox: { x: 28, y: 62, w: 220, h: 208 },
        beacon: { x: 138, y: 166 },
        faultType: 'LOCK_ESCALATION',
        metrics: {
          impact: 'Row Locks Escalated to Exclusive Table Lock · 2,400 Concurrent Queries Stalled in Lock Queue',
          invariant: 'Lock Manager exceeded 25,000 row locks threshold, replacing them with a single Exclusive Table Lock (X-Lock).',
          kernel: 'All incoming SELECT, INSERT, and UPDATE queries blocked at Table Latch level'
        },
        rca: {
          incident: 'A single background migration script ran a mass UPDATE without chunking, triggering SQL Server/InnoDB lock escalation.',
          mitigation: 'Break large updates into batches of 500 rows with explicit commits, or disable automatic lock escalation.',
          injectionScript: '-- Chaos Injection: Mass update triggering lock escalation\nUPDATE transaction_ledger SET status = \'ARCHIVED\' WHERE created_at < NOW() - INTERVAL \'30 days\';'
        }
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // INTERACTIVE ENGINE CORE & CONTROLS
  // ---------------------------------------------------------------------------

  // =========================================================================
  // SQL CLAUSE MAPPING FOR BI-DIRECTIONAL EDITOR SYNCHRONIZATION
  // =========================================================================
  const SQL_CLAUSE_MAP = {
    buffer_pool: ['SELECT', 'FROM', 'WHERE', 'LIMIT'],
    btree_index: ['WHERE', 'WHERE', 'WHERE', 'SELECT'],
    hash_join: ['FROM', 'JOIN', 'ON', 'SELECT'],
    wal_aries: ['INSERT', 'UPDATE', 'COMMIT', 'ROLLBACK'],
    query_optimizer: ['SELECT', 'WHERE', 'FROM', 'ORDER BY'],
    mvcc_vacuum: ['SELECT', 'WHERE', 'FROM', 'LIMIT'],
    lsm_tree: ['INSERT', 'UPDATE', 'WHERE', 'SELECT'],
    columnar_simd: ['SELECT', 'WHERE', 'GROUP BY', 'SUM'],
    distributed_2pc: ['BEGIN', 'UPDATE', 'COMMIT', 'COMMIT'],
    window_execution: ['OVER', 'PARTITION BY', 'ORDER BY', 'SELECT'],
    external_sort: ['ORDER BY', 'ORDER BY', 'LIMIT', 'SELECT'],
    locking_hierarchy: ['FOR UPDATE', 'LOCK', 'UPDATE', 'COMMIT']
  };

  function getStepSqlTarget(diagramId, stepIdx) {
    const targets = SQL_CLAUSE_MAP[diagramId] || ['SELECT', 'FROM', 'WHERE', 'LIMIT'];
    return targets[stepIdx] || 'SELECT';
  }

  // =========================================================================
  // MOUNT & RENDERING ENGINE
  // =========================================================================
  function mount(containerId, diagramId, options) {
    if (containerId) state.containerId = containerId;
    if (diagramId) state.activeDiagramId = normalizeDiagramId(diagramId);
    
    if (options && options.initialSql && !state.lastQuery) {
      state.lastQuery = options.initialSql.trim();
      state.lastExecutionStats = { latencyMs: 0.35, rowCount: 8, table: options.table || 'CITY' };
      state.lastQueryAnalysis = analyzeQueryForArchitecture(options.initialSql);
    } else if (!state.lastQuery) {
      const sqlInput = document.getElementById('studioSqlInput');
      const val = (sqlInput && sqlInput.value && sqlInput.value.trim()) ? sqlInput.value.trim() : 'SELECT id, name, population FROM City WHERE population > 100000;';
      state.lastQuery = val;
      state.lastExecutionStats = { latencyMs: 0.38, rowCount: 5, table: 'CITY' };
      state.lastQueryAnalysis = analyzeQueryForArchitecture(val);
    }

    const container = document.getElementById(state.containerId);
    if (!container) return;

    const data = ARCH_DEEP_DIVES[state.activeDiagramId] || ARCH_DEEP_DIVES['buffer_pool'];
    const chaosList = CHAOS_DEEP_DIVES[state.activeDiagramId] || CHAOS_DEEP_DIVES['buffer_pool'];

    if (state.currentStepIdx >= data.steps.length) {
      state.currentStepIdx = 0;
    }
    if (state.activeChaosIdx >= chaosList.length) {
      state.activeChaosIdx = 0;
    }

    container.innerHTML = renderViewerHtml(data, chaosList);
    updateSvgHighlight();
  }

  function setMode(mode) {
    state.viewMode = mode;
    pause();
    if (mode === 'live') {
      if (!state.lastQuery) {
        const sqlInput = document.getElementById('studioSqlInput');
        const val = (sqlInput && sqlInput.value) ? sqlInput.value.trim() : 'SELECT id, name, population FROM City WHERE population > 100000;';
        state.lastQuery = val;
        state.lastExecutionStats = { latencyMs: 0.42, rowCount: 8, table: 'CITY' };
        state.lastQueryAnalysis = analyzeQueryForArchitecture(val);
      }
      mount(state.containerId, state.activeDiagramId);
      playLiveExecutionPulse();
    } else {
      if (state.livePulseTimer) {
        clearInterval(state.livePulseTimer);
        state.livePulseTimer = null;
      }
      mount(state.containerId, state.activeDiagramId);
    }
  }

  function setChaosScenario(idx) {
    state.activeChaosIdx = idx;
    mount(state.containerId, state.activeDiagramId);
  }

  function toggleAutoRoute() {
    state.autoRouteDiagram = !state.autoRouteDiagram;
    mount(state.containerId, state.activeDiagramId);
  }

  // =========================================================================
  // LIVE QUERY SYNCHRONIZATION & PULSE ANIMATION
  // =========================================================================
  function syncLiveQuery(sql, stats) {
    if (!sql || !sql.trim()) return;
    const cleanSql = sql.trim();
    state.lastQuery = cleanSql;
    state.lastExecutionStats = stats || { latencyMs: 0.35, rowCount: 1, table: 'DATA' };
    state.lastQueryAnalysis = analyzeQueryForArchitecture(cleanSql);

    // Auto-switch schematic if enabled
    if (state.autoRouteDiagram && state.lastQueryAnalysis.recommendedDiagram) {
      state.activeDiagramId = state.lastQueryAnalysis.recommendedDiagram;
    }

    state.viewMode = 'live';
    state.currentStepIdx = 0;
    mount(state.containerId, state.activeDiagramId);
    playLiveExecutionPulse();
  }

  function playLiveExecutionPulse() {
    if (state.livePulseTimer) {
      clearInterval(state.livePulseTimer);
      state.livePulseTimer = null;
    }
    const data = ARCH_DEEP_DIVES[state.activeDiagramId] || ARCH_DEEP_DIVES['buffer_pool'];
    const totalSteps = data.steps.length;
    let step = 0;
    state.currentStepIdx = 0;
    state.liveAnimationActive = true;
    updateSvgHighlight();

    // Initial SQL highlight
    const initClause = getStepSqlTarget(state.activeDiagramId, 0);
    if (typeof window.highlightStudioSqlClause === 'function') {
      window.highlightStudioSqlClause(initClause);
    }

    const intervalMs = state.playSpeed === 2 ? 220 : 420;
    state.livePulseTimer = setInterval(() => {
      step++;
      if (step >= totalSteps) {
        clearInterval(state.livePulseTimer);
        state.livePulseTimer = null;
        state.liveAnimationActive = false;
        state.currentStepIdx = totalSteps - 1;
        updateSvgHighlight();
        const finalClause = getStepSqlTarget(state.activeDiagramId, totalSteps - 1);
        if (typeof window.highlightStudioSqlClause === 'function') {
          window.highlightStudioSqlClause(finalClause);
        }
      } else {
        state.currentStepIdx = step;
        updateSvgHighlight();
        const curClause = getStepSqlTarget(state.activeDiagramId, step);
        if (typeof window.highlightStudioSqlClause === 'function') {
          window.highlightStudioSqlClause(curClause);
        }
      }
    }, intervalMs);
  }

  function selectStepWithSql(idx) {
    const data = ARCH_DEEP_DIVES[state.activeDiagramId] || ARCH_DEEP_DIVES['buffer_pool'];
    if (idx >= 0 && idx < data.steps.length) {
      state.currentStepIdx = idx;
      if (state.livePulseTimer) {
        clearInterval(state.livePulseTimer);
        state.livePulseTimer = null;
        state.liveAnimationActive = false;
      }
      const targetClause = getStepSqlTarget(state.activeDiagramId, idx);
      if (typeof window.highlightStudioSqlClause === 'function') {
        window.highlightStudioSqlClause(targetClause);
      }
      mount(state.containerId, state.activeDiagramId);
      if (window.soundFX && typeof window.soundFX.playPop === 'function') {
        window.soundFX.playPop();
      }
    }
  }

  // =========================================================================
  // VIEWER HTML RENDERER
  // =========================================================================
  function renderViewerHtml(data, chaosList) {
    const isChaos = state.viewMode === 'chaos';
    const isLive = state.viewMode === 'live';
    const curScenario = data.scenarios[state.activeScenarioIdx] || data.scenarios[0];
    const curStep = data.steps[state.currentStepIdx] || data.steps[0];
    const curChaos = chaosList[state.activeChaosIdx] || chaosList[0];
    const rawSvg = window.DatabaseArchitectureSvgs.renderById(data.id);
    const catalog = (window.DatabaseArchitectureSvgs && window.DatabaseArchitectureSvgs.getCatalog) ? window.DatabaseArchitectureSvgs.getCatalog() : [];
    const stats = state.lastExecutionStats || { latencyMs: 0.35, rowCount: 8, table: 'CITY' };
    const analysis = state.lastQueryAnalysis || analyzeQueryForArchitecture(state.lastQuery);
    const targetClause = getStepSqlTarget(state.activeDiagramId, state.currentStepIdx);

    return `
      <div class="interactive-arch-container" style="display:flex; flex-direction:column; gap:12px; font-family:'JetBrains Mono', monospace;">
        
        <!-- Header: Diagram Selector & 3-Way Mode Switcher -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:10px 14px; background:#0d0e12; border:1px solid rgba(255,255,255,0.14); border-radius:6px;">
          <!-- Left: Diagram Selector Dropdown -->
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <select id="selectArchDiagram" onchange="window.InteractiveArchitectureExplainer.switchDiagram(this.value)" style="background:#141418; color:#ffffff; border:1px solid rgba(255,255,255,0.22); border-radius:4px; padding:5px 12px; font-size:11px; font-family:'JetBrains Mono', monospace; font-weight:600; cursor:pointer;">
              ${catalog.map(d => `<option value="${d.id}" ${d.id === data.id ? 'selected' : ''}>[${d.badge}] ${d.title}</option>`).join('')}
            </select>
            ${isLive ? `
              <span style="font-size:9.5px; font-weight:700; padding:2px 8px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.3); border-radius:3px; letter-spacing:0.04em;">[● LIVE WASM SYNC ACTIVE]</span>
            ` : isChaos ? `
              <span style="font-size:9.5px; font-weight:700; padding:2px 8px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.3); border-radius:3px; letter-spacing:0.04em;">[CHAOS FAULT INJECTION ACTIVE]</span>
            ` : `
              <span style="font-size:9.5px; padding:2px 6px; background:#18181b; color:#a1a1aa; border:1px solid rgba(255,255,255,0.18); border-radius:3px;">PHASE ${curStep.stepNum} OF ${data.steps.length}</span>
            `}
          </div>

          <!-- Right: Mode Switcher Buttons (Stepper / Chaos / Live Sync) -->
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <button onclick="window.InteractiveArchitectureExplainer.setMode('stepper')" 
              style="padding:4px 10px; font-size:10.5px; font-family:'JetBrains Mono', monospace; font-weight:600; border-radius:4px; cursor:pointer; background:${state.viewMode === 'stepper' ? '#ffffff' : '#141418'}; color:${state.viewMode === 'stepper' ? '#000000' : '#a1a1aa'}; border:1px solid ${state.viewMode === 'stepper' ? '#ffffff' : 'rgba(255,255,255,0.15)'};">
              ● STEPPER
            </button>
            <button onclick="window.InteractiveArchitectureExplainer.setMode('chaos')" 
              style="padding:4px 10px; font-size:10.5px; font-family:'JetBrains Mono', monospace; font-weight:700; border-radius:4px; cursor:pointer; background:${state.viewMode === 'chaos' ? '#ffffff' : '#141418'}; color:${state.viewMode === 'chaos' ? '#000000' : '#ffffff'}; border:1px solid ${state.viewMode === 'chaos' ? '#ffffff' : 'rgba(255,255,255,0.22)'}; box-shadow:${state.viewMode === 'chaos' ? '0 0 10px rgba(255,255,255,0.18)' : 'none'};">
              &#9889; CHAOS
            </button>
            <button onclick="window.InteractiveArchitectureExplainer.setMode('live')" 
              style="padding:4px 10px; font-size:10.5px; font-family:'JetBrains Mono', monospace; font-weight:700; border-radius:4px; cursor:pointer; background:${state.viewMode === 'live' ? '#ffffff' : '#141418'}; color:${state.viewMode === 'live' ? '#000000' : '#ffffff'}; border:1px solid ${state.viewMode === 'live' ? '#ffffff' : 'rgba(255,255,255,0.22)'}; box-shadow:${state.viewMode === 'live' ? '0 0 10px rgba(255,255,255,0.18)' : 'none'};">
              &#9654; LIVE SYNC
            </button>
          </div>
        </div>

        <!-- Sub-Bar: Controls depending on Mode -->
        ${isLive ? `
          <!-- Live Query Synchronization Sub-Bar -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding:8px 12px; background:#0a0c10; border:1px solid rgba(255,255,255,0.15); border-radius:6px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span style="font-size:9.5px; font-weight:700; color:#ffffff; text-transform:uppercase;">QUERY RUNNER HUD:</span>
              <span style="font-size:10px; padding:2px 8px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.22); border-radius:3px;">
                ${stats.latencyMs}ms • ${stats.rowCount} rows • ${stats.table || 'QUERY'}
              </span>
              <button onclick="window.InteractiveArchitectureExplainer.toggleAutoRoute()"
                style="padding:2px 8px; font-size:10px; font-family:'JetBrains Mono', monospace; font-weight:600; background:${state.autoRouteDiagram ? '#ffffff' : '#141418'}; color:${state.autoRouteDiagram ? '#000000' : '#71717a'}; border:1px solid rgba(255,255,255,0.2); border-radius:3px; cursor:pointer;"
                title="Automatically switch schematic to match executed SQL operator">
                AUTO-DETECT: ${state.autoRouteDiagram ? 'ON' : 'OFF'}
              </button>
            </div>
            
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <button onclick="window.InteractiveArchitectureExplainer.replayLivePulse()"
                style="padding:3px 10px; font-size:10.5px; font-weight:700; background:#ffffff; color:#000000; border:1px solid #ffffff; border-radius:3px; cursor:pointer;"
                title="Replay animated execution pulse across diagram">
                &#8635; REPLAY PULSE
              </button>
              <button onclick="window.InteractiveArchitectureExplainer.prevStep()" style="padding:3px 8px; font-size:10.5px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.18); border-radius:3px; cursor:pointer;">&larr;</button>
              <button onclick="window.InteractiveArchitectureExplainer.nextStep()" style="padding:3px 8px; font-size:10.5px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.18); border-radius:3px; cursor:pointer;">&rarr;</button>
            </div>
          </div>
        ` : isChaos ? `
          <!-- Chaos Fault Selector Sub-Bar -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding:8px 12px; background:#111216; border:1px solid rgba(255,255,255,0.2); border-radius:6px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:9.5px; font-weight:700; color:#ffffff; text-transform:uppercase;">Select Chaos Injection Fault:</span>
              <span style="font-size:9px; font-weight:700; padding:1px 6px; background:#000000; color:#ffffff; border:1px solid rgba(255,255,255,0.3); border-radius:3px;">${curChaos.severity}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              ${chaosList.map((ch, i) => `
                <button onclick="window.InteractiveArchitectureExplainer.setChaosScenario(${i})"
                  style="padding:4px 10px; font-size:10.5px; font-family:'JetBrains Mono', monospace; font-weight:700; border-radius:3px; cursor:pointer; background:${i === state.activeChaosIdx ? '#ffffff' : '#18181b'}; color:${i === state.activeChaosIdx ? '#000000' : '#ffffff'}; border:1px solid ${i === state.activeChaosIdx ? '#ffffff' : 'rgba(255,255,255,0.22)'};">
                  [FAULT 0${i + 1}] ${ch.title.split('&')[0].trim()}
                </button>
              `).join('')}
            </div>
          </div>
        ` : `
          <!-- Normal Stepper Scenarios Sub-Bar -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding:8px 12px; background:#08090c; border:1px solid rgba(255,255,255,0.08); border-radius:6px;">
            <span style="font-size:9.5px; color:#71717a; text-transform:uppercase;">Normal Execution Scenarios:</span>
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              ${data.scenarios.map((sc, i) => `
                <button class="arch-scenario-btn" 
                  onclick="window.InteractiveArchitectureExplainer.setScenario(${i})"
                  style="padding:3px 9px; font-size:10px; font-family:'JetBrains Mono', monospace; font-weight:${i === state.activeScenarioIdx ? '700' : '400'}; border-radius:3px; cursor:pointer; background:${i === state.activeScenarioIdx ? '#ffffff' : '#141418'}; color:${i === state.activeScenarioIdx ? '#000000' : '#a1a1aa'}; border:1px solid ${i === state.activeScenarioIdx ? '#ffffff' : 'rgba(255,255,255,0.12)'};">
                  ${sc.title.split('(')[0].trim()}
                </button>
              `).join('')}
            </div>
          </div>
        `}

        <!-- Interactive SVG Stage with Dynamic Highlight / Chaos Overlay / Hotspots -->
        <div style="position:relative; width:100%; overflow-x:auto; background:#000000; border-radius:6px; border:1px solid rgba(255,255,255,0.15); padding:4px;">
          <div id="archSvgMount" style="position:relative; width:1000px; margin:0 auto;">
            ${rawSvg}
            <!-- Overlay SVG for Real-time Subsystem Focus, Fault Waves & Particle Beacon -->
            <svg id="archHighlightOverlay" viewBox="0 0 1000 300" style="position:absolute; top:0; left:0; width:100%; height:100%;">
              <defs>
                <filter id="arch-glow-white" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
                <filter id="arch-glow-hazard" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4.5" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>
              <g id="archOverlayContent"></g>
            </svg>
          </div>
        </div>

        <!-- Navigation Ribbon / Stepping Pills -->
        ${isLive ? `
          <!-- Live Execution Phase Stepper Strip -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:8px 12px; background:#0a0b0e; border:1px solid rgba(255,255,255,0.12); border-radius:6px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:10px; font-weight:700; color:#ffffff;">EXECUTION PHASES:</span>
            </div>
            
            <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
              ${data.steps.map((st, i) => `
                <button onclick="window.InteractiveArchitectureExplainer.selectStepWithSql(${i})" 
                  style="padding:3px 8px; font-size:10px; font-family:'JetBrains Mono', monospace; font-weight:${i === state.currentStepIdx ? '700' : '500'}; background:${i === state.currentStepIdx ? '#ffffff' : '#111216'}; color:${i === state.currentStepIdx ? '#000000' : '#71717a'}; border:1px solid ${i === state.currentStepIdx ? '#ffffff' : 'rgba(255,255,255,0.1)'}; border-radius:3px; cursor:pointer;"
                  title="Step 0${st.stepNum}: Click to highlight SQL keyword [${getStepSqlTarget(state.activeDiagramId, i)}] in editor">
                  [0${st.stepNum}] ${st.name.split('&')[0].trim()}
                </button>
              `).join('')}
            </div>

            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:10px; color:#71717a;">Pacing:</span>
              <button onclick="window.InteractiveArchitectureExplainer.toggleSpeed()" style="padding:2px 8px; font-size:10px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.18); border-radius:3px; cursor:pointer;">
                ${state.playSpeed}x
              </button>
            </div>
          </div>

          <!-- Live Telemetry HUD (3 Cards) -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:10px;">
            <div style="background:#090a0d; border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#a1a1aa; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">LIVE CLIENT-SIDE WASM EXECUTION</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">Latency: ${stats.latencyMs}ms • ${stats.rowCount} rows returned</div>
              <div style="font-size:10px; color:#71717a;">Active Target: ${stats.table || 'Relation'} • In-Browser SQLite WASM</div>
            </div>

            <div style="background:#090a0d; border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#a1a1aa; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">PHYSICAL ENGINE OPERATOR</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${analysis.detectedOp} (${analysis.complexity})</div>
              <div style="font-size:10px; color:#71717a;">Active SQL Keyword: [${targetClause}] in query editor</div>
            </div>

            <div style="background:#090a0d; border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#a1a1aa; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">HARDWARE REGISTER &amp; BUS REACTION</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${analysis.hardwareSummary}</div>
              <div style="font-size:10px; color:#71717a;">${analysis.kernelReaction}</div>
            </div>
          </div>

          <!-- Live Physical Plan & SQL Bi-Directional Binding Card -->
          <div style="background:#0a0a0d; border:1px solid rgba(255,255,255,0.18); border-left:3px solid #ffffff; border-radius:6px; padding:12px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
              <span style="font-size:10px; font-weight:700; color:#ffffff; letter-spacing:0.04em;">LIVE SQL QUERY &bull; PHYSICAL EXECUTION PLAN</span>
              <span style="font-size:9px; font-weight:700; padding:2px 6px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.22); border-radius:3px;">
                CLICK ANY SVG NODE TO SELECT MATCHING SQL CLAUSE
              </span>
            </div>
            <pre style="margin:4px 0 8px 0; padding:8px 12px; background:#000000; color:#ffffff; border:1px solid rgba(255,255,255,0.12); border-radius:4px; font-size:11px; overflow-x:auto;">${state.lastQuery || 'SELECT * FROM table;'}</pre>
            <div style="font-size:11px; color:#d4d4d8; line-height:1.45;">
              <span style="color:#ffffff; font-weight:700;">Subsystem Action (Phase 0${curStep.stepNum}):</span> ${curStep.telemetry.invariant}
            </div>
          </div>
        ` : !isChaos ? `
          <!-- Stepper Transport & Step Navigation Strip -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:8px 12px; background:#0a0b0e; border:1px solid rgba(255,255,255,0.12); border-radius:6px;">
            <!-- Left: Playback buttons -->
            <div style="display:flex; align-items:center; gap:6px;">
              <button onclick="window.InteractiveArchitectureExplainer.prevStep()" style="padding:4px 10px; font-size:11px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.2); border-radius:4px; cursor:pointer;" title="Previous Step">&larr; Prev</button>
              <button id="btnArchPlayPause" onclick="window.InteractiveArchitectureExplainer.togglePlay()" style="padding:4px 12px; font-size:11px; font-weight:700; background:#ffffff; color:#000000; border:1px solid #ffffff; border-radius:4px; cursor:pointer;">
                ${state.isPlaying ? '&#10074;&#10074; Pause' : '&#9654; Auto-Play'}
              </button>
              <button onclick="window.InteractiveArchitectureExplainer.nextStep()" style="padding:4px 10px; font-size:11px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.2); border-radius:4px; cursor:pointer;" title="Next Step">Next &rarr;</button>
              <button onclick="window.InteractiveArchitectureExplainer.reset()" style="padding:4px 8px; font-size:11px; background:#141418; color:#71717a; border:1px solid rgba(255,255,255,0.12); border-radius:4px; cursor:pointer;" title="Reset to Step 1">&#8634;</button>
            </div>

            <!-- Middle: Step Pills -->
            <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
              ${data.steps.map((st, i) => `
                <button onclick="window.InteractiveArchitectureExplainer.selectStepWithSql(${i})" style="padding:3px 8px; font-size:10px; font-family:'JetBrains Mono', monospace; font-weight:${i === state.currentStepIdx ? '700' : '500'}; background:${i === state.currentStepIdx ? '#ffffff' : '#111216'}; color:${i === state.currentStepIdx ? '#000000' : '#71717a'}; border:1px solid ${i === state.currentStepIdx ? '#ffffff' : 'rgba(255,255,255,0.1)'}; border-radius:3px; cursor:pointer;">
                  [0${st.stepNum}] ${st.name.split('&')[0].trim()}
                </button>
              `).join('')}
            </div>

            <!-- Right: Speed Toggle -->
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:10px; color:#71717a;">Speed:</span>
              <button onclick="window.InteractiveArchitectureExplainer.toggleSpeed()" style="padding:2px 8px; font-size:10px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.18); border-radius:3px; cursor:pointer;">
                ${state.playSpeed}x
              </button>
            </div>
          </div>

          <!-- Normal Telemetry HUD (3 Cards) -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:10px;">
            <div style="background:#090a0d; border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#a1a1aa; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">HARDWARE &amp; OS RUNTIME</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${curStep.telemetry.hardware}</div>
              <div style="font-size:10px; color:#71717a;">L1/L2 Cacheline: 64 Bytes • SIMD AVX-512 Ready</div>
            </div>

            <div style="background:#090a0d; border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#a1a1aa; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">SYSTEM INVARIANT VERIFIED</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${curStep.telemetry.invariant}</div>
              <div style="font-size:10px; color:#71717a;">Engine State: NOMINAL (Invariants Preserved)</div>
            </div>

            <div style="background:#090a0d; border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#a1a1aa; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">KERNEL &amp; STORAGE BUS INTERACTION</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${curStep.telemetry.kernel}</div>
              <div style="font-size:10px; color:#71717a;">Status: ZERO-COPY MEMORY PIPELINE</div>
            </div>
          </div>

          <!-- Staff Engineer Defense Card -->
          <div style="background:#090a0d; border:1px solid rgba(255,255,255,0.14); border-left:3px solid #ffffff; border-radius:6px; padding:14px 18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
              <span style="font-size:10px; font-weight:700; color:#ffffff; letter-spacing:0.05em;">FAANG STAFF INTERVIEW DEFENSE &bull; DATABASE ARCHITECT</span>
              <span style="font-size:9px; font-weight:700; padding:2px 6px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.2); border-radius:3px;">SYSTEM INVARIANT EXPLAINER</span>
            </div>
            <div style="font-size:11px; color:#ffffff; font-weight:700; margin-bottom:6px;">
              Q: ${curStep.defense.question}
            </div>
            <p style="font-size:11px; color:#a1a1aa; line-height:1.5; margin:0 0 10px 0;">
              ${curStep.defense.answer}
            </p>
            <div>
              <span style="font-size:9.5px; font-weight:700; color:#71717a; text-transform:uppercase;">C++ / C Engine Implementation Pattern:</span>
              <pre style="margin:4px 0 0 0; padding:8px 12px; background:#000000; color:#ffffff; border:1px solid rgba(255,255,255,0.1); border-radius:4px; font-size:10.5px; overflow-x:auto;">${curStep.snippet}</pre>
            </div>
          </div>
        ` : `
          <!-- Chaos Telemetry HUD (3 Cards) -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:10px;">
            <!-- Alert Card 1: Impact -->
            <div style="background:#0e0f14; border:1px solid rgba(255,255,255,0.22); border-top:2px solid #ffffff; border-radius:6px; padding:10px 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span style="font-size:9.5px; font-weight:700; color:#ffffff; text-transform:uppercase; letter-spacing:0.04em;">FAILURE IMPACT &amp; SEVERITY</span>
                <span style="font-size:8.5px; font-weight:800; padding:1px 5px; background:#ffffff; color:#000000; border-radius:2px;">${curChaos.severity}</span>
              </div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${curChaos.metrics.impact}</div>
              <div style="font-size:10px; color:#71717a;">Fault: ${curChaos.title}</div>
            </div>

            <!-- Alert Card 2: Invariant Attacked -->
            <div style="background:#0e0f14; border:1px solid rgba(255,255,255,0.22); border-top:2px solid #ffffff; border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#ffffff; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">SYSTEM INVARIANT UNDER ATTACK</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${curChaos.metrics.invariant}</div>
              <div style="font-size:10px; color:#71717a;">Engine State: DEGRADED / AT RISK</div>
            </div>

            <!-- Alert Card 3: Kernel Reaction -->
            <div style="background:#0e0f14; border:1px solid rgba(255,255,255,0.22); border-top:2px solid #ffffff; border-radius:6px; padding:10px 12px;">
              <div style="font-size:9.5px; font-weight:700; color:#ffffff; text-transform:uppercase; margin-bottom:4px; letter-spacing:0.04em;">OS &amp; STORAGE KERNEL REACTION</div>
              <div style="font-size:11px; color:#ffffff; font-weight:600; margin-bottom:4px;">${curChaos.metrics.kernel}</div>
              <div style="font-size:10px; color:#71717a;">Status: SATURATION DETECTED</div>
            </div>
          </div>

          <!-- Staff Architect Root Cause Analysis (RCA) & Production Runbook Card -->
          <div style="background:#0a0a0d; border:1px solid rgba(255,255,255,0.2); border-left:3px solid #ffffff; border-radius:6px; padding:14px 18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
              <span style="font-size:10.5px; font-weight:700; color:#ffffff; letter-spacing:0.05em;">PRODUCTION RCA &amp; RUNBOOK MITIGATION // ${curChaos.title.toUpperCase()}</span>
              <span style="font-size:9px; font-weight:700; padding:2px 6px; background:#18181b; color:#ffffff; border:1px solid rgba(255,255,255,0.2); border-radius:3px;">TIER-1 ARCHITECT AUDIT</span>
            </div>
            
            <div style="margin-bottom:8px;">
              <span style="font-size:10px; font-weight:700; color:#a1a1aa; text-transform:uppercase;">Production Incident Context:</span>
              <p style="font-size:11px; color:#e4e4e7; line-height:1.45; margin:3px 0 0 0;">${curChaos.rca.incident}</p>
            </div>

            <div style="margin-bottom:10px;">
              <span style="font-size:10px; font-weight:700; color:#ffffff; text-transform:uppercase;">Principal Architect Runbook &amp; Tuning Fix:</span>
              <p style="font-size:11px; color:#d4d4d8; line-height:1.45; margin:3px 0 0 0;">${curChaos.rca.mitigation}</p>
            </div>

            <div>
              <span style="font-size:9.5px; font-weight:700; color:#71717a; text-transform:uppercase;">Chaos Injection &amp; Reproduce Script (SQL / Bash):</span>
              <pre style="margin:4px 0 0 0; padding:8px 12px; background:#000000; color:#ffffff; border:1px solid rgba(255,255,255,0.12); border-radius:4px; font-size:10.5px; overflow-x:auto;">${curChaos.rca.injectionScript}</pre>
            </div>
          </div>
        `}

      </div>
    `;
  }

  // Update dynamic SVG highlight overlay (Handles Stepper, Chaos, and Live Sync)
  function updateSvgHighlight() {
    const overlayGroup = document.getElementById('archOverlayContent');
    if (!overlayGroup) return;

    const isChaos = state.viewMode === 'chaos';
    const isLive = state.viewMode === 'live';
    const data = ARCH_DEEP_DIVES[state.activeDiagramId] || ARCH_DEEP_DIVES['buffer_pool'];
    const chaosList = CHAOS_DEEP_DIVES[state.activeDiagramId] || CHAOS_DEEP_DIVES['buffer_pool'];

    if (isLive) {
      // Live Query Execution Pulse Animated Overlay
      const curStep = data.steps[state.currentStepIdx] || data.steps[0];
      const { x, y, w, h } = curStep.box;
      const beacon = curStep.beacon;
      const analysis = state.lastQueryAnalysis || analyzeQueryForArchitecture(state.lastQuery);
      const prevStep = state.currentStepIdx > 0 ? data.steps[state.currentStepIdx - 1] : null;

      overlayGroup.innerHTML = `
        <!-- Transparent Click Hotspots over all Steps for Bi-directional Selection -->
        ${data.steps.map((st, i) => `
          <rect x="${st.box.x}" y="${st.box.y}" width="${st.box.w}" height="${st.box.h}" 
            fill="transparent" cursor="pointer" pointer-events="all"
            onclick="window.InteractiveArchitectureExplainer.selectStepWithSql(${i})">
            <title>Step 0${st.stepNum}: Click to highlight SQL keyword [${getStepSqlTarget(state.activeDiagramId, i)}]</title>
          </rect>
        `).join('')}

        ${prevStep ? `
          <!-- Animated Data-Flow Laser Beam from Previous Subsystem -->
          <line x1="${prevStep.beacon.x}" y1="${prevStep.beacon.y}" x2="${beacon.x}" y2="${beacon.y}" 
            stroke="#ffffff" stroke-width="1.8" stroke-dasharray="6 3" opacity="0.85">
            <animate attributeName="stroke-dashoffset" values="18;0" dur="0.8s" repeatCount="indefinite" />
          </line>
        ` : ''}

        <!-- Active Subsystem Glowing Bounding Box -->
        <rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="8" fill="none" stroke="#ffffff" stroke-width="2.2" filter="url(#arch-glow-white)" opacity="0.95" />
        <rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="8" fill="rgba(255,255,255,0.03)" stroke="#ffffff" stroke-width="1.4" stroke-dasharray="6 3" />
        
        <!-- Live WASM Active Step Pill pinned above target -->
        <g transform="translate(${x + 4}, ${Math.max(16, y - 12)})">
          <rect x="0" y="0" width="168" height="20" rx="3" fill="#ffffff" />
          <circle cx="10" cy="10" r="3.5" fill="#000000">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="90" y="13.5" fill="#000000" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="800" text-anchor="middle">LIVE WASM: STEP 0${curStep.stepNum}</text>
        </g>

        <!-- Pulsing Laser Beacon Dot -->
        <circle cx="${beacon.x}" cy="${beacon.y}" r="8" fill="#ffffff" opacity="0.3">
          <animate attributeName="r" values="4;14;4" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="${beacon.x}" cy="${beacon.y}" r="3.5" fill="#ffffff" />

        <!-- Detected Physical Operator Badge below Beacon -->
        <g transform="translate(${beacon.x - 50}, ${beacon.y + 12})">
          <rect x="0" y="0" width="100" height="14" rx="2" fill="#000000" stroke="rgba(255,255,255,0.3)" stroke-width="0.8" />
          <text x="50" y="9.5" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="700" text-anchor="middle">[${analysis.detectedOp}]</text>
        </g>
      `;
    } else if (!isChaos) {
      // Normal Stepper Subsystem Highlight
      const curStep = data.steps[state.currentStepIdx] || data.steps[0];
      const { x, y, w, h } = curStep.box;
      const beacon = curStep.beacon;

      overlayGroup.innerHTML = `
        <!-- Transparent Click Hotspots over all Steps -->
        ${data.steps.map((st, i) => `
          <rect x="${st.box.x}" y="${st.box.y}" width="${st.box.w}" height="${st.box.h}" 
            fill="transparent" cursor="pointer" pointer-events="all"
            onclick="window.InteractiveArchitectureExplainer.selectStepWithSql(${i})">
            <title>Step 0${st.stepNum}: Click to select and highlight [${getStepSqlTarget(state.activeDiagramId, i)}]</title>
          </rect>
        `).join('')}

        <!-- Active Subsystem Glowing Bounding Box -->
        <rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="8" fill="none" stroke="#ffffff" stroke-width="1.8" filter="url(#arch-glow-white)" opacity="0.85" />
        <rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="8" fill="rgba(255,255,255,0.02)" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="6 3" />
        
        <!-- Monospace Active Step Pill pinned above target -->
        <g transform="translate(${x + 4}, ${Math.max(16, y - 10)})">
          <rect x="0" y="0" width="130" height="18" rx="3" fill="#ffffff" />
          <text x="65" y="12" fill="#000000" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" text-anchor="middle">ACTIVE: STEP 0${curStep.stepNum}</text>
        </g>

        <!-- Pulsing Laser Beacon Dot -->
        <circle cx="${beacon.x}" cy="${beacon.y}" r="6" fill="#ffffff" opacity="0.25">
          <animate attributeName="r" values="3;10;3" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="${beacon.x}" cy="${beacon.y}" r="3" fill="#ffffff" />
      `;
    } else {
      // Chaos Fault Injection Animated Overlay
      const curChaos = chaosList[state.activeChaosIdx] || chaosList[0];
      const { x, y, w, h } = curChaos.targetBox;
      const b = curChaos.beacon;

      overlayGroup.innerHTML = `
        <!-- High-Alert Pulsing Hazard Border -->
        <rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="8" fill="none" stroke="#ffffff" stroke-width="2.5" filter="url(#arch-glow-hazard)" opacity="0.95">
          <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="8" fill="rgba(255,255,255,0.04)" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="8 4" />

        <!-- Chaos Hazard Callout Banner Pinned to Subsystem -->
        <g transform="translate(${x + 4}, ${Math.max(16, y - 12)})">
          <rect x="0" y="0" width="168" height="20" rx="3" fill="#ffffff" />
          <text x="84" y="13" fill="#000000" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="800" text-anchor="middle">&#9889; ${curChaos.severity}: FAULT INJECTED</text>
        </g>

        <!-- Pulsing Hazard Focal Pin with Rapid Shockwaves -->
        <circle cx="${b.x}" cy="${b.y}" r="16" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.8">
          <animate attributeName="r" values="4;22;4" dur="1.0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.05;0.9" dur="1.0s" repeatCount="indefinite" />
        </circle>
        <circle cx="${b.x}" cy="${b.y}" r="4.5" fill="#ffffff" />

        <!-- Fault Label inside Subsystem -->
        <text x="${b.x}" y="${b.y + 18}" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle" filter="url(#arch-glow-white)">[${curChaos.faultType}]</text>
      `;
    }
  }

  function setStep(idx) {
    const data = ARCH_DEEP_DIVES[state.activeDiagramId] || ARCH_DEEP_DIVES['buffer_pool'];
    if (idx >= 0 && idx < data.steps.length) {
      state.currentStepIdx = idx;
      mount(state.containerId, state.activeDiagramId);
    }
  }

  function nextStep() {
    const data = ARCH_DEEP_DIVES[state.activeDiagramId] || ARCH_DEEP_DIVES['buffer_pool'];
    const nextIdx = (state.currentStepIdx + 1) % data.steps.length;
    if (state.viewMode === 'live') {
      selectStepWithSql(nextIdx);
    } else {
      setStep(nextIdx);
    }
  }

  function prevStep() {
    const data = ARCH_DEEP_DIVES[state.activeDiagramId] || ARCH_DEEP_DIVES['buffer_pool'];
    const prevIdx = (state.currentStepIdx - 1 + data.steps.length) % data.steps.length;
    if (state.viewMode === 'live') {
      selectStepWithSql(prevIdx);
    } else {
      setStep(prevIdx);
    }
  }

  function reset() {
    if (state.viewMode === 'live') {
      selectStepWithSql(0);
    } else {
      setStep(0);
    }
  }

  function setScenario(scIdx) {
    state.activeScenarioIdx = scIdx;
    state.currentStepIdx = 0;
    mount(state.containerId, state.activeDiagramId);
  }

  function togglePlay() {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function play() {
    state.isPlaying = true;
    const btn = document.getElementById('btnArchPlayPause');
    if (btn) btn.innerHTML = '&#10074;&#10074; Pause';
    const interval = state.playSpeed === 2 ? 1100 : 2200;
    if (state.timer) clearInterval(state.timer);
    state.timer = setInterval(() => {
      nextStep();
    }, interval);
  }

  function pause() {
    state.isPlaying = false;
    const btn = document.getElementById('btnArchPlayPause');
    if (btn) btn.innerHTML = '&#9654; Auto-Play';
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
    if (state.livePulseTimer) {
      clearInterval(state.livePulseTimer);
      state.livePulseTimer = null;
      state.liveAnimationActive = false;
    }
  }

  function toggleSpeed() {
    state.playSpeed = state.playSpeed === 1 ? 2 : 1;
    if (state.isPlaying) {
      play();
    } else {
      mount(state.containerId, state.activeDiagramId);
    }
  }

  function switchDiagram(diagramId) {
    state.activeDiagramId = normalizeDiagramId(diagramId);
    state.currentStepIdx = 0;
    state.activeScenarioIdx = 0;
    state.activeChaosIdx = 0;
    pause();
    mount(state.containerId, state.activeDiagramId);
  }

  return {
    mount,
    switchDiagram,
    setMode,
    setChaosScenario,
    setStep,
    nextStep,
    prevStep,
    reset,
    setScenario,
    togglePlay,
    play,
    pause,
    toggleSpeed,
    // Live query synchronization methods
    syncLiveQuery,
    toggleAutoRoute,
    replayLivePulse: playLiveExecutionPulse,
    selectStepWithSql,
    analyzeQuery: analyzeQueryForArchitecture,
    getDeepDiveData: () => ARCH_DEEP_DIVES,
    getChaosData: () => CHAOS_DEEP_DIVES,
    getState: () => ({ ...state })
  };

})();
