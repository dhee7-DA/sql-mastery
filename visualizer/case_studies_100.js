// =============================================================================
// THE 100 ENTERPRISE CASE STUDIES DATASET (PILLAR 1: FOUNDATIONS & CONTROL FLOW)
// =============================================================================

window.ALL_100_CASE_STUDIES = [
  // --- DOMAIN 01: FINTECH & PAYMENTS ---
  {
    id: 1,
    title: 'Stripe Transaction Fraud Velocity Tripwire',
    industry: 'Fintech',
    difficulty: 'Medium',
    scenario: 'Sub-100ms card fraud flagging for high-risk merchant categories and foreign transactions exceeding monetary thresholds.',
    schemaSnippet: 'Transactions (tx_id, merchant_category, amount_usd, is_foreign_card, risk_score)',
    businessObjective: 'Categorize transactions into CRITICAL_RISK, SUSPICIOUS, or STANDARD_REVIEW based on monetary amount, foreign origin, and risk score.',
    targetQuery: `SELECT tx_id, merchant_category, amount_usd, risk_score,\n       CASE\n           WHEN risk_score >= 90 OR (amount_usd >= 5000 AND is_foreign_card = TRUE) THEN 'CRITICAL_RISK'\n           WHEN risk_score >= 75 OR amount_usd >= 1000 THEN 'SUSPICIOUS'\n           ELSE 'STANDARD_REVIEW'\n       END AS fraud_decision\nFROM Transactions\nWHERE is_foreign_card = TRUE OR risk_score >= 75\nORDER BY amount_usd DESC, risk_score DESC\nLIMIT 50;`,
    table: 'Transactions'
  },
  {
    id: 2,
    title: 'Neobank Prime Credit Limit Allocation',
    industry: 'Fintech',
    difficulty: 'Easy',
    scenario: 'Invitation-only card underwriting with initial monthly credit limits ($15 per FICO point) for verified US accounts with 12+ months tenure.',
    schemaSnippet: 'Customers (customer_id, full_name, credit_score, country, tenure_months)',
    businessObjective: 'Extract unique US customers with credit_score >= 720, calculating initial limit, sorted by tenure descending, limited to 10 records.',
    targetQuery: `SELECT DISTINCT full_name, credit_score, (credit_score * 15) AS monthly_credit_limit, tenure_months\nFROM Customers\nWHERE country = 'USA' AND credit_score >= 720 AND tenure_months >= 12\nORDER BY tenure_months DESC, credit_score DESC\nLIMIT 10;`,
    table: 'Customers'
  },
  {
    id: 3,
    title: 'Anti-Money Laundering (AML) Structuring Tripwire',
    industry: 'Fintech',
    difficulty: 'Hard',
    scenario: 'Federal regulations require CTRs for cash deposits exceeding $10,000. Criminal actors attempt structuring deposits between $8,500 and $9,999.',
    schemaSnippet: 'DepositLedger (deposit_id, account_id, amount_usd, deposit_channel, customer_occupation)',
    businessObjective: 'Flag suspicious cash deposits sitting immediately under the federal $10,000 CTR reporting threshold.',
    targetQuery: `SELECT deposit_id, account_id, amount_usd, deposit_channel,\n       CASE\n           WHEN amount_usd BETWEEN 8500.00 AND 9999.99 THEN 'SUSPICIOUS_STRUCTURING_FLAG'\n           WHEN amount_usd >= 10000.00 THEN 'MANDATORY_CTR_FILING'\n           ELSE 'STANDARD_ACTIVITY'\n       END AS aml_compliance_tier\nFROM DepositLedger\nWHERE deposit_channel = 'CASH_TELLER' AND amount_usd >= 8500.00\nORDER BY amount_usd DESC;`,
    table: 'DepositLedger'
  },
  {
    id: 4,
    title: 'International SWIFT Wire Surcharge Calculation',
    industry: 'Fintech',
    difficulty: 'Medium',
    scenario: 'Tiered foreign exchange wire fees based on destination country and transfer volume, with sanctions blocking.',
    schemaSnippet: 'WireTransfers (wire_id, dest_country, amount_usd, is_sanctioned_region)',
    businessObjective: 'Assign wire fees based on sanctioned regions and transfer sizes.',
    targetQuery: `SELECT wire_id, dest_country, amount_usd,\n       CASE\n           WHEN is_sanctioned_region = TRUE THEN 'BLOCKED_SANCTION_REVIEW'\n           WHEN amount_usd > 50000 THEN 'PREMIUM_WIRE ($15 Flat)'\n           WHEN dest_country IN ('GBR', 'DEU', 'FRA', 'JPN') THEN 'STANDARD_WIRE ($25 Flat)'\n           ELSE 'HIGH_RISK_CORRIDOR ($45 + 0.5%)'\n       END AS wire_fee_tier\nFROM WireTransfers\nORDER BY amount_usd DESC;`,
    table: 'Transactions'
  },
  {
    id: 5,
    title: 'Overdraft Fee Waiver Eligibility & Grace Periods',
    industry: 'Fintech',
    difficulty: 'Easy',
    scenario: 'Retail banking grace periods for accounts dipping negative based on daily balances and customer tenure.',
    schemaSnippet: 'AccountBalances (account_id, current_balance, average_daily_balance, tenure_years)',
    businessObjective: 'Evaluate whether an overdraft fee should be waived or assessed.',
    targetQuery: `SELECT account_id, current_balance,\n       CASE\n           WHEN current_balance >= 0 THEN 'NO_OVERDRAFT'\n           WHEN current_balance >= -20.00 THEN 'COURTESY_BUFFER_WAIVED'\n           WHEN average_daily_balance >= 5000 AND tenure_years >= 3 THEN 'VIP_RELATIONSHIP_WAIVED'\n           ELSE 'ASSESS_FEE_$35'\n       END AS overdraft_disposition\nFROM AccountBalances\nWHERE current_balance < 0;`,
    table: 'Customers'
  },
  {
    id: 6,
    title: 'High-Frequency Trading (HFT) Slippage Penalty Flags',
    industry: 'Fintech',
    difficulty: 'Medium',
    scenario: 'Broker execution quality audits comparing intended limit price against actual fill price.',
    schemaSnippet: 'TradeExecutions (trade_id, ticker, limit_price, fill_price, volume)',
    businessObjective: 'Flag excessive execution slippage on large institutional trades.',
    targetQuery: `SELECT trade_id, ticker, volume, (fill_price - limit_price) AS slippage_per_share,\n       CASE\n           WHEN (fill_price - limit_price) > 0.05 THEN 'EXCESSIVE_SLIPPAGE_PENALTY'\n           WHEN (fill_price - limit_price) > 0.01 THEN 'ACCEPTABLE_VARIANCE'\n           ELSE 'OPTIMAL_FILL'\n       END AS execution_quality\nFROM TradeExecutions\nWHERE volume >= 1000\nORDER BY slippage_per_share DESC;`,
    table: 'Transactions'
  },
  {
    id: 7,
    title: 'Merchant Chargeback Ratio Regulatory Warning Tiers',
    industry: 'Fintech',
    difficulty: 'Medium',
    scenario: 'Payment network rules (Visa/Mastercard) monitoring merchant dispute ratios against transaction volume.',
    schemaSnippet: 'Merchants (merchant_id, monthly_volume, dispute_count, dispute_rate_pct)',
    businessObjective: 'Categorize merchants into compliance warning tiers based on dispute rates.',
    targetQuery: `SELECT merchant_id, dispute_rate_pct,\n       CASE\n           WHEN dispute_rate_pct >= 1.5 THEN 'TERMINATION_WARNING'\n           WHEN dispute_rate_pct >= 0.9 THEN 'HIGH_RISK_MONITORING'\n           WHEN dispute_rate_pct >= 0.5 THEN 'ELEVATED_WATCH'\n           ELSE 'COMPLIANT'\n       END AS card_network_status\nFROM Merchants\nWHERE dispute_count >= 10\nORDER BY dispute_rate_pct DESC;`,
    table: 'Transactions'
  },
  {
    id: 8,
    title: 'Consumer Loan Default Risk Grading (Grades A to D)',
    industry: 'Fintech',
    difficulty: 'Medium',
    scenario: 'Peer-to-peer lending risk classification combining FICO score with Debt-to-Income (DTI) ratios.',
    schemaSnippet: 'LoanApplicants (applicant_id, fico_score, dti_ratio, annual_income)',
    businessObjective: 'Grade loan applicants from Prime Grade A down to Grade D rejection.',
    targetQuery: `SELECT applicant_id, fico_score, dti_ratio,\n       CASE\n           WHEN fico_score >= 760 AND dti_ratio < 0.20 THEN 'GRADE_A (Prime Low)'\n           WHEN fico_score >= 700 AND dti_ratio < 0.35 THEN 'GRADE_B (Prime)'\n           WHEN fico_score >= 640 AND dti_ratio < 0.45 THEN 'GRADE_C (Near Prime)'\n           ELSE 'GRADE_D_REJECT'\n       END AS loan_risk_grade\nFROM LoanApplicants\nORDER BY fico_score DESC, dti_ratio ASC;`,
    table: 'Customers'
  },
  {
    id: 9,
    title: 'ATM Cash Refill Depletion Urgency Classifier',
    industry: 'Fintech',
    difficulty: 'Easy',
    scenario: 'Cash logistics armored car dispatch scheduling based on remaining cassette percentage capacity.',
    schemaSnippet: 'AtmTerminals (terminal_id, location_type, cash_remaining_usd, max_capacity_usd)',
    businessObjective: 'Calculate remaining fill percentage and assign dispatch priority.',
    targetQuery: `SELECT terminal_id, location_type, (cash_remaining_usd * 100.0 / max_capacity_usd) AS fill_pct,\n       CASE\n           WHEN (cash_remaining_usd * 1.0 / max_capacity_usd) < 0.15 THEN 'CRITICAL_DISPATCH_NOW'\n           WHEN (cash_remaining_usd * 1.0 / max_capacity_usd) < 0.30 THEN 'SCHEDULE_NEXT_DAY'\n           ELSE 'OPTIMAL_LEVEL'\n       END AS armored_car_priority\nFROM AtmTerminals\nORDER BY fill_pct ASC;`,
    table: 'Transactions'
  },
  {
    id: 10,
    title: 'Crypto Wallet Sanctions & Mixer Screening',
    industry: 'Fintech',
    difficulty: 'Hard',
    scenario: 'OFAC sanctions list screening for incoming blockchain wallet deposits and mixer provenance.',
    schemaSnippet: 'CryptoDeposits (tx_hash, wallet_address, token_symbol, usd_value, is_mixer_associated)',
    businessObjective: 'Freeze sanctioned wallet deposits and mandate KYC on large transfers.',
    targetQuery: `SELECT tx_hash, wallet_address, token_symbol, usd_value,\n       CASE\n           WHEN is_mixer_associated = TRUE THEN 'FREEZE_SANCTION_VIOLATION'\n           WHEN usd_value >= 100000 THEN 'KYC_SOURCE_OF_FUNDS_REQUIRED'\n           ELSE 'AUTO_CREDIT'\n       END AS compliance_action\nFROM CryptoDeposits\nORDER BY usd_value DESC;`,
    table: 'Transactions'
  },

  // --- DOMAIN 02: SAAS & CLOUD SUBSCRIPTIONS ---
  {
    id: 11,
    title: 'B2B Account Churn Risk & Contraction Classifier',
    industry: 'SaaS',
    difficulty: 'Medium',
    scenario: 'Customer Success monitoring subscription health ahead of annual renewals based on seat utilization and login latency.',
    schemaSnippet: 'SubscriptionAccounts (account_id, company_name, plan_tier, licensed_seats, active_seats, days_since_last_login)',
    businessObjective: 'Calculate seat utilization percentage and categorize accounts into IMMINENT_CHURN, NEEDS_OUTREACH, or HEALTHY.',
    targetQuery: `SELECT company_name, plan_tier, licensed_seats, active_seats,\n       ROUND((active_seats * 100.0 / licensed_seats), 1) AS seat_utilization_pct,\n       CASE\n           WHEN days_since_last_login > 30 OR (active_seats * 1.0 / licensed_seats) < 0.25 THEN 'IMMINENT_CHURN'\n           WHEN days_since_last_login > 14 OR (active_seats * 1.0 / licensed_seats) < 0.50 THEN 'NEEDS_OUTREACH'\n           ELSE 'HEALTHY'\n       END AS account_health_status\nFROM SubscriptionAccounts\nWHERE plan_tier IN ('Enterprise', 'Growth')\nORDER BY seat_utilization_pct ASC, days_since_last_login DESC;`,
    table: 'SubscriptionAccounts'
  },
  {
    id: 12,
    title: 'Freemium Cloud Compute Gatekeeper & Upgrade Tiers',
    industry: 'SaaS',
    difficulty: 'Easy',
    scenario: 'Serverless database provider offers free-tier compute. When users exceed monthly execution limits, sales lead flags are assigned.',
    schemaSnippet: 'DeveloperTenants (tenant_id, org_name, monthly_vcpuhours, storage_gb, is_billing_verified)',
    businessObjective: 'Flag all unverified free tenants that exceed 100 vCPU-hours or 50GB storage into sales tiers.',
    targetQuery: `SELECT org_name, monthly_vcpuhours, storage_gb,\n       CASE\n           WHEN monthly_vcpuhours >= 250 OR storage_gb >= 100 THEN 'HOT_SALES_LEAD'\n           WHEN monthly_vcpuhours >= 100 OR storage_gb >= 50 THEN 'WARM_UPGRADE_CANDIDATE'\n           ELSE 'STANDARD_FREE'\n       END AS sales_motion_tier\nFROM DeveloperTenants\nWHERE is_billing_verified = FALSE AND (monthly_vcpuhours >= 100 OR storage_gb >= 50)\nORDER BY monthly_vcpuhours DESC;`,
    table: 'DeveloperTenants'
  },
  {
    id: 13,
    title: 'Annual Enterprise Contract Renewal Discount Matrix',
    industry: 'SaaS',
    difficulty: 'Easy',
    scenario: 'Multi-year renewal incentive calculations based on commitment length and annual contract value.',
    schemaSnippet: 'Contracts (contract_id, client_name, annual_revenue, contract_years)',
    businessObjective: 'Assign discount tiers based on contract years and revenue thresholds.',
    targetQuery: `SELECT client_name, annual_revenue, contract_years,\n       CASE\n           WHEN contract_years >= 3 AND annual_revenue >= 100000 THEN 'DISCOUNT_25_PCT'\n           WHEN contract_years >= 2 AND annual_revenue >= 50000 THEN 'DISCOUNT_15_PCT'\n           WHEN contract_years >= 2 THEN 'DISCOUNT_10_PCT'\n           ELSE 'STANDARD_LIST_PRICE'\n       END AS eligible_discount\nFROM Contracts\nORDER BY annual_revenue DESC;`,
    table: 'SubscriptionAccounts'
  },
  {
    id: 14,
    title: 'Support Ticket SLA Breach Escalation Priority',
    industry: 'SaaS',
    difficulty: 'Medium',
    scenario: 'Ticket routing to Tier 3 on-call engineering based on severity and elapsed wait time.',
    schemaSnippet: 'SupportTickets (ticket_id, priority, wait_time_minutes, is_enterprise)',
    businessObjective: 'Identify urgent enterprise tickets breaching wait thresholds.',
    targetQuery: `SELECT ticket_id, priority, wait_time_minutes,\n       CASE\n           WHEN is_enterprise = TRUE AND wait_time_minutes > 15 THEN 'PAGE_ONCALL_ENG'\n           WHEN priority = 'P1' AND wait_time_minutes > 30 THEN 'PAGE_ONCALL_ENG'\n           WHEN priority = 'P2' AND wait_time_minutes > 60 THEN 'ESCALATE_SUPERVISOR'\n           ELSE 'NORMAL_QUEUE'\n       END AS dispatch_status\nFROM SupportTickets\nWHERE wait_time_minutes > 15\nORDER BY wait_time_minutes DESC;`,
    table: 'SubscriptionAccounts'
  },
  {
    id: 15,
    title: 'API Token Rate Limit Throttling & Overage Billing',
    industry: 'SaaS',
    difficulty: 'Easy',
    scenario: 'Throttling developer API requests when consumption exceeds monthly provisioned calls.',
    schemaSnippet: 'ApiUsage (token_id, monthly_quota, consumed_calls)',
    businessObjective: 'Categorize tokens into throttled, overage billed, or warning tiers.',
    targetQuery: `SELECT token_id, monthly_quota, consumed_calls,\n       CASE\n           WHEN consumed_calls > (monthly_quota * 1.5) THEN 'THROTTLED_BLOCKED'\n           WHEN consumed_calls > monthly_quota THEN 'OVERAGE_BILLED ($0.002/call)'\n           WHEN consumed_calls > (monthly_quota * 0.8) THEN 'WARN_80_PCT_REACHED'\n           ELSE 'NORMAL'\n       END AS api_status\nFROM ApiUsage\nORDER BY consumed_calls DESC;`,
    table: 'SubscriptionAccounts'
  },
  {
    id: 16,
    title: 'SSO Directory Security Audit & Inactive Admin Purge',
    industry: 'SaaS',
    difficulty: 'Medium',
    scenario: 'Security compliance requiring revocation of inactive administrative accounts.',
    schemaSnippet: 'UserDirectory (user_id, email, role, days_inactive)',
    businessObjective: 'Flag privileged administrators who have not logged in for 60+ days.',
    targetQuery: `SELECT email, role, days_inactive,\n       CASE\n           WHEN role = 'SuperAdmin' AND days_inactive > 60 THEN 'REVOKE_IMMEDIATELY'\n           WHEN role = 'Admin' AND days_inactive > 90 THEN 'REVOKE_IMMEDIATELY'\n           WHEN days_inactive > 180 THEN 'ARCHIVE_USER'\n           ELSE 'ACTIVE'\n       END AS access_disposition\nFROM UserDirectory\nWHERE days_inactive > 30\nORDER BY days_inactive DESC;`,
    table: 'Employees'
  },
  {
    id: 17,
    title: 'Feature Flag Entitlement & Plan Access Check',
    industry: 'SaaS',
    difficulty: 'Easy',
    scenario: 'Verifying whether a tenant plan tier allows advanced audit logs or SAML SSO.',
    schemaSnippet: 'TenantPlans (tenant_id, plan_name, feature_requested)',
    businessObjective: 'Grant or block feature access based on subscription plan tier.',
    targetQuery: `SELECT tenant_id, plan_name, feature_requested,\n       CASE\n           WHEN feature_requested = 'SAML_SSO' AND plan_name = 'Enterprise' THEN 'GRANTED'\n           WHEN feature_requested = 'AUDIT_LOGS' AND plan_name IN ('Enterprise', 'Business') THEN 'GRANTED'\n           WHEN feature_requested = 'CORE_ANALYTICS' THEN 'GRANTED'\n           ELSE 'UPGRADE_REQUIRED'\n       END AS access_permission\nFROM TenantPlans;`,
    table: 'SubscriptionAccounts'
  },
  {
    id: 18,
    title: 'Customer Health Score (NPS Feedback Sentiment)',
    industry: 'SaaS',
    difficulty: 'Easy',
    scenario: 'Classifying customer survey numerical responses into standard Promoter, Passive, and Detractor buckets.',
    schemaSnippet: 'NpsResponses (response_id, score, comment)',
    businessObjective: 'Segment customer feedback into standard NPS categories.',
    targetQuery: `SELECT response_id, score,\n       CASE\n           WHEN score BETWEEN 9 AND 10 THEN 'PROMOTER'\n           WHEN score BETWEEN 7 AND 8 THEN 'PASSIVE'\n           WHEN score BETWEEN 0 AND 6 THEN 'DETRACTOR'\n           ELSE 'INVALID_SCORE'\n       END AS nps_category\nFROM NpsResponses\nORDER BY score ASC;`,
    table: 'Customers'
  },
  {
    id: 19,
    title: 'Multi-Tenant Database Storage Capacity Overage',
    industry: 'SaaS',
    difficulty: 'Easy',
    scenario: 'Identifying customer databases consuming more than their provisioned disk gigabytes.',
    schemaSnippet: 'DatabaseTenants (tenant_id, tier, storage_used_gb, storage_limit_gb)',
    businessObjective: 'Flag databases exceeding provisioned disk limits for overage fees.',
    targetQuery: `SELECT tenant_id, tier, storage_used_gb, storage_limit_gb,\n       CASE\n           WHEN storage_used_gb > storage_limit_gb THEN 'OVER_CAPACITY_BILL_OVERAGE'\n           WHEN (storage_used_gb * 1.0 / storage_limit_gb) > 0.9 THEN 'CAPACITY_WARNING_90_PCT'\n           ELSE 'HEALTHY'\n       END AS storage_health\nFROM DatabaseTenants\nORDER BY (storage_used_gb - storage_limit_gb) DESC;`,
    table: 'SubscriptionAccounts'
  },
  {
    id: 20,
    title: 'Free Trial Expiration & Credit Card Grace Period',
    industry: 'SaaS',
    difficulty: 'Easy',
    scenario: 'Automating trial-to-paid conversion countdown and grace periods for self-serve users.',
    schemaSnippet: 'TrialUsers (user_id, days_since_signup, has_payment_method)',
    businessObjective: 'Determine lifecycle state for users approaching or exceeding 14 days of trial.',
    targetQuery: `SELECT user_id, days_since_signup, has_payment_method,\n       CASE\n           WHEN days_since_signup > 14 AND has_payment_method = TRUE THEN 'CONVERT_TO_PAID'\n           WHEN days_since_signup > 14 AND has_payment_method = FALSE THEN 'EXPIRED_LOCKED'\n           WHEN days_since_signup BETWEEN 12 AND 14 THEN 'SEND_EXPIRY_WARNING'\n           ELSE 'TRIAL_ACTIVE'\n       END AS lifecycle_state\nFROM TrialUsers\nORDER BY days_since_signup DESC;`,
    table: 'Customers'
  },

  // --- DOMAIN 03: E-COMMERCE & RETAIL ---
  {
    id: 21,
    title: 'VIP Customer Loyalty Tiering & Point Multipliers',
    industry: 'Retail',
    difficulty: 'Medium',
    scenario: 'Calculating annual loyalty tiers based on trailing spend and low return rates.',
    schemaSnippet: 'LoyaltyMembers (member_id, full_name, annual_spend, return_rate_pct, preferred_category)',
    businessObjective: 'Assign loyalty tiers and reward multipliers to members with return rate < 20%.',
    targetQuery: `SELECT full_name, annual_spend, return_rate_pct,\n       CASE\n           WHEN annual_spend >= 10000 THEN 'PLATINUM (3x Points)'\n           WHEN annual_spend >= 5000 THEN 'GOLD (2x Points)'\n           WHEN annual_spend >= 1500 THEN 'SILVER (1.5x Points)'\n           ELSE 'BRONZE (1x Points)'\n       END AS loyalty_tier\nFROM LoyaltyMembers\nWHERE return_rate_pct < 20.0\nORDER BY annual_spend DESC\nLIMIT 25;`,
    table: 'Customers'
  },
  {
    id: 22,
    title: 'Express vs Standard Fulfillment SLA Routing',
    industry: 'Retail',
    difficulty: 'Easy',
    scenario: 'Warehouse hub batching orders into Air vs Ground delivery lanes based on Prime status and cart size.',
    schemaSnippet: 'Orders (order_id, order_total, is_prime_member, destination_zip, order_status)',
    businessObjective: 'Route pending packages to AIR_DISPATCH or GROUND_CARRIER.',
    targetQuery: `SELECT order_id, order_total, is_prime_member, destination_zip,\n       CASE\n           WHEN is_prime_member = TRUE OR order_total >= 150.00 THEN 'AIR_DISPATCH_NEXT_DAY'\n           ELSE 'GROUND_CARRIER_STANDARD'\n       END AS fulfillment_routing\nFROM Orders\nWHERE order_status = 'PENDING_FULFILLMENT'\nORDER BY order_total DESC;`,
    table: 'Orders'
  },
  {
    id: 23,
    title: 'Abandoned Cart Recovery Incentive Tiers',
    industry: 'Retail',
    difficulty: 'Easy',
    scenario: 'Sending targeted discount coupons based on cart value and hours abandoned.',
    schemaSnippet: 'AbandonedCarts (cart_id, user_email, cart_value, hours_abandoned)',
    businessObjective: 'Determine automated coupon strategy for carts abandoned between 1 and 48 hours.',
    targetQuery: `SELECT user_email, cart_value, hours_abandoned,\n       CASE\n           WHEN hours_abandoned > 48 THEN 'SUPPRESS_EXPIRED'\n           WHEN cart_value >= 250 THEN 'OFFER_15_PCT_COUPON'\n           WHEN cart_value >= 100 THEN 'OFFER_FREE_SHIPPING'\n           ELSE 'STANDARD_REMINDER_EMAIL'\n       END AS email_strategy\nFROM AbandonedCarts\nWHERE hours_abandoned BETWEEN 1 AND 48\nORDER BY cart_value DESC;`,
    table: 'Orders'
  },
  {
    id: 24,
    title: 'Return Abuse & Wardrobing Customer Detector',
    industry: 'Retail',
    difficulty: 'Medium',
    scenario: 'Identifying serial returners who purchase luxury apparel, wear once, and initiate returns.',
    schemaSnippet: 'CustomerReturns (customer_id, return_frequency_pct, total_refund_usd)',
    businessObjective: 'Flag high-frequency returners for manager inspection or account suspension.',
    targetQuery: `SELECT customer_id, return_frequency_pct, total_refund_usd,\n       CASE\n           WHEN return_frequency_pct > 75.0 AND total_refund_usd > 2000 THEN 'FLAG_WARDROBING_SUSPEND'\n           WHEN return_frequency_pct > 50.0 THEN 'REQUIRE_MANAGER_INSPECTION'\n           ELSE 'STANDARD_RETURN_POLICY'\n       END AS fraud_risk_policy\nFROM CustomerReturns\nORDER BY return_frequency_pct DESC;`,
    table: 'Customers'
  },
  {
    id: 25,
    title: 'Flash Sale Inventory Safety Buffer & Urgency Badge',
    industry: 'Retail',
    difficulty: 'Easy',
    scenario: 'Withholding warehouse safety buffer and calculating low stock urgency badges.',
    schemaSnippet: 'Inventory (sku, available_units, reserved_units)',
    businessObjective: 'Display real-time inventory badges based on net sellable units.',
    targetQuery: `SELECT sku, (available_units - reserved_units) AS net_sellable,\n       CASE\n           WHEN (available_units - reserved_units) <= 0 THEN 'OUT_OF_STOCK'\n           WHEN (available_units - reserved_units) <= 10 THEN 'LOW_STOCK_URGENCY_BANNER'\n           ELSE 'IN_STOCK'\n       END AS inventory_display_badge\nFROM Inventory;`,
    table: 'Orders'
  },
  {
    id: 26,
    title: 'Dynamic Price Gouging Regulatory Compliance Check',
    industry: 'Retail',
    difficulty: 'Medium',
    scenario: 'Ensuring dynamic pricing algorithms do not exceed legal markups on essential consumer goods.',
    schemaSnippet: 'ProductPrices (sku, category, base_price, dynamic_price, is_essential_good)',
    businessObjective: 'Flag markups exceeding 20% on essential goods during emergencies.',
    targetQuery: `SELECT sku, base_price, dynamic_price,\n       ROUND(((dynamic_price - base_price) * 100.0 / base_price), 1) AS surge_markup_pct,\n       CASE\n           WHEN is_essential_good = TRUE AND (dynamic_price * 1.0 / base_price) > 1.20 THEN 'PRICE_GOUGING_VIOLATION'\n           WHEN (dynamic_price * 1.0 / base_price) > 1.50 THEN 'FLAG_PRICING_ANOMALY'\n           ELSE 'APPROVED_PRICE'\n       END AS compliance_check\nFROM ProductPrices\nORDER BY surge_markup_pct DESC;`,
    table: 'Orders'
  },
  {
    id: 27,
    title: 'Marketplace Third-Party Seller Health Scorecard',
    industry: 'Retail',
    difficulty: 'Medium',
    scenario: 'Enforcing fulfillment defect rate thresholds on marketplace merchants.',
    schemaSnippet: 'Sellers (seller_id, late_shipment_rate_pct, order_defect_rate_pct)',
    businessObjective: 'Suspend sellers with defect rates exceeding 2.0%.',
    targetQuery: `SELECT seller_id, late_shipment_rate_pct, order_defect_rate_pct,\n       CASE\n           WHEN order_defect_rate_pct > 2.0 THEN 'IMMEDIATE_STORE_SUSPENSION'\n           WHEN late_shipment_rate_pct > 4.0 THEN 'PROBATION_WARNING'\n           ELSE 'GOOD_STANDING'\n       END AS marketplace_status\nFROM Sellers\nORDER BY order_defect_rate_pct DESC;`,
    table: 'Customers'
  },
  {
    id: 28,
    title: 'Cross-Border Customs Duty De Minimis Exemption',
    industry: 'Retail',
    difficulty: 'Easy',
    scenario: 'Applying customs duty exemptions for incoming international parcels under the $800 threshold.',
    schemaSnippet: 'CustomsManifest (package_id, declared_value_usd, origin_country)',
    businessObjective: 'Classify packages into duty-free de minimis vs formal entry tariffs.',
    targetQuery: `SELECT package_id, declared_value_usd, origin_country,\n       CASE\n           WHEN declared_value_usd <= 800.00 THEN 'DUTY_FREE_DE_MINIMIS'\n           WHEN origin_country = 'CHN' THEN 'FORMAL_ENTRY_TARIFF_25_PCT'\n           ELSE 'STANDARD_CUSTOMS_DUTY'\n       END AS customs_clearance_type\nFROM CustomsManifest\nORDER BY declared_value_usd DESC;`,
    table: 'Orders'
  },
  {
    id: 29,
    title: 'Buy-One-Get-One (BOGO) Bundle Discount Eligibility',
    industry: 'Retail',
    difficulty: 'Easy',
    scenario: 'Checking promotional rules for qualifying multi-item footwear and apparel purchases.',
    schemaSnippet: 'CartItems (cart_id, item_count, category_code, total_price)',
    businessObjective: 'Apply BOGO 50% discount to eligible multi-item carts.',
    targetQuery: `SELECT cart_id, category_code, item_count,\n       CASE\n           WHEN category_code IN ('FOOTWEAR', 'APPAREL') AND item_count >= 2 THEN 'BOGO_50_PCT_APPLIED'\n           WHEN category_code = 'ACCESSORIES' AND total_price >= 50 THEN 'FREE_GIFT_QUALIFIED'\n           ELSE 'STANDARD_PRICE'\n       END AS promotional_discount\nFROM CartItems;`,
    table: 'Orders'
  },
  {
    id: 30,
    title: 'Out-of-Stock Pre-Order Lead Time Estimator',
    industry: 'Retail',
    difficulty: 'Easy',
    scenario: 'Calculating estimated customer delivery windows for backordered factory shipments.',
    schemaSnippet: 'Backorders (order_id, sku, supplier_days_lead_time)',
    businessObjective: 'Map supplier lead time days to human-readable customer expectations.',
    targetQuery: `SELECT order_id, sku, supplier_days_lead_time,\n       CASE\n           WHEN supplier_days_lead_time <= 7 THEN 'SHIPS_NEXT_WEEK'\n           WHEN supplier_days_lead_time <= 21 THEN 'SHIPS_IN_2_3_WEEKS'\n           ELSE 'EXTENDED_BACKORDER_MONTH+'\n       END AS estimated_delivery_window\nFROM Backorders\nORDER BY supplier_days_lead_time ASC;`,
    table: 'Orders'
  },

  // --- DOMAIN 04: HEALTHCARE & CLINICAL ---
  {
    id: 31,
    title: 'Emergency Room Triage Acuity Matrix (ESI Tiers)',
    industry: 'Healthcare',
    difficulty: 'Hard',
    scenario: 'Assigning Emergency Severity Index levels (ESI 1-4) based on patient check-in vital signs.',
    schemaSnippet: 'PatientIntake (intake_id, patient_name, pulse_bpm, o2_saturation, is_unresponsive)',
    businessObjective: 'Assign ESI triage priority levels using strict medical safety waterfall ordering.',
    targetQuery: `SELECT patient_name, pulse_bpm, o2_saturation,\n       CASE\n           WHEN is_unresponsive = TRUE OR o2_saturation < 85 THEN 'ESI-1: RESUSCITATION (IMMEDIATE)'\n           WHEN o2_saturation < 92 OR pulse_bpm > 130 OR pulse_bpm < 45 THEN 'ESI-2: EMERGENT (10 MIN MAX)'\n           WHEN pulse_bpm BETWEEN 100 AND 130 THEN 'ESI-3: URGENT'\n           ELSE 'ESI-4: NON-URGENT'\n       END AS triage_level\nFROM PatientIntake\nORDER BY o2_saturation ASC, pulse_bpm DESC;`,
    table: 'PatientIntake'
  },
  {
    id: 32,
    title: 'Pediatric Dosage Safety Boundary Validator',
    industry: 'Healthcare',
    difficulty: 'Easy',
    scenario: 'Verifying that liquid amoxicillin doses fall strictly within safe weight-adjusted boundaries (40-90 mg/kg/day).',
    schemaSnippet: 'Prescriptions (rx_id, patient_weight_kg, prescribed_mg_day, drug_name)',
    businessObjective: 'Verify pediatric antibiotic dosages and flag safe vs out-of-boundary prescriptions.',
    targetQuery: `SELECT rx_id, drug_name, patient_weight_kg, prescribed_mg_day,\n       CASE\n           WHEN prescribed_mg_day BETWEEN (patient_weight_kg * 40) AND (patient_weight_kg * 90) THEN 'DOSAGE_SAFE'\n           WHEN prescribed_mg_day > (patient_weight_kg * 90) THEN 'OVERDOSE_WARNING'\n           ELSE 'UNDERDOSE_INEFFECTIVE'\n       END AS clinical_safety_status\nFROM Prescriptions\nWHERE drug_name = 'Amoxicillin';`,
    table: 'PatientIntake'
  },
  {
    id: 33,
    title: 'ICU Bed Occupancy & Step-Down Transfer Readiness',
    industry: 'Healthcare',
    difficulty: 'Medium',
    scenario: 'Evaluating intensive care patients ready to transfer to general step-down floors.',
    schemaSnippet: 'IcuPatients (patient_id, hours_stable, requires_ventilator, vasopressor_support)',
    businessObjective: 'Identify patients stable for 48+ hours with no ventilator support.',
    targetQuery: `SELECT patient_id, hours_stable,\n       CASE\n           WHEN requires_ventilator = TRUE OR vasopressor_support = TRUE THEN 'CRITICAL_ICU_LOCKED'\n           WHEN hours_stable >= 48 THEN 'READY_FOR_STEP_DOWN'\n           WHEN hours_stable >= 24 THEN 'OBSERVATION_PREPARE_TRANSFER'\n           ELSE 'CONTINUE_ICU_MONITORING'\n       END AS bed_assignment_recommendation\nFROM IcuPatients\nORDER BY hours_stable DESC;`,
    table: 'PatientIntake'
  },
  {
    id: 34,
    title: 'Controlled Substance Prescription Refill Frequency Monitor',
    industry: 'Healthcare',
    difficulty: 'Medium',
    scenario: 'Flagging premature refill attempts for Schedule II controlled substances.',
    schemaSnippet: 'OpioidRefillLog (rx_id, patient_id, days_since_prior_dispense, days_supply)',
    businessObjective: 'Deny refills attempted more than 5 days before previous supply exhaustion.',
    targetQuery: `SELECT rx_id, patient_id, (days_supply - days_since_prior_dispense) AS days_early,\n       CASE\n           WHEN (days_supply - days_since_prior_dispense) > 5 THEN 'REFILL_DENIED_TOO_EARLY'\n           WHEN (days_supply - days_since_prior_dispense) BETWEEN 1 AND 5 THEN 'PHARMACIST_OVERRIDE_REQUIRED'\n           ELSE 'AUTHORIZED_REFILL'\n       END AS dispense_decision\nFROM OpioidRefillLog\nORDER BY days_early DESC;`,
    table: 'PatientIntake'
  },
  {
    id: 35,
    title: 'Health Insurance Pre-Authorization Auto-Approval',
    industry: 'Healthcare',
    difficulty: 'Easy',
    scenario: 'Auto-clearing routine diagnostic claims vs routing expensive procedures to clinical review.',
    schemaSnippet: 'InsuranceClaims (claim_id, cpt_code, estimated_cost, prior_authorization_on_file)',
    businessObjective: 'Auto-approve low-cost claims or claims with pre-authorization on file.',
    targetQuery: `SELECT claim_id, cpt_code, estimated_cost,\n       CASE\n           WHEN prior_authorization_on_file = TRUE THEN 'AUTO_APPROVED'\n           WHEN estimated_cost <= 250.00 THEN 'LOW_COST_AUTO_CLEAR'\n           ELSE 'MANUAL_PHYSICIAN_REVIEW_REQUIRED'\n       END AS claim_status\nFROM InsuranceClaims\nORDER BY estimated_cost DESC;`,
    table: 'PatientIntake'
  },
  {
    id: 36,
    title: 'Sepsis Quick SOFA Clinical Warning Alert',
    industry: 'Healthcare',
    difficulty: 'Hard',
    scenario: 'Scoring clinical vitals to page rapid response teams for early septic shock.',
    schemaSnippet: 'VitalsMonitoring (patient_id, resp_rate, gcs_score, systolic_bp)',
    businessObjective: 'Trigger high sepsis alerts when respiratory rate >= 22 and systolic BP <= 100.',
    targetQuery: `SELECT patient_id, resp_rate, systolic_bp,\n       CASE\n           WHEN (resp_rate >= 22 AND systolic_bp <= 100) OR gcs_score < 15 THEN 'HIGH_SEPSIS_RISK_PAGE_RAPID_RESPONSE'\n           ELSE 'LOW_RISK_MONITOR'\n       END AS clinical_alert\nFROM VitalsMonitoring;`,
    table: 'PatientIntake'
  },
  {
    id: 37,
    title: 'Organ Transplant ABO Blood Compatibility Crossmatch',
    industry: 'Healthcare',
    difficulty: 'Medium',
    scenario: 'Screening prospective donor and recipient ABO blood groups before surgery.',
    schemaSnippet: 'TransplantWaitlist (recipient_id, recipient_blood_type, donor_blood_type)',
    businessObjective: 'Match compatible donor/recipient pairs according to universal rules.',
    targetQuery: `SELECT recipient_id, recipient_blood_type, donor_blood_type,\n       CASE\n           WHEN donor_blood_type = 'O' THEN 'UNIVERSAL_DONOR_COMPATIBLE'\n           WHEN recipient_blood_type = donor_blood_type THEN 'EXACT_MATCH_COMPATIBLE'\n           WHEN recipient_blood_type = 'AB' THEN 'UNIVERSAL_RECIPIENT_COMPATIBLE'\n           ELSE 'INCOMPATIBLE_REJECT'\n       END AS crossmatch_result\nFROM TransplantWaitlist;`,
    table: 'PatientIntake'
  },
  {
    id: 38,
    title: 'Clinical Trial Oncology Inclusion/Exclusion Filter',
    industry: 'Healthcare',
    difficulty: 'Medium',
    scenario: 'Screening patient cohorts for experimental EGFR-positive immunotherapy trials.',
    schemaSnippet: 'ClinicalTrialScreening (subject_id, age, egfr_mutation, prior_chemo_months)',
    businessObjective: 'Identify adult subjects with EGFR mutations and prior chemotherapy.',
    targetQuery: `SELECT subject_id, age,\n       CASE\n           WHEN age BETWEEN 18 AND 75 AND egfr_mutation = TRUE AND prior_chemo_months >= 6 THEN 'TRIAL_ELIGIBLE'\n           WHEN age < 18 THEN 'EXCLUDED_PEDIATRIC'\n           ELSE 'EXCLUDED_CRITERIA_MISMATCH'\n       END AS screening_verdict\nFROM ClinicalTrialScreening;`,
    table: 'PatientIntake'
  },
  {
    id: 39,
    title: 'Vaccine Cold-Chain Temperature Excursion Breach',
    industry: 'Healthcare',
    difficulty: 'Hard',
    scenario: 'Monitoring mRNA vaccine freezers for temperature deviations above -60C.',
    schemaSnippet: 'FreezerSensors (sensor_id, temp_celsius, duration_minutes_above_threshold)',
    businessObjective: 'Flag vaccine batches compromised by extended temperature excursions.',
    targetQuery: `SELECT sensor_id, temp_celsius, duration_minutes_above_threshold,\n       CASE\n           WHEN temp_celsius > -60.0 AND duration_minutes_above_threshold > 120 THEN 'BATCH_COMPROMISED_DESTROY'\n           WHEN temp_celsius > -60.0 THEN 'EXCURSION_QUARANTINE_INSPECT'\n           ELSE 'COLD_CHAIN_NORMAL'\n       END AS vaccine_batch_integrity\nFROM FreezerSensors\nORDER BY temp_celsius DESC;`,
    table: 'PatientIntake'
  },
  {
    id: 40,
    title: 'Outpatient Appointment No-Show Propensity Buffer',
    industry: 'Healthcare',
    difficulty: 'Easy',
    scenario: 'Identifying historical no-show patterns to schedule double-booking clinic slots.',
    schemaSnippet: 'PatientAppointments (appointment_id, prior_noshow_count, distance_miles)',
    businessObjective: 'Assign double-booking and mandatory confirmation rules.',
    targetQuery: `SELECT appointment_id, prior_noshow_count,\n       CASE\n           WHEN prior_noshow_count >= 3 THEN 'HIGH_NOSHOW_RISK_DOUBLE_BOOK'\n           WHEN prior_noshow_count >= 1 THEN 'CONFIRMATION_CALL_MANDATORY'\n           ELSE 'STANDARD_SLOT'\n       END AS booking_strategy\nFROM PatientAppointments;`,
    table: 'PatientIntake'
  },

  // --- DOMAIN 05: LOGISTICS & FLEET ---
  {
    id: 41,
    title: 'Autonomous Delivery Drone Battery & Cargo Clearance',
    industry: 'Logistics',
    difficulty: 'Medium',
    scenario: 'Dispatch software inspecting drone battery charge and weight limits before release.',
    schemaSnippet: 'DroneFleet (drone_id, battery_pct, payload_kg, mission_distance_km, motor_health_score)',
    businessObjective: 'Determine flight clearance status for scheduled missions.',
    targetQuery: `SELECT drone_id, battery_pct, payload_kg, mission_distance_km,\n       CASE\n           WHEN payload_kg > 4.5 OR motor_health_score < 80 THEN 'GROUNDED_MAINTENANCE'\n           WHEN mission_distance_km > 5.0 AND battery_pct < 40 THEN 'GROUNDED_LOW_BATTERY'\n           WHEN mission_distance_km <= 5.0 AND battery_pct < 25 THEN 'GROUNDED_LOW_BATTERY'\n           ELSE 'CLEARED_FOR_TAKEOFF'\n       END AS flight_clearance\nFROM DroneFleet\nORDER BY flight_clearance ASC, battery_pct ASC;`,
    table: 'DroneFleet'
  },
  {
    id: 42,
    title: 'Carrier Late Delivery Penalty Escalation',
    industry: 'Logistics',
    difficulty: 'Medium',
    scenario: 'Liquidated damages assessment on third-party logistics carriers breaching delivery SLAs.',
    schemaSnippet: 'ShipmentTracking (tracking_id, carrier_name, sla_minutes, actual_delivery_minutes, freight_cost)',
    businessObjective: 'Calculate delay minutes and assign contract penalty percentage tiers.',
    targetQuery: `SELECT tracking_id, carrier_name,\n       (actual_delivery_minutes - sla_minutes) AS delay_minutes,\n       CASE\n           WHEN actual_delivery_minutes <= sla_minutes THEN 'ON_TIME (0% Penalty)'\n           WHEN (actual_delivery_minutes - sla_minutes) <= 60 THEN 'MINOR_DELAY (5% Penalty)'\n           WHEN (actual_delivery_minutes - sla_minutes) <= 180 THEN 'MODERATE_DELAY (15% Penalty)'\n           ELSE 'SEVERE_BREACH (30% Penalty)'\n       END AS penalty_assessment\nFROM ShipmentTracking\nWHERE actual_delivery_minutes > sla_minutes\nORDER BY delay_minutes DESC;`,
    table: 'ShipmentTracking'
  },
  {
    id: 43,
    title: 'Perishable Produce Shelf-Life Freight Expiry',
    industry: 'Logistics',
    difficulty: 'Medium',
    scenario: 'Expediting reefer freight trucks before perishable berry spoilage.',
    schemaSnippet: 'ReeferCargo (pallet_id, produce_type, hours_to_spoilage, transit_remaining_hours)',
    businessObjective: 'Reroute or reject shipments based on remaining buffer hours.',
    targetQuery: `SELECT pallet_id, produce_type, (hours_to_spoilage - transit_remaining_hours) AS buffer_hours,\n       CASE\n           WHEN (hours_to_spoilage - transit_remaining_hours) < 0 THEN 'CARGO_SPOILED_REJECT'\n           WHEN (hours_to_spoilage - transit_remaining_hours) < 24 THEN 'REROUTE_TO_LOCAL_STORE'\n           ELSE 'ON_SCHEDULE'\n       END AS produce_disposition\nFROM ReeferCargo\nORDER BY buffer_hours ASC;`,
    table: 'ShipmentTracking'
  },
  {
    id: 44,
    title: 'Ocean Shipping Container Demurrage Accrual',
    industry: 'Logistics',
    difficulty: 'Medium',
    scenario: 'Port authority storage billing for containers exceeding free dwell days.',
    schemaSnippet: 'ContainerDwell (container_no, port_code, dwell_days, free_days_allowed)',
    businessObjective: 'Calculate billable overstay days and assign daily storage rates.',
    targetQuery: `SELECT container_no, dwell_days, (dwell_days - free_days_allowed) AS billable_overstay_days,\n       CASE\n           WHEN dwell_days <= free_days_allowed THEN 'NO_DEMURRAGE_FREE'\n           WHEN (dwell_days - free_days_allowed) <= 5 THEN 'TIER_1 ($150/day)'\n           ELSE 'TIER_2_PUNITIVE ($350/day)'\n       END AS demurrage_tier\nFROM ContainerDwell\nWHERE dwell_days > free_days_allowed\nORDER BY dwell_days DESC;`,
    table: 'ShipmentTracking'
  },
  {
    id: 45,
    title: 'Delivery Driver Route Dwell-Time Anomaly Monitor',
    industry: 'Logistics',
    difficulty: 'Easy',
    scenario: 'Detecting delivery drivers stopped at individual locations significantly past planned time.',
    schemaSnippet: 'DriverStops (driver_id, stop_id, planned_dwell_mins, actual_dwell_mins)',
    businessObjective: 'Flag stops exceeding planned dwell by more than 20 minutes.',
    targetQuery: `SELECT driver_id, stop_id, (actual_dwell_mins - planned_dwell_mins) AS excess_dwell,\n       CASE\n           WHEN (actual_dwell_mins - planned_dwell_mins) > 20 THEN 'INVESTIGATE_SAFETY_BREAKDOWN'\n           WHEN (actual_dwell_mins - planned_dwell_mins) > 8 THEN 'ELEVATED_DWELL_DELIVERY_ISSUE'\n           ELSE 'NORMAL_PACE'\n       END AS stop_audit\nFROM DriverStops\nORDER BY excess_dwell DESC;`,
    table: 'DroneFleet'
  },
  {
    id: 46,
    title: 'Cross-Docking Terminal Bay Allocation Priority',
    industry: 'Logistics',
    difficulty: 'Easy',
    scenario: 'Routing inbound tractor-trailers to cold, hazmat, or standard sorting bays.',
    schemaSnippet: 'InboundTrailers (trailer_id, is_hazardous, is_temperature_controlled, pallet_count)',
    businessObjective: 'Assign trailer dock bays according to safety and cooling requirements.',
    targetQuery: `SELECT trailer_id,\n       CASE\n           WHEN is_hazardous = TRUE THEN 'BAY_ZONE_H (ISOLATED)'\n           WHEN is_temperature_controlled = TRUE THEN 'BAY_ZONE_COLD (REEFER DOCK)'\n           WHEN pallet_count > 30 THEN 'HIGH_CAPACITY_CONVEYOR_DOCK'\n           ELSE 'STANDARD_BAY'\n       END AS dock_assignment\nFROM InboundTrailers;`,
    table: 'ShipmentTracking'
  },
  {
    id: 47,
    title: 'Hazmat Freight Tunnel Route Restriction Compliance',
    industry: 'Logistics',
    difficulty: 'Medium',
    scenario: 'Prohibiting explosive and compressed gas trucks from crossing bridge tunnels.',
    schemaSnippet: 'HazmatRoutes (truck_id, hazmat_class_code, intended_route_id)',
    businessObjective: 'Issue route bypass restrictions for hazardous cargo classes.',
    targetQuery: `SELECT truck_id, hazmat_class_code,\n       CASE\n           WHEN hazmat_class_code IN ('CLASS_1_EXPLOSIVE', 'CLASS_2_GAS') THEN 'RESTRICTED_BYPASS_SURROUND'\n           WHEN hazmat_class_code = 'CLASS_3_FLAMMABLE' THEN 'PERMIT_ESCORT_REQUIRED'\n           ELSE 'UNRESTRICTED_ROUTE'\n       END AS dispatch_clearance\nFROM HazmatRoutes;`,
    table: 'ShipmentTracking'
  },
  {
    id: 48,
    title: 'Fleet Preventative Maintenance Mileage Thresholds',
    industry: 'Logistics',
    difficulty: 'Easy',
    scenario: 'Automating semi-truck depot overhaul scheduling based on mileage and oil life.',
    schemaSnippet: 'TruckFleet (vin, miles_since_last_service, oil_life_pct)',
    businessObjective: 'Trigger maintenance alerts when mileage >= 25,000 or oil life < 10%.',
    targetQuery: `SELECT vin, miles_since_last_service, oil_life_pct,\n       CASE\n           WHEN miles_since_last_service >= 25000 OR oil_life_pct < 10 THEN 'IMMEDIATE_SHOP_OVERHAUL'\n           WHEN miles_since_last_service >= 15000 OR oil_life_pct < 25 THEN 'SCHEDULE_NEXT_DEPOT_STOP'\n           ELSE 'HEALTHY_RUNNING'\n       END AS maintenance_trigger\nFROM TruckFleet\nORDER BY miles_since_last_service DESC;`,
    table: 'DroneFleet'
  },
  {
    id: 49,
    title: 'Air Cargo Volumetric vs Actual Weight Billing Pivot',
    industry: 'Logistics',
    difficulty: 'Easy',
    scenario: 'Comparing physical weight against dimensional volume weight to determine billable weight.',
    schemaSnippet: 'AirShipments (airway_bill_id, actual_weight_kg, vol_weight_kg)',
    businessObjective: 'Select the greater of actual or volumetric weight as the billable standard.',
    targetQuery: `SELECT airway_bill_id, actual_weight_kg, vol_weight_kg,\n       CASE\n           WHEN vol_weight_kg > actual_weight_kg THEN vol_weight_kg\n           ELSE actual_weight_kg\n       END AS billable_weight_kg,\n       CASE\n           WHEN vol_weight_kg > actual_weight_kg THEN 'BILLED_ON_DIM_WEIGHT'\n           ELSE 'BILLED_ON_ACTUAL_WEIGHT'\n       END AS billing_basis\nFROM AirShipments\nORDER BY billable_weight_kg DESC;`,
    table: 'ShipmentTracking'
  },
  {
    id: 50,
    title: 'Port Congestion Vessel Waiting Time Surcharge',
    industry: 'Logistics',
    difficulty: 'Medium',
    scenario: 'Levying harbor waiting fees when container ships sit at anchor for over 72 hours.',
    schemaSnippet: 'VesselQueue (vessel_name, imo_number, wait_hours_at_anchor)',
    businessObjective: 'Assess congestion surcharges based on elapsed anchor wait time.',
    targetQuery: `SELECT vessel_name, wait_hours_at_anchor,\n       CASE\n           WHEN wait_hours_at_anchor > 120 THEN 'SEEK_ALTERNATIVE_PORT_ALERT'\n           WHEN wait_hours_at_anchor > 72 THEN 'CONGESTION_SURCHARGE_$50K'\n           ELSE 'NORMAL_ANCHORAGE'\n       END AS harbor_status\nFROM VesselQueue\nORDER BY wait_hours_at_anchor DESC;`,
    table: 'ShipmentTracking'
  },

  // --- DOMAIN 06: MEDIA, STREAMING & GAMING ---
  {
    id: 51,
    title: 'Content Age-Gate & Parental Advisory Filter',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Enforcing parental viewing restrictions on streaming catalog titles for child profiles.',
    schemaSnippet: 'MediaCatalog (title, mpaa_rating, genre, content_warning_tags)',
    businessObjective: 'Categorize catalog titles into restricted, pin-required, or open access.',
    targetQuery: `SELECT title, genre, mpaa_rating,\n       CASE\n           WHEN mpaa_rating IN ('R', 'TV-MA', 'NC-17') THEN 'RESTRICTED_LOCKED'\n           WHEN mpaa_rating = 'PG-13' THEN 'PARENTAL_PIN_REQUIRED'\n           ELSE 'OPEN_ACCESS'\n       END AS child_profile_permission\nFROM MediaCatalog\nORDER BY title ASC;`,
    table: 'MediaCatalog'
  },
  {
    id: 52,
    title: 'Adaptive Video Bitrate Streaming Profile Selector',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Selecting video resolution stream profiles based on measured client network bandwidth.',
    schemaSnippet: 'ClientSessions (session_id, bandwidth_kbps, screen_width_px)',
    businessObjective: 'Assign 4K, 1080p, 720p, or 480p streams based on available bandwidth.',
    targetQuery: `SELECT session_id, bandwidth_kbps,\n       CASE\n           WHEN bandwidth_kbps >= 15000 AND screen_width_px >= 3840 THEN '4K_UHD_PROFILE'\n           WHEN bandwidth_kbps >= 5000 THEN '1080P_FULL_HD'\n           WHEN bandwidth_kbps >= 2500 THEN '720P_HD'\n           ELSE '480P_SD_CONSERVE_DATA'\n       END AS stream_quality\nFROM ClientSessions\nORDER BY bandwidth_kbps DESC;`,
    table: 'MediaCatalog'
  },
  {
    id: 53,
    title: 'Music Streaming Creator Royalty Payout Tiering',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Calculating streaming songwriter payouts based on listener subscription tier and location.',
    schemaSnippet: 'SongPlays (play_id, track_id, is_premium_user, country_code)',
    businessObjective: 'Calculate per-stream royalty rate based on subscriber status.',
    targetQuery: `SELECT track_id, is_premium_user, country_code,\n       CASE\n           WHEN is_premium_user = TRUE AND country_code = 'USA' THEN 0.0045\n           WHEN is_premium_user = TRUE THEN 0.0035\n           ELSE 0.0012\n       END AS calculated_royalty_payout_usd\nFROM SongPlays;`,
    table: 'MediaCatalog'
  },
  {
    id: 54,
    title: 'Competitive Esports Anti-Cheat Aim-Bot Snap Score',
    industry: 'Media',
    difficulty: 'Hard',
    scenario: 'Detecting impossible cursor snap latency and high headshot accuracy in FPS games.',
    schemaSnippet: 'PlayerTelemetry (match_id, player_handle, snap_latency_ms, headshot_pct)',
    businessObjective: 'Flag telemetry indicating automated aim-bot software for tournament bans.',
    targetQuery: `SELECT player_handle, snap_latency_ms, headshot_pct,\n       CASE\n           WHEN snap_latency_ms < 15 AND headshot_pct > 80.0 THEN 'IMMEDIATE_BAN_AIMBOT'\n           WHEN snap_latency_ms < 30 AND headshot_pct > 60.0 THEN 'HUMAN_REVIEW_FLAG'\n           ELSE 'NORMAL_PLAY'\n       END AS anti_cheat_verdict\nFROM PlayerTelemetry\nORDER BY headshot_pct DESC;`,
    table: 'STUDENTS'
  },
  {
    id: 55,
    title: 'Ad-Supported Streaming Mid-Roll Commercial Breaks',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Scheduling commercial break insertion counts based on episode length and subscription type.',
    schemaSnippet: 'VideoEpisodes (episode_id, duration_minutes, subscription_type)',
    businessObjective: 'Determine scheduled ad breaks for non-premium viewers.',
    targetQuery: `SELECT episode_id, duration_minutes,\n       CASE\n           WHEN subscription_type = 'AD_FREE_PREMIUM' THEN 0\n           WHEN duration_minutes >= 60 THEN 4\n           WHEN duration_minutes >= 30 THEN 2\n           ELSE 1\n       END AS scheduled_midroll_ad_count\nFROM VideoEpisodes;`,
    table: 'MediaCatalog'
  },
  {
    id: 56,
    title: 'Paywalled Digital Newspaper Metered Access Gate',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Locking readers behind paywall modals after consuming their monthly free articles.',
    schemaSnippet: 'ArticleViews (reader_ip, monthly_views, has_active_subscription)',
    businessObjective: 'Block non-subscribers who exceed 3 free monthly article views.',
    targetQuery: `SELECT reader_ip, monthly_views,\n       CASE\n           WHEN has_active_subscription = TRUE THEN 'UNLIMITED_ACCESS'\n           WHEN monthly_views <= 3 THEN 'FREE_METERED_ARTICLE'\n           ELSE 'PAYWALL_MODAL_BLOCK'\n       END AS access_gate\nFROM ArticleViews\nORDER BY monthly_views DESC;`,
    table: 'MediaCatalog'
  },
  {
    id: 57,
    title: 'Matchmaking Skill Rating (MMR) Division Assignment',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Classifying competitive multiplayer gamers into Grandmaster, Diamond, Gold, or Bronze.',
    schemaSnippet: 'GamerRankings (gamer_tag, mmr_points)',
    businessObjective: 'Map numerical MMR points to competitive league divisions.',
    targetQuery: `SELECT gamer_tag, mmr_points,\n       CASE\n           WHEN mmr_points >= 2800 THEN 'GRANDMASTER'\n           WHEN mmr_points >= 2200 THEN 'DIAMOND'\n           WHEN mmr_points >= 1600 THEN 'GOLD'\n           ELSE 'BRONZE'\n       END AS competitive_division\nFROM GamerRankings\nORDER BY mmr_points DESC;`,
    table: 'STUDENTS'
  },
  {
    id: 58,
    title: 'User-Generated Content (UGC) Moderation Routing',
    industry: 'Media',
    difficulty: 'Medium',
    scenario: 'Routing flagged social posts to automated takedown vs human review queues.',
    schemaSnippet: 'ContentReports (comment_id, toxic_keyword_count, report_count)',
    businessObjective: 'Auto-hide comments containing prohibited toxic keywords or 10+ user reports.',
    targetQuery: `SELECT comment_id, report_count,\n       CASE\n           WHEN toxic_keyword_count > 0 OR report_count >= 10 THEN 'AUTO_HIDE_URGENT_QUEUE'\n           WHEN report_count >= 3 THEN 'STANDARD_REVIEW_QUEUE'\n           ELSE 'LOW_PRIORITY'\n       END AS moderation_action\nFROM ContentReports\nORDER BY report_count DESC;`,
    table: 'MediaCatalog'
  },
  {
    id: 59,
    title: 'Binge-Watcher Session Fatigue Rest Prompt',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Triggering pause prompts for users streaming consecutively for 4 or more hours.',
    schemaSnippet: 'ActiveSessions (user_id, consecutive_stream_hours)',
    businessObjective: 'Prompt users with rest reminders after 4 hours of uninterrupted playback.',
    targetQuery: `SELECT user_id, consecutive_stream_hours,\n       CASE\n           WHEN consecutive_stream_hours >= 4.0 THEN 'PROMPT_ARE_YOU_STILL_WATCHING'\n           ELSE 'CONTINUE_AUTOPLAY'\n       END AS player_ux_decision\nFROM ActiveSessions;`,
    table: 'Customers'
  },
  {
    id: 60,
    title: 'In-Game Economy Gold Sink Auction Tax Tiers',
    industry: 'Media',
    difficulty: 'Easy',
    scenario: 'Applying progressive auction house transaction fees on players with large gold reserves.',
    schemaSnippet: 'PlayerWallets (character_name, gold_balance)',
    businessObjective: 'Impose higher transaction fees on virtual millionaire accounts to prevent in-game inflation.',
    targetQuery: `SELECT character_name, gold_balance,\n       CASE\n           WHEN gold_balance >= 1000000 THEN 'LUXURY_AUCTION_TAX (15%)'\n           WHEN gold_balance >= 100000 THEN 'STANDARD_AUCTION_TAX (8%)'\n           ELSE 'BEGINNER_TAX_FREE'\n       END AS marketplace_fee_tier\nFROM PlayerWallets\nORDER BY gold_balance DESC;`,
    table: 'STUDENTS'
  },

  // --- DOMAIN 07: CYBERSECURITY & SECOPS ---
  {
    id: 61,
    title: 'Brute-Force IP Lockout & Anomaly Detection',
    industry: 'Security',
    difficulty: 'Hard',
    scenario: 'Analyzing failed authentication attempts to trigger automated firewall IP bans.',
    schemaSnippet: 'AuthAuditLog (source_ip, failed_attempts, country_code, is_vpn)',
    businessObjective: 'Identify and classify suspicious authentication IPs for firewall response.',
    targetQuery: `SELECT source_ip, failed_attempts, country_code,\n       CASE\n           WHEN source_ip LIKE '10.0.%' THEN 'INTERNAL_VPN_ALERT'\n           WHEN failed_attempts >= 25 THEN 'AUTOMATIC_PERMANENT_BAN'\n           WHEN failed_attempts >= 10 THEN 'TEMPORARY_RATE_LIMIT_60M'\n           ELSE 'MONITOR'\n       END AS firewall_action\nFROM AuthAuditLog\nWHERE failed_attempts >= 5\nORDER BY failed_attempts DESC;`,
    table: 'AuthAuditLog'
  },
  {
    id: 62,
    title: 'Impossible Travel Velocity Geolocation Alert',
    industry: 'Security',
    difficulty: 'Medium',
    scenario: 'Flagging accounts authenticating from distinct countries within unrealistic travel times.',
    schemaSnippet: 'LoginEvents (user_id, prev_country, new_country, elapsed_minutes)',
    businessObjective: 'Lock accounts attempting logins from different countries within 60 minutes.',
    targetQuery: `SELECT user_id, prev_country, new_country, elapsed_minutes,\n       CASE\n           WHEN prev_country != new_country AND elapsed_minutes < 60 THEN 'SUSPICIOUS_IMPOSSIBLE_TRAVEL_LOCK'\n           ELSE 'LEGITIMATE_LOGIN'\n       END AS auth_risk_disposition\nFROM LoginEvents;`,
    table: 'AuthAuditLog'
  },
  {
    id: 63,
    title: 'SOC2 / HIPAA Audit Log PII Redaction Compliance',
    industry: 'Security',
    difficulty: 'Hard',
    scenario: 'Verifying that sensitive Social Security or credit card numbers never leak into server logs.',
    schemaSnippet: 'RequestLogs (log_id, raw_payload)',
    businessObjective: 'Flag unredacted request payloads for immediate log purge.',
    targetQuery: `SELECT log_id,\n       CASE\n           WHEN raw_payload LIKE '%ssn%' OR raw_payload LIKE '%credit_card%' THEN 'CRITICAL_PII_LEAK_PURGE_LOG'\n           ELSE 'COMPLIANT_SANITIZED'\n       END AS log_compliance\nFROM RequestLogs;`,
    table: 'AuthAuditLog'
  },
  {
    id: 64,
    title: 'Cloud IAM Privileged Admin Escalation Audit',
    industry: 'Security',
    difficulty: 'Medium',
    scenario: 'Auditing AWS/GCP IAM security roles granted full administrative wildcard privileges.',
    schemaSnippet: 'IamPolicies (policy_name, allowed_actions, attached_users_count)',
    businessObjective: 'Flag widely-assigned wildcard policies for least-privilege refactoring.',
    targetQuery: `SELECT policy_name, attached_users_count,\n       CASE\n           WHEN allowed_actions = '*:*' AND attached_users_count > 5 THEN 'HIGH_RISK_ADMIN_CREEP'\n           WHEN allowed_actions = '*:*' THEN 'ACCEPTABLE_RESTRICTED_ADMIN'\n           ELSE 'LEAST_PRIVILEGE_ROLE'\n       END AS iam_governance_score\nFROM IamPolicies\nORDER BY attached_users_count DESC;`,
    table: 'AuthAuditLog'
  },
  {
    id: 65,
    title: 'Zero-Day Vulnerability CVSS Severity Scoring Tiers',
    industry: 'Security',
    difficulty: 'Medium',
    scenario: 'Enforcing vulnerability patch SLAs based on Common Vulnerability Scoring System numbers.',
    schemaSnippet: 'SecurityScans (cve_id, cvss_score, is_actively_exploited)',
    businessObjective: 'Assign 24-hour patch SLAs to zero-day actively exploited vulnerabilities.',
    targetQuery: `SELECT cve_id, cvss_score, is_actively_exploited,\n       CASE\n           WHEN is_actively_exploited = TRUE OR cvss_score >= 9.0 THEN 'SEV-1: PATCH_IN_24_HOURS'\n           WHEN cvss_score >= 7.0 THEN 'SEV-2: PATCH_IN_7_DAYS'\n           WHEN cvss_score >= 4.0 THEN 'SEV-3: PATCH_IN_30_DAYS'\n           ELSE 'SEV-4: STANDARD_BACKLOG'\n       END AS remediation_sla\nFROM SecurityScans\nORDER BY cvss_score DESC;`,
    table: 'AuthAuditLog'
  },
  {
    id: 66,
    title: 'Phishing Email Domain Typosquatting Matcher',
    industry: 'Security',
    difficulty: 'Medium',
    scenario: 'Intercepting malicious emails imitating internal company domains or financial services.',
    schemaSnippet: 'InboundEmails (email_id, sender_domain, spf_pass)',
    businessObjective: 'Quarantine spoofed emails failing SPF or using suspicious typosquat strings.',
    targetQuery: `SELECT email_id, sender_domain, spf_pass,\n       CASE\n           WHEN spf_pass = FALSE THEN 'QUARANTINE_SPOOFED_SENDER'\n           WHEN sender_domain LIKE '%paypa1%' OR sender_domain LIKE '%g00gle%' THEN 'PHISHING_TYPOSQUAT_BLOCK'\n           ELSE 'INBOX_DELIVER'\n       END AS email_gateway_action\nFROM InboundEmails;`,
    table: 'AuthAuditLog'
  },
  {
    id: 67,
    title: 'Endpoint Antivirus Definition Outdated Quarantine',
    industry: 'Security',
    difficulty: 'Easy',
    scenario: 'Disconnecting employee workstations from corporate LAN if virus definitions are stale.',
    schemaSnippet: 'Laptops (asset_tag, av_signature_days_old, os_version)',
    businessObjective: 'Route devices with signatures > 14 days old to quarantine isolation VLANs.',
    targetQuery: `SELECT asset_tag, av_signature_days_old,\n       CASE\n           WHEN av_signature_days_old > 14 THEN 'NETWORK_QUARANTINE_VLAN'\n           WHEN av_signature_days_old > 7 THEN 'PROMPT_USER_UPDATE'\n           ELSE 'COMPLIANT'\n       END AS endpoint_health\nFROM Laptops\nORDER BY av_signature_days_old DESC;`,
    table: 'Employees'
  },
  {
    id: 68,
    title: 'Employee Offboarding Access Revocation Audit',
    industry: 'Security',
    difficulty: 'Medium',
    scenario: 'Verifying that terminated staff credentials are deactivated within 2 hours of departure.',
    schemaSnippet: 'TerminatedStaff (employee_id, hours_since_termination, active_token_count)',
    businessObjective: 'Flag security breaches where active tokens exist on terminated accounts.',
    targetQuery: `SELECT employee_id, hours_since_termination, active_token_count,\n       CASE\n           WHEN active_token_count > 0 AND hours_since_termination > 2 THEN 'CRITICAL_SECURITY_BREACH_AUDIT'\n           WHEN active_token_count > 0 THEN 'PENDING_AUTOMATION'\n           ELSE 'CLEAN_OFFBOARDING'\n       END AS offboarding_audit_status\nFROM TerminatedStaff\nORDER BY hours_since_termination DESC;`,
    table: 'Employees'
  },
  {
    id: 69,
    title: 'Data Loss Prevention (DLP) Bulk File Download Alert',
    industry: 'Security',
    difficulty: 'Medium',
    scenario: 'Flagging departing employees downloading excessive gigabytes of proprietary documents.',
    schemaSnippet: 'FileDownloads (user_id, total_mb_downloaded_today, files_count)',
    businessObjective: 'Suspend accounts downloading over 5,000MB in a single monitoring window.',
    targetQuery: `SELECT user_id, total_mb_downloaded_today, files_count,\n       CASE\n           WHEN total_mb_downloaded_today >= 5000 THEN 'SEV_1_DLP_SUSPEND_ACCOUNT'\n           WHEN total_mb_downloaded_today >= 1000 THEN 'WARN_MANAGER_AUDIT'\n           ELSE 'NORMAL_ACTIVITY'\n       END AS dlp_risk_tier\nFROM FileDownloads\nORDER BY total_mb_downloaded_today DESC;`,
    table: 'Employees'
  },
  {
    id: 70,
    title: 'TLS Certificate Expiration Early Warning Windows',
    industry: 'Security',
    difficulty: 'Easy',
    scenario: 'Alerting DevOps infrastructure teams before public HTTPS certificates expire.',
    schemaSnippet: 'Certificates (domain_name, days_until_expiration)',
    businessObjective: 'Group certificates into urgent, warning, or healthy renewal states.',
    targetQuery: `SELECT domain_name, days_until_expiration,\n       CASE\n           WHEN days_until_expiration <= 0 THEN 'OUTAGE_EXPIRED'\n           WHEN days_until_expiration <= 14 THEN 'URGENT_AUTO_RENEW_FAILED'\n           WHEN days_until_expiration <= 30 THEN 'WARNING_RENEWAL_WINDOW'\n           ELSE 'HEALTHY'\n       END AS cert_status\nFROM Certificates\nORDER BY days_until_expiration ASC;`,
    table: 'AuthAuditLog'
  },

  // --- DOMAIN 08: HARDWARE, IOT & ROBOTICS ---
  {
    id: 71,
    title: 'Sensor Distance Triangle Geometry Verification',
    industry: 'Hardware',
    difficulty: 'Hard',
    scenario: 'Autonomous warehouse drone ultrasound distance sensor polygon geometry quality control.',
    schemaSnippet: 'TRIANGLES (A, B, C)',
    businessObjective: 'Evaluate sides A, B, C and classify them using strict short-circuit waterfall logic.',
    targetQuery: `SELECT A, B, C,\n       CASE\n           WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n           WHEN A = B AND B = C THEN 'Equilateral'\n           WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n           ELSE 'Scalene'\n       END AS triangle_type\nFROM TRIANGLES;`,
    table: 'TRIANGLES'
  },
  {
    id: 72,
    title: 'Industrial Robotic Arm Vibration Bearing Wear',
    industry: 'Hardware',
    difficulty: 'Medium',
    scenario: 'Detecting imminent bearing failure on automotive assembly line welding arms.',
    schemaSnippet: 'RobotTelemetry (robot_id, vibration_hz, operating_temp_c)',
    businessObjective: 'Trigger emergency shutdowns when vibration exceeds 120Hz or temperature exceeds 85C.',
    targetQuery: `SELECT robot_id, vibration_hz, operating_temp_c,\n       CASE\n           WHEN vibration_hz >= 120 OR operating_temp_c >= 85 THEN 'EMERGENCY_SHUTDOWN_BEARING_FAIL'\n           WHEN vibration_hz >= 90 THEN 'SCHEDULE_LUBRICATION'\n           ELSE 'OPTIMAL'\n       END AS factory_floor_alert\nFROM RobotTelemetry;`,
    table: 'TRIANGLES'
  },
  {
    id: 73,
    title: 'Smart Electric Grid Surge Demand Pricing Tiers',
    industry: 'Hardware',
    difficulty: 'Easy',
    scenario: 'Incentivizing EV charging shifts during regional electrical peak demand hours.',
    schemaSnippet: 'GridMeters (meter_id, current_load_kw, hour_of_day)',
    businessObjective: 'Apply peak surge tariffs for high electric loads between 5PM and 9PM.',
    targetQuery: `SELECT meter_id, current_load_kw, hour_of_day,\n       CASE\n           WHEN hour_of_day BETWEEN 17 AND 21 AND current_load_kw >= 7.0 THEN 'PEAK_SURGE ($0.45/kWh)'\n           WHEN hour_of_day BETWEEN 17 AND 21 THEN 'PEAK_STANDARD ($0.30/kWh)'\n           WHEN hour_of_day BETWEEN 0 AND 6 THEN 'SUPER_OFF_PEAK ($0.08/kWh)'\n           ELSE 'STANDARD ($0.18/kWh)'\n       END AS tariff_rate\nFROM GridMeters;`,
    table: 'TRIANGLES'
  },
  {
    id: 74,
    title: 'Warehouse Autonomous Mobile Robot (AMR) Braking Command',
    industry: 'Hardware',
    difficulty: 'Easy',
    scenario: 'Controlling AMR velocity based on frontal LIDAR obstacle detection distance.',
    schemaSnippet: 'AmrObstacles (robot_id, obstacle_distance_cm, current_velocity_mps)',
    businessObjective: 'Command emergency braking when obstacles appear within 20cm.',
    targetQuery: `SELECT robot_id, obstacle_distance_cm,\n       CASE\n           WHEN obstacle_distance_cm <= 20 THEN 'EMERGENCY_BRAKE_0_MPS'\n           WHEN obstacle_distance_cm <= 50 THEN 'DECELERATE_0_5_MPS'\n           ELSE 'NORMAL_CRUISE_1_5_MPS'\n       END AS speed_command\nFROM AmrObstacles;`,
    table: 'DroneFleet'
  },
  {
    id: 75,
    title: 'Solar Panel Array Inverter Efficiency Degradation',
    industry: 'Hardware',
    difficulty: 'Medium',
    scenario: 'Detecting cracked or dirt-encrusted solar panels in utility-scale solar farms.',
    schemaSnippet: 'SolarInverters (inverter_id, actual_kwh_generated, expected_kwh_sunlight)',
    businessObjective: 'Schedule washing or maintenance based on energy generation efficiency percentage.',
    targetQuery: `SELECT inverter_id, (actual_kwh_generated * 100.0 / expected_kwh_sunlight) AS efficiency_pct,\n       CASE\n           WHEN (actual_kwh_generated * 1.0 / expected_kwh_sunlight) < 0.60 THEN 'DEFECT_PANEL_CRACKED'\n           WHEN (actual_kwh_generated * 1.0 / expected_kwh_sunlight) < 0.85 THEN 'SCHEDULE_PANEL_WASH'\n           ELSE 'OPTIMAL_GENERATION'\n       END AS maintenance_action\nFROM SolarInverters;`,
    table: 'TRIANGLES'
  },
  {
    id: 76,
    title: 'EV Charging Station Supercharge vs Level 2 Rate',
    industry: 'Hardware',
    difficulty: 'Easy',
    scenario: 'Applying session charges based on DC Fast Charge vs AC Level 2 hardware.',
    schemaSnippet: 'EvSessions (session_id, charger_type, kwh_delivered)',
    businessObjective: 'Calculate total charging cost based on charger rate tiers.',
    targetQuery: `SELECT session_id, charger_type, kwh_delivered,\n       CASE\n           WHEN charger_type = 'DC_FAST_350KW' THEN (kwh_delivered * 0.42) + 2.50\n           WHEN charger_type = 'DC_FAST_150KW' THEN (kwh_delivered * 0.35) + 1.00\n           ELSE (kwh_delivered * 0.22) \n       END AS session_cost_usd\nFROM EvSessions;`,
    table: 'Transactions'
  },
  {
    id: 77,
    title: 'Municipal Water Treatment PH Balance Safe Zone',
    industry: 'Hardware',
    difficulty: 'Easy',
    scenario: 'Monitoring potable tap water quality sensors for acid/alkaline violations.',
    schemaSnippet: 'WaterQuality (sample_id, ph_reading, chlorine_ppm)',
    businessObjective: 'Trigger chemical corrective dosing when PH breaches 6.5 - 8.5.',
    targetQuery: `SELECT sample_id, ph_reading,\n       CASE\n           WHEN ph_reading < 6.5 THEN 'ACIDIC_VIOLATION_ADD_LIME'\n           WHEN ph_reading > 8.5 THEN 'ALKALINE_VIOLATION_ADD_ACID'\n           ELSE 'SAFE_POTABLE_WATER'\n       END AS ph_compliance\nFROM WaterQuality;`,
    table: 'TRIANGLES'
  },
  {
    id: 78,
    title: 'Datacenter Server Thermal Hot-Aisle Overheat Throttle',
    industry: 'Hardware',
    difficulty: 'Easy',
    scenario: 'Throttling server CPU frequency when datacenter HVAC cooling units fail.',
    schemaSnippet: 'ServerThermal (rack_id, intake_temp_c, exhaust_temp_c)',
    businessObjective: 'Command 50% CPU throttling when exhaust temperatures exceed 45C.',
    targetQuery: `SELECT rack_id, exhaust_temp_c,\n       CASE\n           WHEN exhaust_temp_c >= 45.0 THEN 'CRITICAL_THROTTLE_CPU_50_PCT'\n           WHEN exhaust_temp_c >= 38.0 THEN 'BOOST_FAN_SPEED_100_PCT'\n           ELSE 'THERMAL_OPTIMAL'\n       END AS cooling_instruction\nFROM ServerThermal;`,
    table: 'TRIANGLES'
  },
  {
    id: 79,
    title: 'Aircraft Jet Turbine Exhaust Gas Temperature (EGT)',
    industry: 'Hardware',
    difficulty: 'Hard',
    scenario: 'Providing real-time cockpit warning alerts for jet engine thermal stress.',
    schemaSnippet: 'TurbineSensors (flight_no, engine_no, exhaust_gas_temp_c)',
    businessObjective: 'Trigger amber caution or red overheat warnings during flight.',
    targetQuery: `SELECT flight_no, engine_no, exhaust_gas_temp_c,\n       CASE\n           WHEN exhaust_gas_temp_c >= 950 THEN 'RED_WARNING_OVERHEAT'\n           WHEN exhaust_gas_temp_c >= 875 THEN 'AMBER_CAUTION'\n           ELSE 'NORMAL_GREEN'\n       END AS cockpit_alert\nFROM TurbineSensors;`,
    table: 'DroneFleet'
  },
  {
    id: 80,
    title: 'Smart Farm Soil Moisture Automated Irrigation',
    industry: 'Hardware',
    difficulty: 'Easy',
    scenario: 'Automating agricultural drip irrigation valve controls based on soil volumetric water content.',
    schemaSnippet: 'SoilProbes (field_zone_id, volumetric_water_content_pct)',
    businessObjective: 'Open irrigation valves when soil moisture drops below 15%.',
    targetQuery: `SELECT field_zone_id, volumetric_water_content_pct,\n       CASE\n           WHEN volumetric_water_content_pct < 15.0 THEN 'VALVE_OPEN_IRRIGATE'\n           WHEN volumetric_water_content_pct > 35.0 THEN 'VALVE_CLOSED_SATURATED'\n           ELSE 'VALVE_CLOSED_OPTIMAL'\n       END AS irrigation_command\nFROM SoilProbes;`,
    table: 'TRIANGLES'
  },

  // --- DOMAIN 09: HR, PAYROLL & GOVERNANCE ---
  {
    id: 81,
    title: 'Executive OKR Performance Bonus & Equity Vesting',
    industry: 'HR',
    difficulty: 'Medium',
    scenario: 'Calculating annual executive bonus percentages and equity acceleration based on OKR completion.',
    schemaSnippet: 'ExecutiveReview (executive_id, executive_name, department, okr_completion_pct, tenure_years)',
    businessObjective: 'Assign bonus and vesting brackets to executives with tenure >= 2 years.',
    targetQuery: `SELECT executive_name, department, okr_completion_pct, tenure_years,\n       CASE\n           WHEN okr_completion_pct >= 115.0 THEN 'SUPERIOR (150% Bonus + 1.25x Vesting)'\n           WHEN okr_completion_pct >= 100.0 THEN 'TARGET (100% Bonus + 1.0x Vesting)'\n           WHEN okr_completion_pct >= 85.0 THEN 'THRESHOLD (75% Bonus + Standard Vesting)'\n           ELSE 'BELOW_EXPECTATION (0% Bonus)'\n       END AS bonus_vesting_bracket\nFROM ExecutiveReview\nWHERE tenure_years >= 2\nORDER BY okr_completion_pct DESC;`,
    table: 'ExecutiveReview'
  },
  {
    id: 82,
    title: 'Overtime Pay Compliance (1.5x Over 40h, 2.0x Over 60h)',
    industry: 'HR',
    difficulty: 'Medium',
    scenario: 'Calculating gross payroll according to FLSA overtime and double-time wage regulations.',
    schemaSnippet: 'TimeCards (emp_id, weekly_hours_worked, base_hourly_rate)',
    businessObjective: 'Compute total wages including overtime tiers for hourly employees.',
    targetQuery: `SELECT emp_id, weekly_hours_worked, base_hourly_rate,\n       CASE\n           WHEN weekly_hours_worked > 60 THEN (40 * base_hourly_rate) + (20 * base_hourly_rate * 1.5) + ((weekly_hours_worked - 60) * base_hourly_rate * 2.0)\n           WHEN weekly_hours_worked > 40 THEN (40 * base_hourly_rate) + ((weekly_hours_worked - 40) * base_hourly_rate * 1.5)\n           ELSE (weekly_hours_worked * base_hourly_rate)\n       END AS gross_weekly_pay\nFROM TimeCards\nORDER BY gross_weekly_pay DESC;`,
    table: 'Employees'
  },
  {
    id: 83,
    title: 'Annual Paid Time Off (PTO) Carryover & Forfeiture',
    industry: 'HR',
    difficulty: 'Easy',
    scenario: 'Capping annual PTO hours carryover at 80 hours and calculating forfeited balances.',
    schemaSnippet: 'PtoBalances (employee_id, current_pto_hours)',
    businessObjective: 'Enforce maximum carryover and compute lost hours.',
    targetQuery: `SELECT employee_id, current_pto_hours,\n       CASE\n           WHEN current_pto_hours > 80 THEN 80\n           ELSE current_pto_hours\n       END AS hours_carried_forward,\n       CASE\n           WHEN current_pto_hours > 80 THEN (current_pto_hours - 80)\n           ELSE 0\n       END AS hours_forfeited\nFROM PtoBalances;`,
    table: 'Employees'
  },
  {
    id: 84,
    title: 'Gender & Ethnicity Pay Equity Audit Bands',
    industry: 'HR',
    difficulty: 'Medium',
    scenario: 'Auditing staff salaries against departmental role median salary bands (80% to 120%).',
    schemaSnippet: 'CompensationAudit (emp_id, role, salary, role_median_salary)',
    businessObjective: 'Flag employees falling outside standard compensation equity bands.',
    targetQuery: `SELECT emp_id, role, salary, role_median_salary,\n       CASE\n           WHEN salary < (role_median_salary * 0.80) THEN 'UNDERPAID_EQUITY_REVIEW'\n           WHEN salary > (role_median_salary * 1.20) THEN 'EXCEEDS_SALARY_BAND'\n           ELSE 'COMPLIANT_BAND'\n       END AS pay_equity_status\nFROM CompensationAudit;`,
    table: 'Employees'
  },
  {
    id: 85,
    title: 'Sales Commission Accelerator Tiers (100% / 150%)',
    industry: 'HR',
    difficulty: 'Easy',
    scenario: 'Calculating commission payouts based on annual quota achievement percentages.',
    schemaSnippet: 'SalesReps (rep_id, deals_closed_usd, annual_quota_usd)',
    businessObjective: 'Apply accelerated commission percentages to sales reps hitting quota.',
    targetQuery: `SELECT rep_id, (deals_closed_usd * 100.0 / annual_quota_usd) AS attainment_pct,\n       CASE\n           WHEN (deals_closed_usd * 1.0 / annual_quota_usd) >= 1.50 THEN 'SUPER_ACCELERATOR (20% Commission)'\n           WHEN (deals_closed_usd * 1.0 / annual_quota_usd) >= 1.00 THEN 'ACCELERATOR (15% Commission)'\n           ELSE 'BASE_COMMISSION (10% Commission)'\n       END AS commission_structure\nFROM SalesReps\nORDER BY attainment_pct DESC;`,
    table: 'Employees'
  },
  {
    id: 86,
    title: 'Remote Work State Tax Nexus Trigger Alert',
    industry: 'HR',
    difficulty: 'Easy',
    scenario: 'Flagging remote employees residing in states where the business has no established tax registration.',
    schemaSnippet: 'RemoteWorkers (employee_id, physical_state, company_registered_states)',
    businessObjective: 'Identify remote workers in new states triggering corporate nexus.',
    targetQuery: `SELECT employee_id, physical_state,\n       CASE\n           WHEN physical_state NOT IN ('CA', 'NY', 'TX', 'WA') THEN 'NEW_STATE_TAX_NEXUS_TRIGGER'\n           ELSE 'ESTABLISHED_NEXUS'\n       END AS legal_tax_status\nFROM RemoteWorkers;`,
    table: 'Employees'
  },
  {
    id: 87,
    title: 'Employee Flight Risk Propensity Early Warning Index',
    industry: 'HR',
    difficulty: 'Easy',
    scenario: 'Flagging high-performing staff who have gone 24+ months without compensation review.',
    schemaSnippet: 'StaffFlightRisk (emp_id, performance_rating, months_since_last_raise)',
    businessObjective: 'Highlight critical retention risks for immediate management review.',
    targetQuery: `SELECT emp_id, performance_rating, months_since_last_raise,\n       CASE\n           WHEN performance_rating >= 4 AND months_since_last_raise >= 24 THEN 'CRITICAL_FLIGHT_RISK'\n           WHEN months_since_last_raise >= 18 THEN 'MODERATE_RETENTION_RISK'\n           ELSE 'LOW_RISK'\n       END AS retention_tier\nFROM StaffFlightRisk;`,
    table: 'Employees'
  },
  {
    id: 88,
    title: 'Contractor 1099 vs W2 Classification Audit',
    industry: 'HR',
    difficulty: 'Medium',
    scenario: 'Auditing freelance contractors working 40+ hours weekly for over a year.',
    schemaSnippet: 'Contractors (contractor_id, weekly_hours, tenure_months)',
    businessObjective: 'Flag contractors at risk of Department of Labor misclassification penalties.',
    targetQuery: `SELECT contractor_id, weekly_hours, tenure_months,\n       CASE\n           WHEN weekly_hours >= 40 AND tenure_months >= 12 THEN 'HIGH_MISCLASSIFICATION_AUDIT_RISK'\n           ELSE 'COMPLIANT_1099'\n       END AS legal_assessment\nFROM Contractors;`,
    table: 'Employees'
  },
  {
    id: 89,
    title: 'Mandatory Compliance Training Deadline Escalation',
    industry: 'HR',
    difficulty: 'Easy',
    scenario: 'Automating security credential deactivation for staff overdue on annual compliance courses.',
    schemaSnippet: 'ComplianceTraining (employee_id, days_overdue, is_completed)',
    businessObjective: 'Revoke VPN credentials if compliance training is 14+ days overdue.',
    targetQuery: `SELECT employee_id, days_overdue,\n       CASE\n           WHEN is_completed = TRUE THEN 'CERTIFIED_COMPLETE'\n           WHEN days_overdue >= 14 THEN 'REVOKE_VPN_CREDENTIALS'\n           WHEN days_overdue >= 7 THEN 'ESCALATE_TO_DEPARTMENT_VP'\n           ELSE 'SEND_DAILY_SLACK_REMINDER'\n       END AS compliance_enforcement\nFROM ComplianceTraining;`,
    table: 'Employees'
  },
  {
    id: 90,
    title: '401(k) Employer Match Vesting Schedule Calculator',
    industry: 'HR',
    difficulty: 'Medium',
    scenario: 'Calculating vested employer retirement match balances based on years of continuous service.',
    schemaSnippet: 'RetirementPlans (emp_id, completed_years, employer_match_balance)',
    businessObjective: 'Compute vested dollar balances across standard 4-year graded schedules.',
    targetQuery: `SELECT emp_id, completed_years, employer_match_balance,\n       CASE\n           WHEN completed_years >= 4 THEN employer_match_balance * 1.00\n           WHEN completed_years = 3 THEN employer_match_balance * 0.75\n           WHEN completed_years = 2 THEN employer_match_balance * 0.50\n           WHEN completed_years = 1 THEN employer_match_balance * 0.25\n           ELSE 0.00\n       END AS vested_match_balance_usd\nFROM RetirementPlans;`,
    table: 'Employees'
  },

  // --- DOMAIN 10: MARKETPLACES & PLATFORMS ---
  {
    id: 91,
    title: 'Ride-Hailing Surge Pricing Multiplier Engine',
    industry: 'Platforms',
    difficulty: 'Medium',
    scenario: 'Calculating dynamic fare surge multipliers when passenger requests outnumber active drivers.',
    schemaSnippet: 'RideZones (zone_id, active_drivers, pending_requests)',
    businessObjective: 'Apply surge fare multipliers from 1.25x up to 3.0x.',
    targetQuery: `SELECT zone_id, active_drivers, pending_requests,\n       CASE\n           WHEN active_drivers = 0 THEN 'SURGE_3_0X_MAX'\n           WHEN (pending_requests * 1.0 / active_drivers) >= 3.0 THEN 'SURGE_2_5X'\n           WHEN (pending_requests * 1.0 / active_drivers) >= 2.0 THEN 'SURGE_1_75X'\n           WHEN (pending_requests * 1.0 / active_drivers) >= 1.2 THEN 'SURGE_1_25X'\n           ELSE 'STANDARD_FARE_1_0X'\n       END AS surge_multiplier\nFROM RideZones\nORDER BY pending_requests DESC;`,
    table: 'Customers'
  },
  {
    id: 92,
    title: 'Creator Brand Sponsorship Engagement Tiering',
    industry: 'Platforms',
    difficulty: 'Easy',
    scenario: 'Categorizing social influencers for ad sponsorship rates based on follower count and engagement.',
    schemaSnippet: 'InfluencerStats (handle, follower_count, engagement_rate_pct)',
    businessObjective: 'Assign sponsorship rate card tiers based on followers and engagement.',
    targetQuery: `SELECT handle, follower_count, engagement_rate_pct,\n       CASE\n           WHEN follower_count >= 1000000 AND engagement_rate_pct >= 3.5 THEN 'TIER_1_CELEBRITY ($25k/post)'\n           WHEN follower_count >= 100000 AND engagement_rate_pct >= 4.0 THEN 'TIER_2_MACRO ($5k/post)'\n           WHEN follower_count >= 10000 AND engagement_rate_pct >= 5.0 THEN 'TIER_3_MICRO ($1k/post)'\n           ELSE 'UNQUALIFIED'\n       END AS sponsorship_rate_card\nFROM InfluencerStats\nORDER BY follower_count DESC;`,
    table: 'Customers'
  },
  {
    id: 93,
    title: 'Airbnb Superhost Certification Status Check',
    industry: 'Platforms',
    difficulty: 'Easy',
    scenario: 'Verifying that property hosts maintain a 4.80+ review rating and < 1% cancellation rate.',
    schemaSnippet: 'AirbnbHosts (host_id, average_rating, cancellation_rate_pct, completed_trips)',
    businessObjective: 'Award Superhost badges to top performing property managers.',
    targetQuery: `SELECT host_id, average_rating, cancellation_rate_pct, completed_trips,\n       CASE\n           WHEN completed_trips >= 10 AND average_rating >= 4.80 AND cancellation_rate_pct < 1.0 THEN 'SUPERHOST_CERTIFIED'\n           ELSE 'STANDARD_HOST'\n       END AS badge_award\nFROM AirbnbHosts\nORDER BY average_rating DESC;`,
    table: 'Customers'
  },
  {
    id: 94,
    title: 'AdTech Cost-Per-Click (CPC) Quality Score Adjustment',
    industry: 'Platforms',
    difficulty: 'Medium',
    scenario: 'Applying quality score bid discounts or penalties in automated ad auctions.',
    schemaSnippet: 'AdCampaigns (campaign_id, bid_price_usd, quality_score_1_to_10)',
    businessObjective: 'Reward high-quality campaigns with 20% discounts and penalize poor ads by 50%.',
    targetQuery: `SELECT campaign_id, bid_price_usd, quality_score_1_to_10,\n       CASE\n           WHEN quality_score_1_to_10 >= 8 THEN bid_price_usd * 0.80\n           WHEN quality_score_1_to_10 <= 3 THEN bid_price_usd * 1.50\n           ELSE bid_price_usd\n       END AS effective_cpc_price\nFROM AdCampaigns\nORDER BY quality_score_1_to_10 ASC;`,
    table: 'Transactions'
  },
  {
    id: 95,
    title: 'Food Delivery Dasher Default Tip Recommendation',
    industry: 'Platforms',
    difficulty: 'Easy',
    scenario: 'Suggesting default checkout tip amounts based on order subtotals.',
    schemaSnippet: 'FoodOrders (order_id, subtotal_usd, delivery_distance_miles)',
    businessObjective: 'Recommend $3 minimum tip on small carts or 18% on standard orders.',
    targetQuery: `SELECT order_id, subtotal_usd,\n       CASE\n           WHEN subtotal_usd < 15.00 THEN 3.00\n           ELSE ROUND(subtotal_usd * 0.18, 2)\n       END AS recommended_default_tip_usd\nFROM FoodOrders;`,
    table: 'Orders'
  },
  {
    id: 96,
    title: 'Counterfeit Luxury Listing Risk Score Check',
    industry: 'Platforms',
    difficulty: 'Medium',
    scenario: 'Flagging suspect Rolex watch listings sold for 70%+ below retail MSRP.',
    schemaSnippet: 'MarketplaceListings (listing_id, brand_name, listed_price_usd, msrp_usd, seller_rating)',
    businessObjective: 'Takedown obvious counterfeit listings and hold suspicious goods for authentication.',
    targetQuery: `SELECT listing_id, brand_name, listed_price_usd, msrp_usd,\n       CASE\n           WHEN brand_name = 'Rolex' AND listed_price_usd < (msrp_usd * 0.30) THEN 'CRITICAL_COUNTERFEIT_TAKEDOWN'\n           WHEN (listed_price_usd * 1.0 / msrp_usd) < 0.50 AND seller_rating < 3.5 THEN 'HOLD_FOR_AUTHENTICATION'\n           ELSE 'APPROVED_LISTING'\n       END AS trust_action\nFROM MarketplaceListings;`,
    table: 'Orders'
  },
  {
    id: 97,
    title: 'Social Network Spam Bot Registration Velocity',
    industry: 'Platforms',
    difficulty: 'Medium',
    scenario: 'Imposing CAPTCHAs or phone verification on subnets creating excessive accounts.',
    schemaSnippet: 'SignupAudit (subnet, signups_last_hour)',
    businessObjective: 'Challenge automated bot farms creating 20+ accounts per hour.',
    targetQuery: `SELECT subnet, signups_last_hour,\n       CASE\n           WHEN signups_last_hour >= 50 THEN 'CAPTCHA_PLUS_PHONE_VERIFY'\n           WHEN signups_last_hour >= 20 THEN 'REQUIRE_CAPTCHA'\n           ELSE 'STANDARD_FLOW'\n       END AS security_challenge\nFROM SignupAudit\nORDER BY signups_last_hour DESC;`,
    table: 'AuthAuditLog'
  },
  {
    id: 98,
    title: 'Dating App Discovery Radius & Age Range Filter',
    industry: 'Platforms',
    difficulty: 'Easy',
    scenario: 'Filtering match feeds based on mutual distance and age criteria.',
    schemaSnippet: 'MatchCandidates (user_a_id, user_b_id, distance_miles, age_difference_years)',
    businessObjective: 'Qualify candidates within 25 miles and 5 years age difference.',
    targetQuery: `SELECT user_a_id, user_b_id, distance_miles, age_difference_years,\n       CASE\n           WHEN distance_miles <= 25 AND age_difference_years <= 5 THEN 'ELIGIBLE_IN_FEED'\n           ELSE 'OUT_OF_BOUNDS_FILTER'\n       END AS discovery_filter\nFROM MatchCandidates;`,
    table: 'Customers'
  },
  {
    id: 99,
    title: 'Real Estate Days-on-Market (DOM) Price Cut Alert',
    industry: 'Platforms',
    difficulty: 'Easy',
    scenario: 'Advising homeowners on strategic price reductions when listings sit unsold.',
    schemaSnippet: 'HomeListings (mls_id, list_price, days_on_market)',
    businessObjective: 'Recommend 5% or 10% price cuts based on days on market.',
    targetQuery: `SELECT mls_id, list_price, days_on_market,\n       CASE\n           WHEN days_on_market > 90 THEN 'RECOMMEND_10_PCT_PRICE_CUT'\n           WHEN days_on_market > 45 THEN 'RECOMMEND_5_PCT_PRICE_CUT'\n           ELSE 'NEW_ACTIVE_LISTING'\n       END AS realtor_strategy\nFROM HomeListings\nORDER BY days_on_market DESC;`,
    table: 'Customers'
  },
  {
    id: 100,
    title: 'Crowdfunding All-or-Nothing Escrow Payout Gate',
    industry: 'Platforms',
    difficulty: 'Medium',
    scenario: 'Kickstarter-style escrow disbursement releasing funds only upon 100% campaign target achievement.',
    schemaSnippet: 'Campaigns (campaign_id, goal_amount_usd, pledged_amount_usd, is_deadline_passed)',
    businessObjective: 'Release funds or initiate backer refunds when deadlines pass.',
    targetQuery: `SELECT campaign_id, goal_amount_usd, pledged_amount_usd,\n       CASE\n           WHEN pledged_amount_usd >= goal_amount_usd AND is_deadline_passed = TRUE THEN 'RELEASE_FUNDS_TO_CREATOR'\n           WHEN pledged_amount_usd < goal_amount_usd AND is_deadline_passed = TRUE THEN 'REFUND_ALL_BACKERS'\n           ELSE 'CAMPAIGN_IN_PROGRESS'\n       END AS escrow_disbursement\nFROM Campaigns;`,
    table: 'Orders'
  }
];
