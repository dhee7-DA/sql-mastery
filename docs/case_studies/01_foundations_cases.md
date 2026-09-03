# Pillar 1: Foundations & Control Flow — 15 Enterprise Case Studies

This master reference compiles 15 real-world corporate data analytics scenarios across Fintech, SaaS, E-Commerce, Healthcare, Logistics, and Cybersecurity. Each case study isolates foundational SQL concepts: `SELECT`, `FROM`, `WHERE`, `DISTINCT`, `ORDER BY`, `LIMIT`, `CASE WHEN`, `BETWEEN`, `LIKE`, `IN`, and `NULL` handling.

---

## 📑 Master Case Study Catalog

| # | Industry | Case Study Title | Core SQL Focus |
|---|---|---|---|
| **01** | Fintech / Payments | Stripe Transaction Fraud Velocity Tripwire | `CASE WHEN`, Multiple `AND` Conditions |
| **02** | Fintech / Banking | Prime Customer Acquisition & Credit Limit Scaffolding | `DISTINCT`, Numeric Expressions, `WHERE` |
| **03** | SaaS / Subscriptions | B2B Account Churn Risk & Contraction Classifier | `CASE WHEN`, Null-Safe Booleans |
| **04** | SaaS / Cloud Infra | Freemium Cloud Compute Gatekeeper & Upgrade Tiers | Range Comparisons, `OR` Precedence |
| **05** | E-Commerce / Retail | VIP Customer Tiering & Loyalty Point Multipliers | `CASE WHEN`, Sorting Tie-Breakers |
| **06** | E-Commerce / Supply | Express vs Standard Fulfillment SLA Routing | Predicate Filtering, String Normalization |
| **07** | Healthcare / Clinical | Emergency Room Triage Acuity Matrix (ESI Tiers) | Nested Multi-Branch `CASE WHEN` |
| **08** | Healthcare / Pharma | Pediatric Dosage Safety Boundary Validator | `BETWEEN ... AND`, Unit Filtering |
| **09** | Logistics / Fleet | Autonomous Delivery Drone Battery & Cargo Gate | Multi-Column Inequalities, `ORDER BY` |
| **10** | Logistics / 3PL | Carrier Late Delivery Penalty Escalation | `CASE WHEN`, Numeric Deltas |
| **11** | Media / Streaming | Content Age-Gate & Parental Advisory Routing | Set Membership (`IN`), String Wildcards (`LIKE`) |
| **12** | Cybersecurity / SecOps | Brute-Force IP Lockout & Anomaly Detection | Wildcards (`LIKE`), Pattern Filters |
| **13** | HR / Governance | Executive Equity Vesting & Performance Bonus Allocation | `CASE WHEN` Over Multiple Quantiles |
| **14** | Hardware / Robotics | Sensor Distance Triangle Geometry QC | Short-Circuit Waterfall Logic, Triangle Theorem |
| **15** | Banking / AML | Anti-Money Laundering (AML) Structuring Tripwire | High-Precision Range Matching (`BETWEEN`) |

---

## Case Study 01: Stripe Transaction Fraud Velocity Tripwire
- **Industry**: Fintech / Payments Infrastructure
- **Difficulty**: Medium
- **Business Context**: When payment transactions pass through Stripe's processing pipeline, automated risk models flag potential chargeback fraud in sub-100ms windows. Transactions originating from high-risk merchant categories or exceeding specific monetary velocity thresholds must be labeled with an actionable risk tier (`CRITICAL_RISK`, `SUSPICIOUS`, `STANDARD_ALLOW`).
- **Table**: `Transactions`
  - Columns: `tx_id (VARCHAR)`, `merchant_category (VARCHAR)`, `amount_usd (DECIMAL)`, `is_foreign_card (BOOLEAN)`, `risk_score (INT)`
- **Executive Question**: *"Extract all non-standard transactions from foreign cards or transactions with risk_score >= 75. Assign risk tiers based on monetary exposure and score, sorting by amount descending."*

```sql
SELECT tx_id,
       merchant_category,
       amount_usd,
       risk_score,
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

---

## Case Study 02: Prime Customer Acquisition & Credit Limit Scaffolding
- **Industry**: Fintech / Consumer Credit
- **Difficulty**: Easy
- **Business Context**: A digital neobank is launching an invitation-only premium credit card. Underwriting guidelines require identifying verified US residents with a FICO score of 720+ who have maintained an active account for at least 12 months. Each applicant must be assigned an initial monthly credit limit proportional to their credit score ($15 per point).
- **Table**: `Customers`
  - Columns: `customer_id (INT)`, `full_name (VARCHAR)`, `credit_score (INT)`, `country (VARCHAR)`, `tenure_months (INT)`
- **Executive Question**: *"Provide a deduplicated list of the top 10 prime candidates with the longest tenure."*

```sql
SELECT DISTINCT full_name,
       credit_score,
       (credit_score * 15) AS initial_credit_limit,
       tenure_months
