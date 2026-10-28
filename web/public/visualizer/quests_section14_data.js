// SECTION 14: CLOUD DATA WAREHOUSES & MODERN SQL (SNOWFLAKE, BIGQUERY, DUCKDB, QUALIFY)
// 100 Master Quests across 5 Core Modern Analytical Disciplines (20 Quests Each)

window.WAREHOUSE_DISCIPLINES_METADATA = [
  {
    "key": "qualify_window_filtering",
    "name": "QUALIFY WINDOW FILTERING SUPERPOWER",
    "symbol": "⚡",
    "color": "#38bdf8",
    "concept": "Filtering Window Results Inline (Snowflake / BigQuery / DuckDB / Databricks)",
    "whenToUse": "Deduplicating rows, keeping latest transaction per account, or top-N ranking without nested subqueries.",
    "scenarios": "FinTech customer ledger deduplication, finding the latest credit risk score, latest quote per ticker.",
    "traps": "QUALIFY is native in Snowflake, BigQuery, DuckDB, but does NOT exist in PostgreSQL/MySQL without a subquery!"
  },
  {
    "key": "partition_pruning_clustering",
    "name": "PARTITION PRUNING & CLUSTERING KEYS",
    "symbol": "🧊",
    "color": "#10b981",
    "concept": "Scanning Only Relevant Date Blocks in 100TB+ Data Warehouses",
    "whenToUse": "High-throughput petabyte analytics where scanning entire tables costs thousands of dollars per query.",
    "scenarios": "BigQuery _PARTITIONDATE pruning on 50TB transaction logs; Snowflake micro-partition pruning via clustering keys.",
    "traps": "Wrapping partition columns in scalar functions (e.g. DATE_ADD(created_at, ...)) destroys pruning and forces a full petabyte scan!"
  },
  {
    "key": "time_travel_zero_copy",
    "name": "TIME TRAVEL & ZERO-COPY CLONING",
    "symbol": "⏳",
    "color": "#f59e0b",
    "concept": "Point-in-Time Historical Auditing & Instant Metadata-Only Cloning",
    "whenToUse": "Restoring accidentally deleted records, recreating exact month-end financial snapshots before adjustments.",
    "scenarios": "Snowflake AT (TIMESTAMP => ...) or BEFORE (STATEMENT => ...), BigQuery FOR SYSTEM_TIME AS OF, zero-copy CLONE.",
    "traps": "Exceeding the cloud retention window (1 to 90 days); time-travel queries fail if data has moved to Fail-safe storage."
  },
  {
    "key": "approximate_aggregations",
    "name": "PROBABILISTIC & APPROXIMATE ANALYTICS",
    "symbol": "📊",
    "color": "#ec4899",
    "concept": "HyperLogLog & Approximate Quantiles for Sub-Second Analytics on Billions of Rows",
    "whenToUse": "Computing unique transacting devices or median latency on billions of events where ~1% error is acceptable.",
    "scenarios": "APPROX_COUNT_DISTINCT(), HLL_COUNT.MERGE(), APPROX_QUANTILES(margin_pct, 100), APPROX_TOP_K().",
    "traps": "APPROX functions are probabilistic! Never use APPROX_COUNT_DISTINCT for regulatory financial balance sheets or tax filings."
  },
  {
    "key": "parquet_lakehouse_duckdb",
    "name": "PARQUET LAKEHOUSE & ZERO-COPY DUCKDB",
    "symbol": "🦆",
    "color": "#a855f7",
    "concept": "Querying Compressed Columnar Parquet Files Directly Without Database Ingestion",
    "whenToUse": "Quantitative research on trade tick files, querying S3/GCS data lake files in-situ with projection pushdown.",
    "scenarios": "DuckDB read_parquet(\"s3://trades/*.parquet\"), COPY ... TO \"export.parquet\", filter pushdown on statistics.",
    "traps": "Wildcard globbing directories with inconsistent Parquet schemas or missing partition directory conventions."
  }
];

