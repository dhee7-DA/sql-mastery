// =============================================================================
// DEEP-DIVE PRACTICE VOLUMES DATA VAULT
// 4 Master Technical Volumes · 48 Production Systems Problems
// Designed for Staff Software Engineers & High-Scale Database Architects
// =============================================================================

window.DEEP_DIVE_PRACTICE_VOLUMES = [
  {
    "volumeId": "vol_1_storage",
    "volumeSeq": "01",
    "volumeName": "Volume 1: Storage, Memory & Durability Physics",
    "volumeShortName": "Vol 1: Storage & Memory",
    "badge": "12 Deep-Dive Problems",
    "description": "Master physical buffer frame replacement (2Q / LRU-K), B+ Tree fill-factor page splits, ARIES WAL undo chains, slotted page compaction, columnar SIMD bit-packing, and flash SSD write amplification.",
    "problems": [
      {
        "id": "vol1_01_buffer_lru",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "01",
        "topicSeq": "V1-01",
        "title": "Buffer Pool LRU-K / 2Q Frame Eviction Under Sequential Flooding",
        "domain": "Database Storage Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "BUFFER_POOL_FRAMES",
        "columns": [
          {
            "name": "frame_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "page_id",
            "type": "INTEGER"
          },
          {
            "name": "table_name",
            "type": "TEXT"
          },
          {
            "name": "pin_count",
            "type": "INTEGER"
          },
          {
            "name": "is_dirty",
            "type": "INTEGER"
          },
          {
            "name": "l1_touch_ms",
            "type": "INTEGER"
          },
          {
            "name": "l2_touch_ms",
            "type": "INTEGER"
          },
          {
            "name": "clock_ref",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE BUFFER_POOL_FRAMES (\n                    frame_id INTEGER PRIMARY KEY,\n                    page_id INTEGER,\n                    table_name TEXT,\n                    pin_count INTEGER,\n                    is_dirty INTEGER,\n                    l1_touch_ms INTEGER,\n                    l2_touch_ms INTEGER,\n                    clock_ref INTEGER\n                );\n                INSERT INTO BUFFER_POOL_FRAMES VALUES\n                (1, 1001, 'orders', 0, 1, 1050, 900, 0),\n                (2, 1002, 'customers', 2, 0, 1100, 1050, 1),\n                (3, 1003, 'lineitem', 0, 0, 800, 400, 0),\n                (4, 1004, 'catalog_meta', 5, 0, 1200, 1150, 1),\n                (5, 1005, 'orders', 0, 1, 950, 600, 1),\n                (6, 1006, 'audit_log', 0, 0, 750, 300, 0),\n                (7, 1007, 'payments', 1, 1, 1150, 1000, 1),\n                (8, 1008, 'lineitem', 0, 1, 700, 200, 0);\n            ",
        "spec": "Identify unpinned candidate frames (pin_count = 0) with a cleared clock reference (clock_ref = 0), partitioned by whether they require background flushing (is_dirty = 1 vs 0), ordered by oldest secondary touch (l2_touch_ms ASC) to prevent cache pollution from sequential scans.",
        "starterSql": "-- Find unpinned, non-referenced frames ordered by oldest L2 touch\nSELECT \n    frame_id, \n    page_id, \n    table_name, \n    is_dirty, \n    l2_touch_ms\nFROM BUFFER_POOL_FRAMES\nWHERE /* TODO: Filter unpinned and clock_ref = 0 */\nORDER BY is_dirty DESC, l2_touch_ms ASC;",
        "expectedSolutionSql": "SELECT \n    frame_id, \n    page_id, \n    table_name, \n    is_dirty, \n    l2_touch_ms\nFROM BUFFER_POOL_FRAMES\nWHERE pin_count = 0 AND clock_ref = 0\nORDER BY is_dirty DESC, l2_touch_ms ASC;",
        "expectedRowCount": 4,
        "svgDiagramKey": "vol1_01_svg",
        "deepTheory": [
          {
            "title": "Sequential Scan Cache Flooding",
            "body": "A full table scan reading thousands of pages can completely wipe out hot working sets in traditional LRU caches. LRU-2 or 2Q mitigates this by requiring two touches before a page enters the high-priority queue."
          },
          {
            "title": "Clock Sweep Invariant",
            "body": "The clock hand traverses circular frame arrays. If clock_ref is 1, it decrements to 0 and advances. If clock_ref is 0 and pin_count is 0, the frame is evicted, minimizing O(N) lock overhead."
          },
          {
            "title": "Dirty Page Flush Cost",
            "body": "Evicting dirty frames requires a synchronous write to WAL and disk before reuse. Modern engines maintain a background cleaner pool to flush dirty pages proactively."
          },
          {
            "title": "Pin Count Mutexes",
            "body": "A pin count > 0 indicates an active CPU worker holding a shared or exclusive latch on the page buffer. Evicting a pinned page causes immediate memory corruption."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does PostgreSQL and InnoDB prevent large batch sequential scans from destroying the buffer cache hot working set?",
          "hardwareInvariants": "64-byte CPU cache lines, TLB hit rates, memory bus contention, sequential I/O vs random disk seeks.",
          "interviewerIntent": "Test understanding of 2Q/LRU-K algorithms, buffer ring pools, clock sweeps, and dirty page writeback throttling.",
          "spokenAnswer": "Traditional LRU evicts based on recent single access, allowing an analytical scan (e.g. pg_dump) to displace hot index root pages. Both engines isolate sequential scans: PostgreSQL allocates a small 256KB ring buffer for large scans, recycling only those frames. InnoDB splits the LRU list into Young (5/8) and Old (3/8) sublists; a newly fetched page lands in the Old list and only promotes to Young if re-accessed after innodb_old_blocks_time (default 1000ms), mathematically eliminating scan pollution.",
          "powerKeywords": "2Q Cache, LRU-K, Clock Sweep, Ring Buffer, innodb_old_blocks_time, Dirty Page Writeback, Pin Count Latch"
        },
        "seedRows": [
          {
            "frame_id": 1,
            "page_id": 1001,
            "table_name": "orders",
            "pin_count": 0,
            "is_dirty": 1,
            "l1_touch_ms": 1050,
            "l2_touch_ms": 900,
            "clock_ref": 0
          },
          {
            "frame_id": 2,
            "page_id": 1002,
            "table_name": "customers",
            "pin_count": 2,
            "is_dirty": 0,
            "l1_touch_ms": 1100,
            "l2_touch_ms": 1050,
            "clock_ref": 1
          },
          {
            "frame_id": 3,
            "page_id": 1003,
            "table_name": "lineitem",
            "pin_count": 0,
            "is_dirty": 0,
            "l1_touch_ms": 800,
            "l2_touch_ms": 400,
            "clock_ref": 0
          },
          {
            "frame_id": 4,
            "page_id": 1004,
            "table_name": "catalog_meta",
            "pin_count": 5,
            "is_dirty": 0,
            "l1_touch_ms": 1200,
            "l2_touch_ms": 1150,
            "clock_ref": 1
          },
          {
            "frame_id": 5,
            "page_id": 1005,
            "table_name": "orders",
            "pin_count": 0,
            "is_dirty": 1,
            "l1_touch_ms": 950,
            "l2_touch_ms": 600,
            "clock_ref": 1
          },
          {
            "frame_id": 6,
            "page_id": 1006,
            "table_name": "audit_log",
            "pin_count": 0,
            "is_dirty": 0,
            "l1_touch_ms": 750,
            "l2_touch_ms": 300,
            "clock_ref": 0
          },
          {
            "frame_id": 7,
            "page_id": 1007,
            "table_name": "payments",
            "pin_count": 1,
            "is_dirty": 1,
            "l1_touch_ms": 1150,
            "l2_touch_ms": 1000,
            "clock_ref": 1
          },
          {
            "frame_id": 8,
            "page_id": 1008,
            "table_name": "lineitem",
            "pin_count": 0,
            "is_dirty": 1,
            "l1_touch_ms": 700,
            "l2_touch_ms": 200,
            "clock_ref": 0
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_02_btree_page_splits",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "02",
        "topicSeq": "V1-02",
        "title": "B+ Tree Leaf Page Splits & Fill-Factor Fragmentation Thresholds",
        "domain": "Database Storage Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "BTREE_INDEX_PAGES",
        "columns": [
          {
            "name": "page_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "index_name",
            "type": "TEXT"
          },
          {
            "name": "level",
            "type": "INTEGER"
          },
          {
            "name": "key_count",
            "type": "INTEGER"
          },
          {
            "name": "max_capacity",
            "type": "INTEGER"
          },
          {
            "name": "high_key",
            "type": "INTEGER"
          },
          {
            "name": "is_leaf",
            "type": "INTEGER"
          },
          {
            "name": "right_sibling_id",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE BTREE_INDEX_PAGES (\n                    page_id INTEGER PRIMARY KEY,\n                    index_name TEXT,\n                    level INTEGER,\n                    key_count INTEGER,\n                    max_capacity INTEGER,\n                    high_key INTEGER,\n                    is_leaf INTEGER,\n                    right_sibling_id INTEGER\n                );\n                INSERT INTO BTREE_INDEX_PAGES VALUES\n                (101, 'idx_users_created', 0, 240, 250, 4800, 1, 102),\n                (102, 'idx_users_created', 0, 180, 250, 7200, 1, 103),\n                (103, 'idx_users_created', 0, 245, 250, 9600, 1, 104),\n                (104, 'idx_users_created', 0, 90, 250, 11000, 1, NULL),\n                (201, 'idx_users_created', 1, 4, 100, 11000, 0, NULL),\n                (301, 'idx_tx_timestamp', 0, 235, 250, 50000, 1, 302),\n                (302, 'idx_tx_timestamp', 0, 120, 250, 75000, 1, NULL);\n            ",
        "spec": "Find all leaf pages (is_leaf = 1) across all indexes where the fill ratio ((key_count * 100.0) / max_capacity) is >= 90.0%, calculating the remaining capacity and flagging them for proactive splitting or rebalancing.",
        "starterSql": "-- Query B+ Tree leaf pages nearing saturation (>= 90% fill factor)\nSELECT \n    page_id,\n    index_name,\n    key_count,\n    max_capacity,\n    ROUND((key_count * 100.0) / max_capacity, 1) AS fill_ratio_pct,\n    (max_capacity - key_count) AS free_slots\nFROM BTREE_INDEX_PAGES\nWHERE /* TODO: Filter leaf pages >= 90% capacity */\nORDER BY fill_ratio_pct DESC;",
        "expectedSolutionSql": "SELECT \n    page_id,\n    index_name,\n    key_count,\n    max_capacity,\n    ROUND((key_count * 100.0) / max_capacity, 1) AS fill_ratio_pct,\n    (max_capacity - key_count) AS free_slots\nFROM BTREE_INDEX_PAGES\nWHERE is_leaf = 1 AND (key_count * 1.0 / max_capacity) >= 0.90\nORDER BY fill_ratio_pct DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol1_02_svg",
        "deepTheory": [
          {
            "title": "B+ Tree 50% Invariant",
            "body": "Every non-root node in a B+ Tree of order M must contain at least ceil(M/2) keys. A split divides keys 50/50, unless sequential ascending inserts trigger an optimized 90/10 right-leaning split."
          },
          {
            "title": "Mid-Page vs Right-Leaning Splits",
            "body": "Inserting monotonically increasing auto-increment keys with standard 50/50 splits leaves left pages 50% empty forever. Right-leaning splits allocate a new empty right page, keeping left pages 100% packed."
          },
          {
            "title": "Parent Node Cascading Splits",
            "body": "When a leaf splits, its high key must be inserted into the parent internal node. If the parent is full, it splits recursively upward, potentially increasing tree height by 1."
          },
          {
            "title": "Index Bloat from Random Inserts",
            "body": "UUIDv4 keys inserted randomly into B+ Trees cause massive 50/50 splits throughout the tree, leading to 50% dead space and cache thrashing."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why do UUID primary keys degrade B+ Tree insert performance compared to auto-incrementing BIGINTs?",
          "hardwareInvariants": "L3 cache line evictions, random disk block I/O, dirty page churn in buffer pool.",
          "interviewerIntent": "Evaluate understanding of leaf page spatial locality, split mechanics, and write amplification.",
          "spokenAnswer": "Random UUIDs distribute inserts uniformly across all leaf pages rather than appending to the rightmost leaf. When leaf pages fill up, random inserts cause 50/50 mid-page splits across the entire index tree. This halves average page fill-factor to ~67%, doubles physical disk footprint, thrashes the buffer pool by requiring random pages to be paged into RAM, and produces massive WAL volume due to full-page writes.",
          "powerKeywords": "B+ Tree, 50/50 Split, Monotonic Keys, Spatial Locality, Buffer Thrashing, Fill Factor, High Key"
        },
        "seedRows": [
          {
            "page_id": 101,
            "index_name": "idx_users_created",
            "level": 0,
            "key_count": 240,
            "max_capacity": 250,
            "high_key": 4800,
            "is_leaf": 1,
            "right_sibling_id": 102
          },
          {
            "page_id": 102,
            "index_name": "idx_users_created",
            "level": 0,
            "key_count": 180,
            "max_capacity": 250,
            "high_key": 7200,
            "is_leaf": 1,
            "right_sibling_id": 103
          },
          {
            "page_id": 103,
            "index_name": "idx_users_created",
            "level": 0,
            "key_count": 245,
            "max_capacity": 250,
            "high_key": 9600,
            "is_leaf": 1,
            "right_sibling_id": 104
          },
          {
            "page_id": 104,
            "index_name": "idx_users_created",
            "level": 0,
            "key_count": 90,
            "max_capacity": 250,
            "high_key": 11000,
            "is_leaf": 1,
            "right_sibling_id": null
          },
          {
            "page_id": 201,
            "index_name": "idx_users_created",
            "level": 1,
            "key_count": 4,
            "max_capacity": 100,
            "high_key": 11000,
            "is_leaf": 0,
            "right_sibling_id": null
          },
          {
            "page_id": 301,
            "index_name": "idx_tx_timestamp",
            "level": 0,
            "key_count": 235,
            "max_capacity": 250,
            "high_key": 50000,
            "is_leaf": 1,
            "right_sibling_id": 302
          },
          {
            "page_id": 302,
            "index_name": "idx_tx_timestamp",
            "level": 0,
            "key_count": 120,
            "max_capacity": 250,
            "high_key": 75000,
            "is_leaf": 1,
            "right_sibling_id": null
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_03_wal_aries_undo",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "03",
        "topicSeq": "V1-03",
        "title": "Write-Ahead Log (WAL) ARIES Recovery & Active Undo Chains",
        "domain": "Database Storage Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "WAL_LOG_RECORDS",
        "columns": [
          {
            "name": "lsn",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "prev_lsn",
            "type": "INTEGER"
          },
          {
            "name": "tx_id",
            "type": "INTEGER"
          },
          {
            "name": "record_type",
            "type": "TEXT"
          },
          {
            "name": "page_id",
            "type": "INTEGER"
          },
          {
            "name": "undo_next_lsn",
            "type": "INTEGER"
          },
          {
            "name": "payload_bytes",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE WAL_LOG_RECORDS (\n                    lsn INTEGER PRIMARY KEY,\n                    prev_lsn INTEGER,\n                    tx_id INTEGER,\n                    record_type TEXT,\n                    page_id INTEGER,\n                    undo_next_lsn INTEGER,\n                    payload_bytes INTEGER\n                );\n                INSERT INTO WAL_LOG_RECORDS VALUES\n                (1001, NULL, 501, 'UPDATE', 10, NULL, 64),\n                (1002, NULL, 502, 'UPDATE', 20, NULL, 128),\n                (1003, 1001, 501, 'UPDATE', 11, NULL, 64),\n                (1004, NULL, 503, 'UPDATE', 30, NULL, 96),\n                (1005, 1003, 501, 'COMMIT', NULL, NULL, 32),\n                (1006, 1002, 502, 'UPDATE', 21, NULL, 128),\n                (1007, 1004, 503, 'ABORT', NULL, 1004, 32),\n                (1008, 1006, 502, 'UPDATE', 22, NULL, 64);\n            ",
        "spec": "During crash recovery Analysis phase, identify all uncommitted transactions (active transactions that have neither a COMMIT nor an ABORT record) and calculate their latest LSN and total bytes logged to reconstruct the Undo chain.",
        "starterSql": "-- Find active uncommitted transactions at crash time\nSELECT \n    tx_id,\n    MAX(lsn) AS last_lsn,\n    SUM(payload_bytes) AS total_logged_bytes\nFROM WAL_LOG_RECORDS\nWHERE /* TODO: Filter out transactions that committed or aborted */\nGROUP BY tx_id;",
        "expectedSolutionSql": "SELECT \n    tx_id,\n    MAX(lsn) AS last_lsn,\n    SUM(payload_bytes) AS total_logged_bytes\nFROM WAL_LOG_RECORDS\nWHERE tx_id NOT IN (\n    SELECT DISTINCT tx_id \n    FROM WAL_LOG_RECORDS \n    WHERE record_type IN ('COMMIT', 'ABORT')\n)\nGROUP BY tx_id\nORDER BY tx_id ASC;",
        "expectedRowCount": 1,
        "svgDiagramKey": "vol1_03_svg",
        "deepTheory": [
          {
            "title": "ARIES Three-Phase Recovery",
            "body": "Algorithms for Recovery and Isolation Exploiting Semantics (ARIES) executes three phases: Analysis (identifies dirty pages and active transactions), Redo (repeats history forward from checkpoint LSN), and Undo (rolls back active transactions backward)."
          },
          {
            "title": "Write-Ahead Logging Invariant",
            "body": "A page modified in memory CANNOT be written to disk before the WAL record describing the modification is flushed to persistent storage (WAL LSN <= Flushed LSN)."
          },
          {
            "title": "Compensation Log Records (CLRs)",
            "body": "During Undo, each rolled-back action logs a CLR containing an undo_next_lsn pointer. This guarantees that if the system crashes again during recovery, previously undone actions are never undone twice."
          },
          {
            "title": "Fuzzy Checkpoints",
            "body": "Modern databases do not freeze transactions to flush all dirty pages. They write a checkpoint record containing the Dirty Page Table (DPT) and Transaction Table, allowing crash recovery to know exactly where to begin Redo."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is the role of Compensation Log Records (CLRs) in ARIES, and how do they guarantee bounded recovery time during repeated crashes?",
          "hardwareInvariants": "fsync latency, disk write barriers, non-volatile log sequence number monotonically increasing counters.",
          "interviewerIntent": "Evaluate deep grasp of database durability, idempotent recovery, and undo logging.",
          "spokenAnswer": "CLRs are written during the Undo phase of crash recovery as the engine rolls back uncommitted transactions. Each CLR records the inverse operation and crucially contains the 'UndoNextLSN' pointing to the previous log record that still needs rolling back for that transaction. Because CLRs are strictly Redo-Only and never undone, if the system crashes midway through recovery, the subsequent restart simply re-executes the CLRs during Redo and resumes rolling back using the UndoNextLSN pointers, preventing an infinite undo loop.",
          "powerKeywords": "ARIES, CLR (Compensation Log Record), UndoNextLSN, Fuzzy Checkpoint, Repeating History, Idempotent Recovery"
        },
        "seedRows": [
          {
            "lsn": 1001,
            "prev_lsn": null,
            "tx_id": 501,
            "record_type": "UPDATE",
            "page_id": 10,
            "undo_next_lsn": null,
            "payload_bytes": 64
          },
          {
            "lsn": 1002,
            "prev_lsn": null,
            "tx_id": 502,
            "record_type": "UPDATE",
            "page_id": 20,
            "undo_next_lsn": null,
            "payload_bytes": 128
          },
          {
            "lsn": 1003,
            "prev_lsn": 1001,
            "tx_id": 501,
            "record_type": "UPDATE",
            "page_id": 11,
            "undo_next_lsn": null,
            "payload_bytes": 64
          },
          {
            "lsn": 1004,
            "prev_lsn": null,
            "tx_id": 503,
            "record_type": "UPDATE",
            "page_id": 30,
            "undo_next_lsn": null,
            "payload_bytes": 96
          },
          {
            "lsn": 1005,
            "prev_lsn": 1003,
            "tx_id": 501,
            "record_type": "COMMIT",
            "page_id": null,
            "undo_next_lsn": null,
            "payload_bytes": 32
          },
          {
            "lsn": 1006,
            "prev_lsn": 1002,
            "tx_id": 502,
            "record_type": "UPDATE",
            "page_id": 21,
            "undo_next_lsn": null,
            "payload_bytes": 128
          },
          {
            "lsn": 1007,
            "prev_lsn": 1004,
            "tx_id": 503,
            "record_type": "ABORT",
            "page_id": null,
            "undo_next_lsn": 1004,
            "payload_bytes": 32
          },
          {
            "lsn": 1008,
            "prev_lsn": 1006,
            "tx_id": 502,
            "record_type": "UPDATE",
            "page_id": 22,
            "undo_next_lsn": null,
            "payload_bytes": 64
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_04_slotted_page_compaction",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "04",
        "topicSeq": "V1-04",
        "title": "Slotted-Page Tuple Fragmentation & Tombstone Hole Reclamation",
        "domain": "Database Storage Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "SLOTTED_PAGE_TUPLES",
        "columns": [
          {
            "name": "page_id",
            "type": "INTEGER"
          },
          {
            "name": "slot_id",
            "type": "INTEGER"
          },
          {
            "name": "tuple_offset",
            "type": "INTEGER"
          },
          {
            "name": "tuple_length",
            "type": "INTEGER"
          },
          {
            "name": "is_tombstone",
            "type": "INTEGER"
          },
          {
            "name": "is_redirected",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE SLOTTED_PAGE_TUPLES (\n                    page_id INTEGER,\n                    slot_id INTEGER,\n                    tuple_offset INTEGER,\n                    tuple_length INTEGER,\n                    is_tombstone INTEGER,\n                    is_redirected INTEGER,\n                    PRIMARY KEY (page_id, slot_id)\n                );\n                INSERT INTO SLOTTED_PAGE_TUPLES VALUES\n                (1, 0, 8100, 92, 0, 0),\n                (1, 1, 8000, 100, 1, 0),\n                (1, 2, 7850, 150, 0, 0),\n                (1, 3, 7600, 250, 1, 0),\n                (2, 0, 8050, 142, 0, 0),\n                (2, 1, 7900, 150, 0, 0),\n                (3, 0, 8120, 72, 1, 0),\n                (3, 1, 7950, 170, 1, 0),\n                (3, 2, 7800, 150, 1, 0);\n            ",
        "spec": "Calculate fragmentation metrics per page: total allocated tuple bytes, dead tombstone bytes, and the dead space percentage. Filter for pages where dead space exceeds 40% of total allocated bytes, signaling the need for an in-memory page compaction.",
        "starterSql": "-- Identify fragmented slotted pages needing compaction\nSELECT \n    page_id,\n    SUM(tuple_length) AS total_bytes,\n    SUM(CASE WHEN is_tombstone = 1 THEN tuple_length ELSE 0 END) AS dead_bytes,\n    ROUND(SUM(CASE WHEN is_tombstone = 1 THEN tuple_length ELSE 0 END) * 100.0 / SUM(tuple_length), 1) AS dead_pct\nFROM SLOTTED_PAGE_TUPLES\nGROUP BY page_id\nHAVING /* TODO: Filter dead_pct >= 40 */\nORDER BY dead_pct DESC;",
        "expectedSolutionSql": "SELECT \n    page_id,\n    SUM(tuple_length) AS total_bytes,\n    SUM(CASE WHEN is_tombstone = 1 THEN tuple_length ELSE 0 END) AS dead_bytes,\n    ROUND(SUM(CASE WHEN is_tombstone = 1 THEN tuple_length ELSE 0 END) * 100.0 / SUM(tuple_length), 1) AS dead_pct\nFROM SLOTTED_PAGE_TUPLES\nGROUP BY page_id\nHAVING (SUM(CASE WHEN is_tombstone = 1 THEN tuple_length ELSE 0 END) * 100.0 / SUM(tuple_length)) >= 40.0\nORDER BY dead_pct DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol1_04_svg",
        "deepTheory": [
          {
            "title": "Slotted Page Architecture",
            "body": "Slotted pages grow from both ends: slot pointers (containing offset and length) grow downward from the top header, while variable-length tuple data grows upward from the bottom."
          },
          {
            "title": "Tombstones & Tuple IDs (TIDs)",
            "body": "A tuple identifier (page_id, slot_id) remains immutable even if the physical tuple moves within the page during defragmentation. Setting a tombstone marks space as reclaimable without invalidating external index pointers."
          },
          {
            "title": "Compaction Latching",
            "body": "Compaction slides live tuples to the end of the page to create a contiguous free-space window between the slot array and tuple boundary, requiring an exclusive page latch."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why do relational storage engines use slotted-page architectures instead of simple fixed-array or direct pointer indexing?",
          "hardwareInvariants": "Memory alignment, pointer indirection overhead, cache line prefetching, disk page boundary (4KB/8KB/16KB).",
          "interviewerIntent": "Evaluate knowledge of variable-length record management, physical TID stability, and defragmentation mechanics.",
          "spokenAnswer": "Variable-length attributes (VARCHAR, JSON, BLOB) make fixed-size record slots impossible. The slotted page decouples the logical Tuple ID (page_number, slot_index) from the physical byte offset. Secondary indexes only store the immutable TID. When a tuple is updated, grows, or when dead tombstones are compacted, the database only rewrites the internal 4-byte slot pointer within the page header; zero secondary index pointers need to be rewritten across the entire database.",
          "powerKeywords": "Slotted Page, Tuple ID (TID), Slot Array, Hole Compaction, Variable-Length Encoding, Pointer Indirection"
        },
        "seedRows": [
          {
            "page_id": 1,
            "slot_id": 0,
            "tuple_offset": 8100,
            "tuple_length": 92,
            "is_tombstone": 0,
            "is_redirected": 0
          },
          {
            "page_id": 1,
            "slot_id": 1,
            "tuple_offset": 8000,
            "tuple_length": 100,
            "is_tombstone": 1,
            "is_redirected": 0
          },
          {
            "page_id": 1,
            "slot_id": 2,
            "tuple_offset": 7850,
            "tuple_length": 150,
            "is_tombstone": 0,
            "is_redirected": 0
          },
          {
            "page_id": 1,
            "slot_id": 3,
            "tuple_offset": 7600,
            "tuple_length": 250,
            "is_tombstone": 1,
            "is_redirected": 0
          },
          {
            "page_id": 2,
            "slot_id": 0,
            "tuple_offset": 8050,
            "tuple_length": 142,
            "is_tombstone": 0,
            "is_redirected": 0
          },
          {
            "page_id": 2,
            "slot_id": 1,
            "tuple_offset": 7900,
            "tuple_length": 150,
            "is_tombstone": 0,
            "is_redirected": 0
          },
          {
            "page_id": 3,
            "slot_id": 0,
            "tuple_offset": 8120,
            "tuple_length": 72,
            "is_tombstone": 1,
            "is_redirected": 0
          },
          {
            "page_id": 3,
            "slot_id": 1,
            "tuple_offset": 7950,
            "tuple_length": 170,
            "is_tombstone": 1,
            "is_redirected": 0
          },
          {
            "page_id": 3,
            "slot_id": 2,
            "tuple_offset": 7800,
            "tuple_length": 150,
            "is_tombstone": 1,
            "is_redirected": 0
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_05_columnar_simd_rle",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "05",
        "topicSeq": "V1-05",
        "title": "Columnar SIMD Dictionary Bit-Packing vs Run-Length Encoding",
        "domain": "Analytics / Columnar Engines",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "COLUMNAR_DICTIONARY_CHUNKS",
        "columns": [
          {
            "name": "chunk_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "column_name",
            "type": "TEXT"
          },
          {
            "name": "distinct_cardinality",
            "type": "INTEGER"
          },
          {
            "name": "bit_width",
            "type": "INTEGER"
          },
          {
            "name": "total_rows",
            "type": "INTEGER"
          },
          {
            "name": "compressed_bytes",
            "type": "INTEGER"
          },
          {
            "name": "uncompressed_bytes",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE COLUMNAR_DICTIONARY_CHUNKS (\n                    chunk_id INTEGER PRIMARY KEY,\n                    column_name TEXT,\n                    distinct_cardinality INTEGER,\n                    bit_width INTEGER,\n                    total_rows INTEGER,\n                    compressed_bytes INTEGER,\n                    uncompressed_bytes INTEGER\n                );\n                INSERT INTO COLUMNAR_DICTIONARY_CHUNKS VALUES\n                (1, 'region', 5, 3, 100000, 37500, 800000),\n                (2, 'status', 3, 2, 100000, 25000, 800000),\n                (3, 'user_uuid', 99800, 32, 100000, 400000, 800000),\n                (4, 'is_active', 2, 1, 100000, 12500, 800000),\n                (5, 'country_code', 240, 8, 100000, 100000, 800000);\n            ",
        "spec": "Calculate the compression ratio (uncompressed_bytes / compressed_bytes) per column chunk, and isolate chunks where dictionary bit-width <= 3 bits (representing ideal candidates for SIMD AVX-512 vector unpacking across 64 values per instruction cycle).",
        "starterSql": "-- Compute compression ratio for low-bitwidth SIMD candidates\nSELECT \n    chunk_id,\n    column_name,\n    bit_width,\n    ROUND(uncompressed_bytes * 1.0 / compressed_bytes, 1) AS compression_ratio\nFROM COLUMNAR_DICTIONARY_CHUNKS\nWHERE /* TODO: bit_width <= 3 */\nORDER BY compression_ratio DESC;",
        "expectedSolutionSql": "SELECT \n    chunk_id,\n    column_name,\n    bit_width,\n    ROUND(uncompressed_bytes * 1.0 / compressed_bytes, 1) AS compression_ratio\nFROM COLUMNAR_DICTIONARY_CHUNKS\nWHERE bit_width <= 3\nORDER BY compression_ratio DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol1_05_svg",
        "deepTheory": [
          {
            "title": "SIMD Vector Lane Saturation",
            "body": "A 512-bit vector register (AVX-512) can hold 64 unpacked 8-bit integers or 16 32-bit integers. Bit-packed dictionary codes allow a single vector instruction to unpack and filter dozens of rows simultaneously."
          },
          {
            "title": "Dictionary Encoding vs RLE",
            "body": "Dictionary encoding replaces strings with small integer offsets. If column values are sorted, Run-Length Encoding (RLE) stores (value, count) pairs, achieving orders-of-magnitude higher compression than dictionary alone."
          }
        ],
        "staffInterviewDefense": {
          "question": "How do modern analytical query engines like DuckDB, ClickHouse, and Snowflake leverage SIMD vectorization over columnar data?",
          "hardwareInvariants": "AVX-512 register widths, L1 instruction cache bandwidth, CPU branch predictor elimination.",
          "interviewerIntent": "Test comprehension of columnar vectorized execution vs tuple-at-a-time Volcano iteration.",
          "spokenAnswer": "Volcano-style iteration invokes a virtual function call per row, stalling the CPU instruction pipeline with branch mispredictions and L1 cache evictions. Vectorized engines operate on contiguous arrays (vectors) of 1024 or 2048 values. Because the data is contiguous in RAM and identically typed, the compiler emits SIMD instructions (AVX2/AVX-512) that execute predicate comparisons on 16 to 64 values in a single clock cycle using bitmasks, bypassing branching entirely.",
          "powerKeywords": "SIMD (AVX-512), Vectorized Execution, Volcano Model, Morsel, Cache-Line Locality, Dictionary Bit-Packing"
        },
        "seedRows": [
          {
            "chunk_id": 1,
            "column_name": "region",
            "distinct_cardinality": 5,
            "bit_width": 3,
            "total_rows": 100000,
            "compressed_bytes": 37500,
            "uncompressed_bytes": 800000
          },
          {
            "chunk_id": 2,
            "column_name": "status",
            "distinct_cardinality": 3,
            "bit_width": 2,
            "total_rows": 100000,
            "compressed_bytes": 25000,
            "uncompressed_bytes": 800000
          },
          {
            "chunk_id": 3,
            "column_name": "user_uuid",
            "distinct_cardinality": 99800,
            "bit_width": 32,
            "total_rows": 100000,
            "compressed_bytes": 400000,
            "uncompressed_bytes": 800000
          },
          {
            "chunk_id": 4,
            "column_name": "is_active",
            "distinct_cardinality": 2,
            "bit_width": 1,
            "total_rows": 100000,
            "compressed_bytes": 12500,
            "uncompressed_bytes": 800000
          },
          {
            "chunk_id": 5,
            "column_name": "country_code",
            "distinct_cardinality": 240,
            "bit_width": 8,
            "total_rows": 100000,
            "compressed_bytes": 100000,
            "uncompressed_bytes": 800000
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_06_lsm_sstable_compaction",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "06",
        "topicSeq": "V1-06",
        "title": "LSM-Tree Overlapping Key Range Compaction Skew",
        "domain": "LSM Storage / RocksDB",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "LSM_SSTABLES",
        "columns": [
          {
            "name": "sstable_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "level",
            "type": "INTEGER"
          },
          {
            "name": "min_key",
            "type": "INTEGER"
          },
          {
            "name": "max_key",
            "type": "INTEGER"
          },
          {
            "name": "size_mb",
            "type": "INTEGER"
          },
          {
            "name": "bloom_filter_bytes",
            "type": "INTEGER"
          },
          {
            "name": "read_amp_score",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE LSM_SSTABLES (\n                    sstable_id INTEGER PRIMARY KEY,\n                    level INTEGER,\n                    min_key INTEGER,\n                    max_key INTEGER,\n                    size_mb INTEGER,\n                    bloom_filter_bytes INTEGER,\n                    read_amp_score INTEGER\n                );\n                INSERT INTO LSM_SSTABLES VALUES\n                (1, 0, 100, 500, 64, 4096, 5),\n                (2, 0, 300, 800, 64, 4096, 6),\n                (3, 0, 450, 950, 64, 4096, 7),\n                (4, 1, 50, 250, 256, 16384, 1),\n                (5, 1, 251, 600, 256, 16384, 1),\n                (6, 1, 601, 1000, 256, 16384, 1);\n            ",
        "spec": "In an LSM-Tree, Level 0 SSTables can have overlapping key ranges, creating high read amplification. Find all Level 0 SSTables that have a read amplification score >= 6 and calculate their key range span (max_key - min_key) to select the primary candidate for compaction into Level 1.",
        "starterSql": "-- Query Level 0 SSTables causing excessive read amplification\nSELECT \n    sstable_id,\n    level,\n    min_key,\n    max_key,\n    (max_key - min_key) AS key_span,\n    read_amp_score\nFROM LSM_SSTABLES\nWHERE /* TODO: Filter level = 0 and read_amp_score >= 6 */\nORDER BY read_amp_score DESC;",
        "expectedSolutionSql": "SELECT \n    sstable_id,\n    level,\n    min_key,\n    max_key,\n    (max_key - min_key) AS key_span,\n    read_amp_score\nFROM LSM_SSTABLES\nWHERE level = 0 AND read_amp_score >= 6\nORDER BY read_amp_score DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol1_06_svg",
        "deepTheory": [
          {
            "title": "LSM Level 0 Invariant",
            "body": "Because Level 0 files are direct flushes from the in-memory MemTable, their keys overlap arbitrarily. A point lookup might need to check every single L0 SSTable, multiplying read latency."
          },
          {
            "title": "Leveled vs Size-Tiered Compaction",
            "body": "Leveled compaction guarantees non-overlapping key ranges in Level 1+, bounding read amplification at the cost of higher write amplification during background merges."
          }
        ],
        "staffInterviewDefense": {
          "question": "Compare the trade-offs of LSM-Trees (e.g. RocksDB) vs B+ Trees (e.g. InnoDB) in high-throughput write workloads.",
          "hardwareInvariants": "Sequential disk writes vs random block updates, SSD wear leveling, write amplification factor (WAF).",
          "interviewerIntent": "Evaluate knowledge of write amplification, read amplification, and space amplification trade-offs.",
          "spokenAnswer": "B+ Trees suffer from high write amplification on random inserts because updating a single 100-byte record forces rewriting an entire 16KB disk page, compounded by doublewrite logging. LSM-Trees append all mutations sequentially to an in-memory MemTable and WAL, achieving near-optimal raw sequential disk write bandwidth. However, LSM-Trees pay this back in read amplification (checking Bloom filters and multiple SSTable levels) and background compaction write amplification.",
          "powerKeywords": "LSM-Tree, MemTable, SSTable, Leveled Compaction, Write Amplification Factor (WAF), Bloom Filter, RocksDB"
        },
        "seedRows": [
          {
            "sstable_id": 1,
            "level": 0,
            "min_key": 100,
            "max_key": 500,
            "size_mb": 64,
            "bloom_filter_bytes": 4096,
            "read_amp_score": 5
          },
          {
            "sstable_id": 2,
            "level": 0,
            "min_key": 300,
            "max_key": 800,
            "size_mb": 64,
            "bloom_filter_bytes": 4096,
            "read_amp_score": 6
          },
          {
            "sstable_id": 3,
            "level": 0,
            "min_key": 450,
            "max_key": 950,
            "size_mb": 64,
            "bloom_filter_bytes": 4096,
            "read_amp_score": 7
          },
          {
            "sstable_id": 4,
            "level": 1,
            "min_key": 50,
            "max_key": 250,
            "size_mb": 256,
            "bloom_filter_bytes": 16384,
            "read_amp_score": 1
          },
          {
            "sstable_id": 5,
            "level": 1,
            "min_key": 251,
            "max_key": 600,
            "size_mb": 256,
            "bloom_filter_bytes": 16384,
            "read_amp_score": 1
          },
          {
            "sstable_id": 6,
            "level": 1,
            "min_key": 601,
            "max_key": 1000,
            "size_mb": 256,
            "bloom_filter_bytes": 16384,
            "read_amp_score": 1
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_07_latch_contention_spinlocks",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "07",
        "topicSeq": "V1-07",
        "title": "Buffer Frame Latch Contention & Spinlock Backoff Distribution",
        "domain": "Database Storage Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "BUFFER_LATCH_EVENTS",
        "columns": [
          {
            "name": "event_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "frame_id",
            "type": "INTEGER"
          },
          {
            "name": "thread_id",
            "type": "INTEGER"
          },
          {
            "name": "latch_mode",
            "type": "TEXT"
          },
          {
            "name": "wait_nanos",
            "type": "INTEGER"
          },
          {
            "name": "lock_shard_id",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE BUFFER_LATCH_EVENTS (\n                    event_id INTEGER PRIMARY KEY,\n                    frame_id INTEGER,\n                    thread_id INTEGER,\n                    latch_mode TEXT,\n                    wait_nanos INTEGER,\n                    lock_shard_id INTEGER\n                );\n                INSERT INTO BUFFER_LATCH_EVENTS VALUES\n                (1, 101, 12, 'EXCLUSIVE', 750000, 3),\n                (2, 101, 14, 'SHARED', 520000, 3),\n                (3, 102, 15, 'SHARED', 45000, 1),\n                (4, 101, 16, 'EXCLUSIVE', 890000, 3),\n                (5, 104, 18, 'SHARED', 620000, 2),\n                (6, 104, 19, 'EXCLUSIVE', 710000, 2),\n                (7, 105, 20, 'SHARED', 30000, 1);\n            ",
        "spec": "Group latch contention events by lock_shard_id, calculating total wait microseconds and total contention events where wait_nanos > 500,000 (500us). Identify contested lock shards to guide partition resharding.",
        "starterSql": "-- Detect heavily contented lock shards exceeding 500us spinlock wait\nSELECT \n    lock_shard_id,\n    COUNT(*) AS severe_event_count,\n    ROUND(SUM(wait_nanos) / 1000.0, 1) AS total_wait_micros\nFROM BUFFER_LATCH_EVENTS\nWHERE /* TODO: Filter wait_nanos > 500000 */\nGROUP BY lock_shard_id\nORDER BY total_wait_micros DESC;",
        "expectedSolutionSql": "SELECT \n    lock_shard_id,\n    COUNT(*) AS severe_event_count,\n    ROUND(SUM(wait_nanos) / 1000.0, 1) AS total_wait_micros\nFROM BUFFER_LATCH_EVENTS\nWHERE wait_nanos > 500000\nGROUP BY lock_shard_id\nORDER BY total_wait_micros DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol1_07_svg",
        "deepTheory": [
          {
            "title": "Latches vs Locks",
            "body": "Locks protect logical database contents (transactions, rows, tables) and are held until commit. Latches protect physical in-memory data structures (buffer pool pages, hash buckets) and are held for microseconds."
          },
          {
            "title": "Spinlock Exponential Backoff",
            "body": "When multiple CPU cores contend for an exclusive latch, executing atomic test-and-set loops saturates the CPU cache-coherency bus. Exponential backoff and pause instructions alleviate bus traffic."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is the difference between a database Lock and a Latch?",
          "hardwareInvariants": "MESI cache coherency protocol, CPU atomic CAS instructions, context switches.",
          "interviewerIntent": "Evaluate foundational knowledge of operating systems concurrency vs database transaction management.",
          "spokenAnswer": "Locks are high-level transactional primitives that protect user data (rows, tables) from concurrency anomalies. They support two-phase locking, detect deadlocks, and persist until transaction commit or rollback. Latches are low-level operating system/kernel synchronization primitives (mutexes, rwlocks) that protect physical in-memory data structures (like a page in the buffer pool or a hash bucket). Latches do not have deadlock detection, are held for microsecond durations, and are released immediately after the memory read or write completes.",
          "powerKeywords": "Latch vs Lock, MESI Protocol, Atomic CAS, Two-Phase Locking, Buffer Pool Page Latch, Reader-Writer Mutex"
        },
        "seedRows": [
          {
            "event_id": 1,
            "frame_id": 101,
            "thread_id": 12,
            "latch_mode": "EXCLUSIVE",
            "wait_nanos": 750000,
            "lock_shard_id": 3
          },
          {
            "event_id": 2,
            "frame_id": 101,
            "thread_id": 14,
            "latch_mode": "SHARED",
            "wait_nanos": 520000,
            "lock_shard_id": 3
          },
          {
            "event_id": 3,
            "frame_id": 102,
            "thread_id": 15,
            "latch_mode": "SHARED",
            "wait_nanos": 45000,
            "lock_shard_id": 1
          },
          {
            "event_id": 4,
            "frame_id": 101,
            "thread_id": 16,
            "latch_mode": "EXCLUSIVE",
            "wait_nanos": 890000,
            "lock_shard_id": 3
          },
          {
            "event_id": 5,
            "frame_id": 104,
            "thread_id": 18,
            "latch_mode": "SHARED",
            "wait_nanos": 620000,
            "lock_shard_id": 2
          },
          {
            "event_id": 6,
            "frame_id": 104,
            "thread_id": 19,
            "latch_mode": "EXCLUSIVE",
            "wait_nanos": 710000,
            "lock_shard_id": 2
          },
          {
            "event_id": 7,
            "frame_id": 105,
            "thread_id": 20,
            "latch_mode": "SHARED",
            "wait_nanos": 30000,
            "lock_shard_id": 1
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_08_direct_io_page_cache",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "08",
        "topicSeq": "V1-08",
        "title": "Direct I/O (O_DIRECT) vs Kernel Page Cache Double-Buffering",
        "domain": "Database Storage Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "STORAGE_IO_TELEMETRY",
        "columns": [
          {
            "name": "io_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "device",
            "type": "TEXT"
          },
          {
            "name": "read_bytes",
            "type": "INTEGER"
          },
          {
            "name": "write_bytes",
            "type": "INTEGER"
          },
          {
            "name": "direct_io_flag",
            "type": "INTEGER"
          },
          {
            "name": "kernel_buffer_copies",
            "type": "INTEGER"
          },
          {
            "name": "latency_us",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE STORAGE_IO_TELEMETRY (\n                    io_id INTEGER PRIMARY KEY,\n                    device TEXT,\n                    read_bytes INTEGER,\n                    write_bytes INTEGER,\n                    direct_io_flag INTEGER,\n                    kernel_buffer_copies INTEGER,\n                    latency_us INTEGER\n                );\n                INSERT INTO STORAGE_IO_TELEMETRY VALUES\n                (1, '/dev/nvme0n1', 65536, 0, 1, 0, 85),\n                (2, '/dev/nvme0n1', 131072, 0, 0, 1, 240),\n                (3, '/dev/nvme0n1', 0, 65536, 1, 0, 110),\n                (4, '/dev/nvme0n1', 0, 131072, 0, 1, 310),\n                (5, '/dev/nvme1n1', 262144, 0, 1, 0, 140),\n                (6, '/dev/nvme1n1', 262144, 0, 0, 1, 490);\n            ",
        "spec": "Compare average latency and wasted kernel buffer copy operations between Direct I/O (direct_io_flag = 1) and standard buffered I/O (direct_io_flag = 0) per storage device.",
        "starterSql": "-- Compare Direct I/O vs Buffered I/O latency and copy penalties\nSELECT \n    device,\n    direct_io_flag,\n    COUNT(*) AS total_io_ops,\n    SUM(kernel_buffer_copies) AS total_redundant_copies,\n    ROUND(AVG(latency_us), 1) AS avg_latency_us\nFROM STORAGE_IO_TELEMETRY\nGROUP BY device, direct_io_flag\nORDER BY device, direct_io_flag DESC;",
        "expectedSolutionSql": "SELECT \n    device,\n    direct_io_flag,\n    COUNT(*) AS total_io_ops,\n    SUM(kernel_buffer_copies) AS total_redundant_copies,\n    ROUND(AVG(latency_us), 1) AS avg_latency_us\nFROM STORAGE_IO_TELEMETRY\nGROUP BY device, direct_io_flag\nORDER BY device, direct_io_flag DESC;",
        "expectedRowCount": 4,
        "svgDiagramKey": "vol1_08_svg",
        "deepTheory": [
          {
            "title": "The Double-Buffering Penalty",
            "body": "Standard read()/write() syscalls copy data from disk into the OS page cache, then copy it again into the DBMS user-space buffer pool. Direct I/O (O_DIRECT) DMAs data straight from storage into DBMS memory."
          },
          {
            "title": "Zero-Copy DMA",
            "body": "Direct I/O requires memory buffers to be aligned to filesystem block boundaries (typically 4096 bytes), enabling DMA controllers to bypass kernel overhead entirely."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why do enterprise databases like Oracle and MySQL use O_DIRECT instead of relying on the Linux kernel page cache?",
          "hardwareInvariants": "DMA bus transfers, CPU memory copy overhead, kernel page writeback eviction algorithms.",
          "interviewerIntent": "Test knowledge of OS memory management, kernel page cache thrashing, and database buffer predictability.",
          "spokenAnswer": "Relying on the OS page cache causes 'double buffering', where the exact same 16KB database page exists twice in RAM—once in the kernel page cache and once in the database buffer pool—effectively halving usable system memory. Furthermore, the Linux kernel's page writeback heuristic does not respect database WAL commit ordering invariants, making crash recovery unpredictable. O_DIRECT allows the DBMS to manage memory, eviction priorities, and I/O scheduling with absolute mathematical control.",
          "powerKeywords": "O_DIRECT, Double Buffering, Linux Page Cache, Direct Memory Access (DMA), Page Alignment, Writeback"
        },
        "seedRows": [
          {
            "io_id": 1,
            "device": "/dev/nvme0n1",
            "read_bytes": 65536,
            "write_bytes": 0,
            "direct_io_flag": 1,
            "kernel_buffer_copies": 0,
            "latency_us": 85
          },
          {
            "io_id": 2,
            "device": "/dev/nvme0n1",
            "read_bytes": 131072,
            "write_bytes": 0,
            "direct_io_flag": 0,
            "kernel_buffer_copies": 1,
            "latency_us": 240
          },
          {
            "io_id": 3,
            "device": "/dev/nvme0n1",
            "read_bytes": 0,
            "write_bytes": 65536,
            "direct_io_flag": 1,
            "kernel_buffer_copies": 0,
            "latency_us": 110
          },
          {
            "io_id": 4,
            "device": "/dev/nvme0n1",
            "read_bytes": 0,
            "write_bytes": 131072,
            "direct_io_flag": 0,
            "kernel_buffer_copies": 1,
            "latency_us": 310
          },
          {
            "io_id": 5,
            "device": "/dev/nvme1n1",
            "read_bytes": 262144,
            "write_bytes": 0,
            "direct_io_flag": 1,
            "kernel_buffer_copies": 0,
            "latency_us": 140
          },
          {
            "io_id": 6,
            "device": "/dev/nvme1n1",
            "read_bytes": 262144,
            "write_bytes": 0,
            "direct_io_flag": 0,
            "kernel_buffer_copies": 1,
            "latency_us": 490
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_09_ssd_wear_write_amplification",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "09",
        "topicSeq": "V1-09",
        "title": "SSD Flash Block Erase Cycles & Dead Page TRIM Reclamation",
        "domain": "Database Hardware Storage",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "SSD_BLOCK_ENDURANCE",
        "columns": [
          {
            "name": "block_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "chip_channel",
            "type": "INTEGER"
          },
          {
            "name": "erase_count",
            "type": "INTEGER"
          },
          {
            "name": "valid_pages",
            "type": "INTEGER"
          },
          {
            "name": "dead_pages",
            "type": "INTEGER"
          },
          {
            "name": "write_amp_ratio",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE SSD_BLOCK_ENDURANCE (\n                    block_id INTEGER PRIMARY KEY,\n                    chip_channel INTEGER,\n                    erase_count INTEGER,\n                    valid_pages INTEGER,\n                    dead_pages INTEGER,\n                    write_amp_ratio NUMERIC\n                );\n                INSERT INTO SSD_BLOCK_ENDURANCE VALUES\n                (1, 0, 1500, 32, 224, 3.4),\n                (2, 0, 400, 200, 56, 1.2),\n                (3, 1, 1850, 40, 216, 3.8),\n                (4, 1, 600, 180, 76, 1.4),\n                (5, 2, 2100, 20, 236, 4.2),\n                (6, 2, 850, 190, 66, 1.3);\n            ",
        "spec": "Isolate high-wear SSD flash blocks where dead pages represent >= 80% of total block pages ((valid_pages + dead_pages) = 256), sorting by highest erase_count to identify prime targets for controller wear-leveling and background TRIM garbage collection.",
        "starterSql": "-- Identify worn flash blocks saturated with dead pages\nSELECT \n    block_id,\n    chip_channel,\n    erase_count,\n    dead_pages,\n    ROUND((dead_pages * 100.0) / (valid_pages + dead_pages), 1) AS dead_page_pct,\n    write_amp_ratio\nFROM SSD_BLOCK_ENDURANCE\nWHERE /* TODO: Filter dead_page_pct >= 80 */\nORDER BY erase_count DESC;",
        "expectedSolutionSql": "SELECT \n    block_id,\n    chip_channel,\n    erase_count,\n    dead_pages,\n    ROUND((dead_pages * 100.0) / (valid_pages + dead_pages), 1) AS dead_page_pct,\n    write_amp_ratio\nFROM SSD_BLOCK_ENDURANCE\nWHERE (dead_pages * 1.0 / (valid_pages + dead_pages)) >= 0.80\nORDER BY erase_count DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol1_09_svg",
        "deepTheory": [
          {
            "title": "Flash Memory Physics",
            "body": "NAND flash memory reads and writes in pages (typically 4KB to 16KB), but can only erase in entire blocks (typically 128 to 512 pages). Rewriting a page requires writing to an empty page and marking the old page dead."
          },
          {
            "title": "TRIM & Garbage Collection",
            "body": "When a block has many dead pages, the SSD Flash Translation Layer (FTL) copies remaining valid pages to a new block and erases the old block, causing internal Write Amplification."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is Write Amplification Factor (WAF) in solid-state storage, and how does database page alignment impact it?",
          "hardwareInvariants": "NAND erase block size (2MB-8MB), write cliff, wear leveling, TRIM command.",
          "interviewerIntent": "Evaluate low-level understanding of SSD storage controller physics and database I/O alignment.",
          "spokenAnswer": "Write Amplification Factor is the ratio of bytes written to NAND flash compared to bytes requested by the operating system. Because flash cannot overwrite in place, updating a single byte forces the SSD controller to perform read-modify-write cycles over entire erase blocks. If database page sizes are misaligned with SSD physical page boundaries (e.g. non-4KB aligned writes), a single database write splits across two physical flash pages, doubling controller write amplification and triggering early SSD drive burnout.",
          "powerKeywords": "NAND Flash, Erase Block, Page Write vs Block Erase, FTL (Flash Translation Layer), WAF, TRIM, Wear Leveling"
        },
        "seedRows": [
          {
            "block_id": 1,
            "chip_channel": 0,
            "erase_count": 1500,
            "valid_pages": 32,
            "dead_pages": 224,
            "write_amp_ratio": 3.4
          },
          {
            "block_id": 2,
            "chip_channel": 0,
            "erase_count": 400,
            "valid_pages": 200,
            "dead_pages": 56,
            "write_amp_ratio": 1.2
          },
          {
            "block_id": 3,
            "chip_channel": 1,
            "erase_count": 1850,
            "valid_pages": 40,
            "dead_pages": 216,
            "write_amp_ratio": 3.8
          },
          {
            "block_id": 4,
            "chip_channel": 1,
            "erase_count": 600,
            "valid_pages": 180,
            "dead_pages": 76,
            "write_amp_ratio": 1.4
          },
          {
            "block_id": 5,
            "chip_channel": 2,
            "erase_count": 2100,
            "valid_pages": 20,
            "dead_pages": 236,
            "write_amp_ratio": 4.2
          },
          {
            "block_id": 6,
            "chip_channel": 2,
            "erase_count": 850,
            "valid_pages": 190,
            "dead_pages": 66,
            "write_amp_ratio": 1.3
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_10_covering_index_heap_fetch",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "10",
        "topicSeq": "V1-10",
        "title": "Covering Index Key-Range Lookups vs Random Heap Fetches",
        "domain": "Query Optimization / Storage",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "QUERY_INDEX_UTILIZATION",
        "columns": [
          {
            "name": "query_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "sql_hash",
            "type": "TEXT"
          },
          {
            "name": "index_name",
            "type": "TEXT"
          },
          {
            "name": "index_keys_read",
            "type": "INTEGER"
          },
          {
            "name": "heap_fetches",
            "type": "INTEGER"
          },
          {
            "name": "index_only_scan",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE QUERY_INDEX_UTILIZATION (\n                    query_id INTEGER PRIMARY KEY,\n                    sql_hash TEXT,\n                    index_name TEXT,\n                    index_keys_read INTEGER,\n                    heap_fetches INTEGER,\n                    index_only_scan INTEGER\n                );\n                INSERT INTO QUERY_INDEX_UTILIZATION VALUES\n                (1, '0xFA31', 'idx_cust_created', 5000, 5000, 0),\n                (2, '0xBC89', 'idx_cust_created_covering', 5000, 0, 1),\n                (3, '0xDE12', 'idx_orders_status', 12000, 11800, 0),\n                (4, '0x99AA', 'idx_orders_status_covering', 12000, 0, 1),\n                (5, '0x3344', 'idx_tx_amount', 8000, 7200, 0);\n            ",
        "spec": "Identify queries that suffer from 0% index-only execution (index_only_scan = 0) and have heap fetch ratios >= 90% (heap_fetches * 100.0 / index_keys_read), ranking them as candidates for covering index optimization (INCLUDE clauses).",
        "starterSql": "-- Find high-cost queries suffering from massive random heap fetches\nSELECT \n    query_id,\n    sql_hash,\n    index_name,\n    index_keys_read,\n    heap_fetches,\n    ROUND((heap_fetches * 100.0) / index_keys_read, 1) AS heap_fetch_pct\nFROM QUERY_INDEX_UTILIZATION\nWHERE /* TODO: Filter index_only_scan = 0 and heap_fetch_pct >= 90 */\nORDER BY heap_fetches DESC;",
        "expectedSolutionSql": "SELECT \n    query_id,\n    sql_hash,\n    index_name,\n    index_keys_read,\n    heap_fetches,\n    ROUND((heap_fetches * 100.0) / index_keys_read, 1) AS heap_fetch_pct\nFROM QUERY_INDEX_UTILIZATION\nWHERE index_only_scan = 0 AND (heap_fetches * 1.0 / index_keys_read) >= 0.90\nORDER BY heap_fetches DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol1_10_svg",
        "deepTheory": [
          {
            "title": "The Heap Fetch Penalty",
            "body": "A secondary index stores indexed keys and tuple IDs. If a query requests non-indexed columns, the engine must perform a random heap page lookup for every matching key."
          },
          {
            "title": "Covering Indexes with INCLUDE",
            "body": "Appending payload columns via INCLUDE stores them in the B+ Tree leaf pages without indexing them in intermediate nodes, enabling Index-Only Scans with zero heap lookups."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is an Index-Only Scan, and why is an INCLUDE index preferable to adding columns directly to the index key?",
          "hardwareInvariants": "Random I/O vs sequential B+ tree leaf traversal, memory bandwidth, index fanout factor.",
          "interviewerIntent": "Evaluate understanding of B+ tree node sizing, key comparison overhead, and covering index design.",
          "spokenAnswer": "An Index-Only Scan satisfies all requested projection and filter columns directly from the B+ Tree leaf pages, eliminating expensive random I/O heap fetches. Adding columns via INCLUDE stores values only in leaf nodes and omits them from non-leaf router nodes. This keeps internal node keys small, preserving high B+ Tree fanout, minimizing tree height, and preventing unnecessary key comparison overhead during index seeks.",
          "powerKeywords": "Index-Only Scan, Covering Index, INCLUDE Clause, B+ Tree Fanout, Random Heap Fetch, Page Indirection"
        },
        "seedRows": [
          {
            "query_id": 1,
            "sql_hash": "0xFA31",
            "index_name": "idx_cust_created",
            "index_keys_read": 5000,
            "heap_fetches": 5000,
            "index_only_scan": 0
          },
          {
            "query_id": 2,
            "sql_hash": "0xBC89",
            "index_name": "idx_cust_created_covering",
            "index_keys_read": 5000,
            "heap_fetches": 0,
            "index_only_scan": 1
          },
          {
            "query_id": 3,
            "sql_hash": "0xDE12",
            "index_name": "idx_orders_status",
            "index_keys_read": 12000,
            "heap_fetches": 11800,
            "index_only_scan": 0
          },
          {
            "query_id": 4,
            "sql_hash": "0x99AA",
            "index_name": "idx_orders_status_covering",
            "index_keys_read": 12000,
            "heap_fetches": 0,
            "index_only_scan": 1
          },
          {
            "query_id": 5,
            "sql_hash": "0x3344",
            "index_name": "idx_tx_amount",
            "index_keys_read": 8000,
            "heap_fetches": 7200,
            "index_only_scan": 0
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_11_bloom_filter_saturation",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "11",
        "topicSeq": "V1-11",
        "title": "Bloom Filter Bit-Array Saturation & False-Positive Degradation",
        "domain": "Storage / Search Index",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "BLOOM_FILTER_METRICS",
        "columns": [
          {
            "name": "filter_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "table_name",
            "type": "TEXT"
          },
          {
            "name": "num_elements",
            "type": "INTEGER"
          },
          {
            "name": "num_bits",
            "type": "INTEGER"
          },
          {
            "name": "num_hashes",
            "type": "INTEGER"
          },
          {
            "name": "false_positive_rate",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE BLOOM_FILTER_METRICS (\n                    filter_id INTEGER PRIMARY KEY,\n                    table_name TEXT,\n                    num_elements INTEGER,\n                    num_bits INTEGER,\n                    num_hashes INTEGER,\n                    false_positive_rate NUMERIC\n                );\n                INSERT INTO BLOOM_FILTER_METRICS VALUES\n                (1, 'user_sessions', 150000, 1000000, 5, 0.045),\n                (2, 'order_tokens', 50000, 1000000, 7, 0.002),\n                (3, 'device_telemetry', 280000, 1000000, 4, 0.089),\n                (4, 'catalog_skus', 80000, 1000000, 6, 0.008),\n                (5, 'api_keys', 320000, 1000000, 4, 0.125);\n            ",
        "spec": "Find saturated Bloom filters where the bits-per-element ratio (num_bits / num_elements) is < 10.0 and the false-positive rate exceeds 1% (false_positive_rate > 0.01), signaling that disk seeks are being triggered needlessly.",
        "starterSql": "-- Identify saturated Bloom filters with excessive false positives\nSELECT \n    filter_id,\n    table_name,\n    ROUND(num_bits * 1.0 / num_elements, 1) AS bits_per_element,\n    false_positive_rate\nFROM BLOOM_FILTER_METRICS\nWHERE /* TODO: bits_per_element < 10 AND false_positive_rate > 0.01 */\nORDER BY false_positive_rate DESC;",
        "expectedSolutionSql": "SELECT \n    filter_id,\n    table_name,\n    ROUND(num_bits * 1.0 / num_elements, 1) AS bits_per_element,\n    false_positive_rate\nFROM BLOOM_FILTER_METRICS\nWHERE (num_bits * 1.0 / num_elements) < 10.0 AND false_positive_rate > 0.01\nORDER BY false_positive_rate DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol1_11_svg",
        "deepTheory": [
          {
            "title": "Bloom Filter False Positive Formula",
            "body": "The false-positive probability p ≈ (1 - e^(-k*n/m))^k, where m is bits, n is elements, and k is hash functions. Optimal k is (m/n) * ln(2)."
          },
          {
            "title": "Zero False Negatives",
            "body": "A Bloom filter guarantees that if it reports an element is absent, it is definitively absent with zero disk I/O. If it reports present, it might be a false positive."
          }
        ],
        "staffInterviewDefense": {
          "question": "How do LSM-based databases like Cassandra and RocksDB use Bloom filters to avoid disk seeks during point lookups?",
          "hardwareInvariants": "Cache line latency, L3 cache footprint, random disk seek latency (5-10ms on HDD, 50-100us on SSD).",
          "interviewerIntent": "Evaluate probabilistic data structures and their role in physical database storage engines.",
          "spokenAnswer": "In an LSM-Tree, a point lookup for a non-existent key would normally force the engine to read index blocks across every single SSTable on disk to confirm absence. By evaluating an in-memory Bloom filter (typically 10 bits per key yielding a ~1% false positive rate) prior to issuing disk I/O, 99% of non-existent key lookups terminate immediately in CPU registers without issuing a single storage read.",
          "powerKeywords": "Bloom Filter, Probabilistic Data Structure, False Positive Rate, Bits Per Element, SSTable Disk Bypass"
        },
        "seedRows": [
          {
            "filter_id": 1,
            "table_name": "user_sessions",
            "num_elements": 150000,
            "num_bits": 1000000,
            "num_hashes": 5,
            "false_positive_rate": 0.045
          },
          {
            "filter_id": 2,
            "table_name": "order_tokens",
            "num_elements": 50000,
            "num_bits": 1000000,
            "num_hashes": 7,
            "false_positive_rate": 0.002
          },
          {
            "filter_id": 3,
            "table_name": "device_telemetry",
            "num_elements": 280000,
            "num_bits": 1000000,
            "num_hashes": 4,
            "false_positive_rate": 0.089
          },
          {
            "filter_id": 4,
            "table_name": "catalog_skus",
            "num_elements": 80000,
            "num_bits": 1000000,
            "num_hashes": 6,
            "false_positive_rate": 0.008
          },
          {
            "filter_id": 5,
            "table_name": "api_keys",
            "num_elements": 320000,
            "num_bits": 1000000,
            "num_hashes": 4,
            "false_positive_rate": 0.125
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol1_12_doublewrite_torn_page_recovery",
        "volumeId": "vol_1_storage",
        "volumeName": "Volume 1: Storage, Memory & Durability Physics",
        "seq": "12",
        "topicSeq": "V1-12",
        "title": "Doublewrite Buffer Torn-Page Protection & Checksum Validation",
        "domain": "Database Durability / Hardware",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "DOUBLEWRITE_PAGES",
        "columns": [
          {
            "name": "dw_slot_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "page_id",
            "type": "INTEGER"
          },
          {
            "name": "lsn",
            "type": "INTEGER"
          },
          {
            "name": "memory_checksum",
            "type": "INTEGER"
          },
          {
            "name": "disk_checksum",
            "type": "INTEGER"
          },
          {
            "name": "is_repaired",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE DOUBLEWRITE_PAGES (\n                    dw_slot_id INTEGER PRIMARY KEY,\n                    page_id INTEGER,\n                    lsn INTEGER,\n                    memory_checksum INTEGER,\n                    disk_checksum INTEGER,\n                    is_repaired INTEGER\n                );\n                INSERT INTO DOUBLEWRITE_PAGES VALUES\n                (1, 1001, 89001, 4421, 4421, 1),\n                (2, 1002, 89005, 7812, 1104, 0),\n                (3, 1003, 89010, 3390, 3390, 1),\n                (4, 1004, 89012, 9920, 4810, 0),\n                (5, 1005, 89020, 1205, 1205, 1);\n            ",
        "spec": "Detect torn-page corruptions where the disk page checksum does not match the memory checksum (disk_checksum <> memory_checksum) and the page has not yet been repaired (is_repaired = 0).",
        "starterSql": "-- Detect torn-page hardware corruptions requiring Doublewrite restoration\nSELECT \n    dw_slot_id,\n    page_id,\n    lsn,\n    memory_checksum,\n    disk_checksum\nFROM DOUBLEWRITE_PAGES\nWHERE /* TODO: Filter torn pages needing repair */\nORDER BY page_id ASC;",
        "expectedSolutionSql": "SELECT \n    dw_slot_id,\n    page_id,\n    lsn,\n    memory_checksum,\n    disk_checksum\nFROM DOUBLEWRITE_PAGES\nWHERE memory_checksum <> disk_checksum AND is_repaired = 0\nORDER BY page_id ASC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol1_12_svg",
        "deepTheory": [
          {
            "title": "The Torn Page Hazard",
            "body": "A database page is typically 16KB (InnoDB), but physical drive sectors are 512 bytes or 4KB. If power fails mid-write, only 4KB out of 16KB may be written, corrupting the page header and data permanently."
          },
          {
            "title": "The Doublewrite Buffer Remedy",
            "body": "Before writing 16KB pages to their final tablespace files, InnoDB writes them contiguously to a reserved 2MB contiguous disk buffer (Doublewrite buffer) and syncs it. If a crash occurs, the pristine copy in the Doublewrite buffer overwrites the torn page."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why does MySQL InnoDB require a Doublewrite Buffer, and why can WAL alone not recover a torn page?",
          "hardwareInvariants": "Sector write atomicity (512B/4KB), fsync barriers, torn writes, WAL physiological delta logging.",
          "interviewerIntent": "Test comprehension of physiological logging vs physical full-page logging in crash recovery.",
          "spokenAnswer": "WAL records in engines like InnoDB use physiological logging—they log deltas (e.g. 'insert key X at slot Y'), not complete 16KB page images. A delta can only be applied if the underlying base page is structurally valid. If an operating system crash or power outage tears a 16KB page in half (writing only 4KB), the page's slot headers, pointers, and checksum are garbled garbage. Applying a delta to garbage produces corrupted garbage. The Doublewrite Buffer provides an atomic pristine 16KB baseline page from which ARIES redo recovery can proceed.",
          "powerKeywords": "Torn Page, Doublewrite Buffer, Physiological Logging, Physical Page Image, Sector Atomicity, Checksum"
        },
        "seedRows": [
          {
            "dw_slot_id": 1,
            "page_id": 1001,
            "lsn": 89001,
            "memory_checksum": 4421,
            "disk_checksum": 4421,
            "is_repaired": 1
          },
          {
            "dw_slot_id": 2,
            "page_id": 1002,
            "lsn": 89005,
            "memory_checksum": 7812,
            "disk_checksum": 1104,
            "is_repaired": 0
          },
          {
            "dw_slot_id": 3,
            "page_id": 1003,
            "lsn": 89010,
            "memory_checksum": 3390,
            "disk_checksum": 3390,
            "is_repaired": 1
          },
          {
            "dw_slot_id": 4,
            "page_id": 1004,
            "lsn": 89012,
            "memory_checksum": 9920,
            "disk_checksum": 4810,
            "is_repaired": 0
          },
          {
            "dw_slot_id": 5,
            "page_id": 1005,
            "lsn": 89020,
            "memory_checksum": 1205,
            "disk_checksum": 1205,
            "is_repaired": 1
          }
        ],
        "extraTables": {}
      }
    ]
  },
  {
    "volumeId": "vol_2_operators",
    "volumeSeq": "02",
    "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
    "volumeShortName": "Vol 2: Relational Operators",
    "badge": "12 Deep-Dive Problems",
    "description": "Master Grace and Hybrid hash join partition spilling, multi-pass external merge sort run generation, O(1) sliding window frame ring buffers, subquery unnesting, and morsel-driven NUMA parallelism.",
    "problems": [
      {
        "id": "vol2_01_hash_join_spill",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "01",
        "topicSeq": "V2-01",
        "title": "Grace Hash Join Recursive Partition Spilling Under Memory Pressure",
        "domain": "Relational Query Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "HASH_JOIN_BUCKETS",
        "columns": [
          {
            "name": "bucket_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "partition_id",
            "type": "INTEGER"
          },
          {
            "name": "build_rows",
            "type": "INTEGER"
          },
          {
            "name": "build_bytes",
            "type": "INTEGER"
          },
          {
            "name": "probe_rows",
            "type": "INTEGER"
          },
          {
            "name": "memory_limit_bytes",
            "type": "INTEGER"
          },
          {
            "name": "spilled_to_disk",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE HASH_JOIN_BUCKETS (\n                    bucket_id INTEGER PRIMARY KEY,\n                    partition_id INTEGER,\n                    build_rows INTEGER,\n                    build_bytes INTEGER,\n                    probe_rows INTEGER,\n                    memory_limit_bytes INTEGER,\n                    spilled_to_disk INTEGER\n                );\n                INSERT INTO HASH_JOIN_BUCKETS VALUES\n                (1, 0, 12000, 786432, 45000, 1048576, 0),\n                (2, 1, 28000, 1835008, 92000, 1048576, 1),\n                (3, 2, 8500, 524288, 31000, 1048576, 0),\n                (4, 3, 31000, 2097152, 110000, 1048576, 1),\n                (5, 4, 14000, 917504, 50000, 1048576, 0),\n                (6, 5, 29500, 1966080, 98000, 1048576, 1);\n            ",
        "spec": "Identify partitions that exceeded the 1MB buffer quota (build_bytes > memory_limit_bytes) and spilled to disk (spilled_to_disk = 1), calculating their memory overflow percentage and probe row count to rank them for secondary recursive hash re-partitioning.",
        "starterSql": "-- Query spilled hash partitions requiring secondary recursive partitioning\nSELECT \n    partition_id,\n    build_bytes,\n    memory_limit_bytes,\n    ROUND((build_bytes - memory_limit_bytes) * 100.0 / memory_limit_bytes, 1) AS overflow_pct,\n    probe_rows\nFROM HASH_JOIN_BUCKETS\nWHERE /* TODO: Filter spilled partitions exceeding memory limit */\nORDER BY overflow_pct DESC;",
        "expectedSolutionSql": "SELECT \n    partition_id,\n    build_bytes,\n    memory_limit_bytes,\n    ROUND((build_bytes - memory_limit_bytes) * 100.0 / memory_limit_bytes, 1) AS overflow_pct,\n    probe_rows\nFROM HASH_JOIN_BUCKETS\nWHERE spilled_to_disk = 1 AND build_bytes > memory_limit_bytes\nORDER BY overflow_pct DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol2_01_svg",
        "deepTheory": [
          {
            "title": "Grace Hash Join Mechanics",
            "body": "When the smaller build relation exceeds available work_mem, Grace Hash Join hashes both build and probe tables into N disk-backed partition files using hash function h1. Each matching partition pair is then joined independently in memory using hash function h2."
          },
          {
            "title": "Recursive Partitioning",
            "body": "If an individual build partition still exceeds work_mem after phase 1 partitioning, the engine recursively reapplies hash partitioning with a different seed until all partitions fit into CPU cache / RAM."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is the physical I/O complexity of Grace Hash Join when relations spill to disk, and how does it compare to Block Nested Loop Join?",
          "hardwareInvariants": "Sequential disk I/O vs random seeks, memory footprint (work_mem), page cache read-ahead.",
          "interviewerIntent": "Evaluate algorithmic Big-O analysis and physical cost modeling of relational join operators.",
          "spokenAnswer": "In an in-memory Hash Join, cost is O(M + N). If relations spill to disk, Grace Hash Join writes both M and N to disk partitions, then reads them back to join: 2 * (Pages(M) + Pages(N)) for partitioning + 1 * (Pages(M) + Pages(N)) for probe, totaling 3 * (Pages(M) + Pages(N)) sequential page I/Os. In contrast, Block Nested Loop Join performs Pages(M) + (Pages(M) / B) * Pages(N), which degenerates to quadratic O(M * N) physical disk reads when memory B is small.",
          "powerKeywords": "Grace Hash Join, Recursive Partitioning, work_mem, Hash Buckets, Block Nested Loop, 3*(M+N) I/O Bound"
        },
        "seedRows": [
          {
            "bucket_id": 1,
            "partition_id": 0,
            "build_rows": 12000,
            "build_bytes": 786432,
            "probe_rows": 45000,
            "memory_limit_bytes": 1048576,
            "spilled_to_disk": 0
          },
          {
            "bucket_id": 2,
            "partition_id": 1,
            "build_rows": 28000,
            "build_bytes": 1835008,
            "probe_rows": 92000,
            "memory_limit_bytes": 1048576,
            "spilled_to_disk": 1
          },
          {
            "bucket_id": 3,
            "partition_id": 2,
            "build_rows": 8500,
            "build_bytes": 524288,
            "probe_rows": 31000,
            "memory_limit_bytes": 1048576,
            "spilled_to_disk": 0
          },
          {
            "bucket_id": 4,
            "partition_id": 3,
            "build_rows": 31000,
            "build_bytes": 2097152,
            "probe_rows": 110000,
            "memory_limit_bytes": 1048576,
            "spilled_to_disk": 1
          },
          {
            "bucket_id": 5,
            "partition_id": 4,
            "build_rows": 14000,
            "build_bytes": 917504,
            "probe_rows": 50000,
            "memory_limit_bytes": 1048576,
            "spilled_to_disk": 0
          },
          {
            "bucket_id": 6,
            "partition_id": 5,
            "build_rows": 29500,
            "build_bytes": 1966080,
            "probe_rows": 98000,
            "memory_limit_bytes": 1048576,
            "spilled_to_disk": 1
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_02_hybrid_hash_retention",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "02",
        "topicSeq": "V2-02",
        "title": "Hybrid Hash Join In-Memory Bucket Sizing & Disk Flush Avoidance",
        "domain": "Relational Query Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "HYBRID_HASH_PARTITIONS",
        "columns": [
          {
            "name": "partition_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "row_count",
            "type": "INTEGER"
          },
          {
            "name": "byte_size",
            "type": "INTEGER"
          },
          {
            "name": "hash_seed",
            "type": "INTEGER"
          },
          {
            "name": "resides_in_ram",
            "type": "INTEGER"
          },
          {
            "name": "disk_io_ops",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE HYBRID_HASH_PARTITIONS (\n                    partition_id INTEGER PRIMARY KEY,\n                    row_count INTEGER,\n                    byte_size INTEGER,\n                    hash_seed INTEGER,\n                    resides_in_ram INTEGER,\n                    disk_io_ops INTEGER\n                );\n                INSERT INTO HYBRID_HASH_PARTITIONS VALUES\n                (0, 15000, 1048576, 77, 1, 0),\n                (1, 14800, 1030000, 77, 0, 256),\n                (2, 15200, 1060000, 77, 0, 260),\n                (3, 14900, 1040000, 77, 0, 255);\n            ",
        "spec": "Hybrid Hash Join retains partition 0 in RAM while spilling partitions 1..N to disk. Calculate total rows and memory footprint of in-memory vs disk-spilled partitions to prove that 25% of data bypassed disk I/O.",
        "starterSql": "-- Aggregate partition statistics by storage residency (RAM vs Disk)\nSELECT \n    resides_in_ram,\n    COUNT(*) AS partition_count,\n    SUM(row_count) AS total_rows,\n    SUM(byte_size) AS total_bytes,\n    SUM(disk_io_ops) AS total_disk_io\nFROM HYBRID_HASH_PARTITIONS\nGROUP BY resides_in_ram\nORDER BY resides_in_ram DESC;",
        "expectedSolutionSql": "SELECT \n    resides_in_ram,\n    COUNT(*) AS partition_count,\n    SUM(row_count) AS total_rows,\n    SUM(byte_size) AS total_bytes,\n    SUM(disk_io_ops) AS total_disk_io\nFROM HYBRID_HASH_PARTITIONS\nGROUP BY resides_in_ram\nORDER BY resides_in_ram DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol2_02_svg",
        "deepTheory": [
          {
            "title": "Hybrid Hash Join Optimization",
            "body": "Standard Grace Hash Join writes all partitions to disk even if memory could hold partition 0. Hybrid Hash Join allocates remaining memory to keep partition 0 pinned in RAM, immediately joining matching probe rows without any disk roundtrips."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does Hybrid Hash Join outperform classical Grace Hash Join in systems with intermediate memory?",
          "hardwareInvariants": "Memory allocation boundaries, disk buffer flush pipelines, CPU cache thrashing.",
          "interviewerIntent": "Evaluate nuances between classical Grace and modern Hybrid Hash Join architectures.",
          "spokenAnswer": "Classical Grace Hash Join partitions the entire build and probe inputs to disk before performing any joins, incurring 3 * (M + N) I/O even if memory could hold 30% of the build table. Hybrid Hash Join reserves just enough memory buffer pages to write partitions 1 through K to disk while retaining partition 0 entirely in RAM. As probe rows stream in, any row hashing to partition 0 is joined immediately in memory, completely eliminating disk writes and reads for that fraction of the dataset.",
          "powerKeywords": "Hybrid Hash Join, Partition 0 Retention, In-Memory Fast-Path, work_mem, Grace Spill Mitigation"
        },
        "seedRows": [
          {
            "partition_id": 0,
            "row_count": 15000,
            "byte_size": 1048576,
            "hash_seed": 77,
            "resides_in_ram": 1,
            "disk_io_ops": 0
          },
          {
            "partition_id": 1,
            "row_count": 14800,
            "byte_size": 1030000,
            "hash_seed": 77,
            "resides_in_ram": 0,
            "disk_io_ops": 256
          },
          {
            "partition_id": 2,
            "row_count": 15200,
            "byte_size": 1060000,
            "hash_seed": 77,
            "resides_in_ram": 0,
            "disk_io_ops": 260
          },
          {
            "partition_id": 3,
            "row_count": 14900,
            "byte_size": 1040000,
            "hash_seed": 77,
            "resides_in_ram": 0,
            "disk_io_ops": 255
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_03_external_merge_sort",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "03",
        "topicSeq": "V2-03",
        "title": "Multi-Pass External Merge Sort Run Generation & Fan-In Optimization",
        "domain": "Relational Query Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "EXTERNAL_SORT_RUNS",
        "columns": [
          {
            "name": "run_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "pass_num",
            "type": "INTEGER"
          },
          {
            "name": "run_size_pages",
            "type": "INTEGER"
          },
          {
            "name": "start_page_id",
            "type": "INTEGER"
          },
          {
            "name": "end_page_id",
            "type": "INTEGER"
          },
          {
            "name": "fan_in_degree",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE EXTERNAL_SORT_RUNS (\n                    run_id INTEGER PRIMARY KEY,\n                    pass_num INTEGER,\n                    run_size_pages INTEGER,\n                    start_page_id INTEGER,\n                    end_page_id INTEGER,\n                    fan_in_degree INTEGER\n                );\n                INSERT INTO EXTERNAL_SORT_RUNS VALUES\n                (1, 0, 16, 1, 16, 1),\n                (2, 0, 16, 17, 32, 1),\n                (3, 0, 16, 33, 48, 1),\n                (4, 0, 16, 49, 64, 1),\n                (5, 1, 64, 100, 163, 4),\n                (6, 0, 16, 65, 80, 1),\n                (7, 0, 16, 81, 96, 1),\n                (8, 1, 32, 200, 231, 2);\n            ",
        "spec": "Analyze Pass 0 (initial in-memory run generation) vs Pass 1+ (merge passes): calculate total runs generated, total pages processed, and maximum fan-in degree for each pass number.",
        "starterSql": "-- Compute run generation metrics per sort pass\nSELECT \n    pass_num,\n    COUNT(*) AS total_runs,\n    SUM(run_size_pages) AS total_pages_sorted,\n    MAX(fan_in_degree) AS max_fan_in\nFROM EXTERNAL_SORT_RUNS\nGROUP BY pass_num\nORDER BY pass_num ASC;",
        "expectedSolutionSql": "SELECT \n    pass_num,\n    COUNT(*) AS total_runs,\n    SUM(run_size_pages) AS total_pages_sorted,\n    MAX(fan_in_degree) AS max_fan_in\nFROM EXTERNAL_SORT_RUNS\nGROUP BY pass_num\nORDER BY pass_num ASC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol2_03_svg",
        "deepTheory": [
          {
            "title": "External Merge Sort Formula",
            "body": "Given N pages and B buffer pages: Pass 0 produces ceil(N/B) initial sorted runs of length B. Subsequent merge passes merge (B-1) runs at a time. Total passes = 1 + ceil(log_(B-1)(ceil(N/B)))."
          },
          {
            "title": "Tournament Tree / Loser Tree",
            "body": "Merging K runs in memory uses a tournament tree (priority queue) of size K, yielding O(log K) comparisons per output tuple."
          }
        ],
        "staffInterviewDefense": {
          "question": "How many buffer pages are required to sort a 100GB dataset in 2 passes using external merge sort?",
          "hardwareInvariants": "Sequential disk throughput (200MB/s HDD, 3GB/s NVMe), buffer memory limits, Loser tree cache locality.",
          "interviewerIntent": "Test rigorous mathematical understanding of external sorting algorithms.",
          "spokenAnswer": "In a 2-pass external sort (Pass 0 run generation + Pass 1 final merge), Pass 0 creates N/B runs of size B pages. Pass 1 merges all N/B runs simultaneously using (B-1) input buffers. Thus, (B-1) >= N/B, meaning B^2 ≈ N, so B ≈ sqrt(N). For a 100GB relation with 8KB pages (12,500,000 pages), sqrt(12,500,000) ≈ 3,536 buffer pages, which is only ~28.3 MB of RAM! With just 29MB of work_mem, a database can sort 100GB in exactly two passes.",
          "powerKeywords": "External Merge Sort, 2-Pass Sort, Loser Tree, Run Generation, Fan-In Degree, B^2 ≈ N Bound"
        },
        "seedRows": [
          {
            "run_id": 1,
            "pass_num": 0,
            "run_size_pages": 16,
            "start_page_id": 1,
            "end_page_id": 16,
            "fan_in_degree": 1
          },
          {
            "run_id": 2,
            "pass_num": 0,
            "run_size_pages": 16,
            "start_page_id": 17,
            "end_page_id": 32,
            "fan_in_degree": 1
          },
          {
            "run_id": 3,
            "pass_num": 0,
            "run_size_pages": 16,
            "start_page_id": 33,
            "end_page_id": 48,
            "fan_in_degree": 1
          },
          {
            "run_id": 4,
            "pass_num": 0,
            "run_size_pages": 16,
            "start_page_id": 49,
            "end_page_id": 64,
            "fan_in_degree": 1
          },
          {
            "run_id": 5,
            "pass_num": 1,
            "run_size_pages": 64,
            "start_page_id": 100,
            "end_page_id": 163,
            "fan_in_degree": 4
          },
          {
            "run_id": 6,
            "pass_num": 0,
            "run_size_pages": 16,
            "start_page_id": 65,
            "end_page_id": 80,
            "fan_in_degree": 1
          },
          {
            "run_id": 7,
            "pass_num": 0,
            "run_size_pages": 16,
            "start_page_id": 81,
            "end_page_id": 96,
            "fan_in_degree": 1
          },
          {
            "run_id": 8,
            "pass_num": 1,
            "run_size_pages": 32,
            "start_page_id": 200,
            "end_page_id": 231,
            "fan_in_degree": 2
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_04_window_sliding_frame",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "04",
        "topicSeq": "V2-04",
        "title": "Window Aggregate Ring-Buffer O(1) Sliding Frame Optimization",
        "domain": "Relational Query Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "TICK_METRICS",
        "columns": [
          {
            "name": "tick_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "symbol",
            "type": "TEXT"
          },
          {
            "name": "tick_time",
            "type": "INTEGER"
          },
          {
            "name": "price",
            "type": "NUMERIC"
          },
          {
            "name": "volume",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE TICK_METRICS (\n                    tick_id INTEGER PRIMARY KEY,\n                    symbol TEXT,\n                    tick_time INTEGER,\n                    price NUMERIC,\n                    volume INTEGER\n                );\n                INSERT INTO TICK_METRICS VALUES\n                (1, 'AAPL', 100, 180.50, 1500),\n                (2, 'AAPL', 101, 181.00, 2200),\n                (3, 'AAPL', 102, 180.75, 1800),\n                (4, 'AAPL', 103, 182.25, 3100),\n                (5, 'AAPL', 104, 181.90, 2400),\n                (6, 'AAPL', 105, 183.00, 2900),\n                (7, 'MSFT', 100, 420.00, 1100),\n                (8, 'MSFT', 101, 421.50, 1400);\n            ",
        "spec": "Calculate a 3-tick rolling moving average price (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) and cumulative trading volume partitioned by symbol, ordered by tick_time ASC.",
        "starterSql": "-- Compute rolling 3-tick moving average with window frames\nSELECT \n    tick_id,\n    symbol,\n    tick_time,\n    price,\n    ROUND(AVG(price) OVER (\n        PARTITION BY symbol \n        ORDER BY tick_time \n        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n    ), 2) AS rolling_avg_price_3,\n    SUM(volume) OVER (\n        PARTITION BY symbol \n        ORDER BY tick_time \n        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n    ) AS cumulative_volume\nFROM TICK_METRICS\nORDER BY symbol, tick_time;",
        "expectedSolutionSql": "SELECT \n    tick_id,\n    symbol,\n    tick_time,\n    price,\n    ROUND(AVG(price) OVER (\n        PARTITION BY symbol \n        ORDER BY tick_time \n        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n    ), 2) AS rolling_avg_price_3,\n    SUM(volume) OVER (\n        PARTITION BY symbol \n        ORDER BY tick_time \n        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n    ) AS cumulative_volume\nFROM TICK_METRICS\nORDER BY symbol, tick_time;",
        "expectedRowCount": 8,
        "svgDiagramKey": "vol2_04_svg",
        "deepTheory": [
          {
            "title": "O(1) Moving Window Updates",
            "body": "Naive window evaluation re-computes aggregates over all K rows in the frame, costing O(N*K). Optimized engines use two pointers and maintain running totals: new_sum = old_sum + incoming_val - evicted_val, achieving O(1) per row."
          },
          {
            "title": "ROWS vs RANGE",
            "body": "ROWS defines physical row offsets. RANGE defines logical value offsets (treating peers with identical ORDER BY values identically), requiring internal grouping buffers."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why does 'ORDER BY col' without an explicit window frame clause in SQL default to 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', and what is the performance pitfall?",
          "hardwareInvariants": "Memory buffering, temporary spooling to disk, duplicate key peer group buffering.",
          "interviewerIntent": "Evaluate mastery of ANSI SQL window framing specifications and physical engine execution traps.",
          "spokenAnswer": "The ANSI SQL committee specified RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW as default when ORDER BY is present. The pitfall is that RANGE requires buffering all peer rows with identical ordering keys before producing any aggregate value, preventing streaming pipelining. Specifying 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW' enables O(1) running single-pass execution without peer group buffering.",
          "powerKeywords": "Window Framing, ROWS vs RANGE, Ring Buffer, Peer Group Buffering, O(1) Sliding Aggregate"
        },
        "seedRows": [
          {
            "tick_id": 1,
            "symbol": "AAPL",
            "tick_time": 100,
            "price": 180.5,
            "volume": 1500
          },
          {
            "tick_id": 2,
            "symbol": "AAPL",
            "tick_time": 101,
            "price": 181,
            "volume": 2200
          },
          {
            "tick_id": 3,
            "symbol": "AAPL",
            "tick_time": 102,
            "price": 180.75,
            "volume": 1800
          },
          {
            "tick_id": 4,
            "symbol": "AAPL",
            "tick_time": 103,
            "price": 182.25,
            "volume": 3100
          },
          {
            "tick_id": 5,
            "symbol": "AAPL",
            "tick_time": 104,
            "price": 181.9,
            "volume": 2400
          },
          {
            "tick_id": 6,
            "symbol": "AAPL",
            "tick_time": 105,
            "price": 183,
            "volume": 2900
          },
          {
            "tick_id": 7,
            "symbol": "MSFT",
            "tick_time": 100,
            "price": 420,
            "volume": 1100
          },
          {
            "tick_id": 8,
            "symbol": "MSFT",
            "tick_time": 101,
            "price": 421.5,
            "volume": 1400
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_05_semi_join_decorrelation",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "05",
        "topicSeq": "V2-05",
        "title": "Correlated Subquery Decorrelation to Hash Anti-Join",
        "domain": "Query Optimization",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "CLIENT_ACCOUNTS",
        "columns": [
          {
            "name": "account_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "client_name",
            "type": "TEXT"
          },
          {
            "name": "tier",
            "type": "TEXT"
          },
          {
            "name": "balance",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE CLIENT_ACCOUNTS (\n                    account_id INTEGER PRIMARY KEY,\n                    client_name TEXT,\n                    tier TEXT,\n                    balance NUMERIC\n                );\n                CREATE TABLE RESTRICTED_TRANSACTIONS (\n                    tx_id INTEGER PRIMARY KEY,\n                    account_id INTEGER,\n                    flag_code TEXT\n                );\n                INSERT INTO CLIENT_ACCOUNTS VALUES\n                (101, 'Acme Corp', 'Platinum', 500000),\n                (102, 'Beta LLC', 'Silver', 25000),\n                (103, 'Gamma Ltd', 'Gold', 180000),\n                (104, 'Delta Inc', 'Gold', 120000),\n                (105, 'Epsilon Co', 'Platinum', 950000);\n                INSERT INTO RESTRICTED_TRANSACTIONS VALUES\n                (1, 102, 'AML_HOLD'),\n                (2, 104, 'SANCTION_CHECK');\n            ",
        "spec": "Decorrelate a NOT EXISTS subquery into an explicit LEFT JOIN ... WHERE right.key IS NULL (Anti-Join pattern) to retrieve all Gold or Platinum clients with balance > 100,000 who have zero restricted transactions.",
        "starterSql": "-- Rewrite NOT EXISTS into an optimal Hash Anti-Join\nSELECT \n    c.account_id,\n    c.client_name,\n    c.tier,\n    c.balance\nFROM CLIENT_ACCOUNTS c\nLEFT JOIN RESTRICTED_TRANSACTIONS r ON c.account_id = r.account_id\nWHERE /* TODO: Filter tier in ('Gold', 'Platinum'), balance > 100000, and no restricted tx */\nORDER BY c.balance DESC;",
        "expectedSolutionSql": "SELECT \n    c.account_id,\n    c.client_name,\n    c.tier,\n    c.balance\nFROM CLIENT_ACCOUNTS c\nLEFT JOIN RESTRICTED_TRANSACTIONS r ON c.account_id = r.account_id\nWHERE c.tier IN ('Gold', 'Platinum')\n  AND c.balance > 100000\n  AND r.account_id IS NULL\nORDER BY c.balance DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol2_05_svg",
        "deepTheory": [
          {
            "title": "Subquery Decorrelation",
            "body": "A correlated subquery evaluates once per outer row (O(N*M) nested loop). Decorrelation transforms it into a relational operator (Hash Semi-Join or Anti-Join) executing in linear O(N+M) time."
          },
          {
            "title": "Hash Anti-Join Optimization",
            "body": "A Hash Anti-Join builds a hash table on the inner keys. As outer rows probe the table, if a match is found, the outer row is discarded immediately without evaluating remaining rows."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does a database query optimizer transform NOT EXISTS and NOT IN subqueries, and why is NOT IN with NULLs dangerous?",
          "hardwareInvariants": "Branch mispredictions, nested loop cache thrashing, three-valued logic truth tables.",
          "interviewerIntent": "Evaluate deep grasp of query unnesting, null semantics, and relational algebra rewrites.",
          "spokenAnswer": "Under ANSI SQL three-valued logic, if the subquery in 'WHERE col NOT IN (SELECT ...)' returns even a single NULL value, the predicate evaluates to UNKNOWN for all rows, causing the query to return zero rows! Optimizers cannot easily unnest NOT IN into an Anti-Join unless the column is declared NOT NULL. In contrast, NOT EXISTS uses two-valued Boolean logic; an outer row is preserved if the inner condition is false or returns no rows, enabling the optimizer to cleanly decorrelate it into a high-performance Hash Anti-Join.",
          "powerKeywords": "Subquery Decorrelation, Hash Anti-Join, Three-Valued Logic, NOT IN vs NOT EXISTS, Null Pitfall"
        },
        "seedRows": [
          {
            "account_id": 101,
            "client_name": "Acme Corp",
            "tier": "Platinum",
            "balance": 500000
          },
          {
            "account_id": 102,
            "client_name": "Beta LLC",
            "tier": "Silver",
            "balance": 25000
          },
          {
            "account_id": 103,
            "client_name": "Gamma Ltd",
            "tier": "Gold",
            "balance": 180000
          },
          {
            "account_id": 104,
            "client_name": "Delta Inc",
            "tier": "Gold",
            "balance": 120000
          },
          {
            "account_id": 105,
            "client_name": "Epsilon Co",
            "tier": "Platinum",
            "balance": 950000
          }
        ],
        "extraTables": {
          "RESTRICTED_TRANSACTIONS": [
            {
              "tx_id": 1,
              "account_id": 102,
              "flag_code": "AML_HOLD"
            },
            {
              "tx_id": 2,
              "account_id": 104,
              "flag_code": "SANCTION_CHECK"
            }
          ]
        }
      },
      {
        "id": "vol2_06_cbo_join_order_dp",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "06",
        "topicSeq": "V2-06",
        "title": "Cost-Based Optimizer Dynamic Programming Join Order Enumeration",
        "domain": "Query Optimization",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "CBO_PLAN_ENUMERATIONS",
        "columns": [
          {
            "name": "plan_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "relation_subset",
            "type": "TEXT"
          },
          {
            "name": "join_order",
            "type": "TEXT"
          },
          {
            "name": "est_cardinality",
            "type": "INTEGER"
          },
          {
            "name": "io_cost",
            "type": "NUMERIC"
          },
          {
            "name": "cpu_cost",
            "type": "NUMERIC"
          },
          {
            "name": "total_cost",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE CBO_PLAN_ENUMERATIONS (\n                    plan_id INTEGER PRIMARY KEY,\n                    relation_subset TEXT,\n                    join_order TEXT,\n                    est_cardinality INTEGER,\n                    io_cost NUMERIC,\n                    cpu_cost NUMERIC,\n                    total_cost NUMERIC\n                );\n                INSERT INTO CBO_PLAN_ENUMERATIONS VALUES\n                (1, '{A,B,C}', '((A JOIN B) JOIN C)', 5000, 1420.5, 310.2, 1730.7),\n                (2, '{A,B,C}', '((B JOIN C) JOIN A)', 12000, 3100.0, 680.0, 3780.0),\n                (3, '{A,B,C}', '((A JOIN C) JOIN B)', 450, 410.0, 85.0, 495.0),\n                (4, '{A,B,C,D}', '(((A JOIN C) JOIN B) JOIN D)', 450, 620.0, 120.0, 740.0),\n                (5, '{A,B,C,D}', '((A JOIN C) JOIN (B JOIN D))', 800, 950.0, 210.0, 1160.0);\n            ",
        "spec": "Find the cheapest execution plan (minimum total_cost) for each relation subset to trace the dynamic programming bottom-up memoization table.",
        "starterSql": "-- Extract optimal sub-plans across relation subsets via window partitioning\nWITH ranked_plans AS (\n    SELECT \n        plan_id,\n        relation_subset,\n        join_order,\n        total_cost,\n        ROW_NUMBER() OVER (PARTITION BY relation_subset ORDER BY total_cost ASC) AS rnk\n    FROM CBO_PLAN_ENUMERATIONS\n)\nSELECT \n    plan_id,\n    relation_subset,\n    join_order,\n    total_cost\nFROM ranked_plans\nWHERE rnk = 1\nORDER BY relation_subset;",
        "expectedSolutionSql": "WITH ranked_plans AS (\n    SELECT \n        plan_id,\n        relation_subset,\n        join_order,\n        total_cost,\n        ROW_NUMBER() OVER (PARTITION BY relation_subset ORDER BY total_cost ASC) AS rnk\n    FROM CBO_PLAN_ENUMERATIONS\n)\nSELECT \n    plan_id,\n    relation_subset,\n    join_order,\n    total_cost\nFROM ranked_plans\nWHERE rnk = 1\nORDER BY relation_subset;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol2_06_svg",
        "deepTheory": [
          {
            "title": "System R Dynamic Programming",
            "body": "Joining N tables has (2N-2)! / (N-1)! possible bushy join trees. The Selinger DP algorithm builds optimal plans for size 1, then size 2, then size 3 subsets, pruning suboptimal sub-plans at each level."
          },
          {
            "title": "Interesting Orders",
            "body": "A plan with a slightly higher sort cost might be retained if it produces tuples sorted on an 'interesting order' required by a downstream GROUP BY or ORDER BY clause."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why does join enumeration complexity explode exponentially, and how do optimizers like PostgreSQL handle joins of 15+ tables?",
          "hardwareInvariants": "Memory exhaustion in optimizer memo structures, CPU planning timeouts.",
          "interviewerIntent": "Evaluate knowledge of dynamic programming vs genetic algorithms (GEQO) in query planning.",
          "spokenAnswer": "The search space for joining N tables grows factorially (O(N!) for left-deep trees, Catalan numbers for bushy trees). Dynamic programming becomes computationally prohibitive beyond 10-12 tables. PostgreSQL switches from dynamic programming to a Genetic Query Optimizer (GEQO) when join_collapse_limit or geqo_threshold (default 12) is exceeded, using stochastic heuristic search to find near-optimal plans without exhaustive enumeration.",
          "powerKeywords": "System R, Dynamic Programming, Join Enumeration, GEQO (Genetic Optimizer), Left-Deep vs Bushy Trees, Interesting Orders"
        },
        "seedRows": [
          {
            "plan_id": 1,
            "relation_subset": "{A,B,C}",
            "join_order": "((A JOIN B) JOIN C)",
            "est_cardinality": 5000,
            "io_cost": 1420.5,
            "cpu_cost": 310.2,
            "total_cost": 1730.7
          },
          {
            "plan_id": 2,
            "relation_subset": "{A,B,C}",
            "join_order": "((B JOIN C) JOIN A)",
            "est_cardinality": 12000,
            "io_cost": 3100,
            "cpu_cost": 680,
            "total_cost": 3780
          },
          {
            "plan_id": 3,
            "relation_subset": "{A,B,C}",
            "join_order": "((A JOIN C) JOIN B)",
            "est_cardinality": 450,
            "io_cost": 410,
            "cpu_cost": 85,
            "total_cost": 495
          },
          {
            "plan_id": 4,
            "relation_subset": "{A,B,C,D}",
            "join_order": "(((A JOIN C) JOIN B) JOIN D)",
            "est_cardinality": 450,
            "io_cost": 620,
            "cpu_cost": 120,
            "total_cost": 740
          },
          {
            "plan_id": 5,
            "relation_subset": "{A,B,C,D}",
            "join_order": "((A JOIN C) JOIN (B JOIN D))",
            "est_cardinality": 800,
            "io_cost": 950,
            "cpu_cost": 210,
            "total_cost": 1160
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_07_morsel_driven_parallelism",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "07",
        "topicSeq": "V2-07",
        "title": "Morsel-Driven Parallelism & NUMA-Aware Work Stealing",
        "domain": "Parallel Execution Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "MORSEL_WORK_UNITS",
        "columns": [
          {
            "name": "morsel_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "pipeline_stage",
            "type": "TEXT"
          },
          {
            "name": "core_id",
            "type": "INTEGER"
          },
          {
            "name": "start_row",
            "type": "INTEGER"
          },
          {
            "name": "end_row",
            "type": "INTEGER"
          },
          {
            "name": "execution_nanos",
            "type": "INTEGER"
          },
          {
            "name": "stolen_by_core",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE MORSEL_WORK_UNITS (\n                    morsel_id INTEGER PRIMARY KEY,\n                    pipeline_stage TEXT,\n                    core_id INTEGER,\n                    start_row INTEGER,\n                    end_row INTEGER,\n                    execution_nanos INTEGER,\n                    stolen_by_core INTEGER\n                );\n                INSERT INTO MORSEL_WORK_UNITS VALUES\n                (1, 'SCAN_FILTER', 0, 0, 99999, 1200000, NULL),\n                (2, 'SCAN_FILTER', 0, 100000, 199999, 1150000, NULL),\n                (3, 'SCAN_FILTER', 1, 200000, 299999, 1180000, NULL),\n                (4, 'SCAN_FILTER', 1, 300000, 399999, 1220000, 3),\n                (5, 'HASH_BUILD', 2, 0, 49999, 3400000, NULL),\n                (6, 'HASH_BUILD', 2, 50000, 99999, 3600000, 1),\n                (7, 'HASH_BUILD', 3, 100000, 149999, 3500000, NULL);\n            ",
        "spec": "Calculate the work-stealing metrics per pipeline_stage: total morsels executed, total stolen morsels, and total processing time in milliseconds.",
        "starterSql": "-- Measure work stealing distribution across query pipeline stages\nSELECT \n    pipeline_stage,\n    COUNT(*) AS total_morsels,\n    SUM(CASE WHEN stolen_by_core IS NOT NULL THEN 1 ELSE 0 END) AS stolen_morsels,\n    ROUND(SUM(execution_nanos) / 1000000.0, 2) AS total_duration_ms\nFROM MORSEL_WORK_UNITS\nGROUP BY pipeline_stage\nORDER BY pipeline_stage;",
        "expectedSolutionSql": "SELECT \n    pipeline_stage,\n    COUNT(*) AS total_morsels,\n    SUM(CASE WHEN stolen_by_core IS NOT NULL THEN 1 ELSE 0 END) AS stolen_morsels,\n    ROUND(SUM(execution_nanos) / 1000000.0, 2) AS total_duration_ms\nFROM MORSEL_WORK_UNITS\nGROUP BY pipeline_stage\nORDER BY pipeline_stage;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol2_07_svg",
        "deepTheory": [
          {
            "title": "Morsel-Driven Model",
            "body": "Introduced by Hyper and adopted by DuckDB: rather than spawning fixed thread partitions per operator, work is broken into small morsels (e.g. 100,000 rows). Worker threads pull morsels dynamically from a lock-free queue."
          },
          {
            "title": "NUMA Awareness",
            "body": "Threads prefer pulling morsels residing in their local NUMA node socket memory to avoid saturated QPI/UPI interconnect bus traffic."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does Morsel-Driven Parallelism solve the straggler problem in parallel analytical queries?",
          "hardwareInvariants": "NUMA node memory interconnect latency, thread context switching, lock-free work-stealing queues.",
          "interviewerIntent": "Evaluate knowledge of state-of-the-art parallel database engine architectures (DuckDB/Hyper).",
          "spokenAnswer": "Traditional parallel query engines split input tables into fixed chunks per thread at planning time. If one thread encounters slow data or expensive regex evaluations, all other idle cores wait blocked at the synchronization barrier. Morsel-driven execution splits input into fine-grained morsels (~100K rows). Threads dynamically pull morsels upon completion. If a core finishes early, it steals morsels from busy queues, dynamically balancing CPU utilization to 100% across all cores.",
          "powerKeywords": "Morsel-Driven Parallelism, Work Stealing, Straggler Elimination, NUMA Locality, Hyper/DuckDB Architecture"
        },
        "seedRows": [
          {
            "morsel_id": 1,
            "pipeline_stage": "SCAN_FILTER",
            "core_id": 0,
            "start_row": 0,
            "end_row": 99999,
            "execution_nanos": 1200000,
            "stolen_by_core": null
          },
          {
            "morsel_id": 2,
            "pipeline_stage": "SCAN_FILTER",
            "core_id": 0,
            "start_row": 100000,
            "end_row": 199999,
            "execution_nanos": 1150000,
            "stolen_by_core": null
          },
          {
            "morsel_id": 3,
            "pipeline_stage": "SCAN_FILTER",
            "core_id": 1,
            "start_row": 200000,
            "end_row": 299999,
            "execution_nanos": 1180000,
            "stolen_by_core": null
          },
          {
            "morsel_id": 4,
            "pipeline_stage": "SCAN_FILTER",
            "core_id": 1,
            "start_row": 300000,
            "end_row": 399999,
            "execution_nanos": 1220000,
            "stolen_by_core": 3
          },
          {
            "morsel_id": 5,
            "pipeline_stage": "HASH_BUILD",
            "core_id": 2,
            "start_row": 0,
            "end_row": 49999,
            "execution_nanos": 3400000,
            "stolen_by_core": null
          },
          {
            "morsel_id": 6,
            "pipeline_stage": "HASH_BUILD",
            "core_id": 2,
            "start_row": 50000,
            "end_row": 99999,
            "execution_nanos": 3600000,
            "stolen_by_core": 1
          },
          {
            "morsel_id": 7,
            "pipeline_stage": "HASH_BUILD",
            "core_id": 3,
            "start_row": 100000,
            "end_row": 149999,
            "execution_nanos": 3500000,
            "stolen_by_core": null
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_08_bitmap_index_intersect",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "08",
        "topicSeq": "V2-08",
        "title": "Bitmap Index Fast Intersect (Bitwise AND/OR Engine)",
        "domain": "Index Optimization",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "CUSTOMER_DEMOGRAPHICS",
        "columns": [
          {
            "name": "cust_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "income_bracket",
            "type": "TEXT"
          },
          {
            "name": "has_mortgage",
            "type": "INTEGER"
          },
          {
            "name": "is_active",
            "type": "INTEGER"
          },
          {
            "name": "credit_tier",
            "type": "TEXT"
          }
        ],
        "seedSql": "\n                CREATE TABLE CUSTOMER_DEMOGRAPHICS (\n                    cust_id INTEGER PRIMARY KEY,\n                    income_bracket TEXT,\n                    has_mortgage INTEGER,\n                    is_active INTEGER,\n                    credit_tier TEXT\n                );\n                INSERT INTO CUSTOMER_DEMOGRAPHICS VALUES\n                (1, 'HIGH', 1, 1, 'EXCELLENT'),\n                (2, 'MEDIUM', 0, 1, 'GOOD'),\n                (3, 'HIGH', 1, 1, 'GOOD'),\n                (4, 'LOW', 0, 0, 'FAIR'),\n                (5, 'HIGH', 0, 1, 'EXCELLENT'),\n                (6, 'HIGH', 1, 0, 'EXCELLENT'),\n                (7, 'HIGH', 1, 1, 'EXCELLENT');\n            ",
        "spec": "Simulate a multi-index Bitmap AND intersection: find all active customers (is_active = 1) with high income (income_bracket = 'HIGH'), holding a mortgage (has_mortgage = 1), and with 'EXCELLENT' credit tier.",
        "starterSql": "-- Query records satisfying multi-attribute bitmap intersection\nSELECT \n    cust_id,\n    income_bracket,\n    has_mortgage,\n    is_active,\n    credit_tier\nFROM CUSTOMER_DEMOGRAPHICS\nWHERE /* TODO: Filter high income, mortgage, active, excellent credit */\nORDER BY cust_id ASC;",
        "expectedSolutionSql": "SELECT \n    cust_id,\n    income_bracket,\n    has_mortgage,\n    is_active,\n    credit_tier\nFROM CUSTOMER_DEMOGRAPHICS\nWHERE is_active = 1 \n  AND income_bracket = 'HIGH' \n  AND has_mortgage = 1 \n  AND credit_tier = 'EXCELLENT'\nORDER BY cust_id ASC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol2_08_svg",
        "deepTheory": [
          {
            "title": "Bitmap Index Encoding",
            "body": "A bitmap index stores a bit vector for each distinct value where bit i is 1 if row i matches. Combining filters (A AND B) reduces to a single bitwise CPU AND instruction across 64 rows simultaneously."
          },
          {
            "title": "Roaring Bitmaps",
            "body": "Modern engines compress sparse and dense bit vectors using Roaring Bitmaps, switching between bitsets and sorted short arrays to save memory."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why are Bitmap Indexes outstanding for read-heavy analytical data warehouses but catastrophic for OLTP transaction systems?",
          "hardwareInvariants": "Bit-level locking granularity, lock latch contention, update amplification.",
          "interviewerIntent": "Evaluate understanding of physical index structures and concurrency limitations.",
          "spokenAnswer": "In an OLTP system, locking a row usually requires locking a single record or page. In a bitmap index, a single bit represents a row within a 64-bit word. Modifying or inserting a row requires updating the bitmap vector for every indexed column. Because databases cannot lock individual bits, updating a row locks the entire bitmap segment or page, blocking concurrent transactions from modifying completely unrelated rows that happen to share the same bit array.",
          "powerKeywords": "Bitmap Index, Roaring Bitmaps, Bitwise AND Intersect, Lock Granularity, OLAP vs OLTP"
        },
        "seedRows": [
          {
            "cust_id": 1,
            "income_bracket": "HIGH",
            "has_mortgage": 1,
            "is_active": 1,
            "credit_tier": "EXCELLENT"
          },
          {
            "cust_id": 2,
            "income_bracket": "MEDIUM",
            "has_mortgage": 0,
            "is_active": 1,
            "credit_tier": "GOOD"
          },
          {
            "cust_id": 3,
            "income_bracket": "HIGH",
            "has_mortgage": 1,
            "is_active": 1,
            "credit_tier": "GOOD"
          },
          {
            "cust_id": 4,
            "income_bracket": "LOW",
            "has_mortgage": 0,
            "is_active": 0,
            "credit_tier": "FAIR"
          },
          {
            "cust_id": 5,
            "income_bracket": "HIGH",
            "has_mortgage": 0,
            "is_active": 1,
            "credit_tier": "EXCELLENT"
          },
          {
            "cust_id": 6,
            "income_bracket": "HIGH",
            "has_mortgage": 1,
            "is_active": 0,
            "credit_tier": "EXCELLENT"
          },
          {
            "cust_id": 7,
            "income_bracket": "HIGH",
            "has_mortgage": 1,
            "is_active": 1,
            "credit_tier": "EXCELLENT"
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_09_recursive_cte_cycle",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "09",
        "topicSeq": "V2-09",
        "title": "Recursive CTE Graph Traversal & Loop Cycle Invariants",
        "domain": "Relational Query Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "ORG_HIERARCHY",
        "columns": [
          {
            "name": "emp_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "manager_id",
            "type": "INTEGER"
          },
          {
            "name": "title",
            "type": "TEXT"
          },
          {
            "name": "salary",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE ORG_HIERARCHY (\n                    emp_id INTEGER PRIMARY KEY,\n                    manager_id INTEGER,\n                    title TEXT,\n                    salary INTEGER\n                );\n                INSERT INTO ORG_HIERARCHY VALUES\n                (1, NULL, 'CEO', 450000),\n                (2, 1, 'VP Engineering', 280000),\n                (3, 1, 'VP Sales', 260000),\n                (4, 2, 'Director Infra', 210000),\n                (5, 4, 'Staff DB Engineer', 185000),\n                (6, 3, 'Account Exec', 120000);\n            ",
        "spec": "Using a recursive CTE, traverse the management hierarchy starting from the CEO (manager_id IS NULL), computing each employee's depth level (0 for CEO) and reporting chain path (e.g. '/1', '/1/2', '/1/2/4').",
        "starterSql": "-- Traverse corporate hierarchy tree using recursive CTE\nWITH RECURSIVE org_tree AS (\n    SELECT \n        emp_id,\n        manager_id,\n        title,\n        0 AS depth_level,\n        '/' || emp_id AS path\n    FROM ORG_HIERARCHY\n    WHERE manager_id IS NULL\n    \n    UNION ALL\n    \n    SELECT \n        e.emp_id,\n        e.manager_id,\n        e.title,\n        o.depth_level + 1,\n        o.path || '/' || e.emp_id\n    FROM ORG_HIERARCHY e\n    JOIN org_tree o ON e.manager_id = o.emp_id\n)\nSELECT emp_id, title, depth_level, path\nFROM org_tree\nORDER BY depth_level ASC, emp_id ASC;",
        "expectedSolutionSql": "WITH RECURSIVE org_tree AS (\n    SELECT \n        emp_id,\n        manager_id,\n        title,\n        0 AS depth_level,\n        '/' || emp_id AS path\n    FROM ORG_HIERARCHY\n    WHERE manager_id IS NULL\n    \n    UNION ALL\n    \n    SELECT \n        e.emp_id,\n        e.manager_id,\n        e.title,\n        o.depth_level + 1,\n        o.path || '/' || e.emp_id\n    FROM ORG_HIERARCHY e\n    JOIN org_tree o ON e.manager_id = o.emp_id\n)\nSELECT emp_id, title, depth_level, path\nFROM org_tree\nORDER BY depth_level ASC, emp_id ASC;",
        "expectedRowCount": 6,
        "svgDiagramKey": "vol2_09_svg",
        "deepTheory": [
          {
            "title": "Fixpoint Iteration",
            "body": "A recursive CTE operates via fixpoint iteration: it evaluates the anchor member, then feeds intermediate results into the recursive member until an empty working table is reached."
          },
          {
            "title": "Cycle Prevention",
            "body": "If data contains directed cycles (e.g. employee A manages B and B manages A), naive recursion runs infinitely until memory exhaustion. Maintaining an array or path string detects cycles immediately."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does the SQL engine physically execute a WITH RECURSIVE query, and how does it prevent infinite loops in cyclic graphs?",
          "hardwareInvariants": "Working table spooling, intermediate memory allocations, stack overflow protection.",
          "interviewerIntent": "Evaluate knowledge of relational fixed-point evaluation and graph cycle detection algorithms.",
          "spokenAnswer": "The engine executes a recursive CTE using two working tables: the Intermediate Working Table and the Accumulated Result Table. First, it executes the non-recursive Anchor term and loads results into both tables. Then, it enters a loop: it feeds the Working Table into the recursive term, appends new output to the Accumulated Table, replaces the Working Table with the new delta, and repeats until the Working Table is empty (fixpoint). In cyclic graphs, engines without SQL:2008 'CYCLE' clauses will loop infinitely; production engineers guard against this by tracking visited IDs in a path string or array.",
          "powerKeywords": "Recursive CTE, Fixpoint Iteration, Working Table Spool, Anchor vs Recursive Member, Cycle Detection"
        },
        "seedRows": [
          {
            "emp_id": 1,
            "manager_id": null,
            "title": "CEO",
            "salary": 450000
          },
          {
            "emp_id": 2,
            "manager_id": 1,
            "title": "VP Engineering",
            "salary": 280000
          },
          {
            "emp_id": 3,
            "manager_id": 1,
            "title": "VP Sales",
            "salary": 260000
          },
          {
            "emp_id": 4,
            "manager_id": 2,
            "title": "Director Infra",
            "salary": 210000
          },
          {
            "emp_id": 5,
            "manager_id": 4,
            "title": "Staff DB Engineer",
            "salary": 185000
          },
          {
            "emp_id": 6,
            "manager_id": 3,
            "title": "Account Exec",
            "salary": 120000
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_10_hash_agg_skew",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "10",
        "topicSeq": "V2-10",
        "title": "Hash Aggregation vs Streaming Group-By Under Heavy Cardinality Skew",
        "domain": "Relational Query Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "TELEMETRY_LOGS",
        "columns": [
          {
            "name": "log_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "service_name",
            "type": "TEXT"
          },
          {
            "name": "status_code",
            "type": "INTEGER"
          },
          {
            "name": "latency_ms",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE TELEMETRY_LOGS (\n                    log_id INTEGER PRIMARY KEY,\n                    service_name TEXT,\n                    status_code INTEGER,\n                    latency_ms NUMERIC\n                );\n                INSERT INTO TELEMETRY_LOGS VALUES\n                (1, 'auth-service', 200, 15.2),\n                (2, 'auth-service', 200, 14.8),\n                (3, 'auth-service', 500, 120.5),\n                (4, 'payment-gateway', 200, 85.0),\n                (5, 'payment-gateway', 200, 92.4),\n                (6, 'auth-service', 200, 16.1),\n                (7, 'search-api', 200, 45.0),\n                (8, 'search-api', 503, 310.0);\n            ",
        "spec": "Aggregate telemetry metrics grouped by service_name and status_code: compute total request count, average latency, and maximum latency, ordering by highest request volume.",
        "starterSql": "-- Aggregate telemetry events with low cardinality grouping\nSELECT \n    service_name,\n    status_code,\n    COUNT(*) AS request_count,\n    ROUND(AVG(latency_ms), 1) AS avg_latency_ms,\n    ROUND(MAX(latency_ms), 1) AS max_latency_ms\nFROM TELEMETRY_LOGS\nGROUP BY service_name, status_code\nORDER BY request_count DESC, service_name ASC;",
        "expectedSolutionSql": "SELECT \n    service_name,\n    status_code,\n    COUNT(*) AS request_count,\n    ROUND(AVG(latency_ms), 1) AS avg_latency_ms,\n    ROUND(MAX(latency_ms), 1) AS max_latency_ms\nFROM TELEMETRY_LOGS\nGROUP BY service_name, status_code\nORDER BY request_count DESC, service_name ASC;",
        "expectedRowCount": 5,
        "svgDiagramKey": "vol2_10_svg",
        "deepTheory": [
          {
            "title": "Hash Aggregate vs Stream Aggregate",
            "body": "Hash Aggregation builds an in-memory hash table of group states, processing unsorted rows in O(N). Stream Aggregation requires inputs to be pre-sorted on the GROUP BY columns, processing in O(1) memory space."
          }
        ],
        "staffInterviewDefense": {
          "question": "When does the query planner choose Hash Aggregate over Stream Aggregate, and what causes Hash Aggregate to spill?",
          "hardwareInvariants": "CPU cache miss rate on hash table probes, memory allocation limits (work_mem).",
          "interviewerIntent": "Evaluate cost model selection between sort-based and hash-based aggregation.",
          "spokenAnswer": "The planner chooses Stream Aggregate when input data is already sorted by an index or prior operator, because Stream Aggregate requires O(1) memory and streams results instantly. Hash Aggregate is chosen when data is unsorted and estimated group cardinality fits within work_mem. If cardinality is underestimated and groups exceed work_mem, the hash table spills partitions to disk, requiring expensive multi-pass rehashing.",
          "powerKeywords": "Hash Aggregate, Stream Aggregate, work_mem Spilling, Group By Cardinality, Pre-Sorted Input"
        },
        "seedRows": [
          {
            "log_id": 1,
            "service_name": "auth-service",
            "status_code": 200,
            "latency_ms": 15.2
          },
          {
            "log_id": 2,
            "service_name": "auth-service",
            "status_code": 200,
            "latency_ms": 14.8
          },
          {
            "log_id": 3,
            "service_name": "auth-service",
            "status_code": 500,
            "latency_ms": 120.5
          },
          {
            "log_id": 4,
            "service_name": "payment-gateway",
            "status_code": 200,
            "latency_ms": 85
          },
          {
            "log_id": 5,
            "service_name": "payment-gateway",
            "status_code": 200,
            "latency_ms": 92.4
          },
          {
            "log_id": 6,
            "service_name": "auth-service",
            "status_code": 200,
            "latency_ms": 16.1
          },
          {
            "log_id": 7,
            "service_name": "search-api",
            "status_code": 200,
            "latency_ms": 45
          },
          {
            "log_id": 8,
            "service_name": "search-api",
            "status_code": 503,
            "latency_ms": 310
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol2_11_merge_join_cartesian_spill",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "11",
        "topicSeq": "V2-11",
        "title": "Merge Join Cartesian Mark-and-Restore Spilling on Duplicate Keys",
        "domain": "Relational Query Engine",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "SUPPLIER_PARTS",
        "columns": [
          {
            "name": "supplier_id",
            "type": "INTEGER"
          },
          {
            "name": "part_id",
            "type": "INTEGER"
          },
          {
            "name": "batch_code",
            "type": "TEXT"
          },
          {
            "name": "unit_cost",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE SUPPLIER_PARTS (\n                    supplier_id INTEGER,\n                    part_id INTEGER,\n                    batch_code TEXT,\n                    unit_cost NUMERIC\n                );\n                CREATE TABLE INVENTORY_LEVELS (\n                    part_id INTEGER,\n                    warehouse_id INTEGER,\n                    qty INTEGER\n                );\n                INSERT INTO SUPPLIER_PARTS VALUES\n                (1, 501, 'BATCH_A', 12.50),\n                (1, 501, 'BATCH_B', 13.00),\n                (2, 501, 'BATCH_C', 12.80),\n                (3, 502, 'BATCH_D', 45.00);\n                INSERT INTO INVENTORY_LEVELS VALUES\n                (501, 10, 1000),\n                (501, 20, 2500),\n                (502, 10, 400);\n            ",
        "spec": "Join supplier parts and inventory levels on part_id: observe that duplicate keys (part_id=501 has 3 supplier rows and 2 inventory rows) trigger Cartesian mark-and-restore buffer rewinds in physical merge joins.",
        "starterSql": "-- Execute equi-join on duplicate foreign keys\nSELECT \n    s.part_id,\n    s.supplier_id,\n    s.batch_code,\n    i.warehouse_id,\n    i.qty\nFROM SUPPLIER_PARTS s\nINNER JOIN INVENTORY_LEVELS i ON s.part_id = i.part_id\nORDER BY s.part_id, s.supplier_id, i.warehouse_id;",
        "expectedSolutionSql": "SELECT \n    s.part_id,\n    s.supplier_id,\n    s.batch_code,\n    i.warehouse_id,\n    i.qty\nFROM SUPPLIER_PARTS s\nINNER JOIN INVENTORY_LEVELS i ON s.part_id = i.part_id\nORDER BY s.part_id, s.supplier_id, i.warehouse_id;",
        "expectedRowCount": 7,
        "svgDiagramKey": "vol2_11_svg",
        "deepTheory": [
          {
            "title": "Mark and Restore Mechanics",
            "body": "Sort-Merge Join advances two sorted cursors. When matching unique keys, it runs in linear O(N+M) time. But when duplicate keys appear on both sides, the engine must 'mark' the start of the duplicate block and 'restore' (rewind) the cursor for every matching outer row, degrading to O(N*M)."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why can Sort-Merge Join degrade to O(N*M) worst-case time complexity, and how do database engines physically handle the rewind?",
          "hardwareInvariants": "Memory buffering, cursor spooling, cache-friendly linear traversal vs random rewinds.",
          "interviewerIntent": "Evaluate deep understanding of physical Sort-Merge Join operator mechanics.",
          "spokenAnswer": "Sort-Merge Join is strictly O(N+M) only when at least one side has unique join keys. When duplicate keys exist on both relations (a many-to-many join), the inner cursor must rewind back to the first duplicate row for every matching outer row. Databases implement this using a 'Materialize' or spool buffer. If the group of duplicate keys is massive and exceeds available RAM, the spool buffer spills to disk, turning what seemed like an efficient merge join into a catastrophic disk-thrashing loop.",
          "powerKeywords": "Sort-Merge Join, Mark and Restore, Many-to-Many Join, Materialize Buffer, Cursor Rewind"
        },
        "seedRows": [
          {
            "supplier_id": 1,
            "part_id": 501,
            "batch_code": "BATCH_A",
            "unit_cost": 12.5
          },
          {
            "supplier_id": 1,
            "part_id": 501,
            "batch_code": "BATCH_B",
            "unit_cost": 13
          },
          {
            "supplier_id": 2,
            "part_id": 501,
            "batch_code": "BATCH_C",
            "unit_cost": 12.8
          },
          {
            "supplier_id": 3,
            "part_id": 502,
            "batch_code": "BATCH_D",
            "unit_cost": 45
          }
        ],
        "extraTables": {
          "INVENTORY_LEVELS": [
            {
              "part_id": 501,
              "warehouse_id": 10,
              "qty": 1000
            },
            {
              "part_id": 501,
              "warehouse_id": 20,
              "qty": 2500
            },
            {
              "part_id": 502,
              "warehouse_id": 10,
              "qty": 400
            }
          ]
        }
      },
      {
        "id": "vol2_12_hll_cardinality_estimation",
        "volumeId": "vol_2_operators",
        "volumeName": "Volume 2: Relational Operators, Hash Engines & Execution Physics",
        "seq": "12",
        "topicSeq": "V2-12",
        "title": "HyperLogLog Harmonic Mean Cardinality Estimation",
        "domain": "Analytics / Statistics",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "HLL_REGISTERS",
        "columns": [
          {
            "name": "bucket_index",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "leading_zeros",
            "type": "INTEGER"
          },
          {
            "name": "stream_id",
            "type": "TEXT"
          }
        ],
        "seedSql": "\n                CREATE TABLE HLL_REGISTERS (\n                    bucket_index INTEGER PRIMARY KEY,\n                    leading_zeros INTEGER,\n                    stream_id TEXT\n                );\n                INSERT INTO HLL_REGISTERS VALUES\n                (0, 8, 'visitor_stream'),\n                (1, 9, 'visitor_stream'),\n                (2, 7, 'visitor_stream'),\n                (3, 11, 'visitor_stream'),\n                (4, 8, 'visitor_stream'),\n                (5, 10, 'visitor_stream'),\n                (6, 7, 'visitor_stream'),\n                (7, 9, 'visitor_stream');\n            ",
        "spec": "Simulate HyperLogLog register aggregation: calculate total buckets, average leading zero register value, and maximum leading zeros across all hash buckets.",
        "starterSql": "-- Aggregate HyperLogLog register telemetry\nSELECT \n    stream_id,\n    COUNT(*) AS total_buckets,\n    ROUND(AVG(leading_zeros), 2) AS avg_leading_zeros,\n    MAX(leading_zeros) AS max_leading_zeros\nFROM HLL_REGISTERS\nGROUP BY stream_id;",
        "expectedSolutionSql": "SELECT \n    stream_id,\n    COUNT(*) AS total_buckets,\n    ROUND(AVG(leading_zeros), 2) AS avg_leading_zeros,\n    MAX(leading_zeros) AS max_leading_zeros\nFROM HLL_REGISTERS\nGROUP BY stream_id;",
        "expectedRowCount": 1,
        "svgDiagramKey": "vol2_12_svg",
        "deepTheory": [
          {
            "title": "HyperLogLog Physics",
            "body": "HyperLogLog estimates distinct counts of billions of items in a fixed 1.5KB buffer with ~1.04/sqrt(m) standard error, observing the maximum number of leading zeros in hashed bit patterns across m buckets and combining them via Harmonic Mean."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why does HyperLogLog use the Harmonic Mean rather than the Arithmetic or Geometric Mean to combine register estimates?",
          "hardwareInvariants": "Fixed memory footprint (12KB for 2^14 registers), SIMD bit-twiddling (clz instructions).",
          "interviewerIntent": "Evaluate knowledge of probabilistic data structures and statistical robustness against outliers.",
          "spokenAnswer": "The Arithmetic and Geometric means are excessively sensitive to statistical outliers. In a random hash stream, a single hash value with an unusually high sequence of 25 leading zeros would drastically inflate the entire cardinality estimate if averaged arithmetically. The Harmonic Mean severely penalizes large outlier values and is dominated by the typical values, providing robust, low-variance cardinality estimates across billions of distinct items.",
          "powerKeywords": "HyperLogLog, Harmonic Mean, Outlier Resistance, Leading Zeros (clz), Fixed 1.5KB Footprint"
        },
        "seedRows": [
          {
            "bucket_index": 0,
            "leading_zeros": 8,
            "stream_id": "visitor_stream"
          },
          {
            "bucket_index": 1,
            "leading_zeros": 9,
            "stream_id": "visitor_stream"
          },
          {
            "bucket_index": 2,
            "leading_zeros": 7,
            "stream_id": "visitor_stream"
          },
          {
            "bucket_index": 3,
            "leading_zeros": 11,
            "stream_id": "visitor_stream"
          },
          {
            "bucket_index": 4,
            "leading_zeros": 8,
            "stream_id": "visitor_stream"
          },
          {
            "bucket_index": 5,
            "leading_zeros": 10,
            "stream_id": "visitor_stream"
          },
          {
            "bucket_index": 6,
            "leading_zeros": 7,
            "stream_id": "visitor_stream"
          },
          {
            "bucket_index": 7,
            "leading_zeros": 9,
            "stream_id": "visitor_stream"
          }
        ],
        "extraTables": {}
      }
    ]
  },
  {
    "volumeId": "vol_3_concurrency",
    "volumeSeq": "03",
    "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
    "volumeShortName": "Vol 3: Concurrency & MVCC",
    "badge": "12 Deep-Dive Problems",
    "description": "Master MVCC snapshot visibility read horizons, VACUUM XID wraparound protection, Strict 2PL wait-for graph deadlocks, SSI write-skew, Next-Key locks, 2PC recovery, Raft quorums, and transactional outboxes.",
    "problems": [
      {
        "id": "vol3_01_mvcc_snapshot_visibility",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "01",
        "topicSeq": "V3-01",
        "title": "MVCC Snapshot Isolation Read-View Tuple Visibility Invariants",
        "domain": "Database Concurrency Control",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "MVCC_ACCOUNT_TUPLES",
        "columns": [
          {
            "name": "tuple_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "account_num",
            "type": "TEXT"
          },
          {
            "name": "balance",
            "type": "NUMERIC"
          },
          {
            "name": "xmin",
            "type": "INTEGER"
          },
          {
            "name": "xmax",
            "type": "INTEGER"
          },
          {
            "name": "rollback_ptr",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE MVCC_ACCOUNT_TUPLES (\n                    tuple_id INTEGER PRIMARY KEY,\n                    account_num TEXT,\n                    balance NUMERIC,\n                    xmin INTEGER,\n                    xmax INTEGER,\n                    rollback_ptr INTEGER\n                );\n                INSERT INTO MVCC_ACCOUNT_TUPLES VALUES\n                (1, 'ACC_101', 500.00, 95, 102, NULL),\n                (2, 'ACC_101', 750.00, 102, NULL, 1),\n                (3, 'ACC_102', 1200.00, 98, NULL, NULL),\n                (4, 'ACC_103', 300.00, 107, NULL, NULL),\n                (5, 'ACC_104', 900.00, 99, 106, NULL),\n                (6, 'ACC_104', 1100.00, 106, NULL, 5);\n            ",
        "spec": "Given an active transaction reading with Snapshot: xmin=100, xmax=110, active_xids=[102, 107]. A tuple is visible if: (1) xmin < 100 OR (xmin >= 100 AND xmin < 110 AND xmin NOT IN (102, 107)), AND (2) xmax IS NULL OR xmax >= 110 OR xmax IN (102, 107). Query all visible tuples for this snapshot.",
        "starterSql": "-- Query tuples visible to Snapshot(xmin=100, xmax=110, active=[102, 107])\nSELECT \n    tuple_id,\n    account_num,\n    balance,\n    xmin,\n    xmax\nFROM MVCC_ACCOUNT_TUPLES\nWHERE (xmin < 100 OR (xmin >= 100 AND xmin < 110 AND xmin NOT IN (102, 107)))\n  AND (xmax IS NULL OR xmax >= 110 OR xmax IN (102, 107))\nORDER BY account_num ASC;",
        "expectedSolutionSql": "SELECT \n    tuple_id,\n    account_num,\n    balance,\n    xmin,\n    xmax\nFROM MVCC_ACCOUNT_TUPLES\nWHERE (xmin < 100 OR (xmin >= 100 AND xmin < 110 AND xmin NOT IN (102, 107)))\n  AND (xmax IS NULL OR xmax >= 110 OR xmax IN (102, 107))\nORDER BY account_num ASC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol3_01_svg",
        "deepTheory": [
          {
            "title": "MVCC Snapshot Structure",
            "body": "A snapshot consists of: snapshot_xmin (earliest uncommitted transaction), snapshot_xmax (next unassigned transaction ID), and an active transaction array. Any tuple created by a transaction in the active array is invisible."
          },
          {
            "title": "Non-Blocking Reads",
            "body": "Readers never block writers, and writers never block readers. Instead of reading live uncommitted changes, readers traverse the undo log or heap tuple version chain to see historical committed state."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does PostgreSQL's append-only MVCC design differ from MySQL InnoDB's undo-log rollback segments?",
          "hardwareInvariants": "Write amplification, sequential WAL appending, random page updates, vacuum bloat.",
          "interviewerIntent": "Evaluate deep architectural trade-offs between append-only vs in-place-update MVCC engines.",
          "spokenAnswer": "PostgreSQL implements append-only MVCC: an UPDATE writes a completely new tuple directly into the heap page with a new xmin, setting the old tuple's xmax. This makes read queries fast (no undo reconstruction) and rollback instant, but causes table bloat requiring aggressive VACUUMing. MySQL InnoDB implements in-place update MVCC: an UPDATE overwrites the row in the clustered index leaf page and writes the previous version delta into a separate Undo Log segment. This eliminates table bloat, but long-running transactions must reconstruct historical versions by walking backward through undo pointer chains.",
          "powerKeywords": "MVCC, Snapshot Isolation, xmin/xmax, Undo Log, Append-Only vs In-Place, Table Bloat, VACUUM"
        },
        "seedRows": [
          {
            "tuple_id": 1,
            "account_num": "ACC_101",
            "balance": 500,
            "xmin": 95,
            "xmax": 102,
            "rollback_ptr": null
          },
          {
            "tuple_id": 2,
            "account_num": "ACC_101",
            "balance": 750,
            "xmin": 102,
            "xmax": null,
            "rollback_ptr": 1
          },
          {
            "tuple_id": 3,
            "account_num": "ACC_102",
            "balance": 1200,
            "xmin": 98,
            "xmax": null,
            "rollback_ptr": null
          },
          {
            "tuple_id": 4,
            "account_num": "ACC_103",
            "balance": 300,
            "xmin": 107,
            "xmax": null,
            "rollback_ptr": null
          },
          {
            "tuple_id": 5,
            "account_num": "ACC_104",
            "balance": 900,
            "xmin": 99,
            "xmax": 106,
            "rollback_ptr": null
          },
          {
            "tuple_id": 6,
            "account_num": "ACC_104",
            "balance": 1100,
            "xmin": 106,
            "xmax": null,
            "rollback_ptr": 5
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_02_vacuum_dead_tuple_bloat",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "02",
        "topicSeq": "V3-02",
        "title": "PostgreSQL VACUUM Dead Tuple Reclamation & XID Wraparound Protection",
        "domain": "Database Concurrency Control",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "HEAP_TUPLE_METRICS",
        "columns": [
          {
            "name": "table_name",
            "type": "TEXT",
            "key": "PK"
          },
          {
            "name": "total_pages",
            "type": "INTEGER"
          },
          {
            "name": "live_tuples",
            "type": "INTEGER"
          },
          {
            "name": "dead_tuples",
            "type": "INTEGER"
          },
          {
            "name": "unvacuumed_xid_age",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE HEAP_TUPLE_METRICS (\n                    table_name TEXT PRIMARY KEY,\n                    total_pages INTEGER,\n                    live_tuples INTEGER,\n                    dead_tuples INTEGER,\n                    unvacuumed_xid_age INTEGER\n                );\n                INSERT INTO HEAP_TUPLE_METRICS VALUES\n                ('orders', 150000, 1200000, 480000, 45000000),\n                ('sessions', 80000, 200000, 650000, 180000000),\n                ('lineitem', 500000, 4000000, 250000, 12000000),\n                ('audit_events', 250000, 100000, 950000, 210000000),\n                ('customers', 20000, 150000, 12000, 8000000);\n            ",
        "spec": "Identify critical tables where dead tuple bloat exceeds 50% of total tuples OR transaction age exceeds 150 million (nearing the 2-billion transaction ID wraparound shutdown threshold), ordering by unvacuumed_xid_age DESC.",
        "starterSql": "-- Find bloated tables requiring urgent emergency autovacuum freeze\nSELECT \n    table_name,\n    live_tuples,\n    dead_tuples,\n    ROUND((dead_tuples * 100.0) / (live_tuples + dead_tuples), 1) AS dead_tuple_pct,\n    unvacuumed_xid_age\nFROM HEAP_TUPLE_METRICS\nWHERE /* TODO: Filter dead_tuple_pct > 50 OR unvacuumed_xid_age > 150000000 */\nORDER BY unvacuumed_xid_age DESC;",
        "expectedSolutionSql": "SELECT \n    table_name,\n    live_tuples,\n    dead_tuples,\n    ROUND((dead_tuples * 100.0) / (live_tuples + dead_tuples), 1) AS dead_tuple_pct,\n    unvacuumed_xid_age\nFROM HEAP_TUPLE_METRICS\nWHERE (dead_tuples * 1.0 / (live_tuples + dead_tuples)) > 0.50\n   OR unvacuumed_xid_age > 150000000\nORDER BY unvacuumed_xid_age DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol3_02_svg",
        "deepTheory": [
          {
            "title": "Transaction ID Wraparound",
            "body": "PostgreSQL transaction IDs (xids) are 32-bit unsigned integers modulo 2^32 (~4 billion). At any time, past transactions exist within a 2-billion window. If unvacuumed age reaches 2 billion, the database shuts down in read-only panic mode to prevent past data from suddenly appearing in the future."
          },
          {
            "title": "VACUUM FREEZE",
            "body": "Freezing replaces old xmins with a special FrozenTransactionId (2), marking the tuple permanently older than all current and future transactions."
          }
        ],
        "staffInterviewDefense": {
          "question": "What happens if autovacuum falls behind on a high-write PostgreSQL cluster, and how does VACUUM FREEZE prevent catastrophic downtime?",
          "hardwareInvariants": "Disk I/O saturation from autovacuum cost limit, table bloat memory penalties.",
          "interviewerIntent": "Evaluate production disaster management and deep knowledge of PostgreSQL transaction semantics.",
          "spokenAnswer": "If autovacuum falls behind, two disasters occur: (1) dead tuples bloat heap pages and indexes, destroying cache hit ratios and multiplying I/O latency; (2) transaction ID wraparound approaches. Because 32-bit XIDs wrap around at 4.2 billion, PostgreSQL uses modular comparison. If a table reaches an age of 2 billion transactions without freezing, the engine enters emergency read-only panic mode and shuts down down completely. 'VACUUM FREEZE' converts ancient XIDs to FrozenXID, permanently resetting their age and preventing outage.",
          "powerKeywords": "Transaction ID Wraparound, VACUUM FREEZE, Dead Tuple Bloat, FrozenTransactionId, autovacuum_cost_limit"
        },
        "seedRows": [
          {
            "table_name": "orders",
            "total_pages": 150000,
            "live_tuples": 1200000,
            "dead_tuples": 480000,
            "unvacuumed_xid_age": 45000000
          },
          {
            "table_name": "sessions",
            "total_pages": 80000,
            "live_tuples": 200000,
            "dead_tuples": 650000,
            "unvacuumed_xid_age": 180000000
          },
          {
            "table_name": "lineitem",
            "total_pages": 500000,
            "live_tuples": 4000000,
            "dead_tuples": 250000,
            "unvacuumed_xid_age": 12000000
          },
          {
            "table_name": "audit_events",
            "total_pages": 250000,
            "live_tuples": 100000,
            "dead_tuples": 950000,
            "unvacuumed_xid_age": 210000000
          },
          {
            "table_name": "customers",
            "total_pages": 20000,
            "live_tuples": 150000,
            "dead_tuples": 12000,
            "unvacuumed_xid_age": 8000000
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_03_s2pl_deadlock_cycle",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "03",
        "topicSeq": "V3-03",
        "title": "Strict 2-Phase Locking (S2PL) & Wait-For Graph Deadlock Cycles",
        "domain": "Database Concurrency Control",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "LOCK_WAIT_EDGES",
        "columns": [
          {
            "name": "waiting_tx_id",
            "type": "INTEGER"
          },
          {
            "name": "holding_tx_id",
            "type": "INTEGER"
          },
          {
            "name": "resource_id",
            "type": "TEXT"
          },
          {
            "name": "lock_mode",
            "type": "TEXT"
          },
          {
            "name": "wait_duration_ms",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE LOCK_WAIT_EDGES (\n                    waiting_tx_id INTEGER,\n                    holding_tx_id INTEGER,\n                    resource_id TEXT,\n                    lock_mode TEXT,\n                    wait_duration_ms INTEGER,\n                    PRIMARY KEY (waiting_tx_id, holding_tx_id, resource_id)\n                );\n                INSERT INTO LOCK_WAIT_EDGES VALUES\n                (101, 102, 'PAGE_44', 'EXCLUSIVE', 1450),\n                (102, 103, 'ROW_88', 'EXCLUSIVE', 1200),\n                (103, 101, 'PAGE_12', 'EXCLUSIVE', 950),\n                (104, 105, 'ROW_99', 'SHARED', 250),\n                (105, 106, 'ROW_100', 'SHARED', 180);\n            ",
        "spec": "Detect 3-node circular deadlock cycles (Tx A waits for Tx B, Tx B waits for Tx C, Tx C waits for Tx A) in the Wait-For Graph (WFG) to select the victim transaction with minimum wait duration to abort.",
        "starterSql": "-- Detect 3-way circular deadlocks in the lock wait graph\nSELECT \n    e1.waiting_tx_id AS tx_a,\n    e2.waiting_tx_id AS tx_b,\n    e3.waiting_tx_id AS tx_c,\n    e1.resource_id AS res_a,\n    e2.resource_id AS res_b,\n    e3.resource_id AS res_c\nFROM LOCK_WAIT_EDGES e1\nJOIN LOCK_WAIT_EDGES e2 ON e1.holding_tx_id = e2.waiting_tx_id\nJOIN LOCK_WAIT_EDGES e3 ON e2.holding_tx_id = e3.waiting_tx_id\nWHERE e3.holding_tx_id = e1.waiting_tx_id;",
        "expectedSolutionSql": "SELECT \n    e1.waiting_tx_id AS tx_a,\n    e2.waiting_tx_id AS tx_b,\n    e3.waiting_tx_id AS tx_c,\n    e1.resource_id AS res_a,\n    e2.resource_id AS res_b,\n    e3.resource_id AS res_c\nFROM LOCK_WAIT_EDGES e1\nJOIN LOCK_WAIT_EDGES e2 ON e1.holding_tx_id = e2.waiting_tx_id\nJOIN LOCK_WAIT_EDGES e3 ON e2.holding_tx_id = e3.waiting_tx_id\nWHERE e3.holding_tx_id = e1.waiting_tx_id;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol3_03_svg",
        "deepTheory": [
          {
            "title": "Strict 2PL Invariant",
            "body": "Strict Two-Phase Locking requires that all shared and exclusive locks acquired during transaction execution must be held until the transaction explicitly commits or aborts, guaranteeing serializability and preventing cascading aborts."
          },
          {
            "title": "Deadlock Detection vs Prevention",
            "body": "Engines either use timeouts/wait-die/wound-wait schemes (prevention) or run background cycle-finding algorithms (Tarjan's or DFS) on the Wait-For Graph every N milliseconds (detection)."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does Strict Two-Phase Locking (S2PL) guarantee serializability, and how does the engine choose a deadlock victim?",
          "hardwareInvariants": "Lock table hash bucket latches, thread context switching, transaction abort and rollback cost.",
          "interviewerIntent": "Evaluate mastery of concurrency control serializability proofs and practical deadlock resolution heuristics.",
          "spokenAnswer": "S2PL enforces two rules: (1) Growing Phase: locks may be acquired but never released; (2) Shrinking Phase: all locks are held until transaction commit or abort. This guarantees conflict serializability because the serialization order matches commit order, and eliminates cascading aborts because uncommitted dirty writes are never readable by others. When a circular cycle is detected in the Wait-For Graph, the engine picks a victim based on lowest abort cost—typically the transaction that has modified the fewest rows or generated the least WAL bytes.",
          "powerKeywords": "Strict 2PL, Conflict Serializability, Wait-For Graph (WFG), Cascading Abort Prevention, Deadlock Victim"
        },
        "seedRows": [
          {
            "waiting_tx_id": 101,
            "holding_tx_id": 102,
            "resource_id": "PAGE_44",
            "lock_mode": "EXCLUSIVE",
            "wait_duration_ms": 1450
          },
          {
            "waiting_tx_id": 102,
            "holding_tx_id": 103,
            "resource_id": "ROW_88",
            "lock_mode": "EXCLUSIVE",
            "wait_duration_ms": 1200
          },
          {
            "waiting_tx_id": 103,
            "holding_tx_id": 101,
            "resource_id": "PAGE_12",
            "lock_mode": "EXCLUSIVE",
            "wait_duration_ms": 950
          },
          {
            "waiting_tx_id": 104,
            "holding_tx_id": 105,
            "resource_id": "ROW_99",
            "lock_mode": "SHARED",
            "wait_duration_ms": 250
          },
          {
            "waiting_tx_id": 105,
            "holding_tx_id": 106,
            "resource_id": "ROW_100",
            "lock_mode": "SHARED",
            "wait_duration_ms": 180
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_04_write_skew_anomaly",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "04",
        "topicSeq": "V3-04",
        "title": "Write-Skew Anomaly Under Snapshot Isolation (The On-Call Doctor)",
        "domain": "Database Concurrency Control",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "ON_CALL_ROSTER",
        "columns": [
          {
            "name": "doctor_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "doctor_name",
            "type": "TEXT"
          },
          {
            "name": "is_on_call",
            "type": "INTEGER"
          },
          {
            "name": "shift_date",
            "type": "TEXT"
          }
        ],
        "seedSql": "\n                CREATE TABLE ON_CALL_ROSTER (\n                    doctor_id INTEGER PRIMARY KEY,\n                    doctor_name TEXT,\n                    is_on_call INTEGER,\n                    shift_date TEXT\n                );\n                INSERT INTO ON_CALL_ROSTER VALUES\n                (1, 'Dr. Alice', 1, '2026-11-05'),\n                (2, 'Dr. Bob', 1, '2026-11-05'),\n                (3, 'Dr. Charlie', 0, '2026-11-05');\n            ",
        "spec": "Hospital policy invariant: at least 1 doctor must be on call per shift. Formulate the verification query that checks whether updating a specific doctor off-call leaves total on-call doctors >= 1. Under Snapshot Isolation without SIREAD locks, concurrent execution causes both doctors to go off-call, violating the invariant.",
        "starterSql": "-- Verify on-call doctor count constraint\nSELECT \n    shift_date,\n    SUM(is_on_call) AS active_on_call_count,\n    CASE WHEN SUM(is_on_call) >= 2 THEN 'SAFE_TO_LEAVE' ELSE 'VIOLATION_RISK' END AS status\nFROM ON_CALL_ROSTER\nWHERE shift_date = '2026-11-05'\nGROUP BY shift_date;",
        "expectedSolutionSql": "SELECT \n    shift_date,\n    SUM(is_on_call) AS active_on_call_count,\n    CASE WHEN SUM(is_on_call) >= 2 THEN 'SAFE_TO_LEAVE' ELSE 'VIOLATION_RISK' END AS status\nFROM ON_CALL_ROSTER\nWHERE shift_date = '2026-11-05'\nGROUP BY shift_date;",
        "expectedRowCount": 1,
        "svgDiagramKey": "vol3_04_svg",
        "deepTheory": [
          {
            "title": "The Write Skew Definition",
            "body": "Write skew occurs under Snapshot Isolation when two concurrent transactions read disjoint but overlapping data sets, satisfy an invariant based on that read, and write to different records, violating the global invariant upon commit."
          },
          {
            "title": "SSI (Serializable Snapshot Isolation)",
            "body": "SSI tracks 'rw-antidependencies' (SIREAD locks) in memory. If two consecutive rw-antidependencies form a cycle in the Serialization Graph, one transaction is aborted with a 40001 serialization failure."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is Write Skew, why does standard Snapshot Isolation allow it, and how does PostgreSQL Serializable Snapshot Isolation (SSI) prevent it without row-level locks?",
          "hardwareInvariants": "Lock table memory overhead vs predicate lock tracking, CPU cycle checking in lock manager.",
          "interviewerIntent": "Evaluate mastery of ANSI SQL isolation levels, snapshot anomalies, and Cahill's SSI algorithm.",
          "spokenAnswer": "Snapshot Isolation prevents dirty reads, non-repeatable reads, and lost updates because each transaction sees a private consistent snapshot and uses first-committer-wins on conflicting writes. However, Write Skew occurs when two transactions read the same data (e.g. 2 doctors on call), both verify that count >= 2, and then mutate different rows (Alice sets is_on_call=0, Bob sets is_on_call=0). Neither wrote to the other's row, so both commit, leaving 0 doctors on call. PostgreSQL SSI tracks read dependencies via lightweight in-memory SIREAD flags; if it detects dangerous rw-antidependency cycles, it aborts one transaction with error 40001.",
          "powerKeywords": "Write Skew, Snapshot Isolation, SSI (Serializable Snapshot Isolation), SIREAD Locks, rw-Antidependency"
        },
        "seedRows": [
          {
            "doctor_id": 1,
            "doctor_name": "Dr. Alice",
            "is_on_call": 1,
            "shift_date": "2026-11-05"
          },
          {
            "doctor_id": 2,
            "doctor_name": "Dr. Bob",
            "is_on_call": 1,
            "shift_date": "2026-11-05"
          },
          {
            "doctor_id": 3,
            "doctor_name": "Dr. Charlie",
            "is_on_call": 0,
            "shift_date": "2026-11-05"
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_05_gap_locks_phantom_reads",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "05",
        "topicSeq": "V3-05",
        "title": "Gap Locks & Next-Key Locks Phantom Row Insertion Elimination",
        "domain": "Database Concurrency Control",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "RECORD_GAP_LOCKS",
        "columns": [
          {
            "name": "index_key",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "left_gap_locked",
            "type": "INTEGER"
          },
          {
            "name": "record_locked",
            "type": "INTEGER"
          },
          {
            "name": "holding_tx_id",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE RECORD_GAP_LOCKS (\n                    index_key INTEGER PRIMARY KEY,\n                    left_gap_locked INTEGER,\n                    record_locked INTEGER,\n                    holding_tx_id INTEGER\n                );\n                INSERT INTO RECORD_GAP_LOCKS VALUES\n                (10, 0, 0, NULL),\n                (20, 1, 1, 501),\n                (30, 1, 1, 501),\n                (50, 1, 1, 501),\n                (70, 0, 0, NULL);\n            ",
        "spec": "In InnoDB Repeatable Read, a range scan `SELECT * ... WHERE id BETWEEN 20 AND 50 FOR UPDATE` acquires Next-Key Locks on records 20, 30, and 50, locking the records and the gaps preceding them. Query all locked index keys and verify which gaps are protected against phantom insertions.",
        "starterSql": "-- Query active Next-Key locks protecting against phantom inserts\nSELECT \n    index_key,\n    left_gap_locked,\n    record_locked,\n    holding_tx_id\nFROM RECORD_GAP_LOCKS\nWHERE left_gap_locked = 1 AND record_locked = 1\nORDER BY index_key ASC;",
        "expectedSolutionSql": "SELECT \n    index_key,\n    left_gap_locked,\n    record_locked,\n    holding_tx_id\nFROM RECORD_GAP_LOCKS\nWHERE left_gap_locked = 1 AND record_locked = 1\nORDER BY index_key ASC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol3_05_svg",
        "deepTheory": [
          {
            "title": "Phantom Read Definition",
            "body": "A phantom read occurs when transaction A executes a range query twice, and transaction B inserts a brand-new row matching the predicate in between, causing transaction A to see a 'phantom' row on re-execution."
          },
          {
            "title": "Next-Key Lock Formulation",
            "body": "Next-Key Lock = Record Lock + Gap Lock. A Next-Key Lock on index record K locks record K and the open interval (previous_key, K], blocking concurrent INSERTs into the gap."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does MySQL InnoDB prevent phantom reads at REPEATABLE READ isolation without using full table locks?",
          "hardwareInvariants": "Lock table memory overhead, B+ tree leaf navigation, insert intention locks.",
          "interviewerIntent": "Evaluate deep understanding of InnoDB locking algorithms and index gap locking.",
          "spokenAnswer": "InnoDB uses Next-Key Locking, which combines a record lock with a gap lock. When a range query executes (e.g. WHERE id BETWEEN 20 AND 50 FOR UPDATE), InnoDB locks existing index records (20, 30, 50) AND places gap locks on the intervals (10, 20], (20, 30], and (30, 50], plus the gap up to the supremum record. When another transaction tries to insert a row with id=25, it must acquire an 'Insert Intention Lock' in the gap (20, 30], which conflicts with the active gap lock, blocking the insert until transaction commit and eliminating phantoms.",
          "powerKeywords": "Phantom Read, Next-Key Lock, Gap Lock, Insert Intention Lock, Supremum Pseudo-Record, REPEATABLE READ"
        },
        "seedRows": [
          {
            "index_key": 10,
            "left_gap_locked": 0,
            "record_locked": 0,
            "holding_tx_id": null
          },
          {
            "index_key": 20,
            "left_gap_locked": 1,
            "record_locked": 1,
            "holding_tx_id": 501
          },
          {
            "index_key": 30,
            "left_gap_locked": 1,
            "record_locked": 1,
            "holding_tx_id": 501
          },
          {
            "index_key": 50,
            "left_gap_locked": 1,
            "record_locked": 1,
            "holding_tx_id": 501
          },
          {
            "index_key": 70,
            "left_gap_locked": 0,
            "record_locked": 0,
            "holding_tx_id": null
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_06_two_phase_commit_recovery",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "06",
        "topicSeq": "V3-06",
        "title": "Two-Phase Commit (2PC) Coordinator Recovery & In-Doubt Shards",
        "domain": "Distributed Database Systems",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "TWO_PHASE_COMMIT_LOG",
        "columns": [
          {
            "name": "global_tx_id",
            "type": "TEXT"
          },
          {
            "name": "shard_id",
            "type": "INTEGER"
          },
          {
            "name": "state",
            "type": "TEXT"
          },
          {
            "name": "vote",
            "type": "TEXT"
          },
          {
            "name": "prepared_ms",
            "type": "INTEGER"
          },
          {
            "name": "PRIMARY KEY",
            "type": "(global_tx_id, shard_id)"
          }
        ],
        "seedSql": "\n                CREATE TABLE TWO_PHASE_COMMIT_LOG (\n                    global_tx_id TEXT,\n                    shard_id INTEGER,\n                    state TEXT,\n                    vote TEXT,\n                    prepared_ms INTEGER,\n                    PRIMARY KEY (global_tx_id, shard_id)\n                );\n                INSERT INTO TWO_PHASE_COMMIT_LOG VALUES\n                ('GTX_9001', 1, 'PREPARED', 'YES', 500),\n                ('GTX_9001', 2, 'PREPARED', 'YES', 510),\n                ('GTX_9001', 3, 'PREPARED', 'YES', 520),\n                ('GTX_9002', 1, 'PREPARED', 'YES', 700),\n                ('GTX_9002', 2, 'ABORTED', 'NO', 710),\n                ('GTX_9003', 1, 'COMMITTED', 'YES', 400),\n                ('GTX_9003', 2, 'COMMITTED', 'YES', 410);\n            ",
        "spec": "Find all global transactions stuck in 'PREPARED' state across all shards with unanimous 'YES' votes where the coordinator crashed before issuing the global COMMIT record.",
        "starterSql": "-- Identify unanimous PREPARED distributed transactions ready for recovery commit\nSELECT \n    global_tx_id,\n    COUNT(*) AS total_shards,\n    SUM(CASE WHEN state = 'PREPARED' AND vote = 'YES' THEN 1 ELSE 0 END) AS prepared_yes_count\nFROM TWO_PHASE_COMMIT_LOG\nGROUP BY global_tx_id\nHAVING /* TODO: All shards prepared yes */\nORDER BY global_tx_id;",
        "expectedSolutionSql": "SELECT \n    global_tx_id,\n    COUNT(*) AS total_shards,\n    SUM(CASE WHEN state = 'PREPARED' AND vote = 'YES' THEN 1 ELSE 0 END) AS prepared_yes_count\nFROM TWO_PHASE_COMMIT_LOG\nGROUP BY global_tx_id\nHAVING COUNT(*) = SUM(CASE WHEN state = 'PREPARED' AND vote = 'YES' THEN 1 ELSE 0 END)\nORDER BY global_tx_id;",
        "expectedRowCount": 1,
        "svgDiagramKey": "vol3_06_svg",
        "deepTheory": [
          {
            "title": "2PC Protocol Phases",
            "body": "Phase 1 (Prepare): Coordinator requests all participants to prepare and vote YES/NO. A YES vote guarantees the participant has written all changes and locks to durable WAL. Phase 2 (Commit/Abort): Coordinator records decision in durable WAL and notifies participants."
          },
          {
            "title": "The Blocking Problem",
            "body": "If the coordinator crashes after participants vote YES but before sending the Commit message, participants are blocked in an 'in-doubt' state, unable to release locks or abort unilaterally."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why is Two-Phase Commit (2PC) considered a blocking protocol, and how do modern distributed engines like Google Spanner and CockroachDB avoid this limitation?",
          "hardwareInvariants": "Network round-trip latency (RTT), cross-datacenter fsync barriers, consensus state machines.",
          "interviewerIntent": "Evaluate deep grasp of distributed transaction atomicity vs consensus algorithms (Paxos/Raft).",
          "spokenAnswer": "Standard 2PC is blocking because if the single coordinator node crashes after participants vote PREPARE, participants must hold row locks indefinitely because they cannot know whether the coordinator decided to commit or abort without violating atomicity. Modern distributed engines (Spanner, CockroachDB) replace the single coordinator with a Paxos or Raft replicated state machine. Because the transaction coordinator itself is a distributed quorum with automatic leader failover, coordinator failure never blocks transaction progress.",
          "powerKeywords": "Two-Phase Commit (2PC), Blocking Protocol, In-Doubt Transaction, Paxos / Raft Quorum, Spanner Architecture"
        },
        "seedRows": [
          {
            "global_tx_id": "GTX_9001",
            "shard_id": 1,
            "state": "PREPARED",
            "vote": "YES",
            "prepared_ms": 500
          },
          {
            "global_tx_id": "GTX_9001",
            "shard_id": 2,
            "state": "PREPARED",
            "vote": "YES",
            "prepared_ms": 510
          },
          {
            "global_tx_id": "GTX_9001",
            "shard_id": 3,
            "state": "PREPARED",
            "vote": "YES",
            "prepared_ms": 520
          },
          {
            "global_tx_id": "GTX_9002",
            "shard_id": 1,
            "state": "PREPARED",
            "vote": "YES",
            "prepared_ms": 700
          },
          {
            "global_tx_id": "GTX_9002",
            "shard_id": 2,
            "state": "ABORTED",
            "vote": "NO",
            "prepared_ms": 710
          },
          {
            "global_tx_id": "GTX_9003",
            "shard_id": 1,
            "state": "COMMITTED",
            "vote": "YES",
            "prepared_ms": 400
          },
          {
            "global_tx_id": "GTX_9003",
            "shard_id": 2,
            "state": "COMMITTED",
            "vote": "YES",
            "prepared_ms": 410
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_07_raft_consensus_split_brain",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "07",
        "topicSeq": "V3-07",
        "title": "Raft Consensus Term Invariants & Majority Quorum Verification",
        "domain": "Distributed Systems",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "RAFT_NODE_STATE",
        "columns": [
          {
            "name": "node_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "current_term",
            "type": "INTEGER"
          },
          {
            "name": "voted_for",
            "type": "INTEGER"
          },
          {
            "name": "commit_index",
            "type": "INTEGER"
          },
          {
            "name": "last_applied",
            "type": "INTEGER"
          },
          {
            "name": "match_index",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE RAFT_NODE_STATE (\n                    node_id INTEGER PRIMARY KEY,\n                    current_term INTEGER,\n                    voted_for INTEGER,\n                    commit_index INTEGER,\n                    last_applied INTEGER,\n                    match_index INTEGER\n                );\n                INSERT INTO RAFT_NODE_STATE VALUES\n                (1, 4, 1, 150, 150, 150),\n                (2, 4, 1, 150, 150, 148),\n                (3, 4, 1, 150, 150, 150),\n                (4, 3, 4, 140, 140, 140),\n                (5, 3, 4, 140, 140, 138);\n            ",
        "spec": "Group cluster nodes by current_term: calculate node count and verify whether the term holds a strict majority quorum (nodes > 5/2 = 3 nodes in a 5-node cluster), isolating the partition with the authoritative leader.",
        "starterSql": "-- Verify Raft majority quorum by term\nSELECT \n    current_term,\n    COUNT(*) AS node_count,\n    CASE WHEN COUNT(*) >= 3 THEN 'MAJORITY_QUORUM' ELSE 'ISOLATED_MINORITY' END AS partition_status,\n    MAX(commit_index) AS highest_commit_index\nFROM RAFT_NODE_STATE\nGROUP BY current_term\nORDER BY current_term DESC;",
        "expectedSolutionSql": "SELECT \n    current_term,\n    COUNT(*) AS node_count,\n    CASE WHEN COUNT(*) >= 3 THEN 'MAJORITY_QUORUM' ELSE 'ISOLATED_MINORITY' END AS partition_status,\n    MAX(commit_index) AS highest_commit_index\nFROM RAFT_NODE_STATE\nGROUP BY current_term\nORDER BY current_term DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol3_07_svg",
        "deepTheory": [
          {
            "title": "Raft Leader Election Invariant",
            "body": "Raft guarantees at most one leader per term. A candidate must receive votes from a strict majority (N/2 + 1) of cluster nodes. Because any two majorities must overlap by at least one node, split-brain leaders are mathematically impossible."
          },
          {
            "title": "Log Completeness",
            "body": "A voter rejects a candidate whose log is less up-to-date than its own, guaranteeing that the elected leader contains all committed entries from prior terms."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does Raft prevent split-brain during network partitions, and why is an odd number of nodes (3 or 5) recommended?",
          "hardwareInvariants": "Network partition boundaries, heartbeat timeout jitters, disk write barriers on state persistence.",
          "interviewerIntent": "Evaluate foundational distributed consensus theory and practical cluster sizing principles.",
          "spokenAnswer": "Raft requires a strict majority quorum: Q = floor(N/2) + 1. If a 5-node cluster partitions into a 3-node partition and a 2-node partition, the 3-node partition can still assemble 3 votes and achieve quorum to elect a leader and commit log entries. The 2-node minority can assemble at most 2 votes (< 3), preventing it from electing a leader or acknowledging client writes, completely preventing split-brain data corruption. Odd node counts (2F + 1) provide the same fault tolerance (F failures) as 2F nodes with strictly less network overhead.",
          "powerKeywords": "Raft Consensus, Split-Brain Prevention, Majority Quorum (N/2 + 1), Leader Election, Log Completeness, Asymmetric Partition"
        },
        "seedRows": [
          {
            "node_id": 1,
            "current_term": 4,
            "voted_for": 1,
            "commit_index": 150,
            "last_applied": 150,
            "match_index": 150
          },
          {
            "node_id": 2,
            "current_term": 4,
            "voted_for": 1,
            "commit_index": 150,
            "last_applied": 150,
            "match_index": 148
          },
          {
            "node_id": 3,
            "current_term": 4,
            "voted_for": 1,
            "commit_index": 150,
            "last_applied": 150,
            "match_index": 150
          },
          {
            "node_id": 4,
            "current_term": 3,
            "voted_for": 4,
            "commit_index": 140,
            "last_applied": 140,
            "match_index": 140
          },
          {
            "node_id": 5,
            "current_term": 3,
            "voted_for": 4,
            "commit_index": 140,
            "last_applied": 140,
            "match_index": 138
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_08_gsi_async_replication_lag",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "08",
        "topicSeq": "V3-08",
        "title": "Global Secondary Index (GSI) Asynchronous Replication Lag",
        "domain": "Distributed Database Systems",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "GSI_SHARD_REPLICATION",
        "columns": [
          {
            "name": "shard_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "primary_lsn",
            "type": "INTEGER"
          },
          {
            "name": "gsi_applied_lsn",
            "type": "INTEGER"
          },
          {
            "name": "replication_lag_ms",
            "type": "INTEGER"
          },
          {
            "name": "unindexed_mutations",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE GSI_SHARD_REPLICATION (\n                    shard_id INTEGER PRIMARY KEY,\n                    primary_lsn INTEGER,\n                    gsi_applied_lsn INTEGER,\n                    replication_lag_ms INTEGER,\n                    unindexed_mutations INTEGER\n                );\n                INSERT INTO GSI_SHARD_REPLICATION VALUES\n                (1, 950000, 949800, 45, 200),\n                (2, 952000, 941000, 1850, 11000),\n                (3, 948000, 947950, 15, 50),\n                (4, 960000, 945000, 2400, 15000),\n                (5, 951000, 950900, 30, 100);\n            ",
        "spec": "Identify GSI shards violating the 500ms read-after-write replication SLA (replication_lag_ms > 500), computing the LSN drift (primary_lsn - gsi_applied_lsn) and unindexed mutation count.",
        "starterSql": "-- Query GSI shards violating asynchronous replication SLA\nSELECT \n    shard_id,\n    replication_lag_ms,\n    (primary_lsn - gsi_applied_lsn) AS lsn_drift,\n    unindexed_mutations\nFROM GSI_SHARD_REPLICATION\nWHERE /* TODO: Filter replication_lag_ms > 500 */\nORDER BY replication_lag_ms DESC;",
        "expectedSolutionSql": "SELECT \n    shard_id,\n    replication_lag_ms,\n    (primary_lsn - gsi_applied_lsn) AS lsn_drift,\n    unindexed_mutations\nFROM GSI_SHARD_REPLICATION\nWHERE replication_lag_ms > 500\nORDER BY replication_lag_ms DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol3_08_svg",
        "deepTheory": [
          {
            "title": "Local vs Global Secondary Indexes",
            "body": "Local Secondary Indexes (LSIs) share the primary partition key and are updated synchronously within the partition's Raft group. Global Secondary Indexes (GSIs) partition on a different key, requiring cross-shard asynchronous replication that introduces eventual consistency lag."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why do distributed databases like DynamoDB and Cassandra update Global Secondary Indexes asynchronously rather than synchronously?",
          "hardwareInvariants": "Multi-region network latency (70-150ms cross-region RTT), distributed locking overhead.",
          "interviewerIntent": "Evaluate knowledge of distributed data modeling trade-offs between consistency and write availability.",
          "spokenAnswer": "In a distributed NoSQL or NewSQL store, primary tables and GSIs are partitioned on completely different partition keys, meaning a row and its GSI entry almost always live on completely different physical servers or geographic regions. Updating a GSI synchronously requires a distributed 2PC transaction across shards on every single write, which increases p99 write latency by an order of magnitude and degrades cluster availability. Asynchronous GSI propagation preserves high-throughput single-digit-millisecond writes at the cost of temporary eventual consistency lag on secondary index reads.",
          "powerKeywords": "Global Secondary Index (GSI), Local Secondary Index (LSI), Eventual Consistency, Cross-Shard 2PC Avoidance, DynamoDB Architecture"
        },
        "seedRows": [
          {
            "shard_id": 1,
            "primary_lsn": 950000,
            "gsi_applied_lsn": 949800,
            "replication_lag_ms": 45,
            "unindexed_mutations": 200
          },
          {
            "shard_id": 2,
            "primary_lsn": 952000,
            "gsi_applied_lsn": 941000,
            "replication_lag_ms": 1850,
            "unindexed_mutations": 11000
          },
          {
            "shard_id": 3,
            "primary_lsn": 948000,
            "gsi_applied_lsn": 947950,
            "replication_lag_ms": 15,
            "unindexed_mutations": 50
          },
          {
            "shard_id": 4,
            "primary_lsn": 960000,
            "gsi_applied_lsn": 945000,
            "replication_lag_ms": 2400,
            "unindexed_mutations": 15000
          },
          {
            "shard_id": 5,
            "primary_lsn": 951000,
            "gsi_applied_lsn": 950900,
            "replication_lag_ms": 30,
            "unindexed_mutations": 100
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_09_occ_validation_aborts",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "09",
        "topicSeq": "V3-09",
        "title": "Optimistic Concurrency Control (OCC) Validation Aborts Under Contention",
        "domain": "Database Concurrency Control",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "OCC_TRANSACTION_AUDIT",
        "columns": [
          {
            "name": "tx_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "read_version",
            "type": "INTEGER"
          },
          {
            "name": "write_version",
            "type": "INTEGER"
          },
          {
            "name": "commit_attempted",
            "type": "INTEGER"
          },
          {
            "name": "was_aborted",
            "type": "INTEGER"
          },
          {
            "name": "retry_count",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE OCC_TRANSACTION_AUDIT (\n                    tx_id INTEGER PRIMARY KEY,\n                    read_version INTEGER,\n                    write_version INTEGER,\n                    commit_attempted INTEGER,\n                    was_aborted INTEGER,\n                    retry_count INTEGER\n                );\n                INSERT INTO OCC_TRANSACTION_AUDIT VALUES\n                (101, 5, 6, 1, 0, 0),\n                (102, 5, 7, 1, 1, 2),\n                (103, 6, 7, 1, 0, 0),\n                (104, 5, 8, 1, 1, 3),\n                (105, 7, 8, 1, 0, 0),\n                (106, 6, 9, 1, 1, 1);\n            ",
        "spec": "Calculate the transaction abort rate and total retries grouped by initial read_version to identify stale read snapshot epochs causing severe validation abort cascades.",
        "starterSql": "-- Measure OCC validation phase abort rates per read version\nSELECT \n    read_version,\n    COUNT(*) AS total_tx,\n    SUM(was_aborted) AS total_aborts,\n    ROUND(SUM(was_aborted) * 100.0 / COUNT(*), 1) AS abort_rate_pct,\n    SUM(retry_count) AS total_retries\nFROM OCC_TRANSACTION_AUDIT\nGROUP BY read_version\nORDER BY abort_rate_pct DESC;",
        "expectedSolutionSql": "SELECT \n    read_version,\n    COUNT(*) AS total_tx,\n    SUM(was_aborted) AS total_aborts,\n    ROUND(SUM(was_aborted) * 100.0 / COUNT(*), 1) AS abort_rate_pct,\n    SUM(retry_count) AS total_retries\nFROM OCC_TRANSACTION_AUDIT\nGROUP BY read_version\nORDER BY abort_rate_pct DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol3_09_svg",
        "deepTheory": [
          {
            "title": "OCC Three Phases",
            "body": "1. Read Phase: Tx reads data without acquiring locks and accumulates private write set. 2. Validation Phase: Engine checks if write set conflicts with any transaction committed since read_version. 3. Write Phase: If validation passes, changes are flushed to WAL and committed; otherwise aborted."
          }
        ],
        "staffInterviewDefense": {
          "question": "When does Optimistic Concurrency Control (OCC) outperform Pessimistic Two-Phase Locking, and when does it collapse?",
          "hardwareInvariants": "Lock table cache-line bouncing vs CPU wasted work on repeated abort retries.",
          "interviewerIntent": "Evaluate understanding of concurrency control trade-offs under varying contention workloads.",
          "spokenAnswer": "OCC outperforms Pessimistic Locking in read-heavy, low-contention workloads because transactions acquire zero locks during execution, completely eliminating lock manager latch contention, lock table memory allocations, and deadlocks. However, OCC collapses catastrophically under high contention (e.g. ticket sales or flash auctions) because multiple transactions validate against the same hot records simultaneously. One succeeds while dozens fail validation, wasting immense CPU cycles on aborts, rollbacks, and repeated retries (the 'convoy phenomenon').",
          "powerKeywords": "Optimistic Concurrency Control (OCC), Pessimistic 2PL, Validation Phase, Convoy Phenomenon, High Contention Degradation"
        },
        "seedRows": [
          {
            "tx_id": 101,
            "read_version": 5,
            "write_version": 6,
            "commit_attempted": 1,
            "was_aborted": 0,
            "retry_count": 0
          },
          {
            "tx_id": 102,
            "read_version": 5,
            "write_version": 7,
            "commit_attempted": 1,
            "was_aborted": 1,
            "retry_count": 2
          },
          {
            "tx_id": 103,
            "read_version": 6,
            "write_version": 7,
            "commit_attempted": 1,
            "was_aborted": 0,
            "retry_count": 0
          },
          {
            "tx_id": 104,
            "read_version": 5,
            "write_version": 8,
            "commit_attempted": 1,
            "was_aborted": 1,
            "retry_count": 3
          },
          {
            "tx_id": 105,
            "read_version": 7,
            "write_version": 8,
            "commit_attempted": 1,
            "was_aborted": 0,
            "retry_count": 0
          },
          {
            "tx_id": 106,
            "read_version": 6,
            "write_version": 9,
            "commit_attempted": 1,
            "was_aborted": 1,
            "retry_count": 1
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_10_vector_clock_causality",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "10",
        "topicSeq": "V3-10",
        "title": "Vector Clock Causal Ordering & Concurrent Conflict Detection",
        "domain": "Distributed Systems",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "VECTOR_CLOCK_EVENTS",
        "columns": [
          {
            "name": "event_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "node_a_clock",
            "type": "INTEGER"
          },
          {
            "name": "node_b_clock",
            "type": "INTEGER"
          },
          {
            "name": "node_c_clock",
            "type": "INTEGER"
          },
          {
            "name": "payload_hash",
            "type": "TEXT"
          }
        ],
        "seedSql": "\n                CREATE TABLE VECTOR_CLOCK_EVENTS (\n                    event_id INTEGER PRIMARY KEY,\n                    node_a_clock INTEGER,\n                    node_b_clock INTEGER,\n                    node_c_clock INTEGER,\n                    payload_hash TEXT\n                );\n                INSERT INTO VECTOR_CLOCK_EVENTS VALUES\n                (1, 1, 0, 0, '0xA1'),\n                (2, 2, 0, 0, '0xA2'),\n                (3, 2, 1, 0, '0xB1'),\n                (4, 2, 0, 1, '0xC1'),\n                (5, 3, 1, 1, '0xD1');\n            ",
        "spec": "In vector clocks: Event X happened-before Event Y if all vector components of X <= Y and at least one is <. Events are concurrent (conflict) if neither happened-before the other. Identify concurrent pairs comparing Event 3 ([2,1,0]) vs Event 4 ([2,0,1]).",
        "starterSql": "-- Detect concurrent vector clock events that require CRDT resolution\nSELECT \n    e1.event_id AS event_1,\n    e2.event_id AS event_2,\n    e1.node_b_clock AS e1_b,\n    e2.node_b_clock AS e2_b,\n    e1.node_c_clock AS e1_c,\n    e2.node_c_clock AS e2_c\nFROM VECTOR_CLOCK_EVENTS e1\nJOIN VECTOR_CLOCK_EVENTS e2 ON e1.event_id < e2.event_id\nWHERE e1.event_id = 3 AND e2.event_id = 4;",
        "expectedSolutionSql": "SELECT \n    e1.event_id AS event_1,\n    e2.event_id AS event_2,\n    e1.node_b_clock AS e1_b,\n    e2.node_b_clock AS e2_b,\n    e1.node_c_clock AS e1_c,\n    e2.node_c_clock AS e2_c\nFROM VECTOR_CLOCK_EVENTS e1\nJOIN VECTOR_CLOCK_EVENTS e2 ON e1.event_id < e2.event_id\nWHERE e1.event_id = 3 AND e2.event_id = 4;",
        "expectedRowCount": 1,
        "svgDiagramKey": "vol3_10_svg",
        "deepTheory": [
          {
            "title": "Causal Consistency vs Linearizability",
            "body": "Lamport logical clocks provide a total ordering but cannot distinguish between causally ordered events and concurrent events. Vector clocks capture the complete causal history, enabling systems to detect true concurrency and trigger Conflict-Free Replicated Data Types (CRDTs)."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is the mathematical definition of causal ordering in Vector Clocks, and how do systems resolve concurrent conflicting writes?",
          "hardwareInvariants": "Clock drift on physical NTP crystal oscillators, vector clock message metadata bloat.",
          "interviewerIntent": "Evaluate deep grasp of distributed time, Lamport vs Vector clocks, and conflict resolution mechanisms.",
          "spokenAnswer": "In a cluster of N nodes, each vector clock V has length N. Event A causally happened-before Event B (A -> B) if and only if for all i, V_A[i] <= V_B[i] and there exists at least one j where V_A[j] < V_B[j]. If neither A -> B nor B -> A holds, the events are strictly concurrent (A || B). Systems resolve concurrent updates either through Last-Write-Wins (LWW) using physical timestamps (which loses updates due to NTP drift), multi-valued register read repair, or state-based/operation-based CRDTs (e.g. PN-Counters, Observed-Removed Sets) guaranteeing convergent eventual consistency.",
          "powerKeywords": "Vector Clock, Causal Ordering, Happened-Before Relation, Concurrent Conflicts, CRDT, Last-Write-Wins"
        },
        "seedRows": [
          {
            "event_id": 1,
            "node_a_clock": 1,
            "node_b_clock": 0,
            "node_c_clock": 0,
            "payload_hash": "0xA1"
          },
          {
            "event_id": 2,
            "node_a_clock": 2,
            "node_b_clock": 0,
            "node_c_clock": 0,
            "payload_hash": "0xA2"
          },
          {
            "event_id": 3,
            "node_a_clock": 2,
            "node_b_clock": 1,
            "node_c_clock": 0,
            "payload_hash": "0xB1"
          },
          {
            "event_id": 4,
            "node_a_clock": 2,
            "node_b_clock": 0,
            "node_c_clock": 1,
            "payload_hash": "0xC1"
          },
          {
            "event_id": 5,
            "node_a_clock": 3,
            "node_b_clock": 1,
            "node_c_clock": 1,
            "payload_hash": "0xD1"
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_11_distributed_deadlock_mesh",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "11",
        "topicSeq": "V3-11",
        "title": "Distributed Deadlock Across Cross-Shard Partition Partitions",
        "domain": "Distributed Systems",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "DISTRIBUTED_LOCK_REGISTRY",
        "columns": [
          {
            "name": "tx_id",
            "type": "INTEGER"
          },
          {
            "name": "shard_id",
            "type": "INTEGER"
          },
          {
            "name": "local_lock_id",
            "type": "TEXT"
          },
          {
            "name": "remote_tx_id",
            "type": "INTEGER"
          },
          {
            "name": "remote_shard_id",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE DISTRIBUTED_LOCK_REGISTRY (\n                    tx_id INTEGER,\n                    shard_id INTEGER,\n                    local_lock_id TEXT,\n                    remote_tx_id INTEGER,\n                    remote_shard_id INTEGER,\n                    PRIMARY KEY (tx_id, shard_id)\n                );\n                INSERT INTO DISTRIBUTED_LOCK_REGISTRY VALUES\n                (501, 1, 'LOCK_A', 502, 2),\n                (502, 2, 'LOCK_B', 503, 3),\n                (503, 3, 'LOCK_C', 501, 1),\n                (601, 1, 'LOCK_X', 602, 2);\n            ",
        "spec": "Cross-shard transactions create distributed circular wait dependencies invisible to any single local shard lock manager. Formulate a 3-shard distributed cycle query joining across shards (Shard 1 -> Shard 2 -> Shard 3 -> Shard 1) to identify the global distributed deadlock.",
        "starterSql": "-- Detect global cross-shard distributed deadlock cycle\nSELECT \n    d1.tx_id AS tx_1,\n    d1.shard_id AS shard_1,\n    d2.tx_id AS tx_2,\n    d2.shard_id AS shard_2,\n    d3.tx_id AS tx_3,\n    d3.shard_id AS shard_3\nFROM DISTRIBUTED_LOCK_REGISTRY d1\nJOIN DISTRIBUTED_LOCK_REGISTRY d2 ON d1.remote_tx_id = d2.tx_id AND d1.remote_shard_id = d2.shard_id\nJOIN DISTRIBUTED_LOCK_REGISTRY d3 ON d2.remote_tx_id = d3.tx_id AND d2.remote_shard_id = d3.shard_id\nWHERE d3.remote_tx_id = d1.tx_id AND d3.remote_shard_id = d1.shard_id;",
        "expectedSolutionSql": "SELECT \n    d1.tx_id AS tx_1,\n    d1.shard_id AS shard_1,\n    d2.tx_id AS tx_2,\n    d2.shard_id AS shard_2,\n    d3.tx_id AS tx_3,\n    d3.shard_id AS shard_3\nFROM DISTRIBUTED_LOCK_REGISTRY d1\nJOIN DISTRIBUTED_LOCK_REGISTRY d2 ON d1.remote_tx_id = d2.tx_id AND d1.remote_shard_id = d2.shard_id\nJOIN DISTRIBUTED_LOCK_REGISTRY d3 ON d2.remote_tx_id = d3.tx_id AND d2.remote_shard_id = d3.shard_id\nWHERE d3.remote_tx_id = d1.tx_id AND d3.remote_shard_id = d1.shard_id;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol3_11_svg",
        "deepTheory": [
          {
            "title": "Edge Chasing (Chandy-Misra-Haas)",
            "body": "In distributed deadlocks, no single node possesses the full graph. The Chandy-Misra-Haas probe algorithm sends lightweight probe messages (initiator, sender, receiver) along wait edges. If a probe returns to the initiator, a distributed deadlock is proven."
          }
        ],
        "staffInterviewDefense": {
          "question": "How do distributed databases detect deadlocks that span multiple independent physical shards?",
          "hardwareInvariants": "RPC messaging overhead, phantom deadlock hazards from transient lock releases.",
          "interviewerIntent": "Evaluate knowledge of distributed graph cycle detection algorithms vs wait-die / wound-wait timeout strategies.",
          "spokenAnswer": "Local lock managers only see wait edges within their own shard; each local graph appears completely acyclic. Distributed engines employ either: (1) Centralized Deadlock Detection: shards periodically send local wait-for graphs to a global coordinator (risking phantom deadlocks due to communication delays); (2) Edge Chasing (Chandy-Misra-Haas): when a transaction waits across shards, it sends a probe tuple along outgoing lock wait edges; or (3) Deadlock Prevention: algorithms like Wound-Wait (older transactions preempt younger ones) or lock timeouts, avoiding distributed cycle detection entirely.",
          "powerKeywords": "Distributed Deadlock, Chandy-Misra-Haas, Edge Chasing, Phantom Deadlock, Wound-Wait, Wait-Die"
        },
        "seedRows": [
          {
            "tx_id": 501,
            "shard_id": 1,
            "local_lock_id": "LOCK_A",
            "remote_tx_id": 502,
            "remote_shard_id": 2
          },
          {
            "tx_id": 502,
            "shard_id": 2,
            "local_lock_id": "LOCK_B",
            "remote_tx_id": 503,
            "remote_shard_id": 3
          },
          {
            "tx_id": 503,
            "shard_id": 3,
            "local_lock_id": "LOCK_C",
            "remote_tx_id": 501,
            "remote_shard_id": 1
          },
          {
            "tx_id": 601,
            "shard_id": 1,
            "local_lock_id": "LOCK_X",
            "remote_tx_id": 602,
            "remote_shard_id": 2
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol3_12_outbox_idempotent_messaging",
        "volumeId": "vol_3_concurrency",
        "volumeName": "Volume 3: Concurrency, MVCC & Distributed Systems",
        "seq": "12",
        "topicSeq": "V3-12",
        "title": "Transactional Outbox & Exactly-Once Idempotent Consumer Deduplication",
        "domain": "Distributed Event-Driven Architecture",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "TRANSACTIONAL_OUTBOX",
        "columns": [
          {
            "name": "event_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "aggregate_id",
            "type": "TEXT"
          },
          {
            "name": "event_type",
            "type": "TEXT"
          },
          {
            "name": "payload_json",
            "type": "TEXT"
          },
          {
            "name": "published_at",
            "type": "TEXT"
          },
          {
            "name": "processed_at",
            "type": "TEXT"
          },
          {
            "name": "dedup_key",
            "type": "TEXT"
          }
        ],
        "seedSql": "\n                CREATE TABLE TRANSACTIONAL_OUTBOX (\n                    event_id INTEGER PRIMARY KEY,\n                    aggregate_id TEXT,\n                    event_type TEXT,\n                    payload_json TEXT,\n                    published_at TEXT,\n                    processed_at TEXT,\n                    dedup_key TEXT\n                );\n                INSERT INTO TRANSACTIONAL_OUTBOX VALUES\n                (1, 'ORD_101', 'ORDER_CREATED', '{\"amount\": 150}', '2026-11-05 10:00:00', '2026-11-05 10:00:02', 'DEDUP_ORD_101_CREATE'),\n                (2, 'ORD_102', 'ORDER_CREATED', '{\"amount\": 320}', '2026-11-05 10:05:00', NULL, 'DEDUP_ORD_102_CREATE'),\n                (3, 'ORD_103', 'ORDER_PAID', '{\"amount\": 450}', '2026-11-05 10:10:00', '2026-11-05 10:10:01', 'DEDUP_ORD_103_PAY'),\n                (4, 'ORD_104', 'ORDER_CREATED', '{\"amount\": 80}', '2026-11-05 10:12:00', NULL, 'DEDUP_ORD_104_CREATE'),\n                (5, 'ORD_105', 'ORDER_CANCELLED', '{\"amount\": 80}', '2026-11-05 10:15:00', NULL, 'DEDUP_ORD_105_CANCEL');\n            ",
        "spec": "Query all unpublished outbox events (processed_at IS NULL), ordered by event_id ASC, ensuring that downstream relay workers publish events strictly in transactional causal order.",
        "starterSql": "-- Query pending outbox events awaiting reliable message publishing\nSELECT \n    event_id,\n    aggregate_id,\n    event_type,\n    payload_json,\n    published_at,\n    dedup_key\nFROM TRANSACTIONAL_OUTBOX\nWHERE /* TODO: Filter processed_at IS NULL */\nORDER BY event_id ASC;",
        "expectedSolutionSql": "SELECT \n    event_id,\n    aggregate_id,\n    event_type,\n    payload_json,\n    published_at,\n    dedup_key\nFROM TRANSACTIONAL_OUTBOX\nWHERE processed_at IS NULL\nORDER BY event_id ASC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol3_12_svg",
        "deepTheory": [
          {
            "title": "The Dual-Write Problem",
            "body": "Writing to a database table and publishing to a message broker (Kafka/RabbitMQ) in the same API call cannot be atomic. If the network drops or broker is down, state drifts. The Transactional Outbox writes the message into an outbox table in the SAME local database transaction, guaranteeing 100% atomicity."
          },
          {
            "title": "Change Data Capture (CDC) Relay",
            "body": "A background CDC tool (e.g. Debezium) tails the database WAL and streams outbox rows to the message broker with zero dual-write risk."
          }
        ],
        "staffInterviewDefense": {
          "question": "How does the Transactional Outbox pattern solve the dual-write problem between databases and message brokers (e.g. Kafka)?",
          "hardwareInvariants": "Two-phase commit overhead over heterogeneous protocols, network partitioning, WAL tailing throughput.",
          "interviewerIntent": "Evaluate distributed architecture patterns for reliable cross-service communication without distributed transactions.",
          "spokenAnswer": "Attempting to write to a local database and publish to Kafka in one endpoint guarantees failure: either the database commits and Kafka fails (lost event), or Kafka publishes and the database rollback occurs (phantom event). The Transactional Outbox pattern writes the event into an 'outbox' table within the exact same local ACID transaction as the business entity. Because local ACID guarantees atomicity, the event record is created if and only if the business mutation commits. A background process (like Debezium reading the WAL) then tails the outbox table and publishes events to Kafka with at-least-once delivery, which the consumer deduplicates via unique idempotency keys.",
          "powerKeywords": "Transactional Outbox Pattern, Dual-Write Hazard, Debezium CDC, WAL Tailing, Idempotent Consumer, At-Least-Once Delivery"
        },
        "seedRows": [
          {
            "event_id": 1,
            "aggregate_id": "ORD_101",
            "event_type": "ORDER_CREATED",
            "payload_json": "{\"amount\": 150}",
            "published_at": "2026-11-05 10:00:00",
            "processed_at": "2026-11-05 10:00:02",
            "dedup_key": "DEDUP_ORD_101_CREATE"
          },
          {
            "event_id": 2,
            "aggregate_id": "ORD_102",
            "event_type": "ORDER_CREATED",
            "payload_json": "{\"amount\": 320}",
            "published_at": "2026-11-05 10:05:00",
            "processed_at": null,
            "dedup_key": "DEDUP_ORD_102_CREATE"
          },
          {
            "event_id": 3,
            "aggregate_id": "ORD_103",
            "event_type": "ORDER_PAID",
            "payload_json": "{\"amount\": 450}",
            "published_at": "2026-11-05 10:10:00",
            "processed_at": "2026-11-05 10:10:01",
            "dedup_key": "DEDUP_ORD_103_PAY"
          },
          {
            "event_id": 4,
            "aggregate_id": "ORD_104",
            "event_type": "ORDER_CREATED",
            "payload_json": "{\"amount\": 80}",
            "published_at": "2026-11-05 10:12:00",
            "processed_at": null,
            "dedup_key": "DEDUP_ORD_104_CREATE"
          },
          {
            "event_id": 5,
            "aggregate_id": "ORD_105",
            "event_type": "ORDER_CANCELLED",
            "payload_json": "{\"amount\": 80}",
            "published_at": "2026-11-05 10:15:00",
            "processed_at": null,
            "dedup_key": "DEDUP_ORD_105_CANCEL"
          }
        ],
        "extraTables": {}
      }
    ]
  },
  {
    "volumeId": "vol_4_streaming",
    "volumeSeq": "04",
    "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
    "volumeShortName": "Vol 4: Streaming Analytics",
    "badge": "12 Deep-Dive Problems",
    "description": "Master tumbling and hopping time windows, watermark late data filtering, session window inactivity gaps, LTTB downsampling, continuous materialized view maintenance, H3 geospatial hexagonal joins, and real-time financial mark-to-market PnL.",
    "problems": [
      {
        "id": "vol4_01_tumbling_hopping_windows",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "01",
        "topicSeq": "V4-01",
        "title": "Tumbling vs Hopping Time-Window Metric Aggregation",
        "domain": "Stream Processing & Time-Series",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "STREAMING_IOT_SENSORS",
        "columns": [
          {
            "name": "sensor_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "device_type",
            "type": "TEXT"
          },
          {
            "name": "reading_time_epoch",
            "type": "INTEGER"
          },
          {
            "name": "temperature_c",
            "type": "NUMERIC"
          },
          {
            "name": "voltage",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE STREAMING_IOT_SENSORS (\n                    sensor_id INTEGER PRIMARY KEY,\n                    device_type TEXT,\n                    reading_time_epoch INTEGER,\n                    temperature_c NUMERIC,\n                    voltage NUMERIC\n                );\n                INSERT INTO STREAMING_IOT_SENSORS VALUES\n                (1, 'TURBINE', 1700000000, 68.5, 230.1),\n                (2, 'TURBINE', 1700000060, 71.2, 229.8),\n                (3, 'TURBINE', 1700000120, 75.0, 228.5),\n                (4, 'TURBINE', 1700000180, 82.4, 225.0),\n                (5, 'TURBINE', 1700000240, 88.9, 221.2),\n                (6, 'PUMP', 1700000000, 45.0, 115.0),\n                (7, 'PUMP', 1700000120, 46.2, 114.8);\n            ",
        "spec": "Bucket streaming sensor readings into 120-second tumbling time windows (epoch / 120 * 120): compute reading count, average temperature, and max temperature per device_type and window.",
        "starterSql": "-- Bucket streaming metrics into 120-second tumbling windows\nSELECT \n    device_type,\n    (reading_time_epoch / 120) * 120 AS window_start_epoch,\n    COUNT(*) AS sample_count,\n    ROUND(AVG(temperature_c), 1) AS avg_temp_c,\n    ROUND(MAX(temperature_c), 1) AS max_temp_c\nFROM STREAMING_IOT_SENSORS\nGROUP BY device_type, (reading_time_epoch / 120) * 120\nORDER BY device_type, window_start_epoch;",
        "expectedSolutionSql": "SELECT \n    device_type,\n    (reading_time_epoch / 120) * 120 AS window_start_epoch,\n    COUNT(*) AS sample_count,\n    ROUND(AVG(temperature_c), 1) AS avg_temp_c,\n    ROUND(MAX(temperature_c), 1) AS max_temp_c\nFROM STREAMING_IOT_SENSORS\nGROUP BY device_type, (reading_time_epoch / 120) * 120\nORDER BY device_type, window_start_epoch;",
        "expectedRowCount": 5,
        "svgDiagramKey": "vol4_01_svg",
        "deepTheory": [
          {
            "title": "Tumbling vs Hopping Windows",
            "body": "Tumbling windows are non-overlapping fixed intervals (e.g. 0-5m, 5-10m). Hopping (sliding) windows advance by a smaller hop interval (e.g. 5-minute window advancing every 1 minute), causing events to belong to multiple concurrent windows."
          },
          {
            "title": "Watermarking Triggers",
            "body": "In streaming engines (Flink, Spark Structured Streaming), a tumbling window fires only when the event-time watermark advances past the window end timestamp."
          }
        ],
        "staffInterviewDefense": {
          "question": "How do streaming database engines handle state size growth during wide hopping windows?",
          "hardwareInvariants": "RocksDB state store serialization overhead, memory heap pressure.",
          "interviewerIntent": "Evaluate knowledge of streaming window optimization and state management.",
          "spokenAnswer": "In wide hopping windows (e.g. 1-hour window advancing every 1 second), a single event belongs to 3,600 concurrent windows. If each window maintained its own state, memory would explode 3,600x. Modern streaming engines (Flink, Kafka Streams) slice the stream into non-overlapping 'panes' of 1 second. Each event updates only a single 1-second pane. When a 1-hour window fires, the engine aggregates the pre-computed results of the 3,600 panes, reducing state storage from O(Window_Size * Event_Count) to O(Panes).",
          "powerKeywords": "Tumbling vs Hopping Windows, Stream Slicing, Panes, State Store Memory Bounding, Event Time Watermark"
        },
        "seedRows": [
          {
            "sensor_id": 1,
            "device_type": "TURBINE",
            "reading_time_epoch": 1700000000,
            "temperature_c": 68.5,
            "voltage": 230.1
          },
          {
            "sensor_id": 2,
            "device_type": "TURBINE",
            "reading_time_epoch": 1700000060,
            "temperature_c": 71.2,
            "voltage": 229.8
          },
          {
            "sensor_id": 3,
            "device_type": "TURBINE",
            "reading_time_epoch": 1700000120,
            "temperature_c": 75,
            "voltage": 228.5
          },
          {
            "sensor_id": 4,
            "device_type": "TURBINE",
            "reading_time_epoch": 1700000180,
            "temperature_c": 82.4,
            "voltage": 225
          },
          {
            "sensor_id": 5,
            "device_type": "TURBINE",
            "reading_time_epoch": 1700000240,
            "temperature_c": 88.9,
            "voltage": 221.2
          },
          {
            "sensor_id": 6,
            "device_type": "PUMP",
            "reading_time_epoch": 1700000000,
            "temperature_c": 45,
            "voltage": 115
          },
          {
            "sensor_id": 7,
            "device_type": "PUMP",
            "reading_time_epoch": 1700000120,
            "temperature_c": 46.2,
            "voltage": 114.8
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_02_watermarks_late_data",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "02",
        "topicSeq": "V4-02",
        "title": "Watermark Event-Time Propagation & Late Data Filtering",
        "domain": "Stream Processing & Time-Series",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "STREAM_EVENT_WATERMARKS",
        "columns": [
          {
            "name": "event_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "event_epoch_ms",
            "type": "INTEGER"
          },
          {
            "name": "arrival_epoch_ms",
            "type": "INTEGER"
          },
          {
            "name": "allowed_lateness_ms",
            "type": "INTEGER"
          },
          {
            "name": "watermark_cutoff_ms",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE STREAM_EVENT_WATERMARKS (\n                    event_id INTEGER PRIMARY KEY,\n                    event_epoch_ms INTEGER,\n                    arrival_epoch_ms INTEGER,\n                    allowed_lateness_ms INTEGER,\n                    watermark_cutoff_ms INTEGER\n                );\n                INSERT INTO STREAM_EVENT_WATERMARKS VALUES\n                (1, 100000, 105000, 30000, 80000),\n                (2, 95000, 110000, 30000, 80000),\n                (3, 72000, 125000, 30000, 80000),\n                (4, 88000, 108000, 30000, 80000),\n                (5, 65000, 130000, 30000, 80000);\n            ",
        "spec": "Filter streaming events arriving past the watermark cutoff (event_epoch_ms < watermark_cutoff_ms), categorizing them as 'LATE_DROPPED' or 'TIMELY_PROCESSED', and calculate the arrival latency delay (arrival_epoch_ms - event_epoch_ms).",
        "starterSql": "-- Detect late events arriving beyond watermark cutoff\nSELECT \n    event_id,\n    event_epoch_ms,\n    arrival_epoch_ms,\n    (arrival_epoch_ms - event_epoch_ms) AS arrival_delay_ms,\n    CASE WHEN event_epoch_ms < watermark_cutoff_ms THEN 'LATE_DROPPED' ELSE 'TIMELY_PROCESSED' END AS processing_verdict\nFROM STREAM_EVENT_WATERMARKS\nORDER BY event_id ASC;",
        "expectedSolutionSql": "SELECT \n    event_id,\n    event_epoch_ms,\n    arrival_epoch_ms,\n    (arrival_epoch_ms - event_epoch_ms) AS arrival_delay_ms,\n    CASE WHEN event_epoch_ms < watermark_cutoff_ms THEN 'LATE_DROPPED' ELSE 'TIMELY_PROCESSED' END AS processing_verdict\nFROM STREAM_EVENT_WATERMARKS\nORDER BY event_id ASC;",
        "expectedRowCount": 5,
        "svgDiagramKey": "vol4_02_svg",
        "deepTheory": [
          {
            "title": "The Watermark Definition",
            "body": "A watermark W(t) asserts that the stream promises no subsequent events will arrive with an event timestamp earlier than t. It allows stream processors to close windows and emit finalized results even with out-of-order delivery."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is a Watermark in stream processing, and what happens when an event arrives with an event time older than the current watermark?",
          "hardwareInvariants": "Network buffering, disk-backed dead-letter queues, checkpoint barrier alignment.",
          "interviewerIntent": "Evaluate knowledge of event time vs processing time, out-of-order arrivals, and late data handling.",
          "spokenAnswer": "A watermark is a monotonically increasing heuristic metric flowing through a data stream asserting that all events up to timestamp T have likely been observed. When an event arrives with timestamp T_event < Watermark, it is defined as 'late data'. Systems handle late data in three ways: (1) silently drop the record; (2) route it to a Dead-Letter Queue (side output) for audit; or (3) update the previously emitted window result by firing an incremental retraction if allowed lateness has not expired.",
          "powerKeywords": "Watermark, Event Time vs Processing Time, Out-of-Order Delivery, Allowed Lateness, Side Output, Retraction"
        },
        "seedRows": [
          {
            "event_id": 1,
            "event_epoch_ms": 100000,
            "arrival_epoch_ms": 105000,
            "allowed_lateness_ms": 30000,
            "watermark_cutoff_ms": 80000
          },
          {
            "event_id": 2,
            "event_epoch_ms": 95000,
            "arrival_epoch_ms": 110000,
            "allowed_lateness_ms": 30000,
            "watermark_cutoff_ms": 80000
          },
          {
            "event_id": 3,
            "event_epoch_ms": 72000,
            "arrival_epoch_ms": 125000,
            "allowed_lateness_ms": 30000,
            "watermark_cutoff_ms": 80000
          },
          {
            "event_id": 4,
            "event_epoch_ms": 88000,
            "arrival_epoch_ms": 108000,
            "allowed_lateness_ms": 30000,
            "watermark_cutoff_ms": 80000
          },
          {
            "event_id": 5,
            "event_epoch_ms": 65000,
            "arrival_epoch_ms": 130000,
            "allowed_lateness_ms": 30000,
            "watermark_cutoff_ms": 80000
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_03_sessionization_gap_threshold",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "03",
        "topicSeq": "V4-03",
        "title": "Session Window Sessionization via Inactivity Gap Thresholds",
        "domain": "Stream Processing & Analytics",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "USER_CLICKSTREAM",
        "columns": [
          {
            "name": "click_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "user_id",
            "type": "INTEGER"
          },
          {
            "name": "event_name",
            "type": "TEXT"
          },
          {
            "name": "click_time_epoch",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE USER_CLICKSTREAM (\n                    click_id INTEGER PRIMARY KEY,\n                    user_id INTEGER,\n                    event_name TEXT,\n                    click_time_epoch INTEGER\n                );\n                INSERT INTO USER_CLICKSTREAM VALUES\n                (1, 101, 'VIEW_HOME', 1000),\n                (2, 101, 'VIEW_ITEM', 1200),\n                (3, 101, 'ADD_CART', 1400),\n                (4, 101, 'VIEW_HOME', 3000),\n                (5, 101, 'CHECKOUT', 3100),\n                (6, 102, 'VIEW_HOME', 1000),\n                (7, 102, 'SEARCH', 1100);\n            ",
        "spec": "Sessionize user clickstreams using a 900-second (15-minute) inactivity gap threshold: compare each event's timestamp against the preceding event for the user using LAG(). Flag whether it starts a new session (gap > 900 seconds or first event).",
        "starterSql": "-- Sessionize clickstream using LAG() to detect inactivity gaps > 900s\nWITH session_flags AS (\n    SELECT \n        click_id,\n        user_id,\n        event_name,\n        click_time_epoch,\n        CASE \n            WHEN click_time_epoch - LAG(click_time_epoch) OVER (PARTITION BY user_id ORDER BY click_time_epoch) > 900 \n                 OR LAG(click_time_epoch) OVER (PARTITION BY user_id ORDER BY click_time_epoch) IS NULL \n            THEN 1 \n            ELSE 0 \n        END AS is_new_session\n    FROM USER_CLICKSTREAM\n)\nSELECT \n    click_id,\n    user_id,\n    event_name,\n    click_time_epoch,\n    is_new_session,\n    SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY click_time_epoch) AS session_id\nFROM session_flags\nORDER BY user_id, click_time_epoch;",
        "expectedSolutionSql": "WITH session_flags AS (\n    SELECT \n        click_id,\n        user_id,\n        event_name,\n        click_time_epoch,\n        CASE \n            WHEN click_time_epoch - LAG(click_time_epoch) OVER (PARTITION BY user_id ORDER BY click_time_epoch) > 900 \n                 OR LAG(click_time_epoch) OVER (PARTITION BY user_id ORDER BY click_time_epoch) IS NULL \n            THEN 1 \n            ELSE 0 \n        END AS is_new_session\n    FROM USER_CLICKSTREAM\n)\nSELECT \n    click_id,\n    user_id,\n    event_name,\n    click_time_epoch,\n    is_new_session,\n    SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY click_time_epoch) AS session_id\nFROM session_flags\nORDER BY user_id, click_time_epoch;",
        "expectedRowCount": 7,
        "svgDiagramKey": "vol4_03_svg",
        "deepTheory": [
          {
            "title": "Session Window Dynamics",
            "body": "Unlike tumbling or hopping windows, session windows have dynamic lengths determined by periods of user inactivity. In streaming engines, an event arriving within an inactivity gap causes two neighboring sessions to merge into one."
          }
        ],
        "staffInterviewDefense": {
          "question": "How do streaming engines implement Session Windows, and why does late data trigger window merging?",
          "hardwareInvariants": "State store key range scans, session state merge operations in RocksDB.",
          "interviewerIntent": "Evaluate knowledge of dynamic window aggregation algorithms vs static time-bucket windows.",
          "spokenAnswer": "Session windows do not have fixed start/end boundaries; they are defined by an inactivity gap (e.g. 15 minutes). When an event arrives, the engine creates a window [t, t + gap]. It then inspects existing active windows for that user in the state store. If the new window overlaps with an existing window, the engine merges the two windows into a single combined window [min(start), max(end)]. If late data arrives with a timestamp that bridges two previously separate sessions, the engine must retroactively merge both sessions and emit a retraction for the older results.",
          "powerKeywords": "Session Window, Inactivity Gap, Window Merging, State Store Compaction, Retraction Emission"
        },
        "seedRows": [
          {
            "click_id": 1,
            "user_id": 101,
            "event_name": "VIEW_HOME",
            "click_time_epoch": 1000
          },
          {
            "click_id": 2,
            "user_id": 101,
            "event_name": "VIEW_ITEM",
            "click_time_epoch": 1200
          },
          {
            "click_id": 3,
            "user_id": 101,
            "event_name": "ADD_CART",
            "click_time_epoch": 1400
          },
          {
            "click_id": 4,
            "user_id": 101,
            "event_name": "VIEW_HOME",
            "click_time_epoch": 3000
          },
          {
            "click_id": 5,
            "user_id": 101,
            "event_name": "CHECKOUT",
            "click_time_epoch": 3100
          },
          {
            "click_id": 6,
            "user_id": 102,
            "event_name": "VIEW_HOME",
            "click_time_epoch": 1000
          },
          {
            "click_id": 7,
            "user_id": 102,
            "event_name": "SEARCH",
            "click_time_epoch": 1100
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_04_lttb_downsampling",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "04",
        "topicSeq": "V4-04",
        "title": "Time-Series Downsampling & Local Visual Extrema Preservation",
        "domain": "Time-Series Analytics",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "HIGH_FREQ_TICKS",
        "columns": [
          {
            "name": "tick_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "bucket_id",
            "type": "INTEGER"
          },
          {
            "name": "quote_price",
            "type": "NUMERIC"
          },
          {
            "name": "volume",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE HIGH_FREQ_TICKS (\n                    tick_id INTEGER PRIMARY KEY,\n                    bucket_id INTEGER,\n                    quote_price NUMERIC,\n                    volume INTEGER\n                );\n                INSERT INTO HIGH_FREQ_TICKS VALUES\n                (1, 1, 100.5, 500),\n                (2, 1, 103.2, 1200),\n                (3, 1, 98.1, 800),\n                (4, 2, 99.0, 450),\n                (5, 2, 105.4, 2100),\n                (6, 2, 97.5, 900),\n                (7, 3, 101.0, 600),\n                (8, 3, 102.5, 750);\n            ",
        "spec": "Downsample high-frequency ticks by bucket: extract the minimum price, maximum price, opening price (first tick_id), closing price (last tick_id), and total volume per bucket to construct an OHLC candlestick representation.",
        "starterSql": "-- Downsample high-frequency ticks into OHLC summary bars\nSELECT \n    bucket_id,\n    MIN(quote_price) AS low_price,\n    MAX(quote_price) AS high_price,\n    SUM(volume) AS total_volume,\n    COUNT(*) AS tick_count\nFROM HIGH_FREQ_TICKS\nGROUP BY bucket_id\nORDER BY bucket_id ASC;",
        "expectedSolutionSql": "SELECT \n    bucket_id,\n    MIN(quote_price) AS low_price,\n    MAX(quote_price) AS high_price,\n    SUM(volume) AS total_volume,\n    COUNT(*) AS tick_count\nFROM HIGH_FREQ_TICKS\nGROUP BY bucket_id\nORDER BY bucket_id ASC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol4_04_svg",
        "deepTheory": [
          {
            "title": "LTTB Algorithm",
            "body": "Largest Triangle Three Buckets (LTTB) downsamples millions of points for visual charting while preserving visual peaks and troughs by maximizing the triangular area formed between the previous selected point, candidate points in the current bucket, and the average point of the next bucket."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why is simple average downsampling ineffective for financial and telemetry time series, and why is LTTB preferred?",
          "hardwareInvariants": "Memory transfer over frontend websockets, browser canvas rendering limits.",
          "interviewerIntent": "Evaluate knowledge of time-series visualization algorithms and signal preservation.",
          "spokenAnswer": "Simple averaging (or subsampling every Nth point) smooths away critical transient spikes—such as a 100ms flash crash or a CPU 100% saturation spike—hiding the very anomalies engineers need to diagnose. The Largest Triangle Three Buckets (LTTB) algorithm divides the time series into buckets and selects the point in each bucket that maximizes the triangular area with adjacent buckets. This preserves the visual fidelity, peaks, and troughs of the original 1,000,000-point series in just 1,000 pixels on screen.",
          "powerKeywords": "LTTB (Largest Triangle Three Buckets), Downsampling, Visual Extrema Preservation, Candlestick OHLC, Telemetry Spikes"
        },
        "seedRows": [
          {
            "tick_id": 1,
            "bucket_id": 1,
            "quote_price": 100.5,
            "volume": 500
          },
          {
            "tick_id": 2,
            "bucket_id": 1,
            "quote_price": 103.2,
            "volume": 1200
          },
          {
            "tick_id": 3,
            "bucket_id": 1,
            "quote_price": 98.1,
            "volume": 800
          },
          {
            "tick_id": 4,
            "bucket_id": 2,
            "quote_price": 99,
            "volume": 450
          },
          {
            "tick_id": 5,
            "bucket_id": 2,
            "quote_price": 105.4,
            "volume": 2100
          },
          {
            "tick_id": 6,
            "bucket_id": 2,
            "quote_price": 97.5,
            "volume": 900
          },
          {
            "tick_id": 7,
            "bucket_id": 3,
            "quote_price": 101,
            "volume": 600
          },
          {
            "tick_id": 8,
            "bucket_id": 3,
            "quote_price": 102.5,
            "volume": 750
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_05_continuous_materialized_views",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "05",
        "topicSeq": "V4-05",
        "title": "Continuous Materialized Views & Incremental Aggregation State Rollups",
        "domain": "Stream Processing & Analytics",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "STREAM_PARTIAL_ROLLUPS",
        "columns": [
          {
            "name": "window_epoch",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "metric_name",
            "type": "TEXT"
          },
          {
            "name": "partial_sum",
            "type": "NUMERIC"
          },
          {
            "name": "partial_count",
            "type": "INTEGER"
          },
          {
            "name": "is_finalized",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE STREAM_PARTIAL_ROLLUPS (\n                    window_epoch INTEGER PRIMARY KEY,\n                    metric_name TEXT,\n                    partial_sum NUMERIC,\n                    partial_count INTEGER,\n                    is_finalized INTEGER\n                );\n                INSERT INTO STREAM_PARTIAL_ROLLUPS VALUES\n                (1700000000, 'cpu_usage', 450.2, 5, 1),\n                (1700000060, 'cpu_usage', 510.8, 6, 1),\n                (1700000120, 'cpu_usage', 390.0, 4, 1),\n                (1700000180, 'cpu_usage', 420.5, 5, 0);\n            ",
        "spec": "Combine finalized micro-aggregates (is_finalized = 1) across completed time windows to compute the global rolling average and total sample count without querying raw billion-row source tables.",
        "starterSql": "-- Aggregate pre-computed partial rollups incrementally\nSELECT \n    metric_name,\n    SUM(partial_sum) AS total_sum,\n    SUM(partial_count) AS total_count,\n    ROUND(SUM(partial_sum) / SUM(partial_count), 2) AS exact_overall_avg\nFROM STREAM_PARTIAL_ROLLUPS\nWHERE is_finalized = 1\nGROUP BY metric_name;",
        "expectedSolutionSql": "SELECT \n    metric_name,\n    SUM(partial_sum) AS total_sum,\n    SUM(partial_count) AS total_count,\n    ROUND(SUM(partial_sum) / SUM(partial_count), 2) AS exact_overall_avg\nFROM STREAM_PARTIAL_ROLLUPS\nWHERE is_finalized = 1\nGROUP BY metric_name;",
        "expectedRowCount": 1,
        "svgDiagramKey": "vol4_05_svg",
        "deepTheory": [
          {
            "title": "Algebraic Aggregates",
            "body": "Aggregates are classified as: Distributive (COUNT, SUM, MIN, MAX - combinable directly), Algebraic (AVG, VARIANCE - combinable using a fixed-size intermediate state like sum and count), and Holistic (MEDIAN, MODE - cannot be combined without re-reading raw data)."
          }
        ],
        "staffInterviewDefense": {
          "question": "What is the mathematical distinction between Distributive, Algebraic, and Holistic aggregates in incremental streaming engines?",
          "hardwareInvariants": "State store memory footprint, incremental rollup network serialization bandwidth.",
          "interviewerIntent": "Evaluate theoretical relational aggregation foundations and distributed rollup optimization.",
          "spokenAnswer": "Distributive aggregates (SUM, COUNT, MIN, MAX) can be computed on partitions and combined with the same function: F(A U B) = F(F(A), F(B)). Algebraic aggregates (AVG, STDDEV) cannot be combined with their own function, but can be computed from a fixed-size state tuple: AVG requires (SUM, COUNT), and F(A U B) = (SUM_A + SUM_B) / (COUNT_A + COUNT_B). Holistic aggregates (MEDIAN, EXACT_COUNT_DISTINCT) cannot be computed from bounded sub-aggregates; they require retaining the raw unbound dataset or using probabilistic approximations (T-Digest, HLL).",
          "powerKeywords": "Distributive vs Algebraic vs Holistic Aggregates, Incremental View Maintenance (IVM), Intermediate State, Materialize"
        },
        "seedRows": [
          {
            "window_epoch": 1700000000,
            "metric_name": "cpu_usage",
            "partial_sum": 450.2,
            "partial_count": 5,
            "is_finalized": 1
          },
          {
            "window_epoch": 1700000060,
            "metric_name": "cpu_usage",
            "partial_sum": 510.8,
            "partial_count": 6,
            "is_finalized": 1
          },
          {
            "window_epoch": 1700000120,
            "metric_name": "cpu_usage",
            "partial_sum": 390,
            "partial_count": 4,
            "is_finalized": 1
          },
          {
            "window_epoch": 1700000180,
            "metric_name": "cpu_usage",
            "partial_sum": 420.5,
            "partial_count": 5,
            "is_finalized": 0
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_06_hot_partition_salted_shards",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "06",
        "topicSeq": "V4-06",
        "title": "Hot Partition Skew Detection & Dynamic Salted Sharding Keys",
        "domain": "Stream Processing & Distributed Storage",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "STREAM_PARTITION_METRICS",
        "columns": [
          {
            "name": "partition_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "shard_key",
            "type": "TEXT"
          },
          {
            "name": "event_rate_sec",
            "type": "INTEGER"
          },
          {
            "name": "byte_rate_mb",
            "type": "NUMERIC"
          },
          {
            "name": "consumer_lag",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE STREAM_PARTITION_METRICS (\n                    partition_id INTEGER PRIMARY KEY,\n                    shard_key TEXT,\n                    event_rate_sec INTEGER,\n                    byte_rate_mb NUMERIC,\n                    consumer_lag INTEGER\n                );\n                INSERT INTO STREAM_PARTITION_METRICS VALUES\n                (0, 'merchant_acme', 45000, 18.5, 120000),\n                (1, 'merchant_general', 3200, 1.2, 450),\n                (2, 'merchant_general', 2800, 1.1, 380),\n                (3, 'merchant_general', 3100, 1.2, 510),\n                (4, 'merchant_megacorp', 38000, 15.2, 95000);\n            ",
        "spec": "Identify hot partitions where consumer lag exceeds 50,000 events and event rate exceeds 10,000/sec, calculating their throughput percentage of total cluster traffic to trigger key salting.",
        "starterSql": "-- Isolate skewed hot partitions bottlenecking cluster throughput\nSELECT \n    partition_id,\n    shard_key,\n    event_rate_sec,\n    consumer_lag\nFROM STREAM_PARTITION_METRICS\nWHERE event_rate_sec > 10000 AND consumer_lag > 50000\nORDER BY consumer_lag DESC;",
        "expectedSolutionSql": "SELECT \n    partition_id,\n    shard_key,\n    event_rate_sec,\n    consumer_lag\nFROM STREAM_PARTITION_METRICS\nWHERE event_rate_sec > 10000 AND consumer_lag > 50000\nORDER BY consumer_lag DESC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol4_06_svg",
        "deepTheory": [
          {
            "title": "Key Salting Mechanics",
            "body": "When a single entity (e.g. Amazon or Apple) generates 80% of traffic, partitioning by customer_id directs all traffic to one shard. Appending a pseudo-random salt: key = customer_id + '_' + (random() % K) distributes the hot entity across K shards evenly."
          }
        ],
        "staffInterviewDefense": {
          "question": "How do you mitigate hot-key partition bottlenecks in distributed streaming systems like Kafka or DynamoDB?",
          "hardwareInvariants": "Single-core CPU saturation, single-NIC network bottleneck on hot shard node.",
          "interviewerIntent": "Evaluate real-world distributed systems scalability under severe Pareto power-law skew.",
          "spokenAnswer": "Hot partitions occur when traffic follows a power-law distribution and hash(key) sends all messages of a mega-tenant to a single shard, saturating that node's CPU and NIC while remaining nodes idle. Mitigation: (1) Key Salting: append an integer suffix (merchant_101_0 through merchant_101_7) to spread writes across 8 partitions; (2) Two-Phase Aggregation: downstream stream workers aggregate locally within salted partitions before rolling up into a global aggregate; or (3) Separate VIP Dedicated Partitions.",
          "powerKeywords": "Hot Partition, Key Salting, Pareto Skew, Two-Phase Aggregation, Consumer Lag, Shard Rebalancing"
        },
        "seedRows": [
          {
            "partition_id": 0,
            "shard_key": "merchant_acme",
            "event_rate_sec": 45000,
            "byte_rate_mb": 18.5,
            "consumer_lag": 120000
          },
          {
            "partition_id": 1,
            "shard_key": "merchant_general",
            "event_rate_sec": 3200,
            "byte_rate_mb": 1.2,
            "consumer_lag": 450
          },
          {
            "partition_id": 2,
            "shard_key": "merchant_general",
            "event_rate_sec": 2800,
            "byte_rate_mb": 1.1,
            "consumer_lag": 380
          },
          {
            "partition_id": 3,
            "shard_key": "merchant_general",
            "event_rate_sec": 3100,
            "byte_rate_mb": 1.2,
            "consumer_lag": 510
          },
          {
            "partition_id": 4,
            "shard_key": "merchant_megacorp",
            "event_rate_sec": 38000,
            "byte_rate_mb": 15.2,
            "consumer_lag": 95000
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_07_p99_percentile_tdigest",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "07",
        "topicSeq": "V4-07",
        "title": "High-Throughput API Latency P50 / P95 / P99 Percentile Estimation",
        "domain": "Analytics & SRE Observability",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "API_LATENCY_LOGS",
        "columns": [
          {
            "name": "request_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "endpoint",
            "type": "TEXT"
          },
          {
            "name": "latency_ms",
            "type": "INTEGER"
          },
          {
            "name": "timestamp_epoch",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE API_LATENCY_LOGS (\n                    request_id INTEGER PRIMARY KEY,\n                    endpoint TEXT,\n                    latency_ms INTEGER,\n                    timestamp_epoch INTEGER\n                );\n                INSERT INTO API_LATENCY_LOGS VALUES\n                (1, '/v1/checkout', 45, 1700000000),\n                (2, '/v1/checkout', 48, 1700000001),\n                (3, '/v1/checkout', 52, 1700000002),\n                (4, '/v1/checkout', 55, 1700000003),\n                (5, '/v1/checkout', 58, 1700000004),\n                (6, '/v1/checkout', 62, 1700000005),\n                (7, '/v1/checkout', 75, 1700000006),\n                (8, '/v1/checkout', 120, 1700000007),\n                (9, '/v1/checkout', 450, 1700000008),\n                (10, '/v1/checkout', 1200, 1700000009);\n            ",
        "spec": "Rank API requests by latency_ms, assign row percentiles via PERCENT_RANK(), and extract the median P50 and tail P90 latency measurements for the checkout endpoint.",
        "starterSql": "-- Compute P50 and P90 latency percentiles\nWITH ranked_latencies AS (\n    SELECT \n        endpoint,\n        latency_ms,\n        PERCENT_RANK() OVER (ORDER BY latency_ms ASC) AS pct_rank\n    FROM API_LATENCY_LOGS\n    WHERE endpoint = '/v1/checkout'\n)\nSELECT \n    endpoint,\n    MAX(CASE WHEN pct_rank <= 0.50 THEN latency_ms END) AS p50_approx_ms,\n    MAX(CASE WHEN pct_rank <= 0.90 THEN latency_ms END) AS p90_approx_ms,\n    MAX(latency_ms) AS p100_max_ms\nFROM ranked_latencies\nGROUP BY endpoint;",
        "expectedSolutionSql": "WITH ranked_latencies AS (\n    SELECT \n        endpoint,\n        latency_ms,\n        PERCENT_RANK() OVER (ORDER BY latency_ms ASC) AS pct_rank\n    FROM API_LATENCY_LOGS\n    WHERE endpoint = '/v1/checkout'\n)\nSELECT \n    endpoint,\n    MAX(CASE WHEN pct_rank <= 0.50 THEN latency_ms END) AS p50_approx_ms,\n    MAX(CASE WHEN pct_rank <= 0.90 THEN latency_ms END) AS p90_approx_ms,\n    MAX(latency_ms) AS p100_max_ms\nFROM ranked_latencies\nGROUP BY endpoint;",
        "expectedRowCount": 1,
        "svgDiagramKey": "vol4_07_svg",
        "deepTheory": [
          {
            "title": "The Flaw of Averages",
            "body": "Average latency hides tail latency: if 99 requests take 10ms and 1 takes 10,000ms, the average is 109ms, masking that 1% of users had an unacceptable 10-second freeze."
          },
          {
            "title": "T-Digest Quantile Sketch",
            "body": "Exact percentile computation requires storing and sorting all samples. T-Digest clusters points into centroids with variable resolution—dense near 0 and 1, sparse in the middle—bounding error at P99.9 to < 0.01% with constant memory."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why can percentiles not be averaged across cluster nodes, and how does T-Digest allow distributed quantile merging?",
          "hardwareInvariants": "Non-associative mathematical operators, distributed sketch serialization footprint.",
          "interviewerIntent": "Evaluate deep grasp of statistical aggregations in distributed metrics systems (Datadog/Prometheus).",
          "spokenAnswer": "Percentiles are non-distributive, holistic aggregations: taking the average of the P99s of 10 nodes produces mathematical nonsense. If node 1 handled 1,000 requests at 10ms and node 2 handled 10 requests at 5000ms, their simple average P99 is ~2500ms, completely misrepresenting cluster reality. T-Digest represents empirical distributions as ordered lists of centroids. Centroids from multiple nodes can be merged losslessly via weighted interpolation, allowing distributed monitoring agents to aggregate exact P95, P99, and P99.9 quantiles globally without streaming raw samples.",
          "powerKeywords": "T-Digest, Non-Distributive Aggregates, Tail Latency (P99), Centroid Merging, Quantile Sketching"
        },
        "seedRows": [
          {
            "request_id": 1,
            "endpoint": "/v1/checkout",
            "latency_ms": 45,
            "timestamp_epoch": 1700000000
          },
          {
            "request_id": 2,
            "endpoint": "/v1/checkout",
            "latency_ms": 48,
            "timestamp_epoch": 1700000001
          },
          {
            "request_id": 3,
            "endpoint": "/v1/checkout",
            "latency_ms": 52,
            "timestamp_epoch": 1700000002
          },
          {
            "request_id": 4,
            "endpoint": "/v1/checkout",
            "latency_ms": 55,
            "timestamp_epoch": 1700000003
          },
          {
            "request_id": 5,
            "endpoint": "/v1/checkout",
            "latency_ms": 58,
            "timestamp_epoch": 1700000004
          },
          {
            "request_id": 6,
            "endpoint": "/v1/checkout",
            "latency_ms": 62,
            "timestamp_epoch": 1700000005
          },
          {
            "request_id": 7,
            "endpoint": "/v1/checkout",
            "latency_ms": 75,
            "timestamp_epoch": 1700000006
          },
          {
            "request_id": 8,
            "endpoint": "/v1/checkout",
            "latency_ms": 120,
            "timestamp_epoch": 1700000007
          },
          {
            "request_id": 9,
            "endpoint": "/v1/checkout",
            "latency_ms": 450,
            "timestamp_epoch": 1700000008
          },
          {
            "request_id": 10,
            "endpoint": "/v1/checkout",
            "latency_ms": 1200,
            "timestamp_epoch": 1700000009
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_08_ewma_volatility_tracking",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "08",
        "topicSeq": "V4-08",
        "title": "Exponentially Weighted Moving Average (EWMA) Volatility Tracking",
        "domain": "Quantitative Finance & Trading",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "CRYPTO_TRADES",
        "columns": [
          {
            "name": "trade_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "pair",
            "type": "TEXT"
          },
          {
            "name": "price",
            "type": "NUMERIC"
          },
          {
            "name": "trade_time_epoch",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE CRYPTO_TRADES (\n                    trade_id INTEGER PRIMARY KEY,\n                    pair TEXT,\n                    price NUMERIC,\n                    trade_time_epoch INTEGER\n                );\n                INSERT INTO CRYPTO_TRADES VALUES\n                (1, 'BTC/USD', 65000.0, 1000),\n                (2, 'BTC/USD', 65400.0, 1001),\n                (3, 'BTC/USD', 64800.0, 1002),\n                (4, 'BTC/USD', 66200.0, 1003),\n                (5, 'BTC/USD', 67000.0, 1004);\n            ",
        "spec": "Calculate trade-to-trade absolute price returns and rolling 3-tick volatility metrics: compute the maximum price swing (|price - LAG(price)|) to identify high-volatility regime shifts.",
        "starterSql": "-- Compute trade return deltas and volatility metrics\nWITH price_deltas AS (\n    SELECT \n        trade_id,\n        pair,\n        price,\n        ABS(price - LAG(price, 1, price) OVER (PARTITION BY pair ORDER BY trade_id)) AS price_delta\n    FROM CRYPTO_TRADES\n)\nSELECT \n    trade_id,\n    pair,\n    price,\n    price_delta,\n    ROUND(AVG(price_delta) OVER (PARTITION BY pair ORDER BY trade_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_volatility_3\nFROM price_deltas\nORDER BY trade_id ASC;",
        "expectedSolutionSql": "WITH price_deltas AS (\n    SELECT \n        trade_id,\n        pair,\n        price,\n        ABS(price - LAG(price, 1, price) OVER (PARTITION BY pair ORDER BY trade_id)) AS price_delta\n    FROM CRYPTO_TRADES\n)\nSELECT \n    trade_id,\n    pair,\n    price,\n    price_delta,\n    ROUND(AVG(price_delta) OVER (PARTITION BY pair ORDER BY trade_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_volatility_3\nFROM price_deltas\nORDER BY trade_id ASC;",
        "expectedRowCount": 5,
        "svgDiagramKey": "vol4_08_svg",
        "deepTheory": [
          {
            "title": "EWMA Recursive Formula",
            "body": "EWMA_t = alpha * x_t + (1 - alpha) * EWMA_(t-1). It applies exponentially decreasing weights to older data, giving higher sensitivity to recent price action without maintaining large historical buffers."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why is EWMA favored over Simple Moving Average (SMA) in algorithmic market risk models?",
          "hardwareInvariants": "Register-level floating point multiply-add (FMA) latency, constant O(1) state memory.",
          "interviewerIntent": "Evaluate knowledge of recursive financial time-series filters and low-latency execution.",
          "spokenAnswer": "Simple Moving Average (SMA) assigns equal 1/N weight to all observations in a window of size N, creating two flaws: (1) lag—it responds sluggishly to sudden market shocks; and (2) 'ghost signals'—when a massive price shock from 30 days ago falls out of the window, the SMA drops abruptly even if market volatility today is zero. EWMA weights recent observations exponentially higher (alpha decay), requires only a single floating-point number in state (O(1) memory), and reacts instantaneously to breakout volatility.",
          "powerKeywords": "EWMA, Alpha Decay, Simple Moving Average Lag, Ghost Signals, Market Volatility Modeling"
        },
        "seedRows": [
          {
            "trade_id": 1,
            "pair": "BTC/USD",
            "price": 65000,
            "trade_time_epoch": 1000
          },
          {
            "trade_id": 2,
            "pair": "BTC/USD",
            "price": 65400,
            "trade_time_epoch": 1001
          },
          {
            "trade_id": 3,
            "pair": "BTC/USD",
            "price": 64800,
            "trade_time_epoch": 1002
          },
          {
            "trade_id": 4,
            "pair": "BTC/USD",
            "price": 66200,
            "trade_time_epoch": 1003
          },
          {
            "trade_id": 5,
            "pair": "BTC/USD",
            "price": 67000,
            "trade_time_epoch": 1004
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_09_bloom_deduplication",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "09",
        "topicSeq": "V4-09",
        "title": "Stream Ingestion Deduplication via Idempotency Window Partitions",
        "domain": "Stream Ingestion & Idempotency",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "STREAMING_EVENTS_INBOX",
        "columns": [
          {
            "name": "event_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "source_system",
            "type": "TEXT"
          },
          {
            "name": "payload_crc",
            "type": "TEXT"
          },
          {
            "name": "arrival_epoch_ms",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE STREAMING_EVENTS_INBOX (\n                    event_id INTEGER PRIMARY KEY,\n                    source_system TEXT,\n                    payload_crc TEXT,\n                    arrival_epoch_ms INTEGER\n                );\n                INSERT INTO STREAMING_EVENTS_INBOX VALUES\n                (1, 'stripe_webhook', 'CRC_9801', 1000),\n                (2, 'stripe_webhook', 'CRC_9802', 1010),\n                (3, 'stripe_webhook', 'CRC_9801', 1025),\n                (4, 'shopify_webhook', 'CRC_3311', 1050),\n                (5, 'stripe_webhook', 'CRC_9801', 1090),\n                (6, 'shopify_webhook', 'CRC_3312', 1100);\n            ",
        "spec": "Filter duplicate webhook payloads received via at-least-once delivery semantics: partition by source_system and payload_crc, retaining only the first arrival (earliest arrival_epoch_ms) to ensure exactly-once processing.",
        "starterSql": "-- Deduplicate streaming webhooks by payload CRC\nWITH deduplicated AS (\n    SELECT \n        event_id,\n        source_system,\n        payload_crc,\n        arrival_epoch_ms,\n        ROW_NUMBER() OVER (\n            PARTITION BY source_system, payload_crc \n            ORDER BY arrival_epoch_ms ASC\n        ) AS dedup_rank\n    FROM STREAMING_EVENTS_INBOX\n)\nSELECT \n    event_id,\n    source_system,\n    payload_crc,\n    arrival_epoch_ms\nFROM deduplicated\nWHERE dedup_rank = 1\nORDER BY event_id ASC;",
        "expectedSolutionSql": "WITH deduplicated AS (\n    SELECT \n        event_id,\n        source_system,\n        payload_crc,\n        arrival_epoch_ms,\n        ROW_NUMBER() OVER (\n            PARTITION BY source_system, payload_crc \n            ORDER BY arrival_epoch_ms ASC\n        ) AS dedup_rank\n    FROM STREAMING_EVENTS_INBOX\n)\nSELECT \n    event_id,\n    source_system,\n    payload_crc,\n    arrival_epoch_ms\nFROM deduplicated\nWHERE dedup_rank = 1\nORDER BY event_id ASC;",
        "expectedRowCount": 4,
        "svgDiagramKey": "vol4_09_svg",
        "deepTheory": [
          {
            "title": "At-Least-Once to Exactly-Once",
            "body": "Distributed networks cannot guarantee physical exactly-once delivery across partitions without coordination. Real systems achieve effectively-once processing by combining At-Least-Once message delivery with idempotent consumer deduplication."
          }
        ],
        "staffInterviewDefense": {
          "question": "Can distributed message brokers achieve truly physical 'exactly-once' delivery across the network?",
          "hardwareInvariants": "Two Generals' Problem, TCP acknowledgment timeouts, socket disconnects.",
          "interviewerIntent": "Test comprehension of fundamental distributed networking boundaries vs transactional consumer semantics.",
          "spokenAnswer": "No network protocol can guarantee physical exactly-once message transport due to the Two Generals' Paradox: if an ACK is lost in transit, the sender cannot distinguish between a failed delivery and a dropped ACK, forcing a retry that results in at-least-once delivery. 'Exactly-Once Semantics' (EOS) in frameworks like Kafka Streams or Flink does not mean messages are never sent twice over the wire; it means the end-to-end processing pipeline—combining idempotent producer sequence numbers, transactional coordinator commits, and idempotent consumer deduplication—ensures state mutations and side effects occur exactly once.",
          "powerKeywords": "Two Generals' Paradox, At-Least-Once Delivery, Idempotent Consumer, Exactly-Once Semantics (EOS), Deduplication Window"
        },
        "seedRows": [
          {
            "event_id": 1,
            "source_system": "stripe_webhook",
            "payload_crc": "CRC_9801",
            "arrival_epoch_ms": 1000
          },
          {
            "event_id": 2,
            "source_system": "stripe_webhook",
            "payload_crc": "CRC_9802",
            "arrival_epoch_ms": 1010
          },
          {
            "event_id": 3,
            "source_system": "stripe_webhook",
            "payload_crc": "CRC_9801",
            "arrival_epoch_ms": 1025
          },
          {
            "event_id": 4,
            "source_system": "shopify_webhook",
            "payload_crc": "CRC_3311",
            "arrival_epoch_ms": 1050
          },
          {
            "event_id": 5,
            "source_system": "stripe_webhook",
            "payload_crc": "CRC_9801",
            "arrival_epoch_ms": 1090
          },
          {
            "event_id": 6,
            "source_system": "shopify_webhook",
            "payload_crc": "CRC_3312",
            "arrival_epoch_ms": 1100
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_10_geospatial_h3_hex_join",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "10",
        "topicSeq": "V4-10",
        "title": "Uber H3 Hexagonal Discrete Spatial Index Proximity Pairing",
        "domain": "Geospatial Stream Analytics",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "UBER_RIDER_PINGS",
        "columns": [
          {
            "name": "rider_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "h3_hex_id",
            "type": "TEXT"
          },
          {
            "name": "requested_tier",
            "type": "TEXT"
          },
          {
            "name": "ping_time_epoch",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE UBER_RIDER_PINGS (\n                    rider_id INTEGER PRIMARY KEY,\n                    h3_hex_id TEXT,\n                    requested_tier TEXT,\n                    ping_time_epoch INTEGER\n                );\n                CREATE TABLE UBER_DRIVER_PINGS (\n                    driver_id INTEGER PRIMARY KEY,\n                    h3_hex_id TEXT,\n                    vehicle_tier TEXT,\n                    is_available INTEGER\n                );\n                INSERT INTO UBER_RIDER_PINGS VALUES\n                (101, '8828308281fffff', 'UBER_X', 1000),\n                (102, '8828308281fffff', 'UBER_BLACK', 1005),\n                (103, '8828308285fffff', 'UBER_X', 1010);\n                INSERT INTO UBER_DRIVER_PINGS VALUES\n                (501, '8828308281fffff', 'UBER_X', 1),\n                (502, '8828308281fffff', 'UBER_BLACK', 1),\n                (503, '8828308281fffff', 'UBER_X', 0),\n                (504, '8828308285fffff', 'UBER_X', 1);\n            ",
        "spec": "Pair ride requests with available drivers (is_available = 1) situated in the exact same H3 hexagonal cell (h3_hex_id) matching the requested vehicle tier.",
        "starterSql": "-- Pair riders with available drivers within matching H3 hex cells\nSELECT \n    r.rider_id,\n    r.h3_hex_id,\n    r.requested_tier,\n    d.driver_id\nFROM UBER_RIDER_PINGS r\nINNER JOIN UBER_DRIVER_PINGS d \n    ON r.h3_hex_id = d.h3_hex_id \n   AND r.requested_tier = d.vehicle_tier\nWHERE d.is_available = 1\nORDER BY r.rider_id, d.driver_id;",
        "expectedSolutionSql": "SELECT \n    r.rider_id,\n    r.h3_hex_id,\n    r.requested_tier,\n    d.driver_id\nFROM UBER_RIDER_PINGS r\nINNER JOIN UBER_DRIVER_PINGS d \n    ON r.h3_hex_id = d.h3_hex_id \n   AND r.requested_tier = d.vehicle_tier\nWHERE d.is_available = 1\nORDER BY r.rider_id, d.driver_id;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol4_10_svg",
        "deepTheory": [
          {
            "title": "Why Hexagons over Squares",
            "body": "In a square grid, diagonal neighbors are sqrt(2) times farther than orthogonal neighbors, distorting distance calculations. In a regular hexagonal grid (Uber H3), all 6 neighboring cells are at the exact same distance from the center point, creating invariant radial symmetry."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why did Uber develop the H3 hexagonal hierarchical spatial index instead of using standard latitude/longitude bounding boxes or R-Trees?",
          "hardwareInvariants": "B+ Tree 64-bit integer index lookups vs complex 2D R-Tree bounding-box polygon intersection math.",
          "interviewerIntent": "Evaluate knowledge of discrete global grid systems (DGGS) and high-throughput geospatial relational querying.",
          "spokenAnswer": "Continuous latitude and longitude coordinates require expensive floating-point trigonometric calculations (Haversine formula) and complex R-Tree bounding box queries that do not scale to millions of real-time pings per second. Uber's H3 discretizes the entire surface of the Earth into regular hexagonal cells encoded as simple 64-bit unsigned integers. Finding adjacent neighbors reduces to bitmasking and bit-shifting, and pairing riders with nearby drivers reduces to a blazing-fast relational integer equi-join on B+ Tree indexes.",
          "powerKeywords": "Uber H3 Index, Discrete Global Grid System (DGGS), Hexagonal Symmetry, Integer Equi-Join, R-Tree Elimination"
        },
        "seedRows": [
          {
            "rider_id": 101,
            "h3_hex_id": "8828308281fffff",
            "requested_tier": "UBER_X",
            "ping_time_epoch": 1000
          },
          {
            "rider_id": 102,
            "h3_hex_id": "8828308281fffff",
            "requested_tier": "UBER_BLACK",
            "ping_time_epoch": 1005
          },
          {
            "rider_id": 103,
            "h3_hex_id": "8828308285fffff",
            "requested_tier": "UBER_X",
            "ping_time_epoch": 1010
          }
        ],
        "extraTables": {
          "UBER_DRIVER_PINGS": [
            {
              "driver_id": 501,
              "h3_hex_id": "8828308281fffff",
              "vehicle_tier": "UBER_X",
              "is_available": 1
            },
            {
              "driver_id": 502,
              "h3_hex_id": "8828308281fffff",
              "vehicle_tier": "UBER_BLACK",
              "is_available": 1
            },
            {
              "driver_id": 503,
              "h3_hex_id": "8828308281fffff",
              "vehicle_tier": "UBER_X",
              "is_available": 0
            },
            {
              "driver_id": 504,
              "h3_hex_id": "8828308285fffff",
              "vehicle_tier": "UBER_X",
              "is_available": 1
            }
          ]
        }
      },
      {
        "id": "vol4_11_cdc_stream_reconstruction",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "11",
        "topicSeq": "V4-11",
        "title": "Change Data Capture (CDC) Debezium Mutation Stream Reconstruction",
        "domain": "Stream Ingestion & CDC",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "CDC_MUTATION_LOG",
        "columns": [
          {
            "name": "seq_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "entity_id",
            "type": "INTEGER"
          },
          {
            "name": "op_type",
            "type": "TEXT"
          },
          {
            "name": "old_status",
            "type": "TEXT"
          },
          {
            "name": "new_status",
            "type": "TEXT"
          },
          {
            "name": "mutation_time_epoch",
            "type": "INTEGER"
          }
        ],
        "seedSql": "\n                CREATE TABLE CDC_MUTATION_LOG (\n                    seq_id INTEGER PRIMARY KEY,\n                    entity_id INTEGER,\n                    op_type TEXT,\n                    old_status TEXT,\n                    new_status TEXT,\n                    mutation_time_epoch INTEGER\n                );\n                INSERT INTO CDC_MUTATION_LOG VALUES\n                (1, 1001, 'INSERT', NULL, 'PENDING', 1000),\n                (2, 1001, 'UPDATE', 'PENDING', 'PROCESSING', 1050),\n                (3, 1002, 'INSERT', NULL, 'PENDING', 1060),\n                (4, 1001, 'UPDATE', 'PROCESSING', 'SHIPPED', 1100),\n                (5, 1002, 'UPDATE', 'PENDING', 'CANCELLED', 1120);\n            ",
        "spec": "Reconstruct the latest operational state of each entity from the raw append-only CDC op-log: find the latest status (new_status of maximum seq_id) per entity_id.",
        "starterSql": "-- Extract latest entity state from append-only CDC mutation log\nWITH ranked_ops AS (\n    SELECT \n        entity_id,\n        new_status AS latest_status,\n        mutation_time_epoch,\n        ROW_NUMBER() OVER (PARTITION BY entity_id ORDER BY seq_id DESC) AS rnk\n    FROM CDC_MUTATION_LOG\n)\nSELECT \n    entity_id,\n    latest_status,\n    mutation_time_epoch\nFROM ranked_ops\nWHERE rnk = 1\nORDER BY entity_id ASC;",
        "expectedSolutionSql": "WITH ranked_ops AS (\n    SELECT \n        entity_id,\n        new_status AS latest_status,\n        mutation_time_epoch,\n        ROW_NUMBER() OVER (PARTITION BY entity_id ORDER BY seq_id DESC) AS rnk\n    FROM CDC_MUTATION_LOG\n)\nSELECT \n    entity_id,\n    latest_status,\n    mutation_time_epoch\nFROM ranked_ops\nWHERE rnk = 1\nORDER BY entity_id ASC;",
        "expectedRowCount": 2,
        "svgDiagramKey": "vol4_11_svg",
        "deepTheory": [
          {
            "title": "The Log-Centric Architecture",
            "body": "A database is an inside-out system: the WAL is the fundamental ground truth, while tables and indexes are simply materialized views of the log. CDC taps into the WAL directly, streaming every INSERT, UPDATE, and DELETE event without polling tables."
          }
        ],
        "staffInterviewDefense": {
          "question": "Why is WAL-based Change Data Capture (e.g. Debezium) vastly superior to timestamp polling ('WHERE updated_at > last_sync')?",
          "hardwareInvariants": "Table scan I/O vs zero-overhead sequential WAL log tailing, hard DELETE invisibility.",
          "interviewerIntent": "Evaluate knowledge of data replication architectures, streaming ETL, and audit durability.",
          "spokenAnswer": "Timestamp polling ('WHERE updated_at > ?') has three catastrophic failure modes: (1) It misses hard DELETEs because the deleted row no longer exists to be queried; (2) It misses intermediate updates if multiple mutations occur within the poll interval; and (3) It inflicts high CPU and I/O load on the production database by running frequent table scans. WAL-based CDC (Debezium) tails the database transaction log directly as a replication replica. It captures all INSERTs, UPDATEs, and DELETEs with microsecond latency, captures the exact before-and-after state images, and imposes near-zero overhead on production query engines.",
          "powerKeywords": "Change Data Capture (CDC), Debezium, WAL Tailing, Hard DELETE Invisibility, Zero-Overhead Replication"
        },
        "seedRows": [
          {
            "seq_id": 1,
            "entity_id": 1001,
            "op_type": "INSERT",
            "old_status": null,
            "new_status": "PENDING",
            "mutation_time_epoch": 1000
          },
          {
            "seq_id": 2,
            "entity_id": 1001,
            "op_type": "UPDATE",
            "old_status": "PENDING",
            "new_status": "PROCESSING",
            "mutation_time_epoch": 1050
          },
          {
            "seq_id": 3,
            "entity_id": 1002,
            "op_type": "INSERT",
            "old_status": null,
            "new_status": "PENDING",
            "mutation_time_epoch": 1060
          },
          {
            "seq_id": 4,
            "entity_id": 1001,
            "op_type": "UPDATE",
            "old_status": "PROCESSING",
            "new_status": "SHIPPED",
            "mutation_time_epoch": 1100
          },
          {
            "seq_id": 5,
            "entity_id": 1002,
            "op_type": "UPDATE",
            "old_status": "PENDING",
            "new_status": "CANCELLED",
            "mutation_time_epoch": 1120
          }
        ],
        "extraTables": {}
      },
      {
        "id": "vol4_12_pnl_mark_to_market_rollup",
        "volumeId": "vol_4_streaming",
        "volumeName": "Volume 4: High-Throughput Stream & Time-Series Analytics",
        "seq": "12",
        "topicSeq": "V4-12",
        "title": "Real-Time Mark-to-Market Inventory Exposure & Unrealized PnL",
        "domain": "Quantitative Finance & Trading",
        "difficulty": "Hard",
        "badgeClass": "hard",
        "targetTable": "DESK_POSITIONS",
        "columns": [
          {
            "name": "position_id",
            "type": "INTEGER",
            "key": "PK"
          },
          {
            "name": "desk_id",
            "type": "TEXT"
          },
          {
            "name": "symbol",
            "type": "TEXT"
          },
          {
            "name": "qty_held",
            "type": "INTEGER"
          },
          {
            "name": "avg_entry_price",
            "type": "NUMERIC"
          }
        ],
        "seedSql": "\n                CREATE TABLE DESK_POSITIONS (\n                    position_id INTEGER PRIMARY KEY,\n                    desk_id TEXT,\n                    symbol TEXT,\n                    qty_held INTEGER,\n                    avg_entry_price NUMERIC\n                );\n                CREATE TABLE LIVE_MARKET_QUOTES (\n                    symbol TEXT PRIMARY KEY,\n                    last_price NUMERIC,\n                    bid NUMERIC,\n                    ask NUMERIC\n                );\n                INSERT INTO DESK_POSITIONS VALUES\n                (1, 'EQUITY_DERIV', 'NVDA', 5000, 110.00),\n                (2, 'EQUITY_DERIV', 'TSLA', 2000, 240.00),\n                (3, 'FX_RATES', 'EUR/USD', 1000000, 1.0850),\n                (4, 'QUANT_ALPHA', 'NVDA', 3000, 115.00);\n                INSERT INTO LIVE_MARKET_QUOTES VALUES\n                ('NVDA', 125.00, 124.95, 125.05),\n                ('TSLA', 230.00, 229.80, 230.10),\n                ('EUR/USD', 1.0920, 1.0919, 1.0921);\n            ",
        "spec": "Join internal desk inventory positions against live streaming market quotes to calculate: current market value (qty_held * last_price) and unrealized mark-to-market PnL ((last_price - avg_entry_price) * qty_held) aggregated per desk_id.",
        "starterSql": "-- Calculate real-time mark-to-market PnL across trading desks\nSELECT \n    p.desk_id,\n    ROUND(SUM(p.qty_held * q.last_price), 2) AS current_market_value,\n    ROUND(SUM((q.last_price - p.avg_entry_price) * p.qty_held), 2) AS unrealized_pnl\nFROM DESK_POSITIONS p\nINNER JOIN LIVE_MARKET_QUOTES q ON p.symbol = q.symbol\nGROUP BY p.desk_id\nORDER BY unrealized_pnl DESC;",
        "expectedSolutionSql": "SELECT \n    p.desk_id,\n    ROUND(SUM(p.qty_held * q.last_price), 2) AS current_market_value,\n    ROUND(SUM((q.last_price - p.avg_entry_price) * p.qty_held), 2) AS unrealized_pnl\nFROM DESK_POSITIONS p\nINNER JOIN LIVE_MARKET_QUOTES q ON p.symbol = q.symbol\nGROUP BY p.desk_id\nORDER BY unrealized_pnl DESC;",
        "expectedRowCount": 3,
        "svgDiagramKey": "vol4_12_svg",
        "deepTheory": [
          {
            "title": "Mark-to-Market (MtM) Mechanics",
            "body": "Mark-to-market revalues asset positions to current market prices continuously throughout the trading day, determining instantaneous capital adequacy, margin calls, and portfolio risk limits."
          }
        ],
        "staffInterviewDefense": {
          "question": "How do quantitative market makers compute streaming Mark-to-Market (MtM) PnL over millions of trades without blocking execution gateways?",
          "hardwareInvariants": "Lock-free shared memory ring buffers, atomic CAS updates, zero-copy socket reads.",
          "interviewerIntent": "Evaluate low-latency quantitative finance systems architecture and real-time ledger consistency.",
          "spokenAnswer": "Market makers decouple execution gateways from risk ledgers using lock-free shared memory ring buffers (e.g. LMAX Disruptor). Market quote feeds publish tick updates to shared memory via atomic compare-and-swap (CAS). The portfolio valuation engine reads tick deltas and re-evaluates MtM using vectorized SIMD dot products (positions * quotes) entirely in L3 CPU cache, maintaining real-time sub-microsecond risk awareness without issuing a single database disk I/O.",
          "powerKeywords": "Mark-to-Market (MtM), Unrealized PnL, LMAX Disruptor, Lock-Free Ring Buffer, Sub-Microsecond Valuation"
        },
        "seedRows": [
          {
            "position_id": 1,
            "desk_id": "EQUITY_DERIV",
            "symbol": "NVDA",
            "qty_held": 5000,
            "avg_entry_price": 110
          },
          {
            "position_id": 2,
            "desk_id": "EQUITY_DERIV",
            "symbol": "TSLA",
            "qty_held": 2000,
            "avg_entry_price": 240
          },
          {
            "position_id": 3,
            "desk_id": "FX_RATES",
            "symbol": "EUR/USD",
            "qty_held": 1000000,
            "avg_entry_price": 1.085
          },
          {
            "position_id": 4,
            "desk_id": "QUANT_ALPHA",
            "symbol": "NVDA",
            "qty_held": 3000,
            "avg_entry_price": 115
          }
        ],
        "extraTables": {
          "LIVE_MARKET_QUOTES": [
            {
              "symbol": "NVDA",
              "last_price": 125,
              "bid": 124.95,
              "ask": 125.05
            },
            {
              "symbol": "TSLA",
              "last_price": 230,
              "bid": 229.8,
              "ask": 230.1
            },
            {
              "symbol": "EUR/USD",
              "last_price": 1.092,
              "bid": 1.0919,
              "ask": 1.0921
            }
          ]
        }
      }
    ]
  }
];
