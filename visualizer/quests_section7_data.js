// =============================================================================
// SECTION 07: SUBQUERIES & CTES MASTER ARENA (100 INTERACTIVE QUESTS)
// 5 Disciplines x 20 Levels (Scalar, Correlated, EXISTS vs IN, Chained CTEs, Recursive)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.CTE_DISCIPLINES_METADATA = [
  {
    "key": "scalar_subqueries",
    "name": "SCALAR & PREDICATE SUBQUERIES",
    "symbol": "📌",
    "color": "#38bdf8",
    "concept": "Single-Value Encapsulation",
    "whenToUse": "When a query needs to compare records against an aggregate baseline (e.g. above-average revenue) or inject a single benchmark scalar into SELECT.",
    "scenarios": "Accounts exceeding portfolio mean balance; Trades executed at intraday peak price; Employees earning more than company-wide median.",
    "traps": "A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "key": "correlated_subqueries",
    "name": "CORRELATED SUBQUERIES",
    "symbol": "🔄",
    "color": "#10b981",
    "concept": "Row-Context Dependent Execution",
    "whenToUse": "When the inner subquery references columns from the outer query row-by-row (e.g. comparing an employee against their specific department average).",
    "scenarios": "Identifying products priced above their specific category average; Finding each customer's largest single purchase order; Regional quota threshold audit.",
    "traps": "Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "key": "semi_anti_joins",
    "name": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "symbol": "⚡",
    "color": "#f59e0b",
    "concept": "Existence Probing & The Fatal NOT IN Trap",
    "whenToUse": "When checking whether related records exist (Semi-Join) or do not exist (Anti-Join) without duplicating outer rows.",
    "scenarios": "Active customers with at least one settled trade; Identifying dormant leads with zero logged touches; Finding unregistered offshore entities.",
    "traps": "THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "key": "chained_ctes",
    "name": "CHAINED CTES (WITH ... AS)",
    "symbol": "🔗",
    "color": "#ec4899",
    "concept": "Modular Pipeline Architecture",
    "whenToUse": "Breaks complex transformations into clean, sequential, self-documenting stages (Data Cleaning -> Filtering -> Aggregation -> Presentation).",
    "scenarios": "Multi-touch attribution revenue pipelines; Daily trade aggregation followed by variance reporting; Staging raw sensor ticks before fraud detection.",
    "traps": "CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "key": "recursive_ctes",
    "name": "RECURSIVE CTES (WITH RECURSIVE)",
    "symbol": "🌳",
    "color": "#a855f7",
    "concept": "Hierarchical & Graph Traversal",
    "whenToUse": "Recursively walks tree structures (org charts, bill of materials parts, parent-child accounts) or generates sequence series.",
    "scenarios": "Full organizational reporting chain rollup; Financial chart-of-accounts parent-subsidiary rollups; Bill-of-Materials (BOM) multi-tier parts explosion; Consecutive calendar date generation.",
    "traps": "Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  }
];

