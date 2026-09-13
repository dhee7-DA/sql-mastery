// =============================================================================
// SECTION 9 - PART 1: PARTITION FENCES & ENGINE SCOPES (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: OVER (PARTITION BY ...), Group Scoping without Row Collapse, Multi-Key Partitions
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Regional ATM Cash Vault Capacity vs Branch Average",
    ind: "Fintech",
    diff: "Easy",
    table: "AtmCashVaults",
    scenario: "Branch managers need to compare current physical cash inventory in each ATM terminal against the average vault cash level across all ATMs in that metropolitan region to trigger cash-in-transit (CIT) armored truck refills.",
    businessObjective: "Calculate each terminal's cash balance alongside the regional average cash reserve without collapsing terminal-level operational rows.",
    schemaSnippet: "`AtmCashVaults (terminal_id VARCHAR(16) PRIMARY KEY, metro_region VARCHAR(32), current_cash_usd DECIMAL(12,2), max_capacity_usd DECIMAL(12,2), last_audit_time TIMESTAMP)`",
    targetQuery: `SELECT terminal_id,\n       metro_region,\n       current_cash_usd,\n       ROUND(AVG(current_cash_usd) OVER (PARTITION BY metro_region), 2) AS regional_avg_cash,\n       ROUND(current_cash_usd - AVG(current_cash_usd) OVER (PARTITION BY metro_region), 2) AS variance_from_avg\nFROM AtmCashVaults\nORDER BY metro_region, current_cash_usd ASC;`,
    eli5Story: "Think of keeping individual ATM balances on display while writing the citywide average on a sticky note beside each one, so you instantly spot which machine is running dry.",
    commonMistakes: "Using GROUP BY metro_region, which collapses all terminals into a single regional row and destroys the ability to audit individual physical machines.",
    learningOutcomes: "Master non-destructive aggregation using OVER (PARTITION BY) to compute benchmark baselines beside transactional line items."
  },
  {
    title: "Payment Gateway Merchant Fee Tier Deviation vs MCC Category Mean",
    ind: "Fintech",
    diff: "Medium",
    table: "MerchantSettlementLogs",
    scenario: "Payment processors audit processing interchange margins by calculating the percentage difference between an individual merchant's negotiated basis-point fee and the average fee charged across their specific Merchant Category Code (MCC) and acquiring currency.",
    businessObjective: "Compute dual-partition group averages across (mcc_code, currency) and determine merchant basis-point spreads.",
    schemaSnippet: "`MerchantSettlementLogs (merchant_id VARCHAR(32), mcc_code INT, currency VARCHAR(3), basis_points DECIMAL(6,2), monthly_volume_usd DECIMAL(14,2))`",
    targetQuery: `SELECT merchant_id,\n       mcc_code,\n       currency,\n       basis_points,\n       ROUND(AVG(basis_points) OVER (PARTITION BY mcc_code, currency), 2) AS category_avg_bps,\n       ROUND(basis_points - AVG(basis_points) OVER (PARTITION BY mcc_code, currency), 2) AS spread_bps,\n       ROUND(monthly_volume_usd / SUM(monthly_volume_usd) OVER (PARTITION BY mcc_code, currency) * 100, 2) AS pct_of_category_volume\nFROM MerchantSettlementLogs\nORDER BY mcc_code, currency, basis_points DESC;`,
    eli5Story: "Compare each store's transaction fee against the average fee paid by other stores in the same business sector and currency, while also calculating their market share within that sector.",
    commonMistakes: "Partitioning only on mcc_code without including currency, leading to invalid cross-currency fee distortions.",
    learningOutcomes: "Apply multi-column composite partitioning and simultaneously compute slice-level volume shares."
  },
  {
    title: "High-Frequency Algorithmic Execution Fill Slippage vs Book Micro-Structure",
    ind: "Fintech",
    diff: "Hard",
    table: "AlgoExecutionFills",
    scenario: "Institutional execution desks monitor execution slippage by evaluating executed prices against the volume-weighted average price (VWAP) computed strictly within each trading venue and 15-minute trading slice.",
    businessObjective: "Compute partition-scoped VWAP benchmarks and standard deviations of slippage per exchange venue and time slice.",
    schemaSnippet: "`AlgoExecutionFills (fill_id VARCHAR(36) PRIMARY KEY, symbol VARCHAR(12), venue VARCHAR(16), slice_id INT, fill_price DECIMAL(10,4), fill_qty INT, fee_usd DECIMAL(8,4))`",
    targetQuery: `SELECT fill_id,\n       symbol,\n       venue,\n       slice_id,\n       fill_price,\n       fill_qty,\n       ROUND(SUM(fill_price * fill_qty) OVER (PARTITION BY symbol, venue, slice_id) / \n             SUM(fill_qty) OVER (PARTITION BY symbol, venue, slice_id), 4) AS slice_vwap,\n       ROUND(fill_price - (SUM(fill_price * fill_qty) OVER (PARTITION BY symbol, venue, slice_id) / \n                           SUM(fill_qty) OVER (PARTITION BY symbol, venue, slice_id)), 4) AS slippage_per_share,\n       ROUND(STDDEV(fill_price) OVER (PARTITION BY symbol, venue, slice_id), 4) AS slice_price_volatility\nFROM AlgoExecutionFills\nORDER BY symbol, venue, slice_id, fill_id;`,
    eli5Story: "For high-speed stock trades, compare each microsecond purchase against the volume-weighted average price of that exact 15-minute trading bucket on that specific stock exchange.",
    commonMistakes: "Trying to divide aggregated sums without repeating the partition specification in the denominator, or attempting a self-join that degrades latency.",
    learningOutcomes: "Formulate complex compound window ratios (VWAP) combining SUM(P*Q) and SUM(Q) across triple-composite partition boundaries."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Customer Workspace License Seat Consumption vs Tier Baseline",
    ind: "SaaS",
    diff: "Easy",
    table: "WorkspaceSeats",
    scenario: "Customer success teams monitor enterprise B2B accounts to identify organizations consuming significantly more or fewer seats than the median across their subscription plan tier.",
    businessObjective: "List each organization alongside the total active seats and the total seats provisioned across their entire pricing plan tier.",
    schemaSnippet: "`WorkspaceSeats (org_id VARCHAR(32) PRIMARY KEY, plan_tier VARCHAR(20), active_seats INT, contract_start_date DATE)`",
    targetQuery: `SELECT org_id,\n       plan_tier,\n       active_seats,\n       SUM(active_seats) OVER (PARTITION BY plan_tier) AS total_tier_seats,\n       ROUND(AVG(active_seats) OVER (PARTITION BY plan_tier), 1) AS avg_seats_per_org,\n       active_seats - CAST(AVG(active_seats) OVER (PARTITION BY plan_tier) AS INT) AS diff_from_tier_avg\nFROM WorkspaceSeats\nORDER BY plan_tier, active_seats DESC;`,
    eli5Story: "Look at every company on the Enterprise plan, show how many seats they are using, and put the overall Enterprise tier average right beside their name.",
    commonMistakes: "Omitting the OVER clause and assuming AVG(active_seats) will automatically know how to partition without PARTITION BY plan_tier.",
    learningOutcomes: "Utilize non-destructive partition sums and averages to benchmark customer tenant usage."
  },
  {
    title: "API Gateway Microservice Latency Outlier Index by Endpoint Group",
    ind: "SaaS",
    diff: "Medium",
    table: "GatewayRequestMetrics",
    scenario: "DevOps engineers track request latencies across microservices to isolate endpoints running above the 90th percentile of their specific HTTP route cluster.",
    businessObjective: "Determine individual request duration alongside the route's average latency and total request volume.",
    schemaSnippet: "`GatewayRequestMetrics (request_id VARCHAR(36) PRIMARY KEY, service_name VARCHAR(32), http_method VARCHAR(8), route_pattern VARCHAR(64), duration_ms INT)`",
    targetQuery: `SELECT request_id,\n       service_name,\n       http_method,\n       route_pattern,\n       duration_ms,\n       COUNT(*) OVER (PARTITION BY service_name, route_pattern) AS total_route_calls,\n       ROUND(AVG(duration_ms) OVER (PARTITION BY service_name, route_pattern), 2) AS route_mean_ms,\n       ROUND(duration_ms - AVG(duration_ms) OVER (PARTITION BY service_name, route_pattern), 2) AS delta_from_mean_ms\nFROM GatewayRequestMetrics\nORDER BY service_name, route_pattern, duration_ms DESC;`,
    eli5Story: "Keep every API web request visible on screen while displaying how many total calls hit that exact route and how much slower this specific call was compared to normal.",
    commonMistakes: "Partitioning solely by service_name, causing lightweight health check endpoints to artificially skew latency benchmarks of heavy POST endpoints.",
    learningOutcomes: "Partition telemetry streams across composite microservice and route dimensions for high-granularity anomaly scoring."
  },
  {
    title: "Multi-Tenant Cloud Compute Bursting vs Dedicated Provisioned Limits",
    ind: "SaaS",
    diff: "Hard",
    table: "ComputeJobTelemetry",
    scenario: "Cloud infrastructure architects calculate tenant fair-share CPU bursting ratios by comparing each compute job's core consumption against the tenant's dedicated cluster quota and regional cluster load.",
    businessObjective: "Calculate dual-layer window aggregates: tenant-level total active cores and cluster-wide aggregate utilization in a single query pass.",
    schemaSnippet: "`ComputeJobTelemetry (job_id VARCHAR(36) PRIMARY KEY, cluster_id VARCHAR(24), tenant_id VARCHAR(32), cores_allocated INT, ram_gb INT, submitted_at TIMESTAMP)`",
    targetQuery: `SELECT job_id,\n       cluster_id,\n       tenant_id,\n       cores_allocated,\n       SUM(cores_allocated) OVER (PARTITION BY cluster_id, tenant_id) AS tenant_cluster_cores,\n       SUM(cores_allocated) OVER (PARTITION BY cluster_id) AS total_cluster_cores,\n       ROUND(CAST(cores_allocated AS DECIMAL(10,2)) / \n             SUM(cores_allocated) OVER (PARTITION BY cluster_id, tenant_id) * 100, 2) AS pct_of_tenant_load,\n       ROUND(SUM(cores_allocated) OVER (PARTITION BY cluster_id, tenant_id) / \n             CAST(SUM(cores_allocated) OVER (PARTITION BY cluster_id) AS DECIMAL(10,2)) * 100, 2) AS tenant_cluster_share_pct\nFROM ComputeJobTelemetry\nORDER BY cluster_id, tenant_cluster_share_pct DESC, cores_allocated DESC;`,
    eli5Story: "Check how many cores one job takes, how many cores that company is using across the server, and what chunk of the whole data center that company is consuming right now.",
    commonMistakes: "Writing two separate subqueries and joining them together, which requires 3 full table scans instead of 1 analytic scan.",
    learningOutcomes: "Deploy coexisting window specifications with different PARTITION BY depths (cluster+tenant vs cluster-only) in the same SELECT statement."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Retail Department Product Price Comparison to Category Mode Average",
    ind: "Retail",
    diff: "Easy",
    table: "StoreInventoryPrices",
    scenario: "Merchandising analysts audit retail pricing strategy to identify products priced significantly above their subcategory's benchmark average.",
    businessObjective: "Display product prices alongside subcategory average price and calculate the absolute dollar spread.",
    schemaSnippet: "`StoreInventoryPrices (sku VARCHAR(24) PRIMARY KEY, product_name VARCHAR(100), department VARCHAR(32), subcategory VARCHAR(32), retail_price DECIMAL(10,2))`",
    targetQuery: `SELECT sku,\n       product_name,\n       department,\n       subcategory,\n       retail_price,\n       ROUND(AVG(retail_price) OVER (PARTITION BY subcategory), 2) AS subcat_avg_price,\n       ROUND(retail_price - AVG(retail_price) OVER (PARTITION BY subcategory), 2) AS price_diff\nFROM StoreInventoryPrices\nORDER BY department, subcategory, retail_price DESC;`,
    eli5Story: "Show the price tag on every pair of shoes and print the average price of all shoes in that aisle right next to it.",
    commonMistakes: "Partitioning on department instead of the narrower subcategory, masking pricing disparities between distinct goods.",
    learningOutcomes: "Learn to select the appropriate categorical level for partition fences."
  },
  {
    title: "Omnichannel Fulfillment Center Defect Rate vs Zone Aggregate",
    ind: "Retail",
    diff: "Medium",
    table: "FulfillmentDefects",
    scenario: "Warehouse operations monitor damaged package shipments across regional distribution centers to flag distribution facilities with defective packing rates exceeding their operating zone's norm.",
    businessObjective: "Measure distribution center total packages, defective shipments, and percentage of zone defects.",
    schemaSnippet: "`FulfillmentDefects (facility_id VARCHAR(16), zone VARCHAR(16), total_shipped INT, damaged_packages INT, report_month VARCHAR(7))`",
    targetQuery: `SELECT facility_id,\n       zone,\n       report_month,\n       damaged_packages,\n       total_shipped,\n       ROUND((damaged_packages::DECIMAL / total_shipped) * 100, 3) AS facility_defect_rate,\n       ROUND(SUM(damaged_packages) OVER (PARTITION BY zone, report_month)::DECIMAL / \n             SUM(total_shipped) OVER (PARTITION BY zone, report_month) * 100, 3) AS zone_defect_rate\nFROM FulfillmentDefects\nORDER BY zone, facility_defect_rate DESC;`,
    eli5Story: "Compare the damaged box rate of one warehouse against the collective damage rate of all warehouses in that geographic zone for the month.",
    commonMistakes: "Averaging the facility defect rates instead of recomputing SUM(damaged)/SUM(shipped) across the partition, committing the Simpson's Paradox mathematical fallacy.",
    learningOutcomes: "Avoid averaging pre-calculated averages by computing windowed sums of numerators and denominators independently."
  },
  {
    title: "Point-of-Sale Register Basket Size vs Cashier Shift Trajectory",
    ind: "Retail",
    diff: "Hard",
    table: "PosTransactions",
    scenario: "Store managers evaluate cashier speed and transaction values across high-volume holiday shifts by calculating cashier-specific average basket values alongside store-wide shift medians.",
    businessObjective: "Calculate transaction value, cashier's shift running transaction count, and store shift contribution share.",
    schemaSnippet: "`PosTransactions (tx_id VARCHAR(32) PRIMARY KEY, store_id VARCHAR(16), shift_date DATE, shift_period VARCHAR(12), cashier_id VARCHAR(16), basket_total DECIMAL(10,2))`",
    targetQuery: `SELECT tx_id,\n       store_id,\n       shift_date,\n       shift_period,\n       cashier_id,\n       basket_total,\n       ROUND(AVG(basket_total) OVER (PARTITION BY store_id, shift_date, shift_period, cashier_id), 2) AS cashier_shift_avg,\n       ROUND(AVG(basket_total) OVER (PARTITION BY store_id, shift_date, shift_period), 2) AS store_shift_avg,\n       COUNT(*) OVER (PARTITION BY store_id, shift_date, shift_period, cashier_id) AS cashier_tx_count,\n       ROUND(SUM(basket_total) OVER (PARTITION BY store_id, shift_date, shift_period, cashier_id) / \n             SUM(basket_total) OVER (PARTITION BY store_id, shift_date, shift_period) * 100, 2) AS cashier_shift_revenue_pct\nFROM PosTransactions\nORDER BY store_id, shift_date, shift_period, cashier_id, tx_id;`,
    eli5Story: "See how much each customer spent at Register 4, what Register 4 averaged during the morning rush, and what percent of all morning sales that cashier handled.",
    commonMistakes: "Attempting to write complex self-joins for each cashier shift instead of using layered window partitions.",
    learningOutcomes: "Simultaneously execute hierarchical partitions across cashier-shift and store-shift levels in a single query."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Hospital Ward Inpatient Length-of-Stay vs Department Benchmark",
    ind: "Healthcare",
    diff: "Easy",
    table: "InpatientEncounters",
    scenario: "Hospital administrative staff monitor patient discharges to detect prolonged stays compared to the mean recovery time for the clinical diagnosis department.",
    businessObjective: "Show patient days admitted alongside the department average length of stay and variance.",
    schemaSnippet: "`InpatientEncounters (encounter_id VARCHAR(32) PRIMARY KEY, department_code VARCHAR(16), days_admitted INT, discharge_disposition VARCHAR(32))`",
    targetQuery: `SELECT encounter_id,\n       department_code,\n       days_admitted,\n       ROUND(AVG(days_admitted) OVER (PARTITION BY department_code), 1) AS dept_avg_days,\n       days_admitted - ROUND(AVG(days_admitted) OVER (PARTITION BY department_code), 1) AS days_variance\nFROM InpatientEncounters\nORDER BY department_code, days_admitted DESC;`,
    eli5Story: "Show how many days a patient stayed in Cardiology and display the overall Cardiology ward average right next to them.",
    commonMistakes: "Using GROUP BY, which eliminates patient encounter IDs from the query output.",
    learningOutcomes: "Apply simple single-column partition frames for clinical metric benchmarking."
  },
  {
    title: "Clinical Lab Blood Analyzer Calibration Variance Across Hospital Campuses",
    ind: "Healthcare",
    diff: "Medium",
    table: "LabEquipmentTests",
    scenario: "Quality assurance officers check automated blood chemistry analyzers across hospital campuses to ensure test readings for standard control serum remain within campus control limits.",
    businessObjective: "Calculate control test measurement deviation from the instrument's campus-wide target mean.",
    schemaSnippet: "`LabEquipmentTests (test_run_id VARCHAR(36) PRIMARY KEY, campus_id VARCHAR(16), analyzer_model VARCHAR(24), test_type VARCHAR(20), measured_value DECIMAL(8,3))`",
    targetQuery: `SELECT test_run_id,\n       campus_id,\n       analyzer_model,\n       test_type,\n       measured_value,\n       ROUND(AVG(measured_value) OVER (PARTITION BY campus_id, test_type), 3) AS campus_test_mean,\n       ROUND(STDDEV(measured_value) OVER (PARTITION BY campus_id, test_type), 3) AS campus_test_stddev,\n       ROUND(measured_value - AVG(measured_value) OVER (PARTITION BY campus_id, test_type), 3) AS bias_from_mean\nFROM LabEquipmentTests\nORDER BY campus_id, test_type, test_run_id;`,
    eli5Story: "Every time a blood machine tests a control sample, check whether its reading drifted away from the average score of all machines testing that same blood test on that campus.",
    commonMistakes: "Omitting test_type from the partition, mixing glucose, potassium, and troponin measurements into a meaningless blended average.",
    learningOutcomes: "Apply partition scoping to isolate distinct biological assay groups across organizational campuses."
  },
  {
    title: "ICU Prescription Drug Dosing vs Patient Acuity & Weight Class Index",
    ind: "Healthcare",
    diff: "Hard",
    table: "IcuMedicationDoses",
    scenario: "Intensive care clinical pharmacists audit high-risk vasoactive medication administration rates across patient weight categories and sepsis acuity scores.",
    businessObjective: "Compute administered dosage vs cohort median and percentage contribution to patient daily cumulative dose.",
    schemaSnippet: "`IcuMedicationDoses (dose_id VARCHAR(36) PRIMARY KEY, patient_id VARCHAR(32), drug_name VARCHAR(40), weight_bracket VARCHAR(16), dose_mg DECIMAL(8,3), admin_time TIMESTAMP)`",
    targetQuery: `SELECT dose_id,\n       patient_id,\n       drug_name,\n       weight_bracket,\n       dose_mg,\n       ROUND(AVG(dose_mg) OVER (PARTITION BY drug_name, weight_bracket), 3) AS cohort_avg_dose_mg,\n       ROUND(dose_mg / AVG(dose_mg) OVER (PARTITION BY drug_name, weight_bracket), 2) AS relative_dose_ratio,\n       ROUND(SUM(dose_mg) OVER (PARTITION BY patient_id, drug_name), 3) AS patient_total_drug_administered\nFROM IcuMedicationDoses\nORDER BY drug_name, weight_bracket, relative_dose_ratio DESC;`,
    eli5Story: "Compare one ICU patient's dose to what other patients in the exact same weight bracket received, while simultaneously totaling how much of this drug this patient got today.",
    commonMistakes: "Partitioning by patient_id when calculating cohort baselines, restricting the sample to only that one patient.",
    learningOutcomes: "Combine cohort-level partitions (drug+weight) with subject-level partitions (patient+drug) in a single clinical SQL report."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Fleet Freight Delivery Duration vs Lane Route Average",
    ind: "Logistics",
    diff: "Easy",
    table: "FreightShipments",
    scenario: "Dispatchers measure long-haul trucking transit hours against historical route corridor averages to flag delayed tractor-trailers.",
    businessObjective: "List each freight shipment alongside origin-destination lane mean transit hours.",
    schemaSnippet: "`FreightShipments (shipment_id VARCHAR(32) PRIMARY KEY, origin_hub VARCHAR(8), dest_hub VARCHAR(8), transit_hours DECIMAL(6,2), carrier_name VARCHAR(64))`",
    targetQuery: `SELECT shipment_id,\n       origin_hub,\n       dest_hub,\n       transit_hours,\n       ROUND(AVG(transit_hours) OVER (PARTITION BY origin_hub, dest_hub), 2) AS lane_avg_hours,\n       ROUND(transit_hours - AVG(transit_hours) OVER (PARTITION BY origin_hub, dest_hub), 2) AS delay_hours\nFROM FreightShipments\nORDER BY origin_hub, dest_hub, transit_hours DESC;`,
    eli5Story: "Check how long a truck took to drive from Chicago to Atlanta, and show the usual Chicago-to-Atlanta driving time right next to it.",
    commonMistakes: "Partitioning only by origin_hub, combining trips to Miami and Seattle into a meaningless single average.",
    learningOutcomes: "Implement directional route corridor partitioning across origin and destination pairs."
  },
  {
    title: "Maritime Container Vessel Fuel Burn vs Sea Lane & Vessel Class",
    ind: "Logistics",
    diff: "Medium",
    table: "VesselVoyageFuel",
    scenario: "Ocean freight lines monitor bunker fuel consumption across container ships to detect engine fouling and hull drag anomalies.",
    businessObjective: "Calculate metric tons of fuel burned per nautical mile compared to the vessel class sea-lane benchmark.",
    schemaSnippet: "`VesselVoyageFuel (voyage_id VARCHAR(32) PRIMARY KEY, vessel_class VARCHAR(24), sea_lane VARCHAR(32), nautical_miles INT, fuel_tons DECIMAL(10,2))`",
    targetQuery: `SELECT voyage_id,\n       vessel_class,\n       sea_lane,\n       fuel_tons,\n       nautical_miles,\n       ROUND(fuel_tons / nautical_miles, 4) AS tons_per_nm,\n       ROUND(SUM(fuel_tons) OVER (PARTITION BY vessel_class, sea_lane) / \n             SUM(nautical_miles) OVER (PARTITION BY vessel_class, sea_lane), 4) AS class_lane_avg_tons_per_nm\nFROM VesselVoyageFuel\nORDER BY vessel_class, sea_lane, tons_per_nm DESC;`,
    eli5Story: "Look at how much fuel a massive cargo ship burned per mile crossing the Pacific, and compare it to how much fuel all other ships of that same size burned on that exact route.",
    commonMistakes: "Averaging tons_per_nm directly across rows instead of taking SUM(fuel)/SUM(miles) over the partition, distorting weights between long and short voyages.",
    learningOutcomes: "Formulate weighted dimensional benchmark ratios within window partitions."
  },
  {
    title: "Cold-Chain Reefer Sensor Thermal Excursions vs Ambient Climate Corridor",
    ind: "Logistics",
    diff: "Hard",
    table: "ReeferTelematics",
    scenario: "Pharmaceutical cold-chain auditors analyze refrigerated container temperature excursions during transit through desert vs alpine climates.",
    businessObjective: "Measure internal container temperature against the corridor climate zone average and calculate shipment excursion duration.",
    schemaSnippet: "`ReeferTelematics (ping_id VARCHAR(36) PRIMARY KEY, shipment_id VARCHAR(32), climate_zone VARCHAR(20), internal_temp_c DECIMAL(5,2), setpoint_temp_c DECIMAL(5,2), ping_time TIMESTAMP)`",
    targetQuery: `SELECT ping_id,\n       shipment_id,\n       climate_zone,\n       internal_temp_c,\n       setpoint_temp_c,\n       ROUND(internal_temp_c - setpoint_temp_c, 2) AS thermal_drift,\n       ROUND(AVG(internal_temp_c) OVER (PARTITION BY climate_zone), 2) AS zone_mean_temp,\n       COUNT(*) OVER (PARTITION BY shipment_id) AS total_shipment_pings,\n       SUM(CASE WHEN internal_temp_c > setpoint_temp_c + 2.0 THEN 1 ELSE 0 END) \n         OVER (PARTITION BY shipment_id) AS excursion_ping_count\nFROM ReeferTelematics\nORDER BY shipment_id, ping_time;`,
    eli5Story: "Check every thermometer ping from a vaccine container, see how warm the surrounding desert was, and count how many times this specific box overheated.",
    commonMistakes: "Using conditional SUMs inside GROUP BY and losing ping timestamps necessary for regulatory FDA audits.",
    learningOutcomes: "Combine conditional CASE WHEN tallies with multi-level partition fences for compliance monitoring."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Video Streaming Content Bitrate vs Encoding Profile Baseline",
    ind: "Media",
    diff: "Easy",
    table: "StreamEncodingLogs",
    scenario: "OTT media streaming networks verify video encoding bandwidth to prevent excessive CDN egress costs across resolutions.",
    businessObjective: "Compare video stream bitrate against the encoding profile average bitrate.",
    schemaSnippet: "`StreamEncodingLogs (video_id VARCHAR(32) PRIMARY KEY, codec VARCHAR(8), resolution VARCHAR(12), measured_kbps INT)`",
    targetQuery: `SELECT video_id,\n       codec,\n       resolution,\n       measured_kbps,\n       ROUND(AVG(measured_kbps) OVER (PARTITION BY codec, resolution), 0) AS profile_target_kbps,\n       measured_kbps - ROUND(AVG(measured_kbps) OVER (PARTITION BY codec, resolution), 0) AS bandwidth_variance\nFROM StreamEncodingLogs\nORDER BY codec, resolution, measured_kbps DESC;`,
    eli5Story: "Check how many megabytes a movie stream uses per second, and compare it to the target bitrate for 4K video using the H.265 video codec.",
    commonMistakes: "Partitioning only by resolution and ignoring the codec, comparing efficient AV1 streams against legacy H.264 streams.",
    learningOutcomes: "Partition across technological profile dimensions to establish valid performance targets."
  },
  {
    title: "Digital Ad Campaign Click-Through Rate vs Vertical Market Mean",
    ind: "Media",
    diff: "Medium",
    table: "AdCampaignMetrics",
    scenario: "Programmatic ad exchanges assess creative performance by evaluating campaign CTR against the broader advertising vertical category.",
    businessObjective: "Calculate individual campaign CTR and compare against the industry vertical's aggregated CTR.",
    schemaSnippet: "`AdCampaignMetrics (campaign_id VARCHAR(32) PRIMARY KEY, vertical VARCHAR(32), impressions BIGINT, clicks BIGINT, spend_usd DECIMAL(12,2))`",
    targetQuery: `SELECT campaign_id,\n       vertical,\n       impressions,\n       clicks,\n       ROUND((clicks::DECIMAL / impressions) * 100, 3) AS campaign_ctr_pct,\n       ROUND(SUM(clicks) OVER (PARTITION BY vertical)::DECIMAL / \n             SUM(impressions) OVER (PARTITION BY vertical) * 100, 3) AS vertical_avg_ctr_pct,\n       ROUND(spend_usd / SUM(spend_usd) OVER (PARTITION BY vertical) * 100, 2) AS vertical_spend_share_pct\nFROM AdCampaignMetrics\nWHERE impressions > 10000\nORDER BY vertical, campaign_ctr_pct DESC;`,
    eli5Story: "See how well an auto loan advertisement did, and compare its click rate to the combined click rate of every car-related ad running on the platform.",
    commonMistakes: "Summing CTR percentages instead of calculating total clicks divided by total impressions over the partition.",
    learningOutcomes: "Execute aggregate-of-sums window division to compute macro category conversion baselines."
  },
  {
    title: "Podcast Audio Listener Drop-Off Rate vs Episode Genre Profile",
    ind: "Media",
    diff: "Hard",
    table: "PodcastDropoffTelemetry",
    scenario: "Audio streaming platforms analyze listener retention across podcast genres and episode lengths to advise producers on pacing.",
    businessObjective: "Compute minute-by-minute audience retention percentage against the genre average retention at that exact milestone.",
    schemaSnippet: "`PodcastDropoffTelemetry (episode_id VARCHAR(32), genre VARCHAR(24), minute_marker INT, active_listeners INT)`",
    targetQuery: `SELECT episode_id,\n       genre,\n       minute_marker,\n       active_listeners,\n       ROUND(CAST(active_listeners AS DECIMAL) / \n             MAX(active_listeners) OVER (PARTITION BY episode_id) * 100, 2) AS episode_retention_pct,\n       ROUND(AVG(active_listeners) OVER (PARTITION BY genre, minute_marker), 0) AS genre_avg_listeners_at_minute\nFROM PodcastDropoffTelemetry\nORDER BY genre, minute_marker, episode_id;`,
    eli5Story: "At minute 15 of a true-crime show, check how many fans are still listening compared to minute 1, and compare that retention against all true-crime shows at minute 15.",
    commonMistakes: "Using MIN instead of MAX for the baseline start audience, or failing to partition the denominator by episode_id.",
    learningOutcomes: "Nest episode-level baseline anchors alongside cross-show genre milestone averages."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Firewall Rule Packet Drop Count vs Protocol Category Mean",
    ind: "Security",
    diff: "Easy",
    table: "FirewallRuleTelemetry",
    scenario: "Network security engineers inspect perimeter firewall rules to identify ACL rules blocking disproportionately high packet counts.",
    businessObjective: "Compare individual firewall rule drop counts against the average drops across all rules in that protocol classification.",
    schemaSnippet: "`FirewallRuleTelemetry (rule_id VARCHAR(24) PRIMARY KEY, protocol VARCHAR(8), direction VARCHAR(8), dropped_packets BIGINT)`",
    targetQuery: `SELECT rule_id,\n       protocol,\n       direction,\n       dropped_packets,\n       ROUND(AVG(dropped_packets) OVER (PARTITION BY protocol, direction), 0) AS protocol_avg_drops,\n       dropped_packets - ROUND(AVG(dropped_packets) OVER (PARTITION BY protocol, direction), 0) AS drop_anomaly_delta\nFROM FirewallRuleTelemetry\nORDER BY protocol, direction, dropped_packets DESC;`,
    eli5Story: "Look at how many blocked packets one firewall rule threw away, and compare it to the average blocks for all inbound UDP rules.",
    commonMistakes: "Overlooking the traffic direction (inbound vs outbound), masking internal leakage behind external port scans.",
    learningOutcomes: "Partition security telemetry over dual networking classifications."
  },
  {
    title: "IAM Role Privilege Escalation Alerts vs Department Baseline",
    ind: "Security",
    diff: "Medium",
    table: "IamSecurityAuditLogs",
    scenario: "InfoSec auditors monitor cloud privilege escalation alerts across corporate divisions to detect rogue credentials and lateral movement.",
    businessObjective: "Calculate each user's alert count and their percentage contribution to their department's total security incidents.",
    schemaSnippet: "`IamSecurityAuditLogs (user_id VARCHAR(32), department VARCHAR(32), alert_id VARCHAR(36), severity VARCHAR(12), event_time TIMESTAMP)`",
    targetQuery: `SELECT user_id,\n       department,\n       COUNT(alert_id) AS user_alerts,\n       SUM(COUNT(alert_id)) OVER (PARTITION BY department) AS dept_total_alerts,\n       ROUND(COUNT(alert_id)::DECIMAL / \n             SUM(COUNT(alert_id)) OVER (PARTITION BY department) * 100, 2) AS pct_of_dept_alerts\nFROM IamSecurityAuditLogs\nGROUP BY user_id, department\nORDER BY department, user_alerts DESC;`,
    eli5Story: "Count how many security alarms one employee triggered, and show what percentage of the entire engineering department's alarms belong to that one person.",
    commonMistakes: "Failing to realize that window functions can wrap standard GROUP BY aggregate functions like SUM(COUNT(x)) OVER (...).",
    learningOutcomes: "Master the synergy between GROUP BY first-stage aggregation and OVER (PARTITION BY) second-stage share calculation."
  },
  {
    title: "Endpoint EDR Process Memory Anomaly vs Fleet Baseline",
    ind: "Security",
    diff: "Hard",
    table: "EdrProcessTelemetry",
    scenario: "SOC analysts hunt for memory injection and buffer overflow attacks by calculating a process's memory footprint against its operating system fleet norm.",
    businessObjective: "Calculate process memory z-score (standard deviations from mean) partitioned by OS platform and process binary name.",
    schemaSnippet: "`EdrProcessTelemetry (host_id VARCHAR(32), os_platform VARCHAR(16), process_name VARCHAR(64), memory_mb INT, recorded_at TIMESTAMP)`",
    targetQuery: `SELECT host_id,\n       os_platform,\n       process_name,\n       memory_mb,\n       ROUND(AVG(memory_mb) OVER (PARTITION BY os_platform, process_name), 2) AS fleet_avg_mb,\n       ROUND(STDDEV(memory_mb) OVER (PARTITION BY os_platform, process_name), 2) AS fleet_stddev_mb,\n       ROUND((memory_mb - AVG(memory_mb) OVER (PARTITION BY os_platform, process_name)) / \n             NULLIF(STDDEV(memory_mb) OVER (PARTITION BY os_platform, process_name), 0), 2) AS z_score\nFROM EdrProcessTelemetry\nORDER BY z_score DESC;`,
    eli5Story: "Compare how much RAM svchost.exe is using on one laptop compared to 10,000 other Windows laptops, and calculate how many standard deviations weird it is.",
    commonMistakes: "Forgetting NULLIF on the standard deviation divisor, causing division-by-zero crashes when all observed processes have identical memory footprints.",
    learningOutcomes: "Compute statistical z-scores within window partitions and guard against division-by-zero errors."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Semiconductor Wafer Die Yield vs Fabrication Stepper Tool",
    ind: "Hardware",
    diff: "Easy",
    table: "WaferDieTestRuns",
    scenario: "Cleanroom yield engineers track defective silicon chips across photolithography stepper tools to isolate equipment calibration faults.",
    businessObjective: "Display wafer yield alongside stepper tool mean yield.",
    schemaSnippet: "`WaferDieTestRuns (wafer_id VARCHAR(32) PRIMARY KEY, stepper_id VARCHAR(16), good_dice INT, total_dice INT)`",
    targetQuery: `SELECT wafer_id,\n       stepper_id,\n       ROUND((good_dice::DECIMAL / total_dice) * 100, 2) AS wafer_yield_pct,\n       ROUND(AVG((good_dice::DECIMAL / total_dice) * 100) OVER (PARTITION BY stepper_id), 2) AS stepper_avg_yield_pct\nFROM WaferDieTestRuns\nORDER BY stepper_id, wafer_yield_pct ASC;`,
    eli5Story: "Check the yield of one silicon wafer, and compare it to the average yield of every wafer processed by that same photolithography machine.",
    commonMistakes: "Using GROUP BY, preventing engineers from viewing individual failed wafer serial numbers.",
    learningOutcomes: "Expose granular hardware serial yields alongside machine tool benchmark partitions."
  },
  {
    title: "Server Rack Thermal Exhaust vs Data Center Cooling Zone",
    ind: "Hardware",
    diff: "Medium",
    table: "RackThermalSensors",
    scenario: "Facilities engineers monitor server rack exhaust temperatures across hot-aisle containment zones to optimize HVAC chiller speeds.",
    businessObjective: "Calculate temperature delta from zone average and identify hot-spot racks.",
    schemaSnippet: "`RackThermalSensors (rack_id VARCHAR(16) PRIMARY KEY, data_center VARCHAR(12), zone_id VARCHAR(16), exhaust_temp_c DECIMAL(4,1))`",
    targetQuery: `SELECT rack_id,\n       data_center,\n       zone_id,\n       exhaust_temp_c,\n       ROUND(AVG(exhaust_temp_c) OVER (PARTITION BY data_center, zone_id), 1) AS zone_mean_c,\n       ROUND(exhaust_temp_c - AVG(exhaust_temp_c) OVER (PARTITION BY data_center, zone_id), 1) AS zone_temp_delta,\n       MAX(exhaust_temp_c) OVER (PARTITION BY data_center, zone_id) AS zone_peak_temp_c\nFROM RackThermalSensors\nORDER BY data_center, zone_id, zone_temp_delta DESC;`,
    eli5Story: "See how hot one server rack is blowing, compare it to the average temperature of its specific cooling aisle, and see the hottest rack in that room.",
    commonMistakes: "Partitioning by rack_id, which reduces the partition to 1 row and makes average equal to current temperature.",
    learningOutcomes: "Partition across physical environmental boundaries to calculate differential operational metrics."
  },
  {
    title: "EV Battery Cell Degradation vs Chemistry Batch & Cycle Count",
    ind: "Hardware",
    diff: "Hard",
    table: "BatteryCellCycleTelemetry",
    scenario: "Automotive battery engineers analyze capacity loss across lithium-ion pouch cells to validate anode supplier formulations.",
    businessObjective: "Calculate cell capacity retention against cathode chemistry batch average and total batch energy throughput.",
    schemaSnippet: "`BatteryCellCycleTelemetry (cell_sn VARCHAR(32) PRIMARY KEY, batch_id VARCHAR(24), cathode_supplier VARCHAR(32), cycles_completed INT, measured_capacity_mah INT)`",
    targetQuery: `SELECT cell_sn,\n       batch_id,\n       cathode_supplier,\n       cycles_completed,\n       measured_capacity_mah,\n       ROUND(AVG(measured_capacity_mah) OVER (PARTITION BY batch_id), 1) AS batch_mean_capacity,\n       ROUND((measured_capacity_mah::DECIMAL / AVG(measured_capacity_mah) OVER (PARTITION BY batch_id)) * 100, 2) AS relative_retention_pct,\n       ROUND(STDDEV(measured_capacity_mah) OVER (PARTITION BY batch_id), 2) AS batch_stddev_mah\nFROM BatteryCellCycleTelemetry\nORDER BY batch_id, relative_retention_pct ASC;`,
    eli5Story: "Check the battery health of one car battery cell, compare it to all other cells built in that same chemical factory batch, and flag outlier duds.",
    commonMistakes: "Partitioning by cathode_supplier instead of the more granular batch_id, obscuring production run variability.",
    learningOutcomes: "Isolate manufacturing quality cohorts using fine-grained batch partition windows."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Salary vs Department & Job Title Benchmark",
    ind: "HR",
    diff: "Easy",
    table: "EmployeeCompensation",
    scenario: "Compensation committees audit pay equity by evaluating employee base pay against the average compensation within their specific job title and department.",
    businessObjective: "Display employee salary alongside department job title average and variance.",
    schemaSnippet: "`EmployeeCompensation (emp_id VARCHAR(16) PRIMARY KEY, department VARCHAR(32), job_title VARCHAR(40), salary_usd DECIMAL(10,2))`",
    targetQuery: `SELECT emp_id,\n       department,\n       job_title,\n       salary_usd,\n       ROUND(AVG(salary_usd) OVER (PARTITION BY department, job_title), 2) AS title_avg_salary,\n       ROUND(salary_usd - AVG(salary_usd) OVER (PARTITION BY department, job_title), 2) AS variance_from_avg\nFROM EmployeeCompensation\nORDER BY department, job_title, salary_usd DESC;`,
    eli5Story: "Show what an engineer earns, and display the exact average pay for all software engineers in that specific division right on the same row.",
    commonMistakes: "Partitioning only by department, mixing junior coordinators with senior directors.",
    learningOutcomes: "Partition across composite organizational hierarchy roles for compensation modeling."
  },
  {
    title: "Quarterly Performance Review Rating vs Division Mean & Quota Distribution",
    ind: "HR",
    diff: "Medium",
    table: "EmployeePerformanceReviews",
    scenario: "Talent management teams detect grading curve leniency across business divisions by comparing managerial review scores to the divisional average.",
    businessObjective: "Measure individual performance score vs division mean and compute employee division rank share.",
    schemaSnippet: "`EmployeePerformanceReviews (review_id VARCHAR(32) PRIMARY KEY, emp_id VARCHAR(16), division VARCHAR(32), review_score DECIMAL(3,2), review_year INT)`",
    targetQuery: `SELECT emp_id,\n       division,\n       review_year,\n       review_score,\n       ROUND(AVG(review_score) OVER (PARTITION BY division, review_year), 2) AS division_mean_score,\n       ROUND(review_score - AVG(review_score) OVER (PARTITION BY division, review_year), 2) AS score_delta,\n       COUNT(*) OVER (PARTITION BY division, review_year) AS total_division_reviews\nFROM EmployeePerformanceReviews\nORDER BY division, review_score DESC;`,
    eli5Story: "Show an employee's annual review rating, compare it to how tough or easy that specific division graded on average, and see how many people were evaluated.",
    commonMistakes: "Omitting review_year, accidentally mixing 2024 and 2026 rating scales.",
    learningOutcomes: "Partition temporal organizational audit logs across division and year dimensions."
  },
  {
    title: "Department Attrition Rate vs Business Unit Headcount Trajectory",
    ind: "HR",
    diff: "Hard",
    table: "DepartmentTurnoverMetrics",
    scenario: "Executive leaders review voluntary resignations across departments to detect toxic managerial culture pockets relative to the business unit.",
    businessObjective: "Calculate department turnover rate, business unit aggregated turnover, and department share of BU exits.",
    schemaSnippet: "`DepartmentTurnoverMetrics (dept_id VARCHAR(16), bu_id VARCHAR(16), fiscal_quarter VARCHAR(8), departures INT, active_headcount INT)`",
    targetQuery: `SELECT dept_id,\n       bu_id,\n       fiscal_quarter,\n       departures,\n       active_headcount,\n       ROUND((departures::DECIMAL / active_headcount) * 100, 2) AS dept_turnover_pct,\n       ROUND(SUM(departures) OVER (PARTITION BY bu_id, fiscal_quarter)::DECIMAL / \n             SUM(active_headcount) OVER (PARTITION BY bu_id, fiscal_quarter) * 100, 2) AS bu_turnover_pct,\n       ROUND(departures::DECIMAL / \n             SUM(departures) OVER (PARTITION BY bu_id, fiscal_quarter) * 100, 2) AS pct_of_bu_departures\nFROM DepartmentTurnoverMetrics\nORDER BY bu_id, dept_turnover_pct DESC;`,
    eli5Story: "Calculate how many people quit Marketing this quarter, compare it to the entire Business Unit's turnover rate, and see what chunk of all resignations came from Marketing.",
    commonMistakes: "Summing department percentages instead of summing raw departures and headcounts within the window partition.",
    learningOutcomes: "Avoid ecological fallacy by computing windowed sums of headcounts and departures across hierarchical organizations."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Database Query Execution Elapsed Time vs Query Fingerprint Pattern",
    ind: "Platforms",
    diff: "Easy",
    table: "QueryPerformanceLogs",
    scenario: "Database administrators analyze slow query logs to identify individual query executions that took much longer than typical for that SQL template.",
    businessObjective: "Display query duration alongside the template's average execution time.",
    schemaSnippet: "`QueryPerformanceLogs (query_id VARCHAR(36) PRIMARY KEY, query_fingerprint VARCHAR(64), elapsed_ms INT, rows_examined INT)`",
    targetQuery: `SELECT query_id,\n       query_fingerprint,\n       elapsed_ms,\n       ROUND(AVG(elapsed_ms) OVER (PARTITION BY query_fingerprint), 1) AS fingerprint_avg_ms,\n       elapsed_ms - ROUND(AVG(elapsed_ms) OVER (PARTITION BY query_fingerprint), 1) AS latency_spike_ms\nFROM QueryPerformanceLogs\nORDER BY query_fingerprint, elapsed_ms DESC;`,
    eli5Story: "Check how long a specific user checkout query took to run, and show the average run time for that exact same SQL pattern across all runs.",
    commonMistakes: "Grouping by fingerprint, which hides the specific query execution IDs needed to pull query execution plans.",
    learningOutcomes: "Use partition fences to isolate query execution spikes while maintaining execution record granularity."
  },
  {
    title: "Object Storage Bucket Egress Bandwidth vs Storage Class Baseline",
    ind: "Platforms",
    diff: "Medium",
    table: "StorageBucketEgress",
    scenario: "Cloud FinOps teams monitor Amazon S3 / Google Cloud Storage egress costs across storage classes to find unexpectedly chatty data buckets.",
    businessObjective: "Measure bucket egress gigabytes against the storage class total egress and average bucket egress.",
    schemaSnippet: "`StorageBucketEgress (bucket_name VARCHAR(64) PRIMARY KEY, storage_class VARCHAR(16), egress_gb BIGINT, billing_period VARCHAR(7))`",
    targetQuery: `SELECT bucket_name,\n       storage_class,\n       billing_period,\n       egress_gb,\n       SUM(egress_gb) OVER (PARTITION BY storage_class, billing_period) AS class_total_egress_gb,\n       ROUND(AVG(egress_gb) OVER (PARTITION BY storage_class, billing_period), 2) AS class_avg_egress_gb,\n       ROUND(egress_gb::DECIMAL / \n             SUM(egress_gb) OVER (PARTITION BY storage_class, billing_period) * 100, 2) AS class_egress_share_pct\nFROM StorageBucketEgress\nORDER BY storage_class, egress_gb DESC;`,
    eli5Story: "See how much data was downloaded from one S3 bucket, and show what percentage of all Glacier or Standard egress traffic came from that single bucket.",
    commonMistakes: "Partitioning without billing_period, combining historical months and computing inaccurate monthly shares.",
    learningOutcomes: "Partition across technical class and calendar billing intervals to analyze infrastructure cost allocations."
  },
  {
    title: "Distributed Message Broker Queue Lag vs Consumer Group Partition",
    ind: "Platforms",
    diff: "Hard",
    table: "KafkaConsumerGroupLag",
    scenario: "Platform engineers track Apache Kafka consumer group lag across topic partitions to spot lagging consumers causing pipeline backpressure.",
    businessObjective: "Calculate consumer partition lag against topic-wide average lag and evaluate partition's share of total consumer group backlog.",
    schemaSnippet: "`KafkaConsumerGroupLag (group_id VARCHAR(32), topic_name VARCHAR(64), partition_id INT, current_lag_messages BIGINT, consumer_host VARCHAR(32))`",
    targetQuery: `SELECT group_id,\n       topic_name,\n       partition_id,\n       consumer_host,\n       current_lag_messages,\n       ROUND(AVG(current_lag_messages) OVER (PARTITION BY group_id, topic_name), 0) AS topic_avg_lag,\n       SUM(current_lag_messages) OVER (PARTITION BY group_id, topic_name) AS topic_total_backlog,\n       ROUND(current_lag_messages::DECIMAL / \n             NULLIF(SUM(current_lag_messages) OVER (PARTITION BY group_id, topic_name), 0) * 100, 2) AS lag_share_pct\nFROM KafkaConsumerGroupLag\nORDER BY group_id, topic_name, current_lag_messages DESC;`,
    eli5Story: "Look at how far behind one Kafka consumer worker is on Partition 3, compare it to the average lag across all partitions for that topic, and calculate its share of the backlog.",
    commonMistakes: "Failing to handle 0 total backlog with NULLIF, resulting in division by zero when all queues are caught up.",
    learningOutcomes: "Deploy robust NULLIF-guarded window share calculations across distributed stream partitions."
  }
];
