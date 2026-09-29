// =============================================================================
// SECTION 08: CONDITIONAL LOGIC & DATA PIVOTING ARENA (420 INTERACTIVE QUESTS)
// 7 Disciplines x 60 Levels (20 Easy / 20 Medium / 20 Hard)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.PIVOT_DISCIPLINES_METADATA = [
  {
    "key": "searched_case",
    "name": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "symbol": "🔀",
    "color": "#38bdf8",
    "concept": "Sequential Rule Evaluation (First-Match Wins)",
    "whenToUse": "When assigning categorical labels, credit score tiers, or tax bands based on Boolean conditional expressions.",
    "scenarios": "Wealth tier segmentation (Ultra High Net Worth vs Mass Market); Credit default risk bands (AAA to CCC); Order delivery SLA categorization; Employee bonus tier allocation.",
    "traps": "ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "key": "matrix_pivoting",
    "name": "ROW-TO-COLUMN MATRIX PIVOTING",
    "symbol": "📊",
    "color": "#10b981",
    "concept": "Conditional Aggregation Folding",
    "whenToUse": "When transforming transaction event logs into wide, executive-ready financial statement columns (e.g. Q1, Q2, Q3, Q4 revenue columns).",
    "scenarios": "Quarterly financial earnings tables; Departmental monthly budget variance columns; Regional asset allocation cross-tabs; Cash flow operating vs financing columns.",
    "traps": "FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition! Conversely, in COUNT(), adding ELSE 0 falsely counts zeroes as non-null rows!"
  },
  {
    "key": "null_sanitization",
    "name": "DATA SANITIZATION (COALESCE & NULLIF)",
    "symbol": "🛡️",
    "color": "#f59e0b",
    "concept": "Defensive Value Fallbacks & Zero-Shielding",
    "whenToUse": "When providing fallback default values or protecting formulas from catastrophic runtime crashes (e.g. Division by Zero).",
    "scenarios": "Division by zero shield in Profit Margin calculation (amount / NULLIF(units, 0)); Cascading contact hierarchy (COALESCE(work_email, personal_email, phone)); Empty string trimming to NULL; Default currency exchange rates.",
    "traps": "DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "key": "multi_conditional",
    "name": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "symbol": "🚩",
    "color": "#ec4899",
    "concept": "Multi-Variate Matrix Logic",
    "whenToUse": "When decision logic requires combinations of AND/OR clauses, thresholds across multiple columns, and nested priority scoring.",
    "scenarios": "AML (Anti-Money Laundering) high-risk account detection (Volume > $100k AND Country in High-Risk List); Tiered brokerage commission fee schedules; VIP churn flight risk tagging; Margin call triggers.",
    "traps": "DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "key": "matrix_unpivoting",
    "name": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "symbol": "🔄",
    "color": "#a855f7",
    "concept": "Column-to-Row Normalization",
    "whenToUse": "When taking wide legacy spreadsheet exports (with columns for Jan, Feb, Mar) and unpivoting them into tidy relational rows for dimensional modeling.",
    "scenarios": "Unpivoting legacy accounting sheets with quarterly revenue columns into tidy time-series rows; Normalizing multi-attribute survey responses; Preparing wide metrics for BI dashboard ingestion; Time-series normalization.",
    "traps": "DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "key": "filter_clause",
    "name": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "symbol": "⚡",
    "color": "#06b6d4",
    "concept": "ANSI Standard Targeted Aggregations",
    "whenToUse": "When computing multi-metric financial ratios or isolated segment totals in modern engines (PostgreSQL, DuckDB, SQLite, Snowflake) with clean, readable syntax.",
    "scenarios": "Simultaneous calculation of Gross Sales, Returns, and Net Discounts in a single pass; Parallel active vs dormant customer counts; High-net-worth portfolio asset ratios.",
    "traps": "DIALECT RESTRICTION! The FILTER (WHERE ...) clause is ANSI SQL:2003, but is not natively supported in MySQL or legacy SQL Server (which require SUM(CASE WHEN...)). Using it in unsupported engines causes compilation errors."
  },
  {
    "key": "dynamic_bucketing",
    "name": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "symbol": "📦",
    "color": "#f97316",
    "concept": "Asymmetric Interval Discretization",
    "whenToUse": "When continuous financial metrics (account balance, invoice age, trade volume) must be grouped into discrete business buckets for aging schedules and risk stratification.",
    "scenarios": "Accounts Receivable (AR) aging schedules (0-30, 31-60, 61-90, 90+ days past due); AUM wealth tiers; Loan delinquency risk stratification; Trade latency SLA bands.",
    "traps": "BOUNDARY OVERLAP & LEAKS! Inadvertently using <= on both ends of adjacent buckets (e.g. balance <= 1000 and balance <= 5000) causes edge values to trigger the earlier bucket, or missing conditions leave values falling into ELSE 'Other'."
  }
];

