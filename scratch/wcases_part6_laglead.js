// =============================================================================
// SECTION 9 - PART 6: LAG() & LEAD() OFFSETS & VELOCITY (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: Value Offsets, MoM/YoY Growth Calculations, Null Fallbacks, First/Second Derivatives
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Quarterly Corporate Net Revenue Quarter-over-Quarter Growth Rate",
    ind: "Fintech",
    diff: "Easy",
    table: "CompanyQuarterlyFinancials",
    scenario: "Equity research analysts calculate sequential quarter-over-quarter (QoQ) revenue growth for publicly traded fintech companies from quarterly filings.",
    businessObjective: "Retrieve prior quarter revenue using LAG(1) and compute QoQ growth percentage.",
    schemaSnippet: "`CompanyQuarterlyFinancials (ticker VARCHAR(8), fiscal_year INT, fiscal_quarter INT, net_revenue_m DECIMAL(10,2))`",
    targetQuery: `SELECT ticker,\n       fiscal_year,\n       fiscal_quarter,\n       net_revenue_m,\n       LAG(net_revenue_m, 1) OVER (\n         PARTITION BY ticker \n         ORDER BY fiscal_year ASC, fiscal_quarter ASC\n       ) AS prior_quarter_revenue_m,\n       ROUND((\n         (net_revenue_m - LAG(net_revenue_m, 1) OVER (\n           PARTITION BY ticker \n           ORDER BY fiscal_year ASC, fiscal_quarter ASC\n         )) / NULLIF(LAG(net_revenue_m, 1) OVER (\n           PARTITION BY ticker \n           ORDER BY fiscal_year ASC, fiscal_quarter ASC\n         ), 0)\n       ) * 100, 2) AS qoq_growth_pct\nFROM CompanyQuarterlyFinancials\nORDER BY ticker, fiscal_year ASC, fiscal_quarter ASC;`,
    eli5Story: "Look at this quarter's revenue, peek back at last quarter's revenue with LAG, and calculate what percent higher or lower we grew.",
    commonMistakes: "Omitting the secondary sort key (fiscal_quarter ASC), which scrambles the chronological order of quarters.",
    learningOutcomes: "Compute sequential rate-of-change metrics using multi-column temporal ordering."
  },
  {
    title: "Treasury Bond Yield Curve Daily Basis Point Spread Shift",
    ind: "Fintech",
    diff: "Medium",
    table: "DailyTreasuryYields",
    scenario: "Fixed income portfolio managers track shifts in the 10-year Treasury yield, calculating daily basis point changes and comparing against the subsequent day's forward rate using LEAD().",
    businessObjective: "Simultaneously compute prior day yield (LAG) and next day forward yield (LEAD) to identify inversion turns.",
    schemaSnippet: "`DailyTreasuryYields (trading_date DATE PRIMARY KEY, yield_10y_pct DECIMAL(5,3))`",
    targetQuery: `SELECT trading_date,\n       yield_10y_pct,\n       LAG(yield_10y_pct, 1) OVER (ORDER BY trading_date ASC) AS prev_day_yield,\n       ROUND((yield_10y_pct - LAG(yield_10y_pct, 1) OVER (ORDER BY trading_date ASC)) * 100, 1) AS daily_change_bps,\n       LEAD(yield_10y_pct, 1) OVER (ORDER BY trading_date ASC) AS next_day_yield\nFROM DailyTreasuryYields\nORDER BY trading_date ASC;`,
    eli5Story: "For today's bond interest rate, look backward at yesterday's rate (LAG) and forward at tomorrow's rate (LEAD) to calculate the daily swing in basis points.",
    commonMistakes: "Subtracting yields directly without multiplying by 100 to convert percentage differences into standard financial basis points.",
    learningOutcomes: "Combine backward-looking LAG() and forward-looking LEAD() windows in financial time-series."
  },
  {
    title: "Algorithmic Market Making Tick Micro-Price Volatility Velocity",
    ind: "Fintech",
    diff: "Hard",
    table: "EquityTickPrices",
    scenario: "High-frequency trading quantitative researchers model tick-level price acceleration (second derivative) by calculating the change in consecutive price returns across millisecond execution feeds.",
    businessObjective: "Compute 1-tick lag price return, 2-tick lag price return, and calculate acceleration velocity per stock symbol.",
    schemaSnippet: "`EquityTickPrices (tick_id BIGINT PRIMARY KEY, symbol VARCHAR(12), price DECIMAL(10,4), tick_timestamp BIGINT)`",
    targetQuery: `WITH TickDeltas AS (\n  SELECT tick_id,\n         symbol,\n         price,\n         tick_timestamp,\n         price - LAG(price, 1) OVER (\n           PARTITION BY symbol \n           ORDER BY tick_timestamp ASC, tick_id ASC\n         ) AS velocity_1,\n         LAG(price, 1) OVER (\n           PARTITION BY symbol \n           ORDER BY tick_timestamp ASC, tick_id ASC\n         ) - LAG(price, 2) OVER (\n           PARTITION BY symbol \n           ORDER BY tick_timestamp ASC, tick_id ASC\n         ) AS velocity_2\n  FROM EquityTickPrices\n)\nSELECT tick_id,\n       symbol,\n       price,\n       tick_timestamp,\n       velocity_1,\n       velocity_2,\n       ROUND(velocity_1 - velocity_2, 4) AS price_acceleration\nFROM TickDeltas\nWHERE velocity_1 IS NOT NULL AND velocity_2 IS NOT NULL\nORDER BY symbol, tick_timestamp ASC;`,
    eli5Story: "Measure how fast the stock price is moving between ticks (first velocity), how fast it moved on the tick before that (second velocity), and subtract them to see if price momentum is speeding up or braking.",
    commonMistakes: "Using auto-increment tick_id for time ordering instead of the exchange engine timestamp with a secondary ID tie-breaker.",
    learningOutcomes: "Compute discrete second-order mathematical derivatives using multi-offset LAG() expressions."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Monthly Recurring Revenue Month-over-Month Growth Calculation",
    ind: "SaaS",
    diff: "Easy",
    table: "MonthlyRecurringRevenue",
    scenario: "SaaS executive dashboards track monthly recurring revenue (MRR) expansion by computing MoM percentage change and dollar expansion per product line.",
    businessObjective: "Retrieve prior month MRR using LAG(1) and calculate MoM percentage growth.",
    schemaSnippet: "`MonthlyRecurringRevenue (product_line VARCHAR(24), billing_month VARCHAR(7), mrr_usd DECIMAL(12,2))`",
    targetQuery: `SELECT product_line,\n       billing_month,\n       mrr_usd,\n       LAG(mrr_usd, 1) OVER (\n         PARTITION BY product_line \n         ORDER BY billing_month ASC\n       ) AS prev_month_mrr,\n       ROUND(mrr_usd - LAG(mrr_usd, 1) OVER (\n         PARTITION BY product_line \n         ORDER BY billing_month ASC\n       ), 2) AS mrr_expansion_usd,\n       ROUND((\n         (mrr_usd - LAG(mrr_usd, 1) OVER (\n           PARTITION BY product_line \n           ORDER BY billing_month ASC\n         )) / NULLIF(LAG(mrr_usd, 1) OVER (\n           PARTITION BY product_line \n           ORDER BY billing_month ASC\n         ), 0)\n       ) * 100, 2) AS mom_growth_pct\nFROM MonthlyRecurringRevenue\nORDER BY product_line, billing_month ASC;`,
    eli5Story: "Look at this month's subscription revenue, compare it to last month's subscription revenue using LAG, and show the exact dollar growth and percentage growth.",
    commonMistakes: "Dividing by zero when a brand-new product line had $0 in month 1; NULLIF is required.",
    learningOutcomes: "Formulate resilient MoM growth calculations with safe zero-division guards."
  },
  {
    title: "Customer Plan Upgrade Trajectory Next Plan State Projection",
    ind: "SaaS",
    diff: "Medium",
    table: "CustomerSubscriptionHistory",
    scenario: "Retention marketing teams analyze plan upgrades by comparing a customer's current subscription plan against their subsequent (future) plan tier using LEAD().",
    businessObjective: "Identify customer plan transition paths by projecting the upcoming plan tier beside the current plan.",
    schemaSnippet: "`CustomerSubscriptionHistory (customer_id VARCHAR(24), start_date DATE, plan_tier VARCHAR(16), monthly_fee DECIMAL(8,2))`",
    targetQuery: `SELECT customer_id,\n       start_date,\n       plan_tier AS current_plan,\n       monthly_fee AS current_fee,\n       LEAD(plan_tier, 1) OVER (\n         PARTITION BY customer_id \n         ORDER BY start_date ASC\n       ) AS next_plan,\n       LEAD(monthly_fee, 1) OVER (\n         PARTITION BY customer_id \n         ORDER BY start_date ASC\n       ) AS next_fee,\n       CASE WHEN LEAD(monthly_fee, 1) OVER (PARTITION BY customer_id ORDER BY start_date ASC) > monthly_fee THEN 'UPGRADE'\n            WHEN LEAD(monthly_fee, 1) OVER (PARTITION BY customer_id ORDER BY start_date ASC) < monthly_fee THEN 'DOWNGRADE'\n            WHEN LEAD(plan_tier, 1) OVER (PARTITION BY customer_id ORDER BY start_date ASC) IS NULL THEN 'CURRENT_STATE'\n            ELSE 'LATERAL_CHANGE' END AS transition_type\nFROM CustomerSubscriptionHistory\nORDER BY customer_id, start_date ASC;`,
    eli5Story: "Look at each customer's subscription timeline and use LEAD to peek ahead at what plan they switched to next (Upgrade, Downgrade, or Still on it).",
    commonMistakes: "Ordering DESC, which causes LEAD() to look into the past rather than the future.",
    learningOutcomes: "Model customer lifecycle state transitions using forward-looking LEAD() windows."
  },
  {
    title: "Multi-Day Cloud Billing Burn Acceleration Second Derivative",
    ind: "SaaS",
    diff: "Hard",
    table: "TenantDailyCloudSpend",
    scenario: "Cloud FinOps algorithms detect runaway infrastructure cost leaks by evaluating daily cloud spend acceleration across enterprise accounts.",
    businessObjective: "Compute day-to-day cost velocity, calculate cost acceleration, and filter for accounts where spending is exponentially accelerating.",
    schemaSnippet: "`TenantDailyCloudSpend (tenant_id VARCHAR(32), spend_date DATE, daily_spend_usd DECIMAL(10,2))`",
    targetQuery: `WITH DailySpendVelocities AS (\n  SELECT tenant_id,\n         spend_date,\n         daily_spend_usd,\n         daily_spend_usd - LAG(daily_spend_usd, 1) OVER (\n           PARTITION BY tenant_id \n           ORDER BY spend_date ASC\n         ) AS daily_velocity,\n         LAG(daily_spend_usd, 1) OVER (\n           PARTITION BY tenant_id \n           ORDER BY spend_date ASC\n         ) - LAG(daily_spend_usd, 2) OVER (\n           PARTITION BY tenant_id \n           ORDER BY spend_date ASC\n         ) AS prior_velocity\n  FROM TenantDailyCloudSpend\n)\nSELECT tenant_id,\n       spend_date,\n       daily_spend_usd,\n       daily_velocity,\n       prior_velocity,\n       ROUND(daily_velocity - prior_velocity, 2) AS spend_acceleration_usd\nFROM DailySpendVelocities\nWHERE (daily_velocity - prior_velocity) > 500.00\nORDER BY spend_acceleration_usd DESC;`,
    eli5Story: "Track how fast cloud bills are climbing. If the increase from Tuesday to Wednesday is $500 bigger than the increase from Monday to Tuesday, sound the cloud budget fire alarm.",
    commonMistakes: "Computing daily_spend_usd - LAG(daily_spend_usd, 2) directly, which gives total 2-day change rather than acceleration.",
    learningOutcomes: "Distinguish between multi-step lag offsets and second-derivative acceleration calculations."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Store Chain Daily Same-Store Sales Day-over-Day Velocity",
    ind: "Retail",
    diff: "Easy",
    table: "StoreDailySalesReports",
    scenario: "Retail district managers track daily store footfall and gross sales, computing day-over-day dollar variance against yesterday's receipts.",
    businessObjective: "Retrieve previous day sales using LAG(1) and compute daily revenue delta.",
    schemaSnippet: "`StoreDailySalesReports (store_id VARCHAR(16), report_date DATE, daily_sales_usd DECIMAL(10,2))`",
    targetQuery: `SELECT store_id,\n       report_date,\n       daily_sales_usd,\n       LAG(daily_sales_usd, 1) OVER (\n         PARTITION BY store_id \n         ORDER BY report_date ASC\n       ) AS yesterday_sales_usd,\n       ROUND(daily_sales_usd - LAG(daily_sales_usd, 1) OVER (\n         PARTITION BY store_id \n         ORDER BY report_date ASC\n       ), 2) AS dod_sales_variance\nFROM StoreDailySalesReports\nORDER BY store_id, report_date ASC;`,
    eli5Story: "Show how much money a store made today, pull yesterday's register total onto the screen with LAG, and show the difference.",
    commonMistakes: "Assuming calendar days are contiguous; if a store was closed Sunday, LAG(1) will retrieve Saturday rather than returning NULL for Sunday.",
    learningOutcomes: "Identify edge-case assumptions regarding date continuity when using row-offset window functions."
  },
  {
    title: "Commodity Retail Product Price War Competitor Matching Delay",
    ind: "Retail",
    diff: "Medium",
    table: "ProductPriceAuditHistory",
    scenario: "Dynamic pricing engines analyze competitor price matching latency by tracking the time gap between our product price changes and competitor price cuts.",
    businessObjective: "Calculate days between consecutive price adjustments per SKU using LAG() with date subtraction.",
    schemaSnippet: "`ProductPriceAuditHistory (sku VARCHAR(24), price_change_date DATE, new_price_usd DECIMAL(8,2))`",
    targetQuery: `SELECT sku,\n       price_change_date,\n       new_price_usd,\n       LAG(new_price_usd, 1) OVER (\n         PARTITION BY sku \n         ORDER BY price_change_date ASC\n       ) AS prior_price_usd,\n       (price_change_date - LAG(price_change_date, 1) OVER (\n         PARTITION BY sku \n         ORDER BY price_change_date ASC\n       )) AS days_since_last_price_change\nFROM ProductPriceAuditHistory\nORDER BY sku, price_change_date ASC;`,
    eli5Story: "Every time an item's price changes, check what the price used to be and calculate how many days passed since the last price cut.",
    commonMistakes: "Using DATEDIFF() without checking engine dialect; ANSI SQL supports direct date subtraction (date2 - date1).",
    learningOutcomes: "Compute temporal gaps between successive discrete business events using LAG()."
  },
  {
    title: "Holiday Season Order Velocity YoY Comp Sales Analysis",
    ind: "Retail",
    diff: "Hard",
    table: "DailyHolidaySalesComp",
    scenario: "Merchandising analysts evaluate holiday sales trends by calculating 364-day (52-week day-of-week aligned) Year-over-Year comp store sales.",
    businessObjective: "Retrieve the exact day-of-week aligned sales from 52 weeks prior (364 days) using LAG(364) or window interval matching.",
    schemaSnippet: "`DailyHolidaySalesComp (store_id VARCHAR(16), sale_date DATE, day_of_week INT, sales_usd DECIMAL(12,2))`",
    targetQuery: `SELECT store_id,\n       sale_date,\n       day_of_week,\n       sales_usd,\n       LAG(sales_usd, 364) OVER (\n         PARTITION BY store_id \n         ORDER BY sale_date ASC\n       ) AS prior_year_comp_sales_usd,\n       ROUND((\n         (sales_usd - LAG(sales_usd, 364) OVER (\n           PARTITION BY store_id \n           ORDER BY sale_date ASC\n         )) / NULLIF(LAG(sales_usd, 364) OVER (\n           PARTITION BY store_id \n           ORDER BY sale_date ASC\n         ), 0)\n       ) * 100, 2) AS yoy_comp_growth_pct\nFROM DailyHolidaySalesComp\nORDER BY store_id, sale_date ASC;`,
    eli5Story: "In retail, you don't compare Tuesday to a Wednesday last year; you compare Tuesday to the exact same Tuesday 52 weeks ago (364 days) using LAG(364).",
    commonMistakes: "Using LAG(365), which compares a busy Black Friday to a sleepy Saturday.",
    learningOutcomes: "Implement calendar-aligned 52-week retail comp comparisons using large-offset window lookbacks."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Patient Weight Trend Encounter-to-Encounter Delta Tracking",
    ind: "Healthcare",
    diff: "Easy",
    table: "PatientWeighInLogs",
    scenario: "Cardiology outpatient clinics monitor congestive heart failure patients for sudden fluid retention by calculating weight changes between consecutive doctor visits.",
    businessObjective: "Retrieve prior visit weight using LAG(1) and compute pound variance.",
    schemaSnippet: "`PatientWeighInLogs (patient_id VARCHAR(24), visit_date DATE, weight_lbs DECIMAL(5,1))`",
    targetQuery: `SELECT patient_id,\n       visit_date,\n       weight_lbs,\n       LAG(weight_lbs, 1) OVER (\n         PARTITION BY patient_id \n         ORDER BY visit_date ASC\n       ) AS prior_visit_weight_lbs,\n       ROUND(weight_lbs - LAG(weight_lbs, 1) OVER (\n         PARTITION BY patient_id \n         ORDER BY visit_date ASC\n       ), 1) AS weight_change_lbs\nFROM PatientWeighInLogs\nORDER BY patient_id, visit_date ASC;`,
    eli5Story: "When a heart patient steps on the clinic scale, show how much they weighed at their last visit and calculate if they gained sudden water weight.",
    commonMistakes: "Omitting PARTITION BY patient_id, comparing one patient's weight against a completely different patient.",
    learningOutcomes: "Isolate clinical subject entities when calculating sequential biological telemetry deltas."
  },
  {
    title: "ICU Vasopressor Infusion Rate Titration Step Velocity",
    ind: "Healthcare",
    diff: "Medium",
    table: "VasopressorInfusionDoses",
    scenario: "Intensive care medical directors audit norepinephrine infusion titrations, calculating the step rate change and time interval between successive nurse dosage adjustments.",
    businessObjective: "Calculate dosage rate step delta and minutes elapsed since prior titration using LAG().",
    schemaSnippet: "`VasopressorInfusionDoses (patient_id VARCHAR(24), dose_mcg_per_min DECIMAL(5,2), adjusted_at TIMESTAMP)`",
    targetQuery: `SELECT patient_id,\n       adjusted_at,\n       dose_mcg_per_min,\n       LAG(dose_mcg_per_min, 1) OVER (\n         PARTITION BY patient_id \n         ORDER BY adjusted_at ASC\n       ) AS prev_dose_mcg,\n       ROUND(dose_mcg_per_min - LAG(dose_mcg_per_min, 1) OVER (\n         PARTITION BY patient_id \n         ORDER BY adjusted_at ASC\n       ), 2) AS titration_step_mcg,\n       ROUND(EXTRACT(EPOCH FROM (adjusted_at - LAG(adjusted_at, 1) OVER (\n         PARTITION BY patient_id \n         ORDER BY adjusted_at ASC\n       ))) / 60, 1) AS minutes_since_prior_titration\nFROM VasopressorInfusionDoses\nORDER BY patient_id, adjusted_at ASC;`,
    eli5Story: "Track how much a nurse increased an ICU patient's blood pressure medication and how many minutes passed between pump adjustments.",
    commonMistakes: "Failing to convert seconds from EXTRACT(EPOCH) into minutes, leading to confusing time measurements.",
    learningOutcomes: "Extract dual physical rate and temporal interval deltas across medical device adjustment logs."
  },
  {
    title: "Ventilator Respiratory Rate Extubation Readiness Trajectory",
    ind: "Healthcare",
    diff: "Hard",
    table: "VentilatorWeaningTelemetry",
    scenario: "Critical care pulmonologists evaluate mechanical ventilator weaning trials, calculating the trajectory of spontaneous breathing rate velocity and projecting forward telemetry using LEAD().",
    businessObjective: "Compute backward 3-step trailing average respiratory rate and compare against forward 2-step projected breathing rate.",
    schemaSnippet: "`VentilatorWeaningTelemetry (patient_id VARCHAR(24), trial_step INT, resp_rate_bpm INT, tidal_volume_ml INT)`",
    targetQuery: `SELECT patient_id,\n       trial_step,\n       resp_rate_bpm,\n       LAG(resp_rate_bpm, 1) OVER (\n         PARTITION BY patient_id \n         ORDER BY trial_step ASC\n       ) AS prior_step_bpm,\n       LEAD(resp_rate_bpm, 1) OVER (\n         PARTITION BY patient_id \n         ORDER BY trial_step ASC\n       ) AS next_step_bpm,\n       ROUND((LAG(resp_rate_bpm, 1) OVER (PARTITION BY patient_id ORDER BY trial_step ASC) + \n              resp_rate_bpm + \n              LEAD(resp_rate_bpm, 1) OVER (PARTITION BY patient_id ORDER BY trial_step ASC)) / 3.0, 1) AS centered_3step_mean_bpm\nFROM VentilatorWeaningTelemetry\nORDER BY patient_id, trial_step ASC;`,
    eli5Story: "Look at a patient breathing on a ventilator: check the prior breath rate (LAG), the current rate, and the next rate (LEAD) to create a smooth centered average.",
    commonMistakes: "Assuming LAG and LEAD handle NULLs automatically at partition endpoints; edge rows will evaluate to NULL.",
    learningOutcomes: "Synthesize centered multi-point temporal interpolations using combined LAG and LEAD window operations."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Container Vessel Port Call Port-to-Port Transit Elapsed Time",
    ind: "Logistics",
    diff: "Easy",
    table: "VesselPortCalls",
    scenario: "Ocean shipping visibility systems calculate sea transit times between consecutive port calls on a container liner's rotating maritime loop.",
    businessObjective: "Retrieve prior departure timestamp using LAG(1) and compute sea transit days.",
    schemaSnippet: "`VesselPortCalls (vessel_imo INT, call_seq INT, port_code VARCHAR(8), arrival_time TIMESTAMP, departure_time TIMESTAMP)`",
    targetQuery: `SELECT vessel_imo,\n       call_seq,\n       port_code,\n       arrival_time,\n       LAG(port_code, 1) OVER (\n         PARTITION BY vessel_imo \n         ORDER BY call_seq ASC\n       ) AS departure_port,\n       ROUND(EXTRACT(EPOCH FROM (arrival_time - LAG(departure_time, 1) OVER (\n         PARTITION BY vessel_imo \n         ORDER BY call_seq ASC\n       ))) / 86400, 2) AS sea_transit_days\nFROM VesselPortCalls\nORDER BY vessel_imo, call_seq ASC;`,
    eli5Story: "When a cargo ship arrives at Rotterdam, look back at where it departed from (Shanghai) using LAG, and calculate how many days it spent at sea.",
    commonMistakes: "Subtracting arrival_time from LAG(arrival_time) instead of LAG(departure_time), counting port layover hours as sailing time.",
    learningOutcomes: "Coordinate distinct start and finish event timestamp columns across window offsets."
  },
  {
    title: "Long-Haul Truck Fleet Fuel Fill-Up Economy Velocity Tracking",
    ind: "Logistics",
    diff: "Medium",
    table: "TruckFuelStops",
    scenario: "Fleet maintenance engineers monitor diesel fuel efficiency across Class-8 semi-trucks, computing miles per gallon (MPG) between successive truck stop odometer readings.",
    businessObjective: "Calculate distance traveled since prior fuel stop using LAG(odometer_miles) and compute trip MPG.",
    schemaSnippet: "`TruckFuelStops (truck_id VARCHAR(16), stop_time TIMESTAMP, odometer_miles INT, gallons_pumped DECIMAL(6,2))`",
    targetQuery: `SELECT truck_id,\n       stop_time,\n       odometer_miles,\n       gallons_pumped,\n       odometer_miles - LAG(odometer_miles, 1) OVER (\n         PARTITION BY truck_id \n         ORDER BY stop_time ASC\n       ) AS miles_driven,\n       ROUND((\n         (odometer_miles - LAG(odometer_miles, 1) OVER (\n           PARTITION BY truck_id \n           ORDER BY stop_time ASC\n         )) / NULLIF(gallons_pumped, 0)\n       ), 2) AS mpg\nFROM TruckFuelStops\nORDER BY truck_id, stop_time ASC;`,
    eli5Story: "Every time a trucker fills the diesel tank, subtract the odometer reading from the previous fill-up using LAG, and divide by gallons pumped to get exact MPG.",
    commonMistakes: "Dividing by LAG(gallons_pumped) instead of current gallons_pumped, matching miles to the wrong fuel invoice.",
    learningOutcomes: "Construct physical efficiency calculations combining current row denominators with lagged cumulative odometer meters."
  },
  {
    title: "Cross-Dock Conveyor Belt Package Transit Bottleneck Deceleration",
    ind: "Logistics",
    diff: "Hard",
    table: "ConveyorSensorScans",
    scenario: "Automated package sorting hubs detect package jams on high-speed conveyor lines by calculating the velocity drop between consecutive photoelectric beam sensors.",
    businessObjective: "Compute scan-to-scan velocity (m/sec) using LAG, calculate deceleration, and flag packages experiencing severe speed loss.",
    schemaSnippet: "`ConveyorSensorScans (package_id VARCHAR(32), sensor_seq INT, sensor_distance_meters DECIMAL(6,2), scan_timestamp TIMESTAMP)`",
    targetQuery: `WITH SensorVelocities AS (\n  SELECT package_id,\n         sensor_seq,\n         sensor_distance_meters,\n         scan_timestamp,\n         ROUND((\n           (sensor_distance_meters - LAG(sensor_distance_meters, 1) OVER (\n             PARTITION BY package_id \n             ORDER BY sensor_seq ASC\n           )) / \n           NULLIF(EXTRACT(EPOCH FROM (scan_timestamp - LAG(scan_timestamp, 1) OVER (\n             PARTITION BY package_id \n             ORDER BY sensor_seq ASC\n           ))), 0)\n         ), 2) AS velocity_mps\n  FROM ConveyorSensorScans\n)\nSELECT package_id,\n       sensor_seq,\n       velocity_mps,\n       LAG(velocity_mps, 1) OVER (\n         PARTITION BY package_id \n         ORDER BY sensor_seq ASC\n       ) AS prior_velocity_mps,\n       ROUND(velocity_mps - LAG(velocity_mps, 1) OVER (\n         PARTITION BY package_id \n         ORDER BY sensor_seq ASC\n       ), 2) AS speed_drop_mps\nFROM SensorVelocities\nWHERE velocity_mps IS NOT NULL\nORDER BY package_id, sensor_seq ASC;`,
    eli5Story: "Check how fast a cardboard box moves between conveyor belt sensors. If it suddenly slows down by more than 2 meters per second, flag a belt jam.",
    commonMistakes: "Using a single query level to compute both velocity and acceleration without a CTE, resulting in illegal nested window functions.",
    learningOutcomes: "Chain progressive kinematic calculations across sequential CTE pipeline stages."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Podcast Episode Download Numbers Week-over-Week Momentum",
    ind: "Media",
    diff: "Easy",
    table: "PodcastWeeklyDownloads",
    scenario: "Podcast studio producers track show audience trajectory by calculating week-over-week (WoW) download growth percentage across release episodes.",
    businessObjective: "Retrieve prior week downloads using LAG(1) and compute WoW percentage growth.",
    schemaSnippet: "`PodcastWeeklyDownloads (show_id VARCHAR(24), calendar_week VARCHAR(8), downloads BIGINT)`",
    targetQuery: `SELECT show_id,\n       calendar_week,\n       downloads,\n       LAG(downloads, 1) OVER (\n         PARTITION BY show_id \n         ORDER BY calendar_week ASC\n       ) AS prior_week_downloads,\n       ROUND((\n         (downloads - LAG(downloads, 1) OVER (\n           PARTITION BY show_id \n           ORDER BY calendar_week ASC\n         ))::DECIMAL / NULLIF(LAG(downloads, 1) OVER (\n           PARTITION BY show_id \n           ORDER BY calendar_week ASC\n         ), 0)\n       ) * 100, 2) AS wow_growth_pct\nFROM PodcastWeeklyDownloads\nORDER BY show_id, calendar_week ASC;`,
    eli5Story: "Check how many people downloaded a podcast this week compared to last week using LAG, and calculate if the audience grew or shrunk.",
    commonMistakes: "Omitting the show_id partition, comparing Joe Rogan's numbers against a brand new tech show.",
    learningOutcomes: "Apply standard WoW audience velocity calculations across media catalog assets."
  },
  {
    title: "Streaming Platform Episodic Binge Watch Gap Interval Analysis",
    ind: "Media",
    diff: "Medium",
    table: "UserEpisodeWatches",
    scenario: "Streaming algorithm teams analyze viewer binge-watching habits by calculating the time gap in minutes between finishing one episode and pressing play on the next.",
    businessObjective: "Calculate viewing interval minutes between consecutive episodes per user and series using LAG().",
    schemaSnippet: "`UserEpisodeWatches (user_id VARCHAR(24), series_id VARCHAR(24), episode_num INT, started_at TIMESTAMP, finished_at TIMESTAMP)`",
    targetQuery: `SELECT user_id,\n       series_id,\n       episode_num,\n       started_at,\n       LAG(finished_at, 1) OVER (\n         PARTITION BY user_id, series_id \n         ORDER BY episode_num ASC\n       ) AS prior_episode_finished_at,\n       ROUND(EXTRACT(EPOCH FROM (started_at - LAG(finished_at, 1) OVER (\n         PARTITION BY user_id, series_id \n         ORDER BY episode_num ASC\n       ))) / 60, 1) AS binge_gap_minutes\nFROM UserEpisodeWatches\nORDER BY user_id, series_id, episode_num ASC;`,
    eli5Story: "When someone is binging a TV drama, calculate how many minutes passed between when Episode 1 ended and when they pressed play on Episode 2.",
    commonMistakes: "Subtracting started_at from LAG(started_at) instead of LAG(finished_at), including the 50-minute show length in the gap calculation.",
    learningOutcomes: "Measure behavioral dwell time between distinct user media lifecycle sessions."
  },
  {
    title: "Programmatic Ad Exchange Auction Clearing Price Volatility Trend",
    ind: "Media",
    diff: "Hard",
    table: "AdAuctionClearingHistory",
    scenario: "Ad tech programmatic exchange controllers detect publisher inventory price gouging by tracking the second derivative (acceleration) of CPM clearing prices across hourly auction windows.",
    businessObjective: "Compute 1-hour clearing price delta, 2-hour delta, and calculate CPM acceleration velocity per ad unit.",
    schemaSnippet: "`AdAuctionClearingHistory (ad_unit_id VARCHAR(32), auction_hour TIMESTAMP, clearing_cpm_usd DECIMAL(6,2))`",
    targetQuery: `WITH CpmVelocities AS (\n  SELECT ad_unit_id,\n         auction_hour,\n         clearing_cpm_usd,\n         clearing_cpm_usd - LAG(clearing_cpm_usd, 1) OVER (\n           PARTITION BY ad_unit_id \n           ORDER BY auction_hour ASC\n         ) AS cpm_velocity_1,\n         LAG(clearing_cpm_usd, 1) OVER (\n           PARTITION BY ad_unit_id \n           ORDER BY auction_hour ASC\n         ) - LAG(clearing_cpm_usd, 2) OVER (\n           PARTITION BY ad_unit_id \n           ORDER BY auction_hour ASC\n         ) AS cpm_velocity_2\n  FROM AdAuctionClearingHistory\n)\nSELECT ad_unit_id,\n       auction_hour,\n       clearing_cpm_usd,\n       cpm_velocity_1,\n       cpm_velocity_2,\n       ROUND(cpm_velocity_1 - cpm_velocity_2, 2) AS cpm_acceleration_usd\nFROM CpmVelocities\nWHERE cpm_velocity_1 IS NOT NULL AND cpm_velocity_2 IS NOT NULL\nORDER BY ad_unit_id, auction_hour ASC;`,
    eli5Story: "Check how fast advertising prices are rising per hour. If prices jumped by $1.00 this hour after only jumping by $0.10 last hour, calculate the $0.90 price surge acceleration.",
    commonMistakes: "Failing to filter out the first 2 rows where velocities evaluate to NULL, producing misleading NULL mathematical results.",
    learningOutcomes: "Deploy multi-tier LAG offsets to audit marketplace clearing price acceleration."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Active Directory Password Reset Interval Days Tracking",
    ind: "Security",
    diff: "Easy",
    table: "UserPasswordChangeLogs",
    scenario: "Identity security auditors monitor Active Directory compliance by calculating the number of days elapsed between consecutive user password updates.",
    businessObjective: "Calculate days between consecutive password resets per user using LAG().",
    schemaSnippet: "`UserPasswordChangeLogs (log_id VARCHAR(32) PRIMARY KEY, user_id VARCHAR(24), changed_date DATE)`",
    targetQuery: `SELECT user_id,\n       changed_date,\n       LAG(changed_date, 1) OVER (\n         PARTITION BY user_id \n         ORDER BY changed_date ASC\n       ) AS prior_password_change_date,\n       (changed_date - LAG(changed_date, 1) OVER (\n         PARTITION BY user_id \n         ORDER BY changed_date ASC\n       )) AS days_since_prior_reset\nFROM UserPasswordChangeLogs\nORDER BY user_id, changed_date ASC;`,
    eli5Story: "Look at every time an employee changed their corporate password, and calculate how many days they kept their old password before changing it.",
    commonMistakes: "Ordering DESC, which produces negative day intervals.",
    learningOutcomes: "Measure credential lifecycle compliance durations using sequential date deltas."
  },
  {
    title: "SOC Threat Actor Geolocation Leap Velocity Anomaly Detection",
    ind: "Security",
    diff: "Medium",
    table: "UserGeoLoginEvents",
    scenario: "Identity threat detection engines detect 'Impossible Travel' credential theft by calculating the miles traveled and hours elapsed between consecutive logins from the same user account.",
    businessObjective: "Calculate time delta between consecutive logins across different countries using LAG().",
    schemaSnippet: "`UserGeoLoginEvents (event_id VARCHAR(36) PRIMARY KEY, user_id VARCHAR(24), country_code VARCHAR(2), login_time TIMESTAMP)`",
    targetQuery: `SELECT user_id,\n       country_code,\n       login_time,\n       LAG(country_code, 1) OVER (\n         PARTITION BY user_id \n         ORDER BY login_time ASC\n       ) AS prev_country,\n       ROUND(EXTRACT(EPOCH FROM (login_time - LAG(login_time, 1) OVER (\n         PARTITION BY user_id \n         ORDER BY login_time ASC\n       ))) / 3600, 2) AS hours_since_last_login\nFROM UserGeoLoginEvents\nORDER BY user_id, login_time ASC;`,
    eli5Story: "If an employee logged in from New York at 1:00 PM and logged in from Tokyo at 1:15 PM, use LAG to catch the impossible 15-minute cross-ocean leap.",
    commonMistakes: "Using LEAD instead of LAG, which alerts on the first login rather than the suspicious second login event.",
    learningOutcomes: "Model impossible travel velocity detection rules using temporal LAG offsets."
  },
  {
    title: "Advanced Persistent Threat Command-and-Control Beacon Jitter Rate",
    ind: "Security",
    diff: "Hard",
    table: "FirewallEgressBeaconHistory",
    scenario: "Threat intelligence researchers detect sophisticated malware C2 communication channels that use randomized sleep intervals (jitter) by evaluating the change in inter-arrival times across beacon pings.",
    businessObjective: "Compute inter-packet time deltas, measure second-order interval jitter deltas, and flag non-random beaconing.",
    schemaSnippet: "`FirewallEgressBeaconHistory (beacon_id BIGINT PRIMARY KEY, host_id VARCHAR(24), dest_ip VARCHAR(45), ping_time TIMESTAMP)`",
    targetQuery: `WITH BeaconDeltas AS (\n  SELECT beacon_id,\n         host_id,\n         dest_ip,\n         ping_time,\n         EXTRACT(EPOCH FROM (ping_time - LAG(ping_time, 1) OVER (\n           PARTITION BY host_id, dest_ip \n           ORDER BY ping_time ASC\n         ))) AS delta_seconds\n  FROM FirewallEgressBeaconHistory\n)\nSELECT beacon_id,\n       host_id,\n       dest_ip,\n       ping_time,\n       delta_seconds,\n       LAG(delta_seconds, 1) OVER (\n         PARTITION BY host_id, dest_ip \n         ORDER BY ping_time ASC\n       ) AS prior_delta_seconds,\n       ROUND(ABS(delta_seconds - LAG(delta_seconds, 1) OVER (\n         PARTITION BY host_id, dest_ip \n         ORDER BY ping_time ASC\n       )), 3) AS jitter_spread_seconds\nFROM BeaconDeltas\nWHERE delta_seconds IS NOT NULL\nORDER BY host_id, dest_ip, ping_time ASC;`,
    eli5Story: "Check the time gap between pings from a computer to a mystery server. If the time gap barely changes at all from ping to ping, you've caught a robot malware beacon.",
    commonMistakes: "Attempting to calculate jitter in a single window step without first isolating the interval delta in an initial CTE.",
    learningOutcomes: "Deconstruct complex network timing telemetry using chained differential window operations."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Server Exhaust Temperature Sensor Step-Change Heat Velocity",
    ind: "Hardware",
    diff: "Easy",
    table: "ServerChassisThermalLogs",
    scenario: "Data center facilities engineers monitor server rack thermal health by calculating temperature changes between consecutive 1-minute sensor pings.",
    businessObjective: "Calculate temperature change from previous reading using LAG(1).",
    schemaSnippet: "`ServerChassisThermalLogs (sensor_id VARCHAR(24), logged_at TIMESTAMP, temp_c DECIMAL(4,1))`",
    targetQuery: `SELECT sensor_id,\n       logged_at,\n       temp_c,\n       LAG(temp_c, 1) OVER (\n         PARTITION BY sensor_id \n         ORDER BY logged_at ASC\n       ) AS prior_temp_c,\n       ROUND(temp_c - LAG(temp_c, 1) OVER (\n         PARTITION BY sensor_id \n         ORDER BY logged_at ASC\n       ), 1) AS temp_delta_c\nFROM ServerChassisThermalLogs\nORDER BY sensor_id, logged_at ASC;`,
    eli5Story: "Check a server thermometer: compare right now to 1 minute ago using LAG, and see if the computer is heating up.",
    commonMistakes: "Omitting sensor_id from PARTITION BY, comparing temperature readings from two completely different racks.",
    learningOutcomes: "Track physical sensor temperature trajectories using single-step window lag offsets."
  },
  {
    title: "Wind Turbine Generator Rotor RPM Acceleration Monitoring",
    ind: "Hardware",
    diff: "Medium",
    table: "TurbineGeneratorRpm",
    scenario: "Renewable energy SCADA systems detect wind turbine overspeed risks by calculating the rate of change of generator rotor RPM between consecutive 5-second pings.",
    businessObjective: "Compute RPM velocity and RPM acceleration per turbine using multi-step LAG().",
    schemaSnippet: "`TurbineGeneratorRpm (turbine_id VARCHAR(16), ping_time TIMESTAMP, rotor_rpm INT)`",
    targetQuery: `SELECT turbine_id,\n       ping_time,\n       rotor_rpm,\n       rotor_rpm - LAG(rotor_rpm, 1) OVER (\n         PARTITION BY turbine_id \n         ORDER BY ping_time ASC\n       ) AS rpm_change_5s,\n       ROUND((\n         (rotor_rpm - LAG(rotor_rpm, 1) OVER (\n           PARTITION BY turbine_id \n           ORDER BY ping_time ASC\n         ))::DECIMAL / NULLIF(LAG(rotor_rpm, 1) OVER (\n           PARTITION BY turbine_id \n           ORDER BY ping_time ASC\n         ), 0)\n       ) * 100, 2) AS rpm_acceleration_pct\nFROM TurbineGeneratorRpm\nORDER BY turbine_id, ping_time ASC;`,
    eli5Story: "Track how fast a giant wind turbine is spinning. Calculate how many extra RPMs it gained in the last 5 seconds, and calculate the speed-up percentage.",
    commonMistakes: "Failing to guard against 0 RPM with NULLIF when a turbine starts from a complete standstill.",
    learningOutcomes: "Model mechanical rotational acceleration using temporal window deltas."
  },
  {
    title: "Cleanroom Chemical Vapor Deposition Film Thickness Drift Acceleration",
    ind: "Hardware",
    diff: "Hard",
    table: "CvdDepositionRuns",
    scenario: "Semiconductor process engineers monitor thin-film silicon oxide thickness drift across successive wafer processing runs to trigger chemical injector nozzle cleaning.",
    businessObjective: "Compute run-to-run thickness delta, calculate thickness drift acceleration (second derivative), and flag accelerating nozzle clogging.",
    schemaSnippet: "`CvdDepositionRuns (chamber_id VARCHAR(16), run_seq INT, film_thickness_angstroms DECIMAL(6,1))`",
    targetQuery: `WITH DepositionDeltas AS (\n  SELECT chamber_id,\n         run_seq,\n         film_thickness_angstroms,\n         film_thickness_angstroms - LAG(film_thickness_angstroms, 1) OVER (\n           PARTITION BY chamber_id \n           ORDER BY run_seq ASC\n         ) AS thickness_velocity_1,\n         LAG(film_thickness_angstroms, 1) OVER (\n           PARTITION BY chamber_id \n           ORDER BY run_seq ASC\n         ) - LAG(film_thickness_angstroms, 2) OVER (\n           PARTITION BY chamber_id \n           ORDER BY run_seq ASC\n         ) AS thickness_velocity_2\n  FROM CvdDepositionRuns\n)\nSELECT chamber_id,\n       run_seq,\n       film_thickness_angstroms,\n       thickness_velocity_1,\n       thickness_velocity_2,\n       ROUND(thickness_velocity_1 - thickness_velocity_2, 2) AS thickness_acceleration_angstroms\nFROM DepositionDeltas\nWHERE thickness_velocity_1 IS NOT NULL AND thickness_velocity_2 IS NOT NULL\nORDER BY chamber_id, run_seq ASC;`,
    eli5Story: "Check the atomic thickness of a microchip layer across manufacturing runs. If the layer is getting thinner at an accelerating pace, schedule cleanroom maintenance.",
    commonMistakes: "Ordering by timestamp instead of run_seq, which can break if wafers are re-measured out of batch sequence.",
    learningOutcomes: "Apply deterministic integer batch sequencing for chemical manufacturing acceleration models."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Employee Annual Compensation Merit Increase Step Tracking",
    ind: "HR",
    diff: "Easy",
    table: "EmployeeSalaryHistory",
    scenario: "Total rewards compensation teams audit historical employee merit raises by calculating dollar increases and percentage raises across consecutive promotion events.",
    businessObjective: "Retrieve prior salary using LAG(1) and compute merit increase percentage.",
    schemaSnippet: "`EmployeeSalaryHistory (emp_id VARCHAR(16), effective_date DATE, salary_usd DECIMAL(10,2))`",
    targetQuery: `SELECT emp_id,\n       effective_date,\n       salary_usd,\n       LAG(salary_usd, 1) OVER (\n         PARTITION BY emp_id \n         ORDER BY effective_date ASC\n       ) AS prior_salary_usd,\n       ROUND(salary_usd - LAG(salary_usd, 1) OVER (\n         PARTITION BY emp_id \n         ORDER BY effective_date ASC\n       ), 2) AS raise_amount_usd,\n       ROUND((\n         (salary_usd - LAG(salary_usd, 1) OVER (\n           PARTITION BY emp_id \n           ORDER BY effective_date ASC\n         )) / NULLIF(LAG(salary_usd, 1) OVER (\n           PARTITION BY emp_id \n           ORDER BY effective_date ASC\n         ), 0)\n       ) * 100, 2) AS raise_pct\nFROM EmployeeSalaryHistory\nORDER BY emp_id, effective_date ASC;`,
    eli5Story: "Look at every raise an employee ever got: show their previous salary with LAG and calculate their raise dollar amount and percentage increase.",
    commonMistakes: "Ordering DESC, which calculates negative pay cuts instead of positive raises.",
    learningOutcomes: "Calculate discrete historical compensation adjustments using partitioned lag offsets."
  },
  {
    title: "Corporate Department Headcount Quarter-over-Quarter Fluctuation",
    ind: "HR",
    diff: "Medium",
    table: "DepartmentQuarterlyHeadcount",
    scenario: "Workforce planning committees monitor corporate department expansions and contractions by calculating QoQ net headcount changes.",
    businessObjective: "Calculate prior quarter headcount and net staffing variance using LAG().",
    schemaSnippet: "`DepartmentQuarterlyHeadcount (department VARCHAR(24), fiscal_qtr VARCHAR(7), active_headcount INT)`",
    targetQuery: `SELECT department,\n       fiscal_qtr,\n       active_headcount,\n       LAG(active_headcount, 1) OVER (\n         PARTITION BY department \n         ORDER BY fiscal_qtr ASC\n       ) AS prev_qtr_headcount,\n       active_headcount - LAG(active_headcount, 1) OVER (\n         PARTITION BY department \n         ORDER BY fiscal_qtr ASC\n       ) AS net_headcount_change\nFROM DepartmentQuarterlyHeadcount\nORDER BY department, fiscal_qtr ASC;`,
    eli5Story: "See how many people work in Marketing each quarter, pull last quarter's headcount onto the screen with LAG, and show net hiring or downsizing.",
    commonMistakes: "Sorting without standardized fiscal quarter strings (e.g. mixing 'Q1 2026' with '2026-Q1'), which breaks alphabetical sorting.",
    learningOutcomes: "Maintain chronological sorting discipline for quarterly workforce analytics."
  },
  {
    title: "Sales Representative Quarterly Bookings Momentum Acceleration",
    ind: "HR",
    diff: "Hard",
    table: "RepQuarterlyBookings",
    scenario: "Sales incentive compensation analysts calculate commission accelerators by evaluating whether an account executive's booking growth is accelerating across 3 consecutive quarters.",
    businessObjective: "Compute 1-quarter revenue velocity, 2-quarter velocity, and calculate bookings acceleration per sales rep.",
    schemaSnippet: "`RepQuarterlyBookings (rep_id VARCHAR(16), fiscal_quarter VARCHAR(7), closed_usd DECIMAL(12,2))`",
    targetQuery: `WITH RepBookingsVelocities AS (\n  SELECT rep_id,\n         fiscal_quarter,\n         closed_usd,\n         closed_usd - LAG(closed_usd, 1) OVER (\n           PARTITION BY rep_id \n           ORDER BY fiscal_quarter ASC\n         ) AS velocity_1,\n         LAG(closed_usd, 1) OVER (\n           PARTITION BY rep_id \n           ORDER BY fiscal_quarter ASC\n         ) - LAG(closed_usd, 2) OVER (\n           PARTITION BY rep_id \n           ORDER BY fiscal_quarter ASC\n         ) AS velocity_2\n  FROM RepQuarterlyBookings\n)\nSELECT rep_id,\n       fiscal_quarter,\n       closed_usd,\n       velocity_1,\n       velocity_2,\n       ROUND(velocity_1 - velocity_2, 2) AS bookings_acceleration_usd\nFROM RepBookingsVelocities\nWHERE velocity_1 IS NOT NULL AND velocity_2 IS NOT NULL\nORDER BY rep_id, fiscal_quarter ASC;`,
    eli5Story: "Track how much a salesperson's bookings grew from Q1 to Q2, compare it to growth from Q2 to Q3, and see if their sales engine is speeding up.",
    commonMistakes: "Omitting the WHERE filter for NOT NULL, leaving incomplete first-year baseline rows in sales accelerator bonus calculations.",
    learningOutcomes: "Evaluate executive sales acceleration curves using chained differential window logic."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Kubernetes Cluster Node CPU Utilization Hour-over-Hour Step Change",
    ind: "Platforms",
    diff: "Easy",
    table: "NodeHourlyCpuUtilization",
    scenario: "Platform infrastructure teams monitor cloud cluster nodes to detect runaway CPU spikes by comparing hourly utilization against the previous hour.",
    businessObjective: "Calculate hourly CPU percentage point delta using LAG(1).",
    schemaSnippet: "`NodeHourlyCpuUtilization (node_id VARCHAR(32), snapshot_hour TIMESTAMP, cpu_util_pct DECIMAL(4,1))`",
    targetQuery: `SELECT node_id,\n       snapshot_hour,\n       cpu_util_pct,\n       LAG(cpu_util_pct, 1) OVER (\n         PARTITION BY node_id \n         ORDER BY snapshot_hour ASC\n       ) AS prev_hour_cpu_pct,\n       ROUND(cpu_util_pct - LAG(cpu_util_pct, 1) OVER (\n         PARTITION BY node_id \n         ORDER BY snapshot_hour ASC\n       ), 1) AS cpu_surge_delta\nFROM NodeHourlyCpuUtilization\nORDER BY node_id, snapshot_hour ASC;`,
    eli5Story: "Check a server's CPU load right now, compare it to 1 hour ago using LAG, and see if a software bug caused CPU usage to jump.",
    commonMistakes: "Omitting the node_id partition, comparing node-1 against node-2.",
    learningOutcomes: "Isolate platform infrastructure nodes for temporal telemetry delta calculation."
  },
  {
    title: "Database Transaction Log Sequence Number LSN Gap Tracking",
    ind: "Platforms",
    diff: "Medium",
    table: "DbTransactionLogRecords",
    scenario: "Database replication engines verify write-ahead log (WAL) integrity by calculating the byte difference between consecutive Log Sequence Numbers (LSN).",
    businessObjective: "Calculate byte distance between consecutive WAL log entries using LAG().",
    schemaSnippet: "`DbTransactionLogRecords (record_id BIGINT PRIMARY KEY, lsn_offset BIGINT, written_at TIMESTAMP)`",
    targetQuery: `SELECT record_id,\n       lsn_offset,\n       written_at,\n       LAG(lsn_offset, 1) OVER (ORDER BY written_at ASC, record_id ASC) AS prev_lsn_offset,\n       lsn_offset - LAG(lsn_offset, 1) OVER (ORDER BY written_at ASC, record_id ASC) AS wal_bytes_written\nFROM DbTransactionLogRecords\nORDER BY written_at ASC, record_id ASC;`,
    eli5Story: "Number every write to the database ledger. Subtract the previous transaction's log position with LAG to see exactly how many bytes that query wrote.",
    commonMistakes: "Assuming LSN offsets are always contiguous integers; LSN offsets represent physical byte positions in the write-ahead log file.",
    learningOutcomes: "Measure physical WAL throughput by taking deltas of monotonic log byte offsets."
  },
  {
    title: "Kafka Consumer Partition Lag Draining Rate Velocity Acceleration",
    ind: "Platforms",
    diff: "Hard",
    table: "KafkaPartitionLagSamples",
    scenario: "Streaming infrastructure SREs evaluate whether a lagging consumer worker is catching up or falling further behind by calculating lag draining acceleration.",
    businessObjective: "Compute lag drainage velocity (messages/sec), prior velocity, and acceleration per partition.",
    schemaSnippet: "`KafkaPartitionLagSamples (topic VARCHAR(32), partition_id INT, sample_time TIMESTAMP, lag_messages BIGINT)`",
    targetQuery: `WITH LagVelocities AS (\n  SELECT topic,\n         partition_id,\n         sample_time,\n         lag_messages,\n         ROUND((\n           (lag_messages - LAG(lag_messages, 1) OVER (\n             PARTITION BY topic, partition_id \n             ORDER BY sample_time ASC\n           ))::DECIMAL / \n           NULLIF(EXTRACT(EPOCH FROM (sample_time - LAG(sample_time, 1) OVER (\n             PARTITION BY topic, partition_id \n             ORDER BY sample_time ASC\n           ))), 0)\n         ), 2) AS drain_velocity_mps\n  FROM KafkaPartitionLagSamples\n)\nSELECT topic,\n       partition_id,\n       sample_time,\n       lag_messages,\n       drain_velocity_mps,\n       LAG(drain_velocity_mps, 1) OVER (\n         PARTITION BY topic, partition_id \n         ORDER BY sample_time ASC\n       ) AS prior_drain_velocity_mps,\n       ROUND(drain_velocity_mps - LAG(drain_velocity_mps, 1) OVER (\n         PARTITION BY topic, partition_id \n         ORDER BY sample_time ASC\n       ), 2) AS lag_acceleration_mps2\nFROM LagVelocities\nWHERE drain_velocity_mps IS NOT NULL\nORDER BY topic, partition_id, sample_time ASC;`,
    eli5Story: "Check how fast a Kafka worker is chewing through backlogged messages. See if it is speeding up its processing rate or if the queue is growing faster than it can eat.",
    commonMistakes: "Failing to divide by sample time interval, assuming periodic telemetry checks arrive at perfectly identical intervals.",
    learningOutcomes: "Model distributed queue recovery dynamics using rate-of-change window pipelines."
  }
];
