# Pillar 3: Relational Multi-Table JOINs — The 100 Enterprise Case Study Master Vault

An exhaustive master catalog of **100 production-grade corporate SQL case studies** testing relational multi-table architecture: `INNER JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, `FULL OUTER JOIN`, `CROSS JOIN`, `SELF JOIN`, anti-joins (`WHERE right.id IS NULL`), multi-table chaining ($3+$ tables), and the critical `ON` vs `WHERE` filter traps across 10 global enterprise industries.

---

## 📑 Directory of the 10 Industry Domains

| Domain # | Industry Vertical | Case Range | Relational JOIN Focus |
|:---|:---|:---|:---|
| **01** | [Fintech & Payments](#domain-01-fintech--payments-cases-201--210) | Cases 201 – 210 | Transactions $\leftrightarrow$ Merchants, referral chains (Self-Join), Anti-Join cardless accounts |
| **02** | [SaaS & Cloud Subscriptions](#domain-02-saas--cloud-subscriptions-cases-211--220) | Cases 211 – 220 | Tenants $\leftrightarrow$ Plans, inactive accounts (Anti-Join), IAM roles (3-Table), Manager Self-Joins |
| **03** | [E-Commerce & Retail](#domain-03-e-commerce--retail-cases-221--230) | Cases 221 – 230 | Orders $\leftrightarrow$ OrderItems $\leftrightarrow$ Products (3-Table), category trees (Self-Join), Size/Color Cross-Joins |
| **04** | [Healthcare & Clinical Systems](#domain-04-healthcare--clinical-systems-cases-231--240) | Cases 231 – 240 | Admissions $\leftrightarrow$ Physicians $\leftrightarrow$ Wards, un-scheduled follow-ups (Anti-Join), Resident-Attending Self-Joins |
| **05** | [Logistics & Fleet Operations](#domain-05-logistics--fleet-operations-cases-241--250) | Cases 241 – 250 | Loads $\leftrightarrow$ Trucks $\leftrightarrow$ Drivers, idle trucks (Anti-Join), container shipments (4-Table), multi-leg Self-Joins |
| **06** | [Media, Streaming & Gaming](#domain-06-media-streaming--gaming-cases-251--260) | Cases 251 – 260 | Tracks $\leftrightarrow$ Albums $\leftrightarrow$ Artists, inactive premium users (Anti-Join), Guild officer Self-Joins |
| **07** | [Cybersecurity & SecOps](#domain-07-cybersecurity--secops-cases-261--270) | Cases 261 – 270 | Host inventory $\leftrightarrow$ CVE scans, unmonitored EC2 instances (Anti-Join), Incident escalation Self-Joins |
| **08** | [Hardware, IoT & Robotics](#domain-08-hardware-iot--robotics-cases-271--280) | Cases 271 – 280 | Robots $\leftrightarrow$ Docks $\leftrightarrow$ Jobs, dead sensors (Anti-Join), sequential time telemetry ($T \leftrightarrow T-1$ Self-Join) |
| **09** | [HR, Payroll & Governance](#domain-09-hr-payroll--governance-cases-281--290) | Cases 281 – 290 | Staff $\leftrightarrow$ Departments $\leftrightarrow$ Locations, org chart hierarchies (Self-Join), non-certified staff (Anti-Join) |
| **10** | [Marketplaces & Social Platforms](#domain-10-marketplaces--social-platforms-cases-291--300) | Cases 291 – 300 | Rides $\leftrightarrow$ Passengers $\leftrightarrow$ Drivers, dormant accounts (Anti-Join), Friend-of-a-Friend recommendation Self-Joins |

---

## Domain 01: Fintech & Payments (Cases 201 – 210)

### Case 201: Card Transactions Joined with Merchant Master
- **Business Context**: Payment processing networks joining incoming raw authorizations with merchant metadata to enrich transaction statements with clean business names and merchant category codes (MCC).
- **Tables**: `Transactions (tx_id, card_id, merchant_id, amount_usd, tx_timestamp)` | `Merchants (merchant_id, legal_name, mcc_code, city, country)`
```sql
SELECT t.tx_id, t.amount_usd, t.tx_timestamp,
       m.legal_name AS merchant_name, m.mcc_code, m.city
FROM Transactions AS t
INNER JOIN Merchants AS m
  ON t.merchant_id = m.merchant_id
ORDER BY t.tx_timestamp DESC;
```

### Case 202: Accounts with No Debit Card Issued (Anti-Join)
- **Business Context**: Retail banking marketing team extracting customer accounts that opened checking accounts but never activated or ordered a debit card.
- **Tables**: `Accounts (account_id, customer_name, account_tier, open_date)` | `DebitCards (card_id, account_id, card_status)`
```sql
SELECT a.account_id, a.customer_name, a.account_tier, a.open_date
FROM Accounts AS a
LEFT JOIN DebitCards AS c
  ON a.account_id = c.account_id
WHERE c.card_id IS NULL;
```

### Case 203: Customer KYC Verification Profile Audit (FULL OUTER JOIN)
- **Business Context**: Compliance audit matching customer profiles against identity document verification records to find unverified customers and unlinked orphan documents.
- **Tables**: `Customers (customer_id, full_name, email)` | `KycDocuments (doc_id, customer_id, id_type, is_verified)`
```sql
SELECT c.customer_id AS client_id, c.full_name,
       k.doc_id, k.id_type, k.is_verified,
       CASE
           WHEN c.customer_id IS NULL THEN 'ORPHAN_DOCUMENT_NO_CUSTOMER'
           WHEN k.doc_id IS NULL THEN 'MISSING_KYC_DOCUMENT'
           ELSE 'VERIFIED_PAIR'
       END AS audit_status
FROM Customers AS a
FULL OUTER JOIN KycDocuments AS k
  ON c.customer_id = k.customer_id;
```

### Case 204: Wire Transfers Screened Against OFAC Sanctions Corridors
- **Business Context**: Treasury wire surveillance cross-referencing SWIFT transfer destination banks against the OFAC sanctions database.
- **Tables**: `WireTransfers (wire_id, dest_bic, amount_usd)` | `SanctionedBanks (bic_code, entity_name, sanction_program)`
```sql
SELECT w.wire_id, w.amount_usd, w.dest_bic,
       s.entity_name, s.sanction_program
FROM WireTransfers AS w
INNER JOIN SanctionedBanks AS s
  ON w.dest_bic = s.bic_code;
```

### Case 205: Loan Application Underwriting: Credit Bureau Matching
- **Business Context**: Consumer lending pipeline matching loan applicants with external credit bureau pull data.
- **Tables**: `LoanApplications (app_id, applicant_ssn_hash, requested_amount)` | `CreditReports (ssn_hash, fico_score, derogatory_marks)`
```sql
SELECT a.app_id, a.requested_amount,
       c.fico_score, c.derogatory_marks
FROM LoanApplications AS a
LEFT JOIN CreditReports AS c
  ON a.applicant_ssn_hash = c.ssn_hash
WHERE a.requested_amount > 20000;
```

### Case 206: Customer Referral Chain Hierarchy (SELF JOIN)
- **Business Context**: Growth engineering tracking referral programs where existing customers invite new customers.
- **Tables**: `Customers (customer_id, full_name, referred_by_id, signup_date)`
```sql
SELECT c.customer_id AS new_user_id,
       c.full_name AS new_user_name,
       r.customer_id AS referrer_user_id,
       r.full_name AS referrer_name
FROM Customers AS c
LEFT JOIN Customers AS r
  ON c.referred_by_id = r.customer_id;
```

### Case 207: ATM Cash Dispense Joined with Terminal Status
- **Business Context**: Armored car scheduling joining withdrawal events with physical ATM terminal health.
- **Tables**: `AtmWithdrawals (tx_id, terminal_id, amount_usd)` | `AtmTerminals (terminal_id, address, cassette_balance)`
```sql
SELECT w.tx_id, w.amount_usd,
       t.terminal_id, t.address, t.cassette_balance
