// =============================================================================
// SECTION 11: DML, UPSERTS & ACID TRANSACTIONS ARENA (100 QUESTS)
// 5 Disciplines x 20 Levels (Idempotent Upserts, RETURNING, Soft Deletes, ACID, SCD Type 2)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.DML_DISCIPLINES_METADATA = [
  {
    "key": "idempotent_upserts",
    "name": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "symbol": "⚡",
    "color": "#38bdf8",
    "concept": "Crash-Resilient Pipeline Ingestion",
    "whenToUse": "When ingesting asynchronous streaming events or batch files where records may be retried or duplicated without creating duplicate primary rows.",
    "scenarios": "Updating account current balances on incoming trades: INSERT INTO Balances ON CONFLICT (account_id) DO UPDATE SET balance = EXCLUDED.balance; ANSI MERGE synchronizing warehouse staging tables.",
    "traps": "EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "key": "audit_projections_returning",
    "name": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "symbol": "🎯",
    "color": "#10b981",
    "concept": "Zero-Roundtrip Mutation State Capture",
    "whenToUse": "When the application requires the newly generated database-side values (such as auto-generated serial/UUID keys or updated balances) without executing a second SELECT query.",
    "scenarios": "Creating high-value wire transfers and immediately capturing generated transaction_id: INSERT ... RETURNING transaction_id, created_at; Decrementing inventory or balances with atomic return.",
    "traps": "CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "key": "conditional_mutations_soft_deletes",
    "name": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "symbol": "🛡️",
    "color": "#f59e0b",
    "concept": "Non-Destructive Data Lifecycle Management",
    "whenToUse": "When archiving records, applying tiered fee adjustments, or deactivating delinquent accounts while preserving historical ledger data for regulatory audits.",
    "scenarios": "Flagging fraudulent accounts: UPDATE Accounts SET status = 'SUSPENDED', suspended_at = NOW() WHERE risk_score > 90; Soft-deleting inactive users: UPDATE Users SET deleted_at = CURRENT_TIMESTAMP WHERE last_login < ...",
    "traps": "UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "key": "acid_transactions_concurrency",
    "name": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "symbol": "🔒",
    "color": "#ec4899",
    "concept": "Atomic All-or-Nothing Multi-Step Consistency",
    "whenToUse": "When executing multi-leg financial operations (such as debiting Account A and crediting Account B) that must either completely succeed together or completely abort.",
    "scenarios": "Inter-bank ledger transfers inside BEGIN ... COMMIT with ROLLBACK on error; Preventing double-spending via SELECT ... FOR UPDATE pessimistic row-level locking on balance rows.",
    "traps": "DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "key": "scd_type2_versioning",
    "name": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "symbol": "⏳",
    "color": "#a855f7",
    "concept": "Point-in-Time Historical Audit Versioning",
    "whenToUse": "When tracking attribute changes over time (such as customer risk tier, employee salary, or marital status) while retaining complete point-in-time historical reconstruction.",
    "scenarios": "Promoting a corporate client from STANDARD to VIP: Closing current version with valid_to = CURRENT_DATE, is_current = FALSE, and inserting fresh row with valid_from = CURRENT_DATE, valid_to = '9999-12-31'.",
    "traps": "OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  }
];

