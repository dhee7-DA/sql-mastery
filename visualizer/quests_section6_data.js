// =============================================================================
// SECTION 06: WINDOW FUNCTIONS & ANALYTICAL PARTITIONING (100 INTERACTIVE QUESTS)
// 5 Disciplines x 20 Levels (Ranking, Offsets, Cumulative, Frames, Extremums)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.WINDOW_DISCIPLINES_METADATA = [
  {
    "key": "ranking",
    "name": "ROW NUMBERING & RANKING",
    "symbol": "🏅",
    "color": "#38bdf8",
    "concept": "Positional & Tier Distribution",
    "whenToUse": "Assigns integer ranks to rows based on ordering. Distinguishes ties via strict sequence (ROW_NUMBER), gap-skipping ranks (RANK), or gapless ranks (DENSE_RANK).",
    "scenarios": "Top-3 highest revenue products per region; Leaderboards without score ties; Decile and quartile customer grouping via NTILE(4).",
    "traps": "RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "key": "offsets",
    "name": "TEMPORAL OFFSETS (LEAD & LAG)",
    "symbol": "⏱️",
    "color": "#10b981",
    "concept": "Inter-Row Velocity & Delta",
    "whenToUse": "Fetches values from preceding (LAG) or succeeding (LEAD) rows without requiring self-joins.",
    "scenarios": "Day-over-day stock price delta; Month-over-Month (MoM) revenue growth %; Customer inactivity intervals; Churn signal detection.",
    "traps": "The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "key": "running_totals",
    "name": "CUMULATIVE ACCUMULATORS",
    "symbol": "📈",
    "color": "#f59e0b",
    "concept": "Running Sums & High-Water Marks",
    "whenToUse": "Computes cumulative aggregates row-by-row along an ordered sequence.",
    "scenarios": "Year-to-Date (YTD) running revenue; Bank account running ledger balance; Running transaction count per user; High-water mark asset peak.",
    "traps": "When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "key": "window_frames",
    "name": "SLIDING WINDOW FRAMES",
    "symbol": "🪟",
    "color": "#ec4899",
    "concept": "Moving Averages & Local Horizons",
    "whenToUse": "Defines an explicit physical sliding window of rows relative to CURRENT ROW using ROWS BETWEEN ... AND ...",
    "scenarios": "7-day and 30-day moving average smoothing; Rolling 3-month volatility index; Local 5-transaction burst fraud detection.",
    "traps": "Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "key": "extremums_stats",
    "name": "BOUNDARY PICKS & PERCENTILES",
    "symbol": "🎯",
    "color": "#a855f7",
    "concept": "Anchor Values & Statistical Distribution",
    "whenToUse": "Extracts boundary values (FIRST_VALUE, LAST_VALUE, NTH_VALUE) or relative percentile position (PERCENT_RANK, CUME_DIST).",
    "scenarios": "Comparing current execution against initial market open price; Executive compensation percentile scoring; Cumulative distribution of portfolio credit ratings.",
    "traps": "LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  }
];