FROM AtmWithdrawals AS w
INNER JOIN AtmTerminals AS t
  ON w.terminal_id = t.terminal_id
WHERE t.cassette_balance < 10000;
```

### Case 208: Crypto Deposits Screened Against Mixer Blacklist (LEFT JOIN)
- **Business Context**: Anti-money laundering surveillance detecting deposits originating from flagged tornado mixers.
- **Tables**: `CryptoDeposits (tx_hash, from_wallet, usd_value)` | `FlaggedMixers (wallet_address, mixer_name)`
```sql
SELECT d.tx_hash, d.from_wallet, d.usd_value,
       COALESCE(m.mixer_name, 'CLEAN_PROVENANCE') AS provenance_status
FROM CryptoDeposits AS d
LEFT JOIN FlaggedMixers AS m
  ON d.from_wallet = m.wallet_address;
```

### Case 209: Commercial Trade Letters of Credit (3-Table JOIN)
- **Business Context**: Supply chain finance linking corporate trade contracts to issuing banks and advising banks.
- **Tables**: `LettersOfCredit (lc_id, buyer_id, issuing_bank_id, advising_bank_id, credit_usd)` | `FinancialInstitutions (bank_id, bank_name, swift_code)`
```sql
SELECT lc.lc_id, lc.credit_usd,
       ib.bank_name AS issuing_bank,
       ab.bank_name AS advising_bank
FROM LettersOfCredit AS lc
INNER JOIN FinancialInstitutions AS ib
  ON lc.issuing_bank_id = ib.bank_id
INNER JOIN FinancialInstitutions AS ab
  ON lc.advising_bank_id = ab.bank_id;
```

### Case 210: Currency Corridor Pair Matrix Generator (CROSS JOIN)
- **Business Context**: Neobank FX trading desk generating all theoretical currency pair trading corridors across supported base currencies.
- **Tables**: `Currencies (iso_code, currency_name)`
```sql
SELECT b.iso_code AS base_currency,
       q.iso_code AS quote_currency,
       CONCAT(b.iso_code, '/', q.iso_code) AS pair_symbol
FROM Currencies AS b
CROSS JOIN Currencies AS q
WHERE b.iso_code != q.iso_code;
```

---

## Domain 02: SaaS & Cloud Subscriptions (Cases 211 – 220)

### Case 211: Active Tenants Joined with Subscription Plan Tiers
- **Business Context**: SaaS billing dashboard displaying company details alongside their active subscription terms.
- **Tables**: `Tenants (tenant_id, company_name, domain)` | `Subscriptions (sub_id, tenant_id, plan_name, monthly_arr)`
```sql
SELECT t.company_name, t.domain,
       s.plan_name, s.monthly_arr
FROM Tenants AS t
INNER JOIN Subscriptions AS s
  ON t.tenant_id = s.tenant_id
WHERE s.plan_name IN ('Enterprise', 'Growth');
```

### Case 212: Active Tenants with Zero Logins in 30 Days (Anti-Join)
- **Business Context**: Customer Success team alerting on paying companies with no user activity in the last month.
- **Tables**: `Tenants (tenant_id, company_name, is_active)` | `UserLogins (login_id, tenant_id, login_timestamp)`
```sql
SELECT t.tenant_id, t.company_name
FROM Tenants AS t
LEFT JOIN UserLogins AS l
  ON t.tenant_id = l.tenant_id
  AND l.login_timestamp >= '2026-08-01'
WHERE t.is_active = TRUE AND l.login_id IS NULL;
```

### Case 213: Support Tickets Joined with Escalation Engineers
- **Business Context**: Helpdesk queue joining customer support tickets with assigned on-call engineering specialists.
- **Tables**: `Tickets (ticket_id, title, priority, assigned_to_id)` | `Engineers (engineer_id, full_name, email, oncall_tier)`
```sql
SELECT t.ticket_id, t.title, t.priority,
       COALESCE(e.full_name, 'UNASSIGNED_TRIAGE') AS engineer_name
FROM Tickets AS t
LEFT JOIN Engineers AS e
  ON t.assigned_to_id = e.engineer_id;
```

### Case 214: Cloud IAM Security: Users $\leftrightarrow$ Roles $\leftrightarrow$ Permissions (3-Table)
- **Business Context**: Security compliance auditing which users hold specific administrative permissions.
- **Tables**: `Users (user_id, email)` | `UserRoles (user_id, role_id)` | `Roles (role_id, role_name, is_privileged)`
```sql
SELECT u.email, r.role_name, r.is_privileged
FROM Users AS u
INNER JOIN UserRoles AS ur
  ON u.user_id = ur.user_id
INNER JOIN Roles AS r
  ON ur.role_id = r.role_id
WHERE r.is_privileged = TRUE;
```

### Case 215: Customer Success Account Manager Hierarchy (SELF JOIN)
- **Business Context**: Organizing account management reps under their reporting VP and directors.
- **Tables**: `AccountManagers (manager_id, full_name, role_title, reports_to_id)`
```sql
SELECT am.full_name AS rep_name, am.role_title,
       COALESCE(ldr.full_name, 'EXECUTIVE_LEAD') AS supervisor_name
FROM AccountManagers AS am
LEFT JOIN AccountManagers AS ldr
  ON am.reports_to_id = ldr.manager_id;
```

### Case 216: Feature Flags Audit: Provisioned vs Consumed (FULL JOIN)
- **Business Context**: Finding feature flags that are provisioned in config but never invoked, and vice-versa.
- **Tables**: `ConfiguredFlags (flag_key, description)` | `TelemetryFlags (flag_key, invocation_count)`
```sql
SELECT COALESCE(c.flag_key, t.flag_key) AS unified_flag,
       c.description, t.invocation_count
FROM ConfiguredFlags AS c
FULL OUTER JOIN TelemetryFlags AS t
  ON c.flag_key = t.flag_key;
```

### Case 217: API Gateway Tokens Joined with Developer Accounts
- **Business Context**: Developer portal linking active bearer tokens to registered organization accounts.
- **Tables**: `ApiTokens (token_id, dev_id, rate_limit)` | `Developers (dev_id, company_name, tier)`
```sql
SELECT t.token_id, t.rate_limit,
       d.company_name, d.tier
FROM ApiTokens AS t
INNER JOIN Developers AS d
  ON t.dev_id = d.dev_id;
```

### Case 218: Multi-Tenant DB Clusters Joined with AWS EC2 Nodes
- **Business Context**: Cloud operations matching logical database tenants to underlying virtual machines.
- **Tables**: `DbInstances (instance_id, tenant_id, ec2_node_id)` | `Ec2Nodes (node_id, instance_type, aws_zone)`
```sql
SELECT d.instance_id, d.tenant_id,
       n.instance_type, n.aws_zone
FROM DbInstances AS d
INNER JOIN Ec2Nodes AS n
  ON d.ec2_node_id = n.node_id;
```

### Case 219: Product Surveys Joined with NPS Scores and Tier
- **Business Context**: Product analytics evaluating user feedback across different subscription tiers.
- **Tables**: `Surveys (survey_id, user_id, feedback_text)` | `Users (user_id, plan_tier)`
```sql
SELECT s.survey_id, s.feedback_text,
       u.plan_tier
FROM Surveys AS s
INNER JOIN Users AS u
  ON s.user_id = u.user_id;
```

### Case 220: Pricing Tier Simulation: Plans Crossed with Add-ons (CROSS JOIN)
- **Business Context**: Financial planning modeling all combinations of subscription plans and optional add-on packs.
- **Tables**: `BasePlans (plan_name, base_price)` | `AddOns (addon_name, addon_price)`
```sql
SELECT p.plan_name, a.addon_name,
       (p.base_price + a.addon_price) AS total_bundle_price
