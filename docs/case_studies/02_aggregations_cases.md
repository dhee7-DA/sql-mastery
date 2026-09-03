# Pillar 2: Aggregations & Group Summaries — The 100 Enterprise Case Study Master Vault

An exhaustive catalog of **100 production-grade corporate SQL case studies** testing group-level analytics: `COUNT(*)`, `COUNT(col)`, `COUNT(DISTINCT)`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING`, multi-column grouping, and the strict non-aggregated projection rule across 10 global industries.

---

## 📑 Directory of the 10 Industry Domains

| Domain # | Industry Vertical | Case Range | Key Aggregate Focus |
|:---|:---|:---|:---|
| **01** | [Fintech & Payments](#domain-01-fintech--payments-cases-101--110) | Cases 101 – 110 | Daily transaction volume, merchant payouts, dispute ratios, FICO tiers |
| **02** | [SaaS & Cloud Subscriptions](#domain-02-saas--cloud-subscriptions-cases-111--120) | Cases 111 – 120 | MRR rollups, seat utilization, ticket SLAs, API token overages |
| **03** | [E-Commerce & Retail](#domain-03-e-commerce--retail-cases-121--130) | Cases 121 – 130 | Average Order Value (AOV), LTV, wardrobing return rates, vendor lead times |
| **04** | [Healthcare & Clinical Systems](#domain-04-healthcare--clinical-systems-cases-131--140) | Cases 131 – 140 | ER wait times by ESI, Average Length of Stay (ALOS), readmissions, ICU occupancy |
| **05** | [Logistics & Fleet Operations](#domain-05-logistics--fleet-operations-cases-141--150) | Cases 141 – 150 | Tonnage per corridor, carrier on-time rates, demurrage accrual, drone battery |
| **06** | [Media, Streaming & Gaming](#domain-06-media-streaming--gaming-cases-151--160) | Cases 151 – 160 | Watch hours by genre, creator royalties, esports KDA, concurrent users |
| **07** | [Cybersecurity & SecOps](#domain-07-cybersecurity--secops-cases-161--170) | Cases 161 – 170 | Failed logins by subnet, unpatched CVEs, cloud spend anomalies, DLP exfiltration |
| **08** | [Hardware, IoT & Robotics](#domain-08-hardware-iot--robotics-cases-171--180) | Cases 171 – 180 | AMR near-misses, robot vibration, grid megawatt load, turbine exhaust temps |
| **09** | [HR, Payroll & Governance](#domain-09-hr-payroll--governance-cases-181--190) | Cases 181 – 190 | Departmental payroll, overtime compliance, pay equity audits, attrition rates |
| **10** | [Marketplaces & Social Platforms](#domain-10-marketplaces--social-platforms-cases-191--200) | Cases 191 – 200 | Surge pricing by zone, Superhost ratings, CPC ad auctions, crowdfunding totals |

---

## Domain 01: Fintech & Payments (Cases 101 – 110)

### Case 101: Daily Transaction Volume & Average Ticket Size per Category
- **Business Context**: Payment processing networks track transaction velocity and average ticket size across merchant categories.
- **Table**: `Transactions (tx_id, merchant_category, amount_usd, tx_date)`
```sql
SELECT merchant_category,
       COUNT(*) AS total_transactions,
       SUM(amount_usd) AS gross_volume_usd,
       ROUND(AVG(amount_usd), 2) AS average_ticket_usd
FROM Transactions
GROUP BY merchant_category
ORDER BY gross_volume_usd DESC;
```

### Case 102: Cardholders with Excessive Monthly Spend (`HAVING SUM`)
- **Business Context**: Credit card risk teams identify individual accounts whose aggregate monthly charges breach high-roller exposure limits.
- **Table**: `CardCharges (charge_id, cardholder_id, amount_usd, billing_month)`
```sql
SELECT cardholder_id,
       COUNT(*) AS total_charges,
       SUM(amount_usd) AS total_monthly_spend
FROM CardCharges
WHERE billing_month = '2026-08'
GROUP BY cardholder_id
HAVING SUM(amount_usd) >= 10000.00
ORDER BY total_monthly_spend DESC;
```

### Case 103: Merchant Dispute Rate & Chargeback Ratio Grouping
- **Business Context**: Card networks calculate the exact chargeback percentage per merchant to enforce regulatory warning thresholds.
- **Table**: `MerchantSettlements (merchant_id, total_sales, chargeback_count)`
```sql
SELECT merchant_id,
       SUM(total_sales) AS total_orders,
       SUM(chargeback_count) AS total_chargebacks,
       ROUND(SUM(chargeback_count) * 100.0 / SUM(total_sales), 3) AS dispute_rate_pct
FROM MerchantSettlements
GROUP BY merchant_id
HAVING SUM(total_sales) >= 500 AND (SUM(chargeback_count) * 1.0 / SUM(total_sales)) >= 0.01
ORDER BY dispute_rate_pct DESC;
```

### Case 104: ATM Cash Dispense Volume by Hour of Day
- **Business Context**: Armored cash logistics scheduling cash drop-offs based on peak hourly customer withdrawal patterns.
- **Table**: `AtmWithdrawals (withdrawal_id, terminal_id, amount_usd, dispense_hour)`
```sql
SELECT dispense_hour,
       COUNT(*) AS withdrawal_count,
       SUM(amount_usd) AS total_cash_dispensed,
       AVG(amount_usd) AS avg_withdrawal_usd
FROM AtmWithdrawals
GROUP BY dispense_hour
ORDER BY total_cash_dispensed DESC;
```

### Case 105: HFT Execution Slippage per Market Maker
- **Business Context**: SEC compliance audit evaluating market maker fill quality and average price slippage on equity orders.
- **Table**: `BrokerExecutions (order_id, market_maker, limit_price, fill_price, share_volume)`
```sql
SELECT market_maker,
       COUNT(*) AS executed_trades,
       SUM(share_volume) AS total_shares,
       ROUND(AVG(fill_price - limit_price), 4) AS avg_slippage_per_share
FROM BrokerExecutions
GROUP BY market_maker
ORDER BY avg_slippage_per_share DESC;
```

### Case 106: KYC Sanctions Risk: Accounts with Multiple Foreign Wires
- **Business Context**: Detecting high-risk international corridors by aggregating foreign wire counts per customer.
- **Table**: `WireAudits (wire_id, account_id, dest_country, amount_usd, is_foreign)`
```sql
SELECT account_id,
       COUNT(*) AS foreign_wire_count,
       SUM(amount_usd) AS total_wired_usd,
       COUNT(DISTINCT dest_country) AS unique_destination_countries