window.QUESTS_SECTION_11 = [
  {
    "id": 1001,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 01",
    "title": "Upsert Engine: Level 01: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into BankAccounts updating balance on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 30,
    "table": "BankAccounts",
    "scenario": "Ingest record into BankAccounts updating balance on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, updated_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BankAccounts (account_id, balance)\nVALUES (101, 5000.00)\nON CONFLICT (account_id)\nDO UPDATE SET balance = EXCLUDED.balance;",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (account_id, balance)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (account_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.balance",
        "options": [
          "EXCLUDED.balance",
          "NEW.balance",
          "BankAccounts.balance",
          "SOURCE.balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1002,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 02",
    "title": "Upsert Engine: Level 02: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into SecuritiesPositions updating quantity on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 30,
    "table": "SecuritiesPositions",
    "scenario": "Ingest record into SecuritiesPositions updating quantity on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, as_of_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO SecuritiesPositions (position_id, quantity)\nVALUES (101, 5000.00)\nON CONFLICT (position_id)\nDO UPDATE SET quantity = EXCLUDED.quantity;",
    "template": [
      {
        "text": "INSERT INTO SecuritiesPositions (position_id, quantity)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (position_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " quantity = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.quantity",
        "options": [
          "EXCLUDED.quantity",
          "NEW.quantity",
          "SecuritiesPositions.quantity",
          "SOURCE.quantity"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1003,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 03",
    "title": "Upsert Engine: Level 03: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into CreditFacilities updating drawn_amount on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 31,
    "table": "CreditFacilities",
    "scenario": "Ingest record into CreditFacilities updating drawn_amount on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "CreditFacilities(facility_id PK, drawn_amount NUMERIC, reviewed_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CreditFacilities (facility_id, drawn_amount)\nVALUES (101, 5000.00)\nON CONFLICT (facility_id)\nDO UPDATE SET drawn_amount = EXCLUDED.drawn_amount;",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (facility_id, drawn_amount)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (facility_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " drawn_amount = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.drawn_amount",
        "options": [
          "EXCLUDED.drawn_amount",
          "NEW.drawn_amount",
          "CreditFacilities.drawn_amount",
          "SOURCE.drawn_amount"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1004,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 04",
    "title": "Upsert Engine: Level 04: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into CryptoWallets updating token_balance on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 31,
    "table": "CryptoWallets",
    "scenario": "Ingest record into CryptoWallets updating token_balance on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, last_transfer TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CryptoWallets (wallet_id, token_balance)\nVALUES (101, 5000.00)\nON CONFLICT (wallet_id)\nDO UPDATE SET token_balance = EXCLUDED.token_balance;",
    "template": [
      {
        "text": "INSERT INTO CryptoWallets (wallet_id, token_balance)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (wallet_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " token_balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.token_balance",
        "options": [
          "EXCLUDED.token_balance",
          "NEW.token_balance",
          "CryptoWallets.token_balance",
          "SOURCE.token_balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1005,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 05",
    "title": "Upsert Engine: Level 05: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into InvoiceLedger updating amount_due on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 32,
    "table": "InvoiceLedger",
    "scenario": "Ingest record into InvoiceLedger updating amount_due on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "InvoiceLedger(invoice_id PK, amount_due NUMERIC, due_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO InvoiceLedger (invoice_id, amount_due)\nVALUES (101, 5000.00)\nON CONFLICT (invoice_id)\nDO UPDATE SET amount_due = EXCLUDED.amount_due;",
    "template": [
      {
        "text": "INSERT INTO InvoiceLedger (invoice_id, amount_due)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (invoice_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " amount_due = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.amount_due",
        "options": [
          "EXCLUDED.amount_due",
          "NEW.amount_due",
          "InvoiceLedger.amount_due",
          "SOURCE.amount_due"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1006,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 06",
    "title": "Upsert Engine: Level 06: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into InsuranceClaims updating settlement_amt on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 32,
    "table": "InsuranceClaims",
    "scenario": "Ingest record into InsuranceClaims updating settlement_amt on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, adjudicated_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO InsuranceClaims (claim_id, settlement_amt)\nVALUES (101, 5000.00)\nON CONFLICT (claim_id)\nDO UPDATE SET settlement_amt = EXCLUDED.settlement_amt;",
    "template": [
      {
        "text": "INSERT INTO InsuranceClaims (claim_id, settlement_amt)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (claim_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " settlement_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.settlement_amt",
        "options": [
          "EXCLUDED.settlement_amt",
          "NEW.settlement_amt",
          "InsuranceClaims.settlement_amt",
          "SOURCE.settlement_amt"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1007,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 07",
    "title": "Upsert Engine: Level 07: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into BrokerCommissionLedger updating payout_amt on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 32,
    "table": "BrokerCommissionLedger",
    "scenario": "Ingest record into BrokerCommissionLedger updating payout_amt on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id PK, payout_amt NUMERIC, cleared_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BrokerCommissionLedger (commission_id, payout_amt)\nVALUES (101, 5000.00)\nON CONFLICT (commission_id)\nDO UPDATE SET payout_amt = EXCLUDED.payout_amt;",
    "template": [
      {
        "text": "INSERT INTO BrokerCommissionLedger (commission_id, payout_amt)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (commission_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " payout_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.payout_amt",
        "options": [
          "EXCLUDED.payout_amt",
          "NEW.payout_amt",
          "BrokerCommissionLedger.payout_amt",
          "SOURCE.payout_amt"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1008,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 08",
    "title": "Upsert Engine: Level 08: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into ClientRiskProfiles updating risk_score on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 33,
    "table": "ClientRiskProfiles",
    "scenario": "Ingest record into ClientRiskProfiles updating risk_score on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, effective_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO ClientRiskProfiles (client_id, risk_score)\nVALUES (101, 5000.00)\nON CONFLICT (client_id)\nDO UPDATE SET risk_score = EXCLUDED.risk_score;",
    "template": [
      {
        "text": "INSERT INTO ClientRiskProfiles (client_id, risk_score)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (client_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " risk_score = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.risk_score",
        "options": [
          "EXCLUDED.risk_score",
          "NEW.risk_score",
          "ClientRiskProfiles.risk_score",
          "SOURCE.risk_score"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1009,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 09",
    "title": "Upsert Engine: Level 09: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into BankAccounts updating balance on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 33,
    "table": "BankAccounts",
    "scenario": "Ingest record into BankAccounts updating balance on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, updated_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BankAccounts (account_id, balance)\nVALUES (101, 5000.00)\nON CONFLICT (account_id)\nDO UPDATE SET balance = EXCLUDED.balance;",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (account_id, balance)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (account_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.balance",
        "options": [
          "EXCLUDED.balance",
          "NEW.balance",
          "BankAccounts.balance",
          "SOURCE.balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1010,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 10",
    "title": "Upsert Engine: Level 10: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into SecuritiesPositions updating quantity on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 34,
    "table": "SecuritiesPositions",
    "scenario": "Ingest record into SecuritiesPositions updating quantity on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, as_of_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO SecuritiesPositions (position_id, quantity)\nVALUES (101, 5000.00)\nON CONFLICT (position_id)\nDO UPDATE SET quantity = EXCLUDED.quantity;",
    "template": [
      {
        "text": "INSERT INTO SecuritiesPositions (position_id, quantity)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (position_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " quantity = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.quantity",
        "options": [
          "EXCLUDED.quantity",
          "NEW.quantity",
          "SecuritiesPositions.quantity",
          "SOURCE.quantity"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1011,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 11",
    "title": "Upsert Engine: Level 11: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into CreditFacilities updating drawn_amount on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 34,
    "table": "CreditFacilities",
    "scenario": "Ingest record into CreditFacilities updating drawn_amount on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "CreditFacilities(facility_id PK, drawn_amount NUMERIC, reviewed_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CreditFacilities (facility_id, drawn_amount)\nVALUES (101, 5000.00)\nON CONFLICT (facility_id)\nDO UPDATE SET drawn_amount = EXCLUDED.drawn_amount;",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (facility_id, drawn_amount)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (facility_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " drawn_amount = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.drawn_amount",
        "options": [
          "EXCLUDED.drawn_amount",
          "NEW.drawn_amount",
          "CreditFacilities.drawn_amount",
          "SOURCE.drawn_amount"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1012,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 12",
    "title": "Upsert Engine: Level 12: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into CryptoWallets updating token_balance on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 34,
    "table": "CryptoWallets",
    "scenario": "Ingest record into CryptoWallets updating token_balance on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, last_transfer TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CryptoWallets (wallet_id, token_balance)\nVALUES (101, 5000.00)\nON CONFLICT (wallet_id)\nDO UPDATE SET token_balance = EXCLUDED.token_balance;",
    "template": [
      {
        "text": "INSERT INTO CryptoWallets (wallet_id, token_balance)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (wallet_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " token_balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.token_balance",
        "options": [
          "EXCLUDED.token_balance",
          "NEW.token_balance",
          "CryptoWallets.token_balance",
          "SOURCE.token_balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1013,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 13",
    "title": "Upsert Engine: Level 13: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into InvoiceLedger updating amount_due on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 35,
    "table": "InvoiceLedger",
    "scenario": "Ingest record into InvoiceLedger updating amount_due on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "InvoiceLedger(invoice_id PK, amount_due NUMERIC, due_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO InvoiceLedger (invoice_id, amount_due)\nVALUES (101, 5000.00)\nON CONFLICT (invoice_id)\nDO UPDATE SET amount_due = EXCLUDED.amount_due;",
    "template": [
      {
        "text": "INSERT INTO InvoiceLedger (invoice_id, amount_due)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (invoice_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " amount_due = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.amount_due",
        "options": [
          "EXCLUDED.amount_due",
          "NEW.amount_due",
          "InvoiceLedger.amount_due",
          "SOURCE.amount_due"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1014,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 14",
    "title": "Upsert Engine: Level 14: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into InsuranceClaims updating settlement_amt on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 35,
    "table": "InsuranceClaims",
    "scenario": "Ingest record into InsuranceClaims updating settlement_amt on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, adjudicated_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO InsuranceClaims (claim_id, settlement_amt)\nVALUES (101, 5000.00)\nON CONFLICT (claim_id)\nDO UPDATE SET settlement_amt = EXCLUDED.settlement_amt;",
    "template": [
      {
        "text": "INSERT INTO InsuranceClaims (claim_id, settlement_amt)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (claim_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " settlement_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.settlement_amt",
        "options": [
          "EXCLUDED.settlement_amt",
          "NEW.settlement_amt",
          "InsuranceClaims.settlement_amt",
          "SOURCE.settlement_amt"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1015,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 15",
    "title": "Upsert Engine: Level 15: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into BrokerCommissionLedger updating payout_amt on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 36,
    "table": "BrokerCommissionLedger",
    "scenario": "Ingest record into BrokerCommissionLedger updating payout_amt on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id PK, payout_amt NUMERIC, cleared_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BrokerCommissionLedger (commission_id, payout_amt)\nVALUES (101, 5000.00)\nON CONFLICT (commission_id)\nDO UPDATE SET payout_amt = EXCLUDED.payout_amt;",
    "template": [
      {
        "text": "INSERT INTO BrokerCommissionLedger (commission_id, payout_amt)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (commission_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " payout_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.payout_amt",
        "options": [
          "EXCLUDED.payout_amt",
          "NEW.payout_amt",
          "BrokerCommissionLedger.payout_amt",
          "SOURCE.payout_amt"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1016,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 16",
    "title": "Upsert Engine: Level 16: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into ClientRiskProfiles updating risk_score on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 36,
    "table": "ClientRiskProfiles",
    "scenario": "Ingest record into ClientRiskProfiles updating risk_score on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, effective_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO ClientRiskProfiles (client_id, risk_score)\nVALUES (101, 5000.00)\nON CONFLICT (client_id)\nDO UPDATE SET risk_score = EXCLUDED.risk_score;",
    "template": [
      {
        "text": "INSERT INTO ClientRiskProfiles (client_id, risk_score)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (client_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " risk_score = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.risk_score",
        "options": [
          "EXCLUDED.risk_score",
          "NEW.risk_score",
          "ClientRiskProfiles.risk_score",
          "SOURCE.risk_score"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1017,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 17",
    "title": "Upsert Engine: Level 17: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into BankAccounts updating balance on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 36,
    "table": "BankAccounts",
    "scenario": "Ingest record into BankAccounts updating balance on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, updated_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BankAccounts (account_id, balance)\nVALUES (101, 5000.00)\nON CONFLICT (account_id)\nDO UPDATE SET balance = EXCLUDED.balance;",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (account_id, balance)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (account_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.balance",
        "options": [
          "EXCLUDED.balance",
          "NEW.balance",
          "BankAccounts.balance",
          "SOURCE.balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1018,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 18",
    "title": "Upsert Engine: Level 18: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into SecuritiesPositions updating quantity on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 37,
    "table": "SecuritiesPositions",
    "scenario": "Ingest record into SecuritiesPositions updating quantity on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, as_of_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO SecuritiesPositions (position_id, quantity)\nVALUES (101, 5000.00)\nON CONFLICT (position_id)\nDO UPDATE SET quantity = EXCLUDED.quantity;",
    "template": [
      {
        "text": "INSERT INTO SecuritiesPositions (position_id, quantity)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (position_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " quantity = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.quantity",
        "options": [
          "EXCLUDED.quantity",
          "NEW.quantity",
          "SecuritiesPositions.quantity",
          "SOURCE.quantity"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1019,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 19",
    "title": "Upsert Engine: Level 19: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into CreditFacilities updating drawn_amount on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 37,
    "table": "CreditFacilities",
    "scenario": "Ingest record into CreditFacilities updating drawn_amount on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "CreditFacilities(facility_id PK, drawn_amount NUMERIC, reviewed_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CreditFacilities (facility_id, drawn_amount)\nVALUES (101, 5000.00)\nON CONFLICT (facility_id)\nDO UPDATE SET drawn_amount = EXCLUDED.drawn_amount;",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (facility_id, drawn_amount)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (facility_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " drawn_amount = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.drawn_amount",
        "options": [
          "EXCLUDED.drawn_amount",
          "NEW.drawn_amount",
          "CreditFacilities.drawn_amount",
          "SOURCE.drawn_amount"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1020,
    "discipline": "IDEMPOTENT UPSERTS & MERGE OPERATIONS",
    "disciplineKey": "idempotent_upserts",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "DML Lvl 20",
    "title": "Upsert Engine: Level 20: Idempotent Conflict Resolution",
    "subtitle": "Ingest record into CryptoWallets updating token_balance on duplicate key collision.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (IDEMPOTENT UPSERTS & MERGE OPERATIONS)",
    "subcluster": "IDEMPOTENT UPSERTS & MERGE OPERATIONS (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "xp": 38,
    "table": "CryptoWallets",
    "scenario": "Ingest record into CryptoWallets updating token_balance on duplicate key collision.",
    "businessObjective": "Construct crash-resilient upsert query using ON CONFLICT DO UPDATE.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, last_transfer TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CryptoWallets (wallet_id, token_balance)\nVALUES (101, 5000.00)\nON CONFLICT (wallet_id)\nDO UPDATE SET token_balance = EXCLUDED.token_balance;",
    "template": [
      {
        "text": "INSERT INTO CryptoWallets (wallet_id, token_balance)\nVALUES (101, 5000.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONFLICT TARGET ]"
      },
      {
        "text": " (wallet_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ACTION CLAUSE ]"
      },
      {
        "text": " token_balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ PSEUDO-TABLE VAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ON CONFLICT",
        "options": [
          "ON CONFLICT",
          "ON DUPLICATE",
          "IF EXISTS",
          "WHEN MATCHED"
        ]
      },
      "slot2": {
        "correct": "DO UPDATE SET",
        "options": [
          "DO UPDATE SET",
          "UPDATE ROW SET",
          "SET NEW",
          "MODIFY"
        ]
      },
      "slot3": {
        "correct": "EXCLUDED.token_balance",
        "options": [
          "EXCLUDED.token_balance",
          "NEW.token_balance",
          "CryptoWallets.token_balance",
          "SOURCE.token_balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. EXCLUDED PSEUDO-TABLE & ARITY TRAP! Inside ON CONFLICT DO UPDATE, refer to incoming values via EXCLUDED.col, NOT the target table name! Omitting a unique constraint on the conflict target throws an immediate syntax error."
  },
  {
    "id": 1021,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 21",
    "title": "Mutation Projections: Level 01: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into InvoiceLedger and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 38,
    "table": "InvoiceLedger",
    "scenario": "Insert new transaction into InvoiceLedger and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "InvoiceLedger(invoice_id SERIAL PK, amount_due NUMERIC, due_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO InvoiceLedger (amount_due)\nVALUES (1250.00)\nRETURNING invoice_id, due_date;",
    "template": [
      {
        "text": "INSERT INTO InvoiceLedger (amount_due)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "invoice_id, due_date",
        "options": [
          "invoice_id, due_date",
          "invoice_id",
          "*",
          "amount_due"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1022,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 22",
    "title": "Mutation Projections: Level 02: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement settlement_amt on InsuranceClaims and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 38,
    "table": "InsuranceClaims",
    "scenario": "Atomically decrement settlement_amt on InsuranceClaims and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "UPDATE InsuranceClaims\nSET settlement_amt = settlement_amt - 500.00,\n    adjudicated_at = CURRENT_TIMESTAMP\nWHERE claim_id = 701\nRETURNING claim_id, settlement_amt AS updated_balance;",
    "template": [
      {
        "text": "UPDATE InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " settlement_amt = settlement_amt - 500.00,\n    adjudicated_at = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " claim_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " claim_id, settlement_amt ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1023,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 23",
    "title": "Mutation Projections: Level 03: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into BrokerCommissionLedger and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 39,
    "table": "BrokerCommissionLedger",
    "scenario": "Insert new transaction into BrokerCommissionLedger and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id SERIAL PK, payout_amt NUMERIC, cleared_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BrokerCommissionLedger (payout_amt)\nVALUES (1250.00)\nRETURNING commission_id, cleared_at;",
    "template": [
      {
        "text": "INSERT INTO BrokerCommissionLedger (payout_amt)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "commission_id, cleared_at",
        "options": [
          "commission_id, cleared_at",
          "commission_id",
          "*",
          "payout_amt"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1024,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 24",
    "title": "Mutation Projections: Level 04: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement risk_score on ClientRiskProfiles and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 39,
    "table": "ClientRiskProfiles",
    "scenario": "Atomically decrement risk_score on ClientRiskProfiles and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "UPDATE ClientRiskProfiles\nSET risk_score = risk_score - 500.00,\n    effective_date = CURRENT_TIMESTAMP\nWHERE client_id = 701\nRETURNING client_id, risk_score AS updated_balance;",
    "template": [
      {
        "text": "UPDATE ClientRiskProfiles\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " risk_score = risk_score - 500.00,\n    effective_date = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " client_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " client_id, risk_score ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1025,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 25",
    "title": "Mutation Projections: Level 05: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into BankAccounts and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 40,
    "table": "BankAccounts",
    "scenario": "Insert new transaction into BankAccounts and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "BankAccounts(account_id SERIAL PK, balance NUMERIC, updated_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BankAccounts (balance)\nVALUES (1250.00)\nRETURNING account_id, updated_at;",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (balance)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "account_id, updated_at",
        "options": [
          "account_id, updated_at",
          "account_id",
          "*",
          "balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1026,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 26",
    "title": "Mutation Projections: Level 06: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement quantity on SecuritiesPositions and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 40,
    "table": "SecuritiesPositions",
    "scenario": "Atomically decrement quantity on SecuritiesPositions and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, market_value VARCHAR)",
    "targetQuery": "UPDATE SecuritiesPositions\nSET quantity = quantity - 500.00,\n    as_of_date = CURRENT_TIMESTAMP\nWHERE position_id = 701\nRETURNING position_id, quantity AS updated_balance;",
    "template": [
      {
        "text": "UPDATE SecuritiesPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " quantity = quantity - 500.00,\n    as_of_date = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " position_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " position_id, quantity ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1027,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 27",
    "title": "Mutation Projections: Level 07: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into CreditFacilities and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 40,
    "table": "CreditFacilities",
    "scenario": "Insert new transaction into CreditFacilities and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "CreditFacilities(facility_id SERIAL PK, drawn_amount NUMERIC, reviewed_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CreditFacilities (drawn_amount)\nVALUES (1250.00)\nRETURNING facility_id, reviewed_at;",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (drawn_amount)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "facility_id, reviewed_at",
        "options": [
          "facility_id, reviewed_at",
          "facility_id",
          "*",
          "drawn_amount"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1028,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 28",
    "title": "Mutation Projections: Level 08: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement token_balance on CryptoWallets and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 41,
    "table": "CryptoWallets",
    "scenario": "Atomically decrement token_balance on CryptoWallets and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, kyc_verified VARCHAR)",
    "targetQuery": "UPDATE CryptoWallets\nSET token_balance = token_balance - 500.00,\n    last_transfer = CURRENT_TIMESTAMP\nWHERE wallet_id = 701\nRETURNING wallet_id, token_balance AS updated_balance;",
    "template": [
      {
        "text": "UPDATE CryptoWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " token_balance = token_balance - 500.00,\n    last_transfer = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " wallet_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " wallet_id, token_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1029,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 29",
    "title": "Mutation Projections: Level 09: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into InvoiceLedger and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 41,
    "table": "InvoiceLedger",
    "scenario": "Insert new transaction into InvoiceLedger and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "InvoiceLedger(invoice_id SERIAL PK, amount_due NUMERIC, due_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO InvoiceLedger (amount_due)\nVALUES (1250.00)\nRETURNING invoice_id, due_date;",
    "template": [
      {
        "text": "INSERT INTO InvoiceLedger (amount_due)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "invoice_id, due_date",
        "options": [
          "invoice_id, due_date",
          "invoice_id",
          "*",
          "amount_due"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1030,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 30",
    "title": "Mutation Projections: Level 10: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement settlement_amt on InsuranceClaims and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 42,
    "table": "InsuranceClaims",
    "scenario": "Atomically decrement settlement_amt on InsuranceClaims and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "UPDATE InsuranceClaims\nSET settlement_amt = settlement_amt - 500.00,\n    adjudicated_at = CURRENT_TIMESTAMP\nWHERE claim_id = 701\nRETURNING claim_id, settlement_amt AS updated_balance;",
    "template": [
      {
        "text": "UPDATE InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " settlement_amt = settlement_amt - 500.00,\n    adjudicated_at = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " claim_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " claim_id, settlement_amt ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1031,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 31",
    "title": "Mutation Projections: Level 11: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into BrokerCommissionLedger and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 42,
    "table": "BrokerCommissionLedger",
    "scenario": "Insert new transaction into BrokerCommissionLedger and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id SERIAL PK, payout_amt NUMERIC, cleared_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BrokerCommissionLedger (payout_amt)\nVALUES (1250.00)\nRETURNING commission_id, cleared_at;",
    "template": [
      {
        "text": "INSERT INTO BrokerCommissionLedger (payout_amt)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "commission_id, cleared_at",
        "options": [
          "commission_id, cleared_at",
          "commission_id",
          "*",
          "payout_amt"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1032,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 32",
    "title": "Mutation Projections: Level 12: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement risk_score on ClientRiskProfiles and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 42,
    "table": "ClientRiskProfiles",
    "scenario": "Atomically decrement risk_score on ClientRiskProfiles and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "UPDATE ClientRiskProfiles\nSET risk_score = risk_score - 500.00,\n    effective_date = CURRENT_TIMESTAMP\nWHERE client_id = 701\nRETURNING client_id, risk_score AS updated_balance;",
    "template": [
      {
        "text": "UPDATE ClientRiskProfiles\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " risk_score = risk_score - 500.00,\n    effective_date = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " client_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " client_id, risk_score ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1033,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 33",
    "title": "Mutation Projections: Level 13: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into BankAccounts and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 43,
    "table": "BankAccounts",
    "scenario": "Insert new transaction into BankAccounts and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "BankAccounts(account_id SERIAL PK, balance NUMERIC, updated_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BankAccounts (balance)\nVALUES (1250.00)\nRETURNING account_id, updated_at;",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (balance)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "account_id, updated_at",
        "options": [
          "account_id, updated_at",
          "account_id",
          "*",
          "balance"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1034,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 34",
    "title": "Mutation Projections: Level 14: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement quantity on SecuritiesPositions and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 43,
    "table": "SecuritiesPositions",
    "scenario": "Atomically decrement quantity on SecuritiesPositions and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, market_value VARCHAR)",
    "targetQuery": "UPDATE SecuritiesPositions\nSET quantity = quantity - 500.00,\n    as_of_date = CURRENT_TIMESTAMP\nWHERE position_id = 701\nRETURNING position_id, quantity AS updated_balance;",
    "template": [
      {
        "text": "UPDATE SecuritiesPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " quantity = quantity - 500.00,\n    as_of_date = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " position_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " position_id, quantity ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1035,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 35",
    "title": "Mutation Projections: Level 15: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into CreditFacilities and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 44,
    "table": "CreditFacilities",
    "scenario": "Insert new transaction into CreditFacilities and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "CreditFacilities(facility_id SERIAL PK, drawn_amount NUMERIC, reviewed_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO CreditFacilities (drawn_amount)\nVALUES (1250.00)\nRETURNING facility_id, reviewed_at;",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (drawn_amount)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "facility_id, reviewed_at",
        "options": [
          "facility_id, reviewed_at",
          "facility_id",
          "*",
          "drawn_amount"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1036,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 36",
    "title": "Mutation Projections: Level 16: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement token_balance on CryptoWallets and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 44,
    "table": "CryptoWallets",
    "scenario": "Atomically decrement token_balance on CryptoWallets and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, kyc_verified VARCHAR)",
    "targetQuery": "UPDATE CryptoWallets\nSET token_balance = token_balance - 500.00,\n    last_transfer = CURRENT_TIMESTAMP\nWHERE wallet_id = 701\nRETURNING wallet_id, token_balance AS updated_balance;",
    "template": [
      {
        "text": "UPDATE CryptoWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " token_balance = token_balance - 500.00,\n    last_transfer = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " wallet_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " wallet_id, token_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1037,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 37",
    "title": "Mutation Projections: Level 17: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into InvoiceLedger and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 44,
    "table": "InvoiceLedger",
    "scenario": "Insert new transaction into InvoiceLedger and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "InvoiceLedger(invoice_id SERIAL PK, amount_due NUMERIC, due_date TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO InvoiceLedger (amount_due)\nVALUES (1250.00)\nRETURNING invoice_id, due_date;",
    "template": [
      {
        "text": "INSERT INTO InvoiceLedger (amount_due)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "invoice_id, due_date",
        "options": [
          "invoice_id, due_date",
          "invoice_id",
          "*",
          "amount_due"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1038,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 38",
    "title": "Mutation Projections: Level 18: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement settlement_amt on InsuranceClaims and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 45,
    "table": "InsuranceClaims",
    "scenario": "Atomically decrement settlement_amt on InsuranceClaims and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "UPDATE InsuranceClaims\nSET settlement_amt = settlement_amt - 500.00,\n    adjudicated_at = CURRENT_TIMESTAMP\nWHERE claim_id = 701\nRETURNING claim_id, settlement_amt AS updated_balance;",
    "template": [
      {
        "text": "UPDATE InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " settlement_amt = settlement_amt - 500.00,\n    adjudicated_at = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " claim_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " claim_id, settlement_amt ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1039,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 39",
    "title": "Mutation Projections: Level 19: Atomic Insert State Capture",
    "subtitle": "Insert new transaction into BrokerCommissionLedger and immediately retrieve generated primary key.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "xp": 45,
    "table": "BrokerCommissionLedger",
    "scenario": "Insert new transaction into BrokerCommissionLedger and immediately retrieve generated primary key.",
    "businessObjective": "Utilize RETURNING to capture database-generated primary keys without additional queries.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id SERIAL PK, payout_amt NUMERIC, cleared_at TIMESTAMPTZ)",
    "targetQuery": "INSERT INTO BrokerCommissionLedger (payout_amt)\nVALUES (1250.00)\nRETURNING commission_id, cleared_at;",
    "template": [
      {
        "text": "INSERT INTO BrokerCommissionLedger (payout_amt)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES KEYWORD ]"
      },
      {
        "text": " (1250.00)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ RETURN CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING COLS ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "YIELD",
          "SELECT"
        ]
      },
      "slot3": {
        "correct": "commission_id, cleared_at",
        "options": [
          "commission_id, cleared_at",
          "commission_id",
          "*",
          "payout_amt"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1040,
    "discipline": "ATOMIC MUTATIONS WITH RETURNING CLAUSE",
    "disciplineKey": "audit_projections_returning",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 40",
    "title": "Mutation Projections: Level 20: Atomic Balance Mutate & Inspect",
    "subtitle": "Atomically decrement risk_score on ClientRiskProfiles and retrieve post-mutation balance.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ATOMIC MUTATIONS WITH RETURNING CLAUSE)",
    "subcluster": "ATOMIC MUTATIONS WITH RETURNING CLAUSE (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "xp": 46,
    "table": "ClientRiskProfiles",
    "scenario": "Atomically decrement risk_score on ClientRiskProfiles and retrieve post-mutation balance.",
    "businessObjective": "Eliminate race conditions by inspecting updated values via UPDATE ... RETURNING.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "UPDATE ClientRiskProfiles\nSET risk_score = risk_score - 500.00,\n    effective_date = CURRENT_TIMESTAMP\nWHERE client_id = 701\nRETURNING client_id, risk_score AS updated_balance;",
    "template": [
      {
        "text": "UPDATE ClientRiskProfiles\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " risk_score = risk_score - 500.00,\n    effective_date = CURRENT_TIMESTAMP\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " client_id = 701\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ RETURNING CLAUSE ]"
      },
      {
        "text": " client_id, risk_score ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ALIAS CLAUSE ]"
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
          "MODIFY",
          "UPDATE",
          "ASSIGN"
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
        "correct": "RETURNING",
        "options": [
          "RETURNING",
          "OUTPUT",
          "SELECT",
          "YIELD"
        ]
      },
      "slot4": {
        "correct": "AS updated_balance",
        "options": [
          "AS updated_balance",
          "INTO balance",
          "AS old_balance",
          "DEFAULT"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. CONCURRENCY RACE WINDOW TRAP! Never perform UPDATE then separate SELECT! In high-concurrency banking systems, another thread can mutate the row between your UPDATE and SELECT. Use UPDATE ... RETURNING to guarantee read consistency!"
  },
  {
    "id": 1041,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 41",
    "title": "Mutations: Level 01: Audit-Compliant Soft Deletion",
    "subtitle": "Deactivate customer account in BankAccounts by populating deleted_at timestamp.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Perform soft-delete to retain audit trail for regulatory compliance.",
    "xp": 46,
    "table": "BankAccounts",
    "scenario": "Deactivate customer account in BankAccounts by populating deleted_at timestamp.",
    "businessObjective": "Perform soft-delete to retain audit trail for regulatory compliance.",
    "schemaSnippet": "BankAccounts(account_id PK, status VARCHAR, deleted_at TIMESTAMPTZ)",
    "targetQuery": "UPDATE BankAccounts\nSET status = 'DEACTIVATED',\n    deleted_at = CURRENT_TIMESTAMP\nWHERE account_id = 502 AND deleted_at IS NULL;",
    "template": [
      {
        "text": "UPDATE BankAccounts\nSET status = 'DEACTIVATED',\n    deleted_at = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TIMESTAMP FUNC ]"
      },
      {
        "text": "\nWHERE account_id = 502\n  AND deleted_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ NULL CHECK OP ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL LITERAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CURRENT_TIMESTAMP",
        "options": [
          "CURRENT_TIMESTAMP",
          "NOW()",
          "'TODAY'",
          "SYSDATE"
        ]
      },
      "slot2": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "NULL",
        "options": [
          "NULL",
          "'NULL'",
          "0",
          "EMPTY"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1042,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 42",
    "title": "Mutations: Level 02: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across SecuritiesPositions using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 46,
    "table": "SecuritiesPositions",
    "scenario": "Apply dynamic fee penalties across SecuritiesPositions using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, market_value VARCHAR)",
    "targetQuery": "UPDATE SecuritiesPositions\nSET quantity = CASE\n  WHEN market_value = 'DELINQUENT' THEN quantity + 75.00\n  WHEN market_value = 'WARNING' THEN quantity + 25.00\n  ELSE quantity\nEND\nWHERE market_value IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE SecuritiesPositions\nSET quantity = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN market_value = 'DELINQUENT' THEN quantity + 75.00\n  WHEN market_value = 'WARNING' THEN quantity + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " quantity\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1043,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 43",
    "title": "Mutations: Level 03: Audit-Compliant Soft Deletion",
    "subtitle": "Deactivate customer account in CreditFacilities by populating deleted_at timestamp.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Perform soft-delete to retain audit trail for regulatory compliance.",
    "xp": 47,
    "table": "CreditFacilities",
    "scenario": "Deactivate customer account in CreditFacilities by populating deleted_at timestamp.",
    "businessObjective": "Perform soft-delete to retain audit trail for regulatory compliance.",
    "schemaSnippet": "CreditFacilities(facility_id PK, risk_grade VARCHAR, deleted_at TIMESTAMPTZ)",
    "targetQuery": "UPDATE CreditFacilities\nSET risk_grade = 'DEACTIVATED',\n    deleted_at = CURRENT_TIMESTAMP\nWHERE facility_id = 502 AND deleted_at IS NULL;",
    "template": [
      {
        "text": "UPDATE CreditFacilities\nSET risk_grade = 'DEACTIVATED',\n    deleted_at = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TIMESTAMP FUNC ]"
      },
      {
        "text": "\nWHERE facility_id = 502\n  AND deleted_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ NULL CHECK OP ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL LITERAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CURRENT_TIMESTAMP",
        "options": [
          "CURRENT_TIMESTAMP",
          "NOW()",
          "'TODAY'",
          "SYSDATE"
        ]
      },
      "slot2": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "NULL",
        "options": [
          "NULL",
          "'NULL'",
          "0",
          "EMPTY"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1044,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 44",
    "title": "Mutations: Level 04: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across CryptoWallets using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 47,
    "table": "CryptoWallets",
    "scenario": "Apply dynamic fee penalties across CryptoWallets using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, kyc_verified VARCHAR)",
    "targetQuery": "UPDATE CryptoWallets\nSET token_balance = CASE\n  WHEN kyc_verified = 'DELINQUENT' THEN token_balance + 75.00\n  WHEN kyc_verified = 'WARNING' THEN token_balance + 25.00\n  ELSE token_balance\nEND\nWHERE kyc_verified IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE CryptoWallets\nSET token_balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN kyc_verified = 'DELINQUENT' THEN token_balance + 75.00\n  WHEN kyc_verified = 'WARNING' THEN token_balance + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " token_balance\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE kyc_verified ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1045,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 45",
    "title": "Mutations: Level 05: Audit-Compliant Soft Deletion",
    "subtitle": "Deactivate customer account in InvoiceLedger by populating deleted_at timestamp.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Perform soft-delete to retain audit trail for regulatory compliance.",
    "xp": 48,
    "table": "InvoiceLedger",
    "scenario": "Deactivate customer account in InvoiceLedger by populating deleted_at timestamp.",
    "businessObjective": "Perform soft-delete to retain audit trail for regulatory compliance.",
    "schemaSnippet": "InvoiceLedger(invoice_id PK, payment_state VARCHAR, deleted_at TIMESTAMPTZ)",
    "targetQuery": "UPDATE InvoiceLedger\nSET payment_state = 'DEACTIVATED',\n    deleted_at = CURRENT_TIMESTAMP\nWHERE invoice_id = 502 AND deleted_at IS NULL;",
    "template": [
      {
        "text": "UPDATE InvoiceLedger\nSET payment_state = 'DEACTIVATED',\n    deleted_at = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TIMESTAMP FUNC ]"
      },
      {
        "text": "\nWHERE invoice_id = 502\n  AND deleted_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ NULL CHECK OP ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NULL LITERAL ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CURRENT_TIMESTAMP",
        "options": [
          "CURRENT_TIMESTAMP",
          "NOW()",
          "'TODAY'",
          "SYSDATE"
        ]
      },
      "slot2": {
        "correct": "IS",
        "options": [
          "IS",
          "=",
          "==",
          "NOT"
        ]
      },
      "slot3": {
        "correct": "NULL",
        "options": [
          "NULL",
          "'NULL'",
          "0",
          "EMPTY"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1046,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 46",
    "title": "Mutations: Level 06: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across InsuranceClaims using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 48,
    "table": "InsuranceClaims",
    "scenario": "Apply dynamic fee penalties across InsuranceClaims using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "UPDATE InsuranceClaims\nSET settlement_amt = CASE\n  WHEN claim_status = 'DELINQUENT' THEN settlement_amt + 75.00\n  WHEN claim_status = 'WARNING' THEN settlement_amt + 25.00\n  ELSE settlement_amt\nEND\nWHERE claim_status IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE InsuranceClaims\nSET settlement_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN claim_status = 'DELINQUENT' THEN settlement_amt + 75.00\n  WHEN claim_status = 'WARNING' THEN settlement_amt + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " settlement_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE claim_status ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1047,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 47",
    "title": "Mutations: Level 07: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across BrokerCommissionLedger using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 48,
    "table": "BrokerCommissionLedger",
    "scenario": "Apply dynamic fee penalties across BrokerCommissionLedger using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id PK, payout_amt NUMERIC, approval_status VARCHAR)",
    "targetQuery": "UPDATE BrokerCommissionLedger\nSET payout_amt = CASE\n  WHEN approval_status = 'DELINQUENT' THEN payout_amt + 75.00\n  WHEN approval_status = 'WARNING' THEN payout_amt + 25.00\n  ELSE payout_amt\nEND\nWHERE approval_status IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE BrokerCommissionLedger\nSET payout_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN approval_status = 'DELINQUENT' THEN payout_amt + 75.00\n  WHEN approval_status = 'WARNING' THEN payout_amt + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " payout_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE approval_status ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1048,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 48",
    "title": "Mutations: Level 08: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across ClientRiskProfiles using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 49,
    "table": "ClientRiskProfiles",
    "scenario": "Apply dynamic fee penalties across ClientRiskProfiles using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "UPDATE ClientRiskProfiles\nSET risk_score = CASE\n  WHEN compliance_tier = 'DELINQUENT' THEN risk_score + 75.00\n  WHEN compliance_tier = 'WARNING' THEN risk_score + 25.00\n  ELSE risk_score\nEND\nWHERE compliance_tier IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE ClientRiskProfiles\nSET risk_score = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN compliance_tier = 'DELINQUENT' THEN risk_score + 75.00\n  WHEN compliance_tier = 'WARNING' THEN risk_score + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " risk_score\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE compliance_tier ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1049,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 49",
    "title": "Mutations: Level 09: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across BankAccounts using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 49,
    "table": "BankAccounts",
    "scenario": "Apply dynamic fee penalties across BankAccounts using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "UPDATE BankAccounts\nSET balance = CASE\n  WHEN status = 'DELINQUENT' THEN balance + 75.00\n  WHEN status = 'WARNING' THEN balance + 25.00\n  ELSE balance\nEND\nWHERE status IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE BankAccounts\nSET balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN status = 'DELINQUENT' THEN balance + 75.00\n  WHEN status = 'WARNING' THEN balance + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " balance\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE status ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1050,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 50",
    "title": "Mutations: Level 10: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across SecuritiesPositions using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 50,
    "table": "SecuritiesPositions",
    "scenario": "Apply dynamic fee penalties across SecuritiesPositions using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, market_value VARCHAR)",
    "targetQuery": "UPDATE SecuritiesPositions\nSET quantity = CASE\n  WHEN market_value = 'DELINQUENT' THEN quantity + 75.00\n  WHEN market_value = 'WARNING' THEN quantity + 25.00\n  ELSE quantity\nEND\nWHERE market_value IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE SecuritiesPositions\nSET quantity = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN market_value = 'DELINQUENT' THEN quantity + 75.00\n  WHEN market_value = 'WARNING' THEN quantity + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " quantity\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1051,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 51",
    "title": "Mutations: Level 11: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across CreditFacilities using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 50,
    "table": "CreditFacilities",
    "scenario": "Apply dynamic fee penalties across CreditFacilities using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "CreditFacilities(facility_id PK, drawn_amount NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "UPDATE CreditFacilities\nSET drawn_amount = CASE\n  WHEN risk_grade = 'DELINQUENT' THEN drawn_amount + 75.00\n  WHEN risk_grade = 'WARNING' THEN drawn_amount + 25.00\n  ELSE drawn_amount\nEND\nWHERE risk_grade IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE CreditFacilities\nSET drawn_amount = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN risk_grade = 'DELINQUENT' THEN drawn_amount + 75.00\n  WHEN risk_grade = 'WARNING' THEN drawn_amount + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " drawn_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE risk_grade ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1052,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 52",
    "title": "Mutations: Level 12: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across CryptoWallets using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 50,
    "table": "CryptoWallets",
    "scenario": "Apply dynamic fee penalties across CryptoWallets using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, kyc_verified VARCHAR)",
    "targetQuery": "UPDATE CryptoWallets\nSET token_balance = CASE\n  WHEN kyc_verified = 'DELINQUENT' THEN token_balance + 75.00\n  WHEN kyc_verified = 'WARNING' THEN token_balance + 25.00\n  ELSE token_balance\nEND\nWHERE kyc_verified IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE CryptoWallets\nSET token_balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN kyc_verified = 'DELINQUENT' THEN token_balance + 75.00\n  WHEN kyc_verified = 'WARNING' THEN token_balance + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " token_balance\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE kyc_verified ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1053,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 53",
    "title": "Mutations: Level 13: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across InvoiceLedger using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 51,
    "table": "InvoiceLedger",
    "scenario": "Apply dynamic fee penalties across InvoiceLedger using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "InvoiceLedger(invoice_id PK, amount_due NUMERIC, payment_state VARCHAR)",
    "targetQuery": "UPDATE InvoiceLedger\nSET amount_due = CASE\n  WHEN payment_state = 'DELINQUENT' THEN amount_due + 75.00\n  WHEN payment_state = 'WARNING' THEN amount_due + 25.00\n  ELSE amount_due\nEND\nWHERE payment_state IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE InvoiceLedger\nSET amount_due = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN payment_state = 'DELINQUENT' THEN amount_due + 75.00\n  WHEN payment_state = 'WARNING' THEN amount_due + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " amount_due\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE payment_state ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1054,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 54",
    "title": "Mutations: Level 14: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across InsuranceClaims using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 51,
    "table": "InsuranceClaims",
    "scenario": "Apply dynamic fee penalties across InsuranceClaims using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "UPDATE InsuranceClaims\nSET settlement_amt = CASE\n  WHEN claim_status = 'DELINQUENT' THEN settlement_amt + 75.00\n  WHEN claim_status = 'WARNING' THEN settlement_amt + 25.00\n  ELSE settlement_amt\nEND\nWHERE claim_status IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE InsuranceClaims\nSET settlement_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN claim_status = 'DELINQUENT' THEN settlement_amt + 75.00\n  WHEN claim_status = 'WARNING' THEN settlement_amt + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " settlement_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE claim_status ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1055,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 55",
    "title": "Mutations: Level 15: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across BrokerCommissionLedger using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 52,
    "table": "BrokerCommissionLedger",
    "scenario": "Apply dynamic fee penalties across BrokerCommissionLedger using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id PK, payout_amt NUMERIC, approval_status VARCHAR)",
    "targetQuery": "UPDATE BrokerCommissionLedger\nSET payout_amt = CASE\n  WHEN approval_status = 'DELINQUENT' THEN payout_amt + 75.00\n  WHEN approval_status = 'WARNING' THEN payout_amt + 25.00\n  ELSE payout_amt\nEND\nWHERE approval_status IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE BrokerCommissionLedger\nSET payout_amt = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN approval_status = 'DELINQUENT' THEN payout_amt + 75.00\n  WHEN approval_status = 'WARNING' THEN payout_amt + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " payout_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE approval_status ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1056,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 56",
    "title": "Mutations: Level 16: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across ClientRiskProfiles using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 52,
    "table": "ClientRiskProfiles",
    "scenario": "Apply dynamic fee penalties across ClientRiskProfiles using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "UPDATE ClientRiskProfiles\nSET risk_score = CASE\n  WHEN compliance_tier = 'DELINQUENT' THEN risk_score + 75.00\n  WHEN compliance_tier = 'WARNING' THEN risk_score + 25.00\n  ELSE risk_score\nEND\nWHERE compliance_tier IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE ClientRiskProfiles\nSET risk_score = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN compliance_tier = 'DELINQUENT' THEN risk_score + 75.00\n  WHEN compliance_tier = 'WARNING' THEN risk_score + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " risk_score\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE compliance_tier ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1057,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 57",
    "title": "Mutations: Level 17: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across BankAccounts using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 52,
    "table": "BankAccounts",
    "scenario": "Apply dynamic fee penalties across BankAccounts using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "UPDATE BankAccounts\nSET balance = CASE\n  WHEN status = 'DELINQUENT' THEN balance + 75.00\n  WHEN status = 'WARNING' THEN balance + 25.00\n  ELSE balance\nEND\nWHERE status IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE BankAccounts\nSET balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN status = 'DELINQUENT' THEN balance + 75.00\n  WHEN status = 'WARNING' THEN balance + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " balance\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE status ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1058,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 58",
    "title": "Mutations: Level 18: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across SecuritiesPositions using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 53,
    "table": "SecuritiesPositions",
    "scenario": "Apply dynamic fee penalties across SecuritiesPositions using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, market_value VARCHAR)",
    "targetQuery": "UPDATE SecuritiesPositions\nSET quantity = CASE\n  WHEN market_value = 'DELINQUENT' THEN quantity + 75.00\n  WHEN market_value = 'WARNING' THEN quantity + 25.00\n  ELSE quantity\nEND\nWHERE market_value IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE SecuritiesPositions\nSET quantity = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN market_value = 'DELINQUENT' THEN quantity + 75.00\n  WHEN market_value = 'WARNING' THEN quantity + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " quantity\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1059,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 59",
    "title": "Mutations: Level 19: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across CreditFacilities using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 53,
    "table": "CreditFacilities",
    "scenario": "Apply dynamic fee penalties across CreditFacilities using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "CreditFacilities(facility_id PK, drawn_amount NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "UPDATE CreditFacilities\nSET drawn_amount = CASE\n  WHEN risk_grade = 'DELINQUENT' THEN drawn_amount + 75.00\n  WHEN risk_grade = 'WARNING' THEN drawn_amount + 25.00\n  ELSE drawn_amount\nEND\nWHERE risk_grade IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE CreditFacilities\nSET drawn_amount = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN risk_grade = 'DELINQUENT' THEN drawn_amount + 75.00\n  WHEN risk_grade = 'WARNING' THEN drawn_amount + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " drawn_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE risk_grade ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1060,
    "discipline": "CONDITIONAL MASS MUTATIONS & SOFT DELETES",
    "disciplineKey": "conditional_mutations_soft_deletes",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 60",
    "title": "Mutations: Level 20: Tiered Conditional Fee Adjustments",
    "subtitle": "Apply dynamic fee penalties across CryptoWallets using embedded CASE statements in UPDATE.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (CONDITIONAL MASS MUTATIONS & SOFT DELETES)",
    "subcluster": "CONDITIONAL MASS MUTATIONS & SOFT DELETES (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Update multiple rows conditionally using CASE WHEN expressions.",
    "xp": 54,
    "table": "CryptoWallets",
    "scenario": "Apply dynamic fee penalties across CryptoWallets using embedded CASE statements in UPDATE.",
    "businessObjective": "Update multiple rows conditionally using CASE WHEN expressions.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, kyc_verified VARCHAR)",
    "targetQuery": "UPDATE CryptoWallets\nSET token_balance = CASE\n  WHEN kyc_verified = 'DELINQUENT' THEN token_balance + 75.00\n  WHEN kyc_verified = 'WARNING' THEN token_balance + 25.00\n  ELSE token_balance\nEND\nWHERE kyc_verified IN ('DELINQUENT', 'WARNING');",
    "template": [
      {
        "text": "UPDATE CryptoWallets\nSET token_balance = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CASE KEYWORD ]"
      },
      {
        "text": "\n  WHEN kyc_verified = 'DELINQUENT' THEN token_balance + 75.00\n  WHEN kyc_verified = 'WARNING' THEN token_balance + 25.00\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FALLBACK CLAUSE ]"
      },
      {
        "text": " token_balance\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ END CLAUSE ]"
      },
      {
        "text": "\nWHERE kyc_verified ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ IN PREDICATE ]"
      },
      {
        "text": " ('DELINQUENT', 'WARNING');",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CASE",
        "options": [
          "CASE",
          "DECODE",
          "IF",
          "SWITCH"
        ]
      },
      "slot2": {
        "correct": "ELSE",
        "options": [
          "ELSE",
          "DEFAULT",
          "OTHERWISE",
          "FALLBACK"
        ]
      },
      "slot3": {
        "correct": "END",
        "options": [
          "END",
          "END CASE",
          "TERMINATE",
          "FINISH"
        ]
      },
      "slot4": {
        "correct": "IN",
        "options": [
          "IN",
          "BETWEEN",
          "LIKE",
          "EXISTS"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. UNBOUNDED UPDATE CATASTROPHE TRAP! Omitting the WHERE clause from an UPDATE or DELETE command mutates or wipes every single row in the entire production table! Always test queries with SELECT first or run inside a rolled-back transaction."
  },
  {
    "id": 1061,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 61",
    "title": "Transactions: Level 01: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 54,
    "table": "InvoiceLedger",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "InvoiceLedger(invoice_id PK, amount_due NUMERIC, payment_state VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT invoice_id, amount_due\nFROM InvoiceLedger\nWHERE invoice_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE InvoiceLedger SET amount_due = amount_due - 250.00 WHERE invoice_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT invoice_id, amount_due\nFROM InvoiceLedger\nWHERE invoice_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE InvoiceLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " amount_due = amount_due - 250.00\nWHERE invoice_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1062,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 62",
    "title": "Transactions: Level 02: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 54,
    "table": "InsuranceClaims",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT claim_id, settlement_amt\nFROM InsuranceClaims\nWHERE claim_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE InsuranceClaims SET settlement_amt = settlement_amt - 250.00 WHERE claim_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT claim_id, settlement_amt\nFROM InsuranceClaims\nWHERE claim_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " settlement_amt = settlement_amt - 250.00\nWHERE claim_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1063,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 63",
    "title": "Transactions: Level 03: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 55,
    "table": "BrokerCommissionLedger",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id PK, payout_amt NUMERIC, approval_status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT commission_id, payout_amt\nFROM BrokerCommissionLedger\nWHERE commission_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE BrokerCommissionLedger SET payout_amt = payout_amt - 250.00 WHERE commission_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT commission_id, payout_amt\nFROM BrokerCommissionLedger\nWHERE commission_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE BrokerCommissionLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " payout_amt = payout_amt - 250.00\nWHERE commission_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1064,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 64",
    "title": "Transactions: Level 04: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 55,
    "table": "ClientRiskProfiles",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT client_id, risk_score\nFROM ClientRiskProfiles\nWHERE client_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE ClientRiskProfiles SET risk_score = risk_score - 250.00 WHERE client_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT client_id, risk_score\nFROM ClientRiskProfiles\nWHERE client_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE ClientRiskProfiles\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " risk_score = risk_score - 250.00\nWHERE client_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1065,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 65",
    "title": "Transactions: Level 05: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 56,
    "table": "BankAccounts",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT account_id, balance\nFROM BankAccounts\nWHERE account_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE BankAccounts SET balance = balance - 250.00 WHERE account_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT account_id, balance\nFROM BankAccounts\nWHERE account_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE BankAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " balance = balance - 250.00\nWHERE account_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1066,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 66",
    "title": "Transactions: Level 06: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 56,
    "table": "SecuritiesPositions",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, market_value VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT position_id, quantity\nFROM SecuritiesPositions\nWHERE position_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE SecuritiesPositions SET quantity = quantity - 250.00 WHERE position_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT position_id, quantity\nFROM SecuritiesPositions\nWHERE position_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE SecuritiesPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " quantity = quantity - 250.00\nWHERE position_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1067,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 67",
    "title": "Transactions: Level 07: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 56,
    "table": "CreditFacilities",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "CreditFacilities(facility_id PK, drawn_amount NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT facility_id, drawn_amount\nFROM CreditFacilities\nWHERE facility_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE CreditFacilities SET drawn_amount = drawn_amount - 250.00 WHERE facility_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT facility_id, drawn_amount\nFROM CreditFacilities\nWHERE facility_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE CreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " drawn_amount = drawn_amount - 250.00\nWHERE facility_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1068,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 68",
    "title": "Transactions: Level 08: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 57,
    "table": "CryptoWallets",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, kyc_verified VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT wallet_id, token_balance\nFROM CryptoWallets\nWHERE wallet_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE CryptoWallets SET token_balance = token_balance - 250.00 WHERE wallet_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT wallet_id, token_balance\nFROM CryptoWallets\nWHERE wallet_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE CryptoWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " token_balance = token_balance - 250.00\nWHERE wallet_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1069,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 69",
    "title": "Transactions: Level 09: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 57,
    "table": "InvoiceLedger",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "InvoiceLedger(invoice_id PK, amount_due NUMERIC, payment_state VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT invoice_id, amount_due\nFROM InvoiceLedger\nWHERE invoice_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE InvoiceLedger SET amount_due = amount_due - 250.00 WHERE invoice_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT invoice_id, amount_due\nFROM InvoiceLedger\nWHERE invoice_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE InvoiceLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " amount_due = amount_due - 250.00\nWHERE invoice_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1070,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 70",
    "title": "Transactions: Level 10: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 58,
    "table": "InsuranceClaims",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT claim_id, settlement_amt\nFROM InsuranceClaims\nWHERE claim_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE InsuranceClaims SET settlement_amt = settlement_amt - 250.00 WHERE claim_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT claim_id, settlement_amt\nFROM InsuranceClaims\nWHERE claim_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " settlement_amt = settlement_amt - 250.00\nWHERE claim_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1071,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 71",
    "title": "Transactions: Level 11: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 58,
    "table": "BrokerCommissionLedger",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id PK, payout_amt NUMERIC, approval_status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT commission_id, payout_amt\nFROM BrokerCommissionLedger\nWHERE commission_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE BrokerCommissionLedger SET payout_amt = payout_amt - 250.00 WHERE commission_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT commission_id, payout_amt\nFROM BrokerCommissionLedger\nWHERE commission_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE BrokerCommissionLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " payout_amt = payout_amt - 250.00\nWHERE commission_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1072,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 72",
    "title": "Transactions: Level 12: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 58,
    "table": "ClientRiskProfiles",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT client_id, risk_score\nFROM ClientRiskProfiles\nWHERE client_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE ClientRiskProfiles SET risk_score = risk_score - 250.00 WHERE client_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT client_id, risk_score\nFROM ClientRiskProfiles\nWHERE client_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE ClientRiskProfiles\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " risk_score = risk_score - 250.00\nWHERE client_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1073,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 73",
    "title": "Transactions: Level 13: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 59,
    "table": "BankAccounts",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT account_id, balance\nFROM BankAccounts\nWHERE account_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE BankAccounts SET balance = balance - 250.00 WHERE account_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT account_id, balance\nFROM BankAccounts\nWHERE account_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE BankAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " balance = balance - 250.00\nWHERE account_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1074,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 74",
    "title": "Transactions: Level 14: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 59,
    "table": "SecuritiesPositions",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "SecuritiesPositions(position_id PK, quantity NUMERIC, market_value VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT position_id, quantity\nFROM SecuritiesPositions\nWHERE position_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE SecuritiesPositions SET quantity = quantity - 250.00 WHERE position_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT position_id, quantity\nFROM SecuritiesPositions\nWHERE position_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE SecuritiesPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " quantity = quantity - 250.00\nWHERE position_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1075,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "DML Lvl 75",
    "title": "Transactions: Level 15: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 60,
    "table": "CreditFacilities",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "CreditFacilities(facility_id PK, drawn_amount NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT facility_id, drawn_amount\nFROM CreditFacilities\nWHERE facility_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE CreditFacilities SET drawn_amount = drawn_amount - 250.00 WHERE facility_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT facility_id, drawn_amount\nFROM CreditFacilities\nWHERE facility_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE CreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " drawn_amount = drawn_amount - 250.00\nWHERE facility_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1076,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 76",
    "title": "Transactions: Level 16: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 60,
    "table": "CryptoWallets",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, token_balance NUMERIC, kyc_verified VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT wallet_id, token_balance\nFROM CryptoWallets\nWHERE wallet_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE CryptoWallets SET token_balance = token_balance - 250.00 WHERE wallet_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT wallet_id, token_balance\nFROM CryptoWallets\nWHERE wallet_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE CryptoWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " token_balance = token_balance - 250.00\nWHERE wallet_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1077,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 77",
    "title": "Transactions: Level 17: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 60,
    "table": "InvoiceLedger",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "InvoiceLedger(invoice_id PK, amount_due NUMERIC, payment_state VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT invoice_id, amount_due\nFROM InvoiceLedger\nWHERE invoice_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE InvoiceLedger SET amount_due = amount_due - 250.00 WHERE invoice_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT invoice_id, amount_due\nFROM InvoiceLedger\nWHERE invoice_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE InvoiceLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " amount_due = amount_due - 250.00\nWHERE invoice_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1078,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 78",
    "title": "Transactions: Level 18: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 61,
    "table": "InsuranceClaims",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "InsuranceClaims(claim_id PK, settlement_amt NUMERIC, claim_status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT claim_id, settlement_amt\nFROM InsuranceClaims\nWHERE claim_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE InsuranceClaims SET settlement_amt = settlement_amt - 250.00 WHERE claim_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT claim_id, settlement_amt\nFROM InsuranceClaims\nWHERE claim_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE InsuranceClaims\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " settlement_amt = settlement_amt - 250.00\nWHERE claim_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1079,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 79",
    "title": "Transactions: Level 19: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 61,
    "table": "BrokerCommissionLedger",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "BrokerCommissionLedger(commission_id PK, payout_amt NUMERIC, approval_status VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT commission_id, payout_amt\nFROM BrokerCommissionLedger\nWHERE commission_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE BrokerCommissionLedger SET payout_amt = payout_amt - 250.00 WHERE commission_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT commission_id, payout_amt\nFROM BrokerCommissionLedger\nWHERE commission_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE BrokerCommissionLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " payout_amt = payout_amt - 250.00\nWHERE commission_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1080,
    "discipline": "ACID TRANSACTIONS & PESSIMISTIC LOCKING",
    "disciplineKey": "acid_transactions_concurrency",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 80",
    "title": "Transactions: Level 20: Pessimistic Row Locking (FOR UPDATE)",
    "subtitle": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (ACID TRANSACTIONS & PESSIMISTIC LOCKING)",
    "subcluster": "ACID TRANSACTIONS & PESSIMISTIC LOCKING (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "xp": 62,
    "table": "ClientRiskProfiles",
    "scenario": "Prevent race conditions and double-spending by acquiring exclusive row lock.",
    "businessObjective": "Lock selected records using SELECT ... FOR UPDATE within a transaction.",
    "schemaSnippet": "ClientRiskProfiles(client_id PK, risk_score NUMERIC, compliance_tier VARCHAR)",
    "targetQuery": "BEGIN;\nSELECT client_id, risk_score\nFROM ClientRiskProfiles\nWHERE client_id = 101\nFOR UPDATE;\n-- Perform balance deduction\nUPDATE ClientRiskProfiles SET risk_score = risk_score - 250.00 WHERE client_id = 101;\nCOMMIT;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRANSACTION BEGIN ]"
      },
      {
        "text": "\nSELECT client_id, risk_score\nFROM ClientRiskProfiles\nWHERE client_id = 101\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PESSIMISTIC LOCK ]"
      },
      {
        "text": ";\nUPDATE ClientRiskProfiles\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SET CLAUSE ]"
      },
      {
        "text": " risk_score = risk_score - 250.00\nWHERE client_id = 101;\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ FINAL COMMIT ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "BEGIN;",
        "options": [
          "BEGIN;",
          "OPEN;",
          "START WORK;",
          "DO TRANSACTION;"
        ]
      },
      "slot2": {
        "correct": "FOR UPDATE",
        "options": [
          "FOR UPDATE",
          "FOR SHARE",
          "LOCK ROW",
          "HOLD EXCLUSIVE"
        ]
      },
      "slot3": {
        "correct": "SET",
        "options": [
          "SET",
          "MODIFY",
          "UPDATE",
          "CHANGE"
        ]
      },
      "slot4": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "RELEASE",
          "END",
          "SAVE"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. DIRTY READ & DEADLOCK CYCLE TRAP! Locking rows in inconsistent order across concurrent transactions causes database deadlocks. Always acquire row locks in deterministic primary key order (ORDER BY account_id)!"
  },
  {
    "id": 1081,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 81",
    "title": "SCD Type 2: Level 01: Insert New Active Version Tuple",
    "subtitle": "Append new version record into BankAccounts with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 62,
    "table": "BankAccounts",
    "scenario": "Append new version record into BankAccounts with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "BankAccounts(dim_id PK, account_id, status, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO BankAccounts (account_id, status, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (account_id, status, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1082,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 82",
    "title": "SCD Type 2: Level 02: Insert New Active Version Tuple",
    "subtitle": "Append new version record into SecuritiesPositions with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 62,
    "table": "SecuritiesPositions",
    "scenario": "Append new version record into SecuritiesPositions with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "SecuritiesPositions(dim_id PK, position_id, market_value, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO SecuritiesPositions (position_id, market_value, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO SecuritiesPositions (position_id, market_value, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1083,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 83",
    "title": "SCD Type 2: Level 03: Insert New Active Version Tuple",
    "subtitle": "Append new version record into CreditFacilities with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 63,
    "table": "CreditFacilities",
    "scenario": "Append new version record into CreditFacilities with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "CreditFacilities(dim_id PK, facility_id, risk_grade, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO CreditFacilities (facility_id, risk_grade, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (facility_id, risk_grade, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1084,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 84",
    "title": "SCD Type 2: Level 04: Insert New Active Version Tuple",
    "subtitle": "Append new version record into CryptoWallets with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 63,
    "table": "CryptoWallets",
    "scenario": "Append new version record into CryptoWallets with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "CryptoWallets(dim_id PK, wallet_id, kyc_verified, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO CryptoWallets (wallet_id, kyc_verified, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO CryptoWallets (wallet_id, kyc_verified, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1085,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 85",
    "title": "SCD Type 2: Level 05: Insert New Active Version Tuple",
    "subtitle": "Append new version record into InvoiceLedger with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 64,
    "table": "InvoiceLedger",
    "scenario": "Append new version record into InvoiceLedger with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "InvoiceLedger(dim_id PK, invoice_id, payment_state, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO InvoiceLedger (invoice_id, payment_state, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO InvoiceLedger (invoice_id, payment_state, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1086,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 86",
    "title": "SCD Type 2: Level 06: Insert New Active Version Tuple",
    "subtitle": "Append new version record into InsuranceClaims with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 64,
    "table": "InsuranceClaims",
    "scenario": "Append new version record into InsuranceClaims with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "InsuranceClaims(dim_id PK, claim_id, claim_status, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO InsuranceClaims (claim_id, claim_status, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO InsuranceClaims (claim_id, claim_status, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1087,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 87",
    "title": "SCD Type 2: Level 07: Insert New Active Version Tuple",
    "subtitle": "Append new version record into BrokerCommissionLedger with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 64,
    "table": "BrokerCommissionLedger",
    "scenario": "Append new version record into BrokerCommissionLedger with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "BrokerCommissionLedger(dim_id PK, commission_id, approval_status, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO BrokerCommissionLedger (commission_id, approval_status, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO BrokerCommissionLedger (commission_id, approval_status, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1088,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 88",
    "title": "SCD Type 2: Level 08: Insert New Active Version Tuple",
    "subtitle": "Append new version record into ClientRiskProfiles with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 65,
    "table": "ClientRiskProfiles",
    "scenario": "Append new version record into ClientRiskProfiles with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "ClientRiskProfiles(dim_id PK, client_id, compliance_tier, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO ClientRiskProfiles (client_id, compliance_tier, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO ClientRiskProfiles (client_id, compliance_tier, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1089,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 89",
    "title": "SCD Type 2: Level 09: Insert New Active Version Tuple",
    "subtitle": "Append new version record into BankAccounts with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 65,
    "table": "BankAccounts",
    "scenario": "Append new version record into BankAccounts with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "BankAccounts(dim_id PK, account_id, status, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO BankAccounts (account_id, status, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (account_id, status, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1090,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 90",
    "title": "SCD Type 2: Level 10: Insert New Active Version Tuple",
    "subtitle": "Append new version record into SecuritiesPositions with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 66,
    "table": "SecuritiesPositions",
    "scenario": "Append new version record into SecuritiesPositions with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "SecuritiesPositions(dim_id PK, position_id, market_value, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO SecuritiesPositions (position_id, market_value, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO SecuritiesPositions (position_id, market_value, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1091,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 91",
    "title": "SCD Type 2: Level 11: Insert New Active Version Tuple",
    "subtitle": "Append new version record into CreditFacilities with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 66,
    "table": "CreditFacilities",
    "scenario": "Append new version record into CreditFacilities with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "CreditFacilities(dim_id PK, facility_id, risk_grade, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO CreditFacilities (facility_id, risk_grade, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (facility_id, risk_grade, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1092,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 92",
    "title": "SCD Type 2: Level 12: Insert New Active Version Tuple",
    "subtitle": "Append new version record into CryptoWallets with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 66,
    "table": "CryptoWallets",
    "scenario": "Append new version record into CryptoWallets with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "CryptoWallets(dim_id PK, wallet_id, kyc_verified, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO CryptoWallets (wallet_id, kyc_verified, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO CryptoWallets (wallet_id, kyc_verified, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1093,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 93",
    "title": "SCD Type 2: Level 13: Insert New Active Version Tuple",
    "subtitle": "Append new version record into InvoiceLedger with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 67,
    "table": "InvoiceLedger",
    "scenario": "Append new version record into InvoiceLedger with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "InvoiceLedger(dim_id PK, invoice_id, payment_state, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO InvoiceLedger (invoice_id, payment_state, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO InvoiceLedger (invoice_id, payment_state, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1094,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 94",
    "title": "SCD Type 2: Level 14: Insert New Active Version Tuple",
    "subtitle": "Append new version record into InsuranceClaims with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 67,
    "table": "InsuranceClaims",
    "scenario": "Append new version record into InsuranceClaims with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "InsuranceClaims(dim_id PK, claim_id, claim_status, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO InsuranceClaims (claim_id, claim_status, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO InsuranceClaims (claim_id, claim_status, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1095,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 95",
    "title": "SCD Type 2: Level 15: Insert New Active Version Tuple",
    "subtitle": "Append new version record into BrokerCommissionLedger with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 68,
    "table": "BrokerCommissionLedger",
    "scenario": "Append new version record into BrokerCommissionLedger with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "BrokerCommissionLedger(dim_id PK, commission_id, approval_status, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO BrokerCommissionLedger (commission_id, approval_status, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO BrokerCommissionLedger (commission_id, approval_status, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1096,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 96",
    "title": "SCD Type 2: Level 16: Insert New Active Version Tuple",
    "subtitle": "Append new version record into ClientRiskProfiles with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 68,
    "table": "ClientRiskProfiles",
    "scenario": "Append new version record into ClientRiskProfiles with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "ClientRiskProfiles(dim_id PK, client_id, compliance_tier, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO ClientRiskProfiles (client_id, compliance_tier, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO ClientRiskProfiles (client_id, compliance_tier, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1097,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 97",
    "title": "SCD Type 2: Level 17: Insert New Active Version Tuple",
    "subtitle": "Append new version record into BankAccounts with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 68,
    "table": "BankAccounts",
    "scenario": "Append new version record into BankAccounts with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "BankAccounts(dim_id PK, account_id, status, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO BankAccounts (account_id, status, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO BankAccounts (account_id, status, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1098,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 98",
    "title": "SCD Type 2: Level 18: Insert New Active Version Tuple",
    "subtitle": "Append new version record into SecuritiesPositions with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 69,
    "table": "SecuritiesPositions",
    "scenario": "Append new version record into SecuritiesPositions with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "SecuritiesPositions(dim_id PK, position_id, market_value, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO SecuritiesPositions (position_id, market_value, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO SecuritiesPositions (position_id, market_value, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1099,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 99",
    "title": "SCD Type 2: Level 19: Insert New Active Version Tuple",
    "subtitle": "Append new version record into CreditFacilities with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 69,
    "table": "CreditFacilities",
    "scenario": "Append new version record into CreditFacilities with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "CreditFacilities(dim_id PK, facility_id, risk_grade, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO CreditFacilities (facility_id, risk_grade, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO CreditFacilities (facility_id, risk_grade, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  },
  {
    "id": 1100,
    "discipline": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2)",
    "disciplineKey": "scd_type2_versioning",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "DML Lvl 100",
    "title": "SCD Type 2: Level 20: Insert New Active Version Tuple",
    "subtitle": "Append new version record into CryptoWallets with open-ended validity date window.",
    "type": "fill_blank",
    "category": "Section 11: DML & Transactions (SLOWLY CHANGING DIMENSIONS (SCD TYPE 2))",
    "subcluster": "SLOWLY CHANGING DIMENSIONS (SCD TYPE 2) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "xp": 70,
    "table": "CryptoWallets",
    "scenario": "Append new version record into CryptoWallets with open-ended validity date window.",
    "businessObjective": "Insert new SCD Type 2 row with CURRENT_DATE and maximum future date sentinel.",
    "schemaSnippet": "CryptoWallets(dim_id PK, wallet_id, kyc_verified, valid_from DATE, valid_to DATE, is_current BOOLEAN)",
    "targetQuery": "INSERT INTO CryptoWallets (wallet_id, kyc_verified, valid_from, valid_to, is_current)\nVALUES (405, 'VIP_TIER', CURRENT_DATE, '9999-12-31', TRUE);",
    "template": [
      {
        "text": "INSERT INTO CryptoWallets (wallet_id, kyc_verified, valid_from, valid_to, is_current)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ VALUES VERB ]"
      },
      {
        "text": " (405, 'VIP_TIER', ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FROM DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ SENTINEL DATE ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ACTIVE FLAG ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "VALUES",
        "options": [
          "VALUES",
          "SELECT",
          "ROW",
          "TUPLE"
        ]
      },
      "slot2": {
        "correct": "CURRENT_DATE",
        "options": [
          "CURRENT_DATE",
          "'1900-01-01'",
          "NULL",
          "SYSDATE"
        ]
      },
      "slot3": {
        "correct": "'9999-12-31'",
        "options": [
          "'9999-12-31'",
          "CURRENT_DATE",
          "NULL",
          "'2099-01-01'"
        ]
      },
      "slot4": {
        "correct": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "NULL",
          "1"
        ]
      }
    },
    "explanation": "DML and ACID transactions ensure atomic, isolated, and crash-resilient mutations. OVERLAPPING VALIDITY WINDOW TRAP! If version closing and new version insertion dates overlap or contain gaps, temporal point-in-time queries return either duplicate active records or zero records for a historical timestamp."
  }
];
