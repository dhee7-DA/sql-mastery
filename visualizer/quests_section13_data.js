// =============================================================================
// SECTION 13: QUERY PERFORMANCE & OPTIMIZATION ARENA (100 QUESTS)
// 5 Disciplines x 20 Levels (EXPLAIN ANALYZE, Scans, Join Engines, Indexes, SARGability)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.OPTIMIZATION_DISCIPLINES_METADATA = [
  {
    "key": "explain_analyze_cost",
    "name": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "symbol": "🔬",
    "color": "#38bdf8",
    "concept": "Cost Model & Shared Buffer Cache Profiling",
    "whenToUse": "When diagnosing sluggish queries in production, inspecting actual runtime execution times, row count estimation errors, and shared memory buffer hits vs physical disk reads.",
    "scenarios": "Running deep profiling: EXPLAIN (ANALYZE, BUFFERS, VERBOSE) SELECT ...; Diagnosing optimizer cardinality miscalculations due to outdated table statistics.",
    "traps": "EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "key": "sequential_vs_index_scans",
    "name": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "symbol": "⚡",
    "color": "#10b981",
    "concept": "Access Path Mechanics & Selectivity Thresholds",
    "whenToUse": "When evaluating whether the database engine scans the entire heap sequentially or leverages B-Tree indexes, index-only scans, or bitmap two-phase index lookups.",
    "scenarios": "Evaluating low-selectivity lookups: Index Scan on client_id; High-selectivity broad scans: Seq Scan; Combining multiple disjunctive predicates: BitmapOr & Bitmap Index Scan.",
    "traps": "INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "key": "join_execution_engines",
    "name": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "symbol": "⚙️",
    "color": "#f59e0b",
    "concept": "Join Operator Mechanics & Work Memory Allocation",
    "whenToUse": "When tuning multi-table join bottlenecks and inspecting whether the optimizer selected Nested Loop (small sets), Hash Join (unsorted medium/large sets), or Merge Join (pre-sorted sets).",
    "scenarios": "Joining 10 rows with 1M rows via indexed inner loop: Nested Loop; Joining two 500k row tables on equality: Hash Join; Joining two sorted time-series streams: Merge Join.",
    "traps": "HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "key": "index_architecture_optimization",
    "name": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "symbol": "📐",
    "color": "#ec4899",
    "concept": "B-Tree, BRIN, Partial & Covering INCLUDE Indexes",
    "whenToUse": "When architecting specialized indexes for multi-terabyte tables: BRIN for sequential time-series logs, Partial Indexes for active subsets, and covering INCLUDE indexes to bypass heap reads.",
    "scenarios": "Covering index: CREATE INDEX idx_Trades_Cov ON Trades(symbol) INCLUDE (price, volume); Massive time-series log: CREATE INDEX idx_Audit_Brin ON AuditLedger USING BRIN (created_at);",
    "traps": "COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "key": "query_tuning_antipatterns",
    "name": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "symbol": "🛡️",
    "color": "#a855f7",
    "concept": "Search-Argument-Able (SARGable) Predicates",
    "whenToUse": "When refactoring non-SARGable queries that prevent the query optimizer from using existing indexes due to column-wrapping functions, type coercion, or leading wildcards.",
    "scenarios": "Rewriting non-SARGable WHERE DATE(created_at) = '2026-09-27' into SARGable range: WHERE created_at >= '2026-09-27' AND created_at < '2026-09-28'; Eliminating implicit text-to-integer casts.",
    "traps": "FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  }
];

