// =============================================================================
// SECTION 10: DDL, SCHEMA ARCHITECTURE & INTEGRITY CONSTRAINTS ARENA (100 QUESTS)
// 5 Disciplines x 20 Levels (Table Creation, Foreign Keys, CHECK, Alterations, Indexing)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.DDL_DISCIPLINES_METADATA = [
  {
    "key": "table_creation_datatypes",
    "name": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "symbol": "🏗️",
    "color": "#38bdf8",
    "concept": "Defensive Physical Schema Design",
    "whenToUse": "When establishing new tables where numeric precision, temporal accuracy, and mandatory attributes must be enforced at the hardware storage layer.",
    "scenarios": "Creating high-frequency trading trade ledgers with NUMERIC(18,4) and UTC timestamp microsecond precision; Customer account registries with UUID primary keys.",
    "traps": "FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "key": "primary_foreign_keys",
    "name": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "symbol": "🔗",
    "color": "#10b981",
    "concept": "Relational Graph Integrity & Cascades",
    "whenToUse": "When linking child transactions, order items, or audit logs to parent entities, defining what happens when parent records are updated or purged.",
    "scenarios": "Purging temporary test client accounts while automatically deleting associated order line items via ON DELETE CASCADE; Setting foreign broker references to NULL on termination.",
    "traps": "ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "key": "check_unique_constraints",
    "name": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "symbol": "🛡️",
    "color": "#f59e0b",
    "concept": "Database-Level Business Rule Assertion",
    "whenToUse": "When business invariants must be protected against corrupted application code, preventing negative account balances, invalid date ranges, or duplicate tax filings.",
    "scenarios": "Enforcing non-negative cash balances: CHECK (cash_balance >= 0.00); Enforcing chronological logic: CHECK (settlement_date >= trade_date); Multi-column uniqueness: UNIQUE (entity_id, tax_year).",
    "traps": "CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "key": "schema_migrations_alter",
    "name": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "symbol": "🔄",
    "color": "#ec4899",
    "concept": "Zero-Downtime Table Alteration",
    "whenToUse": "When evolving live production databases by adding auditing columns, widening datatypes, or attaching new integrity constraints.",
    "scenarios": "Adding risk_rating VARCHAR(10) DEFAULT 'STANDARD' to live account tables; Converting INT identifiers to BIGINT to prevent 32-bit counter exhaustion; Renaming deprecated columns.",
    "traps": "TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "key": "performance_indexing",
    "name": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "symbol": "⚡",
    "color": "#a855f7",
    "concept": "B-Tree, Composite, Partial & Covering Indexes",
    "whenToUse": "When accelerating WHERE filtering, ORDER BY sorting, and JOIN lookup speeds from O(N) full-table scans to O(log N) tree navigations.",
    "scenarios": "Creating partial indexes for high-frequency workflows: CREATE INDEX ON Orders(status) WHERE status = 'PENDING'; Covering indexes using INCLUDE (account_id, balance) to allow index-only scans.",
    "traps": "OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  }
];

