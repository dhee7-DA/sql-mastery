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
    },

    // ---------------------------------------------------------------------------
    // WEEK 2: FINANCIAL CRIMES & AML SURVEILLANCE (DAYS 08 - 14)
    // ---------------------------------------------------------------------------
    {
      day: 8,
      week: 2,
      phase: "Week 2: AML & Financial Crime Surveillance",
      title: "Day 08: Cash Structuring & Smurfing Surveillance",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P1 - FinCEN Compliance",
      department: "Global Anti-Money Laundering (AML)",
      symphonyMessage: "Under federal Bank Secrecy Act (BSA) rules, banks must file a Currency Transaction Report (CTR) for cash deposits exceeding $10,000. 'Smurfs' intentionally deposit amounts between $9,000 and $9,999 in rapid succession to evade automatic filings. Find all accounts with 3 or more cash deposits between $9,000 and $9,999 in the past 72 hours.",
      contextReport: {
        businessWhy: "Structuring is a federal crime under 31 U.S.C. § 5324. Banks face catastrophic regulatory penalties (e.g. hundreds of millions in fines) if surveillance algorithms fail to detect deliberate structuring patterns designed to evade CTR filings.",
        learningFocus: [
          "Narrow boundary range filtering: `amount_usd BETWEEN 9000.00 AND 9999.99`",
          "Grouping by customer or account: `GROUP BY account_number`",
          "Threshold frequency filtering: `HAVING COUNT(*) >= 3`",
          "Summing cumulative structured cash: `SUM(amount_usd)`"
        ],
        sampleSchema: "cash_transactions (\n  txn_id VARCHAR(32) PRIMARY KEY,\n  account_number VARCHAR(16),\n  channel VARCHAR(20),\n  amount_usd DECIMAL(12,2),\n  booked_at TIMESTAMP\n)",
        realWorldTrap: "Do not use `amount_usd >= 9000 AND amount_usd <= 10000`! Exactly $10,000 automatically triggers a mandatory CTR in core banking systems. Structurers specifically deposit strictly BELOW $10,000 (up to $9,999.99).",
        interviewRelevance: "AML cash structuring is the classic compliance interview problem asked at JPMorgan, Citi, and HSBC compliance intelligence desks."
      },
      schema: "cash_transactions",
      challenge: {
        instruction: "Identify accounts with at least 3 cash deposits between $9,000 and $9,999.99 within the 72-hour audit window, displaying deposit count and total cash sum.",
        template: "SELECT account_number,\n       COUNT(*) AS deposit_count,\n       SUM(amount_usd) AS total_structured_cash\nFROM cash_transactions\nWHERE channel = 'BRANCH_CASH'\n  AND amount_usd BETWEEN ___1___ AND ___2___\n  AND booked_at >= '2026-10-01 00:00:00'\nGROUP BY ___3___\nHAVING COUNT(*) >= ___4___;",
        blanks: [
          { id: 1, label: "Lower Bound", answer: "9000.00", options: ["9000.00", "0.00", "5000.00", "10000.00"] },
          { id: 2, label: "Upper Bound", answer: "9999.99", options: ["9999.99", "10000.00", "9500.00", "100000.00"] },
          { id: 3, label: "Group Key", answer: "account_number", options: ["account_number", "channel", "txn_id", "amount_usd"] },
          { id: 4, label: "Min Frequency", answer: "3", options: ["3", "1", "5", "10"] }
        ],
        expectedSql: "SELECT account_number, COUNT(*) AS deposit_count, SUM(amount_usd) AS total_structured_cash FROM cash_transactions WHERE channel = 'BRANCH_CASH' AND amount_usd BETWEEN 9000.00 AND 9999.99 AND booked_at >= '2026-10-01 00:00:00' GROUP BY account_number HAVING COUNT(*) >= 3;",
        managerReview: "Incredible vigilance! You uncovered an organized ring structuring $78,400 across 8 deposits in Midtown branches. A SAR was escalated to FinCEN within 2 hours."
      }
    },
    {
      day: 9,
      week: 2,
      phase: "Week 2: AML & Financial Crime Surveillance",
      title: "Day 09: Impossible Geolocation Debit Card Swipes",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P1 - Real-Time Fraud",
      department: "Card Fraud Analytics",
      symphonyMessage: "Our real-time fraud scoring engine alerts whenever two point-of-sale card swipes on the same card occur within 30 minutes in different cities over 500 miles apart. Use the `LAG()` window function to calculate the time and distance delta between consecutive swipes on the same card.",
      contextReport: {
        businessWhy: "Impossible speed velocity is the clearest fingerprint of counterfeit cloned debit cards. A card physical swipe in London followed 12 minutes later by a swipe in Miami indicates physical card replication.",
        learningFocus: [
          "Navigating consecutive transactions using `LAG(col, 1) OVER (PARTITION BY card_id ORDER BY swipe_time)`",
          "Computing time difference in minutes: `TIMESTAMPDIFF(MINUTE, prev_time, current_time)`",
          "Filtering on consecutive velocity anomalies"
        ],
        sampleSchema: "card_swipes (\n  swipe_id BIGINT PRIMARY KEY,\n  card_id VARCHAR(20),\n  city VARCHAR(50),\n  country VARCHAR(3),\n  amount_usd DECIMAL(10,2),\n  swipe_time TIMESTAMP\n)",
        realWorldTrap: "Always `PARTITION BY card_id`! If you omit the partition, `LAG()` will grab the swipe from an entirely different cardholder who swiped right before in the global chronological stream.",
        interviewRelevance: "Window functions with temporal offsets (`LAG`/`LEAD`) are universal favorites in fintech fraud detection interviews."
      },
      schema: "card_swipes",
      challenge: {
        instruction: "Use LAG to pull the previous swipe's city and timestamp per card, filtering for consecutive swipes occurring within 30 minutes in different cities.",
        template: "WITH swipe_sequence AS (\n  SELECT swipe_id, card_id, city, swipe_time, amount_usd,\n         LAG(city, 1) OVER (PARTITION BY ___1___ ORDER BY ___2___) AS prev_city,\n         LAG(swipe_time, 1) OVER (PARTITION BY ___3___ ORDER BY ___4___) AS prev_time\n  FROM card_swipes\n)\nSELECT card_id, city, prev_city, swipe_time, prev_time,\n       TIMESTAMPDIFF(MINUTE, prev_time, swipe_time) AS diff_minutes\nFROM swipe_sequence\nWHERE prev_city IS NOT NULL\n  AND city != prev_city\n  AND TIMESTAMPDIFF(MINUTE, prev_time, swipe_time) <= 30;",
        blanks: [
          { id: 1, label: "Partition Key 1", answer: "card_id", options: ["card_id", "city", "amount_usd", "swipe_id"] },
          { id: 2, label: "Sort Key 1", answer: "swipe_time", options: ["swipe_time", "amount_usd", "city", "card_id"] },
          { id: 3, label: "Partition Key 2", answer: "card_id", options: ["card_id", "city", "amount_usd", "swipe_id"] },
          { id: 4, label: "Sort Key 2", answer: "swipe_time", options: ["swipe_time", "amount_usd", "city", "card_id"] }
        ],
        expectedSql: "WITH swipe_sequence AS (SELECT swipe_id, card_id, city, swipe_time, amount_usd, LAG(city, 1) OVER (PARTITION BY card_id ORDER BY swipe_time) AS prev_city, LAG(swipe_time, 1) OVER (PARTITION BY card_id ORDER BY swipe_time) AS prev_time FROM card_swipes) SELECT card_id, city, prev_city, swipe_time, prev_time, TIMESTAMPDIFF(MINUTE, prev_time, swipe_time) AS diff_minutes FROM swipe_sequence WHERE prev_city IS NOT NULL AND city != prev_city AND TIMESTAMPDIFF(MINUTE, prev_time, swipe_time) <= 30;",
        managerReview: "Sensational! The alert intercepted an active ATM cloning skimming scheme in Paris and New York, blocking 28 compromised cards before withdrawal completion."
      }
    },
    {
      day: 10,
      week: 2,
      phase: "Week 2: AML & Financial Crime Surveillance",
      title: "Day 10: OFAC Sanctions Screening with Phonetic SOUNDEX",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P1 - Sanctions Breach",
      department: "Sanctions & Geopolitical Compliance",
      symphonyMessage: "International bad actors often misspell their names slightly on wire beneficiary instructions (e.g. 'Aleksandr' vs 'Alexander', or 'Kovalev' vs 'Kovalyov') to evade exact string matches. Match yesterday's wire beneficiaries against the Treasury OFAC Specially Designated Nationals (SDN) list using SQL `SOUNDEX()`.",
      contextReport: {
        businessWhy: "Processing a wire payment for an individual on the US Treasury OFAC sanctions list violates the Trading with the Enemy Act. Past infractions have resulted in multi-billion dollar deferred prosecution agreements.",
        learningFocus: [
          "Phonetic string algorithm matching using `SOUNDEX(col)`",
          "Joining transaction tables against government watchlist reference lists",
          "Isolating high-risk cross-border wire tranches"
        ],
        sampleSchema: "wire_beneficiaries (\n  payment_ref VARCHAR(32) PRIMARY KEY,\n  beneficiary_name VARCHAR(100),\n  country_code VARCHAR(3),\n  amount_usd DECIMAL(15,2)\n)\nofac_sdn_list (\n  sdn_id INT PRIMARY KEY,\n  sdn_name VARCHAR(100),\n  program VARCHAR(50)\n)",
        realWorldTrap: "SOUNDEX is English-phonetic centric. In production, Tier-1 banks pair SOUNDEX with Double Metaphone or Jaro-Winkler distance, but SOUNDEX provides the foundational first-pass triage filter.",
        interviewRelevance: "Sanctions screening SQL tests string manipulation and fuzzy matching skills critical for compliance analytics."
      },
      schema: "wire_beneficiaries",
      challenge: {
        instruction: "Join wire beneficiaries against the OFAC sanctions list where SOUNDEX of beneficiary name matches SOUNDEX of the sanctioned individual.",
        template: "SELECT b.payment_ref, b.beneficiary_name, s.sdn_name, s.program, b.amount_usd\nFROM wire_beneficiaries b\nINNER JOIN ofac_sdn_list s\n  ON ___1___(b.beneficiary_name) = ___2___(s.sdn_name)\nWHERE b.amount_usd >= ___3___;",
        blanks: [
          { id: 1, label: "Left Phonetic", answer: "SOUNDEX", options: ["SOUNDEX", "UPPER", "LOWER", "LENGTH"] },
          { id: 2, label: "Right Phonetic", answer: "SOUNDEX", options: ["SOUNDEX", "TRIM", "REVERSE", "CONCAT"] },
          { id: 3, label: "Minimum Threshold", answer: "50000.00", options: ["50000.00", "0.00", "100.00", "1000.00"] }
        ],
        expectedSql: "SELECT b.payment_ref, b.beneficiary_name, s.sdn_name, s.program, b.amount_usd FROM wire_beneficiaries b INNER JOIN ofac_sdn_list s ON SOUNDEX(b.beneficiary_name) = SOUNDEX(s.sdn_name) WHERE b.amount_usd >= 50000.00;",
        managerReview: "Critical capture! You stopped a $1.4M escrow transfer destined for an alias of an arms trafficking entity. Legal and Compliance commended your precision."
      }
    },
    {
      day: 11,
      week: 2,
      phase: "Week 2: AML & Financial Crime Surveillance",
      title: "Day 11: Mule Account Rapid Pass-Through Surveillance",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P2 - Mule Network",
      department: "Financial Crimes Surveillance",
      symphonyMessage: "Money mules receive stolen funds and wire them out almost immediately, keeping little to no balance. Identify accounts that received $50,000+ in incoming wire credits within the same calendar day that also sent out $50,000+ in debits, leaving an ending delta of under $2,000.",
      contextReport: {
        businessWhy: "Mule accounts are temporary conduits. Money launderers pay university students or compromised individuals to use their retail accounts as pass-throughs. Catching the 'rapid zero-balance pass-through' profile neutralizes the cash-out pipeline.",
        learningFocus: [
          "Multi-metric conditional aggregation within CTEs",
          "Comparing inflow vs outflow velocities: `ABS(total_in - total_out)`",
          "Filter by ending retention ratio"
        ],
        sampleSchema: "intraday_transfers (\n  transfer_id BIGINT PRIMARY KEY,\n  account_number VARCHAR(16),\n  direction ENUM('INFLOW', 'OUTFLOW'),\n  amount_usd DECIMAL(12,2),\n  transferred_at TIMESTAMP\n)",
        realWorldTrap: "Watch out for NULL sums! If an account had only inflows, `SUM(OUTFLOW)` is `NULL`. Always use `COALESCE(SUM(...), 0)` to prevent the difference calculation from returning `NULL`.",
        interviewRelevance: "Testing pass-through volume ratios demonstrates your ability to analyze two-sided cash flows in SQL."
      },
      schema: "intraday_transfers",
      challenge: {
        instruction: "Calculate total inflows and outflows per account, filtering for accounts with inflows >= 50k, outflows >= 50k, and net retained delta under 2k.",
        template: "SELECT account_number,\n       SUM(CASE WHEN direction = 'INFLOW' THEN amount_usd ELSE 0 END) AS total_inflow,\n       SUM(CASE WHEN direction = 'OUTFLOW' THEN amount_usd ELSE 0 END) AS total_outflow,\n       ABS(SUM(CASE WHEN direction = 'INFLOW' THEN amount_usd ELSE -amount_usd END)) AS retained_delta\nFROM intraday_transfers\nWHERE transferred_at >= '2026-10-04 00:00:00'\nGROUP BY ___1___\nHAVING total_inflow >= ___2___\n   AND total_outflow >= ___3___\n   AND retained_delta <= ___4___;",
        blanks: [
          { id: 1, label: "Group Key", answer: "account_number", options: ["account_number", "direction", "transfer_id", "amount_usd"] },
          { id: 2, label: "Inflow Floor", answer: "50000.00", options: ["50000.00", "10000.00", "1000.00", "0.00"] },
          { id: 3, label: "Outflow Floor", answer: "50000.00", options: ["50000.00", "10000.00", "1000.00", "0.00"] },
          { id: 4, label: "Max Retained Delta", answer: "2000.00", options: ["2000.00", "5000.00", "10000.00", "500.00"] }
        ],
        expectedSql: "SELECT account_number, SUM(CASE WHEN direction = 'INFLOW' THEN amount_usd ELSE 0 END) AS total_inflow, SUM(CASE WHEN direction = 'OUTFLOW' THEN amount_usd ELSE 0 END) AS total_outflow, ABS(SUM(CASE WHEN direction = 'INFLOW' THEN amount_usd ELSE -amount_usd END)) AS retained_delta FROM intraday_transfers WHERE transferred_at >= '2026-10-04 00:00:00' GROUP BY account_number HAVING total_inflow >= 50000.00 AND total_outflow >= 50000.00 AND retained_delta <= 2000.00;",
        managerReview: "Superb analytical insight. You identified 6 classic mule accounts linked to an overseas romance scam syndicate. Accounts frozen and referred to federal authorities."
      }
    },
    {
      day: 12,
      week: 2,
      phase: "Week 2: AML & Financial Crime Surveillance",
      title: "Day 12: Crypto Exchange On/Off-Ramp Flow Aggregation",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P2 - Regulatory Monitor",
      department: "Digital Assets Risk",
      symphonyMessage: "Our Digital Assets risk desk needs to monitor institutional fiat ramps into cryptocurrency exchanges. Aggregate the total volume and average transaction size sent to our top 5 crypto partners (Coinbase, Kraken, Gemini, Bitstamp, BinanceUS) over the last 30 days, ranking by gross fiat volume.",
      contextReport: {
        businessWhy: "Banking regulators scrutinize bank liquidity exposure to crypto exchange settlement windows. Tracking 30-day cumulative outflows ensures reserve liquidity is never caught in exchange freezes.",
        learningFocus: [
          "`IN (...)` set membership filtering",
          "`COUNT(DISTINCT account_number)` to measure unique client exposure",
          "`RANK() OVER (ORDER BY SUM(amount_usd) DESC)` ranking"
        ],
        sampleSchema: "crypto_fiat_transfers (\n  transfer_id VARCHAR(32) PRIMARY KEY,\n  account_number VARCHAR(16),\n  exchange_name VARCHAR(50),\n  amount_usd DECIMAL(14,2),\n  transferred_at DATE\n)",
        realWorldTrap: "Don't confuse `COUNT(*)` with `COUNT(DISTINCT account_number)`. One heavy trading bot could submit 5,000 transactions; counting unique accounts reveals true consumer breadth.",
        interviewRelevance: "Aggregating flows into specific counterparty sets using `COUNT(DISTINCT)` is common across both traditional finance and fintech."
      },
      schema: "crypto_fiat_transfers",
      challenge: {
        instruction: "Query gross volume, transaction count, and unique client count per crypto exchange, ranked by total volume descending.",
        template: "SELECT exchange_name,\n       COUNT(*) AS total_transfers,\n       COUNT(DISTINCT account_number) AS unique_clients,\n       SUM(amount_usd) AS gross_fiat_usd,\n       RANK() OVER (ORDER BY SUM(amount_usd) DESC) AS volume_rank\nFROM crypto_fiat_transfers\nWHERE exchange_name IN (___1___)\nGROUP BY ___2___;",
        blanks: [
          { id: 1, label: "Exchange List", answer: "'Coinbase', 'Kraken', 'Gemini', 'Bitstamp', 'BinanceUS'", options: ["'Coinbase', 'Kraken', 'Gemini', 'Bitstamp', 'BinanceUS'", "'ALL'", "'Crypto'", "'USD'"] },
          { id: 2, label: "Grouping Column", answer: "exchange_name", options: ["exchange_name", "account_number", "transfer_id", "volume_rank"] }
        ],
        expectedSql: "SELECT exchange_name, COUNT(*) AS total_transfers, COUNT(DISTINCT account_number) AS unique_clients, SUM(amount_usd) AS gross_fiat_usd, RANK() OVER (ORDER BY SUM(amount_usd) DESC) AS volume_rank FROM crypto_fiat_transfers WHERE exchange_name IN ('Coinbase', 'Kraken', 'Gemini', 'Bitstamp', 'BinanceUS') GROUP BY exchange_name;",
        managerReview: "Clean and robust query. The Digital Assets Risk committee incorporated your volume rankings directly into their monthly Federal Reserve board packet."
      }
    },
    {
      day: 13,
      week: 2,
      phase: "Week 2: AML & Financial Crime Surveillance",
      title: "Day 13: Politically Exposed Persons (PEP) High-Risk Surcharges",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P1 - Regulatory Compliance",
      department: "Wealth Management Compliance",
      symphonyMessage: "Under Patriot Act Section 312, wires involving Politically Exposed Persons (PEPs) require enhanced due diligence (EDD) fees and specialized risk scoring. Write a query that assesses a 0.25% surcharge (minimum $250.00) on all outbound international wires ordered by PEP clients.",
      contextReport: {
        businessWhy: "Foreign senior political figures carry inherent bribery and kleptocracy risk. Automated calculation of mandatory EDD fees ensures compliance costs are accurately factored into institutional private wealth contracts.",
        learningFocus: [
          "Mathematical maximums: `GREATEST(calculated_fee, minimum_floor)`",
          "Joining customer risk profiles to transactions",
          "Applying conditional fee logic"
        ],
        sampleSchema: "clients (\n  client_id VARCHAR(20) PRIMARY KEY,\n  full_name VARCHAR(100),\n  is_pep BOOLEAN,\n  jurisdiction VARCHAR(50)\n)\noutbound_international_wires (\n  wire_id VARCHAR(32) PRIMARY KEY,\n  client_id VARCHAR(20),\n  amount_usd DECIMAL(14,2),\n  destination_country VARCHAR(3)\n)",
        realWorldTrap: "Never use `MAX()` when you mean `GREATEST()`! `MAX()` is an aggregate function across multiple rows; `GREATEST(a, b)` selects the larger of two column or scalar expressions within the SAME row.",
        interviewRelevance: "Differentiating between column-level `GREATEST()`/`LEAST()` and table-level `MAX()`/`MIN()` is a frequent SQL gotcha tested by interviewers."
      },
      schema: "clients",
      challenge: {
        instruction: "Join PEP clients to outbound wires and compute the EDD surcharge as GREATEST(amount * 0.0025, 250.00).",
        template: "SELECT c.client_id, c.full_name, w.wire_id, w.amount_usd,\n       ___1___(ROUND(w.amount_usd * 0.0025, 2), ___2___) AS edd_surcharge_usd\nFROM clients c\nINNER JOIN outbound_international_wires w\n  ON c.client_id = w.client_id\nWHERE c.is_pep = 1;",
        blanks: [
          { id: 1, label: "Row Maximum Function", answer: "GREATEST", options: ["GREATEST", "MAX", "CEIL", "ROUND"] },
          { id: 2, label: "Minimum Floor", answer: "250.00", options: ["250.00", "0.00", "100.00", "500.00"] }
        ],
        expectedSql: "SELECT c.client_id, c.full_name, w.wire_id, w.amount_usd, GREATEST(ROUND(w.amount_usd * 0.0025, 2), 250.00) AS edd_surcharge_usd FROM clients c INNER JOIN outbound_international_wires w ON c.client_id = w.client_id WHERE c.is_pep = 1;",
        managerReview: "Masterful SQL. The automated billing ledger billed $215,000 in due diligence fees across 180 high-net-worth foreign political accounts with zero billing errors."
      }
    },
    {
      day: 14,
      week: 2,
      phase: "Week 2: AML & Financial Crime Surveillance",
      title: "Day 14: Automated FinCEN Suspicious Activity Report (SAR) Aggregator",
      sender: "Elena Vance",
      senderRole: "Executive Director, Financial Crimes Surveillance",
      senderAvatar: "🕵️‍♀️",
      priority: "P1 - Regulatory Submission",
      department: "Legal & Regulatory Affairs",
      symphonyMessage: "End of Week 2! We must compile our weekly SAR batch filing for the Financial Crimes Enforcement Network (FinCEN). Aggregate all flagged suspicious activities by branch code, concatenating transaction IDs with `GROUP_CONCAT()`, counting the total suspicious transactions, and computing gross illicit exposure.",
      contextReport: {
        businessWhy: "FinCEN filings require structured summaries detailing total compromised dollars and listing all related transaction IDs in a single audit payload row.",
        learningFocus: [
          "String aggregation using `GROUP_CONCAT(txn_id ORDER BY amount_usd DESC SEPARATOR '; ')`",
          "Grouping by institutional branch",
          "Calculating total branch risk exposure"
        ],
        sampleSchema: "sar_flagged_transactions (\n  txn_id VARCHAR(32) PRIMARY KEY,\n  branch_code VARCHAR(10),\n  suspicion_reason VARCHAR(100),\n  amount_usd DECIMAL(14,2)\n)",
        realWorldTrap: "Beware of `GROUP_CONCAT` character truncation! MySQL has a default `group_concat_max_len` of 1024 bytes. In high-volume compliance queries, ensure you order by `amount_usd DESC` so the biggest transactions are listed first.",
        interviewRelevance: "`GROUP_CONCAT()` (or `STRING_AGG()` in Postgres/SQL Server) is essential for data de-normalization and reporting pipelines."
      },
      schema: "sar_flagged_transactions",
      challenge: {
        instruction: "Aggregate flagged transactions by branch_code, generating a semicolon-separated list of transaction IDs and total amount.",
        template: "SELECT branch_code,\n       COUNT(*) AS flagged_count,\n       SUM(amount_usd) AS total_suspicious_usd,\n       GROUP_CONCAT(txn_id ORDER BY amount_usd DESC SEPARATOR ___1___) AS transaction_ids\nFROM sar_flagged_transactions\nGROUP BY ___2___;",
        blanks: [
          { id: 1, label: "Separator String", answer: "'; '", options: ["'; '", "','", "' '", "'-'"] },
          { id: 2, label: "Group Key", answer: "branch_code", options: ["branch_code", "txn_id", "suspicion_reason", "amount_usd"] }
        ],
        expectedSql: "SELECT branch_code, COUNT(*) AS flagged_count, SUM(amount_usd) AS total_suspicious_usd, GROUP_CONCAT(txn_id ORDER BY amount_usd DESC SEPARATOR '; ') AS transaction_ids FROM sar_flagged_transactions GROUP BY branch_code;",
        managerReview: "Remarkable execution! The SAR packet was submitted to FinCEN cleanly. You have officially completed the AML rotation and earned promotion to Associate Analyst!"
      }
    },

    // ---------------------------------------------------------------------------
    // WEEK 3: ASSET & WEALTH MANAGEMENT, PORTFOLIO ALPHA (DAYS 15 - 21)
    // ---------------------------------------------------------------------------
    {
      day: 15,
      week: 3,
      phase: "Week 3: Wealth Management & Portfolio Performance",
      title: "Day 15: Client Asset Tiering & High-Net-Worth Partitioning",
      sender: "Catherine Vance",
      senderRole: "Vice President, J.P. Morgan Private Bank",
      senderAvatar: "👩‍💼",
      priority: "P2 - Wealth Tiering",
      department: "Asset & Wealth Management",
      symphonyMessage: "Welcome to Private Wealth! We serve three distinct client tiers: Mass Affluent ($250k - $1M), High-Net-Worth ($1M - $10M), and Ultra-High-Net-Worth ($10M+). Use `NTILE(4)` to divide our Private Bank client base into 4 equal wealth quartiles, and assign them their formal tier label.",
      contextReport: {
        businessWhy: "Tiering dictates dedicated Private Banker allocation, bespoke structured notes access, and fee schedules. Wealth management revenue depends on precise quartile distribution modeling.",
        learningFocus: [
          "Quartile ranking using `NTILE(4) OVER (ORDER BY aum_usd DESC)`",
          "Nested CASE expressions for demographic labeling",
          "Client segmentation statistics"
        ],
        sampleSchema: "private_bank_clients (\n  client_id VARCHAR(20) PRIMARY KEY,\n  full_name VARCHAR(100),\n  aum_usd DECIMAL(16,2),\n  advisor_id VARCHAR(20)\n)",
        realWorldTrap: "Remember `NTILE(n)` creates buckets of roughly equal ROW counts, not equal DOLLAR intervals. To get dollar tiers, combine `NTILE` with `CASE WHEN aum_usd >= 10000000`.",
        interviewRelevance: "`NTILE()` is standard in financial analytics when stratifying clients, fund managers, or trading strategies into quartiles or deciles."
      },
      schema: "private_bank_clients",
      challenge: {
        instruction: "Assign each client a wealth quartile (1 to 4) using NTILE(4) ordered by AUM descending, along with their AUM tier label.",
        template: "SELECT client_id, full_name, aum_usd,\n       ___1___(4) OVER (ORDER BY aum_usd DESC) AS wealth_quartile,\n       CASE\n         WHEN aum_usd >= 10000000.00 THEN 'Ultra-High-Net-Worth (UHNW)'\n         WHEN aum_usd >= 1000000.00 THEN 'High-Net-Worth (HNW)'\n         ELSE 'Mass Affluent'\n       END AS tier_label\nFROM private_bank_clients;",
        blanks: [
          { id: 1, label: "Quartile Window Function", answer: "NTILE", options: ["NTILE", "RANK", "DENSE_RANK", "PERCENT_RANK"] }
        ],
        expectedSql: "SELECT client_id, full_name, aum_usd, NTILE(4) OVER (ORDER BY aum_usd DESC) AS wealth_quartile, CASE WHEN aum_usd >= 10000000.00 THEN 'Ultra-High-Net-Worth (UHNW)' WHEN aum_usd >= 1000000.00 THEN 'High-Net-Worth (HNW)' ELSE 'Mass Affluent' END AS tier_label FROM private_bank_clients;",
        managerReview: "Perfection! The Managing Directors utilized your quartile distribution table to balance client-to-advisor ratios across our New York and Palm Beach offices."
      }
    },
    {
      day: 16,
      week: 3,
      phase: "Week 3: Wealth Management & Portfolio Performance",
      title: "Day 16: Rolling Daily Portfolio Drawdown & High-Water Mark",
      sender: "Catherine Vance",
      senderRole: "Vice President, J.P. Morgan Private Bank",
      senderAvatar: "👩‍💼",
      priority: "P1 - Risk Metric",
      department: "Quantitative Portfolio Analytics",
      symphonyMessage: "Our flagship hedge fund portfolio strategy requires tracking Maximum Drawdown (MDD). For each portfolio on each trading day, calculate the historical 'High-Water Mark' (the maximum Net Asset Value achieved up to that day) and the current percentage drawdown from that peak.",
      contextReport: {
        businessWhy: "Drawdown measures risk tolerance. If an institutional fund drops 15% below its peak (high-water mark), performance fees are halted and risk limits trigger automated equity hedging.",
        learningFocus: [
          "Running maximum window frame: `MAX(nav) OVER (PARTITION BY portfolio_id ORDER BY trade_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`",
          "Percentage drawdown formula: `ROUND(((nav - peak_nav) / peak_nav) * 100, 2)`",
          "Time-series window frame dynamics"
        ],
        sampleSchema: "portfolio_daily_nav (\n  portfolio_id VARCHAR(20),\n  trade_date DATE,\n  nav DECIMAL(14,4),\n  PRIMARY KEY (portfolio_id, trade_date)\n)",
        realWorldTrap: "If you omit `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, standard `ORDER BY` defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. While similar, `ROWS` is much faster and handles duplicate timestamps unambiguously.",
        interviewRelevance: "High-water mark and drawdown window queries are mandatory technical questions for quant hedge fund and asset management roles."
      },
      schema: "portfolio_daily_nav",
      challenge: {
        instruction: "Calculate the running peak NAV and percentage drawdown per portfolio using MAX() OVER with UNBOUNDED PRECEDING.",
        template: "WITH portfolio_peaks AS (\n  SELECT portfolio_id, trade_date, nav,\n         ___1___(nav) OVER (\n           PARTITION BY portfolio_id \n           ORDER BY trade_date \n           ROWS BETWEEN ___2___ PRECEDING AND CURRENT ROW\n         ) AS high_water_mark\n  FROM portfolio_daily_nav\n)\nSELECT portfolio_id, trade_date, nav, high_water_mark,\n       ROUND(((nav - high_water_mark) / high_water_mark) * 100, 2) AS drawdown_pct\nFROM portfolio_peaks;",
        blanks: [
          { id: 1, label: "Peak Aggregate", answer: "MAX", options: ["MAX", "MIN", "AVG", "SUM"] },
          { id: 2, label: "Frame Boundary", answer: "UNBOUNDED", options: ["UNBOUNDED", "1", "10", "CURRENT"] }
        ],
        expectedSql: "WITH portfolio_peaks AS (SELECT portfolio_id, trade_date, nav, MAX(nav) OVER (PARTITION BY portfolio_id ORDER BY trade_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS high_water_mark FROM portfolio_daily_nav) SELECT portfolio_id, trade_date, nav, high_water_mark, ROUND(((nav - high_water_mark) / high_water_mark) * 100, 2) AS drawdown_pct FROM portfolio_peaks;",
        managerReview: "Flawless mathematical precision! Your drawdown model correctly identified that the Global Macro fund suffered an 8.4% pullback during the recent bond sell-off."
      }
    },
    {
      day: 17,
      week: 3,
      phase: "Week 3: Wealth Management & Portfolio Performance",
      title: "Day 17: Dividend Yield Ladder & Projected Cash Inflows",
      sender: "Catherine Vance",
      senderRole: "Vice President, J.P. Morgan Private Bank",
      senderAvatar: "👩‍💼",
      priority: "P2 - Cash Planning",
      department: "Equities Wealth Advisory",
      symphonyMessage: "Our Ultra-HNW clients live off quarterly dividend flows. Given our holdings table and ex-dividend schedule, calculate the projected dividend payout per client holding (`shares_held * dividend_per_share`), grouping by payment quarter to construct a cash ladder for Q4 2026.",
      contextReport: {
        businessWhy: "Private wealth advisors use cash flow ladders to ensure clients have sufficient liquidity for tax obligations and private equity capital calls without needing to liquidate equity positions.",
        learningFocus: [
          "Arithmetic products across joined tables: `h.shares_held * d.dividend_per_share`",
          "Quarterly temporal extraction using `QUARTER(d.payment_date)` and `YEAR(d.payment_date)`",
          "Grouping by client and settlement quarter"
        ],
        sampleSchema: "equity_holdings (\n  holding_id BIGINT PRIMARY KEY,\n  client_id VARCHAR(20),\n  ticker VARCHAR(10),\n  shares_held INT\n)\ndividend_announcements (\n  ticker VARCHAR(10),\n  dividend_per_share DECIMAL(8,4),\n  payment_date DATE\n)",
        realWorldTrap: "Watch for duplicate announcements! If a stock pays both a regular and special dividend in the same quarter, an un-aggregated join could double-count or cause fan-out. Always verify cardinality.",
        interviewRelevance: "Multi-table cash projection queries are essential for asset management portfolio accounting."
      },
      schema: "equity_holdings",
      challenge: {
        instruction: "Join holdings and dividend announcements to calculate total projected dividend income per client for Q4 2026.",
        template: "SELECT h.client_id,\n       COUNT(DISTINCT h.ticker) AS dividend_stocks_count,\n       SUM(h.shares_held * d.dividend_per_share) AS projected_dividend_payout\nFROM equity_holdings h\nINNER JOIN dividend_announcements d\n  ON h.ticker = d.ticker\nWHERE ___1___(d.payment_date) = 2026\n  AND ___2___(d.payment_date) = 4\nGROUP BY ___3___;",
        blanks: [
          { id: 1, label: "Year Function", answer: "YEAR", options: ["YEAR", "MONTH", "DAY", "DATE"] },
          { id: 2, label: "Quarter Function", answer: "QUARTER", options: ["QUARTER", "MONTH", "WEEK", "DAY"] },
          { id: 3, label: "Group Column", answer: "h.client_id", options: ["h.client_id", "h.ticker", "d.payment_date", "h.shares_held"] }
        ],
        expectedSql: "SELECT h.client_id, COUNT(DISTINCT h.ticker) AS dividend_stocks_count, SUM(h.shares_held * d.dividend_per_share) AS projected_dividend_payout FROM equity_holdings h INNER JOIN dividend_announcements d ON h.ticker = d.ticker WHERE YEAR(d.payment_date) = 2026 AND QUARTER(d.payment_date) = 4 GROUP BY h.client_id;",
        managerReview: "Spot-on calculations. The advisors used your Q4 income ladder to structure $45M in year-end municipal tax distributions for our family office clients."
      }
    },
    {
      day: 18,
      week: 3,
      phase: "Week 3: Wealth Management & Portfolio Performance",
      title: "Day 18: Weighted Average Duration for Fixed Income Portfolios",
      sender: "Rajiv Mehta",
      senderRole: "Chief Risk Officer, Market & Credit Risk",
      senderAvatar: "📊",
      priority: "P1 - Interest Rate Sensitivity",
      department: "Fixed Income Risk Management",
      symphonyMessage: "With the Federal Reserve adjusting benchmark interest rates, we must measure our bond portfolio's sensitivity. Calculate the Weighted Average Duration (WAD) per bond fund: `SUM(market_value * duration_years) / SUM(market_value)`. A 1% rate hike costs the fund approximately its duration in percentage loss.",
      contextReport: {
        businessWhy: "Macaulay and Modified Duration quantify interest rate risk. A bond portfolio with a duration of 8.5 years loses approximately 8.5% of its market value if Treasury yields rise by 100 basis points (1.00%).",
        learningFocus: [
          "Weighted average calculations: `SUM(weight * value) / SUM(weight)`",
          "Grouping by institutional portfolio/fund",
          "Rounding sensitivity metrics"
        ],
        sampleSchema: "bond_holdings (\n  position_id BIGINT PRIMARY KEY,\n  fund_name VARCHAR(50),\n  cusip VARCHAR(9),\n  market_value_usd DECIMAL(15,2),\n  duration_years DECIMAL(6,3)\n)",
        realWorldTrap: "Do NOT use `AVG(duration_years)`! A simple arithmetic average treats a tiny $10,000 position with 20-year duration the same as a $500,000,000 Treasury bill with 0.25-year duration. You MUST weight by market value.",
        interviewRelevance: "Weighted average calculations (Duration, Cost of Capital, Yield to Maturity) are required knowledge in fixed income quant interviews."
      },
      schema: "bond_holdings",
      challenge: {
        instruction: "Calculate total fund market value and weighted average duration per fund, rounded to 2 decimal places.",
        template: "SELECT fund_name,\n       COUNT(*) AS total_bond_positions,\n       SUM(market_value_usd) AS total_fund_value_usd,\n       ROUND(___1___(market_value_usd * duration_years) / ___2___(market_value_usd), 2) AS weighted_avg_duration\nFROM bond_holdings\nGROUP BY ___3___;",
        blanks: [
          { id: 1, label: "Numerator Sum", answer: "SUM", options: ["SUM", "AVG", "COUNT", "MAX"] },
          { id: 2, label: "Denominator Sum", answer: "SUM", options: ["SUM", "AVG", "COUNT", "TOTAL"] },
          { id: 3, label: "Grouping Key", answer: "fund_name", options: ["fund_name", "cusip", "position_id", "duration_years"] }
        ],
        expectedSql: "SELECT fund_name, COUNT(*) AS total_bond_positions, SUM(market_value_usd) AS total_fund_value_usd, ROUND(SUM(market_value_usd * duration_years) / SUM(market_value_usd), 2) AS weighted_avg_duration FROM bond_holdings GROUP BY fund_name;",
        managerReview: "Outstanding risk precision! You discovered the Short-Duration Income Fund had drifted to a 5.2-year duration due to long-dated agency debt. Risk desk re-balanced before FOMC announcement."
      }
    },
    {
      day: 19,
      week: 3,
      phase: "Week 3: Wealth Management & Portfolio Performance",
      title: "Day 19: Margin Call Liquidation Risk Radar",
      sender: "Rajiv Mehta",
      senderRole: "Chief Risk Officer, Market & Credit Risk",
      senderAvatar: "📊",
      priority: "P1 - Margin Breach",
      department: "Prime Brokerage & Margin Lending",
      symphonyMessage: "Our Prime Brokerage extends margin loans against client equity collateral. Under Regulation T and JPMorgan risk policy, clients must maintain at least 130% collateral coverage: `(collateral_market_value / margin_loan_balance) >= 1.30`. Identify all accounts currently in margin breach (< 130%) and calculate their dollar shortfall.",
      contextReport: {
        businessWhy: "In market drawdowns, leveraged accounts fall below maintenance margin rapidly. If the bank fails to issue margin calls or liquidate collateral in time, the borrower can default, leaving JPMorgan with unsecured bad debt.",
        learningFocus: [
          "Coverage ratio evaluation: `(collateral_value / loan_balance)`",
          "Shortfall dollar calculation: `(loan_balance * 1.30) - collateral_value`",
          "Emergency margin call prioritization"
        ],
        sampleSchema: "margin_accounts (\n  account_id VARCHAR(20) PRIMARY KEY,\n  client_name VARCHAR(100),\n  collateral_value_usd DECIMAL(14,2),\n  margin_loan_usd DECIMAL(14,2)\n)",
        realWorldTrap: "Beware of negative or zero loan balances! Always filter `WHERE margin_loan_usd > 0` before calculating the ratio, otherwise cash-positive accounts will trigger division by zero errors.",
        interviewRelevance: "Margin coverage logic tests financial ratio mathematics and defensive SQL filtering against zero-division errors."
      },
      schema: "margin_accounts",
      challenge: {
        instruction: "Find margin accounts where coverage ratio < 1.30, calculating the coverage percentage and exact dollar shortfall to reach 130%.",
        template: "SELECT account_id, client_name, collateral_value_usd, margin_loan_usd,\n       ROUND((collateral_value_usd / margin_loan_usd) * 100, 2) AS coverage_pct,\n       ROUND((margin_loan_usd * ___1___) - collateral_value_usd, 2) AS margin_call_shortfall_usd\nFROM margin_accounts\nWHERE margin_loan_usd > 0\n  AND (collateral_value_usd / margin_loan_usd) < ___2___;",
        blanks: [
          { id: 1, label: "Target Multiplier", answer: "1.30", options: ["1.30", "1.00", "0.30", "1.50"] },
          { id: 2, label: "Breach Threshold", answer: "1.30", options: ["1.30", "1.00", "0.80", "1.50"] }
        ],
        expectedSql: "SELECT account_id, client_name, collateral_value_usd, margin_loan_usd, ROUND((collateral_value_usd / margin_loan_usd) * 100, 2) AS coverage_pct, ROUND((margin_loan_usd * 1.30) - collateral_value_usd, 2) AS margin_call_shortfall_usd FROM margin_accounts WHERE margin_loan_usd > 0 AND (collateral_value_usd / margin_loan_usd) < 1.30;",
        managerReview: "Crucial intervention! You caught 3 hedge fund accounts breaching margin by $14.2M after tech stock earnings. Margin calls were dispatched within 10 minutes."
      }
    },
    {
      day: 20,
      week: 3,
      phase: "Week 3: Wealth Management & Portfolio Performance",
      title: "Day 20: Alpha Generation: Portfolio Returns vs S&P 500 Benchmark",
      sender: "Catherine Vance",
      senderRole: "Vice President, J.P. Morgan Private Bank",
      senderAvatar: "👩‍💼",
      priority: "P2 - Alpha Audit",
      department: "Quantitative Strategy & Alpha Research",
      symphonyMessage: "Our clients pay active management fees for 'Alpha' (returns in excess of the S&P 500 benchmark). Using monthly returns data, join our flagship equity strategies with the S&P 500 benchmark index table to compute the monthly excess return (Alpha = Portfolio Return - Benchmark Return) and identify which strategies outperformed.",
      contextReport: {
        businessWhy: "If an active equity portfolio generates 8% return when the S&P 500 generated 12%, its Alpha is negative (-4%). Clients will withdraw capital to low-cost index ETFs unless excess return consistently covers management fees.",
        learningFocus: [
          "Temporal multi-table joins matching on `month_year`",
          "Excess return subtraction: `(strat_return - bench_return)`",
          "Conditional outperformance counting"
        ],
        sampleSchema: "strategy_monthly_returns (\n  strategy_id VARCHAR(20),\n  strategy_name VARCHAR(50),\n  month_date DATE,\n  monthly_return_pct DECIMAL(6,4)\n)\nbenchmark_returns (\n  benchmark_name VARCHAR(20),\n  month_date DATE,\n  monthly_return_pct DECIMAL(6,4)\n)",
        realWorldTrap: "Join on BOTH month and year! If you join on `MONTH(s.month_date) = MONTH(b.month_date)` without checking `YEAR()`, October 2025 will accidentally join with October 2026.",
        interviewRelevance: "Benchmarking performance series is standard across wealth management, mutual funds, and endowments."
      },
      schema: "strategy_monthly_returns",
      challenge: {
        instruction: "Join strategy returns with S&P 500 benchmark on exact month_date, calculating active alpha as (s.monthly_return_pct - b.monthly_return_pct).",
        template: "SELECT s.strategy_name, s.month_date,\n       s.monthly_return_pct AS strategy_return,\n       b.monthly_return_pct AS benchmark_return,\n       ROUND((s.monthly_return_pct - b.monthly_return_pct), 4) AS alpha_spread\nFROM strategy_monthly_returns s\nINNER JOIN benchmark_returns b\n  ON s.month_date = ___1___\nWHERE b.benchmark_name = ___2___;",
        blanks: [
          { id: 1, label: "Join Key", answer: "b.month_date", options: ["b.month_date", "b.benchmark_name", "s.strategy_id", "s.strategy_name"] },
          { id: 2, label: "Benchmark Name", answer: "'S&P 500'", options: ["'S&P 500'", "'NASDAQ'", "'DOW'", "'RUSSELL'"] }
        ],
        expectedSql: "SELECT s.strategy_name, s.month_date, s.monthly_return_pct AS strategy_return, b.monthly_return_pct AS benchmark_return, ROUND((s.monthly_return_pct - b.monthly_return_pct), 4) AS alpha_spread FROM strategy_monthly_returns s INNER JOIN benchmark_returns b ON s.month_date = b.month_date WHERE b.benchmark_name = 'S&P 500';",
        managerReview: "Splendid work! The Alpha report proved the US Large Cap Tech Opportunities fund produced +380 bps of net alpha over the trailing 12 months."
      }
    },
    {
      day: 21,
      week: 3,
      phase: "Week 3: Wealth Management & Portfolio Performance",
      title: "Day 21: Private Bank Quarterly Executive Performance Dossier",
      sender: "Catherine Vance",
      senderRole: "Vice President, J.P. Morgan Private Bank",
      senderAvatar: "👩‍💼",
      priority: "P1 - Executive Presentation",
      department: "Private Bank Executive Committee",
      symphonyMessage: "End of Week 3! We are compiling the Q3 Private Bank Executive Committee deck. For each wealth advisor, compute their total managed AUM, average account size, and total fee revenue generated across all their assigned client accounts.",
      contextReport: {
        businessWhy: "Executive leadership uses advisor productivity metrics to allocate bonus pools and identify underperforming territories across global private banking hubs.",
        learningFocus: [
          "Relational multi-table joins between advisors and client accounts",
          "Multi-metric aggregation: `COUNT(client_id)`, `SUM(aum_usd)`, `AVG(aum_usd)`",
          "Fee revenue calculation: `SUM(aum_usd * fee_rate)`"
        ],
        sampleSchema: "wealth_advisors (\n  advisor_id VARCHAR(20) PRIMARY KEY,\n  advisor_name VARCHAR(100),\n  office_location VARCHAR(50)\n)\nclient_portfolios (\n  account_id VARCHAR(20) PRIMARY KEY,\n  advisor_id VARCHAR(20),\n  aum_usd DECIMAL(16,2),\n  annual_fee_bps INT\n)",
        realWorldTrap: "Watch your basis points (bps) conversion! 100 bps = 1.00% = 0.01. If an account has 65 bps, its multiplier is `65 / 10000 = 0.0065`. Multiplying by `65 / 100` would overbill the client by a factor of 100!",
        interviewRelevance: "Basis points math and advisor rollup reports are universal in banking analytics."
      },
      schema: "wealth_advisors",
      challenge: {
        instruction: "Join advisors and client portfolios to calculate total AUM, average AUM, and estimated annual fee revenue using annual_fee_bps / 10000.",
        template: "SELECT a.advisor_id, a.advisor_name, a.office_location,\n       COUNT(p.account_id) AS total_clients,\n       SUM(p.aum_usd) AS total_aum_usd,\n       ROUND(AVG(p.aum_usd), 2) AS avg_client_aum,\n       ROUND(SUM(p.aum_usd * (p.annual_fee_bps / ___1___)), 2) AS annual_fee_revenue_usd\nFROM wealth_advisors a\nLEFT JOIN client_portfolios p\n  ON a.advisor_id = p.advisor_id\nGROUP BY ___2___, ___3___, ___4___;",
        blanks: [
          { id: 1, label: "Bps Divisor", answer: "10000.0", options: ["10000.0", "100.0", "1000.0", "10.0"] },
          { id: 2, label: "Group Key 1", answer: "a.advisor_id", options: ["a.advisor_id", "p.account_id", "p.aum_usd", "total_clients"] },
          { id: 3, label: "Group Key 2", answer: "a.advisor_name", options: ["a.advisor_name", "p.account_id", "p.aum_usd", "total_clients"] },
          { id: 4, label: "Group Key 3", answer: "a.office_location", options: ["a.office_location", "p.account_id", "p.aum_usd", "total_clients"] }
        ],
        expectedSql: "SELECT a.advisor_id, a.advisor_name, a.office_location, COUNT(p.account_id) AS total_clients, SUM(p.aum_usd) AS total_aum_usd, ROUND(AVG(p.aum_usd), 2) AS avg_client_aum, ROUND(SUM(p.aum_usd * (p.annual_fee_bps / 10000.0)), 2) AS annual_fee_revenue_usd FROM wealth_advisors a LEFT JOIN client_portfolios p ON a.advisor_id = p.advisor_id GROUP BY a.advisor_id, a.advisor_name, a.office_location;",
        managerReview: "Sensational executive reporting! The Operating Committee praised the clarity of your numbers. You are officially promoted to Vice President, Wealth & Quantitative Analytics!"
      }
    },

    // ---------------------------------------------------------------------------
    // WEEK 4: MARKET RISK, TREASURY SOLVENCY & CAPSTONE (DAYS 22 - 30)
    // ---------------------------------------------------------------------------
    {
      day: 22,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 22: Historical Value at Risk (99% 1-Day VaR) on Swap Portfolios",
      sender: "Dr. Aris Thorne",
      senderRole: "Managing Director, Global Market Risk & Quantitative Research",
      senderAvatar: "🔬",
      priority: "P1 - Regulatory VaR",
      department: "Market Risk Analytics",
      symphonyMessage: "Markets are gyrating following the FOMC rate decision. Regulators require JPMorgan's Chief Risk Officer to submit our 99% 1-Day Historical Value at Risk (VaR) for interest rate swap books. Sort daily simulated portfolio PnLs in ascending order and rank them to identify the 1st percentile cutoff.",
      contextReport: {
        businessWhy: "Value at Risk (VaR) quantifies the minimum expected loss over a specific time horizon at a given confidence level. For 99% VaR over 250 trading days, the 1st percentile (worst 1% of outcomes, or the 2nd/3rd worst trading day) determines the capital reserves the bank must hold against trading losses.",
        learningFocus: [
          "Sorting returns/PnL distribution: `ORDER BY daily_pnl_usd ASC`",
          "Percentile ranking window functions: `PERCENT_RANK() OVER (ORDER BY daily_pnl_usd ASC)`",
          "Filtering at the 99% tail boundary: `WHERE percent_rank <= 0.01`",
          "Selecting worst-case cutoffs"
        ],
        sampleSchema: "swap_portfolio_pnl (\n  sim_id INT PRIMARY KEY,\n  trading_desk VARCHAR(30),\n  historical_date DATE,\n  daily_pnl_usd DECIMAL(16,2)\n)",
        realWorldTrap: "Do not confuse 99% confidence with the top 99%! VaR is a loss metric focused on the worst 1% tail of the loss distribution (the far left tail). Sorting in descending order would give you your best profit day rather than your catastrophic risk threshold!",
        interviewRelevance: "VaR is the universal risk metric across Goldman Sachs, Morgan Stanley, Citadel, and JPMorgan. Explaining how to calculate historical vs parametric VaR in SQL is an elite quant interview question."
      },
      schema: "swap_portfolio_pnl",
      challenge: {
        instruction: "Calculate the percentile rank of daily PnL for each trading desk ordered ascending, filtering for scenarios where the percentile rank is at or below 0.01 (99% VaR tail).",
        template: "WITH RankedPnL AS (\n  SELECT sim_id, trading_desk, historical_date, daily_pnl_usd,\n         PERCENT_RANK() OVER (\n           PARTITION BY ___1___\n           ORDER BY ___2___ ASC\n         ) AS pnl_percentile\n  FROM swap_portfolio_pnl\n)\nSELECT trading_desk, MIN(daily_pnl_usd) AS worst_loss_usd,\n       MAX(daily_pnl_usd) AS var_99_cutoff_usd\nFROM RankedPnL\nWHERE pnl_percentile <= ___3___\nGROUP BY trading_desk;",
        blanks: [
          { id: 1, label: "Partition Desk", answer: "trading_desk", options: ["trading_desk", "sim_id", "historical_date", "daily_pnl_usd"] },
          { id: 2, label: "Sort Column", answer: "daily_pnl_usd", options: ["daily_pnl_usd", "historical_date", "trading_desk", "sim_id"] },
          { id: 3, label: "Tail Cutoff", answer: "0.01", options: ["0.01", "0.99", "0.05", "0.95"] }
        ],
        expectedSql: "WITH RankedPnL AS ( SELECT sim_id, trading_desk, historical_date, daily_pnl_usd, PERCENT_RANK() OVER ( PARTITION BY trading_desk ORDER BY daily_pnl_usd ASC ) AS pnl_percentile FROM swap_portfolio_pnl ) SELECT trading_desk, MIN(daily_pnl_usd) AS worst_loss_usd, MAX(daily_pnl_usd) AS var_99_cutoff_usd FROM RankedPnL WHERE pnl_percentile <= 0.01 GROUP BY trading_desk;",
        managerReview: "Superb quant work. Your 99% VaR calculations matched our Risk Engine benchmarks to the penny. The Market Risk Committee has signed off on today's limits."
      }
    },
    {
      day: 23,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 23: Monte Carlo Convexity Shocks & Second-Order Greek Approximations",
      sender: "Siddharth Rao",
      senderRole: "Head of Derivatives Risk Modeling",
      senderAvatar: "📐",
      priority: "P1 - Risk Model Validation",
      department: "Exotics & Equity Derivatives Desk",
      symphonyMessage: "Our exotics book holds billions in equity index options. Under a sudden market crash of -15% index shock, linear Delta estimation fails because options have massive Gamma (curvature/convexity). Calculate the second-order Taylor expansion PnL shock: `Delta * shock + 0.5 * Gamma * (shock ^ 2)`.",
      contextReport: {
        businessWhy: "Linear risk measures (Delta) assume price changes are straight lines. In volatile crashes, option convexity (Gamma) accelerates losses or gains quadratically. Failing to account for 0.5 * Gamma * shock^2 causes trading desks to blow through margin buffers.",
        learningFocus: [
          "Mathematical modeling in SQL: `(delta * shock) + (0.5 * gamma * POWER(shock, 2))`",
          "Aggregate portfolio sensitivity totals",
          "Grouping by option underlying and book",
          "Conditional flagging of extreme negative convexity positions"
        ],
        sampleSchema: "options_book_sensitivities (\n  position_id VARCHAR(20) PRIMARY KEY,\n  underlying_ticker VARCHAR(10),\n  contract_type VARCHAR(4),\n  delta_usd DECIMAL(14,2),\n  gamma_usd DECIMAL(14,2)\n)",
        realWorldTrap: "Notice the factor of 0.5! The Taylor series second-order term is `f''(x) * (dx^2) / 2!`. Omitting the 0.5 will double the estimated gamma effect, heavily distorting margin hedging requirements.",
        interviewRelevance: "Quants love testing candidates on whether they understand Greek sensitivity approximations and how non-linear derivatives behave under stress."
      },
      schema: "options_book_sensitivities",
      challenge: {
        instruction: "Calculate the second-order Taylor series estimated PnL shock for a -0.15 (-15%) market move using delta_usd and gamma_usd with POWER().",
        template: "SELECT underlying_ticker,\n       COUNT(*) AS total_positions,\n       ROUND(SUM(delta_usd), 2) AS net_delta_usd,\n       ROUND(SUM(gamma_usd), 2) AS net_gamma_usd,\n       ROUND(SUM((delta_usd * ___1___) + (0.5 * gamma_usd * POWER(___2___, ___3___))), 2) AS estimated_pnl_shock_usd\nFROM options_book_sensitivities\nGROUP BY underlying_ticker\nORDER BY estimated_pnl_shock_usd ASC;",
        blanks: [
          { id: 1, label: "Shock Parameter", answer: "-0.15", options: ["-0.15", "0.15", "-1.50", "0.85"] },
          { id: 2, label: "Quadratic Variable", answer: "-0.15", options: ["-0.15", "0.15", "gamma_usd", "delta_usd"] },
          { id: 3, label: "Taylor Exponent", answer: "2", options: ["2", "1", "0.5", "3"] }
        ],
        expectedSql: "SELECT underlying_ticker, COUNT(*) AS total_positions, ROUND(SUM(delta_usd), 2) AS net_delta_usd, ROUND(SUM(gamma_usd), 2) AS net_gamma_usd, ROUND(SUM((delta_usd * -0.15) + (0.5 * gamma_usd * POWER(-0.15, 2))), 2) AS estimated_pnl_shock_usd FROM options_book_sensitivities GROUP BY underlying_ticker ORDER BY estimated_pnl_shock_usd ASC;",
        managerReview: "Brilliant numerical accuracy. Your convexity calculation alerted the trading desk that S&P 500 put options needed a $45M delta hedge before today's bell."
      }
    },
    {
      day: 24,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 24: Basel III Liquidity Coverage Ratio (LCR) & HQLA Stress Buffers",
      sender: "Jean-Paul Dubois",
      senderRole: "Chief Risk Officer, EMEA Treasury",
      senderAvatar: "⚖️",
      priority: "P0 - Basel III Regulatory Mandate",
      department: "Global Treasury & Regulatory Capital",
      symphonyMessage: "Under Basel III regulations, Global Systemically Important Banks (G-SIBs) like JPMorgan must maintain a Liquidity Coverage Ratio (LCR) >= 100%. LCR = Total High-Quality Liquid Assets (HQLA) divided by Total Net Cash Outflows over 30 days. Calculate our weighted HQLA reserves using regulatory haircuts: Level 1 (100%), Level 2A (85%), and Level 2B (50%).",
      contextReport: {
        businessWhy: "In a liquidity crisis (such as the 2008 Lehman collapse or 2023 regional bank runs), depositors rush to withdraw cash. Basel III requires banks to hold enough unencumbered High-Quality Liquid Assets (HQLA) to survive a severe 30-day liquidity stress period without external central bank bailouts.",
        learningFocus: [
          "Multi-tier regulatory haircut logic using `CASE WHEN asset_level = 'Level 1' THEN market_value * 1.0 ...`",
          "Aggregation of weighted eligible liquidity buffers",
          "Calculating LCR percentage: `ROUND((weighted_hqla / net_outflows_30d) * 100, 2)`",
          "Compliance pass/fail conditional indicators"
        ],
        sampleSchema: "treasury_liquidity_holdings (\n  asset_id VARCHAR(20) PRIMARY KEY,\n  asset_description VARCHAR(100),\n  asset_level VARCHAR(10), -- 'Level 1', 'Level 2A', 'Level 2B'\n  market_value_usd DECIMAL(18,2),\n  is_encumbered BOOLEAN\n)",
        realWorldTrap: "Encumbered assets (e.g. securities already pledged as collateral to third parties or repo lenders) are strictly INELIGIBLE for HQLA! Forgetting to filter `WHERE is_encumbered = FALSE` would artificially inflate bank solvency by billions, triggering harsh audit sanctions.",
        interviewRelevance: "LCR and HQLA calculations are bread-and-butter concepts for treasury, regulatory capital, and bank liquidity risk analytics teams."
      },
      schema: "treasury_liquidity_holdings",
      challenge: {
        instruction: "Calculate total unencumbered weighted HQLA using Basel III haircut multipliers (Level 1: 1.00, Level 2A: 0.85, Level 2B: 0.50), filtering out encumbered securities.",
        template: "SELECT asset_level,\n       COUNT(*) AS asset_count,\n       SUM(market_value_usd) AS raw_market_value,\n       ROUND(SUM(CASE \n         WHEN asset_level = 'Level 1' THEN market_value_usd * ___1___\n         WHEN asset_level = 'Level 2A' THEN market_value_usd * ___2___\n         WHEN asset_level = 'Level 2B' THEN market_value_usd * ___3___\n         ELSE 0.00\n       END), 2) AS weighted_hqla_usd\nFROM treasury_liquidity_holdings\nWHERE is_encumbered = ___4___\nGROUP BY asset_level;",
        blanks: [
          { id: 1, label: "Level 1 Weight", answer: "1.00", options: ["1.00", "0.85", "0.50", "0.00"] },
          { id: 2, label: "Level 2A Weight", answer: "0.85", options: ["0.85", "1.00", "0.75", "0.50"] },
          { id: 3, label: "Level 2B Weight", answer: "0.50", options: ["0.50", "0.85", "0.25", "0.00"] },
          { id: 4, label: "Encumbered Filter", answer: "FALSE", options: ["FALSE", "TRUE", "NULL", "'NO'"] }
        ],
        expectedSql: "SELECT asset_level, COUNT(*) AS asset_count, SUM(market_value_usd) AS raw_market_value, ROUND(SUM(CASE WHEN asset_level = 'Level 1' THEN market_value_usd * 1.00 WHEN asset_level = 'Level 2A' THEN market_value_usd * 0.85 WHEN asset_level = 'Level 2B' THEN market_value_usd * 0.50 ELSE 0.00 END), 2) AS weighted_hqla_usd FROM treasury_liquidity_holdings WHERE is_encumbered = FALSE GROUP BY asset_level;",
        managerReview: "Flawless regulatory execution. Our calculated unencumbered HQLA stands at $684 Billion, yielding a healthy 118% LCR for our monthly Federal Reserve report."
      }
    },
    {
      day: 25,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 25: Counterparty Credit Risk, Bilateral Netting & Margin Calls",
      sender: "Devon Vance",
      senderRole: "Head of Counterparty Exposure & Collateral Management",
      senderAvatar: "🛡️",
      priority: "P0 - Margin Breach",
      department: "Credit Risk Management",
      symphonyMessage: "Several hedge fund counterparties are running heavy short positions. Under ISDA bilateral netting agreements, we calculate Current Exposure as `MAX(0, Net Mark-to-Market)`. If `Current Exposure - Collateral Held > Margin Threshold`, an immediate Variation Margin call must be issued. Identify all counterparties breaching their margin thresholds.",
      contextReport: {
        businessWhy: "When Archegos Capital collapsed in 2021, banks lost over $10 Billion because counterparty exposures weren't properly netted, margin calls lagged, and collateral buffers were breached. Real-time margin shortfall surveillance prevents catastrophic counterparty credit defaults.",
        learningFocus: [
          "Bilateral netting across derivative contracts: `SUM(mark_to_market_usd)`",
          "Joining counterparty legal entities with open contracts and collateral balances",
          "Net unsecured exposure calculation: `(Net MTM - Collateral Posted)`",
          "Filtering for margin call breaches via `HAVING`"
        ],
        sampleSchema: "counterparties (\n  counterparty_id VARCHAR(20) PRIMARY KEY,\n  legal_name VARCHAR(100),\n  credit_rating VARCHAR(5),\n  collateral_posted_usd DECIMAL(16,2),\n  margin_threshold_usd DECIMAL(16,2)\n)\nderivative_trades (\n  trade_id VARCHAR(20) PRIMARY KEY,\n  counterparty_id VARCHAR(20),\n  asset_class VARCHAR(20),\n  mark_to_market_usd DECIMAL(16,2)\n)",
        realWorldTrap: "Remember that from the bank's perspective, positive mark-to-market means the counterparty owes the bank money (credit exposure). Negative MTM reduces total exposure under bilateral netting agreements!",
        interviewRelevance: "Counterparty risk, ISDA Master Agreements, Credit Support Annex (CSA), and Potential Future Exposure (PFE) queries are staple technical questions for tier-1 credit risk teams."
      },
      schema: "counterparties",
      challenge: {
        instruction: "Join counterparties and derivative trades to find legal entities where net MTM minus collateral posted exceeds their contractual margin threshold.",
        template: "SELECT c.counterparty_id, c.legal_name, c.credit_rating,\n       c.collateral_posted_usd, c.margin_threshold_usd,\n       SUM(t.mark_to_market_usd) AS net_mtm_usd,\n       (SUM(t.mark_to_market_usd) - c.collateral_posted_usd) AS unsecured_exposure_usd,\n       ((SUM(t.mark_to_market_usd) - c.collateral_posted_usd) - c.margin_threshold_usd) AS margin_call_required_usd\nFROM counterparties c\nJOIN derivative_trades t\n  ON c.counterparty_id = t.___1___\nGROUP BY c.counterparty_id, c.legal_name, c.credit_rating, c.collateral_posted_usd, c.margin_threshold_usd\nHAVING (SUM(t.mark_to_market_usd) - c.collateral_posted_usd) > c.___2___\nORDER BY margin_call_required_usd ___3___;",
        blanks: [
          { id: 1, label: "Join Key", answer: "counterparty_id", options: ["counterparty_id", "trade_id", "asset_class", "legal_name"] },
          { id: 2, label: "Margin Threshold Field", answer: "margin_threshold_usd", options: ["margin_threshold_usd", "collateral_posted_usd", "net_mtm_usd", "0"] },
          { id: 3, label: "Sort Direction", answer: "DESC", options: ["DESC", "ASC", "LIMIT", "ALL"] }
        ],
        expectedSql: "SELECT c.counterparty_id, c.legal_name, c.credit_rating, c.collateral_posted_usd, c.margin_threshold_usd, SUM(t.mark_to_market_usd) AS net_mtm_usd, (SUM(t.mark_to_market_usd) - c.collateral_posted_usd) AS unsecured_exposure_usd, ((SUM(t.mark_to_market_usd) - c.collateral_posted_usd) - c.margin_threshold_usd) AS margin_call_required_usd FROM counterparties c JOIN derivative_trades t ON c.counterparty_id = t.counterparty_id GROUP BY c.counterparty_id, c.legal_name, c.credit_rating, c.collateral_posted_usd, c.margin_threshold_usd HAVING (SUM(t.mark_to_market_usd) - c.collateral_posted_usd) > c.margin_threshold_usd ORDER BY margin_call_required_usd DESC;",
        managerReview: "Immediate collateral action taken! Your query flagged a $62M shortfall on a London hedge fund, allowing our operations team to secure collateral before Asian market open."
      }
    },
    {
      day: 26,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 26: High-Frequency Algo Microsecond Latency Arbitrage & Quote Stuffing",
      sender: "Kenji Takahashi",
      senderRole: "Head of Electronic Trading Surveillance & Market Integrity",
      senderAvatar: "⚡",
      priority: "P1 - SEC Rule 15c3-5 Compliance",
      department: "Automated Trading Compliance",
      symphonyMessage: "Market surveillance algorithms have detected abnormal message rates on our Nasdaq direct-market-access (DMA) gateway. Algorithmic traders may be quote-stuffing or spoofing by posting and cancelling orders in sub-millisecond windows. Use window functions to compute latency between order creation and cancellation, filtering for orders cancelled in under 5,000 microseconds (5 ms).",
      contextReport: {
        businessWhy: "Under SEC Rule 15c3-5 (Market Access Rule), broker-dealers must establish pre-trade and post-trade algorithmic controls to prevent erroneous orders and malicious market manipulation. Quote stuffing and predatory latency manipulation create market instability and expose the bank to multi-million dollar regulatory enforcement actions.",
        learningFocus: [
          "Microsecond timestamp precision: `TIMESTAMPDIFF(MICROSECOND, placed_at, cancelled_at)`",
          "Order book event sequences: linking lifecycle events",
          "High-cancellation ratio calculations: `COUNT(cancelled) / COUNT(placed)`",
          "Identifying aggressive algorithmic participants"
        ],
        sampleSchema: "dma_algo_orders (\n  order_id VARCHAR(30) PRIMARY KEY,\n  client_mpid VARCHAR(10),\n  ticker_symbol VARCHAR(10),\n  order_qty INT,\n  limit_price DECIMAL(10,4),\n  placed_at_ts TIMESTAMP(6),\n  cancelled_at_ts TIMESTAMP(6)\n)",
        realWorldTrap: "Ensure you use `MICROSECOND` rather than `SECOND` or `MILLISECOND`! High-frequency trading (HFT) events happen in microseconds ($10^{-6}$ seconds). Rounding to whole seconds would make all sub-millisecond cancellations show up as 0 seconds!",
        interviewRelevance: "Electronic trading desks at quantitative market makers (Jane Street, Citadel, JPMorgan e-Trading) prioritize candidates who know how to handle sub-millisecond tick data in SQL."
      },
      schema: "dma_algo_orders",
      challenge: {
        instruction: "Calculate the duration in microseconds between order placement and cancellation, identifying all algo clients with average cancellation lifespans under 5,000 microseconds.",
        template: "SELECT client_mpid, ticker_symbol,\n       COUNT(*) AS rapid_cancel_count,\n       ROUND(AVG(TIMESTAMPDIFF(___1___, placed_at_ts, cancelled_at_ts)), 2) AS avg_duration_us,\n       MIN(TIMESTAMPDIFF(___2___, placed_at_ts, cancelled_at_ts)) AS fastest_cancel_us\nFROM dma_algo_orders\nWHERE cancelled_at_ts IS NOT NULL\n  AND TIMESTAMPDIFF(___3___, placed_at_ts, cancelled_at_ts) < 5000\nGROUP BY client_mpid, ticker_symbol\nHAVING COUNT(*) >= 10\nORDER BY rapid_cancel_count DESC;",
        blanks: [
          { id: 1, label: "Time Unit 1", answer: "MICROSECOND", options: ["MICROSECOND", "MILLISECOND", "SECOND", "MINUTE"] },
          { id: 2, label: "Time Unit 2", answer: "MICROSECOND", options: ["MICROSECOND", "MILLISECOND", "SECOND", "HOUR"] },
          { id: 3, label: "Time Unit 3", answer: "MICROSECOND", options: ["MICROSECOND", "MILLISECOND", "SECOND", "NANOSECOND"] }
        ],
        expectedSql: "SELECT client_mpid, ticker_symbol, COUNT(*) AS rapid_cancel_count, ROUND(AVG(TIMESTAMPDIFF(MICROSECOND, placed_at_ts, cancelled_at_ts)), 2) AS avg_duration_us, MIN(TIMESTAMPDIFF(MICROSECOND, placed_at_ts, cancelled_at_ts)) AS fastest_cancel_us FROM dma_algo_orders WHERE cancelled_at_ts IS NOT NULL AND TIMESTAMPDIFF(MICROSECOND, placed_at_ts, cancelled_at_ts) < 5000 GROUP BY client_mpid, ticker_symbol HAVING COUNT(*) >= 10 ORDER BY rapid_cancel_count DESC;",
        managerReview: "Incredible diagnostic speed! Your surveillance query isolated a rogue algorithmic trading account in Chicago that sent 42,000 phantom quotes in 30 seconds. Gateway kill-switch deployed."
      }
    },
    {
      day: 27,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 27: Cross-Currency Basis Swaps & Covered Interest Parity (CIP) Deviations",
      sender: "Giselle Moreau",
      senderRole: "Head of FX & Cross-Currency Basis Trading",
      senderAvatar: "💶",
      priority: "P1 - Global Arbitrage Desk",
      department: "Global Foreign Exchange (FX)",
      symphonyMessage: "Covered Interest Parity (CIP) states that the interest rate differential between two currencies should equal the percentage difference between the spot and forward foreign exchange rates. When global USD funding dries up, the EUR/USD cross-currency basis widens significantly. Detect anomalies where the basis spread deviates by more than 2.5 standard deviations from its 30-day moving average.",
      contextReport: {
        businessWhy: "Cross-currency basis swaps reflect the premium financial institutions are willing to pay to secure US Dollars against foreign currency collateral. Wide deviations from Covered Interest Parity signal global liquidity crunches and create lucrative covered arbitrage opportunities for central banks and prime dealers.",
        learningFocus: [
          "Rolling statistical window calculations: `AVG(basis_spread_bps) OVER (...)`",
          "Window standard deviation: `STDDEV_SAMP(basis_spread_bps) OVER (...)`",
          "Z-Score anomaly detection: `ABS(spread - rolling_avg) / rolling_std > 2.5`",
          "Time-series partitioning by currency pair"
        ],
        sampleSchema: "fx_cross_currency_basis (\n  quote_id INT PRIMARY KEY,\n  currency_pair VARCHAR(7), -- e.g. 'EUR/USD'\n  quote_date DATE,\n  basis_spread_bps DECIMAL(10,3)\n)",
        realWorldTrap: "Make sure you order your rolling window clause by `quote_date ASC ROWS BETWEEN 29 PRECEDING AND CURRENT ROW`! Omitting the rolling frame causes SQL to average across the entire multi-year dataset, destroying the recency of your volatility detection!",
        interviewRelevance: "Cross-currency basis and covered interest parity deviations are the pinnacle of global macro hedge fund and FX structuring interview topics."
      },
      schema: "fx_cross_currency_basis",
      challenge: {
        instruction: "Compute a 30-day rolling average and standard deviation of basis spread in bps, then calculate the Z-Score to isolate spread dislocations exceeding 2.5 standard deviations.",
        template: "WITH RollingStats AS (\n  SELECT quote_id, currency_pair, quote_date, basis_spread_bps,\n         AVG(basis_spread_bps) OVER (\n           PARTITION BY currency_pair\n           ORDER BY quote_date ASC\n           ROWS BETWEEN ___1___ PRECEDING AND CURRENT ROW\n         ) AS rolling_mean_bps,\n         STDDEV_SAMP(basis_spread_bps) OVER (\n           PARTITION BY currency_pair\n           ORDER BY quote_date ASC\n           ROWS BETWEEN ___2___ PRECEDING AND CURRENT ROW\n         ) AS rolling_std_bps\n  FROM fx_cross_currency_basis\n)\nSELECT currency_pair, quote_date, basis_spread_bps, rolling_mean_bps,\n       ROUND(ABS(basis_spread_bps - rolling_mean_bps) / NULLIF(rolling_std_bps, 0), 2) AS z_score\nFROM RollingStats\nWHERE ABS(basis_spread_bps - rolling_mean_bps) / NULLIF(rolling_std_bps, 0) > ___3___\nORDER BY z_score DESC;",
        blanks: [
          { id: 1, label: "Rolling Window Frame 1", answer: "29", options: ["29", "30", "1", "UNBOUNDED"] },
          { id: 2, label: "Rolling Window Frame 2", answer: "29", options: ["29", "30", "1", "UNBOUNDED"] },
          { id: 3, label: "Z-Score Threshold", answer: "2.5", options: ["2.5", "1.0", "3.0", "0.5"] }
        ],
        expectedSql: "WITH RollingStats AS ( SELECT quote_id, currency_pair, quote_date, basis_spread_bps, AVG(basis_spread_bps) OVER ( PARTITION BY currency_pair ORDER BY quote_date ASC ROWS BETWEEN 29 PRECEDING AND CURRENT ROW ) AS rolling_mean_bps, STDDEV_SAMP(basis_spread_bps) OVER ( PARTITION BY currency_pair ORDER BY quote_date ASC ROWS BETWEEN 29 PRECEDING AND CURRENT ROW ) AS rolling_std_bps FROM fx_cross_currency_basis ) SELECT currency_pair, quote_date, basis_spread_bps, rolling_mean_bps, ROUND(ABS(basis_spread_bps - rolling_mean_bps) / NULLIF(rolling_std_bps, 0), 2) AS z_score FROM RollingStats WHERE ABS(basis_spread_bps - rolling_mean_bps) / NULLIF(rolling_std_bps, 0) > 2.5 ORDER BY z_score DESC;",
        managerReview: "Exceptional quantitative insight! Your Z-Score anomaly filter alerted the FX desk to a 48 bps dislocation in 3-month EUR/USD basis, enabling a $12M basis arbitrage lock-in."
      }
    },
    {
      day: 28,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 28: Federal Reserve CCAR Severely Adverse Scenario Credit Loss Modeling",
      sender: "Catherine Howard",
      senderRole: "Head of Regulatory Stress Testing & CCAR Governance",
      senderAvatar: "🏛️",
      priority: "P0 - Federal Reserve Submission",
      department: "Enterprise Risk & Regulatory CCAR",
      symphonyMessage: "Annual Federal Reserve Comprehensive Capital Analysis and Review (CCAR) deadline is here. Under the 'Severely Adverse' macroeconomic scenario (unemployment at 10%, commercial real estate crashing 40%), we must project 9-quarter cumulative credit losses: `Expected Loss = Exposure at Default (EAD) * Probability of Default (PD) * (1 - Recovery Rate)`. Group projections by loan asset class.",
      contextReport: {
        businessWhy: "CCAR is the Fed's annual regulatory stress test. If JPMorgan's projected post-stress capital ratios fall below minimum requirements under the Severely Adverse scenario, the Federal Reserve legally bans the bank from paying dividends to shareholders or executing stock buybacks.",
        learningFocus: [
          "Basel credit risk expected loss formula: `EAD * PD * LGD` where `LGD = 1.0 - recovery_rate`",
          "Calculating aggregate expected credit losses across loan asset classes",
          "Computing weighted average probability of default: `SUM(ead * pd) / SUM(ead)`",
          "Executive capital buffer deductions"
        ],
        sampleSchema: "ccar_loan_portfolio (\n  loan_id VARCHAR(20) PRIMARY KEY,\n  asset_class VARCHAR(40), -- 'Commercial Real Estate', 'Residential Mortgages', 'Corporate Bonds', 'Credit Cards'\n  exposure_at_default_usd DECIMAL(16,2),\n  stressed_pd DECIMAL(6,4), -- e.g. 0.0850 for 8.5% default rate\n  recovery_rate DECIMAL(6,4) -- e.g. 0.4000 for 40% recovery\n)",
        realWorldTrap: "Do not forget that Loss Given Default (LGD) is the complement of Recovery Rate: `LGD = (1 - Recovery Rate)`. If the collateral recovers 60%, the bank's loss is 40%! Multiplying directly by recovery_rate would calculate the recovered capital instead of the credit loss!",
        interviewRelevance: "Every bank risk analyst must master CCAR, DFAST (Dodd-Frank Act Stress Testing), and Expected Loss formulations (`EL = PD * LGD * EAD`)."
      },
      schema: "ccar_loan_portfolio",
      challenge: {
        instruction: "Calculate total exposure at default and cumulative projected credit losses across each loan asset class using the Expected Loss formula: EAD * stressed_pd * (1 - recovery_rate).",
        template: "SELECT asset_class,\n       COUNT(*) AS total_loans,\n       SUM(exposure_at_default_usd) AS total_ead_usd,\n       ROUND(SUM(exposure_at_default_usd * stressed_pd) / SUM(exposure_at_default_usd), 4) AS weighted_avg_pd,\n       ROUND(SUM(exposure_at_default_usd * stressed_pd * (___1___ - recovery_rate)), 2) AS projected_credit_loss_usd\nFROM ccar_loan_portfolio\nGROUP BY ___2___\nORDER BY projected_credit_loss_usd ___3___;",
        blanks: [
          { id: 1, label: "LGD Complement Factor", answer: "1.0", options: ["1.0", "100.0", "0.5", "0.0"] },
          { id: 2, label: "Group Key", answer: "asset_class", options: ["asset_class", "loan_id", "stressed_pd", "recovery_rate"] },
          { id: 3, label: "Sort Direction", answer: "DESC", options: ["DESC", "ASC", "LIMIT", "ALL"] }
        ],
        expectedSql: "SELECT asset_class, COUNT(*) AS total_loans, SUM(exposure_at_default_usd) AS total_ead_usd, ROUND(SUM(exposure_at_default_usd * stressed_pd) / SUM(exposure_at_default_usd), 4) AS weighted_avg_pd, ROUND(SUM(exposure_at_default_usd * stressed_pd * (1.0 - recovery_rate)), 2) AS projected_credit_loss_usd FROM ccar_loan_portfolio GROUP BY asset_class ORDER BY projected_credit_loss_usd DESC;",
        managerReview: "Commanding CCAR delivery. Your projected loss metrics passed internal audit and will be transmitted to the Federal Reserve Board this afternoon without revision."
      }
    },
    {
      day: 29,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 29: Intraday Fedwire Settlement & Real-Time Liquidity Shortfall Defense",
      sender: "Marcus Sterling",
      senderRole: "Managing Director, Global Treasury Operations",
      senderAvatar: "👔",
      priority: "P0 - Fedwire Cutoff Warning",
      department: "Office of the Chief Financial Officer",
      symphonyMessage: "Fedwire closes in 90 minutes. Over $400 Billion in gross interbank payments flow across our Federal Reserve account daily. We must maintain a positive intraday cash balance with the Federal Reserve Bank of New York to avoid costly daylight overdraft penalty rates. Calculate our cumulative running reserve balance throughout the settlement day and flag the lowest liquidity trough.",
      contextReport: {
        businessWhy: "The Federal Reserve charges penalty interest rates (or rejects outgoing wire queues) if a bank runs uncollateralized intraday daylight overdrafts. Treasury quants track running payment flows millisecond by millisecond so repo desks can borrow cash from money markets before wires stall.",
        learningFocus: [
          "Cumulative running balance: `SUM(inflow - outflow) OVER (ORDER BY wire_time ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`",
          "Initial cash balance incorporation",
          "Tracking intraday cash dips and maximum liquidity drain",
          "Window function ordering without gaps"
        ],
        sampleSchema: "fedwire_settlement_ledger (\n  wire_id VARCHAR(30) PRIMARY KEY,\n  wire_time TIME,\n  sender_bank VARCHAR(50),\n  receiver_bank VARCHAR(50),\n  net_cash_flow_usd DECIMAL(18,2) -- Positive for incoming wire, Negative for outgoing wire\n)",
        realWorldTrap: "Pay careful attention to the window specification! If you use `ORDER BY wire_time` without `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, duplicate timestamps will be lumped together by the default `RANGE` frame, giving you inaccurate intraday spikes!",
        interviewRelevance: "Running total calculations via window functions (`SUM() OVER (...)`) are among the most frequently tested patterns in investment banking data engineering interviews."
      },
      schema: "fedwire_settlement_ledger",
      challenge: {
        instruction: "Calculate the cumulative intraday cash position starting from an opening balance of $50,000,000,000 using SUM() OVER (ORDER BY wire_time ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).",
        template: "SELECT wire_id, wire_time, net_cash_flow_usd,\n       ROUND(50000000000.00 + SUM(net_cash_flow_usd) OVER (\n         ORDER BY wire_time ASC\n         ROWS BETWEEN ___1___ AND ___2___\n       ), 2) AS running_fed_reserve_balance_usd\nFROM fedwire_settlement_ledger\nORDER BY wire_time ___3___;",
        blanks: [
          { id: 1, label: "Window Start", answer: "UNBOUNDED PRECEDING", options: ["UNBOUNDED PRECEDING", "CURRENT ROW", "1 PRECEDING", "10 PRECEDING"] },
          { id: 2, label: "Window End", answer: "CURRENT ROW", options: ["CURRENT ROW", "UNBOUNDED FOLLOWING", "1 FOLLOWING", "wire_time"] },
          { id: 3, label: "Display Sort", answer: "ASC", options: ["ASC", "DESC", "NULL", "LIMIT"] }
        ],
        expectedSql: "SELECT wire_id, wire_time, net_cash_flow_usd, ROUND(50000000000.00 + SUM(net_cash_flow_usd) OVER ( ORDER BY wire_time ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW ), 2) AS running_fed_reserve_balance_usd FROM fedwire_settlement_ledger ORDER BY wire_time ASC;",
        managerReview: "Masterful intraday cash surveillance! You spotted a $3.2B trough at 14:15 ET, allowing Treasury to tap the overnight repo market 45 minutes ahead of the Fedwire cutoff."
      }
    },
    {
      day: 30,
      week: 4,
      phase: "Week 4: Market Risk & Treasury Solvency",
      title: "Day 30: Executive Capstone: The Board of Directors & Operating Committee Risk Briefing",
      sender: "Jamie Dimon",
      senderRole: "Chairman & Chief Executive Officer",
      senderAvatar: "⭐",
      priority: "P0 - Board of Directors Annual Meeting",
      department: "Executive Committee / Office of the CEO",
      symphonyMessage: "Welcome to Day 30, Analyst. The Board of Directors and Operating Committee are assembled in the 48th-floor boardroom. We need our definitive capital adequacy summary: Common Equity Tier 1 (CET1) Capital, Total Risk-Weighted Assets (RWA), and the final CET1 Ratio percentage: `(CET1 Capital / RWA) * 100`. The minimum regulatory threshold is 11.5%. Deliver our capital solvency deck.",
      contextReport: {
        businessWhy: "The CET1 Ratio is the ultimate benchmark of global banking strength and resilience. It proves that the bank holds enough pure common equity capital (retained earnings and common stock) relative to risk-weighted assets to withstand severe macroeconomic collapse without failing.",
        learningFocus: [
          "Enterprise balance sheet aggregation",
          "Common Equity Tier 1 (CET1) capital ratio formula: `(SUM(cet1_capital) / SUM(risk_weighted_assets)) * 100`",
          "CTE-based multi-tier balance sheet summaries",
          "Final executive capstone presentation metrics"
        ],
        sampleSchema: "jpmorgan_divisions_capital (\n  division_id VARCHAR(20) PRIMARY KEY,\n  division_name VARCHAR(60), -- e.g. 'Corporate & Investment Bank', 'Consumer & Community Banking', 'Asset & Wealth Management', 'Commercial Banking'\n  cet1_capital_usd DECIMAL(18,2),\n  risk_weighted_assets_usd DECIMAL(18,2)\n)",
        realWorldTrap: "Make sure you multiply by 100.0 to display the ratio as a proper percentage! A ratio of 0.1425 expressed without multiplying looks like 0.14% instead of 14.25%, which would cause unnecessary panic in an executive board meeting!",
        interviewRelevance: "Understanding CET1, Basel III capital ratios, and how tier-1 capital relates to risk-weighted assets is the gold standard for executive-track quantitative finance careers."
      },
      schema: "jpmorgan_divisions_capital",
      challenge: {
        instruction: "Aggregate total CET1 Capital and Risk-Weighted Assets across all business divisions, calculating the final enterprise-wide CET1 Capital Ratio percentage rounded to 2 decimal places.",
        template: "SELECT COUNT(division_id) AS total_divisions,\n       SUM(cet1_capital_usd) AS total_cet1_capital_usd,\n       SUM(risk_weighted_assets_usd) AS total_rwa_usd,\n       ROUND((SUM(cet1_capital_usd) / SUM(risk_weighted_assets_usd)) * ___1___, 2) AS enterprise_cet1_ratio_pct,\n       CASE \n         WHEN (SUM(cet1_capital_usd) / SUM(risk_weighted_assets_usd)) * 100.0 >= ___2___ THEN 'STRONG SOLVENCY (PASSED)'\n         ELSE 'CAPITAL DEFICIT'\n       END AS board_verdict\nFROM jpmorgan_divisions_capital;",
        blanks: [
          { id: 1, label: "Percentage Multiplier", answer: "100.0", options: ["100.0", "1.0", "1000.0", "10.0"] },
          { id: 2, label: "Regulatory Hurdle Rate", answer: "11.5", options: ["11.5", "8.0", "15.0", "5.0"] }
        ],
        expectedSql: "SELECT COUNT(division_id) AS total_divisions, SUM(cet1_capital_usd) AS total_cet1_capital_usd, SUM(risk_weighted_assets_usd) AS total_rwa_usd, ROUND((SUM(cet1_capital_usd) / SUM(risk_weighted_assets_usd)) * 100.0, 2) AS enterprise_cet1_ratio_pct, CASE WHEN (SUM(cet1_capital_usd) / SUM(risk_weighted_assets_usd)) * 100.0 >= 11.5 THEN 'STRONG SOLVENCY (PASSED)' ELSE 'CAPITAL DEFICIT' END AS board_verdict FROM jpmorgan_divisions_capital;",
        managerReview: "STANDING OVATION IN THE BOARDROOM! Total CET1 Ratio confirmed at 14.85%, far exceeding regulatory mandates. Jamie Dimon personally signed your promotion to Managing Director & Global Head of Quantitative Risk. Congratulations on conquering the 30-Day JPMorgan Simulator!"
      }
    }
  ];

  window.JPMORGAN_ANALYST_STORY_DATA = JPMORGAN_STORY_DATA;

})(typeof window !== 'undefined' ? window : global);
