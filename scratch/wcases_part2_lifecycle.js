// =============================================================================
// SECTION 9 - PART 2: EXECUTION PIPELINE & FILTER WRAPPERS (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: QUALIFY, CTE Wrappers, Step 5 Pipeline Physics, Post-Window Predicates
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "High-Value Transaction Leaderboard Filtering via CTE Rank Fence",
    ind: "Fintech",
    diff: "Easy",
    table: "MerchantTransactions",
    scenario: "Compliance officers need to extract the top 3 highest-value credit card transactions for every merchant category code without syntax errors caused by referencing window functions in WHERE clauses.",
    businessObjective: "Wrap ROW_NUMBER() in an ANSI-compliant CTE and filter for rank <= 3 in the outer query.",
    schemaSnippet: "`MerchantTransactions (tx_id VARCHAR(32) PRIMARY KEY, mcc_code INT, amount_usd DECIMAL(12,2), tx_time TIMESTAMP)`",
    targetQuery: `WITH RankedTx AS (\n  SELECT tx_id,\n         mcc_code,\n         amount_usd,\n         tx_time,\n         ROW_NUMBER() OVER (PARTITION BY mcc_code ORDER BY amount_usd DESC) AS rank_in_mcc\n  FROM MerchantTransactions\n)\nSELECT tx_id,\n       mcc_code,\n       amount_usd,\n       tx_time,\n       rank_in_mcc\nFROM RankedTx\nWHERE rank_in_mcc <= 3\nORDER BY mcc_code, rank_in_mcc;`,
    eli5Story: "You cannot filter a leaderboard rank directly in a WHERE clause because ranks are calculated after WHERE runs. So you first stamp ranks on every ticket inside an envelope (CTE), then open the envelope and pick the top 3.",
    commonMistakes: "Placing 'WHERE ROW_NUMBER() OVER (...) <= 3' directly in the main query, triggering an immediate execution lifecycle syntax error.",
    learningOutcomes: "Master the CTE wrapper pattern to filter analytical window rankings in standard ANSI SQL."
  },
  {
    title: "Snowflake QUALIFY Streamlining for Loan Underwriting Tier Cutoffs",
    ind: "Fintech",
    diff: "Medium",
    table: "LoanApplications",
    scenario: "Credit risk engineers running on Snowflake or Google BigQuery need to prune subprime credit applications, isolating only the highest credit-score application per borrower tax ID using concise QUALIFY syntax.",
    businessObjective: "Filter window results directly using the QUALIFY clause, eliminating derived subquery boilerplate.",
    schemaSnippet: "`LoanApplications (app_id VARCHAR(36) PRIMARY KEY, borrower_ssn_hash VARCHAR(64), credit_score INT, requested_amount DECIMAL(12,2), submitted_at TIMESTAMP)`",
    targetQuery: `SELECT app_id,\n       borrower_ssn_hash,\n       credit_score,\n       requested_amount,\n       submitted_at\nFROM LoanApplications\nQUALIFY ROW_NUMBER() OVER (PARTITION BY borrower_ssn_hash ORDER BY credit_score DESC, submitted_at DESC) = 1\nORDER BY credit_score DESC;`,
    eli5Story: "Using QUALIFY is like telling the database: 'Compute the applicant rankings in step 5, and immediately throw away anyone who isn't #1 before showing me the screen.'",
    commonMistakes: "Assuming QUALIFY works on MySQL or standard PostgreSQL without verifying engine compatibility.",
    learningOutcomes: "Deploy modern data warehouse QUALIFY clauses to eliminate CTE overhead for Top-1 selection."
  },
  {
    title: "Two-Tier Subprime Margin Call Filter with Multi-Window QUALIFY",
    ind: "Fintech",
    diff: "Hard",
    table: "MarginAccountSnapshots",
    scenario: "Brokerage risk engines identify accounts with deteriorating leverage by filtering for traders whose current leverage is in the top 5% of their risk tier AND who have experienced negative equity drift across their last 3 snapshots.",
    businessObjective: "Apply compound QUALIFY predicates combining percentile ranks and directional lag calculations.",
    schemaSnippet: "`MarginAccountSnapshots (snapshot_id VARCHAR(32) PRIMARY KEY, account_id VARCHAR(24), risk_tier VARCHAR(16), leverage_ratio DECIMAL(6,2), net_equity_usd DECIMAL(14,2), snapshot_time TIMESTAMP)`",
    targetQuery: `SELECT snapshot_id,\n       account_id,\n       risk_tier,\n       leverage_ratio,\n       net_equity_usd,\n       snapshot_time\nFROM MarginAccountSnapshots\nQUALIFY PERCENT_RANK() OVER (PARTITION BY risk_tier ORDER BY leverage_ratio ASC) >= 0.95\n    AND net_equity_usd < LAG(net_equity_usd, 1) OVER (PARTITION BY account_id ORDER BY snapshot_time ASC)\nORDER BY risk_tier, leverage_ratio DESC;`,
    eli5Story: "Filter for margin accounts that sit in the dangerous top 5% of leverage in their tier, and at the same time verify that their cash balance dropped compared to their previous snapshot.",
    commonMistakes: "Attempting to filter both conditions in WHERE or mixing up the two distinct partition keys (risk_tier for percentile vs account_id for temporal lag).",
    learningOutcomes: "Synthesize compound analytical predicates across differing partition keys using a single unified QUALIFY clause."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Tenant License Seat Overage Isolation via Derived Table Filter",
    ind: "SaaS",
    diff: "Easy",
    table: "TenantSubscriptionUsage",
    scenario: "Customer billing pipelines identify customer tenants exceeding their provisioned user allocation by filtering for usage records where assigned seats exceed the subscription tier average.",
    businessObjective: "Filter rows against a window average using an inline derived table subquery.",
    schemaSnippet: "`TenantSubscriptionUsage (tenant_id VARCHAR(32) PRIMARY KEY, tier_name VARCHAR(20), allocated_seats INT, active_users INT)`",
    targetQuery: `SELECT sub.tenant_id,\n       sub.tier_name,\n       sub.active_users,\n       sub.tier_avg_users\nFROM (\n  SELECT tenant_id,\n         tier_name,\n         active_users,\n         ROUND(AVG(active_users) OVER (PARTITION BY tier_name), 1) AS tier_avg_users\n  FROM TenantSubscriptionUsage\n) sub\nWHERE sub.active_users > sub.tier_avg_users\nORDER BY sub.tier_name, sub.active_users DESC;`,
    eli5Story: "Calculate the average user count for each pricing plan inside a subquery, then use an outer WHERE to pick out only companies running above that average.",
    commonMistakes: "Attempting to write 'WHERE active_users > AVG(active_users) OVER (PARTITION BY tier_name)' in a single query level.",
    learningOutcomes: "Implement standard derived-table SQL wrappers for post-window relational filtering."
  },
  {
    title: "Microservice Endpoint p99 Latency Anomaly Filtering via QUALIFY",
    ind: "SaaS",
    diff: "Medium",
    table: "ServiceRequestLogs",
    scenario: "Site reliability engineers isolate outlier web requests by filtering for traces falling into the top 1% slowest requests for each API service.",
    businessObjective: "Use QUALIFY with CUME_DIST() to isolate microservice latency tail anomalies.",
    schemaSnippet: "`ServiceRequestLogs (trace_id VARCHAR(36) PRIMARY KEY, service VARCHAR(32), latency_ms INT, http_status INT, logged_at TIMESTAMP)`",
    targetQuery: `SELECT trace_id,\n       service,\n       latency_ms,\n       http_status,\n       logged_at\nFROM ServiceRequestLogs\nQUALIFY CUME_DIST() OVER (PARTITION BY service ORDER BY latency_ms ASC) >= 0.99\nORDER BY service, latency_ms DESC;`,
    eli5Story: "Ask the database to compute the cumulative percentage distribution of response times for each service, and instantly filter for requests in the top 1% tail.",
    commonMistakes: "Using PERCENT_RANK() instead of CUME_DIST() when looking for strict top 1% percentiles, or forgetting to sort ascending in the window clause.",
    learningOutcomes: "Apply CUME_DIST() inside QUALIFY for concise statistical tail anomaly detection."
  },
  {
    title: "Multi-Step Churn Risk Scoring Filter via Dual-Stage CTE Chain",
    ind: "SaaS",
    diff: "Hard",
    table: "ProductUsageEvents",
    scenario: "Retention algorithms identify churning accounts by calculating weekly login decline ratios and selecting organizations experiencing the sharpest continuous 3-week drops.",
    businessObjective: "Build a multi-tier CTE pipeline that computes temporal window deltas, ranks drop severity, and filters the top 10% highest-risk tenants per region.",
    schemaSnippet: "`ProductUsageEvents (org_id VARCHAR(32), region VARCHAR(16), calendar_week INT, weekly_logins INT)`",
    targetQuery: `WITH WeeklyDeltas AS (\n  SELECT org_id,\n         region,\n         calendar_week,\n         weekly_logins,\n         weekly_logins - LAG(weekly_logins, 1) OVER (PARTITION BY org_id ORDER BY calendar_week ASC) AS login_drop\n  FROM ProductUsageEvents\n),\nRankedDrops AS (\n  SELECT org_id,\n         region,\n         calendar_week,\n         weekly_logins,\n         login_drop,\n         DENSE_RANK() OVER (PARTITION BY region ORDER BY login_drop ASC) AS drop_severity_rank,\n         COUNT(*) OVER (PARTITION BY region) AS region_org_count\n  FROM WeeklyDeltas\n  WHERE login_drop IS NOT NULL\n)\nSELECT org_id,\n       region,\n       calendar_week,\n       weekly_logins,\n       login_drop,\n       drop_severity_rank\nFROM RankedDrops\nWHERE drop_severity_rank <= CEIL(region_org_count * 0.10)\nORDER BY region, drop_severity_rank ASC;`,
    eli5Story: "First calculate the drop in logins from last week. Then rank how bad that drop is across the whole region. Finally, grab the top 10% worst drops to send to customer retention reps.",
    commonMistakes: "Attempting to compute LAG and DENSE_RANK in the same window pass before LAG's output can be evaluated.",
    learningOutcomes: "Chain multiple sequential CTE stages to feed the output of one window function into the partition/order clause of another."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Store Top Selling SKU per Department via CTE Filter",
    ind: "Retail",
    diff: "Easy",
    table: "StoreDepartmentSales",
    scenario: "Inventory planners determine which single SKU generated the most revenue in each retail store department over the weekend.",
    businessObjective: "Wrap ROW_NUMBER() in a CTE to extract exactly the top 1 revenue SKU per department.",
    schemaSnippet: "`StoreDepartmentSales (store_id VARCHAR(16), department VARCHAR(32), sku VARCHAR(24), gross_revenue DECIMAL(10,2))`",
    targetQuery: `WITH RankedSkus AS (\n  SELECT store_id,\n         department,\n         sku,\n         gross_revenue,\n         ROW_NUMBER() OVER (PARTITION BY store_id, department ORDER BY gross_revenue DESC) AS sales_rank\n  FROM StoreDepartmentSales\n)\nSELECT store_id,\n       department,\n       sku,\n       gross_revenue\nFROM RankedSkus\nWHERE sales_rank = 1\nORDER BY store_id, department;`,
    eli5Story: "Rank every item in every department by its sales, seal that list in a temporary CTE table, and keep only the #1 champion item from each department.",
    commonMistakes: "Using MAX(gross_revenue) with GROUP BY, which loses the associated sku identifier.",
    learningOutcomes: "Solve the classic 'Top-N per Category with Associated Attributes' problem using CTE window wrapping."
  },
  {
    title: "Regional Flash-Sale Product Stockout Elimination via QUALIFY",
    ind: "Retail",
    diff: "Medium",
    table: "FlashSaleOrders",
    scenario: "E-commerce logistics engines assign limited warehouse stock by filtering for orders placed before the warehouse inventory allocation threshold was reached.",
    businessObjective: "Filter orders directly on cumulative running total using QUALIFY without subqueries.",
    schemaSnippet: "`FlashSaleOrders (order_id VARCHAR(32) PRIMARY KEY, warehouse_id VARCHAR(16), sku VARCHAR(24), order_qty INT, placed_at TIMESTAMP)`",
    targetQuery: `SELECT order_id,\n       warehouse_id,\n       sku,\n       order_qty,\n       placed_at,\n       SUM(order_qty) OVER (PARTITION BY warehouse_id, sku ORDER BY placed_at ASC) AS running_qty\nFROM FlashSaleOrders\nQUALIFY running_qty <= 500\nORDER BY warehouse_id, sku, placed_at ASC;`,
    eli5Story: "As orders rush in for a hot flash sale, keep a running total of units sold and use QUALIFY to automatically stop accepting orders the moment total sales hit 500 units.",
    commonMistakes: "Placing the running quantity filter in WHERE, which crashes because running sums are computed in Step 5 of query execution.",
    learningOutcomes: "Filter on running cumulative sums in Step 5 using QUALIFY to enforce real-time inventory allocation caps."
  },
  {
    title: "Omnichannel Return Rate Anomaly Pruning via Dual Window Filter",
    ind: "Retail",
    diff: "Hard",
    table: "ProductReturnsAudit",
    scenario: "Merchandising analysts audit return rates across apparel subcategories, filtering for products whose return rate is 2x the subcategory median AND whose total unit sales exceed 1,000 units.",
    businessObjective: "Compute subcategory median return rates, calculate return multiples, and filter outlier products in a resilient pipeline.",
    schemaSnippet: "`ProductReturnsAudit (product_id VARCHAR(24) PRIMARY KEY, subcategory VARCHAR(32), units_sold INT, units_returned INT)`",
    targetQuery: `WITH SubcatMetrics AS (\n  SELECT product_id,\n         subcategory,\n         units_sold,\n         units_returned,\n         ROUND((units_returned::DECIMAL / units_sold) * 100, 2) AS return_rate_pct,\n         ROUND(AVG((units_returned::DECIMAL / units_sold) * 100) OVER (PARTITION BY subcategory), 2) AS subcat_avg_return_rate\n  FROM ProductReturnsAudit\n  WHERE units_sold >= 1000\n)\nSELECT product_id,\n       subcategory,\n       units_sold,\n       units_returned,\n       return_rate_pct,\n       subcat_avg_return_rate,\n       ROUND(return_rate_pct / NULLIF(subcat_avg_return_rate, 0), 2) AS return_rate_multiple\nFROM SubcatMetrics\nWHERE return_rate_pct >= subcat_avg_return_rate * 2.0\nORDER BY subcategory, return_rate_multiple DESC;`,
    eli5Story: "First calculate the return percentage for high-volume items and find the department average. Then filter for bad products whose return rate is double the department norm.",
    commonMistakes: "Filtering units_sold >= 1000 in the outer query after calculating the subcategory average, which inadvertently poisons the subcategory average with low-volume noise.",
    learningOutcomes: "Sequence base WHERE filters before window aggregation to preserve baseline data integrity."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Emergency Room Triage Wait Time Outlier Extraction via CTE",
    ind: "Healthcare",
    diff: "Easy",
    table: "ErTriageAdmissions",
    scenario: "Hospital quality managers identify emergency room patients experiencing excessive wait times by filtering for patients whose wait exceeded the triage acuity level average.",
    businessObjective: "Wrap window average in a CTE and filter for patients whose wait time exceeded the benchmark.",
    schemaSnippet: "`ErTriageAdmissions (patient_id VARCHAR(32) PRIMARY KEY, acuity_score INT, wait_minutes INT, admitted_at TIMESTAMP)`",
    targetQuery: `WITH TriageWaits AS (\n  SELECT patient_id,\n         acuity_score,\n         wait_minutes,\n         admitted_at,\n         ROUND(AVG(wait_minutes) OVER (PARTITION BY acuity_score), 1) AS avg_acuity_wait\n  FROM ErTriageAdmissions\n)\nSELECT patient_id,\n       acuity_score,\n       wait_minutes,\n       avg_acuity_wait,\n       wait_minutes - avg_acuity_wait AS excess_wait_minutes\nFROM TriageWaits\nWHERE wait_minutes > avg_acuity_wait\nORDER BY acuity_score, excess_wait_minutes DESC;`,
    eli5Story: "Calculate the average ER wait time for each urgency score inside a CTE, then filter for every patient who had to wait longer than that average.",
    commonMistakes: "Trying to filter by excess_wait_minutes in the same SELECT statement without wrapping.",
    learningOutcomes: "Construct clean two-level CTE filters for clinical service SLA monitoring."
  },
  {
    title: "ICU Patient Vital Sign Sepsis Spike Isolation via QUALIFY",
    ind: "Healthcare",
    diff: "Medium",
    table: "IcuPatientVitals",
    scenario: "Intensive care monitoring systems detect impending septic shock by filtering for heart rate telemetry readings that exceed the patient's rolling 6-hour baseline by more than 25 beats per minute.",
    businessObjective: "Filter telemetry alerts directly on windowed baseline metrics using QUALIFY.",
    schemaSnippet: "`IcuPatientVitals (reading_id VARCHAR(36) PRIMARY KEY, patient_id VARCHAR(32), heart_rate_bpm INT, reading_time TIMESTAMP)`",
    targetQuery: `SELECT reading_id,\n       patient_id,\n       heart_rate_bpm,\n       reading_time,\n       ROUND(AVG(heart_rate_bpm) OVER (\n         PARTITION BY patient_id \n         ORDER BY reading_time \n         ROWS BETWEEN 360 PRECEDING AND CURRENT ROW\n       ), 1) AS rolling_baseline_hr\nFROM IcuPatientVitals\nQUALIFY heart_rate_bpm >= rolling_baseline_hr + 25\nORDER BY patient_id, reading_time DESC;`,
    eli5Story: "Compute each patient's average heart rate over the last 6 hours, and instantly sound an alarm if their current pulse jumps 25 beats above that personal average.",
    commonMistakes: "Using a global average across all patients instead of partitioning strictly by patient_id.",
    learningOutcomes: "Leverage QUALIFY with sliding window frames for real-time physiological anomaly detection."
  },
  {
    title: "Hospital Readmission Risk Stratification Pipeline with Stage Gates",
    ind: "Healthcare",
    diff: "Hard",
    table: "PatientDischargeAudits",
    scenario: "Medicare compliance analysts evaluate 30-day readmissions across chronic illness cohorts, selecting the top 5 highest-risk readmitted patients per hospital ward after filtering out elective observation stays.",
    businessObjective: "Construct a multi-stage CTE pipeline applying pre-window filters, computing diagnostic cohort risk ranks, and pruning to Top-5 cases per ward.",
    schemaSnippet: "`PatientDischargeAudits (audit_id VARCHAR(32) PRIMARY KEY, ward_id VARCHAR(16), primary_diagnosis VARCHAR(32), days_to_readmit INT, is_elective BOOLEAN)`",
    targetQuery: `WITH CleanDischarges AS (\n  SELECT audit_id,\n         ward_id,\n         primary_diagnosis,\n         days_to_readmit\n  FROM PatientDischargeAudits\n  WHERE is_elective = FALSE AND days_to_readmit <= 30\n),\nRankedReadmissions AS (\n  SELECT audit_id,\n         ward_id,\n         primary_diagnosis,\n         days_to_readmit,\n         ROW_NUMBER() OVER (PARTITION BY ward_id ORDER BY days_to_readmit ASC) AS readmit_urgency_rank,\n         COUNT(*) OVER (PARTITION BY ward_id) AS total_ward_readmissions\n  FROM CleanDischarges\n)\nSELECT audit_id,\n       ward_id,\n       primary_diagnosis,\n       days_to_readmit,\n       readmit_urgency_rank,\n       total_ward_readmissions\nFROM RankedReadmissions\nWHERE readmit_urgency_rank <= 5\nORDER BY ward_id, readmit_urgency_rank ASC;`,
    eli5Story: "First throw away elective visits. Then rank remaining patients by how quickly they bounced back to the hospital. Finally, take the 5 fastest readmissions per hospital floor.",
    commonMistakes: "Applying the readmission rank before filtering out elective stays, which wastes top rank slots on non-emergency cases.",
    learningOutcomes: "Sequence operational data scrubbing prior to analytical window ranking in compliance pipelines."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Last-Mile Delivery Driver Route Efficiency Pruning via CTE",
    ind: "Logistics",
    diff: "Easy",
    table: "DeliveryDriverShifts",
    scenario: "Fleet dispatchers identify underperforming delivery drivers by isolating shifts where stops-per-hour fell below the metropolitan delivery hub's average.",
    businessObjective: "Wrap window hub averages in a CTE and extract below-average driver performance shifts.",
    schemaSnippet: "`DeliveryDriverShifts (shift_id VARCHAR(32) PRIMARY KEY, hub_id VARCHAR(16), driver_id VARCHAR(16), stops_completed INT, shift_hours DECIMAL(4,2))`",
    targetQuery: `WITH DriverEfficiency AS (\n  SELECT shift_id,\n         hub_id,\n         driver_id,\n         ROUND(stops_completed / shift_hours, 1) AS stops_per_hour,\n         ROUND(AVG(stops_completed / shift_hours) OVER (PARTITION BY hub_id), 1) AS hub_avg_sph\n  FROM DeliveryDriverShifts\n)\nSELECT shift_id,\n       hub_id,\n       driver_id,\n       stops_per_hour,\n       hub_avg_sph,\n       ROUND(hub_avg_sph - stops_per_hour, 1) AS deficit_sph\nFROM DriverEfficiency\nWHERE stops_per_hour < hub_avg_sph\nORDER BY hub_id, deficit_sph DESC;`,
    eli5Story: "Figure out each driver's packages delivered per hour, find the average speed for that delivery station, and list every driver who fell behind pace.",
    commonMistakes: "Averaging stops_completed without dividing by shift_hours, skewing metrics between 4-hour and 8-hour shifts.",
    learningOutcomes: "Filter normalized rate metrics against window partition baselines using standard CTE patterns."
  },
  {
    title: "Cross-Dock Freight Manifest Bottleneck Selection via QUALIFY",
    ind: "Logistics",
    diff: "Medium",
    table: "PalletScanEvents",
    scenario: "Cross-dock warehouse supervisors identify delayed cargo pallets by filtering for pallets whose dwell time ranks in the top 3 longest in each transshipment bay.",
    businessObjective: "Filter for top 3 dwell times directly using QUALIFY with DENSE_RANK().",
    schemaSnippet: "`PalletScanEvents (pallet_id VARCHAR(32) PRIMARY KEY, bay_id VARCHAR(16), dwell_minutes INT, scanned_at TIMESTAMP)`",
    targetQuery: `SELECT pallet_id,\n       bay_id,\n       dwell_minutes,\n       scanned_at\nFROM PalletScanEvents\nQUALIFY DENSE_RANK() OVER (PARTITION BY bay_id ORDER BY dwell_minutes DESC) <= 3\nORDER BY bay_id, dwell_minutes DESC;`,
    eli5Story: "At a shipping depot, check how long each wooden pallet has been sitting on the floor, and show only the 3 longest-delayed pallets at each loading dock.",
    commonMistakes: "Using ROW_NUMBER() when ties exist, which arbitrarily excludes tied pallets that both need immediate dispatch.",
    learningOutcomes: "Apply QUALIFY with DENSE_RANK() to capture all tied high-priority logistics bottlenecks."
  },
  {
    title: "Intermodal Container Train Velocity Drop Alert Pipeline",
    ind: "Logistics",
    diff: "Hard",
    table: "TrainGpsTelemetry",
    scenario: "Rail operations centers monitor intermodal freight trains to detect sudden deceleration events indicating track blockages or locomotive engine faults.",
    businessObjective: "Calculate telemetry speed drops between consecutive pings, filter for drops > 15 mph, and rank the top 2 severe deceleration events per corridor.",
    schemaSnippet: "`TrainGpsTelemetry (ping_id VARCHAR(36) PRIMARY KEY, train_id VARCHAR(16), corridor_id VARCHAR(16), speed_mph DECIMAL(5,2), ping_time TIMESTAMP)`",
    targetQuery: `WITH SpeedDeltas AS (\n  SELECT ping_id,\n         train_id,\n         corridor_id,\n         speed_mph,\n         ping_time,\n         LAG(speed_mph, 1) OVER (PARTITION BY train_id ORDER BY ping_time ASC) - speed_mph AS speed_drop\n  FROM TrainGpsTelemetry\n),\nSevereDrops AS (\n  SELECT ping_id,\n         train_id,\n         corridor_id,\n         speed_mph,\n         ping_time,\n         speed_drop,\n         ROW_NUMBER() OVER (PARTITION BY corridor_id ORDER BY speed_drop DESC) AS severity_rank\n  FROM SpeedDeltas\n  WHERE speed_drop >= 15.0\n)\nSELECT ping_id,\n       train_id,\n       corridor_id,\n       speed_mph,\n       speed_drop,\n       ping_time\nFROM SevereDrops\nWHERE severity_rank <= 2\nORDER BY corridor_id, severity_rank ASC;`,
    eli5Story: "First measure how much each train slowed down compared to its previous GPS ping. Filter for sudden 15 mph drops. Then pick the 2 worst sudden slowdowns per railway track.",
    commonMistakes: "Partitioning by corridor_id when calculating LAG(speed_mph), which compares one train's speed against a different train's speed.",
    learningOutcomes: "Carefully align partition keys across chained window operations (train_id for lag vs corridor_id for severity ranking)."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Viral Video Trending Velocity Cutoff via CTE Rank Filter",
    ind: "Media",
    diff: "Easy",
    table: "VideoHourlyViews",
    scenario: "Content syndication platforms identify breaking viral clips by extracting the top 5 fastest-growing videos in each category during the last hour.",
    businessObjective: "Rank videos by hourly view count and filter for rank <= 5 in an outer query.",
    schemaSnippet: "`VideoHourlyViews (video_id VARCHAR(32) PRIMARY KEY, category VARCHAR(24), hourly_views INT, captured_hour TIMESTAMP)`",
    targetQuery: `WITH RankedVideos AS (\n  SELECT video_id,\n         category,\n         hourly_views,\n         ROW_NUMBER() OVER (PARTITION BY category ORDER BY hourly_views DESC) AS viral_rank\n  FROM VideoHourlyViews\n)\nSELECT video_id,\n       category,\n       hourly_views,\n       viral_rank\nFROM RankedVideos\nWHERE viral_rank <= 5\nORDER BY category, viral_rank;`,
    eli5Story: "Rank videos in each channel by how many views they got in the last hour, put that ranked list into a CTE, and pull out the top 5 for the homepage carousel.",
    commonMistakes: "Trying to filter viral_rank directly in the same SELECT statement.",
    learningOutcomes: "Structure CTE wrappers for consumer-facing Top-N trending feeds."
  },
  {
    title: "Ad Placement Fill Rate Underperformer Extraction via QUALIFY",
    ind: "Media",
    diff: "Medium",
    table: "AdInventorySlots",
    scenario: "Digital publisher ad operations identify ad slots that fail to monetize effectively by isolating inventory slots performing in the bottom 10% of fill rates.",
    businessObjective: "Isolate bottom decile fill rates directly using QUALIFY and PERCENT_RANK().",
    schemaSnippet: "`AdInventorySlots (slot_id VARCHAR(32) PRIMARY KEY, site_section VARCHAR(24), impressions_served INT, ad_requests INT)`",
    targetQuery: `SELECT slot_id,\n       site_section,\n       impressions_served,\n       ad_requests,\n       ROUND((impressions_served::DECIMAL / ad_requests) * 100, 2) AS fill_rate_pct\nFROM AdInventorySlots\nWHERE ad_requests >= 5000\nQUALIFY PERCENT_RANK() OVER (PARTITION BY site_section ORDER BY (impressions_served::DECIMAL / ad_requests) ASC) <= 0.10\nORDER BY site_section, fill_rate_pct ASC;`,
    eli5Story: "Calculate what percentage of ad requests were actually filled with a paying commercial, and instantly filter for the worst 10% performing ad spots on the website.",
    commonMistakes: "Forgetting the pre-filter 'WHERE ad_requests >= 5000', allowing brand-new slots with 2 requests to distort the decile ranks.",
    learningOutcomes: "Combine base WHERE volume thresholds with analytical QUALIFY decile filtering."
  },
  {
    title: "Multi-Episode Binge Viewing Retention Drop Pipeline",
    ind: "Media",
    diff: "Hard",
    table: "SeriesEpisodeCompletions",
    scenario: "Streaming studio analytics measure audience drop-off between Episode 1 and subsequent episodes, isolating series that lost more than 40% of their pilot audience by Episode 3.",
    businessObjective: "Anchor pilot viewership using FIRST_VALUE(), calculate completion ratios, and filter struggling shows in a structured pipeline.",
    schemaSnippet: "`SeriesEpisodeCompletions (series_id VARCHAR(32), episode_num INT, total_completers INT)`",
    targetQuery: `WITH SeriesAnchors AS (\n  SELECT series_id,\n         episode_num,\n         total_completers,\n         FIRST_VALUE(total_completers) OVER (\n           PARTITION BY series_id \n           ORDER BY episode_num ASC\n         ) AS pilot_completers\n  FROM SeriesEpisodeCompletions\n),\nDropoffRatios AS (\n  SELECT series_id,\n         episode_num,\n         total_completers,\n         pilot_completers,\n         ROUND((total_completers::DECIMAL / pilot_completers) * 100, 2) AS pilot_retention_pct\n  FROM SeriesAnchors\n  WHERE episode_num = 3\n)\nSELECT series_id,\n       pilot_completers,\n       total_completers AS ep3_completers,\n       pilot_retention_pct,\n       100.0 - pilot_retention_pct AS audience_loss_pct\nFROM DropoffRatios\nWHERE pilot_retention_pct < 60.0\nORDER BY audience_loss_pct DESC;`,
    eli5Story: "Anchor Episode 1 viewer count to every row using FIRST_VALUE. Then look at Episode 3 to see what percentage of pilot watchers stuck around, filtering for shows that crashed.",
    commonMistakes: "Filtering 'WHERE episode_num = 3' before the window function runs, which deletes Episode 1 from the working set and breaks FIRST_VALUE.",
    learningOutcomes: "Understand that window functions require the complete dataset before dimensional filtering can isolate specific milestones."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Brute Force Authentication Failure Threshold Alert via CTE",
    ind: "Security",
    diff: "Easy",
    table: "UserAuthAttempts",
    scenario: "Security Incident and Event Management (SIEM) systems detect password spray attacks by extracting IP addresses responsible for more than 5 failed logins within an account partition.",
    businessObjective: "Wrap window failure counts in a CTE and filter for high-risk IPs.",
    schemaSnippet: "`UserAuthAttempts (attempt_id VARCHAR(36) PRIMARY KEY, ip_address VARCHAR(45), username VARCHAR(64), status VARCHAR(8), attempt_time TIMESTAMP)`",
    targetQuery: `WITH FailedAttempts AS (\n  SELECT attempt_id,\n         ip_address,\n         username,\n         attempt_time,\n         COUNT(*) OVER (PARTITION BY ip_address, username) AS total_failures\n  FROM UserAuthAttempts\n  WHERE status = 'FAILED'\n)\nSELECT DISTINCT ip_address,\n       username,\n       total_failures\nFROM FailedAttempts\nWHERE total_failures >= 5\nORDER BY total_failures DESC;`,
    eli5Story: "Filter for failed password attempts, count how many times an IP attacked that username using a window function, and filter for hackers with 5 or more failures.",
    commonMistakes: "Writing GROUP BY when individual attempt timestamps are required for digital forensics and firewall blocking rules.",
    learningOutcomes: "Deploy CTE window counters to maintain evidence records while isolating repeat threat actors."
  },
  {
    title: "Privileged API Token Overuse Detection via QUALIFY",
    ind: "Security",
    diff: "Medium",
    table: "ApiTokenUsages",
    scenario: "Cloud security posture tools identify compromised API service tokens by filtering for tokens whose hourly call rate exceeds 3x the average call rate across its permission scope.",
    businessObjective: "Use QUALIFY to filter API tokens exceeding scope average multipliers.",
    schemaSnippet: "`ApiTokenUsages (token_id VARCHAR(32) PRIMARY KEY, permission_scope VARCHAR(24), calls_last_hour INT)`",
    targetQuery: `SELECT token_id,\n       permission_scope,\n       calls_last_hour,\n       ROUND(AVG(calls_last_hour) OVER (PARTITION BY permission_scope), 0) AS scope_avg_calls\nFROM ApiTokenUsages\nQUALIFY calls_last_hour >= 3 * AVG(calls_last_hour) OVER (PARTITION BY permission_scope)\nORDER BY permission_scope, calls_last_hour DESC;`,
    eli5Story: "Check how many API requests each developer key made this hour, and use QUALIFY to instantly catch tokens making triple the average requests for their access tier.",
    commonMistakes: "Repeating the full subquery calculation in WHERE, bloating code complexity compared to QUALIFY.",
    learningOutcomes: "Streamline security anomaly detection thresholds using in-flight window QUALIFY comparisons."
  },
  {
    title: "Zero-Day Lateral Movement Beaconing Chain Filter Pipeline",
    ind: "Security",
    diff: "Hard",
    table: "HostNetworkBeacons",
    scenario: "Threat hunters discover malware command-and-control beaconing by detecting periodic outbound connections with near-zero inter-arrival time jitter.",
    businessObjective: "Compute inter-packet time deltas, measure standard deviation of connection intervals, and filter hosts with strict periodic beaconing.",
    schemaSnippet: "`HostNetworkBeacons (beacon_id VARCHAR(36) PRIMARY KEY, host_id VARCHAR(32), dest_ip VARCHAR(45), connect_time TIMESTAMP)`",
    targetQuery: `WITH PacketIntervals AS (\n  SELECT beacon_id,\n         host_id,\n         dest_ip,\n         connect_time,\n         EXTRACT(EPOCH FROM (connect_time - LAG(connect_time) OVER (\n           PARTITION BY host_id, dest_ip \n           ORDER BY connect_time ASC\n         ))) AS interval_seconds\n  FROM HostNetworkBeacons\n),\nHostJitterMetrics AS (\n  SELECT host_id,\n         dest_ip,\n         COUNT(*) AS ping_count,\n         ROUND(AVG(interval_seconds), 2) AS mean_interval_sec,\n         ROUND(COALESCE(STDDEV(interval_seconds), 0), 3) AS interval_jitter_stddev\n  FROM PacketIntervals\n  WHERE interval_seconds IS NOT NULL\n  GROUP BY host_id, dest_ip\n  HAVING COUNT(*) >= 20\n)\nSELECT host_id,\n       dest_ip,\n       ping_count,\n       mean_interval_sec,\n       interval_jitter_stddev\nFROM HostJitterMetrics\nWHERE interval_jitter_stddev < 1.0\nORDER BY ping_count DESC;`,
    eli5Story: "Find the time gap between outbound connections using LAG. If a laptop connects to an overseas IP every 60 seconds with almost zero jitter (standard deviation < 1 sec), flag the malware beacon.",
    commonMistakes: "Attempting to compute standard deviation of intervals before using LAG to calculate the intervals themselves.",
    learningOutcomes: "Sequence window time-delta calculations into secondary aggregate grouping for behavioral threat hunting."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Factory Assembly Line Robot Cycle Bottleneck via CTE",
    ind: "Hardware",
    diff: "Easy",
    table: "RobotArmCycles",
    scenario: "Industrial automation engineers isolate slow manufacturing robots by filtering for robot arms whose cycle execution duration is the slowest on their assembly station.",
    businessObjective: "Filter for rank = 1 slowest robot arm per station using a CTE wrapper.",
    schemaSnippet: "`RobotArmCycles (robot_id VARCHAR(16) PRIMARY KEY, station_id VARCHAR(16), cycle_time_sec DECIMAL(5,2))`",
    targetQuery: `WITH RankedRobots AS (\n  SELECT robot_id,\n         station_id,\n         cycle_time_sec,\n         ROW_NUMBER() OVER (PARTITION BY station_id ORDER BY cycle_time_sec DESC) AS slowest_rank\n  FROM RobotArmCycles\n)\nSELECT robot_id,\n       station_id,\n       cycle_time_sec\nFROM RankedRobots\nWHERE slowest_rank = 1\nORDER BY station_id;`,
    eli5Story: "Rank every robotic arm on each assembly station by how long it takes to tighten a bolt, and pull out the single slowest robot from each station.",
    commonMistakes: "Using MAX(cycle_time_sec) with GROUP BY and losing the robot_id serial number.",
    learningOutcomes: "Extract worst-case operational hardware identifiers using standard CTE window ranking."
  },
  {
    title: "Server Power Supply Rail Voltage Fluctuation via QUALIFY",
    ind: "Hardware",
    diff: "Medium",
    table: "ServerPowerTelemetry",
    scenario: "Data center hardware engineers monitor server PSU 12V rails to detect failing power capacitors before motherboard damage occurs.",
    businessObjective: "Filter telemetry records directly for voltage readings deviating by > 0.5V from the rack average using QUALIFY.",
    schemaSnippet: "`ServerPowerTelemetry (sensor_id VARCHAR(32) PRIMARY KEY, rack_id VARCHAR(16), rail_voltage DECIMAL(4,2), logged_at TIMESTAMP)`",
    targetQuery: `SELECT sensor_id,\n       rack_id,\n       rail_voltage,\n       logged_at,\n       ROUND(AVG(rail_voltage) OVER (PARTITION BY rack_id), 2) AS rack_mean_voltage\nFROM ServerPowerTelemetry\nQUALIFY ABS(rail_voltage - AVG(rail_voltage) OVER (PARTITION BY rack_id)) >= 0.50\nORDER BY rack_id, logged_at DESC;`,
    eli5Story: "Compute the average electrical voltage across all servers in a rack, and instantly catch any server whose voltage swings more than half a volt away from the group.",
    commonMistakes: "Forgetting the ABS() function, only catching positive voltage spikes while missing dangerous undervoltage drops.",
    learningOutcomes: "Utilize mathematical ABS() expressions inside window QUALIFY clauses for two-tailed anomaly filtering."
  },
  {
    title: "Lithium-Ion Battery Thermal Runaway Detection Pipeline",
    ind: "Hardware",
    diff: "Hard",
    table: "BatteryThermalTelemetry",
    scenario: "Electric vehicle powertrain engineers detect thermal runaway risks by calculating the temperature rise rate across battery modules and selecting modules with accelerating heating curves.",
    businessObjective: "Compute rate of thermal rise (°C/sec) using LAG, calculate acceleration (second derivative), and filter high-risk thermal packs.",
    schemaSnippet: "`BatteryThermalTelemetry (ping_id VARCHAR(36) PRIMARY KEY, pack_id VARCHAR(24), module_id VARCHAR(16), temp_c DECIMAL(5,2), ping_time TIMESTAMP)`",
    targetQuery: `WITH ThermalVelocity AS (\n  SELECT pack_id,\n         module_id,\n         temp_c,\n         ping_time,\n         ROUND((temp_c - LAG(temp_c, 1) OVER (\n           PARTITION BY pack_id, module_id \n           ORDER BY ping_time ASC\n         )) / NULLIF(EXTRACT(EPOCH FROM (ping_time - LAG(ping_time, 1) OVER (\n           PARTITION BY pack_id, module_id \n           ORDER BY ping_time ASC\n         ))), 0), 4) AS temp_rise_rate_c_per_sec\n  FROM BatteryThermalTelemetry\n),\nRankedRunawayModules AS (\n  SELECT pack_id,\n         module_id,\n         temp_c,\n         temp_rise_rate_c_per_sec,\n         ping_time,\n         ROW_NUMBER() OVER (PARTITION BY pack_id ORDER BY temp_rise_rate_c_per_sec DESC) AS runaway_rank\n  FROM ThermalVelocity\n  WHERE temp_rise_rate_c_per_sec IS NOT NULL\n)\nSELECT pack_id,\n       module_id,\n       temp_c,\n       temp_rise_rate_c_per_sec,\n       ping_time\nFROM RankedRunawayModules\nWHERE runaway_rank = 1 AND temp_rise_rate_c_per_sec > 0.05\nORDER BY temp_rise_rate_c_per_sec DESC;`,
    eli5Story: "Calculate how many degrees per second a battery is heating up. Find the fastest heating module in each battery pack and sound the emergency cooling alarm if it exceeds 0.05°C/sec.",
    commonMistakes: "Failing to divide temperature delta by time delta, incorrectly assuming pings arrive at perfectly identical 1-second intervals.",
    learningOutcomes: "Build physical first-derivative calculations in SQL combining multi-variable LAG() windows with hierarchical ranking."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Sales Representative Commission Tier Top-Performer Filter via CTE",
    ind: "HR",
    diff: "Easy",
    table: "SalesRepsQuarterly",
    scenario: "Sales operations teams identify high-performing account executives by selecting representatives whose quarterly bookings rank in the top 2 of their regional sales pod.",
    businessObjective: "Rank sales reps by closed bookings and extract top 2 per pod using a CTE.",
    schemaSnippet: "`SalesRepsQuarterly (rep_id VARCHAR(16) PRIMARY KEY, pod_id VARCHAR(16), closed_bookings_usd DECIMAL(12,2))`",
    targetQuery: `WITH PodRankings AS (\n  SELECT rep_id,\n         pod_id,\n         closed_bookings_usd,\n         DENSE_RANK() OVER (PARTITION BY pod_id ORDER BY closed_bookings_usd DESC) AS pod_rank\n  FROM SalesRepsQuarterly\n)\nSELECT rep_id,\n       pod_id,\n       closed_bookings_usd,\n       pod_rank\nFROM PodRankings\nWHERE pod_rank <= 2\nORDER BY pod_id, pod_rank;`,
    eli5Story: "Rank salespeople inside each team by how much revenue they brought in, and pick the gold and silver winners from each pod.",
    commonMistakes: "Using ROW_NUMBER() when two reps tied for second place, unfairly excluding one rep from commission bonuses.",
    learningOutcomes: "Apply DENSE_RANK() in CTE wrappers to honor tied achievements."
  },
  {
    title: "Employee Pay Inequity Disparity Pruning via QUALIFY",
    ind: "HR",
    diff: "Medium",
    table: "StaffCompensationRecords",
    scenario: "People analytics teams audit corporate compensation to detect employees earning less than 80% of the median salary for their specific job level and geographic zone.",
    businessObjective: "Filter employees earning below 80% of level-zone average using QUALIFY.",
    schemaSnippet: "`StaffCompensationRecords (emp_id VARCHAR(16) PRIMARY KEY, job_level VARCHAR(8), geo_zone VARCHAR(16), base_salary_usd DECIMAL(10,2))`",
    targetQuery: `SELECT emp_id,\n       job_level,\n       geo_zone,\n       base_salary_usd,\n       ROUND(AVG(base_salary_usd) OVER (PARTITION BY job_level, geo_zone), 2) AS benchmark_salary\nFROM StaffCompensationRecords\nQUALIFY base_salary_usd < 0.80 * AVG(base_salary_usd) OVER (PARTITION BY job_level, geo_zone)\nORDER BY job_level, geo_zone, base_salary_usd ASC;`,
    eli5Story: "Look at what each employee makes, calculate the average salary for people with that exact job grade and city, and immediately flag anyone paid less than 80% of that benchmark.",
    commonMistakes: "Writing out multiple nested subqueries instead of a clean QUALIFY predicate.",
    learningOutcomes: "Identify compensation anomalies using inline window comparative filtering."
  },
  {
    title: "Managerial Span of Control & Attrition Anomaly Pipeline",
    ind: "HR",
    diff: "Hard",
    table: "ManagerTeamMetrics",
    scenario: "HR executive leadership analyzes managerial effectiveness by identifying managers whose direct report resignation rate is in the top 5% company-wide, after filtering for managers with at least 5 direct reports.",
    businessObjective: "Compute resignation percentages, calculate company-wide percentile ranks, and filter outlier managers in a multi-stage CTE.",
    schemaSnippet: "`ManagerTeamMetrics (manager_id VARCHAR(16) PRIMARY KEY, department VARCHAR(32), direct_reports INT, annual_resignations INT)`",
    targetQuery: `WITH ManagerTurnover AS (\n  SELECT manager_id,\n         department,\n         direct_reports,\n         annual_resignations,\n         ROUND((annual_resignations::DECIMAL / direct_reports) * 100, 2) AS resignation_rate_pct\n  FROM ManagerTeamMetrics\n  WHERE direct_reports >= 5\n),\nTurnoverPercentiles AS (\n  SELECT manager_id,\n         department,\n         direct_reports,\n         annual_resignations,\n         resignation_rate_pct,\n         PERCENT_RANK() OVER (ORDER BY resignation_rate_pct ASC) AS turnover_percentile\n  FROM ManagerTurnover\n)\nSELECT manager_id,\n       department,\n       direct_reports,\n       annual_resignations,\n       resignation_rate_pct,\n       ROUND(turnover_percentile * 100, 1) AS percentile_score\nFROM TurnoverPercentiles\nWHERE turnover_percentile >= 0.95\nORDER BY resignation_rate_pct DESC;`,
    eli5Story: "First filter for managers who lead real teams (at least 5 people). Calculate their team's turnover rate. Then rank everyone into percentiles and find the top 5% worst managers.",
    commonMistakes: "Computing percentiles without the WHERE direct_reports >= 5 filter, which causes a manager with 1 report who quit (100% turnover) to skew the entire company distribution.",
    learningOutcomes: "Construct gated statistical pipelines filtering sample size prior to percentile window ranking."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Cloud Database Connection Pool Saturation Alert via CTE",
    ind: "Platforms",
    diff: "Easy",
    table: "DbConnectionPools",
    scenario: "Database reliability engineers monitor connection pool saturation across microservices, identifying pods utilizing more than their service cluster's average connection count.",
    businessObjective: "Extract connection pool records exceeding cluster average using a CTE wrapper.",
    schemaSnippet: "`DbConnectionPools (pod_id VARCHAR(32) PRIMARY KEY, cluster_name VARCHAR(24), active_connections INT)`",
    targetQuery: `WITH PoolMetrics AS (\n  SELECT pod_id,\n         cluster_name,\n         active_connections,\n         ROUND(AVG(active_connections) OVER (PARTITION BY cluster_name), 0) AS cluster_avg_conns\n  FROM DbConnectionPools\n)\nSELECT pod_id,\n       cluster_name,\n       active_connections,\n       cluster_avg_conns,\n       active_connections - cluster_avg_conns AS excess_conns\nFROM PoolMetrics\nWHERE active_connections > cluster_avg_conns\nORDER BY cluster_name, excess_conns DESC;`,
    eli5Story: "Find out how many database connections each application pod is hogging, calculate the average for that server group, and list all pods running above average.",
    commonMistakes: "Referencing cluster_avg_conns in the WHERE clause of the inner query before it has been generated.",
    learningOutcomes: "Execute derived CTE projections to filter against windowed capacity metrics."
  },
  {
    title: "Kubernetes Node Ephemeral Disk Starvation via QUALIFY",
    ind: "Platforms",
    diff: "Medium",
    table: "K8sNodeDiskUsage",
    scenario: "Infrastructure platforms detect Kubernetes worker nodes nearing eviction thresholds by filtering for nodes where ephemeral disk consumption ranks in the top 2 highest per availability zone.",
    businessObjective: "Filter for top 2 highest disk consuming nodes per zone directly via QUALIFY.",
    schemaSnippet: "`K8sNodeDiskUsage (node_id VARCHAR(32) PRIMARY KEY, az VARCHAR(16), used_disk_pct DECIMAL(4,1), recorded_at TIMESTAMP)`",
    targetQuery: `SELECT node_id,\n       az,\n       used_disk_pct,\n       recorded_at\nFROM K8sNodeDiskUsage\nQUALIFY ROW_NUMBER() OVER (PARTITION BY az ORDER BY used_disk_pct DESC) <= 2\nORDER BY az, used_disk_pct DESC;`,
    eli5Story: "Look at all servers in each cloud zone, sort them by how full their hard drive is, and use QUALIFY to instantly grab the 2 fullest servers in each zone.",
    commonMistakes: "Omitting QUALIFY and attempting to use WHERE with ROW_NUMBER() directly.",
    learningOutcomes: "Deploy QUALIFY to eliminate nested subquery boilerplate in platform cluster monitoring."
  },
  {
    title: "Distributed Lock Contention & Deadlock Preemption Pipeline",
    ind: "Platforms",
    diff: "Hard",
    table: "DistributedLockEvents",
    scenario: "Distributed systems architects isolate lock starvation incidents by detecting transactions waiting on distributed locks whose acquisition wait time is 5x the resource average and ranks in the top 10 longest delays.",
    businessObjective: "Compute resource wait averages, calculate wait time multiples, and filter critical lock bottlenecks in a multi-stage pipeline.",
    schemaSnippet: "`DistributedLockEvents (event_id VARCHAR(36) PRIMARY KEY, resource_key VARCHAR(64), tx_id VARCHAR(32), wait_time_ms INT, acquired_at TIMESTAMP)`",
    targetQuery: `WITH ResourceAverages AS (\n  SELECT event_id,\n         resource_key,\n         tx_id,\n         wait_time_ms,\n         acquired_at,\n         ROUND(AVG(wait_time_ms) OVER (PARTITION BY resource_key), 2) AS resource_avg_wait_ms\n  FROM DistributedLockEvents\n),\nBottleneckEvents AS (\n  SELECT event_id,\n         resource_key,\n         tx_id,\n         wait_time_ms,\n         resource_avg_wait_ms,\n         ROUND(wait_time_ms / NULLIF(resource_avg_wait_ms, 0), 2) AS wait_multiple,\n         ROW_NUMBER() OVER (PARTITION BY resource_key ORDER BY wait_time_ms DESC) AS lock_delay_rank\n  FROM ResourceAverages\n  WHERE wait_time_ms >= resource_avg_wait_ms * 5.0\n)\nSELECT event_id,\n       resource_key,\n       tx_id,\n       wait_time_ms,\n       resource_avg_wait_ms,\n       wait_multiple\nFROM BottleneckEvents\nWHERE lock_delay_rank <= 10\nORDER BY wait_multiple DESC;`,
    eli5Story: "Calculate how long queries normally wait for a lock on a table. Filter for queries that waited 5 times longer than average. Then pull out the 10 worst delays.",
    commonMistakes: "Trying to filter by wait_multiple in the first CTE where it has not been projected yet.",
    learningOutcomes: "Sequence successive analytical aggregations into distinct CTE layers for high-reliability systems auditing."
  }
];