window.QUESTS_SECTION_13 = [
  {
    "id": 1201,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 01",
    "title": "Optimization: Level 01: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on SecuritiesOrders inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 30,
    "table": "SecuritiesOrders",
    "scenario": "Execute deep query plan profiling on SecuritiesOrders inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id INT, order_amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT client_id, SUM(order_amount)\nFROM SecuritiesOrders\nGROUP BY client_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT client_id, SUM(order_amount)\nFROM SecuritiesOrders\nGROUP BY client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1202,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 02",
    "title": "Optimization: Level 02: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on BankTransactions inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 30,
    "table": "BankTransactions",
    "scenario": "Execute deep query plan profiling on BankTransactions inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "BankTransactions(tx_id PK, account_id INT, amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT account_id, SUM(amount)\nFROM BankTransactions\nGROUP BY account_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT account_id, SUM(amount)\nFROM BankTransactions\nGROUP BY account_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1203,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 03",
    "title": "Optimization: Level 03: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CustomerInvoices inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 31,
    "table": "CustomerInvoices",
    "scenario": "Execute deep query plan profiling on CustomerInvoices inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id INT, invoice_total NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT customer_id, SUM(invoice_total)\nFROM CustomerInvoices\nGROUP BY customer_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT customer_id, SUM(invoice_total)\nFROM CustomerInvoices\nGROUP BY customer_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1204,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 04",
    "title": "Optimization: Level 04: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CryptoExecutions inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 31,
    "table": "CryptoExecutions",
    "scenario": "Execute deep query plan profiling on CryptoExecutions inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, wallet_id INT, fill_price NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT wallet_id, SUM(fill_price)\nFROM CryptoExecutions\nGROUP BY wallet_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT wallet_id, SUM(fill_price)\nFROM CryptoExecutions\nGROUP BY wallet_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1205,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 05",
    "title": "Optimization: Level 05: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CreditFacilities inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 32,
    "table": "CreditFacilities",
    "scenario": "Execute deep query plan profiling on CreditFacilities inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id INT, credit_limit NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT borrower_id, SUM(credit_limit)\nFROM CreditFacilities\nGROUP BY borrower_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT borrower_id, SUM(credit_limit)\nFROM CreditFacilities\nGROUP BY borrower_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1206,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 06",
    "title": "Optimization: Level 06: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on InsuranceClaims inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 32,
    "table": "InsuranceClaims",
    "scenario": "Execute deep query plan profiling on InsuranceClaims inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, policy_id INT, claim_amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT policy_id, SUM(claim_amount)\nFROM InsuranceClaims\nGROUP BY policy_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT policy_id, SUM(claim_amount)\nFROM InsuranceClaims\nGROUP BY policy_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1207,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 07",
    "title": "Optimization: Level 07: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on TreasuryYields inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 32,
    "table": "TreasuryYields",
    "scenario": "Execute deep query plan profiling on TreasuryYields inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip INT, yield_pct NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT bond_cusip, SUM(yield_pct)\nFROM TreasuryYields\nGROUP BY bond_cusip;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT bond_cusip, SUM(yield_pct)\nFROM TreasuryYields\nGROUP BY bond_cusip;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1208,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 08",
    "title": "Optimization: Level 08: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on LedgerAuditTrails inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 33,
    "table": "LedgerAuditTrails",
    "scenario": "Execute deep query plan profiling on LedgerAuditTrails inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "LedgerAuditTrails(audit_id PK, user_id INT, row_checksum NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT user_id, SUM(row_checksum)\nFROM LedgerAuditTrails\nGROUP BY user_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT user_id, SUM(row_checksum)\nFROM LedgerAuditTrails\nGROUP BY user_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1209,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 09",
    "title": "Optimization: Level 09: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on SecuritiesOrders inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 33,
    "table": "SecuritiesOrders",
    "scenario": "Execute deep query plan profiling on SecuritiesOrders inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id INT, order_amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT client_id, SUM(order_amount)\nFROM SecuritiesOrders\nGROUP BY client_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT client_id, SUM(order_amount)\nFROM SecuritiesOrders\nGROUP BY client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1210,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 10",
    "title": "Optimization: Level 10: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on BankTransactions inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 34,
    "table": "BankTransactions",
    "scenario": "Execute deep query plan profiling on BankTransactions inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "BankTransactions(tx_id PK, account_id INT, amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT account_id, SUM(amount)\nFROM BankTransactions\nGROUP BY account_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT account_id, SUM(amount)\nFROM BankTransactions\nGROUP BY account_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1211,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 11",
    "title": "Optimization: Level 11: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CustomerInvoices inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 34,
    "table": "CustomerInvoices",
    "scenario": "Execute deep query plan profiling on CustomerInvoices inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id INT, invoice_total NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT customer_id, SUM(invoice_total)\nFROM CustomerInvoices\nGROUP BY customer_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT customer_id, SUM(invoice_total)\nFROM CustomerInvoices\nGROUP BY customer_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1212,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 12",
    "title": "Optimization: Level 12: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CryptoExecutions inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 34,
    "table": "CryptoExecutions",
    "scenario": "Execute deep query plan profiling on CryptoExecutions inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, wallet_id INT, fill_price NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT wallet_id, SUM(fill_price)\nFROM CryptoExecutions\nGROUP BY wallet_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT wallet_id, SUM(fill_price)\nFROM CryptoExecutions\nGROUP BY wallet_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1213,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 13",
    "title": "Optimization: Level 13: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CreditFacilities inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 35,
    "table": "CreditFacilities",
    "scenario": "Execute deep query plan profiling on CreditFacilities inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id INT, credit_limit NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT borrower_id, SUM(credit_limit)\nFROM CreditFacilities\nGROUP BY borrower_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT borrower_id, SUM(credit_limit)\nFROM CreditFacilities\nGROUP BY borrower_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1214,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 14",
    "title": "Optimization: Level 14: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on InsuranceClaims inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 35,
    "table": "InsuranceClaims",
    "scenario": "Execute deep query plan profiling on InsuranceClaims inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, policy_id INT, claim_amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT policy_id, SUM(claim_amount)\nFROM InsuranceClaims\nGROUP BY policy_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT policy_id, SUM(claim_amount)\nFROM InsuranceClaims\nGROUP BY policy_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1215,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 15",
    "title": "Optimization: Level 15: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on TreasuryYields inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 36,
    "table": "TreasuryYields",
    "scenario": "Execute deep query plan profiling on TreasuryYields inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip INT, yield_pct NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT bond_cusip, SUM(yield_pct)\nFROM TreasuryYields\nGROUP BY bond_cusip;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT bond_cusip, SUM(yield_pct)\nFROM TreasuryYields\nGROUP BY bond_cusip;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1216,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 16",
    "title": "Optimization: Level 16: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on LedgerAuditTrails inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 36,
    "table": "LedgerAuditTrails",
    "scenario": "Execute deep query plan profiling on LedgerAuditTrails inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "LedgerAuditTrails(audit_id PK, user_id INT, row_checksum NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT user_id, SUM(row_checksum)\nFROM LedgerAuditTrails\nGROUP BY user_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT user_id, SUM(row_checksum)\nFROM LedgerAuditTrails\nGROUP BY user_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1217,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 17",
    "title": "Optimization: Level 17: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on SecuritiesOrders inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 36,
    "table": "SecuritiesOrders",
    "scenario": "Execute deep query plan profiling on SecuritiesOrders inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id INT, order_amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT client_id, SUM(order_amount)\nFROM SecuritiesOrders\nGROUP BY client_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT client_id, SUM(order_amount)\nFROM SecuritiesOrders\nGROUP BY client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1218,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 18",
    "title": "Optimization: Level 18: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on BankTransactions inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 37,
    "table": "BankTransactions",
    "scenario": "Execute deep query plan profiling on BankTransactions inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "BankTransactions(tx_id PK, account_id INT, amount NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT account_id, SUM(amount)\nFROM BankTransactions\nGROUP BY account_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT account_id, SUM(amount)\nFROM BankTransactions\nGROUP BY account_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1219,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 19",
    "title": "Optimization: Level 19: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CustomerInvoices inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 37,
    "table": "CustomerInvoices",
    "scenario": "Execute deep query plan profiling on CustomerInvoices inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id INT, invoice_total NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT customer_id, SUM(invoice_total)\nFROM CustomerInvoices\nGROUP BY customer_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT customer_id, SUM(invoice_total)\nFROM CustomerInvoices\nGROUP BY customer_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1220,
    "discipline": "EXPLAIN ANALYZE & BUFFER COST PROFILING",
    "disciplineKey": "explain_analyze_cost",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "Optimization Lvl 20",
    "title": "Optimization: Level 20: Deep Cost & Buffer Profiling",
    "subtitle": "Execute deep query plan profiling on CryptoExecutions inspecting buffer hits and runtime.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (EXPLAIN ANALYZE & BUFFER COST PROFILING)",
    "subcluster": "EXPLAIN ANALYZE & BUFFER COST PROFILING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "xp": 38,
    "table": "CryptoExecutions",
    "scenario": "Execute deep query plan profiling on CryptoExecutions inspecting buffer hits and runtime.",
    "businessObjective": "Profile query execution with EXPLAIN ANALYZE and BUFFERS options.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, wallet_id INT, fill_price NUMERIC)",
    "targetQuery": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\nSELECT wallet_id, SUM(fill_price)\nFROM CryptoExecutions\nGROUP BY wallet_id;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ EXPLAIN COMMAND ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RUNTIME EXECUTION ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ BUFFER STATS ]"
      },
      {
        "text": ", VERBOSE)\nSELECT wallet_id, SUM(fill_price)\nFROM CryptoExecutions\nGROUP BY wallet_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXPLAIN",
        "options": [
          "EXPLAIN",
          "PROFILE",
          "OPTIMIZE",
          "INSPECT"
        ]
      },
      "slot2": {
        "correct": "ANALYZE",
        "options": [
          "ANALYZE",
          "EXECUTE",
          "TIMING",
          "BENCHMARK"
        ]
      },
      "slot3": {
        "correct": "BUFFERS",
        "options": [
          "BUFFERS",
          "MEMORY",
          "IO_STATS",
          "SHARED_HITS"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. EXPLAIN VS EXPLAIN ANALYZE MUTATION TRAP! EXPLAIN only prints the theoretical plan, but EXPLAIN ANALYZE ACTUALLY RUNS THE QUERY! Running EXPLAIN ANALYZE on a DELETE or UPDATE will mutate or wipe live database records!"
  },
  {
    "id": 1221,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 21",
    "title": "Optimization: Level 01: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column borrower_id from CreditFacilities.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 38,
    "table": "CreditFacilities",
    "scenario": "Filter high-selectivity lookup on indexed column borrower_id from CreditFacilities.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id INT INDEXED, credit_limit NUMERIC)",
    "targetQuery": "SELECT facility_id, credit_limit\nFROM CreditFacilities\nWHERE borrower_id = 40592;",
    "template": [
      {
        "text": "SELECT facility_id, credit_limit\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " CreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " borrower_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1222,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 22",
    "title": "Optimization: Level 02: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on InsuranceClaims allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 38,
    "table": "InsuranceClaims",
    "scenario": "Execute OR query on InsuranceClaims allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "InsuranceClaims(policy_id INDEXED, adjudication_status INDEXED)",
    "targetQuery": "SELECT claim_id\nFROM InsuranceClaims\nWHERE policy_id = 101\n   OR adjudication_status = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT claim_id\nFROM InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " policy_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1223,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 23",
    "title": "Optimization: Level 03: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column bond_cusip from TreasuryYields.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 39,
    "table": "TreasuryYields",
    "scenario": "Filter high-selectivity lookup on indexed column bond_cusip from TreasuryYields.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip INT INDEXED, yield_pct NUMERIC)",
    "targetQuery": "SELECT yield_id, yield_pct\nFROM TreasuryYields\nWHERE bond_cusip = 40592;",
    "template": [
      {
        "text": "SELECT yield_id, yield_pct\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " TreasuryYields\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " bond_cusip ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1224,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 24",
    "title": "Optimization: Level 04: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on LedgerAuditTrails allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 39,
    "table": "LedgerAuditTrails",
    "scenario": "Execute OR query on LedgerAuditTrails allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "LedgerAuditTrails(user_id INDEXED, event_type INDEXED)",
    "targetQuery": "SELECT audit_id\nFROM LedgerAuditTrails\nWHERE user_id = 101\n   OR event_type = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT audit_id\nFROM LedgerAuditTrails\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " user_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1225,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 25",
    "title": "Optimization: Level 05: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column client_id from SecuritiesOrders.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 40,
    "table": "SecuritiesOrders",
    "scenario": "Filter high-selectivity lookup on indexed column client_id from SecuritiesOrders.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id INT INDEXED, order_amount NUMERIC)",
    "targetQuery": "SELECT order_id, order_amount\nFROM SecuritiesOrders\nWHERE client_id = 40592;",
    "template": [
      {
        "text": "SELECT order_id, order_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " SecuritiesOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " client_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1226,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 26",
    "title": "Optimization: Level 06: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on BankTransactions allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 40,
    "table": "BankTransactions",
    "scenario": "Execute OR query on BankTransactions allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "BankTransactions(account_id INDEXED, transaction_type INDEXED)",
    "targetQuery": "SELECT tx_id\nFROM BankTransactions\nWHERE account_id = 101\n   OR transaction_type = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT tx_id\nFROM BankTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " account_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "transaction_type",
        "options": [
          "transaction_type",
          "amount",
          "tx_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1227,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 27",
    "title": "Optimization: Level 07: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column customer_id from CustomerInvoices.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 40,
    "table": "CustomerInvoices",
    "scenario": "Filter high-selectivity lookup on indexed column customer_id from CustomerInvoices.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id INT INDEXED, invoice_total NUMERIC)",
    "targetQuery": "SELECT invoice_id, invoice_total\nFROM CustomerInvoices\nWHERE customer_id = 40592;",
    "template": [
      {
        "text": "SELECT invoice_id, invoice_total\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " CustomerInvoices\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " customer_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1228,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 28",
    "title": "Optimization: Level 08: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on CryptoExecutions allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 41,
    "table": "CryptoExecutions",
    "scenario": "Execute OR query on CryptoExecutions allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "CryptoExecutions(wallet_id INDEXED, settlement_state INDEXED)",
    "targetQuery": "SELECT exec_id\nFROM CryptoExecutions\nWHERE wallet_id = 101\n   OR settlement_state = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT exec_id\nFROM CryptoExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " wallet_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "settlement_state",
        "options": [
          "settlement_state",
          "fill_price",
          "exec_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1229,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 29",
    "title": "Optimization: Level 09: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column borrower_id from CreditFacilities.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 41,
    "table": "CreditFacilities",
    "scenario": "Filter high-selectivity lookup on indexed column borrower_id from CreditFacilities.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id INT INDEXED, credit_limit NUMERIC)",
    "targetQuery": "SELECT facility_id, credit_limit\nFROM CreditFacilities\nWHERE borrower_id = 40592;",
    "template": [
      {
        "text": "SELECT facility_id, credit_limit\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " CreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " borrower_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1230,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 30",
    "title": "Optimization: Level 10: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on InsuranceClaims allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 42,
    "table": "InsuranceClaims",
    "scenario": "Execute OR query on InsuranceClaims allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "InsuranceClaims(policy_id INDEXED, adjudication_status INDEXED)",
    "targetQuery": "SELECT claim_id\nFROM InsuranceClaims\nWHERE policy_id = 101\n   OR adjudication_status = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT claim_id\nFROM InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " policy_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1231,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 31",
    "title": "Optimization: Level 11: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column bond_cusip from TreasuryYields.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 42,
    "table": "TreasuryYields",
    "scenario": "Filter high-selectivity lookup on indexed column bond_cusip from TreasuryYields.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip INT INDEXED, yield_pct NUMERIC)",
    "targetQuery": "SELECT yield_id, yield_pct\nFROM TreasuryYields\nWHERE bond_cusip = 40592;",
    "template": [
      {
        "text": "SELECT yield_id, yield_pct\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " TreasuryYields\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " bond_cusip ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1232,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 32",
    "title": "Optimization: Level 12: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on LedgerAuditTrails allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 42,
    "table": "LedgerAuditTrails",
    "scenario": "Execute OR query on LedgerAuditTrails allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "LedgerAuditTrails(user_id INDEXED, event_type INDEXED)",
    "targetQuery": "SELECT audit_id\nFROM LedgerAuditTrails\nWHERE user_id = 101\n   OR event_type = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT audit_id\nFROM LedgerAuditTrails\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " user_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1233,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 33",
    "title": "Optimization: Level 13: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column client_id from SecuritiesOrders.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 43,
    "table": "SecuritiesOrders",
    "scenario": "Filter high-selectivity lookup on indexed column client_id from SecuritiesOrders.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id INT INDEXED, order_amount NUMERIC)",
    "targetQuery": "SELECT order_id, order_amount\nFROM SecuritiesOrders\nWHERE client_id = 40592;",
    "template": [
      {
        "text": "SELECT order_id, order_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " SecuritiesOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " client_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1234,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 34",
    "title": "Optimization: Level 14: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on BankTransactions allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 43,
    "table": "BankTransactions",
    "scenario": "Execute OR query on BankTransactions allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "BankTransactions(account_id INDEXED, transaction_type INDEXED)",
    "targetQuery": "SELECT tx_id\nFROM BankTransactions\nWHERE account_id = 101\n   OR transaction_type = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT tx_id\nFROM BankTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " account_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "transaction_type",
        "options": [
          "transaction_type",
          "amount",
          "tx_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1235,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 35",
    "title": "Optimization: Level 15: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column customer_id from CustomerInvoices.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 44,
    "table": "CustomerInvoices",
    "scenario": "Filter high-selectivity lookup on indexed column customer_id from CustomerInvoices.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id INT INDEXED, invoice_total NUMERIC)",
    "targetQuery": "SELECT invoice_id, invoice_total\nFROM CustomerInvoices\nWHERE customer_id = 40592;",
    "template": [
      {
        "text": "SELECT invoice_id, invoice_total\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " CustomerInvoices\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " customer_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1236,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 36",
    "title": "Optimization: Level 16: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on CryptoExecutions allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 44,
    "table": "CryptoExecutions",
    "scenario": "Execute OR query on CryptoExecutions allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "CryptoExecutions(wallet_id INDEXED, settlement_state INDEXED)",
    "targetQuery": "SELECT exec_id\nFROM CryptoExecutions\nWHERE wallet_id = 101\n   OR settlement_state = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT exec_id\nFROM CryptoExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " wallet_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "settlement_state",
        "options": [
          "settlement_state",
          "fill_price",
          "exec_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1237,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 37",
    "title": "Optimization: Level 17: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column borrower_id from CreditFacilities.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 44,
    "table": "CreditFacilities",
    "scenario": "Filter high-selectivity lookup on indexed column borrower_id from CreditFacilities.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id INT INDEXED, credit_limit NUMERIC)",
    "targetQuery": "SELECT facility_id, credit_limit\nFROM CreditFacilities\nWHERE borrower_id = 40592;",
    "template": [
      {
        "text": "SELECT facility_id, credit_limit\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " CreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " borrower_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1238,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 38",
    "title": "Optimization: Level 18: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on InsuranceClaims allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 45,
    "table": "InsuranceClaims",
    "scenario": "Execute OR query on InsuranceClaims allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "InsuranceClaims(policy_id INDEXED, adjudication_status INDEXED)",
    "targetQuery": "SELECT claim_id\nFROM InsuranceClaims\nWHERE policy_id = 101\n   OR adjudication_status = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT claim_id\nFROM InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " policy_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1239,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 39",
    "title": "Optimization: Level 19: B-Tree Index Scan Path",
    "subtitle": "Filter high-selectivity lookup on indexed column bond_cusip from TreasuryYields.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "xp": 45,
    "table": "TreasuryYields",
    "scenario": "Filter high-selectivity lookup on indexed column bond_cusip from TreasuryYields.",
    "businessObjective": "Construct query triggering direct B-Tree Index Scan over heap table.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip INT INDEXED, yield_pct NUMERIC)",
    "targetQuery": "SELECT yield_id, yield_pct\nFROM TreasuryYields\nWHERE bond_cusip = 40592;",
    "template": [
      {
        "text": "SELECT yield_id, yield_pct\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FROM TABLE ]"
      },
      {
        "text": " TreasuryYields\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PREDICATE ]"
      },
      {
        "text": " bond_cusip ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUALITY OPERATOR ]"
      },
      {
        "text": " 40592;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "USING",
          "OF"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          "IS",
          "LIKE",
          "IN"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1240,
    "discipline": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP)",
    "disciplineKey": "sequential_vs_index_scans",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 40",
    "title": "Optimization: Level 20: Disjunctive Bitmap Index Scan",
    "subtitle": "Execute OR query on LedgerAuditTrails allowing optimizer to execute BitmapOr combination.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP))",
    "subcluster": "SCAN ARCHETYPES (SEQ vs INDEX vs BITMAP) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "xp": 46,
    "table": "LedgerAuditTrails",
    "scenario": "Execute OR query on LedgerAuditTrails allowing optimizer to execute BitmapOr combination.",
    "businessObjective": "Write disjunctive predicate combining two index scans via BitmapOr.",
    "schemaSnippet": "LedgerAuditTrails(user_id INDEXED, event_type INDEXED)",
    "targetQuery": "SELECT audit_id\nFROM LedgerAuditTrails\nWHERE user_id = 101\n   OR event_type = 'EXPEDITED';",
    "template": [
      {
        "text": "SELECT audit_id\nFROM LedgerAuditTrails\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " user_id = 101\n   ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DISJUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL VALUE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "UNION",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "client_tier"
        ]
      },
      "slot4": {
        "correct": "'EXPEDITED'",
        "options": [
          "'EXPEDITED'",
          "101",
          "TRUE",
          "NULL"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. INDEX-ONLY SCAN VISIBILITY TRAP! An Index Only Scan CANNOT return data directly from the index without reading the heap table unless the target pages are marked ALL-VISIBLE in the table visibility map (requires VACUUM)!"
  },
  {
    "id": 1241,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 41",
    "title": "Optimization: Level 01: Hash Join Equi-Predicate",
    "subtitle": "Join large unsorted dataset on equality key allowing in-memory hash table build.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Perform equi-join on primary foreign key enabling Hash Join execution.",
    "xp": 46,
    "table": "SecuritiesOrders",
    "scenario": "Join large unsorted dataset on equality key allowing in-memory hash table build.",
    "businessObjective": "Perform equi-join on primary foreign key enabling Hash Join execution.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id FK) JOIN Clients(client_id PK)",
    "targetQuery": "SELECT t.order_id, c.client_name\nFROM SecuritiesOrders t\nINNER JOIN Clients c\n  ON t.client_id = c.client_id;",
    "template": [
      {
        "text": "SELECT t.order_id, c.client_name\nFROM SecuritiesOrders t\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ JOIN TYPE ]"
      },
      {
        "text": " Clients c\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ON CLAUSE ]"
      },
      {
        "text": " t.client_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUI OPERATOR ]"
      },
      {
        "text": " c.client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INNER JOIN",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "NATURAL JOIN",
          "UNION"
        ]
      },
      "slot2": {
        "correct": "ON",
        "options": [
          "ON",
          "USING",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          ">=",
          "<>",
          "LIKE"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1242,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 42",
    "title": "Optimization: Level 02: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 46,
    "table": "BankTransactions",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1243,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 43",
    "title": "Optimization: Level 03: Hash Join Equi-Predicate",
    "subtitle": "Join large unsorted dataset on equality key allowing in-memory hash table build.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Perform equi-join on primary foreign key enabling Hash Join execution.",
    "xp": 47,
    "table": "CustomerInvoices",
    "scenario": "Join large unsorted dataset on equality key allowing in-memory hash table build.",
    "businessObjective": "Perform equi-join on primary foreign key enabling Hash Join execution.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id FK) JOIN Clients(client_id PK)",
    "targetQuery": "SELECT t.invoice_id, c.client_name\nFROM CustomerInvoices t\nINNER JOIN Clients c\n  ON t.customer_id = c.client_id;",
    "template": [
      {
        "text": "SELECT t.invoice_id, c.client_name\nFROM CustomerInvoices t\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ JOIN TYPE ]"
      },
      {
        "text": " Clients c\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ON CLAUSE ]"
      },
      {
        "text": " t.customer_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUI OPERATOR ]"
      },
      {
        "text": " c.client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INNER JOIN",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "NATURAL JOIN",
          "UNION"
        ]
      },
      "slot2": {
        "correct": "ON",
        "options": [
          "ON",
          "USING",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          ">=",
          "<>",
          "LIKE"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1244,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 44",
    "title": "Optimization: Level 04: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 47,
    "table": "CryptoExecutions",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1245,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 45",
    "title": "Optimization: Level 05: Hash Join Equi-Predicate",
    "subtitle": "Join large unsorted dataset on equality key allowing in-memory hash table build.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Perform equi-join on primary foreign key enabling Hash Join execution.",
    "xp": 48,
    "table": "CreditFacilities",
    "scenario": "Join large unsorted dataset on equality key allowing in-memory hash table build.",
    "businessObjective": "Perform equi-join on primary foreign key enabling Hash Join execution.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id FK) JOIN Clients(client_id PK)",
    "targetQuery": "SELECT t.facility_id, c.client_name\nFROM CreditFacilities t\nINNER JOIN Clients c\n  ON t.borrower_id = c.client_id;",
    "template": [
      {
        "text": "SELECT t.facility_id, c.client_name\nFROM CreditFacilities t\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ JOIN TYPE ]"
      },
      {
        "text": " Clients c\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ON CLAUSE ]"
      },
      {
        "text": " t.borrower_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EQUI OPERATOR ]"
      },
      {
        "text": " c.client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INNER JOIN",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "NATURAL JOIN",
          "UNION"
        ]
      },
      "slot2": {
        "correct": "ON",
        "options": [
          "ON",
          "USING",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "=",
        "options": [
          "=",
          ">=",
          "<>",
          "LIKE"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1246,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 46",
    "title": "Optimization: Level 06: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 48,
    "table": "InsuranceClaims",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1247,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 47",
    "title": "Optimization: Level 07: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 48,
    "table": "TreasuryYields",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1248,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 48",
    "title": "Optimization: Level 08: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 49,
    "table": "LedgerAuditTrails",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1249,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 49",
    "title": "Optimization: Level 09: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 49,
    "table": "SecuritiesOrders",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1250,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 50",
    "title": "Optimization: Level 10: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 50,
    "table": "BankTransactions",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1251,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 51",
    "title": "Optimization: Level 11: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 50,
    "table": "CustomerInvoices",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1252,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 52",
    "title": "Optimization: Level 12: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 50,
    "table": "CryptoExecutions",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1253,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 53",
    "title": "Optimization: Level 13: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 51,
    "table": "CreditFacilities",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1254,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 54",
    "title": "Optimization: Level 14: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 51,
    "table": "InsuranceClaims",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1255,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 55",
    "title": "Optimization: Level 15: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 52,
    "table": "TreasuryYields",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1256,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 56",
    "title": "Optimization: Level 16: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 52,
    "table": "LedgerAuditTrails",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1257,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 57",
    "title": "Optimization: Level 17: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 52,
    "table": "SecuritiesOrders",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1258,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 58",
    "title": "Optimization: Level 18: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 53,
    "table": "BankTransactions",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1259,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 59",
    "title": "Optimization: Level 19: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 53,
    "table": "CustomerInvoices",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1260,
    "discipline": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE)",
    "disciplineKey": "join_execution_engines",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 60",
    "title": "Optimization: Level 20: Session Work Memory Tuning",
    "subtitle": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE))",
    "subcluster": "PHYSICAL JOIN ALGORITHMS (NESTED LOOP vs HASH vs MERGE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Configure local work_mem parameter for complex analytics query.",
    "xp": 54,
    "table": "CryptoExecutions",
    "scenario": "Increase session work_mem to prevent Hash Join spilling to temporary disk files.",
    "businessObjective": "Configure local work_mem parameter for complex analytics query.",
    "schemaSnippet": "SESSION CONFIG (Tuning memory for hash table allocation)",
    "targetQuery": "SET work_mem = '256MB';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SESSION SET ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MEMORY PARAMETER ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MEMORY ALLOCATION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SET",
        "options": [
          "SET",
          "ALTER",
          "UPDATE",
          "CONFIG"
        ]
      },
      "slot2": {
        "correct": "work_mem",
        "options": [
          "work_mem",
          "shared_buffers",
          "maintenance_work_mem",
          "max_memory"
        ]
      },
      "slot3": {
        "correct": "'256MB'",
        "options": [
          "'256MB'",
          "'10GB'",
          "'DEFAULT'",
          "'AUTO'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. HASH JOIN WORK_MEM DISK SPILL TRAP! If a Hash Join build table exceeds available work_mem, PostgreSQL silently spills hash batches to temporary files on disk (Batches > 1), causing a 10x-100x latency cliff!"
  },
  {
    "id": 1261,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 61",
    "title": "Optimization: Level 01: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 54,
    "table": "CreditFacilities",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id, risk_tier)",
    "targetQuery": "CREATE INDEX idx_CreditFacilities_Active\nON CreditFacilities (borrower_id)\nWHERE risk_tier = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_CreditFacilities_Active\nON CreditFacilities (borrower_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "risk_tier",
        "options": [
          "risk_tier",
          "credit_limit",
          "facility_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1262,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 62",
    "title": "Optimization: Level 02: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 54,
    "table": "InsuranceClaims",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, policy_id, adjudication_status)",
    "targetQuery": "CREATE INDEX idx_InsuranceClaims_Active\nON InsuranceClaims (policy_id)\nWHERE adjudication_status = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_InsuranceClaims_Active\nON InsuranceClaims (policy_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1263,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 63",
    "title": "Optimization: Level 03: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 55,
    "table": "TreasuryYields",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip, curve_segment)",
    "targetQuery": "CREATE INDEX idx_TreasuryYields_Active\nON TreasuryYields (bond_cusip)\nWHERE curve_segment = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_TreasuryYields_Active\nON TreasuryYields (bond_cusip)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "curve_segment",
        "options": [
          "curve_segment",
          "yield_pct",
          "yield_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1264,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 64",
    "title": "Optimization: Level 04: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 55,
    "table": "LedgerAuditTrails",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "LedgerAuditTrails(audit_id PK, user_id, event_type)",
    "targetQuery": "CREATE INDEX idx_LedgerAuditTrails_Active\nON LedgerAuditTrails (user_id)\nWHERE event_type = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_LedgerAuditTrails_Active\nON LedgerAuditTrails (user_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1265,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 65",
    "title": "Optimization: Level 05: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 56,
    "table": "SecuritiesOrders",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id, order_status)",
    "targetQuery": "CREATE INDEX idx_SecuritiesOrders_Active\nON SecuritiesOrders (client_id)\nWHERE order_status = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_SecuritiesOrders_Active\nON SecuritiesOrders (client_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "order_status",
        "options": [
          "order_status",
          "order_amount",
          "order_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1266,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 66",
    "title": "Optimization: Level 06: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 56,
    "table": "BankTransactions",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "BankTransactions(tx_id PK, account_id, transaction_type)",
    "targetQuery": "CREATE INDEX idx_BankTransactions_Active\nON BankTransactions (account_id)\nWHERE transaction_type = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_BankTransactions_Active\nON BankTransactions (account_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "transaction_type",
        "options": [
          "transaction_type",
          "amount",
          "tx_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1267,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 67",
    "title": "Optimization: Level 07: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 56,
    "table": "CustomerInvoices",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id, payment_status)",
    "targetQuery": "CREATE INDEX idx_CustomerInvoices_Active\nON CustomerInvoices (customer_id)\nWHERE payment_status = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_CustomerInvoices_Active\nON CustomerInvoices (customer_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "payment_status",
        "options": [
          "payment_status",
          "invoice_total",
          "invoice_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1268,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 68",
    "title": "Optimization: Level 08: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 57,
    "table": "CryptoExecutions",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, wallet_id, settlement_state)",
    "targetQuery": "CREATE INDEX idx_CryptoExecutions_Active\nON CryptoExecutions (wallet_id)\nWHERE settlement_state = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_CryptoExecutions_Active\nON CryptoExecutions (wallet_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "settlement_state",
        "options": [
          "settlement_state",
          "fill_price",
          "exec_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1269,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 69",
    "title": "Optimization: Level 09: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 57,
    "table": "CreditFacilities",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id, risk_tier)",
    "targetQuery": "CREATE INDEX idx_CreditFacilities_Active\nON CreditFacilities (borrower_id)\nWHERE risk_tier = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_CreditFacilities_Active\nON CreditFacilities (borrower_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "risk_tier",
        "options": [
          "risk_tier",
          "credit_limit",
          "facility_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1270,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 70",
    "title": "Optimization: Level 10: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 58,
    "table": "InsuranceClaims",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, policy_id, adjudication_status)",
    "targetQuery": "CREATE INDEX idx_InsuranceClaims_Active\nON InsuranceClaims (policy_id)\nWHERE adjudication_status = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_InsuranceClaims_Active\nON InsuranceClaims (policy_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1271,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 71",
    "title": "Optimization: Level 11: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 58,
    "table": "TreasuryYields",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip, curve_segment)",
    "targetQuery": "CREATE INDEX idx_TreasuryYields_Active\nON TreasuryYields (bond_cusip)\nWHERE curve_segment = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_TreasuryYields_Active\nON TreasuryYields (bond_cusip)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "curve_segment",
        "options": [
          "curve_segment",
          "yield_pct",
          "yield_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1272,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 72",
    "title": "Optimization: Level 12: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 58,
    "table": "LedgerAuditTrails",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "LedgerAuditTrails(audit_id PK, user_id, event_type)",
    "targetQuery": "CREATE INDEX idx_LedgerAuditTrails_Active\nON LedgerAuditTrails (user_id)\nWHERE event_type = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_LedgerAuditTrails_Active\nON LedgerAuditTrails (user_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1273,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 73",
    "title": "Optimization: Level 13: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 59,
    "table": "SecuritiesOrders",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, client_id, order_status)",
    "targetQuery": "CREATE INDEX idx_SecuritiesOrders_Active\nON SecuritiesOrders (client_id)\nWHERE order_status = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_SecuritiesOrders_Active\nON SecuritiesOrders (client_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "order_status",
        "options": [
          "order_status",
          "order_amount",
          "order_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1274,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 74",
    "title": "Optimization: Level 14: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 59,
    "table": "BankTransactions",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "BankTransactions(tx_id PK, account_id, transaction_type)",
    "targetQuery": "CREATE INDEX idx_BankTransactions_Active\nON BankTransactions (account_id)\nWHERE transaction_type = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_BankTransactions_Active\nON BankTransactions (account_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "transaction_type",
        "options": [
          "transaction_type",
          "amount",
          "tx_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1275,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "Optimization Lvl 75",
    "title": "Optimization: Level 15: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 60,
    "table": "CustomerInvoices",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, customer_id, payment_status)",
    "targetQuery": "CREATE INDEX idx_CustomerInvoices_Active\nON CustomerInvoices (customer_id)\nWHERE payment_status = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_CustomerInvoices_Active\nON CustomerInvoices (customer_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "payment_status",
        "options": [
          "payment_status",
          "invoice_total",
          "invoice_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1276,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 76",
    "title": "Optimization: Level 16: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 60,
    "table": "CryptoExecutions",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, wallet_id, settlement_state)",
    "targetQuery": "CREATE INDEX idx_CryptoExecutions_Active\nON CryptoExecutions (wallet_id)\nWHERE settlement_state = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_CryptoExecutions_Active\nON CryptoExecutions (wallet_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "settlement_state",
        "options": [
          "settlement_state",
          "fill_price",
          "exec_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1277,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 77",
    "title": "Optimization: Level 17: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 60,
    "table": "CreditFacilities",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "CreditFacilities(facility_id PK, borrower_id, risk_tier)",
    "targetQuery": "CREATE INDEX idx_CreditFacilities_Active\nON CreditFacilities (borrower_id)\nWHERE risk_tier = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_CreditFacilities_Active\nON CreditFacilities (borrower_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "risk_tier",
        "options": [
          "risk_tier",
          "credit_limit",
          "facility_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1278,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 78",
    "title": "Optimization: Level 18: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 61,
    "table": "InsuranceClaims",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, policy_id, adjudication_status)",
    "targetQuery": "CREATE INDEX idx_InsuranceClaims_Active\nON InsuranceClaims (policy_id)\nWHERE adjudication_status = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_InsuranceClaims_Active\nON InsuranceClaims (policy_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1279,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 79",
    "title": "Optimization: Level 19: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 61,
    "table": "TreasuryYields",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "TreasuryYields(yield_id PK, bond_cusip, curve_segment)",
    "targetQuery": "CREATE INDEX idx_TreasuryYields_Active\nON TreasuryYields (bond_cusip)\nWHERE curve_segment = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_TreasuryYields_Active\nON TreasuryYields (bond_cusip)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "curve_segment",
        "options": [
          "curve_segment",
          "yield_pct",
          "yield_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1280,
    "discipline": "INDEX ARCHITECTURES & COVERING CLAUSES",
    "disciplineKey": "index_architecture_optimization",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 80",
    "title": "Optimization: Level 20: Partial Index for High-Value Subset",
    "subtitle": "Construct lightweight partial index on active records, ignoring historical archives.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (INDEX ARCHITECTURES & COVERING CLAUSES)",
    "subcluster": "INDEX ARCHITECTURES & COVERING CLAUSES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create partial index using WHERE predicate filter.",
    "xp": 62,
    "table": "LedgerAuditTrails",
    "scenario": "Construct lightweight partial index on active records, ignoring historical archives.",
    "businessObjective": "Create partial index using WHERE predicate filter.",
    "schemaSnippet": "LedgerAuditTrails(audit_id PK, user_id, event_type)",
    "targetQuery": "CREATE INDEX idx_LedgerAuditTrails_Active\nON LedgerAuditTrails (user_id)\nWHERE event_type = 'ACTIVE';",
    "template": [
      {
        "text": "CREATE INDEX idx_LedgerAuditTrails_Active\nON LedgerAuditTrails (user_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FILTER COLUMN ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TARGET STATUS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "row_id"
        ]
      },
      "slot3": {
        "correct": "'ACTIVE'",
        "options": [
          "'ACTIVE'",
          "'ARCHIVED'",
          "'NULL'",
          "'PENDING'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. COMPOSITE INDEX LEADING COLUMN TRAP! A composite B-Tree index on (client_id, trade_date) CANNOT be used efficiently if the query filters ONLY on trade_date! The query MUST filter on the leading index column(s)!"
  },
  {
    "id": 1281,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 81",
    "title": "Optimization: Level 01: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 62,
    "table": "SecuritiesOrders",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, order_status VARCHAR INDEXED)",
    "targetQuery": "SELECT order_id\nFROM SecuritiesOrders\nWHERE order_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT order_id\nFROM SecuritiesOrders\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "order_status",
        "options": [
          "order_status",
          "order_amount",
          "order_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1282,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 82",
    "title": "Optimization: Level 02: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 62,
    "table": "BankTransactions",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "BankTransactions(tx_id PK, transaction_type VARCHAR INDEXED)",
    "targetQuery": "SELECT tx_id\nFROM BankTransactions\nWHERE transaction_type LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT tx_id\nFROM BankTransactions\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "transaction_type",
        "options": [
          "transaction_type",
          "amount",
          "tx_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1283,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 83",
    "title": "Optimization: Level 03: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 63,
    "table": "CustomerInvoices",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, payment_status VARCHAR INDEXED)",
    "targetQuery": "SELECT invoice_id\nFROM CustomerInvoices\nWHERE payment_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT invoice_id\nFROM CustomerInvoices\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "payment_status",
        "options": [
          "payment_status",
          "invoice_total",
          "invoice_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1284,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 84",
    "title": "Optimization: Level 04: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 63,
    "table": "CryptoExecutions",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, settlement_state VARCHAR INDEXED)",
    "targetQuery": "SELECT exec_id\nFROM CryptoExecutions\nWHERE settlement_state LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT exec_id\nFROM CryptoExecutions\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "settlement_state",
        "options": [
          "settlement_state",
          "fill_price",
          "exec_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1285,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 85",
    "title": "Optimization: Level 05: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 64,
    "table": "CreditFacilities",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CreditFacilities(facility_id PK, risk_tier VARCHAR INDEXED)",
    "targetQuery": "SELECT facility_id\nFROM CreditFacilities\nWHERE risk_tier LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT facility_id\nFROM CreditFacilities\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "risk_tier",
        "options": [
          "risk_tier",
          "credit_limit",
          "facility_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1286,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 86",
    "title": "Optimization: Level 06: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 64,
    "table": "InsuranceClaims",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, adjudication_status VARCHAR INDEXED)",
    "targetQuery": "SELECT claim_id\nFROM InsuranceClaims\nWHERE adjudication_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT claim_id\nFROM InsuranceClaims\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1287,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 87",
    "title": "Optimization: Level 07: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 64,
    "table": "TreasuryYields",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "TreasuryYields(yield_id PK, curve_segment VARCHAR INDEXED)",
    "targetQuery": "SELECT yield_id\nFROM TreasuryYields\nWHERE curve_segment LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT yield_id\nFROM TreasuryYields\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "curve_segment",
        "options": [
          "curve_segment",
          "yield_pct",
          "yield_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1288,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 88",
    "title": "Optimization: Level 08: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 65,
    "table": "LedgerAuditTrails",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "LedgerAuditTrails(audit_id PK, event_type VARCHAR INDEXED)",
    "targetQuery": "SELECT audit_id\nFROM LedgerAuditTrails\nWHERE event_type LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT audit_id\nFROM LedgerAuditTrails\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1289,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 89",
    "title": "Optimization: Level 09: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 65,
    "table": "SecuritiesOrders",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, order_status VARCHAR INDEXED)",
    "targetQuery": "SELECT order_id\nFROM SecuritiesOrders\nWHERE order_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT order_id\nFROM SecuritiesOrders\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "order_status",
        "options": [
          "order_status",
          "order_amount",
          "order_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1290,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 90",
    "title": "Optimization: Level 10: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 66,
    "table": "BankTransactions",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "BankTransactions(tx_id PK, transaction_type VARCHAR INDEXED)",
    "targetQuery": "SELECT tx_id\nFROM BankTransactions\nWHERE transaction_type LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT tx_id\nFROM BankTransactions\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "transaction_type",
        "options": [
          "transaction_type",
          "amount",
          "tx_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1291,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 91",
    "title": "Optimization: Level 11: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 66,
    "table": "CustomerInvoices",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, payment_status VARCHAR INDEXED)",
    "targetQuery": "SELECT invoice_id\nFROM CustomerInvoices\nWHERE payment_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT invoice_id\nFROM CustomerInvoices\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "payment_status",
        "options": [
          "payment_status",
          "invoice_total",
          "invoice_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1292,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 92",
    "title": "Optimization: Level 12: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 66,
    "table": "CryptoExecutions",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, settlement_state VARCHAR INDEXED)",
    "targetQuery": "SELECT exec_id\nFROM CryptoExecutions\nWHERE settlement_state LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT exec_id\nFROM CryptoExecutions\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "settlement_state",
        "options": [
          "settlement_state",
          "fill_price",
          "exec_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1293,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 93",
    "title": "Optimization: Level 13: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 67,
    "table": "CreditFacilities",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CreditFacilities(facility_id PK, risk_tier VARCHAR INDEXED)",
    "targetQuery": "SELECT facility_id\nFROM CreditFacilities\nWHERE risk_tier LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT facility_id\nFROM CreditFacilities\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "risk_tier",
        "options": [
          "risk_tier",
          "credit_limit",
          "facility_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1294,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 94",
    "title": "Optimization: Level 14: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 67,
    "table": "InsuranceClaims",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, adjudication_status VARCHAR INDEXED)",
    "targetQuery": "SELECT claim_id\nFROM InsuranceClaims\nWHERE adjudication_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT claim_id\nFROM InsuranceClaims\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "adjudication_status",
        "options": [
          "adjudication_status",
          "claim_amount",
          "claim_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1295,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 95",
    "title": "Optimization: Level 15: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 68,
    "table": "TreasuryYields",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "TreasuryYields(yield_id PK, curve_segment VARCHAR INDEXED)",
    "targetQuery": "SELECT yield_id\nFROM TreasuryYields\nWHERE curve_segment LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT yield_id\nFROM TreasuryYields\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "curve_segment",
        "options": [
          "curve_segment",
          "yield_pct",
          "yield_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1296,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 96",
    "title": "Optimization: Level 16: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 68,
    "table": "LedgerAuditTrails",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "LedgerAuditTrails(audit_id PK, event_type VARCHAR INDEXED)",
    "targetQuery": "SELECT audit_id\nFROM LedgerAuditTrails\nWHERE event_type LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT audit_id\nFROM LedgerAuditTrails\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "event_type",
        "options": [
          "event_type",
          "row_checksum",
          "audit_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1297,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 97",
    "title": "Optimization: Level 17: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 68,
    "table": "SecuritiesOrders",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "SecuritiesOrders(order_id PK, order_status VARCHAR INDEXED)",
    "targetQuery": "SELECT order_id\nFROM SecuritiesOrders\nWHERE order_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT order_id\nFROM SecuritiesOrders\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "order_status",
        "options": [
          "order_status",
          "order_amount",
          "order_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1298,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 98",
    "title": "Optimization: Level 18: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 69,
    "table": "BankTransactions",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "BankTransactions(tx_id PK, transaction_type VARCHAR INDEXED)",
    "targetQuery": "SELECT tx_id\nFROM BankTransactions\nWHERE transaction_type LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT tx_id\nFROM BankTransactions\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "transaction_type",
        "options": [
          "transaction_type",
          "amount",
          "tx_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1299,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 99",
    "title": "Optimization: Level 19: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 69,
    "table": "CustomerInvoices",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, payment_status VARCHAR INDEXED)",
    "targetQuery": "SELECT invoice_id\nFROM CustomerInvoices\nWHERE payment_status LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT invoice_id\nFROM CustomerInvoices\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "payment_status",
        "options": [
          "payment_status",
          "invoice_total",
          "invoice_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  },
  {
    "id": 1300,
    "discipline": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS",
    "disciplineKey": "query_tuning_antipatterns",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "Optimization Lvl 100",
    "title": "Optimization: Level 20: Prefix SARGable Pattern Matching",
    "subtitle": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "type": "fill_blank",
    "category": "Section 13: Query Optimization (SARGABILITY & PREDICATE TUNING ANTI-PATTERNS)",
    "subcluster": "SARGABILITY & PREDICATE TUNING ANTI-PATTERNS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "xp": 70,
    "table": "CryptoExecutions",
    "scenario": "Ensure text search uses index-friendly prefix wildcard instead of leading wildcard.",
    "businessObjective": "Write SARGable LIKE prefix pattern enabling B-Tree range search.",
    "schemaSnippet": "CryptoExecutions(exec_id PK, settlement_state VARCHAR INDEXED)",
    "targetQuery": "SELECT exec_id\nFROM CryptoExecutions\nWHERE settlement_state LIKE 'SETTLE%';",
    "template": [
      {
        "text": "SELECT exec_id\nFROM CryptoExecutions\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INDEXED COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PATTERN OPERATOR ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PREFIX PATTERN ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "settlement_state",
        "options": [
          "settlement_state",
          "fill_price",
          "exec_id",
          "client_name"
        ]
      },
      "slot2": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "SIMILAR TO",
          "MATCHES",
          "CONTAINS"
        ]
      },
      "slot3": {
        "correct": "'SETTLE%'",
        "options": [
          "'SETTLE%'",
          "'%SETTLE%'",
          "'%SETTLE'",
          "'*SETTLE*'"
        ]
      }
    },
    "explanation": "Query optimization requires understanding the planner cost model, access methods, join algorithms, and SARGability. FUNCTION WRAPPING SARGABILITY TRAP! Wrapping an indexed column inside a scalar function (e.g. UPPER(email), YEAR(tx_date), or col + 10) blinds the B-Tree index, forcing the optimizer into a full sequential table scan!"
  }
];
