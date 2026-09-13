// =============================================================================
// SECTION 9 - PART 8: CUMULATIVE RUNNING TOTALS & BANK LEDGERS (30 DISTINCT CASES)
// 10 Easy, 10 Medium, 10 Hard across 10 Industries
// Focus: ROWS UNBOUNDED PRECEDING, Ledger Reconciliation, Running Max/Min, Running Balances
// =============================================================================

module.exports = [
  // --- FINTECH (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Double-Entry Bank Account Cumulative Running Balance Ledger",
    ind: "Fintech",
    diff: "Easy",
    table: "BankAccountLedgerEntries",
    scenario: "Core banking engines calculate a checking account's running available balance after every credit and debit transaction, ensuring proper transaction sequencing.",
    businessObjective: "Compute running account balance using SUM() OVER (ORDER BY ... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`BankAccountLedgerEntries (entry_id BIGINT PRIMARY KEY, account_id VARCHAR(24), entry_date DATE, amount_usd DECIMAL(12,2))`",
    targetQuery: `SELECT entry_id,\n       account_id,\n       entry_date,\n       amount_usd,\n       ROUND(SUM(amount_usd) OVER (\n         PARTITION BY account_id \n         ORDER BY entry_date ASC, entry_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 2) AS running_balance_usd\nFROM BankAccountLedgerEntries\nORDER BY account_id, entry_date ASC, entry_id ASC;`,
    eli5Story: "Every time money enters or leaves a bank account, add it to the running ledger total so the customer always sees their exact live balance after each transaction.",
    commonMistakes: "Using RANGE instead of ROWS when multiple transactions occur on the same date; RANGE lumps same-day transactions together into a single jump.",
    learningOutcomes: "Enforce deterministic transaction-by-transaction running totals using ROWS BETWEEN UNBOUNDED PRECEDING."
  },
  {
    title: "Credit Line Overdraft Breach Identification via Running Balance",
    ind: "Fintech",
    diff: "Medium",
    table: "CreditLineTransactions",
    scenario: "Retail bank risk engines detect overdraft breaches on commercial credit lines by tracking running debt balances against credit limits, flagging the exact transaction that triggered a violation.",
    businessObjective: "Calculate running debt balance and flag transactions where running balance exceeds credit limit.",
    schemaSnippet: "`CreditLineTransactions (tx_id VARCHAR(32) PRIMARY KEY, credit_line_id VARCHAR(24), draw_amount DECIMAL(10,2), credit_limit DECIMAL(10,2), tx_time TIMESTAMP)`",
    targetQuery: `WITH RunningBalances AS (\n  SELECT tx_id,\n         credit_line_id,\n         draw_amount,\n         credit_limit,\n         tx_time,\n         SUM(draw_amount) OVER (\n           PARTITION BY credit_line_id \n           ORDER BY tx_time ASC, tx_id ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS running_drawn_usd\n  FROM CreditLineTransactions\n)\nSELECT tx_id,\n       credit_line_id,\n       draw_amount,\n       credit_limit,\n       running_drawn_usd,\n       CASE WHEN running_drawn_usd > credit_limit THEN 'OVERDRAFT_BREACH'\n            ELSE 'WITHIN_LIMIT' END AS compliance_status\nFROM RunningBalances\nORDER BY credit_line_id, tx_time ASC;`,
    eli5Story: "Keep a running total of how much credit a business has drawn down. The second the running total passes their credit limit, stamp the transaction as an Overdraft Breach.",
    commonMistakes: "Omitting the secondary sort key tx_id, which can cause non-deterministic balances if two transactions land in the same second.",
    learningOutcomes: "Deploy running sum windows in CTEs to evaluate real-time credit limit compliance."
  },
  {
    title: "Hedge Fund High-Water Mark & Peak-to-Trough Drawdown Ledger",
    ind: "Fintech",
    diff: "Hard",
    table: "HedgeFundDailyNav",
    scenario: "Quantitative hedge funds calculate performance fee eligibility by tracking daily fund Net Asset Value (NAV), calculating the historical running peak (High-Water Mark) and peak-to-trough percentage drawdown.",
    businessObjective: "Compute running maximum NAV using MAX() OVER (... ROWS UNBOUNDED PRECEDING) and calculate percentage drawdown from peak.",
    schemaSnippet: "`HedgeFundDailyNav (fund_id VARCHAR(16), trading_date DATE, nav_per_share DECIMAL(10,4))`",
    targetQuery: `SELECT fund_id,\n       trading_date,\n       nav_per_share,\n       MAX(nav_per_share) OVER (\n         PARTITION BY fund_id \n         ORDER BY trading_date ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS high_water_mark,\n       ROUND((\n         (nav_per_share - MAX(nav_per_share) OVER (\n           PARTITION BY fund_id \n           ORDER BY trading_date ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         )) / \n         MAX(nav_per_share) OVER (\n           PARTITION BY fund_id \n           ORDER BY trading_date ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         )\n       ) * 100, 2) AS drawdown_pct\nFROM HedgeFundDailyNav\nORDER BY fund_id, trading_date ASC;`,
    eli5Story: "Track the all-time highest record price a hedge fund has ever hit up to today (running MAX). If today's price is below that record high, calculate the drawdown percentage loss.",
    commonMistakes: "Using a global MAX(nav_per_share) OVER (), which uses future peak values rather than historical peaks up to the current date.",
    learningOutcomes: "Formulate running high-water mark and drawdown models using cumulative MAX() windows."
  },

  // --- SAAS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "SaaS Enterprise Annual Contract Value Cumulative Booking Pacing",
    ind: "SaaS",
    diff: "Easy",
    table: "ClosedSalesDeals",
    scenario: "Sales leadership monitors quarterly booking velocity by computing cumulative closed ARR across the sales quarter.",
    businessObjective: "Calculate cumulative running closed ARR using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`ClosedSalesDeals (deal_id VARCHAR(32) PRIMARY KEY, sales_quarter VARCHAR(7), close_date DATE, arr_usd DECIMAL(10,2))`",
    targetQuery: `SELECT deal_id,\n       sales_quarter,\n       close_date,\n       arr_usd,\n       SUM(arr_usd) OVER (\n         PARTITION BY sales_quarter \n         ORDER BY close_date ASC, deal_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_quarter_arr_usd\nFROM ClosedSalesDeals\nORDER BY sales_quarter, close_date ASC;`,
    eli5Story: "Every time a salesperson closes an enterprise deal, add it to the running quarterly scoreboard so the CEO sees total sales climb day by day.",
    commonMistakes: "Omitting PARTITION BY sales_quarter, which would blend Q1 and Q2 sales into one giant continuous sum.",
    learningOutcomes: "Partition cumulative revenue pacing across discrete fiscal quarter boundaries."
  },
  {
    title: "SaaS Pre-Paid Cloud Credits Depletion Burn-Down Ledger",
    ind: "SaaS",
    diff: "Medium",
    table: "TenantDailyCreditUsage",
    scenario: "Usage-based SaaS billing engines maintain customer credit balances by calculating cumulative daily consumption against an initial pre-paid credit grant.",
    businessObjective: "Calculate cumulative usage and subtract from starting balance to derive remaining credit balance.",
    schemaSnippet: "`TenantDailyCreditUsage (tenant_id VARCHAR(32), usage_date DATE, credits_consumed INT, initial_grant INT)`",
    targetQuery: `SELECT tenant_id,\n       usage_date,\n       credits_consumed,\n       initial_grant,\n       SUM(credits_consumed) OVER (\n         PARTITION BY tenant_id \n         ORDER BY usage_date ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_credits_used,\n       initial_grant - SUM(credits_consumed) OVER (\n         PARTITION BY tenant_id \n         ORDER BY usage_date ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS remaining_credit_balance\nFROM TenantDailyCreditUsage\nORDER BY tenant_id, usage_date ASC;`,
    eli5Story: "A company bought 10,000 cloud credits. Keep a running total of how many credits they burn each day, and subtract it from 10,000 to show their live credit balance.",
    commonMistakes: "Subtracting credits row-by-row without cumulative aggregation, which only subtracts the current day's usage from the initial grant.",
    learningOutcomes: "Implement consumption burn-down ledgers using running window sums."
  },
  {
    title: "Multi-Tenant API Rate Limit Quota Burst Threshold Tracking",
    ind: "SaaS",
    diff: "Hard",
    table: "TenantHourlyApiRequests",
    scenario: "API gateways monitor customer rate limits across rolling multi-hour windows, tracking cumulative requests and flagging when cumulative volume crosses contract limits.",
    businessObjective: "Compute running cumulative hourly requests and calculate percentage of monthly contract quota consumed.",
    schemaSnippet: "`TenantHourlyApiRequests (tenant_id VARCHAR(32), billing_month VARCHAR(7), request_hour TIMESTAMP, calls_count INT, monthly_quota INT)`",
    targetQuery: `SELECT tenant_id,\n       billing_month,\n       request_hour,\n       calls_count,\n       monthly_quota,\n       SUM(calls_count) OVER (\n         PARTITION BY tenant_id, billing_month \n         ORDER BY request_hour ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_month_calls,\n       ROUND((\n         SUM(calls_count) OVER (\n           PARTITION BY tenant_id, billing_month \n           ORDER BY request_hour ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         )::DECIMAL / monthly_quota\n       ) * 100, 2) AS quota_consumed_pct\nFROM TenantHourlyApiRequests\nORDER BY tenant_id, billing_month, request_hour ASC;`,
    eli5Story: "Track every single hour's worth of API calls a customer makes during the month. Keep a running total so we can warn them when they've used 80%, 90%, and 100% of their limit.",
    commonMistakes: "Omitting the billing_month partition, causing API calls to accumulate across entire calendar years.",
    learningOutcomes: "Apply composite partition boundaries to cumulative usage tracking systems."
  },

  // --- RETAIL (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Retail Store Daily Register Gross Cash Receipts Running Total",
    ind: "Retail",
    diff: "Easy",
    table: "RegisterShiftTotals",
    scenario: "Store shift supervisors balance daily cash drawers by calculating the cumulative running sales total across all register drawers over the business day.",
    businessObjective: "Compute running daily sales using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`RegisterShiftTotals (store_id VARCHAR(16), register_id INT, business_date DATE, drawer_total DECIMAL(8,2))`",
    targetQuery: `SELECT store_id,\n       business_date,\n       register_id,\n       drawer_total,\n       ROUND(SUM(drawer_total) OVER (\n         PARTITION BY store_id, business_date \n         ORDER BY register_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 2) AS running_store_daily_cash\nFROM RegisterShiftTotals\nORDER BY store_id, business_date, register_id ASC;`,
    eli5Story: "At the end of the day, count cash in Register 1, add Register 2, add Register 3... showing the running total of all store cash counted so far.",
    commonMistakes: "Omitting business_date from PARTITION BY, adding cash from multiple days together.",
    learningOutcomes: "Partition running financial ledger totals by physical store and business calendar date."
  },
  {
    title: "Warehouse Inventory Stock Level Continuous Depletion Ledger",
    ind: "Retail",
    diff: "Medium",
    table: "WarehouseStockMovements",
    scenario: "Fulfillment center inventory systems track physical SKU stock levels by calculating running cumulative net changes from inbound shipments and outbound customer orders.",
    businessObjective: "Calculate running on-hand stock quantity after each inventory movement.",
    schemaSnippet: "`WarehouseStockMovements (movement_id BIGINT PRIMARY KEY, warehouse_id VARCHAR(16), sku VARCHAR(24), movement_qty INT, logged_at TIMESTAMP)`",
    targetQuery: `SELECT movement_id,\n       warehouse_id,\n       sku,\n       movement_qty,\n       logged_at,\n       SUM(movement_qty) OVER (\n         PARTITION BY warehouse_id, sku \n         ORDER BY logged_at ASC, movement_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS current_on_hand_stock\nFROM WarehouseStockMovements\nORDER BY warehouse_id, sku, logged_at ASC;`,
    eli5Story: "When 50 boxes arrive (+50) and 10 are shipped out (-10), update the running inventory count (+40) so the computer always knows exactly how many shirts are on the shelf.",
    commonMistakes: "Using RANGE instead of ROWS, causing simultaneous movements to merge into a single jump.",
    learningOutcomes: "Build high-integrity inventory ledgers using discrete chronological window frames."
  },
  {
    title: "Black Friday Flash Sale SKU Inventory Depletion Cutoff Tracker",
    ind: "Retail",
    diff: "Hard",
    table: "FlashSaleOrderLineItems",
    scenario: "E-commerce order fulfillment engines enforce strict flash-sale caps by calculating cumulative units purchased and flagging the exact order line that exhausted available inventory.",
    businessObjective: "Calculate running cumulative quantity and flag orders exceeding inventory allocation threshold.",
    schemaSnippet: "`FlashSaleOrderLineItems (line_item_id VARCHAR(36) PRIMARY KEY, sku VARCHAR(24), allocated_stock INT, order_qty INT, order_time TIMESTAMP)`",
    targetQuery: `WITH RunningOrderStock AS (\n  SELECT line_item_id,\n         sku,\n         allocated_stock,\n         order_qty,\n         order_time,\n         SUM(order_qty) OVER (\n           PARTITION BY sku \n           ORDER BY order_time ASC, line_item_id ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS cumulative_units_sold\n  FROM FlashSaleOrderLineItems\n)\nSELECT line_item_id,\n       sku,\n       order_qty,\n       allocated_stock,\n       cumulative_units_sold,\n       CASE WHEN cumulative_units_sold <= allocated_stock THEN 'FULFILLABLE'\n            WHEN (cumulative_units_sold - order_qty) < allocated_stock THEN 'PARTIAL_FILL'\n            ELSE 'STOCKOUT_BACKORDER' END AS fulfillment_verdict\nFROM RunningOrderStock\nORDER BY sku, order_time ASC;`,
    eli5Story: "We have 100 discounted laptops. As orders rush in, keep a running total of units sold. The moment the total passes 100, mark orders as Sold Out.",
    commonMistakes: "Failing to account for partial fills where an order requested 5 units but only 2 remained before stockout.",
    learningOutcomes: "Classify operational fulfillment states by comparing running window sums against physical allocation boundaries."
  },

  // --- HEALTHCARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Chemotherapy Protocol Cumulative Drug Dosage Toxicity Tracker",
    ind: "Healthcare",
    diff: "Easy",
    table: "PatientChemoInfusions",
    scenario: "Oncology clinical pharmacists track lifetime cumulative doxorubicin exposure to prevent irreversible drug-induced cardiotoxicity.",
    businessObjective: "Calculate cumulative lifetime administered dosage using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`PatientChemoInfusions (infusion_id VARCHAR(32) PRIMARY KEY, patient_id VARCHAR(24), drug_code VARCHAR(16), dose_mg INT, admin_date DATE)`",
    targetQuery: `SELECT infusion_id,\n       patient_id,\n       drug_code,\n       admin_date,\n       dose_mg,\n       SUM(dose_mg) OVER (\n         PARTITION BY patient_id, drug_code \n         ORDER BY admin_date ASC, infusion_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS lifetime_cumulative_dose_mg\nFROM PatientChemoInfusions\nORDER BY patient_id, drug_code, admin_date ASC;`,
    eli5Story: "Every time a cancer patient receives an infusion, add it to their running lifetime total so doctors know before they reach dangerous heart toxicity limits.",
    commonMistakes: "Omitting drug_code from PARTITION BY, accidentally summing different chemotherapy medications into a single number.",
    learningOutcomes: "Track cumulative pharmacological exposure using entity and medication partition fences."
  },
  {
    title: "ICU Patient Daily Fluid Balance Cumulative Retention Ledger",
    ind: "Healthcare",
    diff: "Medium",
    table: "IcuFluidIntakeOutput",
    scenario: "Intensive care intensivists monitor septic shock patients by tracking cumulative net fluid balance (IV inputs minus urine output) across their ICU stay.",
    businessObjective: "Compute daily net fluid balance and running cumulative fluid retention per patient stay.",
    schemaSnippet: "`IcuFluidIntakeOutput (stay_id VARCHAR(24), recording_day INT, intake_ml INT, output_ml INT)`",
    targetQuery: `SELECT stay_id,\n       recording_day,\n       intake_ml,\n       output_ml,\n       (intake_ml - output_ml) AS daily_net_fluid_ml,\n       SUM(intake_ml - output_ml) OVER (\n         PARTITION BY stay_id \n         ORDER BY recording_day ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_fluid_balance_ml\nFROM IcuFluidIntakeOutput\nORDER BY stay_id, recording_day ASC;`,
    eli5Story: "Subtract how much water a patient lost from how much IV fluid they received today. Then keep a running total across all days in the ICU to detect dangerous fluid overload.",
    commonMistakes: "Sorting DESC, which sums backward from discharge to admission.",
    learningOutcomes: "Model biological intake-output conservation ledgers using running window sums."
  },
  {
    title: "Hospital Pharmacy Controlled Substance Narcotic Vault Ledger",
    ind: "Healthcare",
    diff: "Hard",
    table: "NarcoticVaultDispensations",
    scenario: "Hospital compliance officers audit automated narcotic dispensing machines (Pyxis) by calculating running inventory balances and flagging reconciliation discrepancies where vault balance turns negative.",
    businessObjective: "Calculate running narcotic vault balance and flag negative-balance diversion anomalies.",
    schemaSnippet: "`NarcoticVaultDispensations (event_id BIGINT PRIMARY KEY, vault_id VARCHAR(16), drug_ndc VARCHAR(16), units_delta INT, event_time TIMESTAMP)`",
    targetQuery: `WITH RunningVaultState AS (\n  SELECT event_id,\n         vault_id,\n         drug_ndc,\n         units_delta,\n         event_time,\n         SUM(units_delta) OVER (\n           PARTITION BY vault_id, drug_ndc \n           ORDER BY event_time ASC, event_id ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS running_vault_count\n  FROM NarcoticVaultDispensations\n)\nSELECT event_id,\n       vault_id,\n       drug_ndc,\n       units_delta,\n       event_time,\n       running_vault_count,\n       CASE WHEN running_vault_count < 0 THEN 'THEFT_DIVERSION_ALERT'\n            ELSE 'VALID_BALANCE' END AS audit_status\nFROM RunningVaultState\nORDER BY vault_id, drug_ndc, event_time ASC;`,
    eli5Story: "When pain pills are added or removed from the locked hospital safe, keep a running count. If the running count ever dips below zero, sound the alarm for medication theft.",
    commonMistakes: "Using GROUP BY, which destroys the event timeline needed to identify which specific nurse triggered the negative balance.",
    learningOutcomes: "Maintain chain-of-custody compliance ledgers using cumulative running window sums."
  },

  // --- LOGISTICS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Freight Cargo Container Fleet Cumulative Loaded Tonnage Pacing",
    ind: "Logistics",
    diff: "Easy",
    table: "ContainerStowageManifests",
    scenario: "Marine terminal cargo planners monitor ship stability by calculating running cumulative cargo weight loaded into each vessel cargo hold.",
    businessObjective: "Calculate running cumulative metric tons loaded per cargo hold using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`ContainerStowageManifests (container_id VARCHAR(20), vessel_id VARCHAR(16), hold_number INT, load_seq INT, gross_weight_tons DECIMAL(6,2))`",
    targetQuery: `SELECT vessel_id,\n       hold_number,\n       load_seq,\n       container_id,\n       gross_weight_tons,\n       ROUND(SUM(gross_weight_tons) OVER (\n         PARTITION BY vessel_id, hold_number \n         ORDER BY load_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 2) AS cumulative_hold_weight_tons\nFROM ContainerStowageManifests\nORDER BY vessel_id, hold_number, load_seq ASC;`,
    eli5Story: "As shipping containers are lowered by crane into a cargo ship hold, add their weight to a running total so the ship doesn't get unbalanced and capsize.",
    commonMistakes: "Omitting hold_number from PARTITION BY, summing all holds together instead of checking each individual compartment.",
    learningOutcomes: "Ensure structural mechanical safety using partition-scoped running cumulative weight sums."
  },
  {
    title: "Parcel Delivery Driver Daily Stops Completed Burn-Down Pacing",
    ind: "Logistics",
    diff: "Medium",
    table: "DriverDeliveryStops",
    scenario: "Courier dispatch systems track driver delivery pacing across daily delivery routes, computing running completed stops and remaining stops to be delivered.",
    businessObjective: "Compute running completed packages and calculate remaining manifest count per route.",
    schemaSnippet: "`DriverDeliveryStops (stop_id VARCHAR(32) PRIMARY KEY, route_id VARCHAR(16), stop_seq INT, packages_dropped INT, total_manifest_packages INT)`",
    targetQuery: `SELECT route_id,\n       stop_seq,\n       packages_dropped,\n       total_manifest_packages,\n       SUM(packages_dropped) OVER (\n         PARTITION BY route_id \n         ORDER BY stop_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_packages_delivered,\n       total_manifest_packages - SUM(packages_dropped) OVER (\n         PARTITION BY route_id \n         ORDER BY stop_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS packages_remaining_in_van\nFROM DriverDeliveryStops\nORDER BY route_id, stop_seq ASC;`,
    eli5Story: "Show how many boxes a delivery driver dropped off so far, and subtract from the morning manifest total to show how many boxes are still left in the back of the van.",
    commonMistakes: "Assuming each stop drops exactly 1 package; packages_dropped must be summed.",
    learningOutcomes: "Model physical mobile inventory burn-downs using cumulative window aggregates."
  },
  {
    title: "Air Cargo Pallet Center-of-Gravity In-Flight Trim Balance Ledger",
    ind: "Logistics",
    diff: "Hard",
    table: "AircraftPalletPositions",
    scenario: "Air freight weight and balance loadmasters calculate aircraft center of gravity (CG) trim by computing cumulative mass moments from nose to tail cargo positions.",
    businessObjective: "Compute running total weight and running cumulative moment arm (weight * distance_from_datum) across cargo positions.",
    schemaSnippet: "`AircraftPalletPositions (flight_id VARCHAR(24), position_code VARCHAR(8), arm_inches INT, weight_lbs INT)`",
    targetQuery: `SELECT flight_id,\n       position_code,\n       arm_inches,\n       weight_lbs,\n       SUM(weight_lbs) OVER (\n         PARTITION BY flight_id \n         ORDER BY arm_inches ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_cargo_weight_lbs,\n       SUM(weight_lbs * arm_inches) OVER (\n         PARTITION BY flight_id \n         ORDER BY arm_inches ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_moment_in_lbs,\n       ROUND(\n         SUM(weight_lbs * arm_inches) OVER (\n           PARTITION BY flight_id \n           ORDER BY arm_inches ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         )::DECIMAL / \n         NULLIF(SUM(weight_lbs) OVER (\n           PARTITION BY flight_id \n           ORDER BY arm_inches ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ), 0), 1\n       ) AS running_cg_inches\nFROM AircraftPalletPositions\nORDER BY flight_id, arm_inches ASC;`,
    eli5Story: "Calculate the running balance of an airplane as pallets are loaded from front to back. Multiply weight by distance from the nose to make sure the plane's center of gravity stays safe.",
    commonMistakes: "Ordering by position_code alphabetically instead of arm_inches physically, distorting the physical aerodynamic moment calculation.",
    learningOutcomes: "Synthesize compound physical balance equations in SQL using dual parallel running sums."
  },

  // --- MEDIA (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Podcast Audio Listener Ad Impression Delivery Running Counter",
    ind: "Media",
    diff: "Easy",
    table: "DynamicAdInsertions",
    scenario: "Podcast ad servers calculate sponsor campaign pacing by tracking cumulative dynamic ad impressions served across downloaded episodes.",
    businessObjective: "Calculate running ad impressions served using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`DynamicAdInsertions (campaign_id VARCHAR(24), insertion_id BIGINT PRIMARY KEY, served_at TIMESTAMP)`",
    targetQuery: `SELECT campaign_id,\n       insertion_id,\n       served_at,\n       COUNT(*) OVER (\n         PARTITION BY campaign_id \n         ORDER BY served_at ASC, insertion_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_impressions_served\nFROM DynamicAdInsertions\nORDER BY campaign_id, served_at ASC;`,
    eli5Story: "Count commercial plays one by one as listeners stream a podcast, keeping a running scoreboard so we stop serving the ad the moment it reaches the contract cap.",
    commonMistakes: "Using COUNT(*) without ROWS BETWEEN UNBOUNDED PRECEDING, which works but fails to specify explicit execution framing.",
    learningOutcomes: "Maintain explicit frame specification discipline for stream event counters."
  },
  {
    title: "Crowdfunding Campaign Pledged Funding Trajectory Toward Goal",
    ind: "Media",
    diff: "Medium",
    table: "CrowdfundingBackerPledges",
    scenario: "Kickstarter/Indiegogo analytics platforms track campaign momentum by calculating running cumulative pledged funding and percentage progress toward funding goal.",
    businessObjective: "Calculate running cumulative funding and percent progress toward target goal.",
    schemaSnippet: "`CrowdfundingBackerPledges (pledge_id VARCHAR(32) PRIMARY KEY, project_id VARCHAR(24), pledge_amount_usd DECIMAL(10,2), goal_amount_usd DECIMAL(10,2), pledged_at TIMESTAMP)`",
    targetQuery: `SELECT project_id,\n       pledge_id,\n       pledge_amount_usd,\n       pledged_at,\n       SUM(pledge_amount_usd) OVER (\n         PARTITION BY project_id \n         ORDER BY pledged_at ASC, pledge_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS total_pledged_to_date,\n       ROUND((\n         SUM(pledge_amount_usd) OVER (\n           PARTITION BY project_id \n           ORDER BY pledged_at ASC, pledge_id ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) / goal_amount_usd\n       ) * 100, 2) AS funding_progress_pct\nFROM CrowdfundingBackerPledges\nORDER BY project_id, pledged_at ASC;`,
    eli5Story: "Every time a backer pledges $50 to a video game project, add it to the running campaign total and update the funding progress bar (e.g. 84.5% funded).",
    commonMistakes: "Omitting project_id from PARTITION BY, mixing pledges across different independent crowdfunding campaigns.",
    learningOutcomes: "Build dynamic campaign progress trackers using cumulative window sums."
  },
  {
    title: "Video Streaming CDN Token Bucket Bandwidth Burst Limiter",
    ind: "Media",
    diff: "Hard",
    table: "CdnClientDataTransfers",
    scenario: "CDN edge proxies enforce bandwidth fair-use policies by tracking running cumulative bytes transferred per client IP session and flagging streaming sessions that exceed bandwidth caps.",
    businessObjective: "Compute running cumulative megabytes transferred and identify the exact segment where burst bandwidth was exceeded.",
    schemaSnippet: "`CdnClientDataTransfers (transfer_id BIGINT PRIMARY KEY, client_ip VARCHAR(45), segment_seq INT, transferred_bytes BIGINT, bandwidth_cap_bytes BIGINT)`",
    targetQuery: `WITH RunningBandwidth AS (\n  SELECT transfer_id,\n         client_ip,\n         segment_seq,\n         transferred_bytes,\n         bandwidth_cap_bytes,\n         SUM(transferred_bytes) OVER (\n           PARTITION BY client_ip \n           ORDER BY segment_seq ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS cumulative_bytes\n  FROM CdnClientDataTransfers\n)\nSELECT transfer_id,\n       client_ip,\n       segment_seq,\n       transferred_bytes,\n       cumulative_bytes,\n       bandwidth_cap_bytes,\n       CASE WHEN cumulative_bytes > bandwidth_cap_bytes THEN 'THROTTLED_BANDWIDTH'\n            ELSE 'FULL_SPEED' END AS cdn_traffic_shaping_status\nFROM RunningBandwidth\nORDER BY client_ip, segment_seq ASC;`,
    eli5Story: "Track how many megabytes of movie data a user downloaded. The moment their running total passes their hourly bandwidth cap, throttle their stream speed.",
    commonMistakes: "Writing the running sum filter in WHERE instead of a CTE wrapper.",
    learningOutcomes: "Deploy running window accumulators in traffic-shaping and throttling algorithms."
  },

  // --- SECURITY (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Corporate Network Failed Login Attempt Cumulative Tally per IP",
    ind: "Security",
    diff: "Easy",
    table: "FailedLoginAuditTrail",
    scenario: "Network perimeter firewalls monitor brute-force attacks by maintaining a running cumulative count of failed login attempts per source IP address.",
    businessObjective: "Calculate running cumulative failure count per IP using COUNT() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`FailedLoginAuditTrail (event_id VARCHAR(36) PRIMARY KEY, source_ip VARCHAR(45), attempt_time TIMESTAMP)`",
    targetQuery: `SELECT source_ip,\n       event_id,\n       attempt_time,\n       COUNT(*) OVER (\n         PARTITION BY source_ip \n         ORDER BY attempt_time ASC, event_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_failure_count\nFROM FailedLoginAuditTrail\nORDER BY source_ip, attempt_time ASC;`,
    eli5Story: "Count how many times a hacker guessed the wrong password: 1, 2, 3, 4... keeping a running counter so we lock them out on attempt #5.",
    commonMistakes: "Using ROW_NUMBER() and forgetting that COUNT(*) OVER (ROWS UNBOUNDED PRECEDING) is semantically designed for accumulator ledgers.",
    learningOutcomes: "Deploy cumulative event counters for security threshold enforcement."
  },
  {
    title: "Data Loss Prevention Outbound Email Attachment File Size Burn Ledger",
    ind: "Security",
    diff: "Medium",
    table: "OutboundEmailTransfers",
    scenario: "DLP systems monitor employee email exfiltration by calculating cumulative attachment file sizes sent to external domains within a single working day.",
    businessObjective: "Calculate running cumulative attachment megabytes per user and flag transfers exceeding security limits.",
    schemaSnippet: "`OutboundEmailTransfers (email_id VARCHAR(36) PRIMARY KEY, user_id VARCHAR(24), send_date DATE, attachment_mb DECIMAL(6,2), dlp_threshold_mb DECIMAL(6,2))`",
    targetQuery: `WITH RunningExfiltration AS (\n  SELECT email_id,\n         user_id,\n         send_date,\n         attachment_mb,\n         dlp_threshold_mb,\n         SUM(attachment_mb) OVER (\n           PARTITION BY user_id, send_date \n           ORDER BY email_id ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS daily_cumulative_mb\n  FROM OutboundEmailTransfers\n)\nSELECT email_id,\n       user_id,\n       send_date,\n       attachment_mb,\n       daily_cumulative_mb,\n       dlp_threshold_mb,\n       CASE WHEN daily_cumulative_mb > dlp_threshold_mb THEN 'DLP_QUARANTINE_TRIGGERED'\n            ELSE 'CLEARED' END AS compliance_verdict\nFROM RunningExfiltration\nORDER BY user_id, send_date, email_id ASC;`,
    eli5Story: "Add up the size of every file an employee emails outside the company today. If their cumulative running total passes 100 MB, quarantine their outgoing mail.",
    commonMistakes: "Omitting send_date from PARTITION BY, accumulating an employee's email attachments across months.",
    learningOutcomes: "Structure daily cumulative security compliance thresholds using multi-part partition keys."
  },
  {
    title: "Privileged Cloud Infrastructure IAM Role Creation High-Water Mark",
    ind: "Security",
    diff: "Hard",
    table: "CloudIamRoleEvents",
    scenario: "Cloud security compliance auditors track privilege sprawl by calculating the running maximum number of administrator roles active in an AWS/GCP organization.",
    businessObjective: "Compute running net active roles and running historical high-water mark of cloud privileges.",
    schemaSnippet: "`CloudIamRoleEvents (event_id BIGINT PRIMARY KEY, org_id VARCHAR(24), role_change INT, logged_at TIMESTAMP)`",
    targetQuery: `WITH RoleNetTotals AS (\n  SELECT event_id,\n         org_id,\n         role_change,\n         logged_at,\n         SUM(role_change) OVER (\n           PARTITION BY org_id \n           ORDER BY logged_at ASC, event_id ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS net_active_roles\n  FROM CloudIamRoleEvents\n)\nSELECT event_id,\n       org_id,\n       role_change,\n       logged_at,\n       net_active_roles,\n       MAX(net_active_roles) OVER (\n         PARTITION BY org_id \n         ORDER BY logged_at ASC, event_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS all_time_high_role_count\nFROM RoleNetTotals\nORDER BY org_id, logged_at ASC;`,
    eli5Story: "As admin accounts are created (+1) or deleted (-1), calculate the running count of active admins. Then track the all-time peak number of admins the company ever had.",
    commonMistakes: "Attempting to nest MAX(SUM(...)) in a single query level, which violates relational engine rules.",
    learningOutcomes: "Combine two-stage cumulative window functions (running sum followed by running max) across CTE pipelines."
  },

  // --- HARDWARE (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Semiconductor Cleanroom Wafer Batch Cumulative Dice Output",
    ind: "Hardware",
    diff: "Easy",
    table: "WaferLotInspectionRuns",
    scenario: "Silicon fabrication production managers monitor lot progress by calculating running cumulative good microchip dies produced across successive wafer inspections.",
    businessObjective: "Calculate running cumulative good dies using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`WaferLotInspectionRuns (lot_id VARCHAR(24), wafer_seq INT, good_dice_count INT)`",
    targetQuery: `SELECT lot_id,\n       wafer_seq,\n       good_dice_count,\n       SUM(good_dice_count) OVER (\n         PARTITION BY lot_id \n         ORDER BY wafer_seq ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_lot_good_dice\nFROM WaferLotInspectionRuns\nORDER BY lot_id, wafer_seq ASC;`,
    eli5Story: "As each wafer in a batch of 25 is tested, add its good computer chips to a running total so managers see how close the batch is to its target yield.",
    commonMistakes: "Sorting DESC, which counts backward from the last wafer.",
    learningOutcomes: "Track cumulative production yields using sequential batch window frames."
  },
  {
    title: "Server Fleet Solid State Drive Lifetime Terabytes Written Accumulator",
    ind: "Hardware",
    diff: "Medium",
    table: "SsdDailyWriteTelemetry",
    scenario: "Cloud storage reliability engineers track physical drive wearout by calculating cumulative Terabytes Written (TBW) against the manufacturer's warranty threshold.",
    businessObjective: "Compute running TBW and calculate percentage of warranty endurance consumed.",
    schemaSnippet: "`SsdDailyWriteTelemetry (drive_serial VARCHAR(32), log_date DATE, daily_tbw DECIMAL(5,2), warranty_max_tbw INT)`",
    targetQuery: `SELECT drive_serial,\n       log_date,\n       daily_tbw,\n       warranty_max_tbw,\n       ROUND(SUM(daily_tbw) OVER (\n         PARTITION BY drive_serial \n         ORDER BY log_date ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 2) AS cumulative_lifetime_tbw,\n       ROUND((\n         SUM(daily_tbw) OVER (\n           PARTITION BY drive_serial \n           ORDER BY log_date ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) / warranty_max_tbw\n       ) * 100, 2) AS warranty_used_pct\nFROM SsdDailyWriteTelemetry\nORDER BY drive_serial, log_date ASC;`,
    eli5Story: "Every day, add how many terabytes of data were written to a solid-state drive to its lifetime running total, and show what percentage of its warranty life is used up.",
    commonMistakes: "Omitting the drive_serial partition, adding writes from thousands of different drives together.",
    learningOutcomes: "Model hardware warranty exhaustion curves using running cumulative sums."
  },
  {
    title: "Solar Photovoltaic Inverter Daily Cumulative Kilowatt-Hour Yield",
    ind: "Hardware",
    diff: "Hard",
    table: "SolarInverterPowerSamples",
    scenario: "Utility-scale solar farm SCADA systems calculate daily power generation by integrating instantaneous power readings (kW) into cumulative kilowatt-hours (kWh) across the sunlit day.",
    businessObjective: "Compute running cumulative energy generation (kWh) using power samples and timestamp delta math.",
    schemaSnippet: "`SolarInverterPowerSamples (inverter_id VARCHAR(16), sample_time TIMESTAMP, power_kw DECIMAL(8,2))`",
    targetQuery: `WITH EnergySlices AS (\n  SELECT inverter_id,\n         sample_time,\n         power_kw,\n         ROUND(power_kw * (EXTRACT(EPOCH FROM (sample_time - LAG(sample_time, 1) OVER (\n           PARTITION BY inverter_id, CAST(sample_time AS DATE) \n           ORDER BY sample_time ASC\n         ))) / 3600.0), 3) AS slice_kwh\n  FROM SolarInverterPowerSamples\n)\nSELECT inverter_id,\n       sample_time,\n       power_kw,\n       COALESCE(slice_kwh, 0) AS slice_kwh,\n       ROUND(SUM(COALESCE(slice_kwh, 0)) OVER (\n         PARTITION BY inverter_id, CAST(sample_time AS DATE) \n         ORDER BY sample_time ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 2) AS running_daily_kwh_yield\nFROM EnergySlices\nORDER BY inverter_id, sample_time ASC;`,
    eli5Story: "Turn electricity wattage pings into kilowatt-hours by multiplying power by minutes, then keep a running daily total so farmers see total green energy produced today.",
    commonMistakes: "Failing to partition by CAST(sample_time AS DATE), causing energy totals to bleed into the next day.",
    learningOutcomes: "Integrate continuous physical power telematics into discrete cumulative energy ledgers."
  },

  // --- HR (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Employee Paid Time Off PTO Accrual & Balance Burn Ledger",
    ind: "HR",
    diff: "Easy",
    table: "EmployeePtoLedgerEntries",
    scenario: "Payroll systems maintain employee vacation balances by calculating the running available PTO hours after each bi-weekly accrual and vacation day taken.",
    businessObjective: "Calculate running PTO hour balance using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`EmployeePtoLedgerEntries (entry_id BIGINT PRIMARY KEY, emp_id VARCHAR(16), entry_date DATE, hours_delta DECIMAL(4,1))`",
    targetQuery: `SELECT emp_id,\n       entry_id,\n       entry_date,\n       hours_delta,\n       ROUND(SUM(hours_delta) OVER (\n         PARTITION BY emp_id \n         ORDER BY entry_date ASC, entry_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 1) AS available_pto_hours\nFROM EmployeePtoLedgerEntries\nORDER BY emp_id, entry_date ASC;`,
    eli5Story: "Every payday, an employee earns +6 hours of vacation. When they take Friday off, subtract -8 hours. Add them up in a running total to show their current vacation balance.",
    commonMistakes: "Using RANGE instead of ROWS, causing multiple transactions on the same date to combine into one step.",
    learningOutcomes: "Build standard payroll time-accrual ledgers using chronological window sums."
  },
  {
    title: "Corporate Sales Rep Year-to-Date Closed Bookings Pacing Ledger",
    ind: "HR",
    diff: "Medium",
    table: "RepClosedDealLedger",
    scenario: "Sales compensation teams track progress toward annual commission accelerators by calculating running Year-to-Date (YTD) closed revenue for each sales representative.",
    businessObjective: "Calculate running YTD bookings per fiscal year using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`RepClosedDealLedger (deal_id VARCHAR(32) PRIMARY KEY, rep_id VARCHAR(16), fiscal_year INT, close_date DATE, deal_value_usd DECIMAL(10,2))`",
    targetQuery: `SELECT rep_id,\n       fiscal_year,\n       deal_id,\n       close_date,\n       deal_value_usd,\n       SUM(deal_value_usd) OVER (\n         PARTITION BY rep_id, fiscal_year \n         ORDER BY close_date ASC, deal_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS ytd_closed_bookings_usd\nFROM RepClosedDealLedger\nORDER BY rep_id, fiscal_year, close_date ASC;`,
    eli5Story: "Every time a sales rep closes a deal, add it to their annual running total so they see how close they are to hitting their $1M quota for the year.",
    commonMistakes: "Omitting fiscal_year from PARTITION BY, which would roll last year's sales into this year's quota.",
    learningOutcomes: "Construct clean multi-year performance pacers using fiscal year partitions."
  },
  {
    title: "Enterprise Staffing Headcount Net Expansion High-Water Mark",
    ind: "HR",
    diff: "Hard",
    table: "StaffingHireDepartureEvents",
    scenario: "People analytics researchers calculate historical corporate growth cycles by computing net active headcount across all hiring (+1) and resignation (-1) events, tracking the historical peak staffing level.",
    businessObjective: "Calculate running net headcount and running historical maximum headcount per division.",
    schemaSnippet: "`StaffingHireDepartureEvents (event_id BIGINT PRIMARY KEY, division VARCHAR(32), headcount_delta INT, event_date DATE)`",
    targetQuery: `WITH NetHeadcountPacing AS (\n  SELECT event_id,\n         division,\n         headcount_delta,\n         event_date,\n         SUM(headcount_delta) OVER (\n           PARTITION BY division \n           ORDER BY event_date ASC, event_id ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS active_headcount\n  FROM StaffingHireDepartureEvents\n)\nSELECT event_id,\n       division,\n       headcount_delta,\n       event_date,\n       active_headcount,\n       MAX(active_headcount) OVER (\n         PARTITION BY division \n         ORDER BY event_date ASC, event_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS historical_peak_headcount\nFROM NetHeadcountPacing\nORDER BY division, event_date ASC;`,
    eli5Story: "When someone is hired (+1) or leaves (-1), keep a running headcount. Also track the record highest headcount the department ever reached to see how far below peak staffing they are.",
    commonMistakes: "Attempting to compute MAX(SUM(...)) in a single unnested window step.",
    learningOutcomes: "Analyze organizational contraction cycles using running high-water mark logic."
  },

  // --- PLATFORMS (1 Easy, 1 Medium, 1 Hard) ---
  {
    title: "Distributed File System Cluster Data Ingestion Running Total",
    ind: "Platforms",
    diff: "Easy",
    table: "ClusterHdfsIngestionFiles",
    scenario: "Big data storage administrators monitor Hadoop / Ceph cluster disk filling rates by calculating cumulative gigabytes ingested throughout the operational day.",
    businessObjective: "Calculate running cumulative gigabytes ingested using SUM() OVER (... ROWS UNBOUNDED PRECEDING).",
    schemaSnippet: "`ClusterHdfsIngestionFiles (file_id VARCHAR(36) PRIMARY KEY, cluster_id VARCHAR(16), ingest_date DATE, file_size_gb DECIMAL(8,2))`",
    targetQuery: `SELECT cluster_id,\n       ingest_date,\n       file_id,\n       file_size_gb,\n       ROUND(SUM(file_size_gb) OVER (\n         PARTITION BY cluster_id, ingest_date \n         ORDER BY file_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ), 2) AS running_daily_ingested_gb\nFROM ClusterHdfsIngestionFiles\nORDER BY cluster_id, ingest_date, file_id ASC;`,
    eli5Story: "As big data files land on a server cluster, add their sizes to a running total so admins see how many gigabytes were written to disk today.",
    commonMistakes: "Omitting ingest_date from the partition, turning a daily metric into a lifetime metric.",
    learningOutcomes: "Partition cumulative infrastructure metrics by calendar dates."
  },
  {
    title: "Database WAL Replication LSN Byte Offset Cumulative Progress",
    ind: "Platforms",
    diff: "Medium",
    table: "WalSegmentTransfers",
    scenario: "PostgreSQL read replica standby servers monitor replication stream progress by calculating cumulative bytes replayed across consecutive WAL segment files.",
    businessObjective: "Calculate running cumulative bytes replayed per replication slot.",
    schemaSnippet: "`WalSegmentTransfers (slot_name VARCHAR(32), segment_num INT, segment_bytes BIGINT)`",
    targetQuery: `SELECT slot_name,\n       segment_num,\n       segment_bytes,\n       SUM(segment_bytes) OVER (\n         PARTITION BY slot_name \n         ORDER BY segment_num ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_replayed_bytes\nFROM WalSegmentTransfers\nORDER BY slot_name, segment_num ASC;`,
    eli5Story: "As database log files are sent to a backup server, add up their bytes in a running total so we know exactly how much data has been backed up.",
    commonMistakes: "Sorting by segment_bytes instead of segment_num, destroying the chronological sequence of log files.",
    learningOutcomes: "Enforce strict sequence numbering when accumulating stream transfer totals."
  },
  {
    title: "Kafka Message Queue Log High-Water Mark & Offset Consumer Progress",
    ind: "Platforms",
    diff: "Hard",
    table: "KafkaBatchCommitLogs",
    scenario: "Event-driven architecture observability platforms track consumer group progress by computing the running maximum offset committed (high-water mark) and calculating remaining partition lag.",
    businessObjective: "Compute running maximum committed offset and compare against end-of-log offset to evaluate lag progress.",
    schemaSnippet: "`KafkaBatchCommitLogs (group_id VARCHAR(32), topic VARCHAR(32), partition_id INT, commit_id BIGINT PRIMARY KEY, offset_committed BIGINT, end_of_log_offset BIGINT)`",
    targetQuery: `SELECT group_id,\n       topic,\n       partition_id,\n       commit_id,\n       offset_committed,\n       end_of_log_offset,\n       MAX(offset_committed) OVER (\n         PARTITION BY group_id, topic, partition_id \n         ORDER BY commit_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS committed_high_water_mark,\n       end_of_log_offset - MAX(offset_committed) OVER (\n         PARTITION BY group_id, topic, partition_id \n         ORDER BY commit_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS remaining_partition_lag\nFROM KafkaBatchCommitLogs\nORDER BY group_id, topic, partition_id, commit_id ASC;`,
    eli5Story: "Track the highest message number a consumer has successfully read so far (running MAX). Subtract that from the total messages in the topic to see live queue lag.",
    commonMistakes: "Using global MAX() without the bounded frame, which would use future offsets that haven't been committed yet.",
    learningOutcomes: "Model streaming queue lag progress using cumulative running MAX() high-water marks."
  }
];
