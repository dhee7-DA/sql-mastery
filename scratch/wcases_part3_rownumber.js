// =============================================================================
// SECTION 9 - PART 3: ROW_NUMBER() STREAM DEDUPLICATION & KEYSET ORDERING (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: Strict Uniqueness, Stream Deduplication (rn=1), Latest Event Anchors, Determinism
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Cardholder Most Recent Billing Address Deduplication",
    ind: "Fintech",
    diff: "Easy",
    table: "CardholderAddresses",
    scenario: "Customer onboarding systems frequently receive duplicate address updates; billing statements require exactly the single latest verified address per cardholder.",
    businessObjective: "Deduplicate cardholder addresses, isolating the latest verified record using ROW_NUMBER() over updated_at.",
    schemaSnippet: "`CardholderAddresses (address_id VARCHAR(32) PRIMARY KEY, cardholder_id VARCHAR(24), street_line VARCHAR(100), city VARCHAR(50), updated_at TIMESTAMP)`",
    targetQuery: `WITH LatestAddress AS (\n  SELECT address_id,\n         cardholder_id,\n         street_line,\n         city,\n         updated_at,\n         ROW_NUMBER() OVER (PARTITION BY cardholder_id ORDER BY updated_at DESC, address_id DESC) AS rn\n  FROM CardholderAddresses\n)\nSELECT address_id,\n       cardholder_id,\n       street_line,\n       city,\n       updated_at\nFROM LatestAddress\nWHERE rn = 1\nORDER BY cardholder_id;`,
    eli5Story: "If a bank customer moved 4 times and updated their address each time, sort their addresses by date and pick strictly the #1 newest address.",
    commonMistakes: "Using RANK() instead of ROW_NUMBER(), which could return multiple rows if two address updates share the exact same timestamp.",
    learningOutcomes: "Enforce strict 1-to-1 entity deduplication using deterministic tie-breaker keys in ROW_NUMBER()."
  },
  {
    title: "Payment Webhook Idempotency Event Deduplication Stream",
    ind: "Fintech",
    diff: "Medium",
    table: "WebhookDeliveryEvents",
    scenario: "Payment gateway webhook listeners receive multiple retried HTTP delivery events for the same checkout intent; reconciliation engines must process exactly the earliest acknowledged delivery payload.",
    businessObjective: "Deduplicate incoming event streams, isolating the first delivery timestamp per intent_id.",
    schemaSnippet: "`WebhookDeliveryEvents (delivery_id VARCHAR(36) PRIMARY KEY, payment_intent_id VARCHAR(32), status_code INT, payload_json TEXT, delivered_at TIMESTAMP)`",
    targetQuery: `WITH DeduplicatedEvents AS (\n  SELECT delivery_id,\n         payment_intent_id,\n         status_code,\n         delivered_at,\n         ROW_NUMBER() OVER (\n           PARTITION BY payment_intent_id \n           ORDER BY delivered_at ASC, delivery_id ASC\n         ) AS event_seq\n  FROM WebhookDeliveryEvents\n  WHERE status_code = 200\n)\nSELECT delivery_id,\n       payment_intent_id,\n       delivered_at\nFROM DeduplicatedEvents\nWHERE event_seq = 1\nORDER BY delivered_at ASC;`,
    eli5Story: "When Stripe or PayPal retries a webhook 5 times, find all successful deliveries and process only the very first one that landed in our database.",
    commonMistakes: "Ordering DESC instead of ASC, inadvertently picking the last retry instead of the original event.",
    learningOutcomes: "Implement idempotent message deduplication in stream processing pipelines."
  },
  {
    title: "High-Frequency Limit Order Book Keyset Sequencing & State Replay",
    ind: "Fintech",
    diff: "Hard",
    table: "LimitOrderMessages",
    scenario: "Equities exchange market data feeds audit order book state transitions by reconstructing the precise sequence of tick events per ticker and order ID to prove price-time priority compliance.",
    businessObjective: "Assign strictly monotonic sequence numbers to message streams and filter for state changes violating order progression.",
    schemaSnippet: "`LimitOrderMessages (msg_id VARCHAR(36) PRIMARY KEY, symbol VARCHAR(12), order_id VARCHAR(24), event_type VARCHAR(16), price DECIMAL(10,4), shares INT, engine_timestamp BIGINT)`",
    targetQuery: `WITH OrderedFeed AS (\n  SELECT msg_id,\n         symbol,\n         order_id,\n         event_type,\n         price,\n         shares,\n         engine_timestamp,\n         ROW_NUMBER() OVER (\n           PARTITION BY symbol, order_id \n           ORDER BY engine_timestamp ASC, msg_id ASC\n         ) AS lifecycle_seq\n  FROM LimitOrderMessages\n)\nSELECT msg_id,\n       symbol,\n       order_id,\n       event_type,\n       price,\n       shares,\n       engine_timestamp,\n       lifecycle_seq\nFROM OrderedFeed\nWHERE lifecycle_seq = 1 AND event_type != 'NEW'\nORDER BY engine_timestamp ASC;`,
    eli5Story: "Number every action taken on an order (placed, modified, filled, cancelled) in chronological order. If the very first action on an order wasn't 'NEW', someone messed up the trading log.",
    commonMistakes: "Relying on auto-incrementing surrogate IDs instead of matching engine nanosecond timestamps with secondary UUID tie-breakers.",
    learningOutcomes: "Construct monotonic event lifecycles to detect out-of-order state transitions in financial data feeds."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Active SaaS Subscription Contract Deduplication per Tenant",
    ind: "SaaS",
    diff: "Easy",
    table: "TenantContracts",
    scenario: "Customer success dashboards require displaying each customer's active contract, resolving multiple legacy amendments by selecting the contract with the latest renewal date.",
    businessObjective: "Select the single active contract with the latest renewal date per tenant using ROW_NUMBER().",
    schemaSnippet: "`TenantContracts (contract_id VARCHAR(32) PRIMARY KEY, tenant_id VARCHAR(32), plan_name VARCHAR(32), renewal_date DATE, annual_value DECIMAL(10,2))`",
    targetQuery: `WITH ActiveContracts AS (\n  SELECT contract_id,\n         tenant_id,\n         plan_name,\n         renewal_date,\n         annual_value,\n         ROW_NUMBER() OVER (PARTITION BY tenant_id ORDER BY renewal_date DESC, contract_id DESC) AS rn\n  FROM TenantContracts\n)\nSELECT contract_id,\n       tenant_id,\n       plan_name,\n       renewal_date,\n       annual_value\nFROM ActiveContracts\nWHERE rn = 1\nORDER BY annual_value DESC;`,
    eli5Story: "When an enterprise customer has signed 3 renewals over the years, pick strictly the one with the latest expiration date.",
    commonMistakes: "Using MAX(renewal_date) with GROUP BY, which prevents selecting the associated contract_id and plan_name.",
    learningOutcomes: "Replace inefficient correlated subqueries with ROW_NUMBER() = 1 filtering."
  },
  {
    title: "User Session Latest IP Geolocation Tagging",
    ind: "SaaS",
    diff: "Medium",
    table: "UserLoginHistory",
    scenario: "Security compliance reports need to map each registered user to their most recent login city and country, discarding older historical sessions.",
    businessObjective: "Extract the single most recent login session per user_id.",
    schemaSnippet: "`UserLoginHistory (session_id VARCHAR(36) PRIMARY KEY, user_id VARCHAR(32), ip_address VARCHAR(45), city VARCHAR(50), country VARCHAR(2), login_time TIMESTAMP)`",
    targetQuery: `SELECT user_id,\n       session_id,\n       ip_address,\n       city,\n       country,\n       login_time\nFROM UserLoginHistory\nQUALIFY ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_time DESC, session_id DESC) = 1\nORDER BY user_id;`,
    eli5Story: "Look through millions of logins and keep only the single latest login location for each user.",
    commonMistakes: "Forgetting the secondary tie-breaker (session_id DESC) in the ORDER BY clause, causing non-deterministic results if two logins occur in the same second.",
    learningOutcomes: "Write deterministic window ORDER BY specifications for dimensional attribute extraction."
  },
  {
    title: "CI/CD Build Pipeline Flaky Test Result Deduplication",
    ind: "SaaS",
    diff: "Hard",
    table: "BuildTestExecutions",
    scenario: "Engineering platform teams analyze test suite flakiness by extracting the initial run result and the final rerun result for each test case in a pull request build.",
    businessObjective: "Use dual ROW_NUMBER() windows (ASC and DESC) to extract both the first and last execution status of each test in a single query pass.",
    schemaSnippet: "`BuildTestExecutions (exec_id VARCHAR(36) PRIMARY KEY, build_id VARCHAR(32), test_name VARCHAR(128), status VARCHAR(8), run_time TIMESTAMP)`",
    targetQuery: `WITH TestSequences AS (\n  SELECT build_id,\n         test_name,\n         status,\n         run_time,\n         ROW_NUMBER() OVER (PARTITION BY build_id, test_name ORDER BY run_time ASC) AS first_run_rn,\n         ROW_NUMBER() OVER (PARTITION BY build_id, test_name ORDER BY run_time DESC) AS last_run_rn\n  FROM BuildTestExecutions\n)\nSELECT f.build_id,\n       f.test_name,\n       f.status AS initial_status,\n       l.status AS final_status,\n       CASE WHEN f.status = 'FAIL' AND l.status = 'PASS' THEN 'FLAKY_RECOVERED'\n            WHEN f.status = 'FAIL' AND l.status = 'FAIL' THEN 'TRUE_FAILURE'\n            ELSE 'STABLE_PASS' END AS test_verdict\nFROM TestSequences f\nJOIN TestSequences l\n  ON f.build_id = l.build_id AND f.test_name = l.test_name\nWHERE f.first_run_rn = 1 AND l.last_run_rn = 1\nORDER BY f.build_id, f.test_name;`,
    eli5Story: "When tests fail and automatically rerun, grab the very first attempt (first_run_rn = 1) and the very last attempt (last_run_rn = 1). If it failed first but passed later, label it 'Flaky'.",
    commonMistakes: "Writing two separate CTE queries and joining them on dates, which is slow and error-prone compared to symmetrical ASC/DESC row numbering.",
    learningOutcomes: "Combine ascending and descending ROW_NUMBER() partitions to capture endpoints of a temporal event sequence."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Product Catalog Master Price List Deduplication",
    ind: "Retail",
    diff: "Easy",
    table: "ProductPriceStaging",
    scenario: "Merchandising ERPs receive multiple conflicting pricing records from suppliers; point-of-sale systems must extract strictly the single highest priority pricing update per SKU.",
    businessObjective: "Select the highest priority price record per SKU using ROW_NUMBER().",
    schemaSnippet: "`ProductPriceStaging (staging_id INT PRIMARY KEY, sku VARCHAR(24), price_usd DECIMAL(10,2), priority_tier INT, effective_date DATE)`",
    targetQuery: `WITH ValidatedPrices AS (\n  SELECT sku,\n         price_usd,\n         priority_tier,\n         effective_date,\n         ROW_NUMBER() OVER (\n           PARTITION BY sku \n           ORDER BY priority_tier DESC, effective_date DESC\n         ) AS rn\n  FROM ProductPriceStaging\n)\nSELECT sku,\n       price_usd,\n       priority_tier,\n       effective_date\nFROM ValidatedPrices\nWHERE rn = 1\nORDER BY sku;`,
    eli5Story: "If 3 suppliers proposed different prices for the same item, sort by supplier priority and date, and pick the #1 top-priority price.",
    commonMistakes: "Sorting by price_usd instead of priority_tier, accidentally picking the most expensive price instead of the authorized one.",
    learningOutcomes: "Order window partitions by business priority hierarchy to resolve staging table conflicts."
  },
  {
    title: "Retail Customer Single Highest Value Order Identification",
    ind: "Retail",
    diff: "Medium",
    table: "CustomerOrderHistory",
    scenario: "VIP loyalty marketing programs identify each customer's lifetime highest-value transaction to personalize anniversary rewards.",
    businessObjective: "Isolate each customer's single largest purchase using QUALIFY ROW_NUMBER().",
    schemaSnippet: "`CustomerOrderHistory (order_id VARCHAR(32) PRIMARY KEY, customer_id VARCHAR(24), order_total DECIMAL(10,2), order_date DATE)`",
    targetQuery: `SELECT customer_id,\n       order_id,\n       order_total,\n       order_date\nFROM CustomerOrderHistory\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY customer_id \n  ORDER BY order_total DESC, order_date DESC\n) = 1\nORDER BY order_total DESC;`,
    eli5Story: "Look through every receipt a shopper ever had with us, and pluck out their single biggest shopping spree.",
    commonMistakes: "Using MAX(order_total) without order_id, forcing an unnecessary secondary self-join.",
    learningOutcomes: "Use QUALIFY ROW_NUMBER() = 1 to cleanly extract the champion record with all metadata."
  },
  {
    title: "Omnichannel Customer Return Deduplication & Restock Routing",
    ind: "Retail",
    diff: "Hard",
    table: "ReturnDispositionScans",
    scenario: "Warehouse returns operations receive multiple scan events as a returned item passes inspection stations; inventory ledgers must record only the final official grading disposition.",
    businessObjective: "Deduplicate return scans to isolate the final grading disposition, joining back to order headers to compute net refund amounts.",
    schemaSnippet: "`ReturnDispositionScans (scan_id VARCHAR(36) PRIMARY KEY, rma_number VARCHAR(32), grade VARCHAR(8), refund_amount DECIMAL(10,2), scanned_at TIMESTAMP)`",
    targetQuery: `WITH FinalDispositions AS (\n  SELECT rma_number,\n         grade,\n         refund_amount,\n         scanned_at,\n         ROW_NUMBER() OVER (\n           PARTITION BY rma_number \n           ORDER BY scanned_at DESC, scan_id DESC\n         ) AS inspection_seq\n  FROM ReturnDispositionScans\n)\nSELECT rma_number,\n       grade,\n       refund_amount,\n       scanned_at\nFROM FinalDispositions\nWHERE inspection_seq = 1\nORDER BY scanned_at DESC;`,
    eli5Story: "When an item is returned, 3 different warehouse workers scan it as it moves down the belt. Pluck out only the final scan to issue the customer refund.",
    commonMistakes: "Assuming the highest refund_amount is the correct one; only the chronologically final inspection grade is legally binding.",
    learningOutcomes: "Enforce temporal progression deduplication in reverse logistics pipelines."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Patient Blood Pressure Latest Clinical Encounter Reading",
    ind: "Healthcare",
    diff: "Easy",
    table: "PatientVitalsHistory",
    scenario: "Primary care physicians reviewing chronic hypertension cases need each patient's most recent systolic and diastolic blood pressure reading from the EHR system.",
    businessObjective: "Extract the single latest blood pressure reading per patient using ROW_NUMBER().",
    schemaSnippet: "`PatientVitalsHistory (reading_id VARCHAR(32) PRIMARY KEY, patient_id VARCHAR(24), systolic_mmhg INT, diastolic_mmhg INT, recorded_at TIMESTAMP)`",
    targetQuery: `WITH LatestVitals AS (\n  SELECT patient_id,\n         systolic_mmhg,\n         diastolic_mmhg,\n         recorded_at,\n         ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at DESC, reading_id DESC) AS rn\n  FROM PatientVitalsHistory\n)\nSELECT patient_id,\n       systolic_mmhg,\n       diastolic_mmhg,\n       recorded_at\nFROM LatestVitals\nWHERE rn = 1\nORDER BY patient_id;`,
    eli5Story: "Show only the most recent blood pressure check for every patient so the doctor sees their current health status.",
    commonMistakes: "Using GROUP BY patient_id with MAX(recorded_at), which does not allow selecting systolic and diastolic columns without a messy self-join.",
    learningOutcomes: "Master the standard latest-state extraction pattern in clinical data warehouses."
  },
  {
    title: "Pharmacy Prescription Refill Latest Insurance Authorization",
    ind: "Healthcare",
    diff: "Medium",
    table: "PrescriptionAuthEvents",
    scenario: "Hospital outpatient pharmacies dispense specialty medications by retrieving the latest prior-authorization status from insurance payers.",
    businessObjective: "Retrieve the single latest prior-authorization status per prescription directly using QUALIFY.",
    schemaSnippet: "`PrescriptionAuthEvents (auth_id VARCHAR(36) PRIMARY KEY, rx_number VARCHAR(24), payer_id VARCHAR(16), status VARCHAR(16), adjudicated_at TIMESTAMP)`",
    targetQuery: `SELECT rx_number,\n       payer_id,\n       status,\n       adjudicated_at\nFROM PrescriptionAuthEvents\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY rx_number \n  ORDER BY adjudicated_at DESC, auth_id DESC\n) = 1\nORDER BY rx_number;`,
    eli5Story: "Insurance companies approve and deny drug coverage multiple times. Pull out the single newest authorization decision so the pharmacist knows if they can hand over the pills.",
    commonMistakes: "Ordering by auth_id instead of adjudicated_at, assuming surrogate keys always reflect true chronological time.",
    learningOutcomes: "Utilize adjudicated timestamps with secondary surrogate tie-breakers for healthcare claim adjudication."
  },
  {
    title: "Clinical Trial Patient Adverse Event Severity Sequence Indexing",
    ind: "Healthcare",
    diff: "Hard",
    table: "ClinicalTrialAdverseEvents",
    scenario: "FDA clinical trial safety auditors examine drug toxicity by assigning sequence numbers to all adverse events experienced by a patient, isolating patients whose first adverse event was rated severe (Grade 4).",
    businessObjective: "Sequence patient adverse events chronologically and filter for subjects where event #1 was severe.",
    schemaSnippet: "`ClinicalTrialAdverseEvents (event_id VARCHAR(36) PRIMARY KEY, subject_id VARCHAR(24), protocol_id VARCHAR(16), toxicity_grade INT, event_description VARCHAR(100), onset_date DATE)`",
    targetQuery: `WITH SequencedEvents AS (\n  SELECT event_id,\n         subject_id,\n         protocol_id,\n         toxicity_grade,\n         event_description,\n         onset_date,\n         ROW_NUMBER() OVER (\n           PARTITION BY subject_id \n           ORDER BY onset_date ASC, event_id ASC\n         ) AS event_sequence_num\n  FROM ClinicalTrialAdverseEvents\n)\nSELECT subject_id,\n       protocol_id,\n       toxicity_grade,\n       event_description,\n       onset_date\nFROM SequencedEvents\nWHERE event_sequence_num = 1 AND toxicity_grade >= 4\nORDER BY protocol_id, onset_date ASC;`,
    eli5Story: "Put every side-effect a clinical trial volunteer had in timeline order. If their very first reaction was a Grade 4 severe emergency, report it to the FDA immediately.",
    commonMistakes: "Filtering toxicity_grade >= 4 inside the CTE, which alters the event sequence and mistakenly makes a patient's 3rd event look like their 1st event.",
    learningOutcomes: "Sequence complete unadulterated patient timelines before applying diagnostic criteria in the outer query."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Container GPS Tracker Latest Telematics Ping Extraction",
    ind: "Logistics",
    diff: "Easy",
    table: "ContainerGpsPings",
    scenario: "Ocean shipping visibility portals display the current real-time GPS coordinates of intermodal shipping containers by isolating the single latest ping per container.",
    businessObjective: "Select the most recent GPS location ping per container using ROW_NUMBER().",
    schemaSnippet: "`ContainerGpsPings (ping_id VARCHAR(36) PRIMARY KEY, container_id VARCHAR(20), lat DECIMAL(8,5), lon DECIMAL(8,5), ping_time TIMESTAMP)`",
    targetQuery: `WITH LatestPings AS (\n  SELECT container_id,\n         lat,\n         lon,\n         ping_time,\n         ROW_NUMBER() OVER (PARTITION BY container_id ORDER BY ping_time DESC, ping_id DESC) AS rn\n  FROM ContainerGpsPings\n)\nSELECT container_id,\n       lat,\n       lon,\n       ping_time\nFROM LatestPings\nWHERE rn = 1\nORDER BY container_id;`,
    eli5Story: "A GPS tracker on a shipping box sends location pings every 10 minutes. Grab only the newest location ping so the map shows where the box is right now.",
    commonMistakes: "Omitting the secondary tie-breaker (ping_id DESC), which can cause flickering coordinates if two pings share the same second.",
    learningOutcomes: "Extract latest IoT telematics state using robust tie-breaker ordering."
  },
  {
    title: "Package Milestone Scan Deduplication for Delivery Status Updates",
    ind: "Logistics",
    diff: "Medium",
    table: "PackageTrackingScans",
    scenario: "Courier sorting hubs frequently scan barcodes multiple times at the same conveyor belt; customer tracking pages require exactly one unique scan record per tracking milestone code.",
    businessObjective: "Deduplicate milestone scans to keep only the earliest scan per package milestone code using QUALIFY.",
    schemaSnippet: "`PackageTrackingScans (scan_id VARCHAR(36) PRIMARY KEY, tracking_number VARCHAR(32), milestone_code VARCHAR(16), hub_code VARCHAR(8), scanned_at TIMESTAMP)`",
    targetQuery: `SELECT tracking_number,\n       milestone_code,\n       hub_code,\n       scanned_at\nFROM PackageTrackingScans\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY tracking_number, milestone_code \n  ORDER BY scanned_at ASC, scan_id ASC\n) = 1\nORDER BY tracking_number, scanned_at ASC;`,
    eli5Story: "If an automated laser scanned a package 4 times as it rolled down the chute, keep only the first scan so the customer tracking screen doesn't show 4 duplicate updates.",
    commonMistakes: "Partitioning only by tracking_number, which would delete all milestones except the very first one.",
    learningOutcomes: "Partition across composite entity and status keys for event stream normalization."
  },
  {
    title: "Freight Broker Bid History Opening vs Winning Bid Extraction",
    ind: "Logistics",
    diff: "Hard",
    table: "FreightLoadBids",
    scenario: "Digital freight brokers analyze spot-market load pricing dynamics by comparing the very first submitted bid against the final accepted carrier bid for each load auction.",
    businessObjective: "Use symmetrical ROW_NUMBER() windows to capture the opening bid and winning bid in a single unified pipeline.",
    schemaSnippet: "`FreightLoadBids (bid_id VARCHAR(36) PRIMARY KEY, load_id VARCHAR(32), carrier_id VARCHAR(24), bid_amount_usd DECIMAL(10,2), is_awarded BOOLEAN, submitted_at TIMESTAMP)`",
    targetQuery: `WITH BidRankings AS (\n  SELECT load_id,\n         carrier_id,\n         bid_amount_usd,\n         is_awarded,\n         submitted_at,\n         ROW_NUMBER() OVER (PARTITION BY load_id ORDER BY submitted_at ASC) AS open_rn,\n         ROW_NUMBER() OVER (PARTITION BY load_id ORDER BY submitted_at DESC) AS final_rn\n  FROM FreightLoadBids\n)\nSELECT o.load_id,\n       o.bid_amount_usd AS opening_bid_usd,\n       f.bid_amount_usd AS final_bid_usd,\n       ROUND(o.bid_amount_usd - f.bid_amount_usd, 2) AS price_compression_usd,\n       ROUND(((o.bid_amount_usd - f.bid_amount_usd) / o.bid_amount_usd) * 100, 2) AS compression_pct\nFROM BidRankings o\nJOIN BidRankings f\n  ON o.load_id = f.load_id\nWHERE o.open_rn = 1 AND f.final_rn = 1\nORDER BY price_compression_usd DESC;`,
    eli5Story: "For every trucking auction, grab the very first price bid and the very last price bid. Compare them to see how much money the auction saved the shipper.",
    commonMistakes: "Assuming MIN(bid_amount_usd) is the opening bid; the opening bid is the first in time, not necessarily the cheapest.",
    learningOutcomes: "Distinguish between chronological sequence ordering and numerical value extremes."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "User Profile Avatar Image Latest Active Upload Deduplication",
    ind: "Media",
    diff: "Easy",
    table: "UserProfileMedia",
    scenario: "Social media profile engines display user avatars by selecting the single most recently uploaded active image record per user ID.",
    businessObjective: "Select the most recent active profile picture per user using ROW_NUMBER().",
    schemaSnippet: "`UserProfileMedia (media_id VARCHAR(36) PRIMARY KEY, user_id VARCHAR(24), cdn_url VARCHAR(255), is_active BOOLEAN, uploaded_at TIMESTAMP)`",
    targetQuery: `WITH LatestAvatar AS (\n  SELECT user_id,\n         cdn_url,\n         uploaded_at,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY uploaded_at DESC, media_id DESC) AS rn\n  FROM UserProfileMedia\n  WHERE is_active = TRUE\n)\nSELECT user_id,\n       cdn_url,\n       uploaded_at\nFROM LatestAvatar\nWHERE rn = 1\nORDER BY user_id;`,
    eli5Story: "When someone uploads 10 profile pictures, filter for active photos, sort by date, and pick the single newest one to show on their homepage.",
    commonMistakes: "Filtering is_active = TRUE in the outer query instead of the CTE, which could select an inactive image as #1 and then filter it out, leaving the user with no avatar.",
    learningOutcomes: "Place state validity filters prior to window ranking to guarantee non-null result sets."
  },
  {
    title: "Podcast Episode Most Recent Audio Master File Selection",
    ind: "Media",
    diff: "Medium",
    table: "PodcastAudioMasters",
    scenario: "Podcast hosting networks ingest multiple audio file re-encodings during editing; RSS feed generators must publish strictly the highest-revision approved master.",
    businessObjective: "Select the highest revision master audio track per episode using QUALIFY ROW_NUMBER().",
    schemaSnippet: "`PodcastAudioMasters (track_id VARCHAR(36) PRIMARY KEY, episode_id VARCHAR(32), revision_num INT, audio_url VARCHAR(255), is_approved BOOLEAN)`",
    targetQuery: `SELECT episode_id,\n       track_id,\n       revision_num,\n       audio_url\nFROM PodcastAudioMasters\nWHERE is_approved = TRUE\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY episode_id \n  ORDER BY revision_num DESC, track_id DESC\n) = 1\nORDER BY episode_id;`,
    eli5Story: "An audio engineer re-exports a podcast 5 times with minor fixes. Pick strictly the highest approved revision number to publish to Spotify and Apple Podcasts.",
    commonMistakes: "Sorting by upload time instead of revision_num, which can be dangerous if older files were re-uploaded during a backup restore.",
    learningOutcomes: "Use explicit semantic versioning columns for window ordering instead of ambient file timestamps."
  },
  {
    title: "Streaming Video Quality Rendition Ladder Deduplication Pipeline",
    ind: "Media",
    diff: "Hard",
    table: "HlsVideoRenditions",
    scenario: "Adaptive bitrate video players require master HLS m3u8 manifests containing exactly one audio/video stream per target bitrate profile, selecting the highest resolution if bitrates collide.",
    businessObjective: "Deduplicate video encoding ladders to enforce single stream per bitrate profile using composite window ranking.",
    schemaSnippet: "`HlsVideoRenditions (rendition_id VARCHAR(36) PRIMARY KEY, video_id VARCHAR(32), target_bitrate_kbps INT, width INT, height INT, codec VARCHAR(8))`",
    targetQuery: `WITH DeduplicatedManifest AS (\n  SELECT video_id,\n         rendition_id,\n         target_bitrate_kbps,\n         width,\n         height,\n         codec,\n         ROW_NUMBER() OVER (\n           PARTITION BY video_id, target_bitrate_kbps \n           ORDER BY (width * height) DESC, rendition_id DESC\n         ) AS bitrate_slot_rn\n  FROM HlsVideoRenditions\n)\nSELECT video_id,\n       target_bitrate_kbps,\n       width,\n       height,\n       codec,\n       rendition_id\nFROM DeduplicatedManifest\nWHERE bitrate_slot_rn = 1\nORDER BY video_id, target_bitrate_kbps DESC;`,
    eli5Story: "If our video compression factory produced two different 1080p versions for the 4,000 kbps streaming slot, pick the one with the higher pixel resolution and throw the duplicate away.",
    commonMistakes: "Partitioning only by video_id, which would delete all resolutions and leave only 1 stream for the whole movie.",
    learningOutcomes: "Enforce multi-attribute technical constraints using composite partition and order criteria."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Firewall Rule Hit Counter Most Recent Daily Audit Snapshot",
    ind: "Security",
    diff: "Easy",
    table: "FirewallDailySnapshots",
    scenario: "Network security teams audit unused firewall rules by retrieving each rule's most recent daily packet count snapshot from telemetry storage.",
    businessObjective: "Extract the single newest daily snapshot per firewall rule using ROW_NUMBER().",
    schemaSnippet: "`FirewallDailySnapshots (snapshot_id VARCHAR(32) PRIMARY KEY, rule_id VARCHAR(24), packet_count BIGINT, snapshot_date DATE)`",
    targetQuery: `WITH LatestRuleState AS (\n  SELECT rule_id,\n         packet_count,\n         snapshot_date,\n         ROW_NUMBER() OVER (PARTITION BY rule_id ORDER BY snapshot_date DESC, snapshot_id DESC) AS rn\n  FROM FirewallDailySnapshots\n)\nSELECT rule_id,\n       packet_count,\n       snapshot_date\nFROM LatestRuleState\nWHERE rn = 1\nORDER BY rule_id;`,
    eli5Story: "Get the newest daily snapshot for each firewall rule so we know how many packets it blocked yesterday.",
    commonMistakes: "Using GROUP BY rule_id with MAX(packet_count), which gives the highest historical peak rather than the current status.",
    learningOutcomes: "Distinguish between chronological current state and historical peak aggregation."
  },
  {
    title: "Endpoint Malware Detection Quarantined File Deduplication",
    ind: "Security",
    diff: "Medium",
    table: "MalwareQuarantineEvents",
    scenario: "SOC incident responders review malware infection chains by isolating the single earliest infection detection per endpoint host.",
    businessObjective: "Extract patient-zero infection event per host using QUALIFY ROW_NUMBER().",
    schemaSnippet: "`MalwareQuarantineEvents (event_id VARCHAR(36) PRIMARY KEY, host_id VARCHAR(32), file_hash VARCHAR(64), threat_name VARCHAR(64), detected_at TIMESTAMP)`",
    targetQuery: `SELECT host_id,\n       event_id,\n       file_hash,\n       threat_name,\n       detected_at\nFROM MalwareQuarantineEvents\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY host_id \n  ORDER BY detected_at ASC, event_id ASC\n) = 1\nORDER BY detected_at ASC;`,
    eli5Story: "When malware replicates across an infected computer and creates 20 files, find the very first file that landed on the machine to see how it got infected.",
    commonMistakes: "Sorting DESC, which finds the most recent file rather than Patient Zero.",
    learningOutcomes: "Isolate initial compromise vectors using chronological ascending window ranking."
  },
  {
    title: "User Privilege Escalation Trail First vs Last Role Assignment",
    ind: "Security",
    diff: "Hard",
    table: "UserRoleAuditTrail",
    scenario: "Zero-trust compliance auditors reconstruct access creep by comparing an employee's initial assigned role at hire date with their currently active assigned role.",
    businessObjective: "Extract both the original role and the latest role per employee in a single query pass using symmetrical ROW_NUMBER() windows.",
    schemaSnippet: "`UserRoleAuditTrail (audit_id VARCHAR(36) PRIMARY KEY, user_id VARCHAR(24), role_name VARCHAR(32), assigned_at TIMESTAMP)`",
    targetQuery: `WITH RoleSequences AS (\n  SELECT user_id,\n         role_name,\n         assigned_at,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY assigned_at ASC) AS first_role_rn,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY assigned_at DESC) AS last_role_rn\n  FROM UserRoleAuditTrail\n)\nSELECT f.user_id,\n       f.role_name AS original_role,\n       f.assigned_at AS initial_assignment_date,\n       l.role_name AS current_role,\n       l.assigned_at AS latest_assignment_date\nFROM RoleSequences f\nJOIN RoleSequences l\n  ON f.user_id = l.user_id\nWHERE f.first_role_rn = 1 AND l.last_role_rn = 1\nORDER BY f.user_id;`,
    eli5Story: "Look at every job role an employee was given since day one. Find the role they had on their very first day, and compare it to their current title today to check for privilege creep.",
    commonMistakes: "Using self-joins without ROW_NUMBER(), creating exponential Cartesian explosions when employees have dozens of role changes.",
    learningOutcomes: "Safely join dual-endpoint window projections for zero-trust identity compliance audits."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Manufacturing IoT Sensor Calibration Record Deduplication",
    ind: "Hardware",
    diff: "Easy",
    table: "SensorCalibrationLogs",
    scenario: "Smart factory quality systems require looking up the current calibration offset for every machine sensor, selecting the single latest certified calibration record.",
    businessObjective: "Extract the most recent calibration offset per sensor using ROW_NUMBER().",
    schemaSnippet: "`SensorCalibrationLogs (cal_id VARCHAR(32) PRIMARY KEY, sensor_id VARCHAR(24), offset_value DECIMAL(6,4), certified_at TIMESTAMP)`",
    targetQuery: `WITH LatestCalibration AS (\n  SELECT sensor_id,\n         offset_value,\n         certified_at,\n         ROW_NUMBER() OVER (PARTITION BY sensor_id ORDER BY certified_at DESC, cal_id DESC) AS rn\n  FROM SensorCalibrationLogs\n)\nSELECT sensor_id,\n       offset_value,\n       certified_at\nFROM LatestCalibration\nWHERE rn = 1\nORDER BY sensor_id;`,
    eli5Story: "When factory sensors are recalibrated every 6 months, pick strictly the newest calibration certificate to adjust sensor readings.",
    commonMistakes: "Selecting MAX(certified_at) without the associated offset_value.",
    learningOutcomes: "Retrieve latest point-in-time calibration vectors using window deduplication."
  },
  {
    title: "Disk Drive SMART Attribute Health Most Recent Snapshot",
    ind: "Hardware",
    diff: "Medium",
    table: "HardDriveSmartSnapshots",
    scenario: "Storage array controllers monitor hard drive health by retrieving the single latest SMART reallocated sector count for each drive serial number.",
    businessObjective: "Retrieve latest drive SMART telemetry record using QUALIFY ROW_NUMBER().",
    schemaSnippet: "`HardDriveSmartSnapshots (snapshot_id VARCHAR(36) PRIMARY KEY, drive_serial VARCHAR(32), reallocated_sectors INT, recorded_at TIMESTAMP)`",
    targetQuery: `SELECT drive_serial,\n       reallocated_sectors,\n       recorded_at\nFROM HardDriveSmartSnapshots\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY drive_serial \n  ORDER BY recorded_at DESC, snapshot_id DESC\n) = 1\nORDER BY reallocated_sectors DESC;`,
    eli5Story: "Pull out the newest health check for every hard drive in the cloud data center, and put the drives with the most bad sectors at the top of the list for replacement.",
    commonMistakes: "Using DENSE_RANK(), which could return multiple rows per drive if multiple snapshots were taken in the same second.",
    learningOutcomes: "Enforce strict single-row drive telemetry extraction using ROW_NUMBER()."
  },
  {
    title: "Cleanroom Semiconductor Lot Stepper Sequence Progression Verification",
    ind: "Hardware",
    diff: "Hard",
    table: "WaferLotStepEvents",
    scenario: "Semiconductor yield engineers audit silicon wafer fabrication logs to verify that photolithography masking steps occurred in exact recipe sequence without missing stages.",
    businessObjective: "Sequence processing steps per wafer lot and identify lots that skipped mandatory quality control gates.",
    schemaSnippet: "`WaferLotStepEvents (event_id VARCHAR(36) PRIMARY KEY, lot_id VARCHAR(24), step_code VARCHAR(16), tool_id VARCHAR(16), completed_at TIMESTAMP)`",
    targetQuery: `WITH StepperSequences AS (\n  SELECT event_id,\n         lot_id,\n         step_code,\n         tool_id,\n         completed_at,\n         ROW_NUMBER() OVER (\n           PARTITION BY lot_id \n           ORDER BY completed_at ASC, event_id ASC\n         ) AS step_sequence_num\n  FROM WaferLotStepEvents\n)\nSELECT s1.lot_id,\n       s1.step_code AS first_step,\n       s2.step_code AS second_step,\n       s1.completed_at AS step1_time,\n       s2.completed_at AS step2_time\nFROM StepperSequences s1\nJOIN StepperSequences s2\n  ON s1.lot_id = s2.lot_id AND s1.step_sequence_num = 1 AND s2.step_sequence_num = 2\nWHERE s1.step_code != 'CLEAN_PREP' OR s2.step_code != 'OXIDATION'\nORDER BY s1.lot_id;`,
    eli5Story: "Number each step in building a silicon chip (1, 2, 3...). Check step 1 and step 2. If step 1 wasn't cleaning and step 2 wasn't oxidation, flag the batch for recipe violation.",
    commonMistakes: "Joining on timestamp ranges instead of strict integer sequence numbers generated by ROW_NUMBER().",
    learningOutcomes: "Formulate sequence verification joins using discrete integer sequence keys."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Employee Emergency Contact Primary Record Deduplication",
    ind: "HR",
    diff: "Easy",
    table: "EmployeeEmergencyContacts",
    scenario: "Corporate HR systems ensure safety compliance by extracting exactly one primary emergency contact for each employee, selecting the highest priority contact.",
    businessObjective: "Select the single highest-priority emergency contact per employee using ROW_NUMBER().",
    schemaSnippet: "`EmployeeEmergencyContacts (contact_id VARCHAR(32) PRIMARY KEY, emp_id VARCHAR(16), contact_name VARCHAR(64), priority_order INT, phone VARCHAR(20))`",
    targetQuery: `WITH PrimaryContacts AS (\n  SELECT emp_id,\n         contact_name,\n         phone,\n         priority_order,\n         ROW_NUMBER() OVER (PARTITION BY emp_id ORDER BY priority_order ASC, contact_id ASC) AS rn\n  FROM EmployeeEmergencyContacts\n)\nSELECT emp_id,\n       contact_name,\n       phone\nFROM PrimaryContacts\nWHERE rn = 1\nORDER BY emp_id;`,
    eli5Story: "An employee listed their spouse, mother, and doctor as emergency contacts. Pick strictly their #1 primary contact to call in an emergency.",
    commonMistakes: "Ordering DESC when priority 1 represents the highest priority, inadvertently picking the last fallback contact.",
    learningOutcomes: "Order window partitions according to ascending priority tier conventions."
  },
  {
    title: "Job Applicant Latest Interview Stage Progression Status",
    ind: "HR",
    diff: "Medium",
    table: "ApplicantInterviewRounds",
    scenario: "Recruiting pipelines report on hiring pipeline throughput by displaying each job applicant's current active interview stage.",
    businessObjective: "Retrieve latest interview stage per applicant using QUALIFY ROW_NUMBER().",
    schemaSnippet: "`ApplicantInterviewRounds (round_id VARCHAR(36) PRIMARY KEY, applicant_id VARCHAR(24), stage_name VARCHAR(32), outcome VARCHAR(16), interview_date DATE)`",
    targetQuery: `SELECT applicant_id,\n       stage_name,\n       outcome,\n       interview_date\nFROM ApplicantInterviewRounds\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY applicant_id \n  ORDER BY interview_date DESC, round_id DESC\n) = 1\nORDER BY interview_date DESC;`,
    eli5Story: "Show the latest interview stage each job seeker completed so recruiters know exactly where their application stands today.",
    commonMistakes: "Grouping by applicant_id with MAX(interview_date) and losing the stage_name and outcome columns.",
    learningOutcomes: "Deploy QUALIFY ROW_NUMBER() = 1 to power real-time candidate pipeline dashboards."
  },
  {
    title: "Corporate Internal Transfer Career Path Progression Indexing",
    ind: "HR",
    diff: "Hard",
    table: "EmployeeDepartmentHistory",
    scenario: "Organizational research teams analyze mobility by extracting an employee's initial department and their immediate next department to measure cross-functional promotion velocity.",
    businessObjective: "Index transfer history chronologically and join transfer step 1 to transfer step 2 to compute tenure before first internal transfer.",
    schemaSnippet: "`EmployeeDepartmentHistory (history_id VARCHAR(32) PRIMARY KEY, emp_id VARCHAR(16), department VARCHAR(32), start_date DATE, end_date DATE)`",
    targetQuery: `WITH CareerLadder AS (\n  SELECT history_id,\n         emp_id,\n         department,\n         start_date,\n         end_date,\n         ROW_NUMBER() OVER (PARTITION BY emp_id ORDER BY start_date ASC) AS tenure_step\n  FROM EmployeeDepartmentHistory\n)\nSELECT c1.emp_id,\n       c1.department AS initial_department,\n       c2.department AS transferred_department,\n       c1.start_date AS hire_date,\n       c2.start_date AS transfer_date,\n       (c2.start_date - c1.start_date) AS days_to_first_transfer\nFROM CareerLadder c1\nJOIN CareerLadder c2\n  ON c1.emp_id = c2.emp_id AND c1.tenure_step = 1 AND c2.tenure_step = 2\nORDER BY days_to_first_transfer ASC;`,
    eli5Story: "Find the team an employee started in (step 1) and the team they moved to (step 2). Subtract the two dates to see how quickly they got their first internal transfer.",
    commonMistakes: "Joining on start_date > start_date without integer sequence keys, causing duplicate rows if an employee had 5 transfers.",
    learningOutcomes: "Construct integer-indexed career progression chains to evaluate talent mobility."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "DNS Record Configuration Most Recent Zone Propagation",
    ind: "Platforms",
    diff: "Easy",
    table: "DnsZoneRecords",
    scenario: "Cloud DNS management systems verify zone file synchronization by selecting the most recent active DNS record update for each fully qualified domain name (FQDN).",
    businessObjective: "Extract latest DNS configuration per domain using ROW_NUMBER().",
    schemaSnippet: "`DnsZoneRecords (record_id VARCHAR(36) PRIMARY KEY, fqdn VARCHAR(128), record_type VARCHAR(8), record_value VARCHAR(255), published_at TIMESTAMP)`",
    targetQuery: `WITH LatestDns AS (\n  SELECT fqdn,\n         record_type,\n         record_value,\n         published_at,\n         ROW_NUMBER() OVER (PARTITION BY fqdn, record_type ORDER BY published_at DESC, record_id DESC) AS rn\n  FROM DnsZoneRecords\n)\nSELECT fqdn,\n       record_type,\n       record_value,\n       published_at\nFROM LatestDns\nWHERE rn = 1\nORDER BY fqdn;`,
    eli5Story: "When network admins change where a website points, grab strictly the newest published record for each web address.",
    commonMistakes: "Partitioning only on fqdn and forgetting record_type, accidentally deleting MX records when updating A records.",
    learningOutcomes: "Preserve protocol-level multi-type configurations using composite partition keys."
  },
  {
    title: "Kubernetes Pod Container Restart CrashLoopBackOff Detection",
    ind: "Platforms",
    diff: "Medium",
    table: "ContainerLifecycleEvents",
    scenario: "Platform telemetry clusters isolate crashing microservice pods by selecting the most recent termination reason and exit code per container instance.",
    businessObjective: "Extract latest exit event per container using QUALIFY ROW_NUMBER().",
    schemaSnippet: "`ContainerLifecycleEvents (event_id VARCHAR(36) PRIMARY KEY, pod_id VARCHAR(32), container_name VARCHAR(32), exit_code INT, termination_reason VARCHAR(32), event_time TIMESTAMP)`",
    targetQuery: `SELECT pod_id,\n       container_name,\n       exit_code,\n       termination_reason,\n       event_time\nFROM ContainerLifecycleEvents\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY pod_id, container_name \n  ORDER BY event_time DESC, event_id DESC\n) = 1\nORDER BY event_time DESC;`,
    eli5Story: "When a server container crashes repeatedly, pull out the very last crash reason so engineers know if it died from running out of memory (OOMKilled) or a code error.",
    commonMistakes: "Partitioning by pod_id alone, which collapses multi-container pods (e.g. app container + envoy proxy) into a single record.",
    learningOutcomes: "Structure container telemetry partition keys to isolate individual microservice processes."
  },
  {
    title: "Distributed Tracing Microservice Critical Path Span Sequencing",
    ind: "Platforms",
    diff: "Hard",
    table: "DistributedSpanLogs",
    scenario: "APM observability engines analyze distributed request traces by assigning execution sequence numbers to spans within a root trace, isolating the root entry span and the final terminating leaf span.",
    businessObjective: "Extract root entrance span and final exit span in a single pass using symmetrical ROW_NUMBER() windows.",
    schemaSnippet: "`DistributedSpanLogs (span_id VARCHAR(36) PRIMARY KEY, trace_id VARCHAR(36), service_name VARCHAR(32), span_name VARCHAR(64), start_time_us BIGINT, duration_us BIGINT)`",
    targetQuery: `WITH SpanSequences AS (\n  SELECT trace_id,\n         span_id,\n         service_name,\n         span_name,\n         start_time_us,\n         duration_us,\n         ROW_NUMBER() OVER (PARTITION BY trace_id ORDER BY start_time_us ASC) AS first_span_rn,\n         ROW_NUMBER() OVER (PARTITION BY trace_id ORDER BY (start_time_us + duration_us) DESC) AS last_span_rn\n  FROM DistributedSpanLogs\n)\nSELECT r.trace_id,\n       r.service_name AS ingress_service,\n       r.span_name AS ingress_operation,\n       l.service_name AS egress_service,\n       l.span_name AS egress_operation,\n       (l.start_time_us + l.duration_us) - r.start_time_us AS total_trace_duration_us\nFROM SpanSequences r\nJOIN SpanSequences l\n  ON r.trace_id = l.trace_id\nWHERE r.first_span_rn = 1 AND l.last_span_rn = 1\nORDER BY total_trace_duration_us DESC;`,
    eli5Story: "In a complex microservice call that hits 20 services, find the very first service that answered the user's click and the very last service that finished processing. Subtract them to get total end-to-end latency.",
    commonMistakes: "Ordering the last span by start_time_us instead of (start_time_us + duration_us), missing an earlier-starting span that finished much later.",
    learningOutcomes: "Accurately compute total distributed span durations using start and completion ordering."
  }
];
