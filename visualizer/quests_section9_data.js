// =============================================================================
// SECTION 09: SET OPERATIONS & SCHEMA HARMONIZATION ARENA (100 INTERACTIVE QUESTS)
// 5 Disciplines x 20 Levels (UNION ALL, UNION, INTERSECT, EXCEPT, Harmonization)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.SET_DISCIPLINES_METADATA = [
  {
    "key": "union_all",
    "name": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "symbol": "⧺",
    "color": "#38bdf8",
    "concept": "Zero-Sort Row Appending",
    "whenToUse": "When combining data from multiple identical or compatible tables where duplicates are either impossible or desired (e.g. streaming event logs, historical transaction partitions).",
    "scenarios": "Consolidating current month transactions with archived cold ledger partitions; Merging domestic and cross-border trade logs; Ingesting distributed event streams.",
    "traps": "ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "key": "union",
    "name": "DEDUPLICATION SET UNIONS (UNION)",
    "symbol": "∪",
    "color": "#10b981",
    "concept": "Distinct Relational Union (Set Elimination)",
    "whenToUse": "When merging client lists, contact channels, or event logs from disparate source systems where duplicate records must be collapsed into a single distinct representation.",
    "scenarios": "Merging legacy CRM leads with new marketing automation lists; Consolidating unique securities held across multiple institutional funds; Creating master customer registries.",
    "traps": "ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "key": "intersect",
    "name": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "symbol": "∩",
    "color": "#f59e0b",
    "concept": "Shared Relational Membership",
    "whenToUse": "When identifying records or entities that exist simultaneously in two or more independent datasets without writing complex multi-table joins.",
    "scenarios": "Finding omnichannel high-net-worth clients enrolled in both brokerage trading and private wealth management; Identifying assets held simultaneously in long and short portfolios; Cross-sell audience matching.",
    "traps": "DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "key": "except_minus",
    "name": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "symbol": "∖",
    "color": "#ec4899",
    "concept": "Anti-Set Exclusion & Delta Finding",
    "whenToUse": "When auditing ledger discrepancies, finding missing clearing transactions, or identifying inactive/churned customer entities.",
    "scenarios": "Ledger break reconciliation: Finding trades recorded in internal front-office OMS but missing from custodian clearinghouse files; Identifying users who registered but never placed an order.",
    "traps": "ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "key": "schema_harmonization",
    "name": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "symbol": "🧩",
    "color": "#a855f7",
    "concept": "Disparate Schema Padding & Normalization",
    "whenToUse": "When stacking tables that share core metrics but have different numbers of columns, requiring synthetic NULL padding or default literals.",
    "scenarios": "Merging modern trading ledger with legacy mainframe export (padding missing risk columns with NULL); Unifying acquisition target client schemas with the parent bank format; Multi-region regulatory filing alignment.",
    "traps": "COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  }
];