FROM WireAudits
WHERE is_foreign = TRUE
GROUP BY account_id
HAVING COUNT(*) >= 3 AND SUM(amount_usd) >= 50000
ORDER BY total_wired_usd DESC;
```

### Case 107: Loan Portfolio Exposure & Default Rate by FICO Credit Tier
- **Business Context**: Bank treasury risk modeling loan delinquency rates partitioned by credit score bands.
- **Table**: `LoanPortfolio (loan_id, credit_tier, loan_amount, is_defaulted)`
```sql
SELECT credit_tier,
       COUNT(*) AS total_loans,
       SUM(loan_amount) AS total_exposure_usd,
       ROUND(SUM(CASE WHEN is_defaulted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS default_rate_pct
FROM LoanPortfolio
GROUP BY credit_tier
ORDER BY default_rate_pct DESC;
```

### Case 108: Cryptocurrency Liquidity Pool Swap Fees
- **Business Context**: Decentralized exchange (DEX) analytics tracking total 0.3% protocol swap fees accumulated by token pair.
- **Table**: `DexSwaps (swap_id, token_pair, input_amount_usd, fee_usd)`
```sql
SELECT token_pair,
       COUNT(*) AS total_swaps,
       SUM(input_amount_usd) AS total_trading_volume,
       SUM(fee_usd) AS total_protocol_revenue
FROM DexSwaps
GROUP BY token_pair
HAVING SUM(input_amount_usd) >= 1000000
ORDER BY total_protocol_revenue DESC;
```

### Case 109: Branch Overdraft Courtesy Waivers
- **Business Context**: Regional banking executives identifying branch locations with excessive fee waiver write-offs.
- **Table**: `BranchWaivers (waiver_id, branch_code, waived_amount_usd)`
```sql
SELECT branch_code,
       COUNT(*) AS total_waivers_granted,
       SUM(waived_amount_usd) AS total_waived_usd,
       AVG(waived_amount_usd) AS avg_waiver_size
FROM BranchWaivers
GROUP BY branch_code
HAVING SUM(waived_amount_usd) >= 25000
ORDER BY total_waived_usd DESC;
```

### Case 110: Cross-Border Foreign Exchange Margin by Currency Corridor
- **Business Context**: Neobank FX desk calculating gross revenue spread on currency exchanges.
- **Table**: `FxConversions (conversion_id, currency_pair, converted_usd, spread_revenue_usd)`
```sql
SELECT currency_pair,
       COUNT(*) AS conversion_count,
       SUM(converted_usd) AS total_volume_usd,
       ROUND(SUM(spread_revenue_usd), 2) AS total_fx_revenue
FROM FxConversions
GROUP BY currency_pair
ORDER BY total_fx_revenue DESC;
```

---

## Domain 02: SaaS & Cloud Subscriptions (Cases 111 – 120)

### Case 111: Monthly Recurring Revenue (MRR) by Subscription Tier
- **Business Context**: Executive SaaS dashboard aggregating active subscription revenue and account headcounts.
- **Table**: `Subscriptions (subscription_id, plan_tier, monthly_rate_usd, status)`
```sql
SELECT plan_tier,
       COUNT(*) AS active_tenants,
       SUM(monthly_rate_usd) AS total_mrr,
       AVG(monthly_rate_usd) AS avg_contract_value
FROM Subscriptions
WHERE status = 'ACTIVE'
GROUP BY plan_tier
ORDER BY total_mrr DESC;
```

### Case 112: Contraction Risk: Accounts with Seat Utilization < 50%
- **Business Context**: Customer Success teams identifying enterprise accounts wasting licensed seats before renewal.
- **Table**: `EnterpriseSeats (account_id, company_name, licensed_seats, active_seats)`
```sql
SELECT company_name,
       SUM(licensed_seats) AS total_licensed,
       SUM(active_seats) AS total_active,
       ROUND(SUM(active_seats) * 100.0 / SUM(licensed_seats), 1) AS overall_utilization_pct
FROM EnterpriseSeats
GROUP BY company_name
HAVING (SUM(active_seats) * 1.0 / SUM(licensed_seats)) < 0.50
ORDER BY total_licensed DESC;
```

### Case 113: Customer Support Ticket SLA Breaches by Priority
- **Business Context**: Evaluating engineering support resolution times and breach rates by severity code.
- **Table**: `SupportTickets (ticket_id, priority, resolution_hours, is_breached)`
```sql
SELECT priority,
       COUNT(*) AS total_tickets,
       ROUND(AVG(resolution_hours), 1) AS avg_resolution_hours,
       SUM(CASE WHEN is_breached = TRUE THEN 1 ELSE 0 END) AS breached_tickets_count
FROM SupportTickets
GROUP BY priority
ORDER BY avg_resolution_hours DESC;
```

### Case 114: API Gateway Overage Billing per Tenant
- **Business Context**: Cloud infrastructure billing engine calculating billable API calls exceeding monthly allowances.
- **Table**: `ApiRequests (request_id, tenant_id, endpoint_category)`
```sql
SELECT tenant_id,
       COUNT(*) AS total_requests,
       COUNT(DISTINCT endpoint_category) AS distinct_apis_used
FROM ApiRequests
GROUP BY tenant_id
HAVING COUNT(*) > 1000000
ORDER BY total_requests DESC;
```

### Case 115: Multi-Tenant Cloud Storage Consumption
- **Business Context**: Monitoring database tenants consuming large amounts of provisioned cloud storage.
- **Table**: `TenantStorage (tenant_id, cluster_name, storage_used_gb)`
```sql
SELECT cluster_name,
       COUNT(DISTINCT tenant_id) AS total_tenants,
       SUM(storage_used_gb) AS total_storage_gb,
       MAX(storage_used_gb) AS largest_single_tenant_gb
FROM TenantStorage
GROUP BY cluster_name
ORDER BY total_storage_gb DESC;
```

### Case 116: User Retention Cohorts by Signup Year and Tier
- **Business Context**: Tracking active paid subscriber retention broken down by cohort onboarding year.
- **Table**: `UserCohorts (user_id, signup_year, tier, is_active)`
```sql
SELECT signup_year, tier,
       COUNT(*) AS total_signed_up,
       SUM(CASE WHEN is_active = TRUE THEN 1 ELSE 0 END) AS currently_active_users
FROM UserCohorts
GROUP BY signup_year, tier
ORDER BY signup_year DESC, tier ASC;
```

### Case 117: Net Promoter Score (NPS) Sentiment by Product Feature
- **Business Context**: Product analytics evaluating customer sentiment and promoter counts across modules.
- **Table**: `FeatureFeedback (feedback_id, feature_name, nps_score)`
```sql
SELECT feature_name,
       COUNT(*) AS response_count,
       ROUND(AVG(nps_score), 2) AS average_nps,
       SUM(CASE WHEN nps_score >= 9 THEN 1 ELSE 0 END) AS promoter_count
FROM FeatureFeedback
GROUP BY feature_name
HAVING COUNT(*) >= 50
ORDER BY average_nps DESC;
```

### Case 118: Beta Feature Adoption Velocity
- **Business Context**: Measuring how many distinct enterprise companies are actively calling newly launched beta features.
- **Table**: `FeatureTelemetry (event_id, company_id, feature_flag)`
```sql
SELECT feature_flag,
       COUNT(*) AS total_invocations,
       COUNT(DISTINCT company_id) AS adopting_companies_count
FROM FeatureTelemetry
GROUP BY feature_flag
ORDER BY adopting_companies_count DESC;
```

### Case 119: SSO Inactive Admin Count by Department
- **Business Context**: Corporate security auditing stale administrative credentials across internal orgs.
- **Table**: `UserDirectory (user_id, department, role, is_active_last_90d)`
```sql
SELECT department,
       COUNT(*) AS total_admins,
       SUM(CASE WHEN is_active_last_90d = FALSE THEN 1 ELSE 0 END) AS stale_admins_count
FROM UserDirectory
WHERE role IN ('SuperAdmin', 'Admin')
GROUP BY department
HAVING SUM(CASE WHEN is_active_last_90d = FALSE THEN 1 ELSE 0 END) > 0
ORDER BY stale_admins_count DESC;
```

### Case 120: Enterprise Renewal Pipeline Value by Quarter
- **Business Context**: Sales leadership forecasting renewal revenue grouped by fiscal quarter.
- **Table**: `EnterpriseRenewals (account_id, renewal_quarter, annual_contract_value_usd)`
```sql
SELECT renewal_quarter,
       COUNT(*) AS upcoming_renewals,
       SUM(annual_contract_value_usd) AS total_pipeline_arr,
       MIN(annual_contract_value_usd) AS min_deal_size,
       MAX(annual_contract_value_usd) AS max_deal_size
FROM EnterpriseRenewals
GROUP BY renewal_quarter
ORDER BY renewal_quarter ASC;
```

---

## Domain 03: E-Commerce & Retail (Cases 121 – 130)

### Case 121: Average Order Value (AOV) & Revenue by Category
- **Table**: `OrderItems (order_id, category, item_price, quantity)`
```sql
SELECT category,
       SUM(item_price * quantity) AS total_gross_revenue,
       COUNT(DISTINCT order_id) AS total_orders,
       ROUND(SUM(item_price * quantity) / COUNT(DISTINCT order_id), 2) AS average_order_value
FROM OrderItems
GROUP BY category
ORDER BY total_gross_revenue DESC;
```

### Case 122: Wardrobing Return Abuse: High-Volume Serial Returners
- **Table**: `CustomerTransactions (order_id, customer_id, is_returned, refund_amount)`
```sql
SELECT customer_id,
       COUNT(*) AS total_orders_placed,
       SUM(CASE WHEN is_returned = TRUE THEN 1 ELSE 0 END) AS total_returns,
       ROUND(SUM(CASE WHEN is_returned = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS return_rate_pct
FROM CustomerTransactions
GROUP BY customer_id
HAVING COUNT(*) >= 10 AND (SUM(CASE WHEN is_returned = TRUE THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) >= 0.60
ORDER BY return_rate_pct DESC;
```

### Case 123: Warehouse Pick-and-Pack Latency by Fulfillment Center
- **Table**: `WarehouseOrders (order_id, center_id, processing_minutes)`
```sql
SELECT center_id,
       COUNT(*) AS packages_fulfilled,
       ROUND(AVG(processing_minutes), 1) AS avg_fulfillment_minutes,
       MAX(processing_minutes) AS max_delay_minutes
FROM WarehouseOrders
GROUP BY center_id
ORDER BY avg_fulfillment_minutes ASC;
```

### Case 124: Customer Lifetime Value (LTV) Segmentation
- **Table**: `OnlineOrders (order_id, customer_id, order_total, order_year)`
```sql
SELECT customer_id,
       COUNT(*) AS lifetime_orders,
       SUM(order_total) AS total_lifetime_spend,
       AVG(order_total) AS avg_spend_per_order
FROM OnlineOrders
GROUP BY customer_id
HAVING SUM(order_total) >= 5000.00
ORDER BY total_lifetime_spend DESC;
```

### Case 125: Flash Sale Stockout vs Fulfilled Units per SKU
- **Table**: `FlashSaleOrders (order_id, sku, was_fulfilled, item_price)`
```sql
SELECT sku,
       COUNT(*) AS total_purchase_attempts,
       SUM(CASE WHEN was_fulfilled = TRUE THEN 1 ELSE 0 END) AS fulfilled_units,
       SUM(CASE WHEN was_fulfilled = FALSE THEN 1 ELSE 0 END) AS stockout_cancellations
FROM FlashSaleOrders
GROUP BY sku
ORDER BY stockout_cancellations DESC;
```

### Case 126: Third-Party Marketplace Seller Defect Rate
- **Table**: `SellerMetrics (seller_id, order_id, has_defect)`
```sql
SELECT seller_id,
       COUNT(*) AS total_sales,
       SUM(CASE WHEN has_defect = TRUE THEN 1 ELSE 0 END) AS defect_count,
       ROUND(SUM(CASE WHEN has_defect = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS defect_rate_pct
FROM SellerMetrics
GROUP BY seller_id
HAVING COUNT(*) >= 100 AND (SUM(CASE WHEN has_defect = TRUE THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) > 0.02
ORDER BY defect_rate_pct DESC;
```

### Case 127: Abandoned Cart Loss by Day of Week
- **Table**: `CartHistory (cart_id, day_of_week, is_purchased, cart_value)`
```sql
SELECT day_of_week,
       COUNT(*) AS total_abandoned_carts,
       SUM(cart_value) AS unrecovered_revenue_loss
FROM CartHistory
WHERE is_purchased = FALSE
GROUP BY day_of_week
ORDER BY unrecovered_revenue_loss DESC;
```

### Case 128: Cross-Border Customs Duty by Destination Country
- **Table**: `ExportShipments (shipment_id, dest_country, customs_duty_paid)`
```sql
SELECT dest_country,
       COUNT(*) AS total_shipments,
       SUM(customs_duty_paid) AS total_duties_collected,
       AVG(customs_duty_paid) AS avg_duty_per_parcel
FROM ExportShipments
GROUP BY dest_country
ORDER BY total_duties_collected DESC;
```

### Case 129: Supplier Restock Lead Time Variance
- **Table**: `PurchaseOrders (po_id, supplier_id, lead_time_days)`
```sql
SELECT supplier_id,
       COUNT(*) AS orders_completed,
       MIN(lead_time_days) AS fastest_lead_time,
       AVG(lead_time_days) AS avg_lead_time,
       MAX(lead_time_days) AS slowest_lead_time
FROM PurchaseOrders
GROUP BY supplier_id
ORDER BY avg_lead_time ASC;
```

### Case 130: Promotional Coupon Code Impact on Gross Margins
- **Table**: `DiscountOrders (order_id, coupon_code, order_subtotal, discount_amount)`
```sql
SELECT coupon_code,
       COUNT(*) AS times_redeemed,
       SUM(order_subtotal) AS gross_sales_usd,
       SUM(discount_amount) AS total_discount_given
FROM DiscountOrders
GROUP BY coupon_code
ORDER BY times_redeemed DESC;
```

---

## Domain 04: Healthcare & Clinical Systems (Cases 131 – 140)

### Case 131: Emergency Room Average Wait Times by ESI Acuity
- **Table**: `ErVisits (visit_id, esi_level, wait_minutes_to_physician)`
```sql
SELECT esi_level,
       COUNT(*) AS patient_count,
       ROUND(AVG(wait_minutes_to_physician), 1) AS avg_wait_minutes,
       MAX(wait_minutes_to_physician) AS max_wait_minutes
FROM ErVisits
GROUP BY esi_level
ORDER BY esi_level ASC;
```

### Case 132: Inpatient Average Length of Stay (ALOS) by Ward
- **Table**: `HospitalAdmissions (admission_id, ward_name, length_of_stay_days)`
```sql
SELECT ward_name,
       COUNT(*) AS total_patients_discharged,
       ROUND(AVG(length_of_stay_days), 1) AS avg_length_of_stay_days,
       SUM(length_of_stay_days) AS total_bed_days_occupied
FROM HospitalAdmissions
GROUP BY ward_name
ORDER BY avg_length_of_stay_days DESC;
```

### Case 133: Hospital 30-Day Readmission Rates by Diagnosis Code
- **Table**: `PatientReadmissions (admission_id, icd10_code, was_readmitted_30d)`
```sql
SELECT icd10_code,
       COUNT(*) AS total_discharges,
       SUM(CASE WHEN was_readmitted_30d = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
       ROUND(SUM(CASE WHEN was_readmitted_30d = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS readmission_rate_pct
FROM PatientReadmissions
GROUP BY icd10_code
HAVING COUNT(*) >= 50
ORDER BY readmission_rate_pct DESC;
```

### Case 134: Controlled Substance Provider Dispensing Volumes
- **Table**: `ControlledPrescriptions (rx_id, prescriber_npi, opioid_units)`
```sql
SELECT prescriber_npi,
       COUNT(*) AS total_prescriptions,
       SUM(opioid_units) AS total_units_prescribed
FROM ControlledPrescriptions
GROUP BY prescriber_npi
HAVING SUM(opioid_units) >= 1000
ORDER BY total_units_prescribed DESC;
```

### Case 135: Insurance Claim Denial Rates by CPT Procedure Code
- **Table**: `BillingClaims (claim_id, cpt_code, billed_amount, is_denied)`
```sql
SELECT cpt_code,
       COUNT(*) AS total_claims_billed,
       SUM(billed_amount) AS total_dollars_claimed,
       ROUND(SUM(CASE WHEN is_denied = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS denial_rate_pct
FROM BillingClaims
GROUP BY cpt_code
HAVING COUNT(*) >= 100
ORDER BY denial_rate_pct DESC;
```

### Case 136: Sepsis Clinical Protocol: Minutes to First Antibiotic
- **Table**: `SepsisEncounters (encounter_id, hospital_unit, minutes_to_antibiotics)`
```sql
SELECT hospital_unit,
       COUNT(*) AS sepsis_cases,
       ROUND(AVG(minutes_to_antibiotics), 1) AS avg_minutes_to_antibiotics,
       SUM(CASE WHEN minutes_to_antibiotics <= 60 THEN 1 ELSE 0 END) AS golden_hour_compliant_cases
FROM SepsisEncounters
GROUP BY hospital_unit
ORDER BY avg_minutes_to_antibiotics ASC;
```

### Case 137: Intensive Care Unit (ICU) Bed Occupancy by Facility
- **Table**: `FacilityBeds (facility_id, total_icu_beds, occupied_icu_beds)`
```sql
SELECT facility_id,
       SUM(total_icu_beds) AS total_capacity,
       SUM(occupied_icu_beds) AS total_occupied,
       ROUND(SUM(occupied_icu_beds) * 100.0 / SUM(total_icu_beds), 1) AS occupancy_rate_pct
FROM FacilityBeds
GROUP BY facility_id
ORDER BY occupancy_rate_pct DESC;
```

### Case 138: Clinical Trial Enrollment Velocity by Site
- **Table**: `TrialSites (trial_id, site_id, is_randomized)`
```sql
SELECT site_id,
       COUNT(*) AS total_screened_candidates,
       SUM(CASE WHEN is_randomized = TRUE THEN 1 ELSE 0 END) AS randomized_patients
FROM TrialSites
GROUP BY site_id
ORDER BY randomized_patients DESC;
```

### Case 139: Pharmacy Dispensing Error Audit by Medication Category
- **Table**: `DispenseErrors (error_id, drug_class, severity_score)`
```sql
SELECT drug_class,
       COUNT(*) AS total_reported_near_misses,
       MAX(severity_score) AS peak_severity
FROM DispenseErrors
GROUP BY drug_class
ORDER BY total_reported_near_misses DESC;
```

### Case 140: Outpatient Clinic No-Show Rates by Specialty
- **Table**: `SpecialtyAppointments (appointment_id, specialty, was_no_show)`
```sql
SELECT specialty,
       COUNT(*) AS total_appointments,
       SUM(CASE WHEN was_no_show = TRUE THEN 1 ELSE 0 END) AS total_no_shows,
       ROUND(SUM(CASE WHEN was_no_show = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS no_show_rate_pct
FROM SpecialtyAppointments
GROUP BY specialty
ORDER BY no_show_rate_pct DESC;
```

---

## Domain 05: Logistics, Supply Chain & Fleet (Cases 141 – 150)

### Case 141: Freight Tonnage & Average Cost per Lane
- **Table**: `FreightShipments (shipment_id, origin_hub, dest_hub, weight_tons, freight_cost)`
```sql
SELECT origin_hub, dest_hub,
       COUNT(*) AS total_loads,
       SUM(weight_tons) AS total_tonnage,
       ROUND(SUM(freight_cost) / SUM(weight_tons), 2) AS avg_cost_per_ton
FROM FreightShipments
GROUP BY origin_hub, dest_hub
ORDER BY total_tonnage DESC;
```

### Case 142: Carrier SLA On-Time Delivery Rate
- **Table**: `CarrierDeliveries (delivery_id, carrier_name, is_on_time)`
```sql
SELECT carrier_name,
       COUNT(*) AS total_trips,
       SUM(CASE WHEN is_on_time = TRUE THEN 1 ELSE 0 END) AS on_time_trips,
       ROUND(SUM(CASE WHEN is_on_time = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS on_time_pct
FROM CarrierDeliveries
GROUP BY carrier_name
HAVING COUNT(*) >= 50
ORDER BY on_time_pct DESC;
```

### Case 143: Port Dwell Time by Ocean Container Line
- **Table**: `PortContainers (container_id, ocean_line, dwell_days)`
```sql
SELECT ocean_line,
       COUNT(*) AS total_containers,
       ROUND(AVG(dwell_days), 1) AS avg_dwell_days,
       MAX(dwell_days) AS worst_dwell_days
FROM PortContainers
GROUP BY ocean_line
ORDER BY avg_dwell_days DESC;
```

### Case 144: Autonomous Delivery Drone Flight Time by Payload Tier
- **Table**: `DroneMissions (mission_id, payload_tier, flight_duration_minutes)`
```sql
SELECT payload_tier,
       COUNT(*) AS completed_missions,
       ROUND(AVG(flight_duration_minutes), 1) AS avg_flight_minutes
FROM DroneMissions
GROUP BY payload_tier
ORDER BY avg_flight_minutes DESC;
```

### Case 145: Last-Mile Delivery Driver Route Productivity
- **Table**: `DriverShifts (shift_id, driver_id, packages_delivered, delivery_zone)`
```sql
SELECT delivery_zone,
       COUNT(DISTINCT driver_id) AS active_drivers,
       SUM(packages_delivered) AS total_delivered,
       ROUND(AVG(packages_delivered), 1) AS avg_packages_per_driver
FROM DriverShifts
GROUP BY delivery_zone
ORDER BY total_delivered DESC;
```

### Case 146: Cold-Chain Spoilage Loss by Fleet Operator
- **Table**: `ReeferTrucks (trip_id, fleet_operator, was_spoiled, cargo_value_usd)`
```sql
SELECT fleet_operator,
       COUNT(*) AS total_trips,
       SUM(CASE WHEN was_spoiled = TRUE THEN cargo_value_usd ELSE 0 END) AS total_spoilage_loss_usd
FROM ReeferTrucks
GROUP BY fleet_operator
HAVING SUM(CASE WHEN was_spoiled = TRUE THEN cargo_value_usd ELSE 0 END) > 0
ORDER BY total_spoilage_loss_usd DESC;
```

### Case 147: Cross-Docking Terminal Pallet Throughput
- **Table**: `TerminalDocks (dock_id, terminal_id, pallets_unloaded)`
```sql
SELECT terminal_id,
       COUNT(DISTINCT dock_id) AS active_docks,
       SUM(pallets_unloaded) AS total_pallets_handled
FROM TerminalDocks
GROUP BY terminal_id
ORDER BY total_pallets_handled DESC;
```

### Case 148: Fleet Fuel Economy (MPG) by Engine Model
- **Table**: `FleetOdometer (vehicle_id, engine_model, miles_driven, gallons_fuel_consumed)`
```sql
SELECT engine_model,
       COUNT(DISTINCT vehicle_id) AS total_trucks,
       ROUND(SUM(miles_driven) / SUM(gallons_fuel_consumed), 2) AS fleet_average_mpg
FROM FleetOdometer
GROUP BY engine_model
ORDER BY fleet_average_mpg DESC;
```

### Case 149: Demurrage Penalty Accrual by Vessel Charterer
- **Table**: `VesselDemurrage (bill_id, charterer_name, overstay_fee_usd)`
```sql
SELECT charterer_name,
       COUNT(*) AS delayed_vessel_calls,
       SUM(overstay_fee_usd) AS total_demurrage_billed_usd
FROM VesselDemurrage
GROUP BY charterer_name
HAVING SUM(overstay_fee_usd) >= 100000
ORDER BY total_demurrage_billed_usd DESC;
```

### Case 150: Hazmat Transport Violations by Carrier
- **Table**: `HazmatInspections (inspection_id, carrier_id, violation_found)`
```sql
SELECT carrier_id,
       COUNT(*) AS total_roadside_inspections,
       SUM(CASE WHEN violation_found = TRUE THEN 1 ELSE 0 END) AS total_violations
FROM HazmatInspections
GROUP BY carrier_id
ORDER BY total_violations DESC;
```

---

## Domain 06: Media, Streaming & Gaming (Cases 151 – 160)

### Case 151: Watch Hours & Completion Rate by Content Genre
- **Table**: `Streams (stream_id, genre, watch_hours, is_fully_completed)`
```sql
SELECT genre,
       COUNT(*) AS total_streams,
       SUM(watch_hours) AS total_hours_streamed,
       ROUND(SUM(CASE WHEN is_fully_completed = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS completion_rate_pct
FROM Streams
GROUP BY genre
ORDER BY total_hours_streamed DESC;
```

### Case 152: Music Streaming Royalties Payout by Record Label
- **Table**: `SongRoyalties (play_id, label_name, royalty_earned_usd)`
```sql
SELECT label_name,
       COUNT(*) AS total_plays,
       SUM(royalty_earned_usd) AS total_payout_usd
FROM SongRoyalties
GROUP BY label_name
ORDER BY total_payout_usd DESC;
```

### Case 153: Esports Player Kill-Death-Assist (KDA) by Character Class
- **Table**: `PlayerMatches (match_id, character_class, kills, deaths, assists)`
```sql
SELECT character_class,
       COUNT(*) AS matches_played,
       ROUND(SUM(kills + assists) * 1.0 / NULLIF(SUM(deaths), 0), 2) AS aggregate_kda_ratio
FROM PlayerMatches
GROUP BY character_class
ORDER BY aggregate_kda_ratio DESC;
```

### Case 154: 4K vs 1080p Video Delivery Percentage by ISP
- **Table**: `VideoBitrateLog (session_id, isp_name, stream_resolution)`
```sql
SELECT isp_name,
       COUNT(*) AS total_sessions,
       ROUND(SUM(CASE WHEN stream_resolution = '4K' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_4k_streams
FROM VideoBitrateLog
GROUP BY isp_name
HAVING COUNT(*) >= 1000
ORDER BY pct_4k_streams DESC;
```

### Case 155: Ad-Supported Streaming Impressions by Hour
- **Table**: `AdImpressions (ad_id, hour_of_day, revenue_usd)`
```sql
SELECT hour_of_day,
       COUNT(*) AS total_ads_rendered,
       SUM(revenue_usd) AS total_ad_revenue
FROM AdImpressions
GROUP BY hour_of_day
ORDER BY total_ad_revenue DESC;
```

### Case 156: Paywall Free Reads vs Subscription Conversions by Topic
- **Table**: `PaywallEvents (event_id, article_topic, did_subscribe)`
```sql
SELECT article_topic,
       COUNT(*) AS total_paywall_hits,
       SUM(CASE WHEN did_subscribe = TRUE THEN 1 ELSE 0 END) AS new_subscribers,
       ROUND(SUM(CASE WHEN did_subscribe = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS conversion_rate_pct
FROM PaywallEvents
GROUP BY article_topic
ORDER BY new_subscribers DESC;
```

### Case 157: Multiplayer Game Peak Concurrency by Geographic Region
- **Table**: `ServerHeartbeats (heartbeat_id, region, active_players)`
```sql
SELECT region,
       MAX(active_players) AS peak_concurrent_players,
       AVG(active_players) AS avg_concurrent_players
FROM ServerHeartbeats
GROUP BY region
ORDER BY peak_concurrent_players DESC;
```

### Case 158: Trust & Safety Moderation Actions by Review Queue
- **Table**: `ModActions (action_id, queue_name, was_content_removed)`
```sql
SELECT queue_name,
       COUNT(*) AS items_moderated,
       SUM(CASE WHEN was_content_removed = TRUE THEN 1 ELSE 0 END) AS content_takedowns
FROM ModActions
GROUP BY queue_name
ORDER BY items_moderated DESC;
```

### Case 159: Binge-Watching Session Length Distribution
- **Table**: `ViewerSessions (session_id, user_id, episodes_watched)`
```sql
SELECT episodes_watched,
       COUNT(*) AS session_count
FROM ViewerSessions
GROUP BY episodes_watched
ORDER BY episodes_watched ASC;
```

### Case 160: Virtual Economy Gold Volume by Item Rarity
- **Table**: `AuctionSales (item_id, rarity_tier, gold_price)`
```sql
SELECT rarity_tier,
       COUNT(*) AS items_sold,
       SUM(gold_price) AS total_gold_exchanged
FROM AuctionSales
GROUP BY rarity_tier
ORDER BY total_gold_exchanged DESC;
```

---

## Domain 07: Cybersecurity & SecOps (Cases 161 – 170)

### Case 161: Brute-Force IP Subnet Thresholds (`HAVING COUNT >= 20`)
- **Table**: `LoginAudits (event_id, source_subnet, was_success)`
```sql
SELECT source_subnet,
       COUNT(*) AS total_failed_attempts
FROM LoginAudits
WHERE was_success = FALSE
GROUP BY source_subnet
HAVING COUNT(*) >= 20
ORDER BY total_failed_attempts DESC;
```

### Case 162: Unpatched Zero-Day CVE Count by Operating System
- **Table**: `VulnerabilityScans (host_id, os_name, cve_id, cvss_score)`
```sql
SELECT os_name,
       COUNT(DISTINCT host_id) AS vulnerable_hosts,
       COUNT(DISTINCT cve_id) AS unique_cves_present,
       MAX(cvss_score) AS highest_cvss
FROM VulnerabilityScans
GROUP BY os_name
ORDER BY highest_cvss DESC;
```

### Case 163: Cloud Compute Cost by Cost-Center Tag
- **Table**: `CloudBilling (item_id, cost_center_tag, billed_amount_usd)`
```sql
SELECT cost_center_tag,
       SUM(billed_amount_usd) AS total_monthly_spend_usd
FROM CloudBilling
GROUP BY cost_center_tag
HAVING SUM(billed_amount_usd) >= 10000
ORDER BY total_monthly_spend_usd DESC;
```

### Case 164: Simulated Phishing Click Rate by Department
- **Table**: `PhishingCampaign (test_id, department, email_opened, link_clicked)`
```sql
SELECT department,
       COUNT(*) AS emails_sent,
       SUM(CASE WHEN link_clicked = TRUE THEN 1 ELSE 0 END) AS failure_clicks,
       ROUND(SUM(CASE WHEN link_clicked = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS click_rate_pct
FROM PhishingCampaign
GROUP BY department
ORDER BY click_rate_pct DESC;
```

### Case 165: IAM Privileged Role Sprawl per Employee
- **Table**: `RoleAssignments (assignment_id, employee_id, is_admin_role)`
```sql
SELECT employee_id,
       COUNT(*) AS total_roles_assigned,
       SUM(CASE WHEN is_admin_role = TRUE THEN 1 ELSE 0 END) AS admin_roles_count
FROM RoleAssignments
GROUP BY employee_id
HAVING SUM(CASE WHEN is_admin_role = TRUE THEN 1 ELSE 0 END) >= 3
ORDER BY admin_roles_count DESC;
```

### Case 166: Data Loss Prevention (DLP) Exfiltration by Account
- **Table**: `DataExports (export_id, user_id, data_size_mb)`
```sql
SELECT user_id,
       COUNT(*) AS export_events,
       SUM(data_size_mb) AS total_mb_exported
FROM DataExports
GROUP BY user_id
HAVING SUM(data_size_mb) >= 5000
ORDER BY total_mb_exported DESC;
```

### Case 167: Expiring SSL/TLS Certificates by Infrastructure Owner
- **Table**: `CertInventory (cert_id, team_owner, days_until_expiry)`
```sql
SELECT team_owner,
       COUNT(*) AS certs_expiring_soon
FROM CertInventory
WHERE days_until_expiry <= 30
GROUP BY team_owner
ORDER BY certs_expiring_soon DESC;
```

### Case 168: Impossible Travel Geolocation Anomalies
- **Table**: `UserLocations (event_id, user_id, country_code)`
```sql
SELECT user_id,
       COUNT(DISTINCT country_code) AS unique_countries_24h
FROM UserLocations
GROUP BY user_id
HAVING COUNT(DISTINCT country_code) >= 2
ORDER BY unique_countries_24h DESC;
```

### Case 169: Outdated Antivirus Workstations by Office Location
- **Table**: `WorkstationFleet (device_id, office_branch, is_av_outdated)`
```sql
SELECT office_branch,
       COUNT(*) AS total_workstations,
       SUM(CASE WHEN is_av_outdated = TRUE THEN 1 ELSE 0 END) AS non_compliant_devices
FROM WorkstationFleet
GROUP BY office_branch
ORDER BY non_compliant_devices DESC;
```

### Case 170: SOC2 Audit Log Daily Ingestion Volume
- **Table**: `SplunkIngestion (log_id, log_source, raw_bytes)`
```sql
SELECT log_source,
       COUNT(*) AS event_count,
       ROUND(SUM(raw_bytes) / 1073741824.0, 2) AS total_gigabytes_ingested
FROM SplunkIngestion
GROUP BY log_source
ORDER BY total_gigabytes_ingested DESC;
```

---

## Domain 08: Hardware, IoT & Warehouse Robotics (Cases 171 – 180)

### Case 171: Warehouse AMR Collision Near-Misses by Aisle
- **Table**: `AmrLogs (event_id, aisle_id, was_emergency_brake)`
```sql
SELECT aisle_id,
       COUNT(*) AS robot_passages,
       SUM(CASE WHEN was_emergency_brake = TRUE THEN 1 ELSE 0 END) AS emergency_braking_events
FROM AmrLogs
GROUP BY aisle_id
HAVING SUM(CASE WHEN was_emergency_brake = TRUE THEN 1 ELSE 0 END) >= 5
ORDER BY emergency_braking_events DESC;
```

### Case 172: Industrial Robot Arm Vibration Telemetry by Work Cell
- **Table**: `RobotCells (telemetry_id, cell_code, vibration_hz)`
```sql
SELECT cell_code,
       COUNT(*) AS samples_collected,
       ROUND(AVG(vibration_hz), 2) AS average_vibration_hz,
       MAX(vibration_hz) AS peak_vibration_hz
FROM RobotCells
GROUP BY cell_code
ORDER BY peak_vibration_hz DESC;
```

### Case 173: Smart Electric Grid Peak Load by Substation
- **Table**: `SubstationFeeders (reading_id, substation_id, load_mw)`
```sql
SELECT substation_id,
       MAX(load_mw) AS peak_megawatts,
       AVG(load_mw) AS avg_megawatts
FROM SubstationFeeders
GROUP BY substation_id
ORDER BY peak_megawatts DESC;
```

### Case 174: Solar Farm Daily Generation by Inverter
- **Table**: `InverterEnergy (record_id, inverter_id, generated_kwh)`
```sql
SELECT inverter_id,
       SUM(generated_kwh) AS total_daily_kwh,
       AVG(generated_kwh) AS avg_hourly_kwh
FROM InverterEnergy
GROUP BY inverter_id
ORDER BY total_daily_kwh ASC;
```

### Case 175: EV Charging Station Energy Dispensed by Site
- **Table**: `EvChargers (session_id, station_location, energy_delivered_kwh)`
```sql
SELECT station_location,
       COUNT(*) AS charge_sessions,
       SUM(energy_delivered_kwh) AS total_kwh_delivered
FROM EvChargers
GROUP BY station_location
ORDER BY total_kwh_delivered DESC;
```

### Case 176: Datacenter Server Rack Hot-Aisle Maximum Temperatures
- **Table**: `RackThermalSensors (reading_id, rack_row_id, exhaust_temp_c)`
```sql
SELECT rack_row_id,
       ROUND(AVG(exhaust_temp_c), 1) AS avg_temp_c,
       MAX(exhaust_temp_c) AS max_hot_aisle_temp_c
FROM RackThermalSensors
GROUP BY rack_row_id
ORDER BY max_hot_aisle_temp_c DESC;
```

### Case 177: Municipal Water Plant Turbidity Breaches
- **Table**: `WaterPlants (reading_id, plant_id, turbidity_ntu)`
```sql
SELECT plant_id,
       COUNT(*) AS total_samples,
       SUM(CASE WHEN turbidity_ntu > 1.0 THEN 1 ELSE 0 END) AS epa_violation_count
FROM WaterPlants
GROUP BY plant_id
ORDER BY epa_violation_count DESC;
```

### Case 178: Jet Turbine Engine Exhaust Temperatures by Aircraft Fleet
- **Table**: `EngineTelemetry (telemetry_id, aircraft_model, egt_celsius)`
```sql
SELECT aircraft_model,
       COUNT(*) AS flights_recorded,
       ROUND(AVG(egt_celsius), 1) AS avg_egt,
       MAX(egt_celsius) AS max_egt
FROM EngineTelemetry
GROUP BY aircraft_model
ORDER BY max_egt DESC;
```

### Case 179: Smart Farm Average Soil Moisture by Crop Zone
- **Table**: `FieldProbes (probe_id, zone_name, moisture_pct)`
```sql
SELECT zone_name,
       COUNT(*) AS probe_count,
       ROUND(AVG(moisture_pct), 1) AS avg_soil_moisture_pct
FROM FieldProbes
GROUP BY zone_name
ORDER BY avg_soil_moisture_pct ASC;
```

### Case 180: Factory Assembly Line Total Downtime Minutes
- **Table**: `FactoryStoppages (stoppage_id, assembly_line, downtime_minutes)`
```sql
SELECT assembly_line,
       COUNT(*) AS stoppage_incidents,
       SUM(downtime_minutes) AS total_lost_minutes
FROM FactoryStoppages
GROUP BY assembly_line
ORDER BY total_lost_minutes DESC;
```

---

## Domain 09: HR, Payroll & Governance (Cases 181 – 190)

### Case 181: Departmental Headcount, Payroll Total, and Average Compensation
- **Table**: `Employees (id, name, department, salary)`
```sql
SELECT department,
       COUNT(*) AS staff_count,
       SUM(salary) AS total_payroll,
       ROUND(AVG(salary), 2) AS average_salary
FROM Employees
GROUP BY department
ORDER BY total_payroll DESC;
```

### Case 182: Overtime Compliance: Departments Exceeding 200 Weekly OT Hours
- **Table**: `WeeklyPayroll (emp_id, department, overtime_hours)`
```sql
SELECT department,
       COUNT(*) AS employees_working_ot,
       SUM(overtime_hours) AS total_dept_ot_hours
FROM WeeklyPayroll
GROUP BY department
HAVING SUM(overtime_hours) >= 200
ORDER BY total_dept_ot_hours DESC;
```

### Case 183: Executive OKR Performance Bonus Rollup
- **Table**: `BonusRecords (exec_id, business_unit, bonus_payout_usd)`
```sql
SELECT business_unit,
       COUNT(*) AS executives_awarded,
       SUM(bonus_payout_usd) AS total_bonus_distributed
FROM BonusRecords
GROUP BY business_unit
ORDER BY total_bonus_distributed DESC;
```

### Case 184: Pay Equity Audit: Average Salary Comparisons by Job Grade
- **Table**: `PayEquityReview (emp_id, job_grade, gender, base_salary)`
```sql
SELECT job_grade, gender,
       COUNT(*) AS headcount,
       ROUND(AVG(base_salary), 2) AS avg_salary
FROM PayEquityReview
GROUP BY job_grade, gender
ORDER BY job_grade ASC, gender ASC;
```

### Case 185: Annual Paid Time Off (PTO) Unused Accrued Hours
- **Table**: `StaffPto (emp_id, division, unused_pto_hours)`
```sql
SELECT division,
       COUNT(*) AS employee_count,
       SUM(unused_pto_hours) AS total_unused_hours
FROM StaffPto
GROUP BY division
ORDER BY total_unused_hours DESC;
```

### Case 186: Sales Commission Accelerator Payouts by Territory
- **Table**: `CommissionPayouts (rep_id, sales_territory, commission_usd)`
```sql
SELECT sales_territory,
       COUNT(*) AS reps_in_territory,
       SUM(commission_usd) AS total_commissions_paid
FROM CommissionPayouts
GROUP BY sales_territory
ORDER BY total_commissions_paid DESC;
```

### Case 187: Remote Worker Geographic Tax Nexus Headcounts
- **Table**: `RemoteEmployees (emp_id, residential_state, salary)`
```sql
SELECT residential_state,
       COUNT(*) AS remote_headcount,
       SUM(salary) AS total_state_payroll
FROM RemoteEmployees
GROUP BY residential_state
ORDER BY remote_headcount DESC;
```

### Case 188: Employee Turnover Count by Department
- **Table**: `ExitInterviews (interview_id, department, tenure_months)`
```sql
SELECT department,
       COUNT(*) AS departures_count,
       ROUND(AVG(tenure_months), 1) AS avg_tenure_months
FROM ExitInterviews
GROUP BY department
ORDER BY departures_count DESC;
```

### Case 189: Mandatory Compliance Training Completion Percentage
- **Table**: `TrainingProgress (emp_id, division, is_certified)`
```sql
SELECT division,
       COUNT(*) AS total_staff,
       SUM(CASE WHEN is_certified = TRUE THEN 1 ELSE 0 END) AS completed_staff,
       ROUND(SUM(CASE WHEN is_certified = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS completion_pct
FROM TrainingProgress
GROUP BY division
HAVING (SUM(CASE WHEN is_certified = TRUE THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) < 0.90
ORDER BY completion_pct ASC;
```

### Case 190: 401(k) Employer Match Liability by Plan Year
- **Table**: `RetirementLedger (emp_id, plan_year, company_match_usd)`
```sql
SELECT plan_year,
       COUNT(DISTINCT emp_id) AS participating_employees,
       SUM(company_match_usd) AS total_company_match_expenditure
FROM RetirementLedger
GROUP BY plan_year
ORDER BY plan_year DESC;
```

---

## Domain 10: Marketplaces & Social Platforms (Cases 191 – 200)

### Case 191: Ride-Hailing Driver Earnings & Surge Fares by City Zone
- **Table**: `Rides (ride_id, city_zone, fare_amount_usd, surge_multiplier)`
```sql
SELECT city_zone,
       COUNT(*) AS total_trips,
       ROUND(AVG(surge_multiplier), 2) AS avg_surge,
       SUM(fare_amount_usd) AS gross_driver_earnings
FROM Rides
GROUP BY city_zone
ORDER BY gross_driver_earnings DESC;
```

### Case 192: Creator Sponsorship Market: Engagement Rates by Follower Tier
- **Table**: `Creators (creator_id, follower_tier, engagement_rate)`
```sql
SELECT follower_tier,
       COUNT(*) AS creator_count,
       ROUND(AVG(engagement_rate), 2) AS avg_engagement_pct
FROM Creators
GROUP BY follower_tier
ORDER BY avg_engagement_pct DESC;
```

### Case 193: Airbnb Superhost Evaluation: Average Rating & Trips
- **Table**: `Properties (property_id, host_id, review_score, bookings_count)`
```sql
SELECT host_id,
       SUM(bookings_count) AS total_bookings,
       ROUND(AVG(review_score), 2) AS avg_host_rating
FROM Properties
GROUP BY host_id
HAVING SUM(bookings_count) >= 10 AND AVG(review_score) >= 4.80
ORDER BY total_bookings DESC;
```

### Case 194: AdTech Programmatic Ad Bidding: Spend by Category
- **Table**: `AdBids (bid_id, ad_category, winning_cpc_usd)`
```sql
SELECT ad_category,
       COUNT(*) AS impressions_won,
       ROUND(AVG(winning_cpc_usd), 2) AS avg_cpc,
       SUM(winning_cpc_usd) AS total_ad_spend
FROM AdBids
GROUP BY ad_category
ORDER BY total_ad_spend DESC;
```

### Case 195: Food Delivery Courier Tips: Average Tip Percentage
- **Table**: `FoodDeliveries (delivery_id, order_subtotal, tip_amount)`
```sql
SELECT COUNT(*) AS total_deliveries,
       SUM(order_subtotal) AS gross_food_sales,
       SUM(tip_amount) AS total_courier_tips,
       ROUND(SUM(tip_amount) * 100.0 / SUM(order_subtotal), 2) AS avg_tip_pct
FROM FoodDeliveries;
```

### Case 196: Marketplace Counterfeit Risk: Sellers with Flagged Listings
- **Table**: `MarketplaceAudits (audit_id, seller_id, is_counterfeit_flag)`
```sql
SELECT seller_id,
       COUNT(*) AS total_active_listings,
       SUM(CASE WHEN is_counterfeit_flag = TRUE THEN 1 ELSE 0 END) AS flagged_counterfeits
FROM MarketplaceAudits
GROUP BY seller_id
HAVING SUM(CASE WHEN is_counterfeit_flag = TRUE THEN 1 ELSE 0 END) >= 3
ORDER BY flagged_counterfeits DESC;
```

### Case 197: Social Network Signup Velocity by Subnet
- **Table**: `UserRegistrations (reg_id, origin_subnet)`
```sql
SELECT origin_subnet,
       COUNT(*) AS registrations_last_hour
FROM UserRegistrations
GROUP BY origin_subnet
HAVING COUNT(*) >= 50
ORDER BY registrations_last_hour DESC;
```

### Case 198: Dating App Match Conversion Rate by Metro City
- **Table**: `DatingSwipes (swipe_id, metro_city, was_mutual_match)`
```sql
SELECT metro_city,
       COUNT(*) AS total_swipes,
       SUM(CASE WHEN was_mutual_match = TRUE THEN 1 ELSE 0 END) AS total_matches,
       ROUND(SUM(CASE WHEN was_mutual_match = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS match_rate_pct
FROM DatingSwipes
GROUP BY metro_city
ORDER BY total_matches DESC;
```

### Case 199: Real Estate Days-On-Market (DOM) by Neighborhood
- **Table**: `RealtyListings (listing_id, neighborhood, list_price, days_on_market)`
```sql
SELECT neighborhood,
       COUNT(*) AS active_homes,
       ROUND(AVG(list_price), 0) AS avg_home_price,
       ROUND(AVG(days_on_market), 0) AS avg_days_on_market
FROM RealtyListings
GROUP BY neighborhood
ORDER BY avg_days_on_market DESC;
```

### Case 200: Crowdfunding Kickstarter Success Rate by Category
- **Table**: `CrowdfundingProjects (project_id, category, pledged_usd, goal_usd)`
```sql
SELECT category,
       COUNT(*) AS total_campaigns,
       SUM(CASE WHEN pledged_usd >= goal_usd THEN 1 ELSE 0 END) AS successful_campaigns,
       ROUND(SUM(CASE WHEN pledged_usd >= goal_usd THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS success_rate_pct
FROM CrowdfundingProjects
GROUP BY category
ORDER BY success_rate_pct DESC;
```
