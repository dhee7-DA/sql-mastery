// =============================================================================
// SECTION 9 - PART 4: RANK() VS DENSE_RANK() TOP-N WITH TIES (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: Tied Values, Gap Skipping (RANK) vs Contiguous Ranks (DENSE_RANK), Podium Leaderboards
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Investment Portfolio Asset Class Performance Podium Ranks",
    ind: "Fintech",
    diff: "Easy",
    table: "AssetClassReturns",
    scenario: "Wealth management asset allocators generate quarterly performance reports, ranking asset classes by annual return and honoring ties with contiguous medal ranks.",
    businessObjective: "Assign contiguous medal rankings (1, 2, 3...) using DENSE_RANK() so tied asset returns share a rank without skipping numbers.",
    schemaSnippet: "`AssetClassReturns (asset_class VARCHAR(32) PRIMARY KEY, ytd_return_pct DECIMAL(5,2), benchmark_pct DECIMAL(5,2))`",
    targetQuery: `SELECT asset_class,\n       ytd_return_pct,\n       benchmark_pct,\n       DENSE_RANK() OVER (ORDER BY ytd_return_pct DESC) AS medal_rank,\n       RANK() OVER (ORDER BY ytd_return_pct DESC) AS olympic_rank\nFROM AssetClassReturns\nORDER BY ytd_return_pct DESC;`,
    eli5Story: "If two asset funds tie for 1st place, DENSE_RANK puts the next fund in 2nd place (1, 1, 2). Regular RANK skips 2nd and jumps straight to 3rd (1, 1, 3).",
    commonMistakes: "Using ROW_NUMBER() when ties must be rewarded equally, artificially declaring one tied fund a loser based on alphabetical sorting.",
    learningOutcomes: "Select between DENSE_RANK() for contiguous podium standings and RANK() for competition-grade gap-skipping."
  },
  {
    title: "Venture Capital Deal Lead Sourcing Top-3 with Dense Ties",
    ind: "Fintech",
    diff: "Medium",
    table: "VcPartnerDealStats",
    scenario: "Venture capital partnerships determine partner bonus allocations by extracting partners who achieved the top 3 highest capital deployment tiers in each fund sector.",
    businessObjective: "Extract partners in the top 3 deployment ranks per sector, ensuring all tied partners are included using DENSE_RANK().",
    schemaSnippet: "`VcPartnerDealStats (partner_id VARCHAR(24), sector VARCHAR(24), capital_deployed_m DECIMAL(8,2), deals_closed INT)`",
    targetQuery: `WITH RankedPartners AS (\n  SELECT partner_id,\n         sector,\n         capital_deployed_m,\n         deals_closed,\n         DENSE_RANK() OVER (\n           PARTITION BY sector \n           ORDER BY capital_deployed_m DESC\n         ) AS deployment_tier_rank\n  FROM VcPartnerDealStats\n)\nSELECT partner_id,\n       sector,\n       capital_deployed_m,\n       deals_closed,\n       deployment_tier_rank\nFROM RankedPartners\nWHERE deployment_tier_rank <= 3\nORDER BY sector, deployment_tier_rank ASC, capital_deployed_m DESC;`,
    eli5Story: "Reward the top 3 investment tiers in each tech sector. If two partners tied for 1st place, they both get bonus tier 1, and the next partner still qualifies for bonus tier 2.",
    commonMistakes: "Using RANK() <= 3, where two 1st-place ties and two 2nd-place ties would cause the second tier to skip past 3, accidentally disqualifying partners.",
    learningOutcomes: "Use DENSE_RANK() for tier-based compensation plans where tied performance should not burn subsequent eligibility brackets."
  },
  {
    title: "Market Maker Quote Depth Spread Competition & Rebate Tiers",
    ind: "Fintech",
    diff: "Hard",
    table: "MarketMakerQuotes",
    scenario: "Electronic options exchanges calculate maker-taker fee rebates by ranking market makers on quoted inside-market size, comparing gap-skipping competition rank against dense liquidity tiers.",
    businessObjective: "Simultaneously compute RANK(), DENSE_RANK(), and count of tied competitors at each quote depth tier.",
    schemaSnippet: "`MarketMakerQuotes (quote_id VARCHAR(36) PRIMARY KEY, symbol VARCHAR(12), mm_id VARCHAR(16), quote_size INT, bid_ask_spread DECIMAL(6,4))`",
    targetQuery: `SELECT symbol,\n       mm_id,\n       quote_size,\n       bid_ask_spread,\n       RANK() OVER (\n         PARTITION BY symbol \n         ORDER BY quote_size DESC, bid_ask_spread ASC\n       ) AS exchange_competition_rank,\n       DENSE_RANK() OVER (\n         PARTITION BY symbol \n         ORDER BY quote_size DESC, bid_ask_spread ASC\n       ) AS rebate_tier_rank,\n       COUNT(*) OVER (\n         PARTITION BY symbol, quote_size, bid_ask_spread\n       ) AS tied_competitor_headcount\nFROM MarketMakerQuotes\nORDER BY symbol, exchange_competition_rank ASC;`,
    eli5Story: "Show how market makers rank against each other. Calculate the official exchange rank (which skips numbers if people tie), the rebate reward tier (which never skips), and count how many rivals had the exact same quote.",
    commonMistakes: "Omitting bid_ask_spread from the secondary sort, leading to arbitrary ties when sizes match but spreads differ.",
    learningOutcomes: "Formulate multi-metric ranking with tie-frequency analysis for quantitative market structure."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "SaaS Sales Development Rep Meeting Booking Leaderboard",
    ind: "SaaS",
    diff: "Easy",
    table: "SdrMonthlyMetrics",
    scenario: "Inside sales managers display a live sales floor TV leaderboard ranking SDRs by qualified demos booked, ensuring tied reps share identical podium ranks.",
    businessObjective: "Rank SDRs by demo volume using DENSE_RANK().",
    schemaSnippet: "`SdrMonthlyMetrics (sdr_id VARCHAR(16) PRIMARY KEY, team_name VARCHAR(24), demos_booked INT)`",
    targetQuery: `SELECT sdr_id,\n       team_name,\n       demos_booked,\n       DENSE_RANK() OVER (ORDER BY demos_booked DESC) AS leaderboard_rank\nFROM SdrMonthlyMetrics\nORDER BY leaderboard_rank ASC, sdr_id ASC;`,
    eli5Story: "Put the sales reps on a TV screen. If Alice and Bob both booked 20 demos, they both share the #1 crown, and Charlie with 19 demos gets #2.",
    commonMistakes: "Using ROW_NUMBER(), which arbitrarily picks Alice over Bob based on database storage order.",
    learningOutcomes: "Enforce fair, unbiased leaderboard rankings in sales performance tools."
  },
  {
    title: "Enterprise Product Feature Request Voting Top-5 with Ties",
    ind: "SaaS",
    diff: "Medium",
    table: "ProductFeatureVotes",
    scenario: "Product managers prioritize engineering roadmaps by extracting all feature requests belonging to the top 5 most-voted popularity tiers per product module.",
    businessObjective: "Extract features in the top 5 vote tiers per module using DENSE_RANK() to prevent dropping equally popular feature requests.",
    schemaSnippet: "`ProductFeatureVotes (feature_id VARCHAR(32) PRIMARY KEY, module VARCHAR(24), upvotes INT, target_release VARCHAR(16))`",
    targetQuery: `WITH RankedFeatures AS (\n  SELECT feature_id,\n         module,\n         upvotes,\n         target_release,\n         DENSE_RANK() OVER (PARTITION BY module ORDER BY upvotes DESC) AS vote_tier\n  FROM ProductFeatureVotes\n)\nSELECT feature_id,\n       module,\n       upvotes,\n       target_release,\n       vote_tier\nFROM RankedFeatures\nWHERE vote_tier <= 5\nORDER BY module, vote_tier ASC, upvotes DESC;`,
    eli5Story: "Find the top 5 vote tiers for new software ideas. If 4 different features all got 100 votes, include all of them in Tier 1 rather than leaving any out.",
    commonMistakes: "Using LIMIT 5, which chops off tied features that received the exact same customer demand.",
    learningOutcomes: "Solve product demand prioritization using DENSE_RANK() without truncation bias."
  },
  {
    title: "Engineering Sprint Bug Buster Trophy vs Defect Severity Tiers",
    ind: "SaaS",
    diff: "Hard",
    table: "EngineerBugFixes",
    scenario: "DevOps teams award monthly bug squash prizes by computing both weighted severity points and total ticket counts, isolating engineers who rank in the top 3 across either metric.",
    businessObjective: "Compute dual independent DENSE_RANK() windows and filter for engineers ranking in the top 3 of points OR volume.",
    schemaSnippet: "`EngineerBugFixes (emp_id VARCHAR(16) PRIMARY KEY, team_id VARCHAR(16), critical_fixes INT, minor_fixes INT)`",
    targetQuery: `WITH ScoredEngineers AS (\n  SELECT emp_id,\n         team_id,\n         (critical_fixes * 5 + minor_fixes * 1) AS total_points,\n         (critical_fixes + minor_fixes) AS total_bugs,\n         DENSE_RANK() OVER (ORDER BY (critical_fixes * 5 + minor_fixes * 1) DESC) AS points_rank,\n         DENSE_RANK() OVER (ORDER BY (critical_fixes + minor_fixes) DESC) AS volume_rank\n  FROM EngineerBugFixes\n)\nSELECT emp_id,\n       team_id,\n       total_points,\n       total_bugs,\n       points_rank,\n       volume_rank\nFROM ScoredEngineers\nWHERE points_rank <= 3 OR volume_rank <= 3\nORDER BY LEAST(points_rank, volume_rank) ASC, total_points DESC;`,
    eli5Story: "Give an award if an engineer is top 3 in total difficulty points OR top 3 in raw number of bugs fixed. Check both scoreboards in a single query.",
    commonMistakes: "Trying to combine points and volume into a single messy sort clause instead of evaluating two distinct ranking windows.",
    learningOutcomes: "Combine multiple independent ranking windows using boolean OR conditions in outer filters."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Regional Store Revenue Leaderboard with Competition Gaps",
    ind: "Retail",
    diff: "Easy",
    table: "StoreMonthlyRevenue",
    scenario: "Retail executive dashboards display regional store performance, using competition ranking (RANK) to emphasize how many stores are outperformed.",
    businessObjective: "Apply RANK() to compute competition ranks that skip numbers after ties.",
    schemaSnippet: "`StoreMonthlyRevenue (store_id VARCHAR(16) PRIMARY KEY, region VARCHAR(16), gross_sales_usd DECIMAL(12,2))`",
    targetQuery: `SELECT store_id,\n       region,\n       gross_sales_usd,\n       RANK() OVER (PARTITION BY region ORDER BY gross_sales_usd DESC) AS regional_comp_rank\nFROM StoreMonthlyRevenue\nORDER BY region, regional_comp_rank ASC;`,
    eli5Story: "If two stores tie for 1st place in sales, the next store is officially in 3rd place because 2 stores sold more than it.",
    commonMistakes: "Using DENSE_RANK() when the corporate KPI definition explicitly requires tracking how many total competitor stores were beaten.",
    learningOutcomes: "Apply standard competition gap ranking using RANK()."
  },
  {
    title: "Black Friday Hourly Door-Buster Product Sales Tiering",
    ind: "Retail",
    diff: "Medium",
    table: "DoorBusterHourlySales",
    scenario: "Merchandising analysts evaluate Black Friday hourly promotions, grouping products into top 3 sales velocity tiers per promotional hour using DENSE_RANK().",
    businessObjective: "Extract all promotional items qualifying for the top 3 hourly sales tiers per store zone.",
    schemaSnippet: "`DoorBusterHourlySales (promo_hour INT, zone_id VARCHAR(16), item_id VARCHAR(24), units_sold INT)`",
    targetQuery: `WITH HourlyTiers AS (\n  SELECT promo_hour,\n         zone_id,\n         item_id,\n         units_sold,\n         DENSE_RANK() OVER (\n           PARTITION BY promo_hour, zone_id \n           ORDER BY units_sold DESC\n         ) AS hourly_tier\n  FROM DoorBusterHourlySales\n)\nSELECT promo_hour,\n       zone_id,\n       item_id,\n       units_sold,\n       hourly_tier\nFROM HourlyTiers\nWHERE hourly_tier <= 3\nORDER BY promo_hour, zone_id, hourly_tier ASC;`,
    eli5Story: "Every hour during Black Friday, find the hottest products and group them into Tiers 1, 2, and 3, making sure tied items share the spotlight.",
    commonMistakes: "Partitioning only by promo_hour and omitting zone_id, combining East Coast and West Coast time-shifted results.",
    learningOutcomes: "Partition high-velocity promotional analytics across time slices and geographic zones."
  },
  {
    title: "Supplier On-Time Delivery Compliance Penalty Brackets with Ties",
    ind: "Retail",
    diff: "Hard",
    table: "SupplierDeliveryAudits",
    scenario: "Supply chain compliance contracts impose financial penalties on vendors performing in the bottom 3 compliance tiers within each material commodity group.",
    businessObjective: "Assign ascending DENSE_RANK() on on-time delivery rates, extract the bottom 3 penalty tiers, and calculate vendor penalty fees.",
    schemaSnippet: "`SupplierDeliveryAudits (vendor_id VARCHAR(24), commodity_group VARCHAR(32), on_time_rate_pct DECIMAL(5,2), contract_spend_m DECIMAL(8,2))`",
    targetQuery: `WITH VendorComplianceRanks AS (\n  SELECT vendor_id,\n         commodity_group,\n         on_time_rate_pct,\n         contract_spend_m,\n         DENSE_RANK() OVER (\n           PARTITION BY commodity_group \n           ORDER BY on_time_rate_pct ASC\n         ) AS penalty_bracket\n  FROM SupplierDeliveryAudits\n)\nSELECT vendor_id,\n       commodity_group,\n       on_time_rate_pct,\n       contract_spend_m,\n       penalty_bracket,\n       CASE WHEN penalty_bracket = 1 THEN contract_spend_m * 0.05\n            WHEN penalty_bracket = 2 THEN contract_spend_m * 0.03\n            WHEN penalty_bracket = 3 THEN contract_spend_m * 0.01\n            ELSE 0 END AS penalty_fine_m\nFROM VendorComplianceRanks\nWHERE penalty_bracket <= 3\nORDER BY commodity_group, penalty_bracket ASC;`,
    eli5Story: "Rank suppliers from worst to best in delivery punctuality. The worst tier pays a 5% fine, second worst pays 3%, and third worst pays 1%.",
    commonMistakes: "Sorting DESC instead of ASC, inadvertently fining the most punctual suppliers instead of the worst.",
    learningOutcomes: "Build dynamic penalty schedules based on ascending bottom-tier window rankings."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Hospital Emergency Department Physician Patient Load Ranking",
    ind: "Healthcare",
    diff: "Easy",
    table: "ErPhysicianShifts",
    scenario: "Chief Medical Officers balance clinical workload by ranking attending emergency physicians by patient encounters handled during night shifts.",
    businessObjective: "Rank doctors by patient volume using DENSE_RANK().",
    schemaSnippet: "`ErPhysicianShifts (doctor_id VARCHAR(16) PRIMARY KEY, campus_id VARCHAR(16), shift_date DATE, patients_treated INT)`",
    targetQuery: `SELECT doctor_id,\n       campus_id,\n       shift_date,\n       patients_treated,\n       DENSE_RANK() OVER (PARTITION BY campus_id, shift_date ORDER BY patients_treated DESC) AS workload_tier\nFROM ErPhysicianShifts\nORDER BY campus_id, shift_date, workload_tier ASC;`,
    eli5Story: "Rank ER doctors on each shift by how many patients they treated, ensuring doctors who saw the same number of patients share the same rank.",
    commonMistakes: "Using ROW_NUMBER() and arbitrarily placing one doctor ahead of another despite identical clinical load.",
    learningOutcomes: "Preserve operational fairness in healthcare staffing analytics using DENSE_RANK()."
  },
  {
    title: "Clinical Trial Patient Tumor Shrinkage Response Tiers",
    ind: "Healthcare",
    diff: "Medium",
    table: "OncologyTrialResponses",
    scenario: "Oncology clinical research associates evaluate chemotherapy drug efficacy by ranking cancer patients by percentage reduction in target tumor diameter.",
    businessObjective: "Extract patients achieving the top 3 tumor reduction tiers per dosage cohort using DENSE_RANK().",
    schemaSnippet: "`OncologyTrialResponses (subject_id VARCHAR(24) PRIMARY KEY, cohort_code VARCHAR(16), tumor_reduction_pct DECIMAL(5,2))`",
    targetQuery: `WITH RankedResponses AS (\n  SELECT subject_id,\n         cohort_code,\n         tumor_reduction_pct,\n         DENSE_RANK() OVER (\n           PARTITION BY cohort_code \n           ORDER BY tumor_reduction_pct DESC\n         ) AS response_tier\n  FROM OncologyTrialResponses\n)\nSELECT subject_id,\n       cohort_code,\n       tumor_reduction_pct,\n       response_tier\nFROM RankedResponses\nWHERE response_tier <= 3\nORDER BY cohort_code, response_tier ASC;`,
    eli5Story: "Look at tumor shrinkage results in a cancer study. Find the patients in the top 3 best shrinkage tiers in each drug dose group.",
    commonMistakes: "Using RANK() <= 3, which could exclude an entire response category if there are ties at tier 1 or 2.",
    learningOutcomes: "Structure clinical response tier classifications using dense window partitioning."
  },
  {
    title: "Healthcare System Surgeon Complication Rate Risk Quartile Tiers",
    ind: "Healthcare",
    diff: "Hard",
    table: "SurgeonPerformanceAudits",
    scenario: "Hospital surgical governance committees review post-operative complication rates, ranking surgeons within each surgical specialty while calculating both rank gap skips and dense peer groups.",
    businessObjective: "Simultaneously calculate RANK(), DENSE_RANK(), and variance from the specialty median complication rate.",
    schemaSnippet: "`SurgeonPerformanceAudits (surgeon_id VARCHAR(16) PRIMARY KEY, specialty VARCHAR(32), surgeries_count INT, complication_rate_pct DECIMAL(5,2))`",
    targetQuery: `SELECT surgeon_id,\n       specialty,\n       surgeries_count,\n       complication_rate_pct,\n       DENSE_RANK() OVER (\n         PARTITION BY specialty \n         ORDER BY complication_rate_pct ASC\n       ) AS clinical_safety_dense_tier,\n       RANK() OVER (\n         PARTITION BY specialty \n         ORDER BY complication_rate_pct ASC\n       ) AS clinical_safety_comp_rank,\n       ROUND(complication_rate_pct - AVG(complication_rate_pct) OVER (PARTITION BY specialty), 2) AS diff_from_specialty_avg\nFROM SurgeonPerformanceAudits\nWHERE surgeries_count >= 50\nORDER BY specialty, clinical_safety_dense_tier ASC;`,
    eli5Story: "Rank surgeons from lowest complication rate to highest. Show both their dense medal rank, their standard competition rank, and how much better or worse they did than the hospital average.",
    commonMistakes: "Omitting the sample-size filter 'WHERE surgeries_count >= 50', allowing a surgeon with 1 successful surgery (0% complications) to rank #1.",
    learningOutcomes: "Combine multiple ranking modalities with partition averages while filtering for statistical reliability."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Regional Courier On-Time Delivery Depot Rankings",
    ind: "Logistics",
    diff: "Easy",
    table: "DepotPerformanceScores",
    scenario: "Logistics directors rank regional delivery depots by weekly on-time delivery percentages, using DENSE_RANK() to assign performance badges.",
    businessObjective: "Rank delivery depots by on-time delivery percentage using DENSE_RANK().",
    schemaSnippet: "`DepotPerformanceScores (depot_id VARCHAR(16) PRIMARY KEY, region VARCHAR(16), on_time_pct DECIMAL(5,2))`",
    targetQuery: `SELECT depot_id,\n       region,\n       on_time_pct,\n       DENSE_RANK() OVER (PARTITION BY region ORDER BY on_time_pct DESC) AS regional_badge_tier\nFROM DepotPerformanceScores\nORDER BY region, regional_badge_tier ASC;`,
    eli5Story: "Award gold, silver, and bronze badges to delivery depots based on punctuality, ensuring tied depots both get gold without skipping silver.",
    commonMistakes: "Using ROW_NUMBER(), forcing arbitrary tie-breaking between depots with identical 99.5% on-time records.",
    learningOutcomes: "Generate non-skipping badge tiers using DENSE_RANK()."
  },
  {
    title: "Air Cargo Charter Flight Payload Utilization Leaderboard",
    ind: "Logistics",
    diff: "Medium",
    table: "CargoFlightManifests",
    scenario: "Air freight dispatchers evaluate widebody freighter utilization, extracting flights that achieved the top 3 highest payload weight capacity percentages on each major trade lane.",
    businessObjective: "Extract flights in the top 3 capacity utilization tiers per lane using DENSE_RANK().",
    schemaSnippet: "`CargoFlightManifests (flight_id VARCHAR(24) PRIMARY KEY, trade_lane VARCHAR(32), cargo_tons DECIMAL(6,2), max_payload_tons DECIMAL(6,2))`",
    targetQuery: `WITH RankedFlights AS (\n  SELECT flight_id,\n         trade_lane,\n         cargo_tons,\n         max_payload_tons,\n         ROUND((cargo_tons / max_payload_tons) * 100, 1) AS load_factor_pct,\n         DENSE_RANK() OVER (\n           PARTITION BY trade_lane \n           ORDER BY (cargo_tons / max_payload_tons) DESC\n         ) AS load_tier\n  FROM CargoFlightManifests\n)\nSELECT flight_id,\n       trade_lane,\n       load_factor_pct,\n       load_tier\nFROM RankedFlights\nWHERE load_tier <= 3\nORDER BY trade_lane, load_tier ASC, load_factor_pct DESC;`,
    eli5Story: "Look at big cargo planes flying across the Atlantic. Pluck out all flights that placed in the top 3 fullest cargo load tiers.",
    commonMistakes: "Sorting by cargo_tons instead of cargo_tons / max_payload_tons, unfairly penalizing smaller 767s against 747s.",
    learningOutcomes: "Rank normalized utilization percentages rather than raw payload volumes."
  },
  {
    title: "Intermodal Rail Drayage Turn-Time Congestion Penalty Ranking",
    ind: "Logistics",
    diff: "Hard",
    table: "DrayageTruckTurns",
    scenario: "Port authorities monitor container terminal congestion by ranking ocean terminals by average truck gate turn-time, evaluating both gap-skipping competition ranks and dense congestion penalty tiers.",
    businessObjective: "Aggregate average turn times per terminal, assign dual RANK() and DENSE_RANK() windows, and identify the top 3 most congested terminals.",
    schemaSnippet: "`DrayageTruckTurns (turn_id VARCHAR(36) PRIMARY KEY, terminal_id VARCHAR(16), turn_minutes INT, gate_date DATE)`",
    targetQuery: `WITH TerminalDailyAverages AS (\n  SELECT terminal_id,\n         gate_date,\n         ROUND(AVG(turn_minutes), 1) AS avg_turn_mins,\n         COUNT(*) AS total_truck_turns\n  FROM DrayageTruckTurns\n  GROUP BY terminal_id, gate_date\n),\nRankedTerminals AS (\n  SELECT terminal_id,\n         gate_date,\n         avg_turn_mins,\n         total_truck_turns,\n         DENSE_RANK() OVER (PARTITION BY gate_date ORDER BY avg_turn_mins DESC) AS congestion_dense_tier,\n         RANK() OVER (PARTITION BY gate_date ORDER BY avg_turn_mins DESC) AS congestion_comp_rank\n  FROM TerminalDailyAverages\n)\nSELECT terminal_id,\n       gate_date,\n       avg_turn_mins,\n       total_truck_turns,\n       congestion_dense_tier,\n       congestion_comp_rank\nFROM RankedTerminals\nWHERE congestion_dense_tier <= 3\nORDER BY gate_date, congestion_dense_tier ASC;`,
    eli5Story: "First calculate the average wait time for trucks at every shipping dock. Then rank the docks from longest delay to shortest, picking the top 3 most jammed docks each day.",
    commonMistakes: "Running window functions directly on raw truck turns instead of first grouping by terminal and date, which ranks individual trucks rather than terminal efficiency.",
    learningOutcomes: "Sequence GROUP BY first-stage terminal aggregation into second-stage window ranking."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Music Streaming Track Chart Leaderboard with Dense Ties",
    ind: "Media",
    diff: "Easy",
    table: "DailyTrackStreams",
    scenario: "Digital music billboard charts display top songs by daily play count, using DENSE_RANK() so artists with tied stream counts share the exact same chart position.",
    businessObjective: "Generate chart positions for music tracks using DENSE_RANK().",
    schemaSnippet: "`DailyTrackStreams (track_id VARCHAR(32) PRIMARY KEY, genre VARCHAR(24), stream_count BIGINT)`",
    targetQuery: `SELECT track_id,\n       genre,\n       stream_count,\n       DENSE_RANK() OVER (PARTITION BY genre ORDER BY stream_count DESC) AS chart_position\nFROM DailyTrackStreams\nORDER BY genre, chart_position ASC;`,
    eli5Story: "Build a Top-40 music chart. If two hit songs both had 1 million streams, they both share the #1 spot, and the next song takes #2.",
    commonMistakes: "Using ROW_NUMBER() and randomly crowning one artist #1 and the other #2.",
    learningOutcomes: "Implement standard commercial music chart ranking with tied positions."
  },
  {
    title: "Gaming Tournament Esports Player Kill-Death Ratio Standings",
    ind: "Media",
    diff: "Medium",
    table: "EsportsMatchStats",
    scenario: "Esports league tournament coordinators rank pro players by kill-to-death (K/D) ratio, extracting all players placing in the top 3 medal tiers per tournament division.",
    businessObjective: "Extract players in the top 3 K/D ratio tiers per division using DENSE_RANK().",
    schemaSnippet: "`EsportsMatchStats (player_id VARCHAR(24) PRIMARY KEY, division VARCHAR(16), kills INT, deaths INT)`",
    targetQuery: `WITH PlayerRanks AS (\n  SELECT player_id,\n         division,\n         kills,\n         deaths,\n         ROUND(kills::DECIMAL / NULLIF(deaths, 0), 2) AS kd_ratio,\n         DENSE_RANK() OVER (\n           PARTITION BY division \n           ORDER BY (kills::DECIMAL / NULLIF(deaths, 0)) DESC\n         ) AS medal_tier\n  FROM EsportsMatchStats\n)\nSELECT player_id,\n       division,\n       kills,\n       deaths,\n       kd_ratio,\n       medal_tier\nFROM PlayerRanks\nWHERE medal_tier <= 3\nORDER BY division, medal_tier ASC, kd_ratio DESC;`,
    eli5Story: "Calculate every gamer's Kill/Death score in a tournament. Pluck out all players in the top 3 medal tiers in each division.",
    commonMistakes: "Forgetting NULLIF(deaths, 0), causing query crashes when flawless players have 0 deaths.",
    learningOutcomes: "Protect against division-by-zero errors in ratio calculations within window ORDER BY clauses."
  },
  {
    title: "Box Office Movie Weekend Gross Comparison vs Competition Rank Gaps",
    ind: "Media",
    diff: "Hard",
    table: "WeekendBoxOffice",
    scenario: "Theatrical movie distributors analyze box office market share by comparing film weekend grosses, calculating both industry competition rank (skipping numbers) and dense ranking tiers.",
    businessObjective: "Simultaneously calculate RANK(), DENSE_RANK(), and percentage share of total weekend box office gross.",
    schemaSnippet: "`WeekendBoxOffice (film_id VARCHAR(32) PRIMARY KEY, distributor VARCHAR(32), weekend_gross_usd DECIMAL(12,2))`",
    targetQuery: `SELECT film_id,\n       distributor,\n       weekend_gross_usd,\n       DENSE_RANK() OVER (ORDER BY weekend_gross_usd DESC) AS box_office_tier,\n       RANK() OVER (ORDER BY weekend_gross_usd DESC) AS industry_box_office_rank,\n       ROUND(weekend_gross_usd / SUM(weekend_gross_usd) OVER () * 100, 2) AS market_share_pct\nFROM WeekendBoxOffice\nORDER BY box_office_tier ASC;`,
    eli5Story: "Show the weekend box office rankings for Hollywood movies. Display both the dense rank and the industry competition rank, along with each movie's slice of total ticket sales.",
    commonMistakes: "Omitting the empty OVER() in the market share denominator, which calculates percentage of partition instead of total market.",
    learningOutcomes: "Combine whole-table window aggregations with multi-style ranking functions."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Vulnerability Scanning Critical CVE Severity Ranking",
    ind: "Security",
    diff: "Easy",
    table: "HostVulnerabilityFindings",
    scenario: "Vulnerability management teams triage software vulnerabilities across cloud servers by ranking CVEs by CVSS v3 score using DENSE_RANK().",
    businessObjective: "Rank CVE vulnerabilities by CVSS score per host using DENSE_RANK().",
    schemaSnippet: "`HostVulnerabilityFindings (host_id VARCHAR(32), cve_id VARCHAR(24), cvss_score DECIMAL(3,1))`",
    targetQuery: `SELECT host_id,\n       cve_id,\n       cvss_score,\n       DENSE_RANK() OVER (PARTITION BY host_id ORDER BY cvss_score DESC) AS severity_tier\nFROM HostVulnerabilityFindings\nORDER BY host_id, severity_tier ASC;`,
    eli5Story: "Group security bugs on each server by how dangerous they are. All 10.0 critical bugs share Tier 1, and 9.8 bugs share Tier 2.",
    commonMistakes: "Using ROW_NUMBER(), which assigns arbitrary sequence numbers to identical 10.0 maximum severity security flaws.",
    learningOutcomes: "Group identical threat severity scores into uniform triage tiers using DENSE_RANK()."
  },
  {
    title: "SOC Analyst Threat Ticket Resolution Leaderboard",
    ind: "Security",
    diff: "Medium",
    table: "SocAnalystWeeklyStats",
    scenario: "Security operations managers recognize top-performing incident response analysts by extracting analysts who placed in the top 3 tiers of closed high-severity incidents.",
    businessObjective: "Extract analysts in the top 3 incident resolution tiers using DENSE_RANK().",
    schemaSnippet: "`SocAnalystWeeklyStats (analyst_id VARCHAR(16) PRIMARY KEY, shift_group VARCHAR(16), incidents_closed INT)`",
    targetQuery: `WITH RankedAnalysts AS (\n  SELECT analyst_id,\n         shift_group,\n         incidents_closed,\n         DENSE_RANK() OVER (PARTITION BY shift_group ORDER BY incidents_closed DESC) AS resolution_tier\n  FROM SocAnalystWeeklyStats\n)\nSELECT analyst_id,\n       shift_group,\n       incidents_closed,\n       resolution_tier\nFROM RankedAnalysts\nWHERE resolution_tier <= 3\nORDER BY shift_group, resolution_tier ASC;`,
    eli5Story: "Find the top 3 problem-solving tiers for security analysts on each shift, making sure analysts with the same number of closed tickets share the tier.",
    commonMistakes: "Filtering by ROW_NUMBER() <= 3, which could pick 3 analysts and leave out a 4th analyst who solved the exact same number of incidents.",
    learningOutcomes: "Ensure equitable operational recognition using dense ranking filters."
  },
  {
    title: "Zero-Trust Device Risk Assessment Posture Tier Classification",
    ind: "Security",
    diff: "Hard",
    table: "DevicePostureSnapshots",
    scenario: "Endpoint compliance engines categorize fleet laptops into quarantine tiers based on missing OS security patches and outdated antivirus definitions.",
    businessObjective: "Calculate composite risk score, assign DENSE_RANK() and RANK() tiers, and isolate devices in the top 5 highest-risk tiers per operating system.",
    schemaSnippet: "`DevicePostureSnapshots (device_id VARCHAR(32) PRIMARY KEY, os_family VARCHAR(16), missing_patches INT, days_since_av_update INT)`",
    targetQuery: `WITH DeviceRiskScores AS (\n  SELECT device_id,\n         os_family,\n         missing_patches,\n         days_since_av_update,\n         (missing_patches * 10 + days_since_av_update * 2) AS risk_score\n  FROM DevicePostureSnapshots\n),\nRankedDevices AS (\n  SELECT device_id,\n         os_family,\n         risk_score,\n         DENSE_RANK() OVER (PARTITION BY os_family ORDER BY risk_score DESC) AS risk_dense_tier,\n         RANK() OVER (PARTITION BY os_family ORDER BY risk_score DESC) AS risk_comp_rank\n  FROM DeviceRiskScores\n)\nSELECT device_id,\n       os_family,\n       risk_score,\n       risk_dense_tier,\n       risk_comp_rank\nFROM RankedDevices\nWHERE risk_dense_tier <= 5\nORDER BY os_family, risk_dense_tier ASC;`,
    eli5Story: "Calculate a danger score for every company computer based on missing software updates. Find the 5 most dangerous risk tiers for Windows, Mac, and Linux.",
    commonMistakes: "Writing out the compound formula (missing_patches * 10...) multiple times in the OVER clause instead of projecting it in an initial CTE.",
    learningOutcomes: "Structure multi-variable risk scoring cleanly before applying analytical window rank filters."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Server CPU Benchmark Score Leaderboard with Dense Tiers",
    ind: "Hardware",
    diff: "Easy",
    table: "ServerCpuBenchmarks",
    scenario: "Hardware architects evaluate microprocessors for cloud instances by ranking CPU models by multi-core Cinebench scores using DENSE_RANK().",
    businessObjective: "Rank CPU benchmark results into dense tiers using DENSE_RANK().",
    schemaSnippet: "`ServerCpuBenchmarks (cpu_model VARCHAR(40) PRIMARY KEY, socket_type VARCHAR(16), multi_core_score INT)`",
    targetQuery: `SELECT cpu_model,\n       socket_type,\n       multi_core_score,\n       DENSE_RANK() OVER (PARTITION BY socket_type ORDER BY multi_core_score DESC) AS perf_tier\nFROM ServerCpuBenchmarks\nORDER BY socket_type, perf_tier ASC;`,
    eli5Story: "Rank server computer chips by speed. If two chips score 50,000 points, both get Tier 1, and the 48,000 point chip gets Tier 2.",
    commonMistakes: "Using RANK(), which would jump from 1 to 3 if two chips tied, confusing buyers looking for Tier 2 chips.",
    learningOutcomes: "Generate intuitive hardware performance tier listings using DENSE_RANK()."
  },
  {
    title: "Factory Injection Molding Machine Cycle Speed Leaderboard",
    ind: "Hardware",
    diff: "Medium",
    table: "InjectionMoldingCycles",
    scenario: "Plastics manufacturing supervisors extract injection molding presses achieving the top 3 fastest cycle times per resin type, honoring ties.",
    businessObjective: "Extract presses in the top 3 fastest cycle tiers per resin using DENSE_RANK().",
    schemaSnippet: "`InjectionMoldingCycles (machine_id VARCHAR(16) PRIMARY KEY, resin_type VARCHAR(24), cycle_sec DECIMAL(4,2))`",
    targetQuery: `WITH RankedMachines AS (\n  SELECT machine_id,\n         resin_type,\n         cycle_sec,\n         DENSE_RANK() OVER (PARTITION BY resin_type ORDER BY cycle_sec ASC) AS speed_tier\n  FROM InjectionMoldingCycles\n)\nSELECT machine_id,\n       resin_type,\n       cycle_sec,\n       speed_tier\nFROM RankedMachines\nWHERE speed_tier <= 3\nORDER BY resin_type, speed_tier ASC;`,
    eli5Story: "Find the 3 fastest machine speed tiers for each type of plastic. Since faster is better, sort ASC so the lowest seconds take Tier 1.",
    commonMistakes: "Sorting DESC, which rewards the slowest machines instead of the fastest.",
    learningOutcomes: "Correctly orient window ORDER BY direction (ASC vs DESC) based on physical performance criteria."
  },
  {
    title: "Semiconductor Cleanroom Wafer Defect Density Tiering & Yield Gaps",
    ind: "Hardware",
    diff: "Hard",
    table: "WaferDefectInspection",
    scenario: "Photolithography process engineers rank silicon wafers by defect density (defects/cm²), computing both dense quality grades and gap-skipping competition ranks across fabrication lots.",
    businessObjective: "Calculate defect density, assign dual DENSE_RANK() and RANK() windows, and identify wafers in the top 2 cleanest grades per lot.",
    schemaSnippet: "`WaferDefectInspection (wafer_id VARCHAR(32) PRIMARY KEY, lot_id VARCHAR(24), defect_count INT, surface_area_cm2 DECIMAL(6,2))`",
    targetQuery: `WITH WaferDefectDensities AS (\n  SELECT wafer_id,\n         lot_id,\n         defect_count,\n         surface_area_cm2,\n         ROUND(defect_count / surface_area_cm2, 4) AS defect_density\n  FROM WaferDefectInspection\n),\nRankedWafers AS (\n  SELECT wafer_id,\n         lot_id,\n         defect_density,\n         DENSE_RANK() OVER (PARTITION BY lot_id ORDER BY defect_density ASC) AS quality_dense_tier,\n         RANK() OVER (PARTITION BY lot_id ORDER BY defect_density ASC) AS quality_comp_rank\n  FROM WaferDefectDensities\n)\nSELECT wafer_id,\n       lot_id,\n       defect_density,\n       quality_dense_tier,\n       quality_comp_rank\nFROM RankedWafers\nWHERE quality_dense_tier <= 2\nORDER BY lot_id, quality_dense_tier ASC;`,
    eli5Story: "Calculate how many tiny defects per square centimeter are on each silicon wafer. Pick out the two cleanest quality grades in each manufacturing lot.",
    commonMistakes: "Ranking by raw defect_count instead of defect_density, which distorts comparisons between 200mm and 300mm silicon wafers.",
    learningOutcomes: "Normalize physical manufacturing measurements before evaluating multi-tier window rankings."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Longevity Seniority Recognition Ranks with Ties",
    ind: "HR",
    diff: "Easy",
    table: "EmployeeTenureRecords",
    scenario: "Human resources teams prepare annual service anniversary awards, ranking employees by hire date and ensuring employees hired on the same date share the same seniority rank.",
    businessObjective: "Assign seniority rankings using DENSE_RANK().",
    schemaSnippet: "`EmployeeTenureRecords (emp_id VARCHAR(16) PRIMARY KEY, department VARCHAR(32), hire_date DATE)`",
    targetQuery: `SELECT emp_id,\n       department,\n       hire_date,\n       DENSE_RANK() OVER (ORDER BY hire_date ASC) AS seniority_tier\nFROM EmployeeTenureRecords\nORDER BY seniority_tier ASC, emp_id ASC;`,
    eli5Story: "Rank employees by how long they've worked here. Anyone who started on the exact same orientation day shares the exact same seniority rank.",
    commonMistakes: "Using ROW_NUMBER(), which gives one same-day hire greater seniority than another based on employee ID.",
    learningOutcomes: "Model fair corporate seniority recognition using DENSE_RANK()."
  },
  {
    title: "Sales Pod Commission Top-3 Earner Bracket Extraction",
    ind: "HR",
    diff: "Medium",
    table: "PodRepEarnings",
    scenario: "Sales finance teams identify account executives eligible for President's Club by extracting all sales reps placing in the top 3 earnings tiers per regional sales pod.",
    businessObjective: "Extract reps in the top 3 earnings tiers per pod using DENSE_RANK().",
    schemaSnippet: "`PodRepEarnings (rep_id VARCHAR(16) PRIMARY KEY, pod_id VARCHAR(16), total_commission_usd DECIMAL(10,2))`",
    targetQuery: `WITH RankedEarners AS (\n  SELECT rep_id,\n         pod_id,\n         total_commission_usd,\n         DENSE_RANK() OVER (PARTITION BY pod_id ORDER BY total_commission_usd DESC) AS earnings_tier\n  FROM PodRepEarnings\n)\nSELECT rep_id,\n       pod_id,\n       total_commission_usd,\n       earnings_tier\nFROM RankedEarners\nWHERE earnings_tier <= 3\nORDER BY pod_id, earnings_tier ASC;`,
    eli5Story: "Pick all salespeople who made the top 3 commission tiers in each team. If two reps tied for 1st place, both qualify and Tier 2 remains available.",
    commonMistakes: "Using RANK() <= 3, which could drop Tier 2 reps if multiple reps tie for 1st.",
    learningOutcomes: "Deploy DENSE_RANK() to prevent bracket starvation in incentive compensation."
  },
  {
    title: "Executive Compensation Benchmarking Peer Group Spread",
    ind: "HR",
    diff: "Hard",
    table: "ExecutiveTotalComp",
    scenario: "Board compensation committees review CEO total compensation against industry peer groups, calculating both gap-skipping industry ranks and dense executive pay brackets.",
    businessObjective: "Calculate RANK(), DENSE_RANK(), and percent difference from the industry peer group median compensation.",
    schemaSnippet: "`ExecutiveTotalComp (exec_id VARCHAR(16) PRIMARY KEY, industry_sector VARCHAR(32), total_comp_usd DECIMAL(14,2))`",
    targetQuery: `SELECT exec_id,\n       industry_sector,\n       total_comp_usd,\n       DENSE_RANK() OVER (\n         PARTITION BY industry_sector \n         ORDER BY total_comp_usd DESC\n       ) AS pay_dense_bracket,\n       RANK() OVER (\n         PARTITION BY industry_sector \n         ORDER BY total_comp_usd DESC\n       ) AS pay_comp_rank,\n       ROUND((total_comp_usd - AVG(total_comp_usd) OVER (PARTITION BY industry_sector)) / \n             AVG(total_comp_usd) OVER (PARTITION BY industry_sector) * 100, 2) AS pct_above_peer_mean\nFROM ExecutiveTotalComp\nORDER BY industry_sector, pay_dense_bracket ASC;`,
    eli5Story: "Compare corporate CEO pay against rivals in the same industry. Show both their dense pay bracket, their competition rank, and what percentage above average they were paid.",
    commonMistakes: "Using a single global window instead of partitioning strictly by industry_sector, comparing tech CEOs to retail CEOs.",
    learningOutcomes: "Deliver executive compensation audit reports combining multi-rank windows with percentage delta spreads."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Cloud VM Instance Network Throughput Benchmark Ranks",
    ind: "Platforms",
    diff: "Easy",
    table: "VmInstanceThroughput",
    scenario: "Cloud architects evaluate compute instance families by ranking VM types by peak network bandwidth using DENSE_RANK().",
    businessObjective: "Rank VM instance types into network throughput tiers using DENSE_RANK().",
    schemaSnippet: "`VmInstanceThroughput (instance_family VARCHAR(24) PRIMARY KEY, peak_bandwidth_gbps INT)`",
    targetQuery: `SELECT instance_family,\n       peak_bandwidth_gbps,\n       DENSE_RANK() OVER (ORDER BY peak_bandwidth_gbps DESC) AS bandwidth_tier\nFROM VmInstanceThroughput\nORDER BY bandwidth_tier ASC;`,
    eli5Story: "Rank cloud server types by internet speed. All 100 Gbps servers get Tier 1, and 50 Gbps servers get Tier 2.",
    commonMistakes: "Using RANK() and creating gap skips that confuse customers reading cloud specifications.",
    learningOutcomes: "Create intuitive hardware specification tiers using DENSE_RANK()."
  },
  {
    title: "Database Query Cache Hit Ratio Top-3 Optimization Tiers",
    ind: "Platforms",
    diff: "Medium",
    table: "QueryCachePerformance",
    scenario: "Database tuning experts isolate highly efficient query patterns by extracting query fingerprints placing in the top 3 cache hit ratio tiers per database schema.",
    businessObjective: "Extract query patterns in the top 3 cache efficiency tiers using DENSE_RANK().",
    schemaSnippet: "`QueryCachePerformance (fingerprint_id VARCHAR(32) PRIMARY KEY, schema_name VARCHAR(24), cache_hits BIGINT, total_executions BIGINT)`",
    targetQuery: `WITH CacheHitRanks AS (\n  SELECT fingerprint_id,\n         schema_name,\n         cache_hits,\n         total_executions,\n         ROUND((cache_hits::DECIMAL / total_executions) * 100, 2) AS hit_ratio_pct,\n         DENSE_RANK() OVER (\n           PARTITION BY schema_name \n           ORDER BY (cache_hits::DECIMAL / total_executions) DESC\n         ) AS hit_tier\n  FROM QueryCachePerformance\n  WHERE total_executions >= 1000\n)\nSELECT fingerprint_id,\n       schema_name,\n       hit_ratio_pct,\n       hit_tier\nFROM CacheHitRanks\nWHERE hit_tier <= 3\nORDER BY schema_name, hit_tier ASC;`,
    eli5Story: "Find the SQL queries that get their answers from memory cache most often. Pluck out all queries that belong to the top 3 best cache tiers in each database.",
    commonMistakes: "Omitting the execution threshold filter, allowing a query run once that hit the cache (100% hit ratio) to beat a query run a million times with a 99.9% ratio.",
    learningOutcomes: "Combine high-volume statistical gating with dense window rank filtering."
  },
  {
    title: "Distributed Storage Shard Read Latency Congestion Leaderboard",
    ind: "Platforms",
    diff: "Hard",
    table: "StorageShardMetrics",
    scenario: "Distributed filesystem engineers detect hot storage shards by ranking shards by p99 read latency, computing both competition rank gaps and dense throttling tiers.",
    businessObjective: "Compute RANK(), DENSE_RANK(), and variance from cluster mean read latency across storage shards.",
    schemaSnippet: "`StorageShardMetrics (shard_id VARCHAR(32) PRIMARY KEY, cluster_id VARCHAR(16), p99_read_ms INT)`",
    targetQuery: `SELECT shard_id,\n       cluster_id,\n       p99_read_ms,\n       DENSE_RANK() OVER (\n         PARTITION BY cluster_id \n         ORDER BY p99_read_ms DESC\n       ) AS throttling_dense_tier,\n       RANK() OVER (\n         PARTITION BY cluster_id \n         ORDER BY p99_read_ms DESC\n       ) AS throttling_comp_rank,\n       p99_read_ms - ROUND(AVG(p99_read_ms) OVER (PARTITION BY cluster_id), 0) AS latency_excess_ms\nFROM StorageShardMetrics\nORDER BY cluster_id, throttling_dense_tier ASC;`,
    eli5Story: "Find which storage disk shards are bottlenecking a database cluster. Calculate their dense throttling tier, competition rank, and how many extra milliseconds of delay they add compared to the cluster average.",
    commonMistakes: "Using a global average instead of partitioning by cluster_id, blending fast NVMe SSD clusters with slow magnetic tape clusters.",
    learningOutcomes: "Evaluate distributed cluster storage hot-spots using multi-rank analytical projections."
  }
];