FROM Customers
WHERE country = 'USA' AND credit_score >= 720 AND tenure_months >= 12
ORDER BY tenure_months DESC, credit_score DESC
LIMIT 10;
```

---

## Case Study 03: B2B Account Churn Risk & Contraction Classifier
- **Industry**: SaaS / Enterprise Cloud
- **Difficulty**: Medium
- **Business Context**: Customer Success leadership monitors subscription health ahead of annual renewals. Accounts with zero logins in the past 30 days or seat utilization under 40% are at imminent risk of contraction or cancellation.
- **Table**: `SubscriptionAccounts`
  - Columns: `account_id (INT)`, `company_name (VARCHAR)`, `plan_tier (VARCHAR)`, `licensed_seats (INT)`, `active_seats (INT)`, `days_since_last_login (INT)`
- **Executive Question**: *"Calculate seat utilization percentage and categorize accounts into 'IMMINENT_CHURN', 'NEEDS_OUTREACH', or 'HEALTHY'."*

```sql
SELECT company_name,
       plan_tier,
       licensed_seats,
       active_seats,
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

---

## Case Study 04: Freemium Cloud Compute Gatekeeper & Upgrade Tiers
- **Industry**: Cloud Infrastructure / Developer Tools
- **Difficulty**: Easy
- **Business Context**: A serverless database provider offers free-tier compute. When users exceed monthly execution limits, automated rate-limiting flags them for enterprise sales outreach or throttles their concurrency.
- **Table**: `DeveloperTenants`
  - Columns: `tenant_id (VARCHAR)`, `org_name (VARCHAR)`, `monthly_vcpuhours (DECIMAL)`, `storage_gb (DECIMAL)`, `is_billing_verified (BOOLEAN)`
- **Executive Question**: *"Flag all free tenants that exceed 100 vCPU-hours or 50GB storage, categorizing them by sales lead priority."*

```sql
SELECT org_name,
       monthly_vcpuhours,
       storage_gb,
       CASE
           WHEN monthly_vcpuhours >= 250 OR storage_gb >= 100 THEN 'HOT_SALES_LEAD'
           WHEN monthly_vcpuhours >= 100 OR storage_gb >= 50 THEN 'WARM_UPGRADE_CANDIDATE'
           ELSE 'STANDARD_FREE'
       END AS sales_motion_tier
FROM DeveloperTenants
WHERE is_billing_verified = FALSE AND (monthly_vcpuhours >= 100 OR storage_gb >= 50)
ORDER BY monthly_vcpuhours DESC;
```

---

## Case Study 05: VIP Customer Tiering & Loyalty Point Multipliers
- **Industry**: E-Commerce / Luxury Retail
- **Difficulty**: Medium
- **Business Context**: An omni-channel luxury retailer calculates customer loyalty tiers annually based on trailing 12-month net spend. Platinum and Gold members receive accelerated reward multipliers (3x and 2x points).
- **Table**: `LoyaltyMembers`
  - Columns: `member_id (INT)`, `full_name (VARCHAR)`, `annual_spend (DECIMAL)`, `return_rate_pct (DECIMAL)`, `preferred_category (VARCHAR)`
- **Executive Question**: *"Assign tiers and reward multipliers to members who maintain return rates below 20%."*

```sql
SELECT full_name,
       annual_spend,
       return_rate_pct,
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

---

## Case Study 06: Express vs Standard Fulfillment SLA Routing
- **Industry**: E-Commerce / Supply Chain
- **Difficulty**: Easy
- **Business Context**: An automated warehouse distribution hub batches pending orders into delivery lanes. Orders marked Prime or orders over $150 qualify for next-day air dispatch, while remaining packages route via standard ground carrier.
- **Table**: `Orders`
  - Columns: `order_id (INT)`, `order_total (DECIMAL)`, `is_prime_member (BOOLEAN)`, `destination_zip (VARCHAR)`, `order_status (VARCHAR)`
- **Executive Question**: *"Route pending packages to AIR_DISPATCH or GROUND_CARRIER."*

```sql
SELECT order_id,
       order_total,
       is_prime_member,
       destination_zip,
       CASE
           WHEN is_prime_member = TRUE OR order_total >= 150.00 THEN 'AIR_DISPATCH_NEXT_DAY'
           ELSE 'GROUND_CARRIER_STANDARD'
       END AS fulfillment_routing
