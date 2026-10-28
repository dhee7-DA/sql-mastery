// =============================================================================
// SECTION 12: VIEWS, MATERIALIZED VIEWS & STORED PROCEDURES ARENA (100 QUESTS)
// 5 Disciplines x 20 Levels (Standard Views, Materialized Views, Procedures, Functions, Triggers)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.VIEWS_DISCIPLINES_METADATA = [
  {
    "key": "standard_views",
    "name": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "symbol": "👁️",
    "color": "#38bdf8",
    "concept": "Virtual Abstraction & Security Shielding",
    "whenToUse": "When encapsulating complex joins or restricting analyst access to sensitive columns (like PII/SSN) without storing duplicate data on disk.",
    "scenarios": "Creating sanitized client view: CREATE VIEW v_SanitizedClients AS SELECT client_id, masked_ssn, risk_score FROM Clients; Simplifying recurring executive reporting queries.",
    "traps": "VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "key": "materialized_views_refresh",
    "name": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "symbol": "⚡",
    "color": "#10b981",
    "concept": "Precomputed Snapshot Acceleration",
    "whenToUse": "When analytical dashboards query heavy multi-table aggregations that take minutes to run, caching the computed result set on disk for millisecond reads.",
    "scenarios": "Precomputing daily corporate revenue: CREATE MATERIALIZED VIEW mv_DailyPnl AS SELECT ...; Refreshing asynchronously without locking reads: REFRESH MATERIALIZED VIEW CONCURRENTLY mv_DailyPnl;",
    "traps": "EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "key": "stored_procedures_transactions",
    "name": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "symbol": "⚙️",
    "color": "#f59e0b",
    "concept": "Procedural Workflow & Transaction Autonomy",
    "whenToUse": "When orchestrating multi-step operational workflows directly on the database server that require internal transaction commits or rollbacks.",
    "scenarios": "Executing batch end-of-month interest accruals: CREATE PROCEDURE sp_AccrueInterest(cutoff DATE) ... CALL sp_AccrueInterest('2026-09-30'); Rolling back individual batch failures.",
    "traps": "FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "key": "user_defined_functions",
    "name": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "symbol": "📐",
    "color": "#ec4899",
    "concept": "Reusable Scalar & Table Computation",
    "whenToUse": "When encapsulating pure financial formulas (Black-Scholes option pricing, compound interest, currency conversion) directly within SQL expressions.",
    "scenarios": "Calculating annualized interest: CREATE FUNCTION fn_AnnualizedYield(rate NUMERIC, periods INT) RETURNS NUMERIC IMMUTABLE ...; Evaluating portfolio metrics across millions of rows.",
    "traps": "VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "key": "triggers_audit_logging",
    "name": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "symbol": "🛡️",
    "color": "#a855f7",
    "concept": "Automated Event Capture & Change Auditing",
    "whenToUse": "When financial compliance (SOX, Basel III) requires guaranteed, untamperable audit logging of every row mutation regardless of which application executed it.",
    "scenarios": "Logging balance adjustments into AuditLedger: CREATE TRIGGER trg_AuditAccountChanges AFTER UPDATE ON Accounts FOR EACH ROW EXECUTE FUNCTION log_account_mutation(); Recording OLD and NEW values.",
    "traps": "MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  }
];