FROM BasePlans AS p
CROSS JOIN AddOns AS a;
```

---

## Domain 03: E-Commerce & Retail (Cases 221 – 230)

### Case 221: Orders $\leftrightarrow$ OrderItems $\leftrightarrow$ Products (Classic 3-Table Join)
- **Business Context**: E-commerce order invoice generation fetching customer orders, itemized lines, and product metadata.
- **Tables**: `Orders (order_id, customer_id, order_date)` | `OrderItems (order_id, product_id, quantity, unit_price)` | `Products (product_id, title, category)`
```sql
SELECT o.order_id, o.order_date,
       p.title AS product_name, p.category,
       oi.quantity, oi.unit_price,
       (oi.quantity * oi.unit_price) AS line_total
FROM Orders AS o
INNER JOIN OrderItems AS oi
  ON o.order_id = oi.order_id
INNER JOIN Products AS p
  ON oi.product_id = p.product_id;
```

### Case 222: Dormant Customers: Accounts with No Orders in 2026 (Anti-Join)
- **Business Context**: Marketing win-back campaign selecting registered customers who placed zero orders this year.
- **Tables**: `Customers (customer_id, full_name, email)` | `Orders (order_id, customer_id, order_date)`
```sql
SELECT c.customer_id, c.full_name, c.email
FROM Customers AS c
LEFT JOIN Orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_date >= '2026-01-01'
WHERE o.order_id IS NULL;
```

### Case 223: Warehouse Bin Locations Joined with Inventory SKUs
- **Business Context**: Fulfillment warehouse pick-and-pack routing pickers to specific bin aisles.
- **Tables**: `WarehouseBins (bin_id, aisle, shelf_level)` | `Inventory (sku, bin_id, quantity_on_hand)`
```sql
SELECT i.sku, i.quantity_on_hand,
       b.aisle, b.shelf_level
FROM Inventory AS i
INNER JOIN WarehouseBins AS b
  ON i.bin_id = b.bin_id;
```

### Case 224: Flash Sale Stock Reconciliation (FULL JOIN)
- **Business Context**: Auditing flash sale allocations: finding physical warehouse inventory without catalog listings, and listings without physical stock.
- **Tables**: `CatalogListings (sku, listed_title)` | `PhysicalWarehouse (sku, physical_units)`
```sql
SELECT COALESCE(c.sku, p.sku) AS master_sku,
       c.listed_title, p.physical_units
FROM CatalogListings AS c
FULL OUTER JOIN PhysicalWarehouse AS p
  ON c.sku = p.sku;
```

### Case 225: Product Category Tree Hierarchy (SELF JOIN)
- **Business Context**: Navigational category breadcrumb generation joining sub-categories to their parent categories.
- **Tables**: `Categories (category_id, category_name, parent_id)`
```sql
SELECT sub.category_id,
       sub.category_name AS subcategory,
       COALESCE(parent.category_name, 'ROOT_DIRECTORY') AS parent_category
FROM Categories AS sub
LEFT JOIN Categories AS parent
  ON sub.parent_id = parent.category_id;
```

### Case 226: Delivery Packages Joined with Carrier SLAs
- **Business Context**: Logistics audit measuring carrier performance by joining packages to contracted delivery SLAs.
- **Tables**: `Shipments (tracking_id, carrier_code, transit_days)` | `Carriers (carrier_code, carrier_name, max_sla_days)`
```sql
SELECT s.tracking_id, c.carrier_name,
       s.transit_days, c.max_sla_days
FROM Shipments AS s
INNER JOIN Carriers AS c
  ON s.carrier_code = c.carrier_code
WHERE s.transit_days > c.max_sla_days;
```

### Case 227: Return Merchandise Authorization (RMA) Audit
- **Business Context**: Customer returns department linking refunds to original purchases and return reason codes.
- **Tables**: `Returns (rma_id, order_id, reason_code)` | `Orders (order_id, customer_id, order_total)`
```sql
SELECT r.rma_id, r.reason_code,
       o.order_id, o.order_total
FROM Returns AS r
INNER JOIN Orders AS o
  ON r.order_id = o.order_id;
```

### Case 228: Promotional Discount Codes Joined with Customer Segments
- **Business Context**: Validating customer eligibility for targeted coupon campaigns.
- **Tables**: `Promotions (promo_code, eligible_segment_id, discount_pct)` | `CustomerSegments (segment_id, segment_name)`
```sql
SELECT p.promo_code, p.discount_pct,
       s.segment_name
FROM Promotions AS p
INNER JOIN CustomerSegments AS s
  ON p.eligible_segment_id = s.segment_id;
```

### Case 229: Third-Party Marketplace Seller Health Audit
- **Business Context**: Marketplace platform joining sellers with their active product listings and complaint records.
- **Tables**: `Sellers (seller_id, store_name)` | `Listings (listing_id, seller_id, is_active)`
```sql
SELECT s.seller_id, s.store_name,
       COUNT(l.listing_id) AS active_listings_count
FROM Sellers AS s
LEFT JOIN Listings AS l
  ON s.seller_id = l.seller_id AND l.is_active = TRUE
GROUP BY s.seller_id, s.store_name;
```

### Case 230: Apparel SKU Matrix Generator: Sizes $\times$ Colors (CROSS JOIN)
- **Business Context**: Product inventory management generating all SKU variants for a new footwear design.
- **Tables**: `Sizes (size_code)` | `Colors (color_name)`
```sql
SELECT 'AIR_SNEAKER_2026' AS product_base,
       s.size_code, c.color_name,
       CONCAT('AIR-26-', s.size_code, '-', c.color_name) AS generated_sku
FROM Sizes AS s
CROSS JOIN Colors AS c;
```

---

## Domain 04: Healthcare & Clinical Systems (Cases 231 – 240)

### Case 231: Patient Admissions $\leftrightarrow$ Physicians $\leftrightarrow$ Wards (3-Table)
- **Business Context**: Hospital intake dashboard linking patient admission records to attending physicians and assigned hospital wards.
- **Tables**: `Admissions (admission_id, patient_id, physician_id, ward_id, admit_date)` | `Physicians (physician_id, doctor_name, specialty)` | `Wards (ward_id, ward_name, floor)`
```sql
SELECT a.admission_id, a.admit_date,
       p.doctor_name, p.specialty,
       w.ward_name, w.floor
FROM Admissions AS a
INNER JOIN Physicians AS p
  ON a.physician_id = p.physician_id
INNER JOIN Wards AS w
  ON a.ward_id = w.ward_id;
```

### Case 232: Discharged Patients with No Follow-Up Visit (Anti-Join)
- **Business Context**: Clinical quality assurance identifying discharged surgical patients who failed to schedule mandatory 14-day follow-ups.
- **Tables**: `Discharges (discharge_id, patient_id, discharge_date)` | `Appointments (appt_id, patient_id, appt_date)`
```sql
SELECT d.discharge_id, d.patient_id, d.discharge_date
FROM Discharges AS d
LEFT JOIN Appointments AS a
  ON d.patient_id = a.patient_id
  AND a.appt_date >= d.discharge_date
WHERE a.appt_id IS NULL;
```

### Case 233: Prescriptions Joined with National Drug Formulary
- **Business Context**: Hospital pharmacy validating that prescribed medications exist on the approved insurance formulary.
- **Tables**: `Prescriptions (rx_id, patient_id, ndc_code, dosage_mg)` | `DrugFormulary (ndc_code, drug_name, tier_coverage)`
```sql
SELECT r.rx_id, r.dosage_mg,
       f.drug_name, f.tier_coverage
FROM Prescriptions AS r
INNER JOIN DrugFormulary AS f
  ON r.ndc_code = f.ndc_code;
```

### Case 234: Hospital Bed Sensors Joined with Emergency Responders
- **Business Context**: Critical care paging system linking bed telemetry alert events to on-call rapid response teams.
- **Tables**: `BedAlarms (alarm_id, bed_id, severity)` | `OnCallRoster (bed_id, nurse_name, pager_number)`
```sql
SELECT a.alarm_id, a.severity,
       r.nurse_name, r.pager_number
