// =============================================================================
// PART 5: SEMI-JOIN & EXISTS (35 DISTINCT CASES: 12 Easy, 11 Medium, 12 Hard)
// Existence Testing Without Multiplying Driving Rows Across 10 Industries
// Pattern: SELECT ... FROM TableA a WHERE EXISTS (SELECT 1 FROM TableB b WHERE a.key = b.key ...)
// =============================================================================

module.exports = [
  // --- FINTECH ---
  {
    title: "High-Net-Worth Accounts With at Least One Wire Transfer Over $100k",
    ind: "Fintech",
    diff: "Easy",
    table: "BankAccounts",
    scenario: "Identifying premium VIP banking accounts that have executed at least one large international wire transfer, without duplicating accounts that executed dozens of wires.",
    businessObjective: "Write a SEMI-JOIN using WHERE EXISTS to filter BankAccounts based on the existence of a qualifying large wire transfer in WireLedger.",
    schemaSnippet: "`BankAccounts (account_id VARCHAR(32) PRIMARY KEY, client_name VARCHAR(100), branch_city VARCHAR(32))` & `WireLedger (wire_id VARCHAR(32) PRIMARY KEY, account_id VARCHAR(32), wire_amount DECIMAL(12,2), status VARCHAR(16))`",
    targetQuery: `SELECT a.account_id, a.client_name, a.branch_city\nFROM BankAccounts a\nWHERE EXISTS (\n  SELECT 1\n  FROM WireLedger w\n  WHERE w.account_id = a.account_id\n    AND w.wire_amount >= 100000.00\n    AND w.status = 'SETTLED'\n)\nORDER BY a.client_name ASC;`,
    eli5Story: "Finding rich customers who sent a big wire of $100k or more. If a customer sent 15 big wires, we only want their name to appear ONCE on our list, not 15 times.",
    commonMistakes: "Using a regular INNER JOIN which duplicates the customer account 15 times unless DISTINCT is added, wasting database memory.",
    learningOutcomes: "Master the fundamental WHERE EXISTS semi-join pattern for deduplicated entity filtering."
  },
  {
    title: "Commercial Borrowers With at Least One 90+ Day Delinquent Loan",
    ind: "Fintech",
    diff: "Medium",
    table: "CommercialBorrowers",
    scenario: "Restricting new credit lines by identifying corporate borrowers that hold one or more severely past-due commercial credit facilities.",
    businessObjective: "Use a semi-join with WHERE EXISTS to find CommercialBorrowers with delinquent loans without multiplying borrower records.",
    schemaSnippet: "`CommercialBorrowers (borrower_ein VARCHAR(10) PRIMARY KEY, legal_name VARCHAR(100), credit_rating VARCHAR(8))` & `CommercialLoans (loan_id VARCHAR(32) PRIMARY KEY, borrower_ein VARCHAR(10), days_past_due INT)`",
    targetQuery: `SELECT b.borrower_ein, b.legal_name, b.credit_rating\nFROM CommercialBorrowers b\nWHERE EXISTS (\n  SELECT 1\n  FROM CommercialLoans l\n  WHERE l.borrower_ein = b.borrower_ein\n    AND l.days_past_due >= 90\n)\nORDER BY b.legal_name ASC;`,
    eli5Story: "Finding companies that are 3 months late on paying back a loan so our loan officers know not to lend them any more money.",
    commonMistakes: "Joining the loans table and selecting borrower columns, resulting in duplicate borrower rows for companies with multiple delinquent loans.",
    learningOutcomes: "Perform credit risk isolation using uncorrelated or correlated semi-join subqueries."
  },
  {
    title: "Stock Brokerage Traders Executing Penny Stock Trades in Excess of OTC Limits",
    ind: "Fintech",
    diff: "Hard",
    table: "BrokerageTraders",
    scenario: "Flagging retail brokerage accounts for compliance review if they executed any OTC micro-cap trades during market volatility halts.",
    businessObjective: "Semi-join BrokerageTraders against MicroCapTrades on trader_id using WHERE EXISTS to compile compliance review lists.",
    schemaSnippet: "`BrokerageTraders (trader_id VARCHAR(32) PRIMARY KEY, legal_name VARCHAR(100), kyc_tier VARCHAR(16))` & `MicroCapTrades (trade_id VARCHAR(32) PRIMARY KEY, trader_id VARCHAR(32), share_price DECIMAL(6,3), volatility_halt BOOLEAN)`",
    targetQuery: `SELECT t.trader_id, t.legal_name, t.kyc_tier\nFROM BrokerageTraders t\nWHERE EXISTS (\n  SELECT 1\n  FROM MicroCapTrades m\n  WHERE m.trader_id = t.trader_id\n    AND m.share_price < 1.000\n    AND m.volatility_halt = TRUE\n)\nORDER BY t.legal_name ASC;`,
    eli5Story: "Looking for stock traders who bought super cheap penny stocks right when trading was halted so SEC compliance officers can review their accounts.",
    commonMistakes: "Using `IN (SELECT trader_id ...)` without checking if the subquery returns NULLs, which can degrade query optimizer performance.",
    learningOutcomes: "Optimize financial compliance audit queries using WHERE EXISTS."
  },
  {
    title: "Credit Card Accounts With Active International Foreign Currency Charges",
    ind: "Fintech",
    diff: "Easy",
    table: "CardAccounts",
    scenario: "Targeting travel reward card offers by identifying cardholders who had at least one non-USD purchase in the past 30 days.",
    businessObjective: "Semi-join CardAccounts to CardTransactions on card_id using WHERE EXISTS to filter for international shoppers without row duplication.",
    schemaSnippet: "`CardAccounts (card_id VARCHAR(32) PRIMARY KEY, cardholder_name VARCHAR(100), billing_zip VARCHAR(10))` & `CardTransactions (tx_id VARCHAR(32) PRIMARY KEY, card_id VARCHAR(32), currency_code VARCHAR(3))`",
    targetQuery: `SELECT c.card_id, c.cardholder_name, c.billing_zip\nFROM CardAccounts c\nWHERE EXISTS (\n  SELECT 1\n  FROM CardTransactions t\n  WHERE t.card_id = c.card_id\n    AND t.currency_code <> 'USD'\n)\nORDER BY c.cardholder_name ASC;`,
    eli5Story: "Finding customers who used their credit card in Europe or Japan so we can email them about our zero foreign transaction fee travel card.",
    commonMistakes: "Using `SELECT DISTINCT` with a raw join, which forces the database engine to sort the entire joined dataset in memory.",
    learningOutcomes: "Understand how the query engine terminates WHERE EXISTS evaluation upon finding the very first matching row (short-circuiting)."
  },

  // --- SAAS ---
  {
    title: "Enterprise SaaS Workspaces With SAML SSO Enforced and Active",
    ind: "SaaS",
    diff: "Easy",
    table: "Workspaces",
    scenario: "Identifying premium enterprise workspaces that have at least one successfully authenticated Okta or Azure AD login session.",
    businessObjective: "Semi-join Workspaces to SsoSessions using WHERE EXISTS to verify active enterprise security adoption.",
    schemaSnippet: "`Workspaces (workspace_id VARCHAR(32) PRIMARY KEY, company_name VARCHAR(100), plan_name VARCHAR(20))` & `SsoSessions (session_id VARCHAR(64) PRIMARY KEY, workspace_id VARCHAR(32), idp_name VARCHAR(32))`",
    targetQuery: `SELECT w.workspace_id, w.company_name, w.plan_name\nFROM Workspaces w\nWHERE EXISTS (\n  SELECT 1\n  FROM SsoSessions s\n  WHERE s.workspace_id = w.workspace_id\n    AND s.idp_name IN ('OKTA', 'AZURE_AD')\n)\nORDER BY w.company_name ASC;`,
    eli5Story: "Finding companies using our software whose workers actually log in through corporate single sign-on passwords.",
    commonMistakes: "Returning SSO session columns in the SELECT clause when the prompt asks only for the workspace entity details.",
    learningOutcomes: "Filter parent entities based on child session existence without returning child attributes."
  },
  {
    title: "SaaS Customers Who Triggered Over 100 Webhook Failures in 24 Hours",
    ind: "SaaS",
    diff: "Hard",
    table: "WebhookSubscribers",
    scenario: "Protecting cloud infrastructure by detecting API tenants whose receiving webhook endpoints are failing continuously with HTTP 500 errors.",
    businessObjective: "Semi-join WebhookSubscribers to an aggregated subquery of WebhookDeliveryLogs using WHERE EXISTS to identify failing integrations.",
    schemaSnippet: "`WebhookSubscribers (subscriber_id VARCHAR(32) PRIMARY KEY, client_name VARCHAR(100), target_url VARCHAR(255))` & `WebhookDeliveryLogs (log_id BIGINT PRIMARY KEY, subscriber_id VARCHAR(32), http_status INT, delivered_at TIMESTAMP)`",
    targetQuery: `SELECT s.subscriber_id, s.client_name, s.target_url\nFROM WebhookSubscribers s\nWHERE EXISTS (\n  SELECT 1\n  FROM WebhookDeliveryLogs l\n  WHERE l.subscriber_id = s.subscriber_id\n    AND l.http_status >= 500\n    AND l.delivered_at >= NOW() - INTERVAL 24 HOUR\n  GROUP BY l.subscriber_id\n  HAVING COUNT(l.log_id) >= 100\n)\nORDER BY s.client_name ASC;`,
    eli5Story: "Finding developer clients whose receiving servers are down and throwing errors, failing over 100 times today so our support team can pause webhooks.",
    commonMistakes: "Omitting the HAVING clause inside the EXISTS subquery, which would flag tenants with even 1 single error instead of 100.",
    learningOutcomes: "Nest aggregated threshold filtering inside WHERE EXISTS semi-join clauses."
  },
  {
    title: "Developer Accounts With at Least One Production Database Cluster in Multi-AZ",
    ind: "SaaS",
    diff: "Medium",
    table: "DeveloperTenants",
    scenario: "Identifying high-reliability customers who have deployed at least one multi-availability-zone (Multi-AZ) database cluster.",
    businessObjective: "Semi-join DeveloperTenants to DatabaseClusters on tenant_id using WHERE EXISTS to target enterprise disaster recovery webinars.",
    schemaSnippet: "`DeveloperTenants (tenant_id VARCHAR(32) PRIMARY KEY, organization_name VARCHAR(100))` & `DatabaseClusters (cluster_id VARCHAR(32) PRIMARY KEY, tenant_id VARCHAR(32), is_multi_az BOOLEAN)`",
    targetQuery: `SELECT t.tenant_id, t.organization_name\nFROM DeveloperTenants t\nWHERE EXISTS (\n  SELECT 1\n  FROM DatabaseClusters c\n  WHERE c.tenant_id = t.tenant_id\n    AND c.is_multi_az = TRUE\n)\nORDER BY t.organization_name ASC;`,
    eli5Story: "Finding software customers who set up redundant database backup servers across multiple cities so their website never goes down.",
    commonMistakes: "Using a regular join and forgetting that enterprise tenants have 20+ clusters, which duplicates the tenant row 20 times.",
    learningOutcomes: "Prevent entity duplication using semi-joins on 1-to-many infrastructure relationships."
  },

  // --- RETAIL ---
  {
    title: "Retail SKUs Purchased in More Than 3 Distinct International Countries",
    ind: "Retail",
    diff: "Medium",
    table: "MasterCatalog",
    scenario: "Identifying globally trending e-commerce products by checking for sales in at least 4 distinct international shipping countries.",
    businessObjective: "Semi-join MasterCatalog to OrderLineItems on sku using WHERE EXISTS with country cardinality checks.",
    schemaSnippet: "`MasterCatalog (sku VARCHAR(32) PRIMARY KEY, product_name VARCHAR(100), category VARCHAR(32))` & `OrderLineItems (item_id BIGINT PRIMARY KEY, sku VARCHAR(32), shipping_country VARCHAR(2))`",
    targetQuery: `SELECT c.sku, c.product_name, c.category\nFROM MasterCatalog c\nWHERE EXISTS (\n  SELECT 1\n  FROM OrderLineItems o\n  WHERE o.sku = c.sku\n  GROUP BY o.sku\n  HAVING COUNT(DISTINCT o.shipping_country) >= 4\n)\nORDER BY c.product_name ASC;`,
    eli5Story: "Finding popular products that were bought by shoppers in at least 4 different countries around the world.",
    commonMistakes: "Using COUNT(o.shipping_country) without DISTINCT, which counts orders rather than distinct countries.",
    learningOutcomes: "Combine cardinality checks inside correlated subqueries to filter primary product entities."
  },
  {
    title: "Customers Who Returned an Item Due to Sizing and Later Bought a Replacement",
    ind: "Retail",
    diff: "Hard",
    table: "RetailCustomers",
    scenario: "Analyzing size exchange behavior by identifying customers who submitted a return with reason 'WRONG_SIZE' and subsequently placed a new order.",
    businessObjective: "Semi-join RetailCustomers to CustomerOrders using correlated EXISTS to confirm subsequent purchase behavior.",
    schemaSnippet: "`RetailCustomers (customer_id VARCHAR(32) PRIMARY KEY, email VARCHAR(100))` & `ProductReturns (return_id VARCHAR(32) PRIMARY KEY, customer_id VARCHAR(32), reason_code VARCHAR(16), return_date DATE)` & `CustomerOrders (order_id VARCHAR(32) PRIMARY KEY, customer_id VARCHAR(32), order_date DATE)`",
    targetQuery: `SELECT c.customer_id, c.email\nFROM RetailCustomers c\nWHERE EXISTS (\n  SELECT 1\n  FROM ProductReturns r\n  WHERE r.customer_id = c.customer_id\n    AND r.reason_code = 'WRONG_SIZE'\n)\nAND EXISTS (\n  SELECT 1\n  FROM CustomerOrders o\n  WHERE o.customer_id = c.customer_id\n    AND o.order_date >= '2026-08-01'\n)\nORDER BY c.email ASC;`,
    eli5Story: "Finding shoppers who returned a shirt that was too small, but liked our brand enough to buy another outfit from us later.",
    commonMistakes: "Joining all three tables in a single flat join, which creates an explosive combination of returns multiplied by orders.",
    learningOutcomes: "Combine multiple independent EXISTS clauses to model multi-stage customer journey behaviors cleanly."
  },
  {
    title: "Brick-and-Mortar Store Locations With High-Value Luxury Jewelry Inventory",
    ind: "Retail",
    diff: "Easy",
    table: "RetailStores",
    scenario: "Routing armored security patrols to retail stores that have at least one piece of jewelry in stock with a price tag over $10,000.",
    businessObjective: "Semi-join RetailStores to StoreInventory on store_id using WHERE EXISTS to identify stores holding high-value merchandise.",
    schemaSnippet: "`RetailStores (store_id VARCHAR(16) PRIMARY KEY, store_name VARCHAR(64), address VARCHAR(100))` & `StoreInventory (inventory_id BIGINT PRIMARY KEY, store_id VARCHAR(16), retail_price_usd DECIMAL(10,2))`",
    targetQuery: `SELECT s.store_id, s.store_name, s.address\nFROM RetailStores s\nWHERE EXISTS (\n  SELECT 1\n  FROM StoreInventory i\n  WHERE i.store_id = s.store_id\n    AND i.retail_price_usd >= 10000.00\n)\nORDER BY s.store_name ASC;`,
    eli5Story: "Finding which shopping mall stores have expensive $10k diamond necklaces in stock so we can send extra security guards to patrol those stores.",
    commonMistakes: "Using a regular join and getting 50 rows for Store #101 because Store #101 has 50 expensive rings.",
    learningOutcomes: "Filter geographic retail facilities based on inventory existence criteria."
  },

  // --- HEALTHCARE ---
  {
    title: "Physicians Who Prescribed Controlled Schedule-II Substances This Quarter",
    ind: "Healthcare",
    diff: "Medium",
    table: "DoctorsRoster",
    scenario: "Monitoring opioid prescribing patterns by identifying licensed physicians who wrote at least one Schedule-II controlled substance prescription this quarter.",
    businessObjective: "Semi-join DoctorsRoster to PrescriptionOrders on doctor_npi using WHERE EXISTS to generate regulatory audit rosters without row duplication.",
    schemaSnippet: "`DoctorsRoster (doctor_npi VARCHAR(10) PRIMARY KEY, doctor_name VARCHAR(100), hospital_dept VARCHAR(32))` & `PrescriptionOrders (order_id VARCHAR(32) PRIMARY KEY, doctor_npi VARCHAR(10), schedule_class VARCHAR(8), order_date DATE)`",
    targetQuery: `SELECT d.doctor_npi, d.doctor_name, d.hospital_dept\nFROM DoctorsRoster d\nWHERE EXISTS (\n  SELECT 1\n  FROM PrescriptionOrders p\n  WHERE p.doctor_npi = d.doctor_npi\n    AND p.schedule_class = 'SCHEDULE_II'\n    AND p.order_date >= '2026-07-01'\n)\nORDER BY d.doctor_name ASC;`,
    eli5Story: "Finding doctors who wrote prescriptions for powerful pain medicines this summer so pharmacy regulators can inspect their prescribing logs.",
    commonMistakes: "Using an INNER JOIN which produces 500 rows for a busy surgeon who wrote 500 post-op pain prescriptions.",
    learningOutcomes: "Safely filter healthcare provider registries based on clinical prescription existence."
  },
  {
    title: "Patients With Chronic Conditions Who Were Admitted to ICU Multiple Times",
    ind: "Healthcare",
    diff: "Hard",
    table: "ChronicDiseaseRegistry",
    scenario: "Identifying high-risk patients with chronic congestive heart failure who experienced two or more ICU admissions within the past 180 days.",
    businessObjective: "Semi-join ChronicDiseaseRegistry to IcuAdmissions on patient_id using WHERE EXISTS and grouped count filters.",
    schemaSnippet: "`ChronicDiseaseRegistry (patient_id VARCHAR(32) PRIMARY KEY, patient_name VARCHAR(100), condition_desc VARCHAR(64))` & `IcuAdmissions (admission_id VARCHAR(32) PRIMARY KEY, patient_id VARCHAR(32), admit_date DATE)`",
    targetQuery: `SELECT c.patient_id, c.patient_name, c.condition_desc\nFROM ChronicDiseaseRegistry c\nWHERE EXISTS (\n  SELECT 1\n  FROM IcuAdmissions i\n  WHERE i.patient_id = c.patient_id\n    AND i.admit_date >= CURRENT_DATE - INTERVAL 180 DAY\n  GROUP BY i.patient_id\n  HAVING COUNT(i.admission_id) >= 2\n)\nORDER BY c.patient_name ASC;`,
    eli5Story: "Finding sick heart patients who had to be rushed to the intensive care unit twice in the last 6 months so doctors can assign them a dedicated nurse.",
    commonMistakes: "Using a flat join that duplicates the patient's records and complicates clinical outreach rosters.",
    learningOutcomes: "Implement complex clinical recidivism criteria inside semi-join subqueries."
  },
  {
    title: "Hospital Clinics Operating Advanced Robotic Surgical Suites",
    ind: "Healthcare",
    diff: "Easy",
    table: "HospitalClinics",
    scenario: "Targeting specialized surgical marketing materials to hospital clinics that own at least one da Vinci robotic surgical workstation.",
    businessObjective: "Semi-join HospitalClinics to ClinicEquipment on clinic_id using WHERE EXISTS to identify robotic surgical centers.",
    schemaSnippet: "`HospitalClinics (clinic_id VARCHAR(16) PRIMARY KEY, clinic_name VARCHAR(64), city VARCHAR(32))` & `ClinicEquipment (equipment_id VARCHAR(32) PRIMARY KEY, clinic_id VARCHAR(16), model_type VARCHAR(32))`",
    targetQuery: `SELECT c.clinic_id, c.clinic_name, c.city\nFROM HospitalClinics c\nWHERE EXISTS (\n  SELECT 1\n  FROM ClinicEquipment e\n  WHERE e.clinic_id = c.clinic_id\n    AND e.model_type = 'ROBOTIC_SURGERY_DAVINCI'\n)\nORDER BY c.clinic_name ASC;`,
    eli5Story: "Finding hospital surgery centers that have high-tech robot surgical arms in their operating rooms.",
    commonMistakes: "Using IN with a subquery when WHERE EXISTS provides superior index-seeking performance on large tables.",
    learningOutcomes: "Filter healthcare facility directories based on medical equipment assets."
  },

  // --- LOGISTICS ---
  {
    title: "Distribution Hubs Handling Cold-Chain Temperature-Sensitive Vaccines",
    ind: "Logistics",
    diff: "Easy",
    table: "LogisticsHubs",
    scenario: "Verifying ultra-cold storage facility certifications by identifying warehouse hubs that processed at least one deep-freeze vaccine shipment.",
    businessObjective: "Semi-join LogisticsHubs to ShipmentConsignments on hub_id using WHERE EXISTS to audit cold-chain logistics readiness.",
    schemaSnippet: "`LogisticsHubs (hub_id VARCHAR(16) PRIMARY KEY, hub_name VARCHAR(64), state VARCHAR(2))` & `ShipmentConsignments (shipment_id VARCHAR(32) PRIMARY KEY, hub_id VARCHAR(16), requires_ultra_cold BOOLEAN)`",
    targetQuery: `SELECT h.hub_id, h.hub_name, h.state\nFROM LogisticsHubs h\nWHERE EXISTS (\n  SELECT 1\n  FROM ShipmentConsignments s\n  WHERE s.hub_id = h.hub_id\n    AND s.requires_ultra_cold = TRUE\n)\nORDER BY h.hub_name ASC;`,
    eli5Story: "Finding warehouse hubs with industrial deep-freezers that handled frozen vaccines, keeping one clean row per warehouse.",
    commonMistakes: "Using a regular join that produces 1,000 rows for a hub that handled 1,000 vaccine boxes.",
    learningOutcomes: "Filter supply chain transportation hubs based on cargo capability criteria."
  },
  {
    title: "Freight Carriers With Multiple DOT Hazardous Material Transport Violations",
    ind: "Logistics",
    diff: "Hard",
    table: "FreightCarriers",
    scenario: "Screening trucking carriers for high-risk chemical transport by identifying companies that received 2 or more DOT safety violations in 2026.",
    businessObjective: "Semi-join FreightCarriers to SafetyViolations on usdot_number using WHERE EXISTS with group count filtering.",
    schemaSnippet: "`FreightCarriers (usdot_number VARCHAR(12) PRIMARY KEY, carrier_name VARCHAR(100), fleet_size INT)` & `SafetyViolations (violation_id VARCHAR(32) PRIMARY KEY, usdot_number VARCHAR(12), violation_year INT)`",
    targetQuery: `SELECT c.usdot_number, c.carrier_name, c.fleet_size\nFROM FreightCarriers c\nWHERE EXISTS (\n  SELECT 1\n  FROM SafetyViolations v\n  WHERE v.usdot_number = c.usdot_number\n    AND v.violation_year = 2026\n  GROUP BY v.usdot_number\n  HAVING COUNT(v.violation_id) >= 2\n)\nORDER BY c.fleet_size DESC;`,
    eli5Story: "Finding trucking companies that got caught breaking safety laws multiple times this year so we can stop giving them shipping contracts.",
    commonMistakes: "Joining violations directly and grouping by carrier, which creates messy multi-table joins when further carrier relationships are added.",
    learningOutcomes: "Enforce multi-violation threshold rules inside correlated subqueries."
  },
  {
    title: "Maritime Container Vessels With Planned Port Calls in Restricted Sanctions Zones",
    ind: "Logistics",
    diff: "Medium",
    table: "MaritimeVessels",
    scenario: "Ensuring maritime insurance compliance by identifying container ships scheduled to dock at international ports subject to maritime sanctions.",
    businessObjective: "Semi-join MaritimeVessels to VesselPortCalls on imo_number using WHERE EXISTS to halt insurance underwriting.",
    schemaSnippet: "`MaritimeVessels (imo_number VARCHAR(10) PRIMARY KEY, vessel_name VARCHAR(100), flag_state VARCHAR(32))` & `VesselPortCalls (call_id VARCHAR(32) PRIMARY KEY, imo_number VARCHAR(10), port_code VARCHAR(5), is_sanctioned_zone BOOLEAN)`",
    targetQuery: `SELECT v.imo_number, v.vessel_name, v.flag_state\nFROM MaritimeVessels v\nWHERE EXISTS (\n  SELECT 1\n  FROM VesselPortCalls p\n  WHERE p.imo_number = v.imo_number\n    AND p.is_sanctioned_zone = TRUE\n)\nORDER BY v.vessel_name ASC;`,
    eli5Story: "Finding cargo container ships that plan to dock in sanctioned ports so insurance companies don't insure illegal voyages.",
    commonMistakes: "Using `IN (SELECT port_code ...)` without checking the sanctioned flag, mixing up port codes.",
    learningOutcomes: "Model international maritime trade restrictions using semi-joins."
  },

  // --- MEDIA ---
  {
    title: "Video Streaming Series With at Least One Episode Rated Over 9.0",
    ind: "Media",
    diff: "Easy",
    table: "StreamingSeriesCatalog",
    scenario: "Curating a 'Critically Acclaimed Masterpieces' carousel on the homepage by selecting TV shows that have at least one episode rated 9.0+.",
    businessObjective: "Semi-join StreamingSeriesCatalog to EpisodeRatings on series_id using WHERE EXISTS without duplicating series titles.",
    schemaSnippet: "`StreamingSeriesCatalog (series_id VARCHAR(32) PRIMARY KEY, series_title VARCHAR(100), release_year INT)` & `EpisodeRatings (episode_id VARCHAR(32) PRIMARY KEY, series_id VARCHAR(32), imdb_score DECIMAL(3,1))`",
    targetQuery: `SELECT s.series_id, s.series_title, s.release_year\nFROM StreamingSeriesCatalog s\nWHERE EXISTS (\n  SELECT 1\n  FROM EpisodeRatings e\n  WHERE e.series_id = s.series_id\n    AND e.imdb_score >= 9.0\n)\nORDER BY s.series_title ASC;`,
    eli5Story: "Finding TV shows (like Breaking Bad or Game of Thrones) that had at least one legendary episode rated 9.0 or higher by viewers.",
    commonMistakes: "Joining episodes directly, which duplicates the TV show 10 times if it has 10 great episodes.",
    learningOutcomes: "Curate editorial media carousels using clean existence checks on child episodes."
  },
  {
    title: "Digital Journalists With Multiple Pulitzer or National Reporting Awards",
    ind: "Media",
    diff: "Medium",
    table: "JournalistRoster",
    scenario: "Highlighting top newsroom talent by identifying staff journalists who have won two or more major journalism awards.",
    businessObjective: "Semi-join JournalistRoster to JournalismAwards on journalist_id using WHERE EXISTS with group count filtering.",
    schemaSnippet: "`JournalistRoster (journalist_id VARCHAR(16) PRIMARY KEY, reporter_name VARCHAR(100), beat VARCHAR(32))` & `JournalismAwards (award_id VARCHAR(32) PRIMARY KEY, journalist_id VARCHAR(16), award_name VARCHAR(64))`",
    targetQuery: `SELECT j.journalist_id, j.reporter_name, j.beat\nFROM JournalistRoster j\nWHERE EXISTS (\n  SELECT 1\n  FROM JournalismAwards a\n  WHERE a.journalist_id = j.journalist_id\n  GROUP BY a.journalist_id\n  HAVING COUNT(a.award_id) >= 2\n)\nORDER BY j.reporter_name ASC;`,
    eli5Story: "Finding veteran news reporters who have won two or more major writing awards so we can feature their articles on the front page.",
    commonMistakes: "Using a regular join that lists the reporter's name once for every award they won.",
    learningOutcomes: "Filter employee directories by child accolade frequency using semi-joins."
  },
  {
    title: "Music Tracks Streamed in Over 50 Distinct Metropolitan Markets",
    ind: "Media",
    diff: "Hard",
    table: "MusicTracks",
    scenario: "Detecting viral breakout music hits by finding tracks that registered stream plays across 50 or more distinct global city markets.",
    businessObjective: "Semi-join MusicTracks to StreamLocations on isrc_code using WHERE EXISTS and distinct city aggregation.",
    schemaSnippet: "`MusicTracks (isrc_code VARCHAR(12) PRIMARY KEY, track_title VARCHAR(100), artist_name VARCHAR(100))` & `StreamLocations (play_id BIGINT PRIMARY KEY, isrc_code VARCHAR(12), metro_city VARCHAR(32))`",
    targetQuery: `SELECT m.isrc_code, m.track_title, m.artist_name\nFROM MusicTracks m\nWHERE EXISTS (\n  SELECT 1\n  FROM StreamLocations s\n  WHERE s.isrc_code = m.isrc_code\n  GROUP BY s.isrc_code\n  HAVING COUNT(DISTINCT s.metro_city) >= 50\n)\nORDER BY m.artist_name ASC;`,
    eli5Story: "Finding viral songs that are being listened to in Tokyo, London, New York, Paris, and 46 other big cities all at once.",
    commonMistakes: "Counting raw play_id rows instead of DISTINCT metro_city, which misidentifies local hits with many plays in one city as global hits.",
    learningOutcomes: "Identify viral media diffusion patterns using geographical semi-joins."
  },

  // --- SECURITY ---
  {
    title: "Vulnerable Server Assets With Internet-Exposed Open Ports",
    ind: "Security",
    diff: "Medium",
    table: "ServerInventory",
    scenario: "Prioritizing urgent cybersecurity patches by identifying production servers that have at least one publicly accessible port (e.g. 22, 3389, 443).",
    businessObjective: "Semi-join ServerInventory to PortScans on asset_id using WHERE EXISTS to compile immediate vulnerability remediation lists.",
    schemaSnippet: "`ServerInventory (asset_id VARCHAR(32) PRIMARY KEY, hostname VARCHAR(64), ip_address VARCHAR(45))` & `PortScans (scan_id BIGINT PRIMARY KEY, asset_id VARCHAR(32), port_number INT, is_open BOOLEAN, is_public BOOLEAN)`",
    targetQuery: `SELECT s.asset_id, s.hostname, s.ip_address\nFROM ServerInventory s\nWHERE EXISTS (\n  SELECT 1\n  FROM PortScans p\n  WHERE p.asset_id = s.asset_id\n    AND p.is_open = TRUE\n    AND p.is_public = TRUE\n    AND p.port_number IN (22, 3389, 8080)\n)\nORDER BY s.hostname ASC;`,
    eli5Story: "Finding company servers that have their digital front doors (ports) wide open to the public internet so hackers can't sneak in.",
    commonMistakes: "Using an INNER JOIN which produces 3 rows for a server that has all three ports open.",
    learningOutcomes: "Filter corporate IT assets based on open vulnerability attack surfaces."
  },
  {
    title: "Cloud IAM User Accounts Triggering Root Console Logins From Unknown Geographies",
    ind: "Security",
    diff: "Hard",
    table: "IamUsers",
    scenario: "Detecting credential theft by finding administrative cloud accounts that triggered root console logins outside of approved corporate headquarters countries.",
    businessObjective: "Semi-join IamUsers to ConsoleLogins on user_id using WHERE EXISTS to trigger immediate automated credential revocation.",
    schemaSnippet: "`IamUsers (user_id VARCHAR(32) PRIMARY KEY, email VARCHAR(100), role_tier VARCHAR(16))` & `ConsoleLogins (event_id VARCHAR(64) PRIMARY KEY, user_id VARCHAR(32), country_iso VARCHAR(2), is_root BOOLEAN)`",
    targetQuery: `SELECT u.user_id, u.email, u.role_tier\nFROM IamUsers u\nWHERE EXISTS (\n  SELECT 1\n  FROM ConsoleLogins l\n  WHERE l.user_id = u.user_id\n    AND l.is_root = TRUE\n    AND l.country_iso NOT IN ('US', 'CA', 'GB')\n)\nORDER BY u.email ASC;`,
    eli5Story: "Sounding the alarm if someone logs in as the company cloud master admin from a foreign country where none of our engineers live.",
    commonMistakes: "Using NOT IN on nullable country fields without handling NULLs, leading to unexpected empty result sets.",
    learningOutcomes: "Implement identity threat detection queries using geo-fenced semi-joins."
  },
  {
    title: "Corporate Endpoints With Active Malware Quarantine Alerts",
    ind: "Security",
    diff: "Easy",
    table: "EndpointAssets",
    scenario: "Isolating compromised workstations by finding company laptops that have at least one unresolved malware containment alert.",
    businessObjective: "Semi-join EndpointAssets to MalwareAlerts on endpoint_id using WHERE EXISTS to isolate machines from the corporate WiFi.",
    schemaSnippet: "`EndpointAssets (endpoint_id VARCHAR(32) PRIMARY KEY, computer_name VARCHAR(64), assigned_user VARCHAR(100))` & `MalwareAlerts (alert_id VARCHAR(32) PRIMARY KEY, endpoint_id VARCHAR(32), status VARCHAR(16))`",
    targetQuery: `SELECT e.endpoint_id, e.computer_name, e.assigned_user\nFROM EndpointAssets e\nWHERE EXISTS (\n  SELECT 1\n  FROM MalwareAlerts m\n  WHERE m.endpoint_id = e.endpoint_id\n    AND m.status = 'UNRESOLVED'\n)\nORDER BY e.computer_name ASC;`,
    eli5Story: "Finding laptops that have a virus on them right now so our IT security team can disconnect them from the company network.",
    commonMistakes: "Using an INNER JOIN that lists a laptop 5 times if it has 5 infected files.",
    learningOutcomes: "Isolate compromised IT assets without duplicate notifications."
  },

  // --- HARDWARE ---
  {
    title: "Electronic Components Sourced Exclusively From Tier-1 Certified Vendors",
    ind: "Hardware",
    diff: "Medium",
    table: "CircuitComponents",
    scenario: "Ensuring aerospace hardware reliability by identifying electronic circuit components that have verified sourcing records from ISO-9001 certified vendors.",
    businessObjective: "Semi-join CircuitComponents to VendorCertifications on part_number using WHERE EXISTS to certify component procurement.",
    schemaSnippet: "`CircuitComponents (part_number VARCHAR(32) PRIMARY KEY, description VARCHAR(100), component_type VARCHAR(24))` & `VendorCertifications (cert_id VARCHAR(32) PRIMARY KEY, part_number VARCHAR(32), iso_standard VARCHAR(16), is_active BOOLEAN)`",
    targetQuery: `SELECT c.part_number, c.description, c.component_type\nFROM CircuitComponents c\nWHERE EXISTS (\n  SELECT 1\n  FROM VendorCertifications v\n  WHERE v.part_number = c.part_number\n    AND v.iso_standard = 'ISO_9001'\n    AND v.is_active = TRUE\n)\nORDER BY c.part_number ASC;`,
    eli5Story: "Verifying which computer chips and resistors came from top certified factories before soldering them into airplane flight computers.",
    commonMistakes: "Using an INNER JOIN that produces duplicate rows when a vendor holds multiple ISO certifications.",
    learningOutcomes: "Validate supply chain component quality standards using semi-joins."
  },
  {
    title: "Manufacturing Fabrication Lots With Critical Thermal Excursions",
    ind: "Hardware",
    diff: "Hard",
    table: "FabricationLots",
    scenario: "Quarantining semiconductor microchip batches by finding fabrication lots that experienced 3 or more chamber thermal limit spikes during processing.",
    businessObjective: "Semi-join FabricationLots to ChamberTelemetry on lot_id using WHERE EXISTS with group count filtering.",
    schemaSnippet: "`FabricationLots (lot_id VARCHAR(32) PRIMARY KEY, product_line VARCHAR(32), wafer_count INT)` & `ChamberTelemetry (reading_id BIGINT PRIMARY KEY, lot_id VARCHAR(32), temp_celsius DECIMAL(5,1))`",
    targetQuery: `SELECT f.lot_id, f.product_line, f.wafer_count\nFROM FabricationLots f\nWHERE EXISTS (\n  SELECT 1\n  FROM ChamberTelemetry t\n  WHERE t.lot_id = f.lot_id\n    AND t.temp_celsius >= 450.0\n  GROUP BY t.lot_id\n  HAVING COUNT(t.reading_id) >= 3\n)\nORDER BY f.lot_id ASC;`,
    eli5Story: "Finding batches of microchips that got too hot in the oven three times during manufacturing so we can inspect them for defects.",
    commonMistakes: "Joining raw telemetry and running COUNT(t.reading_id) without subqueries, complicating production reports.",
    learningOutcomes: "Detect manufacturing temperature violations using aggregated semi-joins."
  },
  {
    title: "Surface Mount Assembly Machines Requiring Nozzle Maintenance",
    ind: "Hardware",
    diff: "Easy",
    table: "SmtMachines",
    scenario: "Scheduling factory maintenance by finding circuit board pick-and-place machines that have logged nozzle vacuum pickup errors.",
    businessObjective: "Semi-join SmtMachines to PickupErrorLogs on machine_id using WHERE EXISTS to direct maintenance technicians.",
    schemaSnippet: "`SmtMachines (machine_id VARCHAR(16) PRIMARY KEY, factory_zone VARCHAR(16), model VARCHAR(32))` & `PickupErrorLogs (error_id BIGINT PRIMARY KEY, machine_id VARCHAR(16), error_code VARCHAR(16))`",
    targetQuery: `SELECT m.machine_id, m.factory_zone, m.model\nFROM SmtMachines m\nWHERE EXISTS (\n  SELECT 1\n  FROM PickupErrorLogs e\n  WHERE e.machine_id = m.machine_id\n    AND e.error_code = 'NOZZLE_VACUUM_DROP'\n)\nORDER BY m.factory_zone ASC, m.machine_id ASC;`,
    eli5Story: "Finding circuit board assembly robots whose suction nozzles dropped tiny resistors so technicians can clean the nozzle tips.",
    commonMistakes: "Using an INNER JOIN which produces 100 rows for a robot that dropped 100 resistors.",
    learningOutcomes: "Direct factory maintenance operations using clean machine-level semi-joins."
  },

  // --- HR ---
  {
    title: "Corporate Managers With at Least 5 Direct Reports",
    ind: "HR",
    diff: "Medium",
    table: "StaffDirectory",
    scenario: "Auditing organizational span-of-control by identifying people managers who supervise 5 or more direct employee reports.",
    businessObjective: "Semi-join StaffDirectory against itself on manager_id using WHERE EXISTS and group count filtering.",
    schemaSnippet: "`StaffDirectory (employee_id VARCHAR(32) PRIMARY KEY, full_name VARCHAR(100), job_title VARCHAR(64), manager_id VARCHAR(32))`",
    targetQuery: `SELECT m.employee_id, m.full_name, m.job_title\nFROM StaffDirectory m\nWHERE EXISTS (\n  SELECT 1\n  FROM StaffDirectory e\n  WHERE e.manager_id = m.employee_id\n  GROUP BY e.manager_id\n  HAVING COUNT(e.employee_id) >= 5\n)\nORDER BY m.full_name ASC;`,
    eli5Story: "Finding bosses who have 5 or more employees reporting directly to them, without duplicating the boss's name 5 times.",
    commonMistakes: "Self-joining directly and grouping by manager, which breaks if manager attributes need to be projected alongside other tables.",
    learningOutcomes: "Execute span-of-control queries combining self-referential keys with semi-join subqueries."
  },
  {
    title: "Employees Enrolled in Executive International Relocation Benefit Packages",
    ind: "HR",
    diff: "Easy",
    table: "EmployeesMaster",
    scenario: "Preparing international tax filings by identifying corporate employees who have an active global expat relocation benefit claim on file.",
    businessObjective: "Semi-join EmployeesMaster to RelocationClaims on employee_id using WHERE EXISTS to identify expatriate employees.",
    schemaSnippet: "`EmployeesMaster (employee_id VARCHAR(32) PRIMARY KEY, employee_name VARCHAR(100), base_location VARCHAR(32))` & `RelocationClaims (claim_id VARCHAR(32) PRIMARY KEY, employee_id VARCHAR(32), is_expat_package BOOLEAN)`",
    targetQuery: `SELECT e.employee_id, e.employee_name, e.base_location\nFROM EmployeesMaster e\nWHERE EXISTS (\n  SELECT 1\n  FROM RelocationClaims r\n  WHERE r.employee_id = e.employee_id\n    AND r.is_expat_package = TRUE\n)\nORDER BY e.employee_name ASC;`,
    eli5Story: "Finding employees who moved overseas for the company and received expat moving packages so HR can calculate their foreign tax papers.",
    commonMistakes: "Using a regular join that duplicates employees who submitted multiple moving receipts.",
    learningOutcomes: "Identify employees with specialized benefit enrollments using semi-joins."
  },
  {
    title: "Remote Employees Working in States Without Corporate Legal Entity Registration",
    ind: "HR",
    diff: "Hard",
    table: "RemoteWorkers",
    scenario: "Preventing corporate payroll tax penalties by identifying remote employees residing in states where the company lacks legal tax nexus registration.",
    businessObjective: "Semi-join RemoteWorkers to UnregisteredNexusStates on state_code using WHERE EXISTS to prompt legal registrations.",
    schemaSnippet: "`RemoteWorkers (worker_id VARCHAR(32) PRIMARY KEY, worker_name VARCHAR(100), home_state VARCHAR(2))` & `UnregisteredNexusStates (state_code VARCHAR(2) PRIMARY KEY, requires_entity_filing BOOLEAN)`",
    targetQuery: `SELECT w.worker_id, w.worker_name, w.home_state\nFROM RemoteWorkers w\nWHERE EXISTS (\n  SELECT 1\n  FROM UnregisteredNexusStates s\n  WHERE s.state_code = w.home_state\n    AND s.requires_entity_filing = TRUE\n)\nORDER BY w.home_state ASC, w.worker_name ASC;`,
    eli5Story: "Finding remote workers living in states where our company doesn't have a business license yet so our legal team can register before tax season.",
    commonMistakes: "Using NOT EXISTS when the subquery table explicitly lists UNREGISTERED states requiring filings.",
    learningOutcomes: "Enforce multi-state payroll tax nexus compliance using semi-joins."
  },

  // --- PLATFORMS ---
  {
    title: "Marketplace Merchants Eligible for Instant Same-Day Bank Payouts",
    ind: "Platforms",
    diff: "Easy",
    table: "PlatformSellers",
    scenario: "Enabling instant cashout features for trusted marketplace sellers by identifying merchants who have completed at least 50 five-star sales.",
    businessObjective: "Semi-join PlatformSellers to SalesFeedback on seller_id using WHERE EXISTS to unlock instant payout features.",
    schemaSnippet: "`PlatformSellers (seller_id VARCHAR(32) PRIMARY KEY, shop_name VARCHAR(64), bank_account_linked BOOLEAN)` & `SalesFeedback (feedback_id BIGINT PRIMARY KEY, seller_id VARCHAR(32), rating_stars INT)`",
    targetQuery: `SELECT s.seller_id, s.shop_name\nFROM PlatformSellers s\nWHERE s.bank_account_linked = TRUE\n  AND EXISTS (\n    SELECT 1\n    FROM SalesFeedback f\n    WHERE f.seller_id = s.seller_id\n      AND f.rating_stars = 5\n    GROUP BY f.seller_id\n    HAVING COUNT(f.feedback_id) >= 50\n  )\nORDER BY s.shop_name ASC;`,
    eli5Story: "Finding reliable online sellers with 50+ five-star reviews so we can unlock instant same-day bank deposits for their store.",
    commonMistakes: "Joining feedback raw and grouping by seller, which explodes the query when seller inventory tables are joined later.",
    learningOutcomes: "Unlock platform features based on aggregated seller reputation semi-joins."
  },
  {
    title: "Food Delivery Restaurants With Multiple Late Courier Dispatch Delays",
    ind: "Platforms",
    diff: "Medium",
    table: "RestaurantPartners",
    scenario: "Improving delivery dispatch algorithms by identifying restaurant kitchens that caused 5 or more delivery couriers to wait over 15 minutes this week.",
    businessObjective: "Semi-join RestaurantPartners to CourierDelays on restaurant_id using WHERE EXISTS to adjust prep-time estimates.",
    schemaSnippet: "`RestaurantPartners (restaurant_id VARCHAR(32) PRIMARY KEY, restaurant_name VARCHAR(64), neighborhood VARCHAR(32))` & `CourierDelays (delay_id BIGINT PRIMARY KEY, restaurant_id VARCHAR(32), wait_minutes INT, delay_date DATE)`",
    targetQuery: `SELECT r.restaurant_id, r.restaurant_name, r.neighborhood\nFROM RestaurantPartners r\nWHERE EXISTS (\n  SELECT 1\n  FROM CourierDelays d\n  WHERE d.restaurant_id = r.restaurant_id\n    AND d.wait_minutes >= 15\n    AND d.delay_date >= CURRENT_DATE - INTERVAL 7 DAY\n  GROUP BY d.restaurant_id\n  HAVING COUNT(d.delay_id) >= 5\n)\nORDER BY r.restaurant_name ASC;`,
    eli5Story: "Finding restaurants where delivery drivers are constantly waiting over 15 minutes for the food to be cooked so our app can pad the prep time.",
    commonMistakes: "Using an INNER JOIN which duplicates the restaurant row for every courier delay incident.",
    learningOutcomes: "Identify platform operational bottlenecks using semi-joins."
  },
  {
    title: "Electric Vehicle Drivers Utilizing High-Speed Superchargers Across Multiple States",
    ind: "Platforms",
    diff: "Hard",
    table: "EvDrivers",
    scenario: "Targeting cross-country road trip promotion subscriptions to electric vehicle owners who plugged into fast chargers in 3 or more distinct US states.",
    businessObjective: "Semi-join EvDrivers to ChargingEvents on driver_id using WHERE EXISTS and state count thresholds.",
    schemaSnippet: "`EvDrivers (driver_id VARCHAR(32) PRIMARY KEY, driver_email VARCHAR(100))` & `ChargingEvents (event_id BIGINT PRIMARY KEY, driver_id VARCHAR(32), station_state VARCHAR(2))`",
    targetQuery: `SELECT d.driver_id, d.driver_email\nFROM EvDrivers d\nWHERE EXISTS (\n  SELECT 1\n  FROM ChargingEvents e\n  WHERE e.driver_id = d.driver_id\n  GROUP BY e.driver_id\n  HAVING COUNT(DISTINCT e.station_state) >= 3\n)\nORDER BY d.driver_email ASC;`,
    eli5Story: "Finding EV drivers who love road trips and charged their electric car in at least 3 different states so we can offer them our road trip membership.",
    commonMistakes: "Using COUNT(e.station_state) instead of COUNT(DISTINCT e.station_state), which counts multiple plug-ins in the same state.",
    learningOutcomes: "Filter platform driver cohorts based on cross-jurisdictional usage frequency using semi-joins."
  },
  {
    title: "Enterprise Workspaces With Custom SSO Identity Provider Configurations",
    ind: "SaaS",
    diff: "Medium",
    table: "Workspaces",
    scenario: "IT audit identifying customer enterprise organizations that have activated at least one custom SAML or OIDC single sign-on provider.",
    businessObjective: "Semi-join Workspaces to SsoConfigurations on organization_id using WHERE EXISTS to isolate SAML-configured accounts.",
    schemaSnippet: "`Workspaces (workspace_id VARCHAR(32) PRIMARY KEY, org_name VARCHAR(64), plan_tier VARCHAR(16))` & `SsoConfigurations (config_id BIGINT PRIMARY KEY, workspace_id VARCHAR(32), protocol VARCHAR(16), status VARCHAR(16))`",
    targetQuery: `SELECT w.workspace_id, w.org_name, w.plan_tier\nFROM Workspaces w\nWHERE EXISTS (\n  SELECT 1\n  FROM SsoConfigurations s\n  WHERE s.workspace_id = w.workspace_id\n    AND s.status = 'ACTIVE'\n)\nORDER BY w.org_name ASC;`,
    eli5Story: "Finding companies that hooked up their company login system to our app so we know which accounts are fully enterprise-ready.",
    commonMistakes: "Using an INNER JOIN that multiplies the workspace row if an organization configured both SAML and OIDC SSO gateways.",
    learningOutcomes: "Filter enterprise client directories based on security configurations without duplicate results."
  },
  {
    title: "Omnichannel Shoppers With Cross-Channel In-Store and Online Cart Conversions",
    ind: "Retail",
    diff: "Hard",
    table: "OnlineCarts",
    scenario: "Marketing loyalty team identifying shoppers who completed an in-store register purchase within 48 hours of abandoning an online cart session.",
    businessObjective: "Semi-join OnlineCarts to StorePurchases on customer_id using WHERE EXISTS with a 48-hour timestamp delta predicate.",
    schemaSnippet: "`OnlineCarts (cart_id BIGINT PRIMARY KEY, customer_id VARCHAR(32), abandoned_at TIMESTAMP)` & `StorePurchases (purchase_id BIGINT PRIMARY KEY, customer_id VARCHAR(32), store_id VARCHAR(16), purchase_time TIMESTAMP)`",
    targetQuery: `SELECT c.cart_id, c.customer_id, c.abandoned_at\nFROM OnlineCarts c\nWHERE EXISTS (\n  SELECT 1\n  FROM StorePurchases s\n  WHERE s.customer_id = c.customer_id\n    AND s.purchase_time BETWEEN c.abandoned_at AND c.abandoned_at + INTERVAL 48 HOUR\n)\nORDER BY c.abandoned_at DESC;`,
    eli5Story: "Spotting shoppers who left items in their digital website cart and walked into our brick-and-mortar retail shop the next day to buy them.",
    commonMistakes: "Using an INNER JOIN which creates duplicate cart notifications if the customer bought items across multiple store cash registers.",
    learningOutcomes: "Evaluate cross-channel omnichannel customer journeys using time-bounded semi-joins."
  },
  {
    title: "Critical Intensive Care Patients Requiring Continuous Invasive Hemodynamic Monitoring",
    ind: "Healthcare",
    diff: "Hard",
    table: "IcuPatients",
    scenario: "Hospital clinical quality committee flagging ICU patients who had at least 3 continuous arterial line blood pressure monitoring readings below 60 mmHg mean arterial pressure (MAP).",
    businessObjective: "Semi-join IcuPatients to HemodynamicReadings on patient_id using WHERE EXISTS and minimum incident count thresholds.",
    schemaSnippet: "`IcuPatients (patient_id VARCHAR(32) PRIMARY KEY, bed_number VARCHAR(16), admitting_diagnosis VARCHAR(64))` & `HemodynamicReadings (reading_id BIGINT PRIMARY KEY, patient_id VARCHAR(32), reading_type VARCHAR(16), reading_value DECIMAL(5,2))`",
    targetQuery: `SELECT p.patient_id, p.bed_number, p.admitting_diagnosis\nFROM IcuPatients p\nWHERE EXISTS (\n  SELECT 1\n  FROM HemodynamicReadings h\n  WHERE h.patient_id = p.patient_id\n    AND h.reading_type = 'MAP'\n    AND h.reading_value < 60.0\n  GROUP BY h.patient_id\n  HAVING COUNT(h.reading_id) >= 3\n)\nORDER BY p.bed_number ASC;`,
    eli5Story: "Sounding alerts for ICU patients whose blood pressure dropped below safe levels at least three separate times today so the doctor can adjust vasopressors.",
    commonMistakes: "Joining raw vital signs tables without semi-joins, causing clinical dashboards to show 1,000 duplicate patient rows for 1,000 sensor pings.",
    learningOutcomes: "Detect recurring clinical threshold events using correlated subquery semi-joins."
  },
  {
    title: "Freight Carriers Operating Certified Cold-Chain Refrigerated Fleets",
    ind: "Logistics",
    diff: "Easy",
    table: "Carriers",
    scenario: "Temperature-sensitive pharmaceutical dispatch team filtering the carrier directory for freight logistics companies that operate at least one certified sub-zero reefer trailer.",
    businessObjective: "Semi-join Carriers to FleetTrailers on carrier_id using WHERE EXISTS to qualify temperature-controlled carriers.",
    schemaSnippet: "`Carriers (carrier_id VARCHAR(32) PRIMARY KEY, carrier_name VARCHAR(64), dot_number VARCHAR(16))` & `FleetTrailers (trailer_id VARCHAR(32) PRIMARY KEY, carrier_id VARCHAR(32), trailer_type VARCHAR(16), temp_certified BOOLEAN)`",
    targetQuery: `SELECT c.carrier_id, c.carrier_name, c.dot_number\nFROM Carriers c\nWHERE EXISTS (\n  SELECT 1\n  FROM FleetTrailers t\n  WHERE t.carrier_id = c.carrier_id\n    AND t.trailer_type = 'REEFER'\n    AND t.temp_certified = TRUE\n)\nORDER BY c.carrier_name ASC;`,
    eli5Story: "Looking through our list of trucking companies to find only those who have refrigerated freezer trucks capable of shipping vaccines safely.",
    commonMistakes: "Using a regular JOIN that duplicates the carrier name 200 times if the carrier has 200 reefer trailers in their fleet.",
    learningOutcomes: "Filter multi-asset transportation vendors using clean, single-row semi-join evaluations."
  }
];
