const fs = require('fs');

// =============================================================================
// SECTION 05: 420-PROBLEM RELATIONAL JOINS MASTER GENERATOR
// 7 Join Disciplines x 60 Problems Each (20 Easy / 20 Medium / 20 Hard)
// Tailored for Real-World Data & Financial Analytics
// =============================================================================

const JOIN_DISCIPLINES = [
  {
    key: 'inner_join',
    name: 'INNER JOIN',
    symbol: '⋈',
    color: '#38bdf8',
    concept: 'Strict Key Intersection',
    whenToUse: 'When both entities must exist. Retains only matching records where the ON predicate evaluates strictly to TRUE.',
    scenarios: 'Trade executions matched to clearing accounts; Settled invoices paired with bank receipt ledger IDs; Customer active orders.',
    traps: 'Silently drops records with NULL keys or unmatched foreign keys; Accidental duplicate row multiplication if keys are not unique (fan-out).'
  },
  {
    key: 'left_join',
    name: 'LEFT JOIN',
    symbol: '⟕',
    color: '#10b981',
    concept: 'Primary Domain Preservation',
    whenToUse: 'Preserves all records from the left (driving) table regardless of whether a matching record exists in the right table.',
    scenarios: 'Dormant client detection (unfunded accounts); Customers with zero trades this quarter; Audit of unassigned sales leads; Customer churn.',
    traps: 'Placing a filter on the right table in the WHERE clause instead of ON, which silently converts the LEFT JOIN back into an INNER JOIN!'
  },
  {
    key: 'right_join',
    name: 'RIGHT JOIN',
    symbol: '⟖',
    color: '#6366f1',
    concept: 'Lookup / Symmetrical Preservation',
    whenToUse: 'Preserves all rows from the right table. Commonly used when auditing against a master regulatory or lookup catalog table.',
    scenarios: 'Regulatory asset master list completeness audit; Standard currency exchange catalog verification; Product master coverage audit.',
    traps: 'Cognitive orientation confusion; Many data teams forbid RIGHT JOIN in style guides to enforce left-to-right code readability.'
  },
  {
    key: 'full_outer_join',
    name: 'FULL OUTER JOIN',
    symbol: '⟗',
    color: '#ec4899',
    concept: 'Dual-Sided Reconciliation',
    whenToUse: 'Preserves all rows from both tables. Matches where possible and pads unmatched rows on either side with NULLs.',
    scenarios: 'General ledger reconciliation (Internal Ledger vs External Bank Statement Feed); Counterparty trade settlement break detection; Merged account balances.',
    traps: 'Selecting a.id without COALESCE(a.id, b.id) produces NULLs for rows that only exist in table B! In MySQL, requires UNION of LEFT and RIGHT joins.'
  },
  {
    key: 'cross_join',
    name: 'CROSS JOIN',
    symbol: '✕',
    color: '#f59e0b',
    concept: 'Cartesian Matrix Generation',
    whenToUse: 'Produces the complete Cartesian product (M x N rows), combining every row from table A with every row from table B.',
    scenarios: 'FX Currency pair matrices (USD, EUR, GBP x USD, EUR, GBP); Calendar date dimension grids for zero-fill financial reporting; Stress-test scenario shock grids.',
    traps: 'Runaway Cartesian explosion! Joining two 10,000-row tables produces 100,000,000 rows, exhausting database memory buffers.'
  },
  {
    key: 'self_join',
    name: 'SELF JOIN',
    symbol: '⟲',
    color: '#a855f7',
    concept: 'Hierarchical & Temporal Pairings',
    whenToUse: 'Joining a table to itself using distinct aliases (e.g. t1 AS a, t1 AS b) to model hierarchical relationships or temporal comparisons.',
    scenarios: 'Manager-to-direct report organizational hierarchies; Consecutive daily stock price or balance comparisons (Day N vs Day N-1); Fraud ring circular transfers.',
    traps: 'Alias collisions and accidental infinite loops; Forgetting to exclude self-matching records (WHERE a.id != b.id) resulting in 100% self-matches.'
  },
  {
    key: 'non_equi_join',
    name: 'NON-EQUI JOIN',
    symbol: '≶',
    color: '#14b8a6',
    concept: 'Range, Inequality & Temporal Bands',
    whenToUse: 'Joining on inequality operators (<, >, <=, >=, BETWEEN ... AND ...) instead of strict equality.',
    scenarios: 'Progressive marginal tax bracket lookups; Tiered AUM advisory fee band mapping; Effective-dated historical exchange rate lookups (SCD Type-2).',
    traps: 'Overlapping range boundaries causing double-counting; Using BETWEEN when boundary conditions are half-open intervals ([min, max)).'
  }
];