FROM BedAlarms AS a
INNER JOIN OnCallRoster AS r
  ON a.bed_id = r.bed_id
WHERE a.severity = 'CRITICAL';
```

### Case 235: Physician Mentorship: Residents to Attendings (SELF JOIN)
- **Business Context**: Teaching hospital administration mapping resident doctors to supervising attending physicians.
- **Tables**: `Physicians (physician_id, full_name, clinical_rank, supervisor_id)`
```sql
SELECT res.full_name AS resident_name, res.clinical_rank,
       COALESCE(att.full_name, 'CHIEF_OF_MEDICINE') AS attending_supervisor
FROM Physicians AS res
LEFT JOIN Physicians AS att
  ON res.supervisor_id = att.physician_id;
```

### Case 236: Insurance Pre-Authorizations Joined with CPT Codes
- **Business Context**: Medical billing matching procedure authorizations against CPT fee schedules.
- **Tables**: `PreAuths (auth_id, cpt_code, is_approved)` | `CptSchedules (cpt_code, procedure_name, base_rate)`
```sql
SELECT p.auth_id, p.is_approved,
       c.procedure_name, c.base_rate
FROM PreAuths AS p
INNER JOIN CptSchedules AS c
  ON p.cpt_code = c.cpt_code;
```

### Case 237: ICU Ventilator Allocation (FULL OUTER JOIN)
- **Business Context**: Hospital disaster management balancing inventory: unassigned ventilators vs unventilated ICU patients.
- **Tables**: `IcuPatients (patient_id, acuity_score, bed_id)` | `Ventilators (serial_no, assigned_bed_id)`
```sql
SELECT COALESCE(p.bed_id, v.assigned_bed_id) AS bed_identifier,
       p.patient_id, p.acuity_score,
       v.serial_no AS ventilator_serial
FROM IcuPatients AS p
FULL OUTER JOIN Ventilators AS v
  ON p.bed_id = v.assigned_bed_id;
```

### Case 238: Clinical Trial Candidates Joined with Gene Screenings
- **Business Context**: Oncology research matching oncology patients to specific target gene mutation criteria.
- **Tables**: `TrialSubjects (subject_id, patient_id)` | `GenePanels (patient_id, mutation_found)`
```sql
SELECT s.subject_id, g.mutation_found
FROM TrialSubjects AS s
INNER JOIN GenePanels AS g
  ON s.patient_id = g.patient_id;
```

### Case 239: Pharmacy Inventory Joined with Wholesale Distributors
- **Business Context**: Drug supply chain tracking supplier fulfillment terms for essential antibiotics.
- **Tables**: `PharmacyInventory (sku, stock_units, distributor_id)` | `Distributors (distributor_id, company_name, lead_days)`
```sql
SELECT i.sku, i.stock_units,
       d.company_name, d.lead_days
FROM PharmacyInventory AS i
INNER JOIN Distributors AS d
  ON i.distributor_id = d.distributor_id;
```

### Case 240: Organ Donor Crossmatch Matrix (CROSS JOIN)
- **Business Context**: Transplant software generating pairwise crossmatch combinations between deceased donors and waitlist candidates.
- **Tables**: `DeceasedDonors (donor_id, blood_type)` | `WaitlistPatients (patient_id, recipient_blood_type)`
```sql
SELECT d.donor_id, d.blood_type AS donor_blood,
       p.patient_id, p.recipient_blood_type
FROM DeceasedDonors AS d
CROSS JOIN WaitlistPatients AS p;
```

---

## Domain 05: Logistics, Supply Chain & Fleet (Cases 241 – 250)

### Case 241: Loads $\leftrightarrow$ Trucks $\leftrightarrow$ Commercial Drivers (3-Table JOIN)
- **Business Context**: Freight dispatch platform connecting shipper freight loads to commercial tractor rigs and licensed CDL drivers.
- **Tables**: `Shipments (load_id, tractor_id, driver_id, destination_city)` | `Tractors (tractor_id, vin_number, model_year)` | `Drivers (driver_id, full_name, cdl_number)`
```sql
SELECT s.load_id, s.destination_city,
       t.vin_number, t.model_year,
       d.full_name AS driver_name, d.cdl_number
FROM Shipments AS s
INNER JOIN Tractors AS t
  ON s.tractor_id = t.tractor_id
INNER JOIN Drivers AS d
  ON s.driver_id = d.driver_id;
```

### Case 242: Idle Semi-Tractors with No Dispatches (Anti-Join)
- **Business Context**: Fleet manager auditing underutilized assets: finding semi-trucks with zero dispatched trips in the last 7 days.
- **Tables**: `TractorFleet (tractor_id, vin, depot_location)` | `Dispatches (dispatch_id, tractor_id, dispatch_date)`
```sql
SELECT t.tractor_id, t.vin, t.depot_location
FROM TractorFleet AS t
LEFT JOIN Dispatches AS d
  ON t.tractor_id = d.tractor_id
  AND d.dispatch_date >= '2026-08-25'
WHERE d.dispatch_id IS NULL;
```

### Case 243: Ocean Shipping Containers (4-Table Relational Chain)
- **Business Context**: Global trade visibility connecting container tracking numbers to ocean vessels, arrival ports, and customs clearance entries.
- **Tables**: `Containers (container_id, bill_of_lading, vessel_id)` | `Vessels (vessel_id, vessel_name, imo_number)` | `PortCalls (vessel_id, port_id)` | `Ports (port_id, port_name, country)`
```sql
SELECT c.container_id, c.bill_of_lading,
       v.vessel_name, p.port_name, p.country
FROM Containers AS c
INNER JOIN Vessels AS v
  ON c.vessel_id = v.vessel_id
INNER JOIN PortCalls AS pc
  ON v.vessel_id = pc.vessel_id
INNER JOIN Ports AS p
  ON pc.port_id = p.port_id;
```

### Case 244: Reefer Freight Temperature Log Joined with Quality Readings
- **Business Context**: Cold-chain perishables monitoring joining temperature readings with pallet inspection results.
- **Tables**: `ReeferPallets (pallet_id, trip_id)` | `SensorTelemetry (trip_id, recorded_temp_c)`
```sql
SELECT p.pallet_id, t.recorded_temp_c
FROM ReeferPallets AS p
INNER JOIN SensorTelemetry AS t
  ON p.trip_id = t.trip_id
WHERE t.recorded_temp_c > 4.0;
```

### Case 245: Intermodal Freight Legs: Primary Haul to Final-Mile (SELF JOIN)
- **Business Context**: Tracking package movement from long-haul line-haul transfer legs to final-mile residential delivery legs.
- **Tables**: `ShipmentLegs (leg_id, package_id, leg_sequence, origin_hub, dest_hub)`
```sql
SELECT l1.package_id,
       l1.origin_hub AS initial_origin,
       l1.dest_hub AS transfer_facility,
       l2.dest_hub AS final_delivery_hub
FROM ShipmentLegs AS l1
INNER JOIN ShipmentLegs AS l2
  ON l1.package_id = l2.package_id
  AND l1.leg_sequence = 1
  AND l2.leg_sequence = 2;
```

### Case 246: Port Berth Allocations (FULL OUTER JOIN)
- **Business Context**: Harbor master balancing terminal occupancy: unberithed arriving container vessels vs empty container berths.
- **Tables**: `ArrivingShips (ship_id, vessel_name, berth_id)` | `PortBerths (berth_id, max_draft_meters)`
```sql
SELECT COALESCE(s.berth_id, b.berth_id) AS berth_number,
       s.vessel_name, b.max_draft_meters
FROM ArrivingShips AS s
FULL OUTER JOIN PortBerths AS b
  ON s.berth_id = b.berth_id;
