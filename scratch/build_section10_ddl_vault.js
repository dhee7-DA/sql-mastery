// =============================================================================
// SECTION 10 BUILDER: DDL, SCHEMA ARCHITECTURE & INTEGRITY CONSTRAINTS ARENA
// 420 Interactive Levels: 7 Disciplines x 60 Levels (20 Easy / 20 Medium / 20 Hard)
// Verified 3-5 Blanks, Zero Duplicate Options, Real-World Data & Financial Scenarios
// =============================================================================

const fs = require('fs');

const DDL_DISCIPLINES = [
  {
    key: 'table_creation_datatypes',
    name: 'TABLE SCAFFOLDING & HIGH-PRECISION DATATYPES',
    symbol: '🏗️',
    color: '#38bdf8',
    concept: 'Defensive Physical Schema Design & Exact Representation',
    whenToUse: 'When establishing new core transactional tables where numeric precision, temporal accuracy, and mandatory storage attributes must be guaranteed at the engine level.',
    scenarios: 'Creating high-frequency trade ledgers with NUMERIC(18,4) and UTC timestamp microsecond precision; Customer account registries with UUID primary keys; Unlogged audit buffers.',
    traps: 'FLOAT / DOUBLE FINANCIAL ROUNDING TRAP! Never store currency or prices in FLOAT or DOUBLE PRECISION. Inexact binary floating-point representation causes fractional penny drift and breaks accounting reconciliations. Always use NUMERIC or DECIMAL!'
  },
  {
    key: 'primary_foreign_keys',
    name: 'REFERENTIAL INTEGRITY & CASCADING POLICIES',
    symbol: '🔗',
    color: '#10b981',
    concept: 'Relational Graph Integrity & Cascades',
    whenToUse: 'When linking child transactions, order items, or settlement logs to parent entities, defining strict referential actions when parent records are updated or purged.',
    scenarios: 'Purging temporary test accounts while automatically deleting associated line items via ON DELETE CASCADE; Setting foreign broker references to NULL on termination; Deferring FK checks in cyclic batch loads.',
    traps: 'ORPHAN RECORD TRAP & UNINTENDED MASS PURGE! Omitting foreign keys allows orphan rows to linger indefinitely. Conversely, blindly applying ON DELETE CASCADE to critical financial ledgers can silently wipe out millions of historical transaction rows when a parent account is archived!'
  },
  {
    key: 'check_unique_constraints',
    name: 'DATA QUALITY ENFORCERS (CHECK, NOT NULL & UNIQUE)',
    symbol: '🛡️',
    color: '#f59e0b',
    concept: 'Database-Level Business Rule Assertion',
    whenToUse: 'When business invariants must be protected against corrupted application code, preventing negative account balances, invalid date ranges, or duplicate tax filings.',
    scenarios: 'Enforcing non-negative cash balances: CHECK (cash_balance >= 0.00); Enforcing chronological logic: CHECK (settlement_date >= trade_date); Multi-column uniqueness: UNIQUE (entity_id, fiscal_year, account_num).',
    traps: 'CHECK CONSTRAINT THREE-VALUED LOGIC TRAP! A CHECK constraint evaluates to TRUE if the condition is TRUE or NULL! If a checked column contains NULL, the check succeeds! Always pair CHECK constraints with NOT NULL when null values must be blocked.'
  },
  {
    key: 'schema_migrations_alter',
    name: 'ZERO-DOWNTIME SCHEMA EVOLUTION (ALTER TABLE)',
    symbol: '🔄',
    color: '#ec4899',
    concept: 'Non-Blocking Physical Table Alterations',
    whenToUse: 'When evolving live production databases by adding auditing columns, widening datatypes, or attaching new integrity constraints without table locks.',
    scenarios: 'Adding risk_rating VARCHAR(10) DEFAULT \'STANDARD\' to live account tables; Converting INT identifiers to BIGINT to prevent 32-bit counter exhaustion; Adding constraints with NOT VALID followed by VALIDATE CONSTRAINT.',
    traps: 'TABLE LOCKING MIGRATION OUTAGE TRAP! In production PostgreSQL or MySQL, executing ALTER TABLE ADD COLUMN with volatile function defaults or ADD CONSTRAINT without NOT VALID can acquire an exclusive table lock (ACCESS EXCLUSIVE), freezing all queries and causing production outages!'
  },
  {
    key: 'performance_indexing',
    name: 'ADVANCED PHYSICAL INDEX ARCHITECTURES',
    symbol: '⚡',
    color: '#a855f7',
    concept: 'B-Tree, Composite, Partial & Covering Indexes',
    whenToUse: 'When accelerating WHERE filtering, ORDER BY sorting, and JOIN lookup speeds from O(N) full-table scans to O(log N) tree navigations.',
    scenarios: 'Creating partial indexes for high-frequency workflows: CREATE INDEX ON Orders(status) WHERE status = \'PENDING\'; Covering indexes using INCLUDE (account_id, balance) to allow index-only scans; Case-insensitive functional indexes.',
    traps: 'OVER-INDEXING WRITE PENALTY TRAP! Every additional index added to a table dramatically slows down INSERT, UPDATE, and DELETE operations because the database engine must synchronously update every B-Tree leaf node on every write transaction.'
  },
  {
    key: 'table_partitioning',
    name: 'DECLARATIVE TABLE PARTITIONING & ARCHIVAL',
    symbol: '🗂️',
    color: '#06b6d4',
    concept: 'Horizontal Physical Sharding & Partition Pruning',
    whenToUse: 'When scaling billion-row transaction logs, financial ledgers, or time-series metrics so queries scan only relevant partitions, and old data can be dropped instantly via DETACH.',
    scenarios: 'Monthly partitioned trade ledgers: PARTITION BY RANGE (trade_date); Regional multi-tenant routing: PARTITION BY LIST (country_code); Detaching 7-year-old regulatory archives instantly without mass DELETE locks.',
    traps: 'GLOBAL UNIQUE CONSTRAINT & ROUTING TRAP! In declarative partitioning, any UNIQUE or PRIMARY KEY constraint MUST include all partition key columns. Omitting the partition key from the primary key causes table creation to fail!'
  },
  {
    key: 'generated_columns_domains',
    name: 'GENERATED COLUMNS & CUSTOM DOMAIN TYPES',
    symbol: '⚙️',
    color: '#f97316',
    concept: 'Deterministic Virtual Columns & Reusable Strong Types',
    whenToUse: 'When pre-computing line-item totals, tax amounts, or composite search tokens automatically at write-time, or creating reusable domain types with enforced semantic rules.',
    scenarios: 'Stored generated columns for total_amount = (unit_price * quantity) * (1 - discount_rate); Creating domain PositiveBalance AS NUMERIC(18,2) CHECK (VALUE >= 0.00); ENUM type definitions for trade lifecycles.',
    traps: 'NON-IMMUTABLE EXPRESSION TRAP! Generated column expressions cannot reference volatile functions like CURRENT_TIMESTAMP or RANDOM(), and cannot reference columns from other tables. They must be strictly deterministic and row-local!'
  }
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ensureUniqueOptions(correct, distractors) {
  const filtered = distractors.filter(d => d !== correct);
  const picked = [];
  for (const d of filtered) {
    if (!picked.includes(d)) {
      picked.push(d);
    }
    if (picked.length === 3) break;
  }
  while (picked.length < 3) {
    picked.push(correct + `_${picked.length + 1}`);
  }
  return shuffle([correct, ...picked]);
}

function generateSection10Quests() {
  const allQuests = [];
  let globalId = 10001;

  DDL_DISCIPLINES.forEach((disc) => {
    for (let lvl = 1; lvl <= 60; lvl++) {
      let difficulty = 'Easy';
      let tier = 'Apprentice';
      let tierColor = '#38bdf8';
      let xp = 30;

      if (lvl > 20 && lvl <= 40) {
        difficulty = 'Medium';
        tier = 'Practitioner';
        tierColor = '#10b981';
        xp = 45;
      } else if (lvl > 40) {
        difficulty = 'Hard';
        tier = 'Specialist';
        tierColor = '#f59e0b';
        xp = 60;
      }

      const lvlStr = lvl < 10 ? `0${lvl}` : `${lvl}`;
      const levelDisplay = `DDL Lvl ${lvlStr}`;

      const quest = buildDisciplineQuest(disc, lvl, globalId, difficulty, tier, tierColor, xp, levelDisplay);
      allQuests.push(quest);
      globalId++;
    }
  });

  return allQuests;
}

function buildDisciplineQuest(disc, lvl, id, difficulty, tier, tierColor, xp, levelDisplay) {
  const discKey = disc.key;
  let title = '';
  let subtitle = '';
  let task = '';
  let table = '';
  let scenario = '';
  let businessObjective = '';
  let schemaSnippet = '';
  let targetQuery = '';
  let template = [];
  let slots = {};
  let hint = '';
  let explanation = '';

  if (discKey === 'table_creation_datatypes') {
    table = 'FinancialAccounts';
    if (difficulty === 'Easy') {
      title = `Table Scaffolding: Level ${lvl}: Precision Ledger Setup`;
      subtitle = `Define ledger table with exact NUMERIC precision and primary key constraints.`;
      task = `Declare exact currency columns to prevent binary floating-point representation drift.`;
      businessObjective = `Establish audit-proof balance tables with UTC timestamping.`;
      schemaSnippet = `LedgerAccounts(account_id BIGINT PK, balance NUMERIC(18,4), created_at TIMESTAMPTZ)`;
      targetQuery = `CREATE TABLE LedgerAccounts (\n  account_id BIGINT PRIMARY KEY,\n  balance NUMERIC(18,4) NOT NULL DEFAULT 0.0000,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP\n);`;
      template = [
        { text: "CREATE TABLE LedgerAccounts (\n  account_id BIGINT ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ PK CONSTRAINT ]" },
        { text: ",\n  balance ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DATATYPE ]" },
        { text: " NOT NULL DEFAULT 0.0000,\n  created_at ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ TIMEZONE TYPE ]" },
        { text: " NOT NULL DEFAULT CURRENT_TIMESTAMP\n);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "PRIMARY KEY", options: ensureUniqueOptions("PRIMARY KEY", ["FOREIGN KEY", "UNIQUE KEY", "INDEX KEY"]) },
        slot2: { correct: "NUMERIC(18,4)", options: ensureUniqueOptions("NUMERIC(18,4)", ["FLOAT(8)", "DOUBLE PRECISION", "REAL"]) },
        slot3: { correct: "TIMESTAMPTZ", options: ensureUniqueOptions("TIMESTAMPTZ", ["TIMESTAMP WITHOUT TIME ZONE", "TIME", "INTERVAL"]) }
      };
    } else if (difficulty === 'Medium') {
      title = `Table Scaffolding: Level ${lvl}: Identity & UUID Keying`;
      subtitle = `Implement auto-incrementing identity and unlogged transient buffers.`;
      task = `Define identity columns and volatile staging tables for high-throughput batch ingestion.`;
      businessObjective = `Optimize write-throughput for raw market tick ingestion.`;
      schemaSnippet = `MarketTicksStaging(tick_id BIGINT GENERATED ALWAYS AS IDENTITY, symbol VARCHAR(12), price NUMERIC(12,4))`;
      targetQuery = `CREATE UNLOGGED TABLE MarketTicksStaging (\n  tick_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  symbol VARCHAR(12) NOT NULL,\n  price NUMERIC(12,4) NOT NULL\n);`;
      template = [
        { text: "CREATE ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ LOGGING MODIFIER ]" },
        { text: " TABLE MarketTicksStaging (\n  tick_id BIGINT ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ IDENTITY CLAUSE ]" },
        { text: " PRIMARY KEY,\n  symbol ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ STRING TYPE ]" },
        { text: " NOT NULL,\n  price NUMERIC(12,4) NOT NULL\n);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "UNLOGGED", options: ensureUniqueOptions("UNLOGGED", ["TEMPORARY", "CACHED", "VOLATILE"]) },
        slot2: { correct: "GENERATED ALWAYS AS IDENTITY", options: ensureUniqueOptions("GENERATED ALWAYS AS IDENTITY", ["AUTO_INCREMENT", "SERIAL PRIMARY", "IDENTITY(1,1)"]) },
        slot3: { correct: "VARCHAR(12)", options: ensureUniqueOptions("VARCHAR(12)", ["TEXT ARRAY", "CHAR(255)", "BLOB"]) }
      };
    } else {
      title = `Table Scaffolding: Level ${lvl}: Enterprise Vault Architecture`;
      subtitle = `Configure custom collation, strict nullability, and binary storage.`;
      task = `Construct mission-critical compliance vaults with bytea checksums and immutable audit metadata.`;
      businessObjective = `Enforce hardware-level storage invariants and tamper-evident hashes.`;
      schemaSnippet = `AuditVault(vault_id UUID PK, payload_hash BYTEA NOT NULL, recorded_at TIMESTAMPTZ)`;
      targetQuery = `CREATE TABLE AuditVault (\n  vault_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  tenant_code VARCHAR(32) COLLATE "C" NOT NULL,\n  payload_hash BYTEA NOT NULL,\n  recorded_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()\n);`;
      template = [
        { text: "CREATE TABLE AuditVault (\n  vault_id UUID DEFAULT ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ UUID FUNCTION ]" },
        { text: " PRIMARY KEY,\n  tenant_code VARCHAR(32) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ COLLATION CLAUSE ]" },
        { text: " NOT NULL,\n  payload_hash ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ BINARY TYPE ]" },
        { text: " NOT NULL,\n  recorded_at TIMESTAMPTZ NOT NULL DEFAULT ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot4", placeholder: "[ CLOCK FUNCTION ]" },
        { text: "\n);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "gen_random_uuid()", options: ensureUniqueOptions("gen_random_uuid()", ["uuid_generate_v1()", "RANDOM()", "NEWID()"]) },
        slot2: { correct: 'COLLATE "C"', options: ensureUniqueOptions('COLLATE "C"', ["COLLATE utf8_general", "ENCODING 'UTF8'", "LOCALE 'en_US'"]) },
        slot3: { correct: "BYTEA", options: ensureUniqueOptions("BYTEA", ["BLOB", "BINARY(64)", "RAW"]) },
        slot4: { correct: "clock_timestamp()", options: ensureUniqueOptions("clock_timestamp()", ["statement_timestamp()", "CURRENT_DATE", "NOW() - 1"]) }
      };
    }
  } else if (discKey === 'primary_foreign_keys') {
    table = 'TradeAllocations';
    if (difficulty === 'Easy') {
      title = `Referential Integrity: Level ${lvl}: Basic Foreign Key Linking`;
      subtitle = `Bind child allocation records to parent trades with foreign key constraints.`;
      task = `Ensure parent trade existence before permitting child allocation insertions.`;
      businessObjective = `Prevent orphaned trade line items in institutional settlement systems.`;
      schemaSnippet = `TradeAllocations(alloc_id INT PK, trade_id INT REFERENCES Trades(id))`;
      targetQuery = `CREATE TABLE TradeAllocations (\n  alloc_id INT PRIMARY KEY,\n  trade_id INT NOT NULL,\n  CONSTRAINT fk_trade FOREIGN KEY (trade_id) REFERENCES Trades(trade_id)\n);`;
      template = [
        { text: "CREATE TABLE TradeAllocations (\n  alloc_id INT PRIMARY KEY,\n  trade_id INT NOT NULL,\n  CONSTRAINT fk_trade ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ FK CLAUSE ]" },
        { text: " (trade_id) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ REFERENCES CLAUSE ]" },
        { text: " Trades(", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ PARENT KEY ]" },
        { text: ")\n);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "FOREIGN KEY", options: ensureUniqueOptions("FOREIGN KEY", ["LINK KEY", "CHECK KEY", "RELATIONAL KEY"]) },
        slot2: { correct: "REFERENCES", options: ensureUniqueOptions("REFERENCES", ["CONNECTS TO", "POINTS TO", "DEPENDS ON"]) },
        slot3: { correct: "trade_id", options: ensureUniqueOptions("trade_id", ["alloc_id", "id_parent", "tx_seq"]) }
      };
    } else if (difficulty === 'Medium') {
      title = `Referential Integrity: Level ${lvl}: Cascading Deletion & Nullification`;
      subtitle = `Configure ON DELETE CASCADE and ON DELETE SET NULL policies.`;
      task = `Specify deterministic child record cleanup behavior upon parent record archival.`;
      businessObjective = `Safely propagate client lifecycle status updates across dependent records.`;
      schemaSnippet = `OrderItems(item_id INT PK, order_id INT, broker_id INT)`;
      targetQuery = `ALTER TABLE OrderItems\n  ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,\n  ADD CONSTRAINT fk_broker FOREIGN KEY (broker_id) REFERENCES Brokers(broker_id) ON DELETE SET NULL;`;
      template = [
        { text: "ALTER TABLE OrderItems\n  ADD CONSTRAINT fk_order FOREIGN KEY (order_id) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ REFERENCES KEYWORD ]" },
        { text: " Orders(order_id) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ CASCADE ACTION ]" },
        { text: ",\n  ADD CONSTRAINT fk_broker FOREIGN KEY (broker_id) REFERENCES Brokers(broker_id) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ NULLIFY ACTION ]" },
        { text: ";", isBlank: false }
      ];
      slots = {
        slot1: { correct: "REFERENCES", options: ensureUniqueOptions("REFERENCES", ["TARGETS", "JOINS", "LOOKUP"]) },
        slot2: { correct: "ON DELETE CASCADE", options: ensureUniqueOptions("ON DELETE CASCADE", ["ON PURGE ALL", "ON REMOVE ROW", "ON DROP CHILDREN"]) },
        slot3: { correct: "ON DELETE SET NULL", options: ensureUniqueOptions("ON DELETE SET NULL", ["ON DELETE SET DEFAULT", "ON REMOVE NULLIFY", "ON TRUNCATE CLEAR"]) }
      };
    } else {
      title = `Referential Integrity: Level ${lvl}: Deferrable Constraints in Batch Ingestion`;
      subtitle = `Implement DEFERRABLE INITIALLY DEFERRED constraints for cyclic dependencies.`;
      task = `Allow circular foreign key relationships to resolve within a single transaction boundary.`;
      businessObjective = `Facilitate two-way entity creation between Accounts and PrimaryHolders without constraint violations.`;
      schemaSnippet = `Accounts(acc_id PK, holder_id FK); Holders(holder_id PK, primary_acc_id FK)`;
      targetQuery = `ALTER TABLE Accounts\n  ADD CONSTRAINT fk_primary_holder FOREIGN KEY (holder_id)\n  REFERENCES AccountHolders(holder_id)\n  DEFERRABLE INITIALLY DEFERRED;`;
      template = [
        { text: "ALTER TABLE Accounts\n  ADD CONSTRAINT fk_primary_holder ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ FK CLAUSE ]" },
        { text: " (holder_id)\n  REFERENCES AccountHolders(holder_id)\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DEFERRABILITY ]" },
        { text: " ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ TIMING ]" },
        { text: ";", isBlank: false }
      ];
      slots = {
        slot1: { correct: "FOREIGN KEY", options: ensureUniqueOptions("FOREIGN KEY", ["PRIMARY KEY", "EXTERNAL KEY", "LINK KEY"]) },
        slot2: { correct: "DEFERRABLE", options: ensureUniqueOptions("DEFERRABLE", ["NOT DEFERRABLE", "DELAYED", "ASYNC"]) },
        slot3: { correct: "INITIALLY DEFERRED", options: ensureUniqueOptions("INITIALLY DEFERRED", ["INITIALLY IMMEDIATE", "ON COMMIT ONLY", "END OF BATCH"]) }
      };
    }
  } else if (discKey === 'check_unique_constraints') {
    table = 'TradingLimits';
    if (difficulty === 'Easy') {
      title = `Data Quality Enforcers: Level ${lvl}: Basic CHECK & NOT NULL`;
      subtitle = `Block negative balances and enforce positive share trade quantities.`;
      task = `Assert arithmetic validity directly inside the database catalog.`;
      businessObjective = `Eliminate negative cash balance anomalies at the storage boundary.`;
      schemaSnippet = `TradingLimits(account_id INT PK, max_leverage NUMERIC(4,2), min_equity NUMERIC(15,2))`;
      targetQuery = `ALTER TABLE TradingLimits\n  ADD CONSTRAINT chk_positive_equity CHECK (min_equity >= 0.00),\n  ADD CONSTRAINT chk_leverage_range CHECK (max_leverage BETWEEN 1.00 AND 50.00);`;
      template = [
        { text: "ALTER TABLE TradingLimits\n  ADD CONSTRAINT chk_positive_equity ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ CHECK KEYWORD ]" },
        { text: " (min_equity ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ NON-NEGATIVE OP ]" },
        { text: " 0.00),\n  ADD CONSTRAINT chk_leverage_range CHECK (max_leverage ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ RANGE OPERATOR ]" },
        { text: " 1.00 AND 50.00);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "CHECK", options: ensureUniqueOptions("CHECK", ["ASSERT", "VERIFY", "REQUIRE"]) },
        slot2: { correct: ">=", options: ensureUniqueOptions(">=", ["<=", "=", "<>"]) },
        slot3: { correct: "BETWEEN", options: ensureUniqueOptions("BETWEEN", ["WITHIN", "INSIDE", "RANGE"]) }
      };
    } else if (difficulty === 'Medium') {
      title = `Data Quality Enforcers: Level ${lvl}: Chronological Invariant Assertion`;
      subtitle = `Enforce settlement_date >= trade_date with composite business uniqueness.`;
      task = `Prevent time-travel execution anomalies and duplicate fiscal year submissions.`;
      businessObjective = `Guarantee temporal settlement consistency across clearing pipelines.`;
      schemaSnippet = `SettlementBatches(batch_id PK, trade_date DATE, settlement_date DATE, entity_id INT, fiscal_year INT)`;
      targetQuery = `ALTER TABLE SettlementBatches\n  ADD CONSTRAINT chk_settlement_timeline CHECK (settlement_date >= trade_date),\n  ADD CONSTRAINT uq_entity_fiscal_year UNIQUE (entity_id, fiscal_year);`;
      template = [
        { text: "ALTER TABLE SettlementBatches\n  ADD CONSTRAINT chk_settlement_timeline ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ CONSTRAINT TYPE ]" },
        { text: " (settlement_date ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ COMPARISON ]" },
        { text: " trade_date),\n  ADD CONSTRAINT uq_entity_fiscal_year ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ UNIQUE CONSTRAINT ]" },
        { text: " (entity_id, fiscal_year);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "CHECK", options: ensureUniqueOptions("CHECK", ["ASSERT", "VERIFY", "RULE"]) },
        slot2: { correct: ">=", options: ensureUniqueOptions(">=", ["<=", "=", "<>"]) },
        slot3: { correct: "UNIQUE", options: ensureUniqueOptions("UNIQUE", ["DISTINCT", "PRIMARY", "EXCLUSIVE"]) }
      };
    } else {
      title = `Data Quality Enforcers: Level ${lvl}: Regex Format Invariants`;
      subtitle = `Enforce ISIN format validation and strict non-null state transitions.`;
      task = `Assert international securities identification number formatting via POSIX regex.`;
      businessObjective = `Block corrupt security master records before downstream indexing.`;
      schemaSnippet = `SecuritiesMaster(security_id INT PK, isin VARCHAR(12) NOT NULL, currency_code VARCHAR(3))`;
      targetQuery = `ALTER TABLE SecuritiesMaster\n  ADD CONSTRAINT chk_valid_isin CHECK (isin ~ '^[A-Z]{2}[A-Z0-9]{9}[0-9]$'),\n  ADD CONSTRAINT chk_iso_currency CHECK (currency_code ~ '^[A-Z]{3}$');`;
      template = [
        { text: "ALTER TABLE SecuritiesMaster\n  ADD CONSTRAINT chk_valid_isin ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ CHECK CLAUSE ]" },
        { text: " (isin ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ REGEX MATCH OP ]" },
        { text: " '^[A-Z]{2}[A-Z0-9]{9}[0-9]$'),\n  ADD CONSTRAINT chk_iso_currency CHECK (currency_code ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ REGEX MATCH OP 2 ]" },
        { text: " '^[A-Z]{3}$');", isBlank: false }
      ];
      slots = {
        slot1: { correct: "CHECK", options: ensureUniqueOptions("CHECK", ["ASSERT", "VERIFY", "ENSURE"]) },
        slot2: { correct: "~", options: ensureUniqueOptions("~", ["LIKE", "=", "MATCHES"]) },
        slot3: { correct: "~", options: ensureUniqueOptions("~", ["SIMILAR TO", "REGEXP", "CONTAINS"]) }
      };
    }
  } else if (discKey === 'schema_migrations_alter') {
    table = 'ProductionLedgers';
    if (difficulty === 'Easy') {
      title = `Zero-Downtime Alterations: Level ${lvl}: Non-Locking Column Additions`;
      subtitle = `Add metadata tracking columns with safe default values.`;
      task = `Append audit columns to production tables without table rewrites.`;
      businessObjective = `Support new compliance logging requirements on live database instances.`;
      schemaSnippet = `ProductionLedgers(tx_id PK, amount NUMERIC(15,2))`;
      targetQuery = `ALTER TABLE ProductionLedgers\n  ADD COLUMN risk_tier VARCHAR(16) NOT NULL DEFAULT 'STANDARD',\n  ADD COLUMN verified_at TIMESTAMPTZ;`;
      template = [
        { text: "ALTER TABLE ProductionLedgers\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ADD COLUMN OP ]" },
        { text: " risk_tier VARCHAR(16) NOT NULL ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DEFAULT KEYWORD ]" },
        { text: " 'STANDARD',\n  ADD COLUMN verified_at ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ TIMESTAMPTZ TYPE ]" },
        { text: ";", isBlank: false }
      ];
      slots = {
        slot1: { correct: "ADD COLUMN", options: ensureUniqueOptions("ADD COLUMN", ["INSERT COLUMN", "APPEND COLUMN", "ATTACH FIELD"]) },
        slot2: { correct: "DEFAULT", options: ensureUniqueOptions("DEFAULT", ["INITIAL", "STATIC", "LITERAL"]) },
        slot3: { correct: "TIMESTAMPTZ", options: ensureUniqueOptions("TIMESTAMPTZ", ["TIMESTAMP", "DATETIME", "TIME"]) }
      };
    } else if (difficulty === 'Medium') {
      title = `Zero-Downtime Alterations: Level ${lvl}: Two-Phase Constraint Validation`;
      subtitle = `Attach constraints with NOT VALID to prevent ACCESS EXCLUSIVE table locks.`;
      task = `Apply high-impact constraints in production without blocking read/write traffic.`;
      businessObjective = `Maintain 99.999% trading uptime during active database migrations.`;
      schemaSnippet = `Accounts(acc_id PK, balance NUMERIC(18,2))`;
      targetQuery = `ALTER TABLE Accounts\n  ADD CONSTRAINT chk_min_balance CHECK (balance >= -500.00) NOT VALID;\n\nALTER TABLE Accounts\n  VALIDATE CONSTRAINT chk_min_balance;`;
      template = [
        { text: "ALTER TABLE Accounts\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ADD CONSTRAINT CLAUSE ]" },
        { text: " chk_min_balance CHECK (balance >= -500.00) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ LOCK AVOIDANCE CLAUSE ]" },
        { text: ";\n\nALTER TABLE Accounts\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ VALIDATION COMMAND ]" },
        { text: " chk_min_balance;", isBlank: false }
      ];
      slots = {
        slot1: { correct: "ADD CONSTRAINT", options: ensureUniqueOptions("ADD CONSTRAINT", ["ATTACH RULE", "ENFORCE CONSTRAINT", "CREATE CHECK"]) },
        slot2: { correct: "NOT VALID", options: ensureUniqueOptions("NOT VALID", ["DEFERRED", "UNCHECKED", "NO AUDIT"]) },
        slot3: { correct: "VALIDATE CONSTRAINT", options: ensureUniqueOptions("VALIDATE CONSTRAINT", ["CHECK CONSTRAINT", "ENFORCE CONSTRAINT", "CONFIRM CONSTRAINT"]) }
      };
    } else {
      title = `Zero-Downtime Alterations: Level ${lvl}: Column Widening & Safe Type Migration`;
      subtitle = `Safely widen integer keys to BIGINT and rename legacy attributes.`;
      task = `Perform zero-downtime primary key widening to prevent 32-bit counter exhaustion.`;
      businessObjective = `Future-proof high-velocity transaction tables against sequence overflow.`;
      schemaSnippet = `OrderTransactions(tx_id INT, legacy_code VARCHAR(10))`;
      targetQuery = `ALTER TABLE OrderTransactions\n  ALTER COLUMN tx_id TYPE BIGINT,\n  RENAME COLUMN legacy_code TO routing_identifier;`;
      template = [
        { text: "ALTER TABLE OrderTransactions\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ALTER COLUMN CLAUSE ]" },
        { text: " tx_id ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ TYPE MODIFIER ]" },
        { text: " BIGINT,\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ RENAME CLAUSE ]" },
        { text: " legacy_code TO routing_identifier;", isBlank: false }
      ];
      slots = {
        slot1: { correct: "ALTER COLUMN", options: ensureUniqueOptions("ALTER COLUMN", ["MODIFY COLUMN", "CHANGE COLUMN", "UPDATE FIELD"]) },
        slot2: { correct: "TYPE", options: ensureUniqueOptions("TYPE", ["DATATYPE", "AS", "SET"]) },
        slot3: { correct: "RENAME COLUMN", options: ensureUniqueOptions("RENAME COLUMN", ["CHANGE NAME", "ALIAS COLUMN", "SET NAME"]) }
      };
    }
  } else if (discKey === 'performance_indexing') {
    table = 'OrdersAuditIndex';
    if (difficulty === 'Easy') {
      title = `Advanced Physical Indexing: Level ${lvl}: Composite B-Tree Construction`;
      subtitle = `Build multi-column index following the leftmost prefix rule.`;
      task = `Accelerate compound equality and range filters in transaction searches.`;
      businessObjective = `Reduce p99 query latency from full-table scans to index seeks.`;
      schemaSnippet = `Orders(order_id PK, customer_id INT, order_date DATE, status VARCHAR(16))`;
      targetQuery = `CREATE INDEX idx_orders_customer_date\n  ON Orders (customer_id, order_date DESC);`;
      template = [
        { text: "CREATE ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ INDEX COMMAND ]" },
        { text: " idx_orders_customer_date\n  ON Orders (", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ PREFIX COLUMN ]" },
        { text: ", order_date ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SORT DIRECTION ]" },
        { text: ");", isBlank: false }
      ];
      slots = {
        slot1: { correct: "INDEX", options: ensureUniqueOptions("INDEX", ["BTREE", "LOOKUP", "KEY"]) },
        slot2: { correct: "customer_id", options: ensureUniqueOptions("customer_id", ["order_id", "status", "amount"]) },
        slot3: { correct: "DESC", options: ensureUniqueOptions("DESC", ["ASC", "NULLS FIRST", "REVERSE"]) }
      };
    } else if (difficulty === 'Medium') {
      title = `Advanced Physical Indexing: Level ${lvl}: Partial & Functional Indexes`;
      subtitle = `Construct partial index on active queues and lowercased emails.`;
      task = `Index only pending execution records to minimize storage footprint and write overhead.`;
      businessObjective = `Eliminate index bloat by excluding terminal state records from the B-Tree.`;
      schemaSnippet = `Trades(trade_id PK, status VARCHAR(16), client_email VARCHAR(128))`;
      targetQuery = `CREATE INDEX idx_pending_trades\n  ON Trades (trade_id)\n  WHERE status = 'PENDING';\n\nCREATE INDEX idx_lower_email\n  ON Trades (LOWER(client_email));`;
      template = [
        { text: "CREATE INDEX idx_pending_trades\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ON TABLE CLAUSE ]" },
        { text: " Trades (trade_id)\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ PARTIAL PREDICATE ]" },
        { text: " status = 'PENDING';\n\nCREATE INDEX idx_lower_email\n  ON Trades (", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ FUNCTIONAL EXPRESSION ]" },
        { text: "(client_email));", isBlank: false }
      ];
      slots = {
        slot1: { correct: "ON", options: ensureUniqueOptions("ON", ["FOR", "IN", "TARGET"]) },
        slot2: { correct: "WHERE", options: ensureUniqueOptions("WHERE", ["HAVING", "FILTER", "WHEN"]) },
        slot3: { correct: "LOWER", options: ensureUniqueOptions("LOWER", ["UPPER", "TRIM", "CASE"]) }
      };
    } else {
      title = `Advanced Physical Indexing: Level ${lvl}: Covering Indexes with INCLUDE`;
      subtitle = `Design covering index with non-key payload columns for index-only scans.`;
      task = `Satisfy queries entirely within the B-Tree without touching table heap pages.`;
      businessObjective = `Eliminate buffer cache churn and random heap page I/O on hot lookup paths.`;
      schemaSnippet = `Accounts(acc_id PK, broker_id INT, status VARCHAR(12), balance NUMERIC(18,2), last_trade_at TIMESTAMPTZ)`;
      targetQuery = `CREATE INDEX CONCURRENTLY idx_broker_status_covering\n  ON Accounts (broker_id, status)\n  INCLUDE (balance, last_trade_at);`;
      template = [
        { text: "CREATE INDEX ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ NON-BLOCKING CLAUSE ]" },
        { text: " idx_broker_status_covering\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ ON KEYWORD ]" },
        { text: " Accounts (broker_id, status)\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ COVERING CLAUSE ]" },
        { text: " (balance, last_trade_at);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "CONCURRENTLY", options: ensureUniqueOptions("CONCURRENTLY", ["ONLINE", "ASYNC", "BACKGROUND"]) },
        slot2: { correct: "ON", options: ensureUniqueOptions("ON", ["FOR", "OVER", "TARGET"]) },
        slot3: { correct: "INCLUDE", options: ensureUniqueOptions("INCLUDE", ["COVERING", "PAYLOAD", "WITH"]) }
      };
    }
  } else if (discKey === 'table_partitioning') {
    table = 'HistoricalLedgers';
    if (difficulty === 'Easy') {
      title = `Declarative Partitioning: Level ${lvl}: Range-Based Temporal Sharding`;
      subtitle = `Partition large financial transaction tables by monthly execution dates.`;
      task = `Define partitioned parent table and bound child partitions by calendar dates.`;
      businessObjective = `Enable query optimizer partition pruning on historical ledger queries.`;
      schemaSnippet = `LedgerTransactions(tx_id BIGINT, tx_date DATE, amount NUMERIC(15,2))`;
      targetQuery = `CREATE TABLE LedgerTransactions (\n  tx_id BIGINT NOT NULL,\n  tx_date DATE NOT NULL,\n  amount NUMERIC(15,2) NOT NULL\n) PARTITION BY RANGE (tx_date);`;
      template = [
        { text: "CREATE TABLE LedgerTransactions (\n  tx_id BIGINT NOT NULL,\n  tx_date DATE NOT NULL,\n  amount NUMERIC(15,2) NOT NULL\n) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ PARTITION CLAUSE ]" },
        { text: " ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ PARTITION STRATEGY ]" },
        { text: " (", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ SHARDING KEY ]" },
        { text: ");", isBlank: false }
      ];
      slots = {
        slot1: { correct: "PARTITION BY", options: ensureUniqueOptions("PARTITION BY", ["SHARD BY", "SPLIT ON", "DIVIDE BY"]) },
        slot2: { correct: "RANGE", options: ensureUniqueOptions("RANGE", ["INTERVAL", "SERIES", "SPAN"]) },
        slot3: { correct: "tx_date", options: ensureUniqueOptions("tx_date", ["amount", "tx_id", "status"]) }
      };
    } else if (difficulty === 'Medium') {
      title = `Declarative Partitioning: Level ${lvl}: Child Partition Bounds Definition`;
      subtitle = `Create explicit child partitions with FOR VALUES FROM ... TO ... bounds.`;
      task = `Construct monthly partition tables to receive routed trade records automatically.`;
      businessObjective = `Isolate quarterly transactional volume for high-efficiency maintenance.`;
      schemaSnippet = `Ledger_2026_Q1 PARTITION OF LedgerTransactions FOR VALUES FROM ('2026-01-01') TO ('2026-04-01')`;
      targetQuery = `CREATE TABLE Ledger_2026_Q1 PARTITION OF LedgerTransactions\n  FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');`;
      template = [
        { text: "CREATE TABLE Ledger_2026_Q1 ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ PARTITION OF CLAUSE ]" },
        { text: " LedgerTransactions\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ BOUNDS DECLARATION ]" },
        { text: " ('2026-01-01') ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ UPPER BOUND CONNECTOR ]" },
        { text: " ('2026-04-01');", isBlank: false }
      ];
      slots = {
        slot1: { correct: "PARTITION OF", options: ensureUniqueOptions("PARTITION OF", ["INHERITS", "CHILD OF", "SUBTABLE OF"]) },
        slot2: { correct: "FOR VALUES FROM", options: ensureUniqueOptions("FOR VALUES FROM", ["BETWEEN VALUES", "BOUNDED FROM", "RANGE FROM"]) },
        slot3: { correct: "TO", options: ensureUniqueOptions("TO", ["UNTIL", "THROUGH", "LESS THAN"]) }
      };
    } else {
      title = `Declarative Partitioning: Level ${lvl}: Zero-Copy Archival via DETACH`;
      subtitle = `Detach historical partition concurrently to archive cold data without table locks.`;
      task = `Decouple 5-year-old regulatory ledger partition in milliseconds without mass DELETE operations.`;
      businessObjective = `Achieve instant table compaction and archive migration with zero transaction interruption.`;
      schemaSnippet = `ALTER TABLE LedgerTransactions DETACH PARTITION Ledger_2021 CONCURRENTLY`;
      targetQuery = `ALTER TABLE LedgerTransactions\n  DETACH PARTITION Ledger_2021 CONCURRENTLY;`;
      template = [
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ ALTER TABLE COMMAND ]" },
        { text: " LedgerTransactions\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DETACH COMMAND ]" },
        { text: " Ledger_2021 ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ NON-BLOCKING MODIFIER ]" },
        { text: ";", isBlank: false }
      ];
      slots = {
        slot1: { correct: "ALTER TABLE", options: ensureUniqueOptions("ALTER TABLE", ["UPDATE TABLE", "MODIFY TABLE", "SET TABLE"]) },
        slot2: { correct: "DETACH PARTITION", options: ensureUniqueOptions("DETACH PARTITION", ["DROP PARTITION", "UNLINK TABLE", "REMOVE SHARD"]) },
        slot3: { correct: "CONCURRENTLY", options: ensureUniqueOptions("CONCURRENTLY", ["IMMEDIATE", "WITHOUT LOCK", "ONLINE"]) }
      };
    }
  } else {
    // generated_columns_domains
    table = 'FinancialInvoices';
    if (difficulty === 'Easy') {
      title = `Generated Columns & Types: Level ${lvl}: Stored Generated Totals`;
      subtitle = `Compute gross invoice line total automatically via stored generated columns.`;
      task = `Define deterministic arithmetic columns calculated and persisted on write.`;
      businessObjective = `Eliminate calculation discrepancy between application layers and database reporting.`;
      schemaSnippet = `InvoiceLines(line_id PK, unit_price NUMERIC(12,2), quantity INT, gross_amount GENERATED ALWAYS AS ...)`;
      targetQuery = `CREATE TABLE InvoiceLines (\n  line_id INT PRIMARY KEY,\n  unit_price NUMERIC(12,2) NOT NULL,\n  quantity INT NOT NULL,\n  gross_amount NUMERIC(14,2) GENERATED ALWAYS AS (unit_price * quantity) STORED\n);`;
      template = [
        { text: "CREATE TABLE InvoiceLines (\n  line_id INT PRIMARY KEY,\n  unit_price NUMERIC(12,2) NOT NULL,\n  quantity INT NOT NULL,\n  gross_amount NUMERIC(14,2) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ GENERATED CLAUSE ]" },
        { text: " (unit_price ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ MULTIPLY OP ]" },
        { text: " quantity) ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ STORAGE SPECIFIER ]" },
        { text: "\n);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "GENERATED ALWAYS AS", options: ensureUniqueOptions("GENERATED ALWAYS AS", ["COMPUTED AS", "CALCULATE WITH", "AUTO DERIVED"]) },
        slot2: { correct: "*", options: ensureUniqueOptions("*", ["+", "-", "/"]) },
        slot3: { correct: "STORED", options: ensureUniqueOptions("STORED", ["VIRTUAL", "PERSISTENT", "CACHED"]) }
      };
    } else if (difficulty === 'Medium') {
      title = `Generated Columns & Types: Level ${lvl}: Reusable Domain Types with Validation`;
      subtitle = `Create custom PositiveCurrency domain with encapsulated CHECK constraint.`;
      task = `Establish reusable domain types to enforce monetary invariants across dozens of tables.`;
      businessObjective = `Standardize currency data modeling across multi-service database schemas.`;
      schemaSnippet = `CREATE DOMAIN PositiveCurrency AS NUMERIC(18,2) CHECK (VALUE >= 0.00)`;
      targetQuery = `CREATE DOMAIN PositiveCurrency AS NUMERIC(18,2)\n  DEFAULT 0.00\n  CHECK (VALUE >= 0.00);`;
      template = [
        { text: "CREATE ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ DOMAIN COMMAND ]" },
        { text: " PositiveCurrency AS NUMERIC(18,2)\n  ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ DEFAULT KEYWORD ]" },
        { text: " 0.00\n  CHECK (", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ DOMAIN VALUE KEYWORD ]" },
        { text: " >= 0.00);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "DOMAIN", options: ensureUniqueOptions("DOMAIN", ["TYPE", "ALIAS", "TYPEDEF"]) },
        slot2: { correct: "DEFAULT", options: ensureUniqueOptions("DEFAULT", ["INITIAL", "BASE", "STATIC"]) },
        slot3: { correct: "VALUE", options: ensureUniqueOptions("VALUE", ["SELF", "THIS", "CURRENT"]) }
      };
    } else {
      title = `Generated Columns & Types: Level ${lvl}: Finite State Machine ENUMs`;
      subtitle = `Define custom ENUM type for trade settlement state lifecycle.`;
      task = `Enforce deterministic state transitions using strict database-level enumerated types.`;
      businessObjective = `Block invalid trade status strings from entering clearing pipelines.`;
      schemaSnippet = `CREATE TYPE TradeSettlementStatus AS ENUM ('INITIATED', 'MATCHED', 'SETTLED', 'FAILED')`;
      targetQuery = `CREATE TYPE TradeSettlementStatus AS ENUM (\n  'INITIATED',\n  'MATCHED',\n  'SETTLED',\n  'FAILED'\n);`;
      template = [
        { text: "CREATE ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot1", placeholder: "[ TYPE COMMAND ]" },
        { text: " TradeSettlementStatus ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot2", placeholder: "[ AS KEYWORD ]" },
        { text: " ", isBlank: false },
        { text: "", isBlank: true, slotId: "slot3", placeholder: "[ ENUM KEYWORD ]" },
        { text: " (\n  'INITIATED',\n  'MATCHED',\n  'SETTLED',\n  'FAILED'\n);", isBlank: false }
      ];
      slots = {
        slot1: { correct: "TYPE", options: ensureUniqueOptions("TYPE", ["DOMAIN", "ENUMERATION", "DATATYPE"]) },
        slot2: { correct: "AS", options: ensureUniqueOptions("AS", ["IS", "LIKE", "WITH"]) },
        slot3: { correct: "ENUM", options: ensureUniqueOptions("ENUM", ["CHOICE", "SET", "LIST"]) }
      };
    }
  }

  hint = `Remember: ${disc.concept}. Be mindful of: ${disc.traps.split('!')[0]}!`;
  explanation = `In Level ${lvl}, we establish physical schema resilience via ${disc.name}. ${disc.concept} ensures data integrity and high-performance querying without runtime exceptions.`;

  return {
    id,
    discipline: disc.name,
    disciplineKey: disc.key,
    disciplineLevel: lvl,
    difficulty,
    levelDisplay,
    title,
    subtitle,
    type: "fill_blank",
    category: `Section 10: DDL & Schema Architecture (${disc.name})`,
    subcluster: `${disc.name} (${difficulty})`,
    tier,
    tierColor,
    task,
    xp,
    table,
    scenario: subtitle,
    businessObjective: task,
    schemaSnippet,
    targetQuery,
    template,
    slots,
    hint,
    explanation
  };
}

const quests = generateSection10Quests();

const output = `// =============================================================================
// SECTION 10: DDL, SCHEMA ARCHITECTURE & INTEGRITY CONSTRAINTS ARENA (420 QUESTS)
// 7 Disciplines x 60 Levels (20 Easy / 20 Medium / 20 Hard)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

if (typeof window === 'undefined') {
  global.window = {};
}

window.DDL_DISCIPLINES_METADATA = ${JSON.stringify(DDL_DISCIPLINES, null, 2)};

window.QUESTS_SECTION_10 = ${JSON.stringify(quests, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DDL_DISCIPLINES_METADATA: window.DDL_DISCIPLINES_METADATA,
    QUESTS_SECTION_10: window.QUESTS_SECTION_10
  };
}
`;

fs.writeFileSync('visualizer/quests_section10_data.js', output, 'utf8');
console.log(`Generated ${quests.length} quests in visualizer/quests_section10_data.js`);