window.QUESTS_SECTION_14 = [
  {
    "id": 14001,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 1: Deduplicate Latest CustomerPortfolios via ROW_NUMBER()",
    "difficulty": "Easy",
    "description": "In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.",
    "table": "CustomerPortfolios",
    "template": [
      {
        "text": "SELECT account_id, tx_id, tx_timestamp, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp "
      },
      {
        "isBlank": true,
        "slotId": "order_dir",
        "placeholder": "<direction>"
      },
      {
        "text": "\n) = "
      },
      {
        "isBlank": true,
        "slotId": "rank_val",
        "placeholder": "<rank_n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CustomerPortfolios",
        "options": [
          "CustomerPortfolios",
          "AuditLogs",
          "DimAccounts",
          "TempLedger"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "order_dir": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "NULLS FIRST",
          "LIMIT 1"
        ]
      },
      "rank_val": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "ALL",
          "TOP"
        ]
      }
    },
    "explanation": "QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!"
  },
  {
    "id": 14002,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 2: Deduplicate Latest OrderFills via ROW_NUMBER()",
    "difficulty": "Easy",
    "description": "In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.",
    "table": "OrderFills",
    "template": [
      {
        "text": "SELECT account_id, tx_id, tx_timestamp, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp "
      },
      {
        "isBlank": true,
        "slotId": "order_dir",
        "placeholder": "<direction>"
      },
      {
        "text": "\n) = "
      },
      {
        "isBlank": true,
        "slotId": "rank_val",
        "placeholder": "<rank_n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "OrderFills",
        "options": [
          "OrderFills",
          "AuditLogs",
          "DimAccounts",
          "TempLedger"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "order_dir": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "NULLS FIRST",
          "LIMIT 1"
        ]
      },
      "rank_val": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "ALL",
          "TOP"
        ]
      }
    },
    "explanation": "QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!"
  },
  {
    "id": 14003,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 3: Deduplicate Latest MarketTicks via ROW_NUMBER()",
    "difficulty": "Easy",
    "description": "In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.",
    "table": "MarketTicks",
    "template": [
      {
        "text": "SELECT account_id, tx_id, tx_timestamp, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp "
      },
      {
        "isBlank": true,
        "slotId": "order_dir",
        "placeholder": "<direction>"
      },
      {
        "text": "\n) = "
      },
      {
        "isBlank": true,
        "slotId": "rank_val",
        "placeholder": "<rank_n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketTicks",
        "options": [
          "MarketTicks",
          "AuditLogs",
          "DimAccounts",
          "TempLedger"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "order_dir": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "NULLS FIRST",
          "LIMIT 1"
        ]
      },
      "rank_val": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "ALL",
          "TOP"
        ]
      }
    },
    "explanation": "QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!"
  },
  {
    "id": 14004,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 4: Deduplicate Latest CreditRiskLogs via ROW_NUMBER()",
    "difficulty": "Easy",
    "description": "In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.",
    "table": "CreditRiskLogs",
    "template": [
      {
        "text": "SELECT account_id, tx_id, tx_timestamp, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp "
      },
      {
        "isBlank": true,
        "slotId": "order_dir",
        "placeholder": "<direction>"
      },
      {
        "text": "\n) = "
      },
      {
        "isBlank": true,
        "slotId": "rank_val",
        "placeholder": "<rank_n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CreditRiskLogs",
        "options": [
          "CreditRiskLogs",
          "AuditLogs",
          "DimAccounts",
          "TempLedger"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "order_dir": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "NULLS FIRST",
          "LIMIT 1"
        ]
      },
      "rank_val": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "ALL",
          "TOP"
        ]
      }
    },
    "explanation": "QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!"
  },
  {
    "id": 14005,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 5: Deduplicate Latest Transactions via ROW_NUMBER()",
    "difficulty": "Easy",
    "description": "In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.",
    "table": "Transactions",
    "template": [
      {
        "text": "SELECT account_id, tx_id, tx_timestamp, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp "
      },
      {
        "isBlank": true,
        "slotId": "order_dir",
        "placeholder": "<direction>"
      },
      {
        "text": "\n) = "
      },
      {
        "isBlank": true,
        "slotId": "rank_val",
        "placeholder": "<rank_n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "Transactions",
        "options": [
          "Transactions",
          "AuditLogs",
          "DimAccounts",
          "TempLedger"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "order_dir": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "NULLS FIRST",
          "LIMIT 1"
        ]
      },
      "rank_val": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "ALL",
          "TOP"
        ]
      }
    },
    "explanation": "QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!"
  },
  {
    "id": 14006,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 6: Deduplicate Latest CustomerPortfolios via ROW_NUMBER()",
    "difficulty": "Easy",
    "description": "In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.",
    "table": "CustomerPortfolios",
    "template": [
      {
        "text": "SELECT account_id, tx_id, tx_timestamp, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp "
      },
      {
        "isBlank": true,
        "slotId": "order_dir",
        "placeholder": "<direction>"
      },
      {
        "text": "\n) = "
      },
      {
        "isBlank": true,
        "slotId": "rank_val",
        "placeholder": "<rank_n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CustomerPortfolios",
        "options": [
          "CustomerPortfolios",
          "AuditLogs",
          "DimAccounts",
          "TempLedger"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "order_dir": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "NULLS FIRST",
          "LIMIT 1"
        ]
      },
      "rank_val": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "ALL",
          "TOP"
        ]
      }
    },
    "explanation": "QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!"
  },
  {
    "id": 14007,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 7: Deduplicate Latest OrderFills via ROW_NUMBER()",
    "difficulty": "Easy",
    "description": "In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.",
    "table": "OrderFills",
    "template": [
      {
        "text": "SELECT account_id, tx_id, tx_timestamp, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp "
      },
      {
        "isBlank": true,
        "slotId": "order_dir",
        "placeholder": "<direction>"
      },
      {
        "text": "\n) = "
      },
      {
        "isBlank": true,
        "slotId": "rank_val",
        "placeholder": "<rank_n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "OrderFills",
        "options": [
          "OrderFills",
          "AuditLogs",
          "DimAccounts",
          "TempLedger"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "order_dir": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "NULLS FIRST",
          "LIMIT 1"
        ]
      },
      "rank_val": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "ALL",
          "TOP"
        ]
      }
    },
    "explanation": "QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!"
  },
  {
    "id": 14008,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 8: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "MarketTicks",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketTicks",
        "options": [
          "MarketTicks",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14009,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 9: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "CreditRiskLogs",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CreditRiskLogs",
        "options": [
          "CreditRiskLogs",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14010,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 10: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "Transactions",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "Transactions",
        "options": [
          "Transactions",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14011,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 11: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "CustomerPortfolios",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CustomerPortfolios",
        "options": [
          "CustomerPortfolios",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14012,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 12: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "OrderFills",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "OrderFills",
        "options": [
          "OrderFills",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14013,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 13: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "MarketTicks",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketTicks",
        "options": [
          "MarketTicks",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14014,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 14: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "CreditRiskLogs",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CreditRiskLogs",
        "options": [
          "CreditRiskLogs",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14015,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 15: Top Volume Trades per Desk via DENSE_RANK()",
    "difficulty": "Medium",
    "description": "Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().",
    "table": "Transactions",
    "template": [
      {
        "text": "SELECT desk_id, trader_id, trade_id, notional_amount\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE trade_status = 'SETTLED'\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<filter_clause>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "rank_fn",
        "placeholder": "<window_func>"
      },
      {
        "text": "() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= "
      },
      {
        "isBlank": true,
        "slotId": "top_n",
        "placeholder": "<n>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "Transactions",
        "options": [
          "Transactions",
          "ArchivedTrades",
          "OrderBook",
          "SettlementQueue"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "ORDER BY"
        ]
      },
      "rank_fn": {
        "correct": "DENSE_RANK",
        "options": [
          "DENSE_RANK",
          "SUM",
          "COUNT_IF",
          "NTILE"
        ]
      },
      "top_n": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "1",
          "100"
        ]
      }
    },
    "explanation": "QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!"
  },
  {
    "id": 14016,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 16: Detect Sudden Price Jump via LAG()",
    "difficulty": "Hard",
    "description": "Identify ticks where the stock price deviated by more than $5.00 compared to the preceding quote using LAG() inside QUALIFY.",
    "table": "CustomerPortfolios",
    "template": [
      {
        "text": "SELECT ticker, quote_time, price\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<clause>"
      },
      {
        "text": " ABS(price - "
      },
      {
        "isBlank": true,
        "slotId": "lag_fn",
        "placeholder": "<offset_fn>"
      },
      {
        "text": "(price) OVER (PARTITION BY ticker ORDER BY quote_time)) > "
      },
      {
        "isBlank": true,
        "slotId": "thresh",
        "placeholder": "<threshold>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CustomerPortfolios",
        "options": [
          "CustomerPortfolios",
          "QuoteFeed",
          "TapeA",
          "HistoricalPrices"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "CASE"
        ]
      },
      "lag_fn": {
        "correct": "LAG",
        "options": [
          "LAG",
          "LEAD",
          "FIRST_VALUE",
          "AVG"
        ]
      },
      "thresh": {
        "correct": "5.00",
        "options": [
          "5.00",
          "0.00",
          "NULL",
          "MAX"
        ]
      }
    },
    "explanation": "Evaluating LAG() directly in QUALIFY lets you pinpoint price volatility jumps in one clean pass across the dataset."
  },
  {
    "id": 14017,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 17: Detect Sudden Price Jump via LAG()",
    "difficulty": "Hard",
    "description": "Identify ticks where the stock price deviated by more than $5.00 compared to the preceding quote using LAG() inside QUALIFY.",
    "table": "OrderFills",
    "template": [
      {
        "text": "SELECT ticker, quote_time, price\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<clause>"
      },
      {
        "text": " ABS(price - "
      },
      {
        "isBlank": true,
        "slotId": "lag_fn",
        "placeholder": "<offset_fn>"
      },
      {
        "text": "(price) OVER (PARTITION BY ticker ORDER BY quote_time)) > "
      },
      {
        "isBlank": true,
        "slotId": "thresh",
        "placeholder": "<threshold>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "OrderFills",
        "options": [
          "OrderFills",
          "QuoteFeed",
          "TapeA",
          "HistoricalPrices"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "CASE"
        ]
      },
      "lag_fn": {
        "correct": "LAG",
        "options": [
          "LAG",
          "LEAD",
          "FIRST_VALUE",
          "AVG"
        ]
      },
      "thresh": {
        "correct": "5.00",
        "options": [
          "5.00",
          "0.00",
          "NULL",
          "MAX"
        ]
      }
    },
    "explanation": "Evaluating LAG() directly in QUALIFY lets you pinpoint price volatility jumps in one clean pass across the dataset."
  },
  {
    "id": 14018,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 18: Detect Sudden Price Jump via LAG()",
    "difficulty": "Hard",
    "description": "Identify ticks where the stock price deviated by more than $5.00 compared to the preceding quote using LAG() inside QUALIFY.",
    "table": "MarketTicks",
    "template": [
      {
        "text": "SELECT ticker, quote_time, price\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<clause>"
      },
      {
        "text": " ABS(price - "
      },
      {
        "isBlank": true,
        "slotId": "lag_fn",
        "placeholder": "<offset_fn>"
      },
      {
        "text": "(price) OVER (PARTITION BY ticker ORDER BY quote_time)) > "
      },
      {
        "isBlank": true,
        "slotId": "thresh",
        "placeholder": "<threshold>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketTicks",
        "options": [
          "MarketTicks",
          "QuoteFeed",
          "TapeA",
          "HistoricalPrices"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "CASE"
        ]
      },
      "lag_fn": {
        "correct": "LAG",
        "options": [
          "LAG",
          "LEAD",
          "FIRST_VALUE",
          "AVG"
        ]
      },
      "thresh": {
        "correct": "5.00",
        "options": [
          "5.00",
          "0.00",
          "NULL",
          "MAX"
        ]
      }
    },
    "explanation": "Evaluating LAG() directly in QUALIFY lets you pinpoint price volatility jumps in one clean pass across the dataset."
  },
  {
    "id": 14019,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 19: Detect Sudden Price Jump via LAG()",
    "difficulty": "Hard",
    "description": "Identify ticks where the stock price deviated by more than $5.00 compared to the preceding quote using LAG() inside QUALIFY.",
    "table": "CreditRiskLogs",
    "template": [
      {
        "text": "SELECT ticker, quote_time, price\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<clause>"
      },
      {
        "text": " ABS(price - "
      },
      {
        "isBlank": true,
        "slotId": "lag_fn",
        "placeholder": "<offset_fn>"
      },
      {
        "text": "(price) OVER (PARTITION BY ticker ORDER BY quote_time)) > "
      },
      {
        "isBlank": true,
        "slotId": "thresh",
        "placeholder": "<threshold>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CreditRiskLogs",
        "options": [
          "CreditRiskLogs",
          "QuoteFeed",
          "TapeA",
          "HistoricalPrices"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "CASE"
        ]
      },
      "lag_fn": {
        "correct": "LAG",
        "options": [
          "LAG",
          "LEAD",
          "FIRST_VALUE",
          "AVG"
        ]
      },
      "thresh": {
        "correct": "5.00",
        "options": [
          "5.00",
          "0.00",
          "NULL",
          "MAX"
        ]
      }
    },
    "explanation": "Evaluating LAG() directly in QUALIFY lets you pinpoint price volatility jumps in one clean pass across the dataset."
  },
  {
    "id": 14020,
    "section": "section14",
    "disciplineKey": "qualify_window_filtering",
    "title": "QUALIFY Lvl 20: Detect Sudden Price Jump via LAG()",
    "difficulty": "Hard",
    "description": "Identify ticks where the stock price deviated by more than $5.00 compared to the preceding quote using LAG() inside QUALIFY.",
    "table": "Transactions",
    "template": [
      {
        "text": "SELECT ticker, quote_time, price\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "qualify_kw",
        "placeholder": "<clause>"
      },
      {
        "text": " ABS(price - "
      },
      {
        "isBlank": true,
        "slotId": "lag_fn",
        "placeholder": "<offset_fn>"
      },
      {
        "text": "(price) OVER (PARTITION BY ticker ORDER BY quote_time)) > "
      },
      {
        "isBlank": true,
        "slotId": "thresh",
        "placeholder": "<threshold>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "Transactions",
        "options": [
          "Transactions",
          "QuoteFeed",
          "TapeA",
          "HistoricalPrices"
        ]
      },
      "qualify_kw": {
        "correct": "QUALIFY",
        "options": [
          "QUALIFY",
          "HAVING",
          "WHERE",
          "CASE"
        ]
      },
      "lag_fn": {
        "correct": "LAG",
        "options": [
          "LAG",
          "LEAD",
          "FIRST_VALUE",
          "AVG"
        ]
      },
      "thresh": {
        "correct": "5.00",
        "options": [
          "5.00",
          "0.00",
          "NULL",
          "MAX"
        ]
      }
    },
    "explanation": "Evaluating LAG() directly in QUALIFY lets you pinpoint price volatility jumps in one clean pass across the dataset."
  },
  {
    "id": 14021,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 1: BigQuery Date-Partition Pruning",
    "difficulty": "Easy",
    "description": "In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.",
    "table": "ClickstreamEvents",
    "template": [
      {
        "text": "SELECT account_id, SUM(amount) AS total_settled\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "part_col",
        "placeholder": "<partition_pseudo_col>"
      },
      {
        "text": " >= DATE_SUB(CURRENT_DATE(), "
      },
      {
        "isBlank": true,
        "slotId": "interval_kw",
        "placeholder": "<interval>"
      },
      {
        "text": " 7 DAY)\nGROUP BY account_id;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "ClickstreamEvents",
        "options": [
          "ClickstreamEvents",
          "RawLedger",
          "ArchiveStore",
          "UnpartitionedLedger"
        ]
      },
      "part_col": {
        "correct": "_PARTITIONDATE",
        "options": [
          "_PARTITIONDATE",
          "ROWNUM",
          "BLOCK_ID",
          "ID"
        ]
      },
      "interval_kw": {
        "correct": "INTERVAL",
        "options": [
          "INTERVAL",
          "DURATION",
          "STEP",
          "RANGE"
        ]
      }
    },
    "explanation": "Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!"
  },
  {
    "id": 14022,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 2: BigQuery Date-Partition Pruning",
    "difficulty": "Easy",
    "description": "In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.",
    "table": "CardAuths",
    "template": [
      {
        "text": "SELECT account_id, SUM(amount) AS total_settled\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "part_col",
        "placeholder": "<partition_pseudo_col>"
      },
      {
        "text": " >= DATE_SUB(CURRENT_DATE(), "
      },
      {
        "isBlank": true,
        "slotId": "interval_kw",
        "placeholder": "<interval>"
      },
      {
        "text": " 7 DAY)\nGROUP BY account_id;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CardAuths",
        "options": [
          "CardAuths",
          "RawLedger",
          "ArchiveStore",
          "UnpartitionedLedger"
        ]
      },
      "part_col": {
        "correct": "_PARTITIONDATE",
        "options": [
          "_PARTITIONDATE",
          "ROWNUM",
          "BLOCK_ID",
          "ID"
        ]
      },
      "interval_kw": {
        "correct": "INTERVAL",
        "options": [
          "INTERVAL",
          "DURATION",
          "STEP",
          "RANGE"
        ]
      }
    },
    "explanation": "Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!"
  },
  {
    "id": 14023,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 3: BigQuery Date-Partition Pruning",
    "difficulty": "Easy",
    "description": "In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.",
    "table": "MarketDepth",
    "template": [
      {
        "text": "SELECT account_id, SUM(amount) AS total_settled\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "part_col",
        "placeholder": "<partition_pseudo_col>"
      },
      {
        "text": " >= DATE_SUB(CURRENT_DATE(), "
      },
      {
        "isBlank": true,
        "slotId": "interval_kw",
        "placeholder": "<interval>"
      },
      {
        "text": " 7 DAY)\nGROUP BY account_id;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketDepth",
        "options": [
          "MarketDepth",
          "RawLedger",
          "ArchiveStore",
          "UnpartitionedLedger"
        ]
      },
      "part_col": {
        "correct": "_PARTITIONDATE",
        "options": [
          "_PARTITIONDATE",
          "ROWNUM",
          "BLOCK_ID",
          "ID"
        ]
      },
      "interval_kw": {
        "correct": "INTERVAL",
        "options": [
          "INTERVAL",
          "DURATION",
          "STEP",
          "RANGE"
        ]
      }
    },
    "explanation": "Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!"
  },
  {
    "id": 14024,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 4: BigQuery Date-Partition Pruning",
    "difficulty": "Easy",
    "description": "In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.",
    "table": "AuditTraces",
    "template": [
      {
        "text": "SELECT account_id, SUM(amount) AS total_settled\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "part_col",
        "placeholder": "<partition_pseudo_col>"
      },
      {
        "text": " >= DATE_SUB(CURRENT_DATE(), "
      },
      {
        "isBlank": true,
        "slotId": "interval_kw",
        "placeholder": "<interval>"
      },
      {
        "text": " 7 DAY)\nGROUP BY account_id;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "AuditTraces",
        "options": [
          "AuditTraces",
          "RawLedger",
          "ArchiveStore",
          "UnpartitionedLedger"
        ]
      },
      "part_col": {
        "correct": "_PARTITIONDATE",
        "options": [
          "_PARTITIONDATE",
          "ROWNUM",
          "BLOCK_ID",
          "ID"
        ]
      },
      "interval_kw": {
        "correct": "INTERVAL",
        "options": [
          "INTERVAL",
          "DURATION",
          "STEP",
          "RANGE"
        ]
      }
    },
    "explanation": "Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!"
  },
  {
    "id": 14025,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 5: BigQuery Date-Partition Pruning",
    "difficulty": "Easy",
    "description": "In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.",
    "table": "LedgerTransactions",
    "template": [
      {
        "text": "SELECT account_id, SUM(amount) AS total_settled\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "part_col",
        "placeholder": "<partition_pseudo_col>"
      },
      {
        "text": " >= DATE_SUB(CURRENT_DATE(), "
      },
      {
        "isBlank": true,
        "slotId": "interval_kw",
        "placeholder": "<interval>"
      },
      {
        "text": " 7 DAY)\nGROUP BY account_id;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "LedgerTransactions",
        "options": [
          "LedgerTransactions",
          "RawLedger",
          "ArchiveStore",
          "UnpartitionedLedger"
        ]
      },
      "part_col": {
        "correct": "_PARTITIONDATE",
        "options": [
          "_PARTITIONDATE",
          "ROWNUM",
          "BLOCK_ID",
          "ID"
        ]
      },
      "interval_kw": {
        "correct": "INTERVAL",
        "options": [
          "INTERVAL",
          "DURATION",
          "STEP",
          "RANGE"
        ]
      }
    },
    "explanation": "Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!"
  },
  {
    "id": 14026,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 6: BigQuery Date-Partition Pruning",
    "difficulty": "Easy",
    "description": "In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.",
    "table": "ClickstreamEvents",
    "template": [
      {
        "text": "SELECT account_id, SUM(amount) AS total_settled\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "part_col",
        "placeholder": "<partition_pseudo_col>"
      },
      {
        "text": " >= DATE_SUB(CURRENT_DATE(), "
      },
      {
        "isBlank": true,
        "slotId": "interval_kw",
        "placeholder": "<interval>"
      },
      {
        "text": " 7 DAY)\nGROUP BY account_id;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "ClickstreamEvents",
        "options": [
          "ClickstreamEvents",
          "RawLedger",
          "ArchiveStore",
          "UnpartitionedLedger"
        ]
      },
      "part_col": {
        "correct": "_PARTITIONDATE",
        "options": [
          "_PARTITIONDATE",
          "ROWNUM",
          "BLOCK_ID",
          "ID"
        ]
      },
      "interval_kw": {
        "correct": "INTERVAL",
        "options": [
          "INTERVAL",
          "DURATION",
          "STEP",
          "RANGE"
        ]
      }
    },
    "explanation": "Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!"
  },
  {
    "id": 14027,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 7: BigQuery Date-Partition Pruning",
    "difficulty": "Easy",
    "description": "In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.",
    "table": "CardAuths",
    "template": [
      {
        "text": "SELECT account_id, SUM(amount) AS total_settled\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "part_col",
        "placeholder": "<partition_pseudo_col>"
      },
      {
        "text": " >= DATE_SUB(CURRENT_DATE(), "
      },
      {
        "isBlank": true,
        "slotId": "interval_kw",
        "placeholder": "<interval>"
      },
      {
        "text": " 7 DAY)\nGROUP BY account_id;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CardAuths",
        "options": [
          "CardAuths",
          "RawLedger",
          "ArchiveStore",
          "UnpartitionedLedger"
        ]
      },
      "part_col": {
        "correct": "_PARTITIONDATE",
        "options": [
          "_PARTITIONDATE",
          "ROWNUM",
          "BLOCK_ID",
          "ID"
        ]
      },
      "interval_kw": {
        "correct": "INTERVAL",
        "options": [
          "INTERVAL",
          "DURATION",
          "STEP",
          "RANGE"
        ]
      }
    },
    "explanation": "Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!"
  },
  {
    "id": 14028,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 8: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "MarketDepth",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketDepth",
        "options": [
          "MarketDepth",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14029,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 9: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "AuditTraces",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "AuditTraces",
        "options": [
          "AuditTraces",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14030,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 10: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "LedgerTransactions",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "LedgerTransactions",
        "options": [
          "LedgerTransactions",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14031,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 11: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "ClickstreamEvents",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "ClickstreamEvents",
        "options": [
          "ClickstreamEvents",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14032,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 12: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "CardAuths",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CardAuths",
        "options": [
          "CardAuths",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14033,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 13: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "MarketDepth",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketDepth",
        "options": [
          "MarketDepth",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14034,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 14: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "AuditTraces",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "AuditTraces",
        "options": [
          "AuditTraces",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14035,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 15: Snowflake Cluster Keys for Range Pruning",
    "difficulty": "Medium",
    "description": "Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.",
    "table": "LedgerTransactions",
    "template": [
      {
        "text": "ALTER TABLE "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "cluster_kw",
        "placeholder": "<cluster_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "cluster_cols",
        "placeholder": "<columns>"
      },
      {
        "text": ");"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "LedgerTransactions",
        "options": [
          "LedgerTransactions",
          "TransactionsBackup",
          "TempStore",
          "StagingTbl"
        ]
      },
      "cluster_kw": {
        "correct": "CLUSTER BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY"
        ]
      },
      "cluster_cols": {
        "correct": "settlement_date, org_id",
        "options": [
          "settlement_date, org_id",
          "amount, memo",
          "status",
          "tx_id"
        ]
      }
    },
    "explanation": "Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!"
  },
  {
    "id": 14036,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 16: Prune Partitions Without Function Blinding",
    "difficulty": "Hard",
    "description": "Never wrap partition columns in scalar functions. Filter the partition timestamp column directly between exact boundaries.",
    "table": "ClickstreamEvents",
    "template": [
      {
        "text": "SELECT COUNT(*) AS tx_count\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "col_name",
        "placeholder": "<col>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "between_kw",
        "placeholder": "<range_operator>"
      },
      {
        "text": " '2024-01-01 00:00:00' AND '2024-01-31 23:59:59';"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "ClickstreamEvents",
        "options": [
          "ClickstreamEvents",
          "AllEvents",
          "StagingHeap",
          "ColdStorage"
        ]
      },
      "col_name": {
        "correct": "tx_timestamp",
        "options": [
          "tx_timestamp",
          "DATE(tx_timestamp)",
          "TO_CHAR(tx_timestamp)",
          "YEAR(tx_timestamp)"
        ]
      },
      "between_kw": {
        "correct": "BETWEEN",
        "options": [
          "BETWEEN",
          "IN",
          "LIKE",
          "OVERLAPS"
        ]
      }
    },
    "explanation": "Writing raw column boundaries with BETWEEN allows the query engine to prune partition blocks. Function wraps blind the pruning metadata!"
  },
  {
    "id": 14037,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 17: Prune Partitions Without Function Blinding",
    "difficulty": "Hard",
    "description": "Never wrap partition columns in scalar functions. Filter the partition timestamp column directly between exact boundaries.",
    "table": "CardAuths",
    "template": [
      {
        "text": "SELECT COUNT(*) AS tx_count\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "col_name",
        "placeholder": "<col>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "between_kw",
        "placeholder": "<range_operator>"
      },
      {
        "text": " '2024-01-01 00:00:00' AND '2024-01-31 23:59:59';"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CardAuths",
        "options": [
          "CardAuths",
          "AllEvents",
          "StagingHeap",
          "ColdStorage"
        ]
      },
      "col_name": {
        "correct": "tx_timestamp",
        "options": [
          "tx_timestamp",
          "DATE(tx_timestamp)",
          "TO_CHAR(tx_timestamp)",
          "YEAR(tx_timestamp)"
        ]
      },
      "between_kw": {
        "correct": "BETWEEN",
        "options": [
          "BETWEEN",
          "IN",
          "LIKE",
          "OVERLAPS"
        ]
      }
    },
    "explanation": "Writing raw column boundaries with BETWEEN allows the query engine to prune partition blocks. Function wraps blind the pruning metadata!"
  },
  {
    "id": 14038,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 18: Prune Partitions Without Function Blinding",
    "difficulty": "Hard",
    "description": "Never wrap partition columns in scalar functions. Filter the partition timestamp column directly between exact boundaries.",
    "table": "MarketDepth",
    "template": [
      {
        "text": "SELECT COUNT(*) AS tx_count\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "col_name",
        "placeholder": "<col>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "between_kw",
        "placeholder": "<range_operator>"
      },
      {
        "text": " '2024-01-01 00:00:00' AND '2024-01-31 23:59:59';"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "MarketDepth",
        "options": [
          "MarketDepth",
          "AllEvents",
          "StagingHeap",
          "ColdStorage"
        ]
      },
      "col_name": {
        "correct": "tx_timestamp",
        "options": [
          "tx_timestamp",
          "DATE(tx_timestamp)",
          "TO_CHAR(tx_timestamp)",
          "YEAR(tx_timestamp)"
        ]
      },
      "between_kw": {
        "correct": "BETWEEN",
        "options": [
          "BETWEEN",
          "IN",
          "LIKE",
          "OVERLAPS"
        ]
      }
    },
    "explanation": "Writing raw column boundaries with BETWEEN allows the query engine to prune partition blocks. Function wraps blind the pruning metadata!"
  },
  {
    "id": 14039,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 19: Prune Partitions Without Function Blinding",
    "difficulty": "Hard",
    "description": "Never wrap partition columns in scalar functions. Filter the partition timestamp column directly between exact boundaries.",
    "table": "AuditTraces",
    "template": [
      {
        "text": "SELECT COUNT(*) AS tx_count\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "col_name",
        "placeholder": "<col>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "between_kw",
        "placeholder": "<range_operator>"
      },
      {
        "text": " '2024-01-01 00:00:00' AND '2024-01-31 23:59:59';"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "AuditTraces",
        "options": [
          "AuditTraces",
          "AllEvents",
          "StagingHeap",
          "ColdStorage"
        ]
      },
      "col_name": {
        "correct": "tx_timestamp",
        "options": [
          "tx_timestamp",
          "DATE(tx_timestamp)",
          "TO_CHAR(tx_timestamp)",
          "YEAR(tx_timestamp)"
        ]
      },
      "between_kw": {
        "correct": "BETWEEN",
        "options": [
          "BETWEEN",
          "IN",
          "LIKE",
          "OVERLAPS"
        ]
      }
    },
    "explanation": "Writing raw column boundaries with BETWEEN allows the query engine to prune partition blocks. Function wraps blind the pruning metadata!"
  },
  {
    "id": 14040,
    "section": "section14",
    "disciplineKey": "partition_pruning_clustering",
    "title": "Partitioning Lvl 20: Prune Partitions Without Function Blinding",
    "difficulty": "Hard",
    "description": "Never wrap partition columns in scalar functions. Filter the partition timestamp column directly between exact boundaries.",
    "table": "LedgerTransactions",
    "template": [
      {
        "text": "SELECT COUNT(*) AS tx_count\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "col_name",
        "placeholder": "<col>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "between_kw",
        "placeholder": "<range_operator>"
      },
      {
        "text": " '2024-01-01 00:00:00' AND '2024-01-31 23:59:59';"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "LedgerTransactions",
        "options": [
          "LedgerTransactions",
          "AllEvents",
          "StagingHeap",
          "ColdStorage"
        ]
      },
      "col_name": {
        "correct": "tx_timestamp",
        "options": [
          "tx_timestamp",
          "DATE(tx_timestamp)",
          "TO_CHAR(tx_timestamp)",
          "YEAR(tx_timestamp)"
        ]
      },
      "between_kw": {
        "correct": "BETWEEN",
        "options": [
          "BETWEEN",
          "IN",
          "LIKE",
          "OVERLAPS"
        ]
      }
    },
    "explanation": "Writing raw column boundaries with BETWEEN allows the query engine to prune partition blocks. Function wraps blind the pruning metadata!"
  },
  {
    "id": 14041,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 1: Query Historical Balances via AT TIMESTAMP",
    "difficulty": "Easy",
    "description": "In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.",
    "table": "CustomerBalances",
    "template": [
      {
        "text": "SELECT account_id, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "at_kw",
        "placeholder": "<travel_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "ts_param",
        "placeholder": "<timestamp_specifier>"
      },
      {
        "text": " => '2024-03-15 14:29:00'::TIMESTAMP_TZ)\nWHERE account_id = "
      },
      {
        "isBlank": true,
        "slotId": "acc_id",
        "placeholder": "<acc>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CustomerBalances",
        "options": [
          "CustomerBalances",
          "BalanceSnapshot",
          "LedgerHistory",
          "StagingTbl"
        ]
      },
      "at_kw": {
        "correct": "AT",
        "options": [
          "AT",
          "BEFORE",
          "AS OF",
          "PAST"
        ]
      },
      "ts_param": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "OFFSET",
          "STATEMENT",
          "VERSION"
        ]
      },
      "acc_id": {
        "correct": "'ACC-9021'",
        "options": [
          "'ACC-9021'",
          "NULL",
          "ALL",
          "0"
        ]
      }
    },
    "explanation": "Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!"
  },
  {
    "id": 14042,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 2: Query Historical Balances via AT TIMESTAMP",
    "difficulty": "Easy",
    "description": "In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.",
    "table": "GeneralLedger",
    "template": [
      {
        "text": "SELECT account_id, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "at_kw",
        "placeholder": "<travel_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "ts_param",
        "placeholder": "<timestamp_specifier>"
      },
      {
        "text": " => '2024-03-15 14:29:00'::TIMESTAMP_TZ)\nWHERE account_id = "
      },
      {
        "isBlank": true,
        "slotId": "acc_id",
        "placeholder": "<acc>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "GeneralLedger",
        "options": [
          "GeneralLedger",
          "BalanceSnapshot",
          "LedgerHistory",
          "StagingTbl"
        ]
      },
      "at_kw": {
        "correct": "AT",
        "options": [
          "AT",
          "BEFORE",
          "AS OF",
          "PAST"
        ]
      },
      "ts_param": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "OFFSET",
          "STATEMENT",
          "VERSION"
        ]
      },
      "acc_id": {
        "correct": "'ACC-9021'",
        "options": [
          "'ACC-9021'",
          "NULL",
          "ALL",
          "0"
        ]
      }
    },
    "explanation": "Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!"
  },
  {
    "id": 14043,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 3: Query Historical Balances via AT TIMESTAMP",
    "difficulty": "Easy",
    "description": "In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.",
    "table": "LoanPortfolios",
    "template": [
      {
        "text": "SELECT account_id, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "at_kw",
        "placeholder": "<travel_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "ts_param",
        "placeholder": "<timestamp_specifier>"
      },
      {
        "text": " => '2024-03-15 14:29:00'::TIMESTAMP_TZ)\nWHERE account_id = "
      },
      {
        "isBlank": true,
        "slotId": "acc_id",
        "placeholder": "<acc>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "LoanPortfolios",
        "options": [
          "LoanPortfolios",
          "BalanceSnapshot",
          "LedgerHistory",
          "StagingTbl"
        ]
      },
      "at_kw": {
        "correct": "AT",
        "options": [
          "AT",
          "BEFORE",
          "AS OF",
          "PAST"
        ]
      },
      "ts_param": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "OFFSET",
          "STATEMENT",
          "VERSION"
        ]
      },
      "acc_id": {
        "correct": "'ACC-9021'",
        "options": [
          "'ACC-9021'",
          "NULL",
          "ALL",
          "0"
        ]
      }
    },
    "explanation": "Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!"
  },
  {
    "id": 14044,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 4: Query Historical Balances via AT TIMESTAMP",
    "difficulty": "Easy",
    "description": "In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.",
    "table": "SecuritiesInventory",
    "template": [
      {
        "text": "SELECT account_id, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "at_kw",
        "placeholder": "<travel_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "ts_param",
        "placeholder": "<timestamp_specifier>"
      },
      {
        "text": " => '2024-03-15 14:29:00'::TIMESTAMP_TZ)\nWHERE account_id = "
      },
      {
        "isBlank": true,
        "slotId": "acc_id",
        "placeholder": "<acc>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "SecuritiesInventory",
        "options": [
          "SecuritiesInventory",
          "BalanceSnapshot",
          "LedgerHistory",
          "StagingTbl"
        ]
      },
      "at_kw": {
        "correct": "AT",
        "options": [
          "AT",
          "BEFORE",
          "AS OF",
          "PAST"
        ]
      },
      "ts_param": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "OFFSET",
          "STATEMENT",
          "VERSION"
        ]
      },
      "acc_id": {
        "correct": "'ACC-9021'",
        "options": [
          "'ACC-9021'",
          "NULL",
          "ALL",
          "0"
        ]
      }
    },
    "explanation": "Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!"
  },
  {
    "id": 14045,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 5: Query Historical Balances via AT TIMESTAMP",
    "difficulty": "Easy",
    "description": "In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.",
    "table": "TradingPositions",
    "template": [
      {
        "text": "SELECT account_id, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "at_kw",
        "placeholder": "<travel_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "ts_param",
        "placeholder": "<timestamp_specifier>"
      },
      {
        "text": " => '2024-03-15 14:29:00'::TIMESTAMP_TZ)\nWHERE account_id = "
      },
      {
        "isBlank": true,
        "slotId": "acc_id",
        "placeholder": "<acc>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "TradingPositions",
        "options": [
          "TradingPositions",
          "BalanceSnapshot",
          "LedgerHistory",
          "StagingTbl"
        ]
      },
      "at_kw": {
        "correct": "AT",
        "options": [
          "AT",
          "BEFORE",
          "AS OF",
          "PAST"
        ]
      },
      "ts_param": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "OFFSET",
          "STATEMENT",
          "VERSION"
        ]
      },
      "acc_id": {
        "correct": "'ACC-9021'",
        "options": [
          "'ACC-9021'",
          "NULL",
          "ALL",
          "0"
        ]
      }
    },
    "explanation": "Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!"
  },
  {
    "id": 14046,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 6: Query Historical Balances via AT TIMESTAMP",
    "difficulty": "Easy",
    "description": "In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.",
    "table": "CustomerBalances",
    "template": [
      {
        "text": "SELECT account_id, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "at_kw",
        "placeholder": "<travel_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "ts_param",
        "placeholder": "<timestamp_specifier>"
      },
      {
        "text": " => '2024-03-15 14:29:00'::TIMESTAMP_TZ)\nWHERE account_id = "
      },
      {
        "isBlank": true,
        "slotId": "acc_id",
        "placeholder": "<acc>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CustomerBalances",
        "options": [
          "CustomerBalances",
          "BalanceSnapshot",
          "LedgerHistory",
          "StagingTbl"
        ]
      },
      "at_kw": {
        "correct": "AT",
        "options": [
          "AT",
          "BEFORE",
          "AS OF",
          "PAST"
        ]
      },
      "ts_param": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "OFFSET",
          "STATEMENT",
          "VERSION"
        ]
      },
      "acc_id": {
        "correct": "'ACC-9021'",
        "options": [
          "'ACC-9021'",
          "NULL",
          "ALL",
          "0"
        ]
      }
    },
    "explanation": "Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!"
  },
  {
    "id": 14047,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 7: Query Historical Balances via AT TIMESTAMP",
    "difficulty": "Easy",
    "description": "In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.",
    "table": "GeneralLedger",
    "template": [
      {
        "text": "SELECT account_id, balance\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "at_kw",
        "placeholder": "<travel_clause>"
      },
      {
        "text": " ("
      },
      {
        "isBlank": true,
        "slotId": "ts_param",
        "placeholder": "<timestamp_specifier>"
      },
      {
        "text": " => '2024-03-15 14:29:00'::TIMESTAMP_TZ)\nWHERE account_id = "
      },
      {
        "isBlank": true,
        "slotId": "acc_id",
        "placeholder": "<acc>"
      },
      {
        "text": ";"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "GeneralLedger",
        "options": [
          "GeneralLedger",
          "BalanceSnapshot",
          "LedgerHistory",
          "StagingTbl"
        ]
      },
      "at_kw": {
        "correct": "AT",
        "options": [
          "AT",
          "BEFORE",
          "AS OF",
          "PAST"
        ]
      },
      "ts_param": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "OFFSET",
          "STATEMENT",
          "VERSION"
        ]
      },
      "acc_id": {
        "correct": "'ACC-9021'",
        "options": [
          "'ACC-9021'",
          "NULL",
          "ALL",
          "0"
        ]
      }
    },
    "explanation": "Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!"
  },
  {
    "id": 14048,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 8: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "LoanPortfolios",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "LoanPortfolios",
        "options": [
          "LoanPortfolios",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14049,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 9: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "SecuritiesInventory",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "SecuritiesInventory",
        "options": [
          "SecuritiesInventory",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14050,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 10: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "TradingPositions",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "TradingPositions",
        "options": [
          "TradingPositions",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14051,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 11: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "CustomerBalances",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "CustomerBalances",
        "options": [
          "CustomerBalances",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14052,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 12: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "GeneralLedger",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "GeneralLedger",
        "options": [
          "GeneralLedger",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14053,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 13: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "LoanPortfolios",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "LoanPortfolios",
        "options": [
          "LoanPortfolios",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14054,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 14: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "SecuritiesInventory",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "SecuritiesInventory",
        "options": [
          "SecuritiesInventory",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14055,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 15: BigQuery FOR SYSTEM_TIME AS OF",
    "difficulty": "Medium",
    "description": "In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.",
    "table": "TradingPositions",
    "template": [
      {
        "text": "SELECT portfolio_id, total_nav\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "time_clause",
        "placeholder": "<time_travel_syntax>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "ts_fn",
        "placeholder": "<timestamp_fn>"
      },
      {
        "text": "('2024-02-29 23:59:59', 'UTC')\nORDER BY total_nav DESC;"
      }
    ],
    "slots": {
      "tbl": {
        "correct": "TradingPositions",
        "options": [
          "TradingPositions",
          "NavHistory",
          "TempPortfolios",
          "ArchiveLedger"
        ]
      },
      "time_clause": {
        "correct": "FOR SYSTEM_TIME AS OF",
        "options": [
          "FOR SYSTEM_TIME AS OF",
          "AT TIMESTAMP",
          "WITH HISTORICAL TIME",
          "TIME TRAVEL"
        ]
      },
      "ts_fn": {
        "correct": "TIMESTAMP",
        "options": [
          "TIMESTAMP",
          "DATE",
          "PARSE_DATETIME",
          "MAKE_TIMESTAMP"
        ]
      }
    },
    "explanation": "BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!"
  },
  {
    "id": 14056,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 16: Zero-Copy CLONE for Financial Backtesting",
    "difficulty": "Hard",
    "description": "Create an instantaneous, zero-cost replica of the production ledger table in the analytics schema without duplicating physical storage blocks.",
    "table": "CustomerBalances",
    "template": [
      {
        "text": "CREATE OR REPLACE TABLE analytics."
      },
      {
        "isBlank": true,
        "slotId": "clone_tbl",
        "placeholder": "<target_table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "clone_kw",
        "placeholder": "<clone_keyword>"
      },
      {
        "text": " production."
      },
      {
        "isBlank": true,
        "slotId": "src_tbl",
        "placeholder": "<source_table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "before_kw",
        "placeholder": "<historical_modifier>"
      },
      {
        "text": " (STATEMENT => '0192a3f4-0001-2e45');"
      }
    ],
    "slots": {
      "clone_tbl": {
        "correct": "CustomerBalances_qa_clone",
        "options": [
          "CustomerBalances_qa_clone",
          "temp_copy",
          "dump",
          "backup"
        ]
      },
      "clone_kw": {
        "correct": "CLONE",
        "options": [
          "CLONE",
          "COPY",
          "DUPLICATE",
          "MIRROR"
        ]
      },
      "src_tbl": {
        "correct": "CustomerBalances",
        "options": [
          "CustomerBalances",
          "ProdStore",
          "StagingTbl",
          "Archive"
        ]
      },
      "before_kw": {
        "correct": "BEFORE",
        "options": [
          "BEFORE",
          "AFTER",
          "DURING",
          "EXACT"
        ]
      }
    },
    "explanation": "Zero-copy CLONE in Snowflake copies metadata pointers only. It creates an isolated sandbox table in seconds without incurring extra storage fees until mutations occur!"
  },
  {
    "id": 14057,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 17: Zero-Copy CLONE for Financial Backtesting",
    "difficulty": "Hard",
    "description": "Create an instantaneous, zero-cost replica of the production ledger table in the analytics schema without duplicating physical storage blocks.",
    "table": "GeneralLedger",
    "template": [
      {
        "text": "CREATE OR REPLACE TABLE analytics."
      },
      {
        "isBlank": true,
        "slotId": "clone_tbl",
        "placeholder": "<target_table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "clone_kw",
        "placeholder": "<clone_keyword>"
      },
      {
        "text": " production."
      },
      {
        "isBlank": true,
        "slotId": "src_tbl",
        "placeholder": "<source_table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "before_kw",
        "placeholder": "<historical_modifier>"
      },
      {
        "text": " (STATEMENT => '0192a3f4-0001-2e45');"
      }
    ],
    "slots": {
      "clone_tbl": {
        "correct": "GeneralLedger_qa_clone",
        "options": [
          "GeneralLedger_qa_clone",
          "temp_copy",
          "dump",
          "backup"
        ]
      },
      "clone_kw": {
        "correct": "CLONE",
        "options": [
          "CLONE",
          "COPY",
          "DUPLICATE",
          "MIRROR"
        ]
      },
      "src_tbl": {
        "correct": "GeneralLedger",
        "options": [
          "GeneralLedger",
          "ProdStore",
          "StagingTbl",
          "Archive"
        ]
      },
      "before_kw": {
        "correct": "BEFORE",
        "options": [
          "BEFORE",
          "AFTER",
          "DURING",
          "EXACT"
        ]
      }
    },
    "explanation": "Zero-copy CLONE in Snowflake copies metadata pointers only. It creates an isolated sandbox table in seconds without incurring extra storage fees until mutations occur!"
  },
  {
    "id": 14058,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 18: Zero-Copy CLONE for Financial Backtesting",
    "difficulty": "Hard",
    "description": "Create an instantaneous, zero-cost replica of the production ledger table in the analytics schema without duplicating physical storage blocks.",
    "table": "LoanPortfolios",
    "template": [
      {
        "text": "CREATE OR REPLACE TABLE analytics."
      },
      {
        "isBlank": true,
        "slotId": "clone_tbl",
        "placeholder": "<target_table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "clone_kw",
        "placeholder": "<clone_keyword>"
      },
      {
        "text": " production."
      },
      {
        "isBlank": true,
        "slotId": "src_tbl",
        "placeholder": "<source_table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "before_kw",
        "placeholder": "<historical_modifier>"
      },
      {
        "text": " (STATEMENT => '0192a3f4-0001-2e45');"
      }
    ],
    "slots": {
      "clone_tbl": {
        "correct": "LoanPortfolios_qa_clone",
        "options": [
          "LoanPortfolios_qa_clone",
          "temp_copy",
          "dump",
          "backup"
        ]
      },
      "clone_kw": {
        "correct": "CLONE",
        "options": [
          "CLONE",
          "COPY",
          "DUPLICATE",
          "MIRROR"
        ]
      },
      "src_tbl": {
        "correct": "LoanPortfolios",
        "options": [
          "LoanPortfolios",
          "ProdStore",
          "StagingTbl",
          "Archive"
        ]
      },
      "before_kw": {
        "correct": "BEFORE",
        "options": [
          "BEFORE",
          "AFTER",
          "DURING",
          "EXACT"
        ]
      }
    },
    "explanation": "Zero-copy CLONE in Snowflake copies metadata pointers only. It creates an isolated sandbox table in seconds without incurring extra storage fees until mutations occur!"
  },
  {
    "id": 14059,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 19: Zero-Copy CLONE for Financial Backtesting",
    "difficulty": "Hard",
    "description": "Create an instantaneous, zero-cost replica of the production ledger table in the analytics schema without duplicating physical storage blocks.",
    "table": "SecuritiesInventory",
    "template": [
      {
        "text": "CREATE OR REPLACE TABLE analytics."
      },
      {
        "isBlank": true,
        "slotId": "clone_tbl",
        "placeholder": "<target_table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "clone_kw",
        "placeholder": "<clone_keyword>"
      },
      {
        "text": " production."
      },
      {
        "isBlank": true,
        "slotId": "src_tbl",
        "placeholder": "<source_table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "before_kw",
        "placeholder": "<historical_modifier>"
      },
      {
        "text": " (STATEMENT => '0192a3f4-0001-2e45');"
      }
    ],
    "slots": {
      "clone_tbl": {
        "correct": "SecuritiesInventory_qa_clone",
        "options": [
          "SecuritiesInventory_qa_clone",
          "temp_copy",
          "dump",
          "backup"
        ]
      },
      "clone_kw": {
        "correct": "CLONE",
        "options": [
          "CLONE",
          "COPY",
          "DUPLICATE",
          "MIRROR"
        ]
      },
      "src_tbl": {
        "correct": "SecuritiesInventory",
        "options": [
          "SecuritiesInventory",
          "ProdStore",
          "StagingTbl",
          "Archive"
        ]
      },
      "before_kw": {
        "correct": "BEFORE",
        "options": [
          "BEFORE",
          "AFTER",
          "DURING",
          "EXACT"
        ]
      }
    },
    "explanation": "Zero-copy CLONE in Snowflake copies metadata pointers only. It creates an isolated sandbox table in seconds without incurring extra storage fees until mutations occur!"
  },
  {
    "id": 14060,
    "section": "section14",
    "disciplineKey": "time_travel_zero_copy",
    "title": "Time Travel Lvl 20: Zero-Copy CLONE for Financial Backtesting",
    "difficulty": "Hard",
    "description": "Create an instantaneous, zero-cost replica of the production ledger table in the analytics schema without duplicating physical storage blocks.",
    "table": "TradingPositions",
    "template": [
      {
        "text": "CREATE OR REPLACE TABLE analytics."
      },
      {
        "isBlank": true,
        "slotId": "clone_tbl",
        "placeholder": "<target_table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "clone_kw",
        "placeholder": "<clone_keyword>"
      },
      {
        "text": " production."
      },
      {
        "isBlank": true,
        "slotId": "src_tbl",
        "placeholder": "<source_table>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "before_kw",
        "placeholder": "<historical_modifier>"
      },
      {
        "text": " (STATEMENT => '0192a3f4-0001-2e45');"
      }
    ],
    "slots": {
      "clone_tbl": {
        "correct": "TradingPositions_qa_clone",
        "options": [
          "TradingPositions_qa_clone",
          "temp_copy",
          "dump",
          "backup"
        ]
      },
      "clone_kw": {
        "correct": "CLONE",
        "options": [
          "CLONE",
          "COPY",
          "DUPLICATE",
          "MIRROR"
        ]
      },
      "src_tbl": {
        "correct": "TradingPositions",
        "options": [
          "TradingPositions",
          "ProdStore",
          "StagingTbl",
          "Archive"
        ]
      },
      "before_kw": {
        "correct": "BEFORE",
        "options": [
          "BEFORE",
          "AFTER",
          "DURING",
          "EXACT"
        ]
      }
    },
    "explanation": "Zero-copy CLONE in Snowflake copies metadata pointers only. It creates an isolated sandbox table in seconds without incurring extra storage fees until mutations occur!"
  },
  {
    "id": 14061,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 1: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT",
    "difficulty": "Easy",
    "description": "Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.",
    "table": "AdImpressions",
    "template": [
      {
        "text": "SELECT date_key, "
      },
      {
        "isBlank": true,
        "slotId": "approx_fn",
        "placeholder": "<approx_distinct_fn>"
      },
      {
        "text": "(user_id) AS approx_dau\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " date_key\nORDER BY date_key DESC;"
      }
    ],
    "slots": {
      "approx_fn": {
        "correct": "APPROX_COUNT_DISTINCT",
        "options": [
          "APPROX_COUNT_DISTINCT",
          "COUNT_DISTINCT",
          "FAST_COUNT",
          "ESTIMATE_USERS"
        ]
      },
      "tbl": {
        "correct": "AdImpressions",
        "options": [
          "AdImpressions",
          "UserLogs",
          "EventStream",
          "ColdStore"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "QUALIFY"
        ]
      }
    },
    "explanation": "APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!"
  },
  {
    "id": 14062,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 2: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT",
    "difficulty": "Easy",
    "description": "Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.",
    "table": "PaymentClickstream",
    "template": [
      {
        "text": "SELECT date_key, "
      },
      {
        "isBlank": true,
        "slotId": "approx_fn",
        "placeholder": "<approx_distinct_fn>"
      },
      {
        "text": "(user_id) AS approx_dau\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " date_key\nORDER BY date_key DESC;"
      }
    ],
    "slots": {
      "approx_fn": {
        "correct": "APPROX_COUNT_DISTINCT",
        "options": [
          "APPROX_COUNT_DISTINCT",
          "COUNT_DISTINCT",
          "FAST_COUNT",
          "ESTIMATE_USERS"
        ]
      },
      "tbl": {
        "correct": "PaymentClickstream",
        "options": [
          "PaymentClickstream",
          "UserLogs",
          "EventStream",
          "ColdStore"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "QUALIFY"
        ]
      }
    },
    "explanation": "APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!"
  },
  {
    "id": 14063,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 3: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT",
    "difficulty": "Easy",
    "description": "Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.",
    "table": "MarketQuotes",
    "template": [
      {
        "text": "SELECT date_key, "
      },
      {
        "isBlank": true,
        "slotId": "approx_fn",
        "placeholder": "<approx_distinct_fn>"
      },
      {
        "text": "(user_id) AS approx_dau\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " date_key\nORDER BY date_key DESC;"
      }
    ],
    "slots": {
      "approx_fn": {
        "correct": "APPROX_COUNT_DISTINCT",
        "options": [
          "APPROX_COUNT_DISTINCT",
          "COUNT_DISTINCT",
          "FAST_COUNT",
          "ESTIMATE_USERS"
        ]
      },
      "tbl": {
        "correct": "MarketQuotes",
        "options": [
          "MarketQuotes",
          "UserLogs",
          "EventStream",
          "ColdStore"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "QUALIFY"
        ]
      }
    },
    "explanation": "APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!"
  },
  {
    "id": 14064,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 4: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT",
    "difficulty": "Easy",
    "description": "Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.",
    "table": "HighFreqOrders",
    "template": [
      {
        "text": "SELECT date_key, "
      },
      {
        "isBlank": true,
        "slotId": "approx_fn",
        "placeholder": "<approx_distinct_fn>"
      },
      {
        "text": "(user_id) AS approx_dau\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " date_key\nORDER BY date_key DESC;"
      }
    ],
    "slots": {
      "approx_fn": {
        "correct": "APPROX_COUNT_DISTINCT",
        "options": [
          "APPROX_COUNT_DISTINCT",
          "COUNT_DISTINCT",
          "FAST_COUNT",
          "ESTIMATE_USERS"
        ]
      },
      "tbl": {
        "correct": "HighFreqOrders",
        "options": [
          "HighFreqOrders",
          "UserLogs",
          "EventStream",
          "ColdStore"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "QUALIFY"
        ]
      }
    },
    "explanation": "APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!"
  },
  {
    "id": 14065,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 5: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT",
    "difficulty": "Easy",
    "description": "Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.",
    "table": "DeviceTelemetry",
    "template": [
      {
        "text": "SELECT date_key, "
      },
      {
        "isBlank": true,
        "slotId": "approx_fn",
        "placeholder": "<approx_distinct_fn>"
      },
      {
        "text": "(user_id) AS approx_dau\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " date_key\nORDER BY date_key DESC;"
      }
    ],
    "slots": {
      "approx_fn": {
        "correct": "APPROX_COUNT_DISTINCT",
        "options": [
          "APPROX_COUNT_DISTINCT",
          "COUNT_DISTINCT",
          "FAST_COUNT",
          "ESTIMATE_USERS"
        ]
      },
      "tbl": {
        "correct": "DeviceTelemetry",
        "options": [
          "DeviceTelemetry",
          "UserLogs",
          "EventStream",
          "ColdStore"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "QUALIFY"
        ]
      }
    },
    "explanation": "APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!"
  },
  {
    "id": 14066,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 6: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT",
    "difficulty": "Easy",
    "description": "Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.",
    "table": "AdImpressions",
    "template": [
      {
        "text": "SELECT date_key, "
      },
      {
        "isBlank": true,
        "slotId": "approx_fn",
        "placeholder": "<approx_distinct_fn>"
      },
      {
        "text": "(user_id) AS approx_dau\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " date_key\nORDER BY date_key DESC;"
      }
    ],
    "slots": {
      "approx_fn": {
        "correct": "APPROX_COUNT_DISTINCT",
        "options": [
          "APPROX_COUNT_DISTINCT",
          "COUNT_DISTINCT",
          "FAST_COUNT",
          "ESTIMATE_USERS"
        ]
      },
      "tbl": {
        "correct": "AdImpressions",
        "options": [
          "AdImpressions",
          "UserLogs",
          "EventStream",
          "ColdStore"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "QUALIFY"
        ]
      }
    },
    "explanation": "APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!"
  },
  {
    "id": 14067,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 7: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT",
    "difficulty": "Easy",
    "description": "Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.",
    "table": "PaymentClickstream",
    "template": [
      {
        "text": "SELECT date_key, "
      },
      {
        "isBlank": true,
        "slotId": "approx_fn",
        "placeholder": "<approx_distinct_fn>"
      },
      {
        "text": "(user_id) AS approx_dau\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " date_key\nORDER BY date_key DESC;"
      }
    ],
    "slots": {
      "approx_fn": {
        "correct": "APPROX_COUNT_DISTINCT",
        "options": [
          "APPROX_COUNT_DISTINCT",
          "COUNT_DISTINCT",
          "FAST_COUNT",
          "ESTIMATE_USERS"
        ]
      },
      "tbl": {
        "correct": "PaymentClickstream",
        "options": [
          "PaymentClickstream",
          "UserLogs",
          "EventStream",
          "ColdStore"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "QUALIFY"
        ]
      }
    },
    "explanation": "APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!"
  },
  {
    "id": 14068,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 8: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "MarketQuotes",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "MarketQuotes",
        "options": [
          "MarketQuotes",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14069,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 9: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "HighFreqOrders",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "HighFreqOrders",
        "options": [
          "HighFreqOrders",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14070,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 10: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "DeviceTelemetry",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "DeviceTelemetry",
        "options": [
          "DeviceTelemetry",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14071,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 11: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "AdImpressions",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "AdImpressions",
        "options": [
          "AdImpressions",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14072,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 12: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "PaymentClickstream",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "PaymentClickstream",
        "options": [
          "PaymentClickstream",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14073,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 13: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "MarketQuotes",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "MarketQuotes",
        "options": [
          "MarketQuotes",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14074,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 14: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "HighFreqOrders",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "HighFreqOrders",
        "options": [
          "HighFreqOrders",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14075,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 15: Fast Latency Percentiles via APPROX_QUANTILES",
    "difficulty": "Medium",
    "description": "Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.",
    "table": "DeviceTelemetry",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "quant_fn",
        "placeholder": "<quantile_function>"
      },
      {
        "text": "(latency_ms, "
      },
      {
        "isBlank": true,
        "slotId": "buckets",
        "placeholder": "<num_quantiles>"
      },
      {
        "text": ")[OFFSET(99)] AS p99_latency_ms\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE "
      },
      {
        "isBlank": true,
        "slotId": "status_cond",
        "placeholder": "<filter>"
      },
      {
        "text": " = 'COMPLETED';"
      }
    ],
    "slots": {
      "quant_fn": {
        "correct": "APPROX_QUANTILES",
        "options": [
          "APPROX_QUANTILES",
          "PERCENTILE_CONT",
          "NTILE",
          "BUCKET_ARRAY"
        ]
      },
      "buckets": {
        "correct": "100",
        "options": [
          "100",
          "10",
          "1",
          "1000"
        ]
      },
      "tbl": {
        "correct": "DeviceTelemetry",
        "options": [
          "DeviceTelemetry",
          "LatencyAudit",
          "HttpLog",
          "GatewayMetrics"
        ]
      },
      "status_cond": {
        "correct": "tx_status",
        "options": [
          "tx_status",
          "flag",
          "status_id",
          "result"
        ]
      }
    },
    "explanation": "APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!"
  },
  {
    "id": 14076,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 16: Merge Precomputed HyperLogLog Sketches",
    "difficulty": "Hard",
    "description": "In BigQuery, merge daily precomputed HyperLogLog sketches to calculate 30-day rolling unique transacting accounts without scanning raw event streams.",
    "table": "AdImpressions",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "merge_fn",
        "placeholder": "<hll_merge_extract>"
      },
      {
        "text": "(daily_hll_sketch) AS rolling_monthly_uniques\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE report_date >= DATE_SUB(CURRENT_DATE(), INTERVAL "
      },
      {
        "isBlank": true,
        "slotId": "days",
        "placeholder": "<n>"
      },
      {
        "text": " DAY);"
      }
    ],
    "slots": {
      "merge_fn": {
        "correct": "HLL_COUNT.MERGE",
        "options": [
          "HLL_COUNT.MERGE",
          "COUNT.DISTINCT",
          "MERGE_SKETCH",
          "SUM_HLL"
        ]
      },
      "tbl": {
        "correct": "DailyUserSketches",
        "options": [
          "DailyUserSketches",
          "AdImpressions",
          "RawEvents",
          "Archive"
        ]
      },
      "days": {
        "correct": "30",
        "options": [
          "30",
          "7",
          "365",
          "1"
        ]
      }
    },
    "explanation": "HyperLogLog sketches are additive! HLL_COUNT.MERGE combines daily summary sketches into multi-week distinct counts with zero row-level data access."
  },
  {
    "id": 14077,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 17: Merge Precomputed HyperLogLog Sketches",
    "difficulty": "Hard",
    "description": "In BigQuery, merge daily precomputed HyperLogLog sketches to calculate 30-day rolling unique transacting accounts without scanning raw event streams.",
    "table": "PaymentClickstream",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "merge_fn",
        "placeholder": "<hll_merge_extract>"
      },
      {
        "text": "(daily_hll_sketch) AS rolling_monthly_uniques\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE report_date >= DATE_SUB(CURRENT_DATE(), INTERVAL "
      },
      {
        "isBlank": true,
        "slotId": "days",
        "placeholder": "<n>"
      },
      {
        "text": " DAY);"
      }
    ],
    "slots": {
      "merge_fn": {
        "correct": "HLL_COUNT.MERGE",
        "options": [
          "HLL_COUNT.MERGE",
          "COUNT.DISTINCT",
          "MERGE_SKETCH",
          "SUM_HLL"
        ]
      },
      "tbl": {
        "correct": "DailyUserSketches",
        "options": [
          "DailyUserSketches",
          "PaymentClickstream",
          "RawEvents",
          "Archive"
        ]
      },
      "days": {
        "correct": "30",
        "options": [
          "30",
          "7",
          "365",
          "1"
        ]
      }
    },
    "explanation": "HyperLogLog sketches are additive! HLL_COUNT.MERGE combines daily summary sketches into multi-week distinct counts with zero row-level data access."
  },
  {
    "id": 14078,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 18: Merge Precomputed HyperLogLog Sketches",
    "difficulty": "Hard",
    "description": "In BigQuery, merge daily precomputed HyperLogLog sketches to calculate 30-day rolling unique transacting accounts without scanning raw event streams.",
    "table": "MarketQuotes",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "merge_fn",
        "placeholder": "<hll_merge_extract>"
      },
      {
        "text": "(daily_hll_sketch) AS rolling_monthly_uniques\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE report_date >= DATE_SUB(CURRENT_DATE(), INTERVAL "
      },
      {
        "isBlank": true,
        "slotId": "days",
        "placeholder": "<n>"
      },
      {
        "text": " DAY);"
      }
    ],
    "slots": {
      "merge_fn": {
        "correct": "HLL_COUNT.MERGE",
        "options": [
          "HLL_COUNT.MERGE",
          "COUNT.DISTINCT",
          "MERGE_SKETCH",
          "SUM_HLL"
        ]
      },
      "tbl": {
        "correct": "DailyUserSketches",
        "options": [
          "DailyUserSketches",
          "MarketQuotes",
          "RawEvents",
          "Archive"
        ]
      },
      "days": {
        "correct": "30",
        "options": [
          "30",
          "7",
          "365",
          "1"
        ]
      }
    },
    "explanation": "HyperLogLog sketches are additive! HLL_COUNT.MERGE combines daily summary sketches into multi-week distinct counts with zero row-level data access."
  },
  {
    "id": 14079,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 19: Merge Precomputed HyperLogLog Sketches",
    "difficulty": "Hard",
    "description": "In BigQuery, merge daily precomputed HyperLogLog sketches to calculate 30-day rolling unique transacting accounts without scanning raw event streams.",
    "table": "HighFreqOrders",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "merge_fn",
        "placeholder": "<hll_merge_extract>"
      },
      {
        "text": "(daily_hll_sketch) AS rolling_monthly_uniques\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE report_date >= DATE_SUB(CURRENT_DATE(), INTERVAL "
      },
      {
        "isBlank": true,
        "slotId": "days",
        "placeholder": "<n>"
      },
      {
        "text": " DAY);"
      }
    ],
    "slots": {
      "merge_fn": {
        "correct": "HLL_COUNT.MERGE",
        "options": [
          "HLL_COUNT.MERGE",
          "COUNT.DISTINCT",
          "MERGE_SKETCH",
          "SUM_HLL"
        ]
      },
      "tbl": {
        "correct": "DailyUserSketches",
        "options": [
          "DailyUserSketches",
          "HighFreqOrders",
          "RawEvents",
          "Archive"
        ]
      },
      "days": {
        "correct": "30",
        "options": [
          "30",
          "7",
          "365",
          "1"
        ]
      }
    },
    "explanation": "HyperLogLog sketches are additive! HLL_COUNT.MERGE combines daily summary sketches into multi-week distinct counts with zero row-level data access."
  },
  {
    "id": 14080,
    "section": "section14",
    "disciplineKey": "approximate_aggregations",
    "title": "Approximate Lvl 20: Merge Precomputed HyperLogLog Sketches",
    "difficulty": "Hard",
    "description": "In BigQuery, merge daily precomputed HyperLogLog sketches to calculate 30-day rolling unique transacting accounts without scanning raw event streams.",
    "table": "DeviceTelemetry",
    "template": [
      {
        "text": "SELECT "
      },
      {
        "isBlank": true,
        "slotId": "merge_fn",
        "placeholder": "<hll_merge_extract>"
      },
      {
        "text": "(daily_hll_sketch) AS rolling_monthly_uniques\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "tbl",
        "placeholder": "<table>"
      },
      {
        "text": "\nWHERE report_date >= DATE_SUB(CURRENT_DATE(), INTERVAL "
      },
      {
        "isBlank": true,
        "slotId": "days",
        "placeholder": "<n>"
      },
      {
        "text": " DAY);"
      }
    ],
    "slots": {
      "merge_fn": {
        "correct": "HLL_COUNT.MERGE",
        "options": [
          "HLL_COUNT.MERGE",
          "COUNT.DISTINCT",
          "MERGE_SKETCH",
          "SUM_HLL"
        ]
      },
      "tbl": {
        "correct": "DailyUserSketches",
        "options": [
          "DailyUserSketches",
          "DeviceTelemetry",
          "RawEvents",
          "Archive"
        ]
      },
      "days": {
        "correct": "30",
        "options": [
          "30",
          "7",
          "365",
          "1"
        ]
      }
    },
    "explanation": "HyperLogLog sketches are additive! HLL_COUNT.MERGE combines daily summary sketches into multi-week distinct counts with zero row-level data access."
  },
  {
    "id": 14081,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 1: Query Remote Parquet Lake directly in DuckDB",
    "difficulty": "Easy",
    "description": "In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.",
    "table": "trades_lake",
    "template": [
      {
        "text": "SELECT symbol, SUM(volume) AS total_vol\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "read_fn",
        "placeholder": "<parquet_reader>"
      },
      {
        "text": "('"
      },
      {
        "isBlank": true,
        "slotId": "path_uri",
        "placeholder": "<s3_uri>"
      },
      {
        "text": "')\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " symbol\nHAVING total_vol > 100000;"
      }
    ],
    "slots": {
      "read_fn": {
        "correct": "read_parquet",
        "options": [
          "read_parquet",
          "load_csv",
          "scan_table",
          "import_parquet"
        ]
      },
      "path_uri": {
        "correct": "s3://financial-lake/equities/*.parquet",
        "options": [
          "s3://financial-lake/equities/*.parquet",
          "/tmp/file.csv",
          "trades.db",
          "http://api/data"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "QUALIFY",
          "WHERE"
        ]
      }
    },
    "explanation": "read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!"
  },
  {
    "id": 14082,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 2: Query Remote Parquet Lake directly in DuckDB",
    "difficulty": "Easy",
    "description": "In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.",
    "table": "trades_lake",
    "template": [
      {
        "text": "SELECT symbol, SUM(volume) AS total_vol\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "read_fn",
        "placeholder": "<parquet_reader>"
      },
      {
        "text": "('"
      },
      {
        "isBlank": true,
        "slotId": "path_uri",
        "placeholder": "<s3_uri>"
      },
      {
        "text": "')\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " symbol\nHAVING total_vol > 100000;"
      }
    ],
    "slots": {
      "read_fn": {
        "correct": "read_parquet",
        "options": [
          "read_parquet",
          "load_csv",
          "scan_table",
          "import_parquet"
        ]
      },
      "path_uri": {
        "correct": "s3://financial-lake/orderbook/*.parquet",
        "options": [
          "s3://financial-lake/orderbook/*.parquet",
          "/tmp/file.csv",
          "trades.db",
          "http://api/data"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "QUALIFY",
          "WHERE"
        ]
      }
    },
    "explanation": "read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!"
  },
  {
    "id": 14083,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 3: Query Remote Parquet Lake directly in DuckDB",
    "difficulty": "Easy",
    "description": "In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.",
    "table": "trades_lake",
    "template": [
      {
        "text": "SELECT symbol, SUM(volume) AS total_vol\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "read_fn",
        "placeholder": "<parquet_reader>"
      },
      {
        "text": "('"
      },
      {
        "isBlank": true,
        "slotId": "path_uri",
        "placeholder": "<s3_uri>"
      },
      {
        "text": "')\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " symbol\nHAVING total_vol > 100000;"
      }
    ],
    "slots": {
      "read_fn": {
        "correct": "read_parquet",
        "options": [
          "read_parquet",
          "load_csv",
          "scan_table",
          "import_parquet"
        ]
      },
      "path_uri": {
        "correct": "s3://financial-lake/fx_quotes/*.parquet",
        "options": [
          "s3://financial-lake/fx_quotes/*.parquet",
          "/tmp/file.csv",
          "trades.db",
          "http://api/data"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "QUALIFY",
          "WHERE"
        ]
      }
    },
    "explanation": "read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!"
  },
  {
    "id": 14084,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 4: Query Remote Parquet Lake directly in DuckDB",
    "difficulty": "Easy",
    "description": "In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.",
    "table": "trades_lake",
    "template": [
      {
        "text": "SELECT symbol, SUM(volume) AS total_vol\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "read_fn",
        "placeholder": "<parquet_reader>"
      },
      {
        "text": "('"
      },
      {
        "isBlank": true,
        "slotId": "path_uri",
        "placeholder": "<s3_uri>"
      },
      {
        "text": "')\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " symbol\nHAVING total_vol > 100000;"
      }
    ],
    "slots": {
      "read_fn": {
        "correct": "read_parquet",
        "options": [
          "read_parquet",
          "load_csv",
          "scan_table",
          "import_parquet"
        ]
      },
      "path_uri": {
        "correct": "s3://financial-lake/settlements/*.parquet",
        "options": [
          "s3://financial-lake/settlements/*.parquet",
          "/tmp/file.csv",
          "trades.db",
          "http://api/data"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "QUALIFY",
          "WHERE"
        ]
      }
    },
    "explanation": "read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!"
  },
  {
    "id": 14085,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 5: Query Remote Parquet Lake directly in DuckDB",
    "difficulty": "Easy",
    "description": "In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.",
    "table": "trades_lake",
    "template": [
      {
        "text": "SELECT symbol, SUM(volume) AS total_vol\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "read_fn",
        "placeholder": "<parquet_reader>"
      },
      {
        "text": "('"
      },
      {
        "isBlank": true,
        "slotId": "path_uri",
        "placeholder": "<s3_uri>"
      },
      {
        "text": "')\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " symbol\nHAVING total_vol > 100000;"
      }
    ],
    "slots": {
      "read_fn": {
        "correct": "read_parquet",
        "options": [
          "read_parquet",
          "load_csv",
          "scan_table",
          "import_parquet"
        ]
      },
      "path_uri": {
        "correct": "s3://financial-lake/trades/*.parquet",
        "options": [
          "s3://financial-lake/trades/*.parquet",
          "/tmp/file.csv",
          "trades.db",
          "http://api/data"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "QUALIFY",
          "WHERE"
        ]
      }
    },
    "explanation": "read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!"
  },
  {
    "id": 14086,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 6: Query Remote Parquet Lake directly in DuckDB",
    "difficulty": "Easy",
    "description": "In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.",
    "table": "trades_lake",
    "template": [
      {
        "text": "SELECT symbol, SUM(volume) AS total_vol\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "read_fn",
        "placeholder": "<parquet_reader>"
      },
      {
        "text": "('"
      },
      {
        "isBlank": true,
        "slotId": "path_uri",
        "placeholder": "<s3_uri>"
      },
      {
        "text": "')\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " symbol\nHAVING total_vol > 100000;"
      }
    ],
    "slots": {
      "read_fn": {
        "correct": "read_parquet",
        "options": [
          "read_parquet",
          "load_csv",
          "scan_table",
          "import_parquet"
        ]
      },
      "path_uri": {
        "correct": "s3://financial-lake/equities/*.parquet",
        "options": [
          "s3://financial-lake/equities/*.parquet",
          "/tmp/file.csv",
          "trades.db",
          "http://api/data"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "QUALIFY",
          "WHERE"
        ]
      }
    },
    "explanation": "read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!"
  },
  {
    "id": 14087,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 7: Query Remote Parquet Lake directly in DuckDB",
    "difficulty": "Easy",
    "description": "In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.",
    "table": "trades_lake",
    "template": [
      {
        "text": "SELECT symbol, SUM(volume) AS total_vol\nFROM "
      },
      {
        "isBlank": true,
        "slotId": "read_fn",
        "placeholder": "<parquet_reader>"
      },
      {
        "text": "('"
      },
      {
        "isBlank": true,
        "slotId": "path_uri",
        "placeholder": "<s3_uri>"
      },
      {
        "text": "')\n"
      },
      {
        "isBlank": true,
        "slotId": "grp_kw",
        "placeholder": "<group_clause>"
      },
      {
        "text": " symbol\nHAVING total_vol > 100000;"
      }
    ],
    "slots": {
      "read_fn": {
        "correct": "read_parquet",
        "options": [
          "read_parquet",
          "load_csv",
          "scan_table",
          "import_parquet"
        ]
      },
      "path_uri": {
        "correct": "s3://financial-lake/orderbook/*.parquet",
        "options": [
          "s3://financial-lake/orderbook/*.parquet",
          "/tmp/file.csv",
          "trades.db",
          "http://api/data"
        ]
      },
      "grp_kw": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "QUALIFY",
          "WHERE"
        ]
      }
    },
    "explanation": "read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!"
  },
  {
    "id": 14088,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 8: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14089,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 9: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14090,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 10: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14091,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 11: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14092,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 12: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14093,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 13: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14094,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 14: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14095,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 15: Export Analytical Results via COPY TO PARQUET",
    "difficulty": "Medium",
    "description": "Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.",
    "table": "portfolio_risk",
    "template": [
      {
        "text": "COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO '"
      },
      {
        "isBlank": true,
        "slotId": "target_path",
        "placeholder": "<file_path>"
      },
      {
        "text": "' ("
      },
      {
        "isBlank": true,
        "slotId": "fmt_kw",
        "placeholder": "<format_keyword>"
      },
      {
        "text": " "
      },
      {
        "isBlank": true,
        "slotId": "fmt_type",
        "placeholder": "<format_type>"
      },
      {
        "text": ", COMPRESSION '"
      },
      {
        "isBlank": true,
        "slotId": "codec",
        "placeholder": "<compression_codec>"
      },
      {
        "text": "');"
      }
    ],
    "slots": {
      "target_path": {
        "correct": "s3://lake/risk_summary.parquet",
        "options": [
          "s3://lake/risk_summary.parquet",
          "risk.txt",
          "stdout",
          "null"
        ]
      },
      "fmt_kw": {
        "correct": "FORMAT",
        "options": [
          "FORMAT",
          "TYPE",
          "ENCODING",
          "OUTPUT"
        ]
      },
      "fmt_type": {
        "correct": "PARQUET",
        "options": [
          "PARQUET",
          "CSV",
          "JSON",
          "AVRO"
        ]
      },
      "codec": {
        "correct": "SNAPPY",
        "options": [
          "SNAPPY",
          "RAW",
          "ZIP",
          "GZIP_FAST"
        ]
      }
    },
    "explanation": "COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata."
  },
  {
    "id": 14096,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 16: Zero-Copy Hive Partition Pushdown",
    "difficulty": "Hard",
    "description": "DuckDB automatically discovers directory partition variables (e.g. year=2024/month=03) and prunes entire directory trees before reading Parquet headers.",
    "table": "market_data",
    "template": [
      {
        "text": "SELECT ticker, trade_price\nFROM read_parquet('s3://lake/market/"
      },
      {
        "isBlank": true,
        "slotId": "hive_glob",
        "placeholder": "<hive_pattern>"
      },
      {
        "text": "', "
      },
      {
        "isBlank": true,
        "slotId": "param_kw",
        "placeholder": "<hive_flag>"
      },
      {
        "text": " = true)\nWHERE year = 2024 AND month = "
      },
      {
        "isBlank": true,
        "slotId": "month_num",
        "placeholder": "<month>"
      },
      {
        "text": " AND ticker = 'NVDA';"
      }
    ],
    "slots": {
      "hive_glob": {
        "correct": "*/*/*.parquet",
        "options": [
          "*/*/*.parquet",
          "*.csv",
          "all.dat",
          "data.parquet"
        ]
      },
      "param_kw": {
        "correct": "hive_partitioning",
        "options": [
          "hive_partitioning",
          "auto_detect",
          "schema_inference",
          "prune_dirs"
        ]
      },
      "month_num": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "NULL",
          "ALL"
        ]
      }
    },
    "explanation": "Setting hive_partitioning = true allows DuckDB to read directory paths as virtual columns and skip unneeded month folders completely!"
  },
  {
    "id": 14097,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 17: Zero-Copy Hive Partition Pushdown",
    "difficulty": "Hard",
    "description": "DuckDB automatically discovers directory partition variables (e.g. year=2024/month=03) and prunes entire directory trees before reading Parquet headers.",
    "table": "market_data",
    "template": [
      {
        "text": "SELECT ticker, trade_price\nFROM read_parquet('s3://lake/market/"
      },
      {
        "isBlank": true,
        "slotId": "hive_glob",
        "placeholder": "<hive_pattern>"
      },
      {
        "text": "', "
      },
      {
        "isBlank": true,
        "slotId": "param_kw",
        "placeholder": "<hive_flag>"
      },
      {
        "text": " = true)\nWHERE year = 2024 AND month = "
      },
      {
        "isBlank": true,
        "slotId": "month_num",
        "placeholder": "<month>"
      },
      {
        "text": " AND ticker = 'NVDA';"
      }
    ],
    "slots": {
      "hive_glob": {
        "correct": "*/*/*.parquet",
        "options": [
          "*/*/*.parquet",
          "*.csv",
          "all.dat",
          "data.parquet"
        ]
      },
      "param_kw": {
        "correct": "hive_partitioning",
        "options": [
          "hive_partitioning",
          "auto_detect",
          "schema_inference",
          "prune_dirs"
        ]
      },
      "month_num": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "NULL",
          "ALL"
        ]
      }
    },
    "explanation": "Setting hive_partitioning = true allows DuckDB to read directory paths as virtual columns and skip unneeded month folders completely!"
  },
  {
    "id": 14098,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 18: Zero-Copy Hive Partition Pushdown",
    "difficulty": "Hard",
    "description": "DuckDB automatically discovers directory partition variables (e.g. year=2024/month=03) and prunes entire directory trees before reading Parquet headers.",
    "table": "market_data",
    "template": [
      {
        "text": "SELECT ticker, trade_price\nFROM read_parquet('s3://lake/market/"
      },
      {
        "isBlank": true,
        "slotId": "hive_glob",
        "placeholder": "<hive_pattern>"
      },
      {
        "text": "', "
      },
      {
        "isBlank": true,
        "slotId": "param_kw",
        "placeholder": "<hive_flag>"
      },
      {
        "text": " = true)\nWHERE year = 2024 AND month = "
      },
      {
        "isBlank": true,
        "slotId": "month_num",
        "placeholder": "<month>"
      },
      {
        "text": " AND ticker = 'NVDA';"
      }
    ],
    "slots": {
      "hive_glob": {
        "correct": "*/*/*.parquet",
        "options": [
          "*/*/*.parquet",
          "*.csv",
          "all.dat",
          "data.parquet"
        ]
      },
      "param_kw": {
        "correct": "hive_partitioning",
        "options": [
          "hive_partitioning",
          "auto_detect",
          "schema_inference",
          "prune_dirs"
        ]
      },
      "month_num": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "NULL",
          "ALL"
        ]
      }
    },
    "explanation": "Setting hive_partitioning = true allows DuckDB to read directory paths as virtual columns and skip unneeded month folders completely!"
  },
  {
    "id": 14099,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 19: Zero-Copy Hive Partition Pushdown",
    "difficulty": "Hard",
    "description": "DuckDB automatically discovers directory partition variables (e.g. year=2024/month=03) and prunes entire directory trees before reading Parquet headers.",
    "table": "market_data",
    "template": [
      {
        "text": "SELECT ticker, trade_price\nFROM read_parquet('s3://lake/market/"
      },
      {
        "isBlank": true,
        "slotId": "hive_glob",
        "placeholder": "<hive_pattern>"
      },
      {
        "text": "', "
      },
      {
        "isBlank": true,
        "slotId": "param_kw",
        "placeholder": "<hive_flag>"
      },
      {
        "text": " = true)\nWHERE year = 2024 AND month = "
      },
      {
        "isBlank": true,
        "slotId": "month_num",
        "placeholder": "<month>"
      },
      {
        "text": " AND ticker = 'NVDA';"
      }
    ],
    "slots": {
      "hive_glob": {
        "correct": "*/*/*.parquet",
        "options": [
          "*/*/*.parquet",
          "*.csv",
          "all.dat",
          "data.parquet"
        ]
      },
      "param_kw": {
        "correct": "hive_partitioning",
        "options": [
          "hive_partitioning",
          "auto_detect",
          "schema_inference",
          "prune_dirs"
        ]
      },
      "month_num": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "NULL",
          "ALL"
        ]
      }
    },
    "explanation": "Setting hive_partitioning = true allows DuckDB to read directory paths as virtual columns and skip unneeded month folders completely!"
  },
  {
    "id": 14100,
    "section": "section14",
    "disciplineKey": "parquet_lakehouse_duckdb",
    "title": "Parquet Lvl 20: Zero-Copy Hive Partition Pushdown",
    "difficulty": "Hard",
    "description": "DuckDB automatically discovers directory partition variables (e.g. year=2024/month=03) and prunes entire directory trees before reading Parquet headers.",
    "table": "market_data",
    "template": [
      {
        "text": "SELECT ticker, trade_price\nFROM read_parquet('s3://lake/market/"
      },
      {
        "isBlank": true,
        "slotId": "hive_glob",
        "placeholder": "<hive_pattern>"
      },
      {
        "text": "', "
      },
      {
        "isBlank": true,
        "slotId": "param_kw",
        "placeholder": "<hive_flag>"
      },
      {
        "text": " = true)\nWHERE year = 2024 AND month = "
      },
      {
        "isBlank": true,
        "slotId": "month_num",
        "placeholder": "<month>"
      },
      {
        "text": " AND ticker = 'NVDA';"
      }
    ],
    "slots": {
      "hive_glob": {
        "correct": "*/*/*.parquet",
        "options": [
          "*/*/*.parquet",
          "*.csv",
          "all.dat",
          "data.parquet"
        ]
      },
      "param_kw": {
        "correct": "hive_partitioning",
        "options": [
          "hive_partitioning",
          "auto_detect",
          "schema_inference",
          "prune_dirs"
        ]
      },
      "month_num": {
        "correct": "3",
        "options": [
          "3",
          "0",
          "NULL",
          "ALL"
        ]
      }
    },
    "explanation": "Setting hive_partitioning = true allows DuckDB to read directory paths as virtual columns and skip unneeded month folders completely!"
  }
];