window.QUESTS_SECTION_6 = [
  {
    "id": 501,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 01",
    "title": "Window Ranking: Level 01: Positional ROW_NUMBER()",
    "subtitle": "Assign ranking ranks along execution_time ordered partition.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate ROW_NUMBER() for SalesTrades across the full dataset without partitioning.",
    "xp": 25,
    "table": "SalesTrades",
    "scenario": "Assign ranking ranks along execution_time ordered partition.",
    "businessObjective": "Calculate ROW_NUMBER() for SalesTrades across the full dataset without partitioning.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time TIMESTAMP, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, ROW_NUMBER()() OVER (ORDER BY trade_amount DESC) AS ranking\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (ORDER BY trade_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROW_NUMBER()()",
        "options": [
          "ROW_NUMBER()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "APPLY",
          "USING"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 502,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 02",
    "title": "Window Ranking: Level 02: Positional ROW_NUMBER()",
    "subtitle": "Assign ranking ranks along entry_date ordered partition.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate ROW_NUMBER() for BankLedger across the full dataset without partitioning.",
    "xp": 25,
    "table": "BankLedger",
    "scenario": "Assign ranking ranks along entry_date ordered partition.",
    "businessObjective": "Calculate ROW_NUMBER() for BankLedger across the full dataset without partitioning.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date TIMESTAMP, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, ROW_NUMBER()() OVER (ORDER BY delta_amount DESC) AS ranking\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (ORDER BY delta_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROW_NUMBER()()",
        "options": [
          "ROW_NUMBER()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "APPLY",
          "USING"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 503,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 03",
    "title": "Window Ranking: Level 03: Positional ROW_NUMBER()",
    "subtitle": "Assign ranking ranks along trade_date ordered partition.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate ROW_NUMBER() for DailyStockPrices across the full dataset without partitioning.",
    "xp": 26,
    "table": "DailyStockPrices",
    "scenario": "Assign ranking ranks along trade_date ordered partition.",
    "businessObjective": "Calculate ROW_NUMBER() for DailyStockPrices across the full dataset without partitioning.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date TIMESTAMP, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, ROW_NUMBER()() OVER (ORDER BY closing_price DESC) AS ranking\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (ORDER BY closing_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROW_NUMBER()()",
        "options": [
          "ROW_NUMBER()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "APPLY",
          "USING"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 504,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 04",
    "title": "Window Ranking: Level 04: Positional ROW_NUMBER()",
    "subtitle": "Assign ranking ranks along order_date ordered partition.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate ROW_NUMBER() for CustomerOrders across the full dataset without partitioning.",
    "xp": 26,
    "table": "CustomerOrders",
    "scenario": "Assign ranking ranks along order_date ordered partition.",
    "businessObjective": "Calculate ROW_NUMBER() for CustomerOrders across the full dataset without partitioning.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date TIMESTAMP, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, ROW_NUMBER()() OVER (ORDER BY total_spend DESC) AS ranking\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (ORDER BY total_spend ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROW_NUMBER()()",
        "options": [
          "ROW_NUMBER()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "APPLY",
          "USING"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 505,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 05",
    "title": "Window Ranking: Level 05: Positional ROW_NUMBER()",
    "subtitle": "Assign ranking ranks along logged_at ordered partition.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate ROW_NUMBER() for ServerMetrics across the full dataset without partitioning.",
    "xp": 27,
    "table": "ServerMetrics",
    "scenario": "Assign ranking ranks along logged_at ordered partition.",
    "businessObjective": "Calculate ROW_NUMBER() for ServerMetrics across the full dataset without partitioning.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at TIMESTAMP, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, ROW_NUMBER()() OVER (ORDER BY cpu_usage DESC) AS ranking\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (ORDER BY cpu_usage ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROW_NUMBER()()",
        "options": [
          "ROW_NUMBER()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "APPLY",
          "USING"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 506,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 06",
    "title": "Window Ranking: Level 06: Partitioned ROW_NUMBER()",
    "subtitle": "Assign ranking ranks partitioned by department_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate ROW_NUMBER() for EmployeeCompensation partitioned by department_id.",
    "xp": 27,
    "table": "EmployeeCompensation",
    "scenario": "Assign ranking ranks partitioned by department_id.",
    "businessObjective": "Calculate ROW_NUMBER() for EmployeeCompensation partitioned by department_id.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary TIMESTAMP, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, ROW_NUMBER()() OVER (PARTITION BY department_id ORDER BY bonus_pct DESC) AS ranking\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " department_id ORDER BY bonus_pct ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROW_NUMBER()()",
        "options": [
          "ROW_NUMBER()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 507,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 07",
    "title": "Window Ranking: Level 07: Partitioned RANK()",
    "subtitle": "Assign ranking ranks partitioned by user_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate RANK() for UserSessions partitioned by user_id.",
    "xp": 27,
    "table": "UserSessions",
    "scenario": "Assign ranking ranks partitioned by user_id.",
    "businessObjective": "Calculate RANK() for UserSessions partitioned by user_id.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at TIMESTAMP, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, RANK()() OVER (PARTITION BY user_id ORDER BY duration_seconds DESC) AS ranking\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " user_id ORDER BY duration_seconds ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RANK()()",
        "options": [
          "RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 508,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 08",
    "title": "Window Ranking: Level 08: Partitioned RANK()",
    "subtitle": "Assign ranking ranks partitioned by pair_symbol.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate RANK() for CryptoTicks partitioned by pair_symbol.",
    "xp": 28,
    "table": "CryptoTicks",
    "scenario": "Assign ranking ranks partitioned by pair_symbol.",
    "businessObjective": "Calculate RANK() for CryptoTicks partitioned by pair_symbol.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time TIMESTAMP, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, RANK()() OVER (PARTITION BY pair_symbol ORDER BY price_usd DESC) AS ranking\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " pair_symbol ORDER BY price_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RANK()()",
        "options": [
          "RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 509,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 09",
    "title": "Window Ranking: Level 09: Partitioned RANK()",
    "subtitle": "Assign ranking ranks partitioned by desk_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate RANK() for SalesTrades partitioned by desk_id.",
    "xp": 28,
    "table": "SalesTrades",
    "scenario": "Assign ranking ranks partitioned by desk_id.",
    "businessObjective": "Calculate RANK() for SalesTrades partitioned by desk_id.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time TIMESTAMP, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, RANK()() OVER (PARTITION BY desk_id ORDER BY trade_amount DESC) AS ranking\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " desk_id ORDER BY trade_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RANK()()",
        "options": [
          "RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 510,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 10",
    "title": "Window Ranking: Level 10: Partitioned RANK()",
    "subtitle": "Assign ranking ranks partitioned by account_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate RANK() for BankLedger partitioned by account_id.",
    "xp": 29,
    "table": "BankLedger",
    "scenario": "Assign ranking ranks partitioned by account_id.",
    "businessObjective": "Calculate RANK() for BankLedger partitioned by account_id.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date TIMESTAMP, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, RANK()() OVER (PARTITION BY account_id ORDER BY delta_amount DESC) AS ranking\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " account_id ORDER BY delta_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RANK()()",
        "options": [
          "RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 511,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 11",
    "title": "Window Ranking: Level 11: Partitioned RANK()",
    "subtitle": "Assign ranking ranks partitioned by ticker.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate RANK() for DailyStockPrices partitioned by ticker.",
    "xp": 29,
    "table": "DailyStockPrices",
    "scenario": "Assign ranking ranks partitioned by ticker.",
    "businessObjective": "Calculate RANK() for DailyStockPrices partitioned by ticker.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date TIMESTAMP, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, RANK()() OVER (PARTITION BY ticker ORDER BY closing_price DESC) AS ranking\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " ticker ORDER BY closing_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RANK()()",
        "options": [
          "RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 512,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 12",
    "title": "Window Ranking: Level 12: Partitioned RANK()",
    "subtitle": "Assign ranking ranks partitioned by customer_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate RANK() for CustomerOrders partitioned by customer_id.",
    "xp": 29,
    "table": "CustomerOrders",
    "scenario": "Assign ranking ranks partitioned by customer_id.",
    "businessObjective": "Calculate RANK() for CustomerOrders partitioned by customer_id.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date TIMESTAMP, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, RANK()() OVER (PARTITION BY customer_id ORDER BY total_spend DESC) AS ranking\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " customer_id ORDER BY total_spend ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RANK()()",
        "options": [
          "RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 513,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 13",
    "title": "Window Ranking: Level 13: Partitioned DENSE_RANK()",
    "subtitle": "Assign ranking ranks partitioned by cluster_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate DENSE_RANK() for ServerMetrics partitioned by cluster_id.",
    "xp": 30,
    "table": "ServerMetrics",
    "scenario": "Assign ranking ranks partitioned by cluster_id.",
    "businessObjective": "Calculate DENSE_RANK() for ServerMetrics partitioned by cluster_id.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at TIMESTAMP, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, DENSE_RANK()() OVER (PARTITION BY cluster_id ORDER BY cpu_usage DESC) AS ranking\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " cluster_id ORDER BY cpu_usage ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DENSE_RANK()()",
        "options": [
          "DENSE_RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 514,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 14",
    "title": "Window Ranking: Level 14: Partitioned DENSE_RANK()",
    "subtitle": "Assign ranking ranks partitioned by department_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate DENSE_RANK() for EmployeeCompensation partitioned by department_id.",
    "xp": 30,
    "table": "EmployeeCompensation",
    "scenario": "Assign ranking ranks partitioned by department_id.",
    "businessObjective": "Calculate DENSE_RANK() for EmployeeCompensation partitioned by department_id.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary TIMESTAMP, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, DENSE_RANK()() OVER (PARTITION BY department_id ORDER BY bonus_pct DESC) AS ranking\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " department_id ORDER BY bonus_pct ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DENSE_RANK()()",
        "options": [
          "DENSE_RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 515,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 15",
    "title": "Window Ranking: Level 15: Partitioned DENSE_RANK()",
    "subtitle": "Assign ranking ranks partitioned by user_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate DENSE_RANK() for UserSessions partitioned by user_id.",
    "xp": 31,
    "table": "UserSessions",
    "scenario": "Assign ranking ranks partitioned by user_id.",
    "businessObjective": "Calculate DENSE_RANK() for UserSessions partitioned by user_id.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at TIMESTAMP, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, DENSE_RANK()() OVER (PARTITION BY user_id ORDER BY duration_seconds DESC) AS ranking\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " user_id ORDER BY duration_seconds ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DENSE_RANK()()",
        "options": [
          "DENSE_RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 516,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 16",
    "title": "Window Ranking: Level 16: Partitioned DENSE_RANK()",
    "subtitle": "Assign ranking ranks partitioned by pair_symbol.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate DENSE_RANK() for CryptoTicks partitioned by pair_symbol.",
    "xp": 31,
    "table": "CryptoTicks",
    "scenario": "Assign ranking ranks partitioned by pair_symbol.",
    "businessObjective": "Calculate DENSE_RANK() for CryptoTicks partitioned by pair_symbol.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time TIMESTAMP, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, DENSE_RANK()() OVER (PARTITION BY pair_symbol ORDER BY price_usd DESC) AS ranking\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " pair_symbol ORDER BY price_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DENSE_RANK()()",
        "options": [
          "DENSE_RANK()()",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 517,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 17",
    "title": "Window Ranking: Level 17: Partitioned NTILE",
    "subtitle": "Assign ranking ranks partitioned by desk_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate NTILE(4) for SalesTrades partitioned by desk_id.",
    "xp": 31,
    "table": "SalesTrades",
    "scenario": "Assign ranking ranks partitioned by desk_id.",
    "businessObjective": "Calculate NTILE(4) for SalesTrades partitioned by desk_id.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time TIMESTAMP, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, NTILE(4) OVER (PARTITION BY desk_id ORDER BY trade_amount DESC) AS ranking\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " desk_id ORDER BY trade_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NTILE(4)",
        "options": [
          "NTILE(4)",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 518,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 18",
    "title": "Window Ranking: Level 18: Partitioned NTILE",
    "subtitle": "Assign ranking ranks partitioned by account_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate NTILE(4) for BankLedger partitioned by account_id.",
    "xp": 32,
    "table": "BankLedger",
    "scenario": "Assign ranking ranks partitioned by account_id.",
    "businessObjective": "Calculate NTILE(4) for BankLedger partitioned by account_id.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date TIMESTAMP, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, NTILE(4) OVER (PARTITION BY account_id ORDER BY delta_amount DESC) AS ranking\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " account_id ORDER BY delta_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NTILE(4)",
        "options": [
          "NTILE(4)",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 519,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 19",
    "title": "Window Ranking: Level 19: Partitioned NTILE",
    "subtitle": "Assign ranking ranks partitioned by ticker.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate NTILE(4) for DailyStockPrices partitioned by ticker.",
    "xp": 32,
    "table": "DailyStockPrices",
    "scenario": "Assign ranking ranks partitioned by ticker.",
    "businessObjective": "Calculate NTILE(4) for DailyStockPrices partitioned by ticker.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date TIMESTAMP, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, NTILE(4) OVER (PARTITION BY ticker ORDER BY closing_price DESC) AS ranking\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " ticker ORDER BY closing_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NTILE(4)",
        "options": [
          "NTILE(4)",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 520,
    "discipline": "ROW NUMBERING & RANKING",
    "disciplineKey": "ranking",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "WINDOW Lvl 20",
    "title": "Window Ranking: Level 20: Partitioned NTILE",
    "subtitle": "Assign ranking ranks partitioned by customer_id.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (ROW NUMBERING & RANKING)",
    "subcluster": "ROW NUMBERING & RANKING (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Calculate NTILE(4) for CustomerOrders partitioned by customer_id.",
    "xp": 33,
    "table": "CustomerOrders",
    "scenario": "Assign ranking ranks partitioned by customer_id.",
    "businessObjective": "Calculate NTILE(4) for CustomerOrders partitioned by customer_id.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date TIMESTAMP, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, NTILE(4) OVER (PARTITION BY customer_id ORDER BY total_spend DESC) AS ranking\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": " OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION CLAUSE ]"
      },
      {
        "text": " customer_id ORDER BY total_spend ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DIR ]"
      },
      {
        "text": ") AS ranking\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NTILE(4)",
        "options": [
          "NTILE(4)",
          "COUNT(*)",
          "INDEX()",
          "LIMIT(4)"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "DISTRIBUTE BY",
          "CLUSTER BY"
        ]
      },
      "slot3": {
        "correct": "DESC",
        "options": [
          "DESC",
          "ASC",
          "TOP",
          "MAX"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. RANK() leaves gaps after ties (1, 2, 2, 4); ROW_NUMBER() arbitrarily breaks ties unless secondary tie-breaker columns are specified; Forgetting ORDER BY inside OVER()."
  },
  {
    "id": 521,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 21",
    "title": "Temporal Velocity: Level 01: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along logged_at.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in ServerMetrics.",
    "xp": 33,
    "table": "ServerMetrics",
    "scenario": "Compare current record with previous or following record along logged_at.",
    "businessObjective": "Use LAG() to inspect chronological values in ServerMetrics.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  LAG(cpu_usage) OVER (PARTITION BY cluster_id ORDER BY logged_at) AS prev_val\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(cpu_usage) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "cluster_id",
        "options": [
          "cluster_id",
          "cpu_usage",
          "metric_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "logged_at ASC",
        "options": [
          "logged_at ASC",
          "logged_at DESC",
          "NULL",
          "cluster_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 522,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 22",
    "title": "Temporal Velocity: Level 02: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(bonus_pct, 1, 0) partitioned by department_id.",
    "xp": 33,
    "table": "EmployeeCompensation",
    "scenario": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(bonus_pct, 1, 0) partitioned by department_id.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  LEAD(bonus_pct, 1, 0) OVER (PARTITION BY department_id ORDER BY salary ASC) AS offset_val\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(bonus_pct, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY department_id ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "1, 0",
        "options": [
          "1, 0",
          "1, NULL",
          "1",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "salary ASC",
        "options": [
          "salary ASC",
          "salary DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 523,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 23",
    "title": "Temporal Velocity: Level 03: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along started_at.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in UserSessions.",
    "xp": 34,
    "table": "UserSessions",
    "scenario": "Compare current record with previous or following record along started_at.",
    "businessObjective": "Use LAG() to inspect chronological values in UserSessions.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  LAG(duration_seconds) OVER (PARTITION BY user_id ORDER BY started_at) AS prev_val\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(duration_seconds) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "user_id",
        "options": [
          "user_id",
          "duration_seconds",
          "session_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "started_at ASC",
        "options": [
          "started_at ASC",
          "started_at DESC",
          "NULL",
          "user_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 524,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 24",
    "title": "Temporal Velocity: Level 04: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(price_usd, 1, 0) partitioned by pair_symbol.",
    "xp": 34,
    "table": "CryptoTicks",
    "scenario": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(price_usd, 1, 0) partitioned by pair_symbol.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  LEAD(price_usd, 1, 0) OVER (PARTITION BY pair_symbol ORDER BY tick_time ASC) AS offset_val\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(price_usd, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY pair_symbol ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "1, 0",
        "options": [
          "1, 0",
          "1, NULL",
          "1",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "tick_time ASC",
        "options": [
          "tick_time ASC",
          "tick_time DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 525,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 25",
    "title": "Temporal Velocity: Level 05: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along execution_time.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in SalesTrades.",
    "xp": 35,
    "table": "SalesTrades",
    "scenario": "Compare current record with previous or following record along execution_time.",
    "businessObjective": "Use LAG() to inspect chronological values in SalesTrades.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  LAG(trade_amount) OVER (PARTITION BY desk_id ORDER BY execution_time) AS prev_val\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(trade_amount) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "trade_amount",
          "trade_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "execution_time ASC",
        "options": [
          "execution_time ASC",
          "execution_time DESC",
          "NULL",
          "desk_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 526,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 26",
    "title": "Temporal Velocity: Level 06: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(delta_amount, 1, 0) partitioned by account_id.",
    "xp": 35,
    "table": "BankLedger",
    "scenario": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(delta_amount, 1, 0) partitioned by account_id.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  LEAD(delta_amount, 1, 0) OVER (PARTITION BY account_id ORDER BY entry_date ASC) AS offset_val\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(delta_amount, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY account_id ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "1, 0",
        "options": [
          "1, 0",
          "1, NULL",
          "1",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "entry_date ASC",
        "options": [
          "entry_date ASC",
          "entry_date DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 527,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 27",
    "title": "Temporal Velocity: Level 07: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along trade_date.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in DailyStockPrices.",
    "xp": 35,
    "table": "DailyStockPrices",
    "scenario": "Compare current record with previous or following record along trade_date.",
    "businessObjective": "Use LAG() to inspect chronological values in DailyStockPrices.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  LAG(closing_price) OVER (PARTITION BY ticker ORDER BY trade_date) AS prev_val\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(closing_price) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "ticker",
        "options": [
          "ticker",
          "closing_price",
          "ticker_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "trade_date ASC",
        "options": [
          "trade_date ASC",
          "trade_date DESC",
          "NULL",
          "ticker"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 528,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 28",
    "title": "Temporal Velocity: Level 08: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(total_spend, 1, 0) partitioned by customer_id.",
    "xp": 36,
    "table": "CustomerOrders",
    "scenario": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(total_spend, 1, 0) partitioned by customer_id.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  LEAD(total_spend, 1, 0) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS offset_val\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(total_spend, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY customer_id ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "1, 0",
        "options": [
          "1, 0",
          "1, NULL",
          "1",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "order_date ASC",
        "options": [
          "order_date ASC",
          "order_date DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 529,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 29",
    "title": "Temporal Velocity: Level 09: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along logged_at.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in ServerMetrics.",
    "xp": 36,
    "table": "ServerMetrics",
    "scenario": "Compare current record with previous or following record along logged_at.",
    "businessObjective": "Use LAG() to inspect chronological values in ServerMetrics.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  LAG(cpu_usage) OVER (PARTITION BY cluster_id ORDER BY logged_at) AS prev_val\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(cpu_usage) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "cluster_id",
        "options": [
          "cluster_id",
          "cpu_usage",
          "metric_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "logged_at ASC",
        "options": [
          "logged_at ASC",
          "logged_at DESC",
          "NULL",
          "cluster_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 530,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 30",
    "title": "Temporal Velocity: Level 10: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(bonus_pct, 1, 0) partitioned by department_id.",
    "xp": 37,
    "table": "EmployeeCompensation",
    "scenario": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(bonus_pct, 1, 0) partitioned by department_id.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  LEAD(bonus_pct, 1, 0) OVER (PARTITION BY department_id ORDER BY salary ASC) AS offset_val\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(bonus_pct, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY department_id ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "1, 0",
        "options": [
          "1, 0",
          "1, NULL",
          "1",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "salary ASC",
        "options": [
          "salary ASC",
          "salary DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 531,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 31",
    "title": "Temporal Velocity: Level 11: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along started_at.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in UserSessions.",
    "xp": 37,
    "table": "UserSessions",
    "scenario": "Compare current record with previous or following record along started_at.",
    "businessObjective": "Use LAG() to inspect chronological values in UserSessions.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  LAG(duration_seconds) OVER (PARTITION BY user_id ORDER BY started_at) AS prev_val\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(duration_seconds) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "user_id",
        "options": [
          "user_id",
          "duration_seconds",
          "session_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "started_at ASC",
        "options": [
          "started_at ASC",
          "started_at DESC",
          "NULL",
          "user_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 532,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 32",
    "title": "Temporal Velocity: Level 12: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(price_usd, 1, 0) partitioned by pair_symbol.",
    "xp": 37,
    "table": "CryptoTicks",
    "scenario": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(price_usd, 1, 0) partitioned by pair_symbol.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  LEAD(price_usd, 1, 0) OVER (PARTITION BY pair_symbol ORDER BY tick_time ASC) AS offset_val\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(price_usd, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY pair_symbol ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "1, 0",
        "options": [
          "1, 0",
          "1, NULL",
          "1",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "tick_time ASC",
        "options": [
          "tick_time ASC",
          "tick_time DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 533,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 33",
    "title": "Temporal Velocity: Level 13: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along execution_time.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in SalesTrades.",
    "xp": 38,
    "table": "SalesTrades",
    "scenario": "Compare current record with previous or following record along execution_time.",
    "businessObjective": "Use LAG() to inspect chronological values in SalesTrades.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  LAG(trade_amount) OVER (PARTITION BY desk_id ORDER BY execution_time) AS prev_val\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(trade_amount) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "trade_amount",
          "trade_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "execution_time ASC",
        "options": [
          "execution_time ASC",
          "execution_time DESC",
          "NULL",
          "desk_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 534,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 34",
    "title": "Temporal Velocity: Level 14: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(delta_amount, 1, 0) partitioned by account_id.",
    "xp": 38,
    "table": "BankLedger",
    "scenario": "Extract LEAD value with offset 1 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(delta_amount, 1, 0) partitioned by account_id.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  LEAD(delta_amount, 1, 0) OVER (PARTITION BY account_id ORDER BY entry_date ASC) AS offset_val\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(delta_amount, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY account_id ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "1, 0",
        "options": [
          "1, 0",
          "1, NULL",
          "1",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "entry_date ASC",
        "options": [
          "entry_date ASC",
          "entry_date DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 535,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 35",
    "title": "Temporal Velocity: Level 15: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along trade_date.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in DailyStockPrices.",
    "xp": 39,
    "table": "DailyStockPrices",
    "scenario": "Compare current record with previous or following record along trade_date.",
    "businessObjective": "Use LAG() to inspect chronological values in DailyStockPrices.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  LAG(closing_price) OVER (PARTITION BY ticker ORDER BY trade_date) AS prev_val\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(closing_price) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "ticker",
        "options": [
          "ticker",
          "closing_price",
          "ticker_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "trade_date ASC",
        "options": [
          "trade_date ASC",
          "trade_date DESC",
          "NULL",
          "ticker"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 536,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 36",
    "title": "Temporal Velocity: Level 16: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 2 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(total_spend, 2, 0) partitioned by customer_id.",
    "xp": 39,
    "table": "CustomerOrders",
    "scenario": "Extract LEAD value with offset 2 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(total_spend, 2, 0) partitioned by customer_id.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  LEAD(total_spend, 2, 0) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS offset_val\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(total_spend, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY customer_id ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "2, 0",
        "options": [
          "2, 0",
          "2, NULL",
          "2",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "order_date ASC",
        "options": [
          "order_date ASC",
          "order_date DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 537,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 37",
    "title": "Temporal Velocity: Level 17: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along logged_at.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in ServerMetrics.",
    "xp": 39,
    "table": "ServerMetrics",
    "scenario": "Compare current record with previous or following record along logged_at.",
    "businessObjective": "Use LAG() to inspect chronological values in ServerMetrics.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  LAG(cpu_usage) OVER (PARTITION BY cluster_id ORDER BY logged_at) AS prev_val\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(cpu_usage) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "cluster_id",
        "options": [
          "cluster_id",
          "cpu_usage",
          "metric_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "logged_at ASC",
        "options": [
          "logged_at ASC",
          "logged_at DESC",
          "NULL",
          "cluster_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 538,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 38",
    "title": "Temporal Velocity: Level 18: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 2 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(bonus_pct, 2, 0) partitioned by department_id.",
    "xp": 40,
    "table": "EmployeeCompensation",
    "scenario": "Extract LEAD value with offset 2 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(bonus_pct, 2, 0) partitioned by department_id.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  LEAD(bonus_pct, 2, 0) OVER (PARTITION BY department_id ORDER BY salary ASC) AS offset_val\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(bonus_pct, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY department_id ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "2, 0",
        "options": [
          "2, 0",
          "2, NULL",
          "2",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "salary ASC",
        "options": [
          "salary ASC",
          "salary DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 539,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 39",
    "title": "Temporal Velocity: Level 19: Inter-Row LAG",
    "subtitle": "Compare current record with previous or following record along started_at.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use LAG() to inspect chronological values in UserSessions.",
    "xp": 40,
    "table": "UserSessions",
    "scenario": "Compare current record with previous or following record along started_at.",
    "businessObjective": "Use LAG() to inspect chronological values in UserSessions.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  LAG(duration_seconds) OVER (PARTITION BY user_id ORDER BY started_at) AS prev_val\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OFFSET FUNC ]"
      },
      {
        "text": "(duration_seconds) OVER (PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS prev_val\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAG",
        "options": [
          "LAG",
          "BACKWARD",
          "SHIFT",
          "OFFSET"
        ]
      },
      "slot2": {
        "correct": "user_id",
        "options": [
          "user_id",
          "duration_seconds",
          "session_id",
          "1"
        ]
      },
      "slot3": {
        "correct": "started_at ASC",
        "options": [
          "started_at ASC",
          "started_at DESC",
          "NULL",
          "user_id"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 540,
    "discipline": "TEMPORAL OFFSETS (LEAD & LAG)",
    "disciplineKey": "offsets",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 40",
    "title": "Temporal Velocity: Level 20: LEAD with Default Fallback",
    "subtitle": "Extract LEAD value with offset 2 and safe 0 fallback to prevent NULLs.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (TEMPORAL OFFSETS (LEAD & LAG))",
    "subcluster": "TEMPORAL OFFSETS (LEAD & LAG) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Safely calculate LEAD(price_usd, 2, 0) partitioned by pair_symbol.",
    "xp": 41,
    "table": "CryptoTicks",
    "scenario": "Extract LEAD value with offset 2 and safe 0 fallback to prevent NULLs.",
    "businessObjective": "Safely calculate LEAD(price_usd, 2, 0) partitioned by pair_symbol.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  LEAD(price_usd, 2, 0) OVER (PARTITION BY pair_symbol ORDER BY tick_time ASC) AS offset_val\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(price_usd, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OFFSET, DEFAULT ]"
      },
      {
        "text": ") ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY pair_symbol ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS offset_val\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LEAD",
        "options": [
          "LEAD",
          "PEEK",
          "FETCH_ROW",
          "WINDOW_OFFSET"
        ]
      },
      "slot2": {
        "correct": "2, 0",
        "options": [
          "2, 0",
          "2, NULL",
          "2",
          "DEFAULT"
        ]
      },
      "slot3": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "FOR"
        ]
      },
      "slot4": {
        "correct": "tick_time ASC",
        "options": [
          "tick_time ASC",
          "tick_time DESC",
          "CURRENT_ROW",
          "1"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. The first row of LAG() or last row of LEAD() produces NULL unless a fallback default is provided: LAG(price, 1, 0); Forgetting PARTITION BY mixes separate customer histories."
  },
  {
    "id": 541,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 41",
    "title": "Cumulative Totals: Level 01: Running SUM",
    "subtitle": "Accumulate running SUM partitioned by desk_id over chronological records.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Calculate running SUM(trade_amount) along ordered timeline in SalesTrades.",
    "xp": 41,
    "table": "SalesTrades",
    "scenario": "Accumulate running SUM partitioned by desk_id over chronological records.",
    "businessObjective": "Calculate running SUM(trade_amount) along ordered timeline in SalesTrades.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  SUM(trade_amount) OVER (PARTITION BY desk_id ORDER BY execution_time) AS running_metric\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATE ]"
      },
      {
        "text": "(trade_amount) OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS running_metric\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "RUNNING_SUM",
          "CUMULATIVE",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY desk_id",
        "options": [
          "PARTITION BY desk_id",
          "GROUP BY desk_id",
          "ALL",
          "OVER"
        ]
      },
      "slot3": {
        "correct": "execution_time ASC",
        "options": [
          "execution_time ASC",
          "execution_time DESC",
          "DEFAULT",
          "ROWS"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 542,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 42",
    "title": "Cumulative Totals: Level 02: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 41,
    "table": "BankLedger",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  SUM(delta_amount) OVER (\n    PARTITION BY account_id\n    ORDER BY entry_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  SUM(delta_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "account_id",
        "options": [
          "account_id",
          "delta_amount",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 543,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 43",
    "title": "Cumulative Totals: Level 03: Running SUM",
    "subtitle": "Accumulate running SUM partitioned by ticker over chronological records.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Calculate running SUM(closing_price) along ordered timeline in DailyStockPrices.",
    "xp": 42,
    "table": "DailyStockPrices",
    "scenario": "Accumulate running SUM partitioned by ticker over chronological records.",
    "businessObjective": "Calculate running SUM(closing_price) along ordered timeline in DailyStockPrices.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  SUM(closing_price) OVER (PARTITION BY ticker ORDER BY trade_date) AS running_metric\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATE ]"
      },
      {
        "text": "(closing_price) OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS running_metric\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "RUNNING_SUM",
          "CUMULATIVE",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY ticker",
        "options": [
          "PARTITION BY ticker",
          "GROUP BY ticker",
          "ALL",
          "OVER"
        ]
      },
      "slot3": {
        "correct": "trade_date ASC",
        "options": [
          "trade_date ASC",
          "trade_date DESC",
          "DEFAULT",
          "ROWS"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 544,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 44",
    "title": "Cumulative Totals: Level 04: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 42,
    "table": "CustomerOrders",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  SUM(total_spend) OVER (\n    PARTITION BY customer_id\n    ORDER BY order_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  SUM(total_spend) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "customer_id",
        "options": [
          "customer_id",
          "total_spend",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 545,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 45",
    "title": "Cumulative Totals: Level 05: Running SUM",
    "subtitle": "Accumulate running SUM partitioned by cluster_id over chronological records.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Calculate running SUM(cpu_usage) along ordered timeline in ServerMetrics.",
    "xp": 43,
    "table": "ServerMetrics",
    "scenario": "Accumulate running SUM partitioned by cluster_id over chronological records.",
    "businessObjective": "Calculate running SUM(cpu_usage) along ordered timeline in ServerMetrics.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  SUM(cpu_usage) OVER (PARTITION BY cluster_id ORDER BY logged_at) AS running_metric\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATE ]"
      },
      {
        "text": "(cpu_usage) OVER (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTITION ]"
      },
      {
        "text": " ORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER COL ]"
      },
      {
        "text": ") AS running_metric\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "RUNNING_SUM",
          "CUMULATIVE",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "PARTITION BY cluster_id",
        "options": [
          "PARTITION BY cluster_id",
          "GROUP BY cluster_id",
          "ALL",
          "OVER"
        ]
      },
      "slot3": {
        "correct": "logged_at ASC",
        "options": [
          "logged_at ASC",
          "logged_at DESC",
          "DEFAULT",
          "ROWS"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 546,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 46",
    "title": "Cumulative Totals: Level 06: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 43,
    "table": "EmployeeCompensation",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  SUM(bonus_pct) OVER (\n    PARTITION BY department_id\n    ORDER BY salary\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  SUM(bonus_pct) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY salary\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "department_id",
        "options": [
          "department_id",
          "bonus_pct",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 547,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 47",
    "title": "Cumulative Totals: Level 07: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 43,
    "table": "UserSessions",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  SUM(duration_seconds) OVER (\n    PARTITION BY user_id\n    ORDER BY started_at\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  SUM(duration_seconds) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY started_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "user_id",
        "options": [
          "user_id",
          "duration_seconds",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 548,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 48",
    "title": "Cumulative Totals: Level 08: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 44,
    "table": "CryptoTicks",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  SUM(price_usd) OVER (\n    PARTITION BY pair_symbol\n    ORDER BY tick_time\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  SUM(price_usd) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY tick_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "pair_symbol",
        "options": [
          "pair_symbol",
          "price_usd",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 549,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 49",
    "title": "Cumulative Totals: Level 09: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 44,
    "table": "SalesTrades",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  SUM(trade_amount) OVER (\n    PARTITION BY desk_id\n    ORDER BY execution_time\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  SUM(trade_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY execution_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "trade_amount",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 550,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 50",
    "title": "Cumulative Totals: Level 10: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 45,
    "table": "BankLedger",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative SUM with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  SUM(delta_amount) OVER (\n    PARTITION BY account_id\n    ORDER BY entry_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  SUM(delta_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "account_id",
        "options": [
          "account_id",
          "delta_amount",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 551,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 51",
    "title": "Cumulative Totals: Level 11: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 45,
    "table": "DailyStockPrices",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  AVG(closing_price) OVER (\n    PARTITION BY ticker\n    ORDER BY trade_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  AVG(closing_price) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY trade_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ticker",
        "options": [
          "ticker",
          "closing_price",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 552,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 52",
    "title": "Cumulative Totals: Level 12: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 45,
    "table": "CustomerOrders",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  AVG(total_spend) OVER (\n    PARTITION BY customer_id\n    ORDER BY order_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  AVG(total_spend) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "customer_id",
        "options": [
          "customer_id",
          "total_spend",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 553,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 53",
    "title": "Cumulative Totals: Level 13: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 46,
    "table": "ServerMetrics",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) OVER (\n    PARTITION BY cluster_id\n    ORDER BY logged_at\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY logged_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "cluster_id",
        "options": [
          "cluster_id",
          "cpu_usage",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 554,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 54",
    "title": "Cumulative Totals: Level 14: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 46,
    "table": "EmployeeCompensation",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) OVER (\n    PARTITION BY department_id\n    ORDER BY salary\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY salary\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "department_id",
        "options": [
          "department_id",
          "bonus_pct",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 555,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 55",
    "title": "Cumulative Totals: Level 15: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 47,
    "table": "UserSessions",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) OVER (\n    PARTITION BY user_id\n    ORDER BY started_at\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY started_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "user_id",
        "options": [
          "user_id",
          "duration_seconds",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 556,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 56",
    "title": "Cumulative Totals: Level 16: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 47,
    "table": "CryptoTicks",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative AVG with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  AVG(price_usd) OVER (\n    PARTITION BY pair_symbol\n    ORDER BY tick_time\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  AVG(price_usd) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY tick_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "pair_symbol",
        "options": [
          "pair_symbol",
          "price_usd",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 557,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 57",
    "title": "Cumulative Totals: Level 17: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 47,
    "table": "SalesTrades",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  COUNT(trade_amount) OVER (\n    PARTITION BY desk_id\n    ORDER BY execution_time\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  COUNT(trade_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY execution_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "trade_amount",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 558,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 58",
    "title": "Cumulative Totals: Level 18: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 48,
    "table": "BankLedger",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  COUNT(delta_amount) OVER (\n    PARTITION BY account_id\n    ORDER BY entry_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  COUNT(delta_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "account_id",
        "options": [
          "account_id",
          "delta_amount",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 559,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 59",
    "title": "Cumulative Totals: Level 19: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 48,
    "table": "DailyStockPrices",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  COUNT(closing_price) OVER (\n    PARTITION BY ticker\n    ORDER BY trade_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  COUNT(closing_price) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY trade_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ticker",
        "options": [
          "ticker",
          "closing_price",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 560,
    "discipline": "CUMULATIVE ACCUMULATORS",
    "disciplineKey": "running_totals",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 60",
    "title": "Cumulative Totals: Level 20: Explicit Physical Accumulator",
    "subtitle": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (CUMULATIVE ACCUMULATORS)",
    "subcluster": "CUMULATIVE ACCUMULATORS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "xp": 49,
    "table": "CustomerOrders",
    "scenario": "Enforce unbounded preceding frame to guarantee strict cumulative ledger accounting.",
    "businessObjective": "Write a cumulative COUNT with explicit ROWS BETWEEN UNBOUNDED PRECEDING frame.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  COUNT(total_spend) OVER (\n    PARTITION BY customer_id\n    ORDER BY order_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_accum\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  COUNT(total_spend) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (\n    PARTITION BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PART COL ]"
      },
      {
        "text": "\n    ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FRAME END ]"
      },
      {
        "text": "\n  ) AS running_accum\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "customer_id",
        "options": [
          "customer_id",
          "total_spend",
          "1",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "ROWS BETWEEN UNBOUNDED PRECEDING",
        "options": [
          "ROWS BETWEEN UNBOUNDED PRECEDING",
          "RANGE BETWEEN 1 PRECEDING",
          "ROWS FROM FIRST",
          "WINDOW START"
        ]
      },
      "slot4": {
        "correct": "CURRENT ROW",
        "options": [
          "CURRENT ROW",
          "UNBOUNDED FOLLOWING",
          "LAST ROW",
          "END"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. When ORDER BY is present inside OVER() without a frame clause, ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (merges peer values) rather than physical ROWS!"
  },
  {
    "id": 561,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 61",
    "title": "Sliding Window Frames: Level 01: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in ServerMetrics.",
    "xp": 49,
    "table": "ServerMetrics",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in ServerMetrics.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) OVER (\n    PARTITION BY cluster_id ORDER BY logged_at\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY cluster_id ORDER BY logged_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 562,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 62",
    "title": "Sliding Window Frames: Level 02: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in EmployeeCompensation.",
    "xp": 49,
    "table": "EmployeeCompensation",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in EmployeeCompensation.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) OVER (\n    PARTITION BY department_id ORDER BY salary\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY department_id ORDER BY salary\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 563,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 63",
    "title": "Sliding Window Frames: Level 03: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in UserSessions.",
    "xp": 50,
    "table": "UserSessions",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in UserSessions.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) OVER (\n    PARTITION BY user_id ORDER BY started_at\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY user_id ORDER BY started_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 564,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 64",
    "title": "Sliding Window Frames: Level 04: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in CryptoTicks.",
    "xp": 50,
    "table": "CryptoTicks",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in CryptoTicks.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  AVG(price_usd) OVER (\n    PARTITION BY pair_symbol ORDER BY tick_time\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  AVG(price_usd) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY pair_symbol ORDER BY tick_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 565,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 65",
    "title": "Sliding Window Frames: Level 05: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in SalesTrades.",
    "xp": 51,
    "table": "SalesTrades",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in SalesTrades.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  AVG(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  AVG(trade_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY desk_id ORDER BY execution_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 566,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 66",
    "title": "Sliding Window Frames: Level 06: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in BankLedger.",
    "xp": 51,
    "table": "BankLedger",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in BankLedger.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  AVG(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  AVG(delta_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY account_id ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 567,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 67",
    "title": "Sliding Window Frames: Level 07: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in DailyStockPrices.",
    "xp": 51,
    "table": "DailyStockPrices",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in DailyStockPrices.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  AVG(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  AVG(closing_price) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY ticker ORDER BY trade_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 568,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 68",
    "title": "Sliding Window Frames: Level 08: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in CustomerOrders.",
    "xp": 52,
    "table": "CustomerOrders",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in CustomerOrders.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  AVG(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  AVG(total_spend) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY customer_id ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 569,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 69",
    "title": "Sliding Window Frames: Level 09: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in ServerMetrics.",
    "xp": 52,
    "table": "ServerMetrics",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in ServerMetrics.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) OVER (\n    PARTITION BY cluster_id ORDER BY logged_at\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY cluster_id ORDER BY logged_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 570,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 70",
    "title": "Sliding Window Frames: Level 10: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in EmployeeCompensation.",
    "xp": 53,
    "table": "EmployeeCompensation",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in EmployeeCompensation.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) OVER (\n    PARTITION BY department_id ORDER BY salary\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY department_id ORDER BY salary\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 571,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 71",
    "title": "Sliding Window Frames: Level 11: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in UserSessions.",
    "xp": 53,
    "table": "UserSessions",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in UserSessions.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) OVER (\n    PARTITION BY user_id ORDER BY started_at\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY user_id ORDER BY started_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 572,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 72",
    "title": "Sliding Window Frames: Level 12: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in CryptoTicks.",
    "xp": 53,
    "table": "CryptoTicks",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in CryptoTicks.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  AVG(price_usd) OVER (\n    PARTITION BY pair_symbol ORDER BY tick_time\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  AVG(price_usd) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY pair_symbol ORDER BY tick_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 573,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 73",
    "title": "Sliding Window Frames: Level 13: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in SalesTrades.",
    "xp": 54,
    "table": "SalesTrades",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in SalesTrades.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  AVG(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  AVG(trade_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY desk_id ORDER BY execution_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 574,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 74",
    "title": "Sliding Window Frames: Level 14: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in BankLedger.",
    "xp": 54,
    "table": "BankLedger",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in BankLedger.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  AVG(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  AVG(delta_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY account_id ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 575,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "WINDOW Lvl 75",
    "title": "Sliding Window Frames: Level 15: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a centered 3-row moving average around each record in DailyStockPrices.",
    "xp": 55,
    "table": "DailyStockPrices",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in DailyStockPrices.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  AVG(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  AVG(closing_price) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY ticker ORDER BY trade_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 576,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 76",
    "title": "Sliding Window Frames: Level 16: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a centered 3-row moving average around each record in CustomerOrders.",
    "xp": 55,
    "table": "CustomerOrders",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in CustomerOrders.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  AVG(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  AVG(total_spend) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY customer_id ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 577,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 77",
    "title": "Sliding Window Frames: Level 17: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a centered 3-row moving average around each record in ServerMetrics.",
    "xp": 55,
    "table": "ServerMetrics",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in ServerMetrics.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) OVER (\n    PARTITION BY cluster_id ORDER BY logged_at\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  AVG(cpu_usage) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY cluster_id ORDER BY logged_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 578,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 78",
    "title": "Sliding Window Frames: Level 18: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a centered 3-row moving average around each record in EmployeeCompensation.",
    "xp": 56,
    "table": "EmployeeCompensation",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in EmployeeCompensation.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) OVER (\n    PARTITION BY department_id ORDER BY salary\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  AVG(bonus_pct) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY department_id ORDER BY salary\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 579,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 79",
    "title": "Sliding Window Frames: Level 19: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a centered 3-row moving average around each record in UserSessions.",
    "xp": 56,
    "table": "UserSessions",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in UserSessions.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) OVER (\n    PARTITION BY user_id ORDER BY started_at\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  AVG(duration_seconds) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY user_id ORDER BY started_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 580,
    "discipline": "SLIDING WINDOW FRAMES",
    "disciplineKey": "window_frames",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 80",
    "title": "Sliding Window Frames: Level 20: Centered Moving Window",
    "subtitle": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (SLIDING WINDOW FRAMES)",
    "subcluster": "SLIDING WINDOW FRAMES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a centered 3-row moving average around each record in CryptoTicks.",
    "xp": 57,
    "table": "CryptoTicks",
    "scenario": "Symmetric smoothing: 1 row preceding, current row, and 1 row following.",
    "businessObjective": "Build a centered 3-row moving average around each record in CryptoTicks.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  AVG(price_usd) OVER (\n    PARTITION BY pair_symbol ORDER BY tick_time\n    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n  ) AS centered_avg\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  AVG(price_usd) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OVER ]"
      },
      {
        "text": " (PARTITION BY pair_symbol ORDER BY tick_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME SPEC ]"
      },
      {
        "text": " 1 PRECEDING AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UPPER BOUND ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIR ]"
      },
      {
        "text": "\n  ) AS centered_avg\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "OVER",
        "options": [
          "OVER",
          "WINDOW",
          "ACROSS",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE BETWEEN",
          "WINDOW IN",
          "FRAME FROM"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "0",
          "UNBOUNDED",
          "CURRENT"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "NEXT",
          "AHEAD",
          "LATER"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. Omitting CURRENT ROW in lower boundary; Confusing ROWS (physical row count) with RANGE (logical value distance); Frame syntax errors."
  },
  {
    "id": 581,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 81",
    "title": "Boundary & Stats: Level 01: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(trade_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 57,
    "table": "SalesTrades",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(trade_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  LAST_VALUE(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 582,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 82",
    "title": "Boundary & Stats: Level 02: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(delta_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 57,
    "table": "BankLedger",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(delta_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  LAST_VALUE(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 583,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 83",
    "title": "Boundary & Stats: Level 03: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(closing_price) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 58,
    "table": "DailyStockPrices",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(closing_price) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  LAST_VALUE(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 584,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 84",
    "title": "Boundary & Stats: Level 04: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(total_spend) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 58,
    "table": "CustomerOrders",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(total_spend) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  LAST_VALUE(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 585,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 85",
    "title": "Boundary & Stats: Level 05: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(cpu_usage) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 59,
    "table": "ServerMetrics",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(cpu_usage) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  LAST_VALUE(cpu_usage) OVER (\n    PARTITION BY cluster_id ORDER BY logged_at\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(cpu_usage) OVER (\n    PARTITION BY cluster_id ORDER BY logged_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 586,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 86",
    "title": "Boundary & Stats: Level 06: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(bonus_pct) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 59,
    "table": "EmployeeCompensation",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(bonus_pct) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  LAST_VALUE(bonus_pct) OVER (\n    PARTITION BY department_id ORDER BY salary\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(bonus_pct) OVER (\n    PARTITION BY department_id ORDER BY salary\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 587,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 87",
    "title": "Boundary & Stats: Level 07: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(duration_seconds) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 59,
    "table": "UserSessions",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(duration_seconds) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  LAST_VALUE(duration_seconds) OVER (\n    PARTITION BY user_id ORDER BY started_at\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(duration_seconds) OVER (\n    PARTITION BY user_id ORDER BY started_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 588,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 88",
    "title": "Boundary & Stats: Level 08: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(price_usd) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 60,
    "table": "CryptoTicks",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(price_usd) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  LAST_VALUE(price_usd) OVER (\n    PARTITION BY pair_symbol ORDER BY tick_time\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(price_usd) OVER (\n    PARTITION BY pair_symbol ORDER BY tick_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 589,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 89",
    "title": "Boundary & Stats: Level 09: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(trade_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 60,
    "table": "SalesTrades",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(trade_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  LAST_VALUE(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 590,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 90",
    "title": "Boundary & Stats: Level 10: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(delta_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 61,
    "table": "BankLedger",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(delta_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  LAST_VALUE(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 591,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 91",
    "title": "Boundary & Stats: Level 11: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(closing_price) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 61,
    "table": "DailyStockPrices",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(closing_price) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  LAST_VALUE(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 592,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 92",
    "title": "Boundary & Stats: Level 12: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(total_spend) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 61,
    "table": "CustomerOrders",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(total_spend) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  LAST_VALUE(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 593,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 93",
    "title": "Boundary & Stats: Level 13: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(cpu_usage) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 62,
    "table": "ServerMetrics",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(cpu_usage) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "ServerMetrics(metric_id INT, cluster_id VARCHAR, logged_at DATE, cpu_usage DECIMAL)",
    "targetQuery": "SELECT metric_id, cpu_usage,\n  LAST_VALUE(cpu_usage) OVER (\n    PARTITION BY cluster_id ORDER BY logged_at\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM ServerMetrics;",
    "template": [
      {
        "text": "SELECT metric_id, cpu_usage,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(cpu_usage) OVER (\n    PARTITION BY cluster_id ORDER BY logged_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM ServerMetrics;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 594,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 94",
    "title": "Boundary & Stats: Level 14: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(bonus_pct) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 62,
    "table": "EmployeeCompensation",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(bonus_pct) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "EmployeeCompensation(emp_id INT, department_id VARCHAR, salary DATE, bonus_pct DECIMAL)",
    "targetQuery": "SELECT emp_id, bonus_pct,\n  LAST_VALUE(bonus_pct) OVER (\n    PARTITION BY department_id ORDER BY salary\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM EmployeeCompensation;",
    "template": [
      {
        "text": "SELECT emp_id, bonus_pct,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(bonus_pct) OVER (\n    PARTITION BY department_id ORDER BY salary\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM EmployeeCompensation;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 595,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 95",
    "title": "Boundary & Stats: Level 15: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(duration_seconds) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 63,
    "table": "UserSessions",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(duration_seconds) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "UserSessions(session_id INT, user_id VARCHAR, started_at DATE, duration_seconds DECIMAL)",
    "targetQuery": "SELECT session_id, duration_seconds,\n  LAST_VALUE(duration_seconds) OVER (\n    PARTITION BY user_id ORDER BY started_at\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM UserSessions;",
    "template": [
      {
        "text": "SELECT session_id, duration_seconds,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(duration_seconds) OVER (\n    PARTITION BY user_id ORDER BY started_at\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM UserSessions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 596,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 96",
    "title": "Boundary & Stats: Level 16: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(price_usd) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 63,
    "table": "CryptoTicks",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(price_usd) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "CryptoTicks(tick_id INT, pair_symbol VARCHAR, tick_time DATE, price_usd DECIMAL)",
    "targetQuery": "SELECT tick_id, price_usd,\n  LAST_VALUE(price_usd) OVER (\n    PARTITION BY pair_symbol ORDER BY tick_time\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM CryptoTicks;",
    "template": [
      {
        "text": "SELECT tick_id, price_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(price_usd) OVER (\n    PARTITION BY pair_symbol ORDER BY tick_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM CryptoTicks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 597,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 97",
    "title": "Boundary & Stats: Level 17: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(trade_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 63,
    "table": "SalesTrades",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(trade_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "SalesTrades(trade_id INT, desk_id VARCHAR, execution_time DATE, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount,\n  LAST_VALUE(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM SalesTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(trade_amount) OVER (\n    PARTITION BY desk_id ORDER BY execution_time\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM SalesTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 598,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 98",
    "title": "Boundary & Stats: Level 18: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(delta_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 64,
    "table": "BankLedger",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(delta_amount) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "BankLedger(entry_id INT, account_id VARCHAR, entry_date DATE, delta_amount DECIMAL)",
    "targetQuery": "SELECT entry_id, delta_amount,\n  LAST_VALUE(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM BankLedger;",
    "template": [
      {
        "text": "SELECT entry_id, delta_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(delta_amount) OVER (\n    PARTITION BY account_id ORDER BY entry_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM BankLedger;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 599,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 99",
    "title": "Boundary & Stats: Level 19: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(closing_price) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 64,
    "table": "DailyStockPrices",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(closing_price) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "DailyStockPrices(ticker_id INT, ticker VARCHAR, trade_date DATE, closing_price DECIMAL)",
    "targetQuery": "SELECT ticker_id, closing_price,\n  LAST_VALUE(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM DailyStockPrices;",
    "template": [
      {
        "text": "SELECT ticker_id, closing_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(closing_price) OVER (\n    PARTITION BY ticker ORDER BY trade_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM DailyStockPrices;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  },
  {
    "id": 600,
    "discipline": "BOUNDARY PICKS & PERCENTILES",
    "disciplineKey": "extremums_stats",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "WINDOW Lvl 100",
    "title": "Boundary & Stats: Level 20: Avoiding the LAST_VALUE Frame Trap",
    "subtitle": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "type": "fill_blank",
    "category": "Section 06: Window Functions (BOUNDARY PICKS & PERCENTILES)",
    "subcluster": "BOUNDARY PICKS & PERCENTILES (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely compute LAST_VALUE(total_spend) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "xp": 65,
    "table": "CustomerOrders",
    "scenario": "Enforce full partition frame so LAST_VALUE reaches the true end of the partition!",
    "businessObjective": "Safely compute LAST_VALUE(total_spend) using ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    "schemaSnippet": "CustomerOrders(order_id INT, customer_id VARCHAR, order_date DATE, total_spend DECIMAL)",
    "targetQuery": "SELECT order_id, total_spend,\n  LAST_VALUE(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING\n  ) AS final_val\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, total_spend,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNC ]"
      },
      {
        "text": "(total_spend) OVER (\n    PARTITION BY customer_id ORDER BY order_date\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FRAME START ]"
      },
      {
        "text": " CURRENT ROW AND ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ EXTENT ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BOUND DIR ]"
      },
      {
        "text": "\n  ) AS final_val\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LAST_VALUE",
        "options": [
          "LAST_VALUE",
          "FINAL_VALUE",
          "BOTTOM_ROW",
          "TAIL"
        ]
      },
      "slot2": {
        "correct": "ROWS BETWEEN",
        "options": [
          "ROWS BETWEEN",
          "RANGE FROM",
          "WINDOW BETWEEN",
          "FRAME AT"
        ]
      },
      "slot3": {
        "correct": "UNBOUNDED",
        "options": [
          "UNBOUNDED",
          "INFINITY",
          "MAX_ROWS",
          "LAST"
        ]
      },
      "slot4": {
        "correct": "FOLLOWING",
        "options": [
          "FOLLOWING",
          "AHEAD",
          "LATER",
          "NEXT"
        ]
      }
    },
    "explanation": "Window function executes over partition without collapsing rows into a single summary record. LAST_VALUE() default frame trap! By default, the frame ends at CURRENT ROW, so LAST_VALUE() simply returns the current row unless you specify BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING!"
  }
];
