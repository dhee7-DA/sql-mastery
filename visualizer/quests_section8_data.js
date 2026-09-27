// =============================================================================
// SECTION 08: CONDITIONAL LOGIC & DATA PIVOTING ARENA (100 INTERACTIVE QUESTS)
// 5 Disciplines x 20 Levels (Searched CASE, Matrix Pivoting, COALESCE/NULLIF, Flags, Unpivots)
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
    "scenarios": "Wealth tier segmentation (Ultra High Net Worth vs Mass Market); Credit default risk bands (AAA to CCC); Order delivery SLA categorization.",
    "traps": "ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "key": "matrix_pivoting",
    "name": "ROW-TO-COLUMN MATRIX PIVOTING",
    "symbol": "📊",
    "color": "#10b981",
    "concept": "Conditional Aggregation Folding",
    "whenToUse": "When transforming transaction event logs into wide, executive-ready financial statement columns (e.g. Q1, Q2, Q3, Q4 revenue columns).",
    "scenarios": "Quarterly financial earnings tables; Departmental monthly budget variance columns; Regional asset allocation cross-tabs.",
    "traps": "FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "key": "null_sanitization",
    "name": "DATA SANITIZATION (COALESCE & NULLIF)",
    "symbol": "🛡️",
    "color": "#f59e0b",
    "concept": "Defensive Value Fallbacks & Zero-Shielding",
    "whenToUse": "When providing fallback default values or protecting formulas from catastrophic runtime crashes (e.g. Division by Zero).",
    "scenarios": "Division by zero shield in Profit Margin calculation (amount / NULLIF(units, 0)); Cascading contact hierarchy (COALESCE(work_email, personal_email, phone)); Empty string trimming to NULL.",
    "traps": "DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "key": "multi_conditional",
    "name": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "symbol": "🚩",
    "color": "#ec4899",
    "concept": "Multi-Variate Matrix Logic",
    "whenToUse": "When decision logic requires combinations of AND/OR clauses, thresholds across multiple columns, and nested priority scoring.",
    "scenarios": "AML (Anti-Money Laundering) high-risk account detection (Volume > $100k AND Country in High-Risk List); Tiered brokerage commission fee schedules; VIP churn flight risk tagging.",
    "traps": "DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "key": "matrix_unpivoting",
    "name": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "symbol": "🔄",
    "color": "#a855f7",
    "concept": "Column-to-Row Normalization",
    "whenToUse": "When taking wide legacy spreadsheet exports (with columns for Jan, Feb, Mar) and unpivoting them into tidy relational rows for dimensional modeling.",
    "scenarios": "Unpivoting legacy accounting sheets with quarterly revenue columns into tidy time-series rows; Normalizing multi-attribute survey responses; Preparing wide metrics for BI dashboard ingestion.",
    "traps": "DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
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
    "title": "Searched CASE: Level 01: Tiered Classification",
    "subtitle": "Classify FinancialAccounts into status tiers based on balance_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 30,
    "table": "FinancialAccounts",
    "scenario": "Classify FinancialAccounts into status tiers based on balance_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT account_id, balance_usd,\n  CASE\n    WHEN balance_usd >= 100000 THEN 'HIGH'\n    WHEN balance_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id, balance_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN balance_usd >= 100000 THEN 'HIGH'\n    WHEN balance_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 702,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 02",
    "title": "Searched CASE: Level 02: Tiered Classification",
    "subtitle": "Classify CorporateSales into status tiers based on revenue_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 30,
    "table": "CorporateSales",
    "scenario": "Classify CorporateSales into status tiers based on revenue_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, revenue_usd DECIMAL, sale_date DATE)",
    "targetQuery": "SELECT sale_id, revenue_usd,\n  CASE\n    WHEN revenue_usd >= 100000 THEN 'HIGH'\n    WHEN revenue_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id, revenue_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN revenue_usd >= 100000 THEN 'HIGH'\n    WHEN revenue_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 703,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 03",
    "title": "Searched CASE: Level 03: Tiered Classification",
    "subtitle": "Classify ClientTransactions into status tiers based on txn_amount.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 31,
    "table": "ClientTransactions",
    "scenario": "Classify ClientTransactions into status tiers based on txn_amount.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, txn_amount DECIMAL, posted_at DATE)",
    "targetQuery": "SELECT txn_id, txn_amount,\n  CASE\n    WHEN txn_amount >= 100000 THEN 'HIGH'\n    WHEN txn_amount >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id, txn_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN txn_amount >= 100000 THEN 'HIGH'\n    WHEN txn_amount >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 704,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 04",
    "title": "Searched CASE: Level 04: Tiered Classification",
    "subtitle": "Classify LoanApplications into status tiers based on credit_score.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 31,
    "table": "LoanApplications",
    "scenario": "Classify LoanApplications into status tiers based on credit_score.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, credit_score DECIMAL, submitted_at DATE)",
    "targetQuery": "SELECT loan_id, credit_score,\n  CASE\n    WHEN credit_score >= 100000 THEN 'HIGH'\n    WHEN credit_score >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id, credit_score,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN credit_score >= 100000 THEN 'HIGH'\n    WHEN credit_score >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 705,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 05",
    "title": "Searched CASE: Level 05: Tiered Classification",
    "subtitle": "Classify DeskPositions into status tiers based on market_value.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 32,
    "table": "DeskPositions",
    "scenario": "Classify DeskPositions into status tiers based on market_value.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, as_of_date DATE)",
    "targetQuery": "SELECT position_id, market_value,\n  CASE\n    WHEN market_value >= 100000 THEN 'HIGH'\n    WHEN market_value >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM DeskPositions;",
    "template": [
      {
        "text": "SELECT position_id, market_value,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN market_value >= 100000 THEN 'HIGH'\n    WHEN market_value >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 706,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 06",
    "title": "Searched CASE: Level 06: Tiered Classification",
    "subtitle": "Classify CustomerOrders into status tiers based on order_total.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 32,
    "table": "CustomerOrders",
    "scenario": "Classify CustomerOrders into status tiers based on order_total.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, order_total DECIMAL, order_date DATE)",
    "targetQuery": "SELECT order_id, order_total,\n  CASE\n    WHEN order_total >= 100000 THEN 'HIGH'\n    WHEN order_total >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_total,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN order_total >= 100000 THEN 'HIGH'\n    WHEN order_total >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 707,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 07",
    "title": "Searched CASE: Level 07: Tiered Classification",
    "subtitle": "Classify DepartmentBudgets into status tiers based on allocated_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 32,
    "table": "DepartmentBudgets",
    "scenario": "Classify DepartmentBudgets into status tiers based on allocated_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, fiscal_year DATE)",
    "targetQuery": "SELECT budget_id, allocated_usd,\n  CASE\n    WHEN allocated_usd >= 100000 THEN 'HIGH'\n    WHEN allocated_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT budget_id, allocated_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN allocated_usd >= 100000 THEN 'HIGH'\n    WHEN allocated_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 708,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 08",
    "title": "Searched CASE: Level 08: Tiered Classification",
    "subtitle": "Classify TradeExecutions into status tiers based on execution_price.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 33,
    "table": "TradeExecutions",
    "scenario": "Classify TradeExecutions into status tiers based on execution_price.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, execution_price DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT trade_id, execution_price,\n  CASE\n    WHEN execution_price >= 100000 THEN 'HIGH'\n    WHEN execution_price >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT trade_id, execution_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN execution_price >= 100000 THEN 'HIGH'\n    WHEN execution_price >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 709,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 09",
    "title": "Searched CASE: Level 09: Tiered Classification",
    "subtitle": "Classify FinancialAccounts into status tiers based on balance_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 33,
    "table": "FinancialAccounts",
    "scenario": "Classify FinancialAccounts into status tiers based on balance_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT account_id, balance_usd,\n  CASE\n    WHEN balance_usd >= 100000 THEN 'HIGH'\n    WHEN balance_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id, balance_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN balance_usd >= 100000 THEN 'HIGH'\n    WHEN balance_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 710,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 10",
    "title": "Searched CASE: Level 10: Tiered Classification",
    "subtitle": "Classify CorporateSales into status tiers based on revenue_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 34,
    "table": "CorporateSales",
    "scenario": "Classify CorporateSales into status tiers based on revenue_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, revenue_usd DECIMAL, sale_date DATE)",
    "targetQuery": "SELECT sale_id, revenue_usd,\n  CASE\n    WHEN revenue_usd >= 100000 THEN 'HIGH'\n    WHEN revenue_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id, revenue_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN revenue_usd >= 100000 THEN 'HIGH'\n    WHEN revenue_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 711,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 11",
    "title": "Searched CASE: Level 11: Tiered Classification",
    "subtitle": "Classify ClientTransactions into status tiers based on txn_amount.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 34,
    "table": "ClientTransactions",
    "scenario": "Classify ClientTransactions into status tiers based on txn_amount.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, txn_amount DECIMAL, posted_at DATE)",
    "targetQuery": "SELECT txn_id, txn_amount,\n  CASE\n    WHEN txn_amount >= 100000 THEN 'HIGH'\n    WHEN txn_amount >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id, txn_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN txn_amount >= 100000 THEN 'HIGH'\n    WHEN txn_amount >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 712,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 12",
    "title": "Searched CASE: Level 12: Tiered Classification",
    "subtitle": "Classify LoanApplications into status tiers based on credit_score.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 34,
    "table": "LoanApplications",
    "scenario": "Classify LoanApplications into status tiers based on credit_score.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, credit_score DECIMAL, submitted_at DATE)",
    "targetQuery": "SELECT loan_id, credit_score,\n  CASE\n    WHEN credit_score >= 100000 THEN 'HIGH'\n    WHEN credit_score >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id, credit_score,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN credit_score >= 100000 THEN 'HIGH'\n    WHEN credit_score >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 713,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 13",
    "title": "Searched CASE: Level 13: Tiered Classification",
    "subtitle": "Classify DeskPositions into status tiers based on market_value.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 35,
    "table": "DeskPositions",
    "scenario": "Classify DeskPositions into status tiers based on market_value.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, as_of_date DATE)",
    "targetQuery": "SELECT position_id, market_value,\n  CASE\n    WHEN market_value >= 100000 THEN 'HIGH'\n    WHEN market_value >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM DeskPositions;",
    "template": [
      {
        "text": "SELECT position_id, market_value,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN market_value >= 100000 THEN 'HIGH'\n    WHEN market_value >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 714,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 14",
    "title": "Searched CASE: Level 14: Tiered Classification",
    "subtitle": "Classify CustomerOrders into status tiers based on order_total.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 35,
    "table": "CustomerOrders",
    "scenario": "Classify CustomerOrders into status tiers based on order_total.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, order_total DECIMAL, order_date DATE)",
    "targetQuery": "SELECT order_id, order_total,\n  CASE\n    WHEN order_total >= 100000 THEN 'HIGH'\n    WHEN order_total >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_total,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN order_total >= 100000 THEN 'HIGH'\n    WHEN order_total >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 715,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 15",
    "title": "Searched CASE: Level 15: Tiered Classification",
    "subtitle": "Classify DepartmentBudgets into status tiers based on allocated_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 36,
    "table": "DepartmentBudgets",
    "scenario": "Classify DepartmentBudgets into status tiers based on allocated_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, fiscal_year DATE)",
    "targetQuery": "SELECT budget_id, allocated_usd,\n  CASE\n    WHEN allocated_usd >= 100000 THEN 'HIGH'\n    WHEN allocated_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT budget_id, allocated_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN allocated_usd >= 100000 THEN 'HIGH'\n    WHEN allocated_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 716,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 16",
    "title": "Searched CASE: Level 16: Tiered Classification",
    "subtitle": "Classify TradeExecutions into status tiers based on execution_price.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 36,
    "table": "TradeExecutions",
    "scenario": "Classify TradeExecutions into status tiers based on execution_price.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, execution_price DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT trade_id, execution_price,\n  CASE\n    WHEN execution_price >= 100000 THEN 'HIGH'\n    WHEN execution_price >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT trade_id, execution_price,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN execution_price >= 100000 THEN 'HIGH'\n    WHEN execution_price >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 717,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 17",
    "title": "Searched CASE: Level 17: Tiered Classification",
    "subtitle": "Classify FinancialAccounts into status tiers based on balance_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 36,
    "table": "FinancialAccounts",
    "scenario": "Classify FinancialAccounts into status tiers based on balance_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT account_id, balance_usd,\n  CASE\n    WHEN balance_usd >= 100000 THEN 'HIGH'\n    WHEN balance_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id, balance_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN balance_usd >= 100000 THEN 'HIGH'\n    WHEN balance_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 718,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 18",
    "title": "Searched CASE: Level 18: Tiered Classification",
    "subtitle": "Classify CorporateSales into status tiers based on revenue_usd.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 37,
    "table": "CorporateSales",
    "scenario": "Classify CorporateSales into status tiers based on revenue_usd.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, revenue_usd DECIMAL, sale_date DATE)",
    "targetQuery": "SELECT sale_id, revenue_usd,\n  CASE\n    WHEN revenue_usd >= 100000 THEN 'HIGH'\n    WHEN revenue_usd >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id, revenue_usd,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN revenue_usd >= 100000 THEN 'HIGH'\n    WHEN revenue_usd >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 719,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 19",
    "title": "Searched CASE: Level 19: Tiered Classification",
    "subtitle": "Classify ClientTransactions into status tiers based on txn_amount.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 37,
    "table": "ClientTransactions",
    "scenario": "Classify ClientTransactions into status tiers based on txn_amount.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, txn_amount DECIMAL, posted_at DATE)",
    "targetQuery": "SELECT txn_id, txn_amount,\n  CASE\n    WHEN txn_amount >= 100000 THEN 'HIGH'\n    WHEN txn_amount >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id, txn_amount,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN txn_amount >= 100000 THEN 'HIGH'\n    WHEN txn_amount >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 720,
    "discipline": "SEARCHED & SIMPLE CASE EXPRESSIONS",
    "disciplineKey": "searched_case",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "PIVOT Lvl 20",
    "title": "Searched CASE: Level 20: Tiered Classification",
    "subtitle": "Classify LoanApplications into status tiers based on credit_score.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (SEARCHED & SIMPLE CASE EXPRESSIONS)",
    "subcluster": "SEARCHED & SIMPLE CASE EXPRESSIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "xp": 38,
    "table": "LoanApplications",
    "scenario": "Classify LoanApplications into status tiers based on credit_score.",
    "businessObjective": "Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, credit_score DECIMAL, submitted_at DATE)",
    "targetQuery": "SELECT loan_id, credit_score,\n  CASE\n    WHEN credit_score >= 100000 THEN 'HIGH'\n    WHEN credit_score >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id, credit_score,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": "\n    WHEN credit_score >= 100000 THEN 'HIGH'\n    WHEN credit_score >= 50000 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " 'MEDIUM'\n    ELSE 'STANDARD'\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS tier_label\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "IF",
          "SWITCH",
          "DECODE"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GOTO",
          "DO"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "DONE"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put \"WHEN balance > 10000\" before \"WHEN balance > 100000\", the higher tier is shadowed and never reached!"
  },
  {
    "id": 721,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 21",
    "title": "Matrix Pivoting: Level 01: Two-Column Cross-Tab",
    "subtitle": "Pivot market_value into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 38,
    "table": "DeskPositions",
    "scenario": "Pivot market_value into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT desk_id,\n  SUM(CASE WHEN market_value >= 50000 THEN market_value ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN market_value < 50000 THEN market_value ELSE 0 END) AS reg_val_sum\nFROM DeskPositions\nGROUP BY desk_id;",
    "template": [
      {
        "text": "SELECT desk_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN market_value >= 50000 THEN market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN market_value < 50000 THEN market_value ELSE 0 END) AS reg_val_sum\nFROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " desk_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 722,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 22",
    "title": "Matrix Pivoting: Level 02: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 38,
    "table": "CustomerOrders",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, quarter VARCHAR, order_total DECIMAL)",
    "targetQuery": "SELECT cust_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN order_total ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN order_total ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN order_total ELSE 0 END) AS q3_total\nFROM CustomerOrders\nGROUP BY cust_id;",
    "template": [
      {
        "text": "SELECT cust_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN order_total ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " order_total ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN order_total ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " cust_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 723,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 23",
    "title": "Matrix Pivoting: Level 03: Two-Column Cross-Tab",
    "subtitle": "Pivot allocated_usd into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 39,
    "table": "DepartmentBudgets",
    "scenario": "Pivot allocated_usd into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT dept_id,\n  SUM(CASE WHEN allocated_usd >= 50000 THEN allocated_usd ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN allocated_usd < 50000 THEN allocated_usd ELSE 0 END) AS reg_val_sum\nFROM DepartmentBudgets\nGROUP BY dept_id;",
    "template": [
      {
        "text": "SELECT dept_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN allocated_usd >= 50000 THEN allocated_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN allocated_usd < 50000 THEN allocated_usd ELSE 0 END) AS reg_val_sum\nFROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " dept_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 724,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 24",
    "title": "Matrix Pivoting: Level 04: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 39,
    "table": "TradeExecutions",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, quarter VARCHAR, execution_price DECIMAL)",
    "targetQuery": "SELECT broker_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN execution_price ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN execution_price ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN execution_price ELSE 0 END) AS q3_total\nFROM TradeExecutions\nGROUP BY broker_id;",
    "template": [
      {
        "text": "SELECT broker_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN execution_price ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " execution_price ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN execution_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " broker_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 725,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 25",
    "title": "Matrix Pivoting: Level 05: Two-Column Cross-Tab",
    "subtitle": "Pivot balance_usd into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 40,
    "table": "FinancialAccounts",
    "scenario": "Pivot balance_usd into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT portfolio_id,\n  SUM(CASE WHEN balance_usd >= 50000 THEN balance_usd ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN balance_usd < 50000 THEN balance_usd ELSE 0 END) AS reg_val_sum\nFROM FinancialAccounts\nGROUP BY portfolio_id;",
    "template": [
      {
        "text": "SELECT portfolio_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN balance_usd >= 50000 THEN balance_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN balance_usd < 50000 THEN balance_usd ELSE 0 END) AS reg_val_sum\nFROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " portfolio_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 726,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 26",
    "title": "Matrix Pivoting: Level 06: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 40,
    "table": "CorporateSales",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, quarter VARCHAR, revenue_usd DECIMAL)",
    "targetQuery": "SELECT sales_rep_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_total\nFROM CorporateSales\nGROUP BY sales_rep_id;",
    "template": [
      {
        "text": "SELECT sales_rep_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " revenue_usd ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN revenue_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " sales_rep_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 727,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 27",
    "title": "Matrix Pivoting: Level 07: Two-Column Cross-Tab",
    "subtitle": "Pivot txn_amount into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 40,
    "table": "ClientTransactions",
    "scenario": "Pivot txn_amount into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, txn_amount DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT client_id,\n  SUM(CASE WHEN txn_amount >= 50000 THEN txn_amount ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN txn_amount < 50000 THEN txn_amount ELSE 0 END) AS reg_val_sum\nFROM ClientTransactions\nGROUP BY client_id;",
    "template": [
      {
        "text": "SELECT client_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN txn_amount >= 50000 THEN txn_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN txn_amount < 50000 THEN txn_amount ELSE 0 END) AS reg_val_sum\nFROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 728,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 28",
    "title": "Matrix Pivoting: Level 08: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 41,
    "table": "LoanApplications",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, quarter VARCHAR, credit_score DECIMAL)",
    "targetQuery": "SELECT applicant_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN credit_score ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN credit_score ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN credit_score ELSE 0 END) AS q3_total\nFROM LoanApplications\nGROUP BY applicant_id;",
    "template": [
      {
        "text": "SELECT applicant_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN credit_score ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " credit_score ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN credit_score ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " applicant_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 729,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 29",
    "title": "Matrix Pivoting: Level 09: Two-Column Cross-Tab",
    "subtitle": "Pivot market_value into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 41,
    "table": "DeskPositions",
    "scenario": "Pivot market_value into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT desk_id,\n  SUM(CASE WHEN market_value >= 50000 THEN market_value ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN market_value < 50000 THEN market_value ELSE 0 END) AS reg_val_sum\nFROM DeskPositions\nGROUP BY desk_id;",
    "template": [
      {
        "text": "SELECT desk_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN market_value >= 50000 THEN market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN market_value < 50000 THEN market_value ELSE 0 END) AS reg_val_sum\nFROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " desk_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 730,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 30",
    "title": "Matrix Pivoting: Level 10: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 42,
    "table": "CustomerOrders",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, quarter VARCHAR, order_total DECIMAL)",
    "targetQuery": "SELECT cust_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN order_total ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN order_total ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN order_total ELSE 0 END) AS q3_total\nFROM CustomerOrders\nGROUP BY cust_id;",
    "template": [
      {
        "text": "SELECT cust_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN order_total ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " order_total ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN order_total ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " cust_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 731,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 31",
    "title": "Matrix Pivoting: Level 11: Two-Column Cross-Tab",
    "subtitle": "Pivot allocated_usd into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 42,
    "table": "DepartmentBudgets",
    "scenario": "Pivot allocated_usd into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT dept_id,\n  SUM(CASE WHEN allocated_usd >= 50000 THEN allocated_usd ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN allocated_usd < 50000 THEN allocated_usd ELSE 0 END) AS reg_val_sum\nFROM DepartmentBudgets\nGROUP BY dept_id;",
    "template": [
      {
        "text": "SELECT dept_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN allocated_usd >= 50000 THEN allocated_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN allocated_usd < 50000 THEN allocated_usd ELSE 0 END) AS reg_val_sum\nFROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " dept_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 732,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 32",
    "title": "Matrix Pivoting: Level 12: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 42,
    "table": "TradeExecutions",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, quarter VARCHAR, execution_price DECIMAL)",
    "targetQuery": "SELECT broker_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN execution_price ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN execution_price ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN execution_price ELSE 0 END) AS q3_total\nFROM TradeExecutions\nGROUP BY broker_id;",
    "template": [
      {
        "text": "SELECT broker_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN execution_price ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " execution_price ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN execution_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " broker_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 733,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 33",
    "title": "Matrix Pivoting: Level 13: Two-Column Cross-Tab",
    "subtitle": "Pivot balance_usd into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 43,
    "table": "FinancialAccounts",
    "scenario": "Pivot balance_usd into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT portfolio_id,\n  SUM(CASE WHEN balance_usd >= 50000 THEN balance_usd ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN balance_usd < 50000 THEN balance_usd ELSE 0 END) AS reg_val_sum\nFROM FinancialAccounts\nGROUP BY portfolio_id;",
    "template": [
      {
        "text": "SELECT portfolio_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN balance_usd >= 50000 THEN balance_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN balance_usd < 50000 THEN balance_usd ELSE 0 END) AS reg_val_sum\nFROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " portfolio_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 734,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 34",
    "title": "Matrix Pivoting: Level 14: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 43,
    "table": "CorporateSales",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, quarter VARCHAR, revenue_usd DECIMAL)",
    "targetQuery": "SELECT sales_rep_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_total\nFROM CorporateSales\nGROUP BY sales_rep_id;",
    "template": [
      {
        "text": "SELECT sales_rep_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " revenue_usd ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN revenue_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " sales_rep_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 735,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 35",
    "title": "Matrix Pivoting: Level 15: Two-Column Cross-Tab",
    "subtitle": "Pivot txn_amount into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 44,
    "table": "ClientTransactions",
    "scenario": "Pivot txn_amount into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, txn_amount DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT client_id,\n  SUM(CASE WHEN txn_amount >= 50000 THEN txn_amount ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN txn_amount < 50000 THEN txn_amount ELSE 0 END) AS reg_val_sum\nFROM ClientTransactions\nGROUP BY client_id;",
    "template": [
      {
        "text": "SELECT client_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN txn_amount >= 50000 THEN txn_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN txn_amount < 50000 THEN txn_amount ELSE 0 END) AS reg_val_sum\nFROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " client_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 736,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 36",
    "title": "Matrix Pivoting: Level 16: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 44,
    "table": "LoanApplications",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, quarter VARCHAR, credit_score DECIMAL)",
    "targetQuery": "SELECT applicant_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN credit_score ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN credit_score ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN credit_score ELSE 0 END) AS q3_total\nFROM LoanApplications\nGROUP BY applicant_id;",
    "template": [
      {
        "text": "SELECT applicant_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN credit_score ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " credit_score ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN credit_score ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " applicant_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 737,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 37",
    "title": "Matrix Pivoting: Level 17: Two-Column Cross-Tab",
    "subtitle": "Pivot market_value into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 44,
    "table": "DeskPositions",
    "scenario": "Pivot market_value into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT desk_id,\n  SUM(CASE WHEN market_value >= 50000 THEN market_value ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN market_value < 50000 THEN market_value ELSE 0 END) AS reg_val_sum\nFROM DeskPositions\nGROUP BY desk_id;",
    "template": [
      {
        "text": "SELECT desk_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN market_value >= 50000 THEN market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN market_value < 50000 THEN market_value ELSE 0 END) AS reg_val_sum\nFROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " desk_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 738,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 38",
    "title": "Matrix Pivoting: Level 18: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 45,
    "table": "CustomerOrders",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, quarter VARCHAR, order_total DECIMAL)",
    "targetQuery": "SELECT cust_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN order_total ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN order_total ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN order_total ELSE 0 END) AS q3_total\nFROM CustomerOrders\nGROUP BY cust_id;",
    "template": [
      {
        "text": "SELECT cust_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN order_total ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " order_total ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN order_total ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " cust_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 739,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 39",
    "title": "Matrix Pivoting: Level 19: Two-Column Cross-Tab",
    "subtitle": "Pivot allocated_usd into high and regular revenue columns using conditional aggregation.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "xp": 45,
    "table": "DepartmentBudgets",
    "scenario": "Pivot allocated_usd into high and regular revenue columns using conditional aggregation.",
    "businessObjective": "Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, status VARCHAR)",
    "targetQuery": "SELECT dept_id,\n  SUM(CASE WHEN allocated_usd >= 50000 THEN allocated_usd ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN allocated_usd < 50000 THEN allocated_usd ELSE 0 END) AS reg_val_sum\nFROM DepartmentBudgets\nGROUP BY dept_id;",
    "template": [
      {
        "text": "SELECT dept_id,\n  SUM(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE ]"
      },
      {
        "text": " WHEN allocated_usd >= 50000 THEN allocated_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ELSE 0 ]"
      },
      {
        "text": " END) AS high_val_sum,\n  SUM(CASE WHEN allocated_usd < 50000 THEN allocated_usd ELSE 0 END) AS reg_val_sum\nFROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " dept_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "PIVOT",
          "FILTER",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "ELSE 0",
        "options": [
          "ELSE 0",
          "ELSE NULL",
          "ELSE 1",
          "DEFAULT 0"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "COLLAPSE BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 740,
    "discipline": "ROW-TO-COLUMN MATRIX PIVOTING",
    "disciplineKey": "matrix_pivoting",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 40",
    "title": "Matrix Pivoting: Level 20: Quarterly Financial Matrix",
    "subtitle": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (ROW-TO-COLUMN MATRIX PIVOTING)",
    "subcluster": "ROW-TO-COLUMN MATRIX PIVOTING (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "xp": 46,
    "table": "TradeExecutions",
    "scenario": "Pivot event quarters into distinct Q1, Q2, Q3 financial columns.",
    "businessObjective": "Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, quarter VARCHAR, execution_price DECIMAL)",
    "targetQuery": "SELECT broker_id,\n  SUM(CASE WHEN quarter = 'Q1' THEN execution_price ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN execution_price ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN execution_price ELSE 0 END) AS q3_total\nFROM TradeExecutions\nGROUP BY broker_id;",
    "template": [
      {
        "text": "SELECT broker_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(CASE WHEN quarter = 'Q1' THEN execution_price ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN ]"
      },
      {
        "text": " execution_price ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN execution_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE 0 END ]"
      },
      {
        "text": ") AS q3_total\nFROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ GROUP BY ]"
      },
      {
        "text": " broker_id;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SUM",
        "options": [
          "SUM",
          "COUNT",
          "AVG",
          "COLLECT"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "VALUE",
          "RETURN"
        ]
      },
      "slot3": {
        "correct": "ELSE 0 END",
        "options": [
          "ELSE 0 END",
          "ELSE NULL END",
          "END",
          "DEFAULT 0"
        ]
      },
      "slot4": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "PIVOT BY",
          "ORDER BY"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr='Q1' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!"
  },
  {
    "id": 741,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 41",
    "title": "Data Sanitization: Level 01: Cascading Fallbacks",
    "subtitle": "Return the first non-null contact method from multiple nullable columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use COALESCE to prioritize primary contact channel with a safe literal fallback.",
    "xp": 46,
    "table": "FinancialAccounts",
    "scenario": "Return the first non-null contact method from multiple nullable columns.",
    "businessObjective": "Use COALESCE to prioritize primary contact channel with a safe literal fallback.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, direct_phone VARCHAR, email VARCHAR)",
    "targetQuery": "SELECT account_id,\n  COALESCE(direct_phone, email, 'UNREACHABLE') AS contact_channel\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": "(direct_phone, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK COL ]"
      },
      {
        "text": ", 'UNREACHABLE') AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "IFNULL",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "NULL",
          "direct_phone",
          "status"
        ]
      },
      "slot3": {
        "correct": "contact_channel",
        "options": [
          "contact_channel",
          "PHONE_FINAL",
          "DEFAULT",
          "OUTPUT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 742,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 42",
    "title": "Data Sanitization: Level 02: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 46,
    "table": "CorporateSales",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT sale_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 743,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 43",
    "title": "Data Sanitization: Level 03: Cascading Fallbacks",
    "subtitle": "Return the first non-null contact method from multiple nullable columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use COALESCE to prioritize primary contact channel with a safe literal fallback.",
    "xp": 47,
    "table": "ClientTransactions",
    "scenario": "Return the first non-null contact method from multiple nullable columns.",
    "businessObjective": "Use COALESCE to prioritize primary contact channel with a safe literal fallback.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, direct_phone VARCHAR, email VARCHAR)",
    "targetQuery": "SELECT txn_id,\n  COALESCE(direct_phone, email, 'UNREACHABLE') AS contact_channel\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": "(direct_phone, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK COL ]"
      },
      {
        "text": ", 'UNREACHABLE') AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "IFNULL",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "NULL",
          "direct_phone",
          "status"
        ]
      },
      "slot3": {
        "correct": "contact_channel",
        "options": [
          "contact_channel",
          "PHONE_FINAL",
          "DEFAULT",
          "OUTPUT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 744,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 44",
    "title": "Data Sanitization: Level 04: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 47,
    "table": "LoanApplications",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT loan_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 745,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 45",
    "title": "Data Sanitization: Level 05: Cascading Fallbacks",
    "subtitle": "Return the first non-null contact method from multiple nullable columns.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Use COALESCE to prioritize primary contact channel with a safe literal fallback.",
    "xp": 48,
    "table": "DeskPositions",
    "scenario": "Return the first non-null contact method from multiple nullable columns.",
    "businessObjective": "Use COALESCE to prioritize primary contact channel with a safe literal fallback.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, direct_phone VARCHAR, email VARCHAR)",
    "targetQuery": "SELECT position_id,\n  COALESCE(direct_phone, email, 'UNREACHABLE') AS contact_channel\nFROM DeskPositions;",
    "template": [
      {
        "text": "SELECT position_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FUNCTION ]"
      },
      {
        "text": "(direct_phone, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK COL ]"
      },
      {
        "text": ", 'UNREACHABLE') AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "IFNULL",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "NULL",
          "direct_phone",
          "status"
        ]
      },
      "slot3": {
        "correct": "contact_channel",
        "options": [
          "contact_channel",
          "PHONE_FINAL",
          "DEFAULT",
          "OUTPUT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 746,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 46",
    "title": "Data Sanitization: Level 06: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 48,
    "table": "CustomerOrders",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT order_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 747,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 47",
    "title": "Data Sanitization: Level 07: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 48,
    "table": "DepartmentBudgets",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT budget_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT budget_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 748,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 48",
    "title": "Data Sanitization: Level 08: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 49,
    "table": "TradeExecutions",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT trade_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT trade_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 749,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 49",
    "title": "Data Sanitization: Level 09: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 49,
    "table": "FinancialAccounts",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT account_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 750,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 50",
    "title": "Data Sanitization: Level 10: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 50,
    "table": "CorporateSales",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT sale_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 751,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 51",
    "title": "Data Sanitization: Level 11: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 50,
    "table": "ClientTransactions",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT txn_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 752,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 52",
    "title": "Data Sanitization: Level 12: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 50,
    "table": "LoanApplications",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT loan_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 753,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 53",
    "title": "Data Sanitization: Level 13: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 51,
    "table": "DeskPositions",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT position_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM DeskPositions;",
    "template": [
      {
        "text": "SELECT position_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 754,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 54",
    "title": "Data Sanitization: Level 14: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 51,
    "table": "CustomerOrders",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT order_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 755,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 55",
    "title": "Data Sanitization: Level 15: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 52,
    "table": "DepartmentBudgets",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT budget_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT budget_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 756,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 56",
    "title": "Data Sanitization: Level 16: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 52,
    "table": "TradeExecutions",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT trade_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT trade_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 757,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 57",
    "title": "Data Sanitization: Level 17: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 52,
    "table": "FinancialAccounts",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT account_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 758,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 58",
    "title": "Data Sanitization: Level 18: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 53,
    "table": "CorporateSales",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT sale_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 759,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 59",
    "title": "Data Sanitization: Level 19: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 53,
    "table": "ClientTransactions",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT txn_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 760,
    "discipline": "DATA SANITIZATION (COALESCE & NULLIF)",
    "disciplineKey": "null_sanitization",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 60",
    "title": "Data Sanitization: Level 20: Combined COALESCE & NULLIF",
    "subtitle": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (DATA SANITIZATION (COALESCE & NULLIF))",
    "subcluster": "DATA SANITIZATION (COALESCE & NULLIF) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "xp": 54,
    "table": "LoanApplications",
    "scenario": "Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.",
    "businessObjective": "Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, tax_identifier VARCHAR)",
    "targetQuery": "SELECT loan_id,\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id,\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OUTER FUNC ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ INNER FUNC ]"
      },
      {
        "text": "(TRIM(tax_identifier), ''), ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ DEFAULT LITERAL ]"
      },
      {
        "text": ") AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "COALESCE",
        "options": [
          "COALESCE",
          "NULLIF",
          "NVL2",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "NULLIF",
        "options": [
          "NULLIF",
          "COALESCE",
          "EMPTY_TO_NULL",
          "CLEAN"
        ]
      },
      "slot3": {
        "correct": "'PENDING_REGISTRATION'",
        "options": [
          "'PENDING_REGISTRATION'",
          "NULL",
          "0",
          "'EMPTY'"
        ]
      },
      "slot4": {
        "correct": "verified_tax_id",
        "options": [
          "verified_tax_id",
          "CLEAN_ID",
          "RESULT",
          "AUDIT"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback."
  },
  {
    "id": 761,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 61",
    "title": "Multi-Condition: Level 01: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 54,
    "table": "DeskPositions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT position_id,\n  CASE\n    WHEN is_institutional = TRUE AND market_value >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN market_value >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM DeskPositions;",
    "template": [
      {
        "text": "SELECT position_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND market_value >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN market_value >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 762,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 62",
    "title": "Multi-Condition: Level 02: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 54,
    "table": "CustomerOrders",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, order_total DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT order_id,\n  CASE\n    WHEN is_institutional = TRUE AND order_total >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN order_total >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND order_total >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN order_total >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 763,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 63",
    "title": "Multi-Condition: Level 03: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 55,
    "table": "DepartmentBudgets",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT budget_id,\n  CASE\n    WHEN is_institutional = TRUE AND allocated_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN allocated_usd >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT budget_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND allocated_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN allocated_usd >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 764,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 64",
    "title": "Multi-Condition: Level 04: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 55,
    "table": "TradeExecutions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, execution_price DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT trade_id,\n  CASE\n    WHEN is_institutional = TRUE AND execution_price >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN execution_price >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT trade_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND execution_price >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN execution_price >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 765,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 65",
    "title": "Multi-Condition: Level 05: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 56,
    "table": "FinancialAccounts",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT account_id,\n  CASE\n    WHEN is_institutional = TRUE AND balance_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN balance_usd >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND balance_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN balance_usd >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 766,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 66",
    "title": "Multi-Condition: Level 06: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 56,
    "table": "CorporateSales",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, revenue_usd DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT sale_id,\n  CASE\n    WHEN is_institutional = TRUE AND revenue_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN revenue_usd >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND revenue_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN revenue_usd >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 767,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 67",
    "title": "Multi-Condition: Level 07: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 56,
    "table": "ClientTransactions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, txn_amount DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT txn_id,\n  CASE\n    WHEN is_institutional = TRUE AND txn_amount >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN txn_amount >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND txn_amount >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN txn_amount >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 768,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 68",
    "title": "Multi-Condition: Level 08: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 57,
    "table": "LoanApplications",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, credit_score DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT loan_id,\n  CASE\n    WHEN is_institutional = TRUE AND credit_score >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN credit_score >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND credit_score >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN credit_score >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 769,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 69",
    "title": "Multi-Condition: Level 09: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 57,
    "table": "DeskPositions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT position_id,\n  CASE\n    WHEN is_institutional = TRUE AND market_value >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN market_value >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM DeskPositions;",
    "template": [
      {
        "text": "SELECT position_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND market_value >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN market_value >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 770,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 70",
    "title": "Multi-Condition: Level 10: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 58,
    "table": "CustomerOrders",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, order_total DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT order_id,\n  CASE\n    WHEN is_institutional = TRUE AND order_total >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN order_total >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND order_total >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN order_total >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 771,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 71",
    "title": "Multi-Condition: Level 11: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 58,
    "table": "DepartmentBudgets",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT budget_id,\n  CASE\n    WHEN is_institutional = TRUE AND allocated_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN allocated_usd >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT budget_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND allocated_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN allocated_usd >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 772,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 72",
    "title": "Multi-Condition: Level 12: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 58,
    "table": "TradeExecutions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, execution_price DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT trade_id,\n  CASE\n    WHEN is_institutional = TRUE AND execution_price >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN execution_price >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT trade_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND execution_price >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN execution_price >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 773,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 73",
    "title": "Multi-Condition: Level 13: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 59,
    "table": "FinancialAccounts",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT account_id,\n  CASE\n    WHEN is_institutional = TRUE AND balance_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN balance_usd >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT account_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND balance_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN balance_usd >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 774,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 74",
    "title": "Multi-Condition: Level 14: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 59,
    "table": "CorporateSales",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, revenue_usd DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT sale_id,\n  CASE\n    WHEN is_institutional = TRUE AND revenue_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN revenue_usd >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sale_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND revenue_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN revenue_usd >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 775,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "PIVOT Lvl 75",
    "title": "Multi-Condition: Level 15: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 60,
    "table": "ClientTransactions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, txn_amount DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT txn_id,\n  CASE\n    WHEN is_institutional = TRUE AND txn_amount >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN txn_amount >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT txn_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND txn_amount >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN txn_amount >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 776,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 76",
    "title": "Multi-Condition: Level 16: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 60,
    "table": "LoanApplications",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, credit_score DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT loan_id,\n  CASE\n    WHEN is_institutional = TRUE AND credit_score >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN credit_score >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM LoanApplications;",
    "template": [
      {
        "text": "SELECT loan_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND credit_score >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN credit_score >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 777,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 77",
    "title": "Multi-Condition: Level 17: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 60,
    "table": "DeskPositions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, market_value DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT position_id,\n  CASE\n    WHEN is_institutional = TRUE AND market_value >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN market_value >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM DeskPositions;",
    "template": [
      {
        "text": "SELECT position_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND market_value >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN market_value >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 778,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 78",
    "title": "Multi-Condition: Level 18: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 61,
    "table": "CustomerOrders",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, order_total DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT order_id,\n  CASE\n    WHEN is_institutional = TRUE AND order_total >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN order_total >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT order_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND order_total >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN order_total >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 779,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 79",
    "title": "Multi-Condition: Level 19: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 61,
    "table": "DepartmentBudgets",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, allocated_usd DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT budget_id,\n  CASE\n    WHEN is_institutional = TRUE AND allocated_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN allocated_usd >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT budget_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND allocated_usd >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN allocated_usd >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 780,
    "discipline": "COMPOUND CLASSIFICATIONS & RISK FLAGS",
    "disciplineKey": "multi_conditional",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 80",
    "title": "Multi-Condition: Level 20: Fee Exemption Matrix",
    "subtitle": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (COMPOUND CLASSIFICATIONS & RISK FLAGS)",
    "subcluster": "COMPOUND CLASSIFICATIONS & RISK FLAGS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "xp": 62,
    "table": "TradeExecutions",
    "scenario": "Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.",
    "businessObjective": "Build a comprehensive commission fee schedule with multiple criteria branches.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, execution_price DECIMAL, is_institutional BOOLEAN)",
    "targetQuery": "SELECT trade_id,\n  CASE\n    WHEN is_institutional = TRUE AND execution_price >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN execution_price >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT trade_id,\n  CASE\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WHEN 1 ]"
      },
      {
        "text": " is_institutional = TRUE AND execution_price >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ THEN 2 ]"
      },
      {
        "text": " 0.001\n    WHEN execution_price >= 100000 THEN 0.002\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ELSE ]"
      },
      {
        "text": " 0.005\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ END ]"
      },
      {
        "text": " AS fee_rate\nFROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHEN",
        "options": [
          "WHEN",
          "WHERE",
          "IF",
          "CHECK"
        ]
      },
      "slot2": {
        "correct": "THEN",
        "options": [
          "THEN",
          "IS",
          "GIVES",
          "RATE"
        ]
      },
      "slot3": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
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
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure."
  },
  {
    "id": 781,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 81",
    "title": "Matrix Unpivoting: Level 01: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 62,
    "table": "FinancialAccounts",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT portfolio_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT portfolio_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT portfolio_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT portfolio_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT portfolio_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 782,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 82",
    "title": "Matrix Unpivoting: Level 02: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 62,
    "table": "CorporateSales",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT sales_rep_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sales_rep_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 783,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 83",
    "title": "Matrix Unpivoting: Level 03: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 63,
    "table": "ClientTransactions",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT client_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT client_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT client_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT client_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT client_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 784,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 84",
    "title": "Matrix Unpivoting: Level 04: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 63,
    "table": "LoanApplications",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT applicant_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM LoanApplications;",
    "template": [
      {
        "text": "SELECT applicant_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT applicant_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT applicant_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT applicant_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 785,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 85",
    "title": "Matrix Unpivoting: Level 05: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 64,
    "table": "DeskPositions",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT desk_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DeskPositions\nUNION ALL\nSELECT desk_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DeskPositions\nUNION ALL\nSELECT desk_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DeskPositions\nUNION ALL\nSELECT desk_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM DeskPositions;",
    "template": [
      {
        "text": "SELECT desk_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT desk_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT desk_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT desk_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 786,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 86",
    "title": "Matrix Unpivoting: Level 06: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 64,
    "table": "CustomerOrders",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT cust_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CustomerOrders\nUNION ALL\nSELECT cust_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CustomerOrders\nUNION ALL\nSELECT cust_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CustomerOrders\nUNION ALL\nSELECT cust_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT cust_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT cust_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT cust_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT cust_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 787,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 87",
    "title": "Matrix Unpivoting: Level 07: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 64,
    "table": "DepartmentBudgets",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT dept_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DepartmentBudgets\nUNION ALL\nSELECT dept_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DepartmentBudgets\nUNION ALL\nSELECT dept_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DepartmentBudgets\nUNION ALL\nSELECT dept_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT dept_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT dept_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT dept_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT dept_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 788,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 88",
    "title": "Matrix Unpivoting: Level 08: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 65,
    "table": "TradeExecutions",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT broker_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM TradeExecutions\nUNION ALL\nSELECT broker_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM TradeExecutions\nUNION ALL\nSELECT broker_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM TradeExecutions\nUNION ALL\nSELECT broker_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT broker_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT broker_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT broker_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT broker_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 789,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 89",
    "title": "Matrix Unpivoting: Level 09: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 65,
    "table": "FinancialAccounts",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT portfolio_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT portfolio_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT portfolio_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT portfolio_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT portfolio_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 790,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 90",
    "title": "Matrix Unpivoting: Level 10: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 66,
    "table": "CorporateSales",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT sales_rep_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sales_rep_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 791,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 91",
    "title": "Matrix Unpivoting: Level 11: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 66,
    "table": "ClientTransactions",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT client_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT client_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT client_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT client_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT client_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 792,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 92",
    "title": "Matrix Unpivoting: Level 12: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 66,
    "table": "LoanApplications",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT applicant_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM LoanApplications;",
    "template": [
      {
        "text": "SELECT applicant_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT applicant_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT applicant_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT applicant_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 793,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 93",
    "title": "Matrix Unpivoting: Level 13: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 67,
    "table": "DeskPositions",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "DeskPositions(position_id INT, desk_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT desk_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DeskPositions\nUNION ALL\nSELECT desk_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DeskPositions\nUNION ALL\nSELECT desk_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DeskPositions\nUNION ALL\nSELECT desk_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM DeskPositions;",
    "template": [
      {
        "text": "SELECT desk_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT desk_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT desk_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DeskPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT desk_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM DeskPositions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 794,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 94",
    "title": "Matrix Unpivoting: Level 14: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 67,
    "table": "CustomerOrders",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "CustomerOrders(order_id INT, cust_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT cust_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CustomerOrders\nUNION ALL\nSELECT cust_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CustomerOrders\nUNION ALL\nSELECT cust_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CustomerOrders\nUNION ALL\nSELECT cust_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM CustomerOrders;",
    "template": [
      {
        "text": "SELECT cust_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT cust_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT cust_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CustomerOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT cust_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM CustomerOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 795,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 95",
    "title": "Matrix Unpivoting: Level 15: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 68,
    "table": "DepartmentBudgets",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "DepartmentBudgets(budget_id INT, dept_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT dept_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DepartmentBudgets\nUNION ALL\nSELECT dept_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DepartmentBudgets\nUNION ALL\nSELECT dept_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DepartmentBudgets\nUNION ALL\nSELECT dept_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM DepartmentBudgets;",
    "template": [
      {
        "text": "SELECT dept_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT dept_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT dept_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM DepartmentBudgets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT dept_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM DepartmentBudgets;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 796,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 96",
    "title": "Matrix Unpivoting: Level 16: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 68,
    "table": "TradeExecutions",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "TradeExecutions(trade_id INT, broker_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT broker_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM TradeExecutions\nUNION ALL\nSELECT broker_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM TradeExecutions\nUNION ALL\nSELECT broker_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM TradeExecutions\nUNION ALL\nSELECT broker_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM TradeExecutions;",
    "template": [
      {
        "text": "SELECT broker_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT broker_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT broker_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM TradeExecutions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT broker_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM TradeExecutions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 797,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 97",
    "title": "Matrix Unpivoting: Level 17: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 68,
    "table": "FinancialAccounts",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "FinancialAccounts(account_id INT, portfolio_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT portfolio_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM FinancialAccounts\nUNION ALL\nSELECT portfolio_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM FinancialAccounts;",
    "template": [
      {
        "text": "SELECT portfolio_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT portfolio_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT portfolio_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM FinancialAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT portfolio_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM FinancialAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 798,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 98",
    "title": "Matrix Unpivoting: Level 18: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 69,
    "table": "CorporateSales",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "CorporateSales(sale_id INT, sales_rep_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT sales_rep_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CorporateSales\nUNION ALL\nSELECT sales_rep_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM CorporateSales;",
    "template": [
      {
        "text": "SELECT sales_rep_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM CorporateSales\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT sales_rep_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM CorporateSales;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 799,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 99",
    "title": "Matrix Unpivoting: Level 19: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 69,
    "table": "ClientTransactions",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "ClientTransactions(txn_id INT, client_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT client_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ClientTransactions\nUNION ALL\nSELECT client_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM ClientTransactions;",
    "template": [
      {
        "text": "SELECT client_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT client_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT client_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ClientTransactions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT client_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM ClientTransactions;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  },
  {
    "id": 800,
    "discipline": "MATRIX UNPIVOTING & TIDY TRANSFORMATION",
    "disciplineKey": "matrix_unpivoting",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "PIVOT Lvl 100",
    "title": "Matrix Unpivoting: Level 20: Full Year Multi-Period Unpivot",
    "subtitle": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "type": "fill_blank",
    "category": "Section 08: Conditional Logic & Pivots (MATRIX UNPIVOTING & TIDY TRANSFORMATION)",
    "subcluster": "MATRIX UNPIVOTING & TIDY TRANSFORMATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "xp": 70,
    "table": "LoanApplications",
    "scenario": "Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.",
    "businessObjective": "Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.",
    "schemaSnippet": "LoanApplications(loan_id INT, applicant_id VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)",
    "targetQuery": "SELECT applicant_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM LoanApplications\nUNION ALL\nSELECT applicant_id, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM LoanApplications;",
    "template": [
      {
        "text": "SELECT applicant_id, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP 1 ]"
      },
      {
        "text": "\nSELECT applicant_id, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OP 2 ]"
      },
      {
        "text": "\nSELECT applicant_id, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM LoanApplications\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OP 3 ]"
      },
      {
        "text": "\nSELECT applicant_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SYNTHETIC Q4 ]"
      },
      {
        "text": ", q4_amt AS revenue FROM LoanApplications;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "COMBINE"
        ]
      },
      "slot3": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "STACK",
          "CONCAT"
        ]
      },
      "slot4": {
        "correct": "'Q4' AS fiscal_quarter",
        "options": [
          "'Q4' AS fiscal_quarter",
          "'Q4'",
          "fiscal_quarter",
          "quarter_4"
        ]
      }
    },
    "explanation": "Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!"
  }
];