```

### Case 247: Autonomous Drone Missions Joined with Charging Depots
- **Business Context**: Autonomous drone logistics coordinating landing clearances with battery swap depots.
- **Tables**: `DroneMissions (mission_id, drone_id, depot_id)` | `Depots (depot_id, depot_name, available_pads)`
```sql
SELECT m.mission_id, m.drone_id,
       d.depot_name, d.available_pads
FROM DroneMissions AS m
INNER JOIN Depots AS d
  ON m.depot_id = d.depot_id;
```

### Case 248: Hazmat Freight Cargo Joined with DOT Regulations
- **Business Context**: Road transport safety checking hazardous cargo classifications against transport permit rules.
- **Tables**: `CargoLoads (load_id, un_number)` | `DotRegulations (un_number, hazard_class, tunnel_restriction)`
```sql
SELECT c.load_id, c.un_number,
       r.hazard_class, r.tunnel_restriction
FROM CargoLoads AS c
INNER JOIN DotRegulations AS r
  ON c.un_number = r.un_number;
```

### Case 249: Delivery Package Tracking Joined with Shift Signatures
- **Business Context**: Package proof-of-delivery validation joining delivered packages to driver shifts.
- **Tables**: `DeliveredPackages (package_id, shift_id, recipient_signature)` | `DriverShifts (shift_id, driver_name)`
```sql
SELECT p.package_id, p.recipient_signature,
       s.driver_name
FROM DeliveredPackages AS p
INNER JOIN DriverShifts AS s
  ON p.shift_id = s.shift_id;
```

### Case 250: Shipping Lane Tariff Grid (CROSS JOIN)
- **Business Context**: Freight pricing algorithm calculating rate cards between all operating hub pairs.
- **Tables**: `FreightHubs (hub_code)`
```sql
SELECT h1.hub_code AS origin_hub,
       h2.hub_code AS destination_hub
FROM FreightHubs AS h1
CROSS JOIN FreightHubs AS h2
WHERE h1.hub_code != h2.hub_code;
```

---

## Domain 06: Media, Streaming & Gaming (Cases 251 – 260)

### Case 251: Music Tracks $\leftrightarrow$ Albums $\leftrightarrow$ Artists (3-Table JOIN)
- **Business Context**: Music streaming metadata catalog linking individual tracks to parent albums and primary artists.
- **Tables**: `Tracks (track_id, album_id, title, duration_seconds)` | `Albums (album_id, artist_id, album_title, release_year)` | `Artists (artist_id, artist_name, verified_monthly_listeners)`
```sql
SELECT t.title AS track_name, t.duration_seconds,
       a.album_title, a.release_year,
       art.artist_name
FROM Tracks AS t
INNER JOIN Albums AS a
  ON t.album_id = a.album_id
INNER JOIN Artists AS art
  ON a.artist_id = art.artist_id;
```

### Case 252: Premium Subscribers with Zero Streams (Anti-Join)
- **Business Context**: Subscription churn intervention finding premium users who haven't streamed content in 60 days.
- **Tables**: `Subscribers (user_id, email, plan_type)` | `StreamHistory (stream_id, user_id, stream_date)`
```sql
SELECT s.user_id, s.email, s.plan_type
FROM Subscribers AS s
LEFT JOIN StreamHistory AS h
  ON s.user_id = h.user_id
  AND h.stream_date >= '2026-07-01'
WHERE s.plan_type = 'PREMIUM' AND h.stream_id IS NULL;
```

### Case 253: Esports Match Participants Joined with Champion Statistics
- **Business Context**: Competitive tournament telemetry matching gamer accounts to character classes and win states.
- **Tables**: `MatchParticipants (participant_id, player_tag, champion_id, did_win)` | `Champions (champion_id, champion_name, role_class)`
```sql
SELECT p.player_tag, p.did_win,
       c.champion_name, c.role_class
FROM MatchParticipants AS p
INNER JOIN Champions AS c
  ON p.champion_id = c.champion_id;
```

### Case 254: Video Streaming Sessions Joined with CDN Edge Nodes
- **Business Context**: Streaming infrastructure monitoring matching client viewing sessions to origin CDN pops.
- **Tables**: `StreamSessions (session_id, cdn_pop_id, bitrate_kbps)` | `CdnPops (pop_id, city, latency_ms)`
```sql
SELECT s.session_id, s.bitrate_kbps,
       c.city, c.latency_ms
FROM StreamSessions AS s
INNER JOIN CdnPops AS c
  ON s.cdn_pop_id = c.pop_id;
```

### Case 255: Gaming Clan Guild Officer Hierarchy (SELF JOIN)
- **Business Context**: MMO gaming guild management mapping guild members to squad leaders and guildmasters.
- **Tables**: `GuildMembers (member_id, gamer_tag, guild_rank, officer_id)`
```sql
SELECT m.gamer_tag AS player_name, m.guild_rank,
       COALESCE(o.gamer_tag, 'GUILD_MASTER') AS squad_leader
FROM GuildMembers AS m
LEFT JOIN GuildMembers AS o
  ON m.officer_id = o.member_id;
```

### Case 256: Content Licensing Audit: Rights vs Catalog (FULL JOIN)
- **Business Context**: Legal streaming audit matching active content licenses against live streaming catalog files.
- **Tables**: `LicensingContracts (license_id, content_title)` | `LiveCatalog (catalog_id, content_title)`
```sql
SELECT COALESCE(l.content_title, c.content_title) AS media_title,
       CASE
           WHEN l.license_id IS NULL THEN 'UNLICENSED_LIVE_CONTENT_VIOLATION'
           WHEN c.catalog_id IS NULL THEN 'PAID_LICENSE_NOT_INGESTED'
           ELSE 'COMPLIANT_ACTIVE_TITLE'
       END AS legal_compliance_state
FROM LicensingContracts AS l
FULL OUTER JOIN LiveCatalog AS c
  ON l.content_title = c.content_title;
```

### Case 257: UGC Moderation Queue Joined with Reviewer Actions
- **Business Context**: Trust & Safety moderation tracking user comments and moderator enforcement decisions.
- **Tables**: `ReportedComments (comment_id, raw_text, reviewer_id)` | `Moderators (reviewer_id, moderator_handle)`
```sql
SELECT c.comment_id, c.raw_text,
       COALESCE(m.moderator_handle, 'BOT_AUTOMATION') AS reviewed_by
FROM ReportedComments AS c
LEFT JOIN Moderators AS m
  ON c.reviewer_id = m.reviewer_id;
```

### Case 258: Ad-Supported Streaming: Breaks Joined with High-Bid Ads
- **Business Context**: Ad server auction engine joining commercial break pods to winning video advertisements.
- **Tables**: `AdPods (pod_id, video_id, timestamp_sec)` | `Commercials (pod_id, sponsor_name, bid_cpm_usd)`
```sql
SELECT p.pod_id, p.timestamp_sec,
       c.sponsor_name, c.bid_cpm_usd
FROM AdPods AS p
INNER JOIN Commercials AS c
  ON p.pod_id = c.pod_id;
```

### Case 259: Digital Comic Books Joined with Creative Contributors
- **Business Context**: Digital publisher catalog linking comic book releases to illustrators and writers.
- **Tables**: `Comics (comic_id, title, writer_id, artist_id)` | `Creators (creator_id, creator_name)`
```sql
SELECT c.title,
       w.creator_name AS writer,
       a.creator_name AS illustrator
FROM Comics AS c
INNER JOIN Creators AS w
  ON c.writer_id = w.creator_id
INNER JOIN Creators AS a
  ON c.artist_id = a.creator_id;
```

### Case 260: Round-Robin Tournament Match Fixtures (CROSS JOIN)
- **Business Context**: Esports tournament brackets pairing every team against all other teams in the group stage.
- **Tables**: `Teams (team_id, team_name)`
```sql
SELECT t1.team_name AS team_home,
       t2.team_name AS team_away