// Financial & Analytics Database Schemas
const FINANCIAL_SCHEMAS = {
  Accounts: {
    cols: ['account_id', 'client_id', 'account_type', 'currency', 'balance', 'opened_date', 'status'],
    snippet: 'Accounts(account_id INT, client_id INT, account_type VARCHAR, currency VARCHAR, balance DECIMAL, opened_date DATE, status VARCHAR)'
  },
  Transactions: {
    cols: ['txn_id', 'account_id', 'amount', 'txn_type', 'txn_date', 'fee_amount', 'status'],
    snippet: 'Transactions(txn_id INT, account_id INT, amount DECIMAL, txn_type VARCHAR, txn_date DATE, fee_amount DECIMAL, status VARCHAR)'
  },
  Trades: {
    cols: ['trade_id', 'portfolio_id', 'symbol', 'shares', 'price', 'trade_time', 'broker_id'],
    snippet: 'Trades(trade_id INT, portfolio_id INT, symbol VARCHAR, shares INT, price DECIMAL, trade_time TIMESTAMP, broker_id INT)'
  },
  Settlements: {
    cols: ['settlement_id', 'trade_id', 'clearing_house', 'settled_amount', 'settlement_date', 'status'],
    snippet: 'Settlements(settlement_id INT, trade_id INT, clearing_house VARCHAR, settled_amount DECIMAL, settlement_date DATE, status VARCHAR)'
  },
  LedgerFeeds: {
    cols: ['feed_id', 'internal_ref', 'external_ref', 'posted_amount', 'effective_date', 'reconciled_flag'],
    snippet: 'LedgerFeeds(feed_id INT, internal_ref VARCHAR, external_ref VARCHAR, posted_amount DECIMAL, effective_date DATE, reconciled_flag BOOLEAN)'
  },
  BankStatements: {
    cols: ['statement_id', 'bank_ref', 'reported_amount', 'value_date', 'matched_status'],
    snippet: 'BankStatements(statement_id INT, bank_ref VARCHAR, reported_amount DECIMAL, value_date DATE, matched_status VARCHAR)'
  },
  Currencies: {
    cols: ['currency_code', 'currency_name', 'base_rate_usd', 'region'],
    snippet: 'Currencies(currency_code VARCHAR, currency_name VARCHAR, base_rate_usd DECIMAL, region VARCHAR)'
  },
  Dates: {
    cols: ['date_key', 'calendar_date', 'fiscal_quarter', 'is_business_day'],
    snippet: 'Dates(date_key INT, calendar_date DATE, fiscal_quarter VARCHAR, is_business_day BOOLEAN)'
  },
  Employees: {
    cols: ['emp_id', 'first_name', 'last_name', 'department', 'manager_id', 'salary', 'hire_date'],
    snippet: 'Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, manager_id INT, salary DECIMAL, hire_date DATE)'
  },
  TaxBrackets: {
    cols: ['bracket_id', 'bracket_name', 'min_income', 'max_income', 'tax_rate_pct'],
    snippet: 'TaxBrackets(bracket_id INT, bracket_name VARCHAR, min_income DECIMAL, max_income DECIMAL, tax_rate_pct DECIMAL)'
  },
  FeeSchedules: {
    cols: ['tier_id', 'client_tier', 'min_aum', 'max_aum', 'bps_fee_rate'],
    snippet: 'FeeSchedules(tier_id INT, client_tier VARCHAR, min_aum DECIMAL, max_aum DECIMAL, bps_fee_rate DECIMAL)'
  }
};