window.QUESTS_SECTION_9 = [
  {
    "id": 801,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 01",
    "title": "UNION ALL: Level 01: High-Throughput Ledger Append",
    "subtitle": "Stack DomesticTrades and OffshoreTrades records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 30,
    "table": "DomesticTrades",
    "scenario": "Stack DomesticTrades and OffshoreTrades records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "DomesticTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, broker_id, trade_amount\nFROM DomesticTrades\nUNION ALL\nSELECT trade_id, broker_id, trade_amount\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, broker_id, trade_amount\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, broker_id, trade_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 802,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 02",
    "title": "UNION ALL: Level 02: High-Throughput Ledger Append",
    "subtitle": "Stack OnlineOrders and RetailStoreOrders records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 30,
    "table": "OnlineOrders",
    "scenario": "Stack OnlineOrders and RetailStoreOrders records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "OnlineOrders(order_id INT, customer_id VARCHAR, order_total DECIMAL) | RetailStoreOrders(order_id INT, customer_id VARCHAR, order_total DECIMAL)",
    "targetQuery": "SELECT order_id, customer_id, order_total\nFROM OnlineOrders\nUNION ALL\nSELECT order_id, customer_id, order_total\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id, customer_id, order_total\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT order_id, customer_id, order_total\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "RetailStoreOrders",
        "options": [
          "RetailStoreOrders",
          "OnlineOrders_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 803,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 03",
    "title": "UNION ALL: Level 03: High-Throughput Ledger Append",
    "subtitle": "Stack BrokerageClients and WealthClients records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 31,
    "table": "BrokerageClients",
    "scenario": "Stack BrokerageClients and WealthClients records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "BrokerageClients(client_id INT, branch_code VARCHAR, portfolio_value DECIMAL) | WealthClients(client_id INT, branch_code VARCHAR, portfolio_value DECIMAL)",
    "targetQuery": "SELECT client_id, branch_code, portfolio_value\nFROM BrokerageClients\nUNION ALL\nSELECT client_id, branch_code, portfolio_value\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, branch_code, portfolio_value\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, branch_code, portfolio_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 804,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 04",
    "title": "UNION ALL: Level 04: High-Throughput Ledger Append",
    "subtitle": "Stack FrontOfficeTrades and CustodianClearing records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 31,
    "table": "FrontOfficeTrades",
    "scenario": "Stack FrontOfficeTrades and CustodianClearing records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, counterparty_id VARCHAR, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, counterparty_id VARCHAR, settlement_amt DECIMAL)",
    "targetQuery": "SELECT trade_id, counterparty_id, settlement_amt\nFROM FrontOfficeTrades\nUNION ALL\nSELECT trade_id, counterparty_id, settlement_amt\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id, counterparty_id, settlement_amt\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, counterparty_id, settlement_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "CustodianClearing",
        "options": [
          "CustodianClearing",
          "FrontOfficeTrades_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 805,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 05",
    "title": "UNION ALL: Level 05: High-Throughput Ledger Append",
    "subtitle": "Stack ActiveSubscribers and MarketingLeads records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 32,
    "table": "ActiveSubscribers",
    "scenario": "Stack ActiveSubscribers and MarketingLeads records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, campaign_id VARCHAR, lifetime_value DECIMAL) | MarketingLeads(user_id INT, campaign_id VARCHAR, lifetime_value DECIMAL)",
    "targetQuery": "SELECT user_id, campaign_id, lifetime_value\nFROM ActiveSubscribers\nUNION ALL\nSELECT user_id, campaign_id, lifetime_value\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id, campaign_id, lifetime_value\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT user_id, campaign_id, lifetime_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 806,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 06",
    "title": "UNION ALL: Level 06: High-Throughput Ledger Append",
    "subtitle": "Stack BranchAccounts and DigitalAccounts records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 32,
    "table": "BranchAccounts",
    "scenario": "Stack BranchAccounts and DigitalAccounts records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "BranchAccounts(account_id INT, region_code VARCHAR, balance_usd DECIMAL) | DigitalAccounts(account_id INT, region_code VARCHAR, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id, region_code, balance_usd\nFROM BranchAccounts\nUNION ALL\nSELECT account_id, region_code, balance_usd\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id, region_code, balance_usd\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT account_id, region_code, balance_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "BranchAccounts_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 807,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 07",
    "title": "UNION ALL: Level 07: High-Throughput Ledger Append",
    "subtitle": "Stack Q1Expenses and Q2Expenses records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 32,
    "table": "Q1Expenses",
    "scenario": "Stack Q1Expenses and Q2Expenses records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "Q1Expenses(expense_id INT, dept_id VARCHAR, amount_usd DECIMAL) | Q2Expenses(expense_id INT, dept_id VARCHAR, amount_usd DECIMAL)",
    "targetQuery": "SELECT expense_id, dept_id, amount_usd\nFROM Q1Expenses\nUNION ALL\nSELECT expense_id, dept_id, amount_usd\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id, dept_id, amount_usd\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT expense_id, dept_id, amount_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 808,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 08",
    "title": "UNION ALL: Level 08: High-Throughput Ledger Append",
    "subtitle": "Stack EquityHoldings and BondHoldings records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 33,
    "table": "EquityHoldings",
    "scenario": "Stack EquityHoldings and BondHoldings records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "EquityHoldings(security_id INT, fund_id VARCHAR, market_value DECIMAL) | BondHoldings(security_id INT, fund_id VARCHAR, market_value DECIMAL)",
    "targetQuery": "SELECT security_id, fund_id, market_value\nFROM EquityHoldings\nUNION ALL\nSELECT security_id, fund_id, market_value\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id, fund_id, market_value\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT security_id, fund_id, market_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "EquityHoldings_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 809,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 09",
    "title": "UNION ALL: Level 09: High-Throughput Ledger Append",
    "subtitle": "Stack DomesticTrades and OffshoreTrades records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 33,
    "table": "DomesticTrades",
    "scenario": "Stack DomesticTrades and OffshoreTrades records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "DomesticTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, broker_id, trade_amount\nFROM DomesticTrades\nUNION ALL\nSELECT trade_id, broker_id, trade_amount\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, broker_id, trade_amount\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, broker_id, trade_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 810,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 10",
    "title": "UNION ALL: Level 10: High-Throughput Ledger Append",
    "subtitle": "Stack OnlineOrders and RetailStoreOrders records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 34,
    "table": "OnlineOrders",
    "scenario": "Stack OnlineOrders and RetailStoreOrders records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "OnlineOrders(order_id INT, customer_id VARCHAR, order_total DECIMAL) | RetailStoreOrders(order_id INT, customer_id VARCHAR, order_total DECIMAL)",
    "targetQuery": "SELECT order_id, customer_id, order_total\nFROM OnlineOrders\nUNION ALL\nSELECT order_id, customer_id, order_total\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id, customer_id, order_total\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT order_id, customer_id, order_total\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "RetailStoreOrders",
        "options": [
          "RetailStoreOrders",
          "OnlineOrders_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 811,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 11",
    "title": "UNION ALL: Level 11: High-Throughput Ledger Append",
    "subtitle": "Stack BrokerageClients and WealthClients records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 34,
    "table": "BrokerageClients",
    "scenario": "Stack BrokerageClients and WealthClients records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "BrokerageClients(client_id INT, branch_code VARCHAR, portfolio_value DECIMAL) | WealthClients(client_id INT, branch_code VARCHAR, portfolio_value DECIMAL)",
    "targetQuery": "SELECT client_id, branch_code, portfolio_value\nFROM BrokerageClients\nUNION ALL\nSELECT client_id, branch_code, portfolio_value\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, branch_code, portfolio_value\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, branch_code, portfolio_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 812,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 12",
    "title": "UNION ALL: Level 12: High-Throughput Ledger Append",
    "subtitle": "Stack FrontOfficeTrades and CustodianClearing records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 34,
    "table": "FrontOfficeTrades",
    "scenario": "Stack FrontOfficeTrades and CustodianClearing records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, counterparty_id VARCHAR, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, counterparty_id VARCHAR, settlement_amt DECIMAL)",
    "targetQuery": "SELECT trade_id, counterparty_id, settlement_amt\nFROM FrontOfficeTrades\nUNION ALL\nSELECT trade_id, counterparty_id, settlement_amt\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id, counterparty_id, settlement_amt\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, counterparty_id, settlement_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "CustodianClearing",
        "options": [
          "CustodianClearing",
          "FrontOfficeTrades_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 813,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 13",
    "title": "UNION ALL: Level 13: High-Throughput Ledger Append",
    "subtitle": "Stack ActiveSubscribers and MarketingLeads records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 35,
    "table": "ActiveSubscribers",
    "scenario": "Stack ActiveSubscribers and MarketingLeads records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, campaign_id VARCHAR, lifetime_value DECIMAL) | MarketingLeads(user_id INT, campaign_id VARCHAR, lifetime_value DECIMAL)",
    "targetQuery": "SELECT user_id, campaign_id, lifetime_value\nFROM ActiveSubscribers\nUNION ALL\nSELECT user_id, campaign_id, lifetime_value\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id, campaign_id, lifetime_value\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT user_id, campaign_id, lifetime_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 814,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 14",
    "title": "UNION ALL: Level 14: High-Throughput Ledger Append",
    "subtitle": "Stack BranchAccounts and DigitalAccounts records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 35,
    "table": "BranchAccounts",
    "scenario": "Stack BranchAccounts and DigitalAccounts records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "BranchAccounts(account_id INT, region_code VARCHAR, balance_usd DECIMAL) | DigitalAccounts(account_id INT, region_code VARCHAR, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id, region_code, balance_usd\nFROM BranchAccounts\nUNION ALL\nSELECT account_id, region_code, balance_usd\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id, region_code, balance_usd\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT account_id, region_code, balance_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "BranchAccounts_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 815,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 15",
    "title": "UNION ALL: Level 15: High-Throughput Ledger Append",
    "subtitle": "Stack Q1Expenses and Q2Expenses records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 36,
    "table": "Q1Expenses",
    "scenario": "Stack Q1Expenses and Q2Expenses records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "Q1Expenses(expense_id INT, dept_id VARCHAR, amount_usd DECIMAL) | Q2Expenses(expense_id INT, dept_id VARCHAR, amount_usd DECIMAL)",
    "targetQuery": "SELECT expense_id, dept_id, amount_usd\nFROM Q1Expenses\nUNION ALL\nSELECT expense_id, dept_id, amount_usd\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id, dept_id, amount_usd\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT expense_id, dept_id, amount_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 816,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 16",
    "title": "UNION ALL: Level 16: High-Throughput Ledger Append",
    "subtitle": "Stack EquityHoldings and BondHoldings records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 36,
    "table": "EquityHoldings",
    "scenario": "Stack EquityHoldings and BondHoldings records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "EquityHoldings(security_id INT, fund_id VARCHAR, market_value DECIMAL) | BondHoldings(security_id INT, fund_id VARCHAR, market_value DECIMAL)",
    "targetQuery": "SELECT security_id, fund_id, market_value\nFROM EquityHoldings\nUNION ALL\nSELECT security_id, fund_id, market_value\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id, fund_id, market_value\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT security_id, fund_id, market_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "EquityHoldings_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 817,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 17",
    "title": "UNION ALL: Level 17: High-Throughput Ledger Append",
    "subtitle": "Stack DomesticTrades and OffshoreTrades records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 36,
    "table": "DomesticTrades",
    "scenario": "Stack DomesticTrades and OffshoreTrades records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "DomesticTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id, broker_id, trade_amount\nFROM DomesticTrades\nUNION ALL\nSELECT trade_id, broker_id, trade_amount\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, broker_id, trade_amount\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, broker_id, trade_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 818,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 18",
    "title": "UNION ALL: Level 18: High-Throughput Ledger Append",
    "subtitle": "Stack OnlineOrders and RetailStoreOrders records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 37,
    "table": "OnlineOrders",
    "scenario": "Stack OnlineOrders and RetailStoreOrders records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "OnlineOrders(order_id INT, customer_id VARCHAR, order_total DECIMAL) | RetailStoreOrders(order_id INT, customer_id VARCHAR, order_total DECIMAL)",
    "targetQuery": "SELECT order_id, customer_id, order_total\nFROM OnlineOrders\nUNION ALL\nSELECT order_id, customer_id, order_total\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id, customer_id, order_total\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT order_id, customer_id, order_total\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "RetailStoreOrders",
        "options": [
          "RetailStoreOrders",
          "OnlineOrders_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 819,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 19",
    "title": "UNION ALL: Level 19: High-Throughput Ledger Append",
    "subtitle": "Stack BrokerageClients and WealthClients records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 37,
    "table": "BrokerageClients",
    "scenario": "Stack BrokerageClients and WealthClients records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "BrokerageClients(client_id INT, branch_code VARCHAR, portfolio_value DECIMAL) | WealthClients(client_id INT, branch_code VARCHAR, portfolio_value DECIMAL)",
    "targetQuery": "SELECT client_id, branch_code, portfolio_value\nFROM BrokerageClients\nUNION ALL\nSELECT client_id, branch_code, portfolio_value\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, branch_code, portfolio_value\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, branch_code, portfolio_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 820,
    "discipline": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)",
    "disciplineKey": "union_all",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "SET Lvl 20",
    "title": "UNION ALL: Level 20: High-Throughput Ledger Append",
    "subtitle": "Stack FrontOfficeTrades and CustodianClearing records without sort deduplication.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL))",
    "subcluster": "HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL) (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "xp": 38,
    "table": "FrontOfficeTrades",
    "scenario": "Stack FrontOfficeTrades and CustodianClearing records without sort deduplication.",
    "businessObjective": "Append rows from both transaction tables using UNION ALL for maximum throughput.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, counterparty_id VARCHAR, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, counterparty_id VARCHAR, settlement_amt DECIMAL)",
    "targetQuery": "SELECT trade_id, counterparty_id, settlement_amt\nFROM FrontOfficeTrades\nUNION ALL\nSELECT trade_id, counterparty_id, settlement_amt\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id, counterparty_id, settlement_amt\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, counterparty_id, settlement_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "WHERE",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "CustodianClearing",
        "options": [
          "CustodianClearing",
          "FrontOfficeTrades_archive",
          "DUAL",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!"
  },
  {
    "id": 821,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 21",
    "title": "UNION: Level 01: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from ActiveSubscribers and MarketingLeads.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 38,
    "table": "ActiveSubscribers",
    "scenario": "Merge unique client identifiers from ActiveSubscribers and MarketingLeads.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, email VARCHAR) | MarketingLeads(user_id INT, email VARCHAR)",
    "targetQuery": "SELECT user_id, email\nFROM ActiveSubscribers\nUNION\nSELECT user_id, email\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id, email\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT user_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 822,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 22",
    "title": "UNION: Level 02: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 38,
    "table": "BranchAccounts",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id AS canonical_id, balance_usd AS balance\nFROM BranchAccounts\nUNION\nSELECT account_id, balance_usd\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", balance_usd AS balance\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " account_id, balance_usd\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "DigitalAccounts_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 823,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 23",
    "title": "UNION: Level 03: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from Q1Expenses and Q2Expenses.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 39,
    "table": "Q1Expenses",
    "scenario": "Merge unique client identifiers from Q1Expenses and Q2Expenses.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "Q1Expenses(expense_id INT, email VARCHAR) | Q2Expenses(expense_id INT, email VARCHAR)",
    "targetQuery": "SELECT expense_id, email\nFROM Q1Expenses\nUNION\nSELECT expense_id, email\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id, email\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT expense_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 824,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 24",
    "title": "UNION: Level 04: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 39,
    "table": "EquityHoldings",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL)",
    "targetQuery": "SELECT security_id AS canonical_id, market_value AS balance\nFROM EquityHoldings\nUNION\nSELECT security_id, market_value\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", market_value AS balance\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " security_id, market_value\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "BondHoldings_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 825,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 25",
    "title": "UNION: Level 05: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from DomesticTrades and OffshoreTrades.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 40,
    "table": "DomesticTrades",
    "scenario": "Merge unique client identifiers from DomesticTrades and OffshoreTrades.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "DomesticTrades(trade_id INT, email VARCHAR) | OffshoreTrades(trade_id INT, email VARCHAR)",
    "targetQuery": "SELECT trade_id, email\nFROM DomesticTrades\nUNION\nSELECT trade_id, email\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, email\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 826,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 26",
    "title": "UNION: Level 06: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 40,
    "table": "OnlineOrders",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "OnlineOrders(order_id INT, order_total DECIMAL) | RetailStoreOrders(order_id INT, order_total DECIMAL)",
    "targetQuery": "SELECT order_id AS canonical_id, order_total AS balance\nFROM OnlineOrders\nUNION\nSELECT order_id, order_total\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", order_total AS balance\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " order_id, order_total\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "RetailStoreOrders",
        "options": [
          "RetailStoreOrders",
          "RetailStoreOrders_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 827,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 27",
    "title": "UNION: Level 07: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from BrokerageClients and WealthClients.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 40,
    "table": "BrokerageClients",
    "scenario": "Merge unique client identifiers from BrokerageClients and WealthClients.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "BrokerageClients(client_id INT, email VARCHAR) | WealthClients(client_id INT, email VARCHAR)",
    "targetQuery": "SELECT client_id, email\nFROM BrokerageClients\nUNION\nSELECT client_id, email\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, email\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 828,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 28",
    "title": "UNION: Level 08: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 41,
    "table": "FrontOfficeTrades",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, settlement_amt DECIMAL)",
    "targetQuery": "SELECT trade_id AS canonical_id, settlement_amt AS balance\nFROM FrontOfficeTrades\nUNION\nSELECT trade_id, settlement_amt\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", settlement_amt AS balance\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " trade_id, settlement_amt\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "CustodianClearing",
        "options": [
          "CustodianClearing",
          "CustodianClearing_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 829,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 29",
    "title": "UNION: Level 09: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from ActiveSubscribers and MarketingLeads.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 41,
    "table": "ActiveSubscribers",
    "scenario": "Merge unique client identifiers from ActiveSubscribers and MarketingLeads.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, email VARCHAR) | MarketingLeads(user_id INT, email VARCHAR)",
    "targetQuery": "SELECT user_id, email\nFROM ActiveSubscribers\nUNION\nSELECT user_id, email\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id, email\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT user_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 830,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 30",
    "title": "UNION: Level 10: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 42,
    "table": "BranchAccounts",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id AS canonical_id, balance_usd AS balance\nFROM BranchAccounts\nUNION\nSELECT account_id, balance_usd\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", balance_usd AS balance\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " account_id, balance_usd\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "DigitalAccounts_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 831,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 31",
    "title": "UNION: Level 11: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from Q1Expenses and Q2Expenses.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 42,
    "table": "Q1Expenses",
    "scenario": "Merge unique client identifiers from Q1Expenses and Q2Expenses.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "Q1Expenses(expense_id INT, email VARCHAR) | Q2Expenses(expense_id INT, email VARCHAR)",
    "targetQuery": "SELECT expense_id, email\nFROM Q1Expenses\nUNION\nSELECT expense_id, email\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id, email\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT expense_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 832,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 32",
    "title": "UNION: Level 12: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 42,
    "table": "EquityHoldings",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL)",
    "targetQuery": "SELECT security_id AS canonical_id, market_value AS balance\nFROM EquityHoldings\nUNION\nSELECT security_id, market_value\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", market_value AS balance\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " security_id, market_value\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "BondHoldings_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 833,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 33",
    "title": "UNION: Level 13: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from DomesticTrades and OffshoreTrades.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 43,
    "table": "DomesticTrades",
    "scenario": "Merge unique client identifiers from DomesticTrades and OffshoreTrades.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "DomesticTrades(trade_id INT, email VARCHAR) | OffshoreTrades(trade_id INT, email VARCHAR)",
    "targetQuery": "SELECT trade_id, email\nFROM DomesticTrades\nUNION\nSELECT trade_id, email\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, email\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 834,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 34",
    "title": "UNION: Level 14: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 43,
    "table": "OnlineOrders",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "OnlineOrders(order_id INT, order_total DECIMAL) | RetailStoreOrders(order_id INT, order_total DECIMAL)",
    "targetQuery": "SELECT order_id AS canonical_id, order_total AS balance\nFROM OnlineOrders\nUNION\nSELECT order_id, order_total\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", order_total AS balance\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " order_id, order_total\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "RetailStoreOrders",
        "options": [
          "RetailStoreOrders",
          "RetailStoreOrders_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 835,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 35",
    "title": "UNION: Level 15: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from BrokerageClients and WealthClients.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 44,
    "table": "BrokerageClients",
    "scenario": "Merge unique client identifiers from BrokerageClients and WealthClients.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "BrokerageClients(client_id INT, email VARCHAR) | WealthClients(client_id INT, email VARCHAR)",
    "targetQuery": "SELECT client_id, email\nFROM BrokerageClients\nUNION\nSELECT client_id, email\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, email\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 836,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 36",
    "title": "UNION: Level 16: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 44,
    "table": "FrontOfficeTrades",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, settlement_amt DECIMAL)",
    "targetQuery": "SELECT trade_id AS canonical_id, settlement_amt AS balance\nFROM FrontOfficeTrades\nUNION\nSELECT trade_id, settlement_amt\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", settlement_amt AS balance\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " trade_id, settlement_amt\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "CustodianClearing",
        "options": [
          "CustodianClearing",
          "CustodianClearing_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 837,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 37",
    "title": "UNION: Level 17: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from ActiveSubscribers and MarketingLeads.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 44,
    "table": "ActiveSubscribers",
    "scenario": "Merge unique client identifiers from ActiveSubscribers and MarketingLeads.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, email VARCHAR) | MarketingLeads(user_id INT, email VARCHAR)",
    "targetQuery": "SELECT user_id, email\nFROM ActiveSubscribers\nUNION\nSELECT user_id, email\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id, email\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT user_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 838,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 38",
    "title": "UNION: Level 18: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 45,
    "table": "BranchAccounts",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id AS canonical_id, balance_usd AS balance\nFROM BranchAccounts\nUNION\nSELECT account_id, balance_usd\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", balance_usd AS balance\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " account_id, balance_usd\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "DigitalAccounts_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 839,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 39",
    "title": "UNION: Level 19: Deduplicated Client Registry",
    "subtitle": "Merge unique client identifiers from Q1Expenses and Q2Expenses.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "xp": 45,
    "table": "Q1Expenses",
    "scenario": "Merge unique client identifiers from Q1Expenses and Q2Expenses.",
    "businessObjective": "Eliminate duplicate rows by applying standard distinct UNION set merger.",
    "schemaSnippet": "Q1Expenses(expense_id INT, email VARCHAR) | Q2Expenses(expense_id INT, email VARCHAR)",
    "targetQuery": "SELECT expense_id, email\nFROM Q1Expenses\nUNION\nSELECT expense_id, email\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id, email\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DEDUP OPERATOR ]"
      },
      {
        "text": "\nSELECT expense_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ MATCHING COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SECOND TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot2": {
        "correct": "email",
        "options": [
          "email",
          "phone",
          "full_name",
          "address"
        ]
      },
      "slot3": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_clean",
          "LEADS",
          "CONTACTS"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 840,
    "discipline": "DEDUPLICATION SET UNIONS (UNION)",
    "disciplineKey": "union",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 40",
    "title": "UNION: Level 20: Primary Alias Governance",
    "subtitle": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (DEDUPLICATION SET UNIONS (UNION))",
    "subcluster": "DEDUPLICATION SET UNIONS (UNION) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "xp": 46,
    "table": "EquityHoldings",
    "scenario": "Enforce primary column aliases in Query 1 while projecting matching data types in Query 2.",
    "businessObjective": "Merge accounts with UNION, ensuring Query 1 establishes the canonical column naming.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL)",
    "targetQuery": "SELECT security_id AS canonical_id, market_value AS balance\nFROM EquityHoldings\nUNION\nSELECT security_id, market_value\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PRIMARY ALIAS ]"
      },
      {
        "text": ", market_value AS balance\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SELECT ]"
      },
      {
        "text": " security_id, market_value\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ TARGET TABLE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS canonical_id",
        "options": [
          "AS canonical_id",
          "canonical_id",
          "INTO id",
          "id"
        ]
      },
      "slot2": {
        "correct": "UNION",
        "options": [
          "UNION",
          "UNION ALL",
          "MERGE",
          "STACK"
        ]
      },
      "slot3": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "PROJECT",
          "GET",
          "FETCH"
        ]
      },
      "slot4": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "BondHoldings_raw",
          "TEMP",
          "DUAL"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement."
  },
  {
    "id": 841,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 41",
    "title": "INTERSECT: Level 01: Cross-Division Omnichannel Clients",
    "subtitle": "Find client identifiers present in BOTH DomesticTrades AND OffshoreTrades.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find common relational intersection using INTERSECT.",
    "xp": 46,
    "table": "DomesticTrades",
    "scenario": "Find client identifiers present in BOTH DomesticTrades AND OffshoreTrades.",
    "businessObjective": "Find common relational intersection using INTERSECT.",
    "schemaSnippet": "DomesticTrades(trade_id INT, broker_id VARCHAR) | OffshoreTrades(trade_id INT, broker_id VARCHAR)",
    "targetQuery": "SELECT trade_id\nFROM DomesticTrades\nINTERSECT\nSELECT trade_id\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INTERSECT OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ KEY COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SOURCE B ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION",
          "EXCEPT",
          "CROSS"
        ]
      },
      "slot2": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "broker_id",
          "status",
          "account_type"
        ]
      },
      "slot3": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_overlap",
          "CORE",
          "ARCHIVE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 842,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 42",
    "title": "INTERSECT: Level 02: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 46,
    "table": "OnlineOrders",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "OnlineOrders(order_id INT, customer_id VARCHAR) | RetailStoreOrders(order_id INT, customer_id VARCHAR)",
    "targetQuery": "SELECT order_id, customer_id\nFROM OnlineOrders\nINTERSECT\nSELECT order_id, customer_id\nFROM RetailStoreOrders\nORDER BY order_id ASC;",
    "template": [
      {
        "text": "SELECT order_id, customer_id\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM RetailStoreOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " order_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "customer_id",
        "options": [
          "customer_id",
          "order_total",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 843,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 43",
    "title": "INTERSECT: Level 03: Cross-Division Omnichannel Clients",
    "subtitle": "Find client identifiers present in BOTH BrokerageClients AND WealthClients.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find common relational intersection using INTERSECT.",
    "xp": 47,
    "table": "BrokerageClients",
    "scenario": "Find client identifiers present in BOTH BrokerageClients AND WealthClients.",
    "businessObjective": "Find common relational intersection using INTERSECT.",
    "schemaSnippet": "BrokerageClients(client_id INT, branch_code VARCHAR) | WealthClients(client_id INT, branch_code VARCHAR)",
    "targetQuery": "SELECT client_id\nFROM BrokerageClients\nINTERSECT\nSELECT client_id\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INTERSECT OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ KEY COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SOURCE B ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION",
          "EXCEPT",
          "CROSS"
        ]
      },
      "slot2": {
        "correct": "client_id",
        "options": [
          "client_id",
          "branch_code",
          "status",
          "account_type"
        ]
      },
      "slot3": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_overlap",
          "CORE",
          "ARCHIVE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 844,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 44",
    "title": "INTERSECT: Level 04: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 47,
    "table": "FrontOfficeTrades",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, counterparty_id VARCHAR) | CustodianClearing(trade_id INT, counterparty_id VARCHAR)",
    "targetQuery": "SELECT trade_id, counterparty_id\nFROM FrontOfficeTrades\nINTERSECT\nSELECT trade_id, counterparty_id\nFROM CustodianClearing\nORDER BY trade_id ASC;",
    "template": [
      {
        "text": "SELECT trade_id, counterparty_id\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM CustodianClearing\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " trade_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "counterparty_id",
        "options": [
          "counterparty_id",
          "settlement_amt",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 845,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 45",
    "title": "INTERSECT: Level 05: Cross-Division Omnichannel Clients",
    "subtitle": "Find client identifiers present in BOTH ActiveSubscribers AND MarketingLeads.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Find common relational intersection using INTERSECT.",
    "xp": 48,
    "table": "ActiveSubscribers",
    "scenario": "Find client identifiers present in BOTH ActiveSubscribers AND MarketingLeads.",
    "businessObjective": "Find common relational intersection using INTERSECT.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, campaign_id VARCHAR) | MarketingLeads(user_id INT, campaign_id VARCHAR)",
    "targetQuery": "SELECT user_id\nFROM ActiveSubscribers\nINTERSECT\nSELECT user_id\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ INTERSECT OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ KEY COL ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SOURCE B ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION",
          "EXCEPT",
          "CROSS"
        ]
      },
      "slot2": {
        "correct": "user_id",
        "options": [
          "user_id",
          "campaign_id",
          "status",
          "account_type"
        ]
      },
      "slot3": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_overlap",
          "CORE",
          "ARCHIVE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 846,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 46",
    "title": "INTERSECT: Level 06: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 48,
    "table": "BranchAccounts",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "BranchAccounts(account_id INT, region_code VARCHAR) | DigitalAccounts(account_id INT, region_code VARCHAR)",
    "targetQuery": "SELECT account_id, region_code\nFROM BranchAccounts\nINTERSECT\nSELECT account_id, region_code\nFROM DigitalAccounts\nORDER BY account_id ASC;",
    "template": [
      {
        "text": "SELECT account_id, region_code\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT account_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM DigitalAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " account_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "region_code",
        "options": [
          "region_code",
          "balance_usd",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 847,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 47",
    "title": "INTERSECT: Level 07: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 48,
    "table": "Q1Expenses",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "Q1Expenses(expense_id INT, dept_id VARCHAR) | Q2Expenses(expense_id INT, dept_id VARCHAR)",
    "targetQuery": "SELECT expense_id, dept_id\nFROM Q1Expenses\nINTERSECT\nSELECT expense_id, dept_id\nFROM Q2Expenses\nORDER BY expense_id ASC;",
    "template": [
      {
        "text": "SELECT expense_id, dept_id\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT expense_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM Q2Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " expense_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "dept_id",
        "options": [
          "dept_id",
          "amount_usd",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 848,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 48",
    "title": "INTERSECT: Level 08: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 49,
    "table": "EquityHoldings",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "EquityHoldings(security_id INT, fund_id VARCHAR) | BondHoldings(security_id INT, fund_id VARCHAR)",
    "targetQuery": "SELECT security_id, fund_id\nFROM EquityHoldings\nINTERSECT\nSELECT security_id, fund_id\nFROM BondHoldings\nORDER BY security_id ASC;",
    "template": [
      {
        "text": "SELECT security_id, fund_id\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT security_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM BondHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " security_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "market_value",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 849,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 49",
    "title": "INTERSECT: Level 09: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 49,
    "table": "DomesticTrades",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "DomesticTrades(trade_id INT, broker_id VARCHAR) | OffshoreTrades(trade_id INT, broker_id VARCHAR)",
    "targetQuery": "SELECT trade_id, broker_id\nFROM DomesticTrades\nINTERSECT\nSELECT trade_id, broker_id\nFROM OffshoreTrades\nORDER BY trade_id ASC;",
    "template": [
      {
        "text": "SELECT trade_id, broker_id\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM OffshoreTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " trade_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "broker_id",
        "options": [
          "broker_id",
          "trade_amount",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 850,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 50",
    "title": "INTERSECT: Level 10: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 50,
    "table": "OnlineOrders",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "OnlineOrders(order_id INT, customer_id VARCHAR) | RetailStoreOrders(order_id INT, customer_id VARCHAR)",
    "targetQuery": "SELECT order_id, customer_id\nFROM OnlineOrders\nINTERSECT\nSELECT order_id, customer_id\nFROM RetailStoreOrders\nORDER BY order_id ASC;",
    "template": [
      {
        "text": "SELECT order_id, customer_id\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM RetailStoreOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " order_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "customer_id",
        "options": [
          "customer_id",
          "order_total",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 851,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 51",
    "title": "INTERSECT: Level 11: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 50,
    "table": "BrokerageClients",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "BrokerageClients(client_id INT, branch_code VARCHAR) | WealthClients(client_id INT, branch_code VARCHAR)",
    "targetQuery": "SELECT client_id, branch_code\nFROM BrokerageClients\nINTERSECT\nSELECT client_id, branch_code\nFROM WealthClients\nORDER BY client_id ASC;",
    "template": [
      {
        "text": "SELECT client_id, branch_code\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT client_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM WealthClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " client_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "branch_code",
        "options": [
          "branch_code",
          "portfolio_value",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 852,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 52",
    "title": "INTERSECT: Level 12: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 50,
    "table": "FrontOfficeTrades",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, counterparty_id VARCHAR) | CustodianClearing(trade_id INT, counterparty_id VARCHAR)",
    "targetQuery": "SELECT trade_id, counterparty_id\nFROM FrontOfficeTrades\nINTERSECT\nSELECT trade_id, counterparty_id\nFROM CustodianClearing\nORDER BY trade_id ASC;",
    "template": [
      {
        "text": "SELECT trade_id, counterparty_id\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM CustodianClearing\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " trade_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "counterparty_id",
        "options": [
          "counterparty_id",
          "settlement_amt",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 853,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 53",
    "title": "INTERSECT: Level 13: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 51,
    "table": "ActiveSubscribers",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, campaign_id VARCHAR) | MarketingLeads(user_id INT, campaign_id VARCHAR)",
    "targetQuery": "SELECT user_id, campaign_id\nFROM ActiveSubscribers\nINTERSECT\nSELECT user_id, campaign_id\nFROM MarketingLeads\nORDER BY user_id ASC;",
    "template": [
      {
        "text": "SELECT user_id, campaign_id\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT user_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM MarketingLeads\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " user_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "campaign_id",
        "options": [
          "campaign_id",
          "lifetime_value",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 854,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 54",
    "title": "INTERSECT: Level 14: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 51,
    "table": "BranchAccounts",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "BranchAccounts(account_id INT, region_code VARCHAR) | DigitalAccounts(account_id INT, region_code VARCHAR)",
    "targetQuery": "SELECT account_id, region_code\nFROM BranchAccounts\nINTERSECT\nSELECT account_id, region_code\nFROM DigitalAccounts\nORDER BY account_id ASC;",
    "template": [
      {
        "text": "SELECT account_id, region_code\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT account_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM DigitalAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " account_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "region_code",
        "options": [
          "region_code",
          "balance_usd",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 855,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 55",
    "title": "INTERSECT: Level 15: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 52,
    "table": "Q1Expenses",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "Q1Expenses(expense_id INT, dept_id VARCHAR) | Q2Expenses(expense_id INT, dept_id VARCHAR)",
    "targetQuery": "SELECT expense_id, dept_id\nFROM Q1Expenses\nINTERSECT\nSELECT expense_id, dept_id\nFROM Q2Expenses\nORDER BY expense_id ASC;",
    "template": [
      {
        "text": "SELECT expense_id, dept_id\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT expense_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM Q2Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " expense_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "dept_id",
        "options": [
          "dept_id",
          "amount_usd",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 856,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 56",
    "title": "INTERSECT: Level 16: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 52,
    "table": "EquityHoldings",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "EquityHoldings(security_id INT, fund_id VARCHAR) | BondHoldings(security_id INT, fund_id VARCHAR)",
    "targetQuery": "SELECT security_id, fund_id\nFROM EquityHoldings\nINTERSECT\nSELECT security_id, fund_id\nFROM BondHoldings\nORDER BY security_id ASC;",
    "template": [
      {
        "text": "SELECT security_id, fund_id\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT security_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM BondHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " security_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "market_value",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 857,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 57",
    "title": "INTERSECT: Level 17: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 52,
    "table": "DomesticTrades",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "DomesticTrades(trade_id INT, broker_id VARCHAR) | OffshoreTrades(trade_id INT, broker_id VARCHAR)",
    "targetQuery": "SELECT trade_id, broker_id\nFROM DomesticTrades\nINTERSECT\nSELECT trade_id, broker_id\nFROM OffshoreTrades\nORDER BY trade_id ASC;",
    "template": [
      {
        "text": "SELECT trade_id, broker_id\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM OffshoreTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " trade_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "broker_id",
        "options": [
          "broker_id",
          "trade_amount",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 858,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 58",
    "title": "INTERSECT: Level 18: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 53,
    "table": "OnlineOrders",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "OnlineOrders(order_id INT, customer_id VARCHAR) | RetailStoreOrders(order_id INT, customer_id VARCHAR)",
    "targetQuery": "SELECT order_id, customer_id\nFROM OnlineOrders\nINTERSECT\nSELECT order_id, customer_id\nFROM RetailStoreOrders\nORDER BY order_id ASC;",
    "template": [
      {
        "text": "SELECT order_id, customer_id\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM RetailStoreOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " order_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "customer_id",
        "options": [
          "customer_id",
          "order_total",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 859,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 59",
    "title": "INTERSECT: Level 19: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 53,
    "table": "BrokerageClients",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "BrokerageClients(client_id INT, branch_code VARCHAR) | WealthClients(client_id INT, branch_code VARCHAR)",
    "targetQuery": "SELECT client_id, branch_code\nFROM BrokerageClients\nINTERSECT\nSELECT client_id, branch_code\nFROM WealthClients\nORDER BY client_id ASC;",
    "template": [
      {
        "text": "SELECT client_id, branch_code\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT client_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM WealthClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " client_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "branch_code",
        "options": [
          "branch_code",
          "portfolio_value",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 860,
    "discipline": "RELATIONAL SET INTERSECTIONS (INTERSECT)",
    "disciplineKey": "intersect",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 60",
    "title": "INTERSECT: Level 20: Multi-Column Asset Intersections",
    "subtitle": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (RELATIONAL SET INTERSECTIONS (INTERSECT))",
    "subcluster": "RELATIONAL SET INTERSECTIONS (INTERSECT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute multi-column intersection with strict column positioning.",
    "xp": 54,
    "table": "FrontOfficeTrades",
    "scenario": "Identify securities sharing identical fund ownership and branch routing across both divisions.",
    "businessObjective": "Execute multi-column intersection with strict column positioning.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, counterparty_id VARCHAR) | CustodianClearing(trade_id INT, counterparty_id VARCHAR)",
    "targetQuery": "SELECT trade_id, counterparty_id\nFROM FrontOfficeTrades\nINTERSECT\nSELECT trade_id, counterparty_id\nFROM CustodianClearing\nORDER BY trade_id ASC;",
    "template": [
      {
        "text": "SELECT trade_id, counterparty_id\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET OP ]"
      },
      {
        "text": "\nSELECT trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": "\nFROM CustodianClearing\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ORDER CLAUSE ]"
      },
      {
        "text": " trade_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ DIRECTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "INTERSECT",
        "options": [
          "INTERSECT",
          "UNION ALL",
          "EXCEPT",
          "OVERLAP"
        ]
      },
      "slot2": {
        "correct": "counterparty_id",
        "options": [
          "counterparty_id",
          "settlement_amt",
          "status",
          "tier"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "FILTER BY"
        ]
      },
      "slot4": {
        "correct": "ASC",
        "options": [
          "ASC",
          "DESC",
          "NULLS FIRST",
          "AUTO"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort."
  },
  {
    "id": 861,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 61",
    "title": "EXCEPT: Level 01: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in ActiveSubscribers missing from MarketingLeads clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 54,
    "table": "ActiveSubscribers",
    "scenario": "Detect high-value trades in ActiveSubscribers missing from MarketingLeads clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, lifetime_value DECIMAL) | MarketingLeads(user_id INT, lifetime_value DECIMAL)",
    "targetQuery": "SELECT user_id\nFROM ActiveSubscribers\nWHERE lifetime_value >= 100000\nEXCEPT\nSELECT user_id\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " lifetime_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "user_id",
        "options": [
          "user_id",
          "lifetime_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 862,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 62",
    "title": "EXCEPT: Level 02: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in BranchAccounts missing from DigitalAccounts clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 54,
    "table": "BranchAccounts",
    "scenario": "Detect high-value trades in BranchAccounts missing from DigitalAccounts clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id\nFROM BranchAccounts\nWHERE balance_usd >= 100000\nEXCEPT\nSELECT account_id\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " balance_usd >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "account_id",
        "options": [
          "account_id",
          "balance_usd",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "BranchAccounts_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 863,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 63",
    "title": "EXCEPT: Level 03: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in Q1Expenses missing from Q2Expenses clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 55,
    "table": "Q1Expenses",
    "scenario": "Detect high-value trades in Q1Expenses missing from Q2Expenses clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "Q1Expenses(expense_id INT, amount_usd DECIMAL) | Q2Expenses(expense_id INT, amount_usd DECIMAL)",
    "targetQuery": "SELECT expense_id\nFROM Q1Expenses\nWHERE amount_usd >= 100000\nEXCEPT\nSELECT expense_id\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " amount_usd >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "expense_id",
        "options": [
          "expense_id",
          "amount_usd",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 864,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 64",
    "title": "EXCEPT: Level 04: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in EquityHoldings missing from BondHoldings clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 55,
    "table": "EquityHoldings",
    "scenario": "Detect high-value trades in EquityHoldings missing from BondHoldings clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL)",
    "targetQuery": "SELECT security_id\nFROM EquityHoldings\nWHERE market_value >= 100000\nEXCEPT\nSELECT security_id\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " market_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "security_id",
        "options": [
          "security_id",
          "market_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "EquityHoldings_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 865,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 65",
    "title": "EXCEPT: Level 05: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in DomesticTrades missing from OffshoreTrades clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 56,
    "table": "DomesticTrades",
    "scenario": "Detect high-value trades in DomesticTrades missing from OffshoreTrades clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "DomesticTrades(trade_id INT, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id\nFROM DomesticTrades\nWHERE trade_amount >= 100000\nEXCEPT\nSELECT trade_id\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " trade_amount >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "trade_amount",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 866,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 66",
    "title": "EXCEPT: Level 06: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in OnlineOrders missing from RetailStoreOrders clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 56,
    "table": "OnlineOrders",
    "scenario": "Detect high-value trades in OnlineOrders missing from RetailStoreOrders clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "OnlineOrders(order_id INT, order_total DECIMAL) | RetailStoreOrders(order_id INT, order_total DECIMAL)",
    "targetQuery": "SELECT order_id\nFROM OnlineOrders\nWHERE order_total >= 100000\nEXCEPT\nSELECT order_id\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " order_total >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "order_id",
        "options": [
          "order_id",
          "order_total",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "RetailStoreOrders",
        "options": [
          "RetailStoreOrders",
          "OnlineOrders_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 867,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 67",
    "title": "EXCEPT: Level 07: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in BrokerageClients missing from WealthClients clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 56,
    "table": "BrokerageClients",
    "scenario": "Detect high-value trades in BrokerageClients missing from WealthClients clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "BrokerageClients(client_id INT, portfolio_value DECIMAL) | WealthClients(client_id INT, portfolio_value DECIMAL)",
    "targetQuery": "SELECT client_id\nFROM BrokerageClients\nWHERE portfolio_value >= 100000\nEXCEPT\nSELECT client_id\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " portfolio_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "client_id",
        "options": [
          "client_id",
          "portfolio_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 868,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 68",
    "title": "EXCEPT: Level 08: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in FrontOfficeTrades missing from CustodianClearing clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 57,
    "table": "FrontOfficeTrades",
    "scenario": "Detect high-value trades in FrontOfficeTrades missing from CustodianClearing clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, settlement_amt DECIMAL)",
    "targetQuery": "SELECT trade_id\nFROM FrontOfficeTrades\nWHERE settlement_amt >= 100000\nEXCEPT\nSELECT trade_id\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " settlement_amt >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "settlement_amt",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "CustodianClearing",
        "options": [
          "CustodianClearing",
          "FrontOfficeTrades_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 869,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 69",
    "title": "EXCEPT: Level 09: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in ActiveSubscribers missing from MarketingLeads clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 57,
    "table": "ActiveSubscribers",
    "scenario": "Detect high-value trades in ActiveSubscribers missing from MarketingLeads clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, lifetime_value DECIMAL) | MarketingLeads(user_id INT, lifetime_value DECIMAL)",
    "targetQuery": "SELECT user_id\nFROM ActiveSubscribers\nWHERE lifetime_value >= 100000\nEXCEPT\nSELECT user_id\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " lifetime_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "user_id",
        "options": [
          "user_id",
          "lifetime_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 870,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 70",
    "title": "EXCEPT: Level 10: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in BranchAccounts missing from DigitalAccounts clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 58,
    "table": "BranchAccounts",
    "scenario": "Detect high-value trades in BranchAccounts missing from DigitalAccounts clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id\nFROM BranchAccounts\nWHERE balance_usd >= 100000\nEXCEPT\nSELECT account_id\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " balance_usd >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "account_id",
        "options": [
          "account_id",
          "balance_usd",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "BranchAccounts_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 871,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 71",
    "title": "EXCEPT: Level 11: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in Q1Expenses missing from Q2Expenses clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 58,
    "table": "Q1Expenses",
    "scenario": "Detect high-value trades in Q1Expenses missing from Q2Expenses clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "Q1Expenses(expense_id INT, amount_usd DECIMAL) | Q2Expenses(expense_id INT, amount_usd DECIMAL)",
    "targetQuery": "SELECT expense_id\nFROM Q1Expenses\nWHERE amount_usd >= 100000\nEXCEPT\nSELECT expense_id\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " amount_usd >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "expense_id",
        "options": [
          "expense_id",
          "amount_usd",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 872,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 72",
    "title": "EXCEPT: Level 12: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in EquityHoldings missing from BondHoldings clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 58,
    "table": "EquityHoldings",
    "scenario": "Detect high-value trades in EquityHoldings missing from BondHoldings clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL)",
    "targetQuery": "SELECT security_id\nFROM EquityHoldings\nWHERE market_value >= 100000\nEXCEPT\nSELECT security_id\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " market_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "security_id",
        "options": [
          "security_id",
          "market_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "EquityHoldings_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 873,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 73",
    "title": "EXCEPT: Level 13: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in DomesticTrades missing from OffshoreTrades clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 59,
    "table": "DomesticTrades",
    "scenario": "Detect high-value trades in DomesticTrades missing from OffshoreTrades clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "DomesticTrades(trade_id INT, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, trade_amount DECIMAL)",
    "targetQuery": "SELECT trade_id\nFROM DomesticTrades\nWHERE trade_amount >= 100000\nEXCEPT\nSELECT trade_id\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " trade_amount >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "trade_amount",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "OffshoreTrades",
        "options": [
          "OffshoreTrades",
          "DomesticTrades_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 874,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 74",
    "title": "EXCEPT: Level 14: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in OnlineOrders missing from RetailStoreOrders clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 59,
    "table": "OnlineOrders",
    "scenario": "Detect high-value trades in OnlineOrders missing from RetailStoreOrders clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "OnlineOrders(order_id INT, order_total DECIMAL) | RetailStoreOrders(order_id INT, order_total DECIMAL)",
    "targetQuery": "SELECT order_id\nFROM OnlineOrders\nWHERE order_total >= 100000\nEXCEPT\nSELECT order_id\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " order_total >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "order_id",
        "options": [
          "order_id",
          "order_total",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "RetailStoreOrders",
        "options": [
          "RetailStoreOrders",
          "OnlineOrders_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 875,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "SET Lvl 75",
    "title": "EXCEPT: Level 15: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in BrokerageClients missing from WealthClients clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 60,
    "table": "BrokerageClients",
    "scenario": "Detect high-value trades in BrokerageClients missing from WealthClients clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "BrokerageClients(client_id INT, portfolio_value DECIMAL) | WealthClients(client_id INT, portfolio_value DECIMAL)",
    "targetQuery": "SELECT client_id\nFROM BrokerageClients\nWHERE portfolio_value >= 100000\nEXCEPT\nSELECT client_id\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " portfolio_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "client_id",
        "options": [
          "client_id",
          "portfolio_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "WealthClients",
        "options": [
          "WealthClients",
          "BrokerageClients_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 876,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 76",
    "title": "EXCEPT: Level 16: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in FrontOfficeTrades missing from CustodianClearing clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 60,
    "table": "FrontOfficeTrades",
    "scenario": "Detect high-value trades in FrontOfficeTrades missing from CustodianClearing clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, settlement_amt DECIMAL)",
    "targetQuery": "SELECT trade_id\nFROM FrontOfficeTrades\nWHERE settlement_amt >= 100000\nEXCEPT\nSELECT trade_id\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " settlement_amt >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "settlement_amt",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "CustodianClearing",
        "options": [
          "CustodianClearing",
          "FrontOfficeTrades_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 877,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 77",
    "title": "EXCEPT: Level 17: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in ActiveSubscribers missing from MarketingLeads clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 60,
    "table": "ActiveSubscribers",
    "scenario": "Detect high-value trades in ActiveSubscribers missing from MarketingLeads clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, lifetime_value DECIMAL) | MarketingLeads(user_id INT, lifetime_value DECIMAL)",
    "targetQuery": "SELECT user_id\nFROM ActiveSubscribers\nWHERE lifetime_value >= 100000\nEXCEPT\nSELECT user_id\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " lifetime_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "user_id",
        "options": [
          "user_id",
          "lifetime_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "MarketingLeads",
        "options": [
          "MarketingLeads",
          "ActiveSubscribers_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 878,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 78",
    "title": "EXCEPT: Level 18: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in BranchAccounts missing from DigitalAccounts clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 61,
    "table": "BranchAccounts",
    "scenario": "Detect high-value trades in BranchAccounts missing from DigitalAccounts clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL)",
    "targetQuery": "SELECT account_id\nFROM BranchAccounts\nWHERE balance_usd >= 100000\nEXCEPT\nSELECT account_id\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " balance_usd >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "account_id",
        "options": [
          "account_id",
          "balance_usd",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "DigitalAccounts",
        "options": [
          "DigitalAccounts",
          "BranchAccounts_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 879,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 79",
    "title": "EXCEPT: Level 19: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in Q1Expenses missing from Q2Expenses clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 61,
    "table": "Q1Expenses",
    "scenario": "Detect high-value trades in Q1Expenses missing from Q2Expenses clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "Q1Expenses(expense_id INT, amount_usd DECIMAL) | Q2Expenses(expense_id INT, amount_usd DECIMAL)",
    "targetQuery": "SELECT expense_id\nFROM Q1Expenses\nWHERE amount_usd >= 100000\nEXCEPT\nSELECT expense_id\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " amount_usd >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "expense_id",
        "options": [
          "expense_id",
          "amount_usd",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "Q2Expenses",
        "options": [
          "Q2Expenses",
          "Q1Expenses_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 880,
    "discipline": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)",
    "disciplineKey": "except_minus",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 80",
    "title": "EXCEPT: Level 20: Filtered Audit Discrepancies",
    "subtitle": "Detect high-value trades in EquityHoldings missing from BondHoldings clearing files.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT))",
    "subcluster": "SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Apply WHERE filtering within set branches before computing set differences.",
    "xp": 62,
    "table": "EquityHoldings",
    "scenario": "Detect high-value trades in EquityHoldings missing from BondHoldings clearing files.",
    "businessObjective": "Apply WHERE filtering within set branches before computing set differences.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL)",
    "targetQuery": "SELECT security_id\nFROM EquityHoldings\nWHERE market_value >= 100000\nEXCEPT\nSELECT security_id\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FILTER CLAUSE ]"
      },
      {
        "text": " market_value >= 100000\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ DIFFERENCE OP ]"
      },
      {
        "text": "\nSELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ MATCHING KEY ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BENCHMARK TABLE ]"
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
        "correct": "EXCEPT",
        "options": [
          "EXCEPT",
          "MINUS",
          "INTERSECT",
          "DIFF"
        ]
      },
      "slot3": {
        "correct": "security_id",
        "options": [
          "security_id",
          "market_value",
          "status",
          "count"
        ]
      },
      "slot4": {
        "correct": "BondHoldings",
        "options": [
          "BondHoldings",
          "EquityHoldings_audit",
          "SYSTEM",
          "MASTER"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!"
  },
  {
    "id": 881,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 81",
    "title": "Harmonization: Level 01: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 62,
    "table": "DomesticTrades",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "DomesticTrades(trade_id INT, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, trade_amount DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount, 0.00 AS fee, 'MODERN' AS sys_src\nFROM DomesticTrades\nUNION ALL\nSELECT trade_id, trade_amount, fee, 'LEGACY' AS sys_src\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, trade_amount, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM OffshoreTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 882,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 82",
    "title": "Harmonization: Level 02: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 62,
    "table": "OnlineOrders",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "OnlineOrders(order_id INT, order_total DECIMAL) | RetailStoreOrders(order_id INT, order_total DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT order_id, order_total, 0.00 AS fee, 'MODERN' AS sys_src\nFROM OnlineOrders\nUNION ALL\nSELECT order_id, order_total, fee, 'LEGACY' AS sys_src\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_total, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT order_id, order_total, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM RetailStoreOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 883,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 83",
    "title": "Harmonization: Level 03: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 63,
    "table": "BrokerageClients",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "BrokerageClients(client_id INT, portfolio_value DECIMAL) | WealthClients(client_id INT, portfolio_value DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT client_id, portfolio_value, 0.00 AS fee, 'MODERN' AS sys_src\nFROM BrokerageClients\nUNION ALL\nSELECT client_id, portfolio_value, fee, 'LEGACY' AS sys_src\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, portfolio_value, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, portfolio_value, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM WealthClients;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 884,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 84",
    "title": "Harmonization: Level 04: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 63,
    "table": "FrontOfficeTrades",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, settlement_amt DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT trade_id, settlement_amt, 0.00 AS fee, 'MODERN' AS sys_src\nFROM FrontOfficeTrades\nUNION ALL\nSELECT trade_id, settlement_amt, fee, 'LEGACY' AS sys_src\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id, settlement_amt, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, settlement_amt, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM CustodianClearing;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 885,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 85",
    "title": "Harmonization: Level 05: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 64,
    "table": "ActiveSubscribers",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, lifetime_value DECIMAL) | MarketingLeads(user_id INT, lifetime_value DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT user_id, lifetime_value, 0.00 AS fee, 'MODERN' AS sys_src\nFROM ActiveSubscribers\nUNION ALL\nSELECT user_id, lifetime_value, fee, 'LEGACY' AS sys_src\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id, lifetime_value, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT user_id, lifetime_value, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM MarketingLeads;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 886,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 86",
    "title": "Harmonization: Level 06: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 64,
    "table": "BranchAccounts",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT account_id, balance_usd, 0.00 AS fee, 'MODERN' AS sys_src\nFROM BranchAccounts\nUNION ALL\nSELECT account_id, balance_usd, fee, 'LEGACY' AS sys_src\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id, balance_usd, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT account_id, balance_usd, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM DigitalAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 887,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 87",
    "title": "Harmonization: Level 07: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 64,
    "table": "Q1Expenses",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "Q1Expenses(expense_id INT, amount_usd DECIMAL) | Q2Expenses(expense_id INT, amount_usd DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT expense_id, amount_usd, 0.00 AS fee, 'MODERN' AS sys_src\nFROM Q1Expenses\nUNION ALL\nSELECT expense_id, amount_usd, fee, 'LEGACY' AS sys_src\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id, amount_usd, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT expense_id, amount_usd, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM Q2Expenses;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 888,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 88",
    "title": "Harmonization: Level 08: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 65,
    "table": "EquityHoldings",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT security_id, market_value, 0.00 AS fee, 'MODERN' AS sys_src\nFROM EquityHoldings\nUNION ALL\nSELECT security_id, market_value, fee, 'LEGACY' AS sys_src\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id, market_value, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT security_id, market_value, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM BondHoldings;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 889,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 89",
    "title": "Harmonization: Level 09: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 65,
    "table": "DomesticTrades",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "DomesticTrades(trade_id INT, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, trade_amount DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount, 0.00 AS fee, 'MODERN' AS sys_src\nFROM DomesticTrades\nUNION ALL\nSELECT trade_id, trade_amount, fee, 'LEGACY' AS sys_src\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, trade_amount, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM OffshoreTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 890,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 90",
    "title": "Harmonization: Level 10: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 66,
    "table": "OnlineOrders",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "OnlineOrders(order_id INT, order_total DECIMAL) | RetailStoreOrders(order_id INT, order_total DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT order_id, order_total, 0.00 AS fee, 'MODERN' AS sys_src\nFROM OnlineOrders\nUNION ALL\nSELECT order_id, order_total, fee, 'LEGACY' AS sys_src\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_total, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT order_id, order_total, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM RetailStoreOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 891,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 91",
    "title": "Harmonization: Level 11: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 66,
    "table": "BrokerageClients",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "BrokerageClients(client_id INT, portfolio_value DECIMAL) | WealthClients(client_id INT, portfolio_value DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT client_id, portfolio_value, 0.00 AS fee, 'MODERN' AS sys_src\nFROM BrokerageClients\nUNION ALL\nSELECT client_id, portfolio_value, fee, 'LEGACY' AS sys_src\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, portfolio_value, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, portfolio_value, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM WealthClients;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 892,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 92",
    "title": "Harmonization: Level 12: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 66,
    "table": "FrontOfficeTrades",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, settlement_amt DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT trade_id, settlement_amt, 0.00 AS fee, 'MODERN' AS sys_src\nFROM FrontOfficeTrades\nUNION ALL\nSELECT trade_id, settlement_amt, fee, 'LEGACY' AS sys_src\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id, settlement_amt, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, settlement_amt, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM CustodianClearing;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 893,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 93",
    "title": "Harmonization: Level 13: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 67,
    "table": "ActiveSubscribers",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "ActiveSubscribers(user_id INT, lifetime_value DECIMAL) | MarketingLeads(user_id INT, lifetime_value DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT user_id, lifetime_value, 0.00 AS fee, 'MODERN' AS sys_src\nFROM ActiveSubscribers\nUNION ALL\nSELECT user_id, lifetime_value, fee, 'LEGACY' AS sys_src\nFROM MarketingLeads;",
    "template": [
      {
        "text": "SELECT user_id, lifetime_value, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM ActiveSubscribers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT user_id, lifetime_value, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM MarketingLeads;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 894,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 94",
    "title": "Harmonization: Level 14: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 67,
    "table": "BranchAccounts",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "BranchAccounts(account_id INT, balance_usd DECIMAL) | DigitalAccounts(account_id INT, balance_usd DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT account_id, balance_usd, 0.00 AS fee, 'MODERN' AS sys_src\nFROM BranchAccounts\nUNION ALL\nSELECT account_id, balance_usd, fee, 'LEGACY' AS sys_src\nFROM DigitalAccounts;",
    "template": [
      {
        "text": "SELECT account_id, balance_usd, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM BranchAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT account_id, balance_usd, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM DigitalAccounts;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 895,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 95",
    "title": "Harmonization: Level 15: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 68,
    "table": "Q1Expenses",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "Q1Expenses(expense_id INT, amount_usd DECIMAL) | Q2Expenses(expense_id INT, amount_usd DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT expense_id, amount_usd, 0.00 AS fee, 'MODERN' AS sys_src\nFROM Q1Expenses\nUNION ALL\nSELECT expense_id, amount_usd, fee, 'LEGACY' AS sys_src\nFROM Q2Expenses;",
    "template": [
      {
        "text": "SELECT expense_id, amount_usd, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM Q1Expenses\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT expense_id, amount_usd, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM Q2Expenses;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 896,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 96",
    "title": "Harmonization: Level 16: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 68,
    "table": "EquityHoldings",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "EquityHoldings(security_id INT, market_value DECIMAL) | BondHoldings(security_id INT, market_value DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT security_id, market_value, 0.00 AS fee, 'MODERN' AS sys_src\nFROM EquityHoldings\nUNION ALL\nSELECT security_id, market_value, fee, 'LEGACY' AS sys_src\nFROM BondHoldings;",
    "template": [
      {
        "text": "SELECT security_id, market_value, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM EquityHoldings\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT security_id, market_value, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM BondHoldings;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 897,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 97",
    "title": "Harmonization: Level 17: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 68,
    "table": "DomesticTrades",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "DomesticTrades(trade_id INT, trade_amount DECIMAL) | OffshoreTrades(trade_id INT, trade_amount DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT trade_id, trade_amount, 0.00 AS fee, 'MODERN' AS sys_src\nFROM DomesticTrades\nUNION ALL\nSELECT trade_id, trade_amount, fee, 'LEGACY' AS sys_src\nFROM OffshoreTrades;",
    "template": [
      {
        "text": "SELECT trade_id, trade_amount, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM DomesticTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, trade_amount, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM OffshoreTrades;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 898,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 98",
    "title": "Harmonization: Level 18: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 69,
    "table": "OnlineOrders",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "OnlineOrders(order_id INT, order_total DECIMAL) | RetailStoreOrders(order_id INT, order_total DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT order_id, order_total, 0.00 AS fee, 'MODERN' AS sys_src\nFROM OnlineOrders\nUNION ALL\nSELECT order_id, order_total, fee, 'LEGACY' AS sys_src\nFROM RetailStoreOrders;",
    "template": [
      {
        "text": "SELECT order_id, order_total, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM OnlineOrders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT order_id, order_total, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM RetailStoreOrders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 899,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 99",
    "title": "Harmonization: Level 19: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 69,
    "table": "BrokerageClients",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "BrokerageClients(client_id INT, portfolio_value DECIMAL) | WealthClients(client_id INT, portfolio_value DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT client_id, portfolio_value, 0.00 AS fee, 'MODERN' AS sys_src\nFROM BrokerageClients\nUNION ALL\nSELECT client_id, portfolio_value, fee, 'LEGACY' AS sys_src\nFROM WealthClients;",
    "template": [
      {
        "text": "SELECT client_id, portfolio_value, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM BrokerageClients\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT client_id, portfolio_value, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM WealthClients;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  },
  {
    "id": 900,
    "discipline": "HETEROGENEOUS SCHEMA HARMONIZATION",
    "disciplineKey": "schema_harmonization",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "SET Lvl 100",
    "title": "Harmonization: Level 20: Enterprise Multi-System Consolidation",
    "subtitle": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "type": "fill_blank",
    "category": "Section 09: Set Operations (HETEROGENEOUS SCHEMA HARMONIZATION)",
    "subcluster": "HETEROGENEOUS SCHEMA HARMONIZATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "xp": 70,
    "table": "FrontOfficeTrades",
    "scenario": "Stack modern and legacy records with synthetic system tags and fee defaults.",
    "businessObjective": "Unify disparate systems by synchronizing column positions, data types, and default fallbacks.",
    "schemaSnippet": "FrontOfficeTrades(trade_id INT, settlement_amt DECIMAL) | CustodianClearing(trade_id INT, settlement_amt DECIMAL, fee DECIMAL)",
    "targetQuery": "SELECT trade_id, settlement_amt, 0.00 AS fee, 'MODERN' AS sys_src\nFROM FrontOfficeTrades\nUNION ALL\nSELECT trade_id, settlement_amt, fee, 'LEGACY' AS sys_src\nFROM CustodianClearing;",
    "template": [
      {
        "text": "SELECT trade_id, settlement_amt, 0.00 AS fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MODERN TAG ]"
      },
      {
        "text": "\nFROM FrontOfficeTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OPERATOR ]"
      },
      {
        "text": "\nSELECT trade_id, settlement_amt, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REAL FEE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LEGACY TAG ]"
      },
      {
        "text": "\nFROM CustodianClearing;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "'MODERN' AS sys_src",
        "options": [
          "'MODERN' AS sys_src",
          "'MODERN'",
          "sys_src",
          "SYSTEM"
        ]
      },
      "slot2": {
        "correct": "UNION ALL",
        "options": [
          "UNION ALL",
          "UNION",
          "INTERSECT",
          "JOIN"
        ]
      },
      "slot3": {
        "correct": "fee",
        "options": [
          "fee",
          "0.00",
          "NULL",
          "commission"
        ]
      },
      "slot4": {
        "correct": "'LEGACY' AS sys_src",
        "options": [
          "'LEGACY' AS sys_src",
          "'LEGACY'",
          "sys_src",
          "SOURCE"
        ]
      }
    },
    "explanation": "Set operations combine rows vertically across queries. Every branch must have matching column counts and compatible datatypes. COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort."
  }
];
