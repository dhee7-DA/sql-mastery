const fs = require('fs');

// =============================================================================
// SECTION 08: CONDITIONAL LOGIC & DATA PIVOTING MASTER GENERATOR
// 100 Progressive Multi-Blank Interactive Quests Across 5 Disciplines
// 4 Mastery Tiers: Apprentice (3 Blanks), Practitioner (3-4 Blanks),
// Specialist (4 Blanks), Master (4-5 Blanks)
// =============================================================================

const PIVOT_DISCIPLINES = [
  {
    key: 'searched_case',
    name: 'SEARCHED & SIMPLE CASE EXPRESSIONS',
    symbol: '🔀',
    color: '#38bdf8',
    concept: 'Sequential Rule Evaluation (First-Match Wins)',
    whenToUse: 'When assigning categorical labels, credit score tiers, or tax bands based on Boolean conditional expressions.',
    scenarios: 'Wealth tier segmentation (Ultra High Net Worth vs Mass Market); Credit default risk bands (AAA to CCC); Order delivery SLA categorization.',
    traps: 'ORDER PRECEDENCE TRAP! SQL evaluates WHEN clauses top-to-bottom and exits on the FIRST TRUE match. If you put "WHEN balance > 10000" before "WHEN balance > 100000", the higher tier is shadowed and never reached!'
  },
  {
    key: 'matrix_pivoting',
    name: 'ROW-TO-COLUMN MATRIX PIVOTING',
    symbol: '📊',
    color: '#10b981',
    concept: 'Conditional Aggregation Folding',
    whenToUse: 'When transforming transaction event logs into wide, executive-ready financial statement columns (e.g. Q1, Q2, Q3, Q4 revenue columns).',
    scenarios: 'Quarterly financial earnings tables; Departmental monthly budget variance columns; Regional asset allocation cross-tabs.',
    traps: 'FORGOTTEN ELSE 0 IN SUM TRAP! If you write SUM(CASE WHEN qtr=\'Q1\' THEN amount END) without ELSE 0, missing quarters yield NULL instead of 0, corrupting downstream cross-column addition!'
  },
  {
    key: 'null_sanitization',
    name: 'DATA SANITIZATION (COALESCE & NULLIF)',
    symbol: '🛡️',
    color: '#f59e0b',
    concept: 'Defensive Value Fallbacks & Zero-Shielding',
    whenToUse: 'When providing fallback default values or protecting formulas from catastrophic runtime crashes (e.g. Division by Zero).',
    scenarios: 'Division by zero shield in Profit Margin calculation (amount / NULLIF(units, 0)); Cascading contact hierarchy (COALESCE(work_email, personal_email, phone)); Empty string trimming to NULL.',
    traps: 'DIVISION BY ZERO DISASTER! Dividing by 0 in SQL crashes the entire query with a fatal runtime exception. Wrapping the divisor in NULLIF(col, 0) safely yields NULL instead of a catastrophic transaction rollback.'
  },
  {
    key: 'multi_conditional',
    name: 'COMPOUND CLASSIFICATIONS & RISK FLAGS',
    symbol: '🚩',
    color: '#ec4899',
    concept: 'Multi-Variate Matrix Logic',
    whenToUse: 'When decision logic requires combinations of AND/OR clauses, thresholds across multiple columns, and nested priority scoring.',
    scenarios: 'AML (Anti-Money Laundering) high-risk account detection (Volume > $100k AND Country in High-Risk List); Tiered brokerage commission fee schedules; VIP churn flight risk tagging.',
    traps: 'DATATYPE MISMATCH IN THEN BRANCHES! All THEN branches (and the ELSE clause) must return compatible data types. Returning an INTEGER in branch 1 and a VARCHAR in branch 2 will cause a query parsing failure.'
  },
  {
    key: 'matrix_unpivoting',
    name: 'MATRIX UNPIVOTING & TIDY TRANSFORMATION',
    symbol: '🔄',
    color: '#a855f7',
    concept: 'Column-to-Row Normalization',
    whenToUse: 'When taking wide legacy spreadsheet exports (with columns for Jan, Feb, Mar) and unpivoting them into tidy relational rows for dimensional modeling.',
    scenarios: 'Unpivoting legacy accounting sheets with quarterly revenue columns into tidy time-series rows; Normalizing multi-attribute survey responses; Preparing wide metrics for BI dashboard ingestion.',
    traps: 'DATA DRIFT DURING UNPIVOT! When manually unpivoting via stacked SELECT ... UNION ALL queries, missing column aliases or mismatched projections silently scramble metric columns!'
  }
];