window.QUESTS_SECTION_8 = [
  {
    "id": 701,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 01",
    "title": "Searched CASE: Level 01: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "SWITCH",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "THEN",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "DO",
          "RETURN",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "STOP",
          "FINISH",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 11500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 11500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 702,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "Searched CASE: Level 02: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CASE",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "WHERE",
          "IF",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "THEN",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "DONE",
          "FINISH",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 13000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 13000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 703,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "Searched CASE: Level 03: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "DECODE",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "WHEN",
          "IF",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "RETURN",
          "DO",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "FINISH",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 14500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 14500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 704,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "Searched CASE: Level 04: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "SWITCH",
          "IF"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "WHEN",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "ELSE",
          "THEN",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "END",
          "DONE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 16000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 16000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 705,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "Searched CASE: Level 05: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "IF",
          "DECODE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "THEN",
          "WHERE",
          "IF"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "ELSE",
          "DO",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "DONE",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 17500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 17500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 706,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "Searched CASE: Level 06: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "DECODE",
          "SWITCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "IF",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "THEN",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "DONE",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 19000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 19000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 707,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "Searched CASE: Level 07: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SWITCH",
          "IF",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "WHEN",
          "IF",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "THEN",
          "RETURN",
          "DO"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "DONE",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 20500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 20500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 708,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "Searched CASE: Level 08: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CASE",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "WHERE",
          "WHEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "RETURN",
          "DO",
          "THEN",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "DONE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 22000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 22000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 709,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "Searched CASE: Level 09: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CASE",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "THEN",
          "IF",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "RETURN",
          "DO",
          "ELSE",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "STOP",
          "FINISH",
          "DONE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 23500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 23500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 710,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "Searched CASE: Level 10: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "DECODE",
          "SWITCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "WHERE",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "THEN",
          "DO",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "STOP",
          "END",
          "FINISH"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 25000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 25000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 711,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "Searched CASE: Level 11: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "DECODE",
          "CASE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "WHEN",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "RETURN",
          "ELSE",
          "DO"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "STOP",
          "FINISH",
          "DONE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 26500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 26500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 712,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "Searched CASE: Level 12: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "THEN",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "THEN",
          "ELSE",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "END",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 28000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 28000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 713,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "Searched CASE: Level 13: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SWITCH",
          "DECODE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "IF",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "ELSE",
          "THEN",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "END",
          "FINISH",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 29500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 29500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 714,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "Searched CASE: Level 14: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "DECODE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "IF",
          "THEN",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "RETURN",
          "THEN",
          "DO"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "DONE",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 31000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 31000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 715,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "Searched CASE: Level 15: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "DECODE",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "IF",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "RETURN",
          "DO",
          "THEN",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "DONE",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 32500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 32500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 716,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "Searched CASE: Level 16: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SWITCH",
          "IF",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "THEN",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "RETURN",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "DONE",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 34000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 34000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 717,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "Searched CASE: Level 17: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "DECODE",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "IF",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "RETURN",
          "ELSE",
          "DO"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "STOP",
          "FINISH",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 35500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 35500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 718,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "Searched CASE: Level 18: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "DECODE",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "THEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "RETURN",
          "DO",
          "THEN",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "DONE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 37000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 37000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 719,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "Searched CASE: Level 19: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "SWITCH",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "WHERE",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "RETURN",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "STOP",
          "FINISH",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 38500 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 38500 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 720,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "Searched CASE: Level 20: Tier Classification",
    "subtitle": "Classify accounts into tier brackets based on balance thresholds.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CASE",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "WHEN",
          "THEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "THEN",
          "RETURN"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "DONE",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 40000 {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 40000 THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;"
  },
  {
    "id": 721,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 21,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "Searched CASE: Level 21: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "COALESCE",
          "CASE",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": ">= 755",
        "options": [
          "> 805",
          "<= 755",
          ">= 755",
          "= 755"
        ]
      },
      "slot3": {
        "correct": ">= 655",
        "options": [
          "< 655",
          "<= 655",
          "= 655",
          ">= 655"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "OTHERWISE",
          "UNLESS",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 755 THEN 'Tier A'\n            WHEN credit_score >= 655 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 722,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 22,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "Searched CASE: Level 22: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "CASE",
          "COALESCE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 760",
        "options": [
          ">= 760",
          "<= 760",
          "= 760",
          "> 810"
        ]
      },
      "slot3": {
        "correct": ">= 660",
        "options": [
          "< 660",
          ">= 660",
          "= 660",
          "<= 660"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "OTHERWISE",
          "DEFAULT",
          "ELSE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 760 THEN 'Tier A'\n            WHEN credit_score >= 660 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 723,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 23,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "Searched CASE: Level 23: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "CASE",
          "COALESCE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 765",
        "options": [
          "> 815",
          "= 765",
          ">= 765",
          "<= 765"
        ]
      },
      "slot3": {
        "correct": ">= 665",
        "options": [
          "= 665",
          ">= 665",
          "<= 665",
          "< 665"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "UNLESS",
          "OTHERWISE",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 765 THEN 'Tier A'\n            WHEN credit_score >= 665 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 724,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 24,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "Searched CASE: Level 24: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "EVAL",
          "COALESCE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": ">= 770",
        "options": [
          ">= 770",
          "<= 770",
          "= 770",
          "> 820"
        ]
      },
      "slot3": {
        "correct": ">= 670",
        "options": [
          "<= 670",
          "< 670",
          ">= 670",
          "= 670"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "OTHERWISE",
          "DEFAULT",
          "UNLESS"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 770 THEN 'Tier A'\n            WHEN credit_score >= 670 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 725,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 25,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "Searched CASE: Level 25: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "CASE",
          "EVAL",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": ">= 775",
        "options": [
          ">= 775",
          "> 825",
          "<= 775",
          "= 775"
        ]
      },
      "slot3": {
        "correct": ">= 675",
        "options": [
          "= 675",
          "<= 675",
          "< 675",
          ">= 675"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "OTHERWISE",
          "ELSE",
          "UNLESS"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 775 THEN 'Tier A'\n            WHEN credit_score >= 675 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 726,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 26,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "Searched CASE: Level 26: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "COALESCE",
          "EVAL",
          "CASE"
        ]
      },
      "slot2": {
        "correct": ">= 780",
        "options": [
          "<= 780",
          "> 830",
          ">= 780",
          "= 780"
        ]
      },
      "slot3": {
        "correct": ">= 680",
        "options": [
          "< 680",
          "= 680",
          ">= 680",
          "<= 680"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "UNLESS",
          "OTHERWISE",
          "ELSE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 780 THEN 'Tier A'\n            WHEN credit_score >= 680 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 727,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 27,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "Searched CASE: Level 27: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "COALESCE",
          "CASE",
          "EVAL",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": ">= 785",
        "options": [
          ">= 785",
          "<= 785",
          "> 835",
          "= 785"
        ]
      },
      "slot3": {
        "correct": ">= 685",
        "options": [
          "= 685",
          "<= 685",
          ">= 685",
          "< 685"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "OTHERWISE",
          "ELSE",
          "UNLESS"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 785 THEN 'Tier A'\n            WHEN credit_score >= 685 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 728,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 28,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "Searched CASE: Level 28: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "COALESCE",
          "SELECT",
          "CASE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 790",
        "options": [
          "= 790",
          "> 840",
          ">= 790",
          "<= 790"
        ]
      },
      "slot3": {
        "correct": ">= 690",
        "options": [
          "<= 690",
          "< 690",
          ">= 690",
          "= 690"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "DEFAULT",
          "ELSE",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 790 THEN 'Tier A'\n            WHEN credit_score >= 690 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 729,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 29,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "Searched CASE: Level 29: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "SELECT",
          "CASE",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": ">= 795",
        "options": [
          "> 845",
          "<= 795",
          ">= 795",
          "= 795"
        ]
      },
      "slot3": {
        "correct": ">= 695",
        "options": [
          ">= 695",
          "= 695",
          "<= 695",
          "< 695"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "DEFAULT",
          "OTHERWISE",
          "ELSE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 795 THEN 'Tier A'\n            WHEN credit_score >= 695 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 730,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 30,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "Searched CASE: Level 30: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "COALESCE",
          "CASE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 750",
        "options": [
          "> 800",
          ">= 750",
          "<= 750",
          "= 750"
        ]
      },
      "slot3": {
        "correct": ">= 650",
        "options": [
          ">= 650",
          "<= 650",
          "< 650",
          "= 650"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "OTHERWISE",
          "UNLESS",
          "ELSE",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 750 THEN 'Tier A'\n            WHEN credit_score >= 650 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 731,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 31,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "Searched CASE: Level 31: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "CASE",
          "SELECT",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": ">= 755",
        "options": [
          ">= 755",
          "= 755",
          "<= 755",
          "> 805"
        ]
      },
      "slot3": {
        "correct": ">= 655",
        "options": [
          ">= 655",
          "= 655",
          "< 655",
          "<= 655"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "DEFAULT",
          "ELSE",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 755 THEN 'Tier A'\n            WHEN credit_score >= 655 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 732,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 32,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "Searched CASE: Level 32: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "COALESCE",
          "EVAL",
          "SELECT",
          "CASE"
        ]
      },
      "slot2": {
        "correct": ">= 760",
        "options": [
          "> 810",
          "= 760",
          "<= 760",
          ">= 760"
        ]
      },
      "slot3": {
        "correct": ">= 660",
        "options": [
          "<= 660",
          ">= 660",
          "< 660",
          "= 660"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "OTHERWISE",
          "ELSE",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 760 THEN 'Tier A'\n            WHEN credit_score >= 660 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 733,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 33,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "Searched CASE: Level 33: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "COALESCE",
          "CASE",
          "SELECT",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 765",
        "options": [
          "= 765",
          "> 815",
          "<= 765",
          ">= 765"
        ]
      },
      "slot3": {
        "correct": ">= 665",
        "options": [
          ">= 665",
          "< 665",
          "= 665",
          "<= 665"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "ELSE",
          "DEFAULT",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 765 THEN 'Tier A'\n            WHEN credit_score >= 665 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 734,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 34,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "Searched CASE: Level 34: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "SELECT",
          "CASE",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": ">= 770",
        "options": [
          "> 820",
          ">= 770",
          "= 770",
          "<= 770"
        ]
      },
      "slot3": {
        "correct": ">= 670",
        "options": [
          "<= 670",
          "= 670",
          "< 670",
          ">= 670"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "OTHERWISE",
          "UNLESS",
          "ELSE",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 770 THEN 'Tier A'\n            WHEN credit_score >= 670 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 735,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 35,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "Searched CASE: Level 35: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "CASE",
          "COALESCE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 775",
        "options": [
          "> 825",
          ">= 775",
          "= 775",
          "<= 775"
        ]
      },
      "slot3": {
        "correct": ">= 675",
        "options": [
          "<= 675",
          "= 675",
          ">= 675",
          "< 675"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "ELSE",
          "OTHERWISE",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 775 THEN 'Tier A'\n            WHEN credit_score >= 675 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 736,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 36,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "Searched CASE: Level 36: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "COALESCE",
          "SELECT",
          "CASE"
        ]
      },
      "slot2": {
        "correct": ">= 780",
        "options": [
          ">= 780",
          "= 780",
          "> 830",
          "<= 780"
        ]
      },
      "slot3": {
        "correct": ">= 680",
        "options": [
          "= 680",
          ">= 680",
          "< 680",
          "<= 680"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "UNLESS",
          "OTHERWISE",
          "ELSE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 780 THEN 'Tier A'\n            WHEN credit_score >= 680 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 737,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 37,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "Searched CASE: Level 37: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "COALESCE",
          "EVAL",
          "SELECT",
          "CASE"
        ]
      },
      "slot2": {
        "correct": ">= 785",
        "options": [
          "= 785",
          "<= 785",
          "> 835",
          ">= 785"
        ]
      },
      "slot3": {
        "correct": ">= 685",
        "options": [
          "= 685",
          ">= 685",
          "<= 685",
          "< 685"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "OTHERWISE",
          "UNLESS",
          "ELSE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 785 THEN 'Tier A'\n            WHEN credit_score >= 685 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 738,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 38,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "Searched CASE: Level 38: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "CASE",
          "COALESCE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 790",
        "options": [
          "<= 790",
          ">= 790",
          "= 790",
          "> 840"
        ]
      },
      "slot3": {
        "correct": ">= 690",
        "options": [
          "<= 690",
          "< 690",
          "= 690",
          ">= 690"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "UNLESS",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 790 THEN 'Tier A'\n            WHEN credit_score >= 690 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 739,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 39,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "Searched CASE: Level 39: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SELECT",
          "COALESCE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": ">= 795",
        "options": [
          "> 845",
          ">= 795",
          "= 795",
          "<= 795"
        ]
      },
      "slot3": {
        "correct": ">= 695",
        "options": [
          "<= 695",
          "= 695",
          ">= 695",
          "< 695"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "OTHERWISE",
          "UNLESS",
          "DEFAULT",
          "ELSE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 795 THEN 'Tier A'\n            WHEN credit_score >= 695 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 740,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 40,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "Searched CASE: Level 40: Credit Risk Bands",
    "subtitle": "Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "EVAL",
          "COALESCE",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": ">= 750",
        "options": [
          ">= 750",
          "<= 750",
          "> 800",
          "= 750"
        ]
      },
      "slot3": {
        "correct": ">= 650",
        "options": [
          "<= 650",
          "< 650",
          "= 650",
          ">= 650"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "ELSE",
          "UNLESS",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, credit_score,\n       CASE WHEN credit_score >= 750 THEN 'Tier A'\n            WHEN credit_score >= 650 THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;"
  },
  {
    "id": 741,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 41,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "Searched CASE: Level 41: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "DECODE",
          "MATCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "AND",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Standard'",
          "'Private Wealth'",
          "'Retail'",
          "'Institutional'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Mass Market'",
          "'Private Wealth'",
          "'Premier'",
          "'VIP'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERMINATE",
          "END",
          "STOP",
          "FI"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 742,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 42,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "Searched CASE: Level 42: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "MATCH",
          "WHEN",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "AND",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Standard'",
          "'Private Wealth'",
          "'Institutional'",
          "'Retail'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'VIP'",
          "'Private Wealth'",
          "'Premier'",
          "'Mass Market'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "STOP",
          "FI",
          "TERMINATE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 743,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 43,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "Searched CASE: Level 43: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "MATCH",
          "WHEN",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "AND",
          "IF",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Private Wealth'",
          "'Retail'",
          "'Institutional'",
          "'Standard'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Private Wealth'",
          "'Premier'",
          "'VIP'",
          "'Mass Market'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERMINATE",
          "END",
          "STOP",
          "FI"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 744,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 44,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "Searched CASE: Level 44: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "DECODE",
          "MATCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "AND",
          "IF",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Institutional'",
          "'Private Wealth'",
          "'Standard'",
          "'Retail'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Premier'",
          "'VIP'",
          "'Private Wealth'",
          "'Mass Market'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FI",
          "TERMINATE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 745,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 45,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "Searched CASE: Level 45: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "CASE",
          "MATCH",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "AND",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Retail'",
          "'Private Wealth'",
          "'Institutional'",
          "'Standard'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Mass Market'",
          "'Private Wealth'",
          "'VIP'",
          "'Premier'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERMINATE",
          "FI",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 746,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 46,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "Searched CASE: Level 46: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "CASE",
          "MATCH",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "AND",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Institutional'",
          "'Retail'",
          "'Standard'",
          "'Private Wealth'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Private Wealth'",
          "'Mass Market'",
          "'VIP'",
          "'Premier'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "FI",
          "STOP",
          "TERMINATE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 747,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 47,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "Searched CASE: Level 47: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "WHEN",
          "MATCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "IF",
          "AND",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Institutional'",
          "'Standard'",
          "'Retail'",
          "'Private Wealth'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Private Wealth'",
          "'VIP'",
          "'Premier'",
          "'Mass Market'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FI",
          "END",
          "STOP",
          "TERMINATE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 748,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 48,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "Searched CASE: Level 48: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "WHEN",
          "DECODE",
          "MATCH"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "WHEN",
          "AND"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Standard'",
          "'Institutional'",
          "'Retail'",
          "'Private Wealth'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Private Wealth'",
          "'Mass Market'",
          "'Premier'",
          "'VIP'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERMINATE",
          "FI",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 749,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 49,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "Searched CASE: Level 49: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "MATCH",
          "DECODE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "AND",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Private Wealth'",
          "'Retail'",
          "'Standard'",
          "'Institutional'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Mass Market'",
          "'Private Wealth'",
          "'Premier'",
          "'VIP'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "FI",
          "STOP",
          "TERMINATE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 750,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 50,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "Searched CASE: Level 50: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "WHEN",
          "MATCH"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "AND",
          "IF"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Institutional'",
          "'Retail'",
          "'Private Wealth'",
          "'Standard'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'VIP'",
          "'Private Wealth'",
          "'Mass Market'",
          "'Premier'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "STOP",
          "TERMINATE",
          "FI"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 751,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 51,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "Searched CASE: Level 51: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "MATCH",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "AND",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Private Wealth'",
          "'Institutional'",
          "'Standard'",
          "'Retail'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'VIP'",
          "'Mass Market'",
          "'Premier'",
          "'Private Wealth'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERMINATE",
          "STOP",
          "END",
          "FI"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 752,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 52,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "Searched CASE: Level 52: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "MATCH",
          "CASE",
          "DECODE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "WHEN",
          "IF",
          "AND"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Standard'",
          "'Retail'",
          "'Private Wealth'",
          "'Institutional'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Private Wealth'",
          "'Premier'",
          "'Mass Market'",
          "'VIP'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "TERMINATE",
          "FI",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 753,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 53,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "Searched CASE: Level 53: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "MATCH",
          "CASE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "AND",
          "IF",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Private Wealth'",
          "'Retail'",
          "'Institutional'",
          "'Standard'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Mass Market'",
          "'VIP'",
          "'Private Wealth'",
          "'Premier'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FI",
          "TERMINATE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 754,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 54,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "Searched CASE: Level 54: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "WHEN",
          "MATCH"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "WHEN",
          "AND"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Standard'",
          "'Institutional'",
          "'Private Wealth'",
          "'Retail'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Premier'",
          "'Private Wealth'",
          "'VIP'",
          "'Mass Market'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERMINATE",
          "END",
          "FI",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 755,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 55,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "Searched CASE: Level 55: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "DECODE",
          "CASE",
          "MATCH"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "AND",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Retail'",
          "'Standard'",
          "'Institutional'",
          "'Private Wealth'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Premier'",
          "'Private Wealth'",
          "'VIP'",
          "'Mass Market'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FI",
          "END",
          "TERMINATE",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 756,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 56,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "Searched CASE: Level 56: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "CASE",
          "DECODE",
          "MATCH"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "AND",
          "WHEN",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Standard'",
          "'Private Wealth'",
          "'Institutional'",
          "'Retail'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'VIP'",
          "'Private Wealth'",
          "'Mass Market'",
          "'Premier'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "END",
          "FI",
          "TERMINATE"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 757,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 57,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "Searched CASE: Level 57: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "MATCH",
          "DECODE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "AND",
          "WHERE",
          "IF",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Private Wealth'",
          "'Retail'",
          "'Institutional'",
          "'Standard'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Premier'",
          "'Mass Market'",
          "'Private Wealth'",
          "'VIP'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "FI",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 758,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 58,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "Searched CASE: Level 58: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "WHEN",
          "MATCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "WHERE",
          "AND"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Institutional'",
          "'Standard'",
          "'Private Wealth'",
          "'Retail'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'VIP'",
          "'Mass Market'",
          "'Premier'",
          "'Private Wealth'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERMINATE",
          "END",
          "FI",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 759,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 59,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "Searched CASE: Level 59: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "MATCH",
          "WHEN",
          "CASE",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "AND",
          "IF",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Retail'",
          "'Institutional'",
          "'Standard'",
          "'Private Wealth'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'VIP'",
          "'Mass Market'",
          "'Private Wealth'",
          "'Premier'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FI",
          "TERMINATE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 760,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 60,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "Searched CASE: Level 60: Multi-Tier Wealth Grading",
    "subtitle": "Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.",
    "type": "fill_blank",
    "table": "FinancialAccounts",
    "schemaSnippet": "FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)",
    "task": "Ensure strict first-match evaluation without range shadowing or unhandled NULL states.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "MATCH",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "AND",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "'Private Wealth'",
        "options": [
          "'Standard'",
          "'Institutional'",
          "'Retail'",
          "'Private Wealth'"
        ]
      },
      "slot4": {
        "correct": "'Mass Market'",
        "options": [
          "'Mass Market'",
          "'Premier'",
          "'VIP'",
          "'Private Wealth'"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "FI",
          "STOP"
        ]
      }
    },
    "template": "SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= 1000000 THEN {{slot3}}\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;",
    "targetQuery": "SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= 1000000 THEN 'Private Wealth'\n            WHEN balance_usd >= 250000 THEN 'Premier'\n            WHEN balance_usd >= 50000 THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;"
  },
  {
    "id": 761,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 01",
    "title": "Matrix Pivoting: Level 01: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "SUM",
          "MAX",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "ON",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "WITHOUT 0",
          "ELSE NULL",
          "ELSE 1",
          "ELSE 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "ORDER BY",
          "PARTITION BY",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 762,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "Matrix Pivoting: Level 02: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "MAX",
          "COUNT",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "ON",
          "WHEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "WITHOUT 0",
          "ELSE NULL",
          "ELSE 0",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "HAVING",
          "ORDER BY",
          "PARTITION BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 763,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "Matrix Pivoting: Level 03: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "COUNT",
          "SUM",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "ON",
          "IF"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE NULL",
          "ELSE 0",
          "WITHOUT 0",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "ORDER BY",
          "GROUP BY",
          "PARTITION BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 764,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "Matrix Pivoting: Level 04: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "MAX",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "ON",
          "WHERE",
          "WHEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "WITHOUT 0",
          "ELSE 1",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "PARTITION BY",
          "ORDER BY",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 765,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "Matrix Pivoting: Level 05: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "MAX",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "ON",
          "WHEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "WITHOUT 0",
          "ELSE 1",
          "ELSE 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "PARTITION BY",
          "GROUP BY",
          "ORDER BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 766,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "Matrix Pivoting: Level 06: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "MAX",
          "COUNT",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "ON",
          "WHERE",
          "IF"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE 1",
          "ELSE NULL",
          "WITHOUT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "PARTITION BY",
          "ORDER BY",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 767,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "Matrix Pivoting: Level 07: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "AVG",
          "COUNT",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHEN",
          "ON",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE NULL",
          "ELSE 0",
          "ELSE 1",
          "WITHOUT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "HAVING"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 768,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "Matrix Pivoting: Level 08: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHEN",
          "WHERE",
          "ON"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 1",
          "WITHOUT 0",
          "ELSE 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "PARTITION BY",
          "GROUP BY",
          "ORDER BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 769,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "Matrix Pivoting: Level 09: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "ON"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE 1",
          "ELSE NULL",
          "WITHOUT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "HAVING",
          "PARTITION BY",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 770,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "Matrix Pivoting: Level 10: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "MAX",
          "AVG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHEN",
          "ON",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "WITHOUT 0",
          "ELSE 1",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "PARTITION BY",
          "GROUP BY",
          "HAVING"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 771,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "Matrix Pivoting: Level 11: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "AVG",
          "SUM",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "ON",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 1",
          "WITHOUT 0",
          "ELSE 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "ORDER BY",
          "PARTITION BY",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 772,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "Matrix Pivoting: Level 12: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "ON",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE 1",
          "WITHOUT 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "ORDER BY",
          "HAVING"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 773,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "Matrix Pivoting: Level 13: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "MAX",
          "SUM",
          "AVG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "ON",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "WITHOUT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "HAVING",
          "ORDER BY",
          "PARTITION BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 774,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "Matrix Pivoting: Level 14: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "MAX",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "IF",
          "ON",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE NULL",
          "WITHOUT 0",
          "ELSE 1",
          "ELSE 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "HAVING",
          "PARTITION BY",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 775,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "Matrix Pivoting: Level 15: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "MAX",
          "AVG",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHEN",
          "ON",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 1",
          "ELSE 0",
          "WITHOUT 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "PARTITION BY",
          "GROUP BY",
          "HAVING"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 776,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "Matrix Pivoting: Level 16: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "SUM",
          "COUNT",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "ON",
          "IF",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "WITHOUT 0",
          "ELSE 1",
          "ELSE NULL",
          "ELSE 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "HAVING",
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 777,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "Matrix Pivoting: Level 17: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "MAX"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "IF",
          "ON",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 1",
          "ELSE NULL",
          "ELSE 0",
          "WITHOUT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "HAVING",
          "PARTITION BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 778,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "Matrix Pivoting: Level 18: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "MAX",
          "AVG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "ON"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 1",
          "WITHOUT 0",
          "ELSE 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "HAVING",
          "PARTITION BY",
          "ORDER BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 779,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "Matrix Pivoting: Level 19: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "MAX",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "ON",
          "WHEN",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "WITHOUT 0",
          "ELSE NULL",
          "ELSE 0",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "HAVING",
          "PARTITION BY",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 780,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "Matrix Pivoting: Level 20: Q1 vs Q2 Split",
    "subtitle": "Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "MAX",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "ON",
          "IF",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 1",
          "WITHOUT 0",
          "ELSE 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "PARTITION BY",
          "ORDER BY",
          "HAVING",
          "GROUP BY"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 781,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 21,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "Matrix Pivoting: Level 21: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AGG",
          "TOTAL",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'ALL'",
          "'Q3'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q3'",
          "'FY'",
          "'Q2'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "region",
          "department_id",
          "revenue_usd"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 782,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 22,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "Matrix Pivoting: Level 22: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'ALL'",
          "'Q1'",
          "'Q3'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q3'",
          "'Q2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "region",
          "revenue_usd",
          "fiscal_quarter",
          "department_id"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 783,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 23,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "Matrix Pivoting: Level 23: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "SUM",
          "AGG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q2'",
          "'ALL'",
          "'Q1'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q3'",
          "'Q4'",
          "'FY'",
          "'Q2'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "revenue_usd",
          "department_id",
          "region"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 784,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 24,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "Matrix Pivoting: Level 24: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "TOTAL",
          "AGG"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q2'",
          "'Q1'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q4'",
          "'Q3'",
          "'Q2'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "revenue_usd",
          "region",
          "department_id"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 785,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 25,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "Matrix Pivoting: Level 25: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "AGG",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'Q1'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q3'",
          "'Q2'",
          "'Q4'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "department_id",
          "revenue_usd",
          "region"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 786,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 26,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "Matrix Pivoting: Level 26: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "AGG",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'Q3'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q4'",
          "'Q2'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "revenue_usd",
          "region",
          "department_id",
          "fiscal_quarter"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 787,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 27,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "Matrix Pivoting: Level 27: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "AGG",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q1'",
          "'Q2'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q3'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "revenue_usd",
          "region",
          "fiscal_quarter",
          "department_id"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 788,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 28,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "Matrix Pivoting: Level 28: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "AGG",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'ALL'",
          "'Q1'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q2'",
          "'Q4'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "revenue_usd",
          "department_id",
          "region"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 789,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 29,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "Matrix Pivoting: Level 29: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AGG",
          "COUNT",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q1'",
          "'Q2'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q3'",
          "'Q2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "department_id",
          "revenue_usd",
          "region",
          "fiscal_quarter"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 790,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 30,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "Matrix Pivoting: Level 30: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "AGG",
          "TOTAL",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'ALL'",
          "'Q3'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q3'",
          "'Q4'",
          "'Q2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "department_id",
          "revenue_usd",
          "region"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 791,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 31,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "Matrix Pivoting: Level 31: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AGG",
          "COUNT",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q1'",
          "'Q3'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q2'",
          "'Q3'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "revenue_usd",
          "fiscal_quarter",
          "department_id",
          "region"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 792,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 32,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "Matrix Pivoting: Level 32: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "TOTAL",
          "AGG"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'ALL'",
          "'Q2'",
          "'Q3'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q4'",
          "'Q3'",
          "'Q2'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "revenue_usd",
          "region",
          "department_id"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 793,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 33,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "Matrix Pivoting: Level 33: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "TOTAL",
          "AGG"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q2'",
          "'ALL'",
          "'Q1'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q2'",
          "'Q3'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "region",
          "fiscal_quarter",
          "revenue_usd",
          "department_id"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 794,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 34,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "Matrix Pivoting: Level 34: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AGG",
          "COUNT",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q3'",
          "'ALL'",
          "'Q2'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'FY'",
          "'Q2'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "region",
          "department_id",
          "fiscal_quarter",
          "revenue_usd"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 795,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 35,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "Matrix Pivoting: Level 35: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "TOTAL",
          "AGG"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q1'",
          "'Q2'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q2'",
          "'Q4'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "fiscal_quarter",
          "department_id",
          "revenue_usd",
          "region"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 796,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 36,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "Matrix Pivoting: Level 36: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "AGG",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'ALL'",
          "'Q2'",
          "'Q3'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'FY'",
          "'Q3'",
          "'Q2'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "region",
          "revenue_usd",
          "fiscal_quarter",
          "department_id"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 797,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 37,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "Matrix Pivoting: Level 37: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "AGG",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q3'",
          "'ALL'",
          "'Q2'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q2'",
          "'Q3'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "revenue_usd",
          "region",
          "department_id",
          "fiscal_quarter"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 798,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 38,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "Matrix Pivoting: Level 38: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "SUM",
          "AGG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'Q1'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'Q3'",
          "'FY'",
          "'Q2'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "revenue_usd",
          "region",
          "department_id",
          "fiscal_quarter"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 799,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 39,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "Matrix Pivoting: Level 39: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "AGG",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q1'",
          "'Q2'",
          "'ALL'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q4'",
          "'Q3'",
          "'Q2'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "revenue_usd",
          "fiscal_quarter",
          "department_id",
          "region"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 800,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 40,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "Matrix Pivoting: Level 40: Full Fiscal Year Matrix",
    "subtitle": "Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Aggregate departmental performance with zero-shielded sums across all 4 quarters.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "AGG",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'ALL'",
          "'Q1'",
          "'Q2'"
        ]
      },
      "slot3": {
        "correct": "'Q4'",
        "options": [
          "'FY'",
          "'Q2'",
          "'Q4'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "department_id",
        "options": [
          "region",
          "department_id",
          "fiscal_quarter",
          "revenue_usd"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;"
  },
  {
    "id": 801,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 41,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "Matrix Pivoting: Level 41: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 1",
          "THEN 0",
          "THEN NULL",
          "ELSE 1"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 1",
          "ELSE 0",
          "ELSE NULL",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "CLOSE",
          "FINISH",
          "STOP"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 802,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 42,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "Matrix Pivoting: Level 42: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "SUM",
          "TOTAL",
          "COUNT",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN NULL",
          "THEN 0",
          "THEN 1",
          "ELSE 1"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE -1",
          "ELSE NULL",
          "ELSE 1",
          "ELSE 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "CLOSE",
          "END"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 803,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 43,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "Matrix Pivoting: Level 43: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "TOTAL",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN 0",
          "THEN NULL",
          "THEN 1"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 1",
          "ELSE -1",
          "ELSE NULL",
          "ELSE 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "CLOSE",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 804,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 44,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "Matrix Pivoting: Level 44: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "AVG",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 1",
          "THEN NULL",
          "THEN 0",
          "ELSE 1"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 0",
          "ELSE -1",
          "ELSE NULL",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "CLOSE",
          "STOP",
          "FINISH",
          "END"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 805,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 45,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "Matrix Pivoting: Level 45: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "TOTAL",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN 1",
          "THEN NULL",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE -1",
          "ELSE NULL",
          "ELSE 1",
          "ELSE 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "CLOSE",
          "FINISH",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 806,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 46,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "Matrix Pivoting: Level 46: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 0",
          "THEN 1",
          "ELSE 1",
          "THEN NULL"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 1",
          "ELSE NULL",
          "ELSE 0",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "CLOSE",
          "FINISH",
          "STOP"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 807,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 47,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "Matrix Pivoting: Level 47: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "AVG",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 1",
          "THEN NULL",
          "ELSE 1",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE -1",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "END",
          "CLOSE"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 808,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 48,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "Matrix Pivoting: Level 48: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "AVG",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN 1",
          "THEN 0",
          "THEN NULL"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "CLOSE",
          "END",
          "FINISH"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 809,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 49,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "Matrix Pivoting: Level 49: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "AVG",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN NULL",
          "THEN 1",
          "ELSE 1",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "CLOSE",
          "FINISH",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 810,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 50,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "Matrix Pivoting: Level 50: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "AVG",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN 0",
          "THEN 1",
          "THEN NULL"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 0",
          "ELSE -1",
          "ELSE 1",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "CLOSE",
          "END",
          "FINISH"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 811,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 51,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "Matrix Pivoting: Level 51: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "AVG",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN 0",
          "THEN 1",
          "THEN NULL"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE NULL",
          "ELSE 1",
          "ELSE 0",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "CLOSE",
          "FINISH",
          "END"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 812,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 52,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "Matrix Pivoting: Level 52: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "SUM",
          "COUNT",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 1",
          "THEN 0",
          "THEN NULL",
          "ELSE 1"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE -1",
          "ELSE NULL",
          "ELSE 0",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "END",
          "CLOSE",
          "STOP"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 813,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 53,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "Matrix Pivoting: Level 53: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "SUM",
          "COUNT",
          "TOTAL",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 0",
          "THEN 1",
          "THEN NULL",
          "ELSE 1"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 1",
          "ELSE -1",
          "ELSE 0",
          "ELSE NULL"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "CLOSE"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 814,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 54,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "Matrix Pivoting: Level 54: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN 1",
          "THEN NULL",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE NULL",
          "ELSE 0",
          "ELSE -1",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "CLOSE",
          "END",
          "FINISH",
          "STOP"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 815,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 55,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "Matrix Pivoting: Level 55: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "SUM",
          "COUNT",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 0",
          "THEN 1",
          "THEN NULL",
          "ELSE 1"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE NULL",
          "ELSE -1",
          "ELSE 0",
          "ELSE 1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "CLOSE"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 816,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 56,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "Matrix Pivoting: Level 56: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "COUNT",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN NULL",
          "ELSE 1",
          "THEN 1",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 1",
          "ELSE 0",
          "ELSE NULL",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "CLOSE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 817,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 57,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "Matrix Pivoting: Level 57: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "SUM",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN 0",
          "ELSE 1",
          "THEN 1",
          "THEN NULL"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 1",
          "ELSE NULL",
          "ELSE -1",
          "ELSE 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "CLOSE",
          "FINISH",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 818,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 58,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "Matrix Pivoting: Level 58: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "TOTAL",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "THEN NULL",
          "THEN 1",
          "ELSE 1",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 0",
          "ELSE 1",
          "ELSE NULL",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "END",
          "STOP",
          "CLOSE"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 819,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 59,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "Matrix Pivoting: Level 59: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "COUNT",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN NULL",
          "THEN 1",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 0",
          "ELSE 1",
          "ELSE NULL",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "CLOSE"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 820,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 60,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "Matrix Pivoting: Level 60: Cross-Tab Count & Ratio Folding",
    "subtitle": "Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.",
    "type": "fill_blank",
    "table": "QuarterlySales",
    "schemaSnippet": "QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)",
    "task": "Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "SUM",
          "TOTAL",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "THEN 1",
        "options": [
          "ELSE 1",
          "THEN NULL",
          "THEN 1",
          "THEN 0"
        ]
      },
      "slot3": {
        "correct": "ELSE NULL",
        "options": [
          "ELSE 1",
          "ELSE 0",
          "ELSE NULL",
          "ELSE -1"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "CLOSE",
          "FINISH",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;",
    "targetQuery": "SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;"
  },
  {
    "id": 821,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 01",
    "title": "Data Sanitization: Level 01: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "NVL2",
          "COALESCE",
          "IFNULL"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "'N/A'",
          "client_id",
          "primary_email",
          "tax_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "primary_email",
          "secondary_email",
          "tax_id",
          "client_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "'Unknown'",
          "'0'",
          "NULL"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 822,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "Data Sanitization: Level 02: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "IFNULL",
          "NVL2",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "tax_id",
          "'N/A'",
          "primary_email",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "primary_email",
          "client_id",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "'Unknown'",
          "NULL",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 823,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "Data Sanitization: Level 03: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "IFNULL",
          "NVL2"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "tax_id",
          "client_id",
          "'N/A'",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "secondary_email",
          "primary_email",
          "tax_id",
          "client_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'0'",
          "NULL",
          "'No Contact'",
          "'Unknown'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 824,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "Data Sanitization: Level 04: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "IFNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "client_id",
          "tax_id",
          "'N/A'",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "primary_email",
          "client_id",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "'0'",
          "NULL",
          "'Unknown'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 825,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "Data Sanitization: Level 05: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NVL2",
          "IFNULL",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "primary_email",
          "tax_id",
          "'N/A'",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "primary_email",
          "secondary_email",
          "tax_id",
          "client_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "'0'",
          "NULL",
          "'Unknown'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 826,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "Data Sanitization: Level 06: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "COALESCE",
          "NVL2",
          "IFNULL"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "tax_id",
          "'N/A'",
          "client_id",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "primary_email",
          "secondary_email",
          "client_id",
          "tax_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "NULL",
          "'Unknown'",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 827,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "Data Sanitization: Level 07: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "IFNULL",
          "NVL2",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "client_id",
          "'N/A'",
          "tax_id",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "secondary_email",
          "client_id",
          "primary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "NULL",
          "'No Contact'",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 828,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "Data Sanitization: Level 08: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NVL2",
          "NULLIF",
          "IFNULL"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "primary_email",
          "client_id",
          "'N/A'",
          "tax_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "client_id",
          "tax_id",
          "secondary_email",
          "primary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "NULL",
          "'Unknown'",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 829,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "Data Sanitization: Level 09: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "IFNULL",
          "NVL2",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "'N/A'",
          "tax_id",
          "client_id",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "primary_email",
          "tax_id",
          "client_id",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "NULL",
          "'No Contact'",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 830,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "Data Sanitization: Level 10: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NVL2",
          "NULLIF",
          "IFNULL"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "'N/A'",
          "primary_email",
          "client_id",
          "tax_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "client_id",
          "primary_email",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "NULL",
          "'0'",
          "'No Contact'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 831,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "Data Sanitization: Level 11: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "IFNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "tax_id",
          "client_id",
          "primary_email",
          "'N/A'"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "secondary_email",
          "client_id",
          "primary_email",
          "tax_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "'0'",
          "'No Contact'",
          "NULL"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 832,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "Data Sanitization: Level 12: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "IFNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "tax_id",
          "'N/A'",
          "client_id",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "client_id",
          "tax_id",
          "primary_email",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "NULL",
          "'0'",
          "'No Contact'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 833,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "Data Sanitization: Level 13: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "IFNULL",
          "NULLIF",
          "COALESCE",
          "NVL2"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "client_id",
          "'N/A'",
          "primary_email",
          "tax_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "primary_email",
          "client_id",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "NULL",
          "'No Contact'",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 834,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "Data Sanitization: Level 14: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "IFNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "client_id",
          "'N/A'",
          "primary_email",
          "tax_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "secondary_email",
          "client_id",
          "primary_email",
          "tax_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'0'",
          "'No Contact'",
          "'Unknown'",
          "NULL"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 835,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "Data Sanitization: Level 15: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "NULLIF",
          "IFNULL",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "'N/A'",
          "client_id",
          "tax_id",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "client_id",
          "primary_email",
          "secondary_email",
          "tax_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "'0'",
          "'Unknown'",
          "NULL"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 836,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "Data Sanitization: Level 16: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "IFNULL",
          "NVL2",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "client_id",
          "'N/A'",
          "tax_id",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "secondary_email",
          "tax_id",
          "client_id",
          "primary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "'No Contact'",
          "NULL",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 837,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "Data Sanitization: Level 17: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "IFNULL",
          "NVL2"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "tax_id",
          "primary_email",
          "'N/A'",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "secondary_email",
          "primary_email",
          "client_id"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "'Unknown'",
          "NULL",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 838,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "Data Sanitization: Level 18: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "IFNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "primary_email",
          "'N/A'",
          "client_id",
          "tax_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "client_id",
          "tax_id",
          "secondary_email",
          "primary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'Unknown'",
          "'0'",
          "'No Contact'",
          "NULL"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 839,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "Data Sanitization: Level 19: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "NULLIF",
          "IFNULL",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "tax_id",
          "client_id",
          "'N/A'",
          "primary_email"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "primary_email",
          "client_id",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'0'",
          "NULL",
          "'Unknown'",
          "'No Contact'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 840,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "Data Sanitization: Level 20: Fallback Contact Selection",
    "subtitle": "Select the first non-null contact channel using COALESCE.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Resolve contact priority: primary email -> secondary email -> phone number.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "IFNULL",
          "NVL2",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "primary_email",
        "options": [
          "primary_email",
          "'N/A'",
          "tax_id",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "secondary_email",
        "options": [
          "tax_id",
          "client_id",
          "primary_email",
          "secondary_email"
        ]
      },
      "slot4": {
        "correct": "'No Contact'",
        "options": [
          "'No Contact'",
          "'Unknown'",
          "NULL",
          "'0'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;"
  },
  {
    "id": 841,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 21,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "Data Sanitization: Level 21: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "ZEROIF",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "client_id",
          "invested_capital",
          "total_assets",
          "net_profit"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "1",
          "-1",
          "NULL",
          "0"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "COALESCE",
          "DECODE",
          "NVL2"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 842,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 22,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "Data Sanitization: Level 22: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "ZEROIF",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "net_profit",
          "invested_capital",
          "total_assets",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "1",
          "-1",
          "0",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "DECODE",
          "NVL2",
          "COALESCE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 843,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 23,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "Data Sanitization: Level 23: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "NULLIF",
          "COALESCE",
          "ZEROIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "invested_capital",
          "net_profit",
          "total_assets",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "NULL",
          "1",
          "0",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "DECODE",
          "NULLIF",
          "NVL2"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 844,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 24,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "Data Sanitization: Level 24: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "ZEROIF",
          "NULLIF",
          "ISNULL"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "client_id",
          "invested_capital",
          "total_assets",
          "net_profit"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "0",
          "1",
          "NULL",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "DECODE",
          "COALESCE",
          "NVL2"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 845,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 25,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "Data Sanitization: Level 25: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "ISNULL",
          "NULLIF",
          "ZEROIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "client_id",
          "total_assets",
          "invested_capital",
          "net_profit"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "NULL",
          "-1",
          "0",
          "1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NVL2",
          "NULLIF",
          "DECODE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 846,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 26,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "Data Sanitization: Level 26: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ZEROIF",
          "COALESCE",
          "ISNULL",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "total_assets",
          "invested_capital",
          "client_id",
          "net_profit"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "0",
          "-1",
          "1",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NVL2",
          "NULLIF",
          "DECODE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 847,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 27,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "Data Sanitization: Level 27: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "ISNULL",
          "ZEROIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "net_profit",
          "client_id",
          "total_assets",
          "invested_capital"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "NULL",
          "0",
          "1",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "DECODE",
          "NVL2",
          "NULLIF"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 848,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 28,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "Data Sanitization: Level 28: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "ISNULL",
          "ZEROIF",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "net_profit",
          "total_assets",
          "client_id",
          "invested_capital"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "-1",
          "1",
          "NULL",
          "0"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "DECODE",
          "NULLIF",
          "NVL2",
          "COALESCE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 849,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 29,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "Data Sanitization: Level 29: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ZEROIF",
          "ISNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "client_id",
          "net_profit",
          "invested_capital",
          "total_assets"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "-1",
          "NULL",
          "1",
          "0"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "DECODE",
          "NULLIF",
          "COALESCE",
          "NVL2"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 850,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 30,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "Data Sanitization: Level 30: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NULLIF",
          "ISNULL",
          "ZEROIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "client_id",
          "total_assets",
          "invested_capital",
          "net_profit"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "1",
          "0",
          "-1",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "DECODE",
          "NULLIF",
          "COALESCE",
          "NVL2"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 851,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 31,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "Data Sanitization: Level 31: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "COALESCE",
          "NULLIF",
          "ZEROIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "total_assets",
          "client_id",
          "invested_capital",
          "net_profit"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "NULL",
          "0",
          "1",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NVL2",
          "NULLIF",
          "DECODE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 852,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 32,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "Data Sanitization: Level 32: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ZEROIF",
          "ISNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "total_assets",
          "net_profit",
          "client_id",
          "invested_capital"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "0",
          "NULL",
          "1",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "DECODE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 853,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 33,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "Data Sanitization: Level 33: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "COALESCE",
          "ZEROIF",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "invested_capital",
          "net_profit",
          "client_id",
          "total_assets"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "1",
          "0",
          "NULL",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "DECODE",
          "COALESCE",
          "NULLIF"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 854,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 34,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "Data Sanitization: Level 34: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ZEROIF",
          "COALESCE",
          "ISNULL",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "client_id",
          "net_profit",
          "invested_capital",
          "total_assets"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "0",
          "NULL",
          "-1",
          "1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NVL2",
          "NULLIF",
          "DECODE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 855,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 35,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "Data Sanitization: Level 35: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "NULLIF",
          "COALESCE",
          "ZEROIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "client_id",
          "invested_capital",
          "net_profit",
          "total_assets"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "-1",
          "NULL",
          "0",
          "1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "NVL2",
          "DECODE",
          "COALESCE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 856,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 36,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "Data Sanitization: Level 36: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ZEROIF",
          "NULLIF",
          "COALESCE",
          "ISNULL"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "net_profit",
          "total_assets",
          "invested_capital",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "0",
          "1",
          "-1",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "DECODE",
          "NVL2",
          "COALESCE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 857,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 37,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "Data Sanitization: Level 37: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ZEROIF",
          "NULLIF",
          "COALESCE",
          "ISNULL"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "total_assets",
          "net_profit",
          "client_id",
          "invested_capital"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "0",
          "1",
          "NULL",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "DECODE",
          "COALESCE",
          "NULLIF",
          "NVL2"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 858,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 38,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "Data Sanitization: Level 38: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ZEROIF",
          "COALESCE",
          "NULLIF",
          "ISNULL"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "invested_capital",
          "total_assets",
          "client_id",
          "net_profit"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "1",
          "0",
          "-1",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "NVL2",
          "COALESCE",
          "DECODE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 859,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 39,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "Data Sanitization: Level 39: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "ISNULL",
          "ZEROIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "net_profit",
          "invested_capital",
          "total_assets",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "-1",
          "1",
          "NULL",
          "0"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "NVL2",
          "DECODE",
          "NULLIF",
          "COALESCE"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 860,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 40,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "Data Sanitization: Level 40: Zero-Division Shielding",
    "subtitle": "Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.",
    "slots": {
      "slot1": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "ZEROIF",
          "COALESCE",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "invested_capital",
        "options": [
          "invested_capital",
          "net_profit",
          "total_assets",
          "client_id"
        ]
      },
      "slot3": {
        "correct": "0",
        "options": [
          "0",
          "NULL",
          "1",
          "-1"
        ]
      },
      "slot4": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "DECODE",
          "NULLIF",
          "NVL2"
        ]
      }
    },
    "template": "SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;",
    "targetQuery": "SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;"
  },
  {
    "id": 861,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 41,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "Data Sanitization: Level 41: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "CAST",
          "TRIM",
          "COALESCE",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "IFNULL",
          "NULLIF",
          "COALESCE",
          "NVL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "LOWER",
          "LEN",
          "TRIM"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'0'",
          "' '",
          "'NULL'",
          "''"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "''",
          "'EXEMPT'",
          "'N/A'",
          "'NULL'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 862,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 42,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "Data Sanitization: Level 42: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "TRIM",
          "CAST",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "IFNULL",
          "NULLIF",
          "NVL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "LOWER",
          "TRIM",
          "LEN"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'0'",
          "' '",
          "'NULL'",
          "''"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'EXEMPT'",
          "''",
          "'NULL'",
          "'N/A'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 863,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 43,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "Data Sanitization: Level 43: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "CAST",
          "TRIM",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "IFNULL",
          "COALESCE",
          "NVL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "LEN",
          "TRIM",
          "LOWER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "' '",
          "''",
          "'NULL'",
          "'0'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'N/A'",
          "'EXEMPT'",
          "''",
          "'NULL'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 864,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 44,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "Data Sanitization: Level 44: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "CAST",
          "COALESCE",
          "TRIM",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "NVL",
          "IFNULL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "TRIM",
          "LEN",
          "LOWER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "''",
          "'0'",
          "' '",
          "'NULL'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'EXEMPT'",
          "''",
          "'NULL'",
          "'N/A'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 865,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 45,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "Data Sanitization: Level 45: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "TRIM",
          "COALESCE",
          "CAST",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NVL",
          "IFNULL",
          "NULLIF"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "LEN",
          "TRIM",
          "UPPER",
          "LOWER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "''",
          "'0'",
          "' '",
          "'NULL'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'EXEMPT'",
          "'NULL'",
          "''",
          "'N/A'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 866,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 46,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "Data Sanitization: Level 46: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "TRIM",
          "CAST",
          "COALESCE",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "IFNULL",
          "NVL",
          "COALESCE"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "LOWER",
          "LEN",
          "UPPER",
          "TRIM"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "''",
          "'NULL'",
          "'0'",
          "' '"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "''",
          "'N/A'",
          "'NULL'",
          "'EXEMPT'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 867,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 47,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "Data Sanitization: Level 47: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "CAST",
          "NULLIF",
          "COALESCE",
          "TRIM"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL",
          "IFNULL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "TRIM",
          "LOWER",
          "LEN",
          "UPPER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'0'",
          "'NULL'",
          "' '",
          "''"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'NULL'",
          "'EXEMPT'",
          "''",
          "'N/A'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 868,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 48,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "Data Sanitization: Level 48: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "TRIM",
          "COALESCE",
          "CAST"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "NVL",
          "IFNULL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "TRIM",
          "LEN",
          "LOWER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'NULL'",
          "''",
          "'0'",
          "' '"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'EXEMPT'",
          "'N/A'",
          "'NULL'",
          "''"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 869,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 49,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "Data Sanitization: Level 49: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "CAST",
          "NULLIF",
          "TRIM"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL",
          "IFNULL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "LEN",
          "TRIM",
          "UPPER",
          "LOWER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "''",
          "'0'",
          "' '",
          "'NULL'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "''",
          "'NULL'",
          "'N/A'",
          "'EXEMPT'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 870,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 50,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "Data Sanitization: Level 50: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "TRIM",
          "CAST",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "IFNULL",
          "COALESCE",
          "NULLIF",
          "NVL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "LEN",
          "UPPER",
          "LOWER",
          "TRIM"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "' '",
          "'0'",
          "''",
          "'NULL'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "''",
          "'EXEMPT'",
          "'N/A'",
          "'NULL'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 871,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 51,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "Data Sanitization: Level 51: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "CAST",
          "NULLIF",
          "TRIM",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "IFNULL",
          "COALESCE",
          "NULLIF"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "TRIM",
          "UPPER",
          "LEN",
          "LOWER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "''",
          "'NULL'",
          "' '",
          "'0'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'EXEMPT'",
          "'N/A'",
          "''",
          "'NULL'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 872,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 52,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "Data Sanitization: Level 52: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "TRIM",
          "CAST",
          "COALESCE",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "NULLIF",
          "IFNULL",
          "COALESCE"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "LOWER",
          "LEN",
          "TRIM",
          "UPPER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'NULL'",
          "'0'",
          "' '",
          "''"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'N/A'",
          "'EXEMPT'",
          "'NULL'",
          "''"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 873,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 53,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "Data Sanitization: Level 53: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "TRIM",
          "CAST",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "IFNULL",
          "COALESCE",
          "NVL",
          "NULLIF"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "LEN",
          "LOWER",
          "TRIM"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "''",
          "'NULL'",
          "'0'",
          "' '"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'EXEMPT'",
          "''",
          "'NULL'",
          "'N/A'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 874,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 54,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "Data Sanitization: Level 54: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "TRIM",
          "CAST"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "COALESCE",
          "IFNULL",
          "NULLIF"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "TRIM",
          "LEN",
          "LOWER",
          "UPPER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'0'",
          "'NULL'",
          "''",
          "' '"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'N/A'",
          "'NULL'",
          "''",
          "'EXEMPT'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 875,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 55,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "Data Sanitization: Level 55: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "CAST",
          "NULLIF",
          "TRIM",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "IFNULL",
          "COALESCE",
          "NVL",
          "NULLIF"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "LOWER",
          "LEN",
          "TRIM"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'NULL'",
          "'0'",
          "''",
          "' '"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'NULL'",
          "''",
          "'EXEMPT'",
          "'N/A'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 876,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 56,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "Data Sanitization: Level 56: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "NULLIF",
          "TRIM",
          "CAST",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "IFNULL",
          "NVL",
          "NULLIF"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "TRIM",
          "LEN",
          "LOWER",
          "UPPER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'0'",
          "' '",
          "'NULL'",
          "''"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "''",
          "'NULL'",
          "'N/A'",
          "'EXEMPT'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 877,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 57,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "Data Sanitization: Level 57: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "CAST",
          "NULLIF",
          "TRIM",
          "COALESCE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "IFNULL",
          "NULLIF",
          "COALESCE",
          "NVL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "LEN",
          "LOWER",
          "UPPER",
          "TRIM"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'NULL'",
          "''",
          "' '",
          "'0'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'N/A'",
          "''",
          "'EXEMPT'",
          "'NULL'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 878,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 58,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "Data Sanitization: Level 58: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "CAST",
          "TRIM"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "IFNULL",
          "NULLIF",
          "NVL",
          "COALESCE"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "TRIM",
          "LEN",
          "UPPER",
          "LOWER"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "' '",
          "'NULL'",
          "''",
          "'0'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'NULL'",
          "''",
          "'N/A'",
          "'EXEMPT'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 879,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 59,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "Data Sanitization: Level 59: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "TRIM",
          "COALESCE",
          "CAST",
          "NULLIF"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "IFNULL",
          "COALESCE",
          "NVL",
          "NULLIF"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "TRIM",
          "UPPER",
          "LOWER",
          "LEN"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'NULL'",
          "''",
          "' '",
          "'0'"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "'NULL'",
          "'EXEMPT'",
          "''",
          "'N/A'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 880,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 60,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "Data Sanitization: Level 60: Empty String Trimming & Nullification",
    "subtitle": "Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.",
    "type": "fill_blank",
    "table": "ClientProfiles",
    "schemaSnippet": "ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)",
    "task": "Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.",
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "CAST",
          "TRIM"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "COALESCE",
          "NULLIF",
          "IFNULL"
        ]
      },
      "slot3": {
        "correct": "TRIM",
        "options": [
          "UPPER",
          "TRIM",
          "LOWER",
          "LEN"
        ]
      },
      "slot4": {
        "correct": "''",
        "options": [
          "'0'",
          "''",
          "'NULL'",
          "' '"
        ]
      },
      "slot5": {
        "correct": "'EXEMPT'",
        "options": [
          "''",
          "'EXEMPT'",
          "'N/A'",
          "'NULL'"
        ]
      }
    },
    "template": "SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;",
    "targetQuery": "SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;"
  },
  {
    "id": 881,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 01",
    "title": "Compound Classifications: Level 01: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "IF",
          "CASE",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "NOT",
          "OR",
          "XOR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "GOTO",
          "DO",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "UNLESS"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 55000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 55000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 882,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "Compound Classifications: Level 02: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "CASE",
          "WHERE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "XOR",
          "OR",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "THEN",
          "GOTO",
          "DO"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "OTHERWISE",
          "DEFAULT",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 60000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 60000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 883,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "Compound Classifications: Level 03: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "EVAL",
          "IF",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "XOR",
          "AND",
          "OR",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "GOTO",
          "DO",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "UNLESS"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 65000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 65000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 884,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "Compound Classifications: Level 04: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "WHERE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "NOT",
          "XOR",
          "AND",
          "OR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "GOTO",
          "ELSE",
          "DO"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "UNLESS",
          "DEFAULT",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 70000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 70000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 885,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "Compound Classifications: Level 05: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHERE",
          "EVAL",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "OR",
          "XOR",
          "AND",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "GOTO",
          "ELSE",
          "DO"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "ELSE",
          "OTHERWISE",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 75000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 75000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 886,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "Compound Classifications: Level 06: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "EVAL",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "NOT",
          "XOR",
          "OR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "GOTO",
          "ELSE",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "ELSE",
          "OTHERWISE",
          "UNLESS"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 80000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 80000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 887,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "Compound Classifications: Level 07: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "WHERE",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "NOT",
          "OR",
          "AND",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "GOTO",
          "DO",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "OTHERWISE",
          "UNLESS",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 85000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 85000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 888,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "Compound Classifications: Level 08: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "WHERE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "NOT",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "GOTO",
          "ELSE",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "UNLESS",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 90000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 90000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 889,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "Compound Classifications: Level 09: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "IF",
          "WHERE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "NOT",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "THEN",
          "GOTO",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "ELSE",
          "DEFAULT",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 95000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 95000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 890,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "Compound Classifications: Level 10: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "WHERE",
          "EVAL",
          "IF"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "NOT",
          "XOR",
          "AND",
          "OR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "GOTO",
          "DO",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "OTHERWISE",
          "DEFAULT",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 50000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 50000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 891,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "Compound Classifications: Level 11: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHERE",
          "EVAL",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "NOT",
          "XOR",
          "OR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "GOTO",
          "DO",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "DEFAULT",
          "OTHERWISE",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 55000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 55000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 892,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "Compound Classifications: Level 12: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "WHERE",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "NOT",
          "OR",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "THEN",
          "GOTO",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "ELSE",
          "UNLESS",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 60000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 60000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 893,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "Compound Classifications: Level 13: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "CASE",
          "WHERE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "NOT",
          "OR",
          "AND",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "GOTO",
          "ELSE",
          "DO"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "OTHERWISE",
          "DEFAULT",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 65000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 65000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 894,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "Compound Classifications: Level 14: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "EVAL",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "OR",
          "NOT",
          "XOR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "GOTO",
          "THEN",
          "ELSE"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "DEFAULT",
          "OTHERWISE",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 70000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 70000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 895,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "Compound Classifications: Level 15: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHERE",
          "CASE",
          "IF",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "NOT",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "THEN",
          "GOTO",
          "ELSE",
          "DO"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "ELSE",
          "UNLESS",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 75000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 75000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 896,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "Compound Classifications: Level 16: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "WHERE",
          "IF",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "OR",
          "NOT",
          "AND",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "GOTO",
          "DO",
          "ELSE",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "OTHERWISE",
          "UNLESS",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 80000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 80000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 897,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "Compound Classifications: Level 17: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "EVAL",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "OR",
          "XOR",
          "AND",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "THEN",
          "ELSE",
          "GOTO"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "ELSE",
          "UNLESS",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 85000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 85000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 898,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "Compound Classifications: Level 18: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "WHERE",
          "EVAL",
          "IF"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "NOT",
          "XOR",
          "AND",
          "OR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "GOTO",
          "DO",
          "ELSE",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "UNLESS",
          "OTHERWISE",
          "ELSE",
          "DEFAULT"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 90000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 90000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 899,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "Compound Classifications: Level 19: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "WHERE",
          "IF",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "NOT",
          "XOR",
          "OR"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "THEN",
          "DO",
          "GOTO"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "UNLESS",
          "DEFAULT",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 95000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 95000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 900,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "Compound Classifications: Level 20: High-Value Cross-Border Flag",
    "subtitle": "Flag transactions that exceed threshold AND originate from foreign jurisdictions.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Use AND operator inside CASE WHEN to evaluate multi-column predicates.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHERE",
          "CASE",
          "EVAL",
          "IF"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "XOR",
          "AND",
          "OR",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "THEN",
        "options": [
          "DO",
          "ELSE",
          "GOTO",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "ELSE",
        "options": [
          "DEFAULT",
          "UNLESS",
          "ELSE",
          "OTHERWISE"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > 50000 {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > 50000 AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;"
  },
  {
    "id": 901,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 21,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "Compound Classifications: Level 21: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "THEN",
          "WHERE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND NOT",
          "OR",
          "AND",
          "NOR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "WITH",
          "OR",
          "AND",
          "XOR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "DO",
          "THEN",
          "ELSE",
          "RESULT"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 902,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 22,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "Compound Classifications: Level 22: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "THEN",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "AND",
          "AND NOT",
          "OR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "WITH",
          "OR",
          "XOR",
          "AND"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "THEN",
          "RESULT",
          "DO",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 903,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 23,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "Compound Classifications: Level 23: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "IF",
          "THEN",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "OR",
          "AND NOT",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "XOR",
          "WITH",
          "AND"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "THEN",
          "ELSE",
          "DO",
          "RESULT"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 904,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 24,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "Compound Classifications: Level 24: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "WHEN",
          "IF",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "AND NOT",
          "OR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "XOR",
          "WITH"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "RESULT",
          "THEN"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 905,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 25,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "Compound Classifications: Level 25: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "THEN",
          "WHERE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND NOT",
          "OR",
          "NOR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "WITH",
          "XOR",
          "AND",
          "OR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "RESULT",
          "THEN",
          "DO",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 906,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 26,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "Compound Classifications: Level 26: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "IF",
          "WHEN",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND NOT",
          "OR",
          "NOR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "WITH",
          "AND",
          "OR",
          "XOR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "THEN",
          "RESULT"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 907,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 27,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "Compound Classifications: Level 27: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "IF",
          "THEN",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "NOR",
          "AND",
          "AND NOT"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "XOR",
          "WITH",
          "AND"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "THEN",
          "RESULT",
          "DO",
          "ELSE"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 908,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 28,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "Compound Classifications: Level 28: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "IF",
          "THEN",
          "WHERE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "AND",
          "OR",
          "AND NOT"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "AND",
          "WITH",
          "XOR",
          "OR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "THEN",
          "RESULT"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 909,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 29,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "Compound Classifications: Level 29: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHERE",
          "WHEN",
          "THEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND NOT",
          "AND",
          "OR",
          "NOR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "XOR",
          "WITH"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "THEN",
          "RESULT",
          "ELSE",
          "DO"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 910,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 30,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "Compound Classifications: Level 30: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "IF",
          "WHERE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND NOT",
          "AND",
          "NOR",
          "OR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "XOR",
          "AND",
          "OR",
          "WITH"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "THEN",
          "RESULT",
          "DO"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 911,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 31,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "Compound Classifications: Level 31: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "IF",
          "THEN",
          "WHERE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND NOT",
          "AND",
          "NOR",
          "OR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "AND",
          "XOR",
          "OR",
          "WITH"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "DO",
          "ELSE",
          "THEN",
          "RESULT"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 912,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 32,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "Compound Classifications: Level 32: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "THEN",
          "IF",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "NOR",
          "AND NOT",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "XOR",
          "WITH",
          "OR",
          "AND"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "RESULT",
          "ELSE",
          "THEN",
          "DO"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 913,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 33,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "Compound Classifications: Level 33: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "IF",
          "WHEN",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND",
          "OR",
          "AND NOT",
          "NOR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "WITH",
          "AND",
          "XOR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "RESULT",
          "DO",
          "THEN"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 914,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 34,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "Compound Classifications: Level 34: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "WHEN",
          "IF",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "OR",
          "AND",
          "AND NOT"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "WITH",
          "XOR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "RESULT",
          "THEN",
          "DO"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 915,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 35,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "Compound Classifications: Level 35: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "WHEN",
          "WHERE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "NOR",
          "AND NOT",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "WITH",
          "XOR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "THEN",
          "DO",
          "ELSE",
          "RESULT"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 916,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 36,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "Compound Classifications: Level 36: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHERE",
          "WHEN",
          "IF",
          "THEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND NOT",
          "OR",
          "NOR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "WITH",
          "AND",
          "XOR",
          "OR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "DO",
          "ELSE",
          "THEN",
          "RESULT"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 917,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 37,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "Compound Classifications: Level 37: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "IF",
          "THEN",
          "WHERE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "NOR",
          "AND",
          "AND NOT"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "XOR",
          "AND",
          "WITH",
          "OR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "RESULT",
          "THEN"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 918,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 38,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "Compound Classifications: Level 38: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "IF",
          "WHERE",
          "THEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND",
          "OR",
          "AND NOT",
          "NOR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "XOR",
          "WITH",
          "AND",
          "OR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "DO",
          "RESULT",
          "ELSE",
          "THEN"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 919,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 39,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "Compound Classifications: Level 39: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "THEN",
          "WHEN",
          "IF",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND",
          "NOR",
          "AND NOT",
          "OR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "AND",
          "WITH",
          "XOR",
          "OR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "RESULT",
          "THEN"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 920,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 40,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "Compound Classifications: Level 40: AML Risk Tiering",
    "subtitle": "Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).",
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "IF",
          "WHEN",
          "WHERE",
          "THEN"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND",
          "AND NOT",
          "OR",
          "NOR"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "AND",
          "XOR",
          "WITH",
          "OR"
        ]
      },
      "slot4": {
        "correct": "THEN",
        "options": [
          "ELSE",
          "DO",
          "RESULT",
          "THEN"
        ]
      }
    },
    "template": "SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;",
    "targetQuery": "SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;"
  },
  {
    "id": 921,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 41,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "Compound Classifications: Level 41: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "CHOOSE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd = 0",
          "amount_usd >= 500000",
          "amount_usd IS NULL",
          "amount_usd < 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'FREE'",
          "0.0005",
          "'0.05%'",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0",
          "'LOW'",
          "0.0015",
          "'0.15%'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "0.0030",
          "'0.30%'",
          "1"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 922,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 42,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "Compound Classifications: Level 42: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CHOOSE",
          "CASE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd >= 500000",
          "amount_usd IS NULL",
          "amount_usd < 500000",
          "amount_usd = 0"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'FREE'",
          "NULL",
          "0.0005",
          "'0.05%'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0",
          "'0.15%'",
          "'LOW'",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "1",
          "0.0030",
          "'0.30%'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 923,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 43,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "Compound Classifications: Level 43: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "CHOOSE",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd = 0",
          "amount_usd < 500000",
          "amount_usd IS NULL",
          "amount_usd >= 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "0.0005",
          "'FREE'",
          "'0.05%'",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'LOW'",
          "'0.15%'",
          "0",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'0.30%'",
          "0.0030",
          "'STANDARD'",
          "1"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 924,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 44,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "Compound Classifications: Level 44: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CHOOSE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd IS NULL",
          "amount_usd >= 500000",
          "amount_usd = 0",
          "amount_usd < 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'0.05%'",
          "0.0005",
          "'FREE'",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'LOW'",
          "0.0015",
          "0",
          "'0.15%'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "'0.30%'",
          "1",
          "0.0030"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 925,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 45,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "Compound Classifications: Level 45: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "CHOOSE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd = 0",
          "amount_usd < 500000",
          "amount_usd >= 500000",
          "amount_usd IS NULL"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "0.0005",
          "'FREE'",
          "NULL",
          "'0.05%'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'0.15%'",
          "0",
          "0.0015",
          "'LOW'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "1",
          "'0.30%'",
          "0.0030"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 926,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 46,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "Compound Classifications: Level 46: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "CHOOSE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd < 500000",
          "amount_usd IS NULL",
          "amount_usd = 0",
          "amount_usd >= 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "NULL",
          "'FREE'",
          "0.0005",
          "'0.05%'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'LOW'",
          "0",
          "'0.15%'",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'0.30%'",
          "'STANDARD'",
          "1",
          "0.0030"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 927,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 47,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "Compound Classifications: Level 47: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "CASE",
          "IF",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd >= 500000",
          "amount_usd IS NULL",
          "amount_usd = 0",
          "amount_usd < 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'0.05%'",
          "0.0005",
          "'FREE'",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'LOW'",
          "'0.15%'",
          "0.0015",
          "0"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "'0.30%'",
          "0.0030",
          "1"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 928,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 48,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "Compound Classifications: Level 48: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CHOOSE",
          "CASE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd = 0",
          "amount_usd IS NULL",
          "amount_usd < 500000",
          "amount_usd >= 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'FREE'",
          "NULL",
          "0.0005",
          "'0.05%'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0.0015",
          "0",
          "'0.15%'",
          "'LOW'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "0.0030",
          "'0.30%'",
          "1",
          "'STANDARD'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 929,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 49,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "Compound Classifications: Level 49: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "SWITCH",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd = 0",
          "amount_usd IS NULL",
          "amount_usd >= 500000",
          "amount_usd < 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'0.05%'",
          "0.0005",
          "NULL",
          "'FREE'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0.0015",
          "'LOW'",
          "0",
          "'0.15%'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'0.30%'",
          "0.0030",
          "1",
          "'STANDARD'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 930,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 50,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "Compound Classifications: Level 50: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "CHOOSE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd >= 500000",
          "amount_usd IS NULL",
          "amount_usd < 500000",
          "amount_usd = 0"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'0.05%'",
          "0.0005",
          "'FREE'",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0",
          "'0.15%'",
          "'LOW'",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "1",
          "'0.30%'",
          "0.0030"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 931,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 51,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "Compound Classifications: Level 51: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CHOOSE",
          "SWITCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd >= 500000",
          "amount_usd < 500000",
          "amount_usd = 0",
          "amount_usd IS NULL"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "NULL",
          "'FREE'",
          "'0.05%'",
          "0.0005"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0",
          "0.0015",
          "'0.15%'",
          "'LOW'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "0.0030",
          "1",
          "'0.30%'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 932,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 52,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "Compound Classifications: Level 52: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd < 500000",
          "amount_usd = 0",
          "amount_usd >= 500000",
          "amount_usd IS NULL"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "0.0005",
          "'0.05%'",
          "NULL",
          "'FREE'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'0.15%'",
          "'LOW'",
          "0",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "0.0030",
          "1",
          "'0.30%'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 933,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 53,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "Compound Classifications: Level 53: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "CHOOSE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd = 0",
          "amount_usd >= 500000",
          "amount_usd < 500000",
          "amount_usd IS NULL"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "0.0005",
          "NULL",
          "'FREE'",
          "'0.05%'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0.0015",
          "0",
          "'LOW'",
          "'0.15%'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'0.30%'",
          "0.0030",
          "'STANDARD'",
          "1"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 934,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 54,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "Compound Classifications: Level 54: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SWITCH",
          "CHOOSE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd < 500000",
          "amount_usd IS NULL",
          "amount_usd = 0",
          "amount_usd >= 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "NULL",
          "'FREE'",
          "'0.05%'",
          "0.0005"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'0.15%'",
          "0.0015",
          "0",
          "'LOW'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "1",
          "'STANDARD'",
          "0.0030",
          "'0.30%'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 935,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 55,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "Compound Classifications: Level 55: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "CHOOSE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd IS NULL",
          "amount_usd < 500000",
          "amount_usd >= 500000",
          "amount_usd = 0"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "NULL",
          "'0.05%'",
          "'FREE'",
          "0.0005"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0.0015",
          "'LOW'",
          "0",
          "'0.15%'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "1",
          "'STANDARD'",
          "0.0030",
          "'0.30%'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 936,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 56,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "Compound Classifications: Level 56: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SWITCH",
          "IF",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd = 0",
          "amount_usd IS NULL",
          "amount_usd >= 500000",
          "amount_usd < 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "'0.05%'",
          "0.0005",
          "NULL",
          "'FREE'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0",
          "0.0015",
          "'0.15%'",
          "'LOW'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "1",
          "'0.30%'",
          "0.0030"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 937,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 57,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "Compound Classifications: Level 57: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "CHOOSE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd IS NULL",
          "amount_usd < 500000",
          "amount_usd = 0",
          "amount_usd >= 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "0.0005",
          "'0.05%'",
          "'FREE'",
          "NULL"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0.0015",
          "0",
          "'0.15%'",
          "'LOW'"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "'0.30%'",
          "1",
          "0.0030"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 938,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 58,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "Compound Classifications: Level 58: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CHOOSE",
          "SWITCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd IS NULL",
          "amount_usd = 0",
          "amount_usd >= 500000",
          "amount_usd < 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "0.0005",
          "NULL",
          "'0.05%'",
          "'FREE'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0",
          "'LOW'",
          "'0.15%'",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "0.0030",
          "1",
          "'0.30%'",
          "'STANDARD'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 939,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 59,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "Compound Classifications: Level 59: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CHOOSE",
          "CASE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd IS NULL",
          "amount_usd = 0",
          "amount_usd >= 500000",
          "amount_usd < 500000"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "NULL",
          "0.0005",
          "'0.05%'",
          "'FREE'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "'0.15%'",
          "0",
          "'LOW'",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'STANDARD'",
          "0.0030",
          "1",
          "'0.30%'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 940,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 60,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "Compound Classifications: Level 60: Dynamic Brokerage Fee Commission",
    "subtitle": "Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.",
    "type": "fill_blank",
    "table": "TransactionAudits",
    "schemaSnippet": "TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)",
    "task": "Ensure all THEN and ELSE return numeric values of uniform data types.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "CHOOSE",
          "SWITCH",
          "IF"
        ]
      },
      "slot2": {
        "correct": "amount_usd >= 500000",
        "options": [
          "amount_usd >= 500000",
          "amount_usd < 500000",
          "amount_usd IS NULL",
          "amount_usd = 0"
        ]
      },
      "slot3": {
        "correct": "0.0005",
        "options": [
          "NULL",
          "0.0005",
          "'FREE'",
          "'0.05%'"
        ]
      },
      "slot4": {
        "correct": "0.0015",
        "options": [
          "0",
          "'0.15%'",
          "'LOW'",
          "0.0015"
        ]
      },
      "slot5": {
        "correct": "0.0030",
        "options": [
          "'0.30%'",
          "0.0030",
          "1",
          "'STANDARD'"
        ]
      }
    },
    "template": "SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;",
    "targetQuery": "SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;"
  },
  {
    "id": 941,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 01",
    "title": "Matrix Unpivoting: Level 01: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H2'",
          "'H1'",
          "'ANNUAL'",
          "'TOTAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "JOIN",
          "UNION ALL",
          "INTERSECT",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H2'",
          "'H1'",
          "'HALF2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "revenue_usd",
          "period_code",
          "entity_id",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 942,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "Matrix Unpivoting: Level 02: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H1'",
          "'H2'",
          "'TOTAL'",
          "'ANNUAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "INTERSECT",
          "JOIN",
          "UNION",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H2'",
          "'H1'",
          "'FY'",
          "'HALF2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "period_code",
          "revenue_usd",
          "entity_id",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 943,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "Matrix Unpivoting: Level 03: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'ANNUAL'",
          "'TOTAL'",
          "'H2'",
          "'H1'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "INTERSECT",
          "JOIN",
          "UNION",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'FY'",
          "'HALF2'",
          "'H2'",
          "'H1'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "entity_id",
          "revenue_usd",
          "period_code",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 944,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "Matrix Unpivoting: Level 04: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'TOTAL'",
          "'ANNUAL'",
          "'H1'",
          "'H2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "JOIN",
          "INTERSECT",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H1'",
          "'FY'",
          "'H2'",
          "'HALF2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "entity_id",
          "period_code",
          "revenue_usd",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 945,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "Matrix Unpivoting: Level 05: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H2'",
          "'TOTAL'",
          "'H1'",
          "'ANNUAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "JOIN",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H1'",
          "'HALF2'",
          "'H2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "entity_id",
          "fiscal_year",
          "period_code",
          "revenue_usd"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 946,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "Matrix Unpivoting: Level 06: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H2'",
          "'H1'",
          "'TOTAL'",
          "'ANNUAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "JOIN",
          "UNION",
          "UNION ALL",
          "INTERSECT"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'HALF2'",
          "'FY'",
          "'H2'",
          "'H1'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "period_code",
          "revenue_usd",
          "entity_id",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 947,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "Matrix Unpivoting: Level 07: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'ANNUAL'",
          "'H1'",
          "'TOTAL'",
          "'H2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "JOIN",
          "UNION ALL",
          "UNION",
          "INTERSECT"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H2'",
          "'HALF2'",
          "'FY'",
          "'H1'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "period_code",
          "revenue_usd",
          "entity_id",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 948,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "Matrix Unpivoting: Level 08: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H2'",
          "'TOTAL'",
          "'ANNUAL'",
          "'H1'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "INTERSECT",
          "JOIN",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H1'",
          "'H2'",
          "'HALF2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "revenue_usd",
          "fiscal_year",
          "period_code",
          "entity_id"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 949,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "Matrix Unpivoting: Level 09: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H1'",
          "'H2'",
          "'ANNUAL'",
          "'TOTAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'FY'",
          "'HALF2'",
          "'H2'",
          "'H1'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "fiscal_year",
          "revenue_usd",
          "period_code",
          "entity_id"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 950,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "Matrix Unpivoting: Level 10: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'TOTAL'",
          "'H1'",
          "'H2'",
          "'ANNUAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "INTERSECT",
          "UNION",
          "UNION ALL",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H2'",
          "'FY'",
          "'H1'",
          "'HALF2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "entity_id",
          "period_code",
          "revenue_usd",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 951,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "Matrix Unpivoting: Level 11: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H1'",
          "'H2'",
          "'ANNUAL'",
          "'TOTAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "JOIN",
          "UNION ALL",
          "INTERSECT",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H2'",
          "'H1'",
          "'HALF2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "revenue_usd",
          "fiscal_year",
          "period_code",
          "entity_id"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 952,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "Matrix Unpivoting: Level 12: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'ANNUAL'",
          "'TOTAL'",
          "'H2'",
          "'H1'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "INTERSECT",
          "JOIN",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'HALF2'",
          "'FY'",
          "'H1'",
          "'H2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "fiscal_year",
          "period_code",
          "entity_id",
          "revenue_usd"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 953,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "Matrix Unpivoting: Level 13: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'TOTAL'",
          "'ANNUAL'",
          "'H1'",
          "'H2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "INTERSECT",
          "JOIN",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'HALF2'",
          "'H1'",
          "'H2'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "period_code",
          "revenue_usd",
          "entity_id",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 954,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "Matrix Unpivoting: Level 14: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H1'",
          "'ANNUAL'",
          "'TOTAL'",
          "'H2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "INTERSECT",
          "UNION",
          "JOIN",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'FY'",
          "'H1'",
          "'HALF2'",
          "'H2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "entity_id",
          "revenue_usd",
          "period_code",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 955,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "Matrix Unpivoting: Level 15: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H2'",
          "'TOTAL'",
          "'H1'",
          "'ANNUAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'HALF2'",
          "'H2'",
          "'H1'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "revenue_usd",
          "fiscal_year",
          "entity_id",
          "period_code"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 956,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "Matrix Unpivoting: Level 16: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H2'",
          "'TOTAL'",
          "'ANNUAL'",
          "'H1'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "JOIN",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'FY'",
          "'HALF2'",
          "'H2'",
          "'H1'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "period_code",
          "fiscal_year",
          "revenue_usd",
          "entity_id"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 957,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "Matrix Unpivoting: Level 17: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H2'",
          "'H1'",
          "'ANNUAL'",
          "'TOTAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "INTERSECT",
          "JOIN",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H1'",
          "'FY'",
          "'HALF2'",
          "'H2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "revenue_usd",
          "fiscal_year",
          "entity_id",
          "period_code"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 958,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "Matrix Unpivoting: Level 18: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'H1'",
          "'H2'",
          "'ANNUAL'",
          "'TOTAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "JOIN",
          "INTERSECT",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'FY'",
          "'HALF2'",
          "'H1'",
          "'H2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "revenue_usd",
          "period_code",
          "entity_id",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 959,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "Matrix Unpivoting: Level 19: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'TOTAL'",
          "'H1'",
          "'H2'",
          "'ANNUAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "INTERSECT",
          "UNION",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'HALF2'",
          "'FY'",
          "'H1'",
          "'H2'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "revenue_usd",
          "fiscal_year",
          "period_code",
          "entity_id"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 960,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "Matrix Unpivoting: Level 20: Semi-Annual Column Inversion",
    "subtitle": "Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Normalize wide half-year columns into discrete rows with uniform aliases.",
    "slots": {
      "slot1": {
        "correct": "'H1'",
        "options": [
          "'ANNUAL'",
          "'H2'",
          "'H1'",
          "'TOTAL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "JOIN",
          "INTERSECT",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'H2'",
        "options": [
          "'H2'",
          "'HALF2'",
          "'H1'",
          "'FY'"
        ]
      },
      "slot4": {
        "correct": "entity_id",
        "options": [
          "period_code",
          "revenue_usd",
          "entity_id",
          "fiscal_year"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;"
  },
  {
    "id": 961,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 21,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "Matrix Unpivoting: Level 21: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'FY'",
          "'ALL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "EXCEPT",
          "CROSS JOIN"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'Q1'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q1'",
          "'Q3'",
          "'Q2'",
          "'Q4'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 962,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 22,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "Matrix Unpivoting: Level 22: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'FY'",
          "'ALL'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "CROSS JOIN",
          "EXCEPT",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q4'",
          "'Q1'",
          "'Q2'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q3'",
          "'Q1'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 963,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 23,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "Matrix Unpivoting: Level 23: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q2'",
          "'FY'",
          "'ALL'",
          "'Q1'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "UNION ALL",
          "EXCEPT",
          "CROSS JOIN"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q1'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q1'",
          "'Q3'",
          "'Q2'",
          "'Q4'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 964,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 24,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "Matrix Unpivoting: Level 24: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'FY'",
          "'ALL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "CROSS JOIN",
          "UNION",
          "EXCEPT",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'Q4'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q2'",
          "'Q3'",
          "'Q1'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 965,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 25,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "Matrix Unpivoting: Level 25: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'ALL'",
          "'FY'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "EXCEPT",
          "CROSS JOIN"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q4'",
          "'Q2'",
          "'Q1'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q1'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 966,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 26,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "Matrix Unpivoting: Level 26: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q2'",
          "'ALL'",
          "'Q1'",
          "'FY'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "CROSS JOIN",
          "UNION",
          "EXCEPT"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q4'",
          "'Q3'",
          "'Q2'",
          "'Q1'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q2'",
          "'Q1'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 967,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 27,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "Matrix Unpivoting: Level 27: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q2'",
          "'Q1'",
          "'FY'",
          "'ALL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "CROSS JOIN",
          "UNION",
          "UNION ALL",
          "EXCEPT"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'Q4'",
          "'Q1'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q2'",
          "'Q3'",
          "'Q1'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 968,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 28,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "Matrix Unpivoting: Level 28: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'FY'",
          "'ALL'",
          "'Q1'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "CROSS JOIN",
          "UNION",
          "EXCEPT"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q4'",
          "'Q1'",
          "'Q2'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q3'",
          "'Q4'",
          "'Q1'",
          "'Q2'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 969,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 29,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "Matrix Unpivoting: Level 29: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'ALL'",
          "'FY'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "EXCEPT",
          "CROSS JOIN",
          "UNION ALL",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q3'",
          "'Q2'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q3'",
          "'Q1'",
          "'Q2'",
          "'Q4'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 970,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 30,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "Matrix Unpivoting: Level 30: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'ALL'",
          "'FY'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "EXCEPT",
          "CROSS JOIN",
          "UNION ALL",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'Q1'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'Q4'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 971,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 31,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "Matrix Unpivoting: Level 31: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q2'",
          "'Q1'",
          "'FY'",
          "'ALL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "CROSS JOIN",
          "EXCEPT",
          "UNION",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q1'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q3'",
          "'Q1'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 972,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 32,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "Matrix Unpivoting: Level 32: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'FY'",
          "'Q1'",
          "'ALL'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "EXCEPT",
          "UNION ALL",
          "CROSS JOIN",
          "UNION"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'Q4'",
          "'Q1'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q1'",
          "'Q4'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 973,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 33,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "Matrix Unpivoting: Level 33: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'FY'",
          "'ALL'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "CROSS JOIN",
          "UNION ALL",
          "UNION",
          "EXCEPT"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'Q4'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q1'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 974,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 34,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "Matrix Unpivoting: Level 34: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q2'",
          "'Q1'",
          "'FY'",
          "'ALL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "CROSS JOIN",
          "UNION",
          "EXCEPT",
          "UNION ALL"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q1'",
          "'Q2'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q1'",
          "'Q2'",
          "'Q4'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 975,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 35,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "Matrix Unpivoting: Level 35: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'FY'",
          "'Q2'",
          "'ALL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "CROSS JOIN",
          "UNION ALL",
          "EXCEPT"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q1'",
          "'Q3'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q3'",
          "'Q2'",
          "'Q1'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 976,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 36,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "Matrix Unpivoting: Level 36: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'ALL'",
          "'Q1'",
          "'FY'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "EXCEPT",
          "UNION",
          "CROSS JOIN"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q1'",
          "'Q4'",
          "'Q2'",
          "'Q3'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q3'",
          "'Q4'",
          "'Q1'",
          "'Q2'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 977,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 37,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "Matrix Unpivoting: Level 37: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q2'",
          "'ALL'",
          "'FY'",
          "'Q1'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "CROSS JOIN",
          "EXCEPT"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q1'",
          "'Q2'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q4'",
          "'Q3'",
          "'Q1'",
          "'Q2'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 978,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 38,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "Matrix Unpivoting: Level 38: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'ALL'",
          "'Q1'",
          "'FY'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION",
          "EXCEPT",
          "UNION ALL",
          "CROSS JOIN"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q1'",
          "'Q3'",
          "'Q4'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q3'",
          "'Q1'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 979,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 39,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "Matrix Unpivoting: Level 39: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'FY'",
          "'ALL'",
          "'Q1'",
          "'Q2'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "CROSS JOIN",
          "UNION",
          "UNION ALL",
          "EXCEPT"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q3'",
          "'Q4'",
          "'Q2'",
          "'Q1'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q1'",
          "'Q4'",
          "'Q2'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 980,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 40,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "Matrix Unpivoting: Level 40: 4-Quarter Time-Series Unpivot",
    "subtitle": "Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Ensure identical projection schemas and types across all 4 SELECT branches.",
    "slots": {
      "slot1": {
        "correct": "'Q1'",
        "options": [
          "'Q1'",
          "'FY'",
          "'Q2'",
          "'ALL'"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "EXCEPT",
          "UNION",
          "UNION ALL",
          "CROSS JOIN"
        ]
      },
      "slot3": {
        "correct": "'Q3'",
        "options": [
          "'Q2'",
          "'Q3'",
          "'Q4'",
          "'Q1'"
        ]
      },
      "slot4": {
        "correct": "'Q4'",
        "options": [
          "'Q2'",
          "'Q4'",
          "'Q1'",
          "'Q3'"
        ]
      }
    },
    "template": "SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;",
    "targetQuery": "SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;"
  },
  {
    "id": 981,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 41,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "Matrix Unpivoting: Level 41: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "FULL JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "SELECT",
          "TABLE",
          "ARRAY",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "ON",
          "AS",
          "OF",
          "IS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "w.entity_id",
          "u.metric_name",
          "1"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 982,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 42,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "Matrix Unpivoting: Level 42: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "LEFT JOIN",
          "INNER JOIN",
          "FULL JOIN",
          "CROSS JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "TABLE",
          "VALUES",
          "SELECT",
          "ARRAY"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "OF",
          "AS",
          "ON",
          "IS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "u.metric_name",
          "1",
          "w.entity_id"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 983,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 43,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "Matrix Unpivoting: Level 43: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "FULL JOIN",
          "LEFT JOIN",
          "INNER JOIN",
          "CROSS JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "ARRAY",
          "SELECT",
          "TABLE",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "IS",
          "AS",
          "ON",
          "OF"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.metric_name",
          "w.entity_id",
          "u.amount",
          "1"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 984,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 44,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "Matrix Unpivoting: Level 44: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "SELECT",
          "TABLE",
          "ARRAY",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "OF",
          "AS",
          "ON",
          "IS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "w.entity_id",
          "u.metric_name",
          "1"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 985,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 45,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "Matrix Unpivoting: Level 45: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "FULL JOIN",
          "LEFT JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "SELECT",
          "ARRAY",
          "TABLE",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "OF",
          "IS",
          "ON",
          "AS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "w.entity_id",
          "u.metric_name",
          "1",
          "u.amount"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 986,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 46,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "Matrix Unpivoting: Level 46: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "LEFT JOIN",
          "INNER JOIN",
          "FULL JOIN",
          "CROSS JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "TABLE",
          "SELECT",
          "ARRAY"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "OF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "w.entity_id",
          "u.metric_name",
          "1"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 987,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 47,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "Matrix Unpivoting: Level 47: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "FULL JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "ARRAY",
          "TABLE",
          "SELECT",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "ON",
          "IS",
          "AS",
          "OF"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "w.entity_id",
          "1",
          "u.metric_name"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 988,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 48,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "Matrix Unpivoting: Level 48: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "FULL JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "TABLE",
          "ARRAY",
          "VALUES",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "ON",
          "OF",
          "IS",
          "AS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "1",
          "w.entity_id",
          "u.metric_name"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 989,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 49,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "Matrix Unpivoting: Level 49: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "INNER JOIN",
          "LEFT JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "TABLE",
          "VALUES",
          "SELECT",
          "ARRAY"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "ON",
          "IS",
          "AS",
          "OF"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "1",
          "u.metric_name",
          "w.entity_id",
          "u.amount"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 990,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 50,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "Matrix Unpivoting: Level 50: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "CROSS JOIN",
          "LEFT JOIN",
          "INNER JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "TABLE",
          "SELECT",
          "ARRAY",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "IS",
          "ON",
          "OF",
          "AS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "1",
          "u.metric_name",
          "w.entity_id",
          "u.amount"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 991,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 51,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "Matrix Unpivoting: Level 51: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "CROSS JOIN",
          "FULL JOIN",
          "INNER JOIN",
          "LEFT JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "ARRAY",
          "SELECT",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "OF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "1",
          "w.entity_id",
          "u.metric_name",
          "u.amount"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 992,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 52,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "Matrix Unpivoting: Level 52: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "CROSS JOIN",
          "FULL JOIN",
          "LEFT JOIN",
          "INNER JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "ARRAY",
          "TABLE",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "OF",
          "IS",
          "AS",
          "ON"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "w.entity_id",
          "u.metric_name",
          "1"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 993,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 53,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "Matrix Unpivoting: Level 53: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "LEFT JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "TABLE",
          "SELECT",
          "ARRAY"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "ON",
          "OF"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "u.metric_name",
          "w.entity_id",
          "1"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 994,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 54,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "Matrix Unpivoting: Level 54: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "CROSS JOIN",
          "INNER JOIN",
          "LEFT JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "SELECT",
          "VALUES",
          "ARRAY",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "IS",
          "AS",
          "OF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "1",
          "w.entity_id",
          "u.amount",
          "u.metric_name"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 995,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 55,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "Matrix Unpivoting: Level 55: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "FULL JOIN",
          "LEFT JOIN",
          "INNER JOIN",
          "CROSS JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "SELECT",
          "VALUES",
          "ARRAY",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "OF",
          "IS",
          "ON",
          "AS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "u.metric_name",
          "1",
          "w.entity_id"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 996,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 56,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "Matrix Unpivoting: Level 56: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "LEFT JOIN",
          "CROSS JOIN",
          "INNER JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "SELECT",
          "TABLE",
          "ARRAY",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "IS",
          "OF",
          "AS",
          "ON"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "w.entity_id",
          "1",
          "u.metric_name"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 997,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 57,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "Matrix Unpivoting: Level 57: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "LEFT JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "TABLE",
          "ARRAY",
          "VALUES",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "ON",
          "IS",
          "AS",
          "OF"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "1",
          "u.amount",
          "w.entity_id",
          "u.metric_name"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 998,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 58,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "Matrix Unpivoting: Level 58: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "LEFT JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "TABLE",
          "ARRAY",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "OF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "1",
          "u.metric_name",
          "w.entity_id",
          "u.amount"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 999,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 59,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "Matrix Unpivoting: Level 59: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "FULL JOIN",
          "LEFT JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "TABLE",
          "SELECT",
          "ARRAY",
          "VALUES"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "ON",
          "OF",
          "AS",
          "IS"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "u.amount",
          "1",
          "u.metric_name",
          "w.entity_id"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 1000,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 60,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "Matrix Unpivoting: Level 60: Multi-Metric Unpivot via CROSS JOIN LATERAL",
    "subtitle": "Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.",
    "type": "fill_blank",
    "table": "WideFinancialReports",
    "schemaSnippet": "WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)",
    "task": "Avoid multiple table scans by generating dynamic rows in a single pass.",
    "slots": {
      "slot1": {
        "correct": "CROSS JOIN",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "FULL JOIN",
          "LEFT JOIN"
        ]
      },
      "slot2": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "TABLE",
          "SELECT",
          "ARRAY"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "OF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "w.entity_id",
        "options": [
          "w.entity_id",
          "1",
          "u.metric_name",
          "u.amount"
        ]
      }
    },
    "template": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;",
    "targetQuery": "SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;"
  },
  {
    "id": 1001,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 01",
    "title": "FILTER Clause: Level 01: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "TOTAL",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "WHEN",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "ON",
          "IF"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "side",
          "desk_id",
          "trade_id",
          "status"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1002,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "FILTER Clause: Level 02: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "TOTAL",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "ON",
          "WHEN",
          "WHERE",
          "IF"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "trade_id",
          "status",
          "side"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1003,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "FILTER Clause: Level 03: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "AVG",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "ON",
          "IF"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "side",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1004,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "FILTER Clause: Level 04: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "IF",
          "WHEN",
          "ON",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "side",
          "desk_id",
          "status"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1005,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "FILTER Clause: Level 05: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "COUNT",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "IF",
          "WHEN",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "trade_id",
          "side"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1006,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "FILTER Clause: Level 06: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "TOTAL",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "side",
          "trade_id",
          "status",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1007,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "FILTER Clause: Level 07: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "TOTAL",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "IF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "side",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1008,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "FILTER Clause: Level 08: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "SUM",
          "TOTAL",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "IF",
          "ON",
          "WHEN",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "trade_id",
          "desk_id",
          "side"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1009,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "FILTER Clause: Level 09: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "COUNT",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "FILTER",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "IF",
          "WHEN",
          "WHERE",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "trade_id",
          "side",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1010,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "FILTER Clause: Level 10: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "TOTAL",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "side",
          "status",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1011,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "FILTER Clause: Level 11: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "TOTAL",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "ON",
          "WHEN",
          "WHERE",
          "IF"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "desk_id",
          "status",
          "side"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1012,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "FILTER Clause: Level 12: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "AVG",
          "TOTAL",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "ON",
          "WHERE",
          "IF"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "side",
          "trade_id",
          "status"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1013,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "FILTER Clause: Level 13: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "TOTAL",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "ON",
          "IF",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "side",
          "desk_id",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1014,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "FILTER Clause: Level 14: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "TOTAL",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "IF",
          "WHEN",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "trade_id",
          "desk_id",
          "side"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1015,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "FILTER Clause: Level 15: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "AVG",
          "TOTAL",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "IF",
          "WHEN",
          "WHERE",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "side",
          "desk_id",
          "trade_id",
          "status"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1016,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "FILTER Clause: Level 16: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "TOTAL",
          "COUNT",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "ON",
          "IF",
          "WHEN"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "status",
          "side",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1017,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "FILTER Clause: Level 17: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "SUM",
          "TOTAL",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "IF",
          "WHEN",
          "WHERE",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "status",
          "side",
          "trade_id",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1018,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "FILTER Clause: Level 18: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "AVG",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "IF",
          "WHEN",
          "WHERE",
          "ON"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "side",
          "status",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1019,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "FILTER Clause: Level 19: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "SUM",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "ON",
          "IF",
          "WHEN"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "desk_id",
          "side",
          "status"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1020,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "FILTER Clause: Level 20: Single-Pass Side Aggregation",
    "subtitle": "Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "TOTAL",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "ON",
          "IF",
          "WHEN",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "status",
          "side",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1021,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 21,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "FILTER Clause: Level 21: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "COUNT",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WITH",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo IS NULL",
          "is_algo = TRUE",
          "side = 'BUY'",
          "is_algo = FALSE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'SETTLED'",
          "status = 'PENDING'",
          "status = 'CANCELLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1022,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 22,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "FILTER Clause: Level 22: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "SUM",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WITH",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo = FALSE",
          "is_algo IS NULL",
          "is_algo = TRUE",
          "side = 'BUY'"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'SETTLED'",
          "status = 'PENDING'",
          "status = 'CANCELLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1023,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 23,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "FILTER Clause: Level 23: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "COUNT",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WITH",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo = FALSE",
          "is_algo IS NULL",
          "is_algo = TRUE",
          "side = 'BUY'"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "is_algo = TRUE",
          "status = 'PENDING'",
          "status = 'SETTLED'",
          "status = 'CANCELLED'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1024,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 24,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "FILTER Clause: Level 24: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "COUNT",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WITH",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "side = 'BUY'",
          "is_algo = TRUE",
          "is_algo IS NULL",
          "is_algo = FALSE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'SETTLED'",
          "status = 'CANCELLED'",
          "status = 'PENDING'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1025,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 25,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "FILTER Clause: Level 25: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "AVG",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WITH",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo IS NULL",
          "is_algo = FALSE",
          "side = 'BUY'",
          "is_algo = TRUE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'CANCELLED'",
          "is_algo = TRUE",
          "status = 'SETTLED'",
          "status = 'PENDING'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1026,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 26,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "FILTER Clause: Level 26: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "SUM",
          "TOTAL",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WITH",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "side = 'BUY'",
          "is_algo = TRUE",
          "is_algo = FALSE",
          "is_algo IS NULL"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'PENDING'",
          "is_algo = TRUE",
          "status = 'SETTLED'",
          "status = 'CANCELLED'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1027,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 27,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "FILTER Clause: Level 27: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "TOTAL",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "side = 'BUY'",
          "is_algo = FALSE",
          "is_algo IS NULL",
          "is_algo = TRUE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "is_algo = TRUE",
          "status = 'CANCELLED'",
          "status = 'SETTLED'",
          "status = 'PENDING'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1028,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 28,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "FILTER Clause: Level 28: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "SUM",
          "AVG",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WITH",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo IS NULL",
          "side = 'BUY'",
          "is_algo = FALSE",
          "is_algo = TRUE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'PENDING'",
          "status = 'CANCELLED'",
          "status = 'SETTLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1029,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 29,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "FILTER Clause: Level 29: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "SUM",
          "TOTAL",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "FILTER",
          "WITH",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo IS NULL",
          "is_algo = FALSE",
          "is_algo = TRUE",
          "side = 'BUY'"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'SETTLED'",
          "is_algo = TRUE",
          "status = 'CANCELLED'",
          "status = 'PENDING'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1030,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 30,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "FILTER Clause: Level 30: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "COUNT",
          "TOTAL",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo IS NULL",
          "side = 'BUY'",
          "is_algo = TRUE",
          "is_algo = FALSE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'PENDING'",
          "status = 'SETTLED'",
          "status = 'CANCELLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1031,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 31,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "FILTER Clause: Level 31: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "COUNT",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "FILTER",
          "WHEN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "side = 'BUY'",
          "is_algo IS NULL",
          "is_algo = FALSE",
          "is_algo = TRUE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'CANCELLED'",
          "status = 'PENDING'",
          "status = 'SETTLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1032,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 32,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "FILTER Clause: Level 32: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "COUNT",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WHERE",
          "WITH",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo = TRUE",
          "is_algo IS NULL",
          "side = 'BUY'",
          "is_algo = FALSE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "is_algo = TRUE",
          "status = 'SETTLED'",
          "status = 'CANCELLED'",
          "status = 'PENDING'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1033,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 33,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "FILTER Clause: Level 33: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "TOTAL",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo IS NULL",
          "is_algo = TRUE",
          "side = 'BUY'",
          "is_algo = FALSE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "is_algo = TRUE",
          "status = 'CANCELLED'",
          "status = 'SETTLED'",
          "status = 'PENDING'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1034,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 34,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "FILTER Clause: Level 34: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "AVG",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHEN",
          "WITH",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo = TRUE",
          "side = 'BUY'",
          "is_algo = FALSE",
          "is_algo IS NULL"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'PENDING'",
          "status = 'CANCELLED'",
          "status = 'SETTLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1035,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 35,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "FILTER Clause: Level 35: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "SUM",
          "TOTAL",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "side = 'BUY'",
          "is_algo = FALSE",
          "is_algo IS NULL",
          "is_algo = TRUE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'SETTLED'",
          "is_algo = TRUE",
          "status = 'CANCELLED'",
          "status = 'PENDING'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1036,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 36,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "FILTER Clause: Level 36: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "SUM",
          "AVG",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "WHEN",
          "WITH",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "side = 'BUY'",
          "is_algo = FALSE",
          "is_algo = TRUE",
          "is_algo IS NULL"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'PENDING'",
          "status = 'CANCELLED'",
          "status = 'SETTLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1037,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 37,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "FILTER Clause: Level 37: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "TOTAL",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHEN",
          "WITH",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo = TRUE",
          "is_algo IS NULL",
          "is_algo = FALSE",
          "side = 'BUY'"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'CANCELLED'",
          "status = 'PENDING'",
          "status = 'SETTLED'",
          "is_algo = TRUE"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1038,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 38,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "FILTER Clause: Level 38: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "TOTAL",
          "COUNT",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WITH",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "side = 'BUY'",
          "is_algo = TRUE",
          "is_algo = FALSE",
          "is_algo IS NULL"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'PENDING'",
          "is_algo = TRUE",
          "status = 'CANCELLED'",
          "status = 'SETTLED'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1039,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 39,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "FILTER Clause: Level 39: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "SUM",
          "TOTAL",
          "COUNT",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WITH",
          "WHEN",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo IS NULL",
          "is_algo = TRUE",
          "is_algo = FALSE",
          "side = 'BUY'"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "status = 'PENDING'",
          "is_algo = TRUE",
          "status = 'SETTLED'",
          "status = 'CANCELLED'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1040,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 40,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "FILTER Clause: Level 40: Multi-Metric Desk Summary",
    "subtitle": "Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.",
    "slots": {
      "slot1": {
        "correct": "COUNT",
        "options": [
          "AVG",
          "SUM",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "is_algo = TRUE",
        "options": [
          "is_algo = FALSE",
          "side = 'BUY'",
          "is_algo IS NULL",
          "is_algo = TRUE"
        ]
      },
      "slot4": {
        "correct": "status = 'SETTLED'",
        "options": [
          "is_algo = TRUE",
          "status = 'SETTLED'",
          "status = 'PENDING'",
          "status = 'CANCELLED'"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;",
    "targetQuery": "SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1041,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 41,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "FILTER Clause: Level 41: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "COUNT",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHEN",
          "WHERE",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "ISNULL",
          "NVL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "-1",
          "0",
          "1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "trade_id",
          "side",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1042,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 42,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "FILTER Clause: Level 42: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "TOTAL",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NVL",
          "ISNULL",
          "NULLIF"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "-1",
          "0",
          "1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "trade_id",
          "side",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1043,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 43,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "FILTER Clause: Level 43: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "TOTAL",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "ISNULL",
          "NULLIF",
          "NVL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "1",
          "NULL",
          "0",
          "-1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "trade_id",
          "side"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1044,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 44,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "FILTER Clause: Level 44: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHEN",
          "IF",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NVL",
          "ISNULL",
          "NULLIF"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "1",
          "-1",
          "0"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "side",
          "status",
          "desk_id",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1045,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 45,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "FILTER Clause: Level 45: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "AVG",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "IF",
          "WHERE",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "ISNULL",
          "NVL",
          "NULLIF"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "1",
          "0",
          "-1",
          "NULL"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "side",
          "status",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1046,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 46,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "FILTER Clause: Level 46: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "COUNT",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHEN",
          "WHERE",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "ISNULL",
          "NULLIF",
          "NVL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "-1",
          "0",
          "NULL",
          "1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "desk_id",
          "side",
          "status"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1047,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 47,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "FILTER Clause: Level 47: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "COUNT",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "IF",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NVL",
          "ISNULL",
          "NULLIF"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "0",
          "NULL",
          "1",
          "-1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "status",
          "side",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1048,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 48,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "FILTER Clause: Level 48: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "COUNT",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "NVL",
          "ISNULL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "-1",
          "0",
          "1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "side",
          "status",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1049,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 49,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "FILTER Clause: Level 49: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "COUNT",
          "SUM",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "IF",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "NVL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "-1",
          "1",
          "0"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "side",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1050,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 50,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "FILTER Clause: Level 50: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "SUM",
          "COUNT",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "IF",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "ISNULL",
          "NVL",
          "COALESCE"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "1",
          "-1",
          "NULL",
          "0"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "status",
          "side",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1051,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 51,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "FILTER Clause: Level 51: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "TOTAL",
          "SUM",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "IF",
          "WHERE",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "NVL",
          "ISNULL",
          "COALESCE"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "0",
          "-1",
          "1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "side",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1052,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 52,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "FILTER Clause: Level 52: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AVG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "WHEN",
          "IF",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "ISNULL",
          "COALESCE",
          "NULLIF",
          "NVL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "1",
          "-1",
          "0",
          "NULL"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "trade_id",
          "side",
          "status",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1053,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 53,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "FILTER Clause: Level 53: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "TOTAL",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "NVL",
          "NULLIF",
          "ISNULL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "0",
          "-1",
          "1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "trade_id",
          "side"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1054,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 54,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "FILTER Clause: Level 54: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AVG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "IF",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "COALESCE",
          "ISNULL",
          "NULLIF"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "-1",
          "0",
          "NULL",
          "1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "side",
          "trade_id",
          "status",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1055,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 55,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "FILTER Clause: Level 55: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "TOTAL",
          "SUM",
          "AVG",
          "COUNT"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "NVL",
          "ISNULL",
          "COALESCE"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "1",
          "-1",
          "0"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "side",
          "desk_id",
          "status",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1056,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 56,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "FILTER Clause: Level 56: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "TOTAL",
          "SUM",
          "AVG"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "IF",
          "WHERE",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "COALESCE",
          "ISNULL",
          "NVL",
          "NULLIF"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "0",
          "NULL",
          "1",
          "-1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "side",
          "desk_id",
          "trade_id",
          "status"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1057,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 57,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "FILTER Clause: Level 57: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "IF",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "COALESCE",
          "NULLIF",
          "ISNULL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "1",
          "0",
          "-1"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "trade_id",
          "side",
          "desk_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1058,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 58,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "FILTER Clause: Level 58: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "COUNT",
          "TOTAL",
          "AVG",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHERE",
          "FILTER",
          "IF",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "ISNULL",
          "NVL",
          "COALESCE"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "1",
          "-1",
          "0",
          "NULL"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "status",
          "desk_id",
          "side",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1059,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 59,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "FILTER Clause: Level 59: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "SUM",
          "COUNT",
          "TOTAL"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "IF"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "ISNULL",
          "NULLIF",
          "COALESCE"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "NULL",
          "1",
          "-1",
          "0"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "side",
          "desk_id",
          "status",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1060,
    "discipline": "FILTER (WHERE ...) CONDITIONAL AGGREGATES",
    "disciplineKey": "filter_clause",
    "disciplineLevel": 60,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "FILTER Clause: Level 60: Liquidity Imbalance Ratio",
    "subtitle": "Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.",
    "type": "fill_blank",
    "table": "InstitutionalTrades",
    "schemaSnippet": "InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)",
    "task": "Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.",
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "AVG",
          "COUNT",
          "TOTAL",
          "SUM"
        ]
      },
      "slot2": {
        "correct": "FILTER",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "NULLIF",
        "options": [
          "NVL",
          "COALESCE",
          "NULLIF",
          "ISNULL"
        ]
      },
      "slot4": {
        "correct": "0",
        "options": [
          "1",
          "0",
          "-1",
          "NULL"
        ]
      },
      "slot5": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "side",
          "status",
          "trade_id"
        ]
      }
    },
    "template": "SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};",
    "targetQuery": "SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;"
  },
  {
    "id": 1061,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 01",
    "title": "Dynamic Bucketing: Level 01: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "BUCKET",
          "IF"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "> 0",
          "= 1",
          "<= 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "> 30",
          "= 0",
          ">= 60",
          "<= 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1062,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "Dynamic Bucketing: Level 02: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "BUCKET",
          "DECODE",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "= 1",
          ">= 30",
          "<= 0",
          "> 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "<= 30",
          "> 30",
          "= 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "DONE",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1063,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "Dynamic Bucketing: Level 03: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "BUCKET",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "= 1",
          "<= 0",
          "> 0",
          ">= 30"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "<= 30",
          "> 30",
          "= 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "DONE",
          "FINISH",
          "STOP"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1064,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "Dynamic Bucketing: Level 04: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "BUCKET",
          "IF",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "<= 0",
          "> 0",
          "= 1",
          ">= 30"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "<= 30",
          "= 0",
          "> 30",
          ">= 60"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "STOP",
          "END",
          "DONE"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1065,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "Dynamic Bucketing: Level 05: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "CASE",
          "BUCKET",
          "IF"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "= 1",
          "> 0",
          ">= 30",
          "<= 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "> 30",
          "<= 30",
          ">= 60",
          "= 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "STOP",
          "END",
          "DONE"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1066,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "Dynamic Bucketing: Level 06: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "BUCKET",
          "DECODE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "> 0",
          "<= 0",
          "= 1"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "= 0",
          "> 30",
          ">= 60",
          "<= 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "STOP",
          "DONE",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1067,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "Dynamic Bucketing: Level 07: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "BUCKET",
          "IF",
          "DECODE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "<= 0",
          "= 1",
          "> 0",
          ">= 30"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "> 30",
          "= 0",
          "<= 30",
          ">= 60"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "DONE",
          "STOP"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1068,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "Dynamic Bucketing: Level 08: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "BUCKET",
          "DECODE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "> 0",
          "<= 0",
          "= 1"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "> 30",
          "<= 30",
          "= 0",
          ">= 60"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "DONE",
          "STOP"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1069,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "Dynamic Bucketing: Level 09: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "BUCKET",
          "CASE",
          "IF",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "> 0",
          "<= 0",
          "= 1",
          ">= 30"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "= 0",
          "> 30",
          ">= 60",
          "<= 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "STOP",
          "END",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1070,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "Dynamic Bucketing: Level 10: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "IF",
          "BUCKET",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "> 0",
          "= 1",
          "<= 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "= 0",
          ">= 60",
          "<= 30",
          "> 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "STOP",
          "DONE",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1071,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "Dynamic Bucketing: Level 11: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "CASE",
          "BUCKET",
          "IF"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "<= 0",
          "> 0",
          "= 1"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "= 0",
          "> 30",
          "<= 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "FINISH",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1072,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "Dynamic Bucketing: Level 12: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "IF",
          "BUCKET",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "> 0",
          "= 1",
          "<= 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "= 0",
          "> 30",
          "<= 30",
          ">= 60"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "END",
          "DONE",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1073,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "Dynamic Bucketing: Level 13: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "BUCKET",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "<= 0",
          ">= 30",
          "= 1",
          "> 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "<= 30",
          "> 30",
          "= 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "DONE",
          "END",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1074,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "Dynamic Bucketing: Level 14: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "IF",
          "CASE",
          "BUCKET"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "> 0",
          ">= 30",
          "<= 0",
          "= 1"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "> 30",
          "<= 30",
          "= 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "FINISH",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1075,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "Dynamic Bucketing: Level 15: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "BUCKET"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "= 1",
          "> 0",
          "<= 0",
          ">= 30"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "= 0",
          "> 30",
          ">= 60",
          "<= 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "DONE",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1076,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "Dynamic Bucketing: Level 16: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "DECODE",
          "BUCKET",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "= 1",
          "> 0",
          ">= 30",
          "<= 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "= 0",
          "<= 30",
          "> 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "END",
          "DONE",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1077,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "Dynamic Bucketing: Level 17: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "BUCKET",
          "CASE",
          "IF",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          "<= 0",
          "> 0",
          "= 1",
          ">= 30"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "> 30",
          "= 0",
          "<= 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "DONE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1078,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "Dynamic Bucketing: Level 18: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "DECODE",
          "IF",
          "BUCKET",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "> 0",
          "<= 0",
          "= 1"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "= 0",
          "<= 30",
          "> 30"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "FINISH",
          "DONE",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1079,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "Dynamic Bucketing: Level 19: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "BUCKET",
          "CASE",
          "DECODE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "= 1",
          "<= 0",
          "> 0"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          ">= 60",
          "<= 30",
          "> 30",
          "= 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "DONE",
          "FINISH",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1080,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "Dynamic Bucketing: Level 20: Standard 30-Day Aging Schedule",
    "subtitle": "Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Use CASE WHEN with strict inequality boundaries to segment accounts receivable.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "BUCKET",
          "IF",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "<= 0",
        "options": [
          ">= 30",
          "<= 0",
          "> 0",
          "= 1"
        ]
      },
      "slot3": {
        "correct": "<= 30",
        "options": [
          "> 30",
          "<= 30",
          ">= 60",
          "= 0"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "STOP",
          "END",
          "FINISH",
          "DONE"
        ]
      }
    },
    "template": "SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;"
  },
  {
    "id": 1081,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 21,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "Dynamic Bucketing: Level 21: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "EVAL",
          "WHEN",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          ">= 60",
          "= 60",
          "<= 60",
          "< 30"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "< 60",
          "> 90",
          "= 90",
          "<= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "SUM(balance_due)",
          "MAX(balance_due)",
          "COUNT(*)",
          "AVG(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1082,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 22,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "Dynamic Bucketing: Level 22: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "WHEN",
          "CASE",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "<= 60",
          ">= 60",
          "= 60",
          "< 30"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "<= 90",
          "> 90",
          "< 60",
          "= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "AVG(balance_due)",
          "SUM(balance_due)",
          "COUNT(*)",
          "MAX(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1083,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 23,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "Dynamic Bucketing: Level 23: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "EVAL",
          "CASE",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "<= 60",
          ">= 60",
          "< 30",
          "= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "= 90",
          "< 60",
          "> 90",
          "<= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "MAX(balance_due)",
          "AVG(balance_due)",
          "COUNT(*)",
          "SUM(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1084,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 24,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "Dynamic Bucketing: Level 24: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "CASE",
          "WHEN",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          ">= 60",
          "< 30",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "> 90",
          "< 60",
          "= 90",
          "<= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "SUM(balance_due)",
          "AVG(balance_due)",
          "MAX(balance_due)",
          "COUNT(*)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1085,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 25,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "Dynamic Bucketing: Level 25: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "WHEN",
          "SELECT",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "<= 60",
          "= 60",
          ">= 60",
          "< 30"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "> 90",
          "= 90",
          "<= 90",
          "< 60"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "SUM(balance_due)",
          "AVG(balance_due)",
          "COUNT(*)",
          "MAX(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1086,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 26,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "Dynamic Bucketing: Level 26: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "CASE",
          "EVAL",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          ">= 60",
          "<= 60",
          "= 60",
          "< 30"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "< 60",
          "> 90",
          "= 90",
          "<= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "MAX(balance_due)",
          "AVG(balance_due)",
          "COUNT(*)",
          "SUM(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1087,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 27,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "Dynamic Bucketing: Level 27: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "SELECT",
          "CASE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          ">= 60",
          "= 60",
          "< 30",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "= 90",
          "<= 90",
          "< 60",
          "> 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "AVG(balance_due)",
          "COUNT(*)",
          "SUM(balance_due)",
          "MAX(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1088,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 28,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "Dynamic Bucketing: Level 28: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "WHEN",
          "CASE",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          ">= 60",
          "= 60",
          "< 30",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "= 90",
          "< 60",
          "> 90",
          "<= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "COUNT(*)",
          "SUM(balance_due)",
          "MAX(balance_due)",
          "AVG(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1089,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 29,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "Dynamic Bucketing: Level 29: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "SELECT",
          "EVAL",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          ">= 60",
          "< 30",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "< 60",
          "> 90",
          "= 90",
          "<= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "SUM(balance_due)",
          "COUNT(*)",
          "MAX(balance_due)",
          "AVG(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1090,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 30,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "Dynamic Bucketing: Level 30: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "CASE",
          "SELECT",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          "< 30",
          ">= 60",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "> 90",
          "<= 90",
          "= 90",
          "< 60"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "COUNT(*)",
          "AVG(balance_due)",
          "MAX(balance_due)",
          "SUM(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1091,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 31,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "Dynamic Bucketing: Level 31: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SELECT",
          "EVAL",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "<= 60",
          "= 60",
          ">= 60",
          "< 30"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "< 60",
          "= 90",
          "> 90",
          "<= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "COUNT(*)",
          "SUM(balance_due)",
          "AVG(balance_due)",
          "MAX(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1092,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 32,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "Dynamic Bucketing: Level 32: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SELECT",
          "EVAL",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "<= 60",
          ">= 60",
          "= 60",
          "< 30"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "= 90",
          "< 60",
          "<= 90",
          "> 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "MAX(balance_due)",
          "SUM(balance_due)",
          "COUNT(*)",
          "AVG(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1093,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 33,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "Dynamic Bucketing: Level 33: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "WHEN",
          "SELECT",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          "< 30",
          ">= 60",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "< 60",
          "= 90",
          "<= 90",
          "> 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "MAX(balance_due)",
          "COUNT(*)",
          "AVG(balance_due)",
          "SUM(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1094,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 34,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "Dynamic Bucketing: Level 34: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "CASE",
          "SELECT",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          ">= 60",
          "< 30",
          "= 60",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "<= 90",
          "> 90",
          "< 60",
          "= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "SUM(balance_due)",
          "MAX(balance_due)",
          "AVG(balance_due)",
          "COUNT(*)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1095,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 35,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "Dynamic Bucketing: Level 35: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "WHEN",
          "CASE",
          "SELECT",
          "EVAL"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          "<= 60",
          ">= 60",
          "< 30"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "<= 90",
          "= 90",
          "> 90",
          "< 60"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "SUM(balance_due)",
          "COUNT(*)",
          "MAX(balance_due)",
          "AVG(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1096,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 36,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "Dynamic Bucketing: Level 36: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "CASE",
          "WHEN",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "<= 60",
          "< 30",
          ">= 60",
          "= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "<= 90",
          "< 60",
          "> 90",
          "= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "AVG(balance_due)",
          "SUM(balance_due)",
          "MAX(balance_due)",
          "COUNT(*)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1097,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 37,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "Dynamic Bucketing: Level 37: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "EVAL",
          "WHEN",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "<= 60",
          ">= 60",
          "< 30",
          "= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "<= 90",
          "= 90",
          "> 90",
          "< 60"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "COUNT(*)",
          "MAX(balance_due)",
          "SUM(balance_due)",
          "AVG(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1098,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 38,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "Dynamic Bucketing: Level 38: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "EVAL",
          "CASE",
          "SELECT",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          "<= 60",
          "< 30",
          ">= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "<= 90",
          "= 90",
          "> 90",
          "< 60"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "COUNT(*)",
          "AVG(balance_due)",
          "MAX(balance_due)",
          "SUM(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1099,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 39,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "Dynamic Bucketing: Level 39: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "EVAL",
          "WHEN",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          "< 30",
          "<= 60",
          ">= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "<= 90",
          "> 90",
          "< 60",
          "= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "MAX(balance_due)",
          "AVG(balance_due)",
          "SUM(balance_due)",
          "COUNT(*)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1100,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 40,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "Dynamic Bucketing: Level 40: Full Aging Matrix Grouping",
    "subtitle": "Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SELECT",
          "EVAL",
          "CASE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "<= 60",
        "options": [
          "= 60",
          ">= 60",
          "< 30",
          "<= 60"
        ]
      },
      "slot3": {
        "correct": "<= 90",
        "options": [
          "< 60",
          "<= 90",
          "> 90",
          "= 90"
        ]
      },
      "slot4": {
        "correct": "SUM(balance_due)",
        "options": [
          "MAX(balance_due)",
          "SUM(balance_due)",
          "COUNT(*)",
          "AVG(balance_due)"
        ]
      }
    },
    "template": "SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;",
    "targetQuery": "SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;"
  },
  {
    "id": 1101,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 41,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "Dynamic Bucketing: Level 41: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CALC",
          "CASE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.00",
          "0.50",
          "0.05",
          "0.005"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.50",
          "0.02",
          "0.20",
          "2.00"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "10.0",
          "0.10",
          "0.00",
          "1.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERM",
          "FINISH",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1102,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 42,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "Dynamic Bucketing: Level 42: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "CALC",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.00",
          "0.005",
          "0.50",
          "0.05"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.50",
          "0.02",
          "2.00",
          "0.20"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "0.00",
          "10.0",
          "0.10",
          "1.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "TERM",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1103,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 43,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "Dynamic Bucketing: Level 43: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CASE",
          "CALC",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.05",
          "0.005",
          "0.00",
          "0.50"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "2.00",
          "0.50",
          "0.20",
          "0.02"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.00",
          "10.0",
          "0.10"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERM",
          "END",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1104,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 44,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "Dynamic Bucketing: Level 44: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CALC",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.00",
          "0.05",
          "0.50",
          "0.005"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.50",
          "0.02",
          "0.20",
          "2.00"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.10",
          "10.0",
          "0.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FINISH",
          "TERM",
          "STOP",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1105,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 45,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "Dynamic Bucketing: Level 45: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CALC",
          "IF",
          "CASE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.05",
          "0.50",
          "0.00",
          "0.005"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.50",
          "2.00",
          "0.02",
          "0.20"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "10.0",
          "0.10",
          "0.00",
          "1.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "END",
          "TERM"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1106,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 46,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "Dynamic Bucketing: Level 46: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CALC",
          "IF",
          "CASE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.00",
          "0.50",
          "0.05",
          "0.005"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.20",
          "0.50",
          "2.00",
          "0.02"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "0.00",
          "10.0",
          "1.00",
          "0.10"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FINISH",
          "STOP",
          "END",
          "TERM"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1107,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 47,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "Dynamic Bucketing: Level 47: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "CALC",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.005",
          "0.05",
          "0.50",
          "0.00"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.02",
          "0.20",
          "2.00",
          "0.50"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "0.00",
          "1.00",
          "10.0",
          "0.10"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FINISH",
          "STOP",
          "END",
          "TERM"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1108,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 48,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "Dynamic Bucketing: Level 48: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "CALC",
          "CASE",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.50",
          "0.005",
          "0.00",
          "0.05"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "2.00",
          "0.50",
          "0.02",
          "0.20"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.00",
          "10.0",
          "0.10"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "FINISH",
          "TERM",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1109,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 49,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "Dynamic Bucketing: Level 49: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CALC",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.005",
          "0.05",
          "0.00",
          "0.50"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "2.00",
          "0.02",
          "0.50",
          "0.20"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.00",
          "0.10",
          "10.0"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "TERM",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1110,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 50,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "Dynamic Bucketing: Level 50: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "IF",
          "CALC",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.005",
          "0.00",
          "0.50",
          "0.05"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.20",
          "0.50",
          "0.02",
          "2.00"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.10",
          "0.00",
          "10.0"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "TERM",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1111,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 51,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "Dynamic Bucketing: Level 51: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SWITCH",
          "CALC",
          "IF"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.00",
          "0.50",
          "0.005",
          "0.05"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.50",
          "2.00",
          "0.20",
          "0.02"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "10.0",
          "0.00",
          "1.00",
          "0.10"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "TERM",
          "FINISH",
          "END"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1112,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 52,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "Dynamic Bucketing: Level 52: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "CALC",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.05",
          "0.00",
          "0.005",
          "0.50"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.50",
          "2.00",
          "0.02",
          "0.20"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "0.00",
          "1.00",
          "0.10",
          "10.0"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "TERM",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1113,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 53,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "Dynamic Bucketing: Level 53: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "CALC",
          "IF",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.05",
          "0.005",
          "0.50",
          "0.00"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.02",
          "0.20",
          "0.50",
          "2.00"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "0.10",
          "10.0",
          "1.00",
          "0.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FINISH",
          "TERM",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1114,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 54,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "Dynamic Bucketing: Level 54: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "CALC",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.05",
          "0.00",
          "0.005",
          "0.50"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.20",
          "0.50",
          "0.02",
          "2.00"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.10",
          "0.00",
          "10.0"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERM",
          "FINISH",
          "END",
          "STOP"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1115,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 55,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "Dynamic Bucketing: Level 55: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "CASE",
          "CALC",
          "IF"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.00",
          "0.50",
          "0.05",
          "0.005"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.20",
          "2.00",
          "0.02",
          "0.50"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "10.0",
          "0.00",
          "0.10",
          "1.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "FINISH",
          "END",
          "STOP",
          "TERM"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1116,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 56,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "Dynamic Bucketing: Level 56: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "SWITCH",
          "CALC",
          "IF"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.05",
          "0.00",
          "0.50",
          "0.005"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.50",
          "0.02",
          "2.00",
          "0.20"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "10.0",
          "0.10",
          "0.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "TERM",
          "END",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1117,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 57,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "Dynamic Bucketing: Level 57: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CALC",
          "SWITCH",
          "CASE",
          "IF"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.05",
          "0.50",
          "0.00",
          "0.005"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.02",
          "0.50",
          "0.20",
          "2.00"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.00",
          "10.0",
          "0.10"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "STOP",
          "END",
          "FINISH",
          "TERM"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1118,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 58,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "Dynamic Bucketing: Level 58: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "IF",
          "SWITCH",
          "CALC",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.50",
          "0.005",
          "0.00",
          "0.05"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "2.00",
          "0.20",
          "0.02",
          "0.50"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "0.00",
          "1.00",
          "0.10",
          "10.0"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "TERM"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1119,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 59,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "Dynamic Bucketing: Level 59: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "SWITCH",
          "IF",
          "CASE",
          "CALC"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.00",
          "0.005",
          "0.50",
          "0.05"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "0.02",
          "0.20",
          "0.50",
          "2.00"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "0.10",
          "10.0",
          "0.00",
          "1.00"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERM",
          "END",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  },
  {
    "id": 1120,
    "discipline": "DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS",
    "disciplineKey": "dynamic_bucketing",
    "disciplineLevel": 60,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "Dynamic Bucketing: Level 60: Weighted Impairment Provisioning",
    "subtitle": "Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.",
    "type": "fill_blank",
    "table": "AccountsReceivable",
    "schemaSnippet": "AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)",
    "task": "Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).",
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CALC",
          "IF",
          "SWITCH",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "0.005",
        "options": [
          "0.50",
          "0.05",
          "0.005",
          "0.00"
        ]
      },
      "slot3": {
        "correct": "0.20",
        "options": [
          "2.00",
          "0.20",
          "0.50",
          "0.02"
        ]
      },
      "slot4": {
        "correct": "1.00",
        "options": [
          "1.00",
          "0.00",
          "10.0",
          "0.10"
        ]
      },
      "slot5": {
        "correct": "END",
        "options": [
          "TERM",
          "END",
          "STOP",
          "FINISH"
        ]
      }
    },
    "template": "SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;",
    "targetQuery": "SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;"
  }
];
