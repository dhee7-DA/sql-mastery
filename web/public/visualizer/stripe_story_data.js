// =============================================================================
// STRIPE FINTECH, GLOBAL PAYMENTS & FRAUD RADAR 30-DAY STORY DATA
// Role: FinTech Infrastructure & Quantitative Risk Engineer (L4 -> L6)
// 30 Days Across 4 Progressive Weeks with Authentic Payment Authorizations & Radar ML
// =============================================================================

window.STRIPE_STORY_DATA = [
  {
    "day": 1,
    "week": 1,
    "phase": "Week 1: Payment Authorizations & Card Routing",
    "title": "Day 01: Card Network Authorization Rate by Issuing Bank",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Onboarding",
    "department": "Core Payments & Card Brand Routing",
    "slackMessage": "Welcome to Stripe! 💳 Your Redshift and Presto credentials are live. For your first production ticket, Treasury needs to monitor authorization rates across major card networks (Visa, Mastercard, Amex). If a bank network falls below 85% auth rate, our Smart Routing algorithm automatically fails over to secondary processor rails. Query yesterday's charges to calculate total attempts, approved count, and auth_rate_pct for each card network.",
    "contextReport": {
      "businessWhy": "Payment authorization rate is Stripe's core value proposition: a 1% improvement in global authorization rate translates to hundreds of millions in additional top-line revenue for millions of online businesses.",
      "learningFocus": [
        "Authorization rate ratio calculation: `ROUND(100.0 * COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) / COUNT(*), 2) AS auth_rate_pct`",
        "Card brand dimension grouping (`GROUP BY card_brand`)",
        "Sorting by authorization efficiency descending"
      ],
      "sampleSchema": "card_authorizations (\n  auth_id VARCHAR(36) PRIMARY KEY,\n  card_brand VARCHAR(20),\n  issuer_bank VARCHAR(50),\n  amount_cents BIGINT,\n  status VARCHAR(20) -- 'APPROVED', 'DECLINED'\n)",
      "realWorldTrap": "Don't divide approved transactions by approved + declined without checking for 'ERROR' or 'TIMEOUT' states! Network timeouts must be included in the denominator to reflect true business drop-off.",
      "interviewRelevance": "Card authorization rates and payment processor funnel analytics are asked in every Stripe, Adyen, and PayPal data interview."
    },
    "schema": "card_authorizations",
    "challenge": {
      "instruction": "Compute total_attempts, approved_count, and auth_rate_pct for each card_brand, ordered by auth_rate_pct DESC.",
      "template": "SELECT card_brand,\n  COUNT(*) AS total_attempts,\n  COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) AS approved_count,\n  ROUND(100.0 * COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) / COUNT(*), 2) AS auth_rate_pct\nFROM card_authorizations\nGROUP BY ___1___\nORDER BY auth_rate_pct ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Card Brand Dimension",
          "answer": "card_brand",
          "options": [
            "card_brand",
            "status",
            "issuer_bank",
            "auth_id"
          ]
        },
        {
          "id": 2,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT card_brand, COUNT(*) AS total_attempts, COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) AS approved_count, ROUND(100.0 * COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) / COUNT(*), 2) AS auth_rate_pct FROM card_authorizations GROUP BY card_brand ORDER BY auth_rate_pct DESC;",
      "managerReview": "Visa achieved 92.4% auth rate; Amex at 89.1%. Mastercard lagged at 84.2% due to a regional issuing bank outage in France. Smart Routing rerouted traffic."
    }
  },
  {
    "day": 2,
    "week": 1,
    "phase": "Week 1: Payment Authorizations & Card Routing",
    "title": "Day 02: Soft vs Hard Decline Classification & Card Network Error Codes",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P1 - High Urgency",
    "department": "Smart Retries & Error Intelligence",
    "slackMessage": "Declines are categorized into 'Hard Declines' (stolen card, closed account - NEVER retry) and 'Soft Declines' (insufficient funds, temporary issuer timeout - safe to retry). Classify decline records and calculate the recovery potential for soft declines.",
    "contextReport": {
      "businessWhy": "Retrying hard declines incurs card network fines ($0.25 per invalid retry from Visa) and damages merchant reputation. Retrying soft declines at optimal hours recovers billions in recurring revenue.",
      "learningFocus": [
        "Error classification with `CASE WHEN decline_code IN (...) THEN 'HARD' ELSE 'SOFT' END`",
        "Categorical aggregation of decline volumes and potential dollar values",
        "Guarding against invalid retry loops"
      ],
      "sampleSchema": "payment_declines (\n  decline_id VARCHAR(36) PRIMARY KEY,\n  decline_code VARCHAR(30),\n  amount_cents BIGINT,\n  merchant_id VARCHAR(20)\n)",
      "realWorldTrap": "Don't treat 'Do Not Honor' (generic 05 code) as a hard decline! Often it is a soft fraud trigger that clears if the customer calls their bank or if retried with 3D-Secure authentication.",
      "interviewRelevance": "Understanding ISO 8583 decline codes and retry mechanics is essential for fintech systems engineering."
    },
    "schema": "payment_declines",
    "challenge": {
      "instruction": "Classify decline_code ('stolen_card', 'lost_card', 'closed_account' as 'HARD', else 'SOFT') as decline_type. Calculate total_declines and total_amount_usd (ROUND(SUM(amount_cents) / 100.0, 2)).",
      "template": "SELECT\n  CASE\n    WHEN decline_code IN ('stolen_card', 'lost_card', 'closed_account') THEN 'HARD'\n    ELSE 'SOFT'\n  END AS decline_type,\n  COUNT(*) AS total_declines,\n  ROUND(SUM(amount_cents) / 100.0, 2) AS total_amount_usd\nFROM payment_declines\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Grouping Expression",
          "answer": "decline_type",
          "options": [
            "decline_type",
            "decline_code",
            "merchant_id",
            "total_amount_usd"
          ]
        }
      ],
      "expectedSql": "SELECT CASE WHEN decline_code IN ('stolen_card', 'lost_card', 'closed_account') THEN 'HARD' ELSE 'SOFT' END AS decline_type, COUNT(*) AS total_declines, ROUND(SUM(amount_cents) / 100.0, 2) AS total_amount_usd FROM payment_declines GROUP BY decline_type;",
      "managerReview": "Identified $4.8M in Soft Declines ready for the Smart Retries engine, while 100% of Hard Declines were safely blocked from illegal retries."
    }
  },
  {
    "day": 3,
    "week": 1,
    "phase": "Week 1: Payment Authorizations & Card Routing",
    "title": "Day 03: 3D-Secure (3DS) SCA Authentication Friction & Drop-Off Funnels",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P2 - Sprint",
    "department": "Radar Risk & Strong Customer Authentication (SCA)",
    "slackMessage": "European Strong Customer Authentication (SCA) requires 3DS biometric/SMS verification. However, 3DS adds customer friction. Calculate the 3DS funnel: total requests challenged, percentage authenticated, and checkout abandonment rate.",
    "contextReport": {
      "businessWhy": "3DS shifts fraud chargeback liability from the merchant to the card issuer. However, if authentication UX is clunky, 15-20% of buyers abandon their carts. Finding the optimal exemption balance maximizes net revenue.",
      "learningFocus": [
        "Funnel stage conversion calculation",
        "Authentication success rate: `ROUND(100.0 * COUNT(CASE WHEN outcome = 'AUTHENTICATED' THEN 1 END) / COUNT(*), 1)`",
        "Abandonment rate analysis"
      ],
      "sampleSchema": "three_ds_sessions (\n  session_id VARCHAR(36) PRIMARY KEY,\n  country_code VARCHAR(3),\n  outcome VARCHAR(20) -- 'AUTHENTICATED', 'FAILED', 'ABANDONED'\n)",
      "realWorldTrap": "Don't count frictionless exemptions (TRA exemptions) in the 3DS challenge denominator! Only evaluate sessions where the user was actually prompted for authentication.",
      "interviewRelevance": "3D-Secure liability shift and checkout conversion trade-offs are classic fintech product case studies."
    },
    "schema": "three_ds_sessions",
    "challenge": {
      "instruction": "For each country_code, compute total_challenges, auth_rate_pct, and abandon_rate_pct.",
      "template": "SELECT country_code,\n  COUNT(*) AS total_challenges,\n  ROUND(100.0 * COUNT(CASE WHEN outcome = 'AUTHENTICATED' THEN 1 END) / COUNT(*), 1) AS auth_rate_pct,\n  ROUND(100.0 * COUNT(CASE WHEN outcome = 'ABANDONED' THEN 1 END) / COUNT(*), 1) AS abandon_rate_pct\nFROM three_ds_sessions\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Country Dimension",
          "answer": "country_code",
          "options": [
            "country_code",
            "session_id",
            "outcome",
            "auth_rate_pct"
          ]
        }
      ],
      "expectedSql": "SELECT country_code, COUNT(*) AS total_challenges, ROUND(100.0 * COUNT(CASE WHEN outcome = 'AUTHENTICATED' THEN 1 END) / COUNT(*), 1) AS auth_rate_pct, ROUND(100.0 * COUNT(CASE WHEN outcome = 'ABANDONED' THEN 1 END) / COUNT(*), 1) AS abandon_rate_pct FROM three_ds_sessions GROUP BY country_code;",
      "managerReview": "UK achieved 88.5% authentication with only 6.2% abandonment, while Germany experienced 14.1% abandonment due to strict banking app redirections."
    }
  },
  {
    "day": 4,
    "week": 1,
    "phase": "Week 1: Payment Authorizations & Card Routing",
    "title": "Day 04: Payment Gateway Latency P99 & Issuer Timeout Thresholds",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P1 - Critical Latency",
    "department": "Core Payments & Card Brand Routing",
    "slackMessage": "Online checkouts timeout if an issuing bank takes longer than 2,000ms to respond. Calculate average latency, P90 latency, and the timeout rate (`latency_ms > 2000`) for each payment processing connection partner.",
    "contextReport": {
      "businessWhy": "Every 100ms of checkout latency degrades conversion. When a payment gateway times out, the customer often re-submits, causing accidental double-charges and angry support tickets.",
      "learningFocus": [
        "Latency metric aggregations: `ROUND(AVG(latency_ms), 1)`",
        "Timeout threshold breach rate: `ROUND(100.0 * COUNT(CASE WHEN latency_ms > 2000 THEN 1 END) / COUNT(*), 2) AS timeout_rate_pct`",
        "Connection gateway performance comparison"
      ],
      "sampleSchema": "gateway_latencies (\n  request_id VARCHAR(36) PRIMARY KEY,\n  processor_name VARCHAR(50),\n  latency_ms INT\n)",
      "realWorldTrap": "Don't calculate average latency without filtering out timed-out sockets that hung for 30,000ms! Severe outliers will distort the mean; report medians and timeout rates together.",
      "interviewRelevance": "P99 latency distribution and timeout handling in financial transaction systems are core systems interview questions."
    },
    "schema": "gateway_latencies",
    "challenge": {
      "instruction": "Compute total_requests, avg_latency_ms, and timeout_rate_pct (> 2000ms) for each processor_name.",
      "template": "SELECT processor_name,\n  COUNT(*) AS total_requests,\n  ROUND(AVG(latency_ms), 1) AS avg_latency_ms,\n  ROUND(100.0 * COUNT(CASE WHEN latency_ms > 2000 THEN 1 END) / COUNT(*), 2) AS timeout_rate_pct\nFROM gateway_latencies\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Processor Dimension",
          "answer": "processor_name",
          "options": [
            "processor_name",
            "request_id",
            "latency_ms",
            "avg_latency_ms"
          ]
        }
      ],
      "expectedSql": "SELECT processor_name, COUNT(*) AS total_requests, ROUND(AVG(latency_ms), 1) AS avg_latency_ms, ROUND(100.0 * COUNT(CASE WHEN latency_ms > 2000 THEN 1 END) / COUNT(*), 2) AS timeout_rate_pct FROM gateway_latencies GROUP BY processor_name;",
      "managerReview": "Processor 'Acquirer-East' exhibited an elevated 3.4% timeout rate. Dynamic routing shifted 60% of US East volume to 'Acquirer-Primary'."
    }
  },
  {
    "day": 5,
    "week": 1,
    "phase": "Week 1: Payment Authorizations & Card Routing",
    "title": "Day 05: Multi-Currency FX Settlement Spread & Treasury Margin",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P2 - Sprint",
    "department": "Global Treasury & Foreign Exchange",
    "slackMessage": "Stripe enables merchants to sell in 135+ currencies. When a customer pays in EUR and the merchant settles in USD, Stripe charges a 1% FX conversion fee. Join transactions with interbank wholesale FX rates to calculate our net FX spread revenue.",
    "contextReport": {
      "businessWhy": "Multi-currency cross-border commerce is one of Stripe's highest-margin product lines. Accurately tracking wholesale vs retail FX spreads protects Stripe Treasury from daily currency fluctuations.",
      "learningFocus": [
        "Transactional FX spread math: `ROUND(SUM(charged_usd - (original_eur * wholesale_fx_rate)), 2) AS fx_spread_margin_usd`",
        "Financial precision across currency decimals",
        "Treasury margin calculation"
      ],
      "sampleSchema": "cross_currency_charges (\n  charge_id VARCHAR(36) PRIMARY KEY,\n  original_eur DECIMAL(10,2),\n  charged_usd DECIMAL(10,2),\n  wholesale_fx_rate DECIMAL(8,4)\n)",
      "realWorldTrap": "Always store currency amounts in minor units (cents) or high-precision decimals! Storing currencies as raw floats causes cent roundoff discrepancies across millions of transactions.",
      "interviewRelevance": "Foreign exchange spreads, multi-currency settlement, and rounding invariants are essential for fintech quants."
    },
    "schema": "cross_currency_charges",
    "challenge": {
      "instruction": "Compute total_charges, total_eur_volume, total_usd_volume, and net_fx_spread_usd (charged_usd - (original_eur * wholesale_fx_rate)).",
      "template": "SELECT\n  COUNT(*) AS total_charges,\n  ROUND(SUM(original_eur), 2) AS total_eur_volume,\n  ROUND(SUM(charged_usd), 2) AS total_usd_volume,\n  ROUND(SUM(charged_usd - (original_eur * wholesale_fx_rate)), 2) AS net_fx_spread_usd\nFROM cross_currency_charges;",
      "blanks": [
        {
          "id": 1,
          "label": "Spread Formula",
          "answer": "SUM(charged_usd - (original_eur * wholesale_fx_rate))",
          "options": [
            "SUM(charged_usd - (original_eur * wholesale_fx_rate))",
            "SUM(charged_usd)",
            "SUM(original_eur)",
            "COUNT(*)"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(*) AS total_charges, ROUND(SUM(original_eur), 2) AS total_eur_volume, ROUND(SUM(charged_usd), 2) AS total_usd_volume, ROUND(SUM(charged_usd - (original_eur * wholesale_fx_rate)), 2) AS net_fx_spread_usd FROM cross_currency_charges;",
      "managerReview": "Treasury confirmed: $14.2M in EUR volume generated $142,400 in net FX spread margin with zero hedging loss."
    }
  },
  {
    "day": 6,
    "week": 1,
    "phase": "Week 1: Payment Authorizations & Card Routing",
    "title": "Day 06: Merchant Account Balance Ledger: Double-Entry Invariants",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P1 - Core Ledger Invariant",
    "department": "Merchant Accounts & Ledger Platform",
    "slackMessage": "Stripe's core ledger operates on double-entry principles: every credit to a merchant balance must equal debits to bank settlement accounts. Verify that total debits equal total credits for yesterday's ledger journal entries. Any non-zero difference indicates ledger corruption.",
    "contextReport": {
      "businessWhy": "Double-entry bookkeeping is the unbreakable bedrock of financial engineering. Proving `SUM(credits) - SUM(debits) = 0` on every single transaction guarantees that money cannot be created or destroyed by software bugs.",
      "learningFocus": [
        "Double-entry bookkeeping validation: `SUM(credit_cents) - SUM(debit_cents) = 0`",
        "Account type balance checks",
        "Audit invariant enforcement"
      ],
      "sampleSchema": "general_ledger_entries (\n  entry_id VARCHAR(36) PRIMARY KEY,\n  account_id VARCHAR(20),\n  debit_cents BIGINT,\n  credit_cents BIGINT\n)",
      "realWorldTrap": "Don't store debits as positive and credits as negative in the same column without checking accounting conventions! Keep debits and credits in separate unsigned columns to prevent sign inversion errors.",
      "interviewRelevance": "Double-entry balance invariants and financial ledger architecture are asked in all Stripe infrastructure rounds."
    },
    "schema": "general_ledger_entries",
    "challenge": {
      "instruction": "Compute total_entries, total_debits_usd (ROUND(SUM(debit_cents)/100.0, 2)), total_credits_usd (ROUND(SUM(credit_cents)/100.0, 2)), and ledger_variance (total_credits - total_debits).",
      "template": "SELECT\n  COUNT(*) AS total_entries,\n  ROUND(SUM(debit_cents) / 100.0, 2) AS total_debits_usd,\n  ROUND(SUM(credit_cents) / 100.0, 2) AS total_credits_usd,\n  ROUND((SUM(credit_cents) - SUM(debit_cents)) / 100.0, 2) AS ledger_variance\nFROM general_ledger_entries;",
      "blanks": [
        {
          "id": 1,
          "label": "Variance Calculation",
          "answer": "(SUM(credit_cents) - SUM(debit_cents))",
          "options": [
            "(SUM(credit_cents) - SUM(debit_cents))",
            "SUM(credit_cents)",
            "SUM(debit_cents)",
            "COUNT(*)"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(*) AS total_entries, ROUND(SUM(debit_cents) / 100.0, 2) AS total_debits_usd, ROUND(SUM(credit_cents) / 100.0, 2) AS total_credits_usd, ROUND((SUM(credit_cents) - SUM(debit_cents)) / 100.0, 2) AS ledger_variance FROM general_ledger_entries;",
      "managerReview": "Ledger variance = $0.00! Double-entry mathematical invariant held across all 18.4 million ledger entries."
    }
  },
  {
    "day": 7,
    "week": 1,
    "phase": "Week 1: Payment Authorizations & Card Routing",
    "title": "Day 07: Week 1 Executive Authorization & Card Network Performance",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Executive Briefing",
    "department": "Core Payments & Card Brand Routing",
    "slackMessage": "End of Week 1! We're briefing Patrick and the Payments Leadership team. Compile a single summary row: total charge volume in USD, overall authorization rate, average processing fee per charge, and distinct active merchants.",
    "contextReport": {
      "businessWhy": "The weekly payments performance scorecard provides board-level visibility into payment gateway health, Gross Processing Volume (GPV), and revenue take-rates.",
      "learningFocus": [
        "Executive KPI rollups in a single projection",
        "Unique merchant entity counting with `COUNT(DISTINCT merchant_id)`",
        "Financial fee average calculations"
      ],
      "sampleSchema": "weekly_payment_rollups (\n  charge_id VARCHAR(36) PRIMARY KEY,\n  merchant_id VARCHAR(20),\n  amount_usd DECIMAL(10,2),\n  fee_usd DECIMAL(6,2),\n  is_approved INT\n)",
      "realWorldTrap": "Don't compute the average fee percentage by averaging individual fee percentages! Always sum total fees and divide by sum of total volume.",
      "interviewRelevance": "Gross Processing Volume (GPV) and net take-rate rollups are the primary financial metrics for merchant payment processors."
    },
    "schema": "weekly_payment_rollups",
    "challenge": {
      "instruction": "Compute total_charges, distinct_merchants, total_volume_usd, overall_auth_rate_pct, and avg_fee_usd across the dataset.",
      "template": "SELECT\n  COUNT(charge_id) AS total_charges,\n  COUNT(DISTINCT merchant_id) AS distinct_merchants,\n  ROUND(SUM(amount_usd), 2) AS total_volume_usd,\n  ROUND(100.0 * SUM(is_approved) / COUNT(*), 2) AS overall_auth_rate_pct,\n  ROUND(AVG(fee_usd), 2) AS avg_fee_usd\nFROM weekly_payment_rollups;",
      "blanks": [
        {
          "id": 1,
          "label": "Approved Rate Sum",
          "answer": "SUM(is_approved)",
          "options": [
            "SUM(is_approved)",
            "COUNT(*)",
            "SUM(fee_usd)",
            "SUM(amount_usd)"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(charge_id) AS total_charges, COUNT(DISTINCT merchant_id) AS distinct_merchants, ROUND(SUM(amount_usd), 2) AS total_volume_usd, ROUND(100.0 * SUM(is_approved) / COUNT(*), 2) AS overall_auth_rate_pct, ROUND(AVG(fee_usd), 2) AS avg_fee_usd FROM weekly_payment_rollups;",
      "managerReview": "Week 1 cleared with distinction! $480M GPV processed with a 91.8% authorization rate. Promoted to L4 Confirmed Payments Engineer!"
    }
  },
  {
    "day": 8,
    "week": 2,
    "phase": "Week 2: Radar ML Fraud & Attack Defense",
    "title": "Day 08: Radar Risk Score Distribution (0-100) & Block Thresholds",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P2 - Sprint",
    "department": "Radar Machine Learning & Fraud Defense",
    "slackMessage": "Welcome to Week 2! Stripe Radar scores every transaction from 0 (lowest risk) to 100 (highest risk). Default rule blocks charges with score >= 75. Calculate total charge volume and block rate percentage across risk score deciles (0-24 Low, 25-64 Normal, 65-74 Elevated, 75-100 Blocked).",
    "contextReport": {
      "businessWhy": "Radar scores billions of signals (device fingerprints, IP proxy hops, card velocity) to block fraudulent charges before authorization. Tuning block thresholds prevents unauthorized chargebacks while minimizing false positives.",
      "learningFocus": [
        "Risk tier decile segmentation with `CASE WHEN`",
        "Block rate percentage calculation",
        "Volume distribution across risk tiers"
      ],
      "sampleSchema": "radar_charge_scores (\n  charge_id VARCHAR(36) PRIMARY KEY,\n  risk_score INT,\n  amount_usd DECIMAL(8,2),\n  is_blocked INT\n)",
      "realWorldTrap": "Don't set block thresholds too low! If you block charges at score >= 60, you will eliminate 95% of fraud but also block 4% of legitimate high-value customers.",
      "interviewRelevance": "Machine learning score threshold tuning and precision/recall trade-offs are classic risk analytics interview questions."
    },
    "schema": "radar_charge_scores",
    "challenge": {
      "instruction": "Categorize risk_score into '0-24 Low', '25-64 Normal', '65-74 Elevated', '75-100 Blocked' as risk_tier. Compute total_charges, total_volume_usd, and block_rate_pct.",
      "template": "SELECT\n  CASE\n    WHEN risk_score < 25 THEN '0-24 Low'\n    WHEN risk_score < 65 THEN '25-64 Normal'\n    WHEN risk_score < 75 THEN '65-74 Elevated'\n    ELSE '75-100 Blocked'\n  END AS risk_tier,\n  COUNT(*) AS total_charges,\n  ROUND(SUM(amount_usd), 2) AS total_volume_usd,\n  ROUND(100.0 * SUM(is_blocked) / COUNT(*), 2) AS block_rate_pct\nFROM radar_charge_scores\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Risk Tier Grouping",
          "answer": "risk_tier",
          "options": [
            "risk_tier",
            "risk_score",
            "charge_id",
            "is_blocked"
          ]
        }
      ],
      "expectedSql": "SELECT CASE WHEN risk_score < 25 THEN '0-24 Low' WHEN risk_score < 65 THEN '25-64 Normal' WHEN risk_score < 75 THEN '65-74 Elevated' ELSE '75-100 Blocked' END AS risk_tier, COUNT(*) AS total_charges, ROUND(SUM(amount_usd), 2) AS total_volume_usd, ROUND(100.0 * SUM(is_blocked) / COUNT(*), 2) AS block_rate_pct FROM radar_charge_scores GROUP BY risk_tier;",
      "managerReview": "Radar blocked $820,000 in fraudulent attempts in the 75-100 tier while keeping false positive blocks under 0.1% in low/normal tiers."
    }
  },
  {
    "day": 9,
    "week": 2,
    "phase": "Week 2: Radar ML Fraud & Attack Defense",
    "title": "Day 09: Card Testing Micro-Transaction Velocity Attacks (>10/Min)",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P1 - High Urgency Attack",
    "department": "Radar Machine Learning & Fraud Defense",
    "slackMessage": "ATTACK IN PROGRESS! Carding bots test stolen credit cards on merchant donation or $1 checkout pages. Identify IP addresses that attempted more than 10 charges within a single 5-minute window with an authorization decline rate > 70%.",
    "contextReport": {
      "businessWhy": "Card testing bots flood payment gateways with thousands of stolen cards to see which ones are active before buying luxury electronics elsewhere. Defeating card testing protects merchants from card network abuse penalties ($15,000/mo).",
      "learningFocus": [
        "Velocity window aggregation by IP address",
        "Dual-condition `HAVING` filters: volume > 10 AND decline_rate > 70%",
        "Automated bot mitigation"
      ],
      "sampleSchema": "card_velocity_logs (\n  attempt_id VARCHAR(36) PRIMARY KEY,\n  ip_address VARCHAR(45),\n  amount_usd DECIMAL(5,2),\n  is_declined INT\n)",
      "realWorldTrap": "Don't block the merchant account! The merchant is the victim of the attack. Block the attacking IP addresses and device fingerprint hashes.",
      "interviewRelevance": "Velocity attacks, card testing defense, and fraud bot pattern detection are top fintech interview topics."
    },
    "schema": "card_velocity_logs",
    "challenge": {
      "instruction": "Find ip_address where COUNT(*) > 10 and (SUM(is_declined) * 100.0 / COUNT(*)) > 70.0. Return ip_address, total_attempts, and decline_pct.",
      "template": "SELECT ip_address,\n  COUNT(*) AS total_attempts,\n  ROUND(100.0 * SUM(is_declined) / COUNT(*), 1) AS decline_pct\nFROM card_velocity_logs\nGROUP BY ip_address\nHAVING COUNT(*) > 10 AND decline_pct ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            "<="
          ]
        },
        {
          "id": 2,
          "label": "Decline Threshold",
          "answer": "70.0",
          "options": [
            "70.0",
            "50.0",
            "90.0",
            "10.0"
          ]
        }
      ],
      "expectedSql": "SELECT ip_address, COUNT(*) AS total_attempts, ROUND(100.0 * SUM(is_declined) / COUNT(*), 1) AS decline_pct FROM card_velocity_logs GROUP BY ip_address HAVING COUNT(*) > 10 AND decline_pct > 70.0;",
      "managerReview": "Identified 8 attacking botnet IP addresses firing 420 micro-charges. Radar auto-firewall banned the IPs immediately."
    }
  },
  {
    "day": 10,
    "week": 2,
    "phase": "Week 2: Radar ML Fraud & Attack Defense",
    "title": "Day 10: Proxy & VPN Geolocation IP Inconsistencies vs Card Country",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P2 - Sprint",
    "department": "Radar Machine Learning & Fraud Defense",
    "slackMessage": "When a customer's IP country is 'Nigeria' but their credit card issuing country is 'Japan', and they are connected via a commercial datacenter VPN, the fraud probability jumps to 88%. Find all transactions where `is_datacenter_vpn = 1` and `ip_country != card_country`.",
    "contextReport": {
      "businessWhy": "Legitimate customers occasionally travel, but fraudsters almost exclusively hide behind commercial VPNs and bulletproof hosting proxies. Cross-referencing IP telemetry with issuing bank geography catches account takeovers.",
      "learningFocus": [
        "Cross-field inconsistency detection (`ip_country != card_country`)",
        "Binary flag filtering (`is_datacenter_vpn = 1`)",
        "High-risk mismatch profiling"
      ],
      "sampleSchema": "transaction_network_intel (\n  charge_id VARCHAR(36) PRIMARY KEY,\n  ip_country VARCHAR(3),\n  card_country VARCHAR(3),\n  is_datacenter_vpn INT,\n  amount_usd DECIMAL(7,2)\n)",
      "realWorldTrap": "Don't auto-block corporate travelers using work VPNs! Check whether the card country and billing country match before issuing a hard block.",
      "interviewRelevance": "Geographic mismatch rules and proxy detection heuristics are common fraud analytics interview questions."
    },
    "schema": "transaction_network_intel",
    "challenge": {
      "instruction": "Find transactions where is_datacenter_vpn = 1 AND ip_country != card_country. Return charge_id, ip_country, card_country, and amount_usd, ordered by amount_usd DESC.",
      "template": "SELECT charge_id, ip_country, card_country, amount_usd\nFROM transaction_network_intel\nWHERE is_datacenter_vpn = 1 AND ip_country ___1___ card_country\nORDER BY amount_usd DESC;",
      "blanks": [
        {
          "id": 1,
          "label": "Inequality Operator",
          "answer": "!=",
          "options": [
            "!=",
            "=",
            "IS NOT",
            "LIKE"
          ]
        }
      ],
      "expectedSql": "SELECT charge_id, ip_country, card_country, amount_usd FROM transaction_network_intel WHERE is_datacenter_vpn = 1 AND ip_country != card_country ORDER BY amount_usd DESC;",
      "managerReview": "Caught 34 high-value mismatched transactions totaling $62,000, routed to 3DS challenge."
    }
  },
  {
    "day": 11,
    "week": 2,
    "phase": "Week 2: Radar ML Fraud & Attack Defense",
    "title": "Day 11: Behavioral Device Fingerprinting & Bot Session Detection",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Sprint",
    "department": "Radar Machine Learning & Fraud Defense",
    "slackMessage": "Stripe.js generates a hardware device fingerprint hash (`fingerprint_hash`). Legitimate users use 1 or 2 devices. Fraud rings cycle through 50 different stolen credit cards on a single physical machine fingerprint. Find fingerprints associated with > 5 distinct card numbers.",
    "contextReport": {
      "businessWhy": "Card numbers change constantly as fraudsters buy stolen dumps, but spoofing browser canvas hashes, WebGL extensions, and hardware clock drift on a physical machine is difficult. Device clustering catches organized crime syndicates.",
      "learningFocus": [
        "`COUNT(DISTINCT card_number_hash)` aggregation",
        "Entity resolution and cluster detection",
        "Filtering with `HAVING COUNT(DISTINCT card_number_hash) > 5`"
      ],
      "sampleSchema": "device_fingerprint_logs (\n  event_id VARCHAR(36) PRIMARY KEY,\n  fingerprint_hash VARCHAR(64),\n  card_number_hash VARCHAR(64),\n  amount_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Don't mistake university computer labs or shared internet cafes for fraud syndicates! Cross-reference with cardholder names and billing ZIP codes before issuing global hardware bans.",
      "interviewRelevance": "Device fingerprinting and card-to-device cardinality analysis are critical for anti-fraud engineering."
    },
    "schema": "device_fingerprint_logs",
    "challenge": {
      "instruction": "Find fingerprint_hash where distinct card count > 5. Return fingerprint_hash, unique_cards, and total_charges_attempted.",
      "template": "SELECT fingerprint_hash,\n  COUNT(DISTINCT card_number_hash) AS unique_cards,\n  COUNT(*) AS total_charges_attempted\nFROM device_fingerprint_logs\nGROUP BY fingerprint_hash\nHAVING COUNT(DISTINCT card_number_hash) ___1___ 5;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            ">="
          ]
        }
      ],
      "expectedSql": "SELECT fingerprint_hash, COUNT(DISTINCT card_number_hash) AS unique_cards, COUNT(*) AS total_charges_attempted FROM device_fingerprint_logs GROUP BY fingerprint_hash HAVING COUNT(DISTINCT card_number_hash) > 5;",
      "managerReview": "Isolated 3 device hashes cycling through 28 unique credit cards each! Hardware hashes permanently blacklisted."
    }
  },
  {
    "day": 12,
    "week": 2,
    "phase": "Week 2: Radar ML Fraud & Attack Defense",
    "title": "Day 12: Machine Learning False Positive Rate vs Merchant Revenue Loss",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P2 - Model Evaluation",
    "department": "Radar Machine Learning & Fraud Defense",
    "slackMessage": "When Radar blocks a legitimate customer, the merchant loses revenue. Calculate the False Positive Rate (FPR): blocked transactions that were subsequently verified as authentic by the cardholder. Compare FPR between 'Radar Default' and 'Radar for High Risk'.",
    "contextReport": {
      "businessWhy": "False positive blocks are 3x more costly to merchants than fraud losses: not only is the sale lost, but the alienated customer frequently never shops with that merchant again.",
      "learningFocus": [
        "Model error classification (False Positives)",
        "FPR calculation: `ROUND(100.0 * SUM(is_false_positive) / SUM(is_blocked), 2) AS false_positive_rate_pct`",
        "Model profile evaluation"
      ],
      "sampleSchema": "radar_model_verdicts (\n  verdict_id VARCHAR(36) PRIMARY KEY,\n  model_profile VARCHAR(30),\n  is_blocked INT,\n  is_false_positive INT\n)",
      "realWorldTrap": "Don't divide false positives by *total transactions*! The False Positive Rate among blocked transactions evaluates how often our blocking hammer hit an innocent nail.",
      "interviewRelevance": "Confusion matrix metrics (Precision, Recall, False Positive Rates) in SQL are vital for ML operations."
    },
    "schema": "radar_model_verdicts",
    "challenge": {
      "instruction": "Compute total_blocks, total_false_positives, and false_positive_rate_pct for each model_profile.",
      "template": "SELECT model_profile,\n  SUM(is_blocked) AS total_blocks,\n  SUM(is_false_positive) AS total_false_positives,\n  ROUND(100.0 * SUM(is_false_positive) / NULLIF(SUM(is_blocked), 0), 2) AS false_positive_rate_pct\nFROM radar_model_verdicts\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Model Profile Dimension",
          "answer": "model_profile",
          "options": [
            "model_profile",
            "is_blocked",
            "verdict_id",
            "total_blocks"
          ]
        }
      ],
      "expectedSql": "SELECT model_profile, SUM(is_blocked) AS total_blocks, SUM(is_false_positive) AS total_false_positives, ROUND(100.0 * SUM(is_false_positive) / NULLIF(SUM(is_blocked), 0), 2) AS false_positive_rate_pct FROM radar_model_verdicts GROUP BY model_profile;",
      "managerReview": "Radar Default maintained a microscopic 0.42% False Positive Rate, saving merchants an estimated $18M in preserved legitimate sales."
    }
  },
  {
    "day": 13,
    "week": 2,
    "phase": "Week 2: Radar ML Fraud & Attack Defense",
    "title": "Day 13: Radar Custom Rules Engine Simulation (Impact Before Shipping)",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P2 - Feature Testing",
    "department": "Radar Machine Learning & Fraud Defense",
    "slackMessage": "Merchants can write custom rules: e.g. `BLOCK if :amount_in_usd: > 1000 AND :risk_level: = 'elevated'`. Before a merchant deploys this rule live, simulate its historical impact: calculate how many past transactions would have been blocked and total dollar value.",
    "contextReport": {
      "businessWhy": "Dry-running rules against historical transactions prevents merchants from accidentally blocking their best VIP customers with overly aggressive custom criteria.",
      "learningFocus": [
        "Rule backtesting simulation logic",
        "Conditional volume aggregation under simulated predicates",
        "Risk vs revenue trade-off quantification"
      ],
      "sampleSchema": "historical_merchant_charges (\n  charge_id VARCHAR(36) PRIMARY KEY,\n  amount_usd DECIMAL(8,2),\n  risk_level VARCHAR(20),\n  disputed INT\n)",
      "realWorldTrap": "Always compare simulated blocks against whether the charges actually resulted in chargebacks! If a rule would have blocked 100 charges but none were disputed, the rule is harmful.",
      "interviewRelevance": "Rule engine backtesting and simulation in financial risk platforms is a classic interview scenario."
    },
    "schema": "historical_merchant_charges",
    "challenge": {
      "instruction": "Simulate rule: amount_usd > 1000 AND risk_level = 'elevated'. Calculate total_simulated_blocks, total_dollar_impact, and actual_fraud_caught (SUM(disputed)).",
      "template": "SELECT\n  COUNT(CASE WHEN amount_usd > 1000 AND risk_level = 'elevated' THEN 1 END) AS simulated_blocks,\n  ROUND(SUM(CASE WHEN amount_usd > 1000 AND risk_level = 'elevated' THEN amount_usd ELSE 0 END), 2) AS dollar_impact,\n  SUM(CASE WHEN amount_usd > 1000 AND risk_level = 'elevated' AND disputed = 1 THEN 1 ELSE 0 END) AS actual_fraud_caught\nFROM historical_merchant_charges;",
      "blanks": [
        {
          "id": 1,
          "label": "Simulated Rule Filter",
          "answer": "amount_usd > 1000 AND risk_level = 'elevated'",
          "options": [
            "amount_usd > 1000 AND risk_level = 'elevated'",
            "amount_usd > 1000",
            "risk_level = 'elevated'",
            "disputed = 1"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(CASE WHEN amount_usd > 1000 AND risk_level = 'elevated' THEN 1 END) AS simulated_blocks, ROUND(SUM(CASE WHEN amount_usd > 1000 AND risk_level = 'elevated' THEN amount_usd ELSE 0 END), 2) AS dollar_impact, SUM(CASE WHEN amount_usd > 1000 AND risk_level = 'elevated' AND disputed = 1 THEN 1 ELSE 0 END) AS actual_fraud_caught FROM historical_merchant_charges;",
      "managerReview": "Simulation verified: The rule would block 18 charges ($24,500), of which 16 were confirmed fraud. Rule cleared to ship!"
    }
  },
  {
    "day": 14,
    "week": 2,
    "phase": "Week 2: Radar ML Fraud & Attack Defense",
    "title": "Day 14: Merchant High-Risk Industry Classification & Rolling Reserves",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P1 - Underwriting & Risk",
    "department": "Merchant Risk Underwriting",
    "slackMessage": "Merchants in high-risk categories (online gaming, ticketing, travel) hold a 10% rolling reserve for 90 days to cover potential chargeback surges. Calculate each merchant's current rolling reserve requirement and total available balance after reserve withholding.",
    "contextReport": {
      "businessWhy": "If an airline or concert promoter goes bankrupt, ticket buyers file millions in chargebacks. Rolling reserves protect Stripe from catastrophic merchant insolvency defaults.",
      "learningFocus": [
        "Financial reserve calculations: `ROUND(gross_balance * 0.10, 2) AS rolling_reserve_usd`",
        "Net available liquidity math: `gross_balance - rolling_reserve`",
        "Industry risk categorization"
      ],
      "sampleSchema": "merchant_risk_balances (\n  merchant_id VARCHAR(20) PRIMARY KEY,\n  industry_category VARCHAR(30),\n  gross_balance_usd DECIMAL(10,2),\n  is_high_risk INT\n)",
      "realWorldTrap": "Don't withhold reserves on low-risk SaaS or retail merchants! Underwriting contracts specify exact reserve schedules; unauthorized withholding breaches merchant agreements.",
      "interviewRelevance": "Credit risk underwriting, rolling reserves, and platform solvency protections are key fintech risk topics."
    },
    "schema": "merchant_risk_balances",
    "challenge": {
      "instruction": "For is_high_risk = 1 merchants, compute merchant_id, industry_category, gross_balance_usd, rolling_reserve_usd (10%), and available_payout_usd (90%).",
      "template": "SELECT merchant_id, industry_category, gross_balance_usd,\n  ROUND(gross_balance_usd * 0.10, 2) AS rolling_reserve_usd,\n  ROUND(gross_balance_usd * 0.90, 2) AS available_payout_usd\nFROM merchant_risk_balances\nWHERE is_high_risk = ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Risk Filter",
          "answer": "1",
          "options": [
            "1",
            "0",
            "NULL",
            "ALL"
          ]
        }
      ],
      "expectedSql": "SELECT merchant_id, industry_category, gross_balance_usd, ROUND(gross_balance_usd * 0.10, 2) AS rolling_reserve_usd, ROUND(gross_balance_usd * 0.90, 2) AS available_payout_usd FROM merchant_risk_balances WHERE is_high_risk = 1;",
      "managerReview": "High-risk reserves successfully allocated across 45 merchants totaling $2.8M in collateral protection. Promoted to L4 Confirmed Payments Engineer!"
    }
  },
  {
    "day": 15,
    "week": 3,
    "phase": "Week 3: Chargeback Disputes & Early Warnings",
    "title": "Day 15: Dispute Ratio Invariant (< 0.90% Card Network Program Threshold)",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P1 - Card Network Invariant",
    "department": "Disputes, Evidence & Network Compliance",
    "slackMessage": "Welcome to Week 3! Visa and Mastercard mandate that merchant dispute ratios: `dispute_count / total_successful_charges` must remain strictly below 0.90%. If a merchant exceeds 0.90%, they enter the Visa Dispute Monitoring Program (VDMP) with $50/charge fines. Identify merchants with dispute_ratio_pct > 0.90%.",
    "contextReport": {
      "businessWhy": "Excessive chargebacks threaten Stripe's acquiring licenses with Visa and Mastercard. Monitoring dispute ratios daily protects the entire platform from network fines and merchant shutdown.",
      "learningFocus": [
        "Card network dispute ratio metric: `ROUND(100.0 * dispute_count / NULLIF(charge_count, 0), 2) AS dispute_ratio_pct`",
        "Threshold breach detection (`dispute_ratio_pct > 0.90`)",
        "Merchant compliance enforcement"
      ],
      "sampleSchema": "merchant_dispute_ratios (\n  merchant_id VARCHAR(20) PRIMARY KEY,\n  charge_count INT,\n  dispute_count INT\n)",
      "realWorldTrap": "Visa calculates dispute ratio as: disputes in month M divided by transactions in month M! They do NOT match individual charges to their eventual disputes. You must use monthly counts.",
      "interviewRelevance": "Payment network compliance ratios (VDMP, VFMP) and acquiring license protections are vital for senior payments quants."
    },
    "schema": "merchant_dispute_ratios",
    "challenge": {
      "instruction": "Compute charge_count, dispute_count, and dispute_ratio_pct for each merchant where dispute_ratio_pct > 0.90, ordered by dispute_ratio_pct DESC.",
      "template": "SELECT merchant_id, charge_count, dispute_count,\n  ROUND(100.0 * dispute_count / NULLIF(charge_count, 0), 2) AS dispute_ratio_pct\nFROM merchant_dispute_ratios\nWHERE (100.0 * dispute_count / NULLIF(charge_count, 0)) ___1___ ___2___\nORDER BY dispute_ratio_pct DESC;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            ">="
          ]
        },
        {
          "id": 2,
          "label": "Network Cap Threshold",
          "answer": "0.90",
          "options": [
            "0.90",
            "1.50",
            "2.00",
            "0.50"
          ]
        }
      ],
      "expectedSql": "SELECT merchant_id, charge_count, dispute_count, ROUND(100.0 * dispute_count / NULLIF(charge_count, 0), 2) AS dispute_ratio_pct FROM merchant_dispute_ratios WHERE (100.0 * dispute_count / NULLIF(charge_count, 0)) > 0.90 ORDER BY dispute_ratio_pct DESC;",
      "managerReview": "Caught 3 merchants breaching the 0.90% threshold. Automated Radar stricter rules deployed to throttle fraudulent checkout vectors."
    }
  },
  {
    "day": 16,
    "week": 3,
    "phase": "Week 3: Chargeback Disputes & Early Warnings",
    "title": "Day 16: Visa TC40 & Mastercard SAFE Early Fraud Warning Signals",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Sprint",
    "department": "Disputes, Evidence & Network Compliance",
    "slackMessage": "Banks file TC40/SAFE fraud reports days before an official chargeback arrives. If a merchant refunds a TC40 alert immediately, the official chargeback is prevented and their dispute ratio is saved. Calculate how many TC40 alerts were successfully refunded before formal dispute filing.",
    "contextReport": {
      "businessWhy": "Early fraud warnings give merchants a 24-48 hour window to issue proactive refunds, preventing costly dispute fees ($15 per chargeback) and keeping their network dispute ratios clean.",
      "learningFocus": [
        "Early warning signal conversion tracking",
        "Prevented dispute rate calculation: `ROUND(100.0 * SUM(was_refunded_early) / COUNT(*), 1) AS prevention_rate_pct`",
        "Dispute avoidance economics"
      ],
      "sampleSchema": "early_fraud_alerts (\n  alert_id VARCHAR(36) PRIMARY KEY,\n  card_brand VARCHAR(20),\n  alert_type VARCHAR(10), -- 'TC40', 'SAFE'\n  was_refunded_early INT\n)",
      "realWorldTrap": "A refund costs the transaction amount, but a chargeback costs the transaction amount PLUS a $15 fee PLUS network penalty points. Refunding early is almost always economically superior.",
      "interviewRelevance": "Visa TC40 and Mastercard SAFE warning processing are advanced payment operations concepts."
    },
    "schema": "early_fraud_alerts",
    "challenge": {
      "instruction": "Compute total_alerts, refunded_early_count, and prevention_rate_pct for each alert_type.",
      "template": "SELECT alert_type,\n  COUNT(*) AS total_alerts,\n  SUM(was_refunded_early) AS refunded_early_count,\n  ROUND(100.0 * SUM(was_refunded_early) / COUNT(*), 1) AS prevention_rate_pct\nFROM early_fraud_alerts\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Alert Dimension",
          "answer": "alert_type",
          "options": [
            "alert_type",
            "card_brand",
            "alert_id",
            "was_refunded_early"
          ]
        }
      ],
      "expectedSql": "SELECT alert_type, COUNT(*) AS total_alerts, SUM(was_refunded_early) AS refunded_early_count, ROUND(100.0 * SUM(was_refunded_early) / COUNT(*), 1) AS prevention_rate_pct FROM early_fraud_alerts GROUP BY alert_type;",
      "managerReview": "74.8% of TC40 alerts were auto-refunded, saving merchants 3,400 formal chargebacks this month."
    }
  },
  {
    "day": 17,
    "week": 3,
    "phase": "Week 3: Chargeback Disputes & Early Warnings",
    "title": "Day 17: Chargeback Reason Codes & Win-Rate Probability Analysis",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P2 - Sprint",
    "department": "Disputes, Evidence & Network Compliance",
    "slackMessage": "Disputes arise for different reasons: 'fraudulent' (stolen card), 'product_not_received', or 'unrecognized'. Query historical disputes: calculate total disputes, total won, and win-rate percentage by reason code. Where does automated evidence submission have the highest ROI?",
    "contextReport": {
      "businessWhy": "Fighting fraudulent chargebacks with banks is nearly impossible (win rate < 12%) because the true cardholder didn't authorize it. Fighting 'product_not_received' with FedEx tracking proof has an 82% win rate. Resource allocation matters.",
      "learningFocus": [
        "Win-rate percentage calculation: `ROUND(100.0 * COUNT(CASE WHEN outcome = 'WON' THEN 1 END) / COUNT(*), 1) AS win_rate_pct`",
        "Dispute reason code dimension grouping",
        "Sorting by win likelihood descending"
      ],
      "sampleSchema": "dispute_outcomes (\n  dispute_id VARCHAR(36) PRIMARY KEY,\n  reason_code VARCHAR(30),\n  outcome VARCHAR(20) -- 'WON', 'LOST'\n)",
      "realWorldTrap": "Don't submit evidence for disputes that have already expired! Banks give merchants exactly 7 to 21 days to submit proof; late submissions are automatically ruled 'LOST'.",
      "interviewRelevance": "Reason code taxonomy and dispute win-rate optimization are central to merchant operations."
    },
    "schema": "dispute_outcomes",
    "challenge": {
      "instruction": "Compute total_disputes, total_won, and win_rate_pct for each reason_code, ordered by win_rate_pct DESC.",
      "template": "SELECT reason_code,\n  COUNT(*) AS total_disputes,\n  COUNT(CASE WHEN outcome = 'WON' THEN 1 END) AS total_won,\n  ROUND(100.0 * COUNT(CASE WHEN outcome = 'WON' THEN 1 END) / COUNT(*), 1) AS win_rate_pct\nFROM dispute_outcomes\nGROUP BY ___1___\nORDER BY win_rate_pct ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Reason Dimension",
          "answer": "reason_code",
          "options": [
            "reason_code",
            "outcome",
            "dispute_id",
            "total_won"
          ]
        },
        {
          "id": 2,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT reason_code, COUNT(*) AS total_disputes, COUNT(CASE WHEN outcome = 'WON' THEN 1 END) AS total_won, ROUND(100.0 * COUNT(CASE WHEN outcome = 'WON' THEN 1 END) / COUNT(*), 1) AS win_rate_pct FROM dispute_outcomes GROUP BY reason_code ORDER BY win_rate_pct DESC;",
      "managerReview": "'Product Not Received' achieved an 81.4% win rate when paired with signature-on-delivery tracking. Automated evidence dispatch enabled."
    }
  },
  {
    "day": 18,
    "week": 3,
    "phase": "Week 3: Chargeback Disputes & Early Warnings",
    "title": "Day 18: Automated Dispute Evidence Submission Funnel & Recovery Yield",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Sprint",
    "department": "Disputes, Evidence & Network Compliance",
    "slackMessage": "Merchants using Stripe's automated evidence generation recover millions without lifting a finger. Query dispute recovery pipelines: calculate total disputed dollars, total dollars recovered, and net recovery yield for merchants with automated evidence enabled.",
    "contextReport": {
      "businessWhy": "Manual dispute defense takes 45 minutes per claim: gathering server access logs, proof of delivery, and terms of service. Automated evidence pipelines compile audit dossiers in 200ms, maximizing recovered GMV.",
      "learningFocus": [
        "Financial recovery yield: `ROUND(100.0 * SUM(recovered_usd) / SUM(disputed_usd), 2) AS recovery_yield_pct`",
        "Aggregation across multi-dollar amounts",
        "Evaluating automation lift"
      ],
      "sampleSchema": "dispute_recovery_funnel (\n  funnel_id VARCHAR(36) PRIMARY KEY,\n  merchant_id VARCHAR(20),\n  disputed_usd DECIMAL(8,2),\n  recovered_usd DECIMAL(8,2)\n)",
      "realWorldTrap": "Card issuers take up to 90 days to issue a final verdict! Ensure your query filters for settled dispute cycles rather than pending cases.",
      "interviewRelevance": "Automated workflow ROI and dollar recovery yield modeling are prized in fintech engineering."
    },
    "schema": "dispute_recovery_funnel",
    "challenge": {
      "instruction": "Compute total_disputed_usd, total_recovered_usd, and recovery_yield_pct across the dataset.",
      "template": "SELECT\n  ROUND(SUM(disputed_usd), 2) AS total_disputed_usd,\n  ROUND(SUM(recovered_usd), 2) AS total_recovered_usd,\n  ROUND(100.0 * SUM(recovered_usd) / SUM(disputed_usd), 2) AS recovery_yield_pct\nFROM dispute_recovery_funnel;",
      "blanks": [
        {
          "id": 1,
          "label": "Yield Denominator",
          "answer": "SUM(disputed_usd)",
          "options": [
            "SUM(disputed_usd)",
            "SUM(recovered_usd)",
            "COUNT(*)",
            "100.0"
          ]
        }
      ],
      "expectedSql": "SELECT ROUND(SUM(disputed_usd), 2) AS total_disputed_usd, ROUND(SUM(recovered_usd), 2) AS total_recovered_usd, ROUND(100.0 * SUM(recovered_usd) / SUM(disputed_usd), 2) AS recovery_yield_pct FROM dispute_recovery_funnel;",
      "managerReview": "Automated evidence recovered $3.45M out of $8.20M disputed (42.1% recovery yield) with zero manual merchant overhead!"
    }
  },
  {
    "day": 19,
    "week": 3,
    "phase": "Week 3: Chargeback Disputes & Early Warnings",
    "title": "Day 19: Merchant Negative Balance Deficit Recovery & Auto-Debits",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P1 - Credit & Solvency",
    "department": "Treasury Credit Risk & Collections",
    "slackMessage": "When chargebacks exceed a merchant's incoming sales, their Stripe balance turns negative. Stripe auto-debits their linked bank account via ACH to restore liquidity. Query negative balances: identify merchants with deficit > $5,000 for > 7 days where auto-debit has failed.",
    "contextReport": {
      "businessWhy": "Negative balances are unsecured loans: if a merchant defaults and closes their bank account, Stripe is legally liable to the card networks for the funds. Swift deficit recovery protects platform equity.",
      "learningFocus": [
        "Credit deficit threshold filtering (`balance_usd < -5000.0`)",
        "Aging lag calculation (`days_in_deficit > 7`)",
        "Auto-debit failure handling"
      ],
      "sampleSchema": "merchant_deficit_accounts (\n  merchant_id VARCHAR(20) PRIMARY KEY,\n  balance_usd DECIMAL(10,2),\n  days_in_deficit INT,\n  ach_debit_failed INT\n)",
      "realWorldTrap": "Don't send collections agencies after merchants whose daily sales will clear the deficit by tomorrow! Check recent sales velocity before escalating to legal collections.",
      "interviewRelevance": "Credit exposure, aging schedules, and negative balance recovery are standard fintech treasury interview questions."
    },
    "schema": "merchant_deficit_accounts",
    "challenge": {
      "instruction": "Find merchants with balance_usd < -5000.0 AND days_in_deficit > 7 AND ach_debit_failed = 1. Return merchant_id, balance_usd, and days_in_deficit.",
      "template": "SELECT merchant_id, balance_usd, days_in_deficit\nFROM merchant_deficit_accounts\nWHERE balance_usd < -5000.0 AND days_in_deficit > 7 AND ach_debit_failed = ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "ACH Failure Flag",
          "answer": "1",
          "options": [
            "1",
            "0",
            "NULL",
            "ALL"
          ]
        }
      ],
      "expectedSql": "SELECT merchant_id, balance_usd, days_in_deficit FROM merchant_deficit_accounts WHERE balance_usd < -5000.0 AND days_in_deficit > 7 AND ach_debit_failed = 1;",
      "managerReview": "Isolated 5 accounts in critical deficit totaling $48,200. Accounts locked and secondary recovery proceedings initiated."
    }
  },
  {
    "day": 20,
    "week": 3,
    "phase": "Week 3: Chargeback Disputes & Early Warnings",
    "title": "Day 20: Pre-Arbitration & Formal Arbitration Escalation Financial Risk",
    "sender": "Alexander Thorne",
    "senderRole": "L5 Lead Risk & Dispute Strategist",
    "senderAvatar": "AT",
    "priority": "P1 - High Stakes Legal",
    "department": "Disputes, Evidence & Network Compliance",
    "slackMessage": "If a merchant wins a dispute, the issuing bank can escalate to formal Arbitration. The losing party pays a $500 network filing fee to Visa. Query disputes in 'Pre-Arbitration': calculate potential fee exposure if all cases are lost vs the disputed transaction amounts.",
    "contextReport": {
      "businessWhy": "Formal card brand arbitration carries high penalty stakes ($500 non-refundable network fee). If a merchant is fighting over a $40 t-shirt, escalating to arbitration is financial suicide even if they are 100% in the right.",
      "learningFocus": [
        "Risk-weighted financial modeling",
        "Comparing fixed filing fees ($500) against disputed principal amounts",
        "Arbitration go/no-go logic"
      ],
      "sampleSchema": "arbitration_cases (\n  case_id VARCHAR(36) PRIMARY KEY,\n  merchant_id VARCHAR(20),\n  disputed_amount_usd DECIMAL(8,2),\n  network_fee_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Never pursue arbitration if `disputed_amount < network_fee` unless a crucial legal precedent is at stake! Rational economic calculation must govern dispute escalation.",
      "interviewRelevance": "Arbitration cost-benefit analysis and legal financial modeling are asked in senior risk roles."
    },
    "schema": "arbitration_cases",
    "challenge": {
      "instruction": "Compute total_cases, total_disputed_principal, total_fee_exposure (SUM(network_fee_usd)), and recommended_settle_count (cases where disputed_amount < network_fee).",
      "template": "SELECT\n  COUNT(*) AS total_cases,\n  ROUND(SUM(disputed_amount_usd), 2) AS total_disputed_principal,\n  ROUND(SUM(network_fee_usd), 2) AS total_fee_exposure,\n  COUNT(CASE WHEN disputed_amount_usd < network_fee_usd THEN 1 END) AS recommended_settle_count\nFROM arbitration_cases;",
      "blanks": [
        {
          "id": 1,
          "label": "Fee Exposure Sum",
          "answer": "SUM(network_fee_usd)",
          "options": [
            "SUM(network_fee_usd)",
            "SUM(disputed_amount_usd)",
            "COUNT(*)",
            "500.0"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(*) AS total_cases, ROUND(SUM(disputed_amount_usd), 2) AS total_disputed_principal, ROUND(SUM(network_fee_usd), 2) AS total_fee_exposure, COUNT(CASE WHEN disputed_amount_usd < network_fee_usd THEN 1 END) AS recommended_settle_count FROM arbitration_cases;",
      "managerReview": "Recommended settling 18 out of 22 cases where principal was under $500, avoiding $9,000 in unnecessary network filing fees."
    }
  },
  {
    "day": 21,
    "week": 3,
    "phase": "Week 3: Chargeback Disputes & Early Warnings",
    "title": "Day 21: Card Network Excessive Dispute Monitoring Program (VDMP)",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P1 - Regulatory & Network Licensing",
    "department": "Disputes, Evidence & Network Compliance",
    "slackMessage": "Today is Network Compliance Review! Visa monitors acquiring banks under the Visa Dispute Monitoring Program (VDMP). A merchant is classified into 'Standard' (dispute ratio >= 0.90% and >= 100 disputes) or 'Excessive' (>= 1.80% and >= 1,000 disputes). Write the logic that categorizes merchants into their correct VDMP program tier.",
    "contextReport": {
      "businessWhy": "Entering VDMP Excessive tier triggers mandatory fines of $50 per dispute and immediate threat of card processing termination. Algorithmic tier assignment enables preemptive intervention before monthly network reporting.",
      "learningFocus": [
        "Multi-variable program tier classification with `CASE WHEN`",
        "Evaluating ratios and counts in unison",
        "Compliance reporting"
      ],
      "sampleSchema": "vdmp_merchant_metrics (\n  merchant_id VARCHAR(20) PRIMARY KEY,\n  monthly_disputes INT,\n  dispute_ratio_pct DECIMAL(5,2)\n)",
      "realWorldTrap": "Order of `WHEN` clauses matters! If you test `dispute_ratio_pct >= 0.90` before `dispute_ratio_pct >= 1.80`, Excessive merchants will be swallowed by the Standard tier.",
      "interviewRelevance": "Multi-tier regulatory classification and network risk programs are standard senior fintech interview prompts."
    },
    "schema": "vdmp_merchant_metrics",
    "challenge": {
      "instruction": "Classify merchants: 'Excessive' if dispute_ratio_pct >= 1.80 AND monthly_disputes >= 1000; 'Standard' if dispute_ratio_pct >= 0.90 AND monthly_disputes >= 100; else 'Compliant' as vdmp_status.",
      "template": "SELECT merchant_id, monthly_disputes, dispute_ratio_pct,\n  CASE\n    WHEN dispute_ratio_pct >= 1.80 AND monthly_disputes >= 1000 THEN 'Excessive'\n    WHEN dispute_ratio_pct >= 0.90 AND monthly_disputes >= 100 THEN 'Standard'\n    ELSE 'Compliant'\n  END AS vdmp_status\nFROM vdmp_merchant_metrics;",
      "blanks": [
        {
          "id": 1,
          "label": "Excessive Threshold",
          "answer": "1.80",
          "options": [
            "1.80",
            "0.90",
            "2.00",
            "5.00"
          ]
        }
      ],
      "expectedSql": "SELECT merchant_id, monthly_disputes, dispute_ratio_pct, CASE WHEN dispute_ratio_pct >= 1.80 AND monthly_disputes >= 1000 THEN 'Excessive' WHEN dispute_ratio_pct >= 0.90 AND monthly_disputes >= 100 THEN 'Standard' ELSE 'Compliant' END AS vdmp_status FROM vdmp_merchant_metrics;",
      "managerReview": "Compliance verified! Zero merchants in Excessive tier; 2 merchants in Standard tier placed on immediate remediation. Promoted to L5 Senior Risk Quantitative Analyst!"
    }
  },
  {
    "day": 22,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 22: Stripe Billing Smart Retries Recovery Rate by Hour of Day",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Machine Learning Optimization",
    "department": "Stripe Billing & Smart Retries Engine",
    "slackMessage": "Welcome to Week 4! Stripe Billing's Smart Retries engine uses machine learning to choose the optimal minute to retry declined subscription invoices. Calculate the retry success rate: `recovered / total_retried` across 24 hours of the day. Which hours achieve the highest recovery rate?",
    "contextReport": {
      "businessWhy": "Retrying at random times recovers 12% of declined charges. Smart Retries analyzes customer payday deposit schedules, banking batch processing windows, and cardholder timezones to recover up to 38% of lost subscriptions.",
      "learningFocus": [
        "Hourly temporal aggregation (`GROUP BY retry_hour`)",
        "Success rate ratio: `ROUND(100.0 * SUM(was_recovered) / COUNT(*), 1) AS recovery_rate_pct`",
        "Optimal retry window discovery"
      ],
      "sampleSchema": "smart_retry_attempts (\n  attempt_id VARCHAR(36) PRIMARY KEY,\n  retry_hour INT,\n  was_recovered INT\n)",
      "realWorldTrap": "Don't analyze retry hours in UTC without converting to the cardholder's local timezone! Retrying at 3:00 AM local time almost always fails because banking fraud systems flag midnight batch transactions.",
      "interviewRelevance": "Machine learning retry scheduling and temporal optimization queries are classic fintech interview questions."
    },
    "schema": "smart_retry_attempts",
    "challenge": {
      "instruction": "Compute total_retries, total_recovered, and recovery_rate_pct for each retry_hour, ordered by recovery_rate_pct DESC.",
      "template": "SELECT retry_hour,\n  COUNT(*) AS total_retries,\n  SUM(was_recovered) AS total_recovered,\n  ROUND(100.0 * SUM(was_recovered) / COUNT(*), 1) AS recovery_rate_pct\nFROM smart_retry_attempts\nGROUP BY retry_hour\nORDER BY recovery_rate_pct ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Sort Order",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT retry_hour, COUNT(*) AS total_retries, SUM(was_recovered) AS total_recovered, ROUND(100.0 * SUM(was_recovered) / COUNT(*), 1) AS recovery_rate_pct FROM smart_retry_attempts GROUP BY retry_hour ORDER BY recovery_rate_pct DESC;",
      "managerReview": "Hours 6:00 AM - 9:00 AM local time achieved a 41.2% recovery rate (payroll direct deposits clearing!), while 1:00 AM - 4:00 AM dropped to 8.4%."
    }
  },
  {
    "day": 23,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 23: Card Account Updater API Automatic Replacement Success Rates",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Sprint",
    "department": "Core Payments & Tokenization",
    "slackMessage": "When a customer's credit card expires or is reissued with a new expiration date, Stripe Card Account Updater automatically queries Visa/Mastercard networks to update the tokenized card details behind the scenes. Calculate the token update success rate by card brand.",
    "contextReport": {
      "businessWhy": "Over 20% of cards change annually due to expiration, loss, or fraud reissuance. Automatically updating card tokens eliminates churn without requiring subscribers to manually type in new card details.",
      "learningFocus": [
        "Tokenization update rate: `ROUND(100.0 * COUNT(CASE WHEN update_status = 'UPDATED' THEN 1 END) / COUNT(*), 1) AS update_success_pct`",
        "Card brand dimension grouping",
        "Preventing card-expiration churn"
      ],
      "sampleSchema": "account_updater_events (\n  event_id VARCHAR(36) PRIMARY KEY,\n  card_brand VARCHAR(20),\n  update_status VARCHAR(20) -- 'UPDATED', 'CLOSED_ACCOUNT', 'UNSUPPORTED'\n)",
      "realWorldTrap": "Don't count 'CLOSED_ACCOUNT' as a failure of Account Updater! If the customer closed their bank account, the correct answer is indeed to stop charging that card.",
      "interviewRelevance": "Payment tokenization lifecycles and Account Updater network protocols are standard payments engineering questions."
    },
    "schema": "account_updater_events",
    "challenge": {
      "instruction": "Compute total_cards_checked, total_updated, and update_success_pct for each card_brand.",
      "template": "SELECT card_brand,\n  COUNT(*) AS total_cards_checked,\n  COUNT(CASE WHEN update_status = 'UPDATED' THEN 1 END) AS total_updated,\n  ROUND(100.0 * COUNT(CASE WHEN update_status = 'UPDATED' THEN 1 END) / COUNT(*), 1) AS update_success_pct\nFROM account_updater_events\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Card Brand Dimension",
          "answer": "card_brand",
          "options": [
            "card_brand",
            "event_id",
            "update_status",
            "total_updated"
          ]
        }
      ],
      "expectedSql": "SELECT card_brand, COUNT(*) AS total_cards_checked, COUNT(CASE WHEN update_status = 'UPDATED' THEN 1 END) AS total_updated, ROUND(100.0 * COUNT(CASE WHEN update_status = 'UPDATED' THEN 1 END) / COUNT(*), 1) AS update_success_pct FROM account_updater_events GROUP BY card_brand;",
      "managerReview": "Visa achieved 89.2% auto-update success; Mastercard at 86.4%. Millions in recurring subscriptions seamlessly preserved."
    }
  },
  {
    "day": 24,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 24: SaaS MRR Waterfall Decomposition (New, Expansion, Churn)",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P1 - SaaS Financial Bridge",
    "department": "Stripe Billing & Revenue Recognition",
    "slackMessage": "For Stripe Billing customers, we generate automated GAAP Monthly Recurring Revenue (MRR) waterfalls. Given monthly subscription invoices, calculate New MRR, Expansion MRR, Contraction MRR, and Churned MRR between September and October 2026.",
    "contextReport": {
      "businessWhy": "MRR waterfalls are the core dashboard for every subscription SaaS CFO. Decomposing net growth into new logos vs expansion proves Net Revenue Retention (NRR).",
      "learningFocus": [
        "Self-joining subscription snapshots across two consecutive months",
        "Classifying revenue deltas into New, Expansion, Contraction, and Churn",
        "MRR financial waterfall generation"
      ],
      "sampleSchema": "mrr_customer_snapshots (\n  customer_id VARCHAR(20) PRIMARY KEY,\n  mrr_september DECIMAL(8,2),\n  mrr_october DECIMAL(8,2)\n)",
      "realWorldTrap": "Remember that Churned customers have `mrr_september > 0` and `mrr_october = 0`, while New customers have `mrr_september = 0` and `mrr_october > 0`! Do not mix up the directionality.",
      "interviewRelevance": "SaaS MRR waterfalls and revenue bridge SQL queries are among the most requested interview drills across tech."
    },
    "schema": "mrr_customer_snapshots",
    "challenge": {
      "instruction": "Calculate total_new_mrr (where sept = 0), total_expansion_mrr (where oct > sept > 0), total_contraction_mrr (where 0 < oct < sept), and total_churn_mrr (where sept > 0 and oct = 0).",
      "template": "SELECT\n  ROUND(SUM(CASE WHEN mrr_september = 0 AND mrr_october > 0 THEN mrr_october ELSE 0 END), 2) AS new_mrr,\n  ROUND(SUM(CASE WHEN mrr_september > 0 AND mrr_october > mrr_september THEN (mrr_october - mrr_september) ELSE 0 END), 2) AS expansion_mrr,\n  ROUND(SUM(CASE WHEN mrr_october > 0 AND mrr_october < mrr_september THEN (mrr_september - mrr_october) ELSE 0 END), 2) AS contraction_mrr,\n  ROUND(SUM(CASE WHEN mrr_september > 0 AND mrr_october = 0 THEN mrr_september ELSE 0 END), 2) AS churn_mrr\nFROM mrr_customer_snapshots;",
      "blanks": [
        {
          "id": 1,
          "label": "New MRR Condition",
          "answer": "mrr_september = 0 AND mrr_october > 0",
          "options": [
            "mrr_september = 0 AND mrr_october > 0",
            "mrr_october > 0",
            "mrr_september > 0",
            "mrr_october = 0"
          ]
        }
      ],
      "expectedSql": "SELECT ROUND(SUM(CASE WHEN mrr_september = 0 AND mrr_october > 0 THEN mrr_october ELSE 0 END), 2) AS new_mrr, ROUND(SUM(CASE WHEN mrr_september > 0 AND mrr_october > mrr_september THEN (mrr_october - mrr_september) ELSE 0 END), 2) AS expansion_mrr, ROUND(SUM(CASE WHEN mrr_october > 0 AND mrr_october < mrr_september THEN (mrr_september - mrr_october) ELSE 0 END), 2) AS contraction_mrr, ROUND(SUM(CASE WHEN mrr_september > 0 AND mrr_october = 0 THEN mrr_september ELSE 0 END), 2) AS churn_mrr FROM mrr_customer_snapshots;",
      "managerReview": "SaaS MRR Waterfall perfectly reconciled! New: +$145K, Expansion: +$82K, Contraction: -$18K, Churn: -$32K (Net Growth: +$177K)."
    }
  },
  {
    "day": 25,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 25: Automated Sales Tax Nexus Calculation (Stripe Tax)",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P2 - Regulatory Tax",
    "department": "Stripe Tax & Regulatory Compliance",
    "slackMessage": "Under US economic nexus laws (Wayfair ruling), an online merchant must register and remit sales tax once their sales in a state exceed $100,000 OR 200 separate transactions. Query merchant sales by US state: identify states where the merchant has crossed the economic nexus threshold.",
    "contextReport": {
      "businessWhy": "Sales tax compliance across 11,000+ US taxing jurisdictions is a nightmare for digital businesses. Stripe Tax automates economic nexus monitoring so merchants never face unexpected state audit penalties.",
      "learningFocus": [
        "Multi-criteria economic nexus logic (`total_sales > 100000 OR total_transactions > 200`)",
        "State-level aggregation",
        "Tax compliance threshold monitoring"
      ],
      "sampleSchema": "merchant_state_sales (\n  record_id VARCHAR(36) PRIMARY KEY,\n  merchant_id VARCHAR(20),\n  state_code VARCHAR(2),\n  sale_amount_usd DECIMAL(8,2)\n)",
      "realWorldTrap": "Some states (like California) require $500,000 in sales, while others (like Kansas) have no transaction count threshold. Advanced tax engines use state-specific threshold parameter tables.",
      "interviewRelevance": "Regulatory thresholds, economic nexus calculations, and state-level grouping are key fintech tax topics."
    },
    "schema": "merchant_state_sales",
    "challenge": {
      "instruction": "For each state_code, compute total_transactions, total_sales_usd. Filter to states where total_sales_usd > 100000.0 OR total_transactions > 200.",
      "template": "SELECT state_code,\n  COUNT(*) AS total_transactions,\n  ROUND(SUM(sale_amount_usd), 2) AS total_sales_usd\nFROM merchant_state_sales\nGROUP BY state_code\nHAVING SUM(sale_amount_usd) > 100000.0 OR COUNT(*) ___1___ 200;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            ">="
          ]
        }
      ],
      "expectedSql": "SELECT state_code, COUNT(*) AS total_transactions, ROUND(SUM(sale_amount_usd), 2) AS total_sales_usd FROM merchant_state_sales GROUP BY state_code HAVING SUM(sale_amount_usd) > 100000.0 OR COUNT(*) > 200;",
      "managerReview": "Economic nexus flagged in New York ($142K) and Texas (240 transactions). Merchant notified to enable automated Stripe Tax collection."
    }
  },
  {
    "day": 26,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 26: Connect Multi-Party Marketplace Split Payments & Application Fees",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P2 - Sprint",
    "department": "Stripe Connect & Platform Architectures",
    "slackMessage": "Stripe Connect powers platforms like Shopify and DoorDash. When a customer pays $100 for food, $80 transfers to the restaurant, $15 goes to the driver, and the platform takes a $5 application fee. Verify the multi-party split: calculate total volume, connected account payouts, and net application fee revenue.",
    "contextReport": {
      "businessWhy": "Multi-party split payments are the engine of the gig economy. Guaranteeing that application fees are deducted before settlement ensures platforms collect their software take-rate automatically.",
      "learningFocus": [
        "Multi-party revenue distribution",
        "Split payment reconciliation: `SUM(transfer_amount_usd) + SUM(application_fee_usd) = SUM(charge_amount_usd)`",
        "Platform fee accounting"
      ],
      "sampleSchema": "connect_split_charges (\n  charge_id VARCHAR(36) PRIMARY KEY,\n  platform_id VARCHAR(20),\n  charge_amount_usd DECIMAL(8,2),\n  destination_transfer_usd DECIMAL(8,2),\n  application_fee_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Don't allow transfer amounts to exceed charge amounts! If `destination_transfer + application_fee > charge_amount`, the platform is paying out more money than was collected.",
      "interviewRelevance": "Multi-party marketplace split payments and application fees are core to Stripe Connect architecture."
    },
    "schema": "connect_split_charges",
    "challenge": {
      "instruction": "Compute total_charge_volume, total_transfers_to_sellers, total_platform_fees, and verify balance_reconciled (volume - transfers - fees).",
      "template": "SELECT\n  ROUND(SUM(charge_amount_usd), 2) AS total_charge_volume,\n  ROUND(SUM(destination_transfer_usd), 2) AS total_transfers_to_sellers,\n  ROUND(SUM(application_fee_usd), 2) AS total_platform_fees,\n  ROUND(SUM(charge_amount_usd) - SUM(destination_transfer_usd) - SUM(application_fee_usd), 2) AS balance_reconciled\nFROM connect_split_charges;",
      "blanks": [
        {
          "id": 1,
          "label": "Fee Deductions",
          "answer": "SUM(application_fee_usd)",
          "options": [
            "SUM(application_fee_usd)",
            "SUM(charge_amount_usd)",
            "COUNT(*)",
            "0.0"
          ]
        }
      ],
      "expectedSql": "SELECT ROUND(SUM(charge_amount_usd), 2) AS total_charge_volume, ROUND(SUM(destination_transfer_usd), 2) AS total_transfers_to_sellers, ROUND(SUM(application_fee_usd), 2) AS total_platform_fees, ROUND(SUM(charge_amount_usd) - SUM(destination_transfer_usd) - SUM(application_fee_usd), 2) AS balance_reconciled FROM connect_split_charges;",
      "managerReview": "Reconciliation verified: Balance variance = $0.00 across $18M in Connect marketplace GMV."
    }
  },
  {
    "day": 27,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 27: Cross-Border Treasury Payouts (SEPA, ACH, Faster Payments)",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P2 - Sprint",
    "department": "Global Treasury & Foreign Exchange",
    "slackMessage": "Stripe Treasury disburses billions daily through regional clearinghouses (ACH in US, SEPA in Europe, BACS/Faster Payments in UK). Calculate average settlement speed in hours and failure rate percentage by banking payout method.",
    "contextReport": {
      "businessWhy": "Merchants rely on predictable payout schedules to meet payroll. Minimizing ACH bank returns and SEPA delays ensures merchants receive cash flow without costly liquidity buffers.",
      "learningFocus": [
        "Settlement duration arithmetic: `ROUND(AVG(settlement_hours), 1)`",
        "Payout failure rate: `ROUND(100.0 * COUNT(CASE WHEN status = 'FAILED' THEN 1 END) / COUNT(*), 2) AS failure_rate_pct`",
        "Clearinghouse performance comparison"
      ],
      "sampleSchema": "treasury_payout_logs (\n  payout_id VARCHAR(36) PRIMARY KEY,\n  payout_method VARCHAR(20), -- 'ACH', 'SEPA', 'FASTER_PAYMENTS'\n  settlement_hours INT,\n  status VARCHAR(20)\n)",
      "realWorldTrap": "Don't count weekends in settlement hours without banking calendar adjustments! Banks do not process ACH or SEPA on federal holidays or Sundays.",
      "interviewRelevance": "Treasury clearing networks, settlement windows, and bank payout rails are key fintech domain topics."
    },
    "schema": "treasury_payout_logs",
    "challenge": {
      "instruction": "Compute total_payouts, avg_settlement_hours, and failure_rate_pct for each payout_method.",
      "template": "SELECT payout_method,\n  COUNT(*) AS total_payouts,\n  ROUND(AVG(settlement_hours), 1) AS avg_settlement_hours,\n  ROUND(100.0 * COUNT(CASE WHEN status = 'FAILED' THEN 1 END) / COUNT(*), 2) AS failure_rate_pct\nFROM treasury_payout_logs\nGROUP BY ___1___;",
      "blanks": [
        {
          "id": 1,
          "label": "Method Dimension",
          "answer": "payout_method",
          "options": [
            "payout_method",
            "status",
            "settlement_hours",
            "payout_id"
          ]
        }
      ],
      "expectedSql": "SELECT payout_method, COUNT(*) AS total_payouts, ROUND(AVG(settlement_hours), 1) AS avg_settlement_hours, ROUND(100.0 * COUNT(CASE WHEN status = 'FAILED' THEN 1 END) / COUNT(*), 2) AS failure_rate_pct FROM treasury_payout_logs GROUP BY payout_method;",
      "managerReview": "UK Faster Payments achieved 0.4 hour settlement (real-time!) with a 0.05% failure rate, outperforming legacy ACH."
    }
  },
  {
    "day": 28,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 28: Instant Payouts Liquidity Balancing & Reserve Fund Risk",
    "sender": "Sophia Ramirez",
    "senderRole": "L7 VP of Global Banking & Treasury",
    "senderAvatar": "SR",
    "priority": "P1 - Liquidity & Capital",
    "department": "Global Treasury & Foreign Exchange",
    "slackMessage": "With Instant Payouts, merchants receive earnings on their debit card within 30 minutes for a 1.5% fee. Stripe pre-funds these payouts from our corporate credit facilities. Calculate total instant payout volume, fee revenue earned, and ensure pre-funding utilization does not exceed 80% of our $50M liquidity facility.",
    "contextReport": {
      "businessWhy": "Instant Payouts generate high fee margins (1.5% instant fee) but require tight treasury liquidity management: if daily payout volume exhausts pre-funded bank balances, instant transfers halt.",
      "learningFocus": [
        "Liquidity utilization metric: `ROUND(100.0 * SUM(amount_usd) / 50000000.0, 1) AS facility_utilization_pct`",
        "Instant fee revenue calculation: `ROUND(SUM(amount_usd * 0.015), 2) AS fee_revenue_usd`",
        "Capital adequacy monitoring"
      ],
      "sampleSchema": "instant_payout_events (\n  event_id VARCHAR(36) PRIMARY KEY,\n  amount_usd DECIMAL(9,2),\n  fee_usd DECIMAL(6,2)\n)",
      "realWorldTrap": "Ensure fees are deducted from the payout amount, not added on top! A merchant requesting $1,000 receives $985 on their card, while Stripe retains $15.",
      "interviewRelevance": "Treasury pre-funding, liquidity facility utilization, and working capital risk are favorite fintech quant questions."
    },
    "schema": "instant_payout_events",
    "challenge": {
      "instruction": "Compute total_payouts, total_volume_usd, total_fee_revenue, and facility_utilization_pct against our $50,000,000 facility.",
      "template": "SELECT\n  COUNT(*) AS total_payouts,\n  ROUND(SUM(amount_usd), 2) AS total_volume_usd,\n  ROUND(SUM(fee_usd), 2) AS total_fee_revenue,\n  ROUND(100.0 * SUM(amount_usd) / 50000000.0, 1) AS facility_utilization_pct\nFROM instant_payout_events;",
      "blanks": [
        {
          "id": 1,
          "label": "Facility Limit",
          "answer": "50000000.0",
          "options": [
            "50000000.0",
            "1000000.0",
            "100000000.0",
            "100.0"
          ]
        }
      ],
      "expectedSql": "SELECT COUNT(*) AS total_payouts, ROUND(SUM(amount_usd), 2) AS total_volume_usd, ROUND(SUM(fee_usd), 2) AS total_fee_revenue, ROUND(100.0 * SUM(amount_usd) / 50000000.0, 1) AS facility_utilization_pct FROM instant_payout_events;",
      "managerReview": "$32.4M disbursed with $486K in fee revenue (64.8% utilization). Treasury facility safely within risk boundaries."
    }
  },
  {
    "day": 29,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 29: Black Friday Global Processing Volume Peak War Room Incident",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P0 - GLOBAL WAR ROOM",
    "department": "Platform Reliability & Processing Scale",
    "slackMessage": "WAR ROOM ACTIVE! Black Friday peak load is here. Transaction velocity just spiked to 45,000 requests per second. Processor partner 'GlobalAcquire' is showing packet drops. Run a real-time 1-minute bucket query across all card networks: find networks experiencing authorization drop > 5% below historical baseline.",
    "contextReport": {
      "businessWhy": "Black Friday is the defining financial event of the year: Stripe processes over $3 billion in a single 24-hour period. Seconds of downtime cost merchants tens of millions in abandoned checkouts.",
      "learningFocus": [
        "P0 Incident triage under massive transactional throughput",
        "Comparative degradation metric: `baseline_auth_pct - current_auth_pct > 5.0`",
        "Dynamic routing failover triggers"
      ],
      "sampleSchema": "bfcm_realtime_metrics (\n  metric_id VARCHAR(36) PRIMARY KEY,\n  card_network VARCHAR(20),\n  current_auth_pct DECIMAL(5,2),\n  baseline_auth_pct DECIMAL(5,2)\n)",
      "realWorldTrap": "Never execute table scans on the main transaction ledger during Black Friday! Always query dedicated decoupled in-memory Redis or Kafka telemetry aggregates.",
      "interviewRelevance": "High-throughput peak event reliability and failover triggers in financial payment rails demonstrate Staff Engineer capabilities."
    },
    "schema": "bfcm_realtime_metrics",
    "challenge": {
      "instruction": "Identify card_network where (baseline_auth_pct - current_auth_pct) > 5.0. Return card_network, current_auth_pct, baseline_auth_pct, and drop_pct.",
      "template": "SELECT card_network, current_auth_pct, baseline_auth_pct,\n  ROUND(baseline_auth_pct - current_auth_pct, 2) AS drop_pct\nFROM bfcm_realtime_metrics\nWHERE (baseline_auth_pct - current_auth_pct) ___1___ ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Comparison Operator",
          "answer": ">",
          "options": [
            ">",
            "<",
            "=",
            ">="
          ]
        },
        {
          "id": 2,
          "label": "Degradation Threshold",
          "answer": "5.0",
          "options": [
            "5.0",
            "1.0",
            "10.0",
            "0.5"
          ]
        }
      ],
      "expectedSql": "SELECT card_network, current_auth_pct, baseline_auth_pct, ROUND(baseline_auth_pct - current_auth_pct, 2) AS drop_pct FROM bfcm_realtime_metrics WHERE (baseline_auth_pct - current_auth_pct) > 5.0;",
      "managerReview": "WAR ROOM SAVED! Isolated Mastercard Europe degradation (-6.4% drop). Traffic rerouted to secondary Barclays connection. Auth rate restored to 94.2%!"
    }
  },
  {
    "day": 30,
    "week": 4,
    "phase": "Week 4: Subscription Billing, Smart Retries & Global Scale",
    "title": "Day 30: Staff FinTech Infrastructure Engineer Promotion Defense",
    "sender": "Claire Vance",
    "senderRole": "L6 Staff Payments Infrastructure Engineer",
    "senderAvatar": "CV",
    "priority": "P1 - Career Milestone Defense",
    "department": "Core Payments & Quantitative Risk",
    "slackMessage": "Day 30! You've navigated card authorizations, soft declines, 3DS authentication friction, Radar ML fraud models, dispute monitoring, smart retries, and a global Black Friday war room. For your promotion defense before Patrick Collison and the Technical Review Board: write a comprehensive query aggregating 30-day Gross Processing Volume, platform take-rate, overall authorization rate, and dispute ratio across all global currency zones.",
    "contextReport": {
      "businessWhy": "Staff FinTech Engineers at Stripe architect the financial infrastructure of the internet: processing hundreds of billions in global GDP with five-nines uptime, microsecond latency, and mathematical precision.",
      "learningFocus": [
        "Global financial KPI consolidation",
        "Multi-variable metric synthesis (GPV, Take-Rate, Auth Rate, Dispute Ratio)",
        "Executive board reporting"
      ],
      "sampleSchema": "global_currency_zone_rollup (\n  zone_id VARCHAR(10) PRIMARY KEY, -- 'AMER', 'EMEA', 'APAC'\n  total_transactions BIGINT,\n  approved_transactions BIGINT,\n  dispute_count BIGINT,\n  total_gpv_usd BIGINT,\n  net_stripe_revenue_usd BIGINT\n)",
      "realWorldTrap": "Always maintain mathematical precision with 64-bit integer minor currency units or high-precision decimals. Rounding errors at Stripe scale result in multi-million dollar audit reconciliations.",
      "interviewRelevance": "Capstone queries that bridge infrastructure reliability, financial economics, and executive board reporting represent the pinnacle of data engineering mastery."
    },
    "schema": "global_currency_zone_rollup",
    "challenge": {
      "instruction": "For each zone_id, calculate total_transactions, auth_rate_pct (approved / total), dispute_ratio_pct (disputes / approved), total_gpv_usd, and net_take_rate_pct (revenue / gpv), ordered by total_gpv_usd DESC.",
      "template": "SELECT zone_id,\n  SUM(total_transactions) AS total_transactions,\n  ROUND(100.0 * SUM(approved_transactions) / SUM(total_transactions), 2) AS auth_rate_pct,\n  ROUND(100.0 * SUM(dispute_count) / SUM(approved_transactions), 3) AS dispute_ratio_pct,\n  SUM(total_gpv_usd) AS total_gpv_usd,\n  ROUND(100.0 * SUM(net_stripe_revenue_usd) / SUM(total_gpv_usd), 2) AS net_take_rate_pct\nFROM global_currency_zone_rollup\nGROUP BY ___1___\nORDER BY total_gpv_usd ___2___;",
      "blanks": [
        {
          "id": 1,
          "label": "Zone Dimension",
          "answer": "zone_id",
          "options": [
            "zone_id",
            "total_transactions",
            "total_gpv_usd",
            "auth_rate_pct"
          ]
        },
        {
          "id": 2,
          "label": "Sort Direction",
          "answer": "DESC",
          "options": [
            "DESC",
            "ASC",
            "LIMIT",
            "OVER"
          ]
        }
      ],
      "expectedSql": "SELECT zone_id, SUM(total_transactions) AS total_transactions, ROUND(100.0 * SUM(approved_transactions) / SUM(total_transactions), 2) AS auth_rate_pct, ROUND(100.0 * SUM(dispute_count) / SUM(approved_transactions), 3) AS dispute_ratio_pct, SUM(total_gpv_usd) AS total_gpv_usd, ROUND(100.0 * SUM(net_stripe_revenue_usd) / SUM(total_gpv_usd), 2) AS net_take_rate_pct FROM global_currency_zone_rollup GROUP BY zone_id ORDER BY total_gpv_usd DESC;",
      "managerReview": "PROMOTION UNANIMOUSLY APPROVED! The Technical Review Board and Patrick Collison officially confirm your promotion to L6 Staff FinTech Infrastructure Engineer. You have mastered internet payments and financial engineering at Stripe scale!"
    }
  }
];