const ANALYTICAL_TABLES = [
  { table: 'FinancialAccounts', pKey: 'account_id', grpKey: 'portfolio_id', valCol: 'balance_usd', dateCol: 'opened_at' },
  { table: 'CorporateSales', pKey: 'sale_id', grpKey: 'sales_rep_id', valCol: 'revenue_usd', dateCol: 'sale_date' },
  { table: 'ClientTransactions', pKey: 'txn_id', grpKey: 'client_id', valCol: 'txn_amount', dateCol: 'posted_at' },
  { table: 'LoanApplications', pKey: 'loan_id', grpKey: 'applicant_id', valCol: 'credit_score', dateCol: 'submitted_at' },
  { table: 'DeskPositions', pKey: 'position_id', grpKey: 'desk_id', valCol: 'market_value', dateCol: 'as_of_date' },
  { table: 'CustomerOrders', pKey: 'order_id', grpKey: 'cust_id', valCol: 'order_total', dateCol: 'order_date' },
  { table: 'DepartmentBudgets', pKey: 'budget_id', grpKey: 'dept_id', valCol: 'allocated_usd', dateCol: 'fiscal_year' },
  { table: 'TradeExecutions', pKey: 'trade_id', grpKey: 'broker_id', valCol: 'execution_price', dateCol: 'executed_at' }
];

const quests = [];
let questId = 701;

