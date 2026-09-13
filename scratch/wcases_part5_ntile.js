// =============================================================================
// SECTION 9 - PART 5: NTILE(k), PERCENT_RANK & CUME_DIST QUANTILE BUCKETING (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: Quartiles, Deciles, Percentiles, Cumulative Distribution, Bucket Remainder Distribution
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Consumer Credit Card Credit Limit Quartile Stratification",
    ind: "Fintech",
    diff: "Easy",
    table: "CreditCardAccounts",
    scenario: "Retail credit card risk teams segment credit lines into four quartiles to determine promotional balance transfer interest rate offers.",
    businessObjective: "Partition credit lines into 4 quartiles using NTILE(4).",
    schemaSnippet: "`CreditCardAccounts (account_id VARCHAR(24) PRIMARY KEY, cardholder_id VARCHAR(24), credit_limit_usd DECIMAL(10,2))`",
    targetQuery: `SELECT account_id,\n       cardholder_id,\n       credit_limit_usd,\n       NTILE(4) OVER (ORDER BY credit_limit_usd ASC) AS credit_quartile\nFROM CreditCardAccounts\nORDER BY credit_limit_usd ASC;`,
    eli5Story: "Divide all our credit card customers into 4 equal-sized groups based on their credit limit: Tier 1 (lowest) to Tier 4 (highest).",
    commonMistakes: "Expecting NTILE(4) to split by dollar amounts ($0-$2.5k, $2.5k-$5k...); NTILE divides row counts equally, not value ranges.",
    learningOutcomes: "Understand that NTILE(k) partitions equal row cardinality rather than equal value widths."
  },
  {
    title: "Institutional Wealth Portfolio High-Net-Worth Decile Segmentation",
    ind: "Fintech",
    diff: "Medium",
    table: "ClientPortfolioBalances",
    scenario: "Private wealth managers segment account holders into 10 wealth deciles, extracting clients in the top 10% (Decile 10) for concierge family-office advisory services.",
    businessObjective: "Assign decile scores using NTILE(10) and filter for Decile 10 clients.",
    schemaSnippet: "`ClientPortfolioBalances (client_id VARCHAR(24) PRIMARY KEY, wealth_tier VARCHAR(16), total_aum_usd DECIMAL(14,2))`",
    targetQuery: `WITH DeciledClients AS (\n  SELECT client_id,\n         wealth_tier,\n         total_aum_usd,\n         NTILE(10) OVER (ORDER BY total_aum_usd ASC) AS wealth_decile\n  FROM ClientPortfolioBalances\n)\nSELECT client_id,\n       wealth_tier,\n       total_aum_usd,\n       wealth_decile\nFROM DeciledClients\nWHERE wealth_decile = 10\nORDER BY total_aum_usd DESC;`,
    eli5Story: "Sort all our bank clients by how much money they have invested with us, chop the list into 10 equal buckets, and pull out the top 10% richest bucket.",
    commonMistakes: "Ordering DESC inside NTILE(10), which makes Decile 1 the richest and Decile 10 the poorest, confusing standard financial conventions.",
    learningOutcomes: "Properly align quantile order direction with institutional reporting conventions."
  },
  {
    title: "Algorithmic Order Flow Toxicity Percentile & Cumulative Distribution",
    ind: "Fintech",
    diff: "Hard",
    table: "MarketOrderFlowToxicities",
    scenario: "Quantitative market making desks evaluate order flow toxicity by calculating both PERCENT_RANK() and CUME_DIST() on order adverse selection indices, isolating orders in the toxic 99th percentile.",
    businessObjective: "Simultaneously compute PERCENT_RANK() and CUME_DIST() and filter for orders with CUME_DIST >= 0.99.",
    schemaSnippet: "`MarketOrderFlowToxicities (order_id VARCHAR(36) PRIMARY KEY, symbol VARCHAR(12), vpin_score DECIMAL(6,4), order_qty INT)`",
    targetQuery: `SELECT order_id,\n       symbol,\n       vpin_score,\n       order_qty,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY symbol ORDER BY vpin_score ASC), 4) AS toxicity_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY symbol ORDER BY vpin_score ASC), 4) AS toxicity_cume_dist\nFROM MarketOrderFlowToxicities\nQUALIFY toxicity_cume_dist >= 0.99\nORDER BY symbol, vpin_score DESC;`,
    eli5Story: "Calculate both the relative rank and the cumulative share for every trade's danger score. Pluck out trades sitting in the toxic top 1% tail.",
    commonMistakes: "Confusing PERCENT_RANK ((rank-1)/(N-1)) with CUME_DIST (rows<=current/N), which behave differently on the first and last rows.",
    learningOutcomes: "Master mathematical distinctions between PERCENT_RANK() and CUME_DIST() in quantitative finance."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "SaaS Tenant Monthly Active Users Quartile Classification",
    ind: "SaaS",
    diff: "Easy",
    table: "TenantMonthlyActiveUsers",
    scenario: "Growth marketing teams split customer tenants into 4 engagement quartiles based on monthly active users (MAU) to trigger automated marketing email sequences.",
    businessObjective: "Stratify customer accounts into engagement quartiles using NTILE(4).",
    schemaSnippet: "`TenantMonthlyActiveUsers (tenant_id VARCHAR(32) PRIMARY KEY, plan_tier VARCHAR(20), active_users INT)`",
    targetQuery: `SELECT tenant_id,\n       plan_tier,\n       active_users,\n       NTILE(4) OVER (PARTITION BY plan_tier ORDER BY active_users ASC) AS engagement_quartile\nFROM TenantMonthlyActiveUsers\nORDER BY plan_tier, engagement_quartile ASC, active_users ASC;`,
    eli5Story: "Inside each subscription plan, split companies into 4 equal groups: low, medium-low, medium-high, and super-active users.",
    commonMistakes: "Omitting PARTITION BY plan_tier, which groups Free and Enterprise users together and skews the buckets.",
    learningOutcomes: "Segment customer cohorts independently using partition-scoped NTILE bucketing."
  },
  {
    title: "API Consumer Hourly Bandwidth Decile Billing Stratification",
    ind: "SaaS",
    diff: "Medium",
    table: "ApiConsumerBandwidth",
    scenario: "Cloud platform billing operations assign network surcharge rates by dividing API consumers into 10 usage deciles based on monthly egress gigabytes.",
    businessObjective: "Assign decile buckets and filter for consumers in the top 2 highest usage deciles (Deciles 9 and 10).",
    schemaSnippet: "`ApiConsumerBandwidth (consumer_id VARCHAR(32) PRIMARY KEY, plan_type VARCHAR(16), egress_gb BIGINT)`",
    targetQuery: `WITH DeciledConsumers AS (\n  SELECT consumer_id,\n         plan_type,\n         egress_gb,\n         NTILE(10) OVER (ORDER BY egress_gb ASC) AS egress_decile\n  FROM ApiConsumerBandwidth\n)\nSELECT consumer_id,\n       plan_type,\n       egress_gb,\n       egress_decile\nFROM DeciledConsumers\nWHERE egress_decile >= 9\nORDER BY egress_gb DESC;`,
    eli5Story: "Divide all API users into 10 groups by how much data they downloaded. Pull out the top 2 heaviest bandwidth-hungry groups for enterprise billing upgrades.",
    commonMistakes: "Using PERCENT_RANK() when an exact integer bucket index (1..10) is required for billing ledger integration.",
    learningOutcomes: "Use integer decile scores from NTILE(10) to power automated billing tiers."
  },
  {
    title: "Microservice Request Execution Duration Percentile Tail Analysis",
    ind: "SaaS",
    diff: "Hard",
    table: "TraceSpanDurations",
    scenario: "Site reliability engineers calculate p50, p90, and p99 latency boundaries across microservices by evaluating CUME_DIST() and PERCENT_RANK() on distributed trace durations.",
    businessObjective: "Classify spans into SLA latency tiers (Median, p90, p99, Tail) using window cumulative distribution functions.",
    schemaSnippet: "`TraceSpanDurations (span_id VARCHAR(36) PRIMARY KEY, service_name VARCHAR(32), duration_ms INT)`",
    targetQuery: `WITH LatencyPercentiles AS (\n  SELECT span_id,\n         service_name,\n         duration_ms,\n         ROUND(CUME_DIST() OVER (PARTITION BY service_name ORDER BY duration_ms ASC), 4) AS cume_dist_val\n  FROM TraceSpanDurations\n)\nSELECT span_id,\n       service_name,\n       duration_ms,\n       cume_dist_val,\n       CASE WHEN cume_dist_val <= 0.50 THEN 'P50_MEDIAN'\n            WHEN cume_dist_val <= 0.90 THEN 'P90_STANDARD'\n            WHEN cume_dist_val <= 0.99 THEN 'P99_ELEVATED'\n            ELSE 'P99_PLUS_OUTLIER' END AS latency_sla_bucket\nFROM LatencyPercentiles\nORDER BY service_name, duration_ms DESC;`,
    eli5Story: "Calculate the exact percentile position of every server request. Label each request as normal (under 50%), standard (50-90%), slow (90-99%), or extreme lag (top 1%).",
    commonMistakes: "Using NTILE(100) instead of CUME_DIST(); NTILE(100) blindly splits rows into 100 groups even if multiple rows share identical millisecond durations.",
    learningOutcomes: "Differentiate between NTILE bucketing and CUME_DIST() percentile scoring for latency analysis."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "E-Commerce Customer Lifetime Value Spend Quartiles",
    ind: "Retail",
    diff: "Easy",
    table: "CustomerLifetimeSpend",
    scenario: "CRM marketing managers divide loyalty club members into 4 spending quartiles based on total annual purchases to award tier status.",
    businessObjective: "Stratify customer lifetime spending into 4 quartiles using NTILE(4).",
    schemaSnippet: "`CustomerLifetimeSpend (customer_id VARCHAR(24) PRIMARY KEY, total_spend_usd DECIMAL(12,2))`",
    targetQuery: `SELECT customer_id,\n       total_spend_usd,\n       NTILE(4) OVER (ORDER BY total_spend_usd ASC) AS spend_quartile\nFROM CustomerLifetimeSpend\nORDER BY total_spend_usd DESC;`,
    eli5Story: "Divide shoppers into 4 equal groups based on how much money they have spent with us: Bronze (Q1), Silver (Q2), Gold (Q3), and Platinum (Q4).",
    commonMistakes: "Assuming all quartiles have the exact same dollar span; Q4 will have a massive dollar span because a few whales spend millions.",
    learningOutcomes: "Interpret the non-linear relationship between row quartiles and dollar distributions."
  },
  {
    title: "Retail Store Product Catalog Velocity Decile Segmentation",
    ind: "Retail",
    diff: "Medium",
    table: "ProductSalesVelocities",
    scenario: "Inventory management teams categorize SKUs into 10 velocity deciles to assign warehouse slotting priority, isolating Decile 10 items for placement near packing docks.",
    businessObjective: "Assign SKU velocity deciles and extract Decile 10 fast-movers.",
    schemaSnippet: "`ProductSalesVelocities (sku VARCHAR(24) PRIMARY KEY, department VARCHAR(32), units_sold_30d INT)`",
    targetQuery: `WITH SkuDeciles AS (\n  SELECT sku,\n         department,\n         units_sold_30d,\n         NTILE(10) OVER (PARTITION BY department ORDER BY units_sold_30d ASC) AS velocity_decile\n  FROM ProductSalesVelocities\n)\nSELECT sku,\n       department,\n       units_sold_30d,\n       velocity_decile\nFROM SkuDeciles\nWHERE velocity_decile = 10\nORDER BY department, units_sold_30d DESC;`,
    eli5Story: "In each department, divide products into 10 speed buckets. Take the fastest 10% of items and store them right next to the packing doors so warehouse workers walk less.",
    commonMistakes: "Omitting the department partition, which causes grocery items to dominate Decile 10 while luxury jewelry SKUs get stuck in Decile 1.",
    learningOutcomes: "Apply departmental partition fences to prevent fast-moving low-cost categories from cannibalizing slow-moving high-margin goods."
  },
  {
    title: "Omnichannel Supplier Order Lead-Time Percentile Stratification",
    ind: "Retail",
    diff: "Hard",
    table: "SupplierShipmentLeadTimes",
    scenario: "Supply chain risk controllers calculate the cumulative probability distribution of supplier order lead-times, isolating shipments arriving past the 95th percentile of expected delivery days.",
    businessObjective: "Compute PERCENT_RANK() and CUME_DIST() across supplier lead times and filter for shipments exceeding the 95th percentile.",
    schemaSnippet: "`SupplierShipmentLeadTimes (po_number VARCHAR(32) PRIMARY KEY, vendor_id VARCHAR(24), commodity VARCHAR(24), lead_time_days INT)`",
    targetQuery: `SELECT po_number,\n       vendor_id,\n       commodity,\n       lead_time_days,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY commodity ORDER BY lead_time_days ASC), 4) AS lead_time_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY commodity ORDER BY lead_time_days ASC), 4) AS lead_time_cume_dist\nFROM SupplierShipmentLeadTimes\nQUALIFY lead_time_cume_dist >= 0.95\nORDER BY commodity, lead_time_days DESC;`,
    eli5Story: "Check how long suppliers take to deliver boxes. Find the deliveries that took longer than 95% of all shipments in that product category so we can fine the suppliers.",
    commonMistakes: "Using NTILE(20) and assuming bucket 20 exactly matches the 95th percentile when duplicate lead-time days cause boundary ties.",
    learningOutcomes: "Use CUME_DIST() instead of discrete NTILE buckets when evaluating contract SLA percentiles with tie values."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Hospital Patient Length-of-Stay Quartile Grouping",
    ind: "Healthcare",
    diff: "Easy",
    table: "HospitalDischargeSummaries",
    scenario: "Case management teams group discharged hospital patients into 4 recovery stay quartiles to schedule post-discharge telehealth follow-ups.",
    businessObjective: "Partition patient stays into 4 recovery quartiles using NTILE(4).",
    schemaSnippet: "`HospitalDischargeSummaries (patient_id VARCHAR(24) PRIMARY KEY, department VARCHAR(24), days_stayed INT)`",
    targetQuery: `SELECT patient_id,\n       department,\n       days_stayed,\n       NTILE(4) OVER (PARTITION BY department ORDER BY days_stayed ASC) AS stay_quartile\nFROM HospitalDischargeSummaries\nORDER BY department, stay_quartile ASC;`,
    eli5Story: "In each hospital ward, sort patients by how many days they spent in a hospital bed and divide them into 4 equal recovery speed groups.",
    commonMistakes: "Sorting DESC, which assigns Quartile 1 to the longest stays instead of the fastest recoveries.",
    learningOutcomes: "Correctly assign ascending quantile bins to clinical duration metrics."
  },
  {
    title: "Health Insurance Claim Amount Decile Risk Assessment",
    ind: "Healthcare",
    diff: "Medium",
    table: "InsuranceClaimPayouts",
    scenario: "Actuarial teams segment annual medical claims into 10 payout deciles to identify policyholders falling into Decile 10 for catastrophic reinsurance coverage.",
    businessObjective: "Assign claim deciles and extract Decile 10 catastrophic claims using NTILE(10).",
    schemaSnippet: "`InsuranceClaimPayouts (claim_id VARCHAR(32) PRIMARY KEY, policy_type VARCHAR(16), paid_amount_usd DECIMAL(12,2))`",
    targetQuery: `WITH DeciledClaims AS (\n  SELECT claim_id,\n         policy_type,\n         paid_amount_usd,\n         NTILE(10) OVER (PARTITION BY policy_type ORDER BY paid_amount_usd ASC) AS claim_decile\n  FROM InsuranceClaimPayouts\n)\nSELECT claim_id,\n       policy_type,\n       paid_amount_usd,\n       claim_decile\nFROM DeciledClaims\nWHERE claim_decile = 10\nORDER BY policy_type, paid_amount_usd DESC;`,
    eli5Story: "Divide insurance claims into 10 groups by payout size. Pluck out Decile 10 (the most expensive 10% of medical claims) to send to our reinsurance partner.",
    commonMistakes: "Failing to partition by policy_type, which mixes dental claims with heart surgery claims.",
    learningOutcomes: "Partition insurance claim severity models across policy product lines."
  },
  {
    title: "Clinical Trial Biomarker Expression Percentile & Cumulative Density",
    ind: "Healthcare",
    diff: "Hard",
    table: "PatientBiomarkerAssays",
    scenario: "Precision medicine researchers analyze genetic biomarker expression levels across tumor biopsies, calculating both PERCENT_RANK() and CUME_DIST() to isolate patients in the top 5% expression bracket.",
    businessObjective: "Compute biomarker percentiles and extract patients in the top 5% cumulative distribution.",
    schemaSnippet: "`PatientBiomarkerAssays (assay_id VARCHAR(36) PRIMARY KEY, cohort_id VARCHAR(16), gene_symbol VARCHAR(16), expression_level DECIMAL(8,4))`",
    targetQuery: `SELECT assay_id,\n       cohort_id,\n       gene_symbol,\n       expression_level,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY cohort_id, gene_symbol ORDER BY expression_level ASC), 4) AS expr_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY cohort_id, gene_symbol ORDER BY expression_level ASC), 4) AS expr_cume_dist\nFROM PatientBiomarkerAssays\nQUALIFY expr_cume_dist >= 0.95\nORDER BY cohort_id, gene_symbol, expression_level DESC;`,
    eli5Story: "Measure how active a specific cancer gene is in each patient. Calculate their exact percentile rank and pull out the 5% of patients with the most active gene expression for targeted immunotherapy.",
    commonMistakes: "Omitting gene_symbol from PARTITION BY, causing different genes with different baseline scales to be compared directly.",
    learningOutcomes: "Isolate genetic expression cohorts using multi-attribute statistical distribution windows."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Freight Dispatch Delivery Transit Time Quartile Grouping",
    ind: "Logistics",
    diff: "Easy",
    table: "DispatchRouteTrips",
    scenario: "Fleet operations classify completed long-haul truck trips into 4 transit speed quartiles to adjust delivery schedule commitments.",
    businessObjective: "Partition freight trips into 4 transit speed quartiles using NTILE(4).",
    schemaSnippet: "`DispatchRouteTrips (trip_id VARCHAR(32) PRIMARY KEY, route_code VARCHAR(16), transit_hours DECIMAL(5,2))`",
    targetQuery: `SELECT trip_id,\n       route_code,\n       transit_hours,\n       NTILE(4) OVER (PARTITION BY route_code ORDER BY transit_hours ASC) AS speed_quartile\nFROM DispatchRouteTrips\nORDER BY route_code, speed_quartile ASC;`,
    eli5Story: "Chop all truck deliveries on each route into 4 equal buckets: fastest deliveries in Bucket 1, slowest deliveries in Bucket 4.",
    commonMistakes: "Grouping without route_code, comparing a 50-mile city route against a 2,000-mile cross-country haul.",
    learningOutcomes: "Partition transit time metrics across discrete route corridors."
  },
  {
    title: "Warehouse Picking Zone Travel Distance Decile Stratification",
    ind: "Logistics",
    diff: "Medium",
    table: "PickerTravelLogs",
    scenario: "Fulfillment center industrial engineers analyze warehouse picker foot travel distance, grouping shifts into 10 deciles to redesign inventory placement.",
    businessObjective: "Assign travel distance deciles and extract the highest exhaustion decile (Decile 10) using NTILE(10).",
    schemaSnippet: "`PickerTravelLogs (shift_id VARCHAR(32) PRIMARY KEY, facility_id VARCHAR(16), km_walked DECIMAL(5,2))`",
    targetQuery: `WITH DeciledShifts AS (\n  SELECT shift_id,\n         facility_id,\n         km_walked,\n         NTILE(10) OVER (PARTITION BY facility_id ORDER BY km_walked ASC) AS fatigue_decile\n  FROM PickerTravelLogs\n)\nSELECT shift_id,\n       facility_id,\n       km_walked,\n       fatigue_decile\nFROM DeciledShifts\nWHERE fatigue_decile = 10\nORDER BY facility_id, km_walked DESC;`,
    eli5Story: "Divide warehouse workers' shifts into 10 groups by how many kilometers they had to walk. Find the top 10% most exhausting shifts to see which warehouse aisles need reorganizing.",
    commonMistakes: "Using a global NTILE without facility_id, ignoring differing physical building layouts and square footage.",
    learningOutcomes: "Apply facility-scoped decile windows to isolate ergonomic and operational bottlenecks."
  },
  {
    title: "Ocean Container Demurrage Port Dwell Time Percentiles",
    ind: "Logistics",
    diff: "Hard",
    table: "ContainerPortDwellTimes",
    scenario: "Shipping lines audit container port dwell times to predict demurrage penalties, calculating CUME_DIST() to flag containers waiting in the 90th percentile.",
    businessObjective: "Calculate dwell time percentiles and extract containers exceeding the 90th percentile.",
    schemaSnippet: "`ContainerPortDwellTimes (container_id VARCHAR(20) PRIMARY KEY, port_code VARCHAR(8), dwell_days INT)`",
    targetQuery: `SELECT container_id,\n       port_code,\n       dwell_days,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY port_code ORDER BY dwell_days ASC), 4) AS dwell_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY port_code ORDER BY dwell_days ASC), 4) AS dwell_cume_dist\nFROM ContainerPortDwellTimes\nQUALIFY dwell_cume_dist >= 0.90\nORDER BY port_code, dwell_days DESC;`,
    eli5Story: "See how many days shipping containers sit on the dock. Calculate the cumulative percentage distribution for each seaport and extract containers in the delayed top 10%.",
    commonMistakes: "Using PERCENT_RANK() >= 0.90 when CUME_DIST() is legally required by port contracts to measure cumulative probability.",
    learningOutcomes: "Deploy CUME_DIST() for contractually compliant demurrage and detention auditing."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Streaming Video Watch Time Duration Quartile Classification",
    ind: "Media",
    diff: "Easy",
    table: "UserWatchSessions",
    scenario: "Video on demand (VOD) recommendation engines segment viewer sessions into 4 quartiles based on minutes watched to train collaborative filtering algorithms.",
    businessObjective: "Stratify viewing sessions into 4 quartiles using NTILE(4).",
    schemaSnippet: "`UserWatchSessions (session_id VARCHAR(32) PRIMARY KEY, content_type VARCHAR(16), watch_minutes INT)`",
    targetQuery: `SELECT session_id,\n       content_type,\n       watch_minutes,\n       NTILE(4) OVER (PARTITION BY content_type ORDER BY watch_minutes ASC) AS watch_quartile\nFROM UserWatchSessions\nORDER BY content_type, watch_quartile ASC;`,
    eli5Story: "Chop movie viewing sessions into 4 groups: short drop-offs, medium watches, long watches, and full movie completions.",
    commonMistakes: "Partitioning without content_type, grouping 5-minute TikTok style clips with 3-hour feature films.",
    learningOutcomes: "Normalize media engagement metrics across distinct content formats."
  },
  {
    title: "Mobile Game Player In-App Purchase Spend Deciles",
    ind: "Media",
    diff: "Medium",
    table: "PlayerLifetimePurchases",
    scenario: "Game economy designers classify players into 10 monetization deciles based on lifetime microtransaction spend to optimize in-game shop offers.",
    businessObjective: "Assign spending deciles and extract top-tier 'whale' gamers in Decile 10.",
    schemaSnippet: "`PlayerLifetimePurchases (player_id VARCHAR(24) PRIMARY KEY, platform VARCHAR(8), total_spend_usd DECIMAL(10,2))`",
    targetQuery: `WITH DeciledGamers AS (\n  SELECT player_id,\n         platform,\n         total_spend_usd,\n         NTILE(10) OVER (ORDER BY total_spend_usd ASC) AS monetization_decile\n  FROM PlayerLifetimePurchases\n)\nSELECT player_id,\n       platform,\n       total_spend_usd,\n       monetization_decile\nFROM DeciledGamers\nWHERE monetization_decile = 10\nORDER BY total_spend_usd DESC;`,
    eli5Story: "Divide all video game players into 10 groups by how much money they spent on in-game skins. Pull out the richest Decile 10 (the gaming whales) to send VIP customer support.",
    commonMistakes: "Ordering DESC inside NTILE(10), which reverses standard decile notation (making decile 1 the highest).",
    learningOutcomes: "Classify high-skew consumer spending distributions using decile bucketing."
  },
  {
    title: "Digital Advertising Cost-Per-Click Bid Percentile & Cumulative Curve",
    ind: "Media",
    diff: "Hard",
    table: "AdAuctionBids",
    scenario: "Programmatic advertising platforms analyze second-price auction bid landscapes, calculating PERCENT_RANK() and CUME_DIST() across bid prices to advise advertisers on clearing probabilities.",
    businessObjective: "Calculate bid percentiles and extract bids in the top 5% most aggressive bracket per ad placement.",
    schemaSnippet: "`AdAuctionBids (bid_id VARCHAR(36) PRIMARY KEY, placement_id VARCHAR(24), bid_cpc_usd DECIMAL(6,2))`",
    targetQuery: `SELECT bid_id,\n       placement_id,\n       bid_cpc_usd,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY placement_id ORDER BY bid_cpc_usd ASC), 4) AS bid_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY placement_id ORDER BY bid_cpc_usd ASC), 4) AS bid_cume_dist\nFROM AdAuctionBids\nQUALIFY bid_cume_dist >= 0.95\nORDER BY placement_id, bid_cpc_usd DESC;`,
    eli5Story: "Look at every bid submitted for an ad space. Calculate what percentage of all other bids each bid beats, and show the top 5% most aggressive bids.",
    commonMistakes: "Using RANK() and dividing by COUNT manually instead of using built-in CUME_DIST(), introducing edge-case rounding errors.",
    learningOutcomes: "Leverage native CUME_DIST() for accurate auction win-probability curves."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Network Host Data Transfer Volume Quartile Grouping",
    ind: "Security",
    diff: "Easy",
    table: "HostNetworkEgress",
    scenario: "Network security analysts segment employee laptops into 4 data transfer quartiles based on daily outbound gigabytes to flag anomalous data hoarders.",
    businessObjective: "Stratify network hosts into 4 egress volume quartiles using NTILE(4).",
    schemaSnippet: "`HostNetworkEgress (host_id VARCHAR(32) PRIMARY KEY, department VARCHAR(24), outbound_gb DECIMAL(8,2))`",
    targetQuery: `SELECT host_id,\n       department,\n       outbound_gb,\n       NTILE(4) OVER (ORDER BY outbound_gb ASC) AS egress_quartile\nFROM HostNetworkEgress\nORDER BY outbound_gb DESC;`,
    eli5Story: "Chop all office computers into 4 groups based on how much internet data they uploaded today.",
    commonMistakes: "Assuming Quartile 4 only contains hackers; engineering machines compiling code will legitimately sit in Quartile 4.",
    learningOutcomes: "Establish baseline network utilization quartiles for enterprise security monitoring."
  },
  {
    title: "Cloud IAM User Permission Surface Decile Stratification",
    ind: "Security",
    diff: "Medium",
    table: "IamUserEntitlements",
    scenario: "Cloud security posture tools evaluate privilege sprawl by dividing IAM user accounts into 10 deciles based on total assigned permissions.",
    businessObjective: "Assign deciles to user permission counts and extract accounts in Decile 10 (highest privilege surface).",
    schemaSnippet: "`IamUserEntitlements (user_id VARCHAR(32) PRIMARY KEY, account_type VARCHAR(16), permission_count INT)`",
    targetQuery: `WITH DeciledUsers AS (\n  SELECT user_id,\n         account_type,\n         permission_count,\n         NTILE(10) OVER (ORDER BY permission_count ASC) AS privilege_decile\n  FROM IamUserEntitlements\n)\nSELECT user_id,\n       account_type,\n       permission_count,\n       privilege_decile\nFROM DeciledUsers\nWHERE privilege_decile = 10\nORDER BY permission_count DESC;`,
    eli5Story: "Count how many cloud permissions each employee has, split them into 10 groups, and audit the top 10% most powerful super-users.",
    commonMistakes: "Mixing human employee accounts and automated service accounts in the same unpartitioned decile pool.",
    learningOutcomes: "Identify identity access risk surfaces using quantile decile modeling."
  },
  {
    title: "DDoS Attack Vector Packet Flood Rate Cumulative Density Analysis",
    ind: "Security",
    diff: "Hard",
    table: "DdosPacketTelemetry",
    scenario: "Anti-DDoS scrubbers evaluate ingress packet rates across source IP subnets, calculating both PERCENT_RANK() and CUME_DIST() to trigger automated BGP flowspec rate-limiting on the top 1% attack sources.",
    businessObjective: "Calculate packet rate cumulative density and extract source subnets in the top 1% tail using QUALIFY.",
    schemaSnippet: "`DdosPacketTelemetry (subnet_prefix VARCHAR(24) PRIMARY KEY, attack_protocol VARCHAR(8), packets_per_sec BIGINT)`",
    targetQuery: `SELECT subnet_prefix,\n       attack_protocol,\n       packets_per_sec,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY attack_protocol ORDER BY packets_per_sec ASC), 4) AS flood_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY attack_protocol ORDER BY packets_per_sec ASC), 4) AS flood_cume_dist\nFROM DdosPacketTelemetry\nQUALIFY flood_cume_dist >= 0.99\nORDER BY attack_protocol, packets_per_sec DESC;`,
    eli5Story: "Check how many packets per second are hitting our routers. Find the worst 1% flooding subnets for each attack type (UDP flood, SYN flood) and immediately block them.",
    commonMistakes: "Omitting the protocol partition, comparing high-volume UDP floods against low-volume HTTP Slowloris attacks.",
    learningOutcomes: "Apply protocol-isolated cumulative density windows for automated DDoS mitigation."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Semiconductor Wafer Probe Test Electrical Resistance Quartiles",
    ind: "Hardware",
    diff: "Easy",
    table: "WaferProbeElectricalTests",
    scenario: "Cleanroom yield engineers classify test dies on a silicon wafer into 4 resistance quartiles to detect radial etching non-uniformity.",
    businessObjective: "Partition electrical resistance readings into 4 quartiles using NTILE(4).",
    schemaSnippet: "`WaferProbeElectricalTests (die_id VARCHAR(32) PRIMARY KEY, wafer_id VARCHAR(24), resistance_ohms DECIMAL(6,3))`",
    targetQuery: `SELECT die_id,\n       wafer_id,\n       resistance_ohms,\n       NTILE(4) OVER (PARTITION BY wafer_id ORDER BY resistance_ohms ASC) AS resistance_quartile\nFROM WaferProbeElectricalTests\nORDER BY wafer_id, resistance_quartile ASC;`,
    eli5Story: "Split microchip electrical test readings across each wafer into 4 equal buckets to see if the chips near the edge have higher resistance.",
    commonMistakes: "Omitting the wafer_id partition, combining results across separate silicon batches.",
    learningOutcomes: "Stratify manufacturing sensor data into spatial variation quartiles."
  },
  {
    title: "Server Storage SSD Endurance Terabytes-Written Decile Grouping",
    ind: "Hardware",
    diff: "Medium",
    table: "SsdWearTelematics",
    scenario: "Enterprise storage fleet managers divide SSD drives into 10 lifetime wear deciles based on Terabytes Written (TBW) to schedule preventative drive replacements.",
    businessObjective: "Assign wear deciles using NTILE(10) and extract Decile 10 drives near wearout limits.",
    schemaSnippet: "`SsdWearTelematics (drive_serial VARCHAR(32) PRIMARY KEY, drive_model VARCHAR(24), tbw_actual INT)`",
    targetQuery: `WITH DeciledDrives AS (\n  SELECT drive_serial,\n         drive_model,\n         tbw_actual,\n         NTILE(10) OVER (PARTITION BY drive_model ORDER BY tbw_actual ASC) AS wear_decile\n  FROM SsdWearTelematics\n)\nSELECT drive_serial,\n       drive_model,\n       tbw_actual,\n       wear_decile\nFROM DeciledDrives\nWHERE wear_decile = 10\nORDER BY drive_model, tbw_actual DESC;`,
    eli5Story: "Chop SSD drives into 10 wear groups based on how much data has been written to them. Flag the top 10% most worn-out drives so technicians can swap them out.",
    commonMistakes: "Partitioning without drive_model, comparing consumer-grade QLC drives against enterprise SLC drives with 10x endurance.",
    learningOutcomes: "Partition hardware wearout analysis across device hardware architectures."
  },
  {
    title: "Electric Vehicle DC Fast-Charging Thermal Rise Percentile Analysis",
    ind: "Hardware",
    diff: "Hard",
    table: "EvFastChargeTelematics",
    scenario: "Battery pack engineering teams analyze thermal heat generation during 350kW DC fast charging sessions, computing CUME_DIST() to flag battery packs heating in the 95th percentile.",
    businessObjective: "Compute thermal rise percentiles and isolate thermal excursions exceeding the 95th percentile.",
    schemaSnippet: "`EvFastChargeTelematics (session_id VARCHAR(36) PRIMARY KEY, pack_model VARCHAR(16), ambient_temp_c DECIMAL(4,1), temp_rise_c DECIMAL(5,2))`",
    targetQuery: `SELECT session_id,\n       pack_model,\n       ambient_temp_c,\n       temp_rise_c,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY pack_model ORDER BY temp_rise_c ASC), 4) AS thermal_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY pack_model ORDER BY temp_rise_c ASC), 4) AS thermal_cume_dist\nFROM EvFastChargeTelematics\nQUALIFY thermal_cume_dist >= 0.95\nORDER BY pack_model, temp_rise_c DESC;`,
    eli5Story: "Measure how hot EV car batteries get when fast-charging. Find the sessions where battery heating landed in the top 5% highest temperature spikes.",
    commonMistakes: "Failing to account for pack_model differences, mixing liquid-cooled packs with air-cooled packs.",
    learningOutcomes: "Apply cumulative density functions to thermodynamic engineering telemetry."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Employee Annual Bonus Payout Quartile Stratification",
    ind: "HR",
    diff: "Easy",
    table: "EmployeeBonusPayouts",
    scenario: "Total rewards compensation analysts group employee annual performance bonuses into 4 quartiles per department to evaluate pay equity.",
    businessObjective: "Stratify bonus payouts into 4 quartiles per department using NTILE(4).",
    schemaSnippet: "`EmployeeBonusPayouts (emp_id VARCHAR(16) PRIMARY KEY, department VARCHAR(24), bonus_usd DECIMAL(10,2))`",
    targetQuery: `SELECT emp_id,\n       department,\n       bonus_usd,\n       NTILE(4) OVER (PARTITION BY department ORDER BY bonus_usd ASC) AS bonus_quartile\nFROM EmployeeBonusPayouts\nORDER BY department, bonus_quartile ASC;`,
    eli5Story: "In each company department, split employee bonuses into 4 equal groups to see who got low, medium, and top-tier bonuses.",
    commonMistakes: "Using DENSE_RANK() when exact equal-sized cohort buckets are required by HR policies.",
    learningOutcomes: "Partition employee compensation cohorts into discrete equal-cardinality quartiles."
  },
  {
    title: "Sales Representative Annual Quota Attainment Decile Scoring",
    ind: "HR",
    diff: "Medium",
    table: "SalesQuotaAttainment",
    scenario: "Sales operations teams rank account executives by quota attainment percentage, dividing reps into 10 performance deciles to establish annual commission accelerator brackets.",
    businessObjective: "Assign attainment deciles using NTILE(10) and extract Decile 10 top performers.",
    schemaSnippet: "`SalesQuotaAttainment (rep_id VARCHAR(16) PRIMARY KEY, region VARCHAR(16), attainment_pct DECIMAL(5,2))`",
    targetQuery: `WITH DeciledReps AS (\n  SELECT rep_id,\n         region,\n         attainment_pct,\n         NTILE(10) OVER (PARTITION BY region ORDER BY attainment_pct ASC) AS attainment_decile\n  FROM SalesQuotaAttainment\n)\nSELECT rep_id,\n       region,\n       attainment_pct,\n       attainment_decile\nFROM DeciledReps\nWHERE attainment_decile = 10\nORDER BY region, attainment_pct DESC;`,
    eli5Story: "Divide sales reps in each region into 10 performance groups. Pull out Decile 10 (the top 10% highest quota crushers) for luxury travel awards.",
    commonMistakes: "Sorting DESC, which would make Decile 1 the highest achieving group rather than Decile 10.",
    learningOutcomes: "Structure regional quota performance brackets using ascending NTILE windows."
  },
  {
    title: "Corporate Salary Compa-Ratio Percentile & Cumulative Distribution",
    ind: "HR",
    diff: "Hard",
    table: "StaffSalaryCompaRatios",
    scenario: "Compensation committees audit salary distribution against salary band midpoints (compa-ratio), calculating PERCENT_RANK() and CUME_DIST() to flag pay outliers above the 95th percentile.",
    businessObjective: "Calculate salary compa-ratio percentiles per job level and extract employees above the 95th percentile.",
    schemaSnippet: "`StaffSalaryCompaRatios (emp_id VARCHAR(16) PRIMARY KEY, job_grade VARCHAR(8), compa_ratio DECIMAL(4,2))`",
    targetQuery: `SELECT emp_id,\n       job_grade,\n       compa_ratio,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY job_grade ORDER BY compa_ratio ASC), 4) AS compa_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY job_grade ORDER BY compa_ratio ASC), 4) AS compa_cume_dist\nFROM StaffSalaryCompaRatios\nQUALIFY compa_cume_dist >= 0.95\nORDER BY job_grade, compa_ratio DESC;`,
    eli5Story: "Compare each employee's salary to the middle of their official pay band. Find the top 5% highest-paid employees in each job grade for executive salary review.",
    commonMistakes: "Omitting the job_grade partition, comparing junior associate pay ratios against vice president pay ratios.",
    learningOutcomes: "Deploy statistical cumulative distribution windows to ensure organizational pay equity."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Cloud Object Storage Bucket Size Quartile Stratification",
    ind: "Platforms",
    diff: "Easy",
    table: "S3BucketCapacities",
    scenario: "Cloud FinOps engineers divide storage buckets into 4 capacity quartiles based on stored gigabytes to audit lifecycle archiving rules.",
    businessObjective: "Stratify storage buckets into 4 capacity quartiles using NTILE(4).",
    schemaSnippet: "`S3BucketCapacities (bucket_name VARCHAR(64) PRIMARY KEY, account_id VARCHAR(24), total_gb BIGINT)`",
    targetQuery: `SELECT bucket_name,\n       account_id,\n       total_gb,\n       NTILE(4) OVER (ORDER BY total_gb ASC) AS storage_quartile\nFROM S3BucketCapacities\nORDER BY total_gb DESC;`,
    eli5Story: "Chop all our cloud storage buckets into 4 size groups from tiny (Q1) to massive data lakes (Q4).",
    commonMistakes: "Assuming each quartile holds 25% of total gigabytes; Q4 will hold 95% of total gigabytes due to power-law data distribution.",
    learningOutcomes: "Distinguish between equal row counts (NTILE) and equal aggregate volume distribution."
  },
  {
    title: "Kubernetes Cluster Pod Memory Request Decile Classification",
    ind: "Platforms",
    diff: "Medium",
    table: "PodMemoryAllocations",
    scenario: "Kubernetes cluster capacity planners categorize container pods into 10 memory request deciles to optimize node bin-packing algorithms.",
    businessObjective: "Assign memory deciles and extract Decile 10 super-heavy pods using NTILE(10).",
    schemaSnippet: "`PodMemoryAllocations (pod_id VARCHAR(36) PRIMARY KEY, namespace VARCHAR(24), requested_ram_mb INT)`",
    targetQuery: `WITH DeciledPods AS (\n  SELECT pod_id,\n         namespace,\n         requested_ram_mb,\n         NTILE(10) OVER (PARTITION BY namespace ORDER BY requested_ram_mb ASC) AS memory_decile\n  FROM PodMemoryAllocations\n)\nSELECT pod_id,\n       namespace,\n       requested_ram_mb,\n       memory_decile\nFROM DeciledPods\nWHERE memory_decile = 10\nORDER BY namespace, requested_ram_mb DESC;`,
    eli5Story: "Divide Kubernetes microservice pods into 10 memory appetite groups. Find the top 10% memory hogs in each namespace to schedule them onto large dedicated servers.",
    commonMistakes: "Omitting the namespace partition, allowing test pods and machine-learning pods to distort shared deciles.",
    learningOutcomes: "Partition container resource allocations to design effective cluster bin-packing."
  },
  {
    title: "Database Lock Wait Time Cumulative Distribution & Tail Analysis",
    ind: "Platforms",
    diff: "Hard",
    table: "DbTransactionLockWaits",
    scenario: "Database performance engineers analyze transactional row lock contention, calculating PERCENT_RANK() and CUME_DIST() on wait times to detect anomalous blocking sessions in the 99th percentile.",
    businessObjective: "Calculate lock wait percentiles and extract blocking sessions in the 99th percentile using QUALIFY.",
    schemaSnippet: "`DbTransactionLockWaits (tx_id VARCHAR(32) PRIMARY KEY, table_name VARCHAR(32), wait_time_ms INT)`",
    targetQuery: `SELECT tx_id,\n       table_name,\n       wait_time_ms,\n       ROUND(PERCENT_RANK() OVER (PARTITION BY table_name ORDER BY wait_time_ms ASC), 4) AS wait_percent_rank,\n       ROUND(CUME_DIST() OVER (PARTITION BY table_name ORDER BY wait_time_ms ASC), 4) AS wait_cume_dist\nFROM DbTransactionLockWaits\nQUALIFY wait_cume_dist >= 0.99\nORDER BY table_name, wait_time_ms DESC;`,
    eli5Story: "See how long database queries were stuck waiting for a locked table. Find the queries that got stuck longer than 99% of all other queries on that table.",
    commonMistakes: "Using a global window across all tables, ignoring that small lookup tables and massive transactional tables have completely different lock physics.",
    learningOutcomes: "Deploy table-partitioned cumulative distribution functions for database concurrency tuning."
  }
];
