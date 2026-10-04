// =============================================================================
// JPMORGAN CHASE QUANTITATIVE RISK & TREASURY ANALYST 30-DAY STORY DATA
// Role: Associate Data Analyst (Global Banking & Markets / Treasury Services)
// Mentors & Stakeholders:
// - Marcus Sterling (Managing Director, Treasury & General Ledger)
// - Elena Vance (Executive Director, Financial Crimes Surveillance & AML)
// - Rajiv Mehta (Chief Risk Officer, Market & Credit Risk)
// - Catherine Vance (VP, Asset & Wealth Management)
// =============================================================================

(function(window) {
  'use strict';

  const JPMORGAN_STORY_DATA = [
    // ---------------------------------------------------------------------------
    // WEEK 1: CORE BANKING LEDGERS & SETTLEMENT RECONCILIATION (DAYS 01 - 07)
    // ---------------------------------------------------------------------------
    {
      day: 1,
      week: 1,
      phase: "Week 1: Core Banking Ledgers & Reconciliation",
      title: "Day 01: Onboarding & General Ledger Out-of-Balance Audit",
      sender: "Marcus Sterling",
      senderRole: "Managing Director, Global Treasury Operations",
      senderAvatar: "👔",
      priority: "P1 - Critical Audit",
      department: "Corporate Treasury & Financial Control",
      symphonyMessage: "Welcome to 270 Park Avenue! 🏛️ First day in Corporate Treasury: Every night, our core ledger must satisfy the double-entry accounting invariant: Total Debits must exactly equal Total Credits per legal entity. Last night's automated batch flagged a ledger imbalance in legal entity 'JPMC_US_RETAIL'. Find the ledger account and calculate the exact dollar variance.",
      contextReport: {
        businessWhy: "In commercial and investment banking, General Ledger (GL) imbalance means money has either vanished or been created out of thin air due to race conditions or system crashes. Federal regulators (the Fed and OCC) mandate immediate intraday escalation for any ledger discrepancy over $0.00.",
        learningFocus: [
          "Summing debits vs credits using conditional aggregation (`SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END)`)",
          "Grouping by account code and legal entity (`GROUP BY legal_entity, account_code`)",
          "Filtering out balanced accounts using `HAVING debit_sum != credit_sum` to isolate discrepancies",
          "Calculating the net variance (`debit_sum - credit_sum`)"
        ],
        sampleSchema: "general_ledger_entries (\n  entry_id BIGINT PRIMARY KEY,\n  legal_entity VARCHAR(30),\n  account_code VARCHAR(20),\n  entry_type ENUM('DEBIT', 'CREDIT'),\n  amount_usd DECIMAL(18,4),\n  booked_at TIMESTAMP\n)",
        realWorldTrap: "Never compare monetary balances using floating-point `FLOAT` or `DOUBLE`! Financial ledgers always store amounts as `DECIMAL(18,4)` or integer cents to prevent IEEE-754 precision drift where $0.0000001 triggers a regulatory audit alert.",
        interviewRelevance: "Wall Street interviewers frequently test conditional aggregation with `CASE WHEN` inside `SUM()` as the gold standard for financial reconciliation."
      },
      schema: "general_ledger_entries",
      challenge: {
        instruction: "Calculate total debits, total credits, and net variance per account in 'JPMC_US_RETAIL', filtering only for accounts where debits do not equal credits.",
        template: "SELECT account_code,\n       SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END) AS total_debits,\n       SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END) AS total_credits,\n       SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END) AS net_variance\nFROM general_ledger_entries\nWHERE legal_entity = ___1___\nGROUP BY ___2___\nHAVING ___3___ != ___4___;",
        blanks: [
          { id: 1, label: "Entity Filter", answer: "'JPMC_US_RETAIL'", options: ["'JPMC_US_RETAIL'", "'JPMC_ALL'", "JPMC_US_RETAIL", "'USD'"] },
          { id: 2, label: "Grouping Key", answer: "account_code", options: ["account_code", "entry_id", "legal_entity", "entry_type"] },
          { id: 3, label: "Left Aggregate", answer: "total_debits", options: ["total_debits", "amount_usd", "entry_type", "account_code"] },
          { id: 4, label: "Right Aggregate", answer: "total_credits", options: ["total_credits", "0", "net_variance", "1"] }
        ],
        expectedSql: "SELECT account_code, SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END) AS total_debits, SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END) AS total_credits, SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END) AS net_variance FROM general_ledger_entries WHERE legal_entity = 'JPMC_US_RETAIL' GROUP BY account_code HAVING total_debits != total_credits;",
        managerReview: "Spot-on! You discovered account 'GL_88201' had $4.2M in debits against only $3.1M in credits. A network timeout interrupted batch transfer job #941. Operations safely re-queued the missing credit tranche."
      }
    },
    {
      day: 2,
      week: 1,
      phase: "Week 1: Core Banking Ledgers & Reconciliation",
      title: "Day 02: Orphaned SWIFT Wire Transfers & Settlement Fails",
      sender: "Marcus Sterling",
      senderRole: "Managing Director, Global Treasury Operations",
      senderAvatar: "👔",
      priority: "P1 - High Urgency",
      department: "Global Payments & Clearing",
      symphonyMessage: "Our cross-border clearing house sends outbound SWIFT MT103 wire messages. Every initiated wire MUST have a corresponding confirmation record in our Fedwire/CHIPS settlement ledger within 4 hours. Pull all wires initiated yesterday that have NO matching settlement confirmation.",
      contextReport: {
        businessWhy: "Unsettled wires represent immediate counterparty risk. If JPMorgan debits an institutional client $50,000,000 but the wire never settles at the receiving central bank, the client cannot meet margin requirements, risking multi-million dollar penalties.",
        learningFocus: [
          "Anti-Join pattern: Finding missing records in related tables using `LEFT JOIN ... WHERE right_table.key IS NULL`",
          "Filtering by date bounds on the parent transactions",
          "Selecting actionable identifiers (`wire_reference`, `client_id`, `amount_usd`, `beneficiary_bic`)"
        ],
        sampleSchema: "swift_outbound_wires (\n  wire_reference VARCHAR(32) PRIMARY KEY,\n  client_id VARCHAR(20),\n  amount_usd DECIMAL(18,2),\n  beneficiary_bic VARCHAR(11),\n  initiated_at TIMESTAMP\n)\nchips_settlements (\n  settlement_id BIGINT PRIMARY KEY,\n  wire_reference VARCHAR(32),\n  settled_at TIMESTAMP,\n  status VARCHAR(20)\n)",
        realWorldTrap: "Using `NOT IN (SELECT wire_reference FROM chips_settlements)` is fatal if `wire_reference` contains a single `NULL` value! SQL 3-valued logic causes `NOT IN (..., NULL)` to evaluate to `UNKNOWN` and return 0 rows. Always use `LEFT JOIN ... IS NULL` or `NOT EXISTS`.",
        interviewRelevance: "The `LEFT JOIN ... IS NULL` anti-join is one of the top 3 most tested SQL questions at Wall Street investment banks (JPMorgan, Goldman Sachs, Morgan Stanley)."
      },
      schema: "swift_outbound_wires",
      challenge: {
        instruction: "Perform an anti-join to find all outbound SWIFT wires initiated yesterday that do not exist in the CHIPS settlement ledger.",
        template: "SELECT w.wire_reference, w.client_id, w.amount_usd, w.beneficiary_bic\nFROM swift_outbound_wires w\nLEFT JOIN chips_settlements s\n  ON w.wire_reference = ___1___\nWHERE s.wire_reference ___2___\n  AND w.initiated_at >= '2026-10-03 00:00:00'\n  AND w.initiated_at < '2026-10-04 00:00:00';",
        blanks: [
          { id: 1, label: "Join Key", answer: "s.wire_reference", options: ["s.wire_reference", "s.settlement_id", "w.client_id", "s.status"] },
          { id: 2, label: "Anti-Join Filter", answer: "IS NULL", options: ["IS NULL", "IS NOT NULL", "= 0", "!= ''"] }
        ],
        expectedSql: "SELECT w.wire_reference, w.client_id, w.amount_usd, w.beneficiary_bic FROM swift_outbound_wires w LEFT JOIN chips_settlements s ON w.wire_reference = s.wire_reference WHERE s.wire_reference IS NULL AND w.initiated_at >= '2026-10-03 00:00:00' AND w.initiated_at < '2026-10-04 00:00:00';",
        managerReview: "Excellent! You flagged 3 high-value wires totaling $82.5M stuck in an intermediary routing gateway at Deutsche Bank Frankfurt. FX settlement desk resubmitted them before cut-off."
      }
    },
    {
      day: 3,
      week: 1,
      phase: "Week 1: Core Banking Ledgers & Reconciliation",
      title: "Day 03: Floating-Point FX Currency Conversion Drift",
      sender: "Rajiv Mehta",
      senderRole: "Chief Risk Officer, Market & Credit Risk",
      senderAvatar: "📊",
      priority: "P2 - Regulatory Precision",
      department: "FX Quantitative Risk Desk",
      symphonyMessage: "Our algorithmic FX desk converts millions of EUR, GBP, and JPY trades to USD daily. A legacy microservice calculated `amount_usd = amount_foreign * fx_rate` using standard single-precision floats instead of banker's rounding on decimals. Find all trades where the legacy floating calculation differed from standard `ROUND(amount_foreign * fx_rate, 2)` by more than 1 cent.",
      contextReport: {
        businessWhy: "In multi-million dollar high-frequency FX trading, fractional rounding errors of $0.001 accumulate across 500,000 daily tickets into hundreds of thousands of dollars of unaccounted 'slippage'. Financial institutions are legally required to report exact reconciled pennies.",
        learningFocus: [
          "Mathematical absolute difference: `ABS(calculated_val - expected_val)`",
          "Precision rounding using `ROUND(val, 2)`",
          "Numeric drift filtering (`ABS(...) >= 0.01`)"
        ],
        sampleSchema: "fx_trades (\n  trade_id VARCHAR(36) PRIMARY KEY,\n  pair VARCHAR(7),\n  amount_foreign DECIMAL(18,4),\n  fx_rate DECIMAL(12,6),\n  booked_usd_float DOUBLE,\n  trade_timestamp TIMESTAMP\n)",
        realWorldTrap: "Never compare floating numbers for exact equality (`float_val = decimal_val`). In binary floating-point representation, 0.1 cannot be represented precisely. Always compare with a delta threshold like `ABS(a - b) >= 0.01`.",
        interviewRelevance: "Testing a candidate's understanding of integer/decimal financial types vs IEEE floating-point arithmetic is a staple in fintech & quantitative developer interviews."
      },
      schema: "fx_trades",
      challenge: {
        instruction: "Identify FX trades where the booked USD float deviates from standard decimal-rounded USD by 1 cent or more.",
        template: "SELECT trade_id, pair, amount_foreign, fx_rate,\n       booked_usd_float,\n       ROUND(amount_foreign * fx_rate, 2) AS correct_usd,\n       ABS(booked_usd_float - ROUND(amount_foreign * fx_rate, 2)) AS drift_usd\nFROM fx_trades\nWHERE ABS(booked_usd_float - ___1___(amount_foreign * fx_rate, ___2___)) >= ___3___;",
        blanks: [
          { id: 1, label: "Rounding Function", answer: "ROUND", options: ["ROUND", "FLOOR", "CEIL", "TRUNCATE"] },
          { id: 2, label: "Decimal Precision", answer: "2", options: ["2", "4", "0", "6"] },
          { id: 3, label: "Variance Threshold", answer: "0.01", options: ["0.01", "1.00", "0.00", "0.10"] }
        ],
        expectedSql: "SELECT trade_id, pair, amount_foreign, fx_rate, booked_usd_float, ROUND(amount_foreign * fx_rate, 2) AS correct_usd, ABS(booked_usd_float - ROUND(amount_foreign * fx_rate, 2)) AS drift_usd FROM fx_trades WHERE ABS(booked_usd_float - ROUND(amount_foreign * fx_rate, 2)) >= 0.01;",
        managerReview: "Phenomenal work! You surfaced 1,480 trades where floating point drift leaked a cumulative $18,420 over the quarter. Engineering is migrating the legacy service to arbitrary-precision BigDecimal."
      }
    },
    {
      day: 4,
      week: 1,
      phase: "Week 1: Core Banking Ledgers & Reconciliation",
      title: "Day 04: Dormant High-Yield Savings Account Drainage Alert",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P1 - Security Alert",
      department: "AML & Fraud Surveillance",
      symphonyMessage: "Red alert from Fraud Ops: We have a pattern of account takeover (ATO) attacks where dormant accounts (zero customer-initiated activity for over 180 days) suddenly have their password changed, followed by an immediate wire withdrawal of 80% or more of their total balance. Write a query to flag all accounts meeting these exact criteria in the last 48 hours.",
      contextReport: {
        businessWhy: "Account takeover (ATO) is the #1 vector for consumer banking cybercrime. Attackers target accounts with significant balances where the owner is inactive or elderly. Detecting the spike in withdrawal ratio immediately after dormant periods stops the illicit transfer before wire release.",
        learningFocus: [
          "Date interval arithmetic: `DATEDIFF(event_date, last_active_date) >= 180`",
          "Ratio calculation: `withdrawal_amount / previous_balance >= 0.80`",
          "Joining security audit logs with transaction ledgers"
        ],
        sampleSchema: "accounts (\n  account_number VARCHAR(16) PRIMARY KEY,\n  customer_id VARCHAR(20),\n  balance_usd DECIMAL(14,2),\n  last_active_date DATE,\n  status VARCHAR(20)\n)\nwire_withdrawals (\n  withdrawal_id VARCHAR(32) PRIMARY KEY,\n  account_number VARCHAR(16),\n  amount_usd DECIMAL(14,2),\n  withdrawn_at TIMESTAMP\n)",
        realWorldTrap: "Beware of division by zero! If an account had a $0.00 balance, dividing by `balance_usd` throws a runtime SQL error or yields `NULL`. Always wrap denominators with `NULLIF(balance_usd, 0)`.",
        interviewRelevance: "Combining temporal distance conditions (`DATEDIFF`) with proportional ratio thresholds is a core pattern in financial fraud intelligence."
      },
      schema: "accounts",
      challenge: {
        instruction: "Join accounts and recent withdrawals to flag withdrawals where the account was dormant for >= 180 days and the withdrawal amount is >= 80% of account balance.",
        template: "SELECT a.account_number, a.customer_id, a.last_active_date,\n       w.amount_usd AS withdrawal_amount, a.balance_usd,\n       ROUND((w.amount_usd / NULLIF(a.balance_usd, 0)) * 100, 1) AS withdrawal_pct\nFROM accounts a\nINNER JOIN wire_withdrawals w\n  ON a.account_number = w.account_number\nWHERE DATEDIFF(w.withdrawn_at, a.last_active_date) >= ___1___\n  AND (w.amount_usd / NULLIF(a.balance_usd, 0)) >= ___2___;",
        blanks: [
          { id: 1, label: "Dormancy Days", answer: "180", options: ["180", "30", "365", "90"] },
          { id: 2, label: "Ratio Threshold", answer: "0.80", options: ["0.80", "80", "0.50", "1.00"] }
        ],
        expectedSql: "SELECT a.account_number, a.customer_id, a.last_active_date, w.amount_usd AS withdrawal_amount, a.balance_usd, ROUND((w.amount_usd / NULLIF(a.balance_usd, 0)) * 100, 1) AS withdrawal_pct FROM accounts a INNER JOIN wire_withdrawals w ON a.account_number = w.account_number WHERE DATEDIFF(w.withdrawn_at, a.last_active_date) >= 180 AND (w.amount_usd / NULLIF(a.balance_usd, 0)) >= 0.80;",
        managerReview: "Brilliant! Your query caught a coordinated SIM-swap heist hitting 4 accounts totaling $620,000. Fraud desk froze the wires with 12 minutes to spare."
      }
    },
    {
      day: 5,
      week: 1,
      phase: "Week 1: Core Banking Ledgers & Reconciliation",
      title: "Day 05: Overdraft Fee Assessment & Tiered Waivers",
      sender: "Marcus Sterling",
      senderRole: "Managing Director, Global Treasury Operations",
      senderAvatar: "👔",
      priority: "P2 - Fee Audit",
      department: "Consumer & Community Banking",
      symphonyMessage: "Our customer fee structure recently changed to comply with CFPB guidelines. Private Banking and Chase Sapphire clients get full overdraft fee waivers ($0). Standard retail clients get a tiered fee: $0 if negative balance is within $50 cushion, $15 if between $50.01 and $200, and $34 if exceeding $200. Write a query to compute the exact fee owed per overdrawn account.",
      contextReport: {
        businessWhy: "CFPB (Consumer Financial Protection Bureau) audits bank overdraft revenue aggressively. Incorrectly billing a customer who qualifies for a waiver triggers regulatory consent decrees and multi-million dollar class-action refunds.",
        learningFocus: [
          "Multi-branch conditional logic using ordered `CASE WHEN ... THEN ... ELSE ... END`",
          "Customer tier priority rules",
          "Boundary condition safety (`<= 50.00`, `<= 200.00`)"
        ],
        sampleSchema: "overdrawn_accounts (\n  account_number VARCHAR(16) PRIMARY KEY,\n  client_tier VARCHAR(20),\n  negative_balance_usd DECIMAL(10,2)\n)",
        realWorldTrap: "In SQL `CASE WHEN` evaluations, order of operations matters! The engine stops evaluating at the FIRST matching branch. If you put `negative_balance_usd > 50` before `negative_balance_usd > 200`, accounts with -$500 will incorrectly match the $50 tier.",
        interviewRelevance: "Tiered logic questions test whether you understand deterministic left-to-right branch evaluation in SQL engines."
      },
      schema: "overdrawn_accounts",
      challenge: {
        instruction: "Use a CASE WHEN expression to assign the correct overdraft fee based on client tier and negative balance depth.",
        template: "SELECT account_number, client_tier, negative_balance_usd,\n       CASE\n         WHEN client_tier IN ('Private Bank', 'Chase Sapphire') THEN ___1___\n         WHEN negative_balance_usd <= 50.00 THEN ___2___\n         WHEN negative_balance_usd <= 200.00 THEN ___3___\n         ELSE ___4___\n       END AS fee_assessed_usd\nFROM overdrawn_accounts;",
        blanks: [
          { id: 1, label: "VIP Waiver Fee", answer: "0.00", options: ["0.00", "15.00", "34.00", "NULL"] },
          { id: 2, label: "Cushion Fee", answer: "0.00", options: ["0.00", "15.00", "34.00", "50.00"] },
          { id: 3, label: "Tier 1 Fee", answer: "15.00", options: ["15.00", "0.00", "34.00", "25.00"] },
          { id: 4, label: "Max Fee", answer: "34.00", options: ["34.00", "50.00", "15.00", "0.00"] }
        ],
        expectedSql: "SELECT account_number, client_tier, negative_balance_usd, CASE WHEN client_tier IN ('Private Bank', 'Chase Sapphire') THEN 0.00 WHEN negative_balance_usd <= 50.00 THEN 0.00 WHEN negative_balance_usd <= 200.00 THEN 15.00 ELSE 34.00 END AS fee_assessed_usd FROM overdrawn_accounts;",
        managerReview: "Flawless! The billing run applied cleanly across 45,000 accounts with 100% compliance accuracy against CFPB stipulations."
      }
    },
    {
      day: 6,
      week: 1,
      phase: "Week 1: Core Banking Ledgers & Reconciliation",
      title: "Day 06: Global Settlement Cutoff & Multi-Timezone Normalization",
      sender: "Marcus Sterling",
      senderRole: "Managing Director, Global Treasury Operations",
      senderAvatar: "👔",
      priority: "P1 - Cutoff Integrity",
      department: "Global Treasury & Liquidity Clearing",
      symphonyMessage: "Our international branches in London, Tokyo, and New York initiate interbank settlement payments in local timestamps. Fedwire closes at 18:30:00 US Eastern Time (UTC-5 in winter, UTC-4 in summer). To determine which trades qualified for same-day value, we must convert all transaction timestamps to UTC, then identify trades booked after local 17:00 but before Fedwire close.",
      contextReport: {
        businessWhy: "Timing cutoff disputes between banks account for significant overnight borrowing expenses. If a $200M transfer misses the cutoff by 3 seconds, JPMorgan must fund the overnight shortfall on the repo market at Federal Funds rate.",
        learningFocus: [
          "Timezone conversion using `CONVERT_TZ(local_ts, source_tz, target_tz)`",
          "Extracting hour and minute parts or filtering with time literals",
          "Detecting edge-of-window trade clusters"
        ],
        sampleSchema: "interbank_payments (\n  payment_id BIGINT PRIMARY KEY,\n  originating_branch VARCHAR(10),\n  branch_tz VARCHAR(30),\n  local_timestamp DATETIME,\n  amount_usd DECIMAL(18,2)\n)",
        realWorldTrap: "Never compare raw `DATETIME` strings across different jurisdictions without explicit timezone conversion! '2026-10-04 17:00:00' in Tokyo is 04:00:00 in New York.",
        interviewRelevance: "Global banks always evaluate candidates on temporal arithmetic and timezone normalization."
      },
      schema: "interbank_payments",
      challenge: {
        instruction: "Convert local timestamps to UTC using CONVERT_TZ, and filter for payments converted to UTC on 2026-10-03 between 21:00:00 and 22:30:00 UTC.",
        template: "SELECT payment_id, originating_branch, local_timestamp,\n       CONVERT_TZ(local_timestamp, branch_tz, ___1___) AS utc_timestamp,\n       amount_usd\nFROM interbank_payments\nWHERE CONVERT_TZ(local_timestamp, branch_tz, ___2___) >= '2026-10-03 21:00:00'\n  AND CONVERT_TZ(local_timestamp, branch_tz, ___3___) <= '2026-10-03 22:30:00';",
        blanks: [
          { id: 1, label: "Target Timezone", answer: "'+00:00'", options: ["'+00:00'", "'UTC'", "'GMT'", "'+05:00'"] },
          { id: 2, label: "Filter TZ 1", answer: "'+00:00'", options: ["'+00:00'", "'UTC'", "'EST'", "'EDT'"] },
          { id: 3, label: "Filter TZ 2", answer: "'+00:00'", options: ["'+00:00'", "'UTC'", "'EST'", "'EDT'"] }
        ],
        expectedSql: "SELECT payment_id, originating_branch, local_timestamp, CONVERT_TZ(local_timestamp, branch_tz, '+00:00') AS utc_timestamp, amount_usd FROM interbank_payments WHERE CONVERT_TZ(local_timestamp, branch_tz, '+00:00') >= '2026-10-03 21:00:00' AND CONVERT_TZ(local_timestamp, branch_tz, '+00:00') <= '2026-10-03 22:30:00';",
        managerReview: "Outstanding! You isolated 14 trades from the London desk that arrived 4 minutes before closing, saving $128,000 in overnight repo interest charges."
      }
    },
    {
      day: 7,
      week: 1,
      phase: "Week 1: Core Banking Ledgers & Reconciliation",
      title: "Day 07: Weekend General Ledger Roll & Executive Cash Summary",
      sender: "Marcus Sterling",
      senderRole: "Managing Director, Global Treasury Operations",
      senderAvatar: "👔",
      priority: "P1 - Executive Deck",
      department: "Office of the Chief Financial Officer",
      symphonyMessage: "Friday evening ledger close! The CFO needs an executive breakdown of our corporate cash reserves grouped by Asset Class and Currency. Include subtotals per asset class and a grand total across all reserves using `WITH ROLLUP`.",
      contextReport: {
        businessWhy: "Senior leadership needs macro views of bank solvency without running 10 separate queries. SQL's `WITH ROLLUP` modifier generates hierarchical sub-aggregates directly in the engine, cutting database roundtrips.",
        learningFocus: [
          "Hierarchical multidimensional aggregations using `GROUP BY col1, col2 WITH ROLLUP`",
          "Handling generated `NULL` rollup rows using `COALESCE(col, 'ALL')`",
          "Formatting high-level executive summaries"
        ],
        sampleSchema: "cash_reserves (\n  reserve_id INT PRIMARY KEY,\n  asset_class VARCHAR(30),\n  currency VARCHAR(3),\n  amount_usd DECIMAL(18,2)\n)",
        realWorldTrap: "When using `WITH ROLLUP`, the super-aggregate rows contain `NULL` in the grouped columns. If you do not wrap them with `COALESCE(asset_class, 'TOTAL')`, downstream dashboard tools may break or misinterpret `NULL` as missing data!",
        interviewRelevance: "Understanding `WITH ROLLUP` and `GROUPING()` proves you can write executive-grade analytical SQL beyond simple `GROUP BY`."
      },
      schema: "cash_reserves",
      challenge: {
        instruction: "Aggregate total reserves by asset_class and currency using WITH ROLLUP, wrapping null groupings with COALESCE.",
        template: "SELECT COALESCE(asset_class, 'GRAND TOTAL') AS asset_class,\n       COALESCE(currency, 'ALL CURRENCIES') AS currency,\n       SUM(amount_usd) AS total_reserve_usd\nFROM cash_reserves\nGROUP BY ___1___, ___2___ WITH ___3___;",
        blanks: [
          { id: 1, label: "Primary Group", answer: "asset_class", options: ["asset_class", "currency", "reserve_id", "amount_usd"] },
          { id: 2, label: "Secondary Group", answer: "currency", options: ["currency", "asset_class", "total_reserve_usd", "status"] },
          { id: 3, label: "Rollup Clause", answer: "ROLLUP", options: ["ROLLUP", "CUBE", "TOTALS", "SUM"] }
        ],
        expectedSql: "SELECT COALESCE(asset_class, 'GRAND TOTAL') AS asset_class, COALESCE(currency, 'ALL CURRENCIES') AS currency, SUM(amount_usd) AS total_reserve_usd FROM cash_reserves GROUP BY asset_class, currency WITH ROLLUP;",
        managerReview: "Magnificent! The CFO presented your exact summary table to the Board of Directors this morning. Congratulations on completing Week 1 of your investment banking rotation!"
      }
    }
  ];

  window.JPMORGAN_ANALYST_STORY_DATA = JPMORGAN_STORY_DATA;

})(typeof window !== 'undefined' ? window : global);
