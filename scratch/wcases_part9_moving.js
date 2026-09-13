// =============================================================================
// SECTION 9 - PART 9: TRAILING MOVING AVERAGES & CENTERED FRAMES (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: ROWS BETWEEN k PRECEDING AND CURRENT ROW, Centered Frames, Rolling Volatilities
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Equity Security 7-Day Simple Trailing Moving Average",
    ind: "Fintech",
    diff: "Easy",
    table: "DailyStockQuotes",
    scenario: "Quantitative technical analysts smooth short-term equity price volatility by calculating 7-day trailing simple moving averages (SMA-7) across daily closing prices.",
    businessObjective: "Compute a 7-row trailing moving average using AVG() OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`DailyStockQuotes (symbol VARCHAR(12), trade_date DATE, close_usd DECIMAL(10,2))`",
    targetQuery: `SELECT symbol,\n       trade_date,\n       close_usd,\n       ROUND(AVG(close_usd) OVER (\n         PARTITION BY symbol \n         ORDER BY trade_date ASC\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ), 2) AS sma_7day_usd\nFROM DailyStockQuotes\nORDER BY symbol, trade_date ASC;`,
    eli5Story: "To smooth out the zig-zag price spikes of a stock, average today's price together with the 6 days before it (7 days total).",
    commonMistakes: "Writing 'ROWS BETWEEN 7 PRECEDING AND CURRENT ROW', which actually averages 8 days (7 prior + 1 current = 8).",
    learningOutcomes: "Correctly parameterize N-period moving frames using (N-1) PRECEDING."
  },
  {
    title: "Cryptocurrency Intraday Golden Cross 20 vs 50 Moving Average Crossover",
    ind: "Fintech",
    diff: "Medium",
    table: "CryptoIntradayCandles",
    scenario: "Automated trading algorithms detect trend reversals by comparing a fast 20-period moving average against a slow 50-period moving average to generate buy signals.",
    businessObjective: "Simultaneously compute 20-period and 50-period moving averages and flag crossover states.",
    schemaSnippet: "`CryptoIntradayCandles (symbol VARCHAR(12), candle_time TIMESTAMP, close_price DECIMAL(10,4))`",
    targetQuery: `WITH MovingAverages AS (\n  SELECT symbol,\n         candle_time,\n         close_price,\n         ROUND(AVG(close_price) OVER (\n           PARTITION BY symbol \n           ORDER BY candle_time ASC\n           ROWS BETWEEN 19 PRECEDING AND CURRENT ROW\n         ), 4) AS ma_fast_20,\n         ROUND(AVG(close_price) OVER (\n           PARTITION BY symbol \n           ORDER BY candle_time ASC\n           ROWS BETWEEN 49 PRECEDING AND CURRENT ROW\n         ), 4) AS ma_slow_50\n  FROM CryptoIntradayCandles\n)\nSELECT symbol,\n       candle_time,\n       close_price,\n       ma_fast_20,\n       ma_slow_50,\n       CASE WHEN ma_fast_20 > ma_slow_50 THEN 'BULLISH_MOMENTUM'\n            ELSE 'BEARISH_MOMENTUM' END AS trend_state\nFROM MovingAverages\nORDER BY symbol, candle_time ASC;`,
    eli5Story: "Compare a fast 20-candle moving average against a slow 50-candle moving average. When the fast line crosses above the slow line, that's a classic buy signal.",
    commonMistakes: "Omitting the PARTITION BY symbol clause, causing Bitcoin moving averages to bleed into Ethereum data.",
    learningOutcomes: "Combine dual-timescale moving window frames to generate algorithmic technical indicators."
  },
  {
    title: "High-Frequency Limit Order Volatility Rolling 30-Point Standard Deviation",
    ind: "Fintech",
    diff: "Hard",
    table: "AlgoExecutionTicks",
    scenario: "Risk managers at electronic market makers monitor microsecond execution risk by computing rolling 30-point Bollinger Bands (moving mean +/- 2 standard deviations) across tick trade prices.",
    businessObjective: "Calculate 30-period rolling mean, rolling standard deviation, and upper/lower Bollinger Bands using sliding window frames.",
    schemaSnippet: "`AlgoExecutionTicks (symbol VARCHAR(12), tick_id BIGINT PRIMARY KEY, execution_price DECIMAL(10,4))`",
    targetQuery: `WITH RollingBandMetrics AS (\n  SELECT symbol,\n         tick_id,\n         execution_price,\n         ROUND(AVG(execution_price) OVER (\n           PARTITION BY symbol \n           ORDER BY tick_id ASC\n           ROWS BETWEEN 29 PRECEDING AND CURRENT ROW\n         ), 4) AS rolling_mean_30,\n         ROUND(STDDEV(execution_price) OVER (\n           PARTITION BY symbol \n           ORDER BY tick_id ASC\n           ROWS BETWEEN 29 PRECEDING AND CURRENT ROW\n         ), 4) AS rolling_stddev_30\n  FROM AlgoExecutionTicks\n)\nSELECT symbol,\n       tick_id,\n       execution_price,\n       rolling_mean_30,\n       rolling_stddev_30,\n       ROUND(rolling_mean_30 + 2 * rolling_stddev_30, 4) AS upper_bollinger_band,\n       ROUND(rolling_mean_30 - 2 * rolling_stddev_30, 4) AS lower_bollinger_band\nFROM RollingBandMetrics\nWHERE rolling_stddev_30 IS NOT NULL\nORDER BY symbol, tick_id ASC;`,
    eli5Story: "Calculate the moving average and volatility of stock trade prices over the last 30 trades. Create top and bottom boundary lines (+/- 2 standard deviations) to spot abnormal price spikes.",
    commonMistakes: "Using default frames instead of explicit ROWS BETWEEN 29 PRECEDING, which would calculate an unbounded expanding standard deviation.",
    learningOutcomes: "Formulate dynamic statistical volatility bands using sliding window aggregate frames."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "SaaS Application API Request Latency 15-Minute Trailing Mean",
    ind: "SaaS",
    diff: "Easy",
    table: "ApiLatencyMinuteBuckets",
    scenario: "DevOps monitoring dashboards smooth noisy minute-by-minute API latency telemetry by calculating a 15-minute trailing moving average.",
    businessObjective: "Compute 15-minute moving average using AVG() OVER (... ROWS BETWEEN 14 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`ApiLatencyMinuteBuckets (service_name VARCHAR(32), bucket_minute TIMESTAMP, avg_latency_ms INT)`",
    targetQuery: `SELECT service_name,\n       bucket_minute,\n       avg_latency_ms,\n       ROUND(AVG(avg_latency_ms) OVER (\n         PARTITION BY service_name \n         ORDER BY bucket_minute ASC\n         ROWS BETWEEN 14 PRECEDING AND CURRENT ROW\n       ), 1) AS trailing_15m_avg_latency_ms\nFROM ApiLatencyMinuteBuckets\nORDER BY service_name, bucket_minute ASC;`,
    eli5Story: "Average the last 15 minutes of website response times together so a 1-second hiccup doesn't trigger false alarm alerts for engineers.",
    commonMistakes: "Writing ROWS 15 PRECEDING instead of 14 PRECEDING, which accidentally creates a 16-minute window.",
    learningOutcomes: "Smooth noisy operational telemetry using fixed-offset sliding window frames."
  },
  {
    title: "Customer Support Ticket Inflow 7-Day Centered Moving Average",
    ind: "SaaS",
    diff: "Medium",
    table: "DailySupportTicketVolume",
    scenario: "Customer support staffing coordinators smooth weekend ticket volume dips by computing a 7-day centered moving average (3 days prior, current day, 3 days following).",
    businessObjective: "Compute centered moving average using ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING.",
    schemaSnippet: "`DailySupportTicketVolume (tier VARCHAR(16), report_date DATE, tickets_opened INT)`",
    targetQuery: `SELECT tier,\n       report_date,\n       tickets_opened,\n       ROUND(AVG(tickets_opened) OVER (\n         PARTITION BY tier \n         ORDER BY report_date ASC\n         ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING\n       ), 1) AS centered_7d_moving_avg\nFROM DailySupportTicketVolume\nORDER BY tier, report_date ASC;`,
    eli5Story: "Take 3 days before today, today, and 3 days after today (7 days total). Average them together to smooth out weekend drops and see the true support workload trend.",
    commonMistakes: "Attempting to use centered frames in real-time streaming queries; centered frames require future rows (FOLLOWING), which are only available in historical analysis.",
    learningOutcomes: "Implement symmetric centered moving window frames for historical trend decomposition."
  },
  {
    title: "Multi-Tenant Cloud Compute Node Load 1-Hour Rolling Standard Deviation",
    ind: "SaaS",
    diff: "Hard",
    table: "NodeFiveMinuteCpuLogs",
    scenario: "Autonomous autoscaling engines detect server thrashing by calculating the rolling 1-hour standard deviation (12 five-minute samples) of CPU utilization across cluster nodes.",
    businessObjective: "Compute 12-sample rolling mean, standard deviation, and flag nodes experiencing erratic load swings.",
    schemaSnippet: "`NodeFiveMinuteCpuLogs (node_id VARCHAR(32), log_time TIMESTAMP, cpu_pct DECIMAL(4,1))`",
    targetQuery: `WITH RollingCpuMetrics AS (\n  SELECT node_id,\n         log_time,\n         cpu_pct,\n         ROUND(AVG(cpu_pct) OVER (\n           PARTITION BY node_id \n           ORDER BY log_time ASC\n           ROWS BETWEEN 11 PRECEDING AND CURRENT ROW\n         ), 1) AS rolling_1h_avg_cpu,\n         ROUND(STDDEV(cpu_pct) OVER (\n           PARTITION BY node_id \n           ORDER BY log_time ASC\n           ROWS BETWEEN 11 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_1h_cpu_stddev\n  FROM NodeFiveMinuteCpuLogs\n)\nSELECT node_id,\n       log_time,\n       cpu_pct,\n       rolling_1h_avg_cpu,\n       rolling_1h_cpu_stddev,\n       CASE WHEN rolling_1h_cpu_stddev >= 20.0 THEN 'HIGH_VOLATILITY_THRASHING'\n            ELSE 'STABLE_LOAD' END AS cluster_node_health\nFROM RollingCpuMetrics\nORDER BY node_id, log_time ASC;`,
    eli5Story: "Look at CPU load across the last 12 samples (1 hour). If the standard deviation is huge (swings > 20%), flag the server as thrashing erratically.",
    commonMistakes: "Using 12 PRECEDING instead of 11 PRECEDING, which actually captures 13 samples (65 minutes).",
    learningOutcomes: "Model operational server stability using sliding statistical standard deviation windows."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Retail Department Store Daily Gross Sales 7-Day Trailing Moving Average",
    ind: "Retail",
    diff: "Easy",
    table: "DepartmentDailySales",
    scenario: "Merchandising analysts smooth weekend retail sales surges by calculating a 7-day trailing moving average of gross revenue per merchandise department.",
    businessObjective: "Calculate 7-day moving average using AVG() OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`DepartmentDailySales (department VARCHAR(32), sale_date DATE, revenue_usd DECIMAL(10,2))`",
    targetQuery: `SELECT department,\n       sale_date,\n       revenue_usd,\n       ROUND(AVG(revenue_usd) OVER (\n         PARTITION BY department \n         ORDER BY sale_date ASC\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ), 2) AS trailing_7d_avg_revenue\nFROM DepartmentDailySales\nORDER BY department, sale_date ASC;`,
    eli5Story: "Add up sales from today and the past 6 days, divide by 7, and print that 7-day average on every line to see underlying business growth without weekend distortion.",
    commonMistakes: "Omitting the department partition, which mixes Women's Apparel with Sporting Goods.",
    learningOutcomes: "Deploy standard 7-day moving average windows across retail store departments."
  },
  {
    title: "Supermarket Perishable Inventory 5-Day Centered Waste Trend",
    ind: "Retail",
    diff: "Medium",
    table: "DailyPerishableWasteLogs",
    scenario: "Grocery supply chain managers analyze perishable food spoilage trends by computing a 5-day centered moving average (2 days prior, current day, 2 days following).",
    businessObjective: "Compute a 5-day centered average using ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING.",
    schemaSnippet: "`DailyPerishableWasteLogs (store_id VARCHAR(16), log_date DATE, spoiled_kg DECIMAL(6,2))`",
    targetQuery: `SELECT store_id,\n       log_date,\n       spoiled_kg,\n       ROUND(AVG(spoiled_kg) OVER (\n         PARTITION BY store_id \n         ORDER BY log_date ASC\n         ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING\n       ), 2) AS centered_5d_waste_kg\nFROM DailyPerishableWasteLogs\nORDER BY store_id, log_date ASC;`,
    eli5Story: "Average grocery food waste across 5 days (2 days before, today, and 2 days after) to see if fruit spoilage is truly getting better or worse.",
    commonMistakes: "Using centered frames for end-of-quarter predictions where following rows do not exist yet.",
    learningOutcomes: "Apply centered window frames for historical retrospective quality auditing."
  },
  {
    title: "E-Commerce Checkout Conversion Rate 14-Day Rolling Volatility Bands",
    ind: "Retail",
    diff: "Hard",
    table: "DailyFunnelConversionRates",
    scenario: "Conversion rate optimization (CRO) teams evaluate website redesign impact by establishing 14-day rolling mean and +/- 1.5 standard deviation control limits on daily checkout conversion rates.",
    businessObjective: "Calculate 14-day rolling mean, rolling standard deviation, and detect anomalous statistical drop-offs.",
    schemaSnippet: "`DailyFunnelConversionRates (device_category VARCHAR(16), report_date DATE, conversion_rate_pct DECIMAL(4,2))`",
    targetQuery: `WITH RollingConversionStats AS (\n  SELECT device_category,\n         report_date,\n         conversion_rate_pct,\n         ROUND(AVG(conversion_rate_pct) OVER (\n           PARTITION BY device_category \n           ORDER BY report_date ASC\n           ROWS BETWEEN 13 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_14d_mean,\n         ROUND(STDDEV(conversion_rate_pct) OVER (\n           PARTITION BY device_category \n           ORDER BY report_date ASC\n           ROWS BETWEEN 13 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_14d_stddev\n  FROM DailyFunnelConversionRates\n)\nSELECT device_category,\n       report_date,\n       conversion_rate_pct,\n       rolling_14d_mean,\n       rolling_14d_stddev,\n       ROUND(rolling_14d_mean - 1.5 * rolling_14d_stddev, 2) AS lower_control_limit,\n       CASE WHEN conversion_rate_pct < (rolling_14d_mean - 1.5 * rolling_14d_stddev) THEN 'CHECKOUT_BUG_DETECTED'\n            ELSE 'NORMAL_VARIATION' END AS audit_flag\nFROM RollingConversionStats\nORDER BY device_category, report_date ASC;`,
    eli5Story: "Calculate the 14-day average conversion rate on mobile phones. If today's conversion rate crashes below the bottom control limit (mean minus 1.5 standard deviations), sound the alarm for a broken checkout button.",
    commonMistakes: "Omitting the device_category partition, blending desktop conversion (3.5%) with mobile conversion (1.8%).",
    learningOutcomes: "Build automated statistical anomaly alerts using sliding window control limits."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Hospital Inpatient Emergency Department 7-Day Moving Average Admission Count",
    ind: "Healthcare",
    diff: "Easy",
    table: "DailyErAdmissions",
    scenario: "Hospital administrative directors track winter influenza bed demand by calculating a 7-day trailing moving average of daily emergency department admissions.",
    businessObjective: "Compute 7-day trailing moving average using AVG() OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`DailyErAdmissions (hospital_id VARCHAR(16), admission_date DATE, patient_count INT)`",
    targetQuery: `SELECT hospital_id,\n       admission_date,\n       patient_count,\n       ROUND(AVG(patient_count) OVER (\n         PARTITION BY hospital_id \n         ORDER BY admission_date ASC\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ), 1) AS sma_7d_admissions\nFROM DailyErAdmissions\nORDER BY hospital_id, admission_date ASC;`,
    eli5Story: "Average the last 7 days of hospital ER patient counts together so nurses see the true flu trend without getting confused by Sunday surges.",
    commonMistakes: "Writing ROWS 7 PRECEDING, which accidentally averages 8 days.",
    learningOutcomes: "Smooth hospital clinical intake volumes using 7-day sliding window averages."
  },
  {
    title: "Dialysis Patient Blood Urea Nitrogen 3-Session Centered Lab Baseline",
    ind: "Healthcare",
    diff: "Medium",
    table: "DialysisLabResults",
    scenario: "Nephrology clinical teams evaluate chronic kidney disease hemodialysis efficiency by calculating a 3-session centered moving average (prior session, current, subsequent) of Blood Urea Nitrogen (BUN).",
    businessObjective: "Compute a 3-session centered average using ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING.",
    schemaSnippet: "`DialysisLabResults (patient_id VARCHAR(24), session_seq INT, bun_mg_dl INT)`",
    targetQuery: `SELECT patient_id,\n       session_seq,\n       bun_mg_dl,\n       ROUND(AVG(bun_mg_dl) OVER (\n         PARTITION BY patient_id \n         ORDER BY session_seq ASC\n         ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n       ), 1) AS centered_3session_avg_bun\nFROM DialysisLabResults\nORDER BY patient_id, session_seq ASC;`,
    eli5Story: "Take the blood test from last session, this session, and next session (3 sessions total), and average them together to remove temporary dietary spikes.",
    commonMistakes: "Using centered frames when the patient is on session 1, where the preceding row is NULL and the engine averages the 2 available rows.",
    learningOutcomes: "Understand how database engines dynamically handle partition edge boundaries in centered window frames."
  },
  {
    title: "ICU Patient Mean Arterial Pressure Rolling 1-Hour Volatility Instability",
    ind: "Healthcare",
    diff: "Hard",
    table: "IcuHemodynamicPings",
    scenario: "Intensive care monitoring systems calculate rolling 1-hour hemodynamic instability (12 five-minute samples) of Mean Arterial Pressure (MAP) to detect hemorrhagic shock.",
    businessObjective: "Compute 12-sample rolling mean, rolling standard deviation, and flag hemodynamic instability.",
    schemaSnippet: "`IcuHemodynamicPings (patient_id VARCHAR(24), ping_time TIMESTAMP, map_mmhg INT)`",
    targetQuery: `WITH RollingMapStats AS (\n  SELECT patient_id,\n         ping_time,\n         map_mmhg,\n         ROUND(AVG(map_mmhg) OVER (\n           PARTITION BY patient_id \n           ORDER BY ping_time ASC\n           ROWS BETWEEN 11 PRECEDING AND CURRENT ROW\n         ), 1) AS rolling_1h_mean_map,\n         ROUND(STDDEV(map_mmhg) OVER (\n           PARTITION BY patient_id \n           ORDER BY ping_time ASC\n           ROWS BETWEEN 11 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_1h_map_stddev\n  FROM IcuHemodynamicPings\n)\nSELECT patient_id,\n       ping_time,\n       map_mmhg,\n       rolling_1h_mean_map,\n       rolling_1h_map_stddev,\n       CASE WHEN rolling_1h_map_stddev >= 15.0 THEN 'HEMODYNAMIC_INSTABILITY_ALERT'\n            ELSE 'STABLE_PRESSURE' END AS patient_status\nFROM RollingMapStats\nORDER BY patient_id, ping_time ASC;`,
    eli5Story: "Watch an ICU patient's blood pressure over the last 12 pings (1 hour). If the pressure swings wildly (standard deviation >= 15), trigger an emergency shock alert.",
    commonMistakes: "Partitioning without patient_id, mixing vitals from different hospital beds.",
    learningOutcomes: "Model critical clinical instability using sliding statistical window frames."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Freight Shipping Lane Truck Fuel Price 7-Day Trailing Moving Average",
    ind: "Logistics",
    diff: "Easy",
    table: "DailyDieselFuelIndex",
    scenario: "Third-party logistics brokers smooth volatile daily diesel fuel surcharges by calculating a 7-day trailing moving average across regional fueling corridors.",
    businessObjective: "Calculate 7-day trailing diesel price average using AVG() OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`DailyDieselFuelIndex (corridor_code VARCHAR(16), quote_date DATE, diesel_usd_per_gallon DECIMAL(4,3))`",
    targetQuery: `SELECT corridor_code,\n       quote_date,\n       diesel_usd_per_gallon,\n       ROUND(AVG(diesel_usd_per_gallon) OVER (\n         PARTITION BY corridor_code \n         ORDER BY quote_date ASC\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ), 3) AS trailing_7d_diesel_avg\nFROM DailyDieselFuelIndex\nORDER BY corridor_code, quote_date ASC;`,
    eli5Story: "Average diesel fuel prices over the last 7 days so trucking companies charge smooth fuel surcharges rather than jumping wildly every single day.",
    commonMistakes: "Writing ROWS 7 PRECEDING, which averages 8 days.",
    learningOutcomes: "Calculate rolling commodity benchmark prices using parameterized window frames."
  },
  {
    title: "Air Cargo Terminal Pallet Tonnage 5-Flight Centered Load Trend",
    ind: "Logistics",
    diff: "Medium",
    table: "FlightCargoTonnageLogs",
    scenario: "Air cargo hub managers analyze runway ground handling equipment demand by computing a 5-flight centered moving average (2 prior flights, current, 2 following flights) of freight tonnage.",
    businessObjective: "Compute a 5-flight centered average using ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING.",
    schemaSnippet: "`FlightCargoTonnageLogs (airport_code VARCHAR(4), flight_seq INT, gross_cargo_tons DECIMAL(6,2))`",
    targetQuery: `SELECT airport_code,\n       flight_seq,\n       gross_cargo_tons,\n       ROUND(AVG(gross_cargo_tons) OVER (\n         PARTITION BY airport_code \n         ORDER BY flight_seq ASC\n         ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING\n       ), 2) AS centered_5flight_cargo_tons\nFROM FlightCargoTonnageLogs\nORDER BY airport_code, flight_seq ASC;`,
    eli5Story: "Look at the cargo weight on 5 flights (2 before, this flight, and 2 after) to see the true cargo trend at the airport without random spikes from one empty plane.",
    commonMistakes: "Using centered frames for real-time dispatch; future flights haven't landed yet, so this is strictly for retrospective planning.",
    learningOutcomes: "Deploy discrete sequential centered window frames for flight operations planning."
  },
  {
    title: "Intermodal Rail Train Velocity Rolling 10-Ping Deceleration Monitoring",
    ind: "Logistics",
    diff: "Hard",
    table: "TrainGpsSpeedTelematics",
    scenario: "Rail operations safety systems detect gradual locomotive mechanical drag by calculating a rolling 10-ping moving average and rolling standard deviation of train speed.",
    businessObjective: "Compute 10-ping rolling mean, rolling standard deviation, and detect anomalous deceleration drag.",
    schemaSnippet: "`TrainGpsSpeedTelematics (train_id VARCHAR(16), ping_seq INT, speed_mph DECIMAL(5,2))`",
    targetQuery: `WITH RollingSpeedMetrics AS (\n  SELECT train_id,\n         ping_seq,\n         speed_mph,\n         ROUND(AVG(speed_mph) OVER (\n           PARTITION BY train_id \n           ORDER BY ping_seq ASC\n           ROWS BETWEEN 9 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_10ping_avg_speed,\n         ROUND(STDDEV(speed_mph) OVER (\n           PARTITION BY train_id \n           ORDER BY ping_seq ASC\n           ROWS BETWEEN 9 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_10ping_stddev\n  FROM TrainGpsSpeedTelematics\n)\nSELECT train_id,\n       ping_seq,\n       speed_mph,\n       rolling_10ping_avg_speed,\n       rolling_10ping_stddev,\n       CASE WHEN speed_mph < (rolling_10ping_avg_speed - 2.0 * rolling_10ping_stddev) THEN 'UNEXPECTED_DECELERATION'\n            ELSE 'NORMAL_CRUISE' END AS safety_verdict\nFROM RollingSpeedMetrics\nORDER BY train_id, ping_seq ASC;`,
    eli5Story: "Average a train's speed over the last 10 GPS pings. If the train suddenly slows down below its 2-standard-deviation safety band, warn the engineer of track drag.",
    commonMistakes: "Omitting the train_id partition, comparing the speed of a bullet train against a slow switching engine.",
    learningOutcomes: "Establish locomotive kinetic safety envelopes using sliding statistical window frames."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Digital Media Website Daily Unique Visitors 7-Day Trailing Moving Average",
    ind: "Media",
    diff: "Easy",
    table: "DailyWebsiteTraffic",
    scenario: "Editorial publishing directors evaluate audience growth by computing a 7-day trailing moving average of daily unique visitors to filter out weekend traffic declines.",
    businessObjective: "Compute 7-day moving average using AVG() OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`DailyWebsiteTraffic (vertical VARCHAR(24), traffic_date DATE, unique_visitors INT)`",
    targetQuery: `SELECT vertical,\n       traffic_date,\n       unique_visitors,\n       ROUND(AVG(unique_visitors) OVER (\n         PARTITION BY vertical \n         ORDER BY traffic_date ASC\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ), 0) AS sma_7d_visitors\nFROM DailyWebsiteTraffic\nORDER BY vertical, traffic_date ASC;`,
    eli5Story: "Average website visitor numbers over the past 7 days to show advertisers true audience growth without weekend drops making the graph look like a rollercoaster.",
    commonMistakes: "Writing ROWS 7 PRECEDING, which averages 8 days.",
    learningOutcomes: "Smooth web analytics traffic series using 7-day sliding window averages."
  },
  {
    title: "Video Streaming Playback Buffer Health 5-Minute Centered Average",
    ind: "Media",
    diff: "Medium",
    table: "PlayerBufferSecondsHistory",
    scenario: "Streaming media quality engineers evaluate CDN video delivery health by calculating a 5-minute centered moving average (2 minutes prior, current minute, 2 minutes following) of player video buffer depth.",
    businessObjective: "Compute a 5-minute centered average using ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING.",
    schemaSnippet: "`PlayerBufferSecondsHistory (session_id VARCHAR(32), minute_seq INT, buffer_seconds DECIMAL(5,2))`",
    targetQuery: `SELECT session_id,\n       minute_seq,\n       buffer_seconds,\n       ROUND(AVG(buffer_seconds) OVER (\n         PARTITION BY session_id \n         ORDER BY minute_seq ASC\n         ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING\n       ), 2) AS centered_5m_buffer_seconds\nFROM PlayerBufferSecondsHistory\nORDER BY session_id, minute_seq ASC;`,
    eli5Story: "Look at video buffer health across 5 minutes (2 before, right now, and 2 after) to see if a movie was in danger of freezing and buffering.",
    commonMistakes: "Using centered frames for real-time video player throttling where future buffer data is impossible to know in advance.",
    learningOutcomes: "Construct retrospective media quality indicators using centered window frames."
  },
  {
    title: "Mobile Game Daily Active Users 30-Day Rolling Standard Deviation",
    ind: "Media",
    diff: "Hard",
    table: "GameDailyActiveUsers",
    scenario: "Game economy directors evaluate game longevity by establishing 30-day rolling mean and +/- 2 standard deviation control limits on Daily Active Users (DAU).",
    businessObjective: "Calculate 30-day rolling mean, rolling standard deviation, and detect severe player churn events.",
    schemaSnippet: "`GameDailyActiveUsers (game_title VARCHAR(32), log_date DATE, dau_count INT)`",
    targetQuery: `WITH RollingDauMetrics AS (\n  SELECT game_title,\n         log_date,\n         dau_count,\n         ROUND(AVG(dau_count) OVER (\n           PARTITION BY game_title \n           ORDER BY log_date ASC\n           ROWS BETWEEN 29 PRECEDING AND CURRENT ROW\n         ), 0) AS rolling_30d_avg_dau,\n         ROUND(STDDEV(dau_count) OVER (\n           PARTITION BY game_title \n           ORDER BY log_date ASC\n           ROWS BETWEEN 29 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_30d_stddev\n  FROM GameDailyActiveUsers\n)\nSELECT game_title,\n       log_date,\n       dau_count,\n       rolling_30d_avg_dau,\n       rolling_30d_stddev,\n       ROUND(rolling_30d_avg_dau - 2.0 * rolling_30d_stddev, 0) AS lower_retention_boundary,\n       CASE WHEN dau_count < (rolling_30d_avg_dau - 2.0 * rolling_30d_stddev) THEN 'MASS_CHURN_ANOMALY'\n            ELSE 'NORMAL_ACTIVITY' END AS retention_health\nFROM RollingDauMetrics\nORDER BY game_title, log_date ASC;`,
    eli5Story: "Calculate the 30-day average player count for a mobile game. If today's player count drops below the bottom safety line (mean minus 2 standard deviations), investigate if a buggy update made players quit.",
    commonMistakes: "Omitting the game_title partition, mixing a puzzle game with an action RPG.",
    learningOutcomes: "Build game player retention health indicators using sliding statistical control limits."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Network Firewall Blocked Packets 5-Minute Trailing Mean",
    ind: "Security",
    diff: "Easy",
    table: "FirewallBlockedPacketsPerMin",
    scenario: "Network security operations center (SOC) monitors smooth noisy minute-by-minute packet drop telemetry by calculating a 5-minute trailing moving average.",
    businessObjective: "Compute 5-minute trailing average using AVG() OVER (... ROWS BETWEEN 4 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`FirewallBlockedPacketsPerMin (gateway_id VARCHAR(16), log_minute TIMESTAMP, blocked_packets INT)`",
    targetQuery: `SELECT gateway_id,\n       log_minute,\n       blocked_packets,\n       ROUND(AVG(blocked_packets) OVER (\n         PARTITION BY gateway_id \n         ORDER BY log_minute ASC\n         ROWS BETWEEN 4 PRECEDING AND CURRENT ROW\n       ), 0) AS sma_5m_blocked_packets\nFROM FirewallBlockedPacketsPerMin\nORDER BY gateway_id, log_minute ASC;`,
    eli5Story: "Average blocked cyber-attack packets over the last 5 minutes so a brief 10-second port scan doesn't trigger emergency pagers.",
    commonMistakes: "Writing ROWS 5 PRECEDING, which actually averages 6 minutes.",
    learningOutcomes: "Smooth security telemetry alerts using fixed sliding window averages."
  },
  {
    title: "Cloud IAM Authentication Latency 3-Event Centered Rolling Baseline",
    ind: "Security",
    diff: "Medium",
    table: "IamAuthResponseTimes",
    scenario: "Identity platform engineers evaluate SSO authentication delays during peak morning logins by computing a 3-event centered moving average (prior login, current, subsequent) of response milliseconds.",
    businessObjective: "Compute a 3-event centered average using ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING.",
    schemaSnippet: "`IamAuthResponseTimes (cluster_id VARCHAR(16), event_seq INT, response_ms INT)`",
    targetQuery: `SELECT cluster_id,\n       event_seq,\n       response_ms,\n       ROUND(AVG(response_ms) OVER (\n         PARTITION BY cluster_id \n         ORDER BY event_seq ASC\n         ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n       ), 1) AS centered_3event_avg_ms\nFROM IamAuthResponseTimes\nORDER BY cluster_id, event_seq ASC;`,
    eli5Story: "Average login speed across 3 consecutive logins (1 before, this one, 1 after) to remove temporary single-packet network noise.",
    commonMistakes: "Using centered frames for live authentication firewalls where future logins have not occurred yet.",
    learningOutcomes: "Apply centered window frames to retrospective identity authentication logs."
  },
  {
    title: "Endpoint EDR Process CPU Utilization Rolling 10-Sample Volatility Bands",
    ind: "Security",
    diff: "Hard",
    table: "EdrProcessCpuSamples",
    scenario: "Endpoint Detection and Response (EDR) agents detect cryptocurrency mining malware by establishing a rolling 10-sample mean and standard deviation on process CPU usage, flagging sustained anomalous loads.",
    businessObjective: "Compute 10-sample rolling mean, standard deviation, and detect processes exhibiting suspicious sustained compute spikes.",
    schemaSnippet: "`EdrProcessCpuSamples (endpoint_id VARCHAR(24), pid INT, sample_time TIMESTAMP, cpu_pct DECIMAL(4,1))`",
    targetQuery: `WITH ProcessCpuMetrics AS (\n  SELECT endpoint_id,\n         pid,\n         sample_time,\n         cpu_pct,\n         ROUND(AVG(cpu_pct) OVER (\n           PARTITION BY endpoint_id, pid \n           ORDER BY sample_time ASC\n           ROWS BETWEEN 9 PRECEDING AND CURRENT ROW\n         ), 1) AS rolling_10sample_mean,\n         ROUND(STDDEV(cpu_pct) OVER (\n           PARTITION BY endpoint_id, pid \n           ORDER BY sample_time ASC\n           ROWS BETWEEN 9 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_10sample_stddev\n  FROM EdrProcessCpuSamples\n)\nSELECT endpoint_id,\n       pid,\n       sample_time,\n       cpu_pct,\n       rolling_10sample_mean,\n       rolling_10sample_stddev,\n       CASE WHEN rolling_10sample_mean >= 85.0 AND rolling_10sample_stddev < 5.0 THEN 'CRYPTOMINER_SUSPICION'\n            ELSE 'NORMAL_PROCESS' END AS security_alert\nFROM ProcessCpuMetrics\nORDER BY endpoint_id, pid, sample_time ASC;`,
    eli5Story: "Look at a program's CPU usage over the last 10 checks. If it averages above 85% CPU with almost zero variation (flat-out pinned), flag it as a hidden crypto-mining virus.",
    commonMistakes: "Partitioning only by endpoint_id and omitting pid, combining all running applications into a single blended CPU score.",
    learningOutcomes: "Identify cryptomining malware behavior using sliding window mean and low-variance filters."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Industrial Manufacturing CNC Spindle Vibration 5-Second Trailing Mean",
    ind: "Hardware",
    diff: "Easy",
    table: "CncSpindleVibrationLogs",
    scenario: "Smart factory predictive maintenance systems smooth mechanical sensor noise by calculating a 5-second trailing moving average of CNC milling machine spindle vibration (mm/s).",
    businessObjective: "Compute 5-second trailing average using AVG() OVER (... ROWS BETWEEN 4 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`CncSpindleVibrationLogs (machine_id VARCHAR(16), log_second INT, vibration_mms DECIMAL(5,2))`",
    targetQuery: `SELECT machine_id,\n       log_second,\n       vibration_mms,\n       ROUND(AVG(vibration_mms) OVER (\n         PARTITION BY machine_id \n         ORDER BY log_second ASC\n         ROWS BETWEEN 4 PRECEDING AND CURRENT ROW\n       ), 2) AS sma_5s_vibration\nFROM CncSpindleVibrationLogs\nORDER BY machine_id, log_second ASC;`,
    eli5Story: "Average the last 5 seconds of cutting machine vibration readings so a tiny piece of metal dust hitting the sensor doesn't shut down the factory line.",
    commonMistakes: "Writing ROWS 5 PRECEDING, which averages 6 seconds.",
    learningOutcomes: "Smooth industrial mechanical sensor telematics using sliding window frames."
  },
  {
    title: "Server Power Supply AC Input Wattage 3-Sample Centered Filter",
    ind: "Hardware",
    diff: "Medium",
    table: "ServerPsuWattageTelemetry",
    scenario: "Data center power distribution engineers analyze server rack power draw by computing a 3-sample centered moving average (prior sample, current, subsequent) of wattage.",
    businessObjective: "Compute a 3-sample centered average using ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING.",
    schemaSnippet: "`ServerPsuWattageTelemetry (server_serial VARCHAR(24), sample_seq INT, input_watts INT)`",
    targetQuery: `SELECT server_serial,\n       sample_seq,\n       input_watts,\n       ROUND(AVG(input_watts) OVER (\n         PARTITION BY server_serial \n         ORDER BY sample_seq ASC\n         ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n       ), 0) AS centered_3sample_avg_watts\nFROM ServerPsuWattageTelemetry\nORDER BY server_serial, sample_seq ASC;`,
    eli5Story: "Average electricity wattage across 3 sensor checks (1 before, right now, 1 after) to remove microsecond electrical noise from the power meter.",
    commonMistakes: "Using centered frames for automated circuit breaker trips; circuit breakers must act in real-time without waiting for future samples.",
    learningOutcomes: "Apply centered window filters for historical electrical power quality analysis."
  },
  {
    title: "Semiconductor Cleanroom Etch Chamber Pressure 20-Sample Volatility Bands",
    ind: "Hardware",
    diff: "Hard",
    table: "EtchChamberPressureTelematics",
    scenario: "Semiconductor yield engineers monitor plasma etch vacuum stability by computing a 20-sample rolling mean and standard deviation of chamber pressure (milliTorr).",
    businessObjective: "Calculate 20-sample rolling mean, standard deviation, and flag vacuum seal degradation.",
    schemaSnippet: "`EtchChamberPressureTelematics (chamber_id VARCHAR(16), sample_seq INT, pressure_mtorr DECIMAL(6,3))`",
    targetQuery: `WITH RollingPressureMetrics AS (\n  SELECT chamber_id,\n         sample_seq,\n         pressure_mtorr,\n         ROUND(AVG(pressure_mtorr) OVER (\n           PARTITION BY chamber_id \n           ORDER BY sample_seq ASC\n           ROWS BETWEEN 19 PRECEDING AND CURRENT ROW\n         ), 3) AS rolling_20sample_mean,\n         ROUND(STDDEV(pressure_mtorr) OVER (\n           PARTITION BY chamber_id \n           ORDER BY sample_seq ASC\n           ROWS BETWEEN 19 PRECEDING AND CURRENT ROW\n         ), 4) AS rolling_20sample_stddev\n  FROM EtchChamberPressureTelematics\n)\nSELECT chamber_id,\n       sample_seq,\n       pressure_mtorr,\n       rolling_20sample_mean,\n       rolling_20sample_stddev,\n       CASE WHEN rolling_20sample_stddev >= 0.050 THEN 'VACUUM_SEAL_LEAK_ALERT'\n            ELSE 'STABLE_VACUUM' END AS chamber_health\nFROM RollingPressureMetrics\nORDER BY chamber_id, sample_seq ASC;`,
    eli5Story: "Watch the vacuum pressure in a microchip manufacturing chamber over the last 20 samples. If the pressure wobbles (standard deviation >= 0.05 mTorr), sound the vacuum leak alarm.",
    commonMistakes: "Using default frames, which turns the sliding window into an expanding cumulative window.",
    learningOutcomes: "Detect micro-manufacturing equipment degradation using sliding statistical window frames."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Recruiter Weekly Candidate Screenings 4-Week Trailing Mean",
    ind: "HR",
    diff: "Easy",
    table: "RecruiterWeeklyScreenings",
    scenario: "Talent acquisition managers evaluate hiring throughput by computing a 4-week trailing moving average of phone screens conducted per recruiter.",
    businessObjective: "Compute 4-week moving average using AVG() OVER (... ROWS BETWEEN 3 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`RecruiterWeeklyScreenings (recruiter_id VARCHAR(16), calendar_week VARCHAR(8), screens_completed INT)`",
    targetQuery: `SELECT recruiter_id,\n       calendar_week,\n       screens_completed,\n       ROUND(AVG(screens_completed) OVER (\n         PARTITION BY recruiter_id \n         ORDER BY calendar_week ASC\n         ROWS BETWEEN 3 PRECEDING AND CURRENT ROW\n       ), 1) AS sma_4w_screens\nFROM RecruiterWeeklyScreenings\nORDER BY recruiter_id, calendar_week ASC;`,
    eli5Story: "Average a recruiter's candidate interviews over the last 4 weeks to see their true interviewing pace without getting distorted by a 1-week holiday.",
    commonMistakes: "Writing ROWS 4 PRECEDING, which averages 5 weeks.",
    learningOutcomes: "Smooth weekly recruitment productivity metrics using 4-week sliding window frames."
  },
  {
    title: "Company Employee Pulse Survey Satisfaction 3-Quarter Centered Baseline",
    ind: "HR",
    diff: "Medium",
    table: "QuarterlyEmployeePulseScores",
    scenario: "People analytics teams evaluate corporate sentiment trends by computing a 3-quarter centered moving average (prior quarter, current, subsequent) of employee Net Promoter Scores (eNPS).",
    businessObjective: "Compute a 3-quarter centered average using ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING.",
    schemaSnippet: "`QuarterlyEmployeePulseScores (division VARCHAR(24), fiscal_quarter VARCHAR(7), enps_score INT)`",
    targetQuery: `SELECT division,\n       fiscal_quarter,\n       enps_score,\n       ROUND(AVG(enps_score) OVER (\n         PARTITION BY division \n         ORDER BY fiscal_quarter ASC\n         ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n       ), 1) AS centered_3q_enps_avg\nFROM QuarterlyEmployeePulseScores\nORDER BY division, fiscal_quarter ASC;`,
    eli5Story: "Average employee happiness scores across 3 quarters (last quarter, this quarter, next quarter) to see true cultural trends rather than temporary seasonal grumbles.",
    commonMistakes: "Using centered frames for current ongoing quarters where the following quarter has not taken place yet.",
    learningOutcomes: "Smooth organizational sentiment time-series using centered retrospective window frames."
  },
  {
    title: "Sales Pod Monthly Quota Attainment 6-Month Rolling Standard Deviation",
    ind: "HR",
    diff: "Hard",
    table: "SalesPodMonthlyAttainment",
    scenario: "Sales operations teams detect volatile or feast-and-famine sales performance by establishing a 6-month rolling mean and standard deviation on team quota attainment.",
    businessObjective: "Calculate 6-month rolling mean, rolling standard deviation, and detect volatile sales teams.",
    schemaSnippet: "`SalesPodMonthlyAttainment (pod_id VARCHAR(16), sale_month VARCHAR(7), attainment_pct DECIMAL(5,2))`",
    targetQuery: `WITH RollingAttainmentStats AS (\n  SELECT pod_id,\n         sale_month,\n         attainment_pct,\n         ROUND(AVG(attainment_pct) OVER (\n           PARTITION BY pod_id \n           ORDER BY sale_month ASC\n           ROWS BETWEEN 5 PRECEDING AND CURRENT ROW\n         ), 1) AS rolling_6m_avg_attainment,\n         ROUND(STDDEV(attainment_pct) OVER (\n           PARTITION BY pod_id \n           ORDER BY sale_month ASC\n           ROWS BETWEEN 5 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_6m_attainment_stddev\n  FROM SalesPodMonthlyAttainment\n)\nSELECT pod_id,\n       sale_month,\n       attainment_pct,\n       rolling_6m_avg_attainment,\n       rolling_6m_attainment_stddev,\n       CASE WHEN rolling_6m_attainment_stddev >= 30.0 THEN 'FEAST_AND_FAMINE_VOLATILE'\n            ELSE 'PREDICTABLE_PERFORMANCE' END AS predictability_rating\nFROM RollingAttainmentStats\nORDER BY pod_id, sale_month ASC;`,
    eli5Story: "Look at a sales team's quota achievement over the past 6 months. If their standard deviation is over 30%, flag them as erratic (huge blowout month followed by zero sales).",
    commonMistakes: "Using 6 PRECEDING instead of 5 PRECEDING, capturing 7 months.",
    learningOutcomes: "Evaluate commercial sales stability using sliding statistical standard deviation windows."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Database Buffer Pool Cache Hit Ratio 10-Minute Trailing Moving Average",
    ind: "Platforms",
    diff: "Easy",
    table: "DbCacheHitMinuteStats",
    scenario: "Database performance engineers smooth minute-by-minute buffer cache telemetry by calculating a 10-minute trailing moving average of cache hit percentages.",
    businessObjective: "Compute 10-minute moving average using AVG() OVER (... ROWS BETWEEN 9 PRECEDING AND CURRENT ROW).",
    schemaSnippet: "`DbCacheHitMinuteStats (instance_id VARCHAR(24), sample_minute TIMESTAMP, hit_ratio_pct DECIMAL(4,1))`",
    targetQuery: `SELECT instance_id,\n       sample_minute,\n       hit_ratio_pct,\n       ROUND(AVG(hit_ratio_pct) OVER (\n         PARTITION BY instance_id \n         ORDER BY sample_minute ASC\n         ROWS BETWEEN 9 PRECEDING AND CURRENT ROW\n       ), 2) AS sma_10m_hit_ratio\nFROM DbCacheHitMinuteStats\nORDER BY instance_id, sample_minute ASC;`,
    eli5Story: "Average database cache hit rates over the last 10 minutes so a single cold query doesn't make the dashboard flash red.",
    commonMistakes: "Writing ROWS 10 PRECEDING, which averages 11 minutes.",
    learningOutcomes: "Smooth database performance telemetry using 10-sample sliding window averages."
  },
  {
    title: "Cloud Network VPC Gateway Ingress Packet Rate 5-Minute Centered Filter",
    ind: "Platforms",
    diff: "Medium",
    table: "VpcGatewayMinuteTraffic",
    scenario: "Cloud network engineers analyze DDoS packet flood trends by computing a 5-minute centered moving average (2 minutes prior, current minute, 2 minutes following) of ingress packets per second.",
    businessObjective: "Compute a 5-minute centered average using ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING.",
    schemaSnippet: "`VpcGatewayMinuteTraffic (vpc_id VARCHAR(24), sample_minute TIMESTAMP, packets_per_sec BIGINT)`",
    targetQuery: `SELECT vpc_id,\n       sample_minute,\n       packets_per_sec,\n       ROUND(AVG(packets_per_sec) OVER (\n         PARTITION BY vpc_id \n         ORDER BY sample_minute ASC\n         ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING\n       ), 0) AS centered_5m_packets_per_sec\nFROM VpcGatewayMinuteTraffic\nORDER BY vpc_id, sample_minute ASC;`,
    eli5Story: "Average network traffic across 5 minutes (2 before, right now, 2 after) to see the true shape of a cyber attack without single-second router bursts.",
    commonMistakes: "Using centered frames in real-time firewall filters; future packets haven't arrived yet.",
    learningOutcomes: "Apply centered window frames to post-incident network telemetry analysis."
  },
  {
    title: "Kubernetes Cluster Pod Memory Utilization 1-Hour Rolling Volatility Bands",
    ind: "Platforms",
    diff: "Hard",
    table: "PodMemoryMinuteUsage",
    scenario: "Platform reliability engineers detect memory-leak thrashing in microservices by establishing a 60-minute rolling mean and +/- 2 standard deviation control limits on container memory usage.",
    businessObjective: "Calculate 60-minute rolling mean, rolling standard deviation, and flag abnormal memory instability.",
    schemaSnippet: "`PodMemoryMinuteUsage (pod_id VARCHAR(32), log_minute TIMESTAMP, memory_mb INT)`",
    targetQuery: `WITH RollingMemoryMetrics AS (\n  SELECT pod_id,\n         log_minute,\n         memory_mb,\n         ROUND(AVG(memory_mb) OVER (\n           PARTITION BY pod_id \n           ORDER BY log_minute ASC\n           ROWS BETWEEN 59 PRECEDING AND CURRENT ROW\n         ), 0) AS rolling_60m_mean_mb,\n         ROUND(STDDEV(memory_mb) OVER (\n           PARTITION BY pod_id \n           ORDER BY log_minute ASC\n           ROWS BETWEEN 59 PRECEDING AND CURRENT ROW\n         ), 2) AS rolling_60m_stddev\n  FROM PodMemoryMinuteUsage\n)\nSELECT pod_id,\n       log_minute,\n       memory_mb,\n       rolling_60m_mean_mb,\n       rolling_60m_stddev,\n       CASE WHEN memory_mb > (rolling_60m_mean_mb + 2.0 * rolling_60m_stddev) THEN 'MEMORY_SURGE_ANOMALY'\n            ELSE 'NORMAL_CONSUMPTION' END AS container_health\nFROM RollingMemoryMetrics\nORDER BY pod_id, log_minute ASC;`,
    eli5Story: "Watch how much RAM a Kubernetes container uses over the last 60 minutes. If memory suddenly jumps 2 standard deviations above the rolling average, sound the alarm for a memory leak.",
    commonMistakes: "Using 60 PRECEDING instead of 59 PRECEDING, capturing 61 minutes.",
    learningOutcomes: "Implement sliding statistical control limits to detect container memory leaks."
  }
];