FROM Teams AS t1
CROSS JOIN Teams AS t2
WHERE t1.team_id < t2.team_id;
```

---

## Domain 07: Cybersecurity & SecOps (Cases 261 – 270)

### Case 261: Server Host Inventory Joined with CVE Scans & Severity
- **Business Context**: SecOps vulnerability scanner matching production servers with detected zero-day vulnerabilities.
- **Tables**: `Hosts (host_id, hostname, ip_address, env)` | `Vulnerabilities (vuln_id, host_id, cve_id, cvss_score)`
```sql
SELECT h.hostname, h.ip_address, h.env,
       v.cve_id, v.cvss_score
FROM Hosts AS h
INNER JOIN Vulnerabilities AS v
  ON h.host_id = v.host_id
WHERE v.cvss_score >= 9.0;
```

### Case 262: Unmonitored Cloud EC2 Nodes: No Agent Installed (Anti-Join)
- **Business Context**: Cloud compliance scanner identifying running AWS EC2 virtual machines with no security agent.
- **Tables**: `Ec2Instances (instance_id, instance_name, private_ip)` | `SecurityAgents (agent_id, instance_id, agent_status)`
```sql
SELECT i.instance_id, i.instance_name, i.private_ip
FROM Ec2Instances AS i
LEFT JOIN SecurityAgents AS a
  ON i.instance_id = a.instance_id
WHERE a.agent_id IS NULL;
```

### Case 263: Auth Audit Logs Joined with Geolocation Threat Intel
- **Business Context**: Security Operations Center (SOC) enriching IP authentication attempts with threat intelligence feeds.
- **Tables**: `AuthLogs (log_id, source_ip, user_id)` | `ThreatIntel (ip_cidr, risk_rating, country)`
```sql
SELECT a.log_id, a.source_ip, a.user_id,
       t.risk_rating, t.country
FROM AuthLogs AS a
INNER JOIN ThreatIntel AS t
  ON a.source_ip = t.ip_cidr
WHERE t.risk_rating = 'MALICIOUS';
```

### Case 264: Corporate Laptops Joined with Employee Directory
- **Business Context**: IT endpoint asset management verifying that every laptop is assigned to an active corporate employee.
- **Tables**: `Laptops (serial_no, asset_tag, assigned_emp_id)` | `Employees (emp_id, full_name, department)`
```sql
SELECT l.serial_no, l.asset_tag,
       COALESCE(e.full_name, 'UNASSIGNED_DEPOT_SPARE') AS assigned_user,
       COALESCE(e.department, 'IT_STOCKROOM') AS department
FROM Laptops AS l
LEFT JOIN Employees AS e
  ON l.assigned_emp_id = e.emp_id;
```

### Case 265: Security Incident Escalation Tree (SELF JOIN)
- **Business Context**: SOC tier escalation workflow routing alerts from Tier 1 triage analysts to Tier 3 incident commanders.
- **Tables**: `SecurityAnalysts (analyst_id, name, tier_level, escalation_lead_id)`
```sql
SELECT a.name AS triage_analyst, a.tier_level,
       COALESCE(lead.name, 'CISO_DIRECT') AS escalation_commander
FROM SecurityAnalysts AS a
LEFT JOIN SecurityAnalysts AS lead
  ON a.escalation_lead_id = lead.analyst_id;
```

### Case 266: Firewall Ingress Ports vs Open Services (FULL OUTER JOIN)
- **Business Context**: Attack surface audit comparing open firewall security group ports with active listening services.
- **Tables**: `FirewallRules (rule_id, allowed_port)` | `ListeningServices (service_id, active_port, daemon_name)`
```sql
SELECT COALESCE(f.allowed_port, s.active_port) AS port_number,
       s.daemon_name,
       CASE
           WHEN f.rule_id IS NULL THEN 'UNAUTHORIZED_OPEN_SERVICE'
           WHEN s.service_id IS NULL THEN 'FIREWALL_PORT_UNUSED'
           ELSE 'AUTHORIZED_LISTENING'
       END AS port_security_state
FROM FirewallRules AS f
FULL OUTER JOIN ListeningServices AS s
  ON f.allowed_port = s.active_port;
```

### Case 267: Single Sign-On (SSO) Sessions Joined with MFA Push Tokens
- **Business Context**: Identity provider joining authentication events with multi-factor authentication tokens.
- **Tables**: `SsoSessions (session_id, user_id, auth_time)` | `MfaTokens (session_id, token_type, is_approved)`
```sql
SELECT s.session_id, s.user_id, s.auth_time,
       m.token_type, m.is_approved
FROM SsoSessions AS s
INNER JOIN MfaTokens AS m
  ON s.session_id = m.session_id;
```

### Case 268: Phishing Campaign Targets Joined with Department Orgs
- **Business Context**: Security awareness training evaluating employee susceptibility across business divisions.
- **Tables**: `PhishingTests (test_id, emp_id, did_click)` | `Employees (emp_id, department)`
```sql
SELECT p.test_id, p.did_click,
       e.department
FROM PhishingTests AS p
INNER JOIN Employees AS e
  ON p.emp_id = e.emp_id;
```

### Case 269: Data Loss Prevention (DLP) Joined with File Sensitivity
- **Business Context**: DLP agent joining outbound file transfer logs with data classification labels.
- **Tables**: `FileTransfers (transfer_id, file_id, transfer_mb)` | `FileClassifications (file_id, classification_tag)`
```sql
SELECT t.transfer_id, t.transfer_mb,
       c.classification_tag
FROM FileTransfers AS t
INNER JOIN FileClassifications AS c
  ON t.file_id = c.file_id
WHERE c.classification_tag IN ('CONFIDENTIAL', 'SECRET');
```

### Case 270: Perimeter Attack Surface Testing (CROSS JOIN)
- **Business Context**: Penetration testing matrix pairing all external corporate IP addresses against standard exploit ports.
- **Tables**: `ExternalIps (ip_address)` | `ProbePorts (port_number)`
```sql
SELECT i.ip_address, p.port_number
FROM ExternalIps AS i
CROSS JOIN ProbePorts AS p;
```

---

## Domain 08: Hardware, IoT & Warehouse Robotics (Cases 271 – 280)

### Case 271: Warehouse AMRs Joined with Workcells & Jobs (3-Table)
- **Business Context**: Warehouse robotics scheduler tracking mobile robots, their current docking stations, and assigned pallet transit jobs.
- **Tables**: `Robots (robot_id, battery_pct, current_cell_id)` | `Workcells (cell_id, cell_name, aisle)` | `ActiveJobs (job_id, robot_id, priority)`
```sql
SELECT r.robot_id, r.battery_pct,
       w.cell_name, w.aisle,
       j.job_id, j.priority
FROM Robots AS r
INNER JOIN Workcells AS w
  ON r.current_cell_id = w.cell_id
LEFT JOIN ActiveJobs AS j
  ON r.robot_id = j.robot_id;
```

### Case 272: Decommissioned Sensors: Zero Telemetry in 90 Days (Anti-Join)
- **Business Context**: IoT fleet operations finding field telemetry sensors that have stopped transmitting signals.
- **Tables**: `Sensors (sensor_id, serial_number, install_location)` | `Telemetry (reading_id, sensor_id, timestamp)`
```sql
SELECT s.sensor_id, s.serial_number, s.install_location
FROM Sensors AS s
LEFT JOIN Telemetry AS t
  ON s.sensor_id = t.sensor_id
  AND t.timestamp >= '2026-06-01'
WHERE t.reading_id IS NULL;
```

### Case 273: Industrial Robotic Arms Joined with Maintenance Work Orders
- **Business Context**: Automotive manufacturing factory line tracking mechanical welding arms and preventative maintenance.
- **Tables**: `RobotArms (arm_id, line_code, operating_hours)` | `WorkOrders (order_id, arm_id, technician_name, status)`
```sql
SELECT a.arm_id, a.line_code, a.operating_hours,
       w.technician_name, w.status
FROM RobotArms AS a
LEFT JOIN WorkOrders AS w
  ON a.arm_id = w.arm_id;