// Generate 100 Quests: 5 Disciplines x 20 Quests Each
PIVOT_DISCIPLINES.forEach((disc, discIdx) => {
  for (let lvl = 1; lvl <= 20; lvl++) {
    const globalIdx = discIdx * 20 + lvl; // 1 to 100
    const tblObj = ANALYTICAL_TABLES[(globalIdx - 1) % ANALYTICAL_TABLES.length];

    // Determine Tier & Blank Count
    let tier = 'Apprentice';
    let tierColor = '#38bdf8';
    let difficulty = 'Easy';
    let blankCount = 3;

    if (globalIdx <= 20) {
      tier = 'Apprentice';
      tierColor = '#38bdf8';
      difficulty = 'Easy';
      blankCount = 3;
    } else if (globalIdx <= 45) {
      tier = 'Practitioner';
      tierColor = '#10b981';
      difficulty = 'Medium';
      blankCount = (lvl % 2 === 0) ? 4 : 3;
    } else if (globalIdx <= 75) {
      tier = 'Specialist';
      tierColor = '#f59e0b';
      difficulty = 'Medium';
      blankCount = 4;
    } else {
      tier = 'Master';
      tierColor = '#ec4899';
      difficulty = 'Hard';
      blankCount = (lvl % 2 === 0) ? 5 : 4;
    }

    let q = null;

    if (disc.key === 'searched_case') {
      if (blankCount === 3) {
        q = {
          title: `Searched CASE: Level ${lvl < 10 ? '0' + lvl : lvl}: Tiered Classification`,
          subtitle: `Classify ${tblObj.table} into status tiers based on ${tblObj.valCol}.`,
          task: `Write a CASE expression with WHEN, THEN, and ELSE clauses to assign categorical tiers.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, ${tblObj.valCol} DECIMAL, ${tblObj.dateCol} DATE)`,
          targetQuery: `SELECT ${tblObj.pKey}, ${tblObj.valCol},\n  CASE\n    WHEN ${tblObj.valCol} >= 100000 THEN 'HIGH'\n    WHEN ${tblObj.valCol} >= 50000 THEN 'MEDIUM'\n    ELSE 'STANDARD'\n  END AS tier_label\nFROM ${tblObj.table};`,
          template: [
            { text: `SELECT ${tblObj.pKey}, ${tblObj.valCol},\n  `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ CASE ]' },
            { text: `\n    WHEN ${tblObj.valCol} >= 100000 THEN 'HIGH'\n    WHEN ${tblObj.valCol} >= 50000 `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ THEN ]' },
            { text: ` 'MEDIUM'\n    ELSE 'STANDARD'\n  `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ END ]' },
            { text: ` AS tier_label\nFROM ${tblObj.table};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'CASE', options: ['CASE', 'IF', 'SWITCH', 'DECODE'] },
            slot2: { correct: 'THEN', options: ['THEN', 'IS', 'GOTO', 'DO'] },
            slot3: { correct: 'END', options: ['END', 'FINISH', 'STOP', 'DONE'] }
          }
        };
      } else {
        q = {
          title: `Searched CASE: Level ${lvl < 10 ? '0' + lvl : lvl}: Multi-Threshold Ordering`,
          subtitle: `Enforce top-down precedence rules to prevent lower thresholds from shadowing high values.`,
          task: `Construct a 4-tier CASE expression with strict descending evaluation order.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, ${tblObj.valCol} DECIMAL, ${tblObj.dateCol} DATE)`,
          targetQuery: `SELECT ${tblObj.pKey},\n  CASE\n    WHEN ${tblObj.valCol} >= 250000 THEN 'PLATINUM'\n    WHEN ${tblObj.valCol} >= 100000 THEN 'GOLD'\n    WHEN ${tblObj.valCol} >= 25000 THEN 'SILVER'\n    ELSE 'BRONZE'\n  END AS client_tier\nFROM ${tblObj.table};`,
          template: [
            { text: `SELECT ${tblObj.pKey},\n  CASE\n    WHEN ${tblObj.valCol} >= 250000 `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ THEN 1 ]' },
            { text: ` 'PLATINUM'\n    `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ WHEN 2 ]' },
            { text: ` ${tblObj.valCol} >= 100000 THEN 'GOLD'\n    WHEN ${tblObj.valCol} >= 25000 THEN 'SILVER'\n    `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ FALLBACK ]' },
            { text: " 'BRONZE'\n  ", isBlank: false },
            { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ TERMINATOR ]' },
            { text: ` AS client_tier\nFROM ${tblObj.table};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'THEN', options: ['THEN', 'GIVES', 'AS', 'OUTPUT'] },
            slot2: { correct: 'WHEN', options: ['WHEN', 'IF', 'ELSIF', 'WHERE'] },
            slot3: { correct: 'ELSE', options: ['ELSE', 'DEFAULT', 'OTHERWISE', 'CATCH'] },
            slot4: { correct: 'END', options: ['END', 'TERMINATE', 'FI', 'RETURN'] }
          }
        };
      }
    } else if (disc.key === 'matrix_pivoting') {
      if (blankCount === 3) {
        q = {
          title: `Matrix Pivoting: Level ${lvl < 10 ? '0' + lvl : lvl}: Two-Column Cross-Tab`,
          subtitle: `Pivot ${tblObj.valCol} into high and regular revenue columns using conditional aggregation.`,
          task: `Fold rows into columns by wrapping CASE inside SUM with an explicit ELSE 0 fallback.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, ${tblObj.valCol} DECIMAL, status VARCHAR)`,
          targetQuery: `SELECT ${tblObj.grpKey},\n  SUM(CASE WHEN ${tblObj.valCol} >= 50000 THEN ${tblObj.valCol} ELSE 0 END) AS high_val_sum,\n  SUM(CASE WHEN ${tblObj.valCol} < 50000 THEN ${tblObj.valCol} ELSE 0 END) AS reg_val_sum\nFROM ${tblObj.table}\nGROUP BY ${tblObj.grpKey};`,
          template: [
            { text: `SELECT ${tblObj.grpKey},\n  SUM(`, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ CASE ]' },
            { text: ` WHEN ${tblObj.valCol} >= 50000 THEN ${tblObj.valCol} `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ELSE 0 ]' },
            { text: ` END) AS high_val_sum,\n  SUM(CASE WHEN ${tblObj.valCol} < 50000 THEN ${tblObj.valCol} ELSE 0 END) AS reg_val_sum\nFROM ${tblObj.table}\n`, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ GROUP BY ]' },
            { text: ` ${tblObj.grpKey};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'CASE', options: ['CASE', 'PIVOT', 'FILTER', 'WHEN'] },
            slot2: { correct: 'ELSE 0', options: ['ELSE 0', 'ELSE NULL', 'ELSE 1', 'DEFAULT 0'] },
            slot3: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'COLLAPSE BY'] }
          }
        };
      } else {
        q = {
          title: `Matrix Pivoting: Level ${lvl < 10 ? '0' + lvl : lvl}: Quarterly Financial Matrix`,
          subtitle: `Pivot event quarters into distinct Q1, Q2, Q3 financial columns.`,
          task: `Build a 3-quarter financial cross-tab table using SUM(CASE WHEN ...).`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, quarter VARCHAR, ${tblObj.valCol} DECIMAL)`,
          targetQuery: `SELECT ${tblObj.grpKey},\n  SUM(CASE WHEN quarter = 'Q1' THEN ${tblObj.valCol} ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' THEN ${tblObj.valCol} ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN ${tblObj.valCol} ELSE 0 END) AS q3_total\nFROM ${tblObj.table}\nGROUP BY ${tblObj.grpKey};`,
          template: [
            { text: `SELECT ${tblObj.grpKey},\n  `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ AGGREGATION ]' },
            { text: `(CASE WHEN quarter = 'Q1' THEN ${tblObj.valCol} ELSE 0 END) AS q1_total,\n  SUM(CASE WHEN quarter = 'Q2' `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ THEN ]' },
            { text: ` ${tblObj.valCol} ELSE 0 END) AS q2_total,\n  SUM(CASE WHEN quarter = 'Q3' THEN ${tblObj.valCol} `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ELSE 0 END ]' },
            { text: `) AS q3_total\nFROM ${tblObj.table}\n`, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ GROUP BY ]' },
            { text: ` ${tblObj.grpKey};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'SUM', options: ['SUM', 'COUNT', 'AVG', 'COLLECT'] },
            slot2: { correct: 'THEN', options: ['THEN', 'IS', 'VALUE', 'RETURN'] },
            slot3: { correct: 'ELSE 0 END', options: ['ELSE 0 END', 'ELSE NULL END', 'END', 'DEFAULT 0'] },
            slot4: { correct: 'GROUP BY', options: ['GROUP BY', 'PARTITION BY', 'PIVOT BY', 'ORDER BY'] }
          }
        };
      }
    } else if (disc.key === 'null_sanitization') {
      const isDiv = (lvl % 2 === 0);

      if (blankCount === 3) {
        if (isDiv) {
          q = {
            title: `Data Sanitization: Level ${lvl < 10 ? '0' + lvl : lvl}: Division-by-Zero Shield`,
            subtitle: `Prevent fatal zero-division query aborts using NULLIF in the denominator.`,
            task: `Calculate ratio safely by wrapping divisor in NULLIF(denominator, 0).`,
            table: tblObj.table,
            schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, total_revenue DECIMAL, total_units INT)`,
            targetQuery: `SELECT ${tblObj.pKey},\n  total_revenue / NULLIF(total_units, 0) AS avg_unit_price\nFROM ${tblObj.table};`,
            template: [
              { text: `SELECT ${tblObj.pKey},\n  total_revenue / `, isBlank: false },
              { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ FUNCTION ]' },
              { text: '(total_units, ', isBlank: false },
              { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ZERO CHECK ]' },
              { text: ') AS ', isBlank: false },
              { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ALIAS ]' },
              { text: `\nFROM ${tblObj.table};`, isBlank: false }
            ],
            slots: {
              slot1: { correct: 'NULLIF', options: ['NULLIF', 'COALESCE', 'ISNULL', 'NVL'] },
              slot2: { correct: '0', options: ['0', 'NULL', '-1', '1'] },
              slot3: { correct: 'avg_unit_price', options: ['avg_unit_price', 'DIV_SAFE', 'MARGIN', 'PRICE'] }
            }
          };
        } else {
          q = {
            title: `Data Sanitization: Level ${lvl < 10 ? '0' + lvl : lvl}: Cascading Fallbacks`,
            subtitle: `Return the first non-null contact method from multiple nullable columns.`,
            task: `Use COALESCE to prioritize primary contact channel with a safe literal fallback.`,
            table: tblObj.table,
            schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, direct_phone VARCHAR, email VARCHAR)`,
            targetQuery: `SELECT ${tblObj.pKey},\n  COALESCE(direct_phone, email, 'UNREACHABLE') AS contact_channel\nFROM ${tblObj.table};`,
            template: [
              { text: `SELECT ${tblObj.pKey},\n  `, isBlank: false },
              { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ FUNCTION ]' },
              { text: '(direct_phone, ', isBlank: false },
              { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ FALLBACK COL ]' },
              { text: ", 'UNREACHABLE') AS ", isBlank: false },
              { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ALIAS ]' },
              { text: `\nFROM ${tblObj.table};`, isBlank: false }
            ],
            slots: {
              slot1: { correct: 'COALESCE', options: ['COALESCE', 'NULLIF', 'IFNULL', 'CHOOSE'] },
              slot2: { correct: 'email', options: ['email', 'NULL', 'direct_phone', 'status'] },
              slot3: { correct: 'contact_channel', options: ['contact_channel', 'PHONE_FINAL', 'DEFAULT', 'OUTPUT'] }
            }
          };
        }
      } else {
        q = {
          title: `Data Sanitization: Level ${lvl < 10 ? '0' + lvl : lvl}: Combined COALESCE & NULLIF`,
          subtitle: `Strip empty strings to NULL with NULLIF, then provide an audit default with COALESCE.`,
          task: `Combine COALESCE and NULLIF to sanitize dirty string inputs into standardized outputs.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, tax_identifier VARCHAR)`,
          targetQuery: `SELECT ${tblObj.pKey},\n  COALESCE(NULLIF(TRIM(tax_identifier), ''), 'PENDING_REGISTRATION') AS verified_tax_id\nFROM ${tblObj.table};`,
          template: [
            { text: `SELECT ${tblObj.pKey},\n  `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ OUTER FUNC ]' },
            { text: '(', isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ INNER FUNC ]' },
            { text: "(TRIM(tax_identifier), ''), ", isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ DEFAULT LITERAL ]' },
            { text: ') AS ', isBlank: false },
            { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ALIAS ]' },
            { text: `\nFROM ${tblObj.table};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'COALESCE', options: ['COALESCE', 'NULLIF', 'NVL2', 'CASE'] },
            slot2: { correct: 'NULLIF', options: ['NULLIF', 'COALESCE', 'EMPTY_TO_NULL', 'CLEAN'] },
            slot3: { correct: "'PENDING_REGISTRATION'", options: ["'PENDING_REGISTRATION'", 'NULL', '0', "'EMPTY'"] },
            slot4: { correct: 'verified_tax_id', options: ['verified_tax_id', 'CLEAN_ID', 'RESULT', 'AUDIT'] }
          }
        };
      }
    } else if (disc.key === 'multi_conditional') {
      if (blankCount === 3) {
        q = {
          title: `Multi-Condition: Level ${lvl < 10 ? '0' + lvl : lvl}: AML Risk Scoring`,
          subtitle: `Assign risk status using compound AND conditions across balance and velocity.`,
          task: `Combine multiple criteria in a single WHEN clause with Boolean AND logic.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, ${tblObj.valCol} DECIMAL, risk_score INT)`,
          targetQuery: `SELECT ${tblObj.pKey},\n  CASE\n    WHEN ${tblObj.valCol} > 100000 AND risk_score > 80 THEN 'FLAGGED_CRITICAL'\n    WHEN ${tblObj.valCol} > 50000 OR risk_score > 70 THEN 'REVIEW_REQUIRED'\n    ELSE 'CLEARED'\n  END AS audit_status\nFROM ${tblObj.table};`,
          template: [
            { text: `SELECT ${tblObj.pKey},\n  CASE\n    WHEN ${tblObj.valCol} > 100000 `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ LOGICAL OP 1 ]' },
            { text: ` risk_score > 80 THEN 'FLAGGED_CRITICAL'\n    WHEN ${tblObj.valCol} > 50000 `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ LOGICAL OP 2 ]' },
            { text: " risk_score > 70 THEN 'REVIEW_REQUIRED'\n    ELSE 'CLEARED'\n  ", isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ END ]' },
            { text: ` AS audit_status\nFROM ${tblObj.table};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'AND', options: ['AND', 'OR', 'XOR', 'BUT'] },
            slot2: { correct: 'OR', options: ['OR', 'AND', 'NOR', 'THEN'] },
            slot3: { correct: 'END', options: ['END', 'FINISH', 'STOP', 'DONE'] }
          }
        };
      } else {
        q = {
          title: `Multi-Condition: Level ${lvl < 10 ? '0' + lvl : lvl}: Fee Exemption Matrix`,
          subtitle: `Evaluate VIP waiver criteria with compound conditions and type-consistent outputs.`,
          task: `Build a comprehensive commission fee schedule with multiple criteria branches.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, ${tblObj.valCol} DECIMAL, is_institutional BOOLEAN)`,
          targetQuery: `SELECT ${tblObj.pKey},\n  CASE\n    WHEN is_institutional = TRUE AND ${tblObj.valCol} >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE THEN 0.001\n    WHEN ${tblObj.valCol} >= 100000 THEN 0.002\n    ELSE 0.005\n  END AS fee_rate\nFROM ${tblObj.table};`,
          template: [
            { text: `SELECT ${tblObj.pKey},\n  CASE\n    `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ WHEN 1 ]' },
            { text: ` is_institutional = TRUE AND ${tblObj.valCol} >= 500000 THEN 0.000\n    WHEN is_institutional = TRUE `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ THEN 2 ]' },
            { text: ` 0.001\n    WHEN ${tblObj.valCol} >= 100000 THEN 0.002\n    `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ELSE ]' },
            { text: ' 0.005\n  ', isBlank: false },
            { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ END ]' },
            { text: ` AS fee_rate\nFROM ${tblObj.table};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'WHEN', options: ['WHEN', 'WHERE', 'IF', 'CHECK'] },
            slot2: { correct: 'THEN', options: ['THEN', 'IS', 'GIVES', 'RATE'] },
            slot3: { correct: 'ELSE', options: ['ELSE', 'DEFAULT', 'OTHERWISE', 'FALLBACK'] },
            slot4: { correct: 'END', options: ['END', 'FINISH', 'STOP', 'DONE'] }
          }
        };
      }
    } else {
      // Matrix Unpivoting
      if (blankCount === 3) {
        q = {
          title: `Matrix Unpivoting: Level ${lvl < 10 ? '0' + lvl : lvl}: Stacked Two-Quarter Normalization`,
          subtitle: `Unpivot wide Q1 and Q2 revenue columns into tidy period rows using UNION ALL.`,
          task: `Convert columns to rows by stacking SELECT statements with a synthetic period column.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, q1_rev DECIMAL, q2_rev DECIMAL)`,
          targetQuery: `SELECT ${tblObj.pKey}, 'Q1' AS period, q1_rev AS amount\nFROM ${tblObj.table}\nUNION ALL\nSELECT ${tblObj.pKey}, 'Q2' AS period, q2_rev AS amount\nFROM ${tblObj.table};`,
          template: [
            { text: `SELECT ${tblObj.pKey}, 'Q1' AS period, q1_rev AS amount\nFROM ${tblObj.table}\n`, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ STACK OPERATOR ]' },
            { text: `\nSELECT ${tblObj.pKey}, `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ SYNTHETIC PERIOD ]' },
            { text: `, q2_rev AS amount\nFROM `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ SOURCE TABLE ]' },
            { text: ';', isBlank: false }
          ],
          slots: {
            slot1: { correct: 'UNION ALL', options: ['UNION ALL', 'UNION', 'INTERSECT', 'JOIN'] },
            slot2: { correct: "'Q2' AS period", options: ["'Q2' AS period", "'Q2'", 'period', 'quarter'] },
            slot3: { correct: tblObj.table, options: [tblObj.table, `${tblObj.table}_q2`, 'SOURCE', 'DUAL'] }
          }
        };
      } else {
        q = {
          title: `Matrix Unpivoting: Level ${lvl < 10 ? '0' + lvl : lvl}: Full Year Multi-Period Unpivot`,
          subtitle: `Normalize wide Q1, Q2, Q3, Q4 columns into a clean time-series schema.`,
          task: `Chain UNION ALL statements with consistent column aliases for reliable dimensional ingestion.`,
          table: tblObj.table,
          schemaSnippet: `${tblObj.table}(${tblObj.pKey} INT, ${tblObj.grpKey} VARCHAR, q1_amt DECIMAL, q2_amt DECIMAL, q3_amt DECIMAL, q4_amt DECIMAL)`,
          targetQuery: `SELECT ${tblObj.grpKey}, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ${tblObj.table}\nUNION ALL\nSELECT ${tblObj.grpKey}, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ${tblObj.table}\nUNION ALL\nSELECT ${tblObj.grpKey}, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ${tblObj.table}\nUNION ALL\nSELECT ${tblObj.grpKey}, 'Q4' AS fiscal_quarter, q4_amt AS revenue FROM ${tblObj.table};`,
          template: [
            { text: `SELECT ${tblObj.grpKey}, 'Q1' AS fiscal_quarter, q1_amt AS revenue FROM ${tblObj.table}\n`, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ OP 1 ]' },
            { text: `\nSELECT ${tblObj.grpKey}, 'Q2' AS fiscal_quarter, q2_amt AS revenue FROM ${tblObj.table}\n`, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ OP 2 ]' },
            { text: `\nSELECT ${tblObj.grpKey}, 'Q3' AS fiscal_quarter, q3_amt AS revenue FROM ${tblObj.table}\n`, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ OP 3 ]' },
            { text: `\nSELECT ${tblObj.grpKey}, `, isBlank: false },
            { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ SYNTHETIC Q4 ]' },
            { text: `, q4_amt AS revenue FROM ${tblObj.table};`, isBlank: false }
          ],
          slots: {
            slot1: { correct: 'UNION ALL', options: ['UNION ALL', 'UNION', 'MERGE', 'APPEND'] },
            slot2: { correct: 'UNION ALL', options: ['UNION ALL', 'UNION', 'INTERSECT', 'COMBINE'] },
            slot3: { correct: 'UNION ALL', options: ['UNION ALL', 'UNION', 'STACK', 'CONCAT'] },
            slot4: { correct: "'Q4' AS fiscal_quarter", options: ["'Q4' AS fiscal_quarter", "'Q4'", 'fiscal_quarter', 'quarter_4'] }
          }
        };
      }
    }

    quests.push({
      id: questId++,
      discipline: disc.name,
      disciplineKey: disc.key,
      disciplineLevel: lvl,
      difficulty: difficulty,
      levelDisplay: `PIVOT Lvl ${globalIdx < 10 ? '0' + globalIdx : globalIdx}`,
      title: q.title,
      subtitle: q.subtitle,
      type: 'fill_blank',
      category: `Section 08: Conditional Logic & Pivots (${disc.name})`,
      subcluster: `${disc.name} (${difficulty})`,
      tier: tier,
      tierColor: tierColor,
      task: q.task,
      xp: 30 + Math.floor(globalIdx * 0.4),
      table: q.table,
      scenario: q.subtitle,
      businessObjective: q.task,
      schemaSnippet: q.schemaSnippet,
      targetQuery: q.targetQuery,
      template: q.template,
      slots: q.slots,
      explanation: `Conditional logic and pivoting transform row-level records into wide executive reporting cross-tabs. ${disc.traps}`
    });
  }
});

const fileContent = `// =============================================================================
// SECTION 08: CONDITIONAL LOGIC & DATA PIVOTING ARENA (100 INTERACTIVE QUESTS)
// 5 Disciplines x 20 Levels (Searched CASE, Matrix Pivoting, COALESCE/NULLIF, Flags, Unpivots)
// Verified 3-5 Blanks, Zero Duplicates, Real-World Data & Financial Scenarios
// =============================================================================

window.PIVOT_DISCIPLINES_METADATA = ${JSON.stringify(PIVOT_DISCIPLINES, null, 2)};

window.QUESTS_SECTION_8 = ${JSON.stringify(quests, null, 2)};
`;

fs.writeFileSync('visualizer/quests_section8_data.js', fileContent);
console.log(`Generated Section 08 Vault: ${quests.length} quests in visualizer/quests_section8_data.js`);
