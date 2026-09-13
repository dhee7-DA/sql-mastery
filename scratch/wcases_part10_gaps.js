// =============================================================================
// SECTION 9 - PART 10: GAPS-AND-ISLANDS & DYNAMIC SESSIONS (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: date - row_number islands, Lag flags + running sums, consecutive streaks, 30m idle sessionization
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Credit Card Continuous Daily Active Spending Streak Identification",
    ind: "Fintech",
    diff: "Easy",
    table: "CardDailySpendFlags",
    scenario: "Retail bank gamified reward programs identify cardholders with unbroken daily spending streaks by calculating consecutive calendar days of card usage.",
    businessObjective: "Group consecutive transaction dates into distinct streak islands using the date - ROW_NUMBER() technique.",
    schemaSnippet: "`CardDailySpendFlags (cardholder_id VARCHAR(24), spend_date DATE)`",
    targetQuery: `WITH DistinctDailySpends AS (\n  SELECT DISTINCT cardholder_id, spend_date\n  FROM CardDailySpendFlags\n),\nIslandAnchors AS (\n  SELECT cardholder_id,\n         spend_date,\n         (spend_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY cardholder_id \n           ORDER BY spend_date ASC\n         ) AS INT)) AS streak_group_id\n  FROM DistinctDailySpends\n)\nSELECT cardholder_id,\n       streak_group_id,\n       MIN(spend_date) AS streak_start_date,\n       MAX(spend_date) AS streak_end_date,\n       COUNT(*) AS consecutive_days_streak\nFROM IslandAnchors\nGROUP BY cardholder_id, streak_group_id\nHAVING COUNT(*) >= 3\nORDER BY cardholder_id, streak_start_date ASC;`,
    eli5Story: "Both the calendar date and the row number count up by 1 every day (+1 date, +1 row). If you subtract them, the difference stays constant during a continuous streak, grouping unbroken days together.",
    commonMistakes: "Failing to deduplicate to 1 row per day before computing ROW_NUMBER(), which distorts the streak math if a customer swipes twice in one day.",
    learningOutcomes: "Master the classic Gaps-and-Islands algebraic invariant (date - row_number) technique."
  },
  {
    title: "Stock Market Trading Session Price Inactivity Island Detection",
    ind: "Fintech",
    diff: "Medium",
    table: "IlliquidBondTradeQuotes",
    scenario: "Fixed income trading compliance monitors detect periods of trading illiquidity by grouping consecutive trading days where a corporate bond experienced zero quote updates.",
    businessObjective: "Detect consecutive zero-trade day islands and calculate the duration of each illiquidity freeze.",
    schemaSnippet: "`IlliquidBondTradeQuotes (cusip VARCHAR(12), trade_date DATE, quote_count INT)`",
    targetQuery: `WITH ZeroQuoteDays AS (\n  SELECT cusip,\n         trade_date,\n         (trade_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY cusip \n           ORDER BY trade_date ASC\n         ) AS INT)) AS freeze_island_id\n  FROM IlliquidBondTradeQuotes\n  WHERE quote_count = 0\n)\nSELECT cusip,\n       MIN(trade_date) AS freeze_start_date,\n       MAX(trade_date) AS freeze_end_date,\n       COUNT(*) AS consecutive_dormant_days\nFROM ZeroQuoteDays\nGROUP BY cusip, freeze_island_id\nHAVING COUNT(*) >= 5\nORDER BY cusip, freeze_start_date ASC;`,
    eli5Story: "Filter for days with 0 trades. Subtract the row number from the date to group consecutive dead days into islands, and flag bonds frozen for 5 or more days.",
    commonMistakes: "Filtering quote_count = 0 after row numbering; filtering must occur before row numbering to only number the inactive days.",
    learningOutcomes: "Filter state criteria before assigning sequence keys to group condition-specific islands."
  },
  {
    title: "Algorithmic Market Making Dynamic 15-Minute Inactivity Sessionization",
    ind: "Fintech",
    diff: "Hard",
    table: "ExchangeOrderActivity",
    scenario: "High-frequency trading compliance officers segment trader activity into distinct trading bursts, defining a new burst session whenever the time gap between consecutive orders exceeds 15 minutes.",
    businessObjective: "Create dynamic session IDs using LAG() inactivity flags and cumulative running SUM() windows.",
    schemaSnippet: "`ExchangeOrderActivity (trader_id VARCHAR(24), order_id VARCHAR(32), order_time TIMESTAMP)`",
    targetQuery: `WITH SessionFlags AS (\n  SELECT trader_id,\n         order_id,\n         order_time,\n         CASE WHEN EXTRACT(EPOCH FROM (order_time - LAG(order_time, 1) OVER (\n           PARTITION BY trader_id \n           ORDER BY order_time ASC\n         ))) > 900 THEN 1 ELSE 0 END AS is_new_session\n  FROM ExchangeOrderActivity\n),\nSessionAssignments AS (\n  SELECT trader_id,\n         order_id,\n         order_time,\n         SUM(is_new_session) OVER (\n           PARTITION BY trader_id \n           ORDER BY order_time ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS session_id\n  FROM SessionFlags\n)\nSELECT trader_id,\n       session_id,\n       MIN(order_time) AS session_start_time,\n       MAX(order_time) AS session_end_time,\n       COUNT(*) AS orders_in_session,\n       ROUND(EXTRACT(EPOCH FROM (MAX(order_time) - MIN(order_time))) / 60, 1) AS session_duration_minutes\nFROM SessionAssignments\nGROUP BY trader_id, session_id\nORDER BY trader_id, session_start_time ASC;`,
    eli5Story: "Check the time gap to the prior order with LAG. If the gap is bigger than 15 minutes, raise a flag (1). Then keep a running sum of flags to automatically increment session IDs (0, 0, 1, 1, 2...).",
    commonMistakes: "Using default frames in the running sum, which causes identical timestamps to merge.",
    learningOutcomes: "Master two-stage dynamic sessionization combining LAG() step-detection with running SUM() grouping."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "SaaS User Continuous Daily Login Streak Gamification",
    ind: "SaaS",
    diff: "Easy",
    table: "UserDailyLoginAudits",
    scenario: "Product gamification engines reward users who maintain consecutive daily login streaks (e.g. Duolingo-style streak badges) by calculating unbroken login streaks.",
    businessObjective: "Group consecutive login dates into streak islands and extract the user's longest historical streak.",
    schemaSnippet: "`UserDailyLoginAudits (user_id VARCHAR(24), login_date DATE)`",
    targetQuery: `WITH DistinctLogins AS (\n  SELECT DISTINCT user_id, login_date\n  FROM UserDailyLoginAudits\n),\nStreakIslands AS (\n  SELECT user_id,\n         login_date,\n         (login_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY user_id \n           ORDER BY login_date ASC\n         ) AS INT)) AS streak_group\n  FROM DistinctLogins\n)\nSELECT user_id,\n       MIN(login_date) AS streak_start,\n       MAX(login_date) AS streak_end,\n       COUNT(*) AS streak_length_days\nFROM StreakIslands\nGROUP BY user_id, streak_group\nORDER BY user_id, streak_length_days DESC;`,
    eli5Story: "Subtract the row number from each login date. If someone logged in Monday, Tuesday, and Wednesday, the subtraction gives the exact same anchor date, grouping their 3-day streak.",
    commonMistakes: "Forgetting to deduplicate multiple logins on the same day with DISTINCT before calculating row numbers.",
    learningOutcomes: "Build customer engagement streak engines using date-difference invariant grouping."
  },
  {
    title: "SaaS Platform Production Outage Incident Consecutive Downtime Windows",
    ind: "SaaS",
    diff: "Medium",
    table: "ServiceHealthHourlyPings",
    scenario: "Site reliability engineering managers audit customer SLA credits by detecting consecutive hours of service degradation and calculating the duration of each distinct outage incident.",
    businessObjective: "Group consecutive degraded hours into discrete incident islands and calculate outage durations.",
    schemaSnippet: "`ServiceHealthHourlyPings (service_name VARCHAR(32), ping_hour TIMESTAMP, status VARCHAR(16))`",
    targetQuery: `WITH OutageHours AS (\n  SELECT service_name,\n         ping_hour,\n         ROW_NUMBER() OVER (\n           PARTITION BY service_name \n           ORDER BY ping_hour ASC\n         ) AS rn\n  FROM ServiceHealthHourlyPings\n  WHERE status = 'DEGRADED'\n),\nOutageIslands AS (\n  SELECT service_name,\n         ping_hour,\n         (ping_hour - (rn * INTERVAL '1 HOUR')) AS incident_anchor\n  FROM OutageHours\n)\nSELECT service_name,\n       MIN(ping_hour) AS outage_start,\n       MAX(ping_hour) AS outage_end,\n       COUNT(*) AS outage_duration_hours\nFROM OutageIslands\nGROUP BY service_name, incident_anchor\nORDER BY service_name, outage_start ASC;`,
    eli5Story: "Filter for hours when servers were down. Subtract (row_number * 1 hour) from the clock time. All consecutive down hours share the same incident anchor date.",
    commonMistakes: "Subtracting plain integers from timestamps instead of using `INTERVAL '1 HOUR'`.",
    learningOutcomes: "Apply timestamp interval subtraction to group temporal outage islands."
  },
  {
    title: "Web Analytics Dynamic 30-Minute Inactivity User Sessionization",
    ind: "SaaS",
    diff: "Hard",
    table: "UserWebClickstream",
    scenario: "Product analytics platforms group raw clickstream events into web browsing sessions, defining a new session whenever a user is inactive for more than 30 minutes.",
    businessObjective: "Assign session IDs using LAG() 30-minute idle threshold flags and cumulative running SUM() windows.",
    schemaSnippet: "`UserWebClickstream (event_id BIGINT PRIMARY KEY, user_id VARCHAR(24), page_url VARCHAR(128), click_time TIMESTAMP)`",
    targetQuery: `WITH InactivityFlags AS (\n  SELECT event_id,\n         user_id,\n         page_url,\n         click_time,\n         CASE WHEN EXTRACT(EPOCH FROM (click_time - LAG(click_time, 1) OVER (\n           PARTITION BY user_id \n           ORDER BY click_time ASC\n         ))) > 1800 OR LAG(click_time, 1) OVER (\n           PARTITION BY user_id \n           ORDER BY click_time ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_session_flag\n  FROM UserWebClickstream\n),\nSessionizedClicks AS (\n  SELECT event_id,\n         user_id,\n         page_url,\n         click_time,\n         SUM(new_session_flag) OVER (\n           PARTITION BY user_id \n           ORDER BY click_time ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS session_id\n  FROM InactivityFlags\n)\nSELECT user_id,\n       session_id,\n       MIN(click_time) AS session_start,\n       MAX(click_time) AS session_end,\n       COUNT(*) AS total_clicks,\n       ROUND(EXTRACT(EPOCH FROM (MAX(click_time) - MIN(click_time))) / 60, 1) AS session_duration_minutes\nFROM SessionizedClicks\nGROUP BY user_id, session_id\nORDER BY user_id, session_start ASC;`,
    eli5Story: "If 30 minutes pass between clicks, raise a 'new session' flag. Add up the flags as you go down the page (1, 1, 2, 2, 3...) to automatically assign unique session numbers.",
    commonMistakes: "Failing to handle the very first event (where LAG is NULL); the first event must be assigned a flag of 1 to initialize session #1.",
    learningOutcomes: "Build standard web sessionization engines handling initial-row null boundaries."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Store Consecutive Days Out-of-Stock Inventory Gap Analysis",
    ind: "Retail",
    diff: "Easy",
    table: "DailyStoreSkuStock",
    scenario: "Supermarket supply chain auditors identify recurring inventory stockouts by grouping consecutive days where a SKU had zero on-shelf stock.",
    businessObjective: "Group consecutive zero-stock days into islands using date - row_number.",
    schemaSnippet: "`DailyStoreSkuStock (store_id VARCHAR(16), sku VARCHAR(24), stock_date DATE, on_shelf_units INT)`",
    targetQuery: `WITH OutOfStockDays AS (\n  SELECT store_id,\n         sku,\n         stock_date,\n         (stock_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY store_id, sku \n           ORDER BY stock_date ASC\n         ) AS INT)) AS stockout_island_id\n  FROM DailyStoreSkuStock\n  WHERE on_shelf_units = 0\n)\nSELECT store_id,\n       sku,\n       MIN(stock_date) AS stockout_start,\n       MAX(stock_date) AS stockout_end,\n       COUNT(*) AS days_out_of_stock\nFROM OutOfStockDays\nGROUP BY store_id, sku, stockout_island_id\nHAVING COUNT(*) >= 3\nORDER BY store_id, sku, stockout_start ASC;`,
    eli5Story: "Find every day an item was completely sold out. Group consecutive missing days together and flag products that were missing from shelves for 3 or more days in a row.",
    commonMistakes: "Omitting the store_id and sku composite partition, which blends stockout dates across different items and stores.",
    learningOutcomes: "Identify localized operational stockout duration islands."
  },
  {
    title: "Retail Cashier Consecutive Short-Drawer Cash Discrepancy Streaks",
    ind: "Retail",
    diff: "Medium",
    table: "CashierShiftAudits",
    scenario: "Loss prevention officers investigate internal cash drawer theft by detecting cashiers who had negative cash drawer discrepancies on 3 or more consecutive working shifts.",
    businessObjective: "Group consecutive short-drawer shifts into islands and identify repeat cashier variance streaks.",
    schemaSnippet: "`CashierShiftAudits (cashier_id VARCHAR(16), shift_seq INT, drawer_variance DECIMAL(8,2))`",
    targetQuery: `WITH ShortShifts AS (\n  SELECT cashier_id,\n         shift_seq,\n         drawer_variance,\n         (shift_seq - ROW_NUMBER() OVER (\n           PARTITION BY cashier_id \n           ORDER BY shift_seq ASC\n         )) AS short_streak_group\n  FROM CashierShiftAudits\n  WHERE drawer_variance < -5.00\n)\nSELECT cashier_id,\n       MIN(shift_seq) AS start_shift_seq,\n       MAX(shift_seq) AS end_shift_seq,\n       COUNT(*) AS consecutive_short_shifts,\n       ROUND(SUM(drawer_variance), 2) AS total_cash_missing\nFROM ShortShifts\nGROUP BY cashier_id, short_streak_group\nHAVING COUNT(*) >= 3\nORDER BY cashier_id, start_shift_seq ASC;`,
    eli5Story: "Look for shifts where a cashier's register was missing money. Subtract the row number from the shift number to group consecutive missing-money shifts into a theft investigation streak.",
    commonMistakes: "Using calendar dates instead of shift_seq, which breaks streaks if a cashier doesn't work on weekends.",
    learningOutcomes: "Apply integer-based sequence keys for non-calendar gaps-and-islands grouping."
  },
  {
    title: "E-Commerce Shopping Cart Inactivity 20-Minute Abandonment Sessionization",
    ind: "Retail",
    diff: "Hard",
    table: "CartActionEvents",
    scenario: "E-commerce checkout optimization teams group cart modifications into browsing shopping sessions, defining cart abandonment whenever 20 minutes pass without cart activity.",
    businessObjective: "Generate shopping session IDs using LAG() idle duration thresholds and cumulative running SUM() windows.",
    schemaSnippet: "`CartActionEvents (action_id BIGINT PRIMARY KEY, customer_id VARCHAR(24), action_type VARCHAR(16), action_time TIMESTAMP)`",
    targetQuery: `WITH CartIdleFlags AS (\n  SELECT action_id,\n         customer_id,\n         action_type,\n         action_time,\n         CASE WHEN EXTRACT(EPOCH FROM (action_time - LAG(action_time, 1) OVER (\n           PARTITION BY customer_id \n           ORDER BY action_time ASC\n         ))) > 1200 OR LAG(action_time, 1) OVER (\n           PARTITION BY customer_id \n           ORDER BY action_time ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_cart_session\n  FROM CartActionEvents\n),\nCartSessions AS (\n  SELECT action_id,\n         customer_id,\n         action_type,\n         action_time,\n         SUM(new_cart_session) OVER (\n           PARTITION BY customer_id \n           ORDER BY action_time ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS cart_session_id\n  FROM CartIdleFlags\n)\nSELECT customer_id,\n       cart_session_id,\n       MIN(action_time) AS session_start,\n       MAX(action_time) AS session_end,\n       COUNT(*) AS total_cart_actions,\n       MAX(CASE WHEN action_type = 'CHECKOUT_COMPLETE' THEN 1 ELSE 0 END) AS was_purchased\nFROM CartSessions\nGROUP BY customer_id, cart_session_id\nORDER BY customer_id, session_start ASC;`,
    eli5Story: "If a shopper doesn't touch their cart for 20 minutes, treat their next click as a brand new shopping trip. Keep a running sum of session flags to group actions into trips.",
    commonMistakes: "Forgetting to check if the session ended in a purchase using conditional aggregation MAX(CASE WHEN...).",
    learningOutcomes: "Synthesize shopping sessionization with conversion outcome tagging."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Patient Medication Adherence Consecutive Daily Pill-Taking Streak",
    ind: "Healthcare",
    diff: "Easy",
    table: "SmartPillboxLogs",
    scenario: "Digital therapeutic mobile apps track chronic diabetes medication adherence by grouping consecutive calendar days where a smart pillbox was opened.",
    businessObjective: "Identify continuous daily medication adherence streaks using date - row_number.",
    schemaSnippet: "`SmartPillboxLogs (patient_id VARCHAR(24), intake_date DATE)`",
    targetQuery: `WITH DistinctIntakes AS (\n  SELECT DISTINCT patient_id, intake_date\n  FROM SmartPillboxLogs\n),\nAdherenceIslands AS (\n  SELECT patient_id,\n         intake_date,\n         (intake_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY patient_id \n           ORDER BY intake_date ASC\n         ) AS INT)) AS adherence_group\n  FROM DistinctIntakes\n)\nSELECT patient_id,\n       MIN(intake_date) AS streak_start,\n       MAX(intake_date) AS streak_end,\n       COUNT(*) AS days_streak\nFROM AdherenceIslands\nGROUP BY patient_id, adherence_group\nORDER BY patient_id, days_streak DESC;`,
    eli5Story: "Subtract the row number from each day the patient took their medicine. Consecutive days give the same anchor date, measuring their adherence streak.",
    commonMistakes: "Failing to deduplicate multiple openings in a single day, which distorts the row numbering sequence.",
    learningOutcomes: "Measure medical therapy adherence using gaps-and-islands grouping."
  },
  {
    title: "ICU Patient Continuous Mechanical Ventilation Episode Grouping",
    ind: "Healthcare",
    diff: "Medium",
    table: "VentilatorHourlyStatus",
    scenario: "Hospital infection control teams calculate Ventilator-Associated Pneumonia (VAP) risk by grouping consecutive hours of invasive mechanical ventilation into distinct ventilation episodes.",
    businessObjective: "Group consecutive active ventilation hours into discrete clinical episodes.",
    schemaSnippet: "`VentilatorHourlyStatus (patient_id VARCHAR(24), recorded_hour TIMESTAMP, is_ventilated BOOLEAN)`",
    targetQuery: `WITH ActiveVentHours AS (\n  SELECT patient_id,\n         recorded_hour,\n         ROW_NUMBER() OVER (\n           PARTITION BY patient_id \n           ORDER BY recorded_hour ASC\n         ) AS rn\n  FROM VentilatorHourlyStatus\n  WHERE is_ventilated = TRUE\n),\nVentEpisodes AS (\n  SELECT patient_id,\n         recorded_hour,\n         (recorded_hour - (rn * INTERVAL '1 HOUR')) AS episode_anchor\n  FROM ActiveVentHours\n)\nSELECT patient_id,\n       MIN(recorded_hour) AS intubation_start,\n       MAX(recorded_hour) AS extubation_end,\n       COUNT(*) AS ventilation_hours\nFROM VentEpisodes\nGROUP BY patient_id, episode_anchor\nORDER BY patient_id, intubation_start ASC;`,
    eli5Story: "Group uninterrupted hours on a breathing machine into clinical episodes by subtracting (row_number * 1 hour) from the timestamp.",
    commonMistakes: "Failing to filter is_ventilated = TRUE before computing row numbers, causing extubated hours to be numbered.",
    learningOutcomes: "Group continuous physiological treatment episodes using timestamp interval math."
  },
  {
    title: "Emergency Department Clinical Encounter 2-Hour Inactivity Sessionization",
    ind: "Healthcare",
    diff: "Hard",
    table: "ErPatientOrderLogs",
    scenario: "Hospital operational researchers analyze emergency department throughput by grouping lab and medication orders into distinct clinical treatment episodes separated by 2 hours of inactivity.",
    businessObjective: "Assign clinical encounter episode IDs using LAG() idle thresholds and cumulative running SUM() windows.",
    schemaSnippet: "`ErPatientOrderLogs (order_id VARCHAR(36) PRIMARY KEY, patient_id VARCHAR(24), order_type VARCHAR(24), ordered_at TIMESTAMP)`",
    targetQuery: `WITH OrderGaps AS (\n  SELECT order_id,\n         patient_id,\n         order_type,\n         ordered_at,\n         CASE WHEN EXTRACT(EPOCH FROM (ordered_at - LAG(ordered_at, 1) OVER (\n           PARTITION BY patient_id \n           ORDER BY ordered_at ASC\n         ))) > 7200 OR LAG(ordered_at, 1) OVER (\n           PARTITION BY patient_id \n           ORDER BY ordered_at ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_episode_flag\n  FROM ErPatientOrderLogs\n),\nEpisodeAssignments AS (\n  SELECT order_id,\n         patient_id,\n         order_type,\n         ordered_at,\n         SUM(new_episode_flag) OVER (\n           PARTITION BY patient_id \n           ORDER BY ordered_at ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS clinical_episode_id\n  FROM OrderGaps\n)\nSELECT patient_id,\n       clinical_episode_id,\n       MIN(ordered_at) AS episode_start,\n       MAX(ordered_at) AS episode_end,\n       COUNT(*) AS total_orders,\n       ROUND(EXTRACT(EPOCH FROM (MAX(ordered_at) - MIN(ordered_at))) / 3600, 2) AS episode_duration_hours\nFROM EpisodeAssignments\nGROUP BY patient_id, clinical_episode_id\nORDER BY patient_id, episode_start ASC;`,
    eli5Story: "When doctors order tests and medicines for an ER patient, group orders together into one medical episode. If 2 hours pass with no orders, treat subsequent orders as a new clinical phase.",
    commonMistakes: "Omitting the patient_id partition, grouping orders from different emergency patients together.",
    learningOutcomes: "Structure clinical workflow sessionization models using multi-hour idle gap thresholds."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Freight Truck Driver Continuous Driving Duty Hour Streaks",
    ind: "Logistics",
    diff: "Easy",
    table: "DriverDutyStatusLogs",
    scenario: "Federal Motor Carrier Safety Administration (FMCSA) compliance systems monitor Hours of Service (HOS) rules by calculating consecutive continuous driving hours without rest.",
    businessObjective: "Group consecutive driving hours into duty streaks using hour - row_number.",
    schemaSnippet: "`DriverDutyStatusLogs (driver_id VARCHAR(16), log_hour TIMESTAMP, duty_status VARCHAR(16))`",
    targetQuery: `WITH DrivingHours AS (\n  SELECT driver_id,\n         log_hour,\n         ROW_NUMBER() OVER (\n           PARTITION BY driver_id \n           ORDER BY log_hour ASC\n         ) AS rn\n  FROM DriverDutyStatusLogs\n  WHERE duty_status = 'DRIVING'\n),\nDrivingStreaks AS (\n  SELECT driver_id,\n         log_hour,\n         (log_hour - (rn * INTERVAL '1 HOUR')) AS streak_anchor\n  FROM DrivingHours\n)\nSELECT driver_id,\n       MIN(log_hour) AS driving_started,\n       MAX(log_hour) AS driving_stopped,\n       COUNT(*) AS continuous_driving_hours\nFROM DrivingStreaks\nGROUP BY driver_id, streak_anchor\nHAVING COUNT(*) > 8\nORDER BY driver_id, driving_started ASC;`,
    eli5Story: "Filter for hours when a trucker was driving. Subtract (row_number * 1 hour) from the clock time to group consecutive driving hours, and flag drivers who drove for more than 8 hours without a break.",
    commonMistakes: "Failing to filter duty_status = 'DRIVING' before row numbering, which groups off-duty rest hours into the driving streak.",
    learningOutcomes: "Enforce regulatory compliance rules using chronological activity streak grouping."
  },
  {
    title: "Cold-Chain Reefer Continuous Temperature Excursion Streaks",
    ind: "Logistics",
    diff: "Medium",
    table: "ReeferHourlyThermalLogs",
    scenario: "Pharmaceutical cold-chain logistics teams identify spoiled cargo by detecting consecutive hours where refrigerated trailer temperatures exceeded safe thresholds (> 4°C).",
    businessObjective: "Group consecutive excursion hours into violation islands and calculate cumulative heat exposure duration.",
    schemaSnippet: "`ReeferHourlyThermalLogs (shipment_id VARCHAR(32), log_hour TIMESTAMP, temp_c DECIMAL(4,1))`",
    targetQuery: `WITH ExcursionHours AS (\n  SELECT shipment_id,\n         log_hour,\n         temp_c,\n         ROW_NUMBER() OVER (\n           PARTITION BY shipment_id \n           ORDER BY log_hour ASC\n         ) AS rn\n  FROM ReeferHourlyThermalLogs\n  WHERE temp_c > 4.0\n),\nExcursionIslands AS (\n  SELECT shipment_id,\n         log_hour,\n         temp_c,\n         (log_hour - (rn * INTERVAL '1 HOUR')) AS excursion_anchor\n  FROM ExcursionHours\n)\nSELECT shipment_id,\n       MIN(log_hour) AS excursion_start,\n       MAX(log_hour) AS excursion_end,\n       COUNT(*) AS hours_overheated,\n       ROUND(MAX(temp_c), 1) AS peak_temp_c\nFROM ExcursionIslands\nGROUP BY shipment_id, excursion_anchor\nHAVING COUNT(*) >= 2\nORDER BY shipment_id, excursion_start ASC;`,
    eli5Story: "Find every hour a vaccine cooler got warmer than 4°C. Group consecutive warm hours together and flag any cooler that overheated for 2 or more hours in a row.",
    commonMistakes: "Omitting shipment_id from PARTITION BY, combining excursion hours from two different vaccine shipments.",
    learningOutcomes: "Detect regulatory quality violations using threshold-gated temporal island analysis."
  },
  {
    title: "Warehouse Automated Guided Vehicle AGV Inactivity Idle Sessionization",
    ind: "Logistics",
    diff: "Hard",
    table: "AgvTelemetryEvents",
    scenario: "Warehouse robotics fleet managers monitor automated guided vehicle (AGV) utilization by grouping robotic moves into mission sessions, defining idle waiting whenever an AGV is stationary for more than 10 minutes.",
    businessObjective: "Assign AGV operating mission IDs using LAG() 10-minute idle flags and cumulative running SUM() windows.",
    schemaSnippet: "`AgvTelemetryEvents (event_id BIGINT PRIMARY KEY, agv_id VARCHAR(16), event_type VARCHAR(16), event_time TIMESTAMP)`",
    targetQuery: `WITH AgvIdleFlags AS (\n  SELECT event_id,\n         agv_id,\n         event_type,\n         event_time,\n         CASE WHEN EXTRACT(EPOCH FROM (event_time - LAG(event_time, 1) OVER (\n           PARTITION BY agv_id \n           ORDER BY event_time ASC\n         ))) > 600 OR LAG(event_time, 1) OVER (\n           PARTITION BY agv_id \n           ORDER BY event_time ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_mission_flag\n  FROM AgvTelemetryEvents\n),\nAgvMissions AS (\n  SELECT event_id,\n         agv_id,\n         event_type,\n         event_time,\n         SUM(new_mission_flag) OVER (\n           PARTITION BY agv_id \n           ORDER BY event_time ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS mission_id\n  FROM AgvIdleFlags\n)\nSELECT agv_id,\n       mission_id,\n       MIN(event_time) AS mission_start,\n       MAX(event_time) AS mission_end,\n       COUNT(*) AS waypoints_completed,\n       ROUND(EXTRACT(EPOCH FROM (MAX(event_time) - MIN(event_time))) / 60, 1) AS mission_minutes\nFROM AgvMissions\nGROUP BY agv_id, mission_id\nORDER BY agv_id, mission_start ASC;`,
    eli5Story: "When a factory robot moves boxes, group its movements into one mission. If the robot sits still for more than 10 minutes waiting for cargo, treat its next move as a brand new mission.",
    commonMistakes: "Using default frames in the running sum, which can cause duplicate events to receive identical mission numbers.",
    learningOutcomes: "Model autonomous fleet robotics missions using inactivity window sessionization."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Video Game Daily Active Player Login Streak Milestone Tiers",
    ind: "Media",
    diff: "Easy",
    table: "PlayerDailyGameLogins",
    scenario: "Mobile game live-ops teams award daily login retention bonuses by calculating consecutive active calendar days played per gamer.",
    businessObjective: "Calculate player consecutive daily login streaks using date - row_number.",
    schemaSnippet: "`PlayerDailyGameLogins (player_id VARCHAR(24), game_date DATE)`",
    targetQuery: `WITH DistinctPlayerDays AS (\n  SELECT DISTINCT player_id, game_date\n  FROM PlayerDailyGameLogins\n),\nPlayerStreakIslands AS (\n  SELECT player_id,\n         game_date,\n         (game_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY player_id \n           ORDER BY game_date ASC\n         ) AS INT)) AS streak_island_id\n  FROM DistinctPlayerDays\n)\nSELECT player_id,\n       MIN(game_date) AS streak_start_date,\n       MAX(game_date) AS streak_end_date,\n       COUNT(*) AS consecutive_days_played\nFROM PlayerStreakIslands\nGROUP BY player_id, streak_island_id\nHAVING COUNT(*) >= 7\nORDER BY player_id, streak_start_date ASC;`,
    eli5Story: "Subtract the row number from each day someone played a video game. If they played every single day for a week, all 7 days share the exact same subtraction anchor, proving a 7-day streak.",
    commonMistakes: "Forgetting DISTINCT, which causes a gamer who launched the app 3 times on Saturday to break the streak math.",
    learningOutcomes: "Calculate video game player retention streaks using gaps-and-islands grouping."
  },
  {
    title: "Music Streaming Continuous Listening Radio Mode Islands",
    ind: "Media",
    diff: "Medium",
    table: "ContinuousTrackPlays",
    scenario: "Music streaming platforms analyze uninterrupted background listening habits by detecting consecutive song plays uninterrupted by skips or manual pauses.",
    businessObjective: "Group consecutive uninterrupted track plays into continuous listening sessions using sequence math.",
    schemaSnippet: "`ContinuousTrackPlays (user_id VARCHAR(24), play_seq INT, was_skipped BOOLEAN)`",
    targetQuery: `WITH UnskippedPlays AS (\n  SELECT user_id,\n         play_seq,\n         (play_seq - ROW_NUMBER() OVER (\n           PARTITION BY user_id \n           ORDER BY play_seq ASC\n         )) AS unskipped_island\n  FROM ContinuousTrackPlays\n  WHERE was_skipped = FALSE\n)\nSELECT user_id,\n       MIN(play_seq) AS session_start_seq,\n       MAX(play_seq) AS session_end_seq,\n       COUNT(*) AS consecutive_unskipped_songs\nFROM UnskippedPlays\nGROUP BY user_id, unskipped_island\nHAVING COUNT(*) >= 5\nORDER BY user_id, session_start_seq ASC;`,
    eli5Story: "Filter for songs the user listened to without skipping. Subtract the row number from the track number to group unbroken listening streaks together.",
    commonMistakes: "Filtering was_skipped = FALSE after assigning row numbers, which would assign row numbers to skipped songs.",
    learningOutcomes: "Isolate non-skipped media engagement streaks using sequence-difference invariants."
  },
  {
    title: "OTT Streaming Video Binge Session 45-Minute Inactivity Sessionization",
    ind: "Media",
    diff: "Hard",
    table: "VideoPlayTelemetry",
    scenario: "Streaming platform data science teams group video viewing events into binge sessions, defining a new binge session whenever a user is inactive for more than 45 minutes.",
    businessObjective: "Generate streaming binge session IDs using LAG() idle duration thresholds and cumulative running SUM() windows.",
    schemaSnippet: "`VideoPlayTelemetry (event_id BIGINT PRIMARY KEY, user_id VARCHAR(24), video_id VARCHAR(24), play_started_at TIMESTAMP)`",
    targetQuery: `WITH InactivityFlags AS (\n  SELECT event_id,\n         user_id,\n         video_id,\n         play_started_at,\n         CASE WHEN EXTRACT(EPOCH FROM (play_started_at - LAG(play_started_at, 1) OVER (\n           PARTITION BY user_id \n           ORDER BY play_started_at ASC\n         ))) > 2700 OR LAG(play_started_at, 1) OVER (\n           PARTITION BY user_id \n           ORDER BY play_started_at ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_binge_flag\n  FROM VideoPlayTelemetry\n),\nBingeSessions AS (\n  SELECT event_id,\n         user_id,\n         video_id,\n         play_started_at,\n         SUM(new_binge_flag) OVER (\n           PARTITION BY user_id \n           ORDER BY play_started_at ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS binge_session_id\n  FROM InactivityFlags\n)\nSELECT user_id,\n       binge_session_id,\n       MIN(play_started_at) AS binge_start,\n       MAX(play_started_at) AS binge_end,\n       COUNT(*) AS videos_watched,\n       ROUND(EXTRACT(EPOCH FROM (MAX(play_started_at) - MIN(play_started_at))) / 3600, 2) AS binge_duration_hours\nFROM BingeSessions\nGROUP BY user_id, binge_session_id\nORDER BY user_id, binge_start ASC;`,
    eli5Story: "When someone watches 4 episodes of a TV show in a row, group them into one binge session. If they pause and come back 45 minutes later, treat it as a new binge session.",
    commonMistakes: "Failing to handle the initial row where LAG is NULL, causing the first episode to be dropped from session #1.",
    learningOutcomes: "Build commercial streaming media binge sessionization engines."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Firewall Consecutive Port Scan Port Number Island Detection",
    ind: "Security",
    diff: "Easy",
    table: "FirewallPortProbes",
    scenario: "Network intrusion detection systems identify sequential port sweeps by grouping consecutive targeted port numbers scanned by a single source IP address.",
    businessObjective: "Group consecutive port numbers into sweep islands using port_number - row_number.",
    schemaSnippet: "`FirewallPortProbes (source_ip VARCHAR(45), port_number INT, probe_time TIMESTAMP)`",
    targetQuery: `WITH DistinctPorts AS (\n  SELECT DISTINCT source_ip, port_number\n  FROM FirewallPortProbes\n),\nPortSweeps AS (\n  SELECT source_ip,\n         port_number,\n         (port_number - ROW_NUMBER() OVER (\n           PARTITION BY source_ip \n           ORDER BY port_number ASC\n         )) AS sweep_island_id\n  FROM DistinctPorts\n)\nSELECT source_ip,\n       MIN(port_number) AS sweep_start_port,\n       MAX(port_number) AS sweep_end_port,\n       COUNT(*) AS consecutive_ports_scanned\nFROM PortSweeps\nGROUP BY source_ip, sweep_island_id\nHAVING COUNT(*) >= 10\nORDER BY source_ip, sweep_start_port ASC;`,
    eli5Story: "If a hacker scans port 80, 81, 82, 83... subtract the row number from each port number. Consecutive ports give the same result, grouping the entire port sweep into one alert.",
    commonMistakes: "Omitting DISTINCT, which causes duplicate probes against port 80 to distort the sequential island math.",
    learningOutcomes: "Detect malicious sequential network port scans using gaps-and-islands grouping."
  },
  {
    title: "SOC SIEM Brute Force Attack Consecutive Failure Burst Islands",
    ind: "Security",
    diff: "Medium",
    table: "AuthAttemptTimeline",
    scenario: "Security analysts detect credential stuffing attacks by grouping consecutive failed login attempts on a corporate login gateway.",
    businessObjective: "Group consecutive failed authentication events into discrete attack islands.",
    schemaSnippet: "`AuthAttemptTimeline (attempt_id BIGINT PRIMARY KEY, source_ip VARCHAR(45), auth_status VARCHAR(8), event_time TIMESTAMP)`",
    targetQuery: `WITH FailedAttempts AS (\n  SELECT attempt_id,\n         source_ip,\n         event_time,\n         ROW_NUMBER() OVER (\n           PARTITION BY source_ip \n           ORDER BY event_time ASC, attempt_id ASC\n         ) AS rn\n  FROM AuthAttemptTimeline\n  WHERE auth_status = 'FAIL'\n),\nAttackIslands AS (\n  SELECT attempt_id,\n         source_ip,\n         event_time,\n         (attempt_id - rn) AS attack_burst_id\n  FROM FailedAttempts\n)\nSELECT source_ip,\n       MIN(event_time) AS burst_start,\n       MAX(event_time) AS burst_end,\n       COUNT(*) AS consecutive_failures\nFROM AttackIslands\nGROUP BY source_ip, attack_burst_id\nHAVING COUNT(*) >= 5\nORDER BY source_ip, burst_start ASC;`,
    eli5Story: "Filter for failed passwords. Subtract the row number from the attempt number to group consecutive password failures into attack bursts, flagging IPs with 5+ failures in a row.",
    commonMistakes: "Using event_time directly for integer subtraction instead of monotonic sequence IDs like attempt_id.",
    learningOutcomes: "Group consecutive cyber-attack events using sequence-minus-row-number algebra."
  },
  {
    title: "Threat Hunting Lateral Movement 1-Hour Inactivity Sessionization",
    ind: "Security",
    diff: "Hard",
    table: "NetworkLateralConnections",
    scenario: "SOC threat hunters reconstruct adversary intrusion campaigns by grouping internal SSH and RDP connections into distinct lateral movement campaigns separated by 1 hour of inactivity.",
    businessObjective: "Assign intrusion campaign IDs using LAG() idle duration thresholds and cumulative running SUM() windows.",
    schemaSnippet: "`NetworkLateralConnections (connection_id BIGINT PRIMARY KEY, source_host VARCHAR(32), dest_host VARCHAR(32), connect_time TIMESTAMP)`",
    targetQuery: `WITH ConnectionGaps AS (\n  SELECT connection_id,\n         source_host,\n         dest_host,\n         connect_time,\n         CASE WHEN EXTRACT(EPOCH FROM (connect_time - LAG(connect_time, 1) OVER (\n           PARTITION BY source_host \n           ORDER BY connect_time ASC\n         ))) > 3600 OR LAG(connect_time, 1) OVER (\n           PARTITION BY source_host \n           ORDER BY connect_time ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_campaign_flag\n  FROM NetworkLateralConnections\n),\nIntrusionCampaigns AS (\n  SELECT connection_id,\n         source_host,\n         dest_host,\n         connect_time,\n         SUM(new_campaign_flag) OVER (\n           PARTITION BY source_host \n           ORDER BY connect_time ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS campaign_id\n  FROM ConnectionGaps\n)\nSELECT source_host,\n       campaign_id,\n       MIN(connect_time) AS campaign_start,\n       MAX(connect_time) AS campaign_end,\n       COUNT(DISTINCT dest_host) AS unique_hosts_compromised,\n       COUNT(*) AS total_hops\nFROM IntrusionCampaigns\nGROUP BY source_host, campaign_id\nORDER BY source_host, campaign_start ASC;`,
    eli5Story: "Group a hacker's lateral movement jumps across servers into one campaign. If 1 hour passes with no jumps, treat the next batch of jumps as a new intrusion phase.",
    commonMistakes: "Omitting the source_host partition, blending lateral movement jumps from different compromised machines.",
    learningOutcomes: "Model cyber threat actor intrusion campaigns using temporal inactivity window sessionization."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Industrial Machine Continuous Operating Uptime Hour Streaks",
    ind: "Hardware",
    diff: "Easy",
    table: "MachineHourlyStatusTelemetry",
    scenario: "Factory maintenance engineers track equipment reliability by calculating consecutive hours of uninterrupted operating uptime for automated packaging machines.",
    businessObjective: "Group consecutive running hours into uptime islands using hour - row_number.",
    schemaSnippet: "`MachineHourlyStatusTelemetry (machine_id VARCHAR(16), log_hour TIMESTAMP, is_running BOOLEAN)`",
    targetQuery: `WITH RunningHours AS (\n  SELECT machine_id,\n         log_hour,\n         ROW_NUMBER() OVER (\n           PARTITION BY machine_id \n           ORDER BY log_hour ASC\n         ) AS rn\n  FROM MachineHourlyStatusTelemetry\n  WHERE is_running = TRUE\n),\nUptimeIslands AS (\n  SELECT machine_id,\n         log_hour,\n         (log_hour - (rn * INTERVAL '1 HOUR')) AS uptime_anchor\n  FROM RunningHours\n)\nSELECT machine_id,\n       MIN(log_hour) AS uptime_start,\n       MAX(log_hour) AS uptime_end,\n       COUNT(*) AS continuous_uptime_hours\nFROM UptimeIslands\nGROUP BY machine_id, uptime_anchor\nORDER BY machine_id, continuous_uptime_hours DESC;`,
    eli5Story: "Filter for hours when a factory machine was running smoothly. Subtract (row_number * 1 hour) from the clock time to measure unbroken uptime streaks.",
    commonMistakes: "Failing to filter is_running = TRUE before calculating row numbers, which would number stoppage hours as part of uptime.",
    learningOutcomes: "Measure industrial machine reliability using temporal uptime island grouping."
  },
  {
    title: "Solar Farm Inverter Zero-Power Darkness Inactivity Streaks",
    ind: "Hardware",
    diff: "Medium",
    table: "SolarInverterHourlyPower",
    scenario: "Renewable energy engineers detect inverter ground-fault shutdowns by grouping consecutive daytime hours where a solar inverter generated zero power.",
    businessObjective: "Group consecutive zero-power hours into failure islands and calculate duration of equipment faults.",
    schemaSnippet: "`SolarInverterHourlyPower (inverter_id VARCHAR(16), log_hour TIMESTAMP, power_kw DECIMAL(6,2))`",
    targetQuery: `WITH ZeroPowerHours AS (\n  SELECT inverter_id,\n         log_hour,\n         ROW_NUMBER() OVER (\n           PARTITION BY inverter_id \n           ORDER BY log_hour ASC\n         ) AS rn\n  FROM SolarInverterHourlyPower\n  WHERE power_kw = 0.00 AND EXTRACT(HOUR FROM log_hour) BETWEEN 9 AND 16\n),\nFaultIslands AS (\n  SELECT inverter_id,\n         log_hour,\n         (log_hour - (rn * INTERVAL '1 HOUR')) AS fault_anchor\n  FROM ZeroPowerHours\n)\nSELECT inverter_id,\n       MIN(log_hour) AS fault_start,\n       MAX(log_hour) AS fault_end,\n       COUNT(*) AS hours_offline_during_sunlight\nFROM FaultIslands\nGROUP BY inverter_id, fault_anchor\nHAVING COUNT(*) >= 2\nORDER BY inverter_id, fault_start ASC;`,
    eli5Story: "Filter for daylight hours (9 AM to 4 PM) where a solar panel generated 0 watts. Group consecutive dead hours together to catch broken solar inverters.",
    commonMistakes: "Omitting the daylight filter 'EXTRACT(HOUR FROM log_hour) BETWEEN 9 AND 16', accidentally flagging normal nighttime as equipment failure.",
    learningOutcomes: "Combine domain-specific operating window filters with gaps-and-islands temporal math."
  },
  {
    title: "IoT Environmental Sensor Sleep Cycle 15-Minute Awake Sessionization",
    ind: "Hardware",
    diff: "Hard",
    table: "LowPowerSensorPings",
    scenario: "Battery-powered IoT sensor network engineers group sensor transmissions into active operational wake cycles, defining a new wake cycle whenever a sensor sleeps for more than 15 minutes.",
    businessObjective: "Assign wake cycle IDs using LAG() idle duration thresholds and cumulative running SUM() windows.",
    schemaSnippet: "`LowPowerSensorPings (ping_id BIGINT PRIMARY KEY, sensor_id VARCHAR(24), ping_time TIMESTAMP, battery_mv INT)`",
    targetQuery: `WITH SleepGapFlags AS (\n  SELECT ping_id,\n         sensor_id,\n         ping_time,\n         battery_mv,\n         CASE WHEN EXTRACT(EPOCH FROM (ping_time - LAG(ping_time, 1) OVER (\n           PARTITION BY sensor_id \n           ORDER BY ping_time ASC\n         ))) > 900 OR LAG(ping_time, 1) OVER (\n           PARTITION BY sensor_id \n           ORDER BY ping_time ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_wake_cycle_flag\n  FROM LowPowerSensorPings\n),\nWakeCycleAssignments AS (\n  SELECT ping_id,\n         sensor_id,\n         ping_time,\n         battery_mv,\n         SUM(new_wake_cycle_flag) OVER (\n           PARTITION BY sensor_id \n           ORDER BY ping_time ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS wake_cycle_id\n  FROM SleepGapFlags\n)\nSELECT sensor_id,\n       wake_cycle_id,\n       MIN(ping_time) AS cycle_start,\n       MAX(ping_time) AS cycle_end,\n       COUNT(*) AS telemetry_pings_in_cycle,\n       MIN(battery_mv) AS min_voltage_mv\nFROM WakeCycleAssignments\nGROUP BY sensor_id, wake_cycle_id\nORDER BY sensor_id, cycle_start ASC;`,
    eli5Story: "When an IoT weather sensor wakes up from deep sleep to send data, group its pings into one wake session. If it sleeps for more than 15 minutes, start a new session.",
    commonMistakes: "Using default frames in the running sum, which causes simultaneous sensor readings to blur session IDs.",
    learningOutcomes: "Model low-power hardware duty cycles using idle gap window sessionization."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Employee Consecutive Perfect Attendance Day Streaks",
    ind: "HR",
    diff: "Easy",
    table: "EmployeeDailyBadgeSwipes",
    scenario: "Human resources teams track employee attendance awards by calculating consecutive working days where an employee badged into the office.",
    businessObjective: "Group consecutive badge swipe dates into attendance streaks using date - row_number.",
    schemaSnippet: "`EmployeeDailyBadgeSwipes (emp_id VARCHAR(16), swipe_date DATE)`",
    targetQuery: `WITH DistinctSwipes AS (\n  SELECT DISTINCT emp_id, swipe_date\n  FROM EmployeeDailyBadgeSwipes\n),\nAttendanceIslands AS (\n  SELECT emp_id,\n         swipe_date,\n         (swipe_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY emp_id \n           ORDER BY swipe_date ASC\n         ) AS INT)) AS streak_anchor\n  FROM DistinctSwipes\n)\nSELECT emp_id,\n       MIN(swipe_date) AS streak_start,\n       MAX(swipe_date) AS streak_end,\n       COUNT(*) AS consecutive_office_days\nFROM AttendanceIslands\nGROUP BY emp_id, streak_anchor\nHAVING COUNT(*) >= 10\nORDER BY emp_id, consecutive_office_days DESC;`,
    eli5Story: "Subtract the row number from each day an employee swiped their security badge. Unbroken strings of days give the same anchor date, measuring their attendance streak.",
    commonMistakes: "Failing to deduplicate multiple door swipes on the same day with DISTINCT before calculating row numbers.",
    learningOutcomes: "Measure workforce attendance streaks using date-difference invariant grouping."
  },
  {
    title: "Sales Representative Consecutive Closed-Deal Day Streaks",
    ind: "HR",
    diff: "Medium",
    table: "SalesRepresentativeDeals",
    scenario: "Sales incentive compensation directors award 'On Fire' performance bonuses by detecting sales representatives who closed deals on 3 or more consecutive calendar days.",
    businessObjective: "Group consecutive deal closing dates into streak islands and award hot-hand bonus tiers.",
    schemaSnippet: "`SalesRepresentativeDeals (deal_id VARCHAR(32) PRIMARY KEY, rep_id VARCHAR(16), close_date DATE, deal_usd DECIMAL(10,2))`",
    targetQuery: `WITH DistinctClosingDays AS (\n  SELECT DISTINCT rep_id, close_date\n  FROM SalesRepresentativeDeals\n),\nDealStreaks AS (\n  SELECT rep_id,\n         close_date,\n         (close_date - CAST(ROW_NUMBER() OVER (\n           PARTITION BY rep_id \n           ORDER BY close_date ASC\n         ) AS INT)) AS streak_group\n  FROM DistinctClosingDays\n)\nSELECT rep_id,\n       MIN(close_date) AS streak_start,\n       MAX(close_date) AS streak_end,\n       COUNT(*) AS consecutive_days_closed\nFROM DealStreaks\nGROUP BY rep_id, streak_group\nHAVING COUNT(*) >= 3\nORDER BY rep_id, consecutive_days_closed DESC;`,
    eli5Story: "Check which calendar days a salesperson closed sales. If they closed deals on Monday, Tuesday, and Wednesday, group them together as a 3-day closing streak.",
    commonMistakes: "Grouping without deduplicating multiple deals on the same day, which inflates streak days.",
    learningOutcomes: "Isolate high-momentum sales rep performance streaks using gaps-and-islands grouping."
  },
  {
    title: "Employee Hourly Shift Engagement 4-Hour Inactivity Sessionization",
    ind: "HR",
    diff: "Hard",
    table: "StaffTaskEventLogs",
    scenario: "Workforce management software analyzes remote employee work-rest cycles by grouping task completion events into working shift blocks separated by 4 hours of inactivity.",
    businessObjective: "Assign shift session IDs using LAG() idle duration thresholds and cumulative running SUM() windows.",
    schemaSnippet: "`StaffTaskEventLogs (event_id BIGINT PRIMARY KEY, emp_id VARCHAR(16), task_code VARCHAR(16), logged_time TIMESTAMP)`",
    targetQuery: `WITH ShiftIdleFlags AS (\n  SELECT event_id,\n         emp_id,\n         task_code,\n         logged_time,\n         CASE WHEN EXTRACT(EPOCH FROM (logged_time - LAG(logged_time, 1) OVER (\n           PARTITION BY emp_id \n           ORDER BY logged_time ASC\n         ))) > 14400 OR LAG(logged_time, 1) OVER (\n           PARTITION BY emp_id \n           ORDER BY logged_time ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_shift_flag\n  FROM StaffTaskEventLogs\n),\nShiftAssignments AS (\n  SELECT event_id,\n         emp_id,\n         task_code,\n         logged_time,\n         SUM(new_shift_flag) OVER (\n           PARTITION BY emp_id \n           ORDER BY logged_time ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS shift_id\n  FROM ShiftIdleFlags\n)\nSELECT emp_id,\n       shift_id,\n       MIN(logged_time) AS shift_start,\n       MAX(logged_time) AS shift_end,\n       COUNT(*) AS tasks_completed,\n       ROUND(EXTRACT(EPOCH FROM (MAX(logged_time) - MIN(logged_time))) / 3600, 2) AS shift_hours\nFROM ShiftAssignments\nGROUP BY emp_id, shift_id\nORDER BY emp_id, shift_start ASC;`,
    eli5Story: "When remote workers log completed tickets, group their work into shifts. If 4 hours pass with no work logged, treat their next action as a brand new working shift.",
    commonMistakes: "Omitting the emp_id partition, combining work logs from different employees into the same shift.",
    learningOutcomes: "Model flexible remote workforce shift intervals using inactivity window sessionization."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Database Primary Server Consecutive Heartbeat Failure Detection",
    ind: "Platforms",
    diff: "Easy",
    table: "ServerHeartbeatLogs",
    scenario: "High-availability clustering daemons (Keepalived/Corosync) detect node death by grouping consecutive missed 1-second ping heartbeats.",
    businessObjective: "Group consecutive failed heartbeats into failure islands using ping_seq - row_number.",
    schemaSnippet: "`ServerHeartbeatLogs (server_id VARCHAR(24), ping_seq INT, is_healthy BOOLEAN)`",
    targetQuery: `WITH FailedPings AS (\n  SELECT server_id,\n         ping_seq,\n         (ping_seq - ROW_NUMBER() OVER (\n           PARTITION BY server_id \n           ORDER BY ping_seq ASC\n         )) AS failure_island_id\n  FROM ServerHeartbeatLogs\n  WHERE is_healthy = FALSE\n)\nSELECT server_id,\n       MIN(ping_seq) AS failure_start_seq,\n       MAX(ping_seq) AS failure_end_seq,\n       COUNT(*) AS consecutive_failed_heartbeats\nFROM FailedPings\nGROUP BY server_id, failure_island_id\nHAVING COUNT(*) >= 5\nORDER BY server_id, failure_start_seq ASC;`,
    eli5Story: "Filter for missed heartbeat pings. Subtract the row number from the ping number to group consecutive dead pings, and trigger failover if 5 pings in a row fail.",
    commonMistakes: "Failing to filter is_healthy = FALSE before computing row numbers, which would number healthy pings.",
    learningOutcomes: "Trigger cluster failover mechanisms using integer sequence gaps-and-islands grouping."
  },
  {
    title: "Kubernetes Pod Consecutive OOMKilled Container Restart Streaks",
    ind: "Platforms",
    diff: "Medium",
    table: "PodRestartEvents",
    scenario: "Container orchestration platforms isolate memory starvation loops by detecting pods that experienced Out-Of-Memory (OOMKilled) terminations on 3 or more consecutive restarts.",
    businessObjective: "Group consecutive OOMKilled restarts into crash islands using restart_seq - row_number.",
    schemaSnippet: "`PodRestartEvents (pod_id VARCHAR(32), restart_seq INT, exit_reason VARCHAR(16))`",
    targetQuery: `WITH OomRestarts AS (\n  SELECT pod_id,\n         restart_seq,\n         (restart_seq - ROW_NUMBER() OVER (\n           PARTITION BY pod_id \n           ORDER BY restart_seq ASC\n         )) AS crash_island_id\n  FROM PodRestartEvents\n  WHERE exit_reason = 'OOMKilled'\n)\nSELECT pod_id,\n       MIN(restart_seq) AS start_crash_seq,\n       MAX(restart_seq) AS end_crash_seq,\n       COUNT(*) AS consecutive_oom_kills\nFROM OomRestarts\nGROUP BY pod_id, crash_island_id\nHAVING COUNT(*) >= 3\nORDER BY pod_id, start_crash_seq ASC;`,
    eli5Story: "Filter for container crashes caused by running out of memory (OOMKilled). Subtract row number from restart number to group consecutive memory deaths into crash streaks.",
    commonMistakes: "Sorting by event timestamps instead of restart_seq, which can be sensitive to clock drift.",
    learningOutcomes: "Isolate microservice container crash loops using discrete sequence gaps-and-islands algebra."
  },
  {
    title: "Cloud Shell SSH Terminal 15-Minute Inactivity Sessionization",
    ind: "Platforms",
    diff: "Hard",
    table: "SshCommandLogs",
    scenario: "Cloud security audit platforms group bastion host shell commands into terminal sessions, defining a new SSH login session whenever an administrator is inactive for more than 15 minutes.",
    businessObjective: "Assign terminal session IDs using LAG() idle duration thresholds and cumulative running SUM() windows.",
    schemaSnippet: "`SshCommandLogs (cmd_id BIGINT PRIMARY KEY, admin_user VARCHAR(24), command_text VARCHAR(128), executed_at TIMESTAMP)`",
    targetQuery: `WITH CommandIdleFlags AS (\n  SELECT cmd_id,\n         admin_user,\n         command_text,\n         executed_at,\n         CASE WHEN EXTRACT(EPOCH FROM (executed_at - LAG(executed_at, 1) OVER (\n           PARTITION BY admin_user \n           ORDER BY executed_at ASC\n         ))) > 900 OR LAG(executed_at, 1) OVER (\n           PARTITION BY admin_user \n           ORDER BY executed_at ASC\n         ) IS NULL THEN 1 ELSE 0 END AS new_terminal_session_flag\n  FROM SshCommandLogs\n),\nTerminalSessions AS (\n  SELECT cmd_id,\n         admin_user,\n         command_text,\n         executed_at,\n         SUM(new_terminal_session_flag) OVER (\n           PARTITION BY admin_user \n           ORDER BY executed_at ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS session_id\n  FROM CommandIdleFlags\n)\nSELECT admin_user,\n       session_id,\n       MIN(executed_at) AS session_start,\n       MAX(executed_at) AS session_end,\n       COUNT(*) AS commands_executed,\n       ROUND(EXTRACT(EPOCH FROM (MAX(executed_at) - MIN(executed_at))) / 60, 1) AS session_duration_minutes\nFROM TerminalSessions\nGROUP BY admin_user, session_id\nORDER BY admin_user, session_start ASC;`,
    eli5Story: "Group an engineer's server terminal commands into sessions. If they walk away for 15 minutes, treat their next command as a brand new terminal session.",
    commonMistakes: "Omitting the admin_user partition, blending terminal sessions across different engineers.",
    learningOutcomes: "Reconstruct administrative shell sessions using inactivity window sessionization."
  }
];
