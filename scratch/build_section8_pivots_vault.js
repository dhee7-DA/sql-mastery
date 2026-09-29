// =============================================================================
// SECTION 08 BUILDER: CONDITIONAL LOGIC & DATA PIVOTING MASTER ARENA (420 PROBLEMS)
// 7 Disciplines x 60 Levels (20 Easy / 20 Medium / 20 Hard)
// Verified 3-5 Blanks, Zero Duplicate Options, Real-World Data & Financial Scenarios
// =============================================================================

const fs = require('fs');

const PIVOT_DISCIPLINES = [
  {
    key: 'searched_case',
    name: 'SEARCHED & SIMPLE CASE EXPRESSIONS',
    symbol: '🔀',
    color: '#38bdf8',
    concept: 'Sequential Rule Evaluation (First-Match Wins)',
    whenToUse: 'When assigning categorical labels, credit score tiers, or tax bands based on Boolean conditional expressions.',
    scenarios: 'Wealth tier segmentation (Ultra High Net Worth vs Mass Market); Credit default risk bands (AAA to CCC); Order delivery SLA categorization; Employee bonus tier allocation.',
    traps: 'ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put "WHEN balance > 10000" before "WHEN balance > 100000", the higher tier is shadowed and never reached!'
  },
  {
    key: 'matrix_pivoting',
    name: 'ROW-TO-COLUMN MATRIX PIVOTING',
    symbol: '📊',
    color: '#10b981',
    concept: 'Conditional Aggregation Folding',
    whenToUse: 'When transforming transaction event logs into wide, executive-ready financial statement columns (e.g. Q1, Q2, Q3, Q4 revenue columns).',
    scenarios: 'Quarterly financial earnings tables; Departmental monthly budget variance columns; Regional asset allocation cross-tabs; Cash flow operating vs financing columns.',
    traps: 'FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr=\'Q1\' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition! Conversely, in COUNT(), adding ELSE 0 falsely counts zeroes as non-null rows!'
  },
  {
    key: 'null_sanitization',
    name: 'DATA SANITIZATION (COALESCE & NULLIF)',
    symbol: '🛡️',
    color: '#f59e0b',
    concept: 'Defensive Value Fallbacks & Zero-Shielding',
    whenToUse: 'When providing fallback default values or protecting formulas from catastrophic runtime crashes (e.g. Division by Zero).',
    scenarios: 'Division by zero shield in Profit Margin calculation (amount / NULLIF(units, 0)); Cascading contact hierarchy (COALESCE(work_email, personal_email, phone)); Empty string trimming to NULL; Default currency exchange rates.',
    traps: 'DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback.'
  },
  {
    key: 'multi_conditional',
    name: 'COMPOUND CLASSIFICATIONS & RISK FLAGS',
    symbol: '🚩',
    color: '#ec4899',
    concept: 'Multi-Variate Matrix Logic',
    whenToUse: 'When decision logic requires combinations of AND/OR clauses, thresholds across multiple columns, and nested priority scoring.',
    scenarios: 'AML (Anti-Money Laundering) high-risk account detection (Volume > $100k AND Country in High-Risk List); Tiered brokerage commission fee schedules; VIP churn flight risk tagging; Margin call triggers.',
    traps: 'DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure.'
  },
  {
    key: 'matrix_unpivoting',
    name: 'MATRIX UNPIVOTING & TIDY TRANSFORMATION',
    symbol: '🔄',
    color: '#a855f7',
    concept: 'Column-to-Row Normalization',
    whenToUse: 'When taking wide legacy spreadsheet exports (with columns for Jan, Feb, Mar) and unpivoting them into tidy relational rows for dimensional modeling.',
    scenarios: 'Unpivoting legacy accounting sheets with quarterly revenue columns into tidy time-series rows; Normalizing multi-attribute survey responses; Preparing wide metrics for BI dashboard ingestion; Time-series normalization.',
    traps: 'DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!'
  },
  {
    key: 'filter_clause',
    name: 'FILTER (WHERE ...) CONDITIONAL AGGREGATES',
    symbol: '⚡',
    color: '#06b6d4',
    concept: 'ANSI Standard Targeted Aggregations',
    whenToUse: 'When computing multi-metric financial ratios or isolated segment totals in modern engines (PostgreSQL, DuckDB, SQLite, Snowflake) with clean, readable syntax.',
    scenarios: 'Simultaneous calculation of Gross Sales, Returns, and Net Discounts in a single pass; Parallel active vs dormant customer counts; High-net-worth portfolio asset ratios.',
    traps: 'DIALECT RESTRICTION! The FILTER (WHERE ...) clause is ANSI SQL:2003, but is not natively supported in MySQL or legacy SQL Server (which require SUM(CASE WHEN...)). Using it in unsupported engines causes compilation errors.'
  },
  {
    key: 'dynamic_bucketing',
    name: 'DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS',
    symbol: '📦',
    color: '#f97316',
    concept: 'Asymmetric Interval Discretization',
    whenToUse: 'When continuous financial metrics (account balance, invoice age, trade volume) must be grouped into discrete business buckets for aging schedules and risk stratification.',
    scenarios: 'Accounts Receivable (AR) aging schedules (0-30, 31-60, 61-90, 90+ days past due); AUM wealth tiers; Loan delinquency risk stratification; Trade latency SLA bands.',
    traps: 'BOUNDARY OVERLAP & LEAKS! Inadvertently using <= on both ends of adjacent buckets (e.g. balance <= 1000 and balance <= 5000) causes edge values to trigger the earlier bucket, or missing conditions leave values falling into ELSE \'Other\'.'
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

// Generate 60 problem templates per discipline
function generateDisciplineQuests(disciplineMeta, startId) {
  const quests = [];
  const discKey = disciplineMeta.key;

  for (let lvl = 1; lvl <= 60; lvl++) {
    const questId = startId + lvl - 1;
    let difficulty = 'Easy';
    if (lvl > 20 && lvl <= 40) difficulty = 'Medium';
    if (lvl > 40) difficulty = 'Hard';

    const lvlStr = lvl < 10 ? `0${lvl}` : `${lvl}`;
    const levelDisplay = `PIVOT Lvl ${lvlStr}`;

    let title = '';
    let subtitle = '';
    let task = '';
    let schemaSnippet = '';
    let table = 'FinancialAccounts';
    let template = '';
    let targetQuery = '';
    let slots = {};

    switch (discKey) {
      // =========================================================================
      // 1. SEARCHED & SIMPLE CASE EXPRESSIONS
      // =========================================================================
      case 'searched_case': {
        table = 'FinancialAccounts';
        schemaSnippet = 'FinancialAccounts(account_id INT, client_name VARCHAR, balance_usd NUMERIC, credit_score INT, account_type VARCHAR)';
        if (difficulty === 'Easy') {
          title = `Searched CASE: Level ${lvlStr}: Tier Classification`;
          subtitle = `Classify accounts into tier brackets based on balance thresholds.`;
          task = `Use CASE WHEN ... THEN ... ELSE ... END to categorize accounts by balance.`;
          const threshold = 10000 + lvl * 1500;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['IF', 'SWITCH', 'DECODE']) },
            slot2: { correct: 'WHEN', options: ensureUniqueOptions('WHEN', ['IF', 'WHERE', 'THEN']) },
            slot3: { correct: 'THEN', options: ensureUniqueOptions('THEN', ['ELSE', 'RETURN', 'DO']) },
            slot4: { correct: 'END', options: ensureUniqueOptions('END', ['FINISH', 'STOP', 'DONE']) }
          };
          template = `SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= ${threshold} {{slot3}} 'Premium'\n            ELSE 'Standard' {{slot4}} AS account_tier\nFROM FinancialAccounts;`;
          targetQuery = `SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= ${threshold} THEN 'Premium'\n            ELSE 'Standard' END AS account_tier\nFROM FinancialAccounts;`;
        } else if (difficulty === 'Medium') {
          title = `Searched CASE: Level ${lvlStr}: Credit Risk Bands`;
          subtitle = `Assign regulatory credit risk tiers (Tier A, Tier B, Tier C) using sequential evaluation.`;
          task = `Enforce top-down precedence rules so higher thresholds are evaluated before lower thresholds.`;
          const topScore = 750 + (lvl % 10) * 5;
          const midScore = 650 + (lvl % 10) * 5;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['SELECT', 'EVAL', 'COALESCE']) },
            slot2: { correct: `>= ${topScore}`, options: ensureUniqueOptions(`>= ${topScore}`, [`<= ${topScore}`, `= ${topScore}`, `> ${topScore + 50}`]) },
            slot3: { correct: `>= ${midScore}`, options: ensureUniqueOptions(`>= ${midScore}`, [`<= ${midScore}`, `< ${midScore}`, `= ${midScore}`]) },
            slot4: { correct: 'ELSE', options: ensureUniqueOptions('ELSE', ['DEFAULT', 'OTHERWISE', 'UNLESS']) }
          };
          template = `SELECT account_id, credit_score,\n       {{slot1}} WHEN credit_score {{slot2}} THEN 'Tier A'\n            WHEN credit_score {{slot3}} THEN 'Tier B'\n            {{slot4}} 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;`;
          targetQuery = `SELECT account_id, credit_score,\n       CASE WHEN credit_score >= ${topScore} THEN 'Tier A'\n            WHEN credit_score >= ${midScore} THEN 'Tier B'\n            ELSE 'Tier C' END AS credit_risk_band\nFROM FinancialAccounts;`;
        } else {
          title = `Searched CASE: Level ${lvlStr}: Multi-Tier Wealth Grading`;
          subtitle = `Construct a 4-tier wealth grading engine with nested boundary checks and explicit default labeling.`;
          task = `Ensure strict first-match evaluation without range shadowing or unhandled NULL states.`;
          const tier1 = 1000000;
          const tier2 = 250000;
          const tier3 = 50000;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['DECODE', 'MATCH', 'WHEN']) },
            slot2: { correct: 'WHEN', options: ensureUniqueOptions('WHEN', ['WHERE', 'IF', 'AND']) },
            slot3: { correct: `'Private Wealth'`, options: ensureUniqueOptions(`'Private Wealth'`, [`'Standard'`, `'Retail'`, `'Institutional'`]) },
            slot4: { correct: `'Mass Market'`, options: ensureUniqueOptions(`'Mass Market'`, [`'Private Wealth'`, `'Premier'`, `'VIP'`]) },
            slot5: { correct: 'END', options: ensureUniqueOptions('END', ['STOP', 'TERMINATE', 'FI']) }
          };
          template = `SELECT account_id, balance_usd,\n       {{slot1}} {{slot2}} balance_usd >= ${tier1} THEN {{slot3}}\n            WHEN balance_usd >= ${tier2} THEN 'Premier'\n            WHEN balance_usd >= ${tier3} THEN 'Select'\n            ELSE {{slot4}} {{slot5}} AS wealth_segment\nFROM FinancialAccounts;`;
          targetQuery = `SELECT account_id, balance_usd,\n       CASE WHEN balance_usd >= ${tier1} THEN 'Private Wealth'\n            WHEN balance_usd >= ${tier2} THEN 'Premier'\n            WHEN balance_usd >= ${tier3} THEN 'Select'\n            ELSE 'Mass Market' END AS wealth_segment\nFROM FinancialAccounts;`;
        }
        break;
      }

      // =========================================================================
      // 2. ROW-TO-COLUMN MATRIX PIVOTING
      // =========================================================================
      case 'matrix_pivoting': {
        table = 'QuarterlySales';
        schemaSnippet = 'QuarterlySales(department_id INT, fiscal_quarter VARCHAR, revenue_usd NUMERIC, region VARCHAR)';
        if (difficulty === 'Easy') {
          title = `Matrix Pivoting: Level ${lvlStr}: Q1 vs Q2 Split`;
          subtitle = `Fold quarterly rows into separate Q1 and Q2 revenue columns using conditional aggregation.`;
          task = `Use SUM(CASE WHEN ... THEN amount ELSE 0 END) to avoid NULL propagation.`;
          slots = {
            slot1: { correct: 'SUM', options: ensureUniqueOptions('SUM', ['COUNT', 'AVG', 'MAX']) },
            slot2: { correct: 'WHEN', options: ensureUniqueOptions('WHEN', ['WHERE', 'IF', 'ON']) },
            slot3: { correct: 'ELSE 0', options: ensureUniqueOptions('ELSE 0', ['ELSE NULL', 'ELSE 1', 'WITHOUT 0']) },
            slot4: { correct: 'GROUP BY', options: ensureUniqueOptions('GROUP BY', ['ORDER BY', 'PARTITION BY', 'HAVING']) }
          };
          template = `SELECT department_id,\n       {{slot1}}(CASE {{slot2}} fiscal_quarter = 'Q1' THEN revenue_usd {{slot3}} END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\n{{slot4}} department_id;`;
          targetQuery = `SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_revenue,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_revenue\nFROM QuarterlySales\nGROUP BY department_id;`;
        } else if (difficulty === 'Medium') {
          title = `Matrix Pivoting: Level ${lvlStr}: Full Fiscal Year Matrix`;
          subtitle = `Fold 4 fiscal quarters (Q1, Q2, Q3, Q4) into an executive revenue summary table with total sum.`;
          task = `Aggregate departmental performance with zero-shielded sums across all 4 quarters.`;
          slots = {
            slot1: { correct: 'SUM', options: ensureUniqueOptions('SUM', ['COUNT', 'TOTAL', 'AGG']) },
            slot2: { correct: "'Q3'", options: ensureUniqueOptions("'Q3'", ["'Q1'", "'Q2'", "'ALL'"]) },
            slot3: { correct: "'Q4'", options: ensureUniqueOptions("'Q4'", ["'Q2'", "'Q3'", "'FY'"]) },
            slot4: { correct: 'department_id', options: ensureUniqueOptions('department_id', ['fiscal_quarter', 'revenue_usd', 'region']) }
          };
          template = `SELECT department_id,\n       {{slot1}}(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot2}} THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = {{slot3}} THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY {{slot4}};`;
          targetQuery = `SELECT department_id,\n       SUM(CASE WHEN fiscal_quarter = 'Q1' THEN revenue_usd ELSE 0 END) AS q1_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q2' THEN revenue_usd ELSE 0 END) AS q2_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q3' THEN revenue_usd ELSE 0 END) AS q3_rev,\n       SUM(CASE WHEN fiscal_quarter = 'Q4' THEN revenue_usd ELSE 0 END) AS q4_rev\nFROM QuarterlySales\nGROUP BY department_id;`;
        } else {
          title = `Matrix Pivoting: Level ${lvlStr}: Cross-Tab Count & Ratio Folding`;
          subtitle = `Pivot order statuses (Completed, Refunded, Cancelled) and compute resolution ratios per department.`;
          task = `Use conditional COUNT(CASE WHEN ... THEN 1 END) avoiding the 'ELSE 0' count trap!`;
          slots = {
            slot1: { correct: 'COUNT', options: ensureUniqueOptions('COUNT', ['SUM', 'TOTAL', 'AVG']) },
            slot2: { correct: 'THEN 1', options: ensureUniqueOptions('THEN 1', ['THEN 0', 'ELSE 1', 'THEN NULL']) },
            slot3: { correct: 'ELSE NULL', options: ensureUniqueOptions('ELSE NULL', ['ELSE 0', 'ELSE 1', 'ELSE -1']) },
            slot4: { correct: 'END', options: ensureUniqueOptions('END', ['STOP', 'FINISH', 'CLOSE']) }
          };
          template = `SELECT department_id,\n       {{slot1}}(CASE WHEN status = 'Completed' {{slot2}} {{slot3}} {{slot4}}) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;`;
          targetQuery = `SELECT department_id,\n       COUNT(CASE WHEN status = 'Completed' THEN 1 ELSE NULL END) AS completed_count,\n       COUNT(CASE WHEN status = 'Refunded' THEN 1 ELSE NULL END) AS refunded_count,\n       COUNT(CASE WHEN status = 'Cancelled' THEN 1 ELSE NULL END) AS cancelled_count\nFROM CustomerOrders\nGROUP BY department_id;`;
        }
        break;
      }

      // =========================================================================
      // 3. DATA SANITIZATION (COALESCE & NULLIF)
      // =========================================================================
      case 'null_sanitization': {
        table = 'ClientProfiles';
        schemaSnippet = 'ClientProfiles(client_id INT, primary_email VARCHAR, secondary_email VARCHAR, phone_number VARCHAR, tax_id VARCHAR)';
        if (difficulty === 'Easy') {
          title = `Data Sanitization: Level ${lvlStr}: Fallback Contact Selection`;
          subtitle = `Select the first non-null contact channel using COALESCE.`;
          task = `Resolve contact priority: primary email -> secondary email -> phone number.`;
          slots = {
            slot1: { correct: 'COALESCE', options: ensureUniqueOptions('COALESCE', ['IFNULL', 'NVL2', 'NULLIF']) },
            slot2: { correct: 'primary_email', options: ensureUniqueOptions('primary_email', ['client_id', 'tax_id', "'N/A'"]) },
            slot3: { correct: 'secondary_email', options: ensureUniqueOptions('secondary_email', ['client_id', 'primary_email', 'tax_id']) },
            slot4: { correct: "'No Contact'", options: ensureUniqueOptions("'No Contact'", ["'Unknown'", "NULL", "'0'"]) }
          };
          template = `SELECT client_id,\n       {{slot1}}({{slot2}}, {{slot3}}, phone_number, {{slot4}}) AS verified_contact\nFROM ClientProfiles;`;
          targetQuery = `SELECT client_id,\n       COALESCE(primary_email, secondary_email, phone_number, 'No Contact') AS verified_contact\nFROM ClientProfiles;`;
        } else if (difficulty === 'Medium') {
          title = `Data Sanitization: Level ${lvlStr}: Zero-Division Shielding`;
          subtitle = `Safely calculate return on investment (ROI) or profit margin without division-by-zero crashes.`;
          task = `Wrap denominator in NULLIF(denominator, 0) so zero yields NULL instead of crashing the database.`;
          slots = {
            slot1: { correct: 'NULLIF', options: ensureUniqueOptions('NULLIF', ['COALESCE', 'ISNULL', 'ZEROIF']) },
            slot2: { correct: 'invested_capital', options: ensureUniqueOptions('invested_capital', ['net_profit', 'client_id', 'total_assets']) },
            slot3: { correct: '0', options: ensureUniqueOptions('0', ['1', '-1', 'NULL']) },
            slot4: { correct: 'COALESCE', options: ensureUniqueOptions('COALESCE', ['NULLIF', 'NVL2', 'DECODE']) }
          };
          template = `SELECT investment_id,\n       {{slot4}}(net_profit / {{slot1}}({{slot2}}, {{slot3}}), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;`;
          targetQuery = `SELECT investment_id,\n       COALESCE(net_profit / NULLIF(invested_capital, 0), 0.0) AS safe_roi_ratio\nFROM PortfolioInvestments;`;
        } else {
          title = `Data Sanitization: Level ${lvlStr}: Empty String Trimming & Nullification`;
          subtitle = `Convert empty whitespace strings (' ') into actual NULL values and coalesce to default placeholders.`;
          task = `Combine NULLIF(TRIM(tax_id), '') with COALESCE to ensure clean compliance reporting.`;
          slots = {
            slot1: { correct: 'COALESCE', options: ensureUniqueOptions('COALESCE', ['NULLIF', 'TRIM', 'CAST']) },
            slot2: { correct: 'NULLIF', options: ensureUniqueOptions('NULLIF', ['COALESCE', 'IFNULL', 'NVL']) },
            slot3: { correct: 'TRIM', options: ensureUniqueOptions('TRIM', ['UPPER', 'LOWER', 'LEN']) },
            slot4: { correct: "''", options: ensureUniqueOptions("''", ["' '", "'NULL'", "'0'"]) },
            slot5: { correct: "'EXEMPT'", options: ensureUniqueOptions("'EXEMPT'", ["'NULL'", "'N/A'", "''"]) }
          };
          template = `SELECT client_id,\n       {{slot1}}({{slot2}}({{slot3}}(tax_id), {{slot4}}), {{slot5}}) AS normalized_tax_status\nFROM ClientProfiles;`;
          targetQuery = `SELECT client_id,\n       COALESCE(NULLIF(TRIM(tax_id), ''), 'EXEMPT') AS normalized_tax_status\nFROM ClientProfiles;`;
        }
        break;
      }

      // =========================================================================
      // 4. COMPOUND CLASSIFICATIONS & RISK FLAGS
      // =========================================================================
      case 'multi_conditional': {
        table = 'TransactionAudits';
        schemaSnippet = 'TransactionAudits(txn_id INT, account_id INT, amount_usd NUMERIC, country_code VARCHAR, is_pep BOOLEAN, risk_score INT)';
        if (difficulty === 'Easy') {
          title = `Compound Classifications: Level ${lvlStr}: High-Value Cross-Border Flag`;
          subtitle = `Flag transactions that exceed threshold AND originate from foreign jurisdictions.`;
          task = `Use AND operator inside CASE WHEN to evaluate multi-column predicates.`;
          const limit = 50000 + (lvl % 10) * 5000;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['WHERE', 'IF', 'EVAL']) },
            slot2: { correct: 'AND', options: ensureUniqueOptions('AND', ['OR', 'NOT', 'XOR']) },
            slot3: { correct: 'THEN', options: ensureUniqueOptions('THEN', ['ELSE', 'DO', 'GOTO']) },
            slot4: { correct: 'ELSE', options: ensureUniqueOptions('ELSE', ['DEFAULT', 'OTHERWISE', 'UNLESS']) }
          };
          template = `SELECT txn_id, amount_usd,\n       {{slot1}} WHEN amount_usd > ${limit} {{slot2}} country_code != 'US' {{slot3}} 'FLAG_REVIEW'\n            {{slot4}} 'CLEARED' END AS audit_status\nFROM TransactionAudits;`;
          targetQuery = `SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd > ${limit} AND country_code != 'US' THEN 'FLAG_REVIEW'\n            ELSE 'CLEARED' END AS audit_status\nFROM TransactionAudits;`;
        } else if (difficulty === 'Medium') {
          title = `Compound Classifications: Level ${lvlStr}: AML Risk Tiering`;
          subtitle = `Evaluate multi-variate AML risk factors combining transaction amounts, politically exposed persons (PEP), and risk scores.`;
          task = `Construct parenthesized Boolean conditions to prevent operator precedence bugs (AND vs OR).`;
          slots = {
            slot1: { correct: 'WHEN', options: ensureUniqueOptions('WHEN', ['IF', 'THEN', 'WHERE']) },
            slot2: { correct: 'OR', options: ensureUniqueOptions('OR', ['AND', 'NOR', 'AND NOT']) },
            slot3: { correct: 'AND', options: ensureUniqueOptions('AND', ['OR', 'XOR', 'WITH']) },
            slot4: { correct: 'THEN', options: ensureUniqueOptions('THEN', ['ELSE', 'RESULT', 'DO']) }
          };
          template = `SELECT txn_id,\n       CASE {{slot1}} (is_pep = TRUE {{slot2}} risk_score >= 85) {{slot3}} amount_usd >= 10000 {{slot4}} 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;`;
          targetQuery = `SELECT txn_id,\n       CASE WHEN (is_pep = TRUE OR risk_score >= 85) AND amount_usd >= 10000 THEN 'CRITICAL_AML'\n            WHEN risk_score >= 60 THEN 'MODERATE_MONITOR'\n            ELSE 'LOW_RISK' END AS compliance_tier\nFROM TransactionAudits;`;
        } else {
          title = `Compound Classifications: Level ${lvlStr}: Dynamic Brokerage Fee Commission`;
          subtitle = `Compute dynamic commission rates based on VIP volume tiers, asset classes, and settlement speed.`;
          task = `Ensure all THEN and ELSE return numeric values of uniform data types.`;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['IF', 'CHOOSE', 'SWITCH']) },
            slot2: { correct: 'amount_usd >= 500000', options: ensureUniqueOptions('amount_usd >= 500000', ['amount_usd < 500000', 'amount_usd = 0', 'amount_usd IS NULL']) },
            slot3: { correct: '0.0005', options: ensureUniqueOptions('0.0005', ["'0.05%'", "'FREE'", 'NULL']) },
            slot4: { correct: '0.0015', options: ensureUniqueOptions('0.0015', ["'0.15%'", "'LOW'", '0']) },
            slot5: { correct: '0.0030', options: ensureUniqueOptions('0.0030', ["'0.30%'", "'STANDARD'", '1']) }
          };
          template = `SELECT txn_id, amount_usd,\n       {{slot1}} WHEN {{slot2}} AND is_vip = TRUE THEN {{slot3}}\n            WHEN amount_usd >= 100000 THEN {{slot4}}\n            ELSE {{slot5}} END AS commission_rate_basis\nFROM BrokerageTrades;`;
          targetQuery = `SELECT txn_id, amount_usd,\n       CASE WHEN amount_usd >= 500000 AND is_vip = TRUE THEN 0.0005\n            WHEN amount_usd >= 100000 THEN 0.0015\n            ELSE 0.0030 END AS commission_rate_basis\nFROM BrokerageTrades;`;
        }
        break;
      }

      // =========================================================================
      // 5. MATRIX UNPIVOTING & TIDY TRANSFORMATION
      // =========================================================================
      case 'matrix_unpivoting': {
        table = 'WideFinancialReports';
        schemaSnippet = 'WideFinancialReports(entity_id INT, fiscal_year INT, q1_rev NUMERIC, q2_rev NUMERIC, q3_rev NUMERIC, q4_rev NUMERIC)';
        if (difficulty === 'Easy') {
          title = `Matrix Unpivoting: Level ${lvlStr}: Semi-Annual Column Inversion`;
          subtitle = `Unpivot H1 and H2 revenue columns into a tidy time-series format using stacked UNION ALL.`;
          task = `Normalize wide half-year columns into discrete rows with uniform aliases.`;
          slots = {
            slot1: { correct: "'H1'", options: ensureUniqueOptions("'H1'", ["'H2'", "'ANNUAL'", "'TOTAL'"]) },
            slot2: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'INTERSECT', 'JOIN']) },
            slot3: { correct: "'H2'", options: ensureUniqueOptions("'H2'", ["'H1'", "'HALF2'", "'FY'"]) },
            slot4: { correct: 'entity_id', options: ensureUniqueOptions('entity_id', ['fiscal_year', 'period_code', 'revenue_usd']) }
          };
          template = `SELECT entity_id, fiscal_year, {{slot1}} AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, {{slot3}} AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY {{slot4}}, period_code;`;
          targetQuery = `SELECT entity_id, fiscal_year, 'H1' AS period_code, h1_rev AS revenue_usd\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'H2' AS period_code, h2_rev AS revenue_usd\nFROM WideFinancialReports\nORDER BY entity_id, period_code;`;
        } else if (difficulty === 'Medium') {
          title = `Matrix Unpivoting: Level ${lvlStr}: 4-Quarter Time-Series Unpivot`;
          subtitle = `Stack 4 quarterly columns (Q1 to Q4) into a normalized tabular stream using repeated UNION ALL.`;
          task = `Ensure identical projection schemas and types across all 4 SELECT branches.`;
          slots = {
            slot1: { correct: "'Q1'", options: ensureUniqueOptions("'Q1'", ["'ALL'", "'Q2'", "'FY'"]) },
            slot2: { correct: 'UNION ALL', options: ensureUniqueOptions('UNION ALL', ['UNION', 'CROSS JOIN', 'EXCEPT']) },
            slot3: { correct: "'Q3'", options: ensureUniqueOptions("'Q3'", ["'Q1'", "'Q2'", "'Q4'"]) },
            slot4: { correct: "'Q4'", options: ensureUniqueOptions("'Q4'", ["'Q1'", "'Q2'", "'Q3'"]) }
          };
          template = `SELECT entity_id, fiscal_year, {{slot1}} AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\n{{slot2}}\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot3}}, q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, {{slot4}}, q4_rev FROM WideFinancialReports;`;
          targetQuery = `SELECT entity_id, fiscal_year, 'Q1' AS quarter_name, q1_rev AS revenue\nFROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q2', q2_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q3', q3_rev FROM WideFinancialReports\nUNION ALL\nSELECT entity_id, fiscal_year, 'Q4', q4_rev FROM WideFinancialReports;`;
        } else {
          title = `Matrix Unpivoting: Level ${lvlStr}: Multi-Metric Unpivot via CROSS JOIN LATERAL`;
          subtitle = `Modern, high-performance unpivoting using VALUES constructor within a LATERAL join.`;
          task = `Avoid multiple table scans by generating dynamic rows in a single pass.`;
          slots = {
            slot1: { correct: 'CROSS JOIN', options: ensureUniqueOptions('CROSS JOIN', ['INNER JOIN', 'LEFT JOIN', 'FULL JOIN']) },
            slot2: { correct: 'VALUES', options: ensureUniqueOptions('VALUES', ['SELECT', 'TABLE', 'ARRAY']) },
            slot3: { correct: 'AS', options: ensureUniqueOptions('AS', ['IS', 'OF', 'ON']) },
            slot4: { correct: 'w.entity_id', options: ensureUniqueOptions('w.entity_id', ['u.metric_name', 'u.amount', '1']) }
          };
          template = `SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\n{{slot1}} LATERAL (\n  {{slot2}} ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) {{slot3}} u(metric_name, amount)\nORDER BY {{slot4}}, u.metric_name;`;
          targetQuery = `SELECT w.entity_id, w.fiscal_year, u.metric_name, u.amount\nFROM WideFinancialReports w\nCROSS JOIN LATERAL (\n  VALUES ('Revenue', w.q1_rev),\n         ('NetIncome', w.q1_net_income)\n) AS u(metric_name, amount)\nORDER BY w.entity_id, u.metric_name;`;
        }
        break;
      }

      // =========================================================================
      // 6. FILTER (WHERE ...) CONDITIONAL AGGREGATES
      // =========================================================================
      case 'filter_clause': {
        table = 'InstitutionalTrades';
        schemaSnippet = 'InstitutionalTrades(trade_id INT, desk_id INT, side VARCHAR, notional_usd NUMERIC, status VARCHAR, is_algo BOOLEAN)';
        if (difficulty === 'Easy') {
          title = `FILTER Clause: Level ${lvlStr}: Single-Pass Side Aggregation`;
          subtitle = `Compute total Buy and Sell volume in a single table scan using ANSI FILTER (WHERE...).`;
          task = `Use SUM(...) FILTER (WHERE ...) instead of verbose CASE WHEN expressions.`;
          slots = {
            slot1: { correct: 'SUM', options: ensureUniqueOptions('SUM', ['COUNT', 'AVG', 'TOTAL']) },
            slot2: { correct: 'FILTER', options: ensureUniqueOptions('FILTER', ['WHERE', 'HAVING', 'WHEN']) },
            slot3: { correct: 'WHERE', options: ensureUniqueOptions('WHERE', ['ON', 'IF', 'WHEN']) },
            slot4: { correct: 'desk_id', options: ensureUniqueOptions('desk_id', ['trade_id', 'side', 'status']) }
          };
          template = `SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} ({{slot3}} side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY {{slot4}};`;
          targetQuery = `SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') AS buy_volume,\n       SUM(notional_usd) FILTER (WHERE side = 'SELL') AS sell_volume\nFROM InstitutionalTrades\nGROUP BY desk_id;`;
        } else if (difficulty === 'Medium') {
          title = `FILTER Clause: Level ${lvlStr}: Multi-Metric Desk Summary`;
          subtitle = `Aggregate active trade counts, algorithm trade share, and settled amounts in parallel.`;
          task = `Combine COUNT(*) FILTER with SUM(...) FILTER to construct executive trading KPIs.`;
          slots = {
            slot1: { correct: 'COUNT', options: ensureUniqueOptions('COUNT', ['SUM', 'AVG', 'TOTAL']) },
            slot2: { correct: 'FILTER', options: ensureUniqueOptions('FILTER', ['WHERE', 'WHEN', 'WITH']) },
            slot3: { correct: 'is_algo = TRUE', options: ensureUniqueOptions('is_algo = TRUE', ['is_algo IS NULL', 'is_algo = FALSE', 'side = \'BUY\'']) },
            slot4: { correct: 'status = \'SETTLED\'', options: ensureUniqueOptions('status = \'SETTLED\'', ['status = \'PENDING\'', 'status = \'CANCELLED\'', 'is_algo = TRUE']) }
          };
          template = `SELECT desk_id,\n       {{slot1}}(*) {{slot2}} (WHERE {{slot3}}) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE {{slot4}}) AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;`;
          targetQuery = `SELECT desk_id,\n       COUNT(*) FILTER (WHERE is_algo = TRUE) AS algo_trade_count,\n       COUNT(*) AS total_trades,\n       SUM(notional_usd) FILTER (WHERE status = 'SETTLED') AS settled_notional\nFROM InstitutionalTrades\nGROUP BY desk_id;`;
        } else {
          title = `FILTER Clause: Level ${lvlStr}: Liquidity Imbalance Ratio`;
          subtitle = `Compute the buy-to-total execution volume ratio protected by NULLIF and zero-shielding.`;
          task = `Nest NULLIF with FILTER aggregations for crash-free analytical financial metric extraction.`;
          slots = {
            slot1: { correct: 'SUM', options: ensureUniqueOptions('SUM', ['COUNT', 'TOTAL', 'AVG']) },
            slot2: { correct: 'FILTER', options: ensureUniqueOptions('FILTER', ['WHERE', 'IF', 'WHEN']) },
            slot3: { correct: 'NULLIF', options: ensureUniqueOptions('NULLIF', ['COALESCE', 'ISNULL', 'NVL']) },
            slot4: { correct: '0', options: ensureUniqueOptions('0', ['1', 'NULL', '-1']) },
            slot5: { correct: 'desk_id', options: ensureUniqueOptions('desk_id', ['side', 'trade_id', 'status']) }
          };
          template = `SELECT desk_id,\n       {{slot1}}(notional_usd) {{slot2}} (WHERE side = 'BUY') /\n       {{slot3}}(SUM(notional_usd), {{slot4}}) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY {{slot5}};`;
          targetQuery = `SELECT desk_id,\n       SUM(notional_usd) FILTER (WHERE side = 'BUY') /\n       NULLIF(SUM(notional_usd), 0) AS buy_ratio\nFROM InstitutionalTrades\nGROUP BY desk_id;`;
        }
        break;
      }

      // =========================================================================
      // 7. DYNAMIC BUCKETING & ASYMMETRIC HISTOGRAMS
      // =========================================================================
      case 'dynamic_bucketing': {
        table = 'AccountsReceivable';
        schemaSnippet = 'AccountsReceivable(invoice_id INT, customer_id INT, balance_due NUMERIC, days_overdue INT, invoice_date DATE)';
        if (difficulty === 'Easy') {
          title = `Dynamic Bucketing: Level ${lvlStr}: Standard 30-Day Aging Schedule`;
          subtitle = `Classify outstanding invoices into standard aging buckets (Current, 1-30 Days, 30+ Days).`;
          task = `Use CASE WHEN with strict inequality boundaries to segment accounts receivable.`;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['IF', 'DECODE', 'BUCKET']) },
            slot2: { correct: '<= 0', options: ensureUniqueOptions('<= 0', ['> 0', '= 1', '>= 30']) },
            slot3: { correct: '<= 30', options: ensureUniqueOptions('<= 30', ['> 30', '= 0', '>= 60']) },
            slot4: { correct: 'END', options: ensureUniqueOptions('END', ['STOP', 'FINISH', 'DONE']) }
          };
          template = `SELECT invoice_id, days_overdue,\n       {{slot1}} WHEN days_overdue {{slot2}} THEN 'Current'\n            WHEN days_overdue {{slot3}} THEN '1-30 Days'\n            ELSE '30+ Days Past Due' {{slot4}} AS aging_bucket\nFROM AccountsReceivable;`;
          targetQuery = `SELECT invoice_id, days_overdue,\n       CASE WHEN days_overdue <= 0 THEN 'Current'\n            WHEN days_overdue <= 30 THEN '1-30 Days'\n            ELSE '30+ Days Past Due' END AS aging_bucket\nFROM AccountsReceivable;`;
        } else if (difficulty === 'Medium') {
          title = `Dynamic Bucketing: Level ${lvlStr}: Full Aging Matrix Grouping`;
          subtitle = `Aggregate total outstanding balances grouped by 4 aging brackets (Current, 1-30, 31-60, 61-90, 90+).`;
          task = `Construct the aging bucket in a subquery or GROUP BY expression to summarize debt risk.`;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['SELECT', 'EVAL', 'WHEN']) },
            slot2: { correct: '<= 60', options: ensureUniqueOptions('<= 60', ['>= 60', '= 60', '< 30']) },
            slot3: { correct: '<= 90', options: ensureUniqueOptions('<= 90', ['> 90', '= 90', '< 60']) },
            slot4: { correct: 'SUM(balance_due)', options: ensureUniqueOptions('SUM(balance_due)', ['COUNT(*)', 'AVG(balance_due)', 'MAX(balance_due)']) }
          };
          template = `SELECT\n  {{slot1}} WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue {{slot2}} THEN '31-60 Days'\n       WHEN days_overdue {{slot3}} THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  {{slot4}} AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;`;
          targetQuery = `SELECT\n  CASE WHEN days_overdue <= 30 THEN '0-30 Days'\n       WHEN days_overdue <= 60 THEN '31-60 Days'\n       WHEN days_overdue <= 90 THEN '61-90 Days'\n       ELSE '90+ Days (Default Risk)' END AS debt_bracket,\n  SUM(balance_due) AS total_exposure_usd\nFROM AccountsReceivable\nGROUP BY 1;`;
        } else {
          title = `Dynamic Bucketing: Level ${lvlStr}: Weighted Impairment Provisioning`;
          subtitle = `Compute regulatory loan impairment provisions by multiplying bucket balances by statutory loss allowances.`;
          task = `Apply tiered loss rates (0.5% for current, 5% for 1-30d, 20% for 31-60d, 50% for 61-90d, 100% for 90+d).`;
          slots = {
            slot1: { correct: 'CASE', options: ensureUniqueOptions('CASE', ['IF', 'CALC', 'SWITCH']) },
            slot2: { correct: '0.005', options: ensureUniqueOptions('0.005', ['0.05', '0.50', '0.00']) },
            slot3: { correct: '0.20', options: ensureUniqueOptions('0.20', ['0.02', '2.00', '0.50']) },
            slot4: { correct: '1.00', options: ensureUniqueOptions('1.00', ['0.10', '0.00', '10.0']) },
            slot5: { correct: 'END', options: ensureUniqueOptions('END', ['STOP', 'FINISH', 'TERM']) }
          };
          template = `SELECT invoice_id, balance_due,\n       balance_due * ({{slot1}}\n         WHEN days_overdue <= 0 THEN {{slot2}}\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN {{slot3}}\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE {{slot4}} {{slot5}}) AS required_impairment_provision\nFROM AccountsReceivable;`;
          targetQuery = `SELECT invoice_id, balance_due,\n       balance_due * (CASE\n         WHEN days_overdue <= 0 THEN 0.005\n         WHEN days_overdue <= 30 THEN 0.05\n         WHEN days_overdue <= 60 THEN 0.20\n         WHEN days_overdue <= 90 THEN 0.50\n         ELSE 1.00 END) AS required_impairment_provision\nFROM AccountsReceivable;`;
        }
        break;
      }
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
      table,
      schemaSnippet,
      task,
      slots,
      template,
      targetQuery
    });
  }

  return quests;
}

// Generate all 7 disciplines
let allQuests = [];
let currentId = 701;

PIVOT_DISCIPLINES.forEach(meta => {
  const quests = generateDisciplineQuests(meta, currentId);
  allQuests = allQuests.concat(quests);
  currentId += quests.length;
});

console.log(`Generated ${allQuests.length} total Conditional Logic & Pivoting quests across ${PIVOT_DISCIPLINES.length} disciplines!`);

const outputCode = `// =============================================================================
// SECTION 08: CONDITIONAL LOGIC & DATA PIVOTING ARENA (420 INTERACTIVE QUESTS)
// 7 Disciplines x 60 Levels (20 Easy / 20 Medium / 20 Hard)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.PIVOT_DISCIPLINES_METADATA = ${JSON.stringify(PIVOT_DISCIPLINES, null, 2)};

window.QUESTS_SECTION_8 = ${JSON.stringify(allQuests, null, 2)};
`;

fs.writeFileSync('visualizer/quests_section8_data.js', outputCode, 'utf8');
console.log('Saved successfully to visualizer/quests_section8_data.js');