window.QUESTS_SECTION_12 = [
  {
    "id": 1101,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 01",
    "title": "Views: Level 01: Logical View Definition",
    "subtitle": "Encapsulate active records from BankAccounts inside virtual view v_ActiveBankAccounts.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 30,
    "table": "BankAccounts",
    "scenario": "Encapsulate active records from BankAccounts inside virtual view v_ActiveBankAccounts.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_ActiveBankAccounts AS\nSELECT account_id, balance\nFROM BankAccounts\nWHERE status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_ActiveBankAccounts ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT account_id, balance\nFROM BankAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1102,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 02",
    "title": "Views: Level 02: Logical View Definition",
    "subtitle": "Encapsulate active records from SecuritiesTrades inside virtual view v_SettledTrades.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 30,
    "table": "SecuritiesTrades",
    "scenario": "Encapsulate active records from SecuritiesTrades inside virtual view v_SettledTrades.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "SecuritiesTrades(trade_id PK, trade_amount NUMERIC, settlement_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_SettledTrades AS\nSELECT trade_id, trade_amount\nFROM SecuritiesTrades\nWHERE settlement_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_SettledTrades ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT trade_id, trade_amount\nFROM SecuritiesTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " settlement_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1103,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 03",
    "title": "Views: Level 03: Logical View Definition",
    "subtitle": "Encapsulate active records from ClientCreditFacilities inside virtual view v_MonitoredFacilities.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 31,
    "table": "ClientCreditFacilities",
    "scenario": "Encapsulate active records from ClientCreditFacilities inside virtual view v_MonitoredFacilities.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "ClientCreditFacilities(facility_id PK, facility_limit NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_MonitoredFacilities AS\nSELECT facility_id, facility_limit\nFROM ClientCreditFacilities\nWHERE risk_grade = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_MonitoredFacilities ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT facility_id, facility_limit\nFROM ClientCreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " risk_grade = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1104,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 04",
    "title": "Views: Level 04: Logical View Definition",
    "subtitle": "Encapsulate active records from CryptoWallets inside virtual view v_VerifiedWallets.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 31,
    "table": "CryptoWallets",
    "scenario": "Encapsulate active records from CryptoWallets inside virtual view v_VerifiedWallets.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, staked_amount NUMERIC, kyc_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_VerifiedWallets AS\nSELECT wallet_id, staked_amount\nFROM CryptoWallets\nWHERE kyc_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_VerifiedWallets ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT wallet_id, staked_amount\nFROM CryptoWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " kyc_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1105,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 05",
    "title": "Views: Level 05: Logical View Definition",
    "subtitle": "Encapsulate active records from CustomerInvoices inside virtual view v_OverdueInvoices.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 32,
    "table": "CustomerInvoices",
    "scenario": "Encapsulate active records from CustomerInvoices inside virtual view v_OverdueInvoices.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC, payment_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_OverdueInvoices AS\nSELECT invoice_id, invoice_total\nFROM CustomerInvoices\nWHERE payment_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_OverdueInvoices ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT invoice_id, invoice_total\nFROM CustomerInvoices\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " payment_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1106,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 06",
    "title": "Views: Level 06: Logical View Definition",
    "subtitle": "Encapsulate active records from InsurancePolicies inside virtual view v_ActivePolicies.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 32,
    "table": "InsurancePolicies",
    "scenario": "Encapsulate active records from InsurancePolicies inside virtual view v_ActivePolicies.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "InsurancePolicies(policy_id PK, coverage_amt NUMERIC, policy_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_ActivePolicies AS\nSELECT policy_id, coverage_amt\nFROM InsurancePolicies\nWHERE policy_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_ActivePolicies ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT policy_id, coverage_amt\nFROM InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " policy_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1107,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 07",
    "title": "Views: Level 07: Logical View Definition",
    "subtitle": "Encapsulate active records from AssetValuations inside virtual view v_CurrentValuations.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 32,
    "table": "AssetValuations",
    "scenario": "Encapsulate active records from AssetValuations inside virtual view v_CurrentValuations.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC, audit_state VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_CurrentValuations AS\nSELECT asset_id, market_value\nFROM AssetValuations\nWHERE audit_state = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_CurrentValuations ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT asset_id, market_value\nFROM AssetValuations\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " audit_state = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1108,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 08",
    "title": "Views: Level 08: Logical View Definition",
    "subtitle": "Encapsulate active records from TreasuryBonds inside virtual view v_ActiveBonds.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 33,
    "table": "TreasuryBonds",
    "scenario": "Encapsulate active records from TreasuryBonds inside virtual view v_ActiveBonds.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "TreasuryBonds(bond_id PK, coupon_rate NUMERIC, maturity_date VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_ActiveBonds AS\nSELECT bond_id, coupon_rate\nFROM TreasuryBonds\nWHERE maturity_date = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_ActiveBonds ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT bond_id, coupon_rate\nFROM TreasuryBonds\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " maturity_date = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1109,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 09",
    "title": "Views: Level 09: Logical View Definition",
    "subtitle": "Encapsulate active records from BankAccounts inside virtual view v_ActiveBankAccounts.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 33,
    "table": "BankAccounts",
    "scenario": "Encapsulate active records from BankAccounts inside virtual view v_ActiveBankAccounts.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_ActiveBankAccounts AS\nSELECT account_id, balance\nFROM BankAccounts\nWHERE status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_ActiveBankAccounts ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT account_id, balance\nFROM BankAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1110,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 10",
    "title": "Views: Level 10: Logical View Definition",
    "subtitle": "Encapsulate active records from SecuritiesTrades inside virtual view v_SettledTrades.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 34,
    "table": "SecuritiesTrades",
    "scenario": "Encapsulate active records from SecuritiesTrades inside virtual view v_SettledTrades.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "SecuritiesTrades(trade_id PK, trade_amount NUMERIC, settlement_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_SettledTrades AS\nSELECT trade_id, trade_amount\nFROM SecuritiesTrades\nWHERE settlement_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_SettledTrades ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT trade_id, trade_amount\nFROM SecuritiesTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " settlement_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1111,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 11",
    "title": "Views: Level 11: Logical View Definition",
    "subtitle": "Encapsulate active records from ClientCreditFacilities inside virtual view v_MonitoredFacilities.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 34,
    "table": "ClientCreditFacilities",
    "scenario": "Encapsulate active records from ClientCreditFacilities inside virtual view v_MonitoredFacilities.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "ClientCreditFacilities(facility_id PK, facility_limit NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_MonitoredFacilities AS\nSELECT facility_id, facility_limit\nFROM ClientCreditFacilities\nWHERE risk_grade = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_MonitoredFacilities ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT facility_id, facility_limit\nFROM ClientCreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " risk_grade = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1112,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 12",
    "title": "Views: Level 12: Logical View Definition",
    "subtitle": "Encapsulate active records from CryptoWallets inside virtual view v_VerifiedWallets.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 34,
    "table": "CryptoWallets",
    "scenario": "Encapsulate active records from CryptoWallets inside virtual view v_VerifiedWallets.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, staked_amount NUMERIC, kyc_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_VerifiedWallets AS\nSELECT wallet_id, staked_amount\nFROM CryptoWallets\nWHERE kyc_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_VerifiedWallets ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT wallet_id, staked_amount\nFROM CryptoWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " kyc_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1113,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 13",
    "title": "Views: Level 13: Logical View Definition",
    "subtitle": "Encapsulate active records from CustomerInvoices inside virtual view v_OverdueInvoices.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 35,
    "table": "CustomerInvoices",
    "scenario": "Encapsulate active records from CustomerInvoices inside virtual view v_OverdueInvoices.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC, payment_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_OverdueInvoices AS\nSELECT invoice_id, invoice_total\nFROM CustomerInvoices\nWHERE payment_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_OverdueInvoices ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT invoice_id, invoice_total\nFROM CustomerInvoices\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " payment_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1114,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 14",
    "title": "Views: Level 14: Logical View Definition",
    "subtitle": "Encapsulate active records from InsurancePolicies inside virtual view v_ActivePolicies.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 35,
    "table": "InsurancePolicies",
    "scenario": "Encapsulate active records from InsurancePolicies inside virtual view v_ActivePolicies.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "InsurancePolicies(policy_id PK, coverage_amt NUMERIC, policy_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_ActivePolicies AS\nSELECT policy_id, coverage_amt\nFROM InsurancePolicies\nWHERE policy_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_ActivePolicies ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT policy_id, coverage_amt\nFROM InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " policy_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1115,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 15",
    "title": "Views: Level 15: Logical View Definition",
    "subtitle": "Encapsulate active records from AssetValuations inside virtual view v_CurrentValuations.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 36,
    "table": "AssetValuations",
    "scenario": "Encapsulate active records from AssetValuations inside virtual view v_CurrentValuations.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC, audit_state VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_CurrentValuations AS\nSELECT asset_id, market_value\nFROM AssetValuations\nWHERE audit_state = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_CurrentValuations ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT asset_id, market_value\nFROM AssetValuations\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " audit_state = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1116,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 16",
    "title": "Views: Level 16: Logical View Definition",
    "subtitle": "Encapsulate active records from TreasuryBonds inside virtual view v_ActiveBonds.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 36,
    "table": "TreasuryBonds",
    "scenario": "Encapsulate active records from TreasuryBonds inside virtual view v_ActiveBonds.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "TreasuryBonds(bond_id PK, coupon_rate NUMERIC, maturity_date VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_ActiveBonds AS\nSELECT bond_id, coupon_rate\nFROM TreasuryBonds\nWHERE maturity_date = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_ActiveBonds ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT bond_id, coupon_rate\nFROM TreasuryBonds\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " maturity_date = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1117,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 17",
    "title": "Views: Level 17: Logical View Definition",
    "subtitle": "Encapsulate active records from BankAccounts inside virtual view v_ActiveBankAccounts.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 36,
    "table": "BankAccounts",
    "scenario": "Encapsulate active records from BankAccounts inside virtual view v_ActiveBankAccounts.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_ActiveBankAccounts AS\nSELECT account_id, balance\nFROM BankAccounts\nWHERE status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_ActiveBankAccounts ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT account_id, balance\nFROM BankAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1118,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 18",
    "title": "Views: Level 18: Logical View Definition",
    "subtitle": "Encapsulate active records from SecuritiesTrades inside virtual view v_SettledTrades.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 37,
    "table": "SecuritiesTrades",
    "scenario": "Encapsulate active records from SecuritiesTrades inside virtual view v_SettledTrades.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "SecuritiesTrades(trade_id PK, trade_amount NUMERIC, settlement_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_SettledTrades AS\nSELECT trade_id, trade_amount\nFROM SecuritiesTrades\nWHERE settlement_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_SettledTrades ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT trade_id, trade_amount\nFROM SecuritiesTrades\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " settlement_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1119,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 19",
    "title": "Views: Level 19: Logical View Definition",
    "subtitle": "Encapsulate active records from ClientCreditFacilities inside virtual view v_MonitoredFacilities.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 37,
    "table": "ClientCreditFacilities",
    "scenario": "Encapsulate active records from ClientCreditFacilities inside virtual view v_MonitoredFacilities.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "ClientCreditFacilities(facility_id PK, facility_limit NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_MonitoredFacilities AS\nSELECT facility_id, facility_limit\nFROM ClientCreditFacilities\nWHERE risk_grade = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_MonitoredFacilities ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT facility_id, facility_limit\nFROM ClientCreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " risk_grade = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1120,
    "discipline": "STANDARD LOGICAL VIEWS & ROW SECURITY",
    "disciplineKey": "standard_views",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "Views Lvl 20",
    "title": "Views: Level 20: Logical View Definition",
    "subtitle": "Encapsulate active records from CryptoWallets inside virtual view v_VerifiedWallets.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STANDARD LOGICAL VIEWS & ROW SECURITY)",
    "subcluster": "STANDARD LOGICAL VIEWS & ROW SECURITY (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Create or replace virtual view with security filter on status.",
    "xp": 38,
    "table": "CryptoWallets",
    "scenario": "Encapsulate active records from CryptoWallets inside virtual view v_VerifiedWallets.",
    "businessObjective": "Create or replace virtual view with security filter on status.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, staked_amount NUMERIC, kyc_status VARCHAR)",
    "targetQuery": "CREATE OR REPLACE VIEW v_VerifiedWallets AS\nSELECT wallet_id, staked_amount\nFROM CryptoWallets\nWHERE kyc_status = 'ACTIVE';",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ DDL COMMAND ]"
      },
      {
        "text": " v_VerifiedWallets ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AS CLAUSE ]"
      },
      {
        "text": "\nSELECT wallet_id, staked_amount\nFROM CryptoWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ WHERE PREDICATE ]"
      },
      {
        "text": " kyc_status = 'ACTIVE';",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE OR REPLACE VIEW",
        "options": [
          "CREATE OR REPLACE VIEW",
          "CREATE TABLE AS",
          "NEW VIEW",
          "ALTER VIEW"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "IS",
          "BEGIN",
          "WITH"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VIEW UNFOLDING & RE-EXECUTION TRAP! Standard views do NOT store precomputed data! Querying a view re-executes the underlying SELECT every single time. Stacking views on top of views leads to massive query plan bloat."
  },
  {
    "id": 1121,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 21",
    "title": "Materialized Views: Level 01: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_MonthlyAgingReport.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 38,
    "table": "CustomerInvoices",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_MonthlyAgingReport.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC, payment_status VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_MonthlyAgingReport AS\nSELECT payment_status, SUM(invoice_total) AS total_amt\nFROM CustomerInvoices\nGROUP BY payment_status;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_MonthlyAgingReport AS\nSELECT payment_status, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(invoice_total) AS total_amt\nFROM CustomerInvoices\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " payment_status;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1122,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 22",
    "title": "Materialized Views: Level 02: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_UnderwritingExposure asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 38,
    "table": "mv_UnderwritingExposure",
    "scenario": "Refresh mv_UnderwritingExposure asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_UnderwritingExposure(policy_status UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_UnderwritingExposure;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_UnderwritingExposure",
        "options": [
          "mv_UnderwritingExposure",
          "InsurancePolicies",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1123,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 23",
    "title": "Materialized Views: Level 03: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_NavAssetSummary.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 39,
    "table": "AssetValuations",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_NavAssetSummary.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC, audit_state VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_NavAssetSummary AS\nSELECT audit_state, SUM(market_value) AS total_amt\nFROM AssetValuations\nGROUP BY audit_state;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_NavAssetSummary AS\nSELECT audit_state, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(market_value) AS total_amt\nFROM AssetValuations\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " audit_state;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1124,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 24",
    "title": "Materialized Views: Level 04: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_BondYieldCurve asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 39,
    "table": "mv_BondYieldCurve",
    "scenario": "Refresh mv_BondYieldCurve asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_BondYieldCurve(maturity_date UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_BondYieldCurve;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_BondYieldCurve",
        "options": [
          "mv_BondYieldCurve",
          "TreasuryBonds",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1125,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 25",
    "title": "Materialized Views: Level 05: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_AccountBalanceSummary.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 40,
    "table": "BankAccounts",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_AccountBalanceSummary.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_AccountBalanceSummary AS\nSELECT status, SUM(balance) AS total_amt\nFROM BankAccounts\nGROUP BY status;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_AccountBalanceSummary AS\nSELECT status, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(balance) AS total_amt\nFROM BankAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " status;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1126,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 26",
    "title": "Materialized Views: Level 06: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_DailyTradeVolume asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 40,
    "table": "mv_DailyTradeVolume",
    "scenario": "Refresh mv_DailyTradeVolume asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_DailyTradeVolume(settlement_status UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_DailyTradeVolume;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_DailyTradeVolume",
        "options": [
          "mv_DailyTradeVolume",
          "SecuritiesTrades",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1127,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 27",
    "title": "Materialized Views: Level 07: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_CreditRiskSnapshot.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 40,
    "table": "ClientCreditFacilities",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_CreditRiskSnapshot.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "ClientCreditFacilities(facility_id PK, facility_limit NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_CreditRiskSnapshot AS\nSELECT risk_grade, SUM(facility_limit) AS total_amt\nFROM ClientCreditFacilities\nGROUP BY risk_grade;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_CreditRiskSnapshot AS\nSELECT risk_grade, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(facility_limit) AS total_amt\nFROM ClientCreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " risk_grade;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1128,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 28",
    "title": "Materialized Views: Level 08: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_TokenLiquidityPool asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 41,
    "table": "mv_TokenLiquidityPool",
    "scenario": "Refresh mv_TokenLiquidityPool asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_TokenLiquidityPool(kyc_status UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_TokenLiquidityPool;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_TokenLiquidityPool",
        "options": [
          "mv_TokenLiquidityPool",
          "CryptoWallets",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1129,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 29",
    "title": "Materialized Views: Level 09: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_MonthlyAgingReport.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 41,
    "table": "CustomerInvoices",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_MonthlyAgingReport.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC, payment_status VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_MonthlyAgingReport AS\nSELECT payment_status, SUM(invoice_total) AS total_amt\nFROM CustomerInvoices\nGROUP BY payment_status;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_MonthlyAgingReport AS\nSELECT payment_status, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(invoice_total) AS total_amt\nFROM CustomerInvoices\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " payment_status;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1130,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 30",
    "title": "Materialized Views: Level 10: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_UnderwritingExposure asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 42,
    "table": "mv_UnderwritingExposure",
    "scenario": "Refresh mv_UnderwritingExposure asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_UnderwritingExposure(policy_status UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_UnderwritingExposure;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_UnderwritingExposure",
        "options": [
          "mv_UnderwritingExposure",
          "InsurancePolicies",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1131,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 31",
    "title": "Materialized Views: Level 11: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_NavAssetSummary.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 42,
    "table": "AssetValuations",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_NavAssetSummary.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC, audit_state VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_NavAssetSummary AS\nSELECT audit_state, SUM(market_value) AS total_amt\nFROM AssetValuations\nGROUP BY audit_state;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_NavAssetSummary AS\nSELECT audit_state, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(market_value) AS total_amt\nFROM AssetValuations\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " audit_state;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1132,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 32",
    "title": "Materialized Views: Level 12: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_BondYieldCurve asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 42,
    "table": "mv_BondYieldCurve",
    "scenario": "Refresh mv_BondYieldCurve asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_BondYieldCurve(maturity_date UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_BondYieldCurve;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_BondYieldCurve",
        "options": [
          "mv_BondYieldCurve",
          "TreasuryBonds",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1133,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 33",
    "title": "Materialized Views: Level 13: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_AccountBalanceSummary.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 43,
    "table": "BankAccounts",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_AccountBalanceSummary.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC, status VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_AccountBalanceSummary AS\nSELECT status, SUM(balance) AS total_amt\nFROM BankAccounts\nGROUP BY status;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_AccountBalanceSummary AS\nSELECT status, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(balance) AS total_amt\nFROM BankAccounts\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " status;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1134,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 34",
    "title": "Materialized Views: Level 14: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_DailyTradeVolume asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 43,
    "table": "mv_DailyTradeVolume",
    "scenario": "Refresh mv_DailyTradeVolume asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_DailyTradeVolume(settlement_status UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_DailyTradeVolume;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_DailyTradeVolume",
        "options": [
          "mv_DailyTradeVolume",
          "SecuritiesTrades",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1135,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 35",
    "title": "Materialized Views: Level 15: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_CreditRiskSnapshot.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 44,
    "table": "ClientCreditFacilities",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_CreditRiskSnapshot.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "ClientCreditFacilities(facility_id PK, facility_limit NUMERIC, risk_grade VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_CreditRiskSnapshot AS\nSELECT risk_grade, SUM(facility_limit) AS total_amt\nFROM ClientCreditFacilities\nGROUP BY risk_grade;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_CreditRiskSnapshot AS\nSELECT risk_grade, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(facility_limit) AS total_amt\nFROM ClientCreditFacilities\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " risk_grade;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1136,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 36",
    "title": "Materialized Views: Level 16: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_TokenLiquidityPool asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 44,
    "table": "mv_TokenLiquidityPool",
    "scenario": "Refresh mv_TokenLiquidityPool asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_TokenLiquidityPool(kyc_status UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_TokenLiquidityPool;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_TokenLiquidityPool",
        "options": [
          "mv_TokenLiquidityPool",
          "CryptoWallets",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1137,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 37",
    "title": "Materialized Views: Level 17: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_MonthlyAgingReport.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 44,
    "table": "CustomerInvoices",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_MonthlyAgingReport.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC, payment_status VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_MonthlyAgingReport AS\nSELECT payment_status, SUM(invoice_total) AS total_amt\nFROM CustomerInvoices\nGROUP BY payment_status;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_MonthlyAgingReport AS\nSELECT payment_status, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(invoice_total) AS total_amt\nFROM CustomerInvoices\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " payment_status;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1138,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 38",
    "title": "Materialized Views: Level 18: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_UnderwritingExposure asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 45,
    "table": "mv_UnderwritingExposure",
    "scenario": "Refresh mv_UnderwritingExposure asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_UnderwritingExposure(policy_status UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_UnderwritingExposure;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_UnderwritingExposure",
        "options": [
          "mv_UnderwritingExposure",
          "InsurancePolicies",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1139,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 39",
    "title": "Materialized Views: Level 19: Snapshot Aggregation Cache",
    "subtitle": "Cache heavy analytical summary on disk using materialized view mv_NavAssetSummary.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Construct materialized view storing physical query result set.",
    "xp": 45,
    "table": "AssetValuations",
    "scenario": "Cache heavy analytical summary on disk using materialized view mv_NavAssetSummary.",
    "businessObjective": "Construct materialized view storing physical query result set.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC, audit_state VARCHAR)",
    "targetQuery": "CREATE MATERIALIZED VIEW mv_NavAssetSummary AS\nSELECT audit_state, SUM(market_value) AS total_amt\nFROM AssetValuations\nGROUP BY audit_state;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ MAT VIEW DDL ]"
      },
      {
        "text": " mv_NavAssetSummary AS\nSELECT audit_state, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ AGGREGATION ]"
      },
      {
        "text": "(market_value) AS total_amt\nFROM AssetValuations\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ GROUP CLAUSE ]"
      },
      {
        "text": " audit_state;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE MATERIALIZED VIEW",
        "options": [
          "CREATE MATERIALIZED VIEW",
          "CREATE SNAPSHOT VIEW",
          "BUILD PHYSICAL VIEW",
          "CREATE CACHE VIEW"
        ]
      },
      "slot2": {
        "correct": "SUM",
        "options": [
          "SUM",
          "TOTAL",
          "AGG",
          "VALUE"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1140,
    "discipline": "MATERIALIZED VIEWS & CONCURRENT REFRESH",
    "disciplineKey": "materialized_views_refresh",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 40",
    "title": "Materialized Views: Level 20: Non-Blocking Concurrent Refresh",
    "subtitle": "Refresh mv_BondYieldCurve asynchronously without blocking ongoing analytical reader queries.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (MATERIALIZED VIEWS & CONCURRENT REFRESH)",
    "subcluster": "MATERIALIZED VIEWS & CONCURRENT REFRESH (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "xp": 46,
    "table": "mv_BondYieldCurve",
    "scenario": "Refresh mv_BondYieldCurve asynchronously without blocking ongoing analytical reader queries.",
    "businessObjective": "Execute REFRESH MATERIALIZED VIEW CONCURRENTLY using unique index.",
    "schemaSnippet": "mv_BondYieldCurve(maturity_date UNIQUE, total_amt NUMERIC)",
    "targetQuery": "REFRESH MATERIALIZED VIEW CONCURRENTLY mv_BondYieldCurve;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ REFRESH VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET TYPE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CONCURRENCY MODIFIER ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ MAT VIEW NAME ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "REFRESH",
        "options": [
          "REFRESH",
          "UPDATE",
          "RELOAD",
          "SYNC"
        ]
      },
      "slot2": {
        "correct": "MATERIALIZED VIEW",
        "options": [
          "MATERIALIZED VIEW",
          "VIEW CACHE",
          "SNAPSHOT TABLE",
          "VIEW"
        ]
      },
      "slot3": {
        "correct": "CONCURRENTLY",
        "options": [
          "CONCURRENTLY",
          "ASYNC",
          "PARALLEL",
          "NONBLOCKING"
        ]
      },
      "slot4": {
        "correct": "mv_BondYieldCurve",
        "options": [
          "mv_BondYieldCurve",
          "TreasuryBonds",
          "DATABASE",
          "SCHEMA"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. EXCLUSIVE LOCK & STALE DATA TRAP! Plain REFRESH MATERIALIZED VIEW acquires an exclusive lock that blocks all reader queries until completion! REFRESH CONCURRENTLY requires a UNIQUE INDEX on the materialized view."
  },
  {
    "id": 1141,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 41",
    "title": "Procedures: Level 01: Procedural Invocation & Call",
    "subtitle": "Execute automated reconciliation procedure sp_ReconcileBalances passing cutoff date argument.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Invoke stored procedure using standard SQL CALL statement.",
    "xp": 46,
    "table": "BankAccounts",
    "scenario": "Execute automated reconciliation procedure sp_ReconcileBalances passing cutoff date argument.",
    "businessObjective": "Invoke stored procedure using standard SQL CALL statement.",
    "schemaSnippet": "PROCEDURE sp_ReconcileBalances(cutoff_date DATE)",
    "targetQuery": "CALL sp_ReconcileBalances('2026-09-30');",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PROCEDURE CALL VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PROCEDURE NAME ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ARGUMENT LITERAL ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CALL",
        "options": [
          "CALL",
          "EXECUTE",
          "RUN",
          "PERFORM"
        ]
      },
      "slot2": {
        "correct": "sp_ReconcileBalances",
        "options": [
          "sp_ReconcileBalances",
          "v_ActiveBankAccounts",
          "BankAccounts",
          "sp_Main"
        ]
      },
      "slot3": {
        "correct": "'2026-09-30'",
        "options": [
          "'2026-09-30'",
          "CURRENT_DATE",
          "NULL",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1142,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 42",
    "title": "Procedures: Level 02: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_SettleTrades with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 46,
    "table": "SecuritiesTrades",
    "scenario": "Author procedure sp_SettleTrades with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE SecuritiesTrades(trade_id PK, trade_amount NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_SettleTrades()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE SecuritiesTrades SET trade_amount = trade_amount * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_SettleTrades()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE SecuritiesTrades SET trade_amount = trade_amount * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1143,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 43",
    "title": "Procedures: Level 03: Procedural Invocation & Call",
    "subtitle": "Execute automated reconciliation procedure sp_ReviewCreditLimits passing cutoff date argument.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Invoke stored procedure using standard SQL CALL statement.",
    "xp": 47,
    "table": "ClientCreditFacilities",
    "scenario": "Execute automated reconciliation procedure sp_ReviewCreditLimits passing cutoff date argument.",
    "businessObjective": "Invoke stored procedure using standard SQL CALL statement.",
    "schemaSnippet": "PROCEDURE sp_ReviewCreditLimits(cutoff_date DATE)",
    "targetQuery": "CALL sp_ReviewCreditLimits('2026-09-30');",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PROCEDURE CALL VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PROCEDURE NAME ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ARGUMENT LITERAL ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CALL",
        "options": [
          "CALL",
          "EXECUTE",
          "RUN",
          "PERFORM"
        ]
      },
      "slot2": {
        "correct": "sp_ReviewCreditLimits",
        "options": [
          "sp_ReviewCreditLimits",
          "v_MonitoredFacilities",
          "ClientCreditFacilities",
          "sp_Main"
        ]
      },
      "slot3": {
        "correct": "'2026-09-30'",
        "options": [
          "'2026-09-30'",
          "CURRENT_DATE",
          "NULL",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1144,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 44",
    "title": "Procedures: Level 04: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_DisburseRewards with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 47,
    "table": "CryptoWallets",
    "scenario": "Author procedure sp_DisburseRewards with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE CryptoWallets(wallet_id PK, staked_amount NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_DisburseRewards()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE CryptoWallets SET staked_amount = staked_amount * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_DisburseRewards()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE CryptoWallets SET staked_amount = staked_amount * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1145,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 45",
    "title": "Procedures: Level 05: Procedural Invocation & Call",
    "subtitle": "Execute automated reconciliation procedure sp_ApplyLateFees passing cutoff date argument.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Invoke stored procedure using standard SQL CALL statement.",
    "xp": 48,
    "table": "CustomerInvoices",
    "scenario": "Execute automated reconciliation procedure sp_ApplyLateFees passing cutoff date argument.",
    "businessObjective": "Invoke stored procedure using standard SQL CALL statement.",
    "schemaSnippet": "PROCEDURE sp_ApplyLateFees(cutoff_date DATE)",
    "targetQuery": "CALL sp_ApplyLateFees('2026-09-30');",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ PROCEDURE CALL VERB ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PROCEDURE NAME ]"
      },
      {
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ARGUMENT LITERAL ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CALL",
        "options": [
          "CALL",
          "EXECUTE",
          "RUN",
          "PERFORM"
        ]
      },
      "slot2": {
        "correct": "sp_ApplyLateFees",
        "options": [
          "sp_ApplyLateFees",
          "v_OverdueInvoices",
          "CustomerInvoices",
          "sp_Main"
        ]
      },
      "slot3": {
        "correct": "'2026-09-30'",
        "options": [
          "'2026-09-30'",
          "CURRENT_DATE",
          "NULL",
          "DEFAULT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1146,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 46",
    "title": "Procedures: Level 06: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_RenewPolicies with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 48,
    "table": "InsurancePolicies",
    "scenario": "Author procedure sp_RenewPolicies with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE InsurancePolicies(policy_id PK, coverage_amt NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_RenewPolicies()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE InsurancePolicies SET coverage_amt = coverage_amt * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_RenewPolicies()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE InsurancePolicies SET coverage_amt = coverage_amt * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1147,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 47",
    "title": "Procedures: Level 07: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_RevaluePortfolios with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 48,
    "table": "AssetValuations",
    "scenario": "Author procedure sp_RevaluePortfolios with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE AssetValuations(asset_id PK, market_value NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_RevaluePortfolios()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE AssetValuations SET market_value = market_value * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_RevaluePortfolios()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE AssetValuations SET market_value = market_value * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1148,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 48",
    "title": "Procedures: Level 08: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_AccrueCoupons with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 49,
    "table": "TreasuryBonds",
    "scenario": "Author procedure sp_AccrueCoupons with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE TreasuryBonds(bond_id PK, coupon_rate NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_AccrueCoupons()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE TreasuryBonds SET coupon_rate = coupon_rate * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_AccrueCoupons()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE TreasuryBonds SET coupon_rate = coupon_rate * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1149,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 49",
    "title": "Procedures: Level 09: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_ReconcileBalances with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 49,
    "table": "BankAccounts",
    "scenario": "Author procedure sp_ReconcileBalances with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE BankAccounts(account_id PK, balance NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_ReconcileBalances()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE BankAccounts SET balance = balance * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_ReconcileBalances()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE BankAccounts SET balance = balance * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1150,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 50",
    "title": "Procedures: Level 10: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_SettleTrades with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 50,
    "table": "SecuritiesTrades",
    "scenario": "Author procedure sp_SettleTrades with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE SecuritiesTrades(trade_id PK, trade_amount NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_SettleTrades()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE SecuritiesTrades SET trade_amount = trade_amount * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_SettleTrades()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE SecuritiesTrades SET trade_amount = trade_amount * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1151,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 51",
    "title": "Procedures: Level 11: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_ReviewCreditLimits with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 50,
    "table": "ClientCreditFacilities",
    "scenario": "Author procedure sp_ReviewCreditLimits with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE ClientCreditFacilities(facility_id PK, facility_limit NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_ReviewCreditLimits()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE ClientCreditFacilities SET facility_limit = facility_limit * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_ReviewCreditLimits()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE ClientCreditFacilities SET facility_limit = facility_limit * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1152,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 52",
    "title": "Procedures: Level 12: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_DisburseRewards with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 50,
    "table": "CryptoWallets",
    "scenario": "Author procedure sp_DisburseRewards with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE CryptoWallets(wallet_id PK, staked_amount NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_DisburseRewards()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE CryptoWallets SET staked_amount = staked_amount * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_DisburseRewards()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE CryptoWallets SET staked_amount = staked_amount * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1153,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 53",
    "title": "Procedures: Level 13: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_ApplyLateFees with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 51,
    "table": "CustomerInvoices",
    "scenario": "Author procedure sp_ApplyLateFees with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE CustomerInvoices(invoice_id PK, invoice_total NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_ApplyLateFees()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE CustomerInvoices SET invoice_total = invoice_total * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_ApplyLateFees()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE CustomerInvoices SET invoice_total = invoice_total * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1154,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 54",
    "title": "Procedures: Level 14: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_RenewPolicies with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 51,
    "table": "InsurancePolicies",
    "scenario": "Author procedure sp_RenewPolicies with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE InsurancePolicies(policy_id PK, coverage_amt NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_RenewPolicies()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE InsurancePolicies SET coverage_amt = coverage_amt * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_RenewPolicies()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE InsurancePolicies SET coverage_amt = coverage_amt * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1155,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 55",
    "title": "Procedures: Level 15: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_RevaluePortfolios with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 52,
    "table": "AssetValuations",
    "scenario": "Author procedure sp_RevaluePortfolios with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE AssetValuations(asset_id PK, market_value NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_RevaluePortfolios()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE AssetValuations SET market_value = market_value * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_RevaluePortfolios()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE AssetValuations SET market_value = market_value * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1156,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 56",
    "title": "Procedures: Level 16: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_AccrueCoupons with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 52,
    "table": "TreasuryBonds",
    "scenario": "Author procedure sp_AccrueCoupons with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE TreasuryBonds(bond_id PK, coupon_rate NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_AccrueCoupons()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE TreasuryBonds SET coupon_rate = coupon_rate * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_AccrueCoupons()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE TreasuryBonds SET coupon_rate = coupon_rate * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1157,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 57",
    "title": "Procedures: Level 17: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_ReconcileBalances with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 52,
    "table": "BankAccounts",
    "scenario": "Author procedure sp_ReconcileBalances with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE BankAccounts(account_id PK, balance NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_ReconcileBalances()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE BankAccounts SET balance = balance * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_ReconcileBalances()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE BankAccounts SET balance = balance * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1158,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 58",
    "title": "Procedures: Level 18: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_SettleTrades with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 53,
    "table": "SecuritiesTrades",
    "scenario": "Author procedure sp_SettleTrades with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE SecuritiesTrades(trade_id PK, trade_amount NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_SettleTrades()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE SecuritiesTrades SET trade_amount = trade_amount * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_SettleTrades()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE SecuritiesTrades SET trade_amount = trade_amount * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1159,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 59",
    "title": "Procedures: Level 19: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_ReviewCreditLimits with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 53,
    "table": "ClientCreditFacilities",
    "scenario": "Author procedure sp_ReviewCreditLimits with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE ClientCreditFacilities(facility_id PK, facility_limit NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_ReviewCreditLimits()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE ClientCreditFacilities SET facility_limit = facility_limit * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_ReviewCreditLimits()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE ClientCreditFacilities SET facility_limit = facility_limit * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1160,
    "discipline": "STORED PROCEDURES & EMBEDDED TRANSACTIONS",
    "disciplineKey": "stored_procedures_transactions",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 60",
    "title": "Procedures: Level 20: Autonomous Transaction Commit",
    "subtitle": "Author procedure sp_DisburseRewards with internal COMMIT to persist batch progress.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (STORED PROCEDURES & EMBEDDED TRANSACTIONS)",
    "subcluster": "STORED PROCEDURES & EMBEDDED TRANSACTIONS (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Define procedure containing internal transaction control statements.",
    "xp": 54,
    "table": "CryptoWallets",
    "scenario": "Author procedure sp_DisburseRewards with internal COMMIT to persist batch progress.",
    "businessObjective": "Define procedure containing internal transaction control statements.",
    "schemaSnippet": "TABLE CryptoWallets(wallet_id PK, staked_amount NUMERIC)",
    "targetQuery": "CREATE PROCEDURE sp_DisburseRewards()\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  UPDATE CryptoWallets SET staked_amount = staked_amount * 1.02;\n  COMMIT;\nEND;\n$$;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CREATE PROCEDURE ]"
      },
      {
        "text": " sp_DisburseRewards()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SPEC ]"
      },
      {
        "text": " plpgsql\nAS $$\nBEGIN\n  UPDATE CryptoWallets SET staked_amount = staked_amount * 1.02;\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ INTERNAL COMMIT ]"
      },
      {
        "text": ";\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ BLOCK END ]"
      },
      {
        "text": ";\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CREATE PROCEDURE",
        "options": [
          "CREATE PROCEDURE",
          "CREATE FUNCTION",
          "NEW PROCEDURE",
          "DEFINE SP"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "DIALECT",
          "ENGINE",
          "USING"
        ]
      },
      "slot3": {
        "correct": "COMMIT",
        "options": [
          "COMMIT",
          "SAVE",
          "ROLLBACK",
          "CONFIRM"
        ]
      },
      "slot4": {
        "correct": "END",
        "options": [
          "END",
          "TERMINATE",
          "RETURN",
          "CLOSE"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. FUNCTION VS PROCEDURE TRANSACTION TRAP! User-defined functions (UDFs) CANNOT commit or roll back transactions mid-execution because they run inside the caller's query transaction. Use PROCEDURES for transactional control!"
  },
  {
    "id": 1161,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 61",
    "title": "Functions: Level 01: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 54,
    "table": "CustomerInvoices",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT invoice_id, invoice_total\n  FROM CustomerInvoices\n  WHERE invoice_total >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT invoice_id, invoice_total\n  FROM CustomerInvoices\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " invoice_total >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1162,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 62",
    "title": "Functions: Level 02: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 54,
    "table": "InsurancePolicies",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "InsurancePolicies(policy_id PK, coverage_amt NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT policy_id, coverage_amt\n  FROM InsurancePolicies\n  WHERE coverage_amt >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT policy_id, coverage_amt\n  FROM InsurancePolicies\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " coverage_amt >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1163,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 63",
    "title": "Functions: Level 03: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 55,
    "table": "AssetValuations",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT asset_id, market_value\n  FROM AssetValuations\n  WHERE market_value >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT asset_id, market_value\n  FROM AssetValuations\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " market_value >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1164,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 64",
    "title": "Functions: Level 04: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 55,
    "table": "TreasuryBonds",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "TreasuryBonds(bond_id PK, coupon_rate NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT bond_id, coupon_rate\n  FROM TreasuryBonds\n  WHERE coupon_rate >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT bond_id, coupon_rate\n  FROM TreasuryBonds\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " coupon_rate >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1165,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 65",
    "title": "Functions: Level 05: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 56,
    "table": "BankAccounts",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT account_id, balance\n  FROM BankAccounts\n  WHERE balance >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT account_id, balance\n  FROM BankAccounts\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " balance >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1166,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 66",
    "title": "Functions: Level 06: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 56,
    "table": "SecuritiesTrades",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "SecuritiesTrades(trade_id PK, trade_amount NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT trade_id, trade_amount\n  FROM SecuritiesTrades\n  WHERE trade_amount >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT trade_id, trade_amount\n  FROM SecuritiesTrades\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " trade_amount >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1167,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 67",
    "title": "Functions: Level 07: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 56,
    "table": "ClientCreditFacilities",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "ClientCreditFacilities(facility_id PK, facility_limit NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT facility_id, facility_limit\n  FROM ClientCreditFacilities\n  WHERE facility_limit >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT facility_id, facility_limit\n  FROM ClientCreditFacilities\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " facility_limit >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1168,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 68",
    "title": "Functions: Level 08: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 57,
    "table": "CryptoWallets",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, staked_amount NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT wallet_id, staked_amount\n  FROM CryptoWallets\n  WHERE staked_amount >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT wallet_id, staked_amount\n  FROM CryptoWallets\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " staked_amount >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1169,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 69",
    "title": "Functions: Level 09: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 57,
    "table": "CustomerInvoices",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT invoice_id, invoice_total\n  FROM CustomerInvoices\n  WHERE invoice_total >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT invoice_id, invoice_total\n  FROM CustomerInvoices\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " invoice_total >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1170,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 70",
    "title": "Functions: Level 10: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 58,
    "table": "InsurancePolicies",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "InsurancePolicies(policy_id PK, coverage_amt NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT policy_id, coverage_amt\n  FROM InsurancePolicies\n  WHERE coverage_amt >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT policy_id, coverage_amt\n  FROM InsurancePolicies\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " coverage_amt >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1171,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 71",
    "title": "Functions: Level 11: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 58,
    "table": "AssetValuations",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT asset_id, market_value\n  FROM AssetValuations\n  WHERE market_value >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT asset_id, market_value\n  FROM AssetValuations\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " market_value >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1172,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 72",
    "title": "Functions: Level 12: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 58,
    "table": "TreasuryBonds",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "TreasuryBonds(bond_id PK, coupon_rate NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT bond_id, coupon_rate\n  FROM TreasuryBonds\n  WHERE coupon_rate >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT bond_id, coupon_rate\n  FROM TreasuryBonds\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " coupon_rate >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1173,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 73",
    "title": "Functions: Level 13: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 59,
    "table": "BankAccounts",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "BankAccounts(account_id PK, balance NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT account_id, balance\n  FROM BankAccounts\n  WHERE balance >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT account_id, balance\n  FROM BankAccounts\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " balance >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1174,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 74",
    "title": "Functions: Level 14: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 59,
    "table": "SecuritiesTrades",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "SecuritiesTrades(trade_id PK, trade_amount NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT trade_id, trade_amount\n  FROM SecuritiesTrades\n  WHERE trade_amount >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT trade_id, trade_amount\n  FROM SecuritiesTrades\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " trade_amount >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1175,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "Views Lvl 75",
    "title": "Functions: Level 15: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 60,
    "table": "ClientCreditFacilities",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "ClientCreditFacilities(facility_id PK, facility_limit NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT facility_id, facility_limit\n  FROM ClientCreditFacilities\n  WHERE facility_limit >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT facility_id, facility_limit\n  FROM ClientCreditFacilities\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " facility_limit >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1176,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 76",
    "title": "Functions: Level 16: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 60,
    "table": "CryptoWallets",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "CryptoWallets(wallet_id PK, staked_amount NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT wallet_id, staked_amount\n  FROM CryptoWallets\n  WHERE staked_amount >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT wallet_id, staked_amount\n  FROM CryptoWallets\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " staked_amount >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1177,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 77",
    "title": "Functions: Level 17: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 60,
    "table": "CustomerInvoices",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "CustomerInvoices(invoice_id PK, invoice_total NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT invoice_id, invoice_total\n  FROM CustomerInvoices\n  WHERE invoice_total >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT invoice_id, invoice_total\n  FROM CustomerInvoices\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " invoice_total >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1178,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 78",
    "title": "Functions: Level 18: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 61,
    "table": "InsurancePolicies",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "InsurancePolicies(policy_id PK, coverage_amt NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT policy_id, coverage_amt\n  FROM InsurancePolicies\n  WHERE coverage_amt >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT policy_id, coverage_amt\n  FROM InsurancePolicies\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " coverage_amt >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1179,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 79",
    "title": "Functions: Level 19: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 61,
    "table": "AssetValuations",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "AssetValuations(asset_id PK, market_value NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT asset_id, market_value\n  FROM AssetValuations\n  WHERE market_value >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT asset_id, market_value\n  FROM AssetValuations\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " market_value >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1180,
    "discipline": "USER-DEFINED FUNCTIONS & VOLATILITY",
    "disciplineKey": "user_defined_functions",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 80",
    "title": "Functions: Level 20: Table-Valued Dynamic Projection",
    "subtitle": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (USER-DEFINED FUNCTIONS & VOLATILITY)",
    "subcluster": "USER-DEFINED FUNCTIONS & VOLATILITY (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Construct tabular UDF yielding filtered dataset.",
    "xp": 62,
    "table": "TreasuryBonds",
    "scenario": "Define table-valued function returning multiple rows with RETURNS TABLE declaration.",
    "businessObjective": "Construct tabular UDF yielding filtered dataset.",
    "schemaSnippet": "TreasuryBonds(bond_id PK, coupon_rate NUMERIC)",
    "targetQuery": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\nRETURNS TABLE (acc_id INT, bal NUMERIC)\nLANGUAGE sql\nSTABLE\nAS $$\n  SELECT bond_id, coupon_rate\n  FROM TreasuryBonds\n  WHERE coupon_rate >= threshold;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION fn_GetTopBalances(threshold NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ RETURNS TABLE ]"
      },
      {
        "text": " (acc_id INT, bal NUMERIC)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ LANGUAGE SQL ]"
      },
      {
        "text": " sql\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STABILITY SPEC ]"
      },
      {
        "text": "\nAS $$\n  SELECT bond_id, coupon_rate\n  FROM TreasuryBonds\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ WHERE CLAUSE ]"
      },
      {
        "text": " coupon_rate >= threshold;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TABLE",
        "options": [
          "RETURNS TABLE",
          "RETURNS SETOF",
          "YIELDS TABLE",
          "OUTPUTS ROWS"
        ]
      },
      "slot2": {
        "correct": "LANGUAGE",
        "options": [
          "LANGUAGE",
          "ENGINE",
          "DIALECT",
          "USING"
        ]
      },
      "slot3": {
        "correct": "STABLE",
        "options": [
          "STABLE",
          "VOLATILE",
          "TRANSIENT",
          "RECURSIVE"
        ]
      },
      "slot4": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. VOLATILITY BLACK-BOX OPTIMIZER TRAP! Marking a function VOLATILE forces PostgreSQL to evaluate it for EVERY SINGLE row, completely disabling index scans and parallel execution. Use IMMUTABLE or STABLE whenever possible!"
  },
  {
    "id": 1181,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 81",
    "title": "Triggers: Level 01: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 62,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, account_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (account_id, old_val, new_val, changed_at)\n  VALUES (OLD.account_id, OLD.balance, NEW.balance, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (account_id, old_val, new_val, changed_at)\n  VALUES (OLD.account_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.balance",
        "options": [
          "OLD.balance",
          "PREV.balance",
          "PRIOR.balance",
          "BEFORE.balance"
        ]
      },
      "slot3": {
        "correct": "NEW.balance",
        "options": [
          "NEW.balance",
          "NEXT.balance",
          "POST.balance",
          "AFTER.balance"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1182,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 82",
    "title": "Triggers: Level 02: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 62,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, trade_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (trade_id, old_val, new_val, changed_at)\n  VALUES (OLD.trade_id, OLD.trade_amount, NEW.trade_amount, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (trade_id, old_val, new_val, changed_at)\n  VALUES (OLD.trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.trade_amount",
        "options": [
          "OLD.trade_amount",
          "PREV.trade_amount",
          "PRIOR.trade_amount",
          "BEFORE.trade_amount"
        ]
      },
      "slot3": {
        "correct": "NEW.trade_amount",
        "options": [
          "NEW.trade_amount",
          "NEXT.trade_amount",
          "POST.trade_amount",
          "AFTER.trade_amount"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1183,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 83",
    "title": "Triggers: Level 03: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 63,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, facility_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (facility_id, old_val, new_val, changed_at)\n  VALUES (OLD.facility_id, OLD.facility_limit, NEW.facility_limit, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (facility_id, old_val, new_val, changed_at)\n  VALUES (OLD.facility_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.facility_limit",
        "options": [
          "OLD.facility_limit",
          "PREV.facility_limit",
          "PRIOR.facility_limit",
          "BEFORE.facility_limit"
        ]
      },
      "slot3": {
        "correct": "NEW.facility_limit",
        "options": [
          "NEW.facility_limit",
          "NEXT.facility_limit",
          "POST.facility_limit",
          "AFTER.facility_limit"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1184,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 84",
    "title": "Triggers: Level 04: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 63,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, wallet_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (wallet_id, old_val, new_val, changed_at)\n  VALUES (OLD.wallet_id, OLD.staked_amount, NEW.staked_amount, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (wallet_id, old_val, new_val, changed_at)\n  VALUES (OLD.wallet_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.staked_amount",
        "options": [
          "OLD.staked_amount",
          "PREV.staked_amount",
          "PRIOR.staked_amount",
          "BEFORE.staked_amount"
        ]
      },
      "slot3": {
        "correct": "NEW.staked_amount",
        "options": [
          "NEW.staked_amount",
          "NEXT.staked_amount",
          "POST.staked_amount",
          "AFTER.staked_amount"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1185,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 85",
    "title": "Triggers: Level 05: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 64,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, invoice_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (invoice_id, old_val, new_val, changed_at)\n  VALUES (OLD.invoice_id, OLD.invoice_total, NEW.invoice_total, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (invoice_id, old_val, new_val, changed_at)\n  VALUES (OLD.invoice_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.invoice_total",
        "options": [
          "OLD.invoice_total",
          "PREV.invoice_total",
          "PRIOR.invoice_total",
          "BEFORE.invoice_total"
        ]
      },
      "slot3": {
        "correct": "NEW.invoice_total",
        "options": [
          "NEW.invoice_total",
          "NEXT.invoice_total",
          "POST.invoice_total",
          "AFTER.invoice_total"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1186,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 86",
    "title": "Triggers: Level 06: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 64,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, policy_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (policy_id, old_val, new_val, changed_at)\n  VALUES (OLD.policy_id, OLD.coverage_amt, NEW.coverage_amt, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (policy_id, old_val, new_val, changed_at)\n  VALUES (OLD.policy_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.coverage_amt",
        "options": [
          "OLD.coverage_amt",
          "PREV.coverage_amt",
          "PRIOR.coverage_amt",
          "BEFORE.coverage_amt"
        ]
      },
      "slot3": {
        "correct": "NEW.coverage_amt",
        "options": [
          "NEW.coverage_amt",
          "NEXT.coverage_amt",
          "POST.coverage_amt",
          "AFTER.coverage_amt"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1187,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 87",
    "title": "Triggers: Level 07: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 64,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, asset_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (asset_id, old_val, new_val, changed_at)\n  VALUES (OLD.asset_id, OLD.market_value, NEW.market_value, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (asset_id, old_val, new_val, changed_at)\n  VALUES (OLD.asset_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.market_value",
        "options": [
          "OLD.market_value",
          "PREV.market_value",
          "PRIOR.market_value",
          "BEFORE.market_value"
        ]
      },
      "slot3": {
        "correct": "NEW.market_value",
        "options": [
          "NEW.market_value",
          "NEXT.market_value",
          "POST.market_value",
          "AFTER.market_value"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1188,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 88",
    "title": "Triggers: Level 08: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 65,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, bond_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (bond_id, old_val, new_val, changed_at)\n  VALUES (OLD.bond_id, OLD.coupon_rate, NEW.coupon_rate, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (bond_id, old_val, new_val, changed_at)\n  VALUES (OLD.bond_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.coupon_rate",
        "options": [
          "OLD.coupon_rate",
          "PREV.coupon_rate",
          "PRIOR.coupon_rate",
          "BEFORE.coupon_rate"
        ]
      },
      "slot3": {
        "correct": "NEW.coupon_rate",
        "options": [
          "NEW.coupon_rate",
          "NEXT.coupon_rate",
          "POST.coupon_rate",
          "AFTER.coupon_rate"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1189,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 89",
    "title": "Triggers: Level 09: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 65,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, account_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (account_id, old_val, new_val, changed_at)\n  VALUES (OLD.account_id, OLD.balance, NEW.balance, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (account_id, old_val, new_val, changed_at)\n  VALUES (OLD.account_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.balance",
        "options": [
          "OLD.balance",
          "PREV.balance",
          "PRIOR.balance",
          "BEFORE.balance"
        ]
      },
      "slot3": {
        "correct": "NEW.balance",
        "options": [
          "NEW.balance",
          "NEXT.balance",
          "POST.balance",
          "AFTER.balance"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1190,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 90",
    "title": "Triggers: Level 10: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 66,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, trade_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (trade_id, old_val, new_val, changed_at)\n  VALUES (OLD.trade_id, OLD.trade_amount, NEW.trade_amount, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (trade_id, old_val, new_val, changed_at)\n  VALUES (OLD.trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.trade_amount",
        "options": [
          "OLD.trade_amount",
          "PREV.trade_amount",
          "PRIOR.trade_amount",
          "BEFORE.trade_amount"
        ]
      },
      "slot3": {
        "correct": "NEW.trade_amount",
        "options": [
          "NEW.trade_amount",
          "NEXT.trade_amount",
          "POST.trade_amount",
          "AFTER.trade_amount"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1191,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 91",
    "title": "Triggers: Level 11: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 66,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, facility_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (facility_id, old_val, new_val, changed_at)\n  VALUES (OLD.facility_id, OLD.facility_limit, NEW.facility_limit, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (facility_id, old_val, new_val, changed_at)\n  VALUES (OLD.facility_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.facility_limit",
        "options": [
          "OLD.facility_limit",
          "PREV.facility_limit",
          "PRIOR.facility_limit",
          "BEFORE.facility_limit"
        ]
      },
      "slot3": {
        "correct": "NEW.facility_limit",
        "options": [
          "NEW.facility_limit",
          "NEXT.facility_limit",
          "POST.facility_limit",
          "AFTER.facility_limit"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1192,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 92",
    "title": "Triggers: Level 12: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 66,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, wallet_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (wallet_id, old_val, new_val, changed_at)\n  VALUES (OLD.wallet_id, OLD.staked_amount, NEW.staked_amount, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (wallet_id, old_val, new_val, changed_at)\n  VALUES (OLD.wallet_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.staked_amount",
        "options": [
          "OLD.staked_amount",
          "PREV.staked_amount",
          "PRIOR.staked_amount",
          "BEFORE.staked_amount"
        ]
      },
      "slot3": {
        "correct": "NEW.staked_amount",
        "options": [
          "NEW.staked_amount",
          "NEXT.staked_amount",
          "POST.staked_amount",
          "AFTER.staked_amount"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1193,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 93",
    "title": "Triggers: Level 13: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 67,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, invoice_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (invoice_id, old_val, new_val, changed_at)\n  VALUES (OLD.invoice_id, OLD.invoice_total, NEW.invoice_total, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (invoice_id, old_val, new_val, changed_at)\n  VALUES (OLD.invoice_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.invoice_total",
        "options": [
          "OLD.invoice_total",
          "PREV.invoice_total",
          "PRIOR.invoice_total",
          "BEFORE.invoice_total"
        ]
      },
      "slot3": {
        "correct": "NEW.invoice_total",
        "options": [
          "NEW.invoice_total",
          "NEXT.invoice_total",
          "POST.invoice_total",
          "AFTER.invoice_total"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1194,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 94",
    "title": "Triggers: Level 14: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 67,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, policy_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (policy_id, old_val, new_val, changed_at)\n  VALUES (OLD.policy_id, OLD.coverage_amt, NEW.coverage_amt, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (policy_id, old_val, new_val, changed_at)\n  VALUES (OLD.policy_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.coverage_amt",
        "options": [
          "OLD.coverage_amt",
          "PREV.coverage_amt",
          "PRIOR.coverage_amt",
          "BEFORE.coverage_amt"
        ]
      },
      "slot3": {
        "correct": "NEW.coverage_amt",
        "options": [
          "NEW.coverage_amt",
          "NEXT.coverage_amt",
          "POST.coverage_amt",
          "AFTER.coverage_amt"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1195,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 95",
    "title": "Triggers: Level 15: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 68,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, asset_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (asset_id, old_val, new_val, changed_at)\n  VALUES (OLD.asset_id, OLD.market_value, NEW.market_value, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (asset_id, old_val, new_val, changed_at)\n  VALUES (OLD.asset_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.market_value",
        "options": [
          "OLD.market_value",
          "PREV.market_value",
          "PRIOR.market_value",
          "BEFORE.market_value"
        ]
      },
      "slot3": {
        "correct": "NEW.market_value",
        "options": [
          "NEW.market_value",
          "NEXT.market_value",
          "POST.market_value",
          "AFTER.market_value"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1196,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 96",
    "title": "Triggers: Level 16: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 68,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, bond_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (bond_id, old_val, new_val, changed_at)\n  VALUES (OLD.bond_id, OLD.coupon_rate, NEW.coupon_rate, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (bond_id, old_val, new_val, changed_at)\n  VALUES (OLD.bond_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.coupon_rate",
        "options": [
          "OLD.coupon_rate",
          "PREV.coupon_rate",
          "PRIOR.coupon_rate",
          "BEFORE.coupon_rate"
        ]
      },
      "slot3": {
        "correct": "NEW.coupon_rate",
        "options": [
          "NEW.coupon_rate",
          "NEXT.coupon_rate",
          "POST.coupon_rate",
          "AFTER.coupon_rate"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1197,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 97",
    "title": "Triggers: Level 17: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 68,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, account_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (account_id, old_val, new_val, changed_at)\n  VALUES (OLD.account_id, OLD.balance, NEW.balance, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (account_id, old_val, new_val, changed_at)\n  VALUES (OLD.account_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.balance",
        "options": [
          "OLD.balance",
          "PREV.balance",
          "PRIOR.balance",
          "BEFORE.balance"
        ]
      },
      "slot3": {
        "correct": "NEW.balance",
        "options": [
          "NEW.balance",
          "NEXT.balance",
          "POST.balance",
          "AFTER.balance"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1198,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 98",
    "title": "Triggers: Level 18: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 69,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, trade_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (trade_id, old_val, new_val, changed_at)\n  VALUES (OLD.trade_id, OLD.trade_amount, NEW.trade_amount, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (trade_id, old_val, new_val, changed_at)\n  VALUES (OLD.trade_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.trade_amount",
        "options": [
          "OLD.trade_amount",
          "PREV.trade_amount",
          "PRIOR.trade_amount",
          "BEFORE.trade_amount"
        ]
      },
      "slot3": {
        "correct": "NEW.trade_amount",
        "options": [
          "NEW.trade_amount",
          "NEXT.trade_amount",
          "POST.trade_amount",
          "AFTER.trade_amount"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1199,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 99",
    "title": "Triggers: Level 19: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 69,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, facility_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (facility_id, old_val, new_val, changed_at)\n  VALUES (OLD.facility_id, OLD.facility_limit, NEW.facility_limit, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (facility_id, old_val, new_val, changed_at)\n  VALUES (OLD.facility_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.facility_limit",
        "options": [
          "OLD.facility_limit",
          "PREV.facility_limit",
          "PRIOR.facility_limit",
          "BEFORE.facility_limit"
        ]
      },
      "slot3": {
        "correct": "NEW.facility_limit",
        "options": [
          "NEW.facility_limit",
          "NEXT.facility_limit",
          "POST.facility_limit",
          "AFTER.facility_limit"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  },
  {
    "id": 1200,
    "discipline": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS",
    "disciplineKey": "triggers_audit_logging",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "Views Lvl 100",
    "title": "Triggers: Level 20: Audit Log State Capture (OLD vs NEW)",
    "subtitle": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "type": "fill_blank",
    "category": "Section 12: Views & Procedures (DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS)",
    "subcluster": "DATABASE TRIGGERS & TAMPER-PROOF AUDIT TRAILS (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Write trigger function referencing OLD and NEW pseudo-records.",
    "xp": 70,
    "table": "AuditLedger",
    "scenario": "Author trigger function capturing pre-mutation and post-mutation balances into audit log.",
    "businessObjective": "Write trigger function referencing OLD and NEW pseudo-records.",
    "schemaSnippet": "AuditLedger(log_id PK, wallet_id, old_val NUMERIC, new_val NUMERIC, changed_at TIMESTAMPTZ)",
    "targetQuery": "CREATE FUNCTION log_account_mutation()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (wallet_id, old_val, new_val, changed_at)\n  VALUES (OLD.wallet_id, OLD.staked_amount, NEW.staked_amount, CURRENT_TIMESTAMP);\n  RETURN NEW;\nEND;\n$$;",
    "template": [
      {
        "text": "CREATE FUNCTION log_account_mutation()\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TRIGGER RETURN TYPE ]"
      },
      {
        "text": "\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  INSERT INTO AuditLedger (wallet_id, old_val, new_val, changed_at)\n  VALUES (OLD.wallet_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ OLD PSEUDO-RECORD ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ NEW PSEUDO-RECORD ]"
      },
      {
        "text": ", CURRENT_TIMESTAMP);\n  ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ RETURN TUPLE ]"
      },
      {
        "text": ";\nEND;\n$$;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "RETURNS TRIGGER",
        "options": [
          "RETURNS TRIGGER",
          "RETURNS VOID",
          "RETURNS BOOLEAN",
          "RETURNS RECORD"
        ]
      },
      "slot2": {
        "correct": "OLD.staked_amount",
        "options": [
          "OLD.staked_amount",
          "PREV.staked_amount",
          "PRIOR.staked_amount",
          "BEFORE.staked_amount"
        ]
      },
      "slot3": {
        "correct": "NEW.staked_amount",
        "options": [
          "NEW.staked_amount",
          "NEXT.staked_amount",
          "POST.staked_amount",
          "AFTER.staked_amount"
        ]
      },
      "slot4": {
        "correct": "RETURN NEW",
        "options": [
          "RETURN NEW",
          "RETURN OLD",
          "RETURN NULL",
          "COMMIT"
        ]
      }
    },
    "explanation": "Views and procedural routines provide security abstraction, snapshot caching, and compliance auditability. MUTATING TABLE & CASCADING RECURSION TRAP! If a trigger on Table A modifies Table A again, it can trigger an infinite recursion loop that crashes the database stack! Be extremely careful with BEFORE vs AFTER triggers."
  }
];