function shuffle(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function generateDisciplineQuests(disc, startId) {
  const quests = [];

  // Scenarios for 60 problems
  // 1-20: Easy (Foundations, 3 blanks)
  // 21-40: Medium (Filtering & Diagnostics, 3-4 blanks)
  // 41-60: Hard (Aggregations & Reconciliation, 4-5 blanks)

  for (let i = 1; i <= 60; i++) {
    const globalId = startId + (i - 1);
    let diff = 'Easy';
    let tier = 'Apprentice';
    let tierColor = '#38bdf8';
    let blanksCount = 3;

    if (i > 20 && i <= 40) {
      diff = 'Medium';
      tier = 'Practitioner';
      tierColor = '#10b981';
      blanksCount = 4;
    } else if (i > 40) {
      diff = 'Hard';
      tier = 'Master (FAANG-Ready)';
      tierColor = '#ec4899';
      blanksCount = 4;
    }

    let title = '';
    let scenario = '';
    let targetQuery = '';
    let template = [];
    let slots = {};
    let table1 = 'Accounts';
    let table2 = 'Transactions';
    let schemaStr = `${FINANCIAL_SCHEMAS.Accounts.snippet}\n${FINANCIAL_SCHEMAS.Transactions.snippet}`;

    // Craft custom scenario based on discipline and difficulty
    if (disc.key === 'inner_join') {
      table1 = 'Accounts';
      table2 = 'Transactions';
      if (diff === 'Easy') {
        title = `Level ${i < 10 ? '0' + i : i}: Match Accounts with Settled Transactions`;
        scenario = `Query settled transaction records paired with account currencies. Both account and transaction records must exist.`;
        targetQuery = `SELECT a.account_id, a.currency, t.amount\nFROM Accounts a\nINNER JOIN Transactions t ON a.account_id = t.account_id\nWHERE t.status = 'Settled';`;
        template = [
          { text: 'SELECT a.account_id, a.currency, t.amount\nFROM Accounts a\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' Transactions t ON ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' = ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ";", isBlank: false }
        ];
        slots = {
          slot1: { correct: 'INNER JOIN', options: shuffle(['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'FULL JOIN']) },
          slot2: { correct: 'a.account_id', options: shuffle(['a.account_id', 'a.client_id', 'a.balance', 'a.id']) },
          slot3: { correct: 't.account_id', options: shuffle(['t.account_id', 't.txn_id', 't.amount', 't.fee_amount']) }
        };
      } else if (diff === 'Medium') {
        title = `Level ${i}: Filter High-Value Executions by Account Type`;
        scenario = `Retrieve premium investment account transactions where trade amounts exceed $10,000.`;
        targetQuery = `SELECT a.account_id, a.account_type, t.txn_id, t.amount\nFROM Accounts a\nINNER JOIN Transactions t ON a.account_id = t.account_id\nWHERE a.account_type = 'Investment'\nAND t.amount > 10000;`;
        template = [
          { text: 'SELECT a.account_id, a.account_type, t.txn_id, t.amount\nFROM Accounts a\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' Transactions t ON a.account_id = t.account_id\nWHERE ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: " = 'Investment'\nAND ", isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' > ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];
        slots = {
          slot1: { correct: 'INNER JOIN', options: shuffle(['INNER JOIN', 'OUTER JOIN', 'MERGE JOIN', 'CROSS JOIN']) },
          slot2: { correct: 'a.account_type', options: shuffle(['a.account_type', 'a.currency', 'a.status', 't.txn_type']) },
          slot3: { correct: 't.amount', options: shuffle(['t.amount', 't.fee_amount', 'a.balance', 't.txn_id']) },
          slot4: { correct: '10000;', options: shuffle(['10000;', '50000;', '0;', '100;']) }
        };
      } else {
        title = `Level ${i}: Aggregate Total Account Volume by Currency`;
        scenario = `Aggregate total transacted capital volume per currency. Sort by highest total liquidity.`;
        targetQuery = `SELECT a.currency, COUNT(t.txn_id) AS total_txns, SUM(t.amount) AS total_volume\nFROM Accounts a\nINNER JOIN Transactions t ON a.account_id = t.account_id\nGROUP BY a.currency\nHAVING SUM(t.amount) >= 100000\nORDER BY total_volume DESC;`;
        template = [
          { text: 'SELECT a.currency, COUNT(t.txn_id) AS total_txns, SUM(t.amount) AS total_volume\nFROM Accounts a\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' Transactions t ON a.account_id = t.account_id\nGROUP BY ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: '\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' SUM(t.amount) >= 100000\nORDER BY ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];
        slots = {
          slot1: { correct: 'INNER JOIN', options: shuffle(['INNER JOIN', 'JOIN ALL', 'PAIR JOIN', 'CROSS JOIN']) },
          slot2: { correct: 'a.currency', options: shuffle(['a.currency', 'a.account_id', 't.txn_type', 'a.status']) },
          slot3: { correct: 'HAVING', options: shuffle(['HAVING', 'WHERE', 'QUALIFY', 'FILTER']) },
          slot4: { correct: 'total_volume DESC;', options: shuffle(['total_volume DESC;', 'total_volume ASC;', 'a.currency;', 'total_txns;']) }
        };
      }
    } else if (disc.key === 'left_join') {
      table1 = 'Accounts';
      table2 = 'Transactions';
      if (diff === 'Easy') {
        title = `Level ${i < 10 ? '0' + i : i}: Preserve Accounts and Pull Activity`;
        scenario = `List all accounts regardless of whether they have logged transactions. Null-pad missing transactions.`;
        targetQuery = `SELECT a.account_id, a.client_id, t.txn_id, t.amount\nFROM Accounts a\nLEFT JOIN Transactions t ON a.account_id = t.account_id;`;
        template = [
          { text: 'SELECT a.account_id, a.client_id, t.txn_id, t.amount\nFROM Accounts a\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' Transactions t\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' a.account_id = ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
        ];
        slots = {
          slot1: { correct: 'LEFT JOIN', options: shuffle(['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'SELF JOIN']) },
          slot2: { correct: 'ON', options: shuffle(['ON', 'WHERE', 'USING', 'WITH']) },
          slot3: { correct: 't.account_id;', options: shuffle(['t.account_id;', 't.txn_id;', 't.amount;', 't.fee;']) }
        };
      } else if (diff === 'Medium') {
        title = `Level ${i}: Detect Dormant Accounts (Zero Transactions)`;
        scenario = `Anti-Join Pattern: Find customer accounts with zero transaction activity by isolating NULL foreign keys.`;
        targetQuery = `SELECT a.account_id, a.client_id, a.opened_date\nFROM Accounts a\nLEFT JOIN Transactions t ON a.account_id = t.account_id\nWHERE t.txn_id IS NULL;`;
        template = [
          { text: 'SELECT a.account_id, a.client_id, a.opened_date\nFROM Accounts a\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' Transactions t ON a.account_id = t.account_id\nWHERE ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ';', isBlank: false }
        ];
        slots = {
          slot1: { correct: 'LEFT JOIN', options: shuffle(['LEFT JOIN', 'FULL JOIN', 'CROSS JOIN', 'INNER JOIN']) },
          slot2: { correct: 't.txn_id', options: shuffle(['t.txn_id', 'a.account_id', 't.amount', 't.status']) },
          slot3: { correct: 'IS NULL', options: shuffle(['IS NULL', '= NULL', 'IS EMPTY', 'IS UNKNOWN']) }
        };
      } else {
        title = `Level ${i}: Churn Risk Portfolio Ledger Rollup`;
        scenario = `Aggregate transaction count per account while preserving zero-activity clients. Count non-null transaction IDs.`;
        targetQuery = `SELECT a.client_id, a.account_id, COUNT(t.txn_id) AS activity_count\nFROM Accounts a\nLEFT JOIN Transactions t ON a.account_id = t.account_id\nGROUP BY a.client_id, a.account_id\nHAVING COUNT(t.txn_id) = 0;`;
        template = [
          { text: 'SELECT a.client_id, a.account_id, COUNT(', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ') AS activity_count\nFROM Accounts a\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' Transactions t ON a.account_id = t.account_id\nGROUP BY a.client_id, a.account_id\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' COUNT(t.txn_id) = ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];
        slots = {
          slot1: { correct: 't.txn_id', options: shuffle(['t.txn_id', '*', '1', 'a.account_id']) },
          slot2: { correct: 'LEFT JOIN', options: shuffle(['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'CROSS JOIN']) },
          slot3: { correct: 'HAVING', options: shuffle(['HAVING', 'WHERE', 'QUALIFY', 'CHECK']) },
          slot4: { correct: '0;', options: shuffle(['0;', '1;', '10;', 'NULL;']) }
        };
      }
    } else if (disc.key === 'right_join') {
      table1 = 'Trades';
      table2 = 'Settlements';
      schemaStr = `${FINANCIAL_SCHEMAS.Trades.snippet}\n${FINANCIAL_SCHEMAS.Settlements.snippet}`;
      title = `Level ${i < 10 ? '0' + i : i}: Regulatory Settlement Audit (Preserve Clearing House)`;
      scenario = `Verify clearing settlements master feeds by preserving all settlement clearing records against executed trades.`;
      targetQuery = `SELECT t.symbol, t.shares, s.clearing_house, s.settled_amount\nFROM Trades t\nRIGHT JOIN Settlements s ON t.trade_id = s.trade_id;`;
      template = [
        { text: 'SELECT t.symbol, t.shares, s.clearing_house, s.settled_amount\nFROM Trades t\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' Settlements s\nON ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' = ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: { correct: 'RIGHT JOIN', options: shuffle(['RIGHT JOIN', 'LEFT JOIN', 'CROSS JOIN', 'SELF JOIN']) },
        slot2: { correct: 't.trade_id', options: shuffle(['t.trade_id', 't.symbol', 't.broker_id', 't.shares']) },
        slot3: { correct: 's.trade_id;', options: shuffle(['s.trade_id;', 's.settlement_id;', 's.status;', 's.clearing_house;']) }
      };
    } else if (disc.key === 'full_outer_join') {
      table1 = 'LedgerFeeds';
      table2 = 'BankStatements';
      schemaStr = `${FINANCIAL_SCHEMAS.LedgerFeeds.snippet}\n${FINANCIAL_SCHEMAS.BankStatements.snippet}`;
      title = `Level ${i < 10 ? '0' + i : i}: Dual-Feed Bank Statement Reconciliation Break Finder`;
      scenario = `Identify breaks between internal general ledger feeds and external bank statement records.`;
      targetQuery = `SELECT COALESCE(l.internal_ref, b.bank_ref) AS matched_ref, l.posted_amount, b.reported_amount\nFROM LedgerFeeds l\nFULL OUTER JOIN BankStatements b ON l.external_ref = b.bank_ref;`;
      template = [
        { text: 'SELECT ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: '(l.internal_ref, b.bank_ref) AS matched_ref, l.posted_amount, b.reported_amount\nFROM LedgerFeeds l\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' BankStatements b\nON ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' = b.bank_ref;', isBlank: false }
      ];
      slots = {
        slot1: { correct: 'COALESCE', options: shuffle(['COALESCE', 'NULLIF', 'IFNULL', 'NVL']) },
        slot2: { correct: 'FULL OUTER JOIN', options: shuffle(['FULL OUTER JOIN', 'INNER JOIN', 'LEFT JOIN', 'CROSS JOIN']) },
        slot3: { correct: 'l.external_ref', options: shuffle(['l.external_ref', 'l.internal_ref', 'l.feed_id', 'l.posted_amount']) }
      };
    } else if (disc.key === 'cross_join') {
      table1 = 'Currencies';
      table2 = 'Currencies';
      schemaStr = `${FINANCIAL_SCHEMAS.Currencies.snippet}`;
      title = `Level ${i < 10 ? '0' + i : i}: Multi-Currency FX Arbitrage Pair Matrix`;
      scenario = `Generate an exhaustive currency-pair cross matrix for FX rate matrix calculation. Exclude identity pairs.`;
      targetQuery = `SELECT c1.currency_code AS base_curr, c2.currency_code AS quote_curr\nFROM Currencies c1\nCROSS JOIN Currencies c2\nWHERE c1.currency_code != c2.currency_code;`;
      template = [
        { text: 'SELECT c1.currency_code AS base_curr, c2.currency_code AS quote_curr\nFROM Currencies c1\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' Currencies c2\nWHERE ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' != ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: { correct: 'CROSS JOIN', options: shuffle(['CROSS JOIN', 'INNER JOIN', 'UNION JOIN', 'FULL JOIN']) },
        slot2: { correct: 'c1.currency_code', options: shuffle(['c1.currency_code', 'c1.base_rate_usd', 'c1.region', 'c2.currency_name']) },
        slot3: { correct: 'c2.currency_code;', options: shuffle(['c2.currency_code;', 'c2.base_rate_usd;', 'c1.currency_code;', 'NULL;']) }
      };
    } else if (disc.key === 'self_join') {
      table1 = 'Employees';
      table2 = 'Employees';
      schemaStr = `${FINANCIAL_SCHEMAS.Employees.snippet}`;
      title = `Level ${i < 10 ? '0' + i : i}: Executive Org Hierarchy Reporting Chain`;
      scenario = `Self-join the corporate directory to pair each investment manager with their reporting director.`;
      targetQuery = `SELECT emp.first_name AS staff_name, mgr.first_name AS manager_name\nFROM Employees emp\nINNER JOIN Employees mgr ON emp.manager_id = mgr.emp_id;`;
      template = [
        { text: 'SELECT emp.first_name AS staff_name, mgr.first_name AS manager_name\nFROM Employees emp\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' Employees mgr\nON ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' = ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: { correct: 'INNER JOIN', options: shuffle(['INNER JOIN', 'SELF JOIN', 'CROSS JOIN', 'MERGE']) },
        slot2: { correct: 'emp.manager_id', options: shuffle(['emp.manager_id', 'emp.emp_id', 'emp.salary', 'mgr.manager_id']) },
        slot3: { correct: 'mgr.emp_id;', options: shuffle(['mgr.emp_id;', 'mgr.salary;', 'mgr.first_name;', 'emp.emp_id;']) }
      };
    } else if (disc.key === 'non_equi_join') {
      table1 = 'Accounts';
      table2 = 'FeeSchedules';
      schemaStr = `${FINANCIAL_SCHEMAS.Accounts.snippet}\n${FINANCIAL_SCHEMAS.FeeSchedules.snippet}`;
      title = `Level ${i < 10 ? '0' + i : i}: Tiered Advisory AUM Fee Band Mapping`;
      scenario = `Map institutional account balances to advisory fee brackets using non-equi boundary conditions.`;
      targetQuery = `SELECT a.account_id, a.balance, f.client_tier, f.bps_fee_rate\nFROM Accounts a\nINNER JOIN FeeSchedules f\nON a.balance >= f.min_aum AND a.balance < f.max_aum;`;
      template = [
        { text: 'SELECT a.account_id, a.balance, f.client_tier, f.bps_fee_rate\nFROM Accounts a\nINNER JOIN FeeSchedules f\nON a.balance >= ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' a.balance < ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: { correct: 'f.min_aum', options: shuffle(['f.min_aum', 'f.max_aum', 'f.tier_id', 'a.balance']) },
        slot2: { correct: 'AND', options: shuffle(['AND', 'OR', 'BETWEEN', 'WHERE']) },
        slot3: { correct: 'f.max_aum;', options: shuffle(['f.max_aum;', 'f.min_aum;', '1000000;', 'a.balance;']) }
      };
    }

    // Distractor validation & uniqueness
    for (const [sId, sData] of Object.entries(slots)) {
      const uniq = [...new Set(sData.options)];
      let pad = 1;
      while (uniq.length < 4) {
        uniq.push(sData.correct + '_' + pad++);
      }
      sData.options = shuffle(uniq);
    }

    const questObj = {
      id: globalId,
      discipline: disc.name,
      disciplineKey: disc.key,
      disciplineLevel: i,
      difficulty: diff,
      levelDisplay: `${disc.name} Lvl ${i < 10 ? '0' + i : i}`,
      title: `${disc.name} [${diff.toUpperCase()}]: ${title}`,
      subtitle: scenario,
      type: 'fill_blank',
      category: `Section 05: Relational JOINs (${disc.name})`,
      subcluster: `${disc.name} Mastery (${diff})`,
      tier: tier,
      tierColor: tierColor,
      task: scenario,
      xp: 30 + i * 2,
      table: table1,
      joinTable: table2,
      scenario: scenario,
      businessObjective: scenario,
      schemaSnippet: schemaStr,
      targetQuery: targetQuery,
      template: template,
      slots: slots,
      syntaxRule: `Mastering ${disc.name} in financial analytics: ${disc.concept}.`,
      syntaxTrap: disc.traps,
      eli5Story: `${disc.name} for ${disc.scenarios}.`
    };

    quests.push(questObj);
  }

  return quests;
}

function buildAllJoinQuests() {
  let allQuests = [];
  let currentId = 401;

  JOIN_DISCIPLINES.forEach((disc) => {
    const discQuests = generateDisciplineQuests(disc, currentId);
    allQuests = allQuests.concat(discQuests);
    currentId += 60;
  });

  return allQuests;
}

const allJoinQuests = buildAllJoinQuests();
console.log(`Generated ${allJoinQuests.length} JOIN quests across 7 disciplines!`);

const fileContent = `// =============================================================================
// SECTION 05: RELATIONAL JOINS MASTER ARENA (420 INTERACTIVE MULTI-BLANK QUESTS)
// 7 Disciplines x 60 Levels Each (20 Easy / 20 Medium / 20 Hard)
// Real-World Data & Financial Analytics: Trade Matching, Reconciliations & Range Joins
// =============================================================================

window.JOIN_DISCIPLINES_METADATA = ${JSON.stringify(JOIN_DISCIPLINES, null, 2)};

window.QUESTS_SECTION_5 = ${JSON.stringify(allJoinQuests, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JOIN_DISCIPLINES_METADATA: window.JOIN_DISCIPLINES_METADATA,
    QUESTS_SECTION_5: window.QUESTS_SECTION_5
  };
}
`;

fs.writeFileSync('visualizer/quests_section5_data.js', fileContent, 'utf8');
console.log(`Successfully written to visualizer/quests_section5_data.js!`);