window.QUESTS_SECTION_10 = [
  {
    "id": 901,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 1,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 01",
    "title": "Table Scaffolding: Level 01: Precision Financial Ledger",
    "subtitle": "Create SecuritiesLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 30,
    "table": "SecuritiesLedger",
    "scenario": "Create SecuritiesLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, execution_price NUMERIC(18,4) NOT NULL, executed_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE SecuritiesLedger (\n  trade_id INT PRIMARY KEY,\n  execution_price NUMERIC(18,4) NOT NULL,\n  executed_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE SecuritiesLedger (\n  trade_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  execution_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  executed_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 902,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 2,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 02",
    "title": "Table Scaffolding: Level 02: Precision Financial Ledger",
    "subtitle": "Create LoanAgreements table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 30,
    "table": "LoanAgreements",
    "scenario": "Create LoanAgreements table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, principal_amount NUMERIC(18,4) NOT NULL, originated_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE LoanAgreements (\n  loan_id INT PRIMARY KEY,\n  principal_amount NUMERIC(18,4) NOT NULL,\n  originated_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE LoanAgreements (\n  loan_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  principal_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  originated_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 903,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 3,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 03",
    "title": "Table Scaffolding: Level 03: Precision Financial Ledger",
    "subtitle": "Create CustomerLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 31,
    "table": "CustomerLedger",
    "scenario": "Create CustomerLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, available_balance NUMERIC(18,4) NOT NULL, created_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE CustomerLedger (\n  account_id INT PRIMARY KEY,\n  available_balance NUMERIC(18,4) NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE CustomerLedger (\n  account_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  available_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  created_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 904,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 4,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 04",
    "title": "Table Scaffolding: Level 04: Precision Financial Ledger",
    "subtitle": "Create PortfolioPositions table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 31,
    "table": "PortfolioPositions",
    "scenario": "Create PortfolioPositions table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, market_value NUMERIC(18,4) NOT NULL, last_rebalanced TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE PortfolioPositions (\n  position_id INT PRIMARY KEY,\n  market_value NUMERIC(18,4) NOT NULL,\n  last_rebalanced TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE PortfolioPositions (\n  position_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  last_rebalanced ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 905,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 5,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 05",
    "title": "Table Scaffolding: Level 05: Precision Financial Ledger",
    "subtitle": "Create InvoicesLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 32,
    "table": "InvoicesLedger",
    "scenario": "Create InvoicesLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "InvoicesLedger(invoice_id INT PK, total_amount NUMERIC(18,4) NOT NULL, due_date TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  total_amount NUMERIC(18,4) NOT NULL,\n  due_date TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE InvoicesLedger (\n  invoice_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  total_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  due_date ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 906,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 6,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 06",
    "title": "Table Scaffolding: Level 06: Precision Financial Ledger",
    "subtitle": "Create DigitalWallets table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 32,
    "table": "DigitalWallets",
    "scenario": "Create DigitalWallets table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "DigitalWallets(wallet_id INT PK, token_balance NUMERIC(18,4) NOT NULL, verified_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE DigitalWallets (\n  wallet_id INT PRIMARY KEY,\n  token_balance NUMERIC(18,4) NOT NULL,\n  verified_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE DigitalWallets (\n  wallet_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  token_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  verified_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 907,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 7,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 07",
    "title": "Table Scaffolding: Level 07: Precision Financial Ledger",
    "subtitle": "Create PayrollDisbursements table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 32,
    "table": "PayrollDisbursements",
    "scenario": "Create PayrollDisbursements table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "PayrollDisbursements(payment_id INT PK, net_salary NUMERIC(18,4) NOT NULL, disbursed_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  net_salary NUMERIC(18,4) NOT NULL,\n  disbursed_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE PayrollDisbursements (\n  payment_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  net_salary ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  disbursed_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 908,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 8,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 08",
    "title": "Table Scaffolding: Level 08: Precision Financial Ledger",
    "subtitle": "Create InsurancePolicies table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 33,
    "table": "InsurancePolicies",
    "scenario": "Create InsurancePolicies table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "InsurancePolicies(policy_id INT PK, coverage_limit NUMERIC(18,4) NOT NULL, effective_date TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE InsurancePolicies (\n  policy_id INT PRIMARY KEY,\n  coverage_limit NUMERIC(18,4) NOT NULL,\n  effective_date TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE InsurancePolicies (\n  policy_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  coverage_limit ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  effective_date ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 909,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 9,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 09",
    "title": "Table Scaffolding: Level 09: Precision Financial Ledger",
    "subtitle": "Create SecuritiesLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 33,
    "table": "SecuritiesLedger",
    "scenario": "Create SecuritiesLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, execution_price NUMERIC(18,4) NOT NULL, executed_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE SecuritiesLedger (\n  trade_id INT PRIMARY KEY,\n  execution_price NUMERIC(18,4) NOT NULL,\n  executed_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE SecuritiesLedger (\n  trade_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  execution_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  executed_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 910,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 10,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 10",
    "title": "Table Scaffolding: Level 10: Precision Financial Ledger",
    "subtitle": "Create LoanAgreements table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 34,
    "table": "LoanAgreements",
    "scenario": "Create LoanAgreements table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, principal_amount NUMERIC(18,4) NOT NULL, originated_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE LoanAgreements (\n  loan_id INT PRIMARY KEY,\n  principal_amount NUMERIC(18,4) NOT NULL,\n  originated_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE LoanAgreements (\n  loan_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  principal_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  originated_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 911,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 11,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 11",
    "title": "Table Scaffolding: Level 11: Precision Financial Ledger",
    "subtitle": "Create CustomerLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 34,
    "table": "CustomerLedger",
    "scenario": "Create CustomerLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, available_balance NUMERIC(18,4) NOT NULL, created_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE CustomerLedger (\n  account_id INT PRIMARY KEY,\n  available_balance NUMERIC(18,4) NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE CustomerLedger (\n  account_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  available_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  created_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 912,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 12,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 12",
    "title": "Table Scaffolding: Level 12: Precision Financial Ledger",
    "subtitle": "Create PortfolioPositions table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 34,
    "table": "PortfolioPositions",
    "scenario": "Create PortfolioPositions table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, market_value NUMERIC(18,4) NOT NULL, last_rebalanced TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE PortfolioPositions (\n  position_id INT PRIMARY KEY,\n  market_value NUMERIC(18,4) NOT NULL,\n  last_rebalanced TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE PortfolioPositions (\n  position_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  last_rebalanced ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 913,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 13,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 13",
    "title": "Table Scaffolding: Level 13: Precision Financial Ledger",
    "subtitle": "Create InvoicesLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 35,
    "table": "InvoicesLedger",
    "scenario": "Create InvoicesLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "InvoicesLedger(invoice_id INT PK, total_amount NUMERIC(18,4) NOT NULL, due_date TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  total_amount NUMERIC(18,4) NOT NULL,\n  due_date TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE InvoicesLedger (\n  invoice_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  total_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  due_date ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 914,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 14,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 14",
    "title": "Table Scaffolding: Level 14: Precision Financial Ledger",
    "subtitle": "Create DigitalWallets table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 35,
    "table": "DigitalWallets",
    "scenario": "Create DigitalWallets table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "DigitalWallets(wallet_id INT PK, token_balance NUMERIC(18,4) NOT NULL, verified_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE DigitalWallets (\n  wallet_id INT PRIMARY KEY,\n  token_balance NUMERIC(18,4) NOT NULL,\n  verified_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE DigitalWallets (\n  wallet_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  token_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  verified_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 915,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 15,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 15",
    "title": "Table Scaffolding: Level 15: Precision Financial Ledger",
    "subtitle": "Create PayrollDisbursements table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 36,
    "table": "PayrollDisbursements",
    "scenario": "Create PayrollDisbursements table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "PayrollDisbursements(payment_id INT PK, net_salary NUMERIC(18,4) NOT NULL, disbursed_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  net_salary NUMERIC(18,4) NOT NULL,\n  disbursed_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE PayrollDisbursements (\n  payment_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  net_salary ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  disbursed_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 916,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 16,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 16",
    "title": "Table Scaffolding: Level 16: Precision Financial Ledger",
    "subtitle": "Create InsurancePolicies table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 36,
    "table": "InsurancePolicies",
    "scenario": "Create InsurancePolicies table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "InsurancePolicies(policy_id INT PK, coverage_limit NUMERIC(18,4) NOT NULL, effective_date TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE InsurancePolicies (\n  policy_id INT PRIMARY KEY,\n  coverage_limit NUMERIC(18,4) NOT NULL,\n  effective_date TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE InsurancePolicies (\n  policy_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  coverage_limit ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  effective_date ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 917,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 17,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 17",
    "title": "Table Scaffolding: Level 17: Precision Financial Ledger",
    "subtitle": "Create SecuritiesLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 36,
    "table": "SecuritiesLedger",
    "scenario": "Create SecuritiesLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, execution_price NUMERIC(18,4) NOT NULL, executed_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE SecuritiesLedger (\n  trade_id INT PRIMARY KEY,\n  execution_price NUMERIC(18,4) NOT NULL,\n  executed_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE SecuritiesLedger (\n  trade_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  execution_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  executed_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 918,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 18,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 18",
    "title": "Table Scaffolding: Level 18: Precision Financial Ledger",
    "subtitle": "Create LoanAgreements table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 37,
    "table": "LoanAgreements",
    "scenario": "Create LoanAgreements table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, principal_amount NUMERIC(18,4) NOT NULL, originated_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE LoanAgreements (\n  loan_id INT PRIMARY KEY,\n  principal_amount NUMERIC(18,4) NOT NULL,\n  originated_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE LoanAgreements (\n  loan_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  principal_amount ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  originated_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 919,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 19,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 19",
    "title": "Table Scaffolding: Level 19: Precision Financial Ledger",
    "subtitle": "Create CustomerLedger table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 37,
    "table": "CustomerLedger",
    "scenario": "Create CustomerLedger table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, available_balance NUMERIC(18,4) NOT NULL, created_at TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE CustomerLedger (\n  account_id INT PRIMARY KEY,\n  available_balance NUMERIC(18,4) NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE CustomerLedger (\n  account_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  available_balance ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  created_at ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 920,
    "discipline": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES",
    "disciplineKey": "table_creation_datatypes",
    "disciplineLevel": 20,
    "difficulty": "Easy",
    "levelDisplay": "DDL Lvl 20",
    "title": "Table Scaffolding: Level 20: Precision Financial Ledger",
    "subtitle": "Create PortfolioPositions table with strict NUMERIC precision and primary key constraint.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES)",
    "subcluster": "TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES (Easy)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "task": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "xp": 38,
    "table": "PortfolioPositions",
    "scenario": "Create PortfolioPositions table with strict NUMERIC precision and primary key constraint.",
    "businessObjective": "Define table structure with appropriate types to prevent floating-point rounding errors.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, market_value NUMERIC(18,4) NOT NULL, last_rebalanced TIMESTAMPTZ NOT NULL)",
    "targetQuery": "CREATE TABLE PortfolioPositions (\n  position_id INT PRIMARY KEY,\n  market_value NUMERIC(18,4) NOT NULL,\n  last_rebalanced TIMESTAMPTZ NOT NULL\n);",
    "template": [
      {
        "text": "CREATE TABLE PortfolioPositions (\n  position_id INT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ KEY CONSTRAINT ]"
      },
      {
        "text": ",\n  market_value ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ EXACT NUMERIC TYPE ]"
      },
      {
        "text": " NOT NULL,\n  last_rebalanced ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ UTC TIME TYPE ]"
      },
      {
        "text": " NOT NULL\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PRIMARY KEY",
        "options": [
          "PRIMARY KEY",
          "UNIQUE",
          "FOREIGN KEY",
          "DEFAULT"
        ]
      },
      "slot2": {
        "correct": "NUMERIC(18,4)",
        "options": [
          "NUMERIC(18,4)",
          "FLOAT",
          "DOUBLE PRECISION",
          "REAL"
        ]
      },
      "slot3": {
        "correct": "TIMESTAMPTZ",
        "options": [
          "TIMESTAMPTZ",
          "VARCHAR(50)",
          "INT",
          "TEXT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency in FLOAT or DOUBLE PRECISION datatypes. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!"
  },
  {
    "id": 921,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 21",
    "title": "Foreign Keys: Level 01: Cascading Child Deletions",
    "subtitle": "Link InvoicesLedger to parent VendorProfiles with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 38,
    "table": "InvoicesLedger",
    "scenario": "Link InvoicesLedger to parent VendorProfiles with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "InvoicesLedger(invoice_id INT PK, vendor_id INT REFERENCES VendorProfiles(vendor_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  vendor_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (vendor_id)\n    REFERENCES VendorProfiles(vendor_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  vendor_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (vendor_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES VendorProfiles(vendor_id)",
        "options": [
          "REFERENCES VendorProfiles(vendor_id)",
          "LINKS VendorProfiles",
          "INTO VendorProfiles",
          "PARENT VendorProfiles"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 922,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 22",
    "title": "Foreign Keys: Level 02: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 38,
    "table": "DigitalWallets",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "DigitalWallets(wallet_id INT PK, user_id INT REFERENCES PlatformUsers ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE DigitalWallets\nADD CONSTRAINT fk_broker\nFOREIGN KEY (user_id)\nREFERENCES PlatformUsers(user_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (user_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES PlatformUsers(user_id)",
        "options": [
          "REFERENCES PlatformUsers(user_id)",
          "MATCHES PlatformUsers",
          "POINTING TO PlatformUsers",
          "INTO PlatformUsers"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 923,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 23",
    "title": "Foreign Keys: Level 03: Cascading Child Deletions",
    "subtitle": "Link PayrollDisbursements to parent Employees with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 39,
    "table": "PayrollDisbursements",
    "scenario": "Link PayrollDisbursements to parent Employees with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "PayrollDisbursements(payment_id INT PK, employee_id INT REFERENCES Employees(employee_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  employee_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (employee_id)\n    REFERENCES Employees(employee_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  employee_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (employee_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES Employees(employee_id)",
        "options": [
          "REFERENCES Employees(employee_id)",
          "LINKS Employees",
          "INTO Employees",
          "PARENT Employees"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 924,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 24",
    "title": "Foreign Keys: Level 04: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 39,
    "table": "InsurancePolicies",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "InsurancePolicies(policy_id INT PK, underwriter_id INT REFERENCES Underwriters ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE InsurancePolicies\nADD CONSTRAINT fk_broker\nFOREIGN KEY (underwriter_id)\nREFERENCES Underwriters(underwriter_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (underwriter_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES Underwriters(underwriter_id)",
        "options": [
          "REFERENCES Underwriters(underwriter_id)",
          "MATCHES Underwriters",
          "POINTING TO Underwriters",
          "INTO Underwriters"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 925,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 25",
    "title": "Foreign Keys: Level 05: Cascading Child Deletions",
    "subtitle": "Link SecuritiesLedger to parent TradingAccounts with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 40,
    "table": "SecuritiesLedger",
    "scenario": "Link SecuritiesLedger to parent TradingAccounts with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, account_id INT REFERENCES TradingAccounts(account_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE SecuritiesLedger (\n  trade_id INT PRIMARY KEY,\n  account_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (account_id)\n    REFERENCES TradingAccounts(account_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE SecuritiesLedger (\n  trade_id INT PRIMARY KEY,\n  account_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (account_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES TradingAccounts(account_id)",
        "options": [
          "REFERENCES TradingAccounts(account_id)",
          "LINKS TradingAccounts",
          "INTO TradingAccounts",
          "PARENT TradingAccounts"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 926,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 26",
    "title": "Foreign Keys: Level 06: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 40,
    "table": "LoanAgreements",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, borrower_id INT REFERENCES BorrowerProfiles ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE LoanAgreements\nADD CONSTRAINT fk_broker\nFOREIGN KEY (borrower_id)\nREFERENCES BorrowerProfiles(borrower_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE LoanAgreements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (borrower_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES BorrowerProfiles(borrower_id)",
        "options": [
          "REFERENCES BorrowerProfiles(borrower_id)",
          "MATCHES BorrowerProfiles",
          "POINTING TO BorrowerProfiles",
          "INTO BorrowerProfiles"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 927,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 27",
    "title": "Foreign Keys: Level 07: Cascading Child Deletions",
    "subtitle": "Link CustomerLedger to parent BankBranches with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 40,
    "table": "CustomerLedger",
    "scenario": "Link CustomerLedger to parent BankBranches with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, branch_id INT REFERENCES BankBranches(branch_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE CustomerLedger (\n  account_id INT PRIMARY KEY,\n  branch_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (branch_id)\n    REFERENCES BankBranches(branch_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE CustomerLedger (\n  account_id INT PRIMARY KEY,\n  branch_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (branch_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES BankBranches(branch_id)",
        "options": [
          "REFERENCES BankBranches(branch_id)",
          "LINKS BankBranches",
          "INTO BankBranches",
          "PARENT BankBranches"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 928,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 28",
    "title": "Foreign Keys: Level 08: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 41,
    "table": "PortfolioPositions",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, fund_id INT REFERENCES InstitutionalFunds ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE PortfolioPositions\nADD CONSTRAINT fk_broker\nFOREIGN KEY (fund_id)\nREFERENCES InstitutionalFunds(fund_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE PortfolioPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (fund_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES InstitutionalFunds(fund_id)",
        "options": [
          "REFERENCES InstitutionalFunds(fund_id)",
          "MATCHES InstitutionalFunds",
          "POINTING TO InstitutionalFunds",
          "INTO InstitutionalFunds"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 929,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 29",
    "title": "Foreign Keys: Level 09: Cascading Child Deletions",
    "subtitle": "Link InvoicesLedger to parent VendorProfiles with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 41,
    "table": "InvoicesLedger",
    "scenario": "Link InvoicesLedger to parent VendorProfiles with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "InvoicesLedger(invoice_id INT PK, vendor_id INT REFERENCES VendorProfiles(vendor_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  vendor_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (vendor_id)\n    REFERENCES VendorProfiles(vendor_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  vendor_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (vendor_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES VendorProfiles(vendor_id)",
        "options": [
          "REFERENCES VendorProfiles(vendor_id)",
          "LINKS VendorProfiles",
          "INTO VendorProfiles",
          "PARENT VendorProfiles"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 930,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 30",
    "title": "Foreign Keys: Level 10: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 42,
    "table": "DigitalWallets",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "DigitalWallets(wallet_id INT PK, user_id INT REFERENCES PlatformUsers ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE DigitalWallets\nADD CONSTRAINT fk_broker\nFOREIGN KEY (user_id)\nREFERENCES PlatformUsers(user_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (user_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES PlatformUsers(user_id)",
        "options": [
          "REFERENCES PlatformUsers(user_id)",
          "MATCHES PlatformUsers",
          "POINTING TO PlatformUsers",
          "INTO PlatformUsers"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 931,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 31",
    "title": "Foreign Keys: Level 11: Cascading Child Deletions",
    "subtitle": "Link PayrollDisbursements to parent Employees with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 42,
    "table": "PayrollDisbursements",
    "scenario": "Link PayrollDisbursements to parent Employees with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "PayrollDisbursements(payment_id INT PK, employee_id INT REFERENCES Employees(employee_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  employee_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (employee_id)\n    REFERENCES Employees(employee_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  employee_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (employee_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES Employees(employee_id)",
        "options": [
          "REFERENCES Employees(employee_id)",
          "LINKS Employees",
          "INTO Employees",
          "PARENT Employees"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 932,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 32",
    "title": "Foreign Keys: Level 12: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 42,
    "table": "InsurancePolicies",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "InsurancePolicies(policy_id INT PK, underwriter_id INT REFERENCES Underwriters ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE InsurancePolicies\nADD CONSTRAINT fk_broker\nFOREIGN KEY (underwriter_id)\nREFERENCES Underwriters(underwriter_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (underwriter_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES Underwriters(underwriter_id)",
        "options": [
          "REFERENCES Underwriters(underwriter_id)",
          "MATCHES Underwriters",
          "POINTING TO Underwriters",
          "INTO Underwriters"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 933,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 33",
    "title": "Foreign Keys: Level 13: Cascading Child Deletions",
    "subtitle": "Link SecuritiesLedger to parent TradingAccounts with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 43,
    "table": "SecuritiesLedger",
    "scenario": "Link SecuritiesLedger to parent TradingAccounts with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, account_id INT REFERENCES TradingAccounts(account_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE SecuritiesLedger (\n  trade_id INT PRIMARY KEY,\n  account_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (account_id)\n    REFERENCES TradingAccounts(account_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE SecuritiesLedger (\n  trade_id INT PRIMARY KEY,\n  account_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (account_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES TradingAccounts(account_id)",
        "options": [
          "REFERENCES TradingAccounts(account_id)",
          "LINKS TradingAccounts",
          "INTO TradingAccounts",
          "PARENT TradingAccounts"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 934,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 34",
    "title": "Foreign Keys: Level 14: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 43,
    "table": "LoanAgreements",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, borrower_id INT REFERENCES BorrowerProfiles ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE LoanAgreements\nADD CONSTRAINT fk_broker\nFOREIGN KEY (borrower_id)\nREFERENCES BorrowerProfiles(borrower_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE LoanAgreements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (borrower_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES BorrowerProfiles(borrower_id)",
        "options": [
          "REFERENCES BorrowerProfiles(borrower_id)",
          "MATCHES BorrowerProfiles",
          "POINTING TO BorrowerProfiles",
          "INTO BorrowerProfiles"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 935,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 35",
    "title": "Foreign Keys: Level 15: Cascading Child Deletions",
    "subtitle": "Link CustomerLedger to parent BankBranches with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 44,
    "table": "CustomerLedger",
    "scenario": "Link CustomerLedger to parent BankBranches with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, branch_id INT REFERENCES BankBranches(branch_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE CustomerLedger (\n  account_id INT PRIMARY KEY,\n  branch_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (branch_id)\n    REFERENCES BankBranches(branch_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE CustomerLedger (\n  account_id INT PRIMARY KEY,\n  branch_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (branch_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES BankBranches(branch_id)",
        "options": [
          "REFERENCES BankBranches(branch_id)",
          "LINKS BankBranches",
          "INTO BankBranches",
          "PARENT BankBranches"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 936,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 36",
    "title": "Foreign Keys: Level 16: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 44,
    "table": "PortfolioPositions",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, fund_id INT REFERENCES InstitutionalFunds ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE PortfolioPositions\nADD CONSTRAINT fk_broker\nFOREIGN KEY (fund_id)\nREFERENCES InstitutionalFunds(fund_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE PortfolioPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (fund_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES InstitutionalFunds(fund_id)",
        "options": [
          "REFERENCES InstitutionalFunds(fund_id)",
          "MATCHES InstitutionalFunds",
          "POINTING TO InstitutionalFunds",
          "INTO InstitutionalFunds"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 937,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 37",
    "title": "Foreign Keys: Level 17: Cascading Child Deletions",
    "subtitle": "Link InvoicesLedger to parent VendorProfiles with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 44,
    "table": "InvoicesLedger",
    "scenario": "Link InvoicesLedger to parent VendorProfiles with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "InvoicesLedger(invoice_id INT PK, vendor_id INT REFERENCES VendorProfiles(vendor_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  vendor_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (vendor_id)\n    REFERENCES VendorProfiles(vendor_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE InvoicesLedger (\n  invoice_id INT PRIMARY KEY,\n  vendor_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (vendor_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES VendorProfiles(vendor_id)",
        "options": [
          "REFERENCES VendorProfiles(vendor_id)",
          "LINKS VendorProfiles",
          "INTO VendorProfiles",
          "PARENT VendorProfiles"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 938,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 38",
    "title": "Foreign Keys: Level 18: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 45,
    "table": "DigitalWallets",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "DigitalWallets(wallet_id INT PK, user_id INT REFERENCES PlatformUsers ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE DigitalWallets\nADD CONSTRAINT fk_broker\nFOREIGN KEY (user_id)\nREFERENCES PlatformUsers(user_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (user_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES PlatformUsers(user_id)",
        "options": [
          "REFERENCES PlatformUsers(user_id)",
          "MATCHES PlatformUsers",
          "POINTING TO PlatformUsers",
          "INTO PlatformUsers"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 939,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 39",
    "title": "Foreign Keys: Level 19: Cascading Child Deletions",
    "subtitle": "Link PayrollDisbursements to parent Employees with cascading delete automation.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "xp": 45,
    "table": "PayrollDisbursements",
    "scenario": "Link PayrollDisbursements to parent Employees with cascading delete automation.",
    "businessObjective": "Enforce referential integrity with ON DELETE CASCADE to prevent orphaned records.",
    "schemaSnippet": "PayrollDisbursements(payment_id INT PK, employee_id INT REFERENCES Employees(employee_id) ON DELETE CASCADE)",
    "targetQuery": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  employee_id INT,\n  CONSTRAINT fk_ref FOREIGN KEY (employee_id)\n    REFERENCES Employees(employee_id)\n    ON DELETE CASCADE\n);",
    "template": [
      {
        "text": "CREATE TABLE PayrollDisbursements (\n  payment_id INT PRIMARY KEY,\n  employee_id INT,\n  CONSTRAINT fk_ref ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ FK CLAUSE ]"
      },
      {
        "text": " (employee_id)\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ REF PARENT ]"
      },
      {
        "text": "\n    ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ CASCADE CLAUSE ]"
      },
      {
        "text": "\n);",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "CHECK",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "REFERENCES Employees(employee_id)",
        "options": [
          "REFERENCES Employees(employee_id)",
          "LINKS Employees",
          "INTO Employees",
          "PARENT Employees"
        ]
      },
      "slot3": {
        "correct": "ON DELETE CASCADE",
        "options": [
          "ON DELETE CASCADE",
          "ON DELETE DROP",
          "ON DELETE REMOVE",
          "CASCADE ALL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 940,
    "discipline": "REFERENTIAL INTEGRITY & CASCADING ACTIONS",
    "disciplineKey": "primary_foreign_keys",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 40",
    "title": "Foreign Keys: Level 20: Defensive SET NULL Protection",
    "subtitle": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (REFERENTIAL INTEGRITY & CASCADING ACTIONS)",
    "subcluster": "REFERENTIAL INTEGRITY & CASCADING ACTIONS (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "xp": 46,
    "table": "InsurancePolicies",
    "scenario": "Preserve audit ledger history when parent record is removed by setting foreign reference to NULL.",
    "businessObjective": "Configure ON DELETE SET NULL to maintain historical compliance records.",
    "schemaSnippet": "InsurancePolicies(policy_id INT PK, underwriter_id INT REFERENCES Underwriters ON DELETE SET NULL)",
    "targetQuery": "ALTER TABLE InsurancePolicies\nADD CONSTRAINT fk_broker\nFOREIGN KEY (underwriter_id)\nREFERENCES Underwriters(underwriter_id)\nON DELETE SET NULL;",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CONSTRAINT ]"
      },
      {
        "text": " fk_broker\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ FK DECLARATION ]"
      },
      {
        "text": " (underwriter_id)\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ REFERENCES TARGET ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ SAFE NULL ACTION ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE CONSTRAINT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "FOREIGN KEY",
        "options": [
          "FOREIGN KEY",
          "PRIMARY KEY",
          "UNIQUE KEY",
          "INDEX"
        ]
      },
      "slot3": {
        "correct": "REFERENCES Underwriters(underwriter_id)",
        "options": [
          "REFERENCES Underwriters(underwriter_id)",
          "MATCHES Underwriters",
          "POINTING TO Underwriters",
          "INTO Underwriters"
        ]
      },
      "slot4": {
        "correct": "ON DELETE SET NULL",
        "options": [
          "ON DELETE SET NULL",
          "ON DELETE CASCADE",
          "ON DELETE DEFAULT",
          "ON DELETE RESTRICT"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!"
  },
  {
    "id": 941,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 41",
    "title": "Data Quality: Level 01: Non-Negative Balance Enforcer",
    "subtitle": "Enforce non-negative execution_price invariant at the database engine level using CHECK.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Prevent application bugs from injecting negative financial amounts.",
    "xp": 46,
    "table": "SecuritiesLedger",
    "scenario": "Enforce non-negative execution_price invariant at the database engine level using CHECK.",
    "businessObjective": "Prevent application bugs from injecting negative financial amounts.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, execution_price NUMERIC NOT NULL, CHECK(execution_price >= 0))",
    "targetQuery": "ALTER TABLE SecuritiesLedger\nADD CONSTRAINT chk_pos_amt\nCHECK (execution_price >= 0.00);",
    "template": [
      {
        "text": "ALTER TABLE SecuritiesLedger\nADD CONSTRAINT chk_pos_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONSTRAINT TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ METRIC COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OPERATOR & VAL ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CHECK",
        "options": [
          "CHECK",
          "VERIFY",
          "ASSERT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "execution_price",
        "options": [
          "execution_price",
          "trade_id",
          "order_status",
          "balance"
        ]
      },
      "slot3": {
        "correct": ">= 0.00",
        "options": [
          ">= 0.00",
          "> 0",
          "<> 0",
          "IS NOT NULL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 942,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 42",
    "title": "Data Quality: Level 02: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 46,
    "table": "LoanAgreements",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, borrower_id INT, tax_year INT, UNIQUE(borrower_id, tax_year))",
    "targetQuery": "ALTER TABLE LoanAgreements\nADD CONSTRAINT uq_entity_year\nUNIQUE (borrower_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE LoanAgreements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "borrower_id",
        "options": [
          "borrower_id",
          "loan_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 943,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 43",
    "title": "Data Quality: Level 03: Non-Negative Balance Enforcer",
    "subtitle": "Enforce non-negative available_balance invariant at the database engine level using CHECK.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Prevent application bugs from injecting negative financial amounts.",
    "xp": 47,
    "table": "CustomerLedger",
    "scenario": "Enforce non-negative available_balance invariant at the database engine level using CHECK.",
    "businessObjective": "Prevent application bugs from injecting negative financial amounts.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, available_balance NUMERIC NOT NULL, CHECK(available_balance >= 0))",
    "targetQuery": "ALTER TABLE CustomerLedger\nADD CONSTRAINT chk_pos_amt\nCHECK (available_balance >= 0.00);",
    "template": [
      {
        "text": "ALTER TABLE CustomerLedger\nADD CONSTRAINT chk_pos_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONSTRAINT TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ METRIC COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OPERATOR & VAL ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CHECK",
        "options": [
          "CHECK",
          "VERIFY",
          "ASSERT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "available_balance",
        "options": [
          "available_balance",
          "account_id",
          "compliance_status",
          "balance"
        ]
      },
      "slot3": {
        "correct": ">= 0.00",
        "options": [
          ">= 0.00",
          "> 0",
          "<> 0",
          "IS NOT NULL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 944,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 44",
    "title": "Data Quality: Level 04: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 47,
    "table": "PortfolioPositions",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, fund_id INT, tax_year INT, UNIQUE(fund_id, tax_year))",
    "targetQuery": "ALTER TABLE PortfolioPositions\nADD CONSTRAINT uq_entity_year\nUNIQUE (fund_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE PortfolioPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "position_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 945,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 45",
    "title": "Data Quality: Level 05: Non-Negative Balance Enforcer",
    "subtitle": "Enforce non-negative total_amount invariant at the database engine level using CHECK.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "task": "Prevent application bugs from injecting negative financial amounts.",
    "xp": 48,
    "table": "InvoicesLedger",
    "scenario": "Enforce non-negative total_amount invariant at the database engine level using CHECK.",
    "businessObjective": "Prevent application bugs from injecting negative financial amounts.",
    "schemaSnippet": "InvoicesLedger(invoice_id INT PK, total_amount NUMERIC NOT NULL, CHECK(total_amount >= 0))",
    "targetQuery": "ALTER TABLE InvoicesLedger\nADD CONSTRAINT chk_pos_amt\nCHECK (total_amount >= 0.00);",
    "template": [
      {
        "text": "ALTER TABLE InvoicesLedger\nADD CONSTRAINT chk_pos_amt\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ CONSTRAINT TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ METRIC COLUMN ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ OPERATOR & VAL ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CHECK",
        "options": [
          "CHECK",
          "VERIFY",
          "ASSERT",
          "ENFORCE"
        ]
      },
      "slot2": {
        "correct": "total_amount",
        "options": [
          "total_amount",
          "invoice_id",
          "payment_status",
          "balance"
        ]
      },
      "slot3": {
        "correct": ">= 0.00",
        "options": [
          ">= 0.00",
          "> 0",
          "<> 0",
          "IS NOT NULL"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 946,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 46",
    "title": "Data Quality: Level 06: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 48,
    "table": "DigitalWallets",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "DigitalWallets(wallet_id INT PK, user_id INT, tax_year INT, UNIQUE(user_id, tax_year))",
    "targetQuery": "ALTER TABLE DigitalWallets\nADD CONSTRAINT uq_entity_year\nUNIQUE (user_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "user_id",
        "options": [
          "user_id",
          "wallet_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 947,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 47",
    "title": "Data Quality: Level 07: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 48,
    "table": "PayrollDisbursements",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "PayrollDisbursements(payment_id INT PK, employee_id INT, tax_year INT, UNIQUE(employee_id, tax_year))",
    "targetQuery": "ALTER TABLE PayrollDisbursements\nADD CONSTRAINT uq_entity_year\nUNIQUE (employee_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE PayrollDisbursements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "employee_id",
        "options": [
          "employee_id",
          "payment_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 948,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 48",
    "title": "Data Quality: Level 08: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 49,
    "table": "InsurancePolicies",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "InsurancePolicies(policy_id INT PK, underwriter_id INT, tax_year INT, UNIQUE(underwriter_id, tax_year))",
    "targetQuery": "ALTER TABLE InsurancePolicies\nADD CONSTRAINT uq_entity_year\nUNIQUE (underwriter_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "underwriter_id",
        "options": [
          "underwriter_id",
          "policy_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 949,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 49",
    "title": "Data Quality: Level 09: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 49,
    "table": "SecuritiesLedger",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, account_id INT, tax_year INT, UNIQUE(account_id, tax_year))",
    "targetQuery": "ALTER TABLE SecuritiesLedger\nADD CONSTRAINT uq_entity_year\nUNIQUE (account_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE SecuritiesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "account_id",
        "options": [
          "account_id",
          "trade_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 950,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 50",
    "title": "Data Quality: Level 10: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 50,
    "table": "LoanAgreements",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, borrower_id INT, tax_year INT, UNIQUE(borrower_id, tax_year))",
    "targetQuery": "ALTER TABLE LoanAgreements\nADD CONSTRAINT uq_entity_year\nUNIQUE (borrower_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE LoanAgreements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "borrower_id",
        "options": [
          "borrower_id",
          "loan_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 951,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 51",
    "title": "Data Quality: Level 11: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 50,
    "table": "CustomerLedger",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, branch_id INT, tax_year INT, UNIQUE(branch_id, tax_year))",
    "targetQuery": "ALTER TABLE CustomerLedger\nADD CONSTRAINT uq_entity_year\nUNIQUE (branch_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE CustomerLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "branch_id",
        "options": [
          "branch_id",
          "account_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 952,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 52",
    "title": "Data Quality: Level 12: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 50,
    "table": "PortfolioPositions",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, fund_id INT, tax_year INT, UNIQUE(fund_id, tax_year))",
    "targetQuery": "ALTER TABLE PortfolioPositions\nADD CONSTRAINT uq_entity_year\nUNIQUE (fund_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE PortfolioPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "position_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 953,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 53",
    "title": "Data Quality: Level 13: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 51,
    "table": "InvoicesLedger",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "InvoicesLedger(invoice_id INT PK, vendor_id INT, tax_year INT, UNIQUE(vendor_id, tax_year))",
    "targetQuery": "ALTER TABLE InvoicesLedger\nADD CONSTRAINT uq_entity_year\nUNIQUE (vendor_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE InvoicesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "vendor_id",
        "options": [
          "vendor_id",
          "invoice_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 954,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 54",
    "title": "Data Quality: Level 14: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 51,
    "table": "DigitalWallets",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "DigitalWallets(wallet_id INT PK, user_id INT, tax_year INT, UNIQUE(user_id, tax_year))",
    "targetQuery": "ALTER TABLE DigitalWallets\nADD CONSTRAINT uq_entity_year\nUNIQUE (user_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "user_id",
        "options": [
          "user_id",
          "wallet_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 955,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 55",
    "title": "Data Quality: Level 15: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 52,
    "table": "PayrollDisbursements",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "PayrollDisbursements(payment_id INT PK, employee_id INT, tax_year INT, UNIQUE(employee_id, tax_year))",
    "targetQuery": "ALTER TABLE PayrollDisbursements\nADD CONSTRAINT uq_entity_year\nUNIQUE (employee_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE PayrollDisbursements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "employee_id",
        "options": [
          "employee_id",
          "payment_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 956,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 16,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 56",
    "title": "Data Quality: Level 16: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 52,
    "table": "InsurancePolicies",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "InsurancePolicies(policy_id INT PK, underwriter_id INT, tax_year INT, UNIQUE(underwriter_id, tax_year))",
    "targetQuery": "ALTER TABLE InsurancePolicies\nADD CONSTRAINT uq_entity_year\nUNIQUE (underwriter_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "underwriter_id",
        "options": [
          "underwriter_id",
          "policy_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 957,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 17,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 57",
    "title": "Data Quality: Level 17: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 52,
    "table": "SecuritiesLedger",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "SecuritiesLedger(trade_id INT PK, account_id INT, tax_year INT, UNIQUE(account_id, tax_year))",
    "targetQuery": "ALTER TABLE SecuritiesLedger\nADD CONSTRAINT uq_entity_year\nUNIQUE (account_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE SecuritiesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "account_id",
        "options": [
          "account_id",
          "trade_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 958,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 18,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 58",
    "title": "Data Quality: Level 18: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 53,
    "table": "LoanAgreements",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "LoanAgreements(loan_id INT PK, borrower_id INT, tax_year INT, UNIQUE(borrower_id, tax_year))",
    "targetQuery": "ALTER TABLE LoanAgreements\nADD CONSTRAINT uq_entity_year\nUNIQUE (borrower_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE LoanAgreements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "borrower_id",
        "options": [
          "borrower_id",
          "loan_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 959,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 19,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 59",
    "title": "Data Quality: Level 19: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 53,
    "table": "CustomerLedger",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "CustomerLedger(account_id INT PK, branch_id INT, tax_year INT, UNIQUE(branch_id, tax_year))",
    "targetQuery": "ALTER TABLE CustomerLedger\nADD CONSTRAINT uq_entity_year\nUNIQUE (branch_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE CustomerLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "branch_id",
        "options": [
          "branch_id",
          "account_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 960,
    "discipline": "DATA QUALITY ENFORCERS (CHECK & UNIQUE)",
    "disciplineKey": "check_unique_constraints",
    "disciplineLevel": 20,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 60",
    "title": "Data Quality: Level 20: Multi-Column Unique Deduplication",
    "subtitle": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (DATA QUALITY ENFORCERS (CHECK & UNIQUE))",
    "subcluster": "DATA QUALITY ENFORCERS (CHECK & UNIQUE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "xp": 54,
    "table": "PortfolioPositions",
    "scenario": "Enforce unique tax year filings per entity using multi-column composite UNIQUE constraints.",
    "businessObjective": "Prevent duplicate record injection with composite UNIQUE constraints.",
    "schemaSnippet": "PortfolioPositions(position_id INT PK, fund_id INT, tax_year INT, UNIQUE(fund_id, tax_year))",
    "targetQuery": "ALTER TABLE PortfolioPositions\nADD CONSTRAINT uq_entity_year\nUNIQUE (fund_id, tax_year);",
    "template": [
      {
        "text": "ALTER TABLE PortfolioPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ADD CLAUSE ]"
      },
      {
        "text": " uq_entity_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ UNIQUE TYPE ]"
      },
      {
        "text": " (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ COL 1 ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ COL 2 ]"
      },
      {
        "text": ");",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ADD CONSTRAINT",
        "options": [
          "ADD CONSTRAINT",
          "ADD RULE",
          "CREATE UNIQUE",
          "SET UNIQUE"
        ]
      },
      "slot2": {
        "correct": "UNIQUE",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "PRIMARY KEY",
          "CHECK"
        ]
      },
      "slot3": {
        "correct": "fund_id",
        "options": [
          "fund_id",
          "position_id",
          "id",
          "ref"
        ]
      },
      "slot4": {
        "correct": "tax_year",
        "options": [
          "tax_year",
          "created_at",
          "status",
          "amount"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked."
  },
  {
    "id": 961,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 1,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 61",
    "title": "Migrations: Level 01: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on InvoicesLedger to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 54,
    "table": "InvoicesLedger",
    "scenario": "Safely alter primary key datatype on InvoicesLedger to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "InvoicesLedger(invoice_id BIGINT)",
    "targetQuery": "ALTER TABLE InvoicesLedger\nALTER COLUMN invoice_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE InvoicesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "invoice_id",
        "options": [
          "invoice_id",
          "vendor_id",
          "total_amount",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 962,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 2,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 62",
    "title": "Migrations: Level 02: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on DigitalWallets to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 54,
    "table": "DigitalWallets",
    "scenario": "Safely alter primary key datatype on DigitalWallets to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "DigitalWallets(wallet_id BIGINT)",
    "targetQuery": "ALTER TABLE DigitalWallets\nALTER COLUMN wallet_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "wallet_id",
        "options": [
          "wallet_id",
          "user_id",
          "token_balance",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 963,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 3,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 63",
    "title": "Migrations: Level 03: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on PayrollDisbursements to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 55,
    "table": "PayrollDisbursements",
    "scenario": "Safely alter primary key datatype on PayrollDisbursements to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "PayrollDisbursements(payment_id BIGINT)",
    "targetQuery": "ALTER TABLE PayrollDisbursements\nALTER COLUMN payment_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE PayrollDisbursements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "payment_id",
        "options": [
          "payment_id",
          "employee_id",
          "net_salary",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 964,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 4,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 64",
    "title": "Migrations: Level 04: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on InsurancePolicies to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 55,
    "table": "InsurancePolicies",
    "scenario": "Safely alter primary key datatype on InsurancePolicies to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "InsurancePolicies(policy_id BIGINT)",
    "targetQuery": "ALTER TABLE InsurancePolicies\nALTER COLUMN policy_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "policy_id",
        "options": [
          "policy_id",
          "underwriter_id",
          "coverage_limit",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 965,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 5,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 65",
    "title": "Migrations: Level 05: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on SecuritiesLedger to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 56,
    "table": "SecuritiesLedger",
    "scenario": "Safely alter primary key datatype on SecuritiesLedger to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "SecuritiesLedger(trade_id BIGINT)",
    "targetQuery": "ALTER TABLE SecuritiesLedger\nALTER COLUMN trade_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE SecuritiesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "account_id",
          "execution_price",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 966,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 6,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 66",
    "title": "Migrations: Level 06: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on LoanAgreements to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 56,
    "table": "LoanAgreements",
    "scenario": "Safely alter primary key datatype on LoanAgreements to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "LoanAgreements(loan_id BIGINT)",
    "targetQuery": "ALTER TABLE LoanAgreements\nALTER COLUMN loan_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE LoanAgreements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "loan_id",
        "options": [
          "loan_id",
          "borrower_id",
          "principal_amount",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 967,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 7,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 67",
    "title": "Migrations: Level 07: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on CustomerLedger to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 56,
    "table": "CustomerLedger",
    "scenario": "Safely alter primary key datatype on CustomerLedger to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "CustomerLedger(account_id BIGINT)",
    "targetQuery": "ALTER TABLE CustomerLedger\nALTER COLUMN account_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE CustomerLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "account_id",
        "options": [
          "account_id",
          "branch_id",
          "available_balance",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 968,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 8,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 68",
    "title": "Migrations: Level 08: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on PortfolioPositions to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 57,
    "table": "PortfolioPositions",
    "scenario": "Safely alter primary key datatype on PortfolioPositions to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "PortfolioPositions(position_id BIGINT)",
    "targetQuery": "ALTER TABLE PortfolioPositions\nALTER COLUMN position_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE PortfolioPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "position_id",
        "options": [
          "position_id",
          "fund_id",
          "market_value",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 969,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 9,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 69",
    "title": "Migrations: Level 09: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on InvoicesLedger to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 57,
    "table": "InvoicesLedger",
    "scenario": "Safely alter primary key datatype on InvoicesLedger to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "InvoicesLedger(invoice_id BIGINT)",
    "targetQuery": "ALTER TABLE InvoicesLedger\nALTER COLUMN invoice_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE InvoicesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "invoice_id",
        "options": [
          "invoice_id",
          "vendor_id",
          "total_amount",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 970,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 10,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 70",
    "title": "Migrations: Level 10: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on DigitalWallets to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 58,
    "table": "DigitalWallets",
    "scenario": "Safely alter primary key datatype on DigitalWallets to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "DigitalWallets(wallet_id BIGINT)",
    "targetQuery": "ALTER TABLE DigitalWallets\nALTER COLUMN wallet_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "wallet_id",
        "options": [
          "wallet_id",
          "user_id",
          "token_balance",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 971,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 11,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 71",
    "title": "Migrations: Level 11: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on PayrollDisbursements to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 58,
    "table": "PayrollDisbursements",
    "scenario": "Safely alter primary key datatype on PayrollDisbursements to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "PayrollDisbursements(payment_id BIGINT)",
    "targetQuery": "ALTER TABLE PayrollDisbursements\nALTER COLUMN payment_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE PayrollDisbursements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "payment_id",
        "options": [
          "payment_id",
          "employee_id",
          "net_salary",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 972,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 12,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 72",
    "title": "Migrations: Level 12: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on InsurancePolicies to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 58,
    "table": "InsurancePolicies",
    "scenario": "Safely alter primary key datatype on InsurancePolicies to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "InsurancePolicies(policy_id BIGINT)",
    "targetQuery": "ALTER TABLE InsurancePolicies\nALTER COLUMN policy_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "policy_id",
        "options": [
          "policy_id",
          "underwriter_id",
          "coverage_limit",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 973,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 13,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 73",
    "title": "Migrations: Level 13: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on SecuritiesLedger to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 59,
    "table": "SecuritiesLedger",
    "scenario": "Safely alter primary key datatype on SecuritiesLedger to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "SecuritiesLedger(trade_id BIGINT)",
    "targetQuery": "ALTER TABLE SecuritiesLedger\nALTER COLUMN trade_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE SecuritiesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "account_id",
          "execution_price",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 974,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 14,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 74",
    "title": "Migrations: Level 14: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on LoanAgreements to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 59,
    "table": "LoanAgreements",
    "scenario": "Safely alter primary key datatype on LoanAgreements to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "LoanAgreements(loan_id BIGINT)",
    "targetQuery": "ALTER TABLE LoanAgreements\nALTER COLUMN loan_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE LoanAgreements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "loan_id",
        "options": [
          "loan_id",
          "borrower_id",
          "principal_amount",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 975,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 15,
    "difficulty": "Medium",
    "levelDisplay": "DDL Lvl 75",
    "title": "Migrations: Level 15: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on CustomerLedger to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Medium)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 60,
    "table": "CustomerLedger",
    "scenario": "Safely alter primary key datatype on CustomerLedger to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "CustomerLedger(account_id BIGINT)",
    "targetQuery": "ALTER TABLE CustomerLedger\nALTER COLUMN account_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE CustomerLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "account_id",
        "options": [
          "account_id",
          "branch_id",
          "available_balance",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 976,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 76",
    "title": "Migrations: Level 16: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on PortfolioPositions to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 60,
    "table": "PortfolioPositions",
    "scenario": "Safely alter primary key datatype on PortfolioPositions to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "PortfolioPositions(position_id BIGINT)",
    "targetQuery": "ALTER TABLE PortfolioPositions\nALTER COLUMN position_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE PortfolioPositions\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "position_id",
        "options": [
          "position_id",
          "fund_id",
          "market_value",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 977,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 77",
    "title": "Migrations: Level 17: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on InvoicesLedger to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 60,
    "table": "InvoicesLedger",
    "scenario": "Safely alter primary key datatype on InvoicesLedger to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "InvoicesLedger(invoice_id BIGINT)",
    "targetQuery": "ALTER TABLE InvoicesLedger\nALTER COLUMN invoice_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE InvoicesLedger\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "invoice_id",
        "options": [
          "invoice_id",
          "vendor_id",
          "total_amount",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 978,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 78",
    "title": "Migrations: Level 18: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on DigitalWallets to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 61,
    "table": "DigitalWallets",
    "scenario": "Safely alter primary key datatype on DigitalWallets to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "DigitalWallets(wallet_id BIGINT)",
    "targetQuery": "ALTER TABLE DigitalWallets\nALTER COLUMN wallet_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE DigitalWallets\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "wallet_id",
        "options": [
          "wallet_id",
          "user_id",
          "token_balance",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 979,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 79",
    "title": "Migrations: Level 19: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on PayrollDisbursements to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 61,
    "table": "PayrollDisbursements",
    "scenario": "Safely alter primary key datatype on PayrollDisbursements to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "PayrollDisbursements(payment_id BIGINT)",
    "targetQuery": "ALTER TABLE PayrollDisbursements\nALTER COLUMN payment_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE PayrollDisbursements\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "payment_id",
        "options": [
          "payment_id",
          "employee_id",
          "net_salary",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 980,
    "discipline": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE)",
    "disciplineKey": "schema_migrations_alter",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 80",
    "title": "Migrations: Level 20: Identifier Expansion (INT to BIGINT)",
    "subtitle": "Safely alter primary key datatype on InsurancePolicies to avoid integer overflow.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE))",
    "subcluster": "SCHEMA MIGRATIONS & EVOLUTION (ALTER TABLE) (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Execute schema type alteration with explicit TYPE casting.",
    "xp": 62,
    "table": "InsurancePolicies",
    "scenario": "Safely alter primary key datatype on InsurancePolicies to avoid integer overflow.",
    "businessObjective": "Execute schema type alteration with explicit TYPE casting.",
    "schemaSnippet": "InsurancePolicies(policy_id BIGINT)",
    "targetQuery": "ALTER TABLE InsurancePolicies\nALTER COLUMN policy_id\nTYPE BIGINT;",
    "template": [
      {
        "text": "ALTER TABLE InsurancePolicies\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ALTER CLAUSE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ TARGET COLUMN ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ TYPE KEYWORD ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ NEW TYPE ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ALTER COLUMN",
        "options": [
          "ALTER COLUMN",
          "MODIFY COLUMN",
          "CHANGE COLUMN",
          "UPDATE COLUMN"
        ]
      },
      "slot2": {
        "correct": "policy_id",
        "options": [
          "policy_id",
          "underwriter_id",
          "coverage_limit",
          "id"
        ]
      },
      "slot3": {
        "correct": "TYPE",
        "options": [
          "TYPE",
          "SET TYPE",
          "AS",
          "DATATYPE"
        ]
      },
      "slot4": {
        "correct": "BIGINT",
        "options": [
          "BIGINT",
          "INT",
          "NUMERIC",
          "VARCHAR"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!"
  },
  {
    "id": 981,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 1,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 81",
    "title": "Indexing: Level 01: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 62,
    "table": "SecuritiesLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON SecuritiesLedger(trade_id) WHERE order_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON SecuritiesLedger (trade_id)\nWHERE order_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON SecuritiesLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "account_id",
          "execution_price",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "order_status",
        "options": [
          "order_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 982,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 2,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 82",
    "title": "Indexing: Level 02: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 62,
    "table": "LoanAgreements",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON LoanAgreements(loan_id) WHERE loan_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON LoanAgreements (loan_id)\nWHERE loan_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON LoanAgreements (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "loan_id",
        "options": [
          "loan_id",
          "borrower_id",
          "principal_amount",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "loan_status",
        "options": [
          "loan_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 983,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 3,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 83",
    "title": "Indexing: Level 03: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 63,
    "table": "CustomerLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON CustomerLedger(account_id) WHERE compliance_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON CustomerLedger (account_id)\nWHERE compliance_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON CustomerLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "account_id",
        "options": [
          "account_id",
          "branch_id",
          "available_balance",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "compliance_status",
        "options": [
          "compliance_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 984,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 4,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 84",
    "title": "Indexing: Level 04: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 63,
    "table": "PortfolioPositions",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON PortfolioPositions(position_id) WHERE risk_flag = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON PortfolioPositions (position_id)\nWHERE risk_flag = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON PortfolioPositions (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "position_id",
        "options": [
          "position_id",
          "fund_id",
          "market_value",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "risk_flag",
        "options": [
          "risk_flag",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 985,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 5,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 85",
    "title": "Indexing: Level 05: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 64,
    "table": "InvoicesLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON InvoicesLedger(invoice_id) WHERE payment_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON InvoicesLedger (invoice_id)\nWHERE payment_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON InvoicesLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "invoice_id",
        "options": [
          "invoice_id",
          "vendor_id",
          "total_amount",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "payment_status",
        "options": [
          "payment_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 986,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 6,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 86",
    "title": "Indexing: Level 06: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 64,
    "table": "DigitalWallets",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON DigitalWallets(wallet_id) WHERE kyc_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON DigitalWallets (wallet_id)\nWHERE kyc_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON DigitalWallets (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "wallet_id",
        "options": [
          "wallet_id",
          "user_id",
          "token_balance",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "kyc_status",
        "options": [
          "kyc_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 987,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 7,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 87",
    "title": "Indexing: Level 07: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 64,
    "table": "PayrollDisbursements",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON PayrollDisbursements(payment_id) WHERE direct_deposit_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON PayrollDisbursements (payment_id)\nWHERE direct_deposit_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON PayrollDisbursements (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "payment_id",
        "options": [
          "payment_id",
          "employee_id",
          "net_salary",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "direct_deposit_status",
        "options": [
          "direct_deposit_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 988,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 8,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 88",
    "title": "Indexing: Level 08: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 65,
    "table": "InsurancePolicies",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON InsurancePolicies(policy_id) WHERE policy_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON InsurancePolicies (policy_id)\nWHERE policy_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON InsurancePolicies (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "policy_id",
        "options": [
          "policy_id",
          "underwriter_id",
          "coverage_limit",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "policy_status",
        "options": [
          "policy_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 989,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 9,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 89",
    "title": "Indexing: Level 09: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 65,
    "table": "SecuritiesLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON SecuritiesLedger(trade_id) WHERE order_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON SecuritiesLedger (trade_id)\nWHERE order_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON SecuritiesLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "account_id",
          "execution_price",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "order_status",
        "options": [
          "order_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 990,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 10,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 90",
    "title": "Indexing: Level 10: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 66,
    "table": "LoanAgreements",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON LoanAgreements(loan_id) WHERE loan_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON LoanAgreements (loan_id)\nWHERE loan_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON LoanAgreements (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "loan_id",
        "options": [
          "loan_id",
          "borrower_id",
          "principal_amount",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "loan_status",
        "options": [
          "loan_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 991,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 11,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 91",
    "title": "Indexing: Level 11: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 66,
    "table": "CustomerLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON CustomerLedger(account_id) WHERE compliance_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON CustomerLedger (account_id)\nWHERE compliance_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON CustomerLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "account_id",
        "options": [
          "account_id",
          "branch_id",
          "available_balance",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "compliance_status",
        "options": [
          "compliance_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 992,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 12,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 92",
    "title": "Indexing: Level 12: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 66,
    "table": "PortfolioPositions",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON PortfolioPositions(position_id) WHERE risk_flag = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON PortfolioPositions (position_id)\nWHERE risk_flag = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON PortfolioPositions (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "position_id",
        "options": [
          "position_id",
          "fund_id",
          "market_value",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "risk_flag",
        "options": [
          "risk_flag",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 993,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 13,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 93",
    "title": "Indexing: Level 13: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 67,
    "table": "InvoicesLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON InvoicesLedger(invoice_id) WHERE payment_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON InvoicesLedger (invoice_id)\nWHERE payment_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON InvoicesLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "invoice_id",
        "options": [
          "invoice_id",
          "vendor_id",
          "total_amount",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "payment_status",
        "options": [
          "payment_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 994,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 14,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 94",
    "title": "Indexing: Level 14: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 67,
    "table": "DigitalWallets",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON DigitalWallets(wallet_id) WHERE kyc_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON DigitalWallets (wallet_id)\nWHERE kyc_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON DigitalWallets (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "wallet_id",
        "options": [
          "wallet_id",
          "user_id",
          "token_balance",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "kyc_status",
        "options": [
          "kyc_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 995,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 15,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 95",
    "title": "Indexing: Level 15: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 68,
    "table": "PayrollDisbursements",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON PayrollDisbursements(payment_id) WHERE direct_deposit_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON PayrollDisbursements (payment_id)\nWHERE direct_deposit_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON PayrollDisbursements (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "payment_id",
        "options": [
          "payment_id",
          "employee_id",
          "net_salary",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "direct_deposit_status",
        "options": [
          "direct_deposit_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 996,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 16,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 96",
    "title": "Indexing: Level 16: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 68,
    "table": "InsurancePolicies",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON InsurancePolicies(policy_id) WHERE policy_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON InsurancePolicies (policy_id)\nWHERE policy_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON InsurancePolicies (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "policy_id",
        "options": [
          "policy_id",
          "underwriter_id",
          "coverage_limit",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "policy_status",
        "options": [
          "policy_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 997,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 17,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 97",
    "title": "Indexing: Level 17: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 68,
    "table": "SecuritiesLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON SecuritiesLedger(trade_id) WHERE order_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON SecuritiesLedger (trade_id)\nWHERE order_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON SecuritiesLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "trade_id",
        "options": [
          "trade_id",
          "account_id",
          "execution_price",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "order_status",
        "options": [
          "order_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 998,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 18,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 98",
    "title": "Indexing: Level 18: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 69,
    "table": "LoanAgreements",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON LoanAgreements(loan_id) WHERE loan_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON LoanAgreements (loan_id)\nWHERE loan_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON LoanAgreements (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "loan_id",
        "options": [
          "loan_id",
          "borrower_id",
          "principal_amount",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "loan_status",
        "options": [
          "loan_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 999,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 19,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 99",
    "title": "Indexing: Level 19: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 69,
    "table": "CustomerLedger",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON CustomerLedger(account_id) WHERE compliance_status = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON CustomerLedger (account_id)\nWHERE compliance_status = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON CustomerLedger (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "account_id",
        "options": [
          "account_id",
          "branch_id",
          "available_balance",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "compliance_status",
        "options": [
          "compliance_status",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  },
  {
    "id": 1000,
    "discipline": "PERFORMANCE INDEXING & QUERY ACCELERATION",
    "disciplineKey": "performance_indexing",
    "disciplineLevel": 20,
    "difficulty": "Hard",
    "levelDisplay": "DDL Lvl 100",
    "title": "Indexing: Level 20: Partial Index for Hot Queues",
    "subtitle": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "type": "fill_blank",
    "category": "Section 10: DDL & Schema Architecture (PERFORMANCE INDEXING & QUERY ACCELERATION)",
    "subcluster": "PERFORMANCE INDEXING & QUERY ACCELERATION (Hard)",
    "tier": "Master",
    "tierColor": "#ec4899",
    "task": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "xp": 70,
    "table": "PortfolioPositions",
    "scenario": "Optimize pending order pipeline by building a partial index restricted to active statuses.",
    "businessObjective": "Create a partial index with WHERE filtering to save disk space and accelerate queue processing.",
    "schemaSnippet": "INDEX idx_hot_queue ON PortfolioPositions(position_id) WHERE risk_flag = 'PENDING'",
    "targetQuery": "CREATE INDEX idx_hot_queue\nON PortfolioPositions (position_id)\nWHERE risk_flag = 'PENDING';",
    "template": [
      {
        "text": "CREATE INDEX idx_hot_queue\nON PortfolioPositions (",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ TARGET KEY ]"
      },
      {
        "text": ")\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ PARTIAL PREDICATE ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ STATUS COL ]"
      },
      {
        "text": " = ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ LITERAL FILTER ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "position_id",
        "options": [
          "position_id",
          "fund_id",
          "market_value",
          "id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "risk_flag",
        "options": [
          "risk_flag",
          "active",
          "flag",
          "status"
        ]
      },
      "slot4": {
        "correct": "'PENDING'",
        "options": [
          "'PENDING'",
          "'COMPLETED'",
          "NULL",
          "TRUE"
        ]
      }
    },
    "explanation": "DDL and integrity constraints enforce business invariants at the hardware storage layer. OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction."
  }
];
