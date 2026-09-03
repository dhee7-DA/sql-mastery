# Pillar 1: Foundations & Control Flow — The 100 Enterprise Case Study Master Vault

An exhaustive catalog of **100 production-grade corporate SQL case studies** spanning 10 global industries. Each case study tests core SQL execution foundations: `SELECT`, `FROM`, `WHERE`, `DISTINCT`, `ORDER BY`, `LIMIT`, `CASE WHEN`, `BETWEEN`, `LIKE`, `IN`, and three-valued boolean logic (`NULL`).

---

## 📑 Directory of the 10 Industry Domains

| Domain # | Industry Vertical | Case Range | Key Focus |
|:---|:---|:---|:---|
| **01** | [Fintech & Payments](#domain-01-fintech--payments-cases-01-10) | Cases 001 – 010 | Fraud detection, credit underwriting, AML, wires |
| **02** | [SaaS & Cloud Subscriptions](#domain-02-saas--cloud-subscriptions-cases-011-020) | Cases 011 – 020 | Churn risk, seat utilization, API limits, renewals |
| **03** | [E-Commerce & Omnichannel Retail](#domain-03-e-commerce--retail-cases-021-030) | Cases 021 – 030 | VIP loyalty, cart abandonment, SLAs, return abuse |
| **04** | [Healthcare & Clinical Systems](#domain-04-healthcare--clinical-systems-cases-031-040) | Cases 031 – 040 | ER triage, pediatric dosing, ICU beds, pre-auth |
| **05** | [Logistics & Fleet Operations](#domain-05-logistics--fleet-operations-cases-041-050) | Cases 041 – 050 | Drone routing, carrier penalties, dwell time, demurrage |
| **06** | [Media, Streaming & Gaming](#domain-06-media-streaming--gaming-cases-051-060) | Cases 051 – 060 | Age-gate, adaptive bitrate, royalties, anti-cheat |
| **07** | [Cybersecurity & SecOps](#domain-07-cybersecurity--secops-cases-061-070) | Cases 061 – 070 | Brute force IP bans, geo-velocity, IAM, CVSS |
| **08** | [Hardware, IoT & Robotics](#domain-08-hardware-iot--robotics-cases-071-080) | Cases 071 – 080 | Sensor geometry, vibration wear, thermal limits |
| **09** | [HR, Payroll & Governance](#domain-09-hr-payroll--governance-cases-081-090) | Cases 081 – 090 | OKR vesting, overtime compliance, PTO, pay equity |
| **10** | [Marketplaces & Social Platforms](#domain-10-marketplaces--social-platforms-cases-091-100) | Cases 091 – 100 | Surge pricing, Superhost status, CPC quality, tips |

---

## Domain 01: Fintech & Payments (Cases 01 – 10)

### Case 001: Stripe Transaction Fraud Velocity Tripwire
- **Business Context**: Sub-100ms card fraud flagging for high-risk categories and foreign transactions.
- **Table**: `Transactions (tx_id, merchant_category, amount_usd, is_foreign_card, risk_score)`
```sql
SELECT tx_id, merchant_category, amount_usd, risk_score,
       CASE
           WHEN risk_score >= 90 OR (amount_usd >= 5000 AND is_foreign_card = TRUE) THEN 'CRITICAL_RISK'
           WHEN risk_score >= 75 OR amount_usd >= 1000 THEN 'SUSPICIOUS'
           ELSE 'STANDARD_REVIEW'
       END AS fraud_decision
FROM Transactions
WHERE is_foreign_card = TRUE OR risk_score >= 75
ORDER BY amount_usd DESC, risk_score DESC
LIMIT 50;
```

### Case 002: Neobank Prime Credit Limit Allocation
- **Business Context**: Invitation-only card underwriting with monthly limits ($15 per FICO point).
- **Table**: `Customers (customer_id, full_name, credit_score, country, tenure_months)`
```sql
SELECT DISTINCT full_name, credit_score, (credit_score * 15) AS monthly_credit_limit, tenure_months
FROM Customers
WHERE country = 'USA' AND credit_score >= 720 AND tenure_months >= 12
ORDER BY tenure_months DESC, credit_score DESC
LIMIT 10;
```

### Case 003: Anti-Money Laundering (AML) Structuring Tripwire
- **Business Context**: Detecting smurfing cash deposits immediately below the $10k federal CTR limit.
- **Table**: `DepositLedger (deposit_id, account_id, amount_usd, deposit_channel, customer_occupation)`
```sql
SELECT deposit_id, account_id, amount_usd, deposit_channel,
       CASE
           WHEN amount_usd BETWEEN 8500.00 AND 9999.99 THEN 'SUSPICIOUS_STRUCTURING_FLAG'
           WHEN amount_usd >= 10000.00 THEN 'MANDATORY_CTR_FILING'
           ELSE 'STANDARD_ACTIVITY'
       END AS aml_compliance_tier
FROM DepositLedger
WHERE deposit_channel = 'CASH_TELLER' AND amount_usd >= 8500.00
ORDER BY amount_usd DESC;
```

### Case 004: International SWIFT Transfer Surcharge Calculation
- **Business Context**: Tiered foreign exchange wire fees based on destination country and transfer volume.
- **Table**: `WireTransfers (wire_id, dest_country, amount_usd, is_sanctioned_region)`
```sql
SELECT wire_id, dest_country, amount_usd,
       CASE
           WHEN is_sanctioned_region = TRUE THEN 'BLOCKED_SANCTION_REVIEW'
           WHEN amount_usd > 50000 THEN 'PREMIUM_WIRE ($15 Flat)'
           WHEN dest_country IN ('GBR', 'DEU', 'FRA', 'JPN') THEN 'STANDARD_WIRE ($25 Flat)'
           ELSE 'HIGH_RISK_CORRIDOR ($45 + 0.5%)'
       END AS wire_fee_tier
FROM WireTransfers
ORDER BY amount_usd DESC;
```

### Case 005: Overdraft Fee Waiver Eligibility
- **Business Context**: Retail banking grace periods for accounts dipping negative.
- **Table**: `AccountBalances (account_id, current_balance, average_daily_balance, tenure_years)`
```sql
SELECT account_id, current_balance,
       CASE
           WHEN current_balance >= 0 THEN 'NO_OVERDRAFT'
           WHEN current_balance >= -20.00 THEN 'COURTESY_BUFFER_WAIVED'
           WHEN average_daily_balance >= 5000 AND tenure_years >= 3 THEN 'VIP_RELATIONSHIP_WAIVED'
           ELSE 'ASSESS_FEE_$35'
       END AS overdraft_disposition
FROM AccountBalances
WHERE current_balance < 0;
```

### Case 006: High-Frequency Trading (HFT) Slippage Penalty Flags
- **Business Context**: Broker execution audits comparing intended limit price against fill price.
- **Table**: `TradeExecutions (trade_id, ticker, limit_price, fill_price, volume)`
```sql
SELECT trade_id, ticker, volume, (fill_price - limit_price) AS slippage_per_share,
       CASE
           WHEN (fill_price - limit_price) > 0.05 THEN 'EXCESSIVE_SLIPPAGE_PENALTY'
           WHEN (fill_price - limit_price) > 0.01 THEN 'ACCEPTABLE_VARIANCE'
           ELSE 'OPTIMAL_FILL'
       END AS execution_quality
FROM TradeExecutions
WHERE volume >= 1000
ORDER BY slippage_per_share DESC;
```

### Case 007: Merchant Chargeback Ratio Warning Tiers
- **Business Context**: Payment network rules (Visa/Mastercard) for merchant dispute rates.
- **Table**: `Merchants (merchant_id, monthly_volume, dispute_count, dispute_rate_pct)`
```sql
SELECT merchant_id, dispute_rate_pct,
       CASE
           WHEN dispute_rate_pct >= 1.5 THEN 'TERMINATION_WARNING'
           WHEN dispute_rate_pct >= 0.9 THEN 'HIGH_RISK_MONITORING'
           WHEN dispute_rate_pct >= 0.5 THEN 'ELEVATED_WATCH'
           ELSE 'COMPLIANT'
       END AS card_network_status
FROM Merchants
WHERE dispute_count >= 10
ORDER BY dispute_rate_pct DESC;
```

### Case 008: Consumer Loan Default Risk Grading (Grades A to E)
- **Business Context**: Peer-to-peer lending risk classification based on debt-to-income (DTI).
- **Table**: `LoanApplicants (applicant_id, fico_score, dti_ratio, annual_income)`
```sql
SELECT applicant_id, fico_score, dti_ratio,
       CASE
           WHEN fico_score >= 760 AND dti_ratio < 0.20 THEN 'GRADE_A (Prime Low)'
           WHEN fico_score >= 700 AND dti_ratio < 0.35 THEN 'GRADE_B (Prime)'
           WHEN fico_score >= 640 AND dti_ratio < 0.45 THEN 'GRADE_C (Near Prime)'
           ELSE 'GRADE_D_REJECT'
       END AS loan_risk_grade
FROM LoanApplicants
ORDER BY fico_score DESC, dti_ratio ASC;
```

### Case 009: ATM Cash Depletion Urgency Classifier
- **Business Context**: Cash logistics armored car dispatch scheduling based on remaining cassette capacity.
- **Table**: `AtmTerminals (terminal_id, location_type, cash_remaining_usd, max_capacity_usd)`
```sql
SELECT terminal_id, location_type, (cash_remaining_usd * 100.0 / max_capacity_usd) AS fill_pct,
       CASE
           WHEN (cash_remaining_usd * 1.0 / max_capacity_usd) < 0.15 THEN 'CRITICAL_DISPATCH_NOW'
           WHEN (cash_remaining_usd * 1.0 / max_capacity_usd) < 0.30 THEN 'SCHEDULE_NEXT_DAY'
           ELSE 'OPTIMAL_LEVEL'
       END AS armored_car_priority
FROM AtmTerminals
ORDER BY fill_pct ASC;
```

### Case 010: Crypto Wallet Sanctions Screening
- **Business Context**: OFAC sanctions list screening for incoming blockchain wallet deposits.
- **Table**: `CryptoDeposits (tx_hash, wallet_address, token_symbol, usd_value, is_mixer_associated)`
```sql
SELECT tx_hash, wallet_address, token_symbol, usd_value,
       CASE
           WHEN is_mixer_associated = TRUE THEN 'FREEZE_SANCTION_VIOLATION'
           WHEN usd_value >= 100000 THEN 'KYC_SOURCE_OF_FUNDS_REQUIRED'
           ELSE 'AUTO_CREDIT'
       END AS compliance_action
FROM CryptoDeposits
ORDER BY usd_value DESC;
```

---

## Domain 02: SaaS & Cloud Subscriptions (Cases 11 – 20)

### Case 011: B2B Account Churn Risk & Contraction Classifier
- **Table**: `SubscriptionAccounts (account_id, company_name, plan_tier, licensed_seats, active_seats, days_since_last_login)`
```sql
SELECT company_name, plan_tier, licensed_seats, active_seats,
       ROUND((active_seats * 100.0 / licensed_seats), 1) AS seat_utilization_pct,
       CASE
           WHEN days_since_last_login > 30 OR (active_seats * 1.0 / licensed_seats) < 0.25 THEN 'IMMINENT_CHURN'
           WHEN days_since_last_login > 14 OR (active_seats * 1.0 / licensed_seats) < 0.50 THEN 'NEEDS_OUTREACH'
           ELSE 'HEALTHY'
       END AS account_health_status
FROM SubscriptionAccounts
WHERE plan_tier IN ('Enterprise', 'Growth')
ORDER BY seat_utilization_pct ASC, days_since_last_login DESC;
```

### Case 012: Freemium Cloud Compute Gatekeeper & Upgrade Tiers
- **Table**: `DeveloperTenants (tenant_id, org_name, monthly_vcpuhours, storage_gb, is_billing_verified)`
```sql
SELECT org_name, monthly_vcpuhours, storage_gb,
       CASE
           WHEN monthly_vcpuhours >= 250 OR storage_gb >= 100 THEN 'HOT_SALES_LEAD'
           WHEN monthly_vcpuhours >= 100 OR storage_gb >= 50 THEN 'WARM_UPGRADE_CANDIDATE'
           ELSE 'STANDARD_FREE'
       END AS sales_motion_tier
FROM DeveloperTenants
WHERE is_billing_verified = FALSE AND (monthly_vcpuhours >= 100 OR storage_gb >= 50)
ORDER BY monthly_vcpuhours DESC;
```

### Case 013: Enterprise Annual Contract Renewal Discount Matrix
- **Business Context**: Multi-year renewal incentive calculation for large ARR contracts.
- **Table**: `Contracts (contract_id, client_name, annual_revenue, contract_years)`
```sql
SELECT client_name, annual_revenue, contract_years,
       CASE
           WHEN contract_years >= 3 AND annual_revenue >= 100000 THEN 'DISCOUNT_25_PCT'
           WHEN contract_years >= 2 AND annual_revenue >= 50000 THEN 'DISCOUNT_15_PCT'
           WHEN contract_years >= 2 THEN 'DISCOUNT_10_PCT'
           ELSE 'STANDARD_LIST_PRICE'
       END AS eligible_discount
FROM Contracts
ORDER BY annual_revenue DESC;
```

### Case 014: Customer Support SLA Escalation Urgency
- **Business Context**: Ticket routing to Tier 3 engineering based on severity and elapsed wait time.
- **Table**: `SupportTickets (ticket_id, priority, wait_time_minutes, is_enterprise)`
```sql
SELECT ticket_id, priority, wait_time_minutes,
       CASE
           WHEN is_enterprise = TRUE AND wait_time_minutes > 15 THEN 'PAGE_ONCALL_ENG'
           WHEN priority = 'P1' AND wait_time_minutes > 30 THEN 'PAGE_ONCALL_ENG'
           WHEN priority = 'P2' AND wait_time_minutes > 60 THEN 'ESCALATE_SUPERVISOR'
           ELSE 'NORMAL_QUEUE'
       END AS dispatch_status
FROM SupportTickets
WHERE wait_time_minutes > 15
ORDER BY wait_time_minutes DESC;
```

### Case 015: API Token Rate Limit & Overage Billing
- **Business Context**: Throttling requests when developer exceeds monthly quota.
- **Table**: `ApiUsage (token_id, monthly_quota, consumed_calls)`
```sql
SELECT token_id, monthly_quota, consumed_calls,
       CASE
           WHEN consumed_calls > (monthly_quota * 1.5) THEN 'THROTTLED_BLOCKED'
           WHEN consumed_calls > monthly_quota THEN 'OVERAGE_BILLED ($0.002/call)'
           WHEN consumed_calls > (monthly_quota * 0.8) THEN 'WARN_80_PCT_REACHED'
           ELSE 'NORMAL'
       END AS api_status
FROM ApiUsage
ORDER BY consumed_calls DESC;
```

### Case 016: Stale Single Sign-On (SSO) Admin Audit
- **Business Context**: Security compliance requiring removal of inactive administrative accounts.
- **Table**: `UserDirectory (user_id, email, role, days_inactive)`
```sql
SELECT email, role, days_inactive,
       CASE
           WHEN role = 'SuperAdmin' AND days_inactive > 60 THEN 'REVOKE_IMMEDIATELY'
           WHEN role = 'Admin' AND days_inactive > 90 THEN 'REVOKE_IMMEDIATELY'
           WHEN days_inactive > 180 THEN 'ARCHIVE_USER'
           ELSE 'ACTIVE'
       END AS access_disposition
FROM UserDirectory
WHERE days_inactive > 30
ORDER BY days_inactive DESC;
```

### Case 017: SaaS Feature Gatekeeper & Tier Entitlement
- **Business Context**: Checking whether a customer's plan allows advanced audit logs or SSO.
- **Table**: `TenantPlans (tenant_id, plan_name, feature_requested)`
```sql
SELECT tenant_id, plan_name, feature_requested,
       CASE
           WHEN feature_requested = 'SAML_SSO' AND plan_name = 'Enterprise' THEN 'GRANTED'
           WHEN feature_requested = 'AUDIT_LOGS' AND plan_name IN ('Enterprise', 'Business') THEN 'GRANTED'
           WHEN feature_requested = 'CORE_ANALYTICS' THEN 'GRANTED'
           ELSE 'UPGRADE_REQUIRED'
       END AS access_permission
FROM TenantPlans;
```

### Case 018: Customer Success Net Promoter Score (NPS) Sentiment
- **Business Context**: Segmenting customer feedback into Promoters, Passives, and Detractors.
- **Table**: `NpsResponses (response_id, score, comment)`
```sql
SELECT response_id, score,
       CASE
           WHEN score BETWEEN 9 AND 10 THEN 'PROMOTER'
           WHEN score BETWEEN 7 AND 8 THEN 'PASSIVE'
           WHEN score BETWEEN 0 AND 6 THEN 'DETRACTOR'
           ELSE 'INVALID_SCORE'
       END AS nps_category
FROM NpsResponses
ORDER BY score ASC;
```

### Case 019: Multi-Tenant Database Storage Allocation Overage
- **Business Context**: Identifying multi-tenant databases consuming more than their provisioned gigabytes.
- **Table**: `DatabaseTenants (tenant_id, tier, storage_used_gb, storage_limit_gb)`
```sql
SELECT tenant_id, tier, storage_used_gb, storage_limit_gb,
       CASE
           WHEN storage_used_gb > storage_limit_gb THEN 'OVER_CAPACITY_BILL_OVERAGE'
           WHEN (storage_used_gb * 1.0 / storage_limit_gb) > 0.9 THEN 'CAPACITY_WARNING_90_PCT'
           ELSE 'HEALTHY'
       END AS storage_health
FROM DatabaseTenants
ORDER BY (storage_used_gb - storage_limit_gb) DESC;
```

### Case 020: Free Trial Expiration & Credit Card Grace Period
- **Business Context**: Automating trial-to-paid conversion countdown and grace periods.
- **Table**: `TrialUsers (user_id, days_since_signup, has_payment_method)`
```sql
SELECT user_id, days_since_signup, has_payment_method,
       CASE
           WHEN days_since_signup > 14 AND has_payment_method = TRUE THEN 'CONVERT_TO_PAID'
           WHEN days_since_signup > 14 AND has_payment_method = FALSE THEN 'EXPIRED_LOCKED'
           WHEN days_since_signup BETWEEN 12 AND 14 THEN 'SEND_EXPIRY_WARNING'
           ELSE 'TRIAL_ACTIVE'
       END AS lifecycle_state
FROM TrialUsers
ORDER BY days_since_signup DESC;
```

---

## Domain 03: E-Commerce & Retail (Cases 21 – 30)

### Case 021: VIP Customer Loyalty Tiering & Point Multipliers
- **Table**: `LoyaltyMembers (member_id, full_name, annual_spend, return_rate_pct, preferred_category)`
```sql
SELECT full_name, annual_spend, return_rate_pct,
       CASE
           WHEN annual_spend >= 10000 THEN 'PLATINUM (3x Points)'
           WHEN annual_spend >= 5000 THEN 'GOLD (2x Points)'
           WHEN annual_spend >= 1500 THEN 'SILVER (1.5x Points)'
           ELSE 'BRONZE (1x Points)'
       END AS loyalty_tier
FROM LoyaltyMembers
WHERE return_rate_pct < 20.0
ORDER BY annual_spend DESC
LIMIT 25;
```

### Case 022: Express vs Standard Fulfillment SLA Routing
- **Table**: `Orders (order_id, order_total, is_prime_member, destination_zip, order_status)`
```sql
SELECT order_id, order_total, is_prime_member, destination_zip,
       CASE
           WHEN is_prime_member = TRUE OR order_total >= 150.00 THEN 'AIR_DISPATCH_NEXT_DAY'
           ELSE 'GROUND_CARRIER_STANDARD'
       END AS fulfillment_routing
FROM Orders
WHERE order_status = 'PENDING_FULFILLMENT'
ORDER BY order_total DESC;
```

### Case 023: Abandoned Cart Recovery Incentive Tiers
- **Business Context**: Sending targeted discount coupons based on cart value and abandonment age.
- **Table**: `AbandonedCarts (cart_id, user_email, cart_value, hours_abandoned)`
```sql
SELECT user_email, cart_value, hours_abandoned,
       CASE
           WHEN hours_abandoned > 48 THEN 'SUPPRESS_EXPIRED'
           WHEN cart_value >= 250 THEN 'OFFER_15_PCT_COUPON'
           WHEN cart_value >= 100 THEN 'OFFER_FREE_SHIPPING'
           ELSE 'STANDARD_REMINDER_EMAIL'
       END AS email_strategy
FROM AbandonedCarts
WHERE hours_abandoned BETWEEN 1 AND 48
ORDER BY cart_value DESC;
```

### Case 024: Return Abuse & Wardrobing Detector
- **Business Context**: Identifying serial returners who purchase luxury apparel, wear once, and return.
- **Table**: `CustomerReturns (customer_id, return_frequency_pct, total_refund_usd)`
```sql
SELECT customer_id, return_frequency_pct, total_refund_usd,
       CASE
           WHEN return_frequency_pct > 75.0 AND total_refund_usd > 2000 THEN 'FLAG_WARDROBING_SUSPEND'
           WHEN return_frequency_pct > 50.0 THEN 'REQUIRE_MANAGER_INSPECTION'
           ELSE 'STANDARD_RETURN_POLICY'
       END AS fraud_risk_policy
FROM CustomerReturns
ORDER BY return_frequency_pct DESC;
```

### Case 025: Flash Sale Inventory Safety Buffer
- **Business Context**: Withholding warehouse safety stock during high-concurrency flash sales.
- **Table**: `Inventory (sku, available_units, reserved_units)`
```sql
SELECT sku, (available_units - reserved_units) AS net_sellable,
       CASE
           WHEN (available_units - reserved_units) <= 0 THEN 'OUT_OF_STOCK'
           WHEN (available_units - reserved_units) <= 10 THEN 'LOW_STOCK_URGENCY_BANNER'
           ELSE 'IN_STOCK'
       END AS inventory_display_badge
FROM Inventory;
```

### Case 026: Dynamic Price Gouging Regulatory Compliance
- **Business Context**: Ensuring automated dynamic pricing algorithms do not exceed legal price caps during emergencies.
- **Table**: `ProductPrices (sku, category, base_price, dynamic_price, is_essential_good)`
```sql
SELECT sku, base_price, dynamic_price,
       ROUND(((dynamic_price - base_price) * 100.0 / base_price), 1) AS surge_markup_pct,
       CASE
           WHEN is_essential_good = TRUE AND (dynamic_price * 1.0 / base_price) > 1.20 THEN 'PRICE_GOUGING_VIOLATION'
           WHEN (dynamic_price * 1.0 / base_price) > 1.50 THEN 'FLAG_PRICING_ANOMALY'
           ELSE 'APPROVED_PRICE'
       END AS compliance_check
FROM ProductPrices
ORDER BY surge_markup_pct DESC;
```

### Case 027: Third-Party Marketplace Merchant Health Scorecard
- **Business Context**: Enforcing fulfillment defect rates on third-party marketplace sellers.
- **Table**: `Sellers (seller_id, late_shipment_rate_pct, order_defect_rate_pct)`
```sql
SELECT seller_id, late_shipment_rate_pct, order_defect_rate_pct,
       CASE
           WHEN order_defect_rate_pct > 2.0 THEN 'IMMEDIATE_STORE_SUSPENSION'
           WHEN late_shipment_rate_pct > 4.0 THEN 'PROBATION_WARNING'
           ELSE 'GOOD_STANDING'
       END AS marketplace_status
FROM Sellers
ORDER BY order_defect_rate_pct DESC;
```

### Case 028: Cross-Border Customs Tariff De Minimis Exemption
- **Business Context**: Applying duty exemptions for packages under the $800 de minimis customs boundary.
- **Table**: `CustomsManifest (package_id, declared_value_usd, origin_country)`
```sql
SELECT package_id, declared_value_usd, origin_country,
       CASE
           WHEN declared_value_usd <= 800.00 THEN 'DUTY_FREE_DE_MINIMIS'
           WHEN origin_country = 'CHN' THEN 'FORMAL_ENTRY_TARIFF_25_PCT'
           ELSE 'STANDARD_CUSTOMS_DUTY'
       END AS customs_clearance_type
FROM CustomsManifest
ORDER BY declared_value_usd DESC;
```

### Case 029: Buy-One-Get-One (BOGO) Bundle Discount Eligibility
- **Business Context**: Checking category eligibility for promotional store discounts.
- **Table**: `CartItems (cart_id, item_count, category_code, total_price)`
```sql
SELECT cart_id, category_code, item_count,
       CASE
           WHEN category_code IN ('FOOTWEAR', 'APPAREL') AND item_count >= 2 THEN 'BOGO_50_PCT_APPLIED'
           WHEN category_code = 'ACCESSORIES' AND total_price >= 50 THEN 'FREE_GIFT_QUALIFIED'
           ELSE 'STANDARD_PRICE'
       END AS promotional_discount
FROM CartItems;
```

### Case 030: Out-of-Stock Pre-Order Lead Time Estimator
- **Business Context**: Informing consumers of manufacturing restock delays on backordered goods.
- **Table**: `Backorders (order_id, sku, supplier_days_lead_time)`
```sql
SELECT order_id, sku, supplier_days_lead_time,
       CASE
           WHEN supplier_days_lead_time <= 7 THEN 'SHIPS_NEXT_WEEK'
           WHEN supplier_days_lead_time <= 21 THEN 'SHIPS_IN_2_3_WEEKS'
           ELSE 'EXTENDED_BACKORDER_MONTH+'
       END AS estimated_delivery_window
FROM Backorders
ORDER BY supplier_days_lead_time ASC;
```

---

## Domain 04: Healthcare & Clinical Systems (Cases 31 – 40)

### Case 031: Emergency Room Triage Acuity Matrix (ESI Tiers)
- **Table**: `PatientIntake (intake_id, patient_name, pulse_bpm, o2_saturation, is_unresponsive)`
```sql
SELECT patient_name, pulse_bpm, o2_saturation,
       CASE
           WHEN is_unresponsive = TRUE OR o2_saturation < 85 THEN 'ESI-1: RESUSCITATION (IMMEDIATE)'
           WHEN o2_saturation < 92 OR pulse_bpm > 130 OR pulse_bpm < 45 THEN 'ESI-2: EMERGENT (10 MIN MAX)'
           WHEN pulse_bpm BETWEEN 100 AND 130 THEN 'ESI-3: URGENT'
           ELSE 'ESI-4: NON-URGENT'
       END AS triage_level
FROM PatientIntake
ORDER BY o2_saturation ASC, pulse_bpm DESC;
```

### Case 032: Pediatric Dosage Safety Boundary Validator
- **Table**: `Prescriptions (rx_id, patient_weight_kg, prescribed_mg_day, drug_name)`
```sql
SELECT rx_id, drug_name, patient_weight_kg, prescribed_mg_day,
       CASE
           WHEN prescribed_mg_day BETWEEN (patient_weight_kg * 40) AND (patient_weight_kg * 90) THEN 'DOSAGE_SAFE'
           WHEN prescribed_mg_day > (patient_weight_kg * 90) THEN 'OVERDOSE_WARNING'
           ELSE 'UNDERDOSE_INEFFECTIVE'
       END AS clinical_safety_status
FROM Prescriptions
WHERE drug_name = 'Amoxicillin';
```

### Case 033: ICU Bed Occupancy & Step-Down Transfer Readiness
- **Business Context**: Evaluating ICU patients ready to transfer to general medical floors.
- **Table**: `IcuPatients (patient_id, hours_stable, requires_ventilator, vasopressor_support)`
```sql
SELECT patient_id, hours_stable,
       CASE
           WHEN requires_ventilator = TRUE OR vasopressor_support = TRUE THEN 'CRITICAL_ICU_LOCKED'
           WHEN hours_stable >= 48 THEN 'READY_FOR_STEP_DOWN'
           WHEN hours_stable >= 24 THEN 'OBSERVATION_PREPARE_TRANSFER'
           ELSE 'CONTINUE_ICU_MONITORING'
       END AS bed_assignment_recommendation
FROM IcuPatients
ORDER BY hours_stable DESC;
```

### Case 034: Controlled Substance Refill Frequency Audit
- **Business Context**: Flagging early prescription refill attempts for Schedule II opioids.
- **Table**: `OpioidRefillLog (rx_id, patient_id, days_since_prior_dispense, days_supply)`
```sql
SELECT rx_id, patient_id, (days_supply - days_since_prior_dispense) AS days_early,
       CASE
           WHEN (days_supply - days_since_prior_dispense) > 5 THEN 'REFILL_DENIED_TOO_EARLY'
           WHEN (days_supply - days_since_prior_dispense) BETWEEN 1 AND 5 THEN 'PHARMACIST_OVERRIDE_REQUIRED'
           ELSE 'AUTHORIZED_REFILL'
       END AS dispense_decision
FROM OpioidRefillLog
ORDER BY days_early DESC;
```

### Case 035: Health Insurance Pre-Authorization Auto-Approval
- **Business Context**: Auto-clearing routine diagnostic procedures vs flagging for medical review.
- **Table**: `InsuranceClaims (claim_id, cpt_code, estimated_cost, prior_authorization_on_file)`
```sql
SELECT claim_id, cpt_code, estimated_cost,
       CASE
           WHEN prior_authorization_on_file = TRUE THEN 'AUTO_APPROVED'
           WHEN estimated_cost <= 250.00 THEN 'LOW_COST_AUTO_CLEAR'
           ELSE 'MANUAL_PHYSICIAN_REVIEW_REQUIRED'
       END AS claim_status
FROM InsuranceClaims
ORDER BY estimated_cost DESC;
```

### Case 036: Sepsis Early Warning Score (qSOFA) Clinical Alert
- **Business Context**: Quick Sequential Organ Failure Assessment alert for septic shock risk.
- **Table**: `VitalsMonitoring (patient_id, resp_rate, gcs_score, systolic_bp)`
```sql
SELECT patient_id, resp_rate, systolic_bp,
       CASE
           WHEN (resp_rate >= 22 AND systolic_bp <= 100) OR gcs_score < 15 THEN 'HIGH_SEPSIS_RISK_PAGE_RAPID_RESPONSE'
           ELSE 'LOW_RISK_MONITOR'
       END AS clinical_alert
FROM VitalsMonitoring;
```

### Case 037: Organ Transplant Blood Type Compatibility
- **Business Context**: Screening donor and recipient ABO blood compatibility.
- **Table**: `TransplantWaitlist (recipient_id, recipient_blood_type, donor_blood_type)`
```sql
SELECT recipient_id, recipient_blood_type, donor_blood_type,
       CASE
           WHEN donor_blood_type = 'O' THEN 'UNIVERSAL_DONOR_COMPATIBLE'
           WHEN recipient_blood_type = donor_blood_type THEN 'EXACT_MATCH_COMPATIBLE'
           WHEN recipient_blood_type = 'AB' THEN 'UNIVERSAL_RECIPIENT_COMPATIBLE'
           ELSE 'INCOMPATIBLE_REJECT'
       END AS crossmatch_result
FROM TransplantWaitlist;
```

### Case 038: Oncology Clinical Trial Inclusion/Exclusion Gate
- **Business Context**: Patient cohort screening for experimental immunotherapy.
- **Table**: `ClinicalTrialScreening (subject_id, age, egfr_mutation, prior_chemo_months)`
```sql
SELECT subject_id, age,
       CASE
           WHEN age BETWEEN 18 AND 75 AND egfr_mutation = TRUE AND prior_chemo_months >= 6 THEN 'TRIAL_ELIGIBLE'
           WHEN age < 18 THEN 'EXCLUDED_PEDIATRIC'
           ELSE 'EXCLUDED_CRITERIA_MISMATCH'
       END AS screening_verdict
FROM ClinicalTrialScreening;
```

### Case 039: Vaccine Cold-Chain Temperature Excursion Detector
- **Business Context**: Detecting temperature violations in mRNA vaccine storage (-80C to -60C).
- **Table**: `FreezerSensors (sensor_id, temp_celsius, duration_minutes_above_threshold)`
```sql
SELECT sensor_id, temp_celsius, duration_minutes_above_threshold,
       CASE
           WHEN temp_celsius > -60.0 AND duration_minutes_above_threshold > 120 THEN 'BATCH_COMPROMISED_DESTROY'
           WHEN temp_celsius > -60.0 THEN 'EXCURSION_QUARANTINE_INSPECT'
           ELSE 'COLD_CHAIN_NORMAL'
       END AS vaccine_batch_integrity
FROM FreezerSensors
ORDER BY temp_celsius DESC;
```

### Case 040: Outpatient Appointment No-Show Propensity Buffer
- **Business Context**: Identifying clinics that should double-book slots based on historical no-shows.
- **Table**: `PatientAppointments (appointment_id, prior_noshow_count, distance_miles)`
```sql
SELECT appointment_id, prior_noshow_count,
       CASE
           WHEN prior_noshow_count >= 3 THEN 'HIGH_NOSHOW_RISK_DOUBLE_BOOK'
           WHEN prior_noshow_count >= 1 THEN 'CONFIRMATION_CALL_MANDATORY'
           ELSE 'STANDARD_SLOT'
       END AS booking_strategy
FROM PatientAppointments;
```

---

## Domain 05: Logistics & Fleet Operations (Cases 41 – 50)

### Case 041: Autonomous Drone Battery & Cargo Gate
- **Table**: `DroneFleet (drone_id, battery_pct, payload_kg, mission_distance_km, motor_health_score)`
```sql
SELECT drone_id, battery_pct, payload_kg, mission_distance_km,
       CASE
           WHEN payload_kg > 4.5 OR motor_health_score < 80 THEN 'GROUNDED_MAINTENANCE'
           WHEN mission_distance_km > 5.0 AND battery_pct < 40 THEN 'GROUNDED_LOW_BATTERY'
           WHEN mission_distance_km <= 5.0 AND battery_pct < 25 THEN 'GROUNDED_LOW_BATTERY'
           ELSE 'CLEARED_FOR_TAKEOFF'
       END AS flight_clearance
FROM DroneFleet
ORDER BY flight_clearance ASC, battery_pct ASC;
```

### Case 042: Carrier Late Delivery Penalty Escalation
- **Table**: `ShipmentTracking (tracking_id, carrier_name, sla_minutes, actual_delivery_minutes, freight_cost)`
```sql
SELECT tracking_id, carrier_name, (actual_delivery_minutes - sla_minutes) AS delay_minutes,
       CASE
           WHEN actual_delivery_minutes <= sla_minutes THEN 'ON_TIME (0% Penalty)'
           WHEN (actual_delivery_minutes - sla_minutes) <= 60 THEN 'MINOR_DELAY (5% Penalty)'
           WHEN (actual_delivery_minutes - sla_minutes) <= 180 THEN 'MODERATE_DELAY (15% Penalty)'
           ELSE 'SEVERE_BREACH (30% Penalty)'
       END AS penalty_assessment
FROM ShipmentTracking
WHERE actual_delivery_minutes > sla_minutes
ORDER BY delay_minutes DESC;
```

### Case 043: Perishable Produce Shelf-Life Freight Expiry
- **Business Context**: Expediting grocery reefer trucks before strawberry spoilage.
- **Table**: `ReeferCargo (pallet_id, produce_type, hours_to_spoilage, transit_remaining_hours)`
```sql
SELECT pallet_id, produce_type, (hours_to_spoilage - transit_remaining_hours) AS buffer_hours,
       CASE
           WHEN (hours_to_spoilage - transit_remaining_hours) < 0 THEN 'CARGO_SPOILED_REJECT'
           WHEN (hours_to_spoilage - transit_remaining_hours) < 24 THEN 'REROUTE_TO_LOCAL_STORE'
           ELSE 'ON_SCHEDULE'
       END AS produce_disposition
FROM ReeferCargo
ORDER BY buffer_hours ASC;
```

### Case 044: Ocean Shipping Container Demurrage Accrual
- **Business Context**: Port authority charges for containers exceeding free storage days.
- **Table**: `ContainerDwell (container_no, port_code, dwell_days, free_days_allowed)`
```sql
SELECT container_no, dwell_days, (dwell_days - free_days_allowed) AS billable_overstay_days,
       CASE
           WHEN dwell_days <= free_days_allowed THEN 'NO_DEMURRAGE_FREE'
           WHEN (dwell_days - free_days_allowed) <= 5 THEN 'TIER_1 ($150/day)'
           ELSE 'TIER_2_PUNITIVE ($350/day)'
       END AS demurrage_tier
FROM ContainerDwell
WHERE dwell_days > free_days_allowed
ORDER BY dwell_days DESC;
```

### Case 045: Delivery Driver Route Dwell-Time Anomaly
- **Business Context**: Spotting delivery vans parked at an individual residential stop for too long.
- **Table**: `DriverStops (driver_id, stop_id, planned_dwell_mins, actual_dwell_mins)`
```sql
SELECT driver_id, stop_id, (actual_dwell_mins - planned_dwell_mins) AS excess_dwell,
       CASE
           WHEN (actual_dwell_mins - planned_dwell_mins) > 20 THEN 'INVESTIGATE_SAFETY_BREAKDOWN'
           WHEN (actual_dwell_mins - planned_dwell_mins) > 8 THEN 'ELEVATED_DWELL_DELIVERY_ISSUE'
           ELSE 'NORMAL_PACE'
       END AS stop_audit
FROM DriverStops
ORDER BY excess_dwell DESC;
```

### Case 046: Cross-Docking Terminal Bay Allocation
- **Business Context**: Routing inbound tractor-trailers to sorting bays based on cargo type.
- **Table**: `InboundTrailers (trailer_id, is_hazardous, is_temperature_controlled, pallet_count)`
```sql
SELECT trailer_id,
       CASE
           WHEN is_hazardous = TRUE THEN 'BAY_ZONE_H (ISOLATED)'
           WHEN is_temperature_controlled = TRUE THEN 'BAY_ZONE_COLD (REEFER DOCK)'
           WHEN pallet_count > 30 THEN 'HIGH_CAPACITY_CONVEYOR_DOCK'
           ELSE 'STANDARD_BAY'
       END AS dock_assignment
FROM InboundTrailers;
```

### Case 047: Hazardous Materials (Hazmat) Tunnel Route Prohibition
- **Business Context**: Rerouting explosive or flammable chemical trucks around bridge tunnels.
- **Table**: `HazmatRoutes (truck_id, hazmat_class_code, intended_route_id)`
```sql
SELECT truck_id, hazmat_class_code,
       CASE
           WHEN hazmat_class_code IN ('CLASS_1_EXPLOSIVE', 'CLASS_2_GAS') THEN 'RESTRICTED_BYPASS_SURROUND'
           WHEN hazmat_class_code = 'CLASS_3_FLAMMABLE' THEN 'PERMIT_ESCORT_REQUIRED'
           ELSE 'UNRESTRICTED_ROUTE'
       END AS dispatch_clearance
FROM HazmatRoutes;
```

### Case 048: Fleet Preventative Maintenance Mileage Thresholds
- **Business Context**: Scheduling semi-truck engine overhauls based on odometer reading.
- **Table**: `TruckFleet (vin, miles_since_last_service, oil_life_pct)`
```sql
SELECT vin, miles_since_last_service, oil_life_pct,
       CASE
           WHEN miles_since_last_service >= 25000 OR oil_life_pct < 10 THEN 'IMMEDIATE_SHOP_OVERHAUL'
           WHEN miles_since_last_service >= 15000 OR oil_life_pct < 25 THEN 'SCHEDULE_NEXT_DEPOT_STOP'
           ELSE 'HEALTHY_RUNNING'
       END AS maintenance_trigger
FROM TruckFleet
ORDER BY miles_since_last_service DESC;
```

### Case 049: Air Cargo Volumetric Weight vs Actual Weight Billing
- **Business Context**: Dimensional weight billing pivot for lightweight, bulky parcel shipping.
- **Table**: `AirShipments (airway_bill_id, actual_weight_kg, vol_weight_kg)`
```sql
SELECT airway_bill_id, actual_weight_kg, vol_weight_kg,
       CASE
           WHEN vol_weight_kg > actual_weight_kg THEN vol_weight_kg
           ELSE actual_weight_kg
       END AS billable_weight_kg,
       CASE
           WHEN vol_weight_kg > actual_weight_kg THEN 'BILLED_ON_DIM_WEIGHT'
           ELSE 'BILLED_ON_ACTUAL_WEIGHT'
       END AS billing_basis
FROM AirShipments
ORDER BY billable_weight_kg DESC;
```

### Case 050: Port Congestion Vessel Anchor Surcharge
- **Business Context**: Levying container ship waiting surcharges when port queues exceed 72 hours.
- **Table**: `VesselQueue (vessel_name, imo_number, wait_hours_at_anchor)`
```sql
SELECT vessel_name, wait_hours_at_anchor,
       CASE
           WHEN wait_hours_at_anchor > 120 THEN 'SEEK_ALTERNATIVE_PORT_ALERT'
           WHEN wait_hours_at_anchor > 72 THEN 'CONGESTION_SURCHARGE_$50K'
           ELSE 'NORMAL_ANCHORAGE'
       END AS harbor_status
FROM VesselQueue
ORDER BY wait_hours_at_anchor DESC;
```

---

## Domain 06: Media, Streaming & Gaming (Cases 51 – 60)

### Case 051: Content Age-Gate Advisory
- **Table**: `MediaCatalog (title, mpaa_rating, genre, content_warning_tags)`
```sql
SELECT title, genre, mpaa_rating,
       CASE
           WHEN mpaa_rating IN ('R', 'TV-MA', 'NC-17') THEN 'RESTRICTED_LOCKED'
           WHEN mpaa_rating = 'PG-13' THEN 'PARENTAL_PIN_REQUIRED'
           ELSE 'OPEN_ACCESS'
       END AS child_profile_permission
FROM MediaCatalog
ORDER BY title ASC;
```

### Case 052: Adaptive Video Bitrate Streaming Profile
- **Business Context**: Adjusting client streaming resolution based on measured cellular network bandwidth.
- **Table**: `ClientSessions (session_id, bandwidth_kbps, screen_width_px)`
```sql
SELECT session_id, bandwidth_kbps,
       CASE
           WHEN bandwidth_kbps >= 15000 AND screen_width_px >= 3840 THEN '4K_UHD_PROFILE'
           WHEN bandwidth_kbps >= 5000 THEN '1080P_FULL_HD'
           WHEN bandwidth_kbps >= 2500 THEN '720P_HD'
           ELSE '480P_SD_CONSERVE_DATA'
       END AS stream_quality
FROM ClientSessions
ORDER BY bandwidth_kbps DESC;
```

### Case 053: Music Streaming Royalties Tiering
- **Business Context**: Calculating creator payout per stream based on listener subscriber status.
- **Table**: `SongPlays (play_id, track_id, is_premium_user, country_code)`
```sql
SELECT track_id, is_premium_user, country_code,
       CASE
           WHEN is_premium_user = TRUE AND country_code = 'USA' THEN 0.0045
           WHEN is_premium_user = TRUE THEN 0.0035
           ELSE 0.0012
       END AS calculated_royalty_payout_usd
FROM SongPlays;
```

### Case 054: Competitive Esports Anti-Cheat Aim-Bot Deviation
- **Business Context**: Flagging impossible mouse snap velocities in first-person shooter tournaments.
- **Table**: `PlayerTelemetry (match_id, player_handle, snap_latency_ms, headshot_pct)`
```sql
SELECT player_handle, snap_latency_ms, headshot_pct,
       CASE
           WHEN snap_latency_ms < 15 AND headshot_pct > 80.0 THEN 'IMMEDIATE_BAN_AIMBOT'
           WHEN snap_latency_ms < 30 AND headshot_pct > 60.0 THEN 'HUMAN_REVIEW_FLAG'
           ELSE 'NORMAL_PLAY'
       END AS anti_cheat_verdict
FROM PlayerTelemetry
ORDER BY headshot_pct DESC;
```

### Case 055: Ad-Supported Streaming Mid-Roll Commercial Breaks
- **Business Context**: Determining ad frequency based on content duration.
- **Table**: `VideoEpisodes (episode_id, duration_minutes, subscription_type)`
```sql
SELECT episode_id, duration_minutes,
       CASE
           WHEN subscription_type = 'AD_FREE_PREMIUM' THEN 0
           WHEN duration_minutes >= 60 THEN 4
           WHEN duration_minutes >= 30 THEN 2
           ELSE 1
       END AS scheduled_midroll_ad_count
FROM VideoEpisodes;
```

### Case 056: Paywalled Article Metered Access
- **Business Context**: Gating digital newspaper readers after 3 free monthly articles.
- **Table**: `ArticleViews (reader_ip, monthly_views, has_active_subscription)`
```sql
SELECT reader_ip, monthly_views,
       CASE
           WHEN has_active_subscription = TRUE THEN 'UNLIMITED_ACCESS'
           WHEN monthly_views <= 3 THEN 'FREE_METERED_ARTICLE'
           ELSE 'PAYWALL_MODAL_BLOCK'
       END AS access_gate
FROM ArticleViews
ORDER BY monthly_views DESC;
```

### Case 057: Matchmaking Skill Rating (MMR) Range Matcher
- **Business Context**: Grouping players into balanced competitive ranks.
- **Table**: `GamerRankings (gamer_tag, mmr_points)`
```sql
SELECT gamer_tag, mmr_points,
       CASE
           WHEN mmr_points >= 2800 THEN 'GRANDMASTER'
           WHEN mmr_points >= 2200 THEN 'DIAMOND'
           WHEN mmr_points >= 1600 THEN 'GOLD'
           ELSE 'BRONZE'
       END AS competitive_division
FROM GamerRankings
ORDER BY mmr_points DESC;
```

### Case 058: User-Generated Content (UGC) Moderation Priority
- **Business Context**: Routing reported forum comments to trust & safety review queues.
- **Table**: `ContentReports (comment_id, toxic_keyword_count, report_count)`
```sql
SELECT comment_id, report_count,
       CASE
           WHEN toxic_keyword_count > 0 OR report_count >= 10 THEN 'AUTO_HIDE_URGENT_QUEUE'
           WHEN report_count >= 3 THEN 'STANDARD_REVIEW_QUEUE'
           ELSE 'LOW_PRIORITY'
       END AS moderation_action
FROM ContentReports
ORDER BY report_count DESC;
```

### Case 059: Binge-Watcher Session Fatigue Rest Reminder
- **Business Context**: Showing "Are you still watching?" dialog after consecutive hours.
- **Table**: `ActiveSessions (user_id, consecutive_stream_hours)`
```sql
SELECT user_id, consecutive_stream_hours,
       CASE
           WHEN consecutive_stream_hours >= 4.0 THEN 'PROMPT_ARE_YOU_STILL_WATCHING'
           ELSE 'CONTINUE_AUTOPLAY'
       END AS player_ux_decision
FROM ActiveSessions;
```

### Case 060: In-Game Virtual Economy Gold Sinks
- **Business Context**: Imposing progressive marketplace auction fees on players holding large gold balances.
- **Table**: `PlayerWallets (character_name, gold_balance)`
```sql
SELECT character_name, gold_balance,
       CASE
           WHEN gold_balance >= 1000000 THEN 'LUXURY_AUCTION_TAX (15%)'
           WHEN gold_balance >= 100000 THEN 'STANDARD_AUCTION_TAX (8%)'
           ELSE 'BEGINNER_TAX_FREE'
       END AS marketplace_fee_tier
FROM PlayerWallets
ORDER BY gold_balance DESC;
```

---

## Domain 07: Cybersecurity & SecOps (Cases 61 – 70)

### Case 061: Brute-Force IP Lockout & Anomaly Detection
- **Table**: `AuthAuditLog (source_ip, failed_attempts, country_code, is_vpn)`
```sql
SELECT source_ip, failed_attempts, country_code,
       CASE
           WHEN source_ip LIKE '10.0.%' THEN 'INTERNAL_VPN_ALERT'
           WHEN failed_attempts >= 25 THEN 'AUTOMATIC_PERMANENT_BAN'
           WHEN failed_attempts >= 10 THEN 'TEMPORARY_RATE_LIMIT_60M'
           ELSE 'MONITOR'
       END AS firewall_action
FROM AuthAuditLog
WHERE failed_attempts >= 5
ORDER BY failed_attempts DESC;
```

### Case 062: Impossible Geolocation Travel Velocity
- **Business Context**: Flagging logins from Tokyo and New York occurring within 30 minutes.
- **Table**: `LoginEvents (user_id, prev_country, new_country, elapsed_minutes)`
```sql
SELECT user_id, prev_country, new_country, elapsed_minutes,
       CASE
           WHEN prev_country != new_country AND elapsed_minutes < 60 THEN 'SUSPICIOUS_IMPOSSIBLE_TRAVEL_LOCK'
           ELSE 'LEGITIMATE_LOGIN'
       END AS auth_risk_disposition
FROM LoginEvents;
```

### Case 063: SOC2 & HIPAA Audit Log PII Redaction
- **Business Context**: Verifying that Social Security Numbers or Credit Cards never leak into raw logs.
- **Table**: `RequestLogs (log_id, raw_payload)`
```sql
SELECT log_id,
       CASE
           WHEN raw_payload LIKE '%ssn%' OR raw_payload LIKE '%credit_card%' THEN 'CRITICAL_PII_LEAK_PURGE_LOG'
           ELSE 'COMPLIANT_SANITIZED'
       END AS log_compliance
FROM RequestLogs;
```

### Case 064: Cloud IAM Privileged Role Escalation
- **Business Context**: Auditing AWS IAM roles granted full wildcard admin (`*:*`).
- **Table**: `IamPolicies (policy_name, allowed_actions, attached_users_count)`
```sql
SELECT policy_name, attached_users_count,
       CASE
           WHEN allowed_actions = '*:*' AND attached_users_count > 5 THEN 'HIGH_RISK_ADMIN_CREEP'
           WHEN allowed_actions = '*:*' THEN 'ACCEPTABLE_RESTRICTED_ADMIN'
           ELSE 'LEAST_PRIVILEGE_ROLE'
       END AS iam_governance_score
FROM IamPolicies
ORDER BY attached_users_count DESC;
```

### Case 065: Zero-Day Vulnerability CVSS Severity Scoring
- **Business Context**: Enforcing corporate patch SLAs based on Common Vulnerability Scoring System scores.
- **Table**: `SecurityScans (cve_id, cvss_score, is_actively_exploited)`
```sql
SELECT cve_id, cvss_score, is_actively_exploited,
       CASE
           WHEN is_actively_exploited = TRUE OR cvss_score >= 9.0 THEN 'SEV-1: PATCH_IN_24_HOURS'
           WHEN cvss_score >= 7.0 THEN 'SEV-2: PATCH_IN_7_DAYS'
           WHEN cvss_score >= 4.0 THEN 'SEV-3: PATCH_IN_30_DAYS'
           ELSE 'SEV-4: STANDARD_BACKLOG'
       END AS remediation_sla
FROM SecurityScans
ORDER BY cvss_score DESC;
```

### Case 066: Phishing Email Domain Typosquatting Matcher
- **Business Context**: Intercepting malicious emails imitating internal company domains (`micros0ft.com`).
- **Table**: `InboundEmails (email_id, sender_domain, spf_pass)`
```sql
SELECT email_id, sender_domain, spf_pass,
       CASE
           WHEN spf_pass = FALSE THEN 'QUARANTINE_SPOOFED_SENDER'
           WHEN sender_domain LIKE '%paypa1%' OR sender_domain LIKE '%g00gle%' THEN 'PHISHING_TYPOSQUAT_BLOCK'
           ELSE 'INBOX_DELIVER'
       END AS email_gateway_action
FROM InboundEmails;
```

### Case 067: Endpoint Antivirus Definition Outdated Quarantine
- **Business Context**: Disconnecting laptops from corporate Wi-Fi if virus definitions are stale.
- **Table**: `Laptops (asset_tag, av_signature_days_old, os_version)`
```sql
SELECT asset_tag, av_signature_days_old,
       CASE
           WHEN av_signature_days_old > 14 THEN 'NETWORK_QUARANTINE_VLAN'
           WHEN av_signature_days_old > 7 THEN 'PROMPT_USER_UPDATE'
           ELSE 'COMPLIANT'
       END AS endpoint_health
FROM Laptops
ORDER BY av_signature_days_old DESC;
```

### Case 068: Employee Offboarding Access Revocation Audit
- **Business Context**: Verifying that terminated employees have all active tokens revoked within 2 hours.
- **Table**: `TerminatedStaff (employee_id, hours_since_termination, active_token_count)`
```sql
SELECT employee_id, hours_since_termination, active_token_count,
       CASE
           WHEN active_token_count > 0 AND hours_since_termination > 2 THEN 'CRITICAL_SECURITY_BREACH_AUDIT'
           WHEN active_token_count > 0 THEN 'PENDING_AUTOMATION'
           ELSE 'CLEAN_OFFBOARDING'
       END AS offboarding_audit_status
FROM TerminatedStaff
ORDER BY hours_since_termination DESC;
```

### Case 069: Data Loss Prevention (DLP) Bulk File Download Alert
- **Business Context**: Flagging departing employees downloading gigabytes of proprietary documents.
- **Table**: `FileDownloads (user_id, total_mb_downloaded_today, files_count)`
```sql
SELECT user_id, total_mb_downloaded_today, files_count,
       CASE
           WHEN total_mb_downloaded_today >= 5000 THEN 'SEV_1_DLP_SUSPEND_ACCOUNT'
           WHEN total_mb_downloaded_today >= 1000 THEN 'WARN_MANAGER_AUDIT'
           ELSE 'NORMAL_ACTIVITY'
       END AS dlp_risk_tier
FROM FileDownloads
ORDER BY total_mb_downloaded_today DESC;
```

### Case 070: TLS Certificate Expiration Warning Windows
- **Business Context**: Alerting devops teams before public HTTPS certificates expire.
- **Table**: `Certificates (domain_name, days_until_expiration)`
```sql
SELECT domain_name, days_until_expiration,
       CASE
           WHEN days_until_expiration <= 0 THEN 'OUTAGE_EXPIRED'
           WHEN days_until_expiration <= 14 THEN 'URGENT_AUTO_RENEW_FAILED'
           WHEN days_until_expiration <= 30 THEN 'WARNING_RENEWAL_WINDOW'
           ELSE 'HEALTHY'
       END AS cert_status
FROM Certificates
ORDER BY days_until_expiration ASC;
```

---

## Domain 08: Hardware, IoT & Warehouse Robotics (Cases 71 – 80)

### Case 071: Ultrasound Sensor Triangle Distance Geometry Verification
- **Table**: `TRIANGLES (A, B, C)`
```sql
SELECT A, B, C,
       CASE
           WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
           WHEN A = B AND B = C THEN 'Equilateral'
           WHEN A = B OR B = C OR A = C THEN 'Isosceles'
           ELSE 'Scalene'
       END AS triangle_type
FROM TRIANGLES;
```

### Case 072: Industrial Robotic Arm Vibration Bearing Wear
- **Business Context**: Detecting bearing failure in automotive factory assembly robots.
- **Table**: `RobotTelemetry (robot_id, vibration_hz, operating_temp_c)`
```sql
SELECT robot_id, vibration_hz, operating_temp_c,
       CASE
           WHEN vibration_hz >= 120 OR operating_temp_c >= 85 THEN 'EMERGENCY_SHUTDOWN_BEARING_FAIL'
           WHEN vibration_hz >= 90 THEN 'SCHEDULE_LUBRICATION'
           ELSE 'OPTIMAL'
       END AS factory_floor_alert
FROM RobotTelemetry;
```

### Case 073: Smart Electric Grid Surge Demand Pricing Tiers
- **Business Context**: Shifting residential electric vehicle charging away from peak hours.
- **Table**: `GridMeters (meter_id, current_load_kw, hour_of_day)`
```sql
SELECT meter_id, current_load_kw, hour_of_day,
       CASE
           WHEN hour_of_day BETWEEN 17 AND 21 AND current_load_kw >= 7.0 THEN 'PEAK_SURGE ($0.45/kWh)'
           WHEN hour_of_day BETWEEN 17 AND 21 THEN 'PEAK_STANDARD ($0.30/kWh)'
           WHEN hour_of_day BETWEEN 0 AND 6 THEN 'SUPER_OFF_PEAK ($0.08/kWh)'
           ELSE 'STANDARD ($0.18/kWh)'
       END AS tariff_rate
FROM GridMeters;
```

### Case 074: Autonomous Mobile Robot (AMR) Collision Evasion
- **Business Context**: Warehouse robot velocity throttle based on proximity LIDAR range.
- **Table**: `AmrObstacles (robot_id, obstacle_distance_cm, current_velocity_mps)`
```sql
SELECT robot_id, obstacle_distance_cm,
       CASE
           WHEN obstacle_distance_cm <= 20 THEN 'EMERGENCY_BRAKE_0_MPS'
           WHEN obstacle_distance_cm <= 50 THEN 'DECELERATE_0_5_MPS'
           ELSE 'NORMAL_CRUISE_1_5_MPS'
       END AS speed_command
FROM AmrObstacles;
```

### Case 075: Solar Panel Array Inverter Efficiency Degradation
- **Business Context**: Detecting dirty or cracked solar panels in utility-scale solar farms.
- **Table**: `SolarInverters (inverter_id, actual_kwh_generated, expected_kwh_sunlight)`
```sql
SELECT inverter_id, (actual_kwh_generated * 100.0 / expected_kwh_sunlight) AS efficiency_pct,
       CASE
           WHEN (actual_kwh_generated * 1.0 / expected_kwh_sunlight) < 0.60 THEN 'DEFECT_PANEL_CRACKED'
           WHEN (actual_kwh_generated * 1.0 / expected_kwh_sunlight) < 0.85 THEN 'SCHEDULE_PANEL_WASH'
           ELSE 'OPTIMAL_GENERATION'
       END AS maintenance_action
FROM SolarInverters;
```

### Case 076: EV Charging Station Supercharge vs Level 2 Billing
- **Business Context**: Billing kilowatts according to DC fast charge vs AC level 2 hardware.
- **Table**: `EvSessions (session_id, charger_type, kwh_delivered)`
```sql
SELECT session_id, charger_type, kwh_delivered,
       CASE
           WHEN charger_type = 'DC_FAST_350KW' THEN (kwh_delivered * 0.42) + 2.50
           WHEN charger_type = 'DC_FAST_150KW' THEN (kwh_delivered * 0.35) + 1.00
           ELSE (kwh_delivered * 0.22)
       END AS session_cost_usd
FROM EvSessions;
```

### Case 077: Municipal Water Treatment PH Balance Safe Zone
- **Business Context**: Alerting municipal water works if water acidity breaches safety tolerances.
- **Table**: `WaterQuality (sample_id, ph_reading, chlorine_ppm)`
```sql
SELECT sample_id, ph_reading,
       CASE
           WHEN ph_reading < 6.5 THEN 'ACIDIC_VIOLATION_ADD_LIME'
           WHEN ph_reading > 8.5 THEN 'ALKALINE_VIOLATION_ADD_ACID'
           ELSE 'SAFE_POTABLE_WATER'
       END AS ph_compliance
FROM WaterQuality;
```

### Case 078: Server Rack Thermal Hot-Aisle Overheat Throttle
- **Business Context**: Dynamic CPU frequency scaling when datacenter cooling fans fail.
- **Table**: `ServerThermal (rack_id, intake_temp_c, exhaust_temp_c)`
```sql
SELECT rack_id, exhaust_temp_c,
       CASE
           WHEN exhaust_temp_c >= 45.0 THEN 'CRITICAL_THROTTLE_CPU_50_PCT'
           WHEN exhaust_temp_c >= 38.0 THEN 'BOOST_FAN_SPEED_100_PCT'
           ELSE 'THERMAL_OPTIMAL'
       END AS cooling_instruction
FROM ServerThermal;
```

### Case 079: Commercial Aircraft Jet Turbine Exhaust Temperature
- **Business Context**: In-flight engine telemetry warning flags for pilot cockpit displays.
- **Table**: `TurbineSensors (flight_no, engine_no, exhaust_gas_temp_c)`
```sql
SELECT flight_no, engine_no, exhaust_gas_temp_c,
       CASE
           WHEN exhaust_gas_temp_c >= 950 THEN 'RED_WARNING_OVERHEAT'
           WHEN exhaust_gas_temp_c >= 875 THEN 'AMBER_CAUTION'
           ELSE 'NORMAL_GREEN'
       END AS cockpit_alert
FROM TurbineSensors;
```

### Case 080: Smart Farm Soil Moisture Automated Irrigation
- **Business Context**: Turning on agricultural drip irrigation pumps in dry zones.
- **Table**: `SoilProbes (field_zone_id, volumetric_water_content_pct)`
```sql
SELECT field_zone_id, volumetric_water_content_pct,
       CASE
           WHEN volumetric_water_content_pct < 15.0 THEN 'VALVE_OPEN_IRRIGATE'
           WHEN volumetric_water_content_pct > 35.0 THEN 'VALVE_CLOSED_SATURATED'
           ELSE 'VALVE_CLOSED_OPTIMAL'
       END AS irrigation_command
FROM SoilProbes;
```

---

## Domain 09: HR, Payroll & Governance (Cases 81 – 90)

### Case 081: Executive OKR Bonus & Equity Vesting Matrix
- **Table**: `ExecutiveReview (executive_id, executive_name, department, okr_completion_pct, tenure_years)`
```sql
SELECT executive_name, department, okr_completion_pct, tenure_years,
       CASE
           WHEN okr_completion_pct >= 115.0 THEN 'SUPERIOR (150% Bonus + 1.25x Vesting)'
           WHEN okr_completion_pct >= 100.0 THEN 'TARGET (100% Bonus + 1.0x Vesting)'
           WHEN okr_completion_pct >= 85.0 THEN 'THRESHOLD (75% Bonus + Standard Vesting)'
           ELSE 'BELOW_EXPECTATION (0% Bonus)'
       END AS bonus_vesting_bracket
FROM ExecutiveReview
WHERE tenure_years >= 2
ORDER BY okr_completion_pct DESC;
```

### Case 082: Overtime Pay Compliance (1.5x Over 40h, 2.0x Over 60h)
- **Business Context**: Fair Labor Standards Act (FLSA) overtime wages calculation for hourly staff.
- **Table**: `TimeCards (emp_id, weekly_hours_worked, base_hourly_rate)`
```sql
SELECT emp_id, weekly_hours_worked, base_hourly_rate,
       CASE
           WHEN weekly_hours_worked > 60 THEN (40 * base_hourly_rate) + (20 * base_hourly_rate * 1.5) + ((weekly_hours_worked - 60) * base_hourly_rate * 2.0)
           WHEN weekly_hours_worked > 40 THEN (40 * base_hourly_rate) + ((weekly_hours_worked - 40) * base_hourly_rate * 1.5)
           ELSE (weekly_hours_worked * base_hourly_rate)
       END AS gross_weekly_pay
FROM TimeCards
ORDER BY gross_weekly_pay DESC;
```

### Case 083: Annual Paid Time Off (PTO) Carryover Limit & Forfeiture
- **Business Context**: Capping accrued PTO carryover at 80 hours at calendar year-end.
- **Table**: `PtoBalances (employee_id, current_pto_hours)`
```sql
SELECT employee_id, current_pto_hours,
       CASE
           WHEN current_pto_hours > 80 THEN 80
           ELSE current_pto_hours
       END AS hours_carried_forward,
       CASE
           WHEN current_pto_hours > 80 THEN (current_pto_hours - 80)
           ELSE 0
       END AS hours_forfeited
FROM PtoBalances;
```

### Case 084: Gender & Ethnicity Pay Equity Audit Bands
- **Business Context**: Identifying employees falling outside the 80% to 120% departmental median band.
- **Table**: `CompensationAudit (emp_id, role, salary, role_median_salary)`
```sql
SELECT emp_id, role, salary, role_median_salary,
       CASE
           WHEN salary < (role_median_salary * 0.80) THEN 'UNDERPAID_EQUITY_REVIEW'
           WHEN salary > (role_median_salary * 1.20) THEN 'EXCEEDS_SALARY_BAND'
           ELSE 'COMPLIANT_BAND'
       END AS pay_equity_status
FROM CompensationAudit;
```

### Case 085: Sales Commission Accelerators (100% / 150% / 200%)
- **Business Context**: Tiered commission percentages based on quota attainment.
- **Table**: `SalesReps (rep_id, deals_closed_usd, annual_quota_usd)`
```sql
SELECT rep_id, (deals_closed_usd * 100.0 / annual_quota_usd) AS attainment_pct,
       CASE
           WHEN (deals_closed_usd * 1.0 / annual_quota_usd) >= 1.50 THEN 'SUPER_ACCELERATOR (20% Commission)'
           WHEN (deals_closed_usd * 1.0 / annual_quota_usd) >= 1.00 THEN 'ACCELERATOR (15% Commission)'
           ELSE 'BASE_COMMISSION (10% Commission)'
       END AS commission_structure
FROM SalesReps
ORDER BY attainment_pct DESC;
```

### Case 086: Remote Work State Tax Nexus Trigger
- **Business Context**: Flagging when remote workers in new states trigger corporate income tax nexus.
- **Table**: `RemoteWorkers (employee_id, physical_state, company_registered_states)`
```sql
SELECT employee_id, physical_state,
       CASE
           WHEN physical_state NOT IN ('CA', 'NY', 'TX', 'WA') THEN 'NEW_STATE_TAX_NEXUS_TRIGGER'
           ELSE 'ESTABLISHED_NEXUS'
       END AS legal_tax_status
FROM RemoteWorkers;
```

### Case 087: Employee Flight Risk Propensity Index
- **Business Context**: Flagging high-performing employees with no salary adjustment in 24+ months.
- **Table**: `StaffFlightRisk (emp_id, performance_rating, months_since_last_raise)`
```sql
SELECT emp_id, performance_rating, months_since_last_raise,
       CASE
           WHEN performance_rating >= 4 AND months_since_last_raise >= 24 THEN 'CRITICAL_FLIGHT_RISK'
           WHEN months_since_last_raise >= 18 THEN 'MODERATE_RETENTION_RISK'
           ELSE 'LOW_RISK'
       END AS retention_tier
FROM StaffFlightRisk;
```

### Case 088: Independent Contractor 1099 vs W2 Classification Audit
- **Business Context**: Auditing contractors working 40+ hours weekly for over a year to prevent misclassification penalties.
- **Table**: `Contractors (contractor_id, weekly_hours, tenure_months)`
```sql
SELECT contractor_id, weekly_hours, tenure_months,
       CASE
           WHEN weekly_hours >= 40 AND tenure_months >= 12 THEN 'HIGH_MISCLASSIFICATION_AUDIT_RISK'
           ELSE 'COMPLIANT_1099'
       END AS legal_assessment
FROM Contractors;
```

### Case 089: Annual Cybersecurity Compliance Training Escalation
- **Business Context**: Locking corporate laptop credentials if mandatory training is past due.
- **Table**: `ComplianceTraining (employee_id, days_overdue, is_completed)`
```sql
SELECT employee_id, days_overdue,
       CASE
           WHEN is_completed = TRUE THEN 'CERTIFIED_COMPLETE'
           WHEN days_overdue >= 14 THEN 'REVOKE_VPN_CREDENTIALS'
           WHEN days_overdue >= 7 THEN 'ESCALATE_TO_DEPARTMENT_VP'
           ELSE 'SEND_DAILY_SLACK_REMINDER'
       END AS compliance_enforcement
FROM ComplianceTraining;
```

### Case 090: 401(k) Employer Match Vesting Schedule
- **Business Context**: Calculating vested employer match balance based on completed years of service.
- **Table**: `RetirementPlans (emp_id, completed_years, employer_match_balance)`
```sql
SELECT emp_id, completed_years, employer_match_balance,
       CASE
           WHEN completed_years >= 4 THEN employer_match_balance * 1.00
           WHEN completed_years = 3 THEN employer_match_balance * 0.75
           WHEN completed_years = 2 THEN employer_match_balance * 0.50
           WHEN completed_years = 1 THEN employer_match_balance * 0.25
           ELSE 0.00
       END AS vested_match_balance_usd
FROM RetirementPlans;
```

---

## Domain 10: Marketplaces & Social Platforms (Cases 91 – 100)

### Case 091: Ride-Hailing Surge Pricing Multiplier Engine
- **Business Context**: Uber/Lyft dynamic fare surge multiplier when rider requests outnumber drivers.
- **Table**: `RideZones (zone_id, active_drivers, pending_requests)`
```sql
SELECT zone_id, active_drivers, pending_requests,
       CASE
           WHEN active_drivers = 0 THEN 'SURGE_3_0X_MAX'
           WHEN (pending_requests * 1.0 / active_drivers) >= 3.0 THEN 'SURGE_2_5X'
           WHEN (pending_requests * 1.0 / active_drivers) >= 2.0 THEN 'SURGE_1_75X'
           WHEN (pending_requests * 1.0 / active_drivers) >= 1.2 THEN 'SURGE_1_25X'
           ELSE 'STANDARD_FARE_1_0X'
       END AS surge_multiplier
FROM RideZones
ORDER BY pending_requests DESC;
```

### Case 092: Social Media Creator Sponsorship Tiering
- **Business Context**: Categorizing influencers for brand sponsorship deals based on engagement rate.
- **Table**: `InfluencerStats (handle, follower_count, engagement_rate_pct)`
```sql
SELECT handle, follower_count, engagement_rate_pct,
       CASE
           WHEN follower_count >= 1000000 AND engagement_rate_pct >= 3.5 THEN 'TIER_1_CELEBRITY ($25k/post)'
           WHEN follower_count >= 100000 AND engagement_rate_pct >= 4.0 THEN 'TIER_2_MACRO ($5k/post)'
           WHEN follower_count >= 10000 AND engagement_rate_pct >= 5.0 THEN 'TIER_3_MICRO ($1k/post)'
           ELSE 'UNQUALIFIED'
       END AS sponsorship_rate_card
FROM InfluencerStats
ORDER BY follower_count DESC;
```

### Case 093: Airbnb Superhost Status Certification
- **Business Context**: Verifying that property hosts maintain a 4.8+ rating and < 1% cancellation rate.
- **Table**: `AirbnbHosts (host_id, average_rating, cancellation_rate_pct, completed_trips)`
```sql
SELECT host_id, average_rating, cancellation_rate_pct, completed_trips,
       CASE
           WHEN completed_trips >= 10 AND average_rating >= 4.80 AND cancellation_rate_pct < 1.0 THEN 'SUPERHOST_CERTIFIED'
           ELSE 'STANDARD_HOST'
       END AS badge_award
FROM AirbnbHosts
ORDER BY average_rating DESC;
```

### Case 094: AdTech Cost-Per-Click (CPC) Quality Score Penalty
- **Business Context**: Google Ads quality score impact on bid price.
- **Table**: `AdCampaigns (campaign_id, bid_price_usd, quality_score_1_to_10)`
```sql
SELECT campaign_id, bid_price_usd, quality_score_1_to_10,
       CASE
           WHEN quality_score_1_to_10 >= 8 THEN bid_price_usd * 0.80  -- 20% discount
           WHEN quality_score_1_to_10 <= 3 THEN bid_price_usd * 1.50  -- 50% penalty
           ELSE bid_price_usd
       END AS effective_cpc_price
FROM AdCampaigns
ORDER BY quality_score_1_to_10 ASC;
```

### Case 095: Food Delivery Tip Recommendation Options
- **Business Context**: Calculating checkout tip pills based on order subtotal.
- **Table**: `FoodOrders (order_id, subtotal_usd, delivery_distance_miles)`
```sql
SELECT order_id, subtotal_usd,
       CASE
           WHEN subtotal_usd < 15.00 THEN 3.00
           ELSE ROUND(subtotal_usd * 0.18, 2)
       END AS recommended_default_tip_usd
FROM FoodOrders;
```

### Case 096: Counterfeit Luxury Marketplace Listing Risk Score
- **Business Context**: Detecting fake Rolex watches sold for 90% below retail price.
- **Table**: `MarketplaceListings (listing_id, brand_name, listed_price_usd, msrp_usd, seller_rating)`
```sql
SELECT listing_id, brand_name, listed_price_usd, msrp_usd,
       CASE
           WHEN brand_name = 'Rolex' AND listed_price_usd < (msrp_usd * 0.30) THEN 'CRITICAL_COUNTERFEIT_TAKEDOWN'
           WHEN (listed_price_usd * 1.0 / msrp_usd) < 0.50 AND seller_rating < 3.5 THEN 'HOLD_FOR_AUTHENTICATION'
           ELSE 'APPROVED_LISTING'
       END AS trust_action
FROM MarketplaceListings;
```

### Case 097: Social Network Bot Account Creation Velocity
- **Business Context**: Flagging automated bot registration farms creating accounts from single IP blocks.
- **Table**: `SignupAudit (subnet, signups_last_hour)`
```sql
SELECT subnet, signups_last_hour,
       CASE
           WHEN signups_last_hour >= 50 THEN 'CAPTCHA_PLUS_PHONE_VERIFY'
           WHEN signups_last_hour >= 20 THEN 'REQUIRE_CAPTCHA'
           ELSE 'STANDARD_FLOW'
       END AS security_challenge
FROM SignupAudit
ORDER BY signups_last_hour DESC;
```

### Case 098: Dating App Match Distance & Age Range Boundary
- **Business Context**: Verifying mutual discovery radius between two users.
- **Table**: `MatchCandidates (user_a_id, user_b_id, distance_miles, age_difference_years)`
```sql
SELECT user_a_id, user_b_id, distance_miles, age_difference_years,
       CASE
           WHEN distance_miles <= 25 AND age_difference_years <= 5 THEN 'ELIGIBLE_IN_FEED'
           ELSE 'OUT_OF_BOUNDS_FILTER'
       END AS discovery_filter
FROM MatchCandidates;
```

### Case 099: Real Estate Days-On-Market (DOM) Stale Listing Flag
- **Business Context**: Recommending seller price cuts when a home sits unsold.
- **Table**: `HomeListings (mls_id, list_price, days_on_market)`
```sql
SELECT mls_id, list_price, days_on_market,
       CASE
           WHEN days_on_market > 90 THEN 'RECOMMEND_10_PCT_PRICE_CUT'
           WHEN days_on_market > 45 THEN 'RECOMMEND_5_PCT_PRICE_CUT'
           ELSE 'NEW_ACTIVE_LISTING'
       END AS realtor_strategy
FROM HomeListings
ORDER BY days_on_market DESC;
```

### Case 100: Crowdfunding Kickstarter All-or-Nothing Escrow Payout
- **Business Context**: Releasing funds to creators only if campaign reaches 100% funding goal.
- **Table**: `Campaigns (campaign_id, goal_amount_usd, pledged_amount_usd, is_deadline_passed)`
```sql
SELECT campaign_id, goal_amount_usd, pledged_amount_usd,
       CASE
           WHEN pledged_amount_usd >= goal_amount_usd AND is_deadline_passed = TRUE THEN 'RELEASE_FUNDS_TO_CREATOR'
           WHEN pledged_amount_usd < goal_amount_usd AND is_deadline_passed = TRUE THEN 'REFUND_ALL_BACKERS'
           ELSE 'CAMPAIGN_IN_PROGRESS'
       END AS escrow_disbursement
FROM Campaigns;
```