FROM Orders
WHERE order_status = 'PENDING_FULFILLMENT'
ORDER BY order_total DESC;
```

---

## Case Study 07: Emergency Room Triage Acuity Matrix (ESI Tiers)
- **Industry**: Healthcare / Hospital Systems
- **Difficulty**: Hard
- **Business Context**: Hospital emergency departments use the Emergency Severity Index (ESI 1 through 5) to categorize patient acuity upon check-in. Patients presenting with unstable vitals (e.g. oxygen saturation < 90% or heart rate > 130 bpm) must instantly bypass the waiting queue to resuscitation bays.
- **Table**: `PatientIntake`
  - Columns: `intake_id (INT)`, `patient_name (VARCHAR)`, `pulse_bpm (INT)`, `o2_saturation (INT)`, `is_unresponsive (BOOLEAN)`
- **Executive Question**: *"Assign ESI triage priority levels using strict medical safety waterfall ordering."*

```sql
SELECT patient_name,
       pulse_bpm,
       o2_saturation,
       CASE
           WHEN is_unresponsive = TRUE OR o2_saturation < 85 THEN 'ESI-1: RESUSCITATION (IMMEDIATE)'
           WHEN o2_saturation < 92 OR pulse_bpm > 130 OR pulse_bpm < 45 THEN 'ESI-2: EMERGENT (10 MIN MAX)'
           WHEN pulse_bpm BETWEEN 100 AND 130 THEN 'ESI-3: URGENT'
           ELSE 'ESI-4: NON-URGENT'
       END AS triage_level
FROM PatientIntake
ORDER BY o2_saturation ASC, pulse_bpm DESC;
```

---

## Case Study 08: Pediatric Dosage Safety Boundary Validator
- **Industry**: Healthcare / Clinical Pharmacology
- **Difficulty**: Easy
- **Business Context**: Automated medication dispensing cabinets verify that prescribed liquid amoxicillin doses fall strictly within safe pediatric weight-adjusted milligram boundaries (40mg/kg/day to 90mg/kg/day).
- **Table**: `Prescriptions`
  - Columns: `rx_id (INT)`, `patient_weight_kg (DECIMAL)`, `prescribed_mg_day (DECIMAL)`, `drug_name (VARCHAR)`
- **Executive Question**: *"Verify pediatric antibiotic dosages and flag safe vs out-of-boundary prescriptions."*

```sql
SELECT rx_id,
       drug_name,
       patient_weight_kg,
       prescribed_mg_day,
       CASE
           WHEN prescribed_mg_day BETWEEN (patient_weight_kg * 40) AND (patient_weight_kg * 90) THEN 'DOSAGE_SAFE'
           WHEN prescribed_mg_day > (patient_weight_kg * 90) THEN 'OVERDOSE_WARNING'
           ELSE 'UNDERDOSE_INEFFECTIVE'
       END AS clinical_safety_status
FROM Prescriptions
WHERE drug_name = 'Amoxicillin';
```

---

## Case Study 09: Autonomous Delivery Drone Battery & Cargo Gate
- **Industry**: Logistics & Robotics
- **Difficulty**: Medium
- **Business Context**: Fleet dispatch software monitors delivery drones before releasing them from launch pads. A drone cannot take off if its payload exceeds 4.5kg, or if its battery percentage is below 40% for missions exceeding 5 kilometers.
- **Table**: `DroneFleet`
  - Columns: `drone_id (VARCHAR)`, `battery_pct (INT)`, `payload_kg (DECIMAL)`, `mission_distance_km (DECIMAL)`, `motor_health_score (INT)`
- **Executive Question**: *"Determine flight clearance status for scheduled missions."*

```sql
SELECT drone_id,
       battery_pct,
       payload_kg,
       mission_distance_km,
       CASE
           WHEN payload_kg > 4.5 OR motor_health_score < 80 THEN 'GROUNDED_MAINTENANCE'
           WHEN mission_distance_km > 5.0 AND battery_pct < 40 THEN 'GROUNDED_LOW_BATTERY'
           WHEN mission_distance_km <= 5.0 AND battery_pct < 25 THEN 'GROUNDED_LOW_BATTERY'
           ELSE 'CLEARED_FOR_TAKEOFF'
       END AS flight_clearance
FROM DroneFleet
ORDER BY flight_clearance ASC, battery_pct ASC;
```

---

## Case Study 10: Carrier Late Delivery Penalty Escalation
- **Industry**: Logistics & Third-Party Logistics (3PL)
- **Difficulty**: Medium
- **Business Context**: Freight contracts stipulate financial liquidated damages when third-party logistics carriers deliver shipments past agreed delivery SLA windows. Penalties escalate in tiers based on delay minutes.
- **Table**: `ShipmentTracking`
  - Columns: `tracking_id (VARCHAR)`, `carrier_name (VARCHAR)`, `sla_minutes (INT)`, `actual_delivery_minutes (INT)`, `freight_cost (DECIMAL)`
- **Executive Question**: *"Calculate delay minutes and assign contract penalty percentages."*

```sql
SELECT tracking_id,
       carrier_name,
       (actual_delivery_minutes - sla_minutes) AS delay_minutes,
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

