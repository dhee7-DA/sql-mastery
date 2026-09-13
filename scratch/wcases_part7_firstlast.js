// =============================================================================
// SECTION 9 - PART 7: FIRST_VALUE(), LAST_VALUE() & NTH_VALUE() COHORT ANCHORS (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: Cohort Anchoring, Frame Physics (ROWS BETWEEN ...), Default Frame Trap, NTH_VALUE
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Checking Account Opening Initial Deposit Anchor Balance",
    ind: "Fintech",
    diff: "Easy",
    table: "BankAccountLedger",
    scenario: "Retail bank customer insights teams evaluate long-term deposit growth by comparing every ledger transaction against the customer's initial account opening deposit amount.",
    businessObjective: "Anchor the customer's initial opening deposit to every transaction row using FIRST_VALUE().",
    schemaSnippet: "`BankAccountLedger (tx_id VARCHAR(32) PRIMARY KEY, account_id VARCHAR(24), tx_date DATE, balance_usd DECIMAL(12,2))`",
    targetQuery: `SELECT account_id,\n       tx_date,\n       balance_usd,\n       FIRST_VALUE(balance_usd) OVER (\n         PARTITION BY account_id \n         ORDER BY tx_date ASC, tx_id ASC\n       ) AS initial_opening_deposit_usd,\n       ROUND(balance_usd - FIRST_VALUE(balance_usd) OVER (\n         PARTITION BY account_id \n         ORDER BY tx_date ASC, tx_id ASC\n       ), 2) AS net_growth_since_opening\nFROM BankAccountLedger\nORDER BY account_id, tx_date ASC;`,
    eli5Story: "Stamp the very first dollar amount a customer ever put into their bank account on every single bank statement row, so they see how much their wealth has grown since day one.",
    commonMistakes: "Using LAST_VALUE with ORDER BY DESC instead of FIRST_VALUE with ORDER BY ASC, introducing frame boundary confusion.",
    learningOutcomes: "Use FIRST_VALUE() to anchor cohort origin values across transaction streams."
  },
  {
    title: "Stock Market Trading Day Opening vs Closing Price Spread",
    ind: "Fintech",
    diff: "Medium",
    table: "IntradayStockBars",
    scenario: "Algorithmic market making desks calculate intraday equity price trajectories by comparing every 1-minute candle price against both the market opening price and the end-of-day closing price.",
    businessObjective: "Anchor opening price with FIRST_VALUE() and closing price with LAST_VALUE() using explicit unbounded following frame clauses.",
    schemaSnippet: "`IntradayStockBars (symbol VARCHAR(12), bar_time TIMESTAMP, close_price DECIMAL(10,4))`",
    targetQuery: `SELECT symbol,\n       bar_time,\n       close_price,\n       FIRST_VALUE(close_price) OVER (\n         PARTITION BY symbol \n         ORDER BY bar_time ASC\n       ) AS market_open_price,\n       LAST_VALUE(close_price) OVER (\n         PARTITION BY symbol \n         ORDER BY bar_time ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS market_close_price\nFROM IntradayStockBars\nORDER BY symbol, bar_time ASC;`,
    eli5Story: "Show the opening price at 9:30 AM on every row. To show the 4:00 PM closing price on every row, you MUST tell the database to look all the way to the end of the day (UNBOUNDED FOLLOWING), or LAST_VALUE just returns the current row.",
    commonMistakes: "Falling into the 'LAST_VALUE Default Frame Trap': forgetting 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING', which causes LAST_VALUE to only look as far as the current row.",
    learningOutcomes: "Master the mandatory frame expansion required to make LAST_VALUE() evaluate the true partition terminus."
  },
  {
    title: "Venture Capital Multi-Round Cap Table Initial Valuation Anchor & Nth Round Multiple",
    ind: "Fintech",
    diff: "Hard",
    table: "StartupFundingRounds",
    scenario: "Private equity fund performance analysts calculate enterprise value step-ups by comparing each startup's Series C valuation against both its Seed round valuation (FIRST_VALUE) and Series B valuation (NTH_VALUE).",
    businessObjective: "Anchor Seed valuation with FIRST_VALUE(), Series B valuation with NTH_VALUE(2), and calculate multi-stage valuation multiples.",
    schemaSnippet: "`StartupFundingRounds (startup_id VARCHAR(24), round_name VARCHAR(16), round_order INT, post_money_valuation_m DECIMAL(10,2))`",
    targetQuery: `SELECT startup_id,\n       round_name,\n       round_order,\n       post_money_valuation_m,\n       FIRST_VALUE(post_money_valuation_m) OVER (\n         PARTITION BY startup_id \n         ORDER BY round_order ASC\n       ) AS seed_valuation_m,\n       NTH_VALUE(post_money_valuation_m, 2) OVER (\n         PARTITION BY startup_id \n         ORDER BY round_order ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS series_b_valuation_m,\n       ROUND(post_money_valuation_m / FIRST_VALUE(post_money_valuation_m) OVER (\n         PARTITION BY startup_id \n         ORDER BY round_order ASC\n       ), 2) AS seed_step_up_multiple\nFROM StartupFundingRounds\nORDER BY startup_id, round_order ASC;`,
    eli5Story: "For a fast-growing startup, look at its latest funding valuation. Compare it to its very first Seed valuation (FIRST_VALUE) and its exact 2nd round valuation (NTH_VALUE) to calculate investor profits.",
    commonMistakes: "Omitting the UNBOUNDED FOLLOWING frame on NTH_VALUE(2), causing it to return NULL on round 1.",
    learningOutcomes: "Deploy NTH_VALUE() with explicit unbounded frames to extract intermediate milestone anchors."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Customer Onboarding Initial Sign-Up Plan Tier Baseline",
    ind: "SaaS",
    diff: "Easy",
    table: "CustomerAccountPlanAudits",
    scenario: "Customer lifecycle teams analyze self-serve upgrade velocity by displaying each customer's original sign-up plan tier alongside their current active subscription plan.",
    businessObjective: "Anchor the initial onboarding plan tier using FIRST_VALUE().",
    schemaSnippet: "`CustomerAccountPlanAudits (account_id VARCHAR(24), change_date DATE, plan_tier VARCHAR(16))`",
    targetQuery: `SELECT account_id,\n       change_date,\n       plan_tier AS active_plan,\n       FIRST_VALUE(plan_tier) OVER (\n         PARTITION BY account_id \n         ORDER BY change_date ASC\n       ) AS original_signup_plan\nFROM CustomerAccountPlanAudits\nORDER BY account_id, change_date ASC;`,
    eli5Story: "Display the subscription plan a customer has today, and stamp the original free plan they signed up for 3 years ago right on the same row.",
    commonMistakes: "Ordering DESC, which would mistakenly select the newest plan as the 'first' value.",
    learningOutcomes: "Anchor categorical baseline attributes across customer lifecycle histories using FIRST_VALUE()."
  },
  {
    title: "SaaS Subscription Lifetime Revenue Expansion vs Final Renewed ARR",
    ind: "SaaS",
    diff: "Medium",
    table: "SubscriptionContractRenewals",
    scenario: "RevOps analysts calculate net revenue retention across multi-year enterprise contracts by comparing intermediate annual contract values against the final renewed ARR.",
    businessObjective: "Retrieve initial ARR using FIRST_VALUE() and final contract ARR using LAST_VALUE() with explicit unbounded frames.",
    schemaSnippet: "`SubscriptionContractRenewals (tenant_id VARCHAR(32), year_number INT, contract_arr_usd DECIMAL(10,2))`",
    targetQuery: `SELECT tenant_id,\n       year_number,\n       contract_arr_usd,\n       FIRST_VALUE(contract_arr_usd) OVER (\n         PARTITION BY tenant_id \n         ORDER BY year_number ASC\n       ) AS initial_year1_arr,\n       LAST_VALUE(contract_arr_usd) OVER (\n         PARTITION BY tenant_id \n         ORDER BY year_number ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_term_arr,\n       ROUND((LAST_VALUE(contract_arr_usd) OVER (\n         PARTITION BY tenant_id \n         ORDER BY year_number ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) / NULLIF(FIRST_VALUE(contract_arr_usd) OVER (\n         PARTITION BY tenant_id \n         ORDER BY year_number ASC\n       ), 0)) * 100, 1) AS lifetime_expansion_pct\nFROM SubscriptionContractRenewals\nORDER BY tenant_id, year_number ASC;`,
    eli5Story: "Show Year 1 subscription money (FIRST_VALUE) and show final Year 5 subscription money (LAST_VALUE with unbounded following) to calculate how much the account expanded.",
    commonMistakes: "Omitting the UNBOUNDED FOLLOWING frame on LAST_VALUE, which causes final_term_arr to equal contract_arr_usd on every row.",
    learningOutcomes: "Contrast initial and terminal values across longitudinal customer account lifecycles."
  },
  {
    title: "Product Feature Adoption Onboarding Milestone Progression Anchors",
    ind: "SaaS",
    diff: "Hard",
    table: "UserProductMilestones",
    scenario: "Product analytics teams evaluate user activation friction by calculating the time elapsed between initial account creation (Milestone 1), third feature activation (Milestone 3), and final account verification.",
    businessObjective: "Extract milestone 1 timestamp with FIRST_VALUE(), milestone 3 timestamp with NTH_VALUE(3), and final milestone with LAST_VALUE().",
    schemaSnippet: "`UserProductMilestones (user_id VARCHAR(24), milestone_step INT, milestone_name VARCHAR(32), achieved_at TIMESTAMP)`",
    targetQuery: `SELECT user_id,\n       milestone_step,\n       milestone_name,\n       achieved_at,\n       FIRST_VALUE(achieved_at) OVER (\n         PARTITION BY user_id \n         ORDER BY milestone_step ASC\n       ) AS signup_time,\n       NTH_VALUE(achieved_at, 3) OVER (\n         PARTITION BY user_id \n         ORDER BY milestone_step ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS milestone_3_time,\n       LAST_VALUE(achieved_at) OVER (\n         PARTITION BY user_id \n         ORDER BY milestone_step ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_activation_time,\n       ROUND(EXTRACT(EPOCH FROM (\n         NTH_VALUE(achieved_at, 3) OVER (\n           PARTITION BY user_id \n           ORDER BY milestone_step ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n         ) - FIRST_VALUE(achieved_at) OVER (\n           PARTITION BY user_id \n           ORDER BY milestone_step ASC\n         )\n       )) / 3600, 2) AS hours_to_milestone_3\nFROM UserProductMilestones\nORDER BY user_id, milestone_step ASC;`,
    eli5Story: "Find the time a user signed up (first), the time they unlocked their 3rd feature (NTH_VALUE 3), and the time they completed full setup (last). Subtract to find hours to activation.",
    commonMistakes: "Trying to call NTH_VALUE without an explicit unbounded frame, causing it to return NULL until row 3 is reached.",
    learningOutcomes: "Extract discrete milestone anchors across user onboarding funnels using NTH_VALUE."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Retail Product SKU Historical Launch Price Benchmark Anchor",
    ind: "Retail",
    diff: "Easy",
    table: "ProductPriceAuditLog",
    scenario: "Merchandising pricing committees audit long-term brand equity by comparing current retail prices against the SKU's initial launch introduction price.",
    businessObjective: "Anchor initial launch price using FIRST_VALUE().",
    schemaSnippet: "`ProductPriceAuditLog (sku VARCHAR(24), price_date DATE, price_usd DECIMAL(8,2))`",
    targetQuery: `SELECT sku,\n       price_date,\n       price_usd,\n       FIRST_VALUE(price_usd) OVER (\n         PARTITION BY sku \n         ORDER BY price_date ASC\n       ) AS original_launch_price_usd,\n       ROUND(price_usd - FIRST_VALUE(price_usd) OVER (\n         PARTITION BY sku \n         ORDER BY price_date ASC\n       ), 2) AS price_inflation_usd\nFROM ProductPriceAuditLog\nORDER BY sku, price_date ASC;`,
    eli5Story: "Show what an iPhone costs today, and print the original launch day price on every row with FIRST_VALUE so customers see total inflation.",
    commonMistakes: "Ordering DESC, which would grab the current price as the 'launch' price.",
    learningOutcomes: "Establish historical price baselines using chronological FIRST_VALUE() windows."
  },
  {
    title: "Seasonal Clearance Markdown Trajectory vs Final Liquidation Price",
    ind: "Retail",
    diff: "Medium",
    table: "SeasonalApparelMarkdowns",
    scenario: "Inventory clearance managers track markdown discount velocity by comparing weekly promotional prices against the item's final salvage liquidation price.",
    businessObjective: "Anchor initial MSRP with FIRST_VALUE() and final liquidation price with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`SeasonalApparelMarkdowns (sku VARCHAR(24), markdown_week INT, promotional_price DECIMAL(8,2))`",
    targetQuery: `SELECT sku,\n       markdown_week,\n       promotional_price,\n       FIRST_VALUE(promotional_price) OVER (\n         PARTITION BY sku \n         ORDER BY markdown_week ASC\n       ) AS full_retail_msrp,\n       LAST_VALUE(promotional_price) OVER (\n         PARTITION BY sku \n         ORDER BY markdown_week ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_clearance_price,\n       ROUND((1.0 - (promotional_price / FIRST_VALUE(promotional_price) OVER (\n         PARTITION BY sku \n         ORDER BY markdown_week ASC\n       ))) * 100, 1) AS current_markdown_discount_pct\nFROM SeasonalApparelMarkdowns\nORDER BY sku, markdown_week ASC;`,
    eli5Story: "Look at winter coats being marked down: print the original sticker price (FIRST_VALUE) and the final clearance sale price (LAST_VALUE with unbounded following) to see the total discount.",
    commonMistakes: "Relying on default frames for LAST_VALUE, which makes final_clearance_price match promotional_price on every row.",
    learningOutcomes: "Apply fully-bounded window frames to evaluate markdown trajectories."
  },
  {
    title: "Customer Multi-Touch Attribution Third Touch Marketing Anchor",
    ind: "Retail",
    diff: "Hard",
    table: "CustomerMarketingTouchpoints",
    scenario: "Marketing attribution analysts evaluate buyer journeys, extracting the initial awareness channel (FIRST_VALUE), the consideration touchpoint (NTH_VALUE 3), and the conversion closing touchpoint (LAST_VALUE).",
    businessObjective: "Isolate first, third, and final marketing touchpoints per customer using multi-anchor window functions.",
    schemaSnippet: "`CustomerMarketingTouchpoints (customer_id VARCHAR(24), touch_seq INT, channel VARCHAR(24), campaign_id VARCHAR(32))`",
    targetQuery: `SELECT customer_id,\n       touch_seq,\n       channel,\n       FIRST_VALUE(channel) OVER (\n         PARTITION BY customer_id \n         ORDER BY touch_seq ASC\n       ) AS first_touch_channel,\n       NTH_VALUE(channel, 3) OVER (\n         PARTITION BY customer_id \n         ORDER BY touch_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS mid_funnel_channel_3,\n       LAST_VALUE(channel) OVER (\n         PARTITION BY customer_id \n         ORDER BY touch_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS last_touch_channel\nFROM CustomerMarketingTouchpoints\nORDER BY customer_id, touch_seq ASC;`,
    eli5Story: "Find out where a customer first heard of us (first ad click), what they clicked on their 3rd visit (NTH_VALUE 3), and what ad made them finally buy (last ad click).",
    commonMistakes: "Omitting the unbounded following frame on NTH_VALUE and LAST_VALUE, breaking multi-touch attribution reports.",
    learningOutcomes: "Construct comprehensive multi-touch attribution models using coordinate origin anchors."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Patient Admission Baseline Body Temperature Anchor",
    ind: "Healthcare",
    diff: "Easy",
    table: "InpatientTemperatureChart",
    scenario: "Infectious disease specialists monitor fever curves by comparing ongoing patient temperature readings against the baseline temperature recorded at hospital admission.",
    businessObjective: "Anchor admission baseline temperature using FIRST_VALUE().",
    schemaSnippet: "`InpatientTemperatureChart (encounter_id VARCHAR(24), chart_time TIMESTAMP, temp_c DECIMAL(4,1))`",
    targetQuery: `SELECT encounter_id,\n       chart_time,\n       temp_c,\n       FIRST_VALUE(temp_c) OVER (\n         PARTITION BY encounter_id \n         ORDER BY chart_time ASC\n       ) AS admission_temp_c,\n       ROUND(temp_c - FIRST_VALUE(temp_c) OVER (\n         PARTITION BY encounter_id \n         ORDER BY chart_time ASC\n       ), 1) AS fever_spike_delta_c\nFROM InpatientTemperatureChart\nORDER BY encounter_id, chart_time ASC;`,
    eli5Story: "Show a hospital patient's fever chart and print their admission temperature right next to every reading so doctors spot sudden fever spikes.",
    commonMistakes: "Ordering DESC, which would treat the patient's newest fever reading as their admission temperature.",
    learningOutcomes: "Anchor clinical baseline vitals for trajectory monitoring using FIRST_VALUE()."
  },
  {
    title: "Emergency Room Patient Initial Triage vs Discharge Acuity Anchor",
    ind: "Healthcare",
    diff: "Medium",
    table: "EmergencyEncounterAcuities",
    scenario: "Hospital clinical quality auditors evaluate patient stabilization by comparing initial ER admission triage acuity against the final disposition acuity at discharge.",
    businessObjective: "Anchor entrance triage with FIRST_VALUE() and discharge acuity with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`EmergencyEncounterAcuities (patient_id VARCHAR(24), assessment_seq INT, acuity_score INT)`",
    targetQuery: `SELECT patient_id,\n       assessment_seq,\n       acuity_score,\n       FIRST_VALUE(acuity_score) OVER (\n         PARTITION BY patient_id \n         ORDER BY assessment_seq ASC\n       ) AS entrance_triage_acuity,\n       LAST_VALUE(acuity_score) OVER (\n         PARTITION BY patient_id \n         ORDER BY assessment_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS discharge_acuity,\n       FIRST_VALUE(acuity_score) OVER (PARTITION BY patient_id ORDER BY assessment_seq ASC) - \n       LAST_VALUE(acuity_score) OVER (\n         PARTITION BY patient_id \n         ORDER BY assessment_seq ASC \n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS patient_stabilization_points\nFROM EmergencyEncounterAcuities\nORDER BY patient_id, assessment_seq ASC;`,
    eli5Story: "Look at how sick an emergency patient was when they arrived (FIRST_VALUE) and compare it to their health score when they were discharged (LAST_VALUE with unbounded following) to see clinical improvement.",
    commonMistakes: "Forgetting the unbounded following frame, making discharge_acuity match the current assessment.",
    learningOutcomes: "Measure clinical health improvement by evaluating partition entry and exit values."
  },
  {
    title: "Oncology Drug Protocol Second Dose Tolerability Milestone Tracking",
    ind: "Healthcare",
    diff: "Hard",
    table: "ChemoDosingSchedules",
    scenario: "Clinical trial pharmacovigilance teams evaluate chemotherapy toxicity by comparing liver enzyme readings (ALT) from the baseline cycle against both Cycle 2 (NTH_VALUE 2) and the final cycle.",
    businessObjective: "Extract baseline enzyme with FIRST_VALUE(), Cycle 2 with NTH_VALUE(2), and final cycle with LAST_VALUE().",
    schemaSnippet: "`ChemoDosingSchedules (patient_id VARCHAR(24), cycle_num INT, alt_enzyme_units INT)`",
    targetQuery: `SELECT patient_id,\n       cycle_num,\n       alt_enzyme_units,\n       FIRST_VALUE(alt_enzyme_units) OVER (\n         PARTITION BY patient_id \n         ORDER BY cycle_num ASC\n       ) AS baseline_alt,\n       NTH_VALUE(alt_enzyme_units, 2) OVER (\n         PARTITION BY patient_id \n         ORDER BY cycle_num ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS cycle2_alt,\n       LAST_VALUE(alt_enzyme_units) OVER (\n         PARTITION BY patient_id \n         ORDER BY cycle_num ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_cycle_alt\nFROM ChemoDosingSchedules\nORDER BY patient_id, cycle_num ASC;`,
    eli5Story: "In a clinical drug trial, check a patient's liver health on Day 1 (first), Cycle 2 (NTH_VALUE 2), and the final cycle (last) to detect toxic side-effects.",
    commonMistakes: "Omitting the UNBOUNDED FOLLOWING clause on NTH_VALUE(2), resulting in NULL for Cycle 1 rows.",
    learningOutcomes: "Anchor discrete clinical study milestones across patient treatment cycles using NTH_VALUE."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Freight Dispatch Trip Origin GPS Starting Coordinate Anchor",
    ind: "Logistics",
    diff: "Easy",
    table: "FleetGpsTrail",
    scenario: "Fleet dispatchers track long-haul cargo trailers by displaying origin depot GPS coordinates beside every en-route location ping.",
    businessObjective: "Anchor journey starting coordinates using FIRST_VALUE().",
    schemaSnippet: "`FleetGpsTrail (trip_id VARCHAR(24), ping_time TIMESTAMP, lat DECIMAL(8,5), lon DECIMAL(8,5))`",
    targetQuery: `SELECT trip_id,\n       ping_time,\n       lat,\n       lon,\n       FIRST_VALUE(lat) OVER (\n         PARTITION BY trip_id \n         ORDER BY ping_time ASC\n       ) AS origin_lat,\n       FIRST_VALUE(lon) OVER (\n         PARTITION BY trip_id \n         ORDER BY ping_time ASC\n       ) AS origin_lon\nFROM FleetGpsTrail\nORDER BY trip_id, ping_time ASC;`,
    eli5Story: "As a truck drives across the country, keep the GPS coordinates of the warehouse where it started on every row using FIRST_VALUE.",
    commonMistakes: "Ordering DESC, which would capture the destination instead of the origin.",
    learningOutcomes: "Anchor origin spatial coordinates across transportation telemetry feeds."
  },
  {
    title: "Intermodal Container Voyage Origin Port vs Final Destination Anchor",
    ind: "Logistics",
    diff: "Medium",
    table: "ContainerVoyageLegs",
    scenario: "Supply chain visibility platforms display container journeys, displaying origin port and final destination seaport beside intermediate transshipment hub legs.",
    businessObjective: "Anchor origin port with FIRST_VALUE() and final destination port with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`ContainerVoyageLegs (container_id VARCHAR(20), leg_seq INT, port_code VARCHAR(8))`",
    targetQuery: `SELECT container_id,\n       leg_seq,\n       port_code AS current_port,\n       FIRST_VALUE(port_code) OVER (\n         PARTITION BY container_id \n         ORDER BY leg_seq ASC\n       ) AS port_of_origin,\n       LAST_VALUE(port_code) OVER (\n         PARTITION BY container_id \n         ORDER BY leg_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_port_of_discharge\nFROM ContainerVoyageLegs\nORDER BY container_id, leg_seq ASC;`,
    eli5Story: "For a shipping box stopping at 4 ports, show the starting port in China (FIRST_VALUE) and the final destination port in California (LAST_VALUE with unbounded following) on every leg.",
    commonMistakes: "Omitting the UNBOUNDED FOLLOWING frame on LAST_VALUE, which mistakenly sets final_port_of_discharge to current_port on every row.",
    learningOutcomes: "Structure intermodal multi-leg routing itineraries using bounding origin and destination anchors."
  },
  {
    title: "Package Sorting Conveyor Intermediate Calibration Milestone Tracking",
    ind: "Logistics",
    diff: "Hard",
    table: "ConveyorSortationWaypoints",
    scenario: "Automated package sorting hubs measure chute transit times by recording entry timestamp, the 4th optical divert waypoint timestamp (NTH_VALUE 4), and final bin deposition timestamp.",
    businessObjective: "Extract entrance time with FIRST_VALUE(), 4th waypoint with NTH_VALUE(4), and final exit with LAST_VALUE().",
    schemaSnippet: "`ConveyorSortationWaypoints (package_id VARCHAR(32), waypoint_seq INT, station_name VARCHAR(24), scanned_at TIMESTAMP)`",
    targetQuery: `SELECT package_id,\n       waypoint_seq,\n       station_name,\n       scanned_at,\n       FIRST_VALUE(scanned_at) OVER (\n         PARTITION BY package_id \n         ORDER BY waypoint_seq ASC\n       ) AS induct_time,\n       NTH_VALUE(scanned_at, 4) OVER (\n         PARTITION BY package_id \n         ORDER BY waypoint_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS divert_4_time,\n       LAST_VALUE(scanned_at) OVER (\n         PARTITION BY package_id \n         ORDER BY waypoint_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS bag_drop_time\nFROM ConveyorSortationWaypoints\nORDER BY package_id, waypoint_seq ASC;`,
    eli5Story: "When a parcel zooms along warehouse conveyor chutes, track when it entered (first), when it passed divert gate #4 (NTH_VALUE 4), and when it landed in the delivery bag (last).",
    commonMistakes: "Using default frames, which cause NTH_VALUE(4) and LAST_VALUE to evaluate only up to the current row.",
    learningOutcomes: "Deploy NTH_VALUE and LAST_VALUE with full frame scoping to evaluate high-speed material handling waypoints."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Video Streaming Player Initial Bitrate Connection Anchor",
    ind: "Media",
    diff: "Easy",
    table: "PlayerSessionBitrates",
    scenario: "Streaming quality of experience (QoE) engineers evaluate adaptive bitrate convergence by comparing stream bitrates against the initial startup rendition.",
    businessObjective: "Anchor the initial startup bitrate using FIRST_VALUE().",
    schemaSnippet: "`PlayerSessionBitrates (session_id VARCHAR(32), segment_seq INT, bitrate_kbps INT)`",
    targetQuery: `SELECT session_id,\n       segment_seq,\n       bitrate_kbps,\n       FIRST_VALUE(bitrate_kbps) OVER (\n         PARTITION BY session_id \n         ORDER BY segment_seq ASC\n       ) AS initial_startup_bitrate_kbps,\n       bitrate_kbps - FIRST_VALUE(bitrate_kbps) OVER (\n         PARTITION BY session_id \n         ORDER BY segment_seq ASC\n       ) AS quality_ramp_kbps\nFROM PlayerSessionBitrates\nORDER BY session_id, segment_seq ASC;`,
    eli5Story: "Show how video quality ramps up as a movie plays. Stamp the initial startup quality (e.g. 720p) on every row with FIRST_VALUE so engineers see how fast it reached 4K.",
    commonMistakes: "Ordering DESC, which captures the final bitrate instead of the startup bitrate.",
    learningOutcomes: "Anchor initial streaming playback quality using FIRST_VALUE()."
  },
  {
    title: "Digital Advertising Campaign Initial Bid vs Winning Clearing Price Anchor",
    ind: "Media",
    diff: "Medium",
    table: "AdAuctionBiddingRounds",
    scenario: "Programmatic ad buyers audit second-price auction dynamics by comparing their initial opening bid price against the final winning clearing price.",
    businessObjective: "Anchor opening bid with FIRST_VALUE() and winning clearing price with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`AdAuctionBiddingRounds (auction_id VARCHAR(36), round_seq INT, bid_price_usd DECIMAL(6,2))`",
    targetQuery: `SELECT auction_id,\n       round_seq,\n       bid_price_usd,\n       FIRST_VALUE(bid_price_usd) OVER (\n         PARTITION BY auction_id \n         ORDER BY round_seq ASC\n       ) AS initial_opening_bid,\n       LAST_VALUE(bid_price_usd) OVER (\n         PARTITION BY auction_id \n         ORDER BY round_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS winning_clearing_bid\nFROM AdAuctionBiddingRounds\nORDER BY auction_id, round_seq ASC;`,
    eli5Story: "In an online advertising auction, compare the very first price bid (FIRST_VALUE) to the final price that won the auction (LAST_VALUE with unbounded following).",
    commonMistakes: "Forgetting the UNBOUNDED FOLLOWING clause on LAST_VALUE, making winning_clearing_bid match the current bid on every row.",
    learningOutcomes: "Model multi-round auction clearing dynamics using boundary window anchors."
  },
  {
    title: "Mobile Game Player Quest Journey Milestone Checkpoints",
    ind: "Media",
    diff: "Hard",
    table: "PlayerQuestCheckpoints",
    scenario: "Video game designers analyze player retention by recording player level at tutorial start (FIRST_VALUE), checkpoint 5 (NTH_VALUE 5), and final campaign victory (LAST_VALUE).",
    businessObjective: "Extract tutorial level, checkpoint 5 level, and final victory level per player using multi-anchor window functions.",
    schemaSnippet: "`PlayerQuestCheckpoints (player_id VARCHAR(24), checkpoint_num INT, player_level INT, achieved_at TIMESTAMP)`",
    targetQuery: `SELECT player_id,\n       checkpoint_num,\n       player_level,\n       FIRST_VALUE(player_level) OVER (\n         PARTITION BY player_id \n         ORDER BY checkpoint_num ASC\n       ) AS start_level,\n       NTH_VALUE(player_level, 5) OVER (\n         PARTITION BY player_id \n         ORDER BY checkpoint_num ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS checkpoint_5_level,\n       LAST_VALUE(player_level) OVER (\n         PARTITION BY player_id \n         ORDER BY checkpoint_num ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_level\nFROM PlayerQuestCheckpoints\nORDER BY player_id, checkpoint_num ASC;`,
    eli5Story: "Track a gamer's progression: show their level at Level 1 (first), Level 5 (NTH_VALUE 5), and the final boss level (last) to analyze game difficulty balancing.",
    commonMistakes: "Relying on default frames for NTH_VALUE and LAST_VALUE, causing NULL results on early checkpoints.",
    learningOutcomes: "Anchor discrete quest gameplay checkpoints using fully-framed window expressions."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Cyber Incident Initial Breach Vector Host Anchor",
    ind: "Security",
    diff: "Easy",
    table: "BreachLateralMovementLogs",
    scenario: "Incident response forensics teams reconstruct cyber breaches by displaying the initial Patient Zero compromised host beside every lateral movement event.",
    businessObjective: "Anchor Patient Zero host name using FIRST_VALUE().",
    schemaSnippet: "`BreachLateralMovementLogs (incident_id VARCHAR(24), event_seq INT, host_name VARCHAR(64), detected_at TIMESTAMP)`",
    targetQuery: `SELECT incident_id,\n       event_seq,\n       host_name,\n       detected_at,\n       FIRST_VALUE(host_name) OVER (\n         PARTITION BY incident_id \n         ORDER BY event_seq ASC\n       ) AS patient_zero_host\nFROM BreachLateralMovementLogs\nORDER BY incident_id, event_seq ASC;`,
    eli5Story: "When hackers spread through 10 office computers, display the name of the very first computer they broke into on every line with FIRST_VALUE.",
    commonMistakes: "Ordering DESC, which would show the most recently infected computer instead of Patient Zero.",
    learningOutcomes: "Anchor patient-zero forensic points-of-origin in security incident timelines."
  },
  {
    title: "Privilege Escalation Chain Initial Role vs Final Domain Admin Anchor",
    ind: "Security",
    diff: "Medium",
    table: "AccountRoleEscalations",
    scenario: "Active Directory security teams investigate privilege escalation by comparing the initial guest role against the final administrative role achieved by a compromised service account.",
    businessObjective: "Anchor starting role with FIRST_VALUE() and terminal role with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`AccountRoleEscalations (account_id VARCHAR(24), step_num INT, role_assigned VARCHAR(32))`",
    targetQuery: `SELECT account_id,\n       step_num,\n       role_assigned AS current_step_role,\n       FIRST_VALUE(role_assigned) OVER (\n         PARTITION BY account_id \n         ORDER BY step_num ASC\n       ) AS initial_assigned_role,\n       LAST_VALUE(role_assigned) OVER (\n         PARTITION BY account_id \n         ORDER BY step_num ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS terminal_escalated_role\nFROM AccountRoleEscalations\nORDER BY account_id, step_num ASC;`,
    eli5Story: "Show the humble permissions an account started with (guest), and show the dangerous administrator role it ended up with (LAST_VALUE with unbounded following) to prove privilege escalation.",
    commonMistakes: "Forgetting the unbounded following frame on LAST_VALUE, which makes terminal_escalated_role match the current role on every step.",
    learningOutcomes: "Evaluate security privilege escalation journeys using start and terminal window anchors."
  },
  {
    title: "Zero-Day Exploit Shellcode Stage 3 Payload Checkpoint Tracking",
    ind: "Security",
    diff: "Hard",
    table: "SandboxExploitExecutionSteps",
    scenario: "Malware sandbox reverse engineers analyze staged exploit loaders, extracting initial dropper execution (FIRST_VALUE), Stage 3 payload decryption (NTH_VALUE 3), and final command-and-control beacon (LAST_VALUE).",
    businessObjective: "Extract exploit stage 1, stage 3, and final stage payload hashes using multi-anchor window functions.",
    schemaSnippet: "`SandboxExploitExecutionSteps (sample_id VARCHAR(32), step_order INT, step_action VARCHAR(32), sha256_hash VARCHAR(64))`",
    targetQuery: `SELECT sample_id,\n       step_order,\n       step_action,\n       sha256_hash,\n       FIRST_VALUE(sha256_hash) OVER (\n         PARTITION BY sample_id \n         ORDER BY step_order ASC\n       ) AS dropper_hash,\n       NTH_VALUE(sha256_hash, 3) OVER (\n         PARTITION BY sample_id \n         ORDER BY step_order ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS stage3_payload_hash,\n       LAST_VALUE(sha256_hash) OVER (\n         PARTITION BY sample_id \n         ORDER BY step_order ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_payload_hash\nFROM SandboxExploitExecutionSteps\nORDER BY sample_id, step_order ASC;`,
    eli5Story: "When malware unpacks itself in 5 stages inside a security sandbox, grab the original file hash (first), the Stage 3 decrypted payload hash (NTH_VALUE 3), and the final executable hash (last).",
    commonMistakes: "Using default frames on NTH_VALUE and LAST_VALUE, producing NULL values on early execution steps.",
    learningOutcomes: "Isolate discrete malware staging artifacts across execution sequences using NTH_VALUE."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Battery Cell Fresh Factory Baseline Capacity Anchor",
    ind: "Hardware",
    diff: "Easy",
    table: "BatteryLifeCycleTesting",
    scenario: "Electric vehicle battery degradation testing teams compare cell capacity across charge cycles against the fresh factory baseline capacity recorded on Cycle 1.",
    businessObjective: "Anchor Cycle 1 baseline capacity using FIRST_VALUE().",
    schemaSnippet: "`BatteryLifeCycleTesting (cell_id VARCHAR(24), cycle_count INT, capacity_mah INT)`",
    targetQuery: `SELECT cell_id,\n       cycle_count,\n       capacity_mah,\n       FIRST_VALUE(capacity_mah) OVER (\n         PARTITION BY cell_id \n         ORDER BY cycle_count ASC\n       ) AS factory_baseline_mah,\n       ROUND((capacity_mah::DECIMAL / FIRST_VALUE(capacity_mah) OVER (\n         PARTITION BY cell_id \n         ORDER BY cycle_count ASC\n       )) * 100, 2) AS state_of_health_pct\nFROM BatteryLifeCycleTesting\nORDER BY cell_id, cycle_count ASC;`,
    eli5Story: "Show a car battery's capacity at 500 charge cycles, stamp its brand-new Day 1 factory capacity on every row with FIRST_VALUE, and calculate its battery health percentage.",
    commonMistakes: "Ordering DESC, which treats an old degraded battery capacity as the factory baseline.",
    learningOutcomes: "Compute battery state-of-health (SoH) metrics relative to FIRST_VALUE() factory baselines."
  },
  {
    title: "Server Hard Drive Initial Spin-Up Temperature vs Thermal Peak",
    ind: "Hardware",
    diff: "Medium",
    table: "DriveThermalBurnInLogs",
    scenario: "Storage server burn-in testing monitors hard drive thermal curves, comparing initial spin-up ambient temperature against the drive's terminal steady-state operating temperature.",
    businessObjective: "Anchor initial temperature with FIRST_VALUE() and terminal temperature with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`DriveThermalBurnInLogs (drive_serial VARCHAR(32), burnin_hour INT, temp_c DECIMAL(4,1))`",
    targetQuery: `SELECT drive_serial,\n       burnin_hour,\n       temp_c,\n       FIRST_VALUE(temp_c) OVER (\n         PARTITION BY drive_serial \n         ORDER BY burnin_hour ASC\n       ) AS initial_spinup_temp_c,\n       LAST_VALUE(temp_c) OVER (\n         PARTITION BY drive_serial \n         ORDER BY burnin_hour ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS terminal_operating_temp_c\nFROM DriveThermalBurnInLogs\nORDER BY drive_serial, burnin_hour ASC;`,
    eli5Story: "Check a hard drive's temperature during factory testing: show its starting cold temperature (FIRST_VALUE) and its final hot operating temperature (LAST_VALUE with unbounded following).",
    commonMistakes: "Forgetting the unbounded following frame on LAST_VALUE, making terminal_operating_temp_c equal temp_c on every row.",
    learningOutcomes: "Evaluate hardware thermal dissipation ranges using entry and terminal window anchors."
  },
  {
    title: "Cleanroom Silicon Ingot Pull Crystal Diameter Checkpoint Tracking",
    ind: "Hardware",
    diff: "Hard",
    table: "IngotCrystalGrowthTelematics",
    scenario: "Silicon crystal growth technicians monitor Czochralski ingot pull diameters across growth zones, extracting seed crystal diameter (FIRST_VALUE), necking diameter (NTH_VALUE 2), and final crown diameter (LAST_VALUE).",
    businessObjective: "Extract seed diameter, necking diameter, and crown diameter per ingot using multi-anchor window functions.",
    schemaSnippet: "`IngotCrystalGrowthTelematics (ingot_id VARCHAR(24), zone_seq INT, diameter_mm DECIMAL(6,2))`",
    targetQuery: `SELECT ingot_id,\n       zone_seq,\n       diameter_mm,\n       FIRST_VALUE(diameter_mm) OVER (\n         PARTITION BY ingot_id \n         ORDER BY zone_seq ASC\n       ) AS seed_diameter_mm,\n       NTH_VALUE(diameter_mm, 2) OVER (\n         PARTITION BY ingot_id \n         ORDER BY zone_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS necking_diameter_mm,\n       LAST_VALUE(diameter_mm) OVER (\n         PARTITION BY ingot_id \n         ORDER BY zone_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS crown_diameter_mm\nFROM IngotCrystalGrowthTelematics\nORDER BY ingot_id, zone_seq ASC;`,
    eli5Story: "When growing a silicon crystal for computer chips, measure the seed crystal diameter (first), the neck diameter (NTH_VALUE 2), and the final wide cylinder diameter (last).",
    commonMistakes: "Using default frames on NTH_VALUE and LAST_VALUE, which fail to evaluate forward into the crystal growth timeline.",
    learningOutcomes: "Extract physical dimensional milestones across manufacturing sequences using NTH_VALUE and LAST_VALUE."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Employee Initial Hire Date Starting Salary Anchor",
    ind: "HR",
    diff: "Easy",
    table: "EmployeeHistoricalSalaries",
    scenario: "Compensation committees audit employee wage progression by displaying initial starting salary on hire date beside every subsequent promotion raise.",
    businessObjective: "Anchor starting salary using FIRST_VALUE().",
    schemaSnippet: "`EmployeeHistoricalSalaries (emp_id VARCHAR(16), raise_date DATE, salary_usd DECIMAL(10,2))`",
    targetQuery: `SELECT emp_id,\n       raise_date,\n       salary_usd,\n       FIRST_VALUE(salary_usd) OVER (\n         PARTITION BY emp_id \n         ORDER BY raise_date ASC\n       ) AS starting_hire_salary_usd,\n       ROUND(salary_usd - FIRST_VALUE(salary_usd) OVER (\n         PARTITION BY emp_id \n         ORDER BY raise_date ASC\n       ), 2) AS total_career_wage_growth\nFROM EmployeeHistoricalSalaries\nORDER BY emp_id, raise_date ASC;`,
    eli5Story: "Show what an employee makes today, and print the very first starting salary they earned when hired right next to it with FIRST_VALUE.",
    commonMistakes: "Ordering DESC, which mistakes their newest raise for their starting salary.",
    learningOutcomes: "Anchor initial compensation vectors across employment histories using FIRST_VALUE()."
  },
  {
    title: "Corporate Talent Career Mobility Initial vs Current Job Title",
    ind: "HR",
    diff: "Medium",
    table: "EmployeeTitleProgression",
    scenario: "Talent development teams map career advancement pathways by displaying an employee's original entry-level title alongside their terminal executive title.",
    businessObjective: "Anchor entry title with FIRST_VALUE() and terminal title with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`EmployeeTitleProgression (emp_id VARCHAR(16), step_seq INT, job_title VARCHAR(40))`",
    targetQuery: `SELECT emp_id,\n       step_seq,\n       job_title AS current_step_title,\n       FIRST_VALUE(job_title) OVER (\n         PARTITION BY emp_id \n         ORDER BY step_seq ASC\n       ) AS entry_level_title,\n       LAST_VALUE(job_title) OVER (\n         PARTITION BY emp_id \n         ORDER BY step_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_achieved_title\nFROM EmployeeTitleProgression\nORDER BY emp_id, step_seq ASC;`,
    eli5Story: "Show an employee's starting job title (e.g. Junior Analyst) and their final title (e.g. Vice President) on every row of their promotion history.",
    commonMistakes: "Omitting the UNBOUNDED FOLLOWING frame on LAST_VALUE, which makes final_achieved_title match current_step_title on every row.",
    learningOutcomes: "Map complete career title progressions using bounded origin and terminal window anchors."
  },
  {
    title: "Executive Equity Vesting Grant Third Tranche Milestone Tracking",
    ind: "HR",
    diff: "Hard",
    table: "ExecutiveStockVestingSchedules",
    scenario: "Board compensation committees review executive equity retention by tracking initial grant shares (FIRST_VALUE), Year 3 cliff vesting shares (NTH_VALUE 3), and final terminal vest shares (LAST_VALUE).",
    businessObjective: "Extract year 1 vest with FIRST_VALUE(), year 3 vest with NTH_VALUE(3), and final vest with LAST_VALUE().",
    schemaSnippet: "`ExecutiveStockVestingSchedules (exec_id VARCHAR(16), vest_year INT, vested_shares INT)`",
    targetQuery: `SELECT exec_id,\n       vest_year,\n       vested_shares,\n       FIRST_VALUE(vested_shares) OVER (\n         PARTITION BY exec_id \n         ORDER BY vest_year ASC\n       ) AS initial_year1_vest,\n       NTH_VALUE(vested_shares, 3) OVER (\n         PARTITION BY exec_id \n         ORDER BY vest_year ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS year3_cliff_vest,\n       LAST_VALUE(vested_shares) OVER (\n         PARTITION BY exec_id \n         ORDER BY vest_year ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_year4_vest\nFROM ExecutiveStockVestingSchedules\nORDER BY exec_id, vest_year ASC;`,
    eli5Story: "Track stock grants for an executive: check Year 1 shares (first), the crucial Year 3 retention milestone (NTH_VALUE 3), and final Year 4 shares (last).",
    commonMistakes: "Using default frames on NTH_VALUE, which causes it to return NULL on Year 1 and Year 2.",
    learningOutcomes: "Model multi-year executive equity retention vesting schedules using NTH_VALUE."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Database Server Cold Boot Memory Footprint Baseline Anchor",
    ind: "Platforms",
    diff: "Easy",
    table: "DbServerUptimeMemory",
    scenario: "Database administrators detect slow memory leaks by comparing hourly buffer pool consumption against the baseline memory footprint recorded immediately after cold boot.",
    businessObjective: "Anchor cold boot memory usage using FIRST_VALUE().",
    schemaSnippet: "`DbServerUptimeMemory (server_id VARCHAR(24), uptime_hour INT, memory_used_gb DECIMAL(6,2))`",
    targetQuery: `SELECT server_id,\n       uptime_hour,\n       memory_used_gb,\n       FIRST_VALUE(memory_used_gb) OVER (\n         PARTITION BY server_id \n         ORDER BY uptime_hour ASC\n       ) AS cold_boot_baseline_gb,\n       ROUND(memory_used_gb - FIRST_VALUE(memory_used_gb) OVER (\n         PARTITION BY server_id \n         ORDER BY uptime_hour ASC\n       ), 2) AS memory_leak_growth_gb\nFROM DbServerUptimeMemory\nORDER BY server_id, uptime_hour ASC;`,
    eli5Story: "Check how much RAM a database is using right now, stamp the original cold boot RAM usage on every row with FIRST_VALUE, and calculate how many gigabytes leaked.",
    commonMistakes: "Ordering DESC, which would capture the most recent high-memory state as the 'baseline'.",
    learningOutcomes: "Establish operational baseline anchors to detect infrastructure memory leaks."
  },
  {
    title: "Cloud Infrastructure Deployment Initial vs Stable Version Tag",
    ind: "Platforms",
    diff: "Medium",
    table: "ServiceDeploymentRevisions",
    scenario: "Release engineering portals display service rollout history, displaying the initial deployed commit hash alongside the final stable production commit hash.",
    businessObjective: "Anchor initial commit with FIRST_VALUE() and final commit with LAST_VALUE() using unbounded frames.",
    schemaSnippet: "`ServiceDeploymentRevisions (service_name VARCHAR(32), deploy_seq INT, commit_hash VARCHAR(40))`",
    targetQuery: `SELECT service_name,\n       deploy_seq,\n       commit_hash AS current_step_commit,\n       FIRST_VALUE(commit_hash) OVER (\n         PARTITION BY service_name \n         ORDER BY deploy_seq ASC\n       ) AS initial_canary_commit,\n       LAST_VALUE(commit_hash) OVER (\n         PARTITION BY service_name \n         ORDER BY deploy_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS final_stable_commit\nFROM ServiceDeploymentRevisions\nORDER BY service_name, deploy_seq ASC;`,
    eli5Story: "Show every version of software rolled out to servers: show the first test version (FIRST_VALUE) and the final stable production version (LAST_VALUE with unbounded following).",
    commonMistakes: "Omitting the UNBOUNDED FOLLOWING frame on LAST_VALUE, causing final_stable_commit to equal current_step_commit on every row.",
    learningOutcomes: "Track software deployment rollout progressions using boundary window anchors."
  },
  {
    title: "Distributed Query Execution Plan Step 4 Intermediate Shuffle Anchor",
    ind: "Platforms",
    diff: "Hard",
    table: "DistributedQueryPlanStages",
    scenario: "Query optimizer engineers analyze distributed join bottlenecks by extracting the root scan operator (FIRST_VALUE), the critical Step 4 network hash shuffle (NTH_VALUE 4), and the final client coordinator egress operator (LAST_VALUE).",
    businessObjective: "Extract query plan stage 1, stage 4 shuffle, and final coordinator stage using multi-anchor window functions.",
    schemaSnippet: "`DistributedQueryPlanStages (query_id VARCHAR(36), stage_seq INT, operator_name VARCHAR(32), stage_duration_ms INT)`",
    targetQuery: `SELECT query_id,\n       stage_seq,\n       operator_name,\n       stage_duration_ms,\n       FIRST_VALUE(operator_name) OVER (\n         PARTITION BY query_id \n         ORDER BY stage_seq ASC\n       ) AS scan_operator,\n       NTH_VALUE(operator_name, 4) OVER (\n         PARTITION BY query_id \n         ORDER BY stage_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS shuffle_operator_4,\n       LAST_VALUE(operator_name) OVER (\n         PARTITION BY query_id \n         ORDER BY stage_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS egress_operator\nFROM DistributedQueryPlanStages\nORDER BY query_id, stage_seq ASC;`,
    eli5Story: "In a complex 10-stage database query execution plan, check the starting table scan (first), the crucial network data shuffle at Stage 4 (NTH_VALUE 4), and the final result output (last).",
    commonMistakes: "Using default frames, which causes NTH_VALUE(4) to return NULL for stages 1, 2, and 3.",
    learningOutcomes: "Extract intermediate distributed execution plan stages using fully-framed NTH_VALUE windows."
  }
];
