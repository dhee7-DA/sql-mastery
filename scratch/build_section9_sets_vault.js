// =============================================================================
// SECTION 09 BUILDER: SET OPERATIONS & SCHEMA HARMONIZATION MASTER ARENA (420 PROBLEMS)
// 7 Disciplines x 60 Levels (20 Easy / 20 Medium / 20 Hard)
// Verified 3-5 Blanks, Zero Duplicate Options, Real-World Data & Financial Scenarios
// =============================================================================

const fs = require('fs');

const SET_DISCIPLINES = [
  {
    key: 'union_all',
    name: 'HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)',
    symbol: '⧺',
    color: '#38bdf8',
    concept: 'Zero-Sort Row Appending & Partition Concatenation',
    whenToUse: 'When combining data from multiple identical or compatible tables where duplicates are either impossible or desired (e.g. streaming event logs, historical transaction partitions).',
    scenarios: 'Consolidating current month transactions with archived cold ledger partitions; Merging domestic and cross-border trade logs; Ingesting distributed event streams.',
    traps: 'ACCIDENTAL UNION INSTEAD OF UNION ALL! Plain UNION triggers a hidden, expensive deduplication sort across the entire dataset. In high-volume financial ingestion pipelines, this degrades throughput by up to 10x!'
  },
  {
    key: 'union',
    name: 'DEDUPLICATION SET UNIONS (UNION)',
    symbol: '∪',
    color: '#10b981',
    concept: 'Distinct Relational Union (Set Deduplication)',
    whenToUse: 'When merging client lists, contact channels, or security holdings from disparate source systems where duplicate records must be collapsed into a single distinct representation.',
    scenarios: 'Merging legacy CRM leads with new marketing automation lists; Consolidating unique securities held across multiple institutional funds; Creating master customer registries.',
    traps: 'ALIAS IN SECONDARY QUERY TRAP! Column aliases defined in the second (or subsequent) SELECT statements are completely IGNORED by the database engine. The column names of the final result set are governed strictly by the FIRST SELECT statement.'
  },
  {
    key: 'intersect',
    name: 'RELATIONAL SET INTERSECTIONS (INTERSECT)',
    symbol: '∩',
    color: '#f59e0b',
    concept: 'Shared Relational Membership & Omnichannel Matching',
    whenToUse: 'When identifying records or entities that exist simultaneously in two or more independent datasets without writing complex multi-table joins.',
    scenarios: 'Finding omnichannel high-net-worth clients enrolled in both brokerage trading and private wealth management; Identifying assets held simultaneously in long and short portfolios; Cross-sell audience matching.',
    traps: 'DATATYPE COMPATIBILITY TRAP! Corresponding columns across INTERSECT branches must have compatible types and exact positional alignment. If Column 2 is an INT in Query 1 and a VARCHAR in Query 2, the query will abort.'
  },
  {
    key: 'except_minus',
    name: 'SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)',
    symbol: '∖',
    color: '#ec4899',
    concept: 'Anti-Set Exclusion & Delta Finding',
    whenToUse: 'When auditing ledger discrepancies, finding missing clearing transactions, or identifying inactive/churned customer entities.',
    scenarios: 'Ledger break reconciliation: Finding trades recorded in internal front-office OMS but missing from custodian clearinghouse files; Identifying users who registered but never placed an order.',
    traps: 'ORDER OF SET OPERATION MATTERS! Unlike UNION and INTERSECT, EXCEPT is NOT commutative! (A EXCEPT B) produces records in A missing from B. (B EXCEPT A) produces records in B missing from A. Flipping the order reverses the audit!'
  },
  {
    key: 'schema_harmonization',
    name: 'HETEROGENEOUS SCHEMA HARMONIZATION & TYPE CASTING',
    symbol: '🧩',
    color: '#a855f7',
    concept: 'Disparate Schema Padding, Positional Alignment & Explicit Casting',
    whenToUse: 'When stacking tables that share core metrics but have different numbers of columns, requiring synthetic NULL padding, default literals, or explicit type conversions.',
    scenarios: 'Merging modern trading ledger with legacy mainframe export (padding missing risk columns with NULL); Unifying acquisition target client schemas with parent bank format; Multi-region regulatory filing alignment.',
    traps: 'COLUMN COUNT MISMATCH TRAP! Every SELECT statement in a set operation MUST project the exact same number of columns. Omitting synthetic padding (e.g. NULL AS fee_amount) causes an immediate syntax abort.'
  },
  {
    key: 'compound_precedence',
    name: 'COMPOUND SET PRECEDENCE & PARENTHESES',
    symbol: '⚡',
    color: '#06b6d4',
    concept: 'Compound Multiset Algebra & Precedence Hierarchy',
    whenToUse: 'When combining three or more queries with mixed operators (e.g. UNION with INTERSECT, or UNION with EXCEPT) where evaluation order must be strictly controlled.',
    scenarios: 'Filtering validated transaction pools before intersecting with partner clearing records; Complex multi-tier regulatory exclusions; High-priority client cohort segmentation.',
    traps: 'OPERATOR PRECEDENCE TRAP! In standard ANSI SQL, INTERSECT binds tighter than UNION and EXCEPT. Without explicit parentheses `(...)`, queries will evaluate in unexpected order and corrupt reporting!'
  },
  {
    key: 'symmetric_delta_audit',
    name: 'SYMMETRIC DIFFERENCES & ETL RECONCILIATION',
    symbol: '⚖️',
    color: '#f97316',
    concept: 'Bi-Directional Delta Identification & Integrity Verification',
    whenToUse: 'When verifying that two tables are 100% synchronized (e.g. during cloud database migration, ETL pipeline verification, or disaster recovery replica audits).',
    scenarios: 'Cloud migration cutover: Tagging records missing in Target vs orphaned in Source using (A EXCEPT B) UNION ALL (B EXCEPT A); Bank statement vs General Ledger dual-sided discrepancy tagging.',
    traps: 'ONE-WAY AUDIT BLIND SPOT! Running only (Source EXCEPT Target) verifies what is missing in Target, but completely blinds you to phantom extra records inserted into Target! Always execute a bi-directional tagged audit.'
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

function generateDisciplineQuests(disciplineMeta, startId) {
  const quests = [];
  const discKey = disciplineMeta.key;

  for (let lvl = 1; lvl <= 60; lvl++) {
    const questId = startId + lvl - 1;
    let difficulty = 'Easy';
    if (lvl > 20 && lvl <= 40) difficulty = 'Medium';
    if (lvl > 40) difficulty = 'Hard';

    const lvlStr = lvl < 10 ? `0${lvl}` : `${lvl}`;
    const levelDisplay = `SET Lvl ${lvlStr}`;

    let title = '';
    let subtitle = '';
    let task = '';
    let schemaSnippet = '';
    let table = 'DomesticTrades';
    let template = '';
    let targetQuery = '';
    let slots = {};

    switch (discKey) {
      // =========================================================================
      // 1. HIGH-THROUGHPUT RELATIONAL APPENDS (UNION ALL)
      // =========================================================================
      case 'union_all': {
        table = 'DomesticTrades';
        schemaSnippet = 'DomesticTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL, executed_at TIMESTAMP) | OffshoreTrades(trade_id INT, broker_id VARCHAR, trade_amount DECIMAL, executed_at TIMESTAMP)';
        if (difficulty === 'Easy') {
          title = `UNION ALL: Level ${lvlStr}: High-Throughput Ledger Append`;
          subtitle = `Stack DomesticTrades and OffshoreTrades records without expensive deduplication sort.`;
          task = `Use UNION ALL to append transaction streams while preserving performance.`;
          slots = {
            slot1: { correct: 'SELECT', options: ensureUniqueOptions('SELECT', ['EXTRACT', 'PROJECT', 'GET']) },
            slot2: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'MERGE ALL', 'APPEND']) },
            slot3: { correct: 'FROM', options: ensureUniqueOptions('FROM', ['INTO', 'SOURCE', 'TABLE']) }
          };
          template = `{{slot1}} trade_id, broker_id, trade_amount\nFROM DomesticTrades\n{{slot2}}\nSELECT trade_id, broker_id, trade_amount\n{{slot3}} OffshoreTrades;`;
          targetQuery = `SELECT trade_id, broker_id, trade_amount\nFROM DomesticTrades\nUNION ALL\nSELECT trade_id, broker_id, trade_amount\nFROM OffshoreTrades;`;
        } else if (difficulty === 'Medium') {
          title = `UNION ALL: Level ${lvlStr}: Multi-Region Ledger Partitioning`;
          subtitle = `Consolidate regional tables with explicit source entity attribution tags.`;
          task = `Combine US, EMEA, and APAC trade partitions using UNION ALL with synthetic region tags.`;
          const minAmt = 1000 + lvl * 100;
          slots = {
            slot1: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'COMBINE', 'CONCAT']) },
            slot2: { correct: 'WHERE', options: ensureUniqueOptions('WHERE', ['HAVING', 'FILTER', 'WHEN']) },
            slot3: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'JOIN ALL', 'ATTACH']) },
            slot4: { correct: 'trade_amount', options: ensureUniqueOptions('trade_amount', ['notional_val', 'trade_amt', 'amount_total']) }
          };
          template = `SELECT 'US' AS region, trade_id, trade_amount FROM USTrades {{slot2}} trade_amount >= ${minAmt}\n{{slot1}}\nSELECT 'EMEA' AS region, trade_id, trade_amount FROM EMEATrades WHERE trade_amount >= ${minAmt}\n{{slot3}}\nSELECT 'APAC' AS region, trade_id, {{slot4}} FROM APACTrades WHERE trade_amount >= ${minAmt};`;
          targetQuery = `SELECT 'US' AS region, trade_id, trade_amount FROM USTrades WHERE trade_amount >= ${minAmt}\nUNION ALL\nSELECT 'EMEA' AS region, trade_id, trade_amount FROM EMEATrades WHERE trade_amount >= ${minAmt}\nUNION ALL\nSELECT 'APAC' AS region, trade_id, trade_amount FROM APACTrades WHERE trade_amount >= ${minAmt};`;
        } else {
          // Hard
          title = `UNION ALL: Level ${lvlStr}: Composite Partition Stream with Trailing Sort`;
          subtitle = `Stack real-time hot trades with cold historical archives and enforce global ordering.`;
          task = `Union active and archived transaction partitions, applying a global ORDER BY and LIMIT.`;
          const limitCount = 50 + lvl;
          slots = {
            slot1: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'PLUS', 'STACK']) },
            slot2: { correct: 'ORDER BY', options: ensureUniqueOptions('ORDER BY', ['SORT BY', 'CLUSTER BY', 'GROUP BY']) },
            slot3: { correct: 'DESC', options: ensureUniqueOptions('DESC', ['DOWN', 'HIGH_FIRST', 'ASC']) },
            slot4: { correct: 'LIMIT', options: ensureUniqueOptions('LIMIT', ['TOP', 'FETCH FIRST', 'TAKE']) }
          };
          template = `SELECT trade_id, executed_at, trade_amount FROM HotTradeStream\n{{slot1}}\nSELECT trade_id, executed_at, trade_amount FROM ColdTradeArchive\n{{slot2}} executed_at {{slot3}}\n{{slot4}} ${limitCount};`;
          targetQuery = `SELECT trade_id, executed_at, trade_amount FROM HotTradeStream\nUNION ALL\nSELECT trade_id, executed_at, trade_amount FROM ColdTradeArchive\nORDER BY executed_at DESC\nLIMIT ${limitCount};`;
        }
        break;
      }

      // =========================================================================
      // 2. DEDUPLICATION SET UNIONS (UNION)
      // =========================================================================
      case 'union': {
        table = 'RetailClientDirectory';
        schemaSnippet = 'RetailClientDirectory(client_id VARCHAR, tax_id VARCHAR, full_name VARCHAR, status VARCHAR) | WealthClientDirectory(client_id VARCHAR, tax_id VARCHAR, full_name VARCHAR, status VARCHAR)';
        if (difficulty === 'Easy') {
          title = `UNION: Level ${lvlStr}: Deduplicated Master Client Directory`;
          subtitle = `Consolidate retail and wealth client entities into a unique master registry.`;
          task = `Use UNION to collapse duplicate client records into a single distinct result set.`;
          slots = {
            slot1: { correct: 'tax_id', options: ensureUniqueOptions('tax_id', ['ssn_code', 'national_id', 'tax_num']) },
            slot2: { correct: 'UNION', options: ensureUniqueOptions('UNION', ['UNION ALL', 'INTERSECT', 'EXCEPT']) },
            slot3: { correct: 'FROM', options: ensureUniqueOptions('FROM', ['INTO', 'TABLE', 'SOURCE']) }
          };
          template = `SELECT {{slot1}}, full_name FROM RetailClientDirectory\n{{slot2}}\nSELECT tax_id, full_name {{slot3}} WealthClientDirectory;`;
          targetQuery = `SELECT tax_id, full_name FROM RetailClientDirectory\nUNION\nSELECT tax_id, full_name FROM WealthClientDirectory;`;
        } else if (difficulty === 'Medium') {
          title = `UNION: Level ${lvlStr}: Multi-Broker Portfolio Asset Consolidation`;
          subtitle = `Identify unique securities held across multiple custodial clearinghouses.`;
          task = `Merge holdings across three broker records, deduplicating tickers with UNION.`;
          slots = {
            slot1: { correct: 'ticker_symbol', options: ensureUniqueOptions('ticker_symbol', ['security_id', 'asset_tag', 'cusip']) },
            slot2: { correct: 'UNION', options: ensureUniqueOptions('UNION', ['UNION ALL', 'MERGE', 'COMBINE']) },
            slot3: { correct: 'asset_class', options: ensureUniqueOptions('asset_class', ['sec_type', 'instrument_cat', 'category']) },
            slot4: { correct: 'UNION', options: ensureUniqueOptions('UNION', ['UNION ALL', 'INTERSECT', 'JOIN']) }
          };
          template = `SELECT {{slot1}}, {{slot3}} FROM PrimeHoldings\n{{slot2}}\nSELECT ticker_symbol, asset_class FROM CustodyHoldings\n{{slot4}}\nSELECT ticker_symbol, asset_class FROM ClearingHoldings;`;
          targetQuery = `SELECT ticker_symbol, asset_class FROM PrimeHoldings\nUNION\nSELECT ticker_symbol, asset_class FROM CustodyHoldings\nUNION\nSELECT ticker_symbol, asset_class FROM ClearingHoldings;`;
        } else {
          // Hard
          title = `UNION: Level ${lvlStr}: Enterprise Deduplication with Final Ordering & Precedence`;
          subtitle = `Unify and deduplicate sanctioned corporate tax entities with strict trailing sorting.`;
          task = `Consolidate active and legacy registries with UNION, ordering results alphabetically by entity name.`;
          slots = {
            slot1: { correct: 'UNION', options: ensureUniqueOptions('UNION', ['UNION ALL', 'MERGE', 'APPEND']) },
            slot2: { correct: 'WHERE', options: ensureUniqueOptions('WHERE', ['HAVING', 'FILTER', 'WHEN']) },
            slot3: { correct: 'ORDER BY', options: ensureUniqueOptions('ORDER BY', ['SORT BY', 'GROUP BY', 'ARRANGE BY']) },
            slot4: { correct: 'ASC', options: ensureUniqueOptions('ASC', ['DESC', 'ALPHA', 'FORWARD']) }
          };
          template = `SELECT legal_name, tax_id, jurisdiction FROM DomesticRegistry {{slot2}} status = 'ACTIVE'\n{{slot1}}\nSELECT legal_name, tax_id, jurisdiction FROM OffshoreRegistry WHERE status = 'ACTIVE'\n{{slot3}} legal_name {{slot4}};`;
          targetQuery = `SELECT legal_name, tax_id, jurisdiction FROM DomesticRegistry WHERE status = 'ACTIVE'\nUNION\nSELECT legal_name, tax_id, jurisdiction FROM OffshoreRegistry WHERE status = 'ACTIVE'\nORDER BY legal_name ASC;`;
        }
        break;
      }

      // =========================================================================
      // 3. RELATIONAL SET INTERSECTIONS (INTERSECT)
      // =========================================================================
      case 'intersect': {
        table = 'EquityDeskTraders';
        schemaSnippet = 'EquityDeskTraders(trader_id VARCHAR, tax_id VARCHAR, desk_code VARCHAR) | CryptoDeskTraders(trader_id VARCHAR, tax_id VARCHAR, desk_code VARCHAR)';
        if (difficulty === 'Easy') {
          title = `INTERSECT: Level ${lvlStr}: Cross-Desk Trader Membership`;
          subtitle = `Find traders who are actively certified on both Equity and Crypto trading desks.`;
          task = `Use INTERSECT to isolate records that exist simultaneously in both tables.`;
          slots = {
            slot1: { correct: 'tax_id', options: ensureUniqueOptions('tax_id', ['trader_code', 'account_id', 'trader_id']) },
            slot2: { correct: 'INTERSECT', options: ensureUniqueOptions('INTERSECT', ['UNION', 'EXCEPT', 'CROSS']) },
            slot3: { correct: 'FROM', options: ensureUniqueOptions('FROM', ['INTO', 'TABLE', 'JOIN']) }
          };
          template = `SELECT {{slot1}} FROM EquityDeskTraders\n{{slot2}}\nSELECT tax_id {{slot3}} CryptoDeskTraders;`;
          targetQuery = `SELECT tax_id FROM EquityDeskTraders\nINTERSECT\nSELECT tax_id FROM CryptoDeskTraders;`;
        } else if (difficulty === 'Medium') {
          title = `INTERSECT: Level ${lvlStr}: Omnichannel VIP Client Overlap`;
          subtitle = `Identify institutional clients subscribed simultaneously to Prime Brokerage and Wealth.`;
          task = `Intersect active institutional client IDs across Prime and Private Wealth platforms.`;
          slots = {
            slot1: { correct: 'institutional_lei', options: ensureUniqueOptions('institutional_lei', ['lei_number', 'entity_code', 'tax_id']) },
            slot2: { correct: 'INTERSECT', options: ensureUniqueOptions('INTERSECT', ['UNION', 'EXCEPT', 'INNER JOIN']) },
            slot3: { correct: 'WHERE', options: ensureUniqueOptions('WHERE', ['HAVING', 'FILTER', 'ON']) },
            slot4: { correct: 'INTERSECT', options: ensureUniqueOptions('INTERSECT', ['UNION ALL', 'CROSS', 'DIFF']) }
          };
          template = `SELECT {{slot1}} FROM PrimeClients {{slot3}} aum_tier = 'TIER_1'\n{{slot2}}\nSELECT institutional_lei FROM WealthClients WHERE aum_tier = 'TIER_1'\n{{slot4}}\nSELECT institutional_lei FROM FamilyOfficeClients;`;
          targetQuery = `SELECT institutional_lei FROM PrimeClients WHERE aum_tier = 'TIER_1'\nINTERSECT\nSELECT institutional_lei FROM WealthClients WHERE aum_tier = 'TIER_1'\nINTERSECT\nSELECT institutional_lei FROM FamilyOfficeClients;`;
        } else {
          // Hard
          title = `INTERSECT: Level ${lvlStr}: Strict Multi-Column Composite Compliance Intersect`;
          subtitle = `Audit high-risk trading entities that appear across both the SEC and OFAC Watchlists.`;
          task = `Intersect composite keys (tax_id, legal_entity_name) between local registries and global watchlists.`;
          slots = {
            slot1: { correct: 'tax_id', options: ensureUniqueOptions('tax_id', ['reg_code', 'lei_id', 'ssn_num']) },
            slot2: { correct: 'legal_entity_name', options: ensureUniqueOptions('legal_entity_name', ['entity_desc', 'corp_name', 'client_title']) },
            slot3: { correct: 'INTERSECT', options: ensureUniqueOptions('INTERSECT', ['EXCEPT', 'UNION ALL', 'CROSS']) },
            slot4: { correct: 'ORDER BY', options: ensureUniqueOptions('ORDER BY', ['SORT BY', 'CLUSTER BY', 'GROUP BY']) }
          };
          template = `SELECT {{slot1}}, {{slot2}} FROM ActiveBrokerageClients\n{{slot3}}\nSELECT tax_id, legal_entity_name FROM SanctionsWatchlist\n{{slot4}} legal_entity_name ASC;`;
          targetQuery = `SELECT tax_id, legal_entity_name FROM ActiveBrokerageClients\nINTERSECT\nSELECT tax_id, legal_entity_name FROM SanctionsWatchlist\nORDER BY legal_entity_name ASC;`;
        }
        break;
      }

      // =========================================================================
      // 4. SET DIFFERENCES & RECONCILIATION BREAKS (EXCEPT)
      // =========================================================================
      case 'except_minus': {
        table = 'InternalTradeLedger';
        schemaSnippet = 'InternalTradeLedger(trade_ref VARCHAR, security_id VARCHAR, notional_amount DECIMAL) | ClearinghouseFeed(trade_ref VARCHAR, security_id VARCHAR, notional_amount DECIMAL)';
        if (difficulty === 'Easy') {
          title = `EXCEPT: Level ${lvlStr}: Custodian Ledger Break Reconciliation`;
          subtitle = `Identify trades recorded in internal ledger but missing from custodian clearing feed.`;
          task = `Use EXCEPT to compute set difference (Internal EXCEPT Clearinghouse).`;
          slots = {
            slot1: { correct: 'trade_ref', options: ensureUniqueOptions('trade_ref', ['trade_id', 'ref_no', 'exec_id']) },
            slot2: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'UNION', 'MINUS ALL']) },
            slot3: { correct: 'FROM', options: ensureUniqueOptions('FROM', ['INTO', 'TABLE', 'SOURCE']) }
          };
          template = `SELECT {{slot1}} FROM InternalTradeLedger\n{{slot2}}\nSELECT trade_ref {{slot3}} ClearinghouseFeed;`;
          targetQuery = `SELECT trade_ref FROM InternalTradeLedger\nEXCEPT\nSELECT trade_ref FROM ClearinghouseFeed;`;
        } else if (difficulty === 'Medium') {
          title = `EXCEPT: Level ${lvlStr}: Inactive Account & Churn Detection`;
          subtitle = `Identify registered accounts that have never executed a billable financial trade.`;
          task = `Compute registered accounts EXCEPT active transacting accounts.`;
          slots = {
            slot1: { correct: 'account_id', options: ensureUniqueOptions('account_id', ['client_ref', 'user_id', 'acct_num']) },
            slot2: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'UNION ALL', 'CROSS']) },
            slot3: { correct: 'WHERE', options: ensureUniqueOptions('WHERE', ['HAVING', 'FILTER', 'WHEN']) },
            slot4: { correct: 'trade_status', options: ensureUniqueOptions('trade_status', ['exec_flag', 'is_settled', 'order_state']) }
          };
          template = `SELECT {{slot1}} FROM RegisteredAccounts {{slot3}} kyc_completed = TRUE\n{{slot2}}\nSELECT account_id FROM TradeExecutions WHERE {{slot4}} = 'SETTLED';`;
          targetQuery = `SELECT account_id FROM RegisteredAccounts WHERE kyc_completed = TRUE\nEXCEPT\nSELECT account_id FROM TradeExecutions WHERE trade_status = 'SETTLED';`;
        } else {
          // Hard
          title = `EXCEPT: Level ${lvlStr}: Multi-Attribute Discrepancy Break Reconciliation`;
          subtitle = `Detect reconciliation breaks where trade reference, security, or notional amount diverge.`;
          task = `Isolate exact multi-column trade records in Front Office OMS that failed to clear identically.`;
          slots = {
            slot1: { correct: 'trade_ref', options: ensureUniqueOptions('trade_ref', ['order_id', 'tx_id', 'ref_code']) },
            slot2: { correct: 'notional_amount', options: ensureUniqueOptions('notional_amount', ['trade_val', 'settled_amt', 'gross_usd']) },
            slot3: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'UNION', 'MINUS ALL']) },
            slot4: { correct: 'ORDER BY', options: ensureUniqueOptions('ORDER BY', ['SORT BY', 'GROUP BY', 'ARRANGE BY']) }
          };
          template = `SELECT {{slot1}}, security_id, {{slot2}} FROM FrontOfficeOMS\n{{slot3}}\nSELECT trade_ref, security_id, notional_amount FROM BackOfficeClearing\n{{slot4}} trade_ref ASC;`;
          targetQuery = `SELECT trade_ref, security_id, notional_amount FROM FrontOfficeOMS\nEXCEPT\nSELECT trade_ref, security_id, notional_amount FROM BackOfficeClearing\nORDER BY trade_ref ASC;`;
        }
        break;
      }

      // =========================================================================
      // 5. HETEROGENEOUS SCHEMA HARMONIZATION & TYPE CASTING
      // =========================================================================
      case 'schema_harmonization': {
        table = 'CoreBankingLedger';
        schemaSnippet = 'CoreBankingLedger(txn_id INT, posting_date DATE, amount NUMERIC, currency VARCHAR, fee_code VARCHAR) | StripeGatewayLedger(charge_id VARCHAR, created_timestamp TIMESTAMP, net_cents INT, curr VARCHAR)';
        if (difficulty === 'Easy') {
          title = `Harmonization: Level ${lvlStr}: Synthetic NULL Padding`;
          subtitle = `Align a 3-column table with a 4-column table by injecting synthetic NULL columns.`;
          task = `Use NULL AS fee_code to harmonize column counts between mismatched payment tables.`;
          slots = {
            slot1: { correct: 'NULL', options: ensureUniqueOptions('NULL', ['0', "''", 'DEFAULT']) },
            slot2: { correct: 'AS', options: ensureUniqueOptions('AS', ['IS', 'TO', 'INTO']) },
            slot3: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'JOIN', 'MERGE']) },
            slot4: { correct: 'fee_code', options: ensureUniqueOptions('fee_code', ['fee_amt', 'tax_rate', 'surcharge']) }
          };
          template = `SELECT txn_id, posting_date, amount, {{slot4}} FROM CoreBankingLedger\n{{slot3}}\nSELECT txn_id, posting_date, amount, {{slot1}} {{slot2}} fee_code FROM LegacyCashLedger;`;
          targetQuery = `SELECT txn_id, posting_date, amount, fee_code FROM CoreBankingLedger\nUNION ALL\nSELECT txn_id, posting_date, amount, NULL AS fee_code FROM LegacyCashLedger;`;
        } else if (difficulty === 'Medium') {
          title = `Harmonization: Level ${lvlStr}: Explicit Datatype Normalization`;
          subtitle = `Harmonize mismatched integer IDs and cent amounts with CAST and division.`;
          task = `Cast integer IDs to VARCHAR and convert Stripe net_cents to DECIMAL dollars before UNION ALL.`;
          slots = {
            slot1: { correct: 'CAST', options: ensureUniqueOptions('CAST', ['CONVERT', 'PARSE', 'FORMAT']) },
            slot2: { correct: 'VARCHAR', options: ensureUniqueOptions('VARCHAR', ['INT', 'BOOL', 'DATE']) },
            slot3: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'APPEND', 'STACK']) },
            slot4: { correct: 'DECIMAL', options: ensureUniqueOptions('DECIMAL', ['VARCHAR', 'INT', 'CHAR']) }
          };
          template = `SELECT {{slot1}}(txn_id AS {{slot2}}) AS payment_ref, amount AS net_usd, 'CORE' AS source FROM CoreBankingLedger\n{{slot3}}\nSELECT charge_id AS payment_ref, CAST(net_cents / 100.0 AS {{slot4}}(18,2)) AS net_usd, 'STRIPE' AS source FROM StripeGatewayLedger;`;
          targetQuery = `SELECT CAST(txn_id AS VARCHAR) AS payment_ref, amount AS net_usd, 'CORE' AS source FROM CoreBankingLedger\nUNION ALL\nSELECT charge_id AS payment_ref, CAST(net_cents / 100.0 AS DECIMAL(18,2)) AS net_usd, 'STRIPE' AS source FROM StripeGatewayLedger;`;
        } else {
          // Hard
          title = `Harmonization: Level ${lvlStr}: Multi-System M&A Consolidation Matrix`;
          subtitle = `Harmonize three disparate acquisition banking schemas into a unified regulatory reporting format.`;
          task = `Consolidate ParentBank, AcquiredFintech, and OffshoreSub with synthetic defaults, casting, and NULL padding.`;
          slots = {
            slot1: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'CONCAT', 'PLUS']) },
            slot2: { correct: 'NULL', options: ensureUniqueOptions('NULL', ['0', "''", 'BLANK']) },
            slot3: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'JOIN ALL', 'ATTACH']) },
            slot4: { correct: 'COALESCE', options: ensureUniqueOptions('COALESCE', ['NULLIF', 'ISNULL', 'NVL2']) }
          };
          template = `SELECT client_id, {{slot4}}(swift_code, 'DOMESTIC') AS bic_code, balance_usd, 'PARENT' AS entity FROM ParentBank\n{{slot1}}\nSELECT fintech_uid AS client_id, {{slot2}} AS bic_code, wallet_balance AS balance_usd, 'FINTECH' AS entity FROM AcquiredFintech\n{{slot3}}\nSELECT sub_account_id AS client_id, branch_swift AS bic_code, local_balance * 1.25 AS balance_usd, 'OFFSHORE' AS entity FROM OffshoreSub;`;
          targetQuery = `SELECT client_id, COALESCE(swift_code, 'DOMESTIC') AS bic_code, balance_usd, 'PARENT' AS entity FROM ParentBank\nUNION ALL\nSELECT fintech_uid AS client_id, NULL AS bic_code, wallet_balance AS balance_usd, 'FINTECH' AS entity FROM AcquiredFintech\nUNION ALL\nSELECT sub_account_id AS client_id, branch_swift AS bic_code, local_balance * 1.25 AS balance_usd, 'OFFSHORE' AS entity FROM OffshoreSub;`;
        }
        break;
      }

      // =========================================================================
      // 6. COMPOUND SET PRECEDENCE & PARENTHESES
      // =========================================================================
      case 'compound_precedence': {
        table = 'GlobalAccountDirectory';
        schemaSnippet = 'GlobalAccountDirectory(account_id VARCHAR, jurisdiction VARCHAR, balance DECIMAL, risk_rating VARCHAR)';
        if (difficulty === 'Easy') {
          title = `Precedence: Level ${lvlStr}: Explicit Compound Parentheses`;
          subtitle = `Combine two approved customer lists and subtract restricted jurisdictions using parentheses.`;
          task = `Enclose (A UNION B) in parentheses before applying EXCEPT C.`;
          slots = {
            slot1: { correct: '(', options: ensureUniqueOptions('(', ['{', '[', 'BEGIN']) },
            slot2: { correct: 'UNION', options: ensureUniqueOptions('UNION', ['JOIN', 'PLUS', 'WITH']) },
            slot3: { correct: ')', options: ensureUniqueOptions(')', ['}', ']', 'END']) },
            slot4: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'UNION', 'MINUS ALL']) }
          };
          template = `{{slot1}}SELECT account_id FROM USBranch\n{{slot2}}\nSELECT account_id FROM UKBranch{{slot3}}\n{{slot4}}\nSELECT account_id FROM RestrictedAccounts;`;
          targetQuery = `(SELECT account_id FROM USBranch\nUNION\nSELECT account_id FROM UKBranch)\nEXCEPT\nSELECT account_id FROM RestrictedAccounts;`;
        } else if (difficulty === 'Medium') {
          title = `Precedence: Level ${lvlStr}: INTERSECT Precedence Binding`;
          subtitle = `Control execution order where INTERSECT naturally binds tighter than UNION.`;
          task = `Use parentheses to enforce (A UNION B) INTERSECT C instead of default A UNION (B INTERSECT C).`;
          slots = {
            slot1: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['CROSS JOIN', 'INTERSECT', 'MINUS']) },
            slot2: { correct: ')', options: ensureUniqueOptions(')', ['}', ']', 'FINISH']) },
            slot3: { correct: 'INTERSECT', options: ensureUniqueOptions('INTERSECT', ['EXCEPT', 'UNION ALL', 'OUTER']) },
            slot4: { correct: 'WHERE', options: ensureUniqueOptions('WHERE', ['HAVING', 'FILTER', 'WHEN']) }
          };
          template = `(SELECT account_id FROM DirectTradingPool\n{{slot1}}\nSELECT account_id FROM InstitutionalPool){{slot2}}\n{{slot3}}\nSELECT account_id FROM KYCAuditPassed {{slot4}} audit_year = 2026;`;
          targetQuery = `(SELECT account_id FROM DirectTradingPool\nUNION ALL\nSELECT account_id FROM InstitutionalPool)\nINTERSECT\nSELECT account_id FROM KYCAuditPassed WHERE audit_year = 2026;`;
        } else {
          // Hard
          title = `Precedence: Level ${lvlStr}: Multi-Tier Regulatory Clearance DAG`;
          subtitle = `Evaluate a 3-way DAG: (HighNetWorth UNION CorpEntities) INTERSECT (ClearedSettlement EXCEPT FlaggedSuspicious).`;
          task = `Construct a multi-branch compound set operation with nested parenthetical precedence.`;
          slots = {
            slot1: { correct: 'UNION', options: ensureUniqueOptions('UNION', ['CROSS', 'MERGE', 'JOIN']) },
            slot2: { correct: 'INTERSECT', options: ensureUniqueOptions('INTERSECT', ['UNION', 'PLUS', 'EXCEPT ALL']) },
            slot3: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'UNION ALL', 'CROSS']) },
            slot4: { correct: 'ORDER BY', options: ensureUniqueOptions('ORDER BY', ['SORT BY', 'GROUP BY', 'ARRANGE BY']) }
          };
          template = `(SELECT tax_id FROM HighNetWorthClients {{slot1}} SELECT tax_id FROM CorporateEntities)\n{{slot2}}\n(SELECT tax_id FROM ClearedSettlementClients {{slot3}} SELECT tax_id FROM FlaggedSuspiciousList)\n{{slot4}} tax_id ASC;`;
          targetQuery = `(SELECT tax_id FROM HighNetWorthClients UNION SELECT tax_id FROM CorporateEntities)\nINTERSECT\n(SELECT tax_id FROM ClearedSettlementClients EXCEPT SELECT tax_id FROM FlaggedSuspiciousList)\nORDER BY tax_id ASC;`;
        }
        break;
      }

      // =========================================================================
      // 7. SYMMETRIC DIFFERENCES & ETL RECONCILIATION
      // =========================================================================
      case 'symmetric_delta_audit': {
        table = 'ProductionLedger';
        schemaSnippet = 'ProductionLedger(entry_id VARCHAR, account_no VARCHAR, debit DECIMAL, credit DECIMAL) | WarehouseLedger(entry_id VARCHAR, account_no VARCHAR, debit DECIMAL, credit DECIMAL)';
        if (difficulty === 'Easy') {
          title = `Delta Audit: Level ${lvlStr}: Bi-Directional Discrepancy Tagging`;
          subtitle = `Isolate discrepancies between Production OLTP and Cloud Warehouse replicas.`;
          task = `Combine (Source EXCEPT Target) and (Target EXCEPT Source) with descriptive discrepancy tags.`;
          slots = {
            slot1: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['UNION', 'INTERSECT', 'JOIN']) },
            slot2: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'MERGE', 'CROSS']) },
            slot3: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'MINUS ALL', 'OUTER']) },
            slot4: { correct: 'entry_id', options: ensureUniqueOptions('entry_id', ['tx_id', 'ref_no', 'seq_id']) }
          };
          template = `SELECT {{slot4}}, 'MISSING_IN_WAREHOUSE' AS issue_type FROM ProductionLedger\n{{slot1}}\nSELECT entry_id, 'MISSING_IN_WAREHOUSE' AS issue_type FROM WarehouseLedger\n{{slot2}}\nSELECT entry_id, 'ORPHANED_IN_WAREHOUSE' AS issue_type FROM WarehouseLedger\n{{slot3}}\nSELECT entry_id, 'ORPHANED_IN_WAREHOUSE' AS issue_type FROM ProductionLedger;`;
          targetQuery = `SELECT entry_id, 'MISSING_IN_WAREHOUSE' AS issue_type FROM ProductionLedger\nEXCEPT\nSELECT entry_id, 'MISSING_IN_WAREHOUSE' AS issue_type FROM WarehouseLedger\nUNION ALL\nSELECT entry_id, 'ORPHANED_IN_WAREHOUSE' AS issue_type FROM WarehouseLedger\nEXCEPT\nSELECT entry_id, 'ORPHANED_IN_WAREHOUSE' AS issue_type FROM ProductionLedger;`;
        } else if (difficulty === 'Medium') {
          title = `Delta Audit: Level ${lvlStr}: Cloud Migration Cutover Delta Verification`;
          subtitle = `Verify 100% data fidelity between on-premise Oracle and target Snowflake instance.`;
          task = `Tag and union symmetric difference of multi-column records across migration cutover tables.`;
          slots = {
            slot1: { correct: 'account_no', options: ensureUniqueOptions('account_no', ['client_id', 'acct_id', 'user_ref']) },
            slot2: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'UNION', 'CROSS']) },
            slot3: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'MERGE', 'PLUS']) },
            slot4: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'MINUS ALL', 'SUBTRACT']) }
          };
          template = `SELECT entry_id, {{slot1}}, debit, credit, 'SRC_ONLY' AS delta_flag FROM OnPremLedger\n{{slot2}}\nSELECT entry_id, account_no, debit, credit, 'SRC_ONLY' AS delta_flag FROM TargetCloudLedger\n{{slot3}}\nSELECT entry_id, account_no, debit, credit, 'TGT_ONLY' AS delta_flag FROM TargetCloudLedger\n{{slot4}}\nSELECT entry_id, account_no, debit, credit, 'TGT_ONLY' AS delta_flag FROM OnPremLedger;`;
          targetQuery = `SELECT entry_id, account_no, debit, credit, 'SRC_ONLY' AS delta_flag FROM OnPremLedger\nEXCEPT\nSELECT entry_id, account_no, debit, credit, 'SRC_ONLY' AS delta_flag FROM TargetCloudLedger\nUNION ALL\nSELECT entry_id, account_no, debit, credit, 'TGT_ONLY' AS delta_flag FROM TargetCloudLedger\nEXCEPT\nSELECT entry_id, account_no, debit, credit, 'TGT_ONLY' AS delta_flag FROM OnPremLedger;`;
        } else {
          // Hard
          title = `Delta Audit: Level ${lvlStr}: Automated Checksum Hash & Row Drift Recon`;
          subtitle = `Compute symmetric hash differences between hot transaction core and lakehouse audit tables.`;
          task = `Combine symmetric differences and order the audit trail by entry identifier.`;
          slots = {
            slot1: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'UNION', 'CROSS JOIN']) },
            slot2: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'CONCAT', 'PLUS']) },
            slot3: { correct: 'EXCEPT', options: ensureUniqueOptions('EXCEPT', ['INTERSECT', 'MINUS ALL', 'OUTER']) },
            slot4: { correct: 'ORDER BY', options: ensureUniqueOptions('ORDER BY', ['SORT BY', 'GROUP BY', 'ARRANGE BY']) },
            slot5: { correct: 'entry_id', options: ensureUniqueOptions('entry_id', ['tx_code', 'record_id', 'seq_num']) }
          };
          template = `SELECT {{slot5}}, debit, credit, 'CORE_UNREPLICATED' AS audit_status FROM CoreTransactionDB\n{{slot1}}\nSELECT entry_id, debit, credit, 'CORE_UNREPLICATED' AS audit_status FROM LakehouseAuditDB\n{{slot2}}\nSELECT entry_id, debit, credit, 'LAKEHOUSE_GHOST' AS audit_status FROM LakehouseAuditDB\n{{slot3}}\nSELECT entry_id, debit, credit, 'LAKEHOUSE_GHOST' AS audit_status FROM CoreTransactionDB\n{{slot4}} entry_id ASC;`;
          targetQuery = `SELECT entry_id, debit, credit, 'CORE_UNREPLICATED' AS audit_status FROM CoreTransactionDB\nEXCEPT\nSELECT entry_id, debit, credit, 'CORE_UNREPLICATED' AS audit_status FROM LakehouseAuditDB\nUNION ALL\nSELECT entry_id, debit, credit, 'LAKEHOUSE_GHOST' AS audit_status FROM LakehouseAuditDB\nEXCEPT\nSELECT entry_id, debit, credit, 'LAKEHOUSE_GHOST' AS audit_status FROM CoreTransactionDB\nORDER BY entry_id ASC;`;
        }
        break;
      }
    }

    // Generate template tokens
    const templateTokens = [];
    const parts = template.split(/(\{\{slot\d+\}\})/g);
    for (const part of parts) {
      if (!part) continue;
      const slotMatch = part.match(/\{\{(slot\d+)\}\}/);
      if (slotMatch) {
        const sKey = slotMatch[1];
        templateTokens.push({
          text: '',
          isBlank: true,
          slotId: sKey,
          placeholder: `[ ${sKey.toUpperCase()} ]`
        });
      } else {
        templateTokens.push({
          text: part,
          isBlank: false
        });
      }
    }

    let tier = 'Apprentice';
    let tierColor = '#38bdf8';
    let xp = 30;
    if (difficulty === 'Medium') {
      tier = 'Practitioner';
      tierColor = '#10b981';
      xp = 50;
    } else if (difficulty === 'Hard') {
      tier = lvl <= 50 ? 'Specialist' : 'Master (FAANG-Ready)';
      tierColor = lvl <= 50 ? '#f59e0b' : '#ec4899';
      xp = 80;
    }

    quests.push({
      id: questId,
      discipline: disciplineMeta.name,
      disciplineKey: discKey,
      disciplineLevel: lvl,
      difficulty,
      levelDisplay,
      title,
      subtitle,
      type: 'fill_blank',
      category: `Section 09: Set Operations (${disciplineMeta.name})`,
      subcluster: `${disciplineMeta.name} (${difficulty})`,
      tier,
      tierColor,
      task,
      xp,
      table,
      scenario: subtitle,
      businessObjective: task,
      schemaSnippet,
      targetQuery,
      template: templateTokens,
      slots,
      hint: `Remember: ${disciplineMeta.concept}. Be mindful of: ${disciplineMeta.traps.split('!')[0]}!`,
      explanation: `In this scenario, ${task} ${disciplineMeta.concept} ensures data integrity without silent failures.`
    });
  }

  return quests;
}

// Build complete Section 09 dataset
let allQuests = [];
let currentId = 801;

SET_DISCIPLINES.forEach(discipline => {
  const dQuests = generateDisciplineQuests(discipline, currentId);
  allQuests = allQuests.concat(dQuests);
  currentId += 60;
});

const outputJs = `// =============================================================================
// SECTION 09: SET OPERATIONS & SCHEMA HARMONIZATION ARENA (420 INTERACTIVE QUESTS)
// 7 Disciplines x 60 Levels (20 Easy / 20 Medium / 20 Hard)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

if (typeof window === 'undefined') {
  global.window = {};
}

window.SET_DISCIPLINES_METADATA = ${JSON.stringify(SET_DISCIPLINES, null, 2)};

window.QUESTS_SECTION_9 = ${JSON.stringify(allQuests, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SET_DISCIPLINES_METADATA: window.SET_DISCIPLINES_METADATA,
    QUESTS_SECTION_9: window.QUESTS_SECTION_9
  };
}
`;

fs.writeFileSync('visualizer/quests_section9_data.js', outputJs, 'utf8');
console.log(`Generated ${allQuests.length} Section 09 quests across ${SET_DISCIPLINES.length} disciplines!`);