---

## Case Study 11: Content Age-Gate & Parental Advisory Routing
- **Industry**: Digital Media & Streaming
- **Difficulty**: Easy
- **Business Context**: A streaming entertainment service serves titles across multiple user profiles. In child profiles (under 13), titles rated R, TV-MA, or NC-17 must be blocked, while PG-13 content requires parental passcodes.
- **Table**: `MediaCatalog`
  - Columns: `title (VARCHAR)`, `mpaa_rating (VARCHAR)`, `genre (VARCHAR)`, `content_warning_tags (VARCHAR)`
- **Executive Question**: *"Categorize catalog titles for child profile accessibility."*

```sql
SELECT title,
       genre,
       mpaa_rating,
       CASE
           WHEN mpaa_rating IN ('R', 'TV-MA', 'NC-17') THEN 'RESTRICTED_LOCKED'
           WHEN mpaa_rating = 'PG-13' THEN 'PARENTAL_PIN_REQUIRED'
           ELSE 'OPEN_ACCESS'
       END AS child_profile_permission
FROM MediaCatalog
ORDER BY title ASC;
```

---

## Case Study 12: Brute-Force IP Lockout & Anomaly Detection
- **Industry**: Cybersecurity & Infrastructure SecOps
- **Difficulty**: Hard
- **Business Context**: An enterprise authentication gateway analyzes failed login attempts. An IP subnet recording 10+ failed attempts within a monitoring window is flagged for automatic firewall blacklisting unless it originates from a whitelisted corporate corporate VPN block (`10.0.%.%`).
- **Table**: `AuthAuditLog`
  - Columns: `source_ip (VARCHAR)`, `failed_attempts (INT)`, `country_code (VARCHAR)`, `is_vpn (BOOLEAN)`
- **Executive Question**: *"Identify and classify suspicious authentication IPs for automated firewall response."*

```sql
SELECT source_ip,
       failed_attempts,
       country_code,
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

---

## Case Study 13: Executive Equity Vesting & Performance Bonus Allocation
- **Industry**: Corporate Governance & Human Resources
- **Difficulty**: Medium
- **Business Context**: Year-end corporate compensation committees evaluate executive performance based on company EBITDA growth and individual OKR completion rates to assign multiplier brackets.
- **Table**: `ExecutiveReview`
  - Columns: `executive_id (INT)`, `executive_name (VARCHAR)`, `department (VARCHAR)`, `okr_completion_pct (DECIMAL)`, `tenure_years (INT)`
- **Executive Question**: *"Calculate equity acceleration tiers for executives with tenure >= 2 years."*

```sql
SELECT executive_name,
       department,
       okr_completion_pct,
       tenure_years,
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

---

## Case Study 14: Sensor Distance Triangle Geometry QC
- **Industry**: Hardware Engineering & Warehouse Robotics
- **Difficulty**: Hard
- **Business Context**: Autonomous warehouse robots measure obstacle distances using 3 LIDAR reflection pins (A, B, C). If measurements violate the Triangle Inequality Theorem ($A + B \le C$), the sensor reading is an invalid bounce and must be rejected before shape classification.
- **Table**: `TRIANGLES`
  - Columns: `A (INT)`, `B (INT)`, `C (INT)`
- **Executive Question**: *"Classify triangles into Equilateral, Isosceles, Scalene, or Not A Triangle using short-circuit evaluation."*

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

---

## Case Study 15: Anti-Money Laundering (AML) Structuring Tripwire
- **Industry**: Banking & Financial Crimes Enforcement (FinCEN)
- **Difficulty**: Hard
- **Business Context**: Federal banking regulations require Currency Transaction Reports (CTRs) for cash deposits exceeding $10,000. Criminal actors attempt "structuring" (smurfing)—intentionally making cash deposits between $8,500 and $9,999 to evade reporting thresholds.
- **Table**: `DepositLedger`
  - Columns: `deposit_id (VARCHAR)`, `account_id (VARCHAR)`, `amount_usd (DECIMAL)`, `deposit_channel (VARCHAR)`, `customer_occupation (VARCHAR)`
- **Executive Question**: *"Flag suspicious cash deposits sitting immediately under the federal $10,000 CTR reporting threshold."*

```sql
SELECT deposit_id,
       account_id,
       amount_usd,
       deposit_channel,
       CASE
           WHEN amount_usd BETWEEN 8500.00 AND 9999.99 THEN 'SUSPICIOUS_STRUCTURING_FLAG'
           WHEN amount_usd >= 10000.00 THEN 'MANDATORY_CTR_FILING'
           ELSE 'STANDARD_ACTIVITY'
       END AS aml_compliance_tier
FROM DepositLedger
WHERE deposit_channel = 'CASH_TELLER' AND amount_usd >= 8500.00
ORDER BY amount_usd DESC;
```