window.QUESTS_SECTION_7 = [
  {
    "id": 601,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 01",
    "title": "Scalar Subquery: Level 01: Filter Above Benchmark",
    "subtitle": "Filter InvestmentAccounts rows having balance_usd greater than overall AVG.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where balance_usd > AVG(balance_usd).",
    "xp": 30,
    "table": "InvestmentAccounts",
    "scenario": "Filter InvestmentAccounts rows having balance_usd greater than overall AVG.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where balance_usd > AVG(balance_usd).",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT account_id, balance_usd\nFROM InvestmentAccounts\nWHERE balance_usd > (\n  SELECT AVG(balance_usd)\n  FROM InvestmentAccounts\n);",
    "template": [
      {
        "text": "SELECT account_id, balance_usd\nFROM InvestmentAccounts\nWHERE balance_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(balance_usd)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "AVG",
        "options": [
          "AVG",
          "TOTAL_AVG",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "InvestmentAccounts",
        "options": [
          "InvestmentAccounts",
          "InvestmentAccounts_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 602,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 02",
    "title": "Scalar Subquery: Level 02: Injected Baseline Projection",
    "subtitle": "Inject the global AVG(order_amount) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of TradeOrders.",
    "xp": 30,
    "table": "TradeOrders",
    "scenario": "Inject the global AVG(order_amount) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of TradeOrders.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT order_id, order_amount,\n  (SELECT AVG(order_amount) FROM TradeOrders) AS benchmark_val\nFROM TradeOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_amount,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " AVG(order_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " TradeOrders) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM TradeOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 603,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 03",
    "title": "Scalar Subquery: Level 03: Filter Above Benchmark",
    "subtitle": "Filter CorporateStaff rows having salary greater than overall AVG.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where salary > AVG(salary).",
    "xp": 31,
    "table": "CorporateStaff",
    "scenario": "Filter CorporateStaff rows having salary greater than overall AVG.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where salary > AVG(salary).",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT emp_id, salary\nFROM CorporateStaff\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM CorporateStaff\n);",
    "template": [
      {
        "text": "SELECT emp_id, salary\nFROM CorporateStaff\nWHERE salary ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(salary)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "AVG",
        "options": [
          "AVG",
          "TOTAL_AVG",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "CorporateStaff",
        "options": [
          "CorporateStaff",
          "CorporateStaff_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 604,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 04",
    "title": "Scalar Subquery: Level 04: Injected Baseline Projection",
    "subtitle": "Inject the global AVG(unit_price) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of ProductCatalog.",
    "xp": 31,
    "table": "ProductCatalog",
    "scenario": "Inject the global AVG(unit_price) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of ProductCatalog.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT product_id, unit_price,\n  (SELECT AVG(unit_price) FROM ProductCatalog) AS benchmark_val\nFROM ProductCatalog;",
    "template": [
      {
        "text": "SELECT product_id, unit_price,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " AVG(unit_price) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " ProductCatalog) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM ProductCatalog;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 605,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 05",
    "title": "Scalar Subquery: Level 05: Filter Above Benchmark",
    "subtitle": "Filter ClientInvoices rows having invoice_total greater than overall AVG.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where invoice_total > AVG(invoice_total).",
    "xp": 32,
    "table": "ClientInvoices",
    "scenario": "Filter ClientInvoices rows having invoice_total greater than overall AVG.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where invoice_total > AVG(invoice_total).",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "SELECT invoice_id, invoice_total\nFROM ClientInvoices\nWHERE invoice_total > (\n  SELECT AVG(invoice_total)\n  FROM ClientInvoices\n);",
    "template": [
      {
        "text": "SELECT invoice_id, invoice_total\nFROM ClientInvoices\nWHERE invoice_total ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(invoice_total)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "AVG",
        "options": [
          "AVG",
          "TOTAL_AVG",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "ClientInvoices",
        "options": [
          "ClientInvoices",
          "ClientInvoices_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 606,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 06",
    "title": "Scalar Subquery: Level 06: Injected Baseline Projection",
    "subtitle": "Inject the global AVG(current_balance) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of LedgerAccounts.",
    "xp": 32,
    "table": "LedgerAccounts",
    "scenario": "Inject the global AVG(current_balance) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of LedgerAccounts.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "SELECT ledger_id, current_balance,\n  (SELECT AVG(current_balance) FROM LedgerAccounts) AS benchmark_val\nFROM LedgerAccounts;",
    "template": [
      {
        "text": "SELECT ledger_id, current_balance,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " AVG(current_balance) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " LedgerAccounts) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM LedgerAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 607,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 07",
    "title": "Scalar Subquery: Level 07: Filter Above Benchmark",
    "subtitle": "Filter CustomerAudits rows having credit_limit greater than overall AVG.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where credit_limit > AVG(credit_limit).",
    "xp": 32,
    "table": "CustomerAudits",
    "scenario": "Filter CustomerAudits rows having credit_limit greater than overall AVG.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where credit_limit > AVG(credit_limit).",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "SELECT cust_id, credit_limit\nFROM CustomerAudits\nWHERE credit_limit > (\n  SELECT AVG(credit_limit)\n  FROM CustomerAudits\n);",
    "template": [
      {
        "text": "SELECT cust_id, credit_limit\nFROM CustomerAudits\nWHERE credit_limit ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(credit_limit)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "AVG",
        "options": [
          "AVG",
          "TOTAL_AVG",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "CustomerAudits",
        "options": [
          "CustomerAudits",
          "CustomerAudits_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 608,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 08",
    "title": "Scalar Subquery: Level 08: Injected Baseline Projection",
    "subtitle": "Inject the global AVG(unit_cost) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of SupplyChainParts.",
    "xp": 33,
    "table": "SupplyChainParts",
    "scenario": "Inject the global AVG(unit_cost) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of SupplyChainParts.",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "SELECT part_id, unit_cost,\n  (SELECT AVG(unit_cost) FROM SupplyChainParts) AS benchmark_val\nFROM SupplyChainParts;",
    "template": [
      {
        "text": "SELECT part_id, unit_cost,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " AVG(unit_cost) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " SupplyChainParts) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM SupplyChainParts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 609,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 09",
    "title": "Scalar Subquery: Level 09: Filter Above Benchmark",
    "subtitle": "Filter InvestmentAccounts rows having balance_usd greater than overall AVG.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where balance_usd > AVG(balance_usd).",
    "xp": 33,
    "table": "InvestmentAccounts",
    "scenario": "Filter InvestmentAccounts rows having balance_usd greater than overall AVG.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where balance_usd > AVG(balance_usd).",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT account_id, balance_usd\nFROM InvestmentAccounts\nWHERE balance_usd > (\n  SELECT AVG(balance_usd)\n  FROM InvestmentAccounts\n);",
    "template": [
      {
        "text": "SELECT account_id, balance_usd\nFROM InvestmentAccounts\nWHERE balance_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(balance_usd)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "AVG",
        "options": [
          "AVG",
          "TOTAL_AVG",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "InvestmentAccounts",
        "options": [
          "InvestmentAccounts",
          "InvestmentAccounts_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 610,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 10",
    "title": "Scalar Subquery: Level 10: Injected Baseline Projection",
    "subtitle": "Inject the global AVG(order_amount) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of TradeOrders.",
    "xp": 34,
    "table": "TradeOrders",
    "scenario": "Inject the global AVG(order_amount) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of TradeOrders.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT order_id, order_amount,\n  (SELECT AVG(order_amount) FROM TradeOrders) AS benchmark_val\nFROM TradeOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_amount,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " AVG(order_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " TradeOrders) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM TradeOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 611,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 11",
    "title": "Scalar Subquery: Level 11: Filter Above Benchmark",
    "subtitle": "Filter CorporateStaff rows having salary greater than overall MAX.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where salary > MAX(salary).",
    "xp": 34,
    "table": "CorporateStaff",
    "scenario": "Filter CorporateStaff rows having salary greater than overall MAX.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where salary > MAX(salary).",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT emp_id, salary\nFROM CorporateStaff\nWHERE salary > (\n  SELECT MAX(salary)\n  FROM CorporateStaff\n);",
    "template": [
      {
        "text": "SELECT emp_id, salary\nFROM CorporateStaff\nWHERE salary ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(salary)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "TOTAL_MAX",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "CorporateStaff",
        "options": [
          "CorporateStaff",
          "CorporateStaff_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 612,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 12",
    "title": "Scalar Subquery: Level 12: Injected Baseline Projection",
    "subtitle": "Inject the global MAX(unit_price) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of ProductCatalog.",
    "xp": 34,
    "table": "ProductCatalog",
    "scenario": "Inject the global MAX(unit_price) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of ProductCatalog.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT product_id, unit_price,\n  (SELECT MAX(unit_price) FROM ProductCatalog) AS benchmark_val\nFROM ProductCatalog;",
    "template": [
      {
        "text": "SELECT product_id, unit_price,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " MAX(unit_price) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " ProductCatalog) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM ProductCatalog;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 613,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 13",
    "title": "Scalar Subquery: Level 13: Filter Above Benchmark",
    "subtitle": "Filter ClientInvoices rows having invoice_total greater than overall MAX.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where invoice_total > MAX(invoice_total).",
    "xp": 35,
    "table": "ClientInvoices",
    "scenario": "Filter ClientInvoices rows having invoice_total greater than overall MAX.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where invoice_total > MAX(invoice_total).",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "SELECT invoice_id, invoice_total\nFROM ClientInvoices\nWHERE invoice_total > (\n  SELECT MAX(invoice_total)\n  FROM ClientInvoices\n);",
    "template": [
      {
        "text": "SELECT invoice_id, invoice_total\nFROM ClientInvoices\nWHERE invoice_total ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(invoice_total)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "TOTAL_MAX",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "ClientInvoices",
        "options": [
          "ClientInvoices",
          "ClientInvoices_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 614,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 14",
    "title": "Scalar Subquery: Level 14: Injected Baseline Projection",
    "subtitle": "Inject the global MAX(current_balance) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of LedgerAccounts.",
    "xp": 35,
    "table": "LedgerAccounts",
    "scenario": "Inject the global MAX(current_balance) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of LedgerAccounts.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "SELECT ledger_id, current_balance,\n  (SELECT MAX(current_balance) FROM LedgerAccounts) AS benchmark_val\nFROM LedgerAccounts;",
    "template": [
      {
        "text": "SELECT ledger_id, current_balance,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " MAX(current_balance) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " LedgerAccounts) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM LedgerAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 615,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 15",
    "title": "Scalar Subquery: Level 15: Filter Above Benchmark",
    "subtitle": "Filter CustomerAudits rows having credit_limit greater than overall MAX.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where credit_limit > MAX(credit_limit).",
    "xp": 36,
    "table": "CustomerAudits",
    "scenario": "Filter CustomerAudits rows having credit_limit greater than overall MAX.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where credit_limit > MAX(credit_limit).",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "SELECT cust_id, credit_limit\nFROM CustomerAudits\nWHERE credit_limit > (\n  SELECT MAX(credit_limit)\n  FROM CustomerAudits\n);",
    "template": [
      {
        "text": "SELECT cust_id, credit_limit\nFROM CustomerAudits\nWHERE credit_limit ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(credit_limit)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "TOTAL_MAX",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "CustomerAudits",
        "options": [
          "CustomerAudits",
          "CustomerAudits_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 616,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 16",
    "title": "Scalar Subquery: Level 16: Injected Baseline Projection",
    "subtitle": "Inject the global MAX(unit_cost) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of SupplyChainParts.",
    "xp": 36,
    "table": "SupplyChainParts",
    "scenario": "Inject the global MAX(unit_cost) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of SupplyChainParts.",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "SELECT part_id, unit_cost,\n  (SELECT MAX(unit_cost) FROM SupplyChainParts) AS benchmark_val\nFROM SupplyChainParts;",
    "template": [
      {
        "text": "SELECT part_id, unit_cost,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " MAX(unit_cost) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " SupplyChainParts) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM SupplyChainParts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 617,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 17",
    "title": "Scalar Subquery: Level 17: Filter Above Benchmark",
    "subtitle": "Filter InvestmentAccounts rows having balance_usd greater than overall MAX.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where balance_usd > MAX(balance_usd).",
    "xp": 36,
    "table": "InvestmentAccounts",
    "scenario": "Filter InvestmentAccounts rows having balance_usd greater than overall MAX.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where balance_usd > MAX(balance_usd).",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT account_id, balance_usd\nFROM InvestmentAccounts\nWHERE balance_usd > (\n  SELECT MAX(balance_usd)\n  FROM InvestmentAccounts\n);",
    "template": [
      {
        "text": "SELECT account_id, balance_usd\nFROM InvestmentAccounts\nWHERE balance_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(balance_usd)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "TOTAL_MAX",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "InvestmentAccounts",
        "options": [
          "InvestmentAccounts",
          "InvestmentAccounts_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 618,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 18",
    "title": "Scalar Subquery: Level 18: Injected Baseline Projection",
    "subtitle": "Inject the global MAX(order_amount) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of TradeOrders.",
    "xp": 37,
    "table": "TradeOrders",
    "scenario": "Inject the global MAX(order_amount) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of TradeOrders.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT order_id, order_amount,\n  (SELECT MAX(order_amount) FROM TradeOrders) AS benchmark_val\nFROM TradeOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_amount,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " MAX(order_amount) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " TradeOrders) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM TradeOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 619,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 19",
    "title": "Scalar Subquery: Level 19: Filter Above Benchmark",
    "subtitle": "Filter CorporateStaff rows having salary greater than overall MAX.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Write a scalar subquery in WHERE to find rows where salary > MAX(salary).",
    "xp": 37,
    "table": "CorporateStaff",
    "scenario": "Filter CorporateStaff rows having salary greater than overall MAX.",
    "businessObjective": "Write a scalar subquery in WHERE to find rows where salary > MAX(salary).",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT emp_id, salary\nFROM CorporateStaff\nWHERE salary > (\n  SELECT MAX(salary)\n  FROM CorporateStaff\n);",
    "template": [
      {
        "text": "SELECT emp_id, salary\nFROM CorporateStaff\nWHERE salary ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(salary)\n  FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TABLE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": ">",
        "options": [
          ">",
          ">=",
          "=",
          "IN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "TOTAL_MAX",
          "ROLLUP",
          "MEDIAN"
        ]
      },
      "slot3": {
        "correct": "CorporateStaff",
        "options": [
          "CorporateStaff",
          "CorporateStaff_summary",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 620,
    "discipline": "SCALAR & PREDICATE SUBQUERIES",
    "disciplineKey": "scalar_subqueries",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "CTE Lvl 20",
    "title": "Scalar Subquery: Level 20: Injected Baseline Projection",
    "subtitle": "Inject the global MAX(unit_price) as an inline benchmark column.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SCALAR & PREDICATE SUBQUERIES)",
    "subcluster": "SCALAR & PREDICATE SUBQUERIES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Inject a scalar subquery into the SELECT projection list of ProductCatalog.",
    "xp": 38,
    "table": "ProductCatalog",
    "scenario": "Inject the global MAX(unit_price) as an inline benchmark column.",
    "businessObjective": "Inject a scalar subquery into the SELECT projection list of ProductCatalog.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT product_id, unit_price,\n  (SELECT MAX(unit_price) FROM ProductCatalog) AS benchmark_val\nFROM ProductCatalog;",
    "template": [
      {
        "text": "SELECT product_id, unit_price,\n  (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " MAX(unit_price) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM ]"
      },
      {
        "text": " ProductCatalog) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ALIAS ]"
      },
      {
        "text": "\nFROM ProductCatalog;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "FETCH",
          "COMPUTE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "OF",
          "INTO",
          "USING"
        ]
      },
      "slot3": {
        "correct": "benchmark_val",
        "options": [
          "benchmark_val",
          "OVERALL",
          "MAX",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. A scalar subquery must return at most ONE row and ONE column! If it returns multiple rows, the query crashes with: \"Subquery returned more than 1 value\"."
  },
  {
    "id": 621,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 21",
    "title": "Correlated Subquery: Level 01: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where invoice_total is higher than the average for their specific client_id.",
    "xp": 38,
    "table": "ClientInvoices",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where invoice_total is higher than the average for their specific client_id.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE a.invoice_total > (\n  SELECT AVG(b.invoice_total)\n  FROM ClientInvoices b\n  WHERE b.client_id = a.client_id\n);",
    "template": [
      {
        "text": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE a.invoice_total > (\n  SELECT AVG(b.invoice_total)\n  FROM ClientInvoices b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".client_id = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".client_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 622,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 22",
    "title": "Correlated Subquery: Level 02: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific fund_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(current_balance).",
    "xp": 38,
    "table": "LedgerAccounts",
    "scenario": "Extract records matching the exact maximum within their specific fund_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(current_balance).",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.ledger_id, a.fund_id, a.current_balance\nFROM LedgerAccounts a\nWHERE a.current_balance = (\n  SELECT MAX(b.current_balance)\n  FROM LedgerAccounts b\n  WHERE b.fund_id = a.fund_id\n);",
    "template": [
      {
        "text": "SELECT a.ledger_id, a.fund_id, a.current_balance\nFROM LedgerAccounts a\nWHERE a.current_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.current_balance)\n  FROM LedgerAccounts b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "1"
        ]
      },
      "slot4": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 623,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 23",
    "title": "Correlated Subquery: Level 03: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where credit_limit is higher than the average for their specific region_code.",
    "xp": 39,
    "table": "CustomerAudits",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where credit_limit is higher than the average for their specific region_code.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE a.credit_limit > (\n  SELECT AVG(b.credit_limit)\n  FROM CustomerAudits b\n  WHERE b.region_code = a.region_code\n);",
    "template": [
      {
        "text": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE a.credit_limit > (\n  SELECT AVG(b.credit_limit)\n  FROM CustomerAudits b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".region_code = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".region_code\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 624,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 24",
    "title": "Correlated Subquery: Level 04: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific assembly_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(unit_cost).",
    "xp": 39,
    "table": "SupplyChainParts",
    "scenario": "Extract records matching the exact maximum within their specific assembly_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(unit_cost).",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "SELECT a.part_id, a.assembly_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE a.unit_cost = (\n  SELECT MAX(b.unit_cost)\n  FROM SupplyChainParts b\n  WHERE b.assembly_id = a.assembly_id\n);",
    "template": [
      {
        "text": "SELECT a.part_id, a.assembly_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE a.unit_cost ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.unit_cost)\n  FROM SupplyChainParts b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "1"
        ]
      },
      "slot4": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 625,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 25",
    "title": "Correlated Subquery: Level 05: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where balance_usd is higher than the average for their specific portfolio_id.",
    "xp": 40,
    "table": "InvestmentAccounts",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where balance_usd is higher than the average for their specific portfolio_id.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE a.balance_usd > (\n  SELECT AVG(b.balance_usd)\n  FROM InvestmentAccounts b\n  WHERE b.portfolio_id = a.portfolio_id\n);",
    "template": [
      {
        "text": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE a.balance_usd > (\n  SELECT AVG(b.balance_usd)\n  FROM InvestmentAccounts b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".portfolio_id = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".portfolio_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 626,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 26",
    "title": "Correlated Subquery: Level 06: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific desk_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(order_amount).",
    "xp": 40,
    "table": "TradeOrders",
    "scenario": "Extract records matching the exact maximum within their specific desk_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(order_amount).",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT a.order_id, a.desk_id, a.order_amount\nFROM TradeOrders a\nWHERE a.order_amount = (\n  SELECT MAX(b.order_amount)\n  FROM TradeOrders b\n  WHERE b.desk_id = a.desk_id\n);",
    "template": [
      {
        "text": "SELECT a.order_id, a.desk_id, a.order_amount\nFROM TradeOrders a\nWHERE a.order_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.order_amount)\n  FROM TradeOrders b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "order_id",
          "order_amount",
          "1"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "order_id",
          "order_amount",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 627,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 27",
    "title": "Correlated Subquery: Level 07: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where salary is higher than the average for their specific dept_id.",
    "xp": 40,
    "table": "CorporateStaff",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where salary is higher than the average for their specific dept_id.",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE a.salary > (\n  SELECT AVG(b.salary)\n  FROM CorporateStaff b\n  WHERE b.dept_id = a.dept_id\n);",
    "template": [
      {
        "text": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE a.salary > (\n  SELECT AVG(b.salary)\n  FROM CorporateStaff b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".dept_id = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".dept_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 628,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 28",
    "title": "Correlated Subquery: Level 08: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific category_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(unit_price).",
    "xp": 41,
    "table": "ProductCatalog",
    "scenario": "Extract records matching the exact maximum within their specific category_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(unit_price).",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.product_id, a.category_id, a.unit_price\nFROM ProductCatalog a\nWHERE a.unit_price = (\n  SELECT MAX(b.unit_price)\n  FROM ProductCatalog b\n  WHERE b.category_id = a.category_id\n);",
    "template": [
      {
        "text": "SELECT a.product_id, a.category_id, a.unit_price\nFROM ProductCatalog a\nWHERE a.unit_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.unit_price)\n  FROM ProductCatalog b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "category_id",
        "options": [
          "category_id",
          "product_id",
          "unit_price",
          "1"
        ]
      },
      "slot4": {
        "correct": "category_id",
        "options": [
          "category_id",
          "product_id",
          "unit_price",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 629,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 29",
    "title": "Correlated Subquery: Level 09: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where invoice_total is higher than the average for their specific client_id.",
    "xp": 41,
    "table": "ClientInvoices",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where invoice_total is higher than the average for their specific client_id.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE a.invoice_total > (\n  SELECT AVG(b.invoice_total)\n  FROM ClientInvoices b\n  WHERE b.client_id = a.client_id\n);",
    "template": [
      {
        "text": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE a.invoice_total > (\n  SELECT AVG(b.invoice_total)\n  FROM ClientInvoices b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".client_id = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".client_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 630,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 30",
    "title": "Correlated Subquery: Level 10: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific fund_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(current_balance).",
    "xp": 42,
    "table": "LedgerAccounts",
    "scenario": "Extract records matching the exact maximum within their specific fund_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(current_balance).",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.ledger_id, a.fund_id, a.current_balance\nFROM LedgerAccounts a\nWHERE a.current_balance = (\n  SELECT MAX(b.current_balance)\n  FROM LedgerAccounts b\n  WHERE b.fund_id = a.fund_id\n);",
    "template": [
      {
        "text": "SELECT a.ledger_id, a.fund_id, a.current_balance\nFROM LedgerAccounts a\nWHERE a.current_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.current_balance)\n  FROM LedgerAccounts b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "1"
        ]
      },
      "slot4": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 631,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 31",
    "title": "Correlated Subquery: Level 11: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where credit_limit is higher than the average for their specific region_code.",
    "xp": 42,
    "table": "CustomerAudits",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where credit_limit is higher than the average for their specific region_code.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE a.credit_limit > (\n  SELECT AVG(b.credit_limit)\n  FROM CustomerAudits b\n  WHERE b.region_code = a.region_code\n);",
    "template": [
      {
        "text": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE a.credit_limit > (\n  SELECT AVG(b.credit_limit)\n  FROM CustomerAudits b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".region_code = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".region_code\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 632,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 32",
    "title": "Correlated Subquery: Level 12: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific assembly_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(unit_cost).",
    "xp": 42,
    "table": "SupplyChainParts",
    "scenario": "Extract records matching the exact maximum within their specific assembly_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(unit_cost).",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "SELECT a.part_id, a.assembly_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE a.unit_cost = (\n  SELECT MAX(b.unit_cost)\n  FROM SupplyChainParts b\n  WHERE b.assembly_id = a.assembly_id\n);",
    "template": [
      {
        "text": "SELECT a.part_id, a.assembly_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE a.unit_cost ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.unit_cost)\n  FROM SupplyChainParts b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "1"
        ]
      },
      "slot4": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 633,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 33",
    "title": "Correlated Subquery: Level 13: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where balance_usd is higher than the average for their specific portfolio_id.",
    "xp": 43,
    "table": "InvestmentAccounts",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where balance_usd is higher than the average for their specific portfolio_id.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE a.balance_usd > (\n  SELECT AVG(b.balance_usd)\n  FROM InvestmentAccounts b\n  WHERE b.portfolio_id = a.portfolio_id\n);",
    "template": [
      {
        "text": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE a.balance_usd > (\n  SELECT AVG(b.balance_usd)\n  FROM InvestmentAccounts b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".portfolio_id = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".portfolio_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 634,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 34",
    "title": "Correlated Subquery: Level 14: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific desk_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(order_amount).",
    "xp": 43,
    "table": "TradeOrders",
    "scenario": "Extract records matching the exact maximum within their specific desk_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(order_amount).",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT a.order_id, a.desk_id, a.order_amount\nFROM TradeOrders a\nWHERE a.order_amount = (\n  SELECT MAX(b.order_amount)\n  FROM TradeOrders b\n  WHERE b.desk_id = a.desk_id\n);",
    "template": [
      {
        "text": "SELECT a.order_id, a.desk_id, a.order_amount\nFROM TradeOrders a\nWHERE a.order_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.order_amount)\n  FROM TradeOrders b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "order_id",
          "order_amount",
          "1"
        ]
      },
      "slot4": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "order_id",
          "order_amount",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 635,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 35",
    "title": "Correlated Subquery: Level 15: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where salary is higher than the average for their specific dept_id.",
    "xp": 44,
    "table": "CorporateStaff",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where salary is higher than the average for their specific dept_id.",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE a.salary > (\n  SELECT AVG(b.salary)\n  FROM CorporateStaff b\n  WHERE b.dept_id = a.dept_id\n);",
    "template": [
      {
        "text": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE a.salary > (\n  SELECT AVG(b.salary)\n  FROM CorporateStaff b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".dept_id = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".dept_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 636,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 36",
    "title": "Correlated Subquery: Level 16: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific category_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(unit_price).",
    "xp": 44,
    "table": "ProductCatalog",
    "scenario": "Extract records matching the exact maximum within their specific category_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(unit_price).",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.product_id, a.category_id, a.unit_price\nFROM ProductCatalog a\nWHERE a.unit_price = (\n  SELECT MAX(b.unit_price)\n  FROM ProductCatalog b\n  WHERE b.category_id = a.category_id\n);",
    "template": [
      {
        "text": "SELECT a.product_id, a.category_id, a.unit_price\nFROM ProductCatalog a\nWHERE a.unit_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.unit_price)\n  FROM ProductCatalog b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "category_id",
        "options": [
          "category_id",
          "product_id",
          "unit_price",
          "1"
        ]
      },
      "slot4": {
        "correct": "category_id",
        "options": [
          "category_id",
          "product_id",
          "unit_price",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 637,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 37",
    "title": "Correlated Subquery: Level 17: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where invoice_total is higher than the average for their specific client_id.",
    "xp": 44,
    "table": "ClientInvoices",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where invoice_total is higher than the average for their specific client_id.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE a.invoice_total > (\n  SELECT AVG(b.invoice_total)\n  FROM ClientInvoices b\n  WHERE b.client_id = a.client_id\n);",
    "template": [
      {
        "text": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE a.invoice_total > (\n  SELECT AVG(b.invoice_total)\n  FROM ClientInvoices b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".client_id = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".client_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 638,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 38",
    "title": "Correlated Subquery: Level 18: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific fund_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(current_balance).",
    "xp": 45,
    "table": "LedgerAccounts",
    "scenario": "Extract records matching the exact maximum within their specific fund_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(current_balance).",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.ledger_id, a.fund_id, a.current_balance\nFROM LedgerAccounts a\nWHERE a.current_balance = (\n  SELECT MAX(b.current_balance)\n  FROM LedgerAccounts b\n  WHERE b.fund_id = a.fund_id\n);",
    "template": [
      {
        "text": "SELECT a.ledger_id, a.fund_id, a.current_balance\nFROM LedgerAccounts a\nWHERE a.current_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.current_balance)\n  FROM LedgerAccounts b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "1"
        ]
      },
      "slot4": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 639,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 39",
    "title": "Correlated Subquery: Level 19: Peer Group Comparison",
    "subtitle": "Compare each row against its own partition group average using table aliases.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find rows where credit_limit is higher than the average for their specific region_code.",
    "xp": 45,
    "table": "CustomerAudits",
    "scenario": "Compare each row against its own partition group average using table aliases.",
    "businessObjective": "Find rows where credit_limit is higher than the average for their specific region_code.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE a.credit_limit > (\n  SELECT AVG(b.credit_limit)\n  FROM CustomerAudits b\n  WHERE b.region_code = a.region_code\n);",
    "template": [
      {
        "text": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE a.credit_limit > (\n  SELECT AVG(b.credit_limit)\n  FROM CustomerAudits b\n  WHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INNER ALIAS ]"
      },
      {
        "text": ".region_code = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OUTER ALIAS ]"
      },
      {
        "text": ".region_code\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CLOSING ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "b",
        "options": [
          "b",
          "a",
          "inner",
          "master"
        ]
      },
      "slot2": {
        "correct": "a",
        "options": [
          "a",
          "b",
          "outer",
          "root"
        ]
      },
      "slot3": {
        "correct": ")",
        "options": [
          ")",
          ") AS avg_val",
          ") ORDER BY 1",
          "GROUP BY 1)"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 640,
    "discipline": "CORRELATED SUBQUERIES",
    "disciplineKey": "correlated_subqueries",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 40",
    "title": "Correlated Subquery: Level 20: Group Extremum Filter",
    "subtitle": "Extract records matching the exact maximum within their specific assembly_id.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CORRELATED SUBQUERIES)",
    "subcluster": "CORRELATED SUBQUERIES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Correlate outer record with the group-level MAX(unit_cost).",
    "xp": 46,
    "table": "SupplyChainParts",
    "scenario": "Extract records matching the exact maximum within their specific assembly_id.",
    "businessObjective": "Correlate outer record with the group-level MAX(unit_cost).",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "SELECT a.part_id, a.assembly_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE a.unit_cost = (\n  SELECT MAX(b.unit_cost)\n  FROM SupplyChainParts b\n  WHERE b.assembly_id = a.assembly_id\n);",
    "template": [
      {
        "text": "SELECT a.part_id, a.assembly_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE a.unit_cost ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGG ]"
      },
      {
        "text": "(b.unit_cost)\n  FROM SupplyChainParts b\n  WHERE b.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": " = a.",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ OUTER KEY ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "=",
        "options": [
          "=",
          "IN",
          "EXISTS",
          "LIKE"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "MIN",
          "SUM",
          "COUNT"
        ]
      },
      "slot3": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "1"
        ]
      },
      "slot4": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "id"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Quadratic O(M × N) performance penalty! Because the inner query re-executes for every outer row, it can severely lag on large tables. Often better rewritten as a Window function or JOIN."
  },
  {
    "id": 641,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 41",
    "title": "Semi/Anti-Join: Level 01: Efficient EXISTS Probing",
    "subtitle": "Perform early-exit EXISTS probe without duplicating outer rows.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write a EXISTS clause with SELECT 1 inside the probe subquery.",
    "xp": 46,
    "table": "InvestmentAccounts",
    "scenario": "Perform early-exit EXISTS probe without duplicating outer rows.",
    "businessObjective": "Write a EXISTS clause with SELECT 1 inside the probe subquery.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE EXISTS (\n  SELECT 1\n  FROM InvestmentAccounts b\n  WHERE b.portfolio_id = a.portfolio_id\n  AND b.balance_usd > 5000\n);",
    "template": [
      {
        "text": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PROBE OP ]"
      },
      {
        "text": " (\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PROBE CONSTANT ]"
      },
      {
        "text": "\n  FROM InvestmentAccounts b\n  WHERE b.portfolio_id = a.portfolio_id\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FILTER ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXISTS",
        "options": [
          "EXISTS",
          "IN",
          "JOIN",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "SELECT 1",
        "options": [
          "SELECT 1",
          "SELECT *",
          "SELECT COUNT(*)",
          "SELECT TRUE"
        ]
      },
      "slot3": {
        "correct": "AND b.balance_usd > 5000",
        "options": [
          "AND b.balance_usd > 5000",
          "OR b.balance_usd > 5000",
          "GROUP BY 1",
          "LIMIT 1"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 642,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 42",
    "title": "Semi/Anti-Join: Level 02: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 46,
    "table": "TradeOrders",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT a.order_id, a.order_amount\nFROM TradeOrders a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM TradeOrders b\n  WHERE b.order_id = a.order_id\n  AND b.order_amount IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.order_id, a.order_amount\nFROM TradeOrders a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM TradeOrders b\n  WHERE b.order_id = a.order_id\n  AND b.order_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 643,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 43",
    "title": "Semi/Anti-Join: Level 03: Efficient EXISTS Probing",
    "subtitle": "Perform early-exit EXISTS probe without duplicating outer rows.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write a EXISTS clause with SELECT 1 inside the probe subquery.",
    "xp": 47,
    "table": "CorporateStaff",
    "scenario": "Perform early-exit EXISTS probe without duplicating outer rows.",
    "businessObjective": "Write a EXISTS clause with SELECT 1 inside the probe subquery.",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE EXISTS (\n  SELECT 1\n  FROM CorporateStaff b\n  WHERE b.dept_id = a.dept_id\n  AND b.salary > 5000\n);",
    "template": [
      {
        "text": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PROBE OP ]"
      },
      {
        "text": " (\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PROBE CONSTANT ]"
      },
      {
        "text": "\n  FROM CorporateStaff b\n  WHERE b.dept_id = a.dept_id\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FILTER ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXISTS",
        "options": [
          "EXISTS",
          "IN",
          "JOIN",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "SELECT 1",
        "options": [
          "SELECT 1",
          "SELECT *",
          "SELECT COUNT(*)",
          "SELECT TRUE"
        ]
      },
      "slot3": {
        "correct": "AND b.salary > 5000",
        "options": [
          "AND b.salary > 5000",
          "OR b.salary > 5000",
          "GROUP BY 1",
          "LIMIT 1"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 644,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 44",
    "title": "Semi/Anti-Join: Level 04: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 47,
    "table": "ProductCatalog",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.product_id, a.unit_price\nFROM ProductCatalog a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM ProductCatalog b\n  WHERE b.product_id = a.product_id\n  AND b.unit_price IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.product_id, a.unit_price\nFROM ProductCatalog a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM ProductCatalog b\n  WHERE b.product_id = a.product_id\n  AND b.unit_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 645,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 45",
    "title": "Semi/Anti-Join: Level 05: Efficient EXISTS Probing",
    "subtitle": "Perform early-exit EXISTS probe without duplicating outer rows.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Write a EXISTS clause with SELECT 1 inside the probe subquery.",
    "xp": 48,
    "table": "ClientInvoices",
    "scenario": "Perform early-exit EXISTS probe without duplicating outer rows.",
    "businessObjective": "Write a EXISTS clause with SELECT 1 inside the probe subquery.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE EXISTS (\n  SELECT 1\n  FROM ClientInvoices b\n  WHERE b.client_id = a.client_id\n  AND b.invoice_total > 5000\n);",
    "template": [
      {
        "text": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PROBE OP ]"
      },
      {
        "text": " (\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PROBE CONSTANT ]"
      },
      {
        "text": "\n  FROM ClientInvoices b\n  WHERE b.client_id = a.client_id\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ FILTER ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "EXISTS",
        "options": [
          "EXISTS",
          "IN",
          "JOIN",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "SELECT 1",
        "options": [
          "SELECT 1",
          "SELECT *",
          "SELECT COUNT(*)",
          "SELECT TRUE"
        ]
      },
      "slot3": {
        "correct": "AND b.invoice_total > 5000",
        "options": [
          "AND b.invoice_total > 5000",
          "OR b.invoice_total > 5000",
          "GROUP BY 1",
          "LIMIT 1"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 646,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 46",
    "title": "Semi/Anti-Join: Level 06: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 48,
    "table": "LedgerAccounts",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.ledger_id, a.current_balance\nFROM LedgerAccounts a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM LedgerAccounts b\n  WHERE b.ledger_id = a.ledger_id\n  AND b.current_balance IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.ledger_id, a.current_balance\nFROM LedgerAccounts a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM LedgerAccounts b\n  WHERE b.ledger_id = a.ledger_id\n  AND b.current_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 647,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 47",
    "title": "Semi/Anti-Join: Level 07: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 48,
    "table": "CustomerAudits",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM CustomerAudits b\n  WHERE b.cust_id = a.cust_id\n  AND b.credit_limit IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM CustomerAudits b\n  WHERE b.cust_id = a.cust_id\n  AND b.credit_limit ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 648,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 48",
    "title": "Semi/Anti-Join: Level 08: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 49,
    "table": "SupplyChainParts",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "SELECT a.part_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM SupplyChainParts b\n  WHERE b.part_id = a.part_id\n  AND b.unit_cost IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.part_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM SupplyChainParts b\n  WHERE b.part_id = a.part_id\n  AND b.unit_cost ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 649,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 49",
    "title": "Semi/Anti-Join: Level 09: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 49,
    "table": "InvestmentAccounts",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM InvestmentAccounts b\n  WHERE b.account_id = a.account_id\n  AND b.balance_usd IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM InvestmentAccounts b\n  WHERE b.account_id = a.account_id\n  AND b.balance_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 650,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 50",
    "title": "Semi/Anti-Join: Level 10: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 50,
    "table": "TradeOrders",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT a.order_id, a.order_amount\nFROM TradeOrders a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM TradeOrders b\n  WHERE b.order_id = a.order_id\n  AND b.order_amount IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.order_id, a.order_amount\nFROM TradeOrders a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM TradeOrders b\n  WHERE b.order_id = a.order_id\n  AND b.order_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 651,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 51",
    "title": "Semi/Anti-Join: Level 11: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 50,
    "table": "CorporateStaff",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM CorporateStaff b\n  WHERE b.emp_id = a.emp_id\n  AND b.salary IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM CorporateStaff b\n  WHERE b.emp_id = a.emp_id\n  AND b.salary ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 652,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 52",
    "title": "Semi/Anti-Join: Level 12: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 50,
    "table": "ProductCatalog",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.product_id, a.unit_price\nFROM ProductCatalog a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM ProductCatalog b\n  WHERE b.product_id = a.product_id\n  AND b.unit_price IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.product_id, a.unit_price\nFROM ProductCatalog a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM ProductCatalog b\n  WHERE b.product_id = a.product_id\n  AND b.unit_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 653,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 53",
    "title": "Semi/Anti-Join: Level 13: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 51,
    "table": "ClientInvoices",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM ClientInvoices b\n  WHERE b.invoice_id = a.invoice_id\n  AND b.invoice_total IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.invoice_id, a.invoice_total\nFROM ClientInvoices a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM ClientInvoices b\n  WHERE b.invoice_id = a.invoice_id\n  AND b.invoice_total ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 654,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 54",
    "title": "Semi/Anti-Join: Level 14: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 51,
    "table": "LedgerAccounts",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.ledger_id, a.current_balance\nFROM LedgerAccounts a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM LedgerAccounts b\n  WHERE b.ledger_id = a.ledger_id\n  AND b.current_balance IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.ledger_id, a.current_balance\nFROM LedgerAccounts a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM LedgerAccounts b\n  WHERE b.ledger_id = a.ledger_id\n  AND b.current_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 655,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 55",
    "title": "Semi/Anti-Join: Level 15: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 52,
    "table": "CustomerAudits",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM CustomerAudits b\n  WHERE b.cust_id = a.cust_id\n  AND b.credit_limit IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.cust_id, a.credit_limit\nFROM CustomerAudits a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM CustomerAudits b\n  WHERE b.cust_id = a.cust_id\n  AND b.credit_limit ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 656,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 56",
    "title": "Semi/Anti-Join: Level 16: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 52,
    "table": "SupplyChainParts",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "SELECT a.part_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM SupplyChainParts b\n  WHERE b.part_id = a.part_id\n  AND b.unit_cost IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.part_id, a.unit_cost\nFROM SupplyChainParts a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM SupplyChainParts b\n  WHERE b.part_id = a.part_id\n  AND b.unit_cost ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 657,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 57",
    "title": "Semi/Anti-Join: Level 17: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 52,
    "table": "InvestmentAccounts",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM InvestmentAccounts b\n  WHERE b.account_id = a.account_id\n  AND b.balance_usd IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.account_id, a.balance_usd\nFROM InvestmentAccounts a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM InvestmentAccounts b\n  WHERE b.account_id = a.account_id\n  AND b.balance_usd ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 658,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 58",
    "title": "Semi/Anti-Join: Level 18: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 53,
    "table": "TradeOrders",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "SELECT a.order_id, a.order_amount\nFROM TradeOrders a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM TradeOrders b\n  WHERE b.order_id = a.order_id\n  AND b.order_amount IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.order_id, a.order_amount\nFROM TradeOrders a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM TradeOrders b\n  WHERE b.order_id = a.order_id\n  AND b.order_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 659,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 59",
    "title": "Semi/Anti-Join: Level 19: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 53,
    "table": "CorporateStaff",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM CorporateStaff b\n  WHERE b.emp_id = a.emp_id\n  AND b.salary IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.emp_id, a.salary\nFROM CorporateStaff a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM CorporateStaff b\n  WHERE b.emp_id = a.emp_id\n  AND b.salary ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 660,
    "discipline": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN)",
    "disciplineKey": "semi_anti_joins",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 60",
    "title": "Semi/Anti-Join: Level 20: Safe Anti-Join Pattern",
    "subtitle": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (SEMI-JOINS & ANTI-JOINS (EXISTS vs IN))",
    "subcluster": "SEMI-JOINS & ANTI-JOINS (EXISTS vs IN) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "xp": 54,
    "table": "ProductCatalog",
    "scenario": "Evade the fatal NOT IN with NULLs trap by enforcing NOT EXISTS.",
    "businessObjective": "Write a rock-solid NOT EXISTS anti-join that is impervious to NULL values.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "SELECT a.product_id, a.unit_price\nFROM ProductCatalog a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM ProductCatalog b\n  WHERE b.product_id = a.product_id\n  AND b.unit_price IS NULL\n);",
    "template": [
      {
        "text": "SELECT a.product_id, a.unit_price\nFROM ProductCatalog a\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ANTI-JOIN OP ]"
      },
      {
        "text": " (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CONSTANT ]"
      },
      {
        "text": "\n  FROM ProductCatalog b\n  WHERE b.product_id = a.product_id\n  AND b.unit_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL CHECK ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ VALUE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "NOT EXISTS",
        "options": [
          "NOT EXISTS",
          "NOT IN",
          "EXCEPT",
          "UNLESS"
        ]
      },
      "slot2": {
        "correct": "1",
        "options": [
          "1",
          "*",
          "ALL",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "EQUALS"
        ]
      },
      "slot4": {
        "correct": "NULL",
        "options": [
          "NULL",
          "0",
          "EMPTY",
          "UNKNOWN"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. THE FATAL NOT IN NULL TRAP! If the subquery in NOT IN contains even a SINGLE NULL value, the entire predicate evaluates to UNKNOWN and returns ZERO rows! Always use NOT EXISTS for safe anti-joins."
  },
  {
    "id": 661,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 61",
    "title": "Chained CTEs: Level 01: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 54,
    "table": "ClientInvoices",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT client_id, AVG(invoice_total) AS mean_val\n  FROM ClientInvoices\n  GROUP BY client_id\n),\nstage2 AS (\n  SELECT client_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(invoice_total) AS mean_val\n  FROM ClientInvoices\n  GROUP BY client_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "client_id",
        "options": [
          "client_id",
          "invoice_id",
          "invoice_total",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "ClientInvoices",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 662,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 62",
    "title": "Chained CTEs: Level 02: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 54,
    "table": "LedgerAccounts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT fund_id, AVG(current_balance) AS mean_val\n  FROM LedgerAccounts\n  GROUP BY fund_id\n),\nstage2 AS (\n  SELECT fund_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(current_balance) AS mean_val\n  FROM LedgerAccounts\n  GROUP BY fund_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "LedgerAccounts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 663,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 63",
    "title": "Chained CTEs: Level 03: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 55,
    "table": "CustomerAudits",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT region_code, AVG(credit_limit) AS mean_val\n  FROM CustomerAudits\n  GROUP BY region_code\n),\nstage2 AS (\n  SELECT region_code, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(credit_limit) AS mean_val\n  FROM CustomerAudits\n  GROUP BY region_code\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "region_code",
        "options": [
          "region_code",
          "cust_id",
          "credit_limit",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "CustomerAudits",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 664,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 64",
    "title": "Chained CTEs: Level 04: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 55,
    "table": "SupplyChainParts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT assembly_id, AVG(unit_cost) AS mean_val\n  FROM SupplyChainParts\n  GROUP BY assembly_id\n),\nstage2 AS (\n  SELECT assembly_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(unit_cost) AS mean_val\n  FROM SupplyChainParts\n  GROUP BY assembly_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "SupplyChainParts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 665,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 65",
    "title": "Chained CTEs: Level 05: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 56,
    "table": "InvestmentAccounts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT portfolio_id, AVG(balance_usd) AS mean_val\n  FROM InvestmentAccounts\n  GROUP BY portfolio_id\n),\nstage2 AS (\n  SELECT portfolio_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(balance_usd) AS mean_val\n  FROM InvestmentAccounts\n  GROUP BY portfolio_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "portfolio_id",
        "options": [
          "portfolio_id",
          "account_id",
          "balance_usd",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "InvestmentAccounts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 666,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 66",
    "title": "Chained CTEs: Level 06: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 56,
    "table": "TradeOrders",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT desk_id, AVG(order_amount) AS mean_val\n  FROM TradeOrders\n  GROUP BY desk_id\n),\nstage2 AS (\n  SELECT desk_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(order_amount) AS mean_val\n  FROM TradeOrders\n  GROUP BY desk_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "order_id",
          "order_amount",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "TradeOrders",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 667,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 67",
    "title": "Chained CTEs: Level 07: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 56,
    "table": "CorporateStaff",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT dept_id, AVG(salary) AS mean_val\n  FROM CorporateStaff\n  GROUP BY dept_id\n),\nstage2 AS (\n  SELECT dept_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(salary) AS mean_val\n  FROM CorporateStaff\n  GROUP BY dept_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "dept_id",
        "options": [
          "dept_id",
          "emp_id",
          "salary",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "CorporateStaff",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 668,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 68",
    "title": "Chained CTEs: Level 08: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 57,
    "table": "ProductCatalog",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT category_id, AVG(unit_price) AS mean_val\n  FROM ProductCatalog\n  GROUP BY category_id\n),\nstage2 AS (\n  SELECT category_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(unit_price) AS mean_val\n  FROM ProductCatalog\n  GROUP BY category_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "category_id",
        "options": [
          "category_id",
          "product_id",
          "unit_price",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "ProductCatalog",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 669,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 69",
    "title": "Chained CTEs: Level 09: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 57,
    "table": "ClientInvoices",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT client_id, AVG(invoice_total) AS mean_val\n  FROM ClientInvoices\n  GROUP BY client_id\n),\nstage2 AS (\n  SELECT client_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(invoice_total) AS mean_val\n  FROM ClientInvoices\n  GROUP BY client_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "client_id",
        "options": [
          "client_id",
          "invoice_id",
          "invoice_total",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "ClientInvoices",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 670,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 70",
    "title": "Chained CTEs: Level 10: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 58,
    "table": "LedgerAccounts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT fund_id, AVG(current_balance) AS mean_val\n  FROM LedgerAccounts\n  GROUP BY fund_id\n),\nstage2 AS (\n  SELECT fund_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(current_balance) AS mean_val\n  FROM LedgerAccounts\n  GROUP BY fund_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "LedgerAccounts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 671,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 71",
    "title": "Chained CTEs: Level 11: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 58,
    "table": "CustomerAudits",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT region_code, AVG(credit_limit) AS mean_val\n  FROM CustomerAudits\n  GROUP BY region_code\n),\nstage2 AS (\n  SELECT region_code, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(credit_limit) AS mean_val\n  FROM CustomerAudits\n  GROUP BY region_code\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "region_code",
        "options": [
          "region_code",
          "cust_id",
          "credit_limit",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "CustomerAudits",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 672,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 72",
    "title": "Chained CTEs: Level 12: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 58,
    "table": "SupplyChainParts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT assembly_id, AVG(unit_cost) AS mean_val\n  FROM SupplyChainParts\n  GROUP BY assembly_id\n),\nstage2 AS (\n  SELECT assembly_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(unit_cost) AS mean_val\n  FROM SupplyChainParts\n  GROUP BY assembly_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "SupplyChainParts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 673,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 73",
    "title": "Chained CTEs: Level 13: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 59,
    "table": "InvestmentAccounts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, portfolio_id VARCHAR, balance_usd DECIMAL, opened_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT portfolio_id, AVG(balance_usd) AS mean_val\n  FROM InvestmentAccounts\n  GROUP BY portfolio_id\n),\nstage2 AS (\n  SELECT portfolio_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(balance_usd) AS mean_val\n  FROM InvestmentAccounts\n  GROUP BY portfolio_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "portfolio_id",
        "options": [
          "portfolio_id",
          "account_id",
          "balance_usd",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "InvestmentAccounts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 674,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 74",
    "title": "Chained CTEs: Level 14: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 59,
    "table": "TradeOrders",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "TradeOrders(order_id INT, desk_id VARCHAR, order_amount DECIMAL, executed_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT desk_id, AVG(order_amount) AS mean_val\n  FROM TradeOrders\n  GROUP BY desk_id\n),\nstage2 AS (\n  SELECT desk_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(order_amount) AS mean_val\n  FROM TradeOrders\n  GROUP BY desk_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "desk_id",
        "options": [
          "desk_id",
          "order_id",
          "order_amount",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "TradeOrders",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 675,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "CTE Lvl 75",
    "title": "Chained CTEs: Level 15: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 60,
    "table": "CorporateStaff",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "CorporateStaff(emp_id INT, dept_id VARCHAR, salary DECIMAL, hired_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT dept_id, AVG(salary) AS mean_val\n  FROM CorporateStaff\n  GROUP BY dept_id\n),\nstage2 AS (\n  SELECT dept_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(salary) AS mean_val\n  FROM CorporateStaff\n  GROUP BY dept_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "dept_id",
        "options": [
          "dept_id",
          "emp_id",
          "salary",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "CorporateStaff",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 676,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 76",
    "title": "Chained CTEs: Level 16: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 60,
    "table": "ProductCatalog",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "ProductCatalog(product_id INT, category_id VARCHAR, unit_price DECIMAL, created_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT category_id, AVG(unit_price) AS mean_val\n  FROM ProductCatalog\n  GROUP BY category_id\n),\nstage2 AS (\n  SELECT category_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(unit_price) AS mean_val\n  FROM ProductCatalog\n  GROUP BY category_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "category_id",
        "options": [
          "category_id",
          "product_id",
          "unit_price",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "ProductCatalog",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 677,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 77",
    "title": "Chained CTEs: Level 17: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 60,
    "table": "ClientInvoices",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, client_id VARCHAR, invoice_total DECIMAL, issue_date DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT client_id, AVG(invoice_total) AS mean_val\n  FROM ClientInvoices\n  GROUP BY client_id\n),\nstage2 AS (\n  SELECT client_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(invoice_total) AS mean_val\n  FROM ClientInvoices\n  GROUP BY client_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "client_id",
        "options": [
          "client_id",
          "invoice_id",
          "invoice_total",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "ClientInvoices",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 678,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 78",
    "title": "Chained CTEs: Level 18: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 61,
    "table": "LedgerAccounts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, fund_id VARCHAR, current_balance DECIMAL, created_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT fund_id, AVG(current_balance) AS mean_val\n  FROM LedgerAccounts\n  GROUP BY fund_id\n),\nstage2 AS (\n  SELECT fund_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(current_balance) AS mean_val\n  FROM LedgerAccounts\n  GROUP BY fund_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "ledger_id",
          "current_balance",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "LedgerAccounts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 679,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 79",
    "title": "Chained CTEs: Level 19: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 61,
    "table": "CustomerAudits",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "CustomerAudits(cust_id INT, region_code VARCHAR, credit_limit DECIMAL, onboarded_at DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT region_code, AVG(credit_limit) AS mean_val\n  FROM CustomerAudits\n  GROUP BY region_code\n),\nstage2 AS (\n  SELECT region_code, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(credit_limit) AS mean_val\n  FROM CustomerAudits\n  GROUP BY region_code\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "region_code",
        "options": [
          "region_code",
          "cust_id",
          "credit_limit",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "CustomerAudits",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 680,
    "discipline": "CHAINED CTES (WITH ... AS)",
    "disciplineKey": "chained_ctes",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 80",
    "title": "Chained CTEs: Level 20: Multi-CTE Sequential Staging",
    "subtitle": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (CHAINED CTES (WITH ... AS))",
    "subcluster": "CHAINED CTES (WITH ... AS) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "xp": 62,
    "table": "SupplyChainParts",
    "scenario": "Chain stage1 and stage2 with comma separators to build a clean pipeline.",
    "businessObjective": "Define multiple chained CTEs separated by commas without repeating the WITH keyword.",
    "schemaSnippet": "SupplyChainParts(part_id INT, assembly_id VARCHAR, unit_cost DECIMAL, manufacture_date DATE)",
    "targetQuery": "WITH stage1 AS (\n  SELECT assembly_id, AVG(unit_cost) AS mean_val\n  FROM SupplyChainParts\n  GROUP BY assembly_id\n),\nstage2 AS (\n  SELECT assembly_id, mean_val\n  FROM stage1\n  WHERE mean_val > 5000\n)\nSELECT * FROM stage2;",
    "template": [
      {
        "text": "WITH stage1 AS (\n  SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ GROUP KEY ]"
      },
      {
        "text": ", AVG(unit_cost) AS mean_val\n  FROM SupplyChainParts\n  GROUP BY assembly_id\n)",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SEPARATOR ]"
      },
      {
        "text": "\nstage2 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ AS ]"
      },
      {
        "text": " (\n  SELECT * FROM stage1 WHERE mean_val > 5000\n)\nSELECT * FROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL TARGET ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "assembly_id",
        "options": [
          "assembly_id",
          "part_id",
          "unit_cost",
          "1"
        ]
      },
      "slot2": {
        "correct": ",",
        "options": [
          ",",
          ";",
          "WITH",
          "AND"
        ]
      },
      "slot3": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "THEN",
          "VIEW"
        ]
      },
      "slot4": {
        "correct": "stage2",
        "options": [
          "stage2",
          "stage1",
          "SupplyChainParts",
          "pipeline"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. CTEs in PostgreSQL 11 and earlier were strict optimization fences (preventing predicate pushdown). Modern engines inline CTEs unless declared AS MATERIALIZED."
  },
  {
    "id": 681,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 81",
    "title": "Recursive CTE: Level 01: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 62,
    "table": "InvestmentAccounts",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, manager_id INT, portfolio_id VARCHAR, balance_usd DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT account_id, manager_id, 0 AS depth\n  FROM InvestmentAccounts\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.account_id, c.manager_id, p.depth + 1\n  FROM InvestmentAccounts c\n  JOIN tree p ON c.manager_id = p.account_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT account_id, manager_id, 0 AS depth\n  FROM InvestmentAccounts\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.account_id, c.manager_id, p.depth + 1\n  FROM InvestmentAccounts c\n  JOIN tree p ON c.manager_id = p.account_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 682,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 82",
    "title": "Recursive CTE: Level 02: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 62,
    "table": "TradeOrders",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "TradeOrders(order_id INT, manager_id INT, desk_id VARCHAR, order_amount DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT order_id, manager_id, 0 AS depth\n  FROM TradeOrders\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.order_id, c.manager_id, p.depth + 1\n  FROM TradeOrders c\n  JOIN tree p ON c.manager_id = p.order_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT order_id, manager_id, 0 AS depth\n  FROM TradeOrders\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.order_id, c.manager_id, p.depth + 1\n  FROM TradeOrders c\n  JOIN tree p ON c.manager_id = p.order_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 683,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 83",
    "title": "Recursive CTE: Level 03: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 63,
    "table": "CorporateStaff",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "CorporateStaff(emp_id INT, manager_id INT, dept_id VARCHAR, salary DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT emp_id, manager_id, 0 AS depth\n  FROM CorporateStaff\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.emp_id, c.manager_id, p.depth + 1\n  FROM CorporateStaff c\n  JOIN tree p ON c.manager_id = p.emp_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT emp_id, manager_id, 0 AS depth\n  FROM CorporateStaff\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.emp_id, c.manager_id, p.depth + 1\n  FROM CorporateStaff c\n  JOIN tree p ON c.manager_id = p.emp_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 684,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 84",
    "title": "Recursive CTE: Level 04: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 63,
    "table": "ProductCatalog",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "ProductCatalog(product_id INT, parent_id INT, category_id VARCHAR, unit_price DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT product_id, parent_id, 0 AS depth\n  FROM ProductCatalog\n  WHERE parent_id IS NULL\n  UNION ALL\n  SELECT c.product_id, c.parent_id, p.depth + 1\n  FROM ProductCatalog c\n  JOIN tree p ON c.parent_id = p.product_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT product_id, parent_id, 0 AS depth\n  FROM ProductCatalog\n  WHERE parent_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.product_id, c.parent_id, p.depth + 1\n  FROM ProductCatalog c\n  JOIN tree p ON c.parent_id = p.product_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 685,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 85",
    "title": "Recursive CTE: Level 05: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 64,
    "table": "ClientInvoices",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, manager_id INT, client_id VARCHAR, invoice_total DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT invoice_id, manager_id, 0 AS depth\n  FROM ClientInvoices\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.invoice_id, c.manager_id, p.depth + 1\n  FROM ClientInvoices c\n  JOIN tree p ON c.manager_id = p.invoice_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT invoice_id, manager_id, 0 AS depth\n  FROM ClientInvoices\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.invoice_id, c.manager_id, p.depth + 1\n  FROM ClientInvoices c\n  JOIN tree p ON c.manager_id = p.invoice_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 686,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 86",
    "title": "Recursive CTE: Level 06: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 64,
    "table": "LedgerAccounts",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, parent_ledger_id INT, fund_id VARCHAR, current_balance DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT ledger_id, parent_ledger_id, 0 AS depth\n  FROM LedgerAccounts\n  WHERE parent_ledger_id IS NULL\n  UNION ALL\n  SELECT c.ledger_id, c.parent_ledger_id, p.depth + 1\n  FROM LedgerAccounts c\n  JOIN tree p ON c.parent_ledger_id = p.ledger_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT ledger_id, parent_ledger_id, 0 AS depth\n  FROM LedgerAccounts\n  WHERE parent_ledger_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.ledger_id, c.parent_ledger_id, p.depth + 1\n  FROM LedgerAccounts c\n  JOIN tree p ON c.parent_ledger_id = p.ledger_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 687,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 87",
    "title": "Recursive CTE: Level 07: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 64,
    "table": "CustomerAudits",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "CustomerAudits(cust_id INT, manager_id INT, region_code VARCHAR, credit_limit DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT cust_id, manager_id, 0 AS depth\n  FROM CustomerAudits\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.cust_id, c.manager_id, p.depth + 1\n  FROM CustomerAudits c\n  JOIN tree p ON c.manager_id = p.cust_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT cust_id, manager_id, 0 AS depth\n  FROM CustomerAudits\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.cust_id, c.manager_id, p.depth + 1\n  FROM CustomerAudits c\n  JOIN tree p ON c.manager_id = p.cust_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 688,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 88",
    "title": "Recursive CTE: Level 08: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 65,
    "table": "SupplyChainParts",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "SupplyChainParts(part_id INT, parent_part_id INT, assembly_id VARCHAR, unit_cost DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT part_id, parent_part_id, 0 AS depth\n  FROM SupplyChainParts\n  WHERE parent_part_id IS NULL\n  UNION ALL\n  SELECT c.part_id, c.parent_part_id, p.depth + 1\n  FROM SupplyChainParts c\n  JOIN tree p ON c.parent_part_id = p.part_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT part_id, parent_part_id, 0 AS depth\n  FROM SupplyChainParts\n  WHERE parent_part_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.part_id, c.parent_part_id, p.depth + 1\n  FROM SupplyChainParts c\n  JOIN tree p ON c.parent_part_id = p.part_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 689,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 89",
    "title": "Recursive CTE: Level 09: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 65,
    "table": "InvestmentAccounts",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, manager_id INT, portfolio_id VARCHAR, balance_usd DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT account_id, manager_id, 0 AS depth\n  FROM InvestmentAccounts\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.account_id, c.manager_id, p.depth + 1\n  FROM InvestmentAccounts c\n  JOIN tree p ON c.manager_id = p.account_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT account_id, manager_id, 0 AS depth\n  FROM InvestmentAccounts\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.account_id, c.manager_id, p.depth + 1\n  FROM InvestmentAccounts c\n  JOIN tree p ON c.manager_id = p.account_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 690,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 90",
    "title": "Recursive CTE: Level 10: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 66,
    "table": "TradeOrders",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "TradeOrders(order_id INT, manager_id INT, desk_id VARCHAR, order_amount DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT order_id, manager_id, 0 AS depth\n  FROM TradeOrders\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.order_id, c.manager_id, p.depth + 1\n  FROM TradeOrders c\n  JOIN tree p ON c.manager_id = p.order_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT order_id, manager_id, 0 AS depth\n  FROM TradeOrders\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.order_id, c.manager_id, p.depth + 1\n  FROM TradeOrders c\n  JOIN tree p ON c.manager_id = p.order_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 691,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 91",
    "title": "Recursive CTE: Level 11: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 66,
    "table": "CorporateStaff",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "CorporateStaff(emp_id INT, manager_id INT, dept_id VARCHAR, salary DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT emp_id, manager_id, 0 AS depth\n  FROM CorporateStaff\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.emp_id, c.manager_id, p.depth + 1\n  FROM CorporateStaff c\n  JOIN tree p ON c.manager_id = p.emp_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT emp_id, manager_id, 0 AS depth\n  FROM CorporateStaff\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.emp_id, c.manager_id, p.depth + 1\n  FROM CorporateStaff c\n  JOIN tree p ON c.manager_id = p.emp_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 692,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 92",
    "title": "Recursive CTE: Level 12: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 66,
    "table": "ProductCatalog",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "ProductCatalog(product_id INT, parent_id INT, category_id VARCHAR, unit_price DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT product_id, parent_id, 0 AS depth\n  FROM ProductCatalog\n  WHERE parent_id IS NULL\n  UNION ALL\n  SELECT c.product_id, c.parent_id, p.depth + 1\n  FROM ProductCatalog c\n  JOIN tree p ON c.parent_id = p.product_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT product_id, parent_id, 0 AS depth\n  FROM ProductCatalog\n  WHERE parent_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.product_id, c.parent_id, p.depth + 1\n  FROM ProductCatalog c\n  JOIN tree p ON c.parent_id = p.product_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 693,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 93",
    "title": "Recursive CTE: Level 13: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 67,
    "table": "ClientInvoices",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "ClientInvoices(invoice_id INT, manager_id INT, client_id VARCHAR, invoice_total DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT invoice_id, manager_id, 0 AS depth\n  FROM ClientInvoices\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.invoice_id, c.manager_id, p.depth + 1\n  FROM ClientInvoices c\n  JOIN tree p ON c.manager_id = p.invoice_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT invoice_id, manager_id, 0 AS depth\n  FROM ClientInvoices\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.invoice_id, c.manager_id, p.depth + 1\n  FROM ClientInvoices c\n  JOIN tree p ON c.manager_id = p.invoice_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 694,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 94",
    "title": "Recursive CTE: Level 14: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 67,
    "table": "LedgerAccounts",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "LedgerAccounts(ledger_id INT, parent_ledger_id INT, fund_id VARCHAR, current_balance DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT ledger_id, parent_ledger_id, 0 AS depth\n  FROM LedgerAccounts\n  WHERE parent_ledger_id IS NULL\n  UNION ALL\n  SELECT c.ledger_id, c.parent_ledger_id, p.depth + 1\n  FROM LedgerAccounts c\n  JOIN tree p ON c.parent_ledger_id = p.ledger_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT ledger_id, parent_ledger_id, 0 AS depth\n  FROM LedgerAccounts\n  WHERE parent_ledger_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.ledger_id, c.parent_ledger_id, p.depth + 1\n  FROM LedgerAccounts c\n  JOIN tree p ON c.parent_ledger_id = p.ledger_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 695,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 95",
    "title": "Recursive CTE: Level 15: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 68,
    "table": "CustomerAudits",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "CustomerAudits(cust_id INT, manager_id INT, region_code VARCHAR, credit_limit DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT cust_id, manager_id, 0 AS depth\n  FROM CustomerAudits\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.cust_id, c.manager_id, p.depth + 1\n  FROM CustomerAudits c\n  JOIN tree p ON c.manager_id = p.cust_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT cust_id, manager_id, 0 AS depth\n  FROM CustomerAudits\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.cust_id, c.manager_id, p.depth + 1\n  FROM CustomerAudits c\n  JOIN tree p ON c.manager_id = p.cust_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 696,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 96",
    "title": "Recursive CTE: Level 16: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 68,
    "table": "SupplyChainParts",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "SupplyChainParts(part_id INT, parent_part_id INT, assembly_id VARCHAR, unit_cost DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT part_id, parent_part_id, 0 AS depth\n  FROM SupplyChainParts\n  WHERE parent_part_id IS NULL\n  UNION ALL\n  SELECT c.part_id, c.parent_part_id, p.depth + 1\n  FROM SupplyChainParts c\n  JOIN tree p ON c.parent_part_id = p.part_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT part_id, parent_part_id, 0 AS depth\n  FROM SupplyChainParts\n  WHERE parent_part_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.part_id, c.parent_part_id, p.depth + 1\n  FROM SupplyChainParts c\n  JOIN tree p ON c.parent_part_id = p.part_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 697,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 97",
    "title": "Recursive CTE: Level 17: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 68,
    "table": "InvestmentAccounts",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "InvestmentAccounts(account_id INT, manager_id INT, portfolio_id VARCHAR, balance_usd DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT account_id, manager_id, 0 AS depth\n  FROM InvestmentAccounts\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.account_id, c.manager_id, p.depth + 1\n  FROM InvestmentAccounts c\n  JOIN tree p ON c.manager_id = p.account_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT account_id, manager_id, 0 AS depth\n  FROM InvestmentAccounts\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.account_id, c.manager_id, p.depth + 1\n  FROM InvestmentAccounts c\n  JOIN tree p ON c.manager_id = p.account_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 698,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 98",
    "title": "Recursive CTE: Level 18: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 69,
    "table": "TradeOrders",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "TradeOrders(order_id INT, manager_id INT, desk_id VARCHAR, order_amount DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT order_id, manager_id, 0 AS depth\n  FROM TradeOrders\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.order_id, c.manager_id, p.depth + 1\n  FROM TradeOrders c\n  JOIN tree p ON c.manager_id = p.order_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT order_id, manager_id, 0 AS depth\n  FROM TradeOrders\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.order_id, c.manager_id, p.depth + 1\n  FROM TradeOrders c\n  JOIN tree p ON c.manager_id = p.order_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 699,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 99",
    "title": "Recursive CTE: Level 19: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 69,
    "table": "CorporateStaff",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "CorporateStaff(emp_id INT, manager_id INT, dept_id VARCHAR, salary DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT emp_id, manager_id, 0 AS depth\n  FROM CorporateStaff\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT c.emp_id, c.manager_id, p.depth + 1\n  FROM CorporateStaff c\n  JOIN tree p ON c.manager_id = p.emp_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT emp_id, manager_id, 0 AS depth\n  FROM CorporateStaff\n  WHERE manager_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.emp_id, c.manager_id, p.depth + 1\n  FROM CorporateStaff c\n  JOIN tree p ON c.manager_id = p.emp_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  },
  {
    "id": 700,
    "discipline": "RECURSIVE CTES (WITH RECURSIVE)",
    "disciplineKey": "recursive_ctes",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "CTE Lvl 100",
    "title": "Recursive CTE: Level 20: Guarded Depth Rollup",
    "subtitle": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "type": "fill_blank",
    "category": "Section 07: Subqueries & CTEs (RECURSIVE CTES (WITH RECURSIVE))",
    "subcluster": "RECURSIVE CTES (WITH RECURSIVE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "xp": 70,
    "table": "ProductCatalog",
    "scenario": "Enforce a strict depth cutoff (e.g. depth < 5) to prevent runaway recursive cycles.",
    "businessObjective": "Safely traverse hierarchy trees with termination guardrails in the recursive member.",
    "schemaSnippet": "ProductCatalog(product_id INT, parent_id INT, category_id VARCHAR, unit_price DECIMAL)",
    "targetQuery": "WITH RECURSIVE tree AS (\n  SELECT product_id, parent_id, 0 AS depth\n  FROM ProductCatalog\n  WHERE parent_id IS NULL\n  UNION ALL\n  SELECT c.product_id, c.parent_id, p.depth + 1\n  FROM ProductCatalog c\n  JOIN tree p ON c.parent_id = p.product_id\n  WHERE p.depth < 5\n)\nSELECT * FROM tree ORDER BY depth ASC;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ WITH RECURSIVE ]"
      },
      {
        "text": " tree AS (\n  SELECT product_id, parent_id, 0 AS depth\n  FROM ProductCatalog\n  WHERE parent_id IS NULL\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNION OP ]"
      },
      {
        "text": "\n  SELECT c.product_id, c.parent_id, p.depth + 1\n  FROM ProductCatalog c\n  JOIN tree p ON c.parent_id = p.product_id\n  WHERE p.depth ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GUARD OP ]"
      },
      {
        "text": " 5\n)\nSELECT * FROM tree ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WITH RECURSIVE",
        "options": [
          "WITH RECURSIVE",
          "WITH ITERATE",
          "RECURSIVE WITH",
          "WITH LOOP"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "MERGE",
          "APPEND"
        ]
      },
      "slot3": {
        "correct": "<",
        "options": [
          "<",
          "<=",
          ">",
          "!="
        ]
      },
      "slot4": {
        "correct": "ORDER BY depth ASC",
        "options": [
          "ORDER BY depth ASC",
          "ORDER BY depth DESC",
          "GROUP BY depth",
          "LIMIT 100"
        ]
      }
    },
    "explanation": "Subquery/CTE decomposes complex logic into modular, readable relational pipelines. Infinite loop runaway! If your recursive step lacks a termination condition (e.g. depth < 10) or cycles exist in the data graph, the query will loop until memory exhaustion. In PostgreSQL, set max_parallel_workers or check cycle."
  }
];