```

### Case 274: Smart Grid Substations Joined with Transformer Readings
- **Business Context**: Electrical utility grid joining regional substation feeders to high-voltage transformer readings.
- **Tables**: `Substations (substation_id, region_name)` | `Transformers (transformer_id, substation_id, load_kva)`
```sql
SELECT s.substation_id, s.region_name,
       t.transformer_id, t.load_kva
FROM Substations AS s
INNER JOIN Transformers AS t
  ON s.substation_id = t.substation_id;
```

### Case 275: Sequential Telemetry: Current vs Previous Reading (SELF JOIN)
- **Business Context**: Industrial anomaly detection comparing current sensor temperature against the immediately preceding reading to catch sudden spikes.
- **Tables**: `SensorReadings (reading_id, sensor_id, reading_sequence, temp_c)`
```sql
SELECT curr.sensor_id, curr.reading_sequence,
       curr.temp_c AS current_temp,
       prev.temp_c AS previous_temp,
       (curr.temp_c - prev.temp_c) AS temp_delta
FROM SensorReadings AS curr
INNER JOIN SensorReadings AS prev
  ON curr.sensor_id = prev.sensor_id
  AND curr.reading_sequence = prev.reading_sequence + 1
WHERE (curr.temp_c - prev.temp_c) >= 10.0;
```

### Case 276: Solar Farm Photovoltaic Panels vs Inverters (FULL JOIN)
- **Business Context**: Solar farm audit balancing physical panel strings against functioning solar inverter channels.
- **Tables**: `SolarStrings (string_id, inverter_channel)` | `InverterChannels (channel_id, status)`
```sql
SELECT COALESCE(s.inverter_channel, i.channel_id) AS channel_id,
       i.status AS channel_status
FROM SolarStrings AS s
FULL OUTER JOIN InverterChannels AS i
  ON s.inverter_channel = i.channel_id;
```

### Case 277: EV Charging Stations Joined with Energy Tariffs
- **Business Context**: Electric vehicle network calculating charging session costs based on regional utility rates.
- **Tables**: `EvSessions (session_id, station_id, kwh_delivered)` | `ChargingStations (station_id, rate_per_kwh)`
```sql
SELECT s.session_id, s.kwh_delivered,
       (s.kwh_delivered * c.rate_per_kwh) AS calculated_cost_usd
FROM EvSessions AS s
INNER JOIN ChargingStations AS c
  ON s.station_id = c.station_id;
```

### Case 278: Municipal Water Valves Joined with Pressure Sensors
- **Business Context**: Water utility matching distribution gate valves with downstream pressure transducers.
- **Tables**: `Valves (valve_id, zone_id)` | `PressureSensors (sensor_id, zone_id, current_psi)`
```sql
SELECT v.valve_id, s.sensor_id, s.current_psi
FROM Valves AS v
INNER JOIN PressureSensors AS s
  ON v.zone_id = s.zone_id;
```

### Case 279: Jet Aircraft Turbine Engines Joined with Flight Overhauls
- **Business Context**: Airline safety compliance joining jet engine serial numbers to major depot inspection logs.
- **Tables**: `Engines (engine_serial, aircraft_tail_no)` | `OverhaulRecords (overhaul_id, engine_serial, inspect_date)`
```sql
SELECT e.engine_serial, e.aircraft_tail_no,
       o.overhaul_id, o.inspect_date
FROM Engines AS e
LEFT JOIN OverhaulRecords AS o
  ON e.engine_serial = o.engine_serial;
```

### Case 280: Microcontroller Firmware Compatibility Matrix (CROSS JOIN)
- **Business Context**: Embedded hardware QA generating testing matrix of all hardware revisions crossed with firmware builds.
- **Tables**: `HardwareRevisions (board_rev)` | `FirmwareBuilds (firmware_version)`
```sql
SELECT h.board_rev, f.firmware_version
FROM HardwareRevisions AS h
CROSS JOIN FirmwareBuilds AS f;
```

---

## Domain 09: HR, Payroll & Governance (Cases 281 – 290)

### Case 281: Staff $\leftrightarrow$ Departments $\leftrightarrow$ Physical Offices (3-Table)
- **Business Context**: Corporate directory joining employee records with departmental titles and physical office campuses.
- **Tables**: `Employees (emp_id, full_name, dept_id, office_id)` | `Departments (dept_id, dept_name)` | `Offices (office_id, building_name, city)`
```sql
SELECT e.full_name, d.dept_name,
       o.building_name, o.city
FROM Employees AS e
INNER JOIN Departments AS d
  ON e.dept_id = d.dept_id
INNER JOIN Offices AS o
  ON e.office_id = o.office_id;
```

### Case 282: Ghost Employees & Empty Departments (FULL OUTER JOIN)
- **Business Context**: Enterprise HR reorganizations: finding unassigned employees with no department, and empty departments with no employees.
- **Tables**: `Employees (emp_id, full_name, dept_id)` | `Departments (dept_id, dept_name)`
```sql
SELECT e.emp_id, e.full_name,
       d.dept_id, d.dept_name,
       CASE
           WHEN e.emp_id IS NULL THEN 'VACANT_DEPARTMENT_NO_STAFF'
           WHEN d.dept_id IS NULL THEN 'ORPHAN_EMPLOYEE_NO_DEPARTMENT'
           ELSE 'VALID_DEPARTMENT_ASSIGNMENT'
       END AS org_chart_status
FROM Employees AS e
FULL OUTER JOIN Departments AS d
  ON e.dept_id = d.dept_id;
```

### Case 283: Non-Certified Staff: Mandatory Training Incomplete (Anti-Join)
- **Business Context**: Corporate compliance audit isolating employees who have NOT completed required anti-bribery and cybersecurity courses.
- **Tables**: `Employees (emp_id, full_name, email)` | `TrainingCompletions (completion_id, emp_id, course_name)`
```sql
SELECT e.emp_id, e.full_name, e.email
FROM Employees AS e
LEFT JOIN TrainingCompletions AS t
  ON e.emp_id = t.emp_id
  AND t.course_name = '2026_CYBER_COMPLIANCE'
WHERE t.completion_id IS NULL;
```

### Case 284: Employee Management Org Chart Hierarchy (SELF JOIN)
- **Business Context**: Standard corporate org chart mapping each employee to their direct manager.
- **Tables**: `Employees (emp_id, full_name, role_title, manager_id)`
```sql
SELECT emp.emp_id, emp.full_name AS employee_name, emp.role_title,
       COALESCE(mgr.full_name, 'CHIEF_EXECUTIVE_OFFICER') AS direct_manager
FROM Employees AS emp
LEFT JOIN Employees AS mgr
  ON emp.manager_id = mgr.emp_id;
```

### Case 285: Staff Joined with Equity Stock Option Grants
- **Business Context**: Executive compensation review joining employee records with stock option vesting grants.
- **Tables**: `Employees (emp_id, full_name, salary)` | `EquityGrants (grant_id, emp_id, shares_granted)`
```sql
SELECT e.full_name, e.salary,
       COALESCE(g.shares_granted, 0) AS total_shares
FROM Employees AS e
LEFT JOIN EquityGrants AS g
  ON e.emp_id = g.emp_id;
```

### Case 286: Remote Workers Joined with State Tax Nexus Entities
- **Business Context**: Payroll tax audit verifying which legal entity covers remote employees in specific residential states.
- **Tables**: `RemoteStaff (emp_id, residential_state)` | `StateNexus (state_code, registered_entity_name)`
```sql
SELECT s.emp_id, s.residential_state,
       n.registered_entity_name
FROM RemoteStaff AS s
INNER JOIN StateNexus AS n
  ON s.residential_state = n.state_code;
```

### Case 287: Job Openings Joined with Candidate Applications
- **Business Context**: Recruiting ATS linking active open requisitions to candidate pipelines.
- **Tables**: `JobRequisitions (job_id, role_title)` | `JobApplications (app_id, job_id, candidate_name)`
```sql
SELECT r.job_id, r.role_title,
       a.app_id, a.candidate_name
FROM JobRequisitions AS r
LEFT JOIN JobApplications AS a
  ON r.job_id = a.job_id;
```

### Case 288: Annual Performance Reviews Joined with OKR Goals
- **Business Context**: HR talent management evaluating performance ratings alongside completed quarterly objectives.
- **Tables**: `PerformanceReviews (review_id, emp_id, rating_1_to_5)` | `OkrGoals (goal_id, emp_id, pct_complete)`
```sql
SELECT p.emp_id, p.rating_1_to_5,
       o.goal_id, o.pct_complete
FROM PerformanceReviews AS p
INNER JOIN OkrGoals AS o
  ON p.emp_id = o.emp_id;
```

### Case 289: 401(k) Retirement Contributions Joined with Portfolios
- **Business Context**: Employee benefits administration tracking 401k salary deductions into selected investment funds.
- **Tables**: `EmployeeDeductions (emp_id, deduction_usd, fund_id)` | `RetirementFunds (fund_id, fund_name)`
```sql
SELECT d.emp_id, d.deduction_usd,
       f.fund_name
FROM EmployeeDeductions AS d
INNER JOIN RetirementFunds AS f
  ON d.fund_id = f.fund_id;
```

### Case 290: Executive Peer Mentorship Matching Matrix (CROSS JOIN)
- **Business Context**: Executive leadership program pairing department VPs for cross-functional 360 review sessions.
- **Tables**: `Executives (exec_id, full_name, department)`
```sql
SELECT e1.full_name AS executive_a,
       e2.full_name AS executive_b
FROM Executives AS e1
CROSS JOIN Executives AS e2
WHERE e1.exec_id < e2.exec_id AND e1.department != e2.department;
```

---

## Domain 10: Marketplaces & Social Platforms (Cases 291 – 300)

### Case 291: Rides $\leftrightarrow$ Passengers $\leftrightarrow$ Driver Fleets (3-Table JOIN)
- **Business Context**: Ride-hailing dispatch platform linking trips to rider profiles and licensed drivers.
- **Tables**: `Rides (ride_id, passenger_id, driver_id, fare_usd)` | `Passengers (passenger_id, passenger_name)` | `Drivers (driver_id, driver_name, rating)`
```sql
SELECT r.ride_id, r.fare_usd,
       p.passenger_name,
       d.driver_name, d.rating AS driver_rating
FROM Rides AS r
INNER JOIN Passengers AS p
  ON r.passenger_id = p.passenger_id
INNER JOIN Drivers AS d
  ON r.driver_id = d.driver_id;
```

### Case 292: Dormant Drivers: Approved with Zero Fares (Anti-Join)
- **Business Context**: Driver onboarding team isolating gig drivers who passed background checks but never accepted their first ride.
- **Tables**: `ApprovedDrivers (driver_id, full_name, onboard_date)` | `CompletedTrips (trip_id, driver_id)`
```sql
SELECT d.driver_id, d.full_name, d.onboard_date
FROM ApprovedDrivers AS d
LEFT JOIN CompletedTrips AS t
  ON d.driver_id = t.driver_id
WHERE t.trip_id IS NULL;
```

### Case 293: Vacation Listings Joined with Host Profiles & Reviews
- **Business Context**: Airbnb marketplace displaying property listings alongside verified host credentials.
- **Tables**: `Listings (listing_id, host_id, nightly_rate)` | `Hosts (host_id, host_name, is_superhost)`
```sql
SELECT l.listing_id, l.nightly_rate,
       h.host_name, h.is_superhost
FROM Listings AS l
INNER JOIN Hosts AS h
  ON l.host_id = h.host_id;
```

### Case 294: Programmatic Ad Bidding: Impressions Joined with Campaigns
- **Business Context**: AdTech exchange matching real-time ad impressions to winning advertiser campaigns.
- **Tables**: `AdImpressions (impression_id, campaign_id, winning_cpc)` | `Campaigns (campaign_id, advertiser_name)`
```sql
SELECT i.impression_id, i.winning_cpc,
       c.advertiser_name
FROM AdImpressions AS i
INNER JOIN Campaigns AS c
  ON i.campaign_id = c.campaign_id;
```

### Case 295: Social Network Friend Recommendations (SELF JOIN)
- **Business Context**: Graph algorithm finding "Friends of Friends" who are not yet directly connected.
- **Tables**: `Friendships (user_id, friend_id)`
```sql
SELECT f1.user_id AS me,
       f2.friend_id AS recommended_friend
FROM Friendships AS f1
INNER JOIN Friendships AS f2
  ON f1.friend_id = f2.user_id
WHERE f1.user_id != f2.friend_id;
```

### Case 296: Crowdfunding Backers Joined with Reward Tiers
- **Business Context**: Kickstarter fulfillment platform matching backer pledges to specific manufacturing reward shipments.
- **Tables**: `Backers (backer_id, campaign_id, pledge_usd, tier_id)` | `RewardTiers (tier_id, tier_name, est_delivery_month)`
```sql
SELECT b.backer_id, b.pledge_usd,
       t.tier_name, t.est_delivery_month
FROM Backers AS b
INNER JOIN RewardTiers AS t
  ON b.tier_id = t.tier_id;
```

### Case 297: Food Delivery: Orders $\leftrightarrow$ Restaurants $\leftrightarrow$ Couriers (4-Table)
- **Business Context**: Food delivery tracking connecting customer orders to restaurants, pickup couriers, and delivery addresses.
- **Tables**: `Orders (order_id, restaurant_id, courier_id, customer_id)` | `Restaurants (restaurant_id, restaurant_name)` | `Couriers (courier_id, courier_name)` | `Customers (customer_id, customer_name, address)`
```sql
SELECT o.order_id,
       r.restaurant_name,
       c.courier_name,
       cust.customer_name, cust.address
FROM Orders AS o
INNER JOIN Restaurants AS r
  ON o.restaurant_id = r.restaurant_id
INNER JOIN Couriers AS c
  ON o.courier_id = c.courier_id
INNER JOIN Customers AS cust
  ON o.customer_id = cust.customer_id;
```

### Case 298: Freelance Contracts Joined with Escrow Milestones
- **Business Context**: Upwork marketplace tracking milestone escrow payments on active developer contracts.
- **Tables**: `Contracts (contract_id, client_id, freelancer_id)` | `Milestones (milestone_id, contract_id, amount_usd, is_released)`
```sql
SELECT c.contract_id, c.client_id, c.freelancer_id,
       m.milestone_id, m.amount_usd, m.is_released
FROM Contracts AS c
INNER JOIN Milestones AS m
  ON c.contract_id = m.contract_id;
```

### Case 299: Dating App Mutual Matches (FULL OUTER JOIN)
- **Business Context**: Dating platform auditing swipe interactions: finding asymmetric likes vs mutual reciprocal matches.
- **Tables**: `LeftSwipes (user_a_id, user_b_id)` | `RightSwipes (user_b_id, user_a_id)`
```sql
SELECT COALESCE(l.user_a_id, r.user_a_id) AS user_1,
       COALESCE(l.user_b_id, r.user_b_id) AS user_2
FROM LeftSwipes AS l
FULL OUTER JOIN RightSwipes AS r
  ON l.user_a_id = r.user_a_id AND l.user_b_id = r.user_b_id;
```

### Case 300: Seeded Tournament Matchmaker Brackets (CROSS JOIN)
- **Business Context**: Competitive chess platform generating initial pairing brackets for grandmaster open tournaments.
- **Tables**: `WhiteSeeds (player_id, player_name)` | `BlackSeeds (player_id, player_name)`
```sql
SELECT w.player_name AS white_player,
       b.player_name AS black_player
FROM WhiteSeeds AS w
CROSS JOIN BlackSeeds AS b
WHERE w.player_id != b.player_id;
```
